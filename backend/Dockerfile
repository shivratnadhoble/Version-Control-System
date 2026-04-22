FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV MONGODB_URI=mongodb+srv://shivratnadhoble9_db_user:RjthDOElU6dArt06@mern-app-db.3tbysvt.mongodb.net/?appName=mern-app-db
ENV JWT_SECRET_KEY=b6f5fcabd823f32b6b04f8741a572e417763038b2f9023289c1818a3de84f5ee505e506046c4df1156579c75df203ed5370f23b747e2fe63fafb03e4303f64e0
ENV ALLOWED_ORIGINS=

CMD ["npm", "start"]
