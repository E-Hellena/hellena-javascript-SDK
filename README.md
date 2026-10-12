# Hellena JavaScript SDK

O **Hellena JavaScript SDK** é uma biblioteca para integrar aplicações JavaScript e TypeScript com os serviços da plataforma Hellena. Em vez de construíres manualmente cada pedido HTTP, podes criar uma instância do cliente e usar métodos organizados por recurso para consultar produtos, trabalhar com encomendas, calcular portes e descontos, gerir comentários e avaliações, consultar métodos de pagamento e obter informações da organização.

O SDK também disponibiliza acesso genérico à API REST e execução de operações GraphQL, para funcionalidades que ainda não tenham um método dedicado.

> **Importante:** o SDK facilita a comunicação com a API; não substitui as permissões, validações nem as regras de negócio aplicadas pelo backend Hellena.

## Para que serve?

Podes utilizar o SDK, por exemplo, para:

- **Lojas online:** listar produtos, pesquisar por nome ou referência e consultar os detalhes de um produto.
- **Checkout e encomendas:** criar encomendas, calcular portes, calcular descontos de cupões e renovar o identificador de transação.
- **Experiência do cliente:** consultar, criar, atualizar ou eliminar comentários e avaliações, conforme os métodos disponíveis.
- **Pagamentos:** consultar métodos de pagamento e iniciar o fluxo de pagamento WiPay suportado pelo SDK.
- **Integrações:** obter informações da organização, consultar links sociais e chamar outros endpoints REST.
- **Aplicações com GraphQL:** enviar queries ou mutations sem implementar manualmente o transporte HTTP.

É indicado sobretudo para serviços backend, APIs, workers, integrações e aplicações Node.js que precisam de comunicar com a Hellena.

## Requisitos

- Node.js numa versão compatível com o teu projeto.
- Uma API Key válida da Hellena.
- Acesso de rede à API configurada.

## Instalação

Escolhe o gestor de pacotes que utilizas no projeto.

### npm

```bash
npm install @hellena-sdk/hellena
```

### pnpm

```bash
pnpm add @hellena-sdk/hellena
```

### Yarn

```bash
yarn add @hellena-sdk/hellena
```

Depois da instalação, importa o cliente a partir de `@hellena-sdk/hellena`.

## Configuração da API Key

Define a chave como variável de ambiente no servidor. Por exemplo, num ficheiro `.env` local:

```dotenv
HELLENA_API_KEY=a_tua_api_key
```

Não publiques esse ficheiro nem coloques a chave em repositórios. Adiciona `.env` ao `.gitignore` se ainda não estiver incluído.

### Criar uma instância

Cria o cliente uma vez no backend e reutiliza essa instância nos módulos que precisam da API:

```ts
import { HellenaClient } from "@hellena-sdk/hellena";

const apiKey = process.env.HELLENA_API_KEY;

if (!apiKey) {
  throw new Error("A variável HELLENA_API_KEY não está definida.");
}

export const hellena = new HellenaClient(apiKey);
```

Exemplo em JavaScript (ES modules):

```js
import { HellenaClient } from "@hellena-sdk/hellena";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY.");

const hellena = new HellenaClient(apiKey);
```

Por padrão, o cliente utiliza:

- URL base: `https://api.hellena.app`
- Versão REST: `v1`
- Timeout: `30_000` milissegundos (30 segundos)
- Autenticação pelo cabeçalho `x-hellena-api-key`

Podes substituir as opções quando criares a instância:

```ts
const hellena = new HellenaClient(process.env.HELLENA_API_KEY!, {
  apiUrl: "https://api.hellena.app",
  apiVersion: "v1",
  timeout: 30_000,
});
```

Usa o operador `!` apenas quando tiveres garantido que a variável existe; validar explicitamente a variável, como no exemplo anterior, é mais seguro.

**Segurança:** não instancies o SDK com uma API Key secreta num componente React executado no browser, numa aplicação mobile distribuída ou em qualquer código público. O browser pode ser inspecionado e a chave extraída. Cria uma rota backend/BFF para comunicar com o SDK e expõe ao cliente apenas os dados necessários.

## Primeiros exemplos

Os exemplos seguintes assumem que já criaste a instância `hellena` e que a variável `HELLENA_API_KEY` está configurada no ambiente do servidor.

### 1. Listar produtos

```ts
const result = await hellena.product.listProducts({
  page: 1,
  limit: 10,
});

console.log(result.data); // lista de produtos
console.log(result.meta); // metadados da paginação, quando devolvidos
```

### 2. Pesquisar produtos

```ts
const result = await hellena.product.searchProducts({
  ref: "ténis",
  page: 1,
  limit: 10,
});

console.log(result.data);
```

### 3. Consultar um produto

```ts
const product = await hellena.product.getProductByIdOrSlug("product-id-ou-slug");

console.log(product);
```

Substitui os identificadores de exemplo por IDs ou slugs reais existentes na tua organização.

### 4. Calcular portes de entrega

```ts
const shipping = await hellena.order.calculateShippingCost({
  localization: "Luanda",
  items: [
    {
      productId: "product-id",
      name: "Produto de exemplo",
      quantity: 1,
      price: 5000,
    },
  ],
});

console.log(shipping);
```

