const fs = require("fs");
const path = require("path");

const indexPath = "/home/tomkim/my-portfolio/pj01/index.html";
let html = fs.readFileSync(indexPath, "utf8");

const advisors100 = JSON.parse(fs.readFileSync("/home/tomkim/my-portfolio/pj01/advisors_100_data.json", "utf8"));

// 1. Add CSS for page-btn, scenario quick buttons, and distinct gray placeholder/sample styling
const cssToAdd = `
    /* Explicit Distinguishable Styling for Placeholders and Sample Examples (Gray vs White) */
    ::placeholder {
      color: #64748b !important;
      font-style: italic !important;
      opacity: 0.9 !important;
    }
    ::-webkit-input-placeholder {
      color: #64748b !important;
      font-style: italic !important;
      opacity: 0.9 !important;
    }
    ::-moz-placeholder {
      color: #64748b !important;
      font-style: italic !important;
      opacity: 0.9 !important;
    }
    :-ms-input-placeholder {
      color: #64748b !important;
      font-style: italic !important;
      opacity: 0.9 !important;
    }

    /* Actual User Input Color: Crisp Bright White */
    input[type="text"], input[type="number"], input[type="email"], input[type="date"], select, textarea {
      color: #ffffff !important;
      font-weight: 500;
    }

    /* Sample Hint / Example Captions in Clear Slate Gray */
    .sample-hint, .example-text, .hint-text {
      color: #64748b !important;
      font-size: 0.76rem;
      font-style: normal;
    }

    /* Pagination Buttons */
    .page-btn {
      padding: 7px 13px;
      background: rgba(30, 41, 59, 0.9);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }
    .page-btn:hover:not(:disabled) {
      background: rgba(99, 102, 241, 0.35);
      color: #ffffff;
      border-color: #818cf8;
      transform: translateY(-1px);
    }
    .page-btn.active {
      background: #6366f1;
      color: #ffffff;
      font-weight: 700;
      border-color: #a5b4fc;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
    .page-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    /* Scenario Quick Buttons */
    .btn-scenario {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: #c7d2fe;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.78rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-scenario:hover {
      background: rgba(99, 102, 241, 0.3);
      color: #ffffff;
      border-color: #818cf8;
    }
`;

if (!html.includes(".sample-hint")) {
  html = html.replace("/* Selected Category Chips */", cssToAdd + "\n    /* Selected Category Chips */");
}

// 2. Tab 2 and Tab 5 HTML construction
const tab2OldPattern = /<!-- Live Search Result Count & Sort Controls Bar -->[\s\S]*?<!-- 3\. 커뮤니케이션/m;
if (tab2OldPattern.test(html)) {
  html = html.replace(tab2OldPattern, `<!-- Live Search Result Count & Sort Controls Bar -->
        <div id="searchResultNotice" style="margin-bottom: 18px; padding: 14px 18px; background-color: rgba(30, 41, 59, 0.85); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: 10px; color: #cbd5e1; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div>
            <span>📊 시니어 어드바이저 DB: <strong id="totalDbCount" style="color: #818cf8;">100</strong>명 연동 완료</span>
            <span style="margin: 0 8px; color: #475569;">|</span>
            <span>매칭 결과: <strong id="matchedAdvisorCount" style="color: #34d399; font-size: 1.05rem;">100</strong>명</span>
            <span style="font-size: 0.8rem; color: #94a3b8; margin-left: 6px;">(페이지 <span id="currentPageNum" style="color:#ffffff; font-weight:bold;">1</span> / <span id="totalPageNum" style="color:#ffffff; font-weight:bold;">10</span>)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <label for="sortSelect" style="margin: 0; font-size: 0.82rem; color: #94a3b8; font-weight: normal;">정렬 기준:</label>
            <select id="sortSelect" onchange="filterAdvisors()" style="width: auto; padding: 6px 12px; font-size: 0.82rem; background: var(--input-bg); border: 1px solid var(--input-border); border-radius: 6px; color: var(--text-main);">
              <option value="recommend">⭐ 추천순 (기본)</option>
              <option value="expDesc">🏆 경력 연차 높은순</option>
              <option value="ratingDesc">★ 평점 높은순</option>
              <option value="reviewDesc">💬 리뷰 많은순</option>
            </select>
          </div>
        </div>

        <!-- Advisor Results List (Rendered dynamically from 100 database) -->
        <div class="advisor-list" id="advisorList"></div>

        <!-- Dynamic Pagination Navigation -->
        <div id="paginationNav" style="display: flex; justify-content: center; align-items: center; gap: 6px; margin-top: 24px; flex-wrap: wrap;"></div>
      </div>
    </section>

    <!-- 3. 커뮤니케이션`);
}

// Replace Tab 5 HTML with complete Standard Contract & 4 Measurable Metrics & Distinct Gray Sample Styling
const tab5OldPattern = /<!-- 5\. 계약 & AI분쟁조정[\s\S]*?<\/section>/m;

