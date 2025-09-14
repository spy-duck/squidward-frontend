import { type MantineColor, Menu, UnstyledButton } from '@mantine/core';
import {
    IconDotsVertical,
    IconPencil,
    IconTrash,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import {
    useSetActionUserStore,
    useSetIsEditUserStore,
    useSetIsRemoveUserStore,
} from '@/entities/users/users-store';
import type { TUser } from '@swuidward/contracts/schemas';

type MenuProps = {
    text: ReactNode;
    icon: ReactNode;
    onClick(): void;
    color?: MantineColor;
}



type UsersListItemMenuProps = {
    user: Partial<TUser>;
}

export function UsersListItemMenu({ user }: UsersListItemMenuProps) {
    const setActionUser = useSetActionUserStore();
    const setIsEditUser = useSetIsEditUserStore();
    const setIsRemoveUser = useSetIsRemoveUserStore();
    
    const items: MenuProps[] = [
        {
            text: 'Edit',
            icon: <IconPencil size={ 14 }/>,
            onClick: () => {
                setActionUser(user);
                setIsEditUser(true);
            },
        },
        {
            text: 'Delete',
            icon: <IconTrash size={ 14 }/>,
            onClick: () => {
                setActionUser(user);
                setIsRemoveUser(true);
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
                        key={ index + user.uuid! }
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