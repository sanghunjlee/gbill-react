
export default interface Transaction {
    type: 'transaction',
    id: number,
    payerId: number,
    payeeIds: number[],
    desc: string,
    amount: number
}
