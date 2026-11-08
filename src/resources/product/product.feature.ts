import type {
  ProductDTO,
  ProductListParams,
  ProductSearchParams,
  PaginatedResponse,
} from "./dto/product.dto";
import type { ProductService } from "./service/product.ser";

export class ProductFeature {
  constructor(private readonly service: ProductService) {}

  /**
   * Lista produtos com paginação e filtros combináveis.
   *
   * Filtros suportados:
   * - q: pesquisa textual;
   * - minPrice / maxPrice: intervalo de preços;
   * - category, brand: categoria e marca;
   * - color, model, material, size, tags e gender: valor único ou lista;
   * - inStock: disponibilidade em stock;
   * - sortBy / sortOrder: ordenação dos resultados.
   */
  listProducts(params: ProductListParams = {}): Promise<PaginatedResponse<ProductDTO>> {
    this.validatePriceRange(params);
    return this.service.getAllProducts(params);
  }

  /**
   * Filtra produtos sem exigir um termo de pesquisa.
   * É um método explícito equivalente a listProducts, útil para interfaces de catálogo.
   */
  filterProducts(filters: ProductListParams = {}): Promise<PaginatedResponse<ProductDTO>> {
    return this.listProducts(filters);
  }

  /**
   * Pesquisa produtos por texto (ref ou q) e combina a pesquisa com os restantes filtros.
   * Aceita os mesmos filtros de listProducts, incluindo intervalo de preço, categoria,
   * cor, marca, modelo, material, tamanho, tags, género e disponibilidade.
   */
  searchProducts(params: ProductSearchParams = {}): Promise<PaginatedResponse<ProductDTO>> {
    this.validatePriceRange(params);
    return this.service.searchProducts(params);
  }

  /** Obtém os detalhes de um produto através do ID ou slug. */
  getProductByIdOrSlug(id: string): Promise<ProductDTO> {
    if (!id?.trim()) {
      throw new Error("O ID ou slug do produto é obrigatório.");
    }

    return this.service.getProductById(id.trim());
  }

  private validatePriceRange(params: ProductListParams): void {
    const { minPrice, maxPrice } = params;

    if (minPrice !== undefined && (!Number.isFinite(minPrice) || minPrice < 0)) {
      throw new Error("minPrice deve ser um número maior ou igual a zero.");
    }

    if (maxPrice !== undefined && (!Number.isFinite(maxPrice) || maxPrice < 0)) {
      throw new Error("maxPrice deve ser um número maior ou igual a zero.");
    }

    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
      throw new Error("minPrice não pode ser superior a maxPrice.");
    }
  }
}
