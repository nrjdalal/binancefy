const axios = require('axios')

const markets = require('./markets.json')

const getByQuote = async (quote, quoteVolume = 0) => {
	quote = quote.toUpperCase()

	const filter = []

	for (element of [...markets.fiat, ...markets.etf]) {
		element = element + quote
		filter.push(element)
	}

	const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')

	const resData = []

	for (element of res.data) {
		if (element.symbol.endsWith(quote) && element.quoteVolume > quoteVolume) {
			let flag = 1

			for (x of filter) {
				if (element.symbol.endsWith(x)) {
					flag = 0
					break
				}
			}

			if (flag) {
				resData.push({
					symbol: element.symbol,
					quoteVolume: element.quoteVolume,
				})
			}
		}
	}

	symbols = resData.sort((a, b) => b.quoteVolume - a.quoteVolume)

	return symbols
}

const getByBase = async (base, baseVolume = 0) => {
	base = base.toUpperCase()

	const filter = []

	for (element of [...markets.fiat]) {
		element = base + element
		filter.push(element)
	}

	const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')

	const resData = []

	for (element of res.data) {
		if (element.symbol.startsWith(base) && element.volume > baseVolume) {
			let flag = 0

			for (x of filter) {
				if (element.symbol === x) {
					flag = 1
					break
				}
			}

			if (flag) {
				resData.push({
					symbol: element.symbol,
					baseVolume: element.volume,
				})
			}
		}
	}

	symbols = resData.sort((a, b) => b.baseVolume - a.baseVolume)

	return symbols
}

module.exports = { getByQuote, getByBase }
