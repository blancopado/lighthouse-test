import type HttpClient from "../client/HttpClient";
import type GuestCountry from "../domain/GuestCountry";
import type GuestCountryRepository from "../domain/GuestCountryRepository";

const GUESTS_COUNTRIES_ENDPOINT = "/guest-country-sample.json";

class GuestCountryHttpRepository implements GuestCountryRepository {
	constructor(private readonly httpClient: HttpClient) {}

	async findAll(): Promise<GuestCountry[]> {
		const guestsCountries = await this.httpClient.get<{
			guest_country: GuestCountry[];
		}>(GUESTS_COUNTRIES_ENDPOINT);
		return guestsCountries.guest_country;
	}
}

export default GuestCountryHttpRepository;
