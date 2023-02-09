# E2E tests

## Running all tests

`npx playwright test`

## Running a single test file

`npx playwright test landing-page.spec.ts`

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

