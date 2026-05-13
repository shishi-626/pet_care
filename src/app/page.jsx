'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Bath,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ClipboardCheck,
  HeartHandshake,
  Instagram,
  MapPin,
  MessageCircle,
  PawPrint,
  Phone,
  Scissors,
  ShieldCheck,
  Siren,
  Sparkles,
  SprayCan,
  Star,
  Timer,
  Train,
  UserCheck,
} from 'lucide-react';

const services = [
  {
    icon: Bath,
    title: '泡沫洁净洗护',
    text: '低敏洗剂、分区清洁和恒温冲洗，适合日常清洁与敏感皮肤护理。',
  },
  {
    icon: Scissors,
    title: '毛发精修造型',
    text: '按宠物脸型、毛量和生活习惯定制造型，让可爱停留在出门那天。',
  },
  {
    icon: Sparkles,
    title: '泡泡香氛 SPA',
    text: '温和护理、蓬松吹护和淡雅香氛，给毛孩子一场轻盈舒适的放松。',
  },
];

const salonSlides = [
  {
    image: '/assets/salon-reception.png',
    title: '城市精品接待区',
    text: '弧形石材前台、浅玉色软装与陈列墙，进店第一眼就是干净、松弛、可信赖。',
  },
  {
    image: '/assets/salon-spa.png',
    title: '恒温私享洗护区',
    text: '独立浴缸、玻璃隔断与柔和灯光，让洗护过程更安静，也更容易安抚宠物。',
  },
  {
    image: '/assets/salon-grooming.png',
    title: '精致造型护理区',
    text: '专业美容台、圆镜与整洁工具墙，适合完成修剪、吹护和出门前的最后整理。',
  },
];

const packages = [
  {
    name: '轻盈洗护',
    price: '￥128 起',
    detail: '基础清洁 / 指甲修剪 / 耳道护理 / 足底毛清理',
    bestFor: '适合短毛猫、小型犬、定期洗护且皮毛状态稳定的宠物。',
    duration: '约 60-80 分钟',
    cta: '咨询轻盈洗护',
    tag: '日常推荐',
  },
  {
    name: '泡泡精护',
    price: '￥238 起',
    detail: '深层洁净 / 毛发护理 / 香氛蓬松 / 皮毛状态记录',
    bestFor: '适合换毛期、毛量偏厚、轻微打结或希望洗后更蓬松的宠物。',
    duration: '约 90-120 分钟',
    cta: '查看精护档期',
    tag: '热门套餐',
  },
  {
    name: '明星造型',
    price: '￥368 起',
    detail: '精品洗护 / 全身造型 / 造型留影 / 回家护理建议',
    bestFor: '适合贵宾、比熊、雪纳瑞等需要修剪造型的犬种，或重要出游前焕新。',
    duration: '约 150-210 分钟',
    cta: '预约造型评估',
    tag: '精致焕新',
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: '低敏洗护产品',
    text: '选用宠物专用低敏洗剂，先看皮肤状态再决定清洁强度，幼宠和敏感皮肤会降低刺激步骤。',
  },
  {
    icon: UserCheck,
    title: '持证美容师主理',
    text: '主理美容师拥有 6 年以上门店洗护与造型经验，复杂造型会先做毛量和性格评估。',
  },
  {
    icon: SprayCan,
    title: '一宠一巾一消毒',
    text: '浴巾、围脖和基础工具按宠物独立使用；美容台、浴缸、烘干箱每日多次清洁消毒。',
  },
  {
    icon: Siren,
    title: '应激安抚预案',
    text: '遇到紧张、喘息或明显抗拒，会暂停流程，改用低噪设备和分段休息，必要时建议改期。',
  },
  {
    icon: ClipboardCheck,
    title: '护理记录透明',
    text: '到店先记录皮毛、耳道、指甲和情绪状态，完成后同步护理重点和居家观察建议。',
  },
  {
    icon: CalendarClock,
    title: '预约制不赶场',
    text: '按体型、毛量和服务项目预留时长，避免多个宠物挤在同一时段，洗护节奏更从容。',
  },
];

