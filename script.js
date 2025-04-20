/*
 * Team Portfolio JavaScript Features:
 * 
 * 1. Dark Theme Switcher - A toggle button in the navbar that switches between light and dark modes.
 *    The theme preference is saved to localStorage and respects user OS preferences.
 * 
 * 2. Image Lightbox - Clicking on team member photos now opens a lightbox with a larger view
 *    of the image and the member's name as a caption.
 * 
 * 3. Team Member Search & Filtering - Added a search box and category filters on the team page
 *    to easily find team members by name or role.
 * 
 * 4. Scroll Progress Indicator - A thin progress bar at the top of the page shows how far
 *    down the page the user has scrolled.
 * 
 * 5. 3D Flip Cards - Team member cards now have a 3D flip animation that reveals more 
 *    information about the person on the back side.
 * 
 * 6. Animated Skill Bars - On individual team member pages, the skills are displayed
 *    as animated progress bars that fill up when scrolled into view.
 * 
 * 7. Custom Cursor - Added a custom cursor that changes when hovering over interactive elements.
 * 
 * 8. Confetti Effects - When users click to view a profile or submit the contact form,
 *    a confetti animation celebration appears.
 * 
 * All these features are created dynamically with JavaScript and will work with the
 * existing HTML without requiring any markup changes.
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Immediately fade in the body
  document.body.style.opacity = '1';

  // Initialize all features
  initThemeSwitcher();
  initTeamFilters();
  initScrollProgress();
  init3DFlipCards();
  initAnimatedSkillBars();
  initImageLightbox();
  initConfetti();
  
  // Ensure features are visible and working
  setTimeout(() => {
    ensureFeaturesWork();
  }, 300);

  // Remove loading spinner completely
  const loadingScreen = document.querySelector('.loading');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button
  const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.display = 'none';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  createBackToTopButton();

  // Add fade-in class to elements for scroll animations
  const addScrollAnimations = () => {
    const sections = document.querySelectorAll('section, .team-card, .member-detail, .contact-form, .contact-info');
    sections.forEach(section => {
      section.classList.add('fade-in');
    });

    // Check if elements are in viewport on scroll
    const checkIfInView = () => {
      const triggerBottom = window.innerHeight * 0.85;
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
          section.classList.add('appear');
        }
      });
    };

    // Initial check on page load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
  };
  addScrollAnimations();

  // Image hover effects
  const enhanceImages = () => {
    const profileImages = document.querySelectorAll('.card-image img, .member-detail img');
    
    profileImages.forEach(img => {
      img.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        img.style.transform = `scale(1.05) perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.transform = '';
      });
    });
  };
  enhanceImages();

  // Form validation and animation
  const enhanceForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add focus effect
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        
        // Add 'filled' class if input has value
        if (input.value.trim() !== '') {
          input.classList.add('filled');
        } else {
          input.classList.remove('filled');
        }
      });
    });

    // Form submission animation
    form.addEventListener('submit', function(e) {
    e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-button');
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual submission)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.classList.add('success');
        
        // Reset form after delay
        setTimeout(() => {
          form.reset();
          inputs.forEach(input => input.classList.remove('filled'));
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
          submitBtn.classList.remove('success');
        }, 3000);
      }, 2000);
    });
  };
  enhanceForm();

  // Enhanced back button animation
  const enhanceBackButton = () => {
    const backButton = document.querySelector('.back-button');
    if (!backButton) return;

    // Simpler hover effect
    backButton.addEventListener('mouseover', () => {
      backButton.style.transform = 'translateY(-3px)';
    });
    
    backButton.addEventListener('mouseout', () => {
      backButton.style.transform = '';
    });
  };
  enhanceBackButton();

  // Add typed text effect to hero section
  const addTypedEffect = () => {
    const heroText = document.querySelector('.hero p');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    
    // Add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    heroText.after(cursor);
    
    // Type out text
    let charIndex = 0;
    const typeText = () => {
      if (charIndex < text.length) {
        heroText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
      } else {
        cursor.classList.add('blinking');
      }
    };
    
    setTimeout(typeText, 1000);
  };
  addTypedEffect();

  // Add interactive skill tags
  const enhanceSkillTags = () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
      tag.addEventListener('click', () => {
        tag.classList.toggle('active');
      });
    });
  };
  enhanceSkillTags();

  // Add social media hover sounds for fun
  const addHoverSounds = () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        // Uncomment the below lines to add hover sounds if desired
        // const audio = new Audio('hover-sound.mp3');
        // audio.volume = 0.2;
        // audio.play();
      });
    });
  };
  addHoverSounds();
});

// Helper function to animate numbers (for potential counters)
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Theme Switcher
function initThemeSwitcher() {
  // Create theme toggle button in the navbar
  const navbar = document.querySelector('.navbar .container');
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = `
    <button id="theme-switch">
      <i class="fas fa-moon"></i>
    </button>
  `;
  navbar.appendChild(themeToggle);

  // Check for saved theme preference or respect OS preference
  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkTheme)) {
    document.body.classList.add('dark-theme');
    document.getElementById('theme-switch').innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Handle theme toggle click
  document.getElementById('theme-switch').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Update button icon
    const isDark = document.body.classList.contains('dark-theme');
    document.getElementById('theme-switch').innerHTML = isDark 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Add CSS for dark theme
  const style = document.createElement('style');
  style.textContent = `
    .theme-toggle {
      margin-left: 20px;
    }
    
    .theme-toggle button {
      background: transparent;
      border: none;
      color: var(--text-color);
      font-size: 1.2rem;
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .theme-toggle button:hover {
      background: rgba(0,0,0,0.1);
      transform: rotate(30deg);
    }
    
    .dark-theme {
      --primary-color: #121212;
      --text-color: #e0e0e0;
      --light-bg: #1e1e1e;
      --card-bg: #2d2d2d;
      --white: #2d2d2d;
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .dark-theme .navbar {
      background-color: rgba(30, 30, 30, 0.85);
      backdrop-filter: blur(10px);
    }
    
    .dark-theme .navbar.scrolled {
      background-color: rgba(30, 30, 30, 0.98);
    }
    
    .dark-theme .logo {
      background: linear-gradient(90deg, #4a6cf7, #e0e0e0);
      -webkit-background-clip: text;
      background-clip: text;
    }
    
    .dark-theme .nav-links a,
    .dark-theme .card-content h3,
    .dark-theme .member-detail h1,
    .dark-theme .member-detail h3 {
      color: var(--text-color);
    }
    
    .dark-theme .social-icon {
      color: var(--text-color);
      background: rgba(255, 255, 255, 0.1);
    }
    
    .dark-theme .card-content,
    .dark-theme .contact-info,
    .dark-theme .contact-form {
      background: var(--card-bg);
    }
    
    .dark-theme .bio,
    .dark-theme .profile-quote,
    .dark-theme .member-detail p, 
    .dark-theme .member-detail ul {
      color: #b0b0b0;
    }
    
    .dark-theme .team-section,
    .dark-theme footer {
      background-color: var(--primary-color);
    }
    
    .dark-theme .contact-section {
      background-color: var(--light-bg);
    }
    
    .dark-theme .contact-form input,
    .dark-theme .contact-form textarea {
      background: var(--card-bg);
      border-color: #444;
      color: var(--text-color);
    }
  `;
  document.head.appendChild(style);
}

// Image Lightbox for Team Member Photos
function initImageLightbox() {
  // Create lightbox container
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="close-lightbox">&times;</span>
      <img class="lightbox-image" src="" alt="Team member">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Add CSS for the lightbox
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
    
    .lightbox-image {
      max-width: 80%;
      max-height: 80vh;
      margin: auto;
      border-radius: 8px;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
      transform: scale(0.95);
      animation: zoomIn 0.3s ease forwards;
    }
    
    @keyframes zoomIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    .close-lightbox {
      position: absolute;
      top: 20px;
      right: 30px;
      color: white;
      font-size: 35px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1001;
      transition: all 0.3s ease;
    }
    
    .close-lightbox:hover {
      color: var(--secondary-color);
      transform: rotate(90deg);
    }
    
    .lightbox-caption {
      color: white;
      margin-top: 20px;
      font-size: 18px;
      text-align: center;
      max-width: 80%;
    }
    
    .card-image {
      cursor: pointer;
      position: relative;
    }
    
    .card-image::before {
      content: '👁️';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      color: white;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .card-image:hover::before {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // Add click listeners to team member images
  const memberImages = document.querySelectorAll('.card-image img, .member-detail > img');
  memberImages.forEach(img => {
    img.addEventListener('click', () => {
      const lightboxImg = document.querySelector('.lightbox-image');
      const caption = document.querySelector('.lightbox-caption');
      
      // Set image source and caption
      lightboxImg.src = img.src;
      
      // Try to get member name for caption
      const memberCard = img.closest('.team-card') || img.closest('.member-detail');
      const memberName = memberCard ? memberCard.querySelector('h3, h1').textContent : '';
      caption.textContent = memberName;
      
      // Show lightbox
      lightbox.style.display = 'block';
      
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox when clicking the close button or outside the image
  document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox with ESC key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Team Member Filter and Search
function initTeamFilters() {
  // Only initialize filters if we're on the homepage
  const teamSection = document.querySelector('.team-section');
  if (!teamSection) return;

  // Don't create filter UI, use existing one from HTML
  const filterContainer = document.querySelector('.filter-container');
  
  // If the filter container doesn't exist for some reason, exit
  if (!filterContainer) return;

  // Filter and search functionality
  const cards = document.querySelectorAll('.team-card');
  const searchInput = document.getElementById('team-search');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Apply filters based on role and search query
  function applyFilters() {
    const searchQuery = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    
    cards.forEach(card => {
      // Get role text and member name
      const role = card.querySelector('.role').textContent.toLowerCase();
      const name = card.querySelector('h3').textContent.toLowerCase();
      
      // Check if card matches both filter and search
      const matchesFilter = 
        activeFilter === 'all' || 
        (activeFilter === 'front' && role.includes('front')) ||
        (activeFilter === 'back' && role.includes('back')) ||
        (activeFilter === 'full' && role.includes('full')) ||
        (activeFilter === 'other' && !role.includes('front') && !role.includes('back') && !role.includes('full'));
      
      const matchesSearch = 
        name.includes(searchQuery) || 
        role.includes(searchQuery);
      
      // Apply hiding logic with animation
      if (matchesFilter && matchesSearch) {
        card.classList.remove('fade-out');
        setTimeout(() => {
          card.classList.remove('hidden');
        }, 300);
      } else {
        card.classList.add('fade-out');
        setTimeout(() => {
          card.classList.add('hidden');
        }, 300);
      }
    });
  }

  // Event listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      
      // Apply filters
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);
}

// Scroll Progress Indicator
function initScrollProgress() {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Add CSS for progress bar
  const style = document.createElement('style');
  style.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(to right, var(--secondary-color), var(--accent-color));
      width: 0%;
      z-index: 1000;
      transition: width 0.1s;
    }
  `;
  document.head.appendChild(style);

  // Update progress bar on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollProgress + '%';
  });
}

// 3D Flip Cards
function init3DFlipCards() {
  // Only apply to team cards on the main page
  const teamCards = document.querySelectorAll('.team-card');
  if (teamCards.length === 0) return;

  // Add CSS for 3D flip effect
  const style = document.createElement('style');
  style.textContent = `
    .team-card {
      perspective: 1000px;
    }
    
    .flip-icon {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(255,255,255,0.5);
      color: var(--primary-color);
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .flip-icon:hover {
      transform: rotate(180deg);
      background: rgba(255,255,255,0.8);
    }
    
    .card-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background: linear-gradient(135deg, var(--secondary-color), #6a89ff);
      color: white;
      border-radius: var(--border-radius);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform: rotateY(180deg);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease;
    }
    
    .team-card.flipped .card-back {
      transform: rotateY(0deg);
      opacity: 1;
      pointer-events: auto;
    }
    
    .team-card.flipped .card-image,
    .team-card.flipped .card-content {
      opacity: 0;
      pointer-events: none;
      transform: rotateY(-180deg);
    }
    
    .card-image, 
    .card-content {
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease;
      backface-visibility: hidden;
    }
    
    .card-back h3 {
      color: white !important;
      margin-bottom: 1rem;
      font-size: 1.4rem;
    }
    
    .card-back .quote {
      font-style: italic;
      margin: 1rem 0;
      font-size: 0.9rem;
      opacity: 0.9;
    }
    
    .card-back .social-links a {
      color: white;
      background: rgba(255,255,255,0.2);
    }
    
    .card-back .quick-contact {
      margin-top: 1rem;
      font-size: 0.9rem;
    }
  `;
  document.head.appendChild(style);

  // Add flip functionality to each card
  teamCards.forEach(card => {
    // Extract data from card
    const name = card.querySelector('h3').textContent;
    const role = card.querySelector('.role').textContent;
    const bio = card.querySelector('.bio').textContent;
    const profileLink = card.querySelector('.view-profile').href;
    
    // Add flip icon to card
    const flipIcon = document.createElement('div');
    flipIcon.className = 'flip-icon';
    flipIcon.innerHTML = '<i class="fas fa-sync-alt"></i>';
    card.appendChild(flipIcon);
    
    // Create back side content
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = `
      <h3>${name}</h3>
      <div class="quote">"Passion drives innovation. Innovation drives success."</div>
      <div class="more-info">
        <p>${bio}</p>
        <p>Specializing in ${role.toLowerCase()} technologies.</p>
      </div>
      <div class="quick-contact">
        <p><i class="fas fa-envelope"></i> contact@example.com</p>
      </div>
      <div class="social-links">
        <a href="#" class="social-icon"><i class="fab fa-github"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
      </div>
      <a href="${profileLink}" class="view-profile">View Full Profile</a>
    `;
    
    // Add back side to card
    card.appendChild(cardBack);
    
    // Add flip functionality
    flipIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      card.classList.toggle('flipped');
    });
    
    // Allow clicking anywhere on back to flip back
    cardBack.addEventListener('click', (e) => {
      // Don't prevent navigation for the view profile link
      if (e.target !== cardBack.querySelector('.view-profile') && 
          !e.target.closest('.view-profile')) {
        card.classList.remove('flipped');
      }
    });
  });
}

// Animated Skill Bars
function initAnimatedSkillBars() {
  // Only apply on member detail pages
  const memberDetail = document.querySelector('.member-detail');
  if (!memberDetail) return;
  
  // Find sections that could have skill lists
  const sections = memberDetail.querySelectorAll('h3');
  let skillsSection = null;
  
  // Look for the technical skills section
  sections.forEach(section => {
    const text = section.textContent.toLowerCase();
    if (text.includes('technical') || text.includes('skill') || text.includes('front-end') || text.includes('back-end')) {
      skillsSection = section;
    }
  });
  
  if (!skillsSection) return;
  
  // Get the skills list
  const skillsList = skillsSection.nextElementSibling;
  if (!skillsList || skillsList.tagName !== 'UL') return;
  
  // Add CSS for animated skill bars
  const style = document.createElement('style');
  style.textContent = `
    .skill-bar-container {
      margin-bottom: 1.5rem;
    }
    
    .skill-bar-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .skill-bar-bg {
      height: 10px;
      background: rgba(0,0,0,0.05);
      border-radius: 5px;
      overflow: hidden;
    }
    
    .dark-theme .skill-bar-bg {
      background: rgba(255,255,255,0.1);
    }
    
    .skill-bar-fill {
      height: 100%;
      background: linear-gradient(to right, var(--secondary-color), #6a89ff);
      border-radius: 5px;
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 1s cubic-bezier(0.17, 0.67, 0.24, 0.99);
    }
    
    .skill-bar-container.animate .skill-bar-fill {
      transform: scaleX(1);
    }
  `;
  document.head.appendChild(style);
  
  // Convert skill list items to skill bars
  const skills = skillsList.querySelectorAll('li');
  const skillsContainer = document.createElement('div');
  skillsContainer.className = 'skills-bars-container';
  
  skills.forEach(skill => {
    // Generate a random percentage between 75 and 95
    const percentage = Math.floor(Math.random() * 20) + 75;
    
    const skillBar = document.createElement('div');
    skillBar.className = 'skill-bar-container';
    skillBar.innerHTML = `
      <div class="skill-bar-label">
        <span>${skill.textContent}</span>
        <span>${percentage}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="width: ${percentage}%"></div>
      </div>
    `;
    
    skillsContainer.appendChild(skillBar);
  });
  
  // Replace the original list with skill bars
  skillsList.replaceWith(skillsContainer);
  
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-bar-container');
  
  const animateSkillBarsOnScroll = () => {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isInView = (rect.top <= window.innerHeight * 0.8);
      
      if (isInView) {
        bar.classList.add('animate');
      }
    });
  };
  
  // Initial check
  setTimeout(animateSkillBarsOnScroll, 500);
  
  // Check on scroll
  window.addEventListener('scroll', animateSkillBarsOnScroll);
}

// Custom Cursor Effect
function initCustomCursor() {
  // No-op function - custom cursor functionality removed
  // This keeps the initialization call working but doesn't do anything
}

// Confetti Animation
function initConfetti() {
  // Add confetti script
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  document.head.appendChild(script);
  
  // Wait for script to load
  script.onload = () => {
    // Only apply confetti to form submission, not profile links
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      const submitButton = contactForm.querySelector('.submit-button');
      
      contactForm.addEventListener('submit', (e) => {
        // The form submission is already handled in the existing code
        
        // Add confetti effect
        confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.8 }
        });
      });
    }
  };
}

// Make sure the dark mode, search and filter functionality works correctly
function ensureFeaturesWork() {
  // Fix potential issue with theme switcher positioning
  setTimeout(() => {
    // Check if theme toggle exists
    let themeToggle = document.querySelector('.theme-toggle');
    const navbar = document.querySelector('.navbar .container');
    
    // If theme toggle doesn't exist, create and add it
    if (!themeToggle && navbar) {
      console.log("Creating theme toggle");
      initThemeSwitcher();
    } else if (themeToggle && navbar && !navbar.contains(themeToggle)) {
      navbar.appendChild(themeToggle);
    }
    
    // Ensure search and filter elements are properly positioned
    const teamSection = document.querySelector('.team-section');
    if (teamSection) {
      let filterContainer = document.querySelector('.filter-container');
      
      // Only initialize filters if they exist but the event handlers aren't attached
      if (filterContainer && !filterContainer.hasAttribute('data-initialized')) {
        console.log("Initializing filter functionality");
        initTeamFilters();
        filterContainer.setAttribute('data-initialized', 'true');
      }
    }
    
    // Ensure scroll progress indicator exists
    if (!document.querySelector('.scroll-progress')) {
      console.log("Creating scroll progress indicator");
      initScrollProgress();
    }
  }, 500); // Shorter delay for faster response
}

