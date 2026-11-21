const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try {
    tg.setHeaderColor('#1c1a18');
    tg.setBackgroundColor('#1c1a18');
  } catch (e) {}
}

const STORAGE_KEY = 'detective_maria_state_v12_final';

const STAGES = [
  {
    id: 0,
    tag: 'ПРОЛОГ • МЕСТО ПРЕСТУПЛЕНИЯ',
    boardTitle: 'Взлом сейфа',
    handNote: 'Записка с места кражи',
    shapeClass: 'shape-note',
    hasTape: true,
    rotate: -2.2,
    x: 14, y: 22,
    audio: 'assets/stage1.mp3',
    photo: 'assets/photo1.jpg',
    caption: 'Улика №0: Пустой сейф и следы лап',
    desc: 'Детектив Мария, в твой день рождения из тайника исчез главный конверт. Понятые (кот и собака) отказываются давать показания без вкусняшек, а дело уже закручивается.',
    extraClue: 'На столе оставлена пометка: пройди все этапы допроса, собери кодовую фразу из четырёх частей и доберись до конверта.',
    isIntro: true,
    actionText: 'ПРИНЯТЬ ДЕЛО',
    nextMinigame: 'stamp'
  },
  {
    id: 1,
    tag: 'УЛИКА №1 • ДОПРОС НА 1 ЭТАЖЕ',
    boardTitle: 'Стендап с душком',
    handNote: 'Кучерявый • админ 1 этажа',
    shapeClass: 'shape-polaroid',
    hasTape: false,
    rotate: 2.5,
    x: 186, y: 122,
    audio: 'assets/stage2.mp3',
    photo: 'assets/photo2.jpg',
    caption: 'Кучерявый на даче не был — выбиваем показания',
    desc: 'Кучерявый сидит администратором на первом этаже — на даче он не был и сцену не видел, но крутится так, будто знает лишнее. Выбиваем из него показания по вечернему стендапу и прижимаем фактами.',
    extraClue: 'Свидетель пытается отмазаться, но факты с вечернего стендапа указывают на критический сбой прямо во время шуток.',
    question: 'Какая катастрофа чуть не сорвала просмотр того стендапа?',
    options: [
      { text: 'Сели батарейки в пульте от телевизора', correct: false, hint: 'Кучерявый бы обрадовался, но нет.' },
      { text: 'Критическая ситуация на грани катастрофы в штанах', correct: true },
      { text: 'Соседи вызвали полицию из-за смеха', correct: false, hint: 'Смех был, но главная угроза таилась внутри.' }
    ],
    unlockWordIndex: 0,
    nextMinigame: 'circuit'
  },
  {
    id: 2,
    tag: 'УЛИКА №2 • АРХИВ VHS',
    boardTitle: 'Дело «Бригада»',
    handNote: 'Кассета обрывается на 18+',
    shapeClass: 'shape-cassette',
    hasTape: false,
    rotate: -1.8,
    x: 16, y: 252,
    audio: 'assets/stage3.mp3',
    photo: 'assets/photo3.jpg',
    caption: 'Плёнка срывается задолго до конца серии',
    desc: 'Оперативники изъяли кассету с «Бригадой». Досмотреть серию спокойно так и не выходит — каждый раз развитие событий резко сворачивает в сторону.',
    extraClue: 'По счётчику кассеты видно: сюжет регулярно обрывается, когда атмосфера накаляется до рейтинга 18+.',
    question: 'По какой уважительной причине Саша Белый вечно остаётся без зрителей?',
    options: [
      { text: 'Слишком закрученный криминальный сюжет', correct: false, hint: 'Не в сюжете дело, детектив.' },
      { text: 'Постоянный переход к рейтингу 18+ между вами', correct: true },
      { text: 'Внезапно отключают электричество', correct: false, hint: 'Искры летят, но не из розетки.' }
    ],
    unlockWordIndex: 1,
    nextMinigame: 'pressure'
  },
  {
    id: 3,
    tag: 'УЛИКА №3 • АРХИВ 8 ЛЕТ',
    boardTitle: 'Билет в прошлое',
    handNote: 'Киносеанс • 8 лет назад',
    shapeClass: 'shape-ticket',
    hasTape: true,
    rotate: 2.1,
    x: 186, y: 376,
    audio: 'assets/stage4.mp3',
    photo: 'assets/photo4.jpg',
    caption: 'Выцветший билет восьмилетней давности',
    desc: 'В архивной папке найден старый кинобилет восьмилетней давности. Восемь лет назад вы сидели в зале, а затем время развело вас до нынешней встречи.',
    extraClue: 'Название того фильма короткое и точное — ровно как восемь пролетевших лет.',
    question: 'На какой фильм вы ходили на том самом свидании 8 лет назад?',
    options: [
      { text: '«Короче»', correct: true },
      { text: '«Начало»', correct: false, hint: 'Это было начало, но называлось иначе.' },
      { text: '«Интерстеллар»', correct: false, hint: 'Потерялись во времени вы на 8 лет, но фильм другой.' }
    ],
    unlockWordIndex: 2
  },
  {
    id: 4,
    tag: 'УЛИКА №4 • РАДИОПЕРЕХВАТ',
    boardTitle: 'Частота BTS & Cortis',
    handNote: 'Чистая волна без помех',
    shapeClass: 'shape-radio',
    hasTape: false,
    rotate: -2.4,
    x: 16, y: 502,
    audio: 'assets/stage5.mp3',
    photo: 'assets/photo5.jpg',
    caption: 'Эфир BTS & Cortis — финальное слово',
    desc: 'На волне звучат BTS и Cortis — без помех в эфире, только чистый сигнал с подсказкой для завершения фразы «Виска Барса и виска...».',
    extraClue: 'Сверь услышанное с вариантами и открой четвёртое слово для замка тайника.',
    question: 'Какое слово на самом деле завершает главный девиз «Виска Барса и виска...»?',
    options: [
      { text: 'Каталония', correct: false, hint: 'Слишком предсказуемо! Посмотри на улики вокруг.' },
      { text: 'Кучерявый', correct: false, hint: 'Много чести для свидетеля.' },
      { text: 'BTS', correct: true }
    ],
    unlockWordIndex: 3,
    nextMinigame: 'safelock'
  },
  {
    id: 5,
    tag: 'ФИНАЛ • ДЕЛО ЗАКРЫТО',
    boardTitle: 'Вердикт и Конверт',
    handNote: 'Лично в руки имениннице',
    shapeClass: 'shape-envelope',
    hasTape: true,
    rotate: 1.6,
    x: 186, y: 622,
    audio: 'assets/stage6.mp3',
    photo: 'assets/photo6.jpg',
    caption: 'С Днём Рождения, Детектив Мария!',
    desc: 'Дело № 08-11 закрыто! Все улики собраны, показания выбиты, поезд с Пэрри промчался мимо, а главный конверт ждёт. После полного прохождения в шапке появится доступ к неудачным дублям (n1–n6).',
    extraClue: 'Произнеси кодовую фразу вслух и забирай конверт.',
    isFinal: true
  }
];

