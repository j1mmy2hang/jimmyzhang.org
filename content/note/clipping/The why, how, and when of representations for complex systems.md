---
created: 2026-09-08
published: 2020-06-04
source: https://arxiv.org/abs/2006.02870
type: "[[Clipping]]"
uid: tuKq
---
**Leo Torres**, **Ann S. Blevins**, **Danielle S. Bassett**, **Tina Eliassi-Rad**
Network Science Institute, Northeastern University · Department of Bioengineering, University of Pennsylvania

> [!abstract]
> Complex systems thinking is applied to a wide variety of domains, from neuroscience to computer science and economics. The wide variety of implementations has resulted in two key challenges: the progenation of many domain-specific strategies that are seldom revisited or questioned, and the siloing of ideas within a domain due to inconsistency of complex systems language. In this work we offer basic, domain-agnostic language in order to advance towards a more cohesive vocabulary. We use this language to evaluate each step of the complex systems analysis pipeline, beginning with the system and data collected, then moving through different mathematical formalisms for encoding the observed data (i.e. graphs, simplicial complexes, and hypergraphs), and relevant computational methods for each formalism. At each step we consider different types of *dependencies*; these are properties of the system that describe how the existence of one relation among the parts of a system may influence the existence of another relation. We discuss how dependencies may arise and how they may alter interpretation of results or the entirety of the analysis pipeline. We close with two real-world examples using coauthorship data and email communications data that illustrate how the system under study, the dependencies therein, the research question, and choice of mathematical representation influence the results. We hope this work can serve as an opportunity of reflection for experienced complexity scientists, as well as an introductory resource for new researchers.

# Introduction

The term “complex system” is used to describe a multitude of systems of markedly different magnitudes, from the atomic scale of interacting atoms to the vast scale of the whole universe, as well as markedly different behaviors, from starling murmurations to the viral spread of information on social media. Though distinct definitions exist, and not one is globally agreed upon, in general a complex system is a collection of objects or agents that (a) have a high cardinality and (b) interact with one another in a non-trivial way, such that (c) the collective behavior of the system is unexpected, different than, or not immediately predictable from the aggregation of the behavior of the individual parts. This unique collective behavior is often said to *emerge* from the dynamics of the parts (Johnson 2006; Kivelson and Kivelson 2016). Real world examples include computations in a neuronal population, cellular reactions in photosynthesis, food webs in ecology, transactions in local markets, interconnected world-wide trading in economics, and various technologies such as the Internet and the power grid.

In order to study complex systems across disciplines and domains, a first step is to concretely represent the system using a unifying mathematical language. In recent decades, the discipline of network science has arisen as the main focus of development of such a language (Newman 2018). Network scientists typically study complex systems by first modeling them using the tools and frameworks afforded by disciplines such as discrete mathematics and computational data structures. These formal frameworks enable the application of tried and true methodologies coming from different subfields within the mathematical, physical, and computational sciences. Furthermore these formalisms allow for the execution of efficient algorithms and can be used to infer structure, function, and dynamics of a system. What makes this process somewhat challenging is that each encounter with a new complex system requires the construction of a new representation tailored to it. Network science is far from developing a single, unified language that allows the study of all possible system structures and behaviors (Ladyman and Wiesner 2020). Indeed, there is currently not one, but a wealth of related frameworks, each of which captures particular perspectives and properties of the system under study.

This wealth of frameworks, and the resulting wealth of accompanying analysis pipelines, creates challenges for the study of complex systems. It hinders interdisciplinary communication, as researchers in one discipline may be unfamiliar with the frameworks and procedures used in another. Even within a single subfield, various approaches to represent and analyze the same complex system can hinder collective insight across research groups or projects. As a consequence, it is difficult and sometimes impossible to gather insight across systems, which directly hampers the progress of complexity science (Mitchell 2009). As conscientious researchers, we must address this challenge by understanding the assumptions underlying each formalism, as well as the the relationships between formalisms, and the impact of both formalism assumptions and relations on our analyses and interpretations of results.

In this work we aim to collect and align complex system analysis pipelines while providing a common vocabulary for a continued discussion. While achieving a single, unified language is unlikely, we can at the very least begin to simplify and condense the frameworks currently in use. For clarity, we begin by defining the fundamental terms used throughout the paper. The main text follows the flow of Fig. 1, which illustrates a simplified representation of the analysis pipeline used when studying a complex system, insofar as it pertains to the formal representation of the system. We begin with an investigation of common system properties which we call *dependencies*, followed by definitions of three mathematical formalisms commonly used for representation. Next we highlight mathematical relationships between formalisms that one might utilize in order to answer particular research questions, and finally we provide examples of computations suited for each of the three formalisms. Throughout the text we repeatedly ask how these dependencies and other modeling choices may influence the pipeline steps discussed. We provide two examples using a co-authorship dataset and the Enron emails dataset (Austin R. Benson et al. 2018a) to demonstrate the effects of various analysis pipelines on the results obtained from the same underlying system. Finally we close by suggesting that each modeling decision in a research analysis pipeline be taken on a case-by-case basis and in consideration of the dependencies, formalisms, relationships, and research questions. We hope this paper can serve as an instructive resource for new researchers in the field, and an opportunity for reflection to those more experienced in complex systems analyses.

![[image-DD20.png]]

> **Linear flow of a basic analysis pipeline for complex systems.** We begin with the system under study, and ask what sorts of elementary units exist, what relations exist that group elements together, and what dependencies might influence the existence of relations among units. We then turn to the question of how to represent the units, relations, and their dependencies; to answer this question, we must choose a formalism. Finally, we seek to interpret the outcomes of computations performed on the representation, and from those interpretations we reach a conclusion about the structure and function of the system.

## Definitions

In this work we use a consistent language to allow for effective and precise communication between scientists across disciplines. Here we provide a list of terms that we will use throughout this paper and their definitions. With the condensing of vocabulary and precise definitions of often abstract concepts, we hope to operationalize the study of the structure and behavior of complex systems.

- **Unit, element, or node:** an individual object, agent, or part of a system. Unless otherwise specified, we denote the set of nodes by $V$.

- **Relation:** a set $r$ of one or more nodes, such that $r\subseteq V$. In practice, node relations can arise from correlations in data, observed interactions between units, or groups of elements known to function collectively. A relation $r$ can be *dyadic* if it contains exactly two units ($|r|=2)$, or *polyadic* if the relation contains three or more units ($|r|>2$). If $r$ contains $k$ nodes, then we say those $k$ nodes in $r$ are related. In some parts of the literature, polyadic relations have also been called “higher order” relations, and have been used to refer to motifs in graphs (Benson et al. 2016). To avoid confusion, however, in this paper we will use “higher order” to refer exclusively to a particular formalism introduced in Section 3.5. We denote the set of relations by $R$ unless a domain-specific convention already exists.

- **System:** a collection of units $V$ and all relations $R$, such that the collection needs no other pieces in order to function completely or to interact autonomously with its environment. The set of units are the components of the system, while the patterns found in the set of relations are called the system’s *structure*. The system’s activity, including changes in nodes and relations over time, is sometimes also called its *function*.

- **Complex system:** a system whose units and relations together exhibit a qualitatively different functionality than the sum of its units acting individually; the subject of study of complexity science. In this work, “system” always refers to a complex system.

- **System fragment:** a subset of the nodes and relations of a system. Researchers usually do not have access to all units or all relevant relations. Instead, they usually have access to –and must perform their studies on– fragments of a system. Sometimes this limited access is due to the vast number of units (a human brain contains on the order of $10^{11}$ neurons); other times it is due to the inability of our current tools to record all the relations among them (genes that express at low levels are difficult to detect); still other times it is due to other constraints (online social media companies may not release their data due to privacy concerns). We do not require a system fragment to itself operate as a system; that is, a system fragment may not necessarily have the ability to fully function or interact with its environment. Consider the complex system of cell metabolism in humans. Even with contemporary tools, we do not have access to all data pertaining to this system. In order to study it, we usually focus on a single aspect most relevant to the question at hand: for example, the set of all measurable proteins and the set of known protein complexes that they form. We refer to the combination of these two sets as the “protein complex fragment” of the cell metabolism system.

- **Dependency:** a property of a system in which the existence of one relation can provide information about the existence of another relation.

- **Formalism:** a mathematical framework which can be used to represent, model, encode, and study a complex system. In this paper, we will explicitly discuss the graph, simplicial complex, and hypergraph formalisms.

- **Representation:** a mathematical or computational encoding of a specific complex system (or a fragment of one). A representation is the materialization of a specific formalism, e.g. it is one concrete, specific graph, as opposed to the mathematical theory, or formalism, of graphs[1].

- **Encode:** the process of taking a system or data collected from a system and formulating it as a representation using a specific formalism.

- **Attribute:** a property or bit of information attached to a node or relation. We can call the set of properties $P$ and let $p$ be the assignment map sending $V\times R \rightarrow P$. For example, a relation formed by the co-firing of neurons can be assigned a frequency, and a relation formed among individuals can have a categorical attribute such as “teammates". In this work, we focus less on attributes and more on how we handle vertices and their relations, but we will note how node and relation attributes can extend the base formalisms.

# Dependencies by the system, for the system

When studying or modeling a complex system composed of many parts, several design decisions must be made. We begin by considering one specific and rather fundamental choice, which is sometimes only implied and other times outright neglected. This choice regards the decision of which *system dependencies* one should seek to appropriately and accurately encode. Reiterating our definition above, *a dependency is a property of the system in which the existence of one relation provides information about the existence of another relation.* Said another way, does the system have underlying rules or restrictions that cause interactions to occur or nodes to behave in particular ways? For example in a social system of individuals and friendships, if two individuals live physically close to one another, then their likelihood of becoming friends is larger than if they lived far apart. Furthermore, if they live near each other, then they are also more likely to meet and consequently befriend each other’s neighbors. In this way, knowledge of the existence of one friendship informs us of the possible existence of other friendships, because the friendships (relations) between people (units) are affected by geographical distance (dependency). Such system-level dependencies can manifest in different ways; here we will constrain ourselves to a discussion of three of the most commonly observed dependency types. Specifically we discuss subset dependencies (does a large relation influence the existence of smaller sub-relations?), temporal dependencies (does temporal nearness of elements influence their relations?), and spatial dependencies (does the physical proximity of elements influence their relations?). We acknowledge that dependencies other than those described in this work exist within real-world systems; in many domains of inquiry, ongoing research efforts seek to define the proper avenues for illuminating dependencies and approaches for their incorporation.

## Subset dependencies

