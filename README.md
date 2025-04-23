# Property Management System

A comprehensive property management solution for landlords and property managers to manage properties, units, tenants, leases, and lease renewals.

## Features

### Dashboard
- Property overview with statistics
- Active lease count
- Property listings with unit details

### Property Management
- Add, edit, and view property details
- Manage multiple units within properties
- Track unit information (number, rent amount)

### Tenant Management
- Store tenant contact information (name, email, phone)
- Associate tenants with specific units

### Lease Renewal System
- Generate lease renewal notices
- Quebec-compliant rent increase form generation
- Multiple rent modification options:
  - New rent amount
  - Increase amount
  - Percentage increase
  - Tribunal-fixed percentage

### PDF Generation
- Automated PDF generation for lease renewals
- Support for fillable PDF templates
- Fallback to direct text rendering if template fields don't match
- Customizable PDF output with tenant and property information

## Technology Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- PDF-lib for PDF generation and manipulation

### Backend
- Node.js API
- Authentication system with JWT
- Property and user data storage

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- API server running (default: http://localhost:5002)

### Installation

1. Clone the repository
```
git clone [repository-url]
cd [repository-folder]
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the project root with:
```
VITE_API_URL=http://localhost:5002
```

4. Place PDF template
Ensure the Quebec rent increase template is available at:
```
public/assets/quebec-rent-increase-form.pdf
```

5. Start the development server
```
npm run dev
```

## Usage

1. Login using your credentials
2. From the Dashboard, view your properties
3. Click on a property to manage units
4. Use the Lease Renewal feature to generate rent increase notices
5. Fill in the required information and generate a PDF
6. Download and send the generated PDF to tenants

## PDF Generation Notes

The system can work with fillable PDF templates or generate PDFs from scratch:

- If using a template with form fields, ensure field names match common patterns
- The system will attempt to match field names in various formats
- If no fields are found or filled, the system will fall back to drawing text directly
- For best results, use template field names related to their content (e.g., "tenant_name", "rent_amount")


