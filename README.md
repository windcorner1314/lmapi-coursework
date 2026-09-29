# lmapi-coursework

LMAPI 课程作业归档。所有作业共用本仓库，每次作业一个文件夹；网页用于展示，仓库用于保存源码增量、集成说明与真实实验依据。

## 作业目录

| 作业 | 主题 | 网页入口 | 源码与记录 |
| --- | --- | --- | --- |
| 01 · B | Structured Outputs：从“请输出 JSON”到 Schema 约束 | [作业网页](https://www.windcorner.online/homework/1/) | [homework-01-structured-outputs](homework-01-structured-outputs/README.md) |

第一次作业已完成教学页面、交互实验台、学习笔记、源码归档与本地测试。两条线上作业地址已通过 HTTP 与正文核对，评阅可从作业网页或对应 README 开始。

## 阅读顺序

1. 阅读各作业 README，了解任务、实现、边界和验证结果。
2. 查看 `src/` 与 `integration/`，审阅作业源码及宿主工程的最小改动。
3. 查看 `docs/`、`evidence/`，区分过程摘要、工具结果和截图。
4. 查看 `ai-records/`，了解 AI 辅助方式与记录覆盖范围。

## 归档原则

- 当前保存 Astro/Fuwari 集成版源码增量，不是完整博客或独立可运行工程；不在仓库根目录运行 `pnpm build`。
- 原始文件留在原工程，公开副本经过路径脱敏；不提交凭据、依赖目录、服务器备份或完整个人博客。
- 本地教学样例不等于模型 API 生成结果；没有执行的实验明确标为未执行。
- AI 任务、过程与验证证据已提供；会话数据库导出另保存在本地审阅目录，公开目录不冒充完整逐字聊天记录。
- 当前为已有成果的本地整理，不伪造开发时间线或历史提交。

## 提交入口

课程仓库：https://github.com/windcorner1314/lmapi-coursework

腾讯文档按要求填写作业网页和 GitHub repository；可额外填写对应作业文件夹链接，方便评阅。各作业将交付成果与实验范围分开说明。