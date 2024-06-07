import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, DateTimeColumn as DateTimeColumn_, Index as Index_, FloatColumn as FloatColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class FactoryDayData {
    constructor(props?: Partial<FactoryDayData>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @DateTimeColumn_({nullable: false})
    date!: Date

    @FloatColumn_({nullable: false})
    dailyVolumeUSD!: number

    @FloatColumn_({nullable: false})
    dailyFeeUSD!: number

    @FloatColumn_({nullable: false})
    totalVolumeUSD!: number

    @FloatColumn_({nullable: false})
    totalFeeUSD!: number

    @FloatColumn_({nullable: false})
    totalLiquidityUSD!: number
}
