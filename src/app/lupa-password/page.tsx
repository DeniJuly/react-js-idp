"use client";
import { useState } from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";
import ChangePasswordForm from "./_components/change-password-form";
export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const handleChangeStep = (step: number, email: string) => {
    setStep(step);
    setEmail(email);
  };

  return (
    <div className="grid place-items-center h-screen">
      {step === 1 ? (
        <ForgotPasswordForm setStep={handleChangeStep} />
      ) : (
        <ChangePasswordForm email={email} />
      )}
    </div>
  );
}
