import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "hi" | "gu" | "mr" | "ta" | "bn";

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
];

// Translation dictionary — chrome + key marketing strings. Product data stays English.
type Dict = Record<string, string>;
const T: Record<Lang, Dict> = {
  en: {
    "topbar.tagline": "Jai Shree Shyam · A mother's home for sarees",
    "topbar.dispatch": "Full color set dispatch · Pan-India",
    "nav.catalogue": "Catalogue",
    "nav.craft": "The Craft",
    "nav.wholesale": "Wholesale",
    "nav.contact": "Contact",
    "nav.whatsapp": "WhatsApp",

    "hero.tag": "Autumn Wholesale · Est. Boutique House",
    "hero.title1": "The loom",
    "hero.title2": "of heritage.",
    "hero.subtitle_pre": "A boutique B2B saree house from Surat — every design ships as a",
    "hero.subtitle_em": "complete color set",
    "hero.subtitle_post": ", packed and dispatched together.",
    "hero.cta_explore": "Explore {count} designs",
    "hero.cta_wa_price": "WhatsApp Price",
    "hero.stat_live": "Live designs",
    "hero.stat_sets": "Color sets",
    "hero.stat_dispatch": "Dispatch",

    "banner.please_note": "Please note —",
    "banner.body_pre": "Every design ships as a",
    "banner.body_em": "full color set.",
    "banner.body_post": "Single-piece orders are not accepted.",

    "story.tag": "Our House",
    "story.title_pre": "A daughter's home —",
    "story.title_em": "for every saree.",
    "story.body": "Devrani means the younger sister-in-law — a keeper of tradition and a bringer of warmth. Our tagline, साड़ियों का मायका — a mother's home for sarees — reflects the care with which every design is stitched, boxed and sent on its way to your store.",

    "featured.tag": "Featured",
    "featured.title": "A glimpse of the season's bestsellers.",
    "featured.body": "Tap any design for full details — fabric, color count, care & instant WhatsApp inquiry.",
    "featured.view_all": "View all {count} →",
    "featured.explore_full": "Explore the full catalogue",

    "craft.tag": "The Craft",
    "craft.title": "Slow-made weaves, retail-ready operations.",

    "wholesale.tag": "Partner with Devrani",
    "wholesale.title": "Priced by the color set.",
    "wholesale.body": "Apply for wholesale access — browse our masterweaver catalogues, unlock per-set pricing, and get direct WhatsApp support.",
    "wholesale.cta": "Register Retail Account",
    "wholesale.tier": "Tier",
    "wholesale.min": "Minimum order",

    "enquire.tag": "Get in Touch",
    "enquire.title": "One tap on WhatsApp.",
    "enquire.body": "Our trade desk replies in minutes with the latest lookbook, per-set price and dispatch timeline.",
    "enquire.wa": "WhatsApp",
    "enquire.showroom": "Showroom",
    "enquire.chat_title": "Chat with our trade desk",
    "enquire.chat_body": "Send a hi and we'll share the full catalogue, price list and color set details.",
    "enquire.open_wa": "Open WhatsApp",

    "footer.explore": "Explore",
    "footer.trade": "Trade",
    "footer.tagline": "Devrani Saree Pvt. Ltd. — साड़ियों का मायका. A boutique B2B saree house from Surat. Every design ships as a full color set.",
    "footer.rights": "All rights reserved.",

    "product.home": "Home",
    "product.catalogue": "Catalogue",
    "product.sku": "SKU",
    "product.b2b_badge": "B2B · Full Color Set",
    "product.shades": "{n} Shades",
    "product.price_on_wa": "Price on WhatsApp enquiry",
    "product.spec_fabric": "Fabric",
    "product.spec_weight": "Weight",
    "product.spec_colors": "Colors",
    "product.order_sets": "Order Sets",
    "product.each_set": "Each set = all {n} colors",
    "product.btn_catalogue": "Catalogue",
    "product.btn_enquire": "Enquire",
    "product.dispatch_note": "We dispatch as one carton · single-piece orders not accepted",
    "product.trust_verified": "Verified Weaver",
    "product.trust_verified_sub": "Sourced direct",
    "product.trust_dispatch": "48hr Dispatch",
    "product.trust_dispatch_sub": "Pan-India",
    "product.trust_qc": "QC Checked",
    "product.trust_qc_sub": "Two-stage",
    "product.trust_carton": "One Carton",
    "product.trust_carton_sub": "Full color set",
    "product.curated": "Curated for you",
    "product.suggested": "Suggested for your store",
    "product.see_all": "See all",
    "product.sticky_wa": "WhatsApp Enquire",

    "gallery.page_of": "Page {a} of {b} · Tap to zoom",
    "gallery.see_all": "See all {n} design pages",
    "gallery.verify_body": "Verify your WhatsApp number with a one-time code to unlock the full catalogue.",
    "gallery.see_more": "See More",
    "gallery.more": "+{n} more",

    "lang.switch_q": "See the site in {lang}?",
    "lang.yes": "Yes, switch",
    "lang.no": "No, thanks",
    "lang.switcher": "Language",
  },
  hi: {
    "topbar.tagline": "जय श्री श्याम · साड़ियों का मायका",
    "topbar.dispatch": "पूरा कलर सेट · पूरे भारत में डिलीवरी",
    "nav.catalogue": "कैटलॉग",
    "nav.craft": "कारीगरी",
    "nav.wholesale": "थोक",
    "nav.contact": "संपर्क",
    "nav.whatsapp": "व्हाट्सएप",

    "hero.tag": "शरद थोक · स्थापित बुटीक हाउस",
    "hero.title1": "विरासत का",
    "hero.title2": "ताना-बाना।",
    "hero.subtitle_pre": "सूरत का बुटीक B2B साड़ी हाउस — हर डिज़ाइन",
    "hero.subtitle_em": "पूरे कलर सेट",
    "hero.subtitle_post": "में एक साथ पैक और डिस्पैच होता है।",
    "hero.cta_explore": "सभी {count} डिज़ाइन देखें",
    "hero.cta_wa_price": "व्हाट्सएप पर मूल्य",
    "hero.stat_live": "लाइव डिज़ाइन",
    "hero.stat_sets": "कलर सेट",
    "hero.stat_dispatch": "डिस्पैच",

    "banner.please_note": "कृपया ध्यान दें —",
    "banner.body_pre": "हर डिज़ाइन",
    "banner.body_em": "पूरे कलर सेट में",
    "banner.body_post": "भेजा जाता है। एकल पीस के ऑर्डर स्वीकार नहीं हैं।",

    "story.tag": "हमारा घर",
    "story.title_pre": "बेटी का घर —",
    "story.title_em": "हर साड़ी के लिए।",
    "story.body": "देवरानी यानी छोटी भाभी — परंपरा की रक्षक और गर्मजोशी की वाहक। हमारा टैगलाइन साड़ियों का मायका उस देखभाल को दर्शाता है जिससे हर डिज़ाइन बुना, पैक और आपकी दुकान तक भेजा जाता है।",

    "featured.tag": "विशेष",
    "featured.title": "इस सीज़न के बेहतरीन डिज़ाइनों की एक झलक।",
    "featured.body": "किसी भी डिज़ाइन पर टैप करें — फैब्रिक, रंग संख्या, देखभाल और तुरंत व्हाट्सएप पूछताछ।",
    "featured.view_all": "सभी {count} देखें →",
    "featured.explore_full": "पूरा कैटलॉग देखें",

    "craft.tag": "कारीगरी",
    "craft.title": "धीमे बुने कपड़े, तेज़ रिटेल संचालन।",

    "wholesale.tag": "देवरानी के साथ जुड़ें",
    "wholesale.title": "कलर सेट के अनुसार मूल्य।",
    "wholesale.body": "थोक एक्सेस के लिए आवेदन करें — मास्टर बुनकर कैटलॉग देखें, प्रति सेट मूल्य पाएं और सीधे व्हाट्सएप सहायता।",
    "wholesale.cta": "रिटेल अकाउंट रजिस्टर करें",
    "wholesale.tier": "श्रेणी",
    "wholesale.min": "न्यूनतम ऑर्डर",

    "enquire.tag": "संपर्क करें",
    "enquire.title": "व्हाट्सएप पर एक टैप।",
    "enquire.body": "हमारा ट्रेड डेस्क मिनटों में नवीनतम लुकबुक, प्रति सेट मूल्य और डिस्पैच समय के साथ जवाब देता है।",
    "enquire.wa": "व्हाट्सएप",
    "enquire.showroom": "शोरूम",
    "enquire.chat_title": "हमारे ट्रेड डेस्क से बात करें",
    "enquire.chat_body": "हाय भेजें और हम पूरा कैटलॉग, मूल्य सूची और कलर सेट विवरण साझा करेंगे।",
    "enquire.open_wa": "व्हाट्सएप खोलें",

    "footer.explore": "एक्सप्लोर",
    "footer.trade": "ट्रेड",
    "footer.tagline": "देवरानी साड़ी प्रा. लि. — साड़ियों का मायका। सूरत का बुटीक B2B साड़ी हाउस। हर डिज़ाइन पूरे कलर सेट में भेजा जाता है।",
    "footer.rights": "सर्वाधिकार सुरक्षित।",

    "product.home": "होम",
    "product.catalogue": "कैटलॉग",
    "product.sku": "एसकेयू",
    "product.b2b_badge": "B2B · पूरा कलर सेट",
    "product.shades": "{n} रंग",
    "product.price_on_wa": "मूल्य व्हाट्सएप पर",
    "product.spec_fabric": "फैब्रिक",
    "product.spec_weight": "वज़न",
    "product.spec_colors": "रंग",
    "product.order_sets": "सेट ऑर्डर करें",
    "product.each_set": "प्रत्येक सेट = सभी {n} रंग",
    "product.btn_catalogue": "कैटलॉग",
    "product.btn_enquire": "पूछताछ",
    "product.dispatch_note": "एक कार्टन में भेजा जाता है · एकल पीस स्वीकार नहीं",
    "product.trust_verified": "सत्यापित बुनकर",
    "product.trust_verified_sub": "सीधे स्रोत से",
    "product.trust_dispatch": "48 घंटे डिस्पैच",
    "product.trust_dispatch_sub": "पूरे भारत में",
    "product.trust_qc": "QC जांचा",
    "product.trust_qc_sub": "दो-चरण",
    "product.trust_carton": "एक कार्टन",
    "product.trust_carton_sub": "पूरा कलर सेट",
    "product.curated": "आपके लिए चयनित",
    "product.suggested": "आपकी दुकान के लिए सुझाव",
    "product.see_all": "सभी देखें",
    "product.sticky_wa": "व्हाट्सएप पूछताछ",

    "gallery.page_of": "पेज {a} / {b} · ज़ूम के लिए टैप करें",
    "gallery.see_all": "सभी {n} डिज़ाइन पेज देखें",
    "gallery.verify_body": "पूरा कैटलॉग अनलॉक करने के लिए अपना व्हाट्सएप नंबर OTP से सत्यापित करें।",
    "gallery.see_more": "और देखें",
    "gallery.more": "+{n} और",

    "lang.switch_q": "साइट को {lang} में देखें?",
    "lang.yes": "हाँ, बदलें",
    "lang.no": "नहीं, धन्यवाद",
    "lang.switcher": "भाषा",
  },
  gu: {
    "topbar.tagline": "જય શ્રી શ્યામ · સાડીઓનું માયકું",
    "topbar.dispatch": "પૂરો કલર સેટ · સમગ્ર ભારતમાં",
    "nav.catalogue": "કૅટલૉગ",
    "nav.craft": "કારીગરી",
    "nav.wholesale": "જથ્થાબંધ",
    "nav.contact": "સંપર્ક",
    "nav.whatsapp": "વૉટ્સએપ",
    "hero.tag": "પાનખર જથ્થાબંધ · સ્થાપિત બુટીક હાઉસ",
    "hero.title1": "વારસાની",
    "hero.title2": "વણાટ.",
    "hero.subtitle_pre": "સુરતનું બુટીક B2B સાડી હાઉસ — દરેક ડિઝાઇન",
    "hero.subtitle_em": "પૂરા કલર સેટ",
    "hero.subtitle_post": "માં એકસાથે પેક અને ડિસ્પેચ થાય છે.",
    "hero.cta_explore": "બધી {count} ડિઝાઇન જુઓ",
    "hero.cta_wa_price": "વૉટ્સએપ પર ભાવ",
    "hero.stat_live": "લાઇવ ડિઝાઇન",
    "hero.stat_sets": "કલર સેટ",
    "hero.stat_dispatch": "ડિસ્પેચ",
    "banner.please_note": "કૃપા કરી નોંધો —",
    "banner.body_pre": "દરેક ડિઝાઇન",
    "banner.body_em": "પૂરા કલર સેટમાં",
    "banner.body_post": "મોકલવામાં આવે છે. એકલ પીસના ઓર્ડર સ્વીકારવામાં આવતા નથી.",
    "story.tag": "અમારું ઘર",
    "story.title_pre": "દીકરીનું ઘર —",
    "story.title_em": "દરેક સાડી માટે.",
    "story.body": "દેવરાણી એટલે નાની ભાભી — પરંપરાની રખેવાળ અને હૂંફની વાહક. અમારું ટૅગલાઇન સાડીઓનું માયકું એ કાળજી દર્શાવે છે જેનાથી દરેક ડિઝાઇન વણાય છે, પેક થાય છે અને તમારી દુકાન સુધી પહોંચે છે.",
    "featured.tag": "વિશેષ",
    "featured.title": "આ સીઝનની બેસ્ટસેલર ડિઝાઇનની ઝલક.",
    "featured.body": "કોઈપણ ડિઝાઇન પર ટૅપ કરો — ફૅબ્રિક, રંગ સંખ્યા, કાળજી અને તાત્કાલિક વૉટ્સએપ પૂછપરછ.",
    "featured.view_all": "બધા {count} જુઓ →",
    "featured.explore_full": "પૂરો કૅટલૉગ જુઓ",
    "craft.tag": "કારીગરી",
    "craft.title": "ધીમે વણાયેલા કપડાં, ઝડપી રિટેલ કામગીરી.",
    "wholesale.tag": "દેવરાણી સાથે જોડાઓ",
    "wholesale.title": "કલર સેટ પ્રમાણે ભાવ.",
    "wholesale.body": "જથ્થાબંધ ઍક્સેસ માટે અરજી કરો — માસ્ટર વણકર કૅટલૉગ, પ્રતિ સેટ ભાવ અને સીધો વૉટ્સએપ સપોર્ટ.",
    "wholesale.cta": "રિટેલ ખાતું નોંધો",
    "wholesale.tier": "શ્રેણી",
    "wholesale.min": "લઘુત્તમ ઓર્ડર",
    "enquire.tag": "સંપર્ક કરો",
    "enquire.title": "વૉટ્સએપ પર એક ટૅપ.",
    "enquire.body": "અમારો ટ્રેડ ડેસ્ક મિનિટોમાં નવીનતમ લુકબુક, પ્રતિ સેટ ભાવ અને ડિસ્પેચ સમય સાથે જવાબ આપે છે.",
    "enquire.wa": "વૉટ્સએપ",
    "enquire.showroom": "શોરૂમ",
    "enquire.chat_title": "અમારા ટ્રેડ ડેસ્ક સાથે વાત કરો",
    "enquire.chat_body": "હાય મોકલો અને અમે પૂરો કૅટલૉગ, ભાવ યાદી અને કલર સેટ વિગતો શેર કરીશું.",
    "enquire.open_wa": "વૉટ્સએપ ખોલો",
    "footer.explore": "એક્સપ્લોર",
    "footer.trade": "ટ્રેડ",
    "footer.tagline": "દેવરાણી સાડી પ્રા. લિ. — સાડીઓનું માયકું. સુરતનું બુટીક B2B સાડી હાઉસ.",
    "footer.rights": "સર્વ હક અનામત.",
    "product.home": "હોમ",
    "product.catalogue": "કૅટલૉગ",
    "product.sku": "SKU",
    "product.b2b_badge": "B2B · પૂરો કલર સેટ",
    "product.shades": "{n} રંગ",
    "product.price_on_wa": "ભાવ વૉટ્સએપ પર",
    "product.spec_fabric": "ફૅબ્રિક",
    "product.spec_weight": "વજન",
    "product.spec_colors": "રંગ",
    "product.order_sets": "સેટ ઓર્ડર કરો",
    "product.each_set": "દરેક સેટ = બધા {n} રંગ",
    "product.btn_catalogue": "કૅટલૉગ",
    "product.btn_enquire": "પૂછપરછ",
    "product.dispatch_note": "એક કાર્ટનમાં મોકલાય છે · એકલ પીસ સ્વીકૃત નથી",
    "product.trust_verified": "ચકાસાયેલ વણકર",
    "product.trust_verified_sub": "સીધા સ્રોતથી",
    "product.trust_dispatch": "48 કલાક ડિસ્પેચ",
    "product.trust_dispatch_sub": "સમગ્ર ભારત",
    "product.trust_qc": "QC તપાસાયેલ",
    "product.trust_qc_sub": "બે-તબક્કા",
    "product.trust_carton": "એક કાર્ટન",
    "product.trust_carton_sub": "પૂરો કલર સેટ",
    "product.curated": "તમારા માટે પસંદ",
    "product.suggested": "તમારી દુકાન માટે સૂચનો",
    "product.see_all": "બધા જુઓ",
    "product.sticky_wa": "વૉટ્સએપ પૂછપરછ",
    "gallery.page_of": "પેજ {a} / {b} · ઝૂમ કરવા ટૅપ કરો",
    "gallery.see_all": "બધા {n} ડિઝાઇન પેજ જુઓ",
    "gallery.verify_body": "પૂરો કૅટલૉગ અનલૉક કરવા વૉટ્સએપ નંબર OTP થી ચકાસો.",
    "gallery.see_more": "વધુ જુઓ",
    "gallery.more": "+{n} વધુ",
    "lang.switch_q": "સાઇટ {lang} માં જુઓ?",
    "lang.yes": "હા, બદલો",
    "lang.no": "ના, આભાર",
    "lang.switcher": "ભાષા",
  },
  mr: {
    "topbar.tagline": "जय श्री श्याम · साड्यांचे माहेर",
    "topbar.dispatch": "पूर्ण कलर सेट · संपूर्ण भारत",
    "nav.catalogue": "कॅटलॉग",
    "nav.craft": "कारागिरी",
    "nav.wholesale": "घाऊक",
    "nav.contact": "संपर्क",
    "nav.whatsapp": "व्हॉट्सअॅप",
    "hero.tag": "शरद घाऊक · स्थापित बुटीक हाऊस",
    "hero.title1": "वारशाची",
    "hero.title2": "वीण.",
    "hero.subtitle_pre": "सुरतमधील बुटीक B2B साडी हाऊस — प्रत्येक डिझाइन",
    "hero.subtitle_em": "पूर्ण कलर सेट",
    "hero.subtitle_post": "मध्ये एकत्र पॅक आणि पाठवली जाते.",
    "hero.cta_explore": "सर्व {count} डिझाइन पहा",
    "hero.cta_wa_price": "व्हॉट्सअॅपवर किंमत",
    "hero.stat_live": "लाइव्ह डिझाइन",
    "hero.stat_sets": "कलर सेट",
    "hero.stat_dispatch": "डिस्पॅच",
    "banner.please_note": "कृपया लक्षात घ्या —",
    "banner.body_pre": "प्रत्येक डिझाइन",
    "banner.body_em": "पूर्ण कलर सेटमध्ये",
    "banner.body_post": "पाठवली जाते. एकल तुकड्याचे ऑर्डर स्वीकारले जात नाहीत.",
    "story.tag": "आमचे घर",
    "story.title_pre": "मुलीचे घर —",
    "story.title_em": "प्रत्येक साडीसाठी.",
    "story.body": "देवरानी म्हणजे धाकटी जाऊ — परंपरेची रक्षक आणि उबदारपणाची वाहक. आमचे टॅगलाइन साड्यांचे माहेर त्या काळजीचे प्रतीक आहे ज्याने प्रत्येक डिझाइन विणली, पॅक केली आणि तुमच्या दुकानापर्यंत पोहोचवली जाते.",
    "featured.tag": "विशेष",
    "featured.title": "या हंगामातील सर्वोत्तम डिझाइनची झलक.",
    "featured.body": "कोणत्याही डिझाइनवर टॅप करा — फॅब्रिक, रंग संख्या, काळजी आणि तात्काळ व्हॉट्सअॅप चौकशी.",
    "featured.view_all": "सर्व {count} पहा →",
    "featured.explore_full": "पूर्ण कॅटलॉग पहा",
    "craft.tag": "कारागिरी",
    "craft.title": "हळू विणलेले कापड, वेगवान किरकोळ ऑपरेशन.",
    "wholesale.tag": "देवरानीशी भागीदारी",
    "wholesale.title": "कलर सेटनुसार किंमत.",
    "wholesale.body": "घाऊक ऍक्सेससाठी अर्ज करा — मास्टर विणकर कॅटलॉग, प्रति सेट किंमत आणि थेट व्हॉट्सअॅप सपोर्ट.",
    "wholesale.cta": "रिटेल खाते नोंदवा",
    "wholesale.tier": "श्रेणी",
    "wholesale.min": "किमान ऑर्डर",
    "enquire.tag": "संपर्क करा",
    "enquire.title": "व्हॉट्सअॅपवर एक टॅप.",
    "enquire.body": "आमचा ट्रेड डेस्क मिनिटांत नवीनतम लुकबुक, प्रति सेट किंमत आणि डिस्पॅच वेळेसह उत्तर देतो.",
    "enquire.wa": "व्हॉट्सअॅप",
    "enquire.showroom": "शोरूम",
    "enquire.chat_title": "आमच्या ट्रेड डेस्कशी बोला",
    "enquire.chat_body": "हाय पाठवा आणि आम्ही पूर्ण कॅटलॉग, किंमत यादी आणि कलर सेट तपशील शेअर करू.",
    "enquire.open_wa": "व्हॉट्सअॅप उघडा",
    "footer.explore": "एक्सप्लोर",
    "footer.trade": "ट्रेड",
    "footer.tagline": "देवरानी साडी प्रा. लि. — साड्यांचे माहेर. सुरतमधील बुटीक B2B साडी हाऊस.",
    "footer.rights": "सर्व हक्क राखीव.",
    "product.home": "मुख्यपृष्ठ",
    "product.catalogue": "कॅटलॉग",
    "product.sku": "SKU",
    "product.b2b_badge": "B2B · पूर्ण कलर सेट",
    "product.shades": "{n} रंग",
    "product.price_on_wa": "किंमत व्हॉट्सअॅपवर",
    "product.spec_fabric": "फॅब्रिक",
    "product.spec_weight": "वजन",
    "product.spec_colors": "रंग",
    "product.order_sets": "सेट ऑर्डर करा",
    "product.each_set": "प्रत्येक सेट = सर्व {n} रंग",
    "product.btn_catalogue": "कॅटलॉग",
    "product.btn_enquire": "चौकशी",
    "product.dispatch_note": "एका कार्टनमध्ये पाठवले · एकल तुकडा स्वीकृत नाही",
    "product.trust_verified": "पडताळलेले विणकर",
    "product.trust_verified_sub": "थेट स्रोतातून",
    "product.trust_dispatch": "48 तास डिस्पॅच",
    "product.trust_dispatch_sub": "संपूर्ण भारत",
    "product.trust_qc": "QC तपासले",
    "product.trust_qc_sub": "दोन-टप्पा",
    "product.trust_carton": "एक कार्टन",
    "product.trust_carton_sub": "पूर्ण कलर सेट",
    "product.curated": "तुमच्यासाठी निवडलेले",
    "product.suggested": "तुमच्या दुकानासाठी सूचना",
    "product.see_all": "सर्व पहा",
    "product.sticky_wa": "व्हॉट्सअॅप चौकशी",
    "gallery.page_of": "पान {a} / {b} · झूमसाठी टॅप करा",
    "gallery.see_all": "सर्व {n} डिझाइन पाने पहा",
    "gallery.verify_body": "पूर्ण कॅटलॉग अनलॉक करण्यासाठी OTP ने व्हॉट्सअॅप नंबर पडताळा.",
    "gallery.see_more": "आणखी पहा",
    "gallery.more": "+{n} आणखी",
    "lang.switch_q": "साइट {lang} मध्ये पाहा?",
    "lang.yes": "होय, बदला",
    "lang.no": "नाही, धन्यवाद",
    "lang.switcher": "भाषा",
  },
  ta: {
    "topbar.tagline": "ஜெய் ஸ்ரீ ஷ்யாம் · புடவைகளின் தாய்வீடு",
    "topbar.dispatch": "முழு கலர் செட் · இந்தியா முழுவதும்",
    "nav.catalogue": "பட்டியல்",
    "nav.craft": "கைவினை",
    "nav.wholesale": "மொத்த",
    "nav.contact": "தொடர்பு",
    "nav.whatsapp": "வாட்ஸ்அப்",
    "hero.tag": "இலையுதிர் மொத்த · நிறுவப்பட்ட பூட்டீக்",
    "hero.title1": "பாரம்பரிய",
    "hero.title2": "நெசவு.",
    "hero.subtitle_pre": "சூரத்தின் பூட்டீக் B2B புடவை நிறுவனம் — ஒவ்வொரு வடிவமும்",
    "hero.subtitle_em": "முழு கலர் செட்டாக",
    "hero.subtitle_post": "ஒன்றாக அனுப்பப்படுகிறது.",
    "hero.cta_explore": "அனைத்து {count} வடிவங்களையும் பார்",
    "hero.cta_wa_price": "வாட்ஸ்அப் விலை",
    "hero.stat_live": "நேரடி வடிவங்கள்",
    "hero.stat_sets": "கலர் செட்",
    "hero.stat_dispatch": "அனுப்புகை",
    "banner.please_note": "தயவுசெய்து கவனிக்கவும் —",
    "banner.body_pre": "ஒவ்வொரு வடிவமும்",
    "banner.body_em": "முழு கலர் செட்டாக",
    "banner.body_post": "அனுப்பப்படுகிறது. தனித்துண்டு ஆர்டர் ஏற்கப்படாது.",
    "story.tag": "எங்கள் இல்லம்",
    "story.title_pre": "மகளின் வீடு —",
    "story.title_em": "ஒவ்வொரு புடவைக்கும்.",
    "story.body": "தேவராணி என்றால் இளைய நாத்தனார் — பாரம்பரியத்தின் காவலர். எங்கள் டேக்லைன் புடவைகளின் தாய்வீடு ஒவ்வொரு வடிவமும் நெசவு செய்யப்பட்டு உங்கள் கடைக்கு அனுப்பப்படும் அக்கறையை பிரதிபலிக்கிறது.",
    "featured.tag": "சிறப்பு",
    "featured.title": "இந்த பருவத்தின் சிறந்த வடிவங்களின் காட்சி.",
    "featured.body": "எந்த வடிவத்தையும் தட்டவும் — துணி, நிற எண்ணிக்கை, பராமரிப்பு மற்றும் உடனடி வாட்ஸ்அப்.",
    "featured.view_all": "அனைத்து {count} பார் →",
    "featured.explore_full": "முழு பட்டியலைப் பார்",
    "craft.tag": "கைவினை",
    "craft.title": "மெதுவாக நெய்யப்பட்ட துணி, விரைவான சில்லறை செயல்பாடுகள்.",
    "wholesale.tag": "தேவராணியுடன் பங்குதாரர்",
    "wholesale.title": "கலர் செட்டின் விலை.",
    "wholesale.body": "மொத்த அணுகலுக்கு விண்ணப்பிக்கவும் — முதன்மை நெசவாளர் பட்டியல்கள், ஒரு செட் விலை மற்றும் நேரடி வாட்ஸ்அப் ஆதரவு.",
    "wholesale.cta": "சில்லறை கணக்கு பதிவு",
    "wholesale.tier": "நிலை",
    "wholesale.min": "குறைந்தபட்ச ஆர்டர்",
    "enquire.tag": "தொடர்பில் இருங்கள்",
    "enquire.title": "வாட்ஸ்அப்பில் ஒரு தட்டல்.",
    "enquire.body": "எங்கள் வர்த்தக மேசை நிமிடங்களில் லுக்புக், விலை மற்றும் அனுப்புகை நேரத்துடன் பதிலளிக்கிறது.",
    "enquire.wa": "வாட்ஸ்அப்",
    "enquire.showroom": "காட்சியகம்",
    "enquire.chat_title": "எங்கள் வர்த்தக மேசையுடன் அரட்டை",
    "enquire.chat_body": "ஹாய் அனுப்புங்கள், முழு பட்டியல், விலை மற்றும் விவரங்களை பகிர்வோம்.",
    "enquire.open_wa": "வாட்ஸ்அப் திற",
    "footer.explore": "ஆராய",
    "footer.trade": "வர்த்தகம்",
    "footer.tagline": "தேவராணி புடவை பிரை. லிட். — புடவைகளின் தாய்வீடு. சூரத் பூட்டீக் B2B நிறுவனம்.",
    "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "product.home": "முகப்பு",
    "product.catalogue": "பட்டியல்",
    "product.sku": "SKU",
    "product.b2b_badge": "B2B · முழு கலர் செட்",
    "product.shades": "{n} நிறங்கள்",
    "product.price_on_wa": "விலை வாட்ஸ்அப்பில்",
    "product.spec_fabric": "துணி",
    "product.spec_weight": "எடை",
    "product.spec_colors": "நிறங்கள்",
    "product.order_sets": "செட் ஆர்டர்",
    "product.each_set": "ஒவ்வொரு செட் = அனைத்து {n} நிறங்கள்",
    "product.btn_catalogue": "பட்டியல்",
    "product.btn_enquire": "விசாரி",
    "product.dispatch_note": "ஒரே கார்ட்டனில் அனுப்பப்படும் · தனித்துண்டு இல்லை",
    "product.trust_verified": "சரிபார்க்கப்பட்ட நெசவாளர்",
    "product.trust_verified_sub": "நேரடி மூலம்",
    "product.trust_dispatch": "48 மணி அனுப்புகை",
    "product.trust_dispatch_sub": "இந்தியா முழுவதும்",
    "product.trust_qc": "QC சரிபார்ப்பு",
    "product.trust_qc_sub": "இரு-நிலை",
    "product.trust_carton": "ஒரு கார்ட்டன்",
    "product.trust_carton_sub": "முழு கலர் செட்",
    "product.curated": "உங்களுக்காக தேர்ந்தெடுத்தவை",
    "product.suggested": "உங்கள் கடைக்கான பரிந்துரைகள்",
    "product.see_all": "அனைத்தையும் பார்",
    "product.sticky_wa": "வாட்ஸ்அப் விசாரணை",
    "gallery.page_of": "பக்கம் {a} / {b} · பெரிதாக்க தட்டு",
    "gallery.see_all": "அனைத்து {n} வடிவப் பக்கங்களைப் பார்",
    "gallery.verify_body": "முழு பட்டியலை திறக்க OTP மூலம் வாட்ஸ்அப் எண்ணைச் சரிபார்க்கவும்.",
    "gallery.see_more": "மேலும் பார்",
    "gallery.more": "+{n} மேலும்",
    "lang.switch_q": "தளத்தை {lang} இல் காண்க?",
    "lang.yes": "ஆம், மாற்று",
    "lang.no": "வேண்டாம், நன்றி",
    "lang.switcher": "மொழி",
  },
  bn: {
    "topbar.tagline": "জয় শ্রী শ্যাম · শাড়ির মায়ের বাড়ি",
    "topbar.dispatch": "সম্পূর্ণ কালার সেট · সারা ভারত",
    "nav.catalogue": "ক্যাটালগ",
    "nav.craft": "কারুকাজ",
    "nav.wholesale": "পাইকারি",
    "nav.contact": "যোগাযোগ",
    "nav.whatsapp": "হোয়াটসঅ্যাপ",
    "hero.tag": "শরৎ পাইকারি · প্রতিষ্ঠিত বুটিক হাউস",
    "hero.title1": "ঐতিহ্যের",
    "hero.title2": "বুনন.",
    "hero.subtitle_pre": "সুরাটের বুটিক B2B শাড়ি হাউস — প্রতিটি ডিজাইন",
    "hero.subtitle_em": "সম্পূর্ণ কালার সেট",
    "hero.subtitle_post": "হিসাবে একসাথে পাঠানো হয়।",
    "hero.cta_explore": "সমস্ত {count} ডিজাইন দেখুন",
    "hero.cta_wa_price": "হোয়াটসঅ্যাপে মূল্য",
    "hero.stat_live": "লাইভ ডিজাইন",
    "hero.stat_sets": "কালার সেট",
    "hero.stat_dispatch": "প্রেরণ",
    "banner.please_note": "অনুগ্রহ করে লক্ষ্য করুন —",
    "banner.body_pre": "প্রতিটি ডিজাইন",
    "banner.body_em": "সম্পূর্ণ কালার সেটে",
    "banner.body_post": "পাঠানো হয়। একক টুকরার অর্ডার গৃহীত হয় না।",
    "story.tag": "আমাদের বাড়ি",
    "story.title_pre": "কন্যার বাড়ি —",
    "story.title_em": "প্রতিটি শাড়ির জন্য।",
    "story.body": "দেবরানী মানে ছোট জা — ঐতিহ্যের রক্ষক ও উষ্ণতার বাহক। আমাদের ট্যাগলাইন শাড়ির মায়ের বাড়ি সেই যত্নের প্রতিফলন যা দিয়ে প্রতিটি ডিজাইন বোনা হয় ও আপনার দোকানে পৌঁছে।",
    "featured.tag": "বিশেষ",
    "featured.title": "এই মরসুমের বেস্টসেলার ডিজাইনের এক ঝলক।",
    "featured.body": "যেকোনো ডিজাইনে ট্যাপ করুন — কাপড়, রঙের সংখ্যা, যত্ন ও তাৎক্ষণিক হোয়াটসঅ্যাপ অনুসন্ধান।",
    "featured.view_all": "সমস্ত {count} দেখুন →",
    "featured.explore_full": "সম্পূর্ণ ক্যাটালগ দেখুন",
    "craft.tag": "কারুকাজ",
    "craft.title": "ধীরে বোনা কাপড়, দ্রুত খুচরা কার্যক্রম।",
    "wholesale.tag": "দেবরানীর সাথে অংশীদার",
    "wholesale.title": "কালার সেট অনুযায়ী মূল্য।",
    "wholesale.body": "পাইকারি অ্যাক্সেসের জন্য আবেদন করুন — মাস্টার তাঁতির ক্যাটালগ, প্রতি সেট মূল্য ও সরাসরি হোয়াটসঅ্যাপ সহায়তা।",
    "wholesale.cta": "খুচরা অ্যাকাউন্ট নিবন্ধন",
    "wholesale.tier": "স্তর",
    "wholesale.min": "ন্যূনতম অর্ডার",
    "enquire.tag": "যোগাযোগ",
    "enquire.title": "হোয়াটসঅ্যাপে এক ট্যাপ।",
    "enquire.body": "আমাদের ট্রেড ডেস্ক মিনিটের মধ্যে লুকবুক, প্রতি সেট মূল্য ও প্রেরণের সময় সহ উত্তর দেয়।",
    "enquire.wa": "হোয়াটসঅ্যাপ",
    "enquire.showroom": "শোরুম",
    "enquire.chat_title": "আমাদের ট্রেড ডেস্কের সাথে চ্যাট করুন",
    "enquire.chat_body": "হাই পাঠান, আমরা সম্পূর্ণ ক্যাটালগ, মূল্য তালিকা ও কালার সেট বিবরণ শেয়ার করব।",
    "enquire.open_wa": "হোয়াটসঅ্যাপ খুলুন",
    "footer.explore": "এক্সপ্লোর",
    "footer.trade": "ট্রেড",
    "footer.tagline": "দেবরানী শাড়ি প্রা. লি. — শাড়ির মায়ের বাড়ি। সুরাটের বুটিক B2B শাড়ি হাউস।",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
    "product.home": "হোম",
    "product.catalogue": "ক্যাটালগ",
    "product.sku": "SKU",
    "product.b2b_badge": "B2B · সম্পূর্ণ কালার সেট",
    "product.shades": "{n} রঙ",
    "product.price_on_wa": "মূল্য হোয়াটসঅ্যাপে",
    "product.spec_fabric": "কাপড়",
    "product.spec_weight": "ওজন",
    "product.spec_colors": "রঙ",
    "product.order_sets": "সেট অর্ডার",
    "product.each_set": "প্রতিটি সেট = সমস্ত {n} রঙ",
    "product.btn_catalogue": "ক্যাটালগ",
    "product.btn_enquire": "অনুসন্ধান",
    "product.dispatch_note": "এক কার্টনে পাঠানো হয় · একক টুকরা গৃহীত নয়",
    "product.trust_verified": "যাচাইকৃত তাঁতি",
    "product.trust_verified_sub": "সরাসরি উৎস",
    "product.trust_dispatch": "৪৮ ঘণ্টা প্রেরণ",
    "product.trust_dispatch_sub": "সারা ভারত",
    "product.trust_qc": "QC পরীক্ষিত",
    "product.trust_qc_sub": "দুই-ধাপ",
    "product.trust_carton": "এক কার্টন",
    "product.trust_carton_sub": "সম্পূর্ণ কালার সেট",
    "product.curated": "আপনার জন্য নির্বাচিত",
    "product.suggested": "আপনার দোকানের জন্য সুপারিশ",
    "product.see_all": "সব দেখুন",
    "product.sticky_wa": "হোয়াটসঅ্যাপ অনুসন্ধান",
    "gallery.page_of": "পৃষ্ঠা {a} / {b} · জুম করতে ট্যাপ",
    "gallery.see_all": "সমস্ত {n} ডিজাইন পৃষ্ঠা দেখুন",
    "gallery.verify_body": "সম্পূর্ণ ক্যাটালগ আনলক করতে OTP দিয়ে হোয়াটসঅ্যাপ নম্বর যাচাই করুন।",
    "gallery.see_more": "আরও দেখুন",
    "gallery.more": "+{n} আরও",
    "lang.switch_q": "সাইট {lang} এ দেখুন?",
    "lang.yes": "হ্যাঁ, পরিবর্তন",
    "lang.no": "না, ধন্যবাদ",
    "lang.switcher": "ভাষা",
  },
};

