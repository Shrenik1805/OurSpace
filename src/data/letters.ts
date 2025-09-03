export interface Letter {
  title: string;
  content: string;
  date?: string;
  preview: string;
}

export interface LetterCategory {
  title: string;
  description: string;
  letters: Letter[];
}

export const letterCategories: Record<string, LetterCategory> = {
  anxiety: {
    title: "When You're Anxious",
    description: "Calming words for worried moments",
    letters: [
      {
        title: "Breathe With Me",
        preview: "Remember, my love, you are stronger than any storm...",
        content: `My dearest love,

I know right now your mind feels like it's racing, and the world might seem overwhelming. But I want you to take a deep breath with me.

You are not alone in this moment. Even when I'm not physically there, my love surrounds you like a warm embrace. Your anxiety doesn't define you - it's just a temporary visitor, and like all visitors, it will leave.

Remember all the times you've felt this way before? And look - you made it through every single one. You're so much stronger and braver than you give yourself yourself credit for.

Close your eyes, take three deep breaths, and remember:
- This feeling is temporary
- You are safe
- You are loved beyond measure
- I believe in you completely

You've got this, beautiful. And I've got you.

All my love and strength,
Your devoted partner ❤️`
      },
      {
        title: "You're Safe",
        preview: "In a world of uncertainty, there's one thing that never changes...",
        content: `My beautiful soul,

I know your mind is spinning right now, creating scenarios and worries that feel so real and scary. But I need you to hear this truth: you are safe.

Even when your anxiety tells you otherwise, even when it feels like everything is falling apart - you are safe in my love. You are safe in your own strength. You are safe in this moment.

Your worries are valid, and I'm not dismissing them. But remember that most of the things we worry about never actually happen. Your beautiful mind is just trying to protect you, even when you don't need protection.

Here's what I want you to do:
- Name 5 things you can see
- 4 things you can touch  
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

This will bring you back to now, where you are safe, where you are loved, where you are enough.

I love every part of you, including the parts that worry.

Forever yours,
Your safe harbor 💕`
      }
    ]
  },
  happy: {
    title: "Celebrating You",
    description: "Joy and love for your brightest moments",
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
      },
      {
        title: "Proud of You",
        preview: "Every single day you make me proud...",
        content: `My incredible love,

I am so incredibly proud of you. Not just for the big accomplishments (though those are amazing too), but for all the little ways you show up every day.

I'm proud of:
- How you handle challenges with grace
- The kindness you show to everyone around you
- How you keep going even when things get tough
- The way you love so fully and deeply
- Your courage to be authentically yourself
- How you make me want to be a better person

You might not always feel like you're doing enough, but you are doing so much more than enough. You are extraordinary in the most beautiful, everyday ways.

Thank you for being exactly who you are. Thank you for sharing your life with me. Thank you for being my person.

I love you more than words can express.

With all my admiration and love,
Your forever cheerleader 🌟`
      }
    ]
  },
  encouragement: {
    title: "You've Got This",
    description: "Strength and motivation for tough times",
    letters: [
      {
        title: "Stronger Than You Know",
        preview: "My love, you have overcome so much already...",
        content: `My warrior,

I see you doubting yourself, wondering if you're strong enough for what's ahead. Let me remind you of something: you are so much stronger than you know.

Look at everything you've already survived. Look at all the challenges you've faced and conquered. Look at how you've grown and evolved. You didn't get this far by accident - you got here because you have an incredible strength inside you.

Yes, the road ahead might be difficult. Yes, there might be obstacles and setbacks. But you know what? You're equipped for this. You have everything you need within you.

When you feel like giving up, remember:
- Every expert was once a beginner
- Every success story started with someone who refused to give up
- Your dreams chose you because you're capable of achieving them
- I believe in you with my whole heart

You don't have to be perfect. You just have to keep going. One step at a time, one day at a time, one breath at a time.

I'm cheering you on every step of the way.

Believing in you always,
Your number one supporter 💪`
      }
    ]
  },
  daily: {
    title: "Daily Reminders",
    description: "Sweet thoughts for everyday moments",
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
      },
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
  goodnight: {
    title: "Sweet Dreams",
    description: "Peaceful thoughts for bedtime",
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
  random: {
    title: "Just Because",
    description: "Random love notes from my heart",
    letters: [
      {
        title: "I Choose You",
        preview: "In a world full of people, I choose you...",
        content: `My chosen one,

In a world of billions of people, in all the possible timelines and universes, I choose you. Not just once, but every single day. I choose you in your strength and in your vulnerability. I choose you in your joy and in your struggles.

I choose your morning voice and your sleepy eyes. I choose your passionate rants and your quiet moments. I choose your dreams and your fears. I choose your past, your present, and whatever future we build together.

This isn't about perfection - it's about choice. And every day, when I wake up, I think about how grateful I am that out of all the people in the world, I get to love you.

You make ordinary moments magical just by being in them. You make me believe in love stories and happy endings. You make me want to be the best version of myself.

Thank you for being you. Thank you for letting me love you. Thank you for being mine.

Choosing you forever,
Your devoted heart 💕`
      },
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
  }
};