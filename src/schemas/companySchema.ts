import { z } from "zod";

// Schema for validating a single company
export const companySchema = z.object({
    code: z.string().min(1, "Code is required"),
    name: z.string().min(1, "Name is required"),
    type: z.string().min(1, "Type is required"),
    status: z.string().min(1, "Status is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image URL is required"),
    alternatives: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

// Schema for creating a single company
export const createCompanySchema = z.object({
    body: companySchema,
});

// Schema for creating multiple companies
export const createCompaniesSchema = z.object({
    body: z.array(companySchema),
});

// Schema for updating a company
export const updateCompanySchema = z.object({
    params: z.object({
        code: z.string().min(1, "Company code is required"),
    }),
    body: companySchema.partial(),
});

// Schema for getting a single company
export const getCompanySchema = z.object({
    params: z.object({
        code: z.string().min(1, "Company code is required"),
    }),
});

// Schema for pagination query
export const paginationSchema = z.object({
    query: z.object({
        page: z
            .string()
            .optional()
            .transform(val => (val ? parseInt(val, 10) : 1)),
        limit: z
            .string()
            .optional()
            .transform(val => (val ? parseInt(val, 10) : 10)),
    }),
});
