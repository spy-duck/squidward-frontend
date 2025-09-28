import React from 'react';
import { HostsListContract } from '@squidward/contracts/commands';
import { Badge, Center, Table } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { HostsListItemMenu } from './hosts-list-item-menu';
import { motion } from 'framer-motion';
import { IconPower } from '@tabler/icons-react';

type HostsProps = {
    hosts: HostsListContract.Response['response']['hosts'],
};

export function HostsList({ hosts }: HostsProps): React.ReactElement {
    const rows = (hosts || []).map((host, index) => (
        <motion.tr
            key={ host.uuid }
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
            <Table.Td valign='middle'>
                <HostsListItemMenu host={ host }/>
            </Table.Td>
            <Table.Td>{ host.name }</Table.Td>
            <Table.Td>{ host.countryCode }</Table.Td>
            <Table.Td>
                <Badge color={ host.enabled ? 'green' : 'red' }>
                    <IconPower color={ host.enabled ? 'green' : 'red' } size={14}/>
                </Badge>
            </Table.Td>
            <Table.Td>{ host.nodeId }</Table.Td>
            <Table.Td>{ formatDateTime(host.createdAt) }</Table.Td>
            <Table.Td>{ formatDateTime(host.updatedAt) }</Table.Td>
        </motion.tr>
    ));
    return (
        <Table striped withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={ { width: 40 } }></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Country</Table.Th>
                    <Table.Th>Enabled</Table.Th>
                    <Table.Th>Node ID</Table.Th>
                    <Table.Th style={ { width: 160 } }>Created at</Table.Th>
                    <Table.Th style={ { width: 160 } }>Updated At</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                { rows.length === 0 && (
                    <Table.Tr>
                        <Table.Td colSpan={ 7 }>
                            <Center>No hosts found</Center>
                        </Table.Td>
                    </Table.Tr>
                ) }
                { rows }
            </Table.Tbody>
        </Table>
    );
}