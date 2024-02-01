import PersonTransaction from "../../interfaces/interfacePersonTransaction";

export function getPersonTransactions() {
    const storedItem = localStorage.getItem("personTransactions");
    const persons: PersonTransaction[] = storedItem ? JSON.parse(storedItem) : [];
    return persons.sort((a,b) => (a.personId.localeCompare(b.personId)) || (a.transactionId.localeCompare(b.transactionId)));
}

export function getTransactionIds(personId: string) {
    const pts = getPersonTransactions();
    return pts.filter(pt => pt.personId === personId).map(pt => pt.transactionId);
}

export function getPersonIds(transactionId: string) {
    const pts = getPersonTransactions();
    return pts.filter(pt => pt.transactionId === transactionId).map(pt => pt.personId);
}

export function addPersonTransaction({
    personId, transactionId
}: Pick<PersonTransaction, "personId" | "transactionId">): boolean {
    const pts = getPersonTransactions();
    if (!pts.find(pt => pt.personId === personId && pt.transactionId === transactionId)) {
        const newPt: PersonTransaction = {
            type: "personTransaction",
            personId, 
            transactionId
        };
        set([...pts, newPt]);
        return true;
    }
    return false;
}

export function updateTrasnactionPersons(transactionId: string, newPersonId: string): boolean {
    const pts = getPersonTransactions();
    let result = false;
    const newPts = pts.map(pt => {
        if (pt.transactionId === transactionId) {
            if (!result) result = true;
            Object.assign(pt, {personId: newPersonId});
        } 
        return pt;
    });
    set(newPts);
    return result;
}

export function deletePersonTransaction({
    personId, transactionId
}: Partial<Pick<PersonTransaction, "personId" | "transactionId">>): boolean {
    const pts = getPersonTransactions();
    const newPts = pts.filter(
        pt => personId && transactionId ? 
            pt.personId === personId && pt.transactionId === transactionId : 
        personId ?
            pt.personId === personId : 
        transactionId ? 
            pt.transactionId === transactionId :
        false
    );
    if (pts.length !== newPts.length) {
        set(newPts);
        return true;
    }
    return false;
}

export function deleteAllPersonTransactions() {
    set([]);
}

function set(personTransactions: PersonTransaction[]) {
    localStorage.setItem("personTransactions", JSON.stringify(personTransactions));
}