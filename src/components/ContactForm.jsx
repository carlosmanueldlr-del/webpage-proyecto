import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { staggerItem, EASE } from "../lib/motion";

const initialState = { name: "", email: "", message: "" };

function FormField({ id, label, type, value, onChange, error, fg, textarea }) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-2 opacity-60"
        style={{ color: fg }}
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={type}
        rows={textarea ? 3 : undefined}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent outline-none pb-2 text-base sm:text-lg placeholder:opacity-40 resize-none"
        style={{ color: fg, caretColor: fg }}
        placeholder={type === "email" ? "you@email.com" : textarea ? "Tell me about it..." : "Your name"}
      />
      <div className="relative h-[1.5px] w-full mt-1" style={{ background: `${fg}30` }}>
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{ background: fg }}
          initial={false}
          animate={{ width: focused || value ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs" style={{ color: fg, opacity: 0.85 }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ fg }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sent

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sent");
    setValues(initialState);
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <motion.form
      variants={staggerItem}
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-sm flex flex-col gap-5 sm:gap-6"
    >
      <FormField id="name" label="Name" type="text" value={values.name} onChange={handleChange} error={errors.name} fg={fg} />
      <FormField id="email" label="Email" type="email" value={values.email} onChange={handleChange} error={errors.email} fg={fg} />
      <FormField id="message" label="Message" type="text" textarea value={values.message} onChange={handleChange} error={errors.message} fg={fg} />

      <button
        type="submit"
        className="group inline-flex items-center gap-2 self-start text-sm sm:text-base font-semibold tracking-wide mt-1"
        style={{ color: fg }}
      >
        {status === "sent" ? (
          <>
            Message sent <Check size={16} />
          </>
        ) : (
          <>
            Send message
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </>
        )}
      </button>
    </motion.form>
  );
}
