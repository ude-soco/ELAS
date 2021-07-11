FROM node:14-slim

WORKDIR /app

ENV REACT_APP_BASE_URL='http://localhost:5000' \
    CHOKIDAR_USEPOLLING=true

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
