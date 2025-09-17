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
import { useRestartNode } from '@/shared/api/hooks/nodes/use-restart-node';
import { NODE_STATE, type TNodeState } from '@squidward/contracts/constants';

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
    const { startNode } = useStartNode({ onSuccess: () => refetchNodes() });
    const { stopNode } = useStopNode({ onSuccess: () => refetchNodes() });
    const { restartNode } = useRestartNode({ onSuccess: () => refetchNodes() });
    
    function makeNodeMenuAction(
        availableStates: TNodeState[],
        makeMenuItem: (disabled: boolean) => MenuProps,
        disabledStates?: TNodeState[],
    ): MenuProps[] {
        if (!node.state || !availableStates.includes(node.state as TNodeState)) return [];
        
        const menuItem = makeMenuItem(disabledStates?.includes(node.state as TNodeState) || false);
        
        return [ menuItem ];
    }
    
    // TODO: refactor this shit
    const items: MenuProps[] = [
        {
            text: 'Edit',
            icon: <IconPencil size={ 14 }/>,
            onClick: () => {
                setActionNode(node);
                setIsEditNode(true);
            },
        },
        ...makeNodeMenuAction(
            [ NODE_STATE.CREATED, NODE_STATE.STOPPED, NODE_STATE.FATAL, NODE_STATE.OFFLINE, NODE_STATE.SHUTDOWN, NODE_STATE.STARTING ],
            (disabled) => ({
                text: 'Start',
                icon: <IconPlayerPlayFilled size={ 14 } color={ disabled ? 'gray' : undefined }/>,
                onClick: () => {
                    if (disabled) return;
                    startNode({ uuid: node.uuid! });
                },
                color: disabled ? 'gray' : undefined,
            }),
            [ NODE_STATE.STARTING ],
        ),
        ...makeNodeMenuAction(
            [ NODE_STATE.RUNNING, NODE_STATE.RESTARTING, NODE_STATE.STOPPING ],
            (disabled) => ({
                text: 'Restart',
                icon: <IconRefresh size={ 14 } color={ disabled ? 'gray' : undefined }/>,
                onClick: () => {
                    if (disabled) return;
                    restartNode({ uuid: node.uuid! });
                },
                color: disabled ? 'gray' : undefined,
            }),
            [ NODE_STATE.STOPPING, NODE_STATE.RESTARTING ],
        ),
        ...makeNodeMenuAction(
            [ NODE_STATE.RUNNING, NODE_STATE.RESTARTING, NODE_STATE.STOPPING ],
            (disabled) => ({
                text: 'Stop',
                icon: <IconPlayerStopFilled size={ 14 } color={ disabled ? 'gray' : undefined }/>,
                onClick: () => {
                    if (disabled) return;
                    stopNode({ uuid: node.uuid! });
                },
                color: disabled ? 'gray' : undefined,
            }),
            [ NODE_STATE.STOPPING, NODE_STATE.RESTARTING ],
        ),
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
                <UnstyledButton style={ { paddingLeft: 7, paddingRight: 7 } }>
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