export interface DashboardOrderInfoDTO {
  customerId?: string;
  customerProfile?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerNIF?: string;
  notes?: string;
  lat?: number;
  lng?: number;
  address?: string;
}

export interface DashboardOrderItemDTO {
  productId: string;
  name: string;
  category?: string;
  image?: string;
  quantity: number;
  size?: string;
  color?: string;
  material?: string;
  model?: string;
  gender?: string;
  price: number;
}

export interface OrderDTO {
  info?: DashboardOrderInfoDTO;
  items: DashboardOrderItemDTO[];
  coupon?: string;
  frete?: number;
  localization?: string;
}

export interface Order_Return {
  id: string;
  invoice?: string | null;
  invoice_link?: string | null;
  organizationId: string;
  amount: number;
  couponCode?: string | null;
  couponDiscount?: number | null;
  frete?: number | null;
  status: string;
  transactionId?: string;
  [key: string]: unknown;
}

export interface GetFreteDTO {
  localization?: string;
  lat?: number;
  long?: number;
  coupon?: string;
  items?: DashboardOrderItemDTO[];
}

export interface CouponDiscountDTO {
  code: string;
  items: DashboardOrderItemDTO[];
  customerId?: string;
  customerEmail?: string;
  fretePrice?: number;
}

export interface FreteResponseDTO {
  required: boolean;
  price: number;
  isFreeShipping: boolean;
  message?: string;
}

export interface CouponDiscountResponseDTO {
  valid: boolean;
  message?: string;
  code?: string;
  discountType?: string;
  discountValue?: number;
  discountAmount?: number;
  isFreeShipping?: boolean;
  subtotal?: number;
  finalAmount?: number;
}
