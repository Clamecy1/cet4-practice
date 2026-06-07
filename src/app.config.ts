export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/stats/index',
    'pages/review/index',
  ],
  subPackages: [
    {
      root: 'packages/practice',
      pages: [
        'pages/listening/index',
        'pages/translation/index',
        'pages/result/index',
        'pages/errors/index',
        'pages/vocabulary/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#faf8f4',
    navigationBarTitleText: 'CET-4 刷题',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#9ca3af',
    selectedColor: '#6366f1',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home-active.png',
      },
      {
        pagePath: 'pages/review/index',
        text: '复习',
        iconPath: 'assets/review.png',
        selectedIconPath: 'assets/review-active.png',
      },
      {
        pagePath: 'pages/stats/index',
        text: '统计',
        iconPath: 'assets/stats.png',
        selectedIconPath: 'assets/stats-active.png',
      },
    ],
  },
})
