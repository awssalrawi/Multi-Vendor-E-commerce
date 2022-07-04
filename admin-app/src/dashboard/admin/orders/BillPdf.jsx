import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import "./styles/bill.scss";
import { useLocation } from "react-router-dom";
export default function BillPdf() {
  let componentRef = useRef();

  const location = useLocation();

  console.log(location);
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Bill</button>}
        content={() => componentRef}
      />

      {/* component to be printed */}
      <div
        ref={(el) => (componentRef = el)}
        style={{ width: "100%", height: window.innerHeight, padding: "5px" }}
      >
        <div className="fatura">
          <span className="section-header">فاتورة شراء/Fatura</span>
          <div className="fatura-header">
            <div className="ltreda-logo">
              <span className="ltreda-hed">Ltreda</span>
              <span className="ltreda-com">.com</span>
            </div>
            <div className="info">
              <div className="order-info">
                <span className="order-info__text">معرف الطلب/Sipariş Id</span>
                <span className="order-info__val">
                  #6293839e27512ce7d31f188b
                </span>
              </div>
              <div className="order-info">
                <span className="order-info__text">تاريخ/Tarih</span>
                <span className="order-info__val">17.6.2022 14:17:23</span>
              </div>
            </div>
          </div>
          <span className="section-header">Adres bilgisi/معلومات العنوان</span>
          <div className="fatura-address">
            <div className="fatura-address__com">
              <div className="box">
                <span className="text-head">Gönderici/المرسل</span>
                <span className="text-val">Ltreda Company</span>
              </div>
              <div className="box">
                <span className="text-head">Email</span>
                <span className="text-val">ecommerace@ltreda.com</span>
              </div>
              <div className="box">
                <span className="text-head">Telephone</span>
                <span className="text-val">+905538589198</span>
              </div>
              <div className="box">
                <span className="text-head">Address</span>
                <span className="text-val">
                  Çiftlik Mah.100yil Blv 225/1 Ilkadim samsun Turkey
                </span>
              </div>
            </div>
            <div className="fatura-address__bill">
              <div className="box">
                <span className="text-head">المستلم/Alıcı</span>
                <span className="text-val">Ltreda</span>
              </div>
              <div className="box">
                <span className="text-head">Email</span>
                <span className="text-val">ecommerace@ltreda.com</span>
              </div>
              <div className="box">
                <span className="text-head">Telephone</span>
                <span className="text-val">+905538589198</span>
              </div>
              <div className="box">
                <span className="text-head">Address</span>
                <span className="text-val">
                  Çiftlik Mah.100yil Blv 225/1 Ilkadim samsun Turkey
                </span>
              </div>
            </div>
          </div>

          <div className="orders">
            <span className="section-header">Ürün/المنتح</span>
            <table className="table-content">
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

          <div className="status">
            <div className="section-header">Özet/خلاصة</div>
            <div className="status__info">
              <div className="payment">
                <div className="box">
                  <span className="text-head">
                    Ödeme Para Birimi/عملة الدفع
                  </span>
                  <span className="text-val">IQD</span>
                </div>
                <div className="box">
                  <span className="text-head">Ödeme şekli/طريقة الدفع</span>
                  <span className="text-val">عند الاستلام</span>
                </div>
                <div className="box">
                  <span className="text-head">
                    Tahmini varış zamanı/الوقت المتوقع للتسليم
                  </span>
                  <span className="text-val">7 - 21 iş günü/يوم عمل</span>
                </div>
              </div>
              <div className="prices">
                <div className="inline-box">
                  <span className="inline-box__head">
                    إجمالي الطلب/sipariş toplamı
                  </span>
                  <span className="inline-box__val">250,500 دع</span>
                </div>
                <div className="inline-box">
                  <span className="inline-box__head">
                    السعر الكلي/Toplam fiyat
                  </span>
                  <span className="inline-box__val">250,500 دع</span>
                </div>
                <div className="inline-box">
                  <span className="inline-box__head">تخفيض/İndirim</span>
                  <span className="inline-box__val">250,500 دع</span>
                </div>
                <div className="inline-box">
                  <span className="inline-box__head">شحن/Kargo</span>
                  <span className="inline-box__val">
                    مضاف مع السعر/Fiyata eklendi
                  </span>
                </div>
                <hr />
                <div className="inline-box">
                  <span className="inline-box__head">
                    السعر النهائي/Son fiyat
                  </span>
                  <span className="inline-box__val">250,500 دع</span>
                </div>
              </div>
            </div>
          </div>

          <div className="term">
            <span className="section-header">TERMS AND CONDITIONS</span>
            <ul className="term-turk">
              <li>
                The Seller shall not be liable to the Buyer directly or
                indirectly for any loss or damage suffered by the Buyer.
              </li>
              <li>
                The Seller warrants the product for one (1) year from the date
                of shipment.
              </li>

              <li>
                Any purchase order received by the seller will be interpreted as
                accepting this offer and the sale offer in writing. The buyer
                may purchase the product in this offer only under the Terms and
                Conditions of the SelIer included in this offer.
              </li>
            </ul>
            <ul className="term-arab">
              <li>
                لن يكون البائع مسؤولاً تجاه المشتري بشكل مباشر أو غير مباشر عن
                أي خسارة أو ضرر يتكبده المشتري.
              </li>
              <li>يضمن البائع المنتج لمدة عام واحد (1) من تاريخ شحنة.</li>

              <li>
                سيتم تفسير أي طلب شراء يستلمه البائع على أنه قبول هذا العرض وعرض
                البيع كتابةً. يجوز للمشتري شراء المنتج في هذا العرض فقط بموجب
                شروط وأحكام البائع المدرجة في هذا العرض.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
