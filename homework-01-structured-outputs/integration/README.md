# 集成说明

这是 Fuwari 的源码增量，不是独立可运行项目。不需要为交作业复制整个博客。

## 来源与依赖

原工程基线 HEAD：`c90bc73676037f3426f57d60f076b7f65041ef2b`。本次作业在其未提交工作区中开发，该提交本身不包含作业，不应把它当作完整作业版本。

历史环境：Astro 5.13.10、Tailwind CSS 3.4.19、Svelte 5.39.8、@astrojs/svelte 7.2.3、@swup/astro 1.7.0、Swup 4.8.2、pnpm 9.14.4。声明、锁定与运行检查的区别见 `../evidence/records/environment-summary.md`。这些是历史记录，不是本轮安装的新环境。

## 在宿主工程中集成

1. 先备份并检查宿主的未提交改动。逐文件比较，不覆盖已有同名实现。
2. 将本文件夹的 `src/`、`scripts/` 中作业文件复制至宿主相同相对路径。不要把整个课程仓库当作网站根目录。
3. 在宿主根目录对 `integration/homework-shared.patch` 的实际路径执行 `git apply --check --ignore-space-change <补丁路径>`；检查通过并审阅后，才执行 `git apply --ignore-space-change <补丁路径>`。如果同样改动已存在，不重复应用；不同基线需人工合并。
4. 补丁只改两个位置：`astro.config.mjs` 对来源和目标 homework 路径排除 Swup；`src/config.ts` 增加“作业”导航。博客内部 Swup 保留。
5. 保留宿主 package.json、锁文件与现有依赖。此次没有新增依赖。

上述是手动集成说明，本轮归档未向任何宿主再次应用补丁。

## 验证与启动

以下命令在完整的宿主工程根目录执行（Windows PowerShell）：

    node --test scripts/homework-pages.test.mjs scripts/homework-validator.test.mjs
    pnpm build
    pnpm check
    pnpm preview --host 127.0.0.1 --port 4321

历史测试使用 Node v26.8.2。校验器测试直接导入 TypeScript，因此不要假定旧 Node 能运行。宿主依赖原本是 Windows 原生模块；WSL 中构建用 `cmd.exe /c "pnpm build"`、检查用 `cmd.exe /c "pnpm check"`，不要为兼容问题删除依赖、重建锁或升级。

本课程仓库内，只能在本作业目录用兼容 Node 单独运行 `node --test scripts/homework-validator.test.mjs`。完整页面测试还读取宿主 `astro.config.mjs` 和 `src/config.ts`，本仓库故意不复制这些完整配置，因此不能直接声称这里可运行全站测试或构建。

启动后访问 `http://127.0.0.1:4321/homework/` 和 `/homework/1/`；Ctrl+C 停止。当前归档未启动预览。

## 授权说明

宿主 Fuwari：https://github.com/saicaca/fuwari 。补丁包含少量宿主上下文，保留其 MIT 声明于 [FUWARI-LICENSE.txt](FUWARI-LICENSE.txt)。未擅自给用户全部作业、截图和个人文章指定新的开源许可证。
