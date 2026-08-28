import { z } from "zod";

export const VisaTypeEnum = z.enum([
  "e-Tourist Visa (30 Days)",
  "e-Tourist Visa (1 Year)",
  "e-Business Visa",
  "e-Conference Visa",
  "e-Medical Visa",
]);

export type VisaType = z.infer<typeof VisaTypeEnum>;

export const EVisaExtractionSchema = z.object({
  traveler: z.object({
    given_name: z.string().describe("Given/First name(s) from passport bio page"),
    surname: z.string().describe("Surname/Last name from passport bio page"),
    passport_number: z.string().describe("Passport number from bio page or MRZ"),
    date_of_birth: z.string().describe("Date of birth in YYYY-MM-DD format"),
    nationality: z.string().describe("Full nationality name or country code (e.g. United States, Germany, Japan, United Kingdom)"),
    gender: z.enum(["Male", "Female", "Other"]).describe("Gender as specified on passport"),
  }),
  mrz_data: z.object({
    raw_mrz_string: z.string().describe("The exact 2-line machine readable zone string from the passport. Used for deterministic mathematical validation."),
  }),
  travel_details: z.object({
    port_of_arrival: z.string().describe("Airport or port of entry in India, e.g. Bengaluru (BLR), New Delhi (DEL), Mumbai (BOM), Goa (GOI)"),
    arrival_date: z.string().describe("Expected date of arrival in YYYY-MM-DD format"),
    purpose_of_travel: z.string().describe("Synthesized purpose of travel from ticket/itinerary"),
    visa_type: VisaTypeEnum.describe("Inferred Indian e-Visa category based on travel purpose and documents"),
  }),
  reference_in_india: z.object({
    name: z.string().describe("Name of the hotel, conference, or local host derived from the itinerary"),
    address: z.string().describe("Full address in India including State and District (mandatory for Indian immigration)"),
    phone: z.string().describe("Contact phone number of the Indian reference/hotel/host"),
  }).describe("Mandatory field for Indian e-Visa. Extracted from the hotel booking or conference itinerary."),
  document_quality: z.object({
    is_readable: z.boolean().describe("Whether the submitted documents are legible for identity verification"),
    confidence_score: z.number().min(0).max(1).describe("Overall confidence score between 0.0 and 1.0"),
    warnings: z.array(z.string()).describe("Quality notices (e.g., 'Ensure high resolution', 'Synthetic document detected')"),
  }),
});

export type EVisaExtractionData = z.infer<typeof EVisaExtractionSchema>;

export interface UploadedDocument {
  id: string;
  name: string;
  type: "passport" | "itinerary";
  dataUrl: string; // base64
  size: number;
  previewUrl?: string;
  dimensions?: { width: number; height: number };
  status: "idle" | "ready" | "error";
  qualityChecks?: {
    resolutionAdequate: boolean;
    aspectRatioStandard: boolean;
    brightnessNormal: boolean;
  };
}

