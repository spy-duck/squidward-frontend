import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router';

import styles from './ServerError.module.scss';

export function ErrorPageComponent() {
    const navigate = useNavigate()
    
    const handleRefresh = () => {
        navigate(0)
    }
    
    return (
        <Container className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.errorCode} >
                    500
                </div>
                <div className={styles.content}>
                    <Title className={styles.title}>Something bad just happened...</Title>
                    <Text c="dimmed" className={styles.description} size="lg" ta="center">
                        Try to refresh the page.
                    </Text>
                    <Group justify="center">
                        <Button onClick={ handleRefresh } size='md' variant='outline'>
                            Refresh the page
                        </Button>
                    </Group>
                </div>
            </div>
        </Container>
    )
}