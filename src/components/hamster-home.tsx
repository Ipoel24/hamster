import { useState } from "react";
import {
  ArrowUpRight,
  Brain,
  Check,
  Copy,
  Frame,
  Heart,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { addRobinhoodChain } from "@/lib/add-network";
import { CONTRACT_UNSET, SITE } from "@/lib/site";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#buy", label: "How to buy" },
  { href: "#community", label: "Community" },
];

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
        setNetworkStatus("No EVM wallet found. Open Robinhood Wallet or MetaMask.");
        return;
      }
      setNetworkStatus("Robinhood Chain added to your wallet.");
    } catch {
      setNetworkStatus("Cancelled, or the wallet rejected the request.");
    }
  }

  return (
    <div className="min-h-dvh overflow-x-clip bg-bg text-fg">
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
            <img
              src="/hamster.png"
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full border border-border bg-card object-contain"
            />
            {SITE.name}
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-fg/80 hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" className="shrink-0">
            <a href="#buy">Buy {SITE.name}</a>
          </Button>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-1.5 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-2 text-sm font-medium text-fg/80"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="mx-auto grid max-w-6xl scroll-mt-28 items-center gap-10 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-2 lg:pt-16 lg:pb-20">
          <div>
            <p className="mb-4 inline-flex max-w-full flex-wrap rounded-full border border-accent/40 bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              Art by {SITE.artistHandle} · Robinhood Chain
            </p>
            <h1 className="font-display text-[clamp(3rem,11vw,6.4rem)] leading-[0.9] font-semibold tracking-[-0.04em]">
              JUST A
              <br />
              <span className="text-accent">HAMSTER.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              The blankest hamster doodle on the internet. Live on Robinhood Chain.
              No utility. Just a hamster.
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
                  See the art
                </a>
              </Button>
            </div>
            <div className="mt-6 flex max-w-xl items-center gap-2 rounded-xl border border-dashed border-accent/50 bg-card px-3 py-2.5">
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted">
                {CONTRACT_UNSET
                  ? "CA: paste contract address"
                  : SITE.contract}
              </code>
              <Button type="button" variant="accent" size="sm" onClick={copyCa}>
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="relative grid place-items-center">
            <div className="absolute size-[70%] rounded-full bg-accent/20 blur-3xl" />
            <img
              src="/hamster.png"
              alt="Hamster doodle by Almarts27"
              width={420}
              height={420}
              className="hamster-bob relative z-10 w-full max-w-md object-contain drop-shadow-sm"
            />
            <div className="absolute right-4 bottom-4 z-20 hidden rotate-6 rounded-md border-2 border-fg bg-card px-2.5 py-1.5 text-[11px] font-semibold leading-tight sm:block">
              ROBINHOOD
              <br />
              CHAIN
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why this hamster?
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Because life sometimes feels like a white blob with a pink nose that can only stare.
          </p>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p>
                The original character was created by Alma (@almarts27). {SITE.name} is an unofficial fan tribute created to celebrate the meme and its community.
                Pear-shaped body, tiny head, scribbled eyes, pink nose. That blank face has become a recognizable reaction-style character across social media.
              </p>
              <p className="mt-4 text-muted">
                {SITE.name} puts the meme on-chain on Robinhood Chain (L2, chain ID {SITE.chainId}).
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
                  <strong>Required credit.</strong> All art belongs to{" "}
                  <a className="font-semibold text-accent underline-offset-2 hover:underline" href={SITE.artistUrl} target="_blank" rel="noreferrer">
                    {SITE.artistHandle}
                  </a>
                  . Fan tribute — support the original artist.
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

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Vibe check</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <Brain className="mb-3 size-6 text-accent" />
              <h3 className="font-display text-lg font-semibold">0 thoughts</h3>
              <p className="mt-1 text-sm text-muted">
                Hamster brain. Green candle, red candle — same face.
              </p>
            </article>
            <article className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <Heart className="mb-3 size-6 text-accent" />
              <h3 className="font-display text-lg font-semibold">Pink nose</h3>
              <p className="mt-1 text-sm text-muted">
                The only utility is that the nose is cute. The rest is community chaos.
              </p>
            </article>
            <article className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <Frame className="mb-3 size-6 text-accent" />
              <h3 className="font-display text-lg font-semibold">Meme native</h3>
              <p className="mt-1 text-sm text-muted">
                Not a random hamster. This one already lives in the comments as a sticker.
              </p>
            </article>
          </div>
        </section>

        <section id="tokenomics" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tokenomics
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Simple, like the doodle. Swap these numbers once the token is live.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { value: SITE.supply, label: "Total supply" },
              { value: "0 / 0", label: "Buy / sell tax" },
              { value: "LP burned", label: "Liquidity" },
              { value: "Renounced", label: "Ownership" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-card px-4 py-5 text-center ring-1 ring-border">
                <b className="font-display text-xl font-semibold">{stat.value}</b>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <h3 className="font-display text-lg font-semibold">Chain</h3>
              <p className="mt-1 text-sm text-muted">
                Robinhood Chain · ID {SITE.chainId} · gas {SITE.currency} · DEX Uniswap.
              </p>
            </article>
            <article className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <h3 className="font-display text-lg font-semibold">Community</h3>
              <p className="mt-1 text-sm text-muted">
                No presale. Holders are the hamster council.
              </p>
            </article>
            <article className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <h3 className="font-display text-lg font-semibold">Roadmap</h3>
              <p className="mt-1 text-sm text-muted">
                1. Launch. 2. Sticker pack. 3. More doodles. 4. Hamster stays blank.
              </p>
            </article>
          </div>
        </section>

        <section id="buy" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            How to buy
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Robinhood Chain. EVM wallet + ETH, then swap on Uniswap.
          </p>
          <ol className="mt-8 grid gap-3">
            {[
              {
                n: "1",
                title: "Open a wallet",
                body: "Robinhood Wallet supports this chain natively. MetaMask or Rabby also work — add the network.",
              },
              {
                n: "2",
                title: "Get ETH on Robinhood Chain",
                body: "Bridge ETH to chain ID 4663. Keep a little for gas.",
              },
              {
                n: "3",
                title: `Swap for ${SITE.name}`,
                body: "Open Uniswap, select Robinhood Chain, paste the contract address, swap.",
              },
              {
                n: "4",
                title: "Hold like a hamster hoarding seeds",
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
              Add network to MetaMask
            </Button>
          </div>
          {networkStatus ? (
            <p className="mt-3 text-sm text-muted">{networkStatus}</p>
          ) : null}
        </section>

        <section id="community" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Community</h2>
          <p className="mt-2 text-muted">The hamster is not staring into the void alone.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="ghost">
              <a href={SITE.twitterUrl}>X / Twitter</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.telegramUrl}>Telegram</a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.artistUrl} target="_blank" rel="noreferrer">
                Artist IG
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={SITE.explorer} target="_blank" rel="noreferrer">
                Explorer
              </a>
            </Button>
          </div>
          <p className="mt-8 rounded-xl bg-card p-4 text-sm text-muted ring-1 ring-border">
            {SITE.name} is a speculative memecoin. It can go to zero. Not financial advice.
            Not affiliated with Alma ({SITE.artistHandle}). All hamster art belongs to{" "}
            <a className="font-semibold text-accent hover:underline" href={SITE.artistUrl} target="_blank" rel="noreferrer">
              {SITE.artistHandle}
            </a>
            . This is an unofficial fan tribute.
          </p>
        </section>
      </main>

      <footer className="px-4 py-12 text-center text-sm text-muted">
        <img src="/hamster.png" alt="" width={56} height={56} className="mx-auto mb-3 size-14 object-contain" />
        {SITE.name} · just a hamster · Robinhood Chain · art by{" "}
        <a className="text-accent hover:underline" href={SITE.artistUrl} target="_blank" rel="noreferrer">
          {SITE.artistHandle}
        </a>
        <br />
        Unofficial fan tribute. Not affiliated with Alma.
      </footer>
    </div>
  );
}
