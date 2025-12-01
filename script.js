// Bengaluru Metro Ticket Booking - JavaScript

// Stations list (same as backend)
const stations = [
    "Majestic", "Shivajinagar", "Indiranagar", "Halasuru", "Trinity", "Mahalaxmi",
    "Rajajinagar", "Mahakavi Kuvempu Road", "Srirampura", "Krantiveera Sangolli Rayanna Railway Station",
    "Nadaprabhu Kempegowda Station", "Sir M. Visvesvaraya Station", "Dr. B.R. Ambedkar Station",
    "Cubbon Park", "Vidhana Soudha", "Civil Court", "J.C. Road", "Lalbagh", "South End Circle",
    "Jayanagar", "Rashtreeya Vidyalaya Road", "Banashankari", "Jayaprakash Nagar", "Yelachenahalli",
    "Konanakunte Cross", "Doddakallasandra", "Vajrahalli", "Thalaghattapura", "Silk Institute",
    "Kengeri", "Kengeri Bus Terminal", "Pattanagere", "Jnanabharathi", "Lalbagh Road",
    "National College", "Lakkasandra", "Magadi Road", "Hosahalli", "Vijayanagar", "Attiguppe",
    "Deepanjali Nagar", "Mysore Road", "Nayandahalli", "Rajarajeshwari Nagar", "Jnanabharathi",
    "Pattanagere", "Kengeri Bus Terminal", "Kengeri", "Silk Institute", "Thalaghattapura",
    "Vajrahalli", "Doddakallasandra", "Konanakunte Cross", "Yelachenahalli", "Jayaprakash Nagar",
    "Banashankari", "Rashtreeya Vidyalaya Road", "Jayanagar", "South End Circle", "Lalbagh",
    "J.C. Road", "Civil Court", "Vidhana Soudha", "Cubbon Park", "Dr. B.R. Ambedkar Station",
    "Sir M. Visvesvaraya Station", "Nadaprabhu Kempegowda Station", "Krantiveera Sangolli Rayanna Railway Station",
    "Srirampura", "Mahakavi Kuvempu Road", "Rajajinagar", "Mahalaxmi", "Trinity", "Halasuru",
    "Indiranagar", "Shivajinagar", "Majestic"
];

// Fare matrix (same as backend)
const fareMatrix = {
    '0-3': 10,
    '3-6': 15,
    '6-9': 20,
    '9-12': 25,
    '12-15': 30,
    '15-18': 35,
    '18-21': 40,
    '21-24': 45,
    '24+': 50
};

function calculateFare(fromStation, toStation) {
    const fromIdx = stations.indexOf(fromStation);
    const toIdx = stations.indexOf(toStation);
    const distance = Math.abs(fromIdx - toIdx) * 2; // Approximate 2km per station

    if (distance < 3) return fareMatrix['0-3'];
    if (distance < 6) return fareMatrix['3-6'];
    if (distance < 9) return fareMatrix['6-9'];
    if (distance < 12) return fareMatrix['9-12'];
    if (distance < 15) return fareMatrix['12-15'];
    if (distance < 18) return fareMatrix['15-18'];
    if (distance < 21) return fareMatrix['18-21'];
    if (distance < 24) return fareMatrix['21-24'];
    return fareMatrix['24+'];
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateFareBtn = document.getElementById('calculate-fare');
    const bookTicketBtn = document.getElementById('book-ticket');
    const fareDisplay = document.getElementById('fare-display');
    const fromStationSelect = document.getElementById('from_station');
    const toStationSelect = document.getElementById('to_station');
    const bookingForm = document.getElementById('booking-form');

    // Initially disable book ticket button
    bookTicketBtn.disabled = true;
    bookTicketBtn.style.opacity = '0.5';

    // Calculate fare button click
    calculateFareBtn.addEventListener('click', function() {
        const fromStation = fromStationSelect.value;
        const toStation = toStationSelect.value;

        if (!fromStation || !toStation) {
            alert('Please select both From and To stations.');
            return;
        }

        if (fromStation === toStation) {
            fareDisplay.textContent = 'Error: From and To stations cannot be the same.';
            fareDisplay.style.background = '#ffebee';
            fareDisplay.style.color = '#f44336';
            fareDisplay.style.display = 'block';
            bookTicketBtn.disabled = true;
            bookTicketBtn.style.opacity = '0.5';
            return;
        }

        const fare = calculateFare(fromStation, toStation);
        fareDisplay.textContent = `Fare: ₹${fare}`;
        fareDisplay.style.background = '#e8f5e8';
        fareDisplay.style.color = '#4caf50';
        fareDisplay.style.display = 'block';

        // Enable book ticket button
        bookTicketBtn.disabled = false;
        bookTicketBtn.style.opacity = '1';

        // Add animation
        fareDisplay.style.animation = 'none';
        setTimeout(() => {
            fareDisplay.style.animation = 'fadeInUp 0.5s ease-out';
        }, 10);
    });

    // Form submission validation
    bookingForm.addEventListener('submit', function(e) {
        const fromStation = fromStationSelect.value;
        const toStation = toStationSelect.value;

        if (!fromStation || !toStation) {
            e.preventDefault();
            alert('Please select both From and To stations.');
            return;
        }

        if (fromStation === toStation) {
            e.preventDefault();
            alert('From and To stations cannot be the same.');
            return;
        }

        if (bookTicketBtn.disabled) {
            e.preventDefault();
            alert('Please calculate the fare before booking.');
            return;
        }
    });

    // Print ticket function
    window.printTicket = function() {
        window.print();
    };

    // Add some interactive effects
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            // Reset fare display when stations change
            fareDisplay.style.display = 'none';
            bookTicketBtn.disabled = true;
            bookTicketBtn.style.opacity = '0.5';
        });
    });
});
