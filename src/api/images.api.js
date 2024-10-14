import { supabase } from "../client";

const TABLE_NAME = "images";

export const IMAGES_API = {
    add: async (file, fileName) => {
        try {
            const { error } = await supabase.storage
                .from(TABLE_NAME)
                .upload(`${fileName}`, file);

            if (error) return false;

            return true;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },

    delete: async (fileName) => {
        try {
            const { error } = await supabase.storage
                .from(TABLE_NAME)
                .remove(`${fileName}`);

            if (error) return false;

            return true;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    },
};
