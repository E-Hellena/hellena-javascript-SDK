import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { CategoryListParams, CategoryProductsParams, CategoryWithProductsDTO, PaginatedCategoriesDTO } from "../dto/category.dto";

export class CategoryService {
  constructor(private readonly connect: HellenaConnect) {}

  findMany(params: CategoryListParams = {}): Promise<PaginatedCategoriesDTO> {
    return this.connect.sendRestRequest("category", {
      query: { page: params.page, limit: params.limit, search: params.search },
    });
  }

  findOne(params: CategoryProductsParams): Promise<CategoryWithProductsDTO> {
    const { ref, ...pagination } = params;
    return this.connect.sendRestRequest(`category/${encodeURIComponent(ref)}`, { query: pagination });
  }
}
