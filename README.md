# Shoply

Shoply is a small Next.js App Router shop built for the mid-term project. It uses the Fake Store API for product and profile data.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects into the product collection.

## Routes

- `/products` - client-side product fetching with product cards
- `/products/details/[id]` - server-rendered product details
- `/profile` - server-side profile fetching
- `/cart` - cart summary with quantity controls from 1 to 10

The shared navigation and footer are rendered from `src/app/layout.js`. Product and cart interactions use React state and effects.
