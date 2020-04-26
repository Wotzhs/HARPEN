# HAPEN

HAPEN is a <b>H</b>eroku <b>A</b>ngular <b>P</b>ostgres <b>E</b>xpress <b>N</b>odejs application.

## Getting Started

### Required environment variables

| Name         | Description                                        |
| ------------ | -------------------------------------------------- |
| DATABASE_URL | postgres database connection uri                   |
| JWT_SECRET   | secret for json web token signing and verification |


#### Example how to set environment variables
```
export DATABASE_URL=postgres://user:password@ip:port/dbname
export JWT_SECRET=dirty_secret
```

### Running the the application

