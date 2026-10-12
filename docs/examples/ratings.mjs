import { HellenaClient } from "../../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY antes de executar este exemplo.");
const hellena = new HellenaClient(apiKey);

// IDs ilustrativos; substitui por registos existentes para obter resultados reais.
const stockId = "produto-demo-001";
const customerId = "cliente-demo-001";

console.log("Resumo:", await hellena.rating.getProductRatingSummary(stockId));
console.log("Avaliação do cliente:", await hellena.rating.getCustomerProductRating({ stockId, customerId }));

if (process.env.HELLENA_ALLOW_WRITES === "true") {
  const created = await hellena.rating.createProductRating({ stockId, customerId, score: 5 });
  console.log("Avaliação criada:", created);
  console.log("Avaliação removida:", await hellena.rating.deleteProductRating(created.id));
} else {
  console.log("Criação/remoção desativada. Define HELLENA_ALLOW_WRITES=true para ativar.");
}
