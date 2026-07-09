---
layout: page
icon: fas fa-diagram-project
order: 5
---

<p class="projects-intro">직접 진행한 프로젝트를 소개합니다.</p>

<article class="project-showcase">
  <div class="project-showcase-meta">
    <span class="project-emoji" aria-hidden="true">💊</span>
    <span class="project-period">2024.10 완료</span>
    <span class="project-type">졸업 프로젝트</span>
  </div>

  <h2 class="project-showcase-title">VitaView — 영양제 성분표를 찍으면 내 영양 상태를 알려주는 앱</h2>

  <div class="project-tags">
    <span class="ptag">Flutter</span>
    <span class="ptag">Flask</span>
    <span class="ptag">OCR</span>
    <span class="ptag">Docker</span>
    <span class="ptag">MySQL</span>
    <span class="ptag">GetX</span>
  </div>

  <section class="project-section">
    <h3>왜 만들었나</h3>
    <p>건강에 관심이 많아지면서 영양제를 챙겨 먹는 사람이 늘었지만, 정작 "내가 지금 뭘 얼마나 먹고 있는지"는 잘 모르는 경우가 많습니다. 여러 개를 겹쳐 먹다 보면 특정 성분이 과다해지거나, 반대로 부족한 영양소는 계속 방치되기도 하죠.</p>
    <p>VitaView는 이 문제에서 출발했습니다. <strong>영양제 성분표를 사진으로 찍으면 OCR로 성분을 자동 인식하고, 한국인 영양섭취기준과 비교해 부족·적정·과다를 색으로 보여주는</strong> 앱입니다. 부족하면 보충할 수 있는 식품을 추천하고, 과다하면 부작용 정보를 안내합니다. 졸업 프로젝트로 시작해 프론트/백엔드 분리, UI 개편, Docker 배포까지 발전시켜왔습니다.</p>
  </section>

  <section class="project-section">
    <h3>핵심 기능</h3>
    <ul class="project-points">
      <li><strong>OCR 자동 인식</strong> — 성분표 사진을 올리면 Google Cloud Vision으로 텍스트를 추출하고 28종 영양소 수치를 뽑아냅니다. 수동 입력이 필요 없습니다.</li>
      <li><strong>누적 섭취량 분석</strong> — 여러 영양제를 등록하면 복용 횟수까지 반영해 합산하고, 나이·성별 기준으로 부족(🔵) / 적정(🟢) / 과다(🔴)를 판정합니다.</li>
      <li><strong>결과 안내</strong> — 부족하면 식품 추천, 과다하면 부작용 안내, 적정하면 영양소 기능 정보를 제공합니다.</li>
      <li><strong>리뷰·커뮤니티</strong> — 영양제 후기와 게시글을 공유하고 댓글로 소통할 수 있습니다.</li>
    </ul>
    <p>기존 영양제 앱들이 대부분 수동 입력을 요구하고 추가 구매를 유도하는 것과 달리, VitaView는 OCR 자동 인식과 음식 기반 보충 권장에 초점을 맞췄습니다.</p>
  </section>

  <section class="project-section">
    <h3>사용자 흐름</h3>
    <pre class="project-flow"><code>회원가입 / 로그인
   → 영양제 성분표 사진 업로드 (OCR)
   → 추출된 28종 영양소 확인·수정 후 저장
   → 홈에서 '부족 / 적정 / 과다' 상태 확인
   → 리뷰·커뮤니티에서 정보 공유</code></pre>
  </section>

  <section class="project-section">
    <h3>기술 스택</h3>
    <p><strong>프론트엔드</strong>는 Flutter(Web 타깃)로, 상태 관리·라우팅은 GetX, 이미지 선택은 <code>image_picker</code>를 사용했습니다. UI는 에메랄드 그린 기반 Material 3 커스텀 테마와 공통 위젯 라이브러리(<code>StatusChip</code>, <code>AppCard</code>, <code>NutrientFieldRow</code> 등)로 일관성을 유지합니다.</p>
    <p><strong>백엔드</strong>는 Flask 3.0 + SQLAlchemy 기반 REST API 서버입니다. 인증은 JWT(Bearer), 비밀번호는 해싱 저장하며 데이터베이스는 MySQL 8.0을 씁니다.</p>
    <p><strong>AI/OCR</strong>은 Google Cloud Vision API로 성분표 텍스트를 인식합니다. 인식된 텍스트에서 영양소명과 수치·단위를 파싱해 28종 항목에 매핑하고, <code>mg</code>·<code>µg</code>·<code>IU</code> 등 단위 표기 차이를 정규화해 합산합니다. 비교 기준이 되는 권장량·상한 데이터는 <strong>한국인 영양섭취기준(2020)을 참고해 팀이 직접 엑셀로 정리한 것</strong>으로, 나이·성별 구간(<code>75세 이상</code> 같은 개방 구간 포함)별 행을 조회해 판정에 사용합니다.</p>
    <p><strong>배포</strong>는 Docker / Docker Compose로 묶어 <code>docker compose up</code> 한 번이면 프론트·백엔드·MySQL이 함께 뜨는 데모 환경이 구성됩니다.</p>
  </section>

  <section class="project-section">
    <h3>앞으로</h3>
    <p>지금은 Google OCR API를 쓰고 있지만, 향후에는 자체 OCR 모델을 직접 구현하고 딥러닝 기반으로 영양소 인식 정확도를 높이는 방향을 계획하고 있습니다. 개인화된 영양소 추천 알고리즘도 다듬어 나갈 예정입니다.</p>
  </section>

  <div class="project-links">
    <a href="https://github.com/sxungm12n/VitaManagement-frontend" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> 프론트엔드</a>
    <a href="https://github.com/sxungm12n/VitaManagement-backend" class="project-link-secondary" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> 백엔드</a>
  </div>

  <p class="project-note">API 키·DB 비밀번호·JWT 시크릿 등 민감 정보는 저장소에 포함하지 않았습니다.</p>
</article>
