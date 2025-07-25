# Career Winner Mini - Program README

## 1. Introduction
Career Winner is a WeChat mini - program that provides various types of assessments, including body, career, love, and psychology assessments. Users need to provide their phone number and email for verification before starting the assessments. Each assessment consists of 5 randomly selected questions from a question bank.

## 2. Project Structure and File Explanation

### 2.1 Configuration Files
- **project.config.json**
    - This file contains the overall project configuration. It defines the library version (`libVersion`), the app ID (`appid`), and various compilation and development settings such as whether to use ES6, minify files, and upload with source maps.
```json
{
  "libVersion": "3.8.11",
  "appid": "wx24bf527f54becbe1",
  "setting": {
    "es6": false,
    "postcss": false,
    "compileWorklet": false,
    "minified": false,
    "uglifyFileName": false,
    "uploadWithSourceMap": true,
    "enhance": false,
    "packNpmManually": false,
    "packNpmRelationList": [],
    "minifyWXSS": true,
    "minifyWXML": true,
    "localPlugins": false,
    "condition": false,
    "swc": false,
    "disableSWC": true,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    },
    "disableUseStrict": false,
    "useCompilerPlugins": false
  },
  "compileType": "miniprogram",
  "simulatorPluginLibVersion": {},
  "packOptions": {
    "ignore": [],
    "include": []
  },
  "editorSetting": {}
}
```
- **project.private.config.json**
    - Holds private project - specific settings. It includes the project name (`projectname`) and development - related options like URL checking, cover view settings, and compile hot - reloading.
```json
{
  "libVersion": "3.8.11",
  "projectname": "careerWinner",
  "setting": {
    "urlCheck": false,
    "coverView": false,
    "lazyloadPlaceholderEnable": false,
    "skylineRenderEnable": false,
    "preloadBackgroundData": false,
    "autoAudits": false,
    "useApiHook": true,
    "useApiHostProcess": true,
    "showShadowRootInWxmlPanel": false,
    "useStaticServer": false,
    "useLanDebug": false,
    "showES6CompileOption": false,
    "compileHotReLoad": true,
    "bigPackageSizeSupport": false,
    "checkInvalidKey": true,
    "ignoreDevUnusedFiles": true
  }
}
```
- **app.json**
    - Defines the pages, window style, and other global settings of the mini - program. It lists all the pages in the `pages` array and sets the window's navigation bar text style and navigation style. It also configures the renderer and component framework.
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
- **sitemap.json**
    - Used for search engine optimization in the WeChat mini - program. It allows all pages to be indexed by setting the `action` to `allow` and `page` to `*`.
```json
{
  "desc": "关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html",
  "rules": [{
    "action": "allow",
    "page": "*"
  }]
}
```

### 2.2 Main Program File
- **app.js**
    - The entry point of the mini - program. It is responsible for loading the cached user information if it exists and setting the root path in the global data.
```javascript
// careerWinner/app.js
App({
  onLaunch() {
    console.log('App Launched');

    // Load cached user info if exists
    const info = wx.getStorageSync('userInfo');
    if (info) {
      this.globalData.userInfo = info;
    }

    // Set the root path
    this.globalData.rootPath = wx.env.USER_DATA_PATH; // You can adjust this path according to your needs
  },
  globalData: {
    userInfo: null,
    rootPath: ''
  }
});
```

### 2.3 Page Files
- **pages/index**
    - **index.json**: Configures the page to use the `navigation - bar` component.
```json
{
  "usingComponents": {
    "navigation - bar": "/components/navigation - bar/navigation - bar"
  }
}
```
    - **index.js**: Checks if the user is verified on page show. If not, it redirects the user to the `userInfo` page.
```javascript
const app = getApp()

Page({
  data: {},
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
  }
})
```
    - **index.wxml**: Defines the layout of the home page, including a logo, buttons for different assessments, and a button for comprehensive scores.
