import { createSeedData } from "./data/seed";

const STORE_KEY = "apex.mock-data.v1";

const clone = (value) => JSON.parse(JSON.stringify(value));

export const readMockStore = () => {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    return stored ? JSON.parse(stored) : createSeedData();
  } catch {
    return createSeedData();
  }
};

export const writeMockStore = (store) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
  return clone(store);
};

export const updateMockStore = (updater) => {
  const next = updater(clone(readMockStore()));
  return writeMockStore(next);
};

export const resetMockStore = () => writeMockStore(createSeedData());
