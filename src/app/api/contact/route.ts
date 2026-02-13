import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, type ContactFormData } from "@/lib/email";

// Phone validation patterns by country code (must match frontend)
const PHONE_PATTERNS: Record<string, RegExp> = {
    AU: /^[0-9]{9}$/,
    CN: /^[0-9]{11}$/,
    HK: /^[0-9]{8}$/,
    US: /^[0-9]{10}$/,
    GB: /^[0-9]{10}$/,
    NZ: /^[0-9]{9}$/,
    SG: /^[0-9]{8}$/,
    MY: /^[0-9]{9,10}$/,
    IN: /^[0-9]{10}$/,
    JP: /^[0-9]{10}$/,
    KR: /^[0-9]{9,10}$/,
    TW: /^[0-9]{9}$/,
    PH: /^[0-9]{10}$/,
    ID: /^[0-9]{9,12}$/,
    TH: /^[0-9]{9}$/,
    VN: /^[0-9]{9,10}$/,
};

// Dial codes by country
const DIAL_CODES: Record<string, string> = {
    AU: "+61",
    CN: "+86",
    HK: "+852",
    US: "+1",
    GB: "+44",
    NZ: "+64",
    SG: "+65",
    MY: "+60",
    IN: "+91",
    JP: "+81",
    KR: "+82",
    TW: "+886",
    PH: "+63",
    ID: "+62",
    TH: "+66",
    VN: "+84",
};

type RequestBody = {
    fullName?: string;
    email?: string;
    phone?: string;
    countryCode?: string;
    campus?: string | null;
    course?: string | null;
    message?: string;
};

type ValidationError = {
    field: string;
    message: string;
};

function validateRequest(body: RequestBody): { valid: boolean; errors: ValidationError[] } {
    const errors: ValidationError[] = [];

    // Required: Full Name
    if (!body.fullName || typeof body.fullName !== "string" || !body.fullName.trim()) {
        errors.push({ field: "fullName", message: "Full name is required" });
    } else if (body.fullName.trim().length > 100) {
        errors.push({ field: "fullName", message: "Full name must not exceed 100 characters" });
    }

    // Required: Email
    if (!body.email || typeof body.email !== "string" || !body.email.trim()) {
        errors.push({ field: "email", message: "Email is required" });
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            errors.push({ field: "email", message: "Please enter a valid email address" });
        }
    }

    // Required: Phone Number
    if (!body.phone || typeof body.phone !== "string" || !body.phone.trim()) {
        errors.push({ field: "phone", message: "Phone number is required" });
    } else {
        const countryCode = body.countryCode || "AU";
        const pattern = PHONE_PATTERNS[countryCode];
        if (pattern && !pattern.test(body.phone)) {
            errors.push({ field: "phone", message: "Please enter a valid phone number" });
        } else if (!pattern) {
            // Fallback: basic phone validation (at least 6 digits)
            if (!/^[0-9]{6,15}$/.test(body.phone)) {
                errors.push({ field: "phone", message: "Please enter a valid phone number" });
            }
        }
    }

    // Campus and Course must both be present or both be absent
    const hasCampus = body.campus && typeof body.campus === "string" && body.campus.trim();
    const hasCourse = body.course && typeof body.course === "string" && body.course.trim();

    if (hasCampus && !hasCourse) {
        errors.push({ field: "course", message: "Please also select a course" });
    }
    if (hasCourse && !hasCampus) {
        errors.push({ field: "campus", message: "Please also select a campus" });
    }

    // Message is required if neither campus nor course is selected
    if (!hasCampus && !hasCourse) {
        if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
            errors.push({ field: "message", message: "Message is required when no campus/course is selected" });
        }
    }

    // Message length validation
    if (body.message && typeof body.message === "string" && body.message.length > 100) {
        errors.push({ field: "message", message: "Message must not exceed 100 characters" });
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        let body: RequestBody;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        // Validate request
        const validation = validateRequest(body);
        if (!validation.valid) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    errors: validation.errors,
                },
                { status: 400 }
            );
        }

        // Generate server-side timestamp
        const timestamp = new Date().toLocaleString("en-AU", {
            timeZone: "Australia/Sydney",
            dateStyle: "full",
            timeStyle: "long",
        });

        // Get dial code for the country
        const countryCode = body.countryCode || "AU";
        const dialCode = DIAL_CODES[countryCode] || "+61";

        // Prepare email data
        const emailData: ContactFormData = {
            fullName: body.fullName!.trim(),
            email: body.email!.trim(),
            phone: body.phone!.trim(),
            countryCode,
            dialCode,
            campus: body.campus?.trim() || undefined,
            course: body.course?.trim() || undefined,
            message: body.message?.trim() || undefined,
            timestamp,
        };

        // Send email
        const result = await sendContactEmail(emailData);

        if (!result.success) {
            console.error("Email sending failed:", result.error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to send your message. Please try again later.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Your inquiry has been sent successfully.",
        });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "An unexpected error occurred. Please try again later.",
            },
            { status: 500 }
        );
    }
}
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("CONTACT_RECIPIENT:", process.env.CONTACT_RECIPIENT);
