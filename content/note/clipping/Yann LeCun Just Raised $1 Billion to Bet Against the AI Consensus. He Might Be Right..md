---
created: 2026-03-11
published: 2026-03-10
source: https://x.com/yoemsri/status/2031424981981422021
type: "[[Clipping]]"
rating: 4
uid: oh9l
---
In November 2025, Yann LeCun left Meta. Four months later, he has closed over $1 billion for AMI (Advanced Machine Intelligence) on a single conviction: that ==large language models cannot become the substrate of human-level intelligence==, and that the industry's decade-long bet on scaling them is approaching a ceiling it cannot reason its way past.

The round values AMI at $3.5 billion pre-revenue. The cap table includes:

- Cathay Innovation
- Greycroft
- Hiro Capital
- HV Capital
- Bezos Expeditions
- Mark Cuban
- Eric Schmidt
- Xavier Niel

Investors of that profile do not price speculative goodwill at $3.5 billion. They are pricing the probability that LeCun's architectural thesis is correct, and that being early to the infrastructure required to support it will compound significantly.

Whether the thesis holds, and what it means for how AI infrastructure gets built if it does, is worth examining carefully.

![Image](https://pbs.twimg.com/media/HDC98c0XYAAVpx7?format=png&name=large)

## The Argument Against LLMs as a Foundation

LeCun has been making this argument for years. The industry has largely treated it as contrarian noise from a researcher whose identity is tied to a pre-LLM tradition. That framing misses the precision of what he is actually claiming.

His core position is that ==LLMs are trained on language, and language is a compressed, lossy representation of human experience rather than its source==. When a child learns that fire burns, the learning happens through physical encounter with causality. The internal model of the world that results from that encounter is richer, more grounded, and more transferable than anything derivable from patterns in text, however vast the corpus and however sophisticated the architecture processing it.

![Image](https://pbs.twimg.com/media/HDC-CapaMAQMpar?format=png&name=large)

LLMs encode patterns in how outcomes are described, but carry no internal model of why those outcomes occur. That distinction is largely invisible when the task is answering questions or generating code, where language is the appropriate medium. It becomes critical when the task requires planning under physical constraints, reasoning about causal chains in conditions that differ from the training distribution, or interacting with systems that do not communicate in natural language at all. These are not edge cases. They are the majority of problems that matter in industrial, biomedical, and physical environments.

The architecture LeCun developed inside Meta's FAIR lab, Joint-Embedding Predictive Architecture (JEPA), addresses this directly. Rather than predicting the next token in a sequence, JEPA learns abstract representations of how the world transitions between states, building internal models of physical systems from the structure of those systems themselves.

The framing maps closely to how neuroscience describes predictive processing in biological brains: a system that continuously models the next state of the environment from sensory inputs, updating those models as new information arrives, rather than retrieving stored linguistic associations and recombining them into plausible-sounding outputs.

## What AMI Is Actually Building

AMI's stated mission is to build systems that understand the world, maintain persistent memory, can reason and plan, and remain controllable and safe. Each of those properties is a distinct engineering challenge current LLM-based systems have not resolved. The combination of all four is an architecture problem the major labs have largely deferred in favour of scaling what already works commercially.

The early commercial focus is on manufacturing, biomedical, and robotics, with Toyota and Samsung named as initial partners. Both operate environments where the primary information source is physical state, sensor telemetry, and causal chains in real systems rather than documents or dialogue.

That is precisely the domain where world models have a structural advantage, and where the value of accurate predictions is measurable in operational terms rather than benchmark scores. A world model that predicts component failure modes in an aircraft engine is worth something that can be calculated. A marginal improvement on MMLU is harder to price.

The longer-horizon ambition LeCun describes is a "universal world model," a generalised architecture capable of serving physical reasoning needs across industries regardless of sector. In practical terms this would be a foundational model grounded in physical causality rather than linguistic co-occurrence statistics, architecturally prior to language in the way sensory experience is prior to speech.

AMI is not positioned to ship a consumer product in 2026, and LeCun has not suggested otherwise. What the company is positioned to do is demonstrate, on domain-specific benchmarks over the next two to three years, that world model architectures can outperform LLMs on the class of tasks where physical grounding matters most. Results of that kind would reorient how the field thinks about the next generation of capability in ways that no amount of scaling existing architectures would produce.

## The Infrastructure Implications

LLM training infrastructure is, at this point, a largely solved operational problem. The architecture is well understood: dense GPU clusters, high-bandwidth interconnects, distributed checkpointing, inference serving at scale. The hardware supply chain is NVIDIA-dominated and increasingly competitive at the systems integration layer. The economics are challenging but legible, and the playbook for standing up large-scale LLM training is no longer a research exercise.

World model training presents a substantially different workload profile, and the infrastructure to support it at scale does not yet exist in mature form anywhere.

![Image](https://pbs.twimg.com/media/HDC-MNUXoAAUXaH?format=png&name=large)

The data inputs for world models are heterogeneous in ways that LLM pipelines were not designed to handle: sensor feeds, video streams, simulation outputs, structured telemetry from industrial systems operating across different physical domains and sampling rates. The training objectives diverge from next-token prediction in ways that change memory access patterns and compute utilisation profiles at the hardware level.

Inference latency requirements are often significantly stricter too, because the systems consuming world model outputs operate in real-time physical environments where the cost of a slow or wrong prediction is immediate and material, rather than at the pace of human reading.

Building compute environments adapted to these requirements is a genuine research and engineering problem, one that will require infrastructure partners capable of working at the architectural level rather than simply provisioning standardised GPU instances against a known specification. The organisations positioned to do that well are those who have invested in understanding the relationship between model architecture and hardware behaviour across different workload types, rather than treating compute as a fungible commodity input optimised purely for throughput.

AMI's decision to anchor in Paris creates durable, specialised demand for European compute capacity in a workload category where the supply-side infrastructure does not yet exist at scale. The compute required to advance world model research is more novel and more technically demanding than additional LLM inference capacity, which is already well-supplied and increasingly commoditised. It also requires closer collaboration between infrastructure operators and research teams than LLM deployment typically demands, because the architectural requirements are still being defined by the research itself.

## The Sovereignty Dimension

LeCun has stated clearly that AMI will release its models as open source. His reasoning is consistent with positions he has held for years: no private company, including his own, should have unilateral control over technology with this level of societal consequence. Democratic processes should determine appropriate use, not corporate governance decisions made by a small number of people in Palo Alto or Paris.

That position arrives at a pointed moment. The Pentagon's recent designation of Anthropic as a supply-chain risk surfaced, in unusually direct terms, the question of who controls AI development and under what conditions governments can compel or constrain it. LeCun's response is structural rather than political: build openly, distribute broadly, and remove the single point of control rather than negotiate over who legitimately holds it. Whether or not one agrees with that position, it is a coherent response to a real problem.

From a European infrastructure perspective, open-source world models trained on European compute capacity represent a materially different sovereignty position than dependence on closed American APIs whose pricing, availability, and terms of service are determined abroad.

If AMI's architectural programme advances and the models are genuinely open, the relevant question for European organisations shifts from whether access can be revoked to where they choose to run the models and under what conditions. Sovereign European infrastructure has a clear role in that scenario, and a more defensible one than it holds in a world where the models themselves are proprietary.

AMI joins Mistral, Kyutai, and a growing cluster of well-capitalised European AI research organisations that have chosen Paris as their primary anchor. The French government's €109 billion AI investment commitment and the momentum from the AI Action Summit in February have produced something more durable than political signalling. There is genuine research gravity accumulating on the continent, and each new well-funded lab that arrives reinforces it for the next one.

## What to Watch

AMI's initial deployments with Toyota and Samsung will be the first real evidence of whether world models deliver measurable value in production industrial environments. The benchmarks that matter will be domain-specific: predictive maintenance accuracy, simulation fidelity under distribution shift, causal reasoning in conditions the training distribution did not cover.

Standard LLM evaluation frameworks were not designed to surface these properties. AMI will need to build its own evaluation methodology to make progress legible to the broader research community, and that methodology will itself be a meaningful contribution if done rigorously.

The infrastructure build-out required to support world model training and inference at scale is a multi-year undertaking. The data centre capacity going into construction across France and Europe right now will need to be adapted at the hardware and systems level to serve architectural requirements that are still being defined by the research itself.

That adaptation is not a straightforward provisioning exercise. It requires infrastructure operators who can engage directly with research teams, understand requirements as they evolve, and build flexibility into systems before those requirements are fully stabilised.

LeCun has been wrong about timelines before, and the history of AI research contains many architectural bets that were theoretically compelling and practically premature. What is different this time is the capital behind the bet and the seniority of the people making it.

A $3.5 billion valuation at founding, from investors who have spent decades getting technology cycles right, reflects a probability-weighted judgement that the window for world models has genuinely opened. Whether AMI executes well enough to validate that judgement will become visible over the next 24 to 36 months, in production results rather than preprints.

Youssef El Manssouri is CEO and Co-Founder of Sesterce, a European AI infrastructure company.