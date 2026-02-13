"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SearchableDropdown, type DropdownOption } from "@/components/ui/SearchableDropdown";
import { PhoneInput, detectCountryFromLocale, COUNTRIES } from "@/components/ui/PhoneInput";
import { FireworksOverlay } from "@/components/ui/FireworksOverlay";
import { CAMPUSES } from "@/lib/data/campuses-22";
import { courses } from "@/content/courses";
import { cn } from "@/lib/utils";

// Contact information
const CONTACT_EMAIL = "info@keacademy.com";
const CONTACT_PHONE = "+61 2 1234 5678";

// Convert data to dropdown options
const CAMPUS_OPTIONS: DropdownOption[] = CAMPUSES.map(c => ({
    id: c.id,
    label: c.name,
    searchTerms: `${c.label} ${c.address}`,
}));

const COURSE_OPTIONS: DropdownOption[] = courses.map(c => ({
    id: c.id,
    label: c.title,
    searchTerms: `${c.category} ${c.priceLabel}`,
}));

// Campus options for the left column (with address info)
const CAMPUS_LOCATION_OPTIONS: DropdownOption[] = CAMPUSES.map(c => ({
    id: c.id,
    label: c.name,
    searchTerms: `${c.label} ${c.address}`,
}));

// Facebook icon component
function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

// WeChat icon component
function WeChatIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098c1.014.303 2.126.468 3.286.468.226 0 .451-.008.674-.022-.131-.45-.2-.919-.2-1.402 0-3.83 3.602-6.94 8.05-6.94.286 0 .568.016.846.042C17.373 4.963 13.478 2.188 8.691 2.188zm-2.26 5.363c-.58 0-1.051-.47-1.051-1.05 0-.58.471-1.05 1.051-1.05.58 0 1.05.47 1.05 1.05 0 .58-.47 1.05-1.05 1.05zm5.09 0c-.58 0-1.05-.47-1.05-1.05 0-.58.47-1.05 1.05-1.05.58 0 1.05.47 1.05 1.05 0 .58-.47 1.05-1.05 1.05zm6.529 3.27c-4.068 0-7.37 2.82-7.37 6.298 0 3.477 3.302 6.297 7.37 6.297a8.58 8.58 0 002.73-.445.748.748 0 01.611.084l1.58.927a.292.292 0 00.145.043c.132 0 .241-.108.241-.241 0-.062-.023-.117-.039-.175l-.328-1.235a.49.49 0 01.175-.553C23.147 20.205 24 18.421 24 16.52c0-3.478-3.302-6.299-7.37-6.299zm-2.477 3.63c.481 0 .872.39.872.87a.872.872 0 01-1.744 0c0-.48.39-.87.872-.87zm4.954 0c.48 0 .871.39.871.87a.871.871 0 01-1.743 0c0-.48.39-.87.872-.87z" />
        </svg>
    );
}

// Facebook share URL
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.keacademy.com.au";

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
    campus: DropdownOption | null;
    course: DropdownOption | null;
    message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// Google Maps embed URL generator
