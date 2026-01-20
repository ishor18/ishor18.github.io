// Admin Dashboard JavaScript
// Check authentication
if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin.html';
}

// Display admin email
const adminEmailDisplay = document.getElementById('adminEmailDisplay');
if (adminEmailDisplay) adminEmailDisplay.textContent = localStorage.getItem('adminEmail');

// ==================== INITIALIZE WITH ALL DEFAULT DATA ====================
// FORCING ALL DATA IF NOT PRESENT
const initializeData = (force = false) => {
    console.log("Checking and Initializing Data...");

    // 1. ALL PROJECTS (Initial setup if empty)
    if (!localStorage.getItem('projects') || force) {
        const defaultProjects = [
            { id: "p1", name: "Portfolio Website", icon: "fas fa-laptop-code", status: "completed", description: "Modern portfolio built with HTML/JS.", tags: ["HTML", "CSS", "JS"], link: "https://ishoracharya.com.np" },
            { id: "p2", name: "Student Guidance Portal", icon: "fas fa-graduation-cap", status: "progress", description: "Helping students for abroad studies.", tags: ["React", "Node"], link: "" },
            { id: "p3", name: "IT Solutions Dashboard", icon: "fas fa-network-wired", status: "planning", description: "Business IT management system.", tags: ["Python", "Django"], link: "" },
            { id: "p4", name: "AI Chatbot Assistant", icon: "fas fa-robot", status: "planning", description: "OpenAI powered customer support.", tags: ["Python", "OpenAI"], link: "" }
        ];
        localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }

    // 2. ALL TESTIMONIALS (Initial setup if empty)
    if (!localStorage.getItem('testimonials') || force) {
        const defaultTestimonials = [
            { id: "t1", name: "Sarthak Dahal", role: "Student", text: "Ishor provided excellent guidance for my abroad study.", photo: null },
            { id: "t2", name: "Suman Guragain", role: "Business Owner", text: "Great work on our business website!", photo: null },
            { id: "t3", name: "Drishya Karki", role: "Tech Enthusiast", text: "Very helpful with career counseling.", photo: null }
        ];
        localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials));
    }

    // 3. ALL EXPERTISE (Initial setup if empty)
    if (!localStorage.getItem('expertise') || force) {
        const defaultExpertise = [
            { id: "e1", icon: "fas fa-code", title: "IT Solutions", description: "Custom development & networking.", skills: ["Dev", "Security"] },
            { id: "e2", icon: "fas fa-user-graduate", title: "Tech Education", description: "Career path guidance.", skills: ["Guidance", "Training"] },
            { id: "e3", icon: "fas fa-chart-line", title: "Digital Strategy", description: "Growing online brands.", skills: ["SEO", "Analytics"] },
            { id: "e4", icon: "fas fa-database", title: "Database Management", description: "Performance optimization.", skills: ["SQL", "Migration"] },
            { id: "e5", icon: "fas fa-book-open", title: "Academic Tutoring", description: "Personalized support.", skills: ["Tutoring", "Exams"] },
            { id: "e6", icon: "fas fa-comments", title: "Personal Consultation", description: "One-on-one guidance.", skills: ["Life Coaching", "Careers"] }
        ];
        localStorage.setItem('expertise', JSON.stringify(defaultExpertise));
    }

    // URL setup
    if (!localStorage.getItem('backupScriptUrl')) {
        localStorage.setItem('backupScriptUrl', 'https://script.google.com/macros/s/AKfycbwy9_6TpAhoK3THcm4SCL_64WmjRuf3VY6JCiSCeUKYilkJTwxuOjgZUJImV-lhhYa5/exec');
    }

    console.log("Data Initialized!");
};

// ==================== RENDER FUNCTIONS ====================

