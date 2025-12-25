/**
 * ClinicPro - ملف الإعدادات الأساسية للنظام
 * إصدار: 1.0.0
 * تاريخ: 2024
 * 
 * ⚠️ ملاحظة مهمة: هذا الملف هو الأساس النهائي
 * جميع الإعدادات قابلة للتغيير من لوحة التحكم دون تعديل الكود
 * 
 * @author ClinicPro Team
 * @license MIT
 */

// ============================================================================
// 1. إعدادات النظام الأساسية - SYSTEM SETTINGS
// ============================================================================
const SYSTEM_CONFIG = {
    // معلومات النظام
    system: {
        name: "ClinicPro",
        version: "1.0.0",
        releaseDate: "2024-01-01",
        environment: "production", // يمكن أن تكون: development, staging, production
        defaultLanguage: "ar",
        supportedLanguages: ["ar", "en"],
        direction: "rtl",
        timezone: "Asia/Riyadh", // توقيت الرياض كافتراضي
        dateFormat: "YYYY-MM-DD",
        timeFormat: "24h", // أو 12h
        currency: "SAR", // ريال سعودي كافتراضي - قابل للتغيير
        currencySymbol: "ر.س",
        decimalPlaces: 2,
    },
    
    // إعدادات التوثيق والترخيص
    licensing: {
        licenseKey: "", // سيتم ملؤه تلقائياً
        licensedTo: "اسم العيادة الافتراضي",
        expiryDate: null, // null = لا ينتهي
        maxUsers: 10, // الحد الأقصى للمستخدمين
        maxDoctors: 5, // الحد الأقصى للأطباء
        features: {
            billing: true,
            prescriptions: true,
            appointments: true,
            inventory: false,
            labIntegration: false,
            radiologyIntegration: false,
        }
    }
};

// ============================================================================
// 2. إعدادات العيادة - CLINIC SETTINGS (قابلة للتغيير)
// ============================================================================
const CLINIC_CONFIG = {
    // معلومات العيادة الأساسية
    basicInfo: {
        name: "مركز العناية الطبية", // ⚡ قابل للتغيير من لوحة التحكم
        legalName: "",
        taxNumber: "", // الرقم الضريبي
        commercialRegistration: "", // السجل التجاري
        licenseNumber: "", // ترخيص مزاولة المهنة
        establishmentYear: 2020,
    },
    
    // معلومات الاتصال
    contact: {
        phone: "+966500000000", // ⚡ قابل للتغيير من لوحة التحكم
        secondaryPhone: "",
        email: "info@clinic.com", // ⚡ قابل للتغيير من لوحة التحكم
        website: "",
        whatsapp: "",
        emergencyContact: "",
    },
    
    // العنوان
    address: {
        street: "شارع الملك فهد", // ⚡ قابل للتغيير من لوحة التحكم
        district: "المركز",
        city: "الرياض",
        state: "منطقة الرياض",
        country: "المملكة العربية السعودية",
        postalCode: "12345",
        googleMapsLink: "",
        coordinates: { lat: 24.7136, lng: 46.6753 }, // إحداثيات الرياض
    },
    
    // وسائل التواصل الاجتماعي
    socialMedia: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
    }
};

