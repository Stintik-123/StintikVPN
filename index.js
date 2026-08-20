export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      try {
        const update = await request.json();
        await handleUpdate(update, env);
      } catch (e) {
        console.error(e);
      }
      return new Response("OK");
    }
    return new Response("StintikVPN Bot is running");
  }
};

async function handleUpdate(update, env) {
  const token = env.BOT_TOKEN;

  // === /start ===
  if (update.message) {
    const msg = update.message;
    if (msg.chat.type !== "private") return;

    if (msg.text === "/start") {
      await sendMessage(token, msg.chat.id, 
        "Привет! Я бот <b>StintikVPN</b>.\nВыбери, что тебе нужно:", 
        {
          inline_keyboard: [
            [{ text: "С чего начать?", callback_data: "start_guide" }],
            [{ text: "Чёрные списки", callback_data: "black" }],
            [{ text: "Белые списки", callback_data: "white" }],
            [{ text: "Протоколы", callback_data: "protocols" }],
            [{ text: "ТГ прокси", callback_data: "tg_proxy" }],
            [{ text: "Поддержать", callback_data: "donate" }],
            [{ text: "Поддержка", callback_data: "support" }]
          ]
        }
      );
    }
  }

  // === Нажатие на кнопки ===
  if (update.callback_query) {
    const cb = update.callback_query;
    if (cb.message.chat.type !== "private") return;

    const data = cb.data;

    const content = {
      start_guide: `🚀 <b>С чего начать</b>

1. Скачай клиент:
• Windows / Android — <b>Hiddify</b>
• iPhone — <b>Streisand</b>
• или v2rayN / v2rayNG

2. Скопируй ссылку из нужного раздела
3. В клиенте: «Добавить подписку» → вставь ссылку
4. Обнови список → Ping → выбери сервер → подключайся`,

      black: `🏴 <b>Чёрные списки</b>

Основной:
<code>https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt</code>

Для телефонов (Black Mobile):
<code>https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt</code>

Запасной:
<code>https://gitverse.ru/api/repos/Akres/VPN/raw/branch/master/all</code>`,

      white: `🏳️ <b>Белые списки</b>

Основные:
<code>https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt</code>

CIDR:
<code>https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt</code>

SNI:
<code>https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt</code>`,

      protocols: `🛠️ <b>Протоколы</b>

• <b>VLESS</b> — лучший на данный момент, но иногда блокируется
• <b>Trojan</b> — средний по всем параметрам
• <b>VMess</b> — самый надёжный
• <b>Shadowsocks</b> — самый быстрый (лучше для игр)`,

      tg_proxy: `🤖 <b>Telegram-прокси</b>

1. https://t.me/proxy?server=213.219.212.4&port=443&secret=dd9e1dde0de02a2e7c22d10e2fff841013

2. https://t.me/proxy?server=37.139.35.8&port=443&secret=ee2b36bf4b66aa5454903e1f63fdef88bc7777772e6d6963726f736f66742e636f6d

3. https://t.me/proxy?server=45.12.239.10&port=443&secret=ee67d0b62d9adedce86f500c8be9b2c3cd6d2e6265626f6f2e7275

4. https://t.me/proxy?server=proxy.vmelectronics.ru&port=443&secret=ee6164732e78352e72759c6509729477

5. https://t.me/proxy?server=146.185.242.186&port=443&secret=ee95aa916bd319beb312cc6ba9b2c5aef8766b2e7275

Просто нажми на ссылку в Telegram.`,

      donate: `💰 <b>Поддержать</b>

Пока пусто.
Можешь поставить ⭐ на репозиторий — это уже сильно помогает.`,

      support: `🆘 <b>Поддержка</b>

Пиши: @Keb04w`
    };

    const text = content[data];
    if (!text) return;

    await answerCallback(token, cb.id);
    await sendMessage(token, cb.message.chat.id, text);
  }
}

async function sendMessage(token, chatId, text, replyMarkup = null) {
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    disable_web_page_preview: true
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

async function answerCallback(token, callbackId) {
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackId })
  });
}
