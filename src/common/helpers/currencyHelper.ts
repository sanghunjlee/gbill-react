export function currencyToString(c: number | undefined) {
    if (c === undefined) return "$0.00";
    return "$" + c.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2});
}