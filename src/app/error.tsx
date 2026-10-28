"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div role="alert" className="empty-state">
      <h1>Rehber yüklenemedi.</h1>
      <p>
        Kaydettiğin plan bu cihazda saklanıyor. Sayfayı yeniden yüklemeyi dene.
      </p>
      <button className="button primary" onClick={reset}>
        Yeniden dene
      </button>
    </div>
  );
}
