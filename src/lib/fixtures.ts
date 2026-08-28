import { EVisaExtractionData } from "./schema";

export interface SyntheticFixture {
  id: string;
  name: string;
  badge: string;
  expectedVisa: string;
  summary: string;
  passportDataUrl: string;
  itineraryText: string;
  expectedData: EVisaExtractionData;
}

// Generate base64 SVG synthetic passport preview
function generateSyntheticPassportSvg(
  givenName: string,
  surname: string,
  passportNo: string,
  dob: string,
  nationality: string,
  gender: string,
  countryCode: string
): { svgDataUrl: string; mrzString: string } {
  const mrz1 = `P<${countryCode.slice(0, 3).toUpperCase()}${surname.toUpperCase()}<<${givenName.toUpperCase()}<<<<<<<<<<<<<<<<<<<`.padEnd(44, '<').slice(0, 44);
  const mrz2 = `${passportNo.toUpperCase()}<${countryCode.slice(0, 3).toUpperCase()}9001018${gender[0]}3001014<<<<<<<<<<<<<<02`.padEnd(44, '<').slice(0, 44);
  const rawMrz = `${mrz1}\n${mrz2}`;

  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="600" height="380">
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
      <pattern id="guilloche" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 20 Q10 0 20 20 T40 20" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1.5"/>
        <path d="M0 20 Q10 40 20 20 T40 20" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1.5"/>
      </pattern>
    </defs>
    
    <!-- Background Card -->
    <rect width="600" height="380" rx="16" fill="url(#cardGrad)" stroke="#334155" stroke-width="2"/>
    <rect width="600" height="380" rx="16" fill="url(#guilloche)"/>
    
    <!-- Watermark Badge -->
    <rect x="24" y="20" width="552" height="36" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="1"/>
    <text x="300" y="43" fill="#fca5a5" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">
      ⚠️ 100% SYNTHETIC SPECIMEN • FOR HACKATHON EVALUATION ONLY • NO REAL PII
    </text>

    <!-- Header info -->
    <text x="30" y="80" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="600" letter-spacing="2">PASSPORT / PASSEPORT</text>
    <text x="470" y="80" fill="#fbbf24" font-size="13" font-family="sans-serif" font-weight="bold">${countryCode.toUpperCase()}</text>

    <!-- Photo Mock -->
    <rect x="30" y="96" width="130" height="160" rx="8" fill="#334155" stroke="#475569" stroke-width="2"/>
    <circle cx="95" cy="150" r="32" fill="#64748b"/>
    <path d="M45 240 C45 195, 145 195, 145 240 Z" fill="#64748b"/>
    <rect x="40" y="235" width="110" height="15" rx="4" fill="rgba(15,23,42,0.8)"/>
    <text x="95" y="246" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">SPECIMEN</text>

    <!-- Bio Fields -->
    <text x="180" y="112" fill="#64748b" font-size="10" font-family="sans-serif">Surname / Nom</text>
    <text x="180" y="130" fill="#f8fafc" font-size="14" font-family="sans-serif" font-weight="bold">${surname.toUpperCase()}</text>

    <text x="180" y="152" fill="#64748b" font-size="10" font-family="sans-serif">Given Names / Prénoms</text>
    <text x="180" y="170" fill="#f8fafc" font-size="14" font-family="sans-serif" font-weight="bold">${givenName.toUpperCase()}</text>

    <text x="180" y="192" fill="#64748b" font-size="10" font-family="sans-serif">Nationality / Nationalité</text>
    <text x="180" y="208" fill="#f8fafc" font-size="13" font-family="sans-serif" font-weight="600">${nationality}</text>

    <text x="400" y="112" fill="#64748b" font-size="10" font-family="sans-serif">Passport No. / No du passeport</text>
    <text x="400" y="130" fill="#38bdf8" font-size="14" font-family="monospace" font-weight="bold">${passportNo}</text>

    <text x="400" y="152" fill="#64748b" font-size="10" font-family="sans-serif">Date of Birth / Date de naissance</text>
    <text x="400" y="170" fill="#f8fafc" font-size="13" font-family="sans-serif" font-weight="600">${dob}</text>

    <text x="400" y="192" fill="#64748b" font-size="10" font-family="sans-serif">Sex / Sexe</text>
    <text x="400" y="208" fill="#f8fafc" font-size="13" font-family="sans-serif" font-weight="600">${gender}</text>

    <!-- Chip Emblem -->
    <rect x="520" y="180" width="36" height="28" rx="4" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
    <circle cx="538" cy="194" r="6" fill="url(#goldGrad)"/>
    <line x1="520" y1="194" x2="556" y2="194" stroke="url(#goldGrad)" stroke-width="1.5"/>

    <!-- MRZ Machine Readable Zone -->
    <rect x="20" y="280" width="560" height="80" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#1e293b"/>
    <text x="35" y="312" fill="#38bdf8" font-size="13" font-family="monospace" letter-spacing="3">${mrz1}</text>
    <text x="35" y="342" fill="#38bdf8" font-size="13" font-family="monospace" letter-spacing="3">${mrz2}</text>
  </svg>
  `;

  return {
    svgDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`,
    mrzString: rawMrz,
  };
}

