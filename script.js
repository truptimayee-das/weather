class WeatherApp {
    constructor() {
        this.apiKey = 'e36f541787664f561c41e6d9ae477761'; // You can get free API key from OpenWeatherMap
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderRecentSearches();
        
        // Load default city weather
        this.getWeatherByCity('London');
    }

    bindEvents() {
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.handleSearch();
        });

        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    handleSearch() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();
        
        if (city) {
            this.getWeatherByCity(city);
            cityInput.value = '';
        }
    }

    async getWeatherByCity(city) {
        this.showLoading();
        this.hideError();
        this.hideWeatherInfo();

        try {
            // For demo purposes, using mock data since we don't have a real API key
            // In real app, you would use: const response = await fetch(`${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
            
            // Mock API call - replace with real API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock data - in real app, you would use data from API response
            const mockData = {
                name: city,
                main: {
                    temp: Math.round(Math.random() * 30 + 5),
                    feels_like: Math.round(Math.random() * 30 + 5),
                    humidity: Math.round(Math.random() * 50 + 30)
                },
                weather: [{
                    main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
                    description: 'Partly cloudy',
                    icon: '01d'
                }],
                wind: {
                    speed: Math.round(Math.random() * 20 + 1)
                }
            };

            this.displayWeather(mockData);
            this.addToRecentSearches(city);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError();
        }
    }

    displayWeather(data) {
        this.hideLoading();
        this.showWeatherInfo();

        document.getElementById('cityName').textContent = `${data.name}, ${data.sys?.country || ''}`;
        document.getElementById('currentTemp').textContent = Math.round(data.main.temp);
        document.getElementById('weatherDescription').textContent = data.weather[0].description;
        document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;

        // In real app, you would use: document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('weatherIcon').src = 'https://via.placeholder.com/100x100/74b9ff/ffffff?text=☀️';
    }

    addToRecentSearches(city) {
        // Remove if already exists
        this.recentSearches = this.recentSearches.filter(item => item !== city);
        
        // Add to beginning
        this.recentSearches.unshift(city);
        
        // Keep only last 5 searches
        this.recentSearches = this.recentSearches.slice(0, 5);
        
        // Save to localStorage
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        
        // Update UI
        this.renderRecentSearches();
    }

    renderRecentSearches() {
        const recentList = document.getElementById('recentList');
        recentList.innerHTML = this.recentSearches.map(city => `
            <div class="recent-item" onclick="weatherApp.getWeatherByCity('${city}')">
                ${city}
            </div>
        `).join('');
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showWeatherInfo() {
        document.getElementById('weatherInfo').classList.remove('hidden');
    }

    hideWeatherInfo() {
        document.getElementById('weatherInfo').classList.add('hidden');
    }

    showError() {
        document.getElementById('errorMessage').classList.remove('hidden');
        this.hideLoading();
    }

    hideError() {
        document.getElementById('errorMessage').classList.add('hidden');
    }
}

// Initialize weather app
const weatherApp = new WeatherApp();