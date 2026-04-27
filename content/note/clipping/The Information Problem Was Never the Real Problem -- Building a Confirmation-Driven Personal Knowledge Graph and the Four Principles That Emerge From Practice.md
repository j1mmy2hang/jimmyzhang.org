---
created: 2026-03-24
type: "[[Clipping]]"
source: https://zenodo.org/records/19202082
rating: 4
uid: lJXb
---
## Abstract

For over a century, a succession of visionaries described what a personal knowledge system should be. Paul Otlet built fifteen million index cards and dreamed of a worldwide knowledge network in 1895. Vannevar Bush imagined associative trails in 1945. Douglas Engelbart designed augmentation frameworks in 1962. Ted Nelson coined "hypertext" in 1963 and published it in 1965. Gordon Bell recorded everything in 2006. None of them built a daily personal instrument that accumulated across decades. This paper describes what happens when a practitioner does.

ThetaOS is a personal knowledge system built and used by the author since autumn 2025, drawing on personal data reaching back to 1972, with the bulk of structured records from 1993 onward. It consists of 339 relational database tables, over 91,000 records across 26 measured tables, 2.577 million words of structured written content, and an AI advisory layer — referred to here as Tom — that proactively suggests relational links for human confirmation. The system encodes a formal life ontology across 339 entity types, covering persons, locations, organizations, events, books, and knowledge cards.

Building and operating this system under sustained daily practice surfaced four design principles that I have not found written down in the context of personal knowledge systems: (0) a zeroth principle — "everything exists only once" — establishing entity identity as the precondition for all relational intelligence; (1) a structural primacy of data, expressed as a 98/2 design heuristic, in which intelligence is held in the data structure rather than the AI model; (2) confirmation-driven edge creation, a third path between fully manual and fully automatic linking, in which human validation is a constitutive act rather than a check; and (3) a network-topological property by which the graph grows informationally richer per confirmed edge without requiring proportional growth in size.

These observations emerge from a single case. They are offered not as empirically validated findings but as practitioner-derived propositions that may inform the design of personal knowledge graph systems and reopen questions within the PKM literature about where cognitive agency resides in human-AI knowledge work. The paper positions itself within the traditions of extended mind theory, practitioner research, and first-person epistemology.

ontology, personal epistemology, cognitive augmentation, memex, practitioner research, knowledge graph design, entity identity

This paper adopts the genre of first-person practitioner research (Schön, 1983; Stenhouse,

## 1. Introduction

Eighty years of thinkers described what a personal knowledge system should be. This paper describes what happens when you build one.

The history of personal knowledge systems is almost entirely a history of vision. Vannevar Bush wrote "As We May Think" in 1945 and described the Memex — a device that would store and retrieve information along associative trails mirroring the way the human mind works. He never built it. Douglas Engelbart spent the 1960s designing augmentation frameworks and demonstrating the mouse, hypertext, and collaborative editing in what became known as "the mother of all demos" in 1968. His NLS system was real, but it was a shared institutional tool, not a personal daily instrument. Ted Nelson coined "hypertext" in 1963 and spent the following six decades arguing for Xanadu, a universal bidirectional hypertext system. His term "intertwingularity" — the insistence that everything is deeply intertwingled — was coined in 1974 in Computer Lib / Dream Machines. Gordon Bell, in MyLifeBits (Bell & Gemmell, 2009), captured everything — every email, document, conversation, and photograph — and discovered that capture without connection produces inert data rather than usable knowledge.

The Quantified Self movement attempted to instrumentalize the personal, but collapsed under the weight of siloed sensors and tracking fatigue (Swan, 2013). Commercial AI memory systems such as ChatGPT Memory maintain on the order of dozens of facts per user. The personal knowledge management (PKM) literature, from Luhmann's Zettelkasten (1981) to Ahrens' How to Take Smart Notes (2022), centers the act of manual linking as the irreducible cognitive core — the moment where thinking happens.

None of these traditions produced what might reasonably be called a working personal epistemological instrument: a system that encodes a practitioner's formal ontology, accumulates across decades, and participates actively in the formation of new connections.

The system described here is personal in scope but not in implication: the four principles that emerge from building it bear directly on how any knowledge system — personal, organizational, or institutional — should be designed.

This paper is a first-person account of building such a system and operating it under sustained daily practice. It is not system documentation. It is not a comparative evaluation. It is a practitioner's report of what becomes visible when you actually build what the visionaries described — which principles emerge that could not be anticipated from the design position, and which assumptions embedded in the architectural literature do not survive contact with practice.

1975), in which the builder is both designer and subject. This is not a limitation to be apologized for but a methodological choice with precedent: Luhmann (1981) described his own Zettelkasten as a "communication partner" without external validation; Bush (1945) wrote "As We May Think" as a speculative first-person account; Engelbart's (1962) framework emerged from analyzing his own work practices. The observations reported here are necessarily bound to a single case. Their value lies not in generalizability but in what they reveal about the practice of building — insights that are, by definition, inaccessible from the outside.

The paper proceeds as follows. Section 2 positions ThetaOS within the relevant intellectual traditions. Section 3 describes the system as a case study object. Section 4 presents four principles that emerged from building and operating the system, beginning with a foundational zeroth principle. Section 5 reflects on what the historical visionaries could and could not see from their respective positions. Section 6 states the limitations of a single-case account. Section 7 discusses implications for extended mind theory, PKM practice, and the design of personal knowledge graph systems. Section 8 concludes.

## 2. Historical Context: From Vision to Practice

The literature relevant to this paper spans five traditions: the memex lineage, lifelogging, personal knowledge management, extended mind theory, and the emerging academic field of personal knowledge graphs. This section provides the positioning context necessary to situate ThetaOS and the principles described in Section 4. It does not attempt a comprehensive review of any tradition.

### 2.1 The Memex Lineage

The intellectual lineage of personal knowledge systems reaches back further than the digital era — and further than is commonly acknowledged.

Ada Lovelace, writing in 1843 as the translator and annotator of Charles Babbage's Analytical Engine, understood something her contemporaries did not: the machine was not merely a calculator but a general-purpose symbolic engine. Her notes describe a device capable of operating on symbols whose "mutual fundamental relations could be expressed by those of the abstract science of operations" — not numbers specifically, but any objects susceptible to formal manipulation (Lovelace, 1843). This is the earliest formulation of the insight that machines could manipulate symbolic relations rather than merely compute arithmetic — though Lovelace was careful to note that the machine "has no pretensions whatever to originate anything." The tradition that followed largely ignored this dimension and built information systems instead.

Georges-Louis Leclerc de Buffon argued in 1749 that nature should be understood through relationships rather than categories. In his Histoire Naturelle he wrote: "il n'existe réellement

dans la nature que des individus, et que les genres, les ordres et les classes n'existent que dans notre imagination" — in nature only individuals exist, while genera, orders, and classes exist only in our imagination (Buffon, 1749, p. 38). He saw the right principle but lacked the means to operationalize it. Alexander von Humboldt did half a century later what Buffon could not: his Naturgemälde (1807) mapped not species but relationships — climate, altitude, geology, botany, and human culture woven into a single coherent picture, deliberately without disciplinary boxes. He called it the unity of nature. Humboldt's method was network epistemology before the term existed: understanding resides not in isolated facts but in the density of their connections. Both men were right about the principle. Neither had the technology to scale it.

Paul Otlet arrived at the same insight from the direction of information science. In 1895 he cofounded the Institut International de Bibliographie with Henri La Fontaine, beginning what would become the Mundaneum project — a collection that grew to over fifteen million index cards by 1934, organized under a relational Universal Decimal Classification. His principe monographique decomposed documents into atomic units that could be recombined across contexts: cross-referenced knowledge cards that anticipated hypertext, in 1934. In the mid-1930s, he described a "réseau mondial" — a worldwide network — and designed the Mondotheque, a personal workstation connected to it. He described the Universal Book as, in effect, an annex of the brain — an external mechanism so close to the mind that it would function as an attached organ (Otlet, 1934). His work was severely damaged by German soldiers in 1940 — approximately 63 tons of material was destroyed — and largely forgotten until the history of the internet was written without him.

