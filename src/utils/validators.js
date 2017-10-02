const lowerLimit = 5,
    upperLimit = 190;

function validateResistanceInput(val) {
    val = parseFloat(val);
    if (val < lowerLimit || val > upperLimit) {
        return 'invalid'
    }
    return 'valid';
}

export {validateResistanceInput, lowerLimit, upperLimit};