// ============================================================================
// 3. إعدادات المظهر - THEME & UI SETTINGS (قابلة للتغيير)
// ============================================================================
const THEME_CONFIG = {
    // الألوان الأساسية
    colors: {
        primary: "#2D5BFF", // ⚡ اللون الأساسي - قابل للتغيير
        primaryDark: "#1E3FB3",
        primaryLight: "#E8EDFF",
        
        secondary: "#10B981", // ⚡ اللون الثانوي - قابل للتغيير
        secondaryDark: "#0E9C6B",
        secondaryLight: "#D1FAE5",
        
        accent: "#F59E0B",
        danger: "#EF4444",
        warning: "#F59E0B",
        success: "#10B981",
        info: "#3B82F6",
        
        // ألوان النص
        text: {
            primary: "#1F2937",
            secondary: "#6B7280",
            disabled: "#9CA3AF",
            inverse: "#FFFFFF",
        },
        
        // ألوان الخلفية
        background: {
            primary: "#FFFFFF",
            secondary: "#F9FAFB",
            tertiary: "#F3F4F6",
            dark: "#111827",
        },
        
        // ألوان الحدود
        borders: {
            light: "#E5E7EB",
            medium: "#D1D5DB",
            dark: "#9CA3AF",
        }
    },
    
    // الخطوط
    typography: {
        fontFamily: {
            arabic: "'Cairo', 'Tajawal', sans-serif", // ⚡ قابل للتغيير
            english: "'Inter', 'Roboto', sans-serif", // ⚡ قابل للتغيير
            code: "'Fira Code', monospace",
        },
        
        fontSize: {
            xs: "0.75rem",   // 12px
            sm: "0.875rem",  // 14px
            base: "1rem",    // 16px
            lg: "1.125rem",  // 18px
            xl: "1.25rem",   // 20px
            "2xl": "1.5rem", // 24px
            "3xl": "1.875rem", // 30px
            "4xl": "2.25rem",  // 36px
        },
        
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
        }
    },
    
    // الظلال
    shadows: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    
    // الزوايا
    borderRadius: {
        none: "0",
        sm: "0.125rem", // 2px
        md: "0.375rem", // 6px
        lg: "0.5rem",   // 8px
        xl: "0.75rem",  // 12px
        "2xl": "1rem",  // 16px
        full: "9999px",
    }
};

// ============================================================================
// 4. إعدادات المستخدمين والصلاحيات - USER & PERMISSIONS
// ============================================================================
const USER_CONFIG = {
    // مستويات المستخدمين
    roles: {
        // ⚡ قابلة للإضافة/التعديل من لوحة التحكم
        super_admin: {
            id: 1,
            name: "المشرف العام",
            description: "صلاحيات كاملة على النظام",
            level: 100,
            permissions: "all"
        },
        clinic_admin: {
            id: 2,
            name: "مدير العيادة",
            description: "إدارة العيادة والموظفين",
            level: 90,
            permissions: ["clinic_management", "user_management", "financial_reports"]
        },
        doctor: {
            id: 3,
            name: "طبيب",
            description: "إدارة المرضى والمواعيد والروشتات",
            level: 80,
            permissions: ["patient_management", "appointments", "prescriptions", "medical_records"]
        },
        receptionist: {
            id: 4,
            name: "موظف استقبال",
            description: "إدارة الحجوزات والمرضى",
            level: 70,
            permissions: ["appointment_booking", "patient_registration", "basic_reports"]
        },
        accountant: {
            id: 5,
            name: "محاسب",
            description: "إدارة الفواتير والمدفوعات",
            level: 60,
            permissions: ["billing", "payments", "financial_reports"]
        },
        patient: {
            id: 6,
            name: "مريض",
            description: "الوصول إلى مواعيده وفواتيره",
            level: 10,
            permissions: ["view_own_appointments", "view_own_bills", "book_appointments"]
        }
    },
    
    // إعدادات المصادقة
    authentication: {
        sessionTimeout: 30, // بالدقائق
        maxLoginAttempts: 5,
        lockoutDuration: 15, // بالدقائق
        passwordPolicy: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            expiryDays: 90, // تغيير كلمة المرور كل 90 يوم
        },
        twoFactorAuth: {
            enabled: false,
            methods: ["sms", "email", "authenticator"],
            defaultMethod: "sms"
        }
    }
};

