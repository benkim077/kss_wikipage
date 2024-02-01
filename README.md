Next.js와 Supabase로 구현한 게시판 

(Supabase의 무료 기능을 사용했기 때문에, 1주일 간 비활동 시 DB가 중단됩니다.)

## 기능

### 목록 페이지

- 게시글의 목록을 확인할 수 있습니다.
- 게시글을 *페이지 당 5개씩 표시*합니다. :white_check_mark:
- 제목을 클릭하면 해당 게시글 페이지로 이동합니다.
- 추가 버튼을 눌러 새로운 게시글을 생성할 수 있습니다.

### 게시글 페이지

- *본문에 다른 게시글의 제목이 있으면 자동으로 링크가 생성*되고, 클릭 시 이동합니다. :white_check_mark:
- 수정 버튼을 눌러 내용을 수정할 수 있습니다.

## 새롭게 배운 점

- Next.js의 기본기(라우팅, 데이터 페칭)
- Supabase를 이용해서 Create, Read, Update 구현
- 페이지네이션 구현
- 자동 링크 생성 기능 구현
- Next.js 14의 Server action 사용 경험
- Modal, List 컴포넌트를 합성 컴포넌트 방식으로 구현
