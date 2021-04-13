module.exports = class TimestampUtils {
    static setTimestampList = (data) => {
        const timestamps = {};

        Object.values(data).forEach(({ listType, timestamp }) => {
            if (!timestamps[listType]) timestamps[listType] = [];
            timestamps[listType].push(new Date(timestamp));
        });

        return timestamps;
    };

    static findLatest = (datesList) =>
        (datesList || []).reduce((a, b) => (a > b ? a : b), 0);

    static getListsType = (timestampsObj) => Object.keys(timestampsObj);

    static removeOutdatedData = (currentDateObj, newDateObj, parsedMessage) => {
        const currentListsTypes = TimestampUtils.getListsType(currentDateObj);

        currentListsTypes.forEach((listName) => {
            const maxNewDate = TimestampUtils.findLatest(newDateObj[listName]);
            const maxCurrentDate = TimestampUtils.findLatest(
                currentDateObj[listName],
            );

            if (maxCurrentDate > maxNewDate) {
                Object.keys(parsedMessage).forEach((key) => {
                    if (parsedMessage[key].listType === listName) {
                        delete parsedMessage[key];
                    }
                });
            }
        });
    };
};
