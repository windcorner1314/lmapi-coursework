> 公开归档副本：仅脱敏环境路径等信息，保留原记录结论与时态。它描述记录当时的状态，不表示预览仍运行或部署已完成。归档说明见 ../../docs/provenance.md。

# 第一次 LMAPI 作业：第一版验收记录

检查日期：2026-09-28（本地 UTC+08:00）。

## 交付与预览

- 主页面：http://127.0.0.1:4321/homework/1/
- 作业目录：http://127.0.0.1:4321/homework/
- 当前采用生产构建预览，Windows Node/pnpm，通过 WSL 执行：`cmd.exe /c "pnpm preview --host 127.0.0.1 --port 4321"`。
- 仅绑定本机回环地址；没有部署或推送。预览进程结束后，在工程根目录重新运行上述命令。
- 工作目录：`[PROJECT_ROOT]`（Windows：`[PROJECT_ROOT]`）。
- 当前交付是 Astro 集成版；单文件要求与老师全部交付格式仍待确认。

## 中断恢复核对

恢复时核对 Git 差异、AGENTS.md、生成文件末尾和命令状态。没有发现写到一半的文件或未完成构建；已有实现不重新覆盖。重新运行 11 项测试通过，继续预览验收。

## 构建与检查

| 检查 | 实际结果 | 解释 |
| --- | --- | --- |
| 开发前 WSL `pnpm build` | 退出 1，缺少 Linux Rollup 原生模块 | 已有 node_modules 包含 Windows 平台模块；没有删除或重装依赖 |
| 开发前 `cmd.exe /c "pnpm build"` | 通过，16 页面，Pagefind 索引 12 页面 | 使用现有 Windows 工具链建立基线 |
| 完成后 `cmd.exe /c "pnpm build"` | 通过，18 页面，Pagefind 索引 13 页面 | 新增两条作业路由，主作业加入搜索索引；手机样式修正后再次构建通过 |
| `node --test scripts/homework-pages.test.mjs scripts/homework-validator.test.mjs` | 11 tests，11 pass，0 fail | 覆盖页面约定、Swup 路由规则和固定 Schema 校验 |
| 完成后 `cmd.exe /c "pnpm check"` | 61 files，2 errors，0 warnings，3 hints，退出 1 | 与开发前相同的两个错误，没有作业文件新增诊断 |

check 既存错误（未顺手修改）：

1. `src/components/Navbar.astro:54`：LightDarkSwitch 的 client:only 与 Record<string, never> 类型不兼容。
2. `src/pages/archive.astro:12`：PostForList[] 的 category 可为 null，与 Post[] 类型不兼容。

3 条既存 hints：MainGridLayout 未使用 imports、文章页 postId 未使用、language-badge 的 _cssVar 未使用。Browserslist 数据过旧提示保留，未执行依赖更新。

真实命令输出保存在同目录 `homework-1-check.log`、`homework-1-tests.log`。开发前记录见 `homework-1-baseline.md`。

## 浏览器验收

使用 Chromium/CDP 对实际 Astro production preview 检查，不以源文件存在代替交互验证。

### 路由与导航

- `/homework/` 与 `/homework/1/` 均直达、刷新成功，页面正文存在；主页面按钮启用。
- 博客 → 作业目录 → 第一次作业 → 博客均通过；跨布局跳转确认更换 document，而不是遗留博客 DOM。
- 目录/作业之间、作业/博客之间的浏览器后退与前进正常，返回后实验台仍可使用。
- 博客首页 → 关于页保持同一 document，说明博客内部 Swup 没有被整体关闭。
- 手机菜单可以打开，包含“作业”，点击可进入目录。
- 原生 #lab 锚点定位成功，标题距视口顶部约 24px，未更换 document。

### 校验实验台

| 教学样例 | JSON 解析 | Schema 校验 |
| --- | --- | --- |
| 合法对象 | 通过 | 通过 |
| 语法错误 | 失败 | 未执行 |
| 缺少必填字段 | 通过 | 失败 |
| 字段类型错误 | 通过 | 失败 |
| 额外字段 | 通过 | 失败 |
| 结构合规但观点错误 | 通过 | 通过；页面明确提示事实仍需核验 |

- 六种预设样例首次检查及重新进入后全部符合预期。
- 手动将 minutes 从字符串改为整数，结果由 Schema 失败变为通过；编辑输入后旧结果恢复“等待校验”，不会继续展示过时成功状态。
- 键盘焦点在校验按钮时，用 Enter 实际触发成功（CDP rawKeyDown/char/keyUp）。
- 关闭页面 JavaScript 后，六个正文章节、固定 Schema、样例预期仍可阅读；按钮保持 disabled，noscript 显示交互不可用说明。
- 验证只是本地固定 Schema 教学演示，没有发起模型 API 请求。

