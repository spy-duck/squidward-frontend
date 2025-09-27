import { type MantineColor, Menu, UnstyledButton } from '@mantine/core';
import {
    IconDotsVertical,
    IconTrash,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import {
    useSetActionApiTokenStore,
    useSetIsRemoveApiTokenStore,
} from '@/entities';
import type { TApiToken } from '@squidward/contracts/schemas';

type MenuProps = {
    text: ReactNode;
    icon: ReactNode;
    onClick(): void;
    color?: MantineColor;
}



type ApiTokensListItemMenuProps = {
    apiToken: Partial<TApiToken>;
}

export function ApiTokensListItemMenu({ apiToken }: ApiTokensListItemMenuProps) {
    const setActionApiToken = useSetActionApiTokenStore();
    const setIsRemoveApiToken = useSetIsRemoveApiTokenStore();
    
    const items: MenuProps[] = [
        {
            text: 'Delete',
            icon: <IconTrash size={ 14 }/>,
            onClick: () => {
                setActionApiToken(apiToken);
                setIsRemoveApiToken(true);
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
                        key={ index + apiToken.uuid! }
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