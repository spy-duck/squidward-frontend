import { Fieldset } from '@mantine/core'

export default {
    Fieldset: Fieldset.extend({
        defaultProps: {
            radius: 'md',
            variant: 'outline'
        },
        styles: {
            root: {
                background: 'linear-gradient(104deg, #ffffff05 3.06%, #99999910 96.37%)',
                border: '1px solid hsla(0, 0%, 100%, .1)'
            }
        }
    })
}