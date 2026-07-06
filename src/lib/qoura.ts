// Qoura AI — bilingual site content (source: Company Profile & Brand Guidelines, Feb 2026)

export type Lang = 'ar' | 'en';

export const CONTACT = {
    email: 'info@qoura.ai',
    phone: '+971 50 730 0052',
    phoneHref: 'tel:+971507300052',
    whatsapp: 'https://wa.me/971507300052',
    site: 'www.qoura.ai'
};

const ar = {
    dir: 'rtl',
    htmlLang: 'ar',
    langSwitch: { label: 'English', href: '/en/' },
    meta: {
        title: 'قرى AI | تمكين المجتمع والمؤسسات بالذكاء الاصطناعي',
        description:
            'قرى AI شركة إماراتية متخصصة في تمكين الجهات الحكومية وشبه الحكومية والقطاع الخاص بالذكاء الاصطناعي عبر برامج تدريب تطبيقية، واستشارات مؤسسية، وحلول تقنية متقدمة — بلغة عربية واضحة وفهم عميق للثقافة الإماراتية.'
    },
    nav: [
        { label: 'من نحن', href: '#about' },
        { label: 'خدماتنا', href: '#services' },
        { label: 'مسارات التدريب', href: '#tracks' },
        { label: 'منهجيتنا', href: '#methodology' },
        { label: 'الأثر', href: '#impact' },
        { label: 'شركاء النجاح', href: '#partners' }
    ],
    cta: 'تواصل معنا',
    hero: {
        badge: 'شركة إماراتية · أبوظبي',
        title: 'نبني قدرات وطنية في الذكاء الاصطناعي',
        sub: 'برامج تدريب تطبيقية، واستشارات مؤسسية، وحلول تقنية متقدمة للجهات الحكومية وشبه الحكومية والقطاع الخاص — بلغة عربية واضحة وفهم عميق للثقافة الإماراتية.',
        primary: 'اطلب برنامجًا تدريبيًا',
        secondary: 'استكشف خدماتنا',
        note: 'بما يتوافق مع توجهات الاستراتيجية الوطنية للذكاء الاصطناعي 2031'
    },
    stats: [
        { value: '+5,000', label: 'مستفيد من البرامج التدريبية' },
        { value: '+500', label: 'طفل تم تمكينه وتدريبه' },
        { value: '+10', label: 'وكلاء ذكاء اصطناعي تم تطويرهم' },
        { value: '5', label: 'مراحل منهجية تنفيذ مُجرّبة' }
    ],
    trustedTitle: 'جهات وثقت بنا وعملنا معها',
    trusted: ['ديوان ولي العهد', 'هيئة تنمية الأسرة', 'صندوق خليفة', 'معرض أديبك ADIPEC', 'مؤتمر الشرق الأوسط للشباب'],
    about: {
        heading: 'من نحن',
        sub: 'About Qoura AI',
        p1: 'قرى AI شركة إماراتية متخصصة في تمكين المجتمع والمؤسسات بالذكاء الاصطناعي. نؤمن بأن الذكاء الاصطناعي ليس معرفة نظرية، بل قدرة وطنية يجب أن تتحول إلى مهارة عملية تُنتج حلولًا ومشاريع وأثرًا يُقاس.',
        p2: 'نصمّم وننفّذ برامج وورش عمل ومسارات تطوير، ونبني حلولًا تقنية مخصصة لكل جهة بما يتناسب مع مجالها وبياناتها وعملياتها — بأسلوب واضح وبسيط وباللغة العربية.',
        nameStory:
            'اسم «قرى» يحمل دلالة عميقة — فهو يشير إلى القرى والمجتمعات المحلية التي نسعى لتمكينها رقميًا، إيمانًا بأن الموهبة موجودة في كل مكان، وما ينقصها هو المسار الصحيح والتدريب العملي والبيئة الداعمة.'
    },
    vision: {
        visionTitle: 'رؤيتنا',
        vision: 'أن نصبح منصة رائدة في المنطقة لبناء جيل قادر على فهم الذكاء الاصطناعي واستخدامه وصناعته، مع ضمان شمول المناطق البعيدة والمجتمعات الأقل وصولًا للفرص الرقمية.',
        missionTitle: 'رسالتنا',
        mission: 'تمكين الأفراد والمؤسسات من استخدام الذكاء الاصطناعي بشكل عملي ومسؤول وقابل للقياس عبر التدريب التطبيقي وتطوير الحلول ودعم التحول المؤسسي.'
    },
    valuesTitle: 'قيمنا الأساسية',
    values: [
        { title: 'الوضوح والبساطة', desc: 'تبسيط المعرفة دون تقليل قيمتها' },
        { title: 'الأثر والنتائج', desc: 'التدريب والحلول تُقاس بمخرجات واضحة' },
        { title: 'الهوية والثقافة', desc: 'توطين المحتوى بما يناسب الثقافة الإماراتية' },
        { title: 'الابتكار المسؤول', desc: 'مراعاة الخصوصية وأخلاقيات الاستخدام' },
        { title: 'الشمول', desc: 'فرص متساوية للمناطق البعيدة والمجتمعات المحلية' }
    ],
    services: {
        heading: 'خدماتنا',
        sub: 'ثلاث ركائز متكاملة — والتدريب في القلب منها',
        items: [
            {
                tag: 'الخدمة الأساسية',
                title: 'برامج التدريب وبناء القدرات',
                en: 'AI Capability Building',
                desc: 'برامج تدريبية تطبيقية ترفع جاهزية وإنتاجية الجهات الحكومية وشبه الحكومية، وتحسّن العمليات والتسويق وخدمة المتعاملين في القطاع الخاص، وتمكّن الطلاب والأطفال والناشئة عبر تعليم عملي قائم على المشاريع.',
                points: ['نماذج عملية وملفات جاهزة للاستخدام', 'مشاريع ووكلاء ذكاء اصطناعي كمخرجات', 'قياس تحسّن واضح بعد كل برنامج']
            },
            {
                tag: '',
                title: 'الاستشارات المؤسسية',
                en: 'AI Advisory',
                desc: 'نساعد الجهات على تحديد أفضل حالات الاستخدام حسب أولوياتها، وتصميم خارطة طريق للتبني، وبناء سياسات الاستخدام المسؤول، وتطوير جاهزية الفرق.',
                points: ['خارطة طريق للتبني (AI Roadmap)', 'سياسات الذكاء الاصطناعي المسؤول', 'مؤشرات أداء وقياس أثر (KPIs)']
            },
            {
                tag: '',
                title: 'الحلول التقنية',
                en: 'AI Solutions',
                desc: 'نطوّر حلولًا مخصصة تشمل وكلاء ذكاء اصطناعي داخليين لدعم فرق العمل، وأتمتة الإجراءات المتكررة، وتحليل البيانات واستخراج مؤشرات وتقارير ذكية.',
                points: ['AI Agents داخلية مخصصة', 'أتمتة إجراءات العمل', 'تحليل بيانات وتقارير ذكية']
            }
        ]
    },
    tracks: {
        heading: 'مسارات التدريب',
        sub: 'أمثلة على برامجنا التطبيقية — تُصمَّم حسب احتياج كل جهة',
        items: [
            { title: 'أساسيات الذكاء الاصطناعي التوليدي', desc: 'باللغة العربية وبأسلوب مبسط' },
            { title: 'تطبيقات الذكاء الاصطناعي في العمل', desc: 'تقارير، مراسلات، تلخيص، عروض' },
            { title: 'بناء وكلاء الذكاء الاصطناعي', desc: 'AI Agents لتنفيذ مهام داخلية' },
            { title: 'الأتمتة وربط الأدوات', desc: 'Workflows لتسريع العمل' },
            { title: 'تحليل البيانات', desc: 'صناعة القرار المدعوم بالذكاء الاصطناعي' },
            { title: 'مسارات الأطفال والناشئة', desc: 'تعلم تفاعلي ينتهي بمشروع أو نموذج أولي' }
        ],
        outcome: 'مخرجات كل برنامج: نماذج عملية + ملفات جاهزة + مشاريع أو وكلاء + قياس تحسّن'
    },
    audiences: {
        heading: 'من نخدم',
        items: [
            { title: 'الجهات الحكومية وشبه الحكومية', desc: 'تدريب + استشارات + حلول تقنية' },
            { title: 'الشركات والمؤسسات الخاصة', desc: 'تدريب + أتمتة + تحليل بيانات' },
            { title: 'المدارس والجامعات', desc: 'برامج تعليمية تطبيقية' },
            { title: 'الأطفال والناشئة والشباب', desc: 'مسارات تعليمية تفاعلية' },
            { title: 'المجتمعات الريفية والمناطق البعيدة', desc: 'تمكين رقمي حضوري وعن بعد' }
        ]
    },
    methodology: {
        heading: 'منهجيتنا في التنفيذ',
        sub: 'أسلوب عملي واضح ومُجرّب من خمس مراحل',
        steps: [
            { title: 'فهم الاحتياج', desc: 'تحليل دقيق لاحتياجات الجهة لضمان تصميم حلول مخصصة.' },
            { title: 'التصميم', desc: 'بناء المسار أو الحل بناءً على الواقع الفعلي وليس قالبًا عامًا.' },
            { title: 'التنفيذ التفاعلي', desc: 'تطبيق عملي يعتمد على المخرجات والمشاريع وليس المحاضرات النظرية.' },
            { title: 'قياس الأثر', desc: 'تقييم واضح للمخرجات والمهارات المكتسبة والتحسن في الإنتاجية.' },
            { title: 'الاستدامة', desc: 'مواد متابعة ودعم ما بعد التنفيذ لضمان استمرارية الأثر.' }
        ]
    },
    why: {
        heading: 'لماذا قرى AI',
        items: [
            { title: 'توطين الذكاء الاصطناعي', desc: 'محتوى عربي مبسّط بوعي ثقافي إماراتي' },
            { title: 'خبرة مؤسسية وحكومية', desc: 'فهم عميق لاحتياجات الجهات وآليات عملها' },
            { title: 'تطبيق عملي لا نظري', desc: 'كل برنامج ينتهي بمخرجات قابلة للاستخدام' },
            { title: 'تمكين المناطق البعيدة', desc: 'بناء فرص رقمية محلية مستدامة' },
            { title: 'فريق بخبرة دولية', desc: 'خبرات تنفيذية وتقنية من Silicon Valley وPwC' },
            { title: 'جاهزية للشراكات', desc: 'نماذج تنفيذ مرنة: حضوري، عن بعد، أو هجين' }
        ]
    },
    presence: {
        heading: 'حضور مؤسسي موثّق',
        items: [
            {
                title: 'معرض أديبك ADIPEC',
                desc: 'شاركنا في أحد أكبر معارض الطاقة عالميًا، حيث عُرضت مخرجات الأطفال المتدربين أمام جمهور دولي.'
            },
            {
                title: 'مؤتمر الشرق الأوسط للشباب',
                desc: 'مشاركة موثّقة رسميًا تضمّنت عرض مخرجات برامجنا وصور الأطفال المتدربين مع معالي د. سلطان أحمد الجابر.'
            }
        ]
    },
    ctaBand: {
        title: 'جاهزون لبناء قدرات فريقكم في الذكاء الاصطناعي؟',
        sub: 'نصمّم البرنامج المناسب لجهتكم — حضوريًا أو عن بعد أو هجينًا.',
        button: 'اطلب عرضًا الآن'
    },
    contact: {
        heading: 'تواصل معنا',
        sub: 'يسعدنا التواصل مع الجهات الحكومية وشبه الحكومية والقطاع الخاص',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        whatsapp: 'واتساب',
        whatsappCta: 'راسلنا مباشرة',
        location: 'المقر',
        locationValue: 'أبوظبي — دولة الإمارات العربية المتحدة',
        form: {
            name: 'الاسم الكامل',
            entity: 'الجهة / المؤسسة',
            email: 'البريد الإلكتروني',
            interest: 'مجال الاهتمام',
            interests: ['برامج التدريب وبناء القدرات', 'الاستشارات المؤسسية', 'الحلول التقنية', 'أخرى'],
            message: 'رسالتك',
            submit: 'إرسال الطلب'
        }
    },
    footer: {
        tagline: 'تمكين المجتمع والمؤسسات بالذكاء الاصطناعي — بلغة عربية واضحة وأثر يُقاس.',
        quickLinks: 'روابط سريعة',
        contactTitle: 'التواصل',
        rights: `جميع الحقوق محفوظة لشركة قرى للذكاء الاصطناعي © ${new Date().getFullYear()}`
    }
};

