import type { Book, Verse, IndexEntry } from './types';
import { GENESIS_CHAPTERS } from './bible/genesis';
import { EXODUS_CHAPTERS } from './bible/exodus';
import { LEVITICUS_CHAPTERS } from './bible/leviticus';
import { NUMBERS_CHAPTERS } from './bible/numbers';
import { DEUTERONOMY_CHAPTERS } from './bible/deuteronomy';
import { JOSHUA_CHAPTERS } from './bible/joshua';
import { JUDGES_CHAPTERS } from './bible/judges';
import { RUTH_CHAPTERS } from './bible/ruth';
import { SAMUEL1_CHAPTERS } from './bible/1samuel';
import { SAMUEL2_CHAPTERS } from './bible/2samuel';
import { KINGS1_CHAPTERS } from './bible/1kings';
import { KINGS2_CHAPTERS } from './bible/2kings';
import { CHRONICLES1_CHAPTERS } from './bible/1chronicles';
import { CHRONICLES2_CHAPTERS } from './bible/2chronicles';
import { EZRA_CHAPTERS } from './bible/ezra';
import { NEHEMIAH_CHAPTERS } from './bible/nehemiah';
import { ESTHER_CHAPTERS } from './bible/esther';
import { JOB_CHAPTERS } from './bible/job';
import { PSALMS_CHAPTERS } from './bible/psalms';
import { PROVERBS_CHAPTERS } from './bible/proverbs';
import { ECCLESIASTES_CHAPTERS } from './bible/ecclesiastes';
import { SONG_OF_SOLOMON_CHAPTERS } from './bible/songofsolomon';
import { ISAIAH_CHAPTERS } from './bible/isaiah';
import { JEREMIAH_CHAPTERS } from './bible/jeremiah';
import { LAMENTATIONS_CHAPTERS } from './bible/lamentations';
import { EZEKIEL_CHAPTERS } from './bible/ezekiel';
import { DANIEL_CHAPTERS } from './bible/daniel';
import { HOSEA_CHAPTERS } from './bible/hosea';
import { JOEL_CHAPTERS } from './bible/joel';
import { AMOS_CHAPTERS } from './bible/amos';
import { OBADIAH_CHAPTERS } from './bible/obadiah';
import { JONAH_CHAPTERS } from './bible/jonah';
import { MICAH_CHAPTERS } from './bible/micah';
import { NAHUM_CHAPTERS } from './bible/nahum';
import { HABAKKUK_CHAPTERS } from './bible/habakkuk';
import { ZEPHANIAH_CHAPTERS } from './bible/zephaniah';
import { HAGGAI_CHAPTERS } from './bible/haggai';
import { ZECHARIAH_CHAPTERS } from './bible/zechariah';
import { MALACHI_CHAPTERS } from './bible/malachi';
import { MATTHEW_CHAPTERS } from './bible/matthew';
import { MARK_CHAPTERS } from './bible/mark';
import { LUKE_CHAPTERS } from './bible/luke';
import { JOHN_CHAPTERS } from './bible/john';
import { ACTS_CHAPTERS } from './bible/acts';
import { ROMANS_CHAPTERS } from './bible/romans';
import { CORINTHIANS1_CHAPTERS } from './bible/1corinthians';
import { CORINTHIANS2_CHAPTERS } from './bible/2corinthians';
import { GALATIANS_CHAPTERS } from './bible/galatians';
import { EPHESIANS_CHAPTERS } from './bible/ephesians';
import { PHILIPPIANS_CHAPTERS } from './bible/philippians';
import { COLOSSIANS_CHAPTERS } from './bible/colossians';
import { THESSALONIANS1_CHAPTERS } from './bible/1thessalonians';
import { THESSALONIANS2_CHAPTERS } from './bible/2thessalonians';
import { TIMOTHY1_CHAPTERS } from './bible/1timothy';
import { TIMOTHY2_CHAPTERS } from './bible/2timothy';
import { TITUS_CHAPTERS } from './bible/titus';
import { PHILEMON_CHAPTERS } from './bible/philemon';
import { HEBREWS_CHAPTERS } from './bible/hebrews';
import { JAMES_CHAPTERS } from './bible/james';
import { PETER1_CHAPTERS } from './bible/1peter';
import { PETER2_CHAPTERS } from './bible/2peter';
import { JOHN1_CHAPTERS } from './bible/1john';
import { JOHN2_CHAPTERS } from './bible/2john';
import { JOHN3_CHAPTERS } from './bible/3john';
import { JUDE_CHAPTERS } from './bible/jude';
import { REVELATION_CHAPTERS } from './bible/revelation';

