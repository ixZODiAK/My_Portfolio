// ========== الباسوورد ==========
const ADMIN_PASSWORD = "zodiak##**@@";
let isAdmin = false;
let currentLang = 'ar';
let editingCertId = null;
let editingProjectId = null;
let editingMachineId = null;
let editingBlogId = null;
let stepCounter = 0;
let blogMediaList = [];

// ========== JSONBin.io Configuration (المصدر الأساسي) ==========
const JSONBIN_CONFIG = {
    binId: '69a2f38d43b1c97be9a68c0c',
    masterKey: '$2a$10$p/Egp26o3AWMuQUWxlxbFunqeANPB7Z2mDO5h5iMKs5Y6tv9vj2Cq',
    accessKey: '$2a$10$bfl5.GzXd95qCu5CucKgDOSo6sNSY9L4Zxr2pf51sQ/YLN7Jx9BuC'
};

// ========== البيانات الأساسية ==========
let certificates = [];
let projects = [];
let platformStats = { hackthebox: 0, tryhackme: 0, portswigger: 0, vulnhub: 0, pentesterlab: 0 };
let machineWriteups = [];
let blogPosts = [];

// ========== مؤشر تحميل ==========
function showLoading(show) {
    let loader = document.getElementById('loadingIndicator');
    if (!loader && show) {
        loader = document.createElement('div');
        loader.id = 'loadingIndicator';
        loader.innerHTML = '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-secondary); padding: 20px; border-radius: 15px; border: 2px solid var(--accent-cyan); z-index: 10001;">⏳ جاري التحميل...</div>';
        document.body.appendChild(loader);
    }
    if (loader) loader.style.display = show ? 'flex' : 'none';
}

// ========== تحميل البيانات من السحابة (المصدر الأساسي) ==========
async function loadAllData() {
    showLoading(true);
    console.log('🔄 جاري تحميل البيانات من السحابة...');
    
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.binId}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': JSONBIN_CONFIG.masterKey,
                'X-Access-Key': JSONBIN_CONFIG.accessKey
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.record && data.record.certificates) {
                // تحميل البيانات من السحابة
                certificates = data.record.certificates || [];
                projects = data.record.projects || [];
                platformStats = data.record.platformStats || { hackthebox: 0, tryhackme: 0, portswigger: 0, vulnhub: 0, pentesterlab: 0 };
                machineWriteups = data.record.machineWriteups || [];
                blogPosts = data.record.blogPosts || [];
                
                // حفظ نسخة في localStorage كاحتياطي
                saveToLocalStorage();
                
                console.log(`✅ تم تحميل البيانات من السحابة: ${certificates.length} شهادة, ${projects.length} مشروع, ${machineWriteups.length} رايت اب`);
            } else {
                // أول مرة - مفيش بيانات في السحابة
                console.log('📭 لا توجد بيانات في السحابة، جاري إنشاء بيانات تجريبية...');
                initDefaultData();
                await saveAllData(); // حفظ البيانات في السحابة
            }
        } else {
            console.log('⚠️ فشل الاتصال بالسحابة، جاري التحميل من localStorage...');
            loadFromLocalStorage();
        }
    } catch (error) {
        console.error('❌ خطأ في الاتصال بالسحابة:', error);
        loadFromLocalStorage();
    }
    
    // تحديث العرض
    refreshDisplay();
    showLoading(false);
}

// ========== حفظ البيانات في السحابة ==========
async function saveAllData() {
    console.log('💾 جاري حفظ البيانات في السحابة...');
    showLoading(true);
    
    try {
        const allData = {
            certificates: certificates,
            projects: projects,
            platformStats: platformStats,
            machineWriteups: machineWriteups,
            blogPosts: blogPosts,
            lastUpdated: new Date().toISOString(),
            updatedBy: isAdmin ? 'Admin' : 'System'
        };
        
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_CONFIG.masterKey,
                'X-Access-Key': JSONBIN_CONFIG.accessKey
            },
            body: JSON.stringify(allData)
        });
        
        if (response.ok) {
            console.log('✅ تم حفظ البيانات في السحابة بنجاح');
            saveToLocalStorage(); // تحديث النسخة المحلية
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.error('❌ فشل الحفظ في السحابة:', error);
        alert('⚠️ فشل الاتصال بالسحابة، تم الحفظ محلياً فقط. سيتم المحاولة مرة أخرى لاحقاً.');
        saveToLocalStorage(); // حفظ محلي على الأقل
    } finally {
        showLoading(false);
    }
}

// ========== حفظ في localStorage (نسخة احتياطية) ==========
function saveToLocalStorage() {
    localStorage.setItem('pentester_certificates', JSON.stringify(certificates));
    localStorage.setItem('pentester_projects', JSON.stringify(projects));
    localStorage.setItem('pentester_platform_stats', JSON.stringify(platformStats));
    localStorage.setItem('pentester_machine_writeups', JSON.stringify(machineWriteups));
    localStorage.setItem('pentester_blog_posts', JSON.stringify(blogPosts));
    console.log('📁 تم الحفظ في localStorage');
}

// ========== تحميل من localStorage (نسخة احتياطية) ==========
function loadFromLocalStorage() {
    console.log('📁 جاري التحميل من localStorage...');
    
    const savedCerts = localStorage.getItem('pentester_certificates');
    const savedProjects = localStorage.getItem('pentester_projects');
    const savedStats = localStorage.getItem('pentester_platform_stats');
    const savedMachines = localStorage.getItem('pentester_machine_writeups');
    const savedBlogs = localStorage.getItem('pentester_blog_posts');
    
    certificates = savedCerts ? JSON.parse(savedCerts) : [];
    projects = savedProjects ? JSON.parse(savedProjects) : [];
    platformStats = savedStats ? JSON.parse(savedStats) : { hackthebox: 0, tryhackme: 0, portswigger: 0, vulnhub: 0, pentesterlab: 0 };
    machineWriteups = savedMachines ? JSON.parse(savedMachines) : [];
    blogPosts = savedBlogs ? JSON.parse(savedBlogs) : [];
    
    // لو مفيش بيانات خالص، نضيف بيانات تجريبية
    if (certificates.length === 0 && projects.length === 0 && machineWriteups.length === 0) {
        initDefaultData();
    }
}

