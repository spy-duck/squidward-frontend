import React, { type ReactNode } from 'react';
import { NodesListContract } from '@swuidward/contracts/commands';
import { Badge, Center, Flex, Table, Tooltip } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { NodesListItemMenu } from '@/components/nodes/nodes-list/nodes-list-item-menu';
import {
    IconAlertTriangle,
    IconPlayerPlayFilled,
    IconPlayerStop,
    IconPlayerStopFilled,
    IconPower,
    IconRefresh,
} from '@tabler/icons-react';
import type { NodeState } from '@swuidward/contracts/constants/nodes/node-state';


const NodeStatusIcon: Record<NodeState, ReactNode> = {
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

type NodesListProps = {
    nodes: NodesListContract.Response['response']['nodes'],
};

export function NodesList({ nodes }: NodesListProps): React.ReactElement {
    const rows = (nodes || []).map((node) => (
        <Table.Tr key={ node.uuid }>
            <Table.Td>
                <NodesListItemMenu node={ node }/>
            </Table.Td>
            <Table.Td>
                <Flex align='center' justify='center' gap={ 14 }>
                    <Tooltip label={ node.isEnabled ? 'Enabled' : 'Disabled' }>
                        <IconPower color={ node.isEnabled ? 'green' : 'gray' } size={ 18 }/>
                    </Tooltip>
                    { !node.isConnected ? (
                        <Tooltip label='Disconnected'>
                            <Badge color='red' size='xs'></Badge>
                        </Tooltip>
                    ) : (
                        NodeStatusIcon[node.state as NodeState] || `Unknown[${node.state}]`
                    ) }
                </Flex>
            </Table.Td>
            <Table.Td>{ node.name }</Table.Td>
            <Table.Td>{ node.host }</Table.Td>
            <Table.Td>{ node.port }</Table.Td>
            <Table.Td>{ node.description }</Table.Td>
            <Table.Td>{ formatDateTime(node.createdAt) }</Table.Td>
        </Table.Tr>
    ));
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={ { width: 40 } }></Table.Th>
                    <Table.Th style={ { width: 40 } }><Center>Status</Center></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Host</Table.Th>
                    <Table.Th>Port</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th style={ { width: 160 } }>Created at</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{ rows }</Table.Tbody>
        </Table>
    );
}