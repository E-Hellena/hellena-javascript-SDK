import type { HellenaConnect } from "@//core/HellenaConnect";
import { ProductService } from "./service/product.ser";
import { ProductFeature } from "./product.feature";

export function ProductModel(connect: HellenaConnect) {
    const service = new ProductService(connect);
    return new ProductFeature(service);
}