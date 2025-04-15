import mongoose, { Schema, Document } from "mongoose";
import { Company } from "../types";

export interface CompanyDocument extends Company, Document {}

const companySchema = new Schema<CompanyDocument>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,

            trim: true,
        },
        status: {
            type: String,

            trim: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        alternatives: {
            type: String,
            default: "",
        },
        origin: {
            type: String,
            default: "",
        },
        source: {
            type: String,
            default: "",
        },
        tags: {
            type: [String],
            default: [],
        },
        brands: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const CompanyModel = mongoose.model<CompanyDocument>("Company", companySchema);

export default CompanyModel;
