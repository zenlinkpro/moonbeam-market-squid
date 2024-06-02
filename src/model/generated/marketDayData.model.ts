import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, ManyToOne as ManyToOne_, BigDecimalColumn as BigDecimalColumn_, FloatColumn as FloatColumn_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"

@Index_(["market", "date"], {unique: false})
@Entity_()
export class MarketDayData {
    constructor(props?: Partial<MarketDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @DateTimeColumn_({nullable: false})
    date!: Date

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
    dailyVolumeUSD!: number

    @FloatColumn_({nullable: false})
    baseAssetPrice!: number

    @FloatColumn_({nullable: false})
    yieldTokenPrice!: number

    @FloatColumn_({nullable: false})
    ptPrice!: number

    @FloatColumn_({nullable: false})
    ytPrice!: number

    @FloatColumn_({nullable: false})
    underlyingAPY!: number

    @FloatColumn_({nullable: false})
    impliedAPY!: number

    @FloatColumn_({nullable: false})
    longYieldAPY!: number

    @FloatColumn_({nullable: true})
    fixedAPY!: number | undefined | null
}
