(() => {
  const nav = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.main-nav a');
  const yearEl = document.getElementById('year');
  const toggleViewBtn = document.getElementById('toggle-view');
  const quizListEl = document.getElementById('quiz-list');
  const flashcardGridEl = document.getElementById('flashcard-grid');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      });
    });
  }

  const questions = [
    {
      question: 'What principle ensures multiple protective barriers from the perimeter to the data itself?',
      options: ['Least privilege', 'Defense in Depth', 'Zero trust', 'Security through obscurity'],
      answer: 'Defense in Depth',
      reference: '#home'
    },
    {
      question: 'Which access control focus protects critical systems first and expands outward?',
      options: ['Outside-in security', 'Inside-out security', 'Security by isolation', 'Physical-only security'],
      answer: 'Inside-out security',
      reference: '#access-control'
    },
    {
      question: 'Which site security layer commonly uses fences, gates, and guards?',
      options: ['Secure area', 'Internal perimeter', 'External perimeter', 'Core infrastructure'],
      answer: 'External perimeter',
      reference: '#site-security'
    },
    {
      question: 'What specific threat do mantraps help prevent?',
      options: ['Phishing', 'Tailgating', 'SQL injection', 'Social engineering'],
      answer: 'Tailgating',
      reference: '#mantraps'
    },
    {
      question: 'Where should servers ideally be stored to maximize physical protection?',
      options: ['Open office space', 'Locked server rooms or cabinets', 'Network closet without locks', 'Employee cubicles'],
      answer: 'Locked server rooms or cabinets',
      reference: '#device-security'
    },
    {
      question: 'Which technology helps enforce policies, locate lost devices, and perform remote wipes?',
      options: ['IAM', 'Mobile Device Management (MDM)', 'SIEM', 'SCADA'],
      answer: 'Mobile Device Management (MDM)',
      reference: '#device-security'
    },
    {
      question: 'What should organizations do if they allow removable media like USB drives?',
      options: ['Disable encryption keys', 'Avoid labeling devices', 'Use encryption such as BitLocker To Go', "Share passwords with the team"],
      answer: 'Use encryption such as BitLocker To Go',
      reference: '#removable-media'
    },
    {
      question: 'Which mechanism is most appropriate for preventing unauthorized people from following an employee into a secure room?',
      options: ['Motion sensors', 'Mantrap', 'Firewall', 'SIEM alerts'],
      answer: 'Mantrap',
      reference: '#mantraps'
    },
    {
      question: 'Why should wireless keyboards be monitored or replaced with encrypted devices?',
      options: ['They have short battery life', 'They can be intercepted by attackers', 'They are difficult to pair', 'They cause network congestion'],
      answer: 'They can be intercepted by attackers',
      reference: '#device-security'
    },
    {
      question: 'Which summary concept emphasizes restricting physical and logical access to critical assets?',
      options: ['Access Control', 'Security Awareness Training', 'Change Management', 'Business Continuity'],
      answer: 'Access Control',
      reference: '#summary'
    }
  ];

  const renderQuizItems = () => {
    quizListEl.innerHTML = '';
    questions.forEach((item, index) => {
      const quizItem = document.createElement('article');
      quizItem.className = 'quiz-item';
      quizItem.innerHTML = `
        <p class="quiz-question">Q${index + 1}. ${item.question}</p>
        <ul class="quiz-options">
          ${item.options.map((option) => `<li>${option}</li>`).join('')}
        </ul>
        <button class="answer-toggle" type="button" aria-expanded="false" data-index="${index}">Show answer</button>
        <p class="quiz-answer" id="answer-${index}" hidden>${item.answer}</p>
        <a class="quiz-reference" href="${item.reference}">Review topic</a>
      `;
      quizListEl.appendChild(quizItem);
    });

    quizListEl.querySelectorAll('.answer-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-index');
        const answer = document.getElementById(`answer-${idx}`);
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        btn.textContent = expanded ? 'Show answer' : 'Hide answer';
        answer.hidden = expanded;
      });
    });
  };

  const renderFlashcards = () => {
    flashcardGridEl.innerHTML = '';
    questions.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'flashcard';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Flashcard ${index + 1}: ${item.question}`);
      card.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-face front">
            <strong>${item.question}</strong>
            <small>Tap or press Enter to flip</small>
          </div>
          <div class="flashcard-face back">
            <strong>${item.answer}</strong>
            <small>Linked section: ${item.reference.replace('#', '').replace(/-/g, ' ')}</small>
          </div>
        </div>
      `;
      flashcardGridEl.appendChild(card);
    });

    flashcardGridEl.querySelectorAll('.flashcard').forEach((card) => {
      const toggleFlip = () => {
        card.classList.toggle('flip');
      };

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleFlip();
        }
      });
    });
  };

  if (quizListEl && flashcardGridEl) {
    renderQuizItems();
    renderFlashcards();

    toggleViewBtn?.addEventListener('click', () => {
      const showingFlashcards = !flashcardGridEl.hasAttribute('hidden');
      if (showingFlashcards) {
        flashcardGridEl.setAttribute('hidden', '');
        quizListEl.removeAttribute('hidden');
        toggleViewBtn.textContent = 'Switch to Flashcard Mode';
        toggleViewBtn.setAttribute('aria-pressed', 'false');
      } else {
        quizListEl.setAttribute('hidden', '');
        flashcardGridEl.removeAttribute('hidden');
        toggleViewBtn.textContent = 'Switch to Quiz Mode';
        toggleViewBtn.setAttribute('aria-pressed', 'true');
      }
    });
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  }
})();
