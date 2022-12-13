export const lowerLimit = 5
export const upperLimit = 190

export function validateResistanceInput(val: string) {
    const parsedValue = parseFloat(val);
    if (parsedValue < lowerLimit || parsedValue > upperLimit) {
        return 'invalid'
    }
    return 'valid';
}