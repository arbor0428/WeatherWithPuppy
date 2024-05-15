# 미세먼지 측정 강아지 산책 가이드 👩‍💻

### 미세먼지 측정 강아지 산책 가이드에서 구현된 기능들 

- <b>지역 검색 창 :</b> react-router-dom의 useNavigate, useParams를 활용해서 사용자가 해당 지역을 선택한 후 해당 지역 result 화면으로 이동하게 해줍니다.
- <b>미세먼지 api :</b> axios를 활용하여 공공데이터 api를 fetching합니다. .env파일을 만든 후 네트워크 관련된 secret key들을 관리합니다.
- <b>상세 페이지 : </b> cityName 매개변수를 useParams 훅을 통해 추출하고 이를 사용하여 해당 도시의 대기오염 정보를 표시합니다.useState를 이용해서 모달창을 구현하고 조건에 따라 audio기능과 룰렛 기능을 사용할 수 있게 합니다.

## 완성작 보기 

미리보기 : https://bucolic-capybara-bfaced.netlify.app/ 

### 사용스택

- 공공데이터 API(https://www.data.go.kr/)에서 key를 획득하고 	한국환경공단_에어코리아 api를 활성화시킵니다.
- react.js(https://react.dev/) 를 사용하여 사이트를 번들링하고 관리합니다.
- react-router-dom(https://reactrouter.com/en/main)를 활용해서 애플리케이션의 네비게이션과 라우팅을 관리합니다.
- axios(https://github.com/axios/axios)를 사용하여 API에서 데이터를 가져와 React 컴포넌트에 표시할 수 있습니다.
- react-icons(https://react-icons.github.io/react-icons/) 를 이용하여 아이콘들을 활용했습니다.
- scss(https://sass-lang.com/)를 사용해서 스타일링을 해줍니다.
- netlify(https://www.netlify.com/) 를 통해 사이트를 배포합니다.
- git(https://github.com/) 을 사용하여 파일을 관리합니다.
- HTML, CSS 기반으로 웹사이트의 기본 레이아웃 설계하고, 웹 표준 및 웹 접근성을 준수하여 작업합니다. [ARIA(Accessible Rich Internet Applications)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

## 프로젝트 실행
- react를 설치합니다. `npm install -g create-react-app`
- react-router-dom를 설치합니다. `npm install react-router-dom`
- react-icons를 설치합니다. `npm install react-icon ==save`
- axios를 설치합니다 `npm install axios`
- scss를 설치합니다. `npm install node-sass`
- .env파일을 만들고 .gitignore파일에 git commit 되지 않도록 .env 추가해줍니다.
