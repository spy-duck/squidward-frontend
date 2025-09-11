import { NodesPageProvider, useNodesPageContext } from '@/pages/nodes/nodes.context';

function NodesPageComponent() {
    const { nodes } = useNodesPageContext();
    console.log(nodes);
    return (
        <div>
            Nodes page
        </div>
    )
}

export function NodesPage() {
    return (
        <NodesPageProvider>
            <NodesPageComponent/>
        </NodesPageProvider>
    )
}