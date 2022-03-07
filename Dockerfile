FROM node:16-alpine as base

WORKDIR /app

ENV CI=true

COPY package.json yarn.lock huskyPrepare.js ./

RUN yarn install --prod

FROM base as build

RUN yarn install

COPY . .

RUN yarn build

FROM base as prod

COPY --from=build /app/build/ ./build/

CMD [ "yarn", "start"]
