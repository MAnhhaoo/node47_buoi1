# cài môi trường nodejs để chạy source BE
FROM node:20

# tạo thư mục tên là app
WORKDIR /home/app
# coppy file packed.json and packed-lock.json into folder app
COPY package*.json ./

# cài thư viện trong file packed json 
RUN yarn install

# coppy Prisma từ local sang docker
# vừa coppy và tạo folder /prisma
COPY prisma ./prisma/


# tao prisma client

RUN yarn prisma generate

# coppy toàn bộ source code vào thư mục app
# . đầu tiên là copy tất cả những file và folder cùng cấp với dockerfile
#. thứ hai foler app mới tạo ở trên
COPY . .

# expoSE port 8080
EXPOSE 8083



# CHẠY LỆNH NPM START
CMD ["yarn","run","start"]

#biul docker image
# . : đường dân tới dockerfile
# -t : tên image 
# docker build . -t node47