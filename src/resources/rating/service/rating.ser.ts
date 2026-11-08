import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { AddRatingDTO, PaginatedRatingsDTO, RatingDTO, RatingSummaryDTO } from "../dto/rating.dto";

export class RatingService {
  constructor(private readonly connect: HellenaConnect) {}

  summary(stockId: string, params: { page?: number; limit?: number } = {}): Promise<RatingSummaryDTO> {
    return this.connect.sendRestRequest(
      `rating/products/${encodeURIComponent(stockId)}/summary`,
      { query: params },
    );
  }

  findMany(params: { stockId: string; page?: number; limit?: number }): Promise<PaginatedRatingsDTO> {
    const { stockId, ...pagination } = params;
    return this.connect.sendRestRequest(
      `rating/products/${encodeURIComponent(stockId)}/ratings`,
      { query: pagination },
    );
  }

  findOne(params: { stockId: string; customerId: string }): Promise<RatingDTO | null> {
    return this.connect.sendRestRequest(
      `rating/products/${encodeURIComponent(params.stockId)}`,
      { query: { customerId: params.customerId } },
    );
  }

  create(data: AddRatingDTO): Promise<RatingDTO> {
    return this.connect.sendRestRequest("rating", { method: "POST", body: data });
  }

  delete(id: string): Promise<{ success: boolean; id?: string }> {
    return this.connect.sendRestRequest(`rating/${encodeURIComponent(id)}`, { method: "DELETE" });
  }
}