const BLOOPER_TRACKS = [
  { file: 'assets/n1.mp3', label: 'n1.mp3 — Неудачный дубль №1' },
  { file: 'assets/n2.mp3', label: 'n2.mp3 — Неудачный дубль №2' },
  { file: 'assets/n3.mp3', label: 'n3.mp3 — Неудачный дубль №3' },
  { file: 'assets/n4.mp3', label: 'n4.mp3 — Неудачный дубль №4' },
  { file: 'assets/n5.mp3', label: 'n5.mp3 — Неудачный дубль №5' },
  { file: 'assets/n6.mp3', label: 'n6.mp3 — Неудачный дубль №6' }
];

const MINIGAME_CONFIGS = {
  stamp: {
    badge: 'СПЕЦПРОВЕРКА №1 • 3 РАУНДА',
    title: 'Точный удар штампом по метке',
    rules: 'Пройди 3 раунда печати. Скорость и размер зелёной зоны подобраны так, чтобы можно было спокойно попасть в цель.',
    hint: 'КАК ИГРАТЬ: Нажимай «ПОСТАВИТЬ ШТАМП», когда печать в зелёной зоне. По 2 точных оттиска в каждом из 3 раундов.'
  },
  circuit: {
    badge: 'СПЕЦПРОВЕРКА №2 • 2 СХЕМЫ',
    title: 'Сборка схемы контактов',
    rules: 'Собери непрерывную цепь на двух платах подряд (схема №1 и схема №2). Ориентируйся на подсветку соединяющихся дорожек.',
    hint: 'КАК ИГРАТЬ: Нажимай на плитки, чтобы поворачивать их на 90°, пока не загорится весь рабочий маршрут.'
  },
  pressure: {
    badge: 'СПЕЦПРОВЕРКА №3 • 2 ЭТАПА ДАВЛЕНИЯ',
    title: 'Накачка давления в системе',
    rules: 'Удерживай стрелку в зелёной зоне до 100% в двух режимах нагрузки, не доводя до перегруза в красной зоне.',
    hint: 'КАК ИГРАТЬ: Зажимай и отпускай кнопку «КАЧАТЬ ДАВЛЕНИЕ», набирая 100% на каждом этапе.'
  },
  safelock: {
    badge: 'ФИНАЛЬНЫЙ ВЗЛОМ • СЕЙФ',
    title: 'Кодовый замок главного тайника',
    rules: 'Выставь на 4 барабанах собранную кодовую фразу, чтобы открыть доступ к финальному этапу.',
    hint: 'КАК ИГРАТЬ: Переключай барабаны стрелками ▲ / ▼ и нажми «ОТКРЫТЬ СЕЙФ».'
  }
};

let currentUnlockedStage = 0;
let unlockedWords = [false, false, false, false];
let questCompleted = false;
let trainTriggeredBetween3And4 = false;
let activeStage = null;
let isAdvancing = false;
let activeAnimFrame = null;

let bgmEnabled = true;
const BGM_DEFAULT_VOL = 0.35;
const BGM_DUCKED_VOL = 0.06;
let bgmFadeTimer = null;

const boardNodesEl = document.getElementById('nodes-layer');
const threadsSvgEl = document.getElementById('threads-svg');
const modalEl = document.getElementById('stage-modal');
const mgModalEl = document.getElementById('minigame-modal');
const bloopersModalEl = document.getElementById('bloopers-modal');
const bloopersMenuBtn = document.getElementById('bloopers-menu-btn');
const audioEl = document.getElementById('stage-audio');
const trainAudioEl = new Audio('assets/poezd.mp3');
trainAudioEl.preload = 'auto';
const bgMusicEl = document.getElementById('bg-music');
const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
const playBtn = document.getElementById('play-btn');
const reelLeft = document.getElementById('reel-left');
const reelRight = document.getElementById('reel-right');
const timerEl = document.getElementById('audio-timer');
const progressBarEl = document.getElementById('tape-progress-bar');
const audioHintEl = document.getElementById('audio-status-hint');
const tapeFileLabel = document.getElementById('tape-file-label');

function syncBloopersButtonUI() {
  if (questCompleted || currentUnlockedStage >= STAGES.length - 1) {
    questCompleted = true;
    saveState();
    bloopersMenuBtn.classList.remove('hidden');
  } else {
    bloopersMenuBtn.classList.add('hidden');
  }
}

function fadeBgMusicTo(targetVol, durationMs = 450) {
  if (!bgmEnabled) {
    bgMusicEl.pause();
    return;
  }
  if (bgmFadeTimer) {
    clearInterval(bgmFadeTimer);
    bgmFadeTimer = null;
  }
  if (bgMusicEl.paused && targetVol > 0) {
    bgMusicEl.play().catch(() => {});
  }
  const startVol = bgMusicEl.volume;
  const steps = 15;
  const stepTime = Math.max(20, Math.floor(durationMs / steps));
  const delta = (targetVol - startVol) / steps;
  let currentStep = 0;

  bgmFadeTimer = setInterval(() => {
    currentStep++;
    bgMusicEl.volume = Math.min(1, Math.max(0, startVol + delta * currentStep));
    if (currentStep >= steps) {
      clearInterval(bgmFadeTimer);
      bgmFadeTimer = null;
      bgMusicEl.volume = targetVol;
    }
  }, stepTime);
}

