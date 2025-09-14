import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type PageWrapperProps = {
    children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps): ReactNode {
    return (
        <motion.div
            initial={ {
                opacity: 0,
                translateX: 20,
            } }
            animate={ {
                opacity: 1,
                translateX: 0,
            } }
            transition={ {
                duration: 0.5,
                ease: [ 0, 0.71, 0.2, 1.01 ],
            } }
        >
            { children }
        </motion.div>
    )
}