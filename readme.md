# server 초기 구축 방법
```npm init```
```npm i express```
https://expressjs.com/en/starter/installing.html

express App을 빠르게 만들기 위해서 Express generator를 사용해도되지만 서버사이드 랜더링을 전혀 사용하지 않기때문에 불필요
여기서는 index.js에서 직접 타이핑
https://expressjs.com/en/starter/generator.html

cors error fix(when backend and frontend server conflict)
```npm i cors```

서버열기 - server폴더로 이동한뒤
```npm start```

# mongoDB
데이타베이스 설치 및 연결방법은 블로그 포스팅 참고
https://dubaiyu.tistory.com/214?category=945998

```npm i mongoose```

스키마작성
schema 폴더 참고

스키마연결
model.js 참고

* client
make vue project named client
```vue create client```
http client
```npm i axios```
```npm i core-js```


