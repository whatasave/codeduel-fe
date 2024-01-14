# CodeDuel

## Links
Figma: [figma.com](https://www.figma.com/file/C3yHcHN9rJPfnB5iGQCQo2/CodeDuel?type=design&node-id=0-1&mode=design&t=xtZCXLAInBYx8bSD-0)

## How to run

### Shared dependencies
Install: [Make](https://www.gnu.org/software/make/), [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/).

```bash
make docker-build
make docker-up
make docker-down
```

### Backend
Install: [GO Lang](https://golang.org/doc/install).

```bash
# Run from root directory
make be

# from backend directory
make build
make run
make test
```

### Frontend
Install: [NodeJS](https://nodejs.org/en/download/), [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable).


```bash
# Run from root directory
make fe-build
make fe

# from frontend directory
yarn install
yarn dev
```
