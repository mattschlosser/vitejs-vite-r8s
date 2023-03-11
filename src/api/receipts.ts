import { getCookie } from "../cookie";

interface User {
    id: number,
    email: string
}
interface Receipt {
    id: number,
    purchased_by: number,
    purchasedByUser: User,
    purchased: string,
    amount: number,
    shop: string
}

export const getReceipts = async (id: number): Promise<Receipt[]> => await fetch(`${import.meta.env.VITE_APP_BASE_URL}/households/${id}/receipts`, {
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

interface ReceiptForm {
    household: number
    store: string
    purchased: string
    amount: number
    purchasedBy: number
}

export const addReceipt = async (data: ReceiptForm) => await fetch(`${import.meta.env.VITE_APP_BASE_URL}/households/${data.household}/receipts  `, {
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