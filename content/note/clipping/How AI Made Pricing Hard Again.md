---
created: 2026-01-06
published: 2026-01-05
source: https://every.to/p/how-ai-made-pricing-hard-again?ph_email=jz9542063%40gmail.com
type: "[[Clipping]]"
rating: 3
uid: gPkY
---
![](https://d24ovhgu8s7341.cloudfront.net/uploads/post/cover/3882/full_page_cover_Robot_with_receipts.png)

Don’t be like MoviePass. Here are five pricing models for a world where growth costs you money.

***[Anh-Tho Chuong](https://www.linkedin.com/in/anhthochuong)*** *has a front-row seat to one of the trickiest problems in AI right now: how to price products when your costs scale with usage. As the cofounder of Lago, a Y Combinator-backed open-source billing company, she’s watched dozens of AI startups hit the same wall—growth that should be cause for celebration instead becomes a path to bankruptcy. In her piece, she breaks down a paradigm shift that’s forcing the entire industry to rethink its business model: AI killed the economics that made traditional SaaS so profitable. So what do you do when your best customers are also your most expensive? Read on for five pricing models built for this new reality, three core principles every founder needs to understand, and a framework for choosing the right approach for your business.—* ***[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)***

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

MoviePass’s [high-profile failure](https://every.to/napkin-math/cogs-how-i-bankrupted-moviepass-c6535dbb-3ea2-4329-ac3e-1249415ae81b) lacked the elaborate deception of Theranos, the mercurial maverick founder of WeWork, and the absurdity of the useless Juicero smoothie maker. Out of all the legendary crashes of 2010, it was just *silly*.

The company’s pitfall was simple: It gave customers $9.95 a month to see up to 30 movies while the company paid theaters $10 per ticket. As it turns out, you can’t offer a 96.68 percent discount for very long.

Companies building products powered by AI today face the same trap. In traditional software as a service, once you have paid your developers and Amazon Web Services for storage, it doesn’t cost you any more if more people use your product. But AI companies pay LLM providers per use. Growth is expensive.

AI vibe coding platform Replit learned this the hard way. The people who use it to code apps and websites pay a monthly fee, plus a bit more if they use it a lot. Meanwhile, Replit has to pay to use the LLMs that power it. Gross margins—revenue minus direct costs—collapsed from 36 percent gross margin last February to [negative 14 percent](https://www.theinformation.com/articles/replits-margins-illustrate-high-costs-coding-agents?rc=65wdzw) in April; it was losing money the more customers used it. By July, it had recovered to 23 percent, but it’s far below the 70 to 85 percent gross margins that traditional SaaS companies enjoyed.

As the co-founder of Y Combinator-backed open-source billing company [Lago](https://www.getlago.com/), which helps companies charge customers and create invoices, I’ve watched dozens of AI companies hit the same wall. It’s clear to me that the era of a one-size-fits-all pricing strategy is over. There is not concrete clear information for founders and teams building with AI and worried about how much to charge when much of their revenue is going toward LLMs.

AI has shrunk not only gross profit margins, but also the margin for error when competition is so fierce. That makes figuring out product pricing and maintaining reasonably healthy margins a full-company effort. If you are building an AI company, more of your team beyond the finance department will need to know about pricing, monetization, and margins.

Founders and builders need to understand the five pricing models that can be adapted to AI tools so companies don’t face bankruptcy from LLM costs. If you follow these new pricing principles for the AI age, you’ll understand why your engineering team needs to care about margins as much as your CFO does, and how to structure pricing that turns AI’s marginal costs from a liability into a competitive advantage.

## AI pricing models: Where they succeed and where they fail

Let’s break down the pricing models on which you can build a sustainable business when much of your costs come from paying LLMs.

### Usage-based pricing: Pay for what you consume

Usage-based pricing is where you only pay for what you consume. This is how infrastructure providers like Amazon Web Services or OpenAI charge their customers—per gigabyte stored or token processed. Replit pays OpenAI per token processed, both input and output, instead of with a fixed subscription.

[![OpenAI charges customers by millions of tokens. One million tokens is roughly 750,000 words. (Source: OpenAI.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_45b9e942-4c63-4c6d-bd0c-27059ffb5db3.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_45b9e942-4c63-4c6d-bd0c-27059ffb5db3.png)
OpenAI charges customers by millions of tokens. One million tokens is roughly 750,000 words. (Source: OpenAI.)

### Seat-based subscription: Still alive and well in the AI era

Seat-based subscriptions—one person, one seat, one monthly fee—were how traditional SaaS companies made their fortunes. [There’s](https://www.forbes.com/councils/forbestechcouncil/2025/04/18/ai-is-reshaping-saas-pricing-why-per-seat-models-no-longer-fit/) [no](https://www.agilegrowthlabs.com/blog/seat-based-pricing-is-dead-how-ai-first-saas-companies-are-monetizing-with-outcome-based-pricing/) [shortage](https://www.thomabravo.com/insights/beyond-the-seat-future-of-saas) [of](https://www.businessinsider.com/saas-ai-changing-how-software-companies-charge-customers-2025-4) opinions that say AI killed this model. Collaborative brainstorming tool Miro proves that it’s still alive and well. The company’s plans now include AI credits (to rate-limit the most expensive features), but customers still pay by the user.

[![Collaborative tool Miro’s plans include a seat-based subscription. (Source: Miro.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_c7cf3f99-4898-4335-8704-0358305784c8.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_c7cf3f99-4898-4335-8704-0358305784c8.png)

Collaborative tool Miro’s plans include a seat-based subscription. (Source: Miro.)

Seat-based subscriptions work when the product facilitates collaboration. AI features cost more to operate, so companies might raise prices per seat. But the real threat is that AI makes teams more productive with fewer people—meaning fewer seats to sell in the first place.

### Subscription with overages: Users pay more when they go over

Subscriptions with overages give customers a base plan with included usage, then charge extra when they exceed it. AI code editor [Cursor](https://every.to/vibe-check/vibe-check-cursor-2-0-and-composer-1-alpha) uses this model, giving developers a certain amount of AI-assisted coding each month before charging more.

[![AI code editor Cursor gives customers an allocated amount of use, then charges more when that is exceeded. (Source: Cursor.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_d1edbefc-7e6c-4219-bf1f-90e4d6957480.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_d1edbefc-7e6c-4219-bf1f-90e4d6957480.png)
AI code editor Cursor gives customers an allocated amount of use, then charges more when that is exceeded. (Source: Cursor.)
  

This model is ideal for products where reliability is paramount, such as code editors, infrastructure, or communication tools. If users weren’t able to use Cursor after going over the included usage, for example, business-critical engineering workflows would be interrupted.

This pricing strategy does risk backlash: When users don’t have good visibility into their spending (or don’t get notifications), you should stay away from charging overages to avoid surprise bills that destroy trust.

### Credit-based pricing: A usage plan that feels unlimited

Some AI companies charge a subscription that includes usage in the form of credits: Buy 1,000 credits for $50, spend 10 credits per AI image and five credits per text generation.

Compared to the overage model, this hybrid pricing model insulates vendors from high AI costs and doesn’t burden customers with worrying about surprise bills; users can’t go over their allocated use unless they buy more credits.

The core advantage of credits is psychological: When the subscription includes enough credits, the subscription *feels* unlimited. Users don’t have the feeling of spending money each time they use it.

Credits are useful in three use cases:

1. **Consumer products** where users don’t understand abstract usage units like graphics processing unit hours (a standard metric for measuring computing use) or LLM tokens. An example of this could be an AI photo editor. Users are more likely to understand how many photos they can edit than “GPU hours.”
2. **Products with many features with different costs**. If generating an AI image costs you $0.50 per image while generating a text summary costs $0.05, a flat “generations” fee won’t work. One power user creating images could wipe out your margins, while someone just creating text barely costs you anything. Credits solve this: You can charge 10 credits for image generation and one credit for text generation. Claude is a good example: When hovering the model selector, it warns me that the more powerful Opus model consumes my usage budget faster.
3. **User-initiated workflows** where usage is always conscious and credits aren’t consumed without user intention. Take the example of a tool such as [Athena](https://www.athenahq.ai/about) that helps companies show up in AI search tools. Users must manually decide how often to run queries about how their brand is performing in generative AI search. The product’s subscription comes with credits users can spend on different models, each consuming a set amount of credits per query.

[![AI SEO tool Athena’s subscription comes with credits users can spend to complete tasks. (Source: Athena.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_fa020cc1-e5d3-4209-a8e3-c2727a0b66e4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_fa020cc1-e5d3-4209-a8e3-c2727a0b66e4.png)

AI SEO tool Athena’s subscription comes with credits users can spend to complete tasks. (Source: Athena.)

  But credits also have downsides: When users don’t understand how credits are consumed or you automatically charge them to top up their account when they run out, it can lead to user frustration.

### Outcome-based pricing: Pay only for the result

Outcome-based pricing is a new pricing strategy enabled by AI: Customers only pay when the AI delivers a specific result. The most famous example is customer service company Intercom’s AI support chatbot [Fin](https://fin.ai/), which charges $0.99 per resolved customer support ticket without human intervention.

[![Intercom’s AI support chatbot Fin charges $0.99 per resolved customer support ticket. (Source: Fin.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_42eaf85e-39fa-44b2-bf34-2ea014d96a5b.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_42eaf85e-39fa-44b2-bf34-2ea014d96a5b.png)

Intercom’s AI support chatbot Fin charges $0.99 per resolved customer support ticket. (Source: Fin.)

  
This looks like the perfect pricing model. But it runs into two problems:

1. Attribution is hard. Did the customer close the chat satisfied or frustrated? You can’t always tell.
2. Most things in business aren’t perfectly measurable. What outcome would an HR agent be paid for? What about an engineer? No metric is perfect.

While outcome-based pricing has [reignited Intercom’s revenue growth to 300 percent](https://www.youtube.com/watch?v=0_opWSfmN8M) after a slump, it’ll only work where success is extremely measurable, such as customer support. Support tickets are rare: You know if they are resolved or not, and one ticket does not affect others. Most knowledge work (such as creating a report about a website’s performance, or an app design) is not this clear-cut, so the four other pricing models are better suited.

## Three core principles of pricing with AI

Now that I have explained the new pricing models that AI enables, let’s look at the principles that founders need to keep in mind when deciding which works best for their company.

### 1\. Pricing flows from your costs

This sounds obvious, but pricing needs to cover your costs (you’d be surprised how often it doesn’t! See: MoviePass). It’s why Cursor, AI coding assistant [GitHub Copilot](https://github.com/features/copilot), and others [have recently introduced more rate limits](https://www.heise.de/en/background/Price-hike-for-AI-coding-tools-The-Free-Lunch-Is-Over-10511480.html) —caps on how many queries users can run per hour—and/or usage-based pricing: They got paid a fixed amount, but paid their vendors for usage (often more than their revenue for that subscription).

### 2\. Customers should pay for value

Figma’s value comes from teams collaborating, not frames created, so it charges per seat. Notion’s value is workspace organization, not pages written, so it charges per user.

The reverse is true for databases. Take Google Firebase, a service that provides database storage, user authentication, analytics, and hosting for apps. The value you receive as a customer of Google Firebase scales directly with how many people use your app because each new user means more data stored and more requests processed. That’s why charging per active user makes sense. If your app has 100 users, Firebase does minimal work. If it has 100,000 users, Firebase handles exponentially more. The pricing reflects this reality.

[![The price per user falls the more users you have on Google Firebase. (Source: Google Firebase.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_8526e4b8-5d80-401f-968c-b0fcf4ca6d11.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_8526e4b8-5d80-401f-968c-b0fcf4ca6d11.png)

The price per user falls the more users you have on Google Firebase. (Source: Google Firebase.)

  

### 3\. The buying experience matters

You have to price how customers want to pay. Cheap or transparent doesn’t always win. **Julien Codorniou**, who led the now-defunct Slack competitor Workplace at Facebook (now Meta) from 2016 to 2021, wanted to implement what he calls “fair pricing.” In other words, customers would only be billed for active users while inactive seats would be free.

But he found that CFOs preferred a fixed price over a fair price. They cared more about *how* they paid than how *much* they paid. Humans don’t want to overthink purchases. Predictability beats savings.

These three principles can be summed up in a simple matrix and two questions to determine your pricing model.

1. Does value scale with usage? (Principle 2: pay for value)
2. How do customers want to pay? (Principle 3: buying experience)

[![(Credit: Anh-Tho Chuong.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_33f35f23-2c1f-455b-a1f6-472344723165.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_33f35f23-2c1f-455b-a1f6-472344723165.png)

(Credit: Anh-Tho Chuong.)

  

This 2x2 reveals a difference between B2C (like Netflix) and B2B (like Intercom’s Fin): Consumers typically don’t want to think about pricing and care most about predictability, so they prefer subscriptions and credits to not overthink their usage. For instance, you probably wouldn’t want to pay Netflix per watched minute because it would mean overthinking every movie you watch. Businesses are happier to deal with the complexity of usage-based pricing in order to control costs. The exception is infrastructure, which only applies in the B2B context. Enterprise companies accept usage-based pricing when buying raw compute or storage.

Like any framework, this is simplified—all of these are a spectrum.

### What happens next quarter, next year, next decade

I’d love to predict a simple future in which pricing is easy again. But I don’t think so. Instead, teams and organizations will spend more time on pricing, monetization, and unit economics.

At Lago, we recently launched a billing AI agent that automates common billing workflows, like applying a coupon or retrying payments, as well as a revenue forecasting model tool. To ensure we wouldn’t foot the bill for excessive AI usage, we built guardrails like limiting API requests, or how many times users could ask for data. This was a shared effort of engineering, which built the logic, product, which estimated how the product would be used, and other teams.

This example generalizes to most AI feature launches I’ve seen. Pricing isn’t a niche finance activity anymore. It requires the full team: engineering (which needs to build pricing logic), finance (which needs to ensure financial sustainability), and growth (which needs to ensure competitiveness).

In the next quarter, engineers will be asked to use AI more efficiently, and product teams will face constraints around how economical their AI solutions are. Your chief financial officer will walk into an engineering standup and ask questions you never expected: “Why did our OpenAI bill spike 40 percent when usage only grew 15 percent?” These won’t be accounting questions—they’ll be product questions. Was it users gaming unlimited plans? A model upgrade you didn’t notice? A feature that seemed small but consumed tokens at scale?

In the next year, we’re entering a different era: AI products are growing revenue at astounding rates—no-code app builder [Lovable generated $100 million in annual recurring revenue](https://lovable.dev/blog/agent) in eight months. The Swedish company uses a credit-based pricing system for consumers, and some usage-based pricing for backend services like hosting. The successful AI companies will be the ones whose pricing model aligns engineering with user value.

In the next decade, we’ll look back to today—when AI forced SaaS to reckon with real marginal costs—as the moment when pricing became hard again, which made the software business honest again. The survivors will succeed because their product *and* pricing models worked.

Companies that embrace this complexity as a design problem, not just a finance problem, will build products that earn margins, support sustainable growth, and beat competitors in the long run—instead of becoming another example like MoviePass.