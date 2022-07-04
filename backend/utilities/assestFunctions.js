const AppError = require('./../utilities/appError');
const path = require('path');
const { rm } = require('fs/promises');

const fs = require('fs');

exports.deleteImagesFromStorage = (arrayOfImages) => {
  for (let file of arrayOfImages) {
    const ImageName = file.img.split('/public/')[1];
    const existPath = path.join(__dirname, `../uploads/${ImageName}`);
    fs.access(existPath, fs.F_OK, (err) => {
      if (err) {
        return;
      }
      //file exists
      checkCardImageInStorage = true;
      rm(existPath).catch((err) =>
        next(new AppError('Some Thing went wrong ,Please try again later'))
      );
    });
  }
};

exports.deleteSingleImageFromStorage = (imageUrl) => {
  if (!imageUrl) return;
  const ImageName = imageUrl.split('/public/')[1];
  const existPath = path.join(__dirname, `../uploads/${ImageName}`);
  fs.access(existPath, fs.F_OK, (err) => {
    if (err) {
      return;
    }
    rm(existPath).catch((err) =>
      next(new AppError('Some Thing went wrong ,Please try again later'))
    );
  });
};

exports.takeUrlFormImageFiles = (arrayOfFiles) => {
  return arrayOfFiles.map((file) => ({
    img: `${process.env.SERVER_API}/public/${file.filename}`,
  }));
};

