import { Button, Flex } from '@mantine/core';
import { PageWrapper } from '@/shared/components/ui';
import { SquidConfigPageProvider } from '@/pages/squid-config/squid-config.context';
import { ConfigsList } from '@/features/configs/configs-list';
import { useSquidConfigPageContext } from './squid-config.context';
import { useSetIsEditConfigStore, useSetIsRemoveConfigStore } from '@/entities';
import { ConfigCreateModal } from '@/features/configs/config-create-modal';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { ConfigRemoveModal } from '@/features/configs/config-remove-modal';
import { ConfigEditModal } from '@/features/configs/config-edit-modal';

function SquidConfigPageComponent() {
    const {
        configs,
        isCreateModalOpen,
        refetchConfigs,
        openCreateModalOpen,
        isEditModalOpen,
        isRemoveModalOpen,
    } = useSquidConfigPageContext();
    
    const setIsEdit = useSetIsEditConfigStore();
    const setIsRemove = useSetIsRemoveConfigStore();
    
    return (
        <PageWrapper>
            <Flex align='center'>
                <h1 style={{ flex: 1 }}>Squid config</h1>
                <Flex gap={14}>
                    <Button
                        onClick={ () => openCreateModalOpen(true) }
                        leftSection={ <IconPlus size={ 16 }/> }
                    >
                        Create config
                    </Button>
                    <Button onClick={ () => refetchConfigs() }>
                        <IconRefresh/>
                    </Button>
                </Flex>
            </Flex>
            <ConfigsList configs={configs}/>
            <ConfigCreateModal
                opened={ isCreateModalOpen }
                onClose={ () => openCreateModalOpen(false) }
                onSubmit={ () => refetchConfigs() }
            />
            <ConfigEditModal
                opened={ isEditModalOpen }
                onClose={ () => setIsEdit(false) }
                onSubmit={ () => refetchConfigs() }
            />
            <ConfigRemoveModal
                opened={ isRemoveModalOpen }
                onClose={ () => setIsRemove(false) }
                onSubmit={ () => refetchConfigs() }
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