export function calculateCheckDigit(input: string): number {
  const weights = [7, 3, 1];
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i].toUpperCase();
    let value = 0;
    if (char >= '0' && char <= '9') {
      value = parseInt(char, 10);
    } else if (char >= 'A' && char <= 'Z') {
      value = char.charCodeAt(0) - 55;
    } else if (char === '<') {
      value = 0;
    } else {
      return -1;
    }
    sum += value * weights[i % 3];
  }
  return sum % 10;
}

export function validatePassportMRZ(line2: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!line2 || line2.length !== 44) {
    return { isValid: false, errors: ['Invalid MRZ length. Must be 44 characters.'] };
  }

  const validateSegment = (str: string, checkPos: number, name: string) => {
    const checkChar = line2[checkPos];
    if (checkChar !== '<') {
      const calculated = calculateCheckDigit(str);
      const expected = parseInt(checkChar, 10);
      if (calculated !== expected) {
        errors.push(`${name} checksum failed: expected ${expected}, got ${calculated}`);
      }
    }
  };

  validateSegment(line2.substring(0, 9), 9, 'Passport number');
  validateSegment(line2.substring(13, 19), 19, 'Date of birth');
  validateSegment(line2.substring(21, 27), 27, 'Expiry date');

  const composite = line2.substring(0, 10) + line2.substring(13, 20) + line2.substring(21, 43);
  validateSegment(composite, 43, 'Final Composite');

  return { isValid: errors.length === 0, errors };
}