function getGoogleMapsEmbedUrl(address: string): string {
    const encoded = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encoded}&zoom=15`;
}

// Google Maps link for opening in new tab
function getGoogleMapsLink(address: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function InquirySection({ id }: { id?: string }) {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        countryCode: "AU",
        campus: null,
        course: null,
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showFireworks, setShowFireworks] = useState(false);
    const [selectedCampusLocation, setSelectedCampusLocation] = useState<DropdownOption | null>(
        CAMPUS_LOCATION_OPTIONS[0]
    );
    const [showWeChatModal, setShowWeChatModal] = useState(false);

    // Get selected campus data
    const selectedCampusData = useMemo(() => {
        if (!selectedCampusLocation) return CAMPUSES[0];
        return CAMPUSES.find(c => c.id === selectedCampusLocation.id) || CAMPUSES[0];
    }, [selectedCampusLocation]);

    // Detect country on mount
    useEffect(() => {
        const detected = detectCountryFromLocale();
        setFormData(prev => ({ ...prev, countryCode: detected }));
    }, []);

    // Validation logic
    const validate = useCallback((data: FormData): FormErrors => {
        const errs: FormErrors = {};

        // Always required
        if (!data.fullName.trim()) {
            errs.fullName = "Full name is required";
        }

        if (!data.email.trim()) {
            errs.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errs.email = "Please enter a valid email";
        }

        if (!data.phone.trim()) {
            errs.phone = "Phone number is required";
        } else {
            const country = COUNTRIES.find(c => c.code === data.countryCode);
            if (country && !country.pattern.test(data.phone)) {
                errs.phone = `Please enter a valid ${country.name} phone number`;
            }
        }

        // Campus & Course dependency
        const hasCampus = !!data.campus;
        const hasCourse = !!data.course;

        if (hasCampus && !hasCourse) {
            errs.course = "Please also select a course";
        }
        if (hasCourse && !hasCampus) {
            errs.campus = "Please also select a campus";
        }

        // Message required if neither campus nor course
        if (!hasCampus && !hasCourse && !data.message.trim()) {
            errs.message = "Message is required when no campus/course selected";
        }

        return errs;
    }, []);

    // Validate on data change
    useEffect(() => {
        const errs = validate(formData);
        setErrors(errs);
    }, [formData, validate]);

    const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

    const handleBlur = (field: keyof FormData) => {
        setTouched(prev => new Set(prev).add(field));
    };

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all as touched
        setTouched(new Set(Object.keys(formData) as (keyof FormData)[]));

        if (!isValid) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    countryCode: formData.countryCode,
                    campus: formData.campus?.label || null,
                    course: formData.course?.label || null,
                    message: formData.message || "",
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to send your message");
            }

            setSubmitStatus("success");
            setShowFireworks(true);
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            countryCode: detectCountryFromLocale(),
            campus: null,
            course: null,
            message: "",
        });
        setTouched(new Set());
        setSubmitStatus("idle");
        setSubmitError(null);
    };

    // Message requirement indicator
    const messageRequired = !formData.campus && !formData.course;

    return (
        <section id={id} className="relative bg-neutral-50 py-20 lg:py-28 scroll-mt-20">
            {/* Fireworks celebration overlay */}
            <FireworksOverlay
                show={showFireworks}
                onComplete={() => setShowFireworks(false)}
            />

            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                            Get in Touch
                        </h2>
                        <p className="text-primary-600 max-w-xl mx-auto">
                            Ready to start your child's academic journey? We'd love to hear from you.
                        </p>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Left Column: Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-primary-900 mb-6">
                                    Contact Information
                                </h3>

                                <div className="space-y-5">
                                    {/* Email */}
                                    <a
                                        href={`mailto:${CONTACT_EMAIL}`}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="p-3 bg-primary-100 text-primary-600 rounded-xl group-hover:bg-primary-200 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-primary-900">Email</p>
                                            <p className="text-primary-600 group-hover:text-primary-800 transition-colors">
                                                {CONTACT_EMAIL}
                                            </p>
                                        </div>
                                    </a>

                                    {/* Phone */}
                                    <a
                                        href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="p-3 bg-primary-100 text-primary-600 rounded-xl group-hover:bg-primary-200 transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-primary-900">Phone</p>
                                            <p className="text-primary-600 group-hover:text-primary-800 transition-colors">
                                                {CONTACT_PHONE}
                                            </p>
                                        </div>
                                    </a>

                                    {/* Campus Location with SearchableDropdown */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-primary-900 mb-2">Campus Location</p>
                                            <SearchableDropdown
                                                options={CAMPUS_LOCATION_OPTIONS}
                                                value={selectedCampusLocation}
                                                onChange={(opt) => setSelectedCampusLocation(opt)}
                                                placeholder="Select a campus..."
                                                maxVisible={5}
                                                id="campusLocation"
                                            />
                                            <p className="text-sm text-primary-500 mt-2">
                                                {selectedCampusData.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Maps Embed */}
                                <div className="mt-6">
                                    <a
                                        href={getGoogleMapsLink(selectedCampusData.address)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block group"
                                    >
                                        <div className="relative rounded-xl overflow-hidden shadow-sm border border-primary-100 h-48 bg-primary-50">
                                            <iframe
                                                src={getGoogleMapsEmbedUrl(selectedCampusData.address)}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen={false}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title={`Map of ${selectedCampusData.name}`}
                                                className="pointer-events-none"
                                            />
                                            {/* Overlay for click interaction */}
                                            <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 shadow-sm">
                                                    Open in Google Maps
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-4">
                                    Follow Us
                                </h4>
                                <div className="flex items-center gap-3">
                                    {/* Facebook */}
                                    <a
                                        href={FACEBOOK_SHARE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white border border-primary-200 rounded-xl text-primary-500 hover:border-primary-300 hover:text-blue-600 transition-all duration-200"
                                        aria-label="Facebook"
                                    >
                                        <FacebookIcon className="w-5 h-5" />
                                    </a>
                                    {/* WeChat */}
                                    <button
                                        onClick={() => setShowWeChatModal(true)}
                                        className="p-3 bg-white border border-primary-200 rounded-xl text-primary-500 hover:border-primary-300 hover:text-green-500 transition-all duration-200"
                                        aria-label="WeChat"
                                    >
                                        <WeChatIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Inquiry Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6 md:p-8">
                            {submitStatus === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                        ✓
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-900 mb-2">
                                        Inquiry Sent!
                                    </h3>
                                    <p className="text-primary-600 mb-6">
                                        Thank you for reaching out. We'll be in touch shortly.
                                    </p>
                                    <Button onClick={resetForm} variant="ghost">
                                        Send another inquiry
                                    </Button>
                                </motion.div>
                            ) : submitStatus === "error" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                        ✕
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-900 mb-2">
                                        Something Went Wrong
                                    </h3>
                                    <p className="text-primary-600 mb-6">
                                        {submitError || "Failed to send your message. Please try again."}
                                    </p>
                                    <Button onClick={() => setSubmitStatus("idle")} variant="ghost">
                                        Try again
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Full Name */}
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-primary-700 mb-1.5">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={(e) => updateField("fullName", e.target.value)}
                                            onBlur={() => handleBlur("fullName")}
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl border bg-white text-sm",
                                                "transition-all duration-200",
                                                "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400",
                                                touched.has("fullName") && errors.fullName
                                                    ? "border-red-300"
                                                    : "border-primary-200"
                                            )}
                                            placeholder="John Doe"
                                        />
                                        {touched.has("fullName") && errors.fullName && (
                                            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1.5">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                            onBlur={() => handleBlur("email")}
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl border bg-white text-sm",
                                                "transition-all duration-200",
                                                "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400",
                                                touched.has("email") && errors.email
                                                    ? "border-red-300"
                                                    : "border-primary-200"
                                            )}
                                            placeholder="john@example.com"
                                        />
                                        {touched.has("email") && errors.email && (
                                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <PhoneInput
                                        label="Phone Number"
                                        required
                                        id="phone"
                                        value={formData.phone}
                                        countryCode={formData.countryCode}
                                        onChange={(phone, code) => {
                                            updateField("phone", phone);
                                            updateField("countryCode", code);
                                        }}
                                        error={touched.has("phone") ? errors.phone : undefined}
                                    />

                                    {/* Campus */}
                                    <SearchableDropdown
                                        label="Campus"
                                        id="campus"
                                        options={CAMPUS_OPTIONS}
                                        value={formData.campus}
                                        onChange={(opt) => updateField("campus", opt)}
                                        placeholder="Select a campus..."
                                        error={touched.has("campus") ? errors.campus : undefined}
                                        maxVisible={5}
                                    />

                                    {/* Course */}
                                    <SearchableDropdown
                                        label="Course"
                                        id="course"
                                        options={COURSE_OPTIONS}
                                        value={formData.course}
                                        onChange={(opt) => updateField("course", opt)}
                                        placeholder="Select a course..."
                                        error={touched.has("course") ? errors.course : undefined}
                                        maxVisible={5}
                                    />

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-1.5">
                                            Message {messageRequired && <span className="text-red-500">*</span>}
                                            <span className="text-primary-400 font-normal ml-1">(max 100 characters)</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 100) {
                                                    updateField("message", e.target.value);
                                                }
                                            }}
                                            onBlur={() => handleBlur("message")}
                                            rows={3}
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl border bg-white text-sm resize-none",
                                                "transition-all duration-200",
                                                "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400",
                                                touched.has("message") && errors.message
                                                    ? "border-red-300"
                                                    : "border-primary-200"
                                            )}
                                            placeholder="How can we help you?"
                                        />
                                        <div className="flex justify-between items-center mt-1">
                                            {touched.has("message") && errors.message ? (
                                                <p className="text-xs text-red-500">{errors.message}</p>
                                            ) : (
                                                <span />
                                            )}
                                            <span className="text-xs text-primary-400">
                                                {formData.message.length}/100
                                            </span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full justify-center bg-[#C92F6B] hover:bg-[#a82559]"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            "Send Inquiry"
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </Container>

            {/* WeChat QR Modal */}
            <AnimatePresence>
                {showWeChatModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setShowWeChatModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-4">
                                <WeChatIcon className="w-12 h-12 text-green-500 mx-auto" />
                            </div>
                            <h3 className="text-lg font-bold text-primary-900 mb-2">
                                Scan to Connect on WeChat
                            </h3>
                            <div className="w-48 h-48 mx-auto bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                {/* <span className="text-primary-400 text-sm"></span> */}
                                <img src="images/wechat.jpeg" alt="WeChat QR Code" className="w-full h-full" />
                            </div>
                            <p className="text-sm text-primary-500 mb-4">
                                Scan this QR code with WeChat to connect with us.
                            </p>
                            <Button
                                onClick={() => setShowWeChatModal(false)}
                                variant="ghost"
                                size="sm"
                            >
                                Close
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