// ============================================================================
// 5. إعدادات العمل - BUSINESS SETTINGS (قابلة للتغيير)
// ============================================================================
const BUSINESS_CONFIG = {
    // الأقسام الطبية
    departments: [
        // ⚡ قابلة للإضافة/التعديل من لوحة التحكم
        { id: 1, name: "الباطنة", code: "INT", active: true, color: THEME_CONFIG.colors.primary },
        { id: 2, name: "الأطفال", code: "PED", active: true, color: THEME_CONFIG.colors.secondary },
        { id: 3, name: "العظام", code: "ORT", active: true, color: "#8B5CF6" },
        { id: 4, name: "الجلدية", code: "DER", active: true, color: "#EC4899" },
        { id: 5, name: "النساء والتوليد", code: "OBG", active: true, color: "#F472B6" },
        { id: 6, name: "العيون", code: "OPH", active: true, color: "#06B6D4" },
        { id: 7, name: "الأنف والأذن والحنجرة", code: "ENT", active: true, color: "#84CC16" },
        { id: 8, name: "القلب", code: "CAR", active: true, color: "#EF4444" },
        { id: 9, name: "الأسنان", code: "DEN", active: true, color: "#10B981" },
        { id: 10, name: "التجميل", code: "COS", active: true, color: "#F59E0B" },
    ],
    
    // مواعيد العمل
    workingHours: {
        // ⚡ قابلة للتعديل من لوحة التحكم
        days: {
            sunday: { name: "الأحد", working: true, start: "08:00", end: "17:00", breaks: [{ start: "12:00", end: "13:00" }] },
            monday: { name: "الاثنين", working: true, start: "08:00", end: "17:00", breaks: [{ start: "12:00", end: "13:00" }] },
            tuesday: { name: "الثلاثاء", working: true, start: "08:00", end: "17:00", breaks: [{ start: "12:00", end: "13:00" }] },
            wednesday: { name: "الأربعاء", working: true, start: "08:00", end: "17:00", breaks: [{ start: "12:00", end: "13:00" }] },
            thursday: { name: "الخميس", working: true, start: "08:00", end: "17:00", breaks: [{ start: "12:00", end: "13:00" }] },
            friday: { name: "الجمعة", working: false, start: "09:00", end: "13:00", breaks: [] },
            saturday: { name: "السبت", working: false, start: "09:00", end: "13:00", breaks: [] },
        },
        timeSlots: {
            duration: 30, // دقائق لكل ميعاد
            bufferBetweenSlots: 5, // دقائق بين المواعيد
            maxSlotsPerDay: 20, // أقصى عدد مواعيد يومياً
        },
        holidays: [
            { date: "2024-09-23", name: "اليوم الوطني السعودي" },
            { date: "2024-06-16", name: "عيد الفطر" },
            { date: "2024-09-23", name: "عيد الأضحى" },
        ]
    },
    
    // الإجازات والعطلات
    holidays: {
        national: [
            { id: 1, name: "عيد الفطر", dateHijri: "01-10", duration: 3, fixedDate: false },
            { id: 2, name: "عيد الأضحى", dateHijri: "10-12", duration: 4, fixedDate: false },
            { id: 3, name: "اليوم الوطني", dateGregorian: "09-23", duration: 1, fixedDate: true },
        ],
        custom: [] // سيتم إضافتها من قبل المدير
    }
};

