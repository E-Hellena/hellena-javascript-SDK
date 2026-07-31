import type { HellenaConnect } from "@//core/HellenaConnect";
import { OrderService } from "./service/order.ser";
import { OrderFeature } from "./order.feature";

export function OrderModel(connect: HellenaConnect) {
    const service = new OrderService(connect);
    return new OrderFeature(service);
}