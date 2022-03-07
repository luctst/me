# pull official base image
FROM node:15.1.0-alpine


# create destination directory
WORKDIR /nuxt-app

ENV PATH /nuxt-app/node_modules/.bin:$PATH
# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000
# update and install dependency

COPY ["package.json", "./"]
# copy the app, note .dockerignore
RUN apk update && apk upgrade
RUN apk add git
RUN npm install

COPY . ./

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

EXPOSE 3000
