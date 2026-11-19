const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try {
    tg.setHeaderColor('#ebe2ce');
    tg.setBackgroundColor('#dfd5c0');
  } catch (e) {}
}

const STORAGE_KEY = 'detective_maria_state_v5';

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
    emoji: '🕵️‍♀️📁',
    bgGradient: 'linear-gradient(135deg, #2c3e50, #8e44ad)',
    caption: 'Улика №0: Пустой сейф и следы лап',
    desc: 'Детектив Мария, в твой день рождения из тайника исчез главный конверт. Понятые (кот и собака) отказываются давать показания без вкусняшек. Злодей оставил аудиозапись на кассете. Нажми «ПУСК ЗАПИСИ» и начинай расследование.',
    isIntro: true,
    actionText: 'ПРИНЯТЬ ДЕЛО'
  },
  {
    id: 1,
    tag: 'УЛИКА №1 • ДОПРОС СВИДЕТЕЛЯ',
    boardTitle: 'Стендап с душком',
    handNote: 'Фото из зала (сомнительно)',
    shapeClass: 'shape-polaroid',
    hasTape: false,
    rotate: 2.5,
    x: 186, y: 122,
    audio: 'assets/stage2.mp3',
    photo: 'assets/photo2.jpg',
    emoji: '🎤💩',
    bgGradient: 'linear-gradient(135deg, #b71540, #e58e26)',
    caption: 'Показания Кучерявого (не подтверждены)',
    desc: 'Кучерявый уверяет, что вечер перед кражей прошёл тихо — вы просто смотрели стендап. Но детектор лжи дымится. Включи запись и выясни, что на самом деле произошло.',
    question: 'Какая катастрофа чуть не сорвала просмотр того стендапа?',
    options: [
      { text: 'Сели батарейки в пульте от телевизора', correct: false, hint: 'Кучерявый бы обрадовался, но нет.' },
      { text: 'Критическая ситуация на грани катастрофы в штанах', correct: true },
      { text: 'Соседи вызвали полицию из-за смеха', correct: false, hint: 'Смех был, но главная угроза таилась внутри.' }
    ],
    unlockWordIndex: 0
  },
  {
    id: 2,
    tag: 'УЛИКА №2 • АРХИВ VHS',
    boardTitle: 'Дело «Бригада»',
    handNote: 'Кассета зажёвана на 18+',
    shapeClass: 'shape-cassette',
    hasTape: false,
    rotate: -1.8,
    x: 16, y: 252,
    audio: 'assets/stage3.mp3',
    photo: 'assets/photo3.jpg',
    emoji: '📼🔞',
    bgGradient: 'linear-gradient(135deg, #1e272e, #ff3f34)',
    caption: 'Плёнка зажёвана на середине серии',
    desc: 'Оперативники изъяли видеокассету с «Бригадой». Вы пытались посмотреть этот сериал уже не раз, но до финальных титров дело так и не дошло.',
    question: 'По какой уважительной причине Саша Белый вечно остаётся без зрителей?',
    options: [
      { text: 'Слишком закрученный криминальный сюжет', correct: false, hint: 'Не в сюжете дело, детектив.' },
      { text: 'Постоянный переход к рейтингу 18+ между вами', correct: true },
      { text: 'Внезапно отключают электричество', correct: false, hint: 'Искры летят, но не из розетки.' }
    ],
    unlockWordIndex: 1
  },
  {
    id: 3,
    tag: 'УЛИКА №3 • АРХИВ 8 ЛЕТ',
    boardTitle: 'Билет в прошлое',
    handNote: 'Контроль • 8 лет назад',
    shapeClass: 'shape-ticket',
    hasTape: true,
    rotate: 2.1,
    x: 186, y: 376,
    audio: 'assets/stage4.mp3',
    photo: 'assets/photo4.jpg',
    emoji: '🎟️🕰️',
    bgGradient: 'linear-gradient(135deg, #0a3d62, #38ada9)',
    caption: 'Кинотеатр • 8 лет назад',
    desc: 'На дне папки обнаружен выцветший билет в кино восьмилетней давности. Точка отсчёта, после которой судьба разбросала вас на долгие 8 лет.',
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
    handNote: 'Внимание: шум на путях!',
    shapeClass: 'shape-radio',
    hasTape: false,
    rotate: -2.4,
    x: 16, y: 502,
    audio: 'assets/stage5.mp3',
    photo: 'assets/photo5.jpg',
    emoji: '📻💜',
    bgGradient: 'linear-gradient(135deg, #4a148c, #e91e63)',
    caption: 'Перехвачен зашифрованный плейлист',
    desc: 'Финальный узел! Злодей зашифровал последнее слово шифра на частотах твоих любимых групп — BTS и Cortis. Внимание: при включении записи возможны помехи на путях!',
    hasTrainEvent: true,
    question: 'Какое слово на самом деле завершает главный девиз «Виска Барса и виска...»?',
    options: [
      { text: 'Каталония', correct: false, hint: 'Слишком предсказуемо! Посмотри на улики вокруг.' },
      { text: 'Кучерявый', correct: false, hint: 'Много чести для свидетеля.' },
      { text: 'BTS', correct: true }
    ],
    unlockWordIndex: 3
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
    emoji: '✉️❤️',
    bgGradient: 'linear-gradient(135deg, #b31217, #e52d27)',
    caption: 'С Днём Рождения, Детектив Мария!',
    desc: 'Все нити сошлись. Злодей полностью разоблачён и готов сдать главный вещдок. Послушай финальное обращение и назови собранный пароль вживую, чтобы забрать конверт.',
    isFinal: true
  }
];