function duckBackgroundMusicForVoice() {
  if (!bgmEnabled) return;
  fadeBgMusicTo(BGM_DUCKED_VOL, 350);
}

function restoreBackgroundMusicAfterVoice() {
  if (!bgmEnabled) return;
  if (audioEl.paused && trainAudioEl.paused) {
    fadeBgMusicTo(BGM_DEFAULT_VOL, 500);
  }
}

function initSplashAvatarMedia() {
  const imgEl = document.getElementById('splash-avatar-img');
  const videoEl = document.getElementById('splash-avatar-video');
  const fallbackEl = document.getElementById('splash-avatar-fallback');

  imgEl.onerror = () => {
    if (!imgEl.dataset.triedJpg) {
      imgEl.dataset.triedJpg = 'true';
      imgEl.src = 'assets/detective.jpg';
      return;
    }
    imgEl.classList.add('hidden');
    videoEl.classList.remove('hidden');
    videoEl.onerror = () => {
      videoEl.classList.add('hidden');
      fallbackEl.classList.remove('hidden');
    };
    videoEl.load();
  };
}

function initSplashScreen() {
  initSplashAvatarMedia();
  const splashEl = document.getElementById('splash-screen');
  const barEl = document.getElementById('splash-progress-bar');
  const enterBtn = document.getElementById('enter-case-btn');
  const line2 = document.getElementById('term-line-2');
  const line3 = document.getElementById('term-line-3');
  const line4 = document.getElementById('term-line-4');

  setTimeout(() => { barEl.style.width = '35%'; line2.classList.remove('hidden'); }, 450);
  setTimeout(() => { barEl.style.width = '75%'; line3.classList.remove('hidden'); }, 950);
  setTimeout(() => {
    barEl.style.width = '100%';
    line4.classList.remove('hidden');
    enterBtn.disabled = false;
    enterBtn.classList.add('ready');
    enterBtn.textContent = 'ВСКРЫТЬ ДЕЛО';
    haptic('light');
  }, 1450);

  enterBtn.addEventListener('click', () => {
    haptic('medium');
    splashEl.classList.add('fade-out');
    if (bgmEnabled) {
      bgMusicEl.volume = BGM_DEFAULT_VOL;
      bgMusicEl.play().catch(() => {});
    }
    setTimeout(() => { splashEl.style.display = 'none'; }, 500);
  });
}

bgmToggleBtn.addEventListener('click', () => {
  bgmEnabled = !bgmEnabled;
  haptic('light');
  if (bgmEnabled) {
    bgmToggleBtn.textContent = 'ФОН: ВКЛ';
    bgmToggleBtn.classList.remove('muted');
    const target = audioEl.paused && trainAudioEl.paused ? BGM_DEFAULT_VOL : BGM_DUCKED_VOL;
    bgMusicEl.volume = target;
    bgMusicEl.play().catch(() => {});
  } else {
    bgmToggleBtn.textContent = 'ФОН: ВЫКЛ';
    bgmToggleBtn.classList.add('muted');
    if (bgmFadeTimer) clearInterval(bgmFadeTimer);
    bgMusicEl.pause();
  }
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (typeof parsed.currentUnlockedStage === 'number') {
      currentUnlockedStage = Math.min(STAGES.length - 1, Math.max(0, parsed.currentUnlockedStage));
    }
    if (Array.isArray(parsed.unlockedWords) && parsed.unlockedWords.length === 4) {
      unlockedWords = parsed.unlockedWords;
    }
    questCompleted = Boolean(parsed.questCompleted);
    trainTriggeredBetween3And4 = Boolean(parsed.trainTriggeredBetween3And4);
  } catch (e) {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentUnlockedStage,
      unlockedWords,
      questCompleted,
      trainTriggeredBetween3And4
    }));
  } catch (e) {}
}

function syncCodeSlotsUI() {
  const slots = document.querySelectorAll('.code-slot');
  slots.forEach((slot, idx) => {
    if (unlockedWords[idx]) {
      slot.textContent = slot.dataset.word;
      slot.classList.add('unlocked');
    } else {
      slot.textContent = '????';
      slot.classList.remove('unlocked');
    }
  });
}

function haptic(type = 'light') {
  if (tg?.HapticFeedback) {
    try {
      if (type === 'error' || type === 'success' || type === 'warning') {
        tg.HapticFeedback.notificationOccurred(type);
      } else {
        tg.HapticFeedback.impactOccurred(type);
      }
    } catch (e) {}
  }
}

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const mins = String(Math.floor(sec / 60)).padStart(2, '0');
  const secs = String(Math.floor(sec % 60)).padStart(2, '0');
  return `${mins}:${secs}`;
}