// ========== بيانات تجريبية افتراضية ==========
function initDefaultData() {
    certificates = [
        { id: 1, name: "OSCP", issuer: "Offensive Security", date: "2024", link: "https://www.offsec.com", desc: "شهادة OSCP المهنية - اختبار الاختراق العملي", skills: "Linux,Windows,PrivEsc", imageData: "" },
        { id: 2, name: "CEH Master", issuer: "EC-Council", date: "2024", link: "https://www.eccouncil.org", desc: "شهادة الهاكر الأخلاقي المعتمد", skills: "Network,Security,Footprinting", imageData: "" },
        { id: 3, name: "CRTP", issuer: "Pentester Academy", date: "2024", link: "https://www.pentesteracademy.com", desc: "شهادة اختبار اختراق Active Directory", skills: "AD,Kerberos,PrivEsc", imageData: "" }
    ];
    
    projects = [
        { id: 1, name: "Vulnerable Web Lab", category: "Web Security", date: "2024", desc: "مختبر ويب ضعيف لتعليم ثغرات OWASP Top 10", tech: "JavaScript,Node.js,Express", github: "https://github.com/ixZODiAK/vulnerable-lab", imageData: "", status: "completed", features: "15 تحدياً أمنياً\nواجهة تفاعلية\nشرح مفصل" },
        { id: 2, name: "Auto Pentest Toolkit", category: "Automation", date: "2024", desc: "أدوات آلية لأتمتة اختبارات الاختراق", tech: "Python,Bash,Nmap,Metasploit", github: "https://github.com/ixZODiAK/auto-pentest", imageData: "", status: "in-progress", features: "جمع معلومات تلقائي\nفحص ثغرات\nتوليد تقارير PDF" }
    ];
    
    platformStats = { hackthebox: 45, tryhackme: 62, portswigger: 38, vulnhub: 25, pentesterlab: 20 };
    
    machineWriteups = [
        { id: 1, name: "Lame", platform: "HackTheBox", difficulty: "easy", date: "2024-01-15", desc: "اختراق جهاز Lame باستخدام ثغرة Samba", tags: "Samba,Linux,CVE-2007-2447", commands: "nmap -sV -sC 10.10.10.3\nsearchsploit samba 3.0.20\nmsfconsole -q -x 'use exploit/multi/samba/usermap_script; set RHOST 10.10.10.3; exploit'", walkthrough: "الشرح الكامل لاختراق جهاز Lame...", steps: [], likes: 42, views: 245 },
        { id: 2, name: "Blue", platform: "HackTheBox", difficulty: "easy", date: "2024-01-10", desc: "اختراق جهاز Blue باستخدام ثغرة EternalBlue", tags: "Windows,EternalBlue,MS17-010", commands: "nmap -p445 --script smb-vuln-ms17-010 10.10.10.40\nmsfconsole -q -x 'use exploit/windows/smb/ms17_010_eternalblue; set RHOST 10.10.10.40; exploit'", walkthrough: "الشرح الكامل لاختراق Blue...", steps: [], likes: 67, views: 412 }
    ];
    
    blogPosts = [
        { id: 100, title: "شرح ثغرة SQL Injection", platform: "Blog", date: "2024-01-20", content: "شرح كامل لثغرة SQL Injection وكيفية استغلالها والوقاية منها...", tags: "SQLi,Web Security", views: 150, likes: 25, media: [] }
    ];
}

// ========== تحديث واجهة العرض ==========
function refreshDisplay() {
    displayCertificatesAdmin();
    displayCertificatesPublic();
    displayProjectsAdmin();
    displayProjectsPublic();
    displayPlatformStats();
    displayMachineWriteups();
    displayBlogPosts();
}

// ========== دوال مساعدة ==========
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function previewAndSaveImage(fileInput, previewId, hiddenInputId) {
    const file = fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('❌ اختر ملف صورة فقط'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('❌ الصورة كبيرة جداً (الحد 5 ميجا)'); return; }
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById(hiddenInputId).value = e.target.result;
        document.getElementById(previewId).innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 150px; border-radius: 10px; border: 2px solid var(--accent-cyan);">`;
    };
    reader.readAsDataURL(file);
}

