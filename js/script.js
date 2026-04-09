// ========== الباسوورد ==========
const ADMIN_PASSWORD = "zodiak##**@@";
let isAdmin = false;
let currentLang = 'ar';

// ========== JSONBin.io Configuration ==========
const JSONBIN_CONFIG = {
    binId: '69a2f38d43b1c97be9a68c0c',
    masterKey: '$2a$10$p/Egp26o3AWMuQUWxlxbFunqeANPB7Z2mDO5h5iMKs5Y6tv9vj2Cq',
    accessKey: '$2a$10$bfl5.GzXd95qCu5CucKgDOSo6sNSY9L4Zxr2pf51sQ/YLN7Jx9BuC'
};

// ========== Cloudinary Configuration ==========
const CLOUDINARY_CONFIG = {
    cloudName: 'dk31bqmzt',
    uploadPreset: 'zodiak_preset',
    folder: 'zodiak_writeups'
};

// ========== بيانات المقالات ==========
let writeups = JSON.parse(localStorage.getItem('pentester_writeups')) || [
    {
        id: 1,
        title: { ar: "HackTheBox - شرح كامل لاختراق Lame Machine", en: "HackTheBox - Lame Machine Complete Walkthrough" },
        platform: "HackTheBox",
        date: "2024-01-15",
        content: { ar: "شرح كامل لاختراق Machine Lame من HackTheBox باستخدام ثغرة Samba CVE-2007-2447...", en: "Complete walkthrough for HackTheBox Lame machine using Samba vulnerability CVE-2007-2447..." },
        tags: ["Linux", "Samba", "Easy"],
        views: 245,
        likes: 42,
        dislikes: 3,
        media: []
    },
    {
        id: 2,
        title: { ar: "TryHackMe - دليل اختراق Mr Robot", en: "TryHackMe - Mr Robot CTF Complete Guide" },
        platform: "TryHackMe",
        date: "2024-01-10",
        content: { ar: "كيفية اختراق Mr Robot machine على TryHackMe خطوة بخطوة...", en: "Step by step guide to compromise Mr Robot machine on TryHackMe..." },
        tags: ["WordPress", "PrivEsc", "Linux"],
        views: 189,
        likes: 31,
        dislikes: 2,
        media: []
    },
    {
        id: 3,
        title: { ar: "CTFtime - حل تحديات RSA بالتشفير", en: "CTFtime - RSA Crypto Challenge Writeup" },
        platform: "CTFtime",
        date: "2024-01-05",
        content: { ar: "حل تحديات RSA في مسابقات CTF باستخدام Python...", en: "Solving RSA challenges in CTF competitions using Python..." },
        tags: ["Cryptography", "RSA", "Python"],
        views: 156,
        likes: 28,
        dislikes: 1,
        media: []
    }
];

let currentMediaItems = [];

