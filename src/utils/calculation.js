import _ from 'lodash/core';

function NoCombinationsError(message) {
    this.message = message;
    this.name = 'NoCombinationsError';
}


const maxDiff = 11.0231;  // 5 kg in lbs

/**
 * a binary search to find the closest element in array
 * @param num {number} number for which we're searching the closest
 * @param arr input array
 * @returns {number} closest element to num
 */
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
    // console.log(arr[hi]);
    return hi;
}

/**
 * Return all combinations of size cLen in an arr, which sum is close to num
 * @param arr array to search in
 * @param cLen size of the combination
 * @param num {number} desired value
 */
function getCombinations(arr, cLen, num) {
    let arrLen = arr.length,
        listOfCombinations = {},
        data = new Array(cLen);
    listOfCombinations = combinationUtil(arr, data, 0, arrLen - 1, 0, cLen, listOfCombinations, num);
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
 * @param list linked list to store combinations
 * @param num {number} desired value
 */
function combinationUtil(arr, data, start, end, index, r, list, num) {
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
function chooseClosest(combinations, resistance) {
    let values = Object.keys(combinations);
    let indexOfClosest = closest(resistance, values);
    return combinations[values[indexOfClosest]];
}


export function calculateSliderPositions(springNumber, arr, resistance) {
    let combinations;
    switch (springNumber) {
        case '1':
            return [closest(resistance, arr)];
        case '2':
            combinations = getCombinations(arr, 2, resistance);
            return chooseClosest(combinations, resistance);
        case '3':
            combinations = getCombinations(arr, 3, resistance);
            return chooseClosest(combinations, resistance);
        default:
            console.error('Invalid spring number');
            break;
    }
}

function roundToTwoDigitsAfterComma(floatNumber) {
    return parseFloat((Math.round(floatNumber * 100) / 100).toFixed(2));
}

export function lbToKg(lb) {
    return roundToTwoDigitsAfterComma(lb / 2.2046);
}

export function kgToLb(kg) {
    return roundToTwoDigitsAfterComma(kg * 2.2046);
}

export function calculateResistance(positions, resistanceValues) {
    return positions.map((x) => {
        return resistanceValues[x];
    }).reduce((a, b) => {
        return a + b;
    });
}
