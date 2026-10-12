import { HellenaConnect, type HellenaClientOptions } from "./core/HellenaConnect";
import { OrderModel } from "./resources/order/order.model";
import { ProductModel } from "./resources/product/product.model";
import { OrganizationModel } from "./resources/organization/organization.model";
import { CommentModel } from "./resources/comment/comment.model";
import { RatingModel } from "./resources/rating/rating.model";
import { PaymentModel } from "./resources/payment/payment.model";

export class HellenaClient extends HellenaConnect {
  public readonly product = ProductModel(this);
  public readonly order = OrderModel(this);
  public readonly organization = OrganizationModel(this);
  public readonly comment = CommentModel(this);
  public readonly rating = RatingModel(this);
  public readonly payment = PaymentModel(this);

  constructor(apiKey: string, options: HellenaClientOptions = {}) {
    super(apiKey, options);
  }
}

export { HellenaAPIError, type HellenaClientOptions, type HellenaRequestOptions } from "./core/HellenaConnect";
export * from "./resources/product/dto/product.dto";
export * from "./resources/order/dto/order.dto";
export * from "./resources/comment/dto/comment.dto";
export * from "./resources/rating/dto/rating.dto";
export * from "./resources/payment/dto/payment.dto";
export * from "./resources/organization/dto/organization.dto";
