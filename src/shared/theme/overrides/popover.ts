import { Popover } from '@mantine/core'

export default {
    Popover: Popover.extend({
        defaultProps: {
            radius: 'md',
            withArrow: true,
            transitionProps: { transition: 'pop', duration: 200 },
            shadow: 'md',
        }
    })
}