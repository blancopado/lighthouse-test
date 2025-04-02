import type { CountryCode } from "../controllers/countryMapping";
import type { Id } from "../types/id";

interface GuestCountry {
	id: Id;
	reference_value: {
		nr_of_rooms: number;
		revenue: number;
	};
	display_code: CountryCode;
	value: {
		nr_of_rooms: number;
		revenue: number;
	};
}

export default GuestCountry;
