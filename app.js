const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const slots = Array.from({ length: 17 }, (_, index) => {
  const start = index + 7;
  const end = start + 1;
  return `${pad(start)}:00-${pad(end)}:00`;
});

const storageKey = "simple-week-planner";
const historyStorageKey = "simple-week-planner-history";
const viewModeStorageKey = "simple-week-planner-view-mode";
const languageStorageKey = "simple-week-planner-language";
const appVersion = "1.4.0";
const webAppUrl = "https://flashpop7.github.io/Weekly_Planner/";
const versionInfoUrl = "version.json";
const githubIssuesUrl = "https://github.com/flashpop7/Weekly_Planner/issues/new/choose";
const githubSearchUrl = "https://github.com/search?q=flashpop7+Weekly_Planner&type=repositories";
const weeklySeenKey = "simple-week-planner-weekly-seen";
const carryoverSeenKey = "simple-week-planner-carryover-seen";
const translations = {
  zh: {
    appTitle: "Weekly_Planner",
    dailyEncouragement: "每日鼓励",
    navigationTools: "顶部工具",
    dateNavigation: "日期切换",
    editTools: "编辑操作",
    tools: "功能",
    update: "更新",
    feedback: "反馈",
    undo: "撤销",
    redo: "恢复",
    langToggle: "EN",
    prevWeek: "上一周",
    nextWeek: "下一周",
    prevDay: "前一天",
    nextDay: "后一天",
    today: "今天",
    futureDayLabel: "第{count}天",
    previousDayLabel: "前{count}天",
    thisWeek: "这周",
    backToday: "回到今天",
    backThisWeek: "回到这周",
    currentWeekAria: "当前显示{label}，点击回到这周",
    todayAria: "点击回到今天",
    viewMode: "界面显示方式",
    dayView: "一天",
    weekView: "一周",
    dayViewLabel: "一天视图",
    schedule: "课程表式计划安排",
    summaryTitle: "Summary",
    clearWeek: "清空本周计划",
    clearDone: "清除已完成",
    done: "完成",
    date: "日期",
    weekday: "星期",
    time: "时间",
    planContent: "计划内容",
    endTime: "结束时间",
    repeatUntil: "持续到",
    category: "任务属性",
    categoryShort: "属性",
    planPlaceholder: "例如：复习数学、完成项目、健身训练",
    delete: "删除",
    savePlan: "保存计划",
    close: "关闭",
    carryoverTitle: "昨日剩余未完成任务",
    carryoverNote: "是否加入到今日任务中？如果选择否，这些昨日剩余未完成任务会被删除。",
    noDelete: "否，删除",
    yesAddToday: "是，加入今日",
    rescheduleTitle: "调整剩余任务时间段",
    rescheduleNote: "给每个剩余任务安排新的日期和时间段，默认会放到今天同一时间。",
    saveAdjustment: "保存调整",
    moodTitle: "完成后的心情",
    task: "任务",
    duration: "时长",
    mood: "心情",
    updateTitle: "应用更新",
    downloadNew: "下载新版",
    webUpdate: "网页更新",
    cancel: "取消",
    confirmClear: "确认清空",
    feedbackChoiceTitle: "GitHub Issues 反馈",
    feedbackChoiceNote: "请在 GitHub 搜索 flashpop7 和 Weekly_Planner，或直接打开项目 Issues 提交建议和 bug。Issues 是公开的，请不要填写隐私信息。",
    searchGithubRepo: "搜索项目",
    openGithubIssues: "打开 Issues",
    timeHeader: "时间",
    addPlan: "添加计划",
    markDone: "标记完成",
    continueUntil: "持续到 {date}",
    unrecorded: "未记录",
    hour: "小时",
    originalTime: "原时间：",
    newDate: "新日期",
    startTime: "开始时间",
    emptyDay: "点击上方时间段，输入今天的计划后，这里会显示当天总结。",
    emptyWeek: "点击上方时间段，输入本周计划后，这里会显示当前周总结。",
    previousWeekLabel: "上{count}周",
    futureWeekLabel: "第{count}周",
    undoDone: "已撤销上一步修改。",
    redoDone: "已恢复刚才撤销的修改。",
    clearWeekDone: "已清空当前显示周的计划，可以用撤销找回。",
    clearWeekEmpty: "当前显示周没有可清空的计划。",
    clearDoneDone: "已清除当前视图里的完成项，可以用撤销找回来。",
    carryoverSaved: "已把昨日剩余任务安放到新时间里，可以用撤销回退。",
    carryoverDeleted: "昨日剩余未完成任务已删除，可以用撤销找回。",
    clearWeekConfirm: "确定要清空 {range} 的全部计划吗？这个操作可以用“撤销”恢复。",
    updateMessage: "当前应用版本：v{version}。网页版则直接点网页更新按钮，App 版则需下载新版本。",
    latestVersion: "已经是最新版。今天的计划表也很清醒。",
    updateUnavailable: "暂时无法检查更新。请确认 version.json 已部署到网页根目录。",
    apkMissing: "还没有配置新版 APK 下载地址。以后打包 APK 后，把下载链接写进 version.json 的 apkUrl。",
    versionReadFail: "暂时读取不到 version.json。部署到 GitHub Pages 后再试，或检查 version.json 是否在项目根目录。",
    updateSuccess: "更新成功，已加载 v{version}。",
    weeklyTitle: "周总结表",
    weeklyEmpty: "这周未安排任务，无周总结。空白也可能是休整，只要你知道自己在做什么就好。",
    weeklyPerfect: "完美周末！这周的每一项都落地了，给认真生活的你放一场小烟花。",
    weeklyTooFull: "这周有超过 80% 的任务经常剩余到第二天。温柔地说一句：计划可能排得太满了。你不是机器，可以把目标切小一点，让完成感重新回来。",
    weeklyNormal: "这周安排了 {total} 个任务，完成 {done} 个，总计 {hours} 小时。做得不必完美，但你确实在照看自己的时间。",
  },
  en: {
    appTitle: "Weekly_Planner",
    dailyEncouragement: "Daily encouragement",
    navigationTools: "Header tools",
    dateNavigation: "Date navigation",
    editTools: "Edit actions",
    tools: "Tools",
    update: "Update",
    feedback: "Feedback",
    undo: "Undo",
    redo: "Redo",
    langToggle: "中文",
    prevWeek: "Previous week",
    nextWeek: "Next week",
    prevDay: "Previous day",
    nextDay: "Next day",
    today: "Today",
    futureDayLabel: "Day {count}",
    previousDayLabel: "{count} day(s) ago",
    thisWeek: "This week",
    backToday: "Back to today",
    backThisWeek: "Back to this week",
    currentWeekAria: "Currently showing {label}. Click to return to this week.",
    todayAria: "Click to return to today",
    viewMode: "View mode",
    dayView: "Day",
    weekView: "Week",
    dayViewLabel: "Day view",
    schedule: "Timetable planner",
    summaryTitle: "Summary",
    clearWeek: "Clear This Week",
    clearDone: "Clear Done",
    done: "Done",
    date: "Date",
    weekday: "Day",
    time: "Time",
    planContent: "Plan",
    endTime: "End time",
    repeatUntil: "Repeat until",
    category: "Category",
    categoryShort: "Category",
    planPlaceholder: "For example: review math, finish a project, work out",
    delete: "Delete",
    savePlan: "Save Plan",
    close: "Close",
    carryoverTitle: "Unfinished Tasks From Yesterday",
    carryoverNote: "Add them to today? If you choose no, these unfinished tasks will be deleted.",
    noDelete: "No, delete",
    yesAddToday: "Yes, add to today",
    rescheduleTitle: "Reschedule Remaining Tasks",
    rescheduleNote: "Choose a new date and time block for each remaining task.",
    saveAdjustment: "Save Changes",
    moodTitle: "Mood After Completion",
    task: "Task",
    duration: "Duration",
    mood: "Mood",
    updateTitle: "App Update",
    downloadNew: "Download New",
    webUpdate: "Refresh Web",
    cancel: "Cancel",
    confirmClear: "Confirm Clear",
    feedbackChoiceTitle: "GitHub Issues Feedback",
    feedbackChoiceNote: "Search GitHub for flashpop7 and Weekly_Planner, or open the project Issues page to report bugs and suggestions. Issues are public, so do not include private information.",
    searchGithubRepo: "Search Project",
    openGithubIssues: "Open Issues",
    timeHeader: "Time",
    addPlan: "Add plan",
    markDone: "Mark as done",
    continueUntil: "Until {date}",
    unrecorded: "Not recorded",
    hour: "hr",
    originalTime: "Original time: ",
    newDate: "New date",
    startTime: "Start time",
    emptyDay: "Tap a time block above and add a plan. Today's summary will appear here.",
    emptyWeek: "Tap a time block above and add weekly plans. This week's summary will appear here.",
    previousWeekLabel: "{count} week(s) ago",
    futureWeekLabel: "Week {count}",
    undoDone: "Undid the previous change.",
    redoDone: "Restored the change you just undid.",
    clearWeekDone: "Cleared plans in the current week. You can undo this.",
    clearWeekEmpty: "There are no plans to clear in the current week.",
    clearDoneDone: "Cleared completed items in the current view. You can undo this.",
    carryoverSaved: "Remaining tasks were rescheduled. You can undo this.",
    carryoverDeleted: "Unfinished tasks from yesterday were deleted. You can undo this.",
    clearWeekConfirm: "Clear all plans from {range}? You can restore them with Undo.",
    updateMessage: "Current app version: v{version}. Use Refresh Web for the web version, or download a new app build.",
    latestVersion: "You are already on the latest version.",
    updateUnavailable: "Unable to check for updates. Please make sure version.json is deployed.",
    apkMissing: "No APK download URL is configured yet. Add an apkUrl to version.json after packaging an APK.",
    versionReadFail: "Unable to read version.json. Try again after deploying to GitHub Pages.",
    updateSuccess: "Updated successfully. Loaded v{version}.",
    weeklyTitle: "Weekly Review",
    weeklyEmpty: "No tasks were scheduled this week, so there is no weekly review.",
    weeklyPerfect: "Perfect week. Every task landed. Nice work.",
    weeklyTooFull: "More than 80% of this week's tasks were carried over. Your plan may be too full. Try making goals smaller.",
    weeklyNormal: "This week had {total} task(s), {done} completed, and {hours} total hour(s). You are taking care of your time.",
  },
};
const dailyQuotes = {
  zh: [
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
  ],
  en: [
    "You do not need to leap today. Just make the next step steady.",
    "A plan is not a cage. It helps your ideas land in real time.",
    "Go slowly, but keep going. You are turning clutter into answers.",
    "Cut big goals into small tasks. Each finished block lights the way.",
    "A tiny step beyond yesterday is already enough.",
    "You do not need a perfect mood to begin. Beginning creates momentum.",
    "Every plan you write saves tomorrow-you a little energy.",
    "A clear direction can make an ordinary day feel alive.",
    "Finish first, improve later. Act first, adjust later.",
    "When you arrange time, time starts standing on your side.",
    "Do not underestimate one block today. It may start a big change.",
    "Plan clearly, act gently, finish firmly.",
    "Tasks get fewer. Skills get stronger. You are leveling up.",
    "Today's effort may not glow yet, but it is charging.",
    "Put anxiety into the grid. Put action into the hour.",
  ],
};
const cheerMessages = {
  zh: [
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
  ],
  en: [
    "Nice work. That block is yours now.",
    "Done. Today's energy bar just went up.",
    "Beautifully handled. The planner is impressed.",
    "One task solved with style.",
    "Good. That had real follow-through energy.",
    "That checkmark was a gift to future-you.",
    "Tiny win, real momentum.",
    "Done tasks make the day feel lighter.",
    "That checkmark looks good on you.",
    "Task wrapped. You earned the little spark.",
  ],
};
const categories = {
  study: { labels: { zh: "学习", en: "Study" }, icon: "📚", color: "#4f7fbf" },
  work: { labels: { zh: "工作", en: "Work" }, icon: "💼", color: "#287c66" },
  health: { labels: { zh: "健康", en: "Health" }, icon: "🌿", color: "#75a843" },
  life: { labels: { zh: "生活", en: "Life" }, icon: "🏠", color: "#d08a31" },
  creative: { labels: { zh: "创作", en: "Creative" }, icon: "✨", color: "#9b63b5" },
  social: { labels: { zh: "社交", en: "Social" }, icon: "☕", color: "#c86666" },
  rest: { labels: { zh: "休息", en: "Rest" }, icon: "🌙", color: "#60708f" },
};
const moods = [
  { value: "happy", labels: { zh: "开心 😊", en: "Happy 😊" } },
  { value: "calm", labels: { zh: "平静 🍵", en: "Calm 🍵" } },
  { value: "tired", labels: { zh: "有点累 😮‍💨", en: "A bit tired 😮‍💨" } },
  { value: "proud", labels: { zh: "很骄傲 😎", en: "Proud 😎" } },
  { value: "stuck", labels: { zh: "卡过但过了 🧩", en: "Got unstuck 🧩" } },
  { value: "light", labels: { zh: "松了一口气 🌤️", en: "Relieved 🌤️" } },
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
const undoBtn = document.querySelector("#undoBtn");
const redoBtn = document.querySelector("#redoBtn");
const clearWeekBtn = document.querySelector("#clearWeek");
const clearWeekDialog = document.querySelector("#clearWeekDialog");
const clearWeekMessage = document.querySelector("#clearWeekMessage");
const dayViewBtn = document.querySelector("#dayViewBtn");
const weekViewBtn = document.querySelector("#weekViewBtn");
const feedbackBtn = document.querySelector("#feedbackBtn");
const feedbackChoiceDialog = document.querySelector("#feedbackChoiceDialog");
const langToggle = document.querySelector("#langToggle");
const toolMenu = document.querySelector(".tool-menu");

let plans = normalizePlans(JSON.parse(localStorage.getItem(storageKey) || "{}"));
let selectedDate = new Date();
let weekStart = getMonday(selectedDate);
let viewMode = localStorage.getItem(viewModeStorageKey) === "week" ? "week" : "day";
let currentLang = localStorage.getItem(languageStorageKey) === "en" ? "en" : "zh";
let activeKey = "";
let activeDateKey = "";
let activeSlot = "";
let activeSlotIndex = 0;
let activePlansBefore = null;
let pendingCarryovers = [];
let pendingMoodKey = "";
let pendingMoodPlanId = "";
const historyLimit = 40;
const savedHistory = loadHistory();
const undoStack = savedHistory.undoStack;
const redoStack = savedHistory.redoStack;

function pad(value) {
  return String(value).padStart(2, "0");
}

function t(key, params = {}) {
  const template = translations[currentLang]?.[key] || translations.zh[key] || key;
  return Object.entries(params).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
  document.title = t("appTitle");
  langToggle.textContent = t("langToggle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
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
  if (currentLang === "en") {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatMonth(date) {
  if (currentLang === "en") {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
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

function getVisibleDates() {
  return viewMode === "day" ? [selectedDate] : getWeekDates();
}

function getVisibleWeekKeys() {
  return getWeekDates().map(toDateKey);
}

function getVisibleDateKeys() {
  return getVisibleDates().map(toDateKey);
}

function getVisibleWeekLabel() {
  const dates = getWeekDates();
  return `${formatDate(dates[0])} - ${formatDate(dates[6])}`;
}

function getWeekday(date) {
  if (currentLang === "en") {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }
  return weekdays[(date.getDay() + 6) % 7];
}

function getCategory(value) {
  const category = categories[value] || categories.study;
  return { ...category, label: category.labels[currentLang] || category.labels.zh };
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

function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(historyStorageKey) || "{}");
    return {
      undoStack: Array.isArray(saved.undoStack) ? saved.undoStack : [],
      redoStack: Array.isArray(saved.redoStack) ? saved.redoStack : [],
    };
  } catch (error) {
    return { undoStack: [], redoStack: [] };
  }
}

function saveHistory() {
  localStorage.setItem(
    historyStorageKey,
    JSON.stringify({
      undoStack: undoStack.slice(-historyLimit),
      redoStack: redoStack.slice(-historyLimit),
    }),
  );
}

function clonePlans(source = plans) {
  return JSON.parse(JSON.stringify(source));
}

function plansChanged(before, after = plans) {
  return JSON.stringify(before) !== JSON.stringify(after);
}

function updateHistoryButtons() {
  undoBtn.disabled = undoStack.length === 0;
  redoBtn.disabled = redoStack.length === 0;
  saveHistory();
}

function commitPlanChange(before) {
  if (!plansChanged(before)) {
    updateHistoryButtons();
    return false;
  }

  undoStack.push(before);
  if (undoStack.length > historyLimit) {
    undoStack.shift();
  }
  redoStack.length = 0;
  savePlans();
  render();
  updateHistoryButtons();
  return true;
}

function restorePlans(snapshot, targetStack, message) {
  targetStack.push(clonePlans(plans));
  if (targetStack.length > historyLimit) {
    targetStack.shift();
  }
  plans = normalizePlans(clonePlans(snapshot));
  savePlans();
  render();
  updateHistoryButtons();
  showCheer(message);
}

function undoLastChange() {
  const snapshot = undoStack.pop();
  if (!snapshot) {
    return;
  }
  restorePlans(snapshot, redoStack, t("undoDone"));
}

function redoLastChange() {
  const snapshot = redoStack.pop();
  if (!snapshot) {
    return;
  }
  restorePlans(snapshot, undoStack, t("redoDone"));
}

function clearVisibleWeekPlans() {
  const weekKeys = new Set(getVisibleWeekKeys());
  const before = clonePlans();

  Object.keys(plans).forEach((key) => {
    const [dateKey] = key.split("|");
    if (weekKeys.has(dateKey)) {
      delete plans[key];
    }
  });

  if (commitPlanChange(before)) {
    showCheer(t("clearWeekDone"));
  } else {
    showCheer(t("clearWeekEmpty"));
  }
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
  applyStaticTranslations();
  renderDailyQuote();
  renderHeader();
  renderViewMode();
  renderGrid();
  renderSummary();
}

function renderDailyQuote() {
  const today = new Date();
  const dateNumber = Number(`${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}`);
  const quotes = dailyQuotes[currentLang] || dailyQuotes.zh;
  dailyQuote.textContent = quotes[dateNumber % quotes.length];
}

function renderHeader() {
  const dates = getVisibleDates();
  const first = dates[0];
  const last = dates[dates.length - 1];
  monthLabel.textContent = viewMode === "day" ? formatDate(first) : formatMonth(first);
  weekRange.textContent = viewMode === "day" ? `${getWeekday(first)} · ${t("dayViewLabel")}` : `${formatDate(first)} - ${formatDate(last)}`;
  todayBtn.textContent = viewMode === "day" ? getRelativeDayLabel() : getRelativeWeekLabel();
  todayBtn.title = viewMode === "day" ? t("backToday") : t("backThisWeek");
  todayBtn.setAttribute("aria-label", viewMode === "day" ? t("todayAria") : t("currentWeekAria", { label: todayBtn.textContent }));
  document.querySelector("#prevWeek").title = viewMode === "day" ? t("prevDay") : t("prevWeek");
  document.querySelector("#prevWeek").setAttribute("aria-label", viewMode === "day" ? t("prevDay") : t("prevWeek"));
  document.querySelector("#nextWeek").title = viewMode === "day" ? t("nextDay") : t("nextWeek");
  document.querySelector("#nextWeek").setAttribute("aria-label", viewMode === "day" ? t("nextDay") : t("nextWeek"));
}

function renderViewMode() {
  dayViewBtn.classList.toggle("is-active", viewMode === "day");
  weekViewBtn.classList.toggle("is-active", viewMode === "week");
  dayViewBtn.setAttribute("aria-pressed", String(viewMode === "day"));
  weekViewBtn.setAttribute("aria-pressed", String(viewMode === "week"));
  scheduleGrid.classList.toggle("is-day-view", viewMode === "day");
}

function getRelativeWeekLabel() {
  const currentWeekStart = getMonday(new Date());
  const diffDays = Math.round((weekStart - currentWeekStart) / 86400000);
  const diffWeeks = Math.round(diffDays / 7);

  if (diffWeeks === 0) {
    return t("thisWeek");
  }

  if (diffWeeks > 0) {
    return t("futureWeekLabel", { count: diffWeeks + 1 });
  }

  return t("previousWeekLabel", { count: Math.abs(diffWeeks) });
}

function getRelativeDayLabel() {
  const currentDay = fromDateKey(todayKey());
  const selectedDay = fromDateKey(toDateKey(selectedDate));
  const diffDays = Math.round((selectedDay - currentDay) / 86400000);

  if (diffDays === 0) {
    return t("today");
  }

  if (diffDays > 0) {
    return t("futureDayLabel", { count: diffDays + 1 });
  }

  return t("previousDayLabel", { count: Math.abs(diffDays) });
}

function renderGrid() {
  const dates = getVisibleDates();
  scheduleGrid.innerHTML = "";
  scheduleGrid.appendChild(createCell(t("timeHeader"), "corner-cell", 1, 1));

  dates.forEach((date, index) => {
    const cell = createCell("", "day-cell", index + 2, 1);
    cell.innerHTML = `<span class="weekday">${getWeekday(date)}</span><span class="date">${formatDate(date)}</span>`;
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
      button.dataset.weekday = getWeekday(date);
      button.dataset.slot = slot;
      button.dataset.slotIndex = String(slotIndex);
      button.innerHTML = plan
        ? `<span class="plan-meta">${category.icon} ${category.label}${plan.mood ? ` · ${escapeHtml(getMoodLabel(plan.mood))}` : ""}</span><span class="plan-title">${escapeHtml(plan.text)}</span>`
        : `<span class="plan-title">${t("addPlan")}</span>`;
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
  activePlansBefore = clonePlans();

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
  planDialog.returnValue = "";
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
  const visibleKeys = new Set(getVisibleDateKeys());
  const entries = getSortedEntries().filter((entry) => visibleKeys.has(entry.dateKey));
  summaryBody.innerHTML = "";
  emptyState.hidden = entries.length > 0;
  emptyState.textContent = viewMode === "day" ? t("emptyDay") : t("emptyWeek");

  entries.forEach((entry) => {
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.className = entry.done ? "done-row" : "";
    row.innerHTML = `
      <td><input type="checkbox" ${entry.done ? "checked" : ""} aria-label="${t("markDone")}"></td>
      <td>${escapeHtml(entry.dateKey)}</td>
      <td>${escapeHtml(entry.weekday)}</td>
      <td>${escapeHtml(getTimeRange(entry.slot, entry.span))}</td>
      <td>
        <span class="pill" style="--category-color:${category.color}; border:1px solid ${category.color};">${category.icon} ${category.label}</span>
        ${entry.dueDate && entry.dueDate > entry.dateKey ? `<span class="pill">${t("continueUntil", { date: escapeHtml(entry.dueDate) })}</span>` : ""}
        ${entry.mood ? `<span class="pill">${escapeHtml(getMoodLabel(entry.mood))}</span>` : ""}
        <div>${escapeHtml(entry.text)}</div>
      </td>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      const before = clonePlans();
      const wasDone = plans[entry.key].done;
      plans[entry.key].done = event.target.checked;
      commitPlanChange(before);
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
      const weekday = getWeekday(fromDateKey(dateKey));
      return { key, dateKey, slot, weekday, ...plan };
    })
    .sort((a, b) => `${a.dateKey} ${a.slot}`.localeCompare(`${b.dateKey} ${b.slot}`));
}

function getMoodLabel(value) {
  const mood = moods.find((item) => item.value === value);
  return mood?.labels[currentLang] || mood?.labels.zh || value;
}

function showCheer(message = "") {
  const card = document.createElement("div");
  card.className = "cheer-card";
  const messages = cheerMessages[currentLang] || cheerMessages.zh;
  card.textContent = message || messages[Math.floor(Math.random() * messages.length)];
  cheerStack.appendChild(card);
  window.setTimeout(() => card.remove(), 3100);
}

function openMoodDialog(key) {
  pendingMoodKey = key;
  pendingMoodPlanId = plans[key]?.id || "";
  moodGrid.innerHTML = "";
  moods.forEach((mood) => {
    const button = document.createElement("button");
    button.className = "mood-button";
    button.type = "submit";
    button.value = mood.value;
    button.textContent = mood.labels[currentLang] || mood.labels.zh;
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
      <small>${t("originalTime")}${escapeHtml(entry.dateKey)} · ${escapeHtml(getTimeRange(entry.slot, entry.span))}</small>
      <div class="reschedule-row">
        <label>${t("newDate")}
          <input class="carry-date" type="date" value="${today}" min="${today}">
        </label>
        <label>${t("startTime")}
          <select class="carry-start">${slots.map((slot) => `<option value="${slot}" ${slot === entry.slot ? "selected" : ""}>${slot}</option>`).join("")}</select>
        </label>
        <label>${t("endTime")}
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
  const before = clonePlans();

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
  if (commitPlanChange(before)) {
    showCheer(t("carryoverSaved"));
  }
}

function discardCarryovers() {
  const before = clonePlans();
  pendingCarryovers.forEach((entry) => {
    delete plans[entry.key];
  });
  localStorage.setItem(carryoverSeenKey, getCarryoverSignature());
  if (commitPlanChange(before)) {
    showCheer(t("carryoverDeleted"));
  }
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

  weeklyTitle.textContent = t("weeklyTitle");
  weeklyChart.innerHTML = "";
  weeklyBody.innerHTML = "";

  if (!entries.length) {
    weeklyMessage.textContent = t("weeklyEmpty");
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
      <td>${getDurationHours(entry.span)} ${t("hour")}</td>
      <td>${entry.mood ? escapeHtml(getMoodLabel(entry.mood)) : t("unrecorded")}</td>
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
      <span>${hours} ${t("hour")}</span>
    `;
    weeklyChart.appendChild(row);
  });

  if (completed.length === entries.length && carried.length === 0) {
    weeklyMessage.textContent = t("weeklyPerfect");
    weeklyDialog.showModal();
    launchConfetti();
    return;
  }

  if (carriedRatio > 0.8) {
    weeklyMessage.textContent = t("weeklyTooFull");
  } else {
    weeklyMessage.textContent = t("weeklyNormal", { total: entries.length, done: completed.length, hours: totalHours });
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

function setViewMode(nextMode) {
  viewMode = nextMode;
  localStorage.setItem(viewModeStorageKey, viewMode);
  weekStart = getMonday(selectedDate);
  render();
}

function setLanguage(nextLang) {
  const selectedCategory = planCategory.value;
  currentLang = nextLang;
  localStorage.setItem(languageStorageKey, currentLang);
  renderCategoryOptions();
  if (selectedCategory) {
    planCategory.value = selectedCategory;
  }
  render();
}

function closeToolMenu() {
  toolMenu.open = false;
}

function openFeedbackUrl(url) {
  window.open(url, "_blank", "noopener");
}

function openFeedbackEntry() {
  feedbackChoiceDialog.returnValue = "";
  feedbackChoiceDialog.showModal();
}

dayViewBtn.addEventListener("click", () => setViewMode("day"));
weekViewBtn.addEventListener("click", () => setViewMode("week"));

langToggle.addEventListener("click", () => {
  setLanguage(currentLang === "zh" ? "en" : "zh");
  closeToolMenu();
});

feedbackBtn.addEventListener("click", () => {
  closeToolMenu();
  openFeedbackEntry();
});

feedbackChoiceDialog.addEventListener("close", () => {
  if (feedbackChoiceDialog.returnValue === "issues") {
    openFeedbackUrl(githubIssuesUrl);
  }

  if (feedbackChoiceDialog.returnValue === "search") {
    openFeedbackUrl(githubSearchUrl);
  }
});

document.querySelector("#prevWeek").addEventListener("click", () => {
  selectedDate = addDays(selectedDate, viewMode === "day" ? -1 : -7);
  weekStart = getMonday(selectedDate);
  render();
});

document.querySelector("#nextWeek").addEventListener("click", () => {
  selectedDate = addDays(selectedDate, viewMode === "day" ? 1 : 7);
  weekStart = getMonday(selectedDate);
  render();
});

todayBtn.addEventListener("click", () => {
  selectedDate = new Date();
  weekStart = getMonday(selectedDate);
  render();
});

document.querySelector("#clearDone").addEventListener("click", () => {
  const visibleKeys = new Set(getVisibleDateKeys());
  const before = clonePlans();
  Object.keys(plans).forEach((key) => {
    const [dateKey] = key.split("|");
    if (visibleKeys.has(dateKey) && plans[key].done) {
      delete plans[key];
    }
  });
  if (commitPlanChange(before)) {
    showCheer(t("clearDoneDone"));
  }
});

clearWeekBtn.addEventListener("click", () => {
  clearWeekMessage.textContent = t("clearWeekConfirm", { range: getVisibleWeekLabel() });
  clearWeekDialog.returnValue = "";
  clearWeekDialog.showModal();
});

clearWeekDialog.addEventListener("close", () => {
  if (clearWeekDialog.returnValue === "confirm") {
    clearVisibleWeekPlans();
  }
});

planDialog.addEventListener("close", () => {
  const action = planDialog.returnValue;
  const text = planText.value.trim();
  const span = Number(endTime.value) || 1;
  const category = planCategory.value || "study";
  const dueDate = repeatUntil.value || activeDateKey;
  const before = activePlansBefore || clonePlans();

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
  activePlansBefore = null;
  commitPlanChange(before);
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
  if (pendingMoodKey && moodDialog.returnValue && plans[pendingMoodKey]?.id === pendingMoodPlanId) {
    const before = clonePlans();
    plans[pendingMoodKey].mood = moodDialog.returnValue;
    commitPlanChange(before);
  }
  pendingMoodKey = "";
  pendingMoodPlanId = "";
});

undoBtn.addEventListener("click", undoLastChange);
redoBtn.addEventListener("click", redoLastChange);

updateBtn.addEventListener("click", () => {
  closeToolMenu();
  updateMessage.textContent = t("updateMessage", { version: appVersion });
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
      showCheer(t("latestVersion"));
      return;
    }

    sessionStorage.setItem("weekly-planner-update-message", t("updateSuccess", { version: latestVersion }));

    if (window.location.href.startsWith(webAppUrl)) {
      window.location.reload();
      return;
    }

    window.location.href = `${webAppUrl}?updated=1`;
  } catch (error) {
    showCheer(t("updateUnavailable"));
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

    showCheer(t("apkMissing"));
  } catch (error) {
    showCheer(t("versionReadFail"));
  }
}

renderCategoryOptions();
render();
savePlans();
updateHistoryButtons();
showPendingUpdateMessage();
window.setTimeout(() => {
  checkCarryovers();
  checkWeeklySummary();
}, 250);

function showPendingUpdateMessage() {
  const url = new URL(window.location.href);
  const message = sessionStorage.getItem("weekly-planner-update-message");

  if (message) {
    sessionStorage.removeItem("weekly-planner-update-message");
    showCheer(message);
  }

  if (url.searchParams.get("updated") === "1") {
    showCheer(t("updateSuccess", { version: appVersion }));
    url.searchParams.delete("updated");
    window.history.replaceState({}, "", url.toString());
  }
}
