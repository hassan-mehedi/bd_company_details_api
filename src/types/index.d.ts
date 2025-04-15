import { Request } from "express";

export interface Company {
    code: string;
    name: string;
    type: string;
    status: string;
    description: string;
    image: string;
    alternatives: string[];
    origin: string;
    source: string;
    tags: string[];
    brands: string[];
}

export interface ExtendedRequest extends Request {
    isAuthenticated?: boolean;
}
