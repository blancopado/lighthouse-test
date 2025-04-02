import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import GuestCountryInfo from "../components/guestCountryInfo/GuestCountryInfo";
import type { ProcessedGuestCountry } from "../controllers/ProcessedGuestCountry";
import { useGuestCountry } from "../hooks/useGuestCountry";

const GuestCountry = () => {
	const [guestsCountries, setGuestsCountries] =
		useState<ProcessedGuestCountry[]>();
	const { getAllGuestsCountries } = useGuestCountry();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPets = async () => {
			setIsLoading(true);

			const guestsCountries = await getAllGuestsCountries();
			setGuestsCountries(guestsCountries);

			setIsLoading(false);
		};

		fetchPets();
	}, [getAllGuestsCountries]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Card title="Guest Country">
			{guestsCountries?.map((guestCountry) => (
				<GuestCountryInfo
					key={guestCountry.id}
					countryName={guestCountry.countryName}
					value={guestCountry.reservations}
					total={guestCountry.total}
					growth={guestCountry.growth}
				/>
			))}
		</Card>
	);
};

export default GuestCountry;
