import { type MantineColor, Menu, UnstyledButton } from '@mantine/core';
import {
    IconDotsVertical,
    IconPencil, IconRestore,
    IconTrash,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import {
    useSetActionUserStore,
    useSetIsEditUserStore,
    useSetIsRemoveUserStore,
} from '@/entities/users/users-store';
import type { TUser } from '@squidward/contracts/schemas';
import { useResetUserTraffic } from '@/shared/api';
import { notifications } from '@mantine/notifications';
import { useUsersPageContext } from '@/pages/users/users.context';

type MenuProps = {
    text: ReactNode;
    icon: ReactNode;
    onClick(): void;
    color?: MantineColor;
    disabled?: boolean;
}



type UsersListItemMenuProps = {
    user: Partial<TUser>;
}

export function UsersListItemMenu({ user }: UsersListItemMenuProps) {
    const setActionUser = useSetActionUserStore();
    const setIsEditUser = useSetIsEditUserStore();
    const setIsRemoveUser = useSetIsRemoveUserStore();
    const { refetchUsers } = useUsersPageContext();
    const { resetUserTraffic, isPending } = useResetUserTraffic({
        onSuccess() {
            notifications.show({
                title: 'Reset traffic',
                message: 'Traffic has been reset',
                color: 'green',
            });
            refetchUsers();
        }
    });
    
    
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
            text: 'Reset traffic',
            icon: <IconRestore size={ 14 }/>,
            onClick: () => {
                if (user.uuid) {
                    resetUserTraffic(user.uuid);
                }
            },
            disabled: isPending,
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
                        disabled={ item.disabled }
                    >
                        { item.text }
                    </Menu.Item>
                )) }
            </Menu.Dropdown>
        </Menu>
    )
}