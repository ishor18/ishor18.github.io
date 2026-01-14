// Admin Data Integration with Deployment Support
// 1. Checks localStorage (for Admin Preview)
// 2. Falls back to site-data.json (for Public Visitors)

const loadData = async () => {
    // Determine source
    let projects = JSON.parse(localStorage.getItem('projects') || 'null');
    let testimonials = JSON.parse(localStorage.getItem('testimonials') || 'null');
    let expertise = JSON.parse(localStorage.getItem('expertise') || 'null');

    // If no local data (visitor), try to fetch from JSON file
    if (!projects || !testimonials || !expertise) {
        try {
            const response = await fetch('site-data.json');
            if (response.ok) {
                const data = await response.json();
                projects = projects || data.projects || [];
                testimonials = testimonials || data.testimonials || [];
                expertise = expertise || data.expertise || [];
            }
        } catch (e) {
            console.log("No deployed data found.");
        }
    }

    // Default fallbacks if absolutely nothing found
    projects = projects || [];
    testimonials = testimonials || [];
    expertise = expertise || [];

    renderProjects(projects);
    renderTestimonials(testimonials);
    renderExpertise(expertise);
};

// --- RENDERERS ---

const renderProjects = (projects) => {
    const grid = document.querySelector('#project .projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (projects.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;opacity:0.6"><i class="fas fa-laptop-code" style="font-size:3rem;margin-bottom:15px"></i><p>Projects coming soon!</p></div>';
        return;
    }

    projects.forEach(p => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <div class="project-icon"><i class="${p.icon}"></i></div>
            <span class="project-status status-${p.status}">${p.status === 'completed' ? 'Completed' : p.status === 'progress' ? 'In Progress' : 'Planning'}</span>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
            ${p.link ? `<a href="${p.link}" target="_blank" class="project-link" style="display:inline-flex;align-items:center;gap:8px;margin-top:12px;color:var(--primary);text-decoration:none"><i class="fas fa-external-link-alt"></i> View Project</a>` : ''}
        `;
        grid.appendChild(div);
    });
};

const renderTestimonials = (list) => {
    const grid = document.querySelector('#testimonials .testimonials-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;opacity:0.6"><p>Testimonials coming soon.</p></div>';
        return;
    }

    list.forEach(t => {
        const div = document.createElement('div');
        div.className = 'testimonial-card';
        div.innerHTML = `
            <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${t.photo ? `<img src="${t.photo}">` : `<i class="fas fa-user"></i>`}</div>
                <div class="author-info"><h4>${t.name}</h4><p>${t.role}</p></div>
            </div>
        `;
        grid.appendChild(div);
    });
};

const renderExpertise = (list) => {
    const grid = document.querySelector('#services .expertise-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;opacity:0.6"><p>Expertise info coming soon.</p></div>';
        return;
    }

    list.forEach(e => {
        const div = document.createElement('div');
        div.className = 'expertise-card';
        div.innerHTML = `
            <div class="expertise-icon"><i class="${e.icon}"></i></div>
            <h3>${e.title}</h3>
            <p>${e.description}</p>
            <ul class="expertise-list">${e.skills.map(s => `<li><i class="fas fa-check"></i> ${s}</li>`).join('')}</ul>
        `;
        grid.appendChild(div);
    });
};

document.addEventListener('DOMContentLoaded', loadData);
// Live update for admin
window.addEventListener('storage', () => loadData());
