import { BigDecimal } from "@subsquid/big-decimal";

export type BigDecimalSource = bigint | string | number | BigDecimal

export function toTokenDecimals(amount: BigDecimalSource, decimals: number): BigDecimal {
  return BigDecimal(amount).div(10 ** decimals)
}

export function toFloat(number: BigDecimalSource): number {
  return parseFloat(BigDecimal(number).toFixed(6))
}

export function calcImpliedAPY(ytPrice: number, ptPrice: number, daysToMaturity: number): number {
  if (daysToMaturity <= 0 || ytPrice == 0 || ptPrice == 0) return 0
  return (1 + ytPrice / ptPrice) ** (365 / daysToMaturity) - 1
}
