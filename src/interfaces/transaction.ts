
export default interface Transaction {
    type: 'transaction',
    id: number,
    payer: string,
    payee: string[],
    desc: string,
    amount: number
}
