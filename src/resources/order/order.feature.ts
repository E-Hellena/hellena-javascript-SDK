import type { Order_Return, OrderDTO } from "./dto/order.dto.js";
import type { OrderService } from "./service/order.ser.js";

export class OrderFeature {
    constructor(private readonly service: OrderService) { }

    new(data: OrderDTO): Promise<Order_Return> { return this.service.make({ data }) }
}
