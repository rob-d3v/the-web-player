const MAP_VERSION = 1;
const divmod = (a, b) => [Math.floor(a / b), a % b];
const setNFC = (s) => /* @__PURE__ */ new Set([...s.normalize("NFC")]);
const endsWithAny = (s, arr) => arr.some((suf) => s.endsWith(suf));
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const UNID_M = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const UNID_F = ["", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const DEZ_A_DEZENOVE = [
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove"
];
const DEZENAS = [
  "",
  "",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa"
];
const CENT_M = [
  "",
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos"
];
const CENT_F = [
  "",
  "cento",
  "duzentas",
  "trezentas",
  "quatrocentas",
  "quinhentas",
  "seiscentas",
  "setecentas",
  "oitocentas",
  "novecentas"
];
const MESES = [
  "",
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro"
];
const ESCALAS = [[1e12, "trilhão", "trilhões"], [1e9, "bilhão", "bilhões"], [1e6, "milhão", "milhões"]];
const ORD_UNID_M = [
  "",
  "primeiro",
  "segundo",
  "terceiro",
  "quarto",
  "quinto",
  "sexto",
  "sétimo",
  "oitavo",
  "nono"
];
const ORD_DEZ_M = [
  "",
  "décimo",
  "vigésimo",
  "trigésimo",
  "quadragésimo",
  "quinquagésimo",
  "sexagésimo",
  "septuagésimo",
  "octogésimo",
  "nonagésimo"
];
const ORD_CENT_M = [
  "",
  "centésimo",
  "ducentésimo",
  "tricentésimo",
  "quadringentésimo",
  "quingentésimo",
  "sexcentésimo",
  "septingentésimo",
  "octingentésimo",
  "noningentésimo"
];
const _dezena = (n, genero) => {
  const unid = genero === "f" ? UNID_F : UNID_M;
  if (n < 10) return unid[n];
  if (n < 20) return DEZ_A_DEZENOVE[n - 10];
  const [dez, uni] = divmod(n, 10);
  return DEZENAS[dez] + (uni ? ` e ${unid[uni]}` : "");
};
const _centena = (n, genero) => {
  if (n === 100) return "cem";
  const cent = genero === "f" ? CENT_F : CENT_M;
  const [cen, resto] = divmod(n, 100);
  const partes = [];
  if (cen) partes.push(cent[cen]);
  if (resto) partes.push(_dezena(resto, genero));
  return partes.join(" e ");
};
function numeroPorExtenso(n, genero = "m") {
  if (n === 0) return "zero";
  if (n < 0) return "menos " + numeroPorExtenso(-n, genero);
  for (const [base, sing, plur] of ESCALAS) {
    if (n >= base) {
      const [q, r] = divmod(n, base);
      const cab = `${numeroPorExtenso(q, "m")} ${q === 1 ? sing : plur}`;
      if (r === 0) return cab;
      const conector2 = r < 100 || r % 100 === 0 ? " e " : " ";
      return cab + conector2 + numeroPorExtenso(r, genero);
    }
  }
  if (n < 1e3) return _centena(n, genero);
  const [milhares, resto] = divmod(n, 1e3);
  const parteMil = milhares === 1 ? "mil" : `${numeroPorExtenso(milhares, genero)} mil`;
  if (resto === 0) return parteMil;
  const conector = resto < 100 || resto % 100 === 0 ? " e " : " ";
  return parteMil + conector + _centena(resto, genero);
}
function ordinalPorExtenso(n, genero = "m") {
  if (n <= 0 || n > 999) return numeroPorExtenso(n, genero);
  const [cen, resto] = divmod(n, 100);
  const [dez, uni] = divmod(resto, 10);
  const partes = [];
  if (cen) partes.push(ORD_CENT_M[cen]);
  if (dez) partes.push(ORD_DEZ_M[dez]);
  if (uni) partes.push(ORD_UNID_M[uni]);
  let saida = partes.join(" ");
  if (genero === "f") saida = saida.replace(/o\b/g, "a");
  return saida;
}
const _decimalPorExtenso = (inteiro, frac, genero = "m") => {
  const ip = numeroPorExtenso(parseInt(inteiro, 10), genero);
  let fp;
  if (frac.startsWith("0") && frac.length > 1) {
    fp = [...frac].map((d) => numeroPorExtenso(parseInt(d, 10), "m")).join(" ");
  } else {
    fp = numeroPorExtenso(parseInt(frac, 10), "m");
  }
  return `${ip} vírgula ${fp}`;
};
const NOME_LETRA = {
  a: "a",
  b: "bê",
  c: "cê",
  d: "dê",
  e: "é",
  f: "efe",
  g: "gê",
  h: "agá",
  i: "i",
  j: "jota",
  k: "cá",
  l: "ele",
  m: "eme",
  n: "ene",
  o: "ó",
  p: "pê",
  q: "quê",
  r: "erre",
  s: "esse",
  t: "tê",
  u: "u",
  v: "vê",
  w: "dáblio",
  x: "xis",
  y: "ípsilon",
  z: "zê"
};
const SIGLAS_SOLETRA = /* @__PURE__ */ new Set([
  "INSS",
  "IPTU",
  "ICMS",
  "IPVA",
  "IRPF",
  "IRRF",
  "IOF",
  "IPI",
  "FGTS",
  "OAB",
  "CID",
  "CLT",
  "IPTV",
  "IPEA",
  "ANS"
]);
const VOGAIS_MAI = setNFC("AEIOUÁÀÂÃÉÊÍÓÔÕÚ");
const ABREVIACOES = {
  dr: "doutor",
  dra: "doutora",
  sr: "senhor",
  sra: "senhora",
  srta: "senhorita",
  prof: "professor",
  profa: "professora",
  eng: "engenheiro",
  arq: "arquiteto",
  av: "avenida",
  r: "rua",
  pç: "praça",
  pça: "praça",
  al: "alameda",
  rod: "rodovia",
  trav: "travessa",
  pg: "página",
  pág: "página",
  pp: "páginas",
  cap: "capítulo",
  vol: "volume",
  ed: "edição",
  tel: "telefone",
  cel: "celular",
  depto: "departamento",
  dept: "departamento",
  ltda: "limitada",
  cia: "companhia",
  etc: "et cetera",
  obs: "observação",
  ref: "referência",
  pe: "padre",
  fr: "frei",
  sto: "santo",
  sta: "santa",
  jr: "júnior",
  atte: "atenciosamente",
  att: "atenciosamente",
  exmo: "excelentíssimo",
  exma: "excelentíssima",
  jan: "janeiro",
  fev: "fevereiro",
  mar: "março",
  abr: "abril",
  jun: "junho",
  jul: "julho",
  ago: "agosto",
  set: "setembro",
  out: "outubro",
  nov: "novembro",
  dez: "dezembro"
};
const UNIDADES = {
  km: ["quilômetro", "quilômetros"],
  m: ["metro", "metros"],
  cm: ["centímetro", "centímetros"],
  mm: ["milímetro", "milímetros"],
  kg: ["quilo", "quilos"],
  g: ["grama", "gramas"],
  mg: ["miligrama", "miligramas"],
  t: ["tonelada", "toneladas"],
  l: ["litro", "litros"],
  ml: ["mililitro", "mililitros"],
  "km/h": ["quilômetro por hora", "quilômetros por hora"],
  "°c": ["grau celsius", "graus celsius"],
  "°": ["grau", "graus"],
  kb: ["kilobyte", "kilobytes"],
  mb: ["megabyte", "megabytes"],
  gb: ["gigabyte", "gigabytes"],
  tb: ["terabyte", "terabytes"]
};
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F0FF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu;
const _expandirEmoji = (t) => t.replace(EMOJI_RE, "");
const _expandirUrls = (texto, policy) => {
  if (policy === "keep") return texto;
  const email = /[\w.\-+]+@[\w.\-]+\.\w+/g;
  const url = /(?:https?:\/\/|www\.)[^\s]+/gi;
  const _spell = (s) => {
    s = s.replace(/^https?:\/\//i, "");
    s = s.replace(/@/g, " arroba ").replace(/\./g, " ponto ").replace(/\//g, " barra ").replace(/_/g, " underline ").replace(/-/g, " traço ").replace(/:/g, " dois pontos ");
    return s.replace(/\s+/g, " ").trim();
  };
  const repl = (m) => policy === "skip" ? "" : _spell(m);
  texto = texto.replace(email, repl);
  texto = texto.replace(url, repl);
  return texto;
};
const _expandirSiglas = (texto) => texto.replace(new RegExp("(?<![0-9A-Za-zÀ-ÿ])[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ]{2,6}(?![0-9A-Za-zÀ-ÿ])", "g"), (s) => {
  const letras = s.replace(/\./g, "");
  const soConsoante = [...letras].every((c) => !VOGAIS_MAI.has(c));
  if (soConsoante || SIGLAS_SOLETRA.has(letras)) {
    return [...letras].map((c) => NOME_LETRA[c.toLowerCase()] || c.toLowerCase()).join(" ");
  }
  return s;
});
const _romanToInt = (s) => {
  const vals = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1e3 };
  let total = 0;
  let prev = 0;
  for (const ch of [...s.toUpperCase()].reverse()) {
    const v = vals[ch] || 0;
    if (v === 0) return -1;
    if (v < prev) total -= v;
    else {
      total += v;
      prev = v;
    }
  }
  return total;
};
const _expandirRomanos = (texto) => {
  const gatilhos = "s[ée]culo|cap[íi]tulo|cap|volume|vol|tomo|parte|livro|fase|guerra|edi[çc][ãa]o|rodada|rei|rainha|papa|pontos";
  const padrao = new RegExp(`\\b(${gatilhos})\\s+([IVXLCDM]{1,7})\\b`, "gi");
  return texto.replace(padrao, (m, g1, g2) => {
    const val = _romanToInt(g2);
    if (val <= 0) return m;
    return `${g1} ${numeroPorExtenso(val)}`;
  });
};
const _expandirAbreviacoes = (texto) => {
  const chaves = Object.keys(ABREVIACOES).sort((a, b) => b.length - a.length);
  const padrao = new RegExp(`\\b(${chaves.map(escapeRe).join("|")})\\.`, "gi");
  return texto.replace(padrao, (m, g1) => ABREVIACOES[g1.toLowerCase()]);
};
const _expandirMoeda = (texto) => texto.replace(/R\$\s*(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{2}))?/g, (m, g1, g2) => {
  const reais = parseInt(g1.replace(/\./g, ""), 10);
  const centavos = g2 ? parseInt(g2, 10) : 0;
  let out = numeroPorExtenso(reais) + (reais === 1 ? " real" : " reais");
  if (centavos) out += " e " + numeroPorExtenso(centavos) + (centavos === 1 ? " centavo" : " centavos");
  return out;
});
const _expandirPercent = (texto) => texto.replace(/\b(\d+)(?:,(\d+))?\s*%/g, (m, g1, g2) => {
  const corpo = g2 ? _decimalPorExtenso(g1, g2) : numeroPorExtenso(parseInt(g1, 10));
  return corpo + " por cento";
});
const _expandirDatas = (texto) => texto.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g, (m, d, mo, y) => {
  const dia = parseInt(d, 10);
  const mes = parseInt(mo, 10);
  const ano = parseInt(y, 10);
  if (!(mes >= 1 && mes <= 12 && dia >= 1 && dia <= 31)) return m;
  const diaExt = dia === 1 ? "primeiro" : numeroPorExtenso(dia);
  return `${diaExt} de ${MESES[mes]} de ${numeroPorExtenso(ano)}`;
});
const _replHora = (m, h, mi) => {
  const horas = parseInt(h, 10);
  const minutos = mi ? parseInt(mi, 10) : 0;
  let out = numeroPorExtenso(horas, "f") + (horas === 1 ? " hora" : " horas");
  if (minutos) out += " e " + numeroPorExtenso(minutos) + (minutos === 1 ? " minuto" : " minutos");
  return out;
};
const _expandirHoras = (texto) => {
  texto = texto.replace(/\b(\d{1,2})h(\d{2})?\b/g, _replHora);
  texto = texto.replace(/\b(\d{1,2}):(\d{2})\b/g, _replHora);
  return texto;
};
const _expandirTelefones = (texto) => {
  const padrao = new RegExp("(?<!\\d)(?:\\(\\d{2}\\)\\s?\\d{4,5}-?\\d{4}|0800[\\s-]?\\d{3}[\\s-]?\\d{4}|\\d{4,5}-\\d{4})(?!\\d)", "g");
  return texto.replace(padrao, (m) => {
    const digs = m.replace(/\D/g, "");
    return [...digs].map((d) => numeroPorExtenso(parseInt(d, 10))).join(" ");
  });
};
const _expandirUnidades = (texto) => {
  const chaves = Object.keys(UNIDADES).sort((a, b) => b.length - a.length);
  const alt = chaves.map(escapeRe).join("|");
  const padrao = new RegExp(`\\b(\\d+)(?:,(\\d+))?\\s*(${alt})(?![a-zçãéíóêô/])`, "gi");
  return texto.replace(padrao, (m, g1, g2, g3) => {
    const [sing, plur] = UNIDADES[g3.toLowerCase()];
    if (g2) return `${_decimalPorExtenso(g1, g2)} ${plur}`;
    const val = parseInt(g1, 10);
    return `${numeroPorExtenso(val)} ${val === 1 ? sing : plur}`;
  });
};
const _expandirOrdinais = (texto) => texto.replace(/\b(\d+)\s*(º|ª)/g, (m, g1, g2) => {
  const genero = g2 === "ª" ? "f" : "m";
  return ordinalPorExtenso(parseInt(g1, 10), genero);
});
const _expandirDecimais = (texto) => texto.replace(/\b(\d+),(\d+)\b/g, (m, g1, g2) => _decimalPorExtenso(g1, g2));
const _colapsaSeparadorMilhar = (texto) => texto.replace(/\b(\d{1,3}(?:\.\d{3})+)\b/g, (m) => m.replace(/\./g, ""));
const _expandirNumeros = (texto) => texto.replace(/\d+/g, (m) => numeroPorExtenso(parseInt(m, 10)));
const _flag = (cfg, name, def = true) => cfg == null ? def : cfg[name] === void 0 ? def : Boolean(cfg[name]);
function normalizePtbr(texto, cfg = null) {
  const urlPolicy = cfg && cfg.url_policy || "spell";
  let out = (texto || "").normalize("NFC");
  if (_flag(cfg, "strip_emoji")) out = _expandirEmoji(out);
  out = _expandirUrls(out, urlPolicy);
  if (_flag(cfg, "expand_siglas")) out = _expandirSiglas(out);
  if (_flag(cfg, "expand_roman")) out = _expandirRomanos(out);
  if (_flag(cfg, "expand_abbreviations")) out = _expandirAbreviacoes(out);
  if (_flag(cfg, "expand_currency")) out = _expandirMoeda(out);
  if (_flag(cfg, "expand_percent")) out = _expandirPercent(out);
  if (_flag(cfg, "expand_dates")) out = _expandirDatas(out);
  if (_flag(cfg, "expand_times")) out = _expandirHoras(out);
  if (_flag(cfg, "expand_phone")) out = _expandirTelefones(out);
  if (_flag(cfg, "expand_units")) out = _expandirUnidades(out);
  if (_flag(cfg, "expand_ordinals")) out = _expandirOrdinais(out);
  if (_flag(cfg, "expand_numbers")) {
    out = _colapsaSeparadorMilhar(out);
    out = _expandirDecimais(out);
    out = _expandirNumeros(out);
  }
  if (_flag(cfg, "lowercase")) out = out.toLowerCase();
  out = out.replace(/\s+/g, " ").trim();
  return out;
}
const PH = {
  STRESS: "ˈ",
  A: "a",
  E_OPEN: "ɛ",
  E: "e",
  I: "i",
  O_OPEN: "ɔ",
  O: "o",
  U: "u",
  A_NAS: "ã",
  E_NAS: "ẽ",
  I_NAS: "ĩ",
  O_NAS: "õ",
  U_NAS: "ũ",
  J: "j",
  W: "w",
  J_NAS: "j̃",
  W_NAS: "w̃",
  P: "p",
  B: "b",
  T: "t",
  D: "d",
  K: "k",
  G: "g",
  TSH: "tʃ",
  DZH: "dʒ",
  F: "f",
  V: "v",
  S: "s",
  Z: "z",
  SH: "ʃ",
  ZH: "ʒ",
  R_STRONG: "ʁ",
  R_TAP: "ɾ",
  M: "m",
  N: "n",
  NH: "ɲ",
  L: "l",
  LH: "ʎ",
  SPACE: " ",
  PAUSE_MINOR: "|",
  PAUSE_MAJOR: "‖"
};
const VOWELS_ORAL = [PH.A, PH.E_OPEN, PH.E, PH.I, PH.O_OPEN, PH.O, PH.U];
const VOWELS_NASAL = [PH.A_NAS, PH.E_NAS, PH.I_NAS, PH.O_NAS, PH.U_NAS];
const CONSONANTS = [
  PH.P,
  PH.B,
  PH.T,
  PH.D,
  PH.K,
  PH.G,
  PH.TSH,
  PH.DZH,
  PH.F,
  PH.V,
  PH.S,
  PH.Z,
  PH.SH,
  PH.ZH,
  PH.R_STRONG,
  PH.R_TAP,
  PH.M,
  PH.N,
  PH.NH,
  PH.L,
  PH.LH
];
const VOWEL_SET = /* @__PURE__ */ new Set([...VOWELS_ORAL, ...VOWELS_NASAL]);
const CONSONANT_SET = new Set(CONSONANTS);
function makeVocab(symbolToId, { pad = "_", bos = "^", eos = "$", unk = "?" } = {}) {
  const unkId = symbolToId[unk];
  const bosId = symbolToId[bos];
  const eosId = symbolToId[eos];
  return {
    symbolToId,
    pad,
    bos,
    eos,
    unk,
    bosId,
    eosId,
    padId: symbolToId[pad],
    unkId,
    /** Phonemes -> ids (with BOS/EOS + UNK fallback). */
    encode(phonemes, addBosEos = true) {
      const core = phonemes.map((p) => p in symbolToId ? symbolToId[p] : unkId);
      return addBosEos ? [bosId, ...core, eosId] : core;
    }
  };
}
const LETRAS_VOGAIS = setNFC("aeiouáàâãéêíóôõúü");
const ACENTO_BASE = {
  á: "a",
  à: "a",
  â: "a",
  ã: "a",
  é: "e",
  ê: "e",
  í: "i",
  ó: "o",
  ô: "o",
  õ: "o",
  ú: "u",
  ü: "u"
};
const ACUTOS = setNFC("áéíóú");
const CIRCUNFLEXOS = setNFC("âêô");
const TIL = setNFC("ãõ");
const EI = setNFC("eiéêí");
const II = setNFC("ií");
const NM = /* @__PURE__ */ new Set(["n", "m"]);
const IU = /* @__PURE__ */ new Set(["i", "u"]);
const SIBILANTE_CODA = /* @__PURE__ */ new Set([PH.S, PH.Z, PH.SH]);
const OBSTRUINTES = setNFC("pbtdkgfv");
const PAUSA_MAIOR = /* @__PURE__ */ new Set([".", "!", "?", "…"]);
const PAUSA_MENOR = /* @__PURE__ */ new Set([",", ";", ":", "—", "–"]);
const PONTUACAO = /* @__PURE__ */ new Set([...PAUSA_MAIOR, ...PAUSA_MENOR]);
const _CODA_L_CONS = /* @__PURE__ */ new Set([
  ..."ptkbdgfvsz",
  PH.SH,
  PH.ZH,
  PH.R_STRONG,
  PH.R_TAP,
  PH.M,
  PH.N,
  PH.NH,
  PH.LH
]);
const NASAL_MAP = { a: PH.A_NAS, e: PH.E_NAS, i: PH.I_NAS, o: PH.O_NAS, u: PH.U_NAS };
const OPEN_MAP = { a: PH.A, e: PH.E_OPEN, i: PH.I, o: PH.O_OPEN, u: PH.U };
const HETERONIMOS = {
  gosto: [PH.G, PH.STRESS, PH.O, PH.S, PH.T, PH.U],
  jogo: [PH.ZH, PH.STRESS, PH.O, PH.G, PH.U],
  olho: [PH.STRESS, PH.O, PH.LH, PH.U],
  almoço: [PH.A, PH.W, PH.M, PH.STRESS, PH.O, PH.S, PH.U],
  acordo: [PH.A, PH.K, PH.STRESS, PH.O, PH.R_TAP, PH.D, PH.U],
  molho: [PH.M, PH.STRESS, PH.O, PH.LH, PH.U],
  posto: [PH.P, PH.STRESS, PH.O, PH.S, PH.T, PH.U],
  corte: [PH.K, PH.STRESS, PH.O_OPEN, PH.R_STRONG, PH.TSH, PH.I],
  novo: [PH.N, PH.STRESS, PH.O, PH.V, PH.U],
  porto: [PH.P, PH.STRESS, PH.O, PH.R_STRONG, PH.T, PH.U],
  sede: [PH.S, PH.STRESS, PH.E, PH.DZH, PH.I],
  seca: [PH.S, PH.STRESS, PH.E, PH.K, PH.A],
  leste: [PH.L, PH.STRESS, PH.E_OPEN, PH.S, PH.TSH, PH.I],
  meta: [PH.M, PH.STRESS, PH.E, PH.T, PH.A],
  colher: [PH.K, PH.U, PH.LH, PH.STRESS, PH.E_OPEN, PH.R_STRONG],
  começo: [PH.K, PH.U, PH.M, PH.STRESS, PH.E, PH.S, PH.U],
  governo: [PH.G, PH.O, PH.V, PH.STRESS, PH.E, PH.R_STRONG, PH.N, PH.U],
  pega: [PH.P, PH.STRESS, PH.E_OPEN, PH.G, PH.A],
  esse: [PH.STRESS, PH.E, PH.S, PH.I],
  medo: [PH.M, PH.STRESS, PH.E, PH.D, PH.U],
  exame: [PH.E, PH.Z, PH.STRESS, PH.A_NAS, PH.M, PH.I],
  texto: [PH.T, PH.STRESS, PH.E_OPEN, PH.S, PH.T, PH.U],
  táxi: [PH.T, PH.STRESS, PH.A, PH.K, PH.S, PH.I],
  próximo: [PH.P, PH.R_TAP, PH.STRESS, PH.O_OPEN, PH.S, PH.I, PH.M, PH.U],
  auxílio: [PH.A, PH.W, PH.Z, PH.STRESS, PH.I, PH.L, PH.J, PH.U],
  muito: [PH.M, PH.STRESS, PH.U_NAS, PH.J_NAS, PH.T, PH.U],
  hoje: [PH.STRESS, PH.O, PH.ZH, PH.I],
  tênis: [PH.T, PH.STRESS, PH.E, PH.N, PH.I, PH.S],
  ontem: [PH.STRESS, PH.O_NAS, PH.T, PH.E_NAS, PH.J_NAS],
  homem: [PH.STRESS, PH.O, PH.M, PH.E_NAS, PH.J_NAS]
};
function textToPhonemes(texto, cfg = null) {
  const unkPolicy = cfg && cfg.g2p_unknown_policy || "skip";
  texto = (texto || "").normalize("NFC").toLowerCase().replace(/\s+/g, " ").trim();
  const tokens = _tokeniza(texto);
  const out = [];
  let sepPendente = false;
  for (const tok of tokens) {
    if (_ePontuacao(tok)) {
      const brk = PAUSA_MAIOR.has(tok) ? PH.PAUSE_MAJOR : PH.PAUSE_MINOR;
      if (out.length && out[out.length - 1] !== PH.PAUSE_MINOR && out[out.length - 1] !== PH.PAUSE_MAJOR) {
        out.push(brk);
      }
      sepPendente = false;
      continue;
    }
    const fon = _palavraParaFonemas(tok, unkPolicy);
    if (!fon.length) continue;
    if (out.length && sepPendente) out.push(PH.SPACE);
    out.push(...fon);
    sepPendente = true;
  }
  return out;
}
const _tokeniza = (texto) => texto.match(/[a-zà-öø-ÿ']+|[.!?…,;:—–]/giu) || [];
const _ePontuacao = (tok) => tok.length === 1 && PONTUACAO.has(tok);
const _palavraParaFonemas = (palavra, unkPolicy) => {
  if (palavra in HETERONIMOS) return [...HETERONIMOS[palavra]];
  if (_eEstrangeira(palavra)) return _loanwordFallback(palavra, unkPolicy);
  const [fonemas, idxTonica] = _convertePalavra(palavra);
  return _insereAcento(fonemas, idxTonica);
};
const _insereAcento = (fonemas, idxTonica) => {
  if (!fonemas.length) return fonemas;
  if (idxTonica < 0 || idxTonica >= fonemas.length) return fonemas;
  return [...fonemas.slice(0, idxTonica), PH.STRESS, ...fonemas.slice(idxTonica)];
};
const _contaGruposVocalicos = (palavra) => {
  const n = palavra.length;
  let i = 0;
  let c = 0;
  while (i < n) {
    const ch = palavra[i];
    if ((ch === "q" || ch === "g") && i + 1 < n && palavra[i + 1] === "u" && i + 2 < n && EI.has(palavra[i + 2])) {
      i += 2;
      continue;
    }
    if (ch === "q" && i + 1 < n && palavra[i + 1] === "u") {
      i += 2;
      continue;
    }
    if (LETRAS_VOGAIS.has(ch)) {
      c += 1;
      i += 1;
      if (i < n && IU.has(palavra[i]) && !IU.has(palavra[i - 1])) i += 1;
      continue;
    }
    i += 1;
  }
  return c;
};
const _posicaoTonica = (palavra) => {
  const total = _contaGruposVocalicos(palavra);
  if (total === 0) return 0;
  let grupoAcentuado = -1;
  let grupo = 0;
  const n = palavra.length;
  let i = 0;
  while (i < n) {
    const ch = palavra[i];
    if ((ch === "q" || ch === "g") && i + 1 < n && palavra[i + 1] === "u" && i + 2 < n && EI.has(palavra[i + 2])) {
      i += 2;
      continue;
    }
    if (ch === "q" && i + 1 < n && palavra[i + 1] === "u") {
      i += 2;
      continue;
    }
    if (LETRAS_VOGAIS.has(ch)) {
      if (ACUTOS.has(ch) || CIRCUNFLEXOS.has(ch) || TIL.has(ch)) grupoAcentuado = grupo;
      grupo += 1;
      i += 1;
      if (i < n && IU.has(palavra[i]) && !IU.has(palavra[i - 1])) i += 1;
      continue;
    }
    i += 1;
  }
  if (grupoAcentuado >= 0) return total - 1 - grupoAcentuado;
  const base = palavra.replace(/s+$/, "");
  if (endsWithAny(base, ["i", "u", "l", "r", "z", "n", "im", "um", "ns"])) return 0;
  if (endsWithAny(base, ["a", "e", "o", "am", "em", "en"])) return Math.min(1, total - 1);
  return 0;
};
const _rETap = (palavra, i) => {
  const n = palavra.length;
  const prox = i + 1 < n ? palavra[i + 1] : "";
  const prev = i > 0 ? palavra[i - 1] : "";
  if (!prox || !LETRAS_VOGAIS.has(prox)) return false;
  return LETRAS_VOGAIS.has(prev) || OBSTRUINTES.has(prev);
};
const _convertePalavra = (palavra) => {
  const fon = [];
  let idxTonica = -1;
  const n = palavra.length;
  const total = _contaGruposVocalicos(palavra);
  const alvo = total - 1 - _posicaoTonica(palavra);
  let grupo = 0;
  let i = 0;
  while (i < n) {
    const ch = palavra[i];
    const prox = i + 1 < n ? palavra[i + 1] : "";
    const prox2 = i + 2 < n ? palavra[i + 2] : "";
    if (ch === "n" && prox === "h") {
      fon.push(PH.NH);
      i += 2;
      continue;
    }
    if (ch === "l" && prox === "h") {
      fon.push(PH.LH);
      i += 2;
      continue;
    }
    if (ch === "c" && prox === "h") {
      fon.push(PH.SH);
      i += 2;
      continue;
    }
    if (ch === "r" && prox === "r") {
      fon.push(PH.R_STRONG);
      i += 2;
      continue;
    }
    if (ch === "s" && prox === "s") {
      fon.push(PH.S);
      i += 2;
      continue;
    }
    if (ch === "s" && prox === "c" && EI.has(prox2)) {
      fon.push(PH.S);
      i += 2;
      continue;
    }
    if (ch === "q" && prox === "u") {
      fon.push(PH.K);
      if (EI.has(prox2)) {
        i += 2;
      } else {
        fon.push(PH.W);
        i += 2;
      }
      continue;
    }
    if (ch === "g" && prox === "u" && EI.has(prox2)) {
      fon.push(PH.G);
      i += 2;
      continue;
    }
    if (ch === "r") {
      fon.push(_rETap(palavra, i) ? PH.R_TAP : PH.R_STRONG);
      i += 1;
      continue;
    }
    if (ch === "s") {
      if (i > 0 && i + 1 < n && LETRAS_VOGAIS.has(palavra[i - 1]) && LETRAS_VOGAIS.has(palavra[i + 1])) {
        fon.push(PH.Z);
      } else {
        fon.push(PH.S);
      }
      i += 1;
      continue;
    }
    if (ch === "x") {
      fon.push(PH.SH);
      i += 1;
      continue;
    }
    if (ch === "c") {
      fon.push(EI.has(prox) ? PH.S : PH.K);
      i += 1;
      continue;
    }
    if (ch === "ç") {
      fon.push(PH.S);
      i += 1;
      continue;
    }
    if (ch === "g") {
      fon.push(EI.has(prox) ? PH.ZH : PH.G);
      i += 1;
      continue;
    }
    if (ch === "j") {
      fon.push(PH.ZH);
      i += 1;
      continue;
    }
    if (ch === "t") {
      fon.push(II.has(prox) ? PH.TSH : PH.T);
      i += 1;
      continue;
    }
    if (ch === "d") {
      fon.push(II.has(prox) ? PH.DZH : PH.D);
      i += 1;
      continue;
    }
    if (ch === "h") {
      i += 1;
      continue;
    }
    if ("bfklmnpvz".includes(ch)) {
      fon.push(ch);
      i += 1;
      continue;
    }
    if (ch === "w") {
      fon.push(PH.V);
      i += 1;
      continue;
    }
    let cur = ch;
    if (cur === "y") cur = "i";
    if (LETRAS_VOGAIS.has(cur)) {
      const ehTonica = grupo === alvo;
      const base = ACENTO_BASE[cur] || cur;
      if (cur === "ã" && prox === "o") {
        if (ehTonica) idxTonica = fon.length;
        fon.push(PH.A_NAS);
        fon.push(PH.W_NAS);
        grupo += 1;
        i += 2;
        continue;
      }
      if (cur === "ã" && prox === "e") {
        if (ehTonica) idxTonica = fon.length;
        fon.push(PH.A_NAS);
        fon.push(PH.J_NAS);
        grupo += 1;
        i += 2;
        continue;
      }
      if (cur === "õ" && prox === "e") {
        if (ehTonica) idxTonica = fon.length;
        fon.push(PH.O_NAS);
        fon.push(PH.J_NAS);
        grupo += 1;
        i += 2;
        continue;
      }
      let nasal = false;
      let absorveNasal = false;
      if (TIL.has(cur)) {
        nasal = true;
      } else if (NM.has(prox)) {
        if (prox === "n" && prox2 === "h") {
          nasal = false;
        } else if (prox2 === "" || !LETRAS_VOGAIS.has(prox2)) {
          nasal = true;
          absorveNasal = true;
        }
      }
      let fonema;
      if (nasal) fonema = NASAL_MAP[base] || base;
      else if (ACUTOS.has(cur)) fonema = OPEN_MAP[base] || base;
      else if (CIRCUNFLEXOS.has(cur)) fonema = base;
      else fonema = base;
      if (ehTonica) idxTonica = fon.length;
      fon.push(fonema);
      grupo += 1;
      if (absorveNasal && i + 2 >= n && (base === "a" || base === "e")) {
        fon.push(base === "a" ? PH.W_NAS : PH.J_NAS);
        i += 2;
        continue;
      }
      if (!absorveNasal && i + 1 < n && IU.has(palavra[i + 1]) && cur !== "i" && cur !== "u") {
        fon.push(palavra[i + 1] === "i" ? PH.J : PH.W);
        i += 2;
        continue;
      }
      i += absorveNasal ? 2 : 1;
      continue;
    }
    i += 1;
  }
  let idx = idxTonica;
  let f = fon;
  [f, idx] = _removeNasalCoda(f, idx);
  [f, idx] = _vocalizaCodaL(f, idx);
  [f, idx] = _reduzFinal(f, idx);
  return [f, idx];
};
const _removeNasalCoda = (fon, idx) => {
  const nasais = /* @__PURE__ */ new Set([PH.A_NAS, PH.E_NAS, PH.I_NAS, PH.O_NAS, PH.U_NAS]);
  const out = [...fon];
  let j = out.length - 1;
  while (j >= 1) {
    if ((out[j] === "n" || out[j] === "m") && nasais.has(out[j - 1])) {
      out.splice(j, 1);
      if (idx > j) idx -= 1;
    }
    j -= 1;
  }
  return [out, idx];
};
const _vocalizaCodaL = (fon, idx) => {
  const out = [...fon];
  for (let k = 0; k < out.length; k++) {
    if (out[k] !== "l") continue;
    if (k === out.length - 1) {
      out[k] = PH.W;
      continue;
    }
    const prox = out[k + 1];
    const proxCons = CONSONANT_SET.has(prox) || prox.length > 1 && _CODA_L_CONS.has(prox[0]);
    if (proxCons && !VOWEL_SET.has(prox)) out[k] = PH.W;
  }
  return [out, idx];
};
const _reduzFinal = (fon, idx) => {
  const out = [...fon];
  if (!out.length) return [out, idx];
  let k = out.length - 1;
  if (SIBILANTE_CODA.has(out[k])) k -= 1;
  if (k < 0) return [out, idx];
  if (out[k] === "e" && k !== idx) {
    if (k >= 1 && out[k - 1] === "t") {
      out[k - 1] = PH.TSH;
      out[k] = PH.I;
    } else if (k >= 1 && out[k - 1] === "d") {
      out[k - 1] = PH.DZH;
      out[k] = PH.I;
    } else out[k] = PH.I;
  } else if (out[k] === "o" && k !== idx) {
    out[k] = PH.U;
  }
  return [out, idx];
};
const SEM_VOGAL_PT = /^[^aeiouáàâãéêíóôõúü]+$/i;
const APROX_LOAN = {
  a: ["a"],
  b: ["b"],
  c: ["k"],
  d: ["d"],
  e: ["e"],
  f: ["f"],
  g: ["g"],
  h: [],
  i: ["i"],
  j: [PH.ZH],
  k: ["k"],
  l: ["l"],
  m: ["m"],
  n: ["n"],
  o: ["o"],
  p: ["p"],
  q: ["k"],
  r: [PH.R_STRONG],
  s: ["s"],
  t: ["t"],
  u: ["u"],
  v: ["v"],
  w: ["w"],
  x: ["k", "s"],
  y: ["i"],
  z: ["z"]
};
const _eEstrangeira = (palavra) => SEM_VOGAL_PT.test(palavra) && palavra.length >= 2;
const _loanwordFallback = (palavra, unkPolicy) => {
  const out = [];
  for (const ch of palavra) {
    if (ch in APROX_LOAN) out.push(...APROX_LOAN[ch]);
    else if (unkPolicy === "unk") out.push("?");
  }
  return out;
};
const ABREV_NAO_QUEBRA = /* @__PURE__ */ new Set([
  "dr",
  "dra",
  "sr",
  "sra",
  "srta",
  "prof",
  "profa",
  "eng",
  "arq",
  "exmo",
  "exma",
  "sto",
  "sta",
  "jr",
  "av",
  "pç",
  "pça",
  "al",
  "rod",
  "trav",
  "pg",
  "pág",
  "cap",
  "vol",
  "ed",
  "tel",
  "cel",
  "ltda",
  "cia",
  "etc",
  "obs",
  "ref",
  "pe",
  "fr",
  "jan",
  "fev",
  "mar",
  "abr",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
  "att",
  "atte"
]);
const MASCARA_PONTO = "\0";
function chunkText(texto, cfg = null) {
  const maxChars = parseInt(cfg && cfg.max_chunk_chars || 240, 10) || 240;
  const minChars = parseInt(cfg && cfg.min_chunk_chars || 8, 10) || 8;
  const terminadores = cfg && cfg.sentence_terminators || ".!?…";
  const separadores = cfg && cfg.clause_separators || ";:,";
  texto = (texto || "").replace(/\s+/g, " ").trim();
  if (!texto) return [];
  const protegido = _protegePontos(texto, terminadores);
  const term = escapeRe(terminadores);
  const padraoSent = new RegExp(`[^${term}]*[${term}]+|.+$`, "g");
  const sentencas = (protegido.match(padraoSent) || []).map((s) => _restauraPontos(s).trim()).filter((s) => s);
  let blocos = [];
  for (const sent of sentencas) {
    if (sent.length <= maxChars) blocos.push(sent);
    else blocos.push(..._quebrarLongo(sent, maxChars, separadores));
  }
  const fundidos = [];
  for (const b of blocos) {
    if (fundidos.length && b.length < minChars) {
      fundidos[fundidos.length - 1] = `${fundidos[fundidos.length - 1]} ${b}`.trim();
    } else {
      fundidos.push(b);
    }
  }
  return fundidos;
}
const _protegePontos = (texto, terminadores) => {
  if (!terminadores.includes(".")) return texto;
  const chaves = [...ABREV_NAO_QUEBRA].sort((a, b) => b.length - a.length);
  const padrao = new RegExp(`\\b(${chaves.map(escapeRe).join("|")})\\.`, "gi");
  texto = texto.replace(padrao, (m, g1) => g1 + MASCARA_PONTO);
  texto = texto.replace(/\b([A-ZÁÀÂÃÉÊÍÓÔÕÚ])\./g, (m, g1) => g1 + MASCARA_PONTO);
  texto = texto.replace(/(\d)\.(\d)/g, (m, g1, g2) => g1 + MASCARA_PONTO + g2);
  return texto;
};
const _restauraPontos = (texto) => texto.replace(new RegExp(MASCARA_PONTO, "g"), ".");
const _quebrarLongo = (sent, maxChars, separadores) => {
  const sep = escapeRe(separadores);
  const pedacos = sent.split(new RegExp(`(?<=[${sep}])\\s+`));
  const out = [];
  let buf = "";
  for (const p of pedacos) {
    if (buf.length + p.length + 1 <= maxChars) {
      buf = `${buf} ${p}`.trim();
    } else {
      if (buf) out.push(buf);
      if (p.length <= maxChars) {
        buf = p;
      } else {
        out.push(..._quebrarPorEspaco(p, maxChars));
        buf = "";
      }
    }
  }
  if (buf) out.push(buf);
  return out;
};
const _quebrarPorEspaco = (texto, maxChars) => {
  const out = [];
  while (texto.length > maxChars) {
    let corte = texto.lastIndexOf(" ", maxChars);
    if (corte <= 0) corte = maxChars;
    out.push(texto.slice(0, corte).trim());
    texto = texto.slice(corte).trim();
  }
  if (texto) out.push(texto);
  return out;
};
let ort = null;
let depsPromise = null;
const ensureDeps = () => {
  if (depsPromise) return depsPromise;
  depsPromise = (async () => {
    const ortMod = await import("onnxruntime-web");
    ort = ortMod.default || ortMod;
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
let acousticSession = null;
let vocoderSession = null;
let vocab = null;
let manifest = null;
let voiceKey = null;
let initPromise = null;
let warmupPromise = null;
let robsStatus = {
  ready: false,
  modelCached: false,
  downloading: false,
  progress: 0,
  error: null,
  warming: false
};
const setStatus = (patch) => {
  robsStatus = { ...robsStatus, ...patch };
};
const resolveUrls = (voice) => {
  if (voice && typeof voice === "object") {
    return {
      acousticUrl: voice.acousticUrl,
      vocoderUrl: voice.vocoderUrl,
      manifestUrl: voice.manifestUrl
    };
  }
  const base = String(voice || "").replace(/\/+$/, "");
  return {
    acousticUrl: `${base}/acoustic.onnx`,
    vocoderUrl: `${base}/vocoder.onnx`,
    manifestUrl: `${base}/robsvoice.json`
  };
};
function encodeWav(samples, sampleRate) {
  const n = samples.length;
  const buffer = new ArrayBuffer(44 + n * 2);
  const view = new DataView(buffer);
  const writeStr = (off2, s) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off2 + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + n * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, n * 2, true);
  let off = 44;
  for (let i = 0; i < n; i++) {
    let s = samples[i];
    if (s > 1) s = 1;
    else if (s < -1) s = -1;
    view.setInt16(off, s < 0 ? s * 32768 : s * 32767, true);
    off += 2;
  }
  return new Blob([buffer], { type: "audio/wav" });
}
const concatFloat32 = (arrays) => {
  let total = 0;
  for (const a of arrays) total += a.length;
  const out = new Float32Array(total);
  let off = 0;
  for (const a of arrays) {
    out.set(a, off);
    off += a.length;
  }
  return out;
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
    synthCache.delete(synthCache.keys().next().value);
  }
};
const initRobs = async (voice, options = {}) => {
  const urls = resolveUrls(voice);
  const key = urls.manifestUrl;
  if (acousticSession && vocoderSession && robsStatus.ready && voiceKey === key) return true;
  if (initPromise && voiceKey === key) return initPromise;
  voiceKey = key;
  setStatus({ downloading: true, progress: 0, error: null, warming: true, ready: false });
  initPromise = (async () => {
    var _a, _b;
    try {
      await ensureDeps();
      const progress = (n) => {
        setStatus({ progress: n });
        if (options.onProgress) options.onProgress(n);
      };
      const res = await fetch(urls.manifestUrl);
      if (!res.ok) throw new Error(`Robs manifest fetch failed: ${res.status}`);
      manifest = await res.json();
      progress(10);
      const mapVersion = (_a = manifest == null ? void 0 : manifest.frontend) == null ? void 0 : _a.phoneme_map_version;
      if (mapVersion !== MAP_VERSION) {
        throw new Error(`Robs phoneme map_version mismatch: manifest=${mapVersion} runtime=${MAP_VERSION}. The frontend port and the voice artifact must share MAP_VERSION.`);
      }
      const idMap = (_b = manifest == null ? void 0 : manifest.frontend) == null ? void 0 : _b.phoneme_id_map;
      if (!idMap || typeof idMap !== "object") throw new Error("Robs manifest missing frontend.phoneme_id_map");
      const fe = manifest.frontend || {};
      vocab = makeVocab(idMap, {
        pad: fe.pad_token || "_",
        bos: fe.bos_token || "^",
        eos: fe.eos_token || "$",
        unk: fe.unk_token || "?"
      });
      const sessOpts = {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all"
      };
      acousticSession = await ort.InferenceSession.create(urls.acousticUrl, sessOpts);
      progress(60);
      vocoderSession = await ort.InferenceSession.create(urls.vocoderUrl, sessOpts);
      progress(90);
      warmupPromise = _synthOne("oi", options).then(() => {
        setStatus({ ready: true, modelCached: true, downloading: false, progress: 100, warming: false });
        progress(100);
        if (options.onReady) options.onReady();
      }).catch((err) => {
        setStatus({ downloading: false, error: err.message, warming: false });
        console.error("[RobsTTS] Warmup failed:", err);
        throw err;
      });
      return true;
    } catch (err) {
      acousticSession = null;
      vocoderSession = null;
      vocab = null;
      initPromise = null;
      warmupPromise = null;
      setStatus({ downloading: false, error: err.message, warming: false, ready: false });
      console.error("[RobsTTS] Init failed:", err);
      throw err;
    }
  })();
  return initPromise;
};
const preloadRobs = (voice, options = {}) => initRobs(voice, options);
const audioParams = () => {
  const a = manifest && manifest.audio || {};
  return { sampleRate: a.sample_rate || 22050, nMels: a.n_mels || 80 };
};
const _synthOne = async (chunk) => {
  audioParams();
  const normalized = normalizePtbr(chunk);
  const phonemes = textToPhonemes(normalized);
  const ids = vocab.encode(phonemes);
  const idData = BigInt64Array.from(ids.map((x) => BigInt(x)));
  const idTensor = new ort.Tensor("int64", idData, [1, ids.length]);
  const acOut = await acousticSession.run({ phoneme_ids: idTensor });
  const mel = acOut.mel || acOut[Object.keys(acOut)[0]];
  const melTensor = new ort.Tensor("float32", mel.data, mel.dims);
  const vocOut = await vocoderSession.run({ mel: melTensor });
  const wav = vocOut.wav || vocOut[Object.keys(vocOut)[0]];
  return new Float32Array(wav.data);
};
const robsSynthesize = async (text, options = {}) => {
  if (!acousticSession || !vocoderSession || !vocab) {
    throw new Error("Robs Voice not initialized. Call initRobs() first.");
  }
  if (warmupPromise) {
    try {
      await warmupPromise;
    } catch {
    }
  }
  const cacheKey = `${voiceKey}|${text}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { audioUrl: URL.createObjectURL(cached), blob: cached, cached: true };
  const { sampleRate } = audioParams();
  const chunks = chunkText(text);
  const parts = [];
  if (chunks.length === 0) {
    parts.push(new Float32Array(0));
  } else {
    for (const ch of chunks) parts.push(await _synthOne(ch));
  }
  const blob = encodeWav(concatFloat32(parts), sampleRate);
  cachePut(cacheKey, blob);
  return { audioUrl: URL.createObjectURL(blob), blob };
};
const getRobsStatus = () => ({ ...robsStatus });
const disposeRobs = () => {
  var _a, _b;
  try {
    (_a = acousticSession == null ? void 0 : acousticSession.release) == null ? void 0 : _a.call(acousticSession);
  } catch (e) {
  }
  try {
    (_b = vocoderSession == null ? void 0 : vocoderSession.release) == null ? void 0 : _b.call(vocoderSession);
  } catch (e) {
  }
  acousticSession = null;
  vocoderSession = null;
  vocab = null;
  manifest = null;
  voiceKey = null;
  initPromise = null;
  warmupPromise = null;
  synthCache.clear();
  robsStatus = { ready: false, modelCached: false, downloading: false, progress: 0, error: null, warming: false };
};
export {
  disposeRobs,
  encodeWav,
  getRobsStatus,
  initRobs,
  preloadRobs,
  robsSynthesize
};
