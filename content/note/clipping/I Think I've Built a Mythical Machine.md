---
created: 2026-03-24
published:
source: https://world.hey.com/martijnaslander/i-think-i-ve-built-a-mythical-machine-cac6597f
type: "[[Clipping]]"
rating: 4
uid: JKEb
---
full paper:: [[The Information Problem Was Never the Real Problem -- Building a Confirmation-Driven Personal Knowledge Graph and the Four Principles That Emerge From Practice]]

![memex.png](https://world.hey.com/martijnaslander/cac6597f/representations/eyJfcmFpbHMiOnsiZGF0YSI6MjQ5NjQ1NDE4NCwicHVyIjoiYmxvYl9pZCJ9fQ--569fe6319e6e24dc67b2fe22e1f83669af3aa92758ed6e084afabc1f3eb876da/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fbGltaXQiOlszODQwLDI1NjBdLCJxdWFsaXR5Ijo2MCwibG9hZGVyIjp7InBhZ2UiOm51bGx9LCJjb2FsZXNjZSI6dHJ1ZX0sInB1ciI6InZhcmlhdGlvbiJ9fQ--7edc7b21f6fad97fa22412618822c4d19725431f296c7ce47dc174b61535d27c/memex.png)

## Four things that 180 years of information science missed

Every field has its mythical object.  

For archaeologists, it is the [Ark of the Covenant](https://en.wikipedia.org/wiki/Ark_of_the_Covenant). For aviation engineers, it is [Da Vinci's flying machine](https://en.wikipedia.org/wiki/Leonardo%27s_aerial_screw). For information thinkers, it is the [Memex](https://en.wikipedia.org/wiki/Memex) — the device [Vannevar Bush](https://en.wikipedia.org/wiki/Vannevar_Bush) described in 1945 that would store everything a person reads, sees, and thinks, and navigate between all of it by association.
  
For nearly two centuries, people kept dreaming and pursuing that idea. [Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace) saw in 1843 that a machine could do more than calculate — it could manipulate symbols, follow rules, and extend thought itself. [Paul Otlet](https://en.wikipedia.org/wiki/Paul_Otlet) built fifteen million index cards in 1895 and dreamed of a universal and centralised memory for all of mankind. Then Bush took another approach, from a personal perspective. The extension of your own human brain. [Douglas Engelbart](https://en.wikipedia.org/wiki/Douglas_Engelbart) designed augmentation frameworks in 1962. [Ted Nelson](https://en.wikipedia.org/wiki/Ted_Nelson) coined "hypertext" in 1963. Bill Gates declared "information at your fingertips" in 1990 and spent fifteen years trying to deliver it — and shut down the project. [Gordon Bell](https://en.wikipedia.org/wiki/Gordon_Bell), at Microsoft Research, digitised his entire life into a SQL database in 2001 and called it [MyLifeBits](https://en.wikipedia.org/wiki/MyLifeBits) — I met Bell at the first [Quantified Self](https://en.wikipedia.org/wiki/Quantified_self) conference at the [Computer History Museum](https://en.wikipedia.org/wiki/Computer_History_Museum), one of the few people who had actually tried to build what Bush described. Obsidian and Roam brought backlinks to the masses in 2020.  

Each of them really tried for many years. But none of them had the technology nor the right approach for a daily personal instrument that becomes better and more useful across decades of real life.  

I built one. And only in the last days I realized that Bush was right about the destination but wrong about the approach.  
## What I did differently

In neuroscience there is a settled fact that became my blueprint: the human brain has 86 billion neurons, but 100 trillion synapses. Intelligence is more about synapses than about neurons. Memory does not live in cells. It lives in the connections between them. The more connections a neuron has, the more meaningful it becomes — not because it stores more, but because it participates in more patterns.  

I named my system ThetaOS, after the [brainwaves](https://en.wikipedia.org/wiki/Theta_wave) active during associative thinking. That name proved to be spot on after using it for a couple of months.  

Every serious attempt at building a personal knowledge system in the past 180 years started from the same assumption: the problem is storage and retrieval. How do I save this? How do I find it back?  
  
![Scherm­afbeelding 2026-03-24 om 08.13.56.jpg](https://world.hey.com/martijnaslander/cac6597f/representations/eyJfcmFpbHMiOnsiZGF0YSI6MjQ5NjQ5ODA4MSwicHVyIjoiYmxvYl9pZCJ9fQ--c26220c242570a9dd3d120ff71eb0c26380119999615012729c65c2c2839427b/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJqcGciLCJyZXNpemVfdG9fbGltaXQiOlszODQwLDI1NjBdLCJxdWFsaXR5Ijo2MCwibG9hZGVyIjp7InBhZ2UiOm51bGx9LCJjb2FsZXNjZSI6dHJ1ZX0sInB1ciI6InZhcmlhdGlvbiJ9fQ--b3779d742b3242a2a5284869a45b2a113e0c177f0450c29f0baca1ee780f6604/Scherm%C2%ADafbeelding%202026-03-24%20om%2008.13.56.jpg)
  
They all started with the content — documents, files, cards and notes (most of them in a non computer-readable file format). I started with a different question: how to connect everything blazingly fast.  

During the writing process of my books on Obsidian, I became more aware of the importance of links — as my friend [Nick Milo](https://www.linkingyourthinking.com/) also advocates in his Linking Your Thinking approach. With more than thirty years of practice as a professional connector — linking people, information, and ideas for a living — building a system for my own thinking meant reaching for entities and the relationships between them. Persons, places, organisations, events, ideas — each existing once, linked to everything they touch. In my [January 2025 article on personal ontologies](https://www.linkedin.com/pulse/personal-ontologies-future-information-management-martijn-aslander-nkjle/), I worked this out thoroughly.  
  
## What the machine looks like in practice

ThetaOS is a personal knowledge system I have been building and using daily since autumn 2025, drawing on structured personal data reaching back to 1972.

As of writing: 339 relational database tables, over 91,000 records across 26 measured tables, 2.577 million words of structured written content. The system encodes a formal [life ontology](https://en.wikipedia.org/wiki/Ontology_\(information_science\)) across persons, locations, organisations, events, books, knowledge cards, and five personality profiles of myself.  

On top of that structure sits a small AI advisory layer I call [Tom](https://en.wikipedia.org/wiki/Tom_Bombadil) — named after the mysterious character in Lord of the Rings who is untouched by the corrupting power of the Ring — not the brain of the system, but something closer to a librarian who notices two books on the same shelf that have never been cross-referenced. Tom acts as biographer, archivist, librarian, and sparring partner — proactively suggesting new connections for me to confirm, because no system in the world holds more information about me than ThetaOS does. And with every confirmed connection, the system becomes disproportionately smarter.

98% of ThetaOS is local, structural, and AI-independent. Tom momentarily accounts for the remaining 2%. Because of my architecture that number will go down over time. Currently powered by Claude, but the smarter the graph becomes — the more edges confirmed, the more entities defined — the simpler Tom's task gets. A large model is needed to make sense of ambiguous, unstructured data. ThetaOS removes that ambiguity before the AI gets involved: every entity exists once, every relationship is confirmed, every type is defined. As the graph grows denser, that 2% keeps shrinking. The goal is to run Tom entirely on a small local model. The structure does the thinking. Tom just makes the last connection.  

For the slides I presented at the PKM Summit — including the historical context behind this work — see [ThetaOS: A Mythical Machine Comes Alive](https://speakerdeck.com/aslander/thetaos-a-mythical-machine-comes-alive).  

## How I know it works

ThetaOS had been living in my laptop for months before I let anyone else near it. At the [PKM Summit](https://pkmsummit.com/) — three editions of people thinking seriously about personal knowledge — I started letting people engage with my system. I coined the phrase LLS — Life Lens System — for tools like ThetaOS: a personal knowledge graph that functions as a lens through which you see your own life more clearly.

In private sessions, and twice in front of a packed room with no script and no safety net. Funny, scary and very insightful.  

A pattern emerged that I did not expect. The engineers froze. They looked at the system and could not think of a question. The coaches — people whose job it is to ask the right question — went straight for the jugular. Within minutes they were asking — after my permission to them and to Tom — about my fears, my blind spots, and things I tend to avoid, and why. Again, this is not AI doing something clever. It is my own incredible amount of information and connections, finally made accessible.  

The human brain works through repetition. You forget what you encounter once, unless it is remarkable, or unless you keep running into it. Neural pathways thicken through repeated exposure. ThetaOS works differently: one confirmed connection is enough, permanently (unless I intentionally break it). At the scale I work — thousands of people, events, ideas, spanning decades — that is not a minor improvement. It is a different category of instrument entirely. It compensates for my cognitive weaknesses and amplifies my strengths.  

Some of the people who sat across from it were strangers. Some have known me for thirty years. The ones who knew me longest were often the most surprised — not by what the system knew, but by what it surfaced. Events, connections and patterns from years ago that were no longer active in anyone's memory except ThetaOS.  

Bush designed a machine for storing trails. He never asked who would be brave enough to follow them — or skilled enough to know where to begin.  

## Four things Bush could not have known

When you actually build the Memex and operate it under sustained daily use, four design principles that I have not found written down in the personal knowledge management literature.  
  
**Principle 0 — Everything exists only once.**

The precondition for everything else: [entity identity](https://en.wikipedia.org/wiki/Identity_\(object-oriented_programming\)). A person, a place, a book, an idea — each exists as a single node in the graph, not a mention or a copy or a tag. Bush imagined trails between documents, but documents are not entities. When you enforce single-entity identity rigorously, the graph stops being a filing system and starts being a map of the world as you have actually encountered it.  
  

**Principle 1 — Intelligence lives in the structure, not the model.**

I call this the 98/2 rule of thumb. Ninety-eight percent of the cognitive value comes from the data structure itself — the ontology, the entity types and the relational schema. Only two percent comes from the AI. Every time I have been tempted to fix the AI layer first, the problem turned out to be in the schema, taxonomy or the ontology.  

This cuts against the dominant assumption in the current AI wave, that smarter models produce smarter systems. A poorly structured knowledge graph with a brilliant AI on top is still a poorly structured knowledge graph. Bush intuited this — his trails were structural, not computational. The field forgot it.  
  

**Principle 2 — Confirmation is a constitutive act.**

Tom suggests links. I confirm or reject them. This is not a UX detail.  

There is a third path between fully manual linking — exhausting, never sustained — and fully automatic linking — plausible-looking noise. The human validation is not a quality check on the machine. It is the moment the connection becomes mine. Agency is preserved because the friction is minimal but present. Neither fully manual nor fully automatic: confirmed.  

Confirmation does not always mean clicking through thousands of individual links. Sometimes it means explaining a pattern once and letting the system apply it at scale. By importing 80,000 photographs — each carrying a timestamp, GPS coordinates, and identified faces — a single import operation connected persons, locations, and dates across decades of my life. That created up to 240,000 new connections from one instruction. What would have taken years of manual entry took seconds. This only works because ThetaOS uses machine-readable data formats throughout. The moment you store your life in documents — PDFs, Word files, the formats most organisations live in — the machine goes blind. It can no longer see the structure, only the surface.  
  

**Principle 3 — The graph compounds.**

Each confirmed connection increases the informational density of every node it touches. The graph does not grow linearly. You only see this after thousands of edges, confirmed one at a time — which is why nobody wrote it down before. You have to run the machine long enough.  

## What this means

These four principles are not empirically validated universal laws. This is a single-practitioner case, and I know the limits of that. But the Memex was always described as a personal instrument. Testing it requires a person who builds it, uses it, and reports what happens.  

The question these principles reopen is one the PKM and [extended mind](https://en.wikipedia.org/wiki/Extended_mind_thesis) literature has mostly avoided: where does cognitive agency actually reside in human-AI knowledge work?  

The dominant answer, implicitly, is in the AI — if we build better models, we get smarter retrieval, making more automation possible. My belief, after building this: it is in the confirmation. In the moment a human looks at a suggested connection and decides it is real. That small act is where [extended cognition](https://en.wikipedia.org/wiki/Extended_cognition) actually happens. Not in the storage, not in the retrieval, but in the edges. So the human in the loop.  

The full paper — a practitioner research preprint with formal methodology and detailed system description, [is available on Zenodo](https://zenodo.org/records/19202082). For the broader intellectual history behind this work — from Otlet's fifteen million index cards to Kasparov's centaur — I wrote [Here Is Everybody](https://world.hey.com/martijnaslander/here-is-everybody-250-years-of-thinking-about-information-043fb698). I welcome responses from anyone working in personal knowledge management, human-computer interaction, or extended cognition research.  
  

*The Memex is possible. Bush just looked in the wrong place.*