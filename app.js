const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const slots = Array.from({ length: 17 }, (_, index) => {
  const start = index + 7;
  const end = start + 1;
  return `${paconst weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const slots = Array.from({ length: 17 }, (_, index) => {
  const start = index + 7;
  const end = start + 1;
  return `${pad(start)}:00-${pad(end)}:00`;
});const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const slots = Array.from({ length: 17 }, (_, index) => {
  const start = index + 7;
  const end = start + 1;
  return `${pad(start)}:00-${pad(end)}:00`;
});

const storageKey = "simple-week-planner";
const appVersion = "1.4.0";
const webAppUrl = "https://flashpop7.github.io/planning/";
const versionInfoUrl = "version.json";
const weeklySeenKey = "simple-week-planner-weekly-seen";
const carryoverSeenKey = "simple-week-planner-carryover-seen";
const dailyQuotes = [
  "今天也不用一步登天，先把眼前这一小步走稳。",
  "计划不是束缚，是帮你把心里的光落到地上。",
  "慢慢来，但别停下。你正在把混乱整理成答案。",
  "把大目标切成小任务，每完成一格，未来就亮一点。",
  "今天的你只需要比昨天多前进一点点，就已经很好。",
  "不用等状态完美才开始，开始本身就会制造状态。",
  "你写下的每个计划，都在替明天的自己省一点力气。",
  "认真生活的人，连普通的一天也能变得有方向。",
  "先完成，再完美。先行动，再修正。",
  "当你愿意安排时间，时间也会慢慢站到你这边。",
  "别小看今天的一格，它可能是未来很大变化的起点。",
  "清醒地安排，温柔地执行，坚定地完成。",
  "任务会变少，能力会变多，你正在升级。",
  "今天的努力不一定马上发光，但它一定在蓄电。",
  "把焦虑放进表格，把行动放进时间。",
];
const cheerMessages = [
  "你真棒！这格被你拿下了。",
  "完成！今日能量条偷偷涨了一截。",
  "干得漂亮，计划表已经开始佩服你了。",
  "叮！一枚任务被你优雅解决。",
  "很好，这一下很有执行力的味道。",
  "恭喜，拖延症刚刚被你轻轻击退。",
  "这不是打勾，这是给未来的自己递奶茶。",
  "冷知识：完成任务会让人看起来更像主角。",
  "漂亮！这一勾，有点像人生在点头。",
  "任务已收工，脑内小烟花可以放一秒。",
];
const categories = {
  study: { label: "学习", icon: "📚", color: "#4f7fbf" },
  work: { label: "工作", icon: "💼", color: "#287c66" },
  health: { label: "健康", icon: "🌿", color: "#75a843" },
  life: { label: "生活", icon: "🏠", color: "#d08a31" },
  creative: { label: "创作", icon: "✨", color: "#9b63b5" },
  social: { label: "社交", icon: "☕", color: "#c86666" },
  rest: { label: "休息", icon: "🌙", color: "#60708f" },
};
const moods = [
  { value: "happy", label: "开心 😊" },
  { value: "calm", label: "平静 🍵" },
  { value: "tired", label: "有点累 😮‍💨" },
  { value: "proud", label: "很骄傲 😎" },
  { value: "stuck", label: "卡过但过了 🧩" },
  { value: "light", label: "松了一口气 🌤️" },
];

const scheduleGrid = document.querySelector("#scheduleGrid");
const summaryBody = document.querySelector("#summaryBody");
const emptyState = document.querySelector("#emptyState");
const dailyQuote = document.querySelector("#dailyQuote");
const cheerStack = document.querySelector("#cheerStack");
const monthLabel = document.querySelector("#monthLabel");
const weekRange = document.querySelector("#weekRange");
const todayBtn = document.querySelector("#todayBtn");
const planDialog = document.querySelector("#planDialog");
const planText = document.querySelector("#planText");
const endTime = document.querySelector("#endTime");
const repeatUntil = document.querySelector("#repeatUntil");
const planCategory = document.querySelector("#planCategory");
const dialogDate = document.querySelector("#dialogDate");
const dialogTime = document.querySelector("#dialogTime");
const deletePlan = document.querySelector("#deletePlan");
const carryoverDialog = document.querySelector("#carryoverDialog");
const carryoverList = document.querySelector("#carryoverList");
const rescheduleDialog = document.querySelector("#rescheduleDialog");
const rescheduleList = document.querySelector("#rescheduleList");
const moodDialog = document.querySelector("#moodDialog");
const moodGrid = document.querySelector("#moodGrid");
const weeklyDialog = document.querySelector("#weeklyDialog");
const weeklyTitle = document.querySelector("#weeklyTitle");
const weeklyMessage = document.querySelector("#weeklyMessage");
const weeklyChart = document.querySelector("#weeklyChart");
const weeklyBody = document.querySelector("#weeklyBody");
const updateBtn = document.querySelector("#updateBtn");
const updateDialog = document.querySelector("#updateDialog");
const updateMessage = document.querySelector("#updateMessage");

let plans = normalizePlans(JSON.parse(localStorage.getItem(storageKey) || "{}"));
let weekStart = getMonday(new Date());
let activeKey = "";
let activeDateKey = "";
let activeSlot = "";
let activeSlotIndex = 0;
let pendingCarryovers = [];
let pendingMoodKey = "";

function pad(value) {
  return String(value).padStart(2, "0");
}

function todayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromDateKey(dateKey) {
  return new Date(`${dateKey}T00:00:00`);
}

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function getMonday(date) {
  const copy = new Date(date);
  const day = copy.getDay() || 7;
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function getWeekDates() {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

function getCategory(value) {
  return categories[value] || categories.study;
}

function normalizePlans(savedPlans) {
  return Object.fromEntries(
    Object.entries(savedPlans).map(([key, plan]) => {
      const [dateKey, slot] = key.split("|");
      return [
        key,
        {
          id: plan.id || `${dateKey}-${slot}-${Math.random().toString(36).slice(2, 8)}`,
          text: plan.text || "",
          done: Boolean(plan.done),
          span: Math.max(1, Number(plan.span) || 1),
          category: plan.category || "study",
          dueDate: plan.dueDate || dateKey,
          createdDate: plan.createdDate || dateKey,
          mood: plan.mood || "",
          carriedCount: Number(plan.carriedCount) || 0,
          carriedFrom: plan.carriedFrom || "",
        },
      ];
    }),
  );
}

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(plans));
}

function makeKey(dateKey, slot) {
  return `${dateKey}|${slot}`;
}

function getSlotEnd(slot) {
  return slot.split("-")[1];
}

function getSlotStart(slot) {
  return slot.split("-")[0];
}

function getTimeRange(slot, span = 1) {
  const startIndex = slots.indexOf(slot);
  const endIndex = Math.min(slots.length - 1, startIndex + span - 1);
  return `${getSlotStart(slot)}-${getSlotEnd(slots[endIndex])}`;
}

function getDurationHours(span = 1) {
  return Math.max(1, Number(span) || 1);
}

function getPlanAt(dateKey, slotIndex) {
  const slot = slots[slotIndex];
  const directKey = makeKey(dateKey, slot);

  if (plans[directKey]) {
    return { key: directKey, slotIndex, plan: plans[directKey], isStart: true };
  }

  for (let index = 0; index < slotIndex; index += 1) {
    const key = makeKey(dateKey, slots[index]);
    const plan = plans[key];
    if (plan && index + plan.span > slotIndex) {
      return { key, slotIndex: index, plan, isStart: false };
    }
  }

  return null;
}

function removePlansInRange(dateKey, startIndex, span, keepKey = "") {
  const endIndex = startIndex + span - 1;

  Object.keys(plans).forEach((key) => {
    if (key === keepKey) {
      return;
    }

    const [planDateKey, slot] = key.split("|");
    if (planDateKey !== dateKey) {
      return;
    }

    const planStart = slots.indexOf(slot);
    const planEnd = planStart + (plans[key].span || 1) - 1;
    if (planStart <= endIndex && planEnd >= startIndex) {
      delete plans[key];
    }
  });
}

function render() {
  renderDailyQuote();
  renderHeader();
  renderGrid();
  renderSummary();
}

function renderDailyQuote() {
  const today = new Date();
  const dateNumber = Number(`${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}`);
  dailyQuote.textContent = dailyQuotes[dateNumber % dailyQuotes.length];
}

function renderHeader() {
  const dates = getWeekDates();
  const first = dates[0];
  const last = dates[6];
  monthLabel.textContent = `${first.getFullYear()}年${first.getMonth() + 1}月`;
  weekRange.textContent = `${formatDate(first)} - ${formatDate(last)}`;
  todayBtn.textContent = getRelativeWeekLabel();
  todayBtn.title = "回到这周";
  todayBtn.setAttribute("aria-label", `当前显示${todayBtn.textContent}，点击回到这周`);
}

function getRelativeWeekLabel() {
  const currentWeekStart = getMonday(new Date());
  const diffDays = Math.round((weekStart - currentWeekStart) / 86400000);
  const diffWeeks = Math.round(diffDays / 7);

  if (diffWeeks === 0) {
    return "这周";
  }

  if (diffWeeks > 0) {
    return `第${diffWeeks + 1}周`;
  }

  return `上${Math.abs(diffWeeks)}周`;
}

function renderGrid() {
  const dates = getWeekDates();
  scheduleGrid.innerHTML = "";
  scheduleGrid.appendChild(createCell("时间", "corner-cell", 1, 1));

  dates.forEach((date, index) => {
    const cell = createCell("", "day-cell", index + 2, 1);
    cell.innerHTML = `<span class="weekday">${weekdays[index]}</span><span class="date">${formatDate(date)}</span>`;
    scheduleGrid.appendChild(cell);
  });

  slots.forEach((slot, slotIndex) => {
    scheduleGrid.appendChild(createCell(slot, "time-cell", 1, slotIndex + 2));
  });

  dates.forEach((date, dayIndex) => {
    const dateKey = toDateKey(date);

    slots.forEach((slot, slotIndex) => {
      const coveredPlan = getPlanAt(dateKey, slotIndex);
      if (coveredPlan && !coveredPlan.isStart) {
        return;
      }

      const key = makeKey(dateKey, slot);
      const plan = coveredPlan?.plan;
      const category = getCategory(plan?.category);
      const span = Math.min(plan?.span || 1, slots.length - slotIndex);
      const cell = createCell("", "plan-cell", dayIndex + 2, slotIndex + 2, span);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `plan-button${plan ? " has-plan" : ""}${plan?.done ? " is-done" : ""}`;
      button.style.setProperty("--category-color", category.color);
      button.dataset.key = key;
      button.dataset.date = dateKey;
      button.dataset.weekday = weekdays[dayIndex];
      button.dataset.slot = slot;
      button.dataset.slotIndex = String(slotIndex);
      button.innerHTML = plan
        ? `<span class="plan-meta">${category.icon} ${category.label}${plan.mood ? ` · ${escapeHtml(getMoodLabel(plan.mood))}` : ""}</span><span class="plan-title">${escapeHtml(plan.text)}</span>`
        : `<span class="plan-title">添加计划</span>`;
      button.addEventListener("click", openPlanDialog);
      cell.appendChild(button);
      scheduleGrid.appendChild(cell);
    });
  });
}

function createCell(text, className, column, row, rowSpan = 1) {
  const cell = document.createElement("div");
  cell.className = `grid-cell ${className}`;
  cell.textContent = text;
  cell.style.gridColumn = String(column);
  cell.style.gridRow = `${row} / span ${rowSpan}`;
  return cell;
}

function openPlanDialog(event) {
  const button = event.currentTarget;
  const clickedSlotIndex = Number(button.dataset.slotIndex);
  const coveredPlan = getPlanAt(button.dataset.date, clickedSlotIndex);

  activeKey = coveredPlan?.key || button.dataset.key;
  activeDateKey = button.dataset.date;
  activeSlot = slots[coveredPlan?.slotIndex ?? clickedSlotIndex];
  activeSlotIndex = coveredPlan?.slotIndex ?? clickedSlotIndex;

  const plan = plans[activeKey];
  dialogDate.textContent = `${button.dataset.date} ${button.dataset.weekday}`;
  dialogTime.textContent = getTimeRange(activeSlot, plan?.span || 1);
  planText.value = plan?.text || "";
  repeatUntil.min = activeDateKey;
  repeatUntil.value = plan?.dueDate && plan.dueDate >= activeDateKey ? plan.dueDate : activeDateKey;
  planCategory.value = plan?.category || "study";
  deletePlan.hidden = !plan;
  renderEndTimeOptions(plan?.span || 1);
  planDialog.showModal();
  planText.focus();
}

function renderEndTimeOptions(currentSpan) {
  endTime.innerHTML = "";
  slots.slice(activeSlotIndex).forEach((slot, offset) => {
    const option = document.createElement("option");
    option.value = String(offset + 1);
    option.textContent = getSlotEnd(slot);
    option.selected = offset + 1 === currentSpan;
    endTime.appendChild(option);
  });
}

function renderCategoryOptions() {
  planCategory.innerHTML = "";
  Object.entries(categories).forEach(([value, category]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `${category.icon} ${category.label}`;
    planCategory.appendChild(option);
  });
}

function renderSummary() {
  const entries = getSortedEntries();
  summaryBody.innerHTML = "";
  emptyState.hidden = entries.length > 0;

  entries.forEach((entry) => {
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.className = entry.done ? "done-row" : "";
    row.innerHTML = `
      <td><input type="checkbox" ${entry.done ? "checked" : ""} aria-label="标记完成"></td>
      <td>${escapeHtml(entry.dateKey)}</td>
      <td>${escapeHtml(entry.weekday)}</td>
      <td>${escapeHtml(getTimeRange(entry.slot, entry.span))}</td>
      <td>
        <span class="pill" style="--category-color:${category.color}; border:1px solid ${category.color};">${category.icon} ${category.label}</span>
        ${entry.dueDate && entry.dueDate > entry.dateKey ? `<span class="pill">持续到 ${escapeHtml(entry.dueDate)}</span>` : ""}
        ${entry.mood ? `<span class="pill">${escapeHtml(getMoodLabel(entry.mood))}</span>` : ""}
        <div>${escapeHtml(entry.text)}</div>
      </td>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      const wasDone = plans[entry.key].done;
      plans[entry.key].done = event.target.checked;
      savePlans();
      render();
      if (!wasDone && event.target.checked) {
        showCheer();
        openMoodDialog(entry.key);
      }
    });
    summaryBody.appendChild(row);
  });
}

