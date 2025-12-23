import type { ReactElement } from 'react';
import type { TMetrics } from '@squidward/contracts/schemas';
import { Badge, Popover, Table, Text } from '@mantine/core';
import { bytesToGb } from '@/shared/utils';

type TrafficValueWithPopupProps = {
    metrics: TMetrics | undefined | null
};

export function MetricsValueWithPopup({
    metrics,
}: TrafficValueWithPopupProps): ReactElement {
    console.log(metrics)
    return (
        <Popover width={ 200 } position='bottom'>
            <Popover.Target>
                <Badge
                    variant='transparent'
                    className='cursor-pointer'
                    color={ metrics?.total ? 'teal' : 'gray' }
                >
                    { bytesToGb(metrics?.total || 0) } Gib
                </Badge>
            </Popover.Target>
            <Popover.Dropdown>
                <Table>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <Text size='xs'>
                                    Upload:
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size='xs'>
                                    { bytesToGb(metrics?.upload || 0) } Gib
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Text size='xs'>
                                    Download:
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size='xs'>
                                    { bytesToGb(metrics?.download || 0) } Gib
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Text size='xs'>
                                    Total:
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size='xs'>
                                    { bytesToGb(metrics?.total || 0) } Gib
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Popover.Dropdown>
        </Popover>
    );
}