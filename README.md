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

const main = async () => {
    const hellena = new HellenaClient(process.env.HELLENA_API_KEY!);

    const product = await hellena.product.findOne({
        id: "123"
    })

    return product
}

main().then((data) => {
   console.log(data.barcode, data.name, data.quantity);
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