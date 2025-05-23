document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after 3 seconds
    setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('mainContent').classList.add('visible');
        
        // Create flower animations
        createFlowers();
        
        // Start with confetti
        createConfetti();
        
        // Show timer after a delay
        setTimeout(() => {
            document.getElementById('timerContainer').classList.add('visible');
            startTimer();
        }, 2000);
    }, 3000);

    // Surprise box click handler
    const surpriseBoxes = document.querySelectorAll('.surprise-box');
    let revealedCount = 0;
    
    surpriseBoxes.forEach((box, index) => {
        // Set animation delay based on index
        box.style.animationDelay = `${index * 0.2 + 0.2}s`;
        
        box.addEventListener('click', function() {
            if (!this.classList.contains('revealed')) {
                this.classList.add('revealed');
                revealedCount++;
                
                // Create confetti for each reveal
                const rect = this.getBoundingClientRect();
                createConfetti(rect.left + rect.width/2, rect.top + rect.height/2);
                
                // If all boxes are revealed, show final message
                if (revealedCount === surpriseBoxes.length) {
                    setTimeout(() => {
                        document.getElementById('finalMessage').style.display = 'block';
                        setTimeout(() => {
                            document.getElementById('finalMessage').classList.add('visible');
                        }, 50);
                        
                        createCakes();
                        // Change background to dark
                        document.body.style.backgroundColor = '#0f0f1a';
                        // More confetti for finale
                        for (let i = 0; i < 30; i++) {
                            setTimeout(() => {
                                createConfetti(
                                    Math.random() * window.innerWidth,
                                    Math.random() * window.innerHeight
                                );
                            }, i * 100);
                        }
                    }, 1000);
                }
            }
        });
    });

    // Create floating flowers
    function createFlowers() {
        const flowerTypes = ['🌹', '🌸', '🌺', '🌻', '🌼', '🌷', '💐', '🏵️'];
        const container = document.querySelector('.main-content');
        
        for (let i = 0; i < 12; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            flower.style.left = `${Math.random() * 100}%`;
            flower.style.top = `${Math.random() * 100}%`;
            flower.style.fontSize = `${Math.random() * 20 + 20}px`;
            flower.style.animationDuration = `${Math.random() * 10 + 5}s`;
            flower.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(flower);
        }
    }

    // Create bouncing cakes
    function createCakes() {
        const cakeTypes = ['🎂', '🍰', '🧁'];
        const container = document.querySelector('.main-content');
        
        for (let i = 0; i < 8; i++) {
            const cake = document.createElement('div');
            cake.className = 'cake';
            cake.textContent = cakeTypes[Math.floor(Math.random() * cakeTypes.length)];
            cake.style.left = `${Math.random() * 100}%`;
            cake.style.top = `${Math.random() * 100}%`;
            cake.style.fontSize = `${Math.random() * 20 + 30}px`;
            cake.style.animationDelay = `${Math.random() * 3}s`;
            container.appendChild(cake);
        }
    }

    // Create confetti effect
    function createConfetti(x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight) {
        const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#ffecd2', '#fcb69f'];
        const container = document.querySelector('.main-content');
        
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            const size = Math.random() * 10 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            container.appendChild(confetti);
            
            // Animate confetti
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 8 + 4;
            const xVel = Math.cos(angle) * velocity;
            const yVel = Math.sin(angle) * velocity;
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            let rotation = 0;
            
            const animate = () => {
                posX += xVel;
                posY += yVel + 0.5; // Add gravity
                opacity -= 0.02;
                rotation += 5;
                
                confetti.style.left = `${posX}px`;
                confetti.style.top = `${posY}px`;
                confetti.style.opacity = opacity;
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                if (opacity > 0 && posY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, i * 50);
            
            // Make confetti visible
            setTimeout(() => {
                confetti.style.opacity = 0.8;
            }, 10);
        }
    }

    // Replace the timer functionality with this:

function startCountdown() {
    // Set the target date to June 7th of the current year
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), 5, 7); // June is month 5 (0-indexed)
    
    // If June 7th has already passed this year, set for next year
    if (now > targetDate) {
        targetDate = new Date(now.getFullYear() + 1, 5, 7);
    }
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        // If countdown reached zero (birthday time!)
        if (diff <= 0) {
            // Show birthday animation
            document.getElementById('birthdayAnimation').classList.add('active');
            
            // Trigger massive confetti
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    createConfetti(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight
                    );
                }, i * 50);
            }
            
            // Change the countdown text
            document.getElementById('countdownContainer').innerHTML = `
                <h2>🎉 Happy Birthday Saoni! 🎉</h2>
                <p>The big day is finally here!</p>
            `;
            
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update the display
        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Run immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Call this instead of startTimer() in your DOMContentLoaded event
startCountdown();

    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            const wrapper = this.closest('.image-wrapper');
            if (wrapper) {
                wrapper.innerHTML = '<div class="missing-image"><i class="fas fa-image"></i><p>Photo missing</p></div>';
            }
        };
    });
});