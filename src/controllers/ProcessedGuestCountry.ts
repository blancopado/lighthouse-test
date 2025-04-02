import type { Id } from "../types/id";
import type { CountryName } from "./countryMapping";

interface Growth {
	sign: "+" | "-";
	value: number;
	absValue: number;
	color: "red" | "green" | "blue";
}

interface ProcessedGuestCountry {
	id: Id;
	countryName: CountryName;
	reservations: number;
	total: number;
	growth: Growth;
}

export type { Growth, ProcessedGuestCountry };
