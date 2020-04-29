![Deploy](https://github.com/Wotzhs/HAPEN/workflows/Deploy/badge.svg?branch=master)

# H~~A~~RPEN

H~~A~~RPEN is a <b>H</b>eroku ~~<b>A</b>ngular~~ <b>R</b>eact <b>P</b>ostgres <b>E</b>xpress <b>N</b>odejs application.

## Getting Started

### Required environment variables

| Name         | Description                                        |
| ------------ | -------------------------------------------------- |
| DATABASE_URL | postgres database connection uri                   |
| JWT_SECRET   | secret for json web token signing and verification |


#### Example how to set environment variables
```shell
export DATABASE_URL=postgres://user:password@ip:port/dbname
export JWT_SECRET=dirty_secret
```

### Running the the application

#### Production environment in localhost

This assumes you have `docker` & `docker-compose` installed.

```shell
cd to project root
export JWT_SECRET=dirty_secret
docker-compose up -d
```

#### Development

##### API
```shell
cd api
npm i
npm run watch:dev
```

At this point, a postges should be running either locally on the host, or in a docker container

```shell
export DATABASE_URL=postgres://user:password@host:port/dbname
export JWT_SECRET=somesecret
npm run migrate:up
```

##### Client
```shell
cd client
npm i
npm run dev
```

##### CORS issue
As this point, the client application will be listening on port 4200 while the API application will be listening on port 3000 by default.

The client will not be able to connect to the API directly as the CORS is not enabled on the API. To overcome that, I have used [caddy](https://caddyserver.com/) to run a reverse proxy between the two application and the content of the caddy file is as below:

```bash
http://localhost:8000 {
	proxy / http://localhost:4200
	proxy /api http://localhost:3000
}
```

With that, the application can be accessed on `localhost:8000` instead and is able to connect to the API without CORS.

Such setup is prefered as in the production setup, both applications are deployed on the same host thus the exclsuion of CORS.

Alternative, `docker-compose` can be used to make sure both application runs on the same host too.