const processSteps = [
  {
    title: '皮毛评估',
    time: '5-10 分钟',
    text: '记录皮肤、耳道、打结和情绪状态，和主人确认护理重点。',
  },
  {
    title: '温柔清洁',
    time: '25-45 分钟',
    text: '恒温冲洗，避开眼鼻敏感区，根据皮毛状态调整洗剂和揉搓力度。',
  },
  {
    title: '低噪吹护',
    time: '30-60 分钟',
    text: '先吸水再低噪吹干，紧张宠物会分段休息，避免长时间压迫。',
  },
  {
    title: '精修造型',
    time: '20-90 分钟',
    text: '修脚底、指甲、耳周和全身造型，完成后给主人留护理建议。',
  },
];

const cases = [
  {
    name: '糯米',
    type: '比熊犬',
    image: '/assets/case-nuomi-bichon-before-after.png',
    text: '洗护前毛发打绺、脚爪沾泥，完成泡泡精护后恢复蓬松白净，并做了圆润脸型修剪。',
  },
  {
    name: '豆包',
    type: '英短猫',
    image: '/assets/case-doubao-british-shorthair-before-after.png',
    text: '洗护前毛面略乱、爪部有灰尘，采用猫咪分段安抚洗护后，毛感更顺滑蓬松。',
  },
  {
    name: '可乐',
    type: '泰迪犬',
    image: '/assets/case-kele-teddy-before-after.png',
    text: '洗护前卷毛凌乱、腿部轻微打结，清洁后完成日常泰迪造型，耳朵和腿部更整洁。',
  },
];

const faqs = [
  {
    question: '猫咪和狗狗会分开洗护吗？',
    answer: '会。猫犬预约尽量错峰安排，洗护工具和毛巾独立使用，减少气味和声音带来的压力。',
  },
  {
    question: '宠物有皮肤病还能洗吗？',
    answer: '建议先咨询兽医。若正在用药或有开放性伤口，我们会建议暂停美容洗护，以免加重不适。',
  },
  {
    question: '疫苗没打完可以来吗？',
    answer: '不建议到店洗护。幼宠完成基础免疫并稳定观察后再预约，会更稳妥。',
  },
  {
    question: '第一次来需要准备什么？',
    answer: '带上牵引绳或航空箱，提前告知宠物年龄、性格、过敏史和是否害怕吹风即可。',
  },
  {
    question: '洗护期间需要等多久？',
    answer: '基础洗护约 1-2 小时，造型约 2.5-3.5 小时。完成前我们会提前电话或消息通知。',
  },
];

const testimonials = [
  '第一次洗完没有应激，回家还香香软软的。',
  '店员会提前问皮肤状态，护理过程很细。',
  '预约很顺，造型比照片参考还自然。',
  '猫咪全程比较放松，接回家没有躲起来。',
  '洗护前会确认毛结和敏感点，感觉很安心。',
  '修剪脚底毛很细致，指甲也磨得很圆润。',
  '家里狗狗怕吹风，店员分段慢慢吹，没有硬来。',
  '环境干净，味道也不重，等候区很舒服。',
  '拍照反馈很及时，可以看到护理进度。',
  '造型师会解释适合的长度，不会一味剪短。',
  '第一次带老年犬来，照顾得很温柔。',
];

