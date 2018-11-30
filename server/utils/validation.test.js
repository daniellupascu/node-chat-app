const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
        let string = 4;
        expect(isRealString(string)).toBe(false);
    });

    it('should reject strings with only white spaces', () => {
        let string = '   ';
        expect(isRealString(string)).toBe(false);
    });

    it('should reject non string values', () => {
        let string = 'valid string';
        expect(isRealString(string)).toBe(true);
    });
})