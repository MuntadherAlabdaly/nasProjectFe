FROM node:20.18.0-slim AS base

LABEL fly_launch_runtime="Next.js"

WORKDIR /app

ENV NODE_ENV="production"

FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./
RUN npm ci --include=dev

COPY . .

RUN npx next build --experimental-build-mode compile

RUN npm prune --omit=dev

FROM base

COPY --from=build /app /app

RUN chmod +x /app/docker-entrypoint.js

ENTRYPOINT [ "/app/docker-entrypoint.js" ]

EXPOSE 8000

CMD [ "npm", "run", "dev" ]