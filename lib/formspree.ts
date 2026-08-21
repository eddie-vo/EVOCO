type FormspreeResult = { ok: true } | { ok: false; error: string }

export async function submitToFormspree(
  formId: string,
  data: FormData,
): Promise<FormspreeResult> {
  if (!formId) {
    return {
      ok: false,
      error: "Form endpoint is not configured. Add NEXT_PUBLIC_FORMSPREE_ID to your env.",
    }
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })

    if (response.ok) return { ok: true }

    const payload = (await response.json().catch(() => null)) as
      | { error?: string; errors?: Array<{ message?: string }> }
      | null

    const message =
      payload?.error ||
      payload?.errors?.map((item) => item.message).filter(Boolean).join(", ") ||
      "Something went wrong. Please try again."

    return { ok: false, error: message }
  } catch {
    return { ok: false, error: "Network error. Please try again." }
  }
}
