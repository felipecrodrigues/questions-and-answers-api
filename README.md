# Questions and Answers API

Backend API for QuestionsAndAnswers.com

## Requirements

You must have the following software previously installed:
- [Docker](https://www.docker.com)
- [Node.js](https://nodejs.org/)

## Development environment

Please make sure that no other software is using ports 5432 (postgres) and 3000 (node api).
Then, from solution root, run the following scripts:

```bash
$ npm install
$ npm run start:env
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Usage

For testing purposes, there is a [SwaggerUI](http://localhost:3000/api/) where tests can be made directly through the browser.

## License
[MIT](https://choosealicense.com/licenses/mit/)
