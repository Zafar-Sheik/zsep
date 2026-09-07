import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="ZS Elite Partners home">
      <img
        src="/brand/icon.png"
        alt="ZS Elite Partners"
        className="brand-mark"
      />
      <span>
        <strong>ZS ELITE</strong>
        <small>PARTNERS</small>
      </span>
    </Link>
  );
}
