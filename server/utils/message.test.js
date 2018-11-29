const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
    it('should return the message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message).toMatchObject({
            text,
            from,
        })
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generate location message', () => {
    it('should return the location object', () => {
        let from = 'admin';
        let lat = '332';
        let long = '233';
        let url =  `https://www.google.com/maps/@${lat},${long} `;
        let message = generateLocationMessage(from, lat, long);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message).toMatchObject({
            url,
            from,
        });
    });
});