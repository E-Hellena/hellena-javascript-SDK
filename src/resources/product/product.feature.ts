import type { ProductDTO, ProductListParams, ProductSearchParams, PaginatedResponse } from "./dto/product.dto";
import type { ProductService } from "./service/product.ser";

export class ProductFeature {
  constructor(private readonly service: ProductService) {}

  /** Lista produtos com paginação. */
  listProducts(params: ProductListParams = {}): Promise<PaginatedResponse<ProductDTO>> {
    return this.service.getAllProducts(params);
  }

  /** Pesquisa produtos por ID, slug, nome, código de barras, categoria, marca ou descrição. */
  searchProducts(params: ProductSearchParams): Promise<PaginatedResponse<ProductDTO>> {
    return this.service.searchProducts(params);
  }

  /** Obtém os detalhes de um produto através do ID ou slug. */
  getProductByIdOrSlug(id: string): Promise<ProductDTO> {
    return this.service.getProductById(id);
  }

}
