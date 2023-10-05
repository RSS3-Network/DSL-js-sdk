export function handleTokenValue(amount?: string | null, decimals?: number) {
  let result = '0.00'
  let money
  if (amount) {
    if (Number.isNaN(Number(amount)) || Number(amount) === 0) {
      return '0.00'
    }

    if (Number(amount) > 0 && decimals !== undefined) {
      amount = formatUnits(amount, decimals)
    }

    const matched = amount.match(/^(0.0+)(.*)/)
    if (Number(amount) > 0 && Number(amount) < 1) {
      money = matched ? matched?.[1] + matched?.[2].slice(0, 3) : '0.' + amount.split('0.')[1].slice(0, 3)
    } else {
      money = Number(Number(amount).toFixed(3)).toString()
    }

    if (!money.includes('.')) {
      money = Number(amount).toFixed(2)
    }

    result = money.replace(/(\d)(?=(\d{3})+\.\d+)/g, '$1,')
  }

  return result
}

export function formatUnits(bigNum: string, unit: number) {
  bigNum =
    bigNum.length > unit
      ? bigNum.slice(0, bigNum.length - unit) + '.' + bigNum.slice(-unit)
      : '0.' + '0'.repeat(unit - bigNum.length) + bigNum
  return bigNum.replace(/0+$/, '')
}