const en: typeof ar = {
    dir: 'ltr',
    htmlLang: 'en',
    langSwitch: { label: 'العربية', href: '/' },
    meta: {
        title: 'Qoura AI | Empowering People & Organizations with AI',
        description:
            'Qoura AI is a UAE company empowering government, semi-government and private-sector organizations with applied AI training, institutional advisory, and advanced solutions such as AI agents, automation and data analytics — delivered in clear Arabic with deep local cultural understanding.'
    },
    nav: [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Training Tracks', href: '#tracks' },
        { label: 'Methodology', href: '#methodology' },
        { label: 'Impact', href: '#impact' },
        { label: 'Partners', href: '#partners' }
    ],
    cta: 'Contact Us',
    hero: {
        badge: 'UAE Company · Abu Dhabi',
        title: 'Building National AI Capability',
        sub: 'Applied AI training programs, institutional advisory, and advanced technical solutions for government, semi-government and private-sector organizations — in clear Arabic, with deep understanding of Emirati culture.',
        primary: 'Request a Training Program',
        secondary: 'Explore Our Services',
        note: 'Aligned with the UAE National AI Strategy 2031'
    },
    stats: [
        { value: '+5,000', label: 'training program beneficiaries' },
        { value: '+500', label: 'children empowered and trained' },
        { value: '+10', label: 'AI agents developed' },
        { value: '5', label: 'proven delivery phases' }
    ],
    trustedTitle: 'Entities that trusted and worked with us',
    trusted: ['Crown Prince Court', 'Family Development Foundation', 'Khalifa Fund', 'ADIPEC', 'Middle East Youth Conference'],
    about: {
        heading: 'Who We Are',
        sub: 'قرى للذكاء الاصطناعي',
        p1: 'Qoura AI is a UAE company specialized in empowering communities and organizations with artificial intelligence. We believe AI is not theoretical knowledge — it is a national capability that must become a practical skill producing solutions, projects and measurable impact.',
        p2: 'We design and deliver programs, workshops and development tracks, and build custom technical solutions for each entity — matched to its field, data and operations — in a clear, simple style.',
        nameStory:
            'The name "Qoura" (قرى, Arabic for villages) carries deep meaning: it refers to the villages and local communities we work to empower digitally — because talent exists everywhere; what it lacks is the right path, practical training and a supportive environment.'
    },
    vision: {
        visionTitle: 'Our Vision',
        vision: 'To become a leading regional platform for building a generation able to understand, use and create AI — while ensuring remote areas and underserved communities are never excluded from digital opportunity.',
        missionTitle: 'Our Mission',
        mission: 'Empowering individuals and organizations to use AI practically, responsibly and measurably — through applied training, solution development and institutional transformation support.'
    },
    valuesTitle: 'Our Core Values',
    values: [
        { title: 'Clarity & Simplicity', desc: 'Simplifying knowledge without diminishing its value' },
        { title: 'Impact & Results', desc: 'Training and solutions measured by clear outcomes' },
        { title: 'Identity & Culture', desc: 'Content localized for Emirati culture' },
        { title: 'Responsible Innovation', desc: 'Privacy and ethics built into everything we do' },
        { title: 'Inclusion', desc: 'Equal opportunity for remote areas and local communities' }
    ],
    services: {
        heading: 'Our Services',
        sub: 'Three integrated pillars — with training at the heart',
        items: [
            {
                tag: 'Core Service',
                title: 'Training & Capability Building',
                en: 'AI Capability Building',
                desc: 'Applied training programs that raise readiness and productivity for government and semi-government entities, improve operations, marketing and customer service for the private sector, and empower students and children through project-based learning.',
                points: ['Practical templates and ready-to-use files', 'Projects and AI agents as deliverables', 'Clear improvement measurement after every program']
            },
            {
                tag: '',
                title: 'Institutional Advisory',
                en: 'AI Advisory',
                desc: 'We help entities identify the highest-priority use cases, design an AI adoption roadmap, build responsible-use policies, and develop team readiness across people, process and tools.',
                points: ['AI adoption roadmap', 'Responsible AI policies', 'KPIs and impact measurement']
            },
            {
                tag: '',
                title: 'Technical Solutions',
                en: 'AI Solutions',
                desc: 'We build custom solutions including internal AI agents that support work teams, automation of repetitive procedures, and data analytics with smart indicators and reports.',
                points: ['Custom internal AI agents', 'Workflow automation', 'Data analytics and smart reporting']
            }
        ]
    },
    tracks: {
        heading: 'Training Tracks',
        sub: 'Examples of our applied programs — tailored to each entity',
        items: [
            { title: 'Generative AI Fundamentals', desc: 'In Arabic, in a simplified style' },
            { title: 'AI Applications at Work', desc: 'Reports, correspondence, summaries, presentations' },
            { title: 'Building AI Agents', desc: 'Agents that execute internal tasks' },
            { title: 'Automation & Tool Integration', desc: 'Workflows that accelerate work' },
            { title: 'Data Analytics', desc: 'AI-supported decision making' },
            { title: 'Children & Youth Tracks', desc: 'Interactive learning ending in a project or prototype' }
        ],
        outcome: 'Every program delivers: practical templates + ready files + projects or agents + measured improvement'
    },
    audiences: {
        heading: 'Who We Serve',
        items: [
            { title: 'Government & Semi-Government Entities', desc: 'Training + advisory + technical solutions' },
            { title: 'Private Companies & Institutions', desc: 'Training + automation + data analytics' },
            { title: 'Schools & Universities', desc: 'Applied educational programs' },
            { title: 'Children, Youth & Students', desc: 'Interactive learning tracks' },
            { title: 'Rural Communities & Remote Areas', desc: 'On-site and remote digital empowerment' }
        ]
    },
    methodology: {
        heading: 'Our Delivery Methodology',
        sub: 'A clear, practical, proven five-phase approach',
        steps: [
            { title: 'Understand the Need', desc: 'Precise analysis of the entity’s needs to design tailored solutions.' },
            { title: 'Design', desc: 'Building the track or solution on actual reality — not a generic template.' },
            { title: 'Interactive Delivery', desc: 'Hands-on application driven by deliverables and projects, not theoretical lectures.' },
            { title: 'Measure Impact', desc: 'Clear evaluation of outputs, acquired skills and productivity gains.' },
            { title: 'Sustain', desc: 'Follow-up materials and post-delivery support to keep the impact going.' }
        ]
    },
    why: {
        heading: 'Why Qoura AI',
        items: [
            { title: 'AI Localization', desc: 'Simplified Arabic content with Emirati cultural awareness' },
            { title: 'Institutional & Government Expertise', desc: 'Deep understanding of how entities work' },
            { title: 'Practical, Not Theoretical', desc: 'Every program ends with usable deliverables' },
            { title: 'Empowering Remote Areas', desc: 'Building sustainable local digital opportunity' },
            { title: 'Internationally Experienced Team', desc: 'Executive and technical experience from Silicon Valley and PwC' },
            { title: 'Partnership Ready', desc: 'Flexible delivery models: on-site, remote or hybrid' }
        ]
    },
    presence: {
        heading: 'Documented Institutional Presence',
        items: [
            {
                title: 'ADIPEC',
                desc: 'We took part in one of the world’s largest energy exhibitions, where the work of our trained children was showcased to an international audience.'
            },
            {
                title: 'Middle East Youth Conference',
                desc: 'An officially documented participation, including our program outcomes and photos of trained children with H.E. Dr. Sultan Ahmed Al Jaber.'
            }
        ]
    },
    ctaBand: {
        title: 'Ready to build your team’s AI capability?',
        sub: 'We design the right program for your organization — on-site, remote or hybrid.',
        button: 'Request a Proposal'
    },
    contact: {
        heading: 'Contact Us',
        sub: 'We welcome government, semi-government and private-sector organizations',
        email: 'Email',
        phone: 'Phone',
        whatsapp: 'WhatsApp',
        whatsappCta: 'Message us directly',
        location: 'Headquarters',
        locationValue: 'Abu Dhabi — United Arab Emirates',
        form: {
            name: 'Full name',
            entity: 'Organization / Entity',
            email: 'Email',
            interest: 'Area of interest',
            interests: ['Training & Capability Building', 'Institutional Advisory', 'Technical Solutions', 'Other'],
            message: 'Your message',
            submit: 'Send Request'
        }
    },
    footer: {
        tagline: 'Empowering communities and organizations with AI — in clear Arabic, with measurable impact.',
        quickLinks: 'Quick Links',
        contactTitle: 'Contact',
        rights: `All rights reserved — Qoura AI © ${new Date().getFullYear()}`
    }
};

export const content = { ar, en };
