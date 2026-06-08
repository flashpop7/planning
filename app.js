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
const backgroundStorageKey = "simple-week-planner-background";
const quoteStorageKey = "simple-week-planner-quote";
const appVersion = "1.7.4";
const webAppUrl = "https://flashpop7.github.io/Weekly_Planner/";
const versionInfoUrl = "version.json";
const githubIssuesUrl = "https://github.com/flashpop7/Weekly_Planner/issues/new/choose";
const githubSearchUrl = "https://github.com/search?q=flashpop7+Weekly_Planner&type=repositories";
const weeklySeenKey = "simple-week-planner-weekly-seen";
const carryoverSeenKey = "simple-week-planner-carryover-seen";
const themePresets = [
  {
    id: "fresh",
    color: "#f6f7f4",
    labels: { zh: "清爽", en: "Fresh" },
    vars: {},
  },
  {
    id: "warm",
    color: "#f4f0e8",
    labels: { zh: "暖白", en: "Warm" },
    vars: { "--accent": "#9a6a2f", "--accent-dark": "#68451e", "--soft": "#efe5d4" },
  },
  {
    id: "mint",
    color: "#edf5ec",
    labels: { zh: "薄荷", en: "Mint" },
    vars: { "--accent": "#287c66", "--accent-dark": "#1e5e4e", "--soft": "#dfeee7" },
  },
  {
    id: "graphite",
    color: "#151a1d",
    labels: { zh: "石墨黑", en: "Graphite" },
    vars: {
      "--ink": "#f2f5f4",
      "--muted": "#b9c4c0",
      "--line": "rgba(230, 238, 235, 0.28)",
      "--soft": "rgba(255, 255, 255, 0.1)",
      "--accent": "#79d2b6",
      "--accent-dark": "#b9f1de",
      "--panel-bg": "rgba(12, 16, 18, 0.34)",
      "--panel-bg-strong": "rgba(20, 27, 30, 0.58)",
      "--cell-bg": "rgba(12, 16, 18, 0.28)",
      "--cell-bg-strong": "rgba(20, 27, 30, 0.48)",
      "--solid-panel": "#11171a",
      "--solid-field": "#182125",
      "--solid-hover": "#213035",
      "--solid-ink": "#f7fbfa",
      "--solid-muted": "#d2ddd9",
    },
  },
  {
    id: "midnight",
    color: "#111827",
    labels: { zh: "午夜蓝", en: "Midnight" },
    vars: {
      "--ink": "#f4f7fb",
      "--muted": "#bdc8d8",
      "--line": "rgba(219, 229, 245, 0.28)",
      "--soft": "rgba(255, 255, 255, 0.1)",
      "--accent": "#8ab4ff",
      "--accent-dark": "#c8dcff",
      "--panel-bg": "rgba(10, 18, 32, 0.36)",
      "--panel-bg-strong": "rgba(18, 30, 50, 0.58)",
      "--cell-bg": "rgba(10, 18, 32, 0.28)",
      "--cell-bg-strong": "rgba(18, 30, 50, 0.5)",
      "--solid-panel": "#111d31",
      "--solid-field": "#182845",
      "--solid-hover": "#22375c",
      "--solid-ink": "#f8fbff",
      "--solid-muted": "#d4deee",
    },
  },
  {
    id: "plum",
    color: "#251526",
    labels: { zh: "深梅紫", en: "Plum" },
    vars: {
      "--ink": "#fff4fb",
      "--muted": "#dac3d7",
      "--line": "rgba(245, 220, 240, 0.28)",
      "--soft": "rgba(255, 255, 255, 0.1)",
      "--accent": "#f0a6d8",
      "--accent-dark": "#ffd5ef",
      "--panel-bg": "rgba(35, 16, 37, 0.36)",
      "--panel-bg-strong": "rgba(50, 24, 54, 0.58)",
      "--cell-bg": "rgba(35, 16, 37, 0.28)",
      "--cell-bg-strong": "rgba(50, 24, 54, 0.5)",
      "--solid-panel": "#2a1830",
      "--solid-field": "#37203f",
      "--solid-hover": "#472a50",
      "--solid-ink": "#fff8fd",
      "--solid-muted": "#ead2e8",
    },
  },
  {
    id: "forest",
    color: "#102018",
    labels: { zh: "深林绿", en: "Forest" },
    vars: {
      "--ink": "#f2fbf4",
      "--muted": "#bbd1c2",
      "--line": "rgba(221, 241, 226, 0.28)",
      "--soft": "rgba(255, 255, 255, 0.1)",
      "--accent": "#8ddaa6",
      "--accent-dark": "#c8f4d5",
      "--panel-bg": "rgba(9, 27, 18, 0.36)",
      "--panel-bg-strong": "rgba(17, 42, 29, 0.58)",
      "--cell-bg": "rgba(9, 27, 18, 0.28)",
      "--cell-bg-strong": "rgba(17, 42, 29, 0.5)",
      "--solid-panel": "#11291d",
      "--solid-field": "#173826",
      "--solid-hover": "#204b33",
      "--solid-ink": "#f8fff9",
      "--solid-muted": "#d0e5d5",
    },
  },
];
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
    background: "主题",
    quoteSettings: "鼓励语",
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
    planContent: "任务模块",
    progress: "进度",
    endTime: "结束时间",
    repeatUntil: "持续到",
    category: "任务属性",
    categoryShort: "属性",
    planPlaceholder: "例如：复习数学、完成项目、健身训练",
    subtasks: "小任务",
    subtaskPlaceholder: "小任务名称",
    subtaskHint: "点击“添加小任务”自定义拆分数量和名称。没有小任务时，任务模块只有 0% 和 100% 两种进度。",
    addSubtask: "添加小任务",
    removeSubtask: "删除小任务",
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
    progressTitle: "Progress",
    moduleEmpty: "当前范围还没有任务模块。",
    dayProgress: "今日",
    weekProgress: "本周",
    monthProgress: "本月",
    progressDetail: "{done}/{total} 个任务完成",
    subtaskProgressDetail: "{done}/{total} 个小任务完成",
    noSubtasks: "未拆分小任务",
    themeStyle: "主题样式",
    backgroundTitle: "主题设置",
    backgroundNote: "上方按钮用于切换界面主题样式。下方可以选择相册图片作为页面背景，图片只保存在当前浏览器里，不会上传。",
    photoBackground: "页面背景图片",
    clearBackgroundImage: "清除图片",
    saveBackground: "完成",
    backgroundSaved: "主题设置已更新。",
    imageTooLarge: "图片太大了，建议选择 2MB 以内的图片。",
    quoteTitle: "每日鼓励设置",
    quoteNote: "可以使用系统提供的鼓励语，也可以写一段自己的鼓励语显示在顶部。",
    systemQuote: "系统提供",
    customQuote: "自己写",
    customQuoteText: "自定义鼓励语",
    customQuotePlaceholder: "写一句送给自己的鼓励",
    saveQuote: "保存鼓励语",
    quoteSaved: "每日鼓励已更新。",
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
    timeOverlapWarning: "{date} {time} 已有任务“{task}”。请重新选时间段，或在这个任务模块里添加小任务。",
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
    background: "Theme",
    quoteSettings: "Quote",
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
    planContent: "Task Module",
    progress: "Progress",
    endTime: "End time",
    repeatUntil: "Repeat until",
    category: "Category",
    categoryShort: "Category",
    planPlaceholder: "For example: review math, finish a project, work out",
    subtasks: "Subtasks",
    subtaskPlaceholder: "Subtask name",
    subtaskHint: "Use Add Subtask to choose how many subtasks this module has. Without subtasks, progress is 0% or 100%.",
    addSubtask: "Add Subtask",
    removeSubtask: "Remove Subtask",
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
    progressTitle: "Progress",
    moduleEmpty: "No task modules in this range yet.",
    dayProgress: "Today",
    weekProgress: "This Week",
    monthProgress: "This Month",
    progressDetail: "{done}/{total} task(s) done",
    subtaskProgressDetail: "{done}/{total} subtask(s) done",
    noSubtasks: "No subtasks",
    themeStyle: "Theme style",
    backgroundTitle: "Theme Settings",
    backgroundNote: "Use the buttons above to switch the interface theme. You can also choose a photo below as the page background. The image stays in this browser and is not uploaded.",
    photoBackground: "Page background photo",
    clearBackgroundImage: "Clear Photo",
    saveBackground: "Done",
    backgroundSaved: "Theme settings updated.",
    imageTooLarge: "That image is too large. Try an image under 2MB.",
    quoteTitle: "Daily Quote Settings",
    quoteNote: "Use a system quote, or write your own encouragement for the top of the page.",
    systemQuote: "System",
    customQuote: "Custom",
    customQuoteText: "Custom quote",
    customQuotePlaceholder: "Write a line of encouragement for yourself",
    saveQuote: "Save Quote",
    quoteSaved: "Daily quote updated.",
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
    timeOverlapWarning: "{date} {time} already has “{task}”. Please choose another time block, or add subtasks inside that task module.",
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
const subtaskEditor = document.querySelector("#subtaskEditor");
const addSubtask = document.querySelector("#addSubtask");
const startTimeInput = document.querySelector("#startTimeInput");
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
const progressStats = document.querySelector("#progressStats");
const taskModules = document.querySelector("#taskModules");
const moduleEmpty = document.querySelector("#moduleEmpty");
const feedbackBtn = document.querySelector("#feedbackBtn");
const feedbackChoiceDialog = document.querySelector("#feedbackChoiceDialog");
const backgroundBtn = document.querySelector("#backgroundBtn");
const backgroundDialog = document.querySelector("#backgroundDialog");
const themeSwatches = document.querySelector("#themeSwatches");
const backgroundImageInput = document.querySelector("#backgroundImageInput");
const clearBackgroundImage = document.querySelector("#clearBackgroundImage");
const quoteBtn = document.querySelector("#quoteBtn");
const quoteDialog = document.querySelector("#quoteDialog");
const quoteSystem = document.querySelector("#quoteSystem");
const quoteCustom = document.querySelector("#quoteCustom");
const customQuoteText = document.querySelector("#customQuoteText");
const langToggle = document.querySelector("#langToggle");
const toolMenu = document.querySelector(".tool-menu");

