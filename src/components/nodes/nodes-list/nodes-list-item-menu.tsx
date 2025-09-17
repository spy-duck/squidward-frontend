import { type MantineColor, Menu, UnstyledButton } from '@mantine/core';
import {
    IconDotsVertical,
    IconPencil,
    IconPlayerPlayFilled,
    IconPlayerStopFilled,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import type { TNode } from '@squidward/contracts/schemas/node.schema';
import type { ReactNode } from 'react';
import { useSetActionNodeStore, useSetIsRemoveNodeStore, useSetIsEditNodeStore } from '@/entities/nodes/nodes-store';
import { useStartNode } from '@/shared/api';
import { useNodesPageContext } from '@/pages/nodes/nodes.context';
import { useStopNode } from '@/shared/api/hooks/nodes/use-stop-node';

type MenuProps = {
    text: ReactNode;
    icon: ReactNode;
    onClick(): void;
    color?: MantineColor;
}



type NodesListItemMenuProps = {
    node: Partial<TNode>;
}

export function NodesListItemMenu({ node }: NodesListItemMenuProps) {
    const setActionNode = useSetActionNodeStore();
    const setIsEditNode = useSetIsEditNodeStore();
    const setIsRemoveNode = useSetIsRemoveNodeStore();
    const { refetchNodes } = useNodesPageContext();
    const { startNode } = useStartNode({
        onSuccess: () => {
            refetchNodes();
        },
    });
    const { stopNode } = useStopNode({
        onSuccess: () => {
            refetchNodes();
        },
    });
    
    const items: MenuProps[] = [
        {
            text: 'Edit',
            icon: <IconPencil size={ 14 }/>,
            onClick: () => {
                setActionNode(node);
                setIsEditNode(true);
            },
        },
        {
            text: 'Start',
            icon: <IconPlayerPlayFilled size={ 14 }/>,
            onClick: () => {
                startNode({ uuid: node.uuid!});
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
                stopNode({ uuid: node.uuid!});
            },
        },
        {
            text: 'Delete',
            icon: <IconTrash size={ 14 }/>,
            onClick: () => {
                setActionNode(node);
                setIsRemoveNode(true);
            },
            color: 'red',
        },
    ]
    return (
        <Menu shadow='md' width={ 200 } position='bottom-start'>
            <Menu.Target>
                <UnstyledButton style={{ paddingLeft: 7, paddingRight: 7 }}>
                    <IconDotsVertical size={ 14 }/>
                </UnstyledButton>
            </Menu.Target>
            
            <Menu.Dropdown>
                { items.map((item, index) => (
                    <Menu.Item
                        key={ index + node.uuid! }
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