const sarahSvg = generateSyntheticPassportSvg("Sarah", "Jenkins", "K88492011", "1992-04-14", "United States of America", "Female", "USA");
const alexanderSvg = generateSyntheticPassportSvg("Alexander", "Mueller", "C49982310", "1988-11-23", "Germany", "Male", "DEU");
const kenjiSvg = generateSyntheticPassportSvg("Kenji", "Sato", "TR9028114", "1975-06-30", "Japan", "Male", "JPN");
const eleanorSvg = generateSyntheticPassportSvg("Eleanor", "Vance", "GB5581902", "1985-02-19", "United Kingdom", "Female", "GBR");

export const SYNTHETIC_FIXTURES: SyntheticFixture[] = [
  {
    id: "sarah-conference",
    name: "Sarah Jenkins",
    badge: "Tech Summit / Conference",
    expectedVisa: "e-Conference Visa",
    summary: "Invited speaker at Global FinTech Summit in Bengaluru. Reference: The Leela Palace Bengaluru.",
    passportDataUrl: sarahSvg.svgDataUrl,
    itineraryText: `AIR INDIA FLIGHT CONFIRMATION
Flight: AI-174 (San Francisco SFO -> Bengaluru BLR)
Arrival Date: 2026-10-12
Passenger: MS SARAH JENKINS
Event Invitation: Official Keynote Speaker at Global FinTech & AI Summit 2026, Bangalore International Exhibition Centre (BIEC), Bengaluru, Karnataka, India.
Hotel & Host Reference: The Leela Palace, 23 HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008, India. Phone: +91 80 2521 1234.`,
    expectedData: {
      traveler: {
        given_name: "Sarah",
        surname: "Jenkins",
        passport_number: "K88492011",
        date_of_birth: "1992-04-14",
        nationality: "United States of America",
        gender: "Female",
      },
      mrz_data: {
        raw_mrz_string: sarahSvg.mrzString,
      },
      travel_details: {
        port_of_arrival: "Bengaluru (BLR)",
        arrival_date: "2026-10-12",
        purpose_of_travel: "Keynote Speaker at Global FinTech & AI Summit 2026 in Bengaluru",
        visa_type: "e-Conference Visa",
      },
      reference_in_india: {
        name: "The Leela Palace Bengaluru (Global FinTech Summit)",
        address: "23 HAL Old Airport Rd, Kodihalli, Bengaluru District, Karnataka 560008",
        phone: "+91 80 2521 1234",
      },
      document_quality: {
        is_readable: true,
        confidence_score: 0.98,
        warnings: ["Synthetic passport verified via MRZ parity check", "Reference in India validated"],
      },
    },
  },
  {
    id: "alexander-tourist",
    name: "Alexander Mueller",
    badge: "Goa & Heritage Tourism",
    expectedVisa: "e-Tourist Visa (30 Days)",
    summary: "Solo traveler exploring heritage architecture in Goa. Reference: Taj Fort Aguada Resort Goa.",
    passportDataUrl: alexanderSvg.svgDataUrl,
    itineraryText: `LUFTHANSA / VISTARA E-TICKET
Booking Reference: LH-882910
Traveler: MR ALEXANDER MUELLER
Route: Frankfurt (FRA) -> Goa International Airport (GOI / Dabolim)
Scheduled Arrival: 2026-11-05
Travel Purpose: 3-week leisure vacation, coastal photography, and cultural heritage sightseeing in Old Goa.
Hotel & Accommodation Reference: Taj Fort Aguada Resort & Spa, Sinquerim, Candolim, North Goa District, Goa 403515. Phone: +91 832 664 5858.`,
    expectedData: {
      traveler: {
        given_name: "Alexander",
        surname: "Mueller",
        passport_number: "C49982310",
        date_of_birth: "1988-11-23",
        nationality: "Germany",
        gender: "Male",
      },
      mrz_data: {
        raw_mrz_string: alexanderSvg.mrzString,
      },
      travel_details: {
        port_of_arrival: "Goa (GOI)",
        arrival_date: "2026-11-05",
        purpose_of_travel: "Leisure vacation, coastal photography, and cultural heritage sightseeing in Goa",
        visa_type: "e-Tourist Visa (30 Days)",
      },
      reference_in_india: {
        name: "Taj Fort Aguada Resort & Spa",
        address: "Sinquerim, Candolim, North Goa District, Goa 403515",
        phone: "+91 832 664 5858",
      },
      document_quality: {
        is_readable: true,
        confidence_score: 0.96,
        warnings: ["Reference in India validated"],
      },
    },
  },
  {
    id: "kenji-medical",
    name: "Dr. Kenji Sato",
    badge: "Medical Consultation",
    expectedVisa: "e-Medical Visa",
    summary: "Consultation & orthopedic procedure at Apollo Hospital Navi Mumbai. Ref: Apollo Specialty.",
    passportDataUrl: kenjiSvg.svgDataUrl,
    itineraryText: `ALL NIPPON AIRWAYS (ANA) ITINERARY
Passenger: DR KENJI SATO
Flight: NH-829 (Tokyo Haneda HND -> Mumbai BOM Chhatrapati Shivaji)
Arrival Date: 2026-09-18
Medical Purpose: Medical consultation and orthopedic surgery procedure at Apollo Specialty Hospital. Medical invitation Ref: APO-MUM-2026-9912.
Hospital Reference: Apollo Hospitals, Plot # 13, Off Uran Road, Parsik Hill Rd, Sector 23, CBD Belapur, Navi Mumbai, Thane District, Maharashtra 400614. Phone: +91 22 3350 3350.`,
    expectedData: {
      traveler: {
        given_name: "Kenji",
        surname: "Sato",
        passport_number: "TR9028114",
        date_of_birth: "1975-06-30",
        nationality: "Japan",
        gender: "Male",
      },
      mrz_data: {
        raw_mrz_string: kenjiSvg.mrzString,
      },
      travel_details: {
        port_of_arrival: "Mumbai (BOM)",
        arrival_date: "2026-09-18",
        purpose_of_travel: "Medical consultation and orthopedic procedure at Apollo Specialty Hospital Mumbai",
        visa_type: "e-Medical Visa",
      },
      reference_in_india: {
        name: "Apollo Hospitals Navi Mumbai (Dr. Diagnostic Wing)",
        address: "Plot # 13, Sector 23, CBD Belapur, Navi Mumbai, Thane District, Maharashtra 400614",
        phone: "+91 22 3350 3350",
      },
      document_quality: {
        is_readable: true,
        confidence_score: 0.99,
        warnings: ["Hospital invitation reference verified", "Reference in India validated"],
      },
    },
  },
  {
    id: "eleanor-business",
    name: "Eleanor Vance",
    badge: "Corporate & Tech Expansion",
    expectedVisa: "e-Business Visa",
    summary: "Executive attending B2B cloud agreements in New Delhi. Reference: The Oberoi New Delhi.",
    passportDataUrl: eleanorSvg.svgDataUrl,
    itineraryText: `BRITISH AIRWAYS E-TICKET RECEIPT
Passenger: MS ELEANOR VANCE
Flight: BA-143 (London Heathrow LHR -> New Delhi DEL Indira Gandhi International)
Arrival Date: 2026-10-01
Business Purpose: Establishing B2B cloud infrastructure agreements and vendor meetings with Indian corporate partners in Cyber City, Gurugram and New Delhi.
Hotel Reference: The Oberoi, Dr Zakir Hussain Marg, Delhi Golf Club, Golf Links, New Delhi District, Delhi 110003. Phone: +91 11 2436 3030.`,
    expectedData: {
      traveler: {
        given_name: "Eleanor",
        surname: "Vance",
        passport_number: "GB5581902",
        date_of_birth: "1985-02-19",
        nationality: "United Kingdom",
        gender: "Female",
      },
      mrz_data: {
        raw_mrz_string: eleanorSvg.mrzString,
      },
      travel_details: {
        port_of_arrival: "New Delhi (DEL)",
        arrival_date: "2026-10-01",
        purpose_of_travel: "B2B cloud infrastructure agreements and vendor meetings with Indian corporate partners",
        visa_type: "e-Business Visa",
      },
      reference_in_india: {
        name: "The Oberoi New Delhi (Enterprise Corporate Desk)",
        address: "Dr Zakir Hussain Marg, Golf Links, New Delhi District, Delhi 110003",
        phone: "+91 11 2436 3030",
      },
      document_quality: {
        is_readable: true,
        confidence_score: 0.97,
        warnings: ["Reference in India validated"],
      },
    },
  },
];
