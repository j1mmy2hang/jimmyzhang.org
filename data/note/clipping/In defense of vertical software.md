---
created: 2026-02-20
published: 2026-02-18
source: https://x.com/gsivulka/status/2024187126020272197
type: "[[Clipping]]"
rating: 5
---
Right now everyone in this industry is asking some version of the same question: in a world where Anthropic, OpenAI, and Google are pouring hundreds of billions of dollars into building the most powerful general-purpose AI systems in the world, why does vertical software need to exist? How does a company like Hebbia earn a right to win? Why don’t the foundation models just eat everything?

I’ve been reading all the discourse about this in the last few weeks—the arguments about moats being dead, the rebuttals, the counter-rebuttals. I’ve heard the pitch that LLMs destroy learned interfaces, vaporize business logic, commoditize data access, and in the end leave vertical software companies with nowhere to hide. And I agree with more of it than you’d expect.

But I think the problem with all of this is that it misses the point.

At the most basic level, enterprise software is just code; it’s an accessible interface and a backend connected to important data and systems of record. But if you think that’s where the value of software comes from, you don’t understand why vertical software companies succeed. The value of enterprise software comes from understanding the process and the organization well enough to make the software do exactly the right thing.

And I think that process engineering, and the network effects that arise from it, will continue to be the foundational advantage for vertical software.

## The last mile is the entire problem

Take finance, the industry that Hebbia focuses on. From fifty thousand feet, every firm looks identical. They all do due diligence; they all come to opinions on valuations; they all produce memos and presentations, run models, synthesize research. If you’re coming to this industry on Day 1, you could probably write one product spec for all of them.

And no one, absolutely no one, would buy what you’re selling.

You need to zoom in. Not to the firm level, but beyond that—to the team level, the desk level, the MD level. The world has a surprising amount of detail. The private credit team at one firm uses a completely different set of compliance flags than the private equity team at the same firm, let alone at a competitor. Two MDs at the same bank will have entirely different standards for what a good CIM summary looks like. One team runs their diligence process through a forty-page template; the team down the hall does it all in a shared spreadsheet that gets emailed around. And all of these workflows are consistent and powerful in ways that have calcified over years and decades of collaboration.

This is the real meaning of “last mile.” “Last mile” doesn’t mean the final configuration step before a product go-live, but a recognition that what you’re deploying isn’t just software but an embodiment of how a specific team of specific people does their specific job. The way they do their particular job might be 90 percent routine and 10 percent idiosyncratic to the preferences of a particular MD. But while the first 90 percent is the easy part, the 10 percent is where deals get done and careers get made. That is where all the differentiated value resides. And that is where you build your moat.

Lines of code are the least interesting part of software. Software that works means that somebody sat down and designed a workflow, and the logic of that workflow encapsulated the way that things are done. Software is a stored process. It’s not a neutral tool: it’s an opinion for how a group of people should collaborate, encoded in a durable system. Software is a social contract.

General-purpose AI tools, however strong they get, can’t be opinionated in that way. That’s not a criticism of them: it’s a structural reflection of what they have to do. Anthropic and OpenAI are building for every use-case on earth at once; they can’t be opinionated about the specific preferences for how the KKR credit team likes to structure things. They don’t know, they can’t know, they’ll likely never know: that’s just not their job.

Our job at Hebbia, though, is to know exactly that.

I think that when we’re talking about the “moats” that vertical software has or doesn’t have, that’s exactly what we need to keep in mind. The sociological function of software—the shared expectations, the institutional memory, the fact that your entire team’s muscle memory is integrated with it—is inseparable from the product itself. You can’t engineer load-bearing software from scratch and expect people to just agree on it, because load-bearing software contains social agreements for how a team will cooperate.

I think people need to think seriously about what that really means.

