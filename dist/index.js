import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, createElement, useMemo, useRef, useImperativeHandle, useState, useEffect, useCallback, useReducer } from "react";
import { createPortal } from "react-dom";
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Maximize2 = createLucideIcon("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MicOff = createLucideIcon("MicOff", [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mic = createLucideIcon("Mic", [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Minimize2 = createLucideIcon("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Paperclip = createLucideIcon("Paperclip", [
  [
    "path",
    {
      d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
      key: "1u3ebp"
    }
  ]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Volume2 = createLucideIcon("Volume2", [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const THEMES = {
  dark: {
    background: "rgba(15, 23, 42, 0.95)",
    textPrimary: "#ffffff",
    textSecondary: "#cbd5e1",
    controlBg: "rgba(0, 0, 0, 0.3)",
    controlHover: "rgba(0, 0, 0, 0.5)"
  },
  light: {
    background: "rgba(248, 250, 252, 0.95)",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    controlBg: "rgba(255, 255, 255, 0.5)",
    controlHover: "rgba(255, 255, 255, 0.8)"
  },
  blue: {
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)",
    textPrimary: "#ffffff",
    textSecondary: "#dbeafe",
    controlBg: "rgba(255, 255, 255, 0.2)",
    controlHover: "rgba(255, 255, 255, 0.3)"
  },
  purple: {
    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(147, 51, 234, 0.95) 100%)",
    textPrimary: "#ffffff",
    textSecondary: "#e9d5ff",
    controlBg: "rgba(255, 255, 255, 0.2)",
    controlHover: "rgba(255, 255, 255, 0.3)"
  }
};
const chat$2Z = {
  input: {
    placeholder: "Иҭажәгал шәацҳара...",
    listening: "Аӡырҩра..."
  },
  enableSound: "Абжьы аҿактәуп",
  stt: {
    transcribing: "Атранскрипциа: ",
    micActive: "Амикрофон активуп...",
    heardError: "Саҭамыз, убжьы смаҳаит. Даҽазнык шәҽазышәшәа.",
    micAccessError: "Амикрофон ахь анеира ауам. Азинқәа гәашәҭ."
  },
  speed: {
    idle: "Аусда:",
    talk: "Ацәажәара:"
  }
};
const avatar$2Z = {
  loading: "Аватар аҭагалара...",
  title: {
    maximize: "Амаксималтәра",
    minimize: "Аминималтәра",
    close: "Иарктәуп",
    clickToMaximize: "Амаксимализациа азы ақәыӷәӷәара",
    clickToMinimize: "Ирмаҷразы шәақәыӷәӷәа"
  },
  error: {
    loadFailed: "Аватар аҭагалара ауам: {{error}} ",
    playerNotLoaded: "АниаПлеер иҭагалаӡам",
    passwordRequired: "Ишәарҭоу .ania афаил азы иаҭахуп амаӡажәа",
    noSource: "Аватар ахыҵхырҭа аҭаӡам (avatarUrl мамзаргьы avatarData)"
  }
};
const greetings$2$ = {
  "0": "Салам! Сышԥабыцхраари иахьа?",
  "1": "Бзиара умаз! Бзиала шәаабеит! Иҟасҵар сылшозеи?",
  "2": "Мшыбзиа! Даара сеигәырӷьоит шәацәажәара!",
  "3": "Бзиара умаз! Сара абра сыҟоуп ацхырааразы. Иуҭахузеи?",
  "4": "Бзиара умаз! Шәшԥаҟоу? Ишԥасылшо ахәарҭа сзаанагар?"
};
const waiting$2$ = {
  "0": "Сазхәыцып...",
  "1": "Знык...",
  "2": "Аус адулара...",
  "3": "Секундк...",
  "4": "Сара уи уара узы игәасҭоит..."
};
const ab = {
  chat: chat$2Z,
  avatar: avatar$2Z,
  greetings: greetings$2$,
  waiting: waiting$2$
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2Z,
  chat: chat$2Z,
  default: ab,
  greetings: greetings$2$,
  waiting: waiting$2$
}, Symbol.toStringTag, { value: "Module" }));
const chat$2Y = {
  input: {
    placeholder: "Ketik pesan droeneuh...",
    listening: "Teungoh tadeungo..."
  },
  enableSound: "Aktifkan Su",
  stt: {
    transcribing: "Transkripsi: ",
    micActive: "Mikrofon aktif...",
    heardError: "Maaf, hana jeut lon deungoe. Neu cuba lom.",
    micAccessError: "Hana jeuet ta akses mikrofon. Cek izin."
  },
  speed: {
    idle: "Nganggur:",
    talk: "Ceramah:"
  }
};
const avatar$2Y = {
  loading: "Meumuat avatar...",
  title: {
    maximize: "Maksimalkan",
    minimize: "Meuminimalkan",
    close: "Tutop",
    clickToMaximize: "Klik keu maksimal",
    clickToMinimize: "Klik keu neu minimalkan"
  },
  error: {
    loadFailed: "Gagal memuat avatar: {{error}} . ",
    playerNotLoaded: "AniaPlayer hana geumuat",
    passwordRequired: "Kata sandi nyang peureulee keu file .ania nyang ka teusandi .",
    noSource: "Hana sumber avatar nyang ka geubri (Url avatar atawa Data avatar)"
  }
};
const greetings$2_ = {
  "0": "Hai! Pakriban cara lôn tulông gata uroenyoe?",
  "1": "Halo! Saleuem! Peue nyang jeuet ulôn peubuet keu gata?",
  "2": "Euk! Jadi seunang that meututo ngon droeneuh!",
  "3": "Halo! Lon disinoe keuneuk bantu. Peue nyang gata peureulée?",
  "4": "Hai! Puhaba? Pakriban cara jeuet keu manfaat?"
};
const waiting$2_ = {
  "0": "Bah lon pike...",
  "1": "Saboh saat...",
  "2": "Peuproses...",
  "3": "Cuma si detik...",
  "4": "Lon cek nyan keu droeneuh..."
};
const ace = {
  chat: chat$2Y,
  avatar: avatar$2Y,
  greetings: greetings$2_,
  waiting: waiting$2_
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2Y,
  chat: chat$2Y,
  default: ace,
  greetings: greetings$2_,
  waiting: waiting$2_
}, Symbol.toStringTag, { value: "Module" }));
const chat$2X = {
  input: {
    placeholder: "Co lok ni...",
    listening: "Wiinyo..."
  },
  enableSound: "Yer dwan",
  stt: {
    transcribing: "Coyo lok: ",
    micActive: "Microphone tye ka tic...",
    heardError: "Tima kica, pe atwero winyo lokki. Tim ber item doki.",
    micAccessError: "Pe itwero donyo i cim. Nen twero."
  },
  speed: {
    idle: "Pe tiyo:",
    talk: "Lok:"
  }
};
const avatar$2X = {
  loading: "Tye ka keto cal ma ki lwongo ni avatar...",
  title: {
    maximize: "Med",
    minimize: "Dwok piny",
    close: "Cego",
    clickToMaximize: "Dii me medo",
    clickToMinimize: "Dii me dwoko piny"
  },
  error: {
    loadFailed: "Pe ki twero keto cal: {{error}} ",
    playerNotLoaded: "AniaPlayer pe ki keto",
    passwordRequired: "Lok me donyo ma mite pi karatac ma ki keto i .ania",
    noSource: "Pe kimiyo kama ki kwanyo iye cal (avatarUrl onyo avatarData)"
  }
};
const greetings$2Z = {
  "0": "Apwoyo! Atwero konyi nining tin?",
  "1": "Amoti! Wa joli! Atwero timo gin ango piri?",
  "2": "Amoto wu! Cwinya yom me lok kwedi!",
  "3": "Amoti! Atye kany me konyi. Gin ango ma imito?",
  "4": "Amoti kactoma! Itye ma be? Atwero bedo ki kony nining?"
};
const waiting$2Z = {
  "0": "Wek atam...",
  "1": "Cawa acel...",
  "2": "Tiimo...",
  "3": "Pi ceken manok...",
  "4": "Atye ka neno ni piri..."
};
const ach = {
  chat: chat$2X,
  avatar: avatar$2X,
  greetings: greetings$2Z,
  waiting: waiting$2Z
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2X,
  chat: chat$2X,
  default: ach,
  greetings: greetings$2Z,
  waiting: waiting$2Z
}, Symbol.toStringTag, { value: "Module" }));
const chat$2W = {
  input: {
    placeholder: "Tik jou boodskap...",
    listening: "Luister tans..."
  },
  enableSound: "Aktiveer klank",
  stt: {
    transcribing: "Transkripsie: ",
    micActive: "Mikrofoon aktief...",
    heardError: "Jammer, kon jou nie hoor nie. Probeer asseblief weer.",
    micAccessError: "Kan nie toegang tot mikrofoon kry nie. Gaan toestemmings na."
  },
  speed: {
    idle: "Idle:",
    talk: "Praat:"
  }
};
const avatar$2W = {
  loading: "Laai tans avatar …",
  title: {
    maximize: "Maksimeer",
    minimize: "Minimaliseer",
    close: "Maak toe",
    clickToMaximize: "Klik om te maksimeer",
    clickToMinimize: "Klik om te minimaliseer"
  },
  error: {
    loadFailed: "Kon nie avatar laai nie: {{error}} ",
    playerNotLoaded: "AniaPlayer nie gelaai nie",
    passwordRequired: "Wagwoord word vereis vir geënkripteerde .ania-lêer",
    noSource: "Geen avatarbron verskaf nie (avatarUrl of avatarData)"
  }
};
const greetings$2Y = {
  "0": "Hallo! Hoe kan ek jou vandag help?",
  "1": "Hallo! Welkom! Wat kan ek vir jou doen?",
  "2": "Hallo daar! So bly om met jou te praat!",
  "3": "Hallo! Ek is hier om te help. Wat het jy nodig?",
  "4": "Hallo! Hoe gaan dit met jou? Hoe kan ek nuttig wees?"
};
const waiting$2Y = {
  "0": "Laat my dink...",
  "1": "Een oomblik...",
  "2": "Verwerk tans …",
  "3": "Net 'n sekonde...",
  "4": "Ek kyk dit vir jou..."
};
const af = {
  chat: chat$2W,
  avatar: avatar$2W,
  greetings: greetings$2Y,
  waiting: waiting$2Y
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2W,
  chat: chat$2W,
  default: af,
  greetings: greetings$2Y,
  waiting: waiting$2Y
}, Symbol.toStringTag, { value: "Module" }));
const chat$2V = {
  input: {
    placeholder: "Type wo nkrasɛm no...",
    listening: "Tie a woretie..."
  },
  enableSound: "Ma Nnyigyei nyɛ adwuma",
  stt: {
    transcribing: "Nsɛm a wɔkyerɛw: ",
    micActive: "Microphone a ɛyɛ adwuma...",
    heardError: "Yɛpa wo kyɛw, mantumi ante wo. Yɛsrɛ sɛ sɔ hwɛ bio.",
    micAccessError: "Wontumi nkɔ afiri a wɔde kasa no so. Hwɛ tumi krataa ahorow."
  },
  speed: {
    idle: "Idle: 1 .",
    talk: "Ɔkasa:"
  }
};
const avatar$2V = {
  loading: "Wode avatar rekɔ so...",
  title: {
    maximize: "Maximize",
    minimize: "Tew so",
    close: "Bɛto mu",
    clickToMaximize: "Klik so na fa yɛ kɛse",
    clickToMinimize: "Klik so na fa ketewaa bi"
  },
  error: {
    loadFailed: "Wɔantumi anhyɛ avatar: {{error}} . ",
    playerNotLoaded: "AniaPlayer no nnyɛ load",
    passwordRequired: "Password a ɛho hia ma .ania fael a wɔabɔ no kokoam",
    noSource: "Wɔamfa avatar fibea biara amma (avatarUrl anaa avatarData) ."
  }
};
const greetings$2X = {
  "0": "Hi! Mɛyɛ dɛn aboa wo nnɛ?",
  "1": "Hɛlo! Akwaaba! Dɛn na metumi ayɛ ama wo?",
  "2": "Wo a wowɔ hɔ! Anigye kɛse sɛ me ne wo bɛkasa!",
  "3": "Hɛlo! Mewɔ ha sɛ merebɛboa. Dɛn na wuhia?",
  "4": "Hi! Wo ho te sɛn? Mɛyɛ dɛn atumi anya mfaso?"
};
const waiting$2X = {
  "0": "Ma mensusuw ho...",
  "1": "Bere tiaa bi...",
  "2": "Nneɛma a wɔyɛ...",
  "3": "Sekan biako pɛ...",
  "4": "Me deɛ, merehwɛ saa ama wo..."
};
const ak = {
  chat: chat$2V,
  avatar: avatar$2V,
  greetings: greetings$2X,
  waiting: waiting$2X
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2V,
  chat: chat$2V,
  default: ak,
  greetings: greetings$2X,
  waiting: waiting$2X
}, Symbol.toStringTag, { value: "Module" }));
const chat$2U = {
  input: {
    placeholder: "Kyewo lembe peri...",
    listening: "Winjo..."
  },
  enableSound: "Wek dwal",
  stt: {
    transcribing: "Goyo: ",
    micActive: "Microphone utiye ka tic...",
    heardError: "Tima kisa, awinjo ngo. Tem kendu.",
    micAccessError: "Icopo nwangu ngo microphone. Nen twero."
  },
  speed: {
    idle: "Idle:",
    talk: "Wec:"
  }
};
const avatar$2U = {
  loading: "Ube ketho avatar...",
  title: {
    maximize: "Medu",
    minimize: "Dwok piny",
    close: "Cego",
    clickToMaximize: "Dii pi medu",
    clickToMinimize: "Dii pi jwigo piny"
  },
  error: {
    loadFailed: "Utimo ngo avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer epe",
    passwordRequired: "Lanyuth mitere pi .ania file ma jugwoko",
    noSource: "Kabedo pa avatar moko epe (avatarUrl nyo avatarData)"
  }
};
const greetings$2W = {
  "0": "Amothi! Acopo konyi nenedi tin?",
  "1": "Maberi! Wofoyo bino! Ango ma acopo timo iri?",
  "2": "Nenedi kuca! Cwinya yom ni wecu kudi!",
  "3": "Maberi! Atiye kany pi konyo. Imito ango?",
  "4": "Maberi! Itye nenedi? Acopo bedo ku kony nenedi?"
};
const waiting$2W = {
  "0": "Wek aparu...",
  "1": "Saa moko...",
  "2": "Tiyu...",
  "3": "Sekond kende...",
  "4": "Abe ngiyo eni piri..."
};
const alz = {
  chat: chat$2U,
  avatar: avatar$2U,
  greetings: greetings$2W,
  waiting: waiting$2W
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2U,
  chat: chat$2U,
  default: alz,
  greetings: greetings$2W,
  waiting: waiting$2W
}, Symbol.toStringTag, { value: "Module" }));
const chat$2T = {
  input: {
    placeholder: "መልእክትህን ተይብ...",
    listening: "በማዳመጥ ላይ..."
  },
  enableSound: "ድምጽን አንቃ",
  stt: {
    transcribing: "ገለባብጦ፡ ",
    micActive: "ማይክሮፎን ገባሪ...",
    heardError: "ይቅርታ፣ አልሰማህም። እባክዎ እንደገና ይሞክሩ።",
    micAccessError: "ማይክሮፎን መድረስ አልተቻለም። ፈቃዶችን ያረጋግጡ።"
  },
  speed: {
    idle: "ስራ ፈት",
    talk: "ንግግር፡-"
  }
};
const avatar$2T = {
  loading: "አምሳያ በመጫን ላይ...",
  title: {
    maximize: "ከፍ አድርግ",
    minimize: "አሳንስ",
    close: "ዝጋ",
    clickToMaximize: "ከፍ ለማድረግ ጠቅ ያድርጉ",
    clickToMinimize: "ለመቀነስ ጠቅ ያድርጉ"
  },
  error: {
    loadFailed: "አምሳያ መጫን አልተሳካም፦ {{error}} ",
    playerNotLoaded: "AniaPlayer አልተጫነም።",
    passwordRequired: "ለተመሰጠረ .ania ፋይል የይለፍ ቃል ያስፈልጋል",
    noSource: "ምንም የአቫታር ምንጭ አልቀረበም (አቫታር ዩአርኤል ወይም አቫታር ዳታ)"
  }
};
const greetings$2V = {
  "0": "ሰላም! ዛሬ እንዴት ልረዳህ እችላለሁ?",
  "1": "ሀሎ! እንኳን ደህና መጣህ! ምን ላድርግለወት፧",
  "2": "ሃይ እንዴት ናችሁ! ከእርስዎ ጋር ማውራት በጣም ደስ ብሎኛል!",
  "3": "ሀሎ! እኔ ለመርዳት እዚህ ነኝ። ምን ያስፈልግዎታል?",
  "4": "ሃይ! ስላም፧ እንዴት ጠቃሚ መሆን እችላለሁ?"
};
const waiting$2V = {
  "0": "እስቲ ላስብበት...",
  "1": "አንድ አፍታ...",
  "2": "በማስሄድ ላይ...",
  "3": "አንድ ሰከንድ ብቻ...",
  "4": "ለአንተ እያጣራሁህ ነው..."
};
const am = {
  chat: chat$2T,
  avatar: avatar$2T,
  greetings: greetings$2V,
  waiting: waiting$2V
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2T,
  chat: chat$2T,
  default: am,
  greetings: greetings$2V,
  waiting: waiting$2V
}, Symbol.toStringTag, { value: "Module" }));
const chat$2S = {
  input: {
    placeholder: "اكتب رسالتك...",
    listening: "جاري الاستماع..."
  },
  enableSound: "تمكين الصوت",
  stt: {
    transcribing: "النسخ: ",
    micActive: "الميكروفون نشط...",
    heardError: "آسف، لم أتمكن من سماعك. يرجى المحاولة مرة أخرى.",
    micAccessError: "غير قادر على الوصول إلى الميكروفون. تحقق من الأذونات."
  },
  speed: {
    idle: "خامل:",
    talk: "نقاش:"
  }
};
const avatar$2S = {
  loading: "جارٍ تحميل الصورة الرمزية...",
  title: {
    maximize: "تعظيم",
    minimize: "تصغير",
    close: "إغلاق",
    clickToMaximize: "انقر للتكبير",
    clickToMinimize: "انقر للتصغير"
  },
  error: {
    loadFailed: "فشل تحميل الصورة الرمزية: {{error}} ",
    playerNotLoaded: "لم يتم تحميل برنامج AniaPlayer",
    passwordRequired: "كلمة المرور مطلوبة لملف .ania المشفر",
    noSource: "لم يتم توفير مصدر الصورة الرمزية (avatarUrl أو avatarData)"
  }
};
const greetings$2U = {
  "0": "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
  "1": "مرحبًا! مرحباً! ما الذي يمكنني أن أفعله من أجلك؟",
  "2": "أهلاً! سعيدة جدا بالتحدث معك!",
  "3": "مرحبًا! أنا هنا للمساعدة. ماذا تحتاج؟",
  "4": "أهلاً! كيف حالك؟ كيف يمكنني أن أكون مفيداً؟"
};
const waiting$2U = {
  "0": "دعني أفكر...",
  "1": "لحظة واحدة...",
  "2": "جارٍ المعالجة...",
  "3": "مجرد ثانية...",
  "4": "أنا أتحقق من ذلك بالنسبة لك ..."
};
const ar = {
  chat: chat$2S,
  avatar: avatar$2S,
  greetings: greetings$2U,
  waiting: waiting$2U
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2S,
  chat: chat$2S,
  default: ar,
  greetings: greetings$2U,
  waiting: waiting$2U
}, Symbol.toStringTag, { value: "Module" }));
const chat$2R = {
  input: {
    placeholder: "আপোনাৰ বাৰ্তা টাইপ কৰক...",
    listening: "শুনা..."
  },
  enableSound: "শব্দ সামৰ্থবান কৰক",
  stt: {
    transcribing: "লিপিবদ্ধ কৰা: ",
    micActive: "মাইক্ৰ'ফোন সক্ৰিয়...",
    heardError: "ক্ষমা কৰিব, শুনিব নোৱাৰিলোঁ। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।",
    micAccessError: "মাইক্ৰ'ফোনত প্ৰৱেশ কৰিব পৰা নাই। অনুমতিসমূহ পৰীক্ষা কৰক।"
  },
  speed: {
    idle: "অচল:",
    talk: "আলোচনা:"
  }
};
const avatar$2R = {
  loading: "লোড কৰি আছে অৱতাৰ...",
  title: {
    maximize: "সৰ্বাধিক কৰক",
    minimize: "নূন্যতম কৰক",
    close: "বন্ধ কৰক",
    clickToMaximize: "সৰ্বাধিক কৰিবলৈ ক্লিক কৰক",
    clickToMinimize: "নূন্যতম কৰিবলৈ ক্লিক কৰক"
  },
  error: {
    loadFailed: "অৱতাৰ লোড কৰাত ব্যৰ্থ: {{error}} ",
    playerNotLoaded: "AniaPlayer লোড কৰা হোৱা নাই",
    passwordRequired: "এনক্ৰিপ্ট কৰা .ania ফাইলৰ বাবে পাছৱৰ্ডৰ প্ৰয়োজন",
    noSource: "কোনো অৱতাৰ উৎস প্ৰদান কৰা হোৱা নাই (avatarUrl বা avatarData)"
  }
};
const greetings$2T = {
  "0": "হাই! আজি মই আপোনাক কেনেকৈ সহায় কৰিম?",
  "1": "নমস্কাৰ! স্বাগতম! মই তোমাৰ বাবে কি কৰিম?",
  "2": "নমস্কাৰ! আপোনাৰ লগত কথা পাতি ইমানেই আনন্দিত!",
  "3": "নমস্কাৰ! মই ইয়াত সহায় কৰিবলৈ আহিছো। কি লাগে আপোনাক?",
  "4": "নমস্কাৰ! আপোনাৰ কেনে? মই কেনেকৈ উপযোগী হ’ব পাৰো?"
};
const waiting$2T = {
  "0": "মই ভাবিবলৈ দিয়ক...",
  "1": "এক মুহূৰ্ত...",
  "2": "প্ৰচেছিং...",
  "3": "মাত্ৰ এটা চেকেণ্ড...",
  "4": "মই আপোনাৰ বাবে সেইটো পৰীক্ষা কৰি আছো..."
};
const as = {
  chat: chat$2R,
  avatar: avatar$2R,
  greetings: greetings$2T,
  waiting: waiting$2T
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2R,
  chat: chat$2R,
  default: as,
  greetings: greetings$2T,
  waiting: waiting$2T
}, Symbol.toStringTag, { value: "Module" }));
const chat$2Q = {
  input: {
    placeholder: "आपन संदेश टाइप करा...",
    listening: "सुनत अहैं..."
  },
  enableSound: "ध्वनि सक्षम करा",
  stt: {
    transcribing: "प्रतिलेखन: ",
    micActive: "माइक्रोफोन सक्रिय है...",
    heardError: "माफ करब, आपका नाहीं सुन पावा। कृपया फिर से कोशिश करा।",
    micAccessError: "माइक्रोफोन तक पहुँचै में असमर्थ। अनुमतियन का जाँच करा।"
  },
  speed: {
    idle: "निष्क्रिय:",
    talk: "बात:"
  }
};
const avatar$2Q = {
  loading: "अवतार लोड हो रहा है...",
  title: {
    maximize: "अधिकतम करा",
    minimize: "कम से कम करा",
    close: "बंद करा",
    clickToMaximize: "अधिकतम करै के ताईं क्लिक करा",
    clickToMinimize: "कम से कम करै के ताईं क्लिक करा"
  },
  error: {
    loadFailed: "अवतार लोड करै मा विफल रहा: {{error}} ",
    playerNotLoaded: "अनियाप्लेयर लोड नाहीं भवा",
    passwordRequired: "एन्क्रिप्टेड .ania फ़ाइल के लिए पासवर्ड आवश्यक है",
    noSource: "अवतार स्रोत प्रदान नाहीं कीन गा है (अवतारयूआरएल या अवतारडाटा)"
  }
};
const greetings$2S = {
  "0": "हाय! आज मैं आपकी कैसे मदद कर सकत हउँ?",
  "1": "हेलो! स्वागत! मैं तोहरे बरे का कर सकत हउँ?",
  "2": "नमस्ते! आपसे बात करै मा बहुत खुशी भै!",
  "3": "हेलो! मैं मदद करै के लिए हियाँ हउँ। तोहका का चाही?",
  "4": "नमस्ते! तुम कइसे हौ? मैं उपयोगी कैसे होइ सकत हउँ?"
};
const waiting$2S = {
  "0": "हमका सोचै देइ...",
  "1": "एक क्षण...",
  "2": "प्रसंस्करण...",
  "3": "बस एक सेकंड...",
  "4": "हम आपके लिए ई जाँच करत हई..."
};
const awa = {
  chat: chat$2Q,
  avatar: avatar$2Q,
  greetings: greetings$2S,
  waiting: waiting$2S
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2Q,
  chat: chat$2Q,
  default: awa,
  greetings: greetings$2S,
  waiting: waiting$2S
}, Symbol.toStringTag, { value: "Module" }));
const chat$2P = {
  input: {
    placeholder: "Uka yatiyawi qillqt’aña...",
    listening: "Ist'añax..."
  },
  enableSound: "Sonido ukar ch’amanchaña",
  stt: {
    transcribing: "Transcripción luraña: 1.1. ",
    micActive: "Micrófono ukax activo ukhamawa...",
    heardError: "Disculpa, janiw ist’irjamäkti. Ukhamaraki, mayampi yant’apxañani.",
    micAccessError: "Micrófono ukar mantañax janiw ch’amäkiti. Permisonaka uñakipt’aña."
  },
  speed: {
    idle: "Ocioso: 1.1.",
    talk: "Arstʼäwi:"
  }
};
const avatar$2P = {
  loading: "Avatar ukax apkatatawa...",
  title: {
    maximize: "Maximizar ukax mä juk’a pachanakanwa",
    minimize: "Jisk’achaña",
    close: "Jist’antaña",
    clickToMaximize: "Ukax mä jach’a uñacht’äwiwa",
    clickToMinimize: "Ukax jisk’aptayañatakiw ch’iqt’añama"
  },
  error: {
    loadFailed: "Avatar ukax janiw utjkiti: {{error}} . ",
    playerNotLoaded: "AniaPlayer ukax janiw utjkiti",
    passwordRequired: "Contraseña ukax .ania qillqatan encriptado ukatakiw wakisi",
    noSource: "Janiw kuna avatar phunchhawis utjkiti (avatarUrl jan ukax avatarData) ."
  }
};
const greetings$2R = {
  "0": "¡Hi! ¿Kunjamsa jichhürunakan yanaptʼirista?",
  "1": "Kamisaki! Aski jutäwi! ¿Kunsa nayajj jumatak luririsma?",
  "2": "Kamisaki! ¡Ukham jumamp parltʼasajj wal kusista!",
  "3": "Kamisaki! Nayax yanapt'añatakiw akanktxa. ¿Kunas jumatakix wakisi?",
  "4": "Kamisaki! Kamisaraki? ¿Kunjamsa nayajj yanaptʼirista?"
};
const waiting$2R = {
  "0": "Nayax amuyt’apxäma...",
  "1": "Mä juk’a pachax...",
  "2": "Uka lurawixa...",
  "3": "Mä segunda kutikiw...",
  "4": "Nayax jumatakix uk uñakipt'askta..."
};
const ay = {
  chat: chat$2P,
  avatar: avatar$2P,
  greetings: greetings$2R,
  waiting: waiting$2R
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2P,
  chat: chat$2P,
  default: ay,
  greetings: greetings$2R,
  waiting: waiting$2R
}, Symbol.toStringTag, { value: "Module" }));
const chat$2O = {
  input: {
    placeholder: "Mesajınızı yazın...",
    listening: "Dinlənir..."
  },
  enableSound: "Səsi aktivləşdirin",
  stt: {
    transcribing: "Transkripsiya: ",
    micActive: "Mikrofon aktivdir...",
    heardError: "Bağışlayın, sizi eşitmək mümkün olmadı. Yenidən cəhd edin.",
    micAccessError: "Mikrofona daxil olmaq mümkün deyil. İcazələri yoxlayın."
  },
  speed: {
    idle: "Boş:",
    talk: "Danışmaq:"
  }
};
const avatar$2O = {
  loading: "Avatar yüklənir...",
  title: {
    maximize: "Maksimallaşdırın",
    minimize: "minimuma endir",
    close: "Bağlayın",
    clickToMaximize: "Maksimum artırmaq üçün klikləyin",
    clickToMinimize: "Küçültmək üçün klikləyin"
  },
  error: {
    loadFailed: "Avatarı yükləmək alınmadı: {{error}} ",
    playerNotLoaded: "AniaPlayer yüklənməyib",
    passwordRequired: "Şifrələnmiş .ania faylı üçün parol tələb olunur",
    noSource: "Heç bir avatar mənbəyi təqdim edilməyib (avatarUrl və ya avatarData)"
  }
};
const greetings$2Q = {
  "0": "salam! Bu gün sizə necə kömək edə bilərəm?",
  "1": "salam! Xoş gəldiniz! Mən sizin üçün nə edə bilərəm?",
  "2": "salam! Sizinlə danışmağa çox şadam!",
  "3": "salam! Mən kömək etmək üçün buradayam. sənə nə lazımdır?",
  "4": "salam! necesen Necə faydalı ola bilərəm?"
};
const waiting$2Q = {
  "0": "Qoy fikirləşim...",
  "1": "Bir an...",
  "2": "Emal edilir...",
  "3": "Bir saniyə...",
  "4": "Bunu sizin üçün yoxlayıram..."
};
const az = {
  chat: chat$2O,
  avatar: avatar$2O,
  greetings: greetings$2Q,
  waiting: waiting$2Q
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2O,
  chat: chat$2O,
  default: az,
  greetings: greetings$2Q,
  waiting: waiting$2Q
}, Symbol.toStringTag, { value: "Module" }));
const chat$2N = {
  input: {
    placeholder: "Хәбәрегеҙҙе яҙығыҙ...",
    listening: "Тыңлау..."
  },
  enableSound: "Тауышты индереү",
  stt: {
    transcribing: "Транскрипциялау: ",
    micActive: "Микрофон әүҙем...",
    heardError: "Ғәфү итегеҙ, һеҙҙе ишетә алманым. Зинһар, тағы ла тырышығыҙ.",
    micAccessError: "Микрофонға инә алмай. Рөхсәттәрҙе тикшерергә."
  },
  speed: {
    idle: "Буш:",
    talk: "Һөйләшеү:"
  }
};
const avatar$2N = {
  loading: "Аватар тейәп...",
  title: {
    maximize: "Максималь",
    minimize: "Минимизациялау",
    close: "Ябыҡ",
    clickToMaximize: "Максимизациялау өсөн баҫығыҙ",
    clickToMinimize: "Минимизациялау өсөн баҫығыҙ"
  },
  error: {
    loadFailed: "Аватар тейәп булманы: {{error}} ",
    playerNotLoaded: "АниаПлейер тейәлмәгән",
    passwordRequired: "Шифрланған .ania файлы өсөн пароль кәрәк",
    noSource: "Аватар сығанағы бирелмәгән (аватарUrl йәки аватарМәғлүмәттәре)"
  }
};
const greetings$2P = {
  "0": "Һаумыһығыҙ! Бөгөн мин һиңә нисек ярҙам итә алам?",
  "1": "Һаумыһығыҙ! Рәхим итегеҙ! Мин һиңә нимә эшләй алам?",
  "2": "Сәләм! Шул тиклем шатмын һеҙҙең менән һөйләшергә!",
  "3": "Һаумыһығыҙ! Мин бында ярҙам итергә килдем. Һиңә нимә кәрәк?",
  "4": "Сәләм! Хәлдәр нисек? Нисек файҙалы булырға?"
};
const waiting$2P = {
  "0": "Уйларға рөхсәт итегеҙ...",
  "1": "Бер мәл...",
  "2": "Эшкәртеү...",
  "3": "Бер секунд ҡына...",
  "4": "Мин һинең өсөн тикшерәм..."
};
const ba = {
  chat: chat$2N,
  avatar: avatar$2N,
  greetings: greetings$2P,
  waiting: waiting$2P
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2N,
  chat: chat$2N,
  default: ba,
  greetings: greetings$2P,
  waiting: waiting$2P
}, Symbol.toStringTag, { value: "Module" }));
const chat$2M = {
  input: {
    placeholder: "Ketik pabesen Sametoné...",
    listening: "Mirengang..."
  },
  enableSound: "Aktipang Suara",
  stt: {
    transcribing: "Transkripsi: ",
    micActive: "Mikropon aktif...",
    heardError: "Ampura, nénten prasida mirengang Sameton. Indayang malih.",
    micAccessError: "Nénten prasida ngaksés mikropon. Priksa ijin"
  },
  speed: {
    idle: "Nganggur:",
    talk: "Bebaosan:"
  }
};
const avatar$2M = {
  loading: "Ngunggahang avatar...",
  title: {
    maximize: "Maksimalkan",
    minimize: "Kirangin",
    close: "Tutup",
    clickToMaximize: "Klik anggén maksimal",
    clickToMinimize: "Klik anggén ngirangin"
  },
  error: {
    loadFailed: "Gagal ngunggahang avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer nénten kamuat",
    passwordRequired: "Sandi sané kaperluang anggén berkas .ania sané kaenkripsi",
    noSource: "Nénten wénten sumber avatar sané kasediaang (Url avatar utawi Data avatar)"
  }
};
const greetings$2O = {
  "0": "Hai! Sapunapi antuk tiang nulungin ragane ring rahinane mangkin?",
  "1": "Om Swastiastu! Rahajeng rauh! Napike sane prasida laksanayang tiang pabuat semeton?",
  "2": "Hai! Dados seneng mabebaosan sareng semeton!",
  "3": "Om Swastiastu! Tiang iriki jagi nulungin. Napi sane kabuatang?",
  "4": "Om Swastiastu! Punapi gatra? Sapunapiang titiang mangda prasida mawiguna?"
};
const waiting$2O = {
  "0": "Ngiring titiang mapikayun...",
  "1": "Asiki galah...",
  "2": "Ngolah...",
  "3": "Wantah ajebos...",
  "4": "Tiang nureksain punika anggén Sameton..."
};
const ban = {
  chat: chat$2M,
  avatar: avatar$2M,
  greetings: greetings$2O,
  waiting: waiting$2O
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2M,
  chat: chat$2M,
  default: ban,
  greetings: greetings$2O,
  waiting: waiting$2O
}, Symbol.toStringTag, { value: "Module" }));
const chat$2L = {
  input: {
    placeholder: "Ketik ma pesanmu...",
    listening: "Manangihon..."
  },
  enableSound: "Aktifhon ma Suara",
  stt: {
    transcribing: "Manurat: ",
    micActive: "Mikrofon aktif...",
    heardError: "Sattabi, dang boi hubege hamu. Please try again.",
    micAccessError: "Ndang boi be masuk tu mikrofon. Pareso ma izinna."
  },
  speed: {
    idle: "Nganggur:",
    talk: "Jamita:"
  }
};
const avatar$2L = {
  loading: "Mamuat avatar...",
  title: {
    maximize: "Maksimalhon",
    minimize: "Meminimalkan",
    close: "Tutup",
    clickToMaximize: "Click to maximize",
    clickToMinimize: "Klik asa diminimalhon ."
  },
  error: {
    loadFailed: "Gagal mamuat avatar: {{error}} . ",
    playerNotLoaded: "AniaPlayer not loaded",
    passwordRequired: "Dihaporluhon do sandi tu file .ania na dienkripsi .",
    noSource: "Dang adong sumber avatar na disediahon (Url avatar manang avatarData)"
  }
};
const greetings$2N = {
  "0": "Horas! Songon dia do ahu boi mangurupi hamu sadarion?",
  "1": "Horas! Horas ro! What can I do for you?",
  "2": "Ale nadisan! So glad to talk to you!",
  "3": "Horas! Au dison laho mangurupi. Aha do na porlu di hamu?",
  "4": "Ale! Nungga songondia? How can I be useful?"
};
const waiting$2N = {
  "0": "Loas au marpikkir...",
  "1": "Sada tingki...",
  "2": "Pangolahan...",
  "3": "Just a second...",
  "4": "Hupareso do i di ho..."
};
const bbc = {
  chat: chat$2L,
  avatar: avatar$2L,
  greetings: greetings$2N,
  waiting: waiting$2N
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2L,
  chat: chat$2L,
  default: bbc,
  greetings: greetings$2N,
  waiting: waiting$2N
}, Symbol.toStringTag, { value: "Module" }));
const chat$2K = {
  input: {
    placeholder: "Увядзіце паведамленне...",
    listening: "Слуханне..."
  },
  enableSound: "Уключыць гук",
  stt: {
    transcribing: "Транскрыпцыя: ",
    micActive: "Мікрафон уключаны...",
    heardError: "Прабачце, не пачуў вас. Калі ласка, паспрабуйце яшчэ раз.",
    micAccessError: "Немагчыма атрымаць доступ да мікрафона. Праверце дазволы."
  },
  speed: {
    idle: "Прастой:",
    talk: "Размова:"
  }
};
const avatar$2K = {
  loading: "Загрузка аватара...",
  title: {
    maximize: "Максімізаваць",
    minimize: "Мінімізаваць",
    close: "Блізка",
    clickToMaximize: "Націсніце, каб павялічыць",
    clickToMinimize: "Націсніце, каб згарнуць"
  },
  error: {
    loadFailed: "Не ўдалося загрузіць аватар: {{error}} ",
    playerNotLoaded: "AniaPlayer не загружаецца",
    passwordRequired: "Патрабуецца пароль для зашыфраванага файла .ania",
    noSource: "Крыніца аватара не пададзена (avatarUrl або avatarData)"
  }
};
const greetings$2M = {
  "0": "Прывітанне! Чым я магу дапамагчы вам сёння?",
  "1": "Прывітанне! Сардэчна запрашаем! Што я магу зрабіць для вас?",
  "2": "Прывітанне! Так рады пагаварыць з вамі!",
  "3": "Прывітанне! Я тут, каб дапамагчы. Што вам трэба?",
  "4": "Прывітанне! як справы Чым я магу быць карысным?"
};
const waiting$2M = {
  "0": "Дай падумаць...",
  "1": "Хвілінку...",
  "2": "Апрацоўка...",
  "3": "Секундочку...",
  "4": "Я правяраю гэта для вас..."
};
const be = {
  chat: chat$2K,
  avatar: avatar$2K,
  greetings: greetings$2M,
  waiting: waiting$2M
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2K,
  chat: chat$2K,
  default: be,
  greetings: greetings$2M,
  waiting: waiting$2M
}, Symbol.toStringTag, { value: "Module" }));
const chat$2J = {
  input: {
    placeholder: "Taipa imbila yobe...",
    listening: "Ukukutika..."
  },
  enableSound: "Suminisheni Iciunda",
  stt: {
    transcribing: "Ukupilibula: ",
    micActive: "Maikulofoni ilebomba...",
    heardError: "Mutwelele, nshaumfwile. Mukwai esheniko nakabili.",
    micAccessError: "Teti mukwate maikulofoni. Moneni ifyasuminishiwa."
  },
  speed: {
    idle: "Uushabomba:",
    talk: "Ukulanshanya:"
  }
};
const avatar$2J = {
  loading: "Ukubika icikope...",
  title: {
    maximize: "Ukukulisha",
    minimize: "Ukucefyako",
    close: "Isaleni",
    clickToMaximize: "Tinikeni pakukulisha",
    clickToMinimize: "Tinikeni pakucefyako"
  },
  error: {
    loadFailed: "Cafilwa ukubika icikope: {{error}} ",
    playerNotLoaded: "Icakubelenga ica Ania tacibikwa",
    passwordRequired: "Ishiwi lya kwisalilako lilekabilwa ku fayelo ya .ania iyafisama",
    noSource: "Tapali intuntuko ya cikope iyapeelwe (Url ya cikope nangu amashiwi ya cikope)"
  }
};
const greetings$2L = {
  "0": "Mwapoleni! Bushe kuti namwafwa shani lelo?",
  "1": "Muli shani! Ukusengela! Cinshi ningamucitila?",
  "2": "Muli shani imwe! Nalitemwa nga nshi ukulanda naimwe!",
  "3": "Muli shani! Naisa pano ku kwafwilisha. Cinshi ico mulekabila?",
  "4": "Muli shani! Muli shani? Bushe kuti naba shani uwacindama?"
};
const waiting$2L = {
  "0": "Lekeni ntontonkanye...",
  "1": "Inshita imo...",
  "2": "Ukubombela pa...",
  "3": "Sekondi fye imo...",
  "4": "Naleceeceeta ifyo kuli imwe..."
};
const bem = {
  chat: chat$2J,
  avatar: avatar$2J,
  greetings: greetings$2L,
  waiting: waiting$2L
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2J,
  chat: chat$2J,
  default: bem,
  greetings: greetings$2L,
  waiting: waiting$2L
}, Symbol.toStringTag, { value: "Module" }));
const chat$2I = {
  input: {
    placeholder: "Ketik pesan lu...",
    listening: "Dengerin..."
  },
  enableSound: "Aktifin suara",
  stt: {
    transcribing: "Menranskripsi: ",
    micActive: "Mikrofon aktif...",
    heardError: "Maaf, kagak bisa denger lu. Tolong coba lagi.",
    micAccessError: "Gak bisa akses mikrofon. Cek izin."
  },
  speed: {
    idle: "Nganggur:",
    talk: "Ngomong:"
  }
};
const avatar$2I = {
  loading: "Lagi muat avatar...",
  title: {
    maximize: "Maksimalkan",
    minimize: "Minimalisir",
    close: "Tutup",
    clickToMaximize: "Klik buat maksimalin",
    clickToMinimize: "Klik buat ngecilin"
  },
  error: {
    loadFailed: "Gagal muat avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer kagak dimuat",
    passwordRequired: "Kata sandi dibutuhin buat file .ania yang dienkripsi",
    noSource: "Gak ada sumber avatar yang disediain (avatarUrl atau avatarData)"
  }
};
const greetings$2K = {
  "0": "Hai! Gimane caranya gue bisa bantu lu hari ini?",
  "1": "Halo! Selamet dateng! Apa yang bisa gue lakuin buat lo?",
  "2": "Hai! Seneng banget bisa ngobrol sama lu!",
  "3": "Halo! Gue disini buat bantuin. Lu butuh apaan?",
  "4": "Woy! Gimane kabarnye? Gimana caranya gue bisa berguna?"
};
const waiting$2K = {
  "0": "Biar gue pikir...",
  "1": "Satu saat...",
  "2": "Ngolah...",
  "3": "Cuma sebentar...",
  "4": "Gue lagi ngecek itu buat lu..."
};
const bew = {
  chat: chat$2I,
  avatar: avatar$2I,
  greetings: greetings$2K,
  waiting: waiting$2K
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2I,
  chat: chat$2I,
  default: bew,
  greetings: greetings$2K,
  waiting: waiting$2K
}, Symbol.toStringTag, { value: "Module" }));
const chat$2H = {
  input: {
    placeholder: "Въведете вашето съобщение...",
    listening: "Слушам..."
  },
  enableSound: "Активиране на звука",
  stt: {
    transcribing: "транскрибиране: ",
    micActive: "Микрофонът е активен...",
    heardError: "Съжалявам, не те чух. Моля, опитайте отново.",
    micAccessError: "Няма достъп до микрофона. Проверете разрешенията."
  },
  speed: {
    idle: "Неактивен:",
    talk: "разговор:"
  }
};
const avatar$2H = {
  loading: "Аватарът се зарежда...",
  title: {
    maximize: "Увеличете максимално",
    minimize: "Минимизиране",
    close: "затвори",
    clickToMaximize: "Кликнете, за да увеличите",
    clickToMinimize: "Кликнете, за да минимизирате"
  },
  error: {
    loadFailed: "Неуспешно зареждане на аватара: {{error}} ",
    playerNotLoaded: "AniaPlayer не е зареден",
    passwordRequired: "Изисква се парола за шифрован .ania файл",
    noSource: "Не е предоставен източник на аватар (avatarUrl или avatarData)"
  }
};
const greetings$2J = {
  "0": "здрасти Как мога да ви помогна днес?",
  "1": "здравей Добре дошли! Какво мога да направя за вас?",
  "2": "здравейте! Толкова се радвам да говоря с вас!",
  "3": "здравей Тук съм, за да помогна. какво ти трябва",
  "4": "здрасти как си С какво мога да бъда полезен?"
};
const waiting$2J = {
  "0": "Нека помисля...",
  "1": "Един момент...",
  "2": "Обработва се...",
  "3": "Само секунда...",
  "4": "Проверявам това за вас..."
};
const bg = {
  chat: chat$2H,
  avatar: avatar$2H,
  greetings: greetings$2J,
  waiting: waiting$2J
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2H,
  chat: chat$2H,
  default: bg,
  greetings: greetings$2J,
  waiting: waiting$2J
}, Symbol.toStringTag, { value: "Module" }));
const chat$2G = {
  input: {
    placeholder: "आपन संदेश टाइप करीं...",
    listening: "सुनत बानी..."
  },
  enableSound: "साउंड के सक्षम करीं",
  stt: {
    transcribing: "प्रतिलिपि बनावल जा रहल बा: ",
    micActive: "माइक्रोफोन सक्रिय बा...",
    heardError: "माफ करब, रउरा के ना सुन पवनी. कृपया दोबारा कोशिश करीं।",
    micAccessError: "माइक तक पहुंचे में असमर्थ बानी। अनुमति के जांच करीं।"
  },
  speed: {
    idle: "बेकार बा: 1।",
    talk: "बात कइल जाव : १."
  }
};
const avatar$2G = {
  loading: "अवतार लोड हो रहल बा...",
  title: {
    maximize: "अधिकतम कइल जाव",
    minimize: "कम से कम कर दिहल जाव",
    close: "बंद कर दीं",
    clickToMaximize: "अधिकतम करे खातिर क्लिक करीं",
    clickToMinimize: "कम से कम करे खातिर क्लिक करीं"
  },
  error: {
    loadFailed: "अवतार लोड करे में विफल: {{error}} ",
    playerNotLoaded: "AniaPlayer लोड नइखे भइल",
    passwordRequired: "एन्क्रिप्टेड .ania फाइल खातिर पासवर्ड के जरूरत बा",
    noSource: "कवनो अवतार स्रोत ना दिहल गइल (avatarUrl या avatarData)"
  }
};
const greetings$2I = {
  "0": "हाय! आज हम रउरा के कइसे मदद करब?",
  "1": "प्रणाम! स्वागत! हम तोहरा खातिर का कर सकीले?",
  "2": "राम-राम! रउरा से बात करत अतना खुशी भइल!",
  "3": "प्रणाम! हम मदद करे खातिर आइल बानी। रउरा का चाहीं?",
  "4": "एहो! का हाल बा? हम कइसे उपयोगी हो सकेनी?"
};
const waiting$2I = {
  "0": "हम सोचत बानी...",
  "1": "एक पल के...",
  "2": "प्रोसेसिंग के काम हो रहल बा...",
  "3": "बस एक सेकंड के...",
  "4": "हम रउरा खातिर ऊ चेक कर रहल बानी..."
};
const bho = {
  chat: chat$2G,
  avatar: avatar$2G,
  greetings: greetings$2I,
  waiting: waiting$2I
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2G,
  chat: chat$2G,
  default: bho,
  greetings: greetings$2I,
  waiting: waiting$2I
}, Symbol.toStringTag, { value: "Module" }));
const chat$2F = {
  input: {
    placeholder: "I-type an saimong mensahe...",
    listening: "Nagdadangog..."
  },
  enableSound: "I-enable an Tanog",
  stt: {
    transcribing: "Pag-transcribe: ",
    micActive: "Aktibo an mikropono...",
    heardError: "Pasensya na, dai taka nadangog. Pakiprobaran giraray.",
    micAccessError: "Dai kayang mag-access sa mikropono. Hilingon an mga pagtugot."
  },
  speed: {
    idle: "Daing gibo:",
    talk: "Pahayag:"
  }
};
const avatar$2F = {
  loading: "Nagloading nin avatar...",
  title: {
    maximize: "Padakulaon",
    minimize: "Pababaon",
    close: "Isara",
    clickToMaximize: "I-click tanganing ma-maximize",
    clickToMinimize: "Mag-click tanganing maibanan"
  },
  error: {
    loadFailed: "Dai naka-load an avatar: {{error}} ",
    playerNotLoaded: "Dai pa nakarga an AniaPlayer",
    passwordRequired: "Kaipuhan an sekretong panlaog para sa naka-encrypt na .ania na file",
    noSource: "Mayo nin itinaong pinagkukuanan nin avatar (avatarUrl o avatarData)"
  }
};
const greetings$2H = {
  "0": "Hi! Pano ko kamo matatabangan ngunyan?",
  "1": "Kumusta! Dagos! Ano an magigibo ko para saimo?",
  "2": "Kumusta! Maogma akong makaolay ka!",
  "3": "Kumusta! Yaon ako digdi para magtabang. Ano an kaipuhan mo?",
  "4": "Kumusta! Kumusta ka? Paano ako magigin kapaki-pakinabang?"
};
const waiting$2H = {
  "0": "Mag-isip ako...",
  "1": "Sarong momento...",
  "2": "Pagproseso...",
  "3": "Sarong segundo sana...",
  "4": "Sinisiyasat ko iyan para saimo..."
};
const bik = {
  chat: chat$2F,
  avatar: avatar$2F,
  greetings: greetings$2H,
  waiting: waiting$2H
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2F,
  chat: chat$2F,
  default: bik,
  greetings: greetings$2H,
  waiting: waiting$2H
}, Symbol.toStringTag, { value: "Module" }));
const chat$2E = {
  input: {
    placeholder: "I ka cikan sɛbɛn...",
    listening: "Lamɛnni kɛli..."
  },
  enableSound: "Mankan (Mankan) daminɛ",
  stt: {
    transcribing: "Sɛbɛnni kɛli: ",
    micActive: "Microphone active...",
    heardError: "Baasi tɛ, n ma se k'i ka kuma mɛn. Aw ye aw jija ka segin a kan.",
    micAccessError: "A tɛ se ka don mikro la. Aw ye yamaruyaw lajɛ."
  },
  speed: {
    idle: "Idle:",
    talk: "Jɛmu:"
  }
};
const avatar$2E = {
  loading: "Avatar bɛ ka chargement...",
  title: {
    maximize: "A ka ca a la",
    minimize: "Aw ye a dɔgɔya",
    close: "A da tugu",
    clickToMaximize: "Klik walasa ka fɛn caman kɛ",
    clickToMinimize: "Klik walasa ka dɔgɔya"
  },
  error: {
    loadFailed: "A ma se ka avatar doni: {{error}} . ",
    playerNotLoaded: "AniaPlayer ma doni",
    passwordRequired: "Password min ka kan ka kɛ .ania file sirilen na",
    noSource: "Avatar sɔrɔyɔrɔ si ma di (avatarUrl walima avatarData) ."
  }
};
const greetings$2G = {
  "0": "Bonjour! Ne bɛ se k’i dɛmɛ cogo di bi?",
  "1": "Aw ni baara! I danse! Ne bɛ se ka mun kɛ aw ye?",
  "2": "Ani ce yan! A nisɔndiyara kosɛbɛ ka kuma i fɛ!",
  "3": "Aw ni baara! Ne bɛ yan ka dɛmɛ don. I mago bɛ mun na?",
  "4": "Aw ni baara! I ka kɛnɛ wa? Ne bɛ se ka kɛ mɔgɔ nafama ye cogo di?"
};
const waiting$2G = {
  "0": "A to n ka miiri...",
  "1": "Waati kelen...",
  "2": "Baarakɛcogo...",
  "3": "Seginnkanni dɔrɔn...",
  "4": "N b'o lajɛ aw ye..."
};
const bm = {
  chat: chat$2E,
  avatar: avatar$2E,
  greetings: greetings$2G,
  waiting: waiting$2G
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2E,
  chat: chat$2E,
  default: bm,
  greetings: greetings$2G,
  waiting: waiting$2G
}, Symbol.toStringTag, { value: "Module" }));
const chat$2D = {
  input: {
    placeholder: "আপনার বার্তা টাইপ করুন...",
    listening: "শুনছি..."
  },
  enableSound: "সাউন্ড সক্ষম করুন",
  stt: {
    transcribing: "প্রতিলিপি করা: ",
    micActive: "মাইক্রোফোন সক্রিয়...",
    heardError: "দুঃখিত, আপনার কথা শুনতে পারিনি। আবার চেষ্টা করুন.",
    micAccessError: "মাইক্রোফোন অ্যাক্সেস করতে অক্ষম। অনুমতি পরীক্ষা করুন."
  },
  speed: {
    idle: "নিষ্ক্রিয়:",
    talk: "কথা:"
  }
};
const avatar$2D = {
  loading: "অবতার লোড হচ্ছে...",
  title: {
    maximize: "সর্বাধিক করুন",
    minimize: "ছোট করুন",
    close: "বন্ধ",
    clickToMaximize: "সর্বাধিক করতে ক্লিক করুন",
    clickToMinimize: "ছোট করতে ক্লিক করুন"
  },
  error: {
    loadFailed: "অবতার লোড করতে ব্যর্থ হয়েছে: {{error}} ",
    playerNotLoaded: "AniaPlayer লোড হয়নি",
    passwordRequired: "এনক্রিপ্ট করা .ania ফাইলের জন্য পাসওয়ার্ড প্রয়োজন",
    noSource: "কোন অবতার উৎস প্রদান করা হয়নি (avatarUrl বা avatarData)"
  }
};
const greetings$2F = {
  "0": "হাই! আমি আজ কিভাবে আপনাকে সাহায্য করতে পারি?",
  "1": "নমস্কার! স্বাগতম! আমি তোমার জন্য কি করতে পারি?",
  "2": "হাই সেখানে! আপনার সাথে কথা বলে খুব খুশি!",
  "3": "নমস্কার! আমি সাহায্য করতে এখানে আছি. তোমার কি দরকার?",
  "4": "হাই! কেমন আছেন? আমি কিভাবে দরকারী হতে পারে?"
};
const waiting$2F = {
  "0": "আমাকে ভাবতে দাও...",
  "1": "এক মুহূর্ত...",
  "2": "প্রক্রিয়া করা হচ্ছে...",
  "3": "মাত্র এক সেকেন্ড...",
  "4": "আমি আপনার জন্য এটি পরীক্ষা করছি..."
};
const bn = {
  chat: chat$2D,
  avatar: avatar$2D,
  greetings: greetings$2F,
  waiting: waiting$2F
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2D,
  chat: chat$2D,
  default: bn,
  greetings: greetings$2F,
  waiting: waiting$2F
}, Symbol.toStringTag, { value: "Module" }));
const chat$2C = {
  input: {
    placeholder: "Bizskrivit ho kemennadenn...",
    listening: "O selaou..."
  },
  enableSound: "Gweredekaat ar son",
  stt: {
    transcribing: "Treuzskrivañ : ",
    micActive: "Mikrofon oberiant...",
    heardError: "Digarez, n'em eus ket klevet ac'hanoc'h. Klaskit en-dro mar plij.",
    micAccessError: "N'haller ket mont e darempred gant ar mikro. Gwiriañ an aotreoù."
  },
  speed: {
    idle: "Didalvoud :",
    talk: "Komz :"
  }
};
const avatar$2C = {
  loading: "O kargañ an avatar...",
  title: {
    maximize: "Brasaat",
    minimize: "Bihanaat",
    close: "Serriñ",
    clickToMaximize: "Klikañ evit brasaat",
    clickToMinimize: "Klikañ evit digreskiñ"
  },
  error: {
    loadFailed: "C'hwitet war kargañ an avatar : {{error}} ",
    playerNotLoaded: "N'eo ket bet karget AniaPlayer",
    passwordRequired: "Ur ger-tremen ret evit ar restr .ania enrineget",
    noSource: "Mammenn avatar ebet kinniget (avatarUrl pe avatarData)"
  }
};
const greetings$2E = {
  "0": "Salud ! Penaos e c'hellan sikour ac'hanoc'h hiziv?",
  "1": "Salud deoc'h! Degemer mat! Petra a c'hellan ober evidoc'h?",
  "2": "Ac'hanta tudoù! Laouen on o komz ganeoc'h !",
  "3": "Salud deoc'h! Amañ emaon evit sikour. Petra hoc'h eus ezhomm?",
  "4": "Salud! Mont a ra? Penaos e c'hellan bezañ talvoudus?"
};
const waiting$2E = {
  "0": "Lakait ac'hanon da soñjal...",
  "1": "Ur pennadig...",
  "2": "O treuzfurmiñ...",
  "3": "Un eilenn hepken...",
  "4": "Gwiriañ a ran an dra-se evidoc'h..."
};
const br = {
  chat: chat$2C,
  avatar: avatar$2C,
  greetings: greetings$2E,
  waiting: waiting$2E
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2C,
  chat: chat$2C,
  default: br,
  greetings: greetings$2E,
  waiting: waiting$2E
}, Symbol.toStringTag, { value: "Module" }));
const chat$2B = {
  input: {
    placeholder: "Upišite svoju poruku...",
    listening: "slušam..."
  },
  enableSound: "Omogući zvuk",
  stt: {
    transcribing: "Transkripcija: ",
    micActive: "Mikrofon aktivan...",
    heardError: "Izvinite, nisam vas čuo. Molimo pokušajte ponovo.",
    micAccessError: "Nije moguće pristupiti mikrofonu. Provjerite dozvole."
  },
  speed: {
    idle: "mirovanje:",
    talk: "razgovor:"
  }
};
const avatar$2B = {
  loading: "Učitavanje avatara...",
  title: {
    maximize: "Maksimiziraj",
    minimize: "Minimizirajte",
    close: "Zatvori",
    clickToMaximize: "Kliknite da povećate",
    clickToMinimize: "Kliknite da minimizirate"
  },
  error: {
    loadFailed: "Učitavanje avatara nije uspjelo: {{error}} ",
    playerNotLoaded: "AniaPlayer nije učitan",
    passwordRequired: "Lozinka je potrebna za šifriranu .ania datoteku",
    noSource: "Nije naveden izvor avatara (avatarUrl ili avatarData)"
  }
};
const greetings$2D = {
  "0": "Zdravo! Kako vam mogu pomoći danas?",
  "1": "Zdravo! Dobrodošli! Šta mogu učiniti za vas?",
  "2": "Zdravo! Drago mi je da razgovaram sa vama!",
  "3": "Zdravo! Tu sam da pomognem. sta ti treba",
  "4": "Zdravo! Kako si? Kako mogu biti koristan?"
};
const waiting$2D = {
  "0": "pusti me da razmislim...",
  "1": "jedan trenutak...",
  "2": "Obrada...",
  "3": "Samo trenutak...",
  "4": "Provjeravam to za tebe..."
};
const bs = {
  chat: chat$2B,
  avatar: avatar$2B,
  greetings: greetings$2D,
  waiting: waiting$2D
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2B,
  chat: chat$2B,
  default: bs,
  greetings: greetings$2D,
  waiting: waiting$2D
}, Symbol.toStringTag, { value: "Module" }));
const chat$2A = {
  input: {
    placeholder: "Ketik ma pesan nassiam...",
    listening: "Manangar..."
  },
  enableSound: "Aktifkon Soara",
  stt: {
    transcribing: "Manranskripsihon: ",
    micActive: "Mikrofon aktif...",
    heardError: "Santabi, lang tarbogei ham. Uji ma use.",
    micAccessError: "Lang boi masuk hu mikrofon. Pareksa ma ijin."
  },
  speed: {
    idle: "Lang marhorja:",
    talk: "Marsahap:"
  }
};
const avatar$2A = {
  loading: "Mamuat avatar...",
  title: {
    maximize: "Maksimalhon",
    minimize: "Paetek",
    close: "Tutup",
    clickToMaximize: "Klik laho mamaksimalhon",
    clickToMinimize: "Klik laho mangurangi"
  },
  error: {
    loadFailed: "Gagal mamuat avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer lang i muat",
    passwordRequired: "Hata sandi na ihaporluhon bani file .ania na terenkripsi",
    noSource: "Lang dong sumber avatar na ibere (avatarUrl atap avatarData)"
  }
};
const greetings$2C = {
  "0": "Horas! Sonaha ahu boi mangurupi ham sadari on?",
  "1": "Horas! Selamat datang! Aha ma na boi bahenonku bamu?",
  "2": "Oi baya! Malas tumang uhurhu marsahap pakon nassiam!",
  "3": "Horas! Ijon do ahu laho mangurupi. Aha do na porlu bamu?",
  "4": "Horas! Aha kabarmu? Sonaha ase boi ahu marguna?"
};
const waiting$2C = {
  "0": "Paturut ham ma ahu marpingkir...",
  "1": "Sada panorang...",
  "2": "Mamproses...",
  "3": "Sadetik dassa...",
  "4": "Hupareksa do ai bamu..."
};
const bts = {
  chat: chat$2A,
  avatar: avatar$2A,
  greetings: greetings$2C,
  waiting: waiting$2C
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2A,
  chat: chat$2A,
  default: bts,
  greetings: greetings$2C,
  waiting: waiting$2C
}, Symbol.toStringTag, { value: "Module" }));
const chat$2z = {
  input: {
    placeholder: "Ketikken pesanndu...",
    listening: "Megiken..."
  },
  enableSound: "Aktifken Sora",
  stt: {
    transcribing: "Mentranskripsiken: ",
    micActive: "Mikrofon enggo aktif...",
    heardError: "Sentabi, la banci kubegi kam. Tolong cubakenndu mulihi.",
    micAccessError: "Labo banci iaksesna mikrofon. Periksalah izin-izin si lit."
  },
  speed: {
    idle: "Nganggur:",
    talk: "Ceramah:"
  }
};
const avatar$2z = {
  loading: "Muat avatar...",
  title: {
    maximize: "Maksimalken",
    minimize: "Minimalken",
    close: "Tutup",
    clickToMaximize: "Klik guna memaksimalken .",
    clickToMinimize: "Klik guna meminimalken ."
  },
  error: {
    loadFailed: "Gagal muat avatar: {{error}} . ",
    playerNotLoaded: "AniaPemain la i muat .",
    passwordRequired: "Kata sandi si iperluken guna file .ania si enggo i enkripsi .",
    noSource: "La lit sumber avatar si isediaken (Url avatar ntah pe Data avatar)"
  }
};
const greetings$2B = {
  "0": "Hai! Uga banci kusampati kam sendah?",
  "1": "Halo! Selamat datang! Kai kin banci kubahan man bandu?",
  "2": "Uga! Emaka meriah kel ukurku ngerana ras kam!",
  "3": "Halo! Aku i jenda guna nampati. Kai si iperlukenndu?",
  "4": "Halo! Uga berita ndu? Uga carana gelah banci aku erguna?"
};
const waiting$2B = {
  "0": "Mari ku ukuri...",
  "1": "Sada paksa...",
  "2": "Pengolahen...",
  "3": "Sada detik ngenca...",
  "4": "Kuperiksa nge e man bandu..."
};
const btx = {
  chat: chat$2z,
  avatar: avatar$2z,
  greetings: greetings$2B,
  waiting: waiting$2B
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2z,
  chat: chat$2z,
  default: btx,
  greetings: greetings$2B,
  waiting: waiting$2B
}, Symbol.toStringTag, { value: "Module" }));
const chat$2y = {
  input: {
    placeholder: "Мэдүүлэлээ бэшэгты...",
    listening: "Шагнажа байнаб..."
  },
  enableSound: "Абяа нээхэ",
  stt: {
    transcribing: "Транскрипци: ",
    micActive: "Микрофон эдэбхитэй...",
    heardError: "Хүлисыт, таанадые дуулаагүйб. Дахин туршагты.",
    micAccessError: "Микрофондо орохо аргагүй. Зүбшөөлнүүдые шалгаха."
  },
  speed: {
    idle: "Хооһон:",
    talk: "Хөөрэлдөөн:"
  }
};
const avatar$2y = {
  loading: "Аватар ашаглажа байна...",
  title: {
    maximize: "Ехэ болгохо",
    minimize: "Бага болгохо",
    close: "Хааха",
    clickToMaximize: "Томо болгохын тула дараха",
    clickToMinimize: "Бага болгохын тула дараха"
  },
  error: {
    loadFailed: "Аватар ашаглажа шадаагүй: {{error}} ",
    playerNotLoaded: "AniaPlayer ашаглагдаагүй",
    passwordRequired: "Шифрлэгдэһэн .ania файлда нууц үгэ хэрэгтэй",
    noSource: "Аватарай эхи үгы (avatarUrl гү, али avatarData)"
  }
};
const greetings$2A = {
  "0": "Амар мэндэ! Мүнөөдэр би шамда яажа туһалхабиб?",
  "1": "Мэндээ! Орожо хайрлыт! Би шамда юу хэжэ шадахабиб?",
  "2": "Сайн! Таанадтай хөөрэлдэхэдөө ехэ баяртайб!",
  "3": "Мэндээ! Би эндэ туһалхаяа ерээб. Юун хэрэгтэйб?",
  "4": "Сайн! Хэр байнабта? Би яажа туһатай байхаб?"
};
const waiting$2A = {
  "0": "Би бодожо үзэе...",
  "1": "Нэгэ агшин...",
  "2": "Болбосоруулха...",
  "3": "Нэгэ секундын...",
  "4": "Би шамда шалгажа байнаб..."
};
const bua = {
  chat: chat$2y,
  avatar: avatar$2y,
  greetings: greetings$2A,
  waiting: waiting$2A
};
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2y,
  chat: chat$2y,
  default: bua,
  greetings: greetings$2A,
  waiting: waiting$2A
}, Symbol.toStringTag, { value: "Module" }));
const chat$2x = {
  input: {
    placeholder: "Escriu el teu missatge...",
    listening: "Escoltant..."
  },
  enableSound: "Activa el so",
  stt: {
    transcribing: "Transcripció: ",
    micActive: "Micròfon actiu...",
    heardError: "Ho sento, no t'he pogut escoltar. Si us plau, torna-ho a provar.",
    micAccessError: "No es pot accedir al micròfon. Comproveu els permisos."
  },
  speed: {
    idle: "Inactiu:",
    talk: "Xerrada:"
  }
};
const avatar$2x = {
  loading: "S'està carregant l'avatar...",
  title: {
    maximize: "Maximitzar",
    minimize: "Minimitzar",
    close: "Tancar",
    clickToMaximize: "Feu clic per maximitzar",
    clickToMinimize: "Feu clic per minimitzar"
  },
  error: {
    loadFailed: "No s'ha pogut carregar l'avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer no carregat",
    passwordRequired: "Cal una contrasenya per al fitxer .ania xifrat",
    noSource: "No s'ha proporcionat cap font d'avatar (avatarUrl o avatarData)"
  }
};
const greetings$2z = {
  "0": "hola! Com et puc ajudar avui?",
  "1": "hola! Benvingut! Què puc fer per tu?",
  "2": "Hola! Molt content de parlar amb tu!",
  "3": "hola! Estic aquí per ajudar. Què necessites?",
  "4": "hola! Com estàs? Com puc ser útil?"
};
const waiting$2z = {
  "0": "Deixa'm pensar...",
  "1": "Un moment...",
  "2": "S'està processant...",
  "3": "Només un segon...",
  "4": "T'estic comprovant..."
};
const ca = {
  chat: chat$2x,
  avatar: avatar$2x,
  greetings: greetings$2z,
  waiting: waiting$2z
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2x,
  chat: chat$2x,
  default: ca,
  greetings: greetings$2z,
  waiting: waiting$2z
}, Symbol.toStringTag, { value: "Module" }));
const chat$2w = {
  input: {
    placeholder: "I-type ang imong mensahe...",
    listening: "Nagpaminaw..."
  },
  enableSound: "I-enable ang Tingog",
  stt: {
    transcribing: "Pag-transcribe: ",
    micActive: "Aktibo ang mikropono...",
    heardError: "Sorry, dili ko makadungog nimo. Palihug sulayi pag-usab.",
    micAccessError: "Dili ma-access ang mikropono. Susiha ang mga permiso."
  },
  speed: {
    idle: "walay pulos:",
    talk: "Pakigsulti:"
  }
};
const avatar$2w = {
  loading: "Nagkarga sa avatar...",
  title: {
    maximize: "I-maximize",
    minimize: "Pagminus",
    close: "Duol",
    clickToMaximize: "I-klik aron ma-maximize",
    clickToMinimize: "Pag-klik aron maminusan"
  },
  error: {
    loadFailed: "Napakyas sa pag-load sa avatar: {{error}} ",
    playerNotLoaded: "Wala gikarga ang AniaPlayer",
    passwordRequired: "Kinahanglan ang password para sa na-encrypt nga .ania file",
    noSource: "Walay gihatag nga tinubdan sa avatar (avatarUrl o avatarData)"
  }
};
const greetings$2y = {
  "0": "Hi! Unsaon nako pagtabang kanimo karon?",
  "1": "Hello! Welcome! Unsa may akong mabuhat para nimo?",
  "2": "Kumusta diha! Nalipay kaayo nga nakigsulti kanimo!",
  "3": "Hello! Ania ko aron motabang. Unsay imong gikinahanglan?",
  "4": "Hi! Naunsa ka? Sa unsang paagi ako mahimong mapuslanon?"
};
const waiting$2y = {
  "0": "Pahunahuna ko...",
  "1": "Usa ka higayon...",
  "2": "Nagproseso...",
  "3": "Kadiyot lang...",
  "4": "Gisusi ko kana alang kanimo ..."
};
const ceb = {
  chat: chat$2w,
  avatar: avatar$2w,
  greetings: greetings$2y,
  waiting: waiting$2y
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2w,
  chat: chat$2w,
  default: ceb,
  greetings: greetings$2y,
  waiting: waiting$2y
}, Symbol.toStringTag, { value: "Module" }));
const chat$2v = {
  input: {
    placeholder: "Tamu obutumwa bwawe...",
    listening: "Okuhurikiza..."
  },
  enableSound: "Taho Amaraka",
  stt: {
    transcribing: "Okuhandiika: ",
    micActive: "Amazindaaro gariho...",
    heardError: "Nsasira, tindabaasize kukuhurira. Hakyiri ogyezeho ogundi murundi.",
    micAccessError: "Titurikubaasa kutunga akazindaaro. Reeba orusa."
  },
  speed: {
    idle: "Obutakora:",
    talk: "Okugamba:"
  }
};
const avatar$2v = {
  loading: "Okutaho ekishushani...",
  title: {
    maximize: "Okwongyera",
    minimize: "Kyendeeza",
    close: "Kwinga",
    clickToMaximize: "Nyiga kutunguura",
    clickToMinimize: "Nyiga kukyendeeza"
  },
  error: {
    loadFailed: "Kiremirwe kutaho ekishushani: {{error}} ",
    playerNotLoaded: "AniaPlayer terikuteebwaho",
    passwordRequired: "Password neeyetengyesa ahabwa fairo ya .ania esherekirwe",
    noSource: "Tihariho entandikwa y'ekishushani erikuheebwa (ekishushaniUrl narishi ekishushaniData)"
  }
};
const greetings$2x = {
  "0": "Haro! Nimbaasa kukuhwera nta erizooba?",
  "1": "Haro! Kurikayo! Nkakukorera ki?",
  "2": "Ori ota okwe! Ninshemererwa munonga kugamba naiwe!",
  "3": "Haro! Ndi aha kuyamba. Noyetenga ki?",
  "4": "Haro! Oragambaki? Nimbaasa kuba nta ow’omugasho?"
};
const waiting$2x = {
  "0": "Reka ntekateeke...",
  "1": "Akaanya kamwe...",
  "2": "Okukora...",
  "3": "Akasekondi kakye...",
  "4": "Ekyo ninkikyebera ahabwawe..."
};
const cgg = {
  chat: chat$2v,
  avatar: avatar$2v,
  greetings: greetings$2x,
  waiting: waiting$2x
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2v,
  chat: chat$2v,
  default: cgg,
  greetings: greetings$2x,
  waiting: waiting$2x
}, Symbol.toStringTag, { value: "Module" }));
const chat$2u = {
  input: {
    placeholder: "Шке серышым возо...",
    listening: "Колыштмаш..."
  },
  enableSound: "Йӱкым ышташ",
  stt: {
    transcribing: "Транскрипций: ",
    micActive: "Микрофон пашам ышта...",
    heardError: "Чаманен каласыман, тендам колын омыл. Пожалуйста, угыч ыштен ончо.",
    micAccessError: "Микрофон деке пураш ок лий. Разрешенийым тергымаш."
  },
  speed: {
    idle: "Яра:",
    talk: "Ойлымаш:"
  }
};
const avatar$2u = {
  loading: "Аватарым загрузка...",
  title: {
    maximize: "Максимизировать",
    minimize: "Минимизировать",
    close: "Петыраш",
    clickToMaximize: "Кугу лийже манын, темдал",
    clickToMinimize: "Иземдаш манын, темдал"
  },
  error: {
    loadFailed: "Аватар загрузкым ыштен кертын огыл: {{error}} ",
    playerNotLoaded: "AniaPlayer огеш нал",
    passwordRequired: "Шифроватлыме .ania файллан шолыпмут кӱлеш",
    noSource: "Аватар источникым пуымо огыл (avatarUrl але avatarData)"
  }
};
const greetings$2w = {
  "0": "Салам лийже! Таче мый тыланет кузе полшен кертам?",
  "1": "Салам! Пагален ӱжына! Тыланда мом ыштен кертам?",
  "2": "Чылалан салам! Тендан дене мутланаш моткоч куаненам!",
  "3": "Салам! Мый тыште полшаш улам. Мо кӱлеш?",
  "4": "Салам! Кандайсыз? Кузе мый пайдале лийын кертам?"
};
const waiting$2w = {
  "0": "Шоналтыза...",
  "1": "Ик тат...",
  "2": "Обрабатыватлымаш...",
  "3": "Ик секунд веле...",
  "4": "Мый тидым тыланет тергем..."
};
const chm = {
  chat: chat$2u,
  avatar: avatar$2u,
  greetings: greetings$2w,
  waiting: waiting$2w
};
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2u,
  chat: chat$2u,
  default: chm,
  greetings: greetings$2w,
  waiting: waiting$2w
}, Symbol.toStringTag, { value: "Module" }));
const chat$2t = {
  input: {
    placeholder: "نامەکەت بنووسە...",
    listening: "گوێگرتن..."
  },
  enableSound: "دەنگ چالاک بکە",
  stt: {
    transcribing: "نووسینەوە: ",
    micActive: "مایکرۆفۆن چالاکە...",
    heardError: "ببورە، نەمتوانی گوێم لێت بێت. تکایە دووبارە هەوڵبدەرەوە.",
    micAccessError: "ناتوانرێت دەستت بگات بە مایکرۆفۆن. مۆڵەتەکان بپشکنە."
  },
  speed: {
    idle: "بێکار:",
    talk: "قسە:"
  }
};
const avatar$2t = {
  loading: "بارکردنی ئاڤاتاری...",
  title: {
    maximize: "زۆرترین",
    minimize: "کەمکردنەوە",
    close: "دابخە",
    clickToMaximize: "بۆ زۆرترین کلیک کلیک بکە",
    clickToMinimize: "بۆ کەمکردنەوە کلیک بکە"
  },
  error: {
    loadFailed: "شکستی هێنا لە بارکردنی ئاڤاتاری: {{error}} ",
    playerNotLoaded: "AniaPlayer بار نەکراوە",
    passwordRequired: "وشەی نهێنی پێویستە بۆ پەڕگەی .ania کۆدکراو",
    noSource: "هیچ سەرچاوەیەکی ئاڤاتاری دابین نەکراوە (avatarUrl یان avatarData)"
  }
};
const greetings$2v = {
  "0": "سڵاو! ئەمڕۆ چۆن بتوانم یارمەتیت بدەم؟",
  "1": "سڵاو! بەخێربێیت! چیت بۆ بکەم؟",
  "2": "سڵاو! زۆر خۆشحاڵم کە قسەت لەگەڵ دەکەم!",
  "3": "سڵاو! من لێرەم بۆ یارمەتیدان. چیت پێویستە؟",
  "4": "سڵاو! چۆنی؟ چۆن بتوانم سوودم هەبێت؟"
};
const waiting$2v = {
  "0": "با بیر لەوە بکەمەوە...",
  "1": "یەک سات...",
  "2": "پرۆسێسکردن...",
  "3": "تەنها یەک چرکە...",
  "4": "من ئەوەت بۆ دەپشکنم..."
};
const ckb = {
  chat: chat$2t,
  avatar: avatar$2t,
  greetings: greetings$2v,
  waiting: waiting$2v
};
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2t,
  chat: chat$2t,
  default: ckb,
  greetings: greetings$2v,
  waiting: waiting$2v
}, Symbol.toStringTag, { value: "Module" }));
const chat$2s = {
  input: {
    placeholder: "Na cakuat kha ttial...",
    listening: "Ngaih..."
  },
  enableSound: "Aw kha On",
  stt: {
    transcribing: "Ca ṭial: ",
    micActive: "Microphone a cawlcang...",
    heardError: "Ngaihthiam, na bia kan thei kho lo. Zaangfahnak tein rak i zuam tthan.",
    micAccessError: "Microphone hman khawh a si lo. Nawlpeknak hna kha zoh."
  },
  speed: {
    idle: "Riantuan lo:",
    talk: "Biachim:"
  }
};
const avatar$2s = {
  loading: "Avatar a luh lio...",
  title: {
    maximize: "A tam bik tuah",
    minimize: "Tlawmter",
    close: "Khar",
    clickToMaximize: "A tam bik tuah awkah hmet",
    clickToMinimize: "Tlawmter awkah hmet"
  },
  error: {
    loadFailed: "Avatar load tuah khawh a si lo: {{error}} ",
    playerNotLoaded: "AniaPlayer cu a lut lo",
    passwordRequired: "Encrypted .ania file caah password a herh",
    noSource: "Avatar hrampi pek a si lo (avatarUrl asiloah avatarData)"
  }
};
const greetings$2u = {
  "0": "Hi! Nihin ah zeitindah kan bawmh khawh lai?",
  "1": "Halo! Don! Zeidah kan tuah piak khawh lai?",
  "2": "Halo! Nangmah he bia i ruah cu kaa lawm tuk!",
  "3": "Halo! Bawmh awkah ka um. Zeidah na herh?",
  "4": "Hi! Na dam maw? Zeitindah santlaihnak ka ngeih khawh lai?"
};
const waiting$2u = {
  "0": "Ka ruah tuah...",
  "1": "Caan tlawmpal...",
  "2": "Tuah...",
  "3": "Second pakhat te lawng...",
  "4": "Cucu nangmah caah ka zohfel..."
};
const cnh = {
  chat: chat$2s,
  avatar: avatar$2s,
  greetings: greetings$2u,
  waiting: waiting$2u
};
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2s,
  chat: chat$2s,
  default: cnh,
  greetings: greetings$2u,
  waiting: waiting$2u
}, Symbol.toStringTag, { value: "Module" }));
const chat$2r = {
  input: {
    placeholder: "Scrivite u vostru messagiu...",
    listening: "Ascolta..."
  },
  enableSound: "Attivà u sonu",
  stt: {
    transcribing: "Trascrizione: ",
    micActive: "Microfonu attivu...",
    heardError: "Scusate, ùn ti pudia sente. Per piacè pruvate di novu.",
    micAccessError: "Impossibile à accede à u microfonu. Verificate i permessi."
  },
  speed: {
    idle: "Idle:",
    talk: "Parlà:"
  }
};
const avatar$2r = {
  loading: "Caricamentu di l'avatar...",
  title: {
    maximize: "Maximize",
    minimize: "Minimizà",
    close: "Chiudi",
    clickToMaximize: "Cliccate per maximizà",
    clickToMinimize: "Cliccate per minimizzà"
  },
  error: {
    loadFailed: "Fallu di carica l'avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ùn hè micca caricatu",
    passwordRequired: "Password necessaria per u schedariu .ania criptatu",
    noSource: "Nisuna fonte di avatar furnita (avatarUrl o avatarData)"
  }
};
const greetings$2t = {
  "0": "Salute ! Cumu possu aiutà vi oghje ?",
  "1": "Bonghjornu! Benvenuti! Chì possu fà per voi ?",
  "2": "Bonghjornu à tutti! Cusì felice di parlà cun voi!",
  "3": "Bonghjornu! Sò quì per aiutà. Chì avete bisognu?",
  "4": "Salute ! Cumu si? Cumu possu esse utile?"
};
const waiting$2t = {
  "0": "Lasciami pensà...",
  "1": "Un mumentu...",
  "2": "Trattamentu...",
  "3": "Solu un secondu...",
  "4": "Aghju verificatu chì per voi..."
};
const co = {
  chat: chat$2r,
  avatar: avatar$2r,
  greetings: greetings$2t,
  waiting: waiting$2t
};
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2r,
  chat: chat$2r,
  default: co,
  greetings: greetings$2t,
  waiting: waiting$2t
}, Symbol.toStringTag, { value: "Module" }));
const chat$2q = {
  input: {
    placeholder: "Хаберинъизни язынъыз...",
    listening: "Динълемек..."
  },
  enableSound: "Сесни чалыштырмакъ .",
  stt: {
    transcribing: "Транскрипция япмакъ: ",
    micActive: "Микрофон фааль...",
    heardError: "Афу этинъиз, сизни эшитип оламадым. Риджа этем, бир даа тырышынъыз.",
    micAccessError: "Микрофонгъа кирмек мумкюн дегиль. Иджазелерни тешкеринъиз."
  },
  speed: {
    idle: "Бош:",
    talk: "Лакъырды:"
  }
};
const avatar$2q = {
  loading: "Аватар юклене...",
  title: {
    maximize: "Максималь .",
    minimize: "Энъ эксиклештирмек",
    close: "Якъын",
    clickToMaximize: "Энъ буюклештирмек ичюн басынъыз .",
    clickToMinimize: "Кичиклештирмек ичюн басынъыз ."
  },
  error: {
    loadFailed: "Аватарны юклемек мумкюн олмады: {{error}} ",
    playerNotLoaded: "АниаПлейер юкленмеди .",
    passwordRequired: "Шифрленген .ania файлы ичюн пароль керек .",
    noSource: "Аватар менбасы берильмеген (avatarUrl я да avatarData)"
  }
};
const greetings$2s = {
  "0": "Селям алейкум! Бугунь мен санъа насыл ярдым этерим?",
  "1": "Мераба! Хош кельдинъ! Мен санъа не япайым?",
  "2": "Мераба! Сизнен лаф этмеге пек къуванам!",
  "3": "Мераба! Мен мында ярдым этмеге кельдим. Санъа не керек?",
  "4": "Селям! Ишлер насыл? Насыл этип файдалы ола билем?"
};
const waiting$2s = {
  "0": "Тюшюнейим...",
  "1": "Бир дакъкъа...",
  "2": "Ишлев...",
  "3": "Тек бир саниеде...",
  "4": "Мен буны сиз ичюн тешкерип бакъайым..."
};
const crh = {
  chat: chat$2q,
  avatar: avatar$2q,
  greetings: greetings$2s,
  waiting: waiting$2s
};
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2q,
  chat: chat$2q,
  default: crh,
  greetings: greetings$2s,
  waiting: waiting$2s
}, Symbol.toStringTag, { value: "Module" }));
const chat$2p = {
  input: {
    placeholder: "tip ou mesaz...",
    listening: "pe ekoute..."
  },
  enableSound: "permet son",
  stt: {
    transcribing: "Transkripsyon: ",
    micActive: "Mikro i aktiv...",
    heardError: "dezole, mon pa'n kapab tann ou. silvouple esey ankor.",
    micAccessError: "pa kapab ganny akse avek mikro. Tyek bann permisyon."
  },
  speed: {
    idle: "inaktif:",
    talk: "Koze:"
  }
};
const avatar$2p = {
  loading: "pe load avatar...",
  title: {
    maximize: "maksimize",
    minimize: "minimiz",
    close: "Fermen",
    clickToMaximize: "Klik pou maksimiz",
    clickToMinimize: "Klik pou minimiz"
  },
  error: {
    loadFailed: "pa'n reisi load avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer pa'n ganny load",
    passwordRequired: "Modpas i neseser pou en dosye .ania enkripte",
    noSource: "napa sours avatar ki'n ganny donnen (avatarUrl oubyen avatarData)"
  }
};
const greetings$2r = {
  "0": "Bonzour! ki mannyer mon kapab ed ou ozordi?",
  "1": "Alo! Byenveni! Ki mon kapab fer pour ou?",
  "2": "Alo! mon vreman kontan pou koz avek ou!",
  "3": "Alo! Mon la pou ede. Ki ou bezwen?",
  "4": "Alo! Konman ou sava? ki mannyer mon kapab itil?"
};
const waiting$2r = {
  "0": "les mwan mazinen...",
  "1": "en moman...",
  "2": "Pe prosese...",
  "3": "zis en segonn...",
  "4": "mon pe tyek sa pou ou..."
};
const crs = {
  chat: chat$2p,
  avatar: avatar$2p,
  greetings: greetings$2r,
  waiting: waiting$2r
};
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2p,
  chat: chat$2p,
  default: crs,
  greetings: greetings$2r,
  waiting: waiting$2r
}, Symbol.toStringTag, { value: "Module" }));
const chat$2o = {
  input: {
    placeholder: "Napište svou zprávu...",
    listening: "Poslouchám..."
  },
  enableSound: "Povolit zvuk",
  stt: {
    transcribing: "přepis: ",
    micActive: "Mikrofon aktivní...",
    heardError: "Promiň, neslyšel jsem tě. Zkuste to prosím znovu.",
    micAccessError: "Nelze získat přístup k mikrofonu. Zkontrolujte oprávnění."
  },
  speed: {
    idle: "Nečinný:",
    talk: "mluvit:"
  }
};
const avatar$2o = {
  loading: "Načítání avatara...",
  title: {
    maximize: "Maximalizovat",
    minimize: "Minimalizovat",
    close: "Zavřít",
    clickToMaximize: "Kliknutím maximalizujete",
    clickToMinimize: "Kliknutím minimalizujete"
  },
  error: {
    loadFailed: "Nepodařilo se načíst avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer není načten",
    passwordRequired: "Pro zašifrovaný soubor .ania je vyžadováno heslo",
    noSource: "Nebyl poskytnut žádný zdroj avatara (avatarUrl nebo avatarData)"
  }
};
const greetings$2q = {
  "0": "Ahoj! Jak vám dnes mohu pomoci?",
  "1": "Ahoj! Vítejte! co pro vás mohu udělat?",
  "2": "Dobrý den! Jsem rád, že s vámi mohu mluvit!",
  "3": "Ahoj! Jsem tady, abych vám pomohl. co potřebuješ",
  "4": "Ahoj! Jak se máte? Jak mohu být užitečný?"
};
const waiting$2q = {
  "0": "Nech mě přemýšlet...",
  "1": "Moment...",
  "2": "Zpracovává se...",
  "3": "Jen vteřinku...",
  "4": "Ověřuji ti to..."
};
const cs = {
  chat: chat$2o,
  avatar: avatar$2o,
  greetings: greetings$2q,
  waiting: waiting$2q
};
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2o,
  chat: chat$2o,
  default: cs,
  greetings: greetings$2q,
  waiting: waiting$2q
}, Symbol.toStringTag, { value: "Module" }));
const chat$2n = {
  input: {
    placeholder: "Хӑвӑрӑн ҫырӑва ҫырӑр...",
    listening: "Итлесе..."
  },
  enableSound: "Сасса ӗҫлеттер",
  stt: {
    transcribing: "Транскрипцилесси: ",
    micActive: "Микрофон ӗҫлет...",
    heardError: "Каҫарӑр, сире илтеймерӗм. Тархасшӑн, тепӗр хут тытӑнса пӑхӑр.",
    micAccessError: "Микрофон патне кӗме май ҫук. Ирӗксене тӗрӗслӗр."
  },
  speed: {
    idle: "Ӗҫсӗр:",
    talk: "Калаҫу:"
  }
};
const avatar$2n = {
  loading: "Аватар загрузки...",
  title: {
    maximize: "Пысӑклат",
    minimize: "Пӗчӗклет",
    close: "Хуп",
    clickToMaximize: "Пысӑклатма пусӑр",
    clickToMinimize: "Пӗчӗклетме пусӑр"
  },
  error: {
    loadFailed: "Аватара илме май килмерӗ: {{error}} ",
    playerNotLoaded: "AniaPlayer ҫӗкленмен",
    passwordRequired: "Шифрланӑ .ania файл валли пароль кирлӗ",
    noSource: "Аватар ҫӑлкуҫӗ ҫук (avatarUrl е avatarData)"
  }
};
const greetings$2p = {
  "0": "Салам! Паян эпӗ сана мӗнле пулӑшма пултаратӑп?",
  "1": "Салам! Ырӑ сунса кӗтетпӗр! Мӗн тума пултаратӑп-ха эпӗ саншӑн?",
  "2": "Пурне те салам! Сирӗнпе калаҫма питӗ хавас!",
  "3": "Салам! Эпӗ кунта пулӑшма килтӗм. Мӗн кирлӗ сана?",
  "4": "Салам! Мӗнле пурӑнатӑр? Эпӗ мӗнле усӑллӑ пулма пултаратӑп?"
};
const waiting$2p = {
  "0": "Шухӑшласа пӑхам-ха...",
  "1": "Пӗр самант...",
  "2": "Ӗҫлесе хатӗрлесси...",
  "3": "Пӗр ҫеккунт кӑна...",
  "4": "Эпӗ ӑна сирӗншӗн тӗрӗслетӗп..."
};
const cv = {
  chat: chat$2n,
  avatar: avatar$2n,
  greetings: greetings$2p,
  waiting: waiting$2p
};
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2n,
  chat: chat$2n,
  default: cv,
  greetings: greetings$2p,
  waiting: waiting$2p
}, Symbol.toStringTag, { value: "Module" }));
const chat$2m = {
  input: {
    placeholder: "Teipiwch eich neges...",
    listening: "Wrth wrando..."
  },
  enableSound: "Galluogi Sain",
  stt: {
    transcribing: "Trawsgrifio: ",
    micActive: "Meicroffon yn weithredol...",
    heardError: "Mae'n ddrwg gennym, methu clywed chi. Ceisiwch eto.",
    micAccessError: "Methu cyrchu meicroffon. Gwirio caniatadau."
  },
  speed: {
    idle: "segur:",
    talk: "Sgwrs:"
  }
};
const avatar$2m = {
  loading: "Wrthi'n llwytho avatar...",
  title: {
    maximize: "Mwyhau",
    minimize: "Lleihewch",
    close: "Cau",
    clickToMaximize: "Cliciwch i wneud y mwyaf",
    clickToMinimize: "Cliciwch i leihau"
  },
  error: {
    loadFailed: "Wedi methu llwytho avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer heb ei lwytho",
    passwordRequired: "Mae angen cyfrinair ar gyfer ffeil .ania wedi'i hamgryptio",
    noSource: "Ni ddarparwyd ffynhonnell avatar (avatarUrl neu avatarData)"
  }
};
const greetings$2o = {
  "0": "Helo! Sut gallaf eich helpu heddiw?",
  "1": "Helo! Croeso! Beth alla i ei wneud i chi?",
  "2": "Helo yno! Mor falch o siarad â chi!",
  "3": "Helo! Rydw i yma i helpu. Beth sydd ei angen arnoch chi?",
  "4": "Helo! Sut wyt ti? Sut alla i fod yn ddefnyddiol?"
};
const waiting$2o = {
  "0": "Gadewch i mi feddwl...",
  "1": "Un eiliad...",
  "2": "Wrthi'n prosesu...",
  "3": "Dim ond eiliad...",
  "4": "Rwy'n gwirio hynny i chi ..."
};
const cy = {
  chat: chat$2m,
  avatar: avatar$2m,
  greetings: greetings$2o,
  waiting: waiting$2o
};
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2m,
  chat: chat$2m,
  default: cy,
  greetings: greetings$2o,
  waiting: waiting$2o
}, Symbol.toStringTag, { value: "Module" }));
const chat$2l = {
  input: {
    placeholder: "Skriv din besked...",
    listening: "Lytter..."
  },
  enableSound: "Aktiver lyd",
  stt: {
    transcribing: "Transskribering: ",
    micActive: "Mikrofon aktiv...",
    heardError: "Undskyld, jeg kunne ikke høre dig. Prøv venligst igen.",
    micAccessError: "Kan ikke få adgang til mikrofonen. Tjek tilladelser."
  },
  speed: {
    idle: "Inaktiv:",
    talk: "Snak:"
  }
};
const avatar$2l = {
  loading: "Indlæser avatar...",
  title: {
    maximize: "Maksimer",
    minimize: "Minimer",
    close: "Luk",
    clickToMaximize: "Klik for at maksimere",
    clickToMinimize: "Klik for at minimere"
  },
  error: {
    loadFailed: "Kunne ikke indlæse avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ikke indlæst",
    passwordRequired: "Adgangskode påkrævet til krypteret .ania-fil",
    noSource: "Ingen avatarkilde angivet (avatarUrl eller avatarData)"
  }
};
const greetings$2n = {
  "0": "Hej! Hvordan kan jeg hjælpe dig i dag?",
  "1": "Hej! Velkomst! Hvad kan jeg gøre for dig?",
  "2": "Hej! Så glad for at tale med dig!",
  "3": "Hej! Jeg er her for at hjælpe. Hvad har du brug for?",
  "4": "Hej! Hvordan har du det? Hvordan kan jeg være nyttig?"
};
const waiting$2n = {
  "0": "Lad mig tænke...",
  "1": "Et øjeblik...",
  "2": "Behandler...",
  "3": "Bare et sekund...",
  "4": "Jeg tjekker det for dig..."
};
const da = {
  chat: chat$2l,
  avatar: avatar$2l,
  greetings: greetings$2n,
  waiting: waiting$2n
};
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2l,
  chat: chat$2l,
  default: da,
  greetings: greetings$2n,
  waiting: waiting$2n
}, Symbol.toStringTag, { value: "Module" }));
const chat$2k = {
  input: {
    placeholder: "Geben Sie Ihre Nachricht ein...",
    listening: "Zuhören..."
  },
  enableSound: "Ton aktivieren",
  stt: {
    transcribing: "Transkribieren: ",
    micActive: "Mikrofon aktiv...",
    heardError: "Tut mir leid, ich konnte dich nicht hören. Bitte versuchen Sie es erneut.",
    micAccessError: "Auf das Mikrofon kann nicht zugegriffen werden. Überprüfen Sie die Berechtigungen."
  },
  speed: {
    idle: "Leerlauf:",
    talk: "Vortrag:"
  }
};
const avatar$2k = {
  loading: "Avatar wird geladen...",
  title: {
    maximize: "Maximieren",
    minimize: "Minimieren",
    close: "Schließen",
    clickToMaximize: "Klicken Sie zum Maximieren",
    clickToMinimize: "Klicken Sie zum Minimieren"
  },
  error: {
    loadFailed: "Avatar konnte nicht geladen werden: {{error}} ",
    playerNotLoaded: "AniaPlayer nicht geladen",
    passwordRequired: "Für die verschlüsselte .ania-Datei ist ein Passwort erforderlich",
    noSource: "Keine Avatar-Quelle angegeben (avatarUrl oder avatarData)"
  }
};
const greetings$2m = {
  "0": "Hallo! Wie kann ich Ihnen heute helfen?",
  "1": "Hallo! Willkommen! Was kann ich für Sie tun?",
  "2": "Hallo! Ich freue mich sehr, mit Ihnen zu sprechen!",
  "3": "Hallo! Ich bin hier, um zu helfen. Was brauchen Sie?",
  "4": "Hallo! Wie geht es dir? Wie kann ich nützlich sein?"
};
const waiting$2m = {
  "0": "Lass mich nachdenken...",
  "1": "Einen Moment...",
  "2": "Verarbeitung...",
  "3": "Nur eine Sekunde...",
  "4": "Ich überprüfe das für Sie..."
};
const de = {
  chat: chat$2k,
  avatar: avatar$2k,
  greetings: greetings$2m,
  waiting: waiting$2m
};
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2k,
  chat: chat$2k,
  default: de,
  greetings: greetings$2m,
  waiting: waiting$2m
}, Symbol.toStringTag, { value: "Module" }));
const chat$2j = {
  input: {
    placeholder: "Gät wɛ̈tdu...",
    listening: "Piŋ..."
  },
  enableSound: "Tääu ë röl",
  stt: {
    transcribing: "Gät de wël: ",
    micActive: "Miikröfon atɔ̈u...",
    heardError: "Pääl ɣën awuoc, këc yïn pïŋ. Yïn thiëcku ba bɛɛr them.",
    micAccessError: "Acïï lëu bï yök në maikrofon yic. Tïŋ kä cïke puɔ̈l."
  },
  speed: {
    idle: "Kë cïn kë lui:",
    talk: "Jam:"
  }
};
const avatar$2j = {
  loading: "Tääu ë thura...",
  title: {
    maximize: "Tääu ë kë dït",
    minimize: "Koor",
    close: "Thiök",
    clickToMaximize: "Tuany ba dït",
    clickToMinimize: "Tuany ba cɔk koor"
  },
  error: {
    loadFailed: "Acï löny bï thura tääu thïn: {{error}} ",
    playerNotLoaded: "AniaPlëyer akëc tääu",
    passwordRequired: "Wɛ̈t ë gël akɔɔr tënë athör cï thiaan .ania",
    noSource: "Acïn të bïï ë kë cï nyuɔɔth thïn cï bɛ̈i (kë cï nyuɔɔthUrl wɛ̈lɛ̈/ka Kä cïke nyuɔɔth)"
  }
};
const greetings$2l = {
  "0": "Yïn yök! Yeŋö ba looi ba yï kony akölë?",
  "1": "Ɣä! Taue thin! Yeŋö ba looi tënë yï?",
  "2": "Kuudwal käjuec! Ku ɣɛn acï puɔ̈u miɛt ba jam kek yïn!",
  "3": "Ɣä! Ɣɛn tɔ̈ ëtënë ba kuɔny. Yeŋö wïc yïn?",
  "4": "Yin ca möth! Loi ɣëdε? Yeŋö lëu ba ya luui?"
};
const waiting$2l = {
  "0": "Cɔk ɣɛn tak...",
  "1": "Thaar tök...",
  "2": "Luɔɔi...",
  "3": "Aköl tök abac...",
  "4": "Ɣɛn ye yeen tïŋ tënë yïn..."
};
const din = {
  chat: chat$2j,
  avatar: avatar$2j,
  greetings: greetings$2l,
  waiting: waiting$2l
};
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2j,
  chat: chat$2j,
  default: din,
  greetings: greetings$2l,
  waiting: waiting$2l
}, Symbol.toStringTag, { value: "Module" }));
const chat$2i = {
  input: {
    placeholder: "अपना मैसेज टाइप करो...",
    listening: "सुनते हुए..."
  },
  enableSound: "साउंड सक्षम करो",
  stt: {
    transcribing: "लिपिबद्ध करना: ",
    micActive: "माइक्रोफोन सक्रिय ऐ...",
    heardError: "माफ करना, सुनी नहीं सकेया। कृपा करियै दुबारा कोशश करो।",
    micAccessError: "माइक एक्सेस करने च असमर्थ। अनुमतियां दी जांच करो।"
  },
  speed: {
    idle: "बेकार:",
    talk: "गल्ल करो:"
  }
};
const avatar$2i = {
  loading: "अवतार लोड हो रहा है...",
  title: {
    maximize: "अधिकतम करो",
    minimize: "कम से कम कर दे",
    close: "बंद करो",
    clickToMaximize: "अधिकतम करने लेई क्लिक करो",
    clickToMinimize: "कम से कम करने लेई क्लिक करो"
  },
  error: {
    loadFailed: "अवतार लोड करने च असफल: {{error}} ",
    playerNotLoaded: "AniaPlayer लोड नहीं होया",
    passwordRequired: "एन्क्रिप्टेड .ania फाइल आस्तै पासवर्ड दी लोड़ ऐ",
    noSource: "कोई अवतार स्रोत नेईं दित्ता गेआ (avatarUrl जां avatarData)"
  }
};
const greetings$2k = {
  "0": "हाय ! अज्ज मैं तुंदी मदद किस चाल्ली करी सकना ऐ?",
  "1": "नमस्कार! सुआगत! मैं तुहाडे वास्ते की कर सकदा हां?",
  "2": "नमस्ते! तुहाडे नाल गल्ल करन दी इतनी खुशी हो गई!",
  "3": "नमस्कार! मैं इत्थे मदद करन लई आया हां। तुसेंगी केह़ लोड़ ऐ?",
  "4": "नमस्ते! थुआढ़ा केह् हाल ऐ? मैं किवें उपयोगी हो सकदा हां?"
};
const waiting$2k = {
  "0": "मैं सोचदा हां...",
  "1": "इक पल...",
  "2": "प्रोसेसिंग करदे होई...",
  "3": "बस इक सेकंड...",
  "4": "मैं तुहाडे वास्ते ओह चेक कर रेहा हां..."
};
const doi = {
  chat: chat$2i,
  avatar: avatar$2i,
  greetings: greetings$2k,
  waiting: waiting$2k
};
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2i,
  chat: chat$2i,
  default: doi,
  greetings: greetings$2k,
  waiting: waiting$2k
}, Symbol.toStringTag, { value: "Module" }));
const chat$2h = {
  input: {
    placeholder: "Lemba mulumbe wako...",
    listening: "Kuswiilizya..."
  },
  enableSound: "Bikka Muzuzumo",
  stt: {
    transcribing: "Kulemba: ",
    micActive: "Maikkulofooni ilikubeleka...",
    heardError: "ndausa, teensi ndakakumvwa. Kosola alimwi.",
    micAccessError: "Tachikonzyi kunjila mumaikkulofooni. Langa zyeelelo."
  },
  speed: {
    idle: "Kakwiina kuchita:",
    talk: "Makani:"
  }
};
const avatar$2h = {
  loading: "Kubikka avatar...",
  title: {
    maximize: "Kuyungizya",
    minimize: "Kucesya",
    close: "Jala",
    clickToMaximize: "Dina kuti uyungizye",
    clickToMinimize: "Dina kuti uchiche"
  },
  error: {
    loadFailed: "Kwakachilwa kubikka avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer tiiyakabikkwa pe",
    passwordRequired: "Ipasiwedi ilayandika kufailo lya .ania lilembedwe",
    noSource: "Taakwe nkobakajana zifwanikiso (avatarUrl naa avatarData)"
  }
};
const greetings$2j = {
  "0": "Wapona! Ino inga ndakugwasya biyeni sunu?",
  "1": "Mbiyeni! Watambulwa! Ino ndilakuchitilaanzi?",
  "2": "Wapona oko! Ndabotelwa kwaambuula ayebo!",
  "3": "Mbiyeni! Ndili aano kugwasya. Ninzi nchoyanda?",
  "4": "Wapona! Ulibiyeni? Ino inga ndagwasya biyeni?"
};
const waiting$2j = {
  "0": "Ndileke ndiyeeye...",
  "1": "Chimwi chiindi...",
  "2": "Kubamba...",
  "3": "Muchindi chifwiifwi...",
  "4": "Ndili mukukulanga eecho kuli nduwe..."
};
const dov = {
  chat: chat$2h,
  avatar: avatar$2h,
  greetings: greetings$2j,
  waiting: waiting$2j
};
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2h,
  chat: chat$2h,
  default: dov,
  greetings: greetings$2j,
  waiting: waiting$2j
}, Symbol.toStringTag, { value: "Module" }));
const chat$2g = {
  input: {
    placeholder: "ތިޔަ މެސެޖު ޓައިޕް ކުރާށެވެ...",
    listening: "އަޑުއަހަން..."
  },
  enableSound: "އަޑު އެނެބަލް ކުރާށެވެ",
  stt: {
    transcribing: "ޓްރާންސްކްރިޕްޓް ކުރުން: ",
    micActive: "މައިކްރޯފޯން އެކްޓިވް...",
    heardError: "ސޮރީ، އަޑު އިވޭ ގޮތެއް ނުވި. އަނެއްކާވެސް މަސައްކަތް ކުރައްވާށެވެ.",
    micAccessError: "މައިކް އަށް ވަދެވޭނެ ގޮތެއް ނުވި އެވެ. ހުއްދަތައް ޗެކްކުރުން."
  },
  speed: {
    idle: "އައިޑަލް:",
    talk: "ވާހަކަ:"
  }
};
const avatar$2g = {
  loading: "އަވަޓަރ ލޯޑް ކުރަނީ...",
  title: {
    maximize: "މެކްސިމަޒް ކުރުން",
    minimize: "އެންމެ ކުޑަކުރުން",
    close: "ބަންދުކޮށްލާށެވެ",
    clickToMaximize: "މެކްސިމަޒް ކުރުމަށް ކްލިކް ކުރާށެވެ",
    clickToMinimize: "މިނިމައިޒް ކުރުމަށް ކްލިކް ކުރާށެވެ"
  },
  error: {
    loadFailed: "އަވަޓަރ ލޯޑް ނުކުރެވިއްޖެ: {{error}} ",
    playerNotLoaded: "AniaPlayer ލޯޑް ނުކުރެވިއްޖެއެވެ",
    passwordRequired: "އެންކްރިޕްޓް ކުރެވިފައިވާ .ania ފައިލް އަށް ޕާސްވޯޑް ބޭނުންވެއެވެ",
    noSource: "އަވަޓަރ ސޯސްއެއް ފޯރުކޮށްދީފައެއް ނުވެއެވެ (avatarUrl ނުވަތަ avatarData)"
  }
};
const greetings$2i = {
  "0": "ހައި! މިއަދު އަހަރެން ކަލެއަށް އެހީތެރިވެދެވޭނީ ކިހިނެއް ހެއްޔެވެ؟",
  "1": "އައްސަލާމް ޢަލައިކުމް! މަރުޙަބާ! އަހަރެން ކަލެއަށް ކޮށްދެވޭނީ ކޮންކަމެއް ހެއްޔެވެ؟",
  "2": "އައްސަލާމް ޢަލައިކުމް! ސޯ ގްރޭޑް ޓު ޓޯކް ޓު ޔޫ!",
  "3": "އައްސަލާމް ޢަލައިކުމް! އަހަރެން މިހުރީ އެހީތެރިވާން. ބޭނުންވަނީ ކޮންކަމެއް ހެއްޔެވެ؟",
  "4": "އައްސަލާމް ޢަލައިކުމް! ހާލު ކިހިނެތް؟ އަހަރެން ބޭނުންތެރި ވާނީ ކިހިނެއް ހެއްޔެވެ؟"
};
const waiting$2i = {
  "0": "އަޅުގަނޑު ވިސްނާލަން...",
  "1": "އެއް ހިނދުކޮޅު...",
  "2": "ޕްރޮސެސިންގ...",
  "3": "އެންމެ ސިކުންތެއް...",
  "4": "އަހަރެން އެކަން ޗެކް ކުރަނީ ކަލެއަށް..."
};
const dv = {
  chat: chat$2g,
  avatar: avatar$2g,
  greetings: greetings$2i,
  waiting: waiting$2i
};
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2g,
  chat: chat$2g,
  default: dv,
  greetings: greetings$2i,
  waiting: waiting$2i
}, Symbol.toStringTag, { value: "Module" }));
const chat$2f = {
  input: {
    placeholder: "ཁྱོད་རའི་འཕྲིན་དོན་ཡིག་དཔར་རྐྱབས།",
    listening: "ཉན་བཞིན་པ།"
  },
  enableSound: "སྒྲ་སྐད་ལྕོགས་ཅན་བཟོ།",
  stt: {
    transcribing: "ཡིག་བསྒྱུར་འབད་དོ། ",
    micActive: "མའི་ཀོརོ་ཕོན་ཤུགས་ལྡན་...",
    heardError: "དགོངས་དག་ཞུ། ཁྱོད་ཀྱི་གོ་མ་ཚུགས། ལོག་སྟེ་འབད་རྩོལ་བསྐྱེད་གནང་།",
    micAccessError: "སྐད་འཕྲིན་འཛུལ་སྤྱོད་འབད་མ་ཚུགས། གནང་བ་ཚུ་ཞིབ་དཔྱད་འབད།"
  },
  speed: {
    idle: "ལཱ་མེད་:",
    talk: "གསུང་བཤད།"
  }
};
const avatar$2f = {
  loading: "གཟུགས་བརྙན་མངོན་གསལ་འབད་དོ།",
  title: {
    maximize: "ཆེར་བསྐྱེད་འབད།",
    minimize: "ཉུང་ཉུང་བཟོ།",
    close: "ཁ་བསྡམས།",
    clickToMaximize: "ཆེར་བསྐྱེད་འབད་ནི་ལུ་ཨེབ་གཏང་།",
    clickToMinimize: "ཆུང་ཀུ་བཟོ་ནི་ལུ་ཨེབ་གཏང་།"
  },
  error: {
    loadFailed: "གཟུགས་བརྙན་མངོན་གསལ་འབད་ནི་ལུ་འཐུས་ཤོར་བྱུང་ཡོདཔ།: {{error}} ",
    playerNotLoaded: "AniaPlayer མངོན་གསལ་མ་འབད་བས།",
    passwordRequired: "གསང་བཟོས་ .ania ཡིག་སྣོད་ཀྱི་དོན་ལུ་ཆོག་ཡིག་དགོཔ།",
    noSource: "ཨེ་ཝ་ཊར་འབྱུང་ཁུངས་བྱིན་མ་བཏུབ་ (avatarUrl ཡང་ན་ avatarData)"
  }
};
const greetings$2h = {
  "0": "ཧི་! ད་རེས་ང་གིས་ཁྱོད་ལུ་ག་དེ་སྦེ་ཆ་རོགས་འབད་ནི་སྨོ?",
  "1": "སྐུ༌གཟུགས༌བཟང༌པོ! འབྱོན་པར་ལེགས་སོ! ང་གིས་ཁྱོད་ལུ་ག་ཅི་འབད་ཚུགས་ནི་སྨོ།",
  "2": "གེ༌ར༌ལུ༌སྐུ༌གཟུགས༌བཟང༌པོ! ཁྱོད་དང་མཉམ་དུ་ཁ་སླབ་པར་དགའ་པོ་བྱུང་།",
  "3": "སྐུ༌གཟུགས༌བཟང༌པོ! ང་འདིར་རོགས་རམ་བྱ་བར་འོང༌། ག་ཅི་དགོཔ་སྨོ?",
  "4": "སྐུ༌གཟུགས༌བཟང༌པོ! ཁྱོད༌ག༌དེ༌སྦེ༌ཡོད? ཕན་ཐོགས་ག་དེ་སྦེ་འབྱུང་ཚུགས།"
};
const waiting$2h = {
  "0": "ང་ལུ་བསམ་བློ་གཏང་བཅུག...",
  "1": "སྐར་མ་གཅིག་...",
  "2": "ལས་སྦྱོར་འབད་དོ།",
  "3": "སྐར་མ་གཅིག་རྐྱངམ་གཅིག...",
  "4": "ང་ཁྱོད་ཀྱི་དོན་ལུ་བརྟག་དཔྱད་འབད་དོ།"
};
const dz = {
  chat: chat$2f,
  avatar: avatar$2f,
  greetings: greetings$2h,
  waiting: waiting$2h
};
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2f,
  chat: chat$2f,
  default: dz,
  greetings: greetings$2h,
  waiting: waiting$2h
}, Symbol.toStringTag, { value: "Module" }));
const chat$2e = {
  input: {
    placeholder: "Ŋlɔ wò gbedasi...",
    listening: "Toɖoɖo..."
  },
  enableSound: "Na Gbeɖiɖi Nawɔ dɔ",
  stt: {
    transcribing: "Nuŋɔŋlɔ ŋɔŋlɔ: ",
    micActive: "Nuƒomɔ̃ si le dɔ wɔm...",
    heardError: "Kpeɖeŋutɔ, nyemete ŋu se wò nya o. Taflatse gadze agbagba ake.",
    micAccessError: "Mete ŋu ge ɖe nuƒomɔ̃a me o. Kpɔ mɔɖeɖewo ɖa."
  },
  speed: {
    idle: "Dɔmawɔmawɔ:",
    talk: "Nuƒo:"
  }
};
const avatar$2e = {
  loading: "Wole avatar xɔm...",
  title: {
    maximize: "Madzi ɖe edzi",
    minimize: "Ðe edzi",
    close: "Kloe",
    clickToMaximize: "Zi edzi be nàkpɔe wòalolo wu",
    clickToMinimize: "Zi edzi be nàɖe edzi akpɔtɔ"
  },
  error: {
    loadFailed: "Do kpo avatar ƒe agba tsɔtsɔ: {{error}} . ",
    playerNotLoaded: "AniaPlayer metsɔ agba o",
    passwordRequired: "Nyagbe si hiã na .ania faɛl si wotsɔ nya ɣaɣlawo ŋlɔ",
    noSource: "Wometsɔ avatar dzɔtsoƒe aɖeke na o (avatarUrl alo avatarData) ."
  }
};
const greetings$2g = {
  "0": "Hi! Aleke mate ŋu akpe ɖe ŋuwò egbea?",
  "1": "Hello! Woezɔ̃! Nukae mate ŋu awɔ na wò?",
  "2": "Medo gbe na mi! Edzɔ dzi nam ŋutɔ be meƒo nu kpli wò!",
  "3": "Hello! Meva afisia be makpe ɖe ŋunye. Nukae nèhiã?",
  "4": "Alekee! Efɔ̃a? Aleke mate ŋu aɖe vi?"
};
const waiting$2g = {
  "0": "Mina mabu eŋu be...",
  "1": "Ɣeyiɣi ɖeka...",
  "2": "Dɔwɔwɔ tso eŋu...",
  "3": "Sɛkɛnd ɖeka pɛ ko...",
  "4": "Mele ŋku lém ɖe ema ŋu na wò..."
};
const ee = {
  chat: chat$2e,
  avatar: avatar$2e,
  greetings: greetings$2g,
  waiting: waiting$2g
};
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2e,
  chat: chat$2e,
  default: ee,
  greetings: greetings$2g,
  waiting: waiting$2g
}, Symbol.toStringTag, { value: "Module" }));
const chat$2d = {
  input: {
    placeholder: "Πληκτρολογήστε το μήνυμά σας...",
    listening: "Ακούγοντας..."
  },
  enableSound: "Ενεργοποίηση ήχου",
  stt: {
    transcribing: "Μεταγραφή: ",
    micActive: "Ενεργό μικρόφωνο...",
    heardError: "Συγγνώμη, δεν σε άκουσα. Δοκιμάστε ξανά.",
    micAccessError: "Δεν είναι δυνατή η πρόσβαση στο μικρόφωνο. Ελέγξτε τις άδειες."
  },
  speed: {
    idle: "Σε αδράνεια:",
    talk: "Συζήτηση:"
  }
};
const avatar$2d = {
  loading: "Φόρτωση avatar...",
  title: {
    maximize: "Μεγιστοποίηση",
    minimize: "Ελαχιστοποίηση",
    close: "Κλείσιμο",
    clickToMaximize: "Κάντε κλικ για μεγιστοποίηση",
    clickToMinimize: "Κάντε κλικ για ελαχιστοποίηση"
  },
  error: {
    loadFailed: "Η φόρτωση του avatar απέτυχε: {{error}} ",
    playerNotLoaded: "Το AniaPlayer δεν έχει φορτωθεί",
    passwordRequired: "Απαιτείται κωδικός πρόσβασης για κρυπτογραφημένο αρχείο .ania",
    noSource: "Δεν παρέχεται πηγή avatar (avatarUrl ή avatarData)"
  }
};
const greetings$2f = {
  "0": "Γεια σου! Πώς μπορώ να σας βοηθήσω σήμερα;",
  "1": "Γειά σου! Καλωσόρισμα! Τι μπορώ να κάνω για σένα;",
  "2": "Γεια σου! Χαίρομαι που μιλάω μαζί σου!",
  "3": "Γειά σου! Είμαι εδώ για να βοηθήσω. Τι χρειάζεσαι;",
  "4": "Γεια! Τι κάνετε; Πώς μπορώ να είμαι χρήσιμος;"
};
const waiting$2f = {
  "0": "Άσε με να σκεφτώ...",
  "1": "Μια στιγμή...",
  "2": "Επεξεργασία...",
  "3": "Μόλις ένα δευτερόλεπτο...",
  "4": "Το τσεκάρω για σένα..."
};
const el = {
  chat: chat$2d,
  avatar: avatar$2d,
  greetings: greetings$2f,
  waiting: waiting$2f
};
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2d,
  chat: chat$2d,
  default: el,
  greetings: greetings$2f,
  waiting: waiting$2f
}, Symbol.toStringTag, { value: "Module" }));
const greetings$2e = {
  "0": "Hi! How can I help you today?",
  "1": "Hello! Welcome! What can I do for you?",
  "2": "Hi there! So glad to talk to you!",
  "3": "Hello! I'm here to help. What do you need?",
  "4": "Hi! How are you? How can I be useful?"
};
const waiting$2e = {
  "0": "Let me think...",
  "1": "One moment...",
  "2": "Processing...",
  "3": "Just a second...",
  "4": "I'm checking that for you..."
};
const en = {
  "chat.input.placeholder": "Type your message...",
  "chat.input.listening": "Listening...",
  "chat.enableSound": "Enable Sound",
  "chat.stt.transcribing": "Transcribing: ",
  "chat.stt.micActive": "Microphone active...",
  "chat.stt.heardError": "Sorry, couldn't hear you. Please try again.",
  "chat.stt.micAccessError": "Unable to access microphone. Check permissions.",
  "chat.speed.idle": "Idle:",
  "chat.speed.talk": "Talk:",
  "chat.flow.back": "Back",
  "chat.flow.escalate": "Talk to a real person",
  "chat.flow.submit": "Submit",
  "chat.flow.skip": "Skip",
  "chat.flow.inputInvalid": "Please check this field and try again.",
  "chat.error.generic": "I ran into a little hiccup here — could you try again?",
  "avatar.loading": "Loading avatar...",
  "avatar.title.maximize": "Maximize",
  "avatar.title.minimize": "Minimize",
  "avatar.title.close": "Close",
  "avatar.title.clickToMaximize": "Click to maximize",
  "avatar.title.clickToMinimize": "Click to minimize",
  "avatar.error.loadFailed": "Failed to load avatar: {{error}}",
  "avatar.error.playerNotLoaded": "AniaPlayer not loaded",
  "avatar.error.passwordRequired": "Password required for encrypted .ania file",
  "avatar.error.noSource": "No avatar source provided (avatarUrl or avatarData)",
  greetings: greetings$2e,
  waiting: waiting$2e
};
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: en,
  greetings: greetings$2e,
  waiting: waiting$2e
}, Symbol.toStringTag, { value: "Module" }));
const chat$2c = {
  input: {
    placeholder: "Tajpu vian mesaĝon...",
    listening: "Aŭskultante..."
  },
  enableSound: "Ebligu Sonon",
  stt: {
    transcribing: "Transskribado: ",
    micActive: "Aktiva mikrofono...",
    heardError: "Pardonu, mi ne povis aŭdi vin. Bonvolu provi denove.",
    micAccessError: "Ne eblas aliri mikrofonon. Kontrolu permesojn."
  },
  speed: {
    idle: "Neaktiva:",
    talk: "Diskuto:"
  }
};
const avatar$2c = {
  loading: "Ŝarĝante avataron...",
  title: {
    maximize: "Maksimumigi",
    minimize: "Minimumigi",
    close: "Fermu",
    clickToMaximize: "Klaku por maksimumigi",
    clickToMinimize: "Klaku por minimumigi"
  },
  error: {
    loadFailed: "Malsukcesis ŝargi avataron: {{error}} ",
    playerNotLoaded: "AniaPlayer ne ŝargita",
    passwordRequired: "Pasvorto necesa por ĉifrita .ania dosiero",
    noSource: "Neniu avatarfonto disponigita (avatarUrl aŭ avatarData)"
  }
};
const greetings$2d = {
  "0": "Saluton! Kiel mi povas helpi vin hodiaŭ?",
  "1": "Saluton! Bonvenon! Kion mi povas fari por vi?",
  "2": "Saluton! Tiel ĝojas paroli kun vi!",
  "3": "Saluton! Mi estas ĉi tie por helpi. Kion vi bezonas?",
  "4": "Saluton! Kiel vi fartas? Kiel mi povas esti utila?"
};
const waiting$2d = {
  "0": "Lasu min pensi...",
  "1": "Unu momento...",
  "2": "Prilaborado...",
  "3": "Nur sekundo...",
  "4": "Mi kontrolas tion por vi..."
};
const eo = {
  chat: chat$2c,
  avatar: avatar$2c,
  greetings: greetings$2d,
  waiting: waiting$2d
};
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2c,
  chat: chat$2c,
  default: eo,
  greetings: greetings$2d,
  waiting: waiting$2d
}, Symbol.toStringTag, { value: "Module" }));
const chat$2b = {
  input: {
    placeholder: "Escribe tu mensaje...",
    listening: "Escuchando..."
  },
  enableSound: "Habilitar sonido",
  stt: {
    transcribing: "Transcribiendo: ",
    micActive: "Micrófono activo...",
    heardError: "Lo siento, no pude oírte. Por favor inténtalo de nuevo.",
    micAccessError: "No se puede acceder al micrófono. Verificar permisos."
  },
  speed: {
    idle: "Inactivo:",
    talk: "Charla:"
  }
};
const avatar$2b = {
  loading: "Cargando avatar...",
  title: {
    maximize: "maximizar",
    minimize: "minimizar",
    close: "Cerrar",
    clickToMaximize: "Haga clic para maximizar",
    clickToMinimize: "Haga clic para minimizar"
  },
  error: {
    loadFailed: "No se pudo cargar el avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer no cargado",
    passwordRequired: "Se requiere contraseña para el archivo .ania cifrado",
    noSource: "No se proporciona ninguna fuente de avatar (avatarUrl o avatarData)"
  }
};
const greetings$2c = {
  "0": "¡Hola! ¿Cómo puedo ayudarte hoy?",
  "1": "¡Hola! ¡Bienvenido! ¿Qué puedo hacer por ti?",
  "2": "¡Hola! ¡Me alegra mucho hablar contigo!",
  "3": "¡Hola! Estoy aquí para ayudar. ¿Qué necesitas?",
  "4": "¡Hola! ¿Cómo estás? ¿Cómo puedo ser útil?"
};
const waiting$2c = {
  "0": "Déjame pensar...",
  "1": "Un momento...",
  "2": "Procesando...",
  "3": "Sólo un segundo...",
  "4": "Estoy comprobando eso por ti..."
};
const es = {
  chat: chat$2b,
  avatar: avatar$2b,
  greetings: greetings$2c,
  waiting: waiting$2c
};
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2b,
  chat: chat$2b,
  default: es,
  greetings: greetings$2c,
  waiting: waiting$2c
}, Symbol.toStringTag, { value: "Module" }));
const chat$2a = {
  input: {
    placeholder: "Sisestage oma sõnum...",
    listening: "Kuulan..."
  },
  enableSound: "Luba heli",
  stt: {
    transcribing: "Transkribeerimine: ",
    micActive: "Mikrofon aktiivne...",
    heardError: "Vabandust, ma ei kuulnud teid. Palun proovi uuesti.",
    micAccessError: "Mikrofonile ei pääse juurde. Kontrolli õigusi."
  },
  speed: {
    idle: "Tühikäik:",
    talk: "Rääkige:"
  }
};
const avatar$2a = {
  loading: "Avatari laadimine...",
  title: {
    maximize: "Maksimeerida",
    minimize: "Minimeeri",
    close: "Sule",
    clickToMaximize: "Maksimeerimiseks klõpsake",
    clickToMinimize: "Minimeerimiseks klõpsake"
  },
  error: {
    loadFailed: "Avatari laadimine ebaõnnestus: {{error}} ",
    playerNotLoaded: "AniaPlayerit pole laaditud",
    passwordRequired: "Krüptitud .ania-faili jaoks on vaja parooli",
    noSource: "Avatari allikat ei pakuta (avatarUrl või avatarData)"
  }
};
const greetings$2b = {
  "0": "Tere! Kuidas saan teid täna aidata?",
  "1": "Tere! Tere tulemast! Mida ma saan teie heaks teha?",
  "2": "Tere! Nii hea meel teiega rääkida!",
  "3": "Tere! Olen siin, et aidata. Mida sa vajad?",
  "4": "Tere! Kuidas läheb? Kuidas saan kasulik olla?"
};
const waiting$2b = {
  "0": "Las ma mõtlen...",
  "1": "Üks hetk...",
  "2": "Töötlemine...",
  "3": "Vaid sekund...",
  "4": "Ma kontrollin seda teie jaoks..."
};
const et = {
  chat: chat$2a,
  avatar: avatar$2a,
  greetings: greetings$2b,
  waiting: waiting$2b
};
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2a,
  chat: chat$2a,
  default: et,
  greetings: greetings$2b,
  waiting: waiting$2b
}, Symbol.toStringTag, { value: "Module" }));
const chat$29 = {
  input: {
    placeholder: "Idatzi zure mezua...",
    listening: "Entzuten..."
  },
  enableSound: "Gaitu soinua",
  stt: {
    transcribing: "Transkripzioa: ",
    micActive: "Mikrofonoa aktibo...",
    heardError: "Barkatu, ezin zaitut entzun. Mesedez, saiatu berriro.",
    micAccessError: "Ezin da mikrofonora sartu. Egiaztatu baimenak."
  },
  speed: {
    idle: "Inaktibo:",
    talk: "Hitzaldia:"
  }
};
const avatar$29 = {
  loading: "Avatarra kargatzen...",
  title: {
    maximize: "Maximizatu",
    minimize: "Minimizatu",
    close: "Itxi",
    clickToMaximize: "Egin klik maximizatzeko",
    clickToMinimize: "Egin klik minimizatzeko"
  },
  error: {
    loadFailed: "Ezin izan da avatarra kargatu: {{error}} ",
    playerNotLoaded: "AniaPlayer ez da kargatu",
    passwordRequired: "Pasahitza behar da enkriptatutako .ania fitxategirako",
    noSource: "Ez da avatar iturririk eman (avatarUrl edo avatarData)"
  }
};
const greetings$2a = {
  "0": "Kaixo! Nola lagundu dezaket gaur?",
  "1": "Kaixo! Ongi etorri! Zer egin dezaket zuretzat?",
  "2": "Kaixo! Pozten naiz zurekin hitz egiteaz!",
  "3": "Kaixo! Hemen nago laguntzeko. Zer behar duzu?",
  "4": "Kaixo! Zer moduz zaude? Nola izan naiteke erabilgarria?"
};
const waiting$2a = {
  "0": "Utzidazu pentsatzen...",
  "1": "Momentu bat...",
  "2": "Prozesatzen...",
  "3": "Segundo bat besterik ez...",
  "4": "Zuretzat egiaztatzen ari naiz..."
};
const eu = {
  chat: chat$29,
  avatar: avatar$29,
  greetings: greetings$2a,
  waiting: waiting$2a
};
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$29,
  chat: chat$29,
  default: eu,
  greetings: greetings$2a,
  waiting: waiting$2a
}, Symbol.toStringTag, { value: "Module" }));
const chat$28 = {
  input: {
    placeholder: "پیام خود را تایپ کنید...",
    listening: "گوش دادن..."
  },
  enableSound: "صدا را فعال کنید",
  stt: {
    transcribing: "رونویسی: ",
    micActive: "میکروفون فعال ...",
    heardError: "متاسفم، نتونستم صداتو بشنوم لطفا دوباره امتحان کنید.",
    micAccessError: "دسترسی به میکروفون امکان پذیر نیست. مجوزها را بررسی کنید."
  },
  speed: {
    idle: "بیکار:",
    talk: "بحث:"
  }
};
const avatar$28 = {
  loading: "در حال بارگیری نماد...",
  title: {
    maximize: "به حداکثر رساندن",
    minimize: "به حداقل رساندن",
    close: "بستن",
    clickToMaximize: "برای به حداکثر رساندن کلیک کنید",
    clickToMinimize: "برای کوچک کردن کلیک کنید"
  },
  error: {
    loadFailed: "آواتار بارگیری نشد: {{error}} ",
    playerNotLoaded: "AniaPlayer بارگذاری نشده است",
    passwordRequired: "رمز عبور برای فایل .ania رمزگذاری شده مورد نیاز است",
    noSource: "منبع آواتاری ارائه نشده است (avatarUrl یا avatarData)"
  }
};
const greetings$29 = {
  "0": "سلام! امروز چگونه می توانم به شما کمک کنم؟",
  "1": "سلام! خوش آمدید! چه کاری می توانم برای شما انجام دهم؟",
  "2": "سلام! خیلی خوشحالم که با شما صحبت می کنم!",
  "3": "سلام! من اینجا هستم تا کمک کنم. چه چیزی نیاز دارید؟",
  "4": "سلام! چطوری؟ چگونه می توانم مفید باشم؟"
};
const waiting$29 = {
  "0": "بذار فکر کنم...",
  "1": "یک لحظه...",
  "2": "در حال پردازش...",
  "3": "فقط یک ثانیه...",
  "4": "من این را برای شما بررسی می کنم ..."
};
const fa = {
  chat: chat$28,
  avatar: avatar$28,
  greetings: greetings$29,
  waiting: waiting$29
};
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$28,
  chat: chat$28,
  default: fa,
  greetings: greetings$29,
  waiting: waiting$29
}, Symbol.toStringTag, { value: "Module" }));
const chat$27 = {
  input: {
    placeholder: "Winndu mesaas maa...",
    listening: "Heɗtaade..."
  },
  enableSound: "Softin Sonngo",
  stt: {
    transcribing: "Binndol: ",
    micActive: "Mikro ina golloo...",
    heardError: "Yaafo mi, mi waawaa nande ma. Tiiɗno enndu kadi.",
    micAccessError: "Waawaa heɓde mikroo. Ƴeewto jamirooje."
  },
  speed: {
    idle: "Idle:",
    talk: "Haala:"
  }
};
const avatar$27 = {
  loading: "Lowde nate...",
  title: {
    maximize: "Maksima",
    minimize: "Ustu",
    close: "Uddit",
    clickToMaximize: "Ɓoɗɗu ngam ɓeydude",
    clickToMinimize: "Ɓoɗɗu ngam ustude"
  },
  error: {
    loadFailed: "Waawaa loowde avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer oo jolnaaka",
    passwordRequired: "Konngol kuutorteengol ngam fiilde .ania sifirnde",
    noSource: "Alaa iwdi avatar rokkaa (Url avatar walla Data avatar)"
  }
};
const greetings$28 = {
  "0": "Hi! Hol no mbaawirmi wallude ma hannde?",
  "1": "Sanu! Jabbama! Hol ko mbaawmi wacfde ma?",
  "2": "Mi hofni! So weltaare haaldude e maa!",
  "3": "Sanu! Miɗo ɗoo ngam wallude. Hol ko njiɗɗaa?",
  "4": "Sanu! Noy? Hol no mbaawirmi wonde nafoore?"
};
const waiting$28 = {
  "0": "Mi miijo...",
  "1": "Wakkati gooto...",
  "2": "Gollirde...",
  "3": "Sekonnde tan...",
  "4": "Miɗo ƴeewtoo ɗum ngam maa..."
};
const ff = {
  chat: chat$27,
  avatar: avatar$27,
  greetings: greetings$28,
  waiting: waiting$28
};
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$27,
  chat: chat$27,
  default: ff,
  greetings: greetings$28,
  waiting: waiting$28
}, Symbol.toStringTag, { value: "Module" }));
const chat$26 = {
  input: {
    placeholder: "Kirjoita viestisi...",
    listening: "Kuuntelee..."
  },
  enableSound: "Ota ääni käyttöön",
  stt: {
    transcribing: "Transkriptio: ",
    micActive: "Mikrofoni aktiivinen...",
    heardError: "Anteeksi, en kuullut sinua. Yritä uudelleen.",
    micAccessError: "Mikrofonia ei voi käyttää. Tarkista käyttöoikeudet."
  },
  speed: {
    idle: "Tyhjäkäynti:",
    talk: "Puhu:"
  }
};
const avatar$26 = {
  loading: "Ladataan avataria...",
  title: {
    maximize: "Maksimoi",
    minimize: "Minimoi",
    close: "Sulje",
    clickToMaximize: "Klikkaa suurentaaksesi",
    clickToMinimize: "Napsauta pienentääksesi"
  },
  error: {
    loadFailed: "Avatarin lataaminen epäonnistui: {{error}} ",
    playerNotLoaded: "AniaPlayeria ei ladattu",
    passwordRequired: "Salattua .ania-tiedostoa varten vaaditaan salasana",
    noSource: "Avatar-lähdettä ei ole annettu (avatarUrl tai avatarData)"
  }
};
const greetings$27 = {
  "0": "Hei! Kuinka voin auttaa sinua tänään?",
  "1": "Hei! Tervetuloa! Voinko auttaa?",
  "2": "Hei! Niin ilo puhua kanssasi!",
  "3": "Hei! Olen täällä auttamassa. Mitä sinä tarvitset?",
  "4": "Hei! Miten voit? Kuinka voin olla hyödyllinen?"
};
const waiting$27 = {
  "0": "Anna minun ajatella...",
  "1": "Yksi hetki...",
  "2": "Käsitellään...",
  "3": "Hetki...",
  "4": "Tarkistan sen puolestasi..."
};
const fi = {
  chat: chat$26,
  avatar: avatar$26,
  greetings: greetings$27,
  waiting: waiting$27
};
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$26,
  chat: chat$26,
  default: fi,
  greetings: greetings$27,
  waiting: waiting$27
}, Symbol.toStringTag, { value: "Module" }));
const chat$25 = {
  input: {
    placeholder: "I-type ang iyong mensahe...",
    listening: "Nakikinig..."
  },
  enableSound: "Paganahin ang Tunog",
  stt: {
    transcribing: "Pagsasalin: ",
    micActive: "Aktibo ang mikropono...",
    heardError: "Paumanhin, hindi kita marinig. Pakisubukang muli.",
    micAccessError: "Hindi ma-access ang mikropono. Suriin ang mga pahintulot."
  },
  speed: {
    idle: "Idle:",
    talk: "Talk:"
  }
};
const avatar$25 = {
  loading: "Nilo-load ang avatar...",
  title: {
    maximize: "I-maximize",
    minimize: "I-minimize",
    close: "Isara",
    clickToMaximize: "I-click upang i-maximize",
    clickToMinimize: "I-click para i-minimize"
  },
  error: {
    loadFailed: "Nabigong i-load ang avatar: {{error}} ",
    playerNotLoaded: "Hindi na-load ang AniaPlayer",
    passwordRequired: "Kinakailangan ang password para sa naka-encrypt na .ania file",
    noSource: "Walang ibinigay na mapagkukunan ng avatar (avatarUrl o avatarData)"
  }
};
const greetings$26 = {
  "0": "Hi! Paano kita matutulungan ngayon?",
  "1": "Hello! Maligayang pagdating! Ano ang maaari kong gawin para sa iyo?",
  "2": "Kumusta! Kaya natutuwa akong kausapin ka!",
  "3": "Hello! Nandito ako para tumulong. Ano ang kailangan mo?",
  "4": "Hi! kamusta ka na? Paano ako magiging kapaki-pakinabang?"
};
const waiting$26 = {
  "0": "Hayaan mong isipin ko...",
  "1": "Isang sandali...",
  "2": "Pinoproseso...",
  "3": "Sandali lang...",
  "4": "Sinusuri ko iyon para sa iyo..."
};
const fil = {
  chat: chat$25,
  avatar: avatar$25,
  greetings: greetings$26,
  waiting: waiting$26
};
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$25,
  chat: chat$25,
  default: fil,
  greetings: greetings$26,
  waiting: waiting$26
}, Symbol.toStringTag, { value: "Module" }));
const chat$24 = {
  input: {
    placeholder: "Taipataka na nomu itukutuku...",
    listening: "Vakarorogo..."
  },
  enableSound: "Vakatara na rorogo",
  stt: {
    transcribing: "Vakadewataki: ",
    micActive: "Sa bula tiko na maikrofoni...",
    heardError: "Veivosoti, sega ni rawa ni rogoci iko. Kerekere mo tovolea tale.",
    micAccessError: "E sega ni rawa ni curu ki na maikrofoni. Raica na veivakadonui."
  },
  speed: {
    idle: "Sega ni cakacaka:",
    talk: "Veivosaki:"
  }
};
const avatar$24 = {
  loading: "Vakavodoki tiko na ivakatakarakara...",
  title: {
    maximize: "Vakalevutaka",
    minimize: "Vakalailaitaka",
    close: "Voleka",
    clickToMaximize: "Kiliki me vakalevutaki",
    clickToMinimize: "Kiliki me vakalailaitaka"
  },
  error: {
    loadFailed: "Sega ni rawa ni vakavodoki na iyaloyalo: {{error}} ",
    playerNotLoaded: "Aniaplayer sega ni vakavodoki",
    passwordRequired: "Na vosanicuru e gadrevi me baleta na faile ni .ania vakacurumi",
    noSource: "E sega ni dua na ivurevure ni avatar vakarautaki (avatarUrl se avatarData)"
  }
};
const greetings$25 = {
  "0": "Bula vinaka! Au na vukei iko vakacava nikua?",
  "1": "Bula! Kidavaki! Na cava au rawa ni cakava vei iko?",
  "2": "Bula vinaka! Sa marau vakalevu meu veitalanoa kei iko!",
  "3": "Bula! Au sa tiko eke meu veivuke. Na cava o gadreva?",
  "4": "Bula vinaka! O vakacava tiko? Au na yaga vakacava?"
};
const waiting$25 = {
  "0": "Meu vakasamataka mada...",
  "1": "Dua na gauna...",
  "2": "Vakarautaki...",
  "3": "Dua ga na sekodi...",
  "4": "Au sa dikeva tiko vei iko..."
};
const fj = {
  chat: chat$24,
  avatar: avatar$24,
  greetings: greetings$25,
  waiting: waiting$25
};
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$24,
  chat: chat$24,
  default: fj,
  greetings: greetings$25,
  waiting: waiting$25
}, Symbol.toStringTag, { value: "Module" }));
const chat$23 = {
  input: {
    placeholder: "Tapez votre message...",
    listening: "À l'écoute..."
  },
  enableSound: "Activer le son",
  stt: {
    transcribing: "Transcription : ",
    micActive: "Micro actif....",
    heardError: "Désolé, je ne t'ai pas entendu. Veuillez réessayer.",
    micAccessError: "Impossible d'accéder au microphone. Vérifiez les autorisations."
  },
  speed: {
    idle: "Inactif :",
    talk: "Parler :"
  }
};
const avatar$23 = {
  loading: "Chargement de l'avatar...",
  title: {
    maximize: "Maximiser",
    minimize: "Réduire",
    close: "Fermer",
    clickToMaximize: "Cliquez pour agrandir",
    clickToMinimize: "Cliquez pour minimiser"
  },
  error: {
    loadFailed: "Échec du chargement de l'avatar : {{error}} ",
    playerNotLoaded: "AniaPlayer n'est pas chargé",
    passwordRequired: "Mot de passe requis pour le fichier .ania crypté",
    noSource: "Aucune source d'avatar fournie (avatarUrl ou avatarData)"
  }
};
const greetings$24 = {
  "0": "Salut ! Comment puis-je vous aider aujourd'hui ?",
  "1": "Salut! Accueillir! Que puis-je faire pour vous ?",
  "2": "Salut! Je suis tellement content de te parler !",
  "3": "Salut! Je suis là pour vous aider. De quoi avez-vous besoin?",
  "4": "Salut! Comment ça va? Comment puis-je être utile ?"
};
const waiting$24 = {
  "0": "Laisse-moi réfléchir...",
  "1": "Un instant...",
  "2": "Traitement...",
  "3": "Juste une seconde...",
  "4": "Je vérifie ça pour toi..."
};
const frCA = {
  chat: chat$23,
  avatar: avatar$23,
  greetings: greetings$24,
  waiting: waiting$24
};
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$23,
  chat: chat$23,
  default: frCA,
  greetings: greetings$24,
  waiting: waiting$24
}, Symbol.toStringTag, { value: "Module" }));
const chat$22 = {
  input: {
    placeholder: "Tapez votre message...",
    listening: "A l'écoute..."
  },
  enableSound: "Activer le son",
  stt: {
    transcribing: "Transcription : ",
    micActive: "Micro actif....",
    heardError: "Désolé, je ne t'ai pas entendu. Veuillez réessayer.",
    micAccessError: "Impossible d'accéder au microphone. Vérifiez les autorisations."
  },
  speed: {
    idle: "Inactif :",
    talk: "Parler :"
  }
};
const avatar$22 = {
  loading: "Chargement de l'avatar...",
  title: {
    maximize: "Maximiser",
    minimize: "Réduire",
    close: "Fermer",
    clickToMaximize: "Cliquez pour agrandir",
    clickToMinimize: "Cliquez pour minimiser"
  },
  error: {
    loadFailed: "Échec du chargement de l'avatar : {{error}} ",
    playerNotLoaded: "AniaPlayer n'est pas chargé",
    passwordRequired: "Mot de passe requis pour le fichier .ania crypté",
    noSource: "Aucune source d'avatar fournie (avatarUrl ou avatarData)"
  }
};
const greetings$23 = {
  "0": "Salut ! Comment puis-je vous aider aujourd'hui ?",
  "1": "Bonjour! Accueillir! Que puis-je faire pour vous ?",
  "2": "Salut! Je suis tellement content de te parler !",
  "3": "Bonjour! Je suis là pour vous aider. De quoi avez-vous besoin?",
  "4": "Salut! Comment vas-tu? Comment puis-je être utile ?"
};
const waiting$23 = {
  "0": "Laisse-moi réfléchir...",
  "1": "Un instant...",
  "2": "Traitement...",
  "3": "Juste une seconde...",
  "4": "Je vérifie ça pour toi..."
};
const frFR = {
  chat: chat$22,
  avatar: avatar$22,
  greetings: greetings$23,
  waiting: waiting$23
};
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$22,
  chat: chat$22,
  default: frFR,
  greetings: greetings$23,
  waiting: waiting$23
}, Symbol.toStringTag, { value: "Module" }));
const chat$21 = {
  input: {
    placeholder: "Typ jo berjocht...",
    listening: "Harkje..."
  },
  enableSound: "Lûd ynskeakelje",
  stt: {
    transcribing: "Transkripsje: ",
    micActive: "Mikrofoan aktyf...",
    heardError: "Sorry, koe dy net hearre. Besykje it nochris.",
    micAccessError: "Gjin tagong ta mikrofoan. Kontrolearje tagongsrjochten."
  },
  speed: {
    idle: "Idle:",
    talk: "Oerlis:"
  }
};
const avatar$21 = {
  loading: "Avatar laden...",
  title: {
    maximize: "Maksimalisearje",
    minimize: "Minimalisearje",
    close: "Slút",
    clickToMaximize: "Klikje om te maksimalisearjen",
    clickToMinimize: "Klikje om te minimalisearjen"
  },
  error: {
    loadFailed: "It laden fan avatar mislearre: {{error}} ",
    playerNotLoaded: "AniaPlayer net laden",
    passwordRequired: "Wachtwurd nedich foar fersifere .ania-bestân",
    noSource: "Gjin avatarboarne levere (avatarUrl of avatarData)"
  }
};
const greetings$22 = {
  "0": "Hi! Hoe kin ik jo hjoed helpe?",
  "1": "Hallo! Wolkom! Wat kin ik foar dy dwaan?",
  "2": "Hoi! Sa bliid mei dy te praten!",
  "3": "Hallo! Ik bin hjir om te helpen. Wat hawwe jo nedich?",
  "4": "Hoi! Hoe giet it mei dy? Hoe kin ik nuttich wêze?"
};
const waiting$22 = {
  "0": "Lit my tinke...",
  "1": "Ien momint...",
  "2": "It ferwurkjen...",
  "3": "Noch in sekonde ...",
  "4": "Ik kontrolearje dat foar jo ..."
};
const fy = {
  chat: chat$21,
  avatar: avatar$21,
  greetings: greetings$22,
  waiting: waiting$22
};
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$21,
  chat: chat$21,
  default: fy,
  greetings: greetings$22,
  waiting: waiting$22
}, Symbol.toStringTag, { value: "Module" }));
const chat$20 = {
  input: {
    placeholder: "Clóscríobh do theachtaireacht...",
    listening: "Ag éisteacht..."
  },
  enableSound: "Cumasaigh Fuaim",
  stt: {
    transcribing: "Ag tras-scríobh: ",
    micActive: "Micreafón gníomhach...",
    heardError: "Tá brón orm, níorbh fhéidir thú a chloisteáil. Bain triail eile as.",
    micAccessError: "Ní féidir rochtain a fháil ar an micreafón. Seiceáil ceadanna."
  },
  speed: {
    idle: "Díomhaoin:",
    talk: "Labhair:"
  }
};
const avatar$20 = {
  loading: "Avatar á lódáil...",
  title: {
    maximize: "Uasmhéadaigh",
    minimize: "Íoslaghdaigh",
    close: "Dún",
    clickToMaximize: "Cliceáil chun uasmhéadú",
    clickToMinimize: "Cliceáil chun a íoslaghdú"
  },
  error: {
    loadFailed: "Theip ar an avatar a lódáil: {{error}} ",
    playerNotLoaded: "AniaPlayer gan luchtú",
    passwordRequired: "Pasfhocal ag teastáil le haghaidh comhad .ania criptithe",
    noSource: "Níor soláthraíodh aon fhoinse avatar (avatarUrl nó avatarData)"
  }
};
const greetings$21 = {
  "0": "Dia duit! Conas is féidir liom cabhrú leat inniu?",
  "1": "Dia duit! Fáilte romhat! Cad is féidir liom a dhéanamh duit?",
  "2": "Dia duit ann! Chomh sásta labhairt leat!",
  "3": "Dia duit! Tá mé anseo chun cabhrú leat. Cad atá uait?",
  "4": "Dia duit! Conas atá tú? Conas is féidir liom a bheith úsáideach?"
};
const waiting$21 = {
  "0": "Lig dom smaoineamh...",
  "1": "Nóiméad amháin...",
  "2": "Próiseáil...",
  "3": "Níl ach soicind...",
  "4": "Tá mé ag seiceáil sin duit ..."
};
const ga = {
  chat: chat$20,
  avatar: avatar$20,
  greetings: greetings$21,
  waiting: waiting$21
};
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$20,
  chat: chat$20,
  default: ga,
  greetings: greetings$21,
  waiting: waiting$21
}, Symbol.toStringTag, { value: "Module" }));
const chat$1$ = {
  input: {
    placeholder: "Taipa oshɛɛ sane...",
    listening: "Toiboo..."
  },
  enableSound: "Ha Gbee lɛ atsu nii",
  stt: {
    transcribing: "Niŋmaa: ",
    micActive: "Maikrofon miitsu nii...",
    heardError: "Kɛ ke mi, mi nyɛɛɛ manu bo. Ofainɛ kaa ekoŋŋ.",
    micAccessError: "Enyɛɛɛ oya maikrofon nɔ. Kwɛmɔ gbɛŋmɛɛi."
  },
  speed: {
    idle: "Etsuuu nii:",
    talk: "Wiemɔ:"
  }
};
const avatar$1$ = {
  loading: "Amɛwoɔ avatar...",
  title: {
    maximize: "Feemɔ babaoo",
    minimize: "Tsɔɔmɔ shi",
    close: "Gbalamɔ",
    clickToMaximize: "Klikimɔ nɔ koni ona babaoo",
    clickToMinimize: "Klikimɔ nɔ ni okɛba shi"
  },
  error: {
    loadFailed: "Eyeee akɛ ekɛ avatar lɛ baawo mli: {{error}} ",
    playerNotLoaded: "AniaShwɛmɔ lɛ ehiɛɛɛ",
    passwordRequired: "Password he hiaa kɛha .ania faili ni akɛwo mli",
    noSource: "Akɛ avatar jɛɛhe ko haaa (avatarUrl loo avatarData)"
  }
};
const greetings$20 = {
  "0": "Hi! Te mafee tɛŋŋ maye mabua bo ŋmɛnɛ?",
  "1": "Hɛloo! Afeee noko! Mɛni ma nyɛ ma pee ma ha mo?",
  "2": "Agoo! Eŋɔɔ mi naa waa akɛ mikɛ bo baawie!",
  "3": "Hɛloo! Miyɛ biɛ koni maye mabua. Mɛni he hiaa bo?",
  "4": "Amɛɛ! Te oyɔɔ tɛŋŋ? Te mafee tɛŋŋ mafee mɔ ni he yɔɔ sɛɛnamɔ?"
};
const waiting$20 = {
  "0": "Ha masusu he...",
  "1": "Be kome...",
  "2": "Etsuɔ nii...",
  "3": "Sɛkɛndi kome pɛ...",
  "4": "Miikwɛ nakai miha bo..."
};
const gaa = {
  chat: chat$1$,
  avatar: avatar$1$,
  greetings: greetings$20,
  waiting: waiting$20
};
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1$,
  chat: chat$1$,
  default: gaa,
  greetings: greetings$20,
  waiting: waiting$20
}, Symbol.toStringTag, { value: "Module" }));
const chat$1_ = {
  input: {
    placeholder: "Sgrìobh do theachdaireachd...",
    listening: "Ag èisteachd..."
  },
  enableSound: "Dèan comas air Fuaim",
  stt: {
    transcribing: "Ag ath-sgrìobhadh: ",
    micActive: "Microfòn gnìomhach ...",
    heardError: "Duilich, cha chualas tu. Feuch ris a-rithist.",
    micAccessError: "Chan urrainn dhuinn cothrom fhaighinn air a’ mhicreofon. Thoir sùil air ceadan."
  },
  speed: {
    idle: "Dìomhair:",
    talk: "Bruidhinn:"
  }
};
const avatar$1_ = {
  loading: "A luchdachadh a-nuas bho avatar.. .",
  title: {
    maximize: "Meudaich",
    minimize: "Lùghdaich",
    close: "Dùin",
    clickToMaximize: "Cliog gus a mheudachadh",
    clickToMinimize: "Cliog gus a lughdachadh"
  },
  error: {
    loadFailed: "Cha b’ urrainn dhuinn an avatar a luchdachadh: {{error}} ",
    playerNotLoaded: "Aniaplayer cha deach a luchdadh",
    passwordRequired: "Facal-faire a dhìth airson faidhle .ania crioptaichte",
    noSource: "Chan eil stòr avatar air a thoirt seachad (avatarUrl no avatarData)"
  }
};
const greetings$1$ = {
  "0": "Hi! Ciamar as urrainn dhomh do chuideachadh an-diugh?",
  "1": "Halò! Fàilte! Dè as urrainn dhomh a dhèanamh dhut?",
  "2": "Haigh! Cho toilichte bruidhinn riut!",
  "3": "Halò! Tha mi an seo airson cuideachadh. Dè tha a dhìth ort?",
  "4": "Hi! Ciamar a tha thu? Ciamar as urrainn dhomh a bhith feumail?"
};
const waiting$1$ = {
  "0": "Leig leam smaoineachadh ...",
  "1": "Aon mhionaid...",
  "2": "A' giullachd...",
  "3": "Dìreach diog...",
  "4": "Tha mi a’ dèanamh sgrùdadh air sin dhut..."
};
const gd = {
  chat: chat$1_,
  avatar: avatar$1_,
  greetings: greetings$1$,
  waiting: waiting$1$
};
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1_,
  chat: chat$1_,
  default: gd,
  greetings: greetings$1$,
  waiting: waiting$1$
}, Symbol.toStringTag, { value: "Module" }));
const chat$1Z = {
  input: {
    placeholder: "Escribe a túa mensaxe...",
    listening: "Escoitando..."
  },
  enableSound: "Activa o son",
  stt: {
    transcribing: "Transcrición: ",
    micActive: "Micrófono activo...",
    heardError: "Sentímolo, non puiden escoitarte. Téntao de novo.",
    micAccessError: "Non se pode acceder ao micrófono. Comproba os permisos."
  },
  speed: {
    idle: "Inactivo:",
    talk: "Conversa:"
  }
};
const avatar$1Z = {
  loading: "Cargando avatar...",
  title: {
    maximize: "Maximizar",
    minimize: "Minimizar",
    close: "Pechar",
    clickToMaximize: "Fai clic para maximizar",
    clickToMinimize: "Fai clic para minimizar"
  },
  error: {
    loadFailed: "Produciuse un erro ao cargar o avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer non cargado",
    passwordRequired: "O contrasinal é necesario para o ficheiro .ania cifrado",
    noSource: "Non se proporcionou ningunha fonte de avatar (avatarUrl ou avatarData)"
  }
};
const greetings$1_ = {
  "0": "Ola! Como podo axudarche hoxe?",
  "1": "Ola! Benvido! Que podo facer por ti?",
  "2": "Ola! Moi feliz de falar contigo!",
  "3": "Ola! Estou aquí para axudar. Que necesitas?",
  "4": "Ola! Como estás? Como podo ser útil?"
};
const waiting$1_ = {
  "0": "Déixame pensar...",
  "1": "Un momento...",
  "2": "Procesando...",
  "3": "Só un segundo...",
  "4": "Estou comprobando por ti..."
};
const gl = {
  chat: chat$1Z,
  avatar: avatar$1Z,
  greetings: greetings$1_,
  waiting: waiting$1_
};
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1Z,
  chat: chat$1Z,
  default: gl,
  greetings: greetings$1_,
  waiting: waiting$1_
}, Symbol.toStringTag, { value: "Module" }));
const chat$1Y = {
  input: {
    placeholder: "Ehai ne marandu...",
    listening: "Ohendúvo..."
  },
  enableSound: "Emboguata Sonido rehegua",
  stt: {
    transcribing: "Ojetranscripción: 1.1. ",
    micActive: "Micrófono activo...",
    heardError: "Perdón, ndaikatúikuri rohendu. Eñeha’ã jey.",
    micAccessError: "Ndaikatúi ojeike micrófono-pe. Ehecháke umi permiso."
  },
  speed: {
    idle: "Ocioso: 1.1.",
    talk: "Ñe’ẽasa:"
  }
};
const avatar$1Y = {
  loading: "Ojekarga hína avatar...",
  title: {
    maximize: "Oñemomba’eguasuvévo",
    minimize: "Oñemboguejy michĩmi",
    close: "Oñemboty",
    clickToMaximize: "Emboguejy embotuichave hag̃ua",
    clickToMinimize: "Emboguejy emboguejy hag̃ua"
  },
  error: {
    loadFailed: "Ndoikói ojekarga haguã avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ndojekargái",
    passwordRequired: "Ñe’ẽñemi oñeikotevẽva .ania vore oñembohekopyrévape g̃uarã",
    noSource: "Ndaipóri avatar ypykue oñeme’ẽva (avatarUrl térã avatarData) ."
  }
};
const greetings$1Z = {
  "0": "Hi! Mbaʼéichapa ikatu roipytyvõ ko árape?",
  "1": "Mba'éichapa! Tapeg̃uahẽporãite! Mbaʼépa ikatu ajapo nderehehápe?",
  "2": "Maitei! ¡Avyʼaiterei añeʼẽ haguére nendive!",
  "3": "Mba'éichapa! Che aime ko'ápe aipytyvõ haguã. Mbaʼépa reikotevẽ?",
  "4": "Mba'éichapa! Mba'éichapa reime? Mbaʼéichapa ikatu chepytyvõ?"
};
const waiting$1Z = {
  "0": "Tapensamína...",
  "1": "Peteĩ momento...",
  "2": "Procesamiento rehegua...",
  "3": "Peteĩ segundonte...",
  "4": "Che ahecha hína upéva ndéve g̃uarã..."
};
const gn = {
  chat: chat$1Y,
  avatar: avatar$1Y,
  greetings: greetings$1Z,
  waiting: waiting$1Z
};
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1Y,
  chat: chat$1Y,
  default: gn,
  greetings: greetings$1Z,
  waiting: waiting$1Z
}, Symbol.toStringTag, { value: "Module" }));
const chat$1X = {
  input: {
    placeholder: "तुमचो संदेश टाइप करचो...",
    listening: "आयकून..."
  },
  enableSound: "आवाज सक्षम करचो",
  stt: {
    transcribing: "प्रतिलिपी करप: १. ",
    micActive: "मायक्रोफोन सक्रिय...",
    heardError: "माफ करात, आयकूंक मेळ्ळें ना. उपकार करून परतून यत्न करात.",
    micAccessError: "मायक्रोफोन ऍक्सॅस करूंक शकना. परवानगी तपासात."
  },
  speed: {
    idle: "निश्क्रीय: 1.1.",
    talk: "उलोवप: १."
  }
};
const avatar$1X = {
  loading: "अवतार लोड करतना...",
  title: {
    maximize: "चडांत चड करप",
    minimize: "उण्यांत उणें करप",
    close: "बंद करचें",
    clickToMaximize: "चडांत चड करपाक क्लिक करात",
    clickToMinimize: "उण्यांत उणें करपाक क्लिक करात"
  },
  error: {
    loadFailed: "अवतार लोड करपाक अपेस: {{error}} ",
    playerNotLoaded: "AniaPlayer लोड जावंक ना",
    passwordRequired: "एनक्रिप्टेड .ania फायलीक पासवर्ड जाय",
    noSource: "अवतार स्त्रोत दिवंक ना (avatarUrl वा avatarData)"
  }
};
const greetings$1Y = {
  "0": "हाय! आयज हांव तुका कशी मजत करूं?",
  "1": "हॅलो! येवकार! तुजे खातीर हांव कितें करूं?",
  "2": "हे नमस्कार! तुमचे कडेन उलोवपाक इतली खोस!",
  "3": "हॅलो! हांव हांगा मजत करपाक आयलां. तुमकां कितें जाय?",
  "4": "हाय! तूं कसो आसा? हांव कसो उपेगी पडूं येता?"
};
const waiting$1Y = {
  "0": "म्हाका विचार करूं...",
  "1": "एक खीण...",
  "2": "प्रक्रिया करप...",
  "3": "फकत एक सेकंद...",
  "4": "हांव तुमकां तें तपासतां..."
};
const gom = {
  chat: chat$1X,
  avatar: avatar$1X,
  greetings: greetings$1Y,
  waiting: waiting$1Y
};
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1X,
  chat: chat$1X,
  default: gom,
  greetings: greetings$1Y,
  waiting: waiting$1Y
}, Symbol.toStringTag, { value: "Module" }));
const chat$1W = {
  input: {
    placeholder: "તમારો સંદેશ લખો...",
    listening: "સાંભળી રહ્યું છે..."
  },
  enableSound: "સાઉન્ડ સક્ષમ કરો",
  stt: {
    transcribing: "ટ્રાન્સક્રિબિંગ: ",
    micActive: "માઇક્રોફોન સક્રિય...",
    heardError: "માફ કરશો, તમને સાંભળી શક્યા નથી. કૃપા કરીને ફરી પ્રયાસ કરો.",
    micAccessError: "માઇક્રોફોનને ઍક્સેસ કરવામાં અસમર્થ. પરવાનગીઓ તપાસો."
  },
  speed: {
    idle: "નિષ્ક્રિય:",
    talk: "વાત:"
  }
};
const avatar$1W = {
  loading: "અવતાર લોડ કરી રહ્યું છે...",
  title: {
    maximize: "મહત્તમ કરો",
    minimize: "નાનું કરો",
    close: "બંધ કરો",
    clickToMaximize: "મહત્તમ કરવા માટે ક્લિક કરો",
    clickToMinimize: "ઘટાડવા માટે ક્લિક કરો"
  },
  error: {
    loadFailed: "અવતાર લોડ કરવામાં નિષ્ફળ: {{error}} ",
    playerNotLoaded: "AniaPlayer લોડ થયેલ નથી",
    passwordRequired: "એનક્રિપ્ટેડ .ania ફાઇલ માટે પાસવર્ડ જરૂરી છે",
    noSource: "કોઈ અવતાર સ્ત્રોત પ્રદાન કરેલ નથી (avatarUrl અથવા avatarData)"
  }
};
const greetings$1X = {
  "0": "હાય! આજે હું તમને કેવી રીતે મદદ કરી શકું?",
  "1": "હેલો! સ્વાગત છે! હું તમારા માટે શું કરી શકું?",
  "2": "હાય ત્યાં! તમારી સાથે વાત કરીને ખૂબ આનંદ થયો!",
  "3": "હેલો! હું મદદ કરવા માટે અહીં છું. તમારે શું જોઈએ છે?",
  "4": "હાય! તમે કેમ છો? હું કેવી રીતે ઉપયોગી થઈ શકું?"
};
const waiting$1X = {
  "0": "મને વિચારવા દો...",
  "1": "એક ક્ષણ...",
  "2": "પ્રક્રિયા કરી રહ્યું છે...",
  "3": "માત્ર એક સેકન્ડ...",
  "4": "હું તમારા માટે તે તપાસી રહ્યો છું..."
};
const gu = {
  chat: chat$1W,
  avatar: avatar$1W,
  greetings: greetings$1X,
  waiting: waiting$1X
};
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1W,
  chat: chat$1W,
  default: gu,
  greetings: greetings$1X,
  waiting: waiting$1X
}, Symbol.toStringTag, { value: "Module" }));
const chat$1V = {
  input: {
    placeholder: "Buga sakon ku...",
    listening: "Ana saurare..."
  },
  enableSound: "Kunna Sauti",
  stt: {
    transcribing: "Rubutu: ",
    micActive: "Makirufo yana aiki...",
    heardError: "Yi haƙuri, ban ji ku ba. Da fatan za a sake gwadawa.",
    micAccessError: "An kasa samun damar makirufo. Duba izini."
  },
  speed: {
    idle: "Rago:",
    talk: "Magana:"
  }
};
const avatar$1V = {
  loading: "Ana loda avatar...",
  title: {
    maximize: "Girma",
    minimize: "Rage girman",
    close: "Kusa",
    clickToMaximize: "Danna don ƙara girma",
    clickToMinimize: "Danna don rage girman"
  },
  error: {
    loadFailed: "An kasa loda avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ba a loda shi ba",
    passwordRequired: "Ana buƙatar kalmar sirri don fayil ɗin .ania rufaffen",
    noSource: "Babu tushen avatar da aka bayar (avatarUrl ko avatarData)"
  }
};
const greetings$1W = {
  "0": "Sannu! Ta yaya zan iya taimaka muku a yau?",
  "1": "Sannu! Barka da zuwa! Me zan iya yi maka?",
  "2": "Sannu dai! Don haka ina farin cikin magana da ku!",
  "3": "Sannu! Ina nan don taimakawa. Me kuke bukata?",
  "4": "Sannu! Yaya lafiya? Ta yaya zan iya zama da amfani?"
};
const waiting$1W = {
  "0": "Bari in yi tunani...",
  "1": "Lokaci guda...",
  "2": "Ana aiwatarwa...",
  "3": "Dakika daya kawai...",
  "4": "Ina duba muku hakan..."
};
const ha = {
  chat: chat$1V,
  avatar: avatar$1V,
  greetings: greetings$1W,
  waiting: waiting$1W
};
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1V,
  chat: chat$1V,
  default: ha,
  greetings: greetings$1W,
  waiting: waiting$1W
}, Symbol.toStringTag, { value: "Module" }));
const chat$1U = {
  input: {
    placeholder: "Kākau i kāu memo...",
    listening: "Ke hoʻolohe nei..."
  },
  enableSound: "E ho'ā i ke kani",
  stt: {
    transcribing: "Ke unuhi nei: ",
    micActive: "Microphone hoʻoikaika...",
    heardError: "E kala mai, ʻaʻole hiki ke lohe iā ʻoe. E ʻoluʻolu e hoʻāʻo hou.",
    micAccessError: "ʻAʻole hiki ke komo i ka microphone. E nānā i nā ʻae."
  },
  speed: {
    idle: "hana ʻole:",
    talk: "Kūkākūkā:"
  }
};
const avatar$1U = {
  loading: "Ke hoʻouka nei i ka avatar...",
  title: {
    maximize: "Hoʻonui",
    minimize: "Hoemi",
    close: "Pani",
    clickToMaximize: "Kaomi e hoʻonui",
    clickToMinimize: "Kaomi e hōʻemi"
  },
  error: {
    loadFailed: "ʻAʻole hiki ke hoʻouka i ka avatar: {{error}} ",
    playerNotLoaded: "ʻAʻole i hoʻouka ʻia ʻo AniaPlayer",
    passwordRequired: "Pono ka ʻōlelo huna no ka faila .ania i hoʻopili ʻia",
    noSource: "ʻAʻohe kumu avatar i hāʻawi ʻia (avatarUrl a i ʻole avatarData)"
  }
};
const greetings$1V = {
  "0": "Aloha! Pehea e hiki ai iaʻu ke kōkua iā ʻoe i kēia lā?",
  "1": "Aloha! Welina! He aha kaʻu e hana ai iā ʻoe?",
  "2": "Aloha! Hauʻoli e kamaʻilio pū me ʻoe!",
  "3": "Aloha! Aia wau e kōkua. He aha kāu mea e pono ai?",
  "4": "Hui! Pehea ʻoe? Pehea wau e pono ai?"
};
const waiting$1V = {
  "0": "E noʻonoʻo wau ...",
  "1": "Hoʻokahi manawa...",
  "2": "Ke hana nei...",
  "3": "Kekona wale nō...",
  "4": "Ke nānā nei au iā ʻoe..."
};
const haw = {
  chat: chat$1U,
  avatar: avatar$1U,
  greetings: greetings$1V,
  waiting: waiting$1V
};
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1U,
  chat: chat$1U,
  default: haw,
  greetings: greetings$1V,
  waiting: waiting$1V
}, Symbol.toStringTag, { value: "Module" }));
const chat$1T = {
  input: {
    placeholder: "הקלד את הודעתך...",
    listening: "מקשיב..."
  },
  enableSound: "אפשר סאונד",
  stt: {
    transcribing: "מתמלל: ",
    micActive: "מיקרופון פעיל...",
    heardError: "מצטער, לא יכולתי לשמוע אותך. אנא נסה שוב.",
    micAccessError: "לא ניתן לגשת למיקרופון. בדוק הרשאות."
  },
  speed: {
    idle: "סרק:",
    talk: "שיחה:"
  }
};
const avatar$1T = {
  loading: "טוען דמות...",
  title: {
    maximize: "למקסם",
    minimize: "הקטינו",
    close: "סגור",
    clickToMaximize: "לחץ כדי למקסם",
    clickToMinimize: "לחץ כדי למזער"
  },
  error: {
    loadFailed: "טעינת הדמות נכשלה: {{error}} ",
    playerNotLoaded: "AniaPlayer לא נטען",
    passwordRequired: "נדרשת סיסמה לקובץ ania מוצפן",
    noSource: "לא סופק מקור דמות (avatarUrl או avatarData)"
  }
};
const greetings$1U = {
  "0": "היי! איך אני יכול לעזור לך היום?",
  "1": "שלום! קַבָּלַת פָּנִים! מה אני יכול לעשות בשבילך?",
  "2": "שלום לך! כל כך שמח לדבר איתך!",
  "3": "שלום! אני כאן כדי לעזור. מה אתה צריך?",
  "4": "היי! מה שלומך? איך אני יכול להיות שימושי?"
};
const waiting$1U = {
  "0": "תן לי לחשוב...",
  "1": "רגע אחד...",
  "2": "מעבד...",
  "3": "רק שנייה...",
  "4": "אני בודק את זה בשבילך..."
};
const he = {
  chat: chat$1T,
  avatar: avatar$1T,
  greetings: greetings$1U,
  waiting: waiting$1U
};
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1T,
  chat: chat$1T,
  default: he,
  greetings: greetings$1U,
  waiting: waiting$1U
}, Symbol.toStringTag, { value: "Module" }));
const chat$1S = {
  input: {
    placeholder: "अपना संदेश टाइप करें...",
    listening: "सुन रहा हूँ..."
  },
  enableSound: "ध्वनि सक्षम करें",
  stt: {
    transcribing: "प्रतिलेखन: ",
    micActive: "माइक्रोफ़ोन सक्रिय...",
    heardError: "क्षमा करें, आपकी बात सुन नहीं सका। कृपया पुन: प्रयास करें।",
    micAccessError: "माइक्रोफ़ोन तक पहुंचने में असमर्थ. अनुमतियाँ जांचें."
  },
  speed: {
    idle: "निष्क्रिय:",
    talk: "बात करें:"
  }
};
const avatar$1S = {
  loading: "अवतार लोड हो रहा है...",
  title: {
    maximize: "अधिकतम करें",
    minimize: "न्यूनतम करें",
    close: "बंद करें",
    clickToMaximize: "अधिकतम करने के लिए क्लिक करें",
    clickToMinimize: "छोटा करने के लिए क्लिक करें"
  },
  error: {
    loadFailed: "अवतार लोड करने में विफल: {{error}} ",
    playerNotLoaded: "AniaPlayer लोड नहीं हुआ",
    passwordRequired: "एन्क्रिप्टेड .ania फ़ाइल के लिए पासवर्ड आवश्यक है",
    noSource: "कोई अवतार स्रोत प्रदान नहीं किया गया (अवतारयूआरएल या अवतारडेटा)"
  }
};
const greetings$1T = {
  "0": "नमस्ते! आज मैं आपकी मदद करने में कैसे सक्षम हूं?",
  "1": "नमस्ते! स्वागत! मैं तुम्हारे लिए क्या कर सकता हूँ?",
  "2": "नमस्ते! आपसे बात करके बहुत ख़ुशी हुई!",
  "3": "नमस्ते! मैं मदद के लिए यहां हूं. आपको किस चीज़ की जरूरत है?",
  "4": "नमस्ते! आप कैसे हैं? मैं कैसे उपयोगी हो सकता हूँ?"
};
const waiting$1T = {
  "0": "मुझे सोचने दो...",
  "1": "एक पल...",
  "2": "प्रसंस्करण...",
  "3": "बस एक सेकंड...",
  "4": "मैं आपके लिए इसकी जाँच कर रहा हूँ..."
};
const hi = {
  chat: chat$1S,
  avatar: avatar$1S,
  greetings: greetings$1T,
  waiting: waiting$1T
};
const __vite_glob_0_72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1S,
  chat: chat$1S,
  default: hi,
  greetings: greetings$1T,
  waiting: waiting$1T
}, Symbol.toStringTag, { value: "Module" }));
const chat$1R = {
  input: {
    placeholder: "I-type ang imo mensahe...",
    listening: "Nagapamati..."
  },
  enableSound: "I-enable ang Sound",
  stt: {
    transcribing: "Pag-transcribe: ",
    micActive: "Aktibo ang mikropono...",
    heardError: "Pasensya na, indi ko ikaw mabatian. Palihog tilawi liwat.",
    micAccessError: "Indi maka-access sa mikropono. Tan-awa ang mga pagtugot."
  },
  speed: {
    idle: "Idle:",
    talk: "Pamulongpulong:"
  }
};
const avatar$1R = {
  loading: "Naga-load sang avatar...",
  title: {
    maximize: "Padakuon",
    minimize: "Pagamay",
    close: "Magsira",
    clickToMaximize: "I-klik para ma-maximize",
    clickToMinimize: "I-klik para mabuhinan"
  },
  error: {
    loadFailed: "Napaslawan sa pag-load sang avatar: {{error}} ",
    playerNotLoaded: "Ang AniaPlayer wala ma-load",
    passwordRequired: "Kinahanglan ang password para sa naka-encrypt nga .ania file",
    noSource: "Wala sing ginhatag nga ginhalinan sang avatar (avatarUrl ukon avatarData)"
  }
};
const greetings$1S = {
  "0": "Hi! Paano ko ikaw mabuligan subong nga adlaw?",
  "1": "Kamusta! Gina-abiabi! Ano ang mahimo ko para sa imo?",
  "2": "Kamusta ka! Nalipay gid ako nga makaistorya sa imo!",
  "3": "Kamusta! Ari ako para magbulig. Ano ang kinahanglan mo?",
  "4": "Kamusta! Kamusta ikaw? Paano ako mangin mapuslanon?"
};
const waiting$1S = {
  "0": "Tuguti ako nga maghunahuna...",
  "1": "Isa ka tion...",
  "2": "Nagaproseso...",
  "3": "Isa lang ka segundo...",
  "4": "Ginausisa ko ina para sa imo..."
};
const hil = {
  chat: chat$1R,
  avatar: avatar$1R,
  greetings: greetings$1S,
  waiting: waiting$1S
};
const __vite_glob_0_73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1R,
  chat: chat$1R,
  default: hil,
  greetings: greetings$1S,
  waiting: waiting$1S
}, Symbol.toStringTag, { value: "Module" }));
const chat$1Q = {
  input: {
    placeholder: "Ntaus koj cov lus...",
    listening: "Mloog..."
  },
  enableSound: "Qhib Suab",
  stt: {
    transcribing: "Kev sau ntawv: ",
    micActive: "Lub microphone ua haujlwm ...",
    heardError: "Thov txim, tsis tau hnov koj. Thov rov sim dua.",
    micAccessError: "Tsis tuaj yeem nkag mus rau microphone. Tshawb xyuas kev tso cai."
  },
  speed: {
    idle: "Idle:",
    talk: "Tham:"
  }
};
const avatar$1Q = {
  loading: "Loading avatar...",
  title: {
    maximize: "Maximize",
    minimize: "Tsawg kawg",
    close: "Kaw",
    clickToMaximize: "Nyem rau qhov loj",
    clickToMinimize: "Nyem kom txo qis"
  },
  error: {
    loadFailed: "Ua tsis tiav rau kev thauj khoom avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer tsis loaded",
    passwordRequired: "Password yuav tsum tau encrypted .ania cov ntaub ntawv",
    noSource: "Tsis muaj avatar qhov chaw muab (avatarUrl lossis avatarData)"
  }
};
const greetings$1R = {
  "0": "Nyob zoo! Kuv yuav pab tau koj li cas hnub no?",
  "1": "Nyob zoo! Zoo siab txais tos! Kuv tuaj yeem ua dab tsi rau koj?",
  "2": "Nyob zoo! Zoo siab nrog koj tham!",
  "3": "Nyob zoo! Kuv nyob ntawm no los pab. Koj xav tau dab tsi?",
  "4": "Nyob zoo! Koj nyob li cas? Kuv yuav pab tau li cas?"
};
const waiting$1R = {
  "0": "Cia kuv xav tias...",
  "1": "Ib pliag...",
  "2": "Kev ua...",
  "3": "Tsuas yog ib pliag xwb...",
  "4": "Kuv tab tom tshawb xyuas qhov ntawd rau koj ..."
};
const hmn = {
  chat: chat$1Q,
  avatar: avatar$1Q,
  greetings: greetings$1R,
  waiting: waiting$1R
};
const __vite_glob_0_74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1Q,
  chat: chat$1Q,
  default: hmn,
  greetings: greetings$1R,
  waiting: waiting$1R
}, Symbol.toStringTag, { value: "Module" }));
const chat$1P = {
  input: {
    placeholder: "Upišite svoju poruku...",
    listening: "Slušanje..."
  },
  enableSound: "Omogući zvuk",
  stt: {
    transcribing: "Transkripcija: ",
    micActive: "Mikrofon aktivan...",
    heardError: "Žao mi je, nisam vas čuo. Molimo pokušajte ponovo.",
    micAccessError: "Nije moguće pristupiti mikrofonu. Provjerite dopuštenja."
  },
  speed: {
    idle: "mirovanje:",
    talk: "Razgovor:"
  }
};
const avatar$1P = {
  loading: "Učitavanje avatara...",
  title: {
    maximize: "Maksimiziraj",
    minimize: "Minimiziraj",
    close: "Zatvori",
    clickToMaximize: "Kliknite za povećanje",
    clickToMinimize: "Kliknite za smanjivanje"
  },
  error: {
    loadFailed: "Neuspješno učitavanje avatara: {{error}} ",
    playerNotLoaded: "AniaPlayer nije učitan",
    passwordRequired: "Lozinka je potrebna za šifriranu .ania datoteku",
    noSource: "Nije naveden izvor avatara (avatarUrl ili avatarData)"
  }
};
const greetings$1Q = {
  "0": "Bok! Kako vam mogu pomoći danas?",
  "1": "Zdravo! Dobrodošli! Što mogu učiniti za vas?",
  "2": "Bok! Tako mi je drago razgovarati s tobom!",
  "3": "Zdravo! Ovdje sam da pomognem. što ti treba",
  "4": "Bok! Kako ste? Kako mogu biti koristan?"
};
const waiting$1Q = {
  "0": "pusti me da razmislim...",
  "1": "Trenutak...",
  "2": "Obrada...",
  "3": "Samo trenutak...",
  "4": "Provjeravam to za vas..."
};
const hr = {
  chat: chat$1P,
  avatar: avatar$1P,
  greetings: greetings$1Q,
  waiting: waiting$1Q
};
const __vite_glob_0_75 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1P,
  chat: chat$1P,
  default: hr,
  greetings: greetings$1Q,
  waiting: waiting$1Q
}, Symbol.toStringTag, { value: "Module" }));
const chat$1O = {
  input: {
    placeholder: "Tuu tayn pexeet xraype...",
    listening: "Heere..."
  },
  enableSound: "Klang aktiviire",
  stt: {
    transcribing: "Transkriptsioon: ",
    micActive: "Mikrofoon aktief...",
    heardError: "Sorry, khont tich nët heere. Tuu khanst noch mool proope.",
    micAccessError: "Mikrofoon khan net tsuu khome. Kontroliire ti erlaupnis."
  },
  speed: {
    idle: "Leetich:",
    talk: "Reet:"
  }
};
const avatar$1O = {
  loading: "Avatar am laate...",
  title: {
    maximize: "Maximiiseere",
    minimize: "Minimiiseere",
    close: "Tsum",
    clickToMaximize: "Klik fer se maximiire",
    clickToMinimize: "Klik fer se minimiiseere"
  },
  error: {
    loadFailed: "Tas avatar is net kelaat: {{error}} ",
    playerNotLoaded: "AniaPlayer is nët geladen",
    passwordRequired: "Passwort ferlangt fer ti ferxtëkelte .ania-file",
    noSource: "Keen Avatar-Quelle (AvatarUrl oder AvatarData)"
  }
};
const greetings$1P = {
  "0": "Hallo! Wii khan ich tich hayt hëlfe?",
  "1": "Halo! Wilkhome! Was khan ich fer aych mache?",
  "2": "Oi! Soo froo tas ich mit aych xpreche khan!",
  "3": "Halo! Ich sin hier fer se helfe. Was prauchst tuu?",
  "4": "Oi! Wii keets tich? Wii khan ich nutslich sin?"
};
const waiting$1P = {
  "0": "Los mich tënke...",
  "1": "Een momënt...",
  "2": "Ferarbeitung...",
  "3": "Ploos een sekund...",
  "4": "Ich kontroliire tas fer tich..."
};
const hrx = {
  chat: chat$1O,
  avatar: avatar$1O,
  greetings: greetings$1P,
  waiting: waiting$1P
};
const __vite_glob_0_76 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1O,
  chat: chat$1O,
  default: hrx,
  greetings: greetings$1P,
  waiting: waiting$1P
}, Symbol.toStringTag, { value: "Module" }));
const chat$1N = {
  input: {
    placeholder: "Tape mesaj ou a...",
    listening: "Tande..."
  },
  enableSound: "Pèmèt son",
  stt: {
    transcribing: "Transkripsyon: ",
    micActive: "Mikwofòn aktif...",
    heardError: "Padon, mwen pa t 'kapab tande ou. Tanpri eseye ankò.",
    micAccessError: "Pa kapab jwenn aksè nan mikwofòn. Tcheke otorizasyon yo."
  },
  speed: {
    idle: "San fè anyen konsa:",
    talk: "Pale:"
  }
};
const avatar$1N = {
  loading: "Chaje avatar...",
  title: {
    maximize: "Maksimize",
    minimize: "Minimize",
    close: "Fèmen",
    clickToMaximize: "Klike pou maksimize",
    clickToMinimize: "Klike pou minimize"
  },
  error: {
    loadFailed: "Echwe pou chaje avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer pa chaje",
    passwordRequired: "Modpas obligatwa pou fichye .ania chiffres",
    noSource: "Pa gen sous avatar bay (avatarUrl oswa avatarData)"
  }
};
const greetings$1O = {
  "0": "Alo! Kouman mwen ka ede w jodi a?",
  "1": "Bonjou! Byenvini! Kisa mwen ka fè pou ou?",
  "2": "Bonjou la! Se konsa, mwen kontan pale ak ou!",
  "3": "Bonjou! Mwen la pou ede. Kisa ou bezwen?",
  "4": "Alo! koman ou ye? Kouman mwen ka itil?"
};
const waiting$1O = {
  "0": "Kite m panse...",
  "1": "Yon moman...",
  "2": "Pwosesis...",
  "3": "Jis yon segond...",
  "4": "Mwen tcheke sa pou ou..."
};
const ht = {
  chat: chat$1N,
  avatar: avatar$1N,
  greetings: greetings$1O,
  waiting: waiting$1O
};
const __vite_glob_0_77 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1N,
  chat: chat$1N,
  default: ht,
  greetings: greetings$1O,
  waiting: waiting$1O
}, Symbol.toStringTag, { value: "Module" }));
const chat$1M = {
  input: {
    placeholder: "Írja be üzenetét...",
    listening: "Hallgat..."
  },
  enableSound: "Hang engedélyezése",
  stt: {
    transcribing: "Átírás: ",
    micActive: "Mikrofon aktív...",
    heardError: "Sajnálom, nem hallottam. Kérjük, próbálja újra.",
    micAccessError: "Nem lehet hozzáférni a mikrofonhoz. Ellenőrizze az engedélyeket."
  },
  speed: {
    idle: "Üresjárat:",
    talk: "Beszélgetés:"
  }
};
const avatar$1M = {
  loading: "Avatar betöltése...",
  title: {
    maximize: "Maximalizálás",
    minimize: "Minimalizálja",
    close: "Bezárás",
    clickToMaximize: "Kattintson a maximalizáláshoz",
    clickToMinimize: "Kattintson a kicsinyítéshez"
  },
  error: {
    loadFailed: "Nem sikerült betölteni az avatart: {{error}} ",
    playerNotLoaded: "Az AniaPlayer nincs betöltve",
    passwordRequired: "A titkosított .ania fájlhoz jelszó szükséges",
    noSource: "Nincs megadva avatarforrás (avatarUrl vagy avatarData)"
  }
};
const greetings$1N = {
  "0": "Szia! Hogyan segíthetek ma?",
  "1": "Helló! Üdvözöljük! Mit tehetek érted?",
  "2": "Sziasztok! Nagyon örülök, hogy beszélhetek veled!",
  "3": "Helló! Azért vagyok itt, hogy segítsek. Mi kell neked?",
  "4": "Szia! Hogy vagy? Hogyan lehetek hasznos?"
};
const waiting$1N = {
  "0": "Hadd gondolkozzam...",
  "1": "Egy pillanat...",
  "2": "Feldolgozás...",
  "3": "Csak egy pillanat...",
  "4": "Ezt ellenőrzöm neked..."
};
const hu = {
  chat: chat$1M,
  avatar: avatar$1M,
  greetings: greetings$1N,
  waiting: waiting$1N
};
const __vite_glob_0_78 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1M,
  chat: chat$1M,
  default: hu,
  greetings: greetings$1N,
  waiting: waiting$1N
}, Symbol.toStringTag, { value: "Module" }));
const chat$1L = {
  input: {
    placeholder: "Մուտքագրեք ձեր հաղորդագրությունը...",
    listening: "Լսելով..."
  },
  enableSound: "Միացնել ձայնը",
  stt: {
    transcribing: "Տառադարձում. ",
    micActive: "Խոսափողն ակտիվ է...",
    heardError: "Կներեք, չլսեցի ձեզ: Խնդրում ենք կրկին փորձել:",
    micAccessError: "Հնարավոր չէ մուտք գործել խոսափող: Ստուգեք թույլտվությունները:"
  },
  speed: {
    idle: "Պարապ:",
    talk: "Զրույց:"
  }
};
const avatar$1L = {
  loading: "Ավատարի բեռնում...",
  title: {
    maximize: "Առավելագույնի հասցնել",
    minimize: "Նվազագույնի հասցնել",
    close: "Փակել",
    clickToMaximize: "Սեղմեք՝ առավելագույնի հասցնելու համար",
    clickToMinimize: "Սեղմեք՝ նվազագույնի հասցնելու համար"
  },
  error: {
    loadFailed: "Չհաջողվեց բեռնել ավատարը՝ {{error}} ",
    playerNotLoaded: "AniaPlayer-ը բեռնված չէ",
    passwordRequired: "Կոդավորված .ania ֆայլի համար անհրաժեշտ է գաղտնաբառ",
    noSource: "Ավատարի աղբյուր չի տրամադրվել (avatarUrl կամ avatarData)"
  }
};
const greetings$1M = {
  "0": "Ողջույն Ինչպե՞ս կարող եմ օգնել ձեզ այսօր:",
  "1": "Ողջույն Բարի գալուստ Ի՞նչ կարող եմ անել ձեզ համար:",
  "2": "Բարև ձեզ: Այնքան ուրախ եմ ձեզ հետ խոսելու համար:",
  "3": "Ողջույն Ես այստեղ եմ օգնելու համար: Ինչ է ձեզ պետք:",
  "4": "Ողջույն Ինչպե՞ս ես։ Ինչպե՞ս կարող եմ օգտակար լինել:"
};
const waiting$1M = {
  "0": "Թող մտածեմ...",
  "1": "Մի պահ...",
  "2": "Մշակվում է...",
  "3": "Ընդամենը մի վայրկյան...",
  "4": "Ես դա ստուգում եմ ձեզ համար ..."
};
const hy = {
  chat: chat$1L,
  avatar: avatar$1L,
  greetings: greetings$1M,
  waiting: waiting$1M
};
const __vite_glob_0_79 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1L,
  chat: chat$1L,
  default: hy,
  greetings: greetings$1M,
  waiting: waiting$1M
}, Symbol.toStringTag, { value: "Module" }));
const chat$1K = {
  input: {
    placeholder: "Ketik pesan Anda...",
    listening: "Mendengarkan..."
  },
  enableSound: "Aktifkan Suara",
  stt: {
    transcribing: "Mentranskripsikan: ",
    micActive: "Mikrofon aktif...",
    heardError: "Maaf, saya tidak dapat mendengar Anda. Silakan coba lagi.",
    micAccessError: "Tidak dapat mengakses mikrofon. Periksa izin."
  },
  speed: {
    idle: "Menganggur:",
    talk: "Pembicaraan:"
  }
};
const avatar$1K = {
  loading: "Memuat avatar...",
  title: {
    maximize: "Maksimalkan",
    minimize: "Minimalkan",
    close: "Tutup",
    clickToMaximize: "Klik untuk memaksimalkan",
    clickToMinimize: "Klik untuk memperkecil"
  },
  error: {
    loadFailed: "Gagal memuat avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer tidak dimuat",
    passwordRequired: "Kata sandi diperlukan untuk file .ania terenkripsi",
    noSource: "Tidak ada sumber avatar yang disediakan (avatarUrl atau avatarData)"
  }
};
const greetings$1L = {
  "0": "Hai! Apa yang bisa saya bantu hari ini?",
  "1": "Halo! Selamat datang! Apa yang bisa saya lakukan untuk Anda?",
  "2": "Hai, yang di sana! Senang sekali bisa berbicara dengan Anda!",
  "3": "Halo! Saya di sini untuk membantu. Apa yang kamu butuhkan?",
  "4": "Hai! Apa kabarmu? Bagaimana saya bisa berguna?"
};
const waiting$1L = {
  "0": "Biarkan aku berpikir...",
  "1": "Suatu saat...",
  "2": "Memproses...",
  "3": "Tunggu sebentar...",
  "4": "Aku sedang memeriksanya untukmu..."
};
const id = {
  chat: chat$1K,
  avatar: avatar$1K,
  greetings: greetings$1L,
  waiting: waiting$1L
};
const __vite_glob_0_80 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1K,
  chat: chat$1K,
  default: id,
  greetings: greetings$1L,
  waiting: waiting$1L
}, Symbol.toStringTag, { value: "Module" }));
const chat$1J = {
  input: {
    placeholder: "Pịnye ozi gị...",
    listening: "Na-ege ntị..."
  },
  enableSound: "Kwado ụda",
  stt: {
    transcribing: "Na-edegharị: ",
    micActive: "Igwe okwu na-arụ ọrụ...",
    heardError: "Ndo, enweghị ike ịnụ gị. Biko nwaa ọzọ.",
    micAccessError: "Enweghị ike ịnweta igwe okwu. Lelee ikike."
  },
  speed: {
    idle: "Akwụsịghị ọrụ:",
    talk: "Kwuo okwu:"
  }
};
const avatar$1J = {
  loading: "Na-ebu avatar...",
  title: {
    maximize: "Bulie elu",
    minimize: "Wedata",
    close: "Mechie",
    clickToMaximize: "Pịa ka iwelie elu",
    clickToMinimize: "Pịa ka ibelata"
  },
  error: {
    loadFailed: "Ịbunye avatar agaghị eme: {{error}} ",
    playerNotLoaded: "Ejurughi AniaPlayer",
    passwordRequired: "Okwuntughe achọrọ maka faịlụ .ania ezoro ezo",
    noSource: "Enweghị isi iyi avatar enyere (avatarUrl ma ọ bụ avatarData)"
  }
};
const greetings$1K = {
  "0": "Ndewo! Kedu ka m ga-esi nyere gị aka taa?",
  "1": "Nnọọ! Nnọọ! Kedu ihe m ga-emere gị?",
  "2": "Ndewo ebe ahụ! Obi dị m ụtọ ịgwa gị okwu!",
  "3": "Nnọọ! Abịara m ebe a iji nyere aka. Kedu ihe ị chọrọ?",
  "4": "Ndewo! Kedu ka ị mere? Kedu ka m ga-esi baa uru?"
};
const waiting$1K = {
  "0": "Ka m chee...",
  "1": "Otu oge...",
  "2": "Na-ahazi...",
  "3": "Naanị otu sekọnd...",
  "4": "Ana m elele nke ahụ maka gị..."
};
const ig = {
  chat: chat$1J,
  avatar: avatar$1J,
  greetings: greetings$1K,
  waiting: waiting$1K
};
const __vite_glob_0_81 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1J,
  chat: chat$1J,
  default: ig,
  greetings: greetings$1K,
  waiting: waiting$1K
}, Symbol.toStringTag, { value: "Module" }));
const chat$1I = {
  input: {
    placeholder: "I-type ti mensahem...",
    listening: "Dumdumngeg..."
  },
  enableSound: "Pagbalinen ti Uni",
  stt: {
    transcribing: "Panag-transkripsion: ",
    micActive: "Aktibo ti mikropono...",
    heardError: "Sorry, diak nangngeg. Pangngaasiyo ta padasenyo manen.",
    micAccessError: "Saan a makastrek iti mikropono. Kitaen dagiti pammalubos."
  },
  speed: {
    idle: "Idle:",
    talk: "Palawag:"
  }
};
const avatar$1I = {
  loading: "Karga ti avatar...",
  title: {
    maximize: "Maximize ti",
    minimize: "Pabassitem",
    close: "Agserra",
    clickToMaximize: "I-click tapno ma-maximize",
    clickToMinimize: "I-click tapno mapabassit"
  },
  error: {
    loadFailed: "Napaay a mangikarga iti avatar: {{error}} . ",
    playerNotLoaded: "AniaPlayer saan a naikarga",
    passwordRequired: "Kasapulan ti password para iti na-encrypt a .ania file",
    noSource: "Awan ti naited a taudan ti avatar (avatarUrl wenno avatarData) ."
  }
};
const greetings$1J = {
  "0": "Hi! Kasano a matulongakkayo ita nga aldaw?",
  "1": "Hello! Naragsak nga isasangbay! Ania ti maaramidak para kenka?",
  "2": "Hi kaniam! Maragsakanak unay a makisarita kadakayo!",
  "3": "Hello! Addaak ditoy tapno tumulong. Ania ti kasapulam?",
  "4": "Hi! Kumusta kan? Kasano a makagunggonaak?"
};
const waiting$1J = {
  "0": "Bay-anyo a panunotek...",
  "1": "Maysa a kanito...",
  "2": "Panagproseso ti...",
  "3": "Maysa laeng a segundo...",
  "4": "I-check ko dayta para kenka..."
};
const ilo = {
  chat: chat$1I,
  avatar: avatar$1I,
  greetings: greetings$1J,
  waiting: waiting$1J
};
const __vite_glob_0_82 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1I,
  chat: chat$1I,
  default: ilo,
  greetings: greetings$1J,
  waiting: waiting$1J
}, Symbol.toStringTag, { value: "Module" }));
const chat$1H = {
  input: {
    placeholder: "Sláðu inn skilaboðin þín...",
    listening: "Hlustar..."
  },
  enableSound: "Virkja hljóð",
  stt: {
    transcribing: "Umritun: ",
    micActive: "Hljóðnemi virkur...",
    heardError: "Því miður, ég heyrði ekki í þér. Vinsamlegast reyndu aftur.",
    micAccessError: "Ekki hægt að nálgast hljóðnema. Athugaðu heimildir."
  },
  speed: {
    idle: "Aðgerðarlaus:",
    talk: "Spjall:"
  }
};
const avatar$1H = {
  loading: "Hleður avatar...",
  title: {
    maximize: "Hámarka",
    minimize: "Lágmarka",
    close: "Loka",
    clickToMaximize: "Smelltu til að hámarka",
    clickToMinimize: "Smelltu til að lágmarka"
  },
  error: {
    loadFailed: "Mistókst að hlaða avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ekki hlaðinn",
    passwordRequired: "Lykilorð krafist fyrir dulkóðaða .ania skrá",
    noSource: "Engin avataruppspretta veitt (avatarUrl eða avatarData)"
  }
};
const greetings$1I = {
  "0": "Hæ! Hvernig get ég hjálpað þér í dag?",
  "1": "Halló! Velkomin! Hvað get ég gert fyrir þig?",
  "2": "Hæ! Svo gaman að tala við þig!",
  "3": "Halló! Ég er hér til að hjálpa. Hvað þarftu?",
  "4": "Hæ! Hvernig hefurðu það? Hvernig get ég verið gagnleg?"
};
const waiting$1I = {
  "0": "Leyfðu mér að hugsa...",
  "1": "Eitt augnablik...",
  "2": "Vinnur...",
  "3": "Bara sekúndu...",
  "4": "Ég er að athuga það fyrir þig..."
};
const is = {
  chat: chat$1H,
  avatar: avatar$1H,
  greetings: greetings$1I,
  waiting: waiting$1I
};
const __vite_glob_0_83 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1H,
  chat: chat$1H,
  default: is,
  greetings: greetings$1I,
  waiting: waiting$1I
}, Symbol.toStringTag, { value: "Module" }));
const chat$1G = {
  input: {
    placeholder: "Type your message...",
    listening: "Ascoltando..."
  },
  enableSound: "Enable Sound",
  stt: {
    transcribing: "Transcribing: ",
    micActive: "Microphone active...",
    heardError: "Mi dispiace, non ti ho sentito. Please try again.",
    micAccessError: "Impossibile accedere al microfono. Check permissions."
  },
  speed: {
    idle: "Idle:",
    talk: "Talk:"
  }
};
const avatar$1G = {
  loading: "Loading avatar...",
  title: {
    maximize: "Massimizzare",
    minimize: "Ridurre al minimo",
    close: "Close",
    clickToMaximize: "Click to maximize",
    clickToMinimize: "Click to minimize"
  },
  error: {
    loadFailed: "Impossibile caricare l'avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer not loaded",
    passwordRequired: "Password richiesta per il file .ania crittografato",
    noSource: "Nessuna origine avatar fornita (avatarUrl o avatarData)"
  }
};
const greetings$1H = {
  "0": "Ciao! Come posso aiutarti oggi?",
  "1": "Ciao! Benvenuto! Cosa posso fare per lei?",
  "2": "Ciao! Sono così felice di parlare con te!",
  "3": "Ciao! I'm here to help. Di che cosa hai bisogno?",
  "4": "CIAO! Come stai? Come posso essere utile?"
};
const waiting$1H = {
  "0": "Let me think...",
  "1": "One moment...",
  "2": "Elaborazione...",
  "3": "Solo un secondo...",
  "4": "Lo sto controllando per te..."
};
const it = {
  chat: chat$1G,
  avatar: avatar$1G,
  greetings: greetings$1H,
  waiting: waiting$1H
};
const __vite_glob_0_84 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1G,
  chat: chat$1G,
  default: it,
  greetings: greetings$1H,
  waiting: waiting$1H
}, Symbol.toStringTag, { value: "Module" }));
const chat$1F = {
  input: {
    placeholder: "メッセージを入力してください...",
    listening: "聞いています..."
  },
  enableSound: "サウンドを有効にする",
  stt: {
    transcribing: "転写: ",
    micActive: "マイクがアクティブです...",
    heardError: "申し訳ありませんが、聞こえませんでした。もう一度試してください。",
    micAccessError: "マイクにアクセスできません。権限を確認してください。"
  },
  speed: {
    idle: "アイドル:",
    talk: "トーク:"
  }
};
const avatar$1F = {
  loading: "アバターを読み込んでいます...",
  title: {
    maximize: "最大化する",
    minimize: "最小化する",
    close: "閉じる",
    clickToMaximize: "クリックして最大化します",
    clickToMinimize: "クリックして最小化します"
  },
  error: {
    loadFailed: "アバターのロードに失敗しました: {{error}} ",
    playerNotLoaded: "AniaPlayer がロードされていません",
    passwordRequired: "暗号化された .ania ファイルにはパスワードが必要です",
    noSource: "アバター ソースが提供されていません (avatarUrl または avatarData)"
  }
};
const greetings$1G = {
  "0": "こんにちは！今日はどのようにお手伝いできますか?",
  "1": "こんにちは！いらっしゃいませ！どういうご用件ですか？",
  "2": "やあ！お話しできてとても嬉しいです！",
  "3": "こんにちは！私は手伝うためにここにいます。あなたは何が必要ですか？",
  "4": "こんにちは！元気ですか？どうしたら役に立てるでしょうか？"
};
const waiting$1G = {
  "0": "考えさせてください...",
  "1": "ちょっと...",
  "2": "処理中...",
  "3": "ちょっと…",
  "4": "あなたの代わりにそれを確認しています..."
};
const ja = {
  chat: chat$1F,
  avatar: avatar$1F,
  greetings: greetings$1G,
  waiting: waiting$1G
};
const __vite_glob_0_85 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1F,
  chat: chat$1F,
  default: ja,
  greetings: greetings$1G,
  waiting: waiting$1G
}, Symbol.toStringTag, { value: "Module" }));
const chat$1E = {
  input: {
    placeholder: "Ketik pesen sampeyan...",
    listening: "Ngrungokake..."
  },
  enableSound: "Aktifake Swara",
  stt: {
    transcribing: "Transkripsi: ",
    micActive: "Mikropon aktif...",
    heardError: "Sorry, ora bisa krungu sampeyan. Coba maneh.",
    micAccessError: "Ora bisa ngakses mikropon. Priksa ijin."
  },
  speed: {
    idle: "nganggur:",
    talk: "Dhiskusi:"
  }
};
const avatar$1E = {
  loading: "Loading avatar...",
  title: {
    maximize: "maksimalake",
    minimize: "nyilikake",
    close: "Nutup",
    clickToMaximize: "Klik kanggo nggedhekake",
    clickToMinimize: "Klik kanggo nyilikake"
  },
  error: {
    loadFailed: "Gagal mbukak avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ora dimuat",
    passwordRequired: "Tembung sandhi dibutuhake kanggo file .ania sing dienkripsi",
    noSource: "Ora ana sumber avatar sing diwenehake (avatarUrl utawa avatarData)"
  }
};
const greetings$1F = {
  "0": "Hi! Kepiye carane aku bisa nulungi sampeyan dina iki?",
  "1": "Hello! Sugeng rawuh! Apa sing bisa daktindakake kanggo sampeyan?",
  "2": "Sugeng rawuh! Seneng banget ngomong karo sampeyan!",
  "3": "Hello! Aku kene kanggo bantuan. Apa sing sampeyan butuhake?",
  "4": "Hi! piye kabare? Kepiye carane bisa migunani?"
};
const waiting$1F = {
  "0": "Ayo aku mikir ...",
  "1": "Sedhela...",
  "2": "Ngolah...",
  "3": "Sedhela wae...",
  "4": "Aku mriksa sampeyan ..."
};
const jv = {
  chat: chat$1E,
  avatar: avatar$1E,
  greetings: greetings$1F,
  waiting: waiting$1F
};
const __vite_glob_0_86 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1E,
  chat: chat$1E,
  default: jv,
  greetings: greetings$1F,
  waiting: waiting$1F
}, Symbol.toStringTag, { value: "Module" }));
const chat$1D = {
  input: {
    placeholder: "ჩაწერეთ თქვენი შეტყობინება...",
    listening: "მოსმენა..."
  },
  enableSound: "ჩართეთ ხმა",
  stt: {
    transcribing: "ტრანსკრიფცია: ",
    micActive: "მიკროფონი აქტიურია...",
    heardError: "უკაცრავად, ვერ გავიგე. გთხოვთ, სცადოთ ხელახლა.",
    micAccessError: "მიკროფონზე წვდომა შეუძლებელია. შეამოწმეთ ნებართვები."
  },
  speed: {
    idle: "უმოქმედო:",
    talk: "საუბარი:"
  }
};
const avatar$1D = {
  loading: "იტვირთება ავატარი...",
  title: {
    maximize: "მაქსიმიზაცია",
    minimize: "მინიმიზაცია",
    close: "დახურვა",
    clickToMaximize: "დააწკაპუნეთ მაქსიმიზაციისთვის",
    clickToMinimize: "დააწკაპუნეთ მინიმუმამდე"
  },
  error: {
    loadFailed: "ავატარის ჩატვირთვა ვერ მოხერხდა: {{error}} ",
    playerNotLoaded: "AniaPlayer არ არის ჩატვირთული",
    passwordRequired: "დაშიფრული .ania ფაილისთვის საჭიროა პაროლი",
    noSource: "ავატარის წყარო არ არის მოწოდებული (avatarUrl ან avatarData)"
  }
};
const greetings$1E = {
  "0": "გამარჯობა! როგორ შემიძლია დაგეხმაროთ დღეს?",
  "1": "გამარჯობა! მოგესალმებით! რა გავაკეთო შენთვის?",
  "2": "გამარჯობა! ძალიან მიხარია თქვენთან საუბარი!",
  "3": "გამარჯობა! მე აქ დასახმარებლად ვარ. რა გჭირდება?",
  "4": "გამარჯობა! როგორ ხარ? როგორ ვიყო სასარგებლო?"
};
const waiting$1E = {
  "0": "მოდი ვიფიქრო...",
  "1": "ერთი მომენტი...",
  "2": "დამუშავება...",
  "3": "სულ რაღაც წამი...",
  "4": "ამას შენთვის ვამოწმებ..."
};
const ka = {
  chat: chat$1D,
  avatar: avatar$1D,
  greetings: greetings$1E,
  waiting: waiting$1E
};
const __vite_glob_0_87 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1D,
  chat: chat$1D,
  default: ka,
  greetings: greetings$1E,
  waiting: waiting$1E
}, Symbol.toStringTag, { value: "Module" }));
const chat$1C = {
  input: {
    placeholder: "Хабарламаңызды теріңіз...",
    listening: "Тыңдалуда..."
  },
  enableSound: "Дыбысты қосу",
  stt: {
    transcribing: "Транскрипциялау: ",
    micActive: "Микрофон белсенді...",
    heardError: "Кешіріңіз, сізді ести алмадым. Қайталап көріңіз.",
    micAccessError: "Микрофонға кіру мүмкін емес. Рұқсаттарды тексеріңіз."
  },
  speed: {
    idle: "Бос:",
    talk: "Әңгімелесу:"
  }
};
const avatar$1C = {
  loading: "Аватар жүктелуде...",
  title: {
    maximize: "Үлкейту",
    minimize: "Кішірейту",
    close: "Жабу",
    clickToMaximize: "Үлкейту үшін басыңыз",
    clickToMinimize: "Кішірейту үшін басыңыз"
  },
  error: {
    loadFailed: "Аватар жүктелмеді: {{error}} ",
    playerNotLoaded: "AniaPlayer жүктелмеді",
    passwordRequired: "Шифрланған .ania файлы үшін құпия сөз қажет",
    noSource: "Аватар көзі берілмеді (avatarUrl немесе avatarData)"
  }
};
const greetings$1D = {
  "0": "Сәлем! Бүгін мен сізге қалай көмектесе аламын?",
  "1": "Сәлем! Қош келдіңіз! Мен сен үшін не істей аламын?",
  "2": "Сәлем! Сізбен сөйлескеніме қуаныштымын!",
  "3": "Сәлем! Мен көмектесуге келдім. Саған не қажет?",
  "4": "Сәлем! Қалдарыңыз қалай? Мен қалай пайдалы бола аламын?"
};
const waiting$1D = {
  "0": "Ойланайыншы...",
  "1": "Бір сәт...",
  "2": "Өңдеуде...",
  "3": "Бір секунд...",
  "4": "Мен мұны сіз үшін тексеріп жатырмын ..."
};
const kk = {
  chat: chat$1C,
  avatar: avatar$1C,
  greetings: greetings$1D,
  waiting: waiting$1D
};
const __vite_glob_0_88 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1C,
  chat: chat$1C,
  default: kk,
  greetings: greetings$1D,
  waiting: waiting$1D
}, Symbol.toStringTag, { value: "Module" }));
const chat$1B = {
  input: {
    placeholder: "វាយបញ្ចូលសាររបស់អ្នក...",
    listening: "កំពុងស្តាប់..."
  },
  enableSound: "បើកសំឡេង",
  stt: {
    transcribing: "ប្រតិចារិក៖ ",
    micActive: "មីក្រូហ្វូនសកម្ម...",
    heardError: "សូមអភ័យទោស មិនអាចឮអ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។",
    micAccessError: "មិនអាចចូលប្រើមីក្រូហ្វូនបានទេ។ ពិនិត្យការអនុញ្ញាត។"
  },
  speed: {
    idle: "ទំនេរ៖",
    talk: "និយាយ៖"
  }
};
const avatar$1B = {
  loading: "កំពុងផ្ទុករូបតំណាង...",
  title: {
    maximize: "អតិបរមា",
    minimize: "បង្រួមអប្បបរមា",
    close: "បិទ",
    clickToMaximize: "ចុចដើម្បីពង្រីកអតិបរមា",
    clickToMinimize: "ចុចដើម្បីបង្រួមអប្បបរមា"
  },
  error: {
    loadFailed: "បរាជ័យក្នុងការផ្ទុករូបតំណាង៖ {{error}} ",
    playerNotLoaded: "AniaPlayer មិន​បាន​ផ្ទុក",
    passwordRequired: "ទាមទារពាក្យសម្ងាត់សម្រាប់ឯកសារ .ania ដែលបានអ៊ិនគ្រីប",
    noSource: "មិនមានប្រភពរូបតំណាងដែលបានផ្តល់ឱ្យទេ (avatarUrl ឬ avatarData)"
  }
};
const greetings$1C = {
  "0": "សួស្តី! តើខ្ញុំអាចជួយអ្នកនៅថ្ងៃនេះដោយរបៀបណា?",
  "1": "សួស្តី! សូមស្វាគមន៍! តើខ្ញុំអាចធ្វើអ្វីសម្រាប់អ្នក?",
  "2": "សួស្តី! រីករាយណាស់ដែលបាននិយាយជាមួយអ្នក!",
  "3": "សួស្តី! ខ្ញុំនៅទីនេះដើម្បីជួយ។ តើអ្នកត្រូវការអ្វី?",
  "4": "សួស្តី! សុខសប្បាយជាទេ? តើខ្ញុំអាចមានប្រយោជន៍យ៉ាងដូចម្តេច?"
};
const waiting$1C = {
  "0": "អោយខ្ញុំគិត...",
  "1": "មួយសន្ទុះ...",
  "2": "កំពុងដំណើរការ...",
  "3": "មួយវិនាទី...",
  "4": "ខ្ញុំកំពុងពិនិត្យមើលវាសម្រាប់អ្នក ..."
};
const km = {
  chat: chat$1B,
  avatar: avatar$1B,
  greetings: greetings$1C,
  waiting: waiting$1C
};
const __vite_glob_0_89 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1B,
  chat: chat$1B,
  default: km,
  greetings: greetings$1C,
  waiting: waiting$1C
}, Symbol.toStringTag, { value: "Module" }));
const chat$1A = {
  input: {
    placeholder: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    listening: "ಕೇಳುತ್ತಿದೆ..."
  },
  enableSound: "ಧ್ವನಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
  stt: {
    transcribing: "ಲಿಪ್ಯಂತರ: ",
    micActive: "ಮೈಕ್ರೊಫೋನ್ ಸಕ್ರಿಯವಾಗಿದೆ...",
    heardError: "ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಮಾತು ಕೇಳಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    micAccessError: "ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
  },
  speed: {
    idle: "ನಿಷ್ಕ್ರಿಯ:",
    talk: "ಚರ್ಚೆ:"
  }
};
const avatar$1A = {
  loading: "ಅವತಾರ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
  title: {
    maximize: "ಗರಿಷ್ಠಗೊಳಿಸು",
    minimize: "ಕಡಿಮೆಗೊಳಿಸು",
    close: "ಮುಚ್ಚಿ",
    clickToMaximize: "ಗರಿಷ್ಠಗೊಳಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    clickToMinimize: "ಕಡಿಮೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ"
  },
  error: {
    loadFailed: "ಅವತಾರ್ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ: {{error}} ",
    playerNotLoaded: "AniaPlayer ಲೋಡ್ ಆಗಿಲ್ಲ",
    passwordRequired: "ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ .ania ಫೈಲ್‌ಗೆ ಪಾಸ್‌ವರ್ಡ್ ಅಗತ್ಯವಿದೆ",
    noSource: "ಯಾವುದೇ ಅವತಾರ್ ಮೂಲವನ್ನು ಒದಗಿಸಲಾಗಿಲ್ಲ (avatarUrl ಅಥವಾ avatarData)"
  }
};
const greetings$1B = {
  "0": "ನಮಸ್ತೆ! ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  "1": "ನಮಸ್ಕಾರ! ಸ್ವಾಗತ! ನಾನು ನಿಮಗಾಗಿ ಏನು ಮಾಡಬಹುದು?",
  "2": "ನಮಸ್ಕಾರ! ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಲು ತುಂಬಾ ಸಂತೋಷವಾಗಿದೆ!",
  "3": "ನಮಸ್ಕಾರ! ನಾನು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನಿಮಗೆ ಏನು ಬೇಕು?",
  "4": "ನಮಸ್ತೆ! ಹೇಗಿದ್ದೀಯಾ? ನಾನು ಹೇಗೆ ಉಪಯುಕ್ತವಾಗಬಹುದು?"
};
const waiting$1B = {
  "0": "ನಾನು ಯೋಚಿಸಲಿ ...",
  "1": "ಒಂದು ಕ್ಷಣ...",
  "2": "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
  "3": "ಕೇವಲ ಒಂದು ಸೆಕೆಂಡ್...",
  "4": "ನಾನು ಅದನ್ನು ನಿಮಗಾಗಿ ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇನೆ..."
};
const kn = {
  chat: chat$1A,
  avatar: avatar$1A,
  greetings: greetings$1B,
  waiting: waiting$1B
};
const __vite_glob_0_90 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1A,
  chat: chat$1A,
  default: kn,
  greetings: greetings$1B,
  waiting: waiting$1B
}, Symbol.toStringTag, { value: "Module" }));
const chat$1z = {
  input: {
    placeholder: "메시지를 입력하세요...",
    listening: "듣는 중..."
  },
  enableSound: "소리 활성화",
  stt: {
    transcribing: "스크립트 작성 중: ",
    micActive: "마이크 활성...",
    heardError: "죄송합니다. 귀하의 목소리를 들을 수 없습니다. 다시 시도해 주세요.",
    micAccessError: "마이크에 액세스할 수 없습니다. 권한을 확인하세요."
  },
  speed: {
    idle: "유휴:",
    talk: "이야기:"
  }
};
const avatar$1z = {
  loading: "아바타 로드 중...",
  title: {
    maximize: "최대화",
    minimize: "최소화",
    close: "닫기",
    clickToMaximize: "최대화하려면 클릭하세요.",
    clickToMinimize: "최소화하려면 클릭하세요."
  },
  error: {
    loadFailed: "아바타 로드 실패: {{error}} ",
    playerNotLoaded: "AniaPlayer가 로드되지 않았습니다.",
    passwordRequired: "암호화된 .ania 파일에 비밀번호가 필요합니다.",
    noSource: "제공된 아바타 소스가 없습니다(avatarUrl 또는 AvatarData)."
  }
};
const greetings$1A = {
  "0": "안녕하세요! 오늘은 무엇을 도와드릴까요?",
  "1": "안녕하세요! 환영! 제가 당신을 위해 무엇을 도와드릴까요?",
  "2": "안녕하세요! 당신과 이야기하게 되어 정말 기뻐요!",
  "3": "안녕하세요! 저는 도와드리려고 왔습니다. 뭐가 필요하세요?",
  "4": "안녕! 어떻게 지내세요? 어떻게 하면 유용할 수 있나요?"
};
const waiting$1A = {
  "0": "생각해보자...",
  "1": "잠시만요...",
  "2": "처리 중...",
  "3": "잠시만요...",
  "4": "내가 당신을 위해 그걸 확인하고 있어요..."
};
const ko = {
  chat: chat$1z,
  avatar: avatar$1z,
  greetings: greetings$1A,
  waiting: waiting$1A
};
const __vite_glob_0_91 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1z,
  chat: chat$1z,
  default: ko,
  greetings: greetings$1A,
  waiting: waiting$1A
}, Symbol.toStringTag, { value: "Module" }));
const chat$1y = {
  input: {
    placeholder: "Tayp yu mɛsej...",
    listening: "We yu de lisin..."
  },
  enableSound: "Enable Saund",
  stt: {
    transcribing: "We dɛn de transkrib: ",
    micActive: "Maykrofon aktif...",
    heardError: "Sɔri, a nɔ bin ebul fɔ yɛri yu. Duya tray bak.",
    micAccessError: "Nɔ ebul fɔ akses maykrofon. Chek di permishɔn dɛn."
  },
  speed: {
    idle: "Idle:",
    talk: "Tɔk:"
  }
};
const avatar$1y = {
  loading: "We yu de lod avatar...",
  title: {
    maximize: "Maksimayz am",
    minimize: "Minimiz am",
    close: "Klos",
    clickToMaximize: "Klik fɔ mek yu maksimayz",
    clickToMinimize: "Klik fɔ mek yu smɔl smɔl"
  },
  error: {
    loadFailed: "Fail fɔ lod avatar: {{error}} . ",
    playerNotLoaded: "AniaPlayer nɔ lod",
    passwordRequired: "Paswɔd nid fɔ enkript .ania fayl",
    noSource: "No avatar sɔs nɔ de we dɛn gi (avatarUrl ɔ avatarData)"
  }
};
const greetings$1z = {
  "0": "Hi! Aw a go ɛp yu tide?",
  "1": "Adu! Wɛlkɔm! Wetin a go du fɔ yu?",
  "2": "Kushɛ-o! So gladi fɔ tɔk to yu!",
  "3": "Adu! A de ya fɔ ɛp. Wetin yu nid?",
  "4": "Kushɛ! Aw di bɔdi? Aw a go bi yusful pɔsin?"
};
const waiting$1z = {
  "0": "Mek a tink se...",
  "1": "Wan mɔnt...",
  "2": "Di we aw dɛn de prosɛs...",
  "3": "Jɔs wan sɛkɔn...",
  "4": "A de chɛk dat fɔ yu..."
};
const kri = {
  chat: chat$1y,
  avatar: avatar$1y,
  greetings: greetings$1z,
  waiting: waiting$1z
};
const __vite_glob_0_92 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1y,
  chat: chat$1y,
  default: kri,
  greetings: greetings$1z,
  waiting: waiting$1z
}, Symbol.toStringTag, { value: "Module" }));
const chat$1x = {
  input: {
    placeholder: "Sonika nsangu na nge...",
    listening: "Kuwidikila..."
  },
  enableSound: "Kangula Makelele",
  stt: {
    transcribing: "Kusonika: ",
    micActive: "Micro ke sala...",
    heardError: "Lolula mono, mono lendaka kuwa nge ve. Mulemvo meka diaka.",
    micAccessError: "Kukonda kukuka na kukota na mikro. Tala nswa."
  },
  speed: {
    idle: "Kukonda kisalu:",
    talk: "Diskure:"
  }
};
const avatar$1x = {
  loading: "Kutula kifwanisu...",
  title: {
    maximize: "Kukumisa mingi",
    minimize: "Kukulumusa",
    close: "Kanga",
    clickToMaximize: "Fina sambu na kuyedisa",
    clickToMinimize: "Fina sambu na kukulumusa"
  },
  error: {
    loadFailed: "Kukonda kutula kifwanisu: {{error}} ",
    playerNotLoaded: "Aniajoueur me fuluka ve",
    passwordRequired: "Mot de passe kele mfunu sambu na fichier .ania ya kukangama",
    noSource: "Bo me pesa ve kisina ya kifwani (Url ya kifwani to bansangu ya kifwani)"
  }
};
const greetings$1y = {
  "0": "Mbote! Inki mutindu mono lenda sadisa nge bubu yai?",
  "1": "Mbote! Kukwisa ya mbote! Inki mono lenda sala sambu na nge?",
  "2": "Mbote na beno! Kiese mingi na kusolula ti nge!",
  "3": "Mbote! Mu ke awa samu na kusadisa. Inki nge kele na yo mfunu?",
  "4": "Mbote! Ebwe? Inki mutindu mono lenda vanda mfunu?"
};
const waiting$1y = {
  "0": "Bika mono yindula...",
  "1": "Ntangu mosi...",
  "2": "Kuyidika...",
  "3": "Kaka sekondi mosi...",
  "4": "Mono ke tala yo sambu na nge..."
};
const ktu = {
  chat: chat$1x,
  avatar: avatar$1x,
  greetings: greetings$1y,
  waiting: waiting$1y
};
const __vite_glob_0_93 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1x,
  chat: chat$1x,
  default: ktu,
  greetings: greetings$1y,
  waiting: waiting$1y
}, Symbol.toStringTag, { value: "Module" }));
const chat$1w = {
  input: {
    placeholder: "Peyama xwe binivîse...",
    listening: "Guhdarîkirin..."
  },
  enableSound: "Deng çalak bike",
  stt: {
    transcribing: "Veguheztin: ",
    micActive: "Mîkrofona çalak...",
    heardError: "Bibore, min nebihîst. Ji kerema xwe dîsa biceribîne.",
    micAccessError: "Nikare bigihîje mîkrofonê. Destûran kontrol bikin."
  },
  speed: {
    idle: "Bêkar:",
    talk: "Nîqaş:"
  }
};
const avatar$1w = {
  loading: "Avatar tê barkirin...",
  title: {
    maximize: "Mezin bikin",
    minimize: "Kêmkirin",
    close: "Close",
    clickToMaximize: "Bikirtînin da ku zêde bikin",
    clickToMinimize: "Bikirtînin da ku kêm bikin"
  },
  error: {
    loadFailed: "Barkirina avatar bi ser neket: {{error}} ",
    playerNotLoaded: "AniaPlayer nehat barkirin",
    passwordRequired: "Ji bo pelê .ania şîfrekirî şîfre hewce dike",
    noSource: "Çavkaniyek avatar nayê peyda kirin (avatarUrl an avatarData)"
  }
};
const greetings$1x = {
  "0": "Hi! Ez îro çawa dikarim alîkariya te bikim?",
  "1": "Slav! Bi xêr hatî! Ez dikarim ji bo we çi bikim?",
  "2": "Silav! Ji ber ku ez bi we re dipeyivim pir kêfxweş im!",
  "3": "Slav! Ez ji bo alîkariyê li vir im. Çi hewcedariya we heye?",
  "4": "Merheba! Halê we çawa ye? Ez çawa dikarim bikêr bim?"
};
const waiting$1x = {
  "0": "Bihêle ez bifikirim...",
  "1": "Demek...",
  "2": "Pêvajo...",
  "3": "Tenê saniyeyek...",
  "4": "Ez wê ji bo we kontrol dikim ..."
};
const ku = {
  chat: chat$1w,
  avatar: avatar$1w,
  greetings: greetings$1x,
  waiting: waiting$1x
};
const __vite_glob_0_94 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1w,
  chat: chat$1w,
  default: ku,
  greetings: greetings$1x,
  waiting: waiting$1x
}, Symbol.toStringTag, { value: "Module" }));
const chat$1v = {
  input: {
    placeholder: "Кабарыңызды териңиз...",
    listening: "Угууда..."
  },
  enableSound: "Үндү иштетүү",
  stt: {
    transcribing: "Транскрипциялоо: ",
    micActive: "Микрофон активдүү...",
    heardError: "Кечиресиз, сизди уга албадым. Сураныч, кайра аракет кылыңыз.",
    micAccessError: "Микрофонго кирүү мүмкүн эмес. Уруксаттарды текшерүү."
  },
  speed: {
    idle: "Бош:",
    talk: "Сүйлөшүү:"
  }
};
const avatar$1v = {
  loading: "Аватар жүктөлүүдө...",
  title: {
    maximize: "Максималдуу кылуу",
    minimize: "Кичирейтүү",
    close: "Жабуу",
    clickToMaximize: "Чоңойтуу үчүн чыкылдатыңыз",
    clickToMinimize: "Кичирейтүү үчүн чыкылдатыңыз"
  },
  error: {
    loadFailed: "Аватар жүктөлгөн жок: {{error}} ",
    playerNotLoaded: "AniaPlayer жүктөлгөн жок",
    passwordRequired: "Шифрленген .ania файлы үчүн сырсөз талап кылынат",
    noSource: "Аватар булагы берилген эмес (avatarUrl же avatarData)"
  }
};
const greetings$1w = {
  "0": "салам! Бүгүн мен сага кантип жардам бере алам?",
  "1": "Салам! Кош келдиңиз! Мен сен үчүн эмне кыла алам?",
  "2": "Салам! Сиз менен сүйлөшүүгө кубанычтамын!",
  "3": "Салам! Мен жардам берүү үчүн келдим. сага эмне керек?",
  "4": "Салам! Кандайсыз? Кантип мен пайдалуу боло алам?"
};
const waiting$1w = {
  "0": "Ойлонуп көрөйүн...",
  "1": "Бир көз ирмем...",
  "2": "Иштелүүдө...",
  "3": "Бир секунда...",
  "4": "Мен муну сиз үчүн текшерип жатам..."
};
const ky = {
  chat: chat$1v,
  avatar: avatar$1v,
  greetings: greetings$1w,
  waiting: waiting$1w
};
const __vite_glob_0_95 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1v,
  chat: chat$1v,
  default: ky,
  greetings: greetings$1w,
  waiting: waiting$1w
}, Symbol.toStringTag, { value: "Module" }));
const chat$1u = {
  input: {
    placeholder: "Typus nuntium tuum.",
    listening: "Auditio..."
  },
  enableSound: "Sonus activare",
  stt: {
    transcribing: "Transcribendo: ",
    micActive: "Tortor ligula ac...",
    heardError: "Ignosce, te audire non potuit. Quaeso, iterum conare.",
    micAccessError: "'Non accedere tortor ligula. Perscriptio permissionum."
  },
  speed: {
    idle: "Otiosa:",
    talk: "Loquere:"
  }
};
const avatar$1u = {
  loading: "Loading avatar...",
  title: {
    maximize: "Maximize",
    minimize: "Minimize",
    close: "Close",
    clickToMaximize: "Click ut maximize",
    clickToMinimize: "Click ad circumscribendam"
  },
  error: {
    loadFailed: "Failed to load avatar: {{error}}",
    playerNotLoaded: "AniaPlayer non loaded",
    passwordRequired: "Password requisiti encrypted .ania lima",
    noSource: "Nulla copia avatar (avatarUrl vel avatarData)"
  }
};
const greetings$1v = {
  "0": "Salve! Quomodo te adiuvare possum hodie?",
  "1": "salve! salve! quid faciam tibi?",
  "2": "Salve! Gaudeo igitur tecum loqui!",
  "3": "salve! Sum hic ad auxilium. Quid opus est tibi?",
  "4": "Salve! Quomodo vales? Quomodo utilis esse possum?"
};
const waiting$1v = {
  "0": "Cogitem...",
  "1": "Unum momentum...",
  "2": "Processus...",
  "3": "Justo secundo...",
  "4": "Im 'reprehendo quod pro te ..."
};
const la = {
  chat: chat$1u,
  avatar: avatar$1u,
  greetings: greetings$1v,
  waiting: waiting$1v
};
const __vite_glob_0_96 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1u,
  chat: chat$1u,
  default: la,
  greetings: greetings$1v,
  waiting: waiting$1v
}, Symbol.toStringTag, { value: "Module" }));
const chat$1t = {
  input: {
    placeholder: "Schreift Äre Message ...",
    listening: "Lauschtert ..."
  },
  enableSound: "Sound aktivéieren",
  stt: {
    transcribing: "Transkriptioun: ",
    micActive: "Mikrofon aktiv ...",
    heardError: "Sorry, konnt dech net héieren. Probéiert w.e.g. nach eng Kéier.",
    micAccessError: "Kann net Zougang zum Mikrofon kréien. Check Permissiounen."
  },
  speed: {
    idle: "Idle:",
    talk: "Diskussioun:"
  }
};
const avatar$1t = {
  loading: "Luet den Avatar ...",
  title: {
    maximize: "Maximaliséieren",
    minimize: "Minimiséieren",
    close: "Zoumaachen",
    clickToMaximize: "Klickt fir ze maximéieren",
    clickToMinimize: "Klickt fir ze minimiséieren"
  },
  error: {
    loadFailed: "Konnt den Avatar net lueden: {{error}} ",
    playerNotLoaded: "AniaPlayer net gelueden",
    passwordRequired: "Passwuert néideg fir verschlësselte .ania Fichier",
    noSource: "Keng Avatarquell geliwwert (avatarUrl oder avatarData)"
  }
};
const greetings$1u = {
  "0": "Moien! Wéi kann ech Iech haut hëllefen?",
  "1": "Hallo! Wëllkomm! Wat kann ech fir dech maachen?",
  "2": "Moien alleguer! Sou frou mat Iech ze schwätzen!",
  "3": "Hallo! Ech sinn hei fir ze hëllefen. Wat brauchs du?",
  "4": "Salut! Wéi geet et dir? Wéi kann ech nëtzlech sinn?"
};
const waiting$1u = {
  "0": "Loosst mech denken ...",
  "1": "Ee Moment ...",
  "2": "Veraarbechtung...",
  "3": "Just eng Sekonn ...",
  "4": "Ech kontrolléieren dat fir Iech ..."
};
const lb = {
  chat: chat$1t,
  avatar: avatar$1t,
  greetings: greetings$1u,
  waiting: waiting$1u
};
const __vite_glob_0_97 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1t,
  chat: chat$1t,
  default: lb,
  greetings: greetings$1u,
  waiting: waiting$1u
}, Symbol.toStringTag, { value: "Module" }));
const chat$1s = {
  input: {
    placeholder: "Wandiika obubaka bwo...",
    listening: "Okuwuliriza..."
  },
  enableSound: "Ssobozesa Eddoboozi",
  stt: {
    transcribing: "Okuwandiika: ",
    micActive: "Microphone ekola...",
    heardError: "Bambi, saasobola kukuwulira. Nsaba oddemu ogezeeko.",
    micAccessError: "Tesobola kuyingira mu mayirofooni. Kebera olukusa."
  },
  speed: {
    idle: "Idle:",
    talk: "Emboozi:"
  }
};
const avatar$1s = {
  loading: "Okutikka avatar...",
  title: {
    maximize: "Maximize nnyo",
    minimize: "Kikendeeze ku nsonga eno",
    close: "Ggalawo",
    clickToMaximize: "Nyiga okufuna ebisingawo",
    clickToMinimize: "Nyiga okendeeze"
  },
  error: {
    loadFailed: "Eremereddwa okutikka avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer tetikkiddwa",
    passwordRequired: "Password eyeetaagibwa ku fayiro ya .ania ensirifu",
    noSource: "Tewali nsibuko ya avatar eweereddwa (avatarUrl oba avatarData) ."
  }
};
const greetings$1t = {
  "0": "Hi! Nnyinza ntya okukuyamba leero?",
  "1": "Nkulamusizza! Kaale! Kiki kye nnyinza okukukolera?",
  "2": "Nkulamusizaako! Nsanyuse nnyo okwogera naawe!",
  "3": "Nkulamusizza! Nze ndi wano okuyamba. Kiki kye weetaaga?",
  "4": "Nkulamusizza! Oli otya? Nnyinza ntya okuba ow’omugaso?"
};
const waiting$1t = {
  "0": "Ka ndowooza nti...",
  "1": "Akaseera kamu...",
  "2": "Okukola ku nsonga eno...",
  "3": "Akasekondi katono...",
  "4": "Ekyo nkikebera ku lulwo..."
};
const lg = {
  chat: chat$1s,
  avatar: avatar$1s,
  greetings: greetings$1t,
  waiting: waiting$1t
};
const __vite_glob_0_98 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1s,
  chat: chat$1s,
  default: lg,
  greetings: greetings$1t,
  waiting: waiting$1t
}, Symbol.toStringTag, { value: "Module" }));
const chat$1r = {
  input: {
    placeholder: "Typ eur boodsjap...",
    listening: "Luustere..."
  },
  enableSound: "Geluid insjakele",
  stt: {
    transcribing: "Transcrire: ",
    micActive: "Microfoon actief...",
    heardError: "Sorry, ik koos dich neet heure. Probeer nog ummer.",
    micAccessError: "Neet touwgaank tot de microfoon. Controleer de rechte."
  },
  speed: {
    idle: "Idle:",
    talk: "Gesprek:"
  }
};
const avatar$1r = {
  loading: "Avatar laden...",
  title: {
    maximize: "Maximisere",
    minimize: "Minimaliseer",
    close: "Sluite",
    clickToMaximize: "Klik um te maximalisere",
    clickToMinimize: "Klik um te minimalisere"
  },
  error: {
    loadFailed: "Avatar neet gelaoje: {{error}} ",
    playerNotLoaded: "AniaPlayer neet gelaod",
    passwordRequired: "Wachwoord nuudig veur versleutelde .ania-bestand",
    noSource: "Geen avatarbron verstrek (avatarUrl of avatarData)"
  }
};
const greetings$1s = {
  "0": "Hallo! Wie kin ich dich vandaag helpe?",
  "1": "Hallo! Welkom! Wat kin ich veur dich doon?",
  "2": "Hoi! Ich bin zoe blie um mit uch te praote!",
  "3": "Hallo! Ich bin hei um te helpe. Wat höbste nuudig?",
  "4": "Hoi! Wie geit het? Wie kin ich nuttig zien?"
};
const waiting$1s = {
  "0": "Laot mich dinke...",
  "1": "Ein momint...",
  "2": "Verwèrking...",
  "3": "Mer un seconde...",
  "4": "Ich controleer dat veur uch..."
};
const li = {
  chat: chat$1r,
  avatar: avatar$1r,
  greetings: greetings$1s,
  waiting: waiting$1s
};
const __vite_glob_0_99 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1r,
  chat: chat$1r,
  default: li,
  greetings: greetings$1s,
  waiting: waiting$1s
}, Symbol.toStringTag, { value: "Module" }));
const chat$1q = {
  input: {
    placeholder: "Digita o teu messaggio...",
    listening: "Ascoltâ..."
  },
  enableSound: "Attiva o son",
  stt: {
    transcribing: "Trascriçion: ",
    micActive: "Micròfono attivo...",
    heardError: "Scusa, no son stæto bon de sentite. Pe favô, provâ torna.",
    micAccessError: "No l'é poscibile açede a-o microfòn. Controllâ e autorizzaçioin."
  },
  speed: {
    idle: "Inattivo:",
    talk: "Discorso:"
  }
};
const avatar$1q = {
  loading: "Carregando l'avatar...",
  title: {
    maximize: "Mascimizzâ",
    minimize: "Minimizzâ",
    close: "Serrâ",
    clickToMaximize: "Clicca pe mascimizzâ",
    clickToMinimize: "Clicca pe redue a-o minimo"
  },
  error: {
    loadFailed: "No l'é stæto poscibile carregâ l'avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer no carregou",
    passwordRequired: "A password a l'é neçessäia pe-o file .ania criptou",
    noSource: "Nisciuña vivagna d'avatar fornia (Url d'avatar ò Dæti d'avatar)"
  }
};
const greetings$1r = {
  "0": "Ciao! Comm'o peu ëse che ti pòsso aggiuttâ ancheu?",
  "1": "Ciao! Benvegnuo! Cossa posso fâ pe ti?",
  "2": "Ehilà! Tanto contento de parlâ con ti!",
  "3": "Ciao! Son chì pe aggiuttâ. Cossa gh'é de beseugno?",
  "4": "Ciao! Comme ti stæ? Comm'o peu ëse utile?"
};
const waiting$1r = {
  "0": "Lasciame pensâ...",
  "1": "Un momento...",
  "2": "Elaboraçion...",
  "3": "Solo un segondo...",
  "4": "Sto controllando quello pe ti..."
};
const lij = {
  chat: chat$1q,
  avatar: avatar$1q,
  greetings: greetings$1r,
  waiting: waiting$1r
};
const __vite_glob_0_100 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1q,
  chat: chat$1q,
  default: lij,
  greetings: greetings$1r,
  waiting: waiting$1r
}, Symbol.toStringTag, { value: "Module" }));
const chat$1p = {
  input: {
    placeholder: "Digita el tò messaj...",
    listening: "Ascoltar..."
  },
  enableSound: "Abilita el son",
  stt: {
    transcribing: "Trascriziun: ",
    micActive: "Micròfon atif...",
    heardError: "Scusa, pudevi minga sentirte. Per piasé pruva ancamò.",
    micAccessError: "Impossibil acceder al microfono. Cuntrula i permess."
  },
  speed: {
    idle: "Inattivo:",
    talk: "Parlà:"
  }
};
const avatar$1p = {
  loading: "Caricament del avatar...",
  title: {
    maximize: "Massimizar",
    minimize: "Minimizar",
    close: "Serra",
    clickToMaximize: "Clicca per massimizar",
    clickToMinimize: "Clicca per minimizar"
  },
  error: {
    loadFailed: "L'è minga sta pusibel caricà l'avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer minga caricà",
    passwordRequired: "Password dumandada per el file .ania criptà",
    noSource: "Nissun funt d’avatar furnida (Url d’avatar o dati d’avatar)"
  }
};
const greetings$1q = {
  "0": "Ciao! Cuma pœu vuttàt incœu?",
  "1": "Uela! Benvegnud! Cossa pœdi far per ti?",
  "2": "Uei! Cusì contento de parlà cun ti!",
  "3": "Uela! Sun chi per vùtar. De che g’he bisugn?",
  "4": "Uela! Comè steet? Cuma pœu vèss ütil?"
};
const waiting$1q = {
  "0": "Lassèm pensà...",
  "1": "Un mument...",
  "2": "Elaboraziun...",
  "3": "Solo un segund...",
  "4": "Sto controlland per ti..."
};
const lmo = {
  chat: chat$1p,
  avatar: avatar$1p,
  greetings: greetings$1q,
  waiting: waiting$1q
};
const __vite_glob_0_101 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1p,
  chat: chat$1p,
  default: lmo,
  greetings: greetings$1q,
  waiting: waiting$1q
}, Symbol.toStringTag, { value: "Module" }));
const chat$1o = {
  input: {
    placeholder: "Tyá message na yo...",
    listening: "Koyoka..."
  },
  enableSound: "Activer Son",
  stt: {
    transcribing: "Kokoma na mikanda: ",
    micActive: "Microphone ezali kosala...",
    heardError: "Pardon, nakokaki koyoka yo te. Svp meka lisusu.",
    micAccessError: "Kokoka te kokɔta na micro. Talá ndingisa."
  },
  speed: {
    idle: "Kosala mosala te:",
    talk: "Lisolo:"
  }
};
const avatar$1o = {
  loading: "Nazali ko charger avatar...",
  title: {
    maximize: "Maximiser yango mingi",
    minimize: "Bosala ete ezala moke",
    close: "Bokanga",
    clickToMaximize: "Cliquez pona ko maximiser",
    clickToMinimize: "Cliquez pona ko minimiser"
  },
  error: {
    loadFailed: "Elongi te ko charger avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ezo charger te",
    passwordRequired: "Mot de passe esengeli mpo na fichier .ania chiffré",
    noSource: "Liziba ya avatar epesami te (avatarUrl to avatarData)"
  }
};
const greetings$1p = {
  "0": "Mbote Mbote! Ndenge nini nakoki kosalisa yo lelo?",
  "1": "Mbote! Boyei malamu! Nakoki kosala nini mpo na yo?",
  "2": "Mbote kuna! Esengo mingi ya kosolola na yo!",
  "3": "Mbote! Nazali awa mpo na kosalisa. Ozali na mposa ya nini?",
  "4": "Mbote! Boni? Ndenge nini nakoki kozala na ntina?"
};
const waiting$1p = {
  "0": "Tika nakanisa...",
  "1": "Moment moko...",
  "2": "Traitement ya...",
  "3": "Kaka na segɔnde moko...",
  "4": "Nazo vérifier yango pona bino..."
};
const ln = {
  chat: chat$1o,
  avatar: avatar$1o,
  greetings: greetings$1p,
  waiting: waiting$1p
};
const __vite_glob_0_102 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1o,
  chat: chat$1o,
  default: ln,
  greetings: greetings$1p,
  waiting: waiting$1p
}, Symbol.toStringTag, { value: "Module" }));
const chat$1n = {
  input: {
    placeholder: "ພິມຂໍ້ຄວາມຂອງເຈົ້າ...",
    listening: "ກຳລັງຟັງ..."
  },
  enableSound: "ເປີດໃຊ້ສຽງ",
  stt: {
    transcribing: "ການຖອດຂໍ້ຄວາມ: ",
    micActive: "ໄມໂຄຣໂຟນເປີດຢູ່...",
    heardError: "ຂໍອະໄພ, ບໍ່ໄດ້ຍິນເຈົ້າ. ກະລຸນາລອງອີກຄັ້ງ.",
    micAccessError: "ບໍ່ສາມາດເຂົ້າເຖິງໄມໂຄຣໂຟນໄດ້. ກວດສອບການອະນຸຍາດ."
  },
  speed: {
    idle: "Idle:",
    talk: "ສົນທະນາ:"
  }
};
const avatar$1n = {
  loading: "ກຳລັງໂຫລດຮູບແທນຕົວ...",
  title: {
    maximize: "ສູງສຸດ",
    minimize: "ຫຍໍ້",
    close: "ປິດ",
    clickToMaximize: "ຄລິກເພື່ອຂະຫຍາຍສູງສຸດ",
    clickToMinimize: "ຄລິກເພື່ອຫຍໍ້ລົງ"
  },
  error: {
    loadFailed: "ໂຫຼດຮູບແທນຕົວບໍ່ສຳເລັດ: {{error}} ",
    playerNotLoaded: "AniaPlayer ບໍ່ໄດ້ໂຫລດ",
    passwordRequired: "ຕ້ອງການລະຫັດຜ່ານສໍາລັບການເຂົ້າລະຫັດໄຟລ໌ .ania",
    noSource: "ບໍ່ມີການສະໜອງແຫຼ່ງຮູບແທນຕົວ (avatarUrl ຫຼື avatarData)"
  }
};
const greetings$1o = {
  "0": "ສະບາຍດີ! ຂ້ອຍສາມາດຊ່ວຍເຈົ້າໄດ້ແນວໃດໃນມື້ນີ້?",
  "1": "ສະບາຍດີ! ຍິນດີຕ້ອນຮັບ! ຂ້ອຍສາມາດເຮັດຫຍັງໄດ້ແດ່?",
  "2": "ສະບາຍດີ! ຍິນດີທີ່ໄດ້ລົມກັບເຈົ້າ!",
  "3": "ສະບາຍດີ! ຂ້ອຍຢູ່ທີ່ນີ້ເພື່ອຊ່ວຍ. ທ່ານຕ້ອງການຫຍັງ?",
  "4": "ສະບາຍດີ! ເຈົ້າສະບາຍດີບໍ? ຂ້ອຍຈະເປັນປະໂຫຍດໄດ້ແນວໃດ?"
};
const waiting$1o = {
  "0": "ໃຫ້ຂ້ອຍຄິດ...",
  "1": "ຄາວໜຶ່ງ...",
  "2": "ກຳລັງປະມວນຜົນ...",
  "3": "ວິນາທີ...",
  "4": "ຂ້ອຍ ກຳ ລັງກວດເບິ່ງນັ້ນ ສຳ ລັບເຈົ້າ ..."
};
const lo = {
  chat: chat$1n,
  avatar: avatar$1n,
  greetings: greetings$1o,
  waiting: waiting$1o
};
const __vite_glob_0_103 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1n,
  chat: chat$1n,
  default: lo,
  greetings: greetings$1o,
  waiting: waiting$1o
}, Symbol.toStringTag, { value: "Module" }));
const chat$1m = {
  input: {
    placeholder: "Įveskite savo žinutę...",
    listening: "Klausau..."
  },
  enableSound: "Įjungti garsą",
  stt: {
    transcribing: "Transkribavimas: ",
    micActive: "Mikrofonas aktyvus...",
    heardError: "Atsiprašau, negirdėjau. Bandykite dar kartą.",
    micAccessError: "Nepavyko pasiekti mikrofono. Patikrinkite leidimus."
  },
  speed: {
    idle: "Tuščia eiga:",
    talk: "Pokalbis:"
  }
};
const avatar$1m = {
  loading: "Įkeliamas pseudoportretas...",
  title: {
    maximize: "Maksimaliai",
    minimize: "Sumažinti",
    close: "Uždaryti",
    clickToMaximize: "Spustelėkite, kad padidintumėte",
    clickToMinimize: "Spustelėkite, kad sumažintumėte"
  },
  error: {
    loadFailed: "Nepavyko įkelti avataro: {{error}} ",
    playerNotLoaded: "AniaPlayer neįkeltas",
    passwordRequired: "Užšifruotam .ania failui reikalingas slaptažodis",
    noSource: "Nepateiktas avataro šaltinis (avatarUrl arba avatarData)"
  }
};
const greetings$1n = {
  "0": "Sveiki! Kaip aš galiu tau padėti šiandien?",
  "1": "Sveiki! Sveiki atvykę! Ką aš galiu jums padėti?",
  "2": "Sveiki! Labai malonu su tavimi pasikalbėti!",
  "3": "Sveiki! Aš čia, kad padėčiau. ko tau reikia?",
  "4": "Sveiki! kaip sekasi? Kaip aš galiu būti naudingas?"
};
const waiting$1n = {
  "0": "Leisk man pagalvoti...",
  "1": "Viena akimirka...",
  "2": "Apdorojama...",
  "3": "Tik sekundę...",
  "4": "Aš tai tikrinu už jus..."
};
const lt = {
  chat: chat$1m,
  avatar: avatar$1m,
  greetings: greetings$1n,
  waiting: waiting$1n
};
const __vite_glob_0_104 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1m,
  chat: chat$1m,
  default: lt,
  greetings: greetings$1n,
  waiting: waiting$1n
}, Symbol.toStringTag, { value: "Module" }));
const chat$1l = {
  input: {
    placeholder: "Īroksti sovu ziņu...",
    listening: "Klausūtīs..."
  },
  enableSound: "Īspējuot skaņu",
  stt: {
    transcribing: "Pīraksteišona: ",
    micActive: "Mikrofons aktivs...",
    heardError: "Atlaidit, navarēju jūs dzierdēt. Lyudzu, raugi vēļreiz.",
    micAccessError: "Navar pīkļyut mikrofonam. Pārbaudiet atļaujas."
  },
  speed: {
    idle: "Tukšums:",
    talk: "Saruna:"
  }
};
const avatar$1l = {
  loading: "Īluodejūt avataru...",
  title: {
    maximize: "Maksimali palelynuot",
    minimize: "Samazynuot",
    close: "Aizvērt",
    clickToMaximize: "Nūspīd, lai maksimali palelynuotu .",
    clickToMinimize: "Nūspīd, lai samazynuotu ."
  },
  error: {
    loadFailed: "Naizadeve īluodēt avataru: {{error}} . ",
    playerNotLoaded: "AniaSpēlētuojs nav īluodāts",
    passwordRequired: "100 doc#1159 Vajadzeiga parole šifrātam .ania failam .",
    noSource: "Nav snāgts avatara olūts (avataraUrl voi avataraDati)"
  }
};
const greetings$1m = {
  "0": "Sveiks! Kai es varu tev paleidzēt šudiņ?",
  "1": "Loba dīna! Sveicynuot! Kū es tev varu dareit?",
  "2": "Vasals! Tik prīca ar tevi parunuot!",
  "3": "Loba dīna! Es asu ite, lai paleidzātu. Kū tev vajag?",
  "4": "Vasals! Kai tev īt? Kai es varu byut nūdereigs?"
};
const waiting$1m = {
  "0": "Ļauj maņ padūmuot...",
  "1": "Vīnu breidi...",
  "2": "Apstruode...",
  "3": "Tikai sekundi...",
  "4": "Es tū puorbaudu deļ teve..."
};
const ltg = {
  chat: chat$1l,
  avatar: avatar$1l,
  greetings: greetings$1m,
  waiting: waiting$1m
};
const __vite_glob_0_105 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1l,
  chat: chat$1l,
  default: ltg,
  greetings: greetings$1m,
  waiting: waiting$1m
}, Symbol.toStringTag, { value: "Module" }));
const chat$1k = {
  input: {
    placeholder: "Ndik ote mari...",
    listening: "Winjo..."
  },
  enableSound: "Yawo Dwol",
  stt: {
    transcribing: "Ndiko weche: ",
    micActive: "Maikrofon tiyo...",
    heardError: "<2Zepa> Akwayo ng'uono, ne ok anyal winjo wachni. Yie mondo item kendo.",
    micAccessError: "Ok nyal yudo maikrofon. Rang chike ma imiye."
  },
  speed: {
    idle: "Ok otiyo:",
    talk: "Wach:"
  }
};
const avatar$1k = {
  loading: "Oting'o tipo...",
  title: {
    maximize: "Medo maduong'",
    minimize: "Duok piny",
    close: "Lor",
    clickToMaximize: "Gwel mondo imed",
    clickToMinimize: "Gwel mondo iduok piny"
  },
  error: {
    loadFailed: "Orem keto avatar: {{error}} ",
    playerNotLoaded: "Jatugo mar Ania pok oting'o",
    passwordRequired: "Wach mar kadho dwarore mar fail mar .ania mondiki",
    noSource: "Onge kama avatar wuokie (Url mar rang'iny kata data mar rang'iny)"
  }
};
const greetings$1l = {
  "0": "Amosi! Ere kaka anyalo konyi sani?",
  "1": "Misawa! Machiegni! Ang’o ma anyalo timo ni in?",
  "2": "Amosi kanyo! Omiyo, amor ahinya wuoyo kodi!",
  "3": "Misawa! An kae mondo akony. Ang'o ma dwarore?",
  "4": "Amosi! Idhi nade? Ere kaka inyalo bedo gi konyruok?"
};
const waiting$1l = {
  "0": "We apar...",
  "1": "Kinde achiel...",
  "2": "Tiyo...",
  "3": "Sekon achiel kende...",
  "4": "Arang'o mano kuomi..."
};
const luo = {
  chat: chat$1k,
  avatar: avatar$1k,
  greetings: greetings$1l,
  waiting: waiting$1l
};
const __vite_glob_0_106 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1k,
  chat: chat$1k,
  default: luo,
  greetings: greetings$1l,
  waiting: waiting$1l
}, Symbol.toStringTag, { value: "Module" }));
const chat$1j = {
  input: {
    placeholder: "I message kha type la...",
    listening: "Ngaithlatu..."
  },
  enableSound: "Sound tih kha enable rawh",
  stt: {
    transcribing: "Thuziak (Transcribing) tih hi: ",
    micActive: "Microphone active a nih chuan...",
    heardError: "Ngaidam rawh, ka hre thei lo. Khawngaihin han lo try leh teh.",
    micAccessError: "Microphone a lut thei lo. Permissions te chu enfiah rawh."
  },
  speed: {
    idle: "Idle-ah chuan:",
    talk: "Thusawi:"
  }
};
const avatar$1j = {
  loading: "Avatar load mek a ni...",
  title: {
    maximize: "Maximize rawh",
    minimize: "Minimize rawh",
    close: "Khar rawh",
    clickToMaximize: "Maximize turin click la",
    clickToMinimize: "Click la, minimize rawh"
  },
  error: {
    loadFailed: "Avatar load theih loh: {{error}} ",
    playerNotLoaded: "AniaPlayer a load lo",
    passwordRequired: "Encrypted .ania file atan chuan password a ngai",
    noSource: "Avatar source pek a ni lo (avatarUrl emaw avatarData emaw)"
  }
};
const greetings$1k = {
  "0": "Hi! Vawiin hian engtin nge ka puih theih ang che?",
  "1": "Chibai! Chibai! Engtin nge ka tihsak theih ang che?",
  "2": "Chibai le! Ka biak theih che hi ka lawm tak zet!",
  "3": "Chibai! Ka tanpui turin ka lo kal a ni. Eng nge i mamawh?",
  "4": "Chibai! I dam em? Engtin nge ka tangkai theih ang?"
};
const waiting$1k = {
  "0": "Ka ngaihtuah ang...",
  "1": "Hun khat chu...",
  "2": "Processing a ni...",
  "3": "Second khat chauh...",
  "4": "Chu chu ka check sak che a ni..."
};
const lus = {
  chat: chat$1j,
  avatar: avatar$1j,
  greetings: greetings$1k,
  waiting: waiting$1k
};
const __vite_glob_0_107 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1j,
  chat: chat$1j,
  default: lus,
  greetings: greetings$1k,
  waiting: waiting$1k
}, Symbol.toStringTag, { value: "Module" }));
const chat$1i = {
  input: {
    placeholder: "Ierakstiet savu ziņojumu...",
    listening: "Klausos..."
  },
  enableSound: "Iespējot skaņu",
  stt: {
    transcribing: "Transkribēšana: ",
    micActive: "Mikrofons aktīvs...",
    heardError: "Atvainojiet, nevarēju jūs dzirdēt. Lūdzu, mēģiniet vēlreiz.",
    micAccessError: "Nevar piekļūt mikrofonam. Pārbaudiet atļaujas."
  },
  speed: {
    idle: "Dīkstāve:",
    talk: "Runājiet:"
  }
};
const avatar$1i = {
  loading: "Notiek iemiesojuma ielāde...",
  title: {
    maximize: "Maksimizēt",
    minimize: "Minimizēt",
    close: "Aizvērt",
    clickToMaximize: "Noklikšķiniet, lai palielinātu",
    clickToMinimize: "Noklikšķiniet, lai samazinātu"
  },
  error: {
    loadFailed: "Neizdevās ielādēt iemiesojumu: {{error}} ",
    playerNotLoaded: "AniaPlayer nav ielādēts",
    passwordRequired: "Šifrētam .ania failam nepieciešama parole",
    noSource: "Nav norādīts iemiesojuma avots (avatarUrl vai avatarData)"
  }
};
const greetings$1j = {
  "0": "Sveiki! Kā es varu jums palīdzēt šodien?",
  "1": "Sveiki! Laipni lūdzam! Ko es varu darīt jūsu labā?",
  "2": "Sveiki! Tik priecīgs ar jums runāt!",
  "3": "Sveiki! Esmu šeit, lai palīdzētu. Ko tev vajag?",
  "4": "Sveiki! kā tev iet? Kā es varu būt noderīgs?"
};
const waiting$1j = {
  "0": "Ļaujiet man padomāt...",
  "1": "Viens mirklis...",
  "2": "Notiek apstrāde...",
  "3": "Tikai sekundi...",
  "4": "Es to pārbaudu jūsu vietā..."
};
const lv = {
  chat: chat$1i,
  avatar: avatar$1i,
  greetings: greetings$1j,
  waiting: waiting$1j
};
const __vite_glob_0_108 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1i,
  chat: chat$1i,
  default: lv,
  greetings: greetings$1j,
  waiting: waiting$1j
}, Symbol.toStringTag, { value: "Module" }));
const chat$1h = {
  input: {
    placeholder: "अपन संदेश टाइप करू...",
    listening: "सुनैत छी..."
  },
  enableSound: "ध्वनि सक्षम करू",
  stt: {
    transcribing: "प्रतिलेखन : १. ",
    micActive: "माइक्रोफोन सक्रिय...",
    heardError: "माफ करब, अहाँक बात नहि सुनि सकलहुँ। कृपया पुनः प्रयास करू।",
    micAccessError: "माइक तक पहुँचने में असमर्थ। अनुमति जाँच करू।"
  },
  speed: {
    idle: "निष्क्रिय : १.",
    talk: "गप्प-सप्प : १."
  }
};
const avatar$1h = {
  loading: "अवतार लोड भ रहल अछि...",
  title: {
    maximize: "अधिकतम करब",
    minimize: "न्यूनतम करब",
    close: "बंद करू",
    clickToMaximize: "अधिकतम करबाक लेल क्लिक करू",
    clickToMinimize: "न्यूनतम करबाक लेल क्लिक करू"
  },
  error: {
    loadFailed: "अवतार लोड करबामे विफल: {{error}} ",
    playerNotLoaded: "AniaPlayer लोड नहि भेल",
    passwordRequired: "एन्क्रिप्टेड .ania फाइल क लेल पासवर्ड आवश्यक अछि",
    noSource: "कोनो अवतार स्रोत उपलब्ध नै अछि (avatarUrl या avatarData)"
  }
};
const greetings$1i = {
  "0": "हाय! आइ हम अहाँक कोना मदद करब।",
  "1": "नमस्कार! स्वागत! हम अहाँक लेल की क' सकैत छी?",
  "2": "नमस्ते! अहाँ स गप्प करबा मे एतेक खुशी भेल!",
  "3": "नमस्कार! हम एतय मदद करय लेल आयल छी। अहाँकेँ की चाही?",
  "4": "नमस्कार! अहांक कोना छी? हम कोना उपयोगी भ' सकब।"
};
const waiting$1i = {
  "0": "हम सोचैत छी...",
  "1": "एक क्षण...",
  "2": "प्रसंस्करण के...",
  "3": "बस एक सेकेंड के...",
  "4": "हम अहाँक लेल से चेक क' रहल छी..."
};
const mai = {
  chat: chat$1h,
  avatar: avatar$1h,
  greetings: greetings$1i,
  waiting: waiting$1i
};
const __vite_glob_0_109 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1h,
  chat: chat$1h,
  default: mai,
  greetings: greetings$1i,
  waiting: waiting$1i
}, Symbol.toStringTag, { value: "Module" }));
const chat$1g = {
  input: {
    placeholder: "Ketik pesannu...",
    listening: "Nalangngere..."
  },
  enableSound: "Enable Sound",
  stt: {
    transcribing: "Antulisiki: ",
    micActive: "Microphone active...",
    heardError: "Maaf, tena nakkulle kulangngere. Please try again.",
    micAccessError: "Tena nakkulle antama ri mikrofon. Check permissions."
  },
  speed: {
    idle: "Tena anjama:",
    talk: "A'bicara:"
  }
};
const avatar$1g = {
  loading: "Loading avatar...",
  title: {
    maximize: "Maksimalkan",
    minimize: "Kurangi",
    close: "tutupi",
    clickToMaximize: "Click to maximize",
    clickToMinimize: "Klik untu' ampa'kurangi"
  },
  error: {
    loadFailed: "Tena nakkulle antama avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer tena na ni muat",
    passwordRequired: "Kata sandi niparalluangi untuk file .ania yang terenkripsi",
    noSource: "Tena sumber avatar nipassareang (avatarUrl atau avatarData)"
  }
};
const greetings$1h = {
  "0": "Hi! Antekamma bateku ambantuko anne alloa?",
  "1": "Halo! Salama battu! What can I do for you?",
  "2": "Woy anjorengnga! Sanna' rannuna a'bicara siagang ikatte!",
  "3": "Halo! I'm here to help. Apa nuparalluangi?",
  "4": "Hai! Apa kareba? Antekamma bateku akkulle a'matu-matu?"
};
const waiting$1h = {
  "0": "Let me think...",
  "1": "Se're wattu...",
  "2": "Amproses...",
  "3": "Se're detikji...",
  "4": "Inakke ansalidiki anjo untuk ikatte..."
};
const mak = {
  chat: chat$1g,
  avatar: avatar$1g,
  greetings: greetings$1h,
  waiting: waiting$1h
};
const __vite_glob_0_110 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1g,
  chat: chat$1g,
  default: mak,
  greetings: greetings$1h,
  waiting: waiting$1h
}, Symbol.toStringTag, { value: "Module" }));
const chat$1f = {
  input: {
    placeholder: "Soraty ny hafatrao...",
    listening: "Mihaino..."
  },
  enableSound: "Alefaso ny feo",
  stt: {
    transcribing: "Mandika: ",
    micActive: "Microphone mavitrika...",
    heardError: "Miala tsiny fa tsy nahare anao. Andramo indray azafady.",
    micAccessError: "Tsy afaka miditra mikrofona. Jereo ny fahazoan-dàlana."
  },
  speed: {
    idle: "tsy miasa:",
    talk: "Resaka:"
  }
};
const avatar$1f = {
  loading: "Mametraka avatar...",
  title: {
    maximize: "Maximize",
    minimize: "Manamaivana",
    close: "Akatona",
    clickToMaximize: "Kitiho raha ampitomboina",
    clickToMinimize: "Tsindrio raha hanamaivana"
  },
  error: {
    loadFailed: "Tsy nahomby ny fampidirana avatar: {{error}} ",
    playerNotLoaded: "Tsy voaloa ny AniaPlayer",
    passwordRequired: "Ilaina ny tenimiafina ho an'ny rakitra .ania miafina",
    noSource: "Tsy misy loharano avatar omena (avatarUrl na avatarData)"
  }
};
const greetings$1g = {
  "0": "Salama! Ahoana no ahafahako manampy anao anio?",
  "1": "Salama! Tongasoa! Inona no azoko atao ho anao?",
  "2": "Salama e! Tena faly miresaka aminao!",
  "3": "Salama! Eto aho hanampy. Inona no ilainao?",
  "4": "Salama! Manao ahoana ianao? Ahoana no hahasoa ahy?"
};
const waiting$1g = {
  "0": "Avelao aho hieritreritra...",
  "1": "Indray mandeha...",
  "2": "Mikarakara...",
  "3": "Kely kely...",
  "4": "Manamarina izany ho anao aho..."
};
const mg = {
  chat: chat$1f,
  avatar: avatar$1f,
  greetings: greetings$1g,
  waiting: waiting$1g
};
const __vite_glob_0_111 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1f,
  chat: chat$1f,
  default: mg,
  greetings: greetings$1g,
  waiting: waiting$1g
}, Symbol.toStringTag, { value: "Module" }));
const chat$1e = {
  input: {
    placeholder: "Patohia to karere...",
    listening: "Whakarongo..."
  },
  enableSound: "Whakahohe Oro",
  stt: {
    transcribing: "Whakatuhi: ",
    micActive: "Hohe hopuoro...",
    heardError: "Aroha mai, kaore i rongo i a koe. Me ngana ano.",
    micAccessError: "Kaore e taea te uru ki te hopuoro. Tirohia nga whakaaetanga."
  },
  speed: {
    idle: "Karekau:",
    talk: "Korero:"
  }
};
const avatar$1e = {
  loading: "Uta ana te avatar...",
  title: {
    maximize: "Whakanuia",
    minimize: "Whakaiti",
    close: "Katia",
    clickToMaximize: "Pāwhiri ki te whakanui",
    clickToMinimize: "Patohia ki te whakaiti"
  },
  error: {
    loadFailed: "I rahua te uta i te avatar: {{error}} ",
    playerNotLoaded: "Kaore a AniaPlayer i utaina",
    passwordRequired: "Kupuhipa e hiahiatia ana mo te konae .ania whakamunatia",
    noSource: "Kaore he puna avatar i whakaratohia (avatarUrl, avatarData ranei)"
  }
};
const greetings$1f = {
  "0": "Kia ora! Me pehea taku awhina i a koe i tenei ra?",
  "1": "Kia ora! Nau mai haere mai! He aha taku mahi mo koe?",
  "2": "Kia ora! Tena koa ki te korero ki a koe!",
  "3": "Kia ora! Kei konei ahau ki te awhina. He aha e hiahia ana koe?",
  "4": "Kia ora! Kei te pehea koe? Me pehea e whai hua ai ahau?"
};
const waiting$1f = {
  "0": "Kia whakaaro ahau...",
  "1": "Kotahi te wa...",
  "2": "Tukatuka...",
  "3": "He rua noa...",
  "4": "Kei te tirotiro ahau mo koe..."
};
const mi = {
  chat: chat$1e,
  avatar: avatar$1e,
  greetings: greetings$1f,
  waiting: waiting$1f
};
const __vite_glob_0_112 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1e,
  chat: chat$1e,
  default: mi,
  greetings: greetings$1f,
  waiting: waiting$1f
}, Symbol.toStringTag, { value: "Module" }));
const chat$1d = {
  input: {
    placeholder: "Ketik pasan Sanak...",
    listening: "Mandangakan..."
  },
  enableSound: "Aktifkan Suaro",
  stt: {
    transcribing: "Mantranskripsikan: ",
    micActive: "Mikrofon aktif...",
    heardError: "Maaf, indak bisa mandanga. Tolong cubo baliak.",
    micAccessError: "Indak dapek maakses mikrofon. Pareso izinnyo."
  },
  speed: {
    idle: "Nganggur:",
    talk: "Bicaro:"
  }
};
const avatar$1d = {
  loading: "Mamuek gambar...",
  title: {
    maximize: "Maksimalkan",
    minimize: "Minimalisir",
    close: "Tutuik",
    clickToMaximize: "Klik untuak mamaksimalkan",
    clickToMinimize: "Klik untuak maminimalikan"
  },
  error: {
    loadFailed: "Gagal mamuek avatar: {{error}} ",
    playerNotLoaded: "AniaPamain indak dimuek",
    passwordRequired: "Kato sandi diparalukan untuak berkas .ania nan dienkripsi",
    noSource: "Indak ado sumber avatar nan disadiokan (Url avatar atauData avatar)"
  }
};
const greetings$1e = {
  "0": "Hai! Baa caronyo ambo bisa mambantu sanak hari ko?",
  "1": "Halo! Salamaik datang! Apo nan bisa ambo lakukan untuak sanak?",
  "2": "Halo nan di sinan! Jadi sanang mangecek jo sanak!",
  "3": "Halo! Ambo di siko untuak mambantu. Apo nan paralu?",
  "4": "Oi! Baa kaba angku? Baa caronyo ambo bisa baguno?"
};
const waiting$1e = {
  "0": "Bia ambo bapikia...",
  "1": "Sakatiko...",
  "2": "Pangolahan...",
  "3": "Sadetik sajo...",
  "4": "Ambo mamareso itu untuak sanak..."
};
const min = {
  chat: chat$1d,
  avatar: avatar$1d,
  greetings: greetings$1e,
  waiting: waiting$1e
};
const __vite_glob_0_113 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1d,
  chat: chat$1d,
  default: min,
  greetings: greetings$1e,
  waiting: waiting$1e
}, Symbol.toStringTag, { value: "Module" }));
const chat$1c = {
  input: {
    placeholder: "Напишете ја вашата порака...",
    listening: "Слушање..."
  },
  enableSound: "Овозможи звук",
  stt: {
    transcribing: "Препишување: ",
    micActive: "Активен микрофон...",
    heardError: "Извини, не можев да те слушнам. Ве молиме обидете се повторно.",
    micAccessError: "Не може да се пристапи до микрофонот. Проверете ги дозволите."
  },
  speed: {
    idle: "Неактивен:",
    talk: "Разговор:"
  }
};
const avatar$1c = {
  loading: "Се вчитува аватарот...",
  title: {
    maximize: "Максимизирај",
    minimize: "Минимизирајте",
    close: "Затвори",
    clickToMaximize: "Кликнете за да го максимизирате",
    clickToMinimize: "Кликнете за минимизирање"
  },
  error: {
    loadFailed: "Не успеа да се вчита аватарот: {{error}} ",
    playerNotLoaded: "AniaPlayer не е вчитан",
    passwordRequired: "Потребна е лозинка за шифрирана датотека .ania",
    noSource: "Не е обезбеден извор на аватар (avatarUrl или avatarData)"
  }
};
const greetings$1d = {
  "0": "Здраво! Како можам да ви помогнам денес?",
  "1": "Здраво! Добредојдовте! Што можам да направам за тебе?",
  "2": "Здраво! Многу ми е мило што разговарам со вас!",
  "3": "Здраво! Јас сум тука да помогнам. Што ви треба?",
  "4": "Здраво! како си? Како можам да бидам корисен?"
};
const waiting$1d = {
  "0": "Дозволете ми да размислам...",
  "1": "Еден момент...",
  "2": "Се обработува...",
  "3": "Само секунда...",
  "4": "Тоа ти го проверувам..."
};
const mk = {
  chat: chat$1c,
  avatar: avatar$1c,
  greetings: greetings$1d,
  waiting: waiting$1d
};
const __vite_glob_0_114 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1c,
  chat: chat$1c,
  default: mk,
  greetings: greetings$1d,
  waiting: waiting$1d
}, Symbol.toStringTag, { value: "Module" }));
const chat$1b = {
  input: {
    placeholder: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    listening: "കേൾക്കുന്നു..."
  },
  enableSound: "ശബ്ദം പ്രവർത്തനക്ഷമമാക്കുക",
  stt: {
    transcribing: "ട്രാൻസ്ക്രൈബ് ചെയ്യുന്നത്: ",
    micActive: "മൈക്രോഫോൺ സജീവമാണ്...",
    heardError: "ക്ഷമിക്കണം, നിങ്ങൾ പറയുന്നത് കേൾക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    micAccessError: "മൈക്രോഫോൺ ആക്‌സസ് ചെയ്യാനാവുന്നില്ല. അനുമതികൾ പരിശോധിക്കുക."
  },
  speed: {
    idle: "നിഷ്‌ക്രിയം:",
    talk: "സംവാദം:"
  }
};
const avatar$1b = {
  loading: "അവതാർ ലോഡ് ചെയ്യുന്നു...",
  title: {
    maximize: "പരമാവധിയാക്കുക",
    minimize: "ചെറുതാക്കുക",
    close: "അടയ്ക്കുക",
    clickToMaximize: "പരമാവധിയാക്കാൻ ക്ലിക്ക് ചെയ്യുക",
    clickToMinimize: "ചെറുതാക്കാൻ ക്ലിക്ക് ചെയ്യുക"
  },
  error: {
    loadFailed: "അവതാർ ലോഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു: {{error}} ",
    playerNotLoaded: "AniaPlayer ലോഡ് ചെയ്തിട്ടില്ല",
    passwordRequired: "എൻക്രിപ്റ്റ് ചെയ്ത .ania ഫയലിന് പാസ്‌വേഡ് ആവശ്യമാണ്",
    noSource: "അവതാർ ഉറവിടങ്ങളൊന്നും നൽകിയിട്ടില്ല (avatarUrl അല്ലെങ്കിൽ avatarData)"
  }
};
const greetings$1c = {
  "0": "ഹായ്! ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?",
  "1": "ഹലോ! സ്വാഗതം! എനിക്ക് നിനക്കായി എന്തുചെയ്യാൻ കഴിയൂം?",
  "2": "ഹേയ്, അവിടെയുണ്ടോ! നിങ്ങളോട് സംസാരിച്ചതിൽ വളരെ സന്തോഷം!",
  "3": "ഹലോ! സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്. നിനക്കെന്താണ് ആവശ്യം?",
  "4": "ഹായ്! സുഖമാണോ? എനിക്ക് എങ്ങനെ ഉപയോഗപ്രദമാകും?"
};
const waiting$1c = {
  "0": "ഞാൻ ആലോചിക്കട്ടെ...",
  "1": "ഒരു നിമിഷം...",
  "2": "പ്രോസസ്സ് ചെയ്യുന്നു...",
  "3": "ഒരു നിമിഷം...",
  "4": "ഞാൻ അത് നിങ്ങൾക്കായി പരിശോധിക്കുന്നു..."
};
const ml = {
  chat: chat$1b,
  avatar: avatar$1b,
  greetings: greetings$1c,
  waiting: waiting$1c
};
const __vite_glob_0_115 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1b,
  chat: chat$1b,
  default: ml,
  greetings: greetings$1c,
  waiting: waiting$1c
}, Symbol.toStringTag, { value: "Module" }));
const chat$1a = {
  input: {
    placeholder: "Зурвасаа бичнэ үү...",
    listening: "Сонсож байна..."
  },
  enableSound: "Дууг идэвхжүүл",
  stt: {
    transcribing: "Шилжүүлэх: ",
    micActive: "Микрофон идэвхтэй...",
    heardError: "Уучлаарай, таныг сонсож чадсангүй. Дахин оролдоно уу.",
    micAccessError: "Микрофонд хандах боломжгүй. Зөвшөөрлийг шалгана уу."
  },
  speed: {
    idle: "Сул зогсолт:",
    talk: "Ярилцах:"
  }
};
const avatar$1a = {
  loading: "Аватарыг ачаалж байна...",
  title: {
    maximize: "Томруулах",
    minimize: "Багасгах",
    close: "Хаах",
    clickToMaximize: "Томруулахын тулд товшино уу",
    clickToMinimize: "Багасгахын тулд товшино уу"
  },
  error: {
    loadFailed: "Аватарыг ачаалж чадсангүй: {{error}} ",
    playerNotLoaded: "AniaPlayer ачаалагдаагүй байна",
    passwordRequired: "Шифрлэгдсэн .ania файлд нууц үг шаардлагатай",
    noSource: "Аватар эх сурвалж өгөөгүй (avatarUrl эсвэл avatarData)"
  }
};
const greetings$1b = {
  "0": "Сайн уу! Өнөөдөр би чамд яаж туслах вэ?",
  "1": "Сайн байна уу! Тавтай морил! Би чиний төлөө юу хийж чадах вэ?",
  "2": "Сайн уу! Тантай ярилцаж байгаадаа баяртай байна!",
  "3": "Сайн байна уу! Би туслахаар ирлээ. Танд юу хэрэгтэй вэ?",
  "4": "Сайн уу! Сайн байна уу? Би яаж ашигтай байх вэ?"
};
const waiting$1b = {
  "0": "Бодоод үз дээ...",
  "1": "Нэг хором...",
  "2": "Боловсруулж байна...",
  "3": "Ганцхан секунд...",
  "4": "Би үүнийг чиний төлөө шалгаж байна ..."
};
const mn = {
  chat: chat$1a,
  avatar: avatar$1a,
  greetings: greetings$1b,
  waiting: waiting$1b
};
const __vite_glob_0_116 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1a,
  chat: chat$1a,
  default: mn,
  greetings: greetings$1b,
  waiting: waiting$1b
}, Symbol.toStringTag, { value: "Module" }));
const chat$19 = {
  input: {
    placeholder: "ꯑꯗꯣꯃꯒꯤ ꯄꯥꯎꯖꯦꯜ ꯑꯗꯨ ꯇꯥꯏꯞ ꯇꯧꯕꯤꯌꯨ...",
    listening: "ꯇꯥꯕꯥ ꯐꯪꯂꯤꯕꯥ..."
  },
  enableSound: "ꯁꯥꯎꯟꯗ ꯏꯅꯦꯕꯜ ꯇꯧꯕꯥ꯫",
  stt: {
    transcribing: "ꯇ꯭ꯔꯥꯟꯁꯛꯔꯤꯄꯁꯟ ꯇꯧꯕꯥ: ꯱. ",
    micActive: "ꯃꯥꯏꯛꯔꯣꯐꯣꯟ ꯑꯦꯛꯇꯤꯕ ꯑꯣꯏꯕꯥ...",
    heardError: "ꯁꯣꯔꯤ, ꯅꯉꯒꯤ ꯋꯥꯐꯝ ꯇꯥꯕꯥ ꯉꯃꯈꯤꯗꯦ꯫ ꯆꯥꯅꯕꯤꯗꯨꯅꯥ ꯑꯃꯨꯛ ꯍꯟꯅꯥ ꯍꯣꯠꯅꯕꯤꯌꯨ꯫",
    micAccessError: "ꯃꯥꯏꯛꯔꯣꯐꯣꯟ ꯑꯦꯛꯁꯦꯁ ꯇꯧꯕꯥ ꯉꯃꯗꯕꯥ꯫ ꯑꯌꯥꯕꯥ ꯄꯤꯌꯨ꯫"
  },
  speed: {
    idle: "ꯑꯥꯏꯗꯦꯟꯇꯤꯇꯤ ꯂꯩꯕꯥ: .",
    talk: "ꯋꯥꯔꯤ ꯁꯥꯅꯕꯥ: ꯱."
  }
};
const avatar$19 = {
  loading: "ꯑꯋꯇꯥꯔ ꯂꯣꯗ ꯇꯧꯔꯤ...",
  title: {
    maximize: "ꯃꯦꯛꯁꯤꯃꯥꯏꯖ ꯇꯧꯕꯥ꯫",
    minimize: "ꯃꯤꯅꯤꯃꯥꯏꯖ ꯇꯧꯕꯥ꯫",
    close: "ꯀ꯭ꯂꯣꯖ ꯇꯧꯕꯥ꯫",
    clickToMaximize: "ꯃꯦꯛꯁꯤꯃꯥꯏꯖ ꯇꯧꯅꯕꯥ ꯀ꯭ꯂꯤꯛ ꯇꯧꯔꯣ꯫",
    clickToMinimize: "ꯃꯤꯅꯤꯃꯥꯏꯖ ꯇꯧꯅꯕꯥ ꯀ꯭ꯂꯤꯛ ꯇꯧꯔꯣ꯫"
  },
  error: {
    loadFailed: "ꯑꯋꯇꯥꯔ ꯂꯣꯗ ꯇꯧꯕꯥ ꯉꯃꯗꯦ: {{error}} ",
    playerNotLoaded: "AniaPlayer ꯂꯣꯗ ꯇꯧꯗ꯭ꯔꯤ꯫",
    passwordRequired: "ꯑꯦꯅꯛꯔꯤꯞꯇ ꯇꯧꯔꯕꯥ .ania ꯐꯥꯏꯂꯒꯤꯗꯃꯛ ꯄꯥꯁꯋꯥꯔꯗ ꯃꯊꯧ ꯇꯥꯏ꯫",
    noSource: "ꯑꯋꯇꯥꯔ ꯁꯣꯔꯁ ꯑꯃꯠꯇꯥ ꯄꯤꯈꯤꯗꯦ (avatarUrl ꯅꯠꯔꯒꯥ avatarData)"
  }
};
const greetings$1a = {
  "0": "ꯍꯥꯌ! ꯉꯁꯤ ꯑꯩꯍꯥꯛꯅꯥ ꯑꯗꯣꯃꯕꯨ ꯀꯔꯝꯅꯥ ꯃꯇꯦꯡ ꯄꯥꯡꯒꯅꯤ?",
  "1": "ꯍꯦꯜꯂꯣ! ꯇꯔꯥꯝꯅ ꯑꯣꯛꯆꯔꯤ! ꯑꯩꯅꯥ ꯅꯉꯒꯤꯗꯃꯛ ꯀꯔꯤ ꯇꯧꯕꯥ ꯌꯥꯕꯒꯦ?",
  "2": "ꯍꯥꯌ ꯃꯐꯃꯗꯨꯗꯥ! ꯑꯗꯣꯃꯒꯥ ꯋꯥꯔꯤ ꯁꯥꯅꯕꯗꯥ ꯌꯥꯝꯅꯥ ꯅꯨꯡꯉꯥꯏꯕꯥ ꯐꯥꯑꯣꯏ!",
  "3": "ꯍꯦꯜꯂꯣ! ꯑꯩꯍꯥꯛ ꯃꯐꯝ ꯑꯁꯤꯗꯥ ꯃꯇꯦꯡ ꯄꯥꯡꯅꯕꯥ ꯂꯥꯛꯂꯤ꯫ ꯑꯗꯣꯝ ꯀꯔꯤ ꯃꯊꯧ ꯇꯥꯔꯤꯕꯒꯦ?",
  "4": "ꯍꯥꯏ! ꯑꯗꯣꯝ ꯀꯝꯗꯧꯔꯤ? ꯑꯩꯅꯥ ꯀꯔꯝꯅꯥ ꯀꯥꯟꯅꯕꯥ ꯐꯪꯒꯅꯤ?"
};
const waiting$1a = {
  "0": "ꯑꯩꯍꯥꯛꯅꯥ ꯈꯅꯖꯒꯦ...",
  "1": "ꯃꯤꯀꯨꯞ ꯑꯃꯗꯥ...",
  "2": "ꯄ꯭ꯔꯣꯁꯦꯁꯤꯡ ꯇꯧꯕꯥ...",
  "3": "ꯁꯦꯀꯦꯟꯗ ꯑꯃꯈꯛꯇꯪ...",
  "4": "ꯑꯩꯍꯥꯛꯅꯥ ꯑꯗꯣꯃꯒꯤꯗꯃꯛ ꯃꯗꯨ ꯆꯦꯛ ꯇꯧꯔꯤ..."
};
const mniMtei = {
  chat: chat$19,
  avatar: avatar$19,
  greetings: greetings$1a,
  waiting: waiting$1a
};
const __vite_glob_0_117 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$19,
  chat: chat$19,
  default: mniMtei,
  greetings: greetings$1a,
  waiting: waiting$1a
}, Symbol.toStringTag, { value: "Module" }));
const chat$18 = {
  input: {
    placeholder: "तुमचा संदेश टाइप करा...",
    listening: "ऐकत आहे..."
  },
  enableSound: "ध्वनी सक्षम करा",
  stt: {
    transcribing: "लिप्यंतरण: ",
    micActive: "मायक्रोफोन सक्रिय...",
    heardError: "सॉरी, तुम्हाला ऐकू आले नाही. कृपया पुन्हा प्रयत्न करा.",
    micAccessError: "मायक्रोफोनमध्ये प्रवेश करण्यात अक्षम. परवानग्या तपासा."
  },
  speed: {
    idle: "निष्क्रिय:",
    talk: "चर्चा:"
  }
};
const avatar$18 = {
  loading: "अवतार लोड करत आहे...",
  title: {
    maximize: "कमाल करा",
    minimize: "कमी करा",
    close: "बंद करा",
    clickToMaximize: "कमाल करण्यासाठी क्लिक करा",
    clickToMinimize: "लहान करण्यासाठी क्लिक करा"
  },
  error: {
    loadFailed: "अवतार लोड करण्यात अयशस्वी: {{error}} ",
    playerNotLoaded: "AniaPlayer लोड नाही",
    passwordRequired: "एनक्रिप्टेड .ania फाइलसाठी पासवर्ड आवश्यक आहे",
    noSource: "कोणताही अवतार स्रोत प्रदान केलेला नाही (avatarUrl किंवा avatarData)"
  }
};
const greetings$19 = {
  "0": "हाय! आज मी तुम्हाला कशी मदत करू शकतो?",
  "1": "नमस्कार! स्वागत आहे! मी तुमच्यासाठी काय करू शकतो?",
  "2": "नमस्कार! तुमच्याशी बोलून खूप आनंद झाला!",
  "3": "नमस्कार! मी मदत करण्यासाठी येथे आहे. तुला काय हवे आहे?",
  "4": "हाय! कसे आहात? मी कसा उपयोगी होऊ शकतो?"
};
const waiting$19 = {
  "0": "मला विचार करू दे...",
  "1": "एक क्षण...",
  "2": "प्रक्रिया करत आहे...",
  "3": "फक्त एक सेकंद...",
  "4": "मी ते तुमच्यासाठी तपासत आहे..."
};
const mr = {
  chat: chat$18,
  avatar: avatar$18,
  greetings: greetings$19,
  waiting: waiting$19
};
const __vite_glob_0_118 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$18,
  chat: chat$18,
  default: mr,
  greetings: greetings$19,
  waiting: waiting$19
}, Symbol.toStringTag, { value: "Module" }));
const chat$17 = {
  input: {
    placeholder: "تاڤق ميسيج اندا...",
    listening: "مندڠر..."
  },
  enableSound: "مڠوبهسواي سوارا",
  stt: {
    transcribing: "ترنسكريڤسي: ",
    micActive: "ميكروفون اكتيف...",
    heardError: "معاف، تيدق داڤت مندڠر اندا. سيلا چوبا سمولا.",
    micAccessError: "تيدق داڤت مڠاكسس ميكروفون. چيك كبنرن."
  },
  speed: {
    idle: "تيدق برڬرق:",
    talk: "چرتا:"
  }
};
const avatar$17 = {
  loading: "ممواتكن اۏاتر...",
  title: {
    maximize: "مكسيمالكن",
    minimize: "مينيمومكن",
    close: "توتوڤ",
    clickToMaximize: "كليك اونتوق ممكسيمالكن",
    clickToMinimize: "كليك اونتوق ممينيمالكن"
  },
  error: {
    loadFailed: "ڬاڬل ممواتكن اوۏاتر: {{error}} ",
    playerNotLoaded: "AniaPlayer تيدق دمواتكن",
    passwordRequired: "كات كونچي دڤرلوكن اونتوق فايل .ania يڠ دسوليتكن",
    noSource: "تياد سومبر اڤاته يڠ دسدياكن (avatarUrl اتاو avatarData)"
  }
};
const greetings$18 = {
  "0": "هاي! باڬايمانا ساي بوليه ممبنتو اندا هاري اين؟",
  "1": "هيلو! سلامت داتيڠ! اڤ يڠ بوليه ساي لاكوكن اونتوق اندا؟",
  "2": "هاي! ساڠت ڬمبيرا اونتوق برچاكڤ دڠن اندا!",
  "3": "هيلو! ساي اد د سيني اونتوق ممبنتو. اڤ يڠ اندا ڤرلوكن؟",
  "4": "هاي! اوق اڤ خبر؟ باڬايمانا ساي بوليه برڬونا؟"
};
const waiting$18 = {
  "0": "ايذينكن ساي برفيكير...",
  "1": "ساتو دتيق...",
  "2": "ممڤروسيس...",
  "3": "سكجڤ سهاج...",
  "4": "ساي ممريقسا ايت اونتوق اندا..."
};
const msArab = {
  chat: chat$17,
  avatar: avatar$17,
  greetings: greetings$18,
  waiting: waiting$18
};
const __vite_glob_0_119 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$17,
  chat: chat$17,
  default: msArab,
  greetings: greetings$18,
  waiting: waiting$18
}, Symbol.toStringTag, { value: "Module" }));
const chat$16 = {
  input: {
    placeholder: "Taip mesej anda...",
    listening: "Mendengar..."
  },
  enableSound: "Dayakan Bunyi",
  stt: {
    transcribing: "Mentranskripsi: ",
    micActive: "Mikrofon aktif...",
    heardError: "Maaf, tidak dapat mendengar anda. Sila cuba lagi.",
    micAccessError: "Tidak dapat mengakses mikrofon. Semak kebenaran."
  },
  speed: {
    idle: "terbiar:",
    talk: "ceramah:"
  }
};
const avatar$16 = {
  loading: "Memuatkan avatar...",
  title: {
    maximize: "Maksimumkan",
    minimize: "Minimumkan",
    close: "tutup",
    clickToMaximize: "Klik untuk memaksimumkan",
    clickToMinimize: "Klik untuk meminimumkan"
  },
  error: {
    loadFailed: "Gagal memuatkan avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer tidak dimuatkan",
    passwordRequired: "Kata laluan diperlukan untuk fail .ania yang disulitkan",
    noSource: "Tiada sumber avatar disediakan (avatarUrl atau avatarData)"
  }
};
const greetings$17 = {
  "0": "Hai! Bagaimana saya boleh membantu anda hari ini?",
  "1": "hello! Selamat datang! Apa yang boleh saya lakukan untuk awak?",
  "2": "Hai! Sangat gembira untuk bercakap dengan anda!",
  "3": "hello! Saya di sini untuk membantu. Apa yang anda perlukan?",
  "4": "Hai! apa khabar Bagaimana saya boleh berguna?"
};
const waiting$17 = {
  "0": "Biar saya fikir...",
  "1": "sekejap...",
  "2": "Memproses...",
  "3": "Kejap lagi...",
  "4": "Saya sedang menyemaknya untuk anda..."
};
const ms = {
  chat: chat$16,
  avatar: avatar$16,
  greetings: greetings$17,
  waiting: waiting$17
};
const __vite_glob_0_120 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$16,
  chat: chat$16,
  default: ms,
  greetings: greetings$17,
  waiting: waiting$17
}, Symbol.toStringTag, { value: "Module" }));
const chat$15 = {
  input: {
    placeholder: "Daħħal il-messaġġ tiegħek...",
    listening: "Nisimgħu..."
  },
  enableSound: "Ippermetti Sound",
  stt: {
    transcribing: "Traskrizzjoni: ",
    micActive: "Mikrofonu attiv...",
    heardError: "Jiddispjacini, ma stajtx nismagħk. Jekk jogħġbok erġa' pprova.",
    micAccessError: "Ma tistax taċċessa l-mikrofonu. Iċċekkja l-permessi."
  },
  speed: {
    idle: "Idle:",
    talk: "Tkellem:"
  }
};
const avatar$15 = {
  loading: "Tagħbija avatar...",
  title: {
    maximize: "Timmassimizza",
    minimize: "Imminimizza",
    close: "Agħlaq",
    clickToMaximize: "Ikklikkja biex timmassimizza",
    clickToMinimize: "Ikklikkja biex timminimizza"
  },
  error: {
    loadFailed: "Naqas milli tgħabbi l-avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer mhux mgħobbi",
    passwordRequired: "Password meħtieġa għall-fajl .ania encrypted",
    noSource: "L-ebda sors tal-avatar ipprovdut (avatarUrl jew avatarData)"
  }
};
const greetings$16 = {
  "0": "Hi! Kif nista’ ngħinek illum?",
  "1": "Hello! Merħba! X'nista' nagħmel għalik?",
  "2": "Hi hemm! Hekk ferħan li nitkellem miegħek!",
  "3": "Hello! Jien hawn biex ngħin. X'għandek bżonn?",
  "4": "Hi! Kif int? Kif nista' nkun utli?"
};
const waiting$16 = {
  "0": "Ħallini naħseb...",
  "1": "Mument wieħed...",
  "2": "Ipproċessar...",
  "3": "Sekondi biss...",
  "4": "Qed niċċekkja li għalik..."
};
const mt = {
  chat: chat$15,
  avatar: avatar$15,
  greetings: greetings$16,
  waiting: waiting$16
};
const __vite_glob_0_121 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$15,
  chat: chat$15,
  default: mt,
  greetings: greetings$16,
  waiting: waiting$16
}, Symbol.toStringTag, { value: "Module" }));
const chat$14 = {
  input: {
    placeholder: "သင့်မက်ဆေ့ခ်ျကို ရိုက်ထည့်ပါ...",
    listening: "နားထောင်နေသည်..."
  },
  enableSound: "အသံဖွင့်ပါ။",
  stt: {
    transcribing: "ကူးယူဖော်ပြခြင်း- ",
    micActive: "မိုက်ခရိုဖုန်း အသုံးပြုနေသည်...",
    heardError: "ဝမ်းနည်းပါတယ်၊ မင်းကို မကြားနိုင်ခဲ့ဘူး။ ထပ်စမ်းကြည့်ပါ။",
    micAccessError: "မိုက်ခရိုဖုန်းကို အသုံးပြု၍မရပါ။ ခွင့်ပြုချက်များကိုစစ်ဆေးပါ။"
  },
  speed: {
    idle: "မလှုပ်မရှား-",
    talk: "စကားပြော-"
  }
};
const avatar$14 = {
  loading: "ကိုယ်ပွားကို ဖွင့်နေသည်...",
  title: {
    maximize: "ချဲ့ပါ။",
    minimize: "လျှော့ပါ။",
    close: "ပိတ်လိုက်",
    clickToMaximize: "အကြီးချဲ့ရန် နှိပ်ပါ။",
    clickToMinimize: "လျှော့ချရန် နှိပ်ပါ။"
  },
  error: {
    loadFailed: "ကိုယ်ပွားကို တင်၍မရပါ- {{error}} ",
    playerNotLoaded: "AniaPlayer ကို ဖွင့်မထားပါ။",
    passwordRequired: "ကုဒ်ဝှက်ထားသော .ania ဖိုင်အတွက် စကားဝှက် လိုအပ်သည်။",
    noSource: "ကိုယ်ပွားအရင်းအမြစ်ကို ပေးမထားပါ (avatarUrl သို့မဟုတ် avatarData)"
  }
};
const greetings$15 = {
  "0": "မင်္ဂလာပါ ဒီနေ့ မင်းကို ငါဘယ်လိုကူညီနိုင်မလဲ။",
  "1": "မင်္ဂလာပါ! ကြိုဆိုပါတယ် ကျွန်တော်ဘာလုပ်ပေးရမလဲ?",
  "2": "ဟိုင်း! မင်းနဲ့စကားပြောရတာ အရမ်းပျော်တယ်။",
  "3": "မင်္ဂလာပါ! ကူညီဖို့ ရောက်နေတာ။ သင်ဘာလိုအပ်ပါသလဲ?",
  "4": "မင်္ဂလာပါ နေကောင်းလား? ငါဘယ်လိုအသုံးဝင်နိုင်မလဲ။"
};
const waiting$15 = {
  "0": "ငါစဉ်းစားပါရစေ...",
  "1": "ခဏလေး...",
  "2": "လုပ်ဆောင်နေသည်...",
  "3": "တစ်စက္ကန့်ပဲ...",
  "4": "မင်းအတွက် ငါစစ်ဆေးနေတယ်..."
};
const my = {
  chat: chat$14,
  avatar: avatar$14,
  greetings: greetings$15,
  waiting: waiting$15
};
const __vite_glob_0_122 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$14,
  chat: chat$14,
  default: my,
  greetings: greetings$15,
  waiting: waiting$15
}, Symbol.toStringTag, { value: "Module" }));
const chat$13 = {
  input: {
    placeholder: "आफ्नो सन्देश टाइप गर्नुहोस्...",
    listening: "सुन्दै..."
  },
  enableSound: "ध्वनि सक्षम गर्नुहोस्",
  stt: {
    transcribing: "ट्रान्सक्राइब गर्दै: ",
    micActive: "माइक्रोफोन सक्रिय...",
    heardError: "माफ गर्नुहोस्, तपाईं सुन्न सकेन। कृपया पुन: प्रयास गर्नुहोस्।",
    micAccessError: "माइक्रोफोन पहुँच गर्न असमर्थ। अनुमतिहरू जाँच गर्नुहोस्।"
  },
  speed: {
    idle: "निष्क्रिय:",
    talk: "कुराकानी:"
  }
};
const avatar$13 = {
  loading: "अवतार लोड गर्दै...",
  title: {
    maximize: "अधिकतम गर्नुहोस्",
    minimize: "न्यूनतम गर्नुहोस्",
    close: "बन्द गर्नुहोस्",
    clickToMaximize: "अधिकतम गर्न क्लिक गर्नुहोस्",
    clickToMinimize: "न्यूनीकरण गर्न क्लिक गर्नुहोस्"
  },
  error: {
    loadFailed: "अवतार लोड गर्न असफल: {{error}} ",
    playerNotLoaded: "AniaPlayer लोड गरिएको छैन",
    passwordRequired: "एन्क्रिप्टेड .ania फाइलको लागि पासवर्ड आवश्यक छ",
    noSource: "कुनै अवतार स्रोत प्रदान गरिएको छैन (avatarUrl वा avatarData)"
  }
};
const greetings$14 = {
  "0": "नमस्ते! आज म तपाईंलाई कसरी मद्दत गर्न सक्छु?",
  "1": "नमस्ते! स्वागत छ! म तिम्रो लागि के गर्न सक्छु?",
  "2": "नमस्ते! तपाईसँग कुरा गर्न पाउँदा खुसी लाग्यो!",
  "3": "नमस्ते! म मद्दत गर्न यहाँ छु। तपाईलाई के चाहिन्छ?",
  "4": "नमस्ते! कस्तो छ ? म कसरी उपयोगी हुन सक्छु?"
};
const waiting$14 = {
  "0": "मलाई सोच्न दिनुहोस् ...",
  "1": "एक पल...",
  "2": "प्रशोधन गर्दै...",
  "3": "एक सेकेन्ड मात्र...",
  "4": "म तिम्रो लागि जाँच गर्दैछु..."
};
const ne = {
  chat: chat$13,
  avatar: avatar$13,
  greetings: greetings$14,
  waiting: waiting$14
};
const __vite_glob_0_123 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$13,
  chat: chat$13,
  default: ne,
  greetings: greetings$14,
  waiting: waiting$14
}, Symbol.toStringTag, { value: "Module" }));
const chat$12 = {
  input: {
    placeholder: "छिगु हसना टाइप यानादिसँ ...",
    listening: "न्यनाच्वना ..."
  },
  enableSound: "सःयात सक्षम या",
  stt: {
    transcribing: "ट्रान्सक्रिप्टिङ्ग : ",
    micActive: "माइक्रोफोन सक्रिय ...",
    heardError: "क्षमा यानादिसँ, छिगु खँ न्यने मफुत । हानं कुतः यानादिसँ ।",
    micAccessError: "माइक्रोफोनय् दुहां वने मफुत । अनुमति जाँच या ।"
  },
  speed: {
    idle: "निष्क्रिय :",
    talk: "खँल्हाबल्हा :"
  }
};
const avatar$12 = {
  loading: "अवतार लोड जुयाच्वन ...",
  title: {
    maximize: "अप्वयेकि",
    minimize: "म्ह्व या",
    close: "तिनाब्यु",
    clickToMaximize: "अप्वयेकेत क्लिक यानादिसँ ।",
    clickToMinimize: "म्ह्व यायेत क्लिक यानादिसँ ।"
  },
  error: {
    loadFailed: "Failed to load avatar: {{error}}",
    playerNotLoaded: "एनिया प्लेयर लोड मजूनि",
    passwordRequired: "इन्क्रिप्ट यानातःगु .ania फाइलया निंतिं पासवर्ड माः",
    noSource: "अवतार स्रोत मदु (अवतारयूआरएल बाय् अवतारडाटा)"
  }
};
const greetings$13 = {
  "0": "ज्वजलपा ! थौं जिं छन्त गथे यानाः ग्वाहालि याये फै ?",
  "1": "ज्वजलपा! लशकुश! जिं छंगु निंतिं छु याये फै ?",
  "2": "नमस्ते! छि नाप खँ ल्हाये दयाः तसकं लय् ताः !",
  "3": "ज्वजलपा! जि थन ग्वाहालि यायेत वयागु खः । छन्त छु माः ?",
  "4": "ज्वजलपा! म्हं फु ला? जि गथे यानाः ज्याख्यले जुइ फै ?"
};
const waiting$13 = {
  "0": "जितः बिचाः याकेब्यु ....",
  "1": "छगू क्षण ....",
  "2": "प्रशोधन ...",
  "3": "छगू सेकेण्ड जक ...",
  "4": "जिं छंगु निंतिं व जाँच यानाच्वना ..."
};
const _new = {
  chat: chat$12,
  avatar: avatar$12,
  greetings: greetings$13,
  waiting: waiting$13
};
const __vite_glob_0_124 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$12,
  chat: chat$12,
  default: _new,
  greetings: greetings$13,
  waiting: waiting$13
}, Symbol.toStringTag, { value: "Module" }));
const chat$11 = {
  input: {
    placeholder: "Typ uw bericht...",
    listening: "Luisteren..."
  },
  enableSound: "Schakel geluid in",
  stt: {
    transcribing: "Transcriberen: ",
    micActive: "Microfoon actief...",
    heardError: "Sorry, ik kon je niet horen. Probeer het opnieuw.",
    micAccessError: "Kan geen toegang krijgen tot de microfoon. Controleer machtigingen."
  },
  speed: {
    idle: "Inactief:",
    talk: "Praten:"
  }
};
const avatar$11 = {
  loading: "Avatar laden...",
  title: {
    maximize: "Maximaliseer",
    minimize: "Minimaliseer",
    close: "Sluiten",
    clickToMaximize: "Klik om te maximaliseren",
    clickToMinimize: "Klik om te minimaliseren"
  },
  error: {
    loadFailed: "Kan avatar niet laden: {{error}} ",
    playerNotLoaded: "AniaPlayer niet geladen",
    passwordRequired: "Wachtwoord vereist voor gecodeerd .ania-bestand",
    noSource: "Geen avatarbron opgegeven (avatarUrl of avatarData)"
  }
};
const greetings$12 = {
  "0": "Hallo! Hoe kan ik je vandaag helpen?",
  "1": "Hallo! Welkom! Wat kan ik voor je doen?",
  "2": "Hoi! Ik ben zo blij om met je te praten!",
  "3": "Hallo! Ik ben hier om te helpen. Wat heb je nodig?",
  "4": "Hoi! Hoe is het met je? Hoe kan ik nuttig zijn?"
};
const waiting$12 = {
  "0": "Laat me denken...",
  "1": "Een ogenblik...",
  "2": "Verwerken...",
  "3": "Een ogenblikje...",
  "4": "Ik controleer het voor je..."
};
const nl = {
  chat: chat$11,
  avatar: avatar$11,
  greetings: greetings$12,
  waiting: waiting$12
};
const __vite_glob_0_125 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$11,
  chat: chat$11,
  default: nl,
  greetings: greetings$12,
  waiting: waiting$12
}, Symbol.toStringTag, { value: "Module" }));
const chat$10 = {
  input: {
    placeholder: "Skriv inn meldingen din...",
    listening: "Lytter..."
  },
  enableSound: "Aktiver lyd",
  stt: {
    transcribing: "Transkribering: ",
    micActive: "Mikrofon aktiv...",
    heardError: "Beklager, jeg kunne ikke høre deg. Vennligst prøv igjen.",
    micAccessError: "Får ikke tilgang til mikrofonen. Sjekk tillatelser."
  },
  speed: {
    idle: "Inaktiv:",
    talk: "Snakk:"
  }
};
const avatar$10 = {
  loading: "Laster inn avatar ...",
  title: {
    maximize: "Maksimer",
    minimize: "Minimer",
    close: "Lukk",
    clickToMaximize: "Klikk for å maksimere",
    clickToMinimize: "Klikk for å minimere"
  },
  error: {
    loadFailed: "Kunne ikke laste avataren: {{error}} ",
    playerNotLoaded: "AniaPlayer ikke lastet",
    passwordRequired: "Passord kreves for kryptert .ania-fil",
    noSource: "Ingen avatarkilde oppgitt (avatarUrl eller avatarData)"
  }
};
const greetings$11 = {
  "0": "Hei! Hvordan kan jeg hjelpe deg i dag?",
  "1": "Hallo! Velkomst! Hva kan jeg gjøre for deg?",
  "2": "Hei! Så glad for å snakke med deg!",
  "3": "Hallo! Jeg er her for å hjelpe. Hva trenger du?",
  "4": "Hei! Hvordan har du det? Hvordan kan jeg være nyttig?"
};
const waiting$11 = {
  "0": "La meg tenke...",
  "1": "Et øyeblikk...",
  "2": "Behandler...",
  "3": "Bare et sekund...",
  "4": "Jeg sjekker det for deg..."
};
const no = {
  chat: chat$10,
  avatar: avatar$10,
  greetings: greetings$11,
  waiting: waiting$11
};
const __vite_glob_0_126 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$10,
  chat: chat$10,
  default: no,
  greetings: greetings$11,
  waiting: waiting$11
}, Symbol.toStringTag, { value: "Module" }));
const chat$$ = {
  input: {
    placeholder: "Tlola umlayezwakho...",
    listening: "Ukulalela..."
  },
  enableSound: "Vumela umdumo",
  stt: {
    transcribing: "Ukutlola: ",
    micActive: "Imakrofoni isebenza...",
    heardError: "Uxolo, azange ngikuzwe. Sibawa ulinge godu.",
    micAccessError: "Akukghoni ukufikelela imakrofoni. Hlola iimvume."
  },
  speed: {
    idle: "Ungenzi lutho:",
    talk: "Ikulumo:"
  }
};
const avatar$$ = {
  loading: "Ukulayisha i-avatar...",
  title: {
    maximize: "Khulisa",
    minimize: "Nciphisa",
    close: "Vala",
    clickToMaximize: "Tlika ukuze ukhulise",
    clickToMinimize: "Tlika ukunciphisa"
  },
  error: {
    loadFailed: "Kwehlulekile ukulayisha i-avatar: {{error}} ",
    playerNotLoaded: "I-AniaPlayer ayilayitjhwa",
    passwordRequired: "Iphasiwedi iyatlhogeka efayeleni le-.ania elifihliweko",
    noSource: "Akukho mthombo we-avatar onikelwe (i-avatarUrl nofana i-avatarData)"
  }
};
const greetings$10 = {
  "0": "Sawubona! Ngingakusiza njani namhlanjesi?",
  "1": "Lotjha! Siyakwamukela! Ngingakwenzelani?",
  "2": "Lotjha! Ngithabile ukukhuluma nawe!",
  "3": "Lotjha! Ngilapha ukuzokusiza. Khuyini oyitlhogako?",
  "4": "Lotjha! Unjani? Ngingaba lisizo njani?"
};
const waiting$10 = {
  "0": "Akhe ngicabange...",
  "1": "Umzuzu owodwa...",
  "2": "Ukucubungula...",
  "3": "Umzuzwana nje...",
  "4": "Ngiyakuhlolela lokho..."
};
const nr = {
  chat: chat$$,
  avatar: avatar$$,
  greetings: greetings$10,
  waiting: waiting$10
};
const __vite_glob_0_127 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$$,
  chat: chat$$,
  default: nr,
  greetings: greetings$10,
  waiting: waiting$10
}, Symbol.toStringTag, { value: "Module" }));
const chat$_ = {
  input: {
    placeholder: "Thaepa molaetša wa gago...",
    listening: "Go theeletša..."
  },
  enableSound: "Kgontšha Modumo",
  stt: {
    transcribing: "Go ngwalolla: . ",
    micActive: "Maekrofouno e šomago...",
    heardError: "Maswabi, ga se ka kgona go go kwa. Hle leka gape.",
    micAccessError: "Ga a kgone go fihlelela maekrofouno. Lekola ditumelelo."
  },
  speed: {
    idle: "Go se dire selo: .",
    talk: "Polelo: ."
  }
};
const avatar$_ = {
  loading: "Go laetša avatar...",
  title: {
    maximize: "Godiša",
    minimize: "Fokotša",
    close: "Tswala",
    clickToMaximize: "Tobetsa go godiša",
    clickToMinimize: "Tobetsa go fokotša"
  },
  error: {
    loadFailed: "E paletšwe ke go laetša avatar: {{error}} . ",
    playerNotLoaded: "AniaPlayer ga se ya imelwa",
    passwordRequired: "Phasewete e nyakegago bakeng sa faele ya .ania yeo e šitišitšwego",
    noSource: "Ga go na mothopo wa avatar wo o filwego (avatarUrl goba avatarData) ."
  }
};
const greetings$$ = {
  "0": "Thobela! Nka go thuša bjang lehono?",
  "1": "Thobela! Le amogetšwe! Nka go direla eng?",
  "2": "Dumela moo! Ke thabile kudu go bolela le wena!",
  "3": "Thobela! Ke mo go thuša. O hloka eng?",
  "4": "Thobela! Le kae? Nka ba le mohola bjang?"
};
const waiting$$ = {
  "0": "E re ke nagane...",
  "1": "Motsotso o tee...",
  "2": "Tshepedišo ya...",
  "3": "Motsotswana feela...",
  "4": "Ke go lekola seo..."
};
const nso = {
  chat: chat$_,
  avatar: avatar$_,
  greetings: greetings$$,
  waiting: waiting$$
};
const __vite_glob_0_128 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$_,
  chat: chat$_,
  default: nso,
  greetings: greetings$$,
  waiting: waiting$$
}, Symbol.toStringTag, { value: "Module" }));
const chat$Z = {
  input: {
    placeholder: "Gɔ̱ri ruacdu...",
    listening: "Li̱eŋ..."
  },
  enableSound: "Enable jɔw",
  stt: {
    transcribing: "Tra̱ni̱thkri̱piŋ: ",
    micActive: "Mai̱kröpuɔɔn lätdɛ...",
    heardError: "Sorry, couldn't hear you. Ɣän göörä ɣöö bä nyɔk kɛ ɣɔ̱n.",
    micAccessError: "Unable to access microphone. Check permi̱cini̱."
  },
  speed: {
    idle: "/Thiɛl:",
    talk: "Ruac:"
  }
};
const avatar$Z = {
  loading: "Kämdɛ raar avatar...",
  title: {
    maximize: "Makdhi̱maidhe",
    minimize: "Mini̱mai̱dhi̱",
    close: "Ga̱ŋ",
    clickToMaximize: "Click kɛ ɣöö biɛ kulɛ di̱t",
    clickToMinimize: "Click kɛ ɣöö ba kulɛ jakä kuiy"
  },
  error: {
    loadFailed: "Failed to load avatar:  {{error}} ",
    playerNotLoaded: "AniaPlɛyɛr /ka̱nɛ kuëŋ thi̱n",
    passwordRequired: "Password required for encrypted .ania file",
    noSource: "/Thiɛlɛ gua̱a̱th in tuɔɔk avatar thi̱n mi̱ ca ŋun (abatarUrl kiɛ abatarData)"
  }
};
const greetings$_ = {
  "0": "Ɣi̱! How can I help you today?",
  "1": "Malɛ! Ca ji nho̱k bën! Ɛŋu mi dëë lät kä ji̱?",
  "2": "Ma̱lɛ! Kä ɣän tɛɛth lɔcdä ɛlɔ̱ŋ kɛ ruac kɛ ji̱!",
  "3": "Malɛ! Ɣän ta̱a̱ wanɛ mɛ kɛ ɣöö bä ji̱ luäk. Ɛŋu mi go̱o̱ri?",
  "4": "Ne̱rä ji! Ma̱l puɔ̱nydu? Ɣän bä tekɛ luɔt i̱di?"
};
const waiting$_ = {
  "0": "Ɣän cä car...",
  "1": "Kɛ gua̱a̱th kɛl...",
  "2": "La̱tdɛ...",
  "3": "Ɛ thɛkɔnd kärɔa...",
  "4": "I'm checking that for you..."
};
const nus = {
  chat: chat$Z,
  avatar: avatar$Z,
  greetings: greetings$_,
  waiting: waiting$_
};
const __vite_glob_0_129 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$Z,
  chat: chat$Z,
  default: nus,
  greetings: greetings$_,
  waiting: waiting$_
}, Symbol.toStringTag, { value: "Module" }));
const chat$Y = {
  input: {
    placeholder: "Lembani uthenga wanu...",
    listening: "Kumvetsera..."
  },
  enableSound: "Yambitsani Phokoso",
  stt: {
    transcribing: "Kulemba: ",
    micActive: "Maikolofoni ikugwira ntchito...",
    heardError: "Pepani, sindinamve. Chonde yesaninso.",
    micAccessError: "Takanika kupeza cholankhulira. Onani zilolezo."
  },
  speed: {
    idle: "Zopanda ntchito:",
    talk: "Kulankhula:"
  }
};
const avatar$Y = {
  loading: "Kutsegula avatar...",
  title: {
    maximize: "Onetsani",
    minimize: "Chepetsani",
    close: "Tsekani",
    clickToMaximize: "Dinani kuti muwonjezere",
    clickToMinimize: "Dinani kuti muchepetse"
  },
  error: {
    loadFailed: "Zalephera kutsitsa avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer sanakwezedwe",
    passwordRequired: "Mawu achinsinsi ofunikira pa fayilo yobisidwa ya .ania",
    noSource: "Palibe avatar yoperekedwa (avatarUrl kapena avatarData)"
  }
};
const greetings$Z = {
  "0": "Moni! Ndingakuthandizeni bwanji lero?",
  "1": "Moni! Takulandirani! Ndingakuchitireni chiyani?",
  "2": "Muno kumeneko! Ndine wokondwa kuyankhula nanu!",
  "3": "Moni! Ndabwera kudzathandiza. Mukufuna chiyani?",
  "4": "Moni! Muli bwanji? Ndingakhale wothandiza bwanji?"
};
const waiting$Z = {
  "0": "Ndiloleni ndiganize...",
  "1": "Mphindi imodzi...",
  "2": "Kukonza...",
  "3": "Sekondi imodzi...",
  "4": "Ndikukufunirani izi..."
};
const ny = {
  chat: chat$Y,
  avatar: avatar$Y,
  greetings: greetings$Z,
  waiting: waiting$Z
};
const __vite_glob_0_130 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$Y,
  chat: chat$Y,
  default: ny,
  greetings: greetings$Z,
  waiting: waiting$Z
}, Symbol.toStringTag, { value: "Module" }));
const chat$X = {
  input: {
    placeholder: "Picatz vòstre messatge...",
    listening: "Escotant..."
  },
  enableSound: "Activar lo son",
  stt: {
    transcribing: "Transcripcion: ",
    micActive: "Micròfon actiu...",
    heardError: "O planhèm, vos ai pas pogut ausir. Ensajatz tornarmai.",
    micAccessError: "Impossible d'accedir al micrò. Verificar las permissions."
  },
  speed: {
    idle: "Inactiu:",
    talk: "Conferéncia:"
  }
};
const avatar$X = {
  loading: "En cargament d'avatar...",
  title: {
    maximize: "Maximizar",
    minimize: "Minimizar",
    close: "Barrar",
    clickToMaximize: "Clicatz per maximizar",
    clickToMinimize: "Clicatz per minimizar"
  },
  error: {
    loadFailed: "Fracàs de cargar l'avatar : {{error}} ",
    playerNotLoaded: "AniaPlayer pas cargat",
    passwordRequired: "Senhal requerit pel fichièr .ania chifrat",
    noSource: "Cap de font avatar provesida (avatarUrl o avatarData)"
  }
};
const greetings$Y = {
  "0": "Salut! Cossí vos pòdi ajudar uèi?",
  "1": "Adieu! Benvengut! Qué pòdi far per tu?",
  "2": "Adieu l'òme! Tan content de vos parlar!",
  "3": "Adieu! Soi aquí per ajudar. De qué vos cal?",
  "4": "Adieu! Cossí va? Cossí pòdi èsser util?"
};
const waiting$Y = {
  "0": "Me daissatz pensar...",
  "1": "Un moment...",
  "2": "Tractament...",
  "3": "Sonque una segonda...",
  "4": "Verifiqui aquò per tu..."
};
const oc = {
  chat: chat$X,
  avatar: avatar$X,
  greetings: greetings$Y,
  waiting: waiting$Y
};
const __vite_glob_0_131 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$X,
  chat: chat$X,
  default: oc,
  greetings: greetings$Y,
  waiting: waiting$Y
}, Symbol.toStringTag, { value: "Module" }));
const chat$W = {
  input: {
    placeholder: "Ergaa keessan barreessaa...",
    listening: "Dhaggeeffachaa..."
  },
  enableSound: "Sagalee Dandeessisi",
  stt: {
    transcribing: "Barreessuu: 1.1. ",
    micActive: "Maaykiroofooniin hojiirra jiru...",
    heardError: "Dhiifama, si dhaga'uu hin dandeenye. Mee irra deebi'ii yaalaa.",
    micAccessError: "Maaykiroofoonii argachuu hin dandeenye. Hayyama ilaali."
  },
  speed: {
    idle: "Hojii malee: .",
    talk: "Haasaa:"
  }
};
const avatar$W = {
  loading: "Avatar fe'amaa jira...",
  title: {
    maximize: "Maximize gochuu",
    minimize: "Xiqqeessuu",
    close: "Cufi",
    clickToMaximize: "Guddisuuf cuqaasaa",
    clickToMinimize: "Xiqqeessuuf cuqaasaa"
  },
  error: {
    loadFailed: "Avatar fe'uu hin dandeenye: {{error}} . ",
    playerNotLoaded: "AniaPlayer hin fe'amne",
    passwordRequired: "Jecha icciitii faayilii .ania icciitii ta'eef barbaachisa",
    noSource: "Maddi avatar hin kennamne (avatarUrl ykn avatarData) ."
  }
};
const greetings$X = {
  "0": "Hi! Har'a akkamittan isin gargaaruu danda'a?",
  "1": "Akkam! Baga nagaan dhufte! Maal siif gochuu danda'a?",
  "2": "Achi kan jirtu! Si haasofsiisuu kootti baay'een gammada!",
  "3": "Akkam! Gargaaruuf as jira. Maal si barbaachisa?",
  "4": "Akkam! Akkam jirta? Akkamittan faayidaa qabaachuu danda'a?"
};
const waiting$X = {
  "0": "Mee akkan yaadutti...",
  "1": "Yeroo tokko...",
  "2": "Adeemsa hojii...",
  "3": "Sekondii tokko qofa...",
  "4": "Sana isiniif sakatta'aa jira..."
};
const om = {
  chat: chat$W,
  avatar: avatar$W,
  greetings: greetings$X,
  waiting: waiting$X
};
const __vite_glob_0_132 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$W,
  chat: chat$W,
  default: om,
  greetings: greetings$X,
  waiting: waiting$X
}, Symbol.toStringTag, { value: "Module" }));
const chat$V = {
  input: {
    placeholder: "ଆପଣଙ୍କର ବାର୍ତ୍ତା ଟାଇପ୍ କରନ୍ତୁ ...",
    listening: "ଶୁଣିବା ..."
  },
  enableSound: "ଧ୍ୱନି ସକ୍ଷମ କରନ୍ତୁ |",
  stt: {
    transcribing: "ଟ୍ରାନ୍ସକ୍ରିପସନ୍: ",
    micActive: "ମାଇକ୍ରୋଫୋନ୍ ସକ୍ରିୟ ...",
    heardError: "ଦୁ Sorry ଖିତ, ତୁମ କଥା ଶୁଣି ପାରିଲି ନାହିଁ ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |",
    micAccessError: "ମାଇକ୍ରୋଫୋନ୍ ପ୍ରବେଶ କରିବାକୁ ଅସମର୍ଥ | ଅନୁମତିଗୁଡିକ ଯାଞ୍ଚ କରନ୍ତୁ |"
  },
  speed: {
    idle: "ନିଷ୍କ୍ରିୟ:",
    talk: "କଥାବାର୍ତ୍ତା:"
  }
};
const avatar$V = {
  loading: "ଅବତାର ଲୋଡିଂ ...",
  title: {
    maximize: "ସର୍ବାଧିକ କରନ୍ତୁ |",
    minimize: "କମ୍ କରନ୍ତୁ |",
    close: "ବନ୍ଦ",
    clickToMaximize: "ସର୍ବାଧିକ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ |",
    clickToMinimize: "କମ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ |"
  },
  error: {
    loadFailed: "ଅବତାର ଲୋଡ୍ କରିବାରେ ବିଫଳ: {{error}} ",
    playerNotLoaded: "AniaPlayer ଲୋଡ୍ ହୋଇନାହିଁ |",
    passwordRequired: "ଏନକ୍ରିପ୍ଟ ହୋଇଥିବା .ania ଫାଇଲ୍ ପାଇଁ ପାସୱାର୍ଡ ଆବଶ୍ୟକ |",
    noSource: "କ av ଣସି ଅବତାର ଉତ୍ସ ପ୍ରଦାନ କରାଯାଇ ନାହିଁ (ଅବତାର ଉର୍ଲ କିମ୍ବା ଅବତାର ଡାଟା)"
  }
};
const greetings$W = {
  "0": "ହାଏ! ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
  "1": "ନମସ୍କାର! ସ୍ Welcome ାଗତ! ମୁଁ ତୁମ ପାଇଁ କ’ଣ କରିପାରିବି?",
  "2": "ନମସ୍କାର! ତୁମ ସହ କଥା ହୋଇ ବହୁତ ଖୁସି!",
  "3": "ନମସ୍କାର! ମୁଁ ସାହାଯ୍ୟ କରିବାକୁ ଏଠାରେ ଅଛି ତୁମର କ’ଣ ଦରକାର?",
  "4": "ହାଏ! ଆପଣ କେମିତି ଅଛନ୍ତି? ମୁଁ କିପରି ଉପଯୋଗୀ ହୋଇପାରେ?"
};
const waiting$W = {
  "0": "ମୋତେ ଭାବିବାକୁ ଦିଅ ...",
  "1": "ଗୋଟିଏ ମୁହୂର୍ତ୍ତ ...",
  "2": "ପ୍ରକ୍ରିୟାକରଣ ...",
  "3": "ମାତ୍ର ଏକ ସେକେଣ୍ଡ୍ ...",
  "4": "ମୁଁ ତୁମ ପାଇଁ ତାହା ଯାଞ୍ଚ କରୁଛି ..."
};
const or = {
  chat: chat$V,
  avatar: avatar$V,
  greetings: greetings$W,
  waiting: waiting$W
};
const __vite_glob_0_133 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$V,
  chat: chat$V,
  default: or,
  greetings: greetings$W,
  waiting: waiting$W
}, Symbol.toStringTag, { value: "Module" }));
const chat$U = {
  input: {
    placeholder: "اپنا سنیہا ٹائپ کرو...",
    listening: "سُن رئے..."
  },
  enableSound: "آواز فعال کرو",
  stt: {
    transcribing: "نقل کرنا: ",
    micActive: "مائیکروفون ایکٹو...",
    heardError: "معاف کرنا، تہانوں نئیں سن سکیا۔ مہربانی کر کے فیر کوشش کرو۔",
    micAccessError: "مائیک تک رسائی حاصل کرن توں قاصر۔ اجازتاں چیک کرو۔"
  },
  speed: {
    idle: "بیکار:",
    talk: "گل بات:"
  }
};
const avatar$U = {
  loading: "اوتار لوڈ ہو رہیا اے...",
  title: {
    maximize: "زیادہ توں زیادہ",
    minimize: "کم توں کم کرو",
    close: "بند کرو",
    clickToMaximize: "ودھ توں ودھ کرن لئی کلک کرو",
    clickToMinimize: "کم توں کم کرن لئی کلک کرو"
  },
  error: {
    loadFailed: "اوتار لوڈ کرن چ ناکام: {{error}} ",
    playerNotLoaded: "انیا پلیئر لوڈ نئیں ہویا",
    passwordRequired: "خفیہ کردہ .ania فائل لئی پاس ورڈ دی لوڑ اے",
    noSource: "اوتار دا کوئی وسیلہ نئیں دتا گیا (اوتار یو آر ایل یا اوتار ڈیٹا)"
  }
};
const greetings$V = {
  "0": "ہیلو! میں اج تہاڈی کیویں مدد کر سکنا واں؟",
  "1": "ہیلو! جی آیاں نوں کہنا! میں تیرے لئی کیہ کر سکدا واں؟",
  "2": "ہیلو جناب! تہاڈے نال گل کرن چ بہوں خوشی ہوئی!",
  "3": "ہیلو! میں مدد کرن لئی ایتھے آں۔ تہانوں کی چاہیدا اے؟",
  "4": "ہیلو! تہاڈا کی حال اے؟ میں کیویں کم آ سکدا واں؟"
};
const waiting$V = {
  "0": "مینوں سوچن دیو...",
  "1": "اک پل...",
  "2": "پروسیسنگ...",
  "3": "بس اک سیکنڈ...",
  "4": "میں تہاڈے لی ایہ چیک کر ریا واں..."
};
const paArab = {
  chat: chat$U,
  avatar: avatar$U,
  greetings: greetings$V,
  waiting: waiting$V
};
const __vite_glob_0_134 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$U,
  chat: chat$U,
  default: paArab,
  greetings: greetings$V,
  waiting: waiting$V
}, Symbol.toStringTag, { value: "Module" }));
const chat$T = {
  input: {
    placeholder: "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...",
    listening: "ਸੁਣ ਰਿਹਾ ਹੈ..."
  },
  enableSound: "ਧੁਨੀ ਚਾਲੂ ਕਰੋ",
  stt: {
    transcribing: "ਟ੍ਰਾਂਸਕ੍ਰਾਈਬਿੰਗ: ",
    micActive: "ਮਾਈਕ੍ਰੋਫ਼ੋਨ ਕਿਰਿਆਸ਼ੀਲ...",
    heardError: "ਮਾਫ਼ ਕਰਨਾ, ਤੁਹਾਨੂੰ ਸੁਣ ਨਹੀਂ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    micAccessError: "ਮਾਈਕ੍ਰੋਫੋਨ ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ। ਅਨੁਮਤੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।"
  },
  speed: {
    idle: "ਵਿਹਲਾ:",
    talk: "ਗੱਲਬਾਤ:"
  }
};
const avatar$T = {
  loading: "ਅਵਤਾਰ ਲੋਡ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
  title: {
    maximize: "ਵੱਧ ਤੋਂ ਵੱਧ",
    minimize: "ਛੋਟਾ ਕਰੋ",
    close: "ਬੰਦ ਕਰੋ",
    clickToMaximize: "ਵੱਧ ਤੋਂ ਵੱਧ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
    clickToMinimize: "ਛੋਟਾ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ"
  },
  error: {
    loadFailed: "ਅਵਤਾਰ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਫਲ: {{error}} ",
    playerNotLoaded: "AniaPlayer ਲੋਡ ਨਹੀਂ ਹੋਇਆ",
    passwordRequired: "ਐਨਕ੍ਰਿਪਟਡ .ania ਫਾਈਲ ਲਈ ਪਾਸਵਰਡ ਲੋੜੀਂਦਾ ਹੈ",
    noSource: "ਕੋਈ ਅਵਤਾਰ ਸਰੋਤ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕੀਤਾ ਗਿਆ (avatarUrl ਜਾਂ avatarData)"
  }
};
const greetings$U = {
  "0": "ਹੈਲੋ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
  "1": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਜੀ ਆਇਆਂ ਨੂੰ! ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਕੀ ਕਰ ਸਕਦਾ ਹਾਂ?",
  "2": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡੇ ਨਾਲ ਗੱਲ ਕਰਕੇ ਬਹੁਤ ਖੁਸ਼ੀ ਹੋਈ!",
  "3": "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ। ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?",
  "4": "ਹੈਲੋ! ਤੁਸੀ ਕਿਵੇਂ ਹੋ? ਮੈਂ ਕਿਵੇਂ ਲਾਭਦਾਇਕ ਹੋ ਸਕਦਾ ਹਾਂ?"
};
const waiting$U = {
  "0": "ਮੈਨੂੰ ਸੋਚਣ ਦਿਓ...",
  "1": "ਇੱਕ ਪਲ...",
  "2": "ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...",
  "3": "ਬਸ ਇੱਕ ਸਕਿੰਟ...",
  "4": "ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਇਸਦੀ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹਾਂ..."
};
const pa = {
  chat: chat$T,
  avatar: avatar$T,
  greetings: greetings$U,
  waiting: waiting$U
};
const __vite_glob_0_135 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$T,
  chat: chat$T,
  default: pa,
  greetings: greetings$U,
  waiting: waiting$U
}, Symbol.toStringTag, { value: "Module" }));
const chat$S = {
  input: {
    placeholder: "I-type so mensahe mo...",
    listening: "Mandedengel..."
  },
  enableSound: "I-enable so Sound",
  stt: {
    transcribing: "Man-transcribe: ",
    micActive: "Aktibo so mikropono...",
    heardError: "Pasensya la, ag ta ka narengel. Ipangasin salien lamet.",
    micAccessError: "Ag makaloob ed mikropono. I-tsek iray permiso."
  },
  speed: {
    idle: "Anggapoy gagawaen:",
    talk: "Paliwawa:"
  }
};
const avatar$S = {
  loading: "Loading avatar...",
  title: {
    maximize: "Palaknaben",
    minimize: "Paabebaen",
    close: "Saraan",
    clickToMaximize: "Pindoten pian napalaknab",
    clickToMinimize: "Pindoten pian nabawasan"
  },
  error: {
    loadFailed: "Ag aka-load so avatar: {{error}} ",
    playerNotLoaded: "Ag-aka-load so AniaPlayer",
    passwordRequired: "Kaukolan so password parad aka-encrypt ya .ania file",
    noSource: "Anggapoy niiter ya nanlapuan na avatar (avatarUrl o avatarData)"
  }
};
const greetings$T = {
  "0": "Hi! Panon ta kan natulongan natan?",
  "1": "Hello! Naabrasa kayo! Antoy nagawaan ko parad sika?",
  "2": "Kumusta kayo! Malikeliket ak ya makapitongtong ed sika!",
  "3": "Hello! Wadya ak pian ontulong. Antoy kaukolan mo?",
  "4": "Hi! Kumusta ka? Panon ak ya magmaliw ya mausar?"
};
const waiting$T = {
  "0": "Isipen ko pa...",
  "1": "Sakey a bekta...",
  "2": "Manproseso...",
  "3": "Sakey segundo labat...",
  "4": "I-check ko itan parad sika..."
};
const pag = {
  chat: chat$S,
  avatar: avatar$S,
  greetings: greetings$T,
  waiting: waiting$T
};
const __vite_glob_0_136 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$S,
  chat: chat$S,
  default: pag,
  greetings: greetings$T,
  waiting: waiting$T
}, Symbol.toStringTag, { value: "Module" }));
const chat$R = {
  input: {
    placeholder: "I-type me ing kekang mensahi...",
    listening: "Makiramdam..."
  },
  enableSound: "I-enable ing Sound",
  stt: {
    transcribing: "Transcribe: ",
    micActive: "Microphone active...",
    heardError: "Pasensya na, eku daka dimdam. Subukan meng pasibayu.",
    micAccessError: "E malyaring lungub keng mikropono. Lawen la reng kapaintulutan."
  },
  speed: {
    idle: "alang gagawan:",
    talk: "Magsalita:"
  }
};
const avatar$R = {
  loading: "Loading avatar...",
  title: {
    maximize: "Maximize",
    minimize: "Bawasan",
    close: "malapit",
    clickToMaximize: "Pindutan me para mas maragul",
    clickToMinimize: "Pindutan me para mabawas"
  },
  error: {
    loadFailed: "mebigu yang me load ing avatar: {{error}} ",
    playerNotLoaded: "E ya makaload ing AniaPlayer",
    passwordRequired: "kailangan ing password para keng encrypted a .ania file",
    noSource: "Ala yang avatar source (avatarUrl o avatarData)"
  }
};
const greetings$S = {
  "0": "Hi! makananu dakang asaupan ngeni?",
  "1": "Komusta! Salangi! Nanung agyu kung gawan para keka?",
  "2": "Hello! Masaya kung akasabi daka!",
  "3": "Komusta! Atyu ku keni para sumaup. Nanu ing kailangan mu?",
  "4": "Komusta! Komusta naka? Makananu kung maging kapakibatan?"
};
const waiting$S = {
  "0": "isipan ku...",
  "1": "Metung a penandit...",
  "2": "Processing...",
  "3": "Saguli mu...",
  "4": "tignan ke ita para keka..."
};
const pam = {
  chat: chat$R,
  avatar: avatar$R,
  greetings: greetings$S,
  waiting: waiting$S
};
const __vite_glob_0_137 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$R,
  chat: chat$R,
  default: pam,
  greetings: greetings$S,
  waiting: waiting$S
}, Symbol.toStringTag, { value: "Module" }));
const chat$Q = {
  input: {
    placeholder: "Skirbi bo mensahe...",
    listening: "Skuchando..."
  },
  enableSound: "Habilitá Zonido",
  stt: {
    transcribing: "Transkripshon: ",
    micActive: "Mikrofon aktivo...",
    heardError: "Diskulpa, no por a tende bo. Por fabor purba atrobe.",
    micAccessError: "No por haña akseso na mikrofon. Kontrolá pèrmitnan."
  },
  speed: {
    idle: "Inaktivo:",
    talk: "Charla:"
  }
};
const avatar$Q = {
  loading: "Ta kargando avatar...",
  title: {
    maximize: "Maksimisá",
    minimize: "Minimisá",
    close: "Sera",
    clickToMaximize: "Klik pa maksimisá",
    clickToMinimize: "Klik pa minimalisá"
  },
  error: {
    loadFailed: "No a logra karga avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer no a wòrdu kargá",
    passwordRequired: "Kontraseña nesesario pa un archivo .ania enkriptá",
    noSource: "No tin fuente di avatar suministrá (avatarUrl òf avatarData)"
  }
};
const greetings$R = {
  "0": "Alo! Kon mi por yuda bo awe?",
  "1": "Halo! Bon bini! Kiko mi por hasi pa bo?",
  "2": "Hei konta! Mi ta kontentu di papia ku bo!",
  "3": "Halo! Mi ta aki pa yuda. Kiko bo mester?",
  "4": "Hei! Kon ta ku bo? Kon mi por ta útil?"
};
const waiting$R = {
  "0": "Laga mi pensa...",
  "1": "Un momentu...",
  "2": "Prosesamentu...",
  "3": "Djis un ratu...",
  "4": "Mi ta kontrolá esei pa bo..."
};
const pap = {
  chat: chat$Q,
  avatar: avatar$Q,
  greetings: greetings$R,
  waiting: waiting$R
};
const __vite_glob_0_138 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$Q,
  chat: chat$Q,
  default: pap,
  greetings: greetings$R,
  waiting: waiting$R
}, Symbol.toStringTag, { value: "Module" }));
const chat$P = {
  input: {
    placeholder: "Wpisz wiadomość...",
    listening: "Słucham..."
  },
  enableSound: "Włącz dźwięk",
  stt: {
    transcribing: "Transkrypcja: ",
    micActive: "Mikrofon aktywny...",
    heardError: "Przepraszam, nie słyszałem cię. Spróbuj ponownie.",
    micAccessError: "Nie można uzyskać dostępu do mikrofonu. Sprawdź uprawnienia."
  },
  speed: {
    idle: "Bezczynność:",
    talk: "Dyskusja:"
  }
};
const avatar$P = {
  loading: "Ładowanie awatara...",
  title: {
    maximize: "Maksymalizuj",
    minimize: "Minimalizuj",
    close: "Zamknij",
    clickToMaximize: "Kliknij, aby zmaksymalizować",
    clickToMinimize: "Kliknij, aby zminimalizować"
  },
  error: {
    loadFailed: "Nie udało się załadować awatara: {{error}} ",
    playerNotLoaded: "AniaPlayer nie został załadowany",
    passwordRequired: "Hasło wymagane do zaszyfrowanego pliku .ania",
    noSource: "Nie podano źródła awatara (avatarUrl lub avatarData)"
  }
};
const greetings$Q = {
  "0": "Cześć! Jak mogę Ci dzisiaj pomóc?",
  "1": "Cześć! Powitanie! Co mogę dla Ciebie zrobić?",
  "2": "Cześć! Bardzo się cieszę, że mogę z tobą porozmawiać!",
  "3": "Cześć! Jestem tu, żeby pomóc. Czego potrzebujesz?",
  "4": "Cześć! Jak się masz? Jak mogę się przydać?"
};
const waiting$Q = {
  "0": "Daj mi pomyśleć...",
  "1": "Jedna chwila...",
  "2": "Przetwarzanie...",
  "3": "Tylko sekundę...",
  "4": "Sprawdzam to dla ciebie..."
};
const pl = {
  chat: chat$P,
  avatar: avatar$P,
  greetings: greetings$Q,
  waiting: waiting$Q
};
const __vite_glob_0_139 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$P,
  chat: chat$P,
  default: pl,
  greetings: greetings$Q,
  waiting: waiting$Q
}, Symbol.toStringTag, { value: "Module" }));
const chat$O = {
  input: {
    placeholder: "خپل پیغام ټایپ کړئ ...",
    listening: "اوریدل..."
  },
  enableSound: "غږ فعال کړئ",
  stt: {
    transcribing: "نقل کول: ",
    micActive: "مایکروفون فعال...",
    heardError: "بخښنه غواړم، تاسو یې نه اوریدلي. مهرباني وکړئ بیا هڅه وکړئ.",
    micAccessError: "مایکروفون ته د لاسرسي توان نلري. اجازې چیک کړئ."
  },
  speed: {
    idle: "بې کاره:",
    talk: "خبرې اترې:"
  }
};
const avatar$O = {
  loading: "اوتار پورته کول...",
  title: {
    maximize: "اعظمي کړئ",
    minimize: "ټیټ کړئ",
    close: "تړل",
    clickToMaximize: "د اعظمي کولو لپاره کلیک وکړئ",
    clickToMinimize: "د کمولو لپاره کلیک وکړئ"
  },
  error: {
    loadFailed: "د اوتار په پورته کولو کې پاتې راغلی: {{error}} ",
    playerNotLoaded: "انیا پلیر نه دی پورته شوی",
    passwordRequired: "د کوډ شوي .ania فایل لپاره پاسورډ اړین دی",
    noSource: "د اوتار سرچینه نه ده ورکړل شوې (avatarUrl یا avatarData)"
  }
};
const greetings$P = {
  "0": "سلام! نن څنګه زه ستاسو سره مرسته کولی شم؟",
  "1": "سلام! ښه راغلاست! زه ستاسو لپاره څه کولی شم؟",
  "2": "سلام پر تاسو! له تاسو سره په خبرو کولو خوښ یم!",
  "3": "سلام! زه دلته د مرستې لپاره یم. څه د پکار دی؟",
  "4": "سلام! تاسو څنګه یئ؟ زه څنګه ګټور کیدی شم؟"
};
const waiting$P = {
  "0": "اجازه راکړئ فکر وکړم ...",
  "1": "یوه شیبه...",
  "2": "پروسس کول...",
  "3": "یوازې یوه ثانیه ...",
  "4": "زه دا ستاسو لپاره ګورم ..."
};
const ps = {
  chat: chat$O,
  avatar: avatar$O,
  greetings: greetings$P,
  waiting: waiting$P
};
const __vite_glob_0_140 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$O,
  chat: chat$O,
  default: ps,
  greetings: greetings$P,
  waiting: waiting$P
}, Symbol.toStringTag, { value: "Module" }));
const greetings$O = {
  "0": "Olá! Como posso te ajudar hoje?",
  "1": "Oi! Boas-vindas! O que posso fazer por você?",
  "2": "Olá! Que bom falar com você!",
  "3": "Oi! Estou aqui para ajudar. Do que você precisa?",
  "4": "Olá! Tudo bem? Como posso ser útil?"
};
const waiting$O = {
  "0": "Deixe-me pensar...",
  "1": "Um momento...",
  "2": "Processando...",
  "3": "Só um instante...",
  "4": "Estou verificando isso para você..."
};
const ptBR = {
  "chat.input.placeholder": "Digite sua mensagem...",
  "chat.input.listening": "Ouvindo...",
  "chat.enableSound": "Ativar som",
  "chat.stt.transcribing": "Transcrevendo: ",
  "chat.stt.micActive": "Microfone ativo...",
  "chat.stt.heardError": "Desculpe, não consegui te ouvir. Tente novamente.",
  "chat.stt.micAccessError": "Não foi possível acessar o microfone. Verifique as permissões.",
  "chat.speed.idle": "Parado:",
  "chat.speed.talk": "Falando:",
  "chat.flow.back": "Voltar",
  "chat.flow.escalate": "Falar com um atendente",
  "chat.flow.submit": "Enviar",
  "chat.flow.skip": "Pular",
  "chat.flow.inputInvalid": "Verifique este campo e tente novamente.",
  "chat.error.generic": "Tive um probleminha aqui, pode tentar de novo?",
  "avatar.loading": "Carregando avatar...",
  "avatar.title.maximize": "Maximizar",
  "avatar.title.minimize": "Minimizar",
  "avatar.title.close": "Fechar",
  "avatar.title.clickToMaximize": "Clique para maximizar",
  "avatar.title.clickToMinimize": "Clique para minimizar",
  "avatar.error.loadFailed": "Falha ao carregar o avatar: {{error}}",
  "avatar.error.playerNotLoaded": "AniaPlayer não foi carregado",
  "avatar.error.passwordRequired": "Senha necessária para arquivo .ania criptografado",
  "avatar.error.noSource": "Nenhuma fonte de avatar fornecida (avatarUrl ou avatarData)",
  greetings: greetings$O,
  waiting: waiting$O
};
const __vite_glob_0_141 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ptBR,
  greetings: greetings$O,
  waiting: waiting$O
}, Symbol.toStringTag, { value: "Module" }));
const chat$N = {
  input: {
    placeholder: "Introduza a sua mensagem...",
    listening: "Ouvindo..."
  },
  enableSound: "Ativar som",
  stt: {
    transcribing: "Transcrever: ",
    micActive: "Microfone ativo...",
    heardError: "Desculpe, não o consegui ouvir. Por favor, tente novamente.",
    micAccessError: "Não foi possível aceder ao microfone. Verifique as permissões."
  },
  speed: {
    idle: "Inativo:",
    talk: "Fale:"
  }
};
const avatar$N = {
  loading: "Carregando avatar...",
  title: {
    maximize: "Maximizar",
    minimize: "Minimizar",
    close: "Fechar",
    clickToMaximize: "Clique para maximizar",
    clickToMinimize: "Clique para minimizar"
  },
  error: {
    loadFailed: "Falha ao carregar o avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer não carregado",
    passwordRequired: "Palavra-passe necessária para ficheiro .ania encriptado",
    noSource: "Nenhuma fonte de avatar fornecida (avatarUrl ou avatarData)"
  }
};
const greetings$N = {
  "0": "Olá! Como posso ajudá-lo hoje?",
  "1": "Olá! Bem-vindo! O que posso fazer por si?",
  "2": "Olá! Que bom falar consigo!",
  "3": "Olá! Estou aqui para ajudar. O que precisa?",
  "4": "Oi! Como vai? Como posso ser útil?"
};
const waiting$N = {
  "0": "Deixe-me pensar...",
  "1": "Um momento...",
  "2": "Processamento...",
  "3": "Só um segundo...",
  "4": "Estou a verificar isso para si..."
};
const ptPT = {
  chat: chat$N,
  avatar: avatar$N,
  greetings: greetings$N,
  waiting: waiting$N
};
const __vite_glob_0_142 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$N,
  chat: chat$N,
  default: ptPT,
  greetings: greetings$N,
  waiting: waiting$N
}, Symbol.toStringTag, { value: "Module" }));
const chat$M = {
  input: {
    placeholder: "Willakuyniykita qillqay...",
    listening: "Uyarispa..."
  },
  enableSound: "T’uqyayta atichiy",
  stt: {
    transcribing: "Transcripción: 1.1. ",
    micActive: "Micrófono activo...",
    heardError: "Pampachaykuway, mana uyariyta atirqaykichu. Ama hina kaspa, hukmanta kallpachakuy.",
    micAccessError: "Micrófonoman mana yaykuyta atispa. Permisokunata qhaway."
  },
  speed: {
    idle: "Ocioso: 1.1.",
    talk: "Rimanakuy:"
  }
};
const avatar$M = {
  loading: "Avatarta kargachkanki...",
  title: {
    maximize: "Maximizar",
    minimize: "Minimizar",
    close: "Wichqay",
    clickToMaximize: "Aswan hatun kananpaq ñit’iy",
    clickToMinimize: "Aswan pisi kananpaq ñit’iy"
  },
  error: {
    loadFailed: "Mana avatarta kargayta atirqanchu: {{error}} . ",
    playerNotLoaded: "AniaPlayer mana kargasqachu",
    passwordRequired: "Chifrasqa .ania willañiqipaq yaykuna rimay munasqa",
    noSource: "Mana avatar pukyuta qusqachu (avatarUrl icha avatarData) ."
  }
};
const greetings$M = {
  "0": "¡Hola! ¿Imaynatataq kunan punchaw yanapaykiman?",
  "1": "Allinllachu! Allinlla chayaykamuy! ¿Imatataq qampaq ruwayman?",
  "2": "Imaynallam! ¡Ancha kusisqan qanwan rimaspa!",
  "3": "Allinllachu! Yanapanaypaqmi kaypi kachkani. ¿Imatataq necesitanki?",
  "4": "Allinllachu! Imaynallam? ¿Imaynatataq yanapakuq kayman?"
};
const waiting$M = {
  "0": "Yuyaymanasaq...",
  "1": "Huk ratulla...",
  "2": "Procesamiento...",
  "3": "Huk segundolla...",
  "4": "Chayta qampaq qhawachkani..."
};
const qu = {
  chat: chat$M,
  avatar: avatar$M,
  greetings: greetings$M,
  waiting: waiting$M
};
const __vite_glob_0_143 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$M,
  chat: chat$M,
  default: qu,
  greetings: greetings$M,
  waiting: waiting$M
}, Symbol.toStringTag, { value: "Module" }));
const chat$L = {
  input: {
    placeholder: "Andika ubutumwa bwawe...",
    listening: "Kumviriza..."
  },
  enableSound: "Gushoboza Ijwi",
  stt: {
    transcribing: "Guhindura: ",
    micActive: "Mikoro irakora...",
    heardError: "Mbabarira, sinshobora kukwumva. Ndagusavye wongere ugerageze.",
    micAccessError: "Ntishobora gushika ku mikoro. Suzuma uruhusha."
  },
  speed: {
    idle: "Ubusa:",
    talk: "Ikiganiro:"
  }
};
const avatar$L = {
  loading: "Gushiramwo ishusho...",
  title: {
    maximize: "Gushiramwo vyinshi",
    minimize: "Kugabanya",
    close: "Gufunga",
    clickToMaximize: "Fyonda kugira ngo ushire hejuru",
    clickToMinimize: "Fyonda kugira ngo ugabanye"
  },
  error: {
    loadFailed: "Yananiwe gushiramwo avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ntiyashizwemwo",
    passwordRequired: "Ijambobanga rikenewe kuri dosiye .ania yashizwemwo",
    noSource: "Nta nkomoko y'ishusho yatanzwe (Url y'ishusho canke amakuru y'ishusho)"
  }
};
const greetings$L = {
  "0": "Ndagusavye! None nogufasha gute uno musi?",
  "1": "Mwaramutse! Muratumiwe! None nogukorera iki?",
  "2": "Mwaramutse! Nishimiye cane kuvugana nawe!",
  "3": "Mwaramutse! Ndi hano kugira mfashe. None wewe ukeneye iki?",
  "4": "Mwaramutse! Umerewe gute? Noba ngirakamaro gute?"
};
const waiting$L = {
  "0": "Reka niyumvire...",
  "1": "Umusi umwe...",
  "2": "Gutunganya...",
  "3": "Umusegonda gusa...",
  "4": "Ivyo ndabisuzuma kuri wewe..."
};
const rn = {
  chat: chat$L,
  avatar: avatar$L,
  greetings: greetings$L,
  waiting: waiting$L
};
const __vite_glob_0_144 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$L,
  chat: chat$L,
  default: rn,
  greetings: greetings$L,
  waiting: waiting$L
}, Symbol.toStringTag, { value: "Module" }));
const chat$K = {
  input: {
    placeholder: "Introduceți mesajul dvs....",
    listening: "Ascultând..."
  },
  enableSound: "Activați sunet",
  stt: {
    transcribing: "Transcriere: ",
    micActive: "Microfon activ...",
    heardError: "Îmi pare rău, nu te-am auzit. Vă rugăm să încercați din nou.",
    micAccessError: "Nu se poate accesa microfonul. Verificați permisiunile."
  },
  speed: {
    idle: "Inactiv:",
    talk: "Vorba:"
  }
};
const avatar$K = {
  loading: "Se încarcă avatarul...",
  title: {
    maximize: "Maximizați",
    minimize: "Minimizați",
    close: "Închide",
    clickToMaximize: "Faceți clic pentru a maximiza",
    clickToMinimize: "Faceți clic pentru a minimiza"
  },
  error: {
    loadFailed: "Avatarul nu a putut fi încărcat: {{error}} ",
    playerNotLoaded: "AniaPlayer nu este încărcat",
    passwordRequired: "Este necesară parola pentru fișierul criptat .ania",
    noSource: "Nu este furnizată nicio sursă de avatar (avatarUrl sau avatarData)"
  }
};
const greetings$K = {
  "0": "Salut! Cum te pot ajuta azi?",
  "1": "Buna ziua! Bun venit! Cu ce ​​vă pot ajuta?",
  "2": "Bună! Mă bucur să vorbesc cu tine!",
  "3": "Buna ziua! Sunt aici să ajut. De ce ai nevoie?",
  "4": "Hi! Ce mai faci? Cum pot fi de folos?"
};
const waiting$K = {
  "0": "Lasă-mă să mă gândesc...",
  "1": "Un moment...",
  "2": "Se procesează...",
  "3": "Doar o secundă...",
  "4": "verific asta pentru tine..."
};
const ro = {
  chat: chat$K,
  avatar: avatar$K,
  greetings: greetings$K,
  waiting: waiting$K
};
const __vite_glob_0_145 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$K,
  chat: chat$K,
  default: ro,
  greetings: greetings$K,
  waiting: waiting$K
}, Symbol.toStringTag, { value: "Module" }));
const chat$J = {
  input: {
    placeholder: "Xramosar tiro mesažo...",
    listening: "Shunen..."
  },
  enableSound: "Aktivisar o avazi",
  stt: {
    transcribing: "Transkripcia: ",
    micActive: "Mikrofono aktivo...",
    heardError: "Sàr man, naśti te aśunav tut. Mangav tumen te zumaven pale.",
    micAccessError: "Nashti te resel pes o mikrofono. Dikh e permisie."
  },
  speed: {
    idle: "Bibutjako:",
    talk: "Vorbin:"
  }
};
const avatar$J = {
  loading: "Te ćhivel pes o avatar...",
  title: {
    maximize: "Maj baro",
    minimize: "Te ciknjarel pes",
    close: "Phande",
    clickToMaximize: "Klikisar te barǒres",
    clickToMinimize: "Klikisar te ciknjares"
  },
  error: {
    loadFailed: "Naśti te ćhivel pes o avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer na si pherdo",
    passwordRequired: "Trubul o parovipen vaś o .ania lil kriptime",
    noSource: "Na si dino o źanglipe vaś o avatar (avatarUrl vaj avatarData)"
  }
};
const greetings$J = {
  "0": "Bachtalo! Sar shaj zhutiv tut adyes?",
  "1": "So keres! Miśto avilăn! So daștiv te kerav tuke?",
  "2": "So keres! But bahtalo te dav duma tusa!",
  "3": "So keres! Me sem kate te zhutiv. So trubul tut?",
  "4": "So keres! So keres? Sar śaj te avav laćho?"
};
const waiting$J = {
  "0": "Mukav man te gîndiv...",
  "1": "Jekh momento...",
  "2": "Procesing...",
  "3": "Numa jekh dujto...",
  "4": "Me dikhav kodo tuke..."
};
const rom = {
  chat: chat$J,
  avatar: avatar$J,
  greetings: greetings$J,
  waiting: waiting$J
};
const __vite_glob_0_146 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$J,
  chat: chat$J,
  default: rom,
  greetings: greetings$J,
  waiting: waiting$J
}, Symbol.toStringTag, { value: "Module" }));
const chat$I = {
  input: {
    placeholder: "Введите сообщение...",
    listening: "Слушаю..."
  },
  enableSound: "Включить звук",
  stt: {
    transcribing: "Транскрипция: ",
    micActive: "Микрофон активен...",
    heardError: "Извините, не услышал вас. Пожалуйста, попробуйте еще раз.",
    micAccessError: "Невозможно получить доступ к микрофону. Проверьте разрешения."
  },
  speed: {
    idle: "Простой:",
    talk: "Обсуждение:"
  }
};
const avatar$I = {
  loading: "Загрузка аватара...",
  title: {
    maximize: "Максимизировать",
    minimize: "Свернуть",
    close: "Закрыть",
    clickToMaximize: "Нажмите, чтобы развернуть",
    clickToMinimize: "Нажмите, чтобы свернуть"
  },
  error: {
    loadFailed: "Не удалось загрузить аватар: {{error}} ",
    playerNotLoaded: "AniaPlayer не загружен",
    passwordRequired: "Требуется пароль для зашифрованного файла .ania",
    noSource: "Не указан источник аватара (avatarUrl или avatarData)."
  }
};
const greetings$I = {
  "0": "Привет! Чем я могу помочь вам сегодня?",
  "1": "Привет! Добро пожаловать! Что я могу сделать для вас?",
  "2": "Всем привет! Так рад поговорить с тобой!",
  "3": "Привет! Я здесь, чтобы помочь. Что вам нужно?",
  "4": "Привет! Как вы? Чем я могу быть полезен?"
};
const waiting$I = {
  "0": "Дай мне подумать...",
  "1": "Один момент...",
  "2": "Обработка...",
  "3": "Всего секунду...",
  "4": "Я проверяю это для тебя..."
};
const ru = {
  chat: chat$I,
  avatar: avatar$I,
  greetings: greetings$I,
  waiting: waiting$I
};
const __vite_glob_0_147 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$I,
  chat: chat$I,
  default: ru,
  greetings: greetings$I,
  waiting: waiting$I
}, Symbol.toStringTag, { value: "Module" }));
const chat$H = {
  input: {
    placeholder: "Andika ubutumwa bwawe ...",
    listening: "Kumva ..."
  },
  enableSound: "Gushoboza Ijwi",
  stt: {
    transcribing: "Kwandukura: ",
    micActive: "Microphone ikora ...",
    heardError: "Ihangane, ntushobora kukumva. Nyamuneka gerageza.",
    micAccessError: "Ntushobora kubona mikoro. Reba uruhushya."
  },
  speed: {
    idle: "Ubusa:",
    talk: "Ikiganiro:"
  }
};
const avatar$H = {
  loading: "Gutwara avatar ...",
  title: {
    maximize: "Mugure",
    minimize: "Gabanya",
    close: "Funga",
    clickToMaximize: "Kanda kugirango ubone byinshi",
    clickToMinimize: "Kanda kugirango ugabanye"
  },
  error: {
    loadFailed: "Kunanirwa gukuramo avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ntabwo yikorewe",
    passwordRequired: "Ijambobanga risabwa kubanga .ania dosiye",
    noSource: "Nta soko ya avatar yatanzwe (avatarUrl cyangwa avatarData)"
  }
};
const greetings$H = {
  "0": "Muraho! Nigute nshobora kugufasha uyu munsi?",
  "1": "Mwaramutse! Murakaza neza! Nakugirira nte?",
  "2": "Muraho! Nishimiye cyane kuvugana nawe!",
  "3": "Mwaramutse! Ndi hano gufasha. Ukeneye iki?",
  "4": "Muraho! Mumeze mute? Nigute nshobora kuba ingirakamaro?"
};
const waiting$H = {
  "0": "Reka ntekereze ...",
  "1": "Umwanya umwe ...",
  "2": "Gutunganya ...",
  "3": "Isegonda gusa ...",
  "4": "Ndimo kugenzura ibyo kubwawe ..."
};
const rw = {
  chat: chat$H,
  avatar: avatar$H,
  greetings: greetings$H,
  waiting: waiting$H
};
const __vite_glob_0_148 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$H,
  chat: chat$H,
  default: rw,
  greetings: greetings$H,
  waiting: waiting$H
}, Symbol.toStringTag, { value: "Module" }));
const chat$G = {
  input: {
    placeholder: "स्वसन्देशं टङ्कयन्तु...",
    listening: "श्रुत्वा..."
  },
  enableSound: "ध्वनिं सक्षमं कुर्वन्तु",
  stt: {
    transcribing: "प्रतिलेखनम् : १. ",
    micActive: "माइक्रोफोन सक्रिय...",
    heardError: "क्षम्यतां, भवन्तं श्रोतुं न शक्तवान्। कृपया पुनः प्रयासं कुर्वन्तु।",
    micAccessError: "माइक्रोफोनं प्राप्तुं असमर्थः। अनुमतिः पश्यन्तु।"
  },
  speed: {
    idle: "निष्क्रियः : १.",
    talk: "वार्तालापः : १."
  }
};
const avatar$G = {
  loading: "अवतार लोड् भवति...",
  title: {
    maximize: "अधिकतमं कुरुत",
    minimize: "न्यूनतमं कुरुत",
    close: "निमील्यताम्",
    clickToMaximize: "अधिकतमं कर्तुं क्लिक् कुर्वन्तु",
    clickToMinimize: "न्यूनीकर्तुं क्लिक् कुर्वन्तु"
  },
  error: {
    loadFailed: "अवतारं लोड् कर्तुं असफलम्: {{error}} ",
    playerNotLoaded: "AniaPlayer न लोड् कृतम्",
    passwordRequired: "एन्क्रिप्टेड् .ania सञ्चिकायाः कृते गुप्तशब्दः आवश्यकः",
    noSource: "अवतारस्रोतः न प्रदत्तः (avatarUrl अथवा avatarData)"
  }
};
const greetings$G = {
  "0": "हाय ! अद्य अहं भवतः कथं साहाय्यं कर्तुं शक्नोमि?",
  "1": "नमस्ते! स्वागतम्‌! अहं भवतः कृते किं कर्तुं शक्नोमि ?",
  "2": "ही सर्वे! भवता सह वार्तालापं कृत्वा एतावत् प्रसन्नता!",
  "3": "नमस्ते! अहं साहाय्यं कर्तुं अत्र अस्मि। भवतः किं आवश्यकम् ?",
  "4": "नमस्कार! भवान्‌ कथमसि? कथं अहं उपयोगी भवेयम् ?"
};
const waiting$G = {
  "0": "अहं चिन्तयामि...",
  "1": "एकः क्षणः...",
  "2": "प्रसंस्करण...",
  "3": "केवलं एकं सेकण्डं...",
  "4": "अहं भवतः कृते तत् परीक्षयामि..."
};
const sa = {
  chat: chat$G,
  avatar: avatar$G,
  greetings: greetings$G,
  waiting: waiting$G
};
const __vite_glob_0_149 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$G,
  chat: chat$G,
  default: sa,
  greetings: greetings$G,
  waiting: waiting$G
}, Symbol.toStringTag, { value: "Module" }));
const chat$F = {
  input: {
    placeholder: "Scrivi lu to messaggiu...",
    listening: "Ascultannu..."
  },
  enableSound: "Attiva lu sonu",
  stt: {
    transcribing: "Trascrizzioni: ",
    micActive: "Micròfunu attivu...",
    heardError: "Scusa, non ti putìa sentiri. Pruva n'autra vota.",
    micAccessError: "Nun si po accèdiri ô micròfunu. Cuntrolla li pirmissi."
  },
  speed: {
    idle: "Inattivu:",
    talk: "Parrari:"
  }
};
const avatar$F = {
  loading: "Caricamentu di l'avatar...",
  title: {
    maximize: "Massimizzari",
    minimize: "Ridùciri ô minimu",
    close: "Chiudi",
    clickToMaximize: "Clicca pi massimizzari",
    clickToMinimize: "Clicca pi ridùciri ô minimu"
  },
  error: {
    loadFailed: "Nun arriniscìu a carricari l'avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer nun caricatu",
    passwordRequired: "La password è nicissària pû file criptatu .ania",
    noSource: "Nun fu furnita nudda funti di l'avatar (Url di l'avatar o dati di l'avatar)"
  }
};
const greetings$F = {
  "0": "Saluti! Comu ti pozzu aiutari oggi?",
  "1": "Salutamu! Bimminutu! Chi ti pozzu fari?",
  "2": "Ou ḍḍocu! Accussì cuntentu di parrari cu tia!",
  "3": "Salutamu! Sugnu ccà pi aiutari. Chi ti servi?",
  "4": "Salutamu! Comu semu? Comu possu èssiri utili?"
};
const waiting$F = {
  "0": "Lassami pinzari...",
  "1": "Nu mumentu...",
  "2": "Elaborazzioni...",
  "3": "Basta nu secunnu...",
  "4": "Chistu lu cuntrullu pi tia..."
};
const scn = {
  chat: chat$F,
  avatar: avatar$F,
  greetings: greetings$F,
  waiting: waiting$F
};
const __vite_glob_0_150 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$F,
  chat: chat$F,
  default: scn,
  greetings: greetings$F,
  waiting: waiting$F
}, Symbol.toStringTag, { value: "Module" }));
const chat$E = {
  input: {
    placeholder: "پنهنجو پيغام ٽائيپ ڪريو...",
    listening: "ٻڌندڙ..."
  },
  enableSound: "آواز کي فعال ڪريو",
  stt: {
    transcribing: "نقل ڪرڻ: ",
    micActive: "مائڪرو فون فعال...",
    heardError: "معاف ڪجو، توهان کي ٻڌي نه سگهيو. مهرباني ڪري ٻيهر ڪوشش ڪريو.",
    micAccessError: "مائڪروفون تائين رسائي نه ٿي سگھي. چيڪ ڪريو اجازتون."
  },
  speed: {
    idle: "بيڪار:",
    talk: "ڳالهه ٻولهه:"
  }
};
const avatar$E = {
  loading: "اوتار لوڊ ٿي رهيو آهي...",
  title: {
    maximize: "وڌ ۾ وڌ ڪرڻ",
    minimize: "گھٽ ڪرڻ",
    close: "بند",
    clickToMaximize: "وڌ کان وڌ ڪرڻ لاءِ ڪلڪ ڪريو",
    clickToMinimize: "گھٽ ڪرڻ لاءِ ڪلڪ ڪريو"
  },
  error: {
    loadFailed: "اوتار لوڊ ڪرڻ ۾ ناڪام ٿيو: {{error}} ",
    playerNotLoaded: "AniaPlayer لوڊ نه ٿيو",
    passwordRequired: "ڳجھو لفظ گھربل .ania فائل لاء",
    noSource: "ڪو به اوتار جو ذريعو مهيا نه ڪيو ويو آهي (avatarUrl يا avatarData)"
  }
};
const greetings$E = {
  "0": "هاءِ! مان اڄ ڪيئن توهان جي مدد ڪري سگهان ٿو؟",
  "1": "سلام! ڀلي ڪري آيا! مان توهان لاءِ ڇا ڪري سگهان ٿو؟",
  "2": "هيلو، تون آهين! توهان سان ڳالهائڻ لاء ڏاڍو خوش ٿيو!",
  "3": "سلام! مان مدد ڪرڻ لاءِ هتي آهيان. توکي ڪهڙي ضرورت آهي؟",
  "4": "سلام تون ڪيئن آهين؟ مان ڪيئن مفيد ٿي سگهان ٿو؟"
};
const waiting$E = {
  "0": "مون کي سوچڻ ڏي...",
  "1": "هڪ لحظه...",
  "2": "پروسيسنگ...",
  "3": "بس هڪ سيڪنڊ...",
  "4": "مان توهان لاءِ اهو چيڪ ڪري رهيو آهيان ..."
};
const sd = {
  chat: chat$E,
  avatar: avatar$E,
  greetings: greetings$E,
  waiting: waiting$E
};
const __vite_glob_0_151 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$E,
  chat: chat$E,
  default: sd,
  greetings: greetings$E,
  waiting: waiting$E
}, Symbol.toStringTag, { value: "Module" }));
const chat$D = {
  input: {
    placeholder: "Sû tokua ti mo...",
    listening: "Ti mä..."
  },
  enableSound: "Zia son",
  stt: {
    transcribing: "Ti sû pekoni: ",
    micActive: "Micro ni ayeke sara kua...",
    heardError: "Pardon, mbi lingbi ti mä mo pëpe. Pardon, kiri mo tara ni.",
    micAccessError: "A lingbi ti wara micro. Bâ apermission ni."
  },
  speed: {
    idle: "Idle:",
    talk: "Diskur:"
  }
};
const avatar$D = {
  loading: "A yeke zia avatar...",
  title: {
    maximize: "Maximisé",
    minimize: "Minimiser",
    close: "Fermé",
    clickToMaximize: "Cliqué na ndö ti maximiser .",
    clickToMinimize: "Cliqué na ndö ti minimiser ."
  },
  error: {
    loadFailed: "A yeke wara na yâ ti avatar ni: {{error}} ",
    playerNotLoaded: "AniaJoueur a yeke charge ni pepe",
    passwordRequired: "A hunda ti zia mot de passe na yâ ti fichier .ania so a crypté ni .",
    noSource: "A mû pëpe mbeni lingu ti avatar (Url ti avatar wala asango ti avatar)"
  }
};
const greetings$D = {
  "0": "Bonjour! Mo lingbi ti mû maboko na mo laso tongana nyen?",
  "1": "Mbi bara ala! Nzoni gangon! Nyen la mbi lingbi ti sara ndali ti mo?",
  "2": "Bara ala ka! So mbi yeke na ngia ti sara lisoro na mo!",
  "3": "Mbi bara ala! Mbi yeke ge ti mû maboko. Nyen la mo yeke na bezoin ni?",
  "4": "Mbi bara ala! Tongana nyen? Tongana nyen la mo lingbi ti sara kua na ni?"
};
const waiting$D = {
  "0": "Zia mbi pensé...",
  "1": "Mbeni ngoi...",
  "2": "Sarango kua...",
  "3": "Gi mbeni seconde...",
  "4": "Mbi yeke bâ ni ndali ti mo..."
};
const sg = {
  chat: chat$D,
  avatar: avatar$D,
  greetings: greetings$D,
  waiting: waiting$D
};
const __vite_glob_0_152 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$D,
  chat: chat$D,
  default: sg,
  greetings: greetings$D,
  waiting: waiting$D
}, Symbol.toStringTag, { value: "Module" }));
const chat$C = {
  input: {
    placeholder: "ပေႃႉလိၵ်ႈၸဝ်ႈၵဝ်ႇ...",
    listening: "ထွမ်ႇယူႇ..."
  },
  enableSound: "ပိုတ်ႇသဵင်",
  stt: {
    transcribing: "ၵၢၼ်တႅမ်ႈမၢႆ: ",
    micActive: "မၢႆၶရူဝ်ႇၾူၼ်း တူင်ႉၼိုင်ယူႇ...",
    heardError: "ၶႂၢင်းပၼ်ၶႃႈ ဢမ်ႇလႆႈငိၼ်းသဵင်သူ။ ၶိုၼ်းၶတ်းၸႂ်တူၺ်းၶႃႈ။",
    micAccessError: "ဢမ်ႇၸၢင်ႈၶဝ်ႈတူၺ်း မၢႆၾူင်း။ ထတ်းတူၺ်း ၶႂၢင်ႉ။"
  },
  speed: {
    idle: "ဢမ်ႇႁဵတ်းၵၢၼ်",
    talk: "ဢုပ်ႇၵုမ်-"
  }
};
const avatar$C = {
  loading: "တၢင်ႇႁၢင်ႈၽၢင်...",
  title: {
    maximize: "ႁႂ်ႈသုင်သုတ်း",
    minimize: "လူတ်းယွမ်း",
    close: "ဢိုတ်း",
    clickToMaximize: "ၼဵၵ်းႁႂ်ႈၼမ်သုတ်း",
    clickToMinimize: "ၼဵၵ်းႁႂ်ႈဢေႇသုတ်း"
  },
  error: {
    loadFailed: "ဢမ်ႇၸၢင်ႈဢဝ်ဢႃႇဝႃႇတႃႇ: {{error}} ",
    playerNotLoaded: "ဢၼိယႃႇပလႄး ဢမ်ႇလႆႈလူင်း",
    passwordRequired: "လူဝ်ႇလႆႈၸႂ်ႉမၢႆလပ်ႉ တႃႇၾၢႆႇ .ania ဢၼ်သႂ်ႇဝႆႉ",
    noSource: "ဢမ်ႇပၼ်ၶေႃႈမုၼ်း ဢႃႇဝႃႇတႃႇ (avatarUrl ဢမ်ႇၼၼ် ဢႃႇဝႃႇတႃႇData)"
  }
};
const greetings$C = {
  "0": "မႂ်ႇသုင်ၶႃႈ! မိူဝ်ႈၼႆႉ တေႁဵတ်းႁိုဝ်ၸွႆႈထႅမ်လႆႈ။",
  "1": "မႂ်ႇသုင်ၶႃႈ! ငိၼ်းၸူမ်းႁပ်ႉတွၼ်ႈ! ၵဝ်တေႁဵတ်းသင်ပၼ်လႆႈ၊",
  "2": "မႂ်ႇသုင်! ၸူမ်းၼႃႇ ဢၼ်လႆႈဢုပ်ႇၵၼ်!",
  "3": "မႂ်ႇသုင်ၶႃႈ! မႃးၸွႆႈထႅမ်ၶႃႈ လူဝ်ႇသင်၊",
  "4": "မႂ်ႇသုင်! ယူႇလီယူႇႁႃႉ? တေႁဵတ်းႁိုဝ် ႁႂ်ႈပဵၼ်ၽွၼ်းလီ၊"
};
const waiting$C = {
  "0": "ႁႂ်ႈၶႃႈဝူၼ်ႉ...",
  "1": "ၸူဝ်ႈၵႅပ်ႉၼိုင်ႈ...",
  "2": "ၵၢၼ်ႁဵတ်းၵၢၼ်...",
  "3": "ၼိုင်ႈၸူဝ်ႈမူင်းၵူၺ်း...",
  "4": "ၶႃႈထတ်းတူၺ်းပၼ်သူယူႇ..."
};
const shn = {
  chat: chat$C,
  avatar: avatar$C,
  greetings: greetings$C,
  waiting: waiting$C
};
const __vite_glob_0_153 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$C,
  chat: chat$C,
  default: shn,
  greetings: greetings$C,
  waiting: waiting$C
}, Symbol.toStringTag, { value: "Module" }));
const chat$B = {
  input: {
    placeholder: "ඔබගේ පණිවිඩය ටයිප් කරන්න...",
    listening: "සවන් දෙනවා..."
  },
  enableSound: "ශබ්දය සක්රිය කරන්න",
  stt: {
    transcribing: "පිටපත් කිරීම: ",
    micActive: "මයික්‍රෆෝනය සක්‍රීය...",
    heardError: "කණගාටුයි, ඔබට ඇසීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.",
    micAccessError: "මයික්‍රෆෝනයට ප්‍රවේශ විය නොහැක. අවසර පරීක්ෂා කරන්න."
  },
  speed: {
    idle: "නිෂ්ක්‍රීය:",
    talk: "කතා කරන්න:"
  }
};
const avatar$B = {
  loading: "avatar පූරණය වෙමින්...",
  title: {
    maximize: "උපරිම කරන්න",
    minimize: "අවම කරන්න",
    close: "වසන්න",
    clickToMaximize: "උපරිම කිරීමට ක්ලික් කරන්න",
    clickToMinimize: "අවම කිරීමට ක්ලික් කරන්න"
  },
  error: {
    loadFailed: "අවතාරය පූරණය කිරීමට අසමත් විය: {{error}} ",
    playerNotLoaded: "AniaPlayer පූරණය කර නැත",
    passwordRequired: "සංකේතනය කළ .ania ගොනුව සඳහා මුරපදය අවශ්‍ය වේ",
    noSource: "avatar මූලාශ්‍රයක් සපයා නැත (avatarUrl හෝ avatarData)"
  }
};
const greetings$B = {
  "0": "හායි! අද මම ඔබට උදව් කරන්නේ කෙසේද?",
  "1": "ආයුබෝවන්! සාදරයෙන් පිළිගනිමු! මට ඔයාට කළ හැක්කේ කුමක් ද?",
  "2": "ආයුබෝවන් කොහොම ද! ඔබ සමඟ කතා කිරීමට ලැබීම ගැන සතුටුයි!",
  "3": "ආයුබෝවන්! මම මෙතන ඉන්නේ උදව් කරන්න. ඔයාට අවශ්ය කුමක් ද?",
  "4": "හායි! ඔයාට කොහොම ද? මට ප්‍රයෝජනවත් විය හැක්කේ කෙසේද?"
};
const waiting$B = {
  "0": "මට හිතන්න දෙන්න...",
  "1": "එක මොහොතක්...",
  "2": "සකසමින්...",
  "3": "තත්පරයක්...",
  "4": "මම ඔබ වෙනුවෙන් එය පරීක්ෂා කරමි ..."
};
const si = {
  chat: chat$B,
  avatar: avatar$B,
  greetings: greetings$B,
  waiting: waiting$B
};
const __vite_glob_0_154 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$B,
  chat: chat$B,
  default: si,
  greetings: greetings$B,
  waiting: waiting$B
}, Symbol.toStringTag, { value: "Module" }));
const chat$A = {
  input: {
    placeholder: "Napíšte svoju správu...",
    listening: "Počúvanie..."
  },
  enableSound: "Povoliť zvuk",
  stt: {
    transcribing: "Prepis: ",
    micActive: "Mikrofón aktívny...",
    heardError: "Prepáčte, nepočul som vás. Skúste to znova.",
    micAccessError: "Nedá sa získať prístup k mikrofónu. Skontrolujte povolenia."
  },
  speed: {
    idle: "Nečinný:",
    talk: "Hovor:"
  }
};
const avatar$A = {
  loading: "Načítava sa avatar...",
  title: {
    maximize: "Maximalizovať",
    minimize: "Minimalizovať",
    close: "Zavrieť",
    clickToMaximize: "Kliknutím maximalizujete",
    clickToMinimize: "Kliknutím minimalizujete"
  },
  error: {
    loadFailed: "Nepodarilo sa načítať avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer nie je načítaný",
    passwordRequired: "Pre zašifrovaný súbor .ania sa vyžaduje heslo",
    noSource: "Nebol poskytnutý žiadny zdroj avatara (avatarUrl alebo avatarData)"
  }
};
const greetings$A = {
  "0": "Ahoj! Ako ti dnes môžem pomôcť?",
  "1": "Dobrý deň! Vitajte! čo pre teba môžem urobiť?",
  "2": "Dobrý deň! Som rád, že s vami môžem hovoriť!",
  "3": "Dobrý deň! Som tu, aby som vám pomohol. čo potrebuješ",
  "4": "Ahoj! ako sa máš? Ako môžem byť užitočný?"
};
const waiting$A = {
  "0": "Nechaj ma premýšľať...",
  "1": "Moment...",
  "2": "Spracováva sa...",
  "3": "Len sekundu...",
  "4": "Kontrolujem ti to..."
};
const sk = {
  chat: chat$A,
  avatar: avatar$A,
  greetings: greetings$A,
  waiting: waiting$A
};
const __vite_glob_0_155 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$A,
  chat: chat$A,
  default: sk,
  greetings: greetings$A,
  waiting: waiting$A
}, Symbol.toStringTag, { value: "Module" }));
const chat$z = {
  input: {
    placeholder: "Vnesite sporočilo ...",
    listening: "Poslušanje ..."
  },
  enableSound: "Omogoči zvok",
  stt: {
    transcribing: "Prepisovanje: ",
    micActive: "Mikrofon aktiven...",
    heardError: "Oprostite, nisem vas slišal. prosim poskusite ponovno",
    micAccessError: "Do mikrofona ni mogoče dostopati. Preverite dovoljenja."
  },
  speed: {
    idle: "nedejaven:",
    talk: "Pogovor:"
  }
};
const avatar$z = {
  loading: "Nalaganje avatarja ...",
  title: {
    maximize: "Povečaj",
    minimize: "Zmanjšaj",
    close: "Zapri",
    clickToMaximize: "Kliknite za povečavo",
    clickToMinimize: "Kliknite za pomanjšanje"
  },
  error: {
    loadFailed: "Nalaganje avatarja ni uspelo: {{error}} ",
    playerNotLoaded: "AniaPlayer ni naložen",
    passwordRequired: "Za šifrirano datoteko .ania je potrebno geslo",
    noSource: "Vir avatarja ni naveden (avatarUrl ali avatarData)"
  }
};
const greetings$z = {
  "0": "zdravo Kako ti lahko danes pomagam?",
  "1": "pozdravljena Dobrodošli! Kaj lahko storim za vas?",
  "2": "Pozdravljeni! Zelo me veseli, da se pogovarjam s teboj!",
  "3": "pozdravljena Tukaj sem, da pomagam. kaj potrebuješ",
  "4": "zdravo kako si Kako sem lahko koristen?"
};
const waiting$z = {
  "0": "Naj pomislim...",
  "1": "Trenutek ...",
  "2": "Obdelava ...",
  "3": "Samo trenutek ...",
  "4": "To preverjam za vas ..."
};
const sl = {
  chat: chat$z,
  avatar: avatar$z,
  greetings: greetings$z,
  waiting: waiting$z
};
const __vite_glob_0_156 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$z,
  chat: chat$z,
  default: sl,
  greetings: greetings$z,
  waiting: waiting$z
}, Symbol.toStringTag, { value: "Module" }));
const chat$y = {
  input: {
    placeholder: "Tusi lau fe'au...",
    listening: "Fa'alogo..."
  },
  enableSound: "Fa'aaga le leo",
  stt: {
    transcribing: "Tusitala: ",
    micActive: "Ua gaioi le masini faaleotele leo...",
    heardError: "Fa'amalie atu, ua le mafai ona fa'alogoina oe. Fa'amolemole toe taumafai.",
    micAccessError: "Le mafai ona maua le masini faaleotele leo. Siaki fa'atagaga."
  },
  speed: {
    idle: "Pi'e:",
    talk: "Talanoaga:"
  }
};
const avatar$y = {
  loading: "Tu'u avatar...",
  title: {
    maximize: "Fa'atele",
    minimize: "Fa'aitiitiga",
    close: "Tapuni",
    clickToMaximize: "Kiliki e fa'ateleina",
    clickToMinimize: "Kiliki e fa'aitiitia"
  },
  error: {
    loadFailed: "Ua le mafai ona uta le avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer e le'i utaina",
    passwordRequired: "Manaomia upu fa'aigoa mo faila .ania fa'ailoga",
    noSource: "Leai se puna avatar ua saunia (avatarUrl po'o avatarData)"
  }
};
const greetings$y = {
  "0": "Talofa! E mafai faapefea ona ou fesoasoani ia te oe i le aso?",
  "1": "Talofa! Afio mai! O le a se mea e mafai ona ou faia mo oe?",
  "2": "O a mai oe! E fiafia lava e talanoa atu ia te oe!",
  "3": "Talofa! Ua ou i ai e fesoasoani. O a mea e te mana'omia?",
  "4": "Talofa! O a mai oe? E mafai faapefea ona ou aoga?"
};
const waiting$y = {
  "0": "Sei ou mafaufau...",
  "1": "E tasi le taimi...",
  "2": "Fa'agasolo...",
  "3": "Na'o sina sekone...",
  "4": "Ou te siakiina lena mea mo oe..."
};
const sm = {
  chat: chat$y,
  avatar: avatar$y,
  greetings: greetings$y,
  waiting: waiting$y
};
const __vite_glob_0_157 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$y,
  chat: chat$y,
  default: sm,
  greetings: greetings$y,
  waiting: waiting$y
}, Symbol.toStringTag, { value: "Module" }));
const chat$x = {
  input: {
    placeholder: "Nyora meseji yako...",
    listening: "Kuteerera..."
  },
  enableSound: "Enesa Inzwi",
  stt: {
    transcribing: "Kunyora: ",
    micActive: "Maikorofoni inoshanda...",
    heardError: "Ndine urombo, handina kukunzwa. Ndapota edza zvakare.",
    micAccessError: "Tatadza kuwana maikorofoni. Tarisa mvumo."
  },
  speed: {
    idle: "Idle:",
    talk: "Hurukuro:"
  }
};
const avatar$x = {
  loading: "Kurodha avatar...",
  title: {
    maximize: "Maximize",
    minimize: "Deredza",
    close: "Close",
    clickToMaximize: "Dzvanya kuti uwedzere",
    clickToMinimize: "Dzvanya kuti uderedze"
  },
  error: {
    loadFailed: "Yatadza kurodha avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer haina kurodha",
    passwordRequired: "Password inodiwa pa encrypted .ania file",
    noSource: "Hapana avatar sosi yakapihwa (avatarUrl kana avatarData)"
  }
};
const greetings$x = {
  "0": "Hi! Ndingakubatsira sei nhasi?",
  "1": "Mhoro! Mauya! Chii chandingakuitira?",
  "2": "Mhoroi apo! Ndafara kutaura newe!",
  "3": "Mhoro! Ndauya kuzobatsira. Unodei?",
  "4": "Mhoro! Makadii? Ndingabatsira sei?"
};
const waiting$x = {
  "0": "Rega ndifunge...",
  "1": "Imwe nguva...",
  "2": "Kugadzira...",
  "3": "Sekondi chete...",
  "4": "Ndiri kukutarisa kuti..."
};
const sn = {
  chat: chat$x,
  avatar: avatar$x,
  greetings: greetings$x,
  waiting: waiting$x
};
const __vite_glob_0_158 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$x,
  chat: chat$x,
  default: sn,
  greetings: greetings$x,
  waiting: waiting$x
}, Symbol.toStringTag, { value: "Module" }));
const chat$w = {
  input: {
    placeholder: "Ku qor fariintaada...",
    listening: "Dhegeysi..."
  },
  enableSound: "Daar Codka",
  stt: {
    transcribing: "Qoraal: ",
    micActive: "Makarafoonka firfircoon...",
    heardError: "Waan ka xunahay, kuma maqli karin Fadlan isku day mar kale",
    micAccessError: "Aan awoodin in uu galo makarafoon Hubi ogolaanshaha"
  },
  speed: {
    idle: "Shaqo la'aan",
    talk: "Hadal:"
  }
};
const avatar$w = {
  loading: "Soodejinaya avatar...",
  title: {
    maximize: "Kordhi",
    minimize: "Yaree",
    close: "Xir",
    clickToMaximize: "Guji si aad u badiso",
    clickToMinimize: "Guji si aad u yarayso"
  },
  error: {
    loadFailed: "Ku guuldareystay inuu soo geliyo avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer lama rarin",
    passwordRequired: "Erayga sirta ah ayaa looga baahan yahay faylka .ania sir ah",
    noSource: "Isha avatar lama bixiyo (avatarUrl ama avatarData)"
  }
};
const greetings$w = {
  "0": "Hi! Sideen ku caawin karaa maanta?",
  "1": "Hello! Soo dhawoow! Maxaan kuu qabtaa?",
  "2": "Waa salaaman tahay! Aad ayaan ugu faraxsanahay inaan kula hadlo!",
  "3": "Hello! waxaan u imid inaan caawiyo Maxaad u baahan tahay?",
  "4": "Hi! iska waran Sideen waxtar u yeelan karaa?"
};
const waiting$w = {
  "0": "Aan ka fikiro...",
  "1": "Hal daqiiqo...",
  "2": "Habaynta...",
  "3": "Kaliya hal ilbiriqsi...",
  "4": "Taas ayaan adiga kuu eegayaa..."
};
const so = {
  chat: chat$w,
  avatar: avatar$w,
  greetings: greetings$w,
  waiting: waiting$w
};
const __vite_glob_0_159 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$w,
  chat: chat$w,
  default: so,
  greetings: greetings$w,
  waiting: waiting$w
}, Symbol.toStringTag, { value: "Module" }));
const chat$v = {
  input: {
    placeholder: "Shkruani mesazhin tuaj...",
    listening: "Duke dëgjuar..."
  },
  enableSound: "Aktivizo Tingullin",
  stt: {
    transcribing: "Transkriptimi: ",
    micActive: "Mikrofoni aktiv...",
    heardError: "Më falni, nuk ju dëgjova. Ju lutemi provoni përsëri.",
    micAccessError: "Nuk mund të qaset në mikrofon. Kontrolloni lejet."
  },
  speed: {
    idle: "I papunë:",
    talk: "Bisedoni:"
  }
};
const avatar$v = {
  loading: "Po ngarkon avatarin...",
  title: {
    maximize: "Maksimizoni",
    minimize: "Minimizoje",
    close: "Mbylle",
    clickToMaximize: "Klikoni për të maksimizuar",
    clickToMinimize: "Kliko për të minimizuar"
  },
  error: {
    loadFailed: "Ngarkimi i avatarit dështoi: {{error}} ",
    playerNotLoaded: "AniaPlayer nuk është ngarkuar",
    passwordRequired: "Kërkohet fjalëkalimi për skedarin .ania të koduar",
    noSource: "Nuk është dhënë asnjë burim avatar (avatarUrl ose avatarData)"
  }
};
const greetings$v = {
  "0": "Përshëndetje! Si mund t'ju ndihmoj sot?",
  "1": "Përshëndetje! Mirë se vini! Çfarë mund të bëj për ju?",
  "2": "Përshëndetje! Shumë i lumtur të flas me ju!",
  "3": "Përshëndetje! Unë jam këtu për të ndihmuar. Çfarë ju duhet?",
  "4": "Përshëndetje! si jeni? Si mund të jem i dobishëm?"
};
const waiting$v = {
  "0": "Më lër të mendoj...",
  "1": "Një moment...",
  "2": "Po përpunohet...",
  "3": "Vetëm një sekondë...",
  "4": "Po e kontrolloj për ty..."
};
const sq = {
  chat: chat$v,
  avatar: avatar$v,
  greetings: greetings$v,
  waiting: waiting$v
};
const __vite_glob_0_160 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$v,
  chat: chat$v,
  default: sq,
  greetings: greetings$v,
  waiting: waiting$v
}, Symbol.toStringTag, { value: "Module" }));
const chat$u = {
  input: {
    placeholder: "Унесите своју поруку...",
    listening: "слушам..."
  },
  enableSound: "Омогући звук",
  stt: {
    transcribing: "Транскрипција: ",
    micActive: "Микрофон активан...",
    heardError: "Извините, нисам вас чуо. Покушајте поново.",
    micAccessError: "Није могуће приступити микрофону. Проверите дозволе."
  },
  speed: {
    idle: "Неактиван:",
    talk: "разговор:"
  }
};
const avatar$u = {
  loading: "Учитавање аватара...",
  title: {
    maximize: "Максимизирајте",
    minimize: "Минимизирајте",
    close: "Затвори",
    clickToMaximize: "Кликните да бисте увећали",
    clickToMinimize: "Кликните да бисте минимизирали"
  },
  error: {
    loadFailed: "Учитавање аватара није успело: {{error}} ",
    playerNotLoaded: "АниаПлаиер није учитан",
    passwordRequired: "Лозинка је потребна за шифровану .аниа датотеку",
    noSource: "Није наведен извор аватара (аватарУрл или аватарДата)"
  }
};
const greetings$u = {
  "0": "Здраво! Како вам могу помоћи данас?",
  "1": "Здраво! Добродошли! Шта могу учинити за вас?",
  "2": "Здраво! Драго ми је да разговарам са вама!",
  "3": "Здраво! Ту сам да помогнем. шта ти треба?",
  "4": "Здраво! како си? Како могу бити користан?"
};
const waiting$u = {
  "0": "да размислим...",
  "1": "један тренутак...",
  "2": "Обрада...",
  "3": "Само секунд...",
  "4": "Проверавам то за тебе..."
};
const sr = {
  chat: chat$u,
  avatar: avatar$u,
  greetings: greetings$u,
  waiting: waiting$u
};
const __vite_glob_0_161 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$u,
  chat: chat$u,
  default: sr,
  greetings: greetings$u,
  waiting: waiting$u
}, Symbol.toStringTag, { value: "Module" }));
const chat$t = {
  input: {
    placeholder: "Thayipha umlayeto wakho...",
    listening: "Ngiyalalela..."
  },
  enableSound: "Nika emandla Umsindvo",
  stt: {
    transcribing: "Kubhala phansi: ",
    micActive: "Imakrofoni iyasebenta...",
    heardError: "Ngiyacolisa, angizange ngikuve. Sicela uphindze uzame futsi.",
    micAccessError: "Ayikhoni kufinyelela emakhrofoni. Hlola timvume."
  },
  speed: {
    idle: "Idle:",
    talk: "Inkhulumo:"
  }
};
const avatar$t = {
  loading: "Kulayisha i-avatar...",
  title: {
    maximize: "Khulisa",
    minimize: "Nciphisa",
    close: "Vala",
    clickToMaximize: "Chafata kute ukhulise",
    clickToMinimize: "Chafata kute unciphise"
  },
  error: {
    loadFailed: "Kwehlulekile kulayisha i-avatar: {{error}} ",
    playerNotLoaded: "Umdlali we-Ania akalayishwa",
    passwordRequired: "Iphasiwedi ledzingekako yefayela le-.ania lelibhaliwe",
    noSource: "Kute umtfombo we-avatar loniketiwe (i-Url ye-avatar noma i-avatarData)"
  }
};
const greetings$t = {
  "0": "Sawubona! Ngingakusita njani lamuhla?",
  "1": "Sawubona! Kwemukela! Yini lengingakwentela yona?",
  "2": "Sawubona lapho! Ngiyajabula kakhulu kukhuluma nawe!",
  "3": "Sawubona! Ngilapha kute ngisite. Yini lokudzingako?",
  "4": "Sawubona! Unjani? Ngingaba njani lusito?"
};
const waiting$t = {
  "0": "Ake ngicabange...",
  "1": "Umzuzu munye...",
  "2": "Kucubungula...",
  "3": "Umzuzwana nje...",
  "4": "Ngikuhlolela loko..."
};
const ss = {
  chat: chat$t,
  avatar: avatar$t,
  greetings: greetings$t,
  waiting: waiting$t
};
const __vite_glob_0_162 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$t,
  chat: chat$t,
  default: ss,
  greetings: greetings$t,
  waiting: waiting$t
}, Symbol.toStringTag, { value: "Module" }));
const chat$s = {
  input: {
    placeholder: "Ngola molaetsa oa hau...",
    listening: "Ke mametse..."
  },
  enableSound: "Ntsha Modumo",
  stt: {
    transcribing: "Ngola: ",
    micActive: "Maekerofounu ea sebetsa...",
    heardError: "Tšoarelo, ha kea u utloa. Ka kopo, leka hape.",
    micAccessError: "Ha e khone ho fihlella maekrofounu. Sheba litumello."
  },
  speed: {
    idle: "E sa sebetse:",
    talk: "Puo:"
  }
};
const avatar$s = {
  loading: "E kenya avatar...",
  title: {
    maximize: "Eketsa",
    minimize: "Fokotsa",
    close: "Koala",
    clickToMaximize: "Tobetsa ho holisa",
    clickToMinimize: "Tobetsa ho fokotsa"
  },
  error: {
    loadFailed: "E hlolehile ho kenya avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ha e kentsoe",
    passwordRequired: "Lentsoe la lekunutu lea hlokahala bakeng sa faele e kentsoeng ea .ania",
    noSource: "Ha ho mohloli o fanoeng (avatarUrl kapa avatarData)"
  }
};
const greetings$s = {
  "0": "Lumela! Nka o thusa jwang kajeno?",
  "1": "Lumela! Rea u amohela! Nka u etsetsang?",
  "2": "Ho joang! Ke thabela ho bua le uena!",
  "3": "Lumela! Ke mona ho tla thusa. U hloka eng?",
  "4": "Lumela! U phela joang? Nka ba molemo joang?"
};
const waiting$s = {
  "0": "Ere ke nahane...",
  "1": "Motsotso o le mong...",
  "2": "E ntse e sebetsa...",
  "3": "Motsotsoana feela...",
  "4": "Ke u lekola seo..."
};
const st = {
  chat: chat$s,
  avatar: avatar$s,
  greetings: greetings$s,
  waiting: waiting$s
};
const __vite_glob_0_163 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$s,
  chat: chat$s,
  default: st,
  greetings: greetings$s,
  waiting: waiting$s
}, Symbol.toStringTag, { value: "Module" }));
const chat$r = {
  input: {
    placeholder: "Ketik pesen anjeun...",
    listening: "Dengekeun..."
  },
  enableSound: "Aktipkeun Sora",
  stt: {
    transcribing: "Transkripsi: ",
    micActive: "Mikropon aktip...",
    heardError: "Hapunten, teu tiasa ngadangu anjeun. Mangga cobian deui.",
    micAccessError: "Teu bisa ngakses mikropon. Pariksa idin."
  },
  speed: {
    idle: "dianggurkeun:",
    talk: "Obrolan:"
  }
};
const avatar$r = {
  loading: "Ngamuat avatar...",
  title: {
    maximize: "Maksimalkeun",
    minimize: "Ngaleutikan",
    close: "Tutup",
    clickToMaximize: "Klik pikeun maksimalkeun pungsi",
    clickToMinimize: "Klik pikeun ngaleutikan"
  },
  error: {
    loadFailed: "Gagal ngamuat avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer teu dimuat",
    passwordRequired: "Sandi diperlukeun pikeun énkripsi file .ania",
    noSource: "Teu aya sumber avatar anu disayogikeun (avatarUrl atanapi avatarData)"
  }
};
const greetings$r = {
  "0": "Hai! Kumaha abdi tiasa ngabantosan anjeun dinten ayeuna?",
  "1": "Halo! Wilujeng sumping! Naon anu tiasa abdi lakukeun pikeun anjeun?",
  "2": "Héi anu di dinya! Jadi bungah ngobrol jeung anjeun!",
  "3": "Halo! Abdi di dieu pikeun mantuan. Kunaon anjeun peryogi?",
  "4": "Hai! Kumaha damang? Kumaha carana abdi tiasa mangpaat?"
};
const waiting$r = {
  "0": "Hayu atuh mikir...",
  "1": "Sakedap...",
  "2": "Ngolah...",
  "3": "Sakedap...",
  "4": "Abdi mariksa éta pikeun anjeun ..."
};
const su = {
  chat: chat$r,
  avatar: avatar$r,
  greetings: greetings$r,
  waiting: waiting$r
};
const __vite_glob_0_164 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$r,
  chat: chat$r,
  default: su,
  greetings: greetings$r,
  waiting: waiting$r
}, Symbol.toStringTag, { value: "Module" }));
const chat$q = {
  input: {
    placeholder: "Skriv ditt meddelande...",
    listening: "Lyssnar..."
  },
  enableSound: "Aktivera ljud",
  stt: {
    transcribing: "Transkribera: ",
    micActive: "Mikrofonen är aktiv...",
    heardError: "Förlåt, jag kunde inte höra dig. Försök igen.",
    micAccessError: "Det går inte att komma åt mikrofonen. Kontrollera behörigheter."
  },
  speed: {
    idle: "Tomgång:",
    talk: "Prata:"
  }
};
const avatar$q = {
  loading: "Laddar avatar...",
  title: {
    maximize: "Maximera",
    minimize: "Minimera",
    close: "Stäng",
    clickToMaximize: "Klicka för att maximera",
    clickToMinimize: "Klicka för att minimera"
  },
  error: {
    loadFailed: "Det gick inte att ladda avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer har inte laddats",
    passwordRequired: "Lösenord krävs för krypterad .ania-fil",
    noSource: "Ingen avatarkälla tillhandahålls (avatarUrl eller avatarData)"
  }
};
const greetings$q = {
  "0": "Hej! Hur kan jag hjälpa dig idag?",
  "1": "Hej! Välkomna! Vad kan jag göra för dig?",
  "2": "Hej där! Så glad att få prata med dig!",
  "3": "Hej! Jag är här för att hjälpa till. Vad behöver du?",
  "4": "Hej! Hur mår du? Hur kan jag vara användbar?"
};
const waiting$q = {
  "0": "Låt mig tänka...",
  "1": "Ett ögonblick...",
  "2": "Bearbetar...",
  "3": "Bara en sekund...",
  "4": "Jag kollar det åt dig..."
};
const sv = {
  chat: chat$q,
  avatar: avatar$q,
  greetings: greetings$q,
  waiting: waiting$q
};
const __vite_glob_0_165 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$q,
  chat: chat$q,
  default: sv,
  greetings: greetings$q,
  waiting: waiting$q
}, Symbol.toStringTag, { value: "Module" }));
const chat$p = {
  input: {
    placeholder: "Andika ujumbe wako...",
    listening: "Inasikiliza..."
  },
  enableSound: "Washa Sauti",
  stt: {
    transcribing: "Kunukuu: ",
    micActive: "Maikrofoni inatumika...",
    heardError: "Samahani, sikuweza kukusikia. Tafadhali jaribu tena.",
    micAccessError: "Haiwezi kufikia maikrofoni. Angalia ruhusa."
  },
  speed: {
    idle: "Bila kufanya kitu:",
    talk: "Mazungumzo:"
  }
};
const avatar$p = {
  loading: "Inapakia avatar...",
  title: {
    maximize: "Ongeza",
    minimize: "Punguza",
    close: "Funga",
    clickToMaximize: "Bofya ili kuongeza",
    clickToMinimize: "Bofya ili kupunguza"
  },
  error: {
    loadFailed: "Imeshindwa kupakia avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer haijapakiwa",
    passwordRequired: "Nenosiri linahitajika kwa faili iliyosimbwa kwa njia fiche ya .ania",
    noSource: "Hakuna chanzo cha ishara kilichotolewa (avatarUrl au avatarData)"
  }
};
const greetings$p = {
  "0": "Habari! Nikusaidieje leo?",
  "1": "Habari! Karibu! Nikufanyie nini?",
  "2": "Habari! Nimefurahi sana kuzungumza nawe!",
  "3": "Habari! Niko hapa kusaidia. Unahitaji nini?",
  "4": "Habari! Habari yako? Ninawezaje kuwa na manufaa?"
};
const waiting$p = {
  "0": "Hebu nifikirie...",
  "1": "Dakika moja...",
  "2": "Inachakata...",
  "3": "Sekunde moja tu...",
  "4": "Ninakuangalia hiyo..."
};
const sw = {
  chat: chat$p,
  avatar: avatar$p,
  greetings: greetings$p,
  waiting: waiting$p
};
const __vite_glob_0_166 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$p,
  chat: chat$p,
  default: sw,
  greetings: greetings$p,
  waiting: waiting$p
}, Symbol.toStringTag, { value: "Module" }));
const chat$o = {
  input: {
    placeholder: "Wpisz swoja wiadōmość...",
    listening: "Ôsłuchajōm..."
  },
  enableSound: "Włōncz źwiynk",
  stt: {
    transcribing: "Przepisowanie: ",
    micActive: "Mikrofōn je aktywny...",
    heardError: "Przepraszam, niy mōg ci usłyszeć. Proszōm sprōbować jeszcze raz.",
    micAccessError: "Niy można dostympu do mikrofōnu. Sprawdź przizwolynia."
  },
  speed: {
    idle: "Bezczynny:",
    talk: "Godanie:"
  }
};
const avatar$o = {
  loading: "Ładujōm awatar...",
  title: {
    maximize: "Maksymalizować",
    minimize: "Zminimalizować",
    close: "Zamknij",
    clickToMaximize: "Kliknij, coby zmaksymalizować",
    clickToMinimize: "Kliknij, coby zminimalizować"
  },
  error: {
    loadFailed: "Niy udało sie załadować awatara: {{error}} ",
    playerNotLoaded: "AniaPlayer niy je załadowany",
    passwordRequired: "Wymogane hasło do zaszyfrowanego pliku .ania",
    noSource: "Brak podanego zdrzōdła awatara (Url awatara abo Dane awatara)"
  }
};
const greetings$o = {
  "0": "Cześć! Jak mogōm ci dzisiej pōmōc?",
  "1": "Witej! Witej! Co mogōm ci zrobić?",
  "2": "Witej! Tak cieszōm sie z tobom porozmawiać!",
  "3": "Witej! Jōn sōm tu, coby pōmōc. Co ci potrzebne?",
  "4": "Serwus! Jak sie mosz? Jak mogōm być przidajny?"
};
const waiting$o = {
  "0": "Pozwōl mi pomyśleć...",
  "1": "Jedna chwila...",
  "2": "Przetworzanie...",
  "3": "Ino sekunda...",
  "4": "Sprawdzōm to dlo ciebie..."
};
const szl = {
  chat: chat$o,
  avatar: avatar$o,
  greetings: greetings$o,
  waiting: waiting$o
};
const __vite_glob_0_167 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$o,
  chat: chat$o,
  default: szl,
  greetings: greetings$o,
  waiting: waiting$o
}, Symbol.toStringTag, { value: "Module" }));
const chat$n = {
  input: {
    placeholder: "உங்கள் செய்தியை உள்ளிடவும்...",
    listening: "கேட்கிறது..."
  },
  enableSound: "ஒலியை இயக்கு",
  stt: {
    transcribing: "படியெடுத்தல்: ",
    micActive: "மைக்ரோஃபோன் செயலில் உள்ளது...",
    heardError: "மன்னிக்கவும், உங்கள் பேச்சைக் கேட்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    micAccessError: "மைக்ரோஃபோனை அணுக முடியவில்லை. அனுமதிகளைச் சரிபார்க்கவும்."
  },
  speed: {
    idle: "சும்மா:",
    talk: "பேச்சு:"
  }
};
const avatar$n = {
  loading: "அவதாரத்தை ஏற்றுகிறது...",
  title: {
    maximize: "அதிகப்படுத்து",
    minimize: "குறைக்கவும்",
    close: "மூடு",
    clickToMaximize: "பெரிதாக்க கிளிக் செய்யவும்",
    clickToMinimize: "குறைக்க கிளிக் செய்யவும்"
  },
  error: {
    loadFailed: "அவதாரத்தை ஏற்றுவதில் தோல்வி: {{error}} ",
    playerNotLoaded: "AniaPlayer ஏற்றப்படவில்லை",
    passwordRequired: "என்க்ரிப்ட் செய்யப்பட்ட .ania கோப்பிற்கு கடவுச்சொல் தேவை",
    noSource: "அவதார் ஆதாரம் எதுவும் வழங்கப்படவில்லை (avatarUrl அல்லது avatarData)"
  }
};
const greetings$n = {
  "0": "ஹாய்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
  "1": "வணக்கம்! வருக! நான் உனக்கு என்ன செய்ய முடியும்?",
  "2": "வணக்கம்! உங்களுடன் பேசுவதில் மிக்க மகிழ்ச்சி!",
  "3": "வணக்கம்! நான் உதவி செய்ய வந்துள்ளேன். உனக்கு என்ன வேண்டும்?",
  "4": "ஹாய்! எப்படி இருக்கிறீர்கள்? நான் எப்படி பயனுள்ளதாக இருக்க முடியும்?"
};
const waiting$n = {
  "0": "நான் சிந்திக்கட்டும்...",
  "1": "ஒரு கணம்...",
  "2": "செயலாக்குகிறது...",
  "3": "ஒரு நொடி...",
  "4": "நான் அதை உங்களுக்காக சரிபார்க்கிறேன்..."
};
const ta = {
  chat: chat$n,
  avatar: avatar$n,
  greetings: greetings$n,
  waiting: waiting$n
};
const __vite_glob_0_168 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$n,
  chat: chat$n,
  default: ta,
  greetings: greetings$n,
  waiting: waiting$n
}, Symbol.toStringTag, { value: "Module" }));
const chat$m = {
  input: {
    placeholder: "మీ సందేశాన్ని టైప్ చేయండి...",
    listening: "వింటూ..."
  },
  enableSound: "ధ్వనిని ప్రారంభించండి",
  stt: {
    transcribing: "లిప్యంతరీకరణ: ",
    micActive: "మైక్రోఫోన్ యాక్టివ్...",
    heardError: "క్షమించండి, మీ మాట వినలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.",
    micAccessError: "మైక్రోఫోన్‌ని యాక్సెస్ చేయడం సాధ్యపడలేదు. అనుమతులను తనిఖీ చేయండి."
  },
  speed: {
    idle: "నిష్క్రియ:",
    talk: "చర్చ:"
  }
};
const avatar$m = {
  loading: "అవతార్ లోడ్ అవుతోంది...",
  title: {
    maximize: "గరిష్టీకరించు",
    minimize: "కనిష్టీకరించు",
    close: "మూసివేయి",
    clickToMaximize: "గరిష్టీకరించడానికి క్లిక్ చేయండి",
    clickToMinimize: "కనిష్టీకరించడానికి క్లిక్ చేయండి"
  },
  error: {
    loadFailed: "అవతార్ లోడ్ చేయడంలో విఫలమైంది: {{error}} ",
    playerNotLoaded: "AniaPlayer లోడ్ చేయబడలేదు",
    passwordRequired: "గుప్తీకరించిన .ania ఫైల్ కోసం పాస్‌వర్డ్ అవసరం",
    noSource: "అవతార్ మూలం అందించబడలేదు (avatarUrl లేదా avatarData)"
  }
};
const greetings$m = {
  "0": "హాయ్! ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
  "1": "హలో! స్వాగతం! నేను మీ కోసం ఏమి చేయగలను?",
  "2": "హాయ్! మీతో మాట్లాడినందుకు చాలా ఆనందంగా ఉంది!",
  "3": "హలో! నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీకు ఏమి కావాలి?",
  "4": "హాయ్! మీరు ఎలా ఉన్నారు? నేను ఎలా ఉపయోగపడగలను?"
};
const waiting$m = {
  "0": "నన్ను ఆలోచించనివ్వండి...",
  "1": "ఒక్క క్షణం...",
  "2": "ప్రాసెస్ చేస్తోంది...",
  "3": "ఒక్క సెకను...",
  "4": "నేను మీ కోసం దాన్ని తనిఖీ చేస్తున్నాను..."
};
const te = {
  chat: chat$m,
  avatar: avatar$m,
  greetings: greetings$m,
  waiting: waiting$m
};
const __vite_glob_0_169 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$m,
  chat: chat$m,
  default: te,
  greetings: greetings$m,
  waiting: waiting$m
}, Symbol.toStringTag, { value: "Module" }));
const chat$l = {
  input: {
    placeholder: "Hakerek ita-boot nia mensajen...",
    listening: "Rona hela..."
  },
  enableSound: "Habilita lian",
  stt: {
    transcribing: "Transkrisaun: ",
    micActive: "Mikrofone ativu...",
    heardError: "Deskulpa, labele rona ita-boot. Favor ida koko fali.",
    micAccessError: "Labele asesu ba mikrofone. Verifika lisensa sira."
  },
  speed: {
    idle: "Ocioso:",
    talk: "Diskursu:"
  }
};
const avatar$l = {
  loading: "Karregamentu hela avatar...",
  title: {
    maximize: "Maksimiza",
    minimize: "Minimiza",
    close: "Taka",
    clickToMaximize: "Klik atu maximiza",
    clickToMinimize: "Klik atu minimiza"
  },
  error: {
    loadFailed: "La konsege karrega avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer la karrega",
    passwordRequired: "Presiza liafuan-xave ba arkivu .ania ne'ebé enkriptadu",
    noSource: "Laiha fonte avatar ne'ebé fornese (avatarUrl ka avatarData)"
  }
};
const greetings$l = {
  "0": "Olá! Oinsá ha'u bele ajuda ita-boot ohin?",
  "1": "Óla! Benvindo! Saida maka ha'u bele halo ba ita-boot?",
  "2": "Ola! Kontente tebes atu ko'alia ho ita-boot!",
  "3": "Óla! Ha'u iha ne'e atu ajuda. Ita presiza saida?",
  "4": "Óla! Di'ak ka lae? Oinsá ha'u bele sai útil?"
};
const waiting$l = {
  "0": "Husik ha'u hanoin...",
  "1": "Momentu ida...",
  "2": "Prosesamentu...",
  "3": "Segundu ida de'it...",
  "4": "Ha'u verifika hela ida-ne'e ba ita-boot..."
};
const tet = {
  chat: chat$l,
  avatar: avatar$l,
  greetings: greetings$l,
  waiting: waiting$l
};
const __vite_glob_0_170 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$l,
  chat: chat$l,
  default: tet,
  greetings: greetings$l,
  waiting: waiting$l
}, Symbol.toStringTag, { value: "Module" }));
const chat$k = {
  input: {
    placeholder: "Паёми худро нависед...",
    listening: "Гӯш кардан..."
  },
  enableSound: "Овозро фаъол созед",
  stt: {
    transcribing: "Тарҷума: ",
    micActive: "Микрофон фаъол...",
    heardError: "Бубахшед, шуморо шунида натавонистам. Лутфан бори дигар кӯшиш кунед.",
    micAccessError: "Дастрасӣ ба микрофон нест. Иҷозатҳоро тафтиш кунед."
  },
  speed: {
    idle: "Бекор:",
    talk: "Баҳс:"
  }
};
const avatar$k = {
  loading: "Боркунии аватар...",
  title: {
    maximize: "Максимум кардан",
    minimize: "Кам кардан",
    close: "Пӯшед",
    clickToMaximize: "Барои калон кардан клик кунед",
    clickToMinimize: "Барои кам кардан клик кунед"
  },
  error: {
    loadFailed: "Аватар бор карда нашуд: {{error}} ",
    playerNotLoaded: "AniaPlayer бор карда нашудааст",
    passwordRequired: "Рамз барои файли рамзгузоришудаи .ania лозим аст",
    noSource: "Ягон манбаи аватар пешниҳод нашудааст (avatarUrl ё avatarData)"
  }
};
const greetings$k = {
  "0": "Салом! Чӣ тавр ман имрӯз ба шумо кӯмак карда метавонам?",
  "1": "Салом! Хуш омадед! Ба шумо чи хизмат карда метавонам?",
  "2": "Салом! Аз сӯҳбат бо шумо хеле шодам!",
  "3": "Салом! Ман барои кӯмак омадаам. Ба шумо чӣ лозим?",
  "4": "Салом! Шумо чӣ хелед? Чӣ тавр ман метавонам муфид бошам?"
};
const waiting$k = {
  "0": "Биёед ман фикр кунам ...",
  "1": "Як лаҳза...",
  "2": "Коркард...",
  "3": "Танҳо як сония ...",
  "4": "Ман инро барои шумо тафтиш мекунам ..."
};
const tg = {
  chat: chat$k,
  avatar: avatar$k,
  greetings: greetings$k,
  waiting: waiting$k
};
const __vite_glob_0_171 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$k,
  chat: chat$k,
  default: tg,
  greetings: greetings$k,
  waiting: waiting$k
}, Symbol.toStringTag, { value: "Module" }));
const chat$j = {
  input: {
    placeholder: "พิมพ์ข้อความของคุณ...",
    listening: "กำลังฟัง..."
  },
  enableSound: "เปิดใช้งานเสียง",
  stt: {
    transcribing: "การถอดเสียง: ",
    micActive: "ไมโครโฟนทำงานอยู่...",
    heardError: "ขออภัย ไม่ได้ยินคุณ โปรดลองอีกครั้ง",
    micAccessError: "ไม่สามารถเข้าถึงไมโครโฟนได้ ตรวจสอบสิทธิ์"
  },
  speed: {
    idle: "ไม่ได้ใช้งาน:",
    talk: "พูดคุย:"
  }
};
const avatar$j = {
  loading: "กำลังโหลดอวตาร...",
  title: {
    maximize: "ขยายใหญ่สุด",
    minimize: "ย่อเล็กสุด",
    close: "ปิด",
    clickToMaximize: "คลิกเพื่อขยายให้ใหญ่สุด",
    clickToMinimize: "คลิกเพื่อย่อขนาด"
  },
  error: {
    loadFailed: "โหลดอวตารไม่สำเร็จ: {{error}} ",
    playerNotLoaded: "AniaPlayer ไม่ได้โหลด",
    passwordRequired: "ต้องใช้รหัสผ่านสำหรับไฟล์ .ania ที่เข้ารหัส",
    noSource: "ไม่มีแหล่งที่มาของอวาตาร์ (avatarUrl หรือ avatarData)"
  }
};
const greetings$j = {
  "0": "สวัสดี! วันนี้ฉันจะช่วยคุณได้อย่างไร?",
  "1": "สวัสดี! ยินดีต้อนรับ! ฉันจะทำอะไรให้คุณได้บ้าง?",
  "2": "สวัสดี! ดีใจมากที่ได้พูดคุยกับคุณ!",
  "3": "สวัสดี! ฉันมาที่นี่เพื่อช่วย คุณต้องการอะไร?",
  "4": "สวัสดี! คุณเป็นอย่างไร? ฉันจะมีประโยชน์ได้อย่างไร?"
};
const waiting$j = {
  "0": "ให้ฉันคิดว่า...",
  "1": "สักครู่...",
  "2": "กำลังประมวลผล...",
  "3": "แค่วินาทีเดียว...",
  "4": "ฉันกำลังตรวจสอบสิ่งนั้นให้คุณ..."
};
const th = {
  chat: chat$j,
  avatar: avatar$j,
  greetings: greetings$j,
  waiting: waiting$j
};
const __vite_glob_0_172 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$j,
  chat: chat$j,
  default: th,
  greetings: greetings$j,
  waiting: waiting$j
}, Symbol.toStringTag, { value: "Module" }));
const chat$i = {
  input: {
    placeholder: "መልእኽትኻ ጽሓፍ...",
    listening: "ምስማዕ..."
  },
  enableSound: "ድምጺ ኣንቅሕ",
  stt: {
    transcribing: "ምጽሓፍ፤ ",
    micActive: "ማይክሮፎን ንጡፍ...",
    heardError: "ይቕሬታ ክሰምዓካ ኣይከኣልኩን። በጃኹም ደጊምኩም ፈትኑ።",
    micAccessError: "ማይክሮፎን ክትረክብ ኣይከኣለትን። ፍቓድ ምፍታሽ።"
  },
  speed: {
    idle: "ስራሕ ኣልቦ:",
    talk: "ዘረባ፤"
  }
};
const avatar$i = {
  loading: "ኣቫታር ኣብ ምጽዓን...",
  title: {
    maximize: "Maximize ምግባር",
    minimize: "ምጉዳል",
    close: "ዕጸዎ።",
    clickToMaximize: "ንኽትዓቢ ጠውቕ",
    clickToMinimize: "ንምንካይ ጠውቑ"
  },
  error: {
    loadFailed: "ኣቫታር ምጽዓን ኣይተኻእለን: {{error}} ",
    playerNotLoaded: "AniaPlayer ኣይተጻዕነን።",
    passwordRequired: "ንዝተመሰጠረ .ania ፋይል ፓስዎርድ የድሊ",
    noSource: "ምንጪ ኣቫታር ኣይተዋህበን (avatarUrl ወይ avatarData)"
  }
};
const greetings$i = {
  "0": "ሰላም! ሎሚ ብኸመይ ክሕግዘካ ይኽእል?",
  "1": "ሰላም! እንኳዕ ደሓን መፁ! እንታይ ክገብረልካ ይኽእል?",
  "2": "ሰላም! ምሳኻ ምዝርራበይ ኣዝዩ ደስ ይብለኒ!",
  "3": "ሰላም! ክሕግዝ እየ ኣብዚ ዘለኹ። እንታይ የድልየካ?",
  "4": "ሰላም! ከመይ አለካ፧ ከመይ ጌረ እየ ጠቓሚ ክኸውን ዝኽእል?"
};
const waiting$i = {
  "0": "እስከ ክሓስብ...",
  "1": "ሓንቲ ህሞት...",
  "2": "መስርሕ...",
  "3": "ካልኢት ጥራይ...",
  "4": "ኣነ ንዓኻትኩም እየ ዝፍትሽ ዘለኹ..."
};
const ti = {
  chat: chat$i,
  avatar: avatar$i,
  greetings: greetings$i,
  waiting: waiting$i
};
const __vite_glob_0_173 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$i,
  chat: chat$i,
  default: ti,
  greetings: greetings$i,
  waiting: waiting$i
}, Symbol.toStringTag, { value: "Module" }));
const chat$h = {
  input: {
    placeholder: "Habaryňyzy ýazyň ...",
    listening: "Diňlemek ..."
  },
  enableSound: "Ses açmak",
  stt: {
    transcribing: "Transkripsiýa: ",
    micActive: "Mikrofon işjeň ...",
    heardError: "Bagyşlaň, sizi diňläp bilmedim Gaýtadan synanyşmagyňyzy haýyş edýäris.",
    micAccessError: "Mikrofona girip bolmaýar Rugsatlary barlaň."
  },
  speed: {
    idle: "Boş:",
    talk: "Gepleşik:"
  }
};
const avatar$h = {
  loading: "Awatar ýüklenýär ...",
  title: {
    maximize: "Ulaltmak",
    minimize: "Minimallaşdyryň",
    close: ".Akyn",
    clickToMaximize: "Ulaltmak üçin basyň",
    clickToMinimize: "Minimallaşdyrmak üçin basyň"
  },
  error: {
    loadFailed: "Awatary ýükläp bilmedi: {{error}} ",
    playerNotLoaded: "AniaPlayer ýüklenmedi",
    passwordRequired: "Şifrlenen .ania faýly üçin parol gerek",
    noSource: "Awatar çeşmesi berilmedi (avatarUrl ýa-da avatarData)"
  }
};
const greetings$h = {
  "0": "Salam! Bu gün size nädip kömek edip bilerin?",
  "1": "Salam! Hoş geldiňiz! Men saňa näme edip bilerin?",
  "2": "Salam! Siziň bilen gürleşmäge şat!",
  "3": "Salam! Men kömek etmek üçin geldim. Size näme gerek?",
  "4": "Salam! ?Agdaýlaryňyz nähili? Nädip peýdaly bolup bilerin?"
};
const waiting$h = {
  "0": "Pikir edip göreýin ...",
  "1": "Bir pursat ...",
  "2": "Gaýtadan işlemek ...",
  "3": "Diňe bir sekunt ...",
  "4": "Men muny siziň üçin barlaýaryn ..."
};
const tk = {
  chat: chat$h,
  avatar: avatar$h,
  greetings: greetings$h,
  waiting: waiting$h
};
const __vite_glob_0_174 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$h,
  chat: chat$h,
  default: tk,
  greetings: greetings$h,
  waiting: waiting$h
}, Symbol.toStringTag, { value: "Module" }));
const chat$g = {
  input: {
    placeholder: "Thaepa molaetsa wa gago...",
    listening: "Go reetsa..."
  },
  enableSound: "Kgontsha Modumo",
  stt: {
    transcribing: "Go kwalolola: ",
    micActive: "Maekerofouno e a dira...",
    heardError: "Tshwarelo, ga ke a go utlwa. Tsweetswee leka gape.",
    micAccessError: "Ga e kgone go bona maekerofouno. Tlhola ditetlelelo."
  },
  speed: {
    idle: "Idle:",
    talk: "Puo:"
  }
};
const avatar$g = {
  loading: "Go laisa setshwantsho...",
  title: {
    maximize: "Godisang",
    minimize: "Fokotsa",
    close: "Tswala",
    clickToMaximize: "Tobetsa go godisa",
    clickToMinimize: "Tobetsa go fokotsa"
  },
  error: {
    loadFailed: "E paletswe ke go laisa setshwantsho: {{error}} ",
    playerNotLoaded: "Setshamekisi sa Ania ga se a laisiwa",
    passwordRequired: "Nomoro ya sephiri e a tlhokega mo faeleng ya .ania e e tsenngwang khoutu",
    noSource: "Ga go na motswedi wa setshwantsho o o neetsweng (Url ya setshwantsho kgotsa Tshedimosetso ya setshwantsho)"
  }
};
const greetings$g = {
  "0": "Dumela! Nka go thusa jang gompieno?",
  "1": "Dumelang! Amogelesega! Nka go direla eng?",
  "2": "Dumelang! Ke itumelela go bua le wena!",
  "3": "Dumelang! Ke fano go thusa. O tlhoka eng?",
  "4": "Dumelang! Le kae? Nka nna mosola jang?"
};
const waiting$g = {
  "0": "E re ke akanye...",
  "1": "Motsotso o le mongwe...",
  "2": "Go bereka...",
  "3": "Motsotswana fela...",
  "4": "Ke go tlhola seo..."
};
const tn = {
  chat: chat$g,
  avatar: avatar$g,
  greetings: greetings$g,
  waiting: waiting$g
};
const __vite_glob_0_175 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$g,
  chat: chat$g,
  default: tn,
  greetings: greetings$g,
  waiting: waiting$g
}, Symbol.toStringTag, { value: "Module" }));
const chat$f = {
  input: {
    placeholder: "Mesajınızı yazın...",
    listening: "Dinleniyor..."
  },
  enableSound: "Sesi Etkinleştir",
  stt: {
    transcribing: "Transkripsiyon: ",
    micActive: "Mikrofon aktif...",
    heardError: "Kusura bakmayın, sizi duyamadım. Lütfen tekrar deneyin.",
    micAccessError: "Mikrofona erişilemiyor. İzinleri kontrol edin."
  },
  speed: {
    idle: "Boşta:",
    talk: "Konuşma:"
  }
};
const avatar$f = {
  loading: "Avatar yükleniyor...",
  title: {
    maximize: "Büyüt",
    minimize: "Küçült",
    close: "Kapat",
    clickToMaximize: "Büyütmek için tıklayın",
    clickToMinimize: "Küçültmek için tıklayın"
  },
  error: {
    loadFailed: "Avatar yüklenemedi: {{error}} ",
    playerNotLoaded: "AniaPlayer yüklenmedi",
    passwordRequired: "Şifrelenmiş .ania dosyası için şifre gerekli",
    noSource: "Avatar kaynağı sağlanmadı (avatarUrl veya avatarData)"
  }
};
const greetings$f = {
  "0": "Merhaba! Bugün sana nasıl yardımcı olabilirim?",
  "1": "Merhaba! Hoş geldin! Sizin için ne yapabilirim?",
  "2": "Merhaba! Seninle konuştuğuma çok sevindim!",
  "3": "Merhaba! Yardım etmek için buradayım. Ne istiyorsun?",
  "4": "MERHABA! Nasılsın? Nasıl faydalı olabilirim?"
};
const waiting$f = {
  "0": "Bir düşüneyim...",
  "1": "Bir dakika...",
  "2": "İşleniyor...",
  "3": "Bir saniye...",
  "4": "Bunu senin için kontrol ediyorum..."
};
const tr = {
  chat: chat$f,
  avatar: avatar$f,
  greetings: greetings$f,
  waiting: waiting$f
};
const __vite_glob_0_176 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$f,
  chat: chat$f,
  default: tr,
  greetings: greetings$f,
  waiting: waiting$f
}, Symbol.toStringTag, { value: "Module" }));
const chat$e = {
  input: {
    placeholder: "Thayipha rungula ra wena...",
    listening: "Ku yingisela..."
  },
  enableSound: "Endla leswaku Mpfumawulo wu tirha",
  stt: {
    transcribing: "Ku tsala: . ",
    micActive: "Microphone yi tirha...",
    heardError: "Sorry, a ndzi swi kotanga ku ku twa. Hi kombela u ringeta nakambe.",
    micAccessError: "A swi koteki ku nghena eka microphone. Languta mpfumelelo."
  },
  speed: {
    idle: "Ku nga tirhi: .",
    talk: "Nkulumo: ."
  }
};
const avatar$e = {
  loading: "Ku layicha avatar...",
  title: {
    maximize: "Ku kurisa",
    minimize: "Ku hunguta",
    close: "Pfala",
    clickToMaximize: "Click ku kurisa",
    clickToMinimize: "Click ku hunguta"
  },
  error: {
    loadFailed: "Ku tsandzekile ku layicha avatar: {{error}} . ",
    playerNotLoaded: "AniaPlayer a yi layichiwanga",
    passwordRequired: "Phasiwedi ya laveka eka fayili ya .ania leyi pfaleriweke",
    noSource: "Ku hava xihlovo xa avatar lexi nyikiweke (avatarUrl kumbe avatarData) ."
  }
};
const greetings$e = {
  "0": "Hi! Xana ndzi nga ku pfuna njhani namuntlha?",
  "1": "Avuxeni! Amukela! Xana ndzi nga ku endlela yini?",
  "2": "Avuxeni kwalaho! Ndzi tsakile swinene ku vulavula na wena!",
  "3": "Avuxeni! Ndzi kona ku ta pfuna. Xana u lava yini?",
  "4": "Xewani! Ku njhani? Xana ndzi nga pfuna njhani?"
};
const waiting$e = {
  "0": "Ndzi pfumeleleni ndzi ehleketa...",
  "1": "Nkarhi wun'we...",
  "2": "Ku lulamisiwa ka...",
  "3": "Sekoni ntsena...",
  "4": "Ndzi ku checker sweswo..."
};
const ts = {
  chat: chat$e,
  avatar: avatar$e,
  greetings: greetings$e,
  waiting: waiting$e
};
const __vite_glob_0_177 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$e,
  chat: chat$e,
  default: ts,
  greetings: greetings$e,
  waiting: waiting$e
}, Symbol.toStringTag, { value: "Module" }));
const chat$d = {
  input: {
    placeholder: "Хәбәрегезне языгыз ...",
    listening: "Тыңлау ..."
  },
  enableSound: "Тавышны кушу",
  stt: {
    transcribing: "Транскрипция: ",
    micActive: "Микрофон актив ...",
    heardError: "Гафу итегез, сезне ишетә алмадым. Зинһар, кабатлап карагыз.",
    micAccessError: "Микрофонга керә алмый. Рөхсәтне тикшерегез."
  },
  speed: {
    idle: "Эшсез:",
    talk: "Сөйләшү:"
  }
};
const avatar$d = {
  loading: "Аватар йөкләү ...",
  title: {
    maximize: "Максимальләштерегез",
    minimize: "Минимум",
    close: "Ябу",
    clickToMaximize: "Максимальләштерү өчен басыгыз",
    clickToMinimize: "Минимальләштерү өчен басыгыз"
  },
  error: {
    loadFailed: "Аватарны йөкли алмады: {{error}} ",
    playerNotLoaded: "AniaPlayer йөкләнмәгән",
    passwordRequired: "Шифрланган .ania файл өчен серсүз кирәк",
    noSource: "Аватар чыганагы бирелмәгән (avatarUrl яки avatarData)"
  }
};
const greetings$d = {
  "0": "Сәлам! Бүген мин сезгә ничек ярдәм итә алам?",
  "1": "Сәлам! Рәхим итегез! Мин сезнең өчен нәрсә эшли алам?",
  "2": "Исәнмесез! Сезнең белән сөйләшергә бик шат!",
  "3": "Сәлам! Мин монда булышырга. Сезгә нәрсә кирәк?",
  "4": "Сәлам! Сез ничек? Мин ничек файдалы була алам?"
};
const waiting$d = {
  "0": "Уйлап карарга рөхсәт итегез ...",
  "1": "Бер мизгел ...",
  "2": "Эшкәртү ...",
  "3": "Бер секунд ...",
  "4": "Мин моны сезнең өчен тикшерәм ..."
};
const tt = {
  chat: chat$d,
  avatar: avatar$d,
  greetings: greetings$d,
  waiting: waiting$d
};
const __vite_glob_0_178 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$d,
  chat: chat$d,
  default: tt,
  greetings: greetings$d,
  waiting: waiting$d
}, Symbol.toStringTag, { value: "Module" }));
const chat$c = {
  input: {
    placeholder: "ئۇچۇرىڭىزنى يېزىڭ ...",
    listening: "ئاڭلاش ..."
  },
  enableSound: "ئاۋازنى قوزغىتىش",
  stt: {
    transcribing: "ترانسكرىپسىيە: ",
    micActive: "مىكروفون ئاكتىپ ...",
    heardError: "كەچۈرۈڭ ، سىزنى ئاڭلىيالمىدىم. قايتا سىناڭ.",
    micAccessError: "مىكروفوننى زىيارەت قىلالمىدى. ئىجازەتلەرنى تەكشۈرۈڭ."
  },
  speed: {
    idle: "بىكار:",
    talk: "سۆھبەت:"
  }
};
const avatar$c = {
  loading: "يۈكلەنگەن يۈك ...",
  title: {
    maximize: "Maximize",
    minimize: "كىچىكلىتىڭ",
    close: "تاقاش",
    clickToMaximize: "چوڭايتىش ئۈچۈن چېكىڭ",
    clickToMinimize: "كىچىكلىتىش ئۈچۈن چېكىڭ"
  },
  error: {
    loadFailed: "باش سۈرىتى يۈكلەنمىدى: {{error}} ",
    playerNotLoaded: "AniaPlayer يۈكلەنمىدى",
    passwordRequired: "مەخپىيلەشتۈرۈلگەن .ania ھۆججىتى ئۈچۈن پارول لازىم",
    noSource: "ھېچقانداق باش مەنبە تەمىنلەنمىگەن (avatarUrl ياكى avatarData)"
  }
};
const greetings$c = {
  "0": "ياخشىمۇسىز! بۈگۈن سىزگە قانداق ياردەم بېرەلەيمەن؟",
  "1": "ياخشىمۇسىز! خۇش كەپسىز! مەن سىزگە نېمە قىلالايمەن؟",
  "2": "ئەسسالامۇئەلەيكۇم! سىز بىلەن پاراڭلاشقانلىقىڭىزدىن خۇشالمەن!",
  "3": "ياخشىمۇسىز! مەن ياردەمگە كەلدىم. سىزگە نېمە لازىم؟",
  "4": "ياخشىمۇسىز! قانداق ئەھۋالىڭىز؟ مەن قانداقمۇ پايدىلىق بولالايمەن؟"
};
const waiting$c = {
  "0": "ئويلاپ باقاي ...",
  "1": "بىر دەم ...",
  "2": "بىر تەرەپ قىلىش ...",
  "3": "پەقەت بىر سېكۇنت ...",
  "4": "مەن ئۇنى تەكشۈرۈۋاتىمەن ..."
};
const ug = {
  chat: chat$c,
  avatar: avatar$c,
  greetings: greetings$c,
  waiting: waiting$c
};
const __vite_glob_0_179 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$c,
  chat: chat$c,
  default: ug,
  greetings: greetings$c,
  waiting: waiting$c
}, Symbol.toStringTag, { value: "Module" }));
const chat$b = {
  input: {
    placeholder: "Введіть своє повідомлення...",
    listening: "Слухання..."
  },
  enableSound: "Увімкнути звук",
  stt: {
    transcribing: "транскрибування: ",
    micActive: "Мікрофон активний...",
    heardError: "Вибачте, вас не чути. Спробуйте ще раз.",
    micAccessError: "Неможливо отримати доступ до мікрофона. Перевірте дозволи."
  },
  speed: {
    idle: "Неактивний:",
    talk: "Розмова:"
  }
};
const avatar$b = {
  loading: "Завантаження аватара...",
  title: {
    maximize: "Максимізувати",
    minimize: "Згорнути",
    close: "Закрити",
    clickToMaximize: "Натисніть, щоб розгорнути",
    clickToMinimize: "Натисніть, щоб згорнути"
  },
  error: {
    loadFailed: "Не вдалося завантажити аватар: {{error}} ",
    playerNotLoaded: "AniaPlayer не завантажується",
    passwordRequired: "Для зашифрованого файлу .ania потрібен пароль",
    noSource: "Джерело аватара не надано (avatarUrl або avatarData)"
  }
};
const greetings$b = {
  "0": "привіт Чим я можу тобі допомогти сьогодні?",
  "1": "Привіт! Ласкаво просимо! Що я можу для вас зробити?",
  "2": "Привіт! Так радий з вами поговорити!",
  "3": "Привіт! Я тут, щоб допомогти. що вам потрібно",
  "4": "привіт як справи Чим я можу бути корисним?"
};
const waiting$b = {
  "0": "Дай подумати...",
  "1": "Хвилинку...",
  "2": "Обробка...",
  "3": "Секундочку...",
  "4": "Я перевіряю це для вас..."
};
const uk = {
  chat: chat$b,
  avatar: avatar$b,
  greetings: greetings$b,
  waiting: waiting$b
};
const __vite_glob_0_180 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$b,
  chat: chat$b,
  default: uk,
  greetings: greetings$b,
  waiting: waiting$b
}, Symbol.toStringTag, { value: "Module" }));
const chat$a = {
  input: {
    placeholder: "اپنا پیغام ٹائپ کریں...",
    listening: "سن رہا ہے..."
  },
  enableSound: "آواز کو فعال کریں۔",
  stt: {
    transcribing: "نقل کرنا: ",
    micActive: "مائیکروفون فعال...",
    heardError: "معذرت، آپ کو سن نہیں سکا۔ براہ کرم دوبارہ کوشش کریں۔",
    micAccessError: "مائکروفون تک رسائی سے قاصر۔ اجازتیں چیک کریں۔"
  },
  speed: {
    idle: "بیکار:",
    talk: "گفتگو:"
  }
};
const avatar$a = {
  loading: "اوتار لوڈ ہو رہا ہے...",
  title: {
    maximize: "زیادہ سے زیادہ کرنا",
    minimize: "کم سے کم کرنا",
    close: "بند",
    clickToMaximize: "زیادہ سے زیادہ کرنے کے لیے کلک کریں۔",
    clickToMinimize: "کم سے کم کرنے کے لیے کلک کریں۔"
  },
  error: {
    loadFailed: "اوتار لوڈ کرنے میں ناکام: {{error}} ",
    playerNotLoaded: "AniaPlayer لوڈ نہیں ہوا۔",
    passwordRequired: "انکرپٹڈ .ania فائل کے لیے پاس ورڈ درکار ہے۔",
    noSource: "اوتار کا کوئی ذریعہ فراہم نہیں کیا گیا (avatarUrl یا avatarData)"
  }
};
const greetings$a = {
  "0": "ہائے! آج میں آپ کی مدد کیسے کر سکتا ہوں؟",
  "1": "ہیلو! خوش آمدید! میں آپ کے لیے کیا کر سکتا ہوں؟",
  "2": "ہیلو وہاں! آپ سے بات کر کے بہت خوشی ہوئی!",
  "3": "ہیلو! میں مدد کرنے کے لیے حاضر ہوں۔ تمہیں کیا چاہیے؟",
  "4": "ہائے! کیسی ہو؟ میں کس طرح مفید ہو سکتا ہوں؟"
};
const waiting$a = {
  "0": "مجھے سوچنے دو...",
  "1": "ایک لمحہ...",
  "2": "پروسیسنگ...",
  "3": "صرف ایک سیکنڈ...",
  "4": "میں اسے آپ کے لیے چیک کر رہا ہوں..."
};
const ur = {
  chat: chat$a,
  avatar: avatar$a,
  greetings: greetings$a,
  waiting: waiting$a
};
const __vite_glob_0_181 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$a,
  chat: chat$a,
  default: ur,
  greetings: greetings$a,
  waiting: waiting$a
}, Symbol.toStringTag, { value: "Module" }));
const chat$9 = {
  input: {
    placeholder: "Xabaringizni yozing...",
    listening: "Tinglanmoqda..."
  },
  enableSound: "Ovozni yoqish",
  stt: {
    transcribing: "Transkripsiya: ",
    micActive: "Mikrofon faol...",
    heardError: "Kechirasiz, sizni eshitmadim. Iltimos, qayta urinib koʻring.",
    micAccessError: "Mikrofonga kirish imkonsiz. Ruxsatlarni tekshiring."
  },
  speed: {
    idle: "Bo'sh:",
    talk: "Muloqot:"
  }
};
const avatar$9 = {
  loading: "Avatar yuklanmoqda...",
  title: {
    maximize: "Maksimallashtirish",
    minimize: "Minimallashtirish",
    close: "Yopish",
    clickToMaximize: "Kattalashtirish uchun bosing",
    clickToMinimize: "Kichraytirish uchun bosing"
  },
  error: {
    loadFailed: "Avatarni yuklab boʻlmadi: {{error}} ",
    playerNotLoaded: "AniaPlayer yuklanmagan",
    passwordRequired: "Shifrlangan .ania fayli uchun parol talab qilinadi",
    noSource: "Hech qanday avatar manbai berilmagan (avatarUrl yoki avatarData)"
  }
};
const greetings$9 = {
  "0": "Salom! Bugun sizga qanday yordam bera olaman?",
  "1": "Salom! Xush kelibsiz! Sizga qanday yordam berishim mukin?",
  "2": "Salom! Siz bilan gaplashganimdan xursandman!",
  "3": "Salom! Men yordam berish uchun keldim. Sizga nima kerak?",
  "4": "Salom! Qalaysiz? Qanday qilib foydali bo'lishim mumkin?"
};
const waiting$9 = {
  "0": "O'ylab ko'raylik...",
  "1": "Bir lahza...",
  "2": "Qayta ishlanmoqda...",
  "3": "Bir soniya...",
  "4": "Men buni siz uchun tekshiryapman ..."
};
const uz = {
  chat: chat$9,
  avatar: avatar$9,
  greetings: greetings$9,
  waiting: waiting$9
};
const __vite_glob_0_182 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$9,
  chat: chat$9,
  default: uz,
  greetings: greetings$9,
  waiting: waiting$9
}, Symbol.toStringTag, { value: "Module" }));
const chat$8 = {
  input: {
    placeholder: "Nhập tin nhắn của bạn...",
    listening: "Đang nghe..."
  },
  enableSound: "Bật âm thanh",
  stt: {
    transcribing: "Phiên âm: ",
    micActive: "Micrô đang hoạt động...",
    heardError: "Xin lỗi, không thể nghe thấy bạn. Vui lòng thử lại.",
    micAccessError: "Không thể truy cập micrô. Kiểm tra quyền."
  },
  speed: {
    idle: "Nhàn rỗi:",
    talk: "Nói chuyện:"
  }
};
const avatar$8 = {
  loading: "Đang tải hình đại diện...",
  title: {
    maximize: "Tối đa hóa",
    minimize: "Giảm thiểu",
    close: "Đóng",
    clickToMaximize: "Nhấp để tối đa hóa",
    clickToMinimize: "Bấm để thu nhỏ"
  },
  error: {
    loadFailed: "Không tải được hình đại diện: {{error}} ",
    playerNotLoaded: "AniaPlayer chưa được tải",
    passwordRequired: "Yêu cầu mật khẩu cho tệp .ania được mã hóa",
    noSource: "Không có nguồn hình đại diện nào được cung cấp (avatarUrl hoặc avatarData)"
  }
};
const greetings$8 = {
  "0": "Xin chào! Hôm nay tôi có thể giúp gì cho bạn?",
  "1": "Xin chào! Chào mừng! Tôi có thể làm gì cho bạn?",
  "2": "Chào bạn! Rất vui được nói chuyện với bạn!",
  "3": "Xin chào! Tôi ở đây để giúp đỡ. Bạn cần gì?",
  "4": "CHÀO! Bạn có khỏe không? Làm thế nào tôi có thể hữu ích?"
};
const waiting$8 = {
  "0": "Để tôi nghĩ...",
  "1": "Một khoảnh khắc...",
  "2": "Đang xử lý...",
  "3": "Chỉ một giây thôi...",
  "4": "Tôi đang kiểm tra điều đó cho bạn..."
};
const vi = {
  chat: chat$8,
  avatar: avatar$8,
  greetings: greetings$8,
  waiting: waiting$8
};
const __vite_glob_0_183 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$8,
  chat: chat$8,
  default: vi,
  greetings: greetings$8,
  waiting: waiting$8
}, Symbol.toStringTag, { value: "Module" }));
const chat$7 = {
  input: {
    placeholder: "Chwetheza umyalezo wakho...",
    listening: "Ndimamele..."
  },
  enableSound: "Vula isandi",
  stt: {
    transcribing: "Ukukhuphela: ",
    micActive: "Imayikrofoni iyasebenza...",
    heardError: "Uxolo, andikuva. Nceda zama kwakhona.",
    micAccessError: "Ayikwazanga ukufikelela kwimayikrofoni. Jonga iimvume."
  },
  speed: {
    idle: "Ayisebenzi:",
    talk: "Thetha:"
  }
};
const avatar$7 = {
  loading: "Ilayisha i-avatar...",
  title: {
    maximize: "Yandisa",
    minimize: "Nciphisa",
    close: "Vala",
    clickToMaximize: "Cofa ukwandisa",
    clickToMinimize: "Cofa ukunciphisa"
  },
  error: {
    loadFailed: "Ayiphumelelanga ukulayisha i-avatar: {{error}} ",
    playerNotLoaded: "I-AniaPlayer ayilayishwanga",
    passwordRequired: "Igama lokugqithisa elifunekayo kwifayile efihliweyo .ania",
    noSource: "Akukho mthombo we-avatar unikiweyo (i-avatarUrl okanye i-avatarData)"
  }
};
const greetings$7 = {
  "0": "Molo! Ndingakunceda ngantoni namhlanje?",
  "1": "Mholo! Wamkelekile! Ndingakwenzela ntoni?",
  "2": "Molo apho! Ndiyavuya ukuthetha nawe!",
  "3": "Mholo! Ndilapha ukunceda. Ingaba udinga ntoni?",
  "4": "Mholo Icomo estas? Ndinokuba luncedo njani?"
};
const waiting$7 = {
  "0": "Makhe ndicinge...",
  "1": "Umzuzu omnye...",
  "2": "Iyaqhuba...",
  "3": "Umzuzwana nje...",
  "4": "ndikujongela lonto..."
};
const xh = {
  chat: chat$7,
  avatar: avatar$7,
  greetings: greetings$7,
  waiting: waiting$7
};
const __vite_glob_0_184 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$7,
  chat: chat$7,
  default: xh,
  greetings: greetings$7,
  waiting: waiting$7
}, Symbol.toStringTag, { value: "Module" }));
const chat$6 = {
  input: {
    placeholder: "שרייב דיין אָנזאָג ...",
    listening: "הערן..."
  },
  enableSound: "געבן סאָונד",
  stt: {
    transcribing: "טראַנסקריבינג: ",
    micActive: "מיקראָפאָן אַקטיוו ...",
    heardError: "אנטשולדיגט, איך קען דיך נישט הערן. ביטע פּרוּווט ווידער.",
    micAccessError: "ניט געקענט צו צוטריט מיקראָפאָן. קוק פּערמישאַנז."
  },
  speed: {
    idle: "ליידיק:",
    talk: "רעדן:"
  }
};
const avatar$6 = {
  loading: "לאָדן אַוואַטאַר...",
  title: {
    maximize: "מאַקסאַמייז",
    minimize: "מינאַמייז",
    close: "נאָענט",
    clickToMaximize: "דריקט צו מאַקסאַמייז",
    clickToMinimize: "דריקט צו מינאַמייז"
  },
  error: {
    loadFailed: "ניט אַנדערש צו לאָדן אַוואַטאַר: {{error}} ",
    playerNotLoaded: "AniaPlayer איז נישט לאָודיד",
    passwordRequired: "שפּריכוואָרט פארלאנגט פֿאַר ינקריפּטיד .אַניאַ טעקע",
    noSource: "קיין אַוואַטאַר מקור צוגעשטעלט (avatarUrl אָדער avatarData)"
  }
};
const greetings$6 = {
  "0": "העלא! וויאזוי קען איך דיר היינט העלפן?",
  "1": "העלא! ברוכים הבאים! וואָס קען איך טאָן פֿאַר איר?",
  "2": "היי דאָרט! אַזוי צופרידן צו רעדן צו איר!",
  "3": "העלא! איך בין דאָ צו העלפן. וואָס טאָן איר דאַרפֿן?",
  "4": "העלא! ווי ביסטו? ווי קען איך זיין נוציק?"
};
const waiting$6 = {
  "0": "לאז מיך טראכטן...",
  "1": "איין רגע ...",
  "2": "פּראַסעסינג...",
  "3": "נאָר אַ רגע ...",
  "4": "איך טשעק דאָס פֿאַר איר ..."
};
const yi = {
  chat: chat$6,
  avatar: avatar$6,
  greetings: greetings$6,
  waiting: waiting$6
};
const __vite_glob_0_185 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$6,
  chat: chat$6,
  default: yi,
  greetings: greetings$6,
  waiting: waiting$6
}, Symbol.toStringTag, { value: "Module" }));
const chat$5 = {
  input: {
    placeholder: "Tẹ ifiranṣẹ rẹ sii ...",
    listening: "Nfeti..."
  },
  enableSound: "Mu Ohun ṣiṣẹ",
  stt: {
    transcribing: "Ṣatunkọ: ",
    micActive: "Gbohungbohun ti nṣiṣe lọwọ...",
    heardError: "Ma binu, ko le gbọ rẹ. Jọwọ gbiyanju lẹẹkansi.",
    micAccessError: "Ko le wọle si gbohungbohun. Ṣayẹwo awọn igbanilaaye."
  },
  speed: {
    idle: "Laiṣiṣẹ:",
    talk: "Ọrọ sisọ:"
  }
};
const avatar$5 = {
  loading: "Nkojọpọ avatar...",
  title: {
    maximize: "O pọju",
    minimize: "Gbe sẹgbẹ",
    close: "Sunmọ",
    clickToMaximize: "Tẹ lati mu iwọn",
    clickToMinimize: "Tẹ lati dinku"
  },
  error: {
    loadFailed: "Kuna lati kojọpọ avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ko kojọpọ",
    passwordRequired: "Ọrọigbaniwọle beere fun fifi ẹnọ kọ nkan faili .ania",
    noSource: "Ko si orisun avatar ti a pese (avatarUrl tabi avatarData)"
  }
};
const greetings$5 = {
  "0": "Hi! Bawo ni MO ṣe le ran ọ lọwọ loni?",
  "1": "Pẹlẹ o! Kaabo! Kini mo le ṣe fun ọ?",
  "2": "Bawo ni nibe yen o! Inu mi dun lati ba ọ sọrọ!",
  "3": "Pẹlẹ o! Mo wa nibi lati ṣe iranlọwọ. Kini o nilo?",
  "4": "Hi! Bawo ni o se wa? Bawo ni MO ṣe le wulo?"
};
const waiting$5 = {
  "0": "Jẹ ki n ronu...",
  "1": "Ni iṣẹju kan...",
  "2": "Nṣiṣẹ...",
  "3": "O kan iṣẹju kan...",
  "4": "Mo n ṣayẹwo iyẹn fun ọ..."
};
const yo = {
  chat: chat$5,
  avatar: avatar$5,
  greetings: greetings$5,
  waiting: waiting$5
};
const __vite_glob_0_186 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$5,
  chat: chat$5,
  default: yo,
  greetings: greetings$5,
  waiting: waiting$5
}, Symbol.toStringTag, { value: "Module" }));
const chat$4 = {
  input: {
    placeholder: "Ts'íibt a t'aan...",
    listening: "Táan in wu'uyik..."
  },
  enableSound: "Habilitar u juum",
  stt: {
    transcribing: "Transcripción: ",
    micActive: "Micrófono activo...",
    heardError: "Perdón, ma' tin wu'uyajech. Béet ka'a ilawil.",
    micAccessError: "Ma' tu páajtal u yokol micrófono. Ilawil le permiso'obo'."
  },
  speed: {
    idle: "Ma' meyaj:",
    talk: "T'aan:"
  }
};
const avatar$4 = {
  loading: "Táan u kuuch avatar...",
  title: {
    maximize: "Maximizar",
    minimize: "Minimizar",
    close: "Muts'ik",
    clickToMaximize: "u beetik clic uti'al u maximizar",
    clickToMinimize: "u beetik clic uti'al u xu'ulul"
  },
  error: {
    loadFailed: "Ma' béeyak u kuuch avatar: {{error}} ",
    playerNotLoaded: "AniaPlayer ma' u kuuch",
    passwordRequired: "K'a'abéet u contraseña uti'al u archivo .ania encriptado",
    noSource: "Mix jump'éel fuente avatar proporcionada (avatarUrl wa avatarData)"
  }
};
const greetings$4 = {
  "0": "¡Hola! ¿Bix je'el in wáantkech bejla'e'?",
  "1": "Bix túun! Ki'imak óolal! ba'ax je'el u páajtal in beetik ta wo'olal?",
  "2": "Ey! jach ki'imak in wóol in t'aan ta wéetel!",
  "3": "Bix túun! Teen waye' uti'al in wáantik. Ba'ax k'a'abéet ti' teech?",
  "4": "Bix a beel! Bix a beel? ¿Bix je'el u páajtal in meyaj?"
};
const waiting$4 = {
  "0": "Cha' in tuukul...",
  "1": "Junsúutuk...",
  "2": "Procesamiento...",
  "3": "chéen jump'éel segundo...",
  "4": "Táan in wilik uti'al tech..."
};
const yua = {
  chat: chat$4,
  avatar: avatar$4,
  greetings: greetings$4,
  waiting: waiting$4
};
const __vite_glob_0_187 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$4,
  chat: chat$4,
  default: yua,
  greetings: greetings$4,
  waiting: waiting$4
}, Symbol.toStringTag, { value: "Module" }));
const chat$3 = {
  input: {
    placeholder: "打你嘅訊息 ...",
    listening: "聽緊 ..."
  },
  enableSound: "啟用聲音",
  stt: {
    transcribing: "轉錄緊： ",
    micActive: "麥克風有效 ...",
    heardError: "對唔住，聽唔到你講嘢。請試多一次。",
    micAccessError: "存取唔到麥克風。檢查權限。"
  },
  speed: {
    idle: "閒置：",
    talk: "講嘢："
  }
};
const avatar$3 = {
  loading: "載入緊頭像 ...",
  title: {
    maximize: "最大化",
    minimize: "將佢減到最低",
    close: "閂咗",
    clickToMaximize: "撳一下就可以最大化",
    clickToMinimize: "撳一下就可以最小化"
  },
  error: {
    loadFailed: "載入唔到頭像： {{error}} ",
    playerNotLoaded: "未載入 AniaPlayer",
    passwordRequired: "加密嘅 .ania 檔案需要密碼",
    noSource: "冇提供頭像來源（頭像網址或者頭像數據）"
  }
};
const greetings$3 = {
  "0": "你好！我今日點樣幫到你？",
  "1": "你好！歡迎！我可以為你做啲咩？",
  "2": "喂！好開心同你傾偈！",
  "3": "你好！我喺度幫手。你需要啲咩？",
  "4": "你好！你點啊？我點樣可以有用？"
};
const waiting$3 = {
  "0": "等我諗下 ...",
  "1": "有一刻 … …",
  "2": "處理緊 ...",
  "3": "只係一秒 ...",
  "4": "我幫你檢查緊 ..."
};
const yue = {
  chat: chat$3,
  avatar: avatar$3,
  greetings: greetings$3,
  waiting: waiting$3
};
const __vite_glob_0_188 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$3,
  chat: chat$3,
  default: yue,
  greetings: greetings$3,
  waiting: waiting$3
}, Symbol.toStringTag, { value: "Module" }));
const chat$2 = {
  input: {
    placeholder: "输入您的消息...",
    listening: "听..."
  },
  enableSound: "启用声音",
  stt: {
    transcribing: "抄写： ",
    micActive: "麦克风处于活动状态...",
    heardError: "抱歉，听不到你的声音。请再试一次。",
    micAccessError: "无法访问麦克风。检查权限。"
  },
  speed: {
    idle: "空闲：",
    talk: "谈话："
  }
};
const avatar$2 = {
  loading: "正在加载头像...",
  title: {
    maximize: "最大化",
    minimize: "最小化",
    close: "关闭",
    clickToMaximize: "单击以最大化",
    clickToMinimize: "单击以最小化"
  },
  error: {
    loadFailed: "头像加载失败：{{error}} ",
    playerNotLoaded: "AniaPlayer 未加载",
    passwordRequired: "加密的 .ania 文件需要密码",
    noSource: "未提供头像来源（avatarUrl 或 avatarData）"
  }
};
const greetings$2 = {
  "0": "嗨！今天我能为您提供什么帮助？",
  "1": "你好！欢迎！我能为你做什么？",
  "2": "你好呀！很高兴与你交谈！",
  "3": "你好！我是来帮忙的。你需要什么？",
  "4": "你好！你好吗？我怎样才能变得有用？"
};
const waiting$2 = {
  "0": "让我想想...",
  "1": "一会儿...",
  "2": "处理中...",
  "3": "只需一秒钟...",
  "4": "我正在为你检查..."
};
const zhCN = {
  chat: chat$2,
  avatar: avatar$2,
  greetings: greetings$2,
  waiting: waiting$2
};
const __vite_glob_0_189 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$2,
  chat: chat$2,
  default: zhCN,
  greetings: greetings$2,
  waiting: waiting$2
}, Symbol.toStringTag, { value: "Module" }));
const chat$1 = {
  input: {
    placeholder: "輸入您的訊息...",
    listening: "聽..."
  },
  enableSound: "啟用聲音",
  stt: {
    transcribing: "抄寫：",
    micActive: "麥克風處於活動狀態...",
    heardError: "抱歉，聽不到你的聲音。請再試一次。",
    micAccessError: "無法存取麥克風。檢查權限。"
  },
  speed: {
    idle: "空閒：",
    talk: "談話："
  }
};
const avatar$1 = {
  loading: "正在加載頭像...",
  title: {
    maximize: "最大化",
    minimize: "最小化",
    close: "關閉",
    clickToMaximize: "點擊以最大化",
    clickToMinimize: "點擊以最小化"
  },
  error: {
    loadFailed: "頭像載入失敗：{{error}}",
    playerNotLoaded: "AniaPlayer 未載入",
    passwordRequired: "加密的 .ania 檔案需要密碼",
    noSource: "未提供頭像來源（avatarUrl 或 avatarData）"
  }
};
const greetings$1 = {
  "0": "嗨！今天我能為您提供什麼幫助？",
  "1": "你好！歡迎！我能為你做什麼？",
  "2": "你好呀！很高興與你交談！",
  "3": "你好！我是來幫忙的。你需要什麼？",
  "4": "你好！你好嗎？我怎樣才能變得有用？"
};
const waiting$1 = {
  "0": "讓我想想...",
  "1": "一會兒...",
  "2": "處理中...",
  "3": "只需一秒鐘...",
  "4": "我正在為你檢查..."
};
const zhTW = {
  chat: chat$1,
  avatar: avatar$1,
  greetings: greetings$1,
  waiting: waiting$1
};
const __vite_glob_0_190 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar: avatar$1,
  chat: chat$1,
  default: zhTW,
  greetings: greetings$1,
  waiting: waiting$1
}, Symbol.toStringTag, { value: "Module" }));
const chat = {
  input: {
    placeholder: "Thayipha umlayezo wakho...",
    listening: "Ilalele..."
  },
  enableSound: "Nika amandla Umsindo",
  stt: {
    transcribing: "Ukuloba: ",
    micActive: "Imakrofoni iyasebenza...",
    heardError: "Uxolo, angikwazanga ukukuzwa. Sicela uzame futhi.",
    micAccessError: "Ayikwazi ukufinyelela imakrofoni. Hlola izimvume."
  },
  speed: {
    idle: "Ukungenzi lutho:",
    talk: "Inkulumo:"
  }
};
const avatar = {
  loading: "Ilayisha isithombe...",
  title: {
    maximize: "Khulisa",
    minimize: "Nciphisa",
    close: "Vala",
    clickToMaximize: "Chofoza ukuze ukhulise",
    clickToMinimize: "Chofoza ukuze unciphise"
  },
  error: {
    loadFailed: "Yehlulekile ukulayisha isithombe: {{error}} ",
    playerNotLoaded: "I-AniaPlayer ayilayishiwe",
    passwordRequired: "Kudingeka iphasiwedi kufayela elibethelwe le-.ania",
    noSource: "Awukho umthombo wesithombe onikeziwe (i-avatarUrl noma i-avatarData)"
  }
};
const greetings = {
  "0": "Sawubona! Ngingakusiza ngani namuhla?",
  "1": "Sawubona! Siyakwamukela! Ngingakwenzelani?",
  "2": "Sawubona lapho! Ngijabule kakhulu ukukhuluma nawe!",
  "3": "Sawubona! Ngilapha ukuze ngisize. Udinga ini?",
  "4": "Sawubona! Unjani? Ngingaba kanjani usizo?"
};
const waiting = {
  "0": "Ake ngicabange...",
  "1": "Umzuzu owodwa...",
  "2": "Iyacubungula...",
  "3": "Umzuzwana nje...",
  "4": "Ngikuhlolela lokho..."
};
const zu = {
  chat,
  avatar,
  greetings,
  waiting
};
const __vite_glob_0_191 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  avatar,
  chat,
  default: zu,
  greetings,
  waiting
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_LOCALE = "pt-BR";
const FALLBACK_LOCALE = "en";
function isIndexObject(v) {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const keys = Object.keys(v);
  return keys.length > 0 && keys.every((k) => /^\d+$/.test(k));
}
function flatten(obj, prefix, out) {
  for (const k in obj) {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v) && !isIndexObject(v)) {
      flatten(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}
const STRINGS = (() => {
  const modules = /* @__PURE__ */ Object.assign({ "./strings/ab.json": __vite_glob_0_0, "./strings/ace.json": __vite_glob_0_1, "./strings/ach.json": __vite_glob_0_2, "./strings/af.json": __vite_glob_0_3, "./strings/ak.json": __vite_glob_0_4, "./strings/alz.json": __vite_glob_0_5, "./strings/am.json": __vite_glob_0_6, "./strings/ar.json": __vite_glob_0_7, "./strings/as.json": __vite_glob_0_8, "./strings/awa.json": __vite_glob_0_9, "./strings/ay.json": __vite_glob_0_10, "./strings/az.json": __vite_glob_0_11, "./strings/ba.json": __vite_glob_0_12, "./strings/ban.json": __vite_glob_0_13, "./strings/bbc.json": __vite_glob_0_14, "./strings/be.json": __vite_glob_0_15, "./strings/bem.json": __vite_glob_0_16, "./strings/bew.json": __vite_glob_0_17, "./strings/bg.json": __vite_glob_0_18, "./strings/bho.json": __vite_glob_0_19, "./strings/bik.json": __vite_glob_0_20, "./strings/bm.json": __vite_glob_0_21, "./strings/bn.json": __vite_glob_0_22, "./strings/br.json": __vite_glob_0_23, "./strings/bs.json": __vite_glob_0_24, "./strings/bts.json": __vite_glob_0_25, "./strings/btx.json": __vite_glob_0_26, "./strings/bua.json": __vite_glob_0_27, "./strings/ca.json": __vite_glob_0_28, "./strings/ceb.json": __vite_glob_0_29, "./strings/cgg.json": __vite_glob_0_30, "./strings/chm.json": __vite_glob_0_31, "./strings/ckb.json": __vite_glob_0_32, "./strings/cnh.json": __vite_glob_0_33, "./strings/co.json": __vite_glob_0_34, "./strings/crh.json": __vite_glob_0_35, "./strings/crs.json": __vite_glob_0_36, "./strings/cs.json": __vite_glob_0_37, "./strings/cv.json": __vite_glob_0_38, "./strings/cy.json": __vite_glob_0_39, "./strings/da.json": __vite_glob_0_40, "./strings/de.json": __vite_glob_0_41, "./strings/din.json": __vite_glob_0_42, "./strings/doi.json": __vite_glob_0_43, "./strings/dov.json": __vite_glob_0_44, "./strings/dv.json": __vite_glob_0_45, "./strings/dz.json": __vite_glob_0_46, "./strings/ee.json": __vite_glob_0_47, "./strings/el.json": __vite_glob_0_48, "./strings/en.json": __vite_glob_0_49, "./strings/eo.json": __vite_glob_0_50, "./strings/es.json": __vite_glob_0_51, "./strings/et.json": __vite_glob_0_52, "./strings/eu.json": __vite_glob_0_53, "./strings/fa.json": __vite_glob_0_54, "./strings/ff.json": __vite_glob_0_55, "./strings/fi.json": __vite_glob_0_56, "./strings/fil.json": __vite_glob_0_57, "./strings/fj.json": __vite_glob_0_58, "./strings/fr-CA.json": __vite_glob_0_59, "./strings/fr-FR.json": __vite_glob_0_60, "./strings/fy.json": __vite_glob_0_61, "./strings/ga.json": __vite_glob_0_62, "./strings/gaa.json": __vite_glob_0_63, "./strings/gd.json": __vite_glob_0_64, "./strings/gl.json": __vite_glob_0_65, "./strings/gn.json": __vite_glob_0_66, "./strings/gom.json": __vite_glob_0_67, "./strings/gu.json": __vite_glob_0_68, "./strings/ha.json": __vite_glob_0_69, "./strings/haw.json": __vite_glob_0_70, "./strings/he.json": __vite_glob_0_71, "./strings/hi.json": __vite_glob_0_72, "./strings/hil.json": __vite_glob_0_73, "./strings/hmn.json": __vite_glob_0_74, "./strings/hr.json": __vite_glob_0_75, "./strings/hrx.json": __vite_glob_0_76, "./strings/ht.json": __vite_glob_0_77, "./strings/hu.json": __vite_glob_0_78, "./strings/hy.json": __vite_glob_0_79, "./strings/id.json": __vite_glob_0_80, "./strings/ig.json": __vite_glob_0_81, "./strings/ilo.json": __vite_glob_0_82, "./strings/is.json": __vite_glob_0_83, "./strings/it.json": __vite_glob_0_84, "./strings/ja.json": __vite_glob_0_85, "./strings/jv.json": __vite_glob_0_86, "./strings/ka.json": __vite_glob_0_87, "./strings/kk.json": __vite_glob_0_88, "./strings/km.json": __vite_glob_0_89, "./strings/kn.json": __vite_glob_0_90, "./strings/ko.json": __vite_glob_0_91, "./strings/kri.json": __vite_glob_0_92, "./strings/ktu.json": __vite_glob_0_93, "./strings/ku.json": __vite_glob_0_94, "./strings/ky.json": __vite_glob_0_95, "./strings/la.json": __vite_glob_0_96, "./strings/lb.json": __vite_glob_0_97, "./strings/lg.json": __vite_glob_0_98, "./strings/li.json": __vite_glob_0_99, "./strings/lij.json": __vite_glob_0_100, "./strings/lmo.json": __vite_glob_0_101, "./strings/ln.json": __vite_glob_0_102, "./strings/lo.json": __vite_glob_0_103, "./strings/lt.json": __vite_glob_0_104, "./strings/ltg.json": __vite_glob_0_105, "./strings/luo.json": __vite_glob_0_106, "./strings/lus.json": __vite_glob_0_107, "./strings/lv.json": __vite_glob_0_108, "./strings/mai.json": __vite_glob_0_109, "./strings/mak.json": __vite_glob_0_110, "./strings/mg.json": __vite_glob_0_111, "./strings/mi.json": __vite_glob_0_112, "./strings/min.json": __vite_glob_0_113, "./strings/mk.json": __vite_glob_0_114, "./strings/ml.json": __vite_glob_0_115, "./strings/mn.json": __vite_glob_0_116, "./strings/mni-Mtei.json": __vite_glob_0_117, "./strings/mr.json": __vite_glob_0_118, "./strings/ms-Arab.json": __vite_glob_0_119, "./strings/ms.json": __vite_glob_0_120, "./strings/mt.json": __vite_glob_0_121, "./strings/my.json": __vite_glob_0_122, "./strings/ne.json": __vite_glob_0_123, "./strings/new.json": __vite_glob_0_124, "./strings/nl.json": __vite_glob_0_125, "./strings/no.json": __vite_glob_0_126, "./strings/nr.json": __vite_glob_0_127, "./strings/nso.json": __vite_glob_0_128, "./strings/nus.json": __vite_glob_0_129, "./strings/ny.json": __vite_glob_0_130, "./strings/oc.json": __vite_glob_0_131, "./strings/om.json": __vite_glob_0_132, "./strings/or.json": __vite_glob_0_133, "./strings/pa-Arab.json": __vite_glob_0_134, "./strings/pa.json": __vite_glob_0_135, "./strings/pag.json": __vite_glob_0_136, "./strings/pam.json": __vite_glob_0_137, "./strings/pap.json": __vite_glob_0_138, "./strings/pl.json": __vite_glob_0_139, "./strings/ps.json": __vite_glob_0_140, "./strings/pt-BR.json": __vite_glob_0_141, "./strings/pt-PT.json": __vite_glob_0_142, "./strings/qu.json": __vite_glob_0_143, "./strings/rn.json": __vite_glob_0_144, "./strings/ro.json": __vite_glob_0_145, "./strings/rom.json": __vite_glob_0_146, "./strings/ru.json": __vite_glob_0_147, "./strings/rw.json": __vite_glob_0_148, "./strings/sa.json": __vite_glob_0_149, "./strings/scn.json": __vite_glob_0_150, "./strings/sd.json": __vite_glob_0_151, "./strings/sg.json": __vite_glob_0_152, "./strings/shn.json": __vite_glob_0_153, "./strings/si.json": __vite_glob_0_154, "./strings/sk.json": __vite_glob_0_155, "./strings/sl.json": __vite_glob_0_156, "./strings/sm.json": __vite_glob_0_157, "./strings/sn.json": __vite_glob_0_158, "./strings/so.json": __vite_glob_0_159, "./strings/sq.json": __vite_glob_0_160, "./strings/sr.json": __vite_glob_0_161, "./strings/ss.json": __vite_glob_0_162, "./strings/st.json": __vite_glob_0_163, "./strings/su.json": __vite_glob_0_164, "./strings/sv.json": __vite_glob_0_165, "./strings/sw.json": __vite_glob_0_166, "./strings/szl.json": __vite_glob_0_167, "./strings/ta.json": __vite_glob_0_168, "./strings/te.json": __vite_glob_0_169, "./strings/tet.json": __vite_glob_0_170, "./strings/tg.json": __vite_glob_0_171, "./strings/th.json": __vite_glob_0_172, "./strings/ti.json": __vite_glob_0_173, "./strings/tk.json": __vite_glob_0_174, "./strings/tn.json": __vite_glob_0_175, "./strings/tr.json": __vite_glob_0_176, "./strings/ts.json": __vite_glob_0_177, "./strings/tt.json": __vite_glob_0_178, "./strings/ug.json": __vite_glob_0_179, "./strings/uk.json": __vite_glob_0_180, "./strings/ur.json": __vite_glob_0_181, "./strings/uz.json": __vite_glob_0_182, "./strings/vi.json": __vite_glob_0_183, "./strings/xh.json": __vite_glob_0_184, "./strings/yi.json": __vite_glob_0_185, "./strings/yo.json": __vite_glob_0_186, "./strings/yua.json": __vite_glob_0_187, "./strings/yue.json": __vite_glob_0_188, "./strings/zh-CN.json": __vite_glob_0_189, "./strings/zh-TW.json": __vite_glob_0_190, "./strings/zu.json": __vite_glob_0_191 });
  const out = {};
  for (const path in modules) {
    const code = path.replace(/^.*\/([^/]+)\.json$/, "$1");
    const mod = modules[path];
    const raw = mod && mod.default || mod || {};
    out[code] = flatten(raw, "", {});
  }
  return out;
})();
function availableLocales() {
  return Object.keys(STRINGS).sort();
}
function hasLocale(locale) {
  return !!(locale && STRINGS[locale]);
}
function resolveTable(locale) {
  if (locale && STRINGS[locale]) return STRINGS[locale];
  if (locale) {
    const base = String(locale).split("-")[0];
    if (STRINGS[base]) return STRINGS[base];
    const regional = Object.keys(STRINGS).find((c) => c.split("-")[0] === base);
    if (regional) return STRINGS[regional];
  }
  return STRINGS[FALLBACK_LOCALE] || {};
}
function asList(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    return Object.keys(value).filter((k) => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b)).map((k) => value[k]);
  }
  return null;
}
function interpolate$1(value, vars) {
  if (!vars || typeof value !== "string") return value;
  return value.replace(
    /\{\{\s*(\w+)\s*\}\}/g,
    (m, name) => Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : m
  );
}
function getString(key, locale = DEFAULT_LOCALE, opts = {}) {
  const { vars, override } = opts;
  if (override && override[key] != null) return interpolate$1(override[key], vars);
  const table = resolveTable(locale);
  let value = table[key];
  if (value == null) {
    const fb = STRINGS[FALLBACK_LOCALE] || {};
    value = fb[key];
  }
  if (value == null) return key;
  return interpolate$1(value, vars);
}
function getStringList(key, locale = DEFAULT_LOCALE, opts = {}) {
  const { override } = opts;
  if (override && Array.isArray(override[key])) return override[key];
  const table = resolveTable(locale);
  let list = asList(table[key]);
  if (list == null) {
    const fb = STRINGS[FALLBACK_LOCALE] || {};
    list = asList(fb[key]);
  }
  return list || [];
}
function createTranslator(locale = DEFAULT_LOCALE, override) {
  return {
    locale,
    t: (key, vars) => getString(key, locale, { vars, override }),
    list: (key) => getStringList(key, locale, { override })
  };
}
function isPlainMarketAnia(data) {
  try {
    const bytes = new Uint8Array(data);
    let offset = 0;
    const magic = String.fromCharCode(...bytes.slice(offset, offset + 4));
    offset += 4;
    if (magic !== "ANIA") return false;
    const version = String.fromCharCode(...bytes.slice(offset, offset + 3));
    offset += 3;
    if (version !== "3.0") return false;
    const nextByte = bytes[offset];
    if (nextByte >= 97 && nextByte <= 122) {
      offset += 1;
    }
    const header = bytes.slice(offset, offset + 64);
    if (header.length < 64) return false;
    return header.every((b) => b === 0);
  } catch {
    return false;
  }
}
async function decryptAniaFile(encryptedData, password) {
  try {
    let bytes = new Uint8Array(encryptedData);
    let offset = 0;
    const magic = String.fromCharCode(...bytes.slice(offset, offset + 4));
    offset += 4;
    if (magic !== "ANIA") throw new Error("Invalid file - magic: " + magic);
    const version = String.fromCharCode(...bytes.slice(offset, offset + 3));
    offset += 3;
    if (!["1.0", "2.0", "3.0"].includes(version)) throw new Error("Unsupported version: " + version);
    const nextByte = bytes[offset];
    if (nextByte >= 97 && nextByte <= 122) {
      offset += 1;
    }
    if (version === "3.0") {
      const hmac = bytes.slice(offset, offset + 32);
      offset += 32;
      const salt2 = bytes.slice(offset, offset + 16);
      offset += 16;
      const iv2 = bytes.slice(offset, offset + 16);
      offset += 16;
      let ciphertext2 = bytes.slice(offset);
      const isAllZeros = (arr) => arr.every((b) => b === 0);
      const isMarketAvatar = isAllZeros(hmac) && isAllZeros(salt2) && isAllZeros(iv2);
      if (isMarketAvatar) {
        const LICENSE_START = "<<<ANIA_LICENSE>>>";
        let dataStr = new TextDecoder("utf-8").decode(ciphertext2);
        const startIdx = dataStr.lastIndexOf(LICENSE_START);
        if (startIdx > 0) {
          dataStr = dataStr.substring(0, startIdx);
        }
        let jsonString3 = dataStr;
        const jsonData3 = JSON.parse(jsonString3);
        return jsonData3;
      }
      const passwordKey2 = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
      );
      const key2 = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt2,
          iterations: 1e5,
          hash: "SHA-256"
        },
        passwordKey2,
        { name: "AES-CBC", length: 256 },
        false,
        ["decrypt"]
      );
      let decryptedBuffer2 = await crypto.subtle.decrypt({ name: "AES-CBC", iv: iv2 }, key2, ciphertext2);
      const decryptedBytes = new Uint8Array(decryptedBuffer2);
      const metadataLen = decryptedBytes[0] << 24 | decryptedBytes[1] << 16 | decryptedBytes[2] << 8 | decryptedBytes[3];
      const dataStart = 4 + metadataLen;
      const jsonBytes = decryptedBytes.slice(dataStart);
      const jsonString2 = new TextDecoder("utf-8").decode(jsonBytes);
      const jsonData2 = JSON.parse(jsonString2);
      return jsonData2;
    }
    const salt = bytes.slice(offset, offset + 16);
    offset += 16;
    const iv = bytes.slice(offset, offset + 16);
    offset += 16;
    const ciphertext = bytes.slice(offset);
    bytes = null;
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 1e5,
        hash: "SHA-256"
      },
      passwordKey,
      { name: "AES-CBC", length: 256 },
      false,
      ["decrypt"]
    );
    let decryptedBuffer;
    try {
      decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv
        },
        key,
        ciphertext
      );
    } catch (decryptError) {
      throw new Error(`Decryption failed (${decryptError.name}): Check password`);
    }
    const jsonString = new TextDecoder("utf-8").decode(decryptedBuffer);
    if (!jsonString || jsonString.length < 10) {
      throw new Error("Decryption resulted in empty data - wrong password?");
    }
    const jsonData = JSON.parse(jsonString);
    return jsonData;
  } catch (err) {
    throw err;
  }
}
const calculateOptimalSpeeds = (fps) => {
  if (!fps || fps <= 0) {
    return { idle: 1, talk: 1 };
  }
  const idleSpeed = Math.max(0.5, Math.min(10, fps / 10));
  const talkSpeed = Math.max(1, Math.min(10, fps / 5));
  return {
    idle: parseFloat(idleSpeed.toFixed(1)),
    talk: parseFloat(talkSpeed.toFixed(1))
  };
};
const DB_NAME = "ania-avatar-cache";
const DB_VERSION = 1;
const STORE_NAME = "avatars";
const CACHE_EXPIRY_DAYS = 7;
let db = null;
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => {
      resolve(null);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "url" });
      }
    };
  });
};
const hashUrl = (url) => {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};
const getCachedAvatar = async (url) => {
  try {
    const database = await initDB();
    if (!database) return null;
    return new Promise((resolve) => {
      const transaction = database.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(url);
      request.onerror = () => {
        resolve(null);
      };
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          resolve(null);
          return;
        }
        const now = Date.now();
        const cacheAge = now - result.timestamp;
        const maxAge = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1e3;
        if (cacheAge > maxAge) {
          deleteCachedAvatar(url);
          resolve(null);
          return;
        }
        resolve(result.data);
      };
    });
  } catch (err) {
    return null;
  }
};
const setCachedAvatar = async (url, data, isEncrypted = false) => {
  try {
    const database = await initDB();
    if (!database) return;
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const cacheEntry = {
      url,
      data,
      isEncrypted,
      timestamp: Date.now(),
      hash: hashUrl(url)
    };
    store.put(cacheEntry);
  } catch (err) {
  }
};
const deleteCachedAvatar = async (url) => {
  try {
    const database = await initDB();
    if (!database) return;
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete(url);
  } catch (err) {
  }
};
const clearAvatarCache = async () => {
  try {
    const database = await initDB();
    if (!database) return;
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
  }
};
const getCacheStats = async () => {
  try {
    const database = await initDB();
    if (!database) return { count: 0, size: 0 };
    return new Promise((resolve) => {
      const transaction = database.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const entries = request.result || [];
        let totalSize = 0;
        entries.forEach((entry) => {
          if (entry.data instanceof ArrayBuffer) {
            totalSize += entry.data.byteLength;
          } else if (typeof entry.data === "object") {
            totalSize += JSON.stringify(entry.data).length;
          }
        });
        resolve({
          count: entries.length,
          size: totalSize,
          sizeFormatted: formatBytes(totalSize)
        });
      };
      request.onerror = () => {
        resolve({ count: 0, size: 0 });
      };
    });
  } catch (err) {
    return { count: 0, size: 0 };
  }
};
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
const fetchLipSyncConfig = async (serverUrl, contentHash) => {
  try {
    const url = `${serverUrl}/api/avatars/json-config/fetch?contentHash=${encodeURIComponent(contentHash)}&type=lips_sync`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.found || !data.jsonData) return null;
    return data.jsonData;
  } catch (err) {
    console.warn("[LipSyncAPI] Failed to fetch config:", err);
    return null;
  }
};
const buildOpennessMap = (keyframes, talkLow, talkHigh) => {
  const talkSpan = talkHigh - talkLow;
  if (talkSpan <= 0 || !keyframes || keyframes.length === 0) return [];
  const n = talkSpan + 1;
  const result = new Array(n).fill(0.5);
  const sortedKf = [...keyframes].sort((a, b) => a[0] - b[0]);
  let kfRel = sortedKf.map(([idx, val]) => [
    Math.max(0, Math.min(talkSpan, Math.floor(idx) - talkLow)),
    parseFloat(val)
  ]);
  if (kfRel[0][0] > 0) {
    kfRel = [[0, kfRel[0][1]], ...kfRel];
  }
  if (kfRel[kfRel.length - 1][0] < talkSpan) {
    kfRel = [...kfRel, [talkSpan, kfRel[kfRel.length - 1][1]]];
  }
  for (let i = 0; i < kfRel.length - 1; i++) {
    const [i0, v0] = kfRel[i];
    const [i1, v1] = kfRel[i + 1];
    const span = Math.max(1, i1 - i0);
    for (let j = i0; j <= i1; j++) {
      const t = (j - i0) / span;
      result[j] = v0 + (v1 - v0) * t;
    }
  }
  return result;
};
const AniaAvatar = forwardRef(({
  avatarUrl,
  avatarPassword,
  avatarData: externalAvatarData,
  authToken,
  position = "bottom-left",
  width = 300,
  height = 300,
  transparent = false,
  theme = "dark",
  // i18n: locale for built-in UI strings (loading text, control titles, errors).
  // Defaults to 'pt-BR' to preserve original wording; falls back to en for any
  // unknown code. `messagesOverride` lets a consumer override individual keys.
  locale = "pt-BR",
  messagesOverride = null,
  minimizable = true,
  closable = true,
  detectAudio = false,
  // undefined = host did not set it → the file's authored speed (or the fps
  // heuristic) wins. A number = explicit host override that beats both.
  idleSpeed = void 0,
  talkSpeed = void 0,
  autoCalculateSpeed = true,
  startMinimized = false,
  preserveQuality = true,
  /**
   * How the avatar bitmap fits the stage when maximized: 'contain' (default,
   * whole avatar visible, letterboxed), 'cover' (fills the box, edges cropped),
   * or 'fill' (stretched). Minimized always uses 'cover' (round badge).
   */
  fit = "contain",
  /**
   * How the avatar fits its box when MINIMIZED. `false` (default) = show the
   * whole avatar, just smaller (object-fit: contain — no crop). `true` = the
   * classic minimized badge that fills the round area and crops the edges
   * (object-fit: cover). Only affects the minimized state; `fit` governs
   * maximized.
   */
  cropMinimized = false,
  /** Força o avatar sempre acima de todos os outros elementos (default: true) */
  alwaysOnTop = true,
  /**
   * Renderiza embutido no fluxo do componente pai (position: relative, sem
   * portal para o body) em vez do widget flutuante fixo. Útil para páginas de
   * teste/galeria que mostram o avatar dentro de um painel próprio.
   */
  inline = false,
  // Mobile-friendly props
  mobileMinimizedSize = 60,
  draggable = true,
  mobileBreakpoint = 768,
  // Lip sync props
  lipSyncEnabled = false,
  lipSyncServerUrl = null,
  lipSyncIntensity = 0.6,
  lipSyncResponsiveness = 0.5,
  // A3 sustain (desktop parity): how the mouth behaves during stable speech.
  // 'hold' freezes the anchor frame; 'wiggle' oscillates around it. When null,
  // the value from server config (if any) is used, else 'wiggle'.
  lipSyncSustainStyle = null,
  // Wiggle amplitude (1..6). null => server config value, else 5.
  lipSyncWiggleSpeed = null,
  // Action frame props
  actions = null,
  enableActionHotkeys = true,
  onActionStart,
  onActionEnd,
  // Initial action props
  initialAction = null,
  initialActionLoop = false,
  // Lip sync audio hookup
  lipSyncAudioRef = null,
  lipSyncHook = null,
  onLoad,
  onTalkStart,
  onTalkEnd,
  onClose,
  onToggleMinimize,
  children
}, ref) => {
  const tr2 = useMemo(
    () => createTranslator(locale, messagesOverride || void 0),
    [locale, messagesOverride]
  );
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  useImperativeHandle(ref, () => ({ playerRef }), []);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isLoadingRef = useRef(false);
  const canvasObserverRef = useRef(null);
  const styleTagRef = useRef(null);
  const enforcingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(startMinimized);
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState(null);
  const [isTalking, setIsTalking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragPosition, setDragPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });
  const outerContainerRef = useRef(null);
  const hasDraggedRef = useRef(false);
  useEffect(() => {
    setIsMinimized(startMinimized);
  }, [startMinimized]);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);
  useEffect(() => {
    const id2 = "ania-pulse-keyframes";
    if (!document.getElementById(id2)) {
      const style = document.createElement("style");
      style.id = id2;
      style.textContent = "@keyframes ania-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }";
      document.head.appendChild(style);
    }
  }, []);
  useEffect(() => {
    if (!isMinimized) {
      setDragPosition(null);
    }
  }, [isMinimized]);
  const handleDragStart = (e) => {
    var _a;
    if (!draggable || !isMinimized) return;
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;
    const touch = ((_a = e.touches) == null ? void 0 : _a[0]) || e;
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    if (outerContainerRef.current) {
      const rect = outerContainerRef.current.getBoundingClientRect();
      positionStartRef.current = { x: rect.left, y: rect.top };
    }
  };
  const handleDragMove = (e) => {
    var _a;
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const touch = ((_a = e.touches) == null ? void 0 : _a[0]) || e;
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true;
    }
    let newX = positionStartRef.current.x + deltaX;
    let newY = positionStartRef.current.y + deltaY;
    const size = isMobile ? mobileMinimizedSize : Math.floor(width / 2);
    newX = Math.max(0, Math.min(window.innerWidth - size, newX));
    newY = Math.max(0, Math.min(window.innerHeight - size, newY));
    setDragPosition({ x: newX, y: newY });
  };
  const handleDragEnd = (e) => {
    if (isDraggingRef.current) {
      e == null ? void 0 : e.preventDefault();
      e == null ? void 0 : e.stopPropagation();
      if (!hasDraggedRef.current && minimizable) {
        hasDraggedRef.current = true;
        toggleMinimize();
      }
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  };
  useEffect(() => {
    if (!draggable || !isMinimized) return;
    const moveHandler = (e) => handleDragMove(e);
    const endHandler = (e) => handleDragEnd(e);
    window.addEventListener("touchmove", moveHandler, { passive: false });
    window.addEventListener("touchend", endHandler);
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", endHandler);
    return () => {
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
    };
  }, [draggable, isMinimized, isMobile]);
  useEffect(() => {
    if (!detectAudio || !isLoaded || !playerRef.current) return;
    let isActive = true;
    const setupAudioDetection = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;
        const destination = audioContext.destination;
        const source = audioContext.createMediaStreamDestination();
        analyser.connect(destination);
        const detectAudioLoop = () => {
          var _a;
          if (!analyserRef.current || !isActive) return;
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          const threshold = 10;
          const wasTalking = isTalking;
          const nowTalking = average > threshold;
          if (nowTalking !== wasTalking) {
            setIsTalking(nowTalking);
            if ((_a = playerRef.current) == null ? void 0 : _a.animationController) {
              playerRef.current.animationController.setTalkingState(nowTalking);
            }
            if (nowTalking && onTalkStart) {
              onTalkStart();
            } else if (!nowTalking && onTalkEnd) {
              onTalkEnd();
            }
          }
          animationFrameRef.current = requestAnimationFrame(detectAudioLoop);
        };
        const handleVisibilityForAudio = () => {
          if (!document.hidden && isActive && analyserRef.current) {
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            detectAudioLoop();
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityForAudio);
        detectAudioLoop();
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityForAudio);
        };
      } catch (err) {
        console.error("[AniaAvatar] Error setting up audio detection:", err);
      }
    };
    const cleanup = setupAudioDetection();
    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (cleanup && typeof cleanup.then === "function") {
        cleanup.then((cleanupFn) => cleanupFn && cleanupFn());
      }
    };
  }, [detectAudio, isLoaded, onTalkStart, onTalkEnd]);
  useEffect(() => {
    if (playerRef.current && playerRef.current.setTalkingState) {
      playerRef.current.setTalkingState(isTalking);
    }
  }, [isTalking]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && playerRef.current) {
        if (playerRef.current.play && typeof playerRef.current.play === "function") {
          try {
            playerRef.current.play();
          } catch (err) {
            console.error("[AniaAvatar] Error reactivating:", err);
          }
        }
        if (detectAudio && playerRef.current.animationController) {
          playerRef.current.animationController.setTalkingState(isTalking);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const keepaliveInterval = setInterval(() => {
      if (!document.hidden && playerRef.current && isLoaded) {
        if (playerRef.current.play && typeof playerRef.current.play === "function") {
          try {
            const canvas = playerRef.current.canvas;
            if (canvas && canvas.getContext) {
              const ctx = canvas.getContext("2d");
              if (ctx && playerRef.current.animationController) {
                playerRef.current.play();
              }
            }
          } catch (err) {
            console.warn("[AniaAvatar] Keepalive failed:", err);
          }
        }
      }
    }, 3e4);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(keepaliveInterval);
    };
  }, [isTalking, isLoaded, detectAudio]);
  useEffect(() => {
    const loadAvatar = async () => {
      var _c;
      console.log("[AniaAvatar] loadAvatar called", { isLoading: isLoadingRef.current, hasAniaPlayer: !!window.AniaPlayer, hasContainer: !!containerRef.current, hasPlayer: !!playerRef.current });
      if (isLoadingRef.current) {
        console.log("[AniaAvatar] Already loading, skipping");
        return;
      }
      if (!window.AniaPlayer) {
        console.error("[AniaAvatar] AniaPlayer not loaded on window");
        setError(tr2.t("avatar.error.playerNotLoaded"));
        return;
      }
      if (!containerRef.current) {
        console.warn("[AniaAvatar] containerRef.current is null, skipping");
        return;
      }
      if (playerRef.current) {
        console.log("[AniaAvatar] Player already exists, skipping");
        return;
      }
      isLoadingRef.current = true;
      performance.now();
      try {
        let avatarData;
        if (avatarUrl) {
          const fetchStart = performance.now();
          const cachedData = await getCachedAvatar(avatarUrl);
          if (cachedData) {
            if (avatarUrl.endsWith(".ania")) {
              avatarData = cachedData;
            } else {
              avatarData = cachedData;
            }
          } else {
            const fetchOptions = {
              cache: "force-cache"
            };
            if (authToken) {
              fetchOptions.headers = {
                "Authorization": `Bearer ${authToken}`
              };
            }
            const response = await fetch(avatarUrl, fetchOptions);
            if (!response.ok) {
              throw new Error(`Failed to load avatar: ${response.status} ${response.statusText}`);
            }
            if (avatarUrl.endsWith(".ania")) {
              const encryptedData = await response.arrayBuffer();
              if ((avatarPassword === void 0 || avatarPassword === null) && !isPlainMarketAnia(encryptedData)) {
                throw new Error(tr2.t("avatar.error.passwordRequired"));
              }
              avatarData = await decryptAniaFile(encryptedData, avatarPassword ?? "");
              await setCachedAvatar(avatarUrl, avatarData, true);
            } else {
              avatarData = await response.json();
              await setCachedAvatar(avatarUrl, avatarData, false);
            }
          }
        } else if (externalAvatarData) {
          avatarData = externalAvatarData;
        } else {
          throw new Error(tr2.t("avatar.error.noSource"));
        }
        const detectedFps = (_c = avatarData.video) == null ? void 0 : _c.fps;
        let finalIdleSpeed = 1;
        let finalTalkSpeed = 1;
        if (autoCalculateSpeed && detectedFps) {
          const optimalSpeeds = calculateOptimalSpeeds(detectedFps);
          finalIdleSpeed = optimalSpeeds.idle;
          finalTalkSpeed = optimalSpeeds.talk;
        }
        const fileAnim = avatarData.animation || {};
        if (typeof fileAnim.idleSpeedSliderValue === "number" && fileAnim.idleSpeedSliderValue > 0) {
          finalIdleSpeed = fileAnim.idleSpeedSliderValue;
        }
        if (typeof fileAnim.talkSpeedSliderValue === "number" && fileAnim.talkSpeedSliderValue > 0) {
          finalTalkSpeed = fileAnim.talkSpeedSliderValue;
        }
        if (typeof idleSpeed === "number" && idleSpeed > 0) finalIdleSpeed = idleSpeed;
        if (typeof talkSpeed === "number" && talkSpeed > 0) finalTalkSpeed = talkSpeed;
        const PlayerClass = window.AniaPlayer.AniaPlayer || window.AniaPlayer.default || window.AniaPlayer;
        let canvasWidth = width;
        let canvasHeight = height;
        if (avatarData.video) {
          if (avatarData.video.width && avatarData.video.height) {
            canvasWidth = avatarData.video.width;
            canvasHeight = avatarData.video.height;
          } else if (avatarData.video.frames && avatarData.video.frames.length > 0) {
            const dims = await new Promise((resolve) => {
              const img = new Image();
              img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
              img.onerror = () => resolve(null);
              img.src = `data:image/webp;base64,${avatarData.video.frames[0]}`;
            });
            if (dims && dims.w > 0 && dims.h > 0) {
              canvasWidth = dims.w;
              canvasHeight = dims.h;
            }
          }
        }
        if (!containerRef.current) {
          isLoadingRef.current = false;
          return;
        }
        if (!containerRef.current) {
          console.error("[AniaAvatar] containerRef became null after fetch!");
          isLoadingRef.current = false;
          return;
        }
        console.log("[AniaAvatar] Creating player with container:", containerRef.current, "size:", canvasWidth, "x", canvasHeight);
        const player = new PlayerClass(containerRef.current, {
          transparent: true,
          chroma_enabled: false,
          audio_enabled: false,
          width: canvasWidth,
          height: canvasHeight,
          auto_start: false
        });
        player.fileData = avatarData;
        player.canvas.width = canvasWidth;
        player.canvas.height = canvasHeight;
        player.canvas.style.position = "absolute";
        player.canvas.style.top = "0";
        player.canvas.style.left = "0";
        player.canvas.style.width = "100%";
        player.canvas.style.height = "100%";
        player.canvas.style.objectFit = isMinimized ? cropMinimized ? "cover" : "contain" : fit;
        player.canvas.style.display = "block";
        const animationConfig = {
          ...avatarData.animation,
          idle_range_low: Math.floor(avatarData.animation.idleRangeLowValue || 0),
          idle_range_high: Math.floor(avatarData.animation.idleRangeHighValue || 321),
          talk_range_low: Math.floor(avatarData.animation.talkRangeLowValue || 327),
          talk_range_high: Math.floor(avatarData.animation.talkRangeHighValue || 834),
          current_frame_index: avatarData.animation.currentFrameIndex || 0,
          frame_count: avatarData.video.frames.length,
          is_talking: false,
          is_transitioning: false,
          reverse_idle_selected: avatarData.animation.reverseIdleSelected || false,
          reverse_talk_selected: avatarData.animation.reverseTalkSelected || false,
          idle_speed_slider_value: finalIdleSpeed,
          talk_speed_slider_value: finalTalkSpeed,
          transition_speed_slider_value: avatarData.animation.transitionSpeedSliderValue || 0,
          idle_start_positions: avatarData.animation.idleStartPositions || [],
          talk_start_positions: avatarData.animation.talkStartPositions || []
        };
        const configState = {
          ...avatarData.config,
          idle_frame_duration: avatarData.config.idleFrameDuration || 50,
          talk_cycle_duration: avatarData.config.talkCycleDuration || 50,
          transition_duration: avatarData.config.transitionDuration || 10
        };
        const AnimationController = window.AniaPlayer.AnimationController;
        player.animationController = new AnimationController(
          animationConfig,
          configState,
          avatarData.video.frames.length
        );
        player.animationController.displacementTarget = containerRef.current || player.canvas;
        if (avatarData.actions && avatarData.actions.length > 0 && player.animationController.configureActions) {
          player.animationController.configureActions(avatarData.actions);
        } else if (actions && actions.length > 0 && player.animationController.configureActions) {
          player.animationController.configureActions(actions);
        }
        const fileLipsync = avatarData.lipsync || null;
        const fileTuning = fileLipsync && fileLipsync.tuning || null;
        const fileOpennessMap = fileLipsync && Array.isArray(fileLipsync.opennessMap) && fileLipsync.opennessMap.length > 0 ? fileLipsync.opennessMap : null;
        const lipSyncActive = lipSyncEnabled || !!fileOpennessMap;
        if (lipSyncActive && player.animationController.configureLipsSync) {
          const applyLipSync = (lipConfig) => {
            const talkLow = Math.floor(avatarData.animation && avatarData.animation.talkRangeLowValue || 327);
            const talkHigh = Math.floor(avatarData.animation && avatarData.animation.talkRangeHighValue || 834);
            const openMap = lipConfig && lipConfig.lips_sync_keyframes ? buildOpennessMap(lipConfig.lips_sync_keyframes, talkLow, talkHigh) : fileOpennessMap;
            const sustainStyle = lipSyncSustainStyle || fileTuning && fileTuning.sustainStyle || lipConfig && lipConfig.lips_sync_sustain_style || "wiggle";
            const wiggleSpeed = lipSyncWiggleSpeed != null ? lipSyncWiggleSpeed : fileTuning && fileTuning.wiggleSpeed != null ? fileTuning.wiggleSpeed : lipConfig && lipConfig.lips_sync_wiggle_speed || 5;
            const intensity = fileTuning && fileTuning.intensity != null ? fileTuning.intensity : lipConfig && lipConfig.lips_sync_sync_intensity || lipSyncIntensity;
            const responsiveness = fileTuning && fileTuning.responsiveness != null ? fileTuning.responsiveness : lipConfig && lipConfig.lips_sync_responsiveness || lipSyncResponsiveness;
            player.animationController.configureLipsSync(
              true,
              intensity,
              responsiveness,
              openMap,
              sustainStyle,
              wiggleSpeed
            );
          };
          if (lipSyncServerUrl && avatarData.contentHash) {
            fetchLipSyncConfig(lipSyncServerUrl, avatarData.contentHash).then((lipConfig) => applyLipSync(lipConfig)).catch((err) => {
              console.warn("[AniaAvatar] Lip sync config fetch failed:", err);
              applyLipSync(null);
            });
          } else {
            applyLipSync(null);
          }
        }
        if (lipSyncHook && player.animationController) {
          const ctrl = player.animationController;
          ctrl.getAmplitudeFn = lipSyncHook.getAmplitude;
          ctrl.getSpectralOpennessFn = lipSyncHook.getSpectralOpenness;
          ctrl.getSpectralFluxFn = lipSyncHook.getSpectralFlux;
        }
        player.play();
        playerRef.current = player;
        setIsLoaded(true);
        isLoadingRef.current = false;
        console.log("[AniaAvatar] Avatar loaded successfully!");
        if (onLoad) {
          onLoad(player);
        }
        if (initialAction && player.animationController.triggerAction) {
          setTimeout(() => {
            player.animationController.triggerAction(initialAction);
            if (initialActionLoop) {
              player.animationController.onActionCompleteCallback = () => {
                var _a;
                if (initialActionLoop && ((_a = playerRef.current) == null ? void 0 : _a.animationController)) {
                  setTimeout(() => {
                    playerRef.current.animationController.triggerAction(initialAction);
                  }, 100);
                }
              };
            }
          }, 200);
        }
      } catch (err) {
        console.error("[AniaAvatar] Error loading avatar:", err);
        setError(tr2.t("avatar.error.loadFailed", { error: err && err.message ? err.message : String(err) }));
        isLoadingRef.current = false;
      }
    };
    console.log("[AniaAvatar] useEffect running, window.AniaPlayer:", !!window.AniaPlayer);
    if (window.AniaPlayer) {
      loadAvatar();
    } else {
      console.log("[AniaAvatar] Waiting for AniaPlayer script...");
      const checkInterval = setInterval(() => {
        if (window.AniaPlayer) {
          console.log("[AniaAvatar] AniaPlayer found after wait!");
          clearInterval(checkInterval);
          loadAvatar();
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
    return () => {
      if (playerRef.current) {
        try {
          if (playerRef.current.stop) {
            playerRef.current.stop();
          }
          if (playerRef.current.animationController) {
            if (playerRef.current.animationController.cleanup) {
              playerRef.current.animationController.cleanup();
            }
            playerRef.current.animationController = null;
          }
          if (playerRef.current.canvas) {
            const ctx = playerRef.current.canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, playerRef.current.canvas.width, playerRef.current.canvas.height);
            }
            if (playerRef.current.canvas.parentNode) {
              playerRef.current.canvas.parentNode.removeChild(playerRef.current.canvas);
            }
          }
          playerRef.current.fileData = null;
          playerRef.current = null;
        } catch (err) {
          console.error("[AniaAvatar] Error cleaning up:", err);
        }
      }
      isLoadingRef.current = false;
    };
  }, [avatarUrl, avatarPassword, externalAvatarData, authToken, preserveQuality]);
  useEffect(() => {
    if (!isLoaded) return;
    const ctrl = playerRef.current && playerRef.current.animationController;
    if (!ctrl) return;
    if (typeof idleSpeed === "number" && idleSpeed > 0 && ctrl.setIdleSpeed) {
      ctrl.setIdleSpeed(idleSpeed);
    }
    if (typeof talkSpeed === "number" && talkSpeed > 0 && ctrl.setTalkSpeed) {
      ctrl.setTalkSpeed(talkSpeed);
    }
  }, [idleSpeed, talkSpeed, isLoaded]);
  const getMobileSize = () => {
    if (isMobile && isMinimized) {
      return { width: mobileMinimizedSize, height: mobileMinimizedSize };
    }
    if (isMinimized) {
      return { width: Math.floor(width / 2), height: Math.floor(height / 2) };
    }
    return { width, height };
  };
  const currentDimensions = getMobileSize();
  const enforceCanvasStyles = useCallback(() => {
    var _a;
    if (enforcingRef.current) return;
    const canvas = (_a = playerRef.current) == null ? void 0 : _a.canvas;
    if (!canvas) return;
    enforcingRef.current = true;
    const s = canvas.style;
    if (isMinimized && cropMinimized) {
      const displayW = Math.floor(width / 2);
      const displayH = Math.floor(height / 2);
      s.setProperty("position", "absolute", "important");
      s.setProperty("top", "50%", "important");
      s.setProperty("left", "50%", "important");
      s.setProperty("transform", "translate(-50%, -50%)", "important");
      s.setProperty("width", displayW + "px", "important");
      s.setProperty("height", displayH + "px", "important");
      s.setProperty("object-fit", "cover", "important");
      s.setProperty("display", "block", "important");
      s.removeProperty("margin");
    } else if (isMinimized) {
      s.setProperty("position", "absolute", "important");
      s.setProperty("top", "0", "important");
      s.setProperty("left", "0", "important");
      s.setProperty("width", "100%", "important");
      s.setProperty("height", "100%", "important");
      s.setProperty("object-fit", "contain", "important");
      s.setProperty("display", "block", "important");
      s.removeProperty("transform");
      s.removeProperty("margin");
    } else {
      s.setProperty("position", "absolute", "important");
      s.setProperty("top", "0", "important");
      s.setProperty("left", "0", "important");
      s.setProperty("width", "100%", "important");
      s.setProperty("height", "100%", "important");
      s.setProperty("object-fit", fit, "important");
      s.setProperty("display", "block", "important");
      s.removeProperty("transform");
      s.removeProperty("margin");
    }
    enforcingRef.current = false;
  }, [isMinimized, width, height, fit, cropMinimized]);
  useEffect(() => {
    enforceCanvasStyles();
  }, [isMinimized, width, height, preserveQuality, isMobile, mobileMinimizedSize, isLoaded, enforceCanvasStyles]);
  useEffect(() => {
    var _a;
    if (!isLoaded || !((_a = playerRef.current) == null ? void 0 : _a.canvas)) return;
    const canvas = playerRef.current.canvas;
    if (!styleTagRef.current) {
      const style = document.createElement("style");
      style.setAttribute("data-ania-canvas-fix", "1");
      style.textContent = "[data-ania-canvas] canvas { display: block !important; }";
      document.head.appendChild(style);
      styleTagRef.current = style;
    }
    if (containerRef.current) {
      containerRef.current.setAttribute("data-ania-canvas", "1");
    }
    if (canvasObserverRef.current) {
      canvasObserverRef.current.disconnect();
    }
    canvasObserverRef.current = new MutationObserver(() => {
      enforceCanvasStyles();
    });
    canvasObserverRef.current.observe(canvas, { attributes: true, attributeFilter: ["style", "width", "height"] });
    return () => {
      if (canvasObserverRef.current) {
        canvasObserverRef.current.disconnect();
        canvasObserverRef.current = null;
      }
    };
  }, [isLoaded, enforceCanvasStyles]);
  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    if (onToggleMinimize) {
      onToggleMinimize(newMinimizedState);
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    if (canvasObserverRef.current) {
      canvasObserverRef.current.disconnect();
      canvasObserverRef.current = null;
    }
    if (styleTagRef.current && styleTagRef.current.parentNode) {
      styleTagRef.current.parentNode.removeChild(styleTagRef.current);
      styleTagRef.current = null;
    }
    if (playerRef.current) {
      if (playerRef.current.stop) {
        playerRef.current.stop();
      }
      playerRef.current = null;
    }
    if (onClose) {
      onClose();
    }
  };
  if (!isVisible) return null;
  const positionStyles = {
    "bottom-left": { bottom: "24px", left: "24px" },
    "bottom-right": { bottom: "24px", right: "24px" },
    "top-left": { top: "24px", left: "24px" },
    "top-right": { top: "24px", right: "24px" }
  };
  const currentWidth = currentDimensions.width;
  const currentHeight = currentDimensions.height;
  const currentTheme = THEMES[theme] || THEMES.dark;
  const isMobileMinimized = isMobile && isMinimized;
  const getContainerStyle = () => {
    const isMobileSheet = isMobile && !isMinimized && !!children;
    const baseStyle = {
      position: inline ? "relative" : "fixed",
      transition: "all 0.3s ease",
      // The widget must NOT inherit the host page's font (a serif host page
      // makes the chat look broken). Own stack, own base color.
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      ...!inline && !(dragPosition && isMinimized) ? positionStyles[position] : {},
      ...isMobileSheet ? { left: "8px", right: "8px", bottom: "8px", top: "auto" } : {},
      ...isMobileMinimized ? {
        borderRadius: "9999px",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)"
      } : {},
      width: isMobileSheet ? "auto" : isMinimized ? `${currentWidth}px` : `min(${currentWidth}px, calc(100vw - 24px))`,
      height: children ? "auto" : `${currentHeight}px`,
      maxWidth: isMinimized ? void 0 : "calc(100vw - 24px)",
      maxHeight: isMobileMinimized ? "none" : isMobileSheet ? "calc(100vh - 16px)" : "calc(100vh - 24px)",
      pointerEvents: "auto",
      zIndex: alwaysOnTop ? 2147483647 : 9999,
      display: "flex",
      flexDirection: "column"
    };
    if (dragPosition && isMinimized) {
      return {
        ...baseStyle,
        left: `${dragPosition.x}px`,
        top: `${dragPosition.y}px`,
        transition: isDragging ? "none" : "all 0.3s ease",
        cursor: draggable ? isDragging ? "grabbing" : "grab" : "pointer",
        touchAction: "none"
      };
    }
    if (isMinimized && draggable && !isMobile) {
      return {
        ...baseStyle,
        cursor: "grab"
      };
    }
    return baseStyle;
  };
  const handleContainerClick = (e) => {
    if (isDragging || hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
      return;
    }
    if (minimizable) {
      toggleMinimize();
    }
  };
  const avatarNode = jsx(
    "div",
    {
      ref: outerContainerRef,
      style: getContainerStyle(),
      onTouchStart: isMinimized && draggable ? handleDragStart : void 0,
      onMouseDown: isMinimized && draggable ? handleDragStart : void 0,
      children: jsxs(
        "div",
        {
          style: {
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            maxHeight: isMobileMinimized ? void 0 : "calc(100vh - 24px)",
            overflow: !transparent || !isMobileMinimized ? "hidden" : void 0,
            ...!transparent ? {
              background: currentTheme.background,
              borderRadius: isMobileMinimized ? "9999px" : "1rem",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              backdropFilter: isMobileMinimized ? "none" : "blur(12px)",
              WebkitBackdropFilter: isMobileMinimized ? "none" : "blur(12px)"
            } : {
              ...isMobileMinimized ? { borderRadius: "9999px" } : {}
            }
          },
          children: [
            !isMobileMinimized && (minimizable || closable && !isMinimized) && jsxs("div", { style: { position: "absolute", top: "8px", right: "8px", zIndex: 10, display: "flex", gap: "4px" }, children: [
              minimizable && isMinimized && jsx(
                "button",
                {
                  onClick: toggleMinimize,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: "6px",
                    borderRadius: "8px",
                    transition: "background-color 0.15s",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "none",
                    cursor: "pointer"
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.7)" : currentTheme.controlHover,
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: tr2.t("avatar.title.maximize"),
                  children: jsx(Maximize2, { size: 14, style: { color: "#fff" } })
                }
              ),
              minimizable && !isMinimized && jsx(
                "button",
                {
                  onClick: toggleMinimize,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: "6px",
                    borderRadius: "8px",
                    transition: "background-color 0.15s",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "none",
                    cursor: "pointer"
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.7)" : currentTheme.controlHover,
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: tr2.t("avatar.title.minimize"),
                  children: jsx(Minimize2, { size: 14, style: { color: "#fff" } })
                }
              ),
              closable && !isMinimized && jsx(
                "button",
                {
                  onClick: handleClose,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: "6px",
                    borderRadius: "8px",
                    transition: "background-color 0.15s",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "none",
                    cursor: "pointer"
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.7)",
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: tr2.t("avatar.title.close"),
                  children: jsx(X, { size: 14, style: { color: transparent ? "#fff" : currentTheme.textPrimary } })
                }
              )
            ] }),
            jsxs(
              "div",
              {
                ref: containerRef,
                style: {
                  width: isMobileMinimized ? `${currentWidth}px` : "100%",
                  // On a phone with the chat open, cap the avatar stage so the
                  // conversation (not the canvas) owns the screen.
                  height: isMobile && !isMinimized && children ? `min(${currentHeight}px, 34vh)` : `${currentHeight}px`,
                  maxWidth: "100%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: minimizable && !isDragging ? "pointer" : void 0,
                  background: transparent ? "transparent" : "rgba(0,0,0,0.1)",
                  borderRadius: isMobileMinimized ? "9999px" : void 0,
                  position: "relative",
                  overflow: "hidden"
                },
                onClick: handleContainerClick,
                title: minimizable ? isMinimized ? tr2.t("avatar.title.clickToMaximize") : tr2.t("avatar.title.clickToMinimize") : void 0,
                children: [
                  !isLoaded && !error && jsx(
                    "div",
                    {
                      style: {
                        color: currentTheme.textPrimary,
                        position: "relative",
                        zIndex: 1,
                        fontSize: "0.875rem",
                        animation: "ania-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                      },
                      children: tr2.t("avatar.loading")
                    }
                  ),
                  error && jsx("div", { style: { color: "#f87171", fontSize: "0.75rem", padding: "8px", textAlign: "center", position: "relative", zIndex: 1 }, children: error })
                ]
              }
            ),
            children && !isMinimized && jsx("div", { style: { width: "100%", flex: "1 1 auto", minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }, children })
          ]
        }
      )
    }
  );
  if (inline) {
    return avatarNode;
  }
  if (typeof document !== "undefined" && document.body) {
    return createPortal(avatarNode, document.body);
  }
  return avatarNode;
});
const escapeXml = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const professionalTTSRequest = async (text, provider, config) => {
  try {
    if (provider === "tiktok") {
      const voiceId = config.ttsVoiceId || (config.ttsGender === "male" ? "br_005" : "br_003");
      const response = await fetch(`https://tiktok-tts.weilnet.workers.dev/api/generation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          voice: voiceId
        })
      });
      if (!response.ok) {
        throw new Error(`TikTok TTS error: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.data) {
        const audioData = atob(data.data);
        const audioArray = new Uint8Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
          audioArray[i] = audioData.charCodeAt(i);
        }
        const audioBlob = new Blob([audioArray], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        return { audioUrl, duration: 0 };
      } else {
        throw new Error("TikTok TTS: Invalid response");
      }
    } else if (provider === "elevenlabs") {
      const voiceId = config.ttsVoiceId || "pNInz6obpgDQGcFmaJgB";
      const model = config.ttsModel || "eleven_multilingual_v2";
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": config.ttsApiKey
        },
        body: JSON.stringify({
          text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });
      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };
    } else if (provider === "google") {
      const apiUrl = config.ttsApiUrl || `https://texttospeech.googleapis.com/v1/text:synthesize?key=${config.ttsApiKey}`;
      const voiceConfig = {
        languageCode: config.ttsLang || "pt-BR",
        name: config.ttsVoiceId || "pt-BR-Standard-B",
        ssmlGender: config.ttsGender === "male" ? "MALE" : config.ttsGender === "female" ? "FEMALE" : "NEUTRAL"
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: { text },
          voice: voiceConfig,
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: config.ttsRate || 1,
            pitch: (config.ttsPitch - 1) * 20
          }
        })
      });
      if (!response.ok) {
        throw new Error(`Google TTS API error: ${response.status}`);
      }
      const data = await response.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), (c) => c.charCodeAt(0))],
        { type: "audio/mpeg" }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };
    } else if (provider === "piper") {
      const { initPiper: initPiper2, piperSynthesize: piperSynthesize2 } = await Promise.resolve().then(() => piperTts);
      if (config.piperModelUrl) {
        await initPiper2(config.piperModelUrl, config.piperModelConfigUrl, {
          onProgress: config.onPiperProgress
        });
      }
      const { audioUrl } = await piperSynthesize2(text, {
        speakerId: config.piperSpeakerId
      });
      return { audioUrl, duration: 0 };
    } else if (provider === "azure") {
      const region = config.ttsRegion || "brazilsouth";
      const apiUrl = config.ttsApiUrl || `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
      const voiceName = config.ttsVoiceId || "pt-BR-AntonioNeural";
      const ssml = `<speak version='1.0' xml:lang='${escapeXml(config.ttsLang || "pt-BR")}'>
        <voice name='${escapeXml(voiceName)}'>
          <prosody rate='${config.ttsRate || 1}' pitch='${(config.ttsPitch - 1) * 50}%'>
            ${escapeXml(text)}
          </prosody>
        </voice>
      </speak>`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": config.ttsApiKey,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3"
        },
        body: ssml
      });
      if (!response.ok) {
        throw new Error(`Azure TTS API error: ${response.status}`);
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };
    }
  } catch (error) {
    throw error;
  }
};
const SENTENCE_ENDERS = /* @__PURE__ */ new Set([".", "!", "?", "…"]);
const ABBREVIATIONS = /* @__PURE__ */ new Set([
  "sr",
  "sra",
  "srta",
  "dr",
  "dra",
  "prof",
  "profa",
  "exmo",
  "exma",
  "sto",
  "sta",
  "av",
  "r",
  "pç",
  "ed",
  "ap",
  "apto",
  "bl",
  "cep",
  "tel",
  "cel",
  "ramal",
  "cnpj",
  "cpf",
  "rg",
  "ltda",
  "cia",
  "me",
  "ne",
  "no",
  "nro",
  "pag",
  "pags",
  "fl",
  "fls",
  "art",
  "inc",
  "par",
  "etc",
  "ex",
  "p",
  "pp",
  "cap",
  "vol",
  "ed",
  "séc",
  "sec",
  "min",
  "seg",
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
  "mr",
  "mrs",
  "ms",
  "jr",
  "st",
  "vs",
  "eg",
  "ie",
  "inc",
  "corp",
  "co",
  "al"
]);
const isDigit = (ch) => ch >= "0" && ch <= "9";
const isUpper = (ch) => ch >= "A" && ch <= "Z" || ch && ch.toLowerCase() !== ch.toUpperCase() && ch === ch.toUpperCase();
const isLetter = (ch) => !!ch && ch.toLowerCase() !== ch.toUpperCase();
const isSpace = (ch) => ch === " " || ch === "	" || ch === " ";
const wordBeforeDot = (text, dotIndex) => {
  let j = dotIndex - 1;
  let word = "";
  while (j >= 0 && (isLetter(text[j]) || isDigit(text[j]) || text[j] === "$")) {
    word = text[j] + word;
    j--;
  }
  return word;
};
const isAbbreviationOrNumberDot = (text, i) => {
  const prev = text[i - 1];
  const next = text[i + 1];
  if (isDigit(prev) && isDigit(next)) return true;
  if (next && !isSpace(next) && (isLetter(next) || isDigit(next))) return true;
  const word = wordBeforeDot(text, i);
  if (!word) return false;
  if (word.length === 1 && isUpper(word)) return true;
  const lower = word.toLowerCase();
  if (ABBREVIATIONS.has(lower)) return true;
  return false;
};
const isEllipsisRun = (text, i) => text[i] === "." && text[i + 1] === "." && text[i + 2] === ".";
const chunkText = (text, opts = {}) => {
  const {
    minChunkChars = 12,
    maxChunkChars = 0,
    splitOnSemicolon = false,
    firstChunkMaxChars = 0
  } = opts;
  if (text == null) return [];
  const src = String(text);
  if (!src.trim()) return [];
  const rawChunks = [];
  let start = 0;
  let i = 0;
  const n = src.length;
  const push = (end) => {
    const piece = src.slice(start, end);
    if (piece.trim()) rawChunks.push(piece.trim());
    start = end;
  };
  while (i < n) {
    const ch = src[i];
    if (ch === "\n" || ch === "\r") {
      push(i);
      while (i < n && (src[i] === "\n" || src[i] === "\r")) i++;
      start = i;
      continue;
    }
    if (ch === "…") {
      push(i + 1);
      i++;
      continue;
    }
    if (isEllipsisRun(src, i)) {
      let j = i;
      while (j < n && src[j] === ".") j++;
      push(j);
      i = j;
      continue;
    }
    if (SENTENCE_ENDERS.has(ch)) {
      if (ch === "." && isAbbreviationOrNumberDot(src, i)) {
        i++;
        continue;
      }
      let end = i + 1;
      while (end < n && ("!?.…".includes(src[end]) || `")’”'`.includes(src[end]))) {
        end++;
      }
      push(end);
      i = end;
      continue;
    }
    if (splitOnSemicolon && (ch === ";" || ch === ":")) {
      push(i + 1);
      i++;
      continue;
    }
    i++;
  }
  if (start < n) push(n);
  const merged = [];
  for (let k = 0; k < rawChunks.length; k++) {
    const cur = rawChunks[k];
    if (cur.length < minChunkChars && k < rawChunks.length - 1) {
      rawChunks[k + 1] = `${cur} ${rawChunks[k + 1]}`;
      continue;
    }
    if (cur.length < minChunkChars && merged.length > 0) {
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${cur}`;
      continue;
    }
    merged.push(cur);
  }
  if (firstChunkMaxChars > 0 && merged.length > 0 && merged[0].length > firstChunkMaxChars) {
    const first = merged[0];
    let cut = first.lastIndexOf(",", firstChunkMaxChars);
    if (cut < Math.min(minChunkChars, firstChunkMaxChars)) {
      cut = first.lastIndexOf(" ", firstChunkMaxChars);
    }
    if (cut <= 0) cut = firstChunkMaxChars;
    const head = first.slice(0, first[cut] === "," ? cut + 1 : cut).trim();
    const tail = first.slice(first[cut] === "," ? cut + 1 : cut).trim();
    if (head && tail) {
      merged.splice(0, 1, head, tail);
    }
  }
  if (maxChunkChars > 0) {
    const wrapped = [];
    for (const chunk of merged) {
      if (chunk.length <= maxChunkChars) {
        wrapped.push(chunk);
        continue;
      }
      let rest = chunk;
      while (rest.length > maxChunkChars) {
        let cut = rest.lastIndexOf(" ", maxChunkChars);
        if (cut <= 0) cut = maxChunkChars;
        wrapped.push(rest.slice(0, cut).trim());
        rest = rest.slice(cut).trim();
      }
      if (rest) wrapped.push(rest);
    }
    return wrapped.filter(Boolean);
  }
  return merged.filter(Boolean);
};
const useTTSDetection = ({
  pauseThreshold = 150,
  idleTransitionDelay = 400,
  talkStartDelay = 0,
  minTalkDuration = 500,
  minIdleDuration = 300,
  onTalkStart,
  onTalkEnd,
  ttsProvider = "browser",
  ttsConfig = {},
  // ---- streaming/chunked config ----
  ttsChunking = true,
  // Short natural beat between sentences. The synthesized audio already ends
  // with the sentence's own trailing silence, so anything near 1s reads as
  // "the bot froze" — 250ms is a breath, not a stall.
  chunkGapMs = 250,
  maxChunkChars = 0,
  minChunkChars = 12,
  // Cap the FIRST chunk so the first synthesis is tiny and speech starts
  // almost immediately; the remainder streams behind it (0 = off).
  firstChunkMaxChars = 100,
  splitOnSemicolon = false,
  // Fires with the <audio> element (cloud/piper) of each chunk as it begins to
  // play, so the host can (re)connect lip-sync to the live element.
  onChunkAudio
} = {}) => {
  const [isTalking, setIsTalking] = useState(false);
  const pauseTimeoutRef = useRef(null);
  const idleTransitionTimeoutRef = useRef(null);
  const talkStartTimeoutRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const lastBoundaryTimeRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const audioRef = useRef(null);
  const lastTalkActivationRef = useRef(null);
  const lastIdleActivationRef = useRef(null);
  const genRef = useRef(0);
  const gapTimeoutRef = useRef(null);
  const pendingUrlsRef = useRef(/* @__PURE__ */ new Set());
  const synthAbortRef = useRef(null);
  const isPlayingRef = useRef(false);
  const playReleaseRef = useRef(null);
  const activateTalk = useCallback(() => {
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    if (talkStartTimeoutRef.current) return;
    const now = Date.now();
    const timeSinceIdle = lastIdleActivationRef.current ? now - lastIdleActivationRef.current : Infinity;
    const doActivate = () => {
      lastTalkActivationRef.current = Date.now();
      setIsTalking((prev) => {
        if (!prev) {
          if (onTalkStart) onTalkStart();
        }
        return true;
      });
      talkStartTimeoutRef.current = null;
    };
    const idleHoldRemaining = Math.max(0, minIdleDuration - timeSinceIdle);
    const delay = Math.max(talkStartDelay, idleHoldRemaining);
    if (delay > 0) {
      talkStartTimeoutRef.current = setTimeout(doActivate, delay);
    } else {
      doActivate();
    }
  }, [onTalkStart, talkStartDelay, minIdleDuration]);
  useCallback(() => {
    const now = Date.now();
    const timeSinceTalk = lastTalkActivationRef.current ? now - lastTalkActivationRef.current : Infinity;
    const effectiveDelay = Math.max(idleTransitionDelay, minTalkDuration - timeSinceTalk);
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
    }
    idleTransitionTimeoutRef.current = setTimeout(() => {
      lastIdleActivationRef.current = Date.now();
      setIsTalking((prev) => {
        if (prev) {
          if (onTalkEnd) onTalkEnd();
        }
        return false;
      });
      idleTransitionTimeoutRef.current = null;
    }, effectiveDelay);
  }, [idleTransitionDelay, onTalkEnd, minTalkDuration]);
  const resetPauseTimeout = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    activateTalk();
  }, [activateTalk]);
  const revokeAllUrls = useCallback(() => {
    for (const url of pendingUrlsRef.current) {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
      }
    }
    pendingUrlsRef.current.clear();
  }, []);
  const hardStop = useCallback(() => {
    genRef.current += 1;
    if (synthAbortRef.current) {
      try {
        synthAbortRef.current.abort();
      } catch (e) {
      }
      synthAbortRef.current = null;
    }
    if (gapTimeoutRef.current) {
      clearTimeout(gapTimeoutRef.current);
      gapTimeoutRef.current = null;
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    if (audioRef.current) {
      const a = audioRef.current;
      audioRef.current = null;
      try {
        a.onended = null;
        a.onerror = null;
        a.onplay = null;
        a.pause();
        a.currentTime = 0;
        a.removeAttribute("src");
        a.src = "";
        a.load();
      } catch (e) {
      }
    }
    if (playReleaseRef.current) {
      const release = playReleaseRef.current;
      playReleaseRef.current = null;
      try {
        release();
      } catch (e) {
      }
    }
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
      }
    }
    currentUtteranceRef.current = null;
    isSpeakingRef.current = false;
    isPlayingRef.current = false;
    revokeAllUrls();
  }, [revokeAllUrls]);
  const scheduleIdle = useCallback(() => {
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
    }
    idleTransitionTimeoutRef.current = setTimeout(() => {
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
      idleTransitionTimeoutRef.current = null;
    }, idleTransitionDelay);
  }, [idleTransitionDelay, onTalkEnd]);
  const synthChunkAudio = useCallback(async (chunkStr, signal) => {
    const { audioUrl } = await professionalTTSRequest(chunkStr, ttsProvider, ttsConfig);
    pendingUrlsRef.current.add(audioUrl);
    if (signal && signal.aborted) {
      try {
        URL.revokeObjectURL(audioUrl);
      } catch (e) {
      }
      pendingUrlsRef.current.delete(audioUrl);
      throw new DOMException("aborted", "AbortError");
    }
    return audioUrl;
  }, [ttsProvider, ttsConfig]);
  const playChunkAudio = useCallback((audioUrl, myGen) => new Promise((resolve) => {
    const cleanup = () => {
      try {
        URL.revokeObjectURL(audioUrl);
      } catch (e) {
      }
      pendingUrlsRef.current.delete(audioUrl);
    };
    if (genRef.current !== myGen) {
      cleanup();
      resolve();
      return;
    }
    if (isPlayingRef.current) {
      cleanup();
      resolve();
      return;
    }
    const audio = new Audio(audioUrl);
    audio.preload = "auto";
    audioRef.current = audio;
    isPlayingRef.current = true;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      isPlayingRef.current = false;
      isSpeakingRef.current = false;
      playReleaseRef.current = null;
      try {
        audio.onended = null;
        audio.onerror = null;
        audio.onplay = null;
      } catch (e) {
      }
      if (audioRef.current === audio) audioRef.current = null;
      cleanup();
      resolve();
    };
    playReleaseRef.current = finish;
    if (onChunkAudio) {
      try {
        onChunkAudio(audio);
      } catch (e) {
      }
    }
    audio.onplay = () => {
      isSpeakingRef.current = true;
      resetPauseTimeout();
    };
    audio.onended = finish;
    audio.onerror = finish;
    audio.play().catch(() => {
      finish();
    });
  }), [onChunkAudio, resetPauseTimeout]);
  const gapWait = useCallback((ms2, myGen) => new Promise((resolve) => {
    if (ms2 <= 0 || genRef.current !== myGen) {
      resolve();
      return;
    }
    gapTimeoutRef.current = setTimeout(() => {
      gapTimeoutRef.current = null;
      resolve();
    }, ms2);
  }), []);
  const runAudioQueue = useCallback(async (chunks, myGen) => {
    const gap = chunkGapMs;
    const abort = new AbortController();
    synthAbortRef.current = abort;
    const PREFETCH_DEPTH = 2;
    const ahead = [];
    let fetched = 0;
    const fillAhead = () => {
      while (fetched < chunks.length && ahead.length < PREFETCH_DEPTH + 1) {
        ahead.push(synthChunkAudio(chunks[fetched], abort.signal).catch(() => null));
        fetched++;
      }
    };
    fillAhead();
    for (let i = 0; i < chunks.length; i++) {
      if (genRef.current !== myGen) return true;
      let audioUrl;
      try {
        audioUrl = await ahead.shift();
      } catch (e) {
        audioUrl = null;
      }
      if (genRef.current !== myGen) return true;
      if (i === 0 && !audioUrl) {
        return false;
      }
      fillAhead();
      if (audioUrl) {
        await playChunkAudio(audioUrl, myGen);
      }
      if (genRef.current !== myGen) return true;
      if (i + 1 < chunks.length) {
        await gapWait(gap, myGen);
        if (genRef.current !== myGen) return true;
      }
    }
    if (genRef.current !== myGen) return true;
    if (synthAbortRef.current) synthAbortRef.current = null;
    scheduleIdle();
    return true;
  }, [chunkGapMs, synthChunkAudio, playChunkAudio, gapWait, scheduleIdle]);
  const runBrowserQueue = useCallback((chunks, myGen, options) => {
    if (!window.speechSynthesis) return;
    let i = 0;
    const speakNext = () => {
      if (genRef.current !== myGen) return;
      if (i >= chunks.length) {
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = null;
        }
        isSpeakingRef.current = false;
        lastBoundaryTimeRef.current = null;
        currentUtteranceRef.current = null;
        scheduleIdle();
        return;
      }
      const chunkStr = chunks[i];
      const utterance = new SpeechSynthesisUtterance(chunkStr);
      utterance.lang = options.lang || "pt-BR";
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      if (options.voice) utterance.voice = options.voice;
      currentUtteranceRef.current = utterance;
      utterance.onstart = () => {
        if (genRef.current !== myGen) return;
        isSpeakingRef.current = true;
        lastBoundaryTimeRef.current = Date.now();
        resetPauseTimeout();
      };
      utterance.onboundary = () => {
        lastBoundaryTimeRef.current = Date.now();
        resetPauseTimeout();
      };
      utterance.onend = () => {
        if (genRef.current !== myGen) return;
        isSpeakingRef.current = false;
        lastBoundaryTimeRef.current = null;
        i += 1;
        const isLast = i >= chunks.length;
        const gap = isLast ? 0 : chunkGapMs;
        if (gap > 0) {
          if (gapTimeoutRef.current) clearTimeout(gapTimeoutRef.current);
          gapTimeoutRef.current = setTimeout(() => {
            gapTimeoutRef.current = null;
            speakNext();
          }, gap);
        } else {
          speakNext();
        }
      };
      utterance.onerror = (event) => {
        if (event.error === "interrupted" || genRef.current !== myGen) return;
        isSpeakingRef.current = false;
        lastBoundaryTimeRef.current = null;
        i += 1;
        speakNext();
      };
      window.speechSynthesis.speak(utterance);
    };
    speakNext();
  }, [chunkGapMs, resetPauseTimeout, scheduleIdle]);
  const speak = useCallback(async (text, options = {}) => {
    if (text == null || !String(text).trim()) return;
    if (options.cancelPrevious) {
      hardStop();
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
    } else {
      hardStop();
    }
    const myGen = genRef.current;
    const doChunk = options.ttsChunking ?? ttsChunking;
    const chunks = doChunk ? chunkText(String(text), {
      minChunkChars: options.minChunkChars ?? minChunkChars,
      maxChunkChars: options.maxChunkChars ?? maxChunkChars,
      firstChunkMaxChars: options.firstChunkMaxChars ?? firstChunkMaxChars,
      splitOnSemicolon: options.splitOnSemicolon ?? splitOnSemicolon
    }) : [String(text).trim()];
    if (chunks.length === 0) return;
    const keylessProviders = ["tiktok", "piper"];
    const useCloud = ttsProvider !== "browser" && (ttsConfig.ttsApiKey || keylessProviders.includes(ttsProvider));
    if (useCloud) {
      let handled = false;
      try {
        handled = await runAudioQueue(chunks, myGen);
      } catch (error) {
        handled = false;
      }
      if (genRef.current !== myGen) return;
      if (handled) return;
    }
    if (!window.speechSynthesis) return;
    runBrowserQueue(chunks, myGen, options);
  }, [
    ttsProvider,
    ttsConfig,
    ttsChunking,
    minChunkChars,
    maxChunkChars,
    firstChunkMaxChars,
    splitOnSemicolon,
    hardStop,
    onTalkEnd,
    runAudioQueue,
    runBrowserQueue
  ]);
  const cancel = useCallback(() => {
    hardStop();
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    if (talkStartTimeoutRef.current) {
      clearTimeout(talkStartTimeoutRef.current);
      talkStartTimeoutRef.current = null;
    }
    lastBoundaryTimeRef.current = null;
    setIsTalking(false);
    if (onTalkEnd) onTalkEnd();
  }, [hardStop, onTalkEnd]);
  useEffect(() => {
    return () => {
      hardStop();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (idleTransitionTimeoutRef.current) clearTimeout(idleTransitionTimeoutRef.current);
      if (talkStartTimeoutRef.current) clearTimeout(talkStartTimeoutRef.current);
      if (gapTimeoutRef.current) clearTimeout(gapTimeoutRef.current);
    };
  }, []);
  return {
    isTalking,
    speak,
    cancel,
    audioRef
  };
};
const useSpeechRecognition = ({
  sttProvider = "browser",
  sttLang = "pt-BR",
  sttContinuous = false,
  sttInterimResults = true,
  sttApiKey = null,
  sttApiUrl = null,
  onTranscriptChange,
  onFinalTranscript,
  onEnd,
  onError
} = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isListeningRef = useRef(false);
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);
  const startBrowserRecognition = useCallback(() => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      if (onError) onError(new Error("Web Speech API not supported"));
      return false;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = sttLang;
    recognition.continuous = sttContinuous;
    recognition.interimResults = sttInterimResults;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onresult = (event) => {
      let interimText = "";
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcriptPiece + " ";
        } else {
          interimText += transcriptPiece;
        }
      }
      if (interimText) {
        setInterimTranscript(interimText);
        if (onTranscriptChange) onTranscriptChange(interimText, false);
      }
      if (finalText) {
        setTranscript((prev) => prev + finalText);
        setInterimTranscript("");
        if (onFinalTranscript) onFinalTranscript(finalText.trim());
      }
    };
    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") {
        if (onEnd && isListeningRef.current) onEnd();
        return;
      }
      setIsListening(false);
      if (onError) onError(new Error(event.error));
    };
    recognition.onend = () => {
      setInterimTranscript("");
      if (onEnd && isListeningRef.current) {
        onEnd();
      } else {
        setIsListening(false);
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
    return true;
  }, [sttLang, sttContinuous, sttInterimResults, onTranscriptChange, onFinalTranscript, onEnd, onError]);
  const startGoogleRecognition = useCallback(async () => {
    if (!sttApiKey) {
      if (onError) onError(new Error("API Key required for Google STT"));
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm"
      });
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(",")[1];
          const apiUrl = sttApiUrl || `https://speech.googleapis.com/v1/speech:recognize?key=${sttApiKey}`;
          try {
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                config: {
                  encoding: "WEBM_OPUS",
                  sampleRateHertz: 48e3,
                  languageCode: sttLang,
                  enableAutomaticPunctuation: true
                },
                audio: {
                  content: base64Audio
                }
              })
            });
            if (!response.ok) {
              throw new Error(`Google STT error: ${response.status}`);
            }
            const data = await response.json();
            if (data.results && data.results[0]) {
              const transcriptText = data.results[0].alternatives[0].transcript;
              setTranscript(transcriptText);
              if (onFinalTranscript) onFinalTranscript(transcriptText);
            }
            if (onEnd) onEnd();
          } catch (err) {
            if (onError) onError(err);
          }
        };
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsListening(true);
      return true;
    } catch (err) {
      if (onError) onError(err);
      return false;
    }
  }, [sttApiKey, sttApiUrl, sttLang, onFinalTranscript, onEnd, onError]);
  const startListening = useCallback(async () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
      }
      recognitionRef.current = null;
    }
    setTranscript("");
    setInterimTranscript("");
    if (sttProvider === "google" && sttApiKey) {
      return await startGoogleRecognition();
    } else {
      return startBrowserRecognition();
    }
  }, [sttProvider, sttApiKey, startGoogleRecognition, startBrowserRecognition]);
  const stopListening = useCallback(() => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
      }
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
      }
      mediaRecorderRef.current = null;
    }
  }, []);
  const clearTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
        }
      }
      if (mediaRecorderRef.current) {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {
        }
      }
    };
  }, []);
  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    clearTranscript
  };
};
const DEFAULT_GENERIC_ERROR = "Tive um probleminha aqui, pode tentar de novo?";
function resolveGenericError(translate) {
  if (typeof translate === "function") {
    const out = translate("chat.error.generic");
    if (out && out !== "chat.error.generic") return out;
  }
  return DEFAULT_GENERIC_ERROR;
}
function isRetriable(status) {
  return status == null || status >= 500;
}
const RETRY_DELAY_MS = 1200;
const useChatbot = ({
  webhookUrl,
  webhookApiKey = null,
  webhookHeaders = {},
  // Client-side responder override. When set, replaces the webhook POST: called
  // with (message, metadata), returns the reply as a string OR an object
  // { message|content|text, attachments?, action? }. Enables a fake/mock
  // provider or a custom AI client with no webhookUrl. A throw is surfaced as
  // the same friendly error the webhook path uses.
  onSendMessage,
  onResponse,
  onError,
  formatRequest,
  parseResponse,
  availableActions = [],
  onActionTriggered,
  // Optional i18n resolver (AvatarChatbot passes tr.t). Used only to localize
  // the user-facing fallback message; the hook works without it.
  translate
} = {}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendMessage = useCallback(async (message, metadata = {}) => {
    const { attachments = [], ...restMetadata } = metadata;
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      attachments: attachments.length > 0 ? attachments : void 0,
      ...restMetadata
    };
    setMessages((prev) => [...prev, userMessage]);
    if (typeof onSendMessage === "function") {
      setIsLoading(true);
      setError(null);
      try {
        const reply = await onSendMessage(message, metadata);
        let responseText = "";
        let responseAttachments = [];
        let responseAction = null;
        if (typeof reply === "string") {
          responseText = reply;
        } else if (reply && typeof reply === "object") {
          responseText = reply.message || reply.content || reply.text || "";
          responseAttachments = reply.attachments || [];
          responseAction = reply.action || null;
        }
        if (responseAction && onActionTriggered) onActionTriggered(responseAction);
        const botMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: responseText,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          attachments: responseAttachments.length > 0 ? responseAttachments : void 0,
          raw: reply
        };
        setMessages((prev) => [...prev, botMessage]);
        if (onResponse) onResponse(botMessage, reply);
        setIsLoading(false);
        return botMessage;
      } catch (err) {
        console.error("[useChatbot] onSendMessage responder failed:", err);
        const friendlyMessage = resolveGenericError(translate);
        const errorMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: friendlyMessage,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          isError: true
        };
        setMessages((prev) => [...prev, errorMessage]);
        setError(friendlyMessage);
        if (onError) onError(err, friendlyMessage);
        setIsLoading(false);
        return errorMessage;
      }
    }
    if (!webhookUrl) {
      setError("Chat não configurado (webhookUrl ausente).");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const actionsList = availableActions.length > 0 ? availableActions.map((a) => ({ id: a.id, name: a.name })) : void 0;
      const requestBody = formatRequest ? formatRequest(message, { ...metadata, availableActions: actionsList }) : {
        message,
        attachments: attachments.length > 0 ? attachments : void 0,
        availableActions: actionsList,
        ...restMetadata
      };
      const headers = {
        "Content-Type": "application/json",
        ...webhookHeaders
      };
      if (webhookApiKey) {
        headers["Authorization"] = `Bearer ${webhookApiKey}`;
        headers["X-API-Key"] = webhookApiKey;
      }
      const body = JSON.stringify(requestBody);
      const attempt = async () => {
        let response2;
        try {
          response2 = await fetch(webhookUrl, { method: "POST", headers, body });
        } catch (netErr) {
          const e = new Error(netErr && netErr.message ? netErr.message : "network error");
          e.status = null;
          e.cause = netErr;
          throw e;
        }
        if (!response2.ok) {
          const e = new Error(`HTTP ${response2.status}: ${response2.statusText}`);
          e.status = response2.status;
          throw e;
        }
        return response2;
      };
      let response;
      try {
        response = await attempt();
      } catch (firstErr) {
        if (!isRetriable(firstErr.status)) throw firstErr;
        console.error("[useChatbot] webhook failed, retrying once in " + RETRY_DELAY_MS + "ms:", firstErr);
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        response = await attempt();
      }
      const data = await response.json();
      let responseText = "";
      let responseAttachments = [];
      let responseAction = null;
      if (parseResponse) {
        const parsed = parseResponse(data);
        if (typeof parsed === "object" && parsed !== null) {
          responseText = parsed.message || parsed.content || parsed.text || JSON.stringify(parsed);
          responseAttachments = parsed.attachments || [];
          responseAction = parsed.action || null;
        } else {
          responseText = parsed;
        }
      } else {
        responseText = data.message || data.response || data.text || data.content || JSON.stringify(data);
        responseAttachments = data.attachments || data.files || [];
        responseAction = data.action || null;
      }
      if (responseAction && onActionTriggered) {
        onActionTriggered(responseAction);
      }
      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: responseText,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        attachments: responseAttachments.length > 0 ? responseAttachments : void 0,
        raw: data
      };
      setMessages((prev) => [...prev, botMessage]);
      if (onResponse) {
        onResponse(botMessage, data);
      }
      setIsLoading(false);
      return botMessage;
    } catch (err) {
      console.error("[useChatbot] webhook error (shown to user as friendly copy):", err);
      const friendlyMessage = resolveGenericError(translate);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: friendlyMessage,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(friendlyMessage);
      if (onError) {
        onError(err, friendlyMessage);
      }
      setIsLoading(false);
      return errorMessage;
    }
  }, [webhookUrl, webhookApiKey, webhookHeaders, onSendMessage, formatRequest, parseResponse, onResponse, onError, availableActions, onActionTriggered, translate]);
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);
  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearMessages
  };
};
function getNode(flowDef, nodeId) {
  if (!flowDef || !flowDef.nodes || nodeId == null) return null;
  return flowDef.nodes[nodeId] || null;
}
function interpolate(text, collected) {
  if (text == null) return "";
  const str = String(text);
  if (str.indexOf("{") === -1) return str;
  const map = collected || {};
  const fill = (s) => s.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_m, k) => {
    const v = map[k];
    return v == null ? "" : String(v);
  }).replace(/\{\s*([\w.-]+)\s*\}/g, (_m, k) => {
    const v = map[k];
    return v == null ? "" : String(v);
  });
  return fill(str).replace(/[ \t]+([,.;:!?])/g, "$1").replace(/[ \t]{2,}/g, " ").trim();
}
function resolvePrompt(prompt, translate, collected) {
  if (prompt == null) return "";
  let out = String(prompt);
  if (typeof translate === "function") {
    const t = translate(prompt);
    if (t != null && t !== prompt) out = String(t);
  }
  return interpolate(out, collected);
}
function visibleOptions(node) {
  if (!node || !Array.isArray(node.options)) return [];
  return node.options;
}
function nodeInput(node) {
  if (!node || !node.input || typeof node.input !== "object") return null;
  if (node.input.key == null) return null;
  return node.input;
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidPhoneBR(value) {
  const digits = String(value).replace(/\D/g, "");
  const national = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;
  return national.length === 10 || national.length === 11;
}
function isValidCEP(value) {
  return /^\d{5}-?\d{3}$/.test(String(value).trim());
}
const BUILTIN_VALIDATORS = {
  email: (v) => EMAIL_RE.test(String(v).trim()),
  phone: isValidPhoneBR,
  cep: isValidCEP
};
function validateInput(input, rawValue) {
  if (!input) return { ok: true };
  const value = rawValue == null ? "" : String(rawValue).trim();
  const required = input.required !== false;
  const errKey = input.errorMsg || "chat.flow.inputInvalid";
  if (value === "") {
    return required ? { ok: false, errorKey: errKey } : { ok: true };
  }
  const rule = input.validate;
  if (rule != null && rule !== "") {
    const builtin = BUILTIN_VALIDATORS[String(rule).toLowerCase()];
    if (builtin) {
      return builtin(value) ? { ok: true } : { ok: false, errorKey: errKey };
    }
    let re = null;
    try {
      re = new RegExp(rule);
    } catch (_) {
      re = null;
    }
    if (re && !re.test(value)) return { ok: false, errorKey: errKey };
  }
  return { ok: true };
}
function applyCapture(collected, option) {
  if (!option || option.capture == null) return collected;
  const next = { ...collected };
  if (typeof option.capture === "string") {
    next[option.capture] = option.value;
  } else if (typeof option.capture === "object") {
    Object.assign(next, option.capture);
  }
  return next;
}
function initialState(seed) {
  return {
    currentNodeId: null,
    backStack: [],
    collected: seed && typeof seed === "object" ? { ...seed } : {},
    done: false,
    escalated: false,
    inputError: null
  };
}
function inputAlreadyKnown(input, collected) {
  if (!input || input.key == null) return false;
  const v = (collected || {})[input.key];
  if (v == null || String(v).trim() === "") return false;
  return validateInput(input, v).ok;
}
function consentAlreadyGiven(consentKey, collected) {
  if (consentKey == null) return false;
  const v = (collected || {})[consentKey];
  if (v == null) return false;
  if (v === false) return false;
  const s = String(v).trim().toLowerCase();
  if (s === "" || s === "false" || s === "recusado" || s === "declined" || s === "no") return false;
  return true;
}
function consentAdvanceNext(node, consentKey) {
  if (!node || !Array.isArray(node.options)) return null;
  for (const opt of node.options) {
    if (!opt || opt.next == null) continue;
    let capturesConsent = false;
    let capturedVal;
    if (typeof opt.capture === "string" && opt.capture === consentKey) {
      capturesConsent = true;
      capturedVal = opt.value;
    } else if (opt.capture && typeof opt.capture === "object" && consentKey in opt.capture) {
      capturesConsent = true;
      capturedVal = opt.capture[consentKey];
    }
    if (!capturesConsent) continue;
    const s = capturedVal == null ? "" : String(capturedVal).trim().toLowerCase();
    if (s === "false" || s === "recusado" || s === "declined" || s === "no") continue;
    return opt.next;
  }
  return null;
}
function resolveLanding(flowDef, targetId, collected, consentKey) {
  const skipped = [];
  let id2 = targetId;
  const limit = flowDef && flowDef.nodes ? Object.keys(flowDef.nodes).length + 1 : 1;
  for (let i = 0; i < limit; i++) {
    const node = getNode(flowDef, id2);
    if (!node) break;
    if (node.alwaysAsk === true) break;
    const input = nodeInput(node);
    if (input) {
      if (!inputAlreadyKnown(input, collected)) break;
      const nextId = input.next != null ? input.next : null;
      if (nextId == null || nextId === id2) break;
      skipped.push(id2);
      id2 = nextId;
      continue;
    }
    if (consentKey != null && consentAlreadyGiven(consentKey, collected)) {
      const nextId = consentAdvanceNext(node, consentKey);
      if (nextId != null && nextId !== id2) {
        skipped.push(id2);
        id2 = nextId;
        continue;
      }
    }
    break;
  }
  return { landingId: id2, skipped };
}
function knownName(collected) {
  const c = collected || {};
  for (const k of ["name", "nome", "firstName", "fullName"]) {
    if (c[k] != null && String(c[k]).trim() !== "") return String(c[k]).trim();
  }
  return null;
}
function returningGreetingText(collected, translate) {
  const name = knownName(collected);
  const key = name ? "chat.flow.welcomeBackNamed" : "chat.flow.welcomeBack";
  let tmpl = name ? "Bem-vindo de volta, {name}!" : "Bem-vindo de volta!";
  if (typeof translate === "function") {
    const t = translate(key);
    if (t != null && t !== key) tmpl = String(t);
  }
  return interpolate(tmpl, collected);
}
function enterEffects(flowDef, nodeId, collected, translate, opts = {}) {
  const node = getNode(flowDef, nodeId);
  const effects = [];
  if (!node) return effects;
  if (opts.returning) {
    const name = knownName(collected);
    if (name) {
      const landingText = node.prompt != null ? resolvePrompt(node.prompt, translate, collected) : "";
      const alreadyNamesUser = landingText.indexOf(name) !== -1;
      if (!alreadyNamesUser) {
        const greet = returningGreetingText(collected, translate);
        if (greet) {
          effects.push({ type: "message", text: greet });
          if (node.speak !== false) effects.push({ type: "speak", text: greet });
        }
      }
    }
  }
  if (node.prompt != null) {
    const text = resolvePrompt(node.prompt, translate, collected);
    effects.push({ type: "message", text });
    if (node.speak !== false) {
      effects.push({ type: "speak", text });
    }
  }
  if (node.escalate || node.terminal) {
    if (node.escalate) effects.push({ type: "escalate", collected });
  }
  return effects;
}
function flowReducer(state, action, flowDef, opts = {}) {
  const { translate, seed, consentKey } = opts;
  const safeState = state || initialState(seed);
  switch (action && action.type) {
    case "START": {
      const startId = flowDef && flowDef.startNode;
      const collected = seed && typeof seed === "object" ? { ...seed } : {};
      const consented = consentAlreadyGiven(consentKey, collected);
      const { landingId, skipped } = resolveLanding(flowDef, startId, collected, consentKey);
      const node = getNode(flowDef, landingId);
      const returning = consented && landingId !== startId && knownName(collected) != null;
      const next = {
        currentNodeId: node ? landingId : null,
        backStack: skipped,
        collected,
        done: !!(node && node.terminal),
        escalated: !!(node && node.escalate),
        inputError: null
      };
      return { state: next, effects: enterEffects(flowDef, landingId, collected, translate, { returning }) };
    }
    case "RESET": {
      const startId = flowDef && flowDef.startNode;
      const collected = seed && typeof seed === "object" ? { ...seed } : {};
      const node = getNode(flowDef, startId);
      const next = {
        currentNodeId: node ? startId : null,
        backStack: [],
        collected,
        done: !!(node && node.terminal),
        escalated: !!(node && node.escalate),
        inputError: null
      };
      return { state: next, effects: enterEffects(flowDef, startId, collected, translate) };
    }
    case "RESUME": {
      const collected = seed && typeof seed === "object" ? { ...seed } : {};
      const savedId = action.nodeId;
      const savedNode = getNode(flowDef, savedId);
      const fromId = savedNode ? savedId : flowDef && flowDef.startNode;
      const { landingId, skipped } = resolveLanding(flowDef, fromId, collected, consentKey);
      const node = getNode(flowDef, landingId);
      const returning = knownName(collected) != null;
      const next = {
        currentNodeId: node ? landingId : null,
        backStack: skipped,
        collected,
        done: !!(node && node.terminal),
        escalated: !!(node && node.escalate),
        inputError: null
      };
      return { state: next, effects: enterEffects(flowDef, landingId, collected, translate, { returning }) };
    }
    case "SELECT": {
      const { option } = action;
      const current = getNode(flowDef, safeState.currentNodeId);
      if (!current || !option) return { state: safeState, effects: [] };
      let collected = applyCapture(safeState.collected, option);
      if (current.collectKey != null) {
        collected = { ...collected, [current.collectKey]: option.value };
      }
      const captureEffects = [];
      const before = safeState.collected;
      for (const key of Object.keys(collected)) {
        if (collected[key] !== before[key]) {
          captureEffects.push({ type: "capture", key, value: collected[key], collected });
        }
      }
      const backStack = [...safeState.backStack, safeState.currentNodeId];
      if (option.escalate) {
        const next2 = { ...safeState, collected, backStack, escalated: true, inputError: null };
        return { state: next2, effects: [...captureEffects, { type: "escalate", collected }] };
      }
      if (option.terminal) {
        const next2 = { ...safeState, collected, backStack, done: true, inputError: null };
        return { state: next2, effects: captureEffects };
      }
      const rawNextId = option.next != null ? option.next : null;
      const { landingId, skipped } = resolveLanding(flowDef, rawNextId, collected, consentKey);
      const nextNode = getNode(flowDef, landingId);
      const next = {
        currentNodeId: nextNode ? landingId : safeState.currentNodeId,
        backStack: nextNode ? [...backStack, ...skipped] : backStack,
        collected,
        done: !!(nextNode && nextNode.terminal),
        escalated: !!(nextNode && nextNode.escalate),
        inputError: null
      };
      const enter = nextNode ? enterEffects(flowDef, landingId, collected, translate) : [];
      return { state: next, effects: [...captureEffects, ...enter] };
    }
    case "SUBMIT_INPUT": {
      const current = getNode(flowDef, safeState.currentNodeId);
      const input = nodeInput(current);
      if (!input) return { state: safeState, effects: [] };
      const rawValue = action.value;
      const result = validateInput(input, rawValue);
      if (!result.ok) {
        const next2 = { ...safeState, inputError: result.errorKey };
        return { state: next2, effects: [] };
      }
      const value = rawValue == null ? "" : String(rawValue).trim();
      let collected = { ...safeState.collected, [input.key]: value };
      if (current.collectKey != null) {
        collected = { ...collected, [current.collectKey]: value };
      }
      const captureEffects = [];
      const before = safeState.collected;
      for (const key of Object.keys(collected)) {
        if (collected[key] !== before[key]) {
          captureEffects.push({ type: "capture", key, value: collected[key], collected });
        }
      }
      const backStack = [...safeState.backStack, safeState.currentNodeId];
      const rawNextId = input.next != null ? input.next : null;
      const { landingId, skipped } = resolveLanding(flowDef, rawNextId, collected, consentKey);
      const nextNode = getNode(flowDef, landingId);
      const next = {
        currentNodeId: nextNode ? landingId : safeState.currentNodeId,
        backStack: nextNode ? [...backStack, ...skipped] : backStack,
        collected,
        done: !!(nextNode && nextNode.terminal),
        escalated: !!(nextNode && nextNode.escalate),
        inputError: null
      };
      const enter = nextNode ? enterEffects(flowDef, landingId, collected, translate) : [];
      return { state: next, effects: [...captureEffects, ...enter] };
    }
    case "BACK": {
      if (safeState.backStack.length === 0) return { state: safeState, effects: [] };
      const backStack = safeState.backStack.slice(0, -1);
      const prevId = safeState.backStack[safeState.backStack.length - 1];
      const prevNode = getNode(flowDef, prevId);
      const next = {
        ...safeState,
        currentNodeId: prevNode ? prevId : safeState.currentNodeId,
        backStack,
        done: false,
        escalated: !!(prevNode && prevNode.escalate),
        inputError: null
      };
      return { state: next, effects: enterEffects(flowDef, prevId, safeState.collected, translate) };
    }
    case "GOTO": {
      const targetId = action.nodeId;
      const target = getNode(flowDef, targetId);
      if (!target) return { state: safeState, effects: [] };
      const backStack = safeState.currentNodeId != null ? [...safeState.backStack, safeState.currentNodeId] : safeState.backStack;
      const next = {
        ...safeState,
        currentNodeId: targetId,
        backStack,
        done: !!target.terminal,
        escalated: !!target.escalate,
        inputError: null
      };
      return { state: next, effects: enterEffects(flowDef, targetId, safeState.collected, translate) };
    }
    default:
      return { state: safeState, effects: [] };
  }
}
function genSessionId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch (_) {
  }
  return "flow-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
}
const PERSIST_TTL_MS = 30 * 24 * 60 * 60 * 1e3;
function persistStore() {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch (_) {
  }
  return null;
}
function loadPersisted$1(key) {
  const store = persistStore();
  if (!store || !key) return null;
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    if (typeof data.ts === "number" && Date.now() - data.ts > PERSIST_TTL_MS) {
      store.removeItem(key);
      return null;
    }
    return data;
  } catch (_) {
    return null;
  }
}
function savePersisted$1(key, payload) {
  const store = persistStore();
  if (!store || !key) return;
  try {
    store.setItem(key, JSON.stringify({ ...payload, ts: Date.now() }));
  } catch (_) {
  }
}
function removePersisted(key) {
  const store = persistStore();
  if (!store || !key) return;
  try {
    store.removeItem(key);
  } catch (_) {
  }
}
function isConsented(v) {
  if (v == null) return false;
  if (v === false) return false;
  const s = String(v).trim().toLowerCase();
  if (s === "" || s === "false" || s === "recusado" || s === "declined" || s === "no") return false;
  return true;
}
function useFlowEngine(flowDef, deps = {}) {
  const {
    speak,
    sendMessage,
    onCapture,
    onEscalate,
    onPrompt,
    appId,
    lang,
    translate,
    initialContext,
    persist = true,
    persistKey,
    consentKey
  } = deps;
  const storageKey = useMemo(() => {
    if (persistKey) return persistKey;
    const id2 = appId != null ? appId : flowDef && flowDef.id != null ? flowDef.id : "default";
    return "ania-flow-" + id2;
  }, [persistKey, appId, flowDef]);
  const persistedRef = useRef(void 0);
  if (persistedRef.current === void 0) {
    persistedRef.current = persist ? loadPersisted$1(storageKey) : null;
  }
  const seed = useMemo(() => {
    const restored = persist && persistedRef.current && persistedRef.current.collected || {};
    const known = initialContext && typeof initialContext === "object" ? initialContext : {};
    const merged = { ...restored, ...known };
    return Object.keys(merged).length ? merged : null;
  }, [persist, initialContext]);
  const sessionIdRef = useRef(null);
  if (sessionIdRef.current == null) {
    const restoredSid = persist && persistedRef.current && persistedRef.current.sessionId;
    sessionIdRef.current = restoredSid || genSessionId();
  }
  const sessionId = sessionIdRef.current;
  const speakRef = useRef(speak);
  const sendMessageRef = useRef(sendMessage);
  const onCaptureRef = useRef(onCapture);
  const onEscalateRef = useRef(onEscalate);
  const onPromptRef = useRef(onPrompt);
  const translateRef = useRef(translate);
  const langRef = useRef(lang);
  const appIdRef = useRef(appId);
  useEffect(() => {
    speakRef.current = speak;
    sendMessageRef.current = sendMessage;
    onCaptureRef.current = onCapture;
    onEscalateRef.current = onEscalate;
    onPromptRef.current = onPrompt;
    translateRef.current = translate;
    langRef.current = lang;
    appIdRef.current = appId;
  });
  const transcriptRef = useRef([]);
  const runEffect = useCallback((effect) => {
    switch (effect.type) {
      case "message": {
        transcriptRef.current.push({ role: "assistant", text: effect.text });
        if (onPromptRef.current && effect.text) {
          onPromptRef.current(effect.text);
        }
        break;
      }
      case "speak": {
        if (speakRef.current && effect.text) {
          speakRef.current(effect.text, { lang: langRef.current, cancelPrevious: true });
        }
        break;
      }
      case "capture": {
        if (onCaptureRef.current) {
          onCaptureRef.current({
            sessionId: sessionIdRef.current,
            appId: appIdRef.current,
            key: effect.key,
            value: effect.value,
            collected: effect.collected
          });
        }
        break;
      }
      case "escalate": {
        const transcript = transcriptRef.current.slice();
        const contact = extractContact(effect.collected);
        if (onEscalateRef.current) {
          onEscalateRef.current({
            collected: effect.collected,
            contact,
            sessionId: sessionIdRef.current,
            transcript
          });
        } else if (sendMessageRef.current) {
          const text = buildEscalationText(effect.collected);
          sendMessageRef.current(text, {
            flowId: flowDef && flowDef.id,
            sessionId: sessionIdRef.current,
            appId: appIdRef.current,
            collected: effect.collected,
            contact,
            escalate: true
          });
        }
        break;
      }
    }
  }, [flowDef]);
  const seedRef = useRef(seed);
  useEffect(() => {
    seedRef.current = seed;
  }, [seed]);
  const pendingEffectsRef = useRef([]);
  const consentKeyRef = useRef(consentKey);
  useEffect(() => {
    consentKeyRef.current = consentKey;
  });
  const reducer = useCallback((state2, action) => {
    const { state: nextState, effects } = flowReducer(state2, action, flowDef, {
      translate: translateRef.current,
      seed: seedRef.current,
      consentKey: consentKeyRef.current
    });
    if (effects && effects.length) {
      pendingEffectsRef.current.push(...effects);
    }
    return nextState;
  }, [flowDef]);
  const [state, dispatch] = useReducer(reducer, seed, initialState);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  });
  useEffect(() => {
    if (pendingEffectsRef.current.length === 0) return;
    const queued = pendingEffectsRef.current;
    pendingEffectsRef.current = [];
    for (const eff of queued) runEffect(eff);
  });
  const startedForRef = useRef(null);
  const flowKey = flowDef && (flowDef.id != null ? flowDef.id : flowDef);
  useEffect(() => {
    if (!flowDef) return;
    if (startedForRef.current === flowKey) return;
    startedForRef.current = flowKey;
    transcriptRef.current = [];
    const p = persist ? persistedRef.current : null;
    const restoredCollected = p && p.collected && typeof p.collected === "object" ? p.collected : null;
    const consentGiven = restoredCollected ? consentKey == null ? true : isConsented(restoredCollected[consentKey]) : false;
    const savedNodeId = p && typeof p.currentNodeId === "string" ? p.currentNodeId : null;
    const startNodeId = flowDef.startNode;
    const canResume = consentGiven && savedNodeId != null && getNode(flowDef, savedNodeId) != null && savedNodeId !== startNodeId;
    if (canResume) {
      dispatch({ type: "RESUME", nodeId: savedNodeId });
    } else if (consentGiven) {
      dispatch({ type: "START" });
    } else {
      dispatch({ type: "START" });
    }
  }, [flowDef, flowKey, persist, consentKey]);
  const currentNode = useMemo(
    () => getNode(flowDef, state.currentNodeId),
    [flowDef, state.currentNodeId]
  );
  const prevNodeId = state.backStack.length > 0 ? state.backStack[state.backStack.length - 1] : null;
  const isBackOption = useCallback((opt) => {
    if (!opt) return false;
    if (opt.isBack === true) return true;
    if (prevNodeId != null && opt.next != null && opt.next === prevNodeId) return true;
    const label = opt.label != null ? String(opt.label).trim() : "";
    if (label) {
      const tr2 = translateRef.current;
      const backLabel = typeof tr2 === "function" ? tr2("chat.flow.back") : null;
      const norm = (s) => String(s).replace(/^[\s←⬅<-]+/, "").trim().toLowerCase();
      if (backLabel && backLabel !== "chat.flow.back" && norm(label) === norm(backLabel)) {
        return true;
      }
    }
    return false;
  }, [prevNodeId]);
  const visibleOptions$1 = useMemo(
    () => visibleOptions(currentNode).filter((opt) => !isBackOption(opt)),
    [currentNode, isBackOption]
  );
  const selectOption = useCallback((opt) => {
    if (!opt) return;
    transcriptRef.current.push({ role: "user", text: opt.label != null ? String(opt.label) : String(opt.value) });
    dispatch({ type: "SELECT", option: opt });
  }, []);
  const goBack = useCallback(() => {
    dispatch({ type: "BACK" });
  }, []);
  const clearPersistedFlow = useCallback(() => {
    removePersisted(storageKey);
    persistedRef.current = null;
  }, [storageKey]);
  const reset = useCallback(() => {
    transcriptRef.current = [];
    clearPersistedFlow();
    dispatch({ type: "RESET" });
  }, [clearPersistedFlow]);
  const goto = useCallback((nodeId) => {
    dispatch({ type: "GOTO", nodeId });
  }, []);
  const canGoBack = state.backStack.length > 0;
  useEffect(() => {
    if (!persist) return;
    const consented = consentKey == null ? true : !!state.collected[consentKey];
    if (!consented) {
      if (consentKey != null) removePersisted(storageKey);
      return;
    }
    if (!state.collected || Object.keys(state.collected).length === 0) return;
    savePersisted$1(storageKey, {
      sessionId: sessionIdRef.current,
      collected: state.collected,
      currentNodeId: state.currentNodeId
    });
  }, [persist, consentKey, storageKey, state.collected, state.currentNodeId]);
  const currentPrompt = useMemo(
    () => currentNode ? resolvePrompt(currentNode.prompt, translateRef.current, state.collected) : "",
    [currentNode, state.collected]
  );
  const resolveText = useCallback(
    (text) => resolvePrompt(text, translateRef.current, state.collected),
    [state.collected]
  );
  const resolveLabel = resolveText;
  const resolvedInputError = useMemo(
    () => state.inputError ? resolvePrompt(state.inputError, translateRef.current, state.collected) : null,
    [state.inputError, state.collected]
  );
  const currentInput = useMemo(
    () => nodeInput(currentNode),
    [currentNode]
  );
  const submitInput = useCallback((value) => {
    if (!currentInput) return { ok: false, error: null };
    const trimmed = value == null ? "" : String(value).trim();
    dispatch({ type: "SUBMIT_INPUT", value });
    const probe = flowReducer(stateRef.current, { type: "SUBMIT_INPUT", value }, flowDef, {
      translate: translateRef.current
    });
    const ok = probe.state.inputError == null;
    if (ok && trimmed) {
      transcriptRef.current.push({ role: "user", text: trimmed });
    }
    return { ok, error: ok ? null : probe.state.inputError };
  }, [currentInput, flowDef]);
  return {
    currentNode,
    currentPrompt,
    currentInput,
    visibleOptions: visibleOptions$1,
    resolveLabel,
    resolveText,
    selectOption,
    submitInput,
    // FULLY-resolved (i18n + {var}-interpolated) validation error — render this
    // directly (do NOT pass it back through tr.t / interpolate, it's done).
    inputError: resolvedInputError,
    goBack,
    canGoBack,
    reset,
    goto,
    clearPersistedFlow,
    collected: state.collected,
    sessionId,
    isEscalated: state.escalated,
    isDone: state.done
  };
}
function extractContact(collected) {
  const c = collected || {};
  const pick = (...keys) => {
    for (const k of keys) {
      if (c[k] != null && String(c[k]).trim() !== "") return String(c[k]).trim();
    }
    return void 0;
  };
  const contact = {};
  const name = pick("name", "nome", "fullName", "firstName");
  const phone = pick("phone", "telefone", "whatsapp", "celular", "tel", "fone");
  const email = pick("email", "mail", "e-mail");
  if (name) contact.name = name;
  if (phone) contact.phone = phone;
  if (email) contact.email = email;
  return contact;
}
function buildEscalationText(collected) {
  const entries = Object.entries(collected || {});
  if (entries.length === 0) return "O usuário deseja falar com o atendimento.";
  const contact = extractContact(collected);
  const lines = entries.map(([k, v]) => `${k}: ${v}`).join("; ");
  const who = contact.name ? `O usuário ${contact.name} deseja` : "O usuário deseja";
  const contactBits = [];
  if (contact.name) contactBits.push(`nome: ${contact.name}`);
  if (contact.phone) contactBits.push(`telefone: ${contact.phone}`);
  if (contact.email) contactBits.push(`e-mail: ${contact.email}`);
  const contactLine = contactBits.length ? ` Contato — ${contactBits.join("; ")}.` : "";
  return `${who} falar com o atendimento.${contactLine} Contexto: ${lines}.`;
}
const useLipSync = ({ enabled = false, fftSize = 2048, smoothing = 0.8 } = {}) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const prevSpectrumRef = useRef(null);
  const connectedElementRef = useRef(null);
  const elementSourcesRef = useRef(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : null);
  const resumeListenersRef = useRef(null);
  const lastResumeKickRef = useRef(0);
  const getOrCreateContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);
  const kickResume = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || ctx.state !== "suspended") return;
    const now = Date.now();
    if (now - lastResumeKickRef.current < 250) return;
    lastResumeKickRef.current = now;
    try {
      ctx.resume().catch(() => {
      });
    } catch (e) {
    }
  }, []);
  const installResumeListeners = useCallback(() => {
    if (resumeListenersRef.current || typeof document === "undefined") return;
    const onVisibility = () => {
      if (!document.hidden) kickResume();
    };
    const onGesture = () => {
      kickResume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);
    resumeListenersRef.current = () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [kickResume]);
  const connectAudioElement = useCallback((audioElement) => {
    if (!enabled || !audioElement) return;
    if (connectedElementRef.current === audioElement && analyserRef.current) {
      kickResume();
      return;
    }
    try {
      const ctx = getOrCreateContext();
      installResumeListeners();
      if (ctx.state === "suspended") kickResume();
      if (!analyserRef.current || analyserRef.current.context !== ctx) {
        if (analyserRef.current) {
          try {
            analyserRef.current.disconnect();
          } catch (e) {
          }
        }
        const analyser2 = ctx.createAnalyser();
        analyser2.fftSize = fftSize;
        analyser2.smoothingTimeConstant = smoothing;
        analyser2.connect(ctx.destination);
        analyserRef.current = analyser2;
        dataArrayRef.current = new Uint8Array(analyser2.frequencyBinCount);
        prevSpectrumRef.current = new Float32Array(analyser2.frequencyBinCount);
      }
      const analyser = analyserRef.current;
      if (sourceRef.current) {
        try {
          sourceRef.current.disconnect();
        } catch (e) {
        }
      }
      let source = elementSourcesRef.current ? elementSourcesRef.current.get(audioElement) : null;
      if (source && source.context !== ctx) {
        console.warn("[useLipSync] Audio element belongs to a closed AudioContext; skipping analyser hookup");
        return;
      }
      if (!source) {
        source = ctx.createMediaElementSource(audioElement);
        if (elementSourcesRef.current) elementSourcesRef.current.set(audioElement, source);
      }
      source.connect(analyser);
      sourceRef.current = source;
      connectedElementRef.current = audioElement;
    } catch (err) {
      console.warn("[useLipSync] Failed to connect audio:", err);
    }
  }, [enabled, fftSize, smoothing, getOrCreateContext, installResumeListeners, kickResume]);
  const getSpectralOpenness = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return 0;
    const ctx = audioContextRef.current;
    if (!ctx) return 0;
    if (ctx.state !== "running") {
      kickResume();
      return 0;
    }
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    analyser.getByteFrequencyData(data);
    const sampleRate = ctx.sampleRate;
    const binSize = sampleRate / analyser.fftSize;
    const lowBin = Math.floor(85 / binSize);
    const highBin = Math.min(data.length - 1, Math.ceil(3e3 / binSize));
    let sum = 0;
    let count = 0;
    for (let i = lowBin; i <= highBin; i++) {
      sum += data[i];
      count++;
    }
    if (count === 0) return 0;
    return Math.min(1, sum / count / 255);
  }, [kickResume]);
  const getSpectralFlux = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !prevSpectrumRef.current) return 0;
    const ctx = audioContextRef.current;
    if (ctx && ctx.state !== "running") {
      kickResume();
      return 0;
    }
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    const prev = prevSpectrumRef.current;
    analyser.getByteFrequencyData(data);
    let flux = 0;
    const len = Math.min(data.length, prev.length);
    for (let i = 0; i < len; i++) {
      const diff = data[i] / 255 - prev[i];
      if (diff > 0) flux += diff;
      prev[i] = data[i] / 255;
    }
    return Math.min(1, flux / (len * 0.1));
  }, [kickResume]);
  const getAmplitude = useCallback(() => {
    if (!analyserRef.current) return 0;
    const ctx = audioContextRef.current;
    if (ctx && ctx.state !== "running") {
      kickResume();
      return 0;
    }
    const analyser = analyserRef.current;
    const timeData = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(timeData);
    let maxAmp = 0;
    for (let i = 0; i < timeData.length; i++) {
      const amp = Math.abs(timeData[i] - 128) / 128;
      if (amp > maxAmp) maxAmp = amp;
    }
    return maxAmp;
  }, [kickResume]);
  const disconnect = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (e) {
      }
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch (e) {
      }
      analyserRef.current = null;
    }
    connectedElementRef.current = null;
    dataArrayRef.current = null;
    prevSpectrumRef.current = null;
  }, []);
  useEffect(() => {
    return () => {
      disconnect();
      if (resumeListenersRef.current) {
        resumeListenersRef.current();
        resumeListenersRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {
        });
      }
    };
  }, [disconnect]);
  return {
    connectAudioElement,
    getSpectralOpenness,
    getSpectralFlux,
    getAmplitude,
    disconnect,
    isConnected: () => !!connectedElementRef.current
  };
};
const parseHotkey = (hotkeyString) => {
  if (!hotkeyString) return null;
  const parts = hotkeyString.toLowerCase().split("+").map((p) => p.trim());
  const result = {
    ctrl: false,
    alt: false,
    shift: false,
    meta: false,
    key: ""
  };
  for (const part of parts) {
    switch (part) {
      case "ctrl":
      case "control":
        result.ctrl = true;
        break;
      case "alt":
        result.alt = true;
        break;
      case "shift":
        result.shift = true;
        break;
      case "meta":
      case "cmd":
      case "command":
      case "win":
        result.meta = true;
        break;
      default:
        result.key = part;
    }
  }
  return result.key ? result : null;
};
const matchesHotkey = (event, parsed) => {
  if (!parsed) return false;
  if (event.ctrlKey !== parsed.ctrl) return false;
  if (event.altKey !== parsed.alt) return false;
  if (event.shiftKey !== parsed.shift) return false;
  if (event.metaKey !== parsed.meta) return false;
  const eventKey = event.key.toLowerCase();
  return eventKey === parsed.key;
};
const playActionAudio = (audioBase64, delayMs = 0) => {
  if (!audioBase64) return null;
  const play = () => {
    try {
      const dataUrl = audioBase64.startsWith("data:") ? audioBase64 : `data:audio/wav;base64,${audioBase64}`;
      const audio2 = new Audio(dataUrl);
      audio2.play().catch((err) => {
        console.warn("[ActionRenderer] Audio playback failed:", err);
      });
      return audio2;
    } catch (err) {
      console.warn("[ActionRenderer] Failed to create audio:", err);
      return null;
    }
  };
  if (delayMs > 0) {
    let audioRef = null;
    const timer = setTimeout(() => {
      audioRef = play();
    }, delayMs);
    return { cancel: () => {
      clearTimeout(timer);
      if (audioRef) {
        audioRef.pause();
        audioRef = null;
      }
    } };
  }
  const audio = play();
  return audio ? { cancel: () => {
    audio.pause();
  } } : null;
};
const useActionFrames = ({
  actions = [],
  enabled = true,
  enableHotkeys = true,
  onActionStart,
  onActionEnd,
  animationController
} = {}) => {
  const [activeAction, setActiveAction] = useState(null);
  const [availableActions, setAvailableActions] = useState([]);
  const parsedHotkeysRef = useRef([]);
  const audioHandleRef = useRef(null);
  useEffect(() => {
    if (!actions || actions.length === 0) {
      setAvailableActions((prev) => prev.length === 0 ? prev : []);
      parsedHotkeysRef.current = [];
      return;
    }
    const available = actions.map((a) => ({
      id: a.id,
      name: a.name,
      hotkey: a.hotkey || null
    }));
    setAvailableActions(available);
    parsedHotkeysRef.current = actions.filter((a) => a.hotkey).map((a) => ({
      actionId: a.id,
      parsed: parseHotkey(a.hotkey)
    })).filter((h) => h.parsed !== null);
  }, [actions]);
  useEffect(() => {
    if (!animationController || !actions || actions.length === 0) return;
    if (animationController.configureActions) {
      animationController.configureActions(actions);
    }
    animationController.onActionCompleteCallback = () => {
      setActiveAction(null);
      if (onActionEnd) onActionEnd();
    };
    animationController.onActionCancelCallback = (id2) => {
      setActiveAction(null);
      if (onActionEnd) onActionEnd();
    };
    animationController.onActionStartCallback = (id2) => {
      setActiveAction(id2);
      if (onActionStart) onActionStart(id2);
    };
  }, [animationController, actions, onActionStart, onActionEnd]);
  const triggerAction = useCallback((actionId) => {
    if (!enabled || !animationController) return;
    const actionConfig = actions.find((a) => a.id === actionId);
    if (!actionConfig) return;
    if (audioHandleRef.current) {
      audioHandleRef.current.cancel();
    }
    if (actionConfig.audio_base64) {
      audioHandleRef.current = playActionAudio(
        actionConfig.audio_base64,
        actionConfig.audio_delay_ms || 0
      );
    }
    if (animationController.triggerAction) {
      animationController.triggerAction(actionId);
    }
  }, [enabled, animationController, actions]);
  const cancelAction = useCallback(() => {
    if (!animationController) return;
    if (audioHandleRef.current) {
      audioHandleRef.current.cancel();
      audioHandleRef.current = null;
    }
    if (animationController.cancelAction) {
      animationController.cancelAction(true);
    }
  }, [animationController]);
  useEffect(() => {
    if (!enabled || !enableHotkeys || parsedHotkeysRef.current.length === 0) return;
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      for (const { actionId, parsed } of parsedHotkeysRef.current) {
        if (matchesHotkey(e, parsed)) {
          e.preventDefault();
          triggerAction(actionId);
          return;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, enableHotkeys, triggerAction]);
  return {
    activeAction,
    availableActions,
    triggerAction,
    cancelAction
  };
};
const PLUGIN_KINDS = ["tts", "stt", "wakeword", "action", "integration"];
const validatePlugin = (plugin) => {
  if (!plugin || typeof plugin !== "object") {
    throw new Error("[PluginRegistry] plugin must be an object");
  }
  if (!plugin.id || typeof plugin.id !== "string") {
    throw new Error("[PluginRegistry] plugin.id is required (string)");
  }
  if (!PLUGIN_KINDS.includes(plugin.kind)) {
    throw new Error(
      `[PluginRegistry] plugin.kind must be one of ${PLUGIN_KINDS.join(", ")} (got "${plugin.kind}")`
    );
  }
  return plugin;
};
class PluginRegistry {
  constructor() {
    this._plugins = /* @__PURE__ */ new Map();
    this._active = {};
    this._initialized = /* @__PURE__ */ new Set();
    this._listeners = /* @__PURE__ */ new Set();
    this.logger = console;
  }
  /** Subscribe to registry changes. Returns an unsubscribe fn. */
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
  _emit() {
    for (const l of this._listeners) {
      try {
        l(this);
      } catch (e) {
      }
    }
  }
  /**
   * Register a plugin. The first registered plugin of a given kind becomes
   * the active provider for that kind unless one is already active.
   * @param {import('./plugin-types.js').Plugin} plugin
   * @returns {() => void} an unregister fn for this plugin
   */
  register(plugin) {
    validatePlugin(plugin);
    const normalized = { enabled: true, builtin: false, version: "0.0.0", ...plugin };
    this._plugins.set(normalized.id, normalized);
    if ((normalized.kind === "tts" || normalized.kind === "stt" || normalized.kind === "wakeword") && !this._active[normalized.kind] && normalized.enabled !== false) {
      this._active[normalized.kind] = normalized.id;
    }
    this._emit();
    return () => this.unregister(normalized.id);
  }
  /** Register many plugins at once. */
  registerAll(plugins = []) {
    plugins.forEach((p) => this.register(p));
  }
  /** Remove a plugin by id. Clears the active slot if it pointed here. */
  unregister(id2) {
    const plugin = this._plugins.get(id2);
    if (!plugin) return;
    this._plugins.delete(id2);
    this._initialized.delete(id2);
    if (this._active[plugin.kind] === id2) {
      const next = this.getByKind(plugin.kind).find((p) => p.enabled !== false);
      this._active[plugin.kind] = next ? next.id : void 0;
    }
    this._emit();
  }
  get(id2) {
    return this._plugins.get(id2) || null;
  }
  /** All registered plugins (insertion order). */
  list() {
    return Array.from(this._plugins.values());
  }
  /** All plugins of a given kind. */
  getByKind(kind) {
    return this.list().filter((p) => p.kind === kind);
  }
  /** Enable/disable a plugin. Disabling the active provider re-selects. */
  setEnabled(id2, enabled) {
    const plugin = this._plugins.get(id2);
    if (!plugin) return;
    plugin.enabled = enabled;
    if (!enabled && this._active[plugin.kind] === id2) {
      const next = this.getByKind(plugin.kind).find((p) => p.id !== id2 && p.enabled !== false);
      this._active[plugin.kind] = next ? next.id : void 0;
    } else if (enabled && !this._active[plugin.kind] && (plugin.kind === "tts" || plugin.kind === "stt" || plugin.kind === "wakeword")) {
      this._active[plugin.kind] = id2;
    }
    this._emit();
  }
  /**
   * Mark which provider is active for a subsystem.
   * @param {import('./plugin-types.js').PluginKind} kind
   * @param {string} id
   */
  setActive(kind, id2) {
    if (!PLUGIN_KINDS.includes(kind)) {
      throw new Error(`[PluginRegistry] unknown kind "${kind}"`);
    }
    if (id2 != null && !this._plugins.has(id2)) {
      this.logger.warn(`[PluginRegistry] setActive("${kind}", "${id2}") — plugin not registered`);
    }
    this._active[kind] = id2;
    this._emit();
  }
  /** Id of the active provider for a kind (or null). */
  getActiveId(kind) {
    return this._active[kind] || null;
  }
  /** The active provider plugin for a kind (or null). */
  getActive(kind) {
    const id2 = this._active[kind];
    return id2 ? this._plugins.get(id2) || null : null;
  }
  /**
   * Ensure a plugin's init() has run exactly once, then return the plugin.
   * @param {string} id
   * @param {import('./plugin-types.js').PluginContext} [ctx]
   */
  async ensureInit(id2, ctx = {}) {
    const plugin = this._plugins.get(id2);
    if (!plugin) return null;
    if (!this._initialized.has(id2) && typeof plugin.init === "function") {
      await plugin.init({ registry: this, logger: this.logger, ...ctx });
      this._initialized.add(id2);
    }
    return plugin;
  }
  /**
   * Resolve the active engine for a tts/stt/wakeword subsystem. Runs the
   * provider's init() (once) and createEngine(), returning the engine object.
   * @param {'tts'|'stt'|'wakeword'} kind
   * @param {import('./plugin-types.js').PluginContext} [ctx]
   */
  async resolveEngine(kind, ctx = {}) {
    const plugin = this.getActive(kind);
    if (!plugin) return null;
    await this.ensureInit(plugin.id, ctx);
    if (typeof plugin.createEngine !== "function") return null;
    return plugin.createEngine({ registry: this, logger: this.logger, ...ctx });
  }
  /**
   * Resolve handlers for action/integration plugins. Returns an array of
   * handler objects from every enabled plugin of that kind (action handlers
   * are typically chained; integrations run side-effects).
   * @param {'action'|'integration'} kind
   * @param {import('./plugin-types.js').PluginContext} [ctx]
   */
  async resolveHandlers(kind, ctx = {}) {
    const out = [];
    for (const plugin of this.getByKind(kind)) {
      if (plugin.enabled === false) continue;
      await this.ensureInit(plugin.id, ctx);
      if (typeof plugin.createHandler === "function") {
        out.push({ id: plugin.id, handler: plugin.createHandler({ registry: this, logger: this.logger, ...ctx }) });
      }
    }
    return out;
  }
  /** Start every enabled plugin that exposes start(). */
  async startAll(ctx = {}) {
    for (const plugin of this.list()) {
      if (plugin.enabled === false) continue;
      await this.ensureInit(plugin.id, ctx);
      if (typeof plugin.start === "function") await plugin.start();
    }
  }
  /** Stop every plugin that exposes stop(). */
  async stopAll() {
    for (const plugin of this.list()) {
      if (typeof plugin.stop === "function") {
        try {
          await plugin.stop();
        } catch (e) {
          this.logger.warn(`[PluginRegistry] stop("${plugin.id}") failed:`, e);
        }
      }
    }
  }
}
let _defaultRegistry = null;
const getDefaultRegistry = () => {
  if (!_defaultRegistry) _defaultRegistry = new PluginRegistry();
  return _defaultRegistry;
};
const makeApiTtsEngine = (providerId, ctx) => {
  const config = ctx && ctx.config || {};
  let current = null;
  return {
    async synthesize(text, options = {}) {
      return professionalTTSRequest(text, providerId, { ...config, ...options });
    },
    async speak(text, options = {}) {
      const { audioUrl } = await professionalTTSRequest(text, providerId, { ...config, ...options });
      if (current) {
        try {
          current.pause();
        } catch (e) {
        }
      }
      const audio = new Audio(audioUrl);
      current = audio;
      audio.addEventListener("ended", () => URL.revokeObjectURL(audioUrl), { once: true });
      await audio.play();
      return audio;
    },
    stop() {
      if (current) {
        try {
          current.pause();
        } catch (e) {
        }
        current = null;
      }
    },
    cleanup() {
      this.stop();
    }
  };
};
const apiProvider = (id2, label, providerId, description) => ({
  id: id2,
  name: label,
  version: "1.4.0",
  kind: "tts",
  builtin: true,
  description,
  createEngine: (ctx) => makeApiTtsEngine(providerId, ctx)
});
const ttsBrowserPlugin = {
  id: "tts-browser",
  name: "Browser TTS (Web Speech)",
  version: "1.4.0",
  kind: "tts",
  builtin: true,
  description: "window.speechSynthesis — no key, no network.",
  createEngine: () => ({
    async speak(text, options = {}) {
      if (typeof window === "undefined" || !window.speechSynthesis) return null;
      if (options.cancelPrevious) window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = options.lang || "pt-BR";
      u.rate = options.rate || 1;
      u.pitch = options.pitch || 1;
      u.volume = options.volume ?? 1;
      if (options.voice) u.voice = options.voice;
      window.speechSynthesis.speak(u);
      return u;
    },
    stop() {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    }
  })
};
const ttsTiktokPlugin = apiProvider("tts-tiktok", "TikTok TTS", "tiktok", "Keyless TikTok voices (br_003/br_005).");
const ttsElevenLabsPlugin = apiProvider("tts-elevenlabs", "ElevenLabs", "elevenlabs", "ElevenLabs multilingual (needs API key).");
const ttsGooglePlugin = apiProvider("tts-google", "Google Cloud TTS", "google", "Google Cloud Text-to-Speech (needs API key).");
const ttsAzurePlugin = apiProvider("tts-azure", "Azure TTS", "azure", "Azure Cognitive Services Speech (needs API key).");
const ttsPiperPlugin = {
  id: "tts-piper",
  name: "Piper (on-device ONNX)",
  version: "1.4.0",
  kind: "tts",
  builtin: true,
  description: "Browser-side neural TTS via piper-tts-web + onnxruntime-web.",
  async init(ctx) {
    const cfg = ctx && ctx.config || {};
    if (cfg.piperModelUrl) {
      const { preloadPiper: preloadPiper2 } = await Promise.resolve().then(() => piperTts);
      preloadPiper2(cfg.piperModelUrl, cfg.piperModelConfigUrl).catch(() => {
      });
    }
  },
  createEngine: (ctx) => {
    const cfg = ctx && ctx.config || {};
    let current = null;
    return {
      async synthesize(text, options = {}) {
        const { initPiper: initPiper2, piperSynthesize: piperSynthesize2 } = await Promise.resolve().then(() => piperTts);
        if (cfg.piperModelUrl) await initPiper2(cfg.piperModelUrl, cfg.piperModelConfigUrl);
        return piperSynthesize2(text, { speakerId: options.speakerId ?? cfg.piperSpeakerId });
      },
      async speak(text, options = {}) {
        const { audioUrl } = await this.synthesize(text, options);
        if (current) {
          try {
            current.pause();
          } catch (e) {
          }
        }
        const audio = new Audio(audioUrl);
        current = audio;
        audio.addEventListener("ended", () => URL.revokeObjectURL(audioUrl), { once: true });
        await audio.play();
        return audio;
      },
      stop() {
        if (current) {
          try {
            current.pause();
          } catch (e) {
          }
          current = null;
        }
      }
    };
  }
};
const sttBrowserPlugin = {
  id: "stt-browser",
  name: "Browser STT (Web Speech)",
  version: "1.4.0",
  kind: "stt",
  builtin: true,
  description: "webkitSpeechRecognition — Chrome/Edge only, no key.",
  createEngine: () => ({ provider: "browser" })
};
const sttGooglePlugin = {
  id: "stt-google",
  name: "Google Cloud STT",
  version: "1.4.0",
  kind: "stt",
  builtin: true,
  description: "Google Cloud Speech-to-Text (needs API key).",
  createEngine: () => ({ provider: "google" })
};
const actionAudioPlugin = {
  id: "action-audio",
  name: "Action Audio",
  version: "1.4.0",
  kind: "action",
  builtin: true,
  description: "Plays an action config's base64 audio when the action fires.",
  createHandler: () => ({
    /** Called by the host when an action triggers; plays its bundled audio. */
    onAction(actionConfig) {
      if (actionConfig && actionConfig.audio_base64) {
        return playActionAudio(actionConfig.audio_base64, actionConfig.audio_delay_ms || 0);
      }
      return null;
    }
  })
};
const BUILTIN_PLUGINS = [
  ttsBrowserPlugin,
  ttsTiktokPlugin,
  ttsElevenLabsPlugin,
  ttsGooglePlugin,
  ttsAzurePlugin,
  ttsPiperPlugin,
  sttBrowserPlugin,
  sttGooglePlugin,
  actionAudioPlugin
];
const TTS_PROVIDER_TO_PLUGIN = {
  browser: "tts-browser",
  tiktok: "tts-tiktok",
  elevenlabs: "tts-elevenlabs",
  google: "tts-google",
  azure: "tts-azure",
  piper: "tts-piper"
};
const STT_PROVIDER_TO_PLUGIN = {
  browser: "stt-browser",
  google: "stt-google"
};
const registerBuiltins = (registry) => {
  for (const p of BUILTIN_PLUGINS) {
    if (!registry.get(p.id)) registry.register(p);
  }
};
const usePlugins = ({
  plugins = [],
  registry: externalRegistry = null,
  includeBuiltins = true,
  activeTts = null,
  activeStt = null,
  activeWakeword = null,
  useSharedRegistry = false
} = {}) => {
  const registryRef = useRef(null);
  if (!registryRef.current) {
    registryRef.current = externalRegistry || (useSharedRegistry ? getDefaultRegistry() : new PluginRegistry());
  }
  const registry = registryRef.current;
  const [, force] = useState(0);
  useEffect(() => {
    if (includeBuiltins) registerBuiltins(registry);
  }, [registry, includeBuiltins]);
  useEffect(() => {
    if (!plugins || plugins.length === 0) return;
    const ids = [];
    for (const p of plugins) {
      try {
        registry.register(p);
        ids.push(p.id);
      } catch (e) {
        registry.logger.warn("[usePlugins] failed to register plugin:", e);
      }
    }
    return () => {
      for (const id2 of ids) {
        const plugin = registry.get(id2);
        if (plugin && !plugin.builtin) registry.unregister(id2);
      }
    };
  }, [registry, plugins]);
  useEffect(() => {
    if (activeTts) registry.setActive("tts", activeTts);
  }, [registry, activeTts]);
  useEffect(() => {
    if (activeStt) registry.setActive("stt", activeStt);
  }, [registry, activeStt]);
  useEffect(() => {
    if (activeWakeword) registry.setActive("wakeword", activeWakeword);
  }, [registry, activeWakeword]);
  useEffect(() => registry.subscribe(() => force((n) => n + 1)), [registry]);
  const setActive = useCallback((kind, id2) => registry.setActive(kind, id2), [registry]);
  const register = useCallback((p) => registry.register(p), [registry]);
  const resolveEngine = useCallback((kind, ctx) => registry.resolveEngine(kind, ctx), [registry]);
  const resolveHandlers = useCallback((kind, ctx) => registry.resolveHandlers(kind, ctx), [registry]);
  return {
    registry,
    plugins: registry.list(),
    setActive,
    register,
    resolveEngine,
    resolveHandlers,
    getActive: (kind) => registry.getActive(kind),
    getActiveId: (kind) => registry.getActiveId(kind),
    getByKind: (kind) => registry.getByKind(kind)
  };
};
const SAMPLE_RATE = 16e3;
const FRAME_SIZE = 1280;
const FRAMES_PER_INFERENCE = 12;
let ortPromise = null;
const loadOrt = () => {
  if (ortPromise) return ortPromise;
  ortPromise = import("onnxruntime-web").then((m) => m.default || m).catch((err) => {
    ortPromise = null;
    throw new Error(
      "onnxruntime-web is not installed. Add it to enable wake-word detection: npm i onnxruntime-web. (" + (err && err.message ? err.message : err) + ")"
    );
  });
  return ortPromise;
};
class WakeWordEngine {
  constructor() {
    this.session = null;
    this.audioContext = null;
    this.stream = null;
    this.processor = null;
    this.source = null;
    this.isListening = false;
    this.threshold = 0.5;
    this.onDetect = null;
    this.onError = null;
    this.onScore = null;
    this.audioBuffer = [];
    this.wasmPaths = void 0;
  }
  /**
   * Load the ONNX wake-word model.
   * @param {string} modelPath URL to the .onnx model
   * @param {{ wasmPaths?: string }} [options]
   */
  async loadModel(modelPath, options = {}) {
    const ort2 = await loadOrt();
    if (options.wasmPaths !== void 0) this.wasmPaths = options.wasmPaths;
    if (this.wasmPaths !== void 0) ort2.env.wasm.wasmPaths = this.wasmPaths;
    try {
      ort2.env.wasm.numThreads = 1;
    } catch (e) {
    }
    this.session = await ort2.InferenceSession.create(modelPath, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all"
    });
    return this.session;
  }
  isModelLoaded() {
    return this.session !== null;
  }
  isCurrentlyListening() {
    return this.isListening;
  }
  /**
   * Start mic capture + inference loop.
   * @param {{ threshold:number, onDetect:()=>void, onError?:(e:Error)=>void, onScore?:(n:number)=>void }} config
   * @returns {Promise<boolean>}
   */
  async startListening(config) {
    if (this.isListening) return true;
    if (!this.session) {
      const err = new Error("Wake-word model not loaded. Call loadModel() first.");
      if (config.onError) config.onError(err);
      return false;
    }
    this.threshold = config.threshold ?? 0.5;
    this.onDetect = config.onDetect || null;
    this.onError = config.onError || null;
    this.onScore = config.onScore || null;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: SAMPLE_RATE,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new Ctx({ sampleRate: SAMPLE_RATE });
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.processor = this.audioContext.createScriptProcessor(FRAME_SIZE, 1, 1);
      this.processor.onaudioprocess = async (e) => {
        if (!this.isListening) return;
        const input = e.inputBuffer.getChannelData(0);
        this.audioBuffer.push(new Float32Array(input));
        if (this.audioBuffer.length >= FRAMES_PER_INFERENCE) {
          const full = this._concat(this.audioBuffer);
          this.audioBuffer = [];
          try {
            const score = await this._inference(full);
            if (this.onScore) this.onScore(score);
            if (score > this.threshold && this.onDetect) this.onDetect(score);
          } catch (err) {
            if (this.onError) this.onError(err);
          }
        }
      };
      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      this.isListening = true;
      return true;
    } catch (err) {
      if (this.onError) this.onError(err);
      await this.stopListening();
      return false;
    }
  }
  async stopListening() {
    this.isListening = false;
    if (this.processor) {
      try {
        this.processor.disconnect();
      } catch (e) {
      }
      this.processor.onaudioprocess = null;
      this.processor = null;
    }
    if (this.source) {
      try {
        this.source.disconnect();
      } catch (e) {
      }
      this.source = null;
    }
    if (this.audioContext) {
      try {
        await this.audioContext.close();
      } catch (e) {
      }
      this.audioContext = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    this.audioBuffer = [];
  }
  async dispose() {
    await this.stopListening();
    this.session = null;
  }
  _concat(buffers) {
    const total = buffers.reduce((s, b) => s + b.length, 0);
    const out = new Float32Array(total);
    let offset = 0;
    for (const b of buffers) {
      out.set(b, offset);
      offset += b.length;
    }
    return out;
  }
  async _inference(audio) {
    const ort2 = await loadOrt();
    const tensor = new ort2.Tensor("float32", audio, [1, audio.length]);
    const feeds = {};
    feeds[this.session.inputNames[0]] = tensor;
    const results = await this.session.run(feeds);
    const output = results[this.session.outputNames[0]];
    const data = output.data;
    let max = 0;
    for (let i = 0; i < data.length; i++) if (data[i] > max) max = data[i];
    return max;
  }
}
let _instance = null;
const getWakeWordEngine = () => {
  if (!_instance) _instance = new WakeWordEngine();
  return _instance;
};
const isWakeWordSupported = async () => {
  try {
    await loadOrt();
    return true;
  } catch (e) {
    return false;
  }
};
const useWakeWord = ({
  enabled = false,
  modelUrl = null,
  threshold = 0.5,
  wasmPaths = void 0,
  onWake,
  onError,
  onScore
} = {}) => {
  const engineRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const onWakeRef = useRef(onWake);
  const onErrorRef = useRef(onError);
  const onScoreRef = useRef(onScore);
  useEffect(() => {
    onWakeRef.current = onWake;
  }, [onWake]);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);
  useEffect(() => {
    onScoreRef.current = onScore;
  }, [onScore]);
  const getEngine = useCallback(() => {
    if (!engineRef.current) engineRef.current = new WakeWordEngine();
    return engineRef.current;
  }, []);
  const load = useCallback(async () => {
    if (!modelUrl) return false;
    try {
      const engine2 = getEngine();
      if (!engine2.isModelLoaded()) {
        await engine2.loadModel(modelUrl, { wasmPaths });
      }
      setIsLoaded(true);
      setError(null);
      return true;
    } catch (err) {
      setError(err);
      setIsLoaded(false);
      if (onErrorRef.current) onErrorRef.current(err);
      return false;
    }
  }, [modelUrl, wasmPaths, getEngine]);
  const start = useCallback(async () => {
    if (!modelUrl) return false;
    const ok = await load();
    if (!ok) return false;
    const engine2 = getEngine();
    const started = await engine2.startListening({
      threshold,
      onDetect: () => {
        if (onWakeRef.current) onWakeRef.current();
      },
      onError: (err) => {
        setError(err);
        if (onErrorRef.current) onErrorRef.current(err);
      },
      onScore: (s) => {
        setScore(s);
        if (onScoreRef.current) onScoreRef.current(s);
      }
    });
    setIsListening(started);
    return started;
  }, [modelUrl, threshold, load, getEngine]);
  const stop = useCallback(async () => {
    if (engineRef.current) await engineRef.current.stopListening();
    setIsListening(false);
  }, []);
  useEffect(() => {
    if (enabled && modelUrl) {
      start().catch(() => {
      });
    } else {
      stop().catch(() => {
      });
    }
    return () => {
      stop().catch(() => {
      });
    };
  }, [enabled, modelUrl, threshold]);
  useEffect(() => () => {
    if (engineRef.current) engineRef.current.dispose().catch(() => {
    });
    engineRef.current = null;
  }, []);
  return { isListening, isLoaded, score, error, start, stop, load };
};
let ort = null;
let PiperWebEngine, OnnxWebRuntime, OnnxWebWorkerRuntime, FetchProvider;
let depsPromise = null;
const ensureDeps = () => {
  if (depsPromise) return depsPromise;
  depsPromise = (async () => {
    const [ortMod, piperMod] = await Promise.all([
      import("onnxruntime-web"),
      import("piper-tts-web")
    ]);
    ort = ortMod.default || ortMod;
    PiperWebEngine = piperMod.PiperWebEngine;
    OnnxWebRuntime = piperMod.OnnxWebRuntime;
    OnnxWebWorkerRuntime = piperMod.OnnxWebWorkerRuntime;
    FetchProvider = piperMod.FetchProvider;
    ort.env.wasm.proxy = false;
    ort.env.wasm.numThreads = wasmThreadCount();
  })();
  return depsPromise;
};
const wasmThreadCount = () => {
  try {
    if (typeof crossOriginIsolated !== "undefined" && crossOriginIsolated) {
      const cores = typeof navigator !== "undefined" && navigator.hardwareConcurrency || 2;
      return Math.max(1, Math.min(4, cores - 1));
    }
  } catch (e) {
  }
  return 1;
};
let engine = null;
let initPromise = null;
let warmupPromise = null;
let currentVoiceName = null;
let useWorkerRuntime = true;
let piperStatus = {
  ready: false,
  modelCached: false,
  downloading: false,
  progress: 0,
  error: null,
  warming: false
};
const setStatus = (patch) => {
  piperStatus = { ...piperStatus, ...patch };
};
const buildVoiceProvider = (modelUrl, modelConfigUrl, options) => {
  const fetchProvider = new FetchProvider();
  return {
    destroy: () => fetchProvider.destroy(),
    list: async () => [],
    fetch: async () => {
      setStatus({ progress: 10 });
      if (options.onProgress) options.onProgress(10);
      const json = await fetchProvider.fetch(modelConfigUrl);
      setStatus({ progress: 30 });
      if (options.onProgress) options.onProgress(30);
      const blobUrl = await fetchProvider.fetch(modelUrl);
      setStatus({ progress: 90 });
      if (options.onProgress) options.onProgress(90);
      return [json, blobUrl];
    }
  };
};
const buildEngine = (voiceProvider) => {
  const numThreads = wasmThreadCount();
  if (useWorkerRuntime) {
    try {
      return new PiperWebEngine({
        onnxRuntime: new OnnxWebWorkerRuntime({ numThreads }),
        voiceProvider
      });
    } catch (err) {
      console.warn("[PiperTTS] Worker runtime unavailable, falling back to main thread:", err);
      useWorkerRuntime = false;
    }
  }
  return new PiperWebEngine({
    onnxRuntime: new OnnxWebRuntime({ numThreads }),
    voiceProvider
  });
};
const SYNTH_CACHE_MAX = 24;
const synthCache = /* @__PURE__ */ new Map();
const cacheGet = (key) => {
  const blob = synthCache.get(key);
  if (blob) {
    synthCache.delete(key);
    synthCache.set(key, blob);
  }
  return blob || null;
};
const cachePut = (key, blob) => {
  if (synthCache.has(key)) synthCache.delete(key);
  synthCache.set(key, blob);
  while (synthCache.size > SYNTH_CACHE_MAX) {
    const oldest = synthCache.keys().next().value;
    synthCache.delete(oldest);
  }
};
const initPiper = async (modelUrl, modelConfigUrl, options = {}) => {
  if (engine && piperStatus.ready) return engine;
  if (initPromise) return initPromise;
  setStatus({ downloading: true, progress: 0, error: null, warming: true });
  initPromise = (async () => {
    try {
      await ensureDeps();
      const modelFileName = modelUrl.split("/").pop().replace(".onnx", "");
      currentVoiceName = modelFileName;
      const voiceProvider = buildVoiceProvider(modelUrl, modelConfigUrl, options);
      engine = buildEngine(voiceProvider);
      warmupPromise = engine.generate(" ", currentVoiceName, 0).then(() => {
        setStatus({
          ready: true,
          modelCached: true,
          downloading: false,
          progress: 100,
          warming: false
        });
        if (options.onProgress) options.onProgress(100);
        if (options.onReady) options.onReady();
      }).catch((err) => {
        setStatus({ downloading: false, error: err.message, warming: false });
        console.error("[PiperTTS] Warmup failed:", err);
        throw err;
      });
      return engine;
    } catch (err) {
      engine = null;
      initPromise = null;
      warmupPromise = null;
      setStatus({ downloading: false, error: err.message, warming: false });
      console.error("[PiperTTS] Init failed:", err);
      throw err;
    }
  })();
  return initPromise;
};
const preloadPiper = (modelUrl, modelConfigUrl, options = {}) => {
  return initPiper(modelUrl, modelConfigUrl, options);
};
const piperSynthesize = async (text, options = {}) => {
  if (!engine) {
    throw new Error("Piper TTS not initialized. Call initPiper() first.");
  }
  if (warmupPromise) {
    try {
      await warmupPromise;
    } catch {
    }
  }
  try {
    const speakerId = options.speakerId ?? 0;
    const cacheKey = `${currentVoiceName}|${speakerId}|${text}`;
    const cached = cacheGet(cacheKey);
    if (cached) {
      return { audioUrl: URL.createObjectURL(cached), blob: cached, cached: true };
    }
    const response = await engine.generate(text, currentVoiceName, speakerId);
    const blob = response.file;
    cachePut(cacheKey, blob);
    const audioUrl = URL.createObjectURL(blob);
    return { audioUrl, blob };
  } catch (err) {
    console.error("[PiperTTS] Synthesis failed:", err);
    throw err;
  }
};
const getPiperStatus = () => ({ ...piperStatus });
const checkPiperStatus = () => ({ ...piperStatus });
const disposePiper = () => {
  if (engine == null ? void 0 : engine.destroy) {
    engine.destroy();
  }
  engine = null;
  initPromise = null;
  warmupPromise = null;
  currentVoiceName = null;
  piperStatus = {
    ready: false,
    modelCached: false,
    downloading: false,
    progress: 0,
    error: null,
    warming: false
  };
};
const piperTts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkPiperStatus,
  disposePiper,
  getPiperStatus,
  initPiper,
  piperSynthesize,
  preloadPiper
}, Symbol.toStringTag, { value: "Module" }));
const COMMAND_LIST = [
  { cmd: "show", desc: "Show the avatar (resume animation)." },
  { cmd: "hide", desc: "Hide the avatar (pause animation)." },
  { cmd: "toggle", desc: "Toggle avatar visibility." },
  { cmd: "action <id|index>", desc: "Trigger an action by id or 1-based position." },
  { cmd: "actions", desc: "List available actions (index, id, name)." },
  { cmd: "info", desc: "Report player info (visible, talking, action list)." },
  { cmd: "speed <idle> [talk]", desc: "Set idle (and optional talk) speed. talk defaults to idle." },
  { cmd: "sensitivity <0..1>", desc: "Set microphone sensitivity." },
  { cmd: "mute", desc: "Mute microphone capture." },
  { cmd: "unmute", desc: "Unmute microphone capture." },
  { cmd: "tts <text>", desc: "Speak literal text via TTS (no LLM)." },
  { cmd: "ask <text>", desc: "Send text to the chatbot/LLM; reply is spoken." },
  { cmd: "provider <text>", desc: 'Alias of "ask".' },
  { cmd: "flow <nodeId>", desc: "Jump the NO-AI flow to a node id." },
  { cmd: "wake", desc: "Trigger the wake/assistant pipeline manually." },
  { cmd: "stop", desc: "Stop speaking / listening." },
  { cmd: "help", desc: "List all commands." }
];
const helpText = () => "Commands:\n" + COMMAND_LIST.map((c) => `  ${c.cmd.padEnd(22)} ${c.desc}`).join("\n");
const parseCommandLine = (line) => {
  const trimmed = String(line || "").trim();
  if (!trimmed) return { verb: "", args: [], rest: "" };
  const match = trimmed.match(/^(\S+)\s*(.*)$/s);
  const verb = (match ? match[1] : trimmed).toLowerCase();
  const rest = match ? match[2] : "";
  const args = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m;
  while ((m = re.exec(rest)) !== null) {
    args.push(m[1] ?? m[2] ?? m[3]);
  }
  return { verb, args, rest: rest.trim() };
};
const resolveActionId = (actions, token) => {
  if (!actions || actions.length === 0) return null;
  const byId = actions.find((a) => a.id === token);
  if (byId) return byId.id;
  const idx = parseInt(token, 10);
  if (!Number.isNaN(idx) && idx >= 1 && idx <= actions.length) {
    return actions[idx - 1].id;
  }
  return null;
};
const executeCommand = (line, ctx = {}) => {
  const logger = ctx.logger || console;
  const { verb, args, rest } = parseCommandLine(line);
  const ok = (message, data) => ({ ok: true, message, data });
  const err = (message) => ({ ok: false, message });
  try {
    switch (verb) {
      case "":
        return err('Empty command. Try "help".');
      case "show":
        if (ctx.setVisible) ctx.setVisible(true);
        if (ctx.player && ctx.player.play) ctx.player.play();
        return ok("Avatar shown.");
      case "hide":
        if (ctx.setVisible) ctx.setVisible(false);
        if (ctx.player && ctx.player.pause) ctx.player.pause();
        return ok("Avatar hidden.");
      case "toggle": {
        const current = ctx.getVisible ? ctx.getVisible() : true;
        const next = !current;
        if (ctx.setVisible) ctx.setVisible(next);
        if (ctx.player) {
          if (next && ctx.player.play) ctx.player.play();
          else if (!next && ctx.player.pause) ctx.player.pause();
        }
        return ok(`Avatar ${next ? "shown" : "hidden"}.`);
      }
      case "action": {
        const actions = ctx.getActions ? ctx.getActions() : [];
        if (!args[0]) return err("Usage: action <id|index>");
        const id2 = resolveActionId(actions, args[0]);
        if (!id2) return err(`No action matches "${args[0]}".`);
        if (ctx.triggerAction) ctx.triggerAction(id2);
        return ok(`Action "${id2}" triggered.`, { id: id2 });
      }
      case "actions": {
        const actions = ctx.getActions ? ctx.getActions() : [];
        const data = actions.map((a, i) => ({ index: i + 1, id: a.id, name: a.name }));
        const msg = data.length ? data.map((a) => `${a.index}) ${a.name} — id=${a.id}`).join("\n") : "No actions available.";
        return ok(msg, data);
      }
      case "info": {
        const actions = ctx.getActions ? ctx.getActions() : [];
        const info = {
          visible: ctx.getVisible ? ctx.getVisible() : void 0,
          talking: ctx.player && ctx.player.animationController ? !!ctx.player.animationController.isTalking : void 0,
          actions: actions.map((a, i) => ({ index: i + 1, id: a.id, name: a.name }))
        };
        if (ctx.onInfo) ctx.onInfo(info);
        return ok("Player info.", info);
      }
      case "speed": {
        if (!args[0]) return err("Usage: speed <idle> [talk]");
        const idle = parseFloat(args[0]);
        if (Number.isNaN(idle)) return err("Invalid idle speed.");
        const talk = args[1] != null && !Number.isNaN(parseFloat(args[1])) ? parseFloat(args[1]) : idle;
        const ctrl = ctx.player && ctx.player.animationController;
        if (ctrl) {
          if (ctrl.setIdleSpeed) ctrl.setIdleSpeed(idle);
          if (ctrl.setTalkSpeed) ctrl.setTalkSpeed(talk);
        }
        if (ctx.setSpeeds) ctx.setSpeeds(idle, talk);
        return ok(`Speed set: idle=${idle}, talk=${talk}.`, { idle, talk });
      }
      case "sensitivity": {
        const v = parseFloat(args[0]);
        if (Number.isNaN(v)) return err("Usage: sensitivity <0..1>");
        const clamped = Math.max(0, Math.min(1, v));
        if (ctx.setSensitivity) ctx.setSensitivity(clamped);
        return ok(`Sensitivity set to ${clamped}.`, { sensitivity: clamped });
      }
      case "mute":
        if (ctx.setMuted) ctx.setMuted(true);
        return ok("Microphone muted.");
      case "unmute":
        if (ctx.setMuted) ctx.setMuted(false);
        return ok("Microphone unmuted.");
      case "tts": {
        if (!rest) return err("Usage: tts <text>");
        if (ctx.speak) ctx.speak(rest, { cancelPrevious: true });
        else return err("No TTS handler wired.");
        return ok("Speaking.", { text: rest });
      }
      case "ask":
      case "provider": {
        if (!rest) return err(`Usage: ${verb} <text>`);
        if (ctx.ask) {
          ctx.ask(rest);
          return ok("Asked.", { text: rest });
        }
        return err("No chatbot/LLM handler wired.");
      }
      case "flow": {
        if (!args[0]) return err("Usage: flow <nodeId>");
        if (ctx.flowGoto) {
          ctx.flowGoto(args[0]);
          return ok(`Flow jumped to "${args[0]}".`, { nodeId: args[0] });
        }
        return err("No flow engine wired.");
      }
      case "wake":
      case "assistant":
        if (ctx.triggerWake) {
          ctx.triggerWake();
          return ok("Wake pipeline triggered.");
        }
        return err("No wake handler wired.");
      case "stop":
        if (ctx.stopSpeaking) ctx.stopSpeaking();
        return ok("Stopped.");
      case "help":
        return ok(helpText(), COMMAND_LIST);
      default:
        return err(`Unknown command "${verb}". Try "help".`);
    }
  } catch (e) {
    logger.warn("[commands] executeCommand failed:", e);
    return err(`Command error: ${e && e.message ? e.message : e}`);
  }
};
const installPostMessageControl = (ctx, options = {}) => {
  if (typeof window === "undefined") return () => {
  };
  const origins = options.origins || [];
  const allowAll = origins.includes("*");
  const handler = (event) => {
    const data = event && event.data;
    if (!data || data.source !== "ania" || typeof data.cmd !== "string") return;
    if (!allowAll && origins.length > 0 && !origins.includes(event.origin)) {
      (ctx.logger || console).warn(
        `[commands] postMessage from disallowed origin "${event.origin}" ignored.`
      );
      return;
    }
    if (!allowAll && origins.length === 0) {
      (ctx.logger || console).warn(
        "[commands] postMessage control received but no origins allowlisted; ignoring."
      );
      return;
    }
    const result = executeCommand(data.cmd, ctx);
    if (options.onResult) options.onResult(result, event);
    if (event.source && typeof event.source.postMessage === "function" && event.origin && event.origin !== "null") {
      try {
        event.source.postMessage(
          { source: "ania-reply", cmd: data.cmd, result },
          event.origin
        );
      } catch (e) {
      }
    }
  };
  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
};
const EMPTY_PLUGINS = [];
const EMPTY_ACTIONS = [];
function flowInputDomType(type) {
  switch (type) {
    case "email":
      return "email";
    case "tel":
      return "tel";
    case "number":
      return "number";
    default:
      return "text";
  }
}
function flowInputMode(type) {
  switch (type) {
    case "email":
      return "email";
    case "tel":
      return "tel";
    case "number":
      return "numeric";
    default:
      return "text";
  }
}
function flowInputAutocomplete(input) {
  if (!input) return "off";
  switch (input.type) {
    case "email":
      return "email";
    case "tel":
      return "tel";
  }
  const key = String(input.key || "").toLowerCase();
  if (/mail/.test(key)) return "email";
  if (/phone|whats|tel|cel|fone/.test(key)) return "tel";
  if (/name|nome/.test(key)) return "name";
  return "on";
}
const AvatarChatbot = ({
  avatarUrl,
  avatarPassword,
  avatarData,
  authToken,
  webhookUrl,
  position = "bottom-right",
  width = 400,
  height = 300,
  transparent = false,
  theme = "dark",
  // How the avatar bitmap fits its stage (contain/cover/fill) — forwarded to the
  // inner AniaAvatar so a host (e.g. the site avatar tuned on /test-avatar) can
  // pin the framing it chose.
  fit = "contain",
  // Minimized framing: false (default) = whole avatar, smaller (no crop);
  // true = classic cropped badge. Forwarded to the inner AniaAvatar.
  cropMinimized = false,
  enableTTS = true,
  autoGreeting = true,
  // undefined = inherit the file's authored speed (creator intent); a number is
  // an explicit override. See AniaAvatar's speed-precedence note.
  idleSpeed = void 0,
  talkSpeed = void 0,
  autoCalculateSpeed = true,
  showSpeedControls = false,
  startMinimized = false,
  preserveQuality = true,
  /** Força o avatar sempre acima de todos os outros elementos (default: true) */
  alwaysOnTop = true,
  talkStartDelay = 0,
  postTalkDelay = 1500,
  minTalkDuration = 800,
  minIdleDuration = 400,
  ttsVoice = "auto",
  ttsGender = "auto",
  ttsRate = 1,
  ttsPitch = 1,
  ttsLang = "pt-BR",
  ttsProvider = "browser",
  ttsApiKey = null,
  ttsApiUrl = null,
  ttsVoiceId = null,
  ttsModel = null,
  // ---- Streaming / chunked TTS ----
  // When true (default), a long reply is split at sentence boundaries and
  // spoken sentence-by-sentence through a queue: the first sentence starts
  // fast and the next is synthesized while the current one plays. Set false to
  // fall back to one-shot whole-text synthesis (legacy behavior).
  ttsChunking = true,
  // Pause inserted between spoken chunks, in milliseconds. The audio already
  // carries each sentence's trailing silence, so this is just a short breath.
  chunkGapMs = 250,
  // Optional: hard-wrap chunks longer than this many chars (0 = off) so a
  // comma-spliced run-on still streams.
  maxChunkChars = 0,
  // Cap ONLY the first spoken chunk (chars) so the very first synthesis is
  // short and speech starts fast; the rest streams behind it (0 = off).
  firstChunkMaxChars = 100,
  enableSTT = false,
  sttProvider = "browser",
  sttLang = "pt-BR",
  sttContinuous = false,
  sttInterimResults = true,
  sttApiKey = null,
  sttApiUrl = null,
  sttAutoSend = true,
  transparentChat = false,
  // New props
  assistantName = "Assistant",
  userName = "You",
  enableAttachments = false,
  // i18n: locale for built-in UI strings (greetings, button titles, aria/labels).
  // Defaults to 'pt-BR' to preserve the library's original wording. Pass any
  // BCP-47 code shipped under src/i18n/strings (en, es, fr, ja, ...). Unknown
  // codes fall back to the base language, then to English.
  locale = "pt-BR",
  // Consumer override table { key: string | string[] } — supply your own copy
  // for any built-in string without forking the component (e.g.
  // { "chat.enableSound": "Turn on sound", greetings: ["Hey!"] }).
  messagesOverride = null,
  // n8n authentication
  webhookApiKey = null,
  webhookHeaders = {},
  // Client-side responder override. When provided, the chat calls this instead
  // of POSTing to webhookUrl — receives (message, metadata), returns the reply
  // (a string, or an object with { message, attachments?, action? }). Use it for
  // a fake/mock provider, local testing, or a custom AI client. No webhookUrl
  // required. See useChatbot.
  onSendMessage,
  // Lip sync props
  lipSyncEnabled = false,
  lipSyncServerUrl = null,
  lipSyncIntensity = 0.6,
  lipSyncResponsiveness = 0.5,
  lipSyncSustainStyle = null,
  lipSyncWiggleSpeed = null,
  // Action frame props
  actions = null,
  enableActionHotkeys = true,
  // Initial action props
  initialAction = null,
  initialActionLoop = false,
  // Piper TTS props
  piperModelUrl = null,
  piperModelConfigUrl = null,
  piperPitch = 1,
  piperSpeed = 1,
  // When true, the ~84 MB onnx model + WASM are fetched eagerly at mount
  // (instant first voice, but every page load pays the download). Default
  // false = lazy: the model is fetched only when the user first opens the
  // chat, keeping it off the page-load critical path.
  piperPreload = false,
  // ---- Plugin architecture ----
  // Consumer-supplied custom plugins (custom TTS/STT/action/integration). The
  // library built-ins are always registered; these are added on top and can
  // override a built-in by reusing its id.
  plugins = null,
  // Force the active provider for a subsystem by plugin id. When null, the
  // legacy ttsProvider/sttProvider props select the built-in provider.
  activeTtsPlugin = null,
  activeSttPlugin = null,
  // Receives the PluginRegistry once it's ready (escape hatch for advanced use).
  onPluginsReady = null,
  // ---- Wake word ----
  wakeWordEnabled = false,
  wakeWordModelUrl = null,
  wakeWordThreshold = 0.5,
  wakeWordWasmPaths = void 0,
  onWake = null,
  // ---- External control (postMessage) ----
  enablePostMessageControl = false,
  postMessageOrigins = null,
  // ---- NO-AI bubble/balloon flow engine ----
  // A deterministic decision-tree flow. When set, the avatar speaks each node's
  // prompt and the user answers by tapping clickable bubbles (no LLM until an
  // explicit escalation). Omit it and behavior is identical to today.
  flow = null,
  // Optional URL to fetch a flow JSON from (ignored when `flow` is supplied).
  flowUrl = null,
  // Opaque app/tenant id forwarded to capture/escalation callbacks (for CRM).
  appId = null,
  // Fired on every captured answer: ({ sessionId, appId, key, value, collected }).
  onFlowCapture = null,
  // Fired when the flow escalates: ({ collected, contact, sessionId, transcript }).
  // Defaults to forwarding an escalation message to the webhook (sendMessage).
  onFlowEscalate = null,
  // Known-user fields pre-seeded into the flow's `collected` (e.g. { name, email }
  // from the host app's auth/session) so the chat already knows a signed-in user.
  initialContext = null,
  // Persist { sessionId, collected, currentNodeId } to localStorage so a
  // returning visitor in the same browser is remembered (default true).
  persist = true,
  // Override the localStorage key (default `ania-flow-<appId|flowId>`).
  persistKey = null,
  // A `collected` key gating persistence (LGPD): nothing is written until
  // `collected[consentKey]` is truthy. Unset = host owns its own consent gating.
  flowConsentKey = null,
  onClose
}) => {
  var _a, _b;
  const tr2 = useMemo(
    () => createTranslator(locale, messagesOverride || void 0),
    [locale, messagesOverride]
  );
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id2 = "ania-flow-keyframes";
    if (document.getElementById(id2)) return;
    const style = document.createElement("style");
    style.id = id2;
    style.textContent = "@keyframes ania-flow-pop{0%{opacity:0;transform:translateY(8px) scale(0.96);}100%{opacity:1;transform:translateY(0) scale(1);}}.ania-flow-bubble{transition:transform .15s ease,box-shadow .15s ease,filter .15s ease;}.ania-flow-bubble:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.22);filter:brightness(1.04);}.ania-flow-bubble:active{transform:translateY(0) scale(0.98);}@keyframes ania-msg-in{0%{opacity:0;transform:translateY(6px);}100%{opacity:1;transform:translateY(0);}}.ania-msg-in{animation:ania-msg-in .22s cubic-bezier(0.22,1,0.36,1) both;}.ania-chat-scroll{scrollbar-width:thin;scrollbar-color:rgba(100,116,139,0.35) transparent;overscroll-behavior:contain;}.ania-chat-scroll::-webkit-scrollbar{width:6px;}.ania-chat-scroll::-webkit-scrollbar-track{background:transparent;}.ania-chat-scroll::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.35);border-radius:999px;}.ania-chat-input{transition:border-color .15s ease,box-shadow .15s ease;}.ania-chat-input:focus{border-color:#6366f1 !important;box-shadow:0 0 0 3px rgba(99,102,241,0.18) !important;}.ania-chat-iconbtn{transition:transform .12s ease,box-shadow .12s ease,background-color .12s ease;}.ania-chat-iconbtn:not(:disabled):hover{transform:translateY(-1px);}.ania-chat-iconbtn:not(:disabled):active{transform:scale(0.94);}@media (prefers-reduced-motion: reduce){.ania-msg-in,.ania-flow-bubble{animation:none !important;}.ania-flow-bubble,.ania-chat-iconbtn{transition:none !important;}}";
    document.head.appendChild(style);
  }, []);
  const [inputMessage, setInputMessage] = useState("");
  const [avatarRef, setAvatarRef] = useState(null);
  const [systemMessages, setSystemMessages] = useState([]);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [currentIdleSpeed, setCurrentIdleSpeed] = useState(idleSpeed);
  const [currentTalkSpeed, setCurrentTalkSpeed] = useState(talkSpeed);
  useEffect(() => {
    if (typeof idleSpeed === "number") setCurrentIdleSpeed(idleSpeed);
  }, [idleSpeed]);
  useEffect(() => {
    if (typeof talkSpeed === "number") setCurrentTalkSpeed(talkSpeed);
  }, [talkSpeed]);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [isCurrentlyMinimized, setIsCurrentlyMinimized] = useState(startMinimized);
  const [attachments, setAttachments] = useState([]);
  const [flowInputValue, setFlowInputValue] = useState("");
  const [fetchedFlow, setFetchedFlow] = useState(null);
  const messagesEndRef = useRef(null);
  const flowQuestionRef = useRef(null);
  const hasGreetedRef = useRef(false);
  const speakRef = useRef(null);
  const greetingPendingRef = useRef(null);
  const previousMinimizedRef = useRef(startMinimized);
  const sttTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const sttRestartTimeoutRef = useRef(null);
  const piperPreloadedRef = useRef(false);
  const speakFnRef = useRef(null);
  const cancelTtsRef = useRef(null);
  const sendMessageRef = useRef(null);
  const flowGotoRef = useRef(null);
  const pluginsApi = usePlugins({
    plugins: plugins || EMPTY_PLUGINS,
    activeTts: activeTtsPlugin || TTS_PROVIDER_TO_PLUGIN[ttsProvider] || null,
    activeStt: activeSttPlugin || STT_PROVIDER_TO_PLUGIN[sttProvider] || null
  });
  const pluginRegistry = pluginsApi.registry;
  useEffect(() => {
    if (onPluginsReady) onPluginsReady(pluginRegistry);
  }, [onPluginsReady, pluginRegistry]);
  const ensurePiperPreload = useCallback(() => {
    if (piperPreloadedRef.current) return;
    if (!enableTTS || ttsProvider !== "piper" || !piperModelUrl) return;
    if (typeof window === "undefined") return;
    piperPreloadedRef.current = true;
    preloadPiper(piperModelUrl, piperModelConfigUrl).catch((err) => {
      console.warn("[AvatarChatbot] Piper preload failed (will retry on demand):", err);
    });
  }, [enableTTS, ttsProvider, piperModelUrl, piperModelConfigUrl]);
  useEffect(() => {
    if (!piperPreload) return;
    if (typeof window === "undefined") return;
    if (typeof window.requestIdleCallback === "function") {
      const id22 = window.requestIdleCallback(ensurePiperPreload, { timeout: 2e3 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id22);
    }
    const id2 = window.setTimeout(ensurePiperPreload, 0);
    return () => window.clearTimeout(id2);
  }, [piperPreload, ensurePiperPreload]);
  const lipSyncConnectRef = useRef(null);
  const { isTalking, speak, cancel } = useTTSDetection({
    pauseThreshold: 350,
    idleTransitionDelay: postTalkDelay,
    talkStartDelay,
    minTalkDuration,
    minIdleDuration,
    onTalkStart: () => {
    },
    onTalkEnd: () => {
    },
    ttsProvider,
    ttsChunking,
    chunkGapMs,
    maxChunkChars,
    firstChunkMaxChars,
    onChunkAudio: (audioEl) => {
      if (lipSyncEnabled && lipSyncConnectRef.current && audioEl) {
        lipSyncConnectRef.current(audioEl);
      }
    },
    ttsConfig: {
      ttsApiKey,
      ttsApiUrl,
      ttsVoiceId,
      ttsModel,
      ttsLang,
      ttsGender,
      ttsRate,
      ttsPitch,
      piperModelUrl,
      piperModelConfigUrl,
      piperPitch,
      piperSpeed
    }
  });
  const lipSync = useLipSync({ enabled: lipSyncEnabled && ttsProvider !== "browser" });
  useEffect(() => {
    lipSyncConnectRef.current = lipSync.connectAudioElement;
  }, [lipSync.connectAudioElement]);
  const animationController = ((_b = (_a = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a.current) == null ? void 0 : _b.animationController) || null;
  const { activeAction, availableActions, triggerAction: triggerActionFrame, cancelAction: cancelActionFrame } = useActionFrames({
    actions: actions || EMPTY_ACTIONS,
    enabled: isAvatarLoaded,
    enableHotkeys: enableActionHotkeys,
    animationController,
    onActionStart: void 0,
    onActionEnd: void 0
  });
  const {
    isListening,
    transcript: sttTranscript,
    interimTranscript,
    startListening,
    stopListening,
    clearTranscript
  } = useSpeechRecognition({
    sttProvider,
    sttLang,
    sttContinuous: true,
    sttInterimResults,
    sttApiKey,
    sttApiUrl,
    onTranscriptChange: (text, isFinal) => {
      if (!isFinal && sttInterimResults) {
        setInputMessage(text);
      }
    },
    onFinalTranscript: (text) => {
      setInputMessage(text);
      if (sttAutoSend && text.trim()) {
        if (sttTimeoutRef.current) {
          clearTimeout(sttTimeoutRef.current);
        }
        sttTimeoutRef.current = setTimeout(() => {
          if (text.trim()) {
            handleSendWithText(text.trim());
            clearTranscript();
          }
        }, 800);
      }
    },
    onEnd: () => {
      if (enableSTT && isListening) {
        if (sttRestartTimeoutRef.current) {
          clearTimeout(sttRestartTimeoutRef.current);
        }
        sttRestartTimeoutRef.current = setTimeout(() => {
          startListening();
        }, 300);
      }
    },
    onError: (error2) => {
      if (error2.message !== "no-speech" && error2.message !== "aborted") {
        setSystemMessages((prev) => [
          ...prev,
          {
            id: "error-" + Date.now(),
            role: "assistant",
            content: tr2.t("chat.stt.heardError"),
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            isError: true
          }
        ]);
      }
      if (enableSTT && isListening) {
        if (sttRestartTimeoutRef.current) {
          clearTimeout(sttRestartTimeoutRef.current);
        }
        sttRestartTimeoutRef.current = setTimeout(() => {
          startListening();
        }, 500);
      }
    }
  });
  useEffect(() => {
    speakRef.current = speak;
    speakFnRef.current = speak;
    cancelTtsRef.current = cancel;
  }, [speak, cancel]);
  useEffect(() => {
    if (enableTTS && !ttsEnabled && isAvatarLoaded && !isCurrentlyMinimized) {
      const timer = setTimeout(() => {
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("");
          window.speechSynthesis.speak(utterance);
        }
        setTtsEnabled(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAvatarLoaded, isCurrentlyMinimized, enableTTS, ttsEnabled]);
  useEffect(() => {
    if (isListening && interimTranscript) {
      setInputMessage(interimTranscript);
    }
  }, [interimTranscript, isListening]);
  const handleMicToggle = async () => {
    if (isListening) {
      stopListening();
    } else {
      clearTranscript();
      const success = await startListening();
      if (!success) {
        setSystemMessages((prev) => [
          ...prev,
          {
            id: "error-" + Date.now(),
            role: "assistant",
            content: tr2.t("chat.stt.micAccessError"),
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            isError: true
          }
        ]);
      }
    }
  };
  const selectVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    if (ttsVoice && ttsVoice !== "auto") {
      const voice = voices.find((v) => v.name === ttsVoice);
      if (voice) {
        return voice;
      }
    }
    let filteredVoices = voices.filter((v) => v.lang.startsWith(ttsLang.split("-")[0]));
    if (filteredVoices.length === 0) {
      filteredVoices = voices.filter((v) => v.lang.startsWith("en"));
    }
    if (ttsGender !== "auto") {
      const genderKeywords = {
        male: ["male", "macho", "homem", "masculino", "masculina", "carlos", "pedro", "daniel", "man", "david", "mark", "wavenet-b", "wavenet-d", "standard-b", "standard-d"],
        female: ["female", "mulher", "feminino", "feminina", "maria", "ana", "lucia", "woman", "samantha", "victoria", "zira", "wavenet-a", "wavenet-c", "standard-a", "standard-c"]
      };
      const keywords = genderKeywords[ttsGender] || [];
      const oppositeKeywords = genderKeywords[ttsGender === "male" ? "female" : "male"] || [];
      const genderVoices = filteredVoices.filter(
        (v) => keywords.some((keyword) => v.name.toLowerCase().includes(keyword))
      );
      if (genderVoices.length > 0) {
        filteredVoices = genderVoices;
      } else {
        const nonOppositeVoices = filteredVoices.filter(
          (v) => !oppositeKeywords.some((keyword) => v.name.toLowerCase().includes(keyword))
        );
        if (nonOppositeVoices.length > 0) {
          filteredVoices = nonOppositeVoices;
        }
      }
      const localVoices = filteredVoices.filter((v) => v.localService);
      if (localVoices.length > 0) {
        filteredVoices = localVoices;
      }
    }
    return filteredVoices[0] || voices[0];
  }, [ttsVoice, ttsGender, ttsLang]);
  const handleEnableSound = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(utterance);
    }
    setTtsEnabled(true);
  };
  const handleMinimizeToggle = (isMinimized) => {
    setIsCurrentlyMinimized(isMinimized);
    if (!isMinimized) {
      ensurePiperPreload();
    }
    if (!isMinimized && previousMinimizedRef.current && enableTTS && !ttsEnabled && isAvatarLoaded) {
      handleEnableSound();
    }
    previousMinimizedRef.current = isMinimized;
  };
  const { messages, sendMessage, isLoading, error } = useChatbot({
    webhookUrl,
    webhookApiKey,
    webhookHeaders,
    onSendMessage,
    availableActions,
    // Localize the friendly fallback copy (chat.error.generic) shown on failure.
    translate: tr2.t,
    onActionTriggered: (actionId) => {
      if (triggerActionFrame) triggerActionFrame(actionId);
    },
    onResponse: (botMessage) => {
      if (enableTTS && ttsEnabled && botMessage.content) {
        speak(botMessage.content, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }
    },
    onError: (err, friendlyMessage) => {
      if (enableTTS && ttsEnabled && friendlyMessage && speakRef.current) {
        speakRef.current(friendlyMessage, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }
    }
  });
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);
  useEffect(() => {
    if (flow || !flowUrl || typeof fetch === "undefined") return;
    let cancelled = false;
    fetch(flowUrl).then((r) => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))).then((def) => {
      if (!cancelled) setFetchedFlow(def);
    }).catch((err) => console.warn("[AvatarChatbot] flowUrl fetch failed:", err));
    return () => {
      cancelled = true;
    };
  }, [flow, flowUrl]);
  const activeFlow = flow || fetchedFlow;
  const flowSpeak = useCallback((text, opts) => {
    if (!enableTTS || !ttsEnabled || !speakFnRef.current || !text) return;
    speakFnRef.current(text, {
      lang: ttsLang,
      rate: ttsRate,
      pitch: ttsPitch,
      voice: selectVoice(),
      cancelPrevious: true,
      ...opts
    });
  }, [enableTTS, ttsEnabled, ttsLang, ttsRate, ttsPitch, selectVoice]);
  const flow_ = useFlowEngine(activeFlow, {
    speak: flowSpeak,
    sendMessage: (text, meta) => {
      if (sendMessageRef.current) sendMessageRef.current(text, meta);
    },
    appId,
    lang: ttsLang,
    translate: tr2.t,
    initialContext: initialContext || void 0,
    persist,
    persistKey: persistKey || void 0,
    consentKey: flowConsentKey || void 0,
    onCapture: onFlowCapture || void 0,
    onEscalate: onFlowEscalate || void 0,
    // Append each entered node's (resolved) prompt to the visible transcript so
    // the chat shows the running conversation, not just the current bubbles.
    onPrompt: (text) => {
      if (!text) return;
      setSystemMessages((prev) => [
        ...prev,
        {
          id: "flow-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
          role: "assistant",
          content: text,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          isFlowPrompt: true
        }
      ]);
    }
  });
  useEffect(() => {
    flowGotoRef.current = flow_.goto;
  }, [flow_.goto]);
  const flowNodeId = flow_.currentNode ? flow_.currentNode.id : null;
  useEffect(() => {
    setFlowInputValue("");
  }, [flowNodeId]);
  const handleFlowInputSubmit = useCallback(() => {
    if (!flow_.currentInput) return;
    const res = flow_.submitInput(flowInputValue);
    if (res && res.ok) setFlowInputValue("");
  }, [flow_, flowInputValue]);
  const handleFlowInputSkip = useCallback(() => {
    const input = flow_.currentInput;
    if (!input || !input.optionalSkip) return;
    setFlowInputValue("");
    if (input.next != null) flow_.goto(input.next);
  }, [flow_]);
  const buildFlowMetadata = useCallback(() => {
    if (!activeFlow) return {};
    return {
      sessionId: flow_.sessionId,
      appId,
      collected: flow_.collected,
      flowId: activeFlow.id
    };
  }, [activeFlow, flow_.sessionId, flow_.collected, appId]);
  const buildCommandCtx = useCallback(() => {
    var _a2;
    return {
      player: ((_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) || null,
      getActions: () => availableActions.map((a) => ({ id: a.id, name: a.name })),
      triggerAction: (id2) => {
        if (triggerActionFrame) triggerActionFrame(id2);
      },
      cancelAction: () => {
        if (cancelActionFrame) cancelActionFrame();
      },
      setSpeeds: (idle, talk) => {
        handleIdleSpeedChange(idle);
        handleTalkSpeedChange(talk);
      },
      setVisible: (v) => setIsCurrentlyMinimized(!v),
      getVisible: () => !isCurrentlyMinimized,
      speak: (text, opts) => {
        if (speakFnRef.current) {
          speakFnRef.current(text, {
            lang: ttsLang,
            rate: ttsRate,
            pitch: ttsPitch,
            voice: selectVoice(),
            cancelPrevious: true,
            ...opts
          });
        }
      },
      ask: (text) => {
        if (sendMessageRef.current) sendMessageRef.current(text);
      },
      stopSpeaking: () => {
        if (cancelTtsRef.current) cancelTtsRef.current();
      },
      triggerWake: () => {
        if (onWake) onWake();
        else if (wakeTriggerRef.current) wakeTriggerRef.current();
      },
      flowGoto: (nodeId) => {
        if (flowGotoRef.current) flowGotoRef.current(nodeId);
      },
      logger: console
    };
  }, [avatarRef, availableActions, triggerActionFrame, cancelActionFrame, isCurrentlyMinimized, ttsLang, ttsRate, ttsPitch, selectVoice, onWake]);
  useCallback((line) => executeCommand(line, buildCommandCtx()), [buildCommandCtx]);
  const wakeTriggerRef = useRef(null);
  useEffect(() => {
    wakeTriggerRef.current = () => {
      setIsCurrentlyMinimized(false);
      ensurePiperPreload();
    };
  }, [ensurePiperPreload]);
  useWakeWord({
    enabled: wakeWordEnabled && !!wakeWordModelUrl,
    modelUrl: wakeWordModelUrl,
    threshold: wakeWordThreshold,
    wasmPaths: wakeWordWasmPaths,
    onWake: () => {
      if (onWake) onWake();
      else if (wakeTriggerRef.current) wakeTriggerRef.current();
    },
    onError: (err) => console.warn("[AvatarChatbot] Wake word error:", err)
  });
  useEffect(() => {
    if (!enablePostMessageControl) return;
    const uninstall = installPostMessageControl(buildCommandCtx(), {
      origins: postMessageOrigins || []
    });
    return uninstall;
  }, [enablePostMessageControl, postMessageOrigins, buildCommandCtx]);
  useEffect(() => {
    if (!autoGreeting || hasGreetedRef.current || !isAvatarLoaded) return;
    if (activeFlow) {
      hasGreetedRef.current = true;
      return;
    }
    const greetings2 = tr2.list("greetings");
    const randomGreeting = greetings2[Math.floor(Math.random() * greetings2.length)];
    greetingPendingRef.current = randomGreeting;
    const timer = setTimeout(() => {
      hasGreetedRef.current = true;
      setSystemMessages([{
        id: "greeting-" + Date.now(),
        role: "assistant",
        content: randomGreeting,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }]);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [autoGreeting, isAvatarLoaded, activeFlow]);
  useEffect(() => {
    if (ttsEnabled && greetingPendingRef.current && speakRef.current && !isCurrentlyMinimized) {
      const greetingText = greetingPendingRef.current;
      greetingPendingRef.current = null;
      setTimeout(() => {
        speakRef.current(greetingText, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }, 500);
    }
  }, [ttsEnabled, isCurrentlyMinimized]);
  const allMessages = [...systemMessages, ...messages];
  const flowNode = activeFlow ? flow_.currentNode : null;
  const flowNodeActive = !!(flowNode && (flow_.currentInput || flow_.visibleOptions.length > 0));
  const lastFlowPromptText = useMemo(() => {
    for (let i = allMessages.length - 1; i >= 0; i--) {
      if (allMessages[i] && allMessages[i].isFlowPrompt) return allMessages[i].content;
    }
    return "";
  }, [allMessages]);
  const flowQuestionText = flowNodeActive ? flow_.currentPrompt || lastFlowPromptText || "" : "";
  const lastFlowPromptId = useMemo(() => {
    if (!flowNodeActive) return null;
    for (let i = allMessages.length - 1; i >= 0; i--) {
      if (allMessages[i] && allMessages[i].isFlowPrompt) return allMessages[i].id;
    }
    return null;
  }, [allMessages, flowNodeActive]);
  const transcriptMessages = lastFlowPromptId != null ? allMessages.filter((m) => m.id !== lastFlowPromptId) : allMessages;
  const flowNodeId2 = flowNode ? flowNode.id : null;
  useEffect(() => {
    if (flowNodeActive) return;
    var _a2;
    (_a2 = messagesEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, flowNodeActive]);
  useEffect(() => {
    if (!flowNodeActive) return;
    var _a2;
    (_a2 = flowQuestionRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [flowNodeId2, flowNodeActive]);
  useEffect(() => {
    var _a2, _b2;
    if (!((_b2 = (_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) == null ? void 0 : _b2.animationController)) {
      return;
    }
    const controller = avatarRef.playerRef.current.animationController;
    if (controller.isTalking === isTalking) {
      return;
    }
    controller.setTalkingState(isTalking);
  }, [isTalking, avatarRef]);
  const isTalkingLiveRef = useRef(isTalking);
  useEffect(() => {
    isTalkingLiveRef.current = isTalking;
  }, [isTalking]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const resync = () => {
      var _a2, _b2;
      if (document.hidden) return;
      const controller = (_b2 = (_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) == null ? void 0 : _b2.animationController;
      if (!controller) return;
      try {
        controller.setTalkingState(isTalkingLiveRef.current);
      } catch (e) {
      }
    };
    document.addEventListener("visibilitychange", resync);
    return () => document.removeEventListener("visibilitychange", resync);
  }, [avatarRef]);
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newAttachments.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          type: file.type,
          size: file.size,
          preview: file.type.startsWith("image/") ? event.target.result : null,
          data: event.target.result
        });
        if (newAttachments.length === files.length) {
          setAttachments((prev) => [...prev, ...newAttachments]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const removeAttachment = (id2) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id2));
  };
  const handleSendWithText = async (text) => {
    if (!text.trim() || isLoading) return;
    const message = text.trim();
    const currentAttachments = [...attachments];
    setAttachments([]);
    const waitingList = tr2.list("waiting");
    const randomWaiting = waitingList[Math.floor(Math.random() * waitingList.length)];
    let waitingShown = false;
    let waitingMsgId = null;
    const waitingTimer = setTimeout(() => {
      if (isLoading) {
        waitingShown = true;
        waitingMsgId = "waiting-" + Date.now();
        setSystemMessages((prev) => [...prev, {
          id: waitingMsgId,
          role: "assistant",
          content: randomWaiting,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          isWaiting: true
        }]);
        if (enableTTS && ttsEnabled && speakRef.current) {
          speakRef.current(randomWaiting, { lang: ttsLang });
        }
      }
    }, 500);
    await sendMessage(message, {
      ...buildFlowMetadata(),
      attachments: currentAttachments.map((a) => ({
        name: a.name,
        type: a.type,
        size: a.size,
        data: a.data
      }))
    });
    clearTimeout(waitingTimer);
    if (waitingShown && waitingMsgId) {
      setSystemMessages((prev) => prev.filter((msg) => msg.id !== waitingMsgId));
    }
  };
  const handleSend = async () => {
    if (!inputMessage.trim() && attachments.length === 0 || isLoading) return;
    const message = inputMessage.trim();
    const currentAttachments = [...attachments];
    setInputMessage("");
    setAttachments([]);
    const waitingList = tr2.list("waiting");
    const randomWaiting = waitingList[Math.floor(Math.random() * waitingList.length)];
    let waitingShown = false;
    let waitingMsgId = null;
    const waitingTimer = setTimeout(() => {
      if (isLoading) {
        waitingShown = true;
        waitingMsgId = "waiting-" + Date.now();
        setSystemMessages((prev) => [...prev, {
          id: waitingMsgId,
          role: "assistant",
          content: randomWaiting,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          isWaiting: true
        }]);
        if (enableTTS && ttsEnabled && speakRef.current) {
          speakRef.current(randomWaiting, { lang: ttsLang });
        }
      }
    }, 500);
    await sendMessage(message, {
      ...buildFlowMetadata(),
      attachments: currentAttachments.map((a) => ({
        name: a.name,
        type: a.type,
        size: a.size,
        data: a.data
      }))
    });
    clearTimeout(waitingTimer);
    if (waitingShown && waitingMsgId) {
      setSystemMessages((prev) => prev.filter((msg) => msg.id !== waitingMsgId));
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleIdleSpeedChange = (speed) => {
    var _a2, _b2;
    setCurrentIdleSpeed(speed);
    if ((_b2 = (_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) == null ? void 0 : _b2.animationController) {
      avatarRef.playerRef.current.animationController.setIdleSpeed(speed);
    }
  };
  const handleTalkSpeedChange = (speed) => {
    var _a2, _b2;
    setCurrentTalkSpeed(speed);
    if ((_b2 = (_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) == null ? void 0 : _b2.animationController) {
      avatarRef.playerRef.current.animationController.setTalkSpeed(speed);
    }
  };
  const flowInputElement = flowNodeActive && flow_.currentInput ? jsx("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      paddingTop: "2px"
    },
    children: jsxs("form", {
      onSubmit: (e) => {
        e.preventDefault();
        handleFlowInputSubmit();
      },
      style: { display: "flex", flexDirection: "column", gap: "8px" },
      children: [
        // Visually-hidden label tied to the field (a11y).
        jsx("label", {
          htmlFor: "ania-flow-input",
          style: {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0
          },
          children: flow_.currentInput.placeholder ? flow_.resolveText(flow_.currentInput.placeholder) : tr2.t("chat.flow.submit")
        }),
        flow_.currentInput.type === "textarea" ? jsx("textarea", {
          id: "ania-flow-input",
          name: flow_.currentInput.key || "ania-flow-input",
          value: flowInputValue,
          onChange: (e) => setFlowInputValue(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleFlowInputSubmit();
            }
          },
          rows: 3,
          placeholder: flow_.currentInput.placeholder ? flow_.resolveText(flow_.currentInput.placeholder) : "",
          autoComplete: flowInputAutocomplete(flow_.currentInput),
          style: {
            width: "100%",
            minHeight: "44px",
            padding: "12px 16px",
            borderRadius: "16px",
            border: flow_.inputError ? "2px solid #ef4444" : "2px solid #e5e7eb",
            backgroundColor: flow_.inputError ? "#fef2f2" : "#ffffff",
            fontSize: "16px",
            color: "#1f2937",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
            fontFamily: "inherit",
            boxShadow: "0 4px 12px rgba(0,0,0,0.10)"
          }
        }) : jsx("input", {
          id: "ania-flow-input",
          name: flow_.currentInput.key || "ania-flow-input",
          type: flowInputDomType(flow_.currentInput.type),
          inputMode: flowInputMode(flow_.currentInput.type),
          value: flowInputValue,
          onChange: (e) => setFlowInputValue(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFlowInputSubmit();
            }
          },
          placeholder: flow_.currentInput.placeholder ? flow_.resolveText(flow_.currentInput.placeholder) : "",
          autoComplete: flowInputAutocomplete(flow_.currentInput),
          style: {
            width: "100%",
            minHeight: "44px",
            padding: "12px 16px",
            borderRadius: "24px",
            border: flow_.inputError ? "2px solid #ef4444" : "2px solid #e5e7eb",
            backgroundColor: flow_.inputError ? "#fef2f2" : "#ffffff",
            fontSize: "16px",
            color: "#1f2937",
            outline: "none",
            boxSizing: "border-box",
            boxShadow: "0 4px 12px rgba(0,0,0,0.10)"
          }
        }),
        // Inline validation error. flow_.inputError is ALREADY fully resolved by
        // the engine (i18n key → text, then {var} interpolated from collected),
        // so a flow errorMsg like "…tá estranho, {name}." shows the real name —
        // render it directly (no extra tr.t / interpolation).
        flow_.inputError && jsx("div", {
          style: {
            fontSize: "12px",
            color: "#dc2626",
            padding: "0 8px"
          },
          children: flow_.inputError
        }),
        // Submit + optional "Pular" (skip) row.
        jsxs("div", {
          style: { display: "flex", gap: "8px", flexWrap: "wrap" },
          children: [
            jsx("button", {
              type: "submit",
              className: "ania-flow-bubble",
              style: {
                flex: "1 1 auto",
                minHeight: "44px",
                padding: "11px 18px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "1.2",
                color: "#ffffff",
                background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                WebkitTapHighlightColor: "transparent"
              },
              children: flow_.currentInput.submitLabel ? flow_.resolveText(flow_.currentInput.submitLabel) : tr2.t("chat.flow.submit")
            }),
            flow_.currentInput.optionalSkip && jsx("button", {
              type: "button",
              className: "ania-flow-bubble",
              onClick: handleFlowInputSkip,
              style: {
                minHeight: "44px",
                padding: "11px 18px",
                borderRadius: "20px",
                border: "2px solid #e5e7eb",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "1.2",
                color: "#6b7280",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                WebkitTapHighlightColor: "transparent"
              },
              children: flow_.currentInput.skipLabel ? flow_.resolveText(flow_.currentInput.skipLabel) : flow_.resolveText(tr2.t("chat.flow.skip"))
            })
          ]
        })
      ]
    })
  }) : null;
  const flowOptionsElement = flowNodeActive && !flow_.currentInput && flow_.visibleOptions.length > 0 ? jsx("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      justifyContent: "flex-start",
      paddingTop: "2px"
    },
    children: [
      ...flow_.visibleOptions.map((opt, idx) => {
        const isEscalate = !!opt.escalate;
        return jsx("button", {
          key: "flowopt-" + (opt.value != null ? String(opt.value) : idx),
          className: "ania-flow-bubble",
          onClick: () => flow_.selectOption(opt),
          style: {
            flex: "0 1 auto",
            maxWidth: "100%",
            minHeight: "44px",
            padding: "11px 18px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "1.25",
            color: "#ffffff",
            whiteSpace: "normal",
            overflowWrap: "anywhere",
            textAlign: "left",
            background: isEscalate ? "linear-gradient(135deg, #f97316 0%, #ef4444 100%)" : "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
            boxShadow: isEscalate ? "0 4px 14px rgba(249,115,22,0.40)" : "0 4px 14px rgba(59,130,246,0.35)",
            animation: `ania-flow-pop .28s ease ${0.04 * idx}s both`,
            WebkitTapHighlightColor: "transparent"
          },
          children: opt.label != null ? flow_.resolveLabel(opt.label) : isEscalate ? tr2.t("chat.flow.escalate") : String(opt.value)
        });
      }),
      // "Voltar" bubble (only when there's history to pop)
      flow_.canGoBack && jsx("button", {
        key: "flow-back",
        className: "ania-flow-bubble",
        onClick: () => flow_.goBack(),
        style: {
          flex: "0 1 auto",
          maxWidth: "100%",
          minHeight: "44px",
          padding: "11px 18px",
          borderRadius: "20px",
          border: "2px solid #e5e7eb",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "1.25",
          color: "#6b7280",
          whiteSpace: "normal",
          overflowWrap: "anywhere",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          animation: "ania-flow-pop .28s ease both",
          WebkitTapHighlightColor: "transparent"
        },
        children: "← " + tr2.t("chat.flow.back")
      })
    ]
  }) : null;
  const flowInteractionRegion = flowNodeActive ? jsxs("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      // Cap the whole region so it + transcript + input bar fit small screens.
      maxHeight: `min(55vh, max(180px, calc(100vh - ${height + 140}px)))`,
      margin: "0 0 4px",
      padding: "10px 12px 4px",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      background: "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0) 100%)",
      boxSizing: "border-box"
    },
    children: [
      // PINNED QUESTION HEADER — prominent, bold, larger; never scrolled away.
      jsxs("div", {
        ref: flowQuestionRef,
        style: {
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          padding: "12px 14px",
          marginBottom: "8px",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(15,23,42,0.14)"
        },
        children: [
          jsx("div", {
            "aria-hidden": "true",
            style: {
              flexShrink: 0,
              marginTop: "2px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#6366f1",
              boxShadow: "0 0 0 4px rgba(99,102,241,0.18)"
            }
          }),
          jsx("div", {
            role: "status",
            "aria-live": "polite",
            style: {
              minWidth: 0,
              flex: "1 1 auto",
              fontSize: "clamp(15px, 4.2vw, 18px)",
              fontWeight: "700",
              lineHeight: "1.35",
              color: "#111827",
              overflowWrap: "anywhere",
              wordBreak: "break-word"
            },
            children: flowQuestionText
          })
        ]
      }),
      // SCROLLABLE ANSWERS — options/input scroll here; the question stays put.
      jsx("div", {
        className: "ania-chat-scroll",
        style: {
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          paddingRight: "2px"
        },
        children: flow_.currentInput ? flowInputElement : flowOptionsElement
      })
    ]
  }) : null;
  return jsx(
    AniaAvatar,
    {
      avatarUrl,
      avatarPassword,
      avatarData,
      authToken,
      position,
      width,
      height,
      transparent,
      theme,
      fit,
      cropMinimized,
      locale,
      messagesOverride,
      minimizable: true,
      closable: true,
      idleSpeed: currentIdleSpeed,
      talkSpeed: currentTalkSpeed,
      autoCalculateSpeed,
      preserveQuality,
      alwaysOnTop,
      startMinimized: startMinimized || !isAvatarLoaded,
      // Lip sync passthrough
      lipSyncEnabled,
      lipSyncServerUrl,
      lipSyncIntensity,
      lipSyncResponsiveness,
      lipSyncSustainStyle,
      lipSyncWiggleSpeed,
      lipSyncHook: lipSyncEnabled ? lipSync : null,
      // Action frames passthrough
      actions,
      enableActionHotkeys,
      // Initial action passthrough
      initialAction,
      initialActionLoop,
      onLoad: (player) => {
        setAvatarRef({ playerRef: { current: player } });
        setIsAvatarLoaded(true);
      },
      onToggleMinimize: handleMinimizeToggle,
      onClose,
      children: jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden"
        },
        children: [
          // ========== ÁREA DE MENSAGENS ==========
          jsxs("div", {
            className: "ania-chat-scroll",
            style: {
              flex: "1 1 auto",
              minHeight: "60px",
              // Growth cap only — when space is tight the flex parent (which is
              // clamped to the viewport) shrinks this area, so the input bar is
              // never pushed off screen. No viewport math needed here.
              maxHeight: flowNodeActive ? "min(220px, 30vh)" : "min(420px, 48vh)",
              overflowY: "auto",
              padding: "14px 14px 6px",
              WebkitOverflowScrolling: "touch",
              overflowX: "hidden"
            },
            children: [
              // Lista de mensagens (transcript). The CURRENT flow question is
              // pinned in its own header below, so it's filtered out here.
              // Messages by the same sender are GROUPED: the name renders once
              // per run and bubbles inside a run sit closer together.
              transcriptMessages.map((msg, idx) => {
                const isUser = msg.role === "user";
                const prev = transcriptMessages[idx - 1];
                const isFirstOfGroup = !prev || prev.role !== msg.role;
                return jsx("div", {
                  key: msg.id,
                  className: "ania-msg-in",
                  style: {
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    marginTop: isFirstOfGroup && idx > 0 ? "14px" : "4px"
                  },
                  children: jsxs("div", {
                    style: { maxWidth: "85%", minWidth: 0 },
                    children: [
                      // Nome do remetente — once per group, quiet label.
                      isFirstOfGroup && jsx("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.01em",
                          marginBottom: "3px",
                          padding: "2px 10px",
                          borderRadius: "999px",
                          display: "inline-block",
                          backgroundColor: "rgba(255,255,255,0.92)",
                          color: "#475569",
                          float: isUser ? "right" : "none"
                        },
                        children: isUser ? userName : assistantName
                      }),
                      // Balão da mensagem
                      jsxs("div", {
                        style: {
                          clear: "both",
                          padding: "11px 15px",
                          borderRadius: "18px",
                          borderBottomLeftRadius: isUser ? "18px" : "5px",
                          borderBottomRightRadius: isUser ? "5px" : "18px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          background: isUser ? "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)" : "#ffffff",
                          color: isUser ? "#ffffff" : "#1f2937",
                          boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
                          overflowWrap: "anywhere",
                          wordBreak: "break-word"
                        },
                        children: [
                          // Attachments
                          msg.attachments && msg.attachments.length > 0 && jsx("div", {
                            style: { marginBottom: "10px", display: "flex", flexWrap: "wrap", gap: "8px" },
                            children: msg.attachments.map(
                              (att, idx2) => att.type && att.type.startsWith("image/") ? jsx("img", {
                                key: idx2,
                                src: att.data || att.preview,
                                alt: att.name,
                                style: { maxWidth: "120px", maxHeight: "80px", borderRadius: "12px", objectFit: "cover" }
                              }) : jsx("span", {
                                key: idx2,
                                style: {
                                  padding: "4px 10px",
                                  borderRadius: "12px",
                                  fontSize: "11px",
                                  backgroundColor: isUser ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                                  color: isUser ? "#ffffff" : "#6b7280"
                                },
                                children: att.name
                              })
                            )
                          }),
                          msg.content
                        ]
                      })
                    ]
                  })
                });
              }),
              // NOTE: the flow QUESTION + answer affordances (option bubbles /
              // typed input) are no longer rendered inside this scrollable
              // transcript. They live in `flowInteractionRegion` below — a
              // sibling that pins the current question at the top and lets only
              // the answers scroll, so the question is never buried (v1.7.1).
              // Loading indicator
              isLoading && jsx("div", {
                className: "ania-msg-in",
                style: { display: "flex", justifyContent: "flex-start", marginTop: "14px" },
                children: jsxs("div", {
                  style: { maxWidth: "80%" },
                  children: [
                    jsx("div", {
                      style: {
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.01em",
                        marginBottom: "3px",
                        padding: "2px 10px",
                        borderRadius: "999px",
                        display: "inline-block",
                        backgroundColor: "rgba(255,255,255,0.92)",
                        color: "#475569"
                      },
                      children: assistantName
                    }),
                    jsx("div", {
                      style: {
                        padding: "13px 15px",
                        borderRadius: "18px",
                        borderBottomLeftRadius: "5px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
                        display: "flex",
                        gap: "5px",
                        width: "fit-content"
                      },
                      children: [
                        jsx("div", { style: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#6366f1", animation: "ania-pulse 1s infinite" } }),
                        jsx("div", { style: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#6366f1", animation: "ania-pulse 1s infinite 0.18s" } }),
                        jsx("div", { style: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#6366f1", animation: "ania-pulse 1s infinite 0.36s" } })
                      ]
                    })
                  ]
                })
              }),
              jsx("div", { ref: messagesEndRef })
            ]
          }),
          // ========== FLOW: QUESTION PINNED + SCROLLABLE ANSWERS ==========
          // Sibling below the transcript. Pins the current question at the top
          // (prominent) and scrolls only the options/input below it (v1.7.1 fix).
          flowInteractionRegion,
          // ========== BOTÃO ENABLE SOUND ==========
          enableTTS && !ttsEnabled && jsx("div", {
            style: { padding: "8px 16px", flexShrink: 0 },
            children: jsxs("button", {
              onClick: handleEnableSound,
              style: {
                width: "100%",
                padding: "14px 20px",
                borderRadius: "16px",
                border: "none",
                backgroundColor: "#f97316",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(249,115,22,0.4)"
              },
              children: [
                jsx(Volume2, { size: 20 }),
                tr2.t("chat.enableSound")
              ]
            })
          }),
          // ========== SPEED CONTROLS ==========
          showSpeedControls && jsx("div", {
            style: {
              margin: "0 16px 12px",
              padding: "14px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              flexShrink: 0
            },
            children: jsxs("div", {
              style: { display: "flex", flexDirection: "column", gap: "10px" },
              children: [
                jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  jsx("span", { style: { fontSize: "12px", color: "#6b7280", width: "40px" }, children: tr2.t("chat.speed.idle") }),
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentIdleSpeed ?? 1, onChange: (e) => handleIdleSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: (currentIdleSpeed ?? 1).toFixed(2) + "x" })
                ] }),
                jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  jsx("span", { style: { fontSize: "12px", color: "#6b7280", width: "40px" }, children: tr2.t("chat.speed.talk") }),
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentTalkSpeed ?? 1, onChange: (e) => handleTalkSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: (currentTalkSpeed ?? 1).toFixed(2) + "x" })
                ] })
              ]
            })
          }),
          // ========== PREVIEW DE ATTACHMENTS ==========
          attachments.length > 0 && jsx("div", {
            style: {
              margin: "0 16px 12px",
              padding: "12px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexWrap: "wrap",
              flexShrink: 0,
              gap: "8px"
            },
            children: attachments.map((att) => jsx("div", {
              key: att.id,
              style: { position: "relative" },
              children: [
                att.preview ? jsx("img", { src: att.preview, alt: att.name, style: { width: "60px", height: "60px", objectFit: "cover", borderRadius: "12px" } }) : jsx("div", { style: { width: "60px", height: "60px", borderRadius: "12px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }, children: jsx(Paperclip, { size: 20, color: "#9ca3af" }) }),
                jsx("button", {
                  onClick: () => removeAttachment(att.id),
                  style: { position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
                  children: jsx(X, { size: 12, color: "#ffffff" })
                })
              ]
            }))
          }),
          // ========== BARRA DE INPUT ==========
          jsxs("div", {
            style: { padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 },
            children: [
              // Botão anexar
              enableAttachments && jsx("button", {
                onClick: () => {
                  var _a2;
                  return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                },
                disabled: isLoading,
                className: "ania-chat-iconbtn",
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.14)"
                },
                children: jsx(Paperclip, { size: 18, color: "#6b7280" })
              }),
              enableAttachments && jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/*,.pdf,.doc,.docx,.txt", onChange: handleFileSelect, style: { display: "none" } }),
              // Input de texto
              jsx("input", {
                id: "ania-chat-input",
                name: "ania-chat-input",
                className: "ania-chat-input",
                type: "text",
                value: inputMessage,
                onChange: (e) => setInputMessage(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: isListening ? tr2.t("chat.input.listening") : tr2.t("chat.input.placeholder"),
                disabled: isLoading,
                style: {
                  flex: "1 1 0%",
                  minWidth: 0,
                  padding: "11px 16px",
                  borderRadius: "999px",
                  border: isListening ? "2px solid #ef4444" : "1.5px solid #e2e8f0",
                  backgroundColor: isListening ? "#fef2f2" : "#ffffff",
                  // 16px prevents iOS Safari from auto-zooming the page on focus.
                  fontSize: "16px",
                  fontFamily: "inherit",
                  color: "#1f2937",
                  outline: "none",
                  boxSizing: "border-box"
                }
              }),
              // Botão mic
              enableSTT && jsx("button", {
                onClick: handleMicToggle,
                disabled: isLoading,
                className: "ania-chat-iconbtn",
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: isListening ? "#ef4444" : "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isListening ? "0 2px 8px rgba(239,68,68,0.45)" : "0 2px 8px rgba(15,23,42,0.14)"
                },
                children: isListening ? jsx(MicOff, { size: 18, color: "#ffffff" }) : jsx(Mic, { size: 18, color: "#6b7280" })
              }),
              // Botão enviar
              jsx("button", {
                onClick: handleSend,
                disabled: !inputMessage.trim() && attachments.length === 0 || isLoading,
                className: "ania-chat-iconbtn",
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  background: !inputMessage.trim() && attachments.length === 0 || isLoading ? "#d1d5db" : "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                  cursor: !inputMessage.trim() && attachments.length === 0 || isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(59,130,246,0.35)"
                },
                children: jsx(Send, { size: 18, color: "#ffffff" })
              }),
              // Indicador TTS falando
              enableTTS && isTalking && jsx("div", {
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(34,197,94,0.4)"
                },
                children: jsx(Volume2, { size: 18, color: "#ffffff" })
              })
            ]
          }),
          // ========== FEEDBACK DE TRANSCRIÇÃO ==========
          isListening && jsx("div", {
            style: {
              margin: "0 12px 8px",
              padding: "8px 12px",
              flexShrink: 0,
              borderRadius: "20px",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: interimTranscript ? "#ef4444" : "#22c55e" } }),
              jsx("span", { style: { color: "#6b7280" }, children: interimTranscript ? tr2.t("chat.stt.transcribing") : tr2.t("chat.stt.micActive") }),
              interimTranscript && jsx("span", { style: { color: "#1f2937", fontWeight: "500" }, children: interimTranscript })
            ]
          }),
          // ========== ERRO ==========
          error && jsx("div", {
            style: {
              margin: "0 12px 8px",
              padding: "8px 12px",
              flexShrink: 0,
              borderRadius: "20px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              fontSize: "12px",
              color: "#dc2626"
            },
            children: error
          })
        ]
      })
    }
  );
};
const SECTIONS = [
  {
    id: "avatar",
    label: "Avatar",
    fields: [
      { key: "avatarUrl", label: "Avatar URL", type: "text", def: "", placeholder: "https://…/avatar.ania" },
      { key: "avatarPassword", label: "Avatar password", type: "password", def: "" },
      { key: "authToken", label: "Auth token (Bearer)", type: "password", def: "" },
      { key: "preserveQuality", label: "Preserve quality", type: "boolean", def: true }
    ]
  },
  {
    id: "layout",
    label: "Layout",
    fields: [
      { key: "position", label: "Position", type: "select", def: "bottom-right", options: ["bottom-right", "bottom-left", "top-right", "top-left"] },
      { key: "width", label: "Width (px)", type: "number", def: 400, min: 80, max: 1200, step: 10 },
      { key: "height", label: "Height (px)", type: "number", def: 300, min: 80, max: 1200, step: 10 },
      { key: "theme", label: "Theme", type: "select", def: "dark", options: ["dark", "light", "blue", "purple"] },
      { key: "transparent", label: "Transparent avatar bg", type: "boolean", def: false },
      { key: "transparentChat", label: "Transparent chat bg", type: "boolean", def: false },
      { key: "startMinimized", label: "Start minimized", type: "boolean", def: false },
      { key: "alwaysOnTop", label: "Always on top", type: "boolean", def: true }
    ]
  },
  {
    id: "animation",
    label: "Animation",
    fields: [
      { key: "autoCalculateSpeed", label: "Auto-calculate speed", type: "boolean", def: true },
      { key: "idleSpeed", label: "Idle speed", type: "number", def: 1, min: 0.1, max: 5, step: 0.1 },
      { key: "talkSpeed", label: "Talk speed", type: "number", def: 1, min: 0.1, max: 5, step: 0.1 },
      { key: "showSpeedControls", label: "Show speed controls", type: "boolean", def: false },
      { key: "talkStartDelay", label: "Talk start delay (ms)", type: "number", def: 0, min: 0, max: 5e3, step: 50 },
      { key: "postTalkDelay", label: "Post-talk delay (ms)", type: "number", def: 1500, min: 0, max: 1e4, step: 50 },
      { key: "minTalkDuration", label: "Min talk duration (ms)", type: "number", def: 800, min: 0, max: 1e4, step: 50 },
      { key: "minIdleDuration", label: "Min idle duration (ms)", type: "number", def: 400, min: 0, max: 1e4, step: 50 }
    ]
  },
  {
    id: "tts",
    label: "TTS (Text-to-Speech)",
    fields: [
      { key: "enableTTS", label: "Enable TTS", type: "boolean", def: true },
      { key: "ttsProvider", label: "Provider", type: "select", def: "browser", options: ["browser", "tiktok", "elevenlabs", "google", "azure", "piper"] },
      { key: "ttsLang", label: "Language", type: "text", def: "pt-BR", placeholder: "pt-BR" },
      { key: "ttsVoice", label: "Voice (browser)", type: "text", def: "auto" },
      { key: "ttsVoiceId", label: "Voice ID (cloud)", type: "text", def: "" },
      { key: "ttsGender", label: "Gender", type: "select", def: "auto", options: ["auto", "male", "female"] },
      { key: "ttsRate", label: "Rate", type: "number", def: 1, min: 0.5, max: 2, step: 0.05 },
      { key: "ttsPitch", label: "Pitch", type: "number", def: 1, min: 0.5, max: 2, step: 0.05 },
      { key: "ttsApiKey", label: "API key (cloud)", type: "password", def: "" },
      { key: "ttsApiUrl", label: "Custom API URL", type: "text", def: "" },
      { key: "ttsModel", label: "Model (ElevenLabs, …)", type: "text", def: "" },
      // Piper (browser ONNX)
      { key: "piperModelUrl", label: "Piper model URL", type: "text", def: "", placeholder: "https://…/model.onnx" },
      { key: "piperModelConfigUrl", label: "Piper model config URL", type: "text", def: "", placeholder: "https://…/model.onnx.json" },
      { key: "piperPitch", label: "Piper pitch", type: "number", def: 1, min: 0.75, max: 1.3, step: 0.05 },
      { key: "piperSpeed", label: "Piper speed", type: "number", def: 1, min: 0.75, max: 1.3, step: 0.05 }
    ]
  },
  {
    id: "stt",
    label: "STT (Speech-to-Text)",
    fields: [
      { key: "enableSTT", label: "Enable STT", type: "boolean", def: false },
      { key: "sttProvider", label: "Provider", type: "select", def: "browser", options: ["browser", "google"] },
      { key: "sttLang", label: "Language", type: "text", def: "pt-BR" },
      { key: "sttContinuous", label: "Continuous listening", type: "boolean", def: false },
      { key: "sttInterimResults", label: "Interim results", type: "boolean", def: true },
      { key: "sttAutoSend", label: "Auto-send phrase", type: "boolean", def: true },
      { key: "sttApiKey", label: "API key (Google)", type: "password", def: "" },
      { key: "sttApiUrl", label: "Custom API URL", type: "text", def: "" }
    ]
  },
  {
    id: "chat",
    label: "Chat",
    fields: [
      { key: "webhookUrl", label: "Webhook URL", type: "text", def: "", placeholder: "https://n8n.example.com/webhook/…" },
      { key: "webhookApiKey", label: "Webhook API key", type: "password", def: "" },
      { key: "assistantName", label: "Assistant name", type: "text", def: "Assistant" },
      { key: "userName", label: "User name", type: "text", def: "You" },
      { key: "autoGreeting", label: "Auto greeting", type: "boolean", def: true },
      { key: "enableAttachments", label: "Enable attachments", type: "boolean", def: false },
      { key: "locale", label: "Locale", type: "text", def: "pt-BR", placeholder: "pt-BR | en | es …" }
    ]
  }
];
const FIELD_BY_KEY = SECTIONS.reduce((acc, s) => {
  for (const f of s.fields) acc[f.key] = f;
  return acc;
}, {});
const DEFAULT_STORAGE_KEY = "ania-avatar-configurator";
function buildDefaults() {
  const out = {};
  for (const section of SECTIONS) {
    for (const f of section.fields) out[f.key] = f.def;
  }
  return out;
}
function toExportProps(config) {
  const out = {};
  for (const key of Object.keys(FIELD_BY_KEY)) {
    const f = FIELD_BY_KEY[key];
    const v = config[key];
    if (v === void 0 || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (v === f.def) continue;
    out[key] = v;
  }
  return out;
}
function toJSX(config, componentName = "AvatarChatbot") {
  const props = toExportProps(config);
  const keys = Object.keys(props);
  if (keys.length === 0) return `<${componentName} />`;
  const lines = keys.map((k) => {
    const v = props[k];
    if (typeof v === "string") return `  ${k}="${v.replace(/"/g, "&quot;")}"`;
    if (typeof v === "boolean") return v ? `  ${k}` : `  ${k}={false}`;
    return `  ${k}={${JSON.stringify(v)}}`;
  });
  return `<${componentName}
${lines.join("\n")}
/>`;
}
function toJSON(config) {
  return JSON.stringify(toExportProps(config), null, 2);
}
function loadPersisted(key) {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function savePersisted(key, value) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
function clearPersisted(key) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
  }
}
function useConfiguratorStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id2 = "ania-configurator-styles";
    if (document.getElementById(id2)) return;
    const style = document.createElement("style");
    style.id = id2;
    style.textContent = ".ania-cfg-field:focus{outline:none;border-color:#6366f1 !important;box-shadow:0 0 0 3px rgba(99,102,241,0.25) !important;}.ania-cfg-btn{transition:background-color .12s ease,transform .12s ease;}.ania-cfg-btn:hover{filter:brightness(1.08);}.ania-cfg-btn:active{transform:scale(0.97);}.ania-cfg-section-hdr{transition:background-color .12s ease;}.ania-cfg-section-hdr:hover{background:rgba(99,102,241,0.12);}.ania-cfg-scroll{scrollbar-width:thin;scrollbar-color:rgba(100,116,139,0.4) transparent;}.ania-cfg-scroll::-webkit-scrollbar{width:8px;}.ania-cfg-scroll::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.4);border-radius:999px;}";
    document.head.appendChild(style);
  }, []);
}
const S = {
  panel: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    fontSize: 13,
    color: "#e2e8f0",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 12,
    width: 340,
    maxWidth: "100%",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
    boxSizing: "border-box"
  },
  header: {
    padding: "12px 14px",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  },
  title: { fontSize: 14, fontWeight: 600, margin: 0, color: "#f8fafc" },
  scrollArea: { overflowY: "auto", padding: "6px 0", flex: 1 },
  sectionHdr: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 14px",
    cursor: "pointer",
    userSelect: "none",
    fontWeight: 600,
    color: "#cbd5e1",
    background: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontSize: 13
  },
  sectionBody: { padding: "2px 14px 10px" },
  field: { marginBottom: 10 },
  fieldLabel: { display: "block", marginBottom: 4, color: "#94a3b8", fontSize: 12 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#1e293b",
    color: "#e2e8f0",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: "7px 9px",
    fontSize: 13,
    fontFamily: "inherit"
  },
  checkboxRow: { display: "flex", alignItems: "center", gap: 8 },
  footer: {
    padding: 12,
    borderTop: "1px solid #1e293b",
    display: "flex",
    flexWrap: "wrap",
    gap: 8
  },
  btn: {
    flex: "1 1 auto",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#e2e8f0",
    cursor: "pointer",
    fontSize: 12.5,
    fontWeight: 600,
    fontFamily: "inherit"
  },
  btnPrimary: { background: "#4f46e5", borderColor: "#4f46e5", color: "#fff" }
};
function Field({ field, value, onChange }) {
  const id2 = `ania-cfg-${field.key}`;
  if (field.type === "boolean") {
    return /* @__PURE__ */ jsxs("label", { htmlFor: id2, style: { ...S.field, ...S.checkboxRow, cursor: "pointer" }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: id2,
          type: "checkbox",
          checked: !!value,
          onChange: (e) => onChange(field.key, e.target.checked),
          style: { width: 16, height: 16, accentColor: "#4f46e5", cursor: "pointer" }
        }
      ),
      /* @__PURE__ */ jsx("span", { style: { color: "#cbd5e1", fontSize: 13 }, children: field.label })
    ] });
  }
  if (field.type === "select") {
    return /* @__PURE__ */ jsxs("div", { style: S.field, children: [
      /* @__PURE__ */ jsx("label", { htmlFor: id2, style: S.fieldLabel, children: field.label }),
      /* @__PURE__ */ jsx(
        "select",
        {
          id: id2,
          className: "ania-cfg-field",
          value: value ?? field.def,
          onChange: (e) => onChange(field.key, e.target.value),
          style: S.input,
          children: field.options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, opt))
        }
      )
    ] });
  }
  if (field.type === "number") {
    return /* @__PURE__ */ jsxs("div", { style: S.field, children: [
      /* @__PURE__ */ jsx("label", { htmlFor: id2, style: S.fieldLabel, children: field.label }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: id2,
          className: "ania-cfg-field",
          type: "number",
          value: value ?? "",
          min: field.min,
          max: field.max,
          step: field.step,
          onChange: (e) => {
            const raw = e.target.value;
            onChange(field.key, raw === "" ? field.def : Number(raw));
          },
          style: S.input
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { style: S.field, children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id2, style: S.fieldLabel, children: field.label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id: id2,
        className: "ania-cfg-field",
        type: field.type === "password" ? "password" : "text",
        value: value ?? "",
        placeholder: field.placeholder || "",
        autoComplete: "off",
        onChange: (e) => onChange(field.key, e.target.value),
        style: S.input
      }
    )
  ] });
}
function Section({ section, config, onChange, open, onToggle }) {
  return /* @__PURE__ */ jsxs("div", { style: { borderBottom: "1px solid #1e293b" }, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "ania-cfg-section-hdr",
        style: S.sectionHdr,
        onClick: onToggle,
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsx("span", { children: section.label }),
          /* @__PURE__ */ jsx("span", { style: { color: "#64748b", transform: open ? "rotate(90deg)" : "none", transition: "transform .15s" }, children: "▸" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { style: S.sectionBody, children: section.fields.map((f) => /* @__PURE__ */ jsx(Field, { field: f, value: config[f.key], onChange }, f.key)) })
  ] });
}
const AvatarConfigurator = ({
  // Controlled mode
  value,
  onChange,
  // Uncontrolled initial config (also accepts any AvatarChatbot prop as a seed
  // for batteries-included mode, e.g. avatarUrl="…").
  defaultValue,
  // localStorage namespace. Set persist={false} to disable persistence.
  storageKey = DEFAULT_STORAGE_KEY,
  persist = true,
  // When true (default when NOT controlled), render the AvatarChatbot itself
  // next to the panel. Set false to only render the panel.
  showPreview,
  // Component name used in the exported JSX snippet.
  exportComponentName = "AvatarChatbot",
  // Fired with the export-ready (defaults-stripped) prop map on every change.
  onExport,
  // Layout: 'row' (panel + preview side by side) | 'column'.
  layout = "row",
  // Extra seed props merged into the initial config (batteries-included mode).
  // Any AvatarChatbot prop not surfaced by the panel is passed through to the
  // rendered avatar but not editable here.
  ...seedProps
}) => {
  useConfiguratorStyles();
  const isControlled = value !== void 0 && typeof onChange === "function";
  const initial = useMemo(() => {
    const base = buildDefaults();
    const persisted = persist ? loadPersisted(storageKey) : null;
    const seed = {};
    for (const k of Object.keys(seedProps)) {
      if (k in FIELD_BY_KEY) seed[k] = seedProps[k];
    }
    return { ...base, ...persisted || {}, ...seed, ...defaultValue || {} };
  }, []);
  const [internal, setInternal] = useState(initial);
  const config = isControlled ? { ...buildDefaults(), ...value } : internal;
  const passthrough = useMemo(() => {
    const out = {};
    for (const k of Object.keys(seedProps)) {
      if (!(k in FIELD_BY_KEY)) out[k] = seedProps[k];
    }
    return out;
  }, [seedProps]);
  const [openSections, setOpenSections] = useState(() => ({ avatar: true, layout: true }));
  const [copied, setCopied] = useState(null);
  const copyResetRef = useRef(null);
  const handleChange = useCallback(
    (key, val) => {
      if (isControlled) {
        onChange({ ...value, [key]: val });
      } else {
        setInternal((prev) => ({ ...prev, [key]: val }));
      }
    },
    [isControlled, onChange, value]
  );
  useEffect(() => {
    if (persist && !isControlled) savePersisted(storageKey, config);
    if (typeof onExport === "function") onExport(toExportProps(config));
  }, [config]);
  const doCopy = useCallback(async (kind) => {
    const text = kind === "jsx" ? toJSX(config, exportComponentName) : toJSON(config);
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok && typeof document !== "undefined") {
      try {
        const ta2 = document.createElement("textarea");
        ta2.value = text;
        ta2.style.position = "fixed";
        ta2.style.opacity = "0";
        document.body.appendChild(ta2);
        ta2.select();
        document.execCommand("copy");
        document.body.removeChild(ta2);
        ok = true;
      } catch {
        ok = false;
      }
    }
    setCopied(ok ? kind : null);
    if (copyResetRef.current) clearTimeout(copyResetRef.current);
    copyResetRef.current = setTimeout(() => setCopied(null), 1600);
  }, [config, exportComponentName]);
  useEffect(() => () => {
    if (copyResetRef.current) clearTimeout(copyResetRef.current);
  }, []);
  const handleReset = useCallback(() => {
    const defaults = buildDefaults();
    if (persist) clearPersisted(storageKey);
    if (isControlled) onChange(defaults);
    else setInternal(defaults);
  }, [isControlled, onChange, persist, storageKey]);
  const toggleSection = useCallback((id2) => {
    setOpenSections((prev) => ({ ...prev, [id2]: !prev[id2] }));
  }, []);
  const shouldPreview = showPreview !== void 0 ? showPreview : !isControlled;
  const panel = /* @__PURE__ */ jsxs("div", { style: S.panel, className: "ania-cfg-scroll", children: [
    /* @__PURE__ */ jsxs("div", { style: S.header, children: [
      /* @__PURE__ */ jsx("h3", { style: S.title, children: "Avatar Configurator" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "ania-cfg-btn",
          style: { ...S.btn, flex: "0 0 auto", padding: "5px 9px" },
          onClick: handleReset,
          title: "Reset all fields to defaults",
          children: "Reset"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { style: S.scrollArea, className: "ania-cfg-scroll", children: SECTIONS.map((section) => /* @__PURE__ */ jsx(
      Section,
      {
        section,
        config,
        onChange: handleChange,
        open: !!openSections[section.id],
        onToggle: () => toggleSection(section.id)
      },
      section.id
    )) }),
    /* @__PURE__ */ jsxs("div", { style: S.footer, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "ania-cfg-btn",
          style: { ...S.btn, ...S.btnPrimary },
          onClick: () => doCopy("jsx"),
          children: copied === "jsx" ? "Copied ✓" : "Copy JSX"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "ania-cfg-btn",
          style: S.btn,
          onClick: () => doCopy("json"),
          children: copied === "json" ? "Copied ✓" : "Copy JSON"
        }
      )
    ] })
  ] });
  if (!shouldPreview) return panel;
  const remountKey = [
    config.avatarUrl,
    config.avatarPassword,
    config.ttsProvider,
    config.sttProvider,
    config.piperModelUrl
  ].join("|");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: layout === "column" ? "column" : "row",
        gap: 16,
        alignItems: "flex-start",
        flexWrap: "wrap"
      },
      children: [
        panel,
        /* @__PURE__ */ jsx("div", { style: { flex: "1 1 320px", minWidth: 280, position: "relative" }, children: /* @__PURE__ */ jsx(AvatarChatbot, { ...config, ...passthrough }, remountKey) })
      ]
    }
  );
};
AvatarConfigurator.toJSX = toJSX;
AvatarConfigurator.toJSON = toJSON;
AvatarConfigurator.toExportProps = toExportProps;
AvatarConfigurator.SECTIONS = SECTIONS;
const useAniaAvatarRef = () => {
  const ref = useRef(null);
  const getPlayer = () => {
    var _a, _b;
    return ((_b = (_a = ref.current) == null ? void 0 : _a.playerRef) == null ? void 0 : _b.current) || null;
  };
  const getController = () => {
    const player = getPlayer();
    return (player == null ? void 0 : player.animationController) || null;
  };
  const setTalking = (talking) => {
    const ctrl = getController();
    if (ctrl) ctrl.setTalkingState(talking);
  };
  const play = () => {
    var _a, _b;
    const player = (_b = (_a = ref.current) == null ? void 0 : _a.playerRef) == null ? void 0 : _b.current;
    if (player == null ? void 0 : player.play) player.play();
  };
  const pause = () => {
    var _a, _b;
    const player = (_b = (_a = ref.current) == null ? void 0 : _a.playerRef) == null ? void 0 : _b.current;
    if (player == null ? void 0 : player.pause) player.pause();
  };
  const triggerAction = (actionId) => {
    const ctrl = getController();
    if (ctrl == null ? void 0 : ctrl.triggerAction) ctrl.triggerAction(actionId);
  };
  const cancelAction = () => {
    const ctrl = getController();
    if (ctrl == null ? void 0 : ctrl.cancelAction) ctrl.cancelAction(true);
  };
  const getAvailableActions = () => {
    const ctrl = getController();
    if (ctrl == null ? void 0 : ctrl.getActionConfigs) {
      const configs = ctrl.getActionConfigs();
      return Object.values(configs).map((c) => ({ id: c.id, name: c.name }));
    }
    return [];
  };
  const setLipSyncEnabled = (enabled) => {
    const ctrl = getController();
    if (ctrl) ctrl.lipsSyncEnabled = enabled;
  };
  const getLipSyncState = () => {
    const ctrl = getController();
    if (!ctrl) return { enabled: false };
    return {
      enabled: ctrl.lipsSyncEnabled || false,
      envelope: ctrl._lipsEnvelope || 0
    };
  };
  const runCommand = (line, extraCtx = {}) => {
    const player = getPlayer();
    const ctx = {
      player,
      getActions: getAvailableActions,
      triggerAction,
      cancelAction,
      setSpeeds: (idle, talk) => {
        const ctrl = getController();
        if (ctrl == null ? void 0 : ctrl.setIdleSpeed) ctrl.setIdleSpeed(idle);
        if (ctrl == null ? void 0 : ctrl.setTalkSpeed) ctrl.setTalkSpeed(talk);
      },
      ...extraCtx
    };
    return executeCommand(line, ctx);
  };
  return { ref, setTalking, play, pause, triggerAction, cancelAction, getAvailableActions, setLipSyncEnabled, getLipSyncState, runCommand };
};
const CHATBOT_TEMPLATES = [
  {
    id: "greeter",
    name: "Recepcionista",
    emoji: "👋",
    description: "Recebe o visitante e oferece ajuda. Fala sozinho ao abrir.",
    config: {
      assistantName: "Ania",
      theme: "dark",
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: "browser",
      ttsLang: "pt-BR",
      enableSTT: false
    },
    sampleReply: "Olá! Seja bem-vindo(a) 😊 Como posso te ajudar hoje?"
  },
  {
    id: "support",
    name: "Suporte",
    emoji: "🎧",
    description: "Tom profissional para atendimento. Conecte seu webhook de IA.",
    config: {
      assistantName: "Suporte",
      theme: "blue",
      transparent: false,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: "browser",
      ttsLang: "pt-BR",
      enableSTT: true,
      sttProvider: "browser",
      sttLang: "pt-BR"
    },
    sampleReply: "Certo! Já estou verificando isso para você. Pode me dar mais um detalhe?"
  },
  {
    id: "sales",
    name: "Vendas",
    emoji: "💼",
    description: "Energético e persuasivo para qualificar leads.",
    config: {
      assistantName: "Vic",
      theme: "purple",
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: "browser",
      ttsLang: "pt-BR",
      enableSTT: false
    },
    sampleReply: "Ótima escolha! 🚀 Posso te mostrar o plano ideal em 30 segundos. Qual seu objetivo?"
  },
  {
    id: "faq",
    name: "FAQ",
    emoji: "📚",
    description: "Respostas curtas e diretas. Sem saudação automática.",
    config: {
      assistantName: "FAQ",
      theme: "dark",
      transparent: false,
      autoGreeting: false,
      enableTTS: false,
      enableSTT: false
    },
    sampleReply: "Sim! Isso está disponível no seu plano. Veja mais em /docs."
  },
  {
    id: "playful",
    name: "Divertido",
    emoji: "🎉",
    description: "Casual e bem-humorado, com voz e escuta ativa.",
    config: {
      assistantName: "Bolt",
      theme: "purple",
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: "browser",
      ttsLang: "pt-BR",
      enableSTT: true,
      sttProvider: "browser",
      sttLang: "pt-BR"
    },
    sampleReply: "Eba, adorei a pergunta! 😄 Bora resolver isso juntos!"
  },
  {
    id: "ai-assistant",
    name: "Assistente IA",
    emoji: "🤖",
    description: "Voz neural on-device (Piper) + escuta. O pacote completo.",
    config: {
      assistantName: "Ania",
      theme: "dark",
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: "piper",
      ttsLang: "pt-BR",
      piperModelUrl: "https://seguranca.ropeco-rv.workers.dev/models/pt_BR-nanda-medium.onnx",
      piperModelConfigUrl: "https://seguranca.ropeco-rv.workers.dev/models/pt_BR-nanda-medium.onnx.json",
      enableSTT: true,
      sttProvider: "browser",
      sttLang: "pt-BR"
    },
    sampleReply: "Claro! Estou aqui para ajudar no que precisar. Sobre o que você quer falar?"
  }
];
const CHATBOT_TEMPLATE_BY_ID = CHATBOT_TEMPLATES.reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {});
export {
  AniaAvatar,
  AvatarChatbot,
  AvatarConfigurator,
  BUILTIN_PLUGINS,
  CHATBOT_TEMPLATES,
  CHATBOT_TEMPLATE_BY_ID,
  COMMAND_LIST,
  SECTIONS as CONFIGURATOR_SECTIONS,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  PLUGIN_KINDS,
  PluginRegistry,
  STT_PROVIDER_TO_PLUGIN,
  TTS_PROVIDER_TO_PLUGIN,
  WakeWordEngine,
  actionAudioPlugin,
  availableLocales,
  buildOpennessMap,
  checkPiperStatus,
  clearAvatarCache,
  toExportProps as configuratorExportProps,
  toJSON as configuratorToJSON,
  toJSX as configuratorToJSX,
  createTranslator,
  deleteCachedAvatar,
  disposePiper,
  executeCommand,
  fetchLipSyncConfig,
  getNode as flowGetNode,
  initialState as flowInitialState,
  interpolate as flowInterpolate,
  nodeInput as flowNodeInput,
  flowReducer,
  resolvePrompt as flowResolvePrompt,
  validateInput as flowValidateInput,
  visibleOptions as flowVisibleOptions,
  getCacheStats,
  getCachedAvatar,
  getDefaultRegistry,
  getPiperStatus,
  getString,
  getStringList,
  getWakeWordEngine,
  hasLocale,
  initPiper,
  installPostMessageControl,
  isWakeWordSupported,
  matchesHotkey,
  parseCommandLine,
  parseHotkey,
  piperSynthesize,
  playActionAudio,
  preloadPiper,
  registerBuiltins,
  setCachedAvatar,
  sttBrowserPlugin,
  sttGooglePlugin,
  ttsAzurePlugin,
  ttsBrowserPlugin,
  ttsElevenLabsPlugin,
  ttsGooglePlugin,
  ttsPiperPlugin,
  ttsTiktokPlugin,
  useActionFrames,
  useAniaAvatarRef,
  useChatbot,
  useFlowEngine,
  useLipSync,
  usePlugins,
  useSpeechRecognition,
  useTTSDetection,
  useWakeWord,
  validatePlugin
};
