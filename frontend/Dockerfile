FROM node:20

WORKDIR /app

COPY . .

RUN npm install

# ARG NEXTAUTH_URL
# ARG NEXTAUTH_SECRET
# ARG NEXT_PUBLIC_BACKEND_API

# RUN echo "NEXTAUTH_URL=${NEXTAUTH_URL}" > .env \
#     && echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env \
#     && echo "NEXT_PUBLIC_BACKEND_API=${NEXT_PUBLIC_BACKEND_API}" >> .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
