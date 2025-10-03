import React from 'react';
import { UsersListContract } from '@squidward/contracts/commands';
import { Badge, Center, Table } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { UsersListItemMenu } from '@/features/users/users-list/users-list-item-menu';
import { motion } from 'framer-motion';
import { USER_STATUS_COLOR } from '@/shared/constants/users/user-status';

type UsersListProps = {
    users: UsersListContract.Response['response']['users'],
};

export function UsersList({ users }: UsersListProps): React.ReactElement {
    const rows = (users || []).map((user, index) => (
        <motion.tr
            key={ user.uuid }
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
                <UsersListItemMenu user={ user }/>
            </Table.Td>
            <Table.Td>{ user.name }</Table.Td>
            <Table.Td>
                <Badge variant='light' color={ USER_STATUS_COLOR[user.status] }>
                    { user.status }
                </Badge>
            </Table.Td>
            <Table.Td>{ user.email }</Table.Td>
            <Table.Td>{ user.telegramId }</Table.Td>
            <Table.Td>{ formatDateTime(user.createdAt) }</Table.Td>
            <Table.Td>{ formatDateTime(user.expireAt) }</Table.Td>
        </motion.tr>
    ));
    return (
        <Table striped withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={ { width: 40 } }></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>status</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>telegramId</Table.Th>
                    <Table.Th style={ { width: 160 } }>Created at</Table.Th>
                    <Table.Th style={ { width: 160 } }>Expire at</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                { rows.length === 0 && (
                    <Table.Tr>
                        <Table.Td colSpan={ 6 }>
                            <Center>No users found</Center>
                        </Table.Td>
                    </Table.Tr>
                ) }
                { rows }
            </Table.Tbody>
        </Table>
    );
}