import Card from "./components/card/Card";
import GuestCountryInfo from "./components/guestCountryInfo/GuestCountryInfo";

function App() {
	return (
		<div>
			<Card title="Guest Country">
				<GuestCountryInfo
					countryName="Belgium"
					value={676}
					total={676}
					growth={111}
				/>
				<GuestCountryInfo
					countryName="Germany"
					value={634}
					total={700}
					growth={91}
				/>
				<GuestCountryInfo
					countryName="France"
					value={451}
					total={800}
					growth={0}
				/>
				<GuestCountryInfo
					countryName="Australia"
					value={332}
					total={700}
					growth={-557}
				/>
				<GuestCountryInfo
					countryName="United States of America"
					value={230}
					total={800}
					growth={62}
				/>
				<GuestCountryInfo
					countryName="Spain"
					value={230}
					total={800}
					growth={62}
				/>
			</Card>
		</div>
	);
}

export default App;
