# 本次本地归档验证

本轮没有重建网站、安装依赖、启动网站预览、部署、提交或推送。历史 build/check/浏览器结果保留为历史证据，不冒充本轮执行结果。

## 本轮实际执行

- Node：v26.8.2。
- 在归档作业目录运行 `node --test scripts/homework-validator.test.mjs`：8 tests，8 pass，0 fail，退出 0。原始输出见 [archive-validator-tests.log](../evidence/archive-validator-tests.log)。
- 在临时目录复制八个归档源码/测试文件；从原工程 HEAD 提取两个共享配置的临时副本，执行 `git apply --check --ignore-space-change`，通过；随后仅向临时副本应用补丁。
- 在该临时集成夹具运行两个原测试脚本：11 tests，11 pass，0 fail，退出 0。见 [archive-integration-tests.log](../evidence/archive-integration-tests.log)。此检查不等于 Astro 构建或网页运行，也没有向原工程应用补丁。
- 来源清单记录 29 个文件。各归档文件哈希与清单一致，全部来源原件的哈希与归档前一致。
- 原博客 Git porcelain 状态与归档前一致，远程地址未变。
- 课程仓库 HEAD 仍为克隆时的初始提交，暂存区为空；新材料仅在工作区。
- 对白名单文本副本检查本机路径、私钥头、常见 Token 模式等，未发现命中。自动模式检查不能证明没有任何隐私。
- 四张 PNG 只包含 IHDR/IDAT/IEND 块，没有文本/EXIF 元数据；未改变原图。尝试用浏览器查看图片时先遇 IPC 大小限制，分块重试后截图超时，本轮未完成再次目视审查。请用户发布前打开图片复核可见内容。

## 尚未验证

未执行公网验收、真实模型 API 调用、完整对话导出或服务器操作。历史 check 两个既存错误不在本轮修复范围。待补项见 [missing-materials](missing-materials.md)。
