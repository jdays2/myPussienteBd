export type Lang = 'en' | 'ru'

export const translations = {
  en: {
    hero: {
      for: '✦  made especially for you  ✦',
      titleLine1: 'Happy',
      titleLine2: 'Birthday,',
      name: 'Mariel',
      tagline: '— you make the world warmer —',
      scroll: 'scroll',
    },
    gallery: {
      label: 'moments',
      title: 'Our Memories',
      captions: ['our moment', 'my favourite', 'you laughing', 'that day', 'to remember', 'always'],
    },
    reasons: {
      label: 'why',
      title: 'I love you',
      hint: 'flip each card',
      icons: ['☀️', '😄', '🏠', '💪', '✨', '💕'],
      items: [
        'Your smile is the first thing I think about in the morning',
        'You laugh at my jokes, even the bad ones',
        'With you I feel at home, wherever we are',
        'You are stronger than you think — and that amazes me every day',
        'Your eyes are my favourite place in the world',
        'Simply because you are you. That is enough',
      ],
    },
    letter: {
      label: 'a letter for you',
      body: `You are one of those rare people\nwho make the world feel a little better.\nEvery day with you is a gift\nI never stop being grateful for.\n\nThank you for existing.\nThank you for being you.\n\nHappy Birthday, my dear Mariel. ✨`,
      closing: 'with love',
    },
    finale: {
      label: '✦  today is your day  ✦',
      titleLine1: 'I love you,',
      accent: 'endlessly',
      tagline: '— may this year be your best —',
      button: '🎉 More confetti',
    },
    breakup: {
      label: 'p.s.',
      title: 'okay but just in case...',
      sub: 'if you ever, hypothetically, wanted to break up with me —',
      hint: 'here\'s the button for that',
      btn: '💔 Break Up',
      spoiler: '(spoiler: it\'s not clickable)',
    },
  },
  ru: {
    hero: {
      for: '✦  специально для тебя  ✦',
      titleLine1: 'С Днём',
      titleLine2: 'Рождения,',
      name: 'Мариель',
      tagline: '— ты делаешь мир теплее —',
      scroll: 'scroll',
    },
    gallery: {
      label: 'моменты',
      title: 'Наши воспоминания',
      captions: ['наш момент', 'моя любимая', 'ты смеёшься', 'этот день', 'запомнить', 'всегда'],
    },
    reasons: {
      label: 'за что',
      title: 'Я люблю тебя',
      hint: 'переверни каждую карточку',
      icons: ['☀️', '😄', '🏠', '💪', '✨', '💕'],
      items: [
        'Твоя улыбка — первое, о чём я думаю утром',
        'Ты смеёшься над моими шутками, даже плохими',
        'Рядом с тобой я чувствую себя дома, где бы мы ни были',
        'Ты сильнее, чем думаешь — и это восхищает меня каждый день',
        'Твои глаза — моё любимое место в мире',
        'Просто потому что это ты. Этого достаточно',
      ],
    },
    letter: {
      label: 'письмо для тебя',
      body: `Ты — одна из тех редких людей,\nрядом с которыми мир кажется немного лучше.\nКаждый день с тобой — это подарок,\nкоторый я не устаю ценить.\n\nСпасибо, что ты есть.\nСпасибо, что ты такая.\n\nС днём рождения, моя дорогая Мариель. ✨`,
      closing: 'с любовью',
    },
    finale: {
      label: '✦  сегодня твой день  ✦',
      titleLine1: 'Люблю тебя,',
      accent: 'безмерно',
      tagline: '— пусть этот год будет лучшим —',
      button: '🎉 Ещё конфетти',
    },
    breakup: {
      label: 'p.s.',
      title: 'ладно но на всякий случай...',
      sub: 'если ты вдруг, гипотетически, захочешь со мной расстаться —',
      hint: 'вот специальная кнопка',
      btn: '💔 Расстаться',
      spoiler: '(спойлер: нажать невозможно)',
    },
  },
}

export type Translations = (typeof translations)['en']

// Append breakup section translations
declare module './i18n' {}

