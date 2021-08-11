# Interview Scheduler

## Description
Interview Scheduler is a Single Page Application (SPA) built using React. It allows users to book and cancel interviews. Data is persisted by API server using a PostgreSQL database.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Features
- Display appointment days from Monday to Friday. Users can switch between weekdays. 
- The list of days informs the user how many slots are available for each day.
!["Appointment days"](images/IS1.png)

- User can edit details of an existing interview.
!["Appointment days"](images/IS2.png)

- User can cancel an existing interview.
- User is presented with a confirmation when they attempt to cancel an interview.
!["Appointment days"](images/IS3.png)

- User can book an interview in an empty appointment slot.
!["Appointment days"](images/IS4.png)

- User is shown an error if an interview cannot be saved or deleted.
!["Appointment days"](images/IS5.png)


## Tech Stack
- React
- Axios
- HTML
- SASS
- Javascript
- Express
- Node.js
- PostgreSQL
- Storybook
- Webpack Dev Server
- Jest
- Testing library
- Cypress
