# OddsUp 

## Inspiration

We were heavily inspired by fantasy sports leagues that we've done with our friends. We thought that instead of fantasy rankings being determined by the outcomes of sports games, it would be more fun to have it be determined by games/challenges within our own friend group.

## What it does

Our platform provides a way for friends to create groups and host challenges. The challenges consist of a series of options (input by the user) and the rewards for each option.

So if you were going bowling with your friends, you could create a challenge called "Bowling Night" with the options being all the people attending. Then everyone in the group can select who they think is going to win bowling night, if guessed correctly they get the reward. If someone is particularly good at bowling, you can lower their specific reward or if someone isn't great, increase their reward, so everyone is being rewarded for their relative risk they are taking.

Over time, people can build up their points through winning challenges and see how they place in the group ranking.

## How we built it

While we have previously used Firebase in the past, we felt this project's schema was more fitting for a SQL database, so we went with Supabase despite none of us having much experience with the platform.

We ended up using a SERN stack (SQL/Supabase, Express, React, Nodejs). Using Typescript to prevent the issues that arise from having a loosely typed language.

## Challenges we ran into

User authentication was a big struggle for us in the beginning since Supabase's authentication system is similar but not quite the same to Firebase. So that took sometime figuring out but in the end we were able to see it through.

## Accomplishments that we're proud of

We thought this was a really fun idea that we could see ourselves using in our day-to-day lives. We are definitely interested in continuing this project after the Hackathon. 

## What we learned

For Arun, one of our frontend developers, it was his first time using Vite.js, since his only experience with React was through Next.js.

For Rayyan, one of our frontend developers, it was his first time in a Hackathon.

For Rahul, our backend developer, it was his first time using Supabase.

## What's next for OddsUp

We were looking into expanding a lot of the web features and potentially building a mobile app.
