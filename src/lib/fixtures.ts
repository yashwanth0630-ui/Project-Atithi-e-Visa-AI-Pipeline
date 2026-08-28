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

function getAvatarSvg(fixtureId: string): string {
  if (fixtureId.includes("sarah")) {
    return `
      <!-- Sarah Jenkins Avatar -->
      <defs>
        <clipPath id="photoClip-sarah">
          <rect x="40" y="115" width="165" height="215" rx="10" />
        </clipPath>
        <linearGradient id="photoBg-sarah" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#0369a1" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <rect x="40" y="115" width="165" height="215" rx="10" fill="url(#photoBg-sarah)" stroke="#38bdf8" stroke-width="2"/>
      <g clip-path="url(#photoClip-sarah)">
        <circle cx="122" cy="190" r="85" fill="#38bdf8" opacity="0.25"/>
        <!-- Torso / Dark Blue Suit -->
        <path d="M55 335 Q122 265 190 335 Z" fill="#0f172a"/>
        <path d="M92 335 L122 280 L152 335 Z" fill="#ffffff"/>
        <path d="M108 335 L122 295 L136 335 Z" fill="#0284c7"/>
        <!-- Neck -->
        <rect x="110" y="225" width="24" height="32" rx="4" fill="#fbcfe8"/>
        <!-- Head -->
        <ellipse cx="122" cy="188" rx="35" ry="42" fill="#fbcfe8"/>
        <!-- Hair -->
        <path d="M78 185 C74 125, 170 125, 166 185 C170 230, 160 265, 154 275 C148 240, 154 190, 148 175 C138 158, 106 158, 96 175 C90 190, 96 240, 90 275 C84 265, 74 230, 78 185 Z" fill="#78350f"/>
        <path d="M90 168 Q122 142 154 168 Q122 156 90 168 Z" fill="#92400e"/>
        <!-- Eyes & Brows -->
        <ellipse cx="108" cy="185" rx="4.5" ry="3" fill="#1e293b"/>
        <ellipse cx="136" cy="185" rx="4.5" ry="3" fill="#1e293b"/>
        <path d="M101 176 Q108 173 115 176" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M129 176 Q136 173 143 176" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Nose & Smile -->
        <path d="M122 186 L120 198 L124 198" stroke="#d97706" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M112 210 Q122 218 132 210" stroke="#be123c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Holographic Security Seal Badge -->
        <circle cx="165" cy="290" r="30" fill="rgba(15,23,42,0.6)" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="165" y="294" fill="#fbbf24" font-size="9" font-family="sans-serif" font-weight="900" text-anchor="middle">VERIFIED</text>
      </g>
    `;
  } else if (fixtureId.includes("alexander")) {
    return `
      <!-- Alexander Mueller Avatar -->
      <defs>
        <clipPath id="photoClip-alexander">
          <rect x="40" y="115" width="165" height="215" rx="10" />
        </clipPath>
        <linearGradient id="photoBg-alexander" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e40af" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#172554" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <rect x="40" y="115" width="165" height="215" rx="10" fill="url(#photoBg-alexander)" stroke="#60a5fa" stroke-width="2"/>
      <g clip-path="url(#photoClip-alexander)">
        <circle cx="122" cy="190" r="85" fill="#3b82f6" opacity="0.2"/>
        <path d="M55 335 Q122 260 190 335 Z" fill="#1e293b"/>
        <path d="M92 335 L122 275 L152 335 Z" fill="#ffffff"/>
        <path d="M116 290 L122 335 L128 290 Z" fill="#dc2626"/>
        <rect x="110" y="225" width="24" height="28" rx="4" fill="#fed7aa"/>
        <ellipse cx="122" cy="188" rx="36" ry="43" fill="#fed7aa"/>
        <!-- Short Blonde Hair -->
        <path d="M84 175 C84 125, 160 125, 160 175 C152 142, 92 142, 84 175 Z" fill="#b45309"/>
        <!-- Glasses -->
        <rect x="100" y="177" width="19" height="15" rx="3" fill="rgba(255,255,255,0.25)" stroke="#0f172a" stroke-width="2"/>
        <rect x="125" y="177" width="19" height="15" rx="3" fill="rgba(255,255,255,0.25)" stroke="#0f172a" stroke-width="2"/>
        <line x1="119" y1="184" x2="125" y2="184" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="109" cy="184" r="2.5" fill="#0f172a"/>
        <circle cx="134" cy="184" r="2.5" fill="#0f172a"/>
        <path d="M122 188 L120 200 L124 200" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M112 212 Q122 218 132 212" stroke="#9a3412" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="165" cy="290" r="30" fill="rgba(15,23,42,0.6)" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="165" y="294" fill="#60a5fa" font-size="9" font-family="sans-serif" font-weight="900" text-anchor="middle">VERIFIED</text>
      </g>
    `;
  } else if (fixtureId.includes("kenji")) {
    return `
      <!-- Kenji Sato Avatar -->
      <defs>
        <clipPath id="photoClip-kenji">
          <rect x="40" y="115" width="165" height="215" rx="10" />
        </clipPath>
        <linearGradient id="photoBg-kenji" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#059669" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#064e3b" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <rect x="40" y="115" width="165" height="215" rx="10" fill="url(#photoBg-kenji)" stroke="#34d399" stroke-width="2"/>
      <g clip-path="url(#photoClip-kenji)">
        <circle cx="122" cy="190" r="85" fill="#10b981" opacity="0.2"/>
        <path d="M55 335 Q122 260 190 335 Z" fill="#ffffff"/>
        <path d="M92 335 L122 275 L152 335 Z" fill="#0284c7"/>
        <path d="M98 290 Q122 340 146 290" stroke="#475569" stroke-width="3" fill="none"/>
        <rect x="110" y="225" width="24" height="28" rx="4" fill="#fed7aa"/>
        <ellipse cx="122" cy="188" rx="36" ry="43" fill="#fed7aa"/>
        <!-- Side-Part Black Hair -->
        <path d="M82 178 C82 122, 162 122, 162 178 C152 135, 92 135, 82 178 Z" fill="#0f172a"/>
        <ellipse cx="108" cy="184" rx="4.5" ry="2.5" fill="#0f172a"/>
        <ellipse cx="136" cy="184" rx="4.5" ry="2.5" fill="#0f172a"/>
        <path d="M101 176 Q108 172 115 176" stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M129 176 Q136 172 143 176" stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M122 186 L120 198 L124 198" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M112 211 Q122 218 132 211" stroke="#9a3412" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="165" cy="290" r="30" fill="rgba(15,23,42,0.6)" stroke="#34d399" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="165" y="294" fill="#34d399" font-size="9" font-family="sans-serif" font-weight="900" text-anchor="middle">VERIFIED</text>
      </g>
    `;
  } else {
    return `
      <!-- Eleanor Vance Avatar -->
      <defs>
        <clipPath id="photoClip-eleanor">
          <rect x="40" y="115" width="165" height="215" rx="10" />
        </clipPath>
        <linearGradient id="photoBg-eleanor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#4c1d95" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <rect x="40" y="115" width="165" height="215" rx="10" fill="url(#photoBg-eleanor)" stroke="#a78bfa" stroke-width="2"/>
      <g clip-path="url(#photoClip-eleanor)">
        <circle cx="122" cy="190" r="85" fill="#8b5cf6" opacity="0.2"/>
        <path d="M55 335 Q122 260 190 335 Z" fill="#1e1b4b"/>
        <path d="M92 335 L122 280 L152 335 Z" fill="#f8fafc"/>
        <rect x="110" y="225" width="24" height="30" rx="4" fill="#fce7f3"/>
        <ellipse cx="122" cy="188" rx="35" ry="42" fill="#fce7f3"/>
        <!-- Auburn Waves -->
        <path d="M76 182 C74 122, 168 122, 166 182 C170 230, 160 268, 154 278 C148 240, 156 190, 150 172 C138 155, 106 155, 94 172 C88 190, 96 240, 90 278 C84 268, 74 230, 76 182 Z" fill="#831843"/>
        <ellipse cx="108" cy="185" rx="4.5" ry="3" fill="#1e293b"/>
        <ellipse cx="136" cy="185" rx="4.5" ry="3" fill="#1e293b"/>
        <path d="M101 176 Q108 173 115 176" stroke="#831843" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M129 176 Q136 173 143 176" stroke="#831843" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M122 186 L120 198 L124 198" stroke="#9d174d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M112 210 Q122 218 132 210" stroke="#be123c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="165" cy="290" r="30" fill="rgba(15,23,42,0.6)" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="165" y="294" fill="#a78bfa" font-size="9" font-family="sans-serif" font-weight="900" text-anchor="middle">VERIFIED</text>
      </g>
    `;
  }
}

