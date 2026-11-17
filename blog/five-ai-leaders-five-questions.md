---
title: Five AI leaders, five questions about the system you're building
description: Five AI-builder personas, from Ilya Sutskever to Alexandr Wang, each open office hours with a different hard question about what you're actually shipping.
date: 2026-11-17
author: Heropedia
hero: founder/ai-leader/ilya-sutskever
---

Heropedia's AI-leader personas didn't get their questions from a press release. Each one is built from the person's own essays, podcasts, congressional testimony and interviews, and each opens an office hour with a different question about the thing you're actually building. Here are five of them, so you can try answering before you open a chat.

These are AI personas based on public writing and interviews, not the people themselves. None of the five is affiliated with Heropedia or endorses it.

## The questions

**[Ilya Sutskever](/founder/ai-leader/ilya-sutskever):** *What is your model actually generalizing to, versus what it is just scoring well on?* He wants a specific case outside the eval distribution where the system fails, and what that failure looks like in production — not a leaderboard score offered as if it settled the question.

**[Yann LeCun](/founder/ai-leader/yann-lecun):** *What can this system do that requires understanding the physical world, not just manipulating language about it?* He wants a concrete task involving physical prediction or spatial reasoning, not a text benchmark, because his whole case against today's large language models is that they lack a model of the physical world.

**[Dario Amodei](/founder/ceo-advisor/dario-amodei):** *What specific capability or outcome are you predicting, and by what date?* He treats every big claim as falsifiable: a prediction with no date and no way to be proven wrong doesn't count as an answer.

**[Mira Murati](/founder/ceo-advisor/mira-murati):** *If you left tomorrow, what in this company keeps running on its own, and what stops?* She wants a named process, document or team that survives your absence, not a vague assurance that a co-founder has it covered.

**[Alexandr Wang](/founder/ceo-advisor/alexandr-wang):** *Who is your best recruiter, and what have they closed in the last quarter?* He wants a named person and a specific hire or deal, because he treats recruiting itself as the core founder skill, not something you delegate and forget.

## Why these five, together

Each question attacks a different blind spot in the same story: that shipping a capable-looking system is the same as having the right system. Sutskever separates a benchmark win from real generalization. LeCun separates a language trick from a model of how the world actually behaves. Amodei separates a confident prediction from one anyone could check. Murati separates a company that depends on one person from one that doesn't. Wang separates a team that looks strong from one that is actually landing the unglamorous work and the right hires. Answer all five honestly about one system, and you've pressure-tested it from data, architecture, forecasting, structure and people — the five places ambitious AI projects usually break first.

## How to use them

Pick the question you're least sure you could answer well. Write two or three sentences before you open anything. Then go to that hero's page and start an office hour: copy the office-hour prompt into ChatGPT or any chat, add the Heropedia connector in Claude, or install the skill in Claude Code, Codex or Gemini CLI. The persona asks several more questions in the same vein, pushes back on vague answers, and leaves you one thing to do by Friday.

One rule makes these sessions worth the time: bring one real system or product, not a request to review your whole AI strategy. Vague inputs get vague pushback.

## Who to pick

- **Your eval scores look great but something still feels off in production:** Ilya Sutskever.
- **You're building on language models and wonder if that's the ceiling:** Yann LeCun.
- **You've made a bold claim about what your system will do:** Dario Amodei.
- **You're the only person who understands how your own product actually works:** Mira Murati.
- **Your technology is solid but you keep losing to faster-moving rivals:** Alexandr Wang.

## Three ways to start

- **ChatGPT, Gemini or any chat window.** Open any of the hero pages above, press **Copy the office-hour prompt**, paste it into a new chat and send. The persona is inside the prompt, so there is nothing to install.
- **Claude.** Add Heropedia once as a custom connector with the URL `https://www.heropedia.org/mcp` (Settings, then Connectors). After that, say *"Hold office hours with Yann LeCun on this architecture"* in any chat. The [setup guide](/mcp-guide) walks through each step.
- **Claude Code, Codex or Gemini CLI.** Install the office-hour skill with the command on the hero page, then say *"Office hour with Dario Amodei on this launch plan."* Your notes stay on your machine.

The full list of AI-leader and CEO-advisor personas is on the [AI Leader](/founder/ai-leader) and [CEO Advisor](/founder/ceo-advisor) pages, including Jensen Huang, Fei-Fei Li, Sundar Pichai and the rest of the roster covered in an [earlier office-hours roundup](/blog/eight-tech-ceos-eight-questions).
