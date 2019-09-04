import {lbToKg, kgToLb} from '../../utils/calculation';

describe('Utils functions', () => {

    describe('lb to kg vice versa conversion functions', () => {

        it('should convert lb to kg', () => {
            expect(lbToKg(100)).toEqual(45.36);
        });

        it('should convert kg to lb', () => {
            expect(kgToLb(100)).toEqual(220.46);
        });

    });

});