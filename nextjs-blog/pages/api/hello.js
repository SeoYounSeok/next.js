export default function handler(req, res) {
  // API Route 사용 시, 서버 사이드 쪽에서 콘솔이 찍힙니다.
  // 클라이언트 쪽에서 콘솔 창 확인 시 오류를 확인할 수 있다. 한 마디로, 서버사이드 랜더링
  // console.log('server side rendering')
  // res.status(200).json({ text: "Hello" });
  console.log("/api/Hello");
  // redirect 는 307 을 주로 사용합니다.
  res.redirect(307, "/api/bye");
}
