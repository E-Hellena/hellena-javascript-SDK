import type { PaginatedResponse } from "../../product/dto/product.dto";
export interface CommentDTO {
  id: string; stockId: string; content: string;
  customerId?: string | null; customerProfile?: string | null; customerName?: string | null; customerEmail?: string | null;
  parentId?: string | null; reactions?: string | null; replies?: CommentDTO[]; parent?: CommentDTO | null;
  createdAt?: string; updatedAt?: string | null;
}
export interface AddCommentDTO {
  stockId: string; content: string; customerId?: string; customerProfile?: string; customerName?: string;
  customerEmail?: string; parentId?: string; reactions?: string;
}
export interface UpdateCommentDTO { content?: string; reactions?: string; }
export type PaginatedCommentsDTO = PaginatedResponse<CommentDTO>;