Bush's 1945 Memex proposal is the canonical reference point for personal knowledge

The Mundaneum was not Otlet's work alone. Léonie La Fontaine — sister of Henri La Fontaine, who won the Nobel Peace Prize in 1913 — contributed catalogue entries to the Universal Bibliographic Repertory from 1893, established an information bureau for women from her own home, and in 1909 founded the Office central de documentation féminine — the first systematic feminist documentation department within the Mundaneum. She died in January 1949, weeks before the Belgian elections of June 1949; Belgian women had won the right to vote in parliament in 1948, but she did not live to cast her own ballot. Her name appears in none of the standard histories of the internet's intellectual origins. 1

Karen Spärck Jones provides a second instance of this pattern. Her 1972 paper introducing inverse document frequency — the mathematical foundation of modern search relevance — demonstrated something more profound than an algorithm: that relevance is not a property of a document but a relational property between a document and all other documents. She proved mathematically that meaning is relational, not intrinsic. Without her work, modern search relevance ranking does not exist in its current form. She died in 2007 having spent most of her career on temporary contracts; the New York Times published her belated obituary in 2019 as part of its "Overlooked" series on remarkable people whose deaths went unreported. In a paper that argues the entire tradition was solving the wrong problem, Spärck Jones is the figure who gave the best possible answer to the wrong question — and in doing so, inadvertently demonstrated that the question was wrong.

systems in the English-language literature. Its core insight — that the human mind operates by association, not by index — anticipated decades of subsequent thinking (Bush, 1945). Historical evidence suggests Bush arrived at this independently, with no documented access to Otlet's work. That two thinkers, an ocean apart, converged on the same principle strengthens rather than weakens the case: the idea presents itself inevitably to anyone who thinks it through. When Bush returned to the concept in "Memex Revisited" (1967), he acknowledged that the technology had arrived but the vision had not been operationalized. The Memex remained passive: it would store trails, but it would not suggest them.

Engelbart's augmentation framework (1962) is the closest precursor to what this paper describes. His concept of bootstrapping — using a system to improve the system that improves the system — is structurally isomorphic with the flywheel dynamic described in Section 4.2. His H-LAM/T framework captures the bidirectional shaping relationship between practitioner and instrument. Where Engelbart diverges from ThetaOS is in scale: NLS was designed for teams and institutions, not for the single practitioner's life.

Nelson's contributions — hypertext (coined 1963, published 1965), bidirectional linking, transclusion, and intertwingularity (1974) — are philosophically aligned with the architecture of ThetaOS. His insistence that "everything is deeply intertwingled" is a design axiom, not a metaphor. What Nelson never provided was a working implementation at the scale of a personal daily instrument — a gap that reflected not a failure of vision but the technological and institutional constraints of his era.

More recent commercial systems — Rewind, Limitless, and analogous products subsequently acquired by Meta — operate on brute-force capture of screen and audio content. They inherit

Licklider's vision of man-computer symbiosis (1960) and his later Libraries of the Future (1965) described what he called "procognitive systems" — systems that would not merely store information but participate in the formation of thought. His description of a system that anticipates retrieval needs and proactively presents relevant material is, within the surveyed literature, the closest anticipation of the AI advisory function described in this paper.

### 2.2 Lifelogging: Capture Without Connection

Bell's MyLifeBits project (Bell & Gemmell, 2009) systematically recorded every document, email, photograph, and conversation in its author's life over years. The central finding, implicit but persistent across the project's trajectory, was that retrieval-optimized capture does not yield knowledge. Data captured without structural connection cannot be reasoned over; it can only be searched. Gurrin's work on large-scale personal lifelogging at Dublin City University (12 million $+$ images) arrives at a similar boundary condition: retrieval is tractable, but relational inference is not (Gurrin et al., 2014).

The Quantified Self movement generalized this architecture to physiological and behavioral tracking, producing rich sensor streams across disconnected silos. Swan (2013) documented both the promise and the structural limitation: without integration across silos, sensor data accumulates without producing actionable insight.

the Bell problem at higher resolution: the data is richer, but the relational structure is absent.

### 2.3 Personal Knowledge Management

The PKM literature occupies a complex position relative to this paper. Its most sophisticated practitioners — Luhmann, Ahrens, Milo, Arango — converge on a single principle: the act of linking is the act of thinking. Luhmann's Zettelkasten was, in his own account (1981), a communication partner. The value of the system lay not in storage but in the surprises that emerged when a note was placed in relation to an unexpected neighbor. Luhmann understood that connected knowledge produces emergence: the whole becomes more than the sum of its parts. But his system operated on paper, and primarily on ideas — not on the full relational texture of a life.

Ahrens (2022) operationalizes this for contemporary practice: the slip-box works because writing forces elaboration and linking forces connection. The cognitive work is not separable from the physical act of placing one note next to another.

Milo's Linking Your Thinking (LYT) framework takes an even stronger position: AI should not be permitted to create links, because the human act of linking is constitutively cognitive — removing it degrades the thinking, not just the process. His ARC framework (Add, Relate, Communicate) explicitly identifies "Relate" as the bottleneck, and treats this bottleneck as a feature rather than a problem.

Arango (2018; 2024) approaches the question from information architecture rather than PKM practice, but arrives at a similar conclusion: tools should reduce friction, but not eliminate the human judgment that gives structure its meaning.

Marcia Bates' (1989) berrypicking model provides the empirical foundation for what Bush described intuitively. Her research demonstrated that information seeking does not proceed through single queries but through an evolving process in which each piece of found information reshapes the next search — associative, non-linear, and self-modifying. This is not a failure of search behavior; it is how the mind actually works. Bates proved empirically what Bush described metaphorically, and designed an information architecture model around it. Her work is among the most cited in information science and among the least cited in the PKM literature.

The implicit assumption shared across these positions — that only humans should create links — is one that this paper's findings directly interrogate. Not to refute it, but to complicate it. Section 4.2 proposes that confirmation of a suggested link may itself be a constitutive cognitive act, distinct from both pure manual linking and pure automatic linking.

### 2.4 Extended Mind Theory

Clark and Chalmers' extended mind thesis (1998) argues that cognitive processes are not bounded by skull and skin. Their Parity Principle holds that if an external process would be counted as cognitive if it occurred inside the head, it should be counted as cognitive when it occurs outside. Otto's notebook stores information that Otto retrieves and acts on as reliably as memory; therefore, for Otto, the notebook is part of his cognitive system.

Clark (2008) observes that external media are most cognitively valuable when they are complementary to biological capacities rather than merely duplicative — a point later sharpened by Sutton (2010) as the defining characteristic of "second-wave" extended mind theory. A prosthesis that does what the brain already does well adds little. A prosthesis that compensates for biological limitation while amplifying biological strength creates genuine augmentation.

Miller's (1956) foundational work on working memory capacity — the "magical number seven" — established the biological constraint that complementary prostheses are designed to compensate for. Cowan (2001) refined this estimate to approximately four chunks, with significant individual variation. The practitioner's assessed working memory in the 27th percentile places him at the constrained end of this distribution; the system's function as an external holding structure for relational context is directly responsive to this constraint.

Donald's (1991) framework of External Symbolic Storage as a phase transition in cognitive evolution provides a longer historical arc. ThetaOS can be positioned within this tradition as an instance of what Donald calls "exographic" cognition — thought that cannot occur without the external medium.

Buehler (2025) provides relevant academic evidence on one specific claim: the claim that a knowledge graph can increase in inferential capacity without increasing in node count finds

Hutchins (1995) extends this argument to distributed cognition: in complex sociotechnical systems, the cognitive process is distributed across persons and artifacts. The unit of cognitive analysis is not the individual mind but the system as a whole.

### 2.5 Personal Knowledge Graphs: The Emerging Academic Field