// ==================== إدارة الشهادات ====================
function displayCertificatesAdmin() {
    const container = document.getElementById('certificatesList');
    if (!container) return;
    if (!certificates.length) { container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">لا توجد شهادات</p>'; return; }
    
    let html = '';
    certificates.forEach(cert => {
        html += `
            <div class="cert-admin-card" style="background: rgba(15,20,25,0.8); border-radius: 15px; padding: 15px; margin-bottom: 15px; border: 1px solid var(--accent-purple);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div><strong style="color: var(--accent-cyan);">${escapeHtml(cert.name)}</strong><br><small>${escapeHtml(cert.issuer)} | ${cert.date}</small></div>
                    <div>
                        <button class="edit-btn" onclick="editCertificate(${cert.id})" style="background: var(--accent-yellow); color: black; border: none; padding: 5px 12px; border-radius: 8px; cursor: pointer;">✏️ تعديل</button>
                        <button class="delete-btn" onclick="deleteCertificate(${cert.id})" style="background: var(--accent-red); color: white; border: none; padding: 5px 12px; border-radius: 8px; cursor: pointer;">🗑️ حذف</button>
                    </div>
                </div>
                ${cert.imageData ? `<img src="${cert.imageData}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; margin-top: 10px;">` : '<div style="width: 80px; height: 80px; background: var(--accent-purple); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-top: 10px;">🏆</div>'}
                <p style="margin-top: 10px; font-size: 0.8rem;">${escapeHtml(cert.desc?.substring(0, 100) || '')}...</p>
            </div>
        `;
    });
    container.innerHTML = html;
}

function displayCertificatesPublic() {
    const container = document.getElementById('certificatesDisplayGrid');
    if (!container) return;
    if (!certificates.length) { container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">لا توجد شهادات</p>'; return; }
    
    let html = '';
    certificates.forEach(cert => {
        html += `
            <div class="cert-card" onclick="window.open('${cert.link || '#'}', '_blank')" style="cursor: pointer;">
                ${cert.imageData ? `<img src="${cert.imageData}">` : '<div style="height: 180px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; font-size: 3rem;">🏆</div>'}
                <div class="cert-info">
                    <div class="cert-name">${escapeHtml(cert.name)}</div>
                    <div class="cert-issuer">${escapeHtml(cert.issuer)} | ${cert.date}</div>
                    <p style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 5px;">${escapeHtml(cert.desc?.substring(0, 80) || '')}...</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function addCertificate() {
    if (!isAdmin) { alert('❌ يجب تسجيل الدخول كأدمن'); return; }
    
    const name = document.getElementById('certName')?.value;
    const issuer = document.getElementById('certIssuer')?.value;
    const date = document.getElementById('certDate')?.value;
    const link = document.getElementById('certLink')?.value;
    const desc = document.getElementById('certDesc')?.value;
    const skills = document.getElementById('certSkills')?.value;
    const imageData = document.getElementById('certImageData')?.value;
    
    if (!name || !issuer) { alert('❌ أدخل اسم الشهادة والجهة المانحة'); return; }
    
    const newCert = { id: Date.now(), name, issuer, date: date || new Date().getFullYear().toString(), link: link || '', desc: desc || '', skills: skills || '', imageData: imageData || '' };
    certificates.push(newCert);
    await saveAllData();  // حفظ في السحابة
    
    // تفريغ الحقول
    document.getElementById('certName').value = '';
    document.getElementById('certIssuer').value = '';
    document.getElementById('certDate').value = '';
    document.getElementById('certLink').value = '';
    document.getElementById('certDesc').value = '';
    document.getElementById('certSkills').value = '';
    document.getElementById('certImageData').value = '';
    document.getElementById('certImagePreview').innerHTML = '';
    document.getElementById('certImageInput').value = '';
    
    refreshDisplay();
    alert('✅ تم إضافة الشهادة (محفوظة في السحابة للجميع)');
}

function editCertificate(id) {
    const cert = certificates.find(c => c.id === id);
    if (!cert) return;
    
    editingCertId = id;
    document.getElementById('certName').value = cert.name;
    document.getElementById('certIssuer').value = cert.issuer;
    document.getElementById('certDate').value = cert.date;
    document.getElementById('certLink').value = cert.link || '';
    document.getElementById('certDesc').value = cert.desc || '';
    document.getElementById('certSkills').value = cert.skills || '';
    if (cert.imageData) {
        document.getElementById('certImagePreview').innerHTML = `<img src="${cert.imageData}" style="max-width: 200px; border-radius: 10px;">`;
        document.getElementById('certImageData').value = cert.imageData;
    }
    
    const addBtn = document.querySelector('#certsForm .admin-tab[onclick="addCertificate()"]');
    if (addBtn) {
        addBtn.textContent = '🔄 تحديث الشهادة';
        addBtn.setAttribute('onclick', 'updateCertificate()');
        addBtn.style.background = 'var(--accent-yellow)';
    }
    alert(`✏️ تعديل شهادة: ${cert.name}`);
}

async function updateCertificate() {
    if (!isAdmin || !editingCertId) return;
    const index = certificates.findIndex(c => c.id === editingCertId);
    if (index === -1) return;
    
    certificates[index].name = document.getElementById('certName')?.value || certificates[index].name;
    certificates[index].issuer = document.getElementById('certIssuer')?.value || certificates[index].issuer;
    certificates[index].date = document.getElementById('certDate')?.value || certificates[index].date;
    certificates[index].link = document.getElementById('certLink')?.value || '';
    certificates[index].desc = document.getElementById('certDesc')?.value || '';
    certificates[index].skills = document.getElementById('certSkills')?.value || '';
    certificates[index].imageData = document.getElementById('certImageData')?.value || '';
    
    await saveAllData();
    
    const updateBtn = document.querySelector('#certsForm .admin-tab[onclick="updateCertificate()"]');
    if (updateBtn) {
        updateBtn.textContent = '✅ إضافة شهادة';
        updateBtn.setAttribute('onclick', 'addCertificate()');
        updateBtn.style.background = 'var(--accent-green)';
    }
    
    document.getElementById('certName').value = '';
    document.getElementById('certIssuer').value = '';
    document.getElementById('certDate').value = '';
    document.getElementById('certLink').value = '';
    document.getElementById('certDesc').value = '';
    document.getElementById('certSkills').value = '';
    document.getElementById('certImageData').value = '';
    document.getElementById('certImagePreview').innerHTML = '';
    document.getElementById('certImageInput').value = '';
    
    editingCertId = null;
    refreshDisplay();
    alert('✅ تم تحديث الشهادة (محفوظة في السحابة)');
}

async function deleteCertificate(id) {
    if (!isAdmin) return;
    if (confirm('⚠️ هل أنت متأكد من حذف هذه الشهادة؟')) {
        certificates = certificates.filter(c => c.id !== id);
        await saveAllData();
        refreshDisplay();
        alert('✅ تم حذف الشهادة');
    }
}

// ==================== إدارة المشاريع ====================
function displayProjectsAdmin() {
    const container = document.getElementById('projectsList');
    if (!container) return;
    if (!projects.length) { container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">لا توجد مشاريع</p>'; return; }
    
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="project-admin-card" style="background: rgba(15,20,25,0.8); border-radius: 15px; padding: 15px; margin-bottom: 15px; border: 1px solid var(--accent-green);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div><strong style="color: var(--accent-cyan);">${escapeHtml(project.name)}</strong><br><small>${escapeHtml(project.category)}</small></div>
                    <div>
                        <button class="edit-btn" onclick="editProject(${project.id})" style="background: var(--accent-yellow); color: black; border: none; padding: 5px 12px; border-radius: 8px; cursor: pointer;">✏️ تعديل</button>
                        <button class="delete-btn" onclick="deleteProject(${project.id})" style="background: var(--accent-red); color: white; border: none; padding: 5px 12px; border-radius: 8px; cursor: pointer;">🗑️ حذف</button>
                    </div>
                </div>
                ${project.imageData ? `<img src="${project.imageData}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; margin-top: 10px;">` : '<div style="width: 80px; height: 80px; background: var(--accent-green); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-top: 10px;">📁</div>'}
                <p style="margin-top: 10px; font-size: 0.8rem;">${escapeHtml(project.desc?.substring(0, 100) || '')}...</p>
            </div>
        `;
    });
    container.innerHTML = html;
}

function displayProjectsPublic() {
    const container = document.getElementById('projectsDisplayGrid');
    if (!container) return;
    if (!projects.length) { container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">لا توجد مشاريع</p>'; return; }
    
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="project-card" style="cursor: pointer;" onclick="if('${project.github}') window.open('${project.github}', '_blank')">
                ${project.imageData ? `<img src="${project.imageData}">` : '<div style="height: 180px; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; font-size: 3rem;">📁</div>'}
                <div class="project-info">
                    <div class="project-name">${escapeHtml(project.name)}</div>
                    <div class="project-category">📂 ${escapeHtml(project.category)} | 📅 ${project.date}</div>
                    <p style="color: var(--text-secondary); font-size: 0.8rem; margin: 10px 0;">${escapeHtml(project.desc?.substring(0, 80) || '')}...</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px;">${project.tech?.split(',').map(t => `<span class="admin-badge">${escapeHtml(t.trim())}</span>`).join('') || ''}</div>
                    ${project.github ? `<a href="${project.github}" target="_blank" style="color: var(--accent-cyan); font-size: 0.8rem; display: inline-block; margin-top: 10px;" onclick="event.stopPropagation();">🔗 GitHub</a>` : ''}
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function addProject() {
    if (!isAdmin) { alert('❌ يجب تسجيل الدخول كأدمن'); return; }
    
    const name = document.getElementById('projectName')?.value;
    const category = document.getElementById('projectCategory')?.value;
    const date = document.getElementById('projectDate')?.value;
    const desc = document.getElementById('projectDesc')?.value;
    const tech = document.getElementById('projectTech')?.value;
    const github = document.getElementById('projectGithub')?.value;
    const status = document.getElementById('projectStatus')?.value;
    const features = document.getElementById('projectFeatures')?.value;
    const imageData = document.getElementById('projectImageData')?.value;
    
    if (!name || !category) { alert('❌ أدخل اسم المشروع والتصنيف'); return; }
    
    const newProject = { id: Date.now(), name, category, date: date || new Date().getFullYear().toString(), desc: desc || '', tech: tech || '', github: github || '', status: status || 'in-progress', features: features || '', imageData: imageData || '' };
    projects.push(newProject);
    await saveAllData();
    
    document.getElementById('projectName').value = '';
    document.getElementById('projectCategory').value = '';
    document.getElementById('projectDate').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectTech').value = '';
    document.getElementById('projectGithub').value = '';
    document.getElementById('projectFeatures').value = '';
    document.getElementById('projectImageData').value = '';
    document.getElementById('projectImagePreview').innerHTML = '';
    document.getElementById('projectImageInput').value = '';
    
    refreshDisplay();
    alert('✅ تم إضافة المشروع (محفوظ في السحابة للجميع)');
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    editingProjectId = id;
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectDate').value = project.date;
    document.getElementById('projectDesc').value = project.desc || '';
    document.getElementById('projectTech').value = project.tech || '';
    document.getElementById('projectGithub').value = project.github || '';
    document.getElementById('projectStatus').value = project.status || 'in-progress';
    document.getElementById('projectFeatures').value = project.features || '';
    if (project.imageData) {
        document.getElementById('projectImagePreview').innerHTML = `<img src="${project.imageData}" style="max-width: 200px; border-radius: 10px;">`;
        document.getElementById('projectImageData').value = project.imageData;
    }
    
    const addBtn = document.querySelector('#projectsForm .admin-tab[onclick="addProject()"]');
    if (addBtn) {
        addBtn.textContent = '🔄 تحديث المشروع';
        addBtn.setAttribute('onclick', 'updateProject()');
        addBtn.style.background = 'var(--accent-yellow)';
    }
    alert(`✏️ تعديل مشروع: ${project.name}`);
}

async function updateProject() {
    if (!isAdmin || !editingProjectId) return;
    const index = projects.findIndex(p => p.id === editingProjectId);
    if (index === -1) return;
    
    projects[index].name = document.getElementById('projectName')?.value || projects[index].name;
    projects[index].category = document.getElementById('projectCategory')?.value || projects[index].category;
    projects[index].date = document.getElementById('projectDate')?.value || projects[index].date;
    projects[index].desc = document.getElementById('projectDesc')?.value || '';
    projects[index].tech = document.getElementById('projectTech')?.value || '';
    projects[index].github = document.getElementById('projectGithub')?.value || '';
    projects[index].status = document.getElementById('projectStatus')?.value || 'in-progress';
    projects[index].features = document.getElementById('projectFeatures')?.value || '';
    projects[index].imageData = document.getElementById('projectImageData')?.value || '';
    
    await saveAllData();
    
    const updateBtn = document.querySelector('#projectsForm .admin-tab[onclick="updateProject()"]');
    if (updateBtn) {
        updateBtn.textContent = '✅ إضافة مشروع';
        updateBtn.setAttribute('onclick', 'addProject()');
        updateBtn.style.background = 'var(--accent-green)';
    }
    
    document.getElementById('projectName').value = '';
    document.getElementById('projectCategory').value = '';
    document.getElementById('projectDate').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectTech').value = '';
    document.getElementById('projectGithub').value = '';
    document.getElementById('projectFeatures').value = '';
    document.getElementById('projectImageData').value = '';
    document.getElementById('projectImagePreview').innerHTML = '';
    document.getElementById('projectImageInput').value = '';
    
    editingProjectId = null;
    refreshDisplay();
    alert('✅ تم تحديث المشروع (محفوظ في السحابة)');
}

async function deleteProject(id) {
    if (!isAdmin) return;
    if (confirm('⚠️ هل أنت متأكد من حذف هذا المشروع؟')) {
        projects = projects.filter(p => p.id !== id);
        await saveAllData();
        refreshDisplay();
        alert('✅ تم حذف المشروع');
    }
}

// ==================== إدارة رايت اب الماكينات ====================
function addStepField() {
    const container = document.getElementById('stepsContainer');
    if (!container) return;
    const stepId = stepCounter++;
    const stepHtml = `
        <div class="step-card" id="step_${stepId}" style="background: rgba(0,0,0,0.3); border-radius: 15px; padding: 15px; margin-bottom: 15px; border-right: 3px solid var(--accent-green);">
            <input type="text" class="admin-input" id="stepTitle_${stepId}" placeholder="عنوان الخطوة">
            <textarea class="admin-input" id="stepDesc_${stepId}" placeholder="وصف الخطوة" rows="2"></textarea>
            <div class="upload-area" style="padding: 10px; border: 1px dashed var(--accent-cyan); border-radius: 10px; text-align: center; cursor: pointer; margin: 10px 0;" onclick="document.getElementById('stepImage_${stepId}').click()">
                📸 رفع صورة/فيديو
                <input type="file" id="stepImage_${stepId}" accept="image/*,video/*" style="display: none;" onchange="previewStepMedia(this, ${stepId})">
            </div>
            <input type="hidden" id="stepMediaData_${stepId}">
            <div id="stepPreview_${stepId}" style="margin-top: 10px;"></div>
            <input type="text" class="admin-input" id="stepCommand_${stepId}" placeholder="الأمر المستخدم">
            <button type="button" class="delete-btn" onclick="document.getElementById('step_${stepId}').remove()" style="margin-top: 10px;">🗑️ حذف الخطوة</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', stepHtml);
}

function previewStepMedia(input, stepId) {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('❌ الملف كبير جداً'); return; }
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById(`stepMediaData_${stepId}`).value = e.target.result;
        const previewDiv = document.getElementById(`stepPreview_${stepId}`);
        if (file.type.startsWith('image/')) {
            previewDiv.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 150px; border-radius: 10px;">`;
        } else {
            previewDiv.innerHTML = `<video src="${e.target.result}" controls style="max-width: 100%; max-height: 150px; border-radius: 10px;"></video>`;
        }
    };
    reader.readAsDataURL(file);
}

function displayMachineWriteups() {
    const container = document.getElementById('machineWriteupsGrid');
    if (!container) return;
    if (!machineWriteups.length) { container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">لا توجد رايت اب</p>'; return; }
    
    let html = '';
    machineWriteups.forEach(machine => {
        const diffClass = `difficulty-${machine.difficulty}`;
        const diffText = { easy: 'سهل', medium: 'متوسط', hard: 'صعب', insane: 'جنوني' }[machine.difficulty] || machine.difficulty;
        html += `
            <div class="writeup-machine-card" onclick="openMachineWalkthrough(${machine.id})">
                <div class="writeup-machine-header">
                    <span class="writeup-machine-name">${escapeHtml(machine.name)}</span>
                    <div><span class="writeup-machine-platform">${escapeHtml(machine.platform)}</span><span class="writeup-machine-difficulty ${diffClass}">${diffText}</span></div>
                </div>
                <div class="writeup-machine-date">📅 ${machine.date}</div>
                <div class="writeup-machine-desc">${escapeHtml(machine.desc?.substring(0, 100) || '')}...</div>
                <div class="writeup-machine-tags">${machine.tags?.split(',').map(t => `<span class="writeup-machine-tag">#${escapeHtml(t.trim())}</span>`).join('') || ''}</div>
                <div class="writeup-machine-stats"><span class="stat">👁️ ${machine.views}</span><span class="stat">👍 ${machine.likes}</span></div>
                ${isAdmin ? `<div style="margin-top: 10px;"><button class="edit-btn" onclick="event.stopPropagation(); editMachineWriteup(${machine.id})" style="background: var(--accent-yellow);">✏️ تعديل</button> <button class="delete-btn" onclick="event.stopPropagation(); deleteMachineWriteup(${machine.id})" style="background: var(--accent-red);">🗑️ حذف</button></div>` : ''}
            </div>
        `;
    });
    container.innerHTML = html;
}

async function addMachineWriteup() {
    if (!isAdmin) { alert('❌ يجب تسجيل الدخول كأدمن'); return; }
    
    const name = document.getElementById('machineName')?.value;
    const platform = document.getElementById('machinePlatform')?.value;
    const difficulty = document.getElementById('machineDifficulty')?.value;
    const date = document.getElementById('machineDate')?.value;
    const desc = document.getElementById('machineDesc')?.value;
    const tags = document.getElementById('machineTags')?.value;
    const commands = document.getElementById('machineCommands')?.value;
    const walkthrough = document.getElementById('machineWalkthrough')?.value;
    
    if (!name || !platform || !desc) { alert('❌ املأ الحقول المطلوبة'); return; }
    
    const steps = [];
    for (let i = 0; i < stepCounter; i++) {
        const title = document.getElementById(`stepTitle_${i}`)?.value;
        const stepDesc = document.getElementById(`stepDesc_${i}`)?.value;
        const mediaData = document.getElementById(`stepMediaData_${i}`)?.value;
        const command = document.getElementById(`stepCommand_${i}`)?.value;
        if (title || stepDesc) steps.push({ title, desc: stepDesc, mediaData, command });
    }
    
    const newMachine = { id: Date.now(), name, platform, difficulty, date: date || new Date().toISOString().split('T')[0], desc, tags: tags || '', commands: commands || '', walkthrough: walkthrough || '', steps, likes: 0, views: 0 };
    machineWriteups.push(newMachine);
    await saveAllData();
    
    document.getElementById('machineName').value = '';
    document.getElementById('machineDesc').value = '';
    document.getElementById('machineTags').value = '';
    document.getElementById('machineCommands').value = '';
    document.getElementById('machineWalkthrough').value = '';
    document.getElementById('stepsContainer').innerHTML = '';
    stepCounter = 0;
    
    refreshDisplay();
    alert('✅ تم إضافة رايت اب (محفوظ في السحابة للجميع)');
}

function editMachineWriteup(id) {
    const machine = machineWriteups.find(m => m.id === id);
    if (!machine) return;
    
    editingMachineId = id;
    document.getElementById('machineName').value = machine.name;
    document.getElementById('machinePlatform').value = machine.platform;
    document.getElementById('machineDifficulty').value = machine.difficulty;
    document.getElementById('machineDate').value = machine.date;
    document.getElementById('machineDesc').value = machine.desc;
    document.getElementById('machineTags').value = machine.tags;
    document.getElementById('machineCommands').value = machine.commands;
    document.getElementById('machineWalkthrough').value = machine.walkthrough;
    
    const container = document.getElementById('stepsContainer');
    if (container) {
        container.innerHTML = '';
        stepCounter = 0;
        if (machine.steps && machine.steps.length) {
            machine.steps.forEach((step, idx) => {
                const stepId = stepCounter++;
                const stepHtml = `
                    <div class="step-card" id="step_${stepId}" style="background: rgba(0,0,0,0.3); border-radius: 15px; padding: 15px; margin-bottom: 15px; border-right: 3px solid var(--accent-green);">
                        <input type="text" class="admin-input" id="stepTitle_${stepId}" value="${escapeHtml(step.title || '')}" placeholder="عنوان الخطوة">
                        <textarea class="admin-input" id="stepDesc_${stepId}" placeholder="وصف الخطوة" rows="2">${escapeHtml(step.desc || '')}</textarea>
                        <div class="upload-area" style="padding: 10px; border: 1px dashed var(--accent-cyan); border-radius: 10px; text-align: center; cursor: pointer; margin: 10px 0;" onclick="document.getElementById('stepImage_${stepId}').click()">
                            📸 رفع صورة/فيديو
                            <input type="file" id="stepImage_${stepId}" accept="image/*,video/*" style="display: none;" onchange="previewStepMedia(this, ${stepId})">
                        </div>
                        <input type="hidden" id="stepMediaData_${stepId}" value="${step.mediaData || ''}">
                        <div id="stepPreview_${stepId}" style="margin-top: 10px;">${step.mediaData ? (step.mediaData.startsWith('data:image') ? `<img src="${step.mediaData}" style="max-width: 100%; max-height: 150px; border-radius: 10px;">` : `<video src="${step.mediaData}" controls style="max-width: 100%; max-height: 150px; border-radius: 10px;"></video>`) : ''}</div>
                        <input type="text" class="admin-input" id="stepCommand_${stepId}" value="${escapeHtml(step.command || '')}" placeholder="الأمر المستخدم">
                        <button type="button" class="delete-btn" onclick="document.getElementById('step_${stepId}').remove()" style="margin-top: 10px;">🗑️ حذف الخطوة</button>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', stepHtml);
            });
        }
    }
    
    const addBtn = document.querySelector('#machinesForm .admin-tab[onclick="addMachineWriteup()"]');
    if (addBtn) {
        addBtn.textContent = '🔄 تحديث رايت اب';
        addBtn.setAttribute('onclick', 'updateMachineWriteup()');
        addBtn.style.background = 'var(--accent-yellow)';
    }
    alert(`✏️ تعديل رايت اب: ${machine.name}`);
}

async function updateMachineWriteup() {
    if (!isAdmin || !editingMachineId) return;
    const index = machineWriteups.findIndex(m => m.id === editingMachineId);
    if (index === -1) return;
    
    const steps = [];
    for (let i = 0; i < stepCounter; i++) {
        const title = document.getElementById(`stepTitle_${i}`)?.value;
        const stepDesc = document.getElementById(`stepDesc_${i}`)?.value;
        const mediaData = document.getElementById(`stepMediaData_${i}`)?.value;
        const command = document.getElementById(`stepCommand_${i}`)?.value;
        if (title || stepDesc) steps.push({ title, desc: stepDesc, mediaData, command });
    }
    
    machineWriteups[index] = {
        ...machineWriteups[index],
        name: document.getElementById('machineName')?.value || machineWriteups[index].name,
        platform: document.getElementById('machinePlatform')?.value || machineWriteups[index].platform,
        difficulty: document.getElementById('machineDifficulty')?.value || machineWriteups[index].difficulty,
        date: document.getElementById('machineDate')?.value || machineWriteups[index].date,
        desc: document.getElementById('machineDesc')?.value || '',
        tags: document.getElementById('machineTags')?.value || '',
        commands: document.getElementById('machineCommands')?.value || '',
        walkthrough: document.getElementById('machineWalkthrough')?.value || '',
        steps: steps
    };
    
    await saveAllData();
    
    const updateBtn = document.querySelector('#machinesForm .admin-tab[onclick="updateMachineWriteup()"]');
    if (updateBtn) {
        updateBtn.textContent = '✅ إضافة رايت اب';
        updateBtn.setAttribute('onclick', 'addMachineWriteup()');
        updateBtn.style.background = 'var(--accent-green)';
    }
    
    document.getElementById('machineName').value = '';
    document.getElementById('machineDesc').value = '';
    document.getElementById('machineTags').value = '';
    document.getElementById('machineCommands').value = '';
    document.getElementById('machineWalkthrough').value = '';
    document.getElementById('stepsContainer').innerHTML = '';
    stepCounter = 0;
    editingMachineId = null;
    
    refreshDisplay();
    alert('✅ تم تحديث رايت اب (محفوظ في السحابة)');
}

async function deleteMachineWriteup(id) {
    if (!isAdmin) return;
    if (confirm('⚠️ هل أنت متأكد من حذف هذا الرايت اب؟')) {
        machineWriteups = machineWriteups.filter(m => m.id !== id);
        await saveAllData();
        refreshDisplay();
        alert('✅ تم حذف الرايت اب');
    }
}

function openMachineWalkthrough(id) {
    const machine = machineWriteups.find(m => m.id === id);
    if (!machine) return;
    machine.views++;
    saveAllData(); // لا نستخدم await عشان ما نأخرش فتح المودال
    
    let stepsHtml = '';
    if (machine.steps && machine.steps.length) {
        stepsHtml = '<div style="margin: 20px 0;"><h3 style="color: var(--accent-green);">📸 خطوات الاختراق</h3>';
        machine.steps.forEach(step => {
            stepsHtml += `
                <div style="background: rgba(0,255,0,0.05); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <h4 style="color: var(--accent-cyan);">${escapeHtml(step.title)}</h4>
                    <p>${escapeHtml(step.desc)}</p>
                    ${step.mediaData ? (step.mediaData.startsWith('data:image') ? `<img src="${step.mediaData}" style="max-width: 100%; border-radius: 10px; margin: 10px 0;">` : `<video src="${step.mediaData}" controls style="max-width: 100%; border-radius: 10px; margin: 10px 0;"></video>`) : ''}
                    ${step.command ? `<div style="background: #0a0c0f; padding: 10px; border-radius: 8px; font-family: monospace; margin-top: 10px;">$ ${escapeHtml(step.command)}</div>` : ''}
                </div>
            `;
        });
        stepsHtml += '</div>';
    }
    
    const modalContent = `
        <div>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;"><span class="writeup-machine-platform">${escapeHtml(machine.platform)}</span><span>📅 ${machine.date}</span></div>
            <div class="writeup-machine-tags">${machine.tags?.split(',').map(t => `<span class="writeup-machine-tag">#${escapeHtml(t.trim())}</span>`).join('') || ''}</div>
            ${machine.commands ? `<div style="background: #0a0c0f; padding: 15px; border-radius: 10px; margin: 15px 0;"><h4>💻 الأوامر</h4>${machine.commands.split('\n').map(c => `<div style="font-family: monospace;">$ ${escapeHtml(c)}</div>`).join('')}</div>` : ''}
            ${stepsHtml}
            <div style="background: rgba(0,255,255,0.02); padding: 20px; border-radius: 15px;"><h3 style="color: var(--accent-green);">📝 الشرح الكامل</h3><p style="line-height: 1.8;">${escapeHtml(machine.walkthrough || '').replace(/\n/g, '<br>')}</p></div>
        </div>
    `;
    showModal(machine.name, modalContent);
}

// ==================== إدارة المقالات ====================
function handleBlogMediaUpload(input) {
    const files = Array.from(input.files);
    files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) { alert(`❌ ملف ${file.name} كبير جداً`); return; }
        const reader = new FileReader();
        reader.onload = function(e) {
            blogMediaList.push({ url: e.target.result, type: file.type.startsWith('image/') ? 'image' : 'video', name: file.name });
            displayBlogMediaPreview();
        };
        reader.readAsDataURL(file);
    });
    input.value = '';
}

function displayBlogMediaPreview() {
    const container = document.getElementById('blogMediaPreview');
    if (!container) return;
    if (!blogMediaList.length) { container.innerHTML = ''; return; }
    let html = '';
    blogMediaList.forEach((item, index) => {
        html += `<div class="preview-item">${item.type === 'image' ? `<img src="${item.url}">` : `<video src="${item.url}"></video>`}<button class="remove-media" onclick="removeBlogMedia(${index})">✕</button></div>`;
    });
    container.innerHTML = html;
}

function removeBlogMedia(index) { blogMediaList.splice(index, 1); displayBlogMediaPreview(); }

function displayBlogPosts() {
    const container = document.getElementById('blogGrid');
    if (!container) return;
    if (!blogPosts.length) { container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">لا توجد مقالات</p>'; return; }
    let html = '';
    blogPosts.forEach(post => {
        html += `
            <div class="blog-card">
                <div style="display: flex; justify-content: space-between;"><span class="blog-platform">${escapeHtml(post.platform)}</span><span>📅 ${post.date}</span></div>
                <h3 class="blog-title">${escapeHtml(post.title)}</h3>
                <div class="blog-tags">${post.tags?.split(',').map(t => `<span class="blog-tag">#${escapeHtml(t.trim())}</span>`).join('') || ''}</div>
                <div class="blog-content">${escapeHtml(post.content?.substring(0, 150) || '')}...</div>
                <div class="blog-stats"><span class="stat">👁️ ${post.views}</span><button class="reaction-btn" onclick="likePost(${post.id})">👍 ${post.likes}</button></div>
                <button class="admin-tab" onclick="readFullPost(${post.id})">📖 اقرأ المزيد</button>
                ${isAdmin ? `<div style="margin-top: 10px;"><button class="edit-btn" onclick="editBlogPost(${post.id})" style="background: var(--accent-yellow);">✏️ تعديل</button> <button class="delete-btn" onclick="deleteBlogPost(${post.id})" style="background: var(--accent-red);">🗑️ حذف</button></div>` : ''}
            </div>
        `;
    });
    container.innerHTML = html;
}

async function addBlogPost() {
    if (!isAdmin) { alert('❌ يجب تسجيل الدخول كأدمن'); return; }
    const title = document.getElementById('blogTitle')?.value;
    const platform = document.getElementById('blogPlatform')?.value;
    const content = document.getElementById('blogContent')?.value;
    const tags = document.getElementById('blogTags')?.value;
    if (!title || !content) { alert('❌ أدخل عنوان ومحتوى المقال'); return; }
    const newPost = { id: Date.now(), title, platform, date: new Date().toISOString().split('T')[0], content, tags: tags || '', views: 0, likes: 0, media: [...blogMediaList] };
    blogPosts.push(newPost);
    await saveAllData();
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';
    document.getElementById('blogTags').value = '';
    blogMediaList = [];
    displayBlogMediaPreview();
    refreshDisplay();
    alert('✅ تم نشر المقال (محفوظ في السحابة للجميع)');
}

function editBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;
    editingBlogId = id;
    document.getElementById('blogTitle').value = post.title;
    document.getElementById('blogPlatform').value = post.platform;
    document.getElementById('blogContent').value = post.content;
    document.getElementById('blogTags').value = post.tags || '';
    blogMediaList = post.media || [];
    displayBlogMediaPreview();
    
    const addBtn = document.querySelector('#blogForm .admin-tab[onclick="addBlogPost()"]');
    if (addBtn) {
        addBtn.textContent = '🔄 تحديث المقال';
        addBtn.setAttribute('onclick', 'updateBlogPost()');
        addBtn.style.background = 'var(--accent-yellow)';
    }
    alert(`✏️ تعديل مقال: ${post.title}`);
}

async function updateBlogPost() {
    if (!isAdmin || !editingBlogId) return;
    const index = blogPosts.findIndex(p => p.id === editingBlogId);
    if (index === -1) return;
    
    blogPosts[index].title = document.getElementById('blogTitle')?.value || blogPosts[index].title;
    blogPosts[index].platform = document.getElementById('blogPlatform')?.value || blogPosts[index].platform;
    blogPosts[index].content = document.getElementById('blogContent')?.value || '';
    blogPosts[index].tags = document.getElementById('blogTags')?.value || '';
    blogPosts[index].media = [...blogMediaList];
    
    await saveAllData();
    
    const updateBtn = document.querySelector('#blogForm .admin-tab[onclick="updateBlogPost()"]');
    if (updateBtn) {
        updateBtn.textContent = '📝 نشر المقال';
        updateBtn.setAttribute('onclick', 'addBlogPost()');
        updateBtn.style.background = 'var(--accent-green)';
    }
    
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';
    document.getElementById('blogTags').value = '';
    blogMediaList = [];
    displayBlogMediaPreview();
    editingBlogId = null;
    
    refreshDisplay();
    alert('✅ تم تحديث المقال (محفوظ في السحابة)');
}

async function deleteBlogPost(id) {
    if (!isAdmin) return;
    if (confirm('⚠️ هل أنت متأكد من حذف هذا المقال؟')) {
        blogPosts = blogPosts.filter(p => p.id !== id);
        await saveAllData();
        refreshDisplay();
        alert('✅ تم حذف المقال');
    }
}

function likePost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (post) { post.likes++; saveAllData(); displayBlogPosts(); }
}

function readFullPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;
    post.views++;
    saveAllData();
    let mediaHtml = '';
    if (post.media && post.media.length) {
        mediaHtml = '<div style="margin: 20px 0;"><h3>📸 المرفقات</h3><div class="preview-grid">';
        post.media.forEach(m => {
            if (m.type === 'image') mediaHtml += `<img src="${m.url}" style="width: 100%; border-radius: 10px;">`;
            else mediaHtml += `<video src="${m.url}" controls style="width: 100%; border-radius: 10px;"></video>`;
        });
        mediaHtml += '</div></div>';
    }
    const content = `<div>${mediaHtml}<div style="background: rgba(0,255,255,0.02); padding: 20px; border-radius: 15px;">${escapeHtml(post.content || '').replace(/\n/g, '<br>')}</div></div>`;
    showModal(post.title, content);
}

// ==================== إحصائيات المنصات ====================
function displayPlatformStats() {
    const container = document.getElementById('platformStatsContainer');
    if (!container) return;
    const platforms = [
        { id: 'hackthebox', name: 'HackTheBox', icon: '🐧' },
        { id: 'tryhackme', name: 'TryHackMe', icon: '🎯' },
        { id: 'portswigger', name: 'PortSwigger', icon: '🔍' },
        { id: 'vulnhub', name: 'VulnHub', icon: '💀' },
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

async function savePlatformStats() {
    if (!isAdmin) return;
    const platforms = ['hackthebox', 'tryhackme', 'portswigger', 'vulnhub', 'pentesterlab'];
    platforms.forEach(p => { platformStats[p] = parseInt(document.getElementById(`stat_${p}`)?.value) || 0; });
    await saveAllData();
    displayPlatformStats();
    alert('✅ تم حفظ الإحصائيات (محفوظة في السحابة للجميع)');
}

// ==================== دوال عامة ====================
function showModal(title, content) {
    let modal = document.getElementById('globalModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'globalModal';
        modal.className = 'modal';
        modal.innerHTML = `<div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto; padding: 30px;"><span class="close-modal" onclick="this.parentElement.parentElement.classList.remove('active')">&times;</span><h2 id="modalTitle" style="color: var(--accent-cyan); margin-bottom: 20px;"></h2><div id="modalContent"></div></div>`;
        document.body.appendChild(modal);
    }
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openAdminModal() { document.getElementById('adminModal').classList.add('active'); }
function closeAdminModal() { document.getElementById('adminModal').classList.remove('active'); }
function checkEnter(e) { if (e.key === 'Enter') adminLogin(); }

function adminLogin() {
    if (document.getElementById('adminPass').value === ADMIN_PASSWORD) {
        isAdmin = true;
        closeAdminModal();
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').style.display = 'none';
        sessionStorage.setItem('adminLoggedIn', 'true');
        loadPlatformStatsEditor();
        displayBlogPosts();
        displayMachineWriteups();
        alert('مرحباً بك أيها الأدمن!');
    } else { alert('❌ كلمة سر خطأ'); document.getElementById('adminPass').value = ''; }
}

function logoutAdmin() {
    isAdmin = false;
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('adminLoginBtn').style.display = 'block';
    sessionStorage.removeItem('adminLoggedIn');
    displayBlogPosts();
    displayMachineWriteups();
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-form').forEach(f => f.classList.remove('active'));
    const tabs = { certs: 'certsForm', projects: 'projectsForm', machines: 'machinesForm', 'writeups-stats': 'writeupsStatsForm', blog: 'blogForm' };
    if (tabs[tab]) document.getElementById(tabs[tab]).classList.add('active');
}

function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); document.querySelector('.menu-toggle').classList.toggle('active'); }

