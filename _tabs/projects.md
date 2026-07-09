---
layout: page
icon: fas fa-diagram-project
order: 5
---

<p class="projects-intro">진행했던 프로젝트들을 소개합니다. 시리즈 글은 <strong>GraphRAG</strong> 카테고리로 묶여 있습니다.</p>

{% assign graphrag_series = site.posts | where_exp: "post", "post.categories contains 'GraphRAG'" | sort: 'date' %}

<div class="project-grid">
  <article class="project-card">
    <div class="project-card-head">
      <span class="project-emoji">🕸️</span>
      <span class="project-period">2026 · {{ graphrag_series.size }}편</span>
    </div>
    <h3 class="project-title">GraphRAG 기술 블로그 시리즈</h3>
    <p class="project-desc">그래프 DB 입문부터 Neo4j 실습, GraphRAG 파이프라인까지 이어지는 학습 시리즈입니다.</p>
    <ul class="project-points">
      <li>Graph DB 개념 · DB 종류 비교</li>
      <li>GraphRAG 인덱싱·검색 파이프라인</li>
      <li>Neo4j Sandbox · AuraDB 실습</li>
    </ul>
    <div class="project-tags">
      <span class="ptag">GraphRAG</span>
      <span class="ptag">Neo4j</span>
      <span class="ptag">RAG</span>
    </div>

    {% if graphrag_series.size > 0 %}
      <ol class="series-post-list">
        {% for post in graphrag_series %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </li>
        {% endfor %}
      </ol>
    {% endif %}

    <div class="project-links">
      <a href="{{ '/categories/graphrag/' | relative_url }}">
        <i class="fas fa-folder-open"></i> GraphRAG 카테고리
      </a>
      <a href="{{ '/posts/graphrag-complete-guide/' | relative_url }}" class="project-link-secondary">
        <i class="fas fa-book-open"></i> 핵심 글
      </a>
    </div>
  </article>

  <article class="project-card project-card-placeholder">
    <div class="project-card-head">
      <span class="project-emoji">🚀</span>
      <span class="project-period">Coming soon</span>
    </div>
    <h3 class="project-title">다음 프로젝트</h3>
    <p class="project-desc">새 프로젝트가 준비되면 이곳에 추가됩니다.</p>
    <div class="project-tags">
      <span class="ptag">Python</span>
      <span class="ptag">LLM</span>
    </div>
  </article>
</div>
