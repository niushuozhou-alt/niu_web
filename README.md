# 🚀 个人网站项目 - Niu_Web

一个现代化的嵌入式工程师个人展示网站，具有精美的科技感UI设计和流畅的用户体验。

**项目开始时间：2025年8月23日 18:21**  
**当前版本：v1.3.0**

## ✨ 主要功能

### 🎬 视觉效果
- **首页动画效果**：集成优化的粒子系统和文本动画，提供视觉吸引力
- **高科技视觉效果**：科幻风格设计，包括动态网格背景、渐变光晕效果和鼠标点击特效
- **现代UI设计**：采用深色主题配色方案，带有发光元素和流畅过渡动画
- **加载动画**：优雅的页面加载动画和进度指示器

### 📱 交互体验
- **多页面导航**：实现平滑的页面切换功能，每个页面都有返回按钮
- **响应式设计**：完全适配桌面、平板和手机等不同屏幕尺寸
- **移动端优化**：汉堡菜单、触摸优化、性能调整
- **滚动进度条**：实时显示页面滚动进度
- **返回顶部**：智能显示的返回顶部按钮

### 🛠️ 专业功能
- **项目展示**：嵌入式项目和案例研究展示
- **技能展示**：带进度条的技能水平可视化
- **技能雷达图**：使用Chart.js展示硬件技能分布
- **联系表单**：提供用户留言和联系方式
- **密码保护**：简历页面的安全访问控制

### ⚡ 性能优化
- **GPU加速**：使用CSS transform3d和will-change优化动画性能
- **懒加载**：图片和组件的延迟加载
- **代码分离**：JavaScript模块化，CSS优化
- **移动端适配**：针对低性能设备的动画降级

## 📁 项目结构

```
├── index.html       # 主页面文件（优化后的HTML结构）
├── style.css        # 样式表文件（响应式CSS + 动画优化）
├── script.js        # 主要脚本文件（模块化JavaScript）
├── package.json     # 项目配置文件
├── README.md        # 项目说明文档
└── CHANGELOG.md     # 版本更改记录
```

## 🚀 如何运行

### 方法一：Python服务器（推荐）
1. 确保你的电脑上安装了Python 3.x
2. 在项目目录下打开终端
3. 运行以下命令启动本地服务器：
   ```bash
   python -m http.server 8000
   ```
4. 打开浏览器，访问 http://localhost:8000/

### 方法二：使用npm脚本
```bash
npm run dev    # 启动开发服务器
npm start      # 启动生产服务器
```

### 方法三：Live Server插件
- 使用VS Code的Live Server插件直接启动

## 🛠️ 技术栈

### 前端技术
- **HTML5**: 语义化标签、Web API
- **CSS3**: Flexbox、Grid、动画、渐变、响应式设计
- **JavaScript ES6+**: 模块化、面向对象、异步编程
- **Chart.js**: 数据可视化图表库

### 开发工具
- **Python**: 本地开发服务器
- **Git**: 版本控制
- **VS Code**: 推荐的代码编辑器

### 部署平台
- **GitHub Pages**: 静态网站托管
- **Netlify**: 现代化部署平台
- **Vercel**: 高性能托管服务

## 🎨 设计特色

### 科技感元素
- 🔵 霓虹蓝色主题 (#0099ff, #00ffff)
- ⚡ 动态粒子背景系统
- 🌟 发光动画效果
- 📟 电路板风格装饰
- 🎯 PCB引脚样式设计

### 响应式断点
- 📱 手机: < 768px
- 📱 小屏手机: < 480px
- 🖥️ 平板: 768px - 1024px
- 🖥️ 桌面: > 1024px
- 🖥️ 大屏: > 1440px

## ⚙️ 配置说明

### 密码设置
默认访问密码：`embedded`

可在 `script.js` 中修改：
```javascript
const Config = {
    CORRECT_PASSWORD: 'your-new-password'
};
```

### 性能调优
- 粒子数量可在配置中调整
- 移动端自动减少动画复杂度
- 支持 `prefers-reduced-motion` 媒体查询

### 技能数据
雷达图数据可在 `script.js` 的 `Config.RADAR_CONFIG` 中修改

## 🔧 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Chrome Android 60+

## 📈 性能指标

- 🚀 首次内容绘制 (FCP): < 1.5s
- ⚡ 最大内容绘制 (LCP): < 2.5s
- 🎯 首次输入延迟 (FID): < 100ms
- 📊 累积布局偏移 (CLS): < 0.1

## 🚀 部署指南

### GitHub Pages
1. 推送代码到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源

### Netlify
1. 连接GitHub仓库
2. 设置构建命令为空（静态站点）
3. 发布目录设置为根目录

### Vercel
1. 导入GitHub仓库
2. 框架预设选择"Other"
3. 构建命令留空

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -am '添加新功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 创建Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- 📧 邮箱: contact@example.com
- 🐙 GitHub: [@username](https://github.com/username)
- 💼 LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🎯 未来计划

- [ ] 添加多语言支持
- [ ] 集成CMS内容管理
- [ ] 添加博客功能
- [ ] PWA支持
- [ ] 暗色/亮色主题切换
- [ ] 在线简历编辑器

---

⭐ 如果这个项目对您有帮助，请考虑给它一个星标！