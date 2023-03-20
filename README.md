<h2 align=center > 원하는 영화를 검색해보자 - MovieSearch 🎬 </h2>
<img src="https://user-images.githubusercontent.com/102564722/226234456-dabdea65-e4f4-4c07-a8fd-fe8520b1fb14.png"/>
<br></br>
<div align=center>
    <img src="https://img.shields.io/badge/5.74.0-Webpack-8DD6F9?style=flat&logo=webpack&logoColor=8DD6F9"/>
        <img src=" https://img.shields.io/badge/7.15.0-babel-F9DC3E.svg?style=flat&logo=babel&logoColor=yellow"/>

</div>

<p align=center> 🏠 <a href=https://melodic-gelato-3b6088.netlify.app>홈페이지 바로가기</a></p>

<div></div>

<h2>1. 프로젝트 소개</h2>
react의 기능을 vanilla javascript만 이용해서 직접 구현해봄으로써 동작원리를 좀더 깊이있게 이해하기 위해 만들게된 프로젝트입니다.  webpack, babel 만을 이용하여 개발환경을 구축한뒤, react, redux, react-redux, react-router-dom 의 주요기능을 구현하고 이를 이용해 간단한 영화검색 사이트를 만들었습니다.

<h2>2. 실행방법</h2>

- 원하는 폴더에 이 저장소를 git clone "저장소의 주소"를 입력하여 코드를 복사합니다.
- 터미널에 npm i 를 입력하여 패키지 파일을 설치합니다
- 터미널에 npm start 를 입력하여 개발서버를 실행해 웹페이지를 살펴볼수 있습니다.

<h2>3. 주요기능</h2>

- home: 원하는 영화를 검색하고 최근 영화순위를 볼수있는 기능이 있습니다.
- result: home에서 검색한 결과를 볼수있는 기능이 있습니다
- detail: home이나 result 에서 영화 card를 클릭하였을때 영화 상세정보를 볼수 있는 기능이 있습니다

## 3. 라이브러리 api 소개

### react

- h : babel이 jsx를 어떤 방식으로 변환할지 결정하는 함수
- reRender : 리렌더링시 동작하는 함수로 react-router-dom같은 외부 라이브러리에서 리렌더링을 발생시킬때 사용하는 함수
- render : 초기 렌더링 상태를 세팅하고 마운트 하는 함수
- createContext : context 스토어에 정보를 저장하는 함수
- useContext : context 스토어의 정보를 조회하여 전역데이터를 볼수 있는 함수
- useEffect : 부수효과를 처리하기 위해 사용가능한 함수
- useLookup : dom요소를 직접 참조하기 위한 함수

### react-router-dom

- Routes : Route 함수의 상위에서 spa를 위한 세팅을 하는 함수
- Route : 입력된 path 와 element를 저장하는 함수
- Link : spa 이동을 할수 있는 a태그를 만들어주는 함수
- useParams : route입력시 변수로 입력한 파라미터를 알려주는 함수
- useQueries : 주소창의 query를 알려주는 함수
- useRouter : spa 이동을 할수 있는 push 메서드를 가진 객체를 반환하는 함수

### redux

- createStore :redux 스토어를 만드는 함수로 상태를 변화시키는 dispatch, 상태를 얻을수 있는 getState, 구독할수 있는 subscribe 메서드를 가진 객체를 리턴합니다.

### react-redux

- useSelector : 해당 컴포넌트(실질적으로 전체 컴포넌트)를 구독하고 해당하는 상태를 반환해주는 함수
- useDispatch : dispatch를 할수 있도록 createStore의 dispatch 함수를 반환해 주는 함수

## 4. 관련 블로그 포스트

- [webpack 과 babel을 이용하여 개발환경 구성하기](https://velog.io/@dujk68/webpack-%EA%B3%BC-babel%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0)
- [requestAnimationFrame api를 이용하여 변화를 모아 처리하기](https://velog.io/@dujk68/requestAnimationFrame-api-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [이벤트 위임이 자동적으로 적용되도로 구현하기](https://velog.io/@dujk68/react-%EC%97%90%EC%84%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A5%BC-%EC%B2%98%EB%A6%AC%ED%95%98%EB%8A%94-%EB%B0%A9%EC%8B%9D)
- [lazy loading을 적용하여 초기 로드시간 단축하기](https://velog.io/@dujk68/lazy-loading%EC%9D%84-%EC%A0%81%EC%9A%A9%ED%95%98%EC%97%AC-%EC%B4%88%EA%B8%B0-%EB%A1%9C%EB%93%9C%EC%8B%9C%EA%B0%84-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)
- [pre loading을 적용하여 lazy loading으로 인한 문제 해결하기](https://velog.io/@dujk68/pre-loading%EC%9C%BC%EB%A1%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)

## 5.참고자료

- [Vanilla Javascript로 웹 컴포넌트 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/)
- [Vanilla Javascript로 상태관리 시스템 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#_1-중앙-집중식-상태관리)
- [Vanilla Javascript로 가상돔(VirtualDOM) 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Virtual-DOM/)
- [Vanilla Javascript로 React UseState Hook 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/)
- [재조정(Reconciliation)](https://ko.reactjs.org/docs/reconciliation.html)
- [React Deep Dive— React Event System (1)](https://blog.mathpresso.com/react-deep-dive-react-event-system-1-759523d90341)
- [React Deep Dive — React Event System (2)](https://blog.mathpresso.com/react-deep-dive-react-event-system-2-1d0ad028308b)
- [라이브러리 없이 라우터(Router) 만들기](https://fe-developers.kakaoent.com/2022/221124-router-without-library/)
- [만들어 가며 알아보는 React: React는 왜 성공했나](https://techblog.woowahan.com/8311/)
- [How Redux Works with UI(React)](https://blog.eunsukim.me/posts/how-redux-works-with-UI)
