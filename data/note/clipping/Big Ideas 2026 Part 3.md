---
created: 2025-12-13
published: 2025-12-11
source: https://www.a16z.news/p/big-ideas-2026-part-3
type: "[[Clipping]]"
rating: 4
---
### What our Crypto partners are observing for the year ahead

![](https://substackcdn.com/image/fetch/$s_!ZbcA!,w_424,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8699ced9-67f6-40d7-a918-2dd0bc93200f_1460x460.jpeg)

Over the past two days, we’ve shared the ideas our Infrastructure, Growth, Bio + Health, Speedrun, Apps, and American Dynamism teams think builders will tackle in 2026.

Today, we’re sharing 17 things that various a16z crypto partners (plus a few guest contributors) observe about what’s ahead -- on topics ranging from agents and AI; stablecoins, tokenization, and finance; privacy and security; to prediction markets, SNARKs, and other applications... to how we’ll build. (To stay up to date on trend updates, builder guides, industry reports, and other resources in crypto, be sure to [subscribe to the a16z crypto newsletter](https://a16zcrypto.substack.com/). )

And then tomorrow, we’ll finish the week with a **special announcement and an invitation from a16z** that you won’t want to miss.

Here we go:

---

## Privacy will be the most important moat in crypto

Privacy is the one feature that’s critical for the world’s finance to move onchain. It’s also the one feature that almost every blockchain that exists today lacks. For most chains, privacy has been little more than an afterthought.

But now, privacy by itself is sufficiently compelling to differentiate a chain from all the rest. Privacy also does something more important: *It creates chain lock-in;* a privacy network effect, if you will. Especially in a world where competing on performance is no longer enough.

Thanks to bridging protocols, it’s trivial to move from one chain to another as long as everything is public. But, as soon as you make things private, that is no longer true: Bridging tokens is easy, bridging secrets is hard. There is always a risk when moving in or out of a private zone that people who are watching the chain, mempool, or network traffic could figure out who you are. Crossing the boundary between a private chain and a public one — or even between two private chains — leaks all kinds of metadata like transaction timing and size correlations that makes it easier to track someone.

Compared to the many undifferentiated new chains where fees will likely be driven down to zero by competition (blockspace has become fundamentally the same everywhere), blockchains with privacy can have much stronger . The reality is that if a “general purpose” chain doesn’t already have a thriving ecosystem, a killer application, or an unfair distribution advantage, then there’s very little reason for anyone to use it or build on top of it — let alone be loyal to it.

When users are on public blockchains, it’s easy for them to transact with users on other chains — it doesn’t matter which chain they join. When users are on private blockchains, on the other hand, the chain they choose matters much more because, once they join one, they’re less likely to move and risk being exposed. This creates a winner-take-most dynamic. And because privacy is essential for most real-world use cases, a handful of privacy chains could own most of crypto.

*~Ali Yahya, a16z crypto general partner*

## Prediction markets go bigger, broader, and smarter

Prediction markets have already gone mainstream, and this coming year, they’ll only become bigger, broader, and smarter as they intersect with crypto and AI — while also posing new and important challenges for builders to resolve.

First, many more contracts will be listed. This means we’ll be able to access real-time odds not just for major elections or geopolitical events, but for all kinds of in-the-weeds outcomes and complex, intersecting events. As these new contracts surface more information and become part of the news ecosystem ([already happening](https://a16zcrypto.substack.com/p/everyones-wrong-about-quantum-computing)), they’ll raise important societal questions about how we balance the value of this information and how to better design them so they are more transparent, auditable, and more — which is possible with crypto.

To handle the much larger volume of contracts, we’ll need new ways of aligning on truth to resolve the contracts. Centralized platform resolution (did a given event actually happen? how do we confirm it?) is important, but disputed cases like the [Zelensky suit market](https://www.wired.com/story/volodymyr-zelensky-suit-polymarket-rebellion/) and the [Venezuelan election market](https://ar.usembassy.gov/assessing-the-results-of-venezuelas-presidential-election/) show the limits. To address these edge cases and help prediction markets scale to more useful applications, new kinds of decentralized governance and LLM oracles can help determine truth for contested outcomes.

AI opens up further possibilities beyond LLMs for oracles. For instance, AI agents trading on these platforms can scour the world for signals that help provide short-term trading edge, helping surface new ways of thinking about the world and predicting what will happen next. (Projects like Prophet Arena already hint at the excitement in this space.) Besides serving as sophisticated political analysts that we can query for insight, these agents could also reveal new things about root predictors of complex societal events when we examine their emergent strategies.

Do prediction markets replace polling? No; they make polling better (and polling information can be fed into prediction markets). As a political scientist, I’m most excited by how prediction markets can function in concert with a rich and vibrant polling ecosystem — but we’ll need to lean on new technologies like AI, which can improve the survey-taking experience; and crypto, which can [provide new ways to prove](https://a16zcrypto.com/posts/podcast/proof-of-human-privacy-ai-agents-bots-deepfakes-world-orb/) that poll / survey respondents are not bots but humans, among other things.

*~Andy Hall, a16z crypto research advisor (and professor of political economy, Stanford University)*

## Thinking about tokenization of real world assets, and stablecoins, in a more crypto-native way

We’ve seen strong interest from banks, fintechs, and asset managers to bring U.S. equities, commodities, indices, and [other traditional assets](https://a16zcrypto.com/posts/article/big-ideas-crypto-2025/#countries-explore-putting-government-bonds-onchain) onchain. As more traditional assets come onchain, the tokenization is often skeuomorphic — rooted in the current idea of real-world assets, and not taking advantage of crypto-native features.

But synthetic representations like perpetual futures (perps) allow deeper liquidity and are often simpler to implement. Perps also provide easy-to-understand leverage, so I believe they are the crypto-native derivative with the strongest . I also believe that emerging market equities are one of the most interesting asset classes to perpify. (The zero-days-to-expiration or 0DTE options market for some equities often trades with deeper liquidity than the spot market, and would be a fascinating experiment for perpification.)

It all comes down to the question of “ [perpification vs. tokenization](https://www.youtube.com/watch?v=xQttYSnu1nk) ”; but either way, we should see more crypto-native RWA tokenization in the coming year.

Along similar lines, in 2026 we’ll see more “origination, not just tokenization” when it comes to stablecoins, which went mainstream in 2025; outstanding stablecoin issuance continues to grow.

But stablecoins without strong credit infrastructure look like narrow banks, which hold specific liquid assets that are considered extra-safe. While narrow banking is a valid product, I don’t believe it will be the backbone of the onchain economy in the long term.

We’ve seen a number of new asset managers, curators, and protocols start to facilitate onchain asset-backed lending against offchain collateral. Often these loans originate offchain and then are tokenized. I think tokenization offers few benefits here, other than perhaps distributed to users that are already onchain. That’s why debt assets should be originated on chain, not originated off chain and tokenized. Origination onchain reduces loan servicing costs, back office structuring costs, and increases accessibility. The challenging part here will be compliance and standardization, but builders are already working on solving those problems.

*~Guy Wuollet, a16z crypto general partner*

## Trading as a way station, not the last stop, for crypto businesses

It seems like every crypto company that’s doing well today, outside of stablecoins and some core infrastructure, has pivoted to or is pivoting to trading. But if “every crypto company becomes a trading platform”, then where does that leave everyone? Having so many players all doing the same thing cannibalizes mindshare for the many, and leaves just a few big winners. This means those that pivoted too quickly to trading missed the opportunity to build a more defensible, more durable business.

While I have a lot of empathy for all the founders out there trying to make their business financials work, chasing the immediate sense of product-market fit has costs, too. This problem is particularly an issue in crypto, where unique dynamics around tokens and speculation can lead founders down the immediate-gratification path on their journey to [finding product-market fit](https://a16zcrypto.com/posts/article/how-to-find-product-market-fit-5-strategies/).… It’s a kind of marshmallow test, if you will. There’s nothing wrong with trading — it’s an important market function — but it doesn’t have to be the final destination. The founders who focus on the “product” part of product-market fit may end up the bigger winners.

*~Arianna Simpson, a16z crypto general partner*

## From know your customer (KYC) to ‘know your agent’ (KYA)

The bottleneck for the is shifting from *intelligence* to *identity*.

In financial services, “non-human identities” now outnumber human employees 96-to-1 — yet these identities remain unbanked ghosts. The critical missing primitive here is KYA: Know Your Agent.

Just as humans need credit scores to get loans, agents will need cryptographically signed credentials to transact — linking the agent to its principal, its constraints, and its liability. Until this exists, merchants will keep blocking agents at the firewall. The industry that built that KYC infrastructure over decades now has just months to figure out KYA.

*~Sean Neville, cofounder of Circle and architect of USDC; CEO of Catena Labs*

## Better, more clever onramps/ offramps for stablecoins

Stablecoins accounted for an [estimated 46 trillion dollars](https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/#stablecoins-went-mainstream) in transaction volume last year, constantly hitting new all time highs. To put that into perspective, that’s more than 20x the volume of PayPal; close to 3x the volume of Visa, one of the largest payment networks in the world; and is rapidly approaching the volume of ACH in the United States, the electronic network for financial transactions like direct deposits and more, in the United States.

Today, you can send a stablecoin in [less than a second for less than a cent](https://a16zcrypto.com/posts/article/how-stablecoins-will-eat-payments/). What remains unsolved, however, is how to connect these digital dollars to the financial rails people actually use already every day — in other words, on/offramps for stablecoins.

A new generation of startups is filling this gap, linking stablecoins to more familiar payment systems and local currencies. Some use cryptographic proofs to let people privately swap local balances for digital dollars. Some integrate with regional networks that draw on QR codes, real-time payments rails, and other features to enable bank-to-bank payments... While others are building more truly interoperable global wallet layers and card-issuing platforms that let users spend stablecoins at everyday merchants. Together, these approaches broaden who can participate in the digital dollar economy — and could accelerate stablecoins being used more directly as mainstream payments.

As these on/off ramps mature, with digital dollars plugging directly into local payment systems and merchant tools, new behaviors will emerge: Workers can be paid in real time across borders. Merchants can accept global dollars without bank accounts. Apps can settle value instantly with users anywhere. Stablecoins will fundamentally shift from a niche financial tool to the foundational settlement layer for the internet.  
  
*~Jeremy Zhang, a16z crypto engineering team*

## Stablecoins unlock the bank ledger upgrade cycle — and new payment scenarios

The average bank is running software that is unrecognizable to modern developers: In the 1960s and 1970s, banks were early adopters of large software systems. The second generation of core banking software started in the 1980s and 1990s (for instance, via Temenos’ GLOBUS and InfoSys’ Finacle). But all this software has been aging, and is being upgraded too slowly. As such, the banking industry — especially critical core ledgers, the key databases that track deposits, collateral, and other obligations — still often run on mainframe computers, programmed with COBOL, and with batch file interfaces instead of APIs.

The large majority of global assets live on those same core ledgers that are also decades old. While these systems are battle tested, trusted by regulators, and deeply integrated into complex banking scenarios, they are also holding back innovation. Adding key functionality like realtime payments (RTP) can take months or more likely years, and requires navigating layers of technical debt and regulatory complexity.

That’s where stablecoins come in. Not only were the [last couple years](https://a16zcrypto.com/posts/series/state-of-crypto/) when stablecoins found product-market fit and hit the mainstream, but this year, TradFi institutions [embraced them at a whole new level](https://a16zcrypto.com/posts/article/making-sense-of-stablecoin-news/). Stablecoins, tokenized deposits, tokenized treasuries, and onchain bonds allow banks, fintechs, and financial institutions to build new products and serve new customers. More importantly, they can do this without forcing these organizations to rewrite their legacy systems — systems that, while aging, have run reliably for decades. Stablecoins thus provide a new way for institutions to innovate.

*~Sam Broner*

## The (near) future of messaging isn’t just quantum-resistant. It’s decentralized

As the world [prepares for quantum computing](https://a16zcrypto.com/posts/article/quantum-computing-misconceptions-realities-blockchains-planning-migrations/), many messaging apps built on encryption (Apple, Signal, WhatsApp) have led the way, all doing great work. The problem is that every major messenger relies on our trusting a private server run by a single organization. Those servers are an easy target for governments to shut down, backdoor, or coerce into giving up private data.

What good is quantum encryption if a country can shut down one’s servers; if a company has a key to the private server; or even if a company *has* a private serve?. Private servers require “trust me” — but having no private server means “you don’t have to trust me.” Communication doesn’t need a single company in the middle.

Messaging needs open protocols where we don’t have to trust anyone. The way we get there is by decentralizing the network: No private servers. No single app. All open source code. Best-in-class encryption — including against quantum threats.

With an open network there is no single person, company, non-profit, or country that can take away our ability to communicate. Even if a country or company does shut down an app, 500 new versions will pop up the next day. Shut down a node and there is an economic incentive (thanks to blockchains and more) for a new one to take its place immediately.

When people own their messages like they own their money — *with a key* — everything changes. Apps may come and go, but people will always keep control of their messages and identity. The end users can now own their messages, even if not the app.

This is greater than quantum resistance and encryption; it’s [ownership](https://a16zcrypto.com/posts/article/read-write-own-intro/) and decentralization. Without both, all we’re doing is building unbreakable encryption that can still be switched off.

*~Shane Mac, co-founder and CEO, XMTP Labs*

## From ‘code is law’ to ‘spec is law’

Recent DeFi hacks have hit battle-tested protocols that have strong teams, diligent audits, and years in production. These incidents underscore an uncomfortable reality: Today’s standard security practice is still largely heuristic and case-by-case.

To mature, DeFi security needs to move from bug patterns to design-level properties, and from “best-effort” to “principled” approaches:

- On the static/ pre-deployment side (testing, audits, formal verification), that means systematically proving global invariants rather than verifying hand‑picked local ones. AI-assisted proof tools now being built by several teams can help write specs, propose invariants, and offload much of the manual proof-engineering that used to make this prohibitively expensive.
- On the dynamic/ post-deployment side (runtime monitoring, runtime enforcement, etc.) those invariants can turn into live guardrails: a last line of defense. These guardrails would be encoded directly as runtime assertions that every transaction must satisfy.

So now, instead of assuming every bug was caught, we’d enforce key safety properties in the code itself, automatically reverting any transactions that would violate them.

This is not just theory. In practice, almost every exploit to date would have tripped one of these checks during execution, potentially halting the hack. So the once-popular idea of “code is law” evolves into “spec is law”: Even a novel attack must satisfy the same safety properties that keep the system intact, so the only attacks left are tiny or extremely hard to execute.

*~Daejun Park, a16z crypto engineering team*

## Crypto offers a new primitive for use beyond blockchains

For years, — cryptographic proofs that let you verify computation without re-executing it — have been largely a blockchain-only technology. The overhead was simply too high: Proving a computation could take 1,000,000X more work than just running it. Worth it when you’re amortizing across many thousands of validators, but impractical anywhere else.

That’s about to change. In 2026, zkVM provers will hit roughly 10,000X overhead with memory footprints in the hundreds of megabytes — fast enough to run on phones, cheap enough to run everywhere. Here’s one reason 10,000x could be a magic number: High-end GPUs have ~10,000x more parallel throughput than a laptop CPU. By the end of 2026, a single GPU will be able to generate proofs of CPU execution in real time.

This could unlock a vision [from old research papers](https://a16zcrypto.com/posts/article/zero-knowledge-canon/): *verifiable cloud computing*. If you’re running CPU workloads in the cloud anyway — because your computation isn’t heavy enough to GPU-ize, or you lack the expertise, or legacy reasons — you’ll be able to get cryptographic proofs of correctness for a reasonable price overhead. The prover is already GPU-optimized; your code doesn’t need to be.

*~Justin Thaler, a16z crypto research and associate professor of computer science, Georgetown University*

## We’ll use AI for substantive research tasks

As a mathematical economist, it was difficult to get consumer AI models to even understand my work process back in January this year; yet by November, I could give models abstract instructions in the same way I would to a doctoral student… And they sometimes return novel and correctly executed answers. Beyond my experience here, we’re starting to see AIs used for research more broadly — especially in reasoning domains, where models are now directly aiding discovery and also [autonomously solving Putnam problems](https://x.com/i/status/1997767850279440715) (perhaps the world’s hardest university-level math exam).

It’s still an open question which fields this type of research assistance will help most, and how. But I’m expecting AI research to enable, and reward, a new type of polymath research style: one that favors an ability to conjecture relationships between ideas, and quickly extrapolate from even more conjectural answers. Those answers may not be accurate, but can still point in the right direction (at least under some topology). Ironically, it’s kind of like harnessing the power of model hallucinations: When the models get “smart” enough, giving them abstract space to bounce around can still produce nonsense — but can sometimes crack open a discovery, just like how people can be most creative when they’re not working in a linear, clearly stated direction.

Reasoning in this manner will require a new style of AI workflow — not just agent-to agent, but more agent-wrapping-agent — where layers of models help the researcher evaluate the earlier models’ approaches and successively synthesize the wheat from the chaff. I’ve been using this approach to [write papers](https://arxiv.org/abs/2512.06446), while others are conducting patent searches with it, inventing new forms of art, or (unfortunately) finding novel smart contract attacks.

However: Operating ensembles of wrapped reasoning agents for research will require [better interoperability](https://a16zcrypto.com/posts/article/ai-crypto-crossovers/#1-persistent-data-and-context-in-ai-interactions) between models, along with a way to [recognize and properly compensate](https://a16zcrypto.com/posts/article/ai-crypto-crossovers/#7-micropayments-that-support-revenue-sharing) each model’s contribution — both problems crypto can help solve.

*~Scott Kominers, a16z crypto research team and professor, Harvard Business School*

## The invisible tax on the open web

The rise of AI agents is imposing an invisible tax on the open web, fundamentally disrupting its economic foundation. This disruption stems from a growing misalignment between the Context and Execution layers of the internet: Currently, AI agents extract data from ad-supported sites (the Context layer), providing convenience to users while systematically bypassing the revenue streams (like ads and subscriptions) that fund the content.

To prevent the erosion of the open web and preserve the diverse content that fuels AI itself, we need the mass deployment of technical and economic solutions. This could include models like next-generation sponsored content, micro attribution systems, or other novel funding models. Existing AI licensing deals are also proving to be a financially unsustainable bandaid, often compensating content providers with a fraction of the revenue they’ve already lost to AI-cannibalized traffic.

==The web needs a new techno-economic model where value flows automatically. The key transition for the coming year will be moving from static licensing to real-time, usage-based compensation. This means testing and scaling systems - potentially leveraging blockchain enabled nanopayments and sophisticated attribution standards - to automatically reward every entity that contributes information to an agent’s successful task.==

*~Liz Harkavy, a16z crypto investment team*

## The rise of staked media

Cracks in the traditional media model — with its (supposed) objectivity — have been showing for a while now. The internet gave everyone a voice, and more operators, practitioners, and builders are now speaking directly to the public. Their perspectives reflect their stakes in the world and, counterintuitively, audiences often respect them not *despite* their interests but *because* of them.

What’s new here isn’t the rise of social media, but the arrival of cryptographic tools that allow people to make publicly verifiable commitments. As AI [makes it cheap and easy](https://a16zcrypto.com/posts/article/big-ideas-crypto-2025/#as-more-people-use-ai-we-ll-need-unique-proof-of-personhood) to generate unlimited content — claiming anything from any point of view or persona, real or fabricated — simply relying on what people (or bots) say can feel insufficient. Tokenized assets, programmable lockups, [prediction markets](https://a16zcrypto.substack.com/p/everyones-wrong-about-quantum-computing), and onchain histories offer stronger foundations for trust: A commentator can publish an argument and also prove they’re putting their money where their mouth is. A podcaster can lock tokens to show they’re not opportunistically flipping or “pumping and dumping.” An analyst can tie forecasts to markets that settle publicly, creating an auditable track record.

This is the early shape of what I think of as “staked media”: a species of media that not only embraces the idea of having skin in the game, but supplies the proof. In this model, credibility comes neither from feigning detachment nor making unsubstantiated claims; instead, it comes from having stakes that you can make transparent and verifiable commitments about. Staked media will not replace other forms of media, it supplements what we already have. It offers a new signal: Not just “trust me, I’m neutral,” but “here’s what I’m willing to risk, and how you can check that I’m telling the truth*.*”  
  
*~Robert Hackett, a16z crypto editorial team*

## ‘Secrets-as-a-service’

Behind every model, agent, and automation lies a simple dependency: data. But most data pipelines today — what’s fed into or out of the model — are opaque, mutable, and unauditable. This is fine for some consumer applications but many industries and users (like finance and healthcare) require companies to keep sensitive data private. It’s also a massive blocker for the institutions looking to tokenize real world assets right now.

So how do we preserve privacy while enabling innovation that is safe, compliant, autonomous, and globally interoperable? There are many approaches, but I’ll focus on data access controls: Who controls sensitive data? How does it move? And who (or what) can access it?

==Without data access controls, anyone who wants to keep data confidential currently has to use a centralized service or build a custom setup — which is not only time-consuming and expensive, but blocks traditional finance institutions and others from fully unlocking the features and benefits of onchain data management. And as begin browsing, transacting, and making decisions autonomously, both users and institutions across industries need cryptographic guarantees as opposed to “best-effort trust”.

==That’s why I believe we need secrets-as-a-service: New technologies that can provide programmable, native data access rules; client-side encryption; and decentralized key management enforcing who can decrypt what, under which conditions, and for how long... all enforced onchain. Combined with verifiable data systems, secrets could then become part of the internet’s fundamental public infrastructure — rather than an application-level patch, where privacy is bolted on after the fact — making privacy core infrastructure.

*~Adeniyi Abiodun, chief product officer and co-founder, Mysten Labs*

## Wealth management for all

Personalized wealth management services have traditionally been reserved for high net-worth clients at banks: it’s expensive and operationally complex to deliver tailored advice and personalize a portfolio across asset classes. But as more asset classes are tokenized, crypto rails enable strategies — personalized with AI recommendations and co-pilots – to be executed and rebalanced instantly and with minimal cost.

This is more than just robo advisors: Everyone can access active portfolio management, not just passive management. In 2025, TradFi increased its allocation of portfolio exposure to crypto (banks [now recommending](https://finance.yahoo.com/news/bank-of-america-says-its-wealth-management-clients-may-put-up-to-4-of-their-portfolio-in-crypto-220028738.html) 2-5%, either directly or via [ETPs](https://a16zcrypto.com/posts/article/eth-etf-etp-faq/)), but that was just the beginning; in 2026, we’ll see platforms built for “wealth accumulation” — not just “wealth preservation” — as fintechs (like Revolut and Robinhood) and centralized exchanges (like Coinbase) leverage their tech-stack lead to own more of this market. Meanwhile, DeFi tools like Morpho Vaults automatically allocate assets into lending markets with the best risk-adjusted yield — providing a core yield-bearing allocation in a portfolio. Holding remaining liquid balances in stablecoins rather than in fiat — and in tokenized money market funds rather than traditional money market funds — expands the possibilities for further yield.

Finally, retail investors now have easier access to more illiquid private market assets such as private credit, pre-IPO companies, and private equity, as tokenization helps unlock these markets while still maintaining compliance and reporting requirements. As the various components of a balanced portfolio become tokenized (moving along the risk spectrum from bonds to stocks to privates and alts), they can be automatically rebalanced without having to do wire transfers and more.

*~Maggie Hsu, a16z crypto go-to-market team*

## The internet becomes the bank

As agents arrive en masse, and more commerce happens automatically in the background rather than through user clicks, then the way money — value! — moves needs to change. In a world where systems act on intent instead of on step-by-step instructions — moving money because an AI agent recognized a need, fulfilled an obligation, or triggered an outcome — value has to travel as fast and freely as information does today. This is where blockchains, smart contracts, and new protocols come in.

A smart contract can already settle a dollar payment globally in seconds. But in 2026, emerging primitives like x402 make that settlement programmable and reactive. Agents paying each other for data, GPU time, or API calls instantly and permissionlessly — without invoicing, reconciling, or batching. Developers shipping software updates that come bundled with built-in payment rules, limits, and audit trails — without fiat integrations, merchant onboarding, banks. Prediction markets that self-settle in real time as events unfold — where, without a custodian or exchange, odds update, agents trade, and payouts clear globally in seconds… without a custodian or exchange.

Once value can move this way, the “payment flow” stops being a separate operational layer and becomes a network behavior. Banks become part of the internet’s basic plumbing, assets become infrastructure. If money becomes a packet the internet can route, then the internet doesn’t just support the financial system — it becomes the financial system.

*~Christian Crowley and Pyrs Carvolth, a16z crypto go-to-market team*

## Unleashing the full potential of blockchains… when legal architecture finally matches technical architecture

One of the biggest barriers to building blockchain networks in the U.S. over the last decade has been legal uncertainty. Securities laws have been stretched and selectively enforced, forcing founders into a regulatory framework built for companies rather than for networks. For years, mitigating legal risk replaced product strategy; engineers took a backseat to lawyers.

This dynamic led to lots of weird contortions: Founders were told to avoid transparency. Token distributions became legally arbitrary. Governance became theater. Organizational structures [optimized for](https://a16zcrypto.com/posts/article/end-foundation-era-crypto/) legal cover. And tokens were designed to avoid economic value/ not [have a](https://a16zcrypto.com/posts/article/defining-tokens/) business model. Worse yet, crypto projects that played fast and loose with the rules often outpaced the good-faith builders.

But crypto market structure regulation — which the government is closer to passing than it’s ever been — has the potential to eliminate all of these distortions next year. If passed, this legislation would incentivize transparency, create clear standards, and replace “ [enforcement roulette](https://a16zcrypto.com/posts/article/defining-decentralization-control/) ” with more clear, structured paths for fundraising, token launches, and decentralization. After , the proliferation of stablecoins has exploded; legislation [around](https://a16zcrypto.com/posts/article/genius-act-clarity-act-crypto-legislation-explained/) crypto market structure would be an even more significant shift, but this time for networks.

In other words, such regulation would enable blockchain networks to operate like networks — open, autonomous, composable, credibly neutral, and decentralized.

*~Miles Jennings, a16z crypto policy team and general counsel*