// ========== ترجمة الموقع ==========
const translations = {
    ar: {
        'nav-home': 'الرئيسية', 'nav-cv': 'السيرة', 'nav-vuln': 'الثغرات', 'nav-blog': 'المدونة', 'nav-contact': 'تواصل',
        'lang-ar': 'عربي', 'lang-en': 'English', 'admin-login': '🔑 دخول الأدمن', 'login-title': 'دخول الأدمن',
        'login-placeholder': 'كلمة السر', 'login-button': 'تسجيل الدخول', 'logout': '🚪 خروج',
        'admin-panel-title': '🔰 لوحة تحكم الأدمن', 'tab-add': '➕ إضافة مقال', 'tab-edit': '✏️ تعديل مقال',
        'tab-delete': '🗑️ حذف مقال', 'add-title': 'إضافة مقال جديد', 'edit-title': 'تعديل مقال',
        'delete-title': 'حذف مقال', 'post-title': 'عنوان المقال', 'post-content': 'محتوى المقال كاملاً',
        'post-tags': 'الوسوم (مفصولة بفواصل)', 'publish': '📝 نشر المقال', 'update': '🔄 تحديث المقال',
        'delete': '❌ حذف نهائي', 'select-edit': 'اختر مقال للتعديل', 'select-delete': 'اختر مقال للحذف',
        'new-title': 'العنوان الجديد', 'new-content': 'المحتوى الجديد', 'add-media': '➕ إضافة صور/فيديوهات',
        'upload-media': 'رفع ملفات', 'hero-name': 'ZODiAK - Pentester', 'hero-command': '#!/bin/bash - "Hack The Planet"',
        'hero-desc': 'مختبر اختراق | OSCP | CEH | CTF Player', 'skill-web': 'اختبار الاختراق للويب',
        'skill-web-desc': 'SQLi, XSS, CSRF, SSRF', 'skill-network': 'أمن الشبكات', 'skill-network-desc': 'Nmap, Metasploit, Wireshark',
        'skill-reverse': 'الهندسة العكسية', 'skill-reverse-desc': 'Ghidra, IDA, x86/x64', 'skill-crypto': 'التشفير',
        'skill-crypto-desc': 'RSA, AES, Hashing', 'cv-title': '┌─[CV]─[السيرة الذاتية]', 'cv-name': 'ZODiAK',
        'cv-job': 'Penetration Tester | OSCP', 'cv-download': '📥 تحميل CV', 'cv-summary': 'ملخص احترافي',
        'cv-summary-text': 'مختبر اختراق شغوف بأمن المعلومات، متخصص في اختبارات الاختراق وتقييم الثغرات.', 'cv-experience': 'الخبرات المهنية',
        'cv-exp1-title': 'Junior Pentester', 'cv-exp1-company': 'HackerOne | TryHackMe | PortSwigger',
        'cv-exp1-desc1': 'اكتشاف والإبلاغ عن ثغرات في تطبيقات الويب', 'cv-exp1-desc2': 'المشاركة في برامج مكافآت الثغرات',
        'cv-exp1-desc3': 'حل أكثر من 100 machine على TryHackMe و HackTheBox', 'cv-exp2-title': 'باحث أمني',
        'cv-exp2-company': 'برامج Bug Bounty', 'cv-exp2-desc1': 'البحث عن ثغرات في منصات كبرى',
        'cv-exp2-desc2': 'كتابة تقارير احترافية عن الثغرات المكتشفة', 'cv-exp2-desc3': 'المشاركة في مسابقات CTF محلية وعالمية',
        'cv-exp3-title': 'لاعب CTF', 'cv-exp3-company': 'فريق BlackV', 'cv-exp3-desc1': 'المركز الأول في مسابقة CTF محلية 2026',
        'cv-exp3-desc2': 'تخصص في تحديات Web و Crypto', 'cv-exp3-desc3': 'كتابة writeups للمسابقات', 'cv-certs': 'الشهادات',
        'cv-education': 'التعليم', 'cv-edu-title': 'طالب بكليه الشريعه و القانون', 'cv-edu-major': 'مختبر اختراق',
        'cv-edu-school': 'جامعة الازهر', 'cv-skills-title': 'المهارات التقنية', 'cv-languages': 'اللغات',
        'lang-arabic': 'العربية', 'lang-native': 'اللغة الأم', 'lang-english': 'الإنجليزية', 'lang-fluent': 'متوسط (B1)',
        'cv-location': 'مصر', 'vuln-title': '┌─[TOP 10]─[أهم الثغرات]', 'vuln-desc-sql': 'حقن SQL - المهاجم ينفذ أوامر SQL خبيثة',
        'vuln-prevention-sql': '✅ استخدم Prepared Statements', 'vuln-desc-xss': 'حقن سكريبتات خبيثة في صفحات الويب',
        'vuln-prevention-xss': '✅ تشفير المخرجات - CSP', 'vuln-desc-csrf': 'تزوير الطلبات عبر المواقع',
        'vuln-prevention-csrf': '✅ CSRF Tokens - SameSite Cookies', 'vuln-desc-lfi': 'قراءة ملفات حساسة من السيرفر',
        'vuln-prevention-lfi': '✅ التحقق من المدخلات - Whitelist', 'vuln-desc-rfi': 'تضمين ملفات خارجية خبيثة',
        'vuln-prevention-rfi': '✅ تعطيل allow_url_include', 'vuln-desc-cmd': 'تنفيذ أوامر على نظام التشغيل',
        'vuln-prevention-cmd': '✅ escapeshellcmd() - escapeshellarg()', 'vuln-desc-idor': 'الوصول المباشر غير المصرح به للكائنات',
        'vuln-prevention-idor': '✅ التحقق من الصلاحيات لكل طلب', 'vuln-desc-xxe': 'ثغرة في معالجة XML',
        'vuln-prevention-xxe': '✅ تعطيل XXE في معالج XML', 'vuln-desc-ssrf': 'إجبار السيرفر على عمل طلبات داخلية',
        'vuln-prevention-ssrf': '✅ Whitelist للـ URLs المسموح بها', 'vuln-desc-auth': 'ثغرات في نظام المصادقة',
        'vuln-prevention-auth': '✅ MFA - قفل الحساب - كلمات مرور قوية', 'blog-title': '┌─[BLOG]─[كتابات CTF]',
        'read-more': '📖 اقرأ المزيد', 'contact-title': '┌─[CONTACT]─[تواصل معي]', 'send-message': 'أرسل رسالة',
        'your-name': 'اسمك', 'your-email': 'بريدك', 'your-message': 'رسالتك', 'send': 'إرسال',
        'sending': 'جاري الإرسال...', 'discord': 'Discord: zodiakx_x', 'twitter': 'Twitter: zodiakx_x',
        'github': 'GitHub: ixZODiAK', 'footer': '© 2026 ZODiAK - مختبر اختراق | جميع الحقوق محفوظة', 'footer-quote': '#HackThePlanet'
    },
    en: {
        'nav-home': 'Home', 'nav-cv': 'CV', 'nav-vuln': 'Vulnerabilities', 'nav-blog': 'Blog', 'nav-contact': 'Contact',
        'lang-ar': 'عربي', 'lang-en': 'English', 'admin-login': '🔑 ADMIN LOGIN', 'login-title': 'Admin Login',
        'login-placeholder': 'Password', 'login-button': 'Login', 'logout': '🚪 Logout',
        'admin-panel-title': '🔰 Admin Control Panel', 'tab-add': '➕ Add Post', 'tab-edit': '✏️ Edit Post',
        'tab-delete': '🗑️ Delete Post', 'add-title': 'Add New Writeup', 'edit-title': 'Edit Writeup',
        'delete-title': 'Delete Writeup', 'post-title': 'Post Title', 'post-content': 'Full Writeup Content',
        'post-tags': 'Tags (comma separated)', 'publish': '📝 Publish', 'update': '🔄 Update',
        'delete': '❌ Delete', 'select-edit': 'Select writeup to edit', 'select-delete': 'Select writeup to delete',
        'new-title': 'New title', 'new-content': 'New content', 'add-media': '➕ Add Images/Videos',
        'upload-media': 'Upload Files', 'hero-name': 'ZODiAK - Pentester', 'hero-command': '#!/bin/bash - "Hack The Planet"',
        'hero-desc': 'Penetration Tester | OSCP | CTF Player', 'skill-web': 'Web Penetration',
        'skill-web-desc': 'SQLi, XSS, CSRF, SSRF', 'skill-network': 'Network Security',
        'skill-network-desc': 'Nmap, Metasploit, Wireshark', 'skill-reverse': 'Reverse Engineering',
        'skill-reverse-desc': 'Ghidra, IDA, x86/x64', 'skill-crypto': 'Cryptography', 'skill-crypto-desc': 'RSA, AES, Hashing',
        'cv-title': '┌─[CV]─[Resume]', 'cv-name': 'ZODiAK', 'cv-job': 'Penetration Tester | OSCP',
        'cv-download': '📥 Download CV', 'cv-summary': 'Professional Summary',
        'cv-summary-text': 'Passionate Penetration Tester specializing in security assessments and vulnerability research.',
        'cv-experience': 'Experience', 'cv-exp1-title': 'Junior Pentester',
        'cv-exp1-company': 'HackerOne | TryHackMe | PortSwigger', 'cv-exp1-desc1': 'Discover and report vulnerabilities',
        'cv-exp1-desc2': 'Participate in Bug Bounty programs', 'cv-exp1-desc3': 'Solved 100+ machines',
        'cv-exp2-title': 'Security Researcher', 'cv-exp2-company': 'Bug Bounty Programs',
        'cv-exp2-desc1': 'Hunt for vulnerabilities', 'cv-exp2-desc2': 'Write professional reports',
        'cv-exp2-desc3': 'Participate in CTF competitions', 'cv-exp3-title': 'CTF Player',
        'cv-exp3-company': 'Black-V Team', 'cv-exp3-desc1': '1st place in local CTF competition 2026',
        'cv-exp3-desc2': 'Specialized in Web and Crypto', 'cv-exp3-desc3': 'Write CTF writeups',
        'cv-certs': 'Certifications', 'cv-education': 'Education', 'cv-edu-title': 'Student of Law',
        'cv-edu-major': 'Penetration Testing', 'cv-edu-school': 'Al-Azhar University', 'cv-skills-title': 'Technical Skills',
        'cv-languages': 'Languages', 'lang-arabic': 'Arabic', 'lang-native': 'Native', 'lang-english': 'English',
        'lang-fluent': 'Intermediate (B1)', 'cv-location': 'Egypt', 'vuln-title': '┌─[TOP 10]─[Vulnerabilities]',
        'vuln-desc-sql': 'SQL Injection - Attacker executes malicious SQL commands', 'vuln-prevention-sql': '✅ Use Prepared Statements',
        'vuln-desc-xss': 'Inject malicious scripts into web pages', 'vuln-prevention-xss': '✅ Output encoding - CSP',
        'vuln-desc-csrf': 'Cross-Site Request Forgery', 'vuln-prevention-csrf': '✅ CSRF Tokens - SameSite Cookies',
        'vuln-desc-lfi': 'Read sensitive files from server', 'vuln-prevention-lfi': '✅ Input validation - Whitelist',
        'vuln-desc-rfi': 'Include malicious external files', 'vuln-prevention-rfi': '✅ Disable allow_url_include',
        'vuln-desc-cmd': 'Execute OS commands', 'vuln-prevention-cmd': '✅ escapeshellcmd()',
        'vuln-desc-idor': 'Unauthorized access to objects', 'vuln-prevention-idor': '✅ Check permissions',
        'vuln-desc-xxe': 'XML External Entity attack', 'vuln-prevention-xxe': '✅ Disable XXE',
        'vuln-desc-ssrf': 'Server-Side Request Forgery', 'vuln-prevention-ssrf': '✅ URL whitelist',
        'vuln-desc-auth': 'Broken Authentication', 'vuln-prevention-auth': '✅ MFA - Strong passwords',
        'blog-title': '┌─[BLOG]─[CTF Writeups]', 'read-more': '📖 Read More',
        'contact-title': '┌─[CONTACT]─[Get in touch]', 'send-message': 'Send a message',
        'your-name': 'Your name', 'your-email': 'Your email', 'your-message': 'Your message',
        'send': 'Send', 'sending': 'Sending...', 'discord': 'Discord: zodiakx_x',
        'twitter': 'Twitter: zodiakx_x', 'github': 'GitHub: ixZODiAK',
        'footer': '© 2026 ZODiAK - Penetration Tester | All rights reserved', 'footer-quote': '#HackThePlanet'
    }
};

