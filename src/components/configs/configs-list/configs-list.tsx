import React from 'react';
import { ConfigsListContract } from '@squidward/contracts/commands';
import { Badge, Center, Table, Tooltip } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { ConfigsListItemMenu } from './configs-list-item-menu';
import { motion } from 'framer-motion';
import { IconCloudDataConnection } from '@tabler/icons-react';

type ConfigsListProps = {
    configs: ConfigsListContract.Response['response']['configs'],
};

export function ConfigsList({ configs }: ConfigsListProps): React.ReactElement {
    const rows = (configs || []).map((config, index) => (
        <motion.tr
            key={ config.uuid }
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
                <ConfigsListItemMenu config={ config }/>
            </Table.Td>
            <Table.Td>{ config.name }</Table.Td>
            <Table.Td>
                <Tooltip label='Used by nodes'>
                    <Badge
                        leftSection={ <IconCloudDataConnection size={ 12 } stroke='2px'/> }
                        variant='outline'
                        color={ !config.nodesCount || config.nodesCount === 0 ? 'gray' : 'cyan' }
                    >
                        { config.nodesCount }
                    </Badge>
                </Tooltip>
            </Table.Td>
            <Table.Td>{ formatDateTime(config.updatedAt) }</Table.Td>
            <Table.Td>{ formatDateTime(config.createdAt) }</Table.Td>
        </motion.tr>
    ));
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={ { width: 40 } }></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Nodes</Table.Th>
                    <Table.Th style={ { width: 160 } }>Updated At</Table.Th>
                    <Table.Th style={ { width: 160 } }>Created at</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                { rows.length === 0 && (
                    <Table.Tr>
                        <Table.Td colSpan={ 4 }>
                            <Center>No users found</Center>
                        </Table.Td>
                    </Table.Tr>
                ) }
                { rows }
            </Table.Tbody>
        </Table>
    );
}