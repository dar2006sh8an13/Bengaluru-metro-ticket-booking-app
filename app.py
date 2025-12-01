from flask import Flask, render_template, request
import datetime

app = Flask(__name__)

# Bengaluru Metro Stations (sample list)
STATIONS = [
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
]

# Approximate fare matrix based on distance (in ₹)
# This is simplified; real fares are based on exact distance
FARE_MATRIX = {
    (0, 3): 10,   # 0-3 km
    (3, 6): 15,   # 3-6 km
    (6, 9): 20,   # 6-9 km
    (9, 12): 25,  # 9-12 km
    (12, 15): 30, # 12-15 km
    (15, 18): 35, # 15-18 km
    (18, 21): 40, # 18-21 km
    (21, 24): 45, # 21-24 km
    (24, float('inf')): 50  # 24+ km
}

def calculate_fare(from_station, to_station):
    # Simplified: assume stations are in order, calculate distance based on index difference
    from_idx = STATIONS.index(from_station)
    to_idx = STATIONS.index(to_station)
    distance = abs(from_idx - to_idx) * 2  # Approximate 2km per station
    for (min_dist, max_dist), fare in FARE_MATRIX.items():
        if min_dist <= distance < max_dist:
            return fare
    return 50  # Max fare

@app.route('/')
def home():
    return render_template('index.html', stations=STATIONS)

@app.route('/book', methods=['POST'])
def book():
    from_station = request.form['from_station']
    to_station = request.form['to_station']
    if from_station == to_station:
        return render_template('index.html', stations=STATIONS, error="From and To stations cannot be the same.")
    fare = calculate_fare(from_station, to_station)
    ticket_id = f"BMRC-{from_station[:3].upper()}-{to_station[:3].upper()}-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
    ticket_data = f"BMRCL Ticket\nTicket ID: {ticket_id}\nFrom: {from_station}\nTo: {to_station}\nFare: ₹{fare}\nDate: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\nHappy Journey!"

    return render_template('index.html', stations=STATIONS, ticket_data=ticket_data, fare=fare, from_station=from_station, to_station=to_station)

if __name__ == '__main__':
    app.run(debug=True)
