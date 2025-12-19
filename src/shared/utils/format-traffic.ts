import { round } from 'lodash-es';

export function bytesToGb(bytes: number | bigint, precision = 2): number {
    return round(Number(bytes) / (1024 * 1024 * 1024), precision);
}