import type { HellenaConnect } from "@/core/HellenaConnect.js";
import type { Order_Return, OrderDTO } from "../dto/order.dto.js";

export class OrderService {
    constructor(private readonly connect: HellenaConnect) { }

    async make({ data }: { data: OrderDTO }): Promise<Order_Return> {
        const response = await fetch(
            `${this.connect["apiEndpoint"]}/order/new`,
            {
                method: "POST",
                headers: this.connect["getHeaders"](),
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw ({
                cause: `Erro ao cadastrar compra (${response.status})`,
                status: response.status,
                message: response.statusText
            });
        }

        return response.json();
    }
}
