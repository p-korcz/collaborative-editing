FROM node:14.16.1-alpine3.10 as build-deps
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.15
COPY --from=build-deps /src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]