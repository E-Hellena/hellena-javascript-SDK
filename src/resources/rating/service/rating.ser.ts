import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { AddRatingDTO, RatingDTO, RatingSummaryDTO } from "../dto/rating.dto";
export class RatingService {
  constructor(private readonly connect: HellenaConnect) {}
  summary(stockId: string): Promise<RatingSummaryDTO> {
    return this.connect.sendRestRequest(`ratings/products/${encodeURIComponent(stockId)}/summary`);
  }
  findOne(params: { stockId: string; customerId: string }): Promise<RatingDTO | null> {
    return this.connect.sendRestRequest(`ratings/products/${encodeURIComponent(params.stockId)}`, { query: { customerId: params.customerId } });
  }
  create(data: AddRatingDTO): Promise<RatingDTO> {
    return this.connect.sendRestRequest("ratings", { method: "POST", body: data });
  }
  delete(id: string): Promise<{ success: boolean }> {
    return this.connect.sendRestRequest(`ratings/${encodeURIComponent(id)}`, { method: "DELETE" });
  }
}
