import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, FloatColumn as FloatColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Factory {
    constructor(props?: Partial<Factory>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    marketCount!: number

    @FloatColumn_({nullable: false})
    totalVolumeUSD!: number

    @FloatColumn_({nullable: false})
    totalLiquidityUSD!: number
}