```xml
<view class="container">
  <!-- Enhanced logo section -->
  <view class="logo - container">
    <image class="logo" src="/images/icons/logo.svg" mode="aspectFit"></image>
  </view>

  <!-- Function button area -->
  <view class="btn - group">
    <navigator url="/pages/assessmentBody/assessmentBody" class="btn" hover - class="btn - hover">
      <view class="btn - svg">
        <image src="/images/icons/health.svg" mode="aspectFit"></image>
      </view>
      <text class="btn - text">身体测评</text>
    </navigator>
    <navigator url="/pages/assessmentCareer/assessmentCareer" class="btn" hover - class="btn - hover">
      <view class="btn - svg">
        <image src="/images/icons/career.svg" mode="aspectFit"></image>
      </view>
      <text class="btn - text">事业测评</text>
    </navigator>
    <navigator url="/pages/assessmentLove/assessmentLove" class="btn" hover - class="btn - hover">
      <view class="btn - svg">
        <image src="/images/icons/love.svg" mode="aspectFit"></image>
      </view>
      <text class="btn - text">姻缘测评</text>
    </navigator>
    <navigator url="/pages/assessmentPsychology/assessmentPsychology" class="btn" hover - class="btn - hover">
      <view class="btn - svg">
        <image src="/images/icons/psychology.svg" mode="aspectFit"></image>
      </view>
      <text class="btn - text">心理测评</text>
    </navigator>
  </view>

  <!-- Comprehensive score area as a button, this directs to anoter page -->
  <navigator url="#" class="score - btn">
    <text class="score - title">综合分数</text>
  </navigator>
</view>
```
    - **index.wxss**: Defines the styles for the home page, including the layout, colors, and animations of the logo, buttons, and score button.
```css
.container {
  padding: 16px;
  padding - top: 50px; /* Add top padding to move the UI down */
  background - color: #f9f9f9;
  min - height: 100vh;
  box - sizing: border - box;
  display: flex;
  flex - direction: column;
  align - items: center;
}

.logo - container {
  width: 100%;
  text - align: center;
  margin - bottom: 32px; /* Space between the logo and title */
}

.logo {
  width: 120px; /* Adjust logo size */
  height: 120px; /* Adjust logo size */
  border - radius: 50%; /* Make the logo round */
  box - shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add subtle shadow to logo */
}

.simple - header {
  width: 100%;
  text - align: center;
  margin - bottom: 32px;
}

.simple - title {
  font - size: 24px;
  font - weight: bold;
  color: #333;
}

.btn - group {
  display: grid;
  grid - template - columns: repeat(2, 1fr); /* Creates 2 columns */
  grid - gap: 16px; /* Adds space between the buttons */
  margin - bottom: 32px;
  width: 100%;
  max - width: 400px; /* Ensures buttons don't stretch too wide */
}

.btn {
  text - align: center;
  background - color: #fff;
  padding: 20px 0;
  border - radius: 12px;
  box - shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn - hover {
  background - color: #f0f0f0;
  transform: scale(1.05);
}

.btn - svg {
  display: flex;
  justify - content: center;
  align - items: center;
  margin - bottom: 8px;
}

.btn - svg image {
  width: 40px;
  height: 40px;
}

.btn - text {
  font - size: 16px;
  color: #555;
}

.score - btn {
  width: 80%;
  max - width: 300px;
  text - align: center;
  background - color: #fff;
  padding: 24px;
  border - radius: 16px;
  box - shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.score - btn:hover {
  background - color: #f0f0f0;
  transform: scale(1.05);
}

.score - title {
  font - size: 20px;
  font - weight: bold;
  margin - bottom: 12px;
  color: #333;
}

.score - list text {
  display: block;
  margin - top: 4px;
  font - size: 14px;
  color: #666;
}

.score - value {
  font - size: 32px;
  color: #ff6b6b;
  margin - bottom: 12px;
}
```
- **pages/userInfo**
    - **userInfo.json**: Sets the navigation bar title for the user information page.
```json
{
  "navigationBarTitleText": "填写信息"
}
```
    - **userInfo.js**: Handles user input validation for phone number and email. If the input is valid, it stores the user information in local storage and redirects the user back.
