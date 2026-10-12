import type { HellenaConnect } from "../../core/HellenaConnect";
import { CommentFeature } from "./comment.feature";
import { CommentService } from "./service/comment.ser";
export function CommentModel(connect: HellenaConnect) { return new CommentFeature(new CommentService(connect)); }
