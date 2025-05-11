import tkinter as tk
import requests
from tkinter import messagebox

API_KEY = 'abc123xyz456'  # Replace with your OpenWeatherMap API key
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

def get_weather():
    city = city_entry.get()
    if city:
        complete_url = f"{BASE_URL}q={city}&appid={API_KEY}&units=metric"
        response = requests.get(complete_url)
        data = response.json()

        if data['cod'] == 200:
            main = data['main']
            weather = data['weather'][0]
            temperature = main['temp']
            pressure = main['pressure']
            humidity = main['humidity']
            description = weather['description']

            weather_info = f"Temperature: {temperature}°C\n" \
                           f"Pressure: {pressure} hPa\n" \
                           f"Humidity: {humidity}%\n" \
                           f"Description: {description.capitalize()}"
            messagebox.showinfo("Weather Info", weather_info)
        else:
            messagebox.showerror("Error", "City not found!")
    else:
        messagebox.showwarning("Input Error", "Please enter a city name.")

# Create the main window
root = tk.Tk()
root.title("Weather App")
root.geometry("300x200")

# Create and place the widgets
city_label = tk.Label(root, text="Enter City Name:")
city_label.pack(pady=10)

city_entry = tk.Entry(root)
city_entry.pack(pady=5)

get_weather_button = tk.Button(root, text="Get Weather", command=get_weather)
get_weather_button.pack(pady=20)

# Run the application
root.mainloop()
