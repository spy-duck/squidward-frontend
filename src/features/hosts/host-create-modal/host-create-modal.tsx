import { Modal, type ModalBaseProps } from '@mantine/core';
import { HostCreateForm } from '@/shared/components/forms';
import { HostCreateContract } from '@squidward/contracts/commands';
import { useCreateHost } from '@/shared/api';

type HostCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};
export function HostCreateModal({ onSubmit, ...modalProps }: HostCreateModalProps) {
    const { createHost, isPending } = useCreateHost({
        onSuccess: () => {
            onSubmit();
            modalProps.onClose();
        }
    });
    function formSubmitHandler(values: HostCreateContract.Request) {
        createHost(values);
    }
    return (
        <Modal {...modalProps} title='Create host' centered>
            <HostCreateForm
                onSubmit={formSubmitHandler}
                isPending={isPending}
            />
        </Modal>
    )
}