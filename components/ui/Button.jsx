/* Simple Button component that can render as a link or a button */
export default function Button({ children, variant = "primary", href, onClick, className = "" }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm transition";
  const styles = variant === "secondary"
    ? "border border-slate-300 bg-white hover:bg-slate-50"
    : "bg-slate-900 text-white hover:opacity-90";
  const cls = base + " " + styles + " " + className;

  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}