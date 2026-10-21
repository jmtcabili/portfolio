---
title: smolagents News Search Tool
summary: Prototype Gemini-powered smolagents CodeAgent with a custom news_search tool for news summarization.
kind: ai-data
role: Student
order: 3
org: Hugging Face AI Agents Course
dates: October 2026
stack: [Python, smolagents, Gemini, Gradio]
cover: ../../assets/projects/smolagents-news-search.png
coverAlt: "Gradio chat interface showing the agent's final answer: news headlines from TechCrunch and CNBC, each followed by a three-bullet summary."
---

In addition to the default tools from the course template (final_answer, web_search, and visit_webpage), this prototype adds a custom news_search tool:

1. Targeted Multi-Outlet RSS Search: Collects recent articles on tech and AI companies (such as Anthropic, OpenAI, or Google) across selected outlets (e.g. The Guardian, TechCrunch, The Verge, Ars Technica, CNBC).

2. URL Decoding & Content Extraction: Resolves Google News RSS links and uses clean web extraction (trafilatura) to filter out navigation menus, ads, and boilerplate.

3. Resilient Fallback: Gracefully falls back to headline snippets when articles are behind strict paywalls or bot protection.
Structured Synthesis: The agent analyzes the returned article text and generates a 3-bullet point summary per article.
