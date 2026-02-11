import type { OrganizationInfoResponseDTO, OrganizationLinkDTO } from "./dto/organization.dto.js";
import { OrganizationService } from "./service/organization.ser.js";

export class OrganizationFeature {
    constructor(private readonly service: OrganizationService) { }

    info(): Promise<OrganizationInfoResponseDTO> { return this.service.getInfo() }
    socialLinks(): Promise<OrganizationLinkDTO[]> { return this.service.getLinks() }
}
