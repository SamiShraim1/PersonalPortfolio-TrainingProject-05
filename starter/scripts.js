// ===========================
// 📌 Section 1: About Me Data
// ===========================

// Path to About Me JSON
const aboutMeUrl = '/starter/data/aboutMeData.json';

// Get the container element for About Me
const aboutMeDiv = document.getElementById('aboutMe');

// Fetch and display the About Me section
fetch(aboutMeUrl)
  .then(response => response.json())
  .then(data => {
    // Create paragraph for bio
    const paragraph = document.createElement('p');
    paragraph.textContent = data.aboutMe;

    // Create headshot image inside a div
    const img = document.createElement('img');
    img.src = `starter/${data.headshot.replace('../', '')}`;
    img.alt = 'Headshot';

    const headshotContainer = document.createElement('div');
    headshotContainer.classList.add('headshotContainer');
    headshotContainer.appendChild(img);

    // Append both elements to DOM
    aboutMeDiv.appendChild(paragraph);
    aboutMeDiv.appendChild(headshotContainer);
  })
  .catch(error => {
    console.error('Failed to load aboutMeData:', error);
  });


// ============================
// 📌 Section 2: Projects List
// ============================

// Path to Projects JSON
const projectsUrl = 'starter/data/projectsData.json';
const spotlightTitles = document.getElementById('spotlightTitles');
const projectSpotlight = document.getElementById('projectSpotlight');

let projectsData = [];

// Fetch and populate project cards
fetch(projectsUrl)
  .then(response => response.json())
  .then(data => {
    projectsData = data;

    // Loop through each project
    data.forEach(project => {
      const card = document.createElement('div');
      card.className = 'projectCard';
      card.id = project.project_id;
      const cardImage = project.card_image || project.spotlight_image;
      card.style.backgroundImage = `url('starter/${cardImage.replace('../', '')}')`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      const title = document.createElement('h3');
      title.textContent = project.project_name;

      const desc = document.createElement('p');
      desc.textContent = project.short_description || 'No description available';

      card.appendChild(title);
      card.appendChild(desc);
      projectList.appendChild(card);

      // Set click event to update spotlight
      card.addEventListener('click', () => updateSpotlight(project));
    });

    // Show first project by default
    if (data.length > 0) {
      updateSpotlight(data[0]);
    }
  })
  .catch(error => {
    console.error('Failed to load projects data:', error);
  });

// Function to update spotlight area
function updateSpotlight(project) {
  const spotlightImage = project.spotlight_image || project.card_image;
projectSpotlight.style.backgroundImage = `url('starter/${spotlightImage.replace('../', '')}')`;
  projectSpotlight.style.backgroundSize = 'cover';
  projectSpotlight.style.backgroundPosition = 'center';

  spotlightTitles.innerHTML = ''; // Clear previous content

  const title = document.createElement('h3');
  title.textContent = project.project_name;

  const desc = document.createElement('p');
  desc.textContent = project.long_description || 'No long description available.';

  const link = document.createElement('a');
  link.href = project.url || '#';
  link.target = '_blank';
  link.textContent = 'View Project';

  spotlightTitles.appendChild(title);
  spotlightTitles.appendChild(desc);
  spotlightTitles.appendChild(link);
}


// ======================================
// 📌 Section 3: Arrows – Project Scroller
// ======================================
const projectList = document.getElementById('projectList');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

// Scroll handler function for mobile and desktop
function scrollProjectList(direction) {
  const scrollAmount = 300;

  if (window.innerWidth < 768) {
    // Horizontal scroll (mobile)
    projectList.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  } else {
    // Vertical scroll (desktop)
    projectList.scrollBy({
      top: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }
}

leftArrow.addEventListener('click', () => scrollProjectList('left'));
rightArrow.addEventListener('click', () => scrollProjectList('right'));


// ======================================
// 📌 Section 4: Contact Form Validation
// ======================================

const form = document.getElementById('formSection');
const emailInput = document.getElementById('contactEmail');
const messageInput = document.getElementById('contactMessage');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const charactersLeft = document.getElementById('charactersLeft');

// Regular Expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const invalidCharRegex = /[^a-zA-Z0-9@._-]/;

// Character counter update
messageInput.addEventListener('input', () => {
  const length = messageInput.value.length;
  charactersLeft.textContent = `Characters: ${length}/300`;

  if (length > 300) {
    messageError.textContent = 'Your message exceeds the 300 character limit.';
  } else {
    messageError.textContent = '';
  }
});

// Form validation on submit
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent actual form submission

  let valid = true;
  emailError.textContent = '';
  messageError.textContent = '';

  // Email Validation
  const emailVal = emailInput.value.trim();
  if (emailVal === '') {
    emailError.textContent = 'Email is required.';
    valid = false;
  } else if (!emailRegex.test(emailVal)) {
    emailError.textContent = 'Please enter a valid email format.';
    valid = false;
  } else if (invalidCharRegex.test(emailVal)) {
    emailError.textContent = 'Email contains invalid characters.';
    valid = false;
  }

  // Message Validation
  const messageVal = messageInput.value.trim();
  if (messageVal === '') {
    messageError.textContent = 'Message is required.';
    valid = false;
  } else if (invalidCharRegex.test(messageVal)) {
    messageError.textContent = 'Message contains invalid characters.';
    valid = false;
  } else if (messageVal.length > 300) {
    messageError.textContent = 'Message must be less than 300 characters.';
    valid = false;
  }

  if (valid) {
    alert('Form submitted successfully!');
    form.reset();
    charactersLeft.textContent = 'Characters: 0/300';
  }
});
