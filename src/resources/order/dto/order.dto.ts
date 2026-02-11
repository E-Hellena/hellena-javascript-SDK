export interface OrderDTO {
    info: Order_InfoDTO,
    items: Order_ItemsDTO[]
}

interface Order_InfoDTO {
    customerName?: string;
    customerEmail?: string;
    notes?: string;
    lat?: number;
    lng?: number;
    address?: string;
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
    id: string;
    origin: string | null;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string | null;
}