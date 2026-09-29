> 公开归档副本：仅脱敏环境路径等信息，保留原记录结论与时态。它描述记录当时的状态，不表示预览仍运行或部署已完成。归档说明见 ../../docs/provenance.md。

# Hermes 文件处理实验：本地工程环境摘要

## 1. 记录范围与证据来源

- 工作目录：`[PROJECT_ROOT]`。
- 项目：`fuwari`，项目版本 `0.1.1`，`type: module`。
- 本次重新读取 `package.json`，解析 `pnpm-lock.yaml` 的根 importer，并读取相关已安装包的 `package.json` 版本元数据；重新执行 Git 状态检查和 Node/pnpm 版本查询。
- Astro、Tailwind、Svelte、Swup 配置与页面结构的说明结合本会话上一轮只读检查，不表示本次重新运行了应用。
- 写入前已检查目标文件：`codex/hermes-lab/environment-summary.md` 不存在，因此本次为新增记录，不覆盖已有文件。
- 本次只新增此实验记录；不修改源码、配置、锁文件，不安装依赖、不运行格式化、不部署，不读取 `.env`、认证文件或其他凭据。

## 2. 包管理器与实际命令检查

| 项目 | 来源或命令 | 结果 |
| --- | --- | --- |
| 声明的包管理器 | `package.json` 的 `packageManager` | `pnpm@9.14.4` |
| 锁文件 | 根目录文件检查 | `pnpm-lock.yaml`，`lockfileVersion: '9.0'` |
| 当前 Node 版本 | `node --version` | `v26.8.2` |
| 当前 pnpm 版本 | `pnpm --version` | `9.14.4` |
| pnpm 命令来源 | `command -v pnpm` | `[WINDOWS_USER_NPM]/pnpm` |

特别注意：当前会话运行于 WSL，项目位于 Windows C: 盘挂载目录，pnpm 命令也来自 Windows 用户路径。版本命令成功不等于开发服务器或构建已通过；WSL/Windows 混合路径、现有 node_modules 与构建所需原生依赖的兼容性尚未验证。没有为本次记录更换工具链或重新安装依赖。

## 3. 声明版本、锁定版本与已安装版本

下表保留 `package.json` 中的原始声明（包括 `^`）；锁定版本来自 `pnpm-lock.yaml` 根 importer，展示包本身版本，省略 peer dependency 上下文后缀。已安装版本只来自 `node_modules` 内包元数据，不是框架启动或构建测试结果。

| 依赖 | 声明版本 | 锁定版本 | 已安装元数据版本 | 声明位置 |
| --- | --- | --- | --- | --- |
| `astro` | `5.13.10` | `5.13.10` | `5.13.10` | dependencies |
| `@astrojs/check` | `^0.9.6` | `0.9.6` | `0.9.6` | dependencies |
| `@astrojs/rss` | `^4.0.14` | `4.0.14` | `4.0.14` | dependencies |
| `@astrojs/sitemap` | `^3.6.0` | `3.6.0` | `3.6.0` | dependencies |
| `@astrojs/svelte` | `7.2.3` | `7.2.3` | `7.2.3` | dependencies |
| `@astrojs/tailwind` | `^6.0.2` | `6.0.2` | `6.0.2` | dependencies |
| `astro-expressive-code` | `^0.41.4` | `0.41.4` | `0.41.4` | dependencies |
| `astro-icon` | `^1.1.5` | `1.1.5` | `1.1.5` | dependencies |
| `@astrojs/ts-plugin` | `^1.10.6` | `1.10.6` | `1.10.6` | devDependencies |
| `tailwindcss` | `^3.4.19` | `3.4.19` | `3.4.19` | dependencies |
| `@tailwindcss/typography` | `^0.5.19` | `0.5.19` | `0.5.19` | dependencies |
| `svelte` | `^5.39.8` | `5.39.8` | `5.39.8` | dependencies |
| `@iconify/svelte` | `^4.2.0` | `4.2.0` | `4.2.0` | dependencies |
| `@swup/astro` | `^1.7.0` | `1.7.0` | `1.7.0` | dependencies |

