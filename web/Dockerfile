FROM node:alpine
ENV PUBLIC_URL=/public

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./src /app/src

CMD ["npm", "run", "start"]
