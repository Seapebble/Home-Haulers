#!/bin/bash

npm install express mongoose dotenv cors helmet express-rate-limit cookie-parser nodemailer redis jsonwebtoken multer cloudinary stripe twilio ejs
npm install --save-dev typescript ts-node @types/express @types/node @types/cors @types/jsonwebtoken @types/mongoose
npx tsc --init
sudo apt update && sudo apt install redis -y
sudo service redis-server start
sudo service redis-server start
redis-cli ping
