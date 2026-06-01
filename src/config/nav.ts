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
}
];

// 获取导航链接
export const getNavUrl = (item: NavItem): string => {
  return isDev ? item.localUrl : item.prodUrl;
};
