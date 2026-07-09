import { useState, useEffect, useRef } from 'react';

/* ── Delivery prices per wilaya ── */
const deliveryPrices = {
  "01": { domicile: 1100, stopdesk: 750 },  "02": { domicile: 680, stopdesk: 400 },
  "03": { domicile: 800, stopdesk: 500 },   "04": { domicile: 680, stopdesk: 400 },
  "05": { domicile: 700, stopdesk: 400 },   "06": { domicile: 700, stopdesk: 400 },
  "07": { domicile: 800, stopdesk: 500 },   "08": { domicile: 1000, stopdesk: 700 },
  "09": { domicile: 500, stopdesk: 350 },   "10": { domicile: 600, stopdesk: 400 },
  "11": { domicile: 1500, stopdesk: 1050 }, "12": { domicile: 720, stopdesk: 450 },
  "13": { domicile: 700, stopdesk: 400 },   "14": { domicile: 700, stopdesk: 400 },
  "15": { domicile: 600, stopdesk: 400 },   "16": { domicile: 400, stopdesk: 300 },
  "17": { domicile: 800, stopdesk: 500 },   "18": { domicile: 700, stopdesk: 400 },
  "19": { domicile: 680, stopdesk: 400 },   "20": { domicile: 730, stopdesk: 450 },
  "21": { domicile: 700, stopdesk: 400 },   "22": { domicile: 700, stopdesk: 400 },
  "23": { domicile: 700, stopdesk: 450 },   "24": { domicile: 700, stopdesk: 400 },
  "25": { domicile: 680, stopdesk: 400 },   "26": { domicile: 600, stopdesk: 400 },
  "27": { domicile: 700, stopdesk: 400 },   "28": { domicile: 700, stopdesk: 400 },
  "29": { domicile: 700, stopdesk: 400 },   "30": { domicile: 900, stopdesk: 550 },
  "31": { domicile: 580, stopdesk: 400 },   "32": { domicile: 970, stopdesk: 700 },
  "33": { domicile: 1500, stopdesk: 1050 }, "34": { domicile: 680, stopdesk: 400 },
  "35": { domicile: 530, stopdesk: 350 },   "36": { domicile: 730, stopdesk: 450 },
  "37": { domicile: 1100, stopdesk: 750 },  "38": { domicile: 700, stopdesk: 400 },
  "39": { domicile: 900, stopdesk: 550 },   "40": { domicile: 700, stopdesk: 400 },
  "41": { domicile: 730, stopdesk: 450 },   "42": { domicile: 530, stopdesk: 350 },
  "43": { domicile: 700, stopdesk: 400 },   "44": { domicile: 700, stopdesk: 400 },
  "45": { domicile: 930, stopdesk: 550 },   "46": { domicile: 700, stopdesk: 400 },
  "47": { domicile: 850, stopdesk: 500 },   "48": { domicile: 700, stopdesk: 400 },
  "49": { domicile: 1100, stopdesk: 750 },  "50": { domicile: 1500, stopdesk: 1050 },
  "51": { domicile: 800, stopdesk: 500 },   "52": { domicile: 1000, stopdesk: 750 },
  "53": { domicile: 1400, stopdesk: 950 },  "54": { domicile: 1500, stopdesk: 1050 },
  "55": { domicile: 930, stopdesk: 550 },   "56": { domicile: 2100, stopdesk: 1500 },
  "57": { domicile: 930, stopdesk: 550 },   "58": { domicile: 850, stopdesk: 500 },
};

/* ── Reviews data ── */
const reviews = [
  { name: 'يوسف ب.', loc: 'الجزائر العاصمة', init: 'ي', text: 'والله ساعة ممتازة، كل الناس سقساتني عليها. الجودة عالية بزاف والتوصيل كان سريع.', stars: 5 },
  { name: 'أمين ك.', loc: 'وهران', init: 'أ', text: 'وصلتني في 3 أيام، الباكيج ديالها فاخر وساعة تبان غالية بزاف. أنصح بيها.', stars: 5 },
  { name: 'رضا م.', loc: 'قسنطينة', init: 'ر', text: 'شريت وحدة الكحلة ووحدة الفضية، الزوج رائعين. شكرا VRMX Shop.', stars: 5 },
];

