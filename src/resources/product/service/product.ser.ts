import type { HellenaConnect } from "@//core/HellenaConnect";
import type { ProductDTO } from "../dto/product.dto";

export class ProductService {
    constructor(private readonly connect: HellenaConnect) {}

    async getAllProducts(): Promise<ProductDTO[]> {
        const response = await fetch(
            `${this.connect["apiEndpoint"]}/products/all`,
            {
                method: "GET",
                headers: this.connect["getHeaders"](),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos (${response.status})`);
        }

        return response.json() as any;
    }

    async getProductById(id: string): Promise<ProductDTO> {
        const response = await fetch(
            `${this.connect["apiEndpoint"]}/products/${id}`,
            {
                method: "GET",
                headers: this.connect["getHeaders"](),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar produto (${response.status})`);
        }

        return response.json() as any;
    }
}
