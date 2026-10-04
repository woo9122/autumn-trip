# 한글날 대잔치 · GitHub Pages용 초대장

## 파일
- index.html: 초대장 문구와 일정
- style.css: 모바일·PC 디자인
- main.js: 일정 탭, 장보기 명단·체크리스트, 지도, 날씨
- config.js: 펜션 주소, 여행 날짜, 날씨 좌표, 카카오 JavaScript 키
- autumn.jpg: 분위기용 생성 이미지 (실제 펜션 사진 아님)

## GitHub Pages 배포
1. GitHub에서 새 공개 저장소를 생성합니다. 예: hangul-trip
2. ZIP을 풀고 파일들을 저장소 최상위에 올립니다. index.html이 최상위에 있어야 합니다.
3. Settings → Pages → Build and deployment에서 Deploy from a branch를 선택합니다.
4. Branch에서 main과 /(root)를 선택한 후 Save합니다.
5. Pages에 표시되는 실제 배포 주소를 엽니다. 예: https://아이디.github.io/hangul-trip/

## 카카오 지도 표시
현재는 키 없이도 카카오맵·네이버지도 검색 연결과 주소 복사가 작동합니다.
초대장 안의 카카오 지도는 본인 계정 설정 후 활성화됩니다.
1. https://developers.kakao.com 에서 앱을 만들고 카카오맵 사용 설정을 확인합니다.
2. JavaScript 키에 GitHub Pages 도메인(https://아이디.github.io)을 등록합니다.
3. config.js의 kakaoJavaScriptKey에 JavaScript 키를 입력합니다.
4. 수정된 config.js를 저장소에 올립니다.
JavaScript 키는 브라우저 공개 사용용입니다. REST API 키, 관리자 키, 개인 토큰을 넣지 마세요.
등록한 도메인에서 확인하고 지도 이용 한도·정책은 카카오의 최신 안내를 따르세요.
가이드: https://apis.map.kakao.com/web/guide/

## 날씨
Open-Meteo 무료 비상업용 API를 키 없이 호출합니다.
날짜별 최저·최고기온, 최대 강수확률, 강수량, 최대 바람을 표시합니다.
좌표 37.24, 126.58은 대부북동 일대 예보용이며 펜션의 정확한 측량 좌표가 아닙니다.
일정 날짜가 현재 예보 범위를 벗어나면 '예보 준비 중'으로 표시됩니다.
조회 시각은 데이터를 가져온 시각이며 예보 모델의 발표 시각이 아닙니다.
페이지를 열거나 새로고침 버튼을 누르면 조회합니다. 자동 예약 실행은 없습니다.
실패 시 같은 브라우저에 저장된 마지막 예보와 조회 시각을 표시합니다.
출처·라이선스: https://open-meteo.com/ (CC BY 4.0, API 이용약관 별도 적용)

## 숙소 확인 정보
대부도 봄날 독채 펜션 / 경기 안산시 단원구 서낭당길 9
입실 15:00 / 퇴실 11:00 / 22:00 이후 매너타임
공식 안내: https://www.xn--i20bz8u9kdn2x.com/reservation.html
내비게이션은 대부북동 1104 검색 후 일심자동차 건물 뒤 첫 번째 집으로 이동하면 수월하다고 안내됩니다.

## 장보기 팀 명단 편집
config.js의 shopping.martMembers와 shopping.seafoodMembers에 이름을 넣습니다.
예: martMembers: ['형우', '친구 이름']
현재 두 명단은 빈 배열로 두었습니다. 미입력 시 '명단 준비 중'으로 표시됩니다.
martItems와 seafoodItems에서 구매 목록도 수정할 수 있습니다.
구매 체크는 페이지에서만 유지되며 다른 방문자와 공유하거나 서버에 저장하지 않습니다.

## 실제 펜션 사진
images/의 사진 3장은 봄날 객실 공식 소개 페이지에서 확인한 거실, 식탁, 바베큐 공간입니다.
각 이미지 출처: https://www.xn--i20bz8u9kdn2x.com/assets/images/room/29703/1.webp (3.webp, 19.webp)
공식 사진 저작권은 원 권리자에게 있습니다. 자유이용 라이선스는 확인되지 않았습니다.
시설과 매너타임 안내 출처는 페이지 하단에 연결했습니다.
