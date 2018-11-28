const expect = require('expect');
const {generateMessage} = require('./message');

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