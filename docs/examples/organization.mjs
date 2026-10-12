import { HellenaClient } from "../../dist/main.js";

const apiKey = process.env.HELLENA_API_KEY;
if (!apiKey) throw new Error("Define HELLENA_API_KEY antes de executar este exemplo.");
const hellena = new HellenaClient(apiKey);

console.log("Informações da organização:", await hellena.organization.getOrganizationInfo());
console.log("Links sociais:", await hellena.organization.getOrganizationSocialLinks());
