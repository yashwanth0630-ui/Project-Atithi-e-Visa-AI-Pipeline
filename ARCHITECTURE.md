# System Architecture & Data Flow

## System Overview
Project Atithi replaces the multi-page manual government form with an **Intent-to-Action Multimodal Pipeline**. The user drops raw travel documents, and the system extracts, validates, classifies, and formats the data into a strict government-ready JSON schema.

```
┌────────────────────────────────────────────────────────┐
│                   Citizen Interface                    │
│   (Next.js Mobile-First UI / Camera / Drag & Drop)     │
└───────────────┬────────────────────────┬───────────────┘
                │ Passport Base64        │ Itinerary Text/PDF
                ▼                        ▼
┌────────────────────────────────────────────────────────┐
│             Next.js Edge / API Route Layer             │
│                (/api/parse-documents)                  │
└──────────────────────────┬─────────────────────────────┘
                           │ Strict System Prompt +
                           │ Zod Schema Enforcement
                           ▼
┌────────────────────────────────────────────────────────┐
│               OpenAI Multimodal Engine                 │
│                 (GPT-4o Vision API)                    │
│  - OCR & Identity Extraction                           │
│  - Semantic Travel Purpose Classification              │
│  - Auto-Selection of Visa Class (Tourist/Biz/Conf)     │
└──────────────────────────┬─────────────────────────────┘
                           │ Validated Structured JSON
                           ▼
┌────────────────────────────────────────────────────────┐
│           Client-Side Validation & Review Card         │
│  - Dimension Normalization & Background Validator      │
│  - Editable Fields with Confidence Highlighting        │
│  - Instant Synthetic ETA (PDF) Generation              │
└────────────────────────────────────────────────────────┘
```

## Resilience & Low-Bandwidth Optimizations
1. **Local State Persistence:** All parsed form data syncs to `localStorage` in real time to prevent data loss on network drops.
2. **Payload Compression:** Uploaded images are pre-compressed and scaled on the client canvas before transmission to the parsing endpoint.
3. **Structured Fallback:** If image parsing returns low-confidence flags, the UI smoothly falls back to editable text inputs without throwing unhandled exceptions.