// ============================================================================
// 6. إعدادات الفواتير - BILLING SETTINGS
// ============================================================================
const BILLING_CONFIG = {
    // إعدادات عامة
    general: {
        invoicePrefix: "INV",
        invoiceNumberFormat: "{prefix}-{year}-{sequence}", // INV-2024-001
        nextInvoiceNumber: 1,
        taxNumberLabel: "الرقم الضريبي",
        taxRate: 15, // نسبة الضريبة الافتراضية
        discountLimit: 20, // أقصى خصم مسموح به (%)
        roundAmounts: true,
        currencyFormat: "arabic", // arabic أو western
    },
    
    // أنواع الفواتير
    invoiceTypes: [
        { id: 1, code: "CONS", name: "كشف", color: "#3B82F6", prefix: "CONS" },
        { id: 2, code: "LAB", name: "مختبر", color: "#10B981", prefix: "LAB" },
        { id: 3, code: "RAD", name: "أشعة", color: "#8B5CF6", prefix: "RAD" },
        { id: 4, code: "MED", name: "أدوية", color: "#F59E0B", prefix: "MED" },
        { id: 5, code: "PKG", name: "باقة", color: "#EC4899", prefix: "PKG" },
        { id: 6, code: "OTH", name: "أخرى", color: "#6B7280", prefix: "OTH" },
    ],
    
    // طرق الدفع
    paymentMethods: [
        { id: 1, code: "CASH", name: "نقدي", icon: "💵", enabled: true },
        { id: 2, code: "CARD", name: "بطاقة ائتمان", icon: "💳", enabled: true },
        { id: 3, code: "MADA", name: "مدى", icon: "🏦", enabled: true },
        { id: 4, code: "SADAD", name: "سداد", icon: "📱", enabled: true },
        { id: 5, code: "BANK", name: "تحويل بنكي", icon: "🏛️", enabled: true },
        { id: 6, code: "PAYPAL", name: "بايبال", icon: "🔗", enabled: true },
        { id: 7, code: "WALLET", name: "المحفظة", icon: "👛", enabled: true },
    ],
    
    // الحسابات البنكية
    bankAccounts: [
        {
            id: 1,
            bankName: "البنك الأهلي السعودي",
            accountName: CLINIC_CONFIG.basicInfo.name,
            accountNumber: "SA4420000001234567890",
            iban: "SA034200000001234567890",
            currency: "SAR",
            isDefault: true,
        }
    ],
    
    // إعدادات الفاتورة الإلكترونية (ZATCA - السعودية)
    eInvoice: {
        enabled: true,
        compliance: {
            country: "SA", // SA, EG, AE, etc.
            standards: ["ZATCA"], // ZATCA, EGS, etc.
            phase: "2", // مرحلة التوطين
        },
        requirements: {
            qrCode: true,
            cryptographicStamp: true,
            uuid: true,
            invoiceHash: true,
            previousInvoiceHash: true,
        },
        integration: {
            apiUrl: "https://zatca.gov.sa",
            apiVersion: "v2",
            productionMode: false, // true عندما يكون جاهز للإنتاج
        }
    },
    
    // الإشعارات المالية
    notifications: {
        invoiceCreated: true,
        paymentReceived: true,
        overdueReminder: true,
        lowBalance: true,
        dailySummary: true,
    }
};

// ============================================================================
// 7. إعدادات الدفع الإلكتروني - PAYMENT GATEWAYS
// ============================================================================
const PAYMENT_CONFIG = {
    // البوابات النشطة
    activeGateways: {
        saudi: ["mada", "sadad", "applepay"],
        egypt: ["fawry", "aman", "paymob"],
        uae: ["knet", "thawani", "network"],
        international: ["paypal", "stripe"],
    },
    
    // إعدادات كل بوابة
    gateways: {
        // السعودية
        mada: {
            name: "مدى",
            enabled: true,
            testMode: true,
            merchantId: "",
            terminalId: "",
            apiKey: "",
            callbackUrl: "/payment/mada/callback",
            supportedCards: ["mada", "visa", "mastercard"],
            fees: { percentage: 1.5, fixed: 0 },
        },
        
        // مصر
        fawry: {
            name: "فوري",
            enabled: true,
            testMode: true,
            merchantCode: "",
            securityKey: "",
            merchantRefNumber: "",
            paymentExpiry: 24, // ساعة
            callbackUrl: "/payment/fawry/callback",
            fees: { percentage: 2, fixed: 0 },
        },
        
        // PayPal (دولي)
        paypal: {
            name: "PayPal",
            enabled: true,
            testMode: true,
            clientId: "",
            clientSecret: "",
            environment: "sandbox", // sandbox أو production
            currency: "USD",
            callbackUrl: "/payment/paypal/callback",
            fees: { percentage: 2.9, fixed: 0.3 },
        },
        
        // Stripe (دولي)
        stripe: {
            name: "Stripe",
            enabled: false,
            testMode: true,
            publishableKey: "",
            secretKey: "",
            webhookSecret: "",
            currency: "USD",
            callbackUrl: "/payment/stripe/callback",
            fees: { percentage: 2.9, fixed: 0.3 },
        }
    },
    
    // إعدادات عامة
    general: {
        defaultGateway: "mada",
        autoCapture: true,
        saveCards: false,
        installmentPlans: {
            enabled: false,
            plans: [3, 6, 12] // عدد الأشهر
        },
        refundPolicy: {
            allowed: true,
            periodDays: 7,
            adminApproval: true,
        }
    }
};

