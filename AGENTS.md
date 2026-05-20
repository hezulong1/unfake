# Agent Guidance

此文件提供通用的仓库工作指南，适用于各种 AI 辅助模型。

## 项目概述

这是一个使用 pnpm 工作区管理的多包仓库。主要包包括：

1. **unfake** (`packages/core`) - 核心工具库，包含浏览器、逻辑和基础工具
2. **playground-vue** (`packages/playground-vue`) - Vue.js 开发环境
3. **playground-lit** (`packages/playground-lit`) - Lit Element 开发环境
4. **playground-react** (`packages/playground-react`) - React 开发环境
5. **eslint-plugin** (`packages/eslint-plugin`) - 自定义 ESLint 规则

## 开发设置

### 先决条件
- Node.js >= 22.18.0
- pnpm >= 10.33.0

### 构建
```bash
# 构建所有包
pnpm build

# 构建指定包
pnpm --filter=unfake run build
```

### 运行开发服务器
```bash
# 运行 Vue 开发环境
pnpm dev-vue

# 运行 Lit 开发环境
pnpm dev-lit

# 运行 React 开发环境
pnpm dev-react
```

### 测试和格式化
```bash
# 格式化所有代码
pnpm format

# 在所有包上运行 linting
pnpm -r run lint
```

### 代码格式化规范
该项目遵循 [.editorconfig](.editorconfig) 配置文件中的格式化规则：
- 缩进大小：2个空格
- 缩进风格：空格
- 文件末尾：添加新行
- 行尾空白：自动移除

在每次修改代码后，请确保运行 `pnpm format` 来保持代码风格的一致性。

## 架构概览

代码库采用多包仓库结构，包含：

- **核心工具** 在 `packages/core` - 在项目中共享使用的工具
- **框架特定的游乐场** 在 `packages/playground-*` - 不同框架的开发环境
- **自定义 ESLint 插件** 在 `packages/eslint-plugin` - 共享的 linting 规则

核心包 (`unfake`) 导出：
- 主入口点：`unfake`
- 浏览器工具：`unfake/browser`
- 逻辑工具：`unfake/logic`

## 关键模式

- 使用 ES 模块与 `type: "module"` 在 package.json 中
- 遵循 TypeScript 严格模式配置
- 使用 pnpm 工作区进行依赖管理
- 利用现代 ES 特性 (ES2023)
- 模块化架构，有明确的关注点分离

## 包结构

- `packages/core`：核心工具库
- `packages/playground-vue`：Vue.js 开发环境
- `packages/playground-lit`：Lit Element 开发环境
- `packages/playground-react`：React 开发环境
- `packages/eslint-plugin`：自定义 ESLint 规则

## 常见任务

### 使用核心工具
1. 主 `unfake` 包包含浏览器工具、逻辑助手和基本工具
2. 使用 `unfake/browser` 进行 DOM 相关操作
3. 使用 `unfake/logic` 进行业务逻辑助手

### 使用游乐场应用
- 每个游乐场独立运行自己的开发服务器
- 使用 `pnpm dev-vue`、`pnpm dev-lit` 或 `pnpm dev-react` 运行相应的游乐场
- 游乐场应用配置了框架特定的 ESLint 规则

### 进行更改
1. 确定需要更改的包
2. 修改相应 `packages/*` 目录中的文件
3. 在相应游乐场中测试更改
4. 运行 `pnpm format` 以一致地格式化代码
5. 将更改提交到 git

## 框架特定详情

### Vue 游乐场
- 使用 Vite 和 Vue 3 构建
- 使用 Vue Router 进行导航
- 实现自定义滚动条组件
- 利用 Vue 组合式 API

### React 游乐场
- 使用 Vite 和 React 18 构建
- 使用 TanStack Router 进行路由
- 集成 Tailwind CSS 进行样式设计
- 使用 shadcn/ui 组件

### Lit 游乐场
- 使用 Vite 和 Lit 构建
- 使用自定义元素与 Lit
- 展示 Web Components 模式

