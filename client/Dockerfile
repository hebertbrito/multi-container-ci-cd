FROM node:latest AS buildnode

WORKDIR '/app'

COPY ./package.json ./package-lock.json ./

RUN npm install -g
RUN npm install react-scripts -g
COPY ./package.json ./package-lock.json ./

RUN npm run build

COPY package.json .
RUN npm install -g

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=buildnode /app/build /usr/share/nginx/html