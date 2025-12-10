import { colorsTuple, createTheme, virtualColor } from '@mantine/core'

import components from './overrides'

export const theme = createTheme({
    components,
    cursorType: 'pointer',
    fontFamily: 'Montserrat, Twemoji Country Flags, sans-serif',
    fontFamilyMonospace: 'Fira Mono, monospace',
    breakpoints: {
        xs: '30em',
        sm: '40em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        '3xl': '120em',
        '4xl': '160em'
    },
    scale: 1,
    fontSmoothing: true,
    focusRing: 'never',
    primaryShade: 8,
    primaryColor: 'primary',
    autoContrast: true,
    luminanceThreshold: 0.3,
    headings: {
        fontWeight: '600'
    },
    defaultRadius: 'xs',
    colors: {
        squidward: colorsTuple('#759585'),
        primary:  virtualColor({
            name: 'primary',
            dark: 'squidward',
            light: 'cyan',
        }),
    },
})