function getSortedEntries() {
  return Object.entries(plans)
    .map(([key, plan]) => {
      const [dateKey, slot] = key.split("|");
      const weekday = weekdays[(fromDateKey(dateKey).getDay() + 6) % 7];
      return { key, dateKey, slot, weekday, ...plan };
    })
    .sort((a, b) => `${a.dateKey} ${a.slot}`.localeCompare(`${b.dateKey} ${b.slot}`));
}

function getMoodLabel(value) {
  return moods.find((mood) => mood.value === value)?.label || value;
}

function showCheer(message = "") {
  const card = document.createElement("div");
  card.className = "cheer-card";
  card.textContent = message || cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
  cheerStack.appendChild(card);
  window.setTimeout(() => card.remove(), 3100);
}

function openMoodDialog(key) {
  pendingMoodKey = key;
  moodGrid.innerHTML = "";
  moods.forEach((mood) => {
    const button = document.createElement("button");
    button.className = "mood-button";
    button.type = "submit";
    button.value = mood.value;
    button.textContent = mood.label;
    moodGrid.appendChild(button);
  });
  moodDialog.showModal();
}

function createPlanCopies(text, span, category, dueDate) {
  const startDate = fromDateKey(activeDateKey);
  const endDate = fromDateKey(dueDate);
  const copies = [];

  for (let date = new Date(startDate); date <= endDate; date = addDays(date, 1)) {
    const dateKey = toDateKey(date);
    const key = makeKey(dateKey, activeSlot);
    const startIndex = activeSlotIndex;
    removePlansInRange(dateKey, startIndex, span, key);
    plans[key] = {
      id: plans[key]?.id || `${dateKey}-${activeSlot}-${Date.now()}`,
      text,
      done: plans[key]?.done || false,
      span,
      category,
      dueDate,
      createdDate: activeDateKey,
      mood: plans[key]?.mood || "",
      carriedCount: plans[key]?.carriedCount || 0,
      carriedFrom: plans[key]?.carriedFrom || "",
    };
    copies.push(key);
  }

  return copies;
}

function getCarryoverEntries() {
  const today = todayKey();
  return getSortedEntries().filter((entry) => entry.dateKey < today && !entry.done);
}

function checkCarryovers() {
  pendingCarryovers = getCarryoverEntries();
  const today = todayKey();
  const signature = getCarryoverSignature(pendingCarryovers);
  if (!pendingCarryovers.length || localStorage.getItem(carryoverSeenKey) === signature) {
    return;
  }

  carryoverList.innerHTML = "";
  pendingCarryovers.forEach((entry) => {
    const category = getCategory(entry.category);
    const item = document.createElement("div");
    item.className = "task-item";
    item.style.setProperty("--category-color", category.color);
    item.innerHTML = `
      <strong>${escapeHtml(entry.text)}</strong>
      <small>${escapeHtml(entry.dateKey)} · ${escapeHtml(getTimeRange(entry.slot, entry.span))} · ${category.icon} ${category.label}</small>
    `;
    carryoverList.appendChild(item);
  });
  carryoverDialog.showModal();
}

function getCarryoverSignature(entries = pendingCarryovers) {
  return `${todayKey()}|${entries.map((entry) => entry.key).join(",")}`;
}

function renderRescheduleDialog() {
  const today = todayKey();
  rescheduleList.innerHTML = "";

  pendingCarryovers.forEach((entry, index) => {
    const category = getCategory(entry.category);
    const item = document.createElement("div");
    item.className = "task-item";
    item.style.setProperty("--category-color", category.color);
    item.dataset.oldKey = entry.key;
    item.innerHTML = `
      <strong>${escapeHtml(entry.text)}</strong>
      <small>原时间：${escapeHtml(entry.dateKey)} · ${escapeHtml(getTimeRange(entry.slot, entry.span))}</small>
      <div class="reschedule-row">
        <label>新日期
          <input class="carry-date" type="date" value="${today}" min="${today}">
        </label>
        <label>开始时间
          <select class="carry-start">${slots.map((slot) => `<option value="${slot}" ${slot === entry.slot ? "selected" : ""}>${slot}</option>`).join("")}</select>
        </label>
        <label>结束时间
          <select class="carry-span" data-span="${entry.span}"></select>
        </label>
      </div>
    `;
    rescheduleList.appendChild(item);
    const startSelect = item.querySelector(".carry-start");
    const spanSelect = item.querySelector(".carry-span");
    const refreshSpan = () => renderSpanSelect(spanSelect, slots.indexOf(startSelect.value), Number(spanSelect.dataset.span) || entry.span);
    startSelect.addEventListener("change", refreshSpan);
    refreshSpan();
    item.dataset.index = String(index);
  });

  rescheduleDialog.showModal();
}

function renderSpanSelect(select, startIndex, selectedSpan = 1) {
  select.innerHTML = "";
  slots.slice(startIndex).forEach((slot, offset) => {
    const option = document.createElement("option");
    option.value = String(offset + 1);
    option.textContent = getSlotEnd(slot);
    option.selected = offset + 1 === selectedSpan;
    select.appendChild(option);
  });
}

function saveCarryoverReschedules() {
  const items = Array.from(rescheduleList.querySelectorAll(".task-item"));

  items.forEach((item) => {
    const oldKey = item.dataset.oldKey;
    const oldPlan = plans[oldKey];
    if (!oldPlan) {
      return;
    }

    const dateKey = item.querySelector(".carry-date").value;
    const slot = item.querySelector(".carry-start").value;
    const span = Number(item.querySelector(".carry-span").value) || 1;
    const startIndex = slots.indexOf(slot);
    const newKey = makeKey(dateKey, slot);
    removePlansInRange(dateKey, startIndex, span, oldKey);
    delete plans[oldKey];
    plans[newKey] = {
      ...oldPlan,
      done: false,
      mood: "",
      span,
      dueDate: dateKey,
      carriedCount: (oldPlan.carriedCount || 0) + 1,
      carriedFrom: oldKey.split("|")[0],
    };
  });

  localStorage.setItem(carryoverSeenKey, getCarryoverSignature());
  savePlans();
  render();
  showCheer("已把昨日剩余任务安放到新时间里。今天慢慢来，也认真来。");
}

function discardCarryovers() {
  pendingCarryovers.forEach((entry) => {
    delete plans[entry.key];
  });
  localStorage.setItem(carryoverSeenKey, getCarryoverSignature());
  savePlans();
  render();
  showCheer("昨日剩余未完成任务已删除。轻装上阵，也是一种整理。");
}

