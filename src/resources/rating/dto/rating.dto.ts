export interface RatingDTO {
  id: string; stockId: string; score: number; customerId?: string | null;
  customerProfile?: string | null; customerName?: string | null; customerEmail?: string | null;
  createdAt?: string; updatedAt?: string | null;
}
export interface AddRatingDTO {
  stockId: string; score: number; customerId?: string; customerProfile?: string; customerName?: string; customerEmail?: string;
}
export interface RatingSummaryDTO { stockId: string; averageRating: number; ratingCount: number; commentsCount: number; }
