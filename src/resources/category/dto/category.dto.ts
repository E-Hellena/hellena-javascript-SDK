import type { PaginatedResponse, ProductDTO, PaginationMeta } from "../../product/dto/product.dto";

export interface CategoryDTO {
  id: string;
  name: string;
  category: string;
  icon?: string | null;
  image?: string | null;
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CategoryProductsParams {
  ref: string;
  page?: number;
  limit?: number;
}

export interface CategoryWithProductsDTO extends CategoryDTO {
  products: ProductDTO[];
  meta: PaginationMeta;
}

export type PaginatedCategoriesDTO = PaginatedResponse<CategoryDTO>;
