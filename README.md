# Shoply

Shoply is a small Next.js App Router shop built for the mid-term project. It uses the [Fake Store API](https://fakestoreapi.com) for products, login and profile data.

## Tech stack

- Next.js (App Router) and React
- Redux Toolkit and React Redux for cart and login state
- React Hook Form with Yup for form handling and validation

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page shows the product collection.

`--legacy-peer-deps` is needed because of a peer dependency conflict between `@hookform/resolvers` and another package.

## Routes

- `/` and `/products` - product collection, fetched on the client
- `/products/details/[id]` - server-rendered product details with an **Add to cart** button
- `/cart` - cart page
- `/login` - login form
- `/register` - registration form
- `/profile` - details of the logged-in user

## Features

### Cart

The cart is managed with Redux (`src/store/cartSlice.js`).

- Add a product from its details page. A toast saying "Added to cart" appears in the bottom-right corner.
- Increase or decrease the quantity (1 to 10), or remove an item.
- The cart page and the navbar bag icon show the total number of products, and the cart page shows the total price. Both are calculated from the Redux state.
- The cart is saved in `localStorage` (`shoply-cart`) and restored when the page loads.

### Login

The login form posts the username and password to `https://fakestoreapi.com/auth/login`. Both fields are validated with Yup.

- A successful login goes straight to `/profile`.
- Wrong credentials show the message returned by the API.
- Tick **Remember me** to save the token in `localStorage` (`shoply-auth-token`) so you are signed in automatically next time. Without it, you stay signed in only until the page is reloaded.
- While signed in, the navigation shows **Logout** instead of Login and Register. Logging out clears the saved token.
- Login state is kept in Redux (`src/store/authSlice.js`).

Example user from the Fake Store API: `johnd` / `m38rmF$`.

### Register

The registration form posts to `https://jsonplaceholder.typicode.com/users`. It is a demonstration endpoint, so no account is actually created and you cannot log in with the new details.

| Field | Rule |
|---|---|
| First name, Last name | Required, 4–20 characters |
| Age | Required, whole number, 13–120 |
| Email | Required, valid format |
| Password | Required, 6–12 characters, with at least one uppercase letter, one lowercase letter and one number |
| Phone | Required, digits only, 10–100 digits |

### Profile

The profile page reads the user id from the login token and loads that user from the Fake Store API. If nobody is logged in, it shows "Please log on".

## Project structure

```
src/
  app/          pages (products, cart, login, register, profile) and layout
  components/   NavBar, Footer, AddToCartButton
  store/        Redux store, cart and auth slices, StoreProvider
```

The shared navigation and footer are rendered from `src/app/layout.js`, inside the Redux `StoreProvider`.
