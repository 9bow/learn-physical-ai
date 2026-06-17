# Physical AI 완전 정복

NVIDIA Isaac Sim/Lab을 중심으로 **Physical AI**의 개념부터 실제 구현, sim-to-real 배포, VLA 파운데이션 모델까지 다루는 한국어 학습 사이트입니다. Astro 6 + Starlight + React 19로 구축되었습니다.

🔗 **사이트**: https://9bow.github.io/learn-physical-ai/

## 무엇을 배우는가

14개 섹션, 약 76개 챕터로 구성된 체계적 커리큘럼입니다.

1. **Physical AI 개론** — 정의, NVIDIA 3-컴퓨터 패러다임, 핵심 난제
2. **로보틱스 & 물리 시뮬레이션 기초** — 동역학, 기구학, 물리 엔진, 센서
3. **Omniverse & OpenUSD** — 씬 구성, MDL, RTX 렌더링
4. **Isaac Sim 환경 구축** — 설치, 로봇 임포트, Python API, Replicator
5. **Isaac Lab — 강화학습 환경** — 아키텍처, 환경 설계, 병렬 시뮬레이션
6. **강화학습 기반 로봇 제어** — PPO/SAC, 보행, 매니퓰레이션
7. **Sim-to-Real Transfer** — reality gap, domain randomization, 배포
8. **모방학습 & 데이터** — behavior cloning, LeRobot, Open X-Embodiment
9. **Foundation Models & VLA** — RT-2/OpenVLA/π0, GR00T, Cosmos
10. **오픈소스 시뮬레이터** — MuJoCo, Genesis, SAPIEN/ManiSkill, Gazebo
11. **ROS 2 & Isaac ROS** — Nav2, MoveIt 2, ROS bridge, 인식 파이프라인
12. **실전 프로젝트** — 4족 보행, pick-and-place, Jetson 배포
13. **고급 주제 & 미래** — 안전, 멀티로봇, 미분가능 시뮬레이션, 3DGS
14. **산업 적용 & 한국 생태계** — 휴머노이드 산업, 한국 기업·연구기관

## 기술 스택

- **Astro 6** + **Starlight** — 정적 문서 사이트 프레임워크
- **React 19** — 인터랙티브 컴포넌트(Quiz, Mermaid 등)
- **Mermaid** — 다이어그램 렌더링
- **GitHub Pages** + **GitHub Actions** — 자동 배포

## 로컬 개발

```bash
pnpm install
pnpm dev      # 개발 서버 (http://localhost:4321/learn-physical-ai)
pnpm build    # 정적 빌드 (dist/)
pnpm preview  # 빌드 결과 미리보기
```

요구사항: Node.js 22+, pnpm 10+

## 구성

```
src/
  content/docs/        # 14개 섹션 MDX 챕터
  components/learning/ # Quiz, ConceptCard, References, Mermaid
  styles/custom.css    # Starlight 테마 커스터마이즈
public/data/quiz/      # 섹션별 퀴즈 JSON
astro.config.mjs       # 사이트/사이드바/GA 설정
```

## 콘텐츠 원칙

- 검증 불가능한 통계 금지, arXiv·공식 문서 등 stable primary source 인용
- 대안 기술(시뮬레이터·RL 프레임워크·VLA 모델)은 비교표로 정리
- 모든 챕터에 시각 자료(ASCII 다이어그램 / 표 / Mermaid) 포함
- 실행 가능한 설치·코드 절차 우선

## 라이선스

콘텐츠 및 코드는 학습 목적으로 제공됩니다. 인용된 외부 자료는 각 출처의 라이선스를 따릅니다.