function checkWeeklySummary() {
  const now = new Date();
  if (now.getDay() !== 0) {
    return;
  }

  const today = todayKey();
  if (localStorage.getItem(weeklySeenKey) === today) {
    return;
  }

  localStorage.setItem(weeklySeenKey, today);
  renderWeeklySummary();
}

function renderWeeklySummary() {
  const sunday = new Date();
  sunday.setHours(0, 0, 0, 0);
  const monday = getMonday(sunday);
  const weekKeys = Array.from({ length: 7 }, (_, index) => toDateKey(addDays(monday, index)));
  const entries = getSortedEntries().filter((entry) => weekKeys.includes(entry.dateKey));

  weeklyTitle.textContent = "周总结表";
  weeklyChart.innerHTML = "";
  weeklyBody.innerHTML = "";

  if (!entries.length) {
    weeklyMessage.textContent = "这周未安排任务，无周总结。空白也可能是休整，只要你知道自己在做什么就好。";
    weeklyDialog.showModal();
    return;
  }

  const completed = entries.filter((entry) => entry.done);
  const carried = entries.filter((entry) => entry.carriedCount > 0 || (!entry.done && entry.dateKey < todayKey()));
  const carriedRatio = carried.length / entries.length;
  const totalHours = entries.reduce((sum, entry) => sum + getDurationHours(entry.span), 0);
  const categoryHours = {};

  entries.forEach((entry) => {
    categoryHours[entry.category] = (categoryHours[entry.category] || 0) + getDurationHours(entry.span);
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(entry.text)}</td>
      <td><span class="pill" style="border:1px solid ${category.color};">${category.icon} ${category.label}</span></td>
      <td>${getDurationHours(entry.span)} 小时</td>
      <td>${entry.mood ? escapeHtml(getMoodLabel(entry.mood)) : "未记录"}</td>
    `;
    weeklyBody.appendChild(row);
  });

  Object.entries(categoryHours).forEach(([categoryKey, hours]) => {
    const category = getCategory(categoryKey);
    const row = document.createElement("div");
    row.className = "chart-row";
    row.style.setProperty("--category-color", category.color);
    row.innerHTML = `
      <span class="chart-label">${category.icon} ${category.label}</span>
      <span class="chart-track"><span class="chart-bar" style="--bar-width:${Math.max(8, (hours / totalHours) * 100)}%;"></span></span>
      <span>${hours} 小时</span>
    `;
    weeklyChart.appendChild(row);
  });

  if (completed.length === entries.length && carried.length === 0) {
    weeklyMessage.textContent = "完美周末！这周的每一项都落地了，给认真生活的你放一场小烟花。";
    weeklyDialog.showModal();
    launchConfetti();
    return;
  }

  if (carriedRatio > 0.8) {
    weeklyMessage.textContent = "这周有超过 80% 的任务经常剩余到第二天。温柔地说一句：计划可能排得太满了。你不是机器，可以把目标切小一点，让完成感重新回来。";
  } else {
    weeklyMessage.textContent = `这周安排了 ${entries.length} 个任务，完成 ${completed.length} 个，总计 ${totalHours} 小时。做得不必完美，但你确实在照看自己的时间。`;
  }

  weeklyDialog.showModal();
}

function launchConfetti() {
  const wrap = document.createElement("div");
  wrap.className = "confetti";
  const colors = ["#f4b942", "#287c66", "#c86666", "#4f7fbf", "#9b63b5"];
  for (let index = 0; index < 80; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.setProperty("--piece-color", colors[index % colors.length]);
    wrap.appendChild(piece);
  }
  document.body.appendChild(wrap);
  window.setTimeout(() => wrap.remove(), 3600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelector("#prevWeek").addEventListener("click", () => {
  weekStart = addDays(weekStart, -7);
  render();
});

document.querySelector("#nextWeek").addEventListener("click", () => {
  weekStart = addDays(weekStart, 7);
  render();
});

todayBtn.addEventListener("click", () => {
  weekStart = getMonday(new Date());
  render();
});

document.querySelector("#clearDone").addEventListener("click", () => {
  Object.keys(plans).forEach((key) => {
    if (plans[key].done) {
      delete plans[key];
    }
  });
  savePlans();
  render();
});

planDialog.addEventListener("close", () => {
  const action = planDialog.returnValue;
  const text = planText.value.trim();
  const span = Number(endTime.value) || 1;
  const category = planCategory.value || "study";
  const dueDate = repeatUntil.value || activeDateKey;

  if (action === "save" && text) {
    if (plans[activeKey]) {
      delete plans[activeKey];
    }
    createPlanCopies(text, span, category, dueDate);
  }

  if (action === "save" && !text) {
    delete plans[activeKey];
  }

  if (action === "delete") {
    delete plans[activeKey];
  }

  activeKey = "";
  activeDateKey = "";
  activeSlot = "";
  activeSlotIndex = 0;
  savePlans();
  render();
});

carryoverDialog.addEventListener("close", () => {
  if (carryoverDialog.returnValue === "accept") {
    renderRescheduleDialog();
  }

  if (carryoverDialog.returnValue === "discard") {
    discardCarryovers();
  }
});

rescheduleDialog.addEventListener("close", () => {
  if (rescheduleDialog.returnValue === "save") {
    saveCarryoverReschedules();
  }
});

moodDialog.addEventListener("close", () => {
  if (pendingMoodKey && moodDialog.returnValue && plans[pendingMoodKey]) {
    plans[pendingMoodKey].mood = moodDialog.returnValue;
    savePlans();
    render();
  }
  pendingMoodKey = "";
});

updateBtn.addEventListener("click", () => {
  updateMessage.textContent = `当前应用版本：v${appVersion}。网页版则直接点网页更新按钮，App 版则需下载新版本。`;
  updateDialog.showModal();
});

updateDialog.addEventListener("close", () => {
  if (updateDialog.returnValue === "reload") {
    updateWebVersion();
  }

  if (updateDialog.returnValue === "download") {
    downloadLatestApk();
  }
});

function updateWebVersion() {
  checkWebVersionAndUpdate();
}

async function checkWebVersionAndUpdate() {
  try {
    const response = await fetch(`${versionInfoUrl}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Version file unavailable");
    }

    const versionInfo = await response.json();
    const latestVersion = versionInfo.version || appVersion;

    if (compareVersions(latestVersion, appVersion) <= 0 && window.location.href.startsWith(webAppUrl)) {
      showCheer("已经是最新版。今天的计划表也很清醒。");
      return;
    }

    sessionStorage.setItem("planning-update-message", `更新成功，已加载 v${latestVersion}。`);

    if (window.location.href.startsWith(webAppUrl)) {
      window.location.reload();
      return;
    }

    window.location.href = `${webAppUrl}?updated=1`;
  } catch (error) {
    showCheer("暂时无法检查更新。请确认 version.json 已部署到网页根目录。");
  }
}

