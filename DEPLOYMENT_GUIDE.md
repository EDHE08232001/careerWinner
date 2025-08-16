# CareerWinner 项目部署指南

## 📦 项目打包说明

### 后端部分 (careerWinnerBackend)
✅ **完全可移植** - 包含所有必要文件：

#### 必需文件
- `main.py` - Flask主服务器
- `aiAPI.py` - DeepSeek AI接口
- `questionsAPI.py` - 问题数据接口
- `requirements.txt` - Python依赖列表
- `.env` - API密钥配置（已包含有效密钥）
- `run.sh` - macOS/Linux一键启动脚本
- `run.bat` - Windows一键启动脚本
- `README.md` - 详细部署说明

#### 可选文件
- `venv/` - 虚拟环境（可删除，会自动创建）
- `__pycache__/` - Python缓存（可删除）
- `.git/` - Git版本控制（可删除）

### 前端部分 (careerWinner)
✅ **完全可移植** - 微信小程序代码：

#### 关键配置
- `utils/ai.js` - 已配置为 `http://localhost:5001/ai`
- `utils/questions.js` - 已配置为 `http://localhost:5001/questions`

## 🚀 一键部署步骤

### 方法1: 使用启动脚本（推荐）

#### macOS/Linux
```bash
cd careerWinnerBackend
./run.sh
```

#### Windows
```cmd
cd careerWinnerBackend
run.bat
```

### 方法2: 手动部署
```bash
cd careerWinnerBackend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# 或 venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

## ✅ 验证部署成功

1. **服务器启动**: 看到 "Backend Cloud API is active!"
2. **API连接**: 看到 "✅ AI Service Connection Status: API连接正常"
3. **功能测试**: 微信小程序能正常获取问题和AI分析

## 🔧 配置说明

### API密钥
- 项目已包含有效的DeepSeek API密钥
- 如需更换，修改 `.env` 文件中的 `DEEPSEEK_API_KEY`

### 端口配置
- 默认端口: 5001
- 如需修改，编辑 `main.py` 中的端口设置

### 前端配置
- 确保微信小程序指向 `http://localhost:5001`
- 如需修改服务器地址，更新 `utils/ai.js` 和 `utils/questions.js`

## 🎯 功能特性

### 后端API
- ✅ `/questions` - 获取测评问题
- ✅ `/ai` - AI分析接口
- ✅ CORS跨域支持
- ✅ 错误处理和日志
- ✅ 完整的RESTful API

### 前端功能
- ✅ 身体、职业、爱情、心理四类测评
- ✅ 用户信息收集
- ✅ 实时AI分析
- ✅ 幽默风格报告展示

## 📋 部署检查清单

### 环境要求
- [ ] Python 3.8+
- [ ] 网络连接（用于DeepSeek API）
- [ ] 端口5001可用

### 文件完整性
- [ ] 后端所有文件完整
- [ ] 前端API地址配置正确
- [ ] `.env` 文件包含有效API密钥

### 功能验证
- [ ] 服务器正常启动
- [ ] API连接成功
- [ ] 微信小程序能正常使用
- [ ] AI分析功能正常

## 🐛 常见问题

### 端口被占用
```bash
# macOS/Linux
lsof -ti:5001 | xargs kill -9

# Windows
netstat -ano | findstr :5001
taskkill /PID <进程ID> /F
```

### 依赖安装失败
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### API密钥无效
- 检查 `.env` 文件格式
- 确认DeepSeek账户余额
- 验证API密钥权限

## 📞 技术支持

如果遇到问题，请检查：
1. Python版本和虚拟环境
2. 网络连接和防火墙设置
3. 端口占用情况
4. API密钥有效性
5. 前端配置是否正确

---

**总结**: 这个项目已经完全可移植，包含所有必要的配置和依赖。其他人只需要运行启动脚本就能立即使用，无需任何额外配置！ 