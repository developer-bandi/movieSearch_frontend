# MovieSearch

[MovieSearch 사이트 바로가기](https://melodic-gelato-3b6088.netlify.app/)

vanilla javascript 와 webpack, babel 을 이용하여 react,redux,react-redux,react-router-dom 의 주요기능을 구현한뒤, 해당 기능을 바탕으로 간단한 영화 검색 사이트를 구현하였습니다.

## 1. 실행 방법

- 터미널에 npm i 를 입력하여 패키지 파일을 설치합니다
- 터미널에 npm start 를 입력하여 개발서버를 실행해 웹페이지를 살펴볼수 있습니다.

## 2.페이지 기능

- home: 원하는 영화를 검색하고 최근 영화순위를 볼수있는 기능
- result: home에서 검색한 결과를 볼수있는 기능
- detail: home이나 result 에서 영화 card를 클릭하였을때 영화 상세정보를 볼수 있는 기능

## 3. 라이브러리별 소개

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

## 4.주요 구현 내용

### webpack 과 babel

개발서버와 배포시 최적화를 위해 webpack을, jsx를 위해 babel 을 이용하였습니다.

### requestAnimationFrame api

react 라이브러리의 setState함수가 비동기적으로 16.6ms 에 한번 변화를 모아 처리한다는 사실을 반영하기위해서 일종의 debounce를 적용하였습니다. 처음에는 setInterval로 적용하였는데, 해당함수가 정확한 16.6ms를 보장하지 않는 반면 requestAnimationFrame api는 정확한 16.6ms 즉 1프레임을 보장하기에 이를 이용해 변화를 모아서 처리하는 구조를 구현하였습니다.

### 이벤트 위임

직접 라이브러리를 만들때 가장 어려웠던 부분이 이벤트를 처리하는 것이었습니다. 따라서 생각해낸 방법이 이벤트를 요소에 등록하되, 등록된 모든 이벤트를 요소/함수 형태로 저장해두고, 요소가 삭제될때마다 모든 이벤트를 검사해 요소가 dom 노드에 없는경우 함수를 삭제해버리는 방식이었습니다. 이렇게 구현하고나니 이벤트 위임을 적용하기 유용할것 같다는 생각이 들었습니다. 따라서 이벤트를 요소에 등록하지 않고 root에 등록한뒤 이벤트가 발생하면 타겟 요소와 저장된 이벤트들을 조사하여 매치되는 함수를 실행하는 방식으로 이벤트 위임을 구현하였습니다.

### pre loading

홈의 포스터를 보여주는 캐러셀이 처음 로드이후 페이지전환시 이전 이미지가 잠시동안남아있다가 변경되는 이슈가 있었습니다. 확인해보니 이미지가 초기에 로딩되지 않고 이후 로딩되면서 이전이미지가 대체이미지 역할을 하고있음을 알게되었고, Image 객체를 이용해 pre loading을 적용하여 미리 이후 페이지의 이미지를 로딩함으로써 해결할수 있었습니다.

### lazy loading

영화 정보 페이지다 보니 아무래도 포스터를 담당하는 이미지가 많았습니다. 특히 결과 페이지는 결과가 화면에 보이는것보다 3배이상의 길이를 가지는데, 모든 이미지를 로드하고 있었으므로, 스크롤 아래의 이미지는 이후 로드하여도 무방하다고 생각하였습니다. 따라서 intersection observer를 이용해 lazy loading을 적용하였고 결과적으로 로드시간을 약 2초정도 줄일수 있었습니다.

## 4.아쉬운점

### 변경되는 컴포넌트 알아내기

가상돔끼리 비교할때, 현재 로직상으로는 무조건 root노드를 기준으로 비교하게 된다. 하지만, 만약 root노드의 자식 컴포넌트가 변경되었을경우, 사실 해당 컴포넌트부터 아래 자식 컴포넌트들 끼리, 즉 일부 컴포넌트만 비교해도 충분하다. 이를 위해서는 변경이 발생했을때, 어떤 컴포넌트가 변경되었는지를 알수 있어야 하는데, 변경되는 컴포넌트를 알수있는 방법이 없어서 아쉬웠습니다. 추후 업데이트시에는 react 라이브러리를 열어보고 컴포넌트 변경을 감지하는 로직을 구현해볼 생각입니다.

### key 적용

react 에서 가상돔 끼리의 비교의 시간복잡도를 줄이기위해서 몇가지 휴리스틱 알고리즘을 구현하고있다. 대부분은 적용하였으나, key를 이용하여 순서와 상관없이 요소가 변경되었는지 여부를 판별하는 알고리즘을 적용하지는 못했습니다. 추후 업데이트할때 해당 부분을 가상돔 비교로직에 포함해볼 계획입니다.

### 의존성 배열

useEffect에서 로직을 처리할때 중요한 부분은 언제 해당 로직이 실행되는가 입니다. 이것을 처리하는 방식은 의존성 배열의 값이 달리지게 되면 변경되게 하는 식으로 처리할수 있습니다. 이를 위해서는 의존성 배열의 값을 저장해두고 매 렌더링 마다 해당 값들을 비교해야합니다. 이전값을 저장해두는것에 대한 고민이 필요하여 아직 구현하지 못했지만 추후 업데이트시 포함해볼 계획입니다.

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
