import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyrightLine } from "@/components/layout/CopyrightLine";

export function Footer() {
    return (
        <footer className="bg-primary-50 py-12 border-t border-primary-100">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                    {/* Brand */}
                    <div>
                        <h3 className="font-display text-lg font-bold text-primary-900 mb-4">KE Academy</h3>
                        <p className="text-primary-500 text-sm">
                            Defining excellence in education through rigorous curriculum and character building.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-primary-800 mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-primary-600">
                            <li>info@keacademy.com</li>
                            <li>+61 (02) 8840 9638</li>
                            <li>
                                <Link
                                    href="/about#contact"
                                    className="text-accent-coral font-medium"
                                >
                                    Get in touch &rarr;
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright with delayed-reveal signature */}
                <CopyrightLine />
            </Container>
        </footer>
    );
}