![Image](https://pbs.twimg.com/media/HBdHcHXbUAEOGiV?format=jpg&name=large)

The bear case on vertical software assumes that switching costs were always just interface frictions—the switching costs of migrating from one platform to another—and now that those are evaporating, there’s nothing to protect vertical software. But that’s not why Bloomberg is sticky. Bloomberg is sticky because a generation of finance professionals was trained in Bloomberg, they communicate with each other through Bloomberg. There’s an entire economy and world of social norms built around Bloomberg.

That’s a network effect: shared tooling creates a shared language that becomes powerfully self-reinforcing. And that moat doesn’t go away just because migrations become easy.

The new AI-native tools that win in finance won’t win by being neutral substrates for generic “work.” They’ll win by becoming load-bearing—by knowing the workflows well enough, by having done the work of learning each firm and each desk’s specific version of that workflow, so that replacing them becomes genuinely costly. Not because the interface is hard to learn, but because the institutional knowledge stored inside of them is genuinely costly and difficult to reconstruct.

## Process engineering only becomes more powerful with better models

And I think this becomes only more true as AI models get stronger.

Last year, everyone said that legal AI would get crushed by OpenAI’s o-series releases. The reasoning was intuitive: if the underlying model gets dramatically better, the application layer necessarily gets thinner.

But the exact opposite happened. The o-series releases empowered legal AI to have an unprecedented year. Better models compounded the abilities of application companies' orchestration layers, because the orchestration layer is where the reliability lives. You can have the most capable model on earth and still produce garbage outputs if you don’t have the scaffolding to constrain, verify, and route that capability through a specific professional workflow. At a certain level of capability, the hard part of getting an AI system to do legal work reliably was never the model. It was the orchestration: figuring out exactly when to trust the model and when to check its work, what data to feed it and in what order, how to format outputs so that they’re usable by people in specific roles at specific firms.

> 2025 was the year that AI became truly useful for law; I think that 2026 is shaping up to be that year for finance.

![Image](https://pbs.twimg.com/media/HBdHzlIbUAMMW_6?format=png&name=large)

Finance is a harder domain for AI to deliver value than law, simply because the work is genuinely more complex. Legal work, at its core, is research and drafting. Finance is research, drafting, modeling, multimodal analysis — pulling numbers from a PDF and pushing them into a model, out of Word and into PowerPoint and back into Excel, running sensitivity analysis and then formatting the output to the exact specifications of a specific investment committee. It’s multimodal tool use at every step of the process.

And reliability is where vertical depth matters most. An asset manager doesn't need a system that gets things right eighty percent of the time. In finance, 90 percent right is the same as 100 percent wrong. A model could produce a confident, well-formatted, mostly-correct answer about a deal you’re about to execute; but it gets one detail wrong or formats it in a way that’s different from your desk’s standards and the entire thing is wrong. Every single part has to be reliable, or the whole thing is completely useless.

And building that requires knowing what the work actually looks like.

So I don’t think that any of the foundation model companies can actually win this industry. That’s not because they’re not competent or lack the resources; everyone knows that OpenAI, Anthropic, and Google are full of brilliant people and have unbelievable resources. But they just cannot provide the level of process engineering that finance needs.

And the model providers also can’t provide the neutrality that’s required. Hebbia is model-agnostic by design. That’s not a hedge so that we can pick the cheapest model; it’s a principled position about what it means to be durable infrastructure for institutional finance. Being model agnostic is part of process engineering. The best model for one task is often not the best model for another. And no team wants to bet everything they have on one model provider continuing to be the state of the art.

Our job is to make sure that the best model wins on every task, automatically, and that the institutions we work with are never exposed to the failure of any single provider. That’s what it means to be Switzerland in this market. And Switzerland is a very good place to be.

![Image](https://pbs.twimg.com/media/HBdK3rZXUAEthGA?format=jpg&name=large)

## Finance is where truth has the highest marginal utility

I want to end with the upside case, because I think it’s underappreciated.

Finance is the sector where being right is worth the most money. The marginal value of an accurate answer in an M&A process or in a distressed debt situation, is enormous. The cost of an inaccurate answer is also enormous. There is no other professional domain where the reward for getting things exactly right, and the penalty for getting things almost right but slightly wrong, is so consistently, measurably high.

And that means that finance will consume AI capabilities faster than any other vertical. Not because finance professionals are early adopters or technology enthusiasts, but because the economics of precision are simply so extreme. When the expected value of a correct answer is ten million dollars and the expected cost of a wrong answer is also ten million dollars, financial institutions will pay almost anything for a system that they can actually trust.

And the companies that build that trust, that do the work of understanding how each firm, each team, each MD actually does their work and then encoding that understanding into software that runs reliably at scale: those companies are going to build something genuinely massive. Not because they won a feature race or simply threw “more intelligence” at any given problem, but because they did the grinding institutional work that every great vertical software empire was built on.

That’s process engineering. It’s really hard: it means working firm-by-firm, team-by-team, MD-by-MD.

And that’s where the moat emerges.
