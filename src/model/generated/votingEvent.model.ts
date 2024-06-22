import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class VotingEvent {
    constructor(props?: Partial<VotingEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    user!: string

    @BigIntColumn_({nullable: false})
    bias!: bigint

    @BigIntColumn_({nullable: false})
    slope!: bigint

    @BigIntColumn_({nullable: false})
    timestamp!: bigint

    @StringColumn_({nullable: false})
    pool!: string

    @IntColumn_({nullable: false})
    syncingIndex!: number
}
