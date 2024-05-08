FROM node:22.1.0 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SVELTEKIT_ADAPTER="auto"
ENV NODE_ENV="development"
ENV PUBLIC_LOBBY_WS="wss://lobby.codeduel.it"
ENV PUBLIC_LOBBY_API="https://lobby.codeduel.it"
ENV PUBLIC_BACKEND_URL="https://api.codeduel.it"
EXPOSE 80

RUN corepack enable 

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# ENV NODE_ENV="production"
# RUN pnpm run build

# FROM base
# COPY --from=prod-deps /app/node_modules /app/node_modules
# COPY --from=build /app/build /app/build

CMD [ "pnpm", "preview", "--port", "80", "--host"]
