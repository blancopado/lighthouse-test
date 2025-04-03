import type GuestCountry from "../domain/GuestCountry";
import type GuestCountryRepository from "../domain/GuestCountryRepository";
import type { Growth, ProcessedGuestCountry } from "./ProcessedGuestCountry";
import { COUNTRY_CODE_MAPPING, type CountryName } from "./countryMapping";

interface GuestCountryParams {
	guestCountryRepository: GuestCountryRepository;
}

class GuestCountryController {
	private readonly guestCountryRepository;

	constructor({ guestCountryRepository }: GuestCountryParams) {
		this.guestCountryRepository = guestCountryRepository;
	}

	private getCountryName(guestCountry: GuestCountry): CountryName {
		return COUNTRY_CODE_MAPPING[guestCountry.display_code];
	}

	private getGrowthInfo(guestCountry: GuestCountry): Growth {
		const value =
			guestCountry.value.nr_of_rooms - guestCountry.reference_value.nr_of_rooms;

		if (value === 0) {
			return {
				sign: "+",
				value: 0,
				absValue: 0,
				color: "blue",
			};
		}

		const currentReservationsGreaterThenReference =
			guestCountry.value.nr_of_rooms > guestCountry.reference_value.nr_of_rooms;

		return {
			sign: currentReservationsGreaterThenReference ? "+" : "-",
			value: value,
			absValue: Math.abs(value),
			color: currentReservationsGreaterThenReference ? "green" : "red",
		};
	}

	private getMaxReservations(guestsCountries: GuestCountry[]): number {
		let maxReservationsGuestCountry = guestsCountries[0];

		for (const guestCountry of guestsCountries) {
			if (
				guestCountry.value.nr_of_rooms >
				maxReservationsGuestCountry.value.nr_of_rooms
			) {
				maxReservationsGuestCountry = guestCountry;
			}
		}

		return maxReservationsGuestCountry.value.nr_of_rooms;
	}

	private sortProcessedGuestsCountries(
		processedGuestsCountries: ProcessedGuestCountry[],
	): ProcessedGuestCountry[] {
		return processedGuestsCountries.sort((guestCountryA, guestCountryB) => {
			const revenueComparison =
				guestCountryB.reservations - guestCountryA.reservations;

			if (revenueComparison === 0) {
				return guestCountryB.growth.value - guestCountryA.growth.value;
			}

			return revenueComparison;
		});
	}

	private processedGuestsCountries(
		guestsCountries: GuestCountry[],
	): ProcessedGuestCountry[] {
		const processedGuestsCountries = guestsCountries.map((guestCountry) => {
			const total = this.getMaxReservations(guestsCountries);
			return {
				id: guestCountry.id,
				countryName: this.getCountryName(guestCountry),
				reservations: guestCountry.value.nr_of_rooms,
				total,
				growth: this.getGrowthInfo(guestCountry),
			};
		});

		return this.sortProcessedGuestsCountries(processedGuestsCountries);
	}

	async getAll(): Promise<ProcessedGuestCountry[]> {
		const guestsCountries = await this.guestCountryRepository.findAll();

		return this.processedGuestsCountries(guestsCountries);
	}
}

export default GuestCountryController;
