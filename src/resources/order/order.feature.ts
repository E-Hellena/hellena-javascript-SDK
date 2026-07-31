import type { Order_Return, OrderDTO } from "./dto/order.dto";
import type { OrderService } from "./service/order.ser";

export class OrderFeature {
    constructor(private readonly service: OrderService) { }

    async new(data: OrderDTO): Promise<Order_Return> {
        const order = await this.service.make({ data });
        return order;
    }
}
