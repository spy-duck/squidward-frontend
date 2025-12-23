import React, { type ReactElement } from 'react';
import { NodesListContract } from '@squidward/contracts/commands';
import { Badge, Center, Flex, Table, Tooltip, CopyButton, ActionIcon, Paper } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { NodesListItemMenu } from '@/features/nodes/nodes-list/nodes-list-item-menu';
import { IconCheck, IconCopy, IconLinkOff } from '@tabler/icons-react';
import type { TNodeState } from '@squidward/contracts/constants';
import { motion } from 'framer-motion';
import { NODE_STATUS_ICON } from '@/shared/constants/nodes/node-status';
import { COUNTRIES_MAP, type CountryCode } from '@/shared/constants';
import { MetricsValueWithPopup } from '@/shared/components/ui';


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
                    { !node.isConnected && (
                        <Tooltip label='Disconnected'>
                            <IconLinkOff size={ 18 } color='#e03131'/>
                        </Tooltip>
                    ) }
                    { (node.isConnected && node.state) && (NODE_STATUS_ICON[node.state as TNodeState] || `[${ node.state }]`) }
                </Flex>
            </Table.Td>
            <Table.Td>{ node.name }</Table.Td>
            <Table.Td style={ { whiteSpace: 'nowrap' } }>
                { COUNTRIES_MAP[node.countryCode as CountryCode] }
            </Table.Td>
            <Table.Td>
                <Flex align='center' gap={ 7 }>
                    { node.host }
                    <CopyButton value={ node.host } timeout={ 2000 }>
                        { ({ copied, copy }) => (
                            <Tooltip label={ copied ? 'Copied' : 'Copy' } withArrow position='right'>
                                <ActionIcon color={ copied ? 'teal' : 'gray' } variant='subtle' onClick={ copy }>
                                    { copied ? <IconCheck size={ 14 }/> : <IconCopy size={ 14 }/> }
                                </ActionIcon>
                            </Tooltip>
                        ) }
                    </CopyButton>
                </Flex>
            </Table.Td>
            <Table.Td>{ node.port }</Table.Td>
            <Table.Td>
                <Badge variant='outline'>
                    { node.config?.name }
                </Badge>
            </Table.Td>
            <Table.Td>{ node.httpPort }</Table.Td>
            <Table.Td>
                { node.httpsEnabled && node.httpsPort }
                { !node.httpsEnabled && (
                    <Badge color='gray'>
                        disabled
                    </Badge>
                ) }
            </Table.Td>
            <Table.Td>
                <MetricsValueWithPopup metrics={ node.metrics }/>
            </Table.Td>
            <Table.Td>{ formatDateTime(node.createdAt) }</Table.Td>
            <Table.Td>
                <Badge variant='outline'>
                    { node.version || 'N/A' }
                </Badge>
            </Table.Td>
        </motion.tr>
    ));
    return (
        <Paper withBorder>
            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={ { width: 40 } }></Table.Th>
                        <Table.Th style={ { width: 40 } }><Center>Status</Center></Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Country</Table.Th>
                        <Table.Th>Host</Table.Th>
                        <Table.Th>API Port</Table.Th>
                        <Table.Th>Config</Table.Th>
                        <Table.Th>HTTP Port</Table.Th>
                        <Table.Th>HTTPS Port</Table.Th>
                        <Table.Th>Traffic</Table.Th>
                        <Table.Th style={ { width: 160 } }>Created at</Table.Th>
                        <Table.Th>Version</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    { rows.length === 0 && (
                        <Table.Tr>
                            <Table.Td colSpan={ 10 }>
                                <Center>No nodes found</Center>
                            </Table.Td>
                        </Table.Tr>
                    ) }
                    { rows }
                </Table.Tbody>
            </Table>
        </Paper>
    );
}