// Generate base64 SVG synthetic passport preview
function generateSyntheticPassportSvg(
  fixtureId: string,
  givenName: string,
  surname: string,
  passportNo: string,
  dob: string,
  nationality: string,
  gender: string,
  countryCode: string,
  countryTitle: string
): { svgDataUrl: string; mrzString: string } {
  const mrz1 = `P<${countryCode.slice(0, 3).toUpperCase()}${surname.toUpperCase()}<<${givenName.toUpperCase()}<<<<<<<<<<<<<<<<<<<`.padEnd(44, '<').slice(0, 44);
  const mrz2 = `${passportNo.toUpperCase()}<${countryCode.slice(0, 3).toUpperCase()}9001018${gender[0]}3001014<<<<<<<<<<<<<<02`.padEnd(44, '<').slice(0, 44);
  const rawMrz = `${mrz1}\n${mrz2}`;

  const avatarSvg = getAvatarSvg(fixtureId);

  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520" style="background:#070d18; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <defs>
      <!-- Background Passport Substrate Gradient -->
      <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="50%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0a0f1d"/>
      </linearGradient>

      <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fde047"/>
        <stop offset="50%" stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#b45309"/>
      </linearGradient>

      <linearGradient id="mrzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#020617"/>
        <stop offset="100%" stop-color="#0b1120"/>
      </linearGradient>

      <!-- Security Micro-Pattern (Guilloche Waves) -->
      <pattern id="securityWaves" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M0 30 Q15 0 30 30 T60 30" fill="none" stroke="rgba(56, 189, 248, 0.08)" stroke-width="1.5"/>
        <path d="M0 30 Q15 60 30 30 T60 30" fill="none" stroke="rgba(251, 191, 36, 0.08)" stroke-width="1.5"/>
        <circle cx="30" cy="30" r="1.5" fill="rgba(255, 255, 255, 0.08)"/>
      </pattern>
    </defs>
    
    <!-- Outer Card Frame & Shadow Container -->
    <rect x="2" y="2" width="796" height="516" rx="20" fill="url(#cardBgGrad)" stroke="#334155" stroke-width="3"/>
    <rect x="6" y="6" width="788" height="508" rx="16" fill="url(#securityWaves)"/>
    
    <!-- Top Warning / Synthetic Safeguard Banner -->
    <rect x="20" y="16" width="760" height="34" rx="8" fill="rgba(220, 38, 38, 0.2)" stroke="#ef4444" stroke-width="1.5"/>
    <text x="400" y="38" fill="#fecaca" font-size="12" font-weight="800" font-family="monospace" letter-spacing="1" text-anchor="middle">
      ⚠️ 100% SYNTHETIC SPECIMEN • HACKATHON EVALUATION ONLY • ZERO REAL PII
    </text>

    <!-- Header / Issuing State Bar -->
    <g transform="translate(40, 62)">
      <text x="0" y="20" fill="#f8fafc" font-size="18" font-weight="900" letter-spacing="2">
        ${countryTitle.toUpperCase()}
      </text>
      <text x="0" y="38" fill="#94a3b8" font-size="11" font-weight="700" letter-spacing="1.5">
        PASSPORT / PASSEPORT • TYPE P • CODE: ${countryCode.toUpperCase()}
      </text>

      <!-- Biometric e-Passport Chip Emblem -->
      <g transform="translate(680, 2)">
        <rect x="0" y="0" width="38" height="28" rx="5" fill="none" stroke="url(#goldSheen)" stroke-width="2.5"/>
        <circle cx="19" cy="14" r="6" fill="url(#goldSheen)"/>
        <line x1="0" y1="14" x2="38" y2="14" stroke="url(#goldSheen)" stroke-width="2"/>
      </g>
    </g>

    <!-- Divider Line -->
    <line x1="40" y1="110" x2="760" y2="110" stroke="#334155" stroke-width="1.5"/>

    <!-- Left Column: Portrait Avatar & Authority Stamp -->
    ${avatarSvg}
    <text x="122" y="348" fill="#64748b" font-size="9.5" font-weight="600" text-anchor="middle">
      PHOTO / PHOTOGRAPHIE (ICAO)
    </text>

    <!-- Right Column: High-Contrast Bio Fields -->
    <!-- Row 1: Names -->
    <g transform="translate(230, 125)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Surname / Nom</text>
      <text x="0" y="30" fill="#ffffff" font-size="17" font-weight="900" letter-spacing="0.5">${surname.toUpperCase()}</text>
    </g>

    <g transform="translate(510, 125)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Passport No. / No du passeport</text>
      <text x="0" y="30" fill="#38bdf8" font-size="18" font-weight="900" font-family="monospace">${passportNo.toUpperCase()}</text>
    </g>

    <!-- Row 2: Given Names & Nationality -->
    <g transform="translate(230, 178)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Given Names / Prénoms</text>
      <text x="0" y="30" fill="#ffffff" font-size="17" font-weight="900" letter-spacing="0.5">${givenName.toUpperCase()}</text>
    </g>

    <g transform="translate(510, 178)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Nationality / Nationalité</text>
      <text x="0" y="30" fill="#ffffff" font-size="15" font-weight="800">${nationality}</text>
    </g>

    <!-- Row 3: DOB & Sex -->
    <g transform="translate(230, 232)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Date of Birth / Date de naissance</text>
      <text x="0" y="30" fill="#ffffff" font-size="15" font-weight="800" font-family="monospace">${dob}</text>
    </g>

    <g transform="translate(510, 232)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Sex / Sexe</text>
      <text x="0" y="30" fill="#ffffff" font-size="15" font-weight="800">${gender}</text>
    </g>

    <!-- Row 4: Place of Issue & Expiry -->
    <g transform="translate(230, 286)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Authority / Autorité</text>
      <text x="0" y="28" fill="#cbd5e1" font-size="13" font-weight="700">OFFICIAL ISSUING OFFICE</text>
    </g>

    <g transform="translate(510, 286)">
      <text x="0" y="10" fill="#94a3b8" font-size="11" font-weight="700">Date of Expiry / Date d'expiration</text>
      <text x="0" y="28" fill="#34d399" font-size="15" font-weight="800" font-family="monospace">2034-12-31</text>
    </g>

    <!-- Holographic Watermark Coat of Arms Stamp -->
    <circle cx="710" cy="275" r="42" fill="none" stroke="rgba(251, 191, 36, 0.35)" stroke-width="2" stroke-dasharray="6 3"/>
    <text x="710" y="278" fill="rgba(251, 191, 36, 0.7)" font-size="10" font-weight="900" font-family="sans-serif" text-anchor="middle">SPECIMEN</text>

    <!-- Machine Readable Zone (MRZ Strip) -->
    <g transform="translate(20, 385)">
      <rect x="0" y="0" width="760" height="110" rx="12" fill="url(#mrzGrad)" stroke="#334155" stroke-width="2"/>
      <line x1="0" y1="2" x2="760" y2="2" stroke="#475569" stroke-width="1"/>
      <!-- MRZ Line 1 -->
      <text x="24" y="44" fill="#38bdf8" font-size="17" font-family="'Courier New', Courier, monospace" font-weight="bold" letter-spacing="4">
        ${mrz1}
      </text>
      <!-- MRZ Line 2 -->
      <text x="24" y="82" fill="#38bdf8" font-size="17" font-family="'Courier New', Courier, monospace" font-weight="bold" letter-spacing="4">
        ${mrz2}
      </text>
    </g>
  </svg>
  `;

  return {
    svgDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`,
    mrzString: rawMrz,
  };
}

const sarahSvg = generateSyntheticPassportSvg("sarah", "Sarah", "Jenkins", "K88492011", "1992-04-14", "United States of America", "Female", "USA", "United States of America");
const alexanderSvg = generateSyntheticPassportSvg("alexander", "Alexander", "Mueller", "C49982310", "1988-11-23", "Germany", "Male", "DEU", "Federal Republic of Germany");
const kenjiSvg = generateSyntheticPassportSvg("kenji", "Kenji", "Sato", "TR9028114", "1975-06-30", "Japan", "Male", "JPN", "Japan");
const eleanorSvg = generateSyntheticPassportSvg("eleanor", "Eleanor", "Vance", "GB5581902", "1985-02-19", "United Kingdom", "Female", "GBR", "United Kingdom");

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
