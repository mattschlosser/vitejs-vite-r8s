
interface FormData {
    email: HTMLInputElement,
    password: HTMLInputElement
}

import { getCookie } from "../cookie";
import { ref, type Ref, readonly, onMounted } from "vue";
const hasLoggedIn: Ref<boolean | null> = ref(null);
export function useAuth() {

    /**
     * Check if the person is logged in
     */
    onMounted(async () => {
        if (hasLoggedIn.value === null) {
            await fetch(`${import.meta.env.VITE_APP_BASE_URL}/check`, {
                credentials: "include",
                method: "GET"
            }).then(async (r) => {
                if (r.ok) {
                    let result = await r.json()
                    hasLoggedIn.value = result.isLoggedIn
                }
            })
        }
    })

    const register = async (email: string, password: string) => {
        await fetch(`${import.meta.env.VITE_APP_BASE_URL}/register`, {
            credentials: "include",
            headers: {
                'content-type': 'application/json',
                'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
            },
            body: JSON.stringify({ email, password }),
            method: "POST"
        }).then((r) => {
            if (r.ok) {
                hasLoggedIn.value = true;
            } else {
                throw r.statusText;
            }
        })
    }

    const logout = async () => {
        await fetch(`${import.meta.env.VITE_APP_BASE_URL}/logout`, {
            credentials: "include",
            headers: {
                'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
            },
            method: "POST"
        }).then((r) => {
            if (r.ok) {
                hasLoggedIn.value = false;
            } else {
                throw r.statusText;
            }
        })
    }

    const login = async (email: string, password: string) => {
      await fetch(`${import.meta.env.VITE_APP_BASE_URL}/login`, {
        headers: {
          'content-type': 'application/json',
          'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      hasLoggedIn.value = true;
    };

    return {
        login,
        logout,
        register,
        hasLoggedIn: readonly(hasLoggedIn)
    }
}