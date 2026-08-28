/**
 * ICAO Doc 9303 Machine Readable Zone (MRZ) Checksum Validator
 * Implements deterministic Modulus 10 calculation with 7-3-1 weighting.
 */

export interface MrzValidationResult {
  isValid: boolean;
  passportNumberValid: boolean;
  dobValid: boolean;
  expiryValid: boolean;
  overallChecksumValid: boolean;
  parsedFields: {
    documentType?: string;
    issuingCountry?: string;
    surname?: string;
    givenNames?: string;
    passportNumber?: string;
    nationality?: string;
    dob?: string;
    sex?: string;
    expirationDate?: string;
  };
}

const MRZ_WEIGHTS = [7, 3, 1];

function getCharValue(char: string): number {
  if (char >= "0" && char <= "9") {
    return parseInt(char, 10);
  }
  if (char >= "A" && char <= "Z") {
    return char.charCodeAt(0) - 55; // A = 10, B = 11, etc.
  }
  if (char === "<") {
    return 0;
  }
  return 0;
}

export function calculateIcaoChecksum(input: string): number {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const charVal = getCharValue(input[i].toUpperCase());
    const weight = MRZ_WEIGHTS[i % 3];
    sum += charVal * weight;
  }
  return sum % 10;
}

export function validateIcaoMrz(rawMrz: string): MrzValidationResult {
  const lines = rawMrz
    .trim()
    .split("\n")
    .map((l) => l.trim().replace(/\r/g, ""));

  if (lines.length < 2 || lines[0].length < 30 || lines[1].length < 30) {
    return {
      isValid: false,
      passportNumberValid: false,
      dobValid: false,
      expiryValid: false,
      overallChecksumValid: false,
      parsedFields: {},
    };
  }

  const line1 = lines[0];
  const line2 = lines[1];

  // Line 1 extraction (Type 3 / TD3 Passport standard)
  const docType = line1.substring(0, 2).replace(/</g, "");
  const issuingCountry = line1.substring(2, 5).replace(/</g, "");
  const nameParts = line1.substring(5).split("<<");
  const surname = nameParts[0]?.replace(/</g, " ").trim() || "";
  const givenNames = nameParts[1]?.replace(/</g, " ").trim() || "";

  // Line 2 extraction
  const passportNumber = line2.substring(0, 9).replace(/</g, "");
  const passportCheckDigit = line2[9];
  const expectedPassCheck = calculateIcaoChecksum(line2.substring(0, 9)).toString();
  const passportNumberValid = passportCheckDigit === expectedPassCheck;

  const nationality = line2.substring(10, 13).replace(/</g, "");
  const dob = line2.substring(13, 19);
  const dobCheckDigit = line2[19];
  const expectedDobCheck = calculateIcaoChecksum(dob).toString();
  const dobValid = dobCheckDigit === expectedDobCheck;

  const sex = line2[20];
  const expirationDate = line2.substring(21, 27);
  const expiryCheckDigit = line2[27];
  const expectedExpiryCheck = calculateIcaoChecksum(expirationDate).toString();
  const expiryValid = expiryCheckDigit === expectedExpiryCheck;

  const isValid = passportNumberValid && dobValid && expiryValid;

  return {
    isValid,
    passportNumberValid,
    dobValid,
    expiryValid,
    overallChecksumValid: isValid,
    parsedFields: {
      documentType: docType,
      issuingCountry,
      surname,
      givenNames,
      passportNumber,
      nationality,
      dob,
      sex,
      expirationDate,
    },
  };
}