const STORAGE_KEY = "devrani:lang";
const PROMPTED_KEY = "devrani:lang-prompted";

function detectLang(): Lang | null {
  if (typeof navigator === "undefined") return null;
  const list = [navigator.language, ...(navigator.languages ?? [])].filter(Boolean);
  for (const raw of list) {
    const code = raw.toLowerCase().split("-")[0] as Lang;
    if (LANGS.some((l) => l.code === code)) return code;
  }
  return null;
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      localStorage.setItem(PROMPTED_KEY, "1");
      document.documentElement.lang = l;
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = T[lang] ?? T.en;
      let s = dict[key] ?? T.en[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      return s;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

/** Language switcher — compact globe + native name dropdown. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  return (
    <label className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/50 pl-3 pr-1 py-1 text-xs hover:bg-[var(--sage)]/15 transition-colors cursor-pointer ${className}`}>
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-muted-foreground">{t("lang.switcher")}</span>
      <select
        aria-label={t("lang.switcher")}
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="appearance-none bg-transparent pr-6 pl-1 py-0.5 text-xs font-medium text-[var(--ink)] outline-none cursor-pointer"
        style={{ backgroundImage: "none" }}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native}
          </option>
        ))}
      </select>
      <span className="sr-only">{current.native}</span>
    </label>
  );
}

/** Auto-detect prompt — appears once if browser language differs from active. */
export function LanguagePrompt() {
  const { lang, setLang, t } = useI18n();
  const [detected, setDetected] = useState<Lang | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      if (localStorage.getItem(PROMPTED_KEY)) return;
      const d = detectLang();
      if (d && d !== lang) setDetected(d);
    } catch {}
  }, [lang]);

  if (!detected) return null;
  const meta = LANGS.find((l) => l.code === detected)!;

  const dismiss = () => {
    try {
      localStorage.setItem(PROMPTED_KEY, "1");
    } catch {}
    setDetected(null);
  };

  // Ask in detected language for maximum recognition.
  const question = (T[detected]["lang.switch_q"] ?? T.en["lang.switch_q"]).replaceAll("{lang}", meta.native);
  const yes = T[detected]["lang.yes"] ?? T.en["lang.yes"];
  const no = T[detected]["lang.no"] ?? T.en["lang.no"];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(92%,380px)] rounded-2xl bg-[var(--ink)] text-[var(--ivory)] border border-[var(--gold)]/40 shadow-2xl px-4 py-3 flex items-center gap-3 animate-fade-in">
      <div className="h-9 w-9 rounded-full bg-[var(--gold)]/20 grid place-items-center text-[var(--gold)] shrink-0">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      </div>
      <p className="flex-1 text-sm leading-tight">{question}</p>
      <div className="flex flex-col gap-1.5 shrink-0">
        <button
          onClick={() => {
            setLang(detected);
            dismiss();
          }}
          className="rounded-full bg-[var(--gold)] text-[var(--ink)] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 hover:bg-[var(--rose)] transition-colors"
        >
          {yes}
        </button>
        <button
          onClick={dismiss}
          className="text-[10px] uppercase tracking-widest text-[var(--ivory)]/60 hover:text-[var(--ivory)] transition-colors"
        >
          {no}
        </button>
      </div>
    </div>
  );
}
