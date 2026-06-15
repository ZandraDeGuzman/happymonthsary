# 💌 Love Letter — Monthly Anniversary Website

A simple, elegant 3-screen monthsary website.

## Folder Structure
```
love-letter/
├── index.html      ← Main file (open this)
├── style.css       ← Styles
├── script.js       ← Logic + config
├── music/
│   └── song.mp3    ← Add your MP3 here
└── images/         ← (optional) extra photos
```

## Customization

Open `script.js` and edit the **CONFIG** block at the top:

```js
const CONFIG = {
  recipient:  "Yuri",          // ← Her name
  sender:     "Zayd",          // ← Your name
  date:       "June 15, 2026", // ← The date
  monthsary:  "8th",           // ← Monthsary number
  letter: `...`                // ← Your letter text
};
```

## Adding Music

1. Place your `.mp3` file inside the `music/` folder
2. Rename it to `song.mp3`  
   *(or change the `MUSIC_FILE` path in script.js)*

## How to Open

Just double-click `index.html` — no server needed.

> **Note:** Music autoplay requires a user interaction first (browser policy).  
> The ♪ button in the bottom-right lets her play/pause anytime.