### 5. Calcular o desconto de um cupão

```ts
const discount = await hellena.order.calculateCouponDiscount({
  code: "PROMO",
  items: [
    {
      productId: "product-id",
      name: "Produto de exemplo",
      quantity: 1,
      price: 5000,
    },
  ],
});

console.log(discount);
```

### 6. Consultar métodos de pagamento

```ts
const methods = await hellena.payment.listAvailablePaymentMethods();
console.log(methods);
```

Consulta [Pagamentos](docs/payments.md) para os parâmetros e o formato de resposta exatos dos métodos disponíveis.

## Recursos disponíveis

| Recurso | O que permite fazer |
| --- | --- |
| `hellena.product` | Listar, pesquisar e consultar produtos. |
| `hellena.order` | Criar encomendas, renovar o ID de transação, calcular portes e descontos de cupões. |
| `hellena.comment` | Consultar, criar, atualizar e eliminar comentários. |
| `hellena.rating` | Consultar resumos e avaliações, criar ou eliminar avaliações. |
| `hellena.payment` | Consultar métodos de pagamento e criar pagamentos WiPay suportados. |
| `hellena.organization` | Consultar informações da organização e links sociais. |
| `hellena.sendRestRequest()` | Fazer pedidos REST a endpoints que ainda não têm método dedicado. |
| `hellena.graphql()` | Executar queries e mutations GraphQL. |

Consulta os guias específicos para confirmar os parâmetros obrigatórios, a estrutura das respostas e os efeitos de cada operação. A disponibilidade de um método no SDK não significa que todas as API Keys tenham permissão para o executar.

## REST e GraphQL

### REST genérico

Quando precisares de um endpoint ainda não coberto por um método de alto nível, utiliza `sendRestRequest()`:

```ts
const result = await hellena.sendRestRequest<{ ok: boolean }>("algum-endpoint", {
  method: "POST",
  query: { page: 1 },
  body: { exemplo: true },
});

console.log(result);
```

O caminho é relativo à URL base e ao prefixo da versão configurada. Com a configuração padrão, não acrescentes `/v1` ao caminho, salvo se estiveres a configurar deliberadamente uma base ou versão diferente.

### GraphQL

```ts
const data = await hellena.graphql<{ products: unknown }>(
  `query Products($page: Int, $limit: Int) {
    products(page: $page, limit: $limit) {
      data { id name }
      meta { total page limit }
    }
  }`,
  { page: 1, limit: 10 },
);

console.log(data);
```

O tipo TypeScript passado a `graphql<T>()` ajuda a tipar o resultado no teu código; deves alinhá-lo com o schema e com os campos que a query realmente devolve.

## Tratamento de erros

Os pedidos podem falhar por problemas de rede, autenticação, permissões, validação ou erros no servidor. Trata os erros perto da fronteira da integração:

```ts
import { HellenaAPIError } from "@hellena-sdk/hellena";

try {
  const product = await hellena.product.getProductByIdOrSlug("product-id");

  console.log(product);
} catch (error) {
  if (error instanceof HellenaAPIError) {
    console.error("Estado HTTP:", error.status);
    console.error("Mensagem:", error.message);
    console.error("Resposta da API:", error.response);
  } else {
    console.error("Erro de rede ou inesperado:", error);
  }
}
```

Evita registar API Keys ou outros segredos nos logs. Para operações que criam encomendas, pagamentos ou alteram dados, confirma o resultado antes de repetir automaticamente um pedido: uma repetição cega pode duplicar efeitos.

## Documentação completa

A documentação detalhada e os exemplos por recurso estão em [`docs/README.md`](docs/README.md).

| Guia | Conteúdo |
| --- | --- |
| [Começar](docs/getting-started.md) | Instalação, cliente e configuração |
| [Produtos](docs/products.md) | Listagem, pesquisa e detalhe |
| [Encomendas](docs/orders.md) | Checkout, entrega, cupões e transações |
| [Comentários](docs/comments.md) | Consulta e gestão de comentários |
| [Avaliações](docs/ratings.md) | Resumos e gestão de avaliações |
| [Pagamentos](docs/payments.md) | Métodos de pagamento e WiPay |
| [Organização](docs/organization.md) | Dados da organização e links sociais |
| [REST, GraphQL e erros](docs/rest-graphql-errors.md) | Transporte genérico e tratamento de erros |
| [Exemplos TypeScript](examples/README.md) | Exemplos executáveis em TypeScript na raiz do repositório |

## Desenvolvimento do SDK

Para compilar o SDK a partir do código-fonte:

```bash
bun install
bun run build
```

O build gera o JavaScript e as declarações TypeScript em `dist/`; não são gerados ficheiros de build em `src/`.

Os exemplos TypeScript em `examples/` são executados a partir da raiz do repositório depois do build, usando `bun run examples/products.ts` (consulta `examples/README.md` para a lista completa). Define `HELLENA_API_KEY` no ambiente antes de os executar. Os exemplos que fazem operações de escrita exigem também `HELLENA_ALLOW_WRITES=true`. Revê os dados e o ambiente antes de permitir que um exemplo crie ou altere registos reais.
