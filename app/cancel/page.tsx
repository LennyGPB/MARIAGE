"use client";

import Navbar from "@/components/shared/Navbar";

export default function CancelPage() {
 
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Raté !</h1>
      <p>Votre compte a été mis à jour en premium.</p>
    </div>
    </>
  );
}
