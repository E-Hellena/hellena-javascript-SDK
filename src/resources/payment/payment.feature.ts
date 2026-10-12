import type { CreateWiPayPaymentDTO, CreateWiPayPaymentResponseDTO, PaymentMethodDTO } from "./dto/payment.dto";
import type { PaymentService } from "./service/payment.ser";

export class PaymentFeature {
  constructor(private readonly service: PaymentService) {}

  /** Lista os métodos de pagamento configurados para a organização. */
  listAvailablePaymentMethods(): Promise<PaymentMethodDTO[]> { return this.service.methods(); }

  /** Cria uma sessão de pagamento WiPay e devolve o URL para continuar o fluxo. */
  createWiPayPayment(data: CreateWiPayPaymentDTO): Promise<CreateWiPayPaymentResponseDTO> {
    return this.service.createWiPayPayment(data);
  }

}