function renderBoard() {
  boardNodesEl.innerHTML = '';
  threadsSvgEl.innerHTML = '';
  syncCodeSlotsUI();
  syncBloopersButtonUI();

  for (let i = 0; i < STAGES.length - 1; i++) {
    const curr = STAGES[i];
    const next = STAGES[i + 1];
    const x1 = curr.x + 80;
    const y1 = curr.y;
    const x2 = next.x + 80;
    const y2 = next.y;
    const cx = (x1 + x2) / 2;
    const cy = Math.max(y1, y2) + 22;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
    path.classList.add('thread-line');
    if (i < currentUnlockedStage) path.classList.add('active');
    threadsSvgEl.appendChild(path);
  }

  STAGES.forEach((stage) => {
    const node = document.createElement('div');
    node.className = `board-node ${stage.shapeClass}`;
    node.style.left = `${stage.x}px`;
    node.style.top = `${stage.y}px`;
    node.style.transform = `rotate(${stage.rotate}deg)`;

    if (stage.id < currentUnlockedStage) node.classList.add('completed');
    else if (stage.id === currentUnlockedStage) node.classList.add('available');
    else node.classList.add('locked');

    const statusText = stage.id < currentUnlockedStage
      ? 'ПРОЯВЛЕНО'
      : stage.id === currentUnlockedStage
        ? 'АКТИВНАЯ УЛИКА'
        : 'НЕГАТИВ';

    const tapeHtml = stage.hasTape ? '<div class="scotch-tape"></div>' : '';

    node.innerHTML = `
      <div class="pin"></div>
      ${tapeHtml}
      <div class="node-step">УЛИКА 0${stage.id + 1}</div>
      <div class="node-name">${stage.boardTitle}</div>
      <div class="node-handnote">${stage.handNote}</div>
      <div class="node-status">${statusText}</div>
    `;

    node.addEventListener('click', () => {
      if (stage.id <= currentUnlockedStage) {
        haptic('medium');
        openStageModal(stage);
      } else {
        haptic('error');
      }
    });

    boardNodesEl.appendChild(node);
  });
}

function openStageModal(stage) {
  activeStage = stage;
  isAdvancing = false;
  stopVoiceAudio();

  document.getElementById('modal-tag').textContent = stage.tag;
  document.getElementById('modal-title').textContent = stage.boardTitle;
  document.getElementById('modal-desc').textContent = stage.desc;
  document.getElementById('polaroid-caption').textContent = stage.caption;

  const extraClueBox = document.getElementById('extra-clue-box');
  const extraClueText = document.getElementById('extra-clue-text');
  if (stage.extraClue) {
    extraClueText.textContent = stage.extraClue;
    extraClueBox.classList.remove('hidden');
  } else {
    extraClueBox.classList.add('hidden');
  }

  const polaroidImg = document.getElementById('polaroid-img');
  polaroidImg.src = stage.photo;

  const fileName = stage.audio.split('/').pop();
  tapeFileLabel.textContent = fileName;
  audioHintEl.classList.add('hidden');
  audioHintEl.textContent = '';
  progressBarEl.style.width = '0%';
  timerEl.textContent = '00:00 / 00:00';
  audioEl.src = stage.audio;
  audioEl.load();

  const quizBox = document.getElementById('quiz-box');
  const actionBtn = document.getElementById('action-btn');
  const feedbackMsg = document.getElementById('feedback-msg');
  const finalContainer = document.getElementById('final-container');
  feedbackMsg.textContent = '';
  finalContainer.innerHTML = '';

  if (stage.isIntro) {
    quizBox.style.display = 'none';
    actionBtn.classList.remove('hidden');
    actionBtn.textContent = stage.actionText;
    actionBtn.onclick = () => handleStagePassed();
  } else if (stage.isFinal) {
    quizBox.style.display = 'none';
    actionBtn.classList.add('hidden');
    questCompleted = true;
    saveState();
    syncBloopersButtonUI();
    finalContainer.innerHTML = `
      <div class="final-banner">
        <div style="font-size: 11px; color: #b5aa96; font-weight: 700;">КОДОВАЯ ФРАЗА ДЛЯ ПОЛУЧЕНИЯ КОНВЕРТА:</div>
        <div class="final-phrase">«ВИСКА БАРСА И ВИСКА BTS»</div>
        <div style="font-size: 12px; color: #efe7d6;">Подойди к главному подозреваемому и произнеси этот пароль вслух. В шапке открыт доступ к неудачным дублям (n1–n6).</div>
        <button id="copy-final-phrase-btn" class="mech-mini-btn copy-phrase-btn">СКОПИРОВАТЬ ПАРОЛЬ</button>
      </div>
    `;
  } else {
    quizBox.style.display = 'block';
    actionBtn.classList.add('hidden');
    document.getElementById('modal-question').textContent = stage.question;

    const optionsList = document.getElementById('options-list');
    const optionsGateNotice = document.getElementById('options-gate-notice');
    optionsList.innerHTML = '';
    optionsList.classList.add('hidden');
    if (optionsGateNotice) {
      optionsGateNotice.classList.remove('hidden');
      optionsGateNotice.textContent = 'Дослушай запись этапа до конца, чтобы открылись варианты ответа.';
    }

    stage.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;

      btn.onclick = () => {
        if (isAdvancing) return;
        if (opt.correct) {
          isAdvancing = true;
          haptic('success');
          btn.classList.add('correct');
          feedbackMsg.style.color = '#7bc48b';
          feedbackMsg.textContent = 'Улика подтверждена. Слово шифра открыто.';
          unlockCodeWord(stage.unlockWordIndex);
          setTimeout(() => handleStagePassed(), 850);
        } else {
          haptic('error');
          btn.classList.add('wrong');
          feedbackMsg.style.color = '#e06a76';
          feedbackMsg.textContent = opt.hint || 'Неверно, попробуй ещё раз.';
          setTimeout(() => btn.classList.remove('wrong'), 400);
        }
      };
      optionsList.appendChild(btn);
    });
  }

  modalEl.classList.remove('hidden');
}

function unlockCodeWord(index) {
  if (typeof index === 'number' && index >= 0 && index < 4) {
    unlockedWords[index] = true;
    saveState();
    syncCodeSlotsUI();
  }
}

function handleStagePassed() {
  const finishedStage = activeStage;
  const isNewProgress = finishedStage && finishedStage.id === currentUnlockedStage;

  stopVoiceAudio();
  modalEl.classList.add('hidden');

  const advanceToNext = () => {
    const afterUnlock = () => {
      if (isNewProgress && finishedStage.id === 3 && !trainTriggeredBetween3And4) {
        const randomDelayMs = 400 + Math.floor(Math.random() * 1400);
        setTimeout(() => {
          triggerTrainBetween3And4(() => {});
        }, randomDelayMs);
      }
    };
    if (isNewProgress && finishedStage.nextMinigame) {
      openMinigameIntro(finishedStage.nextMinigame, () => {
        unlockNextStageAndRender(finishedStage.id);
        afterUnlock();
      });
    } else if (isNewProgress) {
      unlockNextStageAndRender(finishedStage.id);
      afterUnlock();
    }
  };

  advanceToNext();
}

