FROM node:14-slim
WORKDIR /app

COPY ./package*.json ./
RUN  npm ci --production 2>&1

COPY ./nodejs ./

FROM nginxinc/nginx-unprivileged:1.19
USER root
WORKDIR /usr/share/nginx/html
RUN chown -R nginx:nginx .

USER 101
COPY --from=build --chown=101 /app/build/ ./
COPY ./nginx/conf.d/* /etc/nginx/conf.d/
COPY ./nginx/docker-entrypoint.d/* /docker-entrypoint.d/
EXPOSE 8080