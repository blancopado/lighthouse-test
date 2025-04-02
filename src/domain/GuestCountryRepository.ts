import type GuestCountry from "./GuestCountry";

interface GuestCountryRepository {
	findAll(): Promise<GuestCountry[]>;
}

export default GuestCountryRepository;
