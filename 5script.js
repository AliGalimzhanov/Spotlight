
let eventsList = ["Tech Conference", "Music Festival", "Art Exhibition", "Food Fair", "Sports Tournament"];
let featuredEvents = [];


function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = type === 'click' ? 800 : 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.log('Sound not supported');
    }
}


function generateRandomEvent() {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    const resultDiv = document.getElementById('random-result');
    
    let message = `Random Event ID: ${randomNum}<br>`;
    
    if (randomNum % 2 === 0) {
        message += `This is an EVEN number - Premium Event!<br>`;
    } else {
        message += `This is an ODD number - Standard Event!<br>`;
    }
    
    if (randomNum > 50) {
        message += `High Priority Event (Number > 50)`;
    } else {
        message += `Regular Priority Event (Number ≤ 50)`;
    }
    
    if (resultDiv) {
        resultDiv.innerHTML = message;
    }
    
    playSound('click');
}


function compareEventPrices() {
    const price1 = parseFloat(document.getElementById('price1').value);
    const price2 = parseFloat(document.getElementById('price2').value);
    const comparisonResult = document.getElementById('comparison-result');
    
    if (isNaN(price1) || isNaN(price2) || price1 < 0 || price2 < 0) {
        if (comparisonResult) {
            comparisonResult.innerHTML = "Please enter valid prices for both events!";
            comparisonResult.style.color = "#ff6b6b";
        }
        return;
    }
    
    let message = "";
    
    if (price1 > price2) {
        message = `Event A ($${price1}) is MORE EXPENSIVE than Event B ($${price2})`;
    } else if (price1 < price2) {
        message = `Event B ($${price2}) is MORE EXPENSIVE than Event A ($${price1})`;
    } else {
        message = `Both events have the SAME PRICE ($${price1})`;
    }
    
    if (price1 >= 100 && price2 >= 100) {
        message += "<br>Both are PREMIUM events (≥$100)";
    } else if (price1 >= 100 || price2 >= 100) {
        message += "<br>One event is PREMIUM (≥$100)";
    } else {
        message += "<br>Both are STANDARD events (<$100)";
    }
    
    if (comparisonResult) {
        comparisonResult.innerHTML = message;
        comparisonResult.style.color = "#51cf66";
    }
}


function displayEventsList() {
    const listContainer = document.getElementById('events-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    if (eventsList.length === 0) {
        listContainer.innerHTML = '<p style="color: #888;">No events in the list.</p>';
        return;
    }
    
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    
    eventsList.forEach((event, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${event}`;
        li.style.padding = '10px';
        li.style.margin = '5px';
        li.style.backgroundColor = index % 2 === 0 ? 'rgba(81, 207, 102, 0.2)' : 'rgba(116, 192, 252, 0.2)';
        li.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        li.style.borderRadius = '5px';
        li.style.color = '#ffffff';
        ul.appendChild(li);
    });
    
    listContainer.appendChild(ul);
}

function addNewEvent() {
    const newEventInput = document.getElementById('new-event');
    const newEvent = newEventInput ? newEventInput.value.trim() : '';
    
    if (newEvent === '') {
        alert('Please enter an event name!');
        return;
    }
    
    eventsList.push(newEvent);
    if (newEventInput) {
        newEventInput.value = '';
    }
    displayEventsList();
    playSound('click');
}


function generateFeaturedEvents() {
    const container = document.getElementById('featured-events');
    if (!container) return;
    
    container.innerHTML = '';
    
    const eventTypes = ['Conference', 'Workshop', 'Seminar', 'Festival', 'Exhibition'];
    const locations = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
    
    for (let i = 0; i < 10; i++) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'featured-event-item';
        
        const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        
        eventDiv.innerHTML = `
            <h4>Event ${i + 1}: ${randomType}</h4>
            <p>Location: ${randomLocation}</p>
            <p>Date: 2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}</p>
            <p>Price: $${(Math.random() * 100 + 25).toFixed(2)}</p>
        `;
        
        if (i % 2 === 0) {
            eventDiv.style.borderLeft = '4px solid #51cf66';
        } else {
            eventDiv.style.borderLeft = '4px solid #74c0fc';
        }
        
        container.appendChild(eventDiv);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    
    displayEventsList();
    
    
    const randomBtn = document.getElementById('random-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', generateRandomEvent);
    }
    
    
    const compareBtn = document.getElementById('compare-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', compareEventPrices);
    }
    
    
    const addEventBtn = document.getElementById('add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', addNewEvent);
    }
    
    
    const generateEventsBtn = document.getElementById('generate-events-btn');
    if (generateEventsBtn) {
        generateEventsBtn.addEventListener('click', generateFeaturedEvents);
    }
    
   
    const newEventInput = document.getElementById('new-event');
    if (newEventInput) {
        newEventInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addNewEvent();
            }
        });
    }
    
    console.log('Assignment 5 JavaScript initialized successfully!');
});