# E2E tests

## Running all tests

`npx playwright test`

## Running a single test file

`npx playwright test login.spec.ts`

## Run a set of test files

`npx playwright test tests/todo-page/ tests/landing-page/`

## Run files that have landing or login in the file name

`npx playwright test landing login`

## Run the test with the title

`npx playwright test -g "add a todo item"`

## Running tests in headed mode

`npx playwright test landing-page.spec.ts --headed`

## Running tests on a specific project

`npx playwright test landing-page.ts --project=chromium`

## To open allure report run following command:

`npm run allure-report`

## DOCKER build image

docker build -t automated_tests -f dockerfile .

## DOCKER run container

docker run -it automated_tests:latest npm run test 

docker exec -it automated_tests /bin/bash

## List of docker images
docker images

## List of running containers (instances)
docker ps

## List of all containers (instances)
docker ps -a

## Docker Compose

docker-compose up --scale regression-tests-app=3