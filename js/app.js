/**
 * 박장우 개인 웹사이트 - 핵심 컨트롤러 (app.js)
 * 네비게이션, 뷰 라우팅, 다크모드, 필터·검색, 모달 인터랙션 및 로컬 저장소 연동
 */

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initRouter();
  initMobileMenu();
  initBackToTop();
  renderAllViews();
  setupGlobalEvents();
});

// ==========================================
// 1. 다크 모드 관리
// ==========================================
function initDarkMode() {
  const toggleBtn = document.getElementById("theme-toggle");
  const mobileToggleBtn = document.getElementById("mobile-theme-toggle");
  const storedTheme = localStorage.getItem("pj_theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("pj_theme", isDark ? "dark" : "light");
    refreshIcons();
  }

  if (toggleBtn) toggleBtn.addEventListener("click", toggle);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener("click", toggle);
}

// ==========================================
// 2. 뷰 라우팅 (Hash-based Router)
// ==========================================
const VALID_VIEWS = ["home", "about", "academic", "career", "interests", "growth", "contact"];

function initRouter() {
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange(); // 초기 로드
}

function handleHashChange() {
  let hash = window.location.hash.replace("#", "").toLowerCase();
  if (!VALID_VIEWS.includes(hash)) {
    hash = "home";
  }
  switchView(hash);
}

function switchView(viewId) {
  // 모든 뷰 비활성화
  document.querySelectorAll(".view-section").forEach((sec) => {
    sec.classList.remove("active");
  });

  // 해당 뷰 활성화
  const targetSec = document.getElementById(`view-${viewId}`);
  if (targetSec) {
    targetSec.classList.add("active");
  }

  // 데스크톱 및 모바일 네비게이션 활성 링크 업데이트
  document.querySelectorAll("[data-nav-target]").forEach((link) => {
    const target = link.getAttribute("data-nav-target");
    if (target === viewId) {
      link.classList.add("text-neutral-950", "dark:text-white", "font-semibold", "border-b-2", "border-neutral-900", "dark:border-white");
      link.classList.remove("text-neutral-500", "dark:text-neutral-400");
    } else {
      link.classList.remove("text-neutral-950", "dark:text-white", "font-semibold", "border-b-2", "border-neutral-900", "dark:border-white");
      link.classList.add("text-neutral-500", "dark:text-neutral-400");
    }
  });

  // 페이지 최상단으로 스크롤
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 모바일 메뉴 닫기
  closeMobileMenu();

  // 아이콘 갱신
  refreshIcons();
}

// ==========================================
// 3. 모바일 네비게이션 서랍
// ==========================================
function initMobileMenu() {
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("close-mobile-menu");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-drawer-backdrop");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      drawer.classList.remove("translate-x-full");
      backdrop.classList.remove("hidden");
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);
  if (backdrop) backdrop.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu() {
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  if (drawer) drawer.classList.add("translate-x-full");
  if (backdrop) backdrop.classList.add("hidden");
}

