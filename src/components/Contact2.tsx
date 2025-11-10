import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell me a little more"),
});
type FormValues = z.infer<typeof Schema>;

type Contact2Props = {
  directEmail: string;
  phone?: string;
  office?: { lines: string[] };
  socials?: { label: string; href: string }[];
};

export function Contact2({
  directEmail,
  phone = "",
  office = { lines: [] },
  socials = [],
}: Contact2Props): ReactElement {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);
  const reduceMotion = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormValues): Promise<void> => {
    // Rate limit check
    const now = Date.now();
    if (now < cooldownUntil) {
      setStatus("err");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      reset();
      setCooldownUntil(Date.now() + 60000); // 60s cooldown
    } catch {
      setStatus("err");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      className="relative min-h-screen"
      style={{ background: "var(--surface)", color: "var(--text)" }}
    >
      <style>{`
        input:focus, textarea:focus { 
          border-color: var(--focus) !important; 
        }
        ::placeholder { 
          color: color-mix(in oklab, var(--text) 55%, transparent); 
        }
      `}</style>
      
      <div className="grid lg:grid-cols-[60%_40%] min-h-screen">
        {/* Left: form */}
        <div
          className="p-8 md:p-16 lg:p-24 flex flex-col justify-center"
        >
          <div 
            className="w-full max-w-[760px] rounded-2xl p-8 md:p-12"
            style={{ 
              background: "var(--surface-2)", 
              border: "1px solid var(--line)" 
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
            <p
              className="text-xs tracking-[0.5em] uppercase mb-6"
              style={{ color: 'color-mix(in oklab, white 50%, transparent)' }}
            >
              [Form]
            </p>

            <h2
              className="text-6xl md:text-8xl tracking-tighter leading-[0.9] mb-10"
              style={{ color: 'color-mix(in oklab, white 95%, transparent)' }}
            >
              Start a
              <br />
              Project
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
              {/* Name */}
              <Field
                id="name"
                label="Your Name"
                type="text"
                autoComplete="name"
                register={register}
                error={errors.name?.message}
              />
              {/* Email */}
              <Field
                id="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                register={register}
                error={errors.email?.message}
              />
              {/* Company */}
              <Field
                id="company"
                label="Company"
                type="text"
                autoComplete="organization"
                register={register}
                error={errors.company?.message}
              />
              {/* Budget */}
              <BudgetField
                id="budget"
                label="Budget Range"
                register={register}
                error={errors.budget?.message}
              />

              {/* Message */}
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-err" : undefined}
                  rows={5}
                  placeholder="Tell me about your project"
                  className="w-full bg-transparent border-b pb-4 text-[18px] leading-6 outline-none resize-y transition-[border-color,border-width] duration-150"
                  style={{
                    borderColor: "var(--line)",
                    color: "var(--text)",
                    borderWidth: "1.25px",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--focus)";
                    e.currentTarget.style.borderWidth = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--line)";
                    e.currentTarget.style.borderWidth = "1.25px";
                  }}
                />
                {errors.message && (
                  <p id="message-err" className="mt-2 text-sm" style={{ color: "var(--danger, #b00020)" }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website" as keyof FormValues)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex items-center gap-4 pt-4 disabled:opacity-60"
              >
                <span
                  className="text-3xl md:text-4xl tracking-tighter"
                  style={{ color: 'color-mix(in oklab, white 95%, transparent)' }}
                >
                  {status === "sending" ? "Sending…" : "Send inquiry"}
                </span>
                <span
                  className="inline-flex w-10 h-10 rounded-full border-2 items-center justify-center transition-transform group-hover:translate-x-1"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  →
                </span>
              </button>

              {/* Privacy note */}
              <p className="text-xs opacity-60" style={{ color: 'color-mix(in oklab, white 60%, transparent)' }}>
                Your information is never shared. I'll reply within 24 hours.
              </p>

              {/* Live region for feedback */}
              <div aria-live="polite" className="mt-3 text-sm">
                {status === "ok" && (
                  <span style={{ color: "var(--success, oklch(55% 0.1 150))" }}>
                    Thanks — I'll reply soon.
                  </span>
                )}
                {status === "err" && (
                  <span style={{ color: "var(--danger, oklch(45% 0.12 28))" }}>
                    Something went wrong. Try again or email me.
                  </span>
                )}
              </div>
            </form>
            </motion.div>
          </div>
        </div>

        {/* Right: info */}
        <div
          className="p-8 md:p-16 flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen"
          style={{ color: 'color-mix(in oklab, white 85%, transparent)' }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 50 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <p
              className="text-xs tracking-[0.5em] uppercase mb-8"
              style={{ color: 'color-mix(in oklab, white 50%, transparent)' }}
            >
              [Info]
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl mb-3" style={{ color: "var(--accent)" }}>
                  Direct Contact
                </h3>
                <div className="space-y-2">
                  <a
                    className="block text-xl underline-offset-4 hover:underline focus-ring"
                    style={{ color: 'color-mix(in oklab, white 90%, transparent)' }}
                    href={`mailto:${directEmail}`}
                  >
                    {directEmail}
                  </a>
                  {phone && (
                    <a
                      className="block text-xl underline-offset-4 hover:underline focus-ring"
                      style={{ color: 'color-mix(in oklab, white 90%, transparent)' }}
                      href={`tel:${phone.replace(/\D/g, "")}`}
                    >
                      {phone}
                    </a>
                  )}
                </div>
              </div>

              {office.lines.length > 0 && (
                <div>
                  <h3 className="text-2xl mb-3" style={{ color: "var(--warm-tan)" }}>
                    Office
                  </h3>
                  <p
                    className="text-xl leading-relaxed"
                    style={{ color: "var(--warm-lightest)" }}
                  >
                    {office.lines.map((l, i) => (
                      <span key={i}>
                        {l}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              )}

              {socials.length > 0 && (
                <div>
                  <h3 className="text-2xl mb-3" style={{ color: "var(--accent)" }}>
                    Follow
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="text-lg hover:translate-y-[-3px] transition-transform focus-ring"
                        style={{ color: 'color-mix(in oklab, white 90%, transparent)' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* — helpers — */
type FieldProps = {
  id: keyof FormValues;
  label: string;
  type: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "email" | "tel" | "url" | "search" | "none" | "decimal";
  register: ReturnType<typeof useForm<FormValues>>["register"];
  error?: string;
};
function Field({ id, label, type, autoComplete, inputMode, register, error }: FieldProps): ReactElement {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="w-full bg-transparent border-b pb-4 text-[18px] leading-6 outline-none transition-[border-color,border-width] duration-150"
        style={{
          borderColor: "var(--warm-stone)",
          color: "var(--primary)",
          borderWidth: "1.25px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.borderWidth = "2px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--warm-stone)";
          e.currentTarget.style.borderWidth = "1px";
        }}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm" style={{ color: "var(--danger, #b00020)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* — Budget field with masking — */
type BudgetFieldProps = {
  id: keyof FormValues;
  label: string;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  error?: string;
};
function BudgetField({ id, label, register, error }: BudgetFieldProps): ReactElement {
  const [displayValue, setDisplayValue] = useState("");

  const formatBudget = (val: string): string => {
    // Extract numbers only
    const nums = val.replace(/\D/g, "");
    if (!nums) return "";
    // Format as $Xk (e.g., "5000" → "$5k")
    const k = Math.floor(parseInt(nums) / 1000);
    return k > 0 ? `$${k}k` : `$${nums}`;
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        {...register(id)}
        inputMode="numeric"
        placeholder={label}
        value={displayValue}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          setDisplayValue(formatBudget(e.target.value));
          // Store raw value in form
          e.target.value = raw;
        }}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="w-full bg-transparent border-b pb-4 text-[18px] leading-6 outline-none transition-[border-color,border-width] duration-150"
        style={{
          borderColor: "var(--warm-stone)",
          color: "var(--primary)",
          borderWidth: "1.25px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.borderWidth = "2px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--warm-stone)";
          e.currentTarget.style.borderWidth = "1px";
        }}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm" style={{ color: "var(--danger, #b00020)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
