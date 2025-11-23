"use client";

import { useState, useEffect } from "react";
import { useSignIn, useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthenticatePage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailAddressId, setEmailAddressId] = useState<string | null>(null);
  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push(redirectUrl);
    }
  }, [isSignedIn, router, redirectUrl]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!signIn) {
        setError("Sign-in not available. Please refresh the page.");
        return;
      }

      // First, try to sign in (send OTP code)
      await signIn.create({
        identifier: email,
      });

      // Check if signIn status is correct
      if (signIn.status !== "needs_first_factor") {
        setError("Unexpected sign-in status. Please try again.");
        return;
      }

      // Extract emailAddressId from supported first factors
      // Property name is camelCase: emailAddressId (not email_address_id)
      const factors = signIn.supportedFirstFactors || [];

      // Find the email_code factor
      const emailFactor = factors.find(
        (factor: any) => factor?.strategy === "email_code"
      ) as any;

      if (!emailFactor) {
        setError("Email verification not available for this account.");
        return;
      }

      // Get emailAddressId - property name is camelCase
      const emailAddressId = emailFactor.emailAddressId;

      if (!emailAddressId) {
        setError("Email verification not available for this account.");
        return;
      }

      setEmailAddressId(emailAddressId);

      // Prepare email code verification with email_address_id
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailAddressId,
      });

      setIsSignUp(false);
      setCodeSent(true);
    } catch (err: any) {
      // If user doesn't exist, try to sign up (auto-registration)
      if (
        err.errors?.[0]?.code === "form_identifier_not_found" ||
        err.errors?.[0]?.message?.toLowerCase().includes("not found") ||
        err.errors?.[0]?.message?.toLowerCase().includes("doesn't exist")
      ) {
        try {
          if (!signUp) {
            setError("Sign-up not available. Please refresh the page.");
            return;
          }

          // Create new account
          await signUp.create({
            emailAddress: email,
          });

          // Prepare email code verification for sign up
          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });

          setIsSignUp(true);
          setCodeSent(true);
        } catch (signUpErr: any) {
          setError(
            signUpErr.errors?.[0]?.message || "Failed to send verification code"
          );
        }
      } else {
        setError(
          err.errors?.[0]?.message || "Failed to send verification code"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!signUp) {
          setError("Sign-up not available. Please refresh the page.");
          return;
        }

        // Verify code for sign-up
        const signUpResult = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (signUpResult.status === "complete") {
          if (setActive && signUpResult.createdSessionId) {
            await setActive({ session: signUpResult.createdSessionId });
            router.push(redirectUrl);
          } else {
            setError("Failed to create session. Please try again.");
          }
        } else {
          setError("Verification failed. Please try again.");
        }
      } else {
        if (!signIn) {
          setError("Sign-in not available. Please refresh the page.");
          return;
        }

        // Verify code for sign-in
        if (!emailAddressId) {
          setError("Email address ID not found. Please try again.");
          setIsLoading(false);
          return;
        }

        const signInResult = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code,
        });

        if (signInResult.status === "complete") {
          if (setActive && signInResult.createdSessionId) {
            await setActive({ session: signInResult.createdSessionId });
            router.push(redirectUrl);
          } else {
            setError("Failed to create session. Please try again.");
          }
        } else {
          setError("Additional authentication steps required");
        }
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          {!codeSent ? (
            <form onSubmit={handleSendCode}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <a
                    href="#"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <div className="flex size-8 items-center justify-center rounded-md">
                      <GalleryVerticalEnd className="size-6" />
                    </div>
                    <span className="sr-only">Acme Inc.</span>
                  </a>
                  <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
                  <FieldDescription>
                    Don&apos;t have an account? We&apos;ll create one for you.
                  </FieldDescription>
                </div>

                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </Field>

                <Field>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Sending code..." : "Continue"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <a
                    href="#"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <div className="flex size-8 items-center justify-center rounded-md">
                      <GalleryVerticalEnd className="size-6" />
                    </div>
                    <span className="sr-only">Acme Inc.</span>
                  </a>
                  <h1 className="text-xl font-bold">Check your email</h1>
                  <FieldDescription>
                    We&apos;ve sent a verification code to {email}
                  </FieldDescription>
                </div>

                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="code">Verification Code</FieldLabel>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    required
                    disabled={isLoading}
                    maxLength={6}
                    autoComplete="one-time-code"
                  />
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={isLoading || code.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}

          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
