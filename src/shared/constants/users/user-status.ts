import type { TUserStatus } from '@squidward/contracts/constants';
import type { MantineColor } from '@mantine/core';

export const USER_STATUS_COLOR: Record<TUserStatus, MantineColor> = {
    ACTIVE: 'green',
    DISABLED: 'gray',
    LIMITED: 'orange',
    EXPIRED: 'red',
}