import React from 'react';
import { ApiTokensListContract } from '@squidward/contracts/commands';
import { Button, Center, CopyButton, Table, UnstyledButton } from '@mantine/core';
import { formatDateTime } from '@/shared/utils';
import { ApiTokensListItemMenu } from './api-tokens-list-item-menu';
import { motion } from 'framer-motion';
import { IconCopy } from '@tabler/icons-react';

type ApiTokensProps = {
    apiTokens: ApiTokensListContract.Response['response']['apiTokens'],
};

export function ApiTokensList({ apiTokens }: ApiTokensProps): React.ReactElement {
    const rows = (apiTokens || []).map((apiToken, index) => (
        <motion.tr
            key={ apiToken.uuid }
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
                <ApiTokensListItemMenu apiToken={ apiToken }/>
            </Table.Td>
            <Table.Td>
                
                <UnstyledButton>
                    <CopyButton value={ apiToken.token }>
                        { ({ copied, copy }) => (
                            <Button
                                component='span'
                                leftSection={(
                                    <IconCopy size={14}/>
                                )}
                                color={ copied ? 'teal' : 'blue' }
                                onClick={ copy }
                                size='compact-xs'
                            >
                                Copy token
                            </Button>
                        ) }
                    </CopyButton>
                </UnstyledButton>
            </Table.Td>
            <Table.Td>{ apiToken.tokenName }</Table.Td>
            <Table.Td>
                { formatDateTime(apiToken.expireAt) }
            </Table.Td>
            <Table.Td>{ formatDateTime(apiToken.createdAt) }</Table.Td>
        </motion.tr>
    ));
    return (
        <Table striped withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={ { width: 40 } }></Table.Th>
                    <Table.Th style={ { width: 40 } }></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th style={ { width: 160 } }>Expire At</Table.Th>
                    <Table.Th style={ { width: 160 } }>Created at</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                { rows.length === 0 && (
                    <Table.Tr>
                        <Table.Td colSpan={ 6 }>
                            <Center>No API tokens found</Center>
                        </Table.Td>
                    </Table.Tr>
                ) }
                { rows }
            </Table.Tbody>
        </Table>
    );
}