# Produtos

Os métodos de produtos estão disponíveis em `hellena.product`. Os filtros podem ser combinados em `listProducts` e `searchProducts`.

## Listar e filtrar produtos

```ts
const result = await hellena.product.listProducts({
  page: 1,
  limit: 20,
  minPrice: 5000,
  maxPrice: 50000,
  category: "Calçado",
  color: ["Preto", "Branco"],
  brand: "Nike",
  model: "Air Max",
  size: ["40", "41"],
  material: "Couro",
  tags: ["desporto"],
  gender: "unissexo",
  inStock: true,
  sortBy: "createdAt",
  sortOrder: "desc",
});

console.log(result.data);
console.log(result.meta);
```

Filtros disponíveis:

- `q`: pesquisa por nome, slug, código de barras, categoria, marca, descrição, modelo, material ou tags.
- `minPrice` e `maxPrice`: intervalo de preços.
- `category`, `brand`: categoria e marca.
- `color`, `model`, `material`, `size`, `tags`, `gender`: aceitam um valor ou arrays de valores.
- `inStock`: `true` para produtos com quantidade superior a zero; `false` para quantidade igual a zero.
- `sortBy`: `createdAt`, `updatedAt` ou `name`.
- `sortOrder`: `asc` ou `desc`.
- `page`, `limit`: paginação (máximo 100).

Endpoint: `GET /v1/products/all`.

Os filtros de preço verificam os registos relacionados em `prices`. Quando os dois limites são enviados, o produto precisa de ter pelo menos um registo de preço dentro desse intervalo.

## Pesquisar por texto e filtrar

```ts
const result = await hellena.product.searchProducts({
  ref: "ténis",
  minPrice: 10000,
  maxPrice: 30000,
  category: "Calçado",
  color: "Preto,Branco",
  brand: "Nike",
  page: 1,
  limit: 10,
});
```

O termo `ref` é opcional. Também podes usar `q` para pesquisa textual sem passar `ref`.

Endpoint: `GET /v1/products/search`.

## Obter um produto

```ts
const product = await hellena.product.getProductByIdOrSlug("produto-ou-slug");
console.log(product.name, product.prices);
```

Endpoint: `GET /v1/products/:ref`.

## Formato de resposta

Os métodos de listagem e pesquisa devolvem `data` e `meta` com a paginação. Os produtos incluem os atributos de catálogo, preços, stock, avaliação média e contagem de comentários/avaliações.
