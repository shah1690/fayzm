import type { Locale } from "@/shared/i18n/translations";

type Props = Readonly<{
  locale: Locale;
  type: "privacy" | "terms";
}>;

const copy = {
  privacy: {
    title: {
      en: "Privacy Policy",
      uz: "Maxfiylik siyosati",
      ru: "Политика конфиденциальности",
      zh: "Privacy Policy",
    },
    lead: {
      en: "FAYZ-M respects your privacy. We collect only the information needed to respond to inquiries, process cooperation requests, and improve communication quality.",
      uz: "FAYZ-M maxfiyligingizni hurmat qiladi. Biz faqat murojaatlarga javob berish, hamkorlik so'rovlarini ko'rib chiqish va aloqa sifatini yaxshilash uchun kerakli ma'lumotlarni yig'amiz.",
      ru: "FAYZ-M уважает вашу конфиденциальность. Мы собираем только данные, необходимые для ответа на обращения, обработки запросов на сотрудничество и улучшения коммуникации.",
      zh: "FAYZ-M respects your privacy. We collect only the information needed to respond to inquiries, process cooperation requests, and improve communication quality.",
    },
    items: {
      en: [
        "Contact form data is used only for business communication.",
        "We do not sell personal information to third parties.",
        "You can request data correction or deletion by contacting us.",
      ],
      uz: [
        "Aloqa formasi ma'lumotlari faqat biznes muloqot uchun ishlatiladi.",
        "Shaxsiy ma'lumotlar uchinchi tomonlarga sotilmaydi.",
        "Ma'lumotni tuzatish yoki o'chirish uchun biz bilan bog'lanishingiz mumkin.",
      ],
      ru: [
        "Данные контактной формы используются только для деловой коммуникации.",
        "Мы не продаём персональные данные третьим лицам.",
        "Вы можете запросить исправление или удаление данных, связавшись с нами.",
      ],
      zh: [
        "联系表单中的数据仅用于商业沟通。",
        "我们不会将个人信息出售给任何第三方。",
        "您可以通过联系我们申请更正或删除数据。",
      ],
    },
  },
  terms: {
    title: {
      en: "Terms",
      uz: "Foydalanish shartlari",
      ru: "Условия использования",
      zh: "Terms",
    },
    lead: {
      en: "By using this website, you agree to use its content for lawful informational and business purposes related to FAYZ-M services and products.",
      uz: "Ushbu saytdan foydalanish orqali siz kontentdan FAYZ-M xizmatlari va mahsulotlari bo'yicha qonuniy axborot hamda biznes maqsadlarda foydalanishga rozilik bildirasiz.",
      ru: "Используя этот сайт, вы соглашаетесь применять его материалы в законных информационных и деловых целях, связанных с услугами и продукцией FAYZ-M.",
      zh: "By using this website, you agree to use its content for lawful informational and business purposes related to FAYZ-M services and products.",
    },
    items: {
      en: [
        "Website content is provided for general information.",
        "Product availability and cooperation terms are confirmed individually.",
        "FAYZ-M may update website content without prior notice.",
      ],
      uz: [
        "Saytdagi ma'lumotlar umumiy tanishuv uchun berilgan.",
        "Mahsulot mavjudligi va hamkorlik shartlari alohida tasdiqlanadi.",
        "FAYZ-M sayt kontentini oldindan ogohlantirmasdan yangilashi mumkin.",
      ],
      ru: [
        "Материалы сайта предоставлены для общего ознакомления.",
        "Наличие продукции и условия сотрудничества подтверждаются индивидуально.",
        "FAYZ-M может обновлять контент сайта без предварительного уведомления.",
      ],
      zh: [
        "网站内容仅供一般参考。",
        "产品供应情况与合作条件以单独确认为准。",
        "FAYZ-M 有权在不另行通知的情况下更新网站内容。",
      ],
    },
  },
} as const;

export function LegalPageView({ locale, type }: Props) {
  const data = copy[type];

  return (
    <main className="bg-white px-5 py-16 md:px-10 md:py-24">
      <section className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#003566]" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
            FAYZ-M
          </span>
        </div>
        <h1 className="text-4xl font-bold leading-tight text-[#070A0F] md:text-6xl">
          {data.title[locale]}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-gray-500 md:text-lg">
          {data.lead[locale]}
        </p>
        <ul className="mt-10 space-y-4">
          {data.items[locale].map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5 text-sm leading-relaxed text-gray-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
