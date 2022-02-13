export default function handler(req, res) {
  console.log("/api/bye");
  res.status(200).json({ text: "Bye" });
}