// ========== إدارة المودال ==========
function openAdminModal() { document.getElementById('adminModal').classList.add('active'); }
function closeAdminModal() { document.getElementById('adminModal').classList.remove('active'); }
function checkEnter(e) { if (e.key === 'Enter') adminLogin(); }

function adminLogin() {
    if (document.getElementById('adminPass').value === ADMIN_PASSWORD) {
        isAdmin = true;
        document.getElementById('adminModal').classList.remove('active');
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').style.display = 'none';
        sessionStorage.setItem('adminLoggedIn', 'true');
        updateEditSelect();
        updateDeleteSelect();
        alert(currentLang === 'ar' ? 'مرحباً بك يا ZODiAK!' : 'Welcome Back ZODiAK!');
    } else {
        alert(currentLang === 'ar' ? '❌ كلمة سر خطأ' : '❌ Password Incorrect');
        document.getElementById('adminPass').value = '';
    }
}

function logoutAdmin() {
    isAdmin = false;
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('adminLoginBtn').style.display = 'block';
    sessionStorage.removeItem('adminLoggedIn');
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.admin-form').forEach(f => f.classList.remove('active'));
    if (tab === 'add') document.getElementById('addForm').classList.add('active');
    if (tab === 'edit') document.getElementById('editForm').classList.add('active');
    if (tab === 'delete') document.getElementById('deleteForm').classList.add('active');
}

function setLang(lang) {
    currentLang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
    displayWriteups();
}

