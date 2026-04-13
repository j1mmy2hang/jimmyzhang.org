---
title: "Knowledge is API"

created: 2026-01-28 18:15
reference:
  - "[[knowledge-as-an-api]]"
---
> Knowledge API: A mental model for thinking about the understanding of a specific domain as an Application Programming Interface (API). Knowledge APIs depend on, and can be used by one-another. A knowledge API is like a module in a programming language, it depends on (imports) other knowledge APIs, and can be used by (exported) other knowledge APIs. - Chris Behan

---

打包复杂性，供外部稳定调用而不用在乎里面发生了什么

API 的物理学本质是 **「熵的隔离墙」 (Entropy Firewall)**

任何功能强大的系统（如 CPU、支付系统、人体），其内部都处于高熵状态（极度复杂、混乱、变量无数）。如果直接暴露这种复杂性，外部系统会因为无法处理巨大的信息量而崩溃。API 是一个人为制造的“低熵切面”，它将内部的混乱封装起来，只向外暴露有序的指令。

一个优秀的 API，意味着无论其**内部状态**如何剧烈波动，其对外输出的**结果**都保持稳定，变化率为零。你不需要知道黑盒里发生了什么，你只需要知道输入 X 必然得到 Y。

---

[[to-understand-the-macro-you-must-be-ignorant-of-the-micro]]

知识即 API，意味着你**信任**下一层知识的输出是稳定的，从而**放弃**对下一层实现细节的探究。这种“放弃”才是人类文明能够叠加累积的关键。

---

[[cultivating-sensitivity-to-delta]]: 把存量封装 -- [[knowledge-is-api]]，只关注增量 Delta。你会发现，你需要掌握的核心信息量，比试图理解整个学科体系，至少少了两个数量级。但这 1% 的 Delta，却承载了当前 99% 的应用价值。