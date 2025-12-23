# 🖥️ GGDevLog
> **개인 개발 블로그 웹 서비스입니다.**

웹 개발자의 개발 경험을 기록하기 위해 제작된 기술 블로그입니다.  
Next.js 기반의 SSR 환경으로 구축하였습니다.

<br>

## 🔗 배포 링크
> https://ggdevlog.vercel.app

<br>

## 🛠 사용 기술

### 📌 프론트엔드
- Next
  - SSR 기반으로 구축하여 SEO 최적화 및 초기 로딩 성능 향상을 위해 사용하였습니다.
- TypeScript
  - 안정적인 코드 작성과 유지 보수를 위해 사용하였습니다.
- Tailwind CSS
  - 빠르고 일관된 스타일링을 위해 사용하였습니다.

### ✍️ 에디터
- React Quill
  - 게시글 작성/수정 및 자기소개 편집 기능을 구현하기 위해 사용하였습니다.

### 🔄 상태 관리
- Zustand
  - 세션 스토리지를 활용해 새로고침 이후에도 관리자/모달/메뉴바 상태를 유지하기 위해 사용되었습니다.

### 🌐 네트워킹
- Next의 fetch API
  - 게시판 및 게시글 페이지에서 캐시 기능을 활용해 빠르게 데이터를 로딩하기 위해 사용되었습니다.
- Axios
  - 클라이언트 컴포넌트 내에서 `POST`, `PUT`, `DELETE` 요청을 처리하기 위해 사용하였습니다.

### 🕒 날짜 처리
- Day.js
  - UTC 기준으로 수신한 날짜 데이터를 한국 시간(KST)으로 변환하기 위해 사용하였습니다.

<br>

## ✨ 프로젝트 기능 소개
### ☰ 메뉴바 기능
> 메뉴바를 통해 특정 게시판으로 이동할 수 있으며,  
> 관리자 권한이 있는 경우에는 게시판 관리 및 게시글 작성 UI가 화면에 표시됩니다.

|메뉴바|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/ggdevlog/ggdevlog_menubar.gif)|

### 🔐 관리자 기능
> 클라이언트에서 입력한 관리자 비밀번호가 서버에 저장된 값과 일치하면,  
> JWT(Json Web Token)를 발급받아 블로그 관리 권한을 획득하게 됩니다.  
> 관리자 UI는 Admin State에 따라 노출될 수 있지만,  
> JWT가 유효하지 않은 경우에는 블로그 수정이 불가능하도록 설계했습니다.

|로그인/로그아웃|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/ggdevlog/ggdevlog_login_logout.gif)|

|JWT가 유효하지 않을 때|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/ggdevlog/ggdevlog_access_denied.gif)|

### 📊 활동 기록 시각화 기능
> GitHub의 잔디 그래프에서 영감을 받아 블로그 활동 기록을 시각적으로 표현하는 기능을 구현했습니다.  
> 단순히 색상만으로 표시하면 "그래서 오늘 얼마나 활동한 거지?"라는 의문이 생길 수 있기 때문에,  
> 각 활동 아이템에 마우스를 올리면 해당 날짜와 활동 횟수가 표시되는 툴팁이 나타나도록 구현했습니다.

|활동 기록|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/ggdevlog/ggdevlog_home_activity.gif)|

### 📋 게시판 관리 기능
> 모달 창을 활용하여 게시판 추가 / 수정 / 삭제 기능을 구현했습니다.  
> 관리자 권한이 있을 경우, 게시판 목록을 실시간으로 관리할 수 있습니다.

|게시판 관리|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/ggdevlog/ggdevlog_board_management.gif)|

### 🙋‍♂️ 자기소개 / 📝 게시글 관리 기능
> Quill Editor를 활용해서 WYSIWYG 에디터를 구현했습니다.  
> 이 에디터는 자기소개 수정과 게시글 추가 / 수정 기능에 사용됩니다.  
> 작성 중 업로드된 이미지 중 게시글과 연관이 없는 이미지는  
> 게시글 작성 완료 또는 취소 시 자동으로 삭제되도록 처리했습니다.  
> 만약 삭제되지 않은 이미지가 남아 있을 경우,  
> Supabase의 Edge Functions와 cron schedule 기능을 활용해  
> 일정 주기로 이미지 사용 여부를 검사하고,  
> 더 이상 사용되지 않는 이미지는 자동으로 삭제되도록 구현했습니다.

|자기소개 관리|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/ggdevlog/ggdevlog_introduce.gif)|

|게시글 관리|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/ggdevlog/ggdevlog_post.gif)|


## 🚧 실행 환경 및 제약 사항
본 프로젝트의 서버는 제작자의 Supabase(PostgreSQL) 및 외부 스토리지와 직접 연동되도록 설계되어 있어,  
로컬 환경에서 단독으로 실행할 수 있는 환경은 별도로 제공하지 않습니다.

- 외부 DB 및 스토리지 의존
- 환경 변수 기반 보안 정보 관리

<br>

### [🔗 GGDevLog 서버 Github](https://github.com/ogg1996/ggdevlog-server)

