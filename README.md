# MovieSearch

[MovieSearch 사이트 바로가기]()

vanilla javascript 와 webpack, babel 을 이용하여 react,redux,react-redux,react-router-dom 의 주요기능을 구현한뒤, 해당 기능을 바탕으로 간단한 영화 검색 사이트를 구현하였습니다.

## 1. 실행 방법

- 터미널에 npm i 를 입력하여 패키지 파일을 설치합니다
- 터미널에 npm start 를 입력하여 개발서버를 실행해 웹페이지를 살펴볼수 있습니다.

## 2. 라이브러리별 소개

### react

렌더링의 경우 먼저 render 함수를 이용하여 rootComponent와 rootdom, rootComponent를 실행한 가상돔을 등록한뒤 첫 렌더링을 하게 됩니다. 렌더링이후 리렌더링 하게 되면, rootComponent를 실행해 새로운 가상돔을 만들고 이전가상돔과 비교한뒤 필요한 부분만 변경하여 ui를 업데이트 합니다. 비교할때 같은 태그의 경우 속성을 변경해주었고, 다른태그의경우 아예제거한뒤 새롭게 요소를 만들어주는 방식을 사용하였습니다. 이벤트의경우 react 와 유사하게 rootdom에 위임하였고, 노드가 단순히 삭제되는경우 이벤트가 제거되지 않을수 있어 등록이벤트들의 요소가 남아있는지를 매 렌더링마다 조회하여 제거하는 로직으로 구현하였습니다. 한편 requestAnimationFrame함수를 사용하여 1프레임 동안 1번만 실행되도록(60fps 기준 약 16ms당 1회)하여 효율적으로 렌더링 되도록 하였습니다.

useState의 경우 처음 값을 세팅할때는 값을 초기값을 저장하게 되므로, 값을 배열에 추가해주고, 이후 리렌더링할때는 값을 변경할수 있도록 index값을 참조하였습니다. 또한 해당 함수의 실행결과 state 와 setState를 담은 배열을 반환해 setState로 state를 변경하고 rerender 할수있도록 구현하였습니다.

useLookup의 경우 dom요소를 직접 조작할수는 없고 탐색할수 있도록 구현한 hook 이고 useEffect는 렌더링직후 부수효과를 처리하도록 구현하였으며 useContext 와 createContext 전역 상태를 유지하기위한 함수들입니다.

### redux, react-redux

redux는 createStore라는 하나의 함수를 export 합니다. 해당함수는 reducer함수를 받고, 해당함수를 초기화 액션을 넣어 상태를 초기화한뒤, dispatch, getState,subscribe 함수를 리턴하여 상태를 변경하고, 조회하고 상태를 구독할수있도록 하였습니다. 이함수들을 이용하여 상태가 변경되면 구독하는 개체들이 의도한 함수를 실행할수 있고 데이터가 dispatch->reducer->store->view->dispatch 의 단방향으로 이동할수 있게 되어 observer 패턴과 flux 패턴이 적용되었다고 볼수 있습니다.

react와 redux를 연결하는 react-redux는 useSelector와 useDispatch 훅을 가집니다. useSelector은 사용한 컴포넌트를 구독하고 상태도 가져올수 있게 하고, 구독함수로 리렌더링 함수를 보내어서 상태가 변경되면 자동으로 리렌더링됩니다. useDispatch의 경우 store의 dispatch 함수를 리턴하여 view에서 action을 dispatch 할수 있도록 해줍니다.

### react-router-dom

routes와 route함수를 이용하여 주어진 경로와 컴포넌트를 등록합니다. 이때 /:id 와같은 parameter를 등록하기위해서 정규표현식을 이용하여 검사하게 됩니다. 만약 주소창이 변경되거나 data-link 속성의 a 태그가 클릭될경우 새로고침하지않고 path에 맞는 컴포넌트를 리턴하여 리렌더링 하도록 하였습니다.

link 태그의 경우 react-router-dom 처럼 link를 달기위한 hook입니다. 이 link 태그아래에 텍스트 자식노드가 아닌 html 요소가 있는 경우 해당 요소로 가려짐으로써 link가 정상적으로 동작하지 않아서 재귀적으로 모든 자식노드를 data-link 속성과 href를 부착한 노드로 변경하는 기능을 가지고 있습니다.

useParams 는 parameter을 가져오는 hook 이고 useQuries는 query를 가져오는 hook 이고 useRouter는 라우팅을 사용할수 있도록 router 객체를 리턴하는 hook 입니다.

## 3.페이지 기능

- home: 원하는 영화를 검색하고 최근 영화순위를 볼수있는 기능
- result: home에서 검색한 결과를 볼수있는 기능
- detail: home이나 result 에서 영화 card를 클릭하였을때 영화 상세정보를 볼수 있는 기능

## 4.참고자료

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
