import { Button, Flex } from '@mantine/core';
import { useSetIsEditUserStore, useSetIsRemoveUserStore } from '@/entities/users/users-store';
import { UsersPageProvider, useUsersPageContext } from '@/pages/users/users.context';
import { UsersList } from '@/components/users/users-list';
import { UserCreateModal } from '@/components/users/user-create-modal';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { PageWrapper } from '@/shared/components/ui';
import { UserRemoveModal } from '@/components/users/user-remove-modal';
import { UserEditModal } from '@/components/users/user-edit-modal';

function UsersPageComponent() {
    const {
        users,
        isCreateModalOpen,
        refetchUsers,
        openCreateModalOpen,
        isEditModalOpen,
        isRemoveModalOpen,
    } = useUsersPageContext();
    
    const setIsEdit = useSetIsEditUserStore();
    const setIsRemove = useSetIsRemoveUserStore();
    
    return (
        <PageWrapper>
            <Flex align='center'>
                <h1 style={{ flex: 1 }}>Users</h1>
                <Flex gap={14}>
                    <Button
                        onClick={ () => openCreateModalOpen(true) }
                        leftSection={ <IconPlus size={ 16 }/> }
                    >
                        Create user
                    </Button>
                    <Button onClick={ () => refetchUsers() }>
                        <IconRefresh/>
                    </Button>
                </Flex>
            </Flex>
            <UsersList users={ users }/>
            <UserCreateModal
                opened={ isCreateModalOpen }
                onClose={ () => openCreateModalOpen(false) }
                onSubmit={ () => refetchUsers() }
            />
            <UserEditModal
                opened={ isEditModalOpen }
                onClose={ () => setIsEdit(false) }
                onSubmit={ () => refetchUsers() }
            />
            <UserRemoveModal
                opened={ isRemoveModalOpen }
                onClose={ () => setIsRemove(false) }
                onSubmit={ () => refetchUsers() }
            />
        </PageWrapper>
    )
}

export function UsersPage() {
    return (
        <UsersPageProvider>
            <UsersPageComponent/>
        </UsersPageProvider>
    )
}