/* ── Wilayas ── */
const wilayas = [
  ["01","أدرار"],["02","الشلف"],["03","الأغواط"],["04","أم البواقي"],["05","باتنة"],
  ["06","بجاية"],["07","بسكرة"],["08","بشار"],["09","البليدة"],["10","البويرة"],
  ["11","تمنراست"],["12","تبسة"],["13","تلمسان"],["14","تيارت"],["15","تيزي وزو"],
  ["16","الجزائر"],["17","الجلفة"],["18","جيجل"],["19","سطيف"],["20","سعيدة"],
  ["21","سكيكدة"],["22","سيدي بلعباس"],["23","عنابة"],["24","قالمة"],["25","قسنطينة"],
  ["26","المدية"],["27","مستغانم"],["28","المسيلة"],["29","معسكر"],["30","ورقلة"],
  ["31","وهران"],["32","البيض"],["33","إليزي"],["34","برج بوعريريج"],["35","بومرداس"],
  ["36","الطارف"],["37","تندوف"],["38","تيسمسيلت"],["39","الوادي"],["40","خنشلة"],
  ["41","سوق أهراس"],["42","تيبازة"],["43","ميلة"],["44","عين الدفلى"],["45","النعامة"],
  ["46","عين تموشنت"],["47","غرداية"],["48","غليزان"],["49","تيميمون"],["50","برج باجي مختار"],
  ["51","أولاد جلال"],["52","بني عباس"],["53","إن صالح"],["54","إن قزام"],["55","تقرت"],
  ["56","جانت"],["57","المغير"],["58","المنيعة"],
];

