> 公开归档副本：仅脱敏环境路径等信息，保留原记录结论与时态。它描述记录当时的状态，不表示预览仍运行或部署已完成。归档说明见 ../../docs/provenance.md。

# Structured Outputs 官方资料核对

本记录在编写教学内容前建立；以下是文档结论，不是 API 实测。

## OpenAI

- https://developers.openai.com/api/docs/guides/structured-outputs
- 可直接读取的 Markdown：https://developers.openai.com/api/docs/guides/structured-outputs.md
- API 迁移说明：https://developers.openai.com/api/docs/guides/migrate-to-responses
- 本轮通过官方 Markdown 原文核对了 JSON mode、supported schemas、refusal、incomplete、Handling mistakes 等章节。
- Prompt 中要求 JSON 不是接口级约束；JSON mode 约束 JSON 语法，不保证字段满足 Schema。
- Responses API 使用 `text.format`，格式为 `{type: "json_schema", name, strict: true, schema}`；Chat Completions 使用 `response_format` 下的 `json_schema` 对象，二者不可混写。
- 严格模式仅支持 JSON Schema 子集；对象需要 `additionalProperties: false`，字段必须列入 required，可通过 nullable 类型表达可空值。
- 先处理拒绝与未完成状态：Responses 内容块可能为 `refusal`；`status: "incomplete"` 和 `incomplete_details.reason: "max_output_tokens"` 不能当作完整结果消费。
- 文档明确说明 Structured Outputs 仍可能包含错误；结构符合不等于事实正确。

## Anthropic

- https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- https://platform.claude.com/docs/en/build-with-claude/structured-outputs.md
- 直接网页及 Markdown 请求在本环境跳转到地区不可用页面，不能宣称完整原文已直连读取。本轮通过搜索工具返回的上述官方页面索引正文及针对性检索核对以下结论；正式 API 实测前需复核最新文档与账户模型支持。
- Messages API 使用 `output_config.format: {type: "json_schema", schema}`；旧 beta `output_format` 不作为本作业默认请求形式。
- JSON outputs 约束响应，strict tool use 的 `strict: true` 约束工具名称与输入，两者用途不同。不要把 OpenAI 的 format.strict 字段照搬到 Anthropic 的 output_config.format 中。
- 拒绝优先于 Schema；`stop_reason: "max_tokens"` 表示可能截断，不应直接解析消费。需单独处理拒绝（`stop_reason: "refusal"`）、截断与 API 错误。
- 两家的 Schema 支持范围与模型支持需各自核对，不宣称所有 JSON Schema 规则和所有模型都可用。

## 页面使用方式

示例仅展示 JavaScript SDK 请求形状，client、model、schema 均显式说明来源。模型使用支持该功能的模型变量，不编造账户可用型号。没有安装 API SDK、读取 Key 或发起收费 API 请求。

本地实验台使用固定课程摘录 Schema，只校验 object/string/integer/boolean、properties、required、additionalProperties:false；不是完整 JSON Schema 引擎，不模拟模型生成。所有样例标注预设教学数据。