export const BOOKS: Book[] = [
  { n: 'Genesa', a: 'Ge', c: 50, t: 'ot' }, { n: 'Eksoda', a: 'Ek', c: 40, t: 'ot' }, { n: 'Levhitika', a: 'Le', c: 27, t: 'ot' },
  { n: 'Tinhlayo', a: 'Ti', c: 36, t: 'ot' }, { n: 'Deteronoma', a: 'De', c: 34, t: 'ot' }, { n: 'Yoxuwa', a: 'Yx', c: 24, t: 'ot' },
  { n: 'Vaavanyisi', a: 'Vv', c: 21, t: 'ot' }, { n: 'Rhuti', a: 'Rh', c: 4, t: 'ot' }, { n: '1 Samuwele', a: '1S', c: 31, t: 'ot' },
  { n: '2 Samuwele', a: '2S', c: 24, t: 'ot' }, { n: '1 Tihosi', a: '1T', c: 22, t: 'ot' }, { n: '2 Tihosi', a: '2T', c: 25, t: 'ot' },
  { n: '1 Tikronika', a: '1K', c: 29, t: 'ot' }, { n: '2 Tikronika', a: '2K', c: 36, t: 'ot' }, { n: 'Ezra', a: 'Ez', c: 10, t: 'ot' },
  { n: 'Nehemiya', a: 'Ne', c: 13, t: 'ot' }, { n: 'Estere', a: 'Et', c: 10, t: 'ot' }, { n: 'Yobo', a: 'Yb', c: 42, t: 'ot' },
  { n: 'Tipisalema', a: 'Tp', c: 150, t: 'ot' }, { n: 'Swivuriso', a: 'Sw', c: 31, t: 'ot' }, { n: 'Mutshahuri', a: 'Mu', c: 12, t: 'ot' },
  { n: 'Risimu ra Solomoni', a: 'Rs', c: 8, t: 'ot' }, { n: 'Esaya', a: 'Es', c: 66, t: 'ot' }, { n: 'Yeremiya', a: 'Ye', c: 52, t: 'ot' },
  { n: 'Swirilo', a: 'Sr', c: 5, t: 'ot' }, { n: 'Ezekiyele', a: 'Zk', c: 48, t: 'ot' }, { n: 'Daniyele', a: 'Dn', c: 12, t: 'ot' },
  { n: 'Hosea', a: 'Ho', c: 14, t: 'ot' }, { n: 'Yowele', a: 'Yw', c: 3, t: 'ot' }, { n: 'Amosi', a: 'Am', c: 9, t: 'ot' },
  { n: 'Obadiya', a: 'Ob', c: 1, t: 'ot' }, { n: 'Yonasi', a: 'Yn', c: 4, t: 'ot' }, { n: 'Mikiya', a: 'Mi', c: 7, t: 'ot' },
  { n: 'Nahume', a: 'Na', c: 3, t: 'ot' }, { n: 'Habakuku', a: 'Hb', c: 3, t: 'ot' }, { n: 'Sofoniya', a: 'So', c: 3, t: 'ot' },
  { n: 'Hagayi', a: 'Hg', c: 2, t: 'ot' }, { n: 'Zakariya', a: 'Za', c: 14, t: 'ot' }, { n: 'Malaki', a: 'Ml', c: 4, t: 'ot' },
  { n: 'Matewu', a: 'Mt', c: 28, t: 'nt' }, { n: 'Marka', a: 'Mk', c: 16, t: 'nt' }, { n: 'Luka', a: 'Lu', c: 24, t: 'nt' },
  { n: 'Yohane', a: 'Yh', c: 21, t: 'nt' }, { n: 'Mintirho', a: 'Mn', c: 28, t: 'nt' }, { n: 'Varhoma', a: 'Vr', c: 16, t: 'nt' },
  { n: '1 Vakorinto', a: '1Ko', c: 16, t: 'nt' }, { n: '2 Vakorinto', a: '2Ko', c: 13, t: 'nt' }, { n: 'Vagalatiya', a: 'Vg', c: 6, t: 'nt' },
  { n: 'Vaefesa', a: 'Ve', c: 6, t: 'nt' }, { n: 'Vafilipiya', a: 'Vf', c: 4, t: 'nt' }, { n: 'Vakolosa', a: 'Vk', c: 4, t: 'nt' },
  { n: '1 Vatesalonika', a: '1Va', c: 5, t: 'nt' }, { n: '2 Vatesalonika', a: '2Va', c: 3, t: 'nt' }, { n: '1 Timotiya', a: '1Ti', c: 6, t: 'nt' },
  { n: '2 Timotiya', a: '2Ti', c: 4, t: 'nt' }, { n: 'Tito', a: 'To', c: 3, t: 'nt' }, { n: 'Filemoni', a: 'Fl', c: 1, t: 'nt' },
  { n: 'VahEberu', a: 'He', c: 13, t: 'nt' }, { n: 'Yakobo', a: 'Yk', c: 5, t: 'nt' }, { n: '1 Petro', a: '1Pe', c: 5, t: 'nt' },
  { n: '2 Petro', a: '2Pe', c: 3, t: 'nt' }, { n: '1 Yohane', a: '1Yh', c: 5, t: 'nt' }, { n: '2 Yohane', a: '2Yh', c: 1, t: 'nt' },
  { n: '3 Yohane', a: '3Yh', c: 1, t: 'nt' }, { n: 'Yuda', a: 'Yd', c: 1, t: 'nt' }, { n: 'Nhlavutelo', a: 'Nh', c: 22, t: 'nt' },
];

