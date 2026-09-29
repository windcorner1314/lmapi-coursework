# 任务摘要（整理稿，非逐字原始指令）

在现有 Fuwari 中实现第一次 LMAPI 作业：Structured Outputs——从“请输出 JSON”到 Schema 约束。主路由 `/homework/1/`，目录 `/homework/`。

采用独立 HomeworkLayout，自然滚动、锚点和响应式；实验台显示固定 Schema、可编辑 JSON、样例和校验按钮。JSON 解析与 Schema 结果分开显示，并覆盖合法、语法、缺失、类型、额外字段和事实错误边界。

保留已有 Git 改动；只做必要共享配置增量；不改评论后端、不升级依赖、不批量格式化、不读凭据。演示不得冒充模型 API 实测。构建、类型检查与浏览器验证应区分既存错误和新增错误。

本轮用户进一步要求：一个课程仓库承载所有作业，本次放在 homework-01-structured-outputs；只做本地整理，原件保留，公开副本脱敏，不提交不推送。
