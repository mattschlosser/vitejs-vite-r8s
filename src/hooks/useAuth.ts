
interface FormData {
    email: HTMLInputElement,
    password: HTMLInputElement
}

import { getCookie } from "../cookie";
import { ref, type Ref, readonly } from "vue";
export function useAuth() {
    const hasLoggedIn: Ref<boolean> = ref(false);

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

    const login = async (event: Event) => {
      if (!event.target) return;
      let target = event.target as HTMLFormElement & {elements: FormData}
      await fetch(`${import.meta.env.VITE_APP_BASE_URL}/login`, {
        headers: {
          'content-type': 'application/json',
          'X-XSRF-TOKEN': getCookie(`XSRF-TOKEN`)
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          email: target.elements.email.value,
          password: target.elements.password.value,
        }),
      });
      hasLoggedIn.value = true;
    };

    return {
        login,
        logout,
        hasLoggedIn
    }
}