---
created: 2026-02-22
published: 2026-02-20
source: https://every.to/p/how-luxury-handbags-can-help-solve-ais-context-problem
type: "[[Clipping]]"
rating: 4
uid: u6zt
---
![](https://d24ovhgu8s7341.cloudfront.net/uploads/post/cover/3948/full_page_cover_handbag.png)

## How Luxury Handbags Can Help Solve AI’s Context Problem

Go from knowing everything about a customer to knowing the one thing that moves them

*TL;DR: If 2025 was the year every business got an agent, 2026 is the year they realize what those agents are missing: the right context. This is a problem that entrepreneur* ***Andy Rossmeissl*** *has spent his career on before LLMs even entered the picture. Knowing the right information about your customers, he argues, is key to making their buying experience feel bespoke. That can be as small as knowing when they are going for cocktails on Friday. His practical playbook to curating context shows you how to go from knowing everything about a customer to knowing the one thing that moves them.— [Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

---

Next time you find yourself in New York City, stand in the line on 63rd Street, just east of Central Park. Wait long enough with the other well-heeled shoppers, and they will let you in. You will be greeted by a sales representative who will plug your contact information into a discreet handheld device and encourage you to hold one of their handbags. Thus begins your journey as a client of Goyard, the legendary luggage-makers.

You may, like me, leave empty-handed—they are pricey, after all. But Goyard has not forgotten you. Your rep will text you later with a picture of you holding your favorite bag, taken with that handheld device earlier. The text arrives at just the right time—8 p.m. on a Friday. You’re out with friends, on your second cocktail, and in the warm glow of the evening, the bag suddenly feels affordable. It feels necessary.

This is not an accident, nor is it magic. Your rep texted you on Friday at 8 because you told her you’d be out drinking cocktails on Friday at 8. And when you’ve inevitably purchased your handbag on Saturday afternoon, you’ll finally understand the Goyard rep’s superpower: her ability to collect, curate, and employ context.

This anachronistic sales methodology is called clienteling. Sending perfectly timed texts pays off in a world of six-figure accessories, but for software or sunglasses, it’s not a scalable approach. Cracking that conundrum—making sales feel personal at scale—has been at the core of my career as CEO of Faraday, which helps brands predict what their customers are likely to do next and reach them in the right moment.

Now we have AI agents, and with them, companies have the chance to guide every customer along a bespoke journey. The raw LLM muscle can make every experience feel like Goyard’s—without the line. All you need is surgically precise context. The good news is that the context you need to succeed, whether you’re selling handbags or software, is all around you. Here is how to harness it for your business.

## Context: It depends

What’s the best music? Swifties aside, most people will say, “It depends.” Reveilles and lullabies suit different times of day, and you wouldn’t play a funeral dirge at a birthday party. The song isn’t inherently good or bad; it’s good or bad for *this* moment, *this* listener, *this* mood. That’s context.

Most of the modern work you and I engage in is made up of “it depends” questions: Which message should this person see? Which feature should we highlight? Call or text? Knowledge alone rarely answers these questions. You also need to know *who* you’re dealing with and *what* surrounds the decision.

My company, [Faraday](https://faraday.ai/), spends its time solving one particular version of this problem: helping consumer brands use context to decide how to engage each customer. But the pattern isn’t unique to marketing. A founder launching a product, a writer telling an interactive story, a developer tuning onboarding flows—they’re all, in one way or another, trying to get from “It depends” to “Do this next.”

Once you understand the importance of context, you will understand that every customer interaction takes place in that 63rd Street showroom. Your moment with the customer is an arena, a stage, and when you summon or solicit context, you can shape the experience for them. You’re aligning your product, content, or itinerary to the customer rather than the other way around. In the case of Goyard, that means aligning with a customer who is willing to wait in a line outside a boutique in one of Manhattan’s most expensive streets.

## Enter agents

By this point, whatever your line of business, you will have been met by a profusion of [agentic tools](https://every.to/thesis/the-race-is-on-to-redesign-everything-for-ai-agents) offering to handle technical support, sales, marketing, finance, legal—you name it. Broadly speaking, these tools, or at least the reputable ones, work. Agents, armed with tools, working together in a loop toward an objective, can accomplish routine tasks.

I don’t endorse any of these tools in particular. They all wrap one or the other of the same few LLMs or reinforcement learning algorithms and are inspiring feats of engineering. But they’re all missing something.

You guessed it: context. That’s not to say they come with none. Good tools will connect to inventory, email, and other communications history, documentation, and any other source of ready first-party data. What’s missing is context about *you*. Sure, they know what you bought, but why?

## How you can solve agents’ context problem

To fix the context problem, start by procuring data on each customer—demographics, interests, behavioral signals—that goes beyond what they would tell you directly. This generally means enriching with third-party tools. In the B2B world, [Clay](https://clay.com/), which collects data from sources such as LinkedIn, is a common starting point, while consumer brands generally turn to data brokers. Whatever vendor you choose, you will submit anonymous identifiers for your customers and receive data back in return.

Now you have a new problem. For all their apparent brilliance, agents actually have [relatively small “context budgets”](https://faraday.ai/blog/context-engineering-and-demographic-data): Give them too much, and they get overwhelmed and start to hallucinate. Vendors offer thousands of data points. Which ones matter?

The struggle to curate this data has given rise to what Anthropic calls [context engineering](https://every.to/context-window/the-better-ai-gets-the-more-it-needs-us). Put simply, agents can only process so much context at once—feed them too much, and they lose focus. You want to make every detail you give them count.The Goyard rep doesn’t memorize everything you said (it’s OK, you were nervous)—she filters for what matters, in this case, your cocktail plans. At scale, machine learning does the same filtering for you. Try clustering your customers with [an algorithm](https://faraday.ai/blog/k-means-clustering-customer-personas) to figure out which dimensions, such as income or location, distinguish your best customers from the rest. Build a decision tree ensemble, a model that finds patterns by asking a series of yes/no questions about your data, to identify which attributes offer early clues to eventual high spend. Platforms like Faraday do this machine learning automatically, or ask an LLM to help you build something yourself.

These techniques act as a filter for your agents. You can use them to distill thousands of customer details into a handful of values that won’t overwhelm the model but will move the needle.

Now that you have the context you need, it’s time to impart it to your agents. You can use advanced techniques like [model context protocol (MCP)](https://every.to/podcast/he-s-building-the-plumbing-for-ai-to-use-the-internet), which allows you to link an AI model to different data sources, to empower the agents to retrieve the context when they need it. In practice, however, it’s often easier to just put the key details in the prompt.

> *You are a helpful sales representative at a luxury goods store. An {{indecisive}} customer is considering a certain item, and you have taken a picture of them wearing it. Among countless trivia, he has told you {{he will be out for drinks at 8}}. You have his cell phone number. Design an engagement plan optimized for purchase.*

Piece of cake.

## Our agentic future

Breathtaking progress on the LLMs will surely continue, but mere access to these technical marvels is no longer a differentiator. The leverage you have in this brave new world is the same as Goyard’s in its anachronistic old one: context.

2026 is the year of context. The entrepreneurs who win will be those willing to go the extra mile to discover, assemble, and incorporate every piece of context into their workflows. Whereas in the past, a blowout context smorgasbord wouldn’t have been worth it—humans can only process so much—agents can handle much more.

Some will subject their helpless agents to a deluge of irrelevant details. You, on the other hand, know that less is more, that quality beats quantity, that the cocktail plan reigns supreme. This is the most human wisdom of all: that context is everything; that even in the shadow of towering knowledge, it’s the little things that count.

---

***Andy Rossmeissl*** *is the cofounder and CEO of Faraday. Follow him on [LinkedIn](https://www.linkedin.com/in/rossmeissl).*
