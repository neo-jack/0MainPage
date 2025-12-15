// 环境判断
const isDev = import.meta.env.DEV;

// 导航项配置
export interface NavItem {
  id: number;
  name: string;
  icon: string;
  localUrl: string;
  prodUrl: string;
  color: string;
}

export const navItems: NavItem[] = [
  {
    id: 1,
    name: "H01Front",
    icon: "Application",
    localUrl: "http://localhost:3001",
    prodUrl: "https://h01.example.com",
    color: "#4a9eff",
  },
  {
    id: 2,
    name: "H02Front",
    icon: "Layout",
    localUrl: "http://localhost:3002",
    prodUrl: "https://h02.example.com",
    color: "#ff9500",
  },
  {
    id: 3,
    name: "H03Front",
    icon: "DataFile",
    localUrl: "http://localhost:3003",
    prodUrl: "https://h03.example.com",
    color: "#ff2d55",
  },
  {
    id: 4,
    name: "H04Front",
    icon: "Server",
    localUrl: "http://localhost:3004",
    prodUrl: "https://h04.example.com",
    color: "#5ac8fa",
  },
  {
    id: 5,
    name: "S01Back",
    icon: "Database",
    localUrl: "http://localhost:4001",
    prodUrl: "https://s01.example.com",
    color: "#af52de",
  },
];

// 获取导航链接
export const getNavUrl = (item: NavItem): string => {
  return isDev ? item.localUrl : item.prodUrl;
};