import React from 'react';
import { NodesListContract } from '@swuidward/contracts/commands';
import { Badge, Center, Table, Tooltip } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { NodesListItemMenu } from '@/components/nodes/nodes-list/nodes-list-item-menu';

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
                <Center>
                    <Tooltip label="Disconnected">
                        <Badge color='red' size='xs'></Badge>
                    </Tooltip>
                </Center>
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
                    <Table.Th style={{ width: 40 }}></Table.Th>
                    <Table.Th style={{ width: 40 }}><Center>Status</Center></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Host</Table.Th>
                    <Table.Th>Port</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th style={{ width: 160 }}>Created at</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{ rows }</Table.Tbody>
        </Table>
    );
}