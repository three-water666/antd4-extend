# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library designed to extend Ant Design v4 (`antd4-extend`). It brings features from Ant Design v5+ (like Tour, Watermark) to v4 projects. It uses `dumi` for documentation/development and `father` for building the library.

## Common Commands

- **Start Development Server**: `npm start` (runs `dumi dev` - starts doc site locally)
- **Build Library**: `npm run build` (runs `father build` - outputs to `es/` and `lib/`)
- **Build Documentation**: `npm run docs:build`
- **Lint/Test**: No explicit lint or test scripts are currently configured in `package.json`.

## Code Architecture

- **Source**: `src/` contains all component logic.
- **Component Structure**: Each component (e.g., `src/Watermark/`) typically contains:
    - `index.tsx`: Main component implementation.
    - `interface.ts`: Type definitions.
    - `index.md`: Documentation and examples (dumi format).
    - `style/`: Contains Less files (`index.less`) and JS style entry (`index.tsx`, `css.tsx`).
- **Styling**: Uses Less. Styles are imported via the `style` directory within each component.
- **Build Output**:
    - `es/`: ES Modules build.
    - `lib/`: CommonJS build.
    - `dist/`: UMD build (via father).

## Development Guidelines

- **Adding Components**: Create a new directory in `src/`. Ensure it has an `index.md` for documentation so it appears in the dumi site. Export it in `src/index.ts`.
- **Documentation**: Write component docs in `index.md` using Markdown and embedded React code blocks for examples.
- **Deps**: This library relies on `antd` (<5.0.0) as a peer dependency.