```javascript
const app = getApp()

Page({
  data: {
    phone: '',
    email: '',
    phoneValid: false,
    emailValid: false
  },

  onLoad() {},

  onPhoneInput(e) {
    const phone = e.detail.value
    const phoneValid = /^1\d{10}$/.test(phone)
    this.setData({ phone, phoneValid })
  },

  onEmailInput(e) {
    const email = e.detail.value
    const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    this.setData({ email, emailValid })
  },

  submit() {
    const { phoneValid, emailValid, phone, email } = this.data
    if (!phoneValid || !emailValid) {
      wx.showToast({ title: '信息格式有误', icon: 'none' })
      return
    }
    const info = { phone, email }
    wx.setStorageSync('userInfo', info)
    app.globalData.userInfo = info
    wx.showToast({ title: '验证通过', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack({ delta: 1 })
    }, 1000)
  }
})
```
    - **userInfo.wxml**: Defines the layout of the user information page, including input fields for phone number and email and a submit button.
```xml
<view class="container">
  <view class="form - item">
    <text class="label">手机号</text>
    <input type="number" bindinput="onPhoneInput" placeholder="请输入手机号码" />
  </view>
  <view class="form - item">
    <text class="label">邮箱</text>
    <input type="text" bindinput="onEmailInput" placeholder="请输入邮箱" />
  </view>
  <button bindtap="submit" class="submit - btn">提交</button>
</view>
```
    - **userInfo.wxss**: Defines the styles for the user information page, including the layout and colors of the input fields and the submit button.
```css
.container {
  padding: 20px;
  padding - top: calc(env(safe - area - inset - top)+200px);
}
.form - item {
  margin - bottom: 16px;
}
.label {
  display: block;
  margin - bottom: 8px;
}
.submit - btn {
  background - color: #07c160;
  color: #fff;
  margin - top: 50px;
}
```
- **pages/assessmentBody, pages/assessmentCareer, pages/assessmentLove, pages/assessmentPsychology**
    - **.json files**: Configure the pages to use the `question - card` component.
```json
{
  "usingComponents": {
    "question - card": "/components/card/card"
  }
}
```
    - **.js files**: Fetch questions from the backend API, handle user answers, and track the progress of the assessment. If the user is not verified, it redirects the user to the `userInfo` page.
```javascript
const app = getApp();

const { fetchQuestions } = require('../../utils/questions');

const type = "body";

Page({
  data: {
    questionBank: [],
    questions: [],
    currentIndex: 0,
    answers: [],
    finished: false,
    progress: "1/5" // changed to 5 questions per assessment
  },

  onLoad() {
    if (!app.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/userInfo/userInfo',
      });
      return;
    }

    fetchQuestions(type).then(bank => {
      const shuffled = [...bank].sort(() => Math.random() - 0.5);
      const questions = shuffled.slice(0, 5); // choose 5 random questions

      this.setData({
        questionBank: bank,
        questions
      });

      this.updateProgress();
    }).catch(err => {
      console.error(`Error at ${type} onLoad fetchQuestions. Error Message: `, err);
    });
  },

  onShow() {
    wx.setNavigationBarColor({
      backgroundColor: '#ffffff',
      frontColor: '#000000',
    });
  },

  updateProgress() {
    const total = this.data.questions.length;
    const index = this.data.currentIndex + 1;
    this.setData({
      progress: `${index} / ${total}`
    });
  },

  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    const { answers, currentIndex, questions } = this.data;

    answers[currentIndex] = index;

    if (currentIndex + 1 >= questions.length) {
      // finish without calculating score or percent. (for current development, will implement later)

      this.setData({
        answers,
        finished: true
      });
    } else {
      this.setData({ answers, currentIndex: currentIndex + 1 });

      this.updateProgress();
    }
  },

  onBack() {
    wx.navigateBack({
      delta: '1',
    });
  },

  goHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  }
});
```
    - **.wxml files**: Define the layout of the assessment pages, including a custom navigation bar, a question card, and option buttons. When the assessment is finished, it shows a finish message and a button to return to the home page.
