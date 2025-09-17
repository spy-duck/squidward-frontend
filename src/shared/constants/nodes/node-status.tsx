import React, { type ReactNode } from 'react';
import type { TNodeState } from '@squidward/contracts/constants';
import { Loader, Tooltip } from '@mantine/core';
import {
    IconAlertTriangle, IconMobiledataOff,
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
    STARTING: (
        <Tooltip label='Starting'>
            <Loader color='green' size='xs'/>
        </Tooltip>
    ),
    STOPPING: (
        <Tooltip label='Stopping'>
            <Loader color='gray' size='xs'/>
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
    OFFLINE: (
        <Tooltip label='Offline'>
            <IconMobiledataOff color='gray' size={18}/>
        </Tooltip>
    ),
}