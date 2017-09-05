function validateResistanceInput(val, weightUnit) {
    val = parseFloat(val);
    if (weightUnit === 'kg') {
        if (val < 5 || val > 190) {
            return 'invalid'
        }
    } else if (weightUnit === 'lbs') {
        if (val < 5 || val > 190) {
            return 'invalid';
        }
    }
    return 'valid';
}

export default validateResistanceInput;