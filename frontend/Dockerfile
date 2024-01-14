FROM node:18 AS build

ENV NODE_ENV=production

WORKDIR /usr/src/app
# RUN corepack enable && corepack prepare yarn@stable --activate
# RUN npm install -g yarn
# RUN npm install -g pnpm
# install vite
RUN npm install -g vite

# COPY package.json yarn.lock ./
COPY package.json ./

# RUN yarn install --immutable
RUN npm i
COPY . ./
# RUN yarn build
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /usr/src/app/public /usr/share/nginx/html
