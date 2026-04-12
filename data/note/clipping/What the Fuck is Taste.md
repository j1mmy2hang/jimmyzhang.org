---
created: 2026-02-25
published: 2026-02-24
source: https://x.com/amytam01/status/2026400911451676829
type: "[[Clipping]]"
rating: 3
---
In college I took a class on what it means to be human. We spent weeks eliminating the obvious answers: intelligence, tool use, language. Now AI is working on all three.

That class never gave us a clean answer. The closest we got was "the ability to collectively believe in things that don't physically exist." Money. Borders. Companies. Gods. Humans are the only species that can coordinate around shared fictions at scale, and that capacity is the foundation of everything we've built.

Taste is exactly that kind of thing. It's not a property of an object. ==It's a collective agreement about what's good, built up through centuries of culture, transmitted through exposure and education and social context.== It's a shared fiction. And it turns out to be the hardest thing in the world to build into a model.

## What taste actually is

Bourdieu called taste cultural capital: the internalized standards that let you recognize quality, make judgment calls, know which rules to break and when. Taste is knowing when the violation serves the work better than the rule does. It's shaped by exposure, education, and social context. It's both personal and collective. And it's generative, it doesn't just reflect a worldview, it creates one. The person with taste doesn't just react to the world, they shape what the people around them think is worth reacting to.

The most important version of this is failure recognition: knowing when something is almost right but not quite, and being able to say precisely why. Think of wine tasting. Most people can tell when a wine is off. Very few can say it's because the tannins are too grippy for the fruit weight, or that the oak is masking the finish. The feeling is universal. The articulation is rare. And it's nearly impossible to train toward, because you can only train toward what you can measure, and this kind of taste is almost impossible to measure without someone who already has it.

That's what makes taste so hard to compress. It's not a fixed target. It's a moving agreement that gets negotiated continuously through culture. You can't scrape it off the internet because by the time it's written down it's already shifting.

## The problem with general taste

Large models trained on internet-scale data develop something like taste, but averaged across every domain, every style, every standard of quality that has ever been written about. Which means it's nobody's taste specifically.

General taste is still generally useful. It's why models feel impressive the first time you use them. But for practitioners doing real work, general taste is subtly wrong in ways that compound and soon you find yourself spending more time editing and reviewing than it would have taken to generate the content in the first place.

The model produces things that look right to a generalist and feel off to an expert. And because the expert often can't fully articulate why it's off, the feedback loop that would fix it never closes properly. The solution isn't a better general model, it's a more specific one.

## Taste in practice

We're in the early stages of taste getting distilled into smaller and smaller units.

The first wave is vertical. In domains where the feedback signal is clear enough, reactions either work or they don't, code passes or it doesn't, the model can be trained against reality rather than a generalist's approximation of it. Easy to grade at the surface. But even here taste creeps in: code that passes tests can still be unreadable, unmaintainable, wrong in ways the tests don't catch. A financial model can be mathematically sound and still be built on the wrong assumptions. The lower levels are verifiable. The higher-order judgment isn't. We're already seeing this with neolabs building models specifically for coding, finance, math, and bio and physical science, domains where ground truth is verifiable enough to close the loop at the lower levels.

The second wave is enterprise. A law firm post-training on ten years of internal memos and partner reasoning traces is distilling institutional judgment: which arguments their partners find persuasive, what a good answer looks like in this specific room. DoorDash uses RL environments to optimize dispatch across a three-sided marketplace of consumers, dashers, and merchants. What counts as a good dispatch isn't just mathematically optimal. It reflects how DoorDash has decided to weight competing priorities in real time. In both cases the feedback signal is murkier than vertical. The taste is specific to the institution, shaped by its values, its politics, its history. You can't distill it from the outside. You have to be inside long enough to absorb it.

The third wave is individual. One model per person, trained on your goals, your data, your judgment traces. Of the three waves, individual taste is the fastest moving target: your preferences evolve, your standards shift, shaped by everything you read and experience. The model isn't capturing a fixed thing, it's tracking something in constant motion. Most people can't fully articulate their own taste even to themselves. You have preferences you don't know you have until something violates them. A model trained on your behavior might know your taste better than you do.

Each wave moves further from verifiable ground truth and closer to pure human judgment. Which is why they all eventually hit the same wall: you can't distill taste you can't measure.

## An acquired taste

Distilling taste at the level that matters requires someone who already has it.

This creates a chicken and egg problem at the heart of building AI for high-judgment domains. You need good AI to build tools experts will actually use. But you need expert workflow data, real traces of how practitioners actually work, to build AI with real taste in that domain. The data doesn't exist until experts use the tool. Experts won't use the tool until the AI is good enough.

Someone has to break that cycle by being useful enough today, with imperfect taste, that practitioners actually adopt the product and start generating the signal that improves it. Cursor is the clearest example. Their reward signal isn't "did the model write correct code," it's "did this specific user accept this completion in this codebase." Every accept and reject is a labeled training example. The model gets better at being useful to you specifically, not at coding in the abstract.

The companies that have broken that cycle are accumulating something that can't be purchased or replicated: live workflow data from practitioners doing real work.

## Taste is human

==Taste is the accumulated judgment of everyone who came before you, filtered through your own experience, applied to problems that don't have right answers.== Most people have it in at least one domain. Very few can articulate it. That gap, between having taste and being able to teach it, is where the next decade of AI value gets built. It's the most human thing we have to offer.