`swup` 核心不是根 package.json 中的直接依赖，不应编造其声明版本。上一轮从 `@swup/astro` 的依赖位置读取到实际安装的 Swup 核心版本为 `4.8.2`；此处不把该安装元数据冒充本次单独核验的锁定版本或浏览器运行结果。

上一轮逐项比较了根 package.json 的 dependencies/devDependencies 与锁文件 importer 的 specifier，没有发现声明差异。锁文件当前没有 Git 改动。

## 4. scripts 完整提取与使用边界

以下值逐项来自本次重新读取的 `package.json`，仅作为记录，不表示已执行。

| script | 原始命令 |
| --- | --- |
| `dev` | `astro dev` |
| `start` | `astro dev` |
| `check` | `astro check` |
| `build` | `astro build && pagefind --site dist` |
| `preview` | `astro preview` |
| `astro` | `astro` |
| `type-check` | `tsc --noEmit --isolatedDeclarations` |
| `new-post` | `node scripts/new-post.js` |
| `format` | `biome format --write ./src` |
| `lint` | `biome check --write ./src` |
| `preinstall` | `npx only-allow pnpm` |

后续获准开发时，在项目根目录使用：

- 开发：`pnpm dev`（或 `pnpm start`），端口以实际输出为准。
- 构建：`pnpm build`，先执行 Astro 构建，再为 `dist` 建立 Pagefind 索引。
- 生产产物预览：`pnpm preview`。
- Astro 检查：`pnpm check`；类型检查脚本：`pnpm run type-check`。

`lint` 和 `format` 都带 `--write`，会修改文件，不可当作只读检查运行。`new-post` 也不是只读操作。本轮没有运行上述项目脚本；构建和 Astro 检查可能生成工程文件或缓存，不能将源码核对描述为这些检查通过。

## 5. 实际技术栈与配置

- Fuwari + Astro 5 + Tailwind CSS 3 + Svelte 5，另有 TypeScript、Stylus、Markdown 插件、Expressive Code、KaTeX、Pagefind、PhotoSwipe 等现有能力。
- `astro.config.mjs:28`：`base: "/"`、`trailingSlash: "always"`；没有显式 SSR adapter 或 server output 配置，采用默认静态输出 `dist`。
- `site` 仍是 `https://fuwari.vercel.app/`，不同于指导文件的正式提交域名 `https://www.windcorner.online`。这是已有问题，不在实验中修改。
- `tailwind.config.cjs`：扫描 `src` 下 Astro、Svelte、TS 等源码；`darkMode: "class"`；扩展 Roboto 字体并启用 typography 插件。Astro Tailwind 集成开启 nesting，PostCSS 配置 import、nesting 和 Tailwind。
- `svelte.config.js`：`vitePreprocess({ script: true })`；Astro 配置集成 `svelte()`。现有搜索、主题设置、归档等组件使用 `client:only="svelte"`。
- `astro.config.mjs:36`：Swup 替换 `main` 与 `#toc`；开启平滑滚动、缓存、预加载、无障碍、head 更新和全局实例；`updateBodyClass: false`。当前没有 homework 专项排除。
- 已安装 `@swup/astro` 源码确认支持 `ignore` 和 `data-no-swup`。独立布局不会自动绕过全局注入的页面切换，后续需要覆盖进入作业、返回博客、作业间导航和历史前进后退。
- 开发代理：`/api` 转发到 `http://127.0.0.1:3001`；评论页请求 `/api/comments/all/`。这仅证明前端配置存在，不证明评论后端正在运行。
- TypeScript 使用 `astro/tsconfigs/strict`，配置了 `@/*`、`@components/*`、`@layouts/*` 等源码别名。

## 6. 页面与布局现状及新增页面约束

上一轮核对到的页面文件：

