# OpenAI Integration Specification

## 1. Core Model & Features
- **Model:** `gpt-4o-2024-08-06` (or `gpt-4o`)
- **Key Capability:** OpenAI Structured Outputs (`openai.beta.chat.completions.parse`) with Zod schema resolution.
- **Serverless Resilience:** `export const maxDuration = 60;` to avoid Vercel 10s timeout during intensive multimodal vision parsing.

## 2. Deep Domain Prompt & Schema Contract
```typescript
import { z } from "zod";

export const EVisaExtractionSchema = z.object({
  traveler: z.object({
    given_name: z.string().describe("Given/First name from passport bio page"),
    surname: z.string().describe("Surname/Last name from passport bio page"),
    passport_number: z.string().describe("Passport number from bio page or MRZ"),
    date_of_birth: z.string().describe("Date of birth in YYYY-MM-DD format"),
    nationality: z.string().describe("Country code or full nationality name"),
    gender: z.enum(["Male", "Female", "Other"]),
  }),
  mrz_data: z.object({
    raw_mrz_string: z.string().describe("The exact 2-line machine readable zone string from the passport. Used for deterministic mathematical validation."),
  }),
  travel_details: z.object({
    port_of_arrival: z.string().describe("Airport or port of arrival in India"),
    arrival_date: z.string().describe("Expected date of entry in YYYY-MM-DD format"),
    purpose_of_travel: z.string().describe("Extracted context of travel from ticket/itinerary"),
    visa_type: z.enum([
      "e-Tourist Visa (30 Days)",
      "e-Tourist Visa (1 Year)",
      "e-Business Visa",
      "e-Conference Visa",
      "e-Medical Visa"
    ]).describe("Inferred correct visa category according to Indian immigration guidelines"),
  }),
  reference_in_india: z.object({
    name: z.string().describe("Name of the hotel, conference, or local host derived from the itinerary"),
    address: z.string().describe("Full address in India including State and District"),
    phone: z.string().describe("Phone number of the Indian reference"),
  }).describe("Mandatory field for Indian e-Visa. Must be extracted from the hotel booking or conference itinerary."),
  document_quality: z.object({
    is_readable: z.boolean().describe("Whether document text and MRZ are legible"),
    confidence_score: z.number().min(0).max(1).describe("Confidence score between 0.0 and 1.0"),
    warnings: z.array(z.string()).describe("Any quality warnings"),
  }),
});
```

## 3. Dual-Pillar OpenAI Strategy
```
                       ┌───────────────────────────────┐
                       │    OpenAI Utilization Plan    │
                       └───────────────┬───────────────┘
                                       │
         ┌─────────────────────────────┴─────────────────────────────┐
         ▼                                                           ▼
┌───────────────────────────────┐                       ┌───────────────────────────────┐
│     Runtime AI Pipeline       │                       │   Codex / Dev Acceleration    │
├───────────────────────────────┤                       ├───────────────────────────────┤
│ 1. Multimodal OCR (Vision)    │                       │ 1. Synthetic Data Generation  │
│ 2. Intent Classification      │                       │ 2. Schema-to-UI Scaffolding   │
│ 3. Deep Schema & MRZ Parity   │                       │ 3. Automated Test Suites      │
│ 4. Structured Output Contract │                       │ 4. Timeout & Payload Guards   │
└───────────────────────────────┘                       └───────────────────────────────┘
```

### Runtime AI Pipeline
1. **Multimodal Identity Extraction (`gpt-4o` Vision):** Evaluates raw visual bio-pages of synthetic/uploaded passports, extracting names, dates, passport numbers, and raw 2-line MRZ strings into clean types.
2. **Deep Indian Immigration Domain Solving:** Extracts the mandatory **Reference in India** (Hotel/Host name, district, state, phone) directly from messy unstructured travel itineraries.
3. **Semantic Category Inference:** Automatically maps travel intent to the exact Indian e-Visa class without confusing the citizen with 15+ sub-categories.
4. **Structured Outputs:** Uses `zodResponseFormat` for zero-hallucination, mathematically guaranteed JSON schemas.

### Codex / Dev Acceleration
- **Synthetic Fixture Generation:** Generates mock traveler records with realistic MRZ parity and Indian hotel references for edge-case testing.
- **Client Canvas Pre-Compression Guard:** Scales uploaded images to max 1200px to ensure transmissions stay far below the Vercel 4.5MB serverless limit.
