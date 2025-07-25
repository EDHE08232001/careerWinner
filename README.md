# Career Winner WeChat Mini-Program Documentation

## Overview
The **Career Winner WeChat Mini-Program** offers a user - friendly platform for career - related and personal assessments. It allows users to take various assessments such as body, career, love, and psychology assessments. This README provides a comprehensive overview of the app's structure, key components, and best practices for developing and enhancing WeChat Mini - Programs.

## Code Authors
- Edward He
- Jiade Wang

## Project Structure

### 1. App Configuration (`app.js`, `app.json`)
#### `app.js`
The entry point of the mini - program. It runs when the app starts.
```javascript
App({
  onLaunch() {
    console.log('App Launched');

    // Load cached user info if exists
    const info = wx.getStorageSync('userInfo')
    if (info) {
      this.globalData.userInfo = info
    }
  },
  globalData: {
    userInfo: null
  }
})
```
**Purpose**: Used to initialize the app, such as loading user data or setting up third - party services.
**Tip**: You can handle login or user authentication here by checking local storage or making API calls.

#### `app.json`
Defines the app’s pages, window settings, and global configurations.
```json
{
  "pages": [
    "pages/index/index",
    "pages/assessmentBody/assessmentBody",
    "pages/assessmentCareer/assessmentCareer",
    "pages/assessmentLove/assessmentLove",
    "pages/assessmentPsychology/assessmentPsychology",
    "pages/userInfo/userInfo"
  ],
  "window": {
    "navigationBarTextStyle": "black",
    "navigationStyle": "custom"
  },
  "style": "v2",
  "renderer": "skyline",
  "rendererOptions": {
    "skyline": {
      "defaultDisplayBlock": true,
      "defaultContentBox": true,
      "tagNameStyleIsolation": "legacy",
      "disableABTest": true,
      "sdkVersionBegin": "3.0.0",
      "sdkVersionEnd": "15.255.255"
    }
  },
  "componentFramework": "glass - easel",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents"
}
```
- **Pages**: List of pages in the app.
- **Window**: Configures the navigation bar (text color, style).
- **Renderer**: Sets the rendering engine (Skyline for better performance).
- **Tip**: Always list your pages here to avoid navigation issues.

### 2. Navigation Bar Component
A custom navigation bar component (`navigation - bar`) that handles page navigation and displays dynamic content such as titles and back buttons.
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
- **Purpose**: Custom navigation bar for each page, supporting back functionality and dynamic title changes.
- **Tip**: You can add custom buttons or features, like a home button, and bind events to them.

**Example of Using the Navigation Bar**:
```xml
<navigation-bar title="Career Winner" back="{{true}}"></navigation-bar>
```

### 3. Main Page (`pages/index`)
Each page has its own `.js`, `.json`, `.wxml`, and `.wxss` files. The main page typically includes content like buttons, forms, or other interactive elements.

#### `index.json`
Defines components used on the page.
```json
{
  "usingComponents": {
    "navigation-bar": "/components/navigation-bar/navigation-bar"
  }
}
```

#### `index.js`
Handles logic for the page (e.g., button clicks, data fetching).
```javascript
const app = getApp()
const { getScores, calculateComprehensive } = require('../../utils/score')

Page({
  data: {
    score: 0,
    bodyScore: null,
    careerScore: null,
    loveScore: null,
    psychologyScore: null,
    bodyPercent: null,
    careerPercent: null,
    lovePercent: null,
    psychologyPercent: null
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/devtools/minicode.html')
  },
  onShow() {
    // Redirect to userinfo page if not verified
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/userInfo/userInfo'
      })
      return
    }
    const scores = getScores()
    const comp = calculateComprehensive(scores)

    this.setData({
      score: comp,
      bodyScore: scores.body ? scores.body.score : null,
      careerScore: scores.career ? scores.career.score : null,
      loveScore: scores.love ? scores.love.score : null,
      psychologyScore: scores.psychology ? scores.psychology.score : null,
      bodyPercent: scores.body ? scores.body.percent : null,
      careerPercent: scores.career ? scores.career.percent : null,
      lovePercent: scores.love ? scores.love.percent : null,
      psychologyPercent: scores.psychology ? scores.psychology.percent : null
    })
  }
})
```

