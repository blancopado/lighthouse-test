import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import GuestCountryInfo from "./components/guestCountryInfo/GuestCountryInfo";
import type { ProcessedGuestCountry } from "./controller/ProcessedGuestCountry";
import { useGuestCountry } from "./hooks/useGuestCountry";

function App() {
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
		<div>
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
		</div>
	);
}

export default App;