async function loadWriteups() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.binId}/latest`, {
            headers: { 'X-Master-Key': JSONBIN_CONFIG.masterKey, 'X-Access-Key': JSONBIN_CONFIG.accessKey }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.record && data.record.writeups && data.record.writeups.length > 0) {
                writeups = data.record.writeups;
                localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
            }
        }
    } catch (error) { console.error('خطأ في جلب البيانات:', error); }
    displayWriteups();
}

async function saveWriteupsToCloud() {
    try {
        await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.binId}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_CONFIG.masterKey, 'X-Access-Key': JSONBIN_CONFIG.accessKey },
            body: JSON.stringify({ writeups: writeups })
        });
        return true;
    } catch (error) { return false; }
}

function displayWriteups() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    grid.innerHTML = '';
    writeups.sort((a, b) => new Date(b.date) - new Date(a.date));
    writeups.forEach(w => {
        let mediaPreview = '';
        if (w.media && w.media.length > 0) {
            mediaPreview = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin: 10px 0;">';
            w.media.slice(0, 3).forEach(media => {
                if (media.type === 'image') mediaPreview += `<img src="${media.url}" style="width: 100%; height: 60px; object-fit: cover; border-radius: 5px; border: 1px solid var(--accent-cyan);">`;
                else if (media.type === 'video') mediaPreview += `<video src="${media.url}" style="width: 100%; height: 60px; object-fit: cover; border-radius: 5px; border: 1px solid var(--accent-purple);"></video>`;
            });
            if (w.media.length > 3) mediaPreview += `<div style="background: rgba(0,255,255,0.1); display: flex; align-items: center; justify-content: center; border-radius: 5px; font-size: 0.9rem;">+${w.media.length-3}</div>`;
            mediaPreview += '</div>';
        }
        const card = `
            <div class="blog-card">
                <div style="display: flex; justify-content: space-between;"><span class="blog-platform">${w.platform}</span><span style="color: var(--accent-yellow);">📅 ${w.date}</span></div>
                <h3 class="blog-title">${w.title[currentLang]}</h3>
                <div class="blog-tags">${w.tags.map(t => `<span class="blog-tag">#${t}</span>`).join('')}</div>
                ${mediaPreview}
                <div class="blog-content">${w.content[currentLang].substring(0, 150)}...</div>
                <div class="blog-stats"><span class="stat">👁️ ${w.views}</span><span class="stat">📸 ${w.media ? w.media.length : 0}</span>
                <button class="reaction-btn" onclick="likePost(${w.id})">👍 <span id="likes-${w.id}">${w.likes}</span></button>
                <button class="reaction-btn" onclick="dislikePost(${w.id})">👎 <span id="dislikes-${w.id}">${w.dislikes}</span></button></div>
                <button class="admin-tab" style="margin-top: 15px; width: 100%;" onclick="readFullPost(${w.id})">${currentLang === 'ar' ? '📖 اقرأ المزيد' : '📖 Read More'}</button>
            </div>
        `;
        grid.innerHTML += card;
    });
    updateEditSelect();
    updateDeleteSelect();
}

function readFullPost(id) {
    const post = writeups.find(w => w.id === id);
    if (!post) return;
    post.views++;
    localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
    saveWriteupsToCloud();
    let mediaGallery = '';
    if (post.media && post.media.length > 0) {
        mediaGallery = '<div class="media-gallery" style="margin: 20px 0;"><h3 style="color: var(--accent-cyan); margin-bottom: 15px;">📸 معرض الصور والفيديوهات</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">';
        post.media.forEach(media => {
            if (media.type === 'image') mediaGallery += `<div style="border: 2px solid var(--accent-cyan); border-radius: 10px; overflow: hidden;"><img src="${media.url}" style="width: 100%; height: 180px; object-fit: cover; cursor: pointer;" onclick="window.open('${media.url}', '_blank')"></div>`;
            else mediaGallery += `<div style="border: 2px solid var(--accent-purple); border-radius: 10px; overflow: hidden;"><video src="${media.url}" controls style="width: 100%; height: 180px; object-fit: cover;"></video></div>`;
        });
        mediaGallery += '</div></div>';
    }
    const fullContent = `
        <div style="margin-bottom: 20px;">
            <span class="blog-platform" style="display: inline-block; margin-bottom: 10px;">${post.platform}</span>
            <div style="display: flex; gap: 15px; color: var(--accent-yellow); margin-bottom: 15px;"><span>📅 ${post.date}</span><span>👁️ ${post.views} مشاهدة</span></div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">${post.tags.map(t => `<span style="background: rgba(255,255,255,0.05); color: var(--accent-purple); padding: 3px 12px; border-radius: 15px; font-size: 0.9rem;">#${t}</span>`).join('')}</div>
            ${mediaGallery}
            <div style="background: rgba(0,255,255,0.02); padding: 25px; border-radius: 15px; border-right: 4px solid var(--accent-purple); line-height: 1.8;">${post.content[currentLang].split('\n').map(p => `<p style="margin-bottom: 15px;">${p}</p>`).join('')}</div>
            <div style="display: flex; gap: 20px; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <button class="reaction-btn" onclick="likePostFromModal(${post.id})" style="font-size: 1.2rem;">👍 <span id="modal-likes-${post.id}">${post.likes}</span></button>
                <button class="reaction-btn" onclick="dislikePostFromModal(${post.id})" style="font-size: 1.2rem;">👎 <span id="modal-dislikes-${post.id}">${post.dislikes}</span></button>
            </div>
        </div>
    `;
    showFullPostModal(post.title[currentLang], fullContent, post.id);
}

function showFullPostModal(title, content, postId) {
    let modal = document.getElementById('fullPostModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'fullPostModal';
        modal.className = 'modal';
        modal.innerHTML = `<div class="modal-content" style="max-width: 900px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 30px; position: relative;"><span class="close-modal" onclick="closeFullPostModal()" style="position: absolute; top: 15px; left: 20px; font-size: 2rem; cursor: pointer; color: var(--accent-red);">&times;</span><h2 id="fullPostTitle" style="color: var(--accent-cyan); margin-bottom: 20px; padding-left: 30px;"></h2><div id="fullPostContent" style="color: var(--text-primary);"></div></div>`;
        document.body.appendChild(modal);
    }
    document.getElementById('fullPostTitle').textContent = title;
    document.getElementById('fullPostContent').innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFullPostModal() {
    const modal = document.getElementById('fullPostModal');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

function likePostFromModal(id) {
    const post = writeups.find(w => w.id === id);
    if (post) { post.likes++; localStorage.setItem('pentester_writeups', JSON.stringify(writeups)); saveWriteupsToCloud();
    const modalLikes = document.getElementById(`modal-likes-${id}`); const cardLikes = document.getElementById(`likes-${id}`);
    if (modalLikes) modalLikes.textContent = post.likes; if (cardLikes) cardLikes.textContent = post.likes; }
}

function dislikePostFromModal(id) {
    const post = writeups.find(w => w.id === id);
    if (post) { post.dislikes++; localStorage.setItem('pentester_writeups', JSON.stringify(writeups)); saveWriteupsToCloud();
    const modalDislikes = document.getElementById(`modal-dislikes-${id}`); const cardDislikes = document.getElementById(`dislikes-${id}`);
    if (modalDislikes) modalDislikes.textContent = post.dislikes; if (cardDislikes) cardDislikes.textContent = post.dislikes; }
}

function likePost(id) {
    const post = writeups.find(w => w.id === id);
    if (post) { post.likes++; localStorage.setItem('pentester_writeups', JSON.stringify(writeups)); saveWriteupsToCloud();
    document.getElementById(`likes-${id}`).textContent = post.likes; }
}

function dislikePost(id) {
    const post = writeups.find(w => w.id === id);
    if (post) { post.dislikes++; localStorage.setItem('pentester_writeups', JSON.stringify(writeups)); saveWriteupsToCloud();
    document.getElementById(`dislikes-${id}`).textContent = post.dislikes; }
}

function updateEditSelect() {
    const select = document.getElementById('editSelect');
    if (!select) return;
    select.innerHTML = `<option value="">${currentLang === 'ar' ? 'اختر مقال للتعديل' : 'Select writeup to edit'}</option>`;
    writeups.forEach(w => { select.innerHTML += `<option value="${w.id}">${w.title[currentLang]}</option>`; });
}

function updateDeleteSelect() {
    const select = document.getElementById('deleteSelect');
    if (!select) return;
    select.innerHTML = `<option value="">${currentLang === 'ar' ? 'اختر مقال للحذف' : 'Select writeup to delete'}</option>`;
    writeups.forEach(w => { select.innerHTML += `<option value="${w.id}">${w.title[currentLang]}</option>`; });
}

function loadWriteupForEdit() {
    const id = document.getElementById('editSelect').value;
    if (!id) return;
    const post = writeups.find(w => w.id == id);
    if (post) { document.getElementById('editTitle').value = post.title[currentLang]; document.getElementById('editContent').value = post.content[currentLang]; }
}

async function updateWriteup() {
    if (!isAdmin) return;
    const id = document.getElementById('editSelect').value;
    if (!id) { alert(currentLang === 'ar' ? '❌ اختر مقالاً أولاً' : '❌ Select a post first'); return; }
    const index = writeups.findIndex(w => w.id == id);
    if (index !== -1) {
        writeups[index].title[currentLang] = document.getElementById('editTitle').value || writeups[index].title[currentLang];
        writeups[index].content[currentLang] = document.getElementById('editContent').value || writeups[index].content[currentLang];
        localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
        const saved = await saveWriteupsToCloud();
        if (saved) { displayWriteups(); alert(currentLang === 'ar' ? '✅ تم تحديث المقال في السحابة!' : '✅ Writeup updated in cloud!'); }
        else { alert(currentLang === 'ar' ? '⚠️ تم التحديث محلياً فقط' : '⚠️ Updated locally only'); displayWriteups(); }
    }
}

async function deleteWriteup() {
    if (!isAdmin) return;
    const id = document.getElementById('deleteSelect').value;
    if (!id) { alert(currentLang === 'ar' ? '❌ اختر مقالاً للحذف' : '❌ Select a post to delete'); return; }
    if (confirm(currentLang === 'ar' ? '⚠️ هل أنت متأكد من حذف هذا المقال؟' : '⚠️ Are you sure you want to delete this writeup?')) {
        writeups = writeups.filter(w => w.id != id);
        localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
        const saved = await saveWriteupsToCloud();
        if (saved) { displayWriteups(); alert(currentLang === 'ar' ? '✅ تم حذف المقال من السحابة!' : '✅ Writeup deleted from cloud!'); }
        else { alert(currentLang === 'ar' ? '⚠️ تم الحذف محلياً فقط' : '⚠️ Deleted locally only'); displayWriteups(); }
    }
}

async function addWriteup() {
    if (!isAdmin) return;
    const title = { ar: document.getElementById('postTitle').value, en: document.getElementById('postTitle').value };
    const platform = document.getElementById('postPlatform').value;
    const content = { ar: document.getElementById('postContent').value, en: document.getElementById('postContent').value };
    const tags = document.getElementById('postTags').value.split(',').map(t => t.trim());
    if (!title.ar || !content.ar) { alert(currentLang === 'ar' ? '❌ من فضلك املأ جميع الحقول المطلوبة' : '❌ Please fill all required fields'); return; }
    const newWriteup = { id: Date.now(), title, platform, date: new Date().toISOString().split('T')[0], content, tags, views: 0, likes: 0, dislikes: 0, media: currentMediaItems };
    writeups.push(newWriteup);
    localStorage.setItem('pentester_writeups', JSON.stringify(writeups));
    const saved = await saveWriteupsToCloud();
    if (saved) {
        document.getElementById('postTitle').value = ''; document.getElementById('postContent').value = ''; document.getElementById('postTags').value = '';
        currentMediaItems = []; displayMediaPreview(); displayWriteups();
        alert(currentLang === 'ar' ? '✅ تم نشر المقال بنجاح في السحابة!' : '✅ Writeup published successfully to cloud!');
    } else { alert(currentLang === 'ar' ? '⚠️ تم الحفظ محلياً فقط (فشل الاتصال بالسحابة)' : '⚠️ Saved locally only (Failed to connect to cloud)'); displayWriteups(); }
}

function openMediaUploader() {
    if (!isAdmin) return;
    const uploadWidget = cloudinary.createUploadWidget({
        cloudName: CLOUDINARY_CONFIG.cloudName, uploadPreset: CLOUDINARY_CONFIG.uploadPreset, folder: CLOUDINARY_CONFIG.folder,
        sources: ['local', 'url', 'camera'], multiple: true, maxFiles: 10, maxFileSize: 10000000,
        styles: { palette: { window: "#0a0c0f", windowBorder: "#0ff", tabIcon: "#0ff", menuIcons: "#0ff", textDark: "#000000", textLight: "#FFFFFF", link: "#0ff", action: "#b300ff", inactiveTabIcon: "#94a3b8", error: "#ff0055", inProgress: "#0ff", complete: "#0f0", sourceBg: "#0f1217" } }
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            currentMediaItems.push({ url: result.info.secure_url, type: result.info.resource_type, format: result.info.format, publicId: result.info.public_id });
            displayMediaPreview();
            alert(currentLang === 'ar' ? '✅ تم رفع الملف بنجاح!' : '✅ File uploaded successfully!');
        }
        if (error) { console.error('خطأ في الرفع:', error); alert(currentLang === 'ar' ? '❌ فشل في رفع الملف' : '❌ Upload failed'); }
    });
    uploadWidget.open();
}

function displayMediaPreview() {
    const previewContainer = document.getElementById('mediaPreview');
    if (!previewContainer) return;
    if (currentMediaItems.length === 0) { previewContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">${currentLang === 'ar' ? '📸 لا توجد وسائط مرفوعة' : '📸 No media uploaded'}</p>`; return; }
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">';
    currentMediaItems.forEach((item, index) => {
        if (item.type === 'image') html += `<div style="position: relative; border: 2px solid var(--accent-cyan); border-radius: 10px; overflow: hidden;"><img src="${item.url}" style="width: 100%; height: 120px; object-fit: cover;" alt="media"><button onclick="removeMediaItem(${index})" style="position: absolute; top: 5px; right: 5px; background: rgba(255,0,85,0.8); border: none; color: white; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">✕</button></div>`;
        else html += `<div style="position: relative; border: 2px solid var(--accent-purple); border-radius: 10px; overflow: hidden;"><video src="${item.url}" style="width: 100%; height: 120px; object-fit: cover;"></video><button onclick="removeMediaItem(${index})" style="position: absolute; top: 5px; right: 5px; background: rgba(255,0,85,0.8); border: none; color: white; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">✕</button></div>`;
    });
    html += '</div>';
    previewContainer.innerHTML = html;
}

