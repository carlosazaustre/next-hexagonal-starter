# Hexagonal (Next) Frontend WebApp

This is a simple webapp that uses the [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) in the frontend.

The API used is [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a fake online REST API for testing and prototyping.Using Post and Users entities mainly.

## Technologies
- [TypeScript](https://www.typescriptlang.org/) as language
- [Next.js](https://nextjs.org/) as React Front/Back Framework
- [TailwindCSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for TailwindCSS components
- [Cypress](https://www.cypress.io/) for E2E testing
- [Jest](https://jestjs.io/) for Unit testing
- [Testing Library](https://testing-library.com/) for React Components 
  testing
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for code formatting
- [Husky](https://typicode.github.io/husky/#/) for pre-commit hooks
- [Commitlint](https://commitlint.js.org/#/) for commit message linting
## Structure
The project is structured following "Screaming Architecture" approach. The structure is the following:
```
src/
|-- modules/
    |-- posts/
        |-- domain/
        |-- application/
        |-- infra/
    |-- users/
        |-- domain/
        |-- application/
        |-- infra/
    |-- comments/
        |-- domain/
        |-- application/
        |-- infra/
|-- components/
|-- hooks/
|-- sections/
|-- pages/
|-- styles/
```

The `modules` folder contains the different modules of the application. Each module has its own domain, application and infra layers.

The `components` folder contains the different UI shared components of the application.

The `hooks` folder contains the different hooks of the application.

The `sections` folder contains specific components and utils functions related with a module.

The `pages` folder contains the different pages (or Next.js routes) of the application

The `styles` folder contains the base styles using TailwindCSS.

## Modules

Each module follows the same structure, with its own domain, application and infra layers.

```
modules/
|-- posts/
    |-- domain/
        |-- Post.ts
        |-- PostRepository.ts
    |-- application/
        |-- get/
            |-- getPostById.ts
        |-- get-all/
            |-- getAllPosts.ts
            |-- getAllPostsByUser.ts
            |-- getPaginatedPosts.ts
        |-- create/
            |-- createPost.ts
        |-- mappers/
            |-- PostMapper.ts
    |-- infra/
        |-- ApiPostRepository.ts
```

## Testing

The project has unit and E2E testing. The unit testing is done using **Jest** and **Testing Library**. The E2E testing is done using **Cypress**.

Unit tests and Component tests are in the `__tests__` folder.

The E2E tests are in the `cypress` folder.

## License

MIT License
