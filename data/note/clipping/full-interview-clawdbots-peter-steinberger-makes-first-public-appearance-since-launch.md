---
title: "Full Interview -- Clawdbot’s Peter Steinberger Makes First Public Appearance Since Launch"

created: 2026-01-30
published: 2026-01-28
source: https://www.youtube.com/watch?v=qyjTpzIAEkA
type: "[[Clipping]]"
rating: 6
---
**John Coogan:** The man of the hour. How are you doing?

**Peter Steinberger:** I'm good.

**Jordi Hays:** Thank you so much for staying up late. I'd love to kick it off with a brief background on when you started this project, a little bit of your career, and how you're thinking about it going forward.

**John Coogan:** And this was your very first project ever, right?

**Jordi Hays:** [Laughs] An overnight success.

**Peter Steinberger:** I worked for my own software company for 13 years. I sold it about four years ago, then I was completely burned out. In April, my spark was back. My background was Apple and iOS, but I wanted to build web stuff. I didn't have the experience and didn't want to feel like an idiot, so I looked into AI. It was good—not great, but good.

Claude Code was released in beta around February. That was my first experience, and I thought, "This is pretty awesome." I couldn't sleep anymore. I literally had trouble going to bed. We had addiction before, and we had addiction again. I hooked up a lot of my friends; I texted them at 4:00 AM and they replied. I started a meetup called Claude Code Anonymous—now Agents Anonymous. I came back from retirement to mess with AI, and I am having loads of fun.

**John Coogan:** Walk us through some of the other stuff you worked on prior to this. The GitHub stars chart for this project is unbelievable; it's just a line going straight up.

**Peter Steinberger:** Honestly, I need to talk to someone at GitHub because I don't think there has been a project before that has been straight up. It is batshit insane.

My main mantra is: I want to have fun. The best way to learn these new technologies is to play with them. I call it "Agentic Engineering," but when it starts hitting 3:00 AM, I switch to "vibe coding" and the next day I have regrets.

I had this idea about personal agents in May. I tried it when GPT-4o came out, but it wasn't good enough. I thought the big companies would build this in the next few months anyway, so why should I? I built a lot of CLIs because that's where agents are really good. You have to close the loop; give the agent the best possible way to build software.

I tried a lot of stuff, and then in November, I looked and there was still nothing. I asked, "Where is my agent?" In May, I built a project to use Claude Code from my phone. Everyone builds some orchestration tool for themselves as a step in becoming a good Agentic Engineer. I stopped because it became so good I was using it while out with friends. I was building something so I had better access to my drugs.

**Jordi Hays:** I have seen people using Claude Code on laptops as they get off airplanes. That's the clearest sign you need a bridge and a phone involved.

**Peter Steinberger:** In November, I wanted to chat with my computer on WhatsApp to check up on my agents. I hacked together a WhatsApp integration that receives a message, calls Claude Code, and returns the result. It took one hour.

I usually use prompts with images because they give so much context. I was on a trip in Marrakesh using it for restaurant recommendations because it had Google access. I wasn't thinking and sent it a voice message. I hadn't built support for voice messages. The reading indicator came on, and after 10 seconds, my agent replied.

It said: "You sent me a link to a file with no ending. I looked at the file header, found it was Opus, used ffmpeg on your Mac to convert it to Wav. I wanted to use Whisper but it wasn't installed, so I found the OpenAI key in your environment, sent it via Curl, got the translation, and responded."

That was the moment it clicked. These things are damn smart, resourceful beasts if you actually give them the power.

I started doing weird stuff. I used it as an alarm clock; I let it migrate to my computer in London, use SSH to log into my MacBook, and turn up the volume to wake me up. I built the world's most expensive alarm clock.

**John Coogan:** Last year, everyone wanted these agentic experiences, but the focus was on browsers. Seeing the way people use Moltbot, it feels like the focus was at the wrong layer. Why care about the browser if I can just talk with an agent across every app?

**Peter Steinberger:** A lot of the prep work I did was building CLIs. MCPs are crap; they don't really scale. But CLIs scale. Agents know Unix. You can have a thousand programs on your computer; the agent just calls the help menu, loads what's needed, and uses it. If you build it in a way the model expects—don't build for humans, build for models—everything works better. It's a new kind of software.

For most things, I don't need a browser. I built integrations for Google Places, Sonos, my cameras, and my home automation. With every skill, my agent got more power.

I got hooked. I talked about it on Twitter, but the response was muted. Tech people weren't getting it, even though my non-tech friends wanted it. Ultimately, I built it for me. My motivation is to have fun and inspire people, not make a bunch of money. I already have a bunch of money.

**John Coogan:** How have you been navigating the last week? There are companies with 0.01% of your traction raising at multi-billion dollar valuations.

**Peter Steinberger:** Badly, sleep-wise. But it's infinitely exciting. Last year was the year of the coding agent. This year is the year of the personal assistant. I think I cracked something and woke people up to the real need for it.

