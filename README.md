# Career Winner WeChat Mini-Program Documentation

## Overview

The **Career Winner WeChat Mini-Program** offers a user-friendly platform for career-related and personal assessments. This README provides an overview of the app's structure, key components, best practices for developing and enhancing WeChat Mini-Programs, details on what has been completed so far, and what remains to be done.

Recent updates add a user verification step and a mock AI integration. Users must submit a valid phone number and email before starting any assessment, and their answers are now sent to a placeholder API for future AI analysis.

## Code Authors:

- Edward He
- Jiade Wang

## Project Structure

### 1. **App Configuration (`app.js`, `app.json`)**
#### `app.js`

The entry point of the mini-program. It runs when the app starts.

```javascript
App({
  onLaunch() {
    console.log('App launched');
  }
})
```

* **Purpose**: Used to initialize the app, such as loading user data or setting up third-party services.
* **Tip**: You can handle login or user authentication here by checking local storage or making API calls.

#### `app.json`

Defines the app’s pages, window settings, and global configurations.

```json
{
  "pages": [
    "pages/index/index"
  ],
  "window": {
    "navigationBarTextStyle": "black",
    "navigationStyle": "custom"
  },
  "style": "v2",
  "renderer": "skyline"
}
```

* **Pages**: List of pages in the app.
* **Window**: Configures the navigation bar (text color, style).
* **Renderer**: Sets the rendering engine (Skyline for better performance).
* **Tip**: Always list your pages here to avoid navigation issues.

### 2. **Navigation Bar Component**

A custom navigation bar component (`navigation-bar`) that handles page navigation and displays dynamic content such as titles and back buttons.

```javascript
Component({
  properties: {
    title: { type: String, value: '' },
    back: { type: Boolean, value: true }
  },
  methods: {
    back() {
      wx.navigateBack({ delta: 1 });
    }
  }
})
```

* **Purpose**: Custom navigation bar for each page, supporting back functionality and dynamic title changes.
* **Tip**: You can add custom buttons or features, like a home button, and bind events to them.

#### Example of Using the Navigation Bar:

```xml
<navigation-bar title="Career Winner" back="{{true}}"></navigation-bar>
```

### 3. **Main Page (`pages/index`)**

Each page has its own `.js`, `.json`, `.wxml`, and `.wxss` files. The main page typically includes content like buttons, forms, or other interactive elements.

#### `index.wxml`

Template for the page, where you define the layout and bind data.

```xml
<view>
  <navigation-bar title="Career Assessment" back="{{false}}"></navigation-bar>
  <text>Score: {{score}}</text>
</view>
```

#### `index.js`

Handles logic for the page (e.g., button clicks, data fetching).

```javascript
Page({
  data: {
    score: 80
  },
  onLoad() {
    console.log('Page loaded');
  }
})
```

#### `index.json`

Defines components used on the page.

```json
{
  "usingComponents": {
    "navigation-bar": "/components/navigation-bar/navigation-bar"
  }
}
```

#### `index.wxss`

Styling for the page, using WeChat’s WXSS (similar to CSS).

```css
view {
  padding: 16px;
  background-color: #f9f9f9;
}

text {
  font-size: 18px;
  color: #333;
}
```

### 4. **Component Communication**

In WeChat Mini-Programs, **components** can communicate with their parent pages or other components using **custom events**.

#### Example: Parent to Child Communication

In the parent page (`index.wxml`), you bind a property to the child component:

```xml
<child-component title="Career Assessment" back="{{true}}" bind:back="onBack"></child-component>
```

In the parent page (`index.js`), handle the `back` event:

```javascript
Page({
  methods: {
    onBack(event) {
      console.log('Back button clicked');
    }
  }
})
```

### 5. **Page Navigation**

WeChat Mini-Programs use the `<navigator>` tag to handle navigation between pages.

#### Example: Basic Navigation

```xml
<navigator url="/pages/body/body" class="btn">
  <text>Go to Body Assessment</text>
</navigator>
```

#### Passing Data via Query Parameters

```xml
<navigator url="/pages/career/career?param1=value1&param2=value2" class="btn">
  <text>Go to Career Assessment</text>
</navigator>
```

In the target page (`pages/career/career.js`):

```javascript
Page({
  onLoad(options) {
    console.log('Received params:', options.param1, options.param2);
  }
})
```

### 6. **State Management**

WeChat Mini-Programs use the `data` object to store and manage page state. You can update the state using `this.setData()`.

#### Example: Updating Data Dynamically

```javascript
Page({
  data: {
    score: 85
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        score: 90
      });
    }, 2000);
  }
})
```

