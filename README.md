# The world's largest crypto exchange trading library

[![GitHub license][mit-image]][mit-url] &middot;
[![NPM Version][npm-image]][npm-url] &middot;
[![Downloads Stats][npm-downloads]][npm-url]

[mit-image]: https://img.shields.io/badge/license-MIT-blue.svg
[mit-url]: https://en.wikipedia.org/wiki/MIT_License
[npm-image]: https://img.shields.io/npm/v/binancefy.svg?style=flat
[npm-downloads]: https://img.shields.io/npm/dm/binancefy.svg?style=flat
[npm-url]: https://npmjs.org/package/binancefy

> Status: Under Development

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm i binancefy
```

## Usage

### 1. Getting trading symbols using cc

> cc - stands for crypto-currency, a 'cc' pair consists of Base currency and Quote currency, like in BTCUSDT - BTC is Base currency and USDT is Quote currency <br> &nbsp;&nbsp; In most cases the Quote currency is used to find respective cc pairs.

On successful implementation, an array of objects is returned which contains the list of symbols sorted in order of decreasing volume.

1.1 crypto-currency pairs by their Quote (mainly used) \*

```js
const cc = require('binancefy')

const symbols = await cc.quote('USDT')
```

1.2 crypto-currency pairs by their Base

```js
const cc = require('binancefy')

const symbols = await cc.base('BTC')
```

## Examples

To be updated soon.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
