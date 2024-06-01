import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, ManyToOne as ManyToOne_, StringColumn as StringColumn_, BigDecimalColumn as BigDecimalColumn_, FloatColumn as FloatColumn_} from "@subsquid/typeorm-store"
import {Market} from "./market.model"

@Index_(["market", "timestamp"], {unique: false})
@Entity_()
export class Swap {
    constructor(props?: Partial<Swap>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @ManyToOne_(() => Market, {nullable: true})
    market!: Market

    @StringColumn_({nullable: false})
    caller!: string

    @StringColumn_({nullable: false})
    receiver!: string

    @BigDecimalColumn_({nullable: false})
    netPtOut!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    netSyOut!: BigDecimal

    @FloatColumn_({nullable: false})
    amountUSD!: number
}
