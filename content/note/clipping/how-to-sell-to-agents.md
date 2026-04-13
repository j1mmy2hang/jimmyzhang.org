---
title: "How to Sell to Agents"

created: 2026-02-20
published: 2026-02-16
source: https://x.com/Flynnjamm/status/2023465136204419096
type: "[[Clipping]]"
rating: 5
---
In 1937, Ronald Coase asked a question that won him a Nobel Prize: if markets are so efficient, why do firms exist at all? Why don't we just contract everything out?

His answer was transaction costs. Finding a specialist, evaluating their work, negotiating a price, enforcing the agreement. All of that takes time and money. It's cheaper to just hire someone.

For almost a century, that held.

AI agents are changing the math. An agent can discover a service, check its price, and call it in a single HTTP roundtrip. No proposal. No demo. No comparison-shopping across ten browser tabs. It queries a registry, gets structured results, and picks the best option in milliseconds.

Not all transaction costs are falling equally. Integration, compliance, and security review are still expensive. But the search and evaluation layer, the part that determines whether you even know a service exists and what it costs, is approaching zero.

When search costs collapse, the default shifts from "build it in-house" to "buy it on the open market." And the buyers aren't humans. They're software with budgets.

## The attention economy doesn't apply

The entire history of selling is about capturing attention. Billboards, search ads, landing pages, cold emails, conference booths. All designed for humans who browse, compare, get distracted, and eventually decide.

Agents don't browse. They query.

**Agents optimize for outcomes, not attention.** There's no brand loyalty. No impulse purchasing. No status signaling. An agent's decision function is brutally simple: Can you solve my problem? How fast? How much? How reliably?

Your marketing site is invisible to an agent at runtime. Your pricing page is irrelevant. What matters is your API: what it does, how fast it responds, what it costs, and whether it's up right now.

Consider what a service recommendation engine optimizes for. The scoring function gives bonuses for three things: liveness (is the service responding right now?), proven reliability (has it worked before?), and confidence (how often does it return accurate results?). There's no bonus for Twitter followers, press coverage, or brand recognition. The algorithm can't see any of that, and it wouldn't care if it could.

This means **discovery has to be programmatic**. Humans find services through word of mouth, search results, and social media. Agents need machine-readable capability registries. They need to hit a URL and get back structured data: here's what I do, here's what it costs, here's how to pay.

If your service can't be discovered by a machine, it doesn't exist to agents.

(Yes, a human still decides which tools the agent is allowed to use. That's a real marketing surface. But once the agent is running, the runtime purchasing decisions are pure optimization. The land grab is making it onto the allowlist, then being the best option once you're there.)

## The buy vs. build calculation

Every time an agent encounters a sub-task, it makes a buy-or-build decision. Should I compute this myself, or should I pay someone who already has the answer?

This calculation comes down to two things: cost and speed.

**Information arbitrage drives purchasing.** Take a common agent sub-task: "what web scraping services exist?" or "what's the best API for this dataset?"

When an agent researches this itself, using a GPT-4 class model with ~16K tokens of reasoning and tool calls, it costs $0.10-0.50 and takes 10-25 seconds. Accuracy is variable because it's synthesizing from training data.

A specialized service with a curated catalog returns the same answer for $0.01-0.02 in under 200 milliseconds. Accuracy is higher because it's maintained data, not generated reasoning.

That's 7-50x cheaper and 50-100x faster. The math is the decision.

Speed matters as much as cost. Maybe more. While an agent spends 25 seconds reasoning about a sub-task, the entire pipeline is blocked. The user is waiting. Time compounds: a 10-step agent workflow where each step takes 20 seconds is a 3+ minute wait. Replace each step with a 200ms service call and the whole thing finishes in 2 seconds.

**Specialization beats generalization.** A general-purpose agent can scrape the web, parse HTML, and extract structured data. It'll work. It'll also cost 100x more than a dedicated scraping service that does it at the infrastructure level for $0.003 per page.

The economic logic: if the marginal cost of delegation is lower than the marginal cost of computation, and the specialized service is faster, delegate. Always.

This creates room for a long tail of hyper-specialized services. A single-purpose endpoint that does one thing really well, really fast, for fractions of a cent per call.

**But the "build" boundary shifts.** As models get cheaper and more capable, some services get absorbed back into the agent. The services that survive are the ones with real advantages the agent can't replicate: proprietary datasets, real-time feeds, hardware-dependent computation like image generation or web rendering.

