// 200 OK: İstek başarılı bir şekilde işlendi ve yanıt veri içeriyor. Genellikle GET istekleri için kullanılır.
// res.status(200).send("Başarılı");

// 201 Created: İstek başarılı bir şekilde işlendi ve yeni bir kaynak oluşturuldu. Özellikle POST istekleri sonucu kullanılır.
// res.status(201).json({ message: "Yeni kaynak oluşturuldu" });

// 204 No Content: İstek başarılı bir şekilde işlendi, ancak yanıt veri içermiyor. Genellikle DELETE istekleri için kullanılır.
// res.status(204).send();

// 400 Bad Request: İstek, sunucu tarafından anlaşılamayan veya geçersiz veriler içeriyor. Kullanıcı tarafındaki bir hata nedeniyle oluşabilir.
// res.status(400).send("Geçersiz istek");

// 401 Unauthorized: İstek için kimlik doğrulaması gerekiyor ve sağlanmadı veya geçersiz. Kullanıcının yetkilendirme sorunu yaşadığını gösterir.
// res.status(401).send("Kimlik doğrulama gerekiyor");

// 403 Forbidden: İstemci, kaynağa erişim iznine sahip değil. Yetkilendirme sorunu yaşanmasa da bu kod kullanılabilir.
// res.status(403).send("Erişim reddedildi");

// 404 Not Found: İstek yapılan kaynak sunucu üzerinde bulunamadı. Geçersiz yol veya URI için kullanılır.
// res.status(404).send("Kaynak bulunamadı");

// 409 Conflict: İstek, çakışma veya uyumsuzluk nedeniyle başarısız oldu.
// res.status(409).send("Çakışma oluştu");

// 500 Internal Server Error: Sunucu, isteği işlerken bir hata ile karşılaştı. Genellikle sunucu tarafındaki bir sorunu gösterir.
// res.status(500).send("Sunucu hatası");

// 502 Bad Gateway: Sunucu, başka bir sunucudan yanıt alırken geçersiz bir yanıt aldı. Genellikle sunucu içi hata veya yapılandırma sorunu nedeniyle oluşur.
// res.status(502).send("Geçersiz ağ geçidi");

// 503 Service Unavailable: Sunucu, geçici olarak hizmet veremiyor. Genellikle aşırı yüklenme veya bakım nedeniyle kullanılır.
// res.status(503).send("Hizmet geçici olarak kullanılamıyor");

// 504 Gateway Timeout: Sunucu, başka bir sunucudan yanıt alırken zaman aşımına uğradı. Genellikle ağ sorunları veya sunucu yoğunluğu nedeniyle oluşur.
// res.status(504).send("Ağ zaman aşımı");

require("dotenv").config();

const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("Bad request");
      return;
    }

    const oldUser = await User.findOne({ username: username });
    if (oldUser) {
      res.status(409).send("This user is already exists");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({ username: username, password: encryptedPassword });
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("Bad request");
      return;
    }

    const user = await User.findOne({ username: username }).select('+password');
    if(!user){
      res.status(404).send("User could not be found");
      return;
    }

    if(bcrypt.compareSync(password, user.password)){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1800s'});
      res.status(201).send({token});
      return;
    }
    res.status(401).send("Wrong password");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
