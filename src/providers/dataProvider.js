import { isMockMode } from "../config/env";
import { mockProvider } from "../mock/mockProvider";
import { apiProvider } from "./apiProvider";

export const dataProvider = isMockMode ? mockProvider : apiProvider;
export const providerType = isMockMode ? "mock" : "api";
