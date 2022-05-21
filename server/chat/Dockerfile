FROM node:16.13

WORKDIR /usr/local/user

ENV PORT=3001

COPY package.json package-lock.json /usr/local/user/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]