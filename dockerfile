FROM node:10 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build -- --output-path=./dist --configuration=production

FROM nginx:1.17.9

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY  nginx.conf /etc/nginx/conf.d/default.conf
