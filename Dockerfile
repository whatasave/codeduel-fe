FROM node:18-alpine AS build

ENV SVELTEKIT_ADAPTER="node"
ENV NODE_ENV="production"

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY .yarn/ ./.yarn/
COPY .yarnrc.yml .
COPY package.json .
COPY yarn.lock .
RUN yarn install --immutable

COPY . .
RUN yarn run build

FROM node:18 AS production

WORKDIR /app

COPY --from=build /app/build ./build/
COPY --from=build /app/node_modules ./node_modules/
COPY --from=build /app/package.json ./package.json

EXPOSE 4173

CMD node build
