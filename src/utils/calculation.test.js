import {lbToKg, kgToLb} from './calculation';

test('converts lb to kg', () => {
  expect(lbToKg(100)).toEqual(45.36);
})

test('converts kg to lb', () => {
  expect(kgToLb(100)).toEqual(220.46);
})
