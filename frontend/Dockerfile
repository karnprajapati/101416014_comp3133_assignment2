# Stage 1: Build Angular app
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build -- --configuration production

# Stage 2: Serve app with nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/101416014_comp3133_assignment2/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
