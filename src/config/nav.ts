//TODO:网站配置

// 环境判断
const isDev = import.meta.env.DEV;

// 导航分类
export type NavCategory = "网站" | "工具" | "源码" | "其他";

export const NAV_CATEGORIES: NavCategory[] = ["网站", "源码", "工具", "其他"];

// 导航项配置
export interface NavItem {
  id: number;
  name: string;
  icon: string;
  localUrl: string;
  prodUrl: string;
  color: string;
  description: string;
  descriptionEn: string;
  techStack: string[];
  highlights: string[];
  category: NavCategory;
}

export const navItems: NavItem[] = [
  {
    id: 1,
    name: "手写react18核心",
    icon: "Application",
    localUrl: "http://localhost:3001",
    prodUrl: "http://113.45.4.229:3001",
    color: "#4a9eff",
    description: "以贷款管理系统",
    descriptionEn: "Frontend Project 1",
    techStack: ["PC", "React", "TypeScript", "Nest"],
    highlights: ["响应式"],
    category: "源码",
  },
  {
    id: 2,
    name: "",
    icon: "Layout",
    localUrl: "http://localhost:3002",
    prodUrl: "https://h02.example.com",
    color: "#ff9500",
    description: "前端项目二",
    descriptionEn: "Frontend Project 2",
    techStack: ["React", "TypeScript"],
    highlights: ["高性能"],
    category: "网站",
  },
  {
    id: 3,
    name: "H03Front",
    icon: "DataFile",
    localUrl: "http://localhost:3003",
    prodUrl: "https://h03.example.com",
    color: "#ff2d55",
    description: "前端项目三",
    descriptionEn: "Frontend Project 3",
    techStack: ["Vue", "Vite"],
    highlights: ["数据可视化"],
    category: "网站",
  },
  {
    id: 4,
    name: "H04Front",
    icon: "Server",
    localUrl: "http://localhost:3004",
    prodUrl: "https://h04.example.com",
    color: "#5ac8fa",
    description: "前端项目四",
    descriptionEn: "Frontend Project 4",
    techStack: ["Next.js", "TailwindCSS"],
    highlights: ["SSR"],
    category: "网站",
  },
  {
    id: 5,
    name: "S01Back",
    icon: "Database",
    localUrl: "http://localhost:4001",
    prodUrl: "https://s01.example.com",
    color: "#af52de",
    description: "后端服务",
    descriptionEn: "Backend Service",
    techStack: ["Node.js", "Express"],
    highlights: ["RESTful API"],
    category: "工具",
  },
];

// 获取导航链接
export const getNavUrl = (item: NavItem): string => {
  return isDev ? item.localUrl : item.prodUrl;
};
