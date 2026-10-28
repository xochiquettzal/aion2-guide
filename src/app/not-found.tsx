import Link from "next/link";
export default function NotFound() {
  return (
    <div className="empty-state">
      <h1>Bu sayfa bulunamadı.</h1>
      <p>İstediğin rehbere ulaşılamadı.</p>
      <Link href="/" className="button primary">
        Genel bakışa dön
      </Link>
    </div>
  );
}
