/**
* Template Name: Tour
* Template URL: https://bootstrapmade.com/tour-bootstrap-travel-website-template/
* Updated: Jul 01 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();
// mobile-dropdown-fix.js
// This file should be included after main.js in your HTML

document.addEventListener('DOMContentLoaded', function () {
    // Initialize mobile dropdown functionality
    initializeMobileDropdowns();

    // Add touch event listeners for better mobile experience
    setupTouchEvents();

    // Handle window resize events
    handleResponsiveBehavior();
});

function initializeMobileDropdowns() {
    console.log('Initializing mobile dropdown functionality...');

    // Get all dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown > a, .navmenu ul li.dropdown > a');

    dropdownToggles.forEach(toggle => {
        // Remove any existing click events that might interfere
        toggle.removeEventListener('click', handleDropdownClick);

        // Add our custom click handler
        toggle.addEventListener('click', handleDropdownClick);

        // Add keyboard accessibility
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', 'false');

        // Add touch feedback visual
        toggle.style.transition = 'all 0.3s ease';
    });

    // Get all dropdown menus
    const dropdownMenus = document.querySelectorAll('.dropdown ul, .navmenu ul li.dropdown ul');

    dropdownMenus.forEach(menu => {
        // Add mobile-specific classes
        menu.classList.add('mobile-dropdown-menu');

        // Set aria attributes
        menu.setAttribute('aria-hidden', 'true');
        menu.setAttribute('aria-label', 'Dropdown menu');

        // Add transition for smooth animations
        menu.style.transition = 'all 0.3s ease';

        // Ensure proper positioning for mobile
        if (window.innerWidth <= 992) {
            menu.style.position = 'relative';
            menu.style.width = '100%';
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown') && !event.target.closest('.navmenu ul li.dropdown')) {
            closeAllDropdowns();
        }
    });

    // Close dropdowns when pressing Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAllDropdowns();
        }
    });
}

function handleDropdownClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const dropdown = this.closest('.dropdown') || this.closest('.navmenu ul li.dropdown');
    const menu = dropdown.querySelector('ul');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';

    // Close all other dropdowns first (for mobile)
    if (window.innerWidth <= 992) {
        closeAllDropdownsExcept(dropdown);
    }

    // Toggle current dropdown
    if (isExpanded) {
        closeDropdown(this, menu);
    } else {
        openDropdown(this, menu);
    }

    // Add visual feedback
    this.style.backgroundColor = isExpanded ? '' : 'rgba(26, 54, 93, 0.1)';
}

function openDropdown(toggle, menu) {
    // Set aria attributes
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');

    // Add active class
    toggle.classList.add('active');
    menu.classList.add('active');

    // Animate menu opening
    if (window.innerWidth <= 992) {
        // For mobile: slide down animation
        menu.style.display = 'block';
        menu.style.height = '0';
        menu.style.overflow = 'hidden';

        // Calculate height
        const menuHeight = menu.scrollHeight;

        // Animate
        setTimeout(() => {
            menu.style.height = menuHeight + 'px';
            menu.style.opacity = '1';
        }, 10);

        // Add backdrop for mobile
        addMobileBackdrop();
    } else {
        // For desktop: normal display
        menu.style.display = 'block';
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
    }

    // Rotate toggle icon if present
    const icon = toggle.querySelector('.toggle-dropdown, .bi-chevron-down');
    if (icon) {
        icon.style.transform = 'rotate(180deg)';
        icon.style.transition = 'transform 0.3s ease';
    }
}

function closeDropdown(toggle, menu) {
    // Set aria attributes
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');

    // Remove active class
    toggle.classList.remove('active');
    menu.classList.remove('active');

    // Animate menu closing
    if (window.innerWidth <= 992) {
        // For mobile: slide up animation
        menu.style.height = '0';
        menu.style.opacity = '0';

        // Hide after animation
        setTimeout(() => {
            menu.style.display = 'none';
        }, 300);

        // Remove backdrop if no dropdowns are open
        removeMobileBackdropIfNoneOpen();
    } else {
        // For desktop
        menu.style.display = 'none';
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-10px)';
    }

    // Reset toggle icon
    const icon = toggle.querySelector('.toggle-dropdown, .bi-chevron-down');
    if (icon) {
        icon.style.transform = 'rotate(0deg)';
    }

    // Reset background color
    toggle.style.backgroundColor = '';
}

function closeAllDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown > a, .navmenu ul li.dropdown > a');
    const dropdownMenus = document.querySelectorAll('.dropdown ul, .navmenu ul li.dropdown ul');

    dropdownToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        toggle.style.backgroundColor = '';

        // Reset toggle icon
        const icon = toggle.querySelector('.toggle-dropdown, .bi-chevron-down');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });

    dropdownMenus.forEach(menu => {
        menu.setAttribute('aria-hidden', 'true');
        menu.classList.remove('active');

        if (window.innerWidth <= 992) {
            menu.style.height = '0';
            menu.style.opacity = '0';
            setTimeout(() => {
                menu.style.display = 'none';
            }, 300);
        } else {
            menu.style.display = 'none';
            menu.style.opacity = '0';
        }
    });

    // Remove mobile backdrop
    removeMobileBackdrop();
}

function closeAllDropdownsExcept(exceptDropdown) {
    const allDropdowns = document.querySelectorAll('.dropdown, .navmenu ul li.dropdown');

    allDropdowns.forEach(dropdown => {
        if (dropdown !== exceptDropdown) {
            const toggle = dropdown.querySelector('a');
            const menu = dropdown.querySelector('ul');

            if (toggle && menu) {
                closeDropdown(toggle, menu);
            }
        }
    });
}

function addMobileBackdrop() {
    // Remove existing backdrop if any
    removeMobileBackdrop();

    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-dropdown-backdrop';
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: block;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Add to body
    document.body.appendChild(backdrop);

    // Fade in
    setTimeout(() => {
        backdrop.style.opacity = '1';
    }, 10);

    // Close dropdowns when backdrop is clicked
    backdrop.addEventListener('click', function () {
        closeAllDropdowns();
    });

    // Prevent body scrolling when backdrop is visible
    document.body.style.overflow = 'hidden';
}

function removeMobileBackdrop() {
    const backdrop = document.querySelector('.mobile-dropdown-backdrop');
    if (backdrop) {
        backdrop.style.opacity = '0';
        setTimeout(() => {
            backdrop.remove();
        }, 300);
    }

    // Restore body scrolling
    document.body.style.overflow = '';
}

function removeMobileBackdropIfNoneOpen() {
    const openDropdowns = document.querySelectorAll('.dropdown > a[aria-expanded="true"], .navmenu ul li.dropdown > a[aria-expanded="true"]');

    if (openDropdowns.length === 0) {
        removeMobileBackdrop();
    }
}

function setupTouchEvents() {
    // Add touch feedback for dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown ul li a, .navmenu ul li.dropdown ul li a');

    dropdownItems.forEach(item => {
        // Add touch start/end events for visual feedback
        item.addEventListener('touchstart', function () {
            this.style.backgroundColor = 'rgba(26, 54, 93, 0.1)';
        });

        item.addEventListener('touchend', function () {
            this.style.backgroundColor = '';
        });

        // Prevent click delay on mobile
        item.addEventListener('touchstart', function (e) {
            e.preventDefault();
        }, { passive: false });
    });

    // Handle swipe gestures (optional - for closing dropdowns with swipe)
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', function (e) {
        if (!e.touches || e.touches.length === 0) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = Math.abs(touchEndX - touchStartX);
        const diffY = Math.abs(touchEndY - touchStartY);

        // If vertical swipe is significant, close dropdowns
        if (diffY > 50 && diffY > diffX) {
            closeAllDropdowns();
        }
    });
}

function handleResponsiveBehavior() {
    let resizeTimer;

    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const isMobile = window.innerWidth <= 992;

            const dropdownMenus = document.querySelectorAll('.dropdown ul, .navmenu ul li.dropdown ul');
            const dropdownToggles = document.querySelectorAll('.dropdown > a, .navmenu ul li.dropdown > a');

            if (isMobile) {
                // Mobile behavior
                dropdownMenus.forEach(menu => {
                    menu.style.position = 'relative';
                    menu.style.width = '100%';
                    menu.style.boxShadow = 'none';
                    menu.style.border = '1px solid var(--border-color)';
                    menu.style.borderRadius = '8px';
                    menu.style.marginTop = '5px';
                    menu.style.maxHeight = 'none';
                });

                dropdownToggles.forEach(toggle => {
                    toggle.style.padding = '12px 15px';
                    toggle.style.display = 'flex';
                    toggle.style.justifyContent = 'space-between';
                    toggle.style.alignItems = 'center';
                });
            } else {
                // Desktop behavior - reset to original
                closeAllDropdowns();

                dropdownMenus.forEach(menu => {
                    menu.style.cssText = ''; // Reset inline styles
                    menu.classList.remove('active');
                });

                dropdownToggles.forEach(toggle => {
                    toggle.style.cssText = ''; // Reset inline styles
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.classList.remove('active');

                    // Reset toggle icon
                    const icon = toggle.querySelector('.toggle-dropdown, .bi-chevron-down');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                });

                // Remove mobile backdrop
                removeMobileBackdrop();
            }
        }, 250); // Debounce resize events
    });
}

// Add CSS styles dynamically for better mobile experience
function injectMobileStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile Dropdown Styles */
        @media (max-width: 992px) {
            .navmenu ul li.dropdown > ul {
                position: relative !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                box-shadow: none !important;
                background: var(--light-gray) !important;
                border: 1px solid var(--border-color) !important;
                border-radius: 8px !important;
                margin: 5px 0 !important;
                padding: 10px 0 !important;
                z-index: 1000 !important;
            }
            
            .navmenu ul li.dropdown > ul li {
                width: 100% !important;
            }
            
            .navmenu ul li.dropdown > ul li a {
                padding: 12px 20px !important;
                color: var(--primary-blue) !important;
                font-weight: 500 !important;
                display: block !important;
                width: 100% !important;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
            }
            
            .navmenu ul li.dropdown > ul li:last-child a {
                border-bottom: none !important;
            }
            
            .navmenu ul li.dropdown > ul li a:hover {
                background: rgba(26, 54, 93, 0.1) !important;
                color: var(--primary-red) !important;
            }
            
            .dropdown > ul {
                background: white !important;
                border: 1px solid var(--border-color) !important;
                border-radius: 8px !important;
                margin: 10px 0 !important;
                padding: 0 !important;
            }
            
            .dropdown > ul li a {
                padding: 12px 15px !important;
                border-bottom: 1px solid var(--border-color) !important;
            }
            
            .dropdown > ul li:last-child a {
                border-bottom: none !important;
            }
            
            /* Mobile menu toggle animation */
            .mobile-nav-toggle {
                display: block !important;
                position: absolute;
                right: 15px;
                top: 20px;
                font-size: 24px;
                cursor: pointer;
                color: var(--primary-blue);
                z-index: 1001;
            }
            
            /* Active state for dropdowns */
            .navmenu ul li.dropdown > a.active,
            .dropdown > a.active {
                background: var(--primary-blue) !important;
                color: white !important;
                border-radius: 6px;
            }
            
            .navmenu ul li.dropdown > a.active .bi-chevron-down,
            .dropdown > a.active .bi-chevron-down {
                color: white !important;
            }
            
            /* Prevent horizontal scroll */
            .navmenu {
                overflow-y: auto;
                overflow-x: hidden;
                max-height: 80vh;
            }
            
            /* Better touch targets */
            .navmenu ul li a,
            .dropdown > a {
                min-height: 44px;
                display: flex;
                align-items: center;
            }
            
            /* Mobile backdrop */
            .mobile-dropdown-backdrop {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: rgba(0, 0, 0, 0.5) !important;
                z-index: 999 !important;
            }
        }
        
        @media (max-width: 768px) {
            .navmenu ul li.dropdown > ul {
                padding: 5px 0 !important;
            }
            
            .navmenu ul li.dropdown > ul li a {
                padding: 10px 15px !important;
                font-size: 0.9rem !important;
            }
            
            .dropdown > a {
                padding: 10px !important;
                font-size: 0.9rem !important;
            }
        }
        
        @media (max-width: 480px) {
            .navmenu ul li.dropdown > ul li a {
                padding: 8px 12px !important;
            }
            
            .dropdown > a {
                padding: 8px !important;
            }
        }
        
        /* Smooth transitions */
        .navmenu ul li.dropdown > ul,
        .dropdown > ul {
            transition: all 0.3s ease !important;
        }
        
        /* Accessibility focus styles */
        .navmenu ul li a:focus,
        .dropdown > a:focus {
            outline: 2px solid var(--primary-red) !important;
            outline-offset: 2px !important;
        }
        
        /* Loading state */
        .dropdown-loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .dropdown-loading::after {
            content: '';
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid var(--border-color);
            border-top-color: var(--primary-red);
            border-radius: 50%;
            animation: dropdown-spinner 0.6s linear infinite;
            margin-left: 8px;
        }
        
        @keyframes dropdown-spinner {
            to { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Inject mobile styles
    injectMobileStyles();

    // Initialize dropdown functionality
    initializeMobileDropdowns();
    setupTouchEvents();
    handleResponsiveBehavior();

    // Enhance existing mobile nav toggle if present
    enhanceMobileNavToggle();

    console.log('Mobile dropdown functionality initialized successfully.');
});

// Enhance existing mobile navigation toggle
function enhanceMobileNavToggle() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

    if (mobileNavToggle) {
        // Close dropdowns when mobile menu is toggled
        mobileNavToggle.addEventListener('click', function () {
            setTimeout(() => {
                // Reset all dropdowns when mobile menu opens/closes
                closeAllDropdowns();
            }, 100);
        });

        // Add aria label for accessibility
        mobileNavToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }
}

// Export functions for potential manual control
window.MobileDropdowns = {
    init: initializeMobileDropdowns,
    closeAll: closeAllDropdowns,
    open: function (dropdownSelector) {
        const toggle = document.querySelector(dropdownSelector + ' > a');
        const menu = document.querySelector(dropdownSelector + ' > ul');
        if (toggle && menu) {
            openDropdown(toggle, menu);
        }
    },
    close: function (dropdownSelector) {
        const toggle = document.querySelector(dropdownSelector + ' > a');
        const menu = document.querySelector(dropdownSelector + ' > ul');
        if (toggle && menu) {
            closeDropdown(toggle, menu);
        }
    }
};