let plans = normalizePlans(JSON.parse(localStorage.getItem(storageKey) || "{}"));
let selectedDate = new Date();
let weekStart = getMonday(selectedDate);
let viewMode = localStorage.getItem(viewModeStorageKey) === "week" ? "week" : "day";
let currentLang = localStorage.getItem(languageStorageKey) === "en" ? "en" : "zh";
let backgroundSettings = loadBackgroundSettings();
let quoteSettings = loadQuoteSettings();
let activeKey = "";
let activeDateKey = "";
let activeSlot = "";
let activeSlotIndex = 0;
let activeStartMinutes = 420;
let activeEndMinutes = 480;
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

function timeToMinutes(time) {
  const [hours, minutes] = String(time || "00:00").split(":").map(Number);
  return Math.max(0, Math.min(1440, (hours || 0) * 60 + (minutes || 0)));
}

function minutesToTime(minutes) {
  const bounded = Math.max(0, Math.min(1440, Number(minutes) || 0));
  const hours = Math.floor(bounded / 60);
  const mins = bounded % 60;
  return `${pad(hours)}:${pad(mins)}`;
}

function minutesToInputTime(minutes) {
  return minutes >= 1440 ? "23:59" : minutesToTime(minutes);
}

function parseTimeRange(range) {
  const [start = "07:00", end = "08:00"] = String(range || "").split("-");
  return { start, end };
}

