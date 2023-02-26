import { getCookie } from "../cookie";

export interface Household {
    id: number
    name: string
}

export interface User {
    id: number
    email: string
}

export const getHouseholds = async (): Promise<Household[]> =>  await fetch(`${import.meta.env.VITE_APP_BASE_URL}/households`, {
    credentials: "include",
    headers: {
        'content-type': 'application/json',
        'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
    },
    method: "GET"
}).then((r) => {
    if (r.ok) {
        return r.json()
    } else {
        throw r.statusText;
    }
})

export const getHousehold = async (id: number) => await fetch(`${import.meta.env.VITE_APP_BASE_URL}/households/${id}`, {
    credentials: "include",
    headers: {
        'content-type': 'application/json',
        'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
    },
    method: "GET"
}).then((r) => {
    if (r.ok) {
        return r.json()
    } else {
        throw r.statusText;
    }
})

export const getMembers = async (id: number): Promise<User[]> => await fetch(`${import.meta.env.VITE_APP_BASE_URL}/households/${id}/members`, {
    credentials: "include",
    headers: {
        'content-type': 'application/json',
        'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
    },
    method: "GET"
}).then((r) => {
    if (r.ok) {
        return r.json()
    } else {
        throw r.statusText;
    }
})

export const addMember = async (data: { household: number, email: string}) => await fetch(`${import.meta.env.VITE_APP_BASE_URL}/households/${data.household}/members`, {
    credentials: "include",
    headers: {
        'content-type': 'application/json',
        'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
    },
    body: JSON.stringify(data),
    method: "POST"
}).then((r) => {
    if (r.ok) {
        return r.json()
    } else {
        throw r.statusText;
    }
})

export const createHousehold = async (household: Partial<Household>) => await fetch(`${import.meta.env.VITE_APP_BASE_URL}/households`, {
    credentials: "include",
    headers: {
        'content-type': 'application/json',
        'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
    },
    body: JSON.stringify(household),
    method: "POST"
}).then((r) => {
    if (r.ok) {
        return r.json()
    } else {
        throw r.statusText;
    }
})