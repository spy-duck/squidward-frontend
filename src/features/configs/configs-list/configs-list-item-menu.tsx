import { type MantineColor, Menu, UnstyledButton } from '@mantine/core';
import {
    IconDotsVertical,
    IconPencil,
    IconTrash,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import {
    useSetActionConfigStore,
    useSetIsEditConfigStore,
    useSetIsRemoveConfigStore,
} from '@/entities/configs/configs-store';
import type { TConfig } from '@squidward/contracts/schemas';

type MenuProps = {
    text: ReactNode;
    icon: ReactNode;
    onClick(): void;
    color?: MantineColor;
}



type ConfigsListItemMenuProps = {
    config: Partial<TConfig>;
}

export function ConfigsListItemMenu({ config }: ConfigsListItemMenuProps) {
    const setActionConfig = useSetActionConfigStore();
    const setIsEditConfig = useSetIsEditConfigStore();
    const setIsRemoveConfig = useSetIsRemoveConfigStore();
    
    const items: MenuProps[] = [
        {
            text: 'Edit',
            icon: <IconPencil size={ 14 }/>,
            onClick: () => {
                setActionConfig(config);
                setIsEditConfig(true);
            },
        },
        {
            text: 'Delete',
            icon: <IconTrash size={ 14 }/>,
            onClick: () => {
                setActionConfig(config);
                setIsRemoveConfig(true);
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
                        key={ index + config.uuid! }
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