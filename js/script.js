// ========== الباسوورد ==========
const ADMIN_PASSWORD = "zodiak##**@@";
let isAdmin = false;
let currentLang = 'ar';

// ========== إدارة المودال ==========
function openAdminModal() {
    document.getElementById('adminModal').classList.add('active');
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
}

function checkEnter(e) {
    if (e.key === 'Enter') adminLogin();
}

// ========== تسجيل دخول الأدمن ==========
function adminLogin() {
    const pass = document.getElementById('adminPass').value;
    
    if (pass === ADMIN_PASSWORD) {
        isAdmin = true;
        document.getElementById('adminModal').classList.remove('active');
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').style.display = 'none';
        
        updateEditSelect();
        updateDeleteSelect();
        
        alert(currentLang === 'ar' ? 'مرحباً بك يا ZODiAK!' : 'Welcome Back ZODiAK!');
    } else {
        alert(currentLang === 'ar' ? '❌ كلمة سر خطأ' : '❌ Password Incorrect');
        document.getElementById('adminPass').value = '';
    }
}

// ========== خروج الأدمن ==========
function logoutAdmin() {
    isAdmin = false;
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('adminLoginBtn').style.display = 'block';
    sessionStorage.removeItem('adminLoggedIn');
}

// ========== تبديل تبويبات الأدمن ==========
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.admin-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'add') document.getElementById('addForm').classList.add('active');
    if (tab === 'edit') document.getElementById('editForm').classList.add('active');
    if (tab === 'delete') document.getElementById('deleteForm').classList.add('active');
}

// ========== بيانات المقالات (تخزين محلي) ==========
let writeups = JSON.parse(localStorage.getItem('pentester_writeups')) || [
    {
        id: 1,
        title: {
            ar: "HackTheBox - شرح كامل لاختراق Lame Machine",
            en: "HackTheBox - Lame Machine Complete Walkthrough"
        },
        platform: "HackTheBox",
        date: "2024-01-15",
        content: {
            ar: "شرح كامل لاختراق Machine Lame من HackTheBox باستخدام ثغرة Samba CVE-2007-2447...",
            en: "Complete walkthrough for HackTheBox Lame machine using Samba vulnerability CVE-2007-2447..."
        },
        tags: ["Linux", "Samba", "Easy"],
        views: 245,
        likes: 42,
        dislikes: 3
    },
    {
        id: 2,
        title: {
            ar: "TryHackMe - دليل اختراق Mr Robot",
            en: "TryHackMe - Mr Robot CTF Complete Guide"
        },
        platform: "TryHackMe",
        date: "2024-01-10",
        content: {
            ar: "كيفية اختراق Mr Robot machine على TryHackMe خطوة بخطوة...",
            en: "Step by step guide to compromise Mr Robot machine on TryHackMe..."
        },
        tags: ["WordPress", "PrivEsc", "Linux"],
        views: 189,
        likes: 31,
        dislikes: 2
    },
    {
        id: 3,
        title: {
            ar: "CTFtime - حل تحديات RSA بالتشفير",
            en: "CTFtime - RSA Crypto Challenge Writeup"
        },
        platform: "CTFtime",
        date: "2024-01-05",
        content: {
            ar: "حل تحديات RSA في مسابقات CTF باستخدام Python...",
            en: "Solving RSA challenges in CTF competitions using Python..."
        },
        tags: ["Cryptography", "RSA", "Python"],
        views: 156,
        likes: 28,
        dislikes: 1
    }
];

