# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:18

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package*.json ./
RUN npm install --production

EXPOSE 5000
CMD ["node", "dist/index.js"]
