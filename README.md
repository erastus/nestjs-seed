<p align="center">
  <a href="https://github.com/erastus/nestjs-seed" target="blank"><img src="https://raw.githubusercontent.com/erastus/nestjs-seed/4e23d406058d4b79bdd48f466146a2cf75ef8226/public/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A modern framework designed for efficient, scalable, and enterprise-grade server-side applications.</p>

<p align="center">
  <a href="https://www.npmjs.com/~marr0kin" target="_blank"><img src="https://img.shields.io/npm/v/nestjs-seed" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~marr0kin" target="_blank"><img src="https://img.shields.io/npm/l/nestjs-seed" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~marr0kin" target="_blank"><img src="https://img.shields.io/npm/dm/nestjs-seed" alt="NPM Downloads" /></a>
  <a href="https://github.com/erastus/nestjs-seed" target="_blank"><img src="https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_100.svg" alt="Coverage" /></a>
  <a href="https://github.com/erastus/nestjs-seed" target="_blank"><img src="https://img.shields.io/github/stars/erastus/nestjs-seed" alt="GitHub Stars" /></a>
  <a href="https://github.com/erastus/nestjs-seed" target="_blank"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="Contributions Welcome" /></a>
</p>

## Description

**nestjs-seed** is a base project designed to accelerate the development of applications with <a href="https://nestjs.com" target="_blank">**NestJS**</a>, providing an organized initial structure, built-in best practices, and production-ready configurations. Its purpose is to serve as a starting point for building modular, scalable, and maintainable applications in **TypeScript/JavaScript**, reducing setup time and avoiding the repetition of common configuration tasks.


🌱 **Preconfigured initial architecture** based on principles of modularity and separation of concerns.  

⚡ **Improved productivity**, with utilities, examples, and ready-to-use patterns.  

🛡️ **Built-in best practices**, following quality, security, and maintainability standards.  

🏗️ **Scalability**, designed for both small projects and large enterprise solutions.  

🔄 **Flexibility**, allowing you to adapt, extend, or replace modules according to your project's needs.  

---

With **nestjs-seed**, you can focus directly on business logic without worrying about initial setup, while having a solid foundation that can evolve into a custom framework or grow alongside your enterprise application.

## Project setup

```bash
$ npm install
```

## Using as a Template (for new projects)

If you want to start a new project using this seed:

1. Clone the repository (or use **Use this template**):
   ```bash
   git clone https://github.com/erastus/nestjs-seed my-app
   cd my-app
   ```

2. **Optional**: remove the `src/system/` folder if you don’t plan to collaborate on the package:
   ```bash
   rm -rf src/system
   ```

3. **If you removed** `src/system/` **in the previous step**, install the package from npm:
   ```bash
   npm install nestjs-seed@latest
   ```

4. **If you performed step 2 and 3**, configure your `tsconfig.json` to include the `node_modules/nestjs-seed` path.  
   Example:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "system/*": ["../node_modules/nestjs-seed/build/system/*"]
       }
     }
   }
   ```

5. **If you performed step 2 and 3**, configure your `jest-e2e.json` to include the `node_modules/nestjs-seed` path.  
   Example:
   ```json
   {
     "moduleNameMapper": {
      "^@system/(.*)$": "<rootDir>/node_modules/nestjs-seed/build/system/$1"
    }
   }
   ```

6. Start coding your application

## Lint / Code Quality

```bash
npm run lint
```

## Build / Compile

```bash
# build the project for production
npm run build
```

## Run / Start the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contributing

We welcome and appreciate contributions from everyone interested in helping us improve this project. If you have any ideas, enhancements, or suggestions, we encourage you to open an [issue]() so we can discuss them together. If you think you've got something to help us go forward, feel free to open a [pull request]().

## Reporting Bugs

If you encounter a bug, please create an [issue]() describing it in detail so we can track and resolve it effectively.

## License

nest-seed is [MIT licensed ](LICENSE).