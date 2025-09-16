import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn } from "lucide-react";

interface AuthPageProps {
  onAuthenticated: (user: User) => void;
}

const AuthPage = ({ onAuthenticated }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          onAuthenticated(session.user);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        onAuthenticated(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [onAuthenticated]);

  const handleSignUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await handleSignIn(email, password);
      } else {
        result = await handleSignUp(email, password);
      }

      if (result.error) {
        if (result.error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else if (result.error.message.includes("User already registered")) {
          toast.error("This email is already registered. Please sign in instead.");
          setIsLogin(true);
        } else if (result.error.message.includes("Email not confirmed")) {
          toast.error("Please check your email and click the confirmation link");
        } else {
          toast.error(result.error.message);
        }
      } else {
        if (!isLogin) {
          toast.success("Please check your email for a confirmation link");
        } else {
          toast.success("Welcome back!");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-rose-200">
        <CardHeader className="text-center space-y-4">
          <div className="text-4xl">💕</div>
          <CardTitle className="text-2xl font-bold text-rose-800">
            {isLogin ? "Welcome Back" : "Join HelloLove"}
          </CardTitle>
          <p className="text-rose-600 text-sm">
            {isLogin 
              ? "Sign in to access your love letters" 
              : "Create your account to get started"
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-rose-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-rose-200 focus:border-rose-400"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-rose-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 border-rose-200 focus:border-rose-400"
                  required
                  disabled={loading}
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-rose-700">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 border-rose-200 focus:border-rose-400"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? "Processing..." : (
                <>
                  {isLogin ? <LogIn className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                  {isLogin ? "Sign In" : "Create Account"}
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-rose-600 hover:text-rose-700"
              disabled={loading}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>

          <p className="text-center text-xs text-rose-600 italic">
            Made with love, secured with care ✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;