#!/usr/bin/env python3
"""
translate_chinese.py — placed at data/note/

Renames Chinese-titled .md files to English slugs using a handcrafted
translation mapping, adds/updates frontmatter title, and rewrites all
[[wikilinks]] inside note/ to reflect the new names.

Usage:
    python3 translate_chinese.py [--dry-run]
"""

import os
import re
import sys

NOTE_DIR = os.path.dirname(os.path.abspath(__file__))
DRY_RUN  = "--dry-run" in sys.argv

WIKILINK_RE = re.compile(r'\[\[([^\]|#\n]+?)((?:[#|][^\]\n]*)?)\]\]')

# ── Translation mapping: original stem → english slug ────────────────────────
# Organised by folder prefix for readability. All values must be valid slugs
# (lowercase, alphanumeric + hyphens only).

MAPPING = {

    # ── atomic ───────────────────────────────────────────────────────────────

    '"品味"是人类自我降级沦为消费者的优雅包装':
        "taste-is-elegant-packaging-for-self-demotion-to-consumer",
    "AGI终将是一个 DAO，而不是一个 CEO":
        "agi-will-be-a-dao-not-a-ceo",
    "AI agent 是人机交互的第三次革命":
        "ai-agent-is-the-third-revolution-in-human-computer-interaction",
    "AI safety 的范式转移 -- 从计算机科学到经济学&博弈论":
        "ai-safety-paradigm-shift-from-computer-science-to-economics-and-game-theory",
    "AI 三要素 -- 数据 + 算法 + 算力":
        "ai-three-elements-data-algorithm-compute",
    "AI 写作和阅读的悖论，思考的消失":
        "ai-writing-and-reading-paradox-disappearance-of-thinking",
    "AI 剥夺 & enable 人类的意义":
        "ai-strips-and-enables-human-meaning",
    "AI 商业范式的改变 -- 从过程到结果，从剥削到赋能":
        "ai-business-paradigm-shift-from-process-to-outcome-from-exploitation-to-empowerment",
    "AI 基于大量个人数据可对一个人进行精准描述和评价":
        "ai-can-precisely-profile-a-person-using-personal-data",
    "AI 对人类是一个文明级的挑战":
        "ai-is-a-civilizational-challenge-to-humanity",
    "AI 导致生产与消费的分离":
        "ai-causes-separation-of-production-and-consumption",
    "AI 将人类从枯燥的工作中解放出来":
        "ai-liberates-humans-from-tedious-work",
    "AI 恐慌导致重资产产生溢价":
        "ai-panic-drives-premium-on-hard-assets",
    "AI 戳破了一个假象 -- 大多数人看似在做的智力劳动实则是低效重复劳动":
        "ai-exposes-the-illusion-that-most-intellectual-work-is-repetitive",
    "AI 时代不再只有组织能干成大事":
        "in-the-ai-age-organizations-no-longer-have-a-monopoly-on-great-things",
    "AI 时代管理的本质是管理者自身":
        "in-the-ai-age-management-is-about-managing-yourself",
    "AI 时代，人类写意图文档":
        "in-the-ai-age-humans-write-intent-documents",
    "AI 模型混杂了无数个意志，提示词提取出某个意识切片":
        "ai-models-blend-countless-wills-prompts-extract-a-slice-of-consciousness",
    "AI 的崛起剥夺人类的意义，逼迫人类重新发现自己的价值":
        "ai-rise-strips-human-meaning-forcing-rediscovery-of-value",
    "AI 的智商是自适应的":
        "ai-intelligence-is-adaptive",
    "AI 能做的未来一定都会由 AI 做":
        "whatever-ai-can-do-ai-will-do",
    'AI 解决学习的\u201c效率\u201d和\u201c动机\u201d两大核心难题':
        "ai-solves-the-two-core-problems-of-learning-efficiency-and-motivation",
    "AI 让人类不再需要彼此":
        "ai-makes-humans-no-longer-need-each-other",
    "AI 让人类知识透明化，但如何运用依靠个人生命经验":
        "ai-makes-human-knowledge-transparent-but-application-depends-on-lived-experience",
    "AI 让教育回归思考和生活的本源，而不是工作和作为工具被利用":
        "ai-returns-education-to-thinking-and-living-not-working-and-being-used",
    "AI 通过打包复杂性降低门槛实现赋能":
        "ai-empowers-by-packaging-complexity-to-lower-barriers",
    "AI 需要 Context 管理和注意力机制":
        "ai-needs-context-management-and-attention-mechanisms",
    "AI做不到，目前教育也做不到的":
        "what-ai-cannot-do-current-education-cannot-either",
    "AI普及和落地的真正瓶颈是“变革管理”，而非技术本身":
        "the-real-bottleneck-of-ai-adoption-is-change-management-not-technology",
    "AI的瓶颈已从技术转移至人类的想象力":
        "ai-bottleneck-has-shifted-from-technology-to-human-imagination",
    "Apple vision air 在未来也将被从牛皮纸里拿出来":
        "apple-vision-air-will-also-be-pulled-from-a-brown-paper-bag",
    "Context 不是掌握所有信息，而是在正确的时刻掌握关键信息":
        "context-is-not-having-all-information-but-the-right-information-at-the-right-moment",
    "Critical Think 比特币":
        "critical-thinking-bitcoin",
    "Experiment -- 从第一性原理重构整个世界":
        "experiment-reconstructing-the-world-from-first-principles",
    "Helping people build personal brand｜knowledge garden｜sharable assets":
        "helping-people-build-personal-brand-knowledge-garden-sharable-assets",
    "Homeschool 不是在家上学":
        "homeschool-is-not-school-at-home",
    "Individual vs Assemblage -- 宇宙没有个体，世界万物参与":
        "individual-vs-assemblage-the-universe-has-no-individuals-everything-participates",
    "LLM 已经能做到把人类知识压缩到几个 G 里了":
        "llm-can-already-compress-human-knowledge-into-a-few-gigabytes",
    "Making Knowledge Productive 是当今世界的重要任务":
        "making-knowledge-productive-is-the-important-task-of-our-time",
    "Notion = 平民版 Planitir":
        "notion-is-palantir-for-the-masses",
    "Popper's Falsification Theory -- 科学的本质是通过证据证伪、反驳理论":
        "poppers-falsification-theory-science-advances-by-disproving-theories",
    "Predicting next token 的智能本质是压缩和预测":
        "the-intelligence-of-predicting-next-token-is-compression-and-prediction",
    "Prompt -- 浮世绘风格":
        "prompt-ukiyo-e-style",
    "Prompt -- 铅笔素描":
        "prompt-pencil-sketch",
    "Saas 时代的终结？":
        "the-end-of-the-saas-era",
    "Saas 的赚钱逻辑以及没落":
        "the-profit-logic-and-decline-of-saas",
    "Self-as-an-end 需要关系和制度的保障":
        "self-as-an-end-requires-relational-and-institutional-safeguards",
    "Selling to agents -- 是否能有效，快速，便宜，稳定地解决 agent 问题":
        "selling-to-agents-effectively-quickly-cheaply-reliably",
    "Skill 是人类专家预先设计的 context 包":
        "skill-is-a-pre-designed-context-package-by-human-experts",
    "Skills 是模块化的、可插拔的上下文环境":
        "skills-are-modular-pluggable-context-environments",
    "The Cold Start Probem｜Anti-network effects":
        "the-cold-start-problem-anti-network-effects",
    "Theory of Learning -- 拟合以获得控制力":
        "theory-of-learning-fitting-to-gain-control",
    "Time awareness 重要":
        "time-awareness-is-important",
    "Time endurance 是衡量物品价值的重要指标":
        "time-endurance-is-an-important-measure-of-value",
    "World vs Worlding -- 世界是动态的、开放的、持续生成的过程":
        "world-vs-worlding-the-world-is-dynamic-open-and-continuously-generated",
    "“一人公司“ 本质是企业将就业风险个人化 + 个体合理化叙事":
        "solo-company-is-enterprises-personalizing-employment-risk-plus-individual-rationalization",
    "“一人公司” 只是个体被裁员之后的合理化叙事和心理安慰":
        "solo-company-is-just-rationalization-and-consolation-after-layoff",
    "“一人公司” 是企业抛弃传统契约将风险转移给个人的包装和话语体系":
        "solo-company-is-enterprises-abandoning-traditional-contracts-and-shifting-risk-to-individuals",
    "“技术新贵” vs “旧利维坦” 之战":
        "tech-nouveau-riche-vs-old-leviathan",
    "一个产品成功的体现是彻底融入人们的生活、改变人们的生活方式":
        "a-products-success-is-measured-by-how-deeply-it-integrates-into-and-changes-peoples-lives",
    "一个夜晚和两个男人的悲剧":
        "one-night-and-the-tragedy-of-two-men",
    "一个好申请是一个好故事":
        "a-good-application-is-a-good-story",
    "一个学科最前沿考虑的通常是最底层（没想清楚）的问题":
        "the-frontier-of-a-field-grapples-with-its-most-foundational-unsolved-questions",
    "一个安全的环境是鼓励创造的前提":
        "a-safe-environment-is-the-prerequisite-for-encouraging-creativity",
    "一个文明对能源的利用体现其先进程度":
        "a-civilizations-use-of-energy-reflects-its-advancement",
    "一个组织必须始终处于被管理的状态":
        "an-organization-must-always-be-in-a-managed-state",
    "一人公司最大的难点在于克服 uncertainty":
        "the-biggest-challenge-of-a-solo-company-is-overcoming-uncertainty",
    "一维运动在时间线上的拉伸形成形成二维函数":
        "one-dimensional-motion-stretched-along-time-forms-a-two-dimensional-function",
    "上学是手段，受教育是目的":
        "schooling-is-the-means-education-is-the-end",
    "上层理想和下层实践的落差":
        "the-gap-between-top-down-ideals-and-bottom-up-practice",
    "上帝按照自己的样子造人，人按照自己的样子创造 AI":
        "god-created-humans-in-his-image-humans-create-ai-in-theirs",
    "不一定要同龄社交，但一定要同频社交":
        "you-dont-need-same-age-peers-but-you-do-need-same-frequency-peers",
    "不同的地区也处在不同的时区":
        "different-regions-exist-in-different-time-zones",
    "不同的工作选择适合的正确的团队类型":
        "different-work-requires-different-team-types",
    "不平等是对抗熵增定律产生的正常现象":
        "inequality-is-a-natural-result-of-fighting-entropy",
    "不求甚解的直觉能力很重要":
        "the-ability-to-grasp-without-deep-understanding-is-important",
    "不玩他们的游戏了（1）":
        "refusing-to-play-their-game-1",
    "与其建立一家封闭的巨头公司，不如创造一个能自我传播的伟大理念":
        "instead-of-building-a-closed-giant-create-a-self-propagating-great-idea",
    "与其通过制造稀缺来捕获价值，用技术去消除稀缺来创造价值":
        "instead-of-capturing-value-through-scarcity-use-technology-to-eliminate-scarcity-and-create-value",
    "世界上的资源本质上是无限的":
        "the-worlds-resources-are-essentially-infinite",
    "世界不是一个公平的竞技场":
        "the-world-is-not-a-fair-playing-field",
    "世界信息论":
        "world-information-theory",
    "世界无目的、人有目的":
        "the-world-has-no-purpose-humans-do",
    "世界是建构和解构的循环":
        "the-world-is-a-cycle-of-construction-and-deconstruction",
    "世界是必然性与偶然性，确定性与非确定性的交织和塑造":
        "the-world-is-shaped-by-necessity-and-chance-certainty-and-uncertainty",
    "世界是时间和空间的总和":
        "the-world-is-the-sum-of-time-and-space",
    "世界本质上还是一个由 teams, tribe, organizations 主导的世界":
        "the-world-is-still-fundamentally-dominated-by-teams-tribes-and-organizations",
    "世界由1%和99%的人构成":
        "the-world-is-made-of-the-1-percent-and-the-99-percent",
    "世界的双层剥削模型 -- 赌场和庄家":
        "the-worlds-two-tier-exploitation-model-casino-and-house",
    "世间一切问题分为两种 -- 能解决的和不能解决的":
        "all-problems-in-the-world-are-either-solvable-or-unsolvable",
    '东亚教育推崇\u201c技术崇拜\u201d':
        "east-asian-education-worships-technical-mastery",
    "东方思想重感性，西方思想重理性":
        "eastern-thought-values-intuition-western-thought-values-reason",
    '丝绸是人类社会中\u201c权力、阶级与欲望\u201d的终极视觉化':
        "silk-is-the-ultimate-visualization-of-power-class-and-desire-in-human-society",
    "两种世界观：创造-自由 vs 攫取-分配":
        "two-worldviews-creation-freedom-vs-extraction-distribution",
    "两种创业思路 --- Solution vs Demand -first":
        "two-startup-approaches-solution-first-vs-demand-first",
    "两种记住的途径":
        "two-pathways-to-remembering",
    "个人品牌与社媒的建立与复出":
        "building-and-rebuilding-personal-brand-and-social-media",
    "个人想法或作品的三个输出接口":
        "three-output-interfaces-for-personal-ideas-and-work",
    "个人核心竞争力 = 独特的个性知识经验组合":
        "personal-core-competency-equals-unique-combination-of-personality-knowledge-and-experience",
    "个人解放与个人话语权":
        "personal-liberation-and-personal-voice",
    "中国滴滴司机经济情况":
        "economic-situation-of-didi-drivers-in-china",
    "临界知识":
        "threshold-knowledge",
    "为了效率和便捷向隐私妥协是科技发展的趋势":
        "compromising-privacy-for-efficiency-is-a-trend-in-tech-development",
    "为了环境中的行动而思考":
        "thinking-for-action-in-context",
    "为了理解宏观必须无知于微观":
        "to-understand-the-macro-you-must-be-ignorant-of-the-micro",
    "主体-客体转化带来心智升级":
        "subject-object-transformation-brings-mental-upgrade",
    "主动 vs 被动学习":
        "active-vs-passive-learning",
    "主动从众者是世界上很多麻烦的根源":
        "voluntary-conformists-are-the-root-of-many-problems-in-the-world",
    "主动提取帮助提升记忆":
        "active-retrieval-enhances-memory",
    "主反射区建立新结构":
        "primary-reflex-zone-builds-new-structure",
    "主权个人本质上是极端的精英主义":
        "sovereign-individual-is-essentially-extreme-elitism",
    "书店是现代文明的教堂":
        "bookstores-are-the-cathedrals-of-modern-civilization",
    "买东西是思考商品和现金要持有哪个？":
        "buying-things-is-deciding-whether-to-hold-the-good-or-the-cash",
    "买股票就是买公司":
        "buying-stock-is-buying-the-company",
    "买股票是买公司所有权":
        "buying-stock-is-buying-ownership-of-a-company",
    "争取自己的利益就是争取国家利益":
        "fighting-for-your-own-interests-is-fighting-for-national-interests",
    "事物本质即关系":
        "the-essence-of-things-is-relationships",
    "互联网不是好的思考工具":
        "the-internet-is-not-a-good-thinking-tool",
    "交流低效论":
        "communication-is-inefficient",
    "交流是对隐私的妥协":
        "communication-is-a-compromise-of-privacy",
    "交通的劳顿给目的地带来了意义":
        "the-toil-of-travel-gives-meaning-to-the-destination",
    "产品本身的壁垒变弱，内容和品牌更重要":
        "product-moats-weaken-content-and-brand-become-more-important",
    "产品背后必须有虚构的故事的凝聚力量":
        "a-product-must-be-held-together-by-a-fictional-story",
    "产品要做到易传播却难以复制":
        "products-should-be-easy-to-spread-and-hard-to-replicate",
    "产生智能的方式 -- 只有强化学习才能产生真正的智能":
        "how-intelligence-emerges-only-reinforcement-learning-produces-true-intelligence",
    "人 & 事 > 环境":
        "people-and-work-over-environment",
    "人、知识和权威":
        "people-knowledge-and-authority",
    '人与 AI -- "头脑"与"身体"的互补':
        "human-and-ai-complementarity-of-mind-and-body",
    "人与世界的黑箱认识论":
        "black-box-epistemology-of-humans-and-the-world",
    "人与人最大的差异在于认知差异":
        "the-greatest-difference-between-people-is-cognitive-difference",
    "人之为人的价值只在极少情况下体现":
        "the-value-of-being-human-is-only-expressed-in-rare-circumstances",
    "人可以将眼睛闭上，却无法将耳朵关掉":
        "humans-can-close-their-eyes-but-not-their-ears",
    "人在知识传递过程中逐渐消逝":
        "humans-gradually-disappear-in-the-process-of-knowledge-transmission",
    "人工智能使智能不再稀缺":
        "artificial-intelligence-makes-intelligence-no-longer-scarce",
    "人工智能是能够创造文明的物种":
        "artificial-intelligence-is-a-species-capable-of-creating-civilization",
    "人工智能领域发展的速度太快了":
        "the-field-of-artificial-intelligence-is-developing-too-fast",
    "人应当做有信誉担当责任承担者":
        "people-should-be-credible-responsible-agents",
    "人必须与他人共处":
        "humans-must-coexist-with-others",
    "人性的弱点是反自由":
        "human-natures-weakness-is-anti-freedom",
    "人才是组织间竞争的重要资源":
        "talent-is-the-key-resource-in-competition-between-organizations",
    "人文通识教育的危机在于与世界割裂":
        "the-crisis-of-liberal-arts-education-is-its-disconnect-from-the-world",
    "人是一台人类智能机器":
        "humans-are-human-intelligence-machines",
    "人是导致因果链条断裂的开端":
        "humans-are-the-origin-of-broken-causal-chains",
    "人最终会忘掉绝大部分内容":
        "humans-ultimately-forget-most-of-what-they-learn",
    "人最美好的体验就是不确定性向确定性坍缩的那个短短的过程 -- 追求和得到之间的张力":
        "the-best-human-experience-is-the-brief-collapse-of-uncertainty-into-certainty",
    "人生不是公司，生活不是管理，人不是低效的 bug":
        "life-is-not-a-company-living-is-not-management-people-are-not-inefficiency-bugs",
    "人生就是在很短的时间内创造出一些很美丽的东西":
        "life-is-creating-beautiful-things-in-a-very-short-time",
    "人生高度的界限就是想象力的界限":
        "the-limit-of-how-far-you-go-in-life-is-the-limit-of-your-imagination",
    "人的作恶的都是以正义为名":
        "human-evil-is-always-done-in-the-name-of-justice",
    "人的基本能力 = 意义的生产和交换":
        "basic-human-capability-equals-production-and-exchange-of-meaning",
    "人的工作价值：意义创造，判断决策，责任承担":
        "the-value-of-human-work-meaning-creation-judgment-and-responsibility",
    "人的操作系统 -- 认知、判断、行动":
        "the-human-operating-system-cognition-judgment-action",
    "人的本性都是相似的":
        "human-nature-is-fundamentally-similar",
    "人的能动性在于微决策":
        "human-agency-lies-in-micro-decisions",
    "人类判断和意义的本质是无限中寻找有限":
        "human-judgment-and-meaning-is-finding-the-finite-within-the-infinite",
    "人类历史的三大革命":
        "the-three-great-revolutions-of-human-history",
    "人类发明了越发强大复杂的信息系统":
        "humans-have-invented-increasingly-powerful-and-complex-information-systems",
    "人类发明和利用工具的同时被工具所利用和控制":
        "humans-invent-and-use-tools-while-being-used-and-controlled-by-them",
    "人类数据是AI能力的天花板，通往 AGI 唯有通过经验和强化学习":
        "human-data-is-the-ceiling-of-ai-capability-agi-requires-experience-and-reinforcement-learning",
    "人类是唯一能够在发现自己无关紧要时，依然觉得这件事本身意义重大的存在。":
        "humans-are-the-only-beings-who-find-meaning-in-their-own-irrelevance",
    "人类生产力革命的下一个风口":
        "the-next-frontier-of-human-productivity-revolution",
    "人类的希望是也许":
        "humanitys-hope-is-maybe",
    "人类的脆弱和局限性是人之为人的根本意义源泉":
        "human-fragility-and-limitation-is-the-fundamental-source-of-human-meaning",
    "人类的进化是开挂":
        "human-evolution-is-cheating",
    "人类的进步 = 学习 + 创新":
        "human-progress-equals-learning-plus-innovation",
    "人类迄今为止获取知识的效率很低":
        "humans-have-been-very-inefficient-at-acquiring-knowledge",
    "人脑并非统一的整体，而是本能和进化的对抗":
        "the-brain-is-not-a-unified-whole-but-a-conflict-between-instinct-and-evolution",
    "人脑的记忆与遗忘":
        "memory-and-forgetting-in-the-human-brain",
    "人间即地狱":
        "the-human-world-is-hell",
    "人际交往很多是吹出更多的肥皂泡，然后看到更多的肥皂泡破裂":
        "much-of-human-interaction-is-blowing-soap-bubbles-and-watching-them-burst",
    "仍难以被取代的高级智力边界":
        "the-remaining-frontier-of-higher-intelligence-difficult-to-replace",
    "从一个笼子滚进一个更大的笼子":
        "rolling-from-one-cage-into-a-larger-one",
    "从广向深的转向":
        "shifting-from-breadth-to-depth",
    "从知识社会到 Agent 社会":
        "from-knowledge-society-to-agent-society",
    "从组织社会到主权个人社会":
        "from-organizational-society-to-sovereign-individual-society",
    "他人价值是能够带给他人的价值":
        "value-to-others-is-the-value-you-can-bring-to-others",
    "以前卖产品赚钱，以后卖思想赚钱":
        "used-to-sell-products-now-sell-ideas",
    "任何体系都会鼓励顺从压制智慧":
        "any-system-encourages-conformity-and-suppresses-wisdom",
    "任何问题都是系统的问题":
        "every-problem-is-a-systems-problem",
    "企业失败论":
        "theory-of-corporate-failure",
    "企业思维要宏观判断和结果，学生思维设路径和过程":
        "business-thinking-focuses-on-macro-judgment-and-outcomes-student-thinking-on-paths-and-processes",
    "企业的三层划分":
        "the-three-tier-division-of-organizations",
    "伟大的科技发明创造以前不存在的需求":
        "great-tech-inventions-create-demand-that-didnt-previously-exist",
    "传统“经理”仅仅是命令和信息的传递者":
        "traditional-managers-are-merely-transmitters-of-commands-and-information",
    "传统大学文凭价值在 AI 时代受到挑战":
        "traditional-university-degree-value-is-challenged-in-the-ai-age",
    "传统宇宙的模型正在崩溃":
        "the-traditional-model-of-the-universe-is-collapsing",
    "传统的以人为节点的信息系统正在逐步瓦解":
        "traditional-human-node-information-systems-are-gradually-dissolving",
    "低信任式防御导致错过机会":
        "low-trust-defensiveness-leads-to-missed-opportunities",
    "低效学术研究是对社会资源的极大浪费":
        "inefficient-academic-research-is-a-massive-waste-of-social-resources",
    "低级乐趣和高级乐趣互不干扰":
        "low-level-and-high-level-pleasures-do-not-interfere-with-each-other",
    "你与万物纠缠":
        "you-are-entangled-with-everything",
    "你是世界的共同创造者":
        "you-are-a-co-creator-of-the-world",
    "你现在没有资格说话，因为你站在国旗之下":
        "you-have-no-right-to-speak-because-you-stand-under-the-flag",
    "使用 AI 的三个阶段 -- 工具、助手、舞伴":
        "three-stages-of-using-ai-tool-assistant-dance-partner",
    "保持创造力的关键是掌握必要的知识同时又不被其限制住":
        "the-key-to-creativity-is-mastering-necessary-knowledge-without-being-constrained-by-it",
    "信息全球化造就了景观世界与人关心能力的下降":
        "information-globalization-creates-a-spectacle-world-and-declining-human-care",
    "信息初步搜集 prompt":
        "initial-information-gathering-prompt",
    "信息是前沿物理迷失的一块重要拼图？":
        "is-information-a-missing-piece-in-frontier-physics",
    "信息生态位的重要性":
        "the-importance-of-information-niches",
    "信息的价值难以由 monetary value 衡量，故有定价自由":
        "information-value-is-hard-to-measure-in-monetary-terms-hence-pricing-freedom",
    "信息的传输比物质的传输消耗更少的能量":
        "transmitting-information-consumes-less-energy-than-transmitting-matter",
    "信息的搜寻、管理和使用决定了一个人一生的发展":
        "how-you-search-manage-and-use-information-determines-your-lifes-trajectory",
    "信息的本质是浓缩的时间":
        "the-essence-of-information-is-condensed-time",
    "债务是对别人未来劳动的合法索取权":
        "debt-is-a-legal-claim-on-others-future-labor",
    "偏离共识15度，远离大厂三条街":
        "deviate-15-degrees-from-consensus-to-stay-far-ahead-of-big-tech",
    "做一个理想公民的标准非常高":
        "the-standard-for-being-an-ideal-citizen-is-very-high",
    "做可缩放的事情":
        "do-things-that-scale",
    "做坚定而灵活的领导者":
        "be-a-firm-yet-flexible-leader",
    "做工具和教人用工具同等重要":
        "building-tools-and-teaching-people-to-use-them-are-equally-important",
    "停止内耗":
        "stop-internal-conflict",
    "停止抱怨规则 -- 学习并打破它":
        "stop-complaining-about-rules-learn-and-break-them",
    "全世界孩子都要遭这罪":
        "children-all-over-the-world-suffer-the-same-ordeal",
    "公司 = 企业文化 + 商业模式":
        "company-equals-culture-plus-business-model",
    "共同富裕":
        "common-prosperity",
    "共同富裕并不是值得追求的目标，因为它并不带来总体幸福指数的提升":
        "common-prosperity-is-not-a-worthy-goal-because-it-does-not-raise-overall-happiness",
    "关于 AI 创作的声明":
        "statement-on-ai-creation",
    "关于娱乐文化和高级艺术的讨论":
        "discussion-on-entertainment-culture-and-high-art",
    "内感受力是感受身体内部状态的能力":
        "interoception-is-the-ability-to-sense-the-bodys-internal-states",
    "写论文是写一个侦探故事":
        "writing-an-essay-is-writing-a-detective-story",
    "决策学第一原理":
        "first-principles-of-decision-making",
    "凡是令你烦躁的防止你抑郁":
        "whatever-irritates-you-prevents-your-depression",
    "函数是一维向二维的跃迁":
        "a-function-is-a-leap-from-one-dimension-to-two",
    "刘一达的才华":
        "liu-yidas-talent",
    "创业 = 赤裸直面市场":
        "entrepreneurship-equals-facing-the-market-naked",
    "创业一定是你要奔赴一个什么东西，而不是要逃离什么东西":
        "entrepreneurship-must-be-running-toward-something-not-away-from-something",
    "创办一个人类知识图书馆":
        "founding-a-library-of-human-knowledge",
    "创意即链接":
        "creativity-is-connection",
    "创新是重新定义人类的需求与渴望":
        "innovation-is-redefining-human-needs-and-desires",
    "创新需要既有距离感有需要有权限":
        "innovation-requires-both-distance-and-permission",
    "创造的成瘾性":
        "the-addictiveness-of-creation",
    "创造的本质是剥离":
        "the-essence-of-creation-is-stripping-away",
    "创造的本质是自我投射":
        "the-essence-of-creation-is-self-projection",
    "判断现代国家的标准是富人需不需要得到权贵的保护":
        "the-measure-of-a-modern-state-is-whether-the-rich-need-the-protection-of-the-powerful",
    "制度决定人性":
        "institutions-determine-human-nature",
    "功绩主体实施自我剥削":
        "the-achievement-subject-self-exploits",
    "功绩社会是倦怠社会":
        "the-achievement-society-is-a-burnout-society",
    "功绩社会的自由导致束缚":
        "the-freedom-of-the-achievement-society-leads-to-bondage",
    "化纤是现代商业和化学工业合谋制造的产物，用于商业赚钱，剥削工人，破坏地球，制造流水线快时尚":
        "synthetic-fiber-is-a-product-of-collusion-between-commerce-and-chemistry-to-exploit-workers-and-the-planet",
    "匮乏心态 VS 富足心态":
        "scarcity-mindset-vs-abundance-mindset",
    "历史上三次生产力革命":
        "three-productivity-revolutions-in-history",
    "历史悲剧不是必然的":
        "historical-tragedies-are-not-inevitable",
    "历史由胜者书写":
        "history-is-written-by-the-winners",
    "历史的主体是民族":
        "the-nation-is-the-subject-of-history",
    "反转生态位的面试策略":
        "interview-strategy-of-inverting-the-ecological-niche",
    "发掘生命的暗时间":
        "mining-the-dark-time-of-life",
    "口耳相传是最原始的信息传递方式":
        "oral-transmission-is-the-most-primitive-form-of-information-transfer",
    "古法 vs AI 阅读":
        "traditional-vs-ai-reading",
    "古法写作和阅读的慢价值":
        "the-slow-value-of-traditional-writing-and-reading",
    "只包装基础模型能力的垂类 specialized AI 没有未来":
        "vertical-ai-that-only-wraps-base-model-capabilities-has-no-future",
    "只有大规模的暴力和瘟疫能带来均贫富":
        "only-mass-violence-and-plague-can-equalize-wealth",
    "只有当一整个社会对人的评价方式发生变化之后教育才会回归起本质":
        "education-returns-to-its-essence-only-when-society-changes-how-it-evaluates-people",
    "只有知识才能改变我们的行为":
        "only-knowledge-can-change-our-behavior",
    "后工作时代，意义不会消失只会转移":
        "in-the-post-work-era-meaning-will-not-disappear-but-transfer",
    "否定性有其意义":
        "negativity-has-its-meaning",
    "员工成为老板和 AI 之间逐步被 phase-out 的中间层":
        "employees-become-the-middle-layer-being-phased-out-between-boss-and-ai",
    "呼吸是访问无意识身体的钥匙":
        "breath-is-the-key-to-accessing-the-unconscious-body",
    "呼啸山庄":
        "wuthering-heights",
    "和 AI 合作创作是逐渐明确目标的动态过程":
        "collaborating-with-ai-is-a-dynamic-process-of-gradually-clarifying-goals",
    "和人工智能对话需要阻力":
        "dialogue-with-ai-needs-resistance",
    "品味需要清楚偏见":
        "taste-requires-clarity-about-bias",
    "商业的个人化和个人时代的到来":
        "the-personalization-of-business-and-the-arrival-of-the-individual-era",
    "善恶先于成败？":
        "does-good-and-evil-precede-success-and-failure",
    "噪声是信息的基础":
        "noise-is-the-foundation-of-information",
    "因无队可站在小团体中浑水摸鱼":
        "having-no-side-to-take-means-freeloading-in-small-groups",
    "围棋启发的战略思维":
        "strategic-thinking-inspired-by-go",
    "在不确定的世界中建立凸型结构":
        "building-convex-structures-in-an-uncertain-world",
    "在中文屋内的不是机器，其实一直是人类":
        "the-one-inside-the-chinese-room-was-never-the-machine-it-was-always-the-human",
    "在控制和放任之间找到平衡点":
        "finding-the-balance-between-control-and-letting-go",
    "在没有意义的世界中追寻和建立意义十分珍贵":
        "seeking-and-creating-meaning-in-a-meaningless-world-is-precious",
    "地球是世界的 Common Kitchen":
        "earth-is-the-worlds-common-kitchen",
    "培养对 delta 的敏感度":
        "cultivating-sensitivity-to-delta",
    "增大未来的可能性 = 趁早行动 + 增添选项":
        "expanding-future-possibilities-equals-acting-early-and-adding-options",
    "复利效应 -- 正向循环直至临界点":
        "compound-effect-positive-feedback-loop-until-tipping-point",
    "复杂性的本质：简单 × 迭代 = 复杂 + 精彩":
        "the-essence-of-complexity-simple-times-iteration-equals-complex-and-brilliant",
    "外包辅助性工作有利于组织专注本职":
        "outsourcing-auxiliary-work-helps-organizations-focus-on-their-core",
    "大学是象牙塔和避风港":
        "university-is-an-ivory-tower-and-a-refuge",
    "大学申请 vs 应聘，想法 vs 行动":
        "college-application-vs-job-application-ideas-vs-action",
    "大学申请文书的目的是为了展示自我":
        "the-purpose-of-college-application-essays-is-self-expression",
    "大学里孤独真的会成为问题":
        "loneliness-in-college-can-become-a-real-problem",
    "大航海之后最大的危机是如何解释这个世界":
        "the-biggest-crisis-after-the-age-of-exploration-was-how-to-explain-the-world",
    "大语言模型对世界理解的天花板是人类语言的描述极限":
        "the-ceiling-of-llm-world-understanding-is-the-limits-of-human-language",
    "大量机会存在于私域和信任之中":
        "vast-opportunities-exist-in-private-networks-and-trust",
    "大量进行生活图片和视频数据的记录和收集有价值":
        "massively-recording-and-collecting-life-photos-and-videos-has-value",
    "天才不但要聪明还要正确":
        "genius-requires-not-just-intelligence-but-being-right",
    "女女是暴殄天物":
        "lesbians-are-a-waste-of-good-women",
    "好的中文启蒙作家":
        "good-chinese-enlightenment-writers",
    "好的工具不只关注功效，更重视用户的情感体验":
        "good-tools-focus-not-just-on-function-but-on-emotional-experience",
    "如何利用碎片时间":
        "how-to-use-fragmented-time",
    "如何面对孤独是人生重要的课题":
        "how-to-face-solitude-is-an-important-life-question",
    "如何（用 AI）快速·深度学习任何知识领域":
        "how-to-rapidly-and-deeply-learn-any-field-with-ai",
    "如果三战发生，新的轴心国会是谁已经很明显了":
        "if-wwiii-happens-the-new-axis-powers-are-obvious",
    "如果世界是一台计算机，它的计算量将是惊人的巨大。":
        "if-the-world-is-a-computer-its-computational-load-would-be-staggering",
    "如果科技终将脱离人类，我们还能做什么？":
        "if-technology-ultimately-detaches-from-humanity-what-can-we-still-do",
    "妄想建立护城河不如专心捕捉下一个阿尔法":
        "stop-trying-to-build-moats-and-focus-on-catching-the-next-alpha",
    "娱乐低俗艺术也有它的价值":
        "lowbrow-entertainment-art-also-has-its-value",
    "学习和考试让生活瞬间变得纯粹":
        "studying-and-exams-make-life-instantly-pure",
    "学习是为了获得探索世界的快乐和应对未来的能力":
        "learning-is-for-the-joy-of-exploring-the-world-and-the-ability-to-face-the-future",
    "学习的本质是个体与世界的持续互动":
        "the-essence-of-learning-is-continuous-interaction-between-the-individual-and-the-world",
    "学习的目的是知识的传递以达到物种文明的进化":
        "the-purpose-of-learning-is-knowledge-transmission-for-the-evolution-of-civilization",
    "学习要知其所以然":
        "learning-requires-understanding-the-why",
    "学历像是人的脸":
        "academic-credentials-are-like-a-persons-face",
    "学历的作用是用来证明我们有学习的能力":
        "the-role-of-academic-credentials-is-to-prove-the-ability-to-learn",
    "学术是关于人与人的理解":
        "academia-is-about-understanding-between-people",
    "学术界和知识分子被排除在政治系统之外":
        "academia-and-intellectuals-are-excluded-from-the-political-system",
    "学术研究：标准化 > 智慧":
        "academic-research-standardization-over-wisdom",
    "学校冠冕堂皇地浪费这资源教着错误的内容":
        "schools-pompously-waste-resources-teaching-the-wrong-content",
    "学校的主要作用不再是帮助我们获得信息和知识":
        "the-main-role-of-schools-is-no-longer-to-help-us-acquire-information-and-knowledge",
    "学校的作用在于帮助学生找到自己的热爱、激情和意义":
        "the-role-of-school-is-to-help-students-find-their-passion-and-meaning",
    "学校的意义":
        "the-meaning-of-school",
    "学校的结束是生活的真正开始":
        "the-end-of-school-is-the-true-beginning-of-life",
    "学校自由是很高的财富自由":
        "academic-freedom-is-a-high-form-of-financial-freedom",
    "学校需要与社会接轨形成开放体系":
        "schools-need-to-connect-with-society-to-form-an-open-system",
    "学生的成就必须建立在长处之上":
        "student-achievement-must-be-built-on-strengths",
    "宇宙大爆炸与时间":
        "the-big-bang-and-time",
    "宇宙的终极目标是通过 agency 抗熵阻止自己的死亡":
        "the-universes-ultimate-goal-is-to-resist-entropy-through-agency",
    "安全空间 -- 抵御毁灭性失败的生命线":
        "safe-space-lifeline-against-catastrophic-failure",
    "害怕死亡是害怕知识和精神被遗忘":
        "fear-of-death-is-fear-of-knowledge-and-spirit-being-forgotten",
    "家长应该是守护孩子的最后一道防线":
        "parents-should-be-the-last-line-of-defense-for-their-children",
    '家长要做\u201c天使投资人\u201d，不要做项目经理。':
        "parents-should-be-angel-investors-not-project-managers",
    "对于科技公司，技术不是可外包的工作，而是发展的基石":
        "for-tech-companies-technology-is-not-outsourceable-work-but-the-foundation-of-growth",
    "对你的爱只属于我自己":
        "my-love-for-you-belongs-only-to-me",
    "对工作两层属性的认知和排序体现人生价值的衡量标准":
        "understanding-the-two-dimensions-of-work-reflects-how-you-measure-lifes-value",
    "对当下不满是因为看到了未来的可能":
        "dissatisfaction-with-the-present-comes-from-seeing-the-possibility-of-the-future",
    "对效能的追求使行动降格为劳动":
        "the-pursuit-of-efficiency-degrades-action-to-labor",
    "对有钱人实施合法剥削无法解决公平问题":
        "legally-exploiting-the-rich-cannot-solve-the-problem-of-fairness",
    "对生命存在本身的极致快乐":
        "the-ultimate-joy-of-existence-itself",
    "对自己真正想要的东西，我太缺乏竞争和争取的欲望了":
        "i-lack-the-competitive-drive-to-fight-for-what-i-truly-want",
    "对错存在于同一个层次之内":
        "right-and-wrong-exist-within-the-same-level",
    "寻找已知答案的能力 vs 发现问题提出假设并验证的能力":
        "finding-known-answers-vs-discovering-problems-forming-hypotheses-and-testing-them",
    "将知识运用于工作带来生产力激增":
        "applying-knowledge-to-work-produces-a-surge-in-productivity",
    "小部分人类驱动技术进步，技术进步驱动人类整体进步":
        "a-small-portion-of-humans-drive-technological-progress-which-drives-human-progress-overall",
    "就算以后从事数据工作我的眼光永远是向上看的":
        "even-in-data-work-my-gaze-will-always-be-upward",
    "层次之间的关系是高度｜深度的关系 (z-axis)":
        "the-relationship-between-levels-is-one-of-height-and-depth-on-the-z-axis",
    "工作体现人的价值":
        "work-embodies-human-value",
    "工作的价值有两个指向":
        "work-has-two-dimensions-of-value",
    "市场的优势在于围绕信息来组织经济活动":
        "the-markets-advantage-is-organizing-economic-activity-around-information",
    "带有目的性的搜寻信息":
        "purposeful-information-seeking",
    "帮别人做减法":
        "helping-others-subtract",
    "平常心是回归本质的自然结果":
        "equanimity-is-the-natural-result-of-returning-to-essence",
    "平庸者终其一生只能平庸":
        "the-mediocre-can-only-be-mediocre-for-their-whole-life",
    "平静的生活也可以过的兴致勃勃":
        "a-quiet-life-can-also-be-lived-with-enthusiasm",
    "幸福是因为无知而非勇敢":
        "happiness-comes-from-ignorance-not-courage",
    "广义的交通即信息的传输大大提升交通效率":
        "transportation-in-the-broad-sense-is-information-transmission-greatly-improving-efficiency",
    "应当在这样美好的时光死去":
        "one-should-die-in-such-beautiful-times",
    "建构与解构意义与无意义是人生的乐趣":
        "constructing-and-deconstructing-meaning-and-meaninglessness-is-the-pleasure-of-life",
    "建立一个开源知识共享社区":
        "building-an-open-source-knowledge-sharing-community",
    "建立一个最权威的知识机构管理人类生产的信息和知识":
        "building-the-most-authoritative-knowledge-institution-to-manage-human-produced-information",
    "开封骑行的思考":
        "reflections-from-cycling-in-kaifeng",
    "弱不代表有理":
        "weakness-does-not-mean-being-right",
    "强权难以磨灭故事":
        "power-cannot-easily-erase-stories",
    "强者不需要组织来干成大事":
        "the-strong-do-not-need-organizations-to-accomplish-great-things",
    "当一个人什么都不做的时候，能做什么？":
        "what-can-a-person-do-when-doing-nothing",
    "当前人生的目标｜方向":
        "current-life-goals-and-direction",
    "当界面不再被看见，交互才能真正融入生命":
        "when-the-interface-disappears-interaction-truly-merges-with-life",
    "当药成为病的一部分":
        "when-medicine-becomes-part-of-the-disease",
    "彼岸不如此岸":
        "the-other-shore-is-not-better-than-this-shore",
    "往往某个行业里混口饭吃的人远多于那些真正面对心灵的召唤想做事的人":
        "most-people-in-a-field-are-just-getting-by-not-answering-a-calling",
    "很多家长对自家孩子一无所知":
        "many-parents-know-nothing-about-their-own-children",
    "很多时候全面性禁止反而适得其反":
        "blanket-prohibitions-often-backfire",
    "很多智者并不是口若悬河之人":
        "many-wise-people-are-not-eloquent-talkers",
    "微积分的本质是维度间的跳跃":
        "the-essence-of-calculus-is-a-leap-between-dimensions",
    "快乐 vs 意义的虚假二元对立":
        "the-false-dichotomy-of-happiness-vs-meaning",
    "快乐本身就是学习的意义":
        "joy-itself-is-the-meaning-of-learning",
    "快门记录真相":
        "the-shutter-records-truth",
    "思想塑造世界":
        "ideas-shape-the-world",
    "思想观念决定行为选择":
        "ideas-and-beliefs-determine-behavioral-choices",
    "思想记录和交流的载体需要得到革新":
        "the-medium-for-recording-and-communicating-ideas-needs-to-be-revolutionized",
    "思维方法够抵抗算法":
        "thinking-methods-can-resist-algorithms",
    "思考决策的本质 = 概念的定义 + 分类｜比较｜因果":
        "the-essence-of-thinking-and-decision-making-equals-defining-concepts-plus-classifying-comparing-and-causation",
    "思考力是一种（将可能性转化为现实性的）力":
        "thinking-is-the-power-to-convert-possibility-into-reality",
    "思考的核心目标是预测未来":
        "the-core-goal-of-thinking-is-to-predict-the-future",
    "总应该是有道理的":
        "there-should-always-be-a-reason",
    "总要争一争":
        "always-worth-fighting-for",
    "情绪帮助决策":
        "emotions-aid-decision-making",
    "想法太多时间太少":
        "too-many-ideas-too-little-time",
    "想要 Highlight 的欲望源于对于信息密度高的文字的敏感":
        "the-desire-to-highlight-comes-from-sensitivity-to-information-dense-text",
    '意识 = \u201c我\u201d的连贯叙事':
        "consciousness-equals-the-coherent-narrative-of-the-self",
    "愚昧 vs 无知":
        "ignorance-vs-not-knowing",
    "成不了庄家也要成为中间层的荷官":
        "if-you-cant-be-the-house-become-the-dealer",
    "成为霸主要找到独特的生态位发展独特的器官":
        "to-become-dominant-find-a-unique-niche-and-develop-unique-capabilities",
    "成功不是挤上独木桥，而是开辟新赛道":
        "success-is-not-competing-on-a-narrow-bridge-but-opening-a-new-track",
    "成长不是努力，而是结构性杠杆的发现和运用":
        "growth-is-not-hard-work-but-discovering-and-applying-structural-leverage",
    "我不再像从前一样感受世界":
        "i-no-longer-experience-the-world-the-way-i-used-to",
    "我们仍然生活在后工业时代":
        "we-still-live-in-the-post-industrial-era",
    "我们时代的冲突是开放和逆开放力量的对抗":
        "the-conflict-of-our-time-is-between-open-and-anti-open-forces",
    "我们生活在巨大的差距里":
        "we-live-in-enormous-gaps",
    "我的时代值得投资的领域技能":
        "fields-and-skills-worth-investing-in-for-my-era",
    "我需要缩短行动间隙":
        "i-need-to-shorten-the-gap-between-thought-and-action",
    "戴上面具假扮我自己":
        "wearing-a-mask-to-pretend-to-be-myself",
    "所有无用的知识都是有用的":
        "all-useless-knowledge-is-useful",
    "手写的代码比 AI 写得好":
        "handwritten-code-is-better-than-ai-written-code",
    "打破技术崇拜 -- 商业价值比技术复杂度更重要":
        "break-the-cult-of-technology-business-value-matters-more-than-technical-complexity",
    "扔书和短暂的自由":
        "throwing-away-books-and-brief-freedom",
    "技术 + 理念缺一不可":
        "technology-and-vision-are-both-indispensable",
    "技术发展的目标是由繁入简":
        "the-goal-of-technological-development-is-simplification-from-complexity",
    "技术进步促进教育改革":
        "technological-progress-drives-education-reform",
    "把每一笔消费看作一笔投资":
        "treat-every-purchase-as-an-investment",
    "抽烟是为了证明自己是大人":
        "smoking-is-to-prove-you-are-an-adult",
    "招募技术合伙人不是雇佣，而是发出冒险的邀约":
        "recruiting-a-technical-co-founder-is-not-hiring-but-an-invitation-to-adventure",
    "拯救地球从身边做起":
        "saving-the-earth-starts-from-around-you",
    "掌握多少知识也早已不是一个人的核心竞争力":
        "how-much-knowledge-you-possess-is-no-longer-a-core-competitive-advantage",
    "接收信息的媒介塑造了信息本身":
        "the-medium-through-which-we-receive-information-shapes-the-information-itself",
    "控制是可能性空间的缩小":
        "control-is-the-reduction-of-possibility-space",
    "控制论、系统论、信息论（三论）的崛起潮流":
        "the-rise-of-cybernetics-systems-theory-and-information-theory",
    "提升交通效率解放人类生产力":
        "improving-transportation-efficiency-liberates-human-productivity",
    "提案 = 必要条件 + 充分条件":
        "a-proposal-equals-necessary-conditions-plus-sufficient-conditions",
    "提高知识或服务业的生产力需要界定工作业绩":
        "improving-knowledge-or-service-sector-productivity-requires-defining-work-performance",
    "搭建一个高效的信息系统":
        "building-an-efficient-information-system",
    "摩擦经济将消失":
        "the-friction-economy-will-disappear",
    "收益 = (规模 x 深度) x 垄断程度":
        "revenue-equals-scale-times-depth-times-degree-of-monopoly",
    "改写加深思考":
        "rewriting-deepens-thinking",
    "改变的可能令人心潮澎湃":
        "the-possibility-of-change-is-exhilarating",
    "放弃思考，逃避痛苦":
        "abandoning-thinking-to-escape-pain",
    "政治是创造新的可能性":
        "politics-is-creating-new-possibilities",
    "教育不是让孩子扮演他人，而是让孩子成为自己":
        "education-is-not-making-children-play-others-but-helping-them-become-themselves",
    "教育失败论":
        "theory-of-education-failure",
    "教育改革必须也只能是 bottom-up":
        "education-reform-must-and-can-only-be-bottom-up",
    "教育是把自己的生命交出":
        "education-is-giving-over-your-life",
    "教育机器和无声共谋":
        "the-education-machine-and-silent-complicity",
    "教育的问题":
        "the-problem-with-education",
    "教育的首要社会责任是让学生具有学习能力和行动贡献能力":
        "educations-primary-social-responsibility-is-developing-students-learning-and-contribution-capacity",
    "教育落后世界信息技术的发展":
        "education-lags-behind-global-information-technology-development",
    "敢于承认并修正错误假设":
        "dare-to-admit-and-correct-wrong-assumptions",
    "整顿学术界带来知识革命":
        "reforming-academia-brings-a-knowledge-revolution",
    "文字形式与内容的统一":
        "the-unity-of-written-form-and-content",
    "文学作品中墙和窗的象征":
        "the-symbolism-of-walls-and-windows-in-literature",
    "文明进化论":
        "the-theory-of-civilizational-evolution",
    "新技术的发明不是为了让你更高效地去做旧事情":
        "new-technology-is-not-invented-to-make-you-more-efficient-at-old-things",
    "旅游是为了重新发现自我，是一个向内的过程":
        "travel-is-to-rediscover-yourself-an-inward-process",
    "无欲望不写作":
        "no-desire-no-writing",
    "无法拥有自己不理解的东西":
        "you-cannot-own-what-you-do-not-understand",
    "无用之用":
        "the-usefulness-of-the-useless",
    "无话不谈但又无法让对方理解的朋友":
        "a-friend-you-can-talk-about-anything-with-but-who-cannot-truly-understand-you",
    "早点坐下她就看不见裤子了":
        "sit-down-earlier-and-she-wont-see-the-pants",
    "时代变革创造知识社会":
        "era-transformation-creates-the-knowledge-society",
    "时代需要一个知识经济学的理论":
        "the-era-needs-a-theory-of-knowledge-economics",
    "时空的距离":
        "the-distance-of-space-and-time",
    "时间太过漫长和模糊 -- 人生去哪里了？":
        "time-is-too-long-and-vague-where-did-life-go",
    "时间是信息的增长":
        "time-is-the-growth-of-information",
    "时间是第一生产要素":
        "time-is-the-primary-factor-of-production",
    "普通人如何在 code vs law 之战中完成双向套利":
        "how-ordinary-people-can-achieve-two-way-arbitrage-in-the-code-vs-law-battle",
    "普通人如何在剥削模型下生存 -- 提升认知，微观主权，双向套利":
        "how-ordinary-people-survive-under-the-exploitation-model",
    "普通人容易受到操控":
        "ordinary-people-are-easily-manipulated",
    "普鲁士教育的目标消失了":
        "the-goals-of-prussian-education-have-disappeared",
    "智力超越常人并不带来快乐":
        "intelligence-beyond-the-average-does-not-bring-happiness",
    "智能眼镜创建与现实全新的交互方式":
        "smart-glasses-create-a-new-way-of-interacting-with-reality",
    "智能眼镜标志着对现实的彻底入侵":
        "smart-glasses-mark-a-total-invasion-of-reality",
    "暴力、资本、和知识是世界的三大支柱":
        "violence-capital-and-knowledge-are-the-three-pillars-of-the-world",
    "更多个性化信息的收集推动通用人工智能被个人人工智能替代":
        "more-personalized-data-collection-drives-general-ai-to-be-replaced-by-personal-ai",
    "最后30天":
        "last-30-days",
    "最好与最坏的人创造了历史，而平庸之辈则繁衍了种族。":
        "the-best-and-worst-people-make-history-while-the-mediocre-perpetuate-the-species",
    "最熟悉的陌生人":
        "the-most-familiar-stranger",
    "最纯洁的躯体":
        "the-purest-body",
    "最高级的控制在于不主动控制":
        "the-highest-form-of-control-is-not-actively-controlling",
    "有偏见是好事":
        "having-bias-is-a-good-thing",
    "有追求才会失望":
        "only-those-with-aspirations-can-be-disappointed",
    "未来将形成超级信息帝国":
        "the-future-will-form-super-information-empires",
    "未来将迎来交互方式的大革新":
        "the-future-will-bring-a-revolution-in-interaction",
    "未来的操作系统应该从底层就设计成一个整体":
        "the-future-operating-system-should-be-designed-as-a-whole-from-the-ground-up",
    "未来确定但未知":
        "the-future-is-certain-but-unknown",
    "机会是争取来的":
        "opportunities-are-fought-for",
    "权力与责任必须相互制约":
        "power-and-responsibility-must-constrain-each-other",
    "标签是弱关系":
        "labels-are-weak-ties",
    "棉花背后是全球供应链，背负着资本主义、殖民与奴隶制的原罪":
        "behind-cotton-is-a-global-supply-chain-carrying-the-original-sins-of-capitalism-colonialism-and-slavery",
    "森林的小兽，来了又跑了":
        "small-creatures-of-the-forest-come-and-go",
    "概率论 -- 应对不确定世界的基础工具":
        "probability-theory-the-fundamental-tool-for-an-uncertain-world",
    "毁灭自尊心的失败和自得其乐":
        "self-esteem-destroying-failure-and-finding-joy-in-oneself",
    "每个人都是一座孤岛":
        "every-person-is-an-island",
    "每个人都是地球的一个脑细胞和神经元":
        "every-person-is-a-brain-cell-and-neuron-of-the-earth",
    "每个人都活在属于自己的宇宙":
        "every-person-lives-in-their-own-universe",
    "每个组织必须专注于自己的使命":
        "every-organization-must-focus-on-its-own-mission",
    "比 ChatGPT 的到来更可怕的是人的消逝":
        "more-frightening-than-chatgpts-arrival-is-the-disappearance-of-the-human",
    "比正义缺席更恐怖的是正义的提前到来":
        "more-terrifying-than-the-absence-of-justice-is-its-premature-arrival",
    "比特杀死空间，AI 杀死时间":
        "bits-kill-space-ai-kills-time",
    "永恒的一丝对现状的不满才是人类前进的动力":
        "a-permanent-trace-of-dissatisfaction-with-the-status-quo-is-the-driving-force-of-humanity",
    "没有真正的理解，只有符号搬运和规律识别":
        "there-is-no-true-understanding-only-symbol-manipulation-and-pattern-recognition",
    "治愈性倦怠治愈倦怠社会":
        "healing-burnout-heals-the-burnout-society",
    "注意力是形成清晰记忆的关键":
        "attention-is-the-key-to-forming-clear-memories",
    "洞见高于正确":
        "insight-is-higher-than-correctness",
    "流量、破局、创业":
        "traffic-breakthrough-entrepreneurship",
    "流量破局路径":
        "traffic-breakthrough-paths",
    "浓缩概括就是提高文字承载的信息密度":
        "condensed-summarization-is-increasing-the-information-density-of-text",
    "深入学习 + 知识框架搭建 MAS":
        "deep-learning-plus-knowledge-framework-building",
    "深度思考得出的结论通常是反常识的":
        "conclusions-from-deep-thinking-are-usually-counter-intuitive",
    "深度无聊对于创造活动具有重要意义":
        "deep-boredom-is-important-for-creative-activity",
    "深挖麦田里的守望者":
        "deep-dive-into-catcher-in-the-rye",
    "淹死在东西里":
        "drowning-in-stuff",
    "漠视他人以获得自由":
        "disregarding-others-to-gain-freedom",
    "激情 ≠ 快乐":
        "passion-not-equal-happiness",
    "炸完就全都有了":
        "blow-it-up-and-youll-have-everything",
    "熵，信息量，可能性，和 Log":
        "entropy-information-possibility-and-log",
    "爱国就像穿内裤":
        "patriotism-is-like-wearing-underwear",
    "爱情只是婚姻的一部分":
        "love-is-only-a-part-of-marriage",
    "独占市场才有定价自由":
        "monopolizing-a-market-gives-pricing-freedom",
    "现代人即创新":
        "modern-people-are-innovation",
    "现代国家保护个人财产和权利不受权力侵犯":
        "the-modern-state-protects-individual-property-and-rights-from-power",
    "现代生命对于网络和电力的依赖程度":
        "the-degree-to-which-modern-life-depends-on-networks-and-electricity",
    "现代经济的本质是榨取而非创造":
        "the-essence-of-the-modern-economy-is-extraction-not-creation",
    "现实会砸向你精心构建的系统的堡垒":
        "reality-will-smash-into-the-fortress-of-your-carefully-constructed-system",
    "现实和游戏的区别在于规则定义的清晰程度":
        "the-difference-between-reality-and-games-is-the-clarity-of-rule-definition",
    "珍惜这次去荷兰 start anew 的机会":
        "cherish-this-chance-to-start-anew-in-the-netherlands",
    "理性和逻辑是人类思想的武器":
        "reason-and-logic-are-the-weapons-of-human-thought",
    "理性（第二）大脑 tends to justify 情感（第一）大脑":
        "the-rational-brain-tends-to-justify-the-emotional-brain",
    "生产力革命到底在生产什么？":
        "what-is-the-productivity-revolution-actually-producing",
    "生产提升的过程就是复杂性打包下降，在更高层次思考的过程":
        "productivity-improvement-is-packaging-complexity-downward-and-thinking-at-a-higher-level",
    "生命 = 通过多次迭代的价值判断发现什么最重要，并持续做":
        "life-equals-discovering-what-matters-most-through-iterative-value-judgment-and-doing-it-continuously",
    "生命即消耗 Calori  & Tokens":
        "life-is-consuming-calories-and-tokens",
    "生命是对抗熵增":
        "life-is-fighting-entropy",
    "生活的意义建立在温饱的基础之上":
        "the-meaning-of-life-is-built-on-the-foundation-of-basic-needs",
    "生活的热情褪去之后只剩荒凉":
        "when-the-passion-for-life-fades-only-desolation-remains",
    "用人机构将打破学校对教育的垄断":
        "employers-will-break-the-school-monopoly-on-education",
    "用坚决的态度面对不确定性":
        "face-uncertainty-with-a-resolute-attitude",
    "用结构 vs 文本理解问题":
        "understanding-problems-with-structure-vs-text",
    "由度小满独家冠名的品牌列车":
        "brand-train-exclusively-sponsored-by-duxiaoman",
    "电脑的模块化发展趋势":
        "the-modular-development-trend-of-computers",
    "监狱塑造情谊":
        "prison-forges-friendship",
    "目的论和非目的论是两种基本的价值观":
        "teleology-and-non-teleology-are-two-fundamental-worldviews",
    "相比于AI 的言之凿凿与丝滑流畅，我还是更喜欢读一个人的困惑与纠结，其文字的笨拙也显得真实、可爱。":
        "i-prefer-a-persons-confusion-and-struggle-over-ais-confident-smooth-prose",
    "相比于记住，人脑更擅长遗忘":
        "the-human-brain-is-better-at-forgetting-than-remembering",
    "看不到尽头令人恐惧":
        "not-seeing-the-end-is-terrifying",
    "看似造势实则是顺势":
        "what-looks-like-momentum-creation-is-actually-following-the-tide",
    "看见和相信":
        "seeing-and-believing",
    "真实世界的决策是不可计算的":
        "real-world-decisions-are-not-computable",
    "真正的学习需要结构，脚手架，和持续的动力管理":
        "true-learning-requires-structure-scaffolding-and-sustained-motivation-management",
    "真正的强者敢于示弱":
        "the-truly-strong-dare-to-show-weakness",
    "知行合一 -- 获得信息和实行控制的相互促进":
        "unity-of-knowledge-and-action-mutual-reinforcement-of-acquiring-information-and-exercising-control",
    "知识人和经理人相互制衡":
        "knowledge-workers-and-managers-check-and-balance-each-other",
    "知识人必须承担起宣传普及专业知识的责任":
        "knowledge-workers-must-take-responsibility-for-popularizing-professional-knowledge",
    "知识人必须让知识有效":
        "knowledge-workers-must-make-knowledge-effective",
    "知识人是知识社会的核心":
        "knowledge-workers-are-the-core-of-the-knowledge-society",
    "知识人需要对专业知识进行整合和通盘理解":
        "knowledge-workers-need-to-integrate-and-comprehensively-understand-professional-knowledge",
    "知识以人为本":
        "knowledge-is-people-centered",
    "知识使技术变得有效":
        "knowledge-makes-technology-effective",
    "知识和精神是最大的财富":
        "knowledge-and-spirit-are-the-greatest-wealth",
    "知识和行动紧密相关":
        "knowledge-and-action-are-closely-linked",
    "知识是知识社会的支配性资源、决定性生产要素":
        "knowledge-is-the-dominant-resource-and-decisive-factor-of-production-in-the-knowledge-society",
    "知识服务能否能为可盈利的事业？":
        "can-knowledge-services-become-a-profitable-business",
    "知识的传承事关种族文明的进步":
        "the-transmission-of-knowledge-is-related-to-the-progress-of-civilizational-heritage",
    "知识的内涵从综合性转变为专业性":
        "the-content-of-knowledge-has-shifted-from-comprehensive-to-specialized",
    "知识的创造、利用、和传承关系人类种族的进步":
        "the-creation-use-and-transmission-of-knowledge-is-tied-to-human-civilizational-progress",
    "知识的数量、速度、深度 --> 之后是什么？":
        "knowledge-quantity-speed-depth-what-comes-next",
    "知识社会学校的地位将会受到挑战":
        "the-status-of-schools-in-the-knowledge-society-will-be-challenged",
    "知识管理为人类文明做备份":
        "knowledge-management-backs-up-human-civilization",
    "知识组织中上司对下属的工作一无所知":
        "in-knowledge-organizations-superiors-know-nothing-about-subordinates-work",
    "知识组织中成员必须对自己的目标与贡献负责":
        "in-knowledge-organizations-members-must-be-accountable-for-their-goals-and-contributions",
    "知识迁移的能力使专业人工智变为通用人工智能":
        "the-ability-to-transfer-knowledge-turns-narrow-ai-into-general-ai",
    "知识运用和意义的三次革命":
        "three-revolutions-in-the-application-of-knowledge-and-meaning",
    "知道你知识和能力的边界":
        "know-the-boundaries-of-your-knowledge-and-ability",
    "破界创新和第一创新":
        "boundary-breaking-innovation-and-first-innovation",
    "破除隐含假设需敢于质疑群体性共识，打破群体信念":
        "breaking-hidden-assumptions-requires-questioning-collective-consensus",
    "硬件的发展促进软件的发展":
        "hardware-development-drives-software-development",
    "碳基生命是硅基生命的 boot loader?":
        "carbon-based-life-is-the-boot-loader-for-silicon-based-life",
    "科学寻找真理，艺术赋予意义":
        "science-seeks-truth-art-gives-meaning",
    "科学技术的本质是控制":
        "the-essence-of-science-and-technology-is-control",
    "科学方法的核心 -- 铁律":
        "the-core-of-the-scientific-method-iron-laws",
    "科技与国家政治愈发深入绑定":
        "technology-and-state-politics-are-becoming-more-deeply-intertwined",
    "科技主宰文明":
        "technology-dominates-civilization",
    "科技公司的成功机制":
        "the-success-mechanism-of-tech-companies",
    "科技对世界格局的影响即将超过经济和政治":
        "technologys-impact-on-the-world-order-will-soon-surpass-economics-and-politics",
    "科技是文明的本体，人类文明是阶段性载体":
        "technology-is-the-essence-of-civilization-human-civilization-is-a-temporary-carrier",
    "科技本体主义":
        "techno-essentialism",
    "科技正试图在从人类文明的政治经济中破茧而出":
        "technology-is-trying-to-break-free-from-the-political-economy-of-human-civilization",
    "科技融合论":
        "theory-of-technological-convergence",
    "科技进步的本质是人类运用能源的能力变强":
        "the-essence-of-technological-progress-is-humanitys-growing-ability-to-harness-energy",
    "科技，老年人，human-centered tech":
        "technology-the-elderly-and-human-centered-tech",
    "税收三要件":
        "the-three-elements-of-taxation",
    "稳定的价值系统支撑决策":
        "a-stable-value-system-supports-decision-making",
    "空间计算，交互的去设备化，和感官殖民":
        "spatial-computing-de-deviceification-of-interaction-and-sensory-colonization",
    "立体网状知识结构":
        "three-dimensional-networked-knowledge-structure",
    "第一性原理 + 演绎法 = 理性系统":
        "first-principles-plus-deduction-equals-rational-system",
    "第一次人生危机 & Focus Reshape":
        "first-life-crisis-and-focus-reshape",
    "第二大脑介于第一大脑和世界的信息之间":
        "the-second-brain-sits-between-the-first-brain-and-the-worlds-information",
    "第二大脑帮助第一大脑记忆和思考":
        "the-second-brain-helps-the-first-brain-remember-and-think",
    "第二大脑是个人最核心的数据遗产":
        "the-second-brain-is-the-most-core-personal-data-legacy",
    "算力替代人才成为战略性资源":
        "compute-replaces-talent-as-the-strategic-resource",
    "算法的目的是剥削老百姓的时间和钱":
        "algorithms-are-designed-to-exploit-peoples-time-and-money",
    "算能、信能、智能、效能":
        "compute-power-information-power-intelligence-efficiency",
    "管理是知识运用于知识上":
        "management-is-applying-knowledge-to-knowledge",
    "管理者为知识的运用和表现负责":
        "managers-are-responsible-for-the-application-and-performance-of-knowledge",
    "精英品牌通过维持泡沫操控人的心理":
        "elite-brands-manipulate-psychology-by-maintaining-the-bubble",
    "系统思维拆解学校和教育":
        "systems-thinking-deconstructs-school-and-education",
    "系统思考 -- 看到关系和结构":
        "systems-thinking-seeing-relationships-and-structure",
    "约束是决策的前提":
        "constraints-are-the-prerequisite-for-decision-making",
    "组织不该垂涎政治权力":
        "organizations-should-not-covet-political-power",
    "组织使专业性的知识富有成效":
        "organizations-make-specialized-knowledge-productive",
    "组织内部专业知识分得越细组织就越有成效":
        "the-finer-the-division-of-specialized-knowledge-within-an-organization-the-more-effective-it-is",
    "组织由一个共同的特定的任务驱动":
        "organizations-are-driven-by-a-common-specific-mission",
    "组织肩负完成社会、国家任务的使命":
        "organizations-bear-the-mission-of-completing-social-and-national-tasks",
    "经济 = 大教堂 + 赌场":
        "economy-equals-cathedral-plus-casino",
    "经济全球化并不能保障世界和平":
        "economic-globalization-does-not-guarantee-world-peace",
    "经济发展促进和平":
        "economic-development-promotes-peace",
    "经济增长是理想和现实的拉扯":
        "economic-growth-is-the-tension-between-ideals-and-reality",
    "经济自由是当前唯一制约因素":
        "economic-freedom-is-the-only-current-constraint",
    "结婚的理由可能只是寻求精神稳定":
        "the-reason-for-marriage-may-simply-be-seeking-psychological-stability",
    "网络社交平台成功的机制":
        "the-mechanism-of-success-for-social-networking-platforms",
    "羊毛代表着关注本地、关注工艺、关注人与物的真实连接与生态修复":
        "wool-represents-attention-to-local-craft-real-human-material-connection-and-ecological-restoration",
    "老师说话下意识点头":
        "unconsciously-nodding-when-teachers-speak",
    "考试是学习的手段，不是学习的目的":
        "exams-are-a-means-of-learning-not-the-end",
    "耳机发明的伟大之处在于进一步开创了 personal reality":
        "the-greatness-of-headphones-is-that-they-further-created-personal-reality",
    "背诵增强表达能力":
        "memorization-enhances-expressive-ability",
    "能源是人类文明进步的最大瓶颈":
        "energy-is-the-biggest-bottleneck-in-human-civilizational-progress",
    "能看到未来真是一件令人激动的事情":
        "being-able-to-see-the-future-is-truly-exciting",
    "能给用户带来可衡量价值的产品":
        "products-that-bring-measurable-value-to-users",
    "脑机协作才能抵达知识的新的高度":
        "brain-machine-collaboration-reaches-new-heights-of-knowledge",
    "自我价值具有唯我拍他性":
        "self-worth-is-exclusively-self-referential",
    "自我价值是自己赋予的针对自己的价值":
        "self-worth-is-value-you-assign-to-yourself-for-yourself",
    "自我感动":
        "self-moved-by-oneself",
    "自由必思考":
        "freedom-requires-thinking",
    "自由是创造的土壤":
        "freedom-is-the-soil-of-creativity",
    "自由是负担":
        "freedom-is-a-burden",
    "艺术和人工智能是人类对世界和自身的模仿":
        "art-and-ai-are-humanitys-imitation-of-the-world-and-itself",
    "节日、艺术和美是神性的体现":
        "festivals-art-and-beauty-are-expressions-of-the-divine",
    "芯片是物理学和信息技术的交界地带":
        "chips-are-the-frontier-between-physics-and-information-technology",
    "花一点钱去感知未来很重要":
        "spending-a-little-money-to-sense-the-future-is-important",
    "获得信息 = 对事物可能性空间了解发生变化":
        "gaining-information-equals-a-change-in-understanding-of-the-possibility-space-of-things",
    "虚伪是文明的润滑剂":
        "hypocrisy-is-the-lubricant-of-civilization",
    "被时代戏弄并认命的苦闷":
        "the-bitterness-of-being-mocked-by-the-era-and-accepting-ones-fate",
    "要把自己的才华展示发挥出来影响他人":
        "express-your-talent-to-influence-others",
    "观点就像屁眼":
        "opinions-are-like-assholes",
    "规训社会自然发展为功绩社会":
        "the-disciplinary-society-naturally-develops-into-the-achievement-society",
    "认知需要 vs 认知闭合需要，接受世界的不确定性和模糊性":
        "need-for-cognition-vs-need-for-closure-accepting-uncertainty-and-ambiguity",
    "让他人自己对自己发动战争是有效控制他人的手段":
        "making-others-wage-war-against-themselves-is-an-effective-means-of-control",
    "记录重要":
        "recording-is-important",
    "记忆 = 短期 + 长期":
        "memory-equals-short-term-plus-long-term",
    "记忆即关联性":
        "memory-is-association",
    "记忆，好像早晨爱人离别后枕头上柔软的凹印":
        "memory-is-like-the-soft-indent-on-a-pillow-after-a-lovers-morning-departure",
    "评估人最重要的能力":
        "the-most-important-ability-to-evaluate-in-people",
    "试图理解人类文明的发展进程":
        "attempting-to-understand-the-development-of-human-civilization",
    "说服要遵循对方能理解的顺序而不是自己想说的顺序":
        "persuasion-should-follow-the-order-the-other-can-understand-not-the-order-you-want-to-say",
    "读书和学习是为了解决自己生命中的问题":
        "reading-and-learning-are-to-solve-problems-in-your-own-life",
    "读实验性小说像是观赏行为艺术":
        "reading-experimental-novels-is-like-watching-performance-art",
    "贝叶斯主义 -- 观念是拿来更新的，不是拿来坚守的":
        "bayesianism-beliefs-are-for-updating-not-defending",
    "负面状态持续是因为从中获得奖励":
        "negative-states-persist-because-they-are-rewarded",
    "责任&贡献 > 官衔&职位":
        "responsibility-and-contribution-over-title-and-position",
    "责任是组织构建的第一原则":
        "responsibility-is-the-first-principle-of-organizational-building",
    "资产积累与资产升级":
        "asset-accumulation-and-asset-upgrading",
    "资本主义转向信息资本主义":
        "capitalism-transforms-into-information-capitalism",
    "超稳定系统 -- 通过不稳定维持稳定":
        "ultra-stable-system-maintaining-stability-through-instability",
    "跃层思维":
        "level-jumping-thinking",
    "路径依赖和人生困境":
        "path-dependence-and-life-predicament",
    "软件 = GUI + CLI + API":
        "software-equals-gui-plus-cli-plus-api",
    "迁移学习就是学习本身和学习的目的":
        "transfer-learning-is-both-the-act-of-learning-and-its-purpose",
    "过度积极导致束缚":
        "excessive-positivity-leads-to-bondage",
    "还不起的债，就不该还":
        "debts-you-cannot-repay-should-not-have-been-taken",
    "进化论 -- 变化世界中的生存法则":
        "evolution-the-law-of-survival-in-a-changing-world",
    "远离品牌，去解决真正的问题":
        "stay-away-from-brands-and-solve-real-problems",
    '追求心理丰富性本质上是拒绝\u201c自动驾驶\u201d模式':
        "pursuing-psychological-richness-is-fundamentally-rejecting-autopilot-mode",
    '追求极致效能清除"低效"人口不可取':
        "pursuing-extreme-efficiency-by-eliminating-inefficient-people-is-unacceptable",
    "适可而止":
        "knowing-when-to-stop",
    "逃避厌倦的后果是凌乱的生活":
        "the-consequence-of-avoiding-boredom-is-a-chaotic-life",
    "通往意义经济之路":
        "the-path-to-the-meaning-economy",
    "通过提供 Context 在 AI 中寻找自己":
        "finding-yourself-in-ai-by-providing-context",
    "重要的词被滥用很讨厌":
        "overusing-important-words-is-annoying",
    "金钱的本质是调度人的时间和劳动":
        "the-essence-of-money-is-scheduling-peoples-time-and-labor",
    "金钱的目的是购买自由":
        "the-purpose-of-money-is-to-buy-freedom",
    "金钱衡量他人价值":
        "money-measures-the-value-of-others",
    "长大了也不会明白":
        "even-growing-up-wont-bring-understanding",
    "长期跟 AI 交流会改变大脑":
        "long-term-communication-with-ai-will-change-the-brain",
    "问题是需求的最小单位":
        "a-problem-is-the-minimum-unit-of-demand",
    "集体压制内部叛逆也抵御外部专制":
        "collectives-suppress-internal-rebellion-and-resist-external-tyranny",
    "集体带来的社交是麻烦也是幸福":
        "the-social-life-that-collectives-bring-is-both-trouble-and-happiness",
    "集体是一个权力机制":
        "the-collective-is-a-power-mechanism",
    "集体是有效的叛逆机制":
        "the-collective-is-an-effective-mechanism-for-rebellion",
    "集体生产力需要有效的协作方式和合作架构":
        "collective-productivity-requires-effective-collaboration-methods-and-cooperative-architecture",
    "集体的悖论":
        "the-paradox-of-the-collective",
    "霍家麟的演讲":
        "huo-jialins-speech",
    "预测是人际关系的重要工具":
        "prediction-is-an-important-tool-in-interpersonal-relationships",
    "驯服推荐算法为突破信息茧房的工具":
        "taming-recommendation-algorithms-as-a-tool-to-break-information-cocoons",
    "骑车与汽车赛跑":
        "cycling-racing-against-cars",
    "高效学习的两个重要能力":
        "two-important-abilities-for-efficient-learning",
    "高效意味着把高强度和低强度的事情完全分开":
        "efficiency-means-completely-separating-high-intensity-and-low-intensity-tasks",
    "鸟类的飞行并非为了抵达某个特定的目的地，飞行本身就是它的存在方式":
        "birds-fly-not-to-reach-a-destination-flying-itself-is-their-way-of-being",
    "黄金思维圈 -- 超越 what, 深挖 why, 知道 how":
        "golden-circle-thinking-beyond-what-dig-into-why-know-how",
    "黑客帝国和复仇者联盟":
        "the-matrix-and-the-avengers",

    # ── book ─────────────────────────────────────────────────────────────────

    "人比 AI 凶":
        "humans-are-fiercer-than-ai",
    "人的消逝":
        "the-disappearance-of-the-human",
    "从元宇宙到量子现实":
        "from-metaverse-to-quantum-reality",
    "保卫古典教育":
        "in-defense-of-classical-education",
    "倦怠社会":
        "the-burnout-society",
    "全球人才强着学 -- 密涅瓦的思考习惯训练":
        "global-talent-learns-hard-minervas-thinking-habits-training",
    "大道 -- 段永平投资问答录":
        "the-great-way-duan-yongpings-investment-qa",
    "好好学习 -- 个人知识管理精进指南":
        "learn-well-a-guide-to-personal-knowledge-management",
    "思考的技术":
        "the-technology-of-thinking",
    "思考的真相":
        "the-truth-about-thinking",
    "控制论与科学方法论":
        "cybernetics-and-scientific-methodology",
    "新物种起源 -- 互联网的思想基石":
        "origin-of-new-species-the-intellectual-foundation-of-the-internet",
    "暗时间 -- 思维改变生活":
        "dark-time-how-thinking-changes-life",
    "知识社会":
        "the-knowledge-society",
    "第一性原理":
        "first-principles",
    "第二大脑":
        "the-second-brain",
    "聋哑时代":
        "the-deaf-mute-era",
    "观念的水位":
        "the-water-level-of-ideas",
    "送你一颗子弹":
        "a-bullet-for-you",

    # ── clipping ─────────────────────────────────────────────────────────────

    "2025 AI年度颁奖：Google无敌、Claude Code封神、甲骨文逆袭与奥特曼的忧虑":
        "2025-ai-annual-awards-google-unbeatable-claude-code-legendary-oracle-comeback-altmans-worry",
    "3个月，从微舆BettaFish开源项目爆火到获三千万投资，我亲历了Vibe Coding带来的超级个体时代":
        "3-months-from-bettafish-open-source-explosion-to-30m-investment-i-witnessed-vibe-coding-superindividual-era",
    "AI 时代，你的知识管理工具该扔了吗？":
        "in-the-ai-age-should-you-throw-away-your-knowledge-management-tools",
    "AI 时代，请停止「做作业」，去创造属于你的「作品」":
        "in-the-ai-age-stop-doing-homework-and-create-your-own-work",
    "AI 越厉害，麦当劳越值钱":
        "the-more-powerful-ai-becomes-the-more-valuable-mcdonalds-is",
    "AI圈、币圈、数据党":
        "ai-circle-crypto-circle-data-party",
    "AI，关系，自我认知":
        "ai-relationships-and-self-knowledge",
    "E45 孟岩对话李继刚：人何以自处":
        "e45-meng-yan-in-conversation-with-li-jigang-how-should-people-live",
    "Humanity’s Second Half · 人类的下半场":
        "humanitys-second-half",
    "什么是品味（taste）？- 以及如何获得品味":
        "what-is-taste-and-how-to-develop-it",
    "你不是工具——但保护这一点不是你一个人的事":
        "you-are-not-a-tool-but-protecting-that-is-not-your-burden-alone",
    "共识之外，走向未来":
        "beyond-consensus-toward-the-future",
    "具身认知：一个等待AI跨越的哲学深渊":
        "embodied-cognition-a-philosophical-abyss-waiting-for-ai-to-cross",
    "厨房政治":
        "kitchen-politics",
    "在2026年你学的每个技能，都在让你离钱越来越远":
        "in-2026-every-skill-you-learn-moves-you-further-from-money",
    "塞尔说对了，只是搞错了谁在屋子里的人 —— 当人类成为中文屋里那个不懂中文的人":
        "searle-was-right-just-wrong-about-who-is-in-the-room",
    "好消息：公司给你发 Token 当工资，坏消息：你的 KPI 是烧光它":
        "good-news-company-pays-you-in-tokens-bad-news-your-kpi-is-to-burn-them",
    "对投资人朱啸虎的第三次访谈：现实主义、AI的盛筵与泡泡、和共识错开15度、《王者荣耀》":
        "third-interview-with-investor-zhu-xiaohu-realism-ai-feast-and-bubble-15-degrees-off-consensus",
    "当系统不再需要你":
        "when-the-system-no-longer-needs-you",
    "杀入AI大厂实习后才意识到，我被学生思维害惨了【个人的奋斗 S5E2】":
        "after-interning-at-an-ai-giant-i-realized-student-thinking-had-damaged-me",
    "林亦对话谷歌高管：我们要拥抱AI开发吗？":
        "lin-yi-in-conversation-with-google-executive-should-we-embrace-ai-development",
    "泰勒展开和人生的类比":
        "taylor-expansion-as-a-metaphor-for-life",
    "渐进式披露：LLM时代的核心工程哲学":
        "progressive-disclosure-the-core-engineering-philosophy-of-the-llm-era",
    "第六章":
        "chapter-six",
    "约束即智能 -- AI Agent 的 Context 困境":
        "constraints-are-intelligence-the-context-dilemma-of-ai-agents",
    "终身学习者的妄念：理解底层原理":
        "the-delusion-of-lifelong-learners-understanding-underlying-principles",
    '越聪明越穷？\u201c低信任式防御\u201d让你错过所有机会':
        "the-smarter-the-poorer-low-trust-defense-makes-you-miss-all-opportunities",
    "逃离利维坦：爱泼斯坦、硅谷与主权个人":
        "escaping-leviathan-epstein-silicon-valley-and-the-sovereign-individual",
}


