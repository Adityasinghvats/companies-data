# Companies Data Dashboard

## 🚀 Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Adityasinghvats/companies-data.git
   cd companies-data
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Start the API server:**
   ```bash
   npm run server
   ```

---

## 🌐 API Endpoint

- **Endpoint:** `http://localhost:3000/data`
- **Response Body Schema:**

  ```json
  [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "established": 2020,
      "headquarters": "string",
      "employees": 100,
      "revenue": 50,
      "website": "https://example.com"
    }
    // ...more companies
  ]
  ```

---

## 🛠️ Main Components

- **Filter Component:**  
  Lets users filter companies by search term, type, established year, employees, and revenue. Filters are only applied when the "Apply" button is pressed.

- **Table Component:**  
  Uses [Material UI Table](https://mui.com/material-ui/react-table/) for displaying company data in a responsive, interactive table.

---

## 🧩 Technologies Used

- **Zod Validation:**  
  All API data is validated using [Zod](https://zod.dev/) schemas for type safety and runtime validation.

- **Custom Data Fetching Hook:**  
  Located in the `services` folder, this hook manages API requests and provides `loading`, `error`, `refetch`, and `data` states for robust data handling.

---

## 📦 Folder Structure Highlights

- `src/components/filters.tsx` – Filter UI and logic
- `src/components/Table.tsx` – Material UI Table for displaying data
- `src/schemas/company.schema.ts` – Zod schema for company data validation
- `src/services/useFetch.ts` – Custom hook for fetching and managing API data

---

## 📝 Notes

- Make sure both the dev server and API server are running for full functionality.
- The app will show loading and error states as appropriate.
- Filters are not applied automatically; use the "Apply" button to update the results.

---
## 🖥️ App Images
- Sort By Feature
<img width="1899" height="825" alt="Screenshot 2025-10-05 121358" src="https://github.com/user-attachments/assets/cd8b81c8-e662-4451-a747-23a52b40cca3" />
- Filter By Type
<img width="1898" height="824" alt="Screenshot 2025-10-05 121552" src="https://github.com/user-attachments/assets/c4681b7c-327e-4b4f-a4b8-02a703ca0265" />
--- 

**Enjoy exploring the Companies Data Dashboard!**