### 响应式与样式修正

发现并修复一次真实问题：API 示例的 Grid 隐式列按最小内容宽度撑开手机页面。修改仅限 `src/styles/homework.css`，给 `.hw-api-grid` 设置 `minmax(0, 1fr)` 并限制子项最小宽度。没有用全局 overflow:hidden 掩盖问题。

修正后的主页面结果：

| 视口宽度 | document clientWidth | scrollWidth | 整页横溢 |
| --- | --- | --- | --- |
| 320 | 305 | 305 | 无 |
| 375 | 360 | 360 | 无 |
| 390 | 375 | 375 | 无 |
| 768 | 753 | 753 | 无 |
| 1280 | 1265 | 1265 | 无 |

- 差值来自桌面 Chromium 显示滚动条；测试为 CSS 视口尺寸模拟，不冒充真机 Safari 测试。
- 作业目录在 320、375、390 宽度无整页横溢。
- 博客首页在 375、768、820、1024、1280 宽度无整页横溢；768 宽度导航未被新增“作业”挤坏。
- 长代码仅在代码块内水平滚动，键盘可聚焦。
- 已检查桌面和手机截图。设计自检：采用学习型页面、左对齐层级和操作实验台；未发现渐变、无意义图标卡片、假数据统计等装饰问题。

### 博客回归与限制

- 首页、关于页、归档页、文章 `/posts/ailearning/git/`、评论页可打开，导航和主布局保留，无作业 body class 泄漏。
- 检查范围内页面脚本错误收集为空，图片未发现加载失败；作业页未发现失败资源请求。
- 评论后端未启动。文章评论查询和评论页查询均访问本地 preview 的 `/api/`，返回 404；没有访问线上写接口。仅通过布局回归，不宣称评论数据功能通过。
- 未覆盖所有文章、所有浏览器、完整无障碍审计或服务器运行状态。

## 证据文件

`codex/hermes-lab/homework-1-qa/` 保存本次浏览器实际采集的 JSON 与截图：

- `homework-sample-results.json`、`homework-reentry-samples.json`：首次及重复进入的样例结果。
- `homework-responsive-results.json`：修复前手机溢出，保留失败证据。
- `homework-responsive-fixed.json`、`homework-index-responsive.json`、`blog-responsive-results.json`：修复后及回归尺寸数据。
- `homework-navigation-results.json`：8 个导航状态及 document 标识。
- `homework-blog-regression.json`：博客回归与本地 API 404。
- `homework-accessibility-results.json`：刷新、无 JS、键盘与锚点结果。
- `homework-desktop.png`、`homework-mobile.png`、`homework-index-mobile.png`、`homework-api-mobile.png`：实际预览截图。
- `blog-article.png`、`blog-comments.png`：实际博客回归截图。

截图仅证明本地页面预览，不作为 Hermes 安装截图或 API 实测证据。

## 文件清单与修改必要性

新增页面/实现：
- `src/pages/homework/index.astro`
- `src/pages/homework/1.astro`
- `src/layouts/HomeworkLayout.astro`
- `src/components/homework/JsonLab.astro`
- `src/components/homework/validator.ts`
- `src/styles/homework.css`

新增测试：
- `scripts/homework-pages.test.mjs`
- `scripts/homework-validator.test.mjs`

新增项目约定及记录：
- 根目录 `AGENTS.md`（此前不存在；Task / Constraints / Data / Output）
- `codex/hermes-lab/structured-outputs-references.md`
- `codex/hermes-lab/homework-1-baseline.md`
- 本验收记录、两个命令日志及 `homework-1-qa/` 证据目录。

共享文件最小增量：
- `astro.config.mjs`：增加 3 行，按来源/目标 homework 路径排除 Swup，实现双向完整页面导航。
- `src/config.ts`：增加 5 行“作业”导航配置，同时供桌面导航与手机菜单使用。

没有新增依赖；package.json 无内容修改，pnpm-lock.yaml 无差异。忽略既存行尾差异后，跟踪文件只有上述两个共享文件发生内容变化。Footer 已暂存 8 行备案链接保留；原有换行符差异、文章、图片与环境记录保留。未批量格式化、未部署、未推送。

## 待补材料与下一步

- Hermes 安装命令、脱敏配置/首次启动截图。
- 课堂要求的真实迭代记录与评价标准。
- 若老师要求 API 实测：另行确认模型、账户和费用，再保存真实脱敏请求/响应；当前没有模型调用数据。
- Anthropic 文档本环境直连地区受限，已明确引用官方页面索引；正式 API 调用前复核文档及模型支持。
- 单文件交付要求待确认；当前不宣称满足老师全部交付格式。
- 正式域名的 Astro site 仍为模板值，是既存旁支问题，本次没有修改。
