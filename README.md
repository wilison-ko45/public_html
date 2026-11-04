# 박장우 개인 웹사이트 및 포트폴리오 소스 문서 허브

> **기준일: 2026년 11월 4일**
> **소유자: 박장우 (PARK JANG WOO) — 사회복지학과 3학년**
> **목적:** 개인 웹사이트 구축을 위한 각 카테고리별 마크다운(.md) 문서의 종합 인덱스 및 웹사이트 실행 가이드

---

## 1. 디렉터리 및 구현 구조

본 워크스페이스는 『박장우 개인 웹사이트 구축 계획서』를 바탕으로, 각 폴더의 원천 데이터와 최신 정보를 체계적으로 검토하여 마크다운(.md) 문서와 **실행 가능한 반응형 개인 웹사이트(Single Page Application)**로 구현되었습니다.

```text
c:\Antigravity\박장우\
├── index.html                                             # [웹사이트 메인 실행 파일] 반응형 7대 메뉴 SPA
├── run_server.py                                          # [로컬 웹서버 실행기] Python 기반 자동 브라우저 실행
├── start.bat                                              # [원클릭 실행기] 윈도우 탐색기 더블클릭용 배치 파일
├── css\
│   └── style.css                                          # Pretendard 폰트 & 미니멀 모노톤 디자인 시스템
├── js\
│   ├── data.js                                            # 웹사이트 전체 데이터 스토어 (프로필, 학업, 취미 등)
│   └── app.js                                             # 뷰 라우터, 다크모드, 필터/검색, 모달 제어 컨트롤러
│
├── README.md                                              # [본 문서] 전체 문서 인덱스 및 실행 가이드
├── 박장우_개인웹사이트_구축계획.md                                # 웹사이트 종합 기획 및 브랜드·기능 명세서
│
├── 사회복지학\                                              # [전공 & 진로 & 봉사]
│   └── social_welfare_academic_and_career_portfolio_2026-11-04.md
│
├── AI스마트워크\                                            # [과제 & 데이터 분석 프로젝트]
│   ├── ai_smartwork_driver_retention_report_2026-11-04.md
│   ├── coupang_data_description.txt
│   └── result_cp.txt
│
├── 기아 타이거즈\                                           # [스포츠 관심사 - 야구]
│   └── kia_tigers_recent_news_2026-11-04.md
│
└── 첼시\                                                  # [스포츠 관심사 - 축구]
    └── chelsea_fc_recent_news_2026-11-04.md
```

---

## 2. 개인 웹사이트 실행 방법 (3가지 방식)

### 방식 1: 원클릭 실행 (가장 간편한 방법)
- 윈도우 파일 탐색기에서 **[`start.bat`](file:///c:/Antigravity/박장우/start.bat)** 파일을 더블 클릭합니다.
- 자동으로 로컬 서버가 시작되며 기본 웹 브라우저에 사이트가 열립니다.

### 방식 2: 터미널에서 Python 로컬 서버 실행
```powershell
python run_server.py
```
- 브라우저 주소: `http://localhost:8000`

### 방식 3: 브라우저에서 직접 파일 열기
- **[`index.html`](file:///c:/Antigravity/박장우/index.html)** 파일을 크롬(Chrome)이나 엣지(Edge) 브라우저로 직접 더블 클릭하여 바로 열람할 수 있습니다.

---

## 3. 웹사이트 7개 메뉴와 마크다운 문서 매핑

| 웹사이트 메뉴 | 주요 기능 및 구현 내용 | 연계 소스 마크다운 파일 |
|---|---|---|
| **HOME** | 히어로 타이포그래피, 슬로건, 퀵 프로필 뱃지, 6대 메뉴 탐색 카드, 최근 성장 프리뷰 | [박장우_개인웹사이트_구축계획.md](file:///c:/Antigravity/박장우/박장우_개인웹사이트_구축계획.md#L144-L170) |
| **ABOUT ME** | INFJ 성향, 3대 강점(요리, 순발력, 공감), 3대 성장 지향점, 취향 펀 팩트 | [박장우_개인웹사이트_구축계획.md](file:///c:/Antigravity/박장우/박장우_개인웹사이트_구축계획.md#L171-L187) |
| **ACADEMIC** | 사회복지학 전공 비전, 탐색 영역, **AI스마트워크 쿠팡 배송기사 이탈 분석 실무 리포트(모달)**, 교과목 이수표 | [사회복지학 포트폴리오](file:///c:/Antigravity/박장우/사회복지학/social_welfare_academic_and_career_portfolio_2026-11-04.md)<br>[AI스마트워크 보고서](file:///c:/Antigravity/박장우/AI스마트워크/ai_smartwork_driver_retention_report_2026-11-04.md) |
| **CAREER** | 3대 진로 관심 분야(종합복지, 대상별 복지, 공공복지), **3대 봉사활동 10대 포트폴리오 모달**, 자격·실습 마일스톤 | [사회복지학 포트폴리오](file:///c:/Antigravity/박장우/사회복지학/social_welfare_academic_and_career_portfolio_2026-11-04.md)<br>[AI스마트워크 보고서](file:///c:/Antigravity/박장우/AI스마트워크/ai_smartwork_driver_retention_report_2026-11-04.md) |
| **MY INTERESTS** | 축구(첼시), 야구(KIA), OTT(또 오해영), 음악, 게임, 요리 **실시간 카테고리 필터, 검색창, 상세 리포트 모달** | [첼시 동향 보고서](file:///c:/Antigravity/박장우/첼시/chelsea_fc_recent_news_2026-11-04.md)<br>[KIA 타이거즈 동향 보고서](file:///c:/Antigravity/박장우/기아%20타이거즈/kia_tigers_recent_news_2026-11-04.md)<br>[기획서 4.5절](file:///c:/Antigravity/박장우/박장우_개인웹사이트_구축계획.md#L250-L302) |
| **MY GROWTH** | 학업, 봉사, 진로, 도전, 일상 타임라인 필터 및 **브라우저 로컬스토리지 연동 새 기록 작성 기능** | [사회복지학 포트폴리오 6절](file:///c:/Antigravity/박장우/사회복지학/social_welfare_academic_and_career_portfolio_2026-11-04.md#L170-L190) |
| **CONTACT** | 연락처 안내 및 유효성 검사, **테스트 모드 안내 모달을 포함한 피드백 폼** | [박장우_개인웹사이트_구축계획.md](file:///c:/Antigravity/박장우/박장우_개인웹사이트_구축계획.md#L326-L345) |

---

## 4. 사이트 주요 기능 및 특징

1. **미니멀 & 모던 모노톤 디자인:**
   - 흑백과 무채색 기반의 정돈된 인터페이스
   - 인물 사진 대신 세련된 타이포그래피와 기하학적 추상 그래픽 적용
2. **다크 모드 완벽 지원:**
   - 헤더 우측 및 모바일 메뉴의 테마 토글 버튼을 통해 다크/라이트 모드 즉각 전환 및 `localStorage` 설정 유지
3. **풍부한 인터랙션:**
   - 부드러운 해시 라우팅 (새로고침 없는 뷰 전환)
   - 실시간 취미/관심사 필터링 및 검색 기능
   - 10대 봉사활동 포트폴리오 및 AI 실증 분석 상세 팝업 모달
   - 브라우저 로컬 저장소(localStorage) 기반 "새 성장 기록 추가" 기능
   - 화면 하단 스크롤 시 자동 노출되는 상단 이동(Back to top) 플로팅 버튼
