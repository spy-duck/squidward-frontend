import { Button, Flex, Group } from '@mantine/core';
import { PageWrapper } from '@/shared/components/ui';
import { Link } from 'react-router';
import { IconPlus } from '@tabler/icons-react';
import { ApiTokensPageProvider, useApiTokensPageContext } from '@/pages/api-tokens/api-tokens.context';
import { ApiTokenCreateModal } from '@/features/api-tokens/api-token-create-modal/api-token-create-modal';
import { ApiTokenRemoveModal } from '@/features/api-tokens/api-token-remove-modal';
import { ApiTokensList } from '@/features/api-tokens/api-tokens-list';
import { useSetIsRemoveApiTokenStore } from '@/entities';

function ApiTokensPageComponent() {
    const {
        apiTokens,
        isCreateModalOpen,
        refetchApiTokens,
        openCreateModalOpen,
        isRemoveModalOpen,
    } = useApiTokensPageContext();
    const setIsRemove = useSetIsRemoveApiTokenStore();
    
    return (
        <PageWrapper>
            <Flex align='center'>
                <h1 style={ { flex: 1 } }>API tokens</h1>
                <Flex gap={ 14 }>
                    <Button
                        onClick={ () => openCreateModalOpen(true) }
                        leftSection={ <IconPlus size={ 16 }/> }
                    >
                        Create Api token
                    </Button>
                </Flex>
            </Flex>
            
            <ApiTokensList apiTokens={ apiTokens }/>
            
            <Group justify='flex-start' mt='md'>
                <Button
                    component={ Link }
                    to='http://localhost:4000/scalar'
                    target='_blank'
                    color='gray'
                    variant='light'
                >
                    Scalar API docs
                </Button>
                <Button
                    component={ Link }
                    to='http://localhost:4000/docs'
                    target='_blank'
                    color='gray'
                    variant='light'
                >
                    Swagger API docs
                </Button>
            </Group>
            <ApiTokenCreateModal
                opened={ isCreateModalOpen }
                onClose={ () => openCreateModalOpen(false) }
                onSubmit={ () => refetchApiTokens() }
            />
            <ApiTokenRemoveModal
                opened={ isRemoveModalOpen }
                onClose={ () => setIsRemove(false) }
                onSubmit={ () => refetchApiTokens() }
            />
        </PageWrapper>
    )
}

export function ApiTokensPage() {
    return (
        <ApiTokensPageProvider>
            <ApiTokensPageComponent/>
        </ApiTokensPageProvider>
    )
}