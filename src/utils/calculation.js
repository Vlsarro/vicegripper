function closest(num, arr) {
    let mid,
        lo = 0,
        hi = arr.length - 1;
    while (hi - lo > 1) {
        mid = Math.floor ((lo + hi) / 2);
        if (arr[mid] < num) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    if (num - arr[lo] <= arr[hi] - num) {
        console.log(arr[lo]);
        return lo;
    }
    console.log(arr[hi]);
    return hi;
}


function calculateSliderPositions(springNumber, arr, resistance) {
    switch (springNumber) {
        case '1':
            return closest(resistance, arr);
        case '2':
            console.log('Not implemented');
            break;
        case '3':
            console.log('Not implemented');
            break;
        default:
            console.error('Invalid spring number');
            break;
    }
}

function lbToKg(lb) {
    return lb/2.2046;
}

function kgToLb(kg) {
    return kg*2.2046;
}

function calculateResistance(positions, resistanceValues) {
    return positions.map((x) => {
        return resistanceValues[x];
    }).reduce((a, b) => {
        return a + b;
    });
}

export {lbToKg, kgToLb, calculateResistance, calculateSliderPositions};
