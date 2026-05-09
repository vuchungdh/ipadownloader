import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API lấy thông tin app từ App Store
app.post('/get-info', async (req, res) => {
  const { appId } = req.body;
  try {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=vn`);
    const data = await response.json();
    if (data.resultCount > 0) {
      res.json({ success: true, data: data.results[0] });
    } else {
      res.json({ success: false, message: "Không tìm thấy ứng dụng" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// Phần download thật (chưa full, bạn có thể thay bằng logic gốc)
app.post('/download', async (req, res) => {
  const { APPLE_ID, PASSWORD, APPID, appVerId } = req.body;
  
  // TODO: Thêm logic authenticate Apple + download IPA ở đây (phức tạp)
  // Hiện tại chỉ trả về demo
  res.json({
    success: true,
    message: "Demo - Chức năng download đang được hoàn thiện",
    url: "#", 
    installUrl: "#"
  });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
