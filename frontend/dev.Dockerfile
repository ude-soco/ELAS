FROM node:16-slim

EXPOSE 3000

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
