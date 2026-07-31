import type { ProductDTO } from "./dto/product.dto"
import type { ProductService } from "./service/product.ser"

export class ProductFeature {
    constructor(private readonly service: ProductService) { }

    async findMany(): Promise<ProductDTO[]> {
        const products = await this.service.getAllProducts();
        return products;
    }

    async findOne({ id }: { id: string }): Promise<ProductDTO> {
        const product = await this.service.getProductById(id);
        return product;
    }
}
