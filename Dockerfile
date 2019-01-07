FROM node:8-alpine as builder

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

RUN npm i yarn -g && npm i rimraf -g

ARG API_BASE=http://118.70.185.117:3009
ARG AUTH_BASE=http://118.70.185.117:3009
ARG APP_ENV_ARG=production
ARG DATA_TYPE=real
ARG APP_ENV_FILE=/usr/src/app/src/admin/.env.${APP_ENV_ARG}
ARG APP_ENV_CONTENT="REACT_APP_API_BASE=$API_BASE\nREACT_APP_AUTH_BASE=$AUTH_BASE\nREACT_APP_CLIENT=$DATA_TYPE\nREACT_APP_DATA_PROVIDER=rest\nNODE_ENV=$APP_ENV_ARG";


COPY lerna.json /usr/src/app
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
COPY .babelrc /usr/src/app
COPY packages /usr/src/app/packages
COPY src /usr/src/app/src
COPY _etc /usr/src/app/_etc
RUN yarn install --pure-lockfile
RUN rm -f ${APP_ENV_FILE} && touch ${APP_ENV_FILE} && echo -e $APP_ENV_CONTENT >> ${APP_ENV_FILE} && yarn build && yarn run build-admin

FROM nginx:1.15.5-alpine
WORKDIR /app/public
COPY --from=builder /usr/src/app/src/admin/build/ /app/public/
COPY --from=builder /usr/src/app/_etc/nginx.conf /etc/nginx/conf.d/default.conf