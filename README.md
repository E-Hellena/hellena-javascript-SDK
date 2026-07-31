# hellena-SDK

A JavaScript SDK for the Hellena platform.

## Installation

```bash
npm i @hellena-sdk/hellena
```

## Usage

```javascript
import { HellenaClient } from "@hellena-sdk/hellena";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

async function main() {
    const hellena = new HellenaClient(process.env.HELLENA_API_KEY!);

    try {
        console.log("carregando...")
        const products = await hellena.product.findOne({ id: "cmqs3vs6q00010mao7v945sat" });
        const order = await hellena.order.new({
            customerName: "Nome do Cliente",
            customerEmail: "emaildocliente@exemplo.com",
            lat: 7.120712,
            lng: 7.619913,
            address: "local de entrega",
            items: [
                {
                    productId: "cmqs3vs6q00010mao7v945sat",
                    quantity: 6,
                    price: 5000,
                    image: "https://encrypted-tbn0.gstatic.com/images?NM7ako&s=10",
                    category: "Sapato",
                    name: "NIKE"
                }
            ]
        })
        console.log("products: ", products);
        console.log("order: ", order);
    } catch (error) {
        console.error(error)
    }
}

main().then((data) => {
    console.log("concluido");
}).catch((error) => {
    console.error("An error occurred:", error);
});
```

## Features

- Easy integration
- Full API support
- TypeScript ready

## Documentation

For more information, visit the [documentation](./docs).

## License

MIT