### 7. **Custom Components**

WeChat Mini-Programs allow you to create reusable components. Components consist of a `.js`, `.json`, `.wxml`, and `.wxss` file.

#### Example: A Simple Button Component

**Button Component (`button.js`)**:

```javascript
Component({
  properties: {
    label: { type: String, value: 'Click Me' }
  },
  methods: {
    onClick() {
      console.log('Button clicked');
      this.triggerEvent('buttonClicked');
    }
  }
})
```

**Button Template (`button.wxml`)**:

```xml
<button bindtap="onClick">{{label}}</button>
```

**Parent Page (`index.wxml`)**:

```xml
<button-component label="Submit" bind:buttonClicked="onButtonClick"></button-component>
```

### 8. **WeChat APIs**

WeChat Mini-Programs provide various APIs to interact with device features, such as **location**, **camera**, **storage**, etc.

#### Example: Accessing User Location

```javascript
wx.getLocation({
  type: 'wgs84',
  success(res) {
    console.log('User location:', res.latitude, res.longitude);
  }
});
```

### 9. **Styling and Layout**

WeChat uses **WXSS** for styling. You can use standard CSS properties along with WeChat-specific extensions like `flex` and `box-sizing`.

#### Example: Flexbox Layout

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

### 10. **Best Practices**

* **Modularization**: Break down your app into smaller components for better maintainability and reusability.
* **Lazy Loading**: Use `lazyCodeLoading` to improve load time by loading components only when needed.
* **Error Handling**: Handle errors gracefully by using try-catch blocks or checking the response status from API calls.
* **State Management**: Use `setData` and avoid modifying the `data` object directly. This ensures proper reactivity.
* **Performance**: Keep the number of pages and components minimal, and ensure that any large data sets are paginated or lazy-loaded.

### 11. **Testing the question card component**

1. Launch the mini-program
2. From the main page, tap **身体测评** to open body assessment page
3. You should be able to see a question card

## What We Have Completed So Far

### 1. Assessment Pages
- Created four assessment pages: **身体测评** (Body Assessment), **事业测评** (Career Assessment), **姻缘测评** (Love Assessment), and **心理测评** (Psychology Assessment).
- Each assessment page has a set of questions with options, and users can select an option for each question.
- The progress of the assessment is displayed, and when all questions are answered, a completion message is shown with a back button.

### 2. Main Page
- Designed the main page with a logo, function buttons for each assessment, and a comprehensive score area.
- The function buttons navigate to the corresponding assessment pages.

### 3. Custom Components
- Developed a custom `question-card` component used in the assessment pages.
- Implemented a custom navigation bar component with a back button and a title.

### 4. Styling
- Applied styling to all pages and components using WXSS, ensuring a consistent and user-friendly design.

## What We Haven't Completed

### 1. User Information Collection
- **Requirement**: Users should enter their personal phone number and email address (with verification) before taking any assessment.
- **Status**: A new `userInfo` page collects and validates phone and email. User cannot access until information is provided. However, it still lacks phone and email verivication mechanism. 

### 2. Comprehensive Score Calculation
- **Requirement**: The **综合分数** (Comprehensive Score) should be determined based on users' choices from the four assessments. If there are undone assessments, the comprehensive score should still be provided but with a warning of low accuracy. Additionally, the score for each assessment and the percentage of people defeated in the user's region should be displayed.
- **Status**: The comprehensive score calculation logic has not been developed. The current main page only has a placeholder for the score, and there is no calculation or display of the relevant information.

### 3. Comprehensive Assessment Display
- **Requirement**: The **综合测评** (Comprehensive Assessment) should show the user's social standing and the percentage of people beaten based on the assessment scores.
- **Status**: This feature is yet to be implemented. There is no page or functionality to display the comprehensive assessment results.

### 4. AI Evaluation API
- **Requirement**: There needs to be an API to interact with DeepSeek or Doubao. The AI will evaluate the choices users select in each assessment, and based on those scores, it will rate the percentage of people the user has beaten in their country.
- **Status**: **Partially Completed** A mock API function has been written in `utils/ai.js` which stimulates sending answers to an external AI service.

## Conclusion

This **Career Winner WeChat Mini-Program** is structured for ease of development and scalability. It demonstrates the use of custom components, navigation, API interaction, and dynamic data handling. To complete the project, the remaining tasks related to user information collection, comprehensive score calculation, comprehensive assessment display, and AI evaluation API need to be implemented. Follow the best practices provided in this guide to ensure your mini-program is well-optimized, maintainable, and scalable.