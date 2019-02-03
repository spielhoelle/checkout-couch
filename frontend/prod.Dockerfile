### STAGE 1: Build ###
FROM node:10.5.0 as build
RUN mkdir /home/node/app
WORKDIR /home/node/app
ENV PATH /home/node/app/node_modules/.bin:$PATH
ARG REACT_APP_COUCHURL
ENV REACT_APP_COUCHURL $REACT_APP_COUCHURL
COPY package.json /home/node/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /home/node/app
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=build /home/node/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY app.conf /etc/nginx/conf.d/app.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