```xml
<view class="container">
  <view class="custom - nav">
    <view class="back - icon" bindtap="onBack">
      <view class="back - arrow"></view>
      <text class="back - text">返回</text>
    </view>
    <view class="nav - title">测评</view>
  </view>

  <view class="content" wx:if="{{!finished}}">
    <question - card question="{{questions[currentIndex].question}}" progress="{{progress}}">
      <view class="option - list">
        <view class="option - item" wx:for="{{questions[currentIndex].options}}" wx:key="index" data - index="{{index}}" bindtap="selectOption">
          {{item}}
        </view>
      </view>
    </question - card>
  </view>

  <view class="content" wx:if="{{finished}}">
    <view class="finish - card">
      <text class="finish - text">本测评完成！</text>

      <button class="back - btn" bindtap="goHome">返回主页</button>
    </view>
  </view>
</view>
```
    - **.wxss files**: Define the styles for the assessment pages, including the layout, colors, and animations of the navigation bar, question card, option buttons, and finish card.

### 2.4 Component Files
- **components/card**
    - **card.json**: Configures the `card` component, enabling style isolation and indicating that it is a component.
```json
{
  "component": true,
  "styleIsolation": "apply - shared",
  "usingComponents": {}
}
```
    - **card.js**: Defines the properties of the `card` component, including the question and progress.
```javascript
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    question: {
      type: String,
      value: ''
    },
    progress: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {}
})
```
    - **card.wxml**: Defines the layout of the `card` component, including the progress display, question text, and answer area.
```xml
<view class="question - card">
  <view class="progress">{{progress}}</view>
  <text class="question - text">{{question}}</text>
  <view class="answer - area">
    <slot></slot>
  </view>
</view>
```
    - **card.wxss**: Defines the styles for the `card` component, including the background color, border radius, box shadow, and animations.
```css
/* careerWinner/components/card/card.wxss */
.question - card {
  background - color: #ffffff;
  border - radius: 16px;
  box - shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin - bottom: 24px;
  transition: transform 0.3s ease, box - shadow 0.3s ease;
}

.progress {
  font - size: 14px;
  color: #888;
  text - align: right;
  margin - bottom: 8px;
}

.question - card:hover {
  transform: translateY(-5px);
  box - shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.question - text {
  font - size: 20px;
  font - weight: 600;
  color: #333333;
  margin - bottom: 16px;
  line - height: 1.4;
}

.answer - area {
  display: flex;
  flex - direction: column;
  gap: 12px;
}

.option - item {
  background - color: #f5f5f5;
  padding: 16px;
  border - radius: 12px;
  text - align: center;
  font - size: 16px;
  color: #555555;
  cursor: pointer;
  transition: background - color 0.3s ease;
}

.option - item:hover {
  background - color: #e0e0e0;
}

.option - item:active {
  background - color: #d0d0d0;
}
```
- **components/navigation - bar**
    - **navigation - bar.json**: Configures the `navigation - bar` component, enabling style isolation and indicating that it is a component.
```json
{
  "component": true,
  "styleIsolation": "apply - shared",
  "usingComponents": {}
}
```
    - **navigation - bar.js**: Defines the properties, data, and methods of the `navigation - bar` component. It handles the display and animation of the navigation bar and the back button functionality.
```javascript
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    loading: {
      type: Boolean,
      value: false
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation - bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange'
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: ''
  },
  lifetimes: {
    attached() {
      const rect = wx.getMenuButtonBoundingClientRect()
      const platform = (wx.getDeviceInfo() || wx.getSystemInfoSync()).platform
      const isAndroid = platform === 'android'
      const isDevtools = platform === 'devtools'
      const { windowWidth, safeArea: { top = 0, bottom = 0 } = {} } = wx.getWindowInfo() || wx.getSystemInfoSync()
      this.setData({
        ios: !isAndroid,
        innerPaddingRight: `padding - right: ${windowWidth - rect.left}px`,
        leftWidth: `width: ${windowWidth - rect.left}px`,
        safeAreaTop: isDevtools || isAndroid? `height: calc(var(--height)+${top}px); padding - top: ${top}px` : ``
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showChange(show) {
      const animated = this.data.animated
      let displayStyle = ''
      if (animated) {
        displayStyle = `opacity: ${show? '1' : '0'
          };transition:opacity 0.5s;`
      } else {
        displayStyle = `display: ${show? '' : 'none'}`
      }
      this.setData({
        displayStyle
      })
    },
    back() {
      const data = this.data
      if (data.delta) {
        wx.navigateBack({
          delta: data.delta
        })
      }
      this.triggerEvent('back', { delta: data.delta }, {})
    }
  },
})
```
    - **navigation - bar.wxml**: Defines the layout of the `navigation - bar` component, including the left button area, title area, and right slot area.
