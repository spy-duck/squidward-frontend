import { Tooltip } from '@mantine/core'

export default {
    Tooltip: Tooltip.extend({
        defaultProps: {
            radius: 'md',
            withArrow: true,
            transitionProps: { transition: 'skew-up', duration: 200 },
            arrowSize: 2,
            color: 'gray'
        }
    })
}