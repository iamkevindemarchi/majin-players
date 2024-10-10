import { supabase } from "../client";

export const AUTH_API = {
    login: async (email, password) => {
        const data = {
            email,
            password,
        };

        try {
            const { data: res, error } = await supabase.auth.signInWithPassword(
                data
            );
            if (error) return false;

            return res;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    logout: async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },
};
