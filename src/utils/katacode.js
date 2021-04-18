/*! kata-code | DSRKafuU (https://dsrkafuu.su) | Copyright (c) MIT License */

// katakana char code dict ア~モ(35)
// katakana char code split ヤ~ン(11)
const DICT = [
  12449,
  12451,
  12453,
  12455,
  12457,
  12459,
  12461,
  12463,
  12465,
  12467,
  12469,
  12471,
  12473,
  12475,
  12477,
  12479,
  12481,
  12483,
  12486,
  12488,
  12490,
  12491,
  12492,
  12493,
  12494,
  12495,
  12498,
  12501,
  12504,
  12507,
  12510,
  12511,
  12512,
  12513,
  12514,
  12515,
];

// dict of idx to char
const DICT_IDX_CHAR = Object.create(null);
let idx = 0;
for (let i = 0; i < DICT.length - 1; i++) {
  const val = [];
  for (let j = DICT[i]; j < DICT[i + 1]; j++) {
    val.push(String.fromCodePoint(j));
  }
  DICT_IDX_CHAR[idx.toString(35)] = val;
  idx++;
}
DICT_IDX_CHAR['|'] = [];
for (let i = 12515; i <= 12531; i++) {
  if (i === 12528 || i === 12529) continue;
  DICT_IDX_CHAR['|'].push(String.fromCodePoint(i));
}

// dict of char to idx
const DICT_CHAR_IDX = Object.create(null);
for (let key of Object.keys(DICT_IDX_CHAR)) {
  const val = DICT_IDX_CHAR[key] || [];
  val.forEach((char) => (DICT_CHAR_IDX[char] = key));
}

/**
 * random idx
 * @param {number} length
 */
function rand(length) {
  return Math.floor(Math.random() * length);
}

/**
 * @param {string} str
 * @returns {Promise<string>}
 */
export async function encodeKata(str) {
  if (typeof str !== 'string' || !str) {
    return '';
  }

  const data = [];
  for (let char of str) {
    const charCode = char.codePointAt(0).toString(35);
    let out = '';
    for (let code of charCode) {
      out += DICT_IDX_CHAR[code][rand(DICT_IDX_CHAR[code].length)];
    }
    data.push(out);
    data.push(DICT_IDX_CHAR['|'][rand(DICT_IDX_CHAR['|'].length)]);
  }
  data.pop();
  return data.join('');
}

/**
 * @param {string} str
 * @returns {Promise<string>}
 */
export async function decodeKata(str) {
  if (typeof str !== 'string' || !str) {
    return '';
  }
  let tmp = '';
  for (let char of str) {
    tmp += DICT_CHAR_IDX[char];
  }
  const res = tmp.split('|');
  return res
    .map((val) => {
      const code = Number.parseInt(val, 35);
      return String.fromCodePoint(code);
    })
    .join('');
}
