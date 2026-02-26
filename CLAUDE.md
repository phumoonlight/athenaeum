# CLAUDE.md

This is a personal workspace for learning and experimentation across multiple languages and frameworks.

## Repository Structure

```
athenaeum/
├── lang/          # Language-specific learning examples
│   ├── cs/        # C# / ASP.NET Core
│   ├── go/        # Go
│   ├── html/      # Static HTML
│   ├── js/        # Vanilla JavaScript
│   ├── node/      # Node.js / Angular / Vue / React / Next.js / NestJS
│   └── python/    # Python (Django, HTTP, automation, SQLite)
└── workshop/      # Larger projects and POCs
    ├── cms/       # Turbo monorepo: NestJS API + Next.js frontend
    ├── ewelink/   # IoT device integration POC (Node.js)
    ├── learn_flutter/    # Flutter / Dart learning
    ├── odoo-poc/         # Odoo addon learning
    ├── odoo-slack-poc/   # Odoo + Slack integration (Node.js)
    └── poc-html-ar/      # Augmented Reality with AR.js
```

## Key Projects and Commands

### cms monorepo (`workshop/cms/`)
Turbo-based monorepo with NestJS backend and Next.js frontend.

```bash
# From workshop/cms/
npm install          # Install all workspace dependencies
npm run dev          # Start all apps (API + Web)
npm run build        # Build all packages
npm run lint         # Lint all packages
npm run check-types  # TypeScript type checking
```

- **API** (`apps/api`): NestJS 11, TypeORM, PostgreSQL — runs on default NestJS port
- **Web** (`apps/web`): Next.js 15 with Turbopack, MUI 7, Tailwind CSS 4, Zustand, React 19 — runs on port 3000
- Requires **Node >= 22** and a running **PostgreSQL** instance

#### Database migrations (cms/apps/api)
```bash
npm run migration:run     # Run pending migrations
npm run migration:revert  # Revert last migration
```

### ewelink POC (`workshop/ewelink/`)
```bash
cp .env.example .env   # Configure credentials
node main.js
```

### odoo-slack POC (`workshop/odoo-slack-poc/`)
```bash
cp .env.example .env   # Configure Slack tokens and Odoo URL
node main.js
```

### Flutter (`workshop/learn_flutter/`)
```bash
flutter pub get        # Install dependencies
flutter run            # Run on connected device/emulator
```

### Go (`lang/go/`)
```bash
# basic
go run .

# basic-gin
go run .
```

### Python (`lang/python/`)
```bash
# adv-httprequest
pip install -r requirements.txt
python main.py

# djapp (Django)
python manage.py runserver
```

### C# (`lang/cs/`)
```bash
dotnet run             # Run the Web API project
dotnet build           # Build only
```

## Tech Stack Summary

| Area | Technologies |
|------|-------------|
| Backend | NestJS, Go (Gin), ASP.NET Core, Django |
| Frontend | Next.js 15, Angular 10, React, Vue, Flutter |
| Database | PostgreSQL (TypeORM), SQLite |
| Languages | TypeScript, JavaScript, Go, Python, C#, Dart |
| Build tools | Turbo, Angular CLI, Next.js, Flutter, .NET SDK |
| Testing | Jest (NestJS), Karma/Jasmine (Angular) |
| Code quality | ESLint, Prettier, TypeScript strict checks |
| IoT / Integrations | eWeLink API, Slack Bolt, Odoo |
| AR | AR.js, A-Frame |

## Code Style

- **Indentation**: 2 spaces (all languages where applicable)
- **Formatter**: Prettier (TypeScript/JavaScript), configured via `.prettierrc`
- **TypeScript**: Strict mode enabled in the `cms` monorepo
- **Format on save** is configured in `.vscode/settings.json`

## Environment Variables

Projects that require `.env` files ship an `.env.example`. Always copy and populate before running:
- `workshop/ewelink/.env.example`
- `workshop/odoo-slack-poc/.env.example`
