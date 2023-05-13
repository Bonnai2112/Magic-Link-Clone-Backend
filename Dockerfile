FROM node:16

# install dependencies 
COPY package.json .
RUN yarn 
COPY . .

# build 
RUN yarn tsc 

# launch server
EXPOSE 5000
CMD yarn start