import type { HellenaConnect } from "@/core/HellenaConnect.js";
import type { OrganizationInfoResponseDTO, OrganizationLinkDTO} from "../dto/organization.dto.js";

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

        return response.json();
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

        return response.json();
    }
}
