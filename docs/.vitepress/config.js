import { defineConfig } from 'vitepress'


export default defineConfig({
  title: '灯火可亲',
  description: '前端笔记',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SeventeenYZ' },
    ],
    sidebar: [
      {
        text: '基础',
        items: [
          { text: '知识体系', link: '/Base/System'},
          { text: 'HTML and CSS', link: '/Base/HTML+CSS'},
          { text: 'JavaScript', link: '/Base/JavaScript'},
        ]
      },
      {
        text: '架构学习',
        items: [
          { text: 'FSD', link: '/Architecture/FSD' },
          { text: 'Clean Architecture', link: '/Architecture/Clean Architecture' },
        ]
      },
      {
        text: '框架',
        items: [
          { text: 'Vue', link: '/Framework/Vue' },
          { text: 'React', link: '/Framework/React' },
          { text: '路由', link: '/Framework/Router' },
          { text: '状态管理库', link: '/Framework/Store' },
          { text: '应用类型', link: '/Framework/type' },
        ]
      },
      {
        text: '专题',
        items: [
          { text: '网络', link: '/Topic/network' },
          { text: '规范', link: '/Topic/style'},
          { text: '构建', link: '/Topic/build'},
          { text: '浏览器', link: '/Topic/browser'},
        ]
      },
      {
        text: '工具库使用记录',
        items: [
          { text: 'Element UI', link: '/Library/ElementUI' },
          { text: 'Ant Design', link: '/Library/Ant Design' },
          { text: 'Ant Design Mobile', link: '/Library/Ant Design Mobile' },
          { text: 'Git', link: '/Library/Git' },
          { text: 'TypeScript', link: '/Library/TypeScript' },
        ]
      },
      {
        text: '杂项',
        items: [
          { text: '踩坑记录', link: '/Tool/Bug' },
          { text: '技巧', link: '/Tool/tip'},
          { text: '登录', link: '/Tool/login'},
          { text: '后端概念', link: '/Tool/backend'},
          { text: '部署流程', link: '/Tool/deploy'},
        ]
      },
      {
        text: '移动端',
        items: [
          { text: '移动端', link: '/MiniProgram/mobile' },
          { text: '小程序', link: '/MiniProgram/' },
          { text: 'Taro', link: '/MiniProgram/Taro' }
        ]
      },
    ],
    nav: [
      {
        text: '资源',
        items: [
          { text: '现代JavaScript教程', link: 'https://zh.javascript.info' },
          { text: '网道', link: 'https://wangdoc.com/' },
          { text: 'w3schools', link: 'https://www.w3schools.com/' },
          { text: 'eloquent js', link: 'https://eloquentjavascript.net/' },
        ]
      }
    ],
  },
  markdown: { attrs: { disable: true } },
})
