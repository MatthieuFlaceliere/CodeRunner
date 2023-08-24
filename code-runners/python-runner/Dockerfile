#  BUILD Nodejs
FROM node:18-alpine as BUILD_NODEJS
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

#  RUNTIME Nodejs
FROM alpine as RUNTIME_NODEJS
RUN apk add --no-cache nodejs
RUN apk add --no-cache python3
WORKDIR /usr/src/app
COPY --from=BUILD_NODEJS /usr/src/app/build ./build
COPY --from=BUILD_NODEJS usr/src/app/node_modules ./node_modules
COPY --from=BUILD_NODEJS usr/src/app/.env ./.env
CMD [ "node", "build/index.js" ]