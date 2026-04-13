---
title: "Global optimization over local perfection"

created: 2026-03-18
reference:
  - "[[the-art-of-doing-science-and-engineering]]"
---
## Three principles of system design

1. <u>The trap of local optimization</u> -- If you optimize the components, you will probably ruin the system performance.
2. <u>Design for the Unknown</u> -- Part of systems engineering design is to prepare for changes so they can be gracefully made and still not degrade the other parts.
3. <u>The Danger of "Overfitting"</u> -- The closer you meet specifications, the worse the performance will be when overloaded.

---

Do global not local optimization

一个系统的整体韧性（Global Optimization）必须建立在其组成部分的“刻意不完美”之上。极度追求局部优化（Local Optimization），会抽干系统应对未知变化所需的冗余（Redundancy），从而剥夺系统在超载时“优雅降级（Graceful Degradation）”的能力。**要想赢得全局，就必须容忍局部的次优。**

真正的强大，不是在顺境中跑得最快（那是局部优化），而是在遇到未知和极端压力时，能够退得最从容、弯而不折。

> 拥抱粗糙的现实，不要过度拟合当前环境，保留冗余以应对时代剧变。

local overfitting 的后果 -- [[structural-dependence-and-institutionalization]]

[[schools-create-institutional-dependency-and-leave-them-unprepared-for-real-world-life-and-work]] (overfitting for the curriculum and ignoring the outside world)