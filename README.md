# Career Winner Mini - Program README

## 1. Introduction
Career Winner is a WeChat mini - program that provides various types of assessments, including body, career, love, and psychology assessments. Users need to provide their phone number and email for verification before starting the assessments. Each assessment consists of 5 randomly selected questions from a question bank.

## 2. Project Structure and File Explanation

### 2.1 Configuration Files
- **project.config.json**
    - This file contains the overall project configuration. It defines the library version (`libVersion`), the app ID (`appid`), and various compilation and development settings such as whether to use ES6, minify files, and upload with source maps.

- **project.private.config.json**
    - Holds private project - specific settings. It includes the project name (`projectname`) and development - related options like URL checking, cover view settings, and compile hot - reloading.

- **app.json**
    - Defines the pages, window style, and other global settings of the mini - program. It lists all the pages in the `pages` array and sets the window's navigation bar text style and navigation style. It also configures the renderer and component framework.

- **sitemap.json**
    - Used for search engine optimization in the WeChat mini - program. It allows all pages to be indexed by setting the `action` to `allow` and `page` to `*`.

### 2.2 Main Program File
- **app.js**
    - The entry point of the mini - program. It is responsible for loading the cached user information if it exists and setting the root path in the global data.

### 2.3 Page Files
- **pages/index**
    - **index.json**: Configures the page to use the `navigation - bar` component.
    - **index.js**: Checks if the user is verified on page show. If not, it redirects the user to the `userInfo` page.
    - **index.wxml**: Defines the layout of the home page, including a logo, buttons for different assessments, and a button for comprehensive scores.
    - **index.wxss**: Defines the styles for the home page, including the layout, colors, and animations of the logo, buttons, and score button.

- **pages/userInfo**
    - **userInfo.json**: Sets the navigation bar title for the user information page.
    - **userInfo.js**: Handles user input validation for phone number and email. If the input is valid, it stores the user information in local storage and redirects the user back.
    - **userInfo.wxml**: Defines the layout of the user information page, including input fields for phone number and email and a submit button.
    - **userInfo.wxss**: Defines the styles for the user information page, including the layout and colors of the input fields and the submit button.

- **pages/assessment**
    - **.json files**: Configures the page to use the `question-card` and `navigation-bar` components.
    - **.js files**: Fetch questions from the backend API, handle user answers, and track the progress of the assessment. If the user is not verified, it redirects the user to the `userInfo` page.
    - **.wxml files**: Define the layout of the assessment pages, including a custom navigation bar, a question card, and option buttons. When the assessment is finished, it shows a finish message and a button to return to the home page.
    - **.wxss files**: Define the styles for the assessment pages, including the layout, colors, and animations of the navigation bar, question card, option buttons, and finish card.

### 2.4 Component Files
- **components/card**
    - **card.json**: Configures the `card` component, enabling style isolation and indicating that it is a component.
    - **card.js**: Defines the properties of the `card` component, including the question and progress.
    - **card.wxml**: Defines the layout of the `card` component, including the progress display, question text, and answer area.
    - **card.wxss**: Defines the styles for the `card` component, including the background color, border radius, box shadow, and animations.

- **components/navigation - bar**
    - **navigation - bar.json**: Configures the `navigation - bar` component, enabling style isolation and indicating that it is a component.
    - **navigation - bar.js**: Defines the properties, data, and methods of the `navigation - bar` component. It handles the display and animation of the navigation bar and the back button functionality.
    - **navigation - bar.wxml**: Defines the layout of the `navigation - bar` component, including the left button area, title area, and right slot area.

### 2.5 Utility Files
- **utils/questions.js**
    - Provides a function `fetchQuestions` to fetch questions from the backend API based on the assessment type. It uses `wx.request` to send a POST request to the API and returns a promise.
- **utils/ai.js**
    - Contains a mock function `sendToAI` to simulate sending data to an AI and getting a percentile result. It uses `setTimeout` to simulate network latency and returns a random percentile value.

## 3. Installation and Setup
1. **Clone the Repository**:
    ```bash
    git clone <repository - url>
    ```
2. **Open in WeChat Developer Tools**:
    - Open WeChat Developer Tools.
    - Import the project by selecting the `careerWinner` directory.
3. **Configure the API URL**:
    - In `utils/questions.js`, update the `API_URL` if necessary.

## 4. Usage
1. **Launch the Mini - Program**:
    - Start the mini - program in WeChat Developer Tools or publish it to WeChat.
2. **User Verification**:
    - If it's the first time using the program, the user will be redirected to the `userInfo` page to enter their phone number and email.
3. **Select an Assessment**:
    - On the home page, click on one of the assessment buttons to start an assessment.
4. **Complete the Assessment**:
    - Answer the questions one by one. The progress will be updated automatically.
5. **Get the Result**:
    - After answering all the questions, a mock AI result will be provided to show the percentile comparison.

## 5. Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the original repository.

## 6. License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).