let currentUnlockedStage = 0;
let unlockedWords = [false, false, false, false];
let activeStage = null;
let isAdvancing = false;

let bgmEnabled = true;
const BGM_DEFAULT_VOL = 0.35;

const boardNodesEl = document.getElementById('nodes-layer');
const threadsSvgEl = document.getElementById('threads-svg');
const modalEl = document.getElementById('stage-modal');
const audioEl = document.getElementById('stage-audio');
const bgMusicEl = document.getElementById('bg-music');
const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
const playBtn = document.getElementById('play-btn');
const reelLeft = document.getElementById('reel-left');
const reelRight = document.getElementById('reel-right');
const timerEl = document.getElementById('audio-timer');
const progressBarEl = document.getElementById('tape-progress-bar');
const audioHintEl = document.getElementById('audio-status-hint');
const tapeFileLabel = document.getElementById('tape-file-label');

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

  setTimeout(() => {
    barEl.style.width = '35%';
    line2.classList.remove('hidden');
  }, 450);

  setTimeout(() => {
    barEl.style.width = '75%';
    line3.classList.remove('hidden');
  }, 950);

  setTimeout(() => {
    barEl.style.width = '100%';
    line4.classList.remove('hidden');
    enterBtn.disabled = false;
    enterBtn.classList.add('ready');
    enterBtn.textContent = '📂 ВСКРЫТЬ ДЕЛО';
    haptic('light');
  }, 1450);

  enterBtn.addEventListener('click', () => {
    haptic('medium');
    splashEl.classList.add('fade-out');
    startBackgroundMusic();
    setTimeout(() => {
      splashEl.style.display = 'none';
    }, 600);
  });
}

function startBackgroundMusic() {
  if (!bgmEnabled) return;
  bgMusicEl.volume = BGM_DEFAULT_VOL;
  bgMusicEl.play().catch(() => {});
}

function pauseBackgroundMusicForVoice() {
  if (!bgMusicEl.paused) {
    bgMusicEl.pause();
  }
}

function resumeBackgroundMusicAfterVoice() {
  if (bgmEnabled && audioEl.paused) {
    bgMusicEl.volume = BGM_DEFAULT_VOL;
    bgMusicEl.play().catch(() => {});
  }
}

