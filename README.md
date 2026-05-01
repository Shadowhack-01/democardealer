# Naija Car Shop — Demo Car Dealer

> A modern demo car-dealer frontend built with Next.js, TypeScript and Tailwind CSS.

## Overview

This repository contains a demo car dealership frontend showcasing an inventory, showroom, vehicle detail pages with an image gallery, and direct contact CTAs (WhatsApp / telephone). It is intended as a production-ready UI scaffold for dealerships and vehicle marketplaces.

## Key Features

- Responsive inventory listing and showroom
- Vehicle detail pages with image gallery and modal view
- Floating WhatsApp contact button and `tel:` links for direct contact
- Animated UI with `framer-motion` and a 3D background (Three.js)
- Accessible primitives from Radix UI and composable UI components

## Tech Stack

- Next.js 16.2.4 (App Router)
- React ^19
- TypeScript 5.7.3
- Tailwind CSS ^4.2.0 + PostCSS
- pnpm (recommended) — `pnpm-lock.yaml` is committed
- Notable libraries: `framer-motion`, `three`, `lucide-react`, `recharts`, `@radix-ui/*`

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (recommended). You can enable Corepack if needed:

```bash
corepack enable
```

### Install

```bash
# using pnpm (recommended)
pnpm install

# or with npm
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:3000 to view the app.

### Build / Start

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Environment variables

No secrets are required for local development. The project may optionally read `NEXT_PUBLIC_*` variables (analytics / observability) in production — check the codebase for specific variables before deploying.

## Deployment

This project is configured to work well with Vercel (recommended). If deploying with pnpm, ensure the committed `pnpm-lock.yaml` matches the pnpm version used by your CI.

## Contributing

Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Open a pull request describing your change

Please keep UI/text changes focused and include screenshots where applicable.

## Contact

Naija Car Shop

8B Mobolaji Bank Anthony Way, beside AfriGlobal, Opebi

Ikeja 100271, Lagos

Phone: 0909 971 0000

## License

No license specified. Add a `LICENSE` file if you intend to open-source this project.

<!-- End of README -->
