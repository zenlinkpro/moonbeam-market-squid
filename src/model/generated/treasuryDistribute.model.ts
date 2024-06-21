import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_, BigDecimalColumn as BigDecimalColumn_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"
import {Token} from "./token.model"

@Entity_()
export class TreasuryDistribute {
    constructor(props?: Partial<TreasuryDistribute>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Market, {nullable: true})
    market!: Market

    @BigIntColumn_({nullable: false})
    wTime!: bigint

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token!: Token

    @BigDecimalColumn_({nullable: false})
    accumulatedAmount!: BigDecimal
}
