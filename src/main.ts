import { HellenaConnect } from "./core/HellenaConnect";
import { OrderModel } from "./resources/order/order.model";
import { ProductModel } from "./resources/product/product.model";

export class HellenaClient extends HellenaConnect {
    public readonly product = ProductModel(this);
    public readonly order = OrderModel(this);
    // public readonly organization = OrganizationModel(this);

    constructor(apiKey: string) {
        super(apiKey);
    }    
}