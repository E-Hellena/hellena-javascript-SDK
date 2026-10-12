export interface PaymentMethodDTO { id: string; method: string; testMode: boolean; }
export interface CreateWiPayPaymentDTO { customer: string; reference: string; failure_url: string; success_url: string; }
export interface CreateWiPayPaymentResponseDTO { url: string; }
