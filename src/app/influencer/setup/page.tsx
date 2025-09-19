"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function InfluencerSetupPage() {
    const { width, height } = useWindowSize();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Setup Influencer Account
      </h1>

      <div className="mb-6">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">
          Step {step} of {totalSteps}
        </p>
      </div>

      {step === 1 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Become an Influencer</h2>
            <p className="text-sm text-muted-foreground">
              Earn by promoting products and sharing them with your audience.
            </p>
            <Button className="w-full" onClick={next}>
              Start Setup
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="mb-2">Display Name</Label>
              <Input placeholder="Enter your influencer name" />
            </div>
            <div>
              <Label className="mb-2">Social Handle</Label>
              <Input placeholder="@username or link" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
              <Button
                variant="outline"
                onClick={back}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <Button onClick={next} className="w-full sm:w-auto">
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <p className="text-sm">Upload verification docs (optional).</p>
            <Input type="file" />
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
              <Button
                variant="outline"
                onClick={back}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <Button onClick={next} className="w-full sm:w-auto">
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Influencer Guidelines</h2>
            <p className="text-sm text-muted-foreground">
              Please agree to our terms and influencer policies before
              proceeding.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">
                I agree to the Influencer Guidelines
              </Label>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
              <Button
                variant="outline"
                onClick={back}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <Button onClick={next} className="w-full sm:w-auto">
                Finish Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <Confetti
            width={width - 20}
            height={height - 20}
            recycle={false}
            numberOfPieces={3000}
          />
          <CardContent className="p-6 space-y-4 text-center">
            <h2 className="text-lg font-semibold">🎉 Setup Complete!</h2>
            <p className="text-sm text-muted-foreground">
              Your influencer account is now active.
            </p>
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/influencer/dashboard")}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
