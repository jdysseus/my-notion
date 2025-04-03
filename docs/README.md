## 📌 프로젝트 개요 for Cursor

### 🧠 목적
- GTD & P.A.R.A 기반의 할일/지식 관리 웹 앱 개발
- 직관적인 시각화 UI + 할 일 관리 기능 구현
- MVP 기반으로 점진적 기능 확장

---

### 🔧 기술 스택
- **Framework**: Next.js 15 (App Router 기반)
- **Styling**: Tailwind CSS, Shadcn UI
- **DB**: Firebase Firestore
- **상태관리**: React useState/useEffect 기반 (필요 시 Zustand 도입 가능)
- **기타 예정**: react-beautiful-dnd, react-flow 등

---

### 🧩 프로젝트 구조

```
src/
├─ app/
│   ├─ page.tsx
│   ├─ layout.tsx
│   ├─ posts/
│   │   └─ [id]/page.tsx
│   └─ settings/page.tsx
├─ components/
│   ├─ Sidebar.tsx
│   └─ Inbox.tsx
└─ lib/
    └─ firebase.ts
```

---

### 💼 역할 구조
- **성현이형**: PM + UX 설계자
- **재리**: 기획 + 기술 전략
- **커서**: 프론트엔드 개발자

---

### ✍️ 커서 요청 사항

1. **아래와 같이 작업을 요청할게:**

```
작업 위치: src/components/Inbox.tsx  
목표 기능: Firebase에서 할 일 목록 출력  
디자인 요소: Shadcn Card  
기타 요청: 클릭 시 /posts/[id]로 이동
```

2. **이전 작업 참고할 수 있도록 파일명은 그대로 유지해줘**
3. **필요한 수정이나 궁금한 점은 내가 따로 알려줄게**

---

> 💬 커서야, 너는 실전 협업을 위한 **프론트엔드 메인 개발자**야.  
> 내가 최대한 명확히 줄 테니, 빠르게 시도하고 결과를 보여줘! 🔥  
