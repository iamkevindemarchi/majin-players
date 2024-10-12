import { supabase } from "../client";

// Utils
import { formatDateFromDB } from "../utils";

const TABLE_NAME = "players";

export const PLAYERS_API = {
    getAll: async (from = 0, dataForPage = 5, name = "", surname = "") => {
        try {
            const { data: res, error } = await supabase
                .from(TABLE_NAME)
                .select("*")
                .range(from, from === 0 ? dataForPage - 1 : from * 2 - 1)
                .ilike("name", `%${name}%`)
                .ilike("surname", `%${surname}%`);
            if (error) return false;

            let elabRes = [];
            if (res.length > 0) {
                res.map((x) => {
                    const birthDate = formatDateFromDB(x.birthDate);

                    return elabRes.push({
                        ...x,
                        birthDate,
                    });
                });
            }

            return elabRes;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    getTotalRecords: async (name = "", surname = "") => {
        try {
            const { count, error } = await supabase
                .from(TABLE_NAME)
                .select("*", { count: "exact" })
                .ilike("name", `%${name}%`)
                .ilike("surname", `%${surname}%`);

            if (error) return false;

            return count;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    deletePlayer: async (id) => {
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
