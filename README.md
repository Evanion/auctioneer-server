# Auctioneer Server
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
You need download and install the [BankID test ssl certificate](https://www.bankid.com/assets/bankid/rp/FPTestcert2_20150818_102329.pfx) in the root of the project, together with the `bankid.cer` file mentioned in section 8 of the [BankID relying party guidelines](https://www.bankid.com/assets/bankid/rp/bankid-relying-party-guidelines-v3.2.2.pdf). For further information, you can check the [bankid module](src/bankid/bankid.module.ts)

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