function downloadCV() { const link = document.createElement('a'); link.href = 'E4H-CV.pdf'; link.download = 'HAMMAD_ELSAYED_CV.pdf'; link.click(); alert('✅ جاري تحميل السيرة الذاتية...'); }

function sendEmail(e) {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    btn.disabled = true;
    btn.innerHTML = 'جاري الإرسال...';
    setTimeout(() => {
        document.getElementById('formMessage').style.display = 'block';
        document.getElementById('formMessage').innerHTML = '✅ تم إرسال الرسالة بنجاح!';
        document.getElementById('contactForm').reset();
        btn.disabled = false;
        btn.innerHTML = 'إرسال';
        setTimeout(() => document.getElementById('formMessage').style.display = 'none', 5000);
    }, 1000);
}

// ==================== إعدادات اللغة ====================
function setLang(lang) {
    currentLang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const translations = {
        'nav-home': lang === 'ar' ? 'الرئيسية' : 'Home', 'nav-cv': lang === 'ar' ? 'السيرة' : 'CV',
        'nav-certs': lang === 'ar' ? 'الشهادات' : 'Certifications', 'nav-projects': lang === 'ar' ? 'المشاريع' : 'Projects',
        'nav-writeups': lang === 'ar' ? 'الرايت اب' : 'Writeups', 'nav-vuln': lang === 'ar' ? 'الثغرات' : 'Vulnerabilities',
        'nav-blog': lang === 'ar' ? 'المدونة' : 'Blog', 'nav-contact': lang === 'ar' ? 'تواصل' : 'Contact',
        'lang-ar': 'عربي', 'lang-en': 'English', 'admin-login': '🔑 دخول الأدمن',
        'login-title': 'دخول الأدمن', 'login-placeholder': 'كلمة السر', 'login-button': 'تسجيل الدخول',
        'logout': '🚪 خروج', 'cv-download': '📥 تحميل CV', 'cv-name': 'HAMMAD ELSAYED',
        'cv-job': 'Penetration Tester', 'cv-location': lang === 'ar' ? 'مصر، الغربية' : 'Egypt, Gharbia',
        'cv-summary': lang === 'ar' ? 'ملخص احترافي' : 'Summary',
        'cv-summary-text': lang === 'ar' ? 'باحث أمني ومختبر اختراق، مؤسس فريق BLACK V الأمني.' : 'Cybersecurity Researcher, Founder of BLACK V Team.',
        'cv-experience': lang === 'ar' ? 'الخبرات المهنية' : 'Experience',
        'cv-education': lang === 'ar' ? 'التعليم' : 'Education',
        'cv-edu-title': lang === 'ar' ? 'جامعة الازهر' : 'Al-Azhar University',
        'cv-edu-major': lang === 'ar' ? 'كلية الشريعة والقانون' : 'Law School',
        'cv-skills-title': lang === 'ar' ? 'المهارات التقنية' : 'Technical Skills',
        'cv-languages': lang === 'ar' ? 'اللغات' : 'Languages',
        'lang-arabic': lang === 'ar' ? 'العربية' : 'Arabic', 'lang-native': lang === 'ar' ? 'اللغة الأم' : 'Native',
        'lang-english': lang === 'ar' ? 'الإنجليزية' : 'English', 'lang-fluent': lang === 'ar' ? 'متوسط (B1)' : 'Intermediate (B1)',
        'skill-web': lang === 'ar' ? 'اختبار الاختراق للويب' : 'Web Penetration', 'skill-web-desc': 'SQLi, XSS, CSRF, SSRF',
        'skill-network': lang === 'ar' ? 'أمن الشبكات' : 'Network Security', 'skill-network-desc': 'Nmap, Metasploit, Wireshark',
        'skill-reverse': lang === 'ar' ? 'الهندسة العكسية' : 'Reverse Engineering', 'skill-reverse-desc': 'Ghidra, IDA, x86/x64',
        'skill-crypto': lang === 'ar' ? 'التشفير' : 'Cryptography', 'skill-crypto-desc': 'RSA, AES, Hashing',
        'vuln-title': lang === 'ar' ? '┌─[TOP 10]─[أهم الثغرات]' : '┌─[TOP 10]─[Vulnerabilities]',
        'blog-title': lang === 'ar' ? '┌─[BLOG]─[مقالات تقنية]' : '┌─[BLOG]─[Articles]',
        'contact-title': lang === 'ar' ? '┌─[CONTACT]─[تواصل معي]' : '┌─[CONTACT]─[Contact]',
        'send-message': lang === 'ar' ? 'أرسل رسالة' : 'Send Message', 'your-name': lang === 'ar' ? 'اسمك' : 'Your name',
        'your-email': lang === 'ar' ? 'بريدك' : 'Your email', 'your-message': lang === 'ar' ? 'رسالتك' : 'Your message',
        'send': lang === 'ar' ? 'إرسال' : 'Send', 'discord': 'Discord: zodiakx_x', 'twitter': 'Twitter: zodiakx_x',
        'github': 'GitHub: ixZODiAK', 'footer': lang === 'ar' ? '© 2026 HAMMAD ELSAYED - مختبر اختراق' : '© 2026 HAMMAD ELSAYED - Pentester',
        'footer-quote': '#HackThePlanet', 'hero-name': 'HAMMAD ELSAYED - Pentester',
        'hero-command': '#!/bin/bash - "Hack The Planet"',
        'hero-desc': lang === 'ar' ? 'مختبر اختراق | OSCP | CEH | CTF Player' : 'Pentester | OSCP | CEH | CTF Player',
        'machine-writeups-title': lang === 'ar' ? '┌─[MACHINES]─[رايت اب الماكينات]' : '┌─[MACHINES]─[CTF Writeups]'
    };
    document.querySelectorAll('[data-translate]').forEach(el => { const key = el.getAttribute('data-translate'); if (translations[key]) el.innerHTML = translations[key]; });
    document.getElementById(`lang-${lang}`).classList.add('active');
}

// ==================== بدء التشغيل ====================
window.onclick = function(e) { 
    if (e.target.classList.contains('modal')) e.target.classList.remove('active'); 
    if (e.target.id === 'globalModal') e.target.classList.remove('active');
}

window.onload = async function() {
    setLang('ar');
    await loadAllData();  // تحميل من السحابة أولاً
    
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isAdmin = true;
        document.getElementById('adminPanel').classList.add('active');
        document.getElementById('adminLoginBtn').style.display = 'none';
        loadPlatformStatsEditor();
    }
    
    console.log('✅ الموقع جاهز - البيانات من السحابة');
};