function makeTimeRange(start, end) {
  return `${start}-${end}`;
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
      const range = parseTimeRange(slot);
      const oldStartIndex = slots.indexOf(slot);
      const inferredStart = plan.startTime || range.start;
      const inferredEnd =
        plan.endTime ||
        (oldStartIndex >= 0
          ? getSlotEnd(slots[Math.min(slots.length - 1, oldStartIndex + (Number(plan.span) || 1) - 1)])
          : range.end);
      const subtasks = Array.isArray(plan.subtasks)
        ? plan.subtasks
            .filter((item) => item && String(item.text || "").trim())
            .map((item, index) => ({
              id: item.id || `${dateKey}-${slot}-subtask-${index}-${Math.random().toString(36).slice(2, 7)}`,
              text: String(item.text || "").trim(),
              done: Boolean(item.done),
            }))
        : [];
      return [
        key,
        {
            id: plan.id || `${dateKey}-${slot}-${Math.random().toString(36).slice(2, 8)}`,
            text: plan.text || "",
            done: subtasks.length ? subtasks.every((item) => item.done) : Boolean(plan.done),
            span: Math.max(1, Number(plan.span) || 1),
            startTime: inferredStart,
            endTime: inferredEnd,
            category: plan.category || "study",
          dueDate: plan.dueDate || dateKey,
          createdDate: plan.createdDate || dateKey,
          mood: plan.mood || "",
          carriedCount: Number(plan.carriedCount) || 0,
          carriedFrom: plan.carriedFrom || "",
          subtasks,
        },
      ];
    }),
  );
}

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(plans));
}

function getPlanProgress(plan) {
  if (!plan) {
    return 0;
  }

  if (plan.subtasks?.length) {
    const completed = plan.subtasks.filter((item) => item.done).length;
    return Math.round((completed / plan.subtasks.length) * 100);
  }

  return plan.done ? 100 : 0;
}

function syncPlanDone(plan) {
  plan.done = getPlanProgress(plan) === 100;
}

