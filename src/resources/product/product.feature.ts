import type { ProductDTO } from "./dto/product.dto.js";
import type { ProductService } from "./service/product.ser.js";

export class ProductFeature {
    constructor(private readonly service: ProductService) { }

    findMany(): Promise<ProductDTO[]> { return this.service.getAllProducts() }
    findOne({ id }: { id: string }): Promise<ProductDTO> { return this.service.getProductById(id) }
}
