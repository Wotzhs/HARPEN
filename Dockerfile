# =====================
# transpile frontend
# =====================
FROM alpine:latest AS client_builder
RUN apk add npm
RUN mkdir client

COPY client/package.json client
COPY client/package-lock.json client
WORKDIR client
RUN npm i

COPY client .
RUN npm run build

# ======================
# transpile backend
# ======================
FROM alpine:latest AS api_builder
RUN apk add npm
RUN mkdir app

COPY api/package.json app
COPY api/package-lock.json app
WORKDIR app
RUN npm i

COPY api .
RUN npm run transpile

# =====================
# run server
# =====================
FROM alpine:latest
RUN apk add nodejs
RUN mkdir -p app/public
RUN mkdir -p app/node_modules

COPY --from=client_builder /client/dist/client app/public
COPY --from=api_builder app/dist app
COPY --from=api_builder app/node_modules app/node_modules
WORKDIR app

CMD ["node", "bin/www.js"]