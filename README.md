# Company Profile API

This is a RESTful API for managing company profiles built with Node.js, Express, MongoDB, TypeScript, and Zod validation.

## Features

-   CRUD operations for company data
-   Data validation using Zod
-   Authentication using token-based auth
-   TypeScript for type safety
-   MongoDB with Mongoose for data storage

## Requirements

-   Node.js 16+
-   MongoDB

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/company_profile
API_TOKEN=your_secret_api_token_here
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Public Routes

-   `GET /api/companies` - Get all companies with pagination
    -   Query parameters: `page`, `limit`
-   `GET /api/companies/:code` - Get a single company by code

### Private Routes (Require Authorization)

For private routes, include the API token in the Authorization header:

```
Authorization: Bearer your_secret_api_token_here
```

-   `PATCH /api/companies/:code` - Update a company
-   `POST /api/companies` - Create one or multiple companies

## Request/Response Examples

### Get Companies (with pagination)

```
GET /api/companies?page=1&limit=10
```

### Get Single Company

```
GET /api/companies/ABC123
```

### Update Company

```
PATCH /api/companies/ABC123
Content-Type: application/json
Authorization: Bearer your_secret_api_token_here

{
  "name": "Updated Company Name",
  "status": "active"
}
```

### Create Single Company

```
POST /api/companies
Content-Type: application/json
Authorization: Bearer your_secret_api_token_here

{
  "code": "ABC123",
  "name": "Test Company",
  "type": "Software",
  "status": "active",
  "description": "This is a test company",
  "image": "https://example.com/image.jpg",
  "alternatives": "Alternative solutions",
  "tags": "software, tech, nodejs"
}
```

### Create Multiple Companies

```
POST /api/companies
Content-Type: application/json
Authorization: Bearer your_secret_api_token_here

[
  {
    "code": "ABC123",
    "name": "Company 1",
    "type": "Software",
    "status": "active",
    "description": "This is company 1",
    "image": "https://example.com/image1.jpg",
    "alternatives": "Alternative solutions 1",
    "tags": "software, tech"
  },
  {
    "code": "DEF456",
    "name": "Company 2",
    "type": "Hardware",
    "status": "inactive",
    "description": "This is company 2",
    "image": "https://example.com/image2.jpg",
    "alternatives": "Alternative solutions 2",
    "tags": "hardware, tech"
  }
]
```
