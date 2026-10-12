import type { OrganizationInfoResponseDTO, OrganizationLinkDTO } from "./dto/organization.dto";
import { OrganizationService } from "./service/organization.ser";

export class OrganizationFeature {
  constructor(private readonly service: OrganizationService) {}

  /** Obtém as informações públicas da organização associada à API Key. */
  getOrganizationInfo(): Promise<OrganizationInfoResponseDTO> { return this.service.getInfo(); }

  /** Obtém os links sociais configurados pela organização. */
  getOrganizationSocialLinks(): Promise<OrganizationLinkDTO[]> { return this.service.getLinks(); }

}