const POOL: string[] = [
  'Hosi i murisi wa mina, a ndzi nga pfumali nchumu.',
  'Xikwembu i vutumbelo bya hina ni matimba, mupfuni la kumekaka hi nkarhi wa maxangu.',
  'Rito ra wena i rivoni eka mikondzo ya mina, ni ku vonakala endleleni ya mina.',
  'Tirhelani Hosi hi ku tsaka, tanani emahlweni ka yena hi risimu.',
  'Loyi a tshamaka evukhomelweni bya La Nge Henhla u ta wisa endzhutini wa Lowa Matimba.',
  'Rhandzanani, hikuva rirhandzu ri huma eka Xikwembu; un\u2019wana ni un\u2019wana la rhandzaka u velekiwile hi Xikwembu.',
  'Hi ku pfumela hi twisisa leswaku misava yi vumbiwile hi rito ra Xikwembu.',
  'Ku ni nkarhi wa hinkwaswo: nkarhi wo velekiwa ni nkarhi wo fa, nkarhi wo rila ni nkarhi wo hleka.',
  'Vusiku byi hundzile, ni siku ri tshinele; a hi tshike mintirho ya munyama hi ambala matlhari ya ku vonakala.',
  'Kombela, mi ta nyikiwa; lavani, mi ta kuma; gongondzani, mi ta pfulelwa.',
  'Loyi a tshembaka Hosi u ta pfuxeta matimba ya yena; u ta haha kukota tigama.',
  'Vanhu hinkwavo va dyoha, va pfumaleka ku vangama ka Xikwembu.',
  'Ndzi ta ku sekula, ndzi ta ku pfuna; ndzi ta ku khoma hi voko ra mina ra xinene ra ku lulama.',
  'Tsakani minkarhi hinkwayo; khongelani mi nga tshiki; nkhensani eka hinkwaswo.',
];

