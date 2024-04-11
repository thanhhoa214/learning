# Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Running project for development](#running-project-for-development)
  - [For **Browser**.](#for-browser)
  - [For **iOS** & **Android**.](#for-ios--android)
    - [First, we'll build web source package](#first-well-build-web-source-package)
    - [Then open what kind of native project you want through:](#then-open-what-kind-of-native-project-you-want-through)
  - [Implement new features](#implement-new-features)
- [Build project for production](#build-project-for-production)
- [License](#license)

# Technologies
This project uses a number of technologies and libraries:
- Angular: [Angular](https://angular.io) - A platform for building web applications.
- Ionic: [Ionic](https://ionicframework.com) - A framework for building cross-platform mobile applications.
- Capacitor: [Capacitor](https://capacitorjs.com) - A cross-platform native runtime for web apps.
- Apollo Client: [Apollo Client](https://www.apollographql.com/docs/react/) - A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- NGXS: [NGXS](https://www.ngxs.io) - A state management pattern + library for Angular.
- NGX Translate: [NGX Translate](https://github.com/ngx-translate/core) - An internationalization library for Angular.
- Bootstrap: [Bootstrap](https://getbootstrap.com) - A popular CSS Framework for developing responsive and mobile-first websites.
- GraphQL: [GraphQL](https://graphql.org) - A query language for APIs and a runtime for executing those queries with your existing data.
- ESLint: [ESLint](https://eslint.org) - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- Husky: [Husky](https://typicode.github.io/husky/#/) - A tool to enforce code quality using pre-commit and pre-push hooks.
- Jasmine: [Jasmine](https://jasmine.github.io) - A behavior-driven development framework for testing JavaScript code.
- Karma: [Karma](https://karma-runner.github.io) - A test runner for JavaScript.
- TypeScript: [TypeScript](https://www.typescriptlang.org) - A typed superset of JavaScript that compiles to plain JavaScript.
- Cordova: [Cordova](https://cordova.apache.org) - A mobile development framework that allows for the use of standard web technologies - HTML5, CSS3, and JavaScript for cross-platform development.
- RxJS: [RxJS](https://rxjs.dev) - A library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.
- Immer: [Immer](https://immerjs.github.io/immer) - A package to work with immutable state in JavaScript.
- capacitor-plugin-downloader: [capacitor-plugin-downloader](https://github.com/thanhhoa214/capacitor-plugin-downloader) - Self-made Capacitor plugin for heavy-weight file downloading.
- zalo-auth-capacitor-plugin: [zalo-auth-capacitor-plugin](https://github.com/thanhhoa214/zalo-auth-capacitor-plugin) - Self-made Capacitor plugin for Zalo login integration.


# Prerequisite

To run this code in your device you have to make sure, `NodeJS` are installed globally on your machine. After that you can install all necessary dependencies for running project.

0. Check if `npm` is installed. Otherwise please install [`NodeJS`](https://nodejs.org/en/download/package-manager/).

```bash
npm -v
```
1. Install **angular** command line interface globally.

```bash
npm install -g @angular/cli
```

2. Install [**Android Studio**](https://developer.android.com/studio) for running and building your **android** application.

2. Install [**Xcode**](https://developer.android.com/studio) and [**Cocoapods**](https://cocoapods.org/) for running and building your **ios** application.

# Installation
Install all dependencies

```bash
npm install
```

# Running project for development

## For **Browser**.

```bash
npm start
```

## For **iOS** & **Android**.

  ### First, we'll build web source package
  ```bash
  npm run build
  ```

  ### Then open what kind of native project you want through:

- **Android**
  Then, sync to native Android project by running:
  ```bash
  npm run sync -- android
  ```
  Then, sync to native Android project by running:
  ```bash
  npm run open:android
  ```
- **iOS**
  Then, sync to native iOS project by running:
  ```bash
  npm run sync -- ios
  ```
  ```bash
  npm run open:ios
  ```

## Implement new features
- You need Angular skillset, Ionic, and some related libraries to implement new features.
- References: [Angular](https://angular.io/), [Ionic](https://ionicframework.com/)
# Build project for production

0. Build project for production and sync to native projects.
   
```bash
npm run build:prod
```

1. For each **Android** & **iOS** project, you need to sign up a developer account for both in order to publish your project.
