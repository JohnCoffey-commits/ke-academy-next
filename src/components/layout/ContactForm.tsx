"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Send } from "lucide-react";

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Form logic: Open Gmail or mailto
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        window.open(`mailto:info@keacademy.com?subject=Inquiry from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`);

        setStatus("success");
    };

    if (status === "success") {
        return (
            <Card className="text-center py-12 bg-primary-50 border-accent-teal">
                <div className="w-16 h-16 bg-accent-teal text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">Message Sent!</h3>
                <p className="text-primary-600 mb-6">Thank you for your inquiry. We will be in touch shortly.</p>
                <Button onClick={() => setStatus("idle")} variant="ghost">Send another message</Button>
            </Card>
        );
    }

    return (
        <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-xl border-primary-200 bg-surface shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-4"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-xl border-primary-200 bg-surface shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-4"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-primary-700 mb-1">Area of Interest</label>
                    <select
                        id="interest"
                        name="interest"
                        className="w-full rounded-xl border-primary-200 bg-surface shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-4"
                    >
                        <option>General Inquiry</option>
                        <option>Primary School Enrollment</option>
                        <option>High School Enrollment</option>
                        <option>Holiday Programs</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full rounded-xl border-primary-200 bg-surface shadow-sm focus:border-primary-500 focus:ring-primary-500 py-3 px-4"
                        placeholder="How can we help you?"
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? "Sending..." : (
                        <>Send Inquiry <Send className="ml-2 h-4 w-4" /></>
                    )}
                </Button>
            </form>
        </Card>
    );
}
