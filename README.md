## Description

The service is aimed to return all user's GitHub repositories by the username that are not forks.

### Example

**Request:** GET _/users/:username/repos_

**Response schema:**
```json
[
  {
    "name": "string",
    "owner": "string",
    "branches": [
      {
        "name": "string",
        "lastCommitSha": "string"
      }
    ]
  }
]
```

The OpenAPI specification is described in [openapi.yaml](./openapi.yaml) and is available by the following route: **_/api_**.

## Notes

To avoid GitHub rate limits you can provide access token, passing the `GITHUB_AUTH_TOKEN` variable into the `.env` file

## Installation

```bash
$ npm install
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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dockerize an application

```bash
docker build -t github-repos .
docker run -p 3000:3000 github-repos
```
