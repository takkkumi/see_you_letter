FROM node:14.1.0

WORKDIR /home/takumi/udemy/see_you_letter

ENV PATH /home/takumi/udemy/see_you_letter/node_modules/.bin:$PATH

COPY . .
RUN npm install && npm run build

# start app
CMD [ "npm", "run", "start" ]