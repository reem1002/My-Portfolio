document.addEventListener('DOMContentLoaded', function () {

    var toTopAgain = document.getElementById("toTopAgain");

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    toTopAgain.addEventListener("click", topFunction);


    const navLink = document.querySelectorAll('.nav-link');

    navLink.forEach(link => {
        link.addEventListener('click', () => {
            navLink.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });


    const sr = ScrollReveal({
        distance: '50px',
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out',
        reset: true
    });

    sr.reveal('.navbar', { origin: 'top' });
    sr.reveal('.intro', { origin: 'bottom' });
    sr.reveal('.myself img', { origin: 'left', interval: 200, delay: 100 });
    sr.reveal('.myself p', { origin: 'right', interval: 200 });
    sr.reveal('.skills', { origin: 'bottom', interval: 200 });
    sr.reveal('.contact', { origin: 'bottom', interval: 200 });
    sr.reveal('.project-section', { origin: 'bottom' });


    // ============ GitHub Projects (Automatic Loading) ============
    loadGithubProjects();

    function formatRepoName(name) {
        return name
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .trim();
    }

    function loadGithubProjects() {
        const username = 'reem1002';

        const projectRow = document.querySelector('.project-row');
        if (!projectRow) return;

        projectRow.innerHTML = '<p style="color: #eee;">Loading projects...</p>';

        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`)
            .then(res => {
                if (!res.ok) throw new Error('GitHub API error: ' + res.status);
                return res.json();
            })
            .then(repos => {
                const sorted = repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

                projectRow.innerHTML = '';

                sorted.forEach(repo => {
                    const description = repo.description || 'No description available';

                    const card = document.createElement('div');
                    card.className = 'project-items';
                    card.innerHTML = `
                        <div>
                            <h1 class="margin-top-medium">${formatRepoName(repo.name)}</h1>
                            <p class="margin-top-medium">${description}</p>
                        </div>
                        <div>
                            <a class="project-link-btn" href="${repo.html_url}" target="_blank">View Project</a>
                            <p class="margin-top-medium">Interested? <a href="#contacts" class="nav-link">Contact me</a>!</p>
                        </div>
                    `;
                    projectRow.appendChild(card);
                });
            })
            .catch(err => {
                projectRow.innerHTML = `<p style="color: #eee;">Failed to load projects: ${err.message}</p>`;
                console.error('Failed to load GitHub projects:', err);
            });
    }

});