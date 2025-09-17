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

type MenuItemProps = {
    text: string;
    leftSection?: ReactNode;
    onClick?: () => void;
    color?: MantineColor;
    disabled?: boolean;
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
        menuItem: MenuItemProps,
    ): MenuItemProps[] {
        if (!node.isConnected) return [];
        if (!node.state || !availableStates.includes(node.state as TNodeState)) return [];
        return [ menuItem ];
    }
    
    function isStateContains(state: TNodeState | undefined, states: TNodeState[]): boolean {
        if (!state) {
            return false;
        }
        return states.includes(state);
    }
    
    // TODO: refactor this shit
    const items: MenuItemProps[] = [
        {
            text: 'Edit',
            leftSection: <IconPencil size={ 14 }/>,
            onClick: () => {
                setActionNode(node);
                setIsEditNode(true);
            },
            disabled: isStateContains(node.state, [
                NODE_STATE.STARTING,
                NODE_STATE.STOPPING,
                NODE_STATE.RESTARTING,
            ]),
        },
        ...makeNodeMenuAction(
            [ NODE_STATE.CREATED, NODE_STATE.STOPPED, NODE_STATE.FATAL, NODE_STATE.OFFLINE, NODE_STATE.SHUTDOWN, NODE_STATE.STARTING ],
            {
                text: 'Start',
                leftSection: <IconPlayerPlayFilled size={ 14 }/>,
                onClick: () => {
                    startNode({ uuid: node.uuid! });
                },
                disabled: isStateContains(node.state, [ NODE_STATE.STARTING ]),
            },
        ),
        ...makeNodeMenuAction(
            [ NODE_STATE.RUNNING, NODE_STATE.RESTARTING, NODE_STATE.STOPPING ],
            {
                text: 'Restart',
                leftSection: <IconRefresh size={ 14 }/>,
                onClick: () => {
                    restartNode({ uuid: node.uuid! });
                },
                disabled: isStateContains(node.state, [ NODE_STATE.STOPPING, NODE_STATE.RESTARTING ]),
            },
        ),
        ...makeNodeMenuAction(
            [ NODE_STATE.RUNNING, NODE_STATE.RESTARTING, NODE_STATE.STOPPING ],
            {
                text: 'Stop',
                leftSection: <IconPlayerStopFilled size={ 14 }/>,
                onClick: () => {
                    stopNode({ uuid: node.uuid! });
                },
                disabled: isStateContains(node.state, [ NODE_STATE.STOPPING, NODE_STATE.RESTARTING ]),
            },
        ),
        {
            text: 'Delete',
            leftSection: <IconTrash size={ 14 }/>,
            onClick: () => {
                setActionNode(node);
                setIsRemoveNode(true);
            },
            color: 'red',
            disabled: isStateContains(node.state, [
                NODE_STATE.STARTING,
                NODE_STATE.STOPPING,
                NODE_STATE.RESTARTING,
            ]),
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
                        leftSection={ item.leftSection }
                        onClick={ item.onClick }
                        disabled={ item.disabled }
                        color={ item.color }
                    >
                        { item.text }
                    </Menu.Item>
                )) }
            </Menu.Dropdown>
        </Menu>
    )
}