import { Button, Container, Group, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router'


import styles from './NotFound.module.scss'
import { ROUTES } from '@/shared/constants/routes';



export function NotFoundPageComponent() {
    const navigate = useNavigate()
    
    const handleGoBack = () => {
        navigate(ROUTES.DASHBOARD.ROOT)
    }
    
    return (
        <Container className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.errorCode} >
                    404
                </div>
                <div className={styles.content}>
                    <Title className={styles.title}>Nothing to see here</Title>
                    <Text c="dimmed" className={styles.description} size="lg" ta="center">
                        Page you are trying to open does not exist. <br/>
                        You may have mistyped the address, or the page has been moved to another URL.
                    </Text>
                    <Group justify="center">
                        <Button onClick={ handleGoBack } size='md' variant='outline'>
                            Take me back to home page
                        </Button>
                    </Group>
                </div>
            </div>
        </Container>
    )
}