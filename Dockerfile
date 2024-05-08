FROM node:22.1.0 AS build

ENV SVELTEKIT_ADAPTER="node"
ENV NODE_ENV="development"
ENV PUBLIC_LOBBY_WS="wss://lobby.codeduel.it"
ENV PUBLIC_LOBBY_API="https://lobby.codeduel.it"
ENV PUBLIC_BACKEND_URL="https://api.codeduel.it"
ENV ORIGIN="https://codeduel.it"
ENV HOST="0.0.0.0"
ENV PORT="80"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:22.1.0

ENV NODE_ENV="production"
ENV PUBLIC_LOBBY_WS="wss://lobby.codeduel.it"
ENV PUBLIC_LOBBY_API="https://lobby.codeduel.it"
ENV PUBLIC_BACKEND_URL="https://api.codeduel.it"
ENV ORIGIN="https://codeduel.it"
ENV HOST="0.0.0.0"
ENV PORT="80"

WORKDIR /app
COPY --from=build /app/build /app
# COPY --from=build /app/package.json /app/package.json
# RUN echo "{ \"type\": \"module\" }" > /app/package.json

EXPOSE 80

CMD [ "node", "--experimental-default-type=module", "index.js" ]
