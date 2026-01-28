import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, BarChart3, Shield, Zap } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 py-20">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Shorten Links,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Amplify Impact
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Transform long, unwieldy URLs into short, memorable links. Track performance, 
              gain insights, and share with confidence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg px-8">
                無料で始める
              </Button>
            </SignUpButton>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-zinc-400 text-lg">
              Everything you need to manage and optimize your links
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Link2 className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-white">Custom Short Links</CardTitle>
                <CardDescription className="text-zinc-400">
                  Create branded, memorable short links that reflect your identity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle className="text-white">Analytics & Insights</CardTitle>
                <CardDescription className="text-zinc-400">
                  Track clicks, understand your audience, and measure engagement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle className="text-white">Secure & Reliable</CardTitle>
                <CardDescription className="text-zinc-400">
                  Enterprise-grade security to protect your links and data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <CardTitle className="text-white">Lightning Fast</CardTitle>
                <CardDescription className="text-zinc-400">
                  Optimized infrastructure ensures your links redirect instantly
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Ready to get started?
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  Join thousands of users who trust us to manage their links. 
                  Start shortening and tracking your URLs today.
                </p>
                <div className="pt-4">
                  <SignUpButton mode="modal">
                    <Button size="lg" variant="secondary" className="text-lg px-8">
                      Create Your Account
                    </Button>
                  </SignUpButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
