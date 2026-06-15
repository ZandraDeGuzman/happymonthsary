
const CONFIG = {
  recipient:  "Yuri",
  sender:     "Zayd",
  date:       "June 15, 2026",
  monthsary:  "8th",

  letter: `To my Yuying,

Hi, baby. 

Eight months. Sometimes I still can't believe how quickly time has flown. It feels like just yesterday we were getting to know each other, and now we've built so many memories that I carry with me every single day.

I know we don't have that "perfect" relationship where everything is always easy, sweet, and carefree. We've had our misunderstandings, our difficult days, and moments that tested us. But honestly, I wouldn't trade what we have for anything. Ours is real. It's built on honesty, growth, forgiveness, and choosing each other even when things aren't easy. And to me, that's so much more beautiful than perfection.

Every small memory with you has become one of my most treasured things. The way you laugh makes me want to hear it over and over again. The comfort of your presence. The way being near you feels like coming home, no matter how exhausting the day has been.

And I am so grateful that somehow, out of all the paths in this world, yours crossed mine. Going from best friends to lovers feels like something straight out of a story, yet somehow it's ours. Looking back, it feels like destiny quietly working in the background all along. I'm especially grateful that I get to experience college with you by my side. Even though CS can be overwhelming, stressful, and demanding, having you as my classmate, study buddy, best friend, and partner makes every challenge feel lighter. The long days, the deadlines, the exams, the sleepless nights, they all become easier because I get to share them with you.

Thank you for choosing to walk beside me these past eight months. Thank you for fighting for us, for believing in us, and for choosing to start over with me again when it would've been easier to walk away. Thank you for choosing us. Thank you for choosing me.

Thank you for your patience when I am difficult. Thank you for your laughter that brightens even my worst days. Thank you for your softness that makes me feel safe and your strength that inspires me more than you know. Thank you for being exactly who you are, and thank you for staying strong through everything life has thrown your way.

I am proud of you, baby. Proud of the person you are, the person you're becoming, and the way you continue moving forward even when things get hard.

I love you more than words on a page could ever fully express. More than every message, every call, every hug, every "I miss you," and every "I love you" I've ever said. And if there's one thing I know for sure, it's that these eight months have been some of the most meaningful and happiest months of my life because I got to spend them with you.

Here's to many more chapters, more memories, more laughter, more growth, and more love together.

Happy 8th motmot, mahal koooo. `
};

const MUSIC_FILE = "music/Daniel Caesar - Always (Official Audio).mp3";

/* ============================================================ */
/* STATE                                                          */
/* ============================================================ */
let currentScreen = 'intro';
let musicPlaying  = false;
let noClickCount  = 0;

/* ============================================================ */
/* INIT                                                          */
/* ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();

  // Spawn petals on intro
  spawnPetals('petals-container', 7);

  // Set up music
  setupMusic();

  // Envelope click
  const envelope = document.getElementById('envelope');
  if (envelope) envelope.addEventListener('click', openEnvelope);
});

/* ============================================================ */
/* APPLY CONFIG                                                  */
/* ============================================================ */
function applyConfig() {
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('env-recipient', CONFIG.recipient);
  set('letter-to',     CONFIG.recipient);
  set('letter-from',   CONFIG.sender);
  set('letter-date',   CONFIG.date);
  set('closing-from',  CONFIG.sender);
}

/* ============================================================ */
/* HANDLE "NO" CLICK — playful deterrent                         */
/* ============================================================ */
function handleNo() {
  noClickCount++;
  const hint = document.getElementById('no-hint');
  const messages = [
    "Are you sure? 🥺",
    "Please?",
    "Come on, just one peek...",
    "You really won't? 🌸",
    "Okay fine, but you're missing out ❤"
  ];
  if (hint) {
    hint.textContent = messages[Math.min(noClickCount - 1, messages.length - 1)];
  }

  // After 5 no's, auto-trigger yes with a little shake
  if (noClickCount >= 5) {
    const card = document.getElementById('tag-card');
    if (card) {
      card.style.animation = 'tagShake 0.4s ease';
      setTimeout(() => startJourney(), 500);
    }
  }
}

