import { useState } from "react";
import { ArrowUpRight, Check, Copy, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addRobinhoodChain } from "@/lib/add-network";
import { CONTRACT_UNSET, SITE } from "@/lib/site";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#buy", label: "Buy" },
  { href: "#community", label: "Links" },
];

function closeMenu() {
  const toggle = document.getElementById("site-menu-toggle");
  if (toggle instanceof HTMLInputElement) toggle.checked = false;
}

export function HamsterHome() {
  const [copied, setCopied] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<string | null>(null);

  async function copyCa() {
    try {
      await navigator.clipboard.writeText(SITE.contract);
    } catch {
      /* clipboard may be blocked in some embeds */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  async function addNetwork() {
    try {
      const result = await addRobinhoodChain();
      if (result === "no-wallet") {
        setNetworkStatus("No wallet in this browser. Use Robinhood Wallet or MetaMask.");
        return;
      }
      setNetworkStatus("Robinhood Chain is in your wallet.");
    } catch {
      setNetworkStatus("Wallet closed the request.");
    }
  }

  return (
    <div className="min-h-dvh overflow-x-clip bg-bg text-fg">
      <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-md">
        <input id="site-menu-toggle" type="checkbox" className="peer sr-only" />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a
            href="#home"
            className="flex min-w-0 items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
            onClick={closeMenu}
          >
            <img
              src="/hamster.png"
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full border border-border bg-card object-contain"
            />
            {SITE.name}
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="sm">
              <a href="#buy" onClick={closeMenu}>
                Buy {SITE.name}
              </a>
            </Button>
            <label
              htmlFor="site-menu-toggle"
              className="grid size-12 place-items-center rounded-full border border-border bg-card text-fg"
              aria-label="Open menu"
            >
              <span className="menu-bars">
                <span />
                <span />
                <span />
              </span>
            </label>
          </div>
        </div>
        <nav id="site-menu" className="border-t border-border bg-bg">
          <div className="mx-auto flex max-w-6xl flex-col px-2 py-2 sm:px-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3.5 text-base font-medium hover:bg-card"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="scroll-mt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-2 lg:pt-16 lg:pb-20">
            <div>
              <p className="mb-4 text-sm text-muted">
                Art by {SITE.artistHandle} · on Robinhood Chain
              </p>
              <h1 className="font-display text-[clamp(3rem,11vw,6.4rem)] leading-[0.9] font-semibold tracking-[-0.04em]">
                JUST A
                <br />
                <span className="text-accent">HAMSTER.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted">
                Blank face. Pink nose. No utility. That’s the coin.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={SITE.uniswapUrl} target="_blank" rel="noreferrer">
                    Swap on Uniswap
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a href={SITE.artistUrl} target="_blank" rel="noreferrer">
                    Alma’s Instagram
                  </a>
                </Button>
              </div>
              <div className="mt-6 flex max-w-xl items-center gap-2 rounded-xl border border-dashed border-accent/50 bg-card px-3 py-2.5">
                <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted">
                  {CONTRACT_UNSET ? "Contract not posted yet" : SITE.contract}
                </code>
                <Button type="button" variant="accent" size="sm" onClick={copyCa}>
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
            <div className="relative grid place-items-center">
              <img
                src="/alma-smile.jpg"
                alt=""
                className="absolute top-0 -left-2 z-0 hidden w-24 -rotate-6 rounded-xl object-cover ring-1 ring-border lg:block"
              />
              <img
                src="/alma-shock.jpg"
                alt=""
                className="absolute right-0 -bottom-2 z-0 hidden w-24 rotate-6 rounded-xl object-cover ring-1 ring-border lg:block"
              />
              <img
                src="/hamster.png"
                alt="Hamster doodle by Almarts27"
                width={420}
                height={420}
                className="hamster-bob relative z-10 w-full max-w-md object-contain"
              />
              <div className="absolute right-4 bottom-4 z-20 hidden rotate-6 rounded-md border-2 border-fg bg-card px-2.5 py-1.5 text-[11px] font-semibold leading-tight text-fg sm:block">
                ROBINHOOD
                <br />
                CHAIN
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Alma drew this.
          </h2>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p>
                The original character was created by Alma (@almarts27). {SITE.name} is an unofficial fan tribute created to celebrate the meme and its community.
              </p>
              <p className="mt-4">
                That blank face has become a recognizable reaction-style character across social media.
              </p>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-border">
                <img
                  src="/hamster.png"
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 rounded-full bg-bg-elevated object-contain"
                />
                <p className="text-sm">
                  Art belongs to{" "}
                  <a className="font-semibold text-accent underline-offset-2 hover:underline" href={SITE.artistUrl} target="_blank" rel="noreferrer">
                    {SITE.artistHandle}
                  </a>
                  . This page is a fan tribute. Follow her.
                </p>
              </div>
            </div>
            <img
              src="/gallery.jpg"
              alt="Almarts27 hamster expressions"
              className="w-full rounded-2xl bg-card object-cover ring-1 ring-border"
            />
          </div>
        </section>

        <section className="border-y border-border">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <p className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Green candle. Red candle. Same face.
            </p>
            <p className="mt-4 max-w-lg text-muted">
              The nose is pink. Everything else is the stare. People already drop this as a reaction.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { src: "/alma-sleep.jpg", alt: "Hamster sleeping, art by Alma" },
                { src: "/alma-eat.jpg", alt: "Hamster eating, art by Alma" },
                { src: "/alma-shock.jpg", alt: "Hamster shocked, art by Alma" },
                { src: "/alma-cry.jpg", alt: "Hamster crying, art by Alma" },
              ].map((face) => (
                <img
                  key={face.src}
                  src={face.src}
                  alt={face.alt}
                  className="aspect-square w-full rounded-xl bg-card object-contain ring-1 ring-border"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="tokenomics" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tokenomics
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            1 billion. Zero tax. LP burned. Renounced. No presale.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { value: SITE.supply, label: "Supply" },
              { value: "0 / 0", label: "Tax" },
              { value: "Burned", label: "LP" },
              { value: "Renounced", label: "Owner" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-card px-4 py-5 text-center ring-1 ring-border">
                <b className="font-display text-xl font-semibold">{stat.value}</b>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="buy" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Buy it
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Wallet, ETH on chain {SITE.chainId}, then Uniswap.
          </p>
          <ol className="mt-8 grid gap-3">
            {[
              {
                n: "1",
                title: "Wallet",
                body: "Robinhood Wallet already has the chain. MetaMask or Rabby: add it.",
              },
              {
                n: "2",
                title: "ETH for gas",
                body: "Bridge a little ETH over. You need it to swap.",
              },
              {
                n: "3",
                title: "Swap",
                body: `Uniswap → Robinhood Chain → paste the ${SITE.name} contract.`,
              },
              {
                n: "4",
                title: "Then sit",
                body: "Token lands in your wallet. Hold like a hamster hoarding seeds. Stare at hamster. Repeat.",
              },
            ].map((step) => (
              <li key={step.n} className="grid grid-cols-[56px_1fr] gap-4 rounded-xl bg-card p-4 ring-1 ring-border">
                <div className="grid size-14 place-items-center rounded-lg bg-accent/25 font-display text-xl font-semibold">
                  {step.n}
                </div>
                <div>
                  <strong>{step.title}</strong>
                  <p className="text-sm text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={SITE.uniswapUrl} target="_blank" rel="noreferrer">
                Open Uniswap
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.walletUrl} target="_blank" rel="noreferrer">
                <Wallet className="size-4" />
                Robinhood Wallet
              </a>
            </Button>
            <Button type="button" variant="ghost" onClick={addNetwork}>
              Add network
            </Button>
          </div>
          {networkStatus ? (
            <p className="mt-3 text-sm text-muted">{networkStatus}</p>
          ) : null}
        </section>

        <section id="community" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Links</h2>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <img src="/alma-sleep.jpg" alt="" className="size-14 rounded-xl object-contain ring-1 ring-border" />
            <img src="/alma-eat.jpg" alt="" className="size-14 rounded-xl object-contain ring-1 ring-border" />
            <img src="/alma-smile.jpg" alt="" className="size-14 rounded-xl object-contain ring-1 ring-border" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="ghost">
              <a href={SITE.twitterUrl}>X</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.telegramUrl}>Telegram</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.artistUrl} target="_blank" rel="noreferrer">
                Alma on IG
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.explorer} target="_blank" rel="noreferrer">
                Explorer
              </a>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted">
            {SITE.name} can go to zero. Not financial advice. Not affiliated with Alma ({SITE.artistHandle}).
            Art belongs to{" "}
            <a className="font-semibold text-accent hover:underline" href={SITE.artistUrl} target="_blank" rel="noreferrer">
              {SITE.artistHandle}
            </a>
            . Unofficial fan tribute.
          </p>
        </section>
      </main>

      <footer className="px-4 py-12 text-center text-sm text-muted">
        <img src="/hamster.png" alt="" width={56} height={56} className="mx-auto mb-3 size-14 object-contain" />
        {SITE.name} · just a hamster · Robinhood Chain · art by{" "}
        <a className="text-accent hover:underline" href={SITE.artistUrl} target="_blank" rel="noreferrer">
          {SITE.artistHandle}
        </a>
      </footer>
    </div>
  );
}