const loadProjects = () => {
    const list = JSON.parse(localStorage.getItem('projects') || '[]');
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;
    tbody.innerHTML = list.map(p => `
        <tr>
            <td><div style="display:flex;align-items:center;gap:10px;"><i class="${p.icon}"></i> ${p.name}</div></td>
            <td><span class="status-badge status-${p.status}">${p.status}</span></td>
            <td>${p.tags.join(', ')}</td>
            <td>${p.link ? 'Yes' : 'No'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editProject('${p.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" onclick="deleteProject('${p.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="5">No projects.</td></tr>';
};

const loadTestimonials = () => {
    const list = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const tbody = document.getElementById('testimonialsTableBody');
    if (!tbody) return;
    tbody.innerHTML = list.map(t => `
        <tr>
            <td>
                ${t.photo ? `<img src="${t.photo}" class="avatar-sm">` : `<div class="avatar-sm" style="background:#334155;display:flex;align-items:center;justify-content:center;"><i class="fas fa-user"></i></div>`}
            </td>
            <td>${t.name}</td>
            <td>${t.role}</td>
            <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;">${t.text}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editTestimonial('${t.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" onclick="deleteTestimonial('${t.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="5">No testimonials.</td></tr>';
};

const loadExpertise = () => {
    const list = JSON.parse(localStorage.getItem('expertise') || '[]');
    const tbody = document.getElementById('expertiseTableBody');
    if (!tbody) return;
    tbody.innerHTML = list.map(e => `
        <tr>
            <td><i class="${e.icon}"></i></td>
            <td>${e.title}</td>
            <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;">${e.description}</td>
            <td>${e.skills.slice(0, 2).join(', ')}...</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editExpertise('${e.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" onclick="deleteExpertise('${e.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="5">No expertise.</td></tr>';
};

const updateStats = () => {
    const p = JSON.parse(localStorage.getItem('projects') || '[]');
    const t = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const e = JSON.parse(localStorage.getItem('expertise') || '[]');
    const v = localStorage.getItem('visitorCount') || '0';
    document.getElementById('totalProjects').textContent = p.length;
    document.getElementById('completedProjects').textContent = p.filter(x => x.status === 'completed').length;
    document.getElementById('totalTestimonials').textContent = t.length;
    document.getElementById('totalExpertise').textContent = e.length;
    if (document.getElementById('totalVisitors')) document.getElementById('totalVisitors').textContent = v;
};

// ==================== MODAL ACTIONS ====================

window.editProject = (id) => {
    const p = JSON.parse(localStorage.getItem('projects') || '[]').find(x => x.id === id);
    if (!p) return;
    document.getElementById('projectId').value = p.id;
    document.getElementById('projectName').value = p.name;
    document.getElementById('projectIcon').value = p.icon;
    document.getElementById('projectStatus').value = p.status;
    document.getElementById('projectDescription').value = p.description;
    document.getElementById('projectTags').value = p.tags.join(', ');
    document.getElementById('projectLink').value = p.link || '';
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('projectModal').classList.add('show');
};

window.deleteProject = (id) => {
    if (!confirm('Delete this project?')) return;
    const list = JSON.parse(localStorage.getItem('projects') || '[]').filter(x => x.id !== id);
    localStorage.setItem('projects', JSON.stringify(list));
    loadProjects(); updateStats();
};

window.editTestimonial = (id) => {
    const t = JSON.parse(localStorage.getItem('testimonials') || '[]').find(x => x.id === id);
    if (!t) return;
    document.getElementById('testimonialId').value = t.id;
    document.getElementById('testimonialName').value = t.name;
    document.getElementById('testimonialRole').value = t.role;
    document.getElementById('testimonialText').value = t.text;
    if (t.photo) {
        document.getElementById('testimonialImagePreviewImg').src = t.photo;
        document.getElementById('testimonialImagePreview').style.display = 'block';
    } else {
        document.getElementById('testimonialImagePreview').style.display = 'none';
    }
    document.getElementById('testimonialModalTitle').textContent = 'Edit Testimonial';
    document.getElementById('testimonialModal').classList.add('show');
};

window.deleteTestimonial = (id) => {
    if (!confirm('Delete this testimonial?')) return;
    const list = JSON.parse(localStorage.getItem('testimonials') || '[]').filter(x => x.id !== id);
    localStorage.setItem('testimonials', JSON.stringify(list));
    loadTestimonials(); updateStats();
};

window.editExpertise = (id) => {
    const e = JSON.parse(localStorage.getItem('expertise') || '[]').find(x => x.id === id);
    if (!e) return;
    document.getElementById('expertiseId').value = e.id;
    document.getElementById('expertiseIcon').value = e.icon;
    document.getElementById('expertiseTitle').value = e.title;
    document.getElementById('expertiseDescription').value = e.description;
    document.getElementById('expertiseSkills').value = e.skills.join(', ');
    document.getElementById('expertiseModalTitle').textContent = 'Edit Expertise';
    document.getElementById('expertiseModal').classList.add('show');
};

window.deleteExpertise = (id) => {
    if (!confirm('Delete this expertise?')) return;
    const list = JSON.parse(localStorage.getItem('expertise') || '[]').filter(x => x.id !== id);
    localStorage.setItem('expertise', JSON.stringify(list));
    loadExpertise(); updateStats();
};

// ==================== APP START ====================

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    updateStats();
    loadProjects();
    loadTestimonials();
    loadExpertise();

    // Nav switch
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-section');
            document.getElementById(target).classList.add('active');
            if (target === 'projects') loadProjects();
            if (target === 'testimonials') loadTestimonials();
            if (target === 'expertise') loadExpertise();
            if (target === 'overview') updateStats();
        });
    });

    // Close Modals
    document.querySelectorAll('.modal-close, .btn-secondary').forEach(b => {
        b.onclick = () => document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
    });

    // --- Add Button Handlers ---
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.onclick = () => {
            document.getElementById('projectForm').reset();
            document.getElementById('projectId').value = '';
            document.getElementById('projectModalTitle').textContent = 'Add New Project';
            document.getElementById('projectModal').classList.add('show');
        };
    }

    const addTestimonialBtn = document.getElementById('addTestimonialBtn');
    if (addTestimonialBtn) {
        addTestimonialBtn.onclick = () => {
            document.getElementById('testimonialForm').reset();
            document.getElementById('testimonialId').value = '';
            document.getElementById('testimonialImagePreview').style.display = 'none';
            document.getElementById('testimonialModalTitle').textContent = 'Add New Testimonial';
            document.getElementById('testimonialModal').classList.add('show');
        };
    }

    const addExpertiseBtn = document.getElementById('addExpertiseBtn');
    if (addExpertiseBtn) {
        addExpertiseBtn.onclick = () => {
            document.getElementById('expertiseForm').reset();
            document.getElementById('expertiseId').value = '';
            document.getElementById('expertiseModalTitle').textContent = 'Add New Expertise';
            document.getElementById('expertiseModal').classList.add('show');
        };
    }

    // Save Handlers (Simplified)
    document.getElementById('saveProjectBtn').onclick = () => {
        const id = document.getElementById('projectId').value || Date.now().toString();
        const list = JSON.parse(localStorage.getItem('projects') || '[]');
        const data = {
            id,
            name: document.getElementById('projectName').value,
            icon: document.getElementById('projectIcon').value,
            status: document.getElementById('projectStatus').value,
            description: document.getElementById('projectDescription').value,
            tags: document.getElementById('projectTags').value.split(',').map(s => s.trim()),
            link: document.getElementById('projectLink').value
        };
        const idx = list.findIndex(x => x.id === id);
        if (idx > -1) list[idx] = data; else list.push(data);
        localStorage.setItem('projects', JSON.stringify(list));
        document.getElementById('projectModal').classList.remove('show');
        loadProjects(); updateStats();
    };

    document.getElementById('saveTestimonialBtn').onclick = () => {
        const id = document.getElementById('testimonialId').value || Date.now().toString();
        const list = JSON.parse(localStorage.getItem('testimonials') || '[]');
        const data = {
            id,
            name: document.getElementById('testimonialName').value,
            role: document.getElementById('testimonialRole').value,
            text: document.getElementById('testimonialText').value,
            photo: document.getElementById('testimonialImagePreview').style.display !== 'none' ? document.getElementById('testimonialImagePreviewImg').src : null
        };
        const idx = list.findIndex(x => x.id === id);
        if (idx > -1) list[idx] = data; else list.push(data);
        localStorage.setItem('testimonials', JSON.stringify(list));
        document.getElementById('testimonialModal').classList.remove('show');
        loadTestimonials(); updateStats();
    };

    document.getElementById('saveExpertiseBtn').onclick = () => {
        const id = document.getElementById('expertiseId').value || Date.now().toString();
        const list = JSON.parse(localStorage.getItem('expertise') || '[]');
        const data = {
            id,
            icon: document.getElementById('expertiseIcon').value,
            title: document.getElementById('expertiseTitle').value,
            description: document.getElementById('expertiseDescription').value,
            skills: document.getElementById('expertiseSkills').value.split(',').map(s => s.trim())
        };
        const idx = list.findIndex(x => x.id === id);
        if (idx > -1) list[idx] = data; else list.push(data);
        localStorage.setItem('expertise', JSON.stringify(list));
        document.getElementById('expertiseModal').classList.remove('show');
        loadExpertise(); updateStats();
    };

    // Image Upload
    document.getElementById('testimonialImageUpload').onclick = () => document.getElementById('testimonialImage').click();
    document.getElementById('testimonialImage').onchange = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('testimonialImagePreviewImg').src = ev.target.result;
                document.getElementById('testimonialImagePreview').style.display = 'block';
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // --- Settings / Data Handlers ---

    // Save Backup URL
    const saveBackupBtn = document.getElementById('saveBackupSettingsBtn');
    const backupInput = document.getElementById('backupScriptUrl');
    if (backupInput) backupInput.value = localStorage.getItem('backupScriptUrl') || '';

    if (saveBackupBtn) {
        saveBackupBtn.onclick = () => {
            const url = document.getElementById('backupScriptUrl').value;
            localStorage.setItem('backupScriptUrl', url);
            showSuccess('Backup URL saved!');
        };
    }

    // Save Visitor Count
    const saveVisitorBtn = document.getElementById('saveVisitorBtn');
    const visitorInput = document.getElementById('visitorCountInput');
    if (visitorInput) visitorInput.value = localStorage.getItem('visitorCount') || '0';

    if (saveVisitorBtn) {
        saveVisitorBtn.onclick = () => {
            const count = document.getElementById('visitorCountInput').value;
            localStorage.setItem('visitorCount', count);
            updateStats();
            showSuccess('Visitor count updated!');
        };
    }

    // Export Data
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
        exportBtn.onclick = () => {
            const data = {
                projects: JSON.parse(localStorage.getItem('projects') || '[]'),
                testimonials: JSON.parse(localStorage.getItem('testimonials') || '[]'),
                expertise: JSON.parse(localStorage.getItem('expertise') || '[]'),
                visitorCount: localStorage.getItem('visitorCount') || '0'
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        };
    }

    // Import Data
    const importBtn = document.getElementById('importDataBtn');
    if (importBtn) {
        importBtn.onclick = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        if (data.projects) localStorage.setItem('projects', JSON.stringify(data.projects));
                        if (data.testimonials) localStorage.setItem('testimonials', JSON.stringify(data.testimonials));
                        if (data.expertise) localStorage.setItem('expertise', JSON.stringify(data.expertise));
                        if (data.visitorCount) localStorage.setItem('visitorCount', data.visitorCount);
                        showSuccess('Data imported successfully!');
                        location.reload();
                    } catch (err) {
                        alert('Invalid JSON file.');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        };
    }

    // Clear Data
    const clearBtn = document.getElementById('clearDataBtn');
    if (clearBtn) {
        clearBtn.onclick = () => {
            if (confirm('Are you sure? This will reset all data to defaults.')) {
                initializeData(true);
                showSuccess('Data reset to defaults.');
                location.reload();
            }
        };
    }

    // Helper to show success message
    const showSuccess = (text) => {
        const msg = document.getElementById('successMessage');
        const span = document.getElementById('successText');
        if (msg && span) {
            span.textContent = text;
            msg.classList.add('show');
            setTimeout(() => msg.classList.remove('show'), 3000);
        }
    };

    // Cloud Backup Function
    const performBackup = async (silent = false) => {
        const url = localStorage.getItem('backupScriptUrl');
        if (!url) {
            if (!silent) alert('Please check your Backup URL in settings.');
            return;
        }

        const data = {
            projects: JSON.parse(localStorage.getItem('projects')),
            testimonials: JSON.parse(localStorage.getItem('testimonials')),
            expertise: JSON.parse(localStorage.getItem('expertise')),
            timestamp: new Date().toISOString()
        };

        if (!silent) {
            const btn = document.getElementById('cloudBackupBtn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Backing up...';
            btn.disabled = true;

            try {
                await fetch(url, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
                alert('Backup to Drive successful!');
            } catch (error) {
                alert('Backup failed. Check console.');
                console.error(error);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        } else {
            // Silent mode for auto-backup
            try {
                await fetch(url, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
                console.log('Auto-backup complete');
            } catch (e) { console.error('Auto-backup failed', e); }
        }
    };

    document.getElementById('cloudBackupBtn').onclick = () => performBackup(false);

    // Logic for Daily Auto Backup
    const checkAutoBackup = () => {
        const last = localStorage.getItem('lastCloudBackup');
        const now = Date.now();
        // Check if 24 hours have passed
        if (!last || (now - parseInt(last)) > (24 * 60 * 60 * 1000)) {
            console.log('Triggering daily backup...');
            performBackup(true); // Silent true
            localStorage.setItem('lastCloudBackup', now.toString());
        }
    };
    // Delay slightly to ensure load
    setTimeout(checkAutoBackup, 5000);

    // Logout
    document.getElementById('logoutBtn').onclick = () => { localStorage.removeItem('adminLoggedIn'); window.location.href = 'admin.html'; };
});
