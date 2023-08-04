FROM node:20

RUN useradd --create-home --shell /bin/bash nodejs

USER nodejs

WORKDIR /home/nodejs

COPY ./build .
COPY package.json ./

RUN npm install

ENV PUBLIC_APPWRITE_ENDPOINT=""
ENV PUBLIC_APPWRITE_PROJECT=""
ENV ORIGIN="http://localhost:3000"

EXPOSE 3000

CMD ["node","index.js"]