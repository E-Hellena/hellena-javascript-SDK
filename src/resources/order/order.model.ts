import type { HellenaConnect } from "@/core/HellenaConnect.js";
import { OrderFeature } from "./order.feature.js";
import { OrderService } from "./service/order.ser.js";

export function OrderModel(connect: HellenaConnect) {
    const service = new OrderService(connect);
    return new OrderFeature(service);
}