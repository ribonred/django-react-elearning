FROM node

WORKDIR /frontend
COPY package.json /frontend
COPY package-lock.json /frontend
COPY . /frontend
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

