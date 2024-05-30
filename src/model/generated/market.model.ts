import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, FloatColumn as FloatColumn_, ManyToOne as ManyToOne_, Index as Index_, BigDecimalColumn as BigDecimalColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {SY} from "./sy.model"
import {PT} from "./pt.model"
import {YT} from "./yt.model"
import {MarketHourData} from "./marketHourData.model"
import {MarketDayData} from "./marketDayData.model"

@Entity_()
export class Market {
    constructor(props?: Partial<Market>) {
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
    @ManyToOne_(() => SY, {nullable: true})
    sy!: SY

    @Index_()
    @ManyToOne_(() => PT, {nullable: true})
    pt!: PT

    @Index_()
    @ManyToOne_(() => YT, {nullable: true})
    yt!: YT

    @BigDecimalColumn_({nullable: false})
    totalSy!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    totalPt!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    totalLp!: BigDecimal

    @FloatColumn_({nullable: false})
    reserveUSD!: number

    @FloatColumn_({nullable: false})
    volumeUSD!: number

    @OneToMany_(() => MarketHourData, e => e.market)
    marketHourData!: MarketHourData[]

    @OneToMany_(() => MarketDayData, e => e.market)
    marketDayData!: MarketDayData[]
}