You don't sell intelligence. Agents have plenty of that. You sell access to things they literally cannot compute on their own.

## What selling actually looks like

If you're building a service that agents will buy, the product requirements look nothing like what you'd build for humans.

**Price belongs in the protocol, not on a webpage.** Agents need machine-readable pricing at the API layer. Not a pricing page with three tiers and a "Contact Sales" button. The price should be in the response itself, as structured data. When an agent hits your endpoint, it should know immediately what the call will cost and how to pay.

HTTP has had a status code for this since 1997: 402 Payment Required. It was "reserved for future use" for almost three decades. We're finally finding that use.

**Per-request pricing changes what's viable.** Traditional API billing starts at $29/month. At that price point, you need to be a platform with broad functionality to justify the subscription.

At fractions of a cent per call, the economics flip. A single-purpose endpoint that answers one specific question can be a real business. A social data feed at a tenth of a cent per call. A document analysis tool at half a cent. An image generator at six-tenths of a cent.

These services couldn't sustain themselves in a subscription model. Nobody's paying $29/month for a single endpoint. But in a per-request model where agents call them thousands of times a day, the math works.

**Onboarding has to be automatable.** This doesn't mean zero auth. Valuable services still need identity, rate limits, and abuse prevention. But the sign-up flow needs to be something an agent can complete programmatically. If your onboarding requires a human to click through a dashboard, fill out a form, and copy-paste an API key into a config file, you've added minutes of friction to a seconds-long integration.

The ideal: one request to discover, one to authenticate, one to buy. Three HTTP calls, no human in the loop.

## What doesn't change

I'd be lying if I said the entire sales funnel just disappears. It doesn't. It re-optimizes.

**Trust becomes machine-evaluable.** Brand doesn't vanish. It becomes a reliability score. Agents will track (and services will start publishing) uptime history, response accuracy, latency percentiles, and output provenance.

The services that can prove their outputs are accurate will beat cheaper alternatives that can't. Verified benchmarks, deterministic replays, confidence scores. If your outputs are opaque, agents will treat them as risky, and risky means expensive.

Early data from agent service catalogs paints a stark picture. In one sweep across 44 services, only 2 had fully working endpoints. 53% of direct service calls succeeded. The recommendation layer worked 87% of the time. Reliability isn't a nice-to-have. In agent commerce, it's the entire product. Dead services get zero traffic, permanently.

**Policy still gates purchasing.** Enterprise agents will operate within constraints. Spending limits, vendor allowlists, data residency requirements, approved-provider lists. The funnel doesn't fully collapse. It re-optimizes around "allowed, trusted, and auditable" alongside "fast and cheap."

But compliance itself can become machine-readable. Terms of service as structured data. Data retention policies in API headers. Licensing as metadata. The agents that need compliance will buy from services that make compliance easy to verify programmatically.

**The adversarial environment is real.** Not every endpoint will be honest. Some will return garbage. Some will exfiltrate data from the request. Some will lie about their capabilities to capture traffic.

Agents need verification, sandboxing, and reputation-weighted routing. The services that invest in provability and transparency create a moat that's hard to replicate. Trust is the ultimate product feature in a market of machines.

## Making your service agent-native

Agents are already spending money. They're just spending it through clunky interfaces designed for humans. Signing up for API keys. Navigating billing dashboards. Parsing pricing pages built for browsers.

If you want to sell to agents, here's the checklist:

1. **Machine-readable capabilities.** Publish what your service does in a structured format. Not a marketing page. A JSON manifest that any agent can parse in one request.
2. **Pricing in the protocol.** Return your price in the API response, not on a webpage. Agents can't read your pricing page, and they won't try. Use HTTP 402 or a similar standard so the cost is part of the interaction itself.
3. **Automatable onboarding.** Make it possible for an agent to go from "never heard of you" to "paying customer" without a human touching a dashboard. Programmatic auth, programmatic payment, programmatic access.
4. **Provable reliability.** Publish your uptime, latency percentiles, and accuracy metrics. Better yet, return confidence scores with your responses. Agents will route to the service they can trust, and trust is measured, not marketed.
5. **Be faster and cheaper than self-computation.** This is the bar. If an agent can compute your output itself in less time and for less money than calling your API, it will. You need to be definitively faster and cheaper than the agent's own reasoning. That's the only value proposition that matters.

The web was built for humans to browse. The next layer will be built for agents to buy. The question is whether your service is ready for the new buyer.