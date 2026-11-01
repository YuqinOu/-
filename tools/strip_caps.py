import io, re, sys, os
os.chdir(r'E:/扬子/site')

p = 'main.js'
s = open(p, encoding='utf-8').read()

start = s.index("      fig.innerHTML = `")
end = s.index("      `;", start) + len("      `;")
new_block = (
    "      fig.innerHTML = `\n"
    "        ${film ? '<span class=\"perf top\"></span>' : ''}\n"
    "        <img src=\"assets/img/p${pad(p.id)}.jpg\"\n"
    "             alt=\"舒名扬与朋友的照片\"\n"
    "             width=\"${p.w}\" height=\"${p.h}\"\n"
    "             loading=\"lazy\" decoding=\"async\"\n"
    "             style=\"aspect-ratio:${p.w}/${p.h}\">\n"
    "        ${film ? '<span class=\"perf bot\"></span>' : ''}\n"
    "      `;"
)
s = s[:start] + new_block + s[end:]

s = s.replace(
    "      const est = (p.h / p.w) * 100 + 60 + p.s.length * 0.7 + (film ? 16 : 0);",
    "      const est = (p.h / p.w) * 100 + (film ? 16 : 0);")

s = s.replace(
    '<span class="chapter-note">${pad(items.length)} 张 · ${ch.note}</span>',
    '<span class="chapter-note">${pad(items.length)} 张</span>')

open(p, 'w', encoding='utf-8').write(s)
print('main.js ok')

p = 'styles.css'
c = open(p, encoding='utf-8').read()
c = c.replace("  background:var(--card);\n  padding:10px 10px 0;",
              "  background:var(--card);\n  padding:10px;")
c = c.replace("  background:#241a20; padding:10px 9px 0;",
              "  background:#241a20; padding:10px 9px;")
open(p, 'w', encoding='utf-8').write(c)
print('styles ok')
