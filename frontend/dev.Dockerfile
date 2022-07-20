FROM node:14-slim

EXPOSE 3000

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