function triggerTrainBetween3And4(onDoneCallback) {
  trainTriggeredBetween3And4 = true;
  saveState();
  haptic('heavy');

  const overlay = document.getElementById('train-overlay');
  const trainCard = overlay.querySelector('.train-card');
  const continueBtn = document.getElementById('continue-after-train-btn');
  overlay.classList.remove('hidden');
  if (trainCard) {
    trainCard.classList.remove('shaking');
    void trainCard.offsetWidth;
    trainCard.classList.add('shaking');
  }

  duckBackgroundMusicForVoice();
  trainAudioEl.currentTime = 0;
  trainAudioEl.play().catch(() => {});

  continueBtn.onclick = () => {
    trainAudioEl.pause();
    overlay.classList.add('hidden');
    restoreBackgroundMusicAfterVoice();
    if (typeof onDoneCallback === 'function') onDoneCallback();
  };
}

function unlockNextStageAndRender(justFinishedId) {
  currentUnlockedStage = Math.min(STAGES.length - 1, currentUnlockedStage + 1);
  if (currentUnlockedStage >= STAGES.length - 1) {
    questCompleted = true;
  }
  saveState();
  renderBoard();

  if (justFinishedId === 4 && currentUnlockedStage === 5) {
    setTimeout(() => openStageModal(STAGES[5]), 350);
  }
}

/* =========================================================
   МИНИ-ИГРЫ
   ========================================================= */
function stopMinigameLoop() {
  if (activeAnimFrame) {
    cancelAnimationFrame(activeAnimFrame);
    activeAnimFrame = null;
  }
}

function openMinigameIntro(gameType, onWinCallback) {
  stopMinigameLoop();
  const cfg = MINIGAME_CONFIGS[gameType];
  if (!cfg) {
    onWinCallback();
    return;
  }

  document.getElementById('mg-badge').textContent = cfg.badge;
  document.getElementById('mg-title').textContent = cfg.title;
  document.getElementById('mg-rules-text').textContent = cfg.rules;
  document.getElementById('mg-controls-hint').textContent = cfg.hint;

  const rulesScreen = document.getElementById('mg-rules-screen');
  const playScreen = document.getElementById('mg-play-screen');
  const startBtn = document.getElementById('mg-start-btn');
  const feedbackEl = document.getElementById('mg-feedback');

  rulesScreen.classList.remove('hidden');
  playScreen.classList.add('hidden');
  feedbackEl.textContent = '';

  startBtn.onclick = () => {
    haptic('medium');
    rulesScreen.classList.add('hidden');
    playScreen.classList.remove('hidden');

    const finishGame = () => {
      stopMinigameLoop();
      haptic('success');
      feedbackEl.style.color = '#7bc48b';
      feedbackEl.textContent = 'ИСПЫТАНИЕ ПРОЙДЕНО. Следующая улика открыта.';
      setTimeout(() => {
        mgModalEl.classList.add('hidden');
        onWinCallback();
      }, 900);
    };

    if (gameType === 'stamp') startStampGame(finishGame);
    else if (gameType === 'circuit') startCircuitGame(finishGame);
    else if (gameType === 'pressure') startPressureGame(finishGame);
    else if (gameType === 'safelock') startSafeLockGame(finishGame);
  };

  mgModalEl.classList.remove('hidden');
}

