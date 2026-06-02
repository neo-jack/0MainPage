//TODO:网站配置

// 环境判断
const isDev = import.meta.env.DEV;

// 导航分类
export type NavCategory =  "AI工具箱" | "源码" | "工具" | "其他";

export const NAV_CATEGORIES: NavCategory[] = ["AI工具箱", "源码", "工具", "其他"];

// 导航图标配置
export interface NavIcon {
  // icon-park 图标名称或自定义图片路径（以 / 开头）
  icon: string;
  url: string;
  title: string;
  requireOuterNet?: boolean;
}

// 导航项配置
export interface NavItem {
  id: number;
  name: string;
  nameEn: string;
  icons: NavIcon[];
  localUrl: string;
  prodUrl: string;
  color: string;
  description: string;
  descriptionEn: string;
  techStack: string[];
  techStackEn: string[];
  highlights: string[];
  highlightsEn: string[];
  category: NavCategory;
}

export const navItems: NavItem[] = [
  {
    id: 1,
    name: "手写react18核心",
    nameEn: "React18 Core",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack/102my-react",
        title: "GitHub",
        requireOuterNet: true,
      },
      {
        icon: "/icon/figma.svg",
        url: "https://www.figma.com/design/66yZgdnDIB3orW1hM58aku/102%E6%BA%90%E7%A0%81?node-id=0-1&p=f",
        title: "Figma",
        requireOuterNet: true,
      },
    ],
    localUrl:
      "https://codesandbox.io/p/github/neo-jack/102my-react/draft/magical-knuth",
    prodUrl:
      "https://codesandbox.io/p/github/neo-jack/102my-react/draft/magical-knuth",
    color: "#4a9eff",
    description:
      "从零实现React18核心源码，包含Fiber架构、Hooks、Reconciler、并发模式等",
    descriptionEn:
      "Build React18 core from scratch, including Fiber, Hooks, Reconciler, Concurrent Mode",
    techStack: ["React", "TypeScript", "Rollup"],
    techStackEn: ["React", "TypeScript", "Rollup"],
    highlights: ["Fiber架构", "Hooks实现", "Reconciler", "并发模式"],
    highlightsEn: [
      "Fiber Architecture",
      "Hooks",
      "Reconciler",
      "Concurrent Mode",
    ],
    category: "源码",
  },
  {
    id: 8,
    name: "⭐AI工作流(集成)",
    nameEn: "AI Workflow Integration",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack",
        title: "GitHub",
        requireOuterNet: true,
      },
    ],
    localUrl: "http://localhost:8317",
    prodUrl: "https://github.com/neo-jack",
    color: "#22c55e",
    description: "集成 OpenAI 兼容接口、代理转发与多模型调用的 AI 工作流入口",
    descriptionEn: "AI workflow entry integrating OpenAI-compatible APIs, proxy routing, and multi-model calls",
    techStack: ["OpenAI API", "Gateway", "Workflow"],
    techStackEn: ["OpenAI API", "Gateway", "Workflow"],
    highlights: ["AI 工作流", "接口集成", "多模型调用"],
    highlightsEn: ["AI Workflow", "API Integration", "Multi-model Calls"],
    category: "AI工具箱",
  },
  {
    id: 5,
    name: "AI 中转站",
    nameEn: "AI Gateway",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack",
        title: "GitHub",
        requireOuterNet: true,
      },
    ],
    localUrl: "http://localhost:4001",
    prodUrl: "https://s01.example.com",
    color: "#af52de",
    description: "统一管理 AI 接口转发、鉴权与服务调用的后端服务",
    descriptionEn: "Backend service for unified AI API routing, authentication, and service access",
    techStack: ["Node.js", "Express"],
    techStackEn: ["Node.js", "Express"],
    highlights: ["AI 接口中转", "统一鉴权", "RESTful API"],
    highlightsEn: ["AI API Gateway", "Unified Authentication", "RESTful API"],
    category: "AI工具箱",
  },
  {
    id: 6,
    name: "API 一键获取",
    nameEn: "Swagger API Collector",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack",
        title: "GitHub",
        requireOuterNet: true,
      },
    ],
    localUrl: "http://localhost:4001",
    prodUrl: "https://s01.example.com",
    color: "#af52de",
    description: "从 Java Swagger 文档中一键提取接口信息，快速生成可复用的 API 数据",
    descriptionEn: "Extract API information from Java Swagger docs in one click and generate reusable API data",
    techStack: ["Java", "Swagger", "API"],
    techStackEn: ["Java", "Swagger", "API"],
    highlights: ["Swagger 解析", "一键获取接口", "API 数据整理"],
    highlightsEn: ["Swagger Parsing", "One-click API Collection", "API Data Organization"],
    category: "工具",
  },
  {
    id: 9,
    name: "MCP UI->静态页面 增强工具",
    nameEn: "MCP UI",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack",
        title: "GitHub",
        requireOuterNet: true,
      },
    ],
    localUrl: "http://localhost:3000",
    prodUrl: "https://github.com/neo-jack",
    color: "#06b6d4",
    description: "面向 MCP 工具和服务的可视化操作入口",
    descriptionEn: "Visual operation entry for MCP tools and services",
    techStack: ["MCP", "UI", "Tooling"],
    techStackEn: ["MCP", "UI", "Tooling"],
    highlights: ["MCP 工具", "可视化入口", "服务管理"],
    highlightsEn: ["MCP Tools", "Visual Entry", "Service Management"],
    category: "工具",
  },
  {
    id: 10,
    name: "手写vue核心",
    nameEn: "Vue Core",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack",
        title: "GitHub",
        requireOuterNet: true,
      },
    ],
    localUrl: "http://localhost:5173",
    prodUrl: "https://github.com/neo-jack",
    color: "#8b949e",
    description: "从零实现 Vue 核心源码，包含响应式、依赖收集、渲染更新与组件机制",
    descriptionEn: "Build Vue core from scratch, including reactivity, dependency tracking, rendering updates, and component mechanisms",
    techStack: ["Vue", "TypeScript", "Vite"],
    techStackEn: ["Vue", "TypeScript", "Vite"],
    highlights: ["响应式原理", "依赖收集", "渲染更新", "组件机制"],
    highlightsEn: ["Reactivity", "Dependency Tracking", "Rendering Updates", "Components"],
    category: "源码",
  },
  {
    id: 7,
    name: "资料-前端手撕",
    nameEn: "Frontend Notes",
    icons: [
      {
        icon: "/icon/csdn.svg",
        url: "https://blog.csdn.net/2604_94869367/article/details/159763228",
        title: "CSDN",
        requireOuterNet: true,
      },
    ],
    localUrl: "https://blog.csdn.net/2604_94869367/article/details/159763228",
    prodUrl: "https://blog.csdn.net/2604_94869367/article/details/159763228",
    color: "#ff6a00",
    description: "前端手撕资料整理",
    descriptionEn: "Frontend problem-solving notes",
    techStack: ["JavaScript", "TypeScript", "Frontend"],
    techStackEn: ["JavaScript", "TypeScript", "Frontend"],
    highlights: ["资料整理", "前端手撕", "CSDN文章"],
    highlightsEn: ["Study Notes", "Frontend Practice", "CSDN Article"],
    category: "其他",
  },
];

// 获取导航链接
export const getNavUrl = (item: NavItem): string => {
  return isDev ? item.localUrl : item.prodUrl;
};
