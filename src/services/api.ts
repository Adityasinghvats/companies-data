import type { CompanyData } from "../types/data";
export const API_CONFIG = {
    BASE_URL: "http://localhost:3000",
    headers: {
        accept: "application/json",
    },
};


export const fetchData = async (
): Promise<CompanyData[]> => {
    try {
        const endpoint = `${API_CONFIG.BASE_URL}/data`

        const response = await fetch(endpoint, {
            method: "GET",
            headers: API_CONFIG.headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch summary data: ${response.statusText}`);
        }

        const data = await response.json();
        return data as CompanyData[];
    } catch (error) {
        console.error("Error fetching data summary:", error);
        throw error;
    }
};