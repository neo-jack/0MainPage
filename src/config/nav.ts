//TODO:网站配置

// 环境判断
const isDev = import.meta.env.DEV;

// 导航分类
export type NavCategory = "网站" | "工具" | "源码" | "其他";

export const NAV_CATEGORIES: NavCategory[] = ["网站", "源码", "工具", "其他"];

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
    localUrl: "http://localhost:3001",
    prodUrl: "http://113.45.4.229:3001",
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
    id: 2,
    name: "three3D网站",
    nameEn: "Three3D Website",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack",
        title: "GitHub",
        requireOuterNet: true,
      },
    ],
    localUrl: "http://localhost:3002",

    prodUrl: "https://h02.example.com",
    color: "#ff9500",
    description: "前端项目二",
    descriptionEn: "Frontend Project 2",
    techStack: ["React", "TypeScript"],
    techStackEn: ["React", "TypeScript-en"],
    highlights: ["高性能"],
    highlightsEn: ["High Performance"],
    category: "网站",
  },
  {
    id: 4,
    name: "其他-占位",
    nameEn: "Others",
    icons: [
      {
        icon: "/icon/github.svg",
        url: "https://github.com/neo-jack",
        title: "GitHub",
        requireOuterNet: true,
      },
    ],
    localUrl: "http://localhost:3004",
    prodUrl: "https://h04.example.com",
    color: "#5ac8fa",
    description: "前端项目四",
    descriptionEn: "Frontend Project 4",
    techStack: ["Next.js", "TailwindCSS"],
    techStackEn: ["Next.js", "TailwindCSS"],
    highlights: ["SSR"],
    highlightsEn: ["SSR"],
    category: "其他",
  },
  {
    id: 5,
    name: "工具-占位",
    nameEn: "Tools",
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
    description: "后端服务",
    descriptionEn: "Backend Service",
    techStack: ["Node.js", "Express"],
    techStackEn: ["Node.js", "Express"],
    highlights: ["RESTful API"],
    highlightsEn: ["RESTful API"],
    category: "工具",
  },
];

// 获取导航链接
export const getNavUrl = (item: NavItem): string => {
  return isDev ? item.localUrl : item.prodUrl;
};
