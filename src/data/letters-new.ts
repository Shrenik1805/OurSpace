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
}

// Categories organized by mood-based groupings
export const letterCategories: Record<string, LetterCategory> = {
  // ✨ Emotional Support (Happy, sad, missing you)
  happy: {
    title: "Celebrate Your Joy",
    tag: "shine brighter ✨",
    letters: [
      {
        title: "Your Beautiful Smile",
        preview: "The way your eyes light up when you're happy...",
        content: `My sunshine,

I wish you could see yourself the way I see you when you're happy. Your smile doesn't just light up the room - it lights up my entire world.

When you laugh, it's like music that I never want to stop hearing. When your eyes sparkle with joy, I fall in love with you all over again. Your happiness is contagious in the most beautiful way.

I love how you get excited about little things - the way you dance when your favorite song comes on, how you light up talking about things you're passionate about, the way you celebrate small victories.

Never apologize for your joy. Never dim your light for anyone. Your happiness is a gift to this world, and seeing you embrace it is one of my greatest privileges.

Keep shining, my love. The world needs your light.

Celebrating you always,
Your biggest fan ✨`
      }
    ]
  },
  low: {
    title: "Lift Your Spirit",
    tag: "need encouragement 💪",
    letters: [
      {
        title: "You Are Enough",
        preview: "Exactly as you are, right now...",
        content: `My perfect imperfection,

I need you to hear this today: YOU ARE ENOUGH.

Not when you lose weight or gain confidence. Not when you get that promotion or achieve that goal. Not when you fix the things you think are broken about yourself.

Right now. Today. In this moment. Exactly as you are.

You are enough love to give and receive. You are enough intelligence to figure things out. You are enough strength to handle what comes. You are enough beauty to light up any room. You are enough kindness to change someone's day.

Stop waiting to feel worthy of love - you already are. Stop trying to earn a place in this world - you already belong. Stop believing you need to be different - you are already perfect in your imperfection.

I fell in love with you exactly as you are. Your flaws aren't bugs that need fixing - they're features that make you uniquely, beautifully you.

You. Are. Enough.

Loving every part of you,
Your reminder that you're already whole ❤️`
      }
    ]
  },
  missme: {
    title: "Missing You Too",
    tag: "feel our connection 💕",
    letters: [
      {
        title: "I'm Always With You",
        preview: "Distance means nothing when you mean everything...",
        content: `My heart,

I know you miss me, and I miss you too. More than words can express. But I want you to know something - even when we're apart, I'm never really gone.

I'm in the morning coffee that reminds you of our lazy Sunday mornings together. I'm in your favorite song that makes you smile. I'm in the sunset that takes your breath away. I'm in every little moment that makes you think of love.

Close your eyes and feel my arms around you. Remember my voice telling you how much I love you. Remember my laugh when you tell me your silly jokes. Remember how it feels when I hold your hand.

The distance is temporary, but my love for you is eternal. Every second we're apart just makes me appreciate you more. Every day brings us closer to being together again.

Until then, carry my love with you everywhere you go. You are never alone.

Missing you endlessly,
Your heart that beats for you 💕`
      }
    ]
  },

  // ✨ Daily Life (Wake up, bedtime, just because)
  wakeup: {
    title: "Good Morning Sunshine",
    tag: "start your day ☀️",
    letters: [
      {
        title: "Good Morning, Beautiful",
        preview: "Another day to love you starts now...",
        content: `Good morning, my beautiful love,

As you open your eyes to a new day, I want you to know that somewhere, someone is thinking about you with the biggest smile on their face. That someone is me.

Today is a blank canvas, and you get to paint it however you want. Whether today brings challenges or celebrations, remember that you have everything you need to handle whatever comes your way.

Here's your daily reminder:
- You are loved beyond measure
- You are capable of amazing things
- You deserve all the good things coming your way
- Your presence makes the world brighter
- I'm grateful for you every single day

Take on today with confidence, knowing that you are absolutely incredible just as you are.

Have the most wonderful day, my love.

Starting each day loving you,
Your devoted morning person ☀️`
      }
    ]
  },
  bedtime: {
    title: "Sweet Dreams",
    tag: "sleep peacefully 🌙",
    letters: [
      {
        title: "Sleep Well, My Love",
        preview: "As you close your eyes tonight...",
        content: `My sweetest dream,

As you prepare for sleep tonight, I want your last thoughts to be filled with love and peace.

Today you did your best, and that's all anyone can ask for. Whatever happened today - the victories and the struggles - you handled it all with grace. Now it's time to rest.

Let go of any worries from today. Tomorrow will take care of itself. Right now, all you need to do is breathe deeply and let your body and mind relax.

Imagine my arms around you, keeping you safe and warm. Imagine all your stress melting away. You are protected, you are loved, and you can rest peacefully.

Close your eyes and dream of all the beautiful things waiting for you. Dream of our future together. Dream of your hopes coming true. Dream of how proud I am of you.

Sleep well, my love. Tomorrow is another day to love you.

With all my love and gentle kisses,
Your guardian of sweet dreams 🌙✨`
      }
    ]
  },
  daily: {
    title: "Just Because",
    tag: "deserve love always 💭",
    letters: [
      {
        title: "Thinking of You",
        preview: "Just because I love you...",
        content: `My dearest,

No special reason for this letter except that you crossed my mind (which happens about every 5 minutes, to be honest), and I wanted you to know.

I love how you exist in this world. I love your laugh, your thoughts, your dreams, your quirky habits, the way you see beauty in small things. I love how you care so deeply about everything and everyone.

I hope you're having a good day. I hope you're being kind to yourself. I hope you know how special you are.

If today has been hard, remember that tomorrow is a fresh start. If today has been good, I'm so happy your heart is light.

Either way, I love you.

Just because,
Your person who thinks about you constantly 💭❤️`
      }
    ]
  },

  // ✨ Special Occasions (Birthday, Montiversary)
  birthday: {
    title: "Birthday Magic",
    tag: "celebrate you 🎂",
    letters: [
      {
        title: "Happy Birthday, My Love",
        preview: "Today we celebrate the most amazing person I know...",
        content: `My birthday angel,

Happy, happy birthday to the most incredible person in the world! Today is all about celebrating you, and I couldn't be more excited.

I'm so grateful that you were born. I'm grateful for every year that led you to become the amazing person you are today. I'm grateful that our paths crossed and that I get to love you.

You make this world brighter just by being in it. You bring joy, kindness, laughter, and love wherever you go. You make everyone around you better, including me.

I hope your birthday is filled with everything that makes you happy - good food, your favorite people, surprises that make you smile, and moments that remind you how loved you are.

You deserve to be celebrated not just today, but every single day. You deserve all the love, all the joy, all the beautiful things life has to offer.

I can't wait to celebrate many more birthdays with you, to watch you grow and evolve and become even more amazing (if that's even possible).

Have the most wonderful day, birthday girl/boy!

Celebrating you always,
Your birthday party planner 🎂🎉`
      }
    ]
  },
  montiversary: {
    title: "Monthly Milestone",
    tag: "celebrate our love 💕",
    letters: [
      {
        title: "Another Month of Love",
        preview: "Celebrating another beautiful month together...",
        content: `My love,

Happy montiversary! Another month of loving you, learning about you, and growing together. Time feels different when you're in love - some days feel like forever, and some months feel like minutes.

This month brought us new memories, new inside jokes, new ways to love each other. I think about all the little moments that made this month special - your sleepy morning voice, the way you laugh at your own jokes, how you always know exactly what to say when I need comfort.

Every month with you is a gift. Every month, I discover new things about you that make me fall deeper in love. Every month, our connection grows stronger, our understanding deeper, our love more unshakeable.

Here's to all the months behind us that brought us to this moment, and all the months ahead that will bring us even closer together.

I love you more today than I did a month ago, and I'll love you even more a month from now.

Celebrating our love always,
Your devoted partner 💕`
      }
    ]
  },

  // ✨ Tough Times (Anxious, stressed, bad day, monthly warrior)
  anxious: {
    title: "For Your Anxious Heart",
    tag: "need calm & comfort 🫂",
    letters: [
      {
        title: "Breathe With Me",
        preview: "Remember, my love, you are stronger than any storm...",
        content: `My dearest love,

I know right now your mind feels like it's racing, and the world might seem overwhelming. But I want you to take a deep breath with me.

You are not alone in this moment. Even when I'm not physically there, my love surrounds you like a warm embrace. Your anxiety doesn't define you - it's just a temporary visitor, and like all visitors, it will leave.

Remember all the times you've felt this way before? And look - you made it through every single one. You're so much stronger and braver than you give yourself credit for.

Close your eyes, take three deep breaths, and remember:
- This feeling is temporary
- You are safe
- You are loved beyond measure
- I believe in you completely

You've got this, beautiful. And I've got you.

All my love and strength,
Your devoted partner ❤️`
      }
    ]
  },
  stressed: {
    title: "Breathe Through It",
    tag: "find your calm 🌊",
    letters: [
      {
        title: "One Thing at a Time",
        preview: "You don't have to carry it all at once...",
        content: `My overwhelmed darling,

I know everything feels like too much right now. Your to-do list is endless, deadlines are looming, people are depending on you, and it feels like the world is spinning too fast.

But let's slow down for just a moment. Let's breathe together.

You don't have to do everything at once. You don't have to be everything to everyone. You don't have to solve every problem today.

Pick one thing. Just one. Do that one thing. Then pick another. One step at a time, one breath at a time, one moment at a time.

It's okay to ask for help. It's okay to delegate. It's okay to say "I'm overwhelmed and I need support." Strong people ask for help when they need it.

Remember that you've handled stress before and you've come through it. This too shall pass. You are more capable and resilient than you know.

Take a hot shower. Call a friend. Go for a walk. Do something, anything, that brings you even a moment of peace.

You've got this, and I've got you.

Breathing with you,
Your calm in every storm 🌊💙`
      }
    ]
  },
  badday: {
    title: "Tomorrow's Sunshine",
    tag: "better days ahead 🌈",
    letters: [
      {
        title: "Tomorrow Will Be Better",
        preview: "Bad days don't last, but resilient people do...",
        content: `My strong survivor,

I can tell today has been rough on you. Nothing went right, everything felt hard, and you probably just want this day to be over.

I'm so sorry you had a bad day. I wish I could have absorbed some of that difficulty for you, wish I could have made things easier somehow.

But here's what I know about bad days - they end. And here's what I know about you - you're incredibly resilient, even when you don't feel like it.

Bad days are part of being human. They don't mean you're doing anything wrong or that things won't get better. They're just temporary storms that pass through our lives.

Tomorrow is a fresh start. New possibilities, new opportunities, new chances for things to go right. Today's struggles don't determine tomorrow's success.

For now, be extra gentle with yourself. Do something that brings you comfort. Remember that you're loved deeply and that this day doesn't define you.

You've gotten through 100% of your bad days so far. That's a perfect track record.

Standing by you through it all,
Your constant support system 🌈💪`
      }
    ]
  },
  period: {
    title: "Monthly Warrior",
    tag: "extra tender care 🌸",
    letters: [
      {
        title: "You're Still Perfect",
        preview: "Your body is doing something amazing...",
        content: `My beautiful strong woman,

I know you don't feel your best right now. You're cramping, you're uncomfortable, you feel bloated and emotional and just not like yourself. But I want you to know something - you are still absolutely perfect to me.

Your body is doing something incredible. It's following ancient rhythms, preparing for life, showing its incredible power and resilience. There is nothing disgusting or shameful about this natural process.

You don't have to hide from me or feel embarrassed. You don't have to pretend you feel fine when you don't. I want to take care of you during this time.

Put on those comfortable clothes. Use the heating pad. Eat whatever sounds good. Cancel plans if you need to. Rest as much as you want.

You are not "gross" or "moody" or any of those horrible things society tells women they are during their periods. You are human, you are natural, you are beautiful.

I love you through every day of your cycle, through every mood, through every cramp and every comfort food craving.

Taking care of you always,
Your understanding partner 🌸💕`
      }
    ]
  }
};
