import { useCallback } from "react";
import { Button } from "./ui/button";
import { Filter, X } from "lucide-react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const types = [
    { value: "software", label: "Software" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "social", label: "Social" },
    { value: "e-commerce", label: "E-Commerce" },
    { value: "entertainment", label: "Entertainment" },
    { value: "hospitality", label: "Hospitality" },
    { value: "transportation", label: "Transportation" },
]
export interface FilterState {
    searchTerm: string;
    type: string;
    establishedRange: number[];
    employeesRange: number[];
    revenueRange: number[];
}
interface FilterProps {
    filters: FilterState;
    appliedFilters: FilterState;
    onFiltersChange: (newFilters: Partial<FilterState>) => void;
    setAppliedFilters: (filters: FilterState) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    handleApplyFilters: () => void;
}

export default function Filters({
    filters,
    appliedFilters,
    onFiltersChange,
    handleApplyFilters,
    setAppliedFilters
}: FilterProps) {
    const clearFilters = useCallback(() => {
        const defaultFilters: FilterState = {
            searchTerm: "",
            type: "",
            establishedRange: [1950, 2025],
            employeesRange: [0, 500000],
            revenueRange: [0, 1000]
        };
        onFiltersChange(defaultFilters);
        setAppliedFilters(defaultFilters);
    }, [onFiltersChange, setAppliedFilters]);
    const activeFiltersCount = [
        filters.searchTerm !== "",
        filters.type,
        filters.establishedRange[0] !== 1950 || filters.establishedRange[1] !== 2025 ? 'established' : null,
        filters.employeesRange[0] !== 0 || filters.employeesRange[1] !== 500000 ? 'employees' : null,
        filters.revenueRange[0] !== 0 || filters.revenueRange[1] !== 1000 ? 'revenue' : null
    ].filter(Boolean).length;

    const hasUnappliedChanges = JSON.stringify(filters) !== JSON.stringify(appliedFilters);
    const filterContent = (
        <>
            <div className="flex flex-col items-center space-x-2">
                <div className="w-full m-4">
                    <Label className="text-sm font-semibold mb-3 block text-gray-700">
                        Search Term
                    </Label>
                    <div className="px-2">
                        <Input type="text" value={filters.searchTerm} onChange={(e) => onFiltersChange({ searchTerm: e.target.value })} className="w-full" />
                    </div>
                </div>
                <div className="w-full m-4">
                    <h4 className="text-sm font-semibold mb-3 block text-gray-700">Type</h4>
                    <Select value={filters.type} onValueChange={(value) => onFiltersChange({ type: value })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            {types.map((type) => (
                                <SelectItem
                                    key={type.value}
                                    value={type.value}
                                >
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full m-4">
                    <Label className="text-sm font-semibold mb-3 block text-gray-700">
                        Year Range
                    </Label>
                    <div className="px-2">
                        <Slider
                            value={filters.establishedRange}
                            onValueChange={(value: number[]) => onFiltersChange({ establishedRange: value })}
                            min={1950}
                            max={2025}
                            step={2}
                            className="mb-4"
                        />
                        <div className="flex justify-between">
                            <Badge
                                variant="outline"
                                className="bg-gradient-cool-light text-gradient-cool font-medium"
                            >
                                {filters.establishedRange[0].toLocaleString()}
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-gradient-cool-light text-gradient-cool font-medium"
                            >
                                {filters.establishedRange[1].toLocaleString()}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="w-full m-4">
                    <Label className="text-sm font-semibold mb-3 block text-gray-700">
                        Revenue Range
                    </Label>
                    <div className="px-2">
                        <Slider
                            value={filters.revenueRange}
                            onValueChange={(value: number[]) => onFiltersChange({ revenueRange: value })}
                            min={0}
                            max={1000}
                            step={10}
                            className="mb-4"
                        />
                        <div className="flex justify-between">
                            <Badge
                                variant="outline"
                                className="bg-gradient-cool-light text-gradient-cool font-medium"
                            >
                                ${filters.revenueRange[0].toLocaleString()}
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-gradient-cool-light text-gradient-cool font-medium"
                            >
                                ${filters.revenueRange[1].toLocaleString()}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="w-full m-4">
                    <Label className="text-sm font-semibold mb-3 block text-gray-700">
                        Employees Range
                    </Label>
                    <div className="px-2">
                        <Slider
                            value={filters.employeesRange}
                            onValueChange={(value: number[]) => onFiltersChange({ employeesRange: value })}
                            min={0}
                            max={500000}
                            step={1000}
                            className="mb-4"
                        />
                        <div className="flex justify-between">
                            <Badge
                                variant="outline"
                                className="bg-gradient-cool-light text-gradient-cool font-medium"
                            >
                                {filters.employeesRange[0].toLocaleString()}
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-gradient-cool-light text-gradient-cool font-medium"
                            >
                                {filters.employeesRange[1].toLocaleString()}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-8 w-full gap-4">
                {activeFiltersCount > 0 && (
                    <Button
                        size="sm"
                        onClick={clearFilters}
                        disabled={!Object.values(appliedFilters).some(Boolean)}
                        className="font-medium text-gray-100 hover:bg-primary hover:text-gray-100"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Clear ({activeFiltersCount})

                    </Button>

                )}
                <Button
                    onClick={handleApplyFilters}
                    disabled={!hasUnappliedChanges}
                    className="font-medium text-gray-100 hover:bg-primary hover:text-gray-100"
                >
                    Apply Filters
                </Button>
            </div>
        </>
    )
    return (
        <>
            <div className="w-full gap-4 mb-6 rounded-lg p-4 hidden lg:block">
                {filterContent}
            </div>
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size="lg"
                            className="bg-gradient-cool text-white shadow-2xl hover:opacity-90 rounded-full h-14 w-14 p-0 animate-float"
                        >
                            <Filter className="h-6 w-6" />
                            {activeFiltersCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto ">
                        <SheetHeader>
                            <SheetTitle className="text-xl font-bold text-gradient-cool">
                                Filter Companies
                            </SheetTitle>
                        </SheetHeader>
                        <div className="m-4">{filterContent}</div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button>Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}