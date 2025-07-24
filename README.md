# Career Winner WeChat Mini-Program Documentation

## Code Authors:
- 1) Edward He
- 2) Jiade Wang

## Overview

The **Career Winner WeChat Mini-Program** offers a user-friendly platform for career-related and personal assessments. This README provides an overview of the app's structure, key components, and best practices for developing and enhancing WeChat Mini-Programs.

## Project Structure

### 1. **App Configuration (`app.js`, `app.json`)**

WeChat Mini-Programs are configured using `app.js` and `app.json`. These files define the overall app behavior, navigation settings, and global configurations.

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

---

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

---

### 3. **Main Page (`pages/index`)**

Each page has its own `.js`, `.json`, `.wxml`, and `.wxss` files. The main page typically includes content like buttons, forms, or other interactive elements.

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

#### `index.wxml`

Template for the page, where you define the layout and bind data.

```xml
<view>
  <navigation-bar title="Career Assessment" back="{{false}}"></navigation-bar>
  <text>Score: {{score}}</text>
</view>
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

---

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

---

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

---

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

---

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

---

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

---

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

---

### 10. **Best Practices**

* **Modularization**: Break down your app into smaller components for better maintainability and reusability.
* **Lazy Loading**: Use `lazyCodeLoading` to improve load time by loading components only when needed.
* **Error Handling**: Handle errors gracefully by using try-catch blocks or checking the response status from API calls.
* **State Management**: Use `setData` and avoid modifying the `data` object directly. This ensures proper reactivity.
* **Performance**: Keep the number of pages and components minimal, and ensure that any large data sets are paginated or lazy-loaded.

---

## Conclusion

This **Career Winner WeChat Mini-Program** is structured for ease of development and scalability. It demonstrates the use of custom components, navigation, API interaction, and dynamic data handling. Follow the best practices provided in this guide to ensure your mini-program is well-optimized, maintainable, and scalable.