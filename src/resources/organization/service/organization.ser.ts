import type { HellenaConnect } from "@//core/HellenaConnect";
import type { OrganizationInfoResponseDTO, OrganizationLinkDTO } from "../dto/organization.dto";

export class OrganizationService {
    constructor(private readonly connect: HellenaConnect) {}

    async getInfo(): Promise<OrganizationInfoResponseDTO> {
        const response = await fetch(
            `${this.connect["apiEndpoint"]}/organization/info`,
            {
                method: "GET",
                headers: this.connect["getHeaders"](),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar informações da organização (${response.status})`);
        }

        return response.json() as any;
    }

    async getLinks(): Promise<OrganizationLinkDTO[]> {
        const response = await fetch(
            `${this.connect["apiEndpoint"]}/organization/links`,
            {
                method: "GET",
                headers: this.connect["getHeaders"](),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar links da organização (${response.status})`);
        }

        return response.json() as any;
    }
}