```xml
<view class="weui - navigation - bar {{extClass}}">
  <view class="weui - navigation - bar__inner {{ios? 'ios' : 'android'}}" style="color: {{color}}; background: {{background}}; {{displayStyle}}; {{innerPaddingRight}}; {{safeAreaTop}};">

    <!-- 左侧按钮 -->
    <view class='weui - navigation - bar__left' style="{{leftWidth}};">
      <block wx:if="{{back || homeButton}}">
        <!-- 返回上一页 -->
        <block wx:if="{{back}}">
          <view class="weui - navigation - bar__buttons weui - navigation - bar__buttons_goback">
            <view
              bindtap="back"
              class="weui - navigation - bar__btn_goback_wrapper"
              hover - class="weui - active"
              hover - stay - time="100"
              aria - role="button"
              aria - label="返回"
            >
              <view class="weui - navigation - bar__button weui - navigation - bar__btn_goback"></view>
            </view>
          </view>
        </block>
        <!-- 返回首页 -->
        <block wx:if="{{homeButton}}">
          <view class="weui - navigation - bar__buttons weui - navigation - bar__buttons_home">
            <view
              bindtap="home"
              class="weui - navigation - bar__btn_home_wrapper"
              hover - class="weui - active"
              aria - role="button"
              aria - label="首页"
            >
              <view class="weui - navigation - bar__button weui - navigation - bar__btn_home"></view>
            </view>
          </view>
        </block>
      </block>
      <block wx:else>
        <slot name="left"></slot>
      </block>
    </view>

    <!-- 标题 -->
    <view class='weui - navigation - bar__center'>
      <view wx:if="{{loading}}" class="weui - navigation - bar__loading" aria - role="alert">
        <view
          class="weui - loading"
          aria - role="img"
          aria - label="加载中"
        ></view>
      </view>
      <block wx:if="{{title}}">
        <text>{{title}}</text>
      </block>
      <block wx:else>
        <slot name="center"></slot>
      </block>
    </view>
    
    <!-- 右侧留空 -->
    <view class='weui - navigation - bar__right'>
      <slot name="right"></slot>
    </view>
  </view>
</view>
```

### 2.5 Utility Files
- **utils/questions.js**
    - Provides a function `fetchQuestions` to fetch questions from the backend API based on the assessment type. It uses `wx.request` to send a POST request to the API and returns a promise.
```javascript
const app = getApp();
const API_URL = "https://career - winner - backend - EDHE.replit.app/questions"; // currently deployed on git

function fetchQuestions(type) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_URL,
      method: "POST",
      header: {
        "Content - Type": "application/json"
      },
      data: {
        type: type
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data.questions);
        } else {
          reject(res.data.error || "服务器错误");
        }
      },
      fail: (err) => {
        reject("网络请求失败: " + err.errMsg);
      }
    });
  });
}

module.exports = {
  fetchQuestions
};
```
- **utils/ai.js**
    - Contains a mock function `sendToAI` to simulate sending data to an AI and getting a percentile result. It uses `setTimeout` to simulate network latency and returns a random percentile value.
```javascript
function sendToAI(payload) {
  return new Promise((resolve) => {
    console.log('Mock AI payload:', payload)
    // Simulate network latency and returns fake percentiles
    setTimeout(() => {
      const percent = Math.round(Math.random() * 50)+50
      resolve({
        reply: `超过了国内${percent}%的人`,
        percent
      })
    }, 500)
  })
}

module.exports = {
  sendToAI
}
```

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