// ========== ترجمة الموقع بالكامل ==========
const translations = {
    ar: {
        // القائمة
        'nav-home': 'الرئيسية',
        'nav-cv': 'السيرة',
        'nav-vuln': 'الثغرات',
        'nav-blog': 'المدونة',
        'nav-contact': 'تواصل',
        
        // الأزرار
        'lang-ar': 'عربي',
        'lang-en': 'English',
        'admin-login': '🔑 دخول الأدمن',
        'login-title': 'دخول الأدمن',
        'login-placeholder': 'كلمة السر',
        'login-button': 'تسجيل الدخول',
        'logout': '🚪 خروج',
        
        // لوحة التحكم
        'admin-panel-title': '🔰 لوحة تحكم الأدمن',
        'tab-add': '➕ إضافة مقال',
        'tab-edit': '✏️ تعديل مقال',
        'tab-delete': '🗑️ حذف مقال',
        'add-title': 'إضافة مقال جديد',
        'edit-title': 'تعديل مقال',
        'delete-title': 'حذف مقال',
        'post-title': 'عنوان المقال',
        'post-content': 'محتوى المقال كاملاً',
        'post-tags': 'الوسوم (مفصولة بفواصل)',
        'publish': '📝 نشر المقال',
        'update': '🔄 تحديث المقال',
        'delete': '❌ حذف نهائي',
        'select-edit': 'اختر مقال للتعديل',
        'select-delete': 'اختر مقال للحذف',
        'new-title': 'العنوان الجديد',
        'new-content': 'المحتوى الجديد',
        
        // الصفحة الرئيسية
        'hero-name': 'ZODiAK - Pentester',
        'hero-command': '#!/bin/bash - "Hack The Planet"',
        'hero-desc': 'مختبر اختراق | OSCP | CEH | CTF Player',
        
        // المهارات
        'skill-web': 'اختبار الاختراق للويب',
        'skill-web-desc': 'SQLi, XSS, CSRF, SSRF',
        'skill-network': 'أمن الشبكات',
        'skill-network-desc': 'Nmap, Metasploit, Wireshark',
        'skill-reverse': 'الهندسة العكسية',
        'skill-reverse-desc': 'Ghidra, IDA, x86/x64',
        'skill-crypto': 'التشفير',
        'skill-crypto-desc': 'RSA, AES, Hashing',
        
        // السيرة الذاتية
        'cv-title': '┌─[CV]─[السيرة الذاتية]',
        'cv-name': 'ZODiAK',
        'cv-job': 'Penetration Tester | OSCP',
        'cv-download': '📥 تحميل CV',
        'cv-summary': 'ملخص احترافي',
        'cv-summary-text': 'مختبر اختراق شغوف بأمن المعلومات، متخصص في اختبارات الاختراق وتقييم الثغرات. أمتلك خبرة في اكتشاف واستغلال الثغرات الأمنية وتقديم حلول للوقاية منها. مشارك نشط في منصات CTF و Bug Bounty.',
        'cv-experience': 'الخبرات المهنية',
        'cv-exp1-title': 'Junior Pentester',
        'cv-exp1-company': 'HackerOne | TryHackMe | PortSwigger',
        'cv-exp1-desc1': 'اكتشاف والإبلاغ عن ثغرات في تطبيقات الويب',
        'cv-exp1-desc2': 'المشاركة في برامج مكافآت الثغرات (Bug Bounty)',
        'cv-exp1-desc3': 'حل أكثر من 100 machine على TryHackMe و HackTheBox',
        'cv-exp2-title': 'باحث أمني',
        'cv-exp2-company': 'برامج Bug Bounty',
        'cv-exp2-desc1': 'البحث عن ثغرات في منصات كبرى',
        'cv-exp2-desc2': 'كتابة تقارير احترافية عن الثغرات المكتشفة',
        'cv-exp2-desc3': 'المشاركة في مسابقات CTF محلية وعالمية',
        'cv-exp3-title': 'لاعب CTF',
        'cv-exp3-company': 'فريق BlackV',
        'cv-exp3-desc1': 'المركز الأول في مسابقة CTF tryhackme 2026',
        'cv-exp3-desc2': 'تخصص في تحديات Web و Crypto',
        'cv-exp3-desc3': 'كتابة writeups للمسابقات',
        'cv-certs': 'الشهادات',
        'cv-cert1': 'OSCP - Offensive Security',
        'cv-cert2': 'CEH Master - EC-Council',
        'cv-cert3': 'CRTP - Pentester Academy',
        'cv-education': 'التعليم',
        'cv-edu-title': 'طالب بكليه الشريعه و القانون',
        'cv-edu-major': 'مختبر اختراق',
        'cv-edu-school': 'جامعة الازهر',
        'cv-skills-title': 'المهارات التقنية',
        'cv-languages': 'اللغات',
        'lang-arabic': 'العربية',
        'lang-native': 'اللغة الأم',
        'lang-english': 'الإنجليزية',
        'lang-fluent': 'متوسط (B1)',
        'cv-location': 'مصر',
        
        // الثغرات
        'vuln-title': '┌─[TOP 10]─[أهم الثغرات]',
        'vuln-desc-sql': 'حقن SQL - المهاجم ينفذ أوامر SQL خبيثة في قاعدة البيانات',
        'vuln-prevention-sql': '✅ استخدم Prepared Statements',
        'vuln-desc-xss': 'حقن سكريبتات خبيثة في صفحات الويب',
        'vuln-prevention-xss': '✅ تشفير المخرجات - Content Security Policy',
        'vuln-desc-csrf': 'تزوير الطلبات عبر المواقع - تنفيذ أوامر بدون علم المستخدم',
        'vuln-prevention-csrf': '✅ CSRF Tokens - SameSite Cookies',
        'vuln-desc-lfi': 'قراءة ملفات حساسة من السيرفر',
        'vuln-prevention-lfi': '✅ التحقق من المدخلات - Whitelist',
        'vuln-desc-rfi': 'تضمين ملفات خارجية خبيثة',
        'vuln-prevention-rfi': '✅ تعطيل allow_url_include',
        'vuln-desc-cmd': 'تنفيذ أوامر على نظام التشغيل',
        'vuln-prevention-cmd': '✅ escapeshellcmd() - escapeshellarg()',
        'vuln-desc-idor': 'الوصول المباشر غير المصرح به للكائنات',
        'vuln-prevention-idor': '✅ التحقق من الصلاحيات لكل طلب',
        'vuln-desc-xxe': 'ثغرة في معالجة XML',
        'vuln-prevention-xxe': '✅ تعطيل XXE في معالج XML',
        'vuln-desc-ssrf': 'إجبار السيرفر على عمل طلبات داخلية',
        'vuln-prevention-ssrf': '✅ Whitelist للـ URLs المسموح بها',
        'vuln-desc-auth': 'ثغرات في نظام المصادقة',
        'vuln-prevention-auth': '✅ MFA - قفل الحساب - كلمات مرور قوية',
        
        // المدونة
        'blog-title': '┌─[BLOG]─[كتابات CTF]',
        'read-more': '📖 اقرأ المزيد',
        
        // التواصل
        'contact-title': '┌─[CONTACT]─[تواصل معي]',
        'send-message': 'أرسل رسالة',
        'your-name': 'اسمك',
        'your-email': 'بريدك',
        'your-message': 'رسالتك',
        'send': 'إرسال',
        'sending': 'جاري الإرسال...',
        'discord': 'Discord: zodiakx_x',
        'twitter': 'Twitter: zodiakx_x',
        'github': 'GitHub: ixZODiAK',
        
        // الفوتر
        'footer': '© 2026 ZODiAK - مختبر اختراق | جميع الحقوق محفوظة',
        'footer-quote': '#HackThePlanet'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-cv': 'CV',
        'nav-vuln': 'Vulnerabilities',
        'nav-blog': 'Blog',
        'nav-contact': 'Contact',
        
        // Buttons
        'lang-ar': 'عربي',
        'lang-en': 'English',
        'admin-login': '🔑 ADMIN LOGIN',
        'login-title': 'Admin Login',
        'login-placeholder': 'Password',
        'login-button': 'Login',
        'logout': '🚪 Logout',
        
        // Admin Panel
        'admin-panel-title': '🔰 Admin Control Panel',
        'tab-add': '➕ Add Post',
        'tab-edit': '✏️ Edit Post',
        'tab-delete': '🗑️ Delete Post',
        'add-title': 'Add New Writeup',
        'edit-title': 'Edit Writeup',
        'delete-title': 'Delete Writeup',
        'post-title': 'Post Title',
        'post-content': 'Full Writeup Content',
        'post-tags': 'Tags (comma separated)',
        'publish': '📝 Publish',
        'update': '🔄 Update',
        'delete': '❌ Delete',
        'select-edit': 'Select writeup to edit',
        'select-delete': 'Select writeup to delete',
        'new-title': 'New title',
        'new-content': 'New content',
        
        // Hero Section
        'hero-name': 'ZODiAK - Pentester',
        'hero-command': '#!/bin/bash - "Hack The Planet"',
        'hero-desc': 'Penetration Tester | OSCP | CTF Player',
        
        // Skills
        'skill-web': 'Web Penetration',
        'skill-web-desc': 'SQLi, XSS, CSRF, SSRF',
        'skill-network': 'Network Security',
        'skill-network-desc': 'Nmap, Metasploit, Wireshark',
        'skill-reverse': 'Reverse Engineering',
        'skill-reverse-desc': 'Ghidra, IDA, x86/x64',
        'skill-crypto': 'Cryptography',
        'skill-crypto-desc': 'RSA, AES, Hashing',
        
        // CV Section
        'cv-title': '┌─[CV]─[Resume]',
        'cv-name': 'ZODiAK',
        'cv-job': 'Penetration Tester | OSCP',
        'cv-download': '📥 Download CV',
        'cv-summary': 'Professional Summary',
        'cv-summary-text': 'Passionate Penetration Tester specializing in security assessments and vulnerability research. Experienced in discovering and exploiting security vulnerabilities and providing remediation solutions. Active participant in CTF platforms and Bug Bounty programs.',
        'cv-experience': 'Experience',
        'cv-exp1-title': 'Junior Pentester',
        'cv-exp1-company': 'HackerOne | TryHackMe | PortSwigger',
        'cv-exp1-desc1': 'Discover and report vulnerabilities in web applications',
        'cv-exp1-desc2': 'Participate in Bug Bounty programs',
        'cv-exp1-desc3': 'Solved 100+ machines on TryHackMe and HackTheBox',
        'cv-exp2-title': 'Security Researcher',
        'cv-exp2-company': 'Bug Bounty Programs',
        'cv-exp2-desc1': 'Hunt for vulnerabilities in major platforms',
        'cv-exp2-desc2': 'Write professional vulnerability reports',
        'cv-exp2-desc3': 'Participate in local and international CTF competitions',
        'cv-exp3-title': 'CTF Player',
        'cv-exp3-company': 'Black-V Team',
        'cv-exp3-desc1': '1st place in local CTF tryhackme 2026',
        'cv-exp3-desc2': 'Specialized in Web and Crypto challenges',
        'cv-exp3-desc3': 'Write CTF writeups',
        'cv-certs': 'Certifications',
        'cv-cert1': 'OSCP - Offensive Security',
        'cv-cert2': 'CEH Master - EC-Council',
        'cv-cert3': 'CRTP - Pentester Academy',
        'cv-education': 'Education',
        'cv-edu-title': 'Student of Alshareaa Wa Alqanon University',
        'cv-edu-major': 'Web Pentration Testing',
        'cv-edu-school': 'Alazhar University',
        'cv-skills-title': 'Technical Skills',
        'cv-languages': 'Languages',
        'lang-arabic': 'Arabic',
        'lang-native': 'Native',
        'lang-english': 'English',
        'lang-fluent': 'Mediume (B1)',
        'cv-location': 'Egypt',
        
        // Vulnerabilities
        'vuln-title': '┌─[TOP 10]─[Vulnerabilities]',
        'vuln-desc-sql': 'SQL Injection - Attacker executes malicious SQL commands in database',
        'vuln-prevention-sql': '✅ Use Prepared Statements',
        'vuln-desc-xss': 'Injecting malicious scripts into web pages',
        'vuln-prevention-xss': '✅ Output encoding - Content Security Policy',
        'vuln-desc-csrf': 'Cross-Site Request Forgery - Execute actions without user consent',
        'vuln-prevention-csrf': '✅ CSRF Tokens - SameSite Cookies',
        'vuln-desc-lfi': 'Read sensitive files from the server',
        'vuln-prevention-lfi': '✅ Input validation - Whitelist',
        'vuln-desc-rfi': 'Include malicious external files',
        'vuln-prevention-rfi': '✅ Disable allow_url_include',
        'vuln-desc-cmd': 'Execute operating system commands',
        'vuln-prevention-cmd': '✅ escapeshellcmd() - escapeshellarg()',
        'vuln-desc-idor': 'Unauthorized direct access to objects',
        'vuln-prevention-idor': '✅ Check permissions for each request',
        'vuln-desc-xxe': 'Vulnerability in XML processing',
        'vuln-prevention-xxe': '✅ Disable XXE in XML parser',
        'vuln-desc-ssrf': 'Force server to make internal requests',
        'vuln-prevention-ssrf': '✅ URL whitelist',
        'vuln-desc-auth': 'Authentication system vulnerabilities',
        'vuln-prevention-auth': '✅ MFA - Account lockout - Strong passwords',
        
        // Blog
        'blog-title': '┌─[BLOG]─[CTF Writeups]',
        'read-more': '📖 Read More',
        
        // Contact
        'contact-title': '┌─[CONTACT]─[Get in touch]',
        'send-message': 'Send a message',
        'your-name': 'Your name',
        'your-email': 'Your email',
        'your-message': 'Your message',
        'send': 'Send',
        'sending': 'Sending...',
        'discord': 'Discord: zodiakx_x',
        'twitter': 'Twitter: zodiakx_x',
        'github': 'GitHub: ixZODiAK',
        
        // Footer
        'footer': '© 2026 ZODiAK - Penetration Tester | All rights reserved',
        'footer-quote': '#HackThePlanet'
    }
};

