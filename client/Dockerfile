# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:18

WORKDIR /usr/src/app

COPY --from=build /app/dist ./

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "./", "-l", "3000"]
