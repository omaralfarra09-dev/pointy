import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  "ar-SY": () =>
    import("@/dictionaries/ar-SY.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "ar-SY") =>
  dictionaries[locale]();