/* ============================================================ */
/* TAG SHAKE KEYFRAME (injected)                                 */
/* ============================================================ */
(function injectShake() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tagShake {
      0%, 100% { transform: rotate(0deg); }
      20%       { transform: rotate(-4deg); }
      40%       { transform: rotate(4deg); }
      60%       { transform: rotate(-3deg); }
      80%       { transform: rotate(2deg); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================ */
/* SCREEN TRANSITION                                             */
/* ============================================================ */
function transitionTo(screenId, callback) {
  const overlay = document.getElementById('transition-overlay');
  if (!overlay) { callback?.(); return; }

  overlay.classList.add('fade-in');

  setTimeout(() => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
    callback?.();

    setTimeout(() => overlay.classList.remove('fade-in'), 80);
  }, 480);
}

/* ============================================================ */
/* START JOURNEY (Yes button)                                    */
/* ============================================================ */
function startJourney() {
  playMusic();

  const player = document.getElementById('music-player');
  if (player) player.classList.add('visible');

  transitionTo('envelope-screen', () => {
    currentScreen = 'envelope';
    spawnPetals('petals-container-2', 5);

    setTimeout(() => {
      const wrapper = document.getElementById('envelope-wrapper');
      if (wrapper) wrapper.classList.add('bounce');
    }, 900);
  });
}

/* ============================================================ */
/* OPEN ENVELOPE                                                 */
/* ============================================================ */
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const seal     = document.getElementById('wax-seal');
  const wrapper  = document.getElementById('envelope-wrapper');
  const tapHint  = document.getElementById('tap-hint');

  if (!envelope || envelope.classList.contains('open')) return;

  if (wrapper) wrapper.classList.remove('bounce');
  if (tapHint) tapHint.style.opacity = '0';

  // Crack seal
  if (seal) {
    seal.classList.add('cracking');
    seal.addEventListener('animationend', () => {
      seal.style.display = 'none';
    }, { once: true });
  }

  // Open flap
  setTimeout(() => envelope.classList.add('open'), 420);

  // Go to letter
  setTimeout(() => {
    transitionTo('letter-screen', () => {
      currentScreen = 'letter';
      spawnPetals('petals-container-3', 5);
      // Scroll to top
      document.getElementById('letter-screen').scrollTop = 0;
      setTimeout(startLetterTypewriter, 500);
    });
  }, 1500);
}

/* ============================================================ */
/* LETTER TYPEWRITER                                             */
/* ============================================================ */
function startLetterTypewriter() {
  const output = document.getElementById('letter-text-output');
  const cursor = document.getElementById('letter-cursor');
  if (!output) return;

  const text  = CONFIG.letter;
  let   index = 0;
  const speed = 28; // ms per character

  const interval = setInterval(() => {
    if (index < text.length) {
      if (text[index] === '\n') {
        output.innerHTML += '<br/>';
      } else {
        output.innerHTML += escapeHtml(text[index]);
      }
      index++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        if (cursor) cursor.style.display = 'none';
      }, 1800);
    }
  }, speed);
}

function escapeHtml(char) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return map[char] || char;
}

/* ============================================================ */
/* FLOATING PETALS                                               */
/* ============================================================ */
function spawnPetals(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const size  = 8 + Math.random() * 10;
    const left  = Math.random() * 100;
    const dur   = 55 + Math.random() * 40;
    const delay = Math.random() * 18;
    const drift = (Math.random() - 0.5) * 50;

    petal.style.cssText = `
      --size:  ${size}px;
      --dur:   ${dur}s;
      --delay: ${delay}s;
      --drift: ${drift}px;
      left: ${left}%;
      top: -50px;
    `;

    container.appendChild(petal);
  }
}

/* ============================================================ */
/* MUSIC                                                          */
/* ============================================================ */
function setupMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  audio.volume = 0.5;
}

function playMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  audio.play()
    .then(() => { musicPlaying = true; updateMusicIcon(); })
    .catch(() => console.log('Autoplay blocked — user can click ♪'));
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  if (musicPlaying) { audio.pause(); musicPlaying = false; }
  else              { audio.play();  musicPlaying = true;  }
  updateMusicIcon();
}

function updateMusicIcon() {
  const icon = document.getElementById('music-icon');
  if (icon) icon.textContent = musicPlaying ? '⏸' : '♪';
}

function setVolume(val) {
  const audio = document.getElementById('bg-music');
  if (audio) audio.volume = parseFloat(val);
}

/* ============================================================ */
/* KEYBOARD                                                       */
/* ============================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (currentScreen === 'intro')    startJourney();
    else if (currentScreen === 'envelope') openEnvelope();
  }
});