function startStampGame(onWin) {
  const arena = document.getElementById('mg-arena');
  const feedbackEl = document.getElementById('mg-feedback');

  const rounds = [
    { speed: 1.75, tolerance: 46, targetBoxWidth: 132, stampWidth: 112, needHits: 2 },
    { speed: 2.25, tolerance: 40, targetBoxWidth: 120, stampWidth: 108, needHits: 2 },
    { speed: 2.70, tolerance: 36, targetBoxWidth: 112, stampWidth: 104, needHits: 2 }
  ];

  let roundIdx = 0;
  let roundHits = 0;
  let pos = 0;
  let dir = 1;
  let locked = false;

  function setupRound() {
    const r = rounds[roundIdx];
    roundHits = 0;
    pos = 0;
    dir = 1;

    arena.innerHTML = `
      <div class="level-pill-row">
        <span>РАУНД ${roundIdx + 1} ИЗ ${rounds.length}</span>
        <span id="stamp-hits-label">ОТТИСКОВ: 0 / ${r.needHits}</span>
      </div>
      <div class="stamp-doc-sheet" id="stamp-sheet">
        <div class="stamp-doc-lines"></div>
        <div class="stamp-target-box" id="stamp-target" style="width:${r.targetBoxWidth}px;">ПЕЧАТЬ СЮДА</div>
        <div class="stamp-moving-head" id="stamp-head" style="width:${r.stampWidth}px;">ПРОВЕРЕНО</div>
      </div>
      <button id="stamp-hit-btn" class="primary-action-btn mech-btn" style="margin-top:0;">ПОСТАВИТЬ ШТАМП</button>
    `;

    const sheetEl = document.getElementById('stamp-sheet');
    const targetEl = document.getElementById('stamp-target');
    const headEl = document.getElementById('stamp-head');
    const hitsLabel = document.getElementById('stamp-hits-label');
    const hitBtn = document.getElementById('stamp-hit-btn');

    if (activeAnimFrame) cancelAnimationFrame(activeAnimFrame);

    function loop() {
      const maxW = Math.max(120, sheetEl.clientWidth - headEl.offsetWidth);
      pos += dir * r.speed;
      if (pos >= maxW) { pos = maxW; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      headEl.style.left = `${pos}px`;
      activeAnimFrame = requestAnimationFrame(loop);
    }
    activeAnimFrame = requestAnimationFrame(loop);

    hitBtn.onclick = () => {
      if (locked) return;
      const headCenter = pos + headEl.offsetWidth / 2;
      const targetCenter = targetEl.offsetLeft + targetEl.offsetWidth / 2;
      const diff = Math.abs(headCenter - targetCenter);

      if (diff <= r.tolerance) {
        roundHits++;
        haptic('success');
        hitsLabel.textContent = `ОТТИСКОВ: ${roundHits} / ${r.needHits}`;
        feedbackEl.style.color = '#7bc48b';

        if (roundHits >= r.needHits) {
          if (roundIdx + 1 < rounds.length) {
            roundIdx++;
            feedbackEl.textContent = `Раунд пройден. Переходим к раунду ${roundIdx + 1}...`;
            setupRound();
          } else {
            locked = true;
            feedbackEl.textContent = 'Все 3 раунда печати завершены.';
            onWin();
          }
        } else {
          feedbackEl.textContent = 'Точный оттиск. Нужен ещё один.';
        }
      } else {
        haptic('error');
        feedbackEl.style.color = '#e06a76';
        feedbackEl.textContent = 'Мимо цели — нажми, когда штамп проходит над зелёной зоной.';
      }
    };
  }

  setupRound();
}

function startCircuitGame(onWin) {
  const arena = document.getElementById('mg-arena');
  const feedbackEl = document.getElementById('mg-feedback');

  const levels = [
    {
      label: 'ПЛАТА №1 • БАЗОВАЯ ЦЕПЬ',
      tiles: [
        { type: 'L', rot: 1 }, { type: 'I', rot: 0 }, { type: 'L', rot: 2 },
        { type: 'L', rot: 2 }, { type: 'I', rot: 1 }, { type: 'L', rot: 0 },
        { type: 'I', rot: 1 }, { type: 'L', rot: 3 }, { type: 'L', rot: 1 }
      ]
    },
    {
      label: 'ПЛАТА №2 • УСЛОЖНЁННЫЙ МАРШРУТ',
      tiles: [
        { type: 'I', rot: 0 }, { type: 'I', rot: 0 }, { type: 'L', rot: 1 },
        { type: 'L', rot: 1 }, { type: 'L', rot: 2 }, { type: 'L', rot: 0 },
        { type: 'I', rot: 1 }, { type: 'L', rot: 2 }, { type: 'I', rot: 0 }
      ]
    }
  ];

  let lvlIdx = 0;
  let tiles = levels[0].tiles.map((t) => ({ ...t }));

  function getMask(tile) {
    let base = tile.type === 'I' ? [1, 0, 1, 0] : [1, 1, 0, 0];
    const r = tile.rot % 4;
    for (let i = 0; i < r; i++) {
      base = [base[3], base[0], base[1], base[2]];
    }
    return base;
  }

  function renderGrid() {
    const gridHtml = tiles.map((t, idx) => {
      const pathSvg = t.type === 'I'
        ? '<line x1="30" y1="0" x2="30" y2="60" stroke="#d49b4b" stroke-width="7" stroke-linecap="round"/>'
        : '<path d="M 30 0 L 30 30 L 60 30" fill="none" stroke="#d49b4b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
      return `
        <div class="circuit-tile" data-idx="${idx}">
          <svg viewBox="0 0 60 60" style="transform: rotate(${t.rot * 90}deg)">
            ${pathSvg}
            <circle cx="30" cy="30" r="4" fill="#efe7d6"/>
          </svg>
        </div>
      `;
    }).join('');

    // Подсказки входа/выхода убраны — ориентируемся по подсветке собираемого пути
    arena.innerHTML = `
      <div class="level-pill-row">
        <span>${levels[lvlIdx].label}</span>
        <span>ЭТАП ${lvlIdx + 1}/${levels.length}</span>
      </div>
      <div class="circuit-board">
        <div class="circuit-grid" id="circuit-grid">${gridHtml}</div>
      </div>
    `;

    document.querySelectorAll('.circuit-tile').forEach((el) => {
      el.onclick = () => {
        const idx = Number(el.dataset.idx);
        tiles[idx].rot = (tiles[idx].rot + 1) % 4;
        haptic('light');
        renderGrid();
        checkCircuit();
      };
    });
  }

  function checkCircuit() {
    const startMask = getMask(tiles[0]);
    if (!startMask[3]) return;

    const visited = new Set([0]);
    const queue = [0];
    const dirs = [
      { dr: -1, dc: 0, my: 0, opp: 2 },
      { dr: 0, dc: 1, my: 1, opp: 3 },
      { dr: 1, dc: 0, my: 2, opp: 0 },
      { dr: 0, dc: -1, my: 3, opp: 1 }
    ];

    while (queue.length > 0) {
      const curr = queue.shift();
      const r = Math.floor(curr / 3);
      const c = curr % 3;
      const m = getMask(tiles[curr]);

      if (curr === 8 && m[1]) {
        document.querySelectorAll('.circuit-tile').forEach((el) => {
          if (visited.has(Number(el.dataset.idx))) el.classList.add('powered');
        });
        if (lvlIdx + 1 < levels.length) {
          lvlIdx++;
          tiles = levels[lvlIdx].tiles.map((t) => ({ ...t }));
          feedbackEl.style.color = '#7bc48b';
          feedbackEl.textContent = 'Первая плата запитана. Собираем вторую схему...';
          setTimeout(() => {
            renderGrid();
            checkCircuit();
          }, 550);
        } else {
          onWin();
        }
        return;
      }

      for (const d of dirs) {
        if (!m[d.my]) continue;
        const nr = r + d.dr;
        const nc = c + d.dc;
        if (nr < 0 || nr > 2 || nc < 0 || nc > 2) continue;
        const nextIdx = nr * 3 + nc;
        if (visited.has(nextIdx)) continue;
        const nm = getMask(tiles[nextIdx]);
        if (nm[d.opp]) {
          visited.add(nextIdx);
          queue.push(nextIdx);
        }
      }
    }

    document.querySelectorAll('.circuit-tile').forEach((el) => {
      if (visited.has(Number(el.dataset.idx))) el.classList.add('powered');
    });
    feedbackEl.style.color = '#b5aa96';
    feedbackEl.textContent = 'Поворачивай плитки — активная линия подсвечивается.';
  }

  renderGrid();
  checkCircuit();
}

function startPressureGame(onWin) {
  const arena = document.getElementById('mg-arena');
  const feedbackEl = document.getElementById('mg-feedback');

  const phases = [
    { label: 'РЕЖИМ 1 • РАЗГОН СИСТЕМЫ', rise: 0.92, fall: 0.68, fillRate: 0.52 },
    { label: 'РЕЖИМ 2 • ВЫСОКОЕ ДАВЛЕНИЕ', rise: 1.12, fall: 0.92, fillRate: 0.44 }
  ];

  let phaseIdx = 0;
  let needle = 15;
  let progress = 0;
  let pressing = false;
  let won = false;

  arena.innerHTML = `
    <div class="level-pill-row">
      <span id="gauge-phase-label">${phases[0].label}</span>
      <span id="gauge-pct-label">0%</span>
    </div>
    <div class="gauge-panel">
      <div class="gauge-bar-outer">
        <div class="gauge-green-zone"></div>
        <div class="gauge-danger-zone"></div>
        <div class="gauge-needle" id="gauge-needle"></div>
      </div>
      <div class="charge-progress-outer">
        <div class="charge-progress-fill" id="charge-fill"></div>
      </div>
      <button id="pump-hold-btn" class="hold-pump-btn">ЗАЖМИ И УДЕРЖИВАЙ</button>
    </div>
  `;

  const phaseLabel = document.getElementById('gauge-phase-label');
  const needleEl = document.getElementById('gauge-needle');
  const fillEl = document.getElementById('charge-fill');
  const pctLabel = document.getElementById('gauge-pct-label');
  const pumpBtn = document.getElementById('pump-hold-btn');

  const setPress = (state) => {
    pressing = state;
    if (state) pumpBtn.classList.add('pressing');
    else pumpBtn.classList.remove('pressing');
  };

  pumpBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); setPress(true); });
  window.addEventListener('pointerup', () => setPress(false));

  function loop() {
    if (won) return;
    const ph = phases[phaseIdx];

    if (pressing) needle += ph.rise;
    else needle -= ph.fall;

    if (needle < 0) needle = 0;
    if (needle > 100) {
      needle = 45;
      progress = Math.max(0, progress - 22);
      haptic('error');
      feedbackEl.style.color = '#e06a76';
      feedbackEl.textContent = 'Перегруз — отпускай кнопку раньше красной зоны.';
    }

    needleEl.style.left = `calc(${needle}% - 3px)`;

    if (needle >= 55 && needle <= 82) {
      progress = Math.min(100, progress + ph.fillRate);
      feedbackEl.style.color = '#7bc48b';
      feedbackEl.textContent = 'Давление в зелёной зоне — удерживай.';
    } else if (needle < 55) {
      feedbackEl.style.color = '#b5aa96';
      feedbackEl.textContent = 'Зажми кнопку, чтобы поднять стрелку в зелёную зону.';
    }

    fillEl.style.width = `${progress}%`;
    pctLabel.textContent = `${Math.floor(progress)}%`;

    if (progress >= 100) {
      if (phaseIdx + 1 < phases.length) {
        phaseIdx++;
        progress = 0;
        needle = 20;
        phaseLabel.textContent = phases[phaseIdx].label;
        feedbackEl.style.color = '#7bc48b';
        feedbackEl.textContent = 'Первый режим пройден. Удерживай второй этап.';
      } else {
        won = true;
        setPress(false);
        onWin();
        return;
      }
    }

    activeAnimFrame = requestAnimationFrame(loop);
  }
  activeAnimFrame = requestAnimationFrame(loop);
}

