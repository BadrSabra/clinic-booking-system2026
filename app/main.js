/**
 * ClinicPro Medical System - Main Application Entry Point
 * نظام إدارة العيادات الطبية - نقطة بدء التشغيل الرئيسية
 * 
 * @version 1.0.0
 * @author ClinicPro Team
 * @license MIT
 */

// ============================================================================
// 1. استيراد المكتبات الأساسية
// ============================================================================
import AppConfig from '../config/core-settings.js';
import StateManager from './core/state-manager.js';
import RouterEngine from './core/router-engine.js';
import AuthManager from './modules/auth/auth-manager.js';
import StorageEngine from './core/storage-engine.js';
import EventEmitter from './core/event-emitter.js';
import NotificationSystem from './ui/components/notification-system.js';
import { 
    loadCSS, 
    loadExternalScripts, 
    preloadCriticalResources,
    setupErrorHandling,
    setupPerformanceMonitoring,
    detectBrowserCompatibility,
    setupServiceWorker
} from './utils/initialization-utils.js';

// ============================================================================
// 2. تعريف فئة التطبيق الرئيسية
// ============================================================================
class ClinicProApp {
    constructor() {
        // حالة التطبيق
        this.config = AppConfig;
        this.state = null;
        this.router = null;
        this.auth = null;
        this.isInitialized = false;
        this.isAuthenticated = false;
        this.currentUser = null;
        this.currentRoute = null;
        
        // مكونات النظام
        this.modules = new Map();
        this.services = new Map();
        this.uiComponents = new Map();
        
        // المتغيرات الخاصة بالتهيئة
        this.initializationQueue = [];
        this.initializationPromises = [];
        
        // ربط السياق للدوال
        this.handleAppError = this.handleAppError.bind(this);
        this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.handleSystemEvent = this.handleSystemEvent.bind(this);
        
        console.log('🚀 ClinicPro Application Initializing...');
    }

    // ============================================================================
    // 3. طريقة تهيئة التطبيق الرئيسية
    // ============================================================================
    async initialize() {
        try {
            console.group('🔧 Application Initialization');
            
            // 3.1 التحقق من توافق المتصفح
            const compatibility = await this.checkBrowserCompatibility();
            if (!compatibility.supported) {
                this.showCompatibilityWarning(compatibility);
                return false;
            }

            // 3.2 إعداد معالجة الأخطاء
            this.setupGlobalErrorHandling();

            // 3.3 إعداد مراقبة الأداء
            this.setupPerformanceTracking();

            // 3.4 تهيئة المكونات الأساسية بالترتيب
            await this.initializeCoreComponents();

            // 3.5 تحميل الإعدادات والبيانات الأولية
            await this.loadInitialData();

            // 3.6 تهيئة نظام المصادقة
            await this.initializeAuthentication();

            // 3.7 تحميل واجهة المستخدم
            await this.initializeUI();

            // 3.8 إعداد نظام التوجيه
            await this.initializeRouting();

            // 3.9 تسجيل أحداث النظام
            this.setupSystemEvents();

            // 3.10 تهيئة الخدمات الأساسية
            await this.initializeServices();

            // 3.11 تحميل الوحدات حسب دور المستخدم
            await this.loadUserSpecificModules();

            // 3.12 إشعار اكتمال التهيئة
            this.markAsInitialized();

            console.log('✅ Application Initialization Complete');
            console.groupEnd();

            return true;

        } catch (error) {
            console.error('❌ Application Initialization Failed:', error);
            this.handleCriticalError(error);
            return false;
        }
    }

    // ============================================================================
    // 4. طرق التهيئة المساعدة
    // ============================================================================
    
    /**
     * التحقق من توافق المتصفح
     */
    async checkBrowserCompatibility() {
        const compatibility = detectBrowserCompatibility();
        
        if (!compatibility.supported) {
            console.warn('⚠️ Browser Compatibility Issues:', compatibility.issues);
        }
        
        return compatibility;
    }

    /**
     * إعداد معالجة الأخطاء العالمية
     */
    setupGlobalErrorHandling() {
        setupErrorHandling({
            onError: this.handleAppError,
            onUnhandledRejection: (event) => {
                console.error('Unhandled Promise Rejection:', event.reason);
                this.showErrorNotification('حدث خطأ غير متوقع في النظام');
            },
            onNetworkError: (error) => {
                console.error('Network Error:', error);
                this.showWarningNotification('مشكلة في الاتصال بالشبكة');
            }
        });

        // معالجة أخطاء التحميل
        window.addEventListener('error', (event) => {
            if (event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK') {
                console.error('Resource Load Error:', event.target.src || event.target.href);
            }
        });
    }

