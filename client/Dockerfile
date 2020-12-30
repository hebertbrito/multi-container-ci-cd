FROM node:latest AS buildnode

WORKDIR '/app'

COPY package.json .

RUN npm install -g
RUN npm install react-scripts -g
RUN npm install typescript -g
COPY ./ ./
#VOLUME node_modules .:/app
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=buildnode /app/build /usr/share/nginx/html