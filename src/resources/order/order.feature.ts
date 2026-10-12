import type { CouponDiscountDTO, CouponDiscountResponseDTO, GetFreteDTO, FreteResponseDTO, OrderDTO, Order_Return } from "./dto/order.dto";
import type { OrderService } from "./service/order.ser";

export class OrderFeature {
  constructor(private readonly service: OrderService) {}

  /** Cria uma encomenda através do serviço central de checkout Hellena. */
  createOrder(data: OrderDTO): Promise<Order_Return> {
    return this.service.make({ data });
  }

  /** Renova o identificador de transação de uma encomenda existente. */
  renewOrderTransactionId(id: string): Promise<{ id: string; transactionId: string }> {
    return this.service.renewTransactionId(id);
  }

  /** Calcula o custo de entrega para os artigos e a localização indicados. */
  calculateShippingCost(data: GetFreteDTO): Promise<FreteResponseDTO> {
    return this.service.getFrete(data);
  }

  /** Calcula o desconto aplicável a um cupão e aos artigos indicados. */
  calculateCouponDiscount(data: CouponDiscountDTO): Promise<CouponDiscountResponseDTO> {
    return this.service.calculateCouponDiscount(data);
  }

}