function createSubtaskInputRow(subtask = {}) {
  const row = document.createElement("div");
  row.className = "subtask-edit-row";
  row.dataset.id = subtask.id || `subtask-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  row.dataset.done = String(Boolean(subtask.done));
  row.innerHTML = `
    <input type="text" value="${escapeHtml(subtask.text || "")}" placeholder="${t("subtaskPlaceholder")}">
    <button class="icon-button compact-icon" type="button" title="${t("removeSubtask")}" aria-label="${t("removeSubtask")}">×</button>
  `;
  row.querySelector("button").addEventListener("click", () => {
    row.remove();
  });
  return row;
}

function renderSubtaskEditor(subtasks = []) {
  subtaskEditor.innerHTML = "";
  subtasks.forEach((subtask) => {
    subtaskEditor.appendChild(createSubtaskInputRow(subtask));
  });
}

function collectSubtasksFromEditor() {
  return Array.from(subtaskEditor.querySelectorAll(".subtask-edit-row"))
    .map((row) => {
      const text = row.querySelector("input").value.trim();
      return {
        id: row.dataset.id,
        text,
        done: row.dataset.done === "true",
      };
    })
    .filter((item) => item.text);
}

function loadBackgroundSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(backgroundStorageKey) || "{}");
    const fallbackTheme = themePresets.find((theme) => theme.color === saved.color) || themePresets[0];
    return {
      theme: saved.theme || fallbackTheme.id,
      color: saved.color || fallbackTheme.color,
      image: saved.image || "",
    };
  } catch (error) {
    return { theme: themePresets[0].id, color: themePresets[0].color, image: "" };
  }
}

function saveBackgroundSettings() {
  localStorage.setItem(backgroundStorageKey, JSON.stringify(backgroundSettings));
}

function loadQuoteSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(quoteStorageKey) || "{}");
    return {
      mode: saved.mode === "custom" ? "custom" : "system",
      customText: String(saved.customText || ""),
    };
  } catch (error) {
    return { mode: "system", customText: "" };
  }
}

function saveQuoteSettings() {
  localStorage.setItem(quoteStorageKey, JSON.stringify(quoteSettings));
}

function applyBackgroundSettings() {
  const root = document.documentElement;
  const selectedTheme = themePresets.find((theme) => theme.id === backgroundSettings.theme) || themePresets[0];
  const defaultVars = {
    "--ink": "#202327",
    "--muted": "#6d7380",
    "--line": "#dfe4e1",
    "--soft": "#edf4f1",
    "--accent": "#287c66",
    "--accent-dark": "#1e5e4e",
    "--panel-bg": "rgba(255, 255, 255, 0.24)",
    "--panel-bg-strong": "rgba(255, 255, 255, 0.46)",
    "--cell-bg": "rgba(255, 255, 255, 0.18)",
    "--cell-bg-strong": "rgba(255, 255, 255, 0.36)",
    "--solid-panel": "#ffffff",
    "--solid-field": "#f7fbf9",
    "--solid-hover": "#edf4f1",
    "--solid-ink": "#202327",
    "--solid-muted": "#4f5964",
  };

  Object.entries(defaultVars).forEach(([name, value]) => root.style.setProperty(name, value));
  Object.entries(selectedTheme.vars || {}).forEach(([name, value]) => root.style.setProperty(name, value));
  root.style.setProperty("--user-bg", backgroundSettings.color || selectedTheme.color);
  document.documentElement.style.setProperty(
    "--user-bg-image",
    backgroundSettings.image ? `url("${backgroundSettings.image}")` : "none",
  );
  document.body.classList.toggle("has-photo-bg", Boolean(backgroundSettings.image));
}

function renderBackgroundControls() {
  themeSwatches.innerHTML = "";
  themePresets.forEach((theme) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `theme-swatch${theme.id === backgroundSettings.theme ? " is-active" : ""}`;
    button.style.setProperty("--swatch-color", theme.color);
    button.style.setProperty("--swatch-text", theme.vars?.["--ink"] || "#202327");
    button.textContent = theme.labels[currentLang] || theme.labels.zh;
    button.addEventListener("click", () => {
      backgroundSettings.theme = theme.id;
      backgroundSettings.color = theme.color;
      saveBackgroundSettings();
      applyBackgroundSettings();
      renderBackgroundControls();
      showCheer(t("backgroundSaved"));
    });
    themeSwatches.appendChild(button);
  });
}

function openQuoteDialog() {
  closeToolMenu();
  quoteSystem.checked = quoteSettings.mode !== "custom";
  quoteCustom.checked = quoteSettings.mode === "custom";
  customQuoteText.value = quoteSettings.customText || "";
  quoteDialog.returnValue = "";
  quoteDialog.showModal();
  if (quoteCustom.checked) {
    customQuoteText.focus();
  }
}

function openBackgroundDialog() {
  closeToolMenu();
  renderBackgroundControls();
  backgroundDialog.returnValue = "";
  try {
    backgroundDialog.showModal();
  } catch (error) {
    showCheer(t("backgroundTitle"));
  }
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
  if (!slots.includes(slot)) {
    return slot;
  }
  const startIndex = slots.indexOf(slot);
  const endIndex = Math.min(slots.length - 1, startIndex + span - 1);
  return `${getSlotStart(slot)}-${getSlotEnd(slots[endIndex])}`;
}

function getPlanStartMinutes(planOrEntry) {
  return timeToMinutes(planOrEntry.startTime || parseTimeRange(planOrEntry.slot).start);
}

function getPlanEndMinutes(planOrEntry) {
  return timeToMinutes(planOrEntry.endTime || parseTimeRange(planOrEntry.slot).end);
}

function getPlanTimeRange(planOrEntry) {
  return makeTimeRange(minutesToTime(getPlanStartMinutes(planOrEntry)), minutesToTime(getPlanEndMinutes(planOrEntry)));
}

function getDurationHours(spanOrEntry = 1) {
  if (typeof spanOrEntry === "object") {
    const minutes = Math.max(5, getPlanEndMinutes(spanOrEntry) - getPlanStartMinutes(spanOrEntry));
    return Math.round((minutes / 60) * 10) / 10;
  }

  return Math.max(1, Number(spanOrEntry) || 1);
}

function getPlansForDate(dateKey) {
  return Object.entries(plans)
    .filter(([key]) => key.split("|")[0] === dateKey)
    .map(([key, plan]) => ({ key, plan }))
    .sort((a, b) => getPlanStartMinutes(a.plan) - getPlanStartMinutes(b.plan));
}

function getTimelineSegments(dates) {
  const boundaries = new Set([420, 1440]);
  dates.forEach((date) => {
    getPlansForDate(toDateKey(date)).forEach(({ plan }) => {
      boundaries.add(getPlanStartMinutes(plan));
      boundaries.add(getPlanEndMinutes(plan));
    });
  });

  const sorted = Array.from(boundaries).sort((a, b) => a - b);
  return sorted.slice(0, -1).map((start, index) => ({ start, end: sorted[index + 1] })).filter((segment) => segment.end > segment.start);
}

function getPlanAtSegment(dateKey, segment) {
  const matching = getPlansForDate(dateKey).find(({ plan }) => {
    const planStart = getPlanStartMinutes(plan);
    const planEnd = getPlanEndMinutes(plan);
    return planStart < segment.end && planEnd > segment.start;
  });

  if (!matching) {
    return null;
  }

  const planStart = getPlanStartMinutes(matching.plan);
  return {
    ...matching,
    isStart: planStart === segment.start,
  };
}

function getSegmentSpan(segments, plan) {
  const planStart = getPlanStartMinutes(plan);
  const planEnd = getPlanEndMinutes(plan);
  return segments.filter((segment) => segment.start >= planStart && segment.end <= planEnd).length || 1;
}

function findOverlappingPlan(dateKey, startMinutes, endMinutes, ignoredKeys = []) {
  const ignored = new Set(ignoredKeys.filter(Boolean));
  return getPlansForDate(dateKey).find(({ key, plan }) => {
    if (ignored.has(key)) {
      return false;
    }

    const planStart = getPlanStartMinutes(plan);
    const planEnd = getPlanEndMinutes(plan);
    return planStart < endMinutes && planEnd > startMinutes;
  });
}

function getOverlapWarning(overlap, dateKey) {
  return t("timeOverlapWarning", {
    date: dateKey,
    time: getPlanTimeRange(overlap.plan),
    task: overlap.plan.text || t("unrecorded"),
  });
}

function findPlanCopyOverlap(startTime, endTimeValue, dueDate, ignoredKeys = []) {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTimeValue);
  const startDate = fromDateKey(activeDateKey);
  const endDate = fromDateKey(dueDate);

  for (let date = new Date(startDate); date <= endDate; date = addDays(date, 1)) {
    const dateKey = toDateKey(date);
    const overlap = findOverlappingPlan(dateKey, startMinutes, endMinutes, ignoredKeys);
    if (overlap) {
      return { ...overlap, dateKey };
    }
  }

  return null;
}

function render() {
  applyStaticTranslations();
  applyBackgroundSettings();
  renderDailyQuote();
  renderHeader();
  renderViewMode();
  renderGrid();
  renderProgress();
  renderSummary();
}

function renderDailyQuote() {
  if (quoteSettings.mode === "custom" && quoteSettings.customText.trim()) {
    dailyQuote.textContent = quoteSettings.customText.trim();
    return;
  }

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
  const segments = getTimelineSegments(dates);
  scheduleGrid.innerHTML = "";
  scheduleGrid.appendChild(createCell(t("timeHeader"), "corner-cell", 1, 1));

  dates.forEach((date, index) => {
    const cell = createCell("", "day-cell", index + 2, 1);
    cell.innerHTML = `<span class="weekday">${getWeekday(date)}</span><span class="date">${formatDate(date)}</span>`;
    scheduleGrid.appendChild(cell);
  });

  segments.forEach((segment, segmentIndex) => {
    const timeCell = createCell(makeTimeRange(minutesToTime(segment.start), minutesToTime(segment.end)), "time-cell", 1, segmentIndex + 2);
    timeCell.style.minHeight = `${Math.max(42, Math.min(160, (segment.end - segment.start) * 0.9))}px`;
    scheduleGrid.appendChild(timeCell);
  });

  dates.forEach((date, dayIndex) => {
    const dateKey = toDateKey(date);

    segments.forEach((segment, segmentIndex) => {
      const coveredPlan = getPlanAtSegment(dateKey, segment);
      if (coveredPlan && !coveredPlan.isStart) {
        return;
      }

      const slot = makeTimeRange(minutesToTime(segment.start), minutesToTime(segment.end));
      const key = coveredPlan?.key || makeKey(dateKey, slot);
      const plan = coveredPlan?.plan;
      const category = getCategory(plan?.category);
      const progress = getPlanProgress(plan);
      const span = plan ? getSegmentSpan(segments, plan) : 1;
      const cell = createCell("", "plan-cell", dayIndex + 2, segmentIndex + 2, span);
      cell.style.minHeight = `${Math.max(42, Math.min(160, (segment.end - segment.start) * 0.9))}px`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `plan-button${plan ? " has-plan" : ""}${plan?.done ? " is-done" : ""}`;
      button.style.setProperty("--category-color", category.color);
      button.dataset.key = key;
      button.dataset.date = dateKey;
      button.dataset.weekday = getWeekday(date);
      button.dataset.slot = slot;
      button.dataset.start = String(segment.start);
      button.dataset.end = String(segment.end);
      button.innerHTML = plan
        ? `<span class="plan-meta">${category.icon} ${category.label} · ${progress}%${plan.mood ? ` · ${escapeHtml(getMoodLabel(plan.mood))}` : ""}</span><span class="plan-title">${escapeHtml(plan.text)}</span>`
        : `<span class="plan-title">${t("addPlan")}</span>`;
      button.addEventListener("click", openPlanDialog);
      cell.appendChild(button);
      scheduleGrid.appendChild(cell);
    });
  });
}

function getMonthDateKeys(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const keys = [];
  for (let cursor = new Date(first); cursor.getMonth() === first.getMonth(); cursor = addDays(cursor, 1)) {
    keys.push(toDateKey(cursor));
  }
  return keys;
}

function getEntriesForDateKeys(keys) {
  const keySet = new Set(keys);
  return getSortedEntries().filter((entry) => keySet.has(entry.dateKey));
}

function getCompletionStats(entries) {
  const total = entries.length;
  if (!total) {
    return { total: 0, done: 0, percent: 0 };
  }

  const progressSum = entries.reduce((sum, entry) => sum + getPlanProgress(entry), 0);
  return {
    total,
    done: entries.filter((entry) => getPlanProgress(entry) === 100).length,
    percent: Math.round(progressSum / total),
  };
}

function renderProgress() {
  const todayEntries = getEntriesForDateKeys([toDateKey(selectedDate)]);
  const weekEntries = getEntriesForDateKeys(getVisibleWeekKeys());
  const monthEntries = getEntriesForDateKeys(getMonthDateKeys(selectedDate));
  const statItems = [
    { label: t("dayProgress"), stats: getCompletionStats(todayEntries) },
    { label: t("weekProgress"), stats: getCompletionStats(weekEntries) },
    { label: t("monthProgress"), stats: getCompletionStats(monthEntries) },
  ];

  progressStats.innerHTML = statItems
    .map(
      (item) => `
        <article class="stat-card">
          <strong>${escapeHtml(item.label)}</strong>
          <div class="stat-value">${item.stats.percent}%</div>
          <div class="stat-track"><div class="stat-bar" style="--progress-width:${item.stats.percent}%"></div></div>
          <span class="stat-detail">${t("progressDetail", { done: item.stats.done, total: item.stats.total })}</span>
        </article>
      `,
    )
    .join("");

  renderTaskModules();
}

function renderTaskModules() {
  const visibleKeys = new Set(getVisibleDateKeys());
  const entries = getSortedEntries().filter((entry) => visibleKeys.has(entry.dateKey));
  taskModules.innerHTML = "";
  moduleEmpty.hidden = entries.length > 0;

  entries.forEach((entry) => {
    const category = getCategory(entry.category);
    const progress = getPlanProgress(entry);
    const module = document.createElement("article");
    module.className = "task-module";
    module.style.setProperty("--category-color", category.color);
    const subtaskDetail = entry.subtasks?.length
      ? t("subtaskProgressDetail", {
          done: entry.subtasks.filter((item) => item.done).length,
          total: entry.subtasks.length,
        })
      : t("noSubtasks");
    module.innerHTML = `
      <div class="module-head">
        <p class="module-title">${escapeHtml(entry.text)}</p>
        <span class="module-percent">${progress}%</span>
      </div>
      <div class="module-meta">${escapeHtml(entry.dateKey)} · ${escapeHtml(getPlanTimeRange(entry))} · ${category.icon} ${category.label}</div>
      <div class="module-track"><div class="module-bar" style="--progress-width:${progress}%"></div></div>
      <div class="module-meta">${escapeHtml(subtaskDetail)}</div>
      <div class="subtask-list"></div>
    `;

    const list = module.querySelector(".subtask-list");
    if (entry.subtasks?.length) {
      entry.subtasks.forEach((subtask) => {
        const label = document.createElement("label");
        label.className = `subtask-item${subtask.done ? " is-done" : ""}`;
        label.innerHTML = `<input type="checkbox" ${subtask.done ? "checked" : ""}> <span>${escapeHtml(subtask.text)}</span>`;
        label.querySelector("input").addEventListener("change", (event) => {
          updateSubtask(entry.key, subtask.id, event.target.checked);
        });
        list.appendChild(label);
      });
    } else {
      const label = document.createElement("label");
      label.className = `subtask-item${entry.done ? " is-done" : ""}`;
      label.innerHTML = `<input type="checkbox" ${entry.done ? "checked" : ""}> <span>${t("markDone")}</span>`;
      label.querySelector("input").addEventListener("change", (event) => {
        updatePlanDone(entry.key, event.target.checked);
      });
      list.appendChild(label);
    }

    taskModules.appendChild(module);
  });
}

function updateSubtask(key, subtaskId, checked) {
  const plan = plans[key];
  if (!plan) {
    return;
  }

  const before = clonePlans();
  const subtask = plan.subtasks.find((item) => item.id === subtaskId);
  if (!subtask) {
    return;
  }

  const wasDone = plan.done;
  subtask.done = checked;
  syncPlanDone(plan);
  commitPlanChange(before);

  if (!wasDone && plan.done) {
    showCheer();
    openMoodDialog(key);
  }
}

function updatePlanDone(key, checked) {
  const plan = plans[key];
  if (!plan) {
    return;
  }

  const before = clonePlans();
  const wasDone = plan.done;
  plan.done = checked;
  commitPlanChange(before);

  if (!wasDone && checked) {
    showCheer();
    openMoodDialog(key);
  }
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
  const segment = { start: Number(button.dataset.start), end: Number(button.dataset.end) };
  const coveredPlan = getPlanAtSegment(button.dataset.date, segment);
  activePlansBefore = clonePlans();

  activeKey = coveredPlan?.key || button.dataset.key;
  activeDateKey = button.dataset.date;
  activeStartMinutes = coveredPlan?.plan ? getPlanStartMinutes(coveredPlan.plan) : segment.start;
  activeEndMinutes = coveredPlan?.plan ? getPlanEndMinutes(coveredPlan.plan) : segment.end;
  activeSlot = makeTimeRange(minutesToTime(activeStartMinutes), minutesToTime(activeEndMinutes));
  activeSlotIndex = 0;

  const plan = plans[activeKey];
  dialogDate.textContent = `${button.dataset.date} ${button.dataset.weekday}`;
  dialogTime.textContent = activeSlot;
  startTimeInput.value = minutesToInputTime(activeStartMinutes);
  endTime.value = minutesToInputTime(activeEndMinutes);
  planText.value = plan?.text || "";
  renderSubtaskEditor(plan?.subtasks || []);
  repeatUntil.min = activeDateKey;
  repeatUntil.value = plan?.dueDate && plan.dueDate >= activeDateKey ? plan.dueDate : activeDateKey;
  planCategory.value = plan?.category || "study";
  deletePlan.hidden = !plan;
  planDialog.returnValue = "";
  planDialog.showModal();
  planText.focus();
}

function renderCategoryOptions() {
  planCategory.innerHTML = "";
  Object.entries(categories).forEach(([value, category]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = `${category.icon} ${category.labels[currentLang] || category.labels.zh}`;
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
    const progress = getPlanProgress(entry);
    const row = document.createElement("tr");
    row.className = progress === 100 ? "done-row" : "";
    const subtaskList = entry.subtasks?.length
      ? `<ul class="summary-subtasks">${entry.subtasks
          .map((subtask) => `<li class="${subtask.done ? "is-done" : ""}">${escapeHtml(subtask.text)}</li>`)
          .join("")}</ul>`
      : `<p class="summary-subtasks-note">${t("noSubtasks")}</p>`;
    row.innerHTML = `
      <td><input type="checkbox" ${progress === 100 ? "checked" : ""} aria-label="${t("markDone")}"></td>
      <td>${escapeHtml(entry.weekday)}</td>
      <td>${escapeHtml(getPlanTimeRange(entry))}</td>
      <td>
        <details class="summary-module">
          <summary>
            <span class="summary-module-title">${escapeHtml(entry.text)}</span>
            <span class="pill" style="--category-color:${category.color}; border:1px solid ${category.color};">${category.icon} ${category.label}</span>
          </summary>
          <div class="summary-module-detail">
            ${entry.dueDate && entry.dueDate > entry.dateKey ? `<span class="pill">${t("continueUntil", { date: escapeHtml(entry.dueDate) })}</span>` : ""}
            ${entry.mood ? `<span class="pill">${escapeHtml(getMoodLabel(entry.mood))}</span>` : ""}
            ${subtaskList}
          </div>
        </details>
      </td>
      <td>
        <strong>${progress}%</strong>
        <div class="summary-progress-track"><div style="--progress-width:${progress}%"></div></div>
      </td>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      const before = clonePlans();
      const wasDone = plans[entry.key].done;
      plans[entry.key].done = event.target.checked;
      if (plans[entry.key].subtasks?.length) {
        plans[entry.key].subtasks.forEach((subtask) => {
          subtask.done = event.target.checked;
        });
      }
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

function createPlanCopies(text, startTime, endTimeValue, category, dueDate, subtasks) {
  const startDate = fromDateKey(activeDateKey);
  const endDate = fromDateKey(dueDate);
  const copies = [];
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTimeValue);
  const timeRange = makeTimeRange(startTime, endTimeValue);

  for (let date = new Date(startDate); date <= endDate; date = addDays(date, 1)) {
    const dateKey = toDateKey(date);
    const key = makeKey(dateKey, timeRange);
    plans[key] = {
      id: plans[key]?.id || `${dateKey}-${timeRange}-${Date.now()}`,
      text,
      done: subtasks.length ? subtasks.every((item) => item.done) : plans[key]?.done || false,
      span: Math.max(1, Math.ceil((endMinutes - startMinutes) / 60)),
      startTime,
      endTime: endTimeValue,
      category,
      dueDate,
      createdDate: activeDateKey,
      mood: plans[key]?.mood || "",
      carriedCount: plans[key]?.carriedCount || 0,
      carriedFrom: plans[key]?.carriedFrom || "",
      subtasks: subtasks.map((item, index) => ({
        ...item,
        id: `${dateKey}-${timeRange}-${item.id || index}`,
      })),
    };
    copies.push(key);
  }

  return copies;
}

