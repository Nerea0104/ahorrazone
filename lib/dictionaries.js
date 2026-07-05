// Bilingual copy (ES = main market, EN = secondary). Server-only — loaded via
// getDictionary() in lib/i18n.js. Add new UI strings to BOTH languages.

export const dictionaries = {
  es: {
    nav: { ofertas: "Ofertas", privacy: "Privacidad", cta: "Abrir bot" },
    home: {
      eyebrow: "Alertas de precio de Amazon, AliExpress y El Corte Inglés",
      h1Line1: "Ahorra en tus compras online",
      h1Line2: "sin vigilar los precios",
      lead: "rastrea los precios de Amazon, AliExpress y El Corte Inglés por ti. Pega el enlace de un producto —o escribe qué buscas— y elige cuándo quieres que te avise.",
      ctaTelegram: "Usar en Telegram",
      ctaChannel: "📢 Canal de chollos",
      channelNote:
        "Cada día publicamos los mejores chollos y mínimos históricos en nuestro canal de Telegram.",
      trust: ["Gratis", "Sin registro", "Amazon · AliExpress · El Corte Inglés", "Avisos al instante"],
      preview: {
        label: "Ejemplo de aviso",
        bot: "Ahorrazone bot",
        badge: "🔥 ¡Mínimo histórico!",
        product: "Robot aspirador Conga",
        was: "antes 199,99€",
        now: "ahora 119,99€",
        pct: "−40%",
        cta: "Ver oferta",
      },
      slides: [
        { badge: "🔥 ¡Mínimo histórico!", product: "Robot aspirador Conga", was: "199,99 €", now: "119,99 €", pct: "−40%", store: "Amazon" },
        { badge: "⚡ Oferta flash · 3h", product: "AirPods Pro 3ª gen.", was: "279,00 €", now: "179,00 €", pct: "−36%", store: "El Corte Inglés" },
        { badge: "📦 ¡Vuelve a stock!", product: "Xiaomi Pad 7 Pro", was: "449,99 €", now: "329,99 €", pct: "−27%", store: "AliExpress" },
      ],
      stats: [
        { num: "+10.000", label: "alertas enviadas" },
        { num: "+3.900", label: "usuarios en la comunidad" },
        { num: "3", label: "tiendas monitorizadas" },
      ],
      stepsTitle: "Cómo funciona",
      steps: [
        {
          icon: "🔎",
          h: "Pega un enlace o busca",
          p: "Pega el link de un producto, o escribe qué quieres y elige entre Amazon, AliExpress o El Corte Inglés.",
        },
        {
          icon: "🎯",
          h: "Elige tu alerta",
          p: "Cualquier bajada, un %, un precio objetivo o aviso de vuelta a stock.",
        },
        {
          icon: "🎉",
          h: "Recibe el chollo",
          p: "Te avisamos al instante cuando baja, con el enlace de compra.",
        },
      ],
      channelCta: {
        eyebrow: "Únete a Ahorrazone Hunters 🎯",
        h: "No es solo un canal. Es una comunidad.",
        lead: "Cada día publicamos ofertas basadas en datos reales — y tú también puedes participar.",
        features: [
          { icon: "🏷️", text: "La mejor oferta del día en cada categoría" },
          { icon: "🔥", text: "Super ofertas cuando el precio cae más del 30%" },
          { icon: "🏆", text: "Mínimos históricos: el precio más bajo de toda la historia" },
          { icon: "📊", text: "El top de las bajadas más grandes del día" },
          { icon: "🥇", text: "Ranking semanal de los mejores hunters" },
          { icon: "🎁", text: "Sorteos y premios para la comunidad" },
        ],
        participateH: "¿Y si la oferta te la encuentras tú?",
        participateP: "Cuando el bot te avise de una bajada, recomiéndasela a toda la comunidad con un toque. Si el descuento es ≥5%, sale al canal al momento. Cada publicación suma 1 punto — con 100 canjas una tarjeta regalo Amazon de 5€.",
        cta: "Unirse al canal gratis →",
      },
    },
    ofertas: {
      title: "Ofertas",
      subtitle: "Los mejores chollos detectados en Amazon, AliExpress y El Corte Inglés",
      empty: "Aún no hay ofertas publicadas. ¡Vuelve pronto!",
      off: "dto.",
      save: "ahorras",
      view: "Ver oferta",
      filterAll: "Todas",
      filterAmazon: "Amazon",
      filterAli: "AliExpress",
      filterEci: "El Corte Inglés",
    },
    deal: {
      detectedOn: "Precio detectado el",
      before: "antes",
      ctaTelegram: "Ver precio actual en Telegram",
      ctaAmazon: "Ver en Amazon",
      ctaAli: "Ver en AliExpress",
      ctaEci: "Ver en El Corte Inglés",
      disclaimer:
        "El precio mostrado es el detectado en esa fecha y puede haber cambiado. Comprueba el precio actual en la tienda.",
      follow: "Sigue el precio gratis y te avisamos si baja 🔔",
      backToDeals: "← Todas las ofertas",
    },
    privacy: {
      title: "Política de privacidad",
      intro:
        "Esta Política de Privacidad describe cómo Ahorrazone («nosotros») trata la información del usuario cuando usas nuestros servicios en Telegram.",
      sections: [
        {
          h: "1. Información que recopilamos",
          p: "No recopilamos datos personales como nombres, direcciones o información de pago. Los únicos datos que se procesan son el enlace del producto de Amazon que facilita el usuario y los ajustes de alerta de precio seleccionados.",
        },
        {
          h: "2. Cómo usamos la información",
          p: "La información facilitada se usa exclusivamente para vigilar cambios de precio y disponibilidad del producto y avisar al usuario cuando se cumplen sus condiciones de alerta.",
        },
        {
          h: "3. Aviso de afiliados",
          p: "Ahorrazone participa en el Programa de Afiliados de Amazon. Cuando un usuario hace clic en un enlace de Amazon facilitado por Ahorrazone y realiza una compra, podemos ganar una comisión sin coste adicional para el usuario.",
        },
        {
          h: "4. Cookies",
          p: "Podemos usar cookies esenciales necesarias para el funcionamiento básico del sitio web. No usamos cookies de seguimiento ni publicitarias.",
        },
        {
          h: "5. Enlaces externos",
          p: "Nuestro sitio web puede contener enlaces a sitios externos, incluido Amazon. No nos hacemos responsables de las prácticas de privacidad de esos sitios.",
        },
        {
          h: "6. Cambios en esta política",
          p: "Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Las actualizaciones se publicarán en esta página.",
        },
        {
          h: "7. Contacto",
          p: "Si tienes preguntas sobre esta Política de Privacidad, contáctanos en: darkseams@gmail.com",
        },
      ],
    },
    footer: {
      tagline: "Alertas de precio gratis en Telegram.",
      colExplore: "Explorar",
      linkDeals: "Ofertas",
      linkPrivacy: "Privacidad",
      colCommunity: "Comunidad",
      linkBot: "Bot de Telegram",
      linkChannel: "Canal de chollos",
      colStores: "Tiendas",
      copyright: "Ahorrazone. Todos los derechos reservados.",
      affiliate:
        "Como afiliados de Amazon y AliExpress ganamos una pequeña comisión por las compras realizadas a través de nuestros enlaces, sin coste adicional para ti.",
    },
    meta: {
      homeTitle: "Ahorrazone — Alertas de precio y chollos de Amazon, AliExpress y El Corte Inglés",
      homeDescription:
        "Ahorrazone vigila los precios de Amazon, AliExpress y El Corte Inglés por ti y te avisa cuando bajan. Recibe alertas gratis en Telegram.",
      ofertasTitle: "Ofertas y chollos de Amazon, AliExpress y El Corte Inglés — Ahorrazone",
      ofertasDescription:
        "Las mejores ofertas y chollos detectados en Amazon, AliExpress y El Corte Inglés. Sigue el precio gratis en Telegram.",
      privacyTitle: "Política de privacidad — Ahorrazone",
    },
  },

  en: {
    nav: { ofertas: "Deals", privacy: "Privacy", cta: "Open bot" },
    home: {
      eyebrow: "Price & stock alerts — Amazon, AliExpress & El Corte Inglés",
      h1Line1: "Save on your online shopping",
      h1Line2: "without watching prices",
      lead: "tracks prices across Amazon, AliExpress and El Corte Inglés for you. Paste a product link — or type what you're looking for — and choose when you want to be alerted.",
      ctaTelegram: "Use on Telegram",
      ctaChannel: "📢 Deals channel",
      channelNote:
        "Every day we post the best deals and all-time lows in our Telegram channel.",
      channelCta: {
        eyebrow: "Join Ahorrazone Hunters 🎯",
        h: "Not just a channel. A community.",
        lead: "Every day we post deals based on real data — and you can take part too.",
        features: [
          { icon: "🏷️", text: "Best deal of the day in every category" },
          { icon: "🔥", text: "Super deals when the price drops more than 30%" },
          { icon: "🏆", text: "All-time lows: the cheapest a product has ever been" },
          { icon: "📊", text: "The top biggest price drops of the day" },
          { icon: "🥇", text: "Weekly ranking of the best hunters" },
          { icon: "🎁", text: "Raffles and prizes for the community" },
        ],
        participateH: "Spotted a deal yourself?",
        participateP: "When the bot alerts you to a price drop, share it with the whole community with one tap. If the discount is ≥5%, it goes live on the channel instantly. Every post earns 1 point — redeem 100 for a €5 Amazon gift card.",
        cta: "Join the channel for free →",
      },
      trust: ["Free", "No sign-up", "Amazon · AliExpress · El Corte Inglés", "Instant alerts"],
      preview: {
        label: "Example alert",
        bot: "Ahorrazone bot",
        badge: "🔥 All-time low!",
        product: "Conga robot vacuum",
        was: "was £199.99",
        now: "now £119.99",
        pct: "−40%",
        cta: "View deal",
      },
      slides: [
        { badge: "🔥 All-time low!", product: "Conga robot vacuum", was: "£199.99", now: "£119.99", pct: "−40%", store: "Amazon" },
        { badge: "⚡ Flash deal · 3h", product: "AirPods Pro 3rd gen.", was: "£279.00", now: "£179.00", pct: "−36%", store: "El Corte Inglés" },
        { badge: "📦 Back in stock!", product: "Xiaomi Pad 7 Pro", was: "£449.99", now: "£329.99", pct: "−27%", store: "AliExpress" },
      ],
      stats: [
        { num: "+10,000", label: "alerts sent" },
        { num: "+3,900", label: "community members" },
        { num: "3", label: "stores tracked" },
      ],
      stepsTitle: "How it works",
      steps: [
        {
          icon: "🔎",
          h: "Paste a link or search",
          p: "Paste a product link, or type what you want and pick from Amazon, AliExpress or El Corte Inglés suggestions.",
        },
        {
          icon: "🎯",
          h: "Pick your alert",
          p: "Any drop, a %, a target price, or a back-in-stock alert.",
        },
        {
          icon: "🎉",
          h: "Get the deal",
          p: "We ping you instantly when it drops, with the buy link.",
        },
      ],
    },
    ofertas: {
      title: "Deals",
      subtitle: "The best deals spotted on Amazon, AliExpress and El Corte Inglés",
      empty: "No deals published yet. Check back soon!",
      off: "off",
      save: "save",
      view: "View deal",
      filterAll: "All",
      filterAmazon: "Amazon",
      filterAli: "AliExpress",
      filterEci: "El Corte Inglés",
    },
    deal: {
      detectedOn: "Price spotted on",
      before: "was",
      ctaTelegram: "See current price on Telegram",
      ctaAmazon: "View on Amazon",
      ctaAli: "View on AliExpress",
      ctaEci: "View on El Corte Inglés",
      disclaimer:
        "The price shown is the one spotted on that date and may have changed. Check the current price on the store.",
      follow: "Track the price for free and we'll alert you if it drops 🔔",
      backToDeals: "← All deals",
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        'This Privacy Policy describes how Ahorrazone ("we", "our", "us") handles user information when you use our services on Telegram.',
      sections: [
        {
          h: "1. Information We Collect",
          p: "We do not collect personal data such as names, addresses, or payment information. The only data processed is the Amazon product link provided by the user and the selected price alert settings.",
        },
        {
          h: "2. How We Use the Information",
          p: "The provided information is used exclusively to monitor price changes and product availability and notify users when their alert conditions are met.",
        },
        {
          h: "3. Affiliate Disclosure",
          p: "Ahorrazone participates in the Amazon Affiliate Program. When users click on an Amazon link provided by Ahorrazone and make a purchase, we may earn a commission at no extra cost to the user.",
        },
        {
          h: "4. Cookies",
          p: "We may use essential cookies required for basic website functionality. No tracking or advertising cookies are used.",
        },
        {
          h: "5. External Links",
          p: "Our website may contain links to external websites, including Amazon. We are not responsible for the privacy practices of those websites.",
        },
        {
          h: "6. Changes to This Policy",
          p: "We reserve the right to update this Privacy Policy at any time. Updates will be published on this page.",
        },
        {
          h: "7. Contact",
          p: "If you have questions about this Privacy Policy, please contact us at: darkseams@gmail.com",
        },
      ],
    },
    footer: {
      tagline: "Free price alerts on Telegram.",
      colExplore: "Explore",
      linkDeals: "Deals",
      linkPrivacy: "Privacy",
      colCommunity: "Community",
      linkBot: "Telegram bot",
      linkChannel: "Deals channel",
      colStores: "Stores",
      copyright: "Ahorrazone. All rights reserved.",
      affiliate:
        "As Amazon and AliExpress affiliates we earn a small commission on purchases made through our links, at no extra cost to you.",
    },
    meta: {
      homeTitle: "Ahorrazone — Price alerts & deals from Amazon, AliExpress & El Corte Inglés",
      homeDescription:
        "Ahorrazone tracks prices across Amazon, AliExpress and El Corte Inglés and alerts you when they drop. Free alerts on Telegram.",
      ofertasTitle: "Amazon, AliExpress & El Corte Inglés deals — Ahorrazone",
      ofertasDescription:
        "The best deals spotted on Amazon, AliExpress and El Corte Inglés. Track the price for free on Telegram.",
      privacyTitle: "Privacy Policy — Ahorrazone",
    },
  },
};
