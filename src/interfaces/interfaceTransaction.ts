
export default interface ITransaction {
    type: 'transaction',
    id: string,
    index: number,
    payerId: string,
    payeeIds: string[],
    desc: string,
    amount: number
}


export interface PartialTransaction extends Pick<ITransaction, 'desc' | 'amount' | 'payerId' | 'payeeIds'> {}