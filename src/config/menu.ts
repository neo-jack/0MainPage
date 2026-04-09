export interface MenuItem {
  label: string;
  labelEn: string;
  href: string;
  requireOuterNet?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    label: "github链接",
    labelEn: "GitHub",
    href: "http://baidu.com/",
    requireOuterNet: true,
  },
  {
    label: "figma链接",
    labelEn: "Figma",
    href: "http://baidu.com/",
    requireOuterNet: true,
  },
];