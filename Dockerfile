FROM node:14.5.0-slim
LABEL description="Docker file for Logger application"
WORKDIR /logger
COPY package.json /logger
RUN npm install
COPY . /logger
CMD ["npm", "start"]