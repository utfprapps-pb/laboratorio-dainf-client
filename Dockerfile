# build environment
FROM node:21 as build
RUN npm install -g @angular/cli
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --force
COPY . /app
RUN ng build --output-path=dist --configuration production

# production environment
FROM nginx:1.21.6-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
