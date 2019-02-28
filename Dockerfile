FROM node:10-alpine AS node

WORKDIR /home/node

COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM nginx:latest

WORKDIR /home
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /home/node/build/ /home/
