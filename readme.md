# 📘 New Headway Tracker

**New Headway Tracker**, *New Headway* (SB / WB / Oxford Online) kitaplarıyla çalışanlar için geliştirilmiş,
**günlük İngilizce çalışma kayıtlarını TXT dosyası olarak GitHub repo’suna kaydeden**
hafif, backend’siz bir takip uygulamasıdır.

Uygulama **GitHub Pages** üzerinden çalışır ve kayıtları **doğrudan GitHub API** üzerinden
repo’ya **commit** olarak ekler.

---

## 🎯 Amaç

- Günlük İngilizce çalışmanı tek yerden takip etmek  
- Hangi gün hangi **skill**’leri (reading, listening, grammar vb.) çalıştığını görmek  
- Çalışma kayıtlarını **tarihli, versiyonlu ve kalıcı** şekilde saklamak  
- Notion / Excel gibi araçlara bağımlı kalmadan **kontrolü GitHub’da tutmak**

---

## 🧠 Nasıl Çalışır?

Çalışma akışı:

1. GitHub Pages üzerinden uygulamayı açarsın
2. Günlük çalışmanı işaretlersin
3. “Save to GitHub (TXT)” butonuna basarsın
4. Tarayıcı GitHub REST API’ye istek atar
5. Repo içine TXT dosyası eklenir veya güncellenir
6. GitHub bu işlemi **commit** olarak kaydeder

> ❗ Her kayıt **gerçek bir GitHub commit’idir**

---

## 📂 Repo Yapısı

Uygulama kayıtları otomatik olarak şu yapıda oluşturur:

NewHeadway/
Elementary/
Unit-01/
2025-01-14.txt
2025-01-15.txt

markdown
Kodu kopyala

- Kitap seviyesine göre klasörlenir  
- Ünite bazlı ayrılır  
- Dosya adı **tarih**tir  

---

## 🛠 Kurulum – Adım Adım

### 1️⃣ GitHub Repo Oluştur

1. GitHub’da **yeni bir repo** oluştur  
   - Public veya **Private** olabilir
2. Repo adı örnek:  
new-headway-tracker

yaml
Kodu kopyala

---

### 2️⃣ Dosyaları Repo’ya Ekle

Repo kök dizinine şu dosyaları ekle:

index.html
style.css
app.js
README.md

yaml
Kodu kopyala

---

### 3️⃣ GitHub Pages’i Aktif Et

1. Repo → **Settings**
2. **Pages** sekmesi
3. Source:
   - Branch: `main`
   - Folder: `/ (root)`
4. Kaydet

Sayfa birkaç saniye sonra şu adresten erişilebilir olur:

https://kullaniciadi.github.io/new-headway-tracker/

yaml
Kodu kopyala

---

## 🔑 GitHub Token (ZORUNLU)

Bu uygulama GitHub’a dosya yazabilmek için **Fine-grained Personal Access Token** kullanır.

### Token Nasıl Alınır?

1. GitHub → **Settings**
2. **Developer settings**
3. **Personal access tokens**
4. **Fine-grained tokens**
5. **Generate new token**

---

### Token Ayarları (ÇOK ÖNEMLİ)

#### Repository access
- ✅ **Only select repositories**
- ✅ Bu tracker repo’sunu seç

#### Permissions
- **Contents** → `Read and write` ✅

Başka hiçbir izin gerekmez.

---

### Token Kullanımı

- Token, uygulamadaki **GitHub Connection** alanına girilir
- “Save settings” ile kaydedilir
- Token **sadece tarayıcının localStorage’ında tutulur**
- Repo’ya **asla commit edilmez**

> ⚠️ Token’ı kimseyle paylaşma

---

## 🧩 Bölümler ve Anlamları

### 📘 SB (Student Book) / WB (Work Book)
- Skills: reading, listening, speaking, writing, grammar, vocabulary, pronunciation
- Page: Örn. `P. 6-7`
- Note: Serbest not alanı

### 🌐 OX (Oxford New Headway Online)
- Skills: reading, listening, speaking, writing, grammar, vocabulary, **everyday_eng**
- Page: Örn. `P. 6-7`

### 🎧 Podcast
- Skills otomatik: `listening, pronunciation`
- Ref: Örn. *Harry Potter and the Sorcerer's Stone*
- Min: Dinleme süresi (dk)

### 🎬 Film / Series
- Skills otomatik: `listening, pronunciation`
- Ref: Örn. *The Lord of the Rings*
- Min: İzleme süresi (dk)

### 🔁 Review
- Önceki üniteleri tekrar etmek için
- Skills işaretlenebilir
- Ref: Hangi üniteler tekrarlandı

---

## 📝 TXT Çıktı Örneği

NEW HEADWAY Elementary
Unit 01
DATE: 2025-01-14

SB:
skills: reading, listening, speaking
page: P. 6-7
note: Personal information

PODCAST:
skills: listening, pronunciation
ref: Harry Potter Book 1
min: 30


---

## 🔒 Güvenlik

- Repo private olabilir
- Token sadece senin tarayıcında
- Backend yok
- Veri paylaşımı yok

---

## ⚠️ Bilinen Sınırlamalar

- Multi-user değildir
- Aynı gün yapılan kayıtlar aynı dosyayı günceller
- Offline çalışmaz

---

## ✨ Neden Bu Yaklaşım?

- Basit
- Şeffaf
- Kontrol sende
- GitHub commit geçmişinde çalışmanı görürsün
- Öğrenme süreci **somutlaşır**

---

## 📌 Son Not

Bu uygulama bir “alıştırma takipçisi” değil,
**kişisel öğrenme günlüğü + versiyon kontrol sistemi** gibidir.

Gerekirse:
- Haftalık özet
- Progress yüzdesi
- Today view

eklenebilir.  
Ama mevcut haliyle bile **fazlasıyla yeterli ve bilinçli** bir sistemdir.