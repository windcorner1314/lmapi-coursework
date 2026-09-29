# 作业 01 · Structured Outputs

B：从“请输出 JSON”到 Schema 约束。

- 网页：https://www.windcorner.online/homework/1/
- 作业目录：https://www.windcorner.online/homework/
- 本文件夹是现有 Fuwari 的源码增量与实验档案，不是完整博客，也不是独立可运行工程。
- 链接的最终公网验收尚未归档；历史本地预览地址不代表当前有预览进程。

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
| AI 记录状态 | [ai-records](ai-records/README.md) |
| 学习笔记（AI 辅助整理，待本人审阅） | [reflection](docs/reflection.md) |
| 缺失材料 | [missing-materials](docs/missing-materials.md) |
| 本次归档检查 | [archive-verification](docs/archive-verification.md) |

## 历史结果与限制

原验收记录：Windows 工具链构建通过，18 页面、Pagefind 13 页面；自动测试 11/11 通过。`pnpm check` 仍有 Navbar 与 archive 两个既存类型错误及 3 hints，并非全部通过。

浏览器记录包括六种样例、导航、刷新、键盘与移动端。保留手机横溢的失败测量和修正后数据。评论后端本地未启动，只确认页面布局，未确认评论数据功能。

用户提供过服务器构建成功结果，但完整服务器终端导出、正式切换与公网验收证据尚未纳入本归档。完整 AI 对话也待导出、脱敏、校核；摘要不冒充原始日志。

## 使用方式

先阅读集成说明。已有 Fuwari 宿主工程中应用源码和配置补丁后再构建；不要在课程仓库根目录执行 `pnpm build`。不复制原博客内容、依赖或凭据。
