import express from "express";
import { getAllCompanies, getCompanyByCode, updateCompany, createCompanies } from "../controllers/companyController";
import validateRequest from "../middleware/validateRequest";
import authenticateToken from "../middleware/authMiddleware";
import { getCompanySchema, updateCompanySchema, createCompanySchema, createCompaniesSchema, paginationSchema } from "../schemas/companySchema";

const router = express.Router();

// Public routes
router.get("/", validateRequest(paginationSchema), getAllCompanies);

router.get("/:code", validateRequest(getCompanySchema), getCompanyByCode);

// Private routes that require authentication
router.patch("/:code", authenticateToken, validateRequest(updateCompanySchema), updateCompany);

router.post(
    "/",
    authenticateToken,
    (req, res, next) => {
        // Determine if it's a single or multiple companies based on the request body
        const validationSchema = Array.isArray(req.body) ? createCompaniesSchema : createCompanySchema;
        validateRequest(validationSchema)(req, res, next);
    },
    createCompanies
);

export default router;
