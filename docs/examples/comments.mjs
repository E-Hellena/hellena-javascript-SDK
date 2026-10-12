import { HellenaClient } from "../../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY antes de executar este exemplo.");
const hellena = new HellenaClient(apiKey);

// ID ilustrativo; usa um produto existente no teu ambiente para obter dados reais.
const stockId = "produto-demo-001";
const comments = await hellena.comment.listProductComments({ stockId, page: 1, limit: 10 });
console.log("Comentários:", comments.data);

if (process.env.HELLENA_ALLOW_WRITES === "true") {
  const created = await hellena.comment.createComment({
    stockId,
    content: "Comentário de demonstração criado pelo SDK.",
    customerName: "Maria Exemplo",
  });
  console.log("Criado:", created);

  const updated = await hellena.comment.updateComment(created.id, {
    content: "Comentário de demonstração atualizado pelo SDK.",
  });
  console.log("Atualizado:", updated);
  console.log("Removido:", await hellena.comment.deleteComment(created.id));
} else {
  console.log("Escritas desativadas. Define HELLENA_ALLOW_WRITES=true para testar create/update/delete.");
}

// ID ilustrativo: substitui por um comentário existente para obter detalhes reais.
console.log("Comentário de exemplo:", await hellena.comment.getCommentById("comentario-demo-001"));
