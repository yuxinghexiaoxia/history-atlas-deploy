/* ============ 历史星图 · 导出工具函数 ============ */

/* 触发浏览器下载 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 200);
}
function downloadText(text, filename, type = "text/plain") {
  downloadBlob(new Blob([text], {
    type
  }), filename);
}

/* 导出为 Word：用 HTML 包装后改 MIME 为 msword */
function exportWord(entity, md) {
  const isP = entity.type === "person";
  const title = isP ? `${entity.name}（${entity.born}–${entity.died}）` : `${entity.name}（${entity.start}–${entity.end}）`;
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>
body{font-family:"Noto Serif SC",serif;line-height:1.85;color:#222;max-width:760px;margin:40px auto;padding:0 24px;}
h1{font-size:24px;color:#1a1304;border-bottom:2px solid #D4AF37;padding-bottom:10px;}
h2{font-size:18px;color:#1a1304;margin-top:28px;border-left:4px solid #D4AF37;padding-left:10px;}
p{margin:12px 0;}
ul{padding-left:22px;}
li{margin:8px 0;}
.source{color:#6b7280;font-size:13px;}
.quote{border-left:3px solid #D4AF37;background:#faf8f1;padding:12px 16px;margin:16px 0;color:#4a3b10;}
</style></head><body>
<h1>${title}</h1>
${markdownToHtml(md)}
</body></html>`;
  downloadBlob(new Blob([html], {
    type: "application/msword"
  }), `${title.replace(/[\/\\:*?"<>|]/g, "_")}.doc`);
}

/* 简单 Markdown → HTML（用于 Word 内嵌展示） */
function markdownToHtml(md) {
  // split by block-level elements first
  let html = md.replace(/^### (.*$)/gim, "<h3>$1</h3>").replace(/^## (.*$)/gim, "<h2>$1</h2>").replace(/^# (.*$)/gim, "<h1>$1</h1>").replace(/^\> (.*$)/gim, "<div class=\"quote\">$1</div>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // wrap list items in <ul>
  html = html.replace(/(<li>.*?<\/li>(\n|$))+/gs, m => `<ul>${m.replace(/\n/g, "")}</ul>`);
  // wrap remaining plain paragraphs
  html = html.split("\n\n").map(block => {
    const t = block.trim();
    if (!t) return "";
    if (/^<(h[1-3]|ul|div)/.test(t)) return t;
    return `<p>${t.replace(/\n/g, "<br/>")}</p>`;
  }).join("\n");
  return html;
}

/* 通用 Canvas 下载 */
function downloadCanvas(canvas, filename) {
  canvas.toBlob(blob => {
    if (blob) downloadBlob(blob, filename);
  }, "image/png");
}

/* 生成人物/事件信息长图（公众号配图） */
function generateEntityCard(entity, opts = {}) {
  const isP = entity.type === "person";
  const W = opts.width || 900;
  const pad = 48;
  const lineH = 34;
  const titleH = 52;
  const subH = 28;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // measure height first
  ctx.font = `700 ${titleH}px "Noto Serif SC",serif`;
  const titleW = ctx.measureText(entity.name).width;
  let y = pad + titleH;
  y += subH + 16;
  const blocks = [];
  if (isP) {
    blocks.push({
      t: "生平简介",
      v: entity.intro
    });
    blocks.push({
      t: "关键成就",
      v: entity.achievements.map((a, i) => `${i + 1}. ${a}`).join("\n")
    });
    blocks.push({
      t: "生平年表",
      v: entity.life.map(l => `${l.y} · ${l.t}：${l.s}`).join("\n")
    });
    blocks.push({
      t: "争议评价",
      v: entity.controversy
    });
  } else {
    blocks.push({
      t: "背景",
      v: entity.bg
    });
    blocks.push({
      t: "经过",
      v: entity.process
    });
    blocks.push({
      t: "结果影响",
      v: entity.result
    });
    blocks.push({
      t: "争议观点",
      v: entity.controversy
    });
  }
  ctx.font = `400 ${18}px "Noto Sans SC",sans-serif`;
  blocks.forEach(b => {
    y += 36; // section title
    const lines = wrapText(ctx, b.v, W - pad * 2, 18);
    y += lines.length * lineH + 28;
  });

  // sources
  y += 36;
  const srcLines = wrapText(ctx, "史料来源\n" + entity.sources.map(s => `[${s.lv}] ${s.t}`).join("\n"), W - pad * 2, 18);
  y += srcLines.length * lineH + 28;
  const H = Math.max(600, y + pad + 40);
  canvas.width = W * 2;
  canvas.height = H * 2;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.scale(2, 2);

  // background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#111827");
  bg.addColorStop(1, "#0B1020");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // header line
  ctx.fillStyle = "rgba(212,175,55,.18)";
  ctx.fillRect(pad, pad + titleH + 8, W - pad * 2, 2);

  // title
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#e8c75a";
  ctx.font = `700 ${titleH}px "Noto Serif SC",serif`;
  ctx.fillText(entity.name, pad, pad);

  // subtitle
  ctx.fillStyle = "#9CA3AF";
  ctx.font = `400 ${subH}px "Spectral",serif`;
  const sub = isP ? `${entity.born}–${entity.died} · ${entity.role.join(" · ")}` : `${entity.start}–${entity.end} · ${entity.place}`;
  ctx.fillText(sub, pad, pad + titleH + 14);
  y = pad + titleH + 14 + subH + 30;

  // blocks
  ctx.font = `400 18px "Noto Sans SC",sans-serif`;
  blocks.forEach(b => {
    ctx.fillStyle = "#D4AF37";
    ctx.font = `700 22px "Noto Serif SC",serif`;
    ctx.fillText(b.t, pad, y);
    y += 32;
    ctx.fillStyle = "#EAEAEA";
    ctx.font = `400 18px "Noto Sans SC",sans-serif`;
    const lines = wrapText(ctx, b.v, W - pad * 2, 18);
    lines.forEach(l => {
      ctx.fillText(l, pad, y);
      y += lineH;
    });
    y += 28;
  });

  // sources
  ctx.fillStyle = "#D4AF37";
  ctx.font = `700 22px "Noto Serif SC",serif`;
  ctx.fillText("史料来源", pad, y);
  y += 32;
  ctx.fillStyle = "#9CA3AF";
  ctx.font = `400 17px "Noto Sans SC",sans-serif`;
  const srcs = wrapText(ctx, entity.sources.map(s => `[${s.lv}] ${s.t}`).join("\n"), W - pad * 2, 17);
  srcs.forEach(l => {
    ctx.fillText(l, pad, y);
    y += lineH;
  });

  // watermark
  ctx.fillStyle = "rgba(255,255,255,.12)";
  ctx.font = `15px "Noto Sans SC",sans-serif`;
  ctx.fillText("历史星图 History Atlas · 站内结构化史料", pad, H - 28);
  return canvas;
}

/* 文本换行 */
function wrapText(ctx, text, maxWidth, fontSize) {
  ctx.font = `400 ${fontSize}px "Noto Sans SC",sans-serif`;
  const lines = [];
  const pars = String(text || "").split("\n");
  pars.forEach(p => {
    let cur = "";
    const chars = Array.from(p);
    for (const ch of chars) {
      const test = cur + ch;
      if (ctx.measureText(test).width > maxWidth && cur) {
        lines.push(cur);
        cur = ch;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
  });
  return lines;
}

/* 记录导出行为 */
function recordExport(entity, format) {
  Store.addExport({
    id: entity.id,
    type: entity.type,
    name: entity.name,
    format
  });
}

/* 将 SVG 元素导出为 PNG */
function exportSvgAsPng(svgEl, filename) {
  return new Promise((resolve, reject) => {
    const rect = svgEl.getBoundingClientRect();
    const serializer = new XMLSerializer();
    let svgStr = serializer.serializeToString(svgEl);
    // inline computed styles roughly by cloning current inline styles
    const clone = svgEl.cloneNode(true);
    // ensure xmlns
    if (!clone.getAttribute("xmlns")) clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgStr = serializer.serializeToString(clone);
    const img = new Image();
    const blob = new Blob([svgStr], {
      type: "image/svg+xml;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#0B1020";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      downloadCanvas(canvas, filename);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = url;
  });
}
Object.assign(window, {
  downloadBlob,
  downloadText,
  exportWord,
  downloadCanvas,
  generateEntityCard,
  wrapText,
  recordExport,
  exportSvgAsPng
});