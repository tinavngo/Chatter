## Project description
This project involves the development of a mobile chat application using React Native. The application will offer users a seamless chat interface, along with functionalities for sharing images and their current location.

## Key Features

- A start page where users can enter their name and choose a background color for the chat screen before joining the chat.

- A pages displaying the conversation, as well as an input field and submit button

- The chat must provide users with two additional communication features: sending images and location data

- Data gets stored online and offline

## Getting Started

 - React Native
 - Expo and Expo Go App
 - Google Firestone Database

To run this app locally, you'll need to follow these steps:

 - Clone this repository (Skip this step if: You would like to create your own native app)

 - Set up Expo in your development environment:

 - Install Expo and Expo CLI, as this will provide you the necessary template to build this app;

     npm install -g expo-cli

 - Install Expo Go app on your mobile device, so that you can test your app on your own mobile device;

 Search for the Expo Go app in the relevant app store for your device (IOS or Android)

 - Create an Expo account and Login using the terminal
 
 - Use the proper version of node for this project

    nvm use 16.19.0
    nvm alias default 16.19.0

 - Create your project (Do this step if: You would like to create your own native app)

    npx create-expo-app project-name --template
    
    You will be shown a list of templates to pick from, choose 'Blank template' for a concise canvas to work from

 - Navigate to the chat-app directory and install dependencies

    npm install

 - Start up the environment to review the development process of the app

    npx expo start


### User Stories

> As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.

> As a user, I want to be able to send messages to my friends and family members to exchange the latest news.

> As a user, I want to send images to my friends to show them what I'm currently doing.

> As a user I want to share my location with my friends to show them where I am.

> As a user, I want to be able to erad my messages offline so I can reread conversations at any time.

> As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### Project Rubric

- The app is developed using Expo and React Native
- The app must be compatible for both Android and iPhone users
- Conversations including media must be stored in the Google Firestone Database
- The app must authenticate users anonymously with Firebase
- Conversations are stored locally
- Permission must be granted to use media tools (take photo, choose photo, and send location)
- The app's codebase contains explaination to specific functionalities
- The chat interface is developed using Gifted Chat Library