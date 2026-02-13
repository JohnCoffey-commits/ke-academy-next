import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";

export function generateStaticParams() {
    return resources.map((resource) => ({ id: resource.id }));
}

export default function ResourceDetailPage({ params }: { params: { id: string } }) {
    const resource = resources.find((item) => item.id === params.id);

    if (!resource) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-surface">
            <Container className="pt-24 pb-12">
                <Link href="/resources" className="text-sm font-semibold text-primary-600 hover:text-primary-900">
                    Back to Resources
                </Link>
                <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-primary-400">
                            {resource.category}
                        </p>
                        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-primary-900">
                            {resource.title}
                        </h1>
                        <p className="mt-6 text-primary-600 leading-relaxed">
                            {resource.summary}
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-soft">
                        <Image
                            src={resource.image}
                            alt={resource.title}
                            fill
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className="object-cover"
                            style={{ objectPosition: resource.position ?? "center" }}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
