---
title: "Your Company is a Filesystem"

created: 2026-02-12
published: 2026-02-10
source: https://x.com/mernit/article/2021324284875153544
type: "[[Clipping]]"
rating: 4
---
[![Image](https://pbs.twimg.com/media/HA0iudkagAEsM7g?format=jpg&name=large)](https://x.com/mernit/article/2021324284875153544/media/2021309989365907457)

One of the reasons Openclaw is so good is because its entire context is a filesystem on your computer.

Openclaw runs on a computer and lets you talk to it via a chat app like Telegram or iMessage. When you ask it to run a task, it calls the Claude API and uses context from files on your machine. Your conversation with Openclaw is represented as a file on the computer. When you run a task, Openclaw writes to that file. The filesystem is the state.

As you add more data to those files, Openclaw becomes more powerful and useful. When you connect your Gmail, Openclaw has emails as files on your computer. When you connect your Eight Sleep bed, Openclaw adds your sleep data to a file on the computer. Openclaw wants to take over your world, but it can only do that if your data is in the filesystem.

But if Openclaw is useful for our personal lives, how powerful would Openclaw (or other AI agents) actually be if an entire company was represented as a filesystem it could work in?

Let's take a law firm, as an example.

[![Image](https://pbs.twimg.com/media/HA0i-G-WIAAVgkG?format=jpg&name=large)](https://x.com/mernit/article/2021324284875153544/media/2021310258178564096)

Law firm as filesystem

In this world, the law firm is reduced to a set of folders on a computer.

When a new case comes in, we write to /cases. When the case is assigned to a lawyer, we add the case to their /cases folder. When they log time, we add the entry to /billing/time-sheet. The entire back office operation is just a state machine.

Another interesting aspect of the filesystem is that permissions naturally map to seniority in the org chart. For example, a first-year associate gets read/write access on their cases, whereas partners can access everyone's cases. The governance structure is just unix file permissions.

There's obviously nuance to all businesses, and many work streams are codified in people's heads - not in JSON files. But the power of Openclaw and the underlying architecture points to a future where the filesystem becomes the source of truth for the agents that are the most useful.

The past year has been explosive for AI agents. But when you tear away the noise, the architecture of an AI agent can be reduced to two components: the filesystem as state, and Claude as the orchestrator. By modeling the company as a filesystem, an agent is able to solve business problems by simply reading and writing files.