/**
 * Niu_Web 个人网站主要脚本文件
 * 包含页面切换、动画效果、交互功能等核心逻辑
 * 
 * @author 牛刀小试
 * @version 1.3.0
 */

// 全局配置对象
const Config = {
    PARTICLE_COUNT: 100,
    ANIMATION_DURATION: 800,
    CORRECT_PASSWORD: 'embedded',
    RADAR_CONFIG: {
        type: 'radar',
        data: {
            labels: ['STM32', 'RTOS', 'FPGA', '传感器', '通信协议', 'PCB设计'],
            datasets: [{
                label: '技能水平',
                data: [85, 70, 60, 90, 80, 75],
                backgroundColor: 'rgba(0, 153, 255, 0.2)',
                borderColor: '#0099ff',
                borderWidth: 2,
                pointBackgroundColor: '#00ffff',
                pointBorderColor: '#0099ff',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#0099ff',
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        color: 'rgba(0, 153, 255, 0.3)'
                    },
                    pointLabels: {
                        color: '#00ffff',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    }
};

// 工具函数集合
const Utils = {
    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间(ms)
     * @returns {Function}
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 节流函数
     * @param {Function} func - 要节流的函数
     * @param {number} limit - 时间间隔(ms)
     * @returns {Function}
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * 随机数生成器
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number}
     */
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * 检查元素是否在视口中
     * @param {Element} element - 要检查的元素
     * @returns {boolean}
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// 页面管理器
const PageManager = {
    currentPage: 'home',
    transitioning: false,

    /**
     * 显示指定页面
     * @param {string} pageId - 页面ID
     */
    showPage(pageId) {
        if (this.transitioning || this.currentPage === pageId) return;
        
        this.transitioning = true;
        
        try {
            // 隐藏所有页面
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active-page');
            });

            // 显示目标页面
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active-page');
                this.currentPage = pageId;
                
                // 重置滚动位置
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // 页面特定初始化
                this.initPageSpecificFeatures(pageId);
            } else {
                console.warn(`Page with ID "${pageId}" not found`);
            }
        } catch (error) {
            console.error('Error switching pages:', error);
        } finally {
            setTimeout(() => {
                this.transitioning = false;
            }, Config.ANIMATION_DURATION);
        }
    },

    /**
     * 初始化页面特定功能
     * @param {string} pageId - 页面ID
     */
    initPageSpecificFeatures(pageId) {
        switch (pageId) {
            case 'about':
                this.initSkillRadar();
                break;
            case 'projects':
                this.initProjectAnimations();
                break;
            case 'contact':
                this.initContactForm();
                break;
        }
    },

    /**
     * 初始化技能雷达图
     */
    initSkillRadar() {
        const radarCanvas = document.getElementById('skillRadar');
        if (radarCanvas && typeof Chart !== 'undefined') {
            try {
                // 销毁现有图表
                if (window.skillRadarChart) {
                    window.skillRadarChart.destroy();
                }
                
                // 创建新图表
                window.skillRadarChart = new Chart(radarCanvas, Config.RADAR_CONFIG);
            } catch (error) {
                console.error('Error initializing radar chart:', error);
            }
        }
    },

    /**
     * 初始化项目动画
     */
    initProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.6s ease-out forwards';
            }, index * 200);
        });
    },

    /**
     * 初始化联系表单
     */
    initContactForm() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', this.handleContactSubmit.bind(this));
        }
    },

    /**
     * 处理联系表单提交
     * @param {Event} e - 表单提交事件
     */
    handleContactSubmit(e) {
        e.preventDefault();
        
        // 这里可以添加表单验证和提交逻辑
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log('Contact form submitted:', data);
        
        // 显示提交成功消息
        this.showNotification('感谢您的留言！我会尽快回复。', 'success');
    },

    /**
     * 显示通知消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 ('success', 'error', 'info')
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(10, 14, 23, 0.9);
            color: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00ffff'};
            border: 1px solid ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00ffff'};
            border-radius: 8px;
            padding: 12px 20px;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            transform: translateX(300px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// 粒子系统管理器（优化版本）
const ParticleSystem = {
    particles: [],
    animationId: null,
    canvas: null,
    ctx: null,

    /**
     * 初始化粒子系统
     */
    init() {
        this.createCanvas();
        this.generateParticles();
        this.startAnimation();
    },

    /**
     * 创建画布
     */
    createCanvas() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // 清理现有画布
        const existingCanvas = particlesContainer.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(this.canvas);
        this.resizeCanvas();
        
        // 监听窗口大小变化
        window.addEventListener('resize', Utils.debounce(() => {
            this.resizeCanvas();
        }, 250));
    },

    /**
     * 调整画布大小
     */
    resizeCanvas() {
        if (!this.canvas) return;
        
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    },

    /**
     * 生成粒子
     */
    generateParticles() {
        this.particles = [];
        
        for (let i = 0; i < Config.PARTICLE_COUNT; i++) {
            this.particles.push({
                x: Utils.random(0, this.canvas?.width || window.innerWidth),
                y: Utils.random(0, this.canvas?.height || window.innerHeight),
                vx: Utils.random(-0.5, 0.5),
                vy: Utils.random(-0.5, 0.5),
                size: Utils.random(1, 3),
                alpha: Utils.random(0.3, 0.8),
                color: Math.random() > 0.5 ? '#0099ff' : '#00ffff'
            });
        }
    },

    /**
     * 开始动画
     */
    startAnimation() {
        const animate = () => {
            if (!this.canvas || !this.ctx) return;
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                this.updateParticle(particle);
                this.drawParticle(particle);
            });
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    },

    /**
     * 更新粒子位置
     * @param {Object} particle - 粒子对象
     */
    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // 边界检测
        if (particle.x < 0 || particle.x > this.canvas.width) {
            particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > this.canvas.height) {
            particle.vy *= -1;
        }
        
        // 保持在画布内
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    },

    /**
     * 绘制粒子
     * @param {Object} particle - 粒子对象
     */
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.alpha;
        this.ctx.fillStyle = particle.color;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = particle.color;
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    },

    /**
     * 停止动画
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
};

// 特效管理器
const EffectsManager = {
    /**
     * 初始化所有特效
     */
    init() {
        this.initClickEffects();
        this.initScrollAnimations();
        this.initHoverEffects();
    },

    /**
     * 初始化点击特效
     */
    initClickEffects() {
        document.addEventListener('click', Utils.throttle((e) => {
            this.createClickEffect(e.clientX, e.clientY);
        }, 100));
    },

    /**
     * 创建点击特效
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     */
    createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.left = `${x - 50}px`;
        effect.style.top = `${y - 50}px`;
        
        document.body.appendChild(effect);
        
        // 动画
        setTimeout(() => {
            effect.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
            effect.style.transform = 'scale(1.5)';
            effect.style.opacity = '0';
        }, 10);
        
        // 清理
        setTimeout(() => {
            if (effect.parentNode) {
                document.body.removeChild(effect);
            }
        }, 900);
    },

    /**
     * 初始化滚动动画
     */
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animateElements = document.querySelectorAll('.skill-card, .project-item, .award-item');
        animateElements.forEach(el => observer.observe(el));
    },

    /**
     * 初始化悬停特效
     */
    initHoverEffects() {
        // 为卡片添加3D悬停效果
        const cards = document.querySelectorAll('.skill-card, .project-card, .award-item');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
};

