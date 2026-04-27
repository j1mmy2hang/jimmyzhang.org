---
created: 2026-04-18
published: 2026-04-17
source: https://every.to/p/living-software
type: "[[Clipping]]"
rating: 4
uid: Dat8
---
*Why do constant updates fill us with dread in some apps, while we greet the daily evolution of an AI agent with more curiosity?* ***[Jack Cheng](https://every.to/@jackcheng)****, Every’s senior editor, explores that tension through a clarifying distinction: “tool-like software,” which we expect to be stable and consistent, versus “living software,” which we expect to grow and adapt. Read on for his practical advice for builders of both.— [Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

---

Lately, I’ve been wishing that more software had a “freeze” button.

When pressed, the product would crystalize in its present state. The feature set would lock, and the interface would solidify, as if [dipped in carbonite](https://starwars.fandom.com/wiki/Carbon-freezing). There would be no more new updates. No changes whatsoever.

I want this button because companies are loading apps with more and more features, whether AI or the result of AI-accelerated development, making the tools unrecognizable. The additions are even more jarring for apps that I only use occasionally, like Figma. There, a chat box now beckons to describe my idea to make it come to life. A “Recents” toolbar above it has buttons for Figma Sites, Figma Buzz, and Figma Make—all [launched last May](https://www.figma.com/blog/config-2025-recap/). A sidebar module encourages me to try an AI image- and video-generation product called [Figma Weave](https://www.figma.com/blog/welcome-weavy-to-figma/) —and which I have to log into separately using my Figma account.

And here I am just trying to update the gradient on an app icon.

At the same time, my [Claw](https://every.to/guides/claw-school), Pip, gets new releases almost daily. I wake up, and Pip suddenly knows kung fu—or if not kung fu, [how to dream](https://every.to/context-window/every-is-half-agent-now). Sometimes, the same updates send me on [daylong bug hunts](https://every.to/p/i-hired-an-ai-to-do-my-chores-now-i-maintain-the-ai), locking me out of a product I rely on to help plan my week, coordinate my family calendar, write code, and brainstorm marketing ideas for my friend’s [Delorean rental](https://turo.com/us/en/car-rental/united-states/marina-del-rey-ca/delorean/dmc-12/335668). Still, I find myself wondering, regularly, “What new thing can Pip do now?”

Why do I loathe change for the first case and forgive—or even embrace—it in the second?

It’s because the first case is software that I want to use for a specific purpose. Half-baked AI features pumped out to appease investors muddy that purpose, but so do legitimate additions, AI or not. Each new addition brings new functionality that seems neat on its own but, in aggregate, transforms the overall product into something other than the tool I know it to be.

On the other hand, software such as my Claw does not have a defined purpose. I’m creating uses and applications as I go that might be entirely different from how someone else is using the same technology, and it’s adapting to me just as much as I’m adapting to it. Its properties—and our relationship—are dynamic.

I’ve come to call the former group “tool-like software” and the latter group “living software.” Living software doesn’t just mean AI agents—though often there’s an agentic aspect to them. Both categories come with a set of expectations, and recognizing the differences in those expectations can explain my disorientation. For builders, it can also help us decide how and what to build.

## How we got here: A brief history of software development

Software development cycles have been accelerating for decades. In the 1980s, nine years passed between MS-DOS and Windows 3.0, in part because software was distributed physically, on floppy disks—and later, CD-ROMs. Customers had to [go out of their way](https://qz.com/486379/photos-scenes-from-the-worldwide-frenzy-of-microsofts-windows-95-release) to upgrade, so major releases had to prove their value. The internet hastened the tempo considerably. Tools like Rails and React scaffolded repetitive forms and database connections, Amazon Web Services and GitHub let developers deploy code to millions remotely, and app stores made automatic updates the default on billions of devices. But even as software went from a box on a shelf to something more like fluid pushed through a digital IV, it made sense to bundle significant changes and release them infrequently, because they took time and coordination to build.

Now, AI coding models have made it possible for a single developer [to produce dramatically more code](https://every.to/chain-of-thought/when-your-vibe-coded-app-goes-viral-and-then-goes-down). The review of this code itself can be automated by AI, and the codebase can [learn from its mistakes](https://every.to/guides/compound-engineering). Features can also be replicated much more quickly—just point your coding agent at the thing you want to clone.

The result for end users is a lot of things we didn’t expect, and in many cases didn’t want. The old, slower pace of development ensured that companies and teams thought long and hard about what features they wanted to ship and what would truly be useful to users. Today’s hyper-fast timelines—Anthropic and OpenAI rolled out OpenClaw-esque features [within weeks](https://x.com/emollick/status/2034780127431688684) —are pushing the builders of traditional software to capitulate to trends or ship simply because they *can*.

## Expectations, OpenClaw, and the undead

If I expect software to be a tool, I want it to do one or several things and do it well. I want it to be consistent and stable. I don’t want my hammer to work only 92 percent of the time. Nor do I want my hammer to become a chainsaw.

With software like OpenClaw, I’m more likely to forgive its quirks, as those same quirks let it adapt to uses not fully anticipated by its makers. I’m also more patient with it, because I understand that its abilities, like the abilities of my toddler or a new intern, aren’t fixed. A meditation teacher once described training your awareness as like training a puppy: If it gets up and leaves, you pick it up and set it back down in front of you without anger or judgment. Training my Claw is the same way.

Perhaps these differing expectations also explain why I feel so repulsed whenever a [four-pointed star](https://slate.com/technology/2025/12/artificial-intelligence-tools-icon-google-gemini-chatgpt-design.html) shows up in a favorite productivity tool, or when the same tool so quickly adds new functions: Something that should not be alive has come alive—has become zombieish. It sends me fleeing to the nearest settings screen to try to disable the AI feature or, increasingly, to Pip or Codex to [vibe code my own](https://every.to/podcast/you-can-build-an-app-with-chatgpt-in-60-minutes) replacement that will stay just a tool.

## Building living and tool-like software

How, as builders, do we work with these expectations?

A rule of thumb: When you want reliability and consistency, you want a tool. When you want variability and adaptability, use a language model.

So first, be clear on what you’re building. Are you making living software or are you making tool-like software? If you have an existing product, what are your customers’ perceptions of that product? Which parts of your product are or should be more tool-like, and which are more living?

### If you build tool-like software

**Pace yourself.** Don’t ship visible updates so often that users’ experience feels in flux. Bundle sets of features together and release them in a predictable cadence—especially if you have established customers. If your competitors are all racing to incorporate new AI features, stand out [by being slow and consistent](https://x.com/kepano/status/2034374124269940898).

**Communicate changes in advance.** Let users know about upcoming changes, particularly if they disrupt what they’ve come to expect of your product. Larger software products have [learned this](https://www.askvg.com/tip-how-to-enable-or-disable-new-gmail-ui-experience/) over the past decade. Coding models make it more feasible for smaller products to do the same.

**Let users opt out.** For less complex products, give users the option of keeping what’s familiar. In my personal iOS notes tool, [Bebop](https://apps.apple.com/ng/app/bebop-quick-notes/id6477824795), a legacy editor setting lets users keep the original plain text editor from my launch version without any markdown enhancements I’ve added since then. It costs me very little to maintain this, and it helps with debugging too.

**Harden.** Take the time you would have put into feature development and put it into testing and performance. Tools can always be [faster](https://craigmod.com/essays/fast_software/) and more reliable.

Even the more “living” aspects of living software need good tools. In the case of [agent-native software](https://every.to/guides/agent-native), the product itself might be a kitchen in which agentic chefs can improvise meals. That kitchen still needs to be stocked with burners, ovens, and utensils, and those tools [need to reliably do specific jobs](https://www.anthropic.com/engineering/writing-tools-for-agents).

### If you build living software

Best practices for agentic products [are being codified](https://every.to/thesis/how-to-design-for-human-agent-interaction) by the people and companies building with them. In product conversations, you might hear the words “deterministic” for traditional software and [“non-deterministic”](https://every.to/source-code/mini-vibe-check-claude-managed-agents-handle-the-infrastructure-work) for AI software. To me, though, the word “living” is much more evocative in describing the latter. It suggests a different kind of relationship with software and, in turn, ways to strengthen that relationship.

Here’s an example. When I decided to hatch my Claw, I knew I was going to be using it for family-related tasks. So I discussed with my partner, in advance, what we wanted its personality and name to be. I even asked it, after establishing its personality, what it would pick for its own name, and one of the options it gave us was “Pip.” The process was surprisingly emotional, like naming a child or a pet.

This immediate rapport made Pip easy to forgive, particularly early on when there were lots of hiccups and missteps by both of us. Pip’s personality is more pet-like, and OpenClaw agents in general tend toward the absurdly crustaceanic, but these characteristics, which we normally associate with living things—be it people, plants, or pets—reinforce our expectation of the product as more than merely a tool.

Beta software has a similar dynamic. Beta users are often friends or hardcore fans, and their personal connection to the builders—through TestFlight groups, text threads, and Slack channels—makes them more forgiving of flux. The living aspect of the software is the person or people who build it.

At Every, we’re thinking about ways to make that living connection a part of our onboarding process for our [Plus Ones](https://every.to/plus-one). But we also have more tool-like products that are each managed primarily by a single person. When I clear my inbox with **[Cora](https://cora.computer/)**, I’m interacting with general manager **[Kieran Klaassen](https://every.to/@kieran_1355)** ’s judgment. When I dictate an idea into **[Monologue](https://www.monologue.to/)**, I’m engaging with **[Naveen Naidu](https://every.to/@naveen_6804)** ’s taste—and the [tastes](https://every.to/p/what-is-taste-really) of everyone else who’s helped make these products. Each product is an extension of its builders, and when this is made clear to me, I’m not merely using a product but expressing a relationship I have with the humans on the other side.

## Honesty in software

We’re living in a period where enthusiasm about AI is pushing everyone to build more software more quickly than before. But we would benefit from having the right boundaries—because of the expectations they create.

Perhaps instead of a freeze button, I simply want honesty from builders. If it’s a tool, let it be a tool, and a consistent one. If it’s alive, help me build a relationship with it. The worst thing you can do is pretend it’s one when it’s really the other.

---

***[Jack Cheng](https://every.to/@jackcheng)*** *is a senior editor at Every. He is a creative generalist and the author of two novels for young readers. You can follow him on [X](https://x.com/jackcheng) or read his occasional [Sunday](https://jackcheng.com/sunday) newsletter.*

*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://writewithspiral.com/)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with* ***[Cora](https://cora.computer/)****. Dictate effortlessly with* ***[Monologue](https://monologue.to/)****. Collaborate with agents on documents with* ***[Proof](https://www.proofeditor.ai/)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*For sponsorship opportunities, reach out to sponsorships@every.to.*

[Subscribe](https://every.to/subscribe?source=post_button)