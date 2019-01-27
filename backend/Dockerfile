FROM node:latest
RUN mkdir -p /home/node/backend/node_modules && chown -R node:node /home/node/backend
WORKDIR /home/node/backend
COPY package*.json ./
RUN npm install
COPY . /home/node/backend
COPY --chown=node:node . .
USER node
EXPOSE 8080
CMD [ "node", "index.js" ]