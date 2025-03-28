import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useOpenPreferences = () => {
  return useAtom(modalState);
};
