import { z } from 'zod'

export const CompanySchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    type: z.string().min(1),
    established: z.number().min(1800).max(2025),
    headquarters: z.string().min(1),
    employees: z.number().nonnegative(),
    revenue: z.number().nonnegative(),
    website: z.string().url()
})

export type Company = z.infer<typeof CompanySchema>
export const CompanyArraySchema = z.array(CompanySchema)