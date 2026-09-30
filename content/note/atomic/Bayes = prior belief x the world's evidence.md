---
created: 2026-09-09
reference: "[[Learning — Bayesian Inference]]"
uid: lB6r
---
Every belief = 
1. the part that is *yours* (the prior — everything you knew before the evidence arrived
2. the part that is *the world's* (the likelihood ratio — how much more expected the evidence was if the hypothesis is true than if it's false)


$$\underbrace{\frac{P(H \mid B)}{P(\neg H \mid B)}}_{\text{posterior odds}} = \underbrace{\frac{P(H)}{P(\neg H)}}_{\text{prior odds}} \times \underbrace{\frac{P(B \mid H)}{P(B \mid \neg H)}}_{\text{likelihood ratio}}$$


posterior odds = prior odds × likelihood ratio

1. **What did I believe before?** (base rate → odds)
2. **How much more expected was this evidence under the hypothesis than under its rival?** (world's grade → multiplier)


1. **Probability is a fraction of a world.** Picture uncertainty as a square of total area 1; every event is a region, its probability the region's area.
2. **Conditioning is zooming into a sub-world.** $P(A \mid B)$ throws away everything outside the $B$ region and re-measures relative to what remains: $\dfrac{P(A \cap B)}{P(B)}$.

The overlap $A \cap B$ is one patch of area, reachable through two doors: $P(A \mid B)\,P(B)$ and $P(B \mid A)\,P(A)$. Equating the two paths and dividing *is* Bayes' theorem — a bookkeeping identity, as inevitable as $2+2=4$, re-derivable on a napkin in ten seconds.


[[Forecast = Base rate + Update]]

west:: [[Learning is multiplicative updating under the world's grading of evidence]]
