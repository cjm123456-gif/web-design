# DESIGN.md

> 以一束穿过高校知识边界的紫色智能光弧，纯粹呈现智能体的能力、场景、价值与成品形态。

## 1. Visual Theme & Atmosphere

**Style**: 黑紫未来教育 / Dark EdTech Editorial  
**Keywords**: 深黑、紫色光弧、高校智能体、精密网格、场景连接、克制发光、数据感、中性标识  
**Tone**: 专业、前沿、可靠、面向高校决策者 — NOT 游戏化赛博朋克、廉价霓虹、过度活泼  
**Feel**: 像站在数字校园的夜空下，看见一道智能光弧把课程、知识与服务连接起来。

**Interaction Tier**: L2 流畅交互  
**Dependencies**: CSS + Vanilla JavaScript（IntersectionObserver、requestAnimationFrame）；不引入 GSAP、Lenis 或 WebGL  
**Language**: 简体中文  
**Primary Audience**: 高校领导、教务部门、信息化部门、院系负责人、教师与学生  
**Branding Rule**: 使用中性的“高校智能体 / AI Agent Showcase”产品展示标识；页面不出现公司名称、Logo、地区、资质、联系方式或企业宣传表达

### Page Narrative

1. 固定导航：中性智能体标识、智能体概览、能力场景、应用价值与成果展示。
2. Hero：紫色弧形能量场 + 核心价值主张 + 双 CTA。
3. 能力概览条：说明核心服务维度、覆盖流程、场景类型与持续迭代能力。
4. 智能体概览：解释高校智能体如何连接知识、用户与服务场景。
5. 智能体能力场景：六类能力卡片，覆盖知识、教学、咨询、洞察、科研与定制场景。
6. 应用价值：整段紫色背景，展示统一知识入口、教学支持、服务连接与持续生长。
7. 成品展示：不等大 Bento 卡片，预留智能体名称、场景、截图和能力说明。
8. 建设路径与探索更多：以纯产品叙事收束页面，不设置企业联系入口。

### Landing Page Signature Moments

