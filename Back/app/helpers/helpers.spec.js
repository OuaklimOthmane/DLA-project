const {
  centsToCurrency,
  currencyToCents,
  toLocaleString,
} = require('./helpers')
describe('test cents to dollar', () => {
  it('test centos to currency', () => {
    const centes_to_dollar = centsToCurrency(100000)
    console.log(centes_to_dollar)
    expect(centes_to_dollar).toEqual(1000)
  })
  it('test currency to cents', () => {
    const curr_to_cents = currencyToCents(1000)
    // const to_locale_string = toLocaleString(curr_to_cents)
    expect(curr_to_cents).toEqual(100000)
  })

  it('test to locale string', () => {
    const to_locale_string = toLocaleString(1000)
    console.log(to_locale_string)
    expect(to_locale_string).toEqual('1 000,00 €')
  })
})