function removeMediaItem(index) { currentMediaItems.splice(index, 1); displayMediaPreview(); }
function testCloudinary() { openMediaUploader(); }

function downloadCV() {
    const cvHTML = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>ZODiAK - السيرة الذاتية</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a0c0f;color:#e2e8f0;font-family:'Cairo',sans-serif;padding:30px;}.cv-container{max-width:900px;margin:0 auto;background:#0f1217;border:3px solid #b300ff;border-radius:25px;padding:40px;}.header{text-align:center;margin-bottom:30px;border-bottom:3px solid #0ff;padding-bottom:20px;}.name{font-size:48px;color:#b300ff;text-shadow:0 0 20px #b300ff;}.title{font-size:24px;color:#0ff;margin-bottom:15px;}.contact-info{display:flex;justify-content:center;gap:30px;flex-wrap:wrap;color:#94a3b8;}.section{margin:30px 0;}.section-title{font-size:28px;color:#0ff;border-bottom:3px solid #0ff;padding-bottom:8px;display:inline-block;}.summary{background:rgba(0,255,255,0.03);border-right:5px solid #b300ff;padding:20px;border-radius:15px;color:#94a3b8;}.experience-item{margin:25px 0;padding-right:20px;border-right:3px solid #b300ff;}.exp-year{color:#ff0;font-size:18px;font-weight:bold;}.exp-title{color:#0ff;font-size:22px;}.exp-company{color:#b300ff;font-size:18px;}.exp-desc{color:#94a3b8;padding-right:20px;}.certs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:20px 0;}.cert-card{background:rgba(179,0,255,0.1);border:2px solid #b300ff;border-radius:15px;padding:20px;text-align:center;}.cert-name{color:#0ff;font-size:20px;font-weight:bold;}.skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:20px 0;}.skill-card{background:rgba(0,255,255,0.05);border:2px solid #0ff;border-radius:12px;padding:15px;}.skill-name{color:#0ff;font-size:18px;font-weight:bold;}.languages-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin:20px 0;}.lang-card{background:rgba(0,255,255,0.05);border:2px solid #0ff;border-radius:12px;padding:20px;text-align:center;}.lang-name{color:#0ff;font-size:20px;font-weight:bold;}.footer{text-align:center;margin-top:40px;padding-top:20px;border-top:3px solid #0ff;color:#94a3b8;}</style></head><body><div class="cv-container"><div class="header"><div class="name">Ebrahim Hammad</div><div class="title">Penetration Tester</div><div class="contact-info"><span>📍 مصر</span><span>📧 zodiak0x6@gmail.com</span><span>💬 Discord: zodiakx_x</span><span>🐦 @zodiakx_x</span><span>💻 ixZODiAK</span></div></div><div class="section"><div class="section-title">📋 ملخص احترافي</div><div class="summary">مختبر اختراق شغوف بأمن المعلومات، متخصص في اختبارات الاختراق وتقييم الثغرات.</div></div><div class="section"><div class="section-title">💼 الخبرات المهنية</div><div class="experience-item"><div class="exp-year">2025 - الحالي</div><div class="exp-title">Junior Pentester</div><div class="exp-company">HackerOne | TryHackMe | PortSwigger</div><ul class="exp-desc"><li>اكتشاف والإبلاغ عن ثغرات في تطبيقات الويب</li><li>المشاركة في برامج مكافآت الثغرات</li><li>حل أكثر من 100 machine</li></ul></div></div><div class="section"><div class="section-title">🏆 الشهادات</div><div class="certs-grid"><div class="cert-card"><div class="cert-name">OSCP</div><div class="cert-issuer">Offensive Security</div></div><div class="cert-card"><div class="cert-name">CEH Master</div><div class="cert-issuer">EC-Council</div></div><div class="cert-card"><div class="cert-name">CRTP</div><div class="cert-issuer">Pentester Academy</div></div></div></div><div class="section"><div class="section-title">💻 المهارات التقنية</div><div class="skills-grid"><div class="skill-card"><div class="skill-name">Web Pentesting</div><div class="skill-level">متقدم (90%)</div><div class="skill-desc">SQLi, XSS, CSRF, SSRF</div></div><div class="skill-card"><div class="skill-name">Network Security</div><div class="skill-level">متقدم (85%)</div><div class="skill-desc">Nmap, Metasploit, Wireshark</div></div><div class="skill-card"><div class="skill-name">Python Scripting</div><div class="skill-level">متقدم (80%)</div><div class="skill-desc">Automation, Exploits</div></div><div class="skill-card"><div class="skill-name">Reverse Engineering</div><div class="skill-level">متوسط (75%)</div><div class="skill-desc">Ghidra, IDA, x86/x64</div></div><div class="skill-card"><div class="skill-name">Cryptography</div><div class="skill-level">متوسط (70%)</div><div class="skill-desc">RSA, AES, Hashing</div></div></div></div><div class="section"><div class="section-title">🌐 اللغات</div><div class="languages-grid"><div class="lang-card"><div class="lang-name">العربية</div><div class="lang-level">اللغة الأم</div></div><div class="lang-card"><div class="lang-name">الإنجليزية</div><div class="lang-level">مستوى متوسط (B1)</div></div></div></div><div class="footer">© 2026 ZODiAK - #HackThePlanet</div></div><div style="text-align:center;margin-top:20px;color:#0ff;"><p>📌 لحفظ الملف كـ PDF: اضغط Ctrl+P ثم اختار "حفظ كـ PDF"</p></div></body></html>`;
    const blob = new Blob([cvHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZODiAK_CV_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    alert('✅ تم تحميل الـ CV. افتح الملف ثم اضغط Ctrl+P واختار "حفظ كـ PDF"');
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
    document.querySelector('.menu-toggle').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
        document.querySelector('.menu-toggle').classList.remove('active');
    });
});

