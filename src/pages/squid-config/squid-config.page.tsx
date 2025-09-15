import { Flex } from '@mantine/core';
import { PageWrapper } from '@/shared/components/ui';
import { SquidConfigPageProvider } from '@/pages/squid-config/squid-config.context';
import { SquidConfigEdit } from '@/components/squid-configs/squid-config-edit';

function SquidConfigPageComponent() {
    return (
        <PageWrapper>
            <Flex align='center'>
                <h1 style={{ flex: 1 }}>Squid config</h1>
            </Flex>
            <SquidConfigEdit
                onSubmit={() => {}}
            />
        </PageWrapper>
    )
}

export function SquidConfigPage() {
    return (
        <SquidConfigPageProvider>
            <SquidConfigPageComponent/>
        </SquidConfigPageProvider>
    )
}