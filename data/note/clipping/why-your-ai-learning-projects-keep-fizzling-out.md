---
title: "Why Your AI Learning Projects Keep Fizzling Out"

created: 2026-01-14
published: 2026-01-14
source: https://every.to/podcast/transcript-why-your-ai-learning-projects-keep-fizzling-out
type: "[[Clipping]]"
rating: 6
---
**The transcript of *[AI & I](https://every.to/podcast)* with Nir Zicherman is below. Watch on [X](https://x.com/danshipper/status/2011468416415117714) or [YouTube](https://youtu.be/0xxo8YLpbdY), or listen on [Spotify](https://open.spotify.com/episode/2VAQBHKePX09meLgCK18YD?si=nyrp4F1xSxOh_lmKczi45g) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/why-your-ai-learning-projects-keep-fizzling-out/id1719789201?i=1000745154993).**

### Timestamps

1. Introduction: 00:00:36
2. Why you need a dedicated AI learning app: 00:01:49
3. The process of learning is more passive than you might think: 00:04:32
4. Live demo of Oboe to create a course about philosopher Ludwig Wittgenstein: 00:10:21
5. Learning works best when it comes in many formats: 00:16:52
6. Where AI agents currently fall short in the learning experience: 00:28:21
7. The importance of making learning feel accessible: 00:34:10
8. How Zicherman uses Oboe to learn quantum physics: 00:35:56
9. How embeddings spaces remind Dan of quantum mechanics: 00:40:54

### Transcript

**(00:00:00)**

**Dan Shipper**

Nir, welcome to the show.

**Nir Zicherman**

Thanks for having me.

**Dan Shipper**

So for people who don’t know, you are the co-founder and CEO of Oboe, which—I don’t know what your one-liner is, but from my perspective, it’s an AI learning app that makes one-off courses for you on demand, basically. It’s pretty cool. You can tell me where I’m wrong there. But it’s a really good app. I think it fits with a lot of stuff you’ve been thinking about. Prior to doing Oboe, you were most well known for being an Every writer sometimes, of course, and you’re the VP and Global Head of Audiobooks at Spotify. And before that, you were the co-founder of Anchor. Excited to have you on the show.

**Nir Zicherman**

Thanks for having me. And yeah, I was thinking back on the writing that I’d done for Every. I actually do think it’s very on brand for Oboe because a lot of what I’d written was about trying to make people realize that they can learn and understand things that they probably were intimidated by and thought were too hard to learn.

**Dan Shipper**

I love that you’re doing this because I think AI is just so good for learning. It has expanded my mind in so many different ways. And I want to ask the tough question up front, which is: why does it need to be a separate app? Why isn’t ChatGPT just the ideal way to learn new things?

**Nir Zicherman**

Look, LLMs are incredible. I use them now, honestly, in every aspect of my life, as I know you do too. And I think it’s becoming more and more the case for everybody who realizes how powerful it is. But LLMs are built to be a general tool—like the most universally general tool that you could possibly have.

I’ve spent a long time thinking about learning. I’ve spent a long time thinking about it both from the perspective of an entrepreneur who wants to build products in the space, but also as a person who uses these products day in and day out to actually teach myself things. I teach myself things a lot and I have for years.

What I fundamentally believe is that while chat is extremely powerful for learning, it is not the primary way that people do learn. Most learning is passive. It’s not active. It doesn’t require lean-in participation. Most of the learning that you’ve done in your life has been through the consumption of content passively, with active engagement every once in a while. Most of the learning that you’ve done in your life has been multimodal, right? It has not been sitting and consuming and engaging with content in one particular way. It’s been done through piecing together different formats online.

Every single day, I’m willing to bet that you do this, and everybody listening does this: you get curious about something, you read about something in the news, you identify something that you don’t know too much about, and you go down rabbit holes on the internet to try and learn those things. And you don’t just default to ChatGPT or other LLMs, despite the fact that they’re really, really powerful. You may use them as one tool in the arsenal of tools that you use to learn, but they are just one modality. People learn through multimodality, right? So you’ll start with ChatGPT, and then you’ll Google some stuff and you’ll end up on Wikipedia, you’ll go to YouTube—and you’re not alone in doing that because billions of people do that every single day. There are billions of people who use the internet to learn every day and piece together a learning experience using these different formats and these different platforms.

So back to your question, I think LLMs are a piece of the puzzle, right? They enable an important piece of the puzzle, but given that they were not built as learning tools at their core, they’re missing a lot. And I think a real learning platform has to be built as a learning platform. I believe that a real fill-in-the-blank platform—that many of your guests are probably building on the show—those have to be built by people who are focused on a particular use case.

**Dan Shipper**

That’s really interesting. I want to go back to something you said which sort of shocked me, which is that most learning is passive, not active. Or basically, good learning is passive, not active. Did I get you right? Because I would’ve assumed the opposite. My mental model of how learning works is—at least for me—it’s very much learning in context. I need to do a specific thing, and so I want to understand how to do that thing and how it might fit into all the other things that I know and want to do, which feels very active to me. I do spend a lot of time reading, which I guess is passive, and I am learning stuff, but I just hadn’t really—if I had to bet what you would say, I would’ve said learning happens as an active thing.

**Nir Zicherman**

Well, I think what we’re talking about are probably two different dimensions, right? What you’re talking about is intentionality and objective. Where does the objective come into learning? I do believe that the best learning happens through high intent, high agency, and significant objective-driven motivation. And that’s actually a thing that we talk about a lot as far as the product goes. Most of the use cases that people today are already using Oboe for are objective-oriented. People come in and they say, “I know what I want to accomplish. I want to be good at X,” or “I want to be able to take out a mortgage to buy a house—I have no idea what that is,” or “I want to gain this particular skill so that I can upskill at work,” or “I want to pass this particular test.” All of those fall under this umbrella of high-intent, objective-driven motivation.

That I think is separate from the dimensionality of how you actually go about learning the thing. So I do think that high intent is very important. It is what motivates people the most, and that’s why it’s important to build a product that taps into whatever their objective is and tries to embrace a path that gets them to their objective as quickly as possible and lets them see that it is feasible for them to hit that goal.

But then the question of how do you actually present the material to them goes to the heart of a different dimension, which is what I think of as passive versus active, or single-modal versus multimodal. If you think back to school and you think about the best teachers that you had, most of the time you were learning from them teaching to you with an opinion about how to teach you. You were sitting and consuming them talking, or consuming the reading or whatever it was. You were not actively participating in the conversation. That’s not to say that active participation is not very important—it’s one of the modalities that I think reinforces a lot of the learning that people are able to achieve—but it’s not the primary mechanism.

And what LLMs do is they basically put the onus on the user, on you as a learner, to be very explicit around what you want to achieve and how you want to achieve it, and giving constant feedback. That’s not how people learn. When you were in school, you didn’t give constant feedback to the teacher to get them to adjust their curriculum. The teacher was not asking you questions about how best to structure the course and where to go next. That’s what I mean by passive vs. active.

**Dan Shipper**

That makes sense. That makes total sense. I think here’s maybe one thing where I’m sort of slotting Oboe into my model of the world. Maybe one way to put it—I’m curious what you would say—is LLMs as they are are incredible learning machines, and people do in this very low-intent way pick up new things all the time, every single day. Or at least I do from them. And sometimes there are categories of your life where you’re like, I actually just want to really learn this thing and I want to get the equivalent of a degree from it, or a diploma or certificate or whatever. And in those cases you actually need a real teacher that is thinking about this as a course, not just like a one-off—like reading this book and I get curious about this particular character and I’m going down the rabbit hole with GPT on it. Is that sort of what you’re thinking about?

**Nir Zicherman**

Yeah, I don’t think Oboe is a quick-answer platform. There are many, many ways to get your quick answer to things, right? The internet—I mean, if you think about it, there are many ways to think about LLMs, and I know you’ve written about this and explored a lot of these different perspectives. But at their core, what an LLM is at its core is an information compression machine that just takes the massive breadth of the internet and gives you the information in a much more personalized, specific, fast, compressed way. That’s what it does. It just takes all human knowledge in the form of content on the internet and compresses it down to what could be distilled into a back-and-forth conversation. And so there’s an assumption there that the way people should use LLMs is for quick, succinct information, right? It’s not intended to be long-form.

And yet learning—true learning, the thing that people really want, whatever it might be, that objective that people want to achieve—requires a commitment, and it requires you to follow through, and it requires you to take multiple steps. And anybody who has spent more than a few minutes in an LLM conversation trying to do anything longer than the quick-information thing has probably learned: LLMs are not great at that, right? They lose context very quickly. They don’t stay focused. It is really easy for them to deviate from the path that you originally set out, and that I think is problematic.

That’s actually a thing that we talk about at Oboe a lot: how do you allow users to engage with our platform and deviate and ask questions and make it personalized, and yet continue to provide the scaffolding that’ll always bring them back to the core objective that they set out for themselves? That I think is something that LLMs do not do very well.

**Dan Shipper**

I want to show everyone the product. I think it’s really cool, and I think that’ll give us a lot more concrete stuff to talk about.

**Nir Zicherman**

Sounds good.

**Dan Shipper**

And can I pick the course topic?

**Nir Zicherman**

Yeah, of course. Live demo. Let’s do it.

**Dan Shipper**

This has never gone wrong.

**(00:10:00)**

**Dan Shipper**

This is great. We’re doing it live, folks. Okay. The course that I want to take is I want to take a course in Wittgenstein’s Philosophical Investigations, and I’m sure that it can do this, but the thing that I’m not sure about—and you tell me—is what my ideal version of this course is. It uses the full text, which is available for free online, and every unit of the course is just taking—it’s written in aphorisms basically, or like paragraphs, subsections—and each unit of the course takes one of the subsections and then explains it and talks about it, talks about what you need to know to understand it, and then moves on to the next one. And maybe that’s a horrible way to learn this book, but that’s my vision.

**Nir Zicherman**

Interesting. Two things. First of all, you’re gonna have to help me spell it. But that specific use case—I actually think it’ll be interesting to see what it produces. And maybe it’s not the best example because one of the things that we built into the engine that powers this is we want things to feel lightweight and achievable from a hitting-a-milestone standpoint. And so one of the things that’ll probably happen is it’ll reduce—it sounds like you envision a pretty substantial scope to this course—it’ll by default try to reduce that to the key points, because it wants to make you feel like you are making progress along the way and hitting important milestones rather than giving you something that’s like an unachievable thousand-chapter-long course.

**Dan Shipper**

I see.

**Nir Zicherman**

Yeah.

**Dan Shipper**

I’m also super happy to have it be a section of it, like the first thirty sections or something like that. Would that be better?

**Nir Zicherman**

Let’s see what it does. Let’s see what it does. I don’t know. Let’s see. Alright, how do you spell it?

**Dan Shipper**

Wittgenstein. W-I-T-T-G-E-N-S-T-E-I-N. Wittgenstein’s Philosophical Investigations.

**Nir Zicherman**

Okay. Philosophical Investigations. I’m gonna say give—you know, pull out the first part and give me...

**Dan Shipper**

I would say “part” is not gonna be clear enough. I would say “first 30 subsections.”

**Nir Zicherman**

Okay. And give me the context I’ll need to understand them.

**Dan Shipper**

Understand each one. Yeah.

**Nir Zicherman**

Okay. Yeah.

**Dan Shipper**

Great. Understand them.

**Nir Zicherman**

Interesting.

**Dan Shipper**

Perfect.

**Nir Zicherman**

Yeah, one of the interesting—well, we’ll generate this. One of the interesting things that is a tough balancing act that we’ve had to strike is, because we’re building this—the grand vision is you can learn anything with Oboe—and building a platform that is able to focus on Wittgenstein while also teaching people all of the other things that they want to learn, it’s a really interesting balancing act to figure out how do you empower a platform to have autonomy and to have the breadth to cover everything while also being opinionated about what it does. Because like I said, a true learning platform has to be built with a learning use case in mind. And so we have to have opinions about pedagogical methods and how it is we should be presenting information and what is the balance of passive versus active engagement and things like that.

So, alright, so here’s our course. So Oboe creates a course.

**Dan Shipper**

Let me just stop you there, right there.

**Nir Zicherman**

Yep.

**Dan Shipper**

This is sick. It’s super cool. For people who are listening, it’s now a page with a bunch of different sections. There’s a headline that says “Wittgenstein’s Philosophical Investigations: First 30 Subsections.” There’s an introduction. It has an explanation, it has a podcast, and then it has a bunch of subsections. And one of the things I think is cool about how you did this is it’s obviously difficult to make a course all in one shot, all in a very short timeframe, and it looks like you’re in parallel generating a lot of different things. And you are showing me the first thing I want to read so I can get started immediately while you’re then also filling in the rest of it, which I think is really, really smart rather than making me wait. That’s how you’re thinking about it, right?

**Nir Zicherman**

Yeah. I mean, look, speed is a critical piece of any AI product, I think. We did not want to be one of those products—and there are other products on the market that do this—we didn’t want to be one of those products that requires you to submit something and then wait around for a while in order to get started.

**Dan Shipper**

Yeah.

**Nir Zicherman**

A big part of our value proposition here and our positioning for the product is you can learn anything. Anything that you ever thought was too hard to learn, we could at least get you started, and you can feel like it is achievable. It’s very hard to do that if you give us something and then we kind of immediately violate your trust by taking forever to give you something. We’re there to be the guide, right? And so we want to take you on that first step as quickly as possible.

**Dan Shipper**

I have a question. So it says there are two sources. Did it go and pull the full text?

**Nir Zicherman**

In this case it looks like it may have from these sources. And also it’s possible that it will do that if it feels that it needs to go get an external source. Also, each of the chapters that we have here will have different sources.

**Dan Shipper**

I see.

**Nir Zicherman**

And so it’s possible that it may have pulled them into particular ones but not into the specific one.

**Dan Shipper**

Interesting. Okay.

**Nir Zicherman**

This is the beauty of working with AI—you don’t always know what’s happening under the hood. I mean, we’ve obviously—we can dig into it behind the scenes—but when you’re looking at the product, a lot of times, even as the person who built this, a lot of times I’m looking at the product and I’m like, wow, it’s pretty incredible how much agency—you give it the right guardrails and you give it the right amount of autonomy, it’s able to use that agency to do things that you had never expected. I’ve never—this is a live demo—I’ve never looked at this example before. I’ve never seen the content that we’re about to see before. So it’s always very cool seeing what comes out.

**Dan Shipper**

I love it. So take us through it from the perspective—I mean, for—and talk about it as, because there are people who are gonna be watching and there’s also people who are gonna be listening. So take us through what’s there.

**Nir Zicherman**

For sure. Yeah. So a bunch of different things going on here. Multimodality is a big piece of what we believe in. So what that means is you can’t just be getting a bunch of text in the way that an LLM would give it to you. You have to be given a variety of information, a variety of different ways, in the way that’s most suitable at any given time. And so a big part of the pipeline that powers this is kind of figuring out what is the right thing to show you, also what is the right format to show you at any given time.

Now, the one thing that is an exception to that is our podcast format, because podcast listening is a very different type of experience. The times during your day when you would want to listen to a podcast are very different than the times that you would want to engage with something that looks like this. And that’s why the podcast sits separately. This is a generated podcast. It’s a conversation between two people talking about the topic. And one of the things that we’ve recently added is you can think about this particular chapter as the first episode in a podcast. And all the chapters that you see here on the side are episodes of this long-form podcast. And so the course that you created actually also created a podcast with multiple episodes. In this case it’s six episodes, because there’s six chapters here, each of which kind of build on each other and reference things that came before, but you always have the same two hosts. If I were to play this—I don’t know if this would work in our recording, but you tell me if you can hear this.

**Automated Voice 1**

You know, Joe, I was thinking about this the other day. Have you ever tried to explain a really specific feeling, or maybe a dream you had? The words just fail. Like the more you talk, the further away you get from the actual thing.

**Automated Voice 2**

All the time. It’s that frustrating moment where you feel like language itself is the barrier. And it’s funny you bring that up, because that exact problem obsessed a philosopher named Ludwig Wittgenstein for his entire life.

**Nir Zicherman**

She pronounces it “Vittgenstein.” Interesting.

**Dan Shipper**

Yeah, I know. Now I’m unsure.

**Nir Zicherman**

I think you probably know more than the synthetic voice that we’re using there. The experience of consuming this is—it’s supposed to be rich. It’s supposed to be, as I said, supposed to make use of a variety of different formats. Now, depending on what type of content you’re creating, you’re gonna see a different mix of things. If I were—we should look at a STEM example, because it’ll look completely different than this, right? If I’m looking at something that’s very philosophy-based, it’ll be heavily about the language that you’re seeing, a lot less about the visuals, despite the fact that we have a nice photo of Ludwig here.

You get taken through an experience that, as I mentioned, is meant to feel very piecemeal and achievable, because I think one of the biggest issues, the biggest blockers that prevents people from learning, is feeling like it’s overwhelming to be able to get to the end state that they want to get to.

And so this case here—I’ll show you a different example just as a point of comparison. If I were to go here and here, so this is a recent course that somebody generated on the platform: Quantum Tunneling Explained. Very different, obviously. And so in this case, you’re getting a course about quantum mechanics and you’ll see examples of visuals and content that’s pulled in and content that’s generated that looks very different because it’s built for the specific use case. As we scale the team, as we scale the product, we want to add support for more and more formats and more different—not only formats, but what we call embedded formats, which means the formats that show up inline at the appropriate moment for you to learn the things you want to learn.

**Dan Shipper**

What would happen if I uploaded a full book?

**(00:20:00)**

**Nir Zicherman**

We do have size limits on the uploads, however. I guess it depends how big your file is. But if you were to do that, if you were to take Wittgenstein’s book for instance, you could upload it, you could drag in any attachment here. And we see people doing that. We see people using it for work for that purpose—help me understand this article or this document or whatever it is. That’s what this plus button is right here. And in the case of you uploading a book, I think without giving it direction, it would have to infer a lot about what your intent was by uploading that. But if you uploaded the book and then gave it specific intention about—I want you to analyze this fiction book and do a whole character analysis with plot graphs and things like that—it should be able to do it, versus giving it a completely different set of directions with that uploaded book.

**Dan Shipper**

Okay, cool. That’s really interesting. Well, can we go back to Wittgenstein real quick? Of course. I don’t want to get too far away from Ludwig. I’ll have attachment anxiety. Okay. So if I want to scroll down—so it looks like in these chapters that you have, it has Introduction to Wittgenstein, Transition to Philosophical Investigations, Understanding Language Games, Meaning as Use, which are—it’s going through all the major concepts of the book. But I’m wondering if we go to Analyzing the First 30 Sections. I just want to see what it did there. Okay. Interesting. Let’s keep going. So it’s basically talking about—it is actually in the beginning of the book. It is actually breaking that down. Let’s keep going. Scroll to the bottom. I just want to see where it got to. Oh, interesting. And so it looks like it’s somewhat more summarized.

**Nir Zicherman**

The first 30 sections, I see. As opposed to doing what you suggested.

**Dan Shipper**

Yeah. Yeah. That’s interesting. I did notice this—you have this quiz thing where every once in a while there’s a format where it asks you stuff about whatever it’s teaching you to help you do—I guess that’s one of the more active things you have. Tell me about that.

**Nir Zicherman**

Yeah, so as I mentioned, a lot of our philosophy here is around what we refer to as embedded formats, which is let’s put the right thing in at the right time. And so when it makes a decision that this is an appropriate point for me to reinforce the material that I’ve already covered, it’ll throw in a quiz or it’ll throw in flashcards or a game or different formats. As we add support for more and more embeddable formats, what we’re doing here is we’re giving this pipeline that generates all this content more of a toolkit, if you want to think about it like that, to use—just like a teacher has a variety of different tools at their disposal and they’re able to use the right one at the right time that they determine is fitting.

But you’ll notice in this case, back to our question about passive versus active, it is objective-oriented, right? It is intentional in the sense that you could see that the course was built in a way that built up to the thing that you asked it to do. In this case the end result, I guess, was not as detailed as we were hoping that it would be, but it built up from basics to get you to the end result. But on the active versus passive thing, it tries to strike the right balance there.

**Dan Shipper**

Right. So in this case, that’s interesting.

**Nir Zicherman**

It’s mostly passive.

**Dan Shipper**

Is there a way for me to be like, hey, no, no—I want more, I want a bigger, deeper course? Can I say that?

**Nir Zicherman**

So we talk about that a lot. Currently in the product we don’t have the ability to do that. The way to do that would be to continue to refine your prompts, and you can generate as many of these as you want for free. There’s no limit on how many you can generate. However, one of the things that we talk about a lot—users ask for this a lot—is how can we take content that we’ve already generated and give the user the ability to continually refine the course so that you could say, actually, here I want you to double down, I want you to split this into multiple chapters, things like that.

**Dan Shipper**

Yeah, yeah, yeah. That’s really interesting.

**Nir Zicherman**

And then giving more granular control to the user to be able to also say, I want it more tonally in a particular format. I’m using this to teach my kid fifth-grade math or whatever it is. And so we want it to be presented to them in a slightly different way. Giving those granular controls is gonna become an important part of the product as well.

**Dan Shipper**

Got it. Awesome. How’s it going so far, business-wise?

**Nir Zicherman**

It’s great. So we launched the product officially in September of 2025, and the three months or so following that were all about addressing some fundamental things that came from our users, came from the launch—the realization that we could be much more objective-oriented in our content, we could have a much more enriched format, enriched presentation of the material, which is the version that you’re seeing right now. And so we recently launched a substantial change in terms of how the product is presented to the user and what they get out of it, as well as some changes like allowing users to create unlimited courses for free. And so that’s relatively new. And then the other thing that happened recently was we announced our Series A, which we raised after launching the product. And so that was just announced as well. And so we’re now entering the phase where we’re able to grow the team and do a lot more and hopefully build out a lot of these features that you and I are talking about.

**Dan Shipper**

That’s awesome. Congrats.

**Nir Zicherman**

Thank you.

**Dan Shipper**

What has surprised you so far about who’s using it and what they’re using it for, and maybe what they’re not using it for?

**Nir Zicherman**

I wasn’t expecting the extent to which what people put in is objective-oriented, as I mentioned. And that’s informed our roadmap a lot. And so if you look at the prompts that people put in, more than two-thirds of them are under this category that we refer to as objective-based learning goals. And it kind of reinforces—it probably should have been obvious to us, but I think actually seeing the real-world data changes your perspective on what a product like this is for.

You know, most people today struggle with this gap that exists in their minds—in my mind, for a lot of things that I want to learn, and I’m sure in yours as well. I know what I want to achieve. I just have no idea how to get there. I know that I need to understand X, I know that I want to do Y for my job, I know that I want to start learning about this topic that I’m theoretically interested in. I have no idea how to even begin, and I have no idea what the steps are to get there. And so I think creating learning to me is primarily about that—it’s about allowing someone to specify what their end objective is and getting them that path.

Now, if you think about the way that most people historically have learned things with online platforms, it’s actually the exact opposite of that. They have no control, no agency over where they’re going. It’s just, I’m generally interested in a topic, I’m gonna find some resources for beginners to get me on the first step, and then I have to do a bunch of research to figure out how to get to the second step. But you’re not personalizing the journey. I mean, even LLMs, to the point that we mentioned earlier—if you were to specify to an LLM what your long-term objective was, and you were to spend more than a few minutes or a long context window trying to talk to it to get you there, it’ll very quickly lose context, right? And it’ll lose track of what it is that you’re trying to achieve. And so ultimately I think a real learning platform that’s successful at teaching has to be able to simultaneously always be oriented towards the objective the user is trying to get to, and also allow for a lot of freedom along the way and a lot of quick wins and a lot of keeping the learner motivated so that they continue to go.

**Dan Shipper**

That’s interesting. Yeah, I have not found—like ChatGPT especially with now, let’s say GPT-5.2 and Opus 4.5—that it really gets that off track with long context. Opus 4.5, definitely in longer chats it’ll do this compaction stuff, and it’s just like the way they’ve done that is stupid. But more or less it seems in my experience that it keeps going. These chats keep going.

The thing that I find—because I use these tools to learn all the time—so when o3 came out, was it o3? Yeah, it was o3. They added the ability for it to set reminders. And so what I started to do was I took a couple things that I wanted to learn about. So one was I wanted to go through Andrej Karpathy’s Building a Language Model course on YouTube. And I said, every day I want you to take me through a new section of that course on YouTube. So get the whole video, figure out what he does, and then walk me through it step by step and stop when I don’t get something, and let’s just keep working on that until I get it.

And it actually worked really well for a couple days. And it was actually really good overall because 200 days in it was still beeping me and being like, hey, there’s this piece of this thing that you haven’t done. It was pretty good. But the problem is basically splitting it up into those little pieces. At some point I got to a piece where it was a little hard, and then I was like, I don’t have time for this right now. And I let a couple days go by, and then that piece—looking at it again three days later—I was like, I don’t really have the context anymore for even where we were. And I have to do now even more work to build back up to this, and that’s even less appealing. And so it just ended up—they just kept reminding me, hey, we’re right here at this, you know, we’re learning about how key-value stores in LLMs work or whatever. And I would just feel guilty about it every morning and then I just dropped it basically.

So that’s been my experience actually, is that one, I often have a motivation to learn something hard, but that motivation—it passes. Especially if it’s not fully related to my job or something. And this is actually kind of related to my job, but I can get by at my job without having done this course. And then so there’s the passive stuff, and then there’s the like—

**(00:30:00)**

**Dan Shipper**

We’re building up to something and I sort of lose context of where we are on the path. And then it doesn’t adjust to be like, hey, I saw you haven’t responded in three days, let’s try to reignite your interest here and get you caught up in a way that gets you psyched again, in the way that maybe a friend would or something like that. It doesn’t have that little bit of intelligence, which maybe at this point it could do it, I just haven’t prompted it for that. But those are, I think, my two big problems.

**Nir Zicherman**

I think that touches on the interesting double-edged sword of creating LLMs and building them to be generalized tools, right? Especially once you get into the agent stuff, which is what you’re talking about. In order to have it deliver the value, you really let this thing run on its own more than an LLM in a regular conversation, right? And so in order to have it deliver value over a long period of time over multiple sessions, you have to be pretty constraining, I think, in terms of what this thing can do. You don’t want it to go off the rails, which agents, if you set them off on their own, easily could.

And so there’s this really interesting balancing act that has to happen under the hood for any of these AI platforms, especially for LLMs, where it’s like, as you’re building agents, how do you set the guardrails? Give them some level of autonomy, but set in a way that’s flexible enough. And to your point, it’s clearly not flexible enough to say, hold on, I need to reassess the entire approach here because Dan’s kind of lost track, or he’s lost interest, and I need to come at this from a different angle.

Clearly we are in the very early days, I think, of the technology that is able to successfully do that, right? The agent sort of reassessing its own objective and its own approach to things, and allowing the system to rewrite the rules, redefine the guardrails and move them so that it becomes more valuable without requiring you as the user to actually come in and be very explicit with, actually no, I want you to do this. Right? Because my point from earlier, you would never do that with a teacher. The teacher would be able to read the room. A teacher would be able to know when their students were confused. The teacher would be able to know, hold on a second, it’s been a week since we last covered this, I need to reinforce certain material. They don’t put the onus on the user—or in that case, sorry, the student—to come to them and say, hey, actually teacher, you need to do it this particular way. And I think that’s where the current landscape breaks down and doesn’t fulfill the promise of being the type of learning experience that we all had in school growing up.

**(00:40:00)**

**Dan Shipper**

How do you think about—so this experience with ChatGPT, it’s like I can sort of set this thing and then I forget it, but it continues popping up. So it feels like it’s now part of my life and it’s in the way of my normal routine. Whereas my experience with Oboe, which is using it a little bit a couple days ago in preparation for this—and honestly I just saw a tweet about it and I was like, I gotta try this. I honestly forgot we were—I knew we were recording at some point, but I was like, this actually sounds sick, I should just try this.

And my experience with it is I asked it to make a course and I can’t remember what it was, and I was looking at it and I was like, oh, this is cool. But then I was like—and this is, I was on my phone, I was in the airport—and then I was like, okay, this is cool, there’s a lot here. I read a little bit of it and then I just forgot about it basically. And it feels like there’s enough material in any course that I could spend probably hours over a couple days on it. But the consumption format feels very ephemeral. How do you think about that?

**Nir Zicherman**

Talking about balancing acts again, it’s a tough balance to create content that feels lightweight but not ephemeral. And I think we are continuing to work on that—how do you make this thing feel like an asset that has longevity to it, that you can come back to, but not so much so that it intimidates you and makes you feel like it’s heavy?

I think one of the single biggest issues that exists with any learning platform historically, especially formal education platforms, is the content feels incredibly overwhelming, right? You’re presented with this massive amount of information, it feels heavy, you don’t want to even get started. So that I think is an interesting balance.

Now that we have a model where users can create as many courses as they want for free and put in as many prompts, I actually think that ephemerality is totally fine. At any given time we should be able to retain context about what you’ve asked before. If you want to pick up where you left off, you don’t need to go into a pre-existing course. We can make a new one picking up where you left off, and you should be able to prompt Oboe to let you do that.

I will say, given how early we are, we don’t yet have the re-engagement hooks that a product like this should have. We don’t have a mobile product yet, a native mobile product. It’s a web-based product right now, and that’s all coming. And obviously learning requires notifications, re-engagement. Learning requires you to learn on your phone and on your desktop and have a native app. Where we decided to focus our energy with the small team that we have—small in the early days—was on hyper-focusing on the utility that this product would deliver. Because if we could nail the value proposition, if we could really find product-market fit with the use cases that people would come with, then the sky’s the limit in terms of where you could take that in terms of re-engagement.

**Dan Shipper**

What are you using it for? What are you learning with it?

**Nir Zicherman**

So I’m a big nerd, and for years I’ve been very interested in all of these advanced math and science topics that I never learned in school. I did not major in math and physics, and I wish I had. And this kind of speaks to the mission of the company also—it took me a very long time to realize that despite the fact that I was fascinated by all these topics, I could actually teach myself, and it’s becoming increasingly easy for me to teach myself, especially with tools like Oboe. So a bunch of physics topics primarily that I’d never gotten the chance to learn formally in an academic setting. And now I realize I don’t need the academic setting, right? I’m able to actually go through and teach myself and have an enjoyable, lightweight experience where I can jump in and jump out as easily as I want to.

**Dan Shipper**

What kind of physics stuff are you thinking about?

**Nir Zicherman**

In the case of Oboe here, let me see what I’ve made recently. I was reading the other day about the history of quantum physics, like how it was first discovered in the early experiments. How did they discover black body radiation and stuff?

**Dan Shipper**

Yeah.

**Nir Zicherman**

More the—I forget how to pronounce it. Have you ever heard of the—we’re gonna get very nerdy here. The Stern-Gerlach, I think it’s called. Do you know Stern—is that—

**Dan Shipper**

It’s an excellent follow-up to Wittgenstein. I don’t know. Is it Stern-Gerlach?

**Nir Zicherman**

Okay. So we’ll get very nerdy here for a second. So the Stern-Gerlach experiment was the experiment that basically proved that spin—quantum spin—which is the, if you take a particle, any particle, any atom or electron or whatever, it has some inherent spin property where it spins. And there’s this challenge of determining what direction it actually spins in.

And so they built this apparatus, these two experimenters, Stern and Gerlach—I don’t know how it’s pronounced. And they built this apparatus that basically determines spin, it measures spin and determines it as either being up or down, right? And that’s to be expected. If you throw a particle and you measure the spin of a particle as up or down, then it’s one or the other. And probabilistically in quantum physics, it kind of expects that 50 percent of particles will be up, 50 percent will be down.

But there are all these really weird variations on the experiment that they did to determine that quantum states are totally inherently probabilistic and completely unpredictable. And so to give you an example of this: if you were to take a particle and measure its spin as either being up or down, then you were to measure its spin along a different dimension—so instead of measuring how much it’s spinning on the Z axis, you measure it on its X axis—and then you measure it again back on the original axis that you had. So you go from Z to measuring it on X back to Z. There is once again a 50 percent probability that it’s either up or down on this new axis.

So this experiment basically proved—and this had been theorized for a while, but they actually proved it through this experiment like a hundred years ago—that the particle somehow almost forgets the state that it’s in. It almost forgets which way it’s spinning when you measure it the second time and when you go back to orienting it.

My computer—I don’t know if you saw that. It sounds like fireworks. I guess I did a hand gesture. Mind blown.

When you go back to measuring it on the original axis that you measured on, it totally disregards the original measurement, which makes absolutely no sense, right? That’s almost as if I were to say I spin a top or I spin a ball or something like that. I measure it in one way. I measure it in a different way. And then when I go back to measuring it the first way, it’s actually spinning in a different direction 50 percent of the time.

And the thing that blows my mind learning about this is not only the underlying physics itself is fascinating, but also this happened a hundred years ago. They were able to build successful experiments to determine that this actually was true something like a hundred years ago. I can look up when this experiment was done—1922. This experiment was done more than a hundred years ago, and it just boggles my mind. Think about the technology that was available to them at the time and that they were able to figure this out.

**Dan Shipper**

Totally. It’s really interesting. It makes me feel like we haven’t really—I feel like Newtonian physics has made its way through all of culture and society, but quantum physics has not. And we’re still stuck in sort of a Newtonian world in a lot of ways.

**Nir Zicherman**

Yeah.

**Dan Shipper**

Well, it wasn’t before Newton, you know?

**Nir Zicherman**

That’s true.

**Dan Shipper**

We were like, this Newton shit, that’s crazy. That’s definitely not how it works. So I—but it is, I think it is sort of unintuitive. The thing that I’ve been thinking—because I’ve been, I guess everyone, every nerd just sort of likes quantum mechanics. So I’ve been reading a little bit about quantum mechanics and philosophy. And so one of the things I was thinking about—and I am the furthest thing from being good at physics, so I’m curious as another non-expert, but someone who seems to be a lot smarter and more grounded in it than me. And maybe we can make an Oboe course about this to explain it to us live on the show. You tell me.

But I’ve been wondering about—I think of language models as this interesting discontinuity in the way that we think about how knowledge works and what knowledge is. And when we first started trying to build artificial intelligence, we started from symbolic AI, which is essentially like we’re gonna reduce intelligence down into a set of rules that—are human-understandable, are formal, are explicit, and we’re gonna build our way up to something that can learn anything. And then we just ran into this big problem, which is it would take more computation than is available in the universe to actually do that. And then we flipped to language models, which I think of as being a little bit more of a postmodern technology that learns countless implicit patterns from tiny, tiny correlations in long pieces of text to figure out what comes next.

And that ended up working really well in this way that’s like—it works, but we don’t quite understand it, and we can’t reduce it down into that symbolic thing that makes it understandable and almost makes it feel a little bit more Newtonian.

**Nir Zicherman**

Yeah.

**Dan Shipper**

And the way that we did that is we invented embedding spaces. And there’s something about that whole thing that reminds me a little bit of quantum mechanics. And the specific thing that I think of with quantum mechanics is the double-slit experiment.

I cannot do the double-slit experiment off the top of my head, but more or less it’s very similar to what you just explained, where depending on how you look at a photon, it shows up as either a particle or a wave. And there’s all these different weird variations of it, but effectively the way that you measure it, at the time that you measure it, determines whether it becomes a particle or wave. And before that, it’s in some probabilistic in-between state.

And what that reminds me of is sort of embedding spaces somehow. It’s like if at different times you measure the same thing and it’s different depending on when you measure it or how you measure it, then there’s probably some—it exists in this high-dimensional way that you’re reducing its dimensions down to something that you can actually measure. In the same way that you’re taking a point in the embedding space and reducing it down into the next letter. I’m saying this very inelegantly, but I think you probably get what I’m saying. Does that make any sense, or am I just being crazy?

**Nir Zicherman**

Well, a few reactions. First of all, I’ll tell you, maybe 10 years ago or something, I had always been a huge fan of the double-slit experiment. If anybody listening doesn’t know what the double-slit experiment is—I probably, I don’t think I can think of anything I’ve ever learned in my life that has blown my mind as much as the fact that this is real.

And I remember I had a conversation with somebody about 10 years ago where the double-slit experiment came up. We were both just totally nerding out about how fascinating it was, and we had this moment where we were like—to your point earlier around how the world hasn’t come around to thinking about this—how is not everybody talking about the double-slit experiment all the time? The fact that that actually is a real thing and we don’t just constantly talk about it is crazy. Because it’s probably as incredible a fact of the universe as can be imagined.

But you’re right. There’s definitely a lot of similarities to the fact that there’s this other incredible, totally inexplicable thing about the universe, which is that if you take a massive amount of information created by humans—the internet—and you pass it into one of these massive neural networks, it’s able to identify patterns that we humans don’t even know exist. And it’s able to do it in a way—the massive high-dimensional space of these embedding spaces that you’re talking about—means that there are dimensions of human output, of what it is that we create, that we’re completely blind to. And it’s not like the AI goes about training one of these embedding spaces and labels these axes for us. And so these dimensions exist in this high-dimensional space that basically totally define patterns in how it is that we behave, that we have no idea how to make sense of.

That’s certainly a thing that is incredibly weird as a human being to try and wrap your head around. Like philosophically, how is it possible that we as humans were able to create machines that are able to understand our output and predict it so much better than we ever would be? And not only that, but do it in a way that we have absolutely no sense of how they actually work under the hood. We know the technical way that they work, but we have no understanding of why they find certain patterns and what those patterns actually represent, because they’re just numbers and we can’t make sense of them.

But you did say something that I thought was interesting, which is you talked about the probabilistic nature of the LLMs. It’s worth pointing out LLMs inherently are not probabilistic. Actually, the underlying models that power them are 100 percent deterministic. We put in the probabilistic variance to try and make it sound more human-like and unpredictable.

But the truth is—and I don’t know if anybody’s done this type of experiment, but I would love to see this—what does an LLM look like if you reduce the variability of its output to zero, which I think would be the temperature setting, right? You basically reduce the temperature of any LLM down to zero so that the thing that it’s determined is outputting is 100 percent mapped to the patterns that it’s found, right, and to the weights that it’s giving to each one of the tokens. How good or bad would that output be? It probably wouldn’t feel very human, but it would weirdly actually be more accurately representative of the output that humans are creating on the internet.

**Dan Shipper**

That is interesting. I think the reason why that doesn’t work currently—there’s really good research from Thinking Machines, which is Mira’s company, where they’re looking at why even if you set it to zero, it’s actually still not deterministic. And it turns out that it’s because when you add floating point numbers of different precision in different orders, you get slightly different results. And those floating point additions are happening in parallel on GPUs, and depending on the order in which the work is batched, it will end up changing the end result.

And so they’ve figured out how to fix that so that when you set it to zero, it is actually purely deterministic. But any production LLM is not—except for Thinking Machines—is not actually deterministic, even at temperature zero.

**Nir Zicherman**

And I guess the reason—just so I understand it—because it’s parallelizing across many GPUs, I guess there’s a race condition where you don’t know which computation is gonna get completed first?

**Dan Shipper**

First. I think it’s something like that. That’s interesting.

**Nir Zicherman**

Yeah.

**Dan Shipper**

It’s definitely about the order of operations of float addition being parallelized in batches on GPUs.

**Nir Zicherman**

But I—you know what, I’ve never thought about this before, but I actually wonder if the human brain works exactly the same way. You could think about the fact that the human brain is a computational neural network with gazillions of parameters. And so this question arises of—take out any consideration of quantum mechanics or anything like that, right? In a purely Newtonian world, if I were to get exactly the same input and put it into my brain, would it produce the exact same output?

And it sounds like based on this research, in the real world, because it’s noisy and because different neurons are firing off at different speeds, you actually have the same race conditions happening in your brain. And so it’s totally possible that you would have a totally non-deterministic answer or output given the same input in the brain as well.

**Dan Shipper**

I would guess that it’s not the same race condition, because I don’t think we’re doing floating point arithmetic. But if you’re around old people, they tend to repeat themselves. And in the same situation, in the same context, they’ll say the exact same things, and it gets worse and worse as you get older. And I bet there’s something there. It’s something about the flexibility of your neural pathways and which ones get activated, and you just end up activating more and more of the same ones instead of new ones. There’s something like that I think is going on.

**Nir Zicherman**

There’s probably a reinforcement thing there too, where as you keep activating the same ones, it reinforces that those are the ones that your brain should be activating. And so it ends up getting worse over time.

**Dan Shipper**

Yeah, exactly. And I think you also as a child have way more connections than you do as an adult. So you’re constantly pruning connections. And I think that process—maybe I don’t know the biology of it—but there’s something about that process that I think continues. And then you just ossify a little bit as you get older.

**Nir Zicherman**

Right.

**(00:50:00)**

**Dan Shipper**

Anyway, lots to learn. I want to make some Oboes about all these topics. But I think the one thing that you did actually make me think of is language models know things that we don’t know, but that’s because we think of knowledge as something that we need to be able to explicitly talk about. And language models are able to do things that we actually know a lot about implicitly—we just have not been able to articulate in an explicit way how it works.

So we’ve been able to write for a very long time, and we have some idea of how language is formed from linguistics. But that has not enabled us to generate language in the way that language models do. But I do think that there’s some broadening of our idea of what it means to know something from looking at language models and looking at how, even if we can’t explicitly say how they work, they are actually able to embody a corpus of knowledge. It’s not new knowledge, because it’s all generated from us. So it’s just knowledge that exists in us in a different way.

**Nir Zicherman**

Say that last part again. Knowledge that exists—it exists in us in a different way because of the fact that we can’t—

**Dan Shipper**

In a different way. It’s intuitive. It’s not something that we can talk about, which is actually Wittgenstein’s whole point.

**Nir Zicherman**

Back to Wittgenstein. Yeah, look, I think there’s the mind and the internal way that the mind works, and then there’s the way that the mind projects out into the real world and the way that we look at it. And I think if anything, LLMs have probably forced us to realize that those two things are massively disconnected, right? Just because a mind is conscious and self-aware and aware of its own output doesn’t mean that it understands any of the mechanics of how it works under the hood.

Yeah. I mean, I think we are very much scratching the very surface from a physics standpoint—the implications on physics and philosophy and things like that of all these questions around what is the mind and what is consciousness and all that. And I often try to reflect on, are we going to have some kind of breakthrough that actually answers some of these fundamental philosophical questions that you’re talking about? I don’t know that I’m convinced that that actually could happen. I think the human mind biologically developed in a way—evolutionarily developed in a way—that probably intentionally obscures all this from us and makes it so that we probably can’t do the things that LLMs can do, and we can’t identify the patterns that LLMs can identify. I don’t know, I think I’ve convinced myself that there is a limit to how much we can actually know about this. But you might feel differently.

**Dan Shipper**

I think that I’ve just broadened the definition of knowledge. Because anything that an LLM can do, a human has done. And I think that should count as a form of knowledge. And if we can’t explain it—

**Nir Zicherman**

That’s fair. That’s fair. Although what an LLM has access to in terms of its input and its ability to train on all these different corpora of knowledge—

**Dan Shipper**

Any individual person can’t, but humans have.

**Nir Zicherman**

Humans collectively can. Yes, correct. Yeah, yeah.

**Dan Shipper**

Yeah. Well, that is I think a great way to end it. Nir, thank you so much for coming on the show. If people want to try Oboe or find you on the internet, where can they find you?

**Nir Zicherman**

Oboe.com. Go create as many courses as you want. Let us know what you think. Feedback is always welcome. I really appreciate it. Yeah, I’m Nir Zicherman. You can find me with—my name is my handle on all the various platforms. So we’d love to hear from everybody, and if you have any product feedback, let us know.

**Dan Shipper**

Awesome. Thanks for coming on.

**Nir Zicherman**

Thank you, Dan. Appreciate it.

---

*Thanks to* ***Scott Nover*** *for editorial support.*

***Dan Shipper*** *is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*

*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with* ***[Spiral](https://writewithspiral.com/)****. Organize files automatically with* ***[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with* ***[Cora](https://cora.computer/)****. Dictate effortlessly with* ***[Monologue](https://monologue.to/)****.*

*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*

*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*

*For sponsorship opportunities, reach out to [sponsorships@every.to](https://every.to/podcast/).*

*Help us scale the only subscription you need to stay at the edge of AI. Explore [open roles at Every](https://www.notion.so/Jobs-Every-25cca4f355ac80c5ad6ee7a6e93d6b4e).*

[Subscribe](https://every.to/subscribe?source=post_button)

## The Only SubscriptionYou Need to Stay at the Edge of AI

The essential toolkit for those shaping the future

"This might be the best value you  
can get from an AI subscription."

\- Jay S.

Join 100,000+ leaders, builders, and innovators

![Community members](https://every.to/assets/paywall/faces-2b72f553c10b6f8c7042928513f8254f0b1056a695678d112a1159bae5c7b86a.png)

[Start free trial](https://every.to/subscribe)

### What is included in a subscription?

Daily insights from AI pioneers + early access to powerful AI tools

[![Sparkle](https://every.to/assets/paywall/banners/sprakle-3998fd9303b988003a5309954a7076dddfdb2733858794d392e28fbcca4c3c6b.png)](https://makeitsparkle.co/every?utm_source=every&utm_medium=banner&utm_campaign=post) [![Spiral](https://every.to/assets/paywall/banners/spiral-5b5204442aabd7442c4d35939af9566671caff13573610cadd497ed0ddab2047.png)](https://writewithspiral.com/?utm_source=every&utm_medium=banner&utm_campaign=post) [![AI&I Podcast](https://every.to/assets/paywall/banners/podcast-2a814c7a5b3ff56c28761faa62c742c32cb1520fa566b531df77ec50c8d53576.png)](https://every.to/podcast) [![Every](https://every.to/assets/paywall/banners/every-d9e451afd583c762e86e9bb995d51423dbc50c6b733350c4984ec0cd142e4e28.png)](https://every.to/?utm_source=every&utm_medium=banner&utm_campaign=post) [![Cora](https://every.to/assets/paywall/banners/cora-4b38f5cb1f7eaeb1883e423ed3b8e32c7281492ac6bc07ed844e7041d924fe57.png)](https://cora.computer/?utm_source=every&utm_medium=banner&utm_campaign=post) [![Monologue](https://every.to/assets/paywall/banners/monologue-9588a08453ba803da385656a0902f3dd08bdfc34118f07d4460208c9b0d1b1df.png)](https://monologue.to/?utm_source=every&utm_medium=banner&utm_campaign=post)

Front-row access to the future of AI

In-depth reviews of new models on release day

Playbooks and guides for putting AI to work

Prompts and use cases for builders

Bundle of AI software[**Sparkle:** Organize your Mac with AI](https://makeitsparkle.co/every?utm_source=every&utm_medium=banner&utm_campaign=post)[**Cora:** The most human way to do email](https://cora.computer/?utm_source=every&utm_medium=banner&utm_campaign=post)[**Spiral:** Repurpose your content endlessly](https://writewithspiral.com/?utm_source=every&utm_medium=banner&utm_campaign=post)[**Monologue:** Effortless voice dictation for your Mac](https://monologue.to/?utm_source=every&utm_medium=banner&utm_campaign=post)

## Related Essays

## The Only SubscriptionYou Need to Stay atthe Edge of AI

Everything you need to thrive in the new economy

[Upgrade to paid](https://every.to/subscribe)