// Registo de todos os livros com capítulos reais disponíveis, indexado pela posição em BOOKS.
// Livros ainda não preenchidos ficam 'undefined' e caem no gerador de fallback abaixo.
const REAL_CHAPTERS: (Record<number, Verse[]> | undefined)[] = [
  GENESIS_CHAPTERS,
  EXODUS_CHAPTERS,
  LEVITICUS_CHAPTERS,
  NUMBERS_CHAPTERS,
  DEUTERONOMY_CHAPTERS,
  JOSHUA_CHAPTERS,
  JUDGES_CHAPTERS,
  RUTH_CHAPTERS,
  SAMUEL1_CHAPTERS,
  SAMUEL2_CHAPTERS,
  KINGS1_CHAPTERS,
  KINGS2_CHAPTERS,
  CHRONICLES1_CHAPTERS,
  CHRONICLES2_CHAPTERS,
  EZRA_CHAPTERS,
  NEHEMIAH_CHAPTERS,
  ESTHER_CHAPTERS,
  JOB_CHAPTERS,
  PSALMS_CHAPTERS,
  PROVERBS_CHAPTERS,
  ECCLESIASTES_CHAPTERS,
  SONG_OF_SOLOMON_CHAPTERS,
  ISAIAH_CHAPTERS,
  JEREMIAH_CHAPTERS,
  LAMENTATIONS_CHAPTERS,
  EZEKIEL_CHAPTERS,
  DANIEL_CHAPTERS,
  HOSEA_CHAPTERS,
  JOEL_CHAPTERS,
  AMOS_CHAPTERS,
  OBADIAH_CHAPTERS,
  JONAH_CHAPTERS,
  MICAH_CHAPTERS,
  NAHUM_CHAPTERS,
  HABAKKUK_CHAPTERS,
  ZEPHANIAH_CHAPTERS,
  HAGGAI_CHAPTERS,
  ZECHARIAH_CHAPTERS,
  MALACHI_CHAPTERS,
  MATTHEW_CHAPTERS,
  MARK_CHAPTERS,
  LUKE_CHAPTERS,
  JOHN_CHAPTERS,
  ACTS_CHAPTERS,
  ROMANS_CHAPTERS,
  CORINTHIANS1_CHAPTERS,
  CORINTHIANS2_CHAPTERS,
  GALATIANS_CHAPTERS,
  EPHESIANS_CHAPTERS,
  PHILIPPIANS_CHAPTERS,
  COLOSSIANS_CHAPTERS,
  THESSALONIANS1_CHAPTERS,
  THESSALONIANS2_CHAPTERS,
  TIMOTHY1_CHAPTERS,
  TIMOTHY2_CHAPTERS,
  TITUS_CHAPTERS,
  PHILEMON_CHAPTERS,
  HEBREWS_CHAPTERS,
  JAMES_CHAPTERS,
  PETER1_CHAPTERS,
  PETER2_CHAPTERS,
  JOHN1_CHAPTERS,
  JOHN2_CHAPTERS,
  JOHN3_CHAPTERS,
  JUDE_CHAPTERS,
  REVELATION_CHAPTERS,
];

function rng(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export function versesFor(bi: number, ch: number): Verse[] {
  // Se o livro tiver capítulos reais registados e este capítulo existir, usa-o.
  const real = REAL_CHAPTERS[bi];
  if (real && real[ch]) {
    return real[ch];
  }
  
  // Fallback gerador por semente para outros capítulos/livros
  const r = rng(bi * 1000 + ch + 7);
  const count = 12 + Math.floor(r() * 22);
  const out: Verse[] = [];
  for (let i = 1; i <= count; i++) out.push({ n: i, text: POOL[Math.floor(r() * POOL.length)] });
  return out;
}

let _index: IndexEntry[] | null = null;
export function searchIndex(): IndexEntry[] {
  if (_index) return _index;
  
  // Mapeia de forma dinâmica os capítulos reais de todos os livros já preenchidos em src/bible/*.
  const pairs: [number, number][] = [];
  REAL_CHAPTERS.forEach((chapters, bi) => {
    if (!chapters) return;
    Object.keys(chapters).forEach((ch) => pairs.push([bi, Number(ch)]));
  });
  
  // Adiciona as outras referências originais do seu POOL que estavam no código
  pairs.push([18, 23], [18, 1], [19, 3], [43, 3], [39, 5], [42, 6]);
  
  const idx: IndexEntry[] = [];
  pairs.forEach(([bi, ch]) => versesFor(bi, ch).forEach((v) => idx.push({ bi, ch, n: v.n, text: v.text })));
  _index = idx;
  return idx;
}