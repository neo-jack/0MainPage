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

# 构建应用（添加调试信息）
RUN echo "开始构建..." && \
    ls -la && \
    echo "检查 package.json..." && \
    cat package.json | grep -A 5 -B 5 "scripts" && \
    echo "开始执行构建..." && \
    pnpm run build

# 生产阶段
FROM nginx:stable-alpine AS production-stage

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]