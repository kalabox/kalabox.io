FROM mhart/alpine-node

WORKDIR /app

ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
RUN mv /app/node_modules /node_modules
RUN mkdir /nimble

ADD . /app

ENV NODE_ENV=production
EXPOSE 80

CMD ["node", "server.js"]

VOLUME /nimble