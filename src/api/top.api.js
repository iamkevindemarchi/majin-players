import { supabase } from "../client";

const TABLE_NAME = "top";

export const TOP_API = {
    getAll: async (id) => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE_NAME)
                .select()
                .eq("playerId", id);

            if (error) return false;

            return res;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    create: async (data) => {
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .insert(data)
                .select();

            if (error) return false;

            return true;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    delete: async (id) => {
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .delete()
                .eq("id", id);

            if (error) return false;

            return true;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    deleteAll: async (playerId) => {
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .delete()
                .eq("playerId", playerId);

            if (error) return false;

            return true;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },
};
