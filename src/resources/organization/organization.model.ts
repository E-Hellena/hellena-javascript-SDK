import type { HellenaConnect } from "@/core/HellenaConnect.js";
import { OrganizationService } from "./service/organization.ser.js";
import { OrganizationFeature } from "./organization.feature.js";

export function OrganizationModel(connect: HellenaConnect) {
    const service = new OrganizationService(connect);
    return new OrganizationFeature(service);
}