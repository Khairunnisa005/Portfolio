(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
        if ($videoSrc) {
            $('#videoModal').on('shown.bs.modal', function () {
                $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
            });
            
            $('#videoModal').on('hide.bs.modal', function () {
                $("#video").attr('src', '');
            });
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    $(window).on('load', function() {
        var $grid = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 20
            }
        });

        // Filter items on button click
        $('#portfolio-flters li').on('click', function() {
            var filterValue = $(this).attr('data-filter');
            $('#portfolio-flters li').removeClass('active');
            $(this).addClass('active');
            $grid.isotope({ filter: filterValue });
        });

        // Layout Isotope after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
        });
    });

})(jQuery);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const value = bar.getAttribute('aria-valuenow');
        bar.style.width = value + '%';
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking a nav link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Audio Player Control
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (musicToggle && bgMusic) {
        // Set initial volume and display
        bgMusic.volume = 0.3;
        musicToggle.style.display = 'block';
        
        // Function to play music
        async function playMusic() {
            try {
                await bgMusic.play();
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            } catch (error) {
                console.error("Playback failed:", error);
                // Try playing again after user interaction
                musicToggle.addEventListener('click', function playOnClick() {
                    bgMusic.play().then(() => {
                        musicToggle.classList.add('playing');
                        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                        musicToggle.removeEventListener('click', playOnClick);
                    }).catch(e => console.error("Playback failed again:", e));
                }, { once: true });
            }
        }

        // Function to pause music
        function pauseMusic() {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }

        // Event listener for music toggle button
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });

        // Handle audio errors
        bgMusic.addEventListener('error', function(e) {
            console.error('Audio error:', e);
            alert('Error loading music file. Please check if the file exists and try again.');
        });
    }

    // Lightbox configuration
    $(document).ready(function() {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'disableScrolling': true,
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'alwaysShowNavOnTouchDevices': true
        });
    });

    // Update portfolio item links for Lightbox
    $('.portfolio-btn a[data-lightbox]').each(function() {
        $(this).attr('data-title', $(this).closest('.portfolio-img').find('h5').text());
    });
});

// Progress Bar Animation
function animateProgressBars() {
    $('.progress-bar').each(function() {
        let width = $(this).attr('aria-valuenow') + '%';
        $(this).css('width', width);
    });
}

// Trigger progress bar animation when in view
$(window).on('load scroll', function() {
    if ($('.skills').isInViewport()) {
        animateProgressBars();
    }
});

// Helper function to check if element is in viewport
$.fn.isInViewport = function() {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