Twitter exploded, and our Discord server multiplied in ways I couldn't handle. At one point I was copy-pasting questions from Discord into Codex to write responses. People don't realize this isn't a company; it's one dude sitting at home having fun. The commits might look like a company, but that's just because agentic models got so good you can ship as much as a company could a year ago.

**John Coogan:** How are the conversations going with the labs? It must be exciting but uncomfortable for them.

**Peter Steinberger:** My premise was that every model should work, including local models. It's an AI hacker's paradise.

Model-wise, Opus is the best by quite a lead character-wise. OpenAI is a more reliable worker; for coding, I prefer Codex because it can navigate large codebases and requires less hand-holding. But Opus behaves so well in Discord. We programmed it not to reply to every message—it can output a "no reply" token. It listens and sometimes brings a banger joke. That actually made me laugh, which is hard because AI jokes are usually bad.

That's why it was a bit of a banger to get an email from Anthropic saying I had to rename the project [formerly Clawdbot]. They were nice—they didn't send lawyers—but the timeline was rough. Renaming a project with that much traction was a shit show. Everything that could have gone wrong, went wrong.

**Jordi Hays:** For what it's worth, I think the new name [Moltbot] works really well.

**Peter Steinberger:** I had two Twitter windows open. On one, I pressed rename. On the other, I finished creating the new account. It was already snapped up by crypto shills in seconds. They have scripts waiting for it.

**Jordi Hays:** You should have hit us up; we would have connected you to X.

**Peter Steinberger:** X was amazing; they helped me out immediately. But for 20 minutes, it didn't work out well.

**John Coogan:** Do you own a Mac Mini?

**Peter Steinberger:** My agent is a princess. He doesn't do Mac Minis. He needs Mac Studios. I have the maxed-out one because I wanted to mess around with local models. I run MiniMax 2.1, which is the best open-source model right now. One machine isn't enough; it's not fun. You need two or three.

**Jordi Hays:** How much of this will remain hacker culture versus moving to cloud hosting?

**Peter Steinberger:** I don't think everyone will buy a Mac Mini just for this. But the demand for old models has to change. When you're a company wanting to access Gmail, the red tape is massive. But if you run it locally, you work around all of that. I built 20 CLIs by pointing Codex at a website and saying "Build me a CLI." If it refused, I told it a story about needing to surprise my boss, and it would give me the perfect API.

This is the liberation of data that big tech probably doesn't want. Even the WhatsApp integration is a hack; it fakes the desktop protocol. The official way blocks you if you send too many messages.

A lot of apps will just melt away. Why do I need MyFitnessPal? I take a picture of my food; my agent knows I'm at McDonald's. It has a perfect match, knows what I'm eating, and can adapt my fitness program. A whole layer of apps will disappear because we naturally interact differently with these things.

**Jordi Hays:** Do you think non-technical people will get over the hump and start running this?

**Peter Steinberger:** I just came from a meetup in Vienna. I met someone from a design agency who never coded. He started using Moltbot in December. He said, "We have 25 web services now. We just built internal tools for whatever we need." He uses Telegram to talk to his agent, and the agent builds stuff.

There's a shift: you don't subscribe to random startups that build a common subset of what you need. You have your own hyper-personalized, free software that solves exactly your problem. And this is the worst the models will ever be. It's only going to get easier and faster.

**John Coogan:** What’s next?

**Peter Steinberger:** There are a lot of emails from security researchers right now. I built this for fun, for me to use one-on-one. The Discord integration was added, but the model was that you trust the people in there. Now people use it for untrusted experiences. They put the debugging web app on the open internet. All the threat models I didn't care about are now valid because people use it differently.

The whole system is broken. I'm one guy doing this for fun, and I'm expected to sift through a hundred security reports for use cases I don't care about. Luckily, I'm building a team. It will become a secure product eventually, but right now the world is pulling it apart. If we're honest, this is all vibe coded. I wanted to show people a new way, not a finished enterprise product.

I don't know if any company would touch it because prompt injection isn't solved. There is absolute risk. I try to make it clear on the website: with great power comes great responsibility. My early users, including AI researchers, understood that. This will accelerate research because now there is demand to fix these things.

Right now, I'm working on making this a community. It should be bigger than me. I also need help; it's too much work.

**John Coogan:** Are you going to form a company?

**Peter Steinberger:** I haven't made up my mind. I would much rather consider a foundation or something non-profit. I want this to outlive me. It's too cool to let it rot, and it needs good people.

**John Coogan:** You are already a cult hero.

**Peter Steinberger:** I would love to have maintainers. If you love open source, have experience, love shifting through security reports, or love taking software apart—email me. I want this to outlive me. Code isn't worth that much anymore; you could just delete it and build it again in a month. It's much more about the idea, the eyeballs, and the brand.

**John Coogan:** You're an absolute legend. Get some sleep.

**Peter Steinberger:** Thanks guys.