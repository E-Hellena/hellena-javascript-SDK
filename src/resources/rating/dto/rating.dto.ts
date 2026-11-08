import type { PaginatedResponse } from "../../product/dto/product.dto";

export interface RatingDTO {
  id: string;
  stockId: string;
  score: number;
  customerId?: string | null;
  customerProfile?: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface AddRatingDTO {
  stockId: string;
  score: number;
  customerId?: string;
  customerProfile?: string;
  customerName?: string;
  customerEmail?: string;
}

export interface RatingProductDTO {
  id: string;
  name: string;
  slug?: string | null;
  image?: string | null;
  brand?: string | null;
  category?: string | null;
  averageRating?: number;
  ratingCount?: number;
  commentsCount?: number;
}

export interface RatingDistributionDTO {
  score: 1 | 2 | 3 | 4 | 5;
  count: number;
  percentage: number;
}

export interface RatingSummaryStatsDTO {
  averageRating: number;
  totalRatings: number;
  totalScore: number;
  minScore: number | null;
  maxScore: number | null;
  commentsCount: number;
  distribution: RatingDistributionDTO[];
  ratingLabel: string;
}

export interface RatingSummaryDTO {
  product: RatingProductDTO;
  summary: RatingSummaryStatsDTO;
  ratings: PaginatedResponse<RatingDTO>;
}

export type PaginatedRatingsDTO = PaginatedResponse<RatingDTO>;
