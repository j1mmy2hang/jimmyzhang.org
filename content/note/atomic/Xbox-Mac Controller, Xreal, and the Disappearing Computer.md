---
created: 2026-01-23 11:12
uid: EdbZ
---
## Xbox-Mac Controller

I developed a script for macOS that enables full computer control using an Xbox controller, effectively replacing the traditional keyboard and mouse.

I have long envisioned a future of human-computer interaction that moves beyond the conventional 26-key keyboard, which makes this project particularly exciting to me. 

The system supports comprehensive controls including cursor movement, scrolling, clicking, dragging, system volume and brightness adjustment, application switching, and numerous custom shortcuts for text editing and navigation. For text input, I utilize Typeless, which performs reliably in most scenarios. 

Only issue: currently, Typeless still cannot entirely replace the keyboard, as fine-grained text adjustments—such as inserting spaces or selecting between similar characters (e.g., 他 vs. 她)—still require manual intervention.


![[image-ByCH.jpg]]

![[image-psXl.png]]

## Modularized Computer

Here's where it gets interesting: I put my laptop in my bag, run a single cable to my Xreal AR glasses, and control everything through the controller in my hand. To anyone watching, I'm just wearing sunglasses and holding a game controller. In reality, I'm running my entire computer.

This implementation validates my thesis in [[电脑的模块化发展趋势]] (the modularizing trend of computers) about laptops fundamentally consisting of three modular components: interaction, compute, and display. My setup demonstrates this modularity in practice:

- **Laptop (the chip)** — compute
- **Xreal glasses** — display
- **Xbox controller** — interaction

My setup just makes the separation physical. 

## Cloud Computing & The Future of Computers

Push modularization to its limit, and the laptop disappears entirely.

The monolithic box that bundles keyboard, screen, and processor dissolves into three separate streams: computation moves to cloud and edge servers, display lives in AR glasses on your face, and input flows through BCI, eye tracking, and hand gestures. Wear your glasses, and start working anywhere. No heavy laptop, no keyboard, no 13-inch laptop screen. Just a giant screen in your view and intuitive control that understands your intentions. 

The benefits of centralized + edge cloud computing extend beyond mere convenience. Today, your laptop's chip idles most of the time—millions of processors sitting dormant, burning standby power. When computation becomes access rather than ownership, shared servers can self-optimize, consolidating workloads, scaling down during low demand, and maximizing every watt. 

Technical-wise, I am not sure what's the current bottleneck to achieve this. But still, most importantly of all, I just want to start working anywhere on my glasses. 

![[image-5teF.jpeg]]