// ========== تغيير اللغة ==========
function setLang(lang) {
    currentLang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // تغيير كل النصوص في الصفحة
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // تحديث أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // إعادة تحميل المقالات باللغة الجديدة
    loadWriteups();
}

// ========== عرض المقالات ==========
function loadWriteups() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    writeups.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    writeups.forEach(w => {
        const card = `
            <div class="blog-card">
                <div style="display: flex; justify-content: space-between;">
                    <span class="blog-platform">${w.platform}</span>
                    <span style="color: var(--accent-yellow);">📅 ${w.date}</span>
                </div>
                
                <h3 class="blog-title">${w.title[currentLang]}</h3>
                
                <div class="blog-tags">
                    ${w.tags.map(t => `<span class="blog-tag">#${t}</span>`).join('')}
                </div>
                
                <div class="blog-content">
                    ${w.content[currentLang].substring(0, 200)}...
                </div>
                
                <div class="blog-stats">
                    <span class="stat"><i>👁️</i> ${w.views}</span>
                    <button class="reaction-btn" onclick="likePost(${w.id})">
                        <i>👍</i> <span id="likes-${w.id}">${w.likes}</span>
                    </button>
                    <button class="reaction-btn" onclick="dislikePost(${w.id})">
                        <i>👎</i> <span id="dislikes-${w.id}">${w.dislikes}</span>
                    </button>
                </div>
                
                <button class="admin-tab" style="margin-top: 15px; width: 100%;" onclick="readFullPost(${w.id})">
                    ${currentLang === 'ar' ? '📖 اقرأ المزيد' : '📖 Read More'}
                </button>
            </div>
        `;
        grid.innerHTML += card;
    });
    
    updateEditSelect();
    updateDeleteSelect();
}

// ========== تفاعلات المستخدمين ==========
function likePost(id) {
    const post = writeups.find(w => w.id === id);
    if (post) {
        post.likes++;
        localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
        document.getElementById(`likes-${id}`).textContent = post.likes;
    }
}

function dislikePost(id) {
    const post = writeups.find(w => w.id === id);
    if (post) {
        post.dislikes++;
        localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
        document.getElementById(`dislikes-${id}`).textContent = post.dislikes;
    }
}

function readFullPost(id) {
    const post = writeups.find(w => w.id === id);
    if (post) {
        post.views++;
        localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
        alert(post.content[currentLang]);
        loadWriteups();
    }
}

// ========== ADMIN FUNCTIONS ==========
function addWriteup() {
    if (!isAdmin) return;
    
    const title = {
        ar: document.getElementById('postTitle').value,
        en: document.getElementById('postTitle').value
    };
    const platform = document.getElementById('postPlatform').value;
    const content = {
        ar: document.getElementById('postContent').value,
        en: document.getElementById('postContent').value
    };
    const tags = document.getElementById('postTags').value.split(',').map(t => t.trim());
    
    if (!title.ar || !content.ar) {
        alert(currentLang === 'ar' ? '❌ من فضلك املأ جميع الحقول المطلوبة' : '❌ Please fill all required fields');
        return;
    }
    
    const newWriteup = {
        id: Date.now(),
        title: title,
        platform: platform,
        date: new Date().toISOString().split('T')[0],
        content: content,
        tags: tags,
        views: 0,
        likes: 0,
        dislikes: 0
    };
    
    writeups.push(newWriteup);
    localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
    
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    document.getElementById('postTags').value = '';
    
    loadWriteups();
    alert(currentLang === 'ar' ? '✅ تم نشر المقال بنجاح!' : '✅ Writeup published successfully!');
}

function updateEditSelect() {
    const select = document.getElementById('editSelect');
    if (!select) return;
    
    select.innerHTML = `<option value="">${currentLang === 'ar' ? 'اختر مقال للتعديل' : 'Select writeup to edit'}</option>`;
    writeups.forEach(w => {
        select.innerHTML += `<option value="${w.id}">${w.title[currentLang]}</option>`;
    });
}

function updateDeleteSelect() {
    const select = document.getElementById('deleteSelect');
    if (!select) return;
    
    select.innerHTML = `<option value="">${currentLang === 'ar' ? 'اختر مقال للحذف' : 'Select writeup to delete'}</option>`;
    writeups.forEach(w => {
        select.innerHTML += `<option value="${w.id}">${w.title[currentLang]}</option>`;
    });
}

function loadWriteupForEdit() {
    const id = document.getElementById('editSelect').value;
    if (!id) return;
    
    const post = writeups.find(w => w.id == id);
    if (post) {
        document.getElementById('editTitle').value = post.title[currentLang];
        document.getElementById('editContent').value = post.content[currentLang];
    }
}

function updateWriteup() {
    if (!isAdmin) return;
    
    const id = document.getElementById('editSelect').value;
    if (!id) {
        alert(currentLang === 'ar' ? '❌ اختر مقالاً أولاً' : '❌ Select a post first');
        return;
    }
    
    const index = writeups.findIndex(w => w.id == id);
    if (index !== -1) {
        writeups[index].title[currentLang] = document.getElementById('editTitle').value || writeups[index].title[currentLang];
        writeups[index].content[currentLang] = document.getElementById('editContent').value || writeups[index].content[currentLang];
        
        localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
        loadWriteups();
        alert(currentLang === 'ar' ? '✅ تم تحديث المقال بنجاح!' : '✅ Writeup updated successfully!');
    }
}

function deleteWriteup() {
    if (!isAdmin) return;
    
    const id = document.getElementById('deleteSelect').value;
    if (!id) {
        alert(currentLang === 'ar' ? '❌ اختر مقالاً للحذف' : '❌ Select a post to delete');
        return;
    }
    
    if (confirm(currentLang === 'ar' ? '⚠️ هل أنت متأكد من حذف هذا المقال؟' : '⚠️ Are you sure you want to delete this writeup?')) {
        writeups = writeups.filter(w => w.id != id);
        localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
        loadWriteups();
        alert(currentLang === 'ar' ? '✅ تم حذف المقال بنجاح!' : '✅ Writeup deleted successfully!');
    }
}

// ========== تحميل CV ==========
// ========== دالة تحميل CV بصيغة PDF (شغالة 100% مع العربية) ==========
// ========== دالة تحميل CV بصيغة HTML (ثم اطبع PDF) ==========
function downloadCV() {
    // محتوى HTML منسق بالكامل
    const cvHTML = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ZODiAK - السيرة الذاتية</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    background: #0a0c0f;
                    color: #e2e8f0;
                    font-family: 'Cairo', 'Arial', sans-serif;
                    line-height: 1.6;
                    padding: 30px;
                }
                
                .cv-container {
                    max-width: 900px;
                    margin: 0 auto;
                    background: #0f1217;
                    border: 3px solid #b300ff;
                    border-radius: 25px;
                    padding: 40px;
                    box-shadow: 0 0 30px #b300ff;
                }
                
                /* الهيدر */
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #0ff;
                    padding-bottom: 20px;
                }
                
                .name {
                    font-size: 48px;
                    font-weight: bold;
                    color: #b300ff;
                    text-shadow: 0 0 20px #b300ff;
                    margin-bottom: 10px;
                }
                
                .title {
                    font-size: 24px;
                    color: #0ff;
                    margin-bottom: 15px;
                }
                
                .contact-info {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    flex-wrap: wrap;
                    color: #94a3b8;
                    font-size: 16px;
                }
                
                .contact-info span {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                /* الأقسام */
                .section {
                    margin: 30px 0;
                }
                
                .section-title {
                    font-size: 28px;
                    color: #0ff;
                    border-bottom: 3px solid #0ff;
                    padding-bottom: 8px;
                    margin-bottom: 20px;
                    display: inline-block;
                }
                
                /* الملخص */
                .summary {
                    background: rgba(0, 255, 255, 0.03);
                    border-right: 5px solid #b300ff;
                    padding: 20px;
                    border-radius: 15px;
                    color: #94a3b8;
                    font-size: 16px;
                    line-height: 1.8;
                }
                
                /* الخبرات */
                .experience-item {
                    margin: 25px 0;
                    padding-right: 20px;
                    border-right: 3px solid #b300ff;
                }
                
                .exp-year {
                    color: #ff0;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .exp-title {
                    color: #0ff;
                    font-size: 22px;
                    margin-bottom: 5px;
                }
                
                .exp-company {
                    color: #b300ff;
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                
                .exp-desc {
                    color: #94a3b8;
                    padding-right: 20px;
                }
                
                .exp-desc li {
                    margin: 8px 0;
                }
                
                /* الشهادات */
                .certs-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin: 20px 0;
                }
                
                .cert-card {
                    background: rgba(179, 0, 255, 0.1);
                    border: 2px solid #b300ff;
                    border-radius: 15px;
                    padding: 20px;
                    text-align: center;
                    transition: 0.3s;
                }
                
                .cert-name {
                    color: #0ff;
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .cert-issuer {
                    color: #94a3b8;
                }
                
                /* المهارات */
                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    margin: 20px 0;
                }
                
                .skill-card {
                    background: rgba(0, 255, 255, 0.05);
                    border: 2px solid #0ff;
                    border-radius: 12px;
                    padding: 15px;
                }
                
                .skill-name {
                    color: #0ff;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .skill-level {
                    color: #b300ff;
                    font-size: 14px;
                }
                
                .skill-desc {
                    color: #94a3b8;
                    font-size: 14px;
                    margin-top: 8px;
                }
                
                /* اللغات */
                .languages-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin: 20px 0;
                }
                
                .lang-card {
                    background: rgba(0, 255, 255, 0.05);
                    border: 2px solid #0ff;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                }
                
                .lang-name {
                    color: #0ff;
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .lang-level {
                    color: #b300ff;
                }
                
                /* الفوتر */
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 3px solid #0ff;
                    color: #94a3b8;
                }
                
                /* للطباعة */
                @media print {
                    body {
                        background: #0a0c0f;
                        padding: 0;
                    }
                    .cv-container {
                        box-shadow: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="cv-container">
                <!-- الهيدر -->
                <div class="header">
                    <div class="name">Ebrahim Hammad</div>
                    <div class="title">Penetration Tester</div>
                    <div class="contact-info">
                        <span>📍 مصر</span>
                        <span>📧 zodiak0x6@gmail.com</span>
                        <span>💬 Discord: zodiakx_x</span>
                        <span>🐦 @zodiakx_x</span>
                        <span>💻 ixZODiAK</span>
                    </div>
                </div>

                <!-- الملخص -->
                <div class="section">
                    <div class="section-title">📋 ملخص احترافي</div>
                    <div class="summary">
                        مختبر اختراق شغوف بأمن المعلومات، متخصص في اختبارات الاختراق وتقييم الثغرات. 
                        أمتلك خبرة في اكتشاف واستغلال الثغرات الأمنية وتقديم حلول للوقاية منها. 
                        مشارك نشط في منصات CTF و Bug Bounty.
                    </div>
                </div>

                <!-- الخبرات -->
                <div class="section">
                    <div class="section-title">💼 الخبرات المهنية</div>
                    
                    <div class="experience-item">
                        <div class="exp-year">2025 - الحالي</div>
                        <div class="exp-title">Junior Pentester</div>
                        <div class="exp-company">HackerOne | TryHackMe | PortSwigger</div>
                        <ul class="exp-desc">
                            <li>اكتشاف والإبلاغ عن ثغرات في تطبيقات الويب</li>
                            <li>المشاركة في برامج مكافآت الثغرات (Bug Bounty)</li>
                            <li>حل أكثر من 100 machine على TryHackMe و HackTheBox</li>
                        </ul>
                    </div>

                    <div class="experience-item">
                        <div class="exp-year">2024 - 2025</div>
                        <div class="exp-title">باحث أمني</div>
                        <div class="exp-company">برامج Bug Bounty</div>
                        <ul class="exp-desc">
                            <li>البحث عن ثغرات في منصات كبرى</li>
                            <li>كتابة تقارير احترافية عن الثغرات المكتشفة</li>
                            <li>المشاركة في مسابقات CTF محلية وعالمية</li>
                        </ul>
                    </div>

                    <div class="experience-item">
                        <div class="exp-year">2025 - 2026</div>
                        <div class="exp-title">لاعب CTF</div>
                        <div class="exp-company">فريق BlackV</div>
                        <ul class="exp-desc">
                            <li>المركز الأول في مسابقة CTF tryhackme 2026</li>
                            <li>تخصص في تحديات Web و Crypto</li>
                            <li>كتابة writeups للمسابقات</li>
                        </ul>
                    </div>
                </div>

                <!-- الشهادات -->
                <div class="section">
                    <div class="section-title">🏆 الشهادات</div>
                    <div class="certs-grid">
                        <div class="cert-card">
                            <div class="cert-name">OSCP</div>
                            <div class="cert-issuer">Offensive Security</div>
                        </div>
                        <div class="cert-card">
                            <div class="cert-name">CEH Master</div>
                            <div class="cert-issuer">EC-Council</div>
                        </div>
                        <div class="cert-card">
                            <div class="cert-name">CRTP</div>
                            <div class="cert-issuer">Pentester Academy</div>
                        </div>
                    </div>
                </div>

                <!-- المهارات -->
                <div class="section">
                    <div class="section-title">💻 المهارات التقنية</div>
                    <div class="skills-grid">
                        <div class="skill-card">
                            <div class="skill-name">Web Pentesting</div>
                            <div class="skill-level">متقدم (90%)</div>
                            <div class="skill-desc">SQLi, XSS, CSRF, SSRF</div>
                        </div>
                        <div class="skill-card">
                            <div class="skill-name">Network Security</div>
                            <div class="skill-level">متقدم (85%)</div>
                            <div class="skill-desc">Nmap, Metasploit, Wireshark</div>
                        </div>
                        <div class="skill-card">
                            <div class="skill-name">Python Scripting</div>
                            <div class="skill-level">متقدم (80%)</div>
                            <div class="skill-desc">Automation, Exploits</div>
                        </div>
                        <div class="skill-card">
                            <div class="skill-name">Reverse Engineering</div>
                            <div class="skill-level">متوسط (75%)</div>
                            <div class="skill-desc">Ghidra, IDA, x86/x64</div>
                        </div>
                        <div class="skill-card">
                            <div class="skill-name">Cryptography</div>
                            <div class="skill-level">متوسط (70%)</div>
                            <div class="skill-desc">RSA, AES, Hashing</div>
                        </div>
                    </div>
                </div>

                <!-- اللغات -->
                <div class="section">
                    <div class="section-title">🌐 اللغات</div>
                    <div class="languages-grid">
                        <div class="lang-card">
                            <div class="lang-name">العربية</div>
                            <div class="lang-level">اللغة الأم</div>
                        </div>
                        <div class="lang-card">
                            <div class="lang-name">الإنجليزية</div>
                            <div class="lang-level">مستوى متوسط (B1)</div>
                        </div>
                    </div>
                </div>

                <!-- الفوتر -->
                <div class="footer">
                    © 2026 ZODiAK - #HackThePlanet
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #0ff;">
                <p>📌 لحفظ الملف كـ PDF: اضغط Ctrl+P ثم اختار "حفظ كـ PDF"</p>
            </div>
        </body>
        </html>
    `;

    // إنشاء ملف HTML وتحميله
    const blob = new Blob([cvHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZODiAK_CV_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // رسالة للمستخدم
    alert('✅ تم تحميل الـ CV. افتح الملف ثم اضغط Ctrl+P واختار "حفظ كـ PDF"');
}

// ========== Toggle Menu للموبايل ==========
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.menu-toggle');
    
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
}

// إغلاق القائمة لما تضغط على لينك
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
        document.querySelector('.menu-toggle').classList.remove('active');
    });
});

