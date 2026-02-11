import { HellenaConnect } from "./core/HellenaConnect.js";
import { OrderModel } from "./resources/order/order.model.js";
import { OrganizationModel } from "./resources/organization/organization.model.js";
import { ProductModel } from "./resources/product/product.model.js";

export class HellenaClient extends HellenaConnect {
    public readonly product = ProductModel(this);
    public readonly order = OrderModel(this);
    public readonly organization = OrganizationModel(this);

    constructor(apiKey: string) {
        super(apiKey);
    }    
}
