import type { HellenaConnect } from "../../../core/HellenaConnect";
import type { CreateWiPayPaymentDTO, CreateWiPayPaymentResponseDTO, PaymentMethodDTO } from "../dto/payment.dto";
export class PaymentService {
  constructor(private readonly connect: HellenaConnect) {}
  methods(): Promise<PaymentMethodDTO[]> { return this.connect.sendRestRequest("payment/methods"); }
  createWiPayPayment(data: CreateWiPayPaymentDTO): Promise<CreateWiPayPaymentResponseDTO> {
    return this.connect.sendRestRequest("payment/wipay/create", { method: "POST", body: data });
  }
}
