import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { PaginatedResponse, ProductDTO, ProductListParams, ProductSearchParams } from "../dto/product.dto";

export class ProductService {
  constructor(private readonly connect: HellenaConnect) {}

  getAllProducts(params: ProductListParams = {}): Promise<PaginatedResponse<ProductDTO>> {
    return this.connect.sendRestRequest("products/all", { query: { page: params.page, limit: params.limit } });
  }

  searchProducts(params: ProductSearchParams): Promise<PaginatedResponse<ProductDTO>> {
    const { ref, ...pagination } = params;
    return this.connect.sendRestRequest("products/search", { query: { ref, ...pagination } });
  }

  getProductById(id: string): Promise<ProductDTO> {
    return this.connect.sendRestRequest(`products/${encodeURIComponent(id)}`);
  }
}