// ========== نظام إرسال الإيميلات ==========
// بيانات EmailJS (غيرها ببياناتك بعد التسجيل)
const EMAILJS_CONFIG = {
    publicKey: 'kuU-_BRNDtweQfJzN',        // Public Key من حساب EmailJS
    serviceID: 'service_o8abt1f',        // Service ID من حساب EmailJS
    templateID: 'template_rcpmync'       // Template ID من حساب EmailJS
};

// تهيئة EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// دالة إرسال الإيميل
function sendEmail(event) {
    event.preventDefault();
    
    // جلب البيانات
    const fromName = document.getElementById('fromName').value;
    const fromEmail = document.getElementById('fromEmail').value;
    const message = document.getElementById('message').value;
    const sendBtn = document.getElementById('sendBtn');
    const formMessage = document.getElementById('formMessage');
    
    // تعطيل الزر أثناء الإرسال
    sendBtn.disabled = true;
    sendBtn.innerHTML = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
    
    // تحضير البيانات - المعدل
    const templateParams = {
        from_name: fromName,
        from_email: fromEmail,
        message: message,
        to_email: 'zodiak0x6@gmail.com',  // ايميلي انا 
        reply_to: fromEmail,               // هيخلي الرد يروح لليوزر
        email: fromEmail                    // بعض القوالب بتحتاجها
    };
    
    // إرسال الإيميل
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // رسالة نجاح
            formMessage.style.display = 'block';
            formMessage.style.background = 'rgba(0, 255, 0, 0.1)';
            formMessage.style.border = '1px solid #0f0';
            formMessage.style.color = '#0f0';
            formMessage.innerHTML = currentLang === 'ar' ? 
                '✅ تم إرسال الرسالة بنجاح! سأرد عليك قريباً' : 
                '✅ Message sent successfully! I will reply soon';
            
            // مسح الحقول
            document.getElementById('contactForm').reset();
            
            // إخفاء الرسالة بعد 5 ثواني
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            
            // رسالة فشل
            formMessage.style.display = 'block';
            formMessage.style.background = 'rgba(255, 0, 0, 0.1)';
            formMessage.style.border = '1px solid #f00';
            formMessage.style.color = '#f00';
            formMessage.innerHTML = currentLang === 'ar' ? 
                '❌ فشل الإرسال. حاول مرة أخرى' : 
                '❌ Failed to send. Please try again';
            
            // إخفاء الرسالة بعد 5 ثواني
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        })
        .finally(function() {
            // إعادة تفعيل الزر
            sendBtn.disabled = false;
            sendBtn.innerHTML = currentLang === 'ar' ? 'إرسال' : 'Send';
        });
}
// ========== التحقق من الجلسة المحفوظة ==========
window.onload = function() {
    setLang('ar');
    loadWriteups();
    
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isAdmin = true;
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').style.display = 'none';
        updateEditSelect();
        updateDeleteSelect();
    }
};