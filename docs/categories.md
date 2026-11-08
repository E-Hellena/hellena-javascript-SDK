# Categorias

Os métodos de categorias estão disponíveis em `hellena.category`. As consultas são limitadas à organização associada à API Key.

## Listar categorias

`category.listCategories(params?)` permite listar categorias com paginação e pesquisa opcional por nome ou identificador.

```ts
const result = await hellena.category.listCategories({
  page: 1,
  limit: 20,
  search: "eletrónica",
});

console.log(result.data);
console.log(result.meta);
```

Endpoint: `GET /v1/category?page=1&limit=20&search=eletrónica`.

## Consultar uma categoria e os seus produtos

`category.getCategoryByRef({ ref, page?, limit? })` procura a categoria pelo ID ou pelo campo `category` e devolve os produtos associados com paginação.

```ts
const result = await hellena.category.getCategoryByRef({
  ref: "eletronicos",
  page: 1,
  limit: 20,
});

console.log(result.name);
console.log(result.category);
console.log(result.icon);
console.log(result.image);
console.log(result.products);
console.log(result.meta);
```

Endpoint: `GET /v1/category/:ref?page=1&limit=20`.

O limite máximo é de 100 produtos por página. A resposta inclui os dados da categoria, os produtos e os metadados de paginação.