// ==========================================
// 4. 상단 이동 버튼
// ==========================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
      backToTopBtn.classList.add("opacity-100", "pointer-events-auto");
    } else {
      backToTopBtn.classList.add("opacity-0", "pointer-events-none");
      backToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==========================================
// 5. 전체 뷰 렌더링
// ==========================================
function renderAllViews() {
  renderHomeView();
  renderAboutView();
  renderAcademicView();
  renderCareerView();
  renderInterestsView();
  renderGrowthView();
  renderContactView();
  refreshIcons();
}

// 5.1 HOME 렌더링
function renderHomeView() {
  const p = SITE_DATA.profile;

  // Hero Quick Profile Badges
  const quickInfoContainer = document.getElementById("home-quick-info");
  if (quickInfoContainer) {
    quickInfoContainer.innerHTML = `
      <div class="flex flex-wrap gap-2 text-xs md:text-sm">
        <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full font-medium text-neutral-800 dark:text-neutral-200">
          전공: ${p.major} (${p.grade})
        </span>
        <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full font-medium text-neutral-800 dark:text-neutral-200">
          MBTI: ${p.mbti}
        </span>
        <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full font-medium text-neutral-800 dark:text-neutral-200">
          특기: 요리 & 빠른 반사신경
        </span>
      </div>
    `;
  }

  // Latest Growth Preview on Home
  const growthPreview = document.getElementById("home-growth-preview");
  if (growthPreview) {
    const latestItems = getGrowthItems().slice(0, 2);
    growthPreview.innerHTML = latestItems.map((item) => `
      <div class="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl interactive-card">
        <div class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          <span class="font-mono">${item.date}</span>
          <span class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-[11px] font-medium">${item.categoryLabel}</span>
        </div>
        <h4 class="font-semibold text-sm md:text-base text-neutral-900 dark:text-neutral-100 mb-1">${item.title}</h4>
        <p class="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">${item.summary}</p>
      </div>
    `).join("");
  }
}

// 5.2 ABOUT ME 렌더링
function renderAboutView() {
  const p = SITE_DATA.profile;

  // Strengths
  const strengthsContainer = document.getElementById("about-strengths");
  if (strengthsContainer) {
    strengthsContainer.innerHTML = p.strengths.map((s) => `
      <div class="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-semibold text-base text-neutral-900 dark:text-neutral-100">${s.title}</h4>
          <span class="px-2.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 text-xs rounded-full font-medium">${s.tag}</span>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">${s.desc}</p>
      </div>
    `).join("");
  }

  // Challenges (Growth Mindset)
  const challengesContainer = document.getElementById("about-challenges");
  if (challengesContainer) {
    challengesContainer.innerHTML = p.challenges.map((c) => `
      <div class="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-semibold text-base text-neutral-900 dark:text-neutral-100">${c.title}</h4>
          <span class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded font-medium">${c.status}</span>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">${c.desc}</p>
      </div>
    `).join("");
  }
}

// 5.3 ACADEMIC 렌더링
function renderAcademicView() {
  const a = SITE_DATA.academic;

  // Fields
  const fieldsContainer = document.getElementById("academic-fields");
  if (fieldsContainer) {
    fieldsContainer.innerHTML = a.fields.map((f) => `
      <div class="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl interactive-card">
        <h4 class="font-semibold text-base text-neutral-900 dark:text-neutral-100 mb-2">${f.title}</h4>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">${f.desc}</p>
        <div class="flex flex-wrap gap-1.5">
          ${f.tags.map(t => `<span class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-xs">#${t}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // Coursework Table
  const coursesContainer = document.getElementById("academic-courses-tbody");
  if (coursesContainer) {
    coursesContainer.innerHTML = a.coursesTemplate.map((c) => `
      <tr class="border-b border-neutral-100 dark:border-neutral-800/60 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
        <td class="py-3 px-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">${c.semester}</td>
        <td class="py-3 px-4 font-medium text-sm text-neutral-900 dark:text-neutral-100">${c.name}</td>
        <td class="py-3 px-4 text-xs"><span class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">${c.type}</span></td>
        <td class="py-3 px-4 text-xs text-neutral-600 dark:text-neutral-400">${c.topic}</td>
        <td class="py-3 px-4 text-xs text-neutral-600 dark:text-neutral-400">${c.insight}</td>
      </tr>
    `).join("");
  }
}

// 5.4 CAREER 렌더링
function renderCareerView() {
  const c = SITE_DATA.career;

  // Target Fields
  const targetContainer = document.getElementById("career-targets");
  if (targetContainer) {
    targetContainer.innerHTML = c.targetFields.map((t) => `
      <div class="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl interactive-card">
        <div class="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 text-neutral-900 dark:text-neutral-100">
          <i data-lucide="${t.icon}" class="w-5 h-5"></i>
        </div>
        <h4 class="font-semibold text-base text-neutral-900 dark:text-neutral-100 mb-2">${t.title}</h4>
        <p class="text-xs font-medium text-neutral-800 dark:text-neutral-300 mb-2">${t.summary}</p>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">${t.detail}</p>
      </div>
    `).join("");
  }

  // Volunteer Cards
  const volunteerContainer = document.getElementById("career-volunteers");
  if (volunteerContainer) {
    volunteerContainer.innerHTML = c.volunteers.map((v) => `
      <div class="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-xs font-medium rounded-full text-neutral-800 dark:text-neutral-200">${v.tag}</span>
            <span class="text-xs font-mono text-neutral-400 dark:text-neutral-500">${v.institution}</span>
          </div>
          <h4 class="font-semibold text-base md:text-lg text-neutral-900 dark:text-neutral-100 mb-2">${v.title}</h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed">${v.description}</p>
          <div class="flex flex-wrap gap-1 mb-4">
            ${v.competencies.map(cp => `<span class="px-2 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-[11px] font-medium">${cp}</span>`).join("")}
          </div>
        </div>
        <button onclick="openVolunteerModal('${v.id}')" class="w-full mt-2 py-2 px-4 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
          <span>10대 포트폴리오 상세 명세 보기</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `).join("");
  }

  // Roadmap
  const roadmapContainer = document.getElementById("career-roadmap");
  if (roadmapContainer) {
    roadmapContainer.innerHTML = c.roadmap.map((r, i) => `
      <div class="relative pl-6 pb-6 border-l-2 border-neutral-200 dark:border-neutral-800 last:border-0 last:pb-0">
        <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-900 dark:bg-white border-4 border-white dark:border-neutral-950"></div>
        <span class="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400">${r.step}</span>
        <h4 class="font-semibold text-sm md:text-base text-neutral-900 dark:text-neutral-100 mt-1 mb-1">${r.title}</h4>
        <p class="text-xs text-neutral-600 dark:text-neutral-400">${r.desc}</p>
      </div>
    `).join("");
  }
}

// 5.5 MY INTERESTS 렌더링 & 필터/검색
let currentInterestFilter = "all";
let currentInterestQuery = "";

function renderInterestsView() {
  const container = document.getElementById("interests-container");
  if (!container) return;

  const filtered = SITE_DATA.interests.filter((item) => {
    const matchCat = currentInterestFilter === "all" || item.category === currentInterestFilter;
    const matchQuery = !currentInterestQuery || 
      item.title.toLowerCase().includes(currentInterestQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(currentInterestQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(currentInterestQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-neutral-500 dark:text-neutral-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-3 opacity-40"></i>
        <p class="text-sm font-medium">검색 조건에 맞는 취미/관심사 콘텐츠가 없습니다.</p>
        <p class="text-xs mt-1 text-neutral-400">필터를 전체로 변경하거나 다른 검색어를 입력해 보세요.</p>
      </div>
    `;
    refreshIcons();
    return;
  }

  container.innerHTML = filtered.map((item) => `
    <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col justify-between interactive-card">
      <div>
        <div class="flex items-center justify-between mb-3 text-xs">
          <span class="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 font-medium rounded-full text-neutral-800 dark:text-neutral-200">${item.categoryName}</span>
          <span class="text-neutral-400 font-mono">${item.date}</span>
        </div>
        <h4 class="font-semibold text-base md:text-lg text-neutral-900 dark:text-neutral-100 mb-1">${item.title}</h4>
        <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-3">${item.subtitle}</p>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">${item.summary}</p>
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${item.tags.map(t => `<span class="px-2 py-0.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 rounded text-[11px] text-neutral-600 dark:text-neutral-400">#${t}</span>`).join("")}
        </div>
      </div>
      <button onclick="openInterestModal('${item.id}')" class="w-full mt-2 py-2 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
        <span>상세 리포트 읽기</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  `).join("");

  refreshIcons();
}

function filterInterests(cat) {
  currentInterestFilter = cat;
  document.querySelectorAll("[data-interest-filter]").forEach(btn => {
    const active = btn.getAttribute("data-interest-filter") === cat;
    if (active) {
      btn.classList.add("bg-neutral-900", "text-white", "dark:bg-white", "dark:text-neutral-950");
      btn.classList.remove("bg-neutral-100", "text-neutral-700", "dark:bg-neutral-800", "dark:text-neutral-300");
    } else {
      btn.classList.remove("bg-neutral-900", "text-white", "dark:bg-white", "dark:text-neutral-950");
      btn.classList.add("bg-neutral-100", "text-neutral-700", "dark:bg-neutral-800", "dark:text-neutral-300");
    }
  });
  renderInterestsView();
}

// 5.6 MY GROWTH 렌더링 & 타임라인
let currentGrowthFilter = "all";

function getGrowthItems() {
  const local = localStorage.getItem("pj_growth_items");
  if (local) {
    try {
      const parsed = JSON.parse(local);
      return [...parsed, ...SITE_DATA.growth];
    } catch (e) {
      return SITE_DATA.growth;
    }
  }
  return SITE_DATA.growth;
}

function renderGrowthView() {
  const container = document.getElementById("growth-timeline-container");
  if (!container) return;

  const allItems = getGrowthItems();
  const filtered = allItems.filter(item => {
    return currentGrowthFilter === "all" || item.category === currentGrowthFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-neutral-500">
        <p class="text-sm font-medium">선택된 카테고리의 성장 기록이 없습니다.</p>
        <p class="text-xs mt-1 text-neutral-400">우측 상단 '새 성장 기록 추가' 버튼을 눌러 첫 기록을 작성해 보세요!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, index) => `
    <div class="relative pl-8 md:pl-10 pb-10 border-l-2 border-neutral-200 dark:border-neutral-800 last:border-0 last:pb-0">
      <div class="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-neutral-950 border-4 border-neutral-900 dark:border-white"></div>
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span class="px-2.5 py-0.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[11px] font-mono font-bold rounded">
          ${item.date}
        </span>
        <span class="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-full">
          ${item.categoryLabel || item.category}
        </span>
      </div>
      <div class="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl interactive-card">
        <h4 class="font-semibold text-base md:text-lg text-neutral-900 dark:text-neutral-100 mb-1.5">${item.title}</h4>
        <p class="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">${item.summary}</p>
        <div class="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          ${item.story}
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons();
}

function filterGrowth(cat) {
  currentGrowthFilter = cat;
  document.querySelectorAll("[data-growth-filter]").forEach(btn => {
    const active = btn.getAttribute("data-growth-filter") === cat;
    if (active) {
      btn.classList.add("bg-neutral-900", "text-white", "dark:bg-white", "dark:text-neutral-950");
      btn.classList.remove("bg-neutral-100", "text-neutral-700", "dark:bg-neutral-800", "dark:text-neutral-300");
    } else {
      btn.classList.remove("bg-neutral-900", "text-white", "dark:bg-white", "dark:text-neutral-950");
      btn.classList.add("bg-neutral-100", "text-neutral-700", "dark:bg-neutral-800", "dark:text-neutral-300");
    }
  });
  renderGrowthView();
}

// 5.7 CONTACT 폼 및 테스트 제출
function renderContactView() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      alert("모든 필수 입력 항목을 작성해 주세요.");
      return;
    }

    // 테스트 모드 안내 모달
    openGenericModal(
      "메시지 테스트 발송 완료",
      `
      <div class="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs space-y-2 mb-4">
        <p><strong>보내신 분:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>내용:</strong> ${escapeHtml(message)}</p>
      </div>
      <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
        <strong>[안내]</strong> 본 웹사이트는 『박장우 개인 웹사이트 구축 계획서』 4.7절에 따라 현재 <strong>테스트 모드</strong>로 구동 중입니다. 
        실제 메일함 전송 API 연동 전까지 데이터는 안전하게 시뮬레이션 처리됩니다.
      </p>
      `
    );
    form.reset();
  });
}

// ==========================================
// 6. 모달 팝업 제어
// ==========================================

// 봉사활동 10대 포트폴리오 모달
function openVolunteerModal(volId) {
  const vol = SITE_DATA.career.volunteers.find(v => v.id === volId);
  if (!vol) return;

  const contentHtml = `
    <div class="space-y-4 text-xs md:text-sm">
      <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <span class="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded font-medium">${vol.tag}</span>
        <span class="font-mono text-neutral-500">${vol.period}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
          <span class="text-neutral-400 block text-[11px] mb-0.5">3. 기관 및 장소</span>
          <span class="font-medium text-neutral-900 dark:text-neutral-100">${vol.institution}</span>
        </div>
        <div class="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl">
          <span class="text-neutral-400 block text-[11px] mb-0.5">5. 담당 역할</span>
          <span class="font-medium text-neutral-900 dark:text-neutral-100">${vol.role}</span>
        </div>
      </div>

      <div>
        <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">4. 활동 목적</h5>
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">${vol.purpose}</p>
      </div>

      <div>
        <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">6. 주요 활동 내용</h5>
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">${vol.description}</p>
      </div>

      <div>
        <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">7. 문제 상황 및 대응 (Problem Solving)</h5>
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">${vol.problemSolving}</p>
      </div>

      <div>
        <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">8. 배운 점 (Insights)</h5>
        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">${vol.learning}</p>
      </div>

      <div>
        <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">9. 관련 핵심 역량</h5>
        <div class="flex flex-wrap gap-1.5 mt-1">
          ${vol.competencies.map(c => `<span class="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded font-medium text-xs">${c}</span>`).join("")}
        </div>
      </div>

      <div class="p-3 bg-neutral-100/80 dark:bg-neutral-800/80 rounded-xl">
        <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">10. 전공과의 연관성 (사회복지학 실천)</h5>
        <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs">${vol.majorLink}</p>
      </div>
    </div>
  `;

  openGenericModal(vol.title, contentHtml);
}

// AI스마트워크 심층 리포트 모달
function openAiProjectModal() {
  const p = SITE_DATA.academic.featuredProject;
  const contentHtml = `
    <div class="space-y-4 text-xs md:text-sm">
      <div class="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl space-y-1">
        <div class="flex justify-between text-neutral-500 font-mono text-[11px]">
          <span>${p.period}</span>
          <span>${p.dataset}</span>
        </div>
        <p class="font-medium text-neutral-900 dark:text-neutral-100">${p.problem}</p>
      </div>

      <h5 class="font-semibold text-neutral-900 dark:text-neutral-100">핵심 실증 분석 결과</h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${p.keyFindings.map(k => `
          <div class="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span class="text-neutral-400 block text-[11px]">${k.label}</span>
            <span class="font-bold text-neutral-900 dark:text-neutral-100 block my-1">${k.stat}</span>
            <span class="text-neutral-500 text-xs">${k.desc}</span>
          </div>
        `).join("")}
      </div>

      <div class="p-4 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl">
        <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">사회복지학 및 스마트워크 융합 의의</h5>
        <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs">${p.socialWelfareMeaning}</p>
      </div>
    </div>
  `;
  openGenericModal("AI스마트워크 데이터 분석 프로젝트 상세", contentHtml);
}

// 취미/관심사 상세 모달
function openInterestModal(id) {
  const item = SITE_DATA.interests.find(i => i.id === id);
  if (!item) return;

  const contentHtml = `
    <div class="space-y-4 text-xs md:text-sm">
      <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <span class="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded font-medium">${item.categoryName}</span>
        <span class="font-mono text-neutral-400">${item.date}</span>
      </div>
      <div>
        <h5 class="font-semibold text-base text-neutral-900 dark:text-neutral-100 mb-1">${item.subtitle}</h5>
        <div class="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line mt-3">
          ${item.content.trim()}
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
        ${item.tags.map(t => `<span class="px-2 py-0.5 bg-neutral-50 dark:bg-neutral-800 rounded text-[11px] text-neutral-500">#${t}</span>`).join("")}
      </div>
    </div>
  `;
  openGenericModal(item.title, contentHtml);
}

// 새 성장 기록 등록 모달
function openAddGrowthModal() {
  const contentHtml = `
    <form id="add-growth-form" class="space-y-3 text-xs md:text-sm">
      <div>
        <label class="block font-medium mb-1">카테고리</label>
        <select id="new-growth-category" class="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs">
          <option value="ACADEMIC">학업 & 프로젝트 (ACADEMIC)</option>
          <option value="VOLUNTEER">봉사활동 (VOLUNTEER)</option>
          <option value="CAREER">진로 탐색 (CAREER)</option>
          <option value="CHALLENGE">새로운 도전 (CHALLENGE)</option>
          <option value="DAILY">일상의 성취 (DAILY)</option>
        </select>
      </div>
      <div>
        <label class="block font-medium mb-1">기록 시기 (연-월)</label>
        <input type="text" id="new-growth-date" placeholder="예: 2026-11" required class="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-mono">
      </div>
      <div>
        <label class="block font-medium mb-1">제목</label>
        <input type="text" id="new-growth-title" placeholder="도전하거나 성취한 일의 제목" required class="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs">
      </div>
      <div>
        <label class="block font-medium mb-1">한 줄 요약</label>
        <input type="text" id="new-growth-summary" placeholder="핵심 성취 요약" required class="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs">
      </div>
      <div>
        <label class="block font-medium mb-1">상세 이야기 및 배운 점</label>
        <textarea id="new-growth-story" rows="4" placeholder="어떤 도전이었으며 무엇을 배우고 느꼈나요?" required class="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"></textarea>
      </div>
      <div class="pt-2 flex justify-end gap-2">
        <button type="button" onclick="closeGenericModal()" class="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs">취소</button>
        <button type="submit" class="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl text-xs font-medium">기록 저장</button>
      </div>
    </form>
  `;

  openGenericModal("새로운 성장 기록 추가", contentHtml);

  setTimeout(() => {
    const form = document.getElementById("add-growth-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const category = document.getElementById("new-growth-category").value;
        const date = document.getElementById("new-growth-date").value.trim();
        const title = document.getElementById("new-growth-title").value.trim();
        const summary = document.getElementById("new-growth-summary").value.trim();
        const story = document.getElementById("new-growth-story").value.trim();

        const catLabels = {
          ACADEMIC: "학업 & 프로젝트",
          VOLUNTEER: "봉사활동",
          CAREER: "진로 탐색",
          CHALLENGE: "새로운 도전",
          DAILY: "일상의 성취"
        };

        const newRecord = {
          id: `custom-${Date.now()}`,
          date,
          category,
          categoryLabel: catLabels[category] || category,
          title,
          summary,
          story
        };

        const existing = JSON.parse(localStorage.getItem("pj_growth_items") || "[]");
        existing.unshift(newRecord);
        localStorage.setItem("pj_growth_items", JSON.stringify(existing));

        closeGenericModal();
        renderGrowthView();
      });
    }
  }, 100);
}

// 범용 모달 열기
function openGenericModal(title, bodyHtml) {
  const modalBackdrop = document.getElementById("generic-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  if (!modalBackdrop) return;
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHtml;

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
  refreshIcons();
}

function closeGenericModal() {
  const modalBackdrop = document.getElementById("generic-modal");
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================
// 7. 글로벌 이벤트 리스너 & 유틸
// ==========================================
function setupGlobalEvents() {
  // 모달 닫기 버튼 & 배경 클릭
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBackdrop = document.getElementById("generic-modal");

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeGenericModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeGenericModal();
    });
  }

  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeGenericModal();
  });

  // 취미 검색 인풋
  const searchInput = document.getElementById("interest-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentInterestQuery = e.target.value.trim();
      renderInterestsView();
    });
  }
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