function compareVersions(left, right) {
  const leftParts = String(left).split(".").map((part) => Number(part) || 0);
  const rightParts = String(right).split(".").map((part) => Number(part) || 0);
  const length = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < length; index += 1) {
    const diff = (leftParts[index] || 0) - (rightParts[index] || 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

async function downloadLatestApk() {
  try {
    const response = await fetch(`${versionInfoUrl}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Version file unavailable");
    }

    const versionInfo = await response.json();
    if (versionInfo.apkUrl) {
      window.location.href = versionInfo.apkUrl;
      return;
    }

    showCheer("还没有配置新版 APK 下载地址。以后打包 APK 后，把下载链接写进 version.json 的 apkUrl。");
  } catch (error) {
    showCheer("暂时读取不到 version.json。部署到 GitHub Pages 后再试，或检查 version.json 是否在项目根目录。");
  }
}

renderCategoryOptions();
render();
savePlans();
showPendingUpdateMessage();
window.setTimeout(() => {
  checkCarryovers();
  checkWeeklySummary();
}, 250);

function showPendingUpdateMessage() {
  const url = new URL(window.location.href);
  const message = sessionStorage.getItem("planning-update-message");

  if (message) {
    sessionStorage.removeItem("planning-update-message");
    showCheer(message);
  }

  if (url.searchParams.get("updated") === "1") {
    showCheer(`更新成功，已加载 v${appVersion}。`);
    url.searchParams.delete("updated");
    window.history.replaceState({}, "", url.toString());
  }
}


const storageKey = "simple-week-planner";
const appVersion = "1.4.0";
const webAppUrl = "https://flashpop7.github.io/planning/";
const versionInfoUrl = "version.json";
const weeklySeenKey = "simple-week-planner-weekly-seen";
const carryoverSeenKey = "simple-week-planner-carryover-seen";
const dailyQuotes = [
  "今天也不用一步登天，先把眼前这一小步走稳。",
  "计划不是束缚，是帮你把心里的光落到地上。",
  "慢慢来，但别停下。你正在把混乱整理成答案。",
  "把大目标切成小任务，每完成一格，未来就亮一点。",
  "今天的你只需要比昨天多前进一点点，就已经很好。",
  "不用等状态完美才开始，开始本身就会制造状态。",
  "你写下的每个计划，都在替明天的自己省一点力气。",
  "认真生活的人，连普通的一天也能变得有方向。",
  "先完成，再完美。先行动，再修正。",
  "当你愿意安排时间，时间也会慢慢站到你这边。",
  "别小看今天的一格，它可能是未来很大变化的起点。",
  "清醒地安排，温柔地执行，坚定地完成。",
  "任务会变少，能力会变多，你正在升级。",
  "今天的努力不一定马上发光，但它一定在蓄电。",
  "把焦虑放进表格，把行动放进时间。",
];
const cheerMessages = [
  "你真棒！这格被你拿下了。",
  "完成！今日能量条偷偷涨了一截。",
  "干得漂亮，计划表已经开始佩服你了。",
  "叮！一枚任务被你优雅解决。",
  "很好，这一下很有执行力的味道。",
  "恭喜，拖延症刚刚被你轻轻击退。",
  "这不是打勾，这是给未来的自己递奶茶。",
  "冷知识：完成任务会让人看起来更像主角。",
  "漂亮！这一勾，有点像人生在点头。",
  "任务已收工，脑内小烟花可以放一秒。",
];
const categories = {
  study: { label: "学习", icon: "📚", color: "#4f7fbf" },
  work: { label: "工作", icon: "💼", color: "#287c66" },
  health: { label: "健康", icon: "🌿", color: "#75a843" },
  life: { label: "生活", icon: "🏠", color: "#d08a31" },
  creative: { label: "创作", icon: "✨", color: "#9b63b5" },
  social: { label: "社交", icon: "☕", color: "#c86666" },
  rest: { label: "休息", icon: "🌙", color: "#60708f" },
};
const moods = [
  { value: "happy", label: "开心 😊" },
  { value: "calm", label: "平静 🍵" },
  { value: "tired", label: "有点累 😮‍💨" },
  { value: "proud", label: "很骄傲 😎" },
  { value: "stuck", label: "卡过但过了 🧩" },
  { value: "light", label: "松了一口气 🌤️" },
];

const scheduleGrid = document.querySelector("#scheduleGrid");
const summaryBody = document.querySelector("#summaryBody");
const emptyState = document.querySelector("#emptyState");
const dailyQuote = document.querySelector("#dailyQuote");
const cheerStack = document.querySelector("#cheerStack");
const monthLabel = document.querySelector("#monthLabel");
const weekRange = document.querySelector("#weekRange");
const todayBtn = document.querySelector("#todayBtn");
const planDialog = document.querySelector("#planDialog");
const planText = document.querySelector("#planText");
const endTime = document.querySelector("#endTime");
const repeatUntil = document.querySelector("#repeatUntil");
const planCategory = document.querySelector("#planCategory");
const dialogDate = document.querySelector("#dialogDate");
const dialogTime = document.querySelector("#dialogTime");
const deletePlan = document.querySelector("#deletePlan");
const carryoverDialog = document.querySelector("#carryoverDialog");
const carryoverList = document.querySelector("#carryoverList");
const rescheduleDialog = document.querySelector("#rescheduleDialog");
const rescheduleList = document.querySelector("#rescheduleList");
const moodDialog = document.querySelector("#moodDialog");
const moodGrid = document.querySelector("#moodGrid");
const weeklyDialog = document.querySelector("#weeklyDialog");
const weeklyTitle = document.querySelector("#weeklyTitle");
const weeklyMessage = document.querySelector("#weeklyMessage");
const weeklyChart = document.querySelector("#weeklyChart");
const weeklyBody = document.querySelector("#weeklyBody");
const updateBtn = document.querySelector("#updateBtn");
const updateDialog = document.querySelector("#updateDialog");
const updateMessage = document.querySelector("#updateMessage");

let plans = normalizePlans(JSON.parse(localStorage.getItem(storageKey) || "{}"));
let weekStart = getMonday(new Date());
let activeKey = "";
let activeDateKey = "";
let activeSlot = "";
let activeSlotIndex = 0;
let pendingCarryovers = [];
let pendingMoodKey = "";

function pad(value) {
  return String(value).padStart(2, "0");
}

function todayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromDateKey(dateKey) {
  return new Date(`${dateKey}T00:00:00`);
}

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function getMonday(date) {
  const copy = new Date(date);
  const day = copy.getDay() || 7;
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function getWeekDates() {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

function getCategory(value) {
  return categories[value] || categories.study;
}

function normalizePlans(savedPlans) {
  return Object.fromEntries(
    Object.entries(savedPlans).map(([key, plan]) => {
      const [dateKey, slot] = key.split("|");
      return [
        key,
        {
          id: plan.id || `${dateKey}-${slot}-${Math.random().toString(36).slice(2, 8)}`,
          text: plan.text || "",
          done: Boolean(plan.done),
          span: Math.max(1, Number(plan.span) || 1),
          category: plan.category || "study",
          dueDate: plan.dueDate || dateKey,
          createdDate: plan.createdDate || dateKey,
          mood: plan.mood || "",
          carriedCount: Number(plan.carriedCount) || 0,
          carriedFrom: plan.carriedFrom || "",
        },
      ];
    }),
  );
}

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(plans));
}

function makeKey(dateKey, slot) {
  return `${dateKey}|${slot}`;
}

function getSlotEnd(slot) {
  return slot.split("-")[1];
}

function getSlotStart(slot) {
  return slot.split("-")[0];
}

function getTimeRange(slot, span = 1) {
  const startIndex = slots.indexOf(slot);
  const endIndex = Math.min(slots.length - 1, startIndex + span - 1);
  return `${getSlotStart(slot)}-${getSlotEnd(slots[endIndex])}`;
}

function getDurationHours(span = 1) {
  return Math.max(1, Number(span) || 1);
}

function getPlanAt(dateKey, slotIndex) {
  const slot = slots[slotIndex];
  const directKey = makeKey(dateKey, slot);

  if (plans[directKey]) {
    return { key: directKey, slotIndex, plan: plans[directKey], isStart: true };
  }

  for (let index = 0; index < slotIndex; index += 1) {
    const key = makeKey(dateKey, slots[index]);
    const plan = plans[key];
    if (plan && index + plan.span > slotIndex) {
      return { key, slotIndex: index, plan, isStart: false };
    }
  }

  return null;
}

function removePlansInRange(dateKey, startIndex, span, keepKey = "") {
  const endIndex = startIndex + span - 1;

  Object.keys(plans).forEach((key) => {
    if (key === keepKey) {
      return;
    }

    const [planDateKey, slot] = key.split("|");
    if (planDateKey !== dateKey) {
      return;
    }

    const planStart = slots.indexOf(slot);
    const planEnd = planStart + (plans[key].span || 1) - 1;
    if (planStart <= endIndex && planEnd >= startIndex) {
      delete plans[key];
    }
  });
}

function render() {
  renderDailyQuote();
  renderHeader();
  renderGrid();
  renderSummary();
}

function renderDailyQuote() {
  const today = new Date();
  const dateNumber = Number(`${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}`);
  dailyQuote.textContent = dailyQuotes[dateNumber % dailyQuotes.length];
}

function renderHeader() {
  const dates = getWeekDates();
  const first = dates[0];
  const last = dates[6];
  monthLabel.textContent = `${first.getFullYear()}年${first.getMonth() + 1}月`;
  weekRange.textContent = `${formatDate(first)} - ${formatDate(last)}`;
  todayBtn.textContent = getRelativeWeekLabel();
  todayBtn.title = "回到这周";
  todayBtn.setAttribute("aria-label", `当前显示${todayBtn.textContent}，点击回到这周`);
}

function getRelativeWeekLabel() {
  const currentWeekStart = getMonday(new Date());
  const diffDays = Math.round((weekStart - currentWeekStart) / 86400000);
  const diffWeeks = Math.round(diffDays / 7);

  if (diffWeeks === 0) {
    return "这周";
  }

  if (diffWeeks > 0) {
    return `第${diffWeeks + 1}周`;
  }

  return `上${Math.abs(diffWeeks)}周`;
}

function renderGrid() {
  const dates = getWeekDates();
  scheduleGrid.innerHTML = "";
  scheduleGrid.appendChild(createCell("时间", "corner-cell", 1, 1));

  dates.forEach((date, index) => {
    const cell = createCell("", "day-cell", index + 2, 1);
    cell.innerHTML = `<span class="weekday">${weekdays[index]}</span><span class="date">${formatDate(date)}</span>`;
    scheduleGrid.appendChild(cell);
  });

  slots.forEach((slot, slotIndex) => {
    scheduleGrid.appendChild(createCell(slot, "time-cell", 1, slotIndex + 2));
  });

  dates.forEach((date, dayIndex) => {
    const dateKey = toDateKey(date);

    slots.forEach((slot, slotIndex) => {
      const coveredPlan = getPlanAt(dateKey, slotIndex);
      if (coveredPlan && !coveredPlan.isStart) {
        return;
      }

      const key = makeKey(dateKey, slot);
      const plan = coveredPlan?.plan;
      const category = getCategory(plan?.category);
      const span = Math.min(plan?.span || 1, slots.length - slotIndex);
      const cell = createCell("", "plan-cell", dayIndex + 2, slotIndex + 2, span);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `plan-button${plan ? " has-plan" : ""}${plan?.done ? " is-done" : ""}`;
      button.style.setProperty("--category-color", category.color);
      button.dataset.key = key;
      button.dataset.date = dateKey;
      button.dataset.weekday = weekdays[dayIndex];
      button.dataset.slot = slot;
      button.dataset.slotIndex = String(slotIndex);
      button.innerHTML = plan
        ? `<span class="plan-meta">${category.icon} ${category.label}${plan.mood ? ` · ${escapeHtml(getMoodLabel(plan.mood))}` : ""}</span><span class="plan-title">${escapeHtml(plan.text)}</span>`
        : `<span class="plan-title">添加计划</span>`;
      button.addEventListener("click", openPlanDialog);
      cell.appendChild(button);
      scheduleGrid.appendChild(cell);
    });
  });
}

function createCell(text, className, column, row, rowSpan = 1) {
  const cell = document.createElement("div");
  cell.className = `grid-cell ${className}`;
  cell.textContent = text;
  cell.style.gridColumn = String(column);
  cell.style.gridRow = `${row} / span ${rowSpan}`;
  return cell;
}

function openPlanDialog(event) {
  const button = event.currentTarget;
  const clickedSlotIndex = Number(button.dataset.slotIndex);
  const coveredPlan = getPlanAt(button.dataset.date, clickedSlotIndex);

  activeKey = coveredPlan?.key || button.dataset.key;
  activeDateKey = button.dataset.date;
  activeSlot = slots[coveredPlan?.slotIndex ?? clickedSlotIndex];
  activeSlotIndex = coveredPlan?.slotIndex ?? clickedSlotIndex;

  const plan = plans[activeKey];
  dialogDate.textContent = `${button.dataset.date} ${button.dataset.weekday}`;
  dialogTime.textContent = getTimeRange(activeSlot, plan?.span || 1);
  planText.value = plan?.text || "";
  repeatUntil.min = activeDateKey;
  repeatUntil.value = plan?.dueDate && plan.dueDate >= activeDateKey ? plan.dueDate : activeDateKey;
  planCategory.value = plan?.category || "study";
  deletePlan.hidden = !plan;
  renderEndTimeOptions(plan?.span || 1);
  planDialog.showModal();
  planText.focus();
}

function renderEndTimeOptions(currentSpan) {
  endTime.innerHTML = "";
  slots.slice(activeSlotIndex).forEach((slot, offset) => {
    const option = document.createElement("option");
    option.value = String(offset + 1);
    option.textContent = getSlotEnd(slot);
    option.selected = offset + 1 === currentSpan;
    endTime.appendChild(option);
  });
}

function renderCategoryOptions() {
  planCategory.innerHTML = "";
  Object.entries(categories).forEach(([value, category]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `${category.icon} ${category.label}`;
    planCategory.appendChild(option);
  });
}

function renderSummary() {
  const entries = getSortedEntries();
  summaryBody.innerHTML = "";
  emptyState.hidden = entries.length > 0;

  entries.forEach((entry) => {
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.className = entry.done ? "done-row" : "";
    row.innerHTML = `
      <td><input type="checkbox" ${entry.done ? "checked" : ""} aria-label="标记完成"></td>
      <td>${escapeHtml(entry.dateKey)}</td>
      <td>${escapeHtml(entry.weekday)}</td>
      <td>${escapeHtml(getTimeRange(entry.slot, entry.span))}</td>
      <td>
        <span class="pill" style="--category-color:${category.color}; border:1px solid ${category.color};">${category.icon} ${category.label}</span>
        ${entry.dueDate && entry.dueDate > entry.dateKey ? `<span class="pill">持续到 ${escapeHtml(entry.dueDate)}</span>` : ""}
        ${entry.mood ? `<span class="pill">${escapeHtml(getMoodLabel(entry.mood))}</span>` : ""}
        <div>${escapeHtml(entry.text)}</div>
      </td>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      const wasDone = plans[entry.key].done;
      plans[entry.key].done = event.target.checked;
      savePlans();
      render();
      if (!wasDone && event.target.checked) {
        showCheer();
        openMoodDialog(entry.key);
      }
    });
    summaryBody.appendChild(row);
  });
}

