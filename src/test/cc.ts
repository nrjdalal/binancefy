import * as bfy from '../core/index'

const getSymbols = async () => {
  const symbols = await bfy.getQuote()
  console.log(symbols)
}

getSymbols()