const tab5NewContent = `<!-- 5. 계약 & AI분쟁조정 (어드바이저 표준 전자계약서) -->
    <section id="tab-contract" class="tab-content">
      <!-- 스마트 표준 전자계약서 작성 카드 -->
      <div class="card">
        <div class="card-title">📑 시니어 어드바이저 표준 전자계약서 (정량 측정 가능 과업 기준 & 에스크로)</div>
        
        <div style="background-color: #0f172a; border: 1px solid var(--card-border); padding: 22px; border-radius: 12px; margin-bottom: 24px;">
          
          <!-- [1] 계약 체결 당사자 식별 정보 -->
          <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95)); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 10px; padding: 16px 20px; margin-bottom: 22px;">
            <h5 style="color: #93c5fd; font-size: 0.95rem; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <span>👤 계약 체결 당사자 정보 (프라이버시 분리 검증)</span>
              <span style="font-size: 0.75rem; background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); padding: 3px 10px; border-radius: 6px; font-weight: 600;">
                ✓ 법적 실명 서명 적용 (시스템 미공개)
              </span>
            </h5>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; font-size: 0.86rem;">
              <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <span style="color: #94a3b8; display: block; margin-bottom: 4px; font-weight: 600;">[갑] 자문 의뢰 발주처 (고객사):</span>
                <strong style="color: #ffffff;">(주)테크솔루션앤파트너스</strong>
                <div style="color: #64748b; font-size: 0.78rem; margin-top: 2px;">사업자등록번호: 120-88-92813 | 대표: 홍원택</div>
                <div style="color: #94a3b8; font-size: 0.78rem; margin-top: 2px;">연락처: 02-555-8901 / contact@techsolution.kr</div>
              </div>
              <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <span style="color: #94a3b8; display: block; margin-bottom: 4px; font-weight: 600;">[을] 자문 제공자 (어드바이저):</span>
                <div>
                  <strong style="color: #ffffff;" id="contractAdvRealName">김철수</strong> 
                  <span style="color: #f87171; font-size: 0.76rem; font-weight: 600;">[🔒 법적 실명]</span>
                  <span style="color: #94a3b8; margin: 0 4px;">/</span>
                  <span style="color: #34d399; font-weight: 600;" id="contractAdvNickname">새벽공기 수석 어드바이저</span>
                </div>
                <div style="margin-top: 4px; font-family: monospace; font-size: 0.78rem; color: #38bdf8; word-break: break-all;">
                  UUID: <span id="contractAdvUUID">6059dc9c-a2e2-5dfb-bb0b-db398d0b7b1d</span> (<span id="contractAdvShortId">Adv-6059</span>)
                </div>
                <div style="margin-top: 2px; color: #cbd5e1; font-size: 0.78rem;">
                  연락처/이메일: <span id="contractAdvContact">010-1234-5678 / advisor.kim@domain.com</span>
                </div>
              </div>
            </div>
          </div>

          <!-- [2] 4대 정량적 계약 조건 설정기 (전체기간, 투입시간/단가, 정기산출물주기, 최종산출물분량) -->
          <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 10px; padding: 18px 20px; margin-bottom: 22px;">
            <h5 style="color: #60a5fa; font-size: 0.95rem; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <span>🔢 4대 정량적 계약 조건 및 금액 산정 (숫자로 측정 가능한 기준 명시)</span>
              <span style="font-size: 0.76rem; color: #94a3b8;">* 변경 시 표준계약서 전문과 에스크로 예치액이 실시간 자동 연동됩니다.</span>
            </h5>
            
            <div class="form-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
              
              <!-- 1. 전체 과업 계약 기간 (시작일과 종료일) -->
              <div style="grid-column: 1 / -1; background: rgba(0, 0, 0, 0.25); padding: 14px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <label style="font-size: 0.88rem; color: #93c5fd; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                  <span>📅 1. 전체 과업 계약 기간 (시작일과 종료일)</span><span class="req">*</span>
                </label>
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                  <div style="flex: 1; min-width: 170px;">
                    <span style="font-size: 0.76rem; color: #94a3b8; display: block; margin-bottom: 3px;">과업 시작일:</span>
                    <input type="date" id="contractStartDate" value="2026-08-15" onchange="calcContractMetrics()" style="width: 100%; background: var(--input-bg); border: 1px solid var(--input-border); color: #ffffff; padding: 8px 12px; border-radius: 6px; font-family: inherit;">
                  </div>
                  <span style="color: #64748b; font-weight: bold; margin-top: 18px;">~</span>
                  <div style="flex: 1; min-width: 170px;">
                    <span style="font-size: 0.76rem; color: #94a3b8; display: block; margin-bottom: 3px;">과업 종료일:</span>
                    <input type="date" id="contractEndDate" value="2026-09-14" onchange="calcContractMetrics()" style="width: 100%; background: var(--input-bg); border: 1px solid var(--input-border); color: #ffffff; padding: 8px 12px; border-radius: 6px; font-family: inherit;">
                  </div>
                  <div style="margin-top: 18px; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); padding: 8px 14px; border-radius: 6px; color: #93c5fd; font-size: 0.82rem; font-weight: 600; white-space: nowrap;">
                    ⏱️ 총 과업 기간: <span id="contractDurationDays" style="color: #ffffff;">31일간 (약 4주)</span>
                  </div>
                </div>
                <span class="sample-hint" style="color: #64748b; font-size: 0.74rem; margin-top: 6px; display: block;">(예시: 1개월 30~31일 표준 과업 기간 산정)</span>
              </div>

              <!-- 2-1. 총 산정 투입시간 -->
              <div>
                <label for="contractHours" style="font-size: 0.85rem;">2-1. 총 산정 투입시간<span class="req">*</span></label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="number" id="contractHours" value="40" min="1" step="1" oninput="calcContractMetrics()" style="flex:1;">
                  <span style="color:#94a3b8; font-weight:600; white-space:nowrap;">시간</span>
                </div>
                <span class="sample-hint" style="color: #64748b; font-size: 0.74rem; margin-top: 4px; display: block;">(예시: 주 10시간 × 4주 과업)</span>
              </div>

              <!-- 2-2. 시간당 자문 단가 -->
              <div>
                <label for="contractRate" style="font-size: 0.85rem;">2-2. 시간당 자문 단가<span class="req">*</span></label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="number" id="contractRate" value="150000" min="10000" step="10000" oninput="calcContractMetrics()" style="flex:1;">
                  <span style="color:#94a3b8; font-weight:600; white-space:nowrap;">원/시간</span>
                </div>
                <span class="sample-hint" style="color: #64748b; font-size: 0.74rem; margin-top: 4px; display: block;">(예시: 시니어 전문가 표준 단가)</span>
              </div>

              <!-- 3. 정기 산출물 제출 주기 (일단위, 주단위, 격주단위, 월단위) -->
              <div>
                <label for="regularDeliverableFreq" style="font-size: 0.85rem;">3. 정기 산출물 제출 주기<span class="req">*</span></label>
                <select id="regularDeliverableFreq" onchange="calcContractMetrics()" style="width: 100%; padding: 10px 12px; background: var(--input-bg); border: 1px solid var(--input-border); border-radius: 6px; color: #ffffff; font-weight: 500;">
                  <option value="일단위">일단위 (Daily - 일일 업무 로그 & 진행 점검)</option>
                  <option value="주단위" selected>주단위 (Weekly - 주간 진척 보고서 & 정기 회의) [기본]</option>
                  <option value="격주단위">격주단위 (Bi-weekly - 2주 단위 중간 산출물 보고)</option>
                  <option value="월단위">월단위 (Monthly - 월간 마일스톤 종합 보고)</option>
                </select>
                <span class="sample-hint" style="color: #64748b; font-size: 0.74rem; margin-top: 4px; display: block;">(예시: 주간 보고서 제출 및 화상 회의 진행)</span>
              </div>

              <!-- 4. 최종 산출물 분량 (보고서 형식 및 총 페이지 수) -->
              <div>
                <label for="reportPages" style="font-size: 0.85rem;">4. 최종 산출물 분량<span class="req">*</span></label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="number" id="reportPages" value="30" min="5" step="1" oninput="calcContractMetrics()" style="flex:1;">
                  <span style="color:#94a3b8; font-weight:600; white-space:nowrap;">페이지 이상</span>
                </div>
                <span class="sample-hint" style="color: #64748b; font-size: 0.74rem; margin-top: 4px; display: block;">(예시: 최종 보고서 30페이지 이상 PDF)</span>
              </div>
            </div>

            <!-- Total Amount Calculation Box -->
            <div style="margin-top: 16px; padding: 12px 16px; background: rgba(0, 0, 0, 0.4); border-radius: 8px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; border: 1px dashed rgba(52, 211, 153, 0.4);">
              <span style="font-size: 0.9rem; color: #cbd5e1;">
                💰 산정된 총 계약 대금 (에스크로 예치액): 
                <strong style="color: #94a3b8; font-size: 0.85rem;">(<span id="calcFormula">40시간 × 150,000원</span>)</strong>
              </span>
              <span id="totalContractPriceText" style="color: #34d399; font-weight: 700; font-size: 1.25rem;">6,000,000 원</span>
            </div>
          </div>

          <!-- [3] 시니어 어드바이저 표준계약서 전문 문서 (Standard Agreement Document) -->
          <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; padding: 22px 24px; margin-bottom: 22px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);">
            <div style="text-align: center; margin-bottom: 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 12px;">
              <h4 style="color: #ffffff; font-size: 1.15rem; margin: 0 0 6px 0; font-weight: 700;">시니어 어드바이저 자문 표준계약서</h4>
              <span style="font-size: 0.8rem; color: #94a3b8;">(Standard Advisory & Escrow Agreement)</span>
            </div>

            <div style="font-size: 0.86rem; color: #cbd5e1; line-height: 1.85; max-height: 400px; overflow-y: auto; padding-right: 10px;">
              <p><strong>발주처 (주)테크솔루션앤파트너스</strong>(이하 "갑"이라 한다)와 <strong>자문 제공자 <span id="docAdvRealName">김철수</span></strong>(활동명: <span id="docAdvNickname">새벽공기 수석 어드바이저</span>, 이하 "을"이라 한다)는 상호 신의성실의 원칙에 따라 다음과 같이 시니어 자문 계약을 체결한다.</p>

              <h5 style="color: #93c5fd; margin: 14px 0 4px 0;">제1조 (목적 및 자문 범위)</h5>
              <p>본 계약은 "갑"의 사업 및 기술 과제에 관하여 "을"의 전문 도메인 지식과 실무 노하우를 바탕으로 전략 수립, 아키텍처 검토 및 기술 분석 자문을 제공함을 목적으로 한다.</p>

              <h5 style="color: #93c5fd; margin: 14px 0 4px 0;">제2조 (과업 전체 기간 및 정기 산출물 제출 주기)</h5>
              <p>
                1. 본 계약의 전체 과업 기간은 <strong><span id="docPeriod" style="color: #38bdf8; font-weight: 600;">2026-08-15 ~ 2026-09-14 (총 31일간)</span></strong>으로 정한다.<br>
                2. "을"은 과업 기간 동안 <strong><span id="docDeliverableFreq" style="color: #34d399; font-weight: 600;">주단위 (Weekly - 주간 보고서 & 정기 화상회의)</span></strong>로 정기 산출물 및 회의를 시스템을 통해 성실히 제출/이행하여야 한다.<br>
                3. 정기 회의 일정은 시스템 내 상호 협의 캘린더를 통해 최소 3일 전 확정하며, 회당 60분~90분 진행을 원칙으로 한다.
              </p>

              <h5 style="color: #93c5fd; margin: 14px 0 4px 0;">제3조 (시스템 기반 공식 커뮤니케이션 원칙)</h5>
              <p>
                1. 본 계약과 관련된 모든 보고서, 분석 도면, 소스코드 등 일체의 산출물 파일 전달은 <strong>반드시 본 플랫폼 시스템 상에서 수행</strong>하여야 한다.<br>
                2. 일상 업무 협의 및 질의응답은 <strong>시스템 채팅(텍스트 및 음성 녹음), 화상회의 룸</strong>을 통하여 진행하며, 시스템 상에 모든 데이터와 회의록이 암호화되어 자동 기록된다.
              </p>

              <h5 style="color: #f87171; margin: 14px 0 4px 0;">제4조 (AI 분쟁조정 Agent 판단 근거의 단일성)</h5>
              <p>
                1. 향후 계약 불이행, 일정 지연, 결과물 퀄리티 이견 등 당사자 간 분쟁이 발생할 경우, <strong>AI 분쟁조정 Agent는 "본 시스템 상에 공식 기록된 자료(전달 파일, 채팅 로그, 음성/화상회의 데이터 및 타임스탬프)"만을 유일하고 객관적인 근거 자료로 활용하여 과업 이행 여부를 판단하고 중재안을 결정</strong>한다.<br>
                2. 시스템 외부(사적 전화, 개인 메신저 등)에서 이루어진 구두 협의나 미등록 산출물은 분쟁 조정 시 공식 효력을 인정받지 아니한다.
              </p>

              <h5 style="color: #93c5fd; margin: 14px 0 4px 0;">제5조 (계약 대금 및 정량적 산정 기준)</h5>
              <p>
                1. 본 계약의 총 자문 대금은 <strong>총 산정 투입시간(<span id="docHours">40</span>시간) × 시간당 단가(<span id="docRate">150,000</span>원) = 총 <span id="docPrice">6,000,000</span>원(VAT 별도)</strong>으로 명확히 산정한다.<br>
                2. "갑"은 계약 체결과 동시에 총 대금을 플랫폼 에스크로 계좌에 100% 안전 예치하여 "을"의 정산 안전성을 보장한다.
              </p>

              <h5 style="color: #93c5fd; margin: 14px 0 4px 0;">제6조 (최종 산출물 제출 및 정량적 측정 기준)</h5>
              <p>
                1. "을"이 "갑"에게 제출하는 최종 자문 산출물은 <strong>공식 자문 보고서 형식</strong>으로 작성하며, 그 분량은 <strong>총 <span id="docPages">30</span>페이지 이상(요약본, 분석 본문, 아키텍처 다이어그램 및 세부 권고사항 명세서 포함)</strong>으로 명확히 수치화하여 측정한다.<br>
                2. 최종 산출물은 과업 종료일 3영업일 전까지 시스템을 통해 전자문서(PDF)로 제출되어야 한다.
              </p>

              <h5 style="color: #93c5fd; margin: 14px 0 4px 0;">제7조 (검수 승인 및 에스크로 정산 지급)</h5>
              <p>
                1. "갑"은 최종 산출물 수령 후 5영업일 이내에 제2조(과업 기간 및 정기 산출물 이행) 및 제6조(최종 보고서 총 페이지 수 및 과업 내용)에 부합하는지 정량 검수를 진행한다.<br>
                2. "갑"의 검수 승인 완료 시 에스크로 락업이 즉시 해제되어 "을"에게 대금이 정산 지급된다.
              </p>

              <h5 style="color: #93c5fd; margin: 14px 0 4px 0;">제8조 (비밀유지 및 프라이버시 보호)</h5>
              <p>
                1. 양 당사자는 자문 과정에서 취득한 일체의 기술 및 영업비밀을 외부에 유출하지 아니한다.<br>
                2. "을"의 법적 실명과 연락처는 전자계약 체결 및 에스크로 정산에만 법적 효력으로 사용되며, 플랫폼 활동 화면에는 식별코드(UUID)로 철저히 보호된다.
              </p>
            </div>
          </div>

          <!-- [4] [별첨] 특수 합의 사항 (표준계약서 제일 뒷편에 별도 배치) -->
          <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 10px; padding: 18px 20px; margin-bottom: 22px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
              <h5 style="color: #c4b5fd; font-size: 0.95rem; margin: 0; display: flex; align-items: center; gap: 6px;">
                <span>⚖️ [별첨] 특수 합의 사항 (Special Addendum Terms)</span>
              </h5>
              <span style="font-size: 0.75rem; background: rgba(139, 92, 246, 0.2); color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.4); padding: 3px 8px; border-radius: 6px;">
                표준계약서 후면 별도 합의 조항
              </span>
            </div>

            <p style="font-size: 0.84rem; color: #94a3b8; margin-bottom: 12px; line-height: 1.5;">
              표준계약서 외에 당사자 간 1:1로 별도 협의된 <strong>개별 특수 요구사항(지식재산권 완전 귀속, 추가 무상 A/S 자문 횟수, 성과 보너스 등)</strong>을 입력하세요. <strong>AI 법률 어드바이저</strong>가 검토하여 법적 효력을 갖춘 특수조항으로 정제합니다.
            </p>

            <textarea id="specialTermsInput" rows="3" placeholder="[입력 예시 - 회색]&#10;1. 자문 결과물에 포함된 아키텍처 다이어그램 및 소스코드의 지식재산권은 고객사에 완전 귀속된다.&#10;2. 자문 완료 후 3개월 이내 발생한 과업 범위 내 기술 문의에 대하여 2회에 한해 추가 무상 서면 A/S 자문을 이행한다." style="width:100%; padding:12px; background-color:var(--input-bg); border:1px solid var(--input-border); border-radius:8px; color:#ffffff; font-family:inherit; font-size:0.9rem;"></textarea>
            <span class="sample-hint" style="color: #64748b; font-size: 0.76rem; margin-top: 5px; display: block;">* 위 회색 안내문은 샘플 예시(Placeholder)입니다. 직접 입력하시면 선명한 흰색으로 표시됩니다.</span>

            <div style="display: flex; gap: 12px; margin-top: 14px; flex-wrap: wrap;">
              <button type="button" class="btn-action-call" style="background-color: #8b5cf6;" onclick="reviewSpecialTermsAI()">🤖 AI 법률 어드바이저 리뷰 & 특수조항 정제</button>
              <button type="button" class="btn-submit" style="flex: 1; min-width: 220px;" onclick="createContract()">📝 전자 서명 및 에스크로 100% 안전 예치</button>
            </div>

            <!-- AI Legal Review Output Box -->
            <div id="aiLegalOutput" style="display: none; margin-top: 16px; padding: 16px; background-color: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 8px;">
              <h5 style="color: #c4b5fd; margin-bottom: 6px; font-size: 0.92rem;">🤖 AI 법률 어드바이저 검토 및 정제 완료된 [별첨 특수조항]:</h5>
              <div id="aiLegalText" style="font-size: 0.86rem; color: #e9d5ff; line-height: 1.6;"></div>
            </div>
          </div>

          <!-- [5] 스마트 전자계약 체결 증명서 (Final Verified Certificate) -->
          <div id="finalContractResult" style="display: none; margin-top: 22px; padding: 22px; background-color: rgba(16, 185, 129, 0.08); border: 1px solid rgba(52, 211, 153, 0.45); border-radius: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
              <span style="font-size: 1.05rem; font-weight: 700; color: #34d399; display: flex; align-items: center; gap: 6px;">
                <span>✅</span> 스마트 전자계약 체결 완료 및 에스크로 100% 안전 예치 증명서
              </span>
              <span style="font-size: 0.78rem; background: #065f46; color: #a7f3d0; padding: 4px 10px; border-radius: 6px; font-weight: 600;">
                SHA-256 전자서명 무결성 검증 완료 (Verified)
              </span>
            </div>
            
            <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.8; background: rgba(0,0,0,0.3); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
              • <strong>계약 관리 번호:</strong> <code style="color: #38bdf8; font-weight:bold;" id="signedContractId">SC-20260814-7A9B</code><br>
              • <strong>발주처 [갑]:</strong> (주)테크솔루션앤파트너스 (대표: 홍원택)<br>
              • <strong>자문인 [을]:</strong> <span id="signedAdvRealName" style="font-weight:600; color:#ffffff;">김철수</span> (고유 UUID: <code id="signedAdvUUID" style="color:#a5b4fc;">6059dc9c-a2e2-5dfb-bb0b-db398d0b7b1d</code>)<br>
              • <strong>시스템 활동 닉네임:</strong> <span id="signedAdvNickname" style="color:#34d399; font-weight:600;">새벽공기 수석 어드바이저</span><br>
              • <strong>1. 전체 과업 기간:</strong> <span id="signedPeriod" style="color:#38bdf8; font-weight:bold;">2026-08-15 ~ 2026-09-14 (총 31일간)</span><br>
              • <strong>2. 총 투입시간 및 단가:</strong> 총 <span id="signedHours" style="color:#60a5fa; font-weight:bold;">40</span>시간 투입 (시간당 <span id="signedRate">150,000</span>원) | 총 에스크로 예치금 <span id="signedPrice" style="color: #34d399; font-weight: 700;">6,000,000 원</span><br>
              • <strong>3. 정기 산출물 제출 주기:</strong> <span id="signedFreq" style="color:#a7f3d0; font-weight:600;">주단위 (주간 진척 보고서 및 온라인 회의)</span><br>
              • <strong>4. 최종 산출물 분량:</strong> 총 <span id="signedPages" style="color:#34d399; font-weight:bold;">30</span>페이지 이상 (공식 PDF 자문 보고서 및 설계 명세서)<br>
              • <strong>적용 계약서:</strong> 시니어 어드바이저 표준계약서 (제1조~제8조) + [별첨 특수합의사항]<br>
              • <strong>전자서명 해시 검증값:</strong> <code style="color: #93c5fd; font-size:0.8rem;" id="signedHashSeal">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code>
            </div>
          </div>

        </div>
      </div>

      <!-- AI 가이드 챗봇 분쟁조정 -->
      <div class="card">
        <div class="card-title">🤖 AI 가이드 챗봇 분쟁조정 (Dispute Resolution Guide)</div>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
          자문 계약 수행 중 불이행, 일정 지연, 보고서 페이지 수 미달 등 분쟁 발생 시 <strong>AI 분쟁조정 Agent가 개입</strong>하여 <strong>표준계약서 4대 정량 조건(과업 기간, 투입시간/단가, 정기 산출물 주기, 최종 보고서 분량) 및 시스템 기록</strong>만을 객관적 근거로 분석하고 공정한 중재안을 제시합니다.
        </p>

        <!-- Quick Scenario Simulation Buttons -->
        <div style="display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
          <span style="font-size: 0.8rem; color: #94a3b8; display: flex; align-items: center;">빠른 시나리오 테스트:</span>
          <button type="button" class="btn-scenario" onclick="runDisputeScenario(1)">📄 시나리오 1: 최종 산출물 분량 미달 (15p 제출)</button>
          <button type="button" class="btn-scenario" onclick="runDisputeScenario(2)">📅 시나리오 2: 정기 산출물 제출 1회 누락</button>
          <button type="button" class="btn-scenario" onclick="runDisputeScenario(3)">⏰ 시나리오 3: 과업 종료일 초과 지연 분쟁</button>
          <button type="button" class="btn-scenario" onclick="runDisputeScenario(4)">📱 시나리오 4: 사적 메신저 구두 합의 분쟁</button>
          <button type="button" class="btn-scenario" onclick="runDisputeScenario(5)">⚖️ 시나리오 5: 별첨 A/S 무상 자문 이행</button>
        </div>

        <div class="chat-box" style="height: 380px;">
          <div class="chat-messages" id="disputeChatMessages">
            <div class="chat-msg msg-received" style="background-color: #1e1b4b; border: 1px solid #4338ca;">
              <strong>🤖 AI 분쟁조정 가이드:</strong> 안녕하세요! 시니어 어드바이저 AI 분쟁조정 Agent입니다. 표준계약서(제4조)에 의거하여 시스템 내 공식 데이터(전체 과업 기간, 정기 산출물 제출 로그, 최종 보고서 페이지 수 실측치, 시스템 채팅 이력)만을 바탕으로 공정한 중재안을 제시합니다. 분쟁 사안을 입력하시거나 상단 시나리오 버튼을 클릭해 주세요.
            </div>
          </div>
          <div class="chat-input-area">
            <input type="text" id="disputeChatInput" placeholder="분쟁 관련 내용을 입력하세요 (예: 과업 기간이 종료되었으나 최종 산출물이 미제출되었습니다)..." onkeypress="if(event.key==='Enter') sendDisputeMsg()">
            <button class="btn-action-msg" style="background-color: #6366f1;" onclick="sendDisputeMsg()">분쟁조정 신청</button>
          </div>
        </div>
      </div>
    </section>`;

