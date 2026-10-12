export interface PriceDTO {
  id: string;
  quantity: number;
  price: number;
  priceType?: string;
}

export interface ProductVariantDTO {
  id: string;
  value: string;
  color?: string | null;
  link?: string | null;
  variantProduct?: {
    id: string;
    name: string;
    slug?: string;
    image: string | null;
    prices: PriceDTO[];
  } | null;
}

export interface ProductDTO {
  id: string;
  slug?: string;
  barcode: string | null;
  name: string;
  category: string | null;
  image: string | null;
  model_3d_preview: string | null;
  model_3d_url: string | null;
  description: string | null;
  image_sides: string[] | null;
  color: string[] | null;
  brand: string | null;
  material: string[] | null;
  size: string[] | null;
  tags: string[] | null;
  prices: PriceDTO[];
  unit: string | null;
  unitsPerBox?: number | null;
  quantity: number;
  variants?: ProductVariantDTO[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
}

export interface ProductSearchParams extends ProductListParams {
  ref: string;
}
