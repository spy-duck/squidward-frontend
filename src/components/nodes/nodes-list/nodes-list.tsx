import React, { type ReactElement } from 'react';
import { NodesListContract } from '@squidward/contracts/commands';
import { Badge, Center, Flex, Table, Tooltip } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { NodesListItemMenu } from '@/components/nodes/nodes-list/nodes-list-item-menu';
import { IconLink, IconLinkOff } from '@tabler/icons-react';
import type { TNodeState } from '@squidward/contracts/constants';
import { motion } from 'framer-motion';
import { NODE_STATUS_ICON } from '@/shared/constants/nodes/node-status';


type NodesListProps = {
    nodes: NodesListContract.Response['response']['nodes'],
};

export function NodesList({ nodes }: NodesListProps): ReactElement {
    const rows = (nodes || []).map((node, index) => (
        <motion.tr
            key={ node.uuid }
            initial={ {
                opacity: 0,
                translateY: -5,
            } }
            animate={ {
                opacity: 1,
                translateY: 0,
            } }
            transition={ {
                duration: 0.5,
                ease: [ 0, 0.71, 0.2, 1.01 ],
                delay: (index + 1) / 15,
            } }
        >
            <Table.Td>
                <NodesListItemMenu node={ node }/>
            </Table.Td>
            <Table.Td>
                <Flex align='center' justify='center' gap={ 14 }>
                        {node.isConnected && (
                            <Tooltip label='Connected'>
                                <IconLink size={ 18 } color='green'/>
                            </Tooltip>
                        )}
                        {!node.isConnected && (
                            <Tooltip label='Disconnected'>
                                <IconLinkOff size={ 18 } color='#e03131'/>
                            </Tooltip>
                        )}
                    { NODE_STATUS_ICON[node.state as TNodeState] || `Unknown[${ node.state }]` }
                </Flex>
            </Table.Td>
            <Table.Td>{ node.name }</Table.Td>
            <Table.Td>{ node.host }</Table.Td>
            <Table.Td>{ node.port }</Table.Td>
            <Table.Td>
                <Badge variant='outline'>
                    { node.config?.name }
                </Badge>
            </Table.Td>
            <Table.Td>{ node.description }</Table.Td>
            <Table.Td>{ formatDateTime(node.createdAt) }</Table.Td>
        </motion.tr>
    ));
    return (
        <Table striped withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={ { width: 40 } }></Table.Th>
                    <Table.Th style={ { width: 40 } }><Center>Status</Center></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Host</Table.Th>
                    <Table.Th>Port</Table.Th>
                    <Table.Th>Config</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th style={ { width: 160 } }>Created at</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                { rows.length === 0 && (
                    <Table.Tr>
                        <Table.Td colSpan={ 8 }>
                            <Center>No nodes found</Center>
                        </Table.Td>
                    </Table.Tr>
                ) }
                { rows }
            </Table.Tbody>
        </Table>
    );
}