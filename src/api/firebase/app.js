import { refs } from "./config";

export const getNewestVersionOfApp = async () => {
  const docRef = await refs.assets.doc("desktopApp").get();
  return docRef.exists ? docRef.data() : null;
};
