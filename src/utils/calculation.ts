import _ from 'lodash';

class NoCombinationsError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NoCombinationsError.prototype);
    }
}

const maxDiff = 11.0231;  // 5 kilograms in pounds

// values are in pounds
export const innerGripResistanceValues = [
    13.715, 21.625, 31.285, 42.695, 55.865, 70.785, 87.455, 105.885, 126.056, 147.995, 171.685, 197.125
]
export const outerGripResistanceValues = [
    9.6005, 15.1375, 21.8995, 29.8865, 39.1055, 49.5495, 61.2185, 74.1195, 88.2455, 103.5965, 120.1795, 137.9875
]

/**
 * a binary search to find the closest element in array
 * @param num {number} number for which we're searching the closest
 * @param arr input array
 * @returns {number} closest element to num
 */
function closest(num: number, arr: number[]): number {
    let mid: number,
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
        return lo;
    }
    return hi;
}

type resistanceCombinations = {
    [key: number]: number[]
}

/**
 * Return all combinations of size cLen in an arr, which sum is close to num
 * @param arr array to search in
 * @param cLen size of the combination
 * @param num {number} desired value
 */
function getCombinations(arr: number[], cLen: number, num: number): resistanceCombinations {
    let arrLen = arr.length,
        tmpListOfCombinations = {} as resistanceCombinations,
        data = new Array(cLen);
    const listOfCombinations = combinationUtil(arr, data, 0, arrLen - 1, 0, cLen, tmpListOfCombinations, num);
    if (!_.isEmpty(listOfCombinations)) {
        return listOfCombinations;
    } else {
        throw new NoCombinationsError('No valid combinations');
    }
}

/**
 * @param arr input Array
 * @param data temporary array to store indexes of current combination
 * @param start {number} staring index in arr
 * @param end {number} ending index in arr
 * @param index {number} current index in data
 * @param r {number} size of a combination
 * @param list list to store combinations
 * @param num {number} desired value
 */
function combinationUtil(arr: number[], data: number[], start: number, end: number, index: number, r: number, list: resistanceCombinations, num: number): resistanceCombinations | undefined {
    // Current combination is ready to be stored, push it to linked list
    if (index === r) {
        let rArr = new Array(r);

        for (let j = 0; j < r; j++) {
            rArr[j] = data[j];
        }

        let combResistance = rArr.map((x) => {
            return arr[x];
        }).reduce((a, b) => {
            return a + b
        });

        if (Math.abs(combResistance - num) < maxDiff) {
            list[combResistance] = rArr;
        }

        return;
    }

    // replace index with all possible elements. The condition
    // "end-i+1 >= r-index" makes sure that including one element
    // at index will make a combination with remaining elements
    // at remaining positions
    for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
        data[index] = i;
        combinationUtil(arr, data, i+1, end, index+1, r, list, num);
    }
    return list;
}

/**
 * @param combinations {object} resistanceValue: array of spring positions
 * @param resistance desired resistance value
 * @returns {array} spring positions
 */
function chooseClosest(combinations: resistanceCombinations, resistance: number): number[] {
    const values = Object.keys(combinations).sort() as unknown as number[];
    const indexOfClosest = closest(resistance, values);
    return combinations[values[indexOfClosest]];
}


export function calculateSliderPositions(springNumber: number, isInnerGrip: boolean, resistance: number): number[] | undefined {
    let combinations: resistanceCombinations;
    const arr = isInnerGrip ? innerGripResistanceValues : outerGripResistanceValues;
    switch (springNumber) {
        case 1:
            return [closest(resistance, arr)];
        case 2:
            combinations = getCombinations(arr, 2, resistance);
            return chooseClosest(combinations, resistance);
        case 3:
            combinations = getCombinations(arr, 3, resistance);
            return chooseClosest(combinations, resistance);
        default:
            console.error('Invalid spring number');
            break;
    }
}

function roundToTwoDigitsAfterComma(floatNumber: number): number {
    return parseFloat((Math.round(floatNumber * 100) / 100).toFixed(2));
}

const oneKgInLb = 2.2046

export function lbToKg(lb: number): number {
    return roundToTwoDigitsAfterComma(lb / oneKgInLb);
}

export function kgToLb(kg: number): number {
    return roundToTwoDigitsAfterComma(kg * oneKgInLb);
}

export function calculateResistance(positions: number[], isInnerGrip: boolean): number {
    return positions.map((x) => {
        return isInnerGrip ? innerGripResistanceValues[x] : outerGripResistanceValues[x]
    }).reduce((a, b) => {
        return a + b;
    });
}
