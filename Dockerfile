# 构建阶段
FROM node:18-alpine AS build-stage

WORKDIR /app

# 复制 package 文件
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 安装 pnpm 并安装依赖
RUN npm install -g pnpm
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用（详细调试）
RUN echo "=== 开始构建调试 ===" && \
    echo "当前目录:" && pwd && \
    echo "文件列表:" && ls -la && \
    echo "检查 package.json:" && cat package.json && \
    echo "检查 node_modules:" && ls -la node_modules/ | head -10 && \
    echo "检查 pnpm 版本:" && pnpm --version && \
    echo "尝试运行 build:fast:" && \
    pnpm run build:fast || (echo "build:fast 失败，尝试直接 vite build:" && npx vite build)

# 生产阶段
FROM nginx:stable-alpine AS production-stage

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]