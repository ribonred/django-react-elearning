FROM node

WORKDIR /frontend
COPY package.json /frontend
COPY package-lock.json /frontend
COPY . /frontend
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000
CMD ["npm", "start"]

