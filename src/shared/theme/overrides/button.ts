import { Button } from '@mantine/core'

export default {
    Button: Button.extend({
        defaultProps: {
            radius: 'md',
            variant: 'outline',
            color: 'blue',
        }
    })
}