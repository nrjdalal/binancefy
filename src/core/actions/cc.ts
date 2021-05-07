import axios from 'axios'
import markets from './markets'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getBase = async (baseCurrency = 'btc', baseVolume = 0) => {
  const base = baseCurrency.toUpperCase()

  const filter = [...markets.fiat].map((str) => base + str)

  const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')

  const symbols: unknown[] = []

  res.data.forEach((obj: unknown) => {
    const objSymbol = obj.symbol
    const objVolume = parseInt(obj.volume, 10)

    if (objSymbol.startsWith(base) && objVolume > baseVolume) {
      let flag = 0

      filter.forEach((string) => {
        if (objSymbol === string) {
          flag = 1
        }
      })

      if (flag) {
        symbols.push({
          symbol: objSymbol,
          baseVolume: objVolume,
        })
      }
    }
  })

  return symbols.sort((a, b) => b.baseVolume - a.baseVolume)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getQuote = async (quoteCurrency = 'usdt', quoteVolume = 0) => {
  const quote = quoteCurrency.toUpperCase()

  const filter = [...markets.fiat, ...markets.etf].map((str) => str + quote)

  const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')

  const symbols: unknown[] = []

  res.data.forEach((obj: unknown) => {
    const objSymbol = obj.symbol
    const objVolume = parseInt(obj.quoteVolume, 10)

    if (objSymbol.endsWith(quote) && objVolume > quoteVolume) {
      let flag = 1

      filter.forEach((string) => {
        if (objSymbol.endsWith(string)) {
          flag = 0
        }
      })

      if (flag) {
        symbols.push({
          symbol: objSymbol,
          quoteVolume: objVolume,
        })
      }
    }
  })

  return symbols.sort((a, b) => b.quoteVolume - a.quoteVolume)
}