When investigating a complex system, we often record its elements and the observed relations containing two or more of those elements. For example, we might record objects and shared observable features (McRae et al. 2005), people and shared conversations (Zhu and Zhang 2017), or neurons and their co-firing (Curto 2017). Here, we can think of the system as a set of nodes $V$ and a set of observed relations $R$ in which each relation $r \in R$ is a subset of $V$ and is meant to represent one observed interaction between $k$ elements. In this setup, some nodes may participate in many relations, while others participate in very few or none at all. It is then important to ask: if we observe the relation $r = \{v_0,\dots,v_{k-1}\} \in R$, does it imply that some subset $r'$ of $r$ is also a relation? If so, the system exhibits the type of dependency that we call a *subset dependency*. For example, in the words-and-features system fragment, if three words correspond to objects that share a particular feature (so that $r = \{v_0, v_1, v_2\}$), then any two of the objects must also share that same feature (then $r' = \{v_0, v_1\}, r''=\{v_1,v_2\},$ and $r'''=\{v_0,v_2\}$ are all relations). One can make a similar argument for people conversing with one another and for neurons co-firing. In these cases, every subset of any set of related nodes is also related. However, we will see examples later when only some, or none, of the relation subsets are also relations, and we will describe this scenario as indicating the presence of a different type of dependency. Concretely, *we will say that a system of nodes $V$ and relations $R$ exhibits a subset dependency if for $r \in R$ and $r'\subset r$, we must have that $r'\in R$ whenever $P(r')$ is true, where $P$ is some logical predicate.* In the case when $P$ is always true, then any subset of $r$ is always a relation, as in the examples proffered above.

To illustrate this specific type of dependency, in Fig. 2 we show a system fragment of chemical reactions (left) and a system fragment of objects with shared physical descriptors (right). On the left side of Fig. 2, molecules or compounds correspond to nodes, and reactions define relations between nodes so that if $k$ compounds together exclusively form the reactants and products of one reaction, then those $k$ nodes are related. We see that $O_2$ and $H_2O$ participate in multiple reactions together, for example $2H_2O + O_2 \rightarrow 2H_2O$, but we do not observe a reaction that *exclusively* uses $O_2$ and $H_2O$ (we would need at least one more compound using $H$ to even begin balancing that reaction). Therefore this system fragment does not display the property that subsets of relations are also relations, since we have that $\{O_2,H_2O\} \subset \{H_2,O_2,H_2O\}$ and $\{H_2,O_2,H_2O\} \in R$, but that $\{O_2,H_2O\} \not\in R$. In contrast, the right side of Fig. 2 shows a collection of objects and features (shape and color), in which each object may share physical features with other objects. In this case a relation $r_{\square} = \{\square_{\text{pink}}, \square_{\text{red}}, \square_{\text{red}}\}$ contains all objects that are square. Notice that by our definition of relation for this system fragment, we immediately get that $r' = \{\square_{\text{pink}}, \square_{\text{red}}\}$ is also a relation. Specifically, the pink and red squares are related because they share the feature “square”, but also any subset of the squares will also be related because they, too, share the feature “square”. This example of objects and shared features does display the subset dependency, since subsets of related nodes are also related.

![[image-K1mf.png]]

> **Are subsets of related nodes necessarily related?** Systems may exhibit a subset dependence, which occurs when a relation between nodes implies the existence of a relation between any subset of those nodes. *(Left)* An example system fragment composed of molecules and chemical reactions. Here we may have a set of molecules that all participate in the same reaction, such as $O_{2}$, $H_{2}O$, and $H_{2}$, but a subset of these compounds could not independently engage in a reaction, such as $O_{2}$ and $H_{2}O$. *(Right)* An example system fragment composed of objects with observable features such as color and shape. All objects that are squares are related by the presence of the shared feature "square". Any subset of these square objects will also still possess the shared feature "square", and thus will also be related. Since any subset of a relation must also be a relation, we say that the system contains a *subset dependency*.

When a system displays a subset dependency, we must ask ourselves whether we should explicitly represent that property in our model. The answer to that question will depend on, among other things, the available data, the research question, and how we define relations among nodes. Incorporating the subset dependency in a representation usually requires the data to include recorded polyadic relations, which are not always directly observable. Additionally if the research question involves paths through related nodes, it might not be necessary to incorporate polyadic relations and thus the system’s subset dependencies explicitly, since often we can answer questions about paths between nodes using exclusively dyadic relations, which are simpler to compute with than polyadic relations. Most commonly, the choice of whether to include the subset dependency affects the formal representation used to encode the system, and consequently the results of downstream analyses. For example, if Marta is involved in a group of people having conversations and we define relations as shared conversations (so that a subset dependency exists), then if we count the number $p$ of people with whom Marta converses we do not know if Marta had $p$ separate conversations with each of the $p$ individuals, or if she participated in one large conversation with all $p$ people. Without a distinction, Marta’s popularity with others could be vastly over- or under-estimated. This example illustrates how the occurrence of subset dependence is determined by the definition of relation. In Section 3 we explore the benefits and drawbacks of a few abstract formalisms that capture different types of dependencies. For now, we stress that the presence or absence of subset dependencies influences the computations we can perform and the formalisms we can use.

## Temporal dependencies

Next we consider systems in which we observe information, individuals, or goods moving along paths across time. A simple example would be a city subway system where passengers ride the train from one stop to the next until they reach their destination. In such systems we must ask the question: Does the current location of an individual affect where they might move next? *We say a system exhibits a temporal dependency if the behavior of a unit at time $t$ affects the behavior of any unit at some time $t' > t$.* Said another way, paths or walks within systems that display temporal dependency are not Markovian, since the future state of a unit depends not only on its current state but also some past states of itself or other units.

Consider a subway system in which trains can travel to stations $A$ through $H$ (Fig. 3). If our complex system consists of passengers commuting via the subway, then our observed data might include explicit passenger routes. For example, in Fig. 3 we record the routes of six passengers, each of whom commutes from the suburbs (stations $A$, $B$, and $C$) to downtown (stations $D$, $E$, $F$, $G$, and $H$). For the purpose of the example, we assume that passengers do not transfer between distinct train lines during their commute. If we now represent our data as a set of units (stations) and we connect two units $i$ and $j$ if station $j$ immediately follows station $i$ in at least one passenger route, we obtain the subway map shown in the bottom left of Fig. 3. Because this diagram records all known movements of passengers between pairs of stations, we might confidently proceed to the next analysis step. However, it is worth noting that this particular representation suggests that the green path from station $B$ to station $F$ is a possible commute for a passenger. Yet when we look back at the data itself, such a commute seems extremely unlikely since the sequence $B-D-E-F$ never occurs. The fact that this route appeared natural from the representation, but not from the data, points to the fact that our system contains a temporal dependency and, importantly, that this dependency is not well reflected in the particular representation we chose.

![[image-p2sO.png]]

> **By incorporating temporal dependencies into the representation, we obtain a more accurate subway map.** Given data from six commuting passengers ($P_{1}$, $P_{2}$, ..., $P_{6}$) who do not switch trains *(top left)*, how can we obtain the underlying subway map? We could create a graph in which two stations are connected if a passenger transferred from one station to another. However, such a graph would suggest that a passenger could commute from station $B$ to $F$ without switching trains *(bottom left)*, which is not possible in this system. If instead we untangle the subway lines by respecting the temporal dependency and treating trains that arrive to station $D$ from station $C$ as different from those arriving from station $B$, then we can clearly see the necessary transfer between subway lines required for the $B$ to $F$ commute *(bottom right)*.

As discussed in great detail in (Benson et al. 2016; Rosvall et al. 2014; Edler et al. 2017; De Domenico et al. 2015; Lambiotte et al. 2014; Perri and Scholtes 2019), the fundamental limitation of keeping only pairwise sequential relations, as done in the bottom left of Figure 3, is that in the representation we assume that traversal across each link is Markovian and therefore its probability is independent of the probability of traversing any other link in the system. More explicitly, paraphrased from (Lambiotte et al. 2019), by representing the system as a graph (see Section 3 for a definition) we assume that the edges $(i,j)$ and $(j,k)$ are independent and that the two-step transition from $i$ to $k$ proceeds in two independent steps. This assumption can easily be violated by a real system, as seen in our toy example, since sometimes one step in this traversal is dependent on which steps came before (i.e. transitions are not Markovian). Mismanaging temporal dependencies in systems can lead to biased results that can, for example, over-represent the importance of edges rarely used or create non-existent connections (as in the case of our subway example). We will discuss a formalism particularly appropriate for representing temporal dependencies in Section 3.

## Spatial dependencies

The third and final type of dependency that we discuss here arises from the physical nearness of units within a system. For example, in the human connectome a brain region is likely to extend white matter tracts to neighboring regions, providing physical conduits for electrical activity (Stiso et al. 2019). In granular materials, resistance to external forces relies on interactions between only particles that physically touch (Papadopoulos, Porter, et al. 2018). More generally, many spatial systems are so named because the spatial location of nodes affects their likelihood of interacting with one another (Barthélemy 2011, 2018). *Here we say that a system exhibits a spatial dependency if the distance between two or more nodes influences the existence of a relation that contains them.* Typically, this dependency is encoded by enforcing that the probability of the occurrence of a relation in a concrete representation is a function of the distance between the nodes involved.

![[image-oR16.png]]

> **Spatial dependencies within a system can complicate our representations of the data.** In our example system, we have *(Left)* connection information that is independent of any system embedding, and *(Middle)* spatial information indicating where the nodes physically reside. A possible combination of the two information types *(Right)* can be used to better understand the physical constraints on the topology. If long distance connections are costly for that system, the combined representation allows the investigator to assess the prevalence and location of those costly (and thus potentially surprising) connections.

Many such systems exist in the natural and manufactured world. Indeed, spatial restrictions influence communication in cell populations (Lai 2004; Ramel et al. 2013), trade in economic networks (Hu et al. 2013), and passengers in transportation networks (Weber and Kwan 2002; Lima et al. 2016). As an example of spatial dependency within an abstract system, we might begin with only knowledge of the pattern of related nodes. We display this structural information in the left panel of Fig. 4 with circles corresponding to nodes and lines joining circle pairs whose corresponding nodes are related. From the structural information alone we might expect that relating the pink and red nodes is just as difficult or costly as relating the red and dark red nodes; we might therefore infer that the two relations are equally crucial to the system’s function. However, if the system exists within an environment containing coordinates and a distance function, with each node having spatial coordinates and a measure of distance between each pair, then this spatial information could offer a different perspective on the system. In the middle panel of Fig. 4, we see that the nodes, now depicted with colored pins, are spread out so that some are more spatially clustered whereas others are less so. Considered alone, the spatial information gives us no insight into the actual relations present in the system, but does provide information with which we might predict the likelihood that nodes are related.

In many spatial systems such as the brain or city transportation, relations between distant nodes are unfavorable due to a higher cost of creation and maintenance, while short-range relations are far easier to construct. In the face of this association between the physical distance across a relation and its cost, we might consider the distances between nodes and infer that the red and dark red nodes are likely to be related, while the pink and red nodes are not. When we finally combine the topological and spatial information (Fig. 4, right), we then can leverage the two information types to understand which relations are most surprising or make hypotheses about which relations are most important to the system. For example, the dyadic relation between the pink and red nodes might be very costly given the long distance, so we might infer that the pink to red relation is more essential to the system than the red to dark red relation since the system would only spend valuable resources to maintain such a relation if it was integral to system function. Without the spatial information, we may have incorrectly placed the same importance on the pink-to-red and the red-to-dark red relations. This example highlights one of many ways in which we could integrate spatial and topological information.

As with the previous dependency types, failure to account for a spatial dependency can greatly bias our models and results. Consider an outbreak of a contagious disease. If we recorded the habits of infected individuals such as their diet, but fail to record their locations and physical mobility through space (Tizzoni et al. 2014; Apolloni et al. 2013), then we might – for example – wrongly attribute disease spread to the broad consumption of a particular food that is prevalent in the infected region instead of through person-to-person contact. As another example, social contacts are also influenced by proximity. If we return to evaluating Marta’s popularity, the observation that she has many friends may come from the fact that she lives in a densely populated area, rather than from her charisma or personality. In these examples, failing to account for spatial dependencies may result in attributing certain structural properties of the system to the wrong cause.

## External sources of dependencies

Before we shift our focus to concrete ways of encoding system dependencies using mathematical formalisms (Section 3), it is useful and interesting to consider how external forces can influence the observed system dependencies. Ideally, we as investigators would have the ability to measure all dependencies within the system under study, and then use this knowledge to make an informed decision as to the appropriate formalism with which to model our system. However, often the processes of scientific inquiry do not proceed so effortlessly: no analysis is ever devoid of the influence of external factors, or biases. Our goal in this section is to highlight possible sources of such bias. Although we have already discussed biases arising from dependencies native to the system under study, here we emphasize that acknowledging and understanding dependencies imposed by outside sources should also play a crucial role in determining an appropriate representation and subsequent analyses.

- **Data availability.** One notable and common constraint in science is the limited data that can be empirically acquired from a given system, i.e. researchers usually have access only to a fragment of the system. As a consequence, any subset dependency that is observed and ultimately encoded may be determined more by the sparsity of available data than by the system’s true structure and function. For example, one may have access to only sparse snapshots of or short sequences from an evolving system (Sinatra et al. 2010), making the subset dependency difficult to identify and effectively encode. Particularly, there may not be enough data available to correctly deduce the predicates $P$ that a subset must satisfy in order to also form a relation (see the definition of subset dependency in Section 2.1).

- **Data acquisition or processing.** Certain experimental techniques or computational procedures may produce spurious dependencies. A common example involves correlation matrices. By computing the correlations of node activity one induces a transitivity dependency, which is a type of subset dependency. Concretely, if $A,B,C$ are nodes in a system where two nodes are related if the time series of their activities are highly correlated to each other, as determined by some data acquisition method, then whenever $A$ and $B$ are related, and $B$ and $C$ are related, it is highly likely that $A$ and $C$ are also related. In this case, it is possible that relations between nodes implied by the calculated correlations are found in the processed data but not in the system itself. For example, one might find that changing the type of correlation (or other similarity measure) results in a change in the inferred node relations.

- **Research question.** The research question at hand will influence which relations within a system are particularly interesting. Moreover, it may also influence the very definition of a relation. For example, consider a system of proteins that interact to form protein complexes. If we wish to study which proteins appear together in many complexes, then we may define a relation as two proteins that participate in the same complex. If instead we wish to study protein complexes themselves, we could define a relation as a set of proteins that all together form a single complex. In the first case, the relations exhibit a subset dependency (if three proteins appear together in a complex, then so do any two of them), but the second does not. On the flip side, a given research question may neglect a relevant dependency in the system. For example, we could ask if a common food could have caused a disease outbreak. Answering that explicit question neglects the fact that individuals near each other will likely eat similar foods. The research question is not broad enough to incorporate the spatial information as part of the answer, and therefore spatial dependencies may seem irrelevant at first sight, when they may be in fact essential to finding the real answer. We expand upon this topic in Section 3.5.

To summarize, we have defined and discussed three types of dependencies that could exist in a complex system: subset, temporal, and spatial. We emphasize that dependencies can arise from within the system itself or from external factors, but regardless of their origin, we as researchers must be aware of their existence and how they influence our models and results, especially given their early position in our analysis pipeline (Fig. 5). As we will continue to see in the sections that follow, the recognition and encoding of dependencies can greatly affect the results of our analyses and the conclusions that can be drawn.

![[image-HG0t.png]]

> **Understanding dependencies present in the system is a first step in the complex system analysis pipeline.** Types of dependencies include spatial, temporal, and subset dependencies. Acknowledging dependencies at this step allows for proper preservation of dependencies throughout the rest of the analysis pipeline.

# Formal representations of complex systems

Over the years many representations of complex systems coming from different mathematical and computational formalisms have taken hold across scientific disciplines. Different formalisms allow for the modeling of unique aspects and dependencies of each system, but the multiplicity of available formalisms presents challenges for the communication, collaboration, and ultimately the progress of complexity science. Furthermore, the choice of formalism also complicates the analysis pipeline that researchers must decide upon when studying a particular system.

Here we discuss three of the many possible mathematical formalisms that researchers commonly use to represent their system: graphs, simplicial complexes, and hypergraphs, chosen for their prevalence in the complex systems literature. A complex system is, at its core, a collection of units and their relations, so therefore we require our representations to mirror this composition of units and relations. The units of all three formalisms discussed here are called *nodes*. *Graphs* represent pairwise relations among nodes as *edges*. Despite their simplicity (or perhaps because of it), graph representations have supported several important discoveries such as the prevalence of small-worldness in real-world networks (Watts and Strogatz 1998; Amaral et al. 2000). Still, graphs can only, by nature, represent dyadic relations between nodes. If instead relations within the system exist between more than two nodes, one might turn to either a *simplicial complex* or a *hypergraph*. Both of these formalisms naturally allow us to encode such polyadic relations (Battiston et al. 2020). The relations represented by a simplicial complex are called *simplices* and those represented by a hypergraph are called *hyperedges*. We will first define each formalism, so that later in this exposition we can explicitly discuss their respective advantages and assumptions.

## Graphs

The first and perhaps most common formalism used to model complex systems stems from graph theory. A *graph* $G$ is a collection of vertices and edges between vertices such that an edge connects exactly two vertices (Fig. 6, left). We denote the set of vertices as $V$ and the set of edges $E\subseteq V \times V$, so that a graph is defined uniquely by $G=(V,E)$; note that each edge is an unordered set of two nodes. The vertices of a graph are the main units, and edges describe how these units fit together. If $v_A$ and $v_B$ are nodes of the graph, then we write $(v_A, v_B)$, or $v_A - v_B$ to represent the fact that the two nodes are connected by an edge. Studies that form a graph representation from the underlying data frequently involve finding densely connected sets of nodes or determining how an object might traverse the structure. In using the graph representation, such questions could lead to detecting cliques or communities in the graph, or identifying chains of connected nodes called paths in the graph (see Section 5.1 for more examples).

![[image-5JUW.png]]

> **Three types of formalisms composed from nodes and relations**. *(Left)* Graphs involve units called nodes and relations between two nodes called edges. Possible features of interest for graphs include all-to-all connected sets of nodes called cliques, as well as routes between nodes called paths. *(Middle)* Simplicial complexes can be used to represent systems with polyadic relations among units. Sets of related nodes are connected by simplices. A $k$-simplex describes $k + 1$ nodes that collectively interact, such that any subset of nodes forming a simplex must also form a simplex; this is called “downward inclusion”. Motifs of interest include topological cavities and maximal simplices. *(Right)* Hypergraphs can also be used to represent systems with polyadic relations among units. Sets of related nodes are connected by hyperedges. Hypergraphs are not restricted by downward inclusion. Of particular interest within a hypergraph is the absence of a substructure (or smaller relation), for example in which two nodes do not connect dyadically but participate together in a hyperedge that connects a superset of the node pair.

Many attribute the origin of graph theory to Leonhard Euler in the 18th century (Euler 1741). One can also trace its presence outside of mathematics back to the use of sociograms and social network analysis in the 1930s (Freeman 2004), and to graph-like data structures in computer science in the 1950s (Wilson 2013). Notably, the use of graphs to model more general complex systems has rapidly increased over the past few decades, driven largely by the discovery of the small-world effect (Watts and Strogatz 1998) and heavy-tail degree distributions (Barabási and Albert 1999) in real-world datasets. Encoding a system as a graph has the great advantage of hundreds of years of mathematical theory behind concepts, generally simple computations, and insightful visualization. However, the graph by definition assumes that relations between nodes occur exclusively at the pairwise level. Systems such as transportation networks might solely contain pairwise relations, but many others, especially from biology, often have polyadic relations. Still, the graph’s ability to model systems has proven quite useful in distinct fields such as neuroscience (Bassett and Sporns 2017; Bullmore and Sporns 2009), computer science (Even 2011; Mitchell 2006), and ecology (Proulx et al. 2005; Montoya et al. 2006).

## Simplicial Complexes

The next formalism that we consider addresses the need to acknowledge polyadic relations in the system. A *simplicial complex* is a set of vertices $V$ along with a collection of subsets of vertices $R$ (our set of relations, often denoted by $K$ in the field) such that for any $r \in R$ and $r' \subset r$, we have $r' \in R$ (see Fig. 6, middle); we will refer to this condition as “downward closure”. A set of $k+1$ vertices $r \in R$ is here called a $k$-simplex, and downward closure requires that any subset of vertices within a simplex also forms a simplex. In practice we often imagine a $k$-simplex to indicate an application-relevant interaction between the $k+1$ nodes, such that these nodes may function in unison. The simplicial complex (precisely, the *abstract simplicial complex*) would then record the individual units (nodes), the functional building blocks (simplices), and how all these building blocks are assembled into one system (the simplicial complex). Since subsets of simplices are simplices by definition, the natural intuitions of node relations apply readily; that is, if $k$ nodes are related, then any subset of those $k$ nodes are also related. The simplicial complex can be easily written as an $\#maximal$ $simplices \times \#vertices$ binary matrix where an element containing a 1 indicates vertex participation in the given maximal simplex, where a maximal simplex is a simplex that is not contained in any larger simplex.

Although algebraic topology has been studied for well over a century, it was not until the early 2000’s that applied algebraic topology as a discipline began to emerge (Zomorodian and Carlsson 2005; Edelsbrunner et al. 2000) (though we note a few earlier uses (Atkin 1972)). Many of the earliest studies used applied topology and simplicial complexes to study data in the form of point clouds (Carlsson et al. 2008; Singh et al. 2008). Later, it became clear that the simplicial complex language was a natural formalism for explicitly representing biological and physical systems. For example, simplicial complexes have been used to represent neural recordings (Giusti et al. 2015; Curto 2017), classify images (Tauzin et al. 2020; Damiano and McGuirl 2018; Dunaeva et al. 2016), and describe the mesoscale architecture of brain networks (Stolz 2014; Stolz et al. 2018; Reimann et al. 2017; Sizemore, Giusti, et al. 2018; Petri et al. 2014). Even more recent work has focused on defining generative models to construct simplicial complexes with given topological features (Courtney and Bianconi 2018).

## Hypergraphs

The final formalism that we consider draws again from sets of nodes and their relations, yet is even more general than the simplicial complex discussed above. The *hypergraph* is an extension of the mathematical definition of a graph, in which we have a vertex set $V$ and a hyperedge set $\mathscr{E}$. A hyperedge $e\in \mathscr{E}$ (using our notation this phrase reads a set $r \in R$) can connect an arbitrary number of vertices. That is, while an edge can only connect two vertices, a hyperedge can bridge three, four, five, or more nodes (Fig. 6, right). More rigorously, a hypergraph is a pair $(V,\mathscr{E})$ with $V$ a finite vertex set and $\mathscr{E}$ a set of subsets of $V$ (Voloshin 2009; Berge 1984). In contrast to the simplicial complex, we can use the hypergraph to encode polyadic relations without the restriction of downward inclusion. Formally, a subset $e'$ of a hyperedge $e$, $e' \subset e\in \mathscr{E}$, does not necessarily exist as a hyperedge. Additionally, we can rewrite a hypergraph as a $\times \#hyperedges \times \#vertices$ binary matrix, in which an entry of 1 indicates the vertex participation in the hyperedge.

As noted above, the crucial restriction that is relaxed when moving from describing a simplicial complex to defining a hypergraph is that of downward closure. Recall that in a simplicial complex, if $r$ is in the simplicial complex, any subset $r' \subseteq r$ must also be in the simplicial complex. Hypergraphs do not obey this rule. For example we may see a hyperedge connecting vertices $v_1,v_2$, and $v_3$ but no hyperedge that connects $v_1$ to $v_2$ exclusively. Or, given two hyperedges connecting nodes $v_1, v_2, v_3$, and $v_2, v_3, v_4$, if a hyperedge connecting $v_2,v_3$ also existed, does this smaller hyperedge indicate a sub-relation for the hyperedge $v_1, v_2, v_3$, the hyperedge between $v_2,v_3, v_4$, neither, or both? With a hypergraph, we cannot determine how a sub-relation fits (or does not fit) into superset relations (see (Spivak 2009) for a deeper discussion). This subtle difference allows hypergraphs to represent a wide diversity of systems, including many that the simplicial complex formalism would not appropriately represent. The hypergraph’s increase in modeling flexibility is counterbalanced by a decrease in formal analysis methods, which we will discuss more in Section 5.

The flexibility and ability to model polyadic relations made hypergraphs an appealing formalism in many systems that were originally studied with graph theory. Indeed one of the earliest practical uses of hypergraphs was to understand social networks (Seidman 1981). Since then, researchers have successfully employed hypergraphs to study polyadic relations in the Enron email dataset (Purvine et al. 2018), find the core of yeast protein-protein interactions (Ramadan et al. 2004), uncover motifs in neurodevelopment (Gu et al. 2017), track changes in evolving systems (Bassett et al. 2014; Davison et al. 2015, 2016), and detect failure in biochemical networks (Klamt and Gilles 2004). As many uses of hypergraphs arose out of systems first modeled with graphs, many analysis methods for hypergraphs mimic those originally used for graphs (we discuss this point further in Section 5.3).

## Variations

We note that the above descriptions only scratch the surface of complex system encoding possibilities. An ever broadening set of scientific questions drives the need for novel variations of each formalism, resulting in a myriad of definitions and manipulable parameters. One could extend our mathematical definition of complex systems to include the following properties, perhaps as a map $p:V \times R \rightarrow P$ where $P$ is a set of attributes we care about, as mentioned in Section 1.1. Here we note a few of the most common modifications to each of the above formalisms, driven by the need to incorporate more information about the system at hand.

### Directed

Many complex systems including the brain, transportation networks, and metabolic pathways exhibit directionality in their relations. That is, in these systems, if $v_A$ and $v_B$ are units that share a dyadic relation, there is a meaningful distinction between a relation where $v_A$ comes first, one where $v_B$ comes first, and one where either $v_A$ or $v_B$ comes first (but there must always be an order in how they are related). To distinguish these cases we write $v_A\rightarrow v_B$, $v_B\rightarrow v_A$, or $v_A\leftrightarrow v_B$, respectively. If we apply this idea to the graph formalism, a *directed graph* is one where each edge is now an ordered set of two nodes. Directed graphs have proven extremely useful in many contexts from scheduling and monitoring workflows (Kotliar et al. 2019; 2020, n.d.) to cardiac excitation modeling (Vandersickel et al. 2019) to understanding percolation processes relevant to wild fires and other explosive phenomena (Squires et al. 2013; D’Souza et al. 2019). Moving to simplicial complexes, directionality is still quite natural. Indeed simplices themselves inherit a directionality, formally known as an *orientation*, encoded by the natural numbering of the participating vertices. In practice, an oriented $k$-simplex implies that the $k+1$ vertices, and any subset of these vertices, all relate to one another such that we could number the vertices so as to ensure that vertices only point to vertices with a higher assigned number. Oriented simplicial complexes arise in practice from directed synapses between neurons (Reimann et al. 2017) as well as directed migration flow (Ignacio and Darcy 2019). Finally, in hypergraphs, one may represent directionality with *hyperarcs*, the term for a directed hyperedge. More formally, a hyperarc is a pair of disjoint subsets of vertices with one subset comprising the sources and the other subset comprising the sinks (Gallo et al. 1993). Directed hypergraphs have proven useful in constructing a biological pathway database (Krishnamurthy et al. 2003), tackling problems in computer science such as propositional logic (Gallo et al. 1993) and combinatorial optimization (Levi and Sirovich 1976; Gnesi et al. 1981), and finding specific patterns of connectivity in chemical reaction systems (Özturan 2008), among others.

### Weighted

Not all relations are created equal; even within the same system, relations between individual actors are rarely uniform in real-world systems. To represent these differences, the strength or magnitude of interactions between units can be encoded using the *weighted* versions of the above formalisms. To weight any of the above encodings, we can define a general weight function $W:R \rightarrow \mathbb{R}$ from the set of encoded relations $R$ (edges, simplices, or hyperedges) to the real numbers $\mathbb{R}$. For a graph, this function would assign a value to each edge, which we generally interpret as the strength or frequency of the pairwise interactions between the corresponding nodes. In the context of weighted representations, the original versions containing no weights are called *binary* or *unweighted*, as they can be cast as weighted objects where the weights of all relations are either one, if they exist, or zero if they do not exist. The brain connectome, traffic between municipalities (De Montis et al. 2007), and functional similarity of genes (Pan et al. 2018) have all been modeled as weighted graphs. Additionally, many common graph metrics such as the clustering coefficient and path length (covered in more detail in the next section), extend easily to the case of weighted graphs (Rubinov and Sporns 2010), making this variant of representation particularly pervasive. Similarly we can construct a weighted simplicial complex by assigning a weight to each simplex. However, recall that in a simplicial complex any face of a simplex must also be a simplex, and thus if we have a relation between $k$ nodes then any subset of these nodes must be related to at least the same extent as the superset. Said another way, we require that the weighting function $W$ on simplices adheres to the rule that for any simplex $r$, if $r' \subseteq r$ then $W(r) \leq W(r')$. Weighted simplicial complexes naturally arise from point clouds with inverse distances between points as weights or growing processes. Perhaps most often, we study weighted simplicial complexes through the lens of persistent homology, which returns the organization of topological cavities housed within the weighted simplicial complex (Zomorodian and Carlsson 2005; Carlsson 2009; Ghrist 2008; Otter et al. 2017) (see a few recent uses in (Sizemore, Giusti, et al. 2018; Giusti et al. 2015; Petri et al. 2014; Stolz 2014)). Lastly, in hypergraphs we can naturally weight hyperedges with distinct values (Gallo et al. 1993). Importantly, weighting hyperedges allows more flexibility in choosing weights, as weighted hypergraphs do not enforce rules restricting weights on subedges in contrast to weighted simplicial complexes. Weighted hypergraphs have proven useful in image segmentation (Rital et al. 2005) and in the process of incorporating prior knowledge into learning algorithms (Tian et al. 2009).

### Dynamic

Complex systems such as cell signaling, traffic patterns, and transactional relations also grow, separate, or fluctuate in time (Maheshwari et al. 2019; Saadatpour and Albert 2012; Chodrow et al. 2016; Liang et al. 2018). Consequently, formalisms have been adapted to represent such an evolving architecture. A *dynamic graph* or a *temporal graph* is a sequence of graphs $G_1,\dots, G_T$ in which each $G_i$ is a graph on the same set of nodes, and each node is mapped to its identity when moving from $G_i$ to $G_{i+1}$ (Holme and Saramäki 2012). As with other variations on graphs, multiple computational tools such as community detection have been extended to include dynamics (Nicosia et al. 2013; Sizemore and Bassett 2018; Mucha et al. 2010). Moving to simplicial complexes, a dynamic simplicial complex is similarly a sequence of simplicial complexes on the same vertex set. Questions about the topological cavities of simplicial complexes can still be asked by using vineyards (Yoo et al. 2016) and zig-zag persistent homology (Milosavljević et al. 2011) to expose the evolving topology of special types of evolving simplicial complexes. Finally, a dynamic hypergraph is a sequence of hypergraphs $H_1, \dots, H_T$ on the same vertex set where hyperedges may change from $H_i$ to $H_{i+1}$. At the time of writing, we found few examples of applied dynamic hypergraphs, although we note that their visualizations have been studied (Valdivia et al. 2017). Nevertheless, we suggest that this particular variation of hypergraphs could be useful for example in modeling evolving gene interactions, functional relations between brain regions, and the time-varying structure of social groups.

### Multilayer

Often the pieces or relations between pieces of a system have types, categories, or classifications that distinguish them. It is sometimes useful to distinguish between these types of relations in our representations, and one way to do so is to use the so-called *multilayer* variations. Generally, multilayer graphs consist of a set of graphs that may (or may not) involve the same nodes; each graph in the set comprises a *layer*. The graph in a given layer contains relations of exactly one type. Consider a human brain in which two regions might show an increase in blood flow due to coupled neuronal activity and due to interactions involving nearby blood vessels themselves. To encode these two types of relations in a single representation, we could use a multilayer graph with two layers: one encoding the relations between neurons and another encoding relations between blood vessels. We note that when all layers contain the same set of nodes, the representation is called a *multiplex* graph. We invite the interested reader to reference (Kivelä et al. 2014; Bianconi 2018) for more rigorous definitions, and (Menichetti et al. 2016; Brummitt et al. 2012; Zhong et al. 2017) for implications for diffusion and control. Dynamic systems can be seen as a subtype of multilayer systems, in which the layers are a set of graphs ordered in time. Previous studies have used multilayer networks to model complex spreading processes (De Domenico et al. 2016; Sahneh and Scoglio 2014; Salehi et al. 2015), understand explosive word learning (Stella et al. 2018), and uncover the community structure of trade relations (Barigozzi et al. 2011). Multilayer simplicial complexes or hypergraphs would similarly include a set of simplicial complexes (respectively, hypergraphs) not necessarily defined on the same nodes in each layer. As of the time of this writing, we did not find applications yet of this extension. We suggest that these variations could prove useful for understanding multiple types of biological data collected on a set of nodes. As an example, one could encode common properties (mutation status, chromatin rearrangements, etc.) as layers in a multiplex network of cancer cell lines in order to better understand drug response (Rees et al. 2019)). The multilayer variation is readily applicable whenever researchers have access to and want to model two different fragments of the same system.

### Higher Order Networks

Higher Order Networks (HONs) are a variation of the graph formalism that aims to represent a certain kind of temporal polyadic relations. Instead of encoding system units as nodes, the HON encodes frequent paths or transitions in the data as nodes, which then allows us to interpret the final representation with the standard Markovian assumptions on edge sequences. Recall our example of commuting passengers in Figure 3. We can build a HON from the observed path data to encode the observed dynamics and temporal dependencies of this system in a particular kind of graph. In Figure 3, the more accurate subway map on the bottom right, reconstructed from the observed data, contains two nodes that correspond to the physical station $D$. The one labeled $D_B$ represents the passengers that arrive to $D$ from station $B$, while $D_C$ corresponds to those that arrive from station $C$. Similarly, the physical station $E$ splits into two nodes: $E_{DC}$ and $E_{DB}$. The nodes on this map do not correspond to the stations observed in the town’s transportation system, but to the possible passenger pathways through them. Indeed, as observed before, we never observe a passenger commute that traces the path $C-D-E-H$: all passengers that pass through stations $C-D-E$, in that order, then go on to station $F$, while all passengers that pass through stations $B-D-E$, in that order, go on to station $H$. Therefore, the representation on the bottom right, an example of a higher-order network or HON, is a more faithful representation of the observed data and its temporal dependency. Note that if the observed passenger data changed to include a route visiting stations $C-D-E-H$, the structure of the HON would change, even if the physical brick-and-mortar subway system, and its graph representation, would not. We discuss HONs in the next subsection and refer the interested reader to (Benson et al. 2016; Rosvall et al. 2014; Edler et al. 2017; De Domenico et al. 2015; Lambiotte et al. 2014; Perri and Scholtes 2019) for further details.

### Further variations

We note the above variations on the three main formalisms discussed are only the beginnings of possible ways to extend these representations. Depending on the complex system and questions at hand, certainly one may combine the variations described above to make, for example, an edge-weighted dynamic network (Khambhati et al. 2018), a directed multilayer network, or another combination that provides an effective representation. One may also study systems of weighted nodes instead of weighted edges (Sizemore, Karuza, et al. 2018; Murphy et al. 2016), or representations where each node has some kind of internal structure (Colizza and Vespignani 2008; Estrada et al. 2018). Any of the formalisms above could also lend itself to studying the intricacies of coupled dynamical systems such as coupled oscillators (Papadopoulos et al. 2017; Ott et al. 2008) or interacting threshold-linear models (Morrison and Curto 2019). Indeed when including variations on the three formalisms covered in this review, we find we can encode an impressive range of complex system types and properties.

### Other Formalisms

We recognize that many other formalisms intended for complex systems exist and that those we specifically mention in this review constitute only a small subset of the possibilities. Other possible formalisms include *graphons*, which describe limits of sequences of graphs and can be used to estimate large, noisy systems (Borgs and Chayes 2017), *metapopulation models* which classically describe global behavior of many local species populations (Levins 1969; Taylor and Hall 2011; Hanski 1999) and can be adapted to networks (Colizza and Vespignani 2008), random sequences of sets (Austin R. Benson et al. 2018b), and *sheaves* which can handle added information on each node in a network and have previously been used to frame the network coding problem (Ghrist and Hiraoka 2011) and find consensus in sensor networks (Curry 2014).

## Encoding system dependencies

As we discuss above, the formalism used to encode our data should be carefully chosen to respect any prominent properties of the system, and specifically the dependencies found therein. In this subsection we discuss the subtleties of choosing an appropriate formalism, and then review the common practices that researchers use to encode subset, spatial, and temporal dependencies using the formalisms we have introduced.

Once we have chosen which dependencies to model, it is important to carefully determine when two or more units in our system are related to each another – i.e. to define the relations in our model (Fig. 7.) Depending on the exact definition of the relations, the resulting representation may or may not exhibit the desired properties, or it may even exhibit properties not found in the actual system, but coming from externalities from the data, as discussed in Section 2.4.

For example, consider recording brain activity from an individual as they progress through different tasks (reading, watching a video, resting, etc.). Different tasks require the activation of distinct sets of brain regions. How do we define relations between brain regions? As depicted in Fig. 7, we could define $k$ nodes to be related if a task requires all $k$ nodes to be active. Alternatively, we could define a relation between $k$ nodes if the $k$ nodes were found to co-activate during a task. Finally we could call two nodes related if they have a high enough measure of pairwise similarity, perhaps assessed by correlation or mutual information. Depending on our chosen definition of node relations, our resulting representation either will or will not encode a subset dependency. In this example, only the definition of node co-firing exhibits a subset dependency, which we could capture in a simplicial complex representation. Now consider a city bus system fragment including stations, roads, and bus lines (Fig. 7, bottom). First, we could define a relation between $k$ nodes as the sets of stations along an entire bus route. That is, $k$ stations are related if they together form a whole bus route. This definition would propagate no subset or temporal dependencies to the representation. Second, we could instead call $k$ nodes related if they share at least one bus line. Consequently we now have a subset dependency that must be captured by our choice of representation. Third, we might define two bus stations as related if they are subsequent stops along a route. This third, inherently pairwise, definition of relation could be represented with a graph. Note that none of these three definitions encode the temporal dependency, which may or may not be present in the available data. For example, if we had access to, not only stations’ locations, but also passenger trajectories within the system, we could encode the temporal dependencies using HONs.

![[image-DDta.png]]

> **Native dependencies captured by the definition of relation.** *(Top)* We might record the on/off activity of four brain regions in each of four tasks (left). Depending on the definition of relation chosen (middle), we may or may not record a dependency in a representation (right). *(Bottom)* Given five bus stations placed along a set of roads (dashed lines), we observe three bus lines that connect the stations (left). Depending on the definition of relation chosen (middle) we might include a subset or temporal dependency, which we would want to capture in our representation of the system (right).

The above examples, and those in reference (Spivak 2009), illustrate the fact that one must carefully choose relations to effectively encode dependencies (Fig. 8), or, equivalently, that whether or not a given representation exhibits a dependency is a (sometimes subtle) question of semantics. This is to say, the modeling choices concerning relations, representations, and dependencies are highly, and unavoidably, interdependent on one another. We must be aware of what dependencies exist in the system, which of those are encoded or neglected in the representation, and which come from external sources. In the scientific community, these difficult choices are usually made following the common practices that we delineate next.

![[image-OTOs.png]]

> **Choosing a formalism marks the second step of our analysis pipeline.** Formalisms include graphs, simplicial complexes, and hypergraphs. We argue that the choice of formalism should be made in order to most faithfully capture system dependencies.

### Encoding subset dependencies

If a system exhibits subset dependency, it is common practice to use either simplicial complexes or hypergraphs to represent it. In the case when *any* subset of a set of related units are also related, then an appropriate formalism is the simplicial complex, since this formalism has the downward inclusion property (see Section 2.1). In the terms used in Section 2.1, the predicate $P$ is true for any subset of an existing relation. If instead only *some* subsets of related units are related, then one could argue that a hypergraph is the appropriate formalism to use, since it allows for great freedom in encoding relations among subsets of related units. Equivalently, a particular subset dependency gives a particular choice of the predicate $P$, which in turn induces a particular hypergraph. Recall that the important difference between hypergraphs and simplicial complexes is the notion of a subedge. Drawing from Remark 3.5 of (Spivak 2009), if a 1-simplex $\{a,b\}$ and two 2-simplices $\{a,b,c\}$ and $\{a,b,d\}$ exist, then by definition $\{a,b\}$ is a sub-relation (formally called a *face*) of both $\{a,b,c\}$ and $\{a,b,d\}$. However, if instead we had hyperedges $\{a,b\}$, $\{a,b,c\}$, and $\{a,b,d\}$ in a hypergraph, we cannot say if $\{a,b\}$ is a sub-relation (sub-edge) of $\{a,b,c\}$, $\{a,b,d\}$, both, or neither. This connection or lack thereof between relations and sub-relations crucially affects interpretation of the system representation.

### Encoding temporal dependencies

As discussed in Section [sec:hons], one way to encode temporal dependencies uses the idea of Higher Order Networks (HONs). Recalling our previous description, the HON begins with a set of paths, and from the patterns found therein creates a graph in which nodes correspond to ordered sets of units in the original system, and edges connect nodes based on temporal dependence. In this way, the HON takes the temporal dependency (for example, paths from A to B always lead to C), and encodes it in a special kind of node, derived from the original units of the system. At the time of writing, HONs have been defined for paths on graphs. It is still an open question how to extend the HON formalism to simplicial complexes or hypergraphs so that the resulting representation could exhibit both temporal dependencies and arbitrary subset (or spatial) dependencies.

### Encoding spatial dependencies

Possibly the most straight-forward method to encode spatial dependencies constructs a weighted graph in which the edge weights in some way represent how close or far nodes lie from each other. However, we highlight the fact that edge weights are a popular mechanism to also encode different kinds of information, and once we encode one piece of information within the edge weight we cannot then use edge weights to also encode spatial dependencies. For example, if we build a graph for the transportation system of a city, we may want to encode both traffic flow and road length. Usually, both types of information are encoded using edge weights, so we are left with three alternatives. The first is to choose an edge weight that aggregates both types of information. The second is to use a multilayer network (see 3.4) in which each layer has weighted edges reflecting a single type of relation (Chodrow et al. 2016). The third is to create a more holistic representation that efficiently combines the spatial information, traffic flow, and road length while also including any interactions between edge types. This challenge is yet another example highlighting that data availability, system dependencies, and choice of representation are not independent of one another.

If the only challenge to the study of complex systems were the choice of representation, then our discussion would be near complete. However, real-world systems usually have at least two or more dependencies, including those we do not discuss in this paper. For example, the subway network (Fig. 2.2) contains both temporal dependencies (evidenced in passengers’ routes) and spatial dependencies (the routes taken are usually constrained by geographical proximity); while the coauthor system (discussed further in Section 6) could be further constrained by both temporal and subset dependencies. Moving forward, we will need to develop novel methods for systematically representing and encoding complex systems with multiple dependencies.

# Mathematical relationships between formalisms

At this point it may seem that the choice of representation wholly restricts the perspective and possible analyses on the data. For example if we encode the data as a directed hypergraph, we can only perform analyses using hypergraph methods. However as each of these base formalisms record relations between nodes, perhaps we could utilize the underlying mathematical relationships between each of these formalisms to gain additional insights. In this section we will explore the formal mathematical relationships between graphs, simplicial complexes, and hypergraphs, and then we will discuss the assumptions needed or information lost as we move from one to another.

### From hypergraph to simplicial complex: Forgetting independent sets

First let us imagine that from our data we have constructed a hypergraph $H$. If we would like to create a simplicial complex $K_H$ from $H$, we might first map the nodes of $H$ to nodes of $K_H$, before dealing with the hyperedges. Recall that in a simplicial complex we have simplices that connect multiple nodes, but we also have the downward closure restriction that if we have a simplex $r$, then any $r' \subseteq r$ must also be a simplex. So then to form $K_H$ we could take any hyperedge connecting $k+1$ nodes and form from it a $k$-simplex (Fig. 9 top left), thereby forcing the downward closure of the hyperedge relation so that the system representation can abide by simplicial complex rules. Additionally note that if we have a hyperedge $a$ on nodes $\{v_0,\dots, v_k\}$ as well as a hyperedge $b$ on a subset of these nodes, the simplicial complex will view $b$ as redundant information, since by definition every subset of nodes in $a$ will be connected by simplices. In this way, we say that the simplicial complex “forgets” the existence of $b$ as a relation observed independently of all other relations (specifically observed independently from the relation $a$). We can also see this forgetting notion in the matrix representation of the structure itself: from a hyperedge incidence matrix we only need to keep the maximal hyperedge rows in order to build the corresponding simplicial complex incidence matrix. Additionally, $K_H$ will also lose information regarding the total number of relations in which a node is involved, since many of those original hyperedge relations may be a subset of another hyperedge relation. On the other hand, this procedure allows us to access methods that are available for simplicial complexes but not for hypergraphs (discussed more in Section 5). Overall, in the hypergraph each hyperedge between a set of nodes arises independently, so that having additional hyperedges (or the lack thereof) between subsets of nodes within a larger hyperedge indeed supplies more information than the one largest hyperedge. In contrast, we can define a simplicial complex by its largest simplices (formally called maximal simplices) alone.

![[image-rtAS.png]]

> **Transitioning between formalisms requires added assumptions or engenders forgetting information.** *(Top, left)* The original example system as a hypergraph. *(Top, middle)* When we send hyperedges to simplices, we create a simplicial complex, and *(Top, right)* by keeping all edges we form a graph. Going in the other direction, we begin with the same graph *(bottom right)*, fill in all cliques as simplices to obtain a simplicial complex *(bottom middle)*, and send maximal simplices to hyperedges to form a hypergraph *(bottom left)*. Note that the hypergraphs on the top left and bottom left differ from one another.

### From simplicial complex to graph: Forgetting polyadic relations

Next let us assume that we are given a simplicial complex $K$, and that from $K$ we wish to construct a graph $G_K$ that still represents our data. This transition is more straightforward, as we can take all of the 1-simplices of $K$ to be edges of the graph $G_K$. Said another way, if two nodes participate in the same $k$-simplex in $K$, then we draw an edge between these two nodes in $G_K$ (Fig. 9, top right). By performing this transition from simplicial complex to graph, we are now forgetting polyadic relations between nodes. For example, in a simplicial complex we may have three nodes connected by three 1-simplices, or connected by three 1-simplices and a 2-simplex; in a graph, by contrast, we can only show these three nodes as being all-to-all connected by edges thus eliminating our ability to distinguish between the two cases. One can also move from a hypergraph to a graph by drawing an edge between two nodes only if the two nodes were connected by a hyperedge. The resulting graph recovered from this process will be the same as the graph obtained by moving from a hypergraph to a simplicial complex to a graph following the described protocol.

### From graph to simplicial complex: Assuming polyadic relations

What happens if we instead move in the other direction? What are the assumptions necessary to take a graph such as the graph shown in Fig. 9, right, and construct from it a simplicial complex or a hypergraph? First, let us begin with a graph $G$ and construct a simplicial complex. If we make the assumption that all nodes involved in a $(k+1)$-clique of $G$ are related, then we can construct a simplicial complex $K_G$ by filling in each $(k+1)$-clique with a $k$-simplex. This particular construction is called the *clique complex* (Kahle 2009) or the *flag complex* (Kahle 2014), and is often denoted by $X(G)$ (Fig. 9, bottom right). We reemphasize that for this construction, it is necessary to assume that all nodes within a clique are all together related as a single functional unit. Importantly this clique-to-simplex assumption may not be appropriate for all systems. One example arises from social conversations in which three people may converse only in pairs and never together as a three-person group.

### From simplicial complex to hypergraph: Assuming that only maximal simplices are independent

As we consider moving from simplicial complex $K$ to hypergraph $H_K$ we are faced with a few options. First, since a simplex by definition implies that all subsets of nodes within a simplex are also related, then we could take every simplex and form from it hyperedges between all subsets of nodes within the simplex. In constructing the hypergraph in this way, we carry through the downward closure restriction. Alternatively, we could perform a conversion more akin to the inverse of the hypergraph-to-simplicial-complex conversion discussed above by adding a hyperedge for each maximal simplex of $K$ (Fig. 9 bottom left). Assigning hyperedges only for maximal simplicies can be seen as a conservative approach; that is, we can uniquely define a simplicial complex using its maximal simplices so that in forming the new hypergraph, we are assuming the fewest number of hyperedges necessary to preserve only the polyadic relations with the most nodes.

### From hypergraph to graph, and from graph to hypergraph

Perhaps most importantly, note that from a graph we can move to a simplicial complex, then to a hypergraph, then back to a simplicial complex, and finally back to a graph following the translations discussed above. In this process, we will recover the original graph with which we began. However, the opposite is not the case. As depicted in Fig. 9, we can begin with the hypergraph on the top left, move through the simplicial complex, to the graph, and then move back along the bottom row from right to left and we will in fact recover a very different hypergraph than the one from which we began. This exercise emphasizes the information lost or forgotten in moving down the formalism ladder. Specifically, since each hyperedge may arise independently of all others (most notably independently of any hyperedge that is a superset), we not only lose information when moving towards a graph but also cannot recover this information when moving back up from a graph to a hypergraph.

![[image-DyyW.png]]

> **Mathematical relations between formalisms add an optional step to the pipeline, only to be used with caution.** After an appropriate formalism has been chosen for system representation, one can make use of mathematical similarities between formalisms to view their representation from the lens of a different formalism. Importantly, we note that moving from hypergraphs to simplicial complexes to graphs can result in a loss of information, while the reverse direction can require one to make assumptions about the system.

We note that the above protocols of moving from one formalism to another do not encompass all possibilities. One could define a simplicial complex from a graph by simply keeping all edges as the 1-skeleton and having no larger simplices. Or perhaps one might form a weighted graph from a hypergraph by assigning edge weights as some function of the hypergraph structure (Neubauer and Obermayer 2009; Chodrow and Mellor 2020; Habibi and Khosravi 2018). Though we here discussed moving between formalisms as the third step in the pipeline (Fig. 10), moving from one formalism to another *after* the initial encoding of data into a formal representation should be performed only with extreme care, as any translation requires adding assumptions or forgetting relations or independencies.

# Methods suitable for each representation

Now that we have exerted the effort necessary to properly represent our data as a graph, simplicial complex, or hypergraph, how do we analyze the resulting structure? In this section, we will describe methods that can be used to evaluate precisely how each of the three base formalisms offer unique perspectives on the system under study. We recognize that many such methods exist, but for clarity we will focus on a few techniques that help us identify similarities among and differences between representations.

Before we begin, we briefly provide another a note of caution. The fact that a method of interest might currently intake only one particular formalism does not justify the use of that formalism in representing our data. To further illustrate the point, if we intend to understand the spread of a disease by way of calculating the epidemic threshold (Chakrabarti et al. 2008), we would find that existing methods to calculate the epidemic threshold do so from a graph representation. The theory of disease spread on hypergraphs and simplicial complexes currently is a nascent area of research (Iacopini et al. 2019; Jhun et al. 2019), so one might not find a definition of the epidemic threshold that uses either of these polyadic formalisms in the literature and is appropriate for the system at hand. Nevertheless, the absence of this particular notion for polyadic formalisms does not imply that we are justified in using a graph formalism to represent the system. Generally, a result is unlikely to offer fruitful insight into a system if the calculation was performed on a representation that itself is ill-suited for the system.

![[image-Jy91.png]]

> **Formalisms provide different perspectives on the neighborhood of a node.** *(Left)* The colored node has four direct neighbors and participates in two triangles. *(Middle)* The colored node has four direct neighbors and participates in one 2-simplex. *(Right)* The colored node has two neighbors connected to itself exclusively, and two neighbors accessible through a larger hyperedge.

## Methods for graphs

As the most well-known of the three formalisms in data analysis, graphs have offered scientists interpretable and easily-computable tools for centuries. Thanks to this rich history of graph analysis, we can computationally investigate graphs at many different levels: the local node or node-neighborhood level, a meso-scale level to see larger patterns, and the global level to summarize the entire object. Though myriad metrics exist, for the sake of brevity we limit our discussion below and point the interested reader to (Newman 2018) to learn more.

Analysis methods on graphs are relatively well-developed and expansive, reflecting their long and wide-spread employment in complex system research. In using them, we can learn a great deal about the system’s organizational structure by understanding the neighborhood of nodes within the graph (Fig. 11, left). At the most basic level, the number of edges incident to a node $v_i$ is called the node *degree* and is denoted $k_i$. The distribution of degrees can constrain the graph’s large-scale organization, for example tracking the emergence of a giant connected component (Molloy and Reed 1995). At the neighborhood level, we can investigate measures of the connectivity between a node’s neighbors. A common example is the *clustering coefficient* $c_i$ of a node $v_i$. Formally the clustering coefficient is $$\begin{equation}
    c_i = \frac{2\mu_i}{k_i(k_i-1)} \,,
\end{equation}$$

where $\mu_i$ is the number of edges between neighbors of $v_i$. The numerator counts the number of triangles in which $v_i$ participates and the denominator normalizes by the number of triangles that could possibly form around $v_i$. Broadly, the degree and clustering coefficient are examples of a much broader class of metrics proposed for the description of local and neighborhood structure in graphs.

Complementing such descriptions, other statistics have been defined to measure the nature of paths in the graph and markers of meso-scale structure. For example, the average path length, various types of centrality (Freeman 1977; Bavelas 1950), notions of modularity (Guimera et al. 2004; Krzakala et al. 2013; Palla et al. 2005), and the property of small-worldness have proven useful in the study of a wide variety of systems from the human brain (Bullmore and Sporns 2009; Bassett and Sporns 2017) to granular materials (Papadopoulos, Porter, et al. 2018). One particular statistic that, at the time of writing, we found to be unique to the graph formalism, is a measure of core-periphery structure. A graph with core-periphery structure contains a dense group of nodes connected to each other called the *core*, and a second group of nodes called the *periphery* that mostly connect to the core rather than to other nodes in the periphery (Borgatti and Everett 2000; Rombach et al. 2014) (Fig. 12, left). For a description of other network measures, we refer the interested reader to prior literature (Newman 2018; Rubinov and Sporns 2010). Additionally, we note that in real world systems, the values of many of these network statistics are statistically correlated with one another over instances in a graph ensemble, and these patterns of shared variance can be used to distinguish between types of systems (Costa et al. 2007; Onnela et al. 2012).

![[image-acCw.png]]

> **The three formalisms and their corresponding downstream analyses can offer different perspectives on a complex system.** *(Left)* For this example system, a graph representation suggests a global core-periphery organization. *(Middle)* A simplicial complex representation of the same system appears to show a globally circular structure. *(Right)* The hypergraph representation of the same system hints at the presence of two communities.

## Methods for simplicial complexes

Simplicial complexes entered the data analysis scene more recently than graphs. Yet, we can still use a simplicial complex to investigate multiple levels of system architecture with intuitive measures. As with graphs, we keep this section brief by focusing only on a few basic measures and then one measure that is unique to simplicial complexes.

We might first seek to extrapolate basic graph definitions to simplicial complexes. If we view a graph as the 1-skeleton of a simplicial complex, then the graph degree of node $v_i$ is the number of 1-simplices in which $v_i$ participates. By extending this idea, we can understand the neighborhood of a node (Fig. 11, middle) by defining the *simplex participation* of node $v_i$ as the vector $P(v_i)$ in which the $k^{th}$ element is the number of $(k-1)$-simplices in which $v_i$ participates. One could also record the vector of simplices in which the node participates (called the upper degree in (Serrano et al. 2020)), or the number of simplicies not contained in any larger simplices, i.e. the maximal simplices, in which the node participates (Sizemore, Giusti, et al. 2018). Similarly, we might ask whether and how the clustering coefficient could be extended to the simplicial complex formalism. Depending on the precise properties that one intends to capture, one could use a ratio of simplices from dimensions $k$ and $(k-1)$ to formalize the notion of a clustering coefficient. However, in the simplicial complex formalism each simplex can be considered as a fundamental building block, so it makes sense to also define a clustering coefficient for an arbitrary $k$-simplex as in (Maletić et al. 2008). In a complementary effort, the notion of centrality has recently been extended from the graph formalism to the simplicial complex formalism (Estrada and Ross 2018).

In addition to extending graph measures to simplicial complexes, we can also harness underlying algebraic topology to uncover more complicated motifs within the system. The downward closure requirement within the simplicial complex definition gives us the ability to accurately identify which simplices are involved in higher dimensional simplices. Consequently we can then detect where a dearth of simplices leaves topological voids in the complex (Fig. 12, middle). Detecting topological voids is the work of *homology*, and as homology relies on well-defined mappings from larger to smaller simplices, this method is best suited for the formalism of simplicial complexes.[2]

Simplicial complexes can also be “reversed” in a way that can be useful in understanding the structure of grouped nodes, while preserving the topological organization of the system. Consider constructing, for example, a simplicial complex in which nodes represent neurons of the zebrafish brain, and simplices represent co-activity during a task. We could encode the complex as a $\#simplices \times \#nodes$ binary matrix sometimes also called a concurrence matrix (Giusti et al. 2016; Dowker 1952). In the top left of Fig. 13 we show a small example concurrence matrix of five nodes ($1,2,3,4,$ and $5$) connected through four possible relations ($a,b,c,$ or $d$). We create a simplicial complex (Fig. 13, top right) by drawing maximal simplices between nodes that share a relation in the concurrence matrix. For the zebrafish example, the simplicial complex could contain relatively few simplices but orders of magnitude more nodes (depending on data availability of course), making calculations cumbersome. As an alternative, we could “reverse” the structure by constructing the *Dowker dual* (Dowker 1952). Here, the role of nodes is swapped with the role of relations (Dowker 1952). In the zebrafish example, we would form a node for each co-activity relation, and then connect two nodes by simplices if they share a participating region of the zebrafish brain. In Fig. 13 we transpose the concurrence matrix to swap the role of nodes and relations, and then show how we again create a simplicial complex now called the Dowker dual. This new complex will have the same number of nodes as the original complex had maximal simplices, so that if the number of relations was small with respect to the number of nodes in the original complex, studying the Dowker dual will be more computationally tractable.[3] Importantly, studying the Dowker dual preserves specific topological structure within the system (Dowker 1952): the homology groups of a simplicial complex and its Dowker dual are isomorphic. Thus, the Dowker dual can be an incredibly efficient representation, assuming that we still respect the scientific question at hand.

![[image-Xek9.png]]

> **Constructing the Dowker dual of a simplicial complex.** Given a concurrence matrix denoting which nodes connect via relations (top left), we can create a simplicial complex with each simplex defined by a relation ($a, b, c, d$). Alternatively, we could transpose the matrix so that now we have four nodes ($a, b, c, d$) and five relations (bottom left). From this transposed concurrence matrix we can then create a simplicial complex whose simplices are defined by relations in the new concurrence matrix (bottom right). This simplicial complex is called the Dowker dual of the original simplicial complex, and will have the same number of topological cavities.

## Methods for hypergraphs

Like simplicial complexes, hypergraphs have gained popularity only recently, as the field has begun to realize the importance of encoding polyadic relations in systems. The hypergraph formalism is a natural extension of the graph formalism, so unsurprisingly many (though certainly not all) computational methods for hypergraphs are extensions of computational methods for graphs. As with the other formalisms, we will highlight basic methods here as well as a method unique to hypergraphs.

The formalism of hypergraphs is also complemented with a set of descriptive statistics. Importantly, recall that each hyperedge arises independently since we have no rules relating hyperedges to each other, and consequently computations on hypergraphs must be interpreted differently from related computations on simplicial complexes. Starting simply, we can first extend the concept of degree to hypergraphs. In a hypergraph, the degree of a vertex $d_H(v_i)$ is the number of hyperedges containing $v_i$, sometimes called the *hyperdegree*. Since hyperedges can connect any number of nodes, we also define the *hyperedge cardinality*, also called the *hyperedge degree*, as the number of nodes contained by the hyperedge. Importantly, note that in the definition of vertex degree, we do not stratify by hyperedge cardinality as the appearance of a large hyperedge gives no information about the existence of smaller hyperedges. Instead, a large hyperedge is simply another relation that contains our node of interest.

In order to understand a node’s neighborhood in a hypergraph (Fig. 11, right), next we move to a definition of the hypergraph clustering coefficient (see (Klamt et al. 2009; Estrada and Rodrı́guez-Velázquez 2006; Peña and Rochat 2012; Gallagher and Goldberg 2013) for others). Recall the graph clustering coefficient measures connectivity of a node’s neighbors via connections that *do not* include the node of interest. If we examine, for example, node $v_i$ and its neighbors, some neighbors will be connected via hyperedges that do or do not include $v_i$. Intuitively, node $v_i$ should have high clustering if its neighbors connect via hyperedges that do not contain $v_i$. The *extra overlap* $EO(v_i)$ of a node $v_i$ helps us to quantify this idea; formally, the extra overlap of two hyperedges $e_j, e_k$ is defined as $$\begin{equation}
    EO(e_j,e_k) = \frac{|N(D_{j,k}) \cap D_{k,j}| + |D_{j,k} \cap N(D_{k,j})|}{|D_{j,k}|+|D_{k,j}|},
\end{equation}$$

where $D_{j,k} = e_j - e_k$ and $N(U)$ is the set of all nodes that are neighbors of any node within the set $U$. Then intuitively the extra overlap between two hyperedges counts the number of nodes connected by outside hyperedges, and we normalize by the size of the two hyperedges under consideration. Note that if we have only hyperedges of cardinality 2, then the extra overlap over two edges involved in a triangle is 1. Finally, the hypergraph *clustering coefficient* $C_H(v_i)$ of a node $v_i$ is

$$\begin{equation*}
C_H(v_i) = 
\begin{cases}
  \dbinom{|M(v_i)|}{2}^{-1}\sum\limits_{e_j,e_k \in M(v_i)}EO(e_j,e_k) \text{  if $d_H(v_i) > 1$}\\      
  0 \text{  if $d_H(v_i) = 1$}
\end{cases}
\end{equation*}$$

where $M(v_i)$ is the collection of hyperedges that include $v_i$ (Zhou and Nakhleh 2011). This definition for the hypergraph formalism is thus similar in spirit to the definition of a clustering coefficient for a graph. Indeed, the former is equivalent to the latter when all hyperedges have cardinality 2.

We note that the hypergraph also has the ability to uniquely represent the absent substructures of a system. Much like identifying repeated structural patterns (or *motifs*) in a graph, a hypergraph allows us in principle to identify repeated patterns of *absent* hyperedges. We may have a case where, for example, pairwise hyperedges exist between four nodes that also connect via a 4-hyperedge, but no 3-hyperedges exist. An interesting research question for such a representation is to ask why we observe a lack of three-node relations but an abundance of 2-node relations within every 4-node relation. Note that neither graphs nor simplicial complexes allow for this line of questioning due to the lack of polyadic relations or the requirement of downward inclusion, respectively. A detailed investigation of these absent substructures is outside of the scope of this paper; yet, we can take a step in that direction by defining the following statistic, which we call the *fill coefficient* of a hyperedge $h$, as

$$\begin{equation}
f(h) = \frac{|g \in E: g \subsetneq h \text{ and } |g| > 1|}{2^{|h|} - 2 - |h|},
\end{equation}$$

where $E$ is the set of hyperedges, and $|\cdot|$ is the cardinality of a hyperedge. The fill coefficient intuitively describes the fraction of smaller hyperedges that exist within hyperedge $h$, taking into account the hyperedge cardinalities.

## Methods and dependencies

Before closing this section, we note that both in choosing analyses and in interpreting results, we need to keep in mind the dependencies within the system. For example, after creating a simplicial complex from our data, how do we interpret its clustering coefficient? Or what does the diameter of a system mean when we have hyperedges of different cardinalities linking nodes instead of (dyadic) edges? How do communities found from a simplicial complex (Billings et al. 2019) with subset dependencies differ from communities found within a hypergraph (Kim et al. 2017) without such dependencies? Can we intertwine different sorts of system dependencies to understand their impact on function? Examples of such intertwining methods include (i) Rentian scaling, which formalizes the interaction between structure and geography (Christie and Stroobandt 2000; Bassett et al. 2010; Papadopoulos, Blinder, et al. 2018), and (ii) modularity maximization with spatial null models (Expert et al. 2011; Betzel et al. 2017). Careful consideration of the above questions can only lead to better motivated, more interpretable, and insightful results.

![[image-kwrQ.png]]

> **Updated analysis pipeline includes consideration of which computational methods to perform on the chosen representation, and what distinct or complementary perspectives these methods offer.** The last step in our pipeline involves computationally analyzing the system representation. We note that each analysis provides its own perspective on the system representation. We recommend performing steps 1-4 with careful consideration in order to gain real insight into the system.

To summarize, we see that each base formalism offers a particular perspective on the data it encodes. As we show in Fig. 12, the choice of formalism can influence how we interpret the complex system structure. The graph representation could suggest a core-periphery structure; the simplicial complex representation lets us see that globally the system organizes around one circle; and the hypergraph representation highlights the existence of two communities. We close this section by emphasizing the importance of formalism choice for proper representation of the data, and the appreciation that each analysis performed or pipeline chosen offers a different perspective on the underlying complex system (Figure 14).

# Examples

Putting it all together, in this section we will discuss examples of a system, its dependencies, and how we might represent the system using the formalisms described above. We will then explore possible analyses on each representation and compare results. Importantly, we will see that the subtle differences in representations and their definitions can lead to inconsistent results and conflicting interpretations.

## Coauthorship

Consider the system made up of scientific researchers who interact to write scientific papers (for example, (Clauset et al. 2017)). What kind of dependencies govern the relations in this system? How should we encode this system formally? In the following paragraphs we analyze a fragment of this system following the workflow of Fig. 14. We begin with a toy example (Fig. 15) and later perform similar analyses on a real dataset (Fig. 16)

#### Dependencies

First, we may expect to find spatial dependencies in this system, as the country of origin or university affiliation of a researcher may dictate which of their colleagues are willing or able to collaborate. Second, we may also expect temporal dependencies, as a researcher’s past collaborators may also influence any future collaborations. Third, whether this system exhibits subset dependencies depends upon which precise fragment we are interested in studying. If we focus solely on authors and consider two or more authors as related whenever they have worked together at some point, then it is necessarily the case that whenever a group of three authors have coauthored a paper, then any two of them have coauthored a paper, and therefore a polyadic relation always implies all dyadic sub-relations (and all smaller polyadic relations). On the other hand, we may choose to focus on both researchers and scientific papers, in which case, we may want to think about one scientific paper as determining a single relation. In this scenario, the fact that three researchers are involved in a relation (because they have authored a paper all together) does not imply that two of them have authored (another, separate) paper together. We will keep these dependencies in mind as we move through the later analysis steps.

#### Externalities: data availability

In a vacuum, we may expect to see all of the aforementioned dependencies in this system. However, the data available may be biased in such a way that, for example, researchers working (and papers produced) in one particular country are over-represented. In this case, the data available may not adequately record the spatial dependencies involving, for example, researchers who travel frequently between two different countries. Moreover, if the dataset is further biased to include solely researchers that work in one particular institution, then it is possible that no spatial dependencies are recorded at all, since researchers in one institution may all work with one another with the same likelihood; that is, the location of one existing collaboration offers no new information about the likelihood of another collaboration. Importantly, access to the full data about researchers and scientific papers would allow us to build naturally any of the three formalisms discussed. However, if we only have information about co-authorship (which sets authors have worked with each other) rather than full knowledge of the data, we would only have been able to construct the graph version or the simplicial complex version, but not the hypergraph version[4].

#### Externalities: research question

Let us introduce a toy example to accompany our discussion. Consider a coauthorship dataset including four authors $a_1,a_2,a_3,$ and $a_4$ who have written four papers $p_1,p_2,p_3,$ and $p_4$ (Fig 15, top). The three papers were authored as follows: paper $p_1$ was authored by $\{a_1,a_2\}$, paper $p_2$ by $\{a_2,a_4\}$, paper $p_3$ by $\{a_1,a_2, a_3\}$, and paper $p_4$ by $\{a_3,a_4\}$. This toy example illustrates that whether the chosen representation reflects the dependencies inherent to the system is sometimes a subtle question of semantics. For example, if the relations in our representation are defined using the first question (“has this pair of authors worked together on at least one paper?”), then the set of relations will necessarily exhibit a subset dependency, regardless of whether or not the data available records a subset dependency found in the real system. Said another way, one must be aware of which dependencies reflected in our representations come from the system, from how the data was collected, or from the representation constructed. In this example it is the question at hand, the intricacies of the system under study, and the data available that all together guide the choice of representation of these data.

#### Representations

If we take this information and construct the classic coauthor network in which an edge exists between two authors if they have appeared as coauthors on a paper, then we recover the graph shown in Fig. 15, top right. In particular, note that as we construct the co-authorship graph, we ask the following question exactly once for each potential relation: “Has this *pair* of authors worked together on at least one paper”? Alternatively, we can consider polyadic relations between authors and ask “has this *set* of authors worked together on a paper?” This question naturally yields a simplicial complex (Fig. 15, middle right), in which nodes form a simplex if the corresponding authors are a subset of the authors of at least one paper. Finally, we imagine the author list of the paper is non-redundant so that one paper corresponds to exactly one relation. Said another way, we respect that without each and every author, the paper could not have been completed. If we take this point of view, we will instead construct a hypergraph by repeatedly asking “Has this set of authors exclusively (needing no other authors) written a paper together?” This approach retains the large group of three authors, but now clearly shows that, for example, authors $a_1$ and $a_3$ have not worked on a project as an exclusive group. Note that this information is not recoverable from either of the other representations.

![[image-1QQQ.png]]

> Example of different perspectives offered by each formalism on a co-author dataset. The data (far left) consists of a list of papers and their author list. Based on a question about what defines relations between authors, we build either a graph, simplicial complex, or hypergraph (right). If we started with the graph, we could also use the relations between formalisms to create a simplicial complex or hypergraph (far right), though this process can result in inaccurate representations of the original data.

#### Methods and Analyses

Next we analyze the three different system representations. Of our coauthor representation (graph, simplicial complex, or hypergraph), we might first ask a simple question about the involvement of a node (author) in paper writing in order to gauge the author’s productivity. In the graph, we might use the node degree to recover this information, which would tell us that authors $a_2$ and $a_3$ participate in the same number of collaborations. Moving to the simplicial complex, we see by looking at node participation in maximal simplices that again authors $a_2$ and $a_3$ could be described as equivalently collaborative. However, in the hypergraph representation, if we look at node degree we see clearly that $a_2$ has participated in more collaborative projects than any other author, a conclusion that we are only able to draw from the hypergraph representation. A similar experiment comparing authors $a_1$ and $a_4$ shows that in this scenario, both the simplicial complex and hypergraph encodings view these authors as having different sizes of collaborative projects, while the graph structure does not. Specifically, the graph tells us that both $a_1$ and $a_4$ have worked with $a_2$ and $a_3$; the simplicial complex tells us that $a_1$ worked collectively with $a_2$ and $a_3$ whereas $a_4$ only worked individually with $a_2$ and $a_3$; and finally the hypergraph tells us that $a_1$ had an individual project with $a_2$ as well as a team project that also included $a_3$ while $a_4$ only worked on two-person papers. These analyses illustrate how the subtle differences in the three discussed representations and associated downstream analyses can yield insights that may be at odds with one another.

#### Relationships between formalisms

In this toy example we constructed each of the three representations directly from the data itself, with full knowledge of the raw data. However, we could also imagine that we are given the data already represented as one formalism and then try transforming our representation to another formalism. If we begin with one representation and translate to another formalism, will we recover the same information as if we had constructed the structure directly from the data? Here if we begin from a graph and move to a simplicial complex by attaching simplices to cliques (i.e. construct a *clique complex*), we recover a simplicial complex with two maximal simplices formed by $a_1,a_2,a_3$ and $a_2,a_3,a_4$ (Fig. 15, far right). Moving then from simplicial complex to hypergraph we would form a hypergraph with two hyperedges between $a_1,a_2, a_3$ and $a_2,a_3,a_4$; see Fig. 15, far bottom right. If we asked the same questions about author participation as we did above, then we would find that both pairs ($a_2,a_3$ and $a_1,a_4$) now seem to contribute in exactly the same way across representations. In studying complex systems we may receive only one representation of the system rather than the raw data, which can make switching to a different representation that perhaps better suits the planned analyses enticing. However, the present exercise underscores the importance of understanding the assumptions made by each formalism; care must be taken when moving between formalisms, not simply in recasting the mathematical language used, but also in remaining true to the original data.

#### Real dataset example

We close this example by illustrating the above points in a real coauthorship dataset extracted from the DBLP computer science bibliography database (Austin R. Benson et al. 2018a). This dataset consists of 3,700,681 scientific articles published between the years 2000 and 2016, as well as the list of authors of each article, for a total of 1,930,378 authors. Using this dataset, we build separately a graph, a simplicial complex, and a hypergraph directly from the data for each year contained in the dataset. In each representation, we measure the degree of each node, using the definitions in Section 5. Figure 16a contains a scatter plot showing the degree of each node as measured in the different representations corresponding to year 2016. In this dataset, the degree in any representation is positively correlated to the degree in any other representation, though progressively less so as the degree of the node decreases. This result means that the different representations often agree more on which nodes have the largest degrees than on which nodes have small degree. This is important to keep in mind, especially in studies that make claims about the nodes of small degree, which often outnumber those with large degree.

To see how this correlation changes over time, for each year we calculate the Spearman rank correlation coefficient, which quantifies the similarity in node degree rankings between two representations. The Spearman rank correlation coefficient is equal to $1.0$ when the rankings are equal, and $-1.0$ when the rankings are exactly reversed. Shown in Fig. 16b, we measure this coefficient for each year and each pair of representations. We observe the highest correlation between degrees calculated from the simplicial complex representation (participation in maximal simplices) and degrees calculated from the hypergraph representation (number of hyperedges in which a node participates), which is likely due to the fact that these two representations both encode the polyadic relations in the dataset. This result suggests that relatively few papers authored by a subset of the authors of another paper were written. We also observe that the degrees calculated from the graph representations show a comparatively low correlation to the node degrees calculated from the other representations. In particular, the correlation between the graph and the hypergraph drops below $0.5$ in some years, signaling a very different result when ranking nodes by graph degree or by hypergraph degree. Our observations imply that, in this dataset, we should be careful when making broad claims regarding the degree of nodes, especially those with few observed relations (i.e. small degrees), as each representation may yield different results that must be interpreted accordingly.

In summary, we have used this example to illustrate each step of the workflow from Figure 14, as well as to show that using different representations of the same dataset may yield measurements that are at odds with each other, even in the simple case of measuring node degree.

![[image-Yb1M.png]]

> Correlation among degree measurements in different representations of the same dataset. *(a)* Comparing the degree calculated from the graph or hypergraph representation (left), from the simplicial complex or hypergraph representation (middle), and from the graph or simplicial complex representation (right) from the coauthorship dataset extracted from the DBLP computer science bibliography database in year 2016. Correlation is relatively high for nodes of large degree, but relatively low for nodes of small degree. *b* Spearman correlation coefficient calculated between node degrees from pairs of data representations in each year.

## Email communications

In our next example we again follow the the workflow of Fig. 14, but more succinctly. While in the previous example we discussed multiple types of dependencies, variations in data availability, and differing research questions, here we provide an example of a seemingly straightforward analysis on a dataset of emails.

We start by considering the following scenario. Suppose Ana works at a company and is tasked with improving communication and cohesiveness between teams in the workplace. Ana works at a big company that contains many teams in diverse areas, so she decides to prioritize her involvement by focusing on average team communication via an easily accessible medium such as email. Concretely, Ana wants to evaluate how well each team integrates with all members of the company, which translates to evaluating the average clustering coefficient of each team. For this purpose, Ana has collected all the internal email communications. She decides to operationalize her task as follows. First, if a set of at least $5$ people have all received the same email at the same time, she will assume they must be working together as a team. Second, she decides to focus on emails with at most $25$ participants, as emails with more than 25 participants are likely company-wide communications that do not involve a single team working together. Third, having identified a team, she will quantify the team’s cohesiveness by averaging the clustering coefficient of each member in the team. Note that in this system we represent no spatial dependencies as email allows instant communication regardless of geographical location. Further, Ana only cares about the teams and communication that have already occurred, and is not hoping to predict communication in the future, so for the presented analysis on aggregate communication she does not need to incorporate any temporal dependency that might exist within the system.

To follow up with her plan, Ana needs to choose a formalism with which to encode the data, as well as how to measure the clustering coefficient. If she chooses to encode the system as a graph where each employee is a node and each edge joins two nodes if they simultaneously received the same email, then she may use the clustering coefficient defined in Section 5.1. Alternatively, she may choose to build a hypergraph where each node is an employee and each hyperedge denotes a single email, and use the clustering coefficient defined in Section 5.3. A priori, one might expect that measuring the average clustering of a set of nodes in the graph is highly correlated to measuring the same quantity in the hypergraph. However, we will see that the subtle differences in definitions lead to varying results.

![[image-c77t.png]]

> Graph clustering and hypergraph clustering coefficients are loosely related. For different ranges of hyperedge cardinality, the average clustering coefficient of nodes within a hyperedge calculated with the projected graph definition is compared to the average clustering coefficient calculated from the hypergraph representation. Scatterplot points are colored by the $log (fill coefficient)$.

For this example, we use a dataset of email communications (Austin R. Benson et al. 2018a), containing $10,883$ emails among $148$ employees of a company, from March 1999 to October 2002. Each email has a corresponding set of participants which includes the sender and all recipients. In Figure 17 we see the results of Ana’s analysis on this dataset, using both a graph and a hypergraph representation of these data. Each marker represents an email with between $n$ and $25$ participants, for $n = 5,6,7,8$. Each email is located according to the average clustering coefficient of the email’s participants, as measured in the graph (horizontal axis) and in the hypergraph (vertical axis). In the top left panel we can see that there is very little correlation between these two quantities for teams of at least $5$ people (Spearman rank correlation coefficient $r=0.1$, and associated p-value $p=0.16$). These results show that ranking teams of employees using these two different clustering coefficients yields very different results. Consequently, if Ana wants to prioritize teams in order of how much she needs to intervene, in other words by ranking the teams according to average clustering coefficient, then the graph and hypergraph representations will recommend very different courses of action. Indeed, Ana would need to allocate her resources in entirely different ways depending on which representation she chose. This result does not change if Ana chooses to focus on teams of at least $6, 7$, or $8$ people, as shown in Fig 17.

Next, Ana decides to distinguish between team cohesiveness with the company and intra-team cohesiveness. That is, do those teams that communicate well with everyone in the company also have robust within-team communication? A team that has excellent internal communication would have a high fill coefficient, which recall measures the fraction of possible smaller hyperedges that exist between the nodes of a hyperedge (see Section 5.3). In order to answer this question Ana calculates the fill coefficient of each team and adds this information as color on her scatterplots (Fig. 17). By eye her results show no relationship between a team’s cohesiveness with the company (clustering coefficient calculated from the graph or hypergraph representation) and a team’s internal cohesiveness (fill coefficient).

Together, these experiments illustrate that even in the case when a) the research question is fixed, b) the researcher has access to the full dataset, and c) there are little-to-no interactions among different types of dependencies, the choice of representation alone may still yield different insights by virtue of the different assumptions made by each (here dyadic *versus* polyadic interactions).

# Applications

We can naturally encode myriad systems in the real world with at least one of the formalisms discussed in this work. Still, often we focus on analyzing a system from a *particular* perspective and spend less time imagining how alternative analysis pipelines may be more revealing – or indeed more true to the system – than the currently used pipeline. Here we consider the alternative perspectives offered by the dependencies, formalisms, and challenges we have discussed in this paper.

First we consider the brain. The brain can be naturally conceived of as a system of individual parts that work together to form large functional units at different scales: neurons work together to communicate with each other forming co-firing patterns called *code words* (Curto et al. 2017), multiple neuronal populations collaborate in order to plan and evaluate trajectories (Ólafsdóttir et al. 2018), and entire brain regions work in unison to form functional networks (Gallen and D’Esposito 2019). Scientists have successfully studied the brain by encoding it at any one of these scales using the representations discussed in this work (Betzel and Bassett 2017). For example, with graph representations researchers found the brain to exhibit small-world (Bassett and Bullmore 2006; Bassett and Bullmore 2017; Muldoon et al. 2016), modular architecture (Sporns and Betzel 2016; Gallen and D’Esposito 2019), and hubs (Achard et al. 2012, 2006). Using the simplicial complex representation, at the larger scale cavities in the structural adult brain were observed (Petri et al. 2014; Sizemore, Giusti, et al. 2018), and at a smaller scale researchers detected the geometric structure of pyramidal neuron firing patterns (Giusti et al. 2015). Finally, research employing a hypergraph representation has identified functional hub hyperedges (Wang et al. 2012), characterized types of hyperedges in developing children (Gu et al. 2017), and tracked changes in brain organization over both short (Bassett et al. 2014; Davison et al. 2015) and long time scales (Davison et al. 2016).

Looking to the future, one particularly little-understood aspect of the brain is the impact of temporal dependency. How do specific relations affect the existence of any other relations in the future? For example, can a brain transition from any arbitrary state to any other state (Cornblath et al. 2020), or is its future activity bound by its past activity (Barnes et al. 2009; Wegner et al. 2017)? Though the field has used temporal networks to investigate time-varying activity, at the time of writing we did not find the inclusion of temporal dependencies within the representation. We suggest the application of higher-order network representations to deepen our understanding of temporal dependencies in this complex system. Additionally, at all scales the brain is spatially embedded (Stiso and Bassett 2018), and previous work has shown that the strength of connections between brain regions often depends on the euclidean distance between them (Horvát et al. 2016; Rivera-Alba et al. 2011). Often the analysis pipeline involves comparing any computed results on the empirical data against a spatially-embedded null model (Betzel et al. 2017), or co-modeling the spatial relations and other relations such as by examining Rentian scaling (Bassett et al. 2010; How and Navlakha 2018; Sadovsky and MacLean 2014). While these approaches do help to determine dependence of spatial features on other features, we suggest taking an additional step to directly encoding spatial dependencies in the formal representation of the data. For example, multilayer representations or sheaves encoding position information may be of help here.

Next we consider transportation, which is another well-studied system in network science. Transportation networks come in two different types: systems where the movement is done along fixed routes (such as roads, train tracks, power lines, or airline paths (Rodrigue 2016; Bast et al. 2016; Seaton and Hackett 2004; Pagani and Aiello 2013; Colizza et al. 2006)), and systems where the movement is done freely through (outer) space (Ross and Lo 2001). Among these, analyses specifically of public transportation networks have incorporated multilayer networks (Von Ferber et al. 2009) or variations thereof including internal node structure (Shanmukhappa et al. 2018), and have also evaluated system-specific measures that include spatial organization (Ferber et al. 2007). Analyses involving temporal representations have included investigating congestion clusters in road networks (Rempe et al. 2016) and how to alleviate them (Ji and Geroliminis 2011). These analyses usually consider spatial and temporal dependencies by assigning weights to the representation’s relations associated to distances or travel times (Porta et al. 2006; Scheurer et al. 2008). Importantly, studies are beginning to encode the temporal dependency in the representation itself, as higher order networks have revealed these temporal dependencies in data from global shipping and web browsing (Xu et al. 2016).

The subset dependency is studied far less often than other types of dependencies in transportation systems. For example, in a public transport system, if relations are defined among $k$ stations if there exists a route $X$ that stops at all $k$ stations, then certainly any subset of those $k$ stations must also be related by route $X$. Alternatively a subset dependency may or may not exist within traversed paths. For example, perhaps we observe paths of length $k$ but we do not observe smaller sub-paths. How might the identification or inclusion of subset dependencies within the transportation system improve our ability to prevent system failures or predict future activity? Additionally, we suggest further investigation of polyadic relations in these systems with simplicial complexes or hypergraphs where appropriate, as these representations may elucidate previously hidden system properties.

Finally we consider applications in cellular systems composed of any subset of proteins, genes, regulatory units such as enhancers, epigenetic factors, and more (Fionda 2019; Alon 2007). Most commonly the field studies system fragments such as genetic regulatory networks (GRNs) (De Jong 2002; Walhout 2011; Emmert-Streib et al. 2014) and protein-protein interaction networks (PPINs) (De Las Rivas and Fontanillo 2010; Raman 2010). Unlike the above two examples, this application differs in that only in rare situations can real-world interactions be observed. Consequently, tremendous effort focuses on network reconstruction from data, i.e. inferring the interactions from indirect measurements (Oates and Mukherjee 2012; Vinci et al. 2019; Albert 2007). Temporal information such as fluctuations in RNA counts (Spies and Ciaudo 2015) and spatial information such as co-localization (Mardakheh et al. 2017) can be used to reconstruct the network of interactions. Often, for example in the system fragment of proteins and protein complexes, polyadic relations exist and have been encoded using simplicial complexes or hypergraphs (Ramadan et al. 2004). Multilayer representations have also been used for representing multiple biological layers important in disease (Halu et al. 2019) and for inferring protein function (Zhao et al. 2016).

The difficulties associated with macromolecule-interaction systems create an enticing problem for developing system representations. Since the existence of interactions can rarely be observed directly, perhaps a representation with weights indicating the probability of the existence of each relation might be a useful alternative. In such a case, one might consider studying an ensemble of graphs, simplicial complexes, or hypergraphs instead of only one, and differentiating among them based on the likelihood of each one being a faithful representation of the real system. Additionally, though polyadic relations are known to play an important role in these systems (Taylor and Ehrenreich 2015), simplicial complex and hypergraph representations are more rarely employed (examples include (Estrada and Ross 2018; Shnier et al. 2019; Klamt et al. 2009). Finally, temporal fluctuations are becoming easier to record in these systems (Savulescu et al. 2019), which poses the opportunity to directly study temporal dependencies.

# Discussion and Conclusion

In this work we examined each step of a data analysis pipeline suitable for studying complex systems (Fig. 18). We first discussed system dependencies which can manifest in different flavors including but not limited to temporal, subset, and spatial. We then defined common complex system formalisms and their underlying assumptions, as well as which dependencies they encode. We discussed the mathematical relationships between formalisms, and how information can be lost (or imputed) as we convert data from one formalism to another. Finally we offered analysis examples in order to underscore the importance of dependencies, careful choice of representation, and analysis techniques in studying complex systems.

![[image-piDq.png]]

> Complex system analysis pipeline discussed in this paper. We suggest beginning with considering how the research question, data availability, and system dependencies may influence downstream analyses. We discussed subset, spatial, and temporal dependencies (red). We suggest choosing a formalism (navy) that preserves and respects dependencies within the system and data. Formalisms themselves are mathematically related (light blue), but switching formalisms after the initial data encoding can result in making inaccurate assumptions or forgetting independent relations. Finally, choosing the appropriate analysis method for the system and representation (green) after all other steps have been performed carefully can offer insight into the system’s behavior, structure, or function.

The main message of our work is that there is no perfect way to analyze a system, and that studying two different systems may require two entirely different pipelines. That is, the modeling decisions made while studying one dataset compiled from a system will not necessarily carry over to another system or, indeed, not even to another dataset extracted from the same system. In contrast, we see many studies apply certain pipelines for seemingly no other reason than because they are common within a certain field. Instead, we recommend that each new system and dataset be individually evaluated and investigated, and each assumption and pipeline decision be made in accordance with the concepts discussed here. More specifically, and following Fig 18, we suggest designing pipelines based on the system and system dependencies, any external dependencies that may be induced by the data type or data collection method, and the limits of the system fragment under study. From there, we suggest choosing a formalism that best fits the data, the research question, and the system itself, even if it requires using a new formalism or extension that is outside of what is customary. Finally, we recommend choosing carefully the specific methods, measurements, and analyses done on the chosen representation, and keeping in mind that their results may be biased by the choices made in the previous stages. Different choices at each of these steps may ultimately yield results that are at odds with the results yielded by other choices. Only after respecting the system’s dependencies and unique qualities through proper representation and analysis methods will we uncover novel insight into the system under study.

Though here we present only a first attempt to unify the application of complex systems analyses, we hope that the drive for more accurate representations will continue to push the field both forward *and* closer together through multiplying collaborations. We imagine that complex systems researchers in the future may each have a slew of representations along with carefully chosen computations that respect the dependencies one finds within the system. By continuing this discussion, the separate areas of science that use complex systems analyses will together identify what is missing from current formalisms, create more insightful analyses, and generate novel techniques.

# Acknowledgments

First and foremost, we wish to acknowledge the colleagues, coauthors, mentors, and mentees who have shaped our perspective on this subject. Finally, we acknowledge critical financial support that allowed us to devote time to this work. ASB and DSB acknowledge support from the Army Research Office (Falk-W911NF-18-1-0244, Grafton-W911NF-16-1-0474, DCIST- W911NF-17-2-0181), the National Science foundation (PHY-1554488, IIS-1926757), and the Paul G. Allen Family Foundation. LT and TER were supported in part by the National Science Foundation (IIS-1741197) and by the Combat Capabilities Development Command Army Research Laboratory (under Cooperative Agreement Number W911NF-13-2-0045). The views and conclusions contained in this document are those of the authors and should not be interpreted as representing the official policies, either expressed or implied, of the Combat Capabilities Development Command Army Research Laboratory or the U.S. Government. The U.S. Government is authorized to reproduce and distribute reprints for Government purposes not withstanding any copyright notation here on

# Citation diversity statement

Recent work in several fields of science has identified a bias in citation practices such that papers from women and other minorities are under-cited relative to the number of such papers in the field (Dworkin et al. 2020; Maliniak et al. 2013; Caplar et al. 2017; Chakravartty et al. 2018; Thiem et al. 2018; Dion et al. 2018). Here we sought to proactively consider choosing references that reflect the diversity of the field in thought, form of contribution, gender, and other factors. Gender bias can arise due to explicit and implicit bias against a person’s known gender as a woman, or due to explicit or implicit bias against a person carrying a name commonly used by women (MacNell et al. 2015; Paludi and Strayer 1985; Moss-Racusin et al. 2012). To evaluate the former (bias according to known gender), we obtained predicted gender of the first and last author of each reference using pronouns affiliated with them online or pronouns known by personal friendships; by this measure (and excluding self-citations to the first and last authors of our current paper), our references contain 45% man(first)/man(last), 12% man/woman, 11% woman/man, 13% woman/woman, 0% non-binary , and 19% unknown categorization. This method is limited in that pronouns may not be indicative of gender identity, and may not be consistent across time or environment. To evaluate the latter (bias according to a gendered name), we used databases that store the probability of a name being carried by a woman; by this measure (again excluding self-citations), our references contains 60% man/man names, 12% man/woman names, 11% woman/man names, 10% woman/woman names, and 7% unknown categorization (Zhou et al. 2020; Dworkin et al. 2020). This method is limited in that it cannot account for intersex, non-binary, or transgender people. We look forward to future work that could help us to better understand how to support equitable practices in science.

2020, The Apache Software Foundation. n.d. “Apache Airflow.” In *Apache Airflow*. [Https://airflow.apache.org/](https://airflow.apache.org/). <https://airflow.apache.org/>.

Achard, Sophie, C Delon-Martin, P E Vértes, et al. 2012. “Hubs of Brain Functional Networks Are Radically Reorganized in Comatose Patients.” *Proc Natl Acad Sci U S A* 109 (50): 20608–13.

Achard, Sophie, R Salvador, B Whitcher, John Suckling, and Edward Bullmore. 2006. “A Resilient, Low-Frequency, Small-World Human Brain Functional Network with Highly Connected Association Cortical Hubs.” *J Neurosci* 26 (1): 63–72.

Albert, Réka. 2007. “Network Inference, Analysis, and Modeling in Systems Biology.” *The Plant Cell* 19 (11): 3327–38.

Alon, Uri. 2007. “Network Motifs: Theory and Experimental Approaches.” *Nature Reviews Genetics* 8 (6): 450–61.

Amaral, Luıs A Nunes, Antonio Scala, Marc Barthélemy, and H Eugene Stanley. 2000. “Classes of Small-World Networks.” *Proceedings of the National Academy of Sciences* 97 (21): 11149–52.

Apolloni, Andrea, C Poletto, and Vittoria Colizza. 2013. “Age-Specific Contacts and Travel Patterns in the Spatial Spread of 2009 H1N1 Influenza Pandemic.” *BMC Infect Dis* 13: 176.

Atkin, Ronald H. 1972. “From Cohomology in Physics to q-Connectivity in Social Science.” *International Journal of Man-Machine Studies* 4 (2): 139–67.

Barabási, Albert-László, and Réka Albert. 1999. “Emergence of Scaling in Random Networks.” *Science* 286 (5439): 509–12.

Barigozzi, Matteo, Giorgio Fagiolo, and Giuseppe Mangioni. 2011. “Identifying the Community Structure of the International-Trade Multi-Network.” *Physica A: Statistical Mechanics and Its Applications* 390 (11): 2051–66.

Barnes, Anna, Edward T Bullmore, and John Suckling. 2009. “Endogenous Human Brain Dynamics Recover Slowly Following Cognitive Effort.” *PLoS One* 4 (8): e6626.

Barthélemy, Marc. 2011. “Spatial Networks.” *Physics Reports* 499 (1-3): 1–101.

Barthélemy, Marc. 2018. “Transitions in Spatial Networks.” *Comptes Rendus Physique* 19 (4): 205–32.

Bassett, Danielle S, and Edward T Bullmore. 2017. “Small-World Brain Networks Revisited.” *Neuroscientist* 23 (5): 499–516.

Bassett, Danielle S, Daniel L Greenfield, Andreas Meyer-Lindenberg, Daniel R Weinberger, Simon W Moore, and Edward T Bullmore. 2010. “Efficient Physical Embedding of Topologically Complex Information Processing Networks in Brains and Computer Circuits.” *PLoS Comput Biol* 6 (4): e1000748.

Bassett, Danielle Smith, and Edward T Bullmore. 2006. “Small-World Brain Networks.” *The Neuroscientist* 12 (6): 512–23.

Bassett, Danielle S, and Olaf Sporns. 2017. “Network Neuroscience.” *Nature Neuroscience* 20 (3): 353.

Bassett, Danielle S., Nicholas F. Wymbs, Mason A. Porter, Peter J. Mucha, and Scott T Grafton. 2014. “Cross-Linked Structure of Network Evolution.” *Chaos* 24 (1): 013112.

Bast, Hannah, Daniel Delling, Andrew Goldberg, et al. 2016. “Route Planning in Transportation Networks.” In *Algorithm Engineering*. Springer.

Battiston, Federico, Giulia Cencetti, Iacopo Iacopini, et al. 2020. “Networks Beyond Pairwise Interactions: Structure and Dynamics.” *arXiv Preprint arXiv:1812.11615*.

Bavelas, Alex. 1950. “Communication Patterns in Task-Oriented Groups.” *The Journal of the Acoustical Society of America* 22 (6): 725–30.

Benson, Austin R., Rediet Abebe, Michael T. Schaub, Ali Jadbabaie, and Jon M. Kleinberg. 2018a. “Simplicial Closure and Higher-Order Link Prediction.” *Proc. Natl. Acad. Sci. USA* 115 (48): E11221–30.

Benson, Austin R, David F Gleich, and Jure Leskovec. 2016. “Higher-Order Organization of Complex Networks.” *Science* 353 (6295): 163–66.

Benson, Austin R, Ravi Kumar, and Andrew Tomkins. 2018b. “Sequences of Sets.” *Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining*, 1148–57.

Berge, Claude. 1984. *Hypergraphs: Combinatorics of Finite Sets*. Vol. 45. Elsevier.

Betzel, Richard F., and Danielle S. Bassett. 2017. “Multi-Scale Brain Networks.” *Neuroimage* 160: 73–83.

Betzel, Richard F., John D. Medaglia, Lia Papadopoulos, et al. 2017. “The Modular Organization of Human Anatomical Brain Networks: Accounting for the Cost of Wiring.” *Netw Neurosci* 1 (1): 42–68.

Bianconi, Ginestra. 2018. *Multilayer Networks: Structure and Function*. Oxford University Press.

Billings, Jacob Charles Wright, Mirko Hu, Giulia Lerda, et al. 2019. “Simplex2Vec Embeddings for Community Detection in Simplicial Complexes.” *arXiv Preprint arXiv:1906.09068*.

Borgatti, Stephen P, and Martin G Everett. 2000. “Models of Core/Periphery Structures.” *Social Networks* 21 (4): 375–95.

Borgs, Christian, and Jennifer Chayes. 2017. “Graphons: A Nonparametric Method to Model, Estimate, and Design Algorithms for Massive Networks.” *Proceedings of the 2017 ACM Conference on Economics and Computation*, 665–72.

Brummitt, Charles D, Raissa M. D’Souza, and Elizabeth A. Leicht. 2012. “Suppressing Cascades of Load in Interdependent Networks.” *PNAS* 109 (12): E680–89.

Bullmore, Edward T., and Olaf Sporns. 2009. “Complex Brain Networks: Graph Theoretical Analysis of Structural and Functional Systems.” *Nature Reviews Neuroscience* 10 (3): 186.

Caplar, Neven, Sandro Tacchella, and Simon Birrer. 2017. “Quantitative Evaluation of Gender Bias in Astronomical Publications from Citation Counts.” *Nature Astronomy* 1 (6): 1–5.

Carlsson, Gunnar. 2009. “Topology and Data.” *Bulletin of the American Mathematical Society* 46 (2): 255–308.

Carlsson, Gunnar, Tigran Ishkhanov, Vin De Silva, and Afra Zomorodian. 2008. “On the Local Behavior of Spaces of Natural Images.” *International Journal of Computer Vision* 76 (1): 1–12.

Chakrabarti, Deepayan, Yang Wang, Chenxi Wang, Jure Leskovec, and Christos Faloutsos. 2008. “Epidemic Thresholds in Real Networks.” *ACM Trans. Inf. Syst. Secur.* 10 (4): 1:1–26.

Chakravartty, Paula, Rachel Kuo, Victoria Grubbs, and Charlton McIlwain. 2018. “\# CommunicationSoWhite.” *Journal of Communication* 68 (2): 254–66.

Chodrow, Philip S, Z Al-Awwad, S Jiang, and Marta C González. 2016. “Demand and Congestion in Multiplex Transportation Networks.” *PLoS One* 11 (9): e0161738.

Chodrow, Philip, and Andrew Mellor. 2020. “Annotated Hypergraphs: Models and Applications.” *Applied Network Science* 5 (1): 9.

Christie, Phillip, and Dirk Stroobandt. 2000. “The Interpretation and Application of Rent’s Rule.” *IEEE Transactions on Very Large Scale Integration (VLSI) Systems* 8 (6): 639–48.

Clauset, Aaron, Daniel B Larremore, and Roberta Sinatra. 2017. “Data-Driven Predictions in the Science of Science.” *Science* 355 (6324): 477–80.

Colizza, Vittoria, Alain Barrat, Marc Barthélemy, and Alessandro Vespignani. 2006. “The Role of the Airline Transportation Network in the Prediction and Predictability of Global Epidemics.” *Proceedings of the National Academy of Sciences* 103 (7): 2015–20.

Colizza, Vittoria, and Alessandro Vespignani. 2008. “Epidemic Modeling in Metapopulation Systems with Heterogeneous Coupling Pattern: Theory and Simulations.” *Journal of Theoretical Biology* 251 (3): 450–67.

Cornblath, Eli J., Arian Ashourvan, Jason Z Kim, et al. 2020. “Temporal Sequences of Brain Activity at Rest Are Constrained by White Matter Structure and Modulated by Cognitive Demands.” *Commun Biol* 3 (1): 261.

Costa, L da F, Francisco A Rodrigues, Gonzalo Travieso, and Paulino Ribeiro Villas Boas. 2007. “Characterization of Complex Networks: A Survey of Measurements.” *Advances in Physics* 56 (1): 167–242.

Courtney, O T, and G Bianconi. 2018. “Dense Power-Law Networks and Simplicial Complexes.” *Phys Rev E* 97 (5-1): 052303.

Curry, Justin M. 2014. “Sheaves, Cosheaves and Their Applications.” PhD thesis, University of Pennsylvania.

Curto, Carina. 2017. “What Can Topology Tell Us about the Neural Code?” *Bulletin of the American Mathematical Society* 54 (1): 63–78.

Curto, Carina, Elizabeth Gross, Jack Jeffries, et al. 2017. “What Makes a Neural Code Convex?” *SIAM Journal on Applied Algebra and Geometry* 1 (1): 222–38.

D’Souza, Raissa M., Jesus Gómez-Gardeñes, Jan Nagler, and Alex Arenas. 2019. “Explosive Phenomena in Complex Networks.” *Advances in Physics* 68 (3): 123–223.

Damiano, David B, and Melissa R McGuirl. 2018. “A Topological Analysis of Targeted in-111 Uptake in SPECT Images of Murine Tumors.” *Journal of Mathematical Biology* 76 (6): 1559–87.

Davison, Elizabeth N, Kimberly J Schlesinger, Danielle S Bassett, et al. 2015. “Brain Network Adaptability Across Task States.” *PLoS Comput Biol* 11 (1): e1004029.

Davison, Elizabeth N, B O Turner, Kimberly J Schlesinger, et al. 2016. “Individual Differences in Dynamic Functional Brain Connectivity Across the Human Lifespan.” *PLoS Comput Biol* 12 (11): e1005178.

De Domenico, Manlio, Clara Granell, Mason A Porter, and Alex Arenas. 2016. “The Physics of Spreading Processes in Multilayer Networks.” *Nature Physics* 12 (10): 901.

De Domenico, Manlio, Andrea Lancichinetti, Alex Arenas, and Martin Rosvall. 2015. “Identifying Modular Flows on Multilayer Networks Reveals Highly Overlapping Organization in Interconnected Systems.” *Physical Review X* 5 (1): 011027.

De Jong, Hidde. 2002. “Modeling and Simulation of Genetic Regulatory Systems: A Literature Review.” *Journal of Computational Biology* 9 (1): 67–103.

De Las Rivas, Javier, and Celia Fontanillo. 2010. “Protein–Protein Interactions Essentials: Key Concepts to Building and Analyzing Interactome Networks.” *PLoS Computational Biology* 6 (6).

De Montis, Andrea, Marc Barthélemy, Alessandro Chessa, and Alessandro Vespignani. 2007. “The Structure of Interurban Traffic: A Weighted Network Analysis.” *Environment and Planning B: Planning and Design* 34 (5): 905–24.

Dion, Michelle L, Jane Lawrence Sumner, and Sara McLaughlin Mitchell. 2018. “Gendered Citation Patterns Across Political Science and Social Science Methodology Fields.” *Political Analysis* 26 (3): 312–27.

Dowker, Clifford H. 1952. “Homology Groups of Relations.” *Annals of Mathematics*, 84–95.

Dunaeva, Olga, Herbert Edelsbrunner, Anton Lukyanov, et al. 2016. “The Classification of Endoscopy Images with Persistent Homology.” *Pattern Recognition Letters* 83: 13–22.

Dworkin, Jordan D, Kristin A Linn, Erin G Teich, Perry Zurn, Russell T Shinohara, and Danielle S Bassett. 2020. “The Extent and Drivers of Gender Imbalance in Neuroscience Reference Lists.” *arXiv Preprint arXiv:2001.01002*.

Edelsbrunner, Herbert, David Letscher, and Afra Zomorodian. 2000. “Topological Persistence and Simplification.” *Proceedings. 41st Annual Symposium on Foundations of Computer Science, 2000.*, 454–63.

Edler, Daniel, Ludvig Bohlin, et al. 2017. “Mapping Higher-Order Network Flows in Memory and Multilayer Networks with Infomap.” *Algorithms* 10 (4): 112.

Emmert-Streib, Frank, Matthias Dehmer, and Benjamin Haibe-Kains. 2014. “Gene Regulatory Networks and Their Applications: Understanding Biological and Medical Problems in Terms of Networks.” *Frontiers in Cell and Developmental Biology* 2: 38.

Estrada, Ernesto, Gissell Estrada-Rodriguez, and Heiko Gimperlein. 2018. “Metaplex Networks: Influence of the Exo-Endo Structure of Complex Systems on Diffusion.” *arXiv Preprint arXiv:1812.11615*.

Estrada, Ernesto, and Juan A Rodrı́guez-Velázquez. 2006. “Subgraph Centrality and Clustering in Complex Hyper-Networks.” *Physica A: Statistical Mechanics and Its Applications* 364: 581–94.

Estrada, Ernesto, and Grant J Ross. 2018. “Centralities in Simplicial Complexes. Applications to Protein Interaction Networks.” *Journal of Theoretical Biology* 438: 46–60.

Euler, Leonhard. 1741. “Solutio Problematis Ad Geometriam Situs Pertinentis.” *Commentarii Academiae Scientiarum Petropolitanae*, 128–40.

Even, Shimon. 2011. *Graph Algorithms*. Cambridge University Press.

Expert, Paul, Tim S Evans, Vincent D Blondel, and Renaud Lambiotte. 2011. “Uncovering Space-Independent Communities in Spatial Networks.” *Proceedings of the National Academy of Sciences* 108 (19): 7663–68.

Ferber, Christian von, Taras Holovatch, Yu Holovatch, and Vasyl Palchykov. 2007. “Network Harness: Metropolis Public Transport.” *Physica A: Statistical Mechanics and Its Applications* 380: 585–91.

Fionda, Valeria. 2019. *Networks in Biology*. Elsevier.

Freeman, Linton. 2004. *The Development of Social Network Analysis: A Study in the Sociology of Science*. Empirical press.

Freeman, Linton C. 1977. “A Set of Measures of Centrality Based on Betweenness.” *Sociometry*, 35–41.

Gallagher, Suzanne Renick, and Debra S Goldberg. 2013. “Clustering Coefficients in Protein Interaction Hypernetworks.” *Proceedings of the International Conference on Bioinformatics, Computational Biology and Biomedical Informatics*, 552–60.

Gallen, C L, and M D’Esposito. 2019. “Brain Modularity: A Biomarker of Intervention-Related Plasticity.” *Trends Cogn Sci* 23 (4): 293–304.

Gallo, Giorgio, Giustino Longo, Stefano Pallottino, and Sang Nguyen. 1993. “Directed Hypergraphs and Applications.” *Discrete Applied Mathematics* 42 (2-3): 177–201.

Ghrist, Robert. 2008. “Barcodes: The Persistent Topology of Data.” *Bulletin of the American Mathematical Society* 45 (1): 61–75.

Ghrist, Robert, and Yasuaki Hiraoka. 2011. “Applications of Sheaf Cohomology and Exact Sequences to Network Coding.” *Proceedings of the 2011 NOLTA*.

Giusti, Chad, Robert Ghrist, and Danielle S Bassett. 2016. “Two’s Company, Three (or More) Is a Simplex.” *Journal of Computational Neuroscience* 41 (1): 1–14.

Giusti, Chad, Eva Pastalkova, Carina Curto, and Vladimir Itskov. 2015. “Clique Topology Reveals Intrinsic Geometric Structure in Neural Correlations.” *Proceedings of the National Academy of Sciences* 112 (44): 13455–60.

Gnesi, Stefania, Ugo Montanari, and Alberto Martelli. 1981. “Dynamic Programming as Graph Searching: An Algebraic Approach.” *Journal of the ACM (JACM)* 28 (4): 737–51.

Gu, Shi, Muzhi Yang, John D Medaglia, et al. 2017. “Functional Hypergraph Uncovers Novel Covariant Structures over Neurodevelopment.” *Human Brain Mapping* 38 (8): 3823–35.

Guimera, Roger, Marta Sales-Pardo, and Luı́s A Nunes Amaral. 2004. “Modularity from Fluctuations in Random Graphs and Complex Networks.” *Physical Review E* 70 (2): 025101.

Habibi, Mahnaz, and Pegah Khosravi. 2018. “Disruption of the Protein Complexes from Weighted Complex Networks.” *IEEE/ACM Transactions on Computational Biology and Bioinformatics*.

Halu, Arda, Manlio De Domenico, Alex Arenas, and Amitabh Sharma. 2019. “The Multiplex Network of Human Diseases.” *NPJ Systems Biology and Applications* 5 (1): 1–12.

Hanski, Ilkka. 1999. *Metapopulation Ecology*. Oxford University Press.

Harary, Frank, and Robert Z Norman. 1960. “Some Properties of Line Digraphs.” *Rendiconti Del Circolo Matematico Di Palermo* 9 (2): 161–68.

Holme, Petter, and Jari Saramäki. 2012. “Temporal Networks.” *Physics Reports* 519 (3): 97–125.

Horvát, Szabolcs, Răzvan Gămănuț, Mária Ercsey-Ravasz, et al. 2016. “Spatial Embedding and Wiring Cost Constrain the Functional Layout of the Cortical Network of Rodents and Primates.” *PLoS Biology* 14 (7): e1002512.

How, Javier J, and Saket Navlakha. 2018. “Evidence of Rentian Scaling of Functional Modules in Diverse Biological Networks.” *Neural Comput* 30 (8): 2210–44.

Hu, Sen, Hualei Yang, Boliang Cai, and Chunxia Yang. 2013. “Research on Spatial Economic Structure for Different Economic Sectors from a Perspective of a Complex Network.” *Physica A: Statistical Mechanics and Its Applications* 392 (17): 3682–97.

Iacopini, Iacopo, Giovanni Petri, Alain Barrat, and Vito Latora. 2019. “Simplicial Models of Social Contagion.” *Nature Communications* 10 (1): 1–9.

Ignacio, Paul Samuel P, and Isabel K Darcy. 2019. “Tracing Patterns and Shapes in Remittance and Migration Networks via Persistent Homology.” *EPJ Data Science* 8 (1): 1.

Jhun, Bukyoung, Minjae Jo, and B Kahng. 2019. “Simplicial SIS Model in Scale-Free Uniform Hypergraph.” *Journal of Statistical Mechanics: Theory and Experiment* 2019 (12): 123207.

Ji, Yuxuan, and Nikolas Geroliminis. 2011. “Spatial and Temporal Analysis of Congestion in Urban Transportation Networks.” *Transportation Research Board Annual Meeting*.

Johnson, Christopher W. 2006. “What Are Emergent Properties and How Do They Affect the Engineering of Complex Systems?” *Reliability Engineering and System Safety* 91 (12): 1475–81.

Kahle, Matthew. 2009. “Topology of Random Clique Complexes.” *Discrete Mathematics* 309 (6): 1658–71.

Kahle, Matthew. 2014. “Sharp Vanishing Thresholds for Cohomology of Random Flag Complexes.” *Annals of Mathematics*, 1085–107.

Khambhati, Ankit N, Ann E Sizemore, Richard F Betzel, and Danielle S Bassett. 2018. “Modeling and Interpreting Mesoscale Network Dynamics.” *NeuroImage* 180: 337–49.

Kim, Chiheon, Afonso S Bandeira, and Michel X Goemans. 2017. “Community Detection in Hypergraphs, Spiked Tensor Models, and Sum-of-Squares.” *2017 International Conference on Sampling Theory and Applications (SampTA)*, 124–28.

Kivelä, Mikko, Alex Arenas, Marc Barthélemy, James P Gleeson, Yamir Moreno, and Mason A Porter. 2014. “Multilayer Networks.” *Journal of Complex Networks* 2 (3): 203–71.

Kivelson, Sophia, and Steven A Kivelson. 2016. “Defining Emergence in Physics.” *Nature Partner Journals Quantum Materials* 1: 16024.

Klamt, Steffen, and Ernst Dieter Gilles. 2004. “Minimal Cut Sets in Biochemical Reaction Networks.” *Bioinformatics* 20 (2): 226–34.

Klamt, Steffen, Utz-Uwe Haus, and Fabian Theis. 2009. “Hypergraphs and Cellular Networks.” *PLoS Computational Biology* 5 (5).

Kotliar, Michael, Andrey V Kartashov, and Artem Barski. 2019. “CWL-Airflow: A Lightweight Pipeline Manager Supporting Common Workflow Language.” *GigaScience* 8 (7): giz084.

Krishnamurthy, Larkshmi, J Nadeau, Gultekin Ozsoyoglu, et al. 2003. “Pathways Database System: An Integrated System for Biological Pathways.” *Bioinformatics* 19 (8): 930–37.

Krzakala, Florent, Cristopher Moore, Elchanan Mossel, et al. 2013. “Spectral Redemption in Clustering Sparse Networks.” *Proceedings of the National Academy of Sciences* 110 (52): 20935–40.

Ladyman, James, and Karoline Wiesner. 2020. *What Is a Complex System?* Yale University Press. <https://yalebooks.yale.edu/book/9780300251104/what-complex-system>.

Lai, Eric C. 2004. “Notch Signaling: Control of Cell Communication and Cell Fate.” *Development* 131 (5): 965–73.

Lambiotte, Renaud, Martin Rosvall, and Ingo Scholtes. 2019. “From Networks to Optimal Higher-Order Models of Complex Systems.” *Nature Physics*, 1.

Lambiotte, Renaud, Vsevolod Salnikov, and Martin Rosvall. 2014. “Effect of Memory on the Dynamics of Random Walks on Networks.” *Journal of Complex Networks* 3 (2): 177–88.

Levi, Giorgio, and Franco Sirovich. 1976. “Generalized and/or Graphs.” *Artificial Intelligence* 7 (3): 243–59.

Levins, Richard. 1969. “Some Demographic and Genetic Consequences of Environmental Heterogeneity for Biological Control.” *American Entomologist* 15 (3): 237–40.

Liang, Jiaqi, L Li, and Daniel Zeng. 2018. “Evolutionary Dynamics of Cryptocurrency Transaction Networks: An Empirical Study.” *PLoS One* 13 (8): e0202202.

Lima, Antonio, R Stanojevic, D Papagiannaki, P Rodriguez, and Marta C González. 2016. “Understanding Individual Routing Behaviour.” *J R Soc Interface* 13 (116): 20160021.

MacNell, Lillian, Adam Driscoll, and Andrea N Hunt. 2015. “What’s in a Name: Exposing Gender Bias in Student Ratings of Teaching.” *Innovative Higher Education* 40 (4): 291–303.

Maheshwari, Parul, H Du, J Sheen, S M Assmann, and Reka Albert. 2019. “Model-Driven Discovery of Calcium-Related Protein-Phosphatase Inhibition in Plant Guard Cell Signaling.” *PLoS Comput Biol* 15 (10): e1007429.

Maletić, Slobodan, Milan Rajković, and Danijela Vasiljević. 2008. “Simplicial Complexes of Networks and Their Statistical Properties.” *International Conference on Computational Science*, 568–75.

Maliniak, Daniel, Ryan Powers, and Barbara F Walter. 2013. “The Gender Citation Gap in International Relations.” *International Organization* 67 (4): 889–922.

Mardakheh, Faraz K, Heba Z Sailem, Sandra Kümper, et al. 2017. “Proteomics Profiling of Interactome Dynamics by Colocalisation Analysis (COLA).” *Molecular BioSystems* 13 (1): 92–105.

McRae, Ken, George S Cree, Mark S Seidenberg, and Chris McNorgan. 2005. “Semantic Feature Production Norms for a Large Set of Living and Nonliving Things.” *Behavior Research Methods* 37 (4): 547–59.

Menichetti, Guilia, L Dall’Asta, and Ginestra Bianconi. 2016. “Control of Multilayer Networks.” *Sci Rep* 6: 20706.

Milosavljević, Nikola, Dmitriy Morozov, and Primoz Skraba. 2011. “Zigzag Persistent Homology in Matrix Multiplication Time.” *Proceedings of the Twenty-Seventh Annual Symposium on Computational Geometry*, 216–25.

Mitchell, Melanie. 2006. “Complex Systems: Network Thinking.” *Artificial Intelligence* 170 (18): 1194–212.

Mitchell, Melanie. 2009. *Complexity: A Guided Tour*. Oxford University Press.

Molloy, Michael, and Bruce Reed. 1995. “A Critical Point for Random Graphs with a Given Degree Sequence.” *Random Structures & Algorithms* 6 (2-3): 161–80.

Montoya, José M, Stuart L Pimm, and Ricard V Solé. 2006. “Ecological Networks and Their Fragility.” *Nature* 442 (7100): 259.

Morrison, Katherine, and Carina Curto. 2019. “Predicting Neural Network Dynamics via Graphical Analysis.” In *Algebraic and Combinatorial Computational Biology*. Elsevier.

Moss-Racusin, Corinne A, John F Dovidio, Victoria L Brescoll, Mark J Graham, and Jo Handelsman. 2012. “Science Faculty’s Subtle Gender Biases Favor Male Students.” *Proceedings of the National Academy of Sciences* 109 (41): 16474–79.

Mucha, Peter J, Thomas Richardson, Kevin Macon, Mason A Porter, and Jukka-Pekka Onnela. 2010. “Community Structure in Time-Dependent, Multiscale, and Multiplex Networks.” *Science* 328 (5980): 876–78.

Muldoon, Sarah F., Eric W. Bridgeford, and Danielle S. Bassett. 2016. “Small-World Propensity and Weighted Brain Networks.” *Sci Rep* 6: 22057.

Murphy, Andrew C, Shi Gu, Ankit N Khambhati, et al. 2016. “Explicitly Linking Regional Activation and Function Connectivity: Community Structure of Weighted Networks with Continuous Annotation.” *arXiv Preprint arXiv:1611.07962*.

Neubauer, Nicolas, and Klaus Obermayer. 2009. “Towards Community Detection in k-Partite k-Uniform Hypergraphs.” *Proceedings of the NIPS 2009 Workshop on Analyzing Networks and Learning with Graphs*, 1–9.

Newman, Mark. 2018. *Networks*. Oxford university press.

Nicosia, Vincenzo, John Tang, Cecilia Mascolo, Mirco Musolesi, Giovanni Russo, and Vito Latora. 2013. “Graph Metrics for Temporal Networks.” In *Temporal Networks*. Springer.

Oates, Chris J, and Sach Mukherjee. 2012. “Network Inference and Biological Dynamics.” *The Annals of Applied Statistics* 6 (3): 1209.

Ólafsdóttir, H Freyja, Daniel Bush, and Caswell Barry. 2018. “The Role of Hippocampal Replay in Memory and Planning.” *Current Biology* 28 (1): R37–50.

Onnela, Jukka-Pekka, Daniel J Fenn, Stephen Reid, et al. 2012. “Taxonomies of Networks from Community Structure.” *Physical Review E* 86 (3): 036104.

Ott, Edward, J H Platig, T M Antonsen, and Michelle Girvan. 2008. “Echo Phenomena in Large Systems of Coupled Oscillators.” *Chaos* 18 (3): 037115.

Otter, Nina, Mason A Porter, U Tillmann, P Grindrod, and Heather A Harrington. 2017. “A Roadmap for the Computation of Persistent Homology.” *EPJ Data Sci* 6 (1): 17.

Özturan, Can. 2008. “On Finding Hypercycles in Chemical Reaction Networks.” *Applied Mathematics Letters* 21 (9): 881–84.

Pagani, Giuliano Andrea, and Marco Aiello. 2013. “The Power Grid as a Complex Network: A Survey.” *Physica A: Statistical Mechanics and Its Applications* 392 (11): 2688–700.

Palla, Gergely, Imre Derényi, Illés Farkas, and Tamás Vicsek. 2005. “Uncovering the Overlapping Community Structure of Complex Networks in Nature and Society.” *Nature* 435 (7043): 814.

Paludi, Michele A, and Lisa A Strayer. 1985. “What’s in an Author’s Name? Differential Evaluations of Performance as a Function of Author’s Name.” *Sex Roles* 12 (3-4): 353–61.

Pan, Joshua, Robin M Meyers, Brittany C Michel, et al. 2018. “Interrogation of Mammalian Protein Complex Structure, Function, and Membership Using Genome-Scale Fitness Screens.” *Cell Systems* 6 (5): 555–68.

Papadopoulos, Lia, Pablo Blinder, Henrik Ronellenfitsch, et al. 2018. “Comparing Two Classes of Biological Distribution Systems Using Network Analysis.” *PLoS Computational Biology* 14 (9): e1006428.

Papadopoulos, Lia, Jason Z Kim, Jürgen Kurths, and Danielle S Bassett. 2017. “Development of Structural Correlations and Synchronization from Adaptive Rewiring in Networks of Kuramoto Oscillators.” *Chaos: An Interdisciplinary Journal of Nonlinear Science* 27 (7): 073115.

Papadopoulos, Lia, Mason A Porter, Karen E Daniels, and Danielle S Bassett. 2018. “Network Analysis of Particles and Grains.” *Journal of Complex Networks* 6 (4): 485–565.

Peña, Jorge, and Yannick Rochat. 2012. “Bipartite Graphs as Models of Population Structures in Evolutionary Multiplayer Games.” *PloS One* 7 (9).

Perri, Vincenzo, and Ingo Scholtes. 2019. “Higher-Order Visualization of Causal Structures in Dynamics Graphs.” *arXiv Preprint arXiv:1908.05976*.

Petri, Giovanni, Paul Expert, Federico Turkheimer, et al. 2014. “Homological Scaffolds of Brain Functional Networks.” *Journal of The Royal Society Interface* 11 (101): 20140873.

Porta, Sergio, Paolo Crucitti, and Vito Latora. 2006. “The Network Analysis of Urban Streets: A Primal Approach.” *Environment and Planning B: Planning and Design* 33 (5): 705–25.

Proulx, Stephen R, Daniel EL Promislow, and Patrick C Phillips. 2005. “Network Thinking in Ecology and Evolution.” *Trends in Ecology & Evolution* 20 (6): 345–53.

Purvine, Emilie, Sinan Aksoy, Cliff Joslyn, Kathleen Nowak, Brenda Praggastis, and Michael Robinson. 2018. “A Topological Approach to Representational Data Models.” *International Conference on Human Interface and the Management of Information*, 90–109.

Ramadan, Emad, Arijit Tarafdar, and Alex Pothen. 2004. “A Hypergraph Model for the Yeast Protein Complex Network.” *18th International Parallel and Distributed Processing Symposium, 2004.*, 189.

Raman, Karthik. 2010. “Construction and Analysis of Protein–Protein Interaction Networks.” *Automated Experimentation* 2 (1): 2.

Ramel, Damien, Xiaobo Wang, Carl Laflamme, Denise J Montell, and Gregory Emery. 2013. “Rab11 Regulates Cell–Cell Communication During Collective Cell Movements.” *Nature Cell Biology* 15 (3): 317–24.

Rees, Matthew G, Brinton Seashore-Ludlow, and Paul A Clemons. 2019. “Computational Analyses Connect Small-Molecule Sensitivity to Cellular Features Using Large Panels of Cancer Cell Lines.” In *Systems Chemical Biology*. Springer.

Reimann, Michael W, Max Nolte, Martina Scolamiero, et al. 2017. “Cliques of Neurons Bound into Cavities Provide a Missing Link Between Structure and Function.” *Frontiers in Computational Neuroscience* 11: 48.

Rempe, Felix, Gerhard Huber, and Klaus Bogenberger. 2016. “Spatio-Temporal Congestion Patterns in Urban Traffic Networks.” *Transportation Research Procedia* 15: 513–24.

Rital, Soufiane, Hocine Cherifi, and Serge Miguet. 2005. “Weighted Adaptive Neighborhood Hypergraph Partitioning for Image Segmentation.” *International Conference on Pattern Recognition and Image Analysis*, 522–31.

Rivera-Alba, Marta, Shiv N Vitaladevuni, Yuriy Mishchenko, et al. 2011. “Wiring Economy and Volume Exclusion Determine Neuronal Placement in the Drosophila Brain.” *Current Biology* 21 (23): 2000–2005.

Rodrigue, Jean-Paul. 2016. *The Geography of Transport Systems*. Taylor & Francis.

Rombach, M Puck, Mason A Porter, James H Fowler, and Peter J Mucha. 2014. “Core-Periphery Structure in Networks.” *SIAM Journal on Applied Mathematics* 74 (1): 167–90.

Ross, Shane, and Martin Lo. 2001. “The Lunar L1 Gateway-Portal to the Stars and Beyond.” *AIAA Space 2001 Conference and Exposition*, 4768.

Rosvall, Martin, Alcides V Esquivel, Andrea Lancichinetti, Jevin D West, and Renaud Lambiotte. 2014. “Memory in Network Flows and Its Effects on Spreading Dynamics and Community Detection.” *Nature Communications* 5: 4630.

Rubinov, Mikail, and Olaf Sporns. 2010. “Complex Network Measures of Brain Connectivity: Uses and Interpretations.” *Neuroimage* 52 (3): 1059–69.

Saadatpour, Assieh, and Reka Albert. 2012. “Discrete Dynamic Modeling of Signal Transduction Networks.” *Methods Mol Biol* 880: 255–72.

Sadovsky, A J, and J N MacLean. 2014. “Mouse Visual Neocortex Supports Multiple Stereotyped Patterns of Microcircuit Activity.” *J Neurosci* 34 (23): 7769–77.

Sahneh, Faryad Darabi, and Caterina Scoglio. 2014. “Competitive Epidemic Spreading over Arbitrary Multilayer Networks.” *Physical Review E* 89 (6): 062817.

Salehi, Mostafa, Rajesh Sharma, Moreno Marzolla, Matteo Magnani, Payam Siyari, and Danilo Montesi. 2015. “Spreading Processes in Multilayer Networks.” *IEEE Transactions on Network Science and Engineering* 2 (2): 65–83.

Savulescu, Anca F, Robyn Brackin, Emmanuel Bouilhol, et al. 2019. “DypFISH: Dynamic Patterned FISH to Interrogate RNA and Protein Spatial and Temporal Subcellular Distribution.” *bioRxiv*, 536383.

Scheurer, Jan, Carey Curtis, and Sergio Porta. 2008. *Spatial Network Analysis of Public Transport Systems: Developing a Strategic Planning Tool to Assess the Congruence of Movement and Urban Structure in Australian Cities*. GAMUT, Australasian Centre for the Governance; Management of Urban Transport.

Seaton, Katherine A, and Lisa M Hackett. 2004. “Stations, Trains and Small-World Networks.” *Physica A: Statistical Mechanics and Its Applications* 339 (3-4): 635–44.

Seidman, Stephen B. 1981. “Structures Induced by Collections of Subsets: A Hypergraph Approach.” *Mathematical Social Sciences* 1 (4): 381–96.

Serrano, Daniel Hernández, Juan Hernández-Serrano, and Darı́o Sánchez Gómez. 2020. “Simplicial Degree in Complex Networks. Applications of Topological Data Analysis to Network Science.” *Chaos, Solitons & Fractals* 137: 109839.

Shanmukhappa, Tanuja, Ivan WH Ho, K Tse Chi, Xingtang Wu, and Hairong Dong. 2018. “Multi-Layer Public Transport Network Analysis.” *2018 IEEE International Symposium on Circuits and Systems (ISCAS)*, 1–5.

Shnier, Daniel, Mircea A Voineagu, and Irina Voineagu. 2019. “Persistent Homology Analysis of Brain Transcriptome Data in Autism.” *Journal of the Royal Society Interface* 16 (158): 20190531.

Sinatra, R, D Condorelli, and V Latora. 2010. “Networks of Motifs from Sequences of Symbols.” *Phys Rev Lett* 105 (17): 178702.

Singh, Gurjeet, Facundo Memoli, Tigran Ishkhanov, Guillermo Sapiro, Gunnar Carlsson, and Dario L Ringach. 2008. “Topological Analysis of Population Activity in Visual Cortex.” *Journal of Vision* 8 (8): 11–11.

Sizemore, Ann E, and Danielle S Bassett. 2018. “Dynamic Graph Metrics: Tutorial, Toolbox, and Tale.” *NeuroImage* 180: 417–27.

Sizemore, Ann E, Chad Giusti, Ari Kahn, Jean M Vettel, Richard F Betzel, and Danielle S Bassett. 2018. “Cliques and Cavities in the Human Connectome.” *Journal of Computational Neuroscience* 44 (1): 115–45.

Sizemore, Ann E, Elisabeth A Karuza, Chad Giusti, and Danielle S Bassett. 2018. “Knowledge Gaps in the Early Growth of Semantic Feature Networks.” *Nature Human Behaviour* 2 (9): 682.

Spies, Daniel, and Constance Ciaudo. 2015. “Dynamics in Transcriptomics: Advancements in RNA-Seq Time Course and Downstream Analysis.” *Computational and Structural Biotechnology Journal* 13: 469–77.

Spivak, David I. 2009. “Higher-Dimensional Models of Networks.” *arXiv Preprint arXiv:0909.4314*.

Sporns, Olaf, and Richard F Betzel. 2016. “Modular Brain Networks.” *Annual Review of Psychology* 67: 613–40.

Squires, Shane, K Sytwu, D Alcala, T M Antonsen, Edward Ott, and Michelle Girvan. 2013. “Weakly Explosive Percolation in Directed Networks.” *Phys Rev E Stat Nonlin Soft Matter Phys* 87 (5): 052127.

Stella, Massimo, Nicole M Beckage, Markus Brede, and Manlio De Domenico. 2018. “Multiplex Model of Mental Lexicon Reveals Explosive Learning in Humans.” *Scientific Reports* 8 (1): 2259.

Stiso, Jennifer, and Danielle S Bassett. 2018. “Spatial Embedding Imposes Constraints on Neuronal Network Architectures.” *Trends in Cognitive Sciences*.

Stiso, Jennifer, Ankit N Khambhati, Tommaso Menara, et al. 2019. “White Matter Network Architecture Guides Direct Electrical Stimulation Through Optimal State Transitions.” *Cell Reports* 28 (10): 2554–66.

Stolz, Bernadette. 2014. “Computational Topology in Neuroscience.” *Master’s Thesis (University of Oxford, 2014). Google Scholar*.

Stolz, Bernadette J, Tegan Emerson, Satu Nahkuri, Mason A Porter, and Heather A Harrington. 2018. “Topological Data Analysis of Task-Based fMRI Data from Experiments on Schizophrenia.” *arXiv Preprint arXiv:1809.08504*.

Tauzin, Guillaume, Umberto Lupo, Lewis Tunstall, et al. 2020. “Giotto-Tda: A Topological Data Analysis Toolkit for Machine Learning and Data Exploration.” *arXiv Preprint arXiv:2004.02551*.

Taylor, Caz M, and Richard J Hall. 2011. “Metapopulation Models for Seasonally Migratory Animals.” *Biology Letters* 8 (3): 477–80.

Taylor, Matthew B, and Ian M Ehrenreich. 2015. “Higher-Order Genetic Interactions and Their Contribution to Complex Traits.” *Trends in Genetics* 31 (1): 34–40.

Thiem, Yannik, Kris F Sealey, Amy E Ferrer, Adriel M Trott, and Rebecca Kennison. 2018. *Just Ideas? The Status and Future of Publication Ethics in Philosophy: A White Paper*. Technical report.

Tian, Ze, TaeHyun Hwang, and Rui Kuang. 2009. “A Hypergraph-Based Learning Algorithm for Classifying Gene Expression and arrayCGH Data with Prior Knowledge.” *Bioinformatics* 25 (21): 2831–38.

Tizzoni, Michele, P Bajardi, A Decuyper, et al. 2014. “On the Use of Human Mobility Proxies for Modeling Epidemics.” *PLoS Comput Biol* 10 (7): e1003716.

Valdivia, Paola, Paolo Buono, and Jean-Daniel Fekete. 2017. “Hypenet: Visualizing Dynamic Hypergraphs.” *EuroVis 2017-19th EG/VGC Conference on Visualization*, 1–3.

Vandersickel, Nele, Enid Van Nieuwenhuyse, Nicolas Van Cleemput, et al. 2019. “Directed Networks as a Novel Way to Describe and Analyze Cardiac Excitation: Directed Graph Mapping.” *Frontiers in Physiology* 10: 1138.

Vinci, Giuseppe, Gautam Dasarathy, and Genevera I Allen. 2019. “Graph Quilting: Graphical Model Selection from Partially Observed Covariances.” *arXiv Preprint arXiv:1912.05573*.

Voloshin, Vitaly Ivanovich. 2009. *Introduction to Graph and Hypergraph Theory*. Nova Science Publishers Hauppauge.

Von Ferber, Christian, Taras Holovatch, Yu Holovatch, and V Palchykov. 2009. “Public Transport Networks: Empirical Analysis and Modeling.” *The European Physical Journal B* 68 (2): 261–75.

Walhout, Albertha JM. 2011. “Gene-Centered Regulatory Network Mapping.” In *Methods in Cell Biology*, vol. 106. Elsevier.

Wang, Zhijiang, Jiming Liu, Ning Zhong, et al. 2012. “A Naive Hypergraph Model of Brain Networks.” *International Conference on Brain Informatics*, 119–29.

Watts, Duncan J, and Steven H Strogatz. 1998. “Collective Dynamics of ‘Small-World’networks.” *Nature* 393 (6684): 440.

Weber, Joe, and Mei-Po Kwan. 2002. “Bringing Time Back in: A Study on the Influence of Travel Time Variations and Facility Opening Hours on Individual Accessibility.” *The Professional Geographer* 54 (2): 226–40.

Wegner, F von, E Tagliazucchi, and H Laufs. 2017. “Information-Theoretical Analysis of Resting State EEG Microstate Sequences - Non-Markovianity, Non-Stationarity and Periodicities.” *Neuroimage* 158: 99–111.

Wilson, Robin J. 2013. “History of Graph Theory.” In *Handbook of Graph Theory*. Chapman; Hall/CRC.

Xu, Jian, Thanuka L Wickramarathne, and Nitesh V Chawla. 2016. “Representing Higher-Order Dependencies in Networks.” *Science Advances* 2 (5): e1600028.

Yoo, Jaejun, Eun Young Kim, Yong Min Ahn, and Jong Chul Ye. 2016. “Topological Persistence Vineyard for Dynamic Functional Brain Connectivity During Resting and Gaming Stages.” *Journal of Neuroscience Methods* 267: 1–13.

Zhao, Bihai, Sai Hu, Xueyong Li, Fan Zhang, Qinglong Tian, and Wenyin Ni. 2016. “An Efficient Method for Protein Function Annotation Based on Multilayer Protein Networks.” *Human Genomics* 10 (1): 33.

Zhong, Yaofeng D, V Srivastava, and Naomi E. Leonard. 2017. “On the Linear Threshold Model for Diffusion of Innovations in Multiplex Social Networks.” *IEEE 56th Annual Conference on Decision and Control (CDC)*, 2593–98.

Zhou, Dale, Eli J. Cornblath, Jennifer Stiso, et al. 2020. *Gender Diversity Statement and Code Notebook V1.0*.

Zhou, Wanding, and Luay Nakhleh. 2011. “Properties of Metabolic Graphs: Biological Organization or Representation Artifacts?” *BMC Bioinformatics* 12 (1): 132.

Zhu, Mengxiao, and Mo Zhang. 2017. “Network Analysis of Conversation Data for Engineering Professional Skills Assessment.” *ETS Research Report Series* 2017 (1): 1–13.

Zomorodian, Afra, and Gunnar Carlsson. 2005. “Computing Persistent Homology.” *Discrete & Computational Geometry* 33 (2): 249–74.

[1] For readers familiar with object-oriented programming, we liken the difference between “formalism” and “representation” to that between “class” and “object".

[2] Sometimes the words “structural” and “topological” are used interchangeably. In this work, we use the adjective “topological” to modify nouns relating to the theory of algebraic topology. We use “structural” to generally refer to the patterns formed by the units and relations of a system.

[3] This construction is akin to the *line graph* construction in graph theory (Harary and Norman 1960).

[4] One could build a hypergraph version, but it would not be an appropriate representation for this scenario because it does not respect the blatant subset dependency.
