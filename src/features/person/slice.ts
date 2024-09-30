import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Person } from "@src/features/person/interface";

export interface PersonState {
    status: 'idle' | 'loading' | 'failed';
    persons: Person[];
}

const initialPersonState: PersonState = {
    status: 'idle',
    persons: [],
};

export const personSlice = createSlice({
    name: 'person',
    initialState: initialPersonState,
    reducers: {
        addPerson: (state, action: PayloadAction<Person>) => {
            state.persons.push(action.payload);
        },
        editPerson: (state, action: PayloadAction<Partial<Person>>) => {
            if (action.payload.id === undefined) return;

            const selected = state.persons.find(p => p.id === action.payload.id);
            
            if (selected === undefined) return;

            state.persons = [
                ...state.persons.filter(p => p.id !== selected.id),
                Object.assign(selected, action.payload) as Person
            ];
        },
        removePerson: (state, action: PayloadAction<Person>) => {
            const pindex = state.persons.findIndex(p => p.id === action.payload.id);
            if (pindex != -1) {
                state.persons = state.persons.filter(p => p.id !== action.payload.id);
            }
        },
        clearPersons: (state) => {
            state.persons = [];
        }
    }
});

export const { addPerson, editPerson, removePerson, clearPersons } = personSlice.actions;
export default personSlice.reducer;