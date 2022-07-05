const dayjs = require('dayjs')


const dateFormat = function(timestamp) {
        return dayjs(timestamp).format('MM/DD/YYYY, h:mm A');
};

module.exports = dateFormat;
