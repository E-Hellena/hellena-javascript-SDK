export interface HellenaClientOptions {
  /** Base URL da API. Por padrão: https://api.hellena.app */
  apiUrl?: string;
  /** Versão REST. Por padrão: v1 */
  apiVersion?: string;
  /** Tempo máximo de espera por pedido, em milissegundos. */
  timeout?: number;
}

export interface HellenaRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export class HellenaAPIError extends Error {
  readonly status: number;
  readonly response: unknown;
  readonly path: string;

  constructor(message: string, status: number, path: string, response?: unknown) {
    super(message);
    this.name = "HellenaAPIError";
    this.status = status;
    this.path = path;
    this.response = response;
  }
}

export class HellenaConnect {
  protected readonly apiUrl: string;
  protected readonly apiVersion: string;
  protected readonly timeout: number;

  constructor(
    protected readonly apiKey: string,
    options: HellenaClientOptions = {},
  ) {
    if (!apiKey?.trim()) {
      throw new Error("A API Key da Hellena é obrigatória.");
    }

    this.apiUrl = (options.apiUrl ?? "https://api.hellena.app").replace(/\/+$/, "");
    this.apiVersion = (options.apiVersion ?? "v1").replace(/^\/+|\/+$/g, "");
    this.timeout = options.timeout ?? 30_000;
  }

  protected get apiEndpoint(): string {
    return `${this.apiUrl}/${this.apiVersion}`;
  }

  protected getHeaders(): Record<string, string> {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-hellena-api-key": this.apiKey,
    };
  }

  /** Envia um pedido autenticado para um endpoint REST da Hellena. */
  async sendRestRequest<T>(path: string, options: HellenaRequestOptions = {}): Promise<T> {
    const normalizedPath = path.replace(/^\/+/, "");
    const url = new URL(`${this.apiEndpoint}/${normalizedPath}`);
    for (const [key, value] of Object.entries(options.query ?? {})) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    const externalSignal = options.signal;
    const abortFromExternal = () => controller.abort();
    externalSignal?.addEventListener("abort", abortFromExternal, { once: true });

    try {
      const response = await fetch(url, {
        method: options.method ?? "GET",
        headers: { ...this.getHeaders(), ...options.headers },
        ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
        signal: externalSignal?.aborted ? externalSignal : controller.signal,
      });
      const raw = await response.text();
      let data: unknown = undefined;
      if (raw) {
        try { data = JSON.parse(raw); } catch { data = raw; }
      }

      if (!response.ok) {
        const payload = data as { message?: unknown; error?: unknown } | null;
        const message = Array.isArray(payload?.message)
          ? payload.message.join(", ")
          : typeof payload?.message === "string"
            ? payload.message
            : typeof payload?.error === "string"
              ? payload.error
              : `Pedido à Hellena falhou (${response.status} ${response.statusText})`;
        throw new HellenaAPIError(message, response.status, url.toString(), data);
      }

      return data as T;
    } catch (error) {
      if (error instanceof HellenaAPIError) throw error;
      if (controller.signal.aborted) {
        throw new Error(`O pedido à Hellena excedeu o limite de ${this.timeout} ms ou foi cancelado.`, { cause: error });
      }
      throw new Error(`Não foi possível comunicar com a API Hellena: ${error instanceof Error ? error.message : String(error)}`, { cause: error });
    } finally {
      clearTimeout(timeoutId);
      externalSignal?.removeEventListener("abort", abortFromExternal);
    }
  }

  /** Executa uma query ou mutation GraphQL autenticada. */
  async graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.apiUrl}/graphql`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ query, variables }),
    });
    const payload = await response.json() as {
      data?: T;
      errors?: Array<{ message?: string }>;
    };

    if (!response.ok || payload.errors?.length) {
      const message = payload.errors?.map((item) => item.message ?? "Erro GraphQL").join("; ")
        ?? `Pedido GraphQL falhou (${response.status})`;
      throw new HellenaAPIError(message, response.status, `${this.apiUrl}/graphql`, payload);
    }
    return payload.data as T;
  }

}
