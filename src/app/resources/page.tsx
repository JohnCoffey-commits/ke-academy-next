import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";

export default function ResourcesPage() {
    return (
        <div className="bg-surface">
            <section className="relative h-screen overflow-hidden bg-black">
                {/* Background Video — hidden on mobile, visible md+ */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover hidden md:block"
                    aria-hidden="true"
                >
                    <source src="/videos/res_bg.mp4" type="video/mp4" />
                </video>

                {/* Desktop Content — visible md+ */}
                <div className="relative z-10 hidden md:block">
                    <Container className="pt-6 pb-20">
                        <h1 className="text-6xl font-bold tracking-[0.22em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                            RESOURCES
                        </h1>
                    </Container>
                </div>

                {/* Mobile Content — visible below md */}
                <div className="relative z-10 flex flex-col items-center h-full md:hidden px-6 pt-[30vh]">
                    <h1 className="text-5xl font-bold tracking-[0.18em] text-white">
                        RESOURCES
                    </h1>
                    <p className="mt-5 text-sm font-light tracking-widest text-white/50">
                        Scroll Down to Explore
                    </p>
                    <a
                        href="#resources-cards"
                        className="mt-5 flex items-center justify-center w-11 h-11 rounded-full border border-white/20 animate-bounce"
                        aria-label="Scroll to resources"
                    >
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </section>

            <section id="resources-cards" className="relative z-10 -mt-10 bg-black shadow-[0_-18px_40px_-32px_rgba(15,23,42,0.35)]">
                <Container className="py-16">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {resources.map((resource) => {
                            const href = resource.href ?? `/resources/${resource.id}`;
                            const linkProps = resource.isExternal
                                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                                : {};

                            return (
                                <Link
                                    key={resource.id}
                                    href={href}
                                    {...linkProps}
                                    className="group block w-full overflow-hidden rounded-[28px] border border-primary-100 bg-white shadow-soft aspect-[16/10]"
                                >
                                    <div className="flex h-full">
                                        <div className="relative h-full w-full flex-shrink-0 transition-all duration-500 ease-out motion-reduce:transition-none group-hover:w-[38%]">
                                            <Image
                                                src={resource.image}
                                                alt={resource.title}
                                                fill
                                                sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 90vw"
                                                className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[0.97]"
                                                style={{ objectPosition: resource.position ?? "center" }}
                                            />
                                        </div>
                                        <div className="w-0 opacity-0 transition-all duration-500 ease-out motion-reduce:transition-none group-hover:w-[62%] group-hover:opacity-100">
                                            <div className="h-full bg-white px-6 py-7">
                                                <p className="text-[11px] uppercase tracking-[0.3em] text-primary-400">
                                                    {resource.category}
                                                    {resource.isExternal && (
                                                        <span className="ml-2 inline-flex items-center">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </p>
                                                <h3 className="mt-4 text-2xl font-bold text-primary-900">
                                                    {resource.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </Container>
            </section>
        </div>
    );
}
