import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { PaginatedResponse, ProductDTO, ProductListParams, ProductSearchParams } from "../dto/product.dto";

export class ProductService {
  constructor(private readonly connect: HellenaConnect) {}

  getAllProducts(params: ProductListParams = {}): Promise<PaginatedResponse<ProductDTO>> {
    return this.connect.sendRestRequest("products/all", { query: this.toQuery(params) });
  }

  searchProducts(params: ProductSearchParams): Promise<PaginatedResponse<ProductDTO>> {
    const { ref, ...filters } = params;
    return this.connect.sendRestRequest("products/search", {
      query: { ...this.toQuery(filters), ...(ref ? { ref } : {}) },
    });
  }

  getProductById(id: string): Promise<ProductDTO> {
    return this.connect.sendRestRequest(`products/${encodeURIComponent(id)}`);
  }

  private toQuery(params: ProductListParams): Record<string, string | number | boolean | null | undefined> {
    const list = (value?: string | string[]) =>
      Array.isArray(value) ? value.join(",") : value;

    return {
      page: params.page,
      limit: params.limit,
      q: params.q,
      category: params.category,
      color: list(params.color),
      brand: params.brand,
      model: list(params.model),
      material: list(params.material),
      size: list(params.size),
      tags: list(params.tags),
      gender: list(params.gender),
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      inStock: params.inStock,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
    };
  }
}