exports.billHtmlTemplate = () => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }

      .fatura {
        width: 595px;
        margin: 0 auto;
        background-color: #eee;
      }

      .fatura .fatura-header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 2px solid #777;
      }

      .fatura .fatura-header .ltreda-logo {
        font-family: cursive;
      }

      .fatura .fatura-header .ltreda-logo .ltreda-hed {
        font-size: 43px;
        font-weight: bold;
        color: orange;
      }

      .fatura .fatura-header .ltreda-logo .ltreda-com {
        font-size: 16px;
      }

      .fatura .fatura-header .info {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .fatura .fatura-header .info .order-info {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        margin-bottom: 5px;
      }

      .fatura .fatura-header .info .order-info__text {
        font-size: 14px;
        color: #000;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .fatura .fatura-address {
        padding: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        border-bottom: 2px solid #777;
      }

      .fatura .fatura-address__com {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .fatura .fatura-address__bill {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .fatura .orders {
        border-bottom: 2px solid #777;
      }

      .fatura .orders .order-header {
        margin: 0;
      }

      .fatura .orders .table-content {
        width: 100%;
        border-collapse: collapse;
        margin: 5px 0;
        font-size: 14px;
      }

      .fatura .orders .table-content thead tr {
        background-color: #f1f1f1;
        text-align: left;
        font-weight: bold;
      }

      .fatura .orders .table-content th,
      .fatura .orders .table-content td {
        padding: 12px 15px;
      }

      .fatura .orders .table-content tbody,
      .fatura .orders .table-content tr {
        border-bottom: 1px solid #ddd;
      }

      .fatura .orders .table-content tbody tr:nth-of-type(even) {
        background-color: #d9d9d9;
      }

      .fatura .status {
        border-bottom: 2px solid #777;
      }

      .fatura .status__info {
        padding: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .fatura .status__info .prices {
        width: 60%;
        padding: 2px;
        border: 1px solid #777;
        border-radius: 5px;
      }

      .fatura .status__info .payment {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .fatura .term {
        padding-bottom: 13px;
      }

      .fatura .term .term-turk {
        list-style: auto;
        font-size: 14px;
      }

      .fatura .term .term-arab {
        list-style: persian;
        direction: rtl;
        font-size: 14px;
      }

      .box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        margin: 5px;
      }

      .box .text-head {
        font-size: 14px;
        color: #000;
        font-weight: bold;
      }

      .box .text-val {
        font-size: 14px;
        color: #313131;
        font-weight: 500;
        max-width: 180px;
      }

      .inline-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .inline-box__head {
        font-size: 14px;
        font-weight: bold;
        padding: 2px;
      }

      .inline-box__val {
        font-size: 14px;
      }

      .section-header {
        margin-top: 3px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
      }
      /*# sourceMappingURL=fatura.css.map */
    </style>
  </head>
  <body>
    <div class="fatura">
      <span class="section-header">فاتورة شراء/Fatura</span>
      <div class="fatura-header">
        <div class="ltreda-logo">
          <span class="ltreda-hed">Ltreda</span>
          <span class="ltreda-com">.com</span>
        </div>
        <div class="info">
          <div class="order-info">
            <span class="order-info__text">معرف الطلب/Order Id/Sipariş Id</span>
            <span class="order-info__val">#6293839e27512ce7d31f188b</span>
          </div>
          <div class="order-info">
            <span class="order-info__text">تاريخ/Tarih/Date</span>
            <span class="order-info__val">17.6.2022 14:17:23</span>
          </div>
        </div>
      </div>
      <span class="section-header">Adres bilgisi/معلومات العنوان</span>
      <div class="fatura-address">
        <div class="fatura-address__com">
          <div class="box">
            <span class="text-head">Gönderici/المرسل</span>
            <span class="text-val">Ltreda Company</span>
          </div>
          <div class="box">
            <span class="text-head">Email</span>
            <span class="text-val">ecommerace@ltreda.com</span>
          </div>
          <div class="box">
            <span class="text-head">Telephone</span>
            <span class="text-val">+905538589198</span>
          </div>
          <div class="box">
            <span class="text-head">Address</span>
            <span class="text-val"
              >Çiftlik Mah.100yil Blv 225/1 Ilkadim samsun Turkey</span
            >
          </div>
        </div>
        <div class="fatura-address__bill">
          <div class="box">
            <span class="text-head">المستلم/Alıcı</span>
            <span class="text-val">Ltreda</span>
          </div>
          <div class="box">
            <span class="text-head">Email</span>
            <span class="text-val">ecommerace@ltreda.com</span>
          </div>
          <div class="box">
            <span class="text-head">Telephone</span>
            <span class="text-val">+905538589198</span>
          </div>
          <div class="box">
            <span class="text-head">Address</span>
            <span class="text-val"
              >Çiftlik Mah.100yil Blv 225/1 Ilkadim samsun Turkey</span
            >
          </div>
        </div>
      </div>

      <div class="orders">
        <span class="section-header">Ürün/المنتح</span>
        <table class="table-content">
          <thead>
            <tr>
              <th>No</th>
              <th>الاسم/Ad</th>
              <th>ألعدد/Sayı</th>
              <th>السعر/Fiyat</th>
              <th>البائع/Satıcı</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>PlayStation 5 Console.</td>
              <td>1</td>
              <td>250,500 دع</td>
              <td>Dream</td>
            </tr>
            <tr>
              <td>2</td>
              <td>PlayStation 5 Console.</td>
              <td>1</td>
              <td>250,500 دع</td>
              <td>Dream</td>
            </tr>
            <tr>
              <td>3</td>
              <td>PlayStation 5 Console.</td>
              <td>1</td>
              <td>250,500 دع</td>
              <td>Dream</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="status">
        <div class="section-header">Özet/خلاصة</div>
        <div class="status__info">
          <div class="payment">
            <div class="box">
              <span class="text-head">Ödeme Para Birimi/عملة الدفع</span>
              <span class="text-val">IQD</span>
            </div>
            <div class="box">
              <span class="text-head">Ödeme şekli/طريقة الدفع</span>
              <span class="text-val">عند الاستلام</span>
            </div>
            <div class="box">
              <span class="text-head"
                >Tahmini varış zamanı/الوقت المتوقع للتسليم</span
              >
              <span class="text-val">7 - 21 iş günü/يوم عمل</span>
            </div>
          </div>
          <div class="prices">
            <div class="inline-box">
              <span class="inline-box__head">إجمالي الطلب/sipariş toplamı</span>
              <span class="inline-box__val">250,500 دع</span>
            </div>
            <div class="inline-box">
              <span class="inline-box__head">السعر الكلي/Toplam fiyat</span>
              <span class="inline-box__val">250,500 دع</span>
            </div>
            <div class="inline-box">
              <span class="inline-box__head">تخفيض/İndirim</span>
              <span class="inline-box__val">250,500 دع</span>
            </div>
            <div class="inline-box">
              <span class="inline-box__head">شحن/Kargo</span>
              <span class="inline-box__val">مضاف مع السعر/Fiyata eklendi</span>
            </div>
            <hr />
            <div class="inline-box">
              <span class="inline-box__head">السعر النهائي/Son fiyat</span>
              <span class="inline-box__val">250,500 دع</span>
            </div>
          </div>
        </div>
      </div>

      <div class="term">
        <span class="section-header">TERMS AND CONDITIONS</span>
        <ul class="term-turk">
          <li>
            The Seller shall not be liable to the Buyer directly or indirectly
            for any loss or damage suffered by the Buyer.
          </li>
          <li>
            The Seller warrants the product for one (1) year from the date of
            shipment.
          </li>

          <li>
            Any purchase order received by the seller will be interpreted as
            accepting this offer and the sale offer in writing. The buyer may
            purchase the product in this offer only under the Terms and
            Conditions of the SelIer included in this offer.
          </li>
        </ul>
        <ul class="term-arab">
          <li>
            لن يكون البائع مسؤولاً تجاه المشتري بشكل مباشر أو غير مباشر عن أي
            خسارة أو ضرر يتكبده المشتري.
          </li>
          <li>يضمن البائع المنتج لمدة عام واحد (1) من تاريخ شحنة.</li>

          <li>
            سيتم تفسير أي طلب شراء يستلمه البائع على أنه قبول هذا العرض وعرض
            البيع كتابةً. يجوز للمشتري شراء المنتج في هذا العرض فقط بموجب شروط
            وأحكام البائع المدرجة في هذا العرض.
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>
`;
};
