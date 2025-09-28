import { type MantineColor, Menu, UnstyledButton } from '@mantine/core';
import {
    IconDotsVertical, IconPencil,
    IconTrash,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import {
    useSetActionHostStore, useSetIsEditHostStore,
    useSetIsRemoveHostStore,
} from '@/entities';
import type { THost } from '@squidward/contracts/schemas';

type MenuProps = {
    text: ReactNode;
    icon: ReactNode;
    onClick(): void;
    color?: MantineColor;
}


type HostsListItemMenuProps = {
    host: Partial<THost>;
}

export function HostsListItemMenu({ host }: HostsListItemMenuProps) {
    const setAction = useSetActionHostStore();
    const setIsRemove = useSetIsRemoveHostStore();
    const setIsEdit = useSetIsEditHostStore();
    
    const items: MenuProps[] = [
        {
            text: 'Edit',
            icon: <IconPencil size={ 14 }/>,
            onClick: () => {
                setAction(host);
                setIsEdit(true);
            },
        },
        {
            text: 'Delete',
            icon: <IconTrash size={ 14 }/>,
            onClick: () => {
                setAction(host);
                setIsRemove(true);
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
                        key={ index + host.uuid! }
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