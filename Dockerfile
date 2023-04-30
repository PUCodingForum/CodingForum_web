FROM node:alpine

WORKDIR /app/CodingForum_web

COPY package.json ./
RUN npm install 

COPY . .
RUN npm run build
