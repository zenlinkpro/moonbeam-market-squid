import { BigDecimal } from "@subsquid/big-decimal";

export function toTokenDecimals(amount: bigint, decimals: number): BigDecimal {
  return BigDecimal(amount).div(10 ** decimals)
}
