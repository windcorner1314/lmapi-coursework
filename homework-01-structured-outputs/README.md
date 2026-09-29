# 作业 01 · Structured Outputs

B：从“请输出 JSON”到 Schema 约束。

- 网页：https://www.windcorner.online/homework/1/
- 作业目录：https://www.windcorner.online/homework/
- 本文件夹是现有 Fuwari 的源码增量与实验档案，不是完整博客，也不是独立可运行工程。
- 线上目录与主页面已完成 HTTP 及正文核对；本地交互测试证据见下文。

## 已完成成果

| 成果 | 状态与证据 |
| --- | --- |
| Structured Outputs 教学页面 | 已完成：比较 Prompt、JSON mode 与 Schema 约束，并解释拒绝、截断及事实错误边界 |
| JSON 交互实验台 | 已完成：六种教学样例、可编辑输入、解析与结构结果分别显示 |
| 官方资料研究与学习笔记 | 已完成：[官方引用](evidence/records/structured-outputs-references.md)、[学习笔记](docs/reflection.md)，笔记由 AI 辅助整理 |
| 源码与集成说明 | 已归档：六个实现文件、两个测试脚本及两处共享配置增量 |
| 自动测试与本地页面验收 | 已完成：原工程 11/11 测试通过；归档校验器 8/8、临时配置集成测试 11/11 通过；浏览器数据及截图保留 |
| 线上页面可访问性 | 已核对：两条作业 URL 均返回 HTTP 200，最终 URL 不变，标题与正文符合对应作业页面 |
| 智能体交互记录 | 已归档：[四阶段原始消息公开副本](ai-records/README.md)，共 311 条，包含学生指令、助手回复、调用参数与工具结果 |

建议评阅顺序：打开网页体验实验台 → 阅读学习笔记 → 查看测试与源码。集中说明见 [交付范围与证据说明](docs/missing-materials.md)。

## 内容与真实性

解释 Prompt 要求 JSON、JSON mode、Schema 约束的区别，并比较两家官方 API 的请求形式。实验台显示固定 Schema，支持编辑 JSON、加载六种样例，分别反馈解析与结构校验结果。

支持规则仅限固定对象的必填字段、string/integer/boolean 类型和禁止额外属性。它不是通用 JSON Schema 引擎，也没有调用模型 API。结构合规不能证明事实正确；页面解释拒绝、截断和不支持 Schema 等边界。

用户已确认本次不要求真实 API 对照实验，因此采用官方资料研究与本地交互演示，不另行进行收费接口调用。模型接口行为的说明来自官方文档，不冒充实测；Codex 订阅用于真实的 AI 辅助开发。学习笔记中的对照方案仅供拓展阅读。

## 文件导航

| 内容 | 入口 |
| --- | --- |
| 任务范围 | [requirements](docs/requirements.md) |
| 源码 | [主页面](src/pages/homework/1.astro)、[目录](src/pages/homework/index.astro)、[布局](src/layouts/HomeworkLayout.astro)、[实验台](src/components/homework/JsonLab.astro)、[校验器](src/components/homework/validator.ts)、[样式](src/styles/homework.css) |
| 集成方法及共享补丁 | [integration](integration/README.md) |
| 原测试脚本 | [页面测试](scripts/homework-pages.test.mjs)、[校验器测试](scripts/homework-validator.test.mjs) |
| 过程摘要 | [process](docs/process.md) |
| 官方引用 | [references](evidence/records/structured-outputs-references.md) |
| 历史验收 | [verification](evidence/records/homework-1-verification.md) |
| 日志、截图与浏览器数据 | [evidence](evidence/README.md) |
| 公开副本与脱敏规则 | [provenance](docs/provenance.md)、[来源哈希](evidence/source-manifest.json) |
| 智能体交互记录（重点评阅入口） | [对话与工具记录](ai-records/README.md) |
| 学习笔记（AI 辅助整理） | [reflection](docs/reflection.md) |
| 交付范围与证据说明 | [范围说明](docs/missing-materials.md) |
| 本次归档检查 | [archive-verification](docs/archive-verification.md) |

## 历史结果与限制

原验收记录：Windows 工具链构建通过，18 页面、Pagefind 13 页面；自动测试 11/11 通过。`pnpm check` 仍有 Navbar 与 archive 两个既存类型错误及 3 hints，并非全部通过。

浏览器记录包括六种样例、导航、刷新、键盘与移动端。保留手机横溢的失败测量和修正后数据。评论后端本地未启动，只确认页面布局，未确认评论数据功能。

用户提供过服务器构建成功结果，原消息公开副本已归档于交互记录第三部分。另已核对线上目录和主页面的 HTTP 状态、最终 URL、页面标题及正文，确认不是首页回退；该读取不替代本地浏览器交互测试。会话公开副本已加入 ai-records，覆盖范围、脱敏规则及原输出截断等限制见导出说明。

## 使用方式

先阅读集成说明。已有 Fuwari 宿主工程中应用源码和配置补丁后再构建；不要在课程仓库根目录执行 `pnpm build`。不复制原博客内容、依赖或凭据。
