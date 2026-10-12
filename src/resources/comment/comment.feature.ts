import type { AddCommentDTO, CommentDTO, PaginatedCommentsDTO, UpdateCommentDTO } from "./dto/comment.dto";
import type { CommentService } from "./service/comment.ser";

export class CommentFeature {
  constructor(private readonly service: CommentService) {}

  /** Lista os comentários de um produto. */
  listProductComments(params: { stockId: string; page?: number; limit?: number }): Promise<PaginatedCommentsDTO> {
    return this.service.findMany(params);
  }

  /** Obtém um comentário pelo seu identificador. */
  getCommentById(id: string): Promise<CommentDTO> { return this.service.findOne(id); }

  /** Publica um comentário num produto. */
  createComment(data: AddCommentDTO): Promise<CommentDTO> { return this.service.create(data); }

  /** Atualiza o conteúdo ou as reações de um comentário. */
  updateComment(id: string, data: UpdateCommentDTO): Promise<CommentDTO> { return this.service.update(id, data); }

  /** Elimina um comentário pelo seu identificador. */
  deleteComment(id: string): Promise<{ success: boolean }> { return this.service.delete(id); }

}
