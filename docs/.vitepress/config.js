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
          { text: '框架', link: '/Framework/framework' },
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
          { text: '浏览器渲染机制', link: '/Topic/browser'},
          { text: '图片', link: '/Topic/image'},
          { text: '计算机', link: '/Topic/computer'},
          { text: '性能', link: '/Topic/performance'},
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
          { text: '数据库', link: '/Tool/SQL'},
          { text: '浏览器', link: '/Tool/browser'},
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
        text: '前端资源',
        items: [
          { text: '现代JavaScript教程', link: 'https://zh.javascript.info' },
          { text: '网道', link: 'https://wangdoc.com/' },
          { text: 'w3schools', link: 'https://www.w3schools.com/' },
          { text: 'eloquent js', link: 'https://eloquentjavascript.net/' },
          { text: '模式', link: 'https://www.patterns.dev/' },
        ]
      },
      {
        text: '博客',
        items: [
          { text: 'joshwcomeau', link: 'https://www.joshwcomeau.com/' },
          { text: 'felixgerschau', link: 'https://felixgerschau.com/' },
          { text: 'dev', link: 'https://dev.to/' }
        ]
      },
      {
        text: '计算机基础',
        items: [
          { text: 'cs50', link: 'https://www.edx.org/cs50' },
          { text: 'computer-science', link: 'https://github.com/ossu/computer-science' },
          { text: 'teach yourself cs', link: 'https://teachyourselfcs.com/' },
          { text: 'nand to tetris', link: 'https://www.nand2tetris.org/' },
          { text: 'Building an 8-bit breadboard computer!', link: 'https://www.youtube.com/playlist?list=PLowKtXNTBypGqImE405J2565dvjafglHU' },
        ]
      },
      {
        text: '工具',
        items: [
          { text: '画图', link: 'https://excalidraw.com/' },
          { text: '在线IDE', link: 'https://stackblitz.com/' },
          { text: '在线接口测试', link: 'https://hoppscotch.io/' },
        ]
      },
      {
        text: 'UI相关',
        items: [
          { text: 'UI中国', link: 'https://www.ui.cn/' },
          { text: '站酷', link: 'https://www.zcool.com.cn/' },
          { text: '花瓣', link: 'https://huaban.com/' },
          { text: '动效', link: 'https://pag.art/' }
        ]
      },
    ],
  },
  markdown: { attrs: { disable: true } },
})
