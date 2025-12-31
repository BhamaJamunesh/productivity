import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background bg-grid-white/[0.02]">
      <Card className="w-full max-w-md mx-4 bg-card/50 border-destructive/20 backdrop-blur-xl">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive animate-pulse" />
            <h1 className="text-2xl font-bold font-display text-destructive">Signal Lost</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The coordinates you are trying to access do not exist in the hunter database.
          </p>

          <div className="mt-8">
            <Link href="/">
               <Button variant="neon" className="w-full">
                 Return to Dashboard
               </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
