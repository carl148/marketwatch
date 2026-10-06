// Erzeugt die PNG-Icons (192, 512, 180) für Startbildschirm und App-Stores,
// ohne zusätzliche Bibliotheken: einfache Rastergrafik mit Kantenglättung.
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const GREEN = [27, 122, 82], GOLD = [201, 162, 39], RING = [138, 109, 16];

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const cover = d => Math.max(0, Math.min(1, 0.5 - d)); // d = vorzeichenbehafteter Abstand in Pixeln

function icon(size, rounded) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  const c = size / 2, s = size / 512;
  const rr = rounded ? 112 * s : 0;
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const px = x + 0.5, py = y + 0.5;
      // Abgerundetes Quadrat
      const qx = Math.max(Math.abs(px - c) - (c - rr), 0), qy = Math.max(Math.abs(py - c) - (c - rr), 0);
      const dBg = Math.hypot(qx, qy) - rr;
      const r = Math.hypot(px - c, py - c);
      let col = GREEN;
      col = mix(col, GOLD, cover(r - 168 * s));
      col = mix(col, RING, cover(Math.abs(r - 132 * s) - 8 * s));
      const a = rounded ? cover(dBg) : 1;
      const o = y * (size * 4 + 1) + 1 + x * 4;
      raw[o] = col[0]; raw[o + 1] = col[1]; raw[o + 2] = col[2]; raw[o + 3] = Math.round(a * 255);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

writeFileSync("public/icon-192.png", icon(192, true));
writeFileSync("public/icon-512.png", icon(512, false)); // vollflächig, auch als "maskable" nutzbar
writeFileSync("public/icon-180.png", icon(180, false)); // iOS rundet selbst ab
console.log("Icons erstellt.");
