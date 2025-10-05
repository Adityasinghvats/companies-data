import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { type Company } from '../schemas/companySchema.ts';

const columns: GridColDef<Company>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 110,
        editable: true,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 200,
        editable: true,
    },
    {
        field: 'established',
        headerName: 'Established',
        width: 90,
        editable: true,
    },
    {
        field: 'headquarters',
        headerName: 'Headquarters',
        width: 150,
        editable: true,
    },
    {
        field: 'employees',
        headerName: 'Employees',
        width: 100,
        editable: true,
    },
    {
        field: 'revenue',
        headerName: 'Revenue(Billion $)',
        width: 150,
        editable: true,
    },
    {
        field: 'website',
        headerName: 'Website',
        width: 180,
        editable: true,
    },
];

interface DataTableProps {
    data: Company[];
}

export default function DataTable({ data }: DataTableProps) {
    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}