Skjaeveland et al. (2024) provide the most comprehensive current survey of personal knowledge graphs as a field. Their taxonomy distinguishes between personal knowledge graphs built from automatic extraction, those built from manual curation, and hybrid approaches. Within the surveyed literature, no system is described that combines formal personal ontology, AI-generated link suggestions, human confirmation as the mechanism of edge creation, and full lifespan data integration.

PIMO and related academic ontologies for personal data (Sauermann et al., 2005) represent serious attempts at formal personal ontological structure, but they remain small-scale and are not AI-augmented.

Jerry Michalski's TheBrain, with approximately 600,000 nodes accumulated over nearly three decades, is the most sustained personal knowledge graph project known to the author. It lacks a formal ontological schema and operates without AI-driven link suggestion. It is offered here not as a comparison but as a benchmark of sustained personal knowledge graph practice.

independent support in this work on self-organizing knowledge graphs. Buehler's agentic deep graph reasoning framework demonstrates that iterative reasoning over a graph

produces emergent properties — scale-free topology, bridge nodes between previously disconnected clusters, and spontaneous community formation — without requiring additional data ingestion. We cite this work not as architectural precedent (the systems differ substantially: Buehler's framework is fully automated and domain-general; ThetaOS is human-confirmed and personal) but as existence proof for the underlying mechanism: that edge creation within a fixed node set can increase the graph's capacity to support inference.

Network science provides additional grounding for the topological claims in Section 4.3. Watts and Strogatz (1998) demonstrated that small-world networks — characterized by high local clustering and short average path lengths — emerge from relatively sparse random rewiring of regular networks. Barabási and Albert (1999) showed that scale-free network topology, in which a small number of highly connected nodes dominate, emerges naturally from preferential attachment: new edges disproportionately connect to already wellconnected nodes. Both findings are relevant to the confirmation-driven graph: as edge density increases, the network's topological character shifts in ways that amplify the inferential value of each additional edge.

## 3. The System: ThetaOS and Tom

ThetaOS is the practitioner's personal knowledge system. Tom is the AI advisory layer within it. This section describes both as the case study object — not to evaluate them but to make the observations in Section 4 interpretable.

### 3.1 Scale and Structure

The system consists of 339 relational database tables with a formally defined schema. Each table represents an entity class in the practitioner's personal ontology. We use the term life ontology to designate a formal ontological schema designed to represent the full scope of an individual human life — not a single domain (medical, legal, scientific) but the integrated whole: persons, locations, organizations, events, performances, health data, financial transactions, media consumption, family milestones, and knowledge artifacts. Within the surveyed literature, domain-specific ontologies are well established; life ontologies of this scope are not.

The ontology was written down formally in January 2025, though the conceptual architecture had been developing for approximately three years prior. Active development of ThetaOS as a system began in autumn 2025.

Across 26 of the 339 tables where records have been systematically entered, the system holds over 91,000 records. Total written content integrated into the system across all categories amounts to 2.577 million words. The database occupies 368 MB of structured data.

The system contains records spanning approximately $\mathbf { \sigma } _ { \mathbf { 0 } , \mathbf { 0 } \mathbf { 0 } \mathbf { 0 } }$ unique calendar days, with the earliest records reaching back to 1972 and the bulk of structured content from 1993 onward. A "day with data" is operationally defined as any calendar date for which at least one

timestamped record exists across any of the system's 26 date-indexed tables. This is a conservative count: it requires only a single record. Coverage is not uniform — location visit records account for the majority of those days (derived from an 80,000-photograph extraction with GPS and timestamp metadata), while other sources provide sparser coverage (e.g., financial transactions: 2,829 days; sleep data: 2,543 days; train journeys: 596 days). The figure represents temporal reach, not temporal density.

Table 1: Core entity counts   

<table><tr><td>Entity class</td><td>Records</td></tr><tr><td>Persons</td><td>18,446</td></tr><tr><td>Locations</td><td>13,356</td></tr><tr><td>Organizations</td><td>9,590</td></tr><tr><td>Performances (professional presentations, keynotes, and lectures)</td><td>2,060</td></tr><tr><td>Books</td><td>1,252</td></tr><tr><td>Knowledge cards</td><td>509</td></tr></table>

The schema's depth varies by entity class. The speaking engagements table, for instance, captures 83 attributes per record — including date, title, location, organization, audience size, room layout, narrative arc, co-speakers, financial data, and post-event evaluation — making each of the 2,060 entries a structured case study in professional practice rather than a simple log entry.

Table 2: Content distribution   

<table><tr><td>Content type</td><td>Words</td></tr><tr><td>Publications</td><td>1,807,412</td></tr><tr><td>Weekly reports</td><td>489,730</td></tr><tr><td>Knowledge cards</td><td>164,697</td></tr><tr><td>Total</td><td>2,577,000 (pprox.)</td></tr></table>

The system was publicly demonstrated at the PKM Summit 2026 (Utrecht, Netherlands), a conference whose program included researchers and practitioners whose work directly informs this on architect Jorge Aran informs this paper's theoretical context — among them information architect Jorge Arango, whose work on semantic environments and personal knowledge architecture (Arango, 2018; 2024) addresses the structural challenges this system attempts to solve, and journalist Clive

Thompson. The demonstration is mentioned here not as endorsement but as context: the questions posed by this audience — practitioners who study knowledge systems professionally — shaped the observations reported in Section 5.

### 3.2 Data Acquisition and API Enrichment

A common misconception about a system of this scale is that it required years of manual data entry. The opposite is true. The majority of the data was already held by existing platforms and could be retrieved through standard export mechanisms.

Personal photographs (80,000 images with GPS coordinates, timestamps, and identified faces) were extracted from Apple Photos. Financial transactions were exported as CSV from banking applications. Calendar entries, address book contacts, and email metadata were exported from their respective platforms. Social network data — including LinkedIn connections and Facebook posts — was retrieved using GDPR data export rights that European users can exercise with any platform holding their data.

Table 3: Primary data sources and acquisition effort   

<table><tr><td>Data source</td><td>Acquisition method</td><td>Effort</td></tr><tr><td>80,000 photographs with GPS/timestamp</td><td>Apple Photos export + extraction script</td><td>One script run</td></tr><tr><td>Bank transactions</td><td>CSV export from banking app</td><td>Minutes</td></tr><tr><td>Calendar entries</td><td>Google/Apple Calendar export</td><td>Minutes</td></tr><tr><td>Contacts / address book</td><td>Phone export</td><td>Minutes</td></tr><tr><td>LinkedIn connections</td><td>GDPR data export</td><td>One download</td></tr><tr><td>Facebook data</td><td>GDPR data export</td><td>One download</td></tr><tr><td>Email metadata</td><td>Headers/metadata export</td><td>Script</td></tr><tr><td>2,200 nights of sleep data</td><td>Apple Health export</td><td>Minutes</td></tr><tr><td>Lunar phase per night</td><td>Lunar phase API, applied</td><td>Seconds</td></tr><tr><td>Historical weather (temperature, precipitation)</td><td>retroactively Weather API + location per night</td><td>2 minutes</td></tr><tr><td>Netflix viewing history</td><td>Netflix data export</td><td>One download</td></tr></table>

The critical architectural observation is that these exports, in isolation, are inert. A photograph is pixels with metadata. A bank transaction is a row with an amount and a date. A LinkedIn connection is a name. They become knowledge only when they are resolved to entities in the ontology — when the face in the photograph is identified as the same person as the LinkedIn connection, who is the same person as the meeting attendee in the calendar. The zeroth principle (Section 4.0) is what transforms platform exports into a connected knowledge graph.

A second dimension is API enrichment: the practice of programmatically adding contextual data to existing records using freely available external APIs. When 2,200 nights of validated sleep sensor data were imported, each night was already associated with a location from the system's location records. Two API calls — one to a lunar phase service, one to a historical weather API — enriched all 2,200 records with moon phase, temperature, and precipitation data for the specific GPS coordinates on each specific date. This enrichment took approximately two minutes of wall-clock time. The cross-domain patterns described in Section 4.2 became visible not through years of manual tracking but through seconds of automated enrichment applied to structured data that already existed.

The implication for transferability is significant. A practitioner starting today, with access to their own phone photographs, bank statements, calendar, contacts, LinkedIn export, Facebook export, and a wearable health device, could establish a foundation of tens of thousands of entity-resolved records within days rather than years. The zeroth principle — resolving references to canonical entities — is where the human effort concentrates. The data acquisition itself is largely automated.

A third enrichment pattern involves unstructured verbal input. When the practitioner mentioned attending a specific concert in a specific year, the system resolved the statement to a verified date, venue, city, and complete setlist retrieved from a public music API — transforming six words of episodic memory into a fully resolved entity with edges to the artist, the venue, the city, the date, and the persons who attended. This pattern — natural language recollection as input, entity-resolved and API-enriched record as output — reduces the cost of contributing a memory to the system to approximately the effort of saying it aloud.

### 3.3 The AI Layer: Tom

Tom is not a separate AI product. It is the practitioner's configured AI advisory layer — an2 instance of a large language model given persistent context from ThetaOS at each interaction. Tom functions in three roles: advisor, biographer, and archivist.

The proactive linking function is Tom's most structurally significant behavior. When new data is entered into the system, Tom suggests wikilinks — relational connections to existing entities in the knowledge graph. The practitioner confirms or rejects each suggestion. This takes on the order of one to two seconds per decision — consistent with the response-time range documented for System 1 recognitional judgments (Kahneman, 2011). Confirmed links become edges in the graph. Rejected suggestions are discarded.

Before the three principles described below can operate, a prior condition must be met that is

Tom does not create edges autonomously. This is a deliberate design constraint, not a technical limitation. Its rationale is discussed in Section 4.2.

At query time, Tom receives a context window assembled from ThetaOS: in a representative query session, this amounted to approximately 33,000 words of relevant records, written content, and schema context. Against this context, it produced a response of approximately 500 words. The ratio — roughly 66:1 context-to-output — illustrates the design asymmetry explored in Section 4.1.

### 3.4 Cognitive Profile of the Practitioner

The practitioner's cognitive profile was assessed using BrainsFirst, a gamified neurocognitive assessment measuring processing speed and working memory capacity — constructs with robust independent validation in the cognitive science literature (Baddeley, 2003; Deary et al., 2010). Scores indicated processing speed in the 99th percentile and working memory in the 27th percentile. These scores are reported here as indicative design parameters, not as clinical measurements. They were not known at the time the system's architecture was designed; they are reported here as retrospective context that helps explain why the design proved effective for this practitioner.

This profile is directly relevant to the system's design logic. A practitioner with high processing speed and constrained working memory benefits disproportionately from a system that holds relational context externally — removing the working memory constraint that would otherwise limit the range of connections available for rapid cognitive traversal. Within the scope of this case, the system functions as what Clark (2008) would call a complementary prosthesis: not duplicating a strong capacity, but compensating for a weak one while the strong capacity operates across a much larger connected field.

## 4. Four Principles That Emerge From Building

This section presents four principles that became apparent only through sustained practice. They are offered as practitioner-derived propositions: grounded in a single case, but formulated at a level of abstraction that may apply to a class of systems.

The four principles have a specific logical structure. The zeroth principle is foundational — it names the precondition on which the other three depend. This ordering follows the convention in thermodynamics, where the zeroth law was discovered after the first three but names the condition on which they all rest.

### 4.0 The Zeroth Principle: Everything Exists Only Once

so fundamental it was not initially recognized as a separate principle. We term it the zeroth principle, following the convention in thermodynamics where the zeroth law — discovered after the first three — names the precondition on which the other laws depend.

The zeroth principle is: everything exists only once. Each entity in the practitioner's world — every person, location, organization, event, book, concept — has exactly one canonical representation in the knowledge graph. All references to that entity, regardless of their source system, resolve to that single node.

This is not a deduplication heuristic. It is an ontological commitment with structural consequences. When a person named "Jan Janssen" appears in a phone contact, an email thread, a calendar entry, a photograph, and an invoice, these are not five data points — they are five edges converging on a single entity. The moment the system establishes that these references share an identity, every existing edge attached to that entity becomes available to every new reference. One identification — this face in this photograph is this person in this database — can activate dozens of cross-connections without additional effort, because the entity's relational constellation already exists.

Entity identity is established not through names but through relational constellations. A person named "Jan Janssen" is not uniquely identified by name alone — there may be thousands. But "Jan Janssen" connected to a specific organization, encountered at a specific location, on a specific date, is effectively unique. This is consistent with standard ontological practice: in formal ontologies from civil registries to biomedical knowledge graphs, entity identity is a function of relational context, not of any single attribute. The edges are the identity.

The zeroth principle explains why the "Second Brain" tradition — from Bush's Memex through Forte's CODE/PARA — has consistently underdelivered on its promise. These systems operate on notes, documents, files, or captures: units that lack stable identity. A note titled "Meeting with Jan, March 14" contains a reference to Jan but does not establish Jan as an entity. It cannot connect to other references to the same person in other notes, because the system has no concept of "the same person." The note is a node without the capacity to generate edges.

A formal ontology with 339 entity types solves this by definition. Each table is not a storage container — it is a declaration of what something is. A person is a person. A location is a location. The moment the system knows what something is, it can recognize when two things are the same. And the moment it can recognize identity, connections follow automatically.

The practical consequence is dramatic. When the practitioner imported 80,000 photographs with GPS coordinates and timestamps, the photographs were initially inert data — pixels with metadata. When facial recognition and manual identification linked faces to person entities already in the database, each photograph became a nexus of connections: to the identified person, to their organization, to the location derived from GPS, to other events on the same date. One act of identification — "this face is this person" — activated numerous pre-existing edges per photograph, connecting to the identified person's organization, prior locations, coattendees, and related events. The data did not change. The identities did.

This is why the zeroth principle is foundational. The 98/2 design principle (Section 4.1)

depends on structured relational data — but relational data requires entities with stable identity. Confirmation-driven edge creation (Section 4.2) depends on the AI suggesting connections between entities — but suggestion requires entities to exist as discrete, identifiable nodes. The network's capacity to grow smarter without growing larger (Section 4.3) depends on edge density — but edges can only form between nodes that have identity.

Without the zeroth principle, the other three cannot operate. It is the precondition that was always present in the system's architecture but was not recognized as a separate principle until the other three had been articulated.

### 4.1 The 98/2 Design Principle: Structural Primacy of Data

"Intelligence resides in the data structure, not in the model."

The dominant architecture of current AI-augmented knowledge systems places the AI model at the center. The model is the intelligent component; data is the substrate it operates on. Retrieval-Augmented Generation (RAG) systems, in their standard form, feed document chunks to a model and rely on the model's generative capability to produce useful outputs.

ThetaOS inverts this through what this paper terms the structural primacy of data. This principle is not an empirical measurement but a design heuristic, demonstrable through a substitution test: if the AI layer is replaced by a different model — switching from one large language model to another — the system continues to function with the same knowledge base. If the structured data is removed, no AI model can reconstruct the answers. The intelligence resides in the 339-table ontology and 2.6 million words of structured life data, not in the language model that queries it.

The shorthand "98/2" expresses this asymmetry as a design commitment, not a measured ratio. The model is replaceable; the structure is not.

<table><tr><td>Component</td><td>Approximate share of query context</td></tr><tr><td>Life data (structured records)</td><td>~53%</td></tr><tr><td>Written content</td><td>~32%</td></tr><tr><td>Structural schema</td><td>~15%</td></tr><tr><td>AI model contribution</td><td>~2%</td></tr></table>

The $9 8 / 2$ principle also suggests a critique of naive RAG architectures for personal knowledge work. A RAG system that retrieves document chunks without a formal relational ontology is, from this perspective, operating on the $32 \%$ (written content) while lacking the $53 \%$

(structured life data) and the $15 \%$ (schema) that give the content its interpretive frame.

### 4.2 Confirmation-Driven Edge Creation: A Third Path

"Nodes are data. Edges are intelligence. Confirmation is fuel."

The PKM literature presents two models for link creation: manual linking, in which the human creates all connections (Luhmann, Ahrens, Milo), and automatic linking, in which the system creates connections algorithmically. The manual model preserves human cognitive agency but does not scale. The automatic model scales but lacks the human judgment that gives links their epistemic significance within a personal system.

ThetaOS operates on a third model: confirmation-driven edge creation.

The mechanism: the AI layer suggests a relational link between two entities; the practitioner confirms or rejects it; confirmed suggestions become edges; rejected suggestions are discarded. The practitioner's role is not fact-checking against an external ground truth. It is an act of recognition: does this connection have meaning within my personal ontology?

The claim that confirming an AI-suggested link constitutes cognitive work — rather than passive acceptance — requires defense. We offer three lines of argument.

First, the phenomenological argument. The act of confirmation requires the user to mentally activate the context of all connected entities, evaluate whether the relationship holds, and commit to its validity. This is recognitional judgment — what Dreyfus (2002), building on Merleau-Ponty, calls "skilled coping": an expert's ability to immediately perceive relevance in a situation without deliberative reasoning. The cognitive work is compressed, not absent. Kahneman's (2011) distinction between System 1 and System 2 thinking is relevant here: confirmation operates in System 1 — fast, pattern-based, expert recognition — rather than the slow deliberative reasoning of System 2. This does not make it cognitively empty; it makes it cognitively efficient. Suchman's (1987) empirical work on situated action provides a further grounding: her observations of people operating complex devices demonstrated that cognition is not planful but responsive — people perceive, recognize, and act, rather than deliberate and execute. Confirmation-driven linking is precisely this pattern: perception of a proposed connection, recognition of its validity, commitment to its existence.

Second, the distributed cognition argument. Hutchins (1995) demonstrated that in distributed cognitive systems, the cognitive load is shared between human and artifact. In confirmation-driven linking, the system performs the search and the human performs the judgment. The division of labor does not eliminate the human cognitive contribution — it isolates it to its highest-value component: evaluative judgment rather than retrieval. Kasparov's (2010) analysis of freestyle chess provides an instructive parallel: amateur players combined with computers and good process outperformed both grandmasters and supercomputers operating alone. The process — the structured division of labor between human judgment and machine search — is the decisive variable. Confirmation-driven edge creation is precisely such a process: it assigns search to the machine and judgment to the human.

Third, the speech act argument. In speech act theory (Austin, 1962; Searle, 1969), a confirmation is a performative act — it brings a state of affairs into being rather than merely describing one. In a personal ontology where the user is the sole authority, confirming a link constitutes a relationship that did not formally exist before. This is analogous to what Brandom (1994) calls "undertaking a commitment": the user takes responsibility for the link's validity within their knowledge system.

The objection from Ahrens (2022) and the Zettelkasten tradition — that the act of linking IS the thinking, and outsourcing it eliminates the cognitive benefit — conflates two distinct operations: the search for potential connections (which is effortful but not inherently valuable) and the evaluative judgment about whether a connection holds (which is the actual cognitive work). Confirmation-driven linking preserves the latter while automating the former.

A concrete instance illustrates the flywheel dynamic. The system's integration of Apple Watch sleep measurements — a validated wearable sensor — with structured life event data revealed patterns that neither data stream could have produced alone: correlations between temperature variation, specific performance events, and sleep architecture across years of continuous measurement. This pattern was not hypothesized in advance and could not have3 been retrieved by querying either dataset in isolation. It became visible only because confirmed edges between the performance entity class, the environmental data class, and the physiological measurement class created traversal paths that activated latent crossconnections. The system did not grow larger to produce this insight; it grew more connected.

A second illustration operates at a different scale. By importing 80,000 photographs, each carrying timestamp, GPS coordinates, and identified faces, a single import operation connected persons, locations, and dates at a scale that would have taken years of manual entry — illustrating how confirmation at the schema level, rather than the record level, produces relational density without proportional effort. This only works because ThetaOS uses machine-readable structured data throughout: the moment information is stored in documents — PDFs, unstructured files — the system can no longer see the relational structure, only the surface.

More confirmed edges provide denser context for future AI suggestions. Denser context produces more accurate suggestions. More accurate suggestions produce higher confirmation rates. Higher confirmation rates further densify the graph. The system becomes progressively more useful per unit of practitioner attention, without requiring more practitioner effort per unit of data entered.

### 4.3 The Network Grows Smarter Without Growing Larger

The third principle is topological. Neuroscience offers an instructive analogy: the human brain contains approximately 86 billion neurons (Azevedo et al., 2009) connected by an estimated 100 trillion synapses. Intelligence does not reside in the cells — it resides in the connections between them. The denser the connectivity, the richer the pattern recognition.

1 C ThetaOS operates on the same logic at the scale of a personal knowledge graph: each confirmed edge increases the informational density of every node it touches.

Each confirmed edge changes the information-theoretic character of the graph by creating a new path between previously distant nodes. A new connection between Person A and Concept X does not merely add one edge; it potentially activates every existing path through A and every existing path through X, creating new traversal routes that did not previously exist. The graph becomes richer in what it can return to a query, not because it grew, but because its topology changed.

An analogy with Hebbian learning is useful here, with an important qualification. The analogy is topological, not computational: links in ThetaOS are binary, not weighted. What the analogy captures is the emergent richness of a densely connected network relative to a sparse one.

The network science literature provides structural grounding for this principle. Watts and Strogatz (1998) demonstrated that small-world properties — high local clustering, short average path lengths — emerge from relatively modest increases in random edge density. Barabási and Albert (1999) showed that preferential attachment produces scale-free topology, in which well-connected nodes attract further connections, amplifying the inferential value of each new edge. Burt's (2004) research on structural holes adds a complementary insight: the highest-value connections in any network are those that bridge previously disconnected clusters, because they enable the import and export of knowledge across domain boundaries. Confirmation-driven edge creation is, from this perspective, a mechanism for systematically closing structural holes: the AI identifies potential bridges across the practitioner's knowledge graph, and the human confirms those that hold.

This topological framing also clarifies the distinction between scale and intelligence in knowledge systems. The Jevons paradox (Jevons, 1865) — when something gets cheaper, we do more of it — predicts that cheaper AI will produce more captures, more documents, more notes. But connected knowledge does not scale linearly: when connections increase, every element becomes more valuable. This is emergence in Luhmann's sense — the whole becomes more than the sum of its parts — not merely more of the same. The network grows smarter without growing larger because intelligence in a relational system is a topological property, not a volumetric one.

Three properties of this dynamic, within this case:

1. The network grows in inferential richness without growing in size. The system can answer more complex compositional queries after edge addition even if no new entities were added.

2. The network becomes more precise as it grows larger. As edge density increases, entities are progressively more precisely characterized by their relational neighborhood. The system does not just know that Person A exists; it knows their connections to locations, organizations, events, books, and concepts.

3. The network does not forget and does not degrade. Confirmed edges in a relational database do not decay through disuse. This distinguishes the external medium from biological memory in the Clark-Chalmers framework.

### 4.4 What Building Costs

The three principles above describe what the system produces. Honest practitioner reporting requires naming what it costs.

Building and maintaining a system of this scale carries costs that should not be understated. The practitioner estimates sustained daily investment over months of active development. More significantly, the system creates a dependency that is itself a design feature: the practitioner who has externalized relational memory into a formal graph cannot return to operating without it. This is not a pathological dependency — it is the mechanism by which cognitive augmentation works — but it should be named.

A second cost is cognitive: the practitioner's attention is increasingly structured by what the system makes visible. The graph shapes what questions get asked, which connections get noticed, and which domains receive the most relational investment. This is cognitive niche construction (Clark, 2005; Odling-Smee et al., 2003) in its most direct form — the instrument shapes the practitioner as the practitioner shapes the instrument.

A third cost is transferability: the system is deeply calibrated to one cognitive profile, one professional history, and one ontological architecture. The design principles may transfer; the system itself does not.

## 5. What the Visionaries Could Not See

The four principles described in Section 4 share a common epistemological structure: they are only visible from inside the practice. This is not accidental. Design operates on abstractions; building operates on constraints. The visionaries worked from the outside — from the position of architects imagining use. What they could not see is what only becomes legible when abstraction meets resistance: when a theoretical principle encounters the friction of actual data, actual cognitive load, and actual daily use over years. The gap between their visions and these observations is not a failure of imagination. It is the irreducible difference between designing a system and living inside one.

Most fundamentally, the entire tradition — from Humboldt through Bush through Bell to Forte — assumed that the unit of personal knowledge is the document, the note, or the capture. None of them made the ontological move that the zeroth principle requires: declaring that the unit of personal knowledge is the entity — a typed, identified, relationally embedded node that persists across all contexts in which it appears. Humboldt had observations. Bush had documents. Engelbart had files. Nelson had pages. Bell had captures. Forte has notes. Milo has MOCs. Luhmann had cards. ThetaOS has entities. That shift — from document to entity — is what makes edge-based intelligence possible.

Humboldt saw the right principle — understanding resides in connections, not in isolated facts — but had no mechanism for scaling it beyond what one person could observe in a lifetime. His Naturgemälde was a magnificent static map of relationships. What he could not build was a system that continued to discover relationships after he stopped looking.

Bush's Memex was passive. It would store trails but would not suggest them. This is a consequence of his technological moment, not a failure of imagination.

Engelbart came closest to anticipating the bootstrapping flywheel. But his framework positioned the machine as a tool the human operates, not as a participant that suggests — which was the appropriate design choice for the institutional tools he was building.

Nelson understood intertwingularity as a theoretical principle but never built a system that produced it at personal scale. The system that generates those connections requires a mechanism for surfacing them — which Xanadu's architecture never resolved, in part because the problem of proactive suggestion across a personal ontology was not yet technically tractable.

The PKM tradition — Luhmann, Ahrens, Milo — correctly identifies linking as the cognitive core of personal knowledge work. Where the tradition's assumption may require revision is in its insistence that only human-initiated links are cognitively valid. Confirmation-driven edge creation suggests that the cognitive act of recognition is not cognitively empty, even when the proposal comes from a machine.

Bell and the lifelogging tradition correctly diagnosed the problem of scale. They incorrectly assumed that capture was the solution. The experience of building ThetaOS suggests that structure is the solution: not recording more, but encoding more precisely. Bell's MyLifeBits was rich in captures and poor in entities; it could retrieve photographs but could not reason across them.

Clark and Chalmers described Otto's notebook as an extended mind component — a passive medium that stores information for retrieval. ThetaOS extends this beyond storage into participation. Tom does not merely hold information that the practitioner retrieves; it actively suggests connections that the practitioner evaluates. This is not extended memory but extended cognition: a system that participates in the formation of new knowledge rather than merely holding old knowledge in reserve.

## 6. Limitations

The limitations of a single-case practitioner account are substantial and specific.

Single-case practitioner account. Within the tradition of reflective practice (Schön, 1983) and autotheory (Fournier, 2021), the absence of a control group is not a methodological gap but a consequence of the research genre: the object of study is the building practice itself,

which cannot be separated from the builder. Transferability of the design principles — rather than replicability of the system — is the appropriate criterion for evaluating this work.

The builder-user identity problem. The practitioner who built ThetaOS is also the practitioner who uses it and the researcher who reports on it. There is no independent

evaluation of the system's effects, no external validation of the cognitive benefits described, and no baseline comparison.

Self-reported cognitive benefits. The claim that the system functions as a complementary prosthesis is based on the practitioner's phenomenological experience, not on measured cognitive performance. No pre-post assessment was conducted. No control condition exists.

Cognitive profile dependency. The design logic of ThetaOS is explicitly calibrated to one practitioner's cognitive profile. The transferability of the design principles to practitioners with different profiles is plausible but undemonstrated.

The ${ \bf 9 8 } / 2$ ratio is a design heuristic, not a measurement. The distribution is an architectural intention expressed as a substitution test, not an empirical measurement of cognitive contribution.

No formal ontological evaluation. The 339-table ontology has not been evaluated for completeness, consistency, or coverage relative to any formal standard.

## 7. Discussion

### 7.1 From Passive to Participatory Prosthesis

Clark and Chalmers' extended mind framework has been productively applied to personal knowledge tools since its introduction in 1998. The primary cases in the literature — Otto's notebook, the GPS navigator, the smartphone — are passive prostheses: they store or retrieve information on human request.

ThetaOS does not fit cleanly into the passive prosthesis category. Tom's proactive suggestion of relational links introduces a form of tool-initiated cognitive activity. This paper proposes the term participatory prosthesis to designate this category: an external cognitive tool that takes initiative in the formation of new connections, while preserving human authority over which connections become part of the knowledge structure.

A system qualifies as a participatory prosthesis when it meets all four of the following criteria:

1. Domain model. Typed entities and typed relationships, not merely stored content.   
2. Proactive suggestion. Unsolicited proposals based on pattern recognition across the domain model, not retrieval on request.   
3. Human-in-the-loop constitution. User confirmation alters the system's knowledge state; passive display of suggestions does not qualify.

4. Bidirectional adaptation. The system adapts to the user AND the user adapts to the system; unidirectional tool use does not qualify.

Table 4: Contemporary systems assessed against participatory prosthesis criteria   

<table><tr><td>System</td><td>Domain model</td><td>Proactive</td><td>Constitutive confirmation</td><td>Bidirectional</td></tr><tr><td>Google Search</td><td>No</td><td>No</td><td>No</td><td>No</td></tr><tr><td>Google Suggest / Autocomplete</td><td>No</td><td>Yes</td><td>No</td><td>Partial</td></tr><tr><td>Obsidian with backlinks</td><td>Partial</td><td>No</td><td>No</td><td>No</td></tr><tr><td>Recommendation algorithms (Netflix, Spotify)</td><td>Partial</td><td>Yes</td><td>No</td><td>Partial</td></tr><tr><td>ChatGPT with memory</td><td>No</td><td>Partial</td><td>No</td><td>Partial</td></tr><tr><td>Mem.ai (Heads Up feature)</td><td>Partial</td><td>Yes</td><td>No</td><td>Partial</td></tr><tr><td>ThetaOS / Tom</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr></table>

$\wedge _ { \mathbf { { a } } }$ Obsidian backlinks are treated here as navigational rather than ontological: they connect documents but do not assert a typed relationship between identified entities. The confirmation criterion requires that a user action alters the system's knowledge state in a semantically meaningful way — a standard that document-level linking does not meet.

Table 5: Historical systems assessed against participatory prosthesis criteria   

<table><tr><td>System</td><td>Domain model</td><td>Proactive</td><td>Constitutive confirmation</td><td>Bidirectional</td></tr><tr><td>Bush Memex (1945)</td><td>Partial</td><td>No</td><td>No</td><td>No</td></tr><tr><td>Engelbart NLS (1968)</td><td>Partial</td><td>No</td><td>No</td><td>Partial</td></tr><tr><td>Luhmann Zettelkasten</td><td>No</td><td>No</td><td>Yes</td><td>Partial</td></tr><tr><td>Bell MyLifeBits</td><td>No</td><td>No</td><td>No</td><td>No</td></tr><tr><td>Nelson Xanadu (proposed)</td><td>Partial</td><td>No</td><td>No</td><td>No</td></tr></table>

The two tables together map the full landscape. Most systems, historical and contemporary, satisfy one or two criteria but not all four. The conjunction is what defines the category.

### 7.2 Cognitive Niche Construction

Clark's (2005) application of niche construction theory to cognitive artifacts is directly relevant here. The practitioner designed the system to compensate for a specific cognitive constraint (working memory) and amplify a specific cognitive capacity (processing speed). The system, once built, changes the cognitive ecology in which the practitioner operates — creating the dependency named in Section 4.4 as both the cost and the mechanism of augmentation.

### 7.3 Implications for PKM Practice

The most directly actionable implication of this paper for PKM practitioners and tool designers concerns the linking question. The current consensus — most strongly expressed by Milo, implicitly shared by Ahrens and most Zettelkasten practitioners — is that links should be created by humans, because the act of linking is cognitively constitutive. This paper argues that the consensus may be incomplete: confirmation-driven edge creation introduces a cognitive act — recognition — that is not adequately captured by either the "human creates links" or "machine creates links" framings.

The "Second Brain" movement, most prominently represented by Forte's CODE/PARA framework (2022), has popularized personal knowledge management but inadvertently perpetuated a node-centric architecture. CODE's four steps — Capture, Organize, Distill, Express — contain no linking step. PARA's folder hierarchy places each note in exactly one location. The result is a filing system, not a knowledge network. From a network-theoretic perspective, a graph of disconnected nodes supports retrieval but not inference — which may help explain the widely reported difficulty of sustaining engagement with such systems. The zeroth principle suggests that the deeper issue is not the absence of a linking step but the absence of entity identity: you cannot connect what you cannot identify as the same thing across contexts.

The barrier to building a personal knowledge graph is widely perceived as data entry. The practitioner experience reported here suggests the actual barrier is ontological commitment — the decision to treat persons, locations, and organizations as first-class entities — not data acquisition. Most of the data already exists in platform silos; GDPR export rights make it retrievable; APIs make it enrichable. What no platform provides is the identity layer: the recognition that the contact in your phone, the face in your photograph, and the attendee in your calendar are the same person. That recognition — the zeroth principle in action — is where human judgment is irreplaceable. Everything else can be automated.

### 7.4 A Federation Horizon

The zeroth principle — everything exists only once — has an implication that extends beyond the single practitioner. If each individual's knowledge graph assigns canonical identity to every person, location, and organization it contains, then two graphs that independently identify the same entity share a potential connection point. Not shared data. Not a shared platform. A shared node.

This implies a federation architecture that does not yet exist but is architecturally consequent. In such a system, practitioners maintain sovereign control over their private life data while contributing to a shared identity layer — a distributed registry of canonical entities that allows cross-graph reasoning without cross-graph data exposure. When Practitioner A and Practitioner B both have a canonical node for the same person, and both have confirmed edges from that person to other entities in their respective graphs, a federated query could traverse both graphs through the shared node without either practitioner's private data leaving their system.

Existing federated architectures approach but do not reach this. The Solid project (Mansour et al., 2016) establishes personal data sovereignty and identity federation, but lacks typed ontological relationships — it knows who someone is, not what the relationship means. ActivityPub and the Mastodon network federate identity and content, but again without formal ontology. The missing layer in both cases is precisely what the zeroth principle provides: not just shared identity, but shared entity types with typed, confirmed edges. A federation of life ontologies would know not only that two practitioners share a contact, but what kind of relationship each has with that contact, without either relationship being visible to the other.

The collective intelligence that emerges from such a federation would be qualitatively different from anything a centralized platform can produce. Platform intelligence is derived from behavioral data — clicks, views, purchases. Federated ontological intelligence would be derived from meaning — from the typed, human-confirmed connections between identified entities across thousands of personal knowledge graphs. Burt's structural holes (2004) suggest where the value concentrates: in the bridge nodes that connect previously disconnected clusters across individual graphs. Those bridges are invisible to any single practitioner. They become visible only at federation scale.

This is not a prediction, nor a research claim advanced in this paper. It is an architectural consequence of the zeroth principle that becomes visible once entity identity is taken seriously — offered here as a design horizon, not a demonstrated result.

### 7.5 The Structure-First Argument

The 98/2 principle has implications beyond personal knowledge management. The dominant paradigm in enterprise AI deployment is model-first: adopt the most capable model, feed it available data, and optimize for output quality. The structure-first argument inverts this: invest in the relational structure of the data first, and treat the model as a replaceable processing layer. The practical test — which component is unrecoverable if lost? — provides a useful heuristic for evaluating any knowledge system's design philosophy.

## 8. Conclusion

For eighty years, the search for a personal knowledge system was framed as an information problem: how to capture, store, organize, and retrieve. Each generation of visionaries improved the answer — from Otlet's index cards to Bush's microfilm trails to Bell's total capture to today's AI-augmented retrieval. The information problem has been progressively solved.

But the information problem was never the real problem.

The real problem is meaning. And meaning does not reside in information — it resides in the connections between information. A fact in isolation is inert. The same fact connected to a person, a place, a date, and a context is knowledge. Connected further to a pattern, a memory, and a decision — it becomes understanding.

Every implementation in the history of personal knowledge systems degraded the link from a carrier of meaning to an instrument of navigation. Bush understood that the mind works by association, but his trails were static. Luhmann understood that connections are the cognitive core, but his cross-references were blind to each other. Berners-Lee built a link system that became the World Wide Web — but the hyperlink says "go here," not "this relates to that in this way." The Semantic Web project attempted to restore typed, meaningful links (Berners-Lee et al., 2001), but never reached mainstream adoption.

The system described in this paper is, at its core, an attempt to build the link that was never properly built — a typed, confirmed, ontologically grounded connection between identified entities, where the act of confirmation is itself a meaning-making act. The four principles reported in Section 4 are consequences of taking this seriously: if meaning lives in connections, then entity identity is the precondition (zeroth principle), data structure matters more than model capability (first principle), human confirmation of connections is cognitive work (second principle), and a denser connection network is a smarter network (third principle).

Eighty years of thinkers described what a personal knowledge system should be. Building one revealed four principles they could not see from the outside.

The zeroth: everything exists only once. Entity identity — the ontological commitment that each person, location, organization, and event has exactly one canonical node — is the precondition for all relational intelligence. Without it, there are no edges. Without edges, the other three principles cannot operate.

The first: intelligence resides in the data structure, not in the AI model. The structural primacy of data, expressed through the substitution test, names a practical asymmetry — the model is replaceable, the structure is not — that inverts the dominant model-first architecture of current AI deployment.

The second: confirmation-driven edge creation is a third path between manual and automatic linking. The cognitive work of recognition — evaluating whether a proposed connection holds within a personal ontology — is not cognitively empty. It preserves human judgment while automating the search that precedes it. Kasparov's centaur — the combination of

human judgment, machine search, and structured process — is not a metaphor for this system. It is a structural description of how it works.

The third: a network can grow smarter without growing larger. Each confirmed edge changes the topological character of the graph, activating latent cross-connections between existing nodes. Intelligence in a relational system is a topological property, not a volumetric one.

And a final observation that is not a principle but should be named: building costs. The practitioner who externalizes relational memory into a formal graph creates a dependency that is the mechanism of augmentation — and should name it honestly.

Humboldt saw the principle in 1807. Bush had documents. Engelbart had files. Nelson had pages. Bell had captures. ThetaOS has entities. That shift — from document to entity — is what makes edge-based intelligence possible. The visionaries were right about almost everything. What they could not see is what only becomes visible from the inside.

## Data Availability Statement

The underlying database is a personal knowledge system containing private life data and is not publicly available. The database schema (339 table definitions) and the design principles described in this paper are available from the author on reasonable request. The schema is separable from the data: it represents the ontological architecture, not the personal content.

## Acknowledgments

The author thanks the practitioners, researchers, and tool designers whose published work provided the intellectual context for this paper. ThetaOS was built with the assistance of AI coding tools; the conceptual architecture is the practitioner's own.

## About the Author

Martijn Aslander (b. 1972) is a Dutch practitioner at the intersection of information architecture, personal knowledge management, and AI augmentation. He is founder of the PKM Summit and co-founder of the Digitale Fitheid Academie. Over three decades of professional practice he has given over 2,500 presentations, initiated 228 projects, and authored more than 15 books — a professional history that is itself encoded in ThetaOS as 2,060 structured performance records, 9,590 organizational connections, and 18,446 persons (as documented in the ThetaOS performance archive). The system described in this paper is not a prototype built to test a theory; it is the instrument through which that professional life has been organized and made queryable.

## References

Ahrens, S. (2022). How to Take Smart Notes (2nd ed.). Sönke Ahrens.

Arango, J. (2018). Living in Information. Rosenfeld Media.

Arango, J. (2024). Duly Noted. Rosenfeld Media.

Austin, J. L. (1962). How to Do Things with Words. Oxford University Press.

Azevedo, F. A. C., Carvalho, L. R. B., Grinberg, L. T., Farfel, J. M., Ferretti, R. E. L., Leite, R. E. P., Jacob Filho, W., Lent, R., & Herculano-Houzel, S. (2009). Equal numbers of neuronal and nonneuronal cells make the human brain an isometrically scaled-up primate brain. Journal of Comparative Neurology, 513(5), 532–541.

Baddeley, A. (2003). Working memory: Looking back and looking forward. Nature Reviews Neuroscience, 4(10), 829–839.

Barabási, A.-L., & Albert, R. (1999). Emergence of scaling in random networks. Science, 286(5439), 509–512.

Bates, M. J. (1989). The design of browsing and berrypicking techniques for the online search interface. Online Review, 13(5), 407–424.

Bell, G., & Gemmell, J. (2009). Total Recall: How the E-Memory Revolution Will Change Everything. Dutton.

Berners-Lee, T., Hendler, J., & Lassila, O. (2001). The Semantic Web. Scientific American, 284(5), 34–43.

Brandom, R. (1994). Making It Explicit: Reasoning, Representing, and Discursive Commitment. Harvard University Press.

Buehler, M. J. (2025). Agentic deep graph reasoning yields self-organizing knowledge networks. arXiv:2502.13025.

Buffon, G.-L. L. de. (1749). Histoire Naturelle, Générale et Particulière. Imprimerie Royale.

Burt, R. S. (2004). Structural holes and good ideas. American Journal of Sociology, 110(2), 349–399.

Bush, V. (1945). As we may think. The Atlantic Monthly, 176(1), 101–108.

Bush, V. (1967). Memex revisited. In Science Is Not Enough. William Morrow.

Cajochen, C., Altanay-Ekici, S., Münch, M., Frey, S., Knoblauch, V., & Wirz-Justice, A. (2013).   
Evidence that the lunar cycle influences human sleep. Current Biology, 23(15), 1485–1488. Clark, A. (2005). Word, niche, and super-niche: How language makes minds matter more.   
Theoria, 20(3), 255–268. Clark, A. (2008). Supersizing the Mind: Embodiment, Action, and Cognitive Extension.   
Oxford University Press.

Clark, A., & Chalmers, D. (1998). The extended mind. Analysis, 58(1), 7–19.

Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences, 24(1), 87–114.

Deary, I. J., Penke, L., & Johnson, W. (2010). The neuroscience of human intelligence differences. Nature Reviews Neuroscience, 11(3), 201–211.

Donald, M. (1991). Origins of the Modern Mind: Three Stages in the Evolution of Culture and Cognition. Harvard University Press.

Dreyfus, H. L. (2002). Intelligence without representation — Merleau-Ponty's critique of mental representation. Phenomenology and the Cognitive Sciences, 1(4), 367–383.

Engelbart, D. C. (1962). Augmenting Human Intellect: A Conceptual Framework. Stanford Research Institute.

Forte, T. (2022). Building a Second Brain. Profile Books.

Fournier, L. (2021). Autotheory as Feminist Practice in Art, Writing, and Criticism. MIT Press.

Gurrin, C., Smeaton, A. F., & Doherty, A. R. (2014). Lifelogging: Personal big data. Foundations and Trends in Information Retrieval, 8(1), 1–107.

Humboldt, A. von, & Bonpland, A. (1807). Ideen zu einer Geographie der Pflanzen nebst einem Naturgemälde der Tropenländer. Cotta.

Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.

Hutchins, E. (1995). Cognition in the Wild. MIT Press.

Jevons, W. S. (1865). The Coal Question: An Inquiry Concerning the Progress of the Nation, and the Probable Exhaustion of Our Coal-Mines. Macmillan.

Kasparov, G. (2010). The chess master and the computer. New York Review of Books, 57(2).

La Fontaine, L. (1893–1914). Contributions to the Répertoire Bibliographique Universel and the Mundaneum women's documentation bureau. [Archival record, Mundaneum, Mons, Belgium.]

Lovelace, A. (1843). Notes on L. F. Menabrea's "Sketch of the Analytical Engine

Licklider, J. C. R. (1960). Man-computer symbiosis. IRE Transactions on Human Factors in Electronics, HFE-1(1), 4–11.

Licklider, J. C. R. (1965). Libraries of the Future. MIT Press.

Lovelace, A. (1843). Notes on L. F. Menabrea's "Sketch of the Analytical Engine Invented by Charles Babbage." Scientific Memoirs, 3, 666–731.

Luhmann, N. (1981). Kommunikation mit Zettelkästen: Ein Erfahrungsbericht. In H. Baier, H.   
M. Kepplinger, & K. Reumann (Eds.), Öffentliche Meinung und sozialer Wandel (pp. 222–228).   
Westdeutscher Verlag.

Mansour, E., Sambra, A. V., Hawke, S., Zereba, M., Capadisli, S., Ghanem, A., Aboulnaga, A., & Berners-Lee, T. (2016). A demonstration of the Solid platform for social web applications. Proceedings of the 25th International Conference Companion on World Wide Web (pp. 223– 226). DOI: 10.1145/2872518.2890529

Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychological Review, 63(2), 81–97.

Nelson, T. H. (1974). Computer Lib / Dream Machines. Self-published.

Odling-Smee, F. J., Laland, K. N., & Feldman, M. W. (2003). Niche Construction: The Neglected Process in Evolution. Princeton University Press.

Otlet, P. (1934). Traité de Documentation: Le livre sur le livre, théorie et pratique. Editiones Mundaneum.

Sauermann, L., Bernardi, A., & Dengel, A. (2005). Overview and outlook on the semantic desktop. In Proceedings of the 1st Workshop on The Semantic Desktop (CEUR-WS, Vol. 175).

Schön, D. A. (1983). The Reflective Practitioner: How Professionals Think in Action. Basic Books.

Searle, J. R. (1969). Speech Acts: An Essay in the Philosophy of Language. Cambridge University Press.

Skjaeveland, M. G., Balog, K., Bernard, N., Łajewska, W., & Linjordet, T. (2024). An ecosystem for personal knowledge graphs: A survey and research roadmap. AI Open, 5, 55–69.

Watts, D. J., & Strogatz, S. H. (1998). Collective dynamics of 'small-world' networks. Nature, 393(6684), 440–442.

Spärck Jones, K. (1972). A statistical interpretation of term specificity and its application in retrieval. Journal of Documentation, 28(1), 11–21.

Stenhouse, L. (1975). An Introduction to Curriculum Research and Development. Heinemann.

Suchman, L. (1987). Plans and Situated Actions: The Problem of Human-Machine Communication. Cambridge University Press.

Sutton, J. (2010). Exograms and interdisciplinarity: History, the extended mind, and the civilizing process. In R. Menary (Ed.), The Extended Mind (pp. 189–225). MIT Press.

Swan, M. (2013). The quantified self: Fundamental disruption in big data science and biological discovery. Big Data, 1(2), 85–99.

1. Archival evidence of La Fontaine's contributions is held at the Mundaneum, Mons, Belgium. See La Fontaine (1893–1914). ↩

2. The name Tom is a deliberate reference to Tom Bombadil, the only character in Tolkien's The Lord of the Rings over whom the One Ring held no power. It seemed an appropriate name for an AI layer with access to everything in the system, but no agency over any of it. ↩

3. Time-series variables including lunar phase were included in this analysis not as causal claims but as temporal covariates. The observation that lunar phase, when crossreferenced with validated sleep sensor data, shows a pattern warranting further investigation is consistent with Cajochen et al. (2013), who reported lunar cycle effects on human sleep in a controlled laboratory study. No causal interpretation is advanced here. ↩