- **Hero 爆点**：紫色地平线球体内叠加三层低对比度液态能量纹理，以 18/24/30 秒错速漂移；外圈紫色条带由 SVG 正弦曲线逐帧重绘，内外边界以不同振幅和频率形成连续波动；精细指针可带动球面和场景标签做低幅度、可中断的直接跟随。
- **首次滑动爆点**：Hero 下方使用五节点能力脉冲轨道；固定等分布局覆盖宽屏，一束紫色信号光沿轨道低速巡航，不依赖重复文字长度。
- **展示区爆点**：不等大的 Spotlight Bento 成品卡片，聚光位置随鼠标移动。
- **巧思**：主 CTA hover 时，一颗智能光点沿按钮边缘掠过一次；只作为细节反馈，不循环干扰。

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #050507;
  --bg-rgb: 5, 5, 7;
  --surface: #0d0d12;
  --surface-rgb: 13, 13, 18;
  --surface-alt: #12101c;
  --surface-alt-rgb: 18, 16, 28;
  --surface-hover: #171326;
  --surface-hover-rgb: 23, 19, 38;
  --surface-purple: #25066b;
  --surface-purple-rgb: 37, 6, 107;

  /* Borders */
  --border: #2b2934;
  --border-rgb: 43, 41, 52;
  --border-strong: #504967;
  --border-strong-rgb: 80, 73, 103;
  --border-hover: #8b5cf6;
  --border-hover-rgb: 139, 92, 246;

  /* Text */
  --text: #f7f5fb;
  --text-rgb: 247, 245, 251;
  --text-secondary: #b6b1c2;
  --text-secondary-rgb: 182, 177, 194;
  --text-tertiary: #817b8e;
  --text-tertiary-rgb: 129, 123, 142;
  --text-on-purple: #ffffff;
  --text-on-purple-rgb: 255, 255, 255;

  /* Accent */
  --accent: #6d28d9;
  --accent-rgb: 109, 40, 217;
  --accent-bright: #8b5cf6;
  --accent-bright-rgb: 139, 92, 246;
  --accent-soft: #c4b5fd;
  --accent-soft-rgb: 196, 181, 253;
  --accent-hover: #7c3aed;
  --accent-hover-rgb: 124, 58, 237;
  /* Semantic */
  --success: #42d392;
  --success-rgb: 66, 211, 146;
  --error: #ff6b6b;
  --error-rgb: 255, 107, 107;
  --warning: #f5c451;
  --warning-rgb: 245, 196, 81;

  /* Gradients */
  --gradient-accent: linear-gradient(135deg, var(--accent-soft), var(--accent-bright) 48%, var(--accent));
  --gradient-purple-band: linear-gradient(115deg, var(--surface-purple), var(--accent) 62%, var(--surface-purple));
  --gradient-hero-arc: radial-gradient(ellipse at 50% 115%, rgba(var(--accent-bright-rgb), 0.95) 0%, rgba(var(--accent-rgb), 0.58) 28%, rgba(var(--accent-rgb), 0.16) 48%, rgba(var(--bg-rgb), 0) 69%);
}
```

**Color Rules:**

- 所有页面颜色必须通过变量引用；组件和脚本中禁止直接写十六进制颜色。
- 紫色是唯一的大面积强调色；中性产品标识同样使用紫色体系。
- 语义红色只用于错误状态，不参与视觉装饰。
- 正文必须使用 `--text-secondary`，辅助信息使用 `--text-tertiary`，避免整页纯白造成刺眼。
- 卡片 hover 通过边框、背景和柔和 glow 表达，不以高亮纯色填满整张卡。
- 语义色仅用于状态反馈，不参与装饰。

## 3. Typography Rules

**Font Stack:**

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', system-ui, sans-serif;
  --font-latin: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif;
}
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---:|---:|---:|---:|
| Hero H1 | System Display + 中文系统字体 | `clamp(2.75rem, 6vw, 5.5rem)` | 800 | 1.08 | -0.025em |
| Section H2 | System Display + 中文系统字体 | `clamp(2rem, 4vw, 3.25rem)` | 700 | 1.22 | -0.025em |
| H3 | System Text + 中文系统字体 | `clamp(1.125rem, 2vw, 1.375rem)` | 650 | 1.45 | 0 |
| Body Large | System Text + 中文系统字体 | `clamp(1rem, 1.5vw, 1.125rem)` | 400 | 1.8 | 0 |
| Body | System Text + 中文系统字体 | `1rem` | 400 | 1.8 | 0 |
| Label / Eyebrow | System Display + 中文系统字体 | `0.75rem` | 700 | 1.5 | 0.16em |
| Metric | System Display + 中文系统字体 | `clamp(1.75rem, 3vw, 2.75rem)` | 700 | 1.1 | -0.04em |

**Typography Rules:**

- 中文正文最小 16px、行高不低于 1.7；移动端同样不缩小正文。
- 标题短句化；Hero 主标题最多三行，桌面端每行建议不超过 15 个汉字。
- 英文数字使用 `--font-latin`；中文优先使用操作系统原生字体，macOS/iOS 自然落到苹方，Windows 回退到微软雅黑。
- 强调通过字重、颜色与留白完成，不连续使用全角感叹号。
- **NEVER use**: Comic Sans、楷体、华文彩云、纯英文字体栈、装饰性手写体。

**Text Decoration:**

- Hero H1：主体纯白；仅“高校智能体”关键词使用 `--gradient-accent` 渐变，不叠加文字阴影。
- Section H2：主体纯白，可在每个标题中选择一个关键词使用紫色或渐变；同屏最多一处。
- Eyebrow：使用大写英文或短中文标签，带 2px 紫色短线，不使用投影。
- 正文：不使用渐变、投影或描边。

## 4. Component Stylings

### Buttons

```css
.button {
  --press-scale: 1;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-strong);
  border-radius: 0.78rem;
  background: var(--surface);
  color: var(--text);
  font: 600 0.9375rem/1 var(--font-sans);
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  transform: scale(var(--press-scale));
  touch-action: manipulation;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms ease, background 180ms ease, box-shadow 320ms ease, color 180ms ease;
}

.button--primary {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--text-on-purple);
  box-shadow: 0 10px 30px rgba(var(--accent-rgb), 0.24);
}

.button:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
}

.button--primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 14px 36px rgba(var(--accent-rgb), 0.34);
}

.button:active {
  --press-scale: 0.97;
  box-shadow: none;
  transition-duration: 90ms;
}

