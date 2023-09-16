# Node.js Authentication Projesi

Bu proje, basit bir Node.js kimlik doğrulama örneğini içermektedir. Kullanıcıların kaydolmasını, giriş yapmasını ve oturum açmasını sağlayan bir web uygulamasıdır.

## Başlangıç

Bu talimatlar, projeyi yerel makinenizde çalıştırmak ve geliştirmek için bir kopyasını elde etmenize yardımcı olacaktır.

### Gereksinimler

Bu projeyi çalıştırmak için aşağıdaki yazılımlara ihtiyacınız vardır:

- Node.js
- MongoDB (yerel kurulum veya bulut hizmeti)

### Kurulum

1. Projeyi bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/codewitheren/nodejs-authentication.git
   
2. Proje dizinine gidin:
   ```bash
   cd nodejs-authentication
   
3. Bağımlılıkları yükleyin:
   ```bash
   npm install

5. MongoDB bağlantı bilgilerini .env dosyasında yapılandırın. .env adında bir dosya oluşturun ve aşağıdaki çevresel değişkenleri tanımlayın:
   ```bash
   PORT=3000
   HOST=127.0.0.1
   DB_URL=mongodb://localhost/auth-example
   JWT_SECRET=your-secret-key
   
4. Uygulamayı çalıştırın:
   ```bash
   npm start
   
## Kullanım

Bu projenin API'sini test etmek için Postman veya benzeri bir API test aracı kullanabilirsiniz.

```json
{
  "username": "kullanici_adi",
  "password": "sifre123"
}
