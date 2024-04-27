FROM node:18 AS build

ENV SVELTEKIT_ADAPTER="auto"
ENV NODE_ENV="production"
ENV PUBLIC_LOBBY_WS="wss://lobby.codeduel.it"
ENV PUBLIC_LOBBY_API="https://lobby.codeduel.it"
ENV PUBLIC_BACKEND_URL="https://api.codeduel.it"
EXPOSE 80

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY .yarn/ ./.yarn/
COPY .yarnrc.yml .
COPY package.json .
COPY yarn.lock .
RUN yarn install --immutable

COPY . .
RUN yarn run build

CMD yarn run preview --port 80 --host

# FROM node:18 AS production

# WORKDIR /app

# COPY --from=build /app/build ./build/
# COPY --from=build /app/node_modules ./node_modules/
# COPY --from=build /app/package.json ./package.json

# EXPOSE 4173

# CMD node build
