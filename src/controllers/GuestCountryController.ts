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
		const growth: Growth = {
			sign: "+",
			value: 0,
			absValue: 0,
			color: "blue",
		};

		const value =
			guestCountry.value.nr_of_rooms - guestCountry.reference_value.nr_of_rooms;

		if (
			guestCountry.value.nr_of_rooms > guestCountry.reference_value.nr_of_rooms
		) {
			growth.sign = "+";
			growth.value = value;
			growth.absValue = value;
			growth.color = "green";
		} else if (
			guestCountry.value.nr_of_rooms < guestCountry.reference_value.nr_of_rooms
		) {
			growth.sign = "-";
			growth.value = value;
			growth.absValue = Math.abs(value);
			growth.color = "red";
		}

		return growth;
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
			return {
				id: guestCountry.id,
				countryName: this.getCountryName(guestCountry),
				reservations: guestCountry.value.nr_of_rooms,
				total: this.getMaxReservations(guestsCountries),
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
