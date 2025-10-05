import { CompanyArraySchema, type Company } from "@/schemas/companySchema";
export const API_CONFIG = {
    BASE_URL: "http://localhost:3000",
    headers: {
        accept: "application/json",
    },
};


export const fetchData = async (
): Promise<Company[]> => {
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
        const validated = CompanyArraySchema.parse(data);
        return validated;
    } catch (error) {
        console.error("Error fetching data summary:", error);
        throw error;
    }
};