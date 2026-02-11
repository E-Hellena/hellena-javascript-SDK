export interface OrganizationInfoResponseDTO {
    id: string;
    name: string;
    slug: string;
    shopping: OrganizationInfoResponseShoppingDTO | null
    category?: string;
    address?: string;
    phone?: string;
    email?: string;
    logo?: string;
}

export interface OrganizationInfoResponseShoppingBannersDTO {
    id: string;
    image: string | null;
    title: string | null;
    description: string | null;
    link: string | null;
    type: "HERO" | "PROMO";
}

export interface OrganizationInfoResponseShoppingDTO {
    banners: OrganizationInfoResponseShoppingBannersDTO[]
}

export interface OrganizationLinkDTO {
    name: string;
    link: string;
}