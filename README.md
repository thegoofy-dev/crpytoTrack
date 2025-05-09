# CryptoTrack 🚀

A modern cryptocurrency tracking application built with React, TypeScript, and Vite that allows users to monitor crypto prices, manage portfolios, set price alerts, and more.

## 🌟 Features

### Real-Time Cryptocurrency Tracking

- Live price updates for various cryptocurrencies

- Detailed price charts and market data

- Multi-currency support (USD, EUR, INR)

- Search functionality for finding specific cryptocurrencies

### Portfolio Management

- Add and track multiple crypto assets

- Calculate total portfolio value

- Track profit/loss for individual assets and overall portfolio

- Historical performance tracking

- Automatic price updates

### Price Alerts

- Set custom price alerts for any cryptocurrency

- Multiple alert conditions (above/below price, percentage change)

- Real-time notifications when alert conditions are met

- Manage and delete alerts

### Price Converter

- Convert between different cryptocurrencies

- Real-time conversion rates

- Support for multiple cryptocurrencies

- User-friendly interface

### Additional Features

- Responsive design for mobile and desktop

- Dark theme optimized for crypto traders

- Suggestion system for user feedback

- Integration with CoinGecko API

- Email notifications via EmailJS

## 🔧 Technologies Used

- **Frontend Framework**: React 19.1.0

- **Language**: TypeScript 5.8.3

- **Build Tool**: Vite 6.3.5

- **Routing**: React Router DOM 7.5.3

- **Charts**: Recharts 2.15.3

- **HTTP Client**: Axios 1.9.0

- **UI Components**: React Icons 5.5.0

- **Notifications**: React Toastify 11.0.5

- **Email Service**: EmailJS Browser 4.4.1

- **State Management**: React Context API

## 📦 Installation

1\. Clone the repository:

```bash

git clone https://github.com/yourusername/cryptotrack.git

cd cryptotrack

```

2\. Install dependencies:

```bash

npm install

```

3\. Create a .env file in the root directory with the following variables:

```env

VITE_CG_API_KEY=your_coingecko_api_key

VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id

VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id

VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

```

4\. Start the development server:

```bash

npm run dev

```

## 🚀 Usage

### Home Page

- View trending cryptocurrencies

- Search for specific coins

- Access detailed price information

### Portfolio Management

1\. Navigate to the Portfolio page

2\. Add new crypto assets with purchase details

3\. Monitor your portfolio's performance

4\. Remove assets as needed

### Price Alerts

1\. Go to the Alerts page

2\. Set up new price alerts

3\. Choose alert conditions

4\. Receive notifications when conditions are met

### Price Converter

1\. Access the converter tool

2\. Select source and target cryptocurrencies

3\. Enter the amount to convert

4\. View real-time conversion results

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers

- Tablets

- Mobile devices

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server

- `npm run build` - Build for production

- `npm run lint` - Lint the codebase

- `npm run preview` - Preview production build

### Project Structure

```

cryptotrack/

├── src/
│   ├── components/
│   │   ├── Footer/
│   │   ├── LineChart/
│   │   ├── Navbar/
│   │   ├── Portfolio/
│   │   ├── PriceAlerts/
│   │   ├── PriceConverter/
│   │   └── SuggestionForm/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── App.tsx
├── public/
└── package.json

```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data

- [EmailJS](https://www.emailjs.com/) for email services

- All contributors and maintainers

## 📞 Contact

For any queries or suggestions, please use the Suggestion Form within the application or create an issue on GitHub.

---

Made by Pankaj Tyagi