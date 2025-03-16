document.addEventListener("DOMContentLoaded", function () {
  // Dynamic text animation initialization
  const words = document.querySelectorAll(".dynamic-words .word");
  if (words.length > 0) {
    // Set initial state
    words.forEach((word, index) => {
      if (index === 0) {
        word.style.opacity = "1";
        word.style.transform = "translateY(0)";
      } else {
        word.style.opacity = "0";
        word.style.transform = "translateY(50%)";
      }
    });

    // Manual animation cycle in case CSS animation doesn't work
    let currentIndex = 0;
    setInterval(() => {
      // Hide current word
      words[currentIndex].style.opacity = "0";
      words[currentIndex].style.transform = "translateY(-50%)";
      words[currentIndex].style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

      // Update index
      currentIndex = (currentIndex + 1) % words.length;

      // Show next word
      setTimeout(() => {
        words.forEach((word, index) => {
          if (index === currentIndex) {
            word.style.opacity = "1";
            word.style.transform = "translateY(0)";
            word.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          } else if (
            index !==
            (currentIndex - 1 + words.length) % words.length
          ) {
            word.style.opacity = "0";
            word.style.transform = "translateY(50%)";
            word.style.transition = "none";
          }
        });
      }, 500);
    }, 2000);
  }

  // Typewriter Effect for Home Page
  const texts = ["software engineer", "python developer", "data analyst"];
  let speed = 100;
  const textElement = document.querySelector(".typewriter-text");
  let textIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < texts[textIndex].length) {
      textElement.innerHTML += texts[textIndex].charAt(charIndex).toLowerCase();
      charIndex++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(eraseText, 1000); // Delay before erasing
    }
  }

  function eraseText() {
    if (textElement.innerHTML.length > 0) {
      textElement.innerHTML = textElement.innerHTML.slice(0, -1);
      setTimeout(eraseText, 50);
    } else {
      textIndex = (textIndex + 1) % texts.length; // Cycle through texts
      charIndex = 0;
      setTimeout(typeWriter, 500); // Start typing the next text
    }
  }

  // Start the typewriter effect
  if (textElement) {
    setTimeout(typeWriter, 500);
  }

  // Add hover effect to the add button
  const addButton = document.querySelector(".add-button");
  if (addButton) {
    addButton.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.2s ease";
    });

    addButton.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });

    // Add click effect
    addButton.addEventListener("click", function (e) {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  }

  // Add subtle animation to chat bubbles
  const chatBubbles = document.querySelectorAll(".chat-bubble");
  chatBubbles.forEach((bubble) => {
    // Random slight movement
    setInterval(() => {
      const xMove = (Math.random() - 0.5) * 3;
      const yMove = (Math.random() - 0.5) * 3;

      bubble.style.transform = `translate(${xMove}px, ${yMove}px)`;
      bubble.style.transition = "transform 2s ease";

      setTimeout(() => {
        bubble.style.transform = "translate(0, 0)";
      }, 2000);
    }, 4000);
  });

  // Add notification bell animation
  const notificationBell = document.querySelector(".notification i");
  if (notificationBell) {
    setInterval(() => {
      notificationBell.style.transform = "rotate(15deg)";
      notificationBell.style.transition = "transform 0.2s ease";

      setTimeout(() => {
        notificationBell.style.transform = "rotate(-15deg)";

        setTimeout(() => {
          notificationBell.style.transform = "rotate(0)";
        }, 200);
      }, 200);
    }, 5000);
  }

  // Add active state to navigation links
  const navLinks = document.querySelectorAll(".navigation ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Get the target section id
      const targetId = this.getAttribute("href").substring(1);

      // Scroll to the target section
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });

      // Update the active dot
      updateActiveDot(targetId);
    });
  });

  // Handle page navigation dots
  const navDots = document.querySelectorAll(".nav-dot");
  navDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const targetId = this.getAttribute("data-page");

      // Scroll to the target section
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });

      // Update active dot
      updateActiveDot(targetId);

      // Update active nav link
      updateActiveNavLink(targetId);
    });
  });

  // Function to update active dot
  function updateActiveDot(targetId) {
    // Remove active class from all dots
    navDots.forEach((d) => d.classList.remove("active"));

    // Add active class to the target dot
    document
      .querySelector(`.nav-dot[data-page="${targetId}"]`)
      .classList.add("active");
  }

  // Function to update active nav link
  function updateActiveNavLink(targetId) {
    // Remove active class from all links
    navLinks.forEach((l) => l.classList.remove("active"));

    // Add active class to the target link
    document
      .querySelector(`.navigation ul li a[href="#${targetId}"]`)
      .classList.add("active");
  }

  // Handle scroll events to update active section
  const pageContainer = document.querySelector(".page-container");
  const pages = document.querySelectorAll(".page");

  pageContainer.addEventListener("scroll", function () {
    // Debounce scroll event
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      // Find the current visible section
      let currentSection = "";
      let minDistance = Infinity;

      pages.forEach((page) => {
        const rect = page.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < minDistance) {
          minDistance = distance;
          currentSection = page.id;
        }
      });

      // Update active dot and nav link
      if (currentSection) {
        updateActiveDot(currentSection);
        updateActiveNavLink(currentSection);
      }
    }, 100);
  });

  // Handle contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const submitButton = this.querySelector(".submit-button");
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;

      // Get form data
      const formData = new FormData(this);

      // Send form data to Formspree
      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Form submission failed");
          }
        })
        .then((data) => {
          // Show success message
          this.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                        <button class="reset-form">Send Another Message</button>
                    </div>
                `;

          // Add event listener to reset form button
          const resetButton = this.querySelector(".reset-form");
          if (resetButton) {
            resetButton.addEventListener("click", function () {
              contactForm.innerHTML = `
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your Name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Your Email" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                            </div>
                            <button type="submit" class="submit-button">
                                <span class="plus-icon">→</span> Send Message
                            </button>
                        `;
            });
          }
        })
        .catch((error) => {
          // Show error message
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          alert(
            "Oops! There was a problem sending your message. Please try again later."
          );
          console.error("Form submission error:", error);
        });
    });
  }

  // Chatbot functionality
  const chatbotTrigger = document.querySelector(".chatbot-trigger");
  let isChatbotOpen = false; // Track chatbot state

  // Connect chat button to Chatbase with toggle functionality
  chatbotTrigger.addEventListener("click", function (e) {
    console.log("Chat button clicked");

    // Try to toggle Chatbase
    if (window.chatbase) {
      if (isChatbotOpen) {
        // Close the chatbot if it's open
        console.log("Closing Chatbase widget");
        window.chatbase("close");
        isChatbotOpen = false;
        chatbotTrigger.classList.remove("active"); // Remove active class
      } else {
        // Open the chatbot if it's closed
        console.log("Opening Chatbase widget");
        window.chatbase("open");
        isChatbotOpen = true;
        chatbotTrigger.classList.add("active"); // Add active class
      }
    } else {
      console.log("Chatbase not loaded yet");
      // Try again after a delay
      setTimeout(function () {
        if (window.chatbase) {
          console.log("Opening Chatbase widget (delayed)");
          window.chatbase("open");
          isChatbotOpen = true;
          chatbotTrigger.classList.add("active"); // Add active class
        } else {
          console.error("Chatbase still not available");
          alert("Chat is currently unavailable. Please try again later.");
        }
      }, 1000);
    }
  });

  // Listen for chatbot state changes from Chatbase
  window.addEventListener("message", function (event) {
    // Check if the message is from Chatbase
    if (event.data && typeof event.data === "object") {
      // Update our state when Chatbase opens or closes
      if (event.data.type === "chatbase:opened") {
        isChatbotOpen = true;
        chatbotTrigger.classList.add("active"); // Add active class
      } else if (event.data.type === "chatbase:closed") {
        isChatbotOpen = false;
        chatbotTrigger.classList.remove("active"); // Remove active class
      }
    }
  });

  // Theme Switching Functionality
  const themeButtons = document.querySelectorAll(".theme-btn");

  // Set default theme (purple)
  document.documentElement.setAttribute("data-theme", "purple");

  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Update active button
    themeButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-theme") === savedTheme) {
        btn.classList.add("active");
      }
    });
  }

  // Add click event listeners to theme buttons
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");

      // Set the theme
      document.documentElement.setAttribute("data-theme", theme);

      // Save theme preference
      localStorage.setItem("theme", theme);

      // Update active button
      themeButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Update Chatbase widget theme if it exists
      if (window.updateChatbaseTheme) {
        updateChatbaseTheme(theme);
      }

      // Force refresh of widget if open
      if (window.chatbase && isChatbotOpen) {
        setTimeout(() => {
          // Close and reopen to refresh theme
          window.chatbase("close");
          chatbotTrigger.classList.remove("active"); // Temporarily remove active class

          setTimeout(() => {
            window.chatbase("open");
            isChatbotOpen = true; // Ensure state is correct
            chatbotTrigger.classList.add("active"); // Restore active class
          }, 100);
        }, 100);
      }
    });
  });

  const mainProjects = document.querySelector(
    ".projects-showcase:not(.additional-projects)"
  );
  const additionalProjects = document.querySelector(".additional-projects");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let showingAdditional = false;

  function toggleProjects() {
    if (showingAdditional) {
      additionalProjects.style.opacity = "0";
      setTimeout(() => {
        additionalProjects.style.display = "none";
        mainProjects.style.display = "grid";
        setTimeout(() => {
          mainProjects.style.opacity = "1";
        }, 50);
      }, 300);
    } else {
      mainProjects.style.opacity = "0";
      setTimeout(() => {
        mainProjects.style.display = "none";
        additionalProjects.style.display = "grid";
        setTimeout(() => {
          additionalProjects.style.opacity = "1";
        }, 50);
      }, 300);
    }
    showingAdditional = !showingAdditional;
  }

  prevBtn.addEventListener("click", toggleProjects);
  nextBtn.addEventListener("click", toggleProjects);
});
