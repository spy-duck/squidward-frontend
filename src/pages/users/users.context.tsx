import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { queryClient, useGetUsers } from '@/shared/api';
import { UsersListContract } from '@swuidward/contracts/commands';
import { useIsEditUserStore, useIsRemoveUserStore, useResetActionUserStore } from '@/entities/users/users-store';
import { QUERY_KEYS } from '@/shared/constants/api';

type TUsersPageContext = {
    users: UsersListContract.Response['response']['users'],
    isLoading: boolean,
    isCreateModalOpen: boolean,
    isEditModalOpen: boolean,
    isRemoveModalOpen: boolean,
    refetchUsers(): void,
    openCreateModalOpen: Dispatch<SetStateAction<boolean>>,
};


export const UsersPageContext = createContext<TUsersPageContext>({} as TUsersPageContext)

export const useUsersPageContext = () => useContext(UsersPageContext);

type TUsersPageContextProps = {
    children?: ReactNode
};
export const UsersPageProvider = ({ children }: TUsersPageContextProps) => {
    const [ isCreateModalOpen, openCreateModalOpen ] = useState(false);
    const [ isEditModalOpen ] = useIsEditUserStore();
    const [ isRemoveModalOpen ] = useIsRemoveUserStore();
    const { users, isLoading, refetchUsers } = useGetUsers();
    const resetAction = useResetActionUserStore();
    
    useEffect(() => {
        (async () => {
            await queryClient.prefetchQuery({
                queryKey: [ QUERY_KEYS.USERS.USERS_LIST ]
            });
        })();
        return () => {
            resetAction();
        }
    }, []);
    
    return (
        <UsersPageContext value={ {
            users: users || [],
            refetchUsers,
            isLoading,
            isCreateModalOpen,
            isEditModalOpen,
            isRemoveModalOpen,
            openCreateModalOpen,
        } }>
            { children }
        </UsersPageContext>
    );
    
}