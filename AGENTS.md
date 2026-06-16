## 100my-page 项目

`100my-page` 是 Vue 3 + TypeScript + Vite 的个人主页/导航页项目，包含导航数据、主题/语言状态、网络检测、静态资源和 Docker + Nginx 部署配置。

**Important:** 不要把 `node_modules/`、`dist/` 当作源码维护；修改源码、配置或部署文件后优先用 `pnpm run build` 验证。

### Important files

- `package.json` — 项目脚本和依赖入口；`build` 会先运行 `vue-tsc -b` 再执行 Vite 构建。
- `pnpm-lock.yaml` — 当前依赖锁文件；调整依赖时保持锁文件同步。
- `vite.config.ts` — Vite 与 Vue 插件配置；变更构建行为时同步检查 TypeScript 配置。
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript 工程引用与严格检查配置。
- `Dockerfile` / `nginx.conf` / `.dockerignore` — 生产镜像、静态站点服务和构建上下文边界。
- `src/` — 前端源码主目录，子目录有更具体的 AGENTS.md。
- `public/` — 原样发布的头像、favicon 和导航图标资源。
- `.github/workflows/` — GitHub Actions 构建、推送镜像和部署流程。

### Implementation notes

- 面向用户的展示文案优先进入 `src/i18n/`，导航、菜单、个人信息等数据优先进入 `src/config/`。
- 主题、语言等跨组件状态放在 `src/store/`；单组件临时状态留在组件内部。
- `.env` 会参与 Docker 构建上下文；不要把 secret、token 或未脱敏私有配置写入文档或提交说明。
- 修改部署链路时同时核对 `package.json` 脚本、`Dockerfile` 安装/构建命令、`.dockerignore` 和 `.github/workflows/deploy.yml`。
