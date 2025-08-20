export function Input(props) {
  return <input {...props} className={`w-full border border-slate-300 rounded-2xl px-3 py-2 outline-none focus:ring focus:ring-slate-200 ${props.className||""}`} />;
}
export function Textarea(props) {
  return <textarea {...props} className={`w-full border border-slate-300 rounded-2xl px-3 py-2 outline-none focus:ring focus:ring-slate-200 ${props.className||""}`} />;
}