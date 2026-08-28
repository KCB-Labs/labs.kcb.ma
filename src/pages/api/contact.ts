import type { APIRoute } from "astro";

interface FormData {
  form_type: string;
  name: string;
  organization?: string;
  email: string;
  interest: string;
  message: string;
  honeypot: string;
}

interface ValidationResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string | string[]>;
}

function validateForm(data: FormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!data.interest || data.interest.trim() === "") {
    errors.interest = "Please select an interest";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  if (data.honeypot && data.honeypot.trim() !== "") {
    return { success: false, message: "Spam detected" };
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const data: FormData = {
      form_type: formData.get("form_type")?.toString() ?? "unknown",
      name: formData.get("name")?.toString() ?? "",
      organization: formData.get("organization")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      interest: formData.get("interest")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
      honeypot: formData.get("honeypot")?.toString() ?? "",
    };

    const validation = validateForm(data);

    if (!validation.success) {
      return new Response(JSON.stringify({
        success: false,
        message: validation.message || "Validation failed",
        errors: validation.errors
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      type: data.form_type,
      name: data.name,
      organization: data.organization,
      email: data.email,
      interest: data.interest,
      message: data.message.substring(0, 200) + (data.message.length > 200 ? "..." : "")
    };

    console.log("[CONTACT FORM]", JSON.stringify(logEntry, null, 2));

    return new Response(JSON.stringify({
      success: true,
      message: "Thank you! Your message has been sent."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[CONTACT FORM ERROR]", err);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};