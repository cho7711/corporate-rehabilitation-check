(function () {
  "use strict";

  const root = document.getElementById("rg-rehab-diagnostic");
  if (!root) return;

  const questions = [
    {
      id: "u1", axis: "urgency", weight: 22,
      title: "현재 도래한 채무를 정상 영업에 큰 지장 없이 지급할 수 있습니까?",
      help: "대출 원리금, 매입대금, 임대료 등 현재 지급기일이 지난 채무를 기준으로 답해 주세요.",
      options: [[0, "대부분 정상 지급 가능"], [35, "곧 일부 지급이 어려울 수 있음"], [70, "이미 일부 지급이 어려움"], [100, "대부분 지급이 어려움"]]
    },
    {
      id: "u2", axis: "urgency", weight: 18,
      title: "금융채무·매입대금·임대료 등의 연체 상태는 어떻습니까?",
      options: [[0, "연체 없음"], [35, "1개월 미만 또는 일시적 연체"], [70, "1~3개월 연체가 반복됨"], [100, "3개월 이상 또는 다수 채무 연체"]]
    },
    {
      id: "u3", axis: "urgency", weight: 20,
      title: "독촉·가압류·압류·강제집행 또는 부도 위험이 있습니까?",
      options: [[0, "특별한 조치 없음"], [35, "독촉·내용증명 단계"], [70, "가압류·압류 또는 소송 진행"], [100, "강제집행·경매·부도 위험이 임박"]]
    },
    {
      id: "u4", axis: "urgency", weight: 18,
      title: "현재 보유 현금으로 필수 운영비를 감당할 수 있는 기간은?",
      help: "급여, 임대료, 원재료비 등 사업 유지에 꼭 필요한 지출을 기준으로 합니다.",
      options: [[0, "6개월 이상"], [35, "3~6개월"], [70, "1~3개월"], [100, "1개월 미만"]]
    },
    {
      id: "u5", axis: "urgency", weight: 12,
      title: "최근 영업현금흐름은 어떻습니까?",
      options: [[0, "안정적인 플러스"], [35, "손익분기 수준"], [70, "최근 3개월 적자·현금유출"], [100, "6개월 이상 지속적인 적자·현금유출"]]
    },
    {
      id: "u6", axis: "urgency", weight: 10,
      title: "임금·퇴직금·세금·4대보험 체납이 있습니까?",
      options: [[0, "없음"], [35, "단기 체납이 있으나 해소 가능"], [70, "1개월 이상 또는 여러 항목 체납"], [100, "장기 체납이며 자체 해소가 어려움"]]
    },
    {
      id: "v1", axis: "viability", weight: 12,
      title: "현재 핵심 사업은 어느 정도 운영되고 있습니까?",
      options: [[100, "정상 운영 중"], [75, "축소 운영 중이나 핵심 기능 유지"], [35, "최소한의 운영만 가능"], [0, "사실상 영업 중단"]]
    },
    {
      id: "v2", axis: "viability", weight: 12,
      title: "향후 매출을 뒷받침할 고객·수주·계약이 있습니까?",
      options: [[100, "안정적인 거래처와 수주가 충분함"], [70, "일부 안정적인 거래처·수주가 있음"], [30, "불확실하거나 단기 거래 위주"], [0, "뚜렷한 매출 기반이 없음"]]
    },
    {
      id: "v3", axis: "viability", weight: 16,
      title: "과도한 이자·일회성 비용을 조정하면 영업이익을 낼 수 있습니까?",
      options: [[100, "현재도 영업이익이 발생"], [75, "비용·채무 구조조정 후 가능"], [35, "아직 판단하기 어려움"], [0, "구조조정 후에도 어려울 것으로 예상"]]
    },
    {
      id: "v4", axis: "viability", weight: 10,
      title: "경영위기의 주된 원인은 개선 가능한 성격입니까?",
      help: "일시적 매출 감소, 고금리, 일회성 손실 등은 비교적 개선 가능한 원인에 가깝습니다.",
      options: [[100, "대부분 일시적이며 제거 가능"], [70, "일부는 개선 가능"], [30, "구조적 원인이 더 큼"], [0, "회복이 매우 어려운 구조적 원인"]]
    },
    {
      id: "v5", axis: "viability", weight: 10,
      title: "향후 12개월 매출·비용·자금계획이 준비되어 있습니까?",
      options: [[100, "근거자료와 함께 작성됨"], [65, "대략적인 수치계획이 있음"], [25, "구상만 있음"], [0, "준비되지 않음"]]
    },
    {
      id: "v6", axis: "viability", weight: 15,
      title: "사업을 계속할 때의 가치가 지금 청산할 때보다 높다고 예상합니까?",
      help: "영업권, 거래처, 인력, 기술, 수주잔고 등 사업 유지로 보전되는 가치도 고려합니다.",
      options: [[100, "명확히 더 높음"], [65, "더 높을 가능성이 있음"], [35, "아직 비교하지 못함"], [0, "청산가치가 더 높을 가능성이 큼"]]
    },
    {
      id: "v7", axis: "viability", weight: 10,
      title: "절차 진행과 초기 운영에 필요한 자금 조달 가능성이 있습니까?",
      options: [[100, "자금이 확보됨"], [70, "투입 가능성이 높은 자금이 있음"], [30, "협의 중이거나 불확실"], [0, "조달 가능성이 거의 없음"]]
    },
    {
      id: "v8", axis: "viability", weight: 15,
      title: "영업을 유지하면서 조정된 채무를 갚을 잉여현금을 만들 수 있습니까?",
      options: [[100, "현실적인 변제재원이 예상됨"], [65, "일부 가능하나 추가 조정 필요"], [25, "아직 산정하지 못함"], [0, "변제재원 마련이 어려움"]]
    },
    {
      id: "r1", axis: "reliability", weight: 35,
      title: "최근 재무제표·세금신고서·통장거래내역을 확보할 수 있습니까?",
      options: [[100, "최근 3개년 자료가 대부분 정리됨"], [70, "일부 누락되었으나 보완 가능"], [30, "자료가 많이 부족함"], [0, "확보가 매우 어려움"]]
    },
    {
      id: "r2", axis: "reliability", weight: 25,
      title: "채권자·채무액·담보·보증·보유자산 목록이 정리되어 있습니까?",
      options: [[100, "최신 기준으로 정리됨"], [65, "대부분 파악됨"], [30, "누락이 많음"], [0, "현재 파악이 어려움"]]
    },
    {
      id: "r3", axis: "reliability", weight: 25,
      title: "최근 특수관계인 거래·자산처분·특정 채권자 우선변제가 있었습니까?",
      help: "해당 거래가 있다는 사실만으로 절차가 불가능한 것은 아니며, 경위와 자료 확인이 중요합니다.",
      options: [[100, "없음"], [65, "있지만 정상 거래이며 자료로 설명 가능"], [25, "중요 거래가 있어 검토 필요"], [0, "은닉·유용 또는 편파변제 분쟁 우려가 큼"]]
    },
    {
      id: "r4", axis: "reliability", weight: 15,
      title: "중대한 회계오류·분식·횡령·배임 관련 문제나 분쟁이 있습니까?",
      options: [[100, "없음"], [65, "경미하거나 설명 가능한 문제"], [25, "중요 문제 또는 분쟁이 있음"], [0, "중대한 의혹이 있고 사실관계 파악이 어려움"]]
    }
  ];

  const state = { index: 0, answers: {} };

  const css = `
    #rg-rehab-diagnostic, #rg-rehab-diagnostic * { box-sizing: border-box; }
    #rg-rehab-diagnostic { --blue:#0968c9; --navy:#0d2c50; --pale:#f2f7fc; --line:#dce6f1; --text:#17283a; --muted:#68798a; font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color:var(--text); max-width:920px; margin:0 auto; }
    .rgdx-shell { background:#fff; border:1px solid var(--line); border-radius:22px; overflow:hidden; box-shadow:0 18px 48px rgba(13,44,80,.10); }
    .rgdx-head { padding:34px 38px 28px; background:linear-gradient(135deg,#0759ad,#0b78db); color:#fff; }
    .rgdx-eyebrow { margin:0 0 8px; font-size:13px; font-weight:800; letter-spacing:.08em; opacity:.82; }
    .rgdx-head h2 { margin:0 0 10px; font-size:clamp(27px,4vw,40px); line-height:1.18; letter-spacing:-.04em; color:#fff; }
    .rgdx-head p { margin:0; max-width:700px; font-size:15px; line-height:1.7; opacity:.9; }
    .rgdx-progress-wrap { padding:20px 38px 0; }
    .rgdx-progress-meta { display:flex; justify-content:space-between; gap:16px; margin-bottom:8px; color:var(--muted); font-size:13px; font-weight:700; }
    .rgdx-progress { height:8px; border-radius:99px; background:#e9f0f7; overflow:hidden; }
    .rgdx-progress span { display:block; height:100%; background:var(--blue); border-radius:inherit; transition:width .25s ease; }
    .rgdx-body { padding:32px 38px 38px; min-height:510px; }
    .rgdx-section { display:inline-flex; padding:6px 10px; margin-bottom:14px; border-radius:999px; background:#eaf4ff; color:var(--blue); font-size:12px; font-weight:800; }
    .rgdx-question { margin:0 0 10px; font-size:clamp(20px,2.6vw,26px); line-height:1.42; letter-spacing:-.03em; color:var(--navy); }
    .rgdx-help { margin:0 0 20px; color:var(--muted); font-size:14px; line-height:1.65; }
    .rgdx-options { display:grid; gap:11px; margin-top:22px; }
    .rgdx-option { display:flex; align-items:center; gap:13px; width:100%; min-height:57px; padding:14px 17px; border:1px solid var(--line); border-radius:13px; background:#fff; color:var(--text); text-align:left; font-size:15px; line-height:1.45; cursor:pointer; transition:.16s ease; }
    .rgdx-option:hover { border-color:#87b9e9; background:#f8fbff; transform:translateY(-1px); }
    .rgdx-option[aria-pressed="true"] { border-color:var(--blue); background:#eef7ff; box-shadow:0 0 0 2px rgba(9,104,201,.11); }
    .rgdx-radio { width:20px; height:20px; flex:0 0 20px; border:2px solid #aebdca; border-radius:50%; background:#fff; }
    .rgdx-option[aria-pressed="true"] .rgdx-radio { border:6px solid var(--blue); }
    .rgdx-actions { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:28px; }
    .rgdx-btn { min-height:48px; padding:0 22px; border:0; border-radius:11px; font-size:15px; font-weight:800; cursor:pointer; }
    .rgdx-btn:disabled { opacity:.42; cursor:not-allowed; }
    .rgdx-prev { background:#eef2f6; color:#46596c; }
    .rgdx-next { margin-left:auto; background:var(--blue); color:#fff; }
    .rgdx-intro { padding:38px; }
    .rgdx-intro-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:28px 0; }
    .rgdx-intro-card { padding:18px; border:1px solid var(--line); border-radius:14px; background:var(--pale); }
    .rgdx-intro-card strong { display:block; margin-bottom:6px; color:var(--navy); }
    .rgdx-intro-card span { color:var(--muted); font-size:13px; line-height:1.5; }
    .rgdx-notice { padding:14px 16px; border-left:3px solid var(--blue); background:#f5f9fd; color:#536678; font-size:13px; line-height:1.65; }
    .rgdx-start { width:100%; margin-top:20px; background:var(--blue); color:#fff; }
    .rgdx-results { padding:34px 38px 40px; }
    .rgdx-result-title { margin:0 0 8px; color:var(--navy); font-size:clamp(25px,4vw,35px); letter-spacing:-.04em; }
    .rgdx-result-copy { margin:0 0 24px; color:var(--muted); line-height:1.7; }
    .rgdx-scores { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:22px 0; }
    .rgdx-score { padding:20px; border:1px solid var(--line); border-radius:15px; background:#fff; }
    .rgdx-score span { display:block; color:var(--muted); font-size:12px; font-weight:800; }
    .rgdx-score strong { display:block; margin:8px 0 5px; color:var(--navy); font-size:26px; }
    .rgdx-score small { color:var(--muted); }
    .rgdx-panel { margin-top:14px; padding:20px; border-radius:15px; background:var(--pale); }
    .rgdx-panel h3 { margin:0 0 10px; color:var(--navy); font-size:18px; }
    .rgdx-panel ul { margin:0; padding-left:20px; color:#45596b; line-height:1.75; }
    .rgdx-low-confidence { margin-top:14px; padding:14px 16px; border-radius:12px; background:#fff4dd; color:#765211; font-size:14px; line-height:1.6; }
    .rgdx-followup { margin:22px 0 0; color:var(--navy); font-size:16px; font-weight:800; line-height:1.65; text-align:center; }
    .rgdx-cta { display:flex; gap:10px; margin-top:22px; }
    .rgdx-cta a, .rgdx-cta button { display:flex; flex:1; align-items:center; justify-content:center; min-height:52px; border-radius:11px; text-decoration:none; font-weight:800; }
    .rgdx-restart { border:1px solid var(--line); background:#fff; color:#405468; cursor:pointer; }
    .rgdx-disclaimer { margin:20px 0 0; padding:16px 18px; border-left:4px solid var(--blue); border-radius:10px; background:#eef7ff; color:var(--blue); font-size:15px; font-weight:700; line-height:1.75; }
    @media (max-width:680px) {
      .rgdx-head,.rgdx-body,.rgdx-intro,.rgdx-results { padding-left:21px; padding-right:21px; }
      .rgdx-progress-wrap { padding-left:21px; padding-right:21px; }
      .rgdx-intro-grid,.rgdx-scores { grid-template-columns:1fr; }
      .rgdx-body { min-height:540px; }
      .rgdx-option { font-size:14px; }
      .rgdx-cta { flex-direction:column; }
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function axisLabel(axis) {
    return axis === "urgency" ? "1. 위기 긴급도" : axis === "viability" ? "2. 사업 계속 가능성" : "3. 자료 신뢰도";
  }

  function renderFrame(inner) {
    root.innerHTML = `<div class="rgdx-shell"><header class="rgdx-head"><p class="rgdx-eyebrow">GOLDEN TIME CENTER</p><h2>법인회생 가능성 기초진단</h2><p>현재의 위기 수준과 사업 계속 가능성을 나누어 살펴보는 약 3분 진단입니다. 입력 내용은 저장하거나 전송하지 않습니다.</p></header>${inner}</div>`;
  }

  function renderIntro() {
    renderFrame(`<div class="rgdx-intro">
      <div class="rgdx-intro-grid">
        <div class="rgdx-intro-card"><strong>위기 긴급도</strong><span>연체·집행·자금 고갈의 시급성을 확인합니다.</span></div>
        <div class="rgdx-intro-card"><strong>계속 가능성</strong><span>사업성과 변제재원 등 회생 검토 요소를 봅니다.</span></div>
        <div class="rgdx-intro-card"><strong>자료 신뢰도</strong><span>상담과 절차 검토에 필요한 자료 상태를 점검합니다.</span></div>
      </div>
      <div class="rgdx-notice">이 진단은 법원의 회생절차 개시·인가 가능성을 판단하거나 결과를 보장하지 않습니다. 회사명, 연락처, 계좌번호 등 개인정보는 입력하지 않습니다.</div>
      <button type="button" class="rgdx-btn rgdx-start">무료 기초진단 시작</button>
    </div>`);
    root.querySelector(".rgdx-start").addEventListener("click", () => { state.index = 0; renderQuestion(); });
  }

  function renderQuestion() {
    const q = questions[state.index];
    const selected = state.answers[q.id];
    const progress = Math.round(((state.index + 1) / questions.length) * 100);
    const options = q.options.map(([value, label]) => `<button type="button" class="rgdx-option" data-value="${value}" aria-pressed="${selected === value}"><span class="rgdx-radio" aria-hidden="true"></span><span>${label}</span></button>`).join("");
    renderFrame(`<div class="rgdx-progress-wrap"><div class="rgdx-progress-meta"><span>${axisLabel(q.axis)}</span><span>${state.index + 1} / ${questions.length}</span></div><div class="rgdx-progress"><span style="width:${progress}%"></span></div></div>
      <div class="rgdx-body"><span class="rgdx-section">${axisLabel(q.axis)}</span><h3 class="rgdx-question">${q.title}</h3>${q.help ? `<p class="rgdx-help">${q.help}</p>` : ""}<div class="rgdx-options">${options}</div>
      <div class="rgdx-actions"><button type="button" class="rgdx-btn rgdx-prev" ${state.index === 0 ? "disabled" : ""}>이전</button><button type="button" class="rgdx-btn rgdx-next" ${selected === undefined ? "disabled" : ""}>${state.index === questions.length - 1 ? "결과 보기" : "다음"}</button></div></div>`);
    root.querySelectorAll(".rgdx-option").forEach((button) => {
      button.addEventListener("click", () => {
        state.answers[q.id] = Number(button.dataset.value);
        renderQuestion();
      });
    });
    root.querySelector(".rgdx-prev").addEventListener("click", () => { if (state.index > 0) { state.index -= 1; renderQuestion(); } });
    root.querySelector(".rgdx-next").addEventListener("click", () => {
      if (state.answers[q.id] === undefined) return;
      if (state.index < questions.length - 1) { state.index += 1; renderQuestion(); } else { renderResults(); }
    });
  }

  function score(axis) {
    return Math.round(questions.filter(q => q.axis === axis).reduce((sum, q) => sum + (state.answers[q.id] * q.weight / 100), 0));
  }

  function band(value, type) {
    if (type === "urgency") return value >= 65 ? "높음" : value >= 35 ? "주의" : "낮음";
    return value >= 68 ? "양호" : value >= 45 ? "추가 검토" : "낮음";
  }

  function getOutcome(u, v) {
    if (u >= 65 && v >= 68) return ["신속한 법인회생 검토가 필요합니다", "지급 압박이 큰 한편 사업 계속 가능성도 확인됩니다. 집행이 확대되기 전에 재무자료를 바탕으로 회생 신청의 실익을 검토할 단계입니다."];
    if (u >= 65 && v >= 45) return ["회생과 파산의 긴급 비교검토가 필요합니다", "위기 긴급도가 높고 일부 사업가치는 있으나 변제재원과 계속기업가치를 더 확인해야 합니다."];
    if (u >= 65) return ["청산 가능성을 포함한 긴급 종합검토가 필요합니다", "지급 압박은 매우 크지만 현재 답변만으로는 사업 계속 가능성이 낮게 나타납니다. 회생만 단정하지 말고 파산·자산보전까지 함께 검토해야 합니다."];
    if (u >= 35 && v >= 68) return ["선제적인 구조조정·회생 검토가 적절합니다", "사업 계속 가능성은 비교적 양호하지만 재무위험이 커지고 있습니다. 위기가 급격히 악화되기 전에 자금계획과 채무조정 방안을 마련할 필요가 있습니다."];
    if (u >= 35 && v >= 45) return ["자료를 보완해 회생 실익을 검토할 단계입니다", "일부 위기 신호와 사업가치가 함께 확인됩니다. 숫자에 근거한 현금흐름과 청산가치·계속기업가치 비교가 필요합니다."];
    if (u >= 35) return ["채무조정과 청산 가능성을 함께 비교해야 합니다", "재무위험은 나타나지만 회생계획 수행 가능성이 충분히 확인되지 않습니다. 추가 손실을 막는 방향까지 포함해 검토해야 합니다."];
    if (v >= 68) return ["현재는 예방적 정상화가 우선입니다", "법원 회생절차의 긴급성은 낮게 나타납니다. 양호한 사업가치를 유지하면서 자금계획과 채무구조를 선제적으로 관리하는 것이 좋습니다."];
    return ["현재 정보상 법인회생의 긴급도는 낮습니다", "즉시 회생절차를 검토할 신호는 제한적입니다. 다만 사업성 저하가 계속되면 경영개선 또는 정리 방향을 별도로 점검할 필요가 있습니다."];
  }

  function topSignals(axis, highIsRisk) {
    return questions.filter(q => q.axis === axis).map(q => ({ q, value: state.answers[q.id] })).sort((a, b) => highIsRisk ? b.value - a.value : a.value - b.value).slice(0, 3).map(x => x.q.title.replace(/[?？]$/, ""));
  }

  function renderResults() {
    const u = score("urgency"), v = score("viability"), r = score("reliability");
    const [title, copy] = getOutcome(u, v);
    const signals = topSignals("urgency", true);
    const viabilityItems = topSignals("viability", v >= 68);
    const viabilityTitle = v >= 68 ? "긍정적으로 나타난 사업 계속 요소" : "상담 전 보완할 핵심 항목";
    renderFrame(`<div class="rgdx-results"><span class="rgdx-section">기초진단 결과</span><h3 class="rgdx-result-title">${title}</h3><p class="rgdx-result-copy">${copy}</p>
      <div class="rgdx-scores">
        <div class="rgdx-score"><span>위기 긴급도</span><strong>${u}점</strong><small>${band(u,"urgency")}</small></div>
        <div class="rgdx-score"><span>사업 계속 가능성</span><strong>${v}점</strong><small>${band(v,"viability")}</small></div>
        <div class="rgdx-score"><span>자료 신뢰도</span><strong>${r}점</strong><small>${band(r,"reliability")}</small></div>
      </div>
      <div class="rgdx-panel"><h3>우선 확인할 위기 신호</h3><ul>${signals.map(x => `<li>${x}</li>`).join("")}</ul></div>
      <div class="rgdx-panel"><h3>${viabilityTitle}</h3><ul>${viabilityItems.map(x => `<li>${x}</li>`).join("")}</ul></div>
      ${r < 40 ? `<div class="rgdx-low-confidence"><strong>자료 신뢰도가 낮습니다.</strong><br>현재 결과의 정확도가 제한될 수 있으므로 재무제표, 세금신고자료, 채권자·자산 목록을 먼저 확보해 주세요.</div>` : ""}
      <p class="rgdx-followup">아래 상담문의를 통해 보다 정확한 진단을 받아보세요.</p>
      <div class="rgdx-cta"><button type="button" class="rgdx-restart">다시 진단하기</button></div>
      <p class="rgdx-disclaimer">본 결과는 입력된 제한적 정보를 기초로 한 일반 안내입니다. 법원의 회생절차 개시·인가 여부, 채무조정 가능 범위 또는 사건 결과를 보장하지 않으며, 구체적인 법률·회계 검토를 대체하지 않습니다. 입력값은 이 페이지에서 저장하거나 외부로 전송하지 않습니다.</p>
    </div>`);
    root.querySelector(".rgdx-restart").addEventListener("click", () => { state.index = 0; state.answers = {}; renderIntro(); });
  }

  renderIntro();
})();
