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
- Next 16
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
  - 세션 스토리지를 활용하여 새로고침 시에도 모달 상태를 유지하기 위해 사용되었습니다.

### 🌐 네트워킹
- Next의 fetch API
  - 게시판 및 게시글 페이지에서 캐시 기능을 활용해 빠르게 데이터를 로딩하기 위해 사용되었습니다.
- Axios
  - 클라이언트 컴포넌트 내에서 `POST`, `PUT`, `DELETE` 요청을 처리하기 위해 사용하였습니다.

### 🕒 날짜 처리
- Day.js
  - UTC 기준으로 수신한 날짜 데이터를 한국 시간(KST)으로 변환하기 위해 사용하였습니다.

<br/>

## ✨ 프로젝트 기능 소개
### 관리자 권한
> 클라이언트에서 입력한 관리자 비밀번호가 서버에 저장된 값과 일치할 경우,  
> JWT가 발급되어 블로그 관리 권한을 획득하게 됩니다.

|실행화면|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/dff/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.gif)|

> 관리자 권한이 없는 상태에서(jwt가 없거나 일치하지 않을 때) 블로그 관리 동작을 한다면..

|실행화면|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/dff/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.gif)|
|![](https://github.com/ogg1996/readmeResource/blob/main/dff/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.gif)|
|![](https://github.com/ogg1996/readmeResource/blob/main/dff/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.gif)|

### 활동 기록 시각화 기능
> 깃허브 잔디에 영감을 받아 활동 기록을 시각화 하는 기능을 구현했습니다.

|실행화면|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/dff/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.gif)|

### 보드 관리 기능
> 모달로 보드 관리 기능을 구현했으며,
> 이를 활용해 게시판 추가 / 수정 / 삭제 기능을 사용할 수 있습니다.

|실행화면|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/dff/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.gif)|

### 게시글 관리 기능
> Quill Editor를 활용해서 WYSIWYG 에디터를 구현했으며,
> 이를 활용해 게시글 추가 / 수정 기능을 구현했습니다.

|실행화면|
|---|
|![](https://github.com/ogg1996/readmeResource/blob/main/dff/%EC%8B%A4%ED%96%89%ED%99%94%EB%A9%B4.gif)|

<br>

## 🚧 실행 환경 및 제약 사항
본 프로젝트의 서버는 제작자의 Supabase(PostgreSQL) 및 외부 스토리지와 직접 연동되도록 설계되어 있어,  
로컬 환경에서 단독으로 실행할 수 있는 환경은 별도로 제공하지 않습니다.

- 외부 DB 및 스토리지 의존
- 환경 변수 기반 보안 정보 관리

<br>

### [🔗 GGDevLog 서버 Github](https://github.com/ogg1996/ggdevlog-server)


