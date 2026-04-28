export type FaqItem = Readonly<{ question: string; answer: string }>;

export const faqContent = {
  en: {
    title: "Frequently\nAsked Questions",
    subtitle: "Here are answers to common questions about us.",
    stillHaveQuestions: "Still have questions?",
    stillHaveDesc:
      "Can't find the answer you're looking for? Please chat to our friendly team!",
    scheduleCall: "Schedule a Call",
    items: [
      {
        question: "What is the minimum order quantity?",
        answer:
          "The minimum order quantity is 3,000 pieces per color and model. Smaller volumes are available at higher per-unit costs.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "The company requires a 30% upfront payment to start production. Once goods are complete, customers pay the remaining 70% before collection.",
      },
      {
        question: "Would you be able to produce products under our brand name?",
        answer: "Yes, certainly, we can manufacture products under your brand.",
      },
      {
        question: "How long does production take after payment?",
        answer:
          "Typical production requires 2 to 2.5 months following payment, though expedited timelines are negotiable on a case-by-case basis.",
      },
      {
        question:
          "Who will be our point of contact during the order and production process?",
        answer:
          "A custom sample is prepared and approved initially. Subsequently, a dedicated sales manager provides daily communication and support throughout production.",
      },
      {
        question: "Can you create a custom design for us?",
        answer:
          "Absolutely. If you need a personalized design, we can develop one for you. Exclusive brand agreements are available to protect custom designs.",
      },
    ] satisfies FaqItem[],
  },
  uz: {
    title: "Ko'p so'raladigan\nsavollar",
    subtitle: "Hamkorlar ko'p so'raydigan savollarga qisqa javoblar.",
    stillHaveQuestions: "Savollar qoldimi?",
    stillHaveDesc: "Kerakli javobni topmadingizmi? Jamoamiz bilan bog'laning.",
    scheduleCall: "Qo'ng'iroq rejalashtirish",
    items: [
      {
        question: "Minimal buyurtma miqdori qancha?",
        answer:
          "Minimal buyurtma miqdori — har bir rang va model uchun 3 000 dona. Kichikroq hajmlar ham mumkin, lekin birlik narxi yuqoriroq bo'ladi.",
      },
      {
        question: "Qanday to'lov usullarini qabul qilasiz?",
        answer:
          "Ishlab chiqarishni boshlash uchun 30% avans to'lovi qilinadi. Buyurtma tayyor bo'lgach, qolgan 70% mahsulotni olishdan oldin to'lanadi.",
      },
      {
        question: "Bizning brend nomi ostida mahsulot ishlab chiqara olasizmi?",
        answer:
          "Ha, mahsulotlarni sizning brendingiz ostida ishlab chiqaramiz.",
      },
      {
        question: "To'lovdan keyin ishlab chiqarish qancha vaqt oladi?",
        answer:
          "Odatda ishlab chiqarish to'lovdan keyin 2 dan 2,5 oyga qadar davom etadi, lekin muddatlar alohida kelishilishi mumkin.",
      },
      {
        question:
          "Buyurtma va ishlab chiqarish jarayonida bizning aloqa nuqtamiz kim bo'ladi?",
        answer:
          "Avval namuna tayyorlanadi va tasdiqlanadi. Keyin shaxsiy savdo menejeri buyurtma jarayonini kuzatib boradi.",
      },
      {
        question: "Bizga maxsus dizayn yaratib bera olasizmi?",
        answer:
          "Ha. Kerak bo'lsa, siz uchun maxsus dizayn ishlab chiqamiz. Eksklyuziv dizaynlar bo'yicha alohida kelishuv ham mumkin.",
      },
    ] satisfies FaqItem[],
  },
  ru: {
    title: "Часто Задаваемые\nВопросы",
    subtitle: "Ответы на часто задаваемые вопросы о нас.",
    stillHaveQuestions: "Остались вопросы?",
    stillHaveDesc:
      "Не можете найти ответ? Пожалуйста, свяжитесь с нашей командой!",
    scheduleCall: "Запланировать звонок",
    items: [
      {
        question: "Каков минимальный объём заказа?",
        answer:
          "Минимальный объём заказа составляет 3 000 штук на цвет и модель. Меньшие объёмы доступны по более высокой цене за единицу.",
      },
      {
        question: "Какие способы оплаты вы принимаете?",
        answer:
          "Компания требует 30% предоплаты для начала производства. После завершения заказа клиент оплачивает оставшиеся 70% перед получением товара.",
      },
      {
        question: "Вы можете производить продукцию под нашим брендом?",
        answer:
          "Да, конечно, мы можем производить продукцию под вашим брендом.",
      },
      {
        question: "Сколько времени занимает производство после оплаты?",
        answer:
          "Стандартное производство занимает 2–2,5 месяца после оплаты. Ускоренные сроки могут быть согласованы в индивидуальном порядке.",
      },
      {
        question: "Кто будет нашим контактным лицом в процессе заказа?",
        answer:
          "Сначала готовится и согласовывается образец. Затем назначается персональный менеджер по продажам, который обеспечивает ежедневную коммуникацию.",
      },
      {
        question: "Вы можете создать для нас индивидуальный дизайн?",
        answer:
          "Абсолютно. При необходимости мы разработаем дизайн специально для вас. Также доступны эксклюзивные соглашения для защиты авторских разработок.",
      },
    ] satisfies FaqItem[],
  },
} as const;
