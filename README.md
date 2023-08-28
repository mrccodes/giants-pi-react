


#  MLB Dashboard

An intuitive MLB dashboard that leverages the MLB Stats API, offering a real-time statistical deep-dive for any selected team, support for 3D-rendered logos, upcoming game countdown and live game updates.


## 🌈 Tech Stack

- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org) and [Prettier](https://prettier.io) already configured with the [🤏 Codely's configuration](https://github.com/CodelyTV/eslint-config-codely)
- [Jest](https://jestjs.io) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for the unit tests
- [Cypress](https://www.cypress.io) with [Testing Library](https://testing-library.com/docs/cypress-testing-library) for the end-to-end tests
- [GitHub Action Workflows](https://github.com/features/actions) set up to run tests and linting on push
- [Makefile](https://github.com/CodelyTV/vite-react_best_practices-template/blob/main/Makefile) for standardize how to run projects
- [Sass](https://sass-lang.com) to supercharge CSS with nested classes and more fun
- [.editorconfig](https://editorconfig.org) for sharing the IDE config
- [Tailwindcss](https://tailwindcss.com/) for quick and easy styling
- [Electron.js](https://www.electronjs.org/) to render the React app fullscreen in kiosk mode
- [Socket.IO](https://socket.io/) to enable real-time polling and rendering of performance stats for Raspberry Pi
- [Express](https://expressjs.com/) to create a server infrastructure that handles the WebSocket connections
- [Threejs](https://threejs.org/) with for 3D rendering of team logos

## ✅ Testing

### Unit tests

`npm run test`: Run unit tests with Jest and React Testing Library

### End-to-end tests

1. `npm start`: Start the development server on [localhost:3000](http://localhost:3000)
2. Run end-to-end tests with Cypress choosing one of the following options:
  - `npm run cy:open`: Open Cypress in dev mode
  - `npm run cy:run`: Execute Cypress in CLI

## 🔦 Linting

- `npm run lint`: Run linter
- `npm run lint:fix`: Fix lint issues





## 🔀 Related information

This application uses the MLB Stats API to retrieve data owned by the MLB. All of the data rendered by this app is property of MLB/MLB Advanced Media. Please refer to their terms before using this application. 

> By using this application you
The accounts, descriptions, data and presentation in the referring page (the "Materials") are proprietary content of MLB Advanced Media, L.P ("MLBAM").  
Only individual, non-commercial, non-bulk use of the Materials is permitted and any other use of the Materials is prohibited without prior written authorization from MLBAM.  
Authorized users of the Materials are prohibited from using the Materials in any commercial manner other than as expressly authorized by MLBAM.

This application was generated using the [<⚡⚛️> Vite React Best Practices Template](https://github.com/CodelyTV/vite-react_best_practices-template). Feel free to check it out and star the repo! 🌟😊🙌
