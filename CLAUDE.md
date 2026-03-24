# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Environment Variables

Create a `.env.local` file with:
```
GR4VY_PRIVATE_KEY=<your-gr4vy-private-key>
```

This key is used in [src/app/api/token/route.js](src/app/api/token/route.js) to generate Gr4vy payment tokens. Newlines in the key must be handled (use `\n` literal or actual newlines depending on deployment).

## Architecture

This is a Next.js 16 App Router application demoing a full airline booking flow with Gr4vy payment integration.

**User flow:** Home → Flights → Add-ons → Checkout → Success

State is passed between pages via URL query parameters (no global state manager).

### Key Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | [src/app/page.js](src/app/page.js) | Flight search — market/date selection |
| `/flights` | [src/app/flights/page.js](src/app/flights/page.js) | Fare selection (Basic/Standard/Flex) |
| `/addons` | [src/app/addons/page.js](src/app/addons/page.js) | Optional add-ons (meals, services) |
| `/checkout` | [src/app/checkout/CheckoutContent.js](src/app/checkout/CheckoutContent.js) | Gr4vy embed payment form |
| `/success` | [src/app/success/page.js](src/app/success/page.js) | Order confirmation |
| `/api/token` | [src/app/api/token/route.js](src/app/api/token/route.js) | Backend token generation for Gr4vy |

### Multi-Market Support

Markets (US/IE/GB/BR/AE) drive currency and price multipliers. The market is selected on the home page and propagated through URL params. Each market maps to a currency (USD/EUR/GBP/BRL/AED) and a price multiplier applied to base USD prices.

### Payment Integration (Gr4vy)

- Backend: `@gr4vy/node` SDK in the `/api/token` route generates a session token
- Frontend: `@gr4vy/embed-react` renders the payment widget in `CheckoutContent.js`
- The checkout page fetches a token from `/api/token`, then passes it to the Gr4vy embed component

### Path Alias

`@/*` maps to `./src/*` (configured in [jsconfig.json](jsconfig.json)).