- `src/pages/[...page].astro`：首页和博客分页，使用 paginate 生成静态路径。
- `src/pages/posts/[...slug].astro`：由文章内容生成静态文章路径。
- `src/pages/about.astro`、`src/pages/archive.astro`、`src/pages/comments.astro`。
- `src/pages/robots.txt.ts`、`src/pages/rss.xml.ts`。

布局只有 `src/layouts/Layout.astro` 和 `src/layouts/MainGridLayout.astro`，包含博客主题、背景、侧栏、目录、滚动与 Swup 生命周期逻辑。尚无 `src/pages/homework/`、`src/layouts/HomeworkLayout.astro`、`public/homework/` 或 `dist` 中的 homework 产物。现有 dist 只是历史产物，不能证明当前源码构建成功。

后续新增作业应遵守 `codex/HOMEWORK-TECHNICAL-GUIDE.md`：使用显式 `/homework/`、`/homework/编号/` 页面及独立布局；保留 `base=/`；局部样式隔离；自然滚动、章节 hash、响应式与键盘可访问；主要内容直接生成 HTML；复杂交互按需使用 Svelte；优先完整页面导航并验证 Swup 排除；不顺手升级技术栈或修改评论后端，不编造实操成果、不公开凭据、不自动部署。

## 7. Git 基线与必须保留的已有改动

本次写入前重新检查：

- 分支为 `master`，相对本地记录的上游领先 4 个提交、落后 0 个。没有 fetch，不能视为远端实时状态。
- 1 个文件有暂存改动：`src/components/Footer.astro`。暂存差异新增 8 行，加入工信部备案链接 `https://beian.miit.gov.cn/` 和 `苏ICP备2026052793号`，必须保留。
- 117 个文件有未暂存差异，其中包含 Footer。逐文件比较索引与工作区，并仅将 CRLF 统一为 LF 后，117 个文件全部相同：这些未暂存差异均仅为换行符差异。不擅自清除、归一化、格式化或覆盖。
- Footer 状态为 `MM`，表示暂存备案改动与未暂存换行符差异同时存在，不能误认为两者是同一层修改。
- 原有 3 个未跟踪文件必须保留：
  - `codex/HOMEWORK-TECHNICAL-GUIDE.md`
  - `public/pic/zhuanyijuzhen.png`
  - `src/content/posts/ReinforcementLearning/MBP0011.md`
- 当前锁文件没有 Git 改动；保持原状。
- 上一轮在项目源码树（排除依赖、Git 元数据和构建输出）及祖先目录中未发现 AGENTS.md；本次又检查了祖先目录及目标目录层级，未发现新增的 AGENTS.md。

本实验允许在上述基线上新增本记录，不授权 reset、checkout、clean、add、commit、push 或其他会改变已有源码、暂存区和历史的操作。

## 8. 验证结论与尚未验证事项

### 已实际检查

- 工作目录、分支、相对本地上游的提交计数及 Git 已有差异。
- 重新读取的 packageManager、完整 scripts 和 Astro/Tailwind/Svelte/Swup 相关依赖声明。
- 表内直接依赖的锁定版本和 node_modules 版本元数据。
- `node --version`、`pnpm --version` 和 `command -v pnpm` 的真实输出。
- 目标文件写入前不存在。

### 尚未验证

- WSL 中调用 Windows 路径 pnpm 的实际开发与构建兼容性，以及现有依赖和原生模块能否完整运行。
- `pnpm dev`、`pnpm build`、`pnpm preview`、`pnpm check`、类型检查及 lint 的运行结果；本轮均未执行，不能声明通过。
- homework 页面尚未实现，其刷新、章节定位、Swup 双向导航、历史前进后退、交互、无 JS 阅读和移动端表现均未验证。
- 当前源码生成的生产资源、Pagefind 索引和浏览器控制台状态。
- 评论服务运行状态、数据库、线上接口、Nginx、服务器目录和权限、公网域名与部署情况。本实验不连接服务器、不部署。

写入后的文件读取与字段一致性检查由本轮工具继续执行；此记录不预先宣称该后续步骤已通过。
