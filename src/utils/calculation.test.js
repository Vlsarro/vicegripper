import {lbToKg, kgToLb, calculateResistance, calculateSliderPositions} from './calculation';

test('converts lb to kg', () => {
  expect(lbToKg(100)).toEqual(45.36);
})

test('converts kg to lb', () => {
  expect(kgToLb(100)).toEqual(220.46);
})

test('resistance calculation', () => {
  expect(calculateResistance([3, 11], true)).toEqual(239.82)
  expect(calculateResistance([0, 11], true)).toEqual(210.84)
})

test('slider positions selection from entered resistance value', () => {
  expect(calculateSliderPositions('2', true, 148)).toEqual([1, 8])
  expect(calculateResistance([1, 8], true)).toEqual(147.68099999999998)

  expect(calculateSliderPositions('2', true, 55)).toEqual([0, 3])
  expect(calculateResistance([0, 3], true)).toEqual(56.41)

  expect(calculateSliderPositions('2', false, 110)).toEqual([2, 8])
  expect(calculateResistance([2, 8], false)).toEqual(110.14500000000001)
})