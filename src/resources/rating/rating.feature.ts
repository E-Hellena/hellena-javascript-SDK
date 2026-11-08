import type { AddRatingDTO, PaginatedRatingsDTO, RatingDTO, RatingSummaryDTO } from "./dto/rating.dto";
import type { RatingService } from "./service/rating.ser";

export class RatingFeature {
  constructor(private readonly service: RatingService) {}

  /** Obtém a média, distribuição por estrelas, comentários e avaliações recentes de um produto. */
  getProductRatingSummary(stockId: string, params: { page?: number; limit?: number } = {}): Promise<RatingSummaryDTO> {
    return this.service.summary(stockId, params);
  }

  /** Lista as avaliações de um produto com paginação. */
  listProductRatings(params: { stockId: string; page?: number; limit?: number }): Promise<PaginatedRatingsDTO> {
    return this.service.findMany(params);
  }

  /** Obtém a avaliação de um cliente para um produto, se existir. */
  getCustomerProductRating(params: { stockId: string; customerId: string }): Promise<RatingDTO | null> {
    return this.service.findOne(params);
  }

  /** Regista ou atualiza a avaliação de um cliente. */
  createProductRating(data: AddRatingDTO): Promise<RatingDTO> {
    return this.service.create(data);
  }

  /** Elimina uma avaliação pelo seu identificador. */
  deleteProductRating(id: string): Promise<{ success: boolean; id?: string }> {
    return this.service.delete(id);
  }
}
