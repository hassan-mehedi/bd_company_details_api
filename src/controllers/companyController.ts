import { Request, Response } from "express";
import CompanyModel from "../models/companyModel";

// Get all companies with pagination
export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const companies = await CompanyModel.find().skip(skip).limit(limit);

        const totalCompanies = await CompanyModel.countDocuments();
        const totalPages = Math.ceil(totalCompanies / limit);

        return res.status(200).json({
            status: "success",
            data: {
                companies,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: totalCompanies,
                    itemsPerPage: limit,
                },
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message || "Failed to retrieve companies",
        });
    }
};

// Get a single company by code
export const getCompanyByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const company = await CompanyModel.findOne({ code });

        if (!company) {
            return res.status(404).json({
                status: "error",
                message: `Company with code ${code} not found`,
            });
        }

        return res.status(200).json({
            status: "success",
            data: { company },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message || "Failed to retrieve company",
        });
    }
};

// Update a company by code
export const updateCompany = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const updateData = req.body;

        const company = await CompanyModel.findOneAndUpdate({ code }, updateData, { new: true, runValidators: true });

        if (!company) {
            return res.status(404).json({
                status: "error",
                message: `Company with code ${code} not found`,
            });
        }

        return res.status(200).json({
            status: "success",
            data: { company },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message || "Failed to update company",
        });
    }
};

// Create one or multiple companies
export const createCompanies = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const isArray = Array.isArray(data);

        // If data is an array, create multiple companies
        if (isArray) {
            // Check for duplicate codes
            const codes = data.map(company => company.code);
            const existingCompanies = await CompanyModel.find({ code: { $in: codes } });

            if (existingCompanies.length > 0) {
                const existingCodes = existingCompanies.map(company => company.code);
                return res.status(400).json({
                    status: "error",
                    message: `Companies with codes [${existingCodes.join(", ")}] already exist`,
                });
            }

            const companies = await CompanyModel.insertMany(data);

            return res.status(201).json({
                status: "success",
                data: { companies },
            });
        }
        // Otherwise, create a single company
        else {
            // Check if company with this code already exists
            const existingCompany = await CompanyModel.findOne({ code: data.code });

            if (existingCompany) {
                return res.status(400).json({
                    status: "error",
                    message: `Company with code ${data.code} already exists`,
                });
            }

            const company = await CompanyModel.create(data);

            return res.status(201).json({
                status: "success",
                data: { company },
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message || "Failed to create company",
        });
    }
};
