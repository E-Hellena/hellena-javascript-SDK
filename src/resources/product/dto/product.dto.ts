export interface PriceDTO {
    id: string;
    quantity: number;
    price: number;
}

export interface ProductDTO {
    id: string;
    barcode: string;
    name: string;
    category: string | null;
    image: string | null;
    model_3d_preview: string | null;
    model_3d_url: string | null;
    description: string | null;
    image_sides: string[] | null;
    color: string[] | null;
    brand: string | null;
    material: string[] | null;
    size: string[] | null;
    tags: string[] | null;
    Price: PriceDTO[];
    unit: string;
    quantity: number;
}