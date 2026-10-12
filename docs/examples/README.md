# Exemplos executáveis

Estes exemplos importam o SDK compilado diretamente de `../../dist/main.js`, não do código-fonte em `src/`.

## Preparar o ambiente

Na raiz do repositório:

```bash
bun run build
export HELLENA_API_KEY="a-tua-chave"
```

Executa com Node.js:

```bash
node docs/examples/products.mjs
node docs/examples/orders.mjs
node docs/examples/comments.mjs
node docs/examples/ratings.mjs
node docs/examples/payments.mjs
node docs/examples/organization.mjs
node docs/examples/graphql.mjs
```

Os exemplos usam dados demonstrativos diretamente nos ficheiros. Apenas a API Key é configurada por variável de ambiente; substitui os IDs fictícios por IDs reais do teu ambiente quando necessário.

No PowerShell, define a chave com `$env:HELLENA_API_KEY="a-tua-chave"`.

## Escritas e operações com efeitos

Os exemplos de encomendas, comentários, avaliações e pagamentos não fazem operações de escrita por defeito. Para permitir os blocos de escrita, define também:

```bash
export HELLENA_ALLOW_WRITES=true
```

Revê os dados de exemplo e substitui os IDs pelos teus valores reais antes de ativares esta variável. A chamada `order.createOrder()` pode criar uma encomenda real. A chamada de pagamento pode iniciar um fluxo de pagamento.

A API Key deve ter permissões adequadas para os endpoints chamados. Os resultados dependem dos dados e das permissões do teu ambiente Hellena.
