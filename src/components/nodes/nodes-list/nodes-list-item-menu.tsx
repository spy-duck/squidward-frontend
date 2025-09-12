import { type MantineColor, Menu, UnstyledButton } from '@mantine/core';
import { IconDotsVertical, IconPencil, IconPlayerStopFilled, IconRefresh, IconTrash } from '@tabler/icons-react';
import type { TNode } from '@swuidward/contracts/schemas/node.schema';
import type { ReactNode } from 'react';
import { useSetEditNodeStore, useSetIsEditNodeStore } from '@/entities/nodes/nodes-store';

type MenuProps = {
    text: ReactNode;
    icon: ReactNode;
    onClick(): void;
    color?: MantineColor;
}

type NodesListItemMenuProps = {
    node: TNode;
}

export function NodesListItemMenu({ node }: NodesListItemMenuProps) {
    const setEditNode = useSetEditNodeStore();
    const setIsEditNode = useSetIsEditNodeStore();
    
    const items: MenuProps[] = [
        {
            text: 'Edit',
            icon: <IconPencil size={ 14 }/>,
            onClick: () => {
                setEditNode(node);
                setIsEditNode(true);
            },
        },
        {
            text: 'Restart',
            icon: <IconRefresh size={ 14 }/>,
            onClick: () => {
                console.log('Restart', node);
            },
        },
        {
            text: 'Stop',
            icon: <IconPlayerStopFilled size={ 14 }/>,
            onClick: () => {
                console.log('Stop', node);
            },
        },
        {
            text: 'Delete',
            icon: <IconTrash size={ 14 }/>,
            onClick: () => {
                console.log('Delete', node);
            },
            color: 'red',
        },
    ]
    return (
        <Menu shadow='md' width={ 200 } position='bottom-start'>
            <Menu.Target>
                <UnstyledButton>
                    <IconDotsVertical size={ 14 }/>
                </UnstyledButton>
            </Menu.Target>
            
            <Menu.Dropdown>
                { items.map((item, index) => (
                    <Menu.Item
                        key={ index + node.uuid }
                        leftSection={ item.icon }
                        color={ item.color }
                        onClick={ item.onClick }
                    >
                        { item.text }
                    </Menu.Item>
                )) }
            </Menu.Dropdown>
        </Menu>
    )
}