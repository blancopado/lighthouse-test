import { useCallback } from "react";

import HttpClient from "../client/HttpClient";
import GuestCountryController from "../controller/GuestCountryController";
import GuestCountryHttpRepository from "../infrastructure/GuestCountryHttpRepository";

export const useGuestCountry = () => {
	const getAllGuestsCountries = useCallback(() => {
		const guestCountryController = new GuestCountryController({
			guestCountryRepository: new GuestCountryHttpRepository(new HttpClient()),
		});

		return guestCountryController.getAll();
	}, []);

	return { getAllGuestsCountries };
};
