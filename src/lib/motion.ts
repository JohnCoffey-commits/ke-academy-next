export const transitions = {
    spring: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
    },
    ease: {
        type: "tween" as const,
        ease: "circOut",
        duration: 0.4
    }
};

export const variants = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    },
    slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: transitions.spring }
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }
};
