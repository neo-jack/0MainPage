# 0MainPage - 个人主页 / 导航页（Vue3 + TypeScript）

一个个人主页风格的导航站点，支持主题切换、国际化、响应式布局与站点状态（心跳）检测，并提供 Docker + Nginx 的生产部署方案。

---

## 技术栈

- **框架**：Vue 3
- **语言**：TypeScript
- **构建**：Vite
- **状态管理**：Pinia
- **样式**：SCSS
- **网络请求**：fetch（站点检测）；Axios（项目已安装，可用于业务接口）
- **图标**：@icon-park/vue-next
- **部署**：Docker（多阶段构建） + Nginx

---

## 功能点

### 1) 动画
- **页面加载淡入**：[App.vue](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/App.vue:0:0-0:0) 使用 `<Transition name="fade">` 控制主内容加载后淡入
- **局部动画能力**：全局样式中提供基础动画 keyframes（见 [src/assets/styles/global.scss](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/assets/styles/global.scss:0:0-0:0)）

### 2) 主题色 / 深浅模式
- **主题色（主色）**：通过 CSS 变量 `--primary-color` 管理
- **深浅模式**：通过容器 class（`dark-mode` / `light-mode`）切换一组 CSS 变量
- **持久化**：主题相关设置使用 `localStorage` 保存
- **相关代码**
  - [src/store/theme.ts](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/store/theme.ts:0:0-0:0)
  - [src/components/ThemeSwitch/ThemeSwitch.vue](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/components/ThemeSwitch/ThemeSwitch.vue:0:0-0:0)
  - [src/assets/styles/global.scss](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/assets/styles/global.scss:0:0-0:0)

### 3) 国际化（简易 i18n）
- 当前采用“轻量文案对象”的方式：`zh/en` 两份文案对象，通过 Pinia 的 `locale` 状态切换
- **相关代码**
  - [src/store/locale.ts](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/store/locale.ts:0:0-0:0)
  - [src/i18n/zh.ts](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/i18n/zh.ts:0:0-0:0)、[src/i18n/en.ts](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/i18n/en.ts:0:0-0:0)、[src/i18n/index.ts](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/i18n/index.ts:0:0-0:0)
  - [App.vue](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/App.vue:0:0-0:0) 中 `computed` 选择 `zh/en` 文案


### 4) 响应式
- 通过组件内 `@media` 与布局拆分实现响应式适配
- **相关代码**
  - [src/App.vue](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/App.vue:0:0-0:0)
  - [src/components/ProfileCard/ProfileCard.vue](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/components/ProfileCard/ProfileCard.vue:0:0-0:0)

### 5) 心跳包测试 / 站点状态检测
- `SiteStatus` 组件会定时检测站点可达性，展示 `online/offline/checking`
- 检测方式：对站点发起 `HEAD` 请求 + `AbortController` 超时控制（5s）
- 定时策略：默认每 60 秒检测一次，也支持手动刷新
- **相关代码**
  - [src/components/SiteStatus/SiteStatus.vue](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/components/SiteStatus/SiteStatus.vue:0:0-0:0)
  - [src/api/siteCheck.ts](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/api/siteCheck.ts:0:0-0:0)
  - 站点列表来源：[src/config/nav.ts](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/src/config/nav.ts:0:0-0:0)
- **开发/生产差异**
  - [getSiteList()](cci:1://file:///c:/Users/what/Desktop/my-project/0MainPage/src/api/siteCheck.ts:30:0-39:2) 会根据 `import.meta.env.DEV` 选择 `localUrl/prodUrl`



### 6) 自动化部署（Docker + Nginx）
- 项目内提供 [Dockerfile](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/Dockerfile:0:0-0:0)（Node 构建 + Nginx 运行）与 [nginx.conf](cci:7://file:///c:/Users/what/Desktop/my-project/0MainPage/nginx.conf:0:0-0:0)（包含缓存与 Vue 路由回退）
- 适合部署到任意支持 Docker 的服务器或平台

---

