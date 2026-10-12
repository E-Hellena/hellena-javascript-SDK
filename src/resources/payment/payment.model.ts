import type { HellenaConnect } from "../../core/HellenaConnect";
import { PaymentFeature } from "./payment.feature";
import { PaymentService } from "./service/payment.ser";
export function PaymentModel(connect: HellenaConnect) { return new PaymentFeature(new PaymentService(connect)); }
