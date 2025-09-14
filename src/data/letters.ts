export interface Letter {
  title: string;
  content: string;
  date?: string;
  preview: string;
}

export interface LetterCategory {
  title: string;
  tag: string;
  letters: Letter[];
  emoji: string;
  description: string;
  mood: 'uplifting' | 'comforting' | 'celebratory' | 'supportive' | 'romantic';
}

// Enhanced categories with better organization and more detailed metadata
export const letterCategories: Record<string, LetterCategory> = {
  // 🌟 All Moods - Popular/All letters
  daily: {
    title: "Just Because",
    tag: "deserve love always 💭",
    emoji: "🌟",
    description: "Sweet letters for everyday moments",
    mood: "romantic",
    letters: [
      {
        title: "Thinking of You",
        preview: "Just because I love you...",
        content: `My dearest love,

No special reason for this letter except that you crossed my mind (which happens about every 5 minutes, to be honest), and I wanted you to know.

I love how you exist in this world. I love your laugh, your thoughts, your dreams, your quirky habits, the way you see beauty in small things. I love how you care so deeply about everything and everyone.

I hope you're having a wonderful day. I hope you're being kind to yourself. I hope you know how incredibly special you are to me and to everyone whose life you touch.

If today has been challenging, remember that tomorrow brings fresh possibilities. If today has been beautiful, I'm so grateful your heart is light and joyful.

Either way, please know that I love you deeply, completely, and unconditionally.

Just because you're you,
Your person who thinks about you constantly 💭❤️`
      }
    ]
  },

  // 💝 Emotional Support - Happy, celebration
  happy: {
    title: "Celebrate Your Joy",
    tag: "shine brighter ✨",
    emoji: "💝",
    description: "Letters to amplify your happiness",
    mood: "celebratory",
    letters: [
      {
        title: "Your Beautiful Light",
        preview: "The way your eyes sparkle when you're happy...",
        content: `My radiant sunshine,

I wish you could see yourself the way I see you when you're happy. Your smile doesn't just light up the room - it illuminates my entire universe.

When you laugh, it's like the most beautiful music that I never want to stop hearing. When your eyes sparkle with pure joy, I fall in love with you all over again. Your happiness is contagious in the most wonderful way possible.

I absolutely adore how you get excited about little things - the way you dance when your favorite song comes on, how you light up talking about your passions, the way you celebrate small victories with such genuine enthusiasm.

Never apologize for your joy. Never dim your brilliant light for anyone. Your happiness is a precious gift to this world, and witnessing you embrace it fully is one of my greatest privileges.

Keep shining, my beautiful love. The world desperately needs your light.

Celebrating every moment of your joy,
Your biggest fan and cheerleader ✨💖`
      }
    ]
  },

  // 💪 Lift Spirit - For tough emotional moments
  low: {
    title: "You Are Enough",
    tag: "need gentle reminders 💪",
    emoji: "💪",
    description: "Encouragement for difficult days",
    mood: "supportive",
    letters: [
      {
        title: "Perfect As You Are",
        preview: "Exactly as you are, right now...",
        content: `My perfectly imperfect love,

I need you to truly hear this today: YOU ARE ENOUGH.

Not when you lose weight or gain confidence. Not when you achieve that goal or get that promotion. Not when you fix the things you think are broken about yourself.

Right now. Today. In this very moment. Exactly as you are.

You are enough love to give and receive abundantly. You are enough intelligence to figure out whatever comes your way. You are enough strength to handle life's challenges. You are enough beauty to light up any space you enter. You are enough kindness to change someone's entire day.

Stop waiting to feel worthy of love - you already are worthy. Stop trying to earn your place in this world - you already belong here. Stop believing you need to be different - you are already perfect in your beautiful imperfection.

I fell in love with you exactly as you are. Your flaws aren't bugs that need fixing - they're features that make you uniquely, wonderfully you.

You. Are. More. Than. Enough.

Loving every single part of you,
Your reminder that you're already complete ❤️💪`
      }
    ]
  },

  // 💕 Missing You - Connection across distance
  missme: {
    title: "Always With You",
    tag: "feel our connection 💕",
    emoji: "💕",
    description: "Bridging the distance between us",
    mood: "romantic",
    letters: [
      {
        title: "Never Really Apart",
        preview: "Distance means nothing when you mean everything...",
        content: `My precious heart,

I know you miss me, and I miss you too - more than words could ever express. But I want you to know something important - even when we're physically apart, I'm never truly gone from your side.

I'm in the morning coffee that reminds you of our lazy Sunday conversations. I'm in your favorite song that makes you smile and think of me. I'm in the breathtaking sunset that takes your breath away. I'm in every little moment that makes your heart flutter with love.

Close your eyes right now and feel my arms wrapped around you protectively. Remember the sound of my voice telling you how deeply I love you. Remember my laughter when you tell me your wonderfully silly jokes. Remember exactly how it feels when I hold your hand in mine.

The physical distance between us is temporary, but my love for you is infinite and eternal. Every second we're apart only makes me appreciate and cherish you more. Every day brings us one step closer to being together again.

Until that beautiful moment, carry my love with you everywhere you go. You are never, ever alone.

Missing you with every heartbeat,
Your heart that beats only for you 💕✨`
      }
    ]
  },

  // ☀️ Morning - Wake up letters
  wakeup: {
    title: "Good Morning Light",
    tag: "start your day ☀️",
    emoji: "☀️",
    description: "Beautiful beginnings to your day",
    mood: "uplifting",
    letters: [
      {
        title: "Rise and Shine, Beautiful",
        preview: "Another day to love you begins now...",
        content: `Good morning, my beautiful love,

As you open your eyes to greet this brand new day, I want you to know that somewhere in this world, someone is thinking about you with the biggest, most genuine smile on their face. That someone is me, and I couldn't be happier to start another day loving you.

Today is like a blank canvas waiting for you to paint it with your unique colors. Whether today brings exciting challenges or peaceful moments, remember that you have everything within you to handle whatever comes your way with grace and strength.

Here's your daily dose of love and encouragement:
- You are loved beyond measure and description
- You are capable of absolutely amazing things
- You deserve all the beautiful things coming your way
- Your presence makes this world infinitely brighter
- I'm grateful for you every single day of my life

Take on today with confidence and joy, knowing that you are absolutely incredible exactly as you are.

Have the most wonderful, beautiful day, my love.

Starting each day by loving you more,
Your devoted morning person ☀️💖`
      }
    ]
  },

  // 🌙 Bedtime - Sweet dreams
  bedtime: {
    title: "Sweet Dreams",
    tag: "sleep peacefully 🌙",
    emoji: "🌙",
    description: "Peaceful endings to your day",
    mood: "comforting",
    letters: [
      {
        title: "Rest Well, My Love",
        preview: "As you close your eyes tonight...",
        content: `My sweetest dream,

As you prepare for sleep tonight, I want your final thoughts to be filled with love, peace, and the deepest contentment.

Today you gave your best effort to everything you did, and that's all anyone could ever ask for. Whatever happened today - the victories and the struggles, the laughter and the tears - you handled it all with such grace and strength. Now it's time to rest your beautiful mind and body.

Let go of any worries from today. Tomorrow will take care of itself with fresh energy and new possibilities. Right now, all you need to do is breathe deeply and allow yourself to completely relax.

Imagine my arms wrapped around you, keeping you safe, warm, and completely protected. Imagine all your stress and tension melting away like snow in spring sunshine. You are loved, you are cherished, and you can rest peacefully knowing this.

Close your eyes and dream of all the beautiful things waiting for you in the future. Dream of our adventures together. Dream of your hopes and dreams coming true. Dream of how incredibly proud I am of who you are.

Sleep well, my precious love. Tomorrow is another day to love you even more.

With all my love and the gentlest kisses,
Your guardian of sweet dreams 🌙✨💤`
      }
    ]
  },

  // 🎉 Birthday - Special celebration
  birthday: {
    title: "Birthday Magic",
    tag: "celebrate you 🎂",
    emoji: "🎉",
    description: "Celebrating your special day",
    mood: "celebratory",
    letters: [
      {
        title: "Happy Birthday, My Love",
        preview: "Today we celebrate the most amazing person...",
        content: `My birthday angel,

Happy, happy birthday to the most incredible, wonderful, amazing person in the entire world! Today is all about celebrating YOU, and I couldn't be more excited and grateful.

I'm so deeply thankful that you were born. I'm grateful for every single year that shaped you into the extraordinary person you are today. I'm grateful that our paths crossed in this vast universe and that I get the incredible privilege of loving you.

You make this world infinitely brighter just by existing in it. You bring joy, kindness, laughter, and love everywhere you go. You make everyone around you better people, including me - especially me.

I hope your birthday is filled with everything that brings you pure happiness - delicious food, your favorite people, wonderful surprises that make you smile, and countless moments that remind you just how deeply loved and cherished you are.

You deserve to be celebrated not just today, but every single day of the year. You deserve all the love, all the joy, all the beautiful experiences life has to offer and so much more.

I can't wait to celebrate many, many more birthdays with you, to watch you grow and evolve and become even more amazing (if that's even humanly possible).

Have the most wonderful, magical day, birthday love!

Celebrating you today and always,
Your birthday party planner and biggest fan 🎂🎉✨`
      }
    ]
  },

  // 🌸 Monthly care - Period support
  period: {
    title: "Monthly Warrior",
    tag: "extra tender care 🌸",
    emoji: "🌸",
    description: "Extra love during your cycle",
    mood: "supportive",
    letters: [
      {
        title: "You're Still Perfect",
        preview: "Your body is doing something incredible...",
        content: `My beautiful, strong woman,

I know you don't feel your best right now. You're uncomfortable, you're in pain, you feel bloated and emotional and just not like your usual vibrant self. But I want you to know something really important - you are still absolutely perfect to me in every single way.

Your body is doing something truly incredible right now. It's following ancient, natural rhythms that connect you to the fundamental cycles of life itself. It's showing its remarkable power and resilience. There is absolutely nothing disgusting, shameful, or embarrassing about this completely natural process.

You never have to hide from me or feel embarrassed about any part of this. You don't have to pretend you feel fine when you don't. I want to take care of you during this time, to make you comfortable and loved.

Please, put on those super comfortable clothes. Use that heating pad. Eat whatever sounds good to you. Cancel plans if you need to. Rest as much as your body wants. Be exactly where you are without any guilt or apology.

You are not "gross" or "moody" or any of those horrible things society sometimes tells women they are during their periods. You are beautifully, perfectly human. You are natural. You are strong. You are loved.

I love you through every single day of your cycle, through every mood, through every cramp and every comfort food craving.

Taking care of you always, in every season,
Your understanding and devoted partner 🌸💕`
      }
    ]
  },

  // 💎 Monthiversary - Monthly celebration
  monthiversary: {
    title: "Monthly Milestone",
    tag: "counting our love 💝",
    emoji: "💎",
    description: "Celebrating our journey together",
    mood: "romantic",
    letters: [
      {
        title: "Another Month of Beautiful Us",
        preview: "Celebrating another month of our love story...",
        content: `My precious, irreplaceable love,

Happy monthiversary! Another beautiful month has passed in our love story, and somehow I find myself even more deeply, completely in love with you than I was 30 days ago. How is that even possible? Yet here we are.

Every single month with you feels like the most precious gift I could ever receive. Every day we choose each other, every laugh we share, every challenge we face together, every quiet moment of contentment - it all adds up to this absolutely beautiful love story we're writing together, one page at a time.

I love looking back on this past month and remembering all our little moments that made my heart so full. The way you made me laugh when I was stressed about work. The way you supported and encouraged me through difficult times. The way you celebrated my victories as if they were your own dreams coming true.

But even more than remembering, I love looking forward into our future. I love knowing that we have many more months ahead of us, countless more memories to create, deeper love to discover, and adventures yet to be had.

Thank you for being my partner, my best friend, my favorite person in the entire world. Thank you for choosing us, for choosing love, every single day.

Here's to many, many more months of this beautiful journey together.

Counting every precious moment with you,
Your devoted monthly celebrant 💝📅✨`
      }
    ]
  },

  // 🫂 Anxious - Anxiety support
  anxious: {
    title: "Calm & Comfort",
    tag: "need peace & comfort 🫂",
    emoji: "🫂",
    description: "Support for anxious moments",
    mood: "comforting",
    letters: [
      {
        title: "Breathe With Me",
        preview: "You are stronger than any storm...",
        content: `My dearest, bravest love,

I can sense that right now your mind feels like it's racing at a million miles an hour, and the world might seem overwhelming and too much to handle. But I want you to take a slow, deep breath with me right now.

You are not alone in this moment of anxiety. Even when I'm not physically beside you, my love surrounds you like the warmest, most protective embrace. Your anxiety doesn't define who you are - it's just a temporary visitor in your mind, and like all visitors, it will leave.

Look back at all the times you've felt this exact way before. And look where you are now - you made it through every single one of those moments. You're so much stronger, braver, and more resilient than you give yourself credit for.

Close your eyes for a moment, take three deep breaths with me, and remember these truths:
- This overwhelming feeling is temporary and will pass
- You are completely safe right now
- You are loved beyond measure
- I believe in your strength completely
- You have everything you need within you to handle this

You've got this, beautiful soul. And no matter what, I've got you.

Breathing with you, standing with you, loving you always,
Your devoted partner and safe harbor 🫂❤️`
      }
    ]
  },

  // 🌊 Stressed - Stress relief
  stressed: {
    title: "Find Your Peace",
    tag: "breathe through it 🌊",
    emoji: "🌊",
    description: "Finding calm in the chaos",
    mood: "comforting",
    letters: [
      {
        title: "One Step at a Time",
        preview: "You don't have to carry it all at once...",
        content: `My overwhelmed, precious darling,

I can see that everything feels like way too much right now. Your to-do list seems endless, deadlines are looming like storm clouds, people are depending on you, and it feels like the whole world is spinning too fast for you to catch your breath.

But let's slow down together for just a moment. Let's breathe deeply and find some calm in this chaos.

You don't have to do everything all at once. You don't have to be everything to everyone right now. You don't have to solve every single problem today.

Here's what we're going to do: Pick just one thing. Just one small thing. Do that one thing mindfully and completely. Then pick another. One step at a time, one breath at a time, one moment at a time.

It's completely okay to ask for help. It's okay to delegate. It's okay to say "I'm feeling overwhelmed and I need support." The strongest people are the ones who know when to ask for help and actually do it.

Remember that you've handled overwhelming stress before and you've come through it successfully every time. This situation will pass too. You are far more capable and resilient than you realize in moments like this.

Take a hot shower. Call a friend. Go for a walk. Do something, anything, that brings you even a small moment of peace and relief.

You've absolutely got this, and I've got you every step of the way.

Breathing calmly with you,
Your steady anchor in every storm 🌊💙`
      }
    ]
  },

  // 🌈 Bad Day - Hope and recovery
  badday: {
    title: "Tomorrow's Promise",
    tag: "better days ahead 🌈",
    emoji: "🌈",
    description: "Hope after difficult days",
    mood: "supportive",
    letters: [
      {
        title: "This Too Shall Pass",
        preview: "Bad days don't last, but strong people do...",
        content: `My incredibly strong survivor,

I can tell that today has been really tough on you. Nothing seemed to go right, everything felt impossibly hard, and you probably just want this entire day to be over and done with.

I'm so sorry you've had such a difficult day. I wish I could have absorbed some of that pain and difficulty for you, wish I could have somehow made things easier and lighter for your beautiful heart.

But here's what I know with absolute certainty about bad days - they end. And here's what I know about you - you're incredibly resilient, strong, and capable, even when you don't feel like it at all.

Bad days are simply part of the human experience. They don't mean you're doing anything wrong, they don't mean things won't get better, and they definitely don't define who you are or what your life will be. They're just temporary storms that pass through our lives.

Tomorrow is a completely fresh start. New possibilities, new opportunities, new chances for things to go beautifully right. Today's struggles and disappointments don't determine tomorrow's potential for joy and success.

For now, please be extra gentle and kind to yourself. Do something comforting that brings you peace. Remember that you're loved so deeply and that this difficult day doesn't define you.

You've successfully gotten through 100% of your bad days so far. That's an absolutely perfect track record, and I have complete faith in you.

Standing by you through every storm and sunshine,
Your constant support system and cheerleader 🌈💪✨`
      }
    ]
  }
};
