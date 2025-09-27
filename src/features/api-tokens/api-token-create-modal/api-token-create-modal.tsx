import { Modal, type ModalBaseProps } from '@mantine/core';
import { ApiTokenCreateForm } from '@/shared/components/forms/api-token-create';
import { ApiTokenCreateContract } from '@squidward/contracts/commands';
import { useCreateApiToken } from '@/shared/api';

type ApiTokenCreateModalProps = ModalBaseProps & {
    onSubmit(): void;
};
export function ApiTokenCreateModal({ onSubmit, ...modalProps }: ApiTokenCreateModalProps) {
    const { createApiToken, isPending } = useCreateApiToken({
        onSuccess: () => {
            onSubmit();
            modalProps.onClose();
        }
    });
    function formSubmitHandler(values: ApiTokenCreateContract.Request) {
        createApiToken(values);
    }
    return (
        <Modal {...modalProps} title='API Token Create Modal' centered>
            <ApiTokenCreateForm
                onSubmit={formSubmitHandler}
                isPending={isPending}
            />
        </Modal>
    )
}