import React, { type ReactNode } from 'react';
import type { TNodeState } from '@swuidward/contracts/constants';
import { Tooltip } from '@mantine/core';
import {
    IconAlertTriangle,
    IconPlayerPlayFilled,
    IconPlayerStop,
    IconPlayerStopFilled,
    IconRefresh,
} from '@tabler/icons-react';

export const NODE_STATUS_ICON: Record<TNodeState, ReactNode> = {
    STOPPED: (
        <Tooltip label='Stopped'>
            <IconPlayerStop color='gray' size={18}/>
        </Tooltip>
    ),
    RUNNING: (
        <Tooltip label='Running'>
            <IconPlayerPlayFilled color='green' size={18}/>
        </Tooltip>
    ),
    FATAL: (
        <Tooltip label='Errored'>
            <IconAlertTriangle color='red' size={18}/>
        </Tooltip>
    ),
    RESTARTING: (
        <Tooltip label='Restarting'>
            <IconRefresh color='orange' size={18}/>
        </Tooltip>
    ),
    SHUTDOWN: (
        <Tooltip label='Shutdown'>
            <IconPlayerStopFilled color='gray' size={18}/>
        </Tooltip>
    ),
}