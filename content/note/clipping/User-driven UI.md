---
created: 2026-02-20
published: 2023-05-18
source: https://garden.bradwoods.io/notes/design/user-driven-ui
type: "[[Clipping]]"
rating: 5
uid: Vb3X
---
> What is a User Driven UI. What is the Zone of Proximal Development. Different approaches to teaching users how to use a UI. Using AI in the UI.

![](https://garden.bradwoods.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FhadleysHope.1d4e85aa.webp&w=1920&q=75) ![A sketch of a vintage cockpit](https://garden.bradwoods.io/_next/image?url=%2Fimages%2Fpopular%2FuserDrivenUI.webp&w=640&q=75)

## User-driven UI

Planted:

Tended:

Status: [decay](/about#aboutthisgarden)

Intended Audience: Software designers, product managers, creative coders

People use software to solve problems. However, when someone chooses a new software product, instead of solving their problem, we give them another. To learn the UI (User Interface). If the software is complex, most new users will only learn parts of it or not use it at all.

## Zone of proximal development (ZPD)

**People learn best when in the *Zone of Proximal Development*. The space between what someone can do without help and what they can't do, even with help.**Below is an artifact from my former job as a teacher. A list of math tasks ranked from easy to hard:

![List of math tasks ranked from easy to hard](https://garden.bradwoods.io/images/zoneOfProximalDevelopment1.svg)

When a new student joined my class, I would test them to find the harest task they could do without help. Imagine it was *Student can combine 2 groups of marbles..*. That means their ZPD is around the task above it,*Student can solve a 2 digit addition problem..*. This is the level I would begin teaching them at. Challenging but possible. Teaching above the ZPD will make the student intimidated and overwhelmed. Teaching below means teaching content already learnt. Pointless.

![List of math tasks ranked from easy to hard](https://garden.bradwoods.io/images/zoneOfProximalDevelopment2.svg)

## The problem

When a software product is first released, it is an MVP (Minimal Viable Product). It has the least amount of features to deliver value. The less features, the simpler UI, the easier to learn. Over time, features get added. The software becomes more powerful. More complex. Harder to learn. Consider three different users:

![A sketch of a vintage cockpit](https://garden.bradwoods.io/_next/image?url=%2Fimages%2FcockpitVintage.webp&w=640&q=75)

**User 1.** Starts using the software when it was first released. With a minimal UI, it's easy to learn and quick to master. When a new feature is released, it is little effort to learn that too. As the user has a solid foundation to build on top of and it is a small amount to learn. This user is a power user. They get a feeling of joy and confidence when using the software. They get maximum value from the software. They are always in the ZPD.

![A sketch of a modern cockpit](https://garden.bradwoods.io/_next/image?url=%2Fimages%2FcockpitModern.webp&w=640&q=75)

**User 2.** Starts using the software three years after first release. The UI presented to them is the MVP and three years worth of added features. The complexity intimidates and overwhelms them. They don't have time to learn everything. Instead, they learn the least amount to solve their immediate problem. When a new feature is released, the overwhelmed feeling grows. They don't understand all existing features let alone this new one. They get limited value from the software, sticking to the parts they know. They are always above the ZPD.

**User 3.** Starts using the software five years after release. They take one look at the UI and abandon it and look for a simpler solution. An example of this scenario can be seen in the evolution of Photoshop's toolbar. Increasing in complexity with each new version.

![Each version of the photoshop toolbar. Each version increases the number of buttons](https://garden.bradwoods.io/_next/image?url=%2Fimages%2FphotoshopToolbar.webp&w=1200&q=75)

> “1. Simple product is released 2. Lots of people use it every day 3. More features are added 4. It's now complicated 5. But most people learned the basics when it was simple, so they don't notice that it got complicated”

[Anthony Hobday](https://twitter.com/hobdaydesign/status/1655680006901624839) Product designer

![Portrait of Spock the Vulcan](https://garden.bradwoods.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fspock.3971ec86.webp&w=3840&q=75)

![](https://garden.bradwoods.io/images/sponsors/nerv.svg)

## Current solutions to teaching UI

**Onboarding walkthrough.**A tour of core features. Pop-ups highlighting parts of the UI with snippets of text and / or video. Its weakness is not providing a chance for the user to practice what they learnt before moving to the next feature.**After explaining a feature, the user needs to use that knowledge to consolidate it.**

![Adobe Photoshop and Photoshop Elements product icons](https://garden.bradwoods.io/images/photoshopElements.svg)

**Progressive disclosure.** Only revealing parts of a UI when required. For example, the common pattern of showing a modal when the user clicks *save as*. Revealing parts of a UI based on what the user is doing is effective at moving the user closer to the ZPD. Adobe's *Workspaces* do a similar thing. The user selects what task they are doing and the UI changes to only show a subset of features. An extreme approach to reducing UI is creating a new product that is a simpler version of an existing one. For example, *Photoshop* and *Photoshop Elements*.

![](https://garden.bradwoods.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FbottomLeft.637e1ca6.webp&w=640&q=75) ![](https://garden.bradwoods.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FbottomRight.a1565e82.webp&w=640&q=75) <video controls=""><source src="/videos/userDrivenUI/workspaces.mp4" type="video/mp4"></video>

**Basic / advanced mode.**A new user begins with a reduced UI and can switch to the full UI when confident enough.This [app](https://layout.bradwoods.io/customize) does this with a *basic* and *advanced* button in the header. Its weakness is **instead of small, incremental jumps in complexity required for effective learning, it's one large leap.**

**Help on hover.** Hovering on a feature displays a pop-up with educational content. Efficient, intuitive and non-obtrusive. This teaches the user how to use a feature but not what features to use to solve a given problem. To move the user in the ZPD we also need problem based solutions.

**Help menus.** Problem based solution providing a way to ask the software *"how to I..."*. Their effectiveness depends on the quality of the search and documentation. Documentation has a reputation of being poorly written, outdated and only using text and images. Giving rise to power users creating video tutorials on *YouTube* and [interactive experiences](https://bezier.method.ac/).

![](https://garden.bradwoods.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FbottomLeft.637e1ca6.webp&w=640&q=75) ![](https://garden.bradwoods.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FbottomRight.a1565e82.webp&w=640&q=75) <video controls=""><source src="/videos/userDrivenUI/helpOnHover.mp4" type="video/mp4"></video>

## Simple tools

I always liked the idea of a simple tool. A tool that does one thing and does it well. We could make software like this. Refine the MVP instead of adding to it. This would solve our problem and keep the user in the ZPD. It would always be easy to learn, master and get maximum value. The problem is, after some time, I start saying, *"If only it could do this..."* or *"I wish it could integrate with that..."*. **The value of simplicity decays over time.** Once I'm confident with a tool, I want more from it.

The inverse is true for complex tools. They are hard to learn. It takes time to master and get maximum value. But, once I do, I have a valued skill.**The value of complexity improves over time.**Often, users don't reach this point. The way these tools are taught places them above the ZPD. A place no one likes to be. So they learn the smallest amount and stop. Limiting the value. Can you name a piece of software that you know inside out?

Another thing to consider with simple tools is the user, not the UX. Would people be better with ten simple tools or one complex one? The problem is not software complexity, but software not adapting to the user's ability. Not keeping them in the ZPD.

## New solution

With the capabilities of natural language processors, we can create a new approach to teaching UIs. User-driven UI. Instead of pushing features onto the user, the user pulls them in when needed. The software always presents a new user with the MVP. Regardless of how many features have been added since the first release. For example, lets say you downloaded a new painting app. The initial UI would be a blank canvas with a few essential features. The square, circle and triangle tool.

There would also be a text input. If the user couldn't do something with the current UI, they could enter what they are attempting to do. Using a natural language processor, a list of features that could help with that task would be displayed. Each with a button to add them to the UI. Going back to our painting app. Imagine you wanted to add color to a shape. With the current UI, you can't. Enter *"color a shape"* into the input.

The UI would grow in complexity, in pace with the user's knowledge, keeping them in the ZPD. It also provides:

- ▪ **a non-intrusive way to collect data about what problems users are trying to solve**,
- ▪ a non-intrusive way of **providing educational content about features. When the user wants them.** The results from the text input could contain links to documentation, videos, examples,...
- ▪ an automated way to inform the user a feature they want isn't available yet. This feature could have a *notify me when available* option. When released, only users who opted in would receive a *new feature available* pop-up. A more personalized UX.

For user to reach maximum value in complex software, they need to be in the ZPD. This requires multiple approaches. In the past, teaching has been considered an after-thought to making the product. This is a mistake. You could have the cure for cancer. If people don't know how to use it, it might as well not exist.**Creating a tool for someone to use and ensuring they know how to use it are equally important.**

> “Good tools make it clear how they should be used.”

[Amelia Wattenberger](https://wattenberger.com/thoughts/boo-chatbots) Principal Research Engineer at GitHub

![Portrait of Doctor Manhattan](https://garden.bradwoods.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdoctorManhattan.d3159e04.webp&w=3840&q=75)

![](https://garden.bradwoods.io/images/sponsors/nerv.svg) ![](https://garden.bradwoods.io/_next/static/media/sonic.08f9afde.webp) ![](https://garden.bradwoods.io/_next/static/media/sonicFall.bd9694c3.webp)