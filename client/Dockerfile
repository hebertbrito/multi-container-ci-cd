FROM node:alpine

WORKDIR '/app'

COPY package.json .

RUN npm install -g
RUN npm install react-scripts -g
COPY ./ ./
#VOLUME node_modules .:/app
RUN npm --prefix ./ run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html