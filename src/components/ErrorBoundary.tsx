import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('HelloLove Error Boundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen love-letters-bg flex items-center justify-center p-4">
          <Card className="letter-paper max-w-md w-full">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl font-playfair text-primary">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="text-base">
                Don't worry, our love is still strong! Let's get you back to your letters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Error Details:</p>
                  <p className="text-xs font-mono">{this.state.error.message}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={this.handleReset}
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleReload}
                  className="flex-1 bg-gradient-romantic hover:opacity-90"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground font-dancing">
                Made with love, even when things break ✨
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