const initialForm = {
  name: '',
  phone: '',
  petType: '猫咪',
  petSize: '小型',
  package: '泡泡精护',
  date: '',
  time: '10:00 - 12:00',
  note: '',
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  const currentSlide = salonSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % salonSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitted(false);
  };

  const showSlide = (step) => {
    setActiveSlide((current) => (current + step + salonSlides.length) % salonSlides.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = '请填写主人姓名';
    if (!/^1[3-9]\d{9}$/.test(form.phone.trim())) nextErrors.phone = '请填写有效手机号';
    if (!form.date) nextErrors.date = '请选择预约日期';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="泡泡爪首页">
          <span className="brand-mark">
            <img src="/assets/paopao-logo.svg" alt="泡泡爪品牌图标" />
          </span>
          <span className="brand-copy">
            <span className="brand-name">泡泡爪</span>
            <span className="brand-en">Pet spa</span>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#story">品牌</a>
          <a href="#trust">信任</a>
          <a href="#cases">案例</a>
          <a href="#packages">套餐</a>
          <a href="#booking">预约</a>
          <a href="#location">门店</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">精品宠物洗护预约</p>
          <h1 className="hero-title">毛孩温柔洗亮</h1>
          <p className="hero-text">
            泡泡爪专注猫狗洗护、皮毛护理与精致造型，用低敏产品、安抚式流程和干净明亮的空间，给宠物一次舒适的焕新。
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#booking">
              <CalendarCheck size={18} />
              立即预约
            </a>
            <a className="secondary-btn" href="tel:400-886-0028">
              <Phone size={18} />
              拨打电话
            </a>
          </div>
          <div className="trust-row" aria-label="服务承诺">
            <span><ShieldCheck size={16} />低敏洗护</span>
            <span><HeartHandshake size={16} />一宠一巾</span>
            <span><Clock3 size={16} />准点预约</span>
          </div>
        </div>
        <div className="hero-media">
          <img src="/assets/hero-care.png" alt="宠物在泡泡爪进行温柔洗护" />
          <div className="floating-note">
            <PawPrint size={18} />
            <span>今日仍有 6 个预约时段</span>
          </div>
        </div>
      </section>

      <section className="section story-section" id="story">
        <div>
          <p className="eyebrow">Brand Story</p>
          <h2>泡泡爪，来自一个怕洗澡的小爪印</h2>
        </div>
        <div className="story-copy">
          <p>
            泡泡爪的名字，来自主理人第一次给自家小狗洗澡时留在浴室地上的泡泡爪印。那次洗澡并不顺利：怕水、怕吹风、怕陌生味道。于是我们开始认真研究更低刺激的洗护产品、更慢一点的安抚节奏，以及让宠物能看见主人、听见轻声回应的空间。
          </p>
          <p>
            我们相信洗护不是把宠物“处理干净”，而是让它在被照顾的过程中尽量安心。干净、温柔、透明，是泡泡爪一直坚持的三件小事。
          </p>
        </div>
      </section>

      <section className="section salon-carousel" aria-label="泡泡爪店内环境轮播">
        <div className="carousel-copy">
          <p className="eyebrow">Salon Space</p>
          <h2>像精品会所一样干净，也像家一样放松</h2>
          <p>
            店内空间分为接待、洗护、造型三类区域，用温润材质、柔和灯光和独立护理动线，减少宠物进入陌生环境时的紧张感。
          </p>
        </div>
        <div className="carousel-frame">
          <img src={currentSlide.image} alt={`泡泡爪${currentSlide.title}`} />
          <div className="carousel-overlay">
            <span>{String(activeSlide + 1).padStart(2, '0')} / 03</span>
            <h3>{currentSlide.title}</h3>
            <p>{currentSlide.text}</p>
          </div>
          <div className="carousel-controls" aria-label="轮播控制">
            <button type="button" onClick={() => showSlide(-1)} aria-label="上一张店内环境图">
              <ChevronLeft size={22} />
            </button>
            <button type="button" onClick={() => showSlide(1)} aria-label="下一张店内环境图">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
        <div className="carousel-dots" aria-label="选择店内区域">
          {salonSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.title}
              className={index === activeSlide ? 'active' : ''}
              onClick={() => setActiveSlide(index)}
              aria-label={`查看${slide.title}`}
              aria-pressed={index === activeSlide}
            />
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <p className="eyebrow">Care Menu</p>
          <h2>从清洁到造型，每一步都不急躁</h2>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text }) => (
            <article className="service-card" key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section trust-section" id="trust">
        <div className="section-heading">
          <p className="eyebrow">Why Us</p>
          <h2>主人真正关心的事，我们放在台面上说清楚</h2>
        </div>
        <div className="trust-grid">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <article className="trust-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div className="feature-image">
          <img src="/assets/salon-room.png" alt="泡泡爪干净明亮的宠物洗护空间" />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">Soft Ritual</p>
          <h2>安抚式洗护流程，让第一次到店也更安心</h2>
          <div className="process-list">
            {processSteps.map((item, index) => (
              <div className="process-item" key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <small><Timer size={14} />{item.time}</small>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="cases">
        <div className="section-heading">
          <p className="eyebrow">Before / After</p>
          <h2>洗护前后展示位，比一句好评更直观</h2>
        </div>
        <div className="case-grid">
          {cases.map((item) => (
            <article className="case-card" key={item.name}>
              <div className="case-photo">
                <img src={item.image} alt={`${item.name}${item.type}洗护前后对比`} />
                <span className="before-label">Before</span>
                <span className="after-label">After</span>
              </div>
              <div className="case-copy">
                <h3>{item.name} · {item.type}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="packages">
        <div className="section-heading">
          <p className="eyebrow">Packages</p>
          <h2>按宠物状态选择刚刚好的护理</h2>
        </div>
        <div className="package-grid">
          {packages.map((item) => (
            <article className="package-card" key={item.name}>
              <span className="package-tag">{item.tag}</span>
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <p>{item.detail}</p>
              <dl>
                <div>
                  <dt>适合</dt>
                  <dd>{item.bestFor}</dd>
                </div>
                <div>
                  <dt>预估时长</dt>
                  <dd>{item.duration}</dd>
                </div>
              </dl>
              <a href="#booking">{item.cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>第一次来之前，先把顾虑问完</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section booking-section" id="booking">
        <div className="booking-copy">
          <p className="eyebrow">Reservation</p>
          <h2>预约一次轻松的泡泡时间</h2>
          <p>
            提交后我们会根据宠物状态和门店时段与你确认。当前为前端演示预约，不会产生真实订单。
          </p>
          <div className="review-list">
            {testimonials.map((quote) => (
              <blockquote key={quote}>
                <Star size={16} fill="currentColor" />
                {quote}
              </blockquote>
            ))}
          </div>
          <div className="social-links" aria-label="社交媒体入口">
            <a href="#location"><MessageCircle size={18} />微信公众号</a>
            <a href="#cases"><Instagram size={18} />小红书案例</a>
            <a href="tel:400-886-0028"><Phone size={18} />电话咨询</a>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <label>
            主人姓名
            <input name="name" value={form.name} onChange={updateField} placeholder="例如：林小姐" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label>
            联系电话
            <input name="phone" value={form.phone} onChange={updateField} placeholder="请输入 11 位手机号" />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </label>
          <label>
            宠物类型
            <select name="petType" value={form.petType} onChange={updateField}>
              <option>猫咪</option>
              <option>狗狗</option>
              <option>其他小宠</option>
            </select>
          </label>
          <label>
            宠物体型
            <select name="petSize" value={form.petSize} onChange={updateField}>
              <option>小型</option>
              <option>中型</option>
              <option>大型</option>
            </select>
          </label>
          <label>
            服务套餐
            <select name="package" value={form.package} onChange={updateField}>
              {packages.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          <label>
            预约日期
            <input name="date" type="date" min={minDate} value={form.date} onChange={updateField} />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </label>
          <label>
            预约时段
            <select name="time" value={form.time} onChange={updateField}>
              <option>10:00 - 12:00</option>
              <option>13:00 - 15:00</option>
              <option>15:30 - 17:30</option>
              <option>18:00 - 20:00</option>
            </select>
          </label>
          <label className="full">
            备注
            <textarea name="note" value={form.note} onChange={updateField} placeholder="例如：第一次洗护、害怕吹风、皮肤敏感等" />
          </label>
          <button className="primary-btn form-submit" type="submit">
            <CheckCircle2 size={18} />
            提交预约
          </button>
          {submitted && (
            <div className="success-box" role="status">
              预约已收到：{form.name} 的{form.petType}将在 {form.date} {form.time} 体验「{form.package}」。
            </div>
          )}
        </form>
      </section>

      <footer className="site-footer" id="location">
        <div>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">
              <img src="/assets/paopao-logo.svg" alt="" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">泡泡爪</span>
              <span className="brand-en">Pet spa</span>
            </span>
          </a>
          <p>用温柔泡泡，照顾每一只小爪子的闪亮日常。</p>
        </div>
        <div className="footer-info">
          <span><MapPin size={16} />上海市静安区云绒路 88 号 1F</span>
          <span><Train size={16} />近 2 号线静安寺站，步行约 8 分钟；商场地下停车 2 小时内优惠</span>
          <span><Clock3 size={16} />周一至周日 10:00 - 20:00</span>
          <span><Phone size={16} />400-886-0028</span>
        </div>
      </footer>
    </main>
  );
}
