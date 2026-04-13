---
title: "AI 需要 Context 管理和注意力机制"

created: 2025-12-26 14:28
reference:
  - "[[constraints-are-intelligence-the-context-dilemma-of-ai-agents]]"
---
人类记忆有一套适应生存的高级机制：**渐进遗忘**（模糊非关键细节）、**[[emotions-aid-decision-making|情绪标记]]**（记住重要的事）和**重构式回忆**。

Context Window 正在快速扩大，但这无法解决核心矛盾。  
**当容量不再是瓶颈，筛选标准将成为新的瓶颈。**

Context 越长，模型表现不一定越好。当所有信息都摆在面前，没有机制来区分重要和不重要，系统的表现会下降。

--> The need for Context Engineering

*理想的解决方案：一套内生的重要性判断机制——不依赖外部规则，能让系统自己知道该关注什么、可以忽略什么。*-- [[ai-agent-needs-to-manage-its-own-attention-and-context]]

其他解决方案：

[[skill-is-a-pre-designed-context-package-by-human-experts]]
[[progressive-disclosure-helps-manage-ai-cognitive-load]]

