import { Button, Flex } from '@mantine/core';
import { PageWrapper } from '@/shared/components/ui';
import { Link } from 'react-router';

function ApiTokensPageComponent() {
    
    return (
        <PageWrapper>
            <Flex align='center'>
                <h1 style={{ flex: 1 }}>API tokens</h1>
            </Flex>
            <Button component={Link} to='http://localhost:4000/scalar' target='_blank'>Scalar API docs</Button>
        </PageWrapper>
    )
}

export function ApiTokensPage() {
    return (
        <ApiTokensPageComponent/>
    )
}