// ============================================================================
// 8. إعدادات الروشتات - PRESCRIPTIONS SETTINGS
// ============================================================================
const PRESCRIPTION_CONFIG = {
    // إعدادات عامة
    general: {
        prescriptionPrefix: "RX",
        prescriptionNumberFormat: "{prefix}-{year}-{sequence}",
        nextPrescriptionNumber: 1,
        validityDays: 30, // صلاحية الروشتة بالأيام
        maxItems: 10, // أقصى عدد أدوية في الروشتة
        printHeader: true,
        printFooter: true,
        printDoctorStamp: true,
        printClinicStamp: true,
    },
    
    // مكونات الروشتة
    sections: [
        { id: 1, name: "تشخيص", required: true, order: 1 },
        { id: 2, name: "الأدوية", required: true, order: 2 },
        { id: 3, name: "التحاليل", required: false, order: 3 },
        { id: 4, name: "الأشعة", required: false, order: 4 },
        { id: 5, name: "التعليمات", required: false, order: 5 },
        { id: 6, name: "المتابعة", required: false, order: 6 },
    ],
    
    // القوالب الجاهزة
    templates: {
        diagnoses: [
            "التهاب رئوي",
            "التهاب شعبي حاد",
            "ارتفاع ضغط الدم",
            "داء السكري النوع الثاني",
            "فقر الدم",
            "ربو شعبي",
            "التهاب الجيوب الأنفية",
            "التهاب اللوزتين",
        ],
        instructions: [
            "تناول بعد الأكل",
            "تناول قبل الأكل",
            "مرة واحدة يومياً",
            "مرتين يومياً",
            "ثلاث مرات يومياً",
            "عند اللزوم",
            "دهان خارجي فقط",
            "يخلط مع الماء",
        ],
        warnings: [
            "يسبب نعاس - تجنب قيادة السيارة",
            "يجب تناول مع الطعام",
            "تجنب التعرض للشمس",
            "يمنع للحوامل",
            "يمنع للمرضع",
            "يجب إجراء تحاليل دورية",
            "يمنع تناول الكحول أثناء العلاج",
        ]
    },
    
    // الوحدات والجرعات
    units: {
        time: ["يوم", "أسبوع", "شهر", "سنة"],
        frequency: ["مرة واحدة", "مرتين", "ثلاث مرات", "أربع مرات", "كل 4 ساعات", "كل 6 ساعات", "كل 8 ساعات", "كل 12 ساعة", "عند اللزوم"],
        duration: ["يوم", "أسبوع", "أسبوعين", "شهر", "شهرين", "3 أشهر", "6 أشهر", "سنة", "مستمر"],
        route: ["فموي", "حقن", "موضعي", "شرجي", "تحاميل", "بخاخ", "قطرات"],
    }
};

