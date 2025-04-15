'use client'

import { motion } from 'framer-motion'

export default function Loader() {
    return (
        <div className="m-auto flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-4 h-4 rounded-full bg-primary"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}