function getSortedEntries() {
  return Object.entries(plans)
    .map(([key, plan]) => {
      const [dateKey, slot] = key.split("|");
      const weekday = weekdays[(fromDateKey(dateKey).getDay() + 6) % 7];
      return { key, dateKey, slot, weekday, ...plan };
    })
    .sort((a, b) => `${a.dateKey} ${a.slot}`.localeCompare(`${b.dateKey} ${b.slot}`));
}

function getMoodLabel(value) {
  return moods.find((mood) => mood.value === value)?.label || value;
}

function showCheer(message = "") {
  const card = document.createElement("div");
  card.className = "cheer-card";
  card.textContent = message || cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
  cheerStack.appendChild(card);
  window.setTimeout(() => card.remove(), 3100);
}

function openMoodDialog(key) {
  pendingMoodKey = key;
  moodGrid.innerHTML = "";
  moods.forEach((mood) => {
    const button = document.createElement("button");
    button.className = "mood-button";
    button.type = "submit";
    button.value = mood.value;
    button.textContent = mood.label;
    moodGrid.appendChild(button);
  });
  moodDialog.showModal();
}

function createPlanCopies(text, span, category, dueDate) {
  const startDate = fromDateKey(activeDateKey);
  const endDate = fromDateKey(dueDate);
  const copies = [];

  for (let date = new Date(startDate); date <= endDate; date = addDays(date, 1)) {
    const dateKey = toDateKey(date);
    const key = makeKey(dateKey, activeSlot);
    const startIndex = activeSlotIndex;
    removePlansInRange(dateKey, startIndex, span, key);
    plans[key] = {
      id: plans[key]?.id || `${dateKey}-${activeSlot}-${Date.now()}`,
      text,
      done: plans[key]?.done || false,
      span,
      category,
      dueDate,
      createdDate: activeDateKey,
      mood: plans[key]?.mood || "",
      carriedCount: plans[key]?.carriedCount || 0,
      carriedFrom: plans[key]?.carriedFrom || "",
    };
    copies.push(key);
  }

  return copies;
}

function getCarryoverEntries() {
  const today = todayKey();
  return getSortedEntries().filter((entry) => entry.dateKey < today && !entry.done);
}

function checkCarryovers() {
  pendingCarryovers = getCarryoverEntries();
  const today = todayKey();
  const signature = getCarryoverSignature(pendingCarryovers);
  if (!pendingCarryovers.length || localStorage.getItem(carryoverSeenKey) === signature) {
    return;
  }

  carryoverList.innerHTML = "";
  pendingCarryovers.forEach((entry) => {
    const category = getCategory(entry.category);
    const item = document.createElement("div");
    item.className = "task-item";
    item.style.setProperty("--category-color", category.color);
    item.innerHTML = `
      <strong>${escapeHtml(entry.text)}</strong>
      <small>${escapeHtml(entry.dateKey)} · ${escapeHtml(getTimeRange(entry.slot, entry.span))} · ${category.icon} ${category.label}</small>
    `;
    carryoverList.appendChild(item);
  });
  carryoverDialog.showModal();
}

function getCarryoverSignature(entries = pendingCarryovers) {
  return `${todayKey()}|${entries.map((entry) => entry.key).join(",")}`;
}

function renderRescheduleDialog() {
  const today = todayKey();
  rescheduleList.innerHTML = "";

  pendingCarryovers.forEach((entry, index) => {
    const category = getCategory(entry.category);
    const item = document.createElement("div");
    item.className = "task-item";
    item.style.setProperty("--category-color", category.color);
    item.dataset.oldKey = entry.key;
    item.innerHTML = `
      <strong>${escapeHtml(entry.text)}</strong>
      <small>原时间：${escapeHtml(entry.dateKey)} · ${escapeHtml(getTimeRange(entry.slot, entry.span))}</small>
      <div class="reschedule-row">
        <label>新日期
          <input class="carry-date" type="date" value="${today}" min="${today}">
        </label>
        <label>开始时间
          <select class="carry-start">${slots.map((slot) => `<option value="${slot}" ${slot === entry.slot ? "selected" : ""}>${slot}</option>`).join("")}</select>
        </label>
        <label>结束时间
          <select class="carry-span" data-span="${entry.span}"></select>
        </label>
      </div>
    `;
    rescheduleList.appendChild(item);
    const startSelect = item.querySelector(".carry-start");
    const spanSelect = item.querySelector(".carry-span");
    const refreshSpan = () => renderSpanSelect(spanSelect, slots.indexOf(startSelect.value), Number(spanSelect.dataset.span) || entry.span);
    startSelect.addEventListener("change", refreshSpan);
    refreshSpan();
    item.dataset.index = String(index);
  });

  rescheduleDialog.showModal();
}

function renderSpanSelect(select, startIndex, selectedSpan = 1) {
  select.innerHTML = "";
  slots.slice(startIndex).forEach((slot, offset) => {
    const option = document.createElement("option");
    option.value = String(offset + 1);
    option.textContent = getSlotEnd(slot);
    option.selected = offset + 1 === selectedSpan;
    select.appendChild(option);
  });
}

function saveCarryoverReschedules() {
  const items = Array.from(rescheduleList.querySelectorAll(".task-item"));

  items.forEach((item) => {
    const oldKey = item.dataset.oldKey;
    const oldPlan = plans[oldKey];
    if (!oldPlan) {
      return;
    }

    const dateKey = item.querySelector(".carry-date").value;
    const slot = item.querySelector(".carry-start").value;
    const span = Number(item.querySelector(".carry-span").value) || 1;
    const startIndex = slots.indexOf(slot);
    const newKey = makeKey(dateKey, slot);
    removePlansInRange(dateKey, startIndex, span, oldKey);
    delete plans[oldKey];
    plans[newKey] = {
      ...oldPlan,
      done: false,
      mood: "",
      span,
      dueDate: dateKey,
      carriedCount: (oldPlan.carriedCount || 0) + 1,
      carriedFrom: oldKey.split("|")[0],
    };
  });

  localStorage.setItem(carryoverSeenKey, getCarryoverSignature());
  savePlans();
  render();
  showCheer("已把昨日剩余任务安放到新时间里。今天慢慢来，也认真来。");
}

function discardCarryovers() {
  pendingCarryovers.forEach((entry) => {
    delete plans[entry.key];
  });
  localStorage.setItem(carryoverSeenKey, getCarryoverSignature());
  savePlans();
  render();
  showCheer("昨日剩余未完成任务已删除。轻装上阵，也是一种整理。");
}

function checkWeeklySummary() {
  const now = new Date();
  if (now.getDay() !== 0) {
    return;
  }

  const today = todayKey();
  if (localStorage.getItem(weeklySeenKey) === today) {
    return;
  }

  localStorage.setItem(weeklySeenKey, today);
  renderWeeklySummary();
}

