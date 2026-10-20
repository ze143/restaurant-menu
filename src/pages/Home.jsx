import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiStar,
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiPhone,
  FiInstagram,
  FiMessageCircle,
} from "react-icons/fi";
import { FaTiktok, FaFacebook } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
        {/* تأثير الإضاءة الذهبية */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,166,35,0.15),_transparent_60%)]" />

        <motion.div className="relative text-center px-4 z-10">
          <img
            src="/img/Asset-2.ico"
            alt="logo"
            className="w-12 h-12 rounded-full border-2 border-brand-gold object-cover"
          />

          <h1 className="text-5xl md:text-7xl font-arabic text-brand-gold mb-4 drop-shadow-xl">
            عبدالحي الكبابجي
          </h1>
          <p className="text-xl md:text-2xl text-brand-white mb-2 font-bold">
            أصل المشويات
          </p>
          <p className="text-sm text-gray-400 mb-10">
            أكتر من 45 سنة من الطعم الأصلي والجودة
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/menu" className="btn-gold text-lg px-8 py-4">
              شوف المنيو
            </Link>
            <Link
              to="/ratings"
              className="px-8 py-4 rounded-xl border-2 border-brand-gold text-brand-gold font-bold hover:bg-brand-gold hover:text-brand-dark transition-all text-lg"
            >
              قيّم تجربتك
            </Link>
          </div>
        </motion.div>
      </section>

      {/* WHO */}
      <section id="who" className="py-20 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card-glass p-8 md:p-12"
        >
          <h2 className="text-4xl font-arabic text-brand-gold text-center mb-8">
            احنا مين؟
          </h2>
          <div className="text-gray-300 leading-loose text-lg text-center">
            <p>
              من سنة 1979 والحكاية بدأت، يومها كان اسمنا الأمانة، ومع السنين
              اتغير الاسم، لكن عمر الطعم ولا الجودة ما اتغيروا.
              <br />
              النهارده{" "}
              <span className="text-brand-gold font-bold">
                عبدالحي الكبابجي
              </span>{" "}
              بقى اسم له تاريخ، وثقة بناها جيل ورا جيل.
              <br />
              وسعنا المكان، وكبرنا عشان نستقبلكم بأفضل خدمة، لكن فضلنا محافظين
              على نفس الوصفة، ونفس الجودة، ونفس الطعم اللي الناس بتحبه من أكتر
              من 45 سنة.
            </p>

            {/* السطر الأخير مع الإيموجي على الشمال */}
            <div className="text-center mt-4 font-bold text-brand-gold">
              عبدالحي الكبابجي حكاية بدأت من زمان، ولسه مستمرة معاكم في كل لقمة.
              ❤️🔥
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ratings CTA */}
      <section className="py-20 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass p-10 text-center"
        >
          <FiStar className="text-brand-gold text-6xl mx-auto mb-4" />
          <h2 className="text-3xl font-arabic text-brand-gold mb-3">
            رأيك يهمنا
          </h2>
          <p className="text-gray-400 mb-6">
            ساعدنا نكون أفضل بكل صراحة وشفافية ❤️
          </p>
          <Link to="/ratings" className="btn-gold inline-block">
            قيّم تجربتك الآن
          </Link>
        </motion.div>
      </section>

      {/* Info Grid */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div id="address" className="card-glass p-8">
          <FiMapPin className="text-brand-gold text-4xl mb-4" />
          <h3 className="text-2xl font-arabic text-brand-gold mb-4">موقعنا</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d265.2575740452904!2d31.116151011370576!3d30.174550332545984!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14586975d6c8a26f%3A0x5580d79325a7f6f6!2z2LnYqNiv2KfZhNit2Yog2KfZhNmD2KjYp9io2KzZig!5e1!3m2!1sen!2seg!4v1758302414010!5m2!1sen!2seg"
            className="w-full h-64 rounded-xl border-0"
            allowFullScreen
            loading="lazy"
          />
          <div className="flex gap-4 mt-4 text-sm text-gray-400">
            <span>🛍️ تيك أواي</span>
            <span>🍽️ صالة</span>
          </div>
        </div>

        {/* Payment */}
        <div id="payment" className="card-glass p-8">
          <FiCreditCard className="text-brand-gold text-4xl mb-4" />
          <h3 className="text-2xl font-arabic text-brand-gold mb-4">
            طرق الدفع
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="font-bold text-white mb-1">💳 انستا باي</p>
              <p className="text-sm text-gray-400">
              sayedabdalhay@instapay
              </p>
              <p className="text-sm text-brand-gold">01122980014</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="font-bold text-white mb-1">
                📱 المحفظة الإلكترونية
              </p>
              <a
                href="https://flous.page.link/Y7iR"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-brand-gold underline"
              >
                اضغط للتحويل المباشر
              </a>
              <p className="text-sm text-brand-gold">01122980014</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="py-20 px-4 max-w-5xl mx-auto">
        <div className="card-glass p-8">
          <FiTruck className="text-brand-gold text-4xl mb-4" />
          <h3 className="text-2xl font-arabic text-brand-gold mb-6">
            مناطق خدمة التوصيل
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-brand-gold border-b border-brand-gold/30">
                <tr>
                  <th className="p-3 text-right">#</th>
                  <th className="p-3 text-right">المنطقة</th>
                  <th className="p-3 text-right">سعر التوصيل</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["الجلاتمة", "١٠"],
                  ["مناشي البلد", "١٥"],
                  ["منشأة القناطر", "١٥"],
                  ["منطقة السد", "٢٠/٢٥"],
                  ["الأخصاص", "٢٥/٣٠"],
                  ["بهرمس", "١٥/٢٠/٢٥/٣٠"],
                  ["الحسانين", "١٥/٢٠"],
                  ["ذات الكوم", "٣٥/٤٠"],
                  ["عزبة أبو إسماعيل", "٥٠"],
                  ["المنصورية", "٥٠"],
                  ["طريق نكلا المناشي", "٢٥"],
                  ["أم دينار", "٥٠"],
                  ["الرهاوي", "٥٠"],
                  ["أوسيم", "٤٠"],
                  ["نكلا", "٤٠"],
                  ["سقيل", "٤٠"],
                  ["طناش", "٥٠"],
                  ["دائري الوراق", "٦٠"],
                  ["الوراق", "٧٠"],
                  ["برقاش", "٤٥"],
                  ["منشأة رضوان", "٦٠"],
                  ["القناطر الخيرية", "٣٠/٣٥"],
                  ["برطس", "٢٥/٣٠"],
                  ["مرور برقاش", "٦٠"],
                  ["جزاية", "٤٥"],
                  ["كفر حجازي", "٤٠"],
                ].map(([area, price], i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{area}</td>
                    <td className="p-3 text-brand-gold">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-4 max-w-3xl mx-auto text-center"
      >
        <h3 className="text-3xl font-arabic text-brand-gold mb-8">
          تواصل معنا
        </h3>
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://wa.me/201122980014"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-2xl hover:scale-110 transition"
          >
            <FiMessageCircle />
          </a>
          <a
            href="https://www.tiktok.com/@abdelhayalkababji"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center text-2xl hover:scale-110 transition"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.facebook.com/share/1FAytRmAaP/"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl hover:scale-110 transition"
          >
            <FaFacebook />
          </a>
        </div>
        <div className="flex items-center justify-center gap-2 text-lg text-gray-300">
          <span>01143709888 - 01150015782</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
