FROM node:20.10 AS build

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN npm install -g yarn

COPY package.json ./
COPY yarn.lock ./

RUN yarn --frozen-lockfile
COPY . ./
RUN yarn build

FROM nginx:1.19-alpine
COPY --from=build /usr/src/app/public /usr/share/nginx/html
