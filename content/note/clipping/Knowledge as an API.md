---
created: 2026-01-28
published: 2020-11-15
source: https://www.chrisbehan.ca/posts/KnowledgeAsAnAPI
type: "[[Clipping]]"
rating: 5
uid: Molp
---
Do you ever come across a technology or concept and say to yourself, "This is insane, how can anyone understand this?". If so, this essay may help you to answer that question; how do people understand extremely complex concepts?

Central Processing Units (CPUs) are a particularly bewildering piece of technology. These 2 inch squares of silicon are the brains behind a computer, a machine capable of solving all solvable problems given enough time and resources.

![https://www.apple.com/v/mac/m1/a/images/overview/chip__fffqz3ljssi2_large.jpg](https://www.apple.com/v/mac/m1/a/images/overview/chip__fffqz3ljssi2_large.jpg)

Apple's new M1 chip

"The people who make CPUs must have superhuman intellect" I think to myself. This may be true to an extent, chip makers and CPU designers are very bright, however their domain expertise is likely isolated to an extremely specific component of the CPU. It is important when analyzing any complex concept to acknowledge all of its components. In the case of a CPU, there are thousands of components built on top of each-other.

Don't be disheartened if a concept appears incomprehensible at first glance, it may very well be incomprehensible to those who created it, particularly when that concept is at the bleeding edge of technology. How can a CPU designer design a CPU without understanding all of its inner workings? The same way an architect designs a house without understanding the details of construction, and the same way a software developer uses an API without understanding its implementation details. Complex technologies and concepts are not the result of omniscient individuals, but rather layers of knowledge, built upon, and composed of one-another. The authors of these layers of knowledge are the specialists, who have spent years mastering the knowledge associated with their layer. The mental model for understanding these layers, and the central topic of this essay, is **Knowledge APIs**

> Knowledge API: A mental model for thinking about the understanding of a specific domain as an Application Programming Interface (API). Knowledge APIs depend on, and can be used by one-another. A knowledge API is like a module in a programming language, it depends on (imports) other knowledge APIs, and can be used by (exported) other knowledge APIs. - Chris Behan

To illustrate the idea of a knowledge API, let's use CPUs as an example. Suppose one of the knowledge APIs used in CPU production is dedicated to the etching of microscopic lines into silicon. An example function from this API would be:

```jsx
//MicroscopicLaserEtchingAPI
function EtchMicroscopicLineIntoSilicon(startPos, endPos) {
  // Code instructing laser to etch microscopic line from startPos to endPos
}
```

The group of people responsible for the implementation of `EtchMicroscopicLineIntoSilicon`  understand how it works. They know all about the optics of the laser, and how to manipulate its exact position. They know the physical properties of the silicon chip, and how it reacts when it comes in contact with the laser. But they do **not** know how others will use this function. They have no insight into how the lines they produce may be composed to represent logic gates. That is where the next layer of the Knowledge API comes into play; the group responsible for composing the lines into logical structures. This layer of the knowledge API (Let's call them the Logical Structures API) has functions like:

```jsx
//LogicalStructuresAPI
import { EtchMicroscopicLineIntoSilicon } from "MicroscopicLaserEtchingAPI";

function CreateANDGate() {
  const xPos = CalculateANDGateXPos(); // function within this knowledge API
  const yPos = CalculateANDGateYPos(); // function within this knowledge API
  EtchMicroscopicLineIntoSilicon(xPos, yPos);
}
```

The people in this layer are dedicated to composing the logical structures that make up the CPU. They do not understand the implementation details of the layer below them, such as how a microscopic laser is able to precisely engrave nano-meter thick lines into silicon. They must trust and use functions from the `MicroscopicLaserEthcingAPI`. The authors of the  `LogicalStructuresAPI`  depend on the correctness of the  `MicroscopicLaserEtchingAPI`, in this case, that  `EtchMicroscopicLineIntoSillicon` really does etch a line into the silicon chip, at precisely the location specified. Trust between layers is a requirement of knowledge APIs. If a knowledge API does not do exactly what it says, and that knowledge API is used by another knowledge API, incorrect behaviour will be introduced to the system.

The process of knowledge APIs built on-top of one-another continues for hundreds (sometimes thousands) of layers, producing results that to the untrained eye appear magical. But there is no magic, just layers of abstractions masterfully crafted by experts of that knowledge API. Sometimes individuals, through years of hard work and deliberate practice, are able to understand and master multiple knowledge APIs, but no one understands all of them. Similar to how no-one alive [knows all of mathematics](https://www.reddit.com/r/math/comments/2vy8g1/who_was_the_last_person_to_know_all_of_mathematics/), no-one alive understands all the knowledge APIs that compose CPU production, or almost any other moderately complex field.

Every domain can be thought of in terms of the composition of knowledge APIs. An example that deviates from the more analytical examples given thus far would be the knowledge APIs of Basketball. Basketball players must learn the knowledge APIs of shooting, ball-handling and defending, each of which is composed of lower-level APIs, like free-throws, cross-over, and steal, to name a few. At an even lower level, basketball can be thought of as depending on the knowledge APIs of nutrition, and neuroplasticity that your brain undergoes through practice. Breaking down your current domain of interest into layers of knowledge APIs is a useful tool for introspection and evaluating what you need to improve on. Setting goals like "I need to get better at basketball" is shallow and hard to work with. But breaking down basketball into its various knowledge APIs and evaluating which of those you need to improve upon can yield much more tangible goals: "I need to increase the speed of my cross-over and improve my help-defense".

Experiment with different knowledge APIs, invest time into finding one that interests you, then start working towards mastery with that knowledge API. Don't be disheartened by the fact that you don't understand the implementation details of your knowledge API's dependencies, no-one does. [Jim Keller](https://en.wikipedia.org/wiki/Jim_Keller_\(engineer\))  co-authored the design of the x86-64 CPU architecture without understanding the implementation details of how the CPU is actually manufactured. The  [Russo brothers](https://en.wikipedia.org/wiki/Russo_brothers)  directed  [Infinity War](https://www.marvel.com/movies/avengers-infinity-war)  without understanding the implementation details of VFX, and  [Khabib Nurmagomedov](https://en.wikipedia.org/wiki/Khabib_Nurmagomedov) had one of the most dominant careers in mma history without understanding the implementation details of nutrition or the neuroplasticity of training.

Knowledge APIs exist in every domain. Thinking about knowledge as an API, and accepting that APIs can be useful without understanding their implementation details, or the implementation details of their dependencies, can be a reassuring call to action.

I hope this essay has added a useful mental model to your intellectual toolbox. 🧠 🧰
