---
created: 2026-09-09
uid: OOpP
source: https://x.com/Phoenixyin13/status/2095505593863749937?s=20
---
为什么前沿模型放出的成果几乎都是清一色的数学证明，物理定律的发现与突破等于0？

到现在为止，人类物理领域最后一次框架级事件是 1925–1926年的矩阵力学/波动力学。
如果宽松一点，我可以算到 1973年的渐近自由和标准模型闭合。之后的50年时间，物理学家数量涨了两个数量级，经费涨了三个，产出的框架级结果是 0。

如果人类以百倍的智力投入、半个世纪，也没做出来，那这件事的困难就不在认知端。
指望AI模型做到，等于指望它解决一个难度完全位于认知之外的问题。

> 数学的真理判据在问题内部；
> 物理的真理判据在世界外部。

数学特别适合当前 AI，是因为它近乎形成了一个完美的封闭环境。
给你 axioms、definitions、conjecture，然后模型搜索证明，最后一步甚至可以被 Lean、Isabelle、Coq的形式验证器机械判定。
于是，AI 可以做海量搜索、失败、反馈、再搜索。Reward 极其干净：proof checked = 1，proof failed = 0。
这恰好是强化学习、搜索、test-time compute 最喜欢的问题结构。

物理完全不是这样。
AI模型无论进化多少代，架构与训练网络不变，它就永远写不出牛顿三大定律和万有引力定律，我可以确信以及肯定这件事。
因为现代的LLM 极度偏向 interpolation，而基本物理革命往往要求 representation break。前者的训练目标要求它学习人类已有分布，所以产生一个真正脱离已有 ontology 的 representation，比在既有 representation 内做推理难得多。
即使它能写出类似的东西或定理，你无法在把它丢给一个“Physics Verifier”之后，机器告诉你 TRUE。
目前看来，一个基本物理假说可能要等 CERN、LIGO、JWST、量子实验室或者新的精密仪器给它一个数据点。
这造成了一个极其严重的feedback bandwidth mismatch。

假设今天把整个物理学文献、实验数据库、arXiv 都给 GPT-级模型，它会看到成千上万个 anomaly：
3 sigma deviation、材料中的反常行为、Hubble tension、muon anomaly、暗物质候选、超导异常、核结构问题……

最后的结果是，AI 越完美地学习现有物理学家的 priors，它越可能成为一个极其优秀的正常科学家。
但是，正常，意味着它永远无法做出范式突破。
目前的模型，无论Astra也好，还是没有彻底公开的Mythos，仍然生活在text、code、images和datasets里。
但是，自然科学家生活在world。
Faraday 可以不停摆弄线圈和磁铁，Rutherford 可以看散射数据，Michelson 可以重新设计光学装置。

实验科学中，有一个非常强大的能力叫intervention，拥有这种能力会每天问自己：如果我主动改变世界，会发生什么？
AI，没有操纵现实、改造实验的欲求。

这就是我们今天看到的趋势，AI 数学能力会先于 AI 基础物理发现能力十几年成熟。
Google DeepMind 的 AlphaEvolve 已经开始把能力扩展到模拟和科学问题，但其最漂亮的成果仍然集中在那些具有明确 objective function、可以高速计算验证的领域。
但距离物理定律级别的发现，AI还有太长的路。

---

from LLM to World Model
[[知识与现实世界的 touchpoint interface]]