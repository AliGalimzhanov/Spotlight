document.addEventListener('DOMContentLoaded', function() {
    
    const menu = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');
    
    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    }
    
    window.onscroll = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
    
    
    var homeSwiper = new Swiper(".home-slider", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }
    });
    
    
    var reviewSwiper = new Swiper(".review-slider", {
        slidesPerView: 1,
        grabCursor: true,
        loop: true,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            1050: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    });
});

document.getElementById('bookingBtn').addEventListener('click', function() {
    window.location.href = 'booking.html';
});

const unavailableDates = ["2025-05-15", "2025-05-20", "2025-05-25"];
      
      flatpickr('#event-date', {
        minDate: "today",
        dateFormat: "Y-m-d",
        disable: unavailableDates,
        onChange: function(selectedDates, dateStr) {
          document.getElementById('summaryDate').textContent = dateStr;
          updateTimeSlots(dateStr);
        }
      });
      
      const timeSlots = document.querySelectorAll('.time-slot:not(.unavailable)');
      timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
          timeSlots.forEach(s => s.classList.remove('selected'));
          this.classList.add('selected');
          document.getElementById('summaryTime').textContent = this.dataset.time;
        });
      });
      
      document.getElementById('event-type').addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        document.getElementById('summaryType').textContent = selectedOption.text;
      });
      
      document.getElementById('guests').addEventListener('input', function() {
        document.getElementById('summaryGuests').textContent = this.value;
      });
      
      document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('event-date').value;
        const selectedTimeSlot = document.querySelector('.time-slot.selected');
        
        if (!date) {
          alert('Please select an event date');
          return;
        }
        
        if (!selectedTimeSlot) {
          alert('Please select an event time');
          return;
        }
        
        document.getElementById('successMessage').style.display = 'block';
        
        document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          this.reset();
          document.getElementById('summaryDate').textContent = 'Not selected';
          document.getElementById('summaryTime').textContent = 'Not selected';
          document.getElementById('summaryType').textContent = 'Not selected';
          document.getElementById('summaryGuests').textContent = '0';
          document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
          setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
          }, 3000);
        }, 3000);
      });
      
      function updateTimeSlots(dateStr) {
        const timeSlots = document.querySelectorAll('.time-slot');
        
        timeSlots.forEach(slot => {
          slot.classList.remove('unavailable');
          slot.classList.remove('selected');
        });
        
        if (dateStr === "2025-05-12") {
          document.querySelector('[data-time="09:00"]').classList.add('unavailable');
          document.querySelector('[data-time="10:00"]').classList.add('unavailable');
          document.querySelector('[data-time="17:00"]').classList.add('unavailable');
        } else if (dateStr === "2025-05-13") {
          document.querySelector('[data-time="13:00"]').classList.add('unavailable');
          document.querySelector('[data-time="14:00"]').classList.add('unavailable');
          document.querySelector('[data-time="19:00"]').classList.add('unavailable');
        } else if (dateStr === "2025-05-14") {
          document.querySelector('[data-time="11:00"]').classList.add('unavailable');
          document.querySelector('[data-time="16:00"]').classList.add('unavailable');
          document.querySelector('[data-time="20:00"]').classList.add('unavailable');
        }
        
        document.getElementById('summaryTime').textContent = 'Not selected';
      }
    
    
