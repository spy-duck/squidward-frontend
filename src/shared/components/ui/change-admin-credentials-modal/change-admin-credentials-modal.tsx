import React from 'react';
import { Modal } from '@mantine/core';
import { ChangeAdminCredentialsForm } from '@/shared/components/forms/change-admin-credentials-form';

type ChangePasswordModalProps = {};

export function ChangeAdminCredentialsModal({}: ChangePasswordModalProps): React.ReactElement {
    return (
        <Modal
            opened
            onClose={() => null}
            title="Change admin credentials is required"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            closeButtonProps={{
                disabled: true,
            }}
            centered
        >
            <ChangeAdminCredentialsForm />
        </Modal>
    );
}