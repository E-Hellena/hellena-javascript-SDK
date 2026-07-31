export interface OrderDTO {
    customerName?: string;
    customerEmail?: string;
    customerId?: string;
    customerProfile?: string;
    notes?: string;
    lat?: number;
    lng?: number;
    origin?: string;
    shippingMethod?: string;
    paymentMethod?: string;
    cupon?: string;
    meta?: Record<string, any>;
    address?: string;
    items: Order_ItemsDTO[]
}

interface Order_ItemsDTO {
    productId: string;
    quantity: number;
    price: number;
    image?: string;
    category?: string;
    name?: string;
}

export interface Order_Return {
    id: string
    organizationId: string
    createdAt: string
    updatedAt: any
    origin: string
    status: string
    amount: number
    deletedAt: any
    deliveryDate: any
    dueDate: any
    trackingCode: any
    shippingMethod: any
    paymentMethod: any
    cupon: any
    meta: any
    orderInfo: OrderInfo
    items: Item[]
}

export interface OrderInfo {
    id: string
    orderId: string
    customerId: any
    customerProfile: any
    customerName: string
    customerEmail: string
    notes: any
    lat: string
    lng: string
    address: string
    createdAt: string
    updatedAt: any
}

export interface Item {
    id: string
    orderId: string
    productId: string
    image: string
    category: string
    name: string
    quantity: number
    price: number
    createdAt: string
    updatedAt: any
}