function renderWeeklySummary() {
  const sunday = new Date();
  sunday.setHours(0, 0, 0, 0);
  const monday = getMonday(sunday);
  const weekKeys = Array.from({ length: 7 }, (_, index) => toDateKey(addDays(monday, index)));
  const entries = getSortedEntries().filter((entry) => weekKeys.includes(entry.dateKey));

  weeklyTitle.textContent = "周总结表";
  weeklyChart.innerHTML = "";
  weeklyBody.innerHTML = "";

  if (!entries.length) {
    weeklyMessage.textContent = "这周未安排任务，无周总结。空白也可能是休整，只要你知道自己在做什么就好。";
    weeklyDialog.showModal();
    return;
  }

  const completed = entries.filter((entry) => entry.done);
  const carried = entries.filter((entry) => entry.carriedCount > 0 || (!entry.done && entry.dateKey < todayKey()));
  const carriedRatio = carried.length / entries.length;
  const totalHours = entries.reduce((sum, entry) => sum + getDurationHours(entry.span), 0);
  const categoryHours = {};

  entries.forEach((entry) => {
    categoryHours[entry.category] = (categoryHours[entry.category] || 0) + getDurationHours(entry.span);
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(entry.text)}</td>
      <td><span class="pill" style="border:1px solid ${category.color};">${category.icon} ${category.label}</span></td>
      <td>${getDurationHours(entry.span)} 小时</td>
      <td>${entry.mood ? escapeHtml(getMoodLabel(entry.mood)) : "未记录"}</td>
    `;
    weeklyBody.appendChild(row);
  });

  Object.entries(categoryHours).forEach(([categoryKey, hours]) => {
    const category = getCategory(categoryKey);
    const row = document.createElement("div");
    row.className = "chart-row";
    row.style.setProperty("--category-color", category.color);
    row.innerHTML = `
      <span class="chart-label">${category.icon} ${category.label}</span>
      <span class="chart-track"><span class="chart-bar" style="--bar-width:${Math.max(8, (hours / totalHours) * 100)}%;"></span></span>
      <span>${hours} 小时</span>
    `;
    weeklyChart.appendChild(row);
  });

  if (completed.length === entries.length && carried.length === 0) {
    weeklyMessage.textContent = "完美周末！这周的每一项都落地了，给认真生活的你放一场小烟花。";
    weeklyDialog.showModal();
    launchConfetti();
    return;
  }

  if (carriedRatio > 0.8) {
    weeklyMessage.textContent = "这周有超过 80% 的任务经常剩余到第二天。温柔地说一句：计划可能排得太满了。你不是机器，可以把目标切小一点，让完成感重新回来。";
  } else {
    weeklyMessage.textContent = `这周安排了 ${entries.length} 个任务，完成 ${completed.length} 个，总计 ${totalHours} 小时。做得不必完美，但你确实在照看自己的时间。`;
  }

  weeklyDialog.showModal();
}

function launchConfetti() {
  const wrap = document.createElement("div");
  wrap.className = "confetti";
  const colors = ["#f4b942", "#287c66", "#c86666", "#4f7fbf", "#9b63b5"];
  for (let index = 0; index < 80; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.setProperty("--piece-color", colors[index % colors.length]);
    wrap.appendChild(piece);
  }
  document.body.appendChild(wrap);
  window.setTimeout(() => wrap.remove(), 3600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelector("#prevWeek").addEventListener("click", () => {
  weekStart = addDays(weekStart, -7);
  render();
});

document.querySelector("#nextWeek").addEventListener("click", () => {
  weekStart = addDays(weekStart, 7);
  render();
});

todayBtn.addEventListener("click", () => {
  weekStart = getMonday(new Date());
  render();
});

document.querySelector("#clearDone").addEventListener("click", () => {
  Object.keys(plans).forEach((key) => {
    if (plans[key].done) {
      delete plans[key];
    }
  });
  savePlans();
  render();
});

planDialog.addEventListener("close", () => {
  const action = planDialog.returnValue;
  const text = planText.value.trim();
  const span = Number(endTime.value) || 1;
  const category = planCategory.value || "study";
  const dueDate = repeatUntil.value || activeDateKey;

  if (action === "save" && text) {
    if (plans[activeKey]) {
      delete plans[activeKey];
    }
    createPlanCopies(text, span, category, dueDate);
  }

  if (action === "save" && !text) {
    delete plans[activeKey];
  }

  if (action === "delete") {
    delete plans[activeKey];
  }

  activeKey = "";
  activeDateKey = "";
  activeSlot = "";
  activeSlotIndex = 0;
  savePlans();
  render();
});

carryoverDialog.addEventListener("close", () => {
  if (carryoverDialog.returnValue === "accept") {
    renderRescheduleDialog();
  }

  if (carryoverDialog.returnValue === "discard") {
    discardCarryovers();
  }
});

rescheduleDialog.addEventListener("close", () => {
  if (rescheduleDialog.returnValue === "save") {
    saveCarryoverReschedules();
  }
});

moodDialog.addEventListener("close", () => {
  if (pendingMoodKey && moodDialog.returnValue && plans[pendingMoodKey]) {
    plans[pendingMoodKey].mood = moodDialog.returnValue;
    savePlans();
    render();
  }
  pendingMoodKey = "";
});

updateBtn.addEventListener("click", () => {
  updateMessage.textContent = `当前应用版本：v${appVersion}。网页版则直接点网页更新按钮，App 版则需下载新版本。`;
  updateDialog.showModal();
});

updateDialog.addEventListener("close", () => {
  if (updateDialog.returnValue === "reload") {
    updateWebVersion();
  }

  if (updateDialog.returnValue === "download") {
    downloadLatestApk();
  }
});

function updateWebVersion() {
  if (window.location.href.startsWith(webAppUrl)) {
    window.location.reload();
    return;
  }

  window.location.href = webAppUrl;
}

async function downloadLatestApk() {
  try {
    const response = await fetch(`${versionInfoUrl}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Version file unavailable");
    }

    const versionInfo = await response.json();
    if (versionInfo.apkUrl) {
      window.location.href = versionInfo.apkUrl;
      return;
    }

    showCheer("还没有配置新版 APK 下载地址。以后打包 APK 后，把下载链接写进 version.json 的 apkUrl。");
  } catch (error) {
    showCheer("暂时读取不到 version.json。部署到 GitHub Pages 后再试，或检查 version.json 是否在项目根目录。");
  }
}

