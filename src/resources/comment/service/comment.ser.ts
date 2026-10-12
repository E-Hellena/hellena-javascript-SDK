import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { AddCommentDTO, CommentDTO, PaginatedCommentsDTO, UpdateCommentDTO } from "../dto/comment.dto";
export class CommentService {
  constructor(private readonly connect: HellenaConnect) {}
  findMany(params: { stockId: string; page?: number; limit?: number }): Promise<PaginatedCommentsDTO> {
    return this.connect.sendRestRequest("comments", { query: params });
  }
  findOne(id: string): Promise<CommentDTO> { return this.connect.sendRestRequest(`comments/${encodeURIComponent(id)}`); }
  create(data: AddCommentDTO): Promise<CommentDTO> {
    return this.connect.sendRestRequest("comments", { method: "POST", body: data });
  }
  update(id: string, data: UpdateCommentDTO): Promise<CommentDTO> {
    return this.connect.sendRestRequest(`comments/${encodeURIComponent(id)}`, { method: "PATCH", body: data });
  }
  delete(id: string): Promise<{ success: boolean }> {
    return this.connect.sendRestRequest(`comments/${encodeURIComponent(id)}`, { method: "DELETE" });
  }
}