function startSafeLockGame(onWin) {
  const arena = document.getElementById('mg-arena');
  const feedbackEl = document.getElementById('mg-feedback');

  const wheels = [
    { options: ['ВОДКА', 'ВИСКА', 'КОФЕ', 'ЧАЙ'], idx: 0, target: 'ВИСКА' },
    { options: ['РЕАЛ', 'ЗЕНИТ', 'БАРСА', 'МИЛАН'], idx: 0, target: 'БАРСА' },
    { options: ['И ПЕПСИ', 'БЕЗ ЛЬДА', 'И ВИСКА', 'НА НОЧЬ'], idx: 0, target: 'И ВИСКА' },
    { options: ['EXO', 'BTS', 'STRAY', 'BLACK'], idx: 0, target: 'BTS' }
  ];

  function renderWheels() {
    const wheelsHtml = wheels.map((w, i) => `
      <div class="lock-wheel">
        <button class="wheel-btn" data-w="${i}" data-dir="-1">▲</button>
        <div class="wheel-value">${w.options[w.idx]}</div>
        <button class="wheel-btn" data-w="${i}" data-dir="1">▼</button>
      </div>
    `).join('');

    arena.innerHTML = `
      <div class="safe-lock-box">
        <div style="font-size:10.5px; color:#b5aa96; font-weight:700;">КОДОВЫЙ ЗАМОК ТАЙНИКА № 08-11</div>
        <div class="lock-wheels-grid">${wheelsHtml}</div>
        <button id="unlock-safe-btn" class="primary-action-btn mech-btn" style="margin-top:4px;">ОТКРЫТЬ СЕЙФ</button>
      </div>
    `;

    document.querySelectorAll('.wheel-btn').forEach((btn) => {
      btn.onclick = () => {
        const wIdx = Number(btn.dataset.w);
        const dir = Number(btn.dataset.dir);
        const len = wheels[wIdx].options.length;
        wheels[wIdx].idx = (wheels[wIdx].idx + dir + len) % len;
        haptic('light');
        renderWheels();
      };
    });

    document.getElementById('unlock-safe-btn').onclick = () => {
      const isMatch = wheels.every((w) => w.options[w.idx] === w.target);
      if (isMatch) {
        onWin();
      } else {
        haptic('error');
        feedbackEl.style.color = '#e06a76';
        feedbackEl.textContent = 'Замок не поддаётся — сверь слова с кодовой фразой в шапке дела.';
      }
    };
  }

  renderWheels();
}

