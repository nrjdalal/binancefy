const axios = require('axios')

const getSymbols = async (pair, volume = 0) => {
	const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')

	const resData = []

	for (element of res.data) {
		if (element.symbol.endsWith(pair) && !element.symbol.endsWith(`UP${pair}`) && !element.symbol.endsWith(`DOWN${pair}`) && !element.symbol.endsWith(`BULL${pair}`) && !element.symbol.endsWith(`BEAR${pair}`) && element.quoteVolume > volume) {
			resData.push({
				symbol: element.symbol,
				volume: element.quoteVolume,
			})
		}
	}

	symbols = resData.sort((a, b) => b.volume - a.volume)

	return symbols
}

module.exports = getSymbols
