FROM node:10

WORKDIR /usr/

COPY package*.json ./

RUN npm install
RUN npm run tsc

EXPOSE 8080

COPY . .

CMD ["node", "dest/"]