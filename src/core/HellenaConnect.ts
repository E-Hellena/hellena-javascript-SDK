export class HellenaConnect {
    protected readonly apiUrl: string;
    protected readonly apiVersion: string;

    constructor(
        protected readonly apiKey: string,
        apiUrl = "https://api.hellena.app",
        apiVersion = "v1",
    ) {
        this.apiUrl = apiUrl;
        this.apiVersion = apiVersion;
    }

    protected get apiEndpoint(): string {
        return `${this.apiUrl}/${this.apiVersion}`;
    }

    protected getHeaders(): Record<string, string> {
        return {
            "Content-Type": "application/json",
            "x-hellena-api-key": this.apiKey,
        };
    }
}