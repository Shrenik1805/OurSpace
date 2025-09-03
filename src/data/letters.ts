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
export const letterCategories: Record<string, LetterCategory> = {
  anxious: {
    title: "When You're Anxious",
    tag: "Are anxious",
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
      }
    ]
  },
  wakeup: {
    title: "When You Wake Up",
    tag: "Wake up",
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
  low: {
    title: "When You Feel Low",
    tag: "Feel low",
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
  happy: {
    title: "When You're Happy",
    tag: "Are happy",
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
  missme: {
    title: "When You Miss Me",
    tag: "Miss me",
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
  hungry: {
    title: "When You're Hungry",
    tag: "Are hungry",
    letters: [
      {
        title: "Nourish Yourself, Love",
        preview: "Take care of yourself like I would take care of you...",
        content: `My sweet angel,
I know you're hungry right now, and I wish I could cook your favorite meal for you. But since I can't be there, I want to remind you to nourish yourself with the same love and care that I would.
Remember to eat something that makes you feel good - not just physically, but emotionally too. Maybe that comfort food that always makes you smile, or something fresh and energizing that makes you feel alive.
Take a moment to sit down and enjoy your meal. Don't rush it. Savor every bite and remember that taking care of yourself is an act of love - love for yourself and love for me, because seeing you healthy and happy is all I want.
You deserve to be fed well, to be cared for, to be nourished in every way. Don't forget to drink some water too, beautiful.
I love you and I want you to love yourself the way I love you - completely and without condition.
Sending you all my love and virtual hugs,
Your caring partner 🍽️💕`
      }
    ]
  },
  home: {
    title: "When You Miss Home",
    tag: "Miss home",
    letters: [
      {
        title: "You Are My Home",
        preview: "Home isn't a place, it's a feeling...",
        content: `My darling,
I know you're missing home right now, and that ache in your heart is so real and valid. Home represents comfort, safety, familiarity - all the things that make us feel grounded.
But I want you to remember something beautiful: you carry home with you everywhere you go. Home isn't just a place with four walls - it's the love in your heart, the memories you cherish, the values that guide you, and the dreams that inspire you.
You are my home. Wherever you are in this world, that's where my heart feels most at peace. When I think of home, I think of your laugh, your warmth, your presence beside me.
Create little pockets of home wherever you are - play familiar music, call the people you love, do something that brings you comfort. You have the power to create that feeling of belonging anywhere.
And remember, I'm here loving you across any distance. You're never truly alone because you carry my love with you always.
You are home, you are loved, you are enough.
Forever yours,
Your love who finds home in you 🏡💕`
      }
    ]
  },
  food: {
    title: "When You Miss Food",
    tag: "Miss food",
    letters: [
      {
        title: "Taste of Love",
        preview: "Every meal is better when shared with love...",
        content: `My foodie love,
I know you're craving that special dish right now - maybe it's your mom's cooking, that restaurant we went to on our first date, or just some good comfort food that hits the soul.
Food is so much more than sustenance, isn't it? It's love, memory, culture, comfort all rolled into one. I love how your eyes light up when you talk about your favorite foods, how passionate you get about flavors and textures.
I promise you, we'll have that meal again. We'll sit together, share bites, laugh over dinner, and create new food memories. Until then, try to find something that brings you even a little bit of that joy.
Cook something with love, even if it's simple. Try that new recipe you've been wanting to make. Order something that makes you smile. Food tastes better when it's made or chosen with intention and love.
I can't wait to cook for you again, to see that happy expression when you take that first perfect bite.
Sending you all my love and virtual taste buds,
Your personal chef and biggest fan 🍳❤️`
      }
    ]
  },
  exams: {
    title: "When You Have Exams",
    tag: "Have exams",
    letters: [
      {
        title: "You've Got This, Genius",
        preview: "Believe in yourself as much as I believe in you...",
        content: `My brilliant scholar,
I know exam time is stressful, and your mind might be racing with everything you need to remember and do. But I want you to take a deep breath and remember how incredibly smart and capable you are.
You've prepared for this. You've studied hard, you've put in the effort, and you know more than you think you do. Trust in all the work you've done and trust in your amazing mind.
Here's what I want you to remember during your exams:
- Read each question carefully and take your time
- Trust your first instincts - they're usually right
- If you don't know an answer, move on and come back to it
- You don't have to be perfect, just do your best
- I'm so proud of you no matter what the results are
Take breaks, eat well, stay hydrated, and get enough sleep. Your health is more important than any grade.
You are so much more than your exam results. You are kind, intelligent, hardworking, and amazing. These exams are just one small part of your incredible journey.
I believe in you completely.
Cheering you on from here,
Your biggest supporter and study buddy 📚✨`
      }
    ]
  },
  daily: {
    title: "Daily Reminders",
    tag: "Daily reminders",
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
  bedtime: {
    title: "When You Go to Bed",
    tag: "Go to bed",
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
  frustrated: {
    title: "When You're Frustrated",
    tag: "Are frustrated",
    letters: [
      {
        title: "Let It Out, Love",
        preview: "It's okay to feel frustrated, you're human...",
        content: `My strong warrior,
I can feel your frustration from here, and I want you to know that it's completely okay to feel this way. You're human, you're allowed to have hard days, and you're allowed to feel overwhelmed.
Sometimes life doesn't go according to plan. Sometimes people let us down, things break, plans fall through, and nothing seems to work out the way we want it to. It's infuriating and exhausting and completely valid to be frustrated about it.
But here's what I know about you - you're resilient. You've gotten through 100% of your bad days so far, and that's a pretty good track record. This frustration is temporary, but your strength is permanent.
Take some deep breaths. Scream into a pillow if you need to. Go for a walk. Listen to angry music. Do whatever helps you process these feelings safely.
Then, when you're ready, we'll figure it out together. Every problem has a solution, even if we can't see it right now.
I love you through every emotion, every bad day, every moment of frustration. You're going to be okay.
Standing by your side always,
Your patient and understanding love 💪❤️`
      }
    ]
  },
  angry: {
    title: "When You're Angry",
    tag: "Are angry",
    letters: [
      {
        title: "Your Feelings Are Valid",
        preview: "It's okay to be angry, let yourself feel it...",
        content: `My fierce love,
You're angry right now, and you know what? That's perfectly okay. Anger is a valid emotion, and you have every right to feel it fully.
Don't let anyone tell you to "calm down" or that you're "overreacting." Your feelings matter, your boundaries matter, and whatever has made you angry deserves to be acknowledged.
Anger often comes from a place of hurt or injustice. Something has crossed a line, violated your values, or threatened something you care about. That fire in you? It's your inner strength protecting what matters to you.
Feel your anger fully, but don't let it consume you. Use it as fuel to make positive changes, to stand up for yourself, to set boundaries, to fight for what's right.
You are allowed to be angry. You are allowed to take up space with your feelings. You are allowed to demand better treatment. You are allowed to say "no" and "this isn't okay."
I love every part of you, including your righteous anger. Channel it wisely, my fierce protector.
Supporting your fire always,
Your ally in all battles 🔥❤️`
      }
    ]
  },
  hateme: {
    title: "When You Hate Me",
    tag: "Hate me",
    letters: [
      {
        title: "Even When You're Mad",
        preview: "I love you even when you can't stand me...",
        content: `My complicated love,
I know you're furious with me right now, and I understand. I probably messed up, said the wrong thing, or hurt your feelings. I'm not perfect, and sometimes I fail at being the partner you deserve.
But I want you to know something, even in your anger - I love you. I love you when you're happy with me, and I love you when you hate me. I love you when we're laughing together, and I love you when you can't stand to look at me.
Your anger doesn't scare me away. Your disappointment doesn't make me love you less. We're going to fight sometimes, we're going to hurt each other's feelings, and we're going to have days where we drive each other crazy. That's what real love looks like.
I'm sorry for whatever I did to make you feel this way. I want to make it right, I want to learn from this, and I want to do better.
Take all the time you need to be angry with me. I'll be here when you're ready to talk, ready to listen, ready to make amends.
I love you through it all.
Forever yours, even when you hate me,
Your imperfect but devoted partner 💔❤️`
      }
    ]
  },
  worried: {
    title: "When You're Worried About Us",
    tag: "Are worried for us",
    letters: [
      {
        title: "We're Stronger Together",
        preview: "Whatever you're worried about, we'll face it together...",
        content: `My precious heart,
I can sense that worry in your mind about us, about our relationship, about our future. Those fears are creeping in and making you question everything beautiful we've built together.
Let me ease those worries with some truths:
I choose you. Not just today, but every day. Not just when it's easy, but especially when it's hard. Not just when we're happy, but when we're struggling too.
We're not perfect, and we never will be. We'll have disagreements, we'll have bad days, we'll face challenges that test us. But that doesn't mean we're not right for each other - it means we're human.
What matters is that we keep showing up for each other. We keep communicating, we keep trying, we keep choosing love even when it's difficult.
I see our future together, and it's beautiful. It's full of growth, adventure, laughter, and yes, some tears too. But we'll face it all together.
Your worries about us are natural, but don't let them convince you that what we have isn't real or strong enough. We are strong enough. We are enough.
I love you through every worry and every fear.
Committed to us always,
Your partner in this beautiful chaos 💕`
      }
    ]
  },
  tired: {
    title: "When You're Tired",
    tag: "Are tired",
    letters: [
      {
        title: "Rest, My Love",
        preview: "You've been so strong for so long...",
        content: `My exhausted angel,
I can see how tired you are - tired in your bones, tired in your soul, tired in ways that sleep alone can't fix. You've been carrying so much, giving so much, pushing through so much.
It's okay to be tired. It's okay to admit that you need rest, need a break, need someone to take care of you for a while.
You don't have to be strong all the time. You don't have to have it all figured out. You don't have to keep pushing when your body and spirit are crying out for rest.
Give yourself permission to slow down. Take that nap. Cancel those plans. Say no to that extra responsibility. Put your phone on silent. Just breathe.
You are not lazy for needing rest. You are not weak for being tired. You are human, and humans need time to recharge.
I wish I could wrap you in the softest blanket, bring you your favorite tea, and let you sleep for as long as you need. Since I can't be there, please do these things for yourself.
Rest, my love. The world can wait. Your well-being is more important than any deadline or obligation.
Protecting your peace always,
Your soft place to land 🌙💤`
      }
    ]
  }, // fixed: single closing brace then comma

  stressed: {
    title: "When You're Stressed",
    tag: "Are stressed",
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
  mood: {
    title: "When You're in the Mood",
    tag: "Are in the mood",
    letters: [
      {
        title: "You Drive Me Wild",
        preview: "The way you look at me when you want me...",
        content: `My irresistible love,
I can tell by that look in your eyes, that little smile, the way you're moving - you're thinking about us, about our bodies, about the way we fit together so perfectly.
You are absolutely intoxicating. The way you bite your lip when you want me, the way your eyes get that hungry look, the way you move closer like you can't help yourself - it drives me absolutely wild.
I love how confident you are in your desire, how you own your sexuality, how you make me feel wanted and needed and completely crazy for you.
I'm thinking about every inch of you, every sound you make, every way we connect. I'm thinking about how beautiful you look when you let go completely, how perfect you feel in my arms.
I wish I could be there to worship every part of you, to show you exactly how much I want you, to make you feel as incredible as you make me feel.
You are gorgeous, you are sexy, you are mine.
Wanting you always,
Your devoted lover 🔥💋`
      }
    ]
  },
  period: {
    title: "When You're on Your Period",
    tag: "Are on your period",
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
  },
  lesspretty: {
    title: "When You Feel Less Pretty",
    tag: "Feel less pretty (impossible)",
    letters: [
      {
        title: "You Are Breathtaking",
        preview: "How could you not see what I see?...",
        content: `My stunning goddess,
You texted me that you're feeling ugly today, and my heart just broke a little. How could the most beautiful person I know not see what I see every time I look at you?
You are breathtaking. Not just when you're all dressed up with makeup on, but right now, exactly as you are. In your pajamas with messy hair and no makeup - you take my breath away.
I love your face when you first wake up. I love the little lines around your eyes when you laugh. I love your natural skin, your real hair, your actual body that does amazing things every day.
You are not your worst angle in bad lighting. You are not the critical voice in your head. You are not the impossible standards that society has tried to impose on you.
You are the way your eyes light up when you're excited. You are the grace in your movements. You are the kindness that radiates from your soul and makes you glow.
Beauty is not a size, an age, or a filter. Beauty is life, joy, love, authenticity - and you have all of those in abundance.
I see you, all of you, and you are absolutely beautiful.
Worshipping your beauty always,
Your devoted admirer 💖✨`
      }
    ]
  },
  sick: {
    title: "When You're Sick",
    tag: "Are sick",
    letters: [
      {
        title: "Get Well Soon, Love",
        preview: "I wish I could take care of you...",
        content: `My sweet patient,
I hate that you're not feeling well. I wish I could be there to bring you soup, fluff your pillows, and take care of you the way you deserve.
Being sick is the worst - everything hurts, you feel exhausted, and even simple tasks feel overwhelming. But your body is fighting hard for you, and I'm so proud of it for working to get you better.
Please rest as much as you can. Don't worry about work, chores, or anything else right now. Your only job is to get better.
Drink lots of fluids, take your medicine, and sleep whenever your body tells you to. Listen to what you need and give it to yourself without guilt.
I'm sending you all my love and healing energy. I'm thinking about you constantly and hoping you feel better soon.
You're going to get through this, and I'll be here cheering you on every step of the way.
Nursing you back to health with love,
Your personal caregiver 🤒💊`
      }
    ]
  },
  cantsleep: {
    title: "When You Can't Sleep",
    tag: "Can't sleep",
    letters: [
      {
        title: "Close Your Eyes, Love",
        preview: "Let me help you find peace in the darkness...",
        content: `My restless darling,
I know your mind is racing and sleep feels impossible right now. Those thoughts are spinning, worries are multiplying, and the harder you try to sleep, the more awake you feel.
First, it's okay. One night of poor sleep won't hurt you. Try to release the pressure you're putting on yourself to fall asleep immediately.
Let's try something together. Close your eyes and imagine we're lying together in our favorite place. Feel my arm around you, your head on my chest, the rhythm of my breathing matching yours.
Think about all the good moments from today, no matter how small. The taste of your morning coffee, a text from a friend, a song you heard, the warmth of sunlight through a window.
Let go of tomorrow's worries. They'll still be there in the morning, and you'll handle them better after rest. Right now, there's nothing to solve, nothing to fix, nothing to do but breathe.
I'm here with you in the darkness, loving you, protecting your peace.
Sweet dreams, my love,
Your sleepy-time guardian 🌙💤`
      }
    ]
  },
  birthday: {
    title: "On Your Birthday",
    tag: "Your birthday",
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
  badday: {
    title: "On a Bad Day",
    tag: "Bad day",
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
  }
};