if (tab5OldPattern.test(html)) {
  html = html.replace(tab5OldPattern, tab5NewContent);
}

// 3. Extract the clean top part of script up to before '// SHA-256 Hash Function' or similar
const scriptTagIndex = html.indexOf("<script>");
const scriptPreData = html.substring(0, scriptTagIndex + 8);

const scriptPostData = `
    // 100 Senior Advisor Seed Database
    const ADVISOR_DATABASE = ${JSON.stringify(advisors100, null, 2)};

    let advisorDatabase = [...ADVISOR_DATABASE];
    let filteredAdvisors = [...advisorDatabase];
    let currentPage = 1;
    const pageSize = 10;

    // Current Registered Advisor State (Privacy-preserving Profile)
    var currentAdvisorProfile = {
      realName: advisorDatabase[0].realName,
      nickname: advisorDatabase[0].nickname,
      email: advisorDatabase[0].email,
      phone: advisorDatabase[0].phone,
      uuid: advisorDatabase[0].uuid,
      shortId: advisorDatabase[0].shortId
    };

    // Category and Keyword Selection State for Registration
    var selectedCategoryList = [];
    var selectedKeywordList = [];

    // Global Tab Switching Function
    function switchTab(tabId, btnElement) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      if (btnElement) {
        btnElement.classList.add('active');
      } else {
        var targetBtn = document.querySelector('.tab-btn[onclick*="' + tabId + '"]');
        if (targetBtn) targetBtn.classList.add('active');
      }
      
      var targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    }

    // 2. 전문분야 Category Selection
    function handleMainCategorySelect() {
      var select = document.getElementById('mainIndustrySelect');
      var val = select.value;
      var etcDiv = document.getElementById('etcCategoryDiv');
      if (val === 'etc') {
        etcDiv.style.display = 'block';
        document.getElementById('etcCategoryInput').focus();
      } else {
        etcDiv.style.display = 'none';
      }
    }

    function addCategoryFromSelect() {
      var select = document.getElementById('mainIndustrySelect');
      var val = select.value;
      if (!val) {
        alert('전문분야를 선택해 주세요.');
        return;
      }
      if (val === 'etc') {
        addCustomCategory();
        return;
      }
      addCategoryChip(val);
      select.selectedIndex = 0;
    }

    function addCustomCategory() {
      var input = document.getElementById('etcCategoryInput');
      var val = input.value.trim();
      if (!val) {
        alert('기타 전문분야 명칭을 입력해 주세요.');
        input.focus();
        return;
      }
      addCategoryChip(val);
      input.value = '';
      document.getElementById('etcCategoryDiv').style.display = 'none';
      document.getElementById('mainIndustrySelect').selectedIndex = 0;
    }

    function addCategoryChip(catName) {
      if (selectedCategoryList.length >= 3) {
        alert('전문분야는 최대 3개까지만 선택할 수 있습니다.');
        return;
      }
      if (selectedCategoryList.includes(catName)) {
        alert('이미 선택된 전문분야입니다.');
        return;
      }
      selectedCategoryList.push(catName);
      renderCategoryChips();
    }

    function removeCategoryChip(catName) {
      selectedCategoryList = selectedCategoryList.filter(c => c !== catName);
      renderCategoryChips();
    }

    function renderCategoryChips() {
      var container = document.getElementById('selectedCategories');
      var countSpan = document.getElementById('categoryCount');
      if (!container) return;
      if (countSpan) countSpan.innerText = '최대 3개까지 선택 가능 (' + selectedCategoryList.length + '/3)';

      if (selectedCategoryList.length === 0) {
        container.innerHTML = '<span style="color: #64748b; font-size: 0.85rem; font-style: italic; display: flex; align-items: center;" id="emptyCatNotice">선택된 전문분야가 없습니다. 전문분야를 선택 후 "+ 분야 추가" 버튼을 눌러주세요 (최대 3개).</span>';
        return;
      }

      container.innerHTML = selectedCategoryList.map(c => \`
        <span class="cat-chip">
          <span>\${c}</span>
          <button type="button" class="btn-remove-chip" onclick="removeCategoryChip('\${c}')" title="삭제">&times;</button>
        </span>
      \`).join('');
    }

    // 3. 검색키워드 Keyword Input
    function addSearchKeyword() {
      var input = document.getElementById('keywordInput');
      var val = input.value.trim();
      if (!val) {
        alert('추가할 키워드를 입력해 주세요.');
        input.focus();
        return;
      }
      if (selectedKeywordList.length >= 5) {
        alert('검색 키워드는 최대 5개까지만 등록할 수 있습니다.');
        return;
      }
      if (selectedKeywordList.includes(val)) {
        alert('이미 등록된 키워드입니다.');
        return;
      }
      selectedKeywordList.push(val);
      input.value = '';
      renderKeywordChips();
    }

    function removeSearchKeyword(kw) {
      selectedKeywordList = selectedKeywordList.filter(k => k !== kw);
      renderKeywordChips();
    }

    function renderKeywordChips() {
      var container = document.getElementById('selectedKeywords');
      var countSpan = document.getElementById('keywordCount');
      if (!container) return;
      if (countSpan) countSpan.innerText = '자신을 표현하는 대표 검색 키워드 (최대 5개) (' + selectedKeywordList.length + '/5)';

      if (selectedKeywordList.length === 0) {
        container.innerHTML = '<span style="color: #64748b; font-size: 0.85rem; font-style: italic; display: flex; align-items: center;" id="emptyKwNotice">등록된 검색 키워드가 없습니다. 키워드 입력 후 "+ 키워드 추가" 버튼을 눌러주세요 (최대 5개).</span>';
        return;
      }

      container.innerHTML = selectedKeywordList.map(k => \`
        <span class="cat-chip" style="background-color: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.4); color: #6ee7b7;">
          <span>#\${k}</span>
          <button type="button" class="btn-remove-chip" style="color: #6ee7b7;" onclick="removeSearchKeyword('\${k}')" title="삭제">&times;</button>
        </span>
      \`).join('');
    }

    // 4. 주요수행프로젝트 Dynamic Fields
    function addProjectField() {
      var container = document.getElementById('projectContainer');
      var newItem = document.createElement('div');
      newItem.className = 'project-item';
      newItem.style.marginTop = '12px';
      newItem.innerHTML = \`
        <div style="display: flex; justify-content: flex-end; margin-bottom: 6px;">
          <button type="button" class="btn-remove-chip" style="color: #ef4444; font-size: 0.8rem;" onclick="this.closest('.project-item').remove()">✕ 삭제</button>
        </div>
        <div class="form-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
          <div>
            <label>프로젝트명 (Project Name)<span class="req">*</span></label>
            <input type="text" class="proj-name" placeholder="예: 차세대 지식 그래프 파이프라인 구축" required>
          </div>
          <div>
            <label>간단 설명 (Description)<span class="req">*</span></label>
            <input type="text" class="proj-desc" placeholder="예: 빅데이터 온톨로지 지식 맵 구축 및 실시간 쿼리 엔진 설계" required>
          </div>
          <div>
            <label>역할 (Role in Project)<span class="req">*</span></label>
            <input type="text" class="proj-role" placeholder="예: 수석 데이터 아키텍트" required>
          </div>
        </div>
      \`;
      container.appendChild(newItem);
    }

    // SHA-256 Hash Function (Native Crypto with Fallback)
    async function computeSHA256Hex(str) {
      if (window.crypto && crypto.subtle) {
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(str);
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        } catch (e) {
          console.warn("crypto.subtle error, falling back to sync sha256:", e);
        }
      }
      return syncSHA256(str);
    }

    // Synchronous SHA-256 Implementation
    function syncSHA256(ascii) {
      function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
      var words = [];
      var utf8 = unescape(encodeURIComponent(ascii));
      var utf8Len = utf8.length;
      for (var i = 0; i < utf8Len; i++) {
        words[i >> 2] |= (utf8.charCodeAt(i) & 0xff) << ((3 - i % 4) * 8);
      }
      words[utf8Len >> 2] |= 0x80 << ((3 - utf8Len % 4) * 8);
      words[(((utf8Len + 8) >> 6) << 4) + 15] = utf8Len * 8;

      var h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
      var k = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
      ];

      for (var j = 0; j < words.length; j += 16) {
        var w = words.slice(j, j + 16);
        for (var i = 16; i < 64; i++) {
          var s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
          var s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
          w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        }

        var [a, b, c, d, e, f, g, hh] = h;
        for (var i = 0; i < 64; i++) {
          var s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
          var ch = (e & f) ^ ((~e) & g);
          var temp1 = (hh + s1 + ch + k[i] + w[i]) | 0;
          var s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
          var maj = (a & b) ^ (a & c) ^ (b & c);
          var temp2 = (s0 + maj) | 0;

          hh = g; g = f; f = e; e = (d + temp1) | 0;
          d = c; c = b; b = a; a = (temp1 + temp2) | 0;
        }

        h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0;
        h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0;
      }

      return h.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
    }

    // Deterministic UUIDv5 Generator
    async function generateAdvisorUUID() {
      var realName = document.getElementById("advRealName") ? document.getElementById("advRealName").value.trim() : "";
      var nickname = document.getElementById("advNickname") ? document.getElementById("advNickname").value.trim() : "";
      var email = document.getElementById("advEmail") ? document.getElementById("advEmail").value.trim() : "";
      var phone = document.getElementById("advPhone") ? document.getElementById("advPhone").value.trim() : "";

      var rawDisplay = document.getElementById("rawCombinedText");
      var uuidDisplay = document.getElementById("generatedUUID");
      var shortIdDisplay = document.getElementById("generatedShortId");
      var statusBadge = document.getElementById("uuidStatusBadge");

      if (!realName && !nickname && !email && !phone) {
        if (rawDisplay) {
          rawDisplay.innerText = "(예시: 홍길동#010-1234-5678#새벽공기#advisor@domain.com)";
          rawDisplay.style.color = "#64748b";
          rawDisplay.style.fontStyle = "italic";
        }
        if (uuidDisplay) {
          uuidDisplay.innerText = "-";
          uuidDisplay.style.color = "#64748b";
        }
        if (shortIdDisplay) {
          shortIdDisplay.innerText = "-";
          shortIdDisplay.style.color = "#64748b";
        }
        if (statusBadge) {
          statusBadge.innerText = "정보 입력 대기 중";
          statusBadge.style.background = "rgba(148, 163, 184, 0.15)";
          statusBadge.style.color = "#64748b";
        }
        return null;
      }

      var rawString = \`\${realName}#\${phone}#\${nickname}#\${email}\`;
      if (rawDisplay) {
        rawDisplay.innerText = rawString;
        rawDisplay.style.color = "#cbd5e1";
        rawDisplay.style.fontStyle = "normal";
      }

      var hashHex = await computeSHA256Hex(rawString);

      var part1 = hashHex.substring(0, 8);
      var part2 = hashHex.substring(8, 12);
      var part3 = "5" + hashHex.substring(13, 16);
      var variant = ((parseInt(hashHex.substring(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, "0");
      var part4 = variant + hashHex.substring(18, 20);
      var part5 = hashHex.substring(20, 32);

      var uuid = \`\${part1}-\${part2}-\${part3}-\${part4}-\${part5}\`;
      var shortId = "Adv-" + part1.substring(0, 4).toUpperCase();

      if (uuidDisplay) {
        uuidDisplay.innerText = uuid;
        uuidDisplay.style.color = "#38bdf8";
      }
      if (shortIdDisplay) {
        shortIdDisplay.innerText = shortId;
        shortIdDisplay.style.color = "#34d399";
      }

      if (statusBadge) {
        if (realName && nickname && email && phone) {
          statusBadge.innerText = "✓ 고유 UUID 생성 완료 (Unique Validated)";
          statusBadge.style.background = "rgba(16, 185, 129, 0.25)";
          statusBadge.style.color = "#34d399";
        } else {
          statusBadge.innerText = "입력 진행 중 (실시간 해싱)";
          statusBadge.style.background = "rgba(59, 130, 246, 0.25)";
          statusBadge.style.color = "#93c5fd";
        }
      }

      return { uuid, shortId, rawString, realName, nickname, email, phone };
    }

    // Render Paginated Advisor List Cards
    function renderAdvisorList() {
      const container = document.getElementById("advisorList");
      if (!container) return;

      const total = filteredAdvisors.length;
      const totalPages = Math.ceil(total / pageSize) || 1;
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      const startIdx = (currentPage - 1) * pageSize;
      const pageItems = filteredAdvisors.slice(startIdx, startIdx + pageSize);

      if (pageItems.length === 0) {
        container.innerHTML = \`
          <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; background: rgba(15, 23, 42, 0.6); border: 1px dashed rgba(255, 255, 255, 0.1); border-radius: 12px; color: #94a3b8;">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
            <p style="font-size: 1.05rem; color: #cbd5e1; font-weight: 600; margin: 0 0 6px 0;">조건에 일치하는 어드바이저가 없습니다.</p>
            <p style="font-size: 0.85rem; margin: 0; color: #64748b;">도메인 선택을 '전체 산업분야'로 변경하거나 다른 검색 키워드를 입력해 보세요.</p>
          </div>
        \`;
      } else {
        container.innerHTML = pageItems.map(adv => {
          const isNewBadge = adv.isNew ? '<span style="background:#10b981; color:#ffffff; font-size:0.7rem; font-weight:bold; padding:2px 6px; border-radius:4px; margin-right:6px;">NEW 등록</span>' : '';
          const borderStyle = adv.isNew ? 'border: 1px solid rgba(52, 211, 153, 0.6); background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(6, 78, 59, 0.3));' : '';
          
          const keywordBadges = adv.keywords.map(k => \`<span class="tag-chip">#\${k}</span>\`).join(" ");
          const categoryBadge = \`<span class="layer-badge lb-domain">1단: \${adv.domainLabel}</span>\`;
          const deptBadge = \`<span class="layer-badge lb-dept">2단: \${adv.keywords.slice(0, 2).map(k => '#' + k).join(' ')}</span>\`;
          const expBadge = \`<span class="layer-badge lb-exp">3단: 총 경력 \${adv.exp}년</span>\`;

          return \`
            <div class="advisor-card" data-id="\${adv.shortId}" data-nickname="\${adv.nickname}" data-domain="\${adv.domainCode}" data-exp="\${adv.exp}" style="\${borderStyle}">
              <div class="advisor-info">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                  \${isNewBadge}
                  <h3 style="margin:0;">\${adv.nickname} <span style="font-size: 0.8rem; color: #94a3b8; font-weight: normal;">(\${adv.shortId})</span> <span style="font-size: 0.85rem; color: #34d399; margin-left: 8px;">★ \${adv.rating} (\${adv.reviewCount}건 평가)</span></h3>
                </div>
                
                <div class="layer-badges">
                  \${categoryBadge}
                  \${deptBadge}
                  \${expBadge}
                </div>

                <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 6px;">대표 프로젝트: <strong>\${adv.projName}</strong> (\${adv.projRole})</p>
                <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">\${adv.projDesc}</p>
                
                <div class="advisor-tags">
                  \${keywordBadges}
                </div>
              </div>
              <div class="advisor-actions">
                <button type="button" class="btn-action-msg" onclick="selectAdvisorForComm('\${adv.shortId}', 'msg')">💬 메시지</button>
                <button type="button" class="btn-action-call" onclick="selectAdvisorForComm('\${adv.shortId}', 'call')">📞 컨퍼런스 콜</button>
              </div>
            </div>
          \`;
        }).join("");
      }

      // Update counters in UI
      const totalDbEl = document.getElementById("totalDbCount");
      if (totalDbEl) totalDbEl.innerText = advisorDatabase.length;
      
      const countEl = document.getElementById("matchedAdvisorCount");
      if (countEl) countEl.innerText = total;

      const curPageEl = document.getElementById("currentPageNum");
      if (curPageEl) curPageEl.innerText = total === 0 ? 0 : currentPage;

      const totalPageEl = document.getElementById("totalPageNum");
      if (totalPageEl) totalPageEl.innerText = totalPages;

      renderPagination(totalPages);
    }

    // Render Page Number Navigation Buttons
    function renderPagination(totalPages) {
      const nav = document.getElementById("paginationNav");
      if (!nav) return;
      if (totalPages <= 1) {
        nav.innerHTML = "";
        return;
      }

      let html = \`<button type="button" class="page-btn" onclick="changePage(\${currentPage - 1})" \${currentPage === 1 ? "disabled" : ""}>&laquo; 이전</button>\`;

      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);
      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }

      if (startPage > 1) {
        html += \`<button type="button" class="page-btn" onclick="changePage(1)">1</button>\`;
        if (startPage > 2) html += \`<span style="color:#64748b; padding:0 4px;">...</span>\`;
      }

      for (let p = startPage; p <= endPage; p++) {
        html += \`<button type="button" class="page-btn \${p === currentPage ? "active" : ""}" onclick="changePage(\${p})">\${p}</button>\`;
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += \`<span style="color:#64748b; padding:0 4px;">...</span>\`;
        html += \`<button type="button" class="page-btn" onclick="changePage(\${totalPages})">\${totalPages}</button>\`;
      }

      html += \`<button type="button" class="page-btn" onclick="changePage(\${currentPage + 1})" \${currentPage === totalPages ? "disabled" : ""}>다음 &raquo;</button>\`;

      nav.innerHTML = html;
    }

    // Change Page and Smooth Scroll
    function changePage(page) {
      currentPage = page;
      renderAdvisorList();
      const noticeEl = document.getElementById("searchResultNotice");
      if (noticeEl) {
        noticeEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Select Advisor for Communication & Smart Contract
    function selectAdvisorForComm(shortId, type) {
      const adv = advisorDatabase.find(a => a.shortId === shortId);
      if (adv) {
        currentAdvisorProfile = {
          realName: adv.realName,
          nickname: adv.nickname,
          email: adv.email,
          phone: adv.phone,
          uuid: adv.uuid,
          shortId: adv.shortId
        };
        
        // Update Smart Contract Section with Selected Advisor
        updateContractPartyDOM();

        startComm(adv.nickname, type);
      }
    }

    function updateContractPartyDOM() {
      if (document.getElementById("contractAdvRealName")) document.getElementById("contractAdvRealName").innerText = currentAdvisorProfile.realName;
      if (document.getElementById("contractAdvNickname")) document.getElementById("contractAdvNickname").innerText = currentAdvisorProfile.nickname;
      if (document.getElementById("contractAdvUUID")) document.getElementById("contractAdvUUID").innerText = currentAdvisorProfile.uuid;
      if (document.getElementById("contractAdvShortId")) document.getElementById("contractAdvShortId").innerText = currentAdvisorProfile.shortId;
      if (document.getElementById("contractAdvContact")) document.getElementById("contractAdvContact").innerText = \`\${currentAdvisorProfile.phone} / \${currentAdvisorProfile.email}\`;
      if (document.getElementById("docAdvRealName")) document.getElementById("docAdvRealName").innerText = currentAdvisorProfile.realName;
      if (document.getElementById("docAdvNickname")) document.getElementById("docAdvNickname").innerText = currentAdvisorProfile.nickname;
    }

    // Interactive 4 Contract Metrics Calculation (Period, Hours/Rate, Frequency, Pages)
    function calcContractMetrics() {
      var startDate = document.getElementById("contractStartDate") ? document.getElementById("contractStartDate").value : "2026-08-15";
      var endDate = document.getElementById("contractEndDate") ? document.getElementById("contractEndDate").value : "2026-09-14";
      
      // Calculate date diff in days and weeks
      var startObj = new Date(startDate);
      var endObj = new Date(endDate);
      var diffTime = endObj.getTime() - startObj.getTime();
      var diffDays = Math.max(1, Math.round(diffTime / (1000 * 3600 * 24)) + 1);
      var diffWeeks = Math.max(1, Math.round(diffDays / 7));
      
      var durationText = diffDays + "일간 (약 " + diffWeeks + "주)";
      if (document.getElementById("contractDurationDays")) {
        document.getElementById("contractDurationDays").innerText = durationText;
      }
      
      var hours = parseInt(document.getElementById("contractHours").value) || 0;
      var rate = parseInt(document.getElementById("contractRate").value) || 0;
      var freq = document.getElementById("regularDeliverableFreq") ? document.getElementById("regularDeliverableFreq").value : "주단위";
      var pages = parseInt(document.getElementById("reportPages").value) || 30;

      var total = hours * rate;
      var formattedTotal = total.toLocaleString("ko-KR") + " 원";
      var formattedRate = rate.toLocaleString("ko-KR") + " 원";

      if (document.getElementById("totalContractPriceText")) document.getElementById("totalContractPriceText").innerText = formattedTotal;
      if (document.getElementById("calcFormula")) document.getElementById("calcFormula").innerText = \`\${hours}시간 × \${rate.toLocaleString("ko-KR")}원\`;
      
      // Update Standard Contract Agreement Text in Real-time
      if (document.getElementById("docPeriod")) document.getElementById("docPeriod").innerText = \`\${startDate} ~ \${endDate} (총 \${diffDays}일간)\`;
      
      var freqDetailText = freq === "일단위" ? "일단위 (Daily - 일일 업무 로그 & 진행 점검)" : 
                           freq === "주단위" ? "주단위 (Weekly - 주간 진척 보고서 & 정기 회의)" : 
                           freq === "격주단위" ? "격주단위 (Bi-weekly - 2주 단위 중간 산출물 보고)" : 
                           "월단위 (Monthly - 월간 마일스톤 종합 보고)";
      if (document.getElementById("docDeliverableFreq")) document.getElementById("docDeliverableFreq").innerText = freqDetailText;

      if (document.getElementById("docHours")) document.getElementById("docHours").innerText = hours;
      if (document.getElementById("docRate")) document.getElementById("docRate").innerText = formattedRate;
      if (document.getElementById("docPrice")) document.getElementById("docPrice").innerText = formattedTotal;
      if (document.getElementById("docPages")) document.getElementById("docPages").innerText = pages;
    }

    // Form Submission & Dynamic Registration into 100 DB
    async function submitForm() {
      var realName = document.getElementById("advRealName") ? document.getElementById("advRealName").value.trim() : "";
      var nickname = document.getElementById("advNickname") ? document.getElementById("advNickname").value.trim() : "";
      var email = document.getElementById("advEmail") ? document.getElementById("advEmail").value.trim() : "";
      var phone = document.getElementById("advPhone") ? document.getElementById("advPhone").value.trim() : "";

      if (!realName) {
        alert("실명을 입력해 주세요 (계약 시에만 법적 효력으로 사용).");
        document.getElementById("advRealName").focus();
        return;
      }
      if (!nickname) {
        alert("시스템에서 활동할 닉네임을 입력해 주세요.");
        document.getElementById("advNickname").focus();
        return;
      }
      if (!email) {
        alert("이메일 주소를 입력해 주세요.");
        document.getElementById("advEmail").focus();
        return;
      }
      if (!phone) {
        alert("모바일 번호를 입력해 주세요.");
        document.getElementById("advPhone").focus();
        return;
      }

      if (selectedCategoryList.length === 0) {
        alert("전문 분야를 최소 1개 이상 선택해 주세요 (최대 3개).");
        return;
      }

      if (selectedKeywordList.length === 0) {
        alert("검색 키워드를 최소 1개 이상 등록해 주세요 (최대 5개).");
        return;
      }

      var projNameInput = document.querySelector(".proj-name");
      var projDescInput = document.querySelector(".proj-desc");
      var projRoleInput = document.querySelector(".proj-role");
      var projName = (projNameInput && projNameInput.value.trim()) ? projNameInput.value.trim() : "차세대 도메인 아키텍처 설계 및 자문";
      var projDesc = (projDescInput && projDescInput.value.trim()) ? projDescInput.value.trim() : "분산 시스템 및 도메인 비즈니스 로직 최적화";
      var projRole = (projRoleInput && projRoleInput.value.trim()) ? projRoleInput.value.trim() : "총괄 수석 어드바이저";

      var years = parseInt(document.getElementById("years").value) || 15;

      // Compute Deterministic UUID
      var idData = await generateAdvisorUUID();
      if (!idData) return;

      currentAdvisorProfile = {
        realName: realName,
        nickname: nickname + " 수석 어드바이저",
        email: email,
        phone: phone,
        uuid: idData.uuid,
        shortId: idData.shortId
      };

      // Reflect in Tab 5 (Smart Contract Party Info)
      updateContractPartyDOM();

      // New Advisor Object
      const newAdv = {
        id: advisorDatabase.length + 1,
        shortId: idData.shortId,
        uuid: idData.uuid,
        realName: realName,
        nickname: nickname + " 수석 어드바이저",
        email: email,
        phone: phone,
        domainKey: selectedCategoryList[0] || "IT",
        domainLabel: selectedCategoryList.join(" / "),
        domainCode: selectedCategoryList.join("/"),
        keywords: [...selectedKeywordList],
        exp: years,
        projName: projName,
        projDesc: projDesc,
        projRole: projRole,
        rating: "5.0",
        reviewCount: 1,
        isNew: true
      };

      // Deduplicate if matching ShortId or Nickname already exists
      advisorDatabase = advisorDatabase.filter(a => a.shortId !== idData.shortId && a.nickname !== newAdv.nickname);
      advisorDatabase.unshift(newAdv);

      // Re-filter and render on page 1
      filterAdvisors(false);
      currentPage = 1;
      renderAdvisorList();

      showToast(\`✨ 어드바이저 [\${nickname}] (UUID: \${idData.shortId}) 100인 DB에 신규 등록 완료! 검색 화면으로 이동합니다.\`);

      // Automatically switch to search tab to see the newly registered card
      setTimeout(function() {
        switchTab('tab-search');
      }, 700);
    }

    // Helper to check if card text matches query with smart token / acronym boundary detection
    function matchSearchTerm(text, query) {
      if (!query) return true;
      var q = query.trim().toLowerCase();
      if (!q) return true;

      // For short acronyms / 2-letter search terms like 'ai', 'it', 'vc', 'ui', 'ux', 'ml', 'ds'
      if (q.length <= 2) {
        var escaped = q.replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\]/g, "\\$&");
        var regex = new RegExp('(^|[^a-zA-Z0-9가-힣])' + escaped + '([^a-zA-Z0-9가-힣]|$)', 'i');
        return regex.test(text);
      }

      // For standard words, match substring
      return text.includes(q);
    }

    // 3-Layer Advisor Search & Filtering Logic across 100 DB
    function filterAdvisors(isButtonClick) {
      var domainFilter = document.getElementById("layerDomain").value;
      var keywordFilter = (document.getElementById("layerKeyword") ? document.getElementById("layerKeyword").value.trim().toLowerCase() : "");
      var minExp = parseInt(document.getElementById("layerExp").value) || 0;
      var sortOption = (document.getElementById("sortSelect") ? document.getElementById("sortSelect").value : "recommend");

      filteredAdvisors = advisorDatabase.filter(adv => {
        var cardDomain = (adv.domainCode + " " + adv.domainKey + " " + adv.domainLabel).toLowerCase();
        var exp = adv.exp || 0;
        var text = \`\${adv.nickname} \${adv.shortId} \${adv.domainLabel} \${adv.keywords.join(" ")} \${adv.projName} \${adv.projDesc} \${adv.projRole}\`.toLowerCase();

        var matchDomain = (domainFilter === "all") || cardDomain.includes(domainFilter.toLowerCase()) || adv.domainKey === domainFilter || adv.domainCode.includes(domainFilter);
        var matchKeyword = !keywordFilter || matchSearchTerm(text, keywordFilter);
        var matchExp = exp >= minExp;

        return matchDomain && matchKeyword && matchExp;
      });

      // Sorting
      if (sortOption === "expDesc") {
        filteredAdvisors.sort((a, b) => b.exp - a.exp);
      } else if (sortOption === "ratingDesc") {
        filteredAdvisors.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      } else if (sortOption === "reviewDesc") {
        filteredAdvisors.sort((a, b) => b.reviewCount - a.reviewCount);
      } else {
        // Recommend: new items first, then original order
        filteredAdvisors.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }

      currentPage = 1;
      renderAdvisorList();

      if (isButtonClick) {
        if (filteredAdvisors.length > 0) {
          showToast("검색 조건에 일치하는 " + filteredAdvisors.length + "명의 시니어 어드바이저를 찾았습니다!");
        } else {
          showToast("일치하는 어드바이저가 없습니다. 검색 조건을 조정해 주세요.");
        }
      }
    }

    function resetSearchFilters() {
      document.getElementById("layerDomain").selectedIndex = 0;
      if (document.getElementById("layerKeyword")) document.getElementById("layerKeyword").value = "";
      document.getElementById("layerExp").selectedIndex = 0;
      if (document.getElementById("sortSelect")) document.getElementById("sortSelect").selectedIndex = 0;
      filterAdvisors(false);
      showToast("검색 조건이 초기화되었습니다 (총 100명 표시).");
    }

    // AI Legal Review for Special Contract Terms [별첨 특수조항 검토 & 정제]
    function reviewSpecialTermsAI() {
      var input = document.getElementById("specialTermsInput").value.trim();
      if (!input) {
        alert("합의된 별첨 특수계약 사항을 입력해 주세요 (입력 예시를 참고하여 직접 입력 가능합니다).");
        return;
      }

      var outputBox = document.getElementById("aiLegalOutput");
      var textEl = document.getElementById("aiLegalText");

      outputBox.style.display = "block";
      textEl.innerText = "🤖 AI 법률 어드바이저 Agent가 표준계약서 충돌 여부 및 법적 리스크를 분석 중입니다...";

      setTimeout(function() {
        textEl.innerHTML = "<strong>[별첨 제1조 특수합의조항 (AI 정제 완료)]</strong><br/>" +
          "1. <strong>지식재산권의 귀속:</strong> 본 자문 계약에 의하여 자문 제공자(" + currentAdvisorProfile.shortId + ")가 산출한 분석 보고서, 아키텍처 다이어그램 및 설계 명세서의 지식재산권은 발주처의 에스크로 대금 완납 시 발주처에 완전 양도 귀속된다.<br/>" +
          "2. <strong>하자보수 및 추가 A/S 자문:</strong> 자문 완료 보고서 승인일로부터 3개월 이내에 발생한 과업 범위 내 기술적 후속 문의에 대하여 2회에 한해 무상 서면 A/S 자문을 성실히 이행한다.<br/>" +
          "3. <strong>증빙의 단일성 확인:</strong> 본 별첨 특수조항의 이행 여부 역시 표준계약서 제4조에 의거 시스템 내 전달된 산출물 및 메시지 이력으로만 입증한다.<br/>" +
          "<div style='margin-top:6px; color:#34d399; font-weight:600;'>✓ AI 검토 의견: 표준계약서 제1조~제8조와 상충되지 않으며 법적 분쟁 가능성을 완벽히 차단한 유효 특수조항으로 검토 및 반영되었습니다.</div>";
        showToast("AI 법률 어드바이저 검토 및 [별첨 특수조항] 정제가 완료되었습니다!");
      }, 1000);
    }

    // Create Final Smart Contract & Escrow
    async function createContract() {
      var outputBox = document.getElementById("finalContractResult");
      if (!outputBox) return;

      var startDate = document.getElementById("contractStartDate") ? document.getElementById("contractStartDate").value : "2026-08-15";
      var endDate = document.getElementById("contractEndDate") ? document.getElementById("contractEndDate").value : "2026-09-14";
      var startObj = new Date(startDate);
      var endObj = new Date(endDate);
      var diffDays = Math.max(1, Math.round((endObj.getTime() - startObj.getTime()) / (1000 * 3600 * 24)) + 1);

      var hours = parseInt(document.getElementById("contractHours").value) || 40;
      var rate = parseInt(document.getElementById("contractRate").value) || 150000;
      var freq = document.getElementById("regularDeliverableFreq") ? document.getElementById("regularDeliverableFreq").value : "주단위";
      var pages = parseInt(document.getElementById("reportPages").value) || 30;
      var total = hours * rate;

      var contractId = "SC-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

      // Compute verification signature hash with all 4 metrics
      var sealRaw = \`\${contractId}#\${currentAdvisorProfile.realName}#\${currentAdvisorProfile.uuid}#\${startDate}~\${endDate}#\${hours}h#\${freq}#\${total}#\${pages}p\`;
      var sealHash = await computeSHA256Hex(sealRaw);

      outputBox.style.display = "block";
      
      if (document.getElementById("signedContractId")) document.getElementById("signedContractId").innerText = contractId;
      if (document.getElementById("signedAdvRealName")) document.getElementById("signedAdvRealName").innerText = currentAdvisorProfile.realName;
      if (document.getElementById("signedAdvUUID")) document.getElementById("signedAdvUUID").innerText = currentAdvisorProfile.uuid;
      if (document.getElementById("signedAdvNickname")) document.getElementById("signedAdvNickname").innerText = currentAdvisorProfile.nickname;
      
      if (document.getElementById("signedPeriod")) document.getElementById("signedPeriod").innerText = \`\${startDate} ~ \${endDate} (총 \${diffDays}일간)\`;
      if (document.getElementById("signedHours")) document.getElementById("signedHours").innerText = hours;
      if (document.getElementById("signedRate")) document.getElementById("signedRate").innerText = rate.toLocaleString("ko-KR") + " 원";
      if (document.getElementById("signedFreq")) document.getElementById("signedFreq").innerText = freq + " (정기 진척 보고서 및 회의)";
      if (document.getElementById("signedPages")) document.getElementById("signedPages").innerText = pages;
      if (document.getElementById("signedPrice")) document.getElementById("signedPrice").innerText = total.toLocaleString("ko-KR") + " 원";
      if (document.getElementById("signedHashSeal")) document.getElementById("signedHashSeal").innerText = sealHash;

      outputBox.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("✨ 표준계약서 전자 서명 완료 및 에스크로 100% 안전 예치가 완료되었습니다!");
    }

    // AI Dispute Resolution Scenario Runner
    function runDisputeScenario(scId) {
      var input = document.getElementById("disputeChatInput");
      if (scId === 1) {
        input.value = "최종 산출물 보고서가 계약서상 약정된 분량(30페이지)에 미달하여 15페이지만 제출되었습니다. 에스크로 정산 조정 요청합니다.";
      } else if (scId === 2) {
        input.value = "약정된 정기 산출물 제출 주기(주단위)에 따른 주간 진척 보고서 및 화상 회의 1회가 누락되었습니다.";
      } else if (scId === 3) {
        input.value = "전체 계약 기간(종료일 2026-09-14)이 경과하였으나 최종 산출물이 전달되지 않고 지연되었습니다.";
      } else if (scId === 4) {
        input.value = "어드바이저가 개인 카카오톡 메신저로 추가 개발 자문을 구두 합의했다고 주장합니다. 시스템에는 기록이 없습니다.";
      } else if (scId === 5) {
        input.value = "별첨 특수합의 조항에 명시된 자문 종료 후 3개월 내 2회 무상 A/S 서면 자문 이행을 요청합니다.";
      }
      sendDisputeMsg();
    }

    // AI Dispute Resolution Chatbot
    function sendDisputeMsg() {
      var input = document.getElementById("disputeChatInput");
      var msg = input.value.trim();
      if (!msg) return;

      var messages = document.getElementById("disputeChatMessages");
      var userBubble = document.createElement("div");
      userBubble.style.padding = "10px 14px";
      userBubble.style.background = "rgba(59, 130, 246, 0.2)";
      userBubble.style.borderRadius = "8px";
      userBubble.style.marginBottom = "10px";
      userBubble.style.color = "#ffffff";
      userBubble.style.fontSize = "0.88rem";
      userBubble.innerHTML = "<strong>발주처 (갑):</strong> " + msg;
      messages.appendChild(userBubble);
      input.value = "";

      var aiBubble = document.createElement("div");
      aiBubble.style.padding = "12px 16px";
      aiBubble.style.background = "rgba(16, 185, 129, 0.15)";
      aiBubble.style.border = "1px solid rgba(52, 211, 153, 0.35)";
      aiBubble.style.borderRadius = "8px";
      aiBubble.style.marginBottom = "10px";
      aiBubble.style.color = "#e2e8f0";
      aiBubble.style.fontSize = "0.88rem";
      aiBubble.style.lineHeight = "1.65";

      // Context-aware intelligent arbitration response
      var lowerMsg = msg.toLowerCase();
      var analysisText = "";

      if (lowerMsg.includes("15페이지") || lowerMsg.includes("페이지") || lowerMsg.includes("분량") || lowerMsg.includes("미달")) {
        analysisText = "<strong>🤖 AI 분쟁조정 Agent 판정 결과 [사안: 4. 최종 산출물 분량 미달]:</strong><br/>" +
          "• <strong>표준계약서 적용 조항:</strong> 제6조 제1항 (최종 산출물 공식 보고서 총 30페이지 이상 명시)<br/>" +
          "• <strong>시스템 데이터 검증:</strong> 시스템에 업로드된 파일 <code style='color:#38bdf8;'>Advisory_Final_Report.pdf</code>의 실측 분량은 <strong>총 15페이지</strong>로 약정 기준(30페이지) 대비 50% 미달 확인.<br/>" +
          "• <strong>AI 중재 권고안:</strong><br/>" +
          "  1) [을]에게 3영업일의 보완 기간을 부여하여 누락된 아키텍처 다이어그램 및 세부 명세서 15페이지 추가 작성을 명령함.<br/>" +
          "  2) 기한 내 보완 완료 시 에스크로 예치금 100% 정상 지급, 미보완 시 에스크로 예치금의 50% 감액 정산 후 잔여 50% 발주처 환불 권고.";
      } else if (lowerMsg.includes("누락") || lowerMsg.includes("회의") || lowerMsg.includes("주단위") || lowerMsg.includes("정기 산출물") || lowerMsg.includes("주기")) {
        analysisText = "<strong>🤖 AI 분쟁조정 Agent 판정 결과 [사안: 3. 정기 산출물 제출 주기 누락]:</strong><br/>" +
          "• <strong>표준계약서 적용 조항:</strong> 제2조 제2항 (약정된 정기 산출물 주기 및 온라인 회의 성실 이행)<br/>" +
          "• <strong>시스템 로그 검증:</strong> 플랫폼 산출물 제출함 및 화상 컨퍼런스 로그 분석 결과, 1주차·2주차·4주차 제출 완료 / <strong>3주차 정기 산출물 미제출 확인</strong>.<br/>" +
          "• <strong>AI 중재 권고안:</strong> 총 4회 중 1회(25%) 정기 산출물 미제출에 해당하므로, 과업 기간 1주일 연장을 통한 보충 산출물 제출 및 화상회의 1회(60분) 즉시 이행 권고 (보충 완료 시 에스크로 전액 지급).";
      } else if (lowerMsg.includes("기간") || lowerMsg.includes("종료일") || lowerMsg.includes("지연") || lowerMsg.includes("초과")) {
        analysisText = "<strong>🤖 AI 분쟁조정 Agent 판정 결과 [사안: 1. 전체 과업 기간 초과 지연]:</strong><br/>" +
          "• <strong>표준계약서 적용 조항:</strong> 제2조 제1항 (과업 전체 기간: 2026-08-15 ~ 2026-09-14) 및 제6조 제2항<br/>" +
          "• <strong>시스템 로그 검증:</strong> 계약 종료일(2026-09-14 23:59) 기준 시스템 상 최종 보고서 미등록 상태 확인.<br/>" +
          "• <strong>AI 중재 권고안:</strong> 불가항력 사유가 입증되지 않는 한, 지체일수당 총 계약금의 0.25% 지체상금을 일할 공제하고 정산할 것을 권고함.";
      } else if (lowerMsg.includes("카카오톡") || lowerMsg.includes("메신저") || lowerMsg.includes("구두") || lowerMsg.includes("사적")) {
        analysisText = "<strong>🤖 AI 분쟁조정 Agent 판정 결과 [사안: 시스템 외 사적 구두 합의 분쟁]:</strong><br/>" +
          "• <strong>표준계약서 적용 조항:</strong> 제3조 제1항 및 제4조 제1항/제2항 (시스템 기록의 유일한 증빙 원칙)<br/>" +
          "• <strong>시스템 데이터 검증:</strong> 본 플랫폼 시스템 내부에는 해당 추가 과업 요청 및 합의 파일/채팅 기록이 존재하지 않음.<br/>" +
          "• <strong>AI 중재 권고안:</strong> 계약서 제4조 제2항에 따라 시스템 외 사적 구두 합의는 공식 계약 효력으로 불인정. 발주처의 추가 자문료 지급 의무는 없으며, 기존 계약 범위 내 에스크로만 정산 처리함.";
      } else if (lowerMsg.includes("a/s") || lowerMsg.includes("특수") || lowerMsg.includes("별첨") || lowerMsg.includes("서면")) {
        analysisText = "<strong>🤖 AI 분쟁조정 Agent 판정 결과 [사안: [별첨] 특수합의 A/S 이행]:</strong><br/>" +
          "• <strong>계약 적용 조항:</strong> [별첨] 특수합의사항 제2조 (종료 후 3개월 내 2회 무상 서면 A/S 의무)<br/>" +
          "• <strong>시스템 로그 검증:</strong> 본 자문 계약 종료일로부터 28일 경과 시점으로 3개월 이내 유효 기간에 해당하며, 현재까지 A/S 사용 횟수는 0회임.<br/>" +
          "• <strong>AI 중재 권고안:</strong> 어드바이저(" + currentAdvisorProfile.shortId + ")는 별첨 특수합의에 따라 발주처의 기술 문의에 48시간 이내 1차 무상 서면 답변서를 시스템을 통해 제출할 것을 명함.";
      } else {
        analysisText = "<strong>🤖 AI 분쟁조정 Agent 분석 완료:</strong><br/>" +
          "표준계약서 4대 정량 기준(전체 과업 기간, 투입시간/단가, 정기 산출물 주기, 최종 산출물 분량) 및 시스템 기록을 바탕으로 정밀 조사를 진행했습니다.<br/>" +
          "• <strong>조정 방향:</strong> 시스템 내 정량적 산출물 검증 후 에스크로 락업 해제 또는 과업 보완 명령을 즉시 통보합니다.";
      }

      aiBubble.innerHTML = analysisText;

      setTimeout(function() {
        messages.appendChild(aiBubble);
        messages.scrollTop = messages.scrollHeight;
      }, 600);
    }

    // Communication Channel
    function startComm(name, type) {
      var callTarget = document.getElementById("callTargetName");
      if (callTarget) callTarget.innerText = name + " (" + currentAdvisorProfile.shortId + ")";

      var chatTarget = document.getElementById("chatTargetName");
      if (chatTarget) chatTarget.innerText = name;

      var firstMsg = document.getElementById("chatMessages");
      if (firstMsg && firstMsg.firstElementChild) {
        firstMsg.firstElementChild.innerHTML = "<strong>" + name + " (" + currentAdvisorProfile.shortId + "):</strong> 안녕하세요! 문의해주신 도메인 아키텍처 및 기술 자문과 관련하여 어떤 부분 위주로 검토해 드릴까요?";
      }

      switchTab('tab-comm');
      showToast("[" + name + "]님과의 커뮤니케이션 채널로 이동했습니다.");
    }

    function sendMsg() {
      var input = document.getElementById("chatInput");
      var text = input.value.trim();
      if (!text) return;

      var container = document.getElementById("chatMessages");
      var userMsg = document.createElement("div");
      userMsg.className = "chat-msg msg-sent";
      userMsg.innerHTML = "<strong>나 (발주처):</strong> " + text;
      container.appendChild(userMsg);
      input.value = "";

      var replyMsg = document.createElement("div");
      replyMsg.className = "chat-msg msg-received";
      replyMsg.innerHTML = "<strong>" + currentAdvisorProfile.nickname + " (" + currentAdvisorProfile.shortId + "):</strong> 문의사항 확인했습니다. 시스템 상에 회의록 및 자료를 암호화 공유하며 진행하겠습니다.";
      setTimeout(() => {
        container.appendChild(replyMsg);
        container.scrollTop = container.scrollHeight;
      }, 600);
    }
    const sendChatMessage = sendMsg;

    function toggleBtn(btn, icon) {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        btn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        showToast(icon + " 기능이 해제되었습니다.");
      } else {
        btn.classList.add("active");
        btn.style.backgroundColor = "rgba(59, 130, 246, 0.6)";
        showToast(icon + " 기능이 활성화되었습니다.");
      }
    }

    function endCall() {
      var status = document.getElementById("callStatusText");
      if (status) {
        status.innerText = "통화가 종료되었습니다 (시스템 회의록 자동 저장 완료).";
        status.style.color = "#94a3b8";
      }
      showToast("컨퍼런스 콜이 종료되었습니다 (시스템 회의록 자동 저장 완료).");
    }

    // Evaluation Star Rating
    var currentRating = 5;
    function setRating(rating) {
      currentRating = rating;
      var stars = document.querySelectorAll(".star-rating span");
      stars.forEach((star, idx) => {
        if (idx < rating) {
          star.style.color = "#f59e0b";
        } else {
          star.style.color = "#475569";
        }
      });
    }

    function submitEvaluation() {
      var reviewText = document.getElementById("evalReview").value.trim();
      if (!reviewText) {
        alert("평가 의견을 입력해 주세요.");
        return;
      }

      var list = document.getElementById("reviewList");
      var item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = \`
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <strong style="color: #ffffff;">사용자 평가 (\${currentAdvisorProfile.nickname})</strong>
          <span style="color: #f59e0b;">★ \${currentRating}.0</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted);">\${reviewText}</p>
      \`;
      list.prepend(item);
      document.getElementById("evalReview").value = "";
      showToast("평가가 성공적으로 등록되었습니다!");
    }

    // Toast Notification
    function showToast(msg) {
      var t = document.getElementById("toast");
      t.innerText = msg;
      t.style.display = "block";
      setTimeout(() => {
        t.style.display = "none";
      }, 2500);
    }

    // Help Tooltip Toggle Handler
    function toggleHelp(event, boxId) {
      event.preventDefault();
      event.stopPropagation();
      var targetBox = document.getElementById(boxId);
      if (!targetBox) return;

      var currentShow = targetBox.classList.contains("show");
      
      // Close all open help boxes first
      document.querySelectorAll(".help-box").forEach(b => b.classList.remove("show"));
      document.querySelectorAll(".help-btn").forEach(btn => btn.classList.remove("active"));

      if (!currentShow) {
        targetBox.classList.add("show");
        event.currentTarget.classList.add("active");
      }
    }

    // Close help tooltip when clicking anywhere outside
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".help-wrap")) {
        document.querySelectorAll(".help-box").forEach(b => b.classList.remove("show"));
        document.querySelectorAll(".help-btn").forEach(btn => btn.classList.remove("active"));
      }
    });

    // Initialize Advisor List & Contract Metrics on Load (Immediate execution fallback for Vercel/CDN)
    function initApp() {
      renderAdvisorList();
      calcContractMetrics();
      updateContractPartyDOM();
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initApp);
    } else {
      initApp();
    }
  </script>
</body>
</html>
`;

const finalHtml = scriptPreData + scriptPostData;
fs.writeFileSync(indexPath, finalHtml, "utf8");
console.log("Successfully rebuilt pj01/index.html with distinct gray placeholder & sample styling!");
