export default interface Transaction {
    id: number,
    payee: string,
    payer: string[],
    desc: string,
    amount: number
}