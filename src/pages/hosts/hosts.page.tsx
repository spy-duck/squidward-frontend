import { Button, Flex } from '@mantine/core';
import { PageWrapper } from '@/shared/components/ui';
import { IconPlus } from '@tabler/icons-react';
import { HostsPageProvider, useHostsPageContext } from './hosts.context';
import { HostCreateModal } from '@/features/hosts/host-create-modal';
import { HostRemoveModal } from '@/features/hosts/host-remove-modal';
import { HostsList } from '@/features/hosts/hosts-list';
import { useSetIsEditHostStore, useSetIsRemoveHostStore } from '@/entities';
import { HostEditModal } from '@/features/hosts/host-edit-modal';

function HostsPageComponent() {
    const {
        hosts,
        isCreateModalOpen,
        isEditModalOpen,
        isRemoveModalOpen,
        refetchHosts,
        openCreateModalOpen,
    } = useHostsPageContext();
    const setIsRemove = useSetIsRemoveHostStore();
    const setIsEdit = useSetIsEditHostStore();
    return (
        <PageWrapper>
            <Flex align='center'>
                <h1 style={ { flex: 1 } }>Hosts</h1>
                <Flex gap={ 14 }>
                    <Button
                        onClick={ () => openCreateModalOpen(true) }
                        leftSection={ <IconPlus size={ 16 }/> }
                    >
                        Create host
                    </Button>
                </Flex>
            </Flex>
            
            <HostsList hosts={ hosts }/>
            
            <HostCreateModal
                opened={ isCreateModalOpen }
                onClose={ () => openCreateModalOpen(false) }
                onSubmit={ () => refetchHosts() }
            />
            
            <HostEditModal
                opened={ isEditModalOpen }
                onClose={ () => setIsEdit(false) }
                onSubmit={ () => refetchHosts() }
            />
            <HostRemoveModal
                opened={ isRemoveModalOpen }
                onClose={ () => setIsRemove(false) }
                onSubmit={ () => refetchHosts() }
            />
        </PageWrapper>
    )
}

export function HostsPage() {
    return (
        <HostsPageProvider>
            <HostsPageComponent/>
        </HostsPageProvider>
    )
}