renderCategoryOptions();
render();
savePlans();
window.setTimeout(() => {
  checkCarryovers();
  checkWeeklySummary();
}, 250);
d(start)}:00-${pad(end)}:00`;
});

const storageKey = "simple-week-planner";
const appVersion = "1.4.0";
const versionInfoUrl = "version.json";
const weeklySeenKey = "simple-week-planner-weekly-seen";
const carryoverSeenKey = "simple-week-planner-carryover-seen";
const dailyQuotes = [
  "今天也不用一步登天，先把眼前这一小步走稳。",
  "计划不是束缚，是帮你把心里的光落到地上。",
  "慢慢来，但别停下。你正在把混乱整理成答案。",
  "把大目标切成小任务，每完成一格，未来就亮一点。",
  "今天的你只需要比昨天多前进一点点，就已经很好。",
  "不用等状态完美才开始，开始本身就会制造状态。",
  "你写下的每个计划，都在替明天的自己省一点力气。",
  "认真生活的人，连普通的一天也能变得有方向。",
  "先完成，再完美。先行动，再修正。",
  "当你愿意安排时间，时间也会慢慢站到你这边。",
  "别小看今天的一格，它可能是未来很大变化的起点。",
  "清醒地安排，温柔地执行，坚定地完成。",
  "任务会变少，能力会变多，你正在升级。",
  "今天的努力不一定马上发光，但它一定在蓄电。",
  "把焦虑放进表格，把行动放进时间。",
];
const cheerMessages = [
  "你真棒！这格被你拿下了。",
  "完成！今日能量条偷偷涨了一截。",
  "干得漂亮，计划表已经开始佩服你了。",
  "叮！一枚任务被你优雅解决。",
  "很好，这一下很有执行力的味道。",
  "恭喜，拖延症刚刚被你轻轻击退。",
  "这不是打勾，这是给未来的自己递奶茶。",
  "冷知识：完成任务会让人看起来更像主角。",
  "漂亮！这一勾，有点像人生在点头。",
  "任务已收工，脑内小烟花可以放一秒。",
];
const categories = {
  study: { label: "学习", icon: "📚", color: "#4f7fbf" },
  work: { label: "工作", icon: "💼", color: "#287c66" },
  health: { label: "健康", icon: "🌿", color: "#75a843" },
  life: { label: "生活", icon: "🏠", color: "#d08a31" },
  creative: { label: "创作", icon: "✨", color: "#9b63b5" },
  social: { label: "社交", icon: "☕", color: "#c86666" },
  rest: { label: "休息", icon: "🌙", color: "#60708f" },
};
const moods = [
  { value: "happy", label: "开心 😊" },
  { value: "calm", label: "平静 🍵" },
  { value: "tired", label: "有点累 😮‍💨" },
  { value: "proud", label: "很骄傲 😎" },
  { value: "stuck", label: "卡过但过了 🧩" },
  { value: "light", label: "松了一口气 🌤️" },
];

const scheduleGrid = document.querySelector("#scheduleGrid");
const summaryBody = document.querySelector("#summaryBody");
const emptyState = document.querySelector("#emptyState");
const dailyQuote = document.querySelector("#dailyQuote");
const cheerStack = document.querySelector("#cheerStack");
const monthLabel = document.querySelector("#monthLabel");
const weekRange = document.querySelector("#weekRange");
const todayBtn = document.querySelector("#todayBtn");
const planDialog = document.querySelector("#planDialog");
const planText = document.querySelector("#planText");
const endTime = document.querySelector("#endTime");
const repeatUntil = document.querySelector("#repeatUntil");
const planCategory = document.querySelector("#planCategory");
const dialogDate = document.querySelector("#dialogDate");
const dialogTime = document.querySelector("#dialogTime");
const deletePlan = document.querySelector("#deletePlan");
const carryoverDialog = document.querySelector("#carryoverDialog");
const carryoverList = document.querySelector("#carryoverList");
const rescheduleDialog = document.querySelector("#rescheduleDialog");
const rescheduleList = document.querySelector("#rescheduleList");
const moodDialog = document.querySelector("#moodDialog");
const moodGrid = document.querySelector("#moodGrid");
const weeklyDialog = document.querySelector("#weeklyDialog");
const weeklyTitle = document.querySelector("#weeklyTitle");
const weeklyMessage = document.querySelector("#weeklyMessage");
const weeklyChart = document.querySelector("#weeklyChart");
const weeklyBody = document.querySelector("#weeklyBody");
const updateBtn = document.querySelector("#updateBtn");
const updateDialog = document.querySelector("#updateDialog");
const updateMessage = document.querySelector("#updateMessage");

let plans = normalizePlans(JSON.parse(localStorage.getItem(storageKey) || "{}"));
let weekStart = getMonday(new Date());
let activeKey = "";
let activeDateKey = "";
let activeSlot = "";
let activeSlotIndex = 0;
let pendingCarryovers = [];
let pendingMoodKey = "";

function pad(value) {
  return String(value).padStart(2, "0");
}

function todayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromDateKey(dateKey) {
  return new Date(`${dateKey}T00:00:00`);
}

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function getMonday(date) {
  const copy = new Date(date);
  const day = copy.getDay() || 7;
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function getWeekDates() {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

function getCategory(value) {
  return categories[value] || categories.study;
}

function normalizePlans(savedPlans) {
  return Object.fromEntries(
    Object.entries(savedPlans).map(([key, plan]) => {
      const [dateKey, slot] = key.split("|");
      return [
        key,
        {
          id: plan.id || `${dateKey}-${slot}-${Math.random().toString(36).slice(2, 8)}`,
          text: plan.text || "",
          done: Boolean(plan.done),
          span: Math.max(1, Number(plan.span) || 1),
          category: plan.category || "study",
          dueDate: plan.dueDate || dateKey,
          createdDate: plan.createdDate || dateKey,
          mood: plan.mood || "",
          carriedCount: Number(plan.carriedCount) || 0,
          carriedFrom: plan.carriedFrom || "",
        },
      ];
    }),
  );
}

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(plans));
}

function makeKey(dateKey, slot) {
  return `${dateKey}|${slot}`;
}

function getSlotEnd(slot) {
  return slot.split("-")[1];
}

function getSlotStart(slot) {
  return slot.split("-")[0];
}

function getTimeRange(slot, span = 1) {
  const startIndex = slots.indexOf(slot);
  const endIndex = Math.min(slots.length - 1, startIndex + span - 1);
  return `${getSlotStart(slot)}-${getSlotEnd(slots[endIndex])}`;
}

function getDurationHours(span = 1) {
  return Math.max(1, Number(span) || 1);
}

function getPlanAt(dateKey, slotIndex) {
  const slot = slots[slotIndex];
  const directKey = makeKey(dateKey, slot);

  if (plans[directKey]) {
    return { key: directKey, slotIndex, plan: plans[directKey], isStart: true };
  }

  for (let index = 0; index < slotIndex; index += 1) {
    const key = makeKey(dateKey, slots[index]);
    const plan = plans[key];
    if (plan && index + plan.span > slotIndex) {
      return { key, slotIndex: index, plan, isStart: false };
    }
  }

  return null;
}

function removePlansInRange(dateKey, startIndex, span, keepKey = "") {
  const endIndex = startIndex + span - 1;

  Object.keys(plans).forEach((key) => {
    if (key === keepKey) {
      return;
    }

    const [planDateKey, slot] = key.split("|");
    if (planDateKey !== dateKey) {
      return;
    }

    const planStart = slots.indexOf(slot);
    const planEnd = planStart + (plans[key].span || 1) - 1;
    if (planStart <= endIndex && planEnd >= startIndex) {
      delete plans[key];
    }
  });
}

function render() {
  renderDailyQuote();
  renderHeader();
  renderGrid();
  renderSummary();
}

function renderDailyQuote() {
  const today = new Date();
  const dateNumber = Number(`${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}`);
  dailyQuote.textContent = dailyQuotes[dateNumber % dailyQuotes.length];
}

function renderHeader() {
  const dates = getWeekDates();
  const first = dates[0];
  const last = dates[6];
  monthLabel.textContent = `${first.getFullYear()}年${first.getMonth() + 1}月`;
  weekRange.textContent = `${formatDate(first)} - ${formatDate(last)}`;
  todayBtn.textContent = getRelativeWeekLabel();
  todayBtn.title = "回到这周";
  todayBtn.setAttribute("aria-label", `当前显示${todayBtn.textContent}，点击回到这周`);
}

function getRelativeWeekLabel() {
  const currentWeekStart = getMonday(new Date());
  const diffDays = Math.round((weekStart - currentWeekStart) / 86400000);
  const diffWeeks = Math.round(diffDays / 7);

  if (diffWeeks === 0) {
    return "这周";
  }

  if (diffWeeks > 0) {
    return `第${diffWeeks + 1}周`;
  }

  return `上${Math.abs(diffWeeks)}周`;
}

function renderGrid() {
  const dates = getWeekDates();
  scheduleGrid.innerHTML = "";
  scheduleGrid.appendChild(createCell("时间", "corner-cell", 1, 1));

  dates.forEach((date, index) => {
    const cell = createCell("", "day-cell", index + 2, 1);
    cell.innerHTML = `<span class="weekday">${weekdays[index]}</span><span class="date">${formatDate(date)}</span>`;
    scheduleGrid.appendChild(cell);
  });

  slots.forEach((slot, slotIndex) => {
    scheduleGrid.appendChild(createCell(slot, "time-cell", 1, slotIndex + 2));
  });

  dates.forEach((date, dayIndex) => {
    const dateKey = toDateKey(date);

    slots.forEach((slot, slotIndex) => {
      const coveredPlan = getPlanAt(dateKey, slotIndex);
      if (coveredPlan && !coveredPlan.isStart) {
        return;
      }

      const key = makeKey(dateKey, slot);
      const plan = coveredPlan?.plan;
      const category = getCategory(plan?.category);
      const span = Math.min(plan?.span || 1, slots.length - slotIndex);
      const cell = createCell("", "plan-cell", dayIndex + 2, slotIndex + 2, span);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `plan-button${plan ? " has-plan" : ""}${plan?.done ? " is-done" : ""}`;
      button.style.setProperty("--category-color", category.color);
      button.dataset.key = key;
      button.dataset.date = dateKey;
      button.dataset.weekday = weekdays[dayIndex];
      button.dataset.slot = slot;
      button.dataset.slotIndex = String(slotIndex);
      button.innerHTML = plan
        ? `<span class="plan-meta">${category.icon} ${category.label}${plan.mood ? ` · ${escapeHtml(getMoodLabel(plan.mood))}` : ""}</span><span class="plan-title">${escapeHtml(plan.text)}</span>`
        : `<span class="plan-title">添加计划</span>`;
      button.addEventListener("click", openPlanDialog);
      cell.appendChild(button);
      scheduleGrid.appendChild(cell);
    });
  });
}

function createCell(text, className, column, row, rowSpan = 1) {
  const cell = document.createElement("div");
  cell.className = `grid-cell ${className}`;
  cell.textContent = text;
  cell.style.gridColumn = String(column);
  cell.style.gridRow = `${row} / span ${rowSpan}`;
  return cell;
}

function openPlanDialog(event) {
  const button = event.currentTarget;
  const clickedSlotIndex = Number(button.dataset.slotIndex);
  const coveredPlan = getPlanAt(button.dataset.date, clickedSlotIndex);

  activeKey = coveredPlan?.key || button.dataset.key;
  activeDateKey = button.dataset.date;
  activeSlot = slots[coveredPlan?.slotIndex ?? clickedSlotIndex];
  activeSlotIndex = coveredPlan?.slotIndex ?? clickedSlotIndex;

  const plan = plans[activeKey];
  dialogDate.textContent = `${button.dataset.date} ${button.dataset.weekday}`;
  dialogTime.textContent = getTimeRange(activeSlot, plan?.span || 1);
  planText.value = plan?.text || "";
  repeatUntil.min = activeDateKey;
  repeatUntil.value = plan?.dueDate && plan.dueDate >= activeDateKey ? plan.dueDate : activeDateKey;
  planCategory.value = plan?.category || "study";
  deletePlan.hidden = !plan;
  renderEndTimeOptions(plan?.span || 1);
  planDialog.showModal();
  planText.focus();
}

function renderEndTimeOptions(currentSpan) {
  endTime.innerHTML = "";
  slots.slice(activeSlotIndex).forEach((slot, offset) => {
    const option = document.createElement("option");
    option.value = String(offset + 1);
    option.textContent = getSlotEnd(slot);
    option.selected = offset + 1 === currentSpan;
    endTime.appendChild(option);
  });
}

function renderCategoryOptions() {
  planCategory.innerHTML = "";
  Object.entries(categories).forEach(([value, category]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `${category.icon} ${category.label}`;
    planCategory.appendChild(option);
  });
}

function renderSummary() {
  const entries = getSortedEntries();
  summaryBody.innerHTML = "";
  emptyState.hidden = entries.length > 0;

  entries.forEach((entry) => {
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.className = entry.done ? "done-row" : "";
    row.innerHTML = `
      <td><input type="checkbox" ${entry.done ? "checked" : ""} aria-label="标记完成"></td>
      <td>${escapeHtml(entry.dateKey)}</td>
      <td>${escapeHtml(entry.weekday)}</td>
      <td>${escapeHtml(getTimeRange(entry.slot, entry.span))}</td>
      <td>
        <span class="pill" style="--category-color:${category.color}; border:1px solid ${category.color};">${category.icon} ${category.label}</span>
        ${entry.dueDate && entry.dueDate > entry.dateKey ? `<span class="pill">持续到 ${escapeHtml(entry.dueDate)}</span>` : ""}
        ${entry.mood ? `<span class="pill">${escapeHtml(getMoodLabel(entry.mood))}</span>` : ""}
        <div>${escapeHtml(entry.text)}</div>
      </td>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      const wasDone = plans[entry.key].done;
      plans[entry.key].done = event.target.checked;
      savePlans();
      render();
      if (!wasDone && event.target.checked) {
        showCheer();
        openMoodDialog(entry.key);
      }
    });
    summaryBody.appendChild(row);
  });
}

function getSortedEntries() {
  return Object.entries(plans)
    .map(([key, plan]) => {
      const [dateKey, slot] = key.split("|");
      const weekday = weekdays[(fromDateKey(dateKey).getDay() + 6) % 7];
      return { key, dateKey, slot, weekday, ...plan };
    })
    .sort((a, b) => `${a.dateKey} ${a.slot}`.localeCompare(`${b.dateKey} ${b.slot}`));
}

function getMoodLabel(value) {
  return moods.find((mood) => mood.value === value)?.label || value;
}

function showCheer(message = "") {
  const card = document.createElement("div");
  card.className = "cheer-card";
  card.textContent = message || cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
  cheerStack.appendChild(card);
  window.setTimeout(() => card.remove(), 3100);
}

function openMoodDialog(key) {
  pendingMoodKey = key;
  moodGrid.innerHTML = "";
  moods.forEach((mood) => {
    const button = document.createElement("button");
    button.className = "mood-button";
    button.type = "submit";
    button.value = mood.value;
    button.textContent = mood.label;
    moodGrid.appendChild(button);
  });
  moodDialog.showModal();
}

function createPlanCopies(text, span, category, dueDate) {
  const startDate = fromDateKey(activeDateKey);
  const endDate = fromDateKey(dueDate);
  const copies = [];

  for (let date = new Date(startDate); date <= endDate; date = addDays(date, 1)) {
    const dateKey = toDateKey(date);
    const key = makeKey(dateKey, activeSlot);
    const startIndex = activeSlotIndex;
    removePlansInRange(dateKey, startIndex, span, key);
    plans[key] = {
      id: plans[key]?.id || `${dateKey}-${activeSlot}-${Date.now()}`,
      text,
      done: plans[key]?.done || false,
      span,
      category,
      dueDate,
      createdDate: activeDateKey,
      mood: plans[key]?.mood || "",
      carriedCount: plans[key]?.carriedCount || 0,
      carriedFrom: plans[key]?.carriedFrom || "",
    };
    copies.push(key);
  }

  return copies;
}

function getCarryoverEntries() {
  const today = todayKey();
  return getSortedEntries().filter((entry) => entry.dateKey < today && !entry.done);
}

function checkCarryovers() {
  pendingCarryovers = getCarryoverEntries();
  const today = todayKey();
  const signature = getCarryoverSignature(pendingCarryovers);
  if (!pendingCarryovers.length || localStorage.getItem(carryoverSeenKey) === signature) {
    return;
  }

  carryoverList.innerHTML = "";
  pendingCarryovers.forEach((entry) => {
    const category = getCategory(entry.category);
    const item = document.createElement("div");
    item.className = "task-item";
    item.style.setProperty("--category-color", category.color);
    item.innerHTML = `
      <strong>${escapeHtml(entry.text)}</strong>
      <small>${escapeHtml(entry.dateKey)} · ${escapeHtml(getTimeRange(entry.slot, entry.span))} · ${category.icon} ${category.label}</small>
    `;
    carryoverList.appendChild(item);
  });
  carryoverDialog.showModal();
}