const EMAILJS_CONFIG = { publicKey: 'kuU-_BRNDtweQfJzN', serviceID: 'service_o8abt1f', templateID: 'template_rcpmync' };
(function() { emailjs.init(EMAILJS_CONFIG.publicKey); })();

function sendEmail(event) {
    event.preventDefault();
    const fromName = document.getElementById('fromName').value;
    const fromEmail = document.getElementById('fromEmail').value;
    const message = document.getElementById('message').value;
    const sendBtn = document.getElementById('sendBtn');
    const formMessage = document.getElementById('formMessage');
    sendBtn.disabled = true;
    sendBtn.innerHTML = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, { from_name: fromName, from_email: fromEmail, message: message, to_email: 'zodiak0x6@gmail.com', reply_to: fromEmail, email: fromEmail })
        .then(() => {
            formMessage.style.display = 'block';
            formMessage.style.background = 'rgba(0, 255, 0, 0.1)';
            formMessage.style.border = '1px solid #0f0';
            formMessage.style.color = '#0f0';
            formMessage.innerHTML = currentLang === 'ar' ? '✅ تم إرسال الرسالة بنجاح! سأرد عليك قريباً' : '✅ Message sent successfully! I will reply soon';
            document.getElementById('contactForm').reset();
            setTimeout(() => formMessage.style.display = 'none', 5000);
        })
        .catch(() => {
            formMessage.style.display = 'block';
            formMessage.style.background = 'rgba(255, 0, 0, 0.1)';
            formMessage.style.border = '1px solid #f00';
            formMessage.style.color = '#f00';
            formMessage.innerHTML = currentLang === 'ar' ? '❌ فشل الإرسال. حاول مرة أخرى' : '❌ Failed to send. Please try again';
            setTimeout(() => formMessage.style.display = 'none', 5000);
        })
        .finally(() => { sendBtn.disabled = false; sendBtn.innerHTML = currentLang === 'ar' ? 'إرسال' : 'Send'; });
}

window.onclick = function(event) {
    const modal = document.getElementById('fullPostModal');
    if (event.target === modal) closeFullPostModal();
    const adminModal = document.getElementById('adminModal');
    if (event.target === adminModal) closeAdminModal();
}

window.onload = async function() {
    setLang('ar');
    await loadWriteups();
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isAdmin = true;
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').style.display = 'none';
        updateEditSelect();
        updateDeleteSelect();
    }
};

// ==================== إدارة الشهادات ====================
let certificates = JSON.parse(localStorage.getItem('certificates')) || [
    { id: 1, name: "OSCP", issuer: "Offensive Security", date: "2024", link: "https://www.offsec.com", description: "شهادة OSCP المهنية" },
    { id: 2, name: "CEH Master", issuer: "EC-Council", date: "2024", link: "https://www.eccouncil.org", description: "شهادة الهاكر الأخلاقي" },
    { id: 3, name: "CRTP", issuer: "Pentester Academy", date: "2024", link: "https://www.pentesteracademy.com", description: "شهادة اختبار اختراق Active Directory" }
];

let projects = JSON.parse(localStorage.getItem('projects')) || [
    { id: 1, name: "Vulnerable Web Lab", category: "Web Security", date: "2024", description: "مختبر ويب ضعيف", technologies: "JavaScript,Node.js", github: "https://github.com" },
    { id: 2, name: "Auto Pentest Toolkit", category: "Automation", date: "2024", description: "أدوات اختبار اختراق آلية", technologies: "Python,Bash,Nmap", github: "https://github.com" }
];

