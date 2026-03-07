# Photo Gallery & Portfolio

A professional photo gallery and portfolio application built with Next.js 15, TypeScript, and Tailwind CSS. This project is designed for **demoing GitHub Copilot features** in a real-world, component-driven Next.js application. The included demos showcase how Copilot can assist with code generation, refactoring, UI building, and more.

## Demos

All demo guides are in the [`demos/`](demos/) folder. Work through them in order:

| #   | Demo                                                    | Description                                                            |
| --- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | [Features Demo](demos/features-demo.md)                 | Copilot core features — chat commands, code generation, AI suggestions |
| 2   | [Engineering Practices](demos/engineering-practices.md) | Debugging suggestions, exporting chats, system prompts                 |
| 3   | [Customize Copilot](demos/customize-copilot.md)         | Premium usage, model switching, prompt files, chat modes, MCP servers  |
| 4   | [Copilot Spaces](demos/copilot-spaces.md)               | Collaborative Spaces — goals, context files, shared development        |
| 5   | [Coding Agent](demos/coding-agent.md)                   | Copilot as a coding agent — issue assignment, PR review, iteration     |

See the [demos README](demos/README.md) for full descriptions.

### Creating a New Demo

1. Open GitHub Copilot Chat.
2. Type the prompt `/create-copilot-demo` with an explanation of your demo idea.
3. Copilot will generate a new demo file in the `demos/` directory.
4. Fill in remaining sections with detailed instructions, examples, and expected results.
5. Add the overview, key skills, and demo link to the [demos README](demos/README.md).

## Copilot Customization

This repo includes a full set of Copilot customization files under `.github/`:

| Type         | Path                                                                                                   | Description                               |
| ------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Instructions | [copilot-instructions.md](.github/copilot-instructions.md)                                             | Global Copilot context for the project    |
| Instructions | [instructions/mock-data.instructions.md](.github/instructions/mock-data.instructions.md)               | Conventions for `src/lib/mock-*.ts` files |
| Instructions | [instructions/photo-components.instructions.md](.github/instructions/photo-components.instructions.md) | Rules for `src/components/**`             |
| Prompt files | [prompts/create-copilot-demo.prompt.md](.github/prompts/create-copilot-demo.prompt.md)                 | Generate a new demo guide                 |
| Prompt files | [prompts/generate-mock-photo-data.prompt.md](.github/prompts/generate-mock-photo-data.prompt.md)       | Generate mock photo data                  |
| Prompt files | [prompts/generate-new-ui.prompt.md](.github/prompts/generate-new-ui.prompt.md)                         | Scaffold a new UI component               |
| Prompt files | [prompts/generate-unit-tests.prompt.md](.github/prompts/generate-unit-tests.prompt.md)                 | Generate unit tests for a component       |
| Skill        | [skills/ui-test-generation/SKILL.md](.github/skills/ui-test-generation/SKILL.md)                       | Repeatable UI test generation workflow    |
| Agent        | [agents/frontend-standards.agent.md](.github/agents/frontend-standards.agent.md)                       | Frontend standards review agent           |
| Agent        | [agents/security-review.agent.md](.github/agents/security-review.agent.md)                             | Security review agent                     |
| Chat mode    | [chatmodes/Plan.chatmode.md](.github/chatmodes/Plan.chatmode.md)                                       | Planning-focused chat mode                |

## Getting Started

### Technical Requirements

- **Node.js** v18 or newer
- **npm** (or yarn, pnpm, bun)

### Quick Start with GitHub Codespaces

The fastest way to get started is using GitHub Codespaces:

1. Click the **"Code"** button on the GitHub repository page
2. Select the **"Codespaces"** tab
3. Click **"Create codespace on main"**
4. Wait for the codespace to build and start

The codespace will automatically:

- Install all dependencies (`npm install`)
- Start the development server (`npm run dev`)
- Configure GitHub Copilot and essential VS Code extensions
- Forward port 3000 for the Next.js application

Once ready, access the application at the forwarded port URL provided in the terminal.

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jvargh/ghcp-developer-lab.git
   cd ghcp-developer-lab
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router pages
│   ├── page.tsx            # Home page
│   ├── admin/              # Admin dashboard
│   ├── explore/            # Explore/discover page
│   ├── gallery/            # Photo gallery page
│   └── upload/             # Upload page
├── components/
│   ├── ui/                 # Reusable UI components (cards, layout, stats)
│   ├── gallery/            # Gallery-specific components (grid, card, carousel)
│   └── upload/             # Upload components (drag & drop zone)
└── lib/                    # Mock data and utility helpers
.github/
├── copilot-instructions.md # Global Copilot instructions
├── instructions/           # Scoped instruction files
├── prompts/                # Reusable prompt files
├── skills/                 # Copilot skill definitions
├── agents/                 # Custom agent definitions
└── chatmodes/              # Custom chat modes
demos/                      # Step-by-step demo guides
```

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI:** Radix UI, Framer Motion, Lucide icons
- **Testing:** Jest + React Testing Library (unit), Playwright (e2e)
