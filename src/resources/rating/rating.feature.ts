import type { AddRatingDTO, RatingDTO, RatingSummaryDTO } from "./dto/rating.dto";
import type { RatingService } from "./service/rating.ser";

export class RatingFeature {
  constructor(private readonly service: RatingService) {}

  /** Obtém a classificação média e as contagens de avaliações/comentários de um produto. */
  getProductRatingSummary(stockId: string): Promise<RatingSummaryDTO> { return this.service.summary(stockId); }

  /** Obtém a avaliação de um cliente para um produto, se existir. */
  getCustomerProductRating(params: { stockId: string; customerId: string }): Promise<RatingDTO | null> {
    return this.service.findOne(params);
  }

  /** Regista uma avaliação de produto. */
  createProductRating(data: AddRatingDTO): Promise<RatingDTO> { return this.service.create(data); }

  /** Elimina uma avaliação pelo seu identificador. */
  deleteProductRating(id: string): Promise<{ success: boolean }> { return this.service.delete(id); }

}