function getCarryoverSignature(entries = pendingCarryovers) {
  return `${todayKey()}|${entries.map((entry) => entry.key).join(",")}`;
}

function renderRescheduleDialog() {
  const today = todayKey();
  rescheduleList.innerHTML = "";

  pendingCarryovers.forEach((entry, index) => {
    const category = getCategory(entry.category);
    const item = document.createElement("div");
    item.className = "task-item";
    item.style.setProperty("--category-color", category.color);
    item.dataset.oldKey = entry.key;
    item.innerHTML = `
      <strong>${escapeHtml(entry.text)}</strong>
      <small>原时间：${escapeHtml(entry.dateKey)} · ${escapeHtml(getTimeRange(entry.slot, entry.span))}</small>
      <div class="reschedule-row">
        <label>新日期
          <input class="carry-date" type="date" value="${today}" min="${today}">
        </label>
        <label>开始时间
          <select class="carry-start">${slots.map((slot) => `<option value="${slot}" ${slot === entry.slot ? "selected" : ""}>${slot}</option>`).join("")}</select>
        </label>
        <label>结束时间
          <select class="carry-span" data-span="${entry.span}"></select>
        </label>
      </div>
    `;
    rescheduleList.appendChild(item);
    const startSelect = item.querySelector(".carry-start");
    const spanSelect = item.querySelector(".carry-span");
    const refreshSpan = () => renderSpanSelect(spanSelect, slots.indexOf(startSelect.value), Number(spanSelect.dataset.span) || entry.span);
    startSelect.addEventListener("change", refreshSpan);
    refreshSpan();
    item.dataset.index = String(index);
  });

  rescheduleDialog.showModal();
}

function renderSpanSelect(select, startIndex, selectedSpan = 1) {
  select.innerHTML = "";
  slots.slice(startIndex).forEach((slot, offset) => {
    const option = document.createElement("option");
    option.value = String(offset + 1);
    option.textContent = getSlotEnd(slot);
    option.selected = offset + 1 === selectedSpan;
    select.appendChild(option);
  });
}

function saveCarryoverReschedules() {
  const items = Array.from(rescheduleList.querySelectorAll(".task-item"));

  items.forEach((item) => {
    const oldKey = item.dataset.oldKey;
    const oldPlan = plans[oldKey];
    if (!oldPlan) {
      return;
    }

    const dateKey = item.querySelector(".carry-date").value;
    const slot = item.querySelector(".carry-start").value;
    const span = Number(item.querySelector(".carry-span").value) || 1;
    const startIndex = slots.indexOf(slot);
    const newKey = makeKey(dateKey, slot);
    removePlansInRange(dateKey, startIndex, span, oldKey);
    delete plans[oldKey];
    plans[newKey] = {
      ...oldPlan,
      done: false,
      mood: "",
      span,
      dueDate: dateKey,
      carriedCount: (oldPlan.carriedCount || 0) + 1,
      carriedFrom: oldKey.split("|")[0],
    };
  });

  localStorage.setItem(carryoverSeenKey, getCarryoverSignature());
  savePlans();
  render();
  showCheer("已把昨日剩余任务安放到新时间里。今天慢慢来，也认真来。");
}

function discardCarryovers() {
  pendingCarryovers.forEach((entry) => {
    delete plans[entry.key];
  });
  localStorage.setItem(carryoverSeenKey, getCarryoverSignature());
  savePlans();
  render();
  showCheer("昨日剩余未完成任务已删除。轻装上阵，也是一种整理。");
}

function checkWeeklySummary() {
  const now = new Date();
  if (now.getDay() !== 0) {
    return;
  }

  const today = todayKey();
  if (localStorage.getItem(weeklySeenKey) === today) {
    return;
  }

  localStorage.setItem(weeklySeenKey, today);
  renderWeeklySummary();
}

function renderWeeklySummary() {
  const sunday = new Date();
  sunday.setHours(0, 0, 0, 0);
  const monday = getMonday(sunday);
  const weekKeys = Array.from({ length: 7 }, (_, index) => toDateKey(addDays(monday, index)));
  const entries = getSortedEntries().filter((entry) => weekKeys.includes(entry.dateKey));

  weeklyTitle.textContent = "周总结表";
  weeklyChart.innerHTML = "";
  weeklyBody.innerHTML = "";

  if (!entries.length) {
    weeklyMessage.textContent = "这周未安排任务，无周总结。空白也可能是休整，只要你知道自己在做什么就好。";
    weeklyDialog.showModal();
    return;
  }

  const completed = entries.filter((entry) => entry.done);
  const carried = entries.filter((entry) => entry.carriedCount > 0 || (!entry.done && entry.dateKey < todayKey()));
  const carriedRatio = carried.length / entries.length;
  const totalHours = entries.reduce((sum, entry) => sum + getDurationHours(entry.span), 0);
  const categoryHours = {};

  entries.forEach((entry) => {
    categoryHours[entry.category] = (categoryHours[entry.category] || 0) + getDurationHours(entry.span);
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(entry.text)}</td>
      <td><span class="pill" style="border:1px solid ${category.color};">${category.icon} ${category.label}</span></td>
      <td>${getDurationHours(entry.span)} 小时</td>
      <td>${entry.mood ? escapeHtml(getMoodLabel(entry.mood)) : "未记录"}</td>
    `;
    weeklyBody.appendChild(row);
  });

  Object.entries(categoryHours).forEach(([categoryKey, hours]) => {
    const category = getCategory(categoryKey);
    const row = document.createElement("div");
    row.className = "chart-row";
    row.style.setProperty("--category-color", category.color);
    row.innerHTML = `
      <span class="chart-label">${category.icon} ${category.label}</span>
      <span class="chart-track"><span class="chart-bar" style="--bar-width:${Math.max(8, (hours / totalHours) * 100)}%;"></span></span>
      <span>${hours} 小时</span>
    `;
    weeklyChart.appendChild(row);
  });

  if (completed.length === entries.length && carried.length === 0) {
    weeklyMessage.textContent = "完美周末！这周的每一项都落地了，给认真生活的你放一场小烟花。";
    weeklyDialog.showModal();
    launchConfetti();
    return;
  }

  if (carriedRatio > 0.8) {
    weeklyMessage.textContent = "这周有超过 80% 的任务经常剩余到第二天。温柔地说一句：计划可能排得太满了。你不是机器，可以把目标切小一点，让完成感重新回来。";
  } else {
    weeklyMessage.textContent = `这周安排了 ${entries.length} 个任务，完成 ${completed.length} 个，总计 ${totalHours} 小时。做得不必完美，但你确实在照看自己的时间。`;
  }

  weeklyDialog.showModal();
}

function launchConfetti() {
  const wrap = document.createElement("div");
  wrap.className = "confetti";
  const colors = ["#f4b942", "#287c66", "#c86666", "#4f7fbf", "#9b63b5"];
  for (let index = 0; index < 80; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.setProperty("--piece-color", colors[index % colors.length]);
    wrap.appendChild(piece);
  }
  document.body.appendChild(wrap);
  window.setTimeout(() => wrap.remove(), 3600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelector("#prevWeek").addEventListener("click", () => {
  weekStart = addDays(weekStart, -7);
  render();
});

document.querySelector("#nextWeek").addEventListener("click", () => {
  weekStart = addDays(weekStart, 7);
  render();
});

todayBtn.addEventListener("click", () => {
  weekStart = getMonday(new Date());
  render();
});

document.querySelector("#clearDone").addEventListener("click", () => {
  Object.keys(plans).forEach((key) => {
    if (plans[key].done) {
      delete plans[key];
    }
  });
  savePlans();
  render();
});

planDialog.addEventListener("close", () => {
  const action = planDialog.returnValue;
  const text = planText.value.trim();
  const span = Number(endTime.value) || 1;
  const category = planCategory.value || "study";
  const dueDate = repeatUntil.value || activeDateKey;

  if (action === "save" && text) {
    if (plans[activeKey]) {
      delete plans[activeKey];
    }
    createPlanCopies(text, span, category, dueDate);
  }

  if (action === "save" && !text) {
    delete plans[activeKey];
  }

  if (action === "delete") {
    delete plans[activeKey];
  }

  activeKey = "";
  activeDateKey = "";
  activeSlot = "";
  activeSlotIndex = 0;
  savePlans();
  render();
});

carryoverDialog.addEventListener("close", () => {
  if (carryoverDialog.returnValue === "accept") {
    renderRescheduleDialog();
  }

  if (carryoverDialog.returnValue === "discard") {
    discardCarryovers();
  }
});

rescheduleDialog.addEventListener("close", () => {
  if (rescheduleDialog.returnValue === "save") {
    saveCarryoverReschedules();
  }
});

moodDialog.addEventListener("close", () => {
  if (pendingMoodKey && moodDialog.returnValue && plans[pendingMoodKey]) {
    plans[pendingMoodKey].mood = moodDialog.returnValue;
    savePlans();
    render();
  }
  pendingMoodKey = "";
});

updateBtn.addEventListener("click", () => {
  updateMessage.textContent = `当前应用版本：v${appVersion}。网页版则直接点网页更新按钮，App 版则需下载新版本。`;
  updateDialog.showModal();
});

updateDialog.addEventListener("close", () => {
  if (updateDialog.returnValue === "reload") {
    window.location.reload();
  }

  if (updateDialog.returnValue === "download") {
    downloadLatestApk();
  }
});

async function downloadLatestApk() {
  try {
    const response = await fetch(`${versionInfoUrl}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Version file unavailable");
    }

    const versionInfo = await response.json();
    if (versionInfo.apkUrl) {
      window.location.href = versionInfo.apkUrl;
      return;
    }

    showCheer("还没有配置新版 APK 下载地址。以后打包 APK 后，把下载链接写进 version.json 的 apkUrl。");
  } catch (error) {
    showCheer("暂时读取不到 version.json。部署到 GitHub Pages 后再试，或检查 version.json 是否在项目根目录。");
  }
}

renderCategoryOptions();
render();
savePlans();
window.setTimeout(() => {
  checkCarryovers();
  checkWeeklySummary();
}, 250);