let machineWriteups = JSON.parse(localStorage.getItem('machineWriteups')) || [
    { id: 1, name: "Lame", platform: "HackTheBox", difficulty: "easy", date: "2024-01-15", description: "اختراق Lame", tags: "Samba,Linux", commands: "nmap -sV -sC 10.10.10.3", walkthrough: "الشرح الكامل...", likes: 42, views: 245 },
    { id: 2, name: "Blue", platform: "HackTheBox", difficulty: "easy", date: "2024-01-10", description: "اختراق Blue", tags: "Windows,EternalBlue", commands: "nmap -p445 --script smb-vuln-ms17-010", walkthrough: "الشرح الكامل...", likes: 67, views: 412 }
];

let platformStats = { hackthebox: 45, tryhackme: 62, portswigger: 38, vulnhub: 25, pentesterlab: 20 };

function displayCertificatesPublic() {
    const container = document.getElementById('certificatesDisplayGrid');
    if (!container) return;
    let html = '';
    certificates.forEach(cert => {
        html += `<div class="cert-card" onclick="window.open('${cert.link || '#'}', '_blank')">
            <div class="cert-info"><div class="cert-name">${cert.name}</div><div class="cert-issuer">${cert.issuer} | ${cert.date}</div><p>${cert.description?.substring(0, 80) || ''}...</p></div></div>`;
    });
    container.innerHTML = html || '<p>لا توجد شهادات</p>';
}

function displayProjectsPublic() {
    const container = document.getElementById('projectsDisplayGrid');
    if (!container) return;
    let html = '';
    projects.forEach(project => {
        html += `<div class="project-card" onclick="window.open('${project.github || '#'}', '_blank')">
            <div class="project-info"><div class="project-name">${project.name}</div><div class="project-category">📂 ${project.category} | 📅 ${project.date}</div><p>${project.description?.substring(0, 80) || ''}...</p><div>${(project.technologies || '').split(',').map(t => `<span class="admin-badge">${t.trim()}</span>`).join('')}</div></div></div>`;
    });
    container.innerHTML = html || '<p>لا توجد مشاريع</p>';
}

