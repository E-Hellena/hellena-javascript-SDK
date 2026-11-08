# Avaliações

Os métodos de avaliações estão disponíveis em `hellena.rating`. Todos os pedidos usam a rota `/v1/rating`.

## Consultar o resumo de avaliações

`rating.getProductRatingSummary(stockId, params?)` devolve os dados principais do produto, a média, totais, distribuição por estrelas e uma página de avaliações recentes.

```ts
const result = await hellena.rating.getProductRatingSummary("product-id", {
  page: 1,
  limit: 10,
});

console.log(result.product);
console.log(result.summary.averageRating);
console.log(result.summary.totalRatings);
console.log(result.summary.distribution); // 5, 4, 3, 2 e 1 estrelas
console.log(result.ratings.data);
console.log(result.ratings.meta);
```

Endpoint: `GET /v1/rating/products/:stockId/summary?page=1&limit=10`.

A distribuição contém, para cada pontuação, a quantidade de avaliações e a percentagem em relação ao total. O resumo também inclui `totalScore`, `minScore`, `maxScore`, `commentsCount` e `ratingLabel`.

## Listar avaliações

`rating.listProductRatings({ stockId, page?, limit? })` devolve avaliações paginadas.

```ts
const result = await hellena.rating.listProductRatings({
  stockId: "product-id",
  page: 1,
  limit: 20,
});
```

Endpoint: `GET /v1/rating/products/:stockId/ratings?page=1&limit=20`.

## Consultar a avaliação de um cliente

`rating.getCustomerProductRating({ stockId, customerId })` procura a avaliação do cliente para o produto. Devolve uma avaliação ou `null`.

```ts
const rating = await hellena.rating.getCustomerProductRating({
  stockId: "product-id",
  customerId: "customer-id",
});
```

Endpoint: `GET /v1/rating/products/:stockId?customerId=...`.

## Criar ou atualizar uma avaliação

```ts
const rating = await hellena.rating.createProductRating({
  stockId: "product-id",
  score: 5,
  customerId: "customer-id",
  customerName: "Maria",
});
```

Obrigatórios: `stockId` e `score` (inteiro de 1 a 5). Os dados do cliente são opcionais.

Endpoint: `POST /v1/rating`.

## Eliminar uma avaliação

```ts
const result = await hellena.rating.deleteProductRating("rating-id");
console.log(result.success);
```

A remoção é lógica (soft delete).

Endpoint: `DELETE /v1/rating/:id`.
