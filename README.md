# 오늘 음악 맑음(WEB)

이 프로젝트는 스포티파이 API를 이용하여 음악 추천 웹사이트를 구현한 것입니다. 프로젝트에서는 현재 위치와 날씨 상태, 사용자의 취향 등을 고려하여 사용자에게 맞는 음악 추천을 제공합니다. 프로젝트에 대한 자세한 내용과 사용 기술 등은 [프로젝트 소개 페이지](https://branch-quart-d0d.notion.site/ac9a9515ad474f5fb6951bd19ba768e2)에서 확인할 수 있습니다.

## 프로젝트 구현 과정

이 코드는 음악 추천 사이트를 구현하는 코드로, Spotify API를 활용하여 음악 데이터를 가져와 추천하는 기능을 제공합니다.

### Spotify API를 사용한 데이터 접근
◦ `client_id` `client_secret` `weather_api_key` `openai_api_key`를 `process.env`를 통해 환경 변수로 설정(보안성 향상)\
◦ Spotify API `액세스 토큰` 가져오기

### 음악 추천 기반 데이터 가져오기
◦ `OpenWeatherMap API`를 사용하여 위치 정보에 따른 날씨 정보를 가져오기
◦ `OpenAI API`를 사용하여 날씨에 따른 감정 키워드 20개 추천받고 `MoodData.js`데이터 파일로 저장하기(저장된 데이터를 사용하는 이유: OpenAI가 반복된 키워드를 학습하고 추천해주어서 다양한 키워드를 추천받기 어려웠음)
◦ 현재 위치에 따른 날씨를 가져온 후 그에 따른 감정 키워드를 결정합니다.

### `Mood`키워드를 Spotify 검색 키워드로 사용하기

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
