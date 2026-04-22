import { useEffect, useMemo, useState } from 'react';

type ProductType = 'book' | 'video';

interface PricingInfo {
    amount: number;
    currency: string;
    label: string;
    description: string;
}

const PRICING: Record<ProductType, PricingInfo> = {
    book: {
        amount: 50,
        currency: 'AED',
        label: 'كتاب مصور',
        description: 'قصة مصورة مخصصة تظهر فيها شخصية طفلك.'
    },
    video: {
        amount: 80,
        currency: 'AED',
        label: 'فيلم كرتون',
        description: 'فيلم متحرك 2–5 دقائق مع مؤثرات وصوت.'
    }
};

const VALUES = [
    { id: 'honesty', label: 'الصدق والأمانة', icon: '⭐' },
    { id: 'help', label: 'مساعدة الآخرين', icon: '🤲' },
    { id: 'environment', label: 'الاهتمام بالبيئة', icon: '🌿' },
    { id: 'reading', label: 'حب القراءة', icon: '📖' },
    { id: 'courage', label: 'الشجاعة', icon: '🦁' },
    { id: 'family', label: 'احترام العائلة', icon: '❤️' }
];

const ENVIRONMENTS = [
    { id: 'forest', label: 'الغابة', icon: '🌳' },
    { id: 'city', label: 'المدينة', icon: '🏙️' },
    { id: 'sea', label: 'البحر', icon: '🌊' },
    { id: 'desert', label: 'الصحراء', icon: '🏜️' },
    { id: 'school', label: 'المدرسة', icon: '🏫' },
    { id: 'space', label: 'الفضاء', icon: '🚀' }
];

const DIALECTS = [
    { id: 'fus7a', label: 'عربية فصحى' },
    { id: 'khaleeji', label: 'اللهجة الخليجية' },
    { id: 'masri', label: 'المصرية' },
    { id: 'shami', label: 'الشامية' }
];

function getInitialType(): ProductType {
    if (typeof window === 'undefined') return 'book';
    const p = new URLSearchParams(window.location.search).get('type');
    return p === 'video' ? 'video' : 'book';
}

