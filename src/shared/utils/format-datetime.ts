import { DateTime } from 'luxon';

export const FORMAT = {
    DATETIME: 'dd.MM.yyyy HH:mm',
    DATETIME_FULL: 'dd.MM.yyyy HH:mm:ss',
    DATE: 'dd.MM.yyyy',
    TIME: 'HH:mm',
};

function parseDateTime(value: string | DateTime | Date): DateTime {
    if (value instanceof DateTime) {
        return value;
    } else if (value instanceof Date) {
        return DateTime.fromJSDate(value);
    }
    return DateTime.fromISO(value);
}

export const formatDate = (value: string | DateTime | undefined): string | undefined =>
    value && parseDateTime(value).toFormat(FORMAT.DATE);

export const formatDateTime = (value: string | DateTime | Date | undefined): string | undefined =>
    value && parseDateTime(value).toFormat(FORMAT.DATETIME_FULL);