// ============================================================================
// 9. إعدادات التقويم الهجري - HIJRI CALENDAR
// ============================================================================
const HIJRI_CONFIG = {
    enabled: true,
    calculationMethod: "ummalqura", // ummalqura, saudi, egyptian
    dateFormat: "dd/MM/yyyy هـ",
    displayFormat: "gregorian-hijri", // gregorian-only, hijri-only, gregregian-hijri
    holidaysBasedOn: "hijri", // gregorian أو hijri
    conversion: {
        adjustDays: 0, // تعديل الأيام (+/-)
        automaticConversion: true,
    },
    
    // أشهر الهجرية
    months: [
        { number: 1, arabic: "محرم", english: "Muharram" },
        { number: 2, arabic: "صفر", english: "Safar" },
        { number: 3, arabic: "ربيع الأول", english: "Rabi' al-Awwal" },
        { number: 4, arabic: "ربيع الآخر", english: "Rabi' al-Thani" },
        { number: 5, arabic: "جمادى الأولى", english: "Jumada al-Awwal" },
        { number: 6, arabic: "جمادى الآخرة", english: "Jumada al-Thani" },
        { number: 7, arabic: "رجب", english: "Rajab" },
        { number: 8, arabic: "شعبان", english: "Sha'ban" },
        { number: 9, arabic: "رمضان", english: "Ramadan" },
        { number: 10, arabic: "شوال", english: "Shawwal" },
        { number: 11, arabic: "ذو القعدة", english: "Dhu al-Qi'dah" },
        { number: 12, arabic: "ذو الحجة", english: "Dhu al-Hijjah" },
    ],
    
    // الأيام
    days: [
        { number: 1, arabic: "الأحد", english: "Sunday", short: "أحد" },
        { number: 2, arabic: "الاثنين", english: "Monday", short: "إثنين" },
        { number: 3, arabic: "الثلاثاء", english: "Tuesday", short: "ثلاثاء" },
        { number: 4, arabic: "الأربعاء", english: "Wednesday", short: "أربعاء" },
        { number: 5, arabic: "الخميس", english: "Thursday", short: "خميس" },
        { number: 6, arabic: "الجمعة", english: "Friday", short: "جمعة" },
        { number: 7, arabic: "السبت", english: "Saturday", short: "سبت" },
    ]
};

// ============================================================================
// 10. إعدادات الوسائط - MEDIA SETTINGS (قابلة للتغيير)
// ============================================================================
const MEDIA_CONFIG = {
    // الصور والشعارات
    images: {
        logo: {
            url: "/assets/images/logo.png", // ⚡ قابل للتغيير
            darkUrl: "/assets/images/logo-dark.png",
            alt: CLINIC_CONFIG.basicInfo.name,
            width: 180,
            height: 60,
        },
        favicon: "/assets/icons/favicon.ico",
        clinicLogo: "/assets/images/clinic-logo.png", // ⚡ قابل للتغيير
        defaultDoctorImage: "/assets/images/doctors/default-avatar.png",
        defaultPatientImage: "/assets/images/patients/default-avatar.png",
        loginBackground: "/assets/images/backgrounds/login-bg.jpg",
        dashboardBackground: "/assets/images/backgrounds/dashboard-bg.jpg",
    },
    
    // إعدادات تحميل الملفات
    upload: {
        allowedTypes: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
        maxSize: 5 * 1024 * 1024, // 5MB
        maxFiles: 10,
        storagePath: "/uploads/",
        namingConvention: "{timestamp}_{random}_{original}",
        compressImages: true,
        quality: 85, // نسبة الجودة للضغط
    },
    
    // الخطوط
    fonts: {
        primaryArabic: "Cairo", // ⚡ قابل للتغيير
        secondaryArabic: "Tajawal", // ⚡ قابل للتغيير
        primaryEnglish: "Inter", // ⚡ قابل للتغيير
        secondaryEnglish: "Roboto", // ⚡ قابل للتغيير
        cdn: {
            google: true,
            local: true,
        }
    }
};

// ============================================================================
// 11. إعدادات النسخ الاحتياطي - BACKUP SETTINGS
// ============================================================================
const BACKUP_CONFIG = {
    enabled: true,
    autoBackup: {
        enabled: true,
        frequency: "daily", // daily, weekly, monthly
        time: "02:00", // وقت النسخ الاحتياطي التلقائي
        keepCopies: 7, // عدد النسخ المحفوظة
    },
    manualBackup: {
        maxSize: 50 * 1024 * 1024, // 50MB
        includeMedia: true,
        includeDatabase: true,
        includeSettings: true,
    },
    storage: {
        local: true,
        cloud: false,
        cloudServices: {
            googleDrive: false,
            dropbox: false,
            oneDrive: false,
        },
        encryption: {
            enabled: true,
            algorithm: "aes-256-gcm",
        }
    },
    restore: {
        validation: true,
        dryRun: true, // تجربة الاستعادة قبل التنفيذ
        backupBeforeRestore: true,
    }
};