export default function CreateStoryWizard() {
    const [step, setStep] = useState(1);
    const [productType, setProductType] = useState<ProductType>('book');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>('');
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [value, setValue] = useState(VALUES[0].id);
    const [environment, setEnvironment] = useState(ENVIRONMENTS[0].id);
    const [dialect, setDialect] = useState(DIALECTS[0].id);
    const [notes, setNotes] = useState('');

    const [payName, setPayName] = useState('');
    const [payEmail, setPayEmail] = useState('');
    const [payCard, setPayCard] = useState('');
    const [payExp, setPayExp] = useState('');
    const [payCvc, setPayCvc] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [confirmed, setConfirmed] = useState<null | { orderId: string; amount: number; currency: string }>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setProductType(getInitialType());
    }, []);

    const pricing = PRICING[productType];

    const valueLabel = useMemo(() => VALUES.find((v) => v.id === value)?.label ?? '', [value]);
    const envLabel = useMemo(() => ENVIRONMENTS.find((v) => v.id === environment)?.label ?? '', [environment]);
    const dialectLabel = useMemo(() => DIALECTS.find((v) => v.id === dialect)?.label ?? '', [dialect]);

    function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setError('الرجاء اختيار ملف صورة صالح.');
            return;
        }
        if (file.size > 8 * 1024 * 1024) {
            setError('حجم الصورة كبير، الحد الأقصى 8MB.');
            return;
        }
        setError('');
        setPhoto(file);
        const reader = new FileReader();
        reader.onload = () => setPhotoPreview(String(reader.result));
        reader.readAsDataURL(file);
    }

    function formatCard(v: string) {
        const digits = v.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    }

    function formatExp(v: string) {
        const digits = v.replace(/\D/g, '').slice(0, 4);
        if (digits.length < 3) return digits;
        return digits.slice(0, 2) + '/' + digits.slice(2);
    }

    function canGoFrom1() {
        return !!photo && childName.trim().length > 1;
    }
    function canGoFrom2() {
        return !!value && !!environment && !!dialect;
    }
    function canPay() {
        const cardDigits = payCard.replace(/\s/g, '');
        return (
            payName.trim().length > 2 &&
            /@/.test(payEmail) &&
            cardDigits.length >= 13 &&
            /^\d{2}\/\d{2}$/.test(payExp) &&
            /^\d{3,4}$/.test(payCvc)
        );
    }

    async function submitOrder() {
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productType,
                    amount: pricing.amount,
                    currency: pricing.currency,
                    child: { name: childName, age: childAge ? Number(childAge) : null },
                    story: { value, valueLabel, environment, envLabel, dialect, dialectLabel, notes },
                    customer: { name: payName, email: payEmail },
                    payment: {
                        cardLast4: payCard.replace(/\s/g, '').slice(-4),
                        exp: payExp
                    }
                })
            });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || 'تعذر إتمام الطلب');
            setConfirmed({ orderId: data.orderId, amount: data.amount, currency: data.currency });
            setStep(5);
        } catch (e: any) {
            setError(e.message || 'حدث خطأ غير متوقع');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="card">
                <Stepper current={step} />

                {error && <div className="mt-4 rounded-2xl bg-accent-500/10 text-accent-600 px-4 py-3 text-sm font-semibold">{error}</div>}

                {step === 1 && (
                    <div className="mt-8 space-y-6">
                        <h2 className="text-brand-800">١. اختر نوع المنتج</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {(['book', 'video'] as ProductType[]).map((t) => {
                                const info = PRICING[t];
                                const active = productType === t;
                                return (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setProductType(t)}
                                        className={`text-right rounded-3xl p-5 border-2 transition-all ${active ? 'border-brand-600 bg-brand-50' : 'border-brand-100 bg-white hover:border-brand-300'}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl">{t === 'book' ? '📖' : '🎬'}</span>
                                            <span className="text-brand-700 font-black">
                                                {info.amount} <span className="text-sm">{info.currency}</span>
                                            </span>
                                        </div>
                                        <div className="mt-3 font-extrabold text-brand-800">{info.label}</div>
                                        <p className="text-brand-600 text-sm mt-1">{info.description}</p>
                                    </button>
                                );
                            })}
                        </div>

                        <div>
                            <label className="label">صورة الطفل</label>
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-brand-200 bg-cream-50 rounded-3xl p-6 cursor-pointer hover:border-brand-400 transition-colors">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="معاينة" className="w-32 h-32 object-cover rounded-2xl shadow" />
                                ) : (
                                    <>
                                        <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                            </svg>
                                        </div>
                                        <div className="font-bold text-brand-700">انقر لاختيار صورة</div>
                                        <div className="text-xs text-brand-500 mt-1">JPG أو PNG بحد أقصى 8MB</div>
                                    </>
                                )}
                                <input type="file" accept="image/*" onChange={onPhotoChange} className="hidden" />
                            </label>
                            {photo && (
                                <p className="mt-2 text-sm text-brand-600">
                                    {photo.name} — {(photo.size / 1024).toFixed(0)} KB
                                </p>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="label">اسم الطفل</label>
                                <input className="input" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="مثال: أحمد" />
                            </div>
                            <div>
                                <label className="label">العمر (اختياري)</label>
                                <input className="input" type="number" min={3} max={14} value={childAge} onChange={(e) => setChildAge(e.target.value)} placeholder="مثال: 6" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button disabled={!canGoFrom1()} onClick={() => setStep(2)} className="btn btn-primary">
                                التالي →
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="mt-8 space-y-6">
                        <h2 className="text-brand-800">٢. خصص قصتك</h2>

                        <div>
                            <label className="label">القيمة الأخلاقية</label>
                            <div className="flex flex-wrap gap-2">
                                {VALUES.map((v) => (
                                    <button
                                        key={v.id}
                                        type="button"
                                        onClick={() => setValue(v.id)}
                                        className={`chip ${value === v.id ? 'chip-active' : ''}`}
                                    >
                                        <span>{v.icon}</span>
                                        <span>{v.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="label">البيئة</label>
                            <div className="flex flex-wrap gap-2">
                                {ENVIRONMENTS.map((e) => (
                                    <button
                                        key={e.id}
                                        type="button"
                                        onClick={() => setEnvironment(e.id)}
                                        className={`chip ${environment === e.id ? 'chip-active' : ''}`}
                                    >
                                        <span>{e.icon}</span>
                                        <span>{e.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="label">اللغة / اللهجة</label>
                            <div className="flex flex-wrap gap-2">
                                {DIALECTS.map((d) => (
                                    <button
                                        key={d.id}
                                        type="button"
                                        onClick={() => setDialect(d.id)}
                                        className={`chip ${dialect === d.id ? 'chip-active' : ''}`}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="label">ملاحظات إضافية (اختياري)</label>
                            <textarea
                                className="textarea"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="اكتب تفاصيل ترغب بإضافتها للقصة، مثل هواية الطفل أو موقف حدث معه..."
                            />
                        </div>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="btn btn-ghost">← رجوع</button>
                            <button disabled={!canGoFrom2()} onClick={() => setStep(3)} className="btn btn-primary">التالي →</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="mt-8 space-y-6">
                        <h2 className="text-brand-800">٣. راجع الطلب</h2>
                        <div className="rounded-3xl bg-cream-100 p-5 border border-brand-100 space-y-3 text-sm">
                            <Row label="نوع المنتج" value={pricing.label} />
                            <Row label="اسم الطفل" value={childName} />
                            {childAge && <Row label="العمر" value={childAge} />}
                            <Row label="القيمة" value={valueLabel} />
                            <Row label="البيئة" value={envLabel} />
                            <Row label="اللهجة" value={dialectLabel} />
                            {notes && <Row label="ملاحظات" value={notes} />}
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => setStep(2)} className="btn btn-ghost">← رجوع</button>
                            <button onClick={() => setStep(4)} className="btn btn-primary">الانتقال إلى الدفع ←</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="mt-8 space-y-6">
                        <h2 className="text-brand-800">٤. الدفع الآمن</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="label">الاسم الكامل</label>
                                <input className="input" value={payName} onChange={(e) => setPayName(e.target.value)} placeholder="كما على البطاقة" />
                            </div>
                            <div>
                                <label className="label">البريد الإلكتروني</label>
                                <input className="input" type="email" value={payEmail} onChange={(e) => setPayEmail(e.target.value)} placeholder="example@mail.com" />
                            </div>
                        </div>
                        <div>
                            <label className="label">رقم البطاقة</label>
                            <input
                                className="input tracking-widest"
                                inputMode="numeric"
                                dir="ltr"
                                value={payCard}
                                onChange={(e) => setPayCard(formatCard(e.target.value))}
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">تاريخ الانتهاء</label>
                                <input
                                    className="input"
                                    dir="ltr"
                                    value={payExp}
                                    onChange={(e) => setPayExp(formatExp(e.target.value))}
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label className="label">CVC</label>
                                <input
                                    className="input"
                                    dir="ltr"
                                    inputMode="numeric"
                                    maxLength={4}
                                    value={payCvc}
                                    onChange={(e) => setPayCvc(e.target.value.replace(/\D/g, ''))}
                                    placeholder="123"
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-700 flex items-center gap-3">
                            <span>🔒</span>
                            <span>بياناتك مشفرة وآمنة. سيتم خصم المبلغ عند تأكيد الطلب فقط.</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <button onClick={() => setStep(3)} className="btn btn-ghost" disabled={submitting}>← رجوع</button>
                            <button onClick={submitOrder} disabled={!canPay() || submitting} className="btn btn-accent btn-lg">
                                {submitting ? 'جاري المعالجة...' : `ادفع ${pricing.amount} ${pricing.currency}`}
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && confirmed && (
                    <div className="mt-8 text-center py-8">
                        <div className="mx-auto w-20 h-20 rounded-full bg-brand-600 text-cream-100 flex items-center justify-center mb-6">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M5 12l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-brand-800">تم تأكيد طلبك!</h2>
                        <p className="mt-3 text-brand-600 max-w-md mx-auto">
                            شكراً {payName || 'لك'}! بدأنا بالعمل على {pricing.label} لطفلك <strong>{childName}</strong>.
                            سنرسل {pricing.label} جاهزاً إلى <strong>{payEmail}</strong>.
                        </p>
                        <div className="mt-6 inline-block rounded-2xl bg-cream-100 px-5 py-3 text-brand-700 font-bold">
                            رقم الطلب: <span className="font-mono">{confirmed.orderId}</span> — المبلغ: {confirmed.amount} {confirmed.currency}
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <a href="/library" className="btn btn-ghost">تصفح المكتبة</a>
                            <a href="/create" className="btn btn-primary">أنشئ قصة أخرى</a>
                        </div>
                    </div>
                )}
            </div>

            <aside className="card h-fit sticky top-24">
                <h3 className="text-brand-800 font-extrabold">ملخص الطلب</h3>
                <div className="mt-5 rounded-2xl bg-gradient-to-bl from-cream-100 to-white p-4 flex items-center gap-3">
                    {photoPreview ? (
                        <img src={photoPreview} alt="طفلك" className="w-16 h-16 rounded-2xl object-cover shadow" />
                    ) : (
                        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-3xl flex items-center justify-center">🧒</div>
                    )}
                    <div>
                        <div className="font-bold text-brand-800">{childName || 'طفلك'}</div>
                        <div className="text-xs text-brand-500">{productType === 'book' ? 'كتاب مصور' : 'فيلم كرتون'}</div>
                    </div>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                    <SummaryRow label="المنتج" value={pricing.label} />
                    <SummaryRow label="القيمة" value={valueLabel} />
                    <SummaryRow label="البيئة" value={envLabel} />
                    <SummaryRow label="اللهجة" value={dialectLabel} />
                </dl>

                <div className="mt-6 border-t border-brand-100 pt-4 flex items-center justify-between">
                    <span className="text-brand-600 font-semibold">الإجمالي</span>
                    <span className="text-2xl font-black text-brand-700">
                        {pricing.amount} <span className="text-sm font-bold">{pricing.currency}</span>
                    </span>
                </div>
                <p className="mt-3 text-xs text-brand-500 text-center">الضرائب شاملة. دفع آمن عبر بوابة مشفرة.</p>
            </aside>
        </div>
    );
}

function Stepper({ current }: { current: number }) {
    const labels = ['الصورة والمنتج', 'تخصيص القصة', 'المراجعة', 'الدفع', 'الإتمام'];
    return (
        <ol className="flex items-center gap-2 overflow-x-auto">
            {labels.map((l, i) => {
                const n = i + 1;
                const active = current === n;
                const done = current > n;
                return (
                    <li key={l} className="flex items-center gap-2 shrink-0">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                done ? 'bg-brand-600 text-cream-100' : active ? 'bg-accent-500 text-white' : 'bg-brand-50 text-brand-500'
                            }`}
                        >
                            {done ? '✓' : n}
                        </div>
                        <span className={`text-xs font-bold ${active ? 'text-brand-800' : 'text-brand-500'}`}>{l}</span>
                        {i < labels.length - 1 && <span className="w-6 h-px bg-brand-100 mx-1" />}
                    </li>
                );
            })}
        </ol>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-brand-500 font-semibold">{label}</span>
            <span className="text-brand-800 font-bold text-left">{value}</span>
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-2 text-sm">
            <dt className="text-brand-500">{label}</dt>
            <dd className="text-brand-700 font-bold text-left">{value || '—'}</dd>
        </div>
    );
}
