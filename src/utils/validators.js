export const lowerLimit = 5
export const upperLimit = 190

export function validateResistanceInput(val) {
    val = parseFloat(val);
    if (val < lowerLimit || val > upperLimit) {
        return 'invalid'
    }
    return 'valid';
}