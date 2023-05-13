import { Schema, model } from "mongoose";

// 
const signValueSchema = new Schema({
    curve: { type: String },
    scalar: { type: Buffer }
})
const signResultSchema = new Schema(
    {
        r: { type: signValueSchema },
        s: { type: signValueSchema },
        recid: { type: Number }
    }
)


const logSchema = new Schema({
    blockNumber: { type: Number },
    blockHash: { type: String },
    transactionIndex: { type: Number },
    removed: { type: Boolean },
    address: { type: String },
    data: { type: String },
    topics: { type: [String] },
    transactionHash: { type: String },
    logIndex: { type: Number },
})


export const appStateSchema = new Schema(
    {
        keyShares: [{
            label: { type: String }, // mpc account name
            share: {
                localKey: {
                    i: { type: Number },    // indice of share
                    t: { type: Number },    // threshold
                    n: { type: Number }     // number of parties
                },
                publicKey: { type: [Number] },
                address: { type: String }
            }
        }],
        messageProofs: {
            type: Map,
            of: [{
                signature: { type: signResultSchema },
                address: { type: String },
                value: {
                    digest: { type: Buffer },
                    message: { type: String }
                },
                timestamp: { type: Number }
            }],
            default: new Map(),
        },
        transactionReceipts: {
            type: Map,
            of: [{
                signature: { type: signResultSchema },
                address: { type: String },
                amount: { type: String },
                timestamp: { type: Number },
                tx: {
                    digest: {
                        type: Buffer,
                        set: (values: any) => {
                            if (typeof values === 'object' && !Array.isArray(values)) {
                                const bufArray: number[] = Object.values(values);
                                return Buffer.from(bufArray)
                            }
                            return values;
                        },
                    },
                    transaction: {
                        to: { type: String },
                        nonce: { type: Number },
                        gasLimit: {
                            type: Buffer,
                            set: (value: any) => {
                                if (typeof value === 'object' && value.type === 'BigNumber' && value.hex) {
                                    return Buffer.from(value.hex.replace(/^0x/, ''), 'hex');
                                }
                                return value;
                            },
                        },
                        gasPrice: { type: Buffer },
                        data: { type: Buffer },
                        value: {
                            type: Buffer,
                            set: function (value: any) {
                                if (typeof value === 'object' && value.type === 'BigNumber' && value.hex) {
                                    return Buffer.from(value.hex.replace(/^0x/, ''), 'hex');
                                }
                                return value;
                            }
                        },
                        chainId: { type: Number },

                        // EIP-1559; Type 2
                        maxPriorityFeePerGas: {
                            type: Buffer,
                            set: function (value: any) {
                                if (typeof value === 'object' && value.type === 'BigNumber' && value.hex) {
                                    return Buffer.from(value.hex.replace(/^0x/, ''), 'hex');
                                }
                                return value;
                            }
                        },
                        maxFeePerGas: {
                            type: Buffer,
                            set: function (value: any) {
                                if (typeof value === 'object' && value.type === 'BigNumber' && value.hex) {
                                    return Buffer.from(value.hex.replace(/^0x/, ''), 'hex');
                                }
                                return value;
                            }
                        }
                    }
                },
                value: {
                    to: { type: String },
                    from: { type: String },
                    contractAddress: { type: String },
                    transactionIndex: { type: Number },
                    root: { type: String },
                    gasUsed: {
                        type: Buffer,
                        set: function (value: any) {
                            if (typeof value === 'object' && value.type === 'BigNumber' && value.hex) {
                                return Buffer.from(value.hex.replace(/^0x/, ''), 'hex');
                            }
                            return value;
                        }
                    },
                    logsBloom: { type: String },
                    blockHash: { type: String },
                    transactionHash: { type: String },
                    logs: { type : [logSchema]},
                    blockNumber: { type: Number },
                    confirmations: { type: Number },
                    cumulativeGasUsed: {
                        type: Buffer,
                        set: function (value: any) {
                            if (typeof value === 'object' && value.type === 'BigNumber' && value.hex) {
                                return Buffer.from(value.hex.replace(/^0x/, ''), 'hex');
                            }
                            return value;
                        }
                    },
                    effectiveGasPrice: {
                        type: Buffer,
                        set: function (value: any) {
                            if (typeof value === 'object' && value.type === 'BigNumber' && value.hex) {
                                return Buffer.from(value.hex.replace(/^0x/, ''), 'hex');
                            }
                            return value;
                        }
                    },
                    byzantium: { type: Boolean },
                    type: { type: Number },
                    status: { type: Number },
                }
            }]
        }
    }
)

export const AppState = model("AppState", appStateSchema)