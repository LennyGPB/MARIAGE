"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const updatePremium = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return;

      // Appelle une API route pour mettre à jour l’utilisateur (à faire ensuite)
      await fetch("/api/update-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      // Optionnel : rediriger vers le dashboard
      // router.push("/dashboard");
    };

    updatePremium();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Merci pour votre paiement !</h1>
      <p>Votre compte a été mis à jour en premium.</p>
    </div>
  );
}