// ============================================================================
// 12. الإعدادات الإضافية - ADDITIONAL SETTINGS
// ============================================================================
const ADDITIONAL_CONFIG = {
    // المدن والمناطق
    locations: {
        countries: [
            { code: "SA", name: "المملكة العربية السعودية", phoneCode: "+966" },
            { code: "EG", name: "مصر", phoneCode: "+20" },
            { code: "AE", name: "الإمارات العربية المتحدة", phoneCode: "+971" },
            { code: "KW", name: "الكويت", phoneCode: "+965" },
            { code: "QA", name: "قطر", phoneCode: "+974" },
            { code: "BH", name: "البحرين", phoneCode: "+973" },
            { code: "OM", name: "عمان", phoneCode: "+968" },
            { code: "JO", name: "الأردن", phoneCode: "+962" },
        ],
        
        // مدن السعودية
        saudiCities: [
            "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
            "الخبر", "الطائف", "بريدة", "تبوك", "أبها",
            "حائل", "جازان", "نجران", "الجبيل", "ينبع",
        ],
        
        // مدن مصر
        egyptCities: [
            "القاهرة", "الإسكندرية", "الجيزة", "شبرا الخيمة", "بورسعيد",
            "السويس", "الأقصر", "أسوان", "دمياط", "المنصورة",
        ],
    },
    
    // أنواع الهوية
    idTypes: [
        { id: 1, code: "NATIONAL_ID", name: "هوية وطنية", country: "SA", length: 10 },
        { id: 2, code: "IQAMA", name: "إقامة", country: "SA", length: 10 },
        { id: 3, code: "PASSPORT", name: "جواز سفر", country: "ALL", length: 9 },
        { id: 4, code: "DRIVING_LICENSE", name: "رخصة قيادة", country: "ALL", length: 10 },
        { id: 5, code: "EG_NATIONAL_ID", name: "رقم قومي", country: "EG", length: 14 },
        { id: 6, code: "BIRTH_CERTIFICATE", name: "شهادة ميلاد", country: "ALL", length: null },
    ],
    
    // أنواع العلاقة
    relationshipTypes: [
        "زوج/زوجة", "أب", "أم", "ابن", "ابنة", "أخ", "أخت",
        "جد", "جدة", "حفيد", "حفيدة", "عم", "عمة", "خال", "خالة",
        "وصي", "كفيل", "صديق", "آخر",
    ],
    
    // فصائل الدم
    bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "غير معروف"],
    
    // حالات المريض
    patientStatuses: [
        { id: 1, code: "ACTIVE", name: "نشط", color: "#10B981" },
        { id: 2, code: "INACTIVE", name: "غير نشط", color: "#6B7280" },
        { id: 3, code: "BLOCKED", name: "محظور", color: "#EF4444" },
        { id: 4, code: "DECEASED", name: "متوفى", color: "#1F2937" },
    ]
};

// ============================================================================
// 13. التصدير النهائي - FINAL EXPORT
// ============================================================================

/**
 * تهيئة جميع إعدادات النظام
 * هذه الوظيفة تُنشئ نسخة عميقة من جميع الإعدادات
 */
