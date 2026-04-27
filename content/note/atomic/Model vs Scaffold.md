---
created: 2026-04-12
reference:
  - 李继刚
uid: g4n0
---
如果模型本身足够强，Agent 框架会不会变得多余？ 
in other words, 闭环控制本身是不是就是智能不可或缺的一部分？

analogy: 
model = teenager
architecture = a manual given to him regarding how to work, instead of playing around / doing nothing / giving up

随着基础模型能力的发展，脚手架是否会被逐步撤去 / become obsolete? 

scaffold / architecutre = man-made, pre-written rules / processes that may in turn limit / restrict the creative exploration process, once the model becomes strong enough

现在的 scaffold 是不是本质是为了填补 LLM 相比于 World Model 缺失的那部分？
World Model 发展能否 defeat LLM + Scaffolding? 

---

### 1. 闭环控制：是外挂的工具，还是智能的本体？

> *"闭环控制本身就是智能不可或缺的一部分？"*

**是的，闭环控制（感知-决策-执行-反馈）本质上就是高级智能（System 2 慢思考）的核心特征。**
目前的 LLM 本质上是“开环”的单次映射（System 1 快思考），它根据输入生成概率最高的输出。而 Agent 框架（Scaffold）实际上是在用代码强行给 LLM 加上“循环（Loop）”和“状态（State）”。
随着模型的发展，这种闭环能力必然会**内化**。就像 OpenAI 的 o1 模型，它将 Chain-of-Thought (CoT) 和自我纠错内化到了强化学习的训练过程中，模型自己学会了在输出前进行内部的“闭环思考”，这就使得外部的 Prompt Engineering 和简单的反思框架变得多余。

### 2. “青少年”隐喻的神经科学解释：前额叶皮层的发育

> *"analogy: model = teenager, architecture = a manual given to him..."*

这个比喻非常精准。在人类神经科学中，青少年的大脑拥有极强的计算能力和学习能力（神经元突触极其丰富），但他们的**前额叶皮层（Prefrontal Cortex）**尚未发育完全。前额叶负责什么？正是**执行控制、长期规划、冲动抑制和工作记忆**——这完美对应了现在的 Agent Scaffold。
*   **Scaffold = 代理前额叶**：人类开发者写下的 SOP、ReAct 框架，就是给这个“青少年”外挂了一个前额叶，告诉他“先想后做”、“遇到报错要重试”。
*   **撤去脚手架的过程，就是模型“成年”的过程**：当模型通过更复杂的 RLHF 或自我对弈（Self-play）长出了自己的“前额叶”，那本 manual 就不再需要了，它变成了模型内在的直觉和习惯。

### 3. 脚手架的悖论：从“赋能”走向“束缚”

> *"scaffold / architecutre = man-made, pre-written rules... may in turn limit / restrict the creative exploration process"*

这是极具前瞻性的一点。人类设计的 Scaffold 本质上是**人类认知过程的降维投影**。
*   我们用人类的逻辑去规定 Agent 应该分几步走（比如：1. 搜索 2. 总结 3. 写作）。
*   但高维的 AI 模型可能存在比人类更高效的解题路径。如果模型足够强大，强行让它按照人类的 SOP 去执行，就像是**逼着一个微积分大师必须用算盘来展示计算过程**。
*   **结论**：当模型能力跨越某个临界点（Singularity of Reasoning），硬编码的 Scaffold 将从“能力放大器”变成“能力天花板”。未来的 Scaffold 可能会演变成极其轻量级的“目标设定器（Goal-setter）”和“安全边界（Guardrails）”，而不是“过程控制器”。

### 4. LLM + Scaffold vs. World Model：填补缺失的拼图

> *"现在的 scaffold 是不是本质是为了填补 LLM 相比于 World Model 缺失的那部分？World Model 发展能否 defeat LLM + Scaffolding?"*

完全正确。LLM 最大的缺陷是**缺乏物理接地（Grounding）和对状态转移（State Transition）的真实理解**。LLM 只是在预测文本的概率分布，它不知道“杯子掉在地上会碎”这个物理状态的不可逆性。
*   **Scaffold 的本质是“模拟世界”**：我们用外部的数据库（Memory）、代码解释器（Environment）、API 调用反馈，来充当 LLM 的“世界”。Scaffold 在帮 LLM 记录状态、验证因果。
*   **World Model 的降维打击**：真正的 World Model原生理解时间、空间、因果和物理规律。当模型内部已经包含了一个精确的世界模拟器时，它可以在内部进行无数次沙盘推演（类似于 AlphaGo 在脑内下棋），直接输出最优解。
*   **Defeat 的必然性**：一旦 World Model 成熟，外部的、基于文本和 API 调用的笨重 Scaffold 将被彻底降维打击。因为内部的神经元级状态推演，永远比外部的代码级 API 调用快几个数量级，且更连贯。

### 总结：AI 发展的“吞噬定律”

在计算机科学的历史中，硬件和底层系统总是不断吞噬上层的软件逻辑。在 AI 领域也是如此：**今天的 Scaffold，就是明天的 Model。**

1.  **过去**：我们需要复杂的 Prompt Engineering（脚手架）。
2.  **现在**：模型原生支持了 Instruction Following，Prompt 变简单了，但我们需要复杂的 Agent Workflow（脚手架）。
3.  **未来**：模型原生具备了长程规划和自我纠错（如 o1），Workflow 被吞噬。我们需要多智能体协作（新的脚手架）。
4.  **终局**：World Model 诞生，模型即世界，大部分执行层面的脚手架彻底消亡，人类只保留最高维度的“意图对齐（Alignment）”脚手架。
