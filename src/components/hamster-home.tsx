import type { ReactNode } from "react";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addRobinhoodChain } from "@/lib/add-network";
import { CONTRACT_UNSET, SITE } from "@/lib/site";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#buy", label: "How to buy" },
  { href: "#faq", label: "FAQ" },
];

function closeMenu() {
  const toggle = document.getElementById("site-menu-toggle");
  if (toggle instanceof HTMLInputElement) toggle.checked = false;
}

function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{kicker}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {children ? <p className="mt-3 text-muted">{children}</p> : null}
    </div>
  );
}

export function HamsterHome() {
  const [copied, setCopied] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<string | null>(null);

  async function copyCa() {
    if (CONTRACT_UNSET) return;
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
              className="size-9 shrink-0 rounded-lg border border-border bg-card object-contain"
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
              className="grid size-11 place-items-center rounded-lg border border-border bg-card text-fg"
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
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-10 sm:px-6 lg:grid-cols-2 lg:pt-20 lg:pb-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Memecoin · Robinhood Chain
              </p>
              <h1 className="mt-4 font-display text-[clamp(3rem,10vw,6rem)] leading-[0.9] font-semibold tracking-[-0.04em]">
                JUST A
                <br />
                <span className="text-accent">HAMSTER.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted">
                Fair launch. Zero tax. Liquidity burned. Ownership renounced. Blank face, pink nose — that’s the whole product.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={SITE.uniswapUrl} target="_blank" rel="noreferrer">
                    Buy on Uniswap
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a href={SITE.explorer} target="_blank" rel="noreferrer">
                    View explorer
                  </a>
                </Button>
              </div>
              <div className="mt-6 max-w-xl rounded-lg border border-border bg-card p-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">Contract</p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate font-mono text-xs">
                    {CONTRACT_UNSET ? "Contract not posted yet" : SITE.contract}
                  </code>
                  <Button type="button" variant="accent" size="sm" onClick={copyCa}>
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid place-items-center">
              <img
                src="/hamster.png"
                alt="Hamster doodle"
                width={420}
                height={420}
                className="hamster-bob w-full max-w-md object-contain"
              />
            </div>
          </div>
          <div className="border-y border-border">
            <dl className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
              {[
                { dt: "Supply", dd: SITE.supply },
                { dt: "Tax", dd: "0 / 0" },
                { dt: "Liquidity", dd: "Burned" },
                { dt: "Network", dd: SITE.chain },
              ].map((item, i) => (
                <div
                  key={item.dt}
                  className={`px-4 py-5 sm:px-6 ${i > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""} ${i === 1 ? "border-l" : ""}`}
                >
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted">{item.dt}</dt>
                  <dd className="mt-1 font-display text-lg font-semibold">{item.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <SectionHeading kicker="About" title={`What ${SITE.name} is`}>
            A reaction meme on-chain. Nothing else.
          </SectionHeading>
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-muted">
              <p className="text-fg">
                The original character was created by Alma (@almarts27). {SITE.name} is an unofficial fan tribute created to celebrate the meme and its community.
              </p>
              <p className="text-fg">
                That blank face has become a recognizable reaction-style character across social media.
              </p>
            </div>
            <img
              src="/gallery.jpg"
              alt="Hamster expressions"
              className="w-full rounded-xl bg-card object-cover ring-1 ring-border"
            />
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <SectionHeading kicker="Gallery" title="Same face. Every candle.">
              Green candle. Red candle. The hamster does not care.
            </SectionHeading>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { src: "/alma-sleep.jpg", alt: "Hamster sleeping" },
                { src: "/alma-eat.jpg", alt: "Hamster eating" },
                { src: "/alma-shock.jpg", alt: "Hamster shocked" },
                { src: "/alma-cry.jpg", alt: "Hamster crying" },
              ].map((face) => (
                <img
                  key={face.src}
                  src={face.src}
                  alt={face.alt}
                  className="aspect-square w-full rounded-lg bg-bg object-contain ring-1 ring-border"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="tokenomics" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <SectionHeading kicker="Tokenomics" title="The numbers">
            Fixed supply. No team allocation. Check the explorer when the contract is live.
          </SectionHeading>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { value: SITE.supply, label: "Total supply" },
              { value: "0 / 0", label: "Buy / sell tax" },
              { value: "Burned", label: "Liquidity" },
              { value: "Renounced", label: "Ownership" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-card px-4 py-6 ring-1 ring-border">
                <b className="font-display text-2xl font-semibold">{stat.value}</b>
                <div className="mt-2 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
          <dl className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-card p-5 ring-1 ring-border">
              <dt className="text-xs font-medium uppercase tracking-widest text-muted">Network</dt>
              <dd className="mt-2 font-medium">{SITE.chain}</dd>
              <dd className="mt-1 font-mono text-sm text-muted">Chain ID {SITE.chainId}</dd>
            </div>
            <div className="rounded-lg bg-card p-5 ring-1 ring-border">
              <dt className="text-xs font-medium uppercase tracking-widest text-muted">Market</dt>
              <dd className="mt-2 font-medium">Uniswap</dd>
              <dd className="mt-1 text-sm text-muted">Gas token {SITE.currency}</dd>
            </div>
            <div className="rounded-lg bg-card p-5 ring-1 ring-border">
              <dt className="text-xs font-medium uppercase tracking-widest text-muted">Launch</dt>
              <dd className="mt-2 font-medium">Fair launch</dd>
              <dd className="mt-1 text-sm text-muted">No presale. No whitelist.</dd>
            </div>
          </dl>
        </section>

        <section id="roadmap" className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
            <SectionHeading kicker="Roadmap" title="What happens next">
              No 2029 metaverse slide. Four things, in order.
            </SectionHeading>
            <ol className="mt-10 grid gap-3 md:grid-cols-2">
              {[
                {
                  n: "01",
                  title: "Launch",
                  body: "Token live on Robinhood Chain. LP burned. Ownership renounced. Contract posted on this page.",
                },
                {
                  n: "02",
                  title: "Chart and chat",
                  body: "Uniswap and explorer first. Dexscreener when it indexes. X and Telegram with the launch.",
                },
                {
                  n: "03",
                  title: "Stickers",
                  body: "The hamster already lives in comments. More doodles, same blank face.",
                },
                {
                  n: "04",
                  title: "Stay a hamster",
                  body: "No CEX promises. If the meme dies, the coin dies. That’s the deal.",
                },
              ].map((step) => (
                <li key={step.n} className="rounded-lg bg-bg p-5 ring-1 ring-border">
                  <span className="font-mono text-xs text-muted">{step.n}</span>
                  <strong className="mt-2 block">{step.title}</strong>
                  <p className="mt-1 text-sm text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="buy" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <SectionHeading kicker="Buy" title="How to buy">
            Robinhood Wallet, or any EVM wallet. You need a little ETH on chain {SITE.chainId} for gas.
          </SectionHeading>
          <ol className="mt-10 grid gap-3">
            {[
              {
                n: "1",
                title: "Wallet",
                body: "Robinhood Wallet already supports this chain. MetaMask or Rabby: use Add network below.",
              },
              {
                n: "2",
                title: "Bridge ETH",
                body: "Move a little ETH to Robinhood Chain and keep some for gas.",
              },
              {
                n: "3",
                title: `Swap ${SITE.name}`,
                body: "Uniswap → Robinhood Chain → paste the contract. Start slippage at 1–3%.",
              },
              {
                n: "4",
                title: "Hold",
                body: "Token lands in your wallet. Hold like a hamster hoarding seeds. Stare at hamster. Repeat.",
              },
            ].map((step) => (
              <li key={step.n} className="grid grid-cols-[48px_1fr] items-start gap-4 rounded-lg bg-card p-5 ring-1 ring-border">
                <div className="grid size-12 place-items-center rounded-lg bg-fg font-display text-lg font-semibold text-bg">
                  {step.n}
                </div>
                <div>
                  <strong>{step.title}</strong>
                  <p className="mt-1 text-sm text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
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

        <section id="faq" className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
            <SectionHeading kicker="FAQ" title="Common questions" />
            <div className="mt-10 divide-y divide-border rounded-lg bg-bg ring-1 ring-border">
              {[
                {
                  q: `What is ${SITE.name}?`,
                  a: "A memecoin on Robinhood Chain. The mascot is a blank hamster doodle. Somehow, people keep using this as a reaction.",
                },
                {
                  q: "What chain?",
                  a: `${SITE.chain}. Chain ID ${SITE.chainId}. Gas token is ${SITE.currency}. Swap on Uniswap.`,
                },
                {
                  q: "Is there tax?",
                  a: "0% buy, 0% sell. If a fake contract shows tax, you are on the wrong address.",
                },
                {
                  q: "Is there a team wallet?",
                  a: "No presale, no team allocation. LP burned. Ownership renounced. Verify on the explorer when the CA is live.",
                },
                {
                  q: "Where is the contract?",
                  a: CONTRACT_UNSET
                    ? "Not posted yet. When it is, it will sit in the contract bar at the top of this page. Do not buy a random hamster token."
                    : SITE.contract,
                },
                {
                  q: "Does this have utility?",
                  a: "No. If you need utility, buy something else.",
                },
              ].map((item) => (
                <details key={item.q} className="group px-5">
                  <summary className="flex items-center justify-between gap-4 py-4 font-medium">
                    {item.q}
                    <span className="shrink-0 text-muted" aria-hidden="true">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="pb-4 text-sm text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <SectionHeading kicker="Community" title="Links">
            Chart, chat, explorer. X and Telegram go live with the launch.
          </SectionHeading>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="ghost">
              <a href={SITE.twitterUrl}>X</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.telegramUrl}>Telegram</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.explorer} target="_blank" rel="noreferrer">
                Explorer
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.uniswapUrl} target="_blank" rel="noreferrer">
                Uniswap
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.artistUrl} target="_blank" rel="noreferrer">
                Artist IG
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <div>
            <p className="font-display text-lg font-semibold">{SITE.name}</p>
            <p className="mt-2 text-sm text-muted">Just a hamster. Robinhood Chain.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-muted hover:text-fg">
                {item.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-muted">
            {SITE.name} is an unofficial fan tribute. Not affiliated with or endorsed by the original artist.
          </p>
        </div>
      </footer>
    </div>
  );
}
