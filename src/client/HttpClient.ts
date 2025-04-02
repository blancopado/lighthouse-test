class HttpClient {
	async get<T>(endpoint: string): Promise<T> {
		const response = await fetch(`/api${endpoint}`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}
}

export default HttpClient;