.button:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: 4px;
}

.button:disabled,
.button[aria-disabled='true'] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
  --press-scale: 1;
  box-shadow: none;
}
```

### Cards

```css
.card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--surface);
  color: var(--text);
  isolation: isolate;
  transition: transform 240ms ease, border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-bright-rgb), 0.18), rgba(var(--surface-rgb), 0) 68%);
  transition: opacity 240ms ease;
}

.card:hover,
.card:focus-within {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  background: var(--surface-hover);
  box-shadow: 0 20px 55px rgba(var(--bg-rgb), 0.42), 0 0 28px rgba(var(--accent-rgb), 0.12);
}

.card:hover::before,
.card:focus-within::before {
  opacity: 1;
}

.card:active {
  transform: translateY(-1px) scale(0.995);
}

.card:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: 4px;
}

.card[aria-disabled='true'] {
  opacity: 0.5;
  pointer-events: none;
  transform: none;
  box-shadow: none;
}
```

### Navigation

桌面端仅保留一组严格居中的分段导航，“成果展示”作为其中一个目的地，不再设置同目标的右侧 CTA；移动菜单同样只保留一个成果入口。

```css
.site-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  padding-top: 12px;
  pointer-events: none;
}

.nav-inner {
  min-height: 64px;
  border: 1px solid transparent;
  border-radius: 22px;
  pointer-events: auto;
}

.desktop-nav {
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 0.15rem;
  padding: 0.3rem;
  border: 1px solid rgba(var(--border-rgb), 0.72);
  border-radius: 999px;
  background: rgba(var(--surface-rgb), 0.48);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  backdrop-filter: blur(12px) saturate(160%);
}

.site-nav.is-scrolled .nav-inner,
.site-nav.menu-active .nav-inner {
  border-color: rgba(var(--text-rgb), 0.1);
  background: rgba(var(--surface-rgb), 0.76);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  backdrop-filter: blur(24px) saturate(160%);
  box-shadow: 0 16px 48px rgba(var(--bg-rgb), 0.46);
}

.nav-link {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding-inline: 0.9rem;
  border-radius: 999px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease, transform 90ms var(--ease-press);
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--text);
  background: rgba(var(--accent-soft-rgb), 0.09);
}

.nav-link.is-active {
  box-shadow: inset 0 0 0 1px rgba(var(--accent-soft-rgb), 0.16);
}

.nav-link:active {
  color: var(--accent-soft);
}

.nav-link:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: 3px;
  border-radius: 999px;
}

.nav-link[aria-disabled='true'] {
  color: var(--text-tertiary);
  opacity: 0.5;
  pointer-events: none;
}
```

### Text Links

```css
.text-link {
  position: relative;
  color: var(--accent-soft);
  text-decoration: none;
  transition: color 180ms ease;
}

.text-link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -0.2em;
  left: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 220ms ease;
}

.text-link:hover {
  color: var(--text);
}

.text-link:hover::after,
.text-link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}

.text-link:active {
  color: var(--accent-bright);
}

.text-link:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: 4px;
}

.text-link[aria-disabled='true'] {
  color: var(--text-tertiary);
  pointer-events: none;
  opacity: 0.5;
}
```

### Tags / Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0.375rem 0.75rem;
  border: 1px solid rgba(var(--accent-bright-rgb), 0.35);
  border-radius: 999px;
  background: rgba(var(--accent-rgb), 0.12);
  color: var(--accent-soft);
  font: 600 0.75rem/1 var(--font-sans);
  letter-spacing: 0.08em;
  transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
}

.badge:hover,
.badge:focus-visible {
  border-color: var(--accent-bright);
  background: rgba(var(--accent-rgb), 0.22);
  color: var(--text);
}

.badge:active {
  background: rgba(var(--accent-rgb), 0.3);
}

.badge:focus-visible {
  outline: 2px solid var(--accent-soft);
  outline-offset: 3px;
}

.badge[aria-disabled='true'] {
  opacity: 0.45;
  pointer-events: none;
}
```

### Product Showcase Placeholder

```css
.product-card__media {
  position: relative;
  min-height: 220px;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background: var(--surface-alt);
}

.product-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease;
}

.product-card:hover .product-card__media img,
.product-card:focus-within .product-card__media img {
  transform: scale(1.035);
}

.product-card[aria-disabled='true'] .product-card__media img {
  opacity: 0.45;
  transform: none;
}
```

