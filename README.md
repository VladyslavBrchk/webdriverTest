# WebDriverIO-Test

This repo provides auto tests for [Cypress Realworld App](https://github.com/cypress-io/cypress-realworld-app) <br />
The test cases you can find on my [Google Drive](https://docs.google.com/spreadsheets/d/1LbGWgjncDvmIywQ5jlYB3ywqr6Ybg_5G0K3YHQe0hoQ/edit?usp=sharing)

## Dependencies Installation
To use these tests you should download this repo and install some dependencies by Powershell

* To install dependencies
```
npm install
```
## Test Launch
There are some commands to launch test

* To launch tests on Google Chrome
```
npm run wdio
```
* To launch tests on Firefox Browser in headless mode
```
npm run test:firefox
```
* To launch tests on Edge Browser
```
npm run test:edge
```
* To run tests on Chrome Browser and create JSON report
```
npm run report-json
```
* To create HTML Allure Report run
```
npm run report-html
```
* To run tests and create html-report in Headless Mode (the result will be in the cypress/report/ directory)
```
npm run test-n-report
```
## Viewing Previous Runs
* Workflow is set up so that the tests run every time someone pushes the repo
* The result of tests deploys on my [Github Pages](https://vladyslavbrchk.github.io/webdriverTest/)