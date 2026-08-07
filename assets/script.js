        // 1. Dual-Cursor Logic (Visible Pointer + Aura)
        const aura = document.getElementById('cursor-aura');
        
        document.addEventListener('mousemove', (e) => {
            aura.style.left = e.clientX + 'px';
            aura.style.top = e.clientY + 'px';
        });

        // Expand aura on interactive elements
        const targets = document.querySelectorAll('.line, a, h1');
        targets.forEach(t => {
            t.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            t.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });

        // 2. Real-time Clock
        function updateClock() {
            const now = new Date();
            document.getElementById('clock').innerText = now.toLocaleTimeString('en-GB', { hour12: false });
        }
        setInterval(updateClock, 1000);
        updateClock();

        // 3. Scroll Reveal
        const lines = document.querySelectorAll('.line');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.2 });

        lines.forEach(line => observer.observe(line));

        // 4. Parallax Video
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            document.getElementById('video-bg').style.transform = `scale(1.05) translateY(${scroll * 0.2}px)`;
        });

        // 5. Decipher Animation for Title
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const title = document.getElementById('decode-text');
        const original = title.innerText;

        title.onmouseover = () => {
            let iteration = 0;
            const interval = setInterval(() => {
                title.innerText = original.split("").map((l, i) => {
                    if(i < iteration) return original[i];
                    return letters[Math.floor(Math.random() * 26)];
                }).join("");
                if(iteration >= original.length) clearInterval(interval);
                iteration += 1/3;
            }, 30);
        };