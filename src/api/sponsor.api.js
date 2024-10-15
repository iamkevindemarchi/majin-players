import { supabase } from "../client";

const TABLE_NAME = "sponsor";

export const SPONSOR_API = {
    getAll: async (from = 0, to = 5, name = "") => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE_NAME)
                .select("*")
                .range(from, to)
                .ilike("name", `%${name}%`);

            if (error) return false;

            return res;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    getAllWithoutFilters: async () => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE_NAME)
                .select("*");

            if (error) return false;

            return res;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    get: async (id) => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE_NAME)
                .select()
                .eq("id", id);

            if (error) return false;

            return res[0];
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    getAllRecords: async (name = "") => {
        try {
            const { count, error } = await supabase
                .from(TABLE_NAME)
                .select("*", { count: "exact" })
                .ilike("name", `%${name}%`);

            if (error) return false;

            return count;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    create: async (data) => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE_NAME)
                .insert(data)
                .select();

            if (error) return false;

            return res[0];
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    update: async (data, id) => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE_NAME)
                .update(data)
                .eq("id", id)
                .select();

            if (error) return false;

            return res[0];
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
};
