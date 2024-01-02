FROM oven/bun:1 as base
COPY --from=node:18 /usr/local/bin/node /usr/local/bin/node

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

ENV DATABASE_URL postgresql://root:root@db:5432/app?schema=public
ENV BASE_URL http://localhost
ENV NODE_ENV development

RUN bun db:generate

EXPOSE 3000

CMD ["bun", "dev"]
