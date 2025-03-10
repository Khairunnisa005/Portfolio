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
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


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
    $(document).ready(function() {
        // Initialize Isotope with proper settings
        var $grid = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 5
            },
            percentPosition: false,
            horizontalOrder: true
        });

        // Make sure all items are visible initially
        $('.portfolio-item').show();

        // Filter items on button click
        $('#portfolio-flters li').on('click', function() {
            var filterValue = $(this).attr('data-filter');
            
            // Update active class
            $('#portfolio-flters li').removeClass('active');
            $(this).addClass('active');
            
            // Filter items
            $grid.isotope({ 
                filter: filterValue,
                layoutMode: 'fitRows',
                fitRows: {
                    gutter: 5
                }
            });
        });

        // Layout Isotope after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
        });
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
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

    // Portfolio filtering
    const portfolioFilters = document.querySelectorAll('#portfolio-flters li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Function to arrange items in rows of 3
    const arrangeItems = (items) => {
        const container = document.querySelector('.portfolio-container');
        const rows = Math.ceil(items.length / 3);
        
        // Reset container
        container.style.gridTemplateRows = `repeat(${rows}, 220px)`;
        
        // Show/hide items
        portfolioItems.forEach(item => item.style.display = 'none');
        items.forEach(item => item.style.display = 'block');
    };

    // Initial arrangement
    arrangeItems(Array.from(portfolioItems));

    // Filter click handler
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class
            portfolioFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filterValue = this.getAttribute('data-filter');
            const filteredItems = filterValue === '*' 
                ? Array.from(portfolioItems)
                : Array.from(portfolioItems).filter(item => item.classList.contains(filterValue));
            
            // Arrange filtered items
            arrangeItems(filteredItems);
        });
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

    // Portfolio isotope initialization
    let $grid = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        fitRows: {
            gutter: 8
        }
    });

    // Layout Isotope after each image loads
    $grid.imagesLoaded().progress(function() {
        $grid.isotope('layout');
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

// Lightbox
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'disableScrolling': true
});

// Audio Player Control
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    }
});