# ── helpers ───────────────────────────────────────────────────────────────────

SLUG_RE = re.compile(r'^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$')

def is_slugified(stem):
    return bool(SLUG_RE.match(stem))

def has_chinese(text):
    for ch in text:
        cp = ord(ch)
        if (0x4E00 <= cp <= 0x9FFF or 0x3400 <= cp <= 0x4DBF or
            0xF900 <= cp <= 0xFAFF or 0x3000 <= cp <= 0x303F or
            0xFF00 <= cp <= 0xFFEF):
            return True
    return False

def yaml_encode_title(title):
    escaped = title.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'

def update_title_frontmatter(filepath, new_slug, dry_run=False):
    """Update the title: field in frontmatter to the new slug (for reference)."""
    # Title stays as the original — don't touch it.
    pass

def iter_note_files():
    for dirpath, dirnames, filenames in os.walk(NOTE_DIR):
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for fname in sorted(filenames):
            if fname.endswith('.md') and fname.lower() != 'index.md':
                yield os.path.join(dirpath, fname)


# ── phase 1: rename chinese files ────────────────────────────────────────────

def phase_rename():
    renamed = {}   # original_stem → new_slug
    skipped_already_slug = []
    skipped_not_in_map   = []
    conflicts            = []

    for filepath in iter_note_files():
        stem = os.path.basename(filepath)[:-3]

        if not has_chinese(stem):
            continue   # only process Chinese-titled files here

        if is_slugified(stem):
            skipped_already_slug.append(stem)
            continue

        if stem not in MAPPING:
            skipped_not_in_map.append(stem)
            continue

        new_slug     = MAPPING[stem]
        new_filename = new_slug + '.md'
        new_filepath = os.path.join(os.path.dirname(filepath), new_filename)

        if os.path.exists(new_filepath):
            conflicts.append((stem, new_slug))
            continue

        renamed[stem] = new_slug

        if DRY_RUN:
            rel = os.path.relpath(filepath, NOTE_DIR)
            print(f"  RENAME  {rel}\n      --> {new_filename}")
        else:
            os.rename(filepath, new_filepath)

    return renamed, skipped_not_in_map, conflicts


