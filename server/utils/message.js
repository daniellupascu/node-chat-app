const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

const generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps/@${lat},${long} `,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocationMessage};