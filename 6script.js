
const eventManager = {
    title: "Spotlight Event Manager",
    version: "1.0",
    totalEvents: 0,
    
    updateTitle: function(newTitle) {
        this.title = newTitle;
        const titleElement = document.getElementById('manager-title');
        if (titleElement) {
            titleElement.textContent = this.title;
        }
    },
    
    incrementEvents: function() {
        this.totalEvents++;
        const counterElement = document.getElementById('event-counter');
        if (counterElement) {
            counterElement.textContent = `Total Events: ${this.totalEvents}`;
        }
    },
    
    getInfo: function() {
        return `${this.title} v${this.version} - Managing ${this.totalEvents} events`;
    }
};


function changeHeaderStyle() {
    const header = document.querySelector('.demo-header');
    if (header) {
        header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)';
        header.style.transition = 'background 0.5s ease';
    }
}

function toggleImageVisibility() {
    const demoImage = document.getElementById('demo-image');
    if (demoImage) {
        if (demoImage.style.display === 'none') {
            demoImage.style.display = 'flex';
        } else {
            demoImage.style.display = 'none';
        }
    }
}

function changeFontSize() {
    const welcomeMsg = document.getElementById('welcome-message');
    if (welcomeMsg) {
        const currentSize = welcomeMsg.style.fontSize;
        welcomeMsg.style.fontSize = currentSize === '24px' ? '18px' : '24px';
        welcomeMsg.style.transition = 'font-size 0.3s ease';
    }
}

function updateManagerTitle() {
    const newTitle = prompt('Enter new manager title:', eventManager.title);
    if (newTitle && newTitle.trim()) {
        eventManager.updateTitle(newTitle.trim());
    }
}


function handleInteraction(callback, message) {
    return function(event) {
        console.log(message);
        callback(event);
        if (typeof playSound === 'function') {
            playSound('click');
        }
    };
}

const handleButtonClick = handleInteraction(
    () => {
        const welcomeMsg = document.querySelector('#welcome-message');
        if (welcomeMsg) {
            welcomeMsg.style.color = '#ff6b6b';
            welcomeMsg.textContent = 'Welcome to Spotlight - Your events, our passion!';
        }
    },
    'Button clicked with higher-order function!'
);

const handleHover = handleInteraction(
    (e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.transition = 'transform 0.3s ease';
    },
    'Element hovered!'
);

const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
};


document.addEventListener('DOMContentLoaded', function() {
    
    eventManager.updateTitle("Spotlight Event Platform");
    
    
    const styleBtn = document.getElementById('style-btn');
    if (styleBtn) {
        styleBtn.addEventListener('click', handleButtonClick);
        styleBtn.addEventListener('click', changeHeaderStyle);
    }
    
  
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleImageVisibility);
        toggleBtn.addEventListener('mouseover', handleHover);
        toggleBtn.addEventListener('mouseleave', handleMouseLeave);
    }
    
  
    const fontBtn = document.getElementById('font-btn');
    if (fontBtn) {
        fontBtn.addEventListener('dblclick', changeFontSize);
    }
    
    
    const soundBtn = document.getElementById('sound-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            if (typeof playSound === 'function') {
                playSound('success');
            }
        });
    }
    
   
    const hoverBtn = document.getElementById('hover-btn');
    if (hoverBtn) {
        hoverBtn.addEventListener('mouseover', handleHover);
        hoverBtn.addEventListener('mouseleave', handleMouseLeave);
    }
    
    
    const incrementBtn = document.getElementById('increment-btn');
    if (incrementBtn) {
        incrementBtn.addEventListener('click', () => {
            eventManager.incrementEvents();
            console.log(eventManager.getInfo());
        });
    }
    
    
    const updateTitleBtn = document.getElementById('update-title-btn');
    if (updateTitleBtn) {
        updateTitleBtn.addEventListener('click', updateManagerTitle);
    }
    
    console.log('Assignment 6 DOM Manipulation initialized successfully!');
});