// Marca de NoteOne: una hoja con la esquina doblada y la inicial.
export default function BrandMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="nb-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b9bff" />
          <stop offset="1" stopColor="#0066d6" />
        </linearGradient>
      </defs>
      <path d="M8 2h12l10 10v12a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill="url(#nb-grad)" />
      <path d="M20 2v6a4 4 0 0 0 4 4h6z" fill="#ffffff" fillOpacity="0.45" />
      <path d="M10.5 23v-10l9 10v-10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