#### `index.wxml`
Template for the page, where you define the layout and bind data.
```xml
<view class="container">
  <!-- Enhanced logo section -->
  <view class="logo-container">
    <image class="logo" src="/images/icons/logo.svg" mode="aspectFit"></image>
  </view>

  <!-- Function button area -->
  <view class="btn-group">
    <navigator url="/pages/assessmentBody/assessmentBody" class="btn" hover-class="btn-hover">
      <view class="btn-svg">
        <image src="/images/icons/health.svg" mode="aspectFit"></image>
      </view>
      <text class="btn-text">身体测评</text>
    </navigator>
    <navigator url="/pages/assessmentCareer/assessmentCareer" class="btn" hover-class="btn-hover">
      <view class="btn-svg">
        <image src="/images/icons/career.svg" mode="aspectFit"></image>
      </view>
      <text class="btn-text">事业测评</text>
    </navigator>
    <navigator url="/pages/assessmentLove/assessmentLove" class="btn" hover-class="btn-hover">
      <view class="btn-svg">
        <image src="/images/icons/love.svg" mode="aspectFit"></image>
      </view>
      <text class="btn-text">姻缘测评</text>
    </navigator>
    <navigator url="/pages/assessmentPsychology/assessmentPsychology" class="btn" hover-class="btn-hover">
      <view class="btn-svg">
        <image src="/images/icons/psychology.svg" mode="aspectFit"></image>
      </view>
      <text class="btn-text">心理测评</text>
    </navigator>
  </view>

  <!-- Comprehensive score area as a button -->
  <navigator url="#" class="score-btn">
    <text class="score-title">综合分数</text>

    <view class="score-list">
      <text wx:if="{{bodyScore !== null}}">身体测评：{{bodyScore}} (击败 {{bodyPercent}}%)</text>
      <text wx:if="{{careerScore !== null}}">事业测评：{{careerScore}} (击败 {{careerPercent}}%)</text>
      <text wx:if="{{loveScore !== null}}">姻缘测评：{{loveScore}} (击败 {{lovePercent}}%)</text>
      <text wx:if="{{psychologyScore !== null}}">心理测评：{{psychologyScore}} (击败 {{psychologyPercent}}%)</text>
    </view>
  </navigator>
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

### 4. Component Communication
In WeChat Mini - Programs, **components** can communicate with their parent pages or other components using **custom events**.

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

### 5. Page Navigation
WeChat Mini - Programs use the `<navigator>` tag to handle navigation between pages.

#### Example: Basic Navigation
```xml
<navigator url="/pages/body/body" class="btn">
  <text>Go to Body Assessment</text>
</navigator>
```

### 6. State Management
WeChat Mini - Programs use the `data` object to store and manage page state. You can update the state using `this.setData()`.

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

### 7. Custom Components
WeChat Mini - Programs allow you to create reusable components. Components consist of a `.js`, `.json`, `.wxml`, and `.wxss` file.

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

### 8. WeChat APIs
WeChat Mini - Programs provide various APIs to interact with device features, such as **location**, **camera**, **storage**, etc.

#### Example: Accessing User Location
```javascript
wx.getLocation({
  type: 'wgs84',
  success(res) {
    console.log('User location:', res.latitude, res.longitude);
  }
});
```

### 9. Styling and Layout
WeChat uses **WXSS** for styling. You can use standard CSS properties along with WeChat - specific extensions like `flex` and `box - sizing`.

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

### 10. Best Practices
- **Modularization**: Break down your app into smaller components for better maintainability and reusability.
- **Lazy Loading**: Use `lazyCodeLoading` to improve load time by loading components only when needed.
- **Error Handling**: Handle errors gracefully by using try - catch blocks or checking the response status from API calls.
- **State Management**: Use `setData` and avoid modifying the `data` object directly. This ensures proper reactivity.
- **Performance**: Keep the number of pages and components minimal, and ensure that any large data sets are paginated or lazy - loaded.

### 11. Testing the question card component
1. Launch the mini - program
2. From the main page, tap **身体测评** to open body assessment page
3. You should be able to see a question card

### 12. Questions JSON Format
```
{
  "type": [
    {
      "question": "question statement",
      "options": "'A', 'B', 'C', 'C'"
    }
  ]
}
```

## Conclusion
This **Career Winner WeChat Mini - Program** is structured for ease of development and scalability. It demonstrates the use of custom components, navigation, API interaction, and dynamic data handling. Follow the best practices provided in this guide to ensure your mini - program is well - optimized, maintainable, and scalable.