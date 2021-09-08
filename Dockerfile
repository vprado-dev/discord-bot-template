FROM node:16.6

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD [ "yarn", "start" ]