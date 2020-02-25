FROM node:10 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build -- --output-path=./dist --configuration=production

FROM nginx:latest

COPY --from=build-stage app/dist/ /usr/share/nginx/html

COPY --from=build-stage app/nginx.conf /etc/nginx/conf.d/default.conf