bgmToggleBtn.addEventListener('click', () => {
  bgmEnabled = !bgmEnabled;
  haptic('light');
  if (bgmEnabled) {
    bgmToggleBtn.textContent = '🔊 ФОН';
    bgmToggleBtn.classList.remove('muted');
    if (audioEl.paused) {
      startBackgroundMusic();
    }
  } else {
    bgmToggleBtn.textContent = '🔇 ФОН';
    bgmToggleBtn.classList.add('muted');
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
  } catch (e) {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentUnlockedStage,
      unlockedWords
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
    if (i < currentUnlockedStage) {
      path.classList.add('active');
    }
    threadsSvgEl.appendChild(path);
  }

  STAGES.forEach((stage) => {
    const node = document.createElement('div');
    node.className = `board-node ${stage.shapeClass}`;
    node.style.left = `${stage.x}px`;
    node.style.top = `${stage.y}px`;
    node.style.transform = `rotate(${stage.rotate}deg)`;

    if (stage.id < currentUnlockedStage) {
      node.classList.add('completed');
    } else if (stage.id === currentUnlockedStage) {
      node.classList.add('available');
    } else {
      node.classList.add('locked');
    }

    const statusText = stage.id < currentUnlockedStage
      ? '✓ ПРОЯВЛЕНО'
      : stage.id === currentUnlockedStage
        ? '● АКТИВНАЯ УЛИКА'
        : '🔒 НЕГАТИВ';

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

  const polaroidArt = document.getElementById('polaroid-art');
  const polaroidImg = document.getElementById('polaroid-img');
  const polaroidEmoji = document.getElementById('polaroid-emoji');

  polaroidArt.style.background = stage.bgGradient;
  polaroidEmoji.textContent = stage.emoji;
  polaroidEmoji.style.display = 'inline';
  polaroidImg.classList.add('hidden');

  if (stage.photo) {
    polaroidImg.onload = () => {
      polaroidImg.classList.remove('hidden');
      polaroidEmoji.style.display = 'none';
    };
    polaroidImg.onerror = () => {
      polaroidImg.classList.add('hidden');
      polaroidEmoji.style.display = 'inline';
    };
    polaroidImg.src = stage.photo;
  }

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
    actionBtn.onclick = () => completeCurrentStage();
  } else if (stage.isFinal) {
    quizBox.style.display = 'none';
    actionBtn.classList.add('hidden');
    finalContainer.innerHTML = `
      <div class="final-banner">
        <div style="font-size: 11px; color: #5c5347; font-weight: 700;">КОДОВАЯ ФРАЗА ДЛЯ ПОЛУЧЕНИЯ КОНВЕРТА:</div>
        <div class="final-phrase">«ВИСКА БАРСА И ВИСКА BTS»</div>
        <div style="font-size: 12px; color: #2b2520;">Подойди к главному подозреваемому и произнеси этот пароль вслух!</div>
      </div>
    `;
  } else {
    quizBox.style.display = 'block';
    actionBtn.classList.add('hidden');
    document.getElementById('modal-question').textContent = stage.question;

    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

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
          feedbackMsg.style.color = '#1e7e34';
          feedbackMsg.textContent = '✓ Улика подтверждена! Слово шифра открыто.';
          unlockCodeWord(stage.unlockWordIndex);
          setTimeout(() => completeCurrentStage(), 950);
        } else {
          haptic('error');
          btn.classList.add('wrong');
          feedbackMsg.style.color = '#c9182b';
          feedbackMsg.textContent = opt.hint || 'Неверно, попробуй ещё раз!';
          setTimeout(() => btn.classList.remove('wrong'), 450);
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

function completeCurrentStage() {
  const justFinishedStageId = activeStage ? activeStage.id : -1;
  if (activeStage && activeStage.id === currentUnlockedStage) {
    currentUnlockedStage = Math.min(STAGES.length - 1, currentUnlockedStage + 1);
    saveState();
  }
  stopVoiceAudio();
  modalEl.classList.add('hidden');
  renderBoard();

  if (justFinishedStageId === 4 && currentUnlockedStage === 5) {
    setTimeout(() => openStageModal(STAGES[5]), 450);
  }
}

playBtn.addEventListener('click', () => {
  if (audioEl.paused) {
    if (activeStage?.hasTrainEvent) {
      triggerTrainScreamer();
    }

    pauseBackgroundMusicForVoice();

    audioHintEl.classList.add('hidden');
    audioEl.play().then(() => {
      playBtn.textContent = '❚❚ ПАУЗА ЗАПИСИ';
      playBtn.classList.add('playing');
      reelLeft.classList.add('spinning');
      reelRight.classList.add('spinning');
    }).catch(() => {
      stopVoiceAudio();
      audioHintEl.textContent = `Файл ${activeStage?.audio || 'mp3'} ещё не загружен в папку assets/`;
      audioHintEl.classList.remove('hidden');
    });
  } else {
    stopVoiceAudio();
  }
});

function stopVoiceAudio() {
  audioEl.pause();
  playBtn.textContent = '▶ ПУСК ЗАПИСИ';
  playBtn.classList.remove('playing');
  reelLeft.classList.remove('spinning');
  reelRight.classList.remove('spinning');
  resumeBackgroundMusicAfterVoice();
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

audioEl.addEventListener('ended', () => {
  progressBarEl.style.width = '100%';
  stopVoiceAudio();
});

function triggerTrainScreamer() {
  haptic('heavy');
  const overlay = document.getElementById('train-overlay');
  const trainEntity = document.getElementById('train-entity');
  
  trainEntity.style.animation = 'none';
  void trainEntity.offsetWidth;
  trainEntity.style.animation = '';

  overlay.classList.remove('hidden');

  setTimeout(() => haptic('heavy'), 450);
  setTimeout(() => haptic('heavy'), 950);

  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 2800);
}

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
    stopVoiceAudio();
    modalEl.classList.add('hidden');
    renderBoard();
  }
});

loadState();
renderBoard();
initSplashScreen();
