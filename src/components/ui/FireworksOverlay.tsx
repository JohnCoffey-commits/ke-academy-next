"use client";

import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import fireworksAnimation from "../../../public/lottie/fireworks-success.json";

interface FireworksOverlayProps {
    /** Whether the fireworks should be visible and playing */
    show: boolean;
    /** Callback when animation completes */
    onComplete?: () => void;
}

/**
 * FireworksOverlay - A celebration animation overlay
 * 
 * Renders a full-section fireworks animation that plays once when triggered.
 * Does not block UI interactions (pointer-events: none).
 * 
 * Usage:
 * - Parent container must have `position: relative`
 * - Set `show={true}` to trigger the animation
 * - Animation automatically completes and calls `onComplete`
 */
export function FireworksOverlay({ show, onComplete }: FireworksOverlayProps) {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    // Control playback when show changes
    useEffect(() => {
        if (show && lottieRef.current) {
            // Reset to beginning and play
            lottieRef.current.goToAndPlay(0);
        }
    }, [show]);

    // Don't render if not showing
    if (!show) return null;

    return (
        <div
            className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={fireworksAnimation}
                autoplay={true}
                loop={false}
                onComplete={onComplete}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
}
