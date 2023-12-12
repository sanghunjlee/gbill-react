import Person from "../interfaces/person";

export function getPersons(): Person[] {
    const storedItem = localStorage.getItem("persons");
    const persons = storedItem ? JSON.parse(storedItem) : [];
    return Array.isArray(persons) ? persons.map(t => t as Person).sort((a,b) => a.id - b.id) : [];
}

export function getPerson(id: number): Person | null {
    const persons = getPersons();
    const person = persons.find(t => t.id === id);
    return person ?? null;
}

export function createPerson({
    name
}: Pick<Person, "name">) {
    
    let persons = getPersons();
    let newId = persons.length > 0 ? persons[persons.length-1].id + 1 : 0;
    if (newId !== persons.length) {
        for (let i=0; i<persons.length; i++) {
            if (i > 0 && persons[i-1].id + 1 !== persons[i].id){
                newId = persons[i-1].id + 1;
                break;
            }
        }
    }
    
    const newPerson: Person = {
        type: "person",
        id: newId,
        name
    }
    persons.push(newPerson);
    set(persons);
}

export function updatePerson(id: number, update: Partial<Person>) {
    const persons = getPersons();
    let person = persons.find(t => t.id === id);
    if (!person) throw new Error(`No person found for: ${id}`);
    Object.assign(person, update);
    set(persons);
}

export function deletePerson(id: number): boolean {
    const persons = getPersons();
    const index = persons.findIndex(t => t.id === id);
    if (index > -1) {
        persons.splice(index, 1);
        set(persons);
        return true;
    }
    return false;
}

export function deleteAllPersons() {
    set([]);
}

function set(persons: Person[]) {
    localStorage.setItem("persons", JSON.stringify(persons));
}