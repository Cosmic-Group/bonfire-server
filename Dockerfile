FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["./wait-for-it.sh" , "database:${DB_PORT}" , "--strict" , "--timeout=300" , "--" , "npm", "run", "dev"]