import Person from "../../interfaces/interfacePerson";
import { getTransactionIds } from "./personTransactions";

export function getPersons(): Person[] {
    const storedItem = localStorage.getItem("persons");
    const persons = storedItem ? JSON.parse(storedItem) : [];
    return Array.isArray(persons) ? persons.map(t => t as Person).sort((a,b) => a.index - b.index) : [];
}

export function getPerson(id: string): Person | undefined {
    const persons = getPersons();
    const person = persons.find(t => t.id === id);
    return person;
}

export function createPerson({
    name,
}: Pick<Person, "name">) {
    
    let persons = getPersons();
    const newId = crypto.randomUUID()
    const newIndex = generateNewPersonIndex();
    
    const newPerson: Person = {
        type: "person",
        id: newId,
        index: newIndex,
        name
    }
    persons.push(newPerson);
    set(persons);
}

export function updatePerson(id: string, update: Partial<Person>) {
    const persons = getPersons();
    let person = persons.find(t => t.id === id);
    if (!person) throw new Error(`No person found for: ${id}`);
    Object.assign(person, update);
    set(persons);
}

export function deletePerson(id: string): boolean {
    const persons = getPersons();
    const index = persons.findIndex(t => t.id === id);
    if (index > -1) {
        persons.splice(index, 1);
        set(persons);
        return true;
    }
    return false;
}

export function deleteAllPersons(): boolean {
    const persons = getPersons();
    const filtered = persons.filter(p => {
        const tids = getTransactionIds(p.id);
        return tids.length > 0;
    })
    if (filtered.length < persons.length) {
        set(filtered);
        return true;
    }
    return false;
}

export function generateNewPersonIndex(): number {
    const persons = getPersons();
    return Math.max(...persons.map(p => p.index)) + 1;
}

function set(persons: Person[]) {
    localStorage.setItem("persons", JSON.stringify(persons));
}