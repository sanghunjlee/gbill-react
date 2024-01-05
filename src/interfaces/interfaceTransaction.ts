
export default interface Transaction {
    type: 'transaction',
    id: string,
    index: number,
    payerId: string,
    payeeIds: string[],
    desc: string,
    amount: number
}


export interface PartialTransaction extends Pick<Transaction, 'desc' | 'amount' | 'payerId' | 'payeeIds'> {}