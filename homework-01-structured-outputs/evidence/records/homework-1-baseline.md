> 公开归档副本：仅脱敏环境路径等信息，保留原记录结论与时态。它描述记录当时的状态，不表示预览仍运行或部署已完成。归档说明见 ../../docs/provenance.md。

# 第一次作业：开发前基线

## 工程与保留项

根目录 `[PROJECT_ROOT]`，master。开发前 AGENTS.md 不存在。Git 既有状态包含 Footer 已暂存备案链接、117 个文件未暂存换行符差异、原有 codex 记录、图片与 MBP0011.md 文章；均保留。

## 构建：先于实现执行

1. WSL `pnpm build`：退出 1，`Cannot find module @rollup/rollup-linux-x64-gnu`。
2. 调查：WSL Node 路径 `[WSL_USER_BIN]/node`，v26.8.2；pnpm 来自 `[WINDOWS_USER_NPM]/pnpm`。node_modules 包含 Windows Rollup/esbuild/sharp 原生依赖，没有对应 Linux 包。
3. 使用现有 Windows 工具链：`cmd.exe /c "pnpm build"`，Windows Node v24.14.1，pnpm 9.14.4。在同一工程成功，16 个页面，Pagefind 索引 12 个页面。
4. 未删除或重装 node_modules，未重建锁文件或升级依赖。Browserslist 数据旧的提示原样保留，没有执行更新。

结论：不是页面代码导致的构建失败，而是 Linux 运行时与现有 Windows 原生依赖不匹配。当前 Windows 路径可构建，不代表 Linux 依赖环境已修复。

## 开发前检查

`cmd.exe /c "pnpm check"`：退出 1；56 files，2 errors，0 warnings，3 hints。

既存错误：
- `src/components/Navbar.astro:54`：LightDarkSwitch 的 `client:only="svelte"` 与 Record<string, never> 类型不兼容（ts2322）。
- `src/pages/archive.astro:12`：PostForList[] 不能赋给 Post[]，category 的 string|null 与 string|undefined 不兼容（ts2322）。

既存 hints：MainGridLayout 未使用 imports、文章页 postId 未使用、language-badge 的 _cssVar 未使用。

这些错误不由作业新增代码引入，不在本任务顺手修复。
