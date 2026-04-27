---
created: 2026-02-02
published:
source: https://this.how/futureOfText/index.opml
type: "[[Clipping]]"
rating: 4
uid: u8OL
---
## What is this?

An essay for an upcoming book on the future of text.

## Abstract -- the future of text is structure

Our computer systems are recursive -- every folder in a file system contains a whole new file system, every block of code is a new namespace of indefinite complexity. Recursive strructures are everywhere. Yet the tools we have for managing them are an inconsistent collection of structure editors, because they evolved independently and were never the focus of their designers. Not enough factoring of ideas and technology. If one takes a step back and starts with a structure viewer/editor, hones the UI for simplicity and depth, that's highly customizable, and slowly adds the system components, storage, writing, networking, it's possible to create a much better integrated environment. Because it's simpler, we can add more complexity at higher levels. It can do more. I started my personal exploration of this idea on Unix in the 1970s, then personal computers, then the web. I never encountered a structure I couldn't edit with common structure tools better than with the specialized ones.

## The future of text is structure

If you had asked me 40 years ago what the future of text is, I actually had a strong opinion, and was setting out to develop the software that I felt would be the future of text. I was a very ambitious at age 24 and I had an idea.

## Unix, a system of structures

The mid-late 70s was an exciting period because computers were becoming interactive. You could type a command, it would respond, then type another. Each user had a file system of their own. Our accounts were connected through a local network managed by Unix, and the people and the apps could communicate with others on distant campuses through a very early version of the internet. This was at the time very new. And everywhere you looked was text.

The power text is that it was both human and machine readable, that came at the expense of a little speed when reading and writing. The designers of Unix wisely chose to go for text where ever possible. You could quickly see what a protocol was doing, and it gave you ideas how to support it with your own software.

As a user and developer, I noticed that everywhere on this system were structures, well-designed and deep, such as C programs, the file system, processes trees.

But the tools, the editors, file system browsers, OS commands, didn't do much with the structure. In some modes you could dive and surface, for example at the command line you could cd to a directory, or cd .. to pop out a level. But the listings were alphabetic, order was not editable. In the program editors you couldn't dive and surface, or move text based on its structure. But the structure was there in the syntax of the language, and its structure was remarkably similar to the structures you built in the file system, yet the tools for editing them were radically different. I saw an opportunity to unify it with a tool that could manage one of these structures, C program source code, and eventually it evolved into a tool that could edit them all.

## Structural code editing

The idea to write a structure-based editor for C came during a hallway conversation in the basement of the Computer Science building at the University of Wisconsin in 1977, with a fellow grad student, Gary Sevitsky. We were taking a break from working in a big basement room with computer terminals hooked to a PDP-11/45 running Unix.

Gary told me how the LISP editor works, how it understands structure the way I described. It made sense because LISP is so strict with structure. Where Algol-like languages (C, Pascal) were a bit sloppy about their structure (if then else, repeat until), LISP was perfect, there were no exceptions. Every operation was specified by a name and a parameter list set off by parens and commas, like this: verb (param1, param2) and returned a value that could be used in expressions. No exceptions. Totally recursive. A LISP grammar is very simple. So it made sense for the editor to take advantage of the strict structure of LISP.

He said you could choose to reveal the contents of a operation, expanding the parameter list. And then you could expand each parameter in turn. The user had control over the structure in a way that my code editor for C didn't.

## My structure editors

So I set out to write an editor that understood the syntax of C and let you edit the program as a structure. It took a few months, built on editor source that shipped with Unix. You could dive and surface, looking at one level at a time, and you could reorganize according to the structure, swapping the order of two statements. Key point, when they moved all the code underneath, hidden or visible, moved with them.

This tool only worked for C code, and it was useful, but then later I asked myself -- couldn't we make a structure editor for English majors? This was the beginning of the software category became outliners. These products, ThinkTank, Ready and MORE, were sucessful, thousands of people used outliners, they loved interacting with visible structures of text. Being able to visualize your ideas as structures and then reorganize them at will, combined the features of white boards and computer spreadsheets. Outliners also became part of word processors, presentation tools, file systems, programming editors.

## Doug Engelbart and Ted Nelson

When I first arrived in Silicon Valley in 1979, everyone was reading Ted Nelson's Dream Machines and Computer Lib. Nelson described work that Doug Engelbart did in the late 60s and early 70s. I recognized it as the same idea I had been working on, Engelbart called it augmentation -- using the computer to augment the thought processes of a user. Nelson's book formed a common vocabulary for software designers of my generation.

## A structure-aware OS

In 1988, after selling the company that made the outliners, I thought the next step was to build outlining into personal computer operating systems along with the window manager, menu manager, keyboard support, etc. so every application could offer structured editing to their users. Integrated outliners were proliferating, none of them feature-complete and all with different user interfaces. Developers, as their products evolved, saw the need to give their users structural text tools, weren't able to focus on structure editing, or develop expertise. Their focus was elsewhere. This is why I felt the outliner belonged in the operating system.

I still believe structure-centered editors are the future of computers. There's so much to be gained by factoring the hierarchy editors in each of the tools we use, and when that happens, it'll reveal more opportunities to factor their functionality, and also suggest new integrations that otherwise wouldn't be possible because the UI would be so complex and hard to understand without the factoring.

## The future of structures

I hope developers in the future will look at Frontier, which we released in source in 2004, and is still in use on personal computers. That system started with an outliner. Because I believed that the outliner belonged in ROM, I effectively put it into the ROM of the virtual computer I was writing Frontier to be. The next big component was the language and object database. Both were managed with the outliner, and the language's storage system was the object database, so there was no need to read or write files, the code lived in an environment that already had the values even if the system had just booted up. So much factoring. I believe the programming world will iterate to where we got to with Frontier, but it'll take decades. A quicker approach would be to use the software. I hope people do.

I see this as my chance to say to the future -- this is what how I thought computers should work. I don't see a hard line between a blog and my word processor. Or between the file system and my programming language. In the operating system of the future these will all be part of a whole that's designed from the ground up with the idea of integration.

I think this is what Engelbart saw in his work, and the Unix people saw in theirs. I was a generation younger, and built what I thought could be done, based on their examples, with the tools I had available to me, personal computers, HTTP, cheap storage, and reliable and fast networks.