/* =========================================================
   МЕНЮ НЕУДАЧНЫХ ДУБЛЕЙ (N1.MP3 - N6.MP3)
   ========================================================= */
function initBloopersModal() {
  const listEl = document.getElementById('bloopers-list');
  const statusEl = document.getElementById('blooper-player-status');
  const stopBtn = document.getElementById('stop-blooper-btn');

  listEl.innerHTML = '';
  BLOOPER_TRACKS.forEach((trk) => {
    const btn = document.createElement('button');
    btn.className = 'blooper-item-btn';
    btn.innerHTML = `<span>${trk.label}</span><span>ПУСК</span>`;

    btn.onclick = () => {
      document.querySelectorAll('.blooper-item-btn').forEach((el) => {
        el.classList.remove('active');
        el.lastElementChild.textContent = 'ПУСК';
      });
      btn.classList.add('active');
      btn.lastElementChild.textContent = 'ИГРАЕТ';

      audioEl.pause();
      audioEl.src = trk.file;
      audioEl.load();
      duckBackgroundMusicForVoice();
      audioEl.play().then(() => {
        statusEl.textContent = `Воспроизводится: ${trk.label}`;
      }).catch(() => {
        statusEl.textContent = `Файл ${trk.file} не найден в assets/`;
        restoreBackgroundMusicAfterVoice();
      });
    };

    listEl.appendChild(btn);
  });

  stopBtn.onclick = () => {
    audioEl.pause();
    document.querySelectorAll('.blooper-item-btn').forEach((el) => {
      el.classList.remove('active');
      el.lastElementChild.textContent = 'ПУСК';
    });
    statusEl.textContent = 'Воспроизведение дубля остановлено.';
    restoreBackgroundMusicAfterVoice();
  };

  bloopersMenuBtn.addEventListener('click', () => {
    if (!questCompleted && currentUnlockedStage < STAGES.length - 1) return;
    haptic('medium');
    bloopersModalEl.classList.remove('hidden');
  });

  document.getElementById('close-bloopers').addEventListener('click', () => {
    audioEl.pause();
    restoreBackgroundMusicAfterVoice();
    bloopersModalEl.classList.add('hidden');
  });
}

playBtn.addEventListener('click', () => {
  if (audioEl.paused) {
    duckBackgroundMusicForVoice();
    audioHintEl.classList.add('hidden');
    audioEl.play().then(() => {
      playBtn.textContent = 'ПАУЗА ЗАПИСИ';
      playBtn.classList.add('playing');
      reelLeft.classList.add('spinning');
      reelRight.classList.add('spinning');
    }).catch(() => {
      stopVoiceAudio();
      audioHintEl.textContent = `Файл ${activeStage?.audio || 'mp3'} не найден в папке assets/ — варианты открыты в запасном режиме`;
      audioHintEl.classList.remove('hidden');
      revealStageOptions();
    });
  } else {
    stopVoiceAudio();
  }
});

function stopVoiceAudio() {
  audioEl.pause();
  playBtn.textContent = 'ПУСК ЗАПИСИ';
  playBtn.classList.remove('playing');
  reelLeft.classList.remove('spinning');
  reelRight.classList.remove('spinning');
  restoreBackgroundMusicAfterVoice();
}

audioEl.addEventListener('loadedmetadata', () => {
  timerEl.textContent = `00:00 / ${formatTime(audioEl.duration)}`;
});

audioEl.addEventListener('timeupdate', () => {
  const cur = formatTime(audioEl.currentTime);
  const dur = formatTime(audioEl.duration);
  timerEl.textContent = `${cur} / ${dur}`;
  if (audioEl.duration > 0) {
    const pct = Math.min(100, (audioEl.currentTime / audioEl.duration) * 100);
    progressBarEl.style.width = `${pct}%`;
  }
});

function revealStageOptions() {
  const optionsList = document.getElementById('options-list');
  const optionsGateNotice = document.getElementById('options-gate-notice');
  if (optionsList) optionsList.classList.remove('hidden');
  if (optionsGateNotice) optionsGateNotice.classList.add('hidden');
}

audioEl.addEventListener('ended', () => {
  progressBarEl.style.width = '100%';
  stopVoiceAudio();
  revealStageOptions();
});

audioEl.addEventListener('error', () => {
  revealStageOptions();
});

document.getElementById('close-modal').addEventListener('click', () => {
  stopVoiceAudio();
  modalEl.classList.add('hidden');
});

modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) {
    stopVoiceAudio();
    modalEl.classList.add('hidden');
  }
});

document.getElementById('reset-progress-btn').addEventListener('click', () => {
  if (confirm('Сбросить прогресс расследования к началу?')) {
    localStorage.removeItem(STORAGE_KEY);
    currentUnlockedStage = 0;
    unlockedWords = [false, false, false, false];
    questCompleted = false;
    trainTriggeredBetween3And4 = false;
    stopVoiceAudio();
    stopMinigameLoop();
    modalEl.classList.add('hidden');
    mgModalEl.classList.add('hidden');
    bloopersModalEl.classList.add('hidden');
    renderBoard();
  }
});

loadState();
renderBoard();
initBloopersModal();
initSplashScreen();


document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'copy-final-phrase-btn') {
    const phrase = 'ВИСКА БАРСА И ВИСКА BTS';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phrase).then(() => {
        e.target.textContent = 'ПАРОЛЬ СКОПИРОВАН';
        haptic('success');
      }).catch(() => {
        e.target.textContent = phrase;
      });
    } else {
      e.target.textContent = phrase;
    }
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (!audioEl.paused) stopVoiceAudio();
    if (!trainAudioEl.paused) trainAudioEl.pause();
  }
});