Placeholder 不使用单一纯色块：在真实截图加入前，使用由紫色线框、点阵与“项目资料待补充”文本构成的 SVG 数据图形。

## 5. Layout Principles

**Container:**

- Max width: `1180px`
- Desktop padding: `32px`
- Tablet padding: `24px`
- Mobile padding: `18px`
- Narrow text width: `720px`

**Spacing Scale:**

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4.5rem;
  --space-9: 7rem;
  --space-10: 9rem;
}
```

- Section padding: desktop `var(--space-10)`, tablet `var(--space-9)`, mobile `var(--space-8)`.
- Component gap: `var(--space-5)` to `var(--space-6)`.
- Card internal padding: `clamp(1.25rem, 3vw, 2rem)`.
- 标题与正文之间不超过 `var(--space-5)`；章节标题组与网格之间使用 `var(--space-7)`。

**Grid:**

```css
.container {
  width: min(100% - 4rem, 1180px);
  margin-inline: auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--space-5);
}

.product-card--featured { grid-column: span 7; }
.product-card--standard { grid-column: span 5; }
.product-card--wide { grid-column: span 8; }
.product-card--compact { grid-column: span 4; }

.advantage-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
}
```

**Composition Rules:**

- Hero 桌面端至少占 `min(860px, 100svh)`，内容中心略高于视觉中线。
- 紫色弧形从视口下部升起，不遮挡标题和 CTA。
- 数据条与 Hero 下边缘叠压约 48px，形成首次滚动的视觉钩子。
- 智能体概览采用“左侧短标题、右侧正文”的非对称两栏。
- 产品展示必须用 7/5、8/4 的不等大比例，禁止六张同尺寸卡片。
- 优势区整段使用紫色渐变底，但卡片保持透明描边，避免厚重色块。

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | 无阴影，仅 `--border` | 普通文本区、页尾 |
| Subtle | `0 8px 24px rgba(var(--bg-rgb), 0.24)` | 导航滚动态、普通卡片 |
| Elevated | `0 20px 55px rgba(var(--bg-rgb), 0.42)` | 产品卡 hover、数据条 |
| Accent Glow | `0 0 34px rgba(var(--accent-rgb), 0.18)` | 主 CTA、重点卡片 |
| Hero Horizon | 多层 radial-gradient，不使用移动元素 blur | 紫色地平线光弧 |

**Depth Rules:**

- 阴影只使用黑色透明度或紫色 glow，不使用灰白投影。
- 默认卡片靠边框区分层级，阴影只在 hover 或悬浮组件出现。
- `backdrop-filter` 仅用于导航、移动菜单、数据条和少量幽灵按钮；导航使用约 `24px`，菜单使用约 `28px`，并提供 `prefers-reduced-transparency` 实色降级。
- 动态元素禁止使用 `filter: blur()`；景深由 opacity、scale 与渐变完成。

## 7. Animation & Interaction

**Motion Philosophy**: 采用 Apple 式“直接、物理、可中断”原则：按下立即反馈，松手平滑回位；进入和退出沿同一路径；动效只解释层级与状态，不与内容争夺注意力。  
**Tier**: L2 流畅交互  
**Dependencies**: 无第三方运行时依赖

### Six Required Motion Categories

1. **Hero H1**：约 560ms 的逐行 clip reveal，整组在约 800ms 内完成；关键词渐变仅播放一次。
2. **Section H2**：约 480ms、10px 位移的 `opacity + translateY` 滚动进入。
3. **Body / Label**：eyebrow 的短线展开，正文按段落 ScrollReveal。
4. **Element**：按钮 pointer-down 即时缩放至 0.97，松手以近临界阻尼曲线回位；不移动点击命中区域。
5. **Component**：产品区 Spotlight Bento，卡片聚光由 rAF 节流更新。
6. **Background**：紫色地平线弧内使用纯 CSS 流体表面，三层只动画 `transform`；外圈条带使用轻量 SVG 路径形变，约 18 秒完成一个柔和波动周期。两者离开首屏或页面失焦后暂停；不使用动态 blur、SVG turbulence、WebGL 或高频呼吸循环。
7. **Diagram**：智能体关系图在精细指针设备上使用 rAF 节流的分层视差；网格、轨道、节点和核心采用递增位移，离开容器后沿 700ms 流体曲线回到中位。

### Entrance Animation

```css
@keyframes heroLineIn {
  from { opacity: 0; transform: translateY(110%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes accentFlow {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

.hero-title__line {
  display: block;
  overflow: hidden;
}

.hero-title__line > span {
  display: block;
  opacity: 0;
  transform: translateY(106%);
  animation: heroLineIn 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-title__line:nth-child(2) > span { animation-delay: 40ms; }
.hero-title__line:nth-child(3) > span { animation-delay: 80ms; }

.gradient-text {
  background: var(--gradient-accent);
  background-size: 180% 180%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: accentFlow 2200ms cubic-bezier(0.22, 1, 0.36, 1) 1 both;
}

.reveal {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 480ms ease, transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Scroll Reveal and Navigation

```js
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.setProperty('--reveal-index', String(index));
    observer.observe(element);
  });
}

function initNavigation() {
  const nav = document.querySelector('.site-nav');
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', window.scrollY > 48);
      scheduled = false;
    });
  }, { passive: true });
}
```

### Spotlight Cards (rAF throttled)

```js
function initSpotlights() {
  document.querySelectorAll('.card').forEach((card) => {
    let frame = 0;
    card.addEventListener('pointermove', (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        frame = 0;
      });
    }, { passive: true });
  });
}
```

### Immediate Press Feedback

```js
function initPressFeedback() {
  document.querySelectorAll('.button, .menu-toggle, .mobile-link').forEach((control) => {
    const release = () => control.classList.remove('is-pressing');
    control.addEventListener('pointerdown', () => control.classList.add('is-pressing'));
    control.addEventListener('pointerup', release);
    control.addEventListener('pointercancel', release);
    control.addEventListener('pointerleave', release);
  });
}
```

按钮不使用磁吸；hover 只改变材质、阴影和箭头，不让命中目标追随指针。

### Hero Arc

```css
.hero-arc {
  position: absolute;
  inset: 18% -12% -24%;
  z-index: -1;
  border-radius: 50% 50% 0 0;
  background: var(--gradient-hero-arc);
  transform: translate3d(0, 0, 0) scale(1.02);
}

.hero__fluid {
  position: absolute;
  inset: 8.5% 6.8% -6%;
  overflow: hidden;
  clip-path: ellipse(50% 100% at 50% 100%);
  contain: paint;
  transform: translate3d(var(--fluid-x, 0), var(--fluid-y, 0), 0);
}

.hero__fluid::before { animation: fluidDriftOne 18s var(--ease-fluid) infinite alternate; }
.hero__fluid::after { animation: fluidDriftTwo 24s ease-in-out infinite alternate-reverse; }
.hero__fluid-current { animation: fluidCurrent 30s ease-in-out infinite alternate; }

.hero__fluid.is-paused::before,
.hero__fluid.is-paused::after,
.hero__fluid.is-paused .hero__fluid-current {
  animation-play-state: paused;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  .hero-title__line > span,
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: opacity 180ms ease !important;
  }

  .manifesto__rail::after { animation: none; opacity: 0.42; transform: translateX(270%); }
  .hero__fluid::before,
  .hero__fluid::after,
  .hero__fluid-current { animation: none; transform: none; }
  .mobile-menu { transition: opacity 180ms ease, visibility 0s linear 180ms; }
  .showcase-grid { scroll-behavior: auto; }
}

@media (prefers-reduced-transparency: reduce) {
  .nav-inner,
  .mobile-menu,
  .hero-metrics,
  .button--ghost {
    background: var(--surface);
    backdrop-filter: none;
  }
}

@media (prefers-contrast: more) {
  .card,
  .nav-inner,
  .mobile-menu {
    border-color: rgba(var(--text-rgb), 0.5);
  }
}
```

## 8. Do's and Don'ts

### Do

- 将“高校智能体”放在首屏最明确的位置，5 秒内让访客理解展示主题。
- 使用真实智能体名称、场景与截图前，保留结构清晰且标注“待补充”的占位内容。
- 使用中性抽象图形作为页面标识，不让品牌信息干扰智能体展示。
- 使用语义化 HTML、键盘可达导航、可见 focus 状态和至少 44×44px 触摸目标。
- 保持每个章节只有一个主要视觉动作，确保高校商务场景的稳重感。
- 所有文案与案例数据集中在易编辑的数据对象或清晰 HTML 区块中。
- 桌面端和移动端都验证导航、卡片、CTA 与占位图形。
- 使用渐进增强：关闭 JavaScript 后，所有内容仍然可见和可阅读。

### Don't

- ❌ 不要把参考图的英文金融科技文案或标识直接复制进页面。
- ❌ 不要虚构智能体项目、使用数据、提效百分比或评价。
- ❌ 不要出现任何公司名称、公司 Logo、地区属性、资质、联系方式或企业宣传口号。
- ❌ 不要加入品牌专属颜色或图形，整站保持中性智能体产品表达。
- ❌ 不要使用六张等大普通网格，成品展示必须有视觉层级。
- ❌ 不要使用持续闪烁、故障文字、粒子爆炸或全局自定义光标。
- ❌ 不要在运动元素上使用 `filter: blur()`，也不要加入常驻 WebGL。
- ❌ 不要用 Emoji 代替产品或功能图标；使用语义化内联 SVG。
- ❌ 不要用纯色矩形冒充项目截图；占位必须包含明确状态和结构化图形。
- ❌ 不要把毛玻璃叠满页面；仅导航、移动菜单和少量悬浮控件使用材质层，并始终提供减少透明度降级。
- ❌ 不要在移动端保留桌面端三列或四列硬布局。
- ❌ 不要省略 `prefers-reduced-motion`、焦点态和图片替代文本。

## 9. Responsive Behavior

**Breakpoints:**

| Name | Width | Key Changes |
|---|---:|---|
| Wide Desktop | `> 1280px` | 1180px 容器；Hero 大标题完整三行内；12 列 Bento |
| Desktop | `1025–1280px` | 容器左右 32px；产品仍为 7/5 与 8/4 |
| Tablet | `641–1024px` | 导航折叠；产品卡 1:1 两列；优势区两列；Hero 弧降低高度 |
| Mobile | `≤ 640px` | 正文单列；成品区原生横滑；按钮满宽；数据条 2×2；禁用复杂视差 |

**Touch Targets:** minimum `44px × 44px`  
**Collapsing Strategy:** 导航使用带遮罩、焦点约束与 Escape 关闭的浮动菜单；优势编号保持；成品 Bento 在移动端改为原生横滑轨道，露出下一张约 10%，使用浏览器惯性与 scroll snap，不手写拖拽物理。  
**Mobile Visual Strategy:** Hero 光弧缩小为椭圆渐变，仅保留一层 24 秒低速流体色团；SVG 条带波动降至 30fps，关系图不启用指针视差，以控制功耗。成品轨道提供 44px 圆点跳转和方向键操作。

```css
@media (max-width: 1024px) {
  .container { width: min(100% - 3rem, 1180px); }
  .product-card--featured,
  .product-card--standard,
  .product-card--wide,
  .product-card--compact { grid-column: span 6; }
  .advantage-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .desktop-nav { display: none; }
  .menu-toggle { display: inline-flex; }
}

@media (max-width: 640px) {
  .container { width: min(100% - 2.25rem, 1180px); }
  section { padding-block: var(--space-8); }
  .advantage-grid { grid-template-columns: 1fr; }
  .product-grid {
    grid-auto-flow: column;
    grid-auto-columns: min(84vw, 340px);
    overflow-x: auto;
    scroll-snap-type: inline mandatory;
    -webkit-overflow-scrolling: touch;
  }
  .product-card--featured,
  .product-card--standard,
  .product-card--wide,
  .product-card--compact { grid-column: auto; scroll-snap-align: start; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .hero-actions .button { width: 100%; }
  .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hero-arc { inset: 28% -42% -16%; animation: none; }
}

@media (hover: none), (pointer: coarse) {
  .card:hover,
  .button:hover { transform: none; }
}
```

### Content Placeholders to Replace Later

- 已上线智能体名称、应用场景、产品截图、功能摘要与演示说明。
- 智能体能力流程、知识范围与交互入口。
- 更多真实智能体界面和可验证的应用效果。
