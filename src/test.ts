import dotenv from "dotenv";
import { HellenaClient } from "./main.js";

dotenv.config({ quiet: true });

async function main() {
    const hellena = new HellenaClient(process.env.HELLENA_API_KEY!);

    try {
        console.log("carregando...")
        const products = await hellena.product.findMany();
        const social = await hellena.organization.info();
        const order = await hellena.order.new({
            info: {
                customerName: "walter santana",
                customerEmail: "walteralexandresantana@gmail.com",
                lat: 7.120712,
                lng: 7.619913,
                address: "golf 2",
            },
            items: [
                {
                    productId: "cmj8ihkux0000aod30yod04pl",
                    quantity: 6,
                    price: 200,
                    image: "944928849",
                    category: "teste",
                    name: "teste"
                }
            ]
        })
        console.log("products: ", products);
        console.log("social: ", social.shopping?.banners[0]?.link);
        console.log("order: ", order);
    } catch (error) {
        console.error(error)
    }
}

main();
