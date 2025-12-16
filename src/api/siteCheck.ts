import { navItems } from "../config/nav";

export interface SiteCheckResult {
  id: number;
  name: string;
  url: string;
  status: "online" | "offline" | "checking";
}

// 检测单个站点
export const checkSite = async (url: string): Promise<boolean> => {
  try {
    // 使用 no-cors 模式避免跨域问题
    // 注意：no-cors 模式下无法获取响应内容，只能判断请求是否成功发出
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch {
    return false;
  }
};

// 获取需要检测的站点列表
export const getSiteList = (): SiteCheckResult[] => {
  const isDev = import.meta.env.DEV;
  return navItems.map((item) => ({
    id: item.id,
    name: item.name,
    url: isDev ? item.localUrl : item.prodUrl,
    status: "checking" as const,
  }));
};
