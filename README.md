# 👐 Triosigno - Mobile

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ReactNative](https://img.shields.io/badge/ReactNative-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-%231C2024.svg?style=for-the-badge&logo=expo&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Triosigno** is an interactive platform dedicated to learning French Sign Language (LSF). With a modern and accessible interface, we offer a fun experience, supported by artificial intelligence, to help users learn LSF in an engaging way.


## 🌟 Key Features

- **AI-based sign recognition**: Users receive real-time feedback on their gestures.
- **Gamification**: Points, levels, and leaderboards to encourage progress.
- **Multi-platform accessibility**: Available on Web and Mobile.
- **Personalized reminders**: Notifications to encourage daily practice.

## 🖥️ Technologies Used

The mobile is built with the following technologies:

- **React Native** via [Expo](https://expo.dev/)
- **TypeScript** for type-safe development
- **NativeWind** (TailwindCSS for React Native)

## ⚙️ Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn**

## 🚀 Installation


1. Clone the repository:
    ```bash
    git clone https://github.com:EIP-TEK89/trio-signo-mobile.git
    ```
2. Navigate to the project directory:
    ```bash
    cd trio-signo-mobile
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
## 🔧 Environment Variables
Create a ```.env``` file in the root folder with the following variables:
```ini
EXPO_PUBLIC_API_URL=https://your-api-url.com
```
>You can customize these according to you frontend environment.

## 🧪 Testing

To run unit tests:
```bash
npm test
```
>Jest is recommended for testing components and logic

## 📂 Project Structure
```bash
.
├── app/				 # App entry point
├── assets/            	 # Static assets
├── components/          # Reusable UI components
├── context/			 # Context providers
├── services/            # API services
├── types/ 				 # Types and interfaces
├── utils/               # Utility functions
```

## 👥 Contributing

The steps for contributing to the project are described in the file [CONTRIBUTING.md](https://github.com/EIP-TEK89/trio-signo-fullstack/blob/main/Contributing.md).
