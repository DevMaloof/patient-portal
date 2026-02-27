// /app/api/email/verify/route.ts
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";

export async function POST(req: Request) {
    try {
        const { email, token } = await req.json();

        if (!email || !token) {
            return NextResponse.json({ message: "Missing email or token" }, { status: 400 });
        }

        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

        // Send the email via Resend with healthcare branding
        const data = await resend.emails.send({
            from: "Maloof Health Systems <verify@maloofhealth.com>",
            to: email,
            subject: "Verify your email — Maloof Health Systems",
            react: VerificationEmail({ email, verificationLink }),
            headers: {
                'X-Entity-Ref-ID': 'healthcare-verification',
                'X-Priority': '1',
                'X-MC-PreserveRecipients': 'false',
            },
            tags: [
                { name: 'category', value: 'verification' },
                { name: 'environment', value: process.env.NODE_ENV || 'production' },
            ],
        });

        console.log(`✅ Verification email sent to ${email}:`);

        return NextResponse.json({
            success: true,
            data,
            message: "Verification email sent successfully"
        }, { status: 200 });

    } catch (error: any) {
        console.error("❌ Error sending verification email:", error);

        // More specific error response
        return NextResponse.json(
            {
                message: "Failed to send verification email",
                error: error.message,
                code: error.statusCode || 500
            },
            { status: error.statusCode || 500 }
        );
    }
}