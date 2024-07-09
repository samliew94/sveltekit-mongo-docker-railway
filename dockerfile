# BUILD
FROM node:20-alpine AS builder

# mandatory ARGs that must be passed when running `docker build` command.
arg MONGO_URI_ARG
arg ORIGIN_ARG

run if [ -z $MONGO_URI_ARG]; then echo "MONGO_URI_ARG must be set!"; exit 1; fi
run if [ -z $ORIGIN_ARG]; then echo "ORIGIN_ARG must be set!"; exit 1; fi

ENV MONGO_URI=$MONGO_URI_ARG
ENV ORIGIN=$ORIGIN_ARG

WORKDIR /app
COPY package*.json .
COPY pnpm-lock.yaml .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

# RUN
from node:20-alpine as deployer
workdir /app
copy --from=builder /app/build build/
copy --from=builder /app/package.json .
expose 3000
CMD [ "node", "build" ]

