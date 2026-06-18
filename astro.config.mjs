// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const GA_ID = 'G-WFT8GW8GE3';

export default defineConfig({
  site: 'https://9bow.github.io',
  base: '/learn-physical-ai',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Physical AI 완전 정복',
      description:
        'NVIDIA Isaac Sim/Lab을 중심으로 Physical AI의 개념부터 실제 구현·sim-to-real 배포까지 다루는 한국어 학습 사이트',
      defaultLocale: 'root',
      locales: { root: { label: '한국어', lang: 'ko' } },
      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
          },
        },
        {
          tag: 'script',
          content:
            'window.dataLayer = window.dataLayer || [];\n' +
            'function gtag(){dataLayer.push(arguments);}\n' +
            "gtag('js', new Date());\n" +
            `gtag('config', '${GA_ID}');`,
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/9bow/learn-physical-ai',
        },
      ],
      sidebar: [
        { label: '01. Physical AI 개론', items: [{ autogenerate: { directory: '01-introduction' } }] },
        { label: '02. 로보틱스 & 물리 시뮬레이션 기초', items: [{ autogenerate: { directory: '02-foundations' } }] },
        { label: '03. Omniverse & OpenUSD', items: [{ autogenerate: { directory: '03-omniverse-usd' } }] },
        { label: '04. Isaac Sim 환경 구축', items: [{ autogenerate: { directory: '04-isaac-sim' } }] },
        { label: '05. Isaac Lab — 강화학습 환경', items: [{ autogenerate: { directory: '05-isaac-lab' } }] },
        { label: '06. 강화학습 기반 로봇 제어', items: [{ autogenerate: { directory: '06-rl-control' } }] },
        { label: '07. Sim-to-Real Transfer', items: [{ autogenerate: { directory: '07-sim-to-real' } }] },
        { label: '08. 모방학습 & 데이터', items: [{ autogenerate: { directory: '08-imitation-data' } }] },
        { label: '09. Foundation Models & VLA', items: [{ autogenerate: { directory: '09-foundation-vla' } }] },
        { label: '10. 오픈소스 시뮬레이터', items: [{ autogenerate: { directory: '10-open-simulators' } }] },
        { label: '11. ROS 2 & Isaac ROS', items: [{ autogenerate: { directory: '11-ros2-isaac-ros' } }] },
        { label: '12. 실전 프로젝트', items: [{ autogenerate: { directory: '12-projects' } }] },
        { label: '13. 고급 주제 & 미래', items: [{ autogenerate: { directory: '13-advanced' } }] },
        { label: '14. 산업 적용 & 한국 생태계', items: [{ autogenerate: { directory: '14-industry-korea' } }] },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    react(),
  ],
});