// 密码保护管理器
const PasswordManager = {
    isUnlocked: false,

    /**
     * 初始化密码保护
     */
    init() {
        const passwordContainer = document.getElementById('password-protection');
        const resumeContent = document.getElementById('resume-content');
        const passwordInput = document.getElementById('password-input');
        const passwordSubmit = document.getElementById('password-submit');
        const passwordError = document.getElementById('password-error');
        
        if (!passwordContainer || !resumeContent) return;
        
        // 事件监听
        passwordSubmit?.addEventListener('click', () => this.verifyPassword());
        passwordInput?.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.verifyPassword();
            }
        });
    },

    /**
     * 验证密码
     */
    verifyPassword() {
        const passwordInput = document.getElementById('password-input');
        const passwordError = document.getElementById('password-error');
        const passwordContainer = document.getElementById('password-protection');
        const resumeContent = document.getElementById('resume-content');
        
        if (!passwordInput || !passwordError || !passwordContainer || !resumeContent) return;
        
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === Config.CORRECT_PASSWORD) {
            this.unlockContent(passwordContainer, resumeContent, passwordError);
        } else {
            this.showPasswordError(passwordInput, passwordError);
        }
    },

    /**
     * 解锁内容
     */
    unlockContent(passwordContainer, resumeContent, passwordError) {
        this.isUnlocked = true;
        passwordError.textContent = '';
        passwordContainer.style.opacity = '0';
        
        setTimeout(() => {
            passwordContainer.style.display = 'none';
            resumeContent.classList.remove('hidden');
            resumeContent.style.opacity = '0';
            
            setTimeout(() => {
                resumeContent.style.transition = 'opacity 1s ease-out';
                resumeContent.style.opacity = '1';
                
                // 初始化雷达图
                PageManager.initSkillRadar();
            }, 50);
        }, 500);
    },

    /**
     * 显示密码错误
     */
    showPasswordError(passwordInput, passwordError) {
        passwordError.textContent = '密码错误，请重试';
        passwordInput.value = '';
        
        passwordInput.classList.add('password-error-shake');
        setTimeout(() => {
            passwordInput.classList.remove('password-error-shake');
        }, 500);
    }
};

