import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, IntColumn as IntColumn_, FloatColumn as FloatColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {SY} from "./sy.model"
import {PT} from "./pt.model"
import {YT} from "./yt.model"

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
}
