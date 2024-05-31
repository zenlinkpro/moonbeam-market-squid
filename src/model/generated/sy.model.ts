import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, FloatColumn as FloatColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {Token} from "./token.model"

@Entity_()
export class SY {
    constructor(props?: Partial<SY>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    symbol!: string

    @StringColumn_({nullable: false})
    name!: string

    @IntColumn_({nullable: false})
    decimals!: number

    @FloatColumn_({nullable: false})
    priceUSD!: number

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    yieldToken!: Token

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    baseAsset!: Token
}
