
export default interface Transaction {
    type: 'transaction',
    id: string,
    index: number,
    payerId: number,
    payeeIds: number[],
    desc: string,
    amount: number
}


export interface PartialTransaction extends Pick<Transaction, 'desc' | 'amount' | 'payerId' | 'payeeIds'> {}