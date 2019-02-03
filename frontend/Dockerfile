FROM node:10.5.0
RUN mkdir /home/node/app
WORKDIR /home/node/app
ENV PATH /home/node/app/node_modules/.bin:$PATH
ARG REACT_APP_COUCHURL
ENV REACT_APP_COUCHURL $REACT_APP_COUCHURL
COPY package.json .
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
CMD ["npm", "start"]