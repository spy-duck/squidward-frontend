import { Modal, type ModalBaseProps } from '@mantine/core';
import { HostUpdateContract } from '@squidward/contracts/commands';
import { useUpdateHost } from '@/shared/api';
import { HostEditForm } from '@/shared/components/forms/host-edit';
import { useActionHostStore, useResetActionUserStore } from '@/entities';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

type HostEditModalProps = ModalBaseProps & {
    onSubmit(): void;
};

export function HostEditModal({ onSubmit, ...modalProps }: HostEditModalProps) {
    const { updateHost, isPending } = useUpdateHost({
        onSuccess: () => {
            onSubmit();
            modalProps.onClose();
        },
    });
    
    const host = useActionHostStore();
    const resetAction = useResetActionUserStore();
    
    const form = useForm<HostUpdateContract.Request>({
        mode: 'uncontrolled',
        validate: zod4Resolver(
            HostUpdateContract.RequestSchema,
        ),
    });
    
    useEffect(() => {
        if (modalProps.opened && host) {
            form.setValues({
                uuid: host.uuid,
                name: host.name,
                url: host.url,
                countryCode: host.countryCode,
                nodeId: host.nodeId,
                enabled: host.enabled,
            });
        }
    }, [ modalProps.opened ]);
    
    function closeHandler() {
        resetAction();
        form.reset();
        modalProps.onClose();
    }
    
    function formSubmitHandler(values: HostUpdateContract.Request) {
        updateHost(values);
    }
    
    
    return (
        <Modal { ...modalProps } onClose={closeHandler} title='Edit host' centered>
            <HostEditForm
                form={ form }
                onSubmit={ formSubmitHandler }
                isPending={ isPending }
            />
        </Modal>
    )
}