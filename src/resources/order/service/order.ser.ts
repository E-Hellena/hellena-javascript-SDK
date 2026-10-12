import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { CouponDiscountDTO, CouponDiscountResponseDTO, GetFreteDTO, FreteResponseDTO, OrderDTO, Order_Return } from "../dto/order.dto";

export class OrderService {
  constructor(private readonly connect: HellenaConnect) { }

  make({ data }: { data: OrderDTO }): Promise<Order_Return> {
    return this.connect.sendRestRequest("orders/new", {
      method: "POST",
      body: data,
    });
  }

  renewTransactionId(id: string): Promise<{ id: string; transactionId: string }> {
    return this.connect.sendRestRequest(`orders/${encodeURIComponent(id)}/renew-transaction`, { method: "POST" });
  }

  getFrete(payload: GetFreteDTO): Promise<FreteResponseDTO> {
    return this.connect.sendRestRequest("orders/checkout/frete", { method: "POST", body: payload });
  }

  calculateCouponDiscount(payload: CouponDiscountDTO): Promise<CouponDiscountResponseDTO> {
    return this.connect.sendRestRequest("orders/checkout/coupon-discount", { method: "POST", body: payload });
  }
}