    /**
     * إعداد تتبع الأداء
     */
    setupPerformanceTracking() {
        setupPerformanceMonitoring({
            onPerformanceMetrics: (metrics) => {
                if (metrics.loadTime > 3000) {
                    console.warn('⚠️ Application load time is high:', metrics.loadTime);
                }
                
                // تخزين مقاييس الأداء
                StorageEngine.setItem('performance_metrics', {
                    ...metrics,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    /**
     * تهيئة المكونات الأساسية
     */
    async initializeCoreComponents() {
        console.log('🔄 Initializing Core Components...');
        
        // 1. محرك التخزين
        this.storage = new StorageEngine({
            name: 'clinicpro_db',
            version: 1,
            stores: [
                { name: 'users', keyPath: 'id' },
                { name: 'patients', keyPath: 'id' },
                { name: 'appointments', keyPath: 'id' },
                { name: 'invoices', keyPath: 'id' },
                { name: 'settings', keyPath: 'key' }
            ]
        });
        
        await this.storage.initialize();

        // 2. مدير الحالة
        this.state = new StateManager({
            storage: this.storage,
            initialState: {
                app: {
                    initialized: false,
                    online: navigator.onLine,
                    language: this.config.system.defaultLanguage,
                    theme: 'light'
                },
                auth: {
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    permissions: []
                },
                ui: {
                    isLoading: false,
                    notifications: [],
                    modals: []
                }
            }
        });

        // 3. نظام الأحداث
        this.events = new EventEmitter();
        
        // 4. نظام الإشعارات
        this.notifications = new NotificationSystem({
            position: 'top-right',
            duration: 5000,
            maxNotifications: 5
        });

        console.log('✅ Core Components Initialized');
    }

    /**
     * تحميل البيانات الأولية
     */
    async loadInitialData() {
        console.log('📂 Loading Initial Data...');
        
        try {
            // تحميل إعدادات المستخدم
            const savedSettings = await this.storage.getItem('user_settings');
            if (savedSettings) {
                this.state.update('app', savedSettings);
            }

            // تحميل جلسة سابقة إن وجدت
            const savedSession = await this.storage.getItem('auth_session');
            if (savedSession) {
                this.state.update('auth', savedSession);
                this.isAuthenticated = savedSession.isAuthenticated;
                this.currentUser = savedSession.user;
            }

            // تحميل البيانات المرجعية
            await this.loadReferenceData();

            console.log('✅ Initial Data Loaded');
        } catch (error) {
            console.warn('⚠️ Failed to load initial data:', error);
            // الاستمرار بدون البيانات المحفوظة
        }
    }

    /**
     * تحميل البيانات المرجعية
     */
    async loadReferenceData() {
        const referenceData = {
            departments: this.config.business.departments,
            cities: this.config.additional.locations.saudiCities,
            idTypes: this.config.additional.idTypes,
            paymentMethods: this.config.billing.paymentMethods,
            invoiceTypes: this.config.billing.invoiceTypes
        };

        await this.storage.setItem('reference_data', referenceData);
    }

    /**
     * تهيئة نظام المصادقة
     */
    async initializeAuthentication() {
        console.log('🔐 Initializing Authentication...');
        
        this.auth = new AuthManager({
            config: this.config,
            storage: this.storage,
            events: this.events,
            onAuthStateChange: this.handleAuthStateChange
        });

        await this.auth.initialize();
        
        // التحقق من الجلسة الحالية
        const session = await this.auth.checkCurrentSession();
        this.isAuthenticated = session.isAuthenticated;
        this.currentUser = session.user;

        console.log(`✅ Authentication Initialized - Authenticated: ${this.isAuthenticated}`);
    }

    /**
     * تهيئة واجهة المستخدم
     */
    async initializeUI() {
        console.log('🎨 Initializing UI Components...');
        
        // تحميل أنماط CSS الحرجة
        await loadCSS([
            '/public/css/variables.css',
            '/public/css/main.css',
            '/public/css/responsive.css'
        ]);

        // تحميل الخطوط
        await this.loadFonts();

        // إعداد السمة (Theme)
        await this.setupTheme();

        // إعداد اللغة والاتجاه
        this.setupLanguage();

        // إضافة عناصر تحميل أولية
        this.createLoadingScreen();

        console.log('✅ UI Initialized');
    }

    /**
     * تحميل الخطوط
     */
    async loadFonts() {
        const fonts = this.config.media.fonts;
        const fontLoader = document.createElement('style');
        
        fontLoader.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');
            
            :root {
                --font-arabic-primary: '${fonts.primaryArabic}', sans-serif;
                --font-arabic-secondary: '${fonts.secondaryArabic}', sans-serif;
                --font-english-primary: '${fonts.primaryEnglish}', sans-serif;
                --font-english-secondary: '${fonts.secondaryEnglish}', sans-serif;
            }
        `;
        
        document.head.appendChild(fontLoader);
    }

    /**
     * إعداد السمة
     */
    async setupTheme() {
        const savedTheme = await this.storage.getItem('user_theme') || 'light';
        const themeColors = this.config.theme.colors;
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // تطبيق الألوان الديناميكية
        Object.entries(themeColors).forEach(([key, value]) => {
            if (typeof value === 'string') {
                document.documentElement.style.setProperty(`--color-${key}`, value);
            }
        });
        
        this.state.update('app.theme', savedTheme);
    }

    /**
     * إعداد اللغة والاتجاه
     */
    setupLanguage() {
        const language = this.config.system.defaultLanguage;
        const direction = this.config.system.direction;
        
        document.documentElement.lang = language;
        document.documentElement.dir = direction;
        document.body.classList.add(`lang-${language}`, `dir-${direction}`);
    }

    /**
     * إنشاء شاشة التحميل
     */
    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'app-loading-screen';
        loader.innerHTML = `
            <div class="loading-container">
                <div class="loading-logo">
                    <img src="${this.config.media.images.logo.url}" alt="${this.config.clinic.basicInfo.name}">
                </div>
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
                <div class="loading-text">
                    <h3>جاري تحميل النظام</h3>
                    <p>${this.config.clinic.basicInfo.name}</p>
                </div>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
    }

    /**
     * تهيئة نظام التوجيه
     */
    async initializeRouting() {
        console.log('🛣️ Initializing Routing...');
        
        this.router = new RouterEngine({
            routes: this.config.routes || this.getDefaultRoutes(),
            onRouteChange: this.handleRouteChange,
            authManager: this.auth,
            defaultRoute: this.getDefaultRoute()
        });

        await this.router.initialize();
        
        console.log('✅ Routing Initialized');
    }

    /**
     * الحصول على المسارات الافتراضية
     */
    getDefaultRoutes() {
        return {
            '/': {
                component: 'dashboard',
                authRequired: true,
                permissions: [],
                title: 'لوحة التحكم'
            },
            '/login': {
                component: 'login',
                authRequired: false,
                title: 'تسجيل الدخول'
            },
            '/patients': {
                component: 'patients',
                authRequired: true,
                permissions: ['patient_management'],
                title: 'إدارة المرضى'
            },
            '/appointments': {
                component: 'appointments',
                authRequired: true,
                permissions: ['appointment_management'],
                title: 'المواعيد'
            },
            '/billing': {
                component: 'billing',
                authRequired: true,
                permissions: ['billing'],
                title: 'الفواتير'
            },
            '/settings': {
                component: 'settings',
                authRequired: true,
                permissions: ['settings_management'],
                title: 'الإعدادات'
            }
        };
    }

    /**
     * الحصول على المسار الافتراضي بناءً على حالة المصادقة
     */
    getDefaultRoute() {
        return this.isAuthenticated ? '/' : '/login';
    }

    /**
     * إعداد أحداث النظام
     */
    setupSystemEvents() {
        // أحداث المصادقة
        this.events.on('auth:login', (data) => {
            console.log('User logged in:', data.user.email);
            this.handleAuthStateChange({ isAuthenticated: true, user: data.user });
        });

        this.events.on('auth:logout', () => {
            console.log('User logged out');
            this.handleAuthStateChange({ isAuthenticated: false, user: null });
        });

        // أحداث الاتصال بالشبكة
        window.addEventListener('online', () => {
            this.state.update('app.online', true);
            this.events.emit('network:online');
            this.showSuccessNotification('تم استعادة الاتصال بالشبكة');
        });

        window.addEventListener('offline', () => {
            this.state.update('app.online', false);
            this.events.emit('network:offline');
            this.showWarningNotification('فقدان الاتصال بالشبكة. جاري العمل في وضع عدم الاتصال');
        });

        // أحداث اللغة والسمة
        this.events.on('language:changed', (language) => {
            this.changeLanguage(language);
        });

        this.events.on('theme:changed', (theme) => {
            this.changeTheme(theme);
        });

        console.log('✅ System Events Registered');
    }

    /**
     * تهيئة الخدمات الأساسية
     */
    async initializeServices() {
        console.log('⚙️ Initializing Services...');
        
        const services = [
            { name: 'api', path: './services/api-service.js' },
            { name: 'cache', path: './core/cache-manager.js' },
            { name: 'backup', path: './services/backup/backup-manager.js' },
            { name: 'notifications', path: './services/notifications/notification-scheduler.js' }
        ];

        for (const service of services) {
            try {
                const ServiceClass = await import(service.path);
                this.services.set(service.name, new ServiceClass.default({
                    app: this,
                    config: this.config
                }));
                console.log(`✅ Service loaded: ${service.name}`);
            } catch (error) {
                console.warn(`⚠️ Failed to load service: ${service.name}`, error);
            }
        }
    }

    /**
     * تحميل الوحدات حسب دور المستخدم
     */
    async loadUserSpecificModules() {
        if (!this.currentUser) return;

        const userRole = this.currentUser.role;
        const modules = this.getModulesForRole(userRole);

        console.log(`👤 Loading modules for role: ${userRole}`);

        for (const module of modules) {
            try {
                const ModuleClass = await import(`./modules/${module.path}.js`);
                const moduleInstance = new ModuleClass.default({
                    app: this,
                    user: this.currentUser,
                    config: this.config
                });

                this.modules.set(module.name, moduleInstance);
                await moduleInstance.initialize();
                
                console.log(`✅ Module loaded: ${module.name}`);
            } catch (error) {
                console.warn(`⚠️ Failed to load module: ${module.name}`, error);
            }
        }
    }

    /**
     * الحصول على الوحدات المناسبة لدور المستخدم
     */
    getModulesForRole(role) {
        const modulesMap = {
            'super_admin': [
                { name: 'system-admin', path: 'admin/system-admin' },
                { name: 'reports-manager', path: 'reports/reports-manager' },
                { name: 'audit-logger', path: 'admin/audit-logger' }
            ],
            'clinic_admin': [
                { name: 'clinic-manager', path: 'admin/clinic-manager' },
                { name: 'financial-reports', path: 'reports/financial-reports' }
            ],
            'doctor': [
                { name: 'doctor-dashboard', path: 'medical/doctor-dashboard' },
                { name: 'prescription-manager', path: 'prescriptions/prescription-manager' },
                { name: 'patient-manager', path: 'medical/patients/patient-manager' }
            ],
            'receptionist': [
                { name: 'appointment-manager', path: 'appointments/appointment-manager' },
                { name: 'patient-registration', path: 'medical/patients/patient-registration' }
            ],
            'accountant': [
                { name: 'billing-manager', path: 'billing/billing-manager' },
                { name: 'payment-manager', path: 'payments/payment-manager' }
            ],
            'patient': [
                { name: 'patient-portal', path: 'patients/patient-portal' },
                { name: 'appointment-booking', path: 'appointments/appointment-booking' }
            ]
        };

        return modulesMap[role] || [];
    }

    /**
     * وضع علامة على اكتمال التهيئة
     */
    markAsInitialized() {
        this.isInitialized = true;
        this.state.update('app.initialized', true);
        
        // إخفاء شاشة التحميل
        setTimeout(() => {
            const loadingScreen = document.getElementById('app-loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => loadingScreen.remove(), 500);
            }
        }, 500);

        // إطلاق حدث اكتمال التهيئة
        this.events.emit('app:initialized', {
            timestamp: new Date().toISOString(),
            user: this.currentUser,
            config: this.config
        });

        console.log('🎉 Application Initialized Successfully');
    }

    // ============================================================================
    // 5. معالجات الأحداث
    // ============================================================================

    /**
     * معالجة تغيير حالة المصادقة
     */
    handleAuthStateChange({ isAuthenticated, user }) {
        this.isAuthenticated = isAuthenticated;
        this.currentUser = user;
        
        this.state.update('auth', {
            isAuthenticated,
            user,
            permissions: user?.permissions || []
        });

        if (isAuthenticated) {
            console.log(`👋 Welcome ${user.name} (${user.role})`);
            
            // تحميل وحدات المستخدم الجديد
            this.loadUserSpecificModules();
            
            // التوجيه إلى الصفحة المناسبة
            this.router.navigate(this.getDefaultRoute());
        } else {
            console.log('👋 User logged out');
            
            // إلغاء تحميل الوحدات
            this.modules.clear();
            
            // التوجيه إلى صفحة تسجيل الدخول
            this.router.navigate('/login');
        }
    }

    /**
     * معالجة تغيير المسار
     */
    handleRouteChange({ route, params, query }) {
        this.currentRoute = route;
        
        console.log(`📍 Route changed to: ${route.path}`);
        
        // تحديث عنوان الصفحة
        document.title = `${route.title} | ${this.config.clinic.basicInfo.name}`;
        
        // تحديث حالة التطبيق
        this.state.update('ui.currentRoute', {
            path: route.path,
            component: route.component,
            params,
            query
        });
    }

    /**
     * معالجة الأحداث العامة للنظام
     */
    handleSystemEvent(event, data) {
        switch (event) {
            case 'notification:show':
                this.showNotification(data);
                break;
                
            case 'modal:open':
                this.openModal(data);
                break;
                
            case 'data:changed':
                this.handleDataChange(data);
                break;
                
            case 'error:occurred':
                this.handleAppError(data.error);
                break;
        }
    }

    /**
     * معالجة أخطاء التطبيق
     */
    handleAppError(error, context = '') {
        console.error(`❌ Application Error [${context}]:`, error);
        
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            context,
            user: this.currentUser?.id
        };
        
        // تخزين الخطأ
        this.storage.setItem('error_log', errorInfo).catch(console.error);
        
        // إظهار إشعار للمستخدم
        this.showErrorNotification(this.getErrorMessage(error));
        
        // إرسال حدث الخطأ
        this.events.emit('error:occurred', errorInfo);
    }

    /**
     * معالجة الأخطاء الحرجة
     */
    handleCriticalError(error) {
        console.error('💥 Critical Application Error:', error);
        
        // إظهار رسالة خطأ ودية
        this.showCriticalErrorScreen(error);
        
        // محاولة حفظ حالة التطبيق
        this.saveApplicationState();
    }

    // ============================================================================
    // 6. طرق المساعدة
    // ============================================================================

    /**
     * عرض تحذير توافق المتصفح
     */
    showCompatibilityWarning(compatibility) {
        const warningHTML = `
            <div class="browser-warning">
                <div class="warning-content">
                    <h2>⚠️ متصفح غير مدعوم</h2>
                    <p>عذراً، متصفحك الحالي غير مدعوم بالكامل من قبل نظام ClinicPro.</p>
                    <ul>
                        ${compatibility.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                    <p>نوصي باستخدام أحد المتصفحات التالية:</p>
                    <div class="recommended-browsers">
                        <a href="https://www.google.com/chrome/" target="_blank">Chrome</a>
                        <a href="https://www.mozilla.org/firefox/" target="_blank">Firefox</a>
                        <a href="https://www.microsoft.com/edge" target="_blank">Edge</a>
                    </div>
                    <button onclick="location.reload()">معاينة النظام رغم التحذير</button>
                </div>
            </div>
        `;
        
        document.body.innerHTML = warningHTML;
    }

    /**
     * عرض شاشة الخطأ الحرجة
     */
    showCriticalErrorScreen(error) {
        const errorScreen = document.createElement('div');
        errorScreen.className = 'critical-error-screen';
        errorScreen.innerHTML = `
            <div class="error-content">
                <h1>😔 عذراً، حدث خطأ غير متوقع</h1>
                <p>نظام ClinicPro واجه مشكلة تقنية. نحن نعمل على إصلاحها.</p>
                <div class="error-details">
                    <p><strong>رمز الخطأ:</strong> APP_CRITICAL_${Date.now()}</p>
                    <p><strong>التوقيت:</strong> ${new Date().toLocaleString('ar-SA')}</p>
                </div>
                <div class="error-actions">
                    <button onclick="location.reload()" class="primary-button">
                        🔄 إعادة تحميل الصفحة
                    </button>
                    <button onclick="window.location.href='/login'" class="secondary-button">
                        🏠 الرجوع للصفحة الرئيسية
                    </button>
                </div>
                <div class="support-info">
                    <p>إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني:</p>
                    <p><strong>📞 ${this.config.clinic.contact.phone}</strong></p>
                </div>
            </div>
        `;
        
        document.body.innerHTML = '';
        document.body.appendChild(errorScreen);
    }

    /**
     * الحصول على رسالة خطأ مناسبة للمستخدم
     */
    getErrorMessage(error) {
        const errorMessages = {
            'NetworkError': 'فشل في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.',
            'TimeoutError': 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.',
            'QuotaExceededError': 'تم تجاوز سعة التخزين المسموح بها.',
            'SecurityError': 'خطأ في الأمان. يرجى تسجيل الدخول مرة أخرى.',
            'default': 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
        };
        
        return errorMessages[error.name] || errorMessages.default;
    }

    /**
     * عرض إشعار النجاح
     */
    showSuccessNotification(message) {
        this.notifications.show({
            type: 'success',
            title: 'نجاح',
            message,
            duration: 3000
        });
    }

    /**
     * عرض إشعار التحذير
     */
    showWarningNotification(message) {
        this.notifications.show({
            type: 'warning',
            title: 'تحذير',
            message,
            duration: 5000
        });
    }

    /**
     * عرض إشعار الخطأ
     */
    showErrorNotification(message) {
        this.notifications.show({
            type: 'error',
            title: 'خطأ',
            message,
            duration: 7000
        });
    }

    /**
     * تغيير اللغة
     */
    async changeLanguage(language) {
        if (!this.config.system.supportedLanguages.includes(language)) {
            console.warn(`Unsupported language: ${language}`);
            return;
        }
        
        await this.storage.setItem('user_language', language);
        this.state.update('app.language', language);
        
        document.documentElement.lang = language;
        
        // إعادة تحميل وحدات اللغة الديناميكية
        this.events.emit('language:reload');
        
        this.showSuccessNotification(`تم تغيير اللغة إلى ${language === 'ar' ? 'العربية' : 'English'}`);
    }

    /**
     * تغيير السمة
     */
    async changeTheme(theme) {
        const validThemes = ['light', 'dark', 'auto'];
        if (!validThemes.includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }
        
        await this.storage.setItem('user_theme', theme);
        this.state.update('app.theme', theme);
        
        document.documentElement.setAttribute('data-theme', theme);
        
        this.showSuccessNotification(`تم تغيير السمة إلى ${theme === 'light' ? 'فاتح' : 'غامق'}`);
    }

    /**
     * حفظ حالة التطبيق
     */
    async saveApplicationState() {
        try {
            const appState = {
                auth: this.state.get('auth'),
                ui: this.state.get('ui'),
                timestamp: new Date().toISOString()
            };
            
            await this.storage.setItem('app_recovery_state', appState);
            console.log('✅ Application state saved for recovery');
        } catch (error) {
            console.warn('⚠️ Failed to save application state:', error);
        }
    }

    /**
     * استعادة حالة التطبيق
     */
    async restoreApplicationState() {
        try {
            const savedState = await this.storage.getItem('app_recovery_state');
            if (savedState) {
                this.state.update('auth', savedState.auth);
                this.state.update('ui', savedState.ui);
                console.log('✅ Application state restored');
                return true;
            }
        } catch (error) {
            console.warn('⚠️ Failed to restore application state:', error);
        }
        return false;
    }

    // ============================================================================
    // 7. واجهات التطبيق العامة
    // ============================================================================

    /**
     * تسجيل الدخول
     */
    async login(credentials) {
        try {
            const result = await this.auth.login(credentials);
            
            if (result.success) {
                this.showSuccessNotification('تم تسجيل الدخول بنجاح');
                return { success: true, user: result.user };
            } else {
                this.showErrorNotification(result.message || 'فشل تسجيل الدخول');
                return { success: false, message: result.message };
            }
        } catch (error) {
            this.handleAppError(error, 'login');
            return { success: false, message: 'حدث خطأ أثناء تسجيل الدخول' };
        }
    }

    /**
     * تسجيل الخروج
     */
    async logout() {
        try {
            await this.auth.logout();
            this.showSuccessNotification('تم تسجيل الخروج بنجاح');
            return { success: true };
        } catch (error) {
            this.handleAppError(error, 'logout');
            return { success: false, message: 'حدث خطأ أثناء تسجيل الخروج' };
        }
    }

    /**
     * الحصول على معلومات التطبيق
     */
    getAppInfo() {
        return {
            name: this.config.system.name,
            version: this.config.system.version,
            clinic: this.config.clinic.basicInfo,
            initialized: this.isInitialized,
            authenticated: this.isAuthenticated,
            user: this.currentUser,
            online: navigator.onLine,
            performance: this.state.get('app.performance')
        };
    }

    /**
     * الحصول على حالة النظام
     */
    getSystemStatus() {
        return {
            app: this.state.get('app'),
            auth: this.state.get('auth'),
            ui: this.state.get('ui'),
            modules: Array.from(this.modules.keys()),
            services: Array.from(this.services.keys())
        };
    }

    // ============================================================================
    // 8. دورة حياة التطبيق
    // ============================================================================

    /**
     * تشغيل التطبيق
     */
    async run() {
        console.log('🚀 Starting ClinicPro Application...');
        
        const initialized = await this.initialize();
        
        if (initialized) {
            console.log('🎉 Application is now running');
            
            // إطلاق حدث بدء التشغيل
            this.events.emit('app:started', {
                timestamp: new Date().toISOString(),
                version: this.config.system.version
            });
            
            // بدء الخدمات الخلفية
            this.startBackgroundServices();
            
            return true;
        } else {
            console.error('❌ Failed to start application');
            return false;
        }
    }

    /**
     * بدء الخدمات الخلفية
     */
    startBackgroundServices() {
        // خدمة النسخ الاحتياطي التلقائي
        if (this.config.backup.autoBackup.enabled) {
            setInterval(() => {
                this.services.get('backup')?.createAutoBackup();
            }, 24 * 60 * 60 * 1000); // كل 24 ساعة
        }
        
        // خدمة الإشعارات المجدولة
        setInterval(() => {
            this.services.get('notifications')?.sendScheduledNotifications();
        }, 5 * 60 * 1000); // كل 5 دقائق
        
        // خدمة تنظيف الكاش
        setInterval(() => {
            this.services.get('cache')?.cleanup();
        }, 60 * 60 * 1000); // كل ساعة
        
        console.log('✅ Background services started');
    }

    /**
     * إيقاف التطبيق
     */
    async shutdown() {
        console.log('🛑 Shutting down application...');
        
        // إطلاق حدث الإيقاف
        this.events.emit('app:shutdown', {
            timestamp: new Date().toISOString()
        });
        
        // حفظ حالة التطبيق
        await this.saveApplicationState();
        
        // إيقاف الخدمات
        this.services.forEach(service => {
            if (service.shutdown) service.shutdown();
        });
        
        // إيقاف الوحدات
        this.modules.forEach(module => {
            if (module.shutdown) module.shutdown();
        });
        
        // تنظيف الأحداث
        this.events.removeAllListeners();
        
        console.log('✅ Application shutdown complete');
    }
}

// ============================================================================
// 9. تصدير التطبيق الرئيسي
// ============================================================================

// إنشاء نسخة واحدة من التطبيق (Singleton)
let appInstance = null;

/**
 * الحصول على نسخة التطبيق
 */
export function getApp() {
    if (!appInstance) {
        appInstance = new ClinicProApp();
    }
    return appInstance;
}

/**
 * تهيئة وتشغيل التطبيق
 */
export async function initializeApp() {
    const app = getApp();
    return await app.run();
}

/**
 * تسجيل الدخول إلى التطبيق
 */
export async function login(credentials) {
    const app = getApp();
    return await app.login(credentials);
}

/**
 * تسجيل الخروج من التطبيق
 */
export async function logout() {
    const app = getApp();
    return await app.logout();
}

/**
 * الحصول على معلومات التطبيق
 */
export function getAppInfo() {
    const app = getApp();
    return app.getAppInfo();
}

/**
 * تصدير التطبيق ككائن عالمي للاستخدام المباشر في وحدة التحكم
 */
if (typeof window !== 'undefined') {
    window.ClinicPro = {
        getApp,
        initializeApp,
        login,
        logout,
        getAppInfo
    };
}

// ============================================================================
// 10. بدء التشغيل التلقائي عند تحميل الصفحة
// ============================================================================

// بدء التطبيق تلقائياً عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM Content Loaded - Starting Application...');
        initializeApp().catch(console.error);
    });
} else {
    console.log('📄 DOM Already Loaded - Starting Application...');
    initializeApp().catch(console.error);
}

// تصدير افتراضي
export default ClinicProApp;

// ============================================================================
// نهاية ملف main.js
// ============================================================================