function displayMachineWriteups() {
    const container = document.getElementById('machineWriteupsGrid');
    if (!container) return;
    let html = '';
    machineWriteups.forEach(m => {
        const diffText = { easy: 'سهل', medium: 'متوسط', hard: 'صعب', insane: 'جنوني' }[m.difficulty] || m.difficulty;
        html += `<div class="writeup-machine-card" onclick="openMachineModal(${m.id})">
            <div class="writeup-machine-header"><span class="writeup-machine-name">${m.name}</span><div><span class="writeup-machine-platform">${m.platform}</span><span class="writeup-machine-difficulty difficulty-${m.difficulty}">${diffText}</span></div></div>
            <div class="writeup-machine-date">📅 ${m.date}</div><div class="writeup-machine-desc">${m.description?.substring(0, 100) || ''}...</div>
            <div class="writeup-machine-tags">${(m.tags || '').split(',').map(t => `<span class="writeup-machine-tag">#${t.trim()}</span>`).join('')}</div>
            <div class="writeup-machine-stats"><span>👁️ ${m.views}</span><span>👍 ${m.likes}</span></div></div>`;
    });
    container.innerHTML = html || '<p>لا توجد رايت اب</p>';
}

function openMachineModal(id) {
    const m = machineWriteups.find(x => x.id === id);
    if (!m) return;
    m.views++;
    localStorage.setItem('machineWriteups', JSON.stringify(machineWriteups));
    const content = `<div><div><span>${m.platform}</span> | 📅 ${m.date}</div>
        <div class="writeup-machine-tags">${(m.tags || '').split(',').map(t => `<span class="writeup-machine-tag">#${t.trim()}</span>`).join('')}</div>
        ${m.commands ? `<div style="background:#0a0c0f;padding:15px;border-radius:10px;margin:15px 0;"><h4>💻 الأوامر</h4>${m.commands.split('\n').map(c => `<div>$ ${c}</div>`).join('')}</div>` : ''}
        <div style="background:rgba(0,255,0,0.05);padding:20px;border-radius:15px;"><h3>📝 الشرح الكامل</h3><p>${m.walkthrough?.replace(/\n/g, '<br>') || ''}</p></div></div>`;
    showModal(m.name, content);
}

function displayCertificatesAdmin() {
    const container = document.getElementById('certificatesList');
    if (!container) return;
    let html = '';
    certificates.forEach(cert => {
        html += `<div style="background:rgba(15,20,25,0.8);border-radius:15px;padding:15px;margin-bottom:15px;"><div style="display:flex;justify-content:space-between;"><div><strong>${cert.name}</strong><br><small>${cert.issuer}</small></div><div><button class="edit-btn" onclick="deleteCertificate(${cert.id})" style="background:var(--accent-red);">🗑️</button></div></div><p>${cert.description?.substring(0, 100) || ''}...</p></div>`;
    });
    container.innerHTML = html || '<p>لا توجد شهادات</p>';
}

function displayProjectsAdmin() {
    const container = document.getElementById('projectsList');
    if (!container) return;
    let html = '';
    projects.forEach(proj => {
        html += `<div style="background:rgba(15,20,25,0.8);border-radius:15px;padding:15px;margin-bottom:15px;"><div style="display:flex;justify-content:space-between;"><div><strong>${proj.name}</strong><br><small>${proj.category}</small></div><div><button class="edit-btn" onclick="deleteProject(${proj.id})" style="background:var(--accent-red);">🗑️</button></div></div><p>${proj.description?.substring(0, 100) || ''}...</p></div>`;
    });
    container.innerHTML = html || '<p>لا توجد مشاريع</p>';
}

function displayMachinesAdmin() {
    const container = document.getElementById('machinesList');
    if (!container) return;
    let html = '';
    machineWriteups.forEach(m => {
        html += `<div style="background:rgba(15,20,25,0.8);border-radius:15px;padding:15px;margin-bottom:15px;"><div style="display:flex;justify-content:space-between;"><div><strong>${m.name}</strong><br><small>${m.platform}</small></div><div><button class="edit-btn" onclick="deleteMachine(${m.id})" style="background:var(--accent-red);">🗑️</button></div></div><p>${m.description?.substring(0, 100) || ''}...</p></div>`;
    });
    container.innerHTML = html || '<p>لا توجد رايت اب</p>';
}

function displayPlatformStats() {
    const container = document.getElementById('platformStatsContainer');
    if (!container) return;
    const platforms = [
        { id: 'hackthebox', name: 'HackTheBox', icon: '🐧' }, { id: 'tryhackme', name: 'TryHackMe', icon: '🎯' },
        { id: 'portswigger', name: 'PortSwigger', icon: '🔍' }, { id: 'vulnhub', name: 'VulnHub', icon: '💀' },
        { id: 'pentesterlab', name: 'PentesterLab', icon: '🧪' }
    ];
    let html = '';
    platforms.forEach(p => { html += `<div class="stat-card"><div class="stat-platform-icon">${p.icon}</div><div class="stat-platform-name">${p.name}</div><div class="stat-count">${platformStats[p.id] || 0}</div><div class="stat-label">ماكينة محلولة</div></div>`; });
    const total = Object.values(platformStats).reduce((a, b) => a + b, 0);
    html += `<div class="stat-card"><div class="stat-platform-icon">📊</div><div class="stat-platform-name">Total</div><div class="stat-count">${total}</div><div class="stat-label">إجمالي الماكينات</div></div>`;
    container.innerHTML = html;
}

function loadPlatformStatsEditor() {
    const container = document.getElementById('platformStatsEditor');
    if (!container) return;
    const platforms = ['hackthebox', 'tryhackme', 'portswigger', 'vulnhub', 'pentesterlab'];
    let html = '';
    platforms.forEach(p => { html += `<div class="platform-stat-editor"><span>${p}</span><input type="number" id="stat_${p}" value="${platformStats[p] || 0}" min="0"></div>`; });
    container.innerHTML = html;
}

function savePlatformStats() {
    if (!isAdmin) return;
    const platforms = ['hackthebox', 'tryhackme', 'portswigger', 'vulnhub', 'pentesterlab'];
    platforms.forEach(p => { platformStats[p] = parseInt(document.getElementById(`stat_${p}`)?.value) || 0; });
    localStorage.setItem('platformStats', JSON.stringify(platformStats));
    displayPlatformStats();
    alert('✅ تم حفظ الإحصائيات');
}

function addCertificate() {
    if (!isAdmin) return;
    const name = document.getElementById('certName')?.value;
    const issuer = document.getElementById('certIssuer')?.value;
    const date = document.getElementById('certDate')?.value;
    const link = document.getElementById('certLink')?.value;
    const desc = document.getElementById('certDesc')?.value;
    if (!name || !issuer) { alert('❌ أدخل اسم الشهادة والجهة'); return; }
    certificates.push({ id: Date.now(), name, issuer, date: date || new Date().getFullYear().toString(), link: link || '', description: desc || '' });
    localStorage.setItem('certificates', JSON.stringify(certificates));
    displayCertificatesAdmin(); displayCertificatesPublic();
    alert('✅ تم إضافة الشهادة');
}

function deleteCertificate(id) {
    if (!isAdmin) return;
    if (confirm('⚠️ هل أنت متأكد؟')) {
        certificates = certificates.filter(c => c.id !== id);
        localStorage.setItem('certificates', JSON.stringify(certificates));
        displayCertificatesAdmin(); displayCertificatesPublic();
        alert('✅ تم حذف الشهادة');
    }
}

function addProject() {
    if (!isAdmin) return;
    const name = document.getElementById('projectName')?.value;
    const category = document.getElementById('projectCategory')?.value;
    const date = document.getElementById('projectDate')?.value;
    const desc = document.getElementById('projectDesc')?.value;
    const tech = document.getElementById('projectTech')?.value;
    const github = document.getElementById('projectGithub')?.value;
    if (!name || !category) { alert('❌ أدخل اسم المشروع والتصنيف'); return; }
    projects.push({ id: Date.now(), name, category, date: date || new Date().getFullYear().toString(), description: desc || '', technologies: tech || '', github: github || '' });
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjectsAdmin(); displayProjectsPublic();
    alert('✅ تم إضافة المشروع');
}

function deleteProject(id) {
    if (!isAdmin) return;
    if (confirm('⚠️ هل أنت متأكد؟')) {
        projects = projects.filter(p => p.id !== id);
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjectsAdmin(); displayProjectsPublic();
        alert('✅ تم حذف المشروع');
    }
}

function addMachineWriteup() {
    if (!isAdmin) return;
    const name = document.getElementById('machineName')?.value;
    const platform = document.getElementById('machinePlatform')?.value;
    const difficulty = document.getElementById('machineDifficulty')?.value;
    const date = document.getElementById('machineDate')?.value;
    const desc = document.getElementById('machineDesc')?.value;
    const tags = document.getElementById('machineTags')?.value;
    const commands = document.getElementById('machineCommands')?.value;
    const walkthrough = document.getElementById('machineWalkthrough')?.value;
    if (!name || !platform || !desc) { alert('❌ املأ الحقول المطلوبة'); return; }
    machineWriteups.push({ id: Date.now(), name, platform, difficulty, date: date || new Date().toISOString().split('T')[0], description: desc, tags: tags || '', commands: commands || '', walkthrough: walkthrough || '', likes: 0, views: 0 });
    localStorage.setItem('machineWriteups', JSON.stringify(machineWriteups));
    displayMachinesAdmin(); displayMachineWriteups();
    alert('✅ تم إضافة رايت اب');
}

function deleteMachine(id) {
    if (!isAdmin) return;
    if (confirm('⚠️ هل أنت متأكد؟')) {
        machineWriteups = machineWriteups.filter(m => m.id !== id);
        localStorage.setItem('machineWriteups', JSON.stringify(machineWriteups));
        displayMachinesAdmin(); displayMachineWriteups();
        alert('✅ تم حذف الرايت اب');
    }
}

function showModal(title, content) {
    let modal = document.getElementById('globalModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'globalModal';
        modal.className = 'modal';
        modal.innerHTML = `<div class="modal-content" style="max-width:900px;max-height:90vh;overflow-y:auto;padding:30px;"><span class="close-modal" onclick="this.parentElement.parentElement.classList.remove('active')">&times;</span><h2 id="modalTitle" style="color:var(--accent-cyan);margin-bottom:20px;"></h2><div id="modalContent"></div></div>`;
        document.body.appendChild(modal);
    }
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// تحديث دالة switchAdminTab لدعم التبويبات الجديدة
const originalSwitch = switchAdminTab;
switchAdminTab = function(tab) {
    originalSwitch(tab);
    if (tab === 'certs') { displayCertificatesAdmin(); }
    if (tab === 'projects') { displayProjectsAdmin(); }
    if (tab === 'machines') { displayMachinesAdmin(); }
    if (tab === 'stats') { loadPlatformStatsEditor(); }
}

// تحديث دالة setLang لدعم الترجمة الجديدة
const originalSetLang = setLang;
setLang = function(lang) {
    originalSetLang(lang);
    displayCertificatesPublic();
    displayProjectsPublic();
    displayMachineWriteups();
    displayPlatformStats();
}

// تحديث window.onload لعرض البيانات الجديدة
const originalOnload = window.onload;
window.onload = async function() {
    if (originalOnload) await originalOnload();
    displayCertificatesPublic();
    displayProjectsPublic();
    displayMachineWriteups();
    displayPlatformStats();
    if (isAdmin) {
        displayCertificatesAdmin();
        displayProjectsAdmin();
        displayMachinesAdmin();
        loadPlatformStatsEditor();
    }
}
