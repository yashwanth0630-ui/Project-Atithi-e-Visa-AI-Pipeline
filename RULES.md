# Hackathon Compliance & Safety Directives

## 1. Zero-Interference Policy
- **No Live Government Systems:** This application does not connect to, scrape, reverse-engineer, or query `indianvisaonline.gov.in` or any real government endpoint.
- **Independent Prototype:** This tool is an independent concept built for *Build What Moves India*. It does not claim official endorsement, partnership, or representation of the Government of India or the Ministry of External Affairs.

## 2. Data Safety & Privacy
- **Synthetic Data Only:** All demonstration inputs (passports, flight tickets, hotel reservations) use 100% synthetic, fictitious data.
- **No Real PII:** Never input or test with real government-issued identity documents, live credit/debit card numbers, or real biometric images.
- **Client-Side Sanitization:** Documents uploaded in the UI are converted to memory-only base64 buffers and processed ephemerally. No personal documents are stored to permanent databases or disk.

## 3. Submission Integrity
- **Evaluation Availability:** The deployment URL on Vercel is publicly accessible without login friction or API key requirements for evaluators.
- **Full Transparency:** Mocks, fallbacks, and synthetic layers are explicitly labeled in the UI and documentation.
