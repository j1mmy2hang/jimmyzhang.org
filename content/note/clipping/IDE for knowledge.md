---
created: 2026-09-22
published: 2026-09-13
source: https://x.com/arscontexta/status/2099242402259042313
type: "[[Clipping]]"
rating:
uid: j6fA
---
![Image](https://pbs.twimg.com/media/HSF-dH7bIAA8lCQ?format=jpg&name=large)

a knowledge base should work like a codebase. it needs typed files with relationships and conventions the agent understands

something you keep building on together over time

today we launch the early alpha of [@arsumbrisai](https://x.com/@arsumbrisai), a malleable agent-native IDE for typed knowledge

the app is built on a type engine and an extensible agent framework

you can reshape the whole system and build your own apps, components or missing features on top of your knowledge

we built our complete app with the same primitives and SDKs you can use to make it yours

thats what malleable means here. the software itself is something you can extend and modify with the agent using it

![Image](https://pbs.twimg.com/media/HSCDCI4XcAImrYX?format=jpg&name=large)

## a composable repo for everything

an ars umbris repo is a folder that holds your work and the capabilities for working on it

that includes:

- **knowledge:** the notes, sources and records
- **types:** the definitions of those objects and their relationships
- **skills:** the instructions your agent follows
- **mcp tools:** the operations it can call to read, change and check the work
- **projections:** the UI components that show the graph and let you interact with it
- **agent instructions and profiles:** the guidance and capabilities you choose for a session

these parts live together as local files in one or more composable repos

a repo might contain a company brain, a research field, a book or just one useful tool another repo depends on

a research workspace might look like this:

```plaintext
my-research/
├── .arsumbris/
│   └── repo.yaml
├── type/
├── questions/
├── articles/
├── skills/
└── projections/
```

the small manifest gives the repo a name and declares its dependencies, similar to importing packages in a codebase:

```yaml
name: my-research
deps:
  - name: au-tree-research
```

that dependency provides the research vocabulary, reusable skills and mcp tools. your own questions and articles stay in your repo

a workspace brings the repos you need together and the engine reads their files as one typed graph

wikilinks work across repo boundaries too. **\[\[a note::another-repo\]\]** points to a note in **another-repo**, so you can reference existing knowledge where it lives

a shared type works similarly: **source::au-base-types** names the source type from the au-base-types package

like imports in code, these references make dependencies explicit. you can reuse everything across projects and build new capabilities on top of what another repo provides

## knowledge work needs a type engine

in software, compilers, type checkers and linters give the agent feedback about its work

you need something similar for knowledge work

an agent can keep writing pages while broken links, missing fields and inconsistent structures accumulate. the next session reads those files and builds on those mistakes

telling the agent to follow conventions helps on a small scale, but a compounding structure needs checks that run independently of whether the model remembers to look

in ars umbris you define the shapes of your knowledge as types. the engine checks fields, required sections and the kinds of objects a reference can point to

say you define a minimal claim type with a required reference to a source:

```yaml
# type/claim.type.yaml
fields:
  source: source::au-base-types*
```

the agent writes a claim like this:

```markdown
---
type: claim
---

a knowledge graph needs structural checks
```

the source field is missing, so the engine reports a diagnostic against that note

the agent can read them through its tools, fix it and check the result

checking whether the source actually supports the claim still takes judgment. but the typed relationships give you and your agent something explicit to follow and verify

the same graph also supplies the IDE with definitions, references and type-aware views

## a meta harness for one shared state

ars umbris connects different agent harnesses to that working environment

claude code and codex connect through mcp adapters. each session has its own conversation and context, but sessions in the same workspace can read and change the same durable files

when an agent records something, another can inspect it and continue from that state. you choose the tools, skills and guidance each session works with

thats why we think of it as a meta harness. you shape the environment around your agents while they work on one shared representation

tools and hooks are plugins, skills and profiles are typed files and the UI is composed from typed projections. you can build and recombine these parts around the graph

you get one agreed state that you and your agents can inspect, revise and keep building on

## the art of shadows (ars umbris)

a graph can grow far beyond what you can comprehend at once. externalizing it gives it a form, but you still need ways to build your own understanding

this draws on giordano bruno's shadows of ideas: the shadows we perceive reveal only a part of the deeper reality behind them

the graph models the relationships between your ideas. projections render slices of that structure. each reveals a part and moving between them helps you understand the whole

ars umbris is a collaboration workspace where humans and agents build that understanding together

thats what the art of shadows means to us: shaping the views through which we understand and steer a structure we cannot hold in our minds all at once

the name is an homage to ars memoriae, ars combinatoria and the renaissance tradition of building structures to think with

## you should own your repos

your thinking should survive the tools you use to work on it

its all markdown, yaml, media or code files on your machine. you can keep it in git, inspect the files with another editor and keep reading them even if you stop using ars umbris

start with a repo for something you actually want to work on. build the knowledge together, then build the tools you need around it

heinrich, [@feriederich](https://x.com/@feriederich) and [@lt0gt](https://x.com/@lt0gt)

DISCLAIMER:

[@arsumbrisai](https://x.com/@arsumbrisai) is in early alpha and work-in-progress. expect breaking changes as we develop the framework

for now its macos only and youll need to compile it yourself from the source on github. prebuilt releases and support for other platforms will follow soon

github: link in comments