function App() {
  const [variant, setVariant] = useState('black');
  const [timeLeft, setTimeLeft] = useState(3600);
  const [form, setForm] = useState({ name: '', phone: '', wilaya: '', commune: '', delivery: 'domicile' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const [viewers] = useState(Math.floor(Math.random() * 25) + 38);
  const orderRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setShowFloat(window.scrollY > 500);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const fmt = (s) => {
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  };
  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: 'smooth' });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwR1z_9h30iLH5DZppZxdVdktWQRogfiPadAn9vImTe6vnvY29wFy79-THWBOk9r4sH/exec';

    try {
      const selectedWilaya = wilayas.find(w => w[0] === form.wilaya);
      const wilayaFullName = selectedWilaya ? `${form.wilaya} - ${selectedWilaya[1]}` : form.wilaya;

      const orderData = {
        name: form.name,
        phone: form.phone,
        wilaya: wilayaFullName,
        commune: form.commune,
        variant: variant,
        delivery: form.delivery,
        total: total
      };

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(orderData)
      });

      setSubmitting(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('حدث خطأ أثناء إرسال الطلبية. يرجى المحاولة مرة أخرى.');
      setSubmitting(false);
    }
  };

  const img = { black: '/watch-black.jpg', silver: '/watch-silver.jpg' };
  const price = 1200;
  const delCost = form.wilaya && deliveryPrices[form.wilaya] ? deliveryPrices[form.wilaya][form.delivery] : 0;
  const total = price + delCost;

  /* ── SUCCESS SCREEN ── */
  if (success) {
    return (
      <div className="page-container success-screen">
        <div className="success-card">
          <div className="check-circle">✓</div>
          <h2>تم تأكيد الطلبية</h2>
          <p style={{ color: 'var(--text-tertiary)', marginBottom: 0 }}>شكرا <strong style={{ color: 'white' }}>{form.name}</strong></p>
          <div className="total-box">
            <div className="total-label">المبلغ الإجمالي للدفع</div>
            <div className="total-value">{total.toLocaleString()} د.ج</div>
          </div>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            فريقنا راح يتواصل معك في أقرب وقت لتأكيد التوصيل
          </p>
        </div>
      </div>
    );
  }

  /* ── MAIN PAGE ── */
  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-mark">V</div>
            <span className="logo-text">VRMX</span>
          </div>
          <span className="header-badge">الدفع عند الاستلام</span>
        </div>
      </header>

      <main className="page-container">

        {/* ── HERO ── */}
        <section className="hero anim-fade">
          <div className="tag">
            <span className="dot" />
            الإصدار المحدود
          </div>
          <h1>
            الناس تحكم عليك في
            <span className="highlight">أول نظرة</span>
          </h1>
          <p className="subtitle">
            واش راهي تقول عليك ساعتك؟ افرض هيبتك مع ساعة تهدر عليك قبل ما تحكي.
          </p>

          {/* Product Card */}
          <div className="product-card anim-scale" style={{ animationDelay: '0.2s' }}>
            <span className="badge-discount">‎-20%</span>
            <div className="product-img-wrap">
              <img src={img[variant]} alt={`VRMX ${variant}`} />
            </div>
            <div className="product-info">
              <div>
                <div className="price-now">1,200 <span>د.ج</span></div>
                <div className="price-was">1,500 د.ج</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: 'var(--green)' }}>●</span> متوفر في المخزون
              </div>
            </div>
          </div>
        </section>

        {/* ── VARIANT PICKER ── */}
        <section className="variant-section">
          <div className="section-label">اختر اللون</div>
          <div className="variant-picker">
            <button type="button" onClick={() => setVariant('black')} className={variant === 'black' ? 'selected' : ''}>
              <span className="swatch" style={{ background: '#1a1a1a', border: '2px solid #333' }} />
              أسود ملكي
            </button>
            <button type="button" onClick={() => setVariant('silver')} className={variant === 'silver' ? 'selected' : ''}>
              <span className="swatch" style={{ background: '#d1d5db', border: '2px solid #9ca3af' }} />
              فضي لامع
            </button>
          </div>
        </section>

        {/* ── CTA ── */}
        <button onClick={scrollToOrder} className="cta-btn" style={{ marginBottom: '32px' }}>
          أطلب الآن — الدفع عند الاستلام
        </button>

        {/* ── METRICS ── */}
        <section className="metrics anim-fade" style={{ animationDelay: '0.3s' }}>
          <div className="metric">
            <span className="metric-value">+2,400</span>
            <span className="metric-label">طلبية مؤكدة</span>
          </div>
          <div className="metric">
            <span className="metric-value" style={{ color: 'var(--green)' }}>98%</span>
            <span className="metric-label">رضا العملاء</span>
          </div>
          <div className="metric">
            <span className="metric-value">58</span>
            <span className="metric-label">ولاية متاحة</span>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="features anim-fade" style={{ animationDelay: '0.35s' }}>
          <div className="feature"><span className="f-icon">💎</span><div className="f-title">لمعان استثنائي</div><div className="f-desc">تصميم مرصع يلمع كالألماس</div></div>
          <div className="feature"><span className="f-icon">⚡</span><div className="f-title">توصيل سريع</div><div className="f-desc">من 2 إلى 5 أيام عمل</div></div>
          <div className="feature"><span className="f-icon">🛡️</span><div className="f-title">ضمان الجودة</div><div className="f-desc">منتج أصلي مع ضمان</div></div>
          <div className="feature"><span className="f-icon">📦</span><div className="f-title">تغليف فاخر</div><div className="f-desc">علبة هدية راقية</div></div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="trust-bar">
          <span className="trust-chip"><span className="chip-icon">✅</span> الدفع عند الاستلام</span>
          <span className="trust-chip"><span className="chip-icon">🚚</span> توصيل لـ 58 ولاية</span>
          <span className="trust-chip"><span className="chip-icon">🔒</span> منتج أصلي 100%</span>
        </div>

        {/* ── DIVIDER ── */}
        <div className="divider"><div className="d-line" /><div className="d-dot" /><div className="d-line" /></div>

        {/* ── COUNTDOWN ── */}
        <div className="countdown-bar">
          <div className="cb-left">
            <span className="live-dot" />
            <div>
              <div className="cb-title">العرض ينتهي قريبا</div>
              <div className="cb-viewers">{viewers} شخص يشاهد الآن</div>
            </div>
          </div>
          <div className="timer">{fmt(timeLeft)}</div>
        </div>




        {/* ── DIVIDER ── */}
        <div className="divider"><div className="d-line" /><div className="d-dot" /><div className="d-line" /></div>

        {/* ── ORDER FORM ── */}
        <section className="order-section" ref={orderRef} id="order">
          <div className="order-card">
            <h3 className="order-heading">أطلب الآن</h3>
            <p className="order-sub">عمّر الاستمارة ونتصلو بيك لنأكدو الطلبية</p>
            
            <form onSubmit={submit}>
              <div className="form-group">
                <label>الاسم واللقب</label>
                <input className="form-control" placeholder="مثال: أمين بن علي" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>رقم الهاتف</label>
                <input type="tel" className="form-control" placeholder="0555 00 00 00" required dir="ltr" style={{ textAlign: 'right' }} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>الولاية</label>
                <select className="form-control" required value={form.wilaya} onChange={e => setForm({...form, wilaya: e.target.value, delivery: 'domicile'})}>
                  <option value="">اختر ولايتك...</option>
                  {wilayas.map(([code, name]) => (
                    <option key={code} value={code}>{code} - {name}</option>
                  ))}
                </select>
              </div>

              {form.wilaya && (
                <div className="form-group">
                  <label>طريقة التوصيل</label>
                  <div className="delivery-picker">
                    <label className={`delivery-opt ${form.delivery === 'domicile' ? 'active' : ''}`}>
                      <input type="radio" name="del" value="domicile" checked={form.delivery === 'domicile'} onChange={e => setForm({...form, delivery: e.target.value})} style={{ display: 'none' }} />
                      <span className="opt-label">للمنزل</span>
                      <span className="opt-price">{deliveryPrices[form.wilaya]?.domicile} د.ج</span>
                    </label>
                    <label className={`delivery-opt ${form.delivery === 'stopdesk' ? 'active' : ''}`}>
                      <input type="radio" name="del" value="stopdesk" checked={form.delivery === 'stopdesk'} onChange={e => setForm({...form, delivery: e.target.value})} style={{ display: 'none' }} />
                      <span className="opt-label">المكتب</span>
                      <span className="opt-price">{deliveryPrices[form.wilaya]?.stopdesk} د.ج</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>البلدية / العنوان</label>
                <input className="form-control" placeholder="العنوان بالتفصيل" required value={form.commune} onChange={e => setForm({...form, commune: e.target.value})} />
              </div>

              {form.wilaya && (
                <div className="order-summary">
                  <div className="s-row"><span className="s-label">سعر المنتج</span><span>{price.toLocaleString()} د.ج</span></div>
                  <div className="s-row"><span className="s-label">التوصيل</span><span>{delCost.toLocaleString()} د.ج</span></div>
                  <div className="s-total"><span>المجموع</span><span>{total.toLocaleString()} د.ج</span></div>
                </div>
              )}

              <button type="submit" className="cta-btn" disabled={submitting} style={{ opacity: submitting ? 0.6 : 1 }}>
                {submitting ? 'جاري التأكيد...' : 'تأكيد الطلبية'}
              </button>

              <div className="privacy-note">
                <span>🔒</span> معلوماتك محمية ولن يتم مشاركتها
              </div>
            </form>
          </div>
        </section>

        <div className="bottom-spacer" />
      </main>

      {/* FLOATING CTA */}
      {showFloat && (
        <div className="float-bar">
          <div className="float-bar-inner">
            <div className="fb-price">
              <div className="fb-current">1,200 د.ج</div>
              <div className="fb-old">1,500 د.ج</div>
            </div>
            <button onClick={scrollToOrder} className="cta-btn" style={{ animation: 'none' }}>أطلب الآن</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
