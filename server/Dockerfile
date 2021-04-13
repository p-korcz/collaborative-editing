FROM node:14.16.1-alpine3.10
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . ./

EXPOSE 8080
CMD ["yarn", "start"]