# ── phase 2: update wikilinks ─────────────────────────────────────────────────

def phase_links(mapping):
    files_changed = 0
    links_changed = 0

    for filepath in iter_note_files():
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        hits = []

        def replace(m, _hits=hits):
            target = m.group(1).strip()
            rest   = m.group(2)
            if target in mapping:
                _hits.append((target, mapping[target]))
                return f"[[{mapping[target]}{rest}]]"
            return m.group(0)

        new_content = WIKILINK_RE.sub(replace, content)

        if hits:
            files_changed += 1
            links_changed += len(hits)
            rel = os.path.relpath(filepath, NOTE_DIR)
            if DRY_RUN:
                print(f"\n  LINKS  {rel}  ({len(hits)} changes)")
                for old, new in hits[:5]:
                    print(f"    [[{old}]]  →  [[{new}]]")
                if len(hits) > 5:
                    print(f"    … +{len(hits) - 5} more")
            else:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)

    return files_changed, links_changed


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    mode = "[DRY RUN] " if DRY_RUN else ""

    print(f"{mode}Phase 1 — renaming Chinese files…")
    renamed, not_in_map, conflicts = phase_rename()

    print(f"\n{mode}Rename summary:")
    print(f"  Renamed             : {len(renamed)}")
    print(f"  Not in mapping      : {len(not_in_map)}")
    if not_in_map:
        for s in not_in_map:
            print(f"    MISSING: {s}")
    if conflicts:
        print(f"  Conflicts           : {len(conflicts)}")
        for src, dst in conflicts:
            print(f"    {src} → {dst}")

    print(f"\n{mode}Phase 2 — updating wikilinks…")
    fc, lc = phase_links(renamed)

    print(f"\n{mode}Links summary:")
    print(f"  Files with updated links : {fc}")
    print(f"  Total links updated      : {lc}")


if __name__ == '__main__':
    main()
