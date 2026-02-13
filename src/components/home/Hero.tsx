"use client";

import Image from "next/image";

export function Hero() {
    return (
        <section className="relative h-[100vh] min-h-[600px] overflow-hidden bg-primary-900">
            <Image
                src="/Home_bg2.jpeg"
                alt="KE Academy hero background"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
        </section>
    );
}