function initializeSystemConfig() {
    return Object.freeze({
        // المجموعات الرئيسية
        system: Object.freeze({ ...SYSTEM_CONFIG.system }),
        licensing: Object.freeze({ ...SYSTEM_CONFIG.licensing }),
        
        // إعدادات قابلة للتعديل من لوحة التحكم
        clinic: Object.seal({ ...CLINIC_CONFIG }),
        theme: Object.seal({ ...THEME_CONFIG }),
        business: Object.seal({ ...BUSINESS_CONFIG }),
        
        // إعدادات المستخدمين
        users: Object.freeze({ ...USER_CONFIG }),
        
        // الإعدادات المالية
        billing: Object.seal({ ...BILLING_CONFIG }),
        payments: Object.seal({ ...PAYMENT_CONFIG }),
        
        // الإعدادات الطبية
        prescriptions: Object.seal({ ...PRESCRIPTION_CONFIG }),
        
        // الإعدادات التقنية
        hijri: Object.seal({ ...HIJRI_CONFIG }),
        media: Object.seal({ ...MEDIA_CONFIG }),
        backup: Object.seal({ ...BACKUP_CONFIG }),
        additional: Object.freeze({ ...ADDITIONAL_CONFIG }),
        
        // معلومات النسخة والتواريخ
        metadata: {
            configVersion: "1.0.0",
            lastModified: new Date().toISOString(),
            checksum: generateConfigChecksum(),
            environment: SYSTEM_CONFIG.system.environment,
        },
        
        // وظائف مساعدة
        utils: {
            getConfigValue(path) {
                return getNestedValue(this, path);
            },
            
            updateConfig(path, value) {
                return updateNestedValue(this, path, value);
            },
            
            exportConfig() {
                return JSON.stringify(this, null, 2);
            },
            
            resetToDefaults(section = null) {
                return resetConfigSection(this, section);
            }
        }
    });
}

// ============================================================================
// 14. وظائف المساعدة - HELPER FUNCTIONS
// ============================================================================

/**
 * توليد بصمة فريدة للإعدادات
 */
function generateConfigChecksum() {
    const configString = JSON.stringify({
        SYSTEM_CONFIG,
        CLINIC_CONFIG,
        THEME_CONFIG,
        USER_CONFIG,
        BUSINESS_CONFIG,
        BILLING_CONFIG,
        PAYMENT_CONFIG,
        PRESCRIPTION_CONFIG,
        HIJRI_CONFIG,
        MEDIA_CONFIG,
        BACKUP_CONFIG,
        ADDITIONAL_CONFIG
    });
    
    let hash = 0;
    for (let i = 0; i < configString.length; i++) {
        const char = configString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

/**
 * الحصول على قيمة متداخلة من الكائن
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

/**
 * تحديث قيمة متداخلة في الكائن
 */
function updateNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        return current[key];
    }, obj);
    
    if (target && lastKey) {
        target[lastKey] = value;
        return true;
    }
    return false;
}

/**
 * إعادة تعيين قسم معين للقيم الافتراضية
 */
function resetConfigSection(config, section) {
    const defaultSections = {
        clinic: CLINIC_CONFIG,
        theme: THEME_CONFIG,
        business: BUSINESS_CONFIG,
        billing: BILLING_CONFIG,
        payments: PAYMENT_CONFIG,
        prescriptions: PRESCRIPTION_CONFIG,
        hijri: HIJRI_CONFIG,
        media: MEDIA_CONFIG,
        backup: BACKUP_CONFIG,
    };
    
    if (section && defaultSections[section]) {
        Object.assign(config[section], defaultSections[section]);
        return true;
    }
    return false;
}

// ============================================================================
// 15. التصدير النهائي للنظام - SYSTEM EXPORT
// ============================================================================

// إنشاء وتجميد نسخة الإعدادات النهائية
const ClinicProConfig = initializeSystemConfig();

// منع أي تعديلات مباشرة على الكائن الرئيسي
Object.freeze(ClinicProConfig);

// التصدير للاستخدام في جميع أنحاء النظام
export default ClinicProConfig;

// تصدير وظائف المساعدة بشكل منفصل إذا لزم الأمر
export {
    generateConfigChecksum,
    getNestedValue,
    updateNestedValue,
    resetConfigSection
};

// ============================================================================
// نهاية ملف الإعدادات الأساسية
// ============================================================================
