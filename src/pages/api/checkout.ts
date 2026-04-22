import type { APIRoute } from 'astro';

export const prerender = false;

const PRICES = {
    book: { amount: 50, currency: 'AED' },
    video: { amount: 80, currency: 'AED' }
} as const;

type ProductType = keyof typeof PRICES;

interface CheckoutPayload {
    productType?: ProductType;
    amount?: number;
    currency?: string;
    child?: { name?: string; age?: number | null };
    story?: {
        value?: string;
        valueLabel?: string;
        environment?: string;
        envLabel?: string;
        dialect?: string;
        dialectLabel?: string;
        notes?: string;
    };
    customer?: { name?: string; email?: string };
    payment?: { cardLast4?: string; exp?: string };
}

function generateOrderId() {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `HKY-${ts}-${rand}`;
}

export const POST: APIRoute = async ({ request }) => {
    let payload: CheckoutPayload;
    try {
        payload = (await request.json()) as CheckoutPayload;
    } catch {
        return json({ ok: false, error: 'Invalid JSON body' }, 400);
    }

    const productType = payload.productType;
    if (!productType || !(productType in PRICES)) {
        return json({ ok: false, error: 'نوع المنتج غير صالح' }, 400);
    }

    const expected = PRICES[productType];
    if (payload.amount !== expected.amount || payload.currency !== expected.currency) {
        return json({ ok: false, error: 'عدم تطابق المبلغ المطلوب' }, 400);
    }

    const customerEmail = payload.customer?.email ?? '';
    const customerName = payload.customer?.name ?? '';
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(customerEmail) || customerName.trim().length < 2) {
        return json({ ok: false, error: 'معلومات العميل غير مكتملة' }, 400);
    }

    const childName = payload.child?.name ?? '';
    if (childName.trim().length < 2) {
        return json({ ok: false, error: 'اسم الطفل غير صالح' }, 400);
    }

    const last4 = payload.payment?.cardLast4 ?? '';
    if (!/^\d{4}$/.test(last4)) {
        return json({ ok: false, error: 'بيانات البطاقة غير صالحة' }, 400);
    }

    const orderId = generateOrderId();

    return json({
        ok: true,
        orderId,
        amount: expected.amount,
        currency: expected.currency,
        status: 'confirmed',
        estimatedDelivery: productType === 'book' ? '5 دقائق' : '30 دقيقة',
        message: 'تم استلام طلبك بنجاح. سنرسل لك رابط التحميل عبر البريد الإلكتروني.'
    });
};

function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
}
