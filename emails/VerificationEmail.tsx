// /emails/VerificationEmail.tsx
import * as React from "react";
import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Button,
    Hr,
    Section,
    Img,
} from "@react-email/components";

interface VerificationEmailProps {
    email: string;
    verificationLink: string;
}

export default function VerificationEmail({ email, verificationLink }: VerificationEmailProps) {
    return (
        <Html>
            <Head>
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    `}
                </style>
            </Head>
            <Body
                style={{
                    backgroundColor: "#f0f9ff", // Light blue background
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    color: "#1e293b",
                    padding: "20px 0",
                    margin: "0",
                }}
            >
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        padding: "40px",
                        maxWidth: "500px",
                        margin: "0 auto",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)",
                        border: "1px solid #e0f2fe",
                    }}
                >
                    {/* Logo with Healthcare Theme */}
                    <Section style={{ textAlign: "center", marginBottom: "30px" }}>
                        <Img
                            src="https://maloofhealth.vercel.app/healthcare-logo.png" // Update with your healthcare logo URL
                            width="180"
                            height="60"
                            alt="Maloof Health Systems"
                            style={{ margin: "0 auto" }}
                        />
                    </Section>

                    {/* Header with Medical Icon (as text) */}
                    <Section style={{ textAlign: "center", marginBottom: "20px" }}>
                        <span style={{
                            fontSize: "48px",
                            lineHeight: "1",
                            display: "block",
                            marginBottom: "10px"
                        }}>
                            🏥
                        </span>
                        <Text style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            textAlign: "center",
                            background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            margin: "0",
                        }}>
                            Welcome to Maloof Health
                        </Text>
                    </Section>

                    {/* Greeting */}
                    <Text style={{
                        fontSize: "16px",
                        color: "#334155",
                        marginBottom: "10px",
                        textAlign: "center"
                    }}>
                        Hello <strong style={{ color: "#2563eb" }}>{email}</strong>,
                    </Text>

                    <Text style={{
                        textAlign: "center",
                        color: "#475569",
                        marginBottom: "25px",
                        lineHeight: "1.6",
                        fontSize: "15px"
                    }}>
                        Thank you for choosing Maloof Health Systems as your healthcare partner.
                        We're committed to providing you with exceptional, compassionate medical care.
                    </Text>

                    {/* Verification Box */}
                    <Section
                        style={{
                            backgroundColor: "#f0f9ff",
                            borderRadius: "12px",
                            padding: "30px 20px",
                            margin: "30px 0",
                            border: "1px solid #bae6fd",
                            textAlign: "center"
                        }}
                    >
                        <Text style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#0369a1",
                            marginBottom: "15px"
                        }}>
                            Verify Your Email Address
                        </Text>

                        <Text style={{
                            color: "#475569",
                            marginBottom: "25px",
                            fontSize: "14px",
                            lineHeight: "1.5"
                        }}>
                            Please verify your email address to activate your patient portal
                            and access your secure health records.
                        </Text>

                        <Button
                            href={verificationLink}
                            style={{
                                background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                                color: "#ffffff",
                                borderRadius: "50px",
                                padding: "14px 30px",
                                textDecoration: "none",
                                fontWeight: "600",
                                fontSize: "16px",
                                display: "inline-block",
                                boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Verify Email Address
                        </Button>
                    </Section>

                    {/* Security Features */}
                    <Section style={{ margin: "30px 0" }}>
                        <Text style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#334155",
                            marginBottom: "15px",
                            textAlign: "center"
                        }}>
                            🔒 Your Security Matters
                        </Text>

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            marginBottom: "20px",
                            textAlign: "center"
                        }}>
                            <span style={{ fontSize: "13px", color: "#475569" }}>✓ HIPAA Compliant</span>
                            <span style={{ fontSize: "13px", color: "#475569" }}>✓ 256-bit Encryption</span>
                            <span style={{ fontSize: "13px", color: "#475569" }}>✓ Secure Portal</span>
                        </div>
                    </Section>

                    {/* Help Text */}
                    <Text style={{
                        color: "#64748b",
                        fontSize: "13px",
                        textAlign: "center",
                        lineHeight: "1.5",
                        marginBottom: "20px"
                    }}>
                        If you didn't create an account at Maloof Health Systems,
                        please disregard this email. No further action is required.
                    </Text>

                    <Hr style={{
                        borderColor: "#e2e8f0",
                        margin: "30px 0 20px 0",
                        borderTop: "1px solid #e2e8f0"
                    }} />

                    {/* Footer with Contact Info */}
                    <Section style={{ textAlign: "center" }}>
                        <Text style={{
                            fontSize: "13px",
                            color: "#64748b",
                            marginBottom: "10px"
                        }}>
                            <strong>Maloof Health Systems</strong>
                        </Text>
                        <Text style={{
                            fontSize: "12px",
                            color: "#94a3b8",
                            marginBottom: "5px"
                        }}>
                            700 West Elm Street, Dallas, TX 75201
                        </Text>
                        <Text style={{
                            fontSize: "12px",
                            color: "#94a3b8",
                            marginBottom: "5px"
                        }}>
                            📞 (214) 555-0423 | 📧 care@maloofhealth.com
                        </Text>
                        <Text style={{
                            fontSize: "11px",
                            color: "#94a3b8",
                            marginTop: "15px"
                        }}>
                            © {new Date().getFullYear()} Maloof Health Systems. All rights reserved.
                        </Text>
                        <Text style={{
                            fontSize: "10px",
                            color: "#cbd5e1",
                            marginTop: "10px"
                        }}>
                            This is a secure, automated message from Maloof Health Systems.
                        </Text>
                    </Section>

                    {/* Trust Badge */}
                    <Section style={{
                        marginTop: "20px",
                        textAlign: "center",
                        backgroundColor: "#f8fafc",
                        padding: "10px",
                        borderRadius: "8px",
                    }}>
                        <Text style={{
                            fontSize: "10px",
                            color: "#64748b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px"
                        }}>
                            <span>🏥</span> Your health information is protected and confidential
                        </Text>
                    </Section>
                </Container>

                {/* Background Pattern (subtle) */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: "radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                    zIndex: -1,
                }} />
            </Body>
        </Html>
    );
}

// Also create a Forgot Password Email template for completeness
export function ForgotPasswordEmail({ email, resetLink }: { email: string; resetLink: string }) {
    return (
        <Html>
            <Head>
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    `}
                </style>
            </Head>
            <Body
                style={{
                    backgroundColor: "#f0f9ff",
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    color: "#1e293b",
                    padding: "20px 0",
                    margin: "0",
                }}
            >
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        padding: "40px",
                        maxWidth: "500px",
                        margin: "0 auto",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e0f2fe",
                    }}
                >
                    <Section style={{ textAlign: "center", marginBottom: "30px" }}>
                        <Img
                            src="https://maloofhealth.vercel.app/healthcare-logo.png"
                            width="180"
                            height="60"
                            alt="Maloof Health Systems"
                            style={{ margin: "0 auto" }}
                        />
                    </Section>

                    <Section style={{ textAlign: "center", marginBottom: "20px" }}>
                        <span style={{ fontSize: "48px", display: "block", marginBottom: "10px" }}>
                            🔐
                        </span>
                        <Text style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            margin: "0",
                        }}>
                            Reset Your Password
                        </Text>
                    </Section>

                    <Text style={{
                        fontSize: "16px",
                        color: "#334155",
                        marginBottom: "10px",
                        textAlign: "center"
                    }}>
                        Hello <strong style={{ color: "#2563eb" }}>{email}</strong>,
                    </Text>

                    <Text style={{
                        textAlign: "center",
                        color: "#475569",
                        marginBottom: "25px",
                        lineHeight: "1.6"
                    }}>
                        We received a request to reset the password for your Maloof Health patient account.
                        Click the button below to create a new password.
                    </Text>

                    <Section
                        style={{
                            backgroundColor: "#f0f9ff",
                            borderRadius: "12px",
                            padding: "30px 20px",
                            margin: "30px 0",
                            border: "1px solid #bae6fd",
                            textAlign: "center"
                        }}
                    >
                        <Button
                            href={resetLink}
                            style={{
                                background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                                color: "#ffffff",
                                borderRadius: "50px",
                                padding: "14px 30px",
                                textDecoration: "none",
                                fontWeight: "600",
                                fontSize: "16px",
                                display: "inline-block",
                                boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
                            }}
                        >
                            Reset Password
                        </Button>

                        <Text style={{
                            color: "#64748b",
                            fontSize: "13px",
                            marginTop: "20px"
                        }}>
                            This link will expire in 1 hour for security reasons.
                        </Text>
                    </Section>

                    <Text style={{
                        color: "#64748b",
                        fontSize: "13px",
                        textAlign: "center",
                        marginBottom: "20px"
                    }}>
                        If you didn't request a password reset, please ignore this email
                        or contact our support team if you have concerns.
                    </Text>

                    <Hr style={{ borderColor: "#e2e8f0", margin: "30px 0 20px 0" }} />

                    <Section style={{ textAlign: "center" }}>
                        <Text style={{ fontSize: "12px", color: "#94a3b8" }}>
                            Need help? Contact our support team at support@maloofhealth.com
                        </Text>
                        <Text style={{ fontSize: "11px", color: "#94a3b8", marginTop: "10px" }}>
                            © {new Date().getFullYear()} Maloof Health Systems
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}