FROM node:14.1.0

#WORKDIR /home/takumi/udemy/see_you_letter

#ENV PATH /home/takumi/udemy/see_you_letter/node_modules/.bin:$PATH

COPY . /app
WORKDIR  /app
RUN yarn install && yarn run build

# start app
CMD [ "yarn", "run", "start" ]