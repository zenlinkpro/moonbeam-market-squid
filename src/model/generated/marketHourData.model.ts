import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, ManyToOne as ManyToOne_, BigDecimalColumn as BigDecimalColumn_, FloatColumn as FloatColumn_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"

@Entity_()
export class MarketHourData {
    constructor(props?: Partial<MarketHourData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    hourStartUnix!: bigint

    @Index_()
    @ManyToOne_(() => Market, {nullable: true})
    market!: Market

    @BigDecimalColumn_({nullable: false})
    totalSy!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    totalPt!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    totalLp!: BigDecimal

    @FloatColumn_({nullable: false})
    reserveUSD!: number

    @FloatColumn_({nullable: false})
    hourlyVolumeUSD!: number
}