// 主应用程序
const App = {
    /**
     * 初始化应用程序
     */
    init() {
        this.bindEvents();
        this.initComponents();
        this.initMobileMenu();
        this.initScrollProgress();
        this.initBackToTop();
        this.showLoadingScreen();
        
        console.log('🚀 Niu_Web 应用程序已启动');
    },

    /**
     * 绑定全局事件
     */
    bindEvents() {
        // 等待DOM完全加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMReady();
            });
        } else {
            this.onDOMReady();
        }
        
        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                ParticleSystem.stop();
            } else {
                ParticleSystem.startAnimation();
            }
        });
        
        // 窗口焦点事件
        window.addEventListener('focus', () => {
            if (document.hidden === false) {
                ParticleSystem.startAnimation();
            }
        });
        
        window.addEventListener('blur', () => {
            ParticleSystem.stop();
        });
        
        // 窗口大小变化
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
        
        // 滚动事件
        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateScrollProgress();
            this.updateBackToTop();
        }, 16));
    },

    /**
     * DOM就绪时的处理
     */
    onDOMReady() {
        this.initComponents();
        
        // 隐藏加载屏幕
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1500);
    },

    /**
     * 初始化所有组件
     */
    initComponents() {
        try {
            ParticleSystem.init();
            EffectsManager.init();
            PasswordManager.init();
            this.initSkillProgressBars();
            
            // 初始化当前页面特定功能
            PageManager.initPageSpecificFeatures(PageManager.currentPage);
            
        } catch (error) {
            console.error('初始化组件时出错:', error);
        }
    },
    
    /**
     * 显示加载屏幕
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    },
    
    /**
     * 隐藏加载屏幕
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // 显示页面内容
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        }
    },
    
    /**
     * 初始化移动端菜单
     */
    initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
            
            // 点击菜单外部关闭菜单
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        }
    },
    
    /**
     * 初始化滚动进度条
     */
    initScrollProgress() {
        this.scrollProgress = document.querySelector('.scroll-progress');
    },
    
    /**
     * 更新滚动进度
     */
    updateScrollProgress() {
        if (!this.scrollProgress) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        this.scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
    },
    
    /**
     * 初始化返回顶部按钮
     */
    initBackToTop() {
        this.backToTopButton = document.getElementById('backToTop');
        
        if (this.backToTopButton) {
            this.backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    },
    
    /**
     * 更新返回顶部按钮显示状态
     */
    updateBackToTop() {
        if (!this.backToTopButton) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            this.backToTopButton.classList.add('visible');
        } else {
            this.backToTopButton.classList.remove('visible');
        }
    },
    
    /**
     * 初始化技能进度条
     */
    initSkillProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        // 创建观察器来触发进度条动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progressFill = progressBar.querySelector('.progress-fill');
                    const progress = progressBar.getAttribute('data-progress');
                    
                    if (progressFill && progress) {
                        setTimeout(() => {
                            progressFill.style.width = `${progress}%`;
                        }, 200);
                    }
                    
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    },
    
    /**
     * 处理窗口大小变化
     */
    handleResize() {
        // 关闭移动菜单
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (window.innerWidth > 768) {
            hamburger?.classList.remove('active');
            mobileMenu?.classList.remove('active');
        }
        
        // 重新调整粒子系统
        if (ParticleSystem.canvas) {
            ParticleSystem.resizeCanvas();
        }
    }
};

// 全局函数（保持向后兼容）
window.showPage = (pageId) => PageManager.showPage(pageId);

// 移动端菜单控制函数
window.closeMobileMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
};

// 错误处理
window.addEventListener('error', (e) => {
    console.error('全局错误:', e.error);
    
    // 在开发环境下显示错误通知
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        PageManager.showNotification(`错误: ${e.error.message}`, 'error');
    }
});

// 未处理的 Promise 拒绝
window.addEventListener('unhandledrejection', (e) => {
    console.error('未处理的 Promise 拒绝:', e.reason);
    e.preventDefault();
});

// 启动应用程序
try {
    App.init();
} catch (error) {
    console.error('应用程序启动失败:', error);
}