# 构建阶段
FROM node:18-alpine AS build-stage

WORKDIR /app

# 复制所有文件
COPY . .

# 使用 npm 安装依赖并构建
RUN npm install && npm run build:fast

# 生产阶段
FROM nginx:stable-alpine AS production-stage

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]