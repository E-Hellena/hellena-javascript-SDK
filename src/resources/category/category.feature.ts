import type { CategoryListParams, CategoryProductsParams, CategoryWithProductsDTO, PaginatedCategoriesDTO } from "./dto/category.dto";
import type { CategoryService } from "./service/category.ser";

export class CategoryFeature {
  constructor(private readonly service: CategoryService) {}

  /** Lista as categorias da organização com paginação e pesquisa opcional. */
  listCategories(params: CategoryListParams = {}): Promise<PaginatedCategoriesDTO> {
    return this.service.findMany(params);
  }

  /** Obtém uma categoria pelo ID ou identificador e os respetivos produtos paginados. */
  getCategoryByRef(params: CategoryProductsParams): Promise<CategoryWithProductsDTO> {
    return this.service.findOne(params);
  }
}
