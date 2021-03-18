# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build   

# production stage
FROM nginx:stable-alpine as production-stage
ARG API_URL $API_URL
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
RUN sed -i "s|http://localhost:8080/api/todo|$API_URL|g" /usr/share/nginx/html/js/*.js
CMD ["nginx", "-g", "daemon off;"]