function getCarryoverEntries() {
  const today = todayKey();
  return getSortedEntries().filter((entry) => entry.dateKey < today && getPlanProgress(entry) < 100);
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
      <small>${escapeHtml(entry.dateKey)} · ${escapeHtml(getPlanTimeRange(entry))} · ${category.icon} ${category.label}</small>
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
      <small>${t("originalTime")}${escapeHtml(entry.dateKey)} · ${escapeHtml(getPlanTimeRange(entry))}</small>
      <div class="reschedule-row">
        <label>${t("newDate")}
          <input class="carry-date" type="date" value="${today}" min="${today}">
        </label>
        <label>${t("startTime")}
          <input class="carry-start" type="time" step="60" value="${escapeHtml(entry.startTime || parseTimeRange(entry.slot).start)}">
        </label>
        <label>${t("endTime")}
          <input class="carry-end" type="time" step="60" value="${escapeHtml(entry.endTime || parseTimeRange(entry.slot).end)}">
        </label>
      </div>
    `;
    rescheduleList.appendChild(item);
    item.dataset.index = String(index);
  });

  rescheduleDialog.showModal();
}

function saveCarryoverReschedules() {
  const items = Array.from(rescheduleList.querySelectorAll(".task-item"));
  const before = clonePlans();
  const updates = [];

  for (const item of items) {
    const oldKey = item.dataset.oldKey;
    const oldPlan = plans[oldKey];
    if (!oldPlan) {
      continue;
    }

    const dateKey = item.querySelector(".carry-date").value;
    const startTime = item.querySelector(".carry-start").value || oldPlan.startTime || parseTimeRange(oldKey.split("|")[1]).start;
    const endTimeValue = item.querySelector(".carry-end").value || oldPlan.endTime || parseTimeRange(oldKey.split("|")[1]).end;
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = Math.max(startMinutes + 5, timeToMinutes(endTimeValue));
    const normalizedEndTime = minutesToTime(endMinutes);
    const timeRange = makeTimeRange(startTime, normalizedEndTime);
    const newKey = makeKey(dateKey, timeRange);
    const ignoredKeys = items.map((entry) => entry.dataset.oldKey);
    const overlap = findOverlappingPlan(dateKey, startMinutes, endMinutes, ignoredKeys);
    if (overlap) {
      showCheer(getOverlapWarning(overlap, dateKey));
      return;
    }

    const internalOverlap = updates.find((entry) => {
      return entry.dateKey === dateKey && entry.startMinutes < endMinutes && entry.endMinutes > startMinutes;
    });
    if (internalOverlap) {
      showCheer(
        t("timeOverlapWarning", {
          date: dateKey,
          time: makeTimeRange(internalOverlap.startTime, internalOverlap.endTime),
          task: internalOverlap.oldPlan.text || t("unrecorded"),
        }),
      );
      return;
    }

    updates.push({ oldKey, oldPlan, dateKey, startTime, endTime: normalizedEndTime, startMinutes, endMinutes, newKey });
  }

  updates.forEach(({ oldKey, oldPlan, dateKey, startTime, endTime, endMinutes, startMinutes, newKey }) => {
    delete plans[oldKey];
    plans[newKey] = {
      ...oldPlan,
      done: false,
      mood: "",
      span: Math.max(1, Math.ceil((endMinutes - startMinutes) / 60)),
      startTime,
      endTime,
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

  const completed = entries.filter((entry) => getPlanProgress(entry) === 100);
  const carried = entries.filter((entry) => entry.carriedCount > 0 || (getPlanProgress(entry) < 100 && entry.dateKey < todayKey()));
  const carriedRatio = carried.length / entries.length;
  const totalHours = Math.round(entries.reduce((sum, entry) => sum + getDurationHours(entry), 0) * 10) / 10;
  const categoryHours = {};

  entries.forEach((entry) => {
    categoryHours[entry.category] = (categoryHours[entry.category] || 0) + getDurationHours(entry);
    const category = getCategory(entry.category);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(entry.text)}</td>
      <td><span class="pill" style="border:1px solid ${category.color};">${category.icon} ${category.label}</span></td>
      <td>${getDurationHours(entry)} ${t("hour")}</td>
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

backgroundBtn.addEventListener("click", () => {
  openBackgroundDialog();
});

quoteBtn.addEventListener("click", () => {
  openQuoteDialog();
});

quoteDialog.addEventListener("close", () => {
  if (quoteDialog.returnValue !== "save") {
    return;
  }

  quoteSettings = {
    mode: quoteCustom.checked ? "custom" : "system",
    customText: customQuoteText.value.trim(),
  };
  saveQuoteSettings();
  renderDailyQuote();
  showCheer(t("quoteSaved"));
});

addSubtask.addEventListener("click", () => {
  subtaskEditor.appendChild(createSubtaskInputRow());
  const input = subtaskEditor.querySelector(".subtask-edit-row:last-child input");
  input.focus();
});

backgroundImageInput.addEventListener("change", () => {
  const file = backgroundImageInput.files?.[0];
  if (!file) {
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    showCheer(t("imageTooLarge"));
    backgroundImageInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    backgroundSettings.image = String(reader.result || "");
    saveBackgroundSettings();
    applyBackgroundSettings();
    showCheer(t("backgroundSaved"));
  });
  reader.readAsDataURL(file);
});

clearBackgroundImage.addEventListener("click", () => {
  backgroundSettings.image = "";
  backgroundImageInput.value = "";
  saveBackgroundSettings();
  applyBackgroundSettings();
  showCheer(t("backgroundSaved"));
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
      if (visibleKeys.has(dateKey) && getPlanProgress(plans[key]) === 100) {
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
  const startValue = startTimeInput.value || minutesToTime(activeStartMinutes);
  const endValue = endTime.value || minutesToTime(activeEndMinutes);
  const startMinutes = timeToMinutes(startValue);
  const endMinutes = timeToMinutes(endValue);
  const category = planCategory.value || "study";
  const dueDate = repeatUntil.value || activeDateKey;
  const subtasks = collectSubtasksFromEditor();
  const before = activePlansBefore || clonePlans();

  if (action === "save" && text && endMinutes > startMinutes) {
    const overlap = findPlanCopyOverlap(startValue, endValue, dueDate, [activeKey]);
    if (overlap) {
      showCheer(getOverlapWarning(overlap, overlap.dateKey));
      window.setTimeout(() => {
        if (!planDialog.open) {
          planDialog.showModal();
          planText.focus();
        }
      }, 0);
      return;
    }

    if (plans[activeKey]) {
      delete plans[activeKey];
    }
    createPlanCopies(text, startValue, endValue, category, dueDate, subtasks);
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
  activeStartMinutes = 420;
  activeEndMinutes = 480;
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
