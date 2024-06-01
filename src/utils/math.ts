import { BigDecimal } from "@subsquid/big-decimal";

export type BigDecimalSource = bigint | string | number | BigDecimal

export function toTokenDecimals(amount: BigDecimalSource, decimals: number): BigDecimal {
  return BigDecimal(amount).div(10 ** decimals)
}
