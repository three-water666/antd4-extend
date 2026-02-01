# Agent Development Guide - antd4-extend

This document provides essential information for AI agents working on the `antd4-extend` repository. Adhere to these guidelines to maintain consistency and quality.

## 1. Project Overview
`antd4-extend` is a library designed to bring Ant Design v5+ components (starting with Tour) to projects still using Ant Design v4. It bridges the gap between major versions by providing backported components.

## 2. Development & Commands

### Infrastructure
- **Build Tool**: [father](https://github.com/umijs/father) (v4)
- **Doc/Dev Tool**: [dumi](https://d.umijs.org/) (v2)
- **Target**: React >= 16.9.0, Ant Design v4

### Core Commands
- **Start Dev Server**: `npm start`
  - Runs `dumi dev` for documentation and component playground.
- **Build Library**: `npm run build`
  - Runs `father build`. Outputs to `es/` (ESM), `lib/` (CJS), and `dist/` (UMD).
- **Build Docs**: `npm run docs:build`
  - Runs `dumi build`.
- **Linting/Testing**: Currently no explicit scripts. Follow project conventions.

## 3. Architecture & Structure
- `src/`: Core source code.
  - `index.ts`: Entry point, exports all components and types.
  - `style/`: Global styles and common Less variables.
  - `[ComponentName]/`: Each component has its own directory.
    - `index.tsx`: Component implementation using React.FC.
    - `interface.ts`: TypeScript types and interfaces (exported).
    - `placements.ts`: Popover/Tooltip placement configurations (if applicable).
    - `index.less`: Component-specific Less styles.
    - `style/`: Directory containing:
      - `index.tsx`: Imports Less files (for `babel-plugin-import`).
      - `css.tsx`: Imports compiled CSS files.
    - `locale/`: i18n files (e.g., `zh_CN.ts`, `en_US.ts`).
    - `index.md`: dumi documentation for the component with live examples.
- `docs/`: General documentation (getting started, theme customization, etc.).
- `.fatherrc.ts`: Father configuration for build outputs (esm, cjs, umd).
- `.dumirc.ts`: Dumi configuration for documentation site, theme, and alias.

## 4. Code Style & Conventions

### General
- **Language**: TypeScript (v4.9+).
- **Indentation**: 2 spaces.
- **Quotes**: Single quotes (`'`).
- **Semicolons**: Always used.
- **Comments**: Chinese is acceptable for internal logic explanation (matching existing code).

### Components
- Use **Functional Components** with `React.FC`.
- **Hooks**: Use standard React hooks (`useState`, `useEffect`, `useContext`) and `rc-util` hooks where appropriate (e.g., `useMergedState`).
- **Destructuring**: Destructure props at the top of the component body.
- **ConfigProvider**: Use `ConfigProvider.ConfigContext` to get `getPrefixCls` and `locale` for consistency with Ant Design's global configuration.

### Naming Conventions
- **Components**: PascalCase (e.g., `Tour`).
- **Functions/Variables**: camelCase.
- **Files**:
  - Main component: `index.tsx`.
  - Types: `interface.ts`.
  - Styles: `index.less` within component directory, and a `style/` directory containing `index.tsx` (for Less) and `css.tsx` (for CSS).

### Imports
- Order:
  1. React and third-party libraries.
  2. Local component dependencies.
  3. Types/Interfaces.
  4. Styles.
- Style imports: Use `import './style'` in the main component file.

## 5. Types & Interfaces
- Define all props in `interface.ts`.
- Export interfaces so they can be used by library consumers.
- Name interfaces as `[ComponentName]Props` and `[ComponentName]StepProps`.
- Reuse types from `@rc-component/*` and `antd` where possible.

## 6. Styling
- Use **Less** for styling.
- Follow Ant Design's BEM-like naming convention (e.g., `${prefixCls}-content`).
- Ensure `javascriptEnabled: true` is supported in Less loaders.
- Use `classNames` utility for conditional styling.
- Component styles should be modular and scoped using `prefixCls`.

## 7. i18n (Internationalization)
- Components should support i18n via a `locale` prop and global `ConfigProvider`.
- Maintain translations in `locale/` (e.g., `zh_CN.ts`, `en_US.ts`).
- Merge internal locale with user-provided `locale` prop.
- Example pattern:
  ```typescript
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const mergedLocale = {
    ...(locale?.locale?.includes('zh') ? zhCN : enUS),
    ...customLocale,
  };
  ```

## 8. Documentation
- Use **dumi** for documentation.
- Each component should have an `index.md` file in its directory.
- Documentation should include:
  - Usage examples (embedded as JSX/TSX blocks).
  - API table (automatically generated or manually maintained).

## 9. Error Handling & Robustness
- Use defensive programming (e.g., optional chaining `?.`).
- Provide sensible defaults for optional props.
- Handle edge cases like empty steps or missing targets.

## 10. (Reserved for Future Use)

## 11. Best Practices for AI Agents
- **Backporting Logic**: When adding new components, look at the official Ant Design v5 source code and adapt it to work with v4 peer dependencies (avoiding v5-only features like CSS-in-JS `antd-style` if possible, sticking to Less).
- **Consistency**: Mimic the implementation pattern of the `Tour` component.
- **Verification**: Since there are no automated tests, manually verify changes via the `dumi` dev server (`npm start`). Check different themes (if applicable) and responsiveness.
- **Dependencies**: Prefer `rc-util` for common utility hooks and functions.

## 12. Rules & Instructions
- No Cursor rules (`.cursorrules`) or Copilot instructions (`.github/copilot-instructions.md`) found. Follow this document instead.
- Root directory: `E:\Code\GITHUB\antd4-extend`.
- Always use absolute paths for file operations.
- Maintain the library's goal: v5 features on v4 infrastructure.
