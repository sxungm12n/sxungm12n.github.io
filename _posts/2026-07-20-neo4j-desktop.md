---
title: "Neo4j Desktop 사용하기"
date: 2026-07-20 12:00:00 +0900
categories: [LLM, GraphRAG]
tags: [Neo4j, Desktop, Graph Database, Cypher, AuraDB, GraphRAG]
description: "Neo4j Desktop으로 로컬 인스턴스를 만들고, 플러그인을 설치하고, Aura로 마이그레이션하고, 원격 DB까지 한곳에서 연결하는 실습 가이드."
toc: true
---

> 브라우저만으로 맛보는 [Sandbox](/posts/neo4j-sandbox/), 클라우드에서 계속 쓰는 [AuraDB](/posts/neo4j-auradb/)에 이어, 이번에는 **내 PC에서 로컬 인스턴스를 직접 돌리는 Neo4j Desktop** 을 정리합니다. 설치부터 플러그인, Aura 마이그레이션, 원격 연결까지 화면을 따라가 보겠습니다.

Neo4j Desktop은 로컬 인스턴스와 원격 데이터베이스를 한곳에서 관리할 수 있는 데스크톱 앱입니다.

공식 설치 가이드는 아래 문서에서 확인할 수 있습니다.

> [https://neo4j.com/docs/desktop/current/installation/](https://neo4j.com/docs/desktop/current/installation/)

저는 macOS 환경이라 위 링크에서 macOS 버전으로 내려받았습니다.

---

## 1. 다운로드와 설치

다운로드 페이지에서 운영체제에 맞는 설치 파일을 받습니다. macOS는 `.dmg`, Windows는 `.exe`, Linux는 `AppImage` 형태로 제공됩니다.

![Neo4j Desktop 다운로드 선택 화면](/assets/img/neo4j-desktop/image-01.png)
*Neo4j 공식 페이지. AuraDB(클라우드)와 Neo4j Desktop(로컬) 중 Desktop의 Download를 고른다.*

양식을 작성한 뒤 **Download Desktop** 을 누르면 설치 파일이 내려받아집니다.

![다운로드 양식 화면](/assets/img/neo4j-desktop/image-02.png)
*이름·이메일 등을 입력하고 Download Desktop을 누른다.*

다운로드가 끝나면 (제 경우 `neo4j-desktop-…-universal.dmg`, 약 261MB) 설치 파일을 실행합니다.

![Thanks for downloading Neo4j Desktop](/assets/img/neo4j-desktop/image-03.png)
*다운로드 완료 안내 화면. Mac / Windows / Linux 수동 다운로드 링크와 권장 사양이 함께 보인다.*

권장 사양은 문서 기준으로 macOS 10.10 이상(Yosemite), Windows 10 이상(PowerShell 5.1+), Ubuntu 22.04, Debian 11입니다.

---

## 2. 첫 인스턴스 만들기

앱을 실행하면 아래와 같은 초기 화면이 나타납니다. 여기서 **Create instance** 를 클릭해 사용할 인스턴스의 이름, 버전, 비밀번호를 입력하고 생성합니다.

![Create your first instance](/assets/img/neo4j-desktop/image-04.png)
*"Create your first instance" 화면. Create instance로 로컬 DBMS를 만든다.*

저는 현재 Desktop 2.x 버전을 사용 중입니다. 기능 자체는 이전에 다뤘던 [AuraDB](/posts/neo4j-auradb/)와 대부분 비슷하지만, Neo4j Desktop은 두 가지가 더 있습니다. **Local instances** 로 로컬에 있는 인스턴스를 직접 관리할 수 있고, **Remote connections** 를 통해 원격 DB와도 연결할 수 있다는 점입니다.

이 덕분에 인스턴스를 여러 개 만들어 각각 다른 버전을 쓰면서, 프로젝트별로 테스트 환경을 분리해 관리하기에 편리합니다.

인스턴스를 생성하면 상태가 `RUNNING`으로 바뀌고, ID·버전·Connection URI 같은 정보가 표시됩니다.

![생성된 인스턴스 test1이 RUNNING 상태](/assets/img/neo4j-desktop/image-06.png)
*생성된 인스턴스 `test1`. Connection URI는 보통 `neo4j://127.0.0.1:7687`이다.*

---

## 3. 인스턴스에 연결해 기능 사용하기

인스턴스 카드에서 **Connect** 를 누르면 Import, Query, Bloom, Dashboards 같은 기능을 바로 열 수 있습니다.

![Connect 드롭다운](/assets/img/neo4j-desktop/image-07.png)
*Connect 드롭다운 — Import / Query / Bloom / Dashboards*

### Overview — 연결 정보 확인

`···` 메뉴의 **Overview** 에서는 Connection URI, 버전, 에디션(enterprise), ID, 생성·최근 실행 시각 등 연결에 필요한 정보를 확인할 수 있습니다. 로컬 접속 포트는 보통 **7687** 을 사용합니다.

![Overview 패널](/assets/img/neo4j-desktop/image-09.png)
*Overview 패널. Connection URI `neo4j://127.0.0.1:7687`, Edition enterprise 등을 확인할 수 있다.*

---

## 4. 플러그인(Plugins) 설치

**Plugins** 탭에서는 여러 부가 라이브러리를 설치해 기능을 확장할 수 있습니다. 대표적으로는 다음과 같은 것들이 있습니다.

- **APOC** — 컬렉션 처리, 그래프 알고리즘, 데이터 변환 등 약 450개의 프로시저·함수를 제공하는 유틸리티 라이브러리.
- **Graph Data Science (GDS)** — 커뮤니티 탐지, 중심성, 유사도, 경로 탐색, 노드 임베딩 등 데이터 사이언스 알고리즘을 쓸 수 있는 플러그인.
- **Gen AI** — Cypher에서 외부 AI 제공자와 연동해 벡터 임베딩을 만들거나 텍스트를 생성할 수 있는 플러그인. GraphRAG처럼 DB에서 시맨틱 검색을 해야 하는 경우, 이때 필요한 임베딩 생성에 쓰입니다.

![Plugins 탭](/assets/img/neo4j-desktop/image-10.png)
*Plugins 탭 — APOC / Bloom / Gen AI / Graph Data Science 목록. 필요한 것만 Install하면 된다.*

필요한 플러그인만 설치해서 쓰고, 쓰지 않을 때는 다시 비활성화해 두면 됩니다.

---

## 5. AuraDB로 마이그레이션 — Deploy to Neo4j Aura

**Deploy to Neo4j Aura** 는 지금 로컬 DB를 Aura로 옮기기 위한 덤프(dump) 파일을 생성하는 기능입니다. [AuraDB 운영 가이드](/posts/neo4j-auradb/)에서 만든 클라우드 인스턴스로 로컬 데이터를 이전할 때 바로 이 경로를 씁니다.

![Aura 드롭다운 — Deploy to Neo4j Aura](/assets/img/neo4j-desktop/image-12.png)
*인스턴스의 Aura 메뉴. Deploy to Neo4j Aura로 로컬 DB를 클라우드로 옮길 수 있다.*

여기서 **덤프 파일**이란, 데이터베이스 전체를 하나의 압축 파일로 저장한 백업 패키지라고 보면 됩니다. 로컬 DB를 Aura로 옮기려면, 이 백업 압축 파일을 만들어서 Aura에 업로드하면 됩니다. 즉 덤프 파일을 받아 그대로 Aura에 올리면 로컬 DB를 그대로 클라우드로 이전해 사용할 수 있습니다.

![Deploy to Neo4j Aura 다이얼로그](/assets/img/neo4j-desktop/image-13.png)
*"Deploy to Neo4j Aura" 다이얼로그. 업로드할 데이터베이스를 고르면 .dump가 만들어진다. users·roles·privileges는 함께 업로드되지 않는다.*

Aura는 SOC2, ISO27001, HIPAA 같은 데이터 보안·개인정보 표준을 준수하는 관리형 서비스입니다. 업로드하려면 Aura 계정과 적절한 크기의 인스턴스가 필요하며, 이때 users·roles·privileges(사용자·역할·권한)는 함께 업로드되지 않는다는 점만 유의하면 됩니다.

---

## 6. 원격 DB 연결 — Remote connections

**Remote connections** 에서는 **Add connection** 을 통해 Neo4j Desktop에서 로컬 DB뿐 아니라 Neo4j Aura, [Sandbox](/posts/neo4j-sandbox/) 등 다른 환경의 DB 정보를 등록할 수 있습니다. 연결만 해 두면 익숙한 Desktop UI를 그대로 쓰면서 Aura나 다른 원격 DB로 쿼리를 날릴 수 있습니다.

![Remote connections — No connections added](/assets/img/neo4j-desktop/image-14.png)
*"No connections added" 화면. Add connection으로 Aura·Sandbox 등 원격 DB를 등록한다.*

연결 추가 창에서는 Protocol(예: `neo4j+s://`), Connection URL, Database user, Password, Connection name을 입력하거나 자격 증명 파일을 드래그 앤 드롭으로 등록할 수 있습니다.

![Add connection 다이얼로그](/assets/img/neo4j-desktop/image-15.png)
*"Add connection" 다이얼로그. 자격증명 .txt를 끌어다 놓거나 Protocol·URL·계정 정보를 직접 입력한다.*

---

## 7. 쿼리 실행 — Query

**Query** 화면은 이전에 다뤘던 UI와 동일합니다. 처음에는 "No instance connected" 상태이며, **Connect to instance** 를 눌러 관리 중인 여러 인스턴스 중 하나를 선택해 연결한 뒤, 그 위에서 쿼리를 실행하면 됩니다.

![Query 화면 — No instance connected](/assets/img/neo4j-desktop/image-16.png)
*Query 화면. 아직 인스턴스에 연결되지 않은 상태다.*

![Connect to Neo4j — Local / Remote](/assets/img/neo4j-desktop/image-17.png)
*"Connect to Neo4j" 창. Local 탭에서는 로컬 인스턴스를, Remote 탭에서는 앞서 등록한 원격 연결을 고른다.*

Local 탭에서는 로컬 인스턴스를, Remote 탭에서는 앞서 등록한 원격 연결을 골라 접속할 수 있습니다.

---

## 8. Try Neo4j Aura 메뉴

마지막으로 **Try Neo4j Aura** 메뉴를 살펴보겠습니다. 앞서 Aura로 옮기기 위해 덤프 파일을 받을 수 있다고 했는데, 이 메뉴에서 Aura 연동을 위한 가이드라인과 시작 방법을 함께 확인할 수 있습니다.

![Try Neo4j Aura 소개 화면](/assets/img/neo4j-desktop/image-18.png)
*"Try Neo4j Aura" 소개 화면. 자연어·클라우드 기능, 로컬 자산 마이그레이션, Desktop DB 배포 경로를 안내한다.*

여기서는 자연어·클라우드 기능을 Aura 도구에서 사용하는 법, 로컬 도구 자산을 클라우드로 옮기는 법, 로컬 DB를 Aura로 배포하는 법 등을 안내받을 수 있습니다. 로컬 접속 URL(`neo4j://127.0.0.1:7687`)을 복사해 "Add Deployment"에 넣는 식으로 연동을 시작할 수 있습니다.

---

## 정리

Neo4j Desktop은 로컬 인스턴스를 버전별로 나눠 관리하고, 플러그인으로 기능을 확장하며, 필요하면 덤프 파일로 Aura에 그대로 이전할 수 있는 올인원 도구입니다. 여기에 Remote connections까지 더하면, 익숙한 Desktop UI 하나로 로컬·클라우드·Sandbox를 오가며 작업할 수 있습니다. 프로젝트별 테스트 환경을 깔끔하게 분리하고 싶다면 특히 유용합니다.

Neo4j를 어떤 환경에서 쓸지에 따라 아래 글도 함께 보면 좋습니다.

| 목적 | 글 |
|------|-----|
| 설치 없이 브라우저로 입문 | [Neo4j로 그래프 DB 시작하기: Sandbox 실습 가이드](/posts/neo4j-sandbox/) |
| 계속 쓸 클라우드 DB 운영 | [Neo4j AuraDB로 그래프 DB 운영 시작하기](/posts/neo4j-auradb/) |
| 로컬 인스턴스·플러그인·원격 연결 | 이 글 (Neo4j Desktop) |

---

## 참고 자료

- Neo4j Desktop 설치 가이드 — [neo4j.com/docs/desktop](https://neo4j.com/docs/desktop/current/installation/)
- Neo4j AuraDB — [neo4j.com/product/auradb](https://neo4j.com/product/auradb/)
- Neo4j Sandbox — [neo4j.com/sandbox](https://neo4j.com/sandbox/)
