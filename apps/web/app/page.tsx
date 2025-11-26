import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Shield, TrendingUp, Calendar, Zap } from "lucide-react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col pt-[calc(50px+40px+40px)]">
      {/* Hero Section */}
      <div className="text-center flex flex-col items-center justify-center py-32">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Talk to your finances like a friend
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          No complicated forms or confusing spreadsheets. Just tell your AI
          assistant what you spent, and it handles the rest. It&apos;s that
          simple.
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/chat">Try it free</Link>
          </Button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto flex flex-col gap-64 px-8 max-w-5xl py-32">
        {/* Main Feature - Conversational AI */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Natural Conversation</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Forget filling out forms. Just chat naturally: &quot;I spent 250
              kr on groceries today&quot; or &quot;Add my monthly rent of 12,000
              kr&quot;. Your AI assistant understands context, asks clarifying
              questions when needed, and organizes everything automatically.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <div className="flex flex-col gap-3">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-sm">
                    I spent 450 kr on lunch with colleagues today
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-sm">
                    Got it! I&apos;ve added a 450 kr expense for today in the
                    Food category. Would you like me to track this as a
                    recurring expense or just this one time?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 gap-32 py-32">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">
                Smart Recurring Expenses
              </h3>
            </div>
            <p className="text-muted-foreground">
              Set up your rent, subscriptions, and bills once. Your assistant
              automatically tracks them every month, so you never forget a
              payment and always know what&apos;s coming up.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Instant Insights</h3>
            </div>
            <p className="text-muted-foreground">
              Ask questions like &quot;How much did I spend on food this
              month?&quot; or &quot;What are my recurring expenses?&quot; Get
              answers instantly without digging through spreadsheets or apps.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
            </div>
            <p className="text-muted-foreground">
              Log expenses in seconds. No need to open multiple apps or remember
              categories. Just type what happened, and you&apos;re done.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Your Data, Your Privacy</h3>
            </div>
            <p className="text-muted-foreground">
              Built with Swedish privacy standards in mind. Your financial data
              stays yours—we don&apos;t sell it, share it, or use it for
              advertising. Complete transparency and control.
            </p>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="py-32">
          <div className="bg-muted/30 rounded-lg p-8 border border-border relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-[-50%] right-0 w-full aspect-2/1 rotate-15 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Why this matters</h2>
            <div className="flex flex-col gap-4 text-muted-foreground">
              <p>
                Most people don&apos;t track their finances because it&apos;s
                too complicated or time-consuming. But understanding where your
                money goes is the first step to financial freedom.
              </p>
              <p>
                With Acme, there&apos;s no learning curve. No tutorials. No
                complex interfaces. Just talk to your assistant like you would
                talk to a friend, and watch your financial picture become clear.
              </p>
              <p>
                Whether you&apos;re saving for a vacation, paying off debt, or
                just want to know where your money goes, Acme makes it
                effortless.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands who are already managing their money the easy way.
            Start your first conversation in seconds.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/chat">Try it out</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
