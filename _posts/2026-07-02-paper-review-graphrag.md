---
title: "[논문 리뷰] From Local to Global: A Graph RAG Approach"
date: 2026-07-02 09:00:00 +0900
categories: [Paper Review, RAG]
tags: [paper-review, graphrag, rag, llm, knowledge-graph]
paper:
  title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization"
  authors: "Darren Edge, Ha Trinh, et al. (Microsoft Research)"
  venue: "arXiv"
  year: 2024
  link: "https://arxiv.org/abs/2404.16130"
  summary: "지식 그래프 + 커뮤니티 요약으로 대규모 문서 전체를 아우르는 글로벌 질문에 답하는 GraphRAG 기법을 제안한다."
---

## 어떤 문제를 푸는가?

기존 RAG는 질문과 유사한 일부 청크(chunk)만 검색해 답하기 때문에, "이 문서 전체의 핵심 주제는 무엇인가?" 같은 **전역적(global) 질문**에는 약합니다. 이 논문은 문서 컬렉션 전체를 조망해야 하는 질의에 강한 **GraphRAG** 파이프라인을 제안합니다.

## 핵심 아이디어

1. **지식 그래프 구축**: LLM으로 문서에서 엔티티와 관계를 추출해 그래프를 만듭니다.
2. **커뮤니티 탐지**: 그래프를 서로 밀접한 노드 집단(커뮤니티)으로 분할합니다.
3. **커뮤니티 요약**: 각 커뮤니티를 미리 요약해 둡니다.
4. **map-reduce 응답**: 질문이 오면 커뮤니티 요약들로 부분 답변을 만든 뒤(map), 이를 종합(reduce)해 최종 답을 생성합니다.

> 핵심은 "검색 후 생성"이 아니라, **미리 계층적으로 요약된 그래프**를 활용한다는 점입니다.

## 인상 깊었던 점

- 전역 질문에서 기존 벡터 RAG 대비 **답변의 포괄성과 다양성**이 크게 향상되었습니다.
- 커뮤니티 요약을 캐싱해 두므로, 반복 질의에서 효율적입니다.

## 한계와 생각

- 그래프 구축과 요약에 **LLM 호출 비용**이 상당히 듭니다.
- 도메인에 따라 엔티티 추출 품질이 성능을 좌우할 것으로 보입니다.

정리하면, GraphRAG는 "부분 검색"의 한계를 구조적으로 넘어서려는 시도로, 대규모 지식베이스를 다루는 실무에 시사하는 바가 큽니다.
