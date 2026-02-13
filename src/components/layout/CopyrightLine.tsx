"use client";

import { useRef, useState, useCallback } from "react";

const REVEAL_DELAY_MS = 3000;

export function CopyrightLine() {
    const [revealed, setRevealed] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        clearTimer();
        timerRef.current = setTimeout(() => {
            setRevealed(true);
        }, REVEAL_DELAY_MS);
    }, [clearTimer]);

    const handleMouseLeave = useCallback(() => {
        clearTimer();
        setRevealed(false);
    }, [clearTimer]);

    return (
        <div className="mt-12 pt-8 border-t border-primary-200 text-center text-xs text-primary-400">
            <span
                className="inline-block cursor-default select-none"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                &copy; {new Date().getFullYear()} KE Academy. All rights reserved.{" "}
                <span
                    className="transition-opacity duration-700 ease-in-out"
                    style={{ opacity: revealed ? 1 : 0 }}
                >
                    LIU JIELIN &amp; ZHENG PEIXIAN
                </span>
            </span>
        </div>
    );
}
