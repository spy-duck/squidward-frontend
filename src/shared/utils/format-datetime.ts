import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export const FORMAT = {
    DATETIME: 'DD.MM.yyyy HH:mm',
    DATETIME_FULL: 'DD.MM.YYYY HH:mm:ss',
    DATE: 'DD.MM.YYYY',
    TIME: 'HH:mm',
};

function parseDateTime(value: string | Dayjs | Date): Dayjs {
    if (dayjs.isDayjs(value)) {
        return value;
    }
    return dayjs(value);
}

export const formatDate = (value: string | Dayjs | undefined | null): string | undefined =>
    value ? parseDateTime(value).format(FORMAT.DATE) : undefined;

export const formatDateTime = (value: string | Dayjs | Date | undefined | null): string | undefined =>
    value ? parseDateTime(value).format(FORMAT.DATETIME_FULL) : undefined;
