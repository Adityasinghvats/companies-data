import './App.css'
import { fetchData } from './services/api'
import useFetch from './services/useFetch'
import DataTable from './components/table';
import { useState } from 'react';
import type { FilterState } from './components/filters';
import Filters from './components/filters';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Company } from './schemas/companySchema';

function App() {
  const { data, error, loading, refetch } = useFetch(() => fetchData());
  const [sortBy, setSortBy] = useState("");
  const [draftFilters, setDraftFilters] = useState<FilterState>({
    searchTerm: "",
    type: "",
    establishedRange: [1950, 2025],
    employeesRange: [0, 500000],
    revenueRange: [0, 1000]
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    searchTerm: "",
    type: "",
    establishedRange: [1950, 2025],
    employeesRange: [0, 500000],
    revenueRange: [0, 1000]
  });
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setDraftFilters(prev => ({ ...prev, ...newFilters }));
  };
  const handleApplyFilters = () => {
    setAppliedFilters({ ...draftFilters });
  }

  const getFilteredData = () => {
    if (!data) {
      return;
    }

    const filtered = [...data].filter((item) => {
      const matchesSearch = !appliedFilters.searchTerm ||
        item.name.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase())

      // Type filter
      const matchesType = !appliedFilters.type ||
        item.type.toLowerCase() === appliedFilters.type.toLowerCase();

      // Established year range filter
      const matchesEstablished =
        item.established >= appliedFilters.establishedRange[0] &&
        item.established <= appliedFilters.establishedRange[1];

      // Employees range filter
      const matchesEmployees =
        item.employees >= appliedFilters.employeesRange[0] &&
        item.employees <= appliedFilters.employeesRange[1];

      // Revenue range filter
      const matchesRevenue =
        item.revenue >= appliedFilters.revenueRange[0] &&
        item.revenue <= appliedFilters.revenueRange[1];

      return matchesSearch && matchesType && matchesEstablished && matchesEmployees && matchesRevenue;
    })
    return filtered;
  }

  // filtered data on basis of sortBy value
  const sortCompanies = (companies: Company[]) => {
    return [...companies].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.established - a.established;
        case "oldest":
          return a.established - b.established;
        case "employeesAsc":
          return a.employees - b.employees;
        case "employeesDesc":
          return b.employees - a.employees;
        case "revenueAsc":
          return a.revenue - b.revenue;
        case "revenueDesc":
          return b.revenue - a.revenue;
        default:
          return 0;
      }
    });
  }
  const companies = sortCompanies(getFilteredData() || []);

  if (loading) return (
    <div className='p-8'>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span className="text-lg text-gray-700 font-semibold">Loading data...</span>
      </div>
    </div>
  )
  if (error) return (
    <div className='p-8'>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="text-lg text-red-600 font-semibold mb-4">Error loading data</span>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  )

  return (
    <div className='p-8'>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="border-2 border-gray-900 rounded-xl shadow-xl p-6 lg:col-span-3 hidden lg:block">
          <h3 className="text-lg font-bold mb-4">Filter Companies</h3>
          <Filters
            filters={draftFilters}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            onFiltersChange={updateFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleApplyFilters={handleApplyFilters}
          />
        </section>
        <section className="border-2 border-gray-900 rounded-xl shadow-xl p-6 lg:col-span-9">
          <h3 className="text-lg font-bold mb-4">Data Table</h3>
          {/* Sort By */}
          <div className='flex items-center justify-between mb-4'>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] lg:w-[200px] border-2 border-gray-200 h-10 lg:h-12 font-medium bg-gray-50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="employeesAsc">Employees: Low to High</SelectItem>
                <SelectItem value="employeesDesc">Employees: High to Low</SelectItem>
                <SelectItem value="revenueAsc">Revenue: Low to High</SelectItem>
                <SelectItem value="revenueDesc">Revenue: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DataTable data={companies || []} />
        </section>
      </div>
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Filters
          filters={draftFilters}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          onFiltersChange={updateFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleApplyFilters={handleApplyFilters}
        />
      </div>
    </div>
  )
}

export default App
