import type { ListeningSection } from '../db/types'

// 辅助：构建音频路径和起始时间
function aud(year: number, month: number, set: number, start = 0) {
 return { audioSrc: `/audio/${year}-${String(month).padStart(2, '0')}-S${set}.mp3`, audioStart: start }
}

// CET-4 听力标准时间轴（约值，可通过音频播放器微调）
// News1=0s, News2=100s, News3=210s, Conv1=330s, Conv2=460s, Pass1=600s, Pass2=760s, Pass3=930s

const sections: ListeningSection[] = [
 // ================================================================
 // 2024年6月 第1套
 // ================================================================
 {
 id: '2024-06-S1-SecA-1', year: 2024, month: 6, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2024, 6, 1, 38),
 transcript: `Six people had to move away from their home to another place after a fire broke out in a building on Main Street Saturday, officials said. Firefighters responded to the three-story building shortly after 1 p.m. for a reported structure fire, according to Norwalk Deputy Fire Chief Adam Markowitz.
Markowitz said crews encountered heavy smoke coming from the second floor when they arrived. A team of about 25 firefighters then spent about 25 minutes extinguishing the flames. Officials described the structure as a mixed-use building that features commercial businesses on the first floor and residential on the second and third floors.
Town records list four apartments in the building. Due to smoke and heat damage, the four apartments were declared uninhabitable, and the six residents had to move to another place, officials said. No injuries were reported in connection with the fire. The Norwalk Fire Marshal is investigating the cause and origin of the fire.`,
 questions: [
 { id: '2024-06-S1-Q1', question: 'Why did the six residents have to find another place to stay?', options: ['A) Due to a fire alarm in their apartments.', 'B) Because of the smoke and heat damage.', 'C) Due to the water used to extinguish the flames.', 'D) Because of the collapse of the three-story building.'], answer: 'B' },
 { id: '2024-06-S1-Q2', question: 'What does the news report say the Norwalk Fire Marshal is doing?', options: ['A) Investigating the cause of the incident.', 'B) Helping search for the suspect of the crime.', 'C) Rescuing the businessmen trapped in the building.', 'D) Checking town records for the property developer.'], answer: 'A' },
 ],
 },
 {
 id: '2024-06-S1-SecA-2', year: 2024, month: 6, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2024, 6, 1, 157),
 transcript: `A new study has cast doubt on historic research suggesting that the season or month of someone's birth is associated with an increased risk of certain mental health conditions. The study looks at symptoms of anxiety and depression among more than 70,000 older adults in Europe. A number of past studies have found the link between season of birth and mental health diagnoses.
Researchers have suggested that such links could arise from various things. These include nutrient intake, sun exposure, climate, and disease exposure varying across the course of the year. However, evidence has been mixed. More recent studies have suggested that factors such as social class or economic background have more to do with these diagnoses than month of birth.
Overall, the new study found no significant relationship between participants' month of birth and symptoms of depression or anxiety. There was some variability in some countries. In Poland, depressive symptoms fluctuated a little depending on birth month. In the Czech Republic, the same was true of anxiety symptoms. But on the whole, there was no systematic pattern.`,
 questions: [
 { id: '2024-06-S1-Q3', question: 'What have a number of past studies found about season of birth?', options: ['A) It plays a less important role in one\'s health than nutrient intake.', 'B) It impacts people\'s health to a lesser degree than sun exposure.', 'C) It is associated with people\'s mental health conditions.', 'D) It is linked with older adults\' symptoms of depression.'], answer: 'C' },
 { id: '2024-06-S1-Q4', question: 'What did the new study find about the relationship between participants\' month of birth and symptoms of depression?', options: ['A) It was indefinite.', 'B) It was systematic.', 'C) It was straightforward.', 'D) It was insignificant.'], answer: 'D' },
 ],
 },
 {
 id: '2024-06-S1-SecA-3', year: 2024, month: 6, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2024, 6, 1, 293),
 transcript: `Genetic researchers in China have made a clone of a star police dog. The clone was born in a laboratory in Beijing in December. Tests show that the clone and her mother are almost identical genetically. The mother dog helped solve multiple murders and many other crimes. The clone has already performed better than traditionally bred dogs on several tests.
If the clone continues to perform as well as expected, it could mean a huge reduction in the training time for police dogs, which usually takes about five years. The ultimate goal of scientists is to produce clones of talented police dogs that can be trained in months instead of years. However, this goal is not yet possible due to the current costs of the technology.
This is not the first time a clone has been made of a star police dog. In South Korea, six clones began working with the police in 2008.`,
 questions: [
 { id: '2024-06-S1-Q5', question: 'What do the researchers\' tests show about the cloned dog?', options: ['A) It has helped solve several murder cases.', 'B) It has become a star police dog in Beijing.', 'C) It has surpassed its mother in performance.', 'D) It has done better than naturally born dogs.'], answer: 'D' },
 { id: '2024-06-S1-Q6', question: 'What is the scientists\' purpose in cloning police dogs?', options: ['A) To speed up investigation into criminal cases.', 'B) To test the feasibility of cloning technology.', 'C) To cut down training expenses.', 'D) To reduce their training time.'], answer: 'D' },
 { id: '2024-06-S1-Q7', question: 'Why does the news report say the scientists\' goal is not yet possible?', options: ['A) Cloning is too complicated a process.', 'B) The technology is yet to be accepted.', 'C) Cloning is ethically controversial.', 'D) The technology is too expensive.'], answer: 'D' },
 ],
 },
 {
 id: '2024-06-S1-SecB-1', year: 2024, month: 6, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2024, 6, 1, 461),
 transcript: `W: Tom, did you see the article online about the new TV series based on the book The Three Body Problem?\nM: A colleague mentioned the book, but I've been so busy writing my thesis that I haven't been able to read for pleasure in months.\nW: Well, sounds like if you're going to read anything for fun, this is the book. It's written by a Chinese science fiction writer. I can't remember his name, but he's written three books in all, and The Three Body Problem is the first in the series. I don't want to say too much and spoil it for you, but it's definitely got some amazing technological and sociological concepts in it.\nM: It does sound like it would suit my taste, but if they are making a TV series based on it now, I don't know if I should read the book or watch the show first.\nW: I think it's better to read the book first. It's rare for the show or movie to be better than the book. And then, you just end up ruining the book for yourself, if the show isn't very good.\nM: When is the show supposed to start? I'm a bit overwhelmed with the amount of data I still need to collect to finish my thesis. But I still need to relax sometimes.\nW: I can't remember exactly. It's pretty soon, and it's going to be quite long. There are 24 episodes. Well, maybe you could download an electronic copy of the book and try to read it before the show starts.\nM: That's a good idea. And then, maybe we can watch the series together. Thanks for the tip, Alice.\nW: No problem.`,
 questions: [
 { id: '2024-06-S1-Q8', question: 'How did the man get to know about the book The Three Body Problem?', options: ['A) He read it somewhere online.', 'B) He heard about it from a coworker.', 'C) He read an article reviewing it.', 'D) He watched a TV series based on it.'], answer: 'B' },
 { id: '2024-06-S1-Q9', question: 'What does the woman say she can\'t remember about the book\'s author?', options: ['A) His publications.', 'B) His first book.', 'C) His address.', 'D) His name.'], answer: 'D' },
 { id: '2024-06-S1-Q10', question: 'What does the man have to do to finish his thesis?', options: ['A) Collect a lot more data.', 'B) Relax a bit less often.', 'C) Clarify many new concepts.', 'D) Read more reference books.'], answer: 'A' },
 { id: '2024-06-S1-Q11', question: 'What will the man most probably do first after the conversation?', options: ['A) Find out the show\'s most interesting episodes.', 'B) Watch the series together with the woman.', 'C) Get an e-copy of the book to read.', 'D) Check to see when the show starts.'], answer: 'C' },
 ],
 },
 {
 id: '2024-06-S1-SecB-2', year: 2024, month: 6, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2024, 6, 1, 645),
 transcript: `W: Hello, good afternoon. I have an inquiry to make. It's about the vegetarian food festival you are holding on the 19th of August at the Newcastle City Hall.\nM: Yes, of course. My name's Philip. How can I help you?\nW: It says on your website that you are still looking for vendors, and I grow organic vegetables on my farm, as well as doing my own home baking. Would I be able to sell both the vegetables and items baked from them at the festival?\nM: That's exactly the type of thing we are looking for. We're getting close to the deadline, however. Do you prefer to fill out an application on the web, or to print it out and fill it in by hand and then post it back to us? Remember that you will have to have all your certificates to hand when you are filling out the forms, as the standards are high and they'll be carefully checked before anyone will be able to sell their produce at the event.\nW: I should be fine with doing it on your website, and I already have all my certificates, as we run a small farm shop too. But can you give me your details anyway?\nM: Sure. Please address it to the Organic Organization, Vendor Applications, 112 Queens Road, Newcastle, Northumbria. The postcode is NU 29 3LJ. Remember that the closing date is next Tuesday, the 28th of June.\nW: That's absolutely wonderful. Thank you so much for your help. Goodbye.`,
 questions: [
 { id: '2024-06-S1-Q12', question: 'Why does the woman call the man?', options: ['A) To check the prices of his farm produce.', 'B) To ask the way to the Newcastle City Hall.', 'C) To inquire about the vegetarian food festival.', 'D) To seek the man\'s help with her work on the farm.'], answer: 'C' },
 { id: '2024-06-S1-Q13', question: 'What is the man still looking for?', options: ['A) Bakers.', 'B) Vendors.', 'C) Vegetarians.', 'D) Organisers.'], answer: 'B' },
 { id: '2024-06-S1-Q14', question: 'What does the man say they are getting close to?', options: ['A) The issuing of certificates to vendors.', 'B) The completion of the baking task.', 'C) The festival they are organising.', 'D) The deadline for application.'], answer: 'D' },
 { id: '2024-06-S1-Q15', question: 'What does the man finally ask the woman to remember?', options: ['A) The closing date of submission.', 'B) The website of his company.', 'C) The details of the ceremony.', 'D) The organiser\'s address.'], answer: 'A' },
 ],
 },
 {
 id: '2024-06-S1-SecC-1', year: 2024, month: 6, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2024, 6, 1, 854),
 transcript: `Supporters call it "wild camping"; opponents call it "illegal camping". What both sides accept is that there has been a boom in the past few months, with increasing numbers of visitors pitching their tents on any bit of land they fancy in the UK. In part, this reflects the fact that official campsites have been wholly or partially closed, or are overflowing in a summer when fewer people are going abroad. It is also cheap, at a time when many are worried about what the economic future holds. But it may also be an expression of a desire for going outdoors -- a response to the months of lockdown.
Most of the coverage of the boom in wild camping has been negative. Camping in public parks has now been banned for August and the early part of September because campers dump litter, human waste, and even their tents on the grassland. Similar action has been taken even in Scotland, where camping is usually permitted on most of its open land.
Clearly there have to be rules. It would make sense that wild campers need to ask for permission to camp from landowners, especially outside Scotland, where the law is far more restrictive. It would be common sense for people to use small tents and leave no trace of their visit. They have been attracted by a patch of land this close to wilderness, and it is their responsibility to keep it that way.`,
 questions: [
 { id: '2024-06-S1-Q16', question: 'Why has wild camping become more popular recently?', options: ['A) Most scenic sites have been closed.', 'B) Access to official campsites is limited.', 'C) Health experts advise going outdoors.', 'D) People have more time during the summer.'], answer: 'B' },
 { id: '2024-06-S1-Q17', question: 'What does the passage say about wild camping?', options: ['A) It is strongly opposed by nearby residents.', 'B) It leads to much waste of public money.', 'C) It has caused environmental concerns.', 'D) It has created conflicts among campers.'], answer: 'C' },
 { id: '2024-06-S1-Q18', question: 'What does the passage advise campers to do?', options: ['A) Look for open land in Scotland.', 'B) Leave no trace of their camping.', 'C) Avoid getting close to wilderness.', 'D) Ask for permission from authorities.'], answer: 'B' },
 ],
 },
 {
 id: '2024-06-S1-SecC-2', year: 2024, month: 6, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2024, 6, 1, 1018),
 transcript: `Imagine boating down the Amazon River, minding your own business -- calmly keeping an eye out for alarmingly large snakes -- and a curious pink dolphin appears to swim alongside. While this may seem like a mythical creature, pink dolphins do exist in the Amazon region.
The Amazon river dolphin is a giant among its species. It can measure up to 2 meters long and weigh around 204 kilograms. Size isn't the only thing that sets the Amazon river dolphin apart. Thriving in South American rivers and temporary lakes caused by seasonal flooding, this freshwater dolphin is sometimes shockingly pink.
Although born gray, males of the species are easily identified as they enter adulthood by a decisive pink shade. Their unusual coloring is believed to be the result of scar tissue from dolphin fights -- whether playfighting or a serious bid for a mate. The deeper the pink, the more attractive the males are believed to be, and the older the male, the more pink it will have.
There's also a theory that this color helps the dolphins more readily blend in with their surroundings. During heavy rains, rivers along the Amazon rainforest turn a pink shade, and with it male dolphins are harder to detect. The Amazon wetland system, fed by the Amazon River, is a crucial place for pink dolphins to breed, and since 2018 has been granted internationally protected status.`,
 questions: [
 { id: '2024-06-S1-Q19', question: 'What does the passage say about Amazon river dolphins?', options: ['A) They outcompete mythical creatures.', 'B) They usually mind their own business.', 'C) They truly exist in the Amazon region.', 'D) They resemble alarmingly large snakes.'], answer: 'C' },
 { id: '2024-06-S1-Q20', question: 'What causes the pink color of the dolphins?', options: ['A) Scar tissue from dolphins\' fighting.', 'B) Skin infection from water pollution.', 'C) Unhealed wounds from snake bites.', 'D) Swimming along in seasonal floods.'], answer: 'A' },
 { id: '2024-06-S1-Q21', question: 'What does the passage say about the Amazon river?', options: ['A) It has been shrinking at an astonishing pace.', 'B) It has been placed under international protection.', 'C) It has been appealing to both freshwater and sea dolphins.', 'D) It has been abandoned as a battleground for male dolphins.'], answer: 'B' },
 ],
 },
 {
 id: '2024-06-S1-SecC-3', year: 2024, month: 6, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2024, 6, 1, 1192),
 transcript: `In a new Merrill Lynch/Age Wave survey, a full 70% of the early adults said they received financial support from their parents in the past year and 58% said they couldn't afford their current lifestyles without it. The most common types of financial support include cell phone plans, food, school costs and car expenses. Parental financial support of early adults, said Ken Dychtwald, CEO of Age Wave, is "the new normal".
But 64% of the young adults surveyed said parents' financial support to children age 25 to 34 is "a bad thing", because it makes those kids dependent. By contrast, only 29% thought supporting men and women age 18 to 24 is bad; the remaining 71% thought that assistance "helps the adult children get ahead".
Dychtwald believes the young women and men surveyed were saying that by 25, younger adults ought to be financially independent. In fact, the respondents said, financial independence defines adulthood. "Financial independence is something they were struggling with and challenged by. And it scared them a bit," Dychtwald said. One big reason they're struggling is attributed to college loans, of which the average amounts to $37,000. Many of the parents have taken on college loans for the kids, too, sometimes at the expense of their own finances. In the survey, 60% of early adults define financial success as being debt-free. Whether that's likely, or even possible, anytime soon, is anyone's guess.`,
 questions: [
 { id: '2024-06-S1-Q22', question: 'What is the finding of a recent survey?', options: ['A) About 58% of young adults call parental support the new normal.', 'B) Most adult children enjoy increasing sources of financial support.', 'C) A full 70% of the young adults cannot afford to buy a car by themselves.', 'D) Most early adults cannot sustain their lifestyles without parental support.'], answer: 'D' },
 { id: '2024-06-S1-Q23', question: 'What does the passage say about parental support?', options: ['A) It renders them dependent.', 'B) It causes them to lose dignity.', 'C) It makes them mentally immature.', 'D) It hinders them from getting ahead.'], answer: 'A' },
 { id: '2024-06-S1-Q24', question: 'What does the passage say about financial independence?', options: ['A) It challenges one\'s willpower.', 'B) It results from education.', 'C) It calls for due assistance.', 'D) It defines adulthood.'], answer: 'D' },
 { id: '2024-06-S1-Q25', question: 'What is the major obstacle to young adults\' financial independence?', options: ['A) Current lifestyles.', 'B) Poor budgeting.', 'C) College loans.', 'D) Emergency expenses.'], answer: 'B' },
 ],
 },

 // ================================================================
 // 2024年6月 第2套
 // ================================================================
 {
 id: '2024-06-S2-SecA-1', year: 2024, month: 6, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2024, 6, 2, 37),
 transcript: `A JetBlue Airlines flight from West Palm Beach to New York City was forced to turn around and land Sunday morning after the plane struck a bird. The flight from Palm Beach International Airport to LaGuardia Airport turned around just minutes after takeoff following the strike. No injuries were reported on the plane, and the flight took off once again, 7.5 hours after the first attempt. "It was like a split second of panic that resulted in this nervous reaction on the plane," said passenger Brian Healy, "there was total quiet. And then there was relief when the plane came to a stop."`,
 questions: [
 { id: '2024-06-S2-Q1', question: 'What do we learn about the JetBlue Airlines flight?', options: ['A) It hit a bird shortly after takeoff.', 'B) It suffered a lot of damage.', 'C) It was forced to fly back to LaGuardia.', 'D) It had to make an emergency landing in West Palm Beach.'], answer: 'A' },
 { id: '2024-06-S2-Q2', question: 'How did the passengers feel when the plane came to a stop?', options: ['A) Panicked.', 'B) Nervous.', 'C) Relieved.', 'D) Shocked.'], answer: 'C' },
 ],
 },
 {
 id: '2024-06-S2-SecA-2', year: 2024, month: 6, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2024, 6, 2, 147),
 transcript: `A deadly snake, which had finally been tracked down after escaping a zoo, has slipped away for the second time. The poisonous snake forced the closure of the attraction last week when staff noticed the disappearance. After six days of desperate searching, he was eventually found and placed in a supposedly secure area. But it seems the animal is no fan of the zoo, because yet again, he is out on the loose. The snake is a relative newcomer to the zoo, but has already been frustrating its staff.`,
 questions: [
 { id: '2024-06-S2-Q3', question: 'What do we learn about the deadly snake from the news report?', options: ['A) It was found in a secure area of the zoo.', 'B) It has escaped the zoo once again.', 'C) It was caught after six days of searching.', 'D) It has been taken to an animal hospital.'], answer: 'B' },
 { id: '2024-06-S2-Q4', question: 'How have the zoo staff been feeling about the snake?', options: ['A) Frightened.', 'B) Curious.', 'C) Confused.', 'D) Frustrated.'], answer: 'D' },
 ],
 },
 {
 id: '2024-06-S2-SecA-3', year: 2024, month: 6, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2024, 6, 2, 262),
 transcript: `Electric bikes have been the craze in downtown Jacksonville since they were first introduced earlier this month as a one-year pilot program, but they're leading to safety concerns, mainly at night when some riders don't follow the rules of the road. Electric bike riders have to follow all the same rules as you would if you were in an automobile — no running red lights or traveling in the opposite direction of traffic on one-way streets. City Council Member Anna Cumber was instrumental in introducing the electric bikes as a way to bring new life into downtown.`,
 questions: [
 { id: '2024-06-S2-Q5', question: 'What do we learn about the introduction of electric bikes in Jacksonville?', options: ['A) It has proved to be a great success.', 'B) It has been warmly received by citizens.', 'C) It has brought increasing complaints.', 'D) It is giving rise to safety concerns.'], answer: 'D' },
 { id: '2024-06-S2-Q6', question: 'What are electric bike riders supposed to do?', options: ['A) Ride only on designated bike lanes.', 'B) Wear a helmet while riding at night.', 'C) Follow all the traffic rules drivers do.', 'D) Avoid riding on one-way streets.'], answer: 'C' },
 { id: '2024-06-S2-Q7', question: 'Why did Anna Cumber advocate the introduction of electric bikes?', options: ['A) To reduce air pollution.', 'B) To bring new life into the city.', 'C) To provide more exercise options.', 'D) To attract more tourists to the area.'], answer: 'B' },
 ],
 },
 {
 id: '2024-06-S2-SecB-1', year: 2024, month: 6, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2024, 6, 2, 442),
 transcript: `M: What's the best way to teach children how to save and spend their money?\nW: You should make money a regular topic of discussion. It's best to start young.\nM: In our family, we talk openly about things like the budget for holidays, how taxes reduce your income, and how to shop around for the best deals.\nW: Indeed. It's also essential to make money real for children through practical examples. Working out how much we save using discount pizza coupons, for example, is much more relevant than abstract sums.\nM: We also give our kids pocket money, and the amount they get is linked to chores, such as putting the bins out and emptying the dishwasher.\nW: We do that too, and it's paid according to their age.\nM: Teaching them to save is important. We opened a savings account when they were young.\nW: I am always talking to my elder daughter about the importance of saving into a pension. She's just started a part-time job and was thinking of not contributing. Luckily, I managed to persuade her otherwise.`,
 questions: [
 { id: '2024-06-S2-Q8', question: 'What should we do with the topic of money according to the woman?', options: ['A) Avoid it in front of children.', 'B) Let children learn by themselves.', 'C) Teach it only to teenagers.', 'D) Discuss it regularly.'], answer: 'D' },
 { id: '2024-06-S2-Q9', question: 'How does the woman say money can be made real for children?', options: ['A) By giving them pocket money.', 'B) By opening a savings account.', 'C) By citing concrete examples.', 'D) By teaching abstract concepts.'], answer: 'C' },
 { id: '2024-06-S2-Q10', question: 'What is the common practice between the man and the woman?', options: ['A) Putting kids\' money in a savings account.', 'B) Teaching kids about taxes early.', 'C) Giving kids an allowance based on age.', 'D) Paying their kids to help with housework.'], answer: 'D' },
 { id: '2024-06-S2-Q11', question: 'What is the woman always talking about to her elder daughter?', options: ['A) The necessity of saving into a pension.', 'B) The importance of getting a part-time job.', 'C) The wisdom of doing holiday budgets.', 'D) The danger of using discount coupons.'], answer: 'A' },
 ],
 },
 {
 id: '2024-06-S2-SecB-2', year: 2024, month: 6, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2024, 6, 2, 633),
 transcript: `W: Welcome to Books in Review. Our guest today is John Banks, author of the bestselling new book, Rewarding Success.\nM: Glad to be here, Jane.\nW: You're an economist and spent two decades teaching at universities?\nM: I spent 25 years as a professor, actually. And then, for the last 10 years, I've worked as a political consultant.\nW: You discuss three problems in the book — improving public education, reducing healthcare burden, and increasing personal savings. But your ideas about education are the most controversial.\nM: Absolutely. A lot of people think I'm trying to punish students who aren't doing well, when actually my goal is to give all students more incentive to succeed.\nW: Another criticism is the cash rewards themselves. Where will the money come from?\nM: If students do better, we'll spend less on schooling. So in the end, the rewards will pay for themselves.\nW: What about now? How will we fund the rewards in the meantime?\nM: Well, by increasing taxes or moving money from other areas of the budget into education.`,
 questions: [
 { id: '2024-06-S2-Q12', question: 'What do we learn about the man?', options: ['A) He has written several bestselling books.', 'B) He has 25 years of teaching experience and 10 years as a political consultant.', 'C) He was an economist before becoming a professor.', 'D) He spent two decades working as a political consultant.'], answer: 'B' },
 { id: '2024-06-S2-Q13', question: 'What does the woman say is the most controversial?', options: ['A) The man\'s proposal to raise taxes.', 'B) The man\'s ideas about education.', 'C) The man\'s view on healthcare.', 'D) The man\'s approach to personal savings.'], answer: 'B' },
 { id: '2024-06-S2-Q14', question: 'What does the man say is his real goal?', options: ['A) To punish students who perform poorly.', 'B) To reduce government spending on education.', 'C) To motivate all students to be successful.', 'D) To change the way schools are funded.'], answer: 'C' },
 { id: '2024-06-S2-Q15', question: 'What is one option for funding the proposed rewards?', options: ['A) Raising taxes.', 'B) Cutting healthcare spending.', 'C) Charging students fees.', 'D) Reducing teachers\' salaries.'], answer: 'A' },
 ],
 },
 {
 id: '2024-06-S2-SecC-1', year: 2024, month: 6, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2024, 6, 2, 866),
 transcript: `I met three different people today, and each time, when I asked "how are you," the reply was exactly the same: "I'm busy." Honestly, I hear the same answer from the vast majority of people I meet. So I started to think — guess what? Everybody's busy. I'm busy. You're busy. So I'm launching a campaign to stop people complaining about being busy. It may sound harsh, but the truth is, nobody cares. In a busy world, being busy doesn't stand out, nor does it mean productive, creative, accomplished, or professional. Steve Maraboli once said, "When someone tells you they are too busy, it's not a reflection of their schedule, it's a reflection of your spot on their schedule." So the next time someone asks you how you are, maybe respond differently. In my experience, the "I'm busy" response is really covering up the fact that they're not actually accomplishing their real purpose, and being busy is the lie they tell themselves about why they can't achieve it.`,
 questions: [
 { id: '2024-06-S2-Q16', question: 'Why is the speaker launching a campaign?', options: ['A) To encourage people to work more efficiently.', 'B) To prevent people from complaining about being "busy".', 'C) To help people understand the value of time.', 'D) To teach people how to manage their schedules.'], answer: 'B' },
 { id: '2024-06-S2-Q17', question: 'What does the speaker advise us to do next time?', options: ['A) Avoid saying we are busy.', 'B) Tell people we are productive.', 'C) Explain what we are busy with.', 'D) Respond honestly to any question.'], answer: 'A' },
 { id: '2024-06-S2-Q18', question: 'Why do many people make the "I\'m busy" response according to the speaker?', options: ['A) To show they are important.', 'B) To avoid further conversation.', 'C) To cover up their failure to achieve some purpose.', 'D) To make themselves feel better about working hard.'], answer: 'C' },
 ],
 },
 {
 id: '2024-06-S2-SecC-2', year: 2024, month: 6, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2024, 6, 2, 1032),
 transcript: `It may sound strange to say that the main function of extreme sports is to reduce fear. After all, if you can jump out of a plane or off a bridge, then you can face anything else easily. When doing extreme sports, you have to become more focused. You'll be pushed to your limits, and if you aren't focused, you'll make dangerous mistakes. Learning to be this focused when enjoying extreme sports will help you to be focused at work, keeping you more productive and ultimately more successful. It's great to stay fit and healthy, but standard exercise routines and sports only work the same muscles repeatedly. With extreme sports, you'll be working entirely different muscles, and that means you get an all-over workout. Extreme sports also burn a lot more calories than other sports. Skateboarding, for example, can burn as many as 500 calories per hour.`,
 questions: [
 { id: '2024-06-S2-Q19', question: 'What may sound strange to say about extreme sports?', options: ['A) They will help one reduce fear.', 'B) They can make people more competitive.', 'C) They are more dangerous than people think.', 'D) They require more focus than regular sports.'], answer: 'A' },
 { id: '2024-06-S2-Q20', question: 'Why should one be highly focused when doing extreme sports?', options: ['A) To achieve better performance.', 'B) To enjoy the sports more fully.', 'C) To avoid dangerous mistakes.', 'D) To build up one\'s confidence.'], answer: 'C' },
 { id: '2024-06-S2-Q21', question: 'How can extreme sports benefit us more than standard exercise?', options: ['A) By helping us build up more muscle.', 'B) By burning more calories per hour.', 'C) By improving our mental toughness.', 'D) By enabling us to get an all-over workout.'], answer: 'D' },
 ],
 },
 {
 id: '2024-06-S2-SecC-3', year: 2024, month: 6, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2024, 6, 2, 1209),
 transcript: `Most of us have been in teams or organizations where we've had conflict with the people that we're working with. Conflict is natural. We all bring different life and work experiences to the table. We all have different personality preferences and tendencies. But too often, we get caught in this place where conflict is perceived to be negative — something we want to avoid so that we can maintain the harmony of our workplace. However, this kind of artificial harmony isn't the answer. Productive conflict is a vital part of teams and organizations that want to push forward and do more. Without conflict, we're often stuck in this artificial harmony where people don't express potentially innovative ideas for fear that they may start conflict with others. But if you're in a place where you have a basis of trust, conflict can be extremely productive. It can lead to increased innovation and greater trust on teams.`,
 questions: [
 { id: '2024-06-S2-Q22', question: 'What does the passage say about conflict in organizations?', options: ['A) It is natural.', 'B) It is harmful.', 'C) It should be avoided.', 'D) It is unproductive.'], answer: 'A' },
 { id: '2024-06-S2-Q23', question: 'Why do some people want to avoid conflict at all costs?', options: ['A) To save time and energy.', 'B) To focus on their work.', 'C) To keep their jobs safe.', 'D) To maintain workplace harmony.'], answer: 'D' },
 { id: '2024-06-S2-Q24', question: 'Why is productive conflict important for teams and organizations?', options: ['A) It helps resolve disagreements quickly.', 'B) It stimulates innovative ideas.', 'C) It improves team communication.', 'D) It increases work efficiency.'], answer: 'B' },
 { id: '2024-06-S2-Q25', question: 'What does productive conflict need as a basis?', options: ['A) Clear goals.', 'B) Strong leadership.', 'C) Mutual trust.', 'D) Open communication.'], answer: 'C' },
 ],
 },

 // 注：2023年12月套号已校准，与源docx命名一致（2025-06验证）
 // ================================================================
 // 2023年12月 第2套
 // ================================================================
 {
 id: '2023-12-S2-SecA-1', year: 2023, month: 12, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2023, 12, 2, 41),
 transcript: `A police officer in the U.S. stopped a large SUV car that was going very slowly and drifting across lanes on a highway. He expected to find a driver who was either very drunk or having a medical emergency. Instead, the officer discovered a five-year-old boy sat on the edge of the driver's seat. His feet could barely reach the brake, and his head was only just high enough to see out of the windows. The child had taken the keys to the family car while his teenage sister was napping. He then drove three kilometers across town before getting on the highway. The boy later told confused officers that he was planning to travel to California and buy a Lamborghini sports car. Although he only had 3 dollars in his wallet, at least he was driving in the right direction.`,
 questions: [
 { id: '2023-12-S2-Q1', question: 'Why did the police officer stop the SUV car?', options: ['A) He noticed the driver was too young to drive.', 'B) He found there was no one sitting at the wheel.', 'C) He thought something must be wrong with the driver.', 'D) He saw the driver changing lanes much too frequently.'], answer: 'C' },
 { id: '2023-12-S2-Q2', question: 'What did the boy tell the police officers he was planning to do?', options: ['A) Buy a sports car.', 'B) Leave California.', 'C) Drive across town.', 'D) Visit his sister.'], answer: 'A' },
 ],
 },
 {
 id: '2023-12-S2-SecA-2', year: 2023, month: 12, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2023, 12, 2, 143),
 transcript: `Mobile phones have changed the way we live, how we read, work, communicate, and shop. But we already know this. What we have not yet understood is the way the tiny machines in front of us are changing our skeletons. Possibly altering not just the way we behave but even the very shape of our bodies. New scientific research at the University of the Sunshine Coast in Queensland, Australia suggests that young people are developing extra pieces of bone at the backs of their heads. These pieces of bone are caused by the way people bend their heads when they use the phone. This shifts weight onto the muscles at the back of the head and causes the bone to grow in a way that is not normal. This process can be compared to the way the skin hardens in response to constant rubbing or pressure. The result is a piece of bone like a horn that sticks out from the head by the neck.`,
 questions: [
 { id: '2023-12-S2-Q3', question: 'What does the report say we have not yet understood about mobile phones?', options: ['A) How they change the way we shop.', 'B) How they cause increased headaches.', 'C) How they alter human skeletons.', 'D) How they affect our communication.'], answer: 'C' },
 { id: '2023-12-S2-Q4', question: 'What happens to the skin when rubbed or pressed constantly?', options: ['A) It loosens.', 'B) It hardens.', 'C) It brightens.', 'D) It softens.'], answer: 'B' },
 ],
 },
 {
 id: '2023-12-S2-SecA-3', year: 2023, month: 12, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2023, 12, 2, 261),
 transcript: `A village is going to throw a birthday party for an orange cat named Wilbur, who has become famous for making a regular appearance at local shops. Wilbur has his own internet pages as he approaches his 10th birthday on July 7. Wilbur is both bold and friendly. He spends most of his time in shops and businesses around the village. He'll just take himself into any shop, anywhere. There was one time when the doctor's receptionist came back and he was sitting on her chair. Among his favorite haunts are a local hairdresser, two pubs, and the Nottingham Primary School. Leslie Harper, who runs one of the pubs, said the cat has been a big hit with their customers. "He's been a regular visitor for most of this year," she told the Press Association. "He's a very relaxed cat, happy for customers and villagers young and old to come in and say hello." She also said he is a cat of expensive tastes, who likes his high-priced cat food. Sarah Godfrey, who is organizing Wilbur's party, told the local newspaper, "Wilbur is part of our lives, as he is for everyone who lives in the village."`,
 questions: [
 { id: '2023-12-S2-Q5', question: 'What does the report say the village is going to do for the cat Wilbur?', options: ['A) Create Internet pages for him.', 'B) Name an orange tree after him.', 'C) Ask a local pet shop to adopt him.', 'D) Hold a birthday party for him.'], answer: 'D' },
 { id: '2023-12-S2-Q6', question: 'What do we learn from the report about the cat?', options: ['A) He is a bold and aggressive pet.', 'B) He pays regular visits to village shops.', 'C) He once bit a doctor\'s receptionist.', 'D) He likes to sit on the hairdresser\'s chair.'], answer: 'B' },
 { id: '2023-12-S2-Q7', question: 'What does the pub owner, Leslie Harper, say about the cat?', options: ['A) He is fond of luxury cat food.', 'B) He likes to stay in villagers\' houses.', 'C) He knows everybody in the village.', 'D) He often seeks food around her pub.'], answer: 'A' },
 ],
 },
 {
 id: '2023-12-S2-SecB-1', year: 2023, month: 12, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2023, 12, 2, 441),
 transcript: `M: So, where do you want to go for lunch?\nW: I don't know. Do you have anything in mind?\nM: What about the sandwich place on Camden Street?\nW: Um, no, sorry. I don't feel like sandwiches today. It's a great place, but I think we go there too often.\nM: That's true. Remember, that's where we saw Bridget Clark, the famous movie star.\nW: Of course. How could I ever forget? There were crowds of people around her, asking for a photo with her.\nM: What about hamburgers, then? There's that American style diner on the way to the mall.\nW: I like that place. Their chips are great, but their service takes a long time, and I need to get back by 2:30 for a conference call. How about trying something new? We could try Mario's, the new Italian restaurant on the corner. It looks alright. Have you been there?\nM: No, I haven't, but I've noticed that it has great reviews on the internet. It's supposed to be one of the best Italians in town. I think Jeremy has been there and said it was amazing. I'm up for that.\nW: Cool. Have you asked Jeremy if he would like to come with us?\nM: I already have. He says he can't. He has brought his own lunch today, so he will stay in. I think his wife made him soup.\nW: Poor Jeremy. His wife is a terrible cook. He should throw that soup in the bin and join us.`,
 questions: [
 { id: '2023-12-S2-Q8', question: 'What are the speakers talking about in this conversation?', options: ['A) Who to order the food.', 'B) Whether to have sandwiches.', 'C) When to go for their meal.', 'D) Where to have their lunch.'], answer: 'D' },
 { id: '2023-12-S2-Q9', question: 'Where did the speakers see Bridget Clark, the famous movie star?', options: ['A) In the shopping center nearby.', 'B) In the expensive Italian style diner.', 'C) At the sandwich place on Camden Street.', 'D) At the American restaurant they frequent.'], answer: 'C' },
 { id: '2023-12-S2-Q10', question: 'Why does the woman say she needs to get back by 2:30?', options: ['A) There is to be a conference call.', 'B) She has to meet with her boss then.', 'C) There will be crowds of people waiting for her.', 'D) She will have a photo taken with Bridget Clark.'], answer: 'A' },
 { id: '2023-12-S2-Q11', question: 'Why does the woman say Jeremy should throw his soup in the bin?', options: ['A) She doesn\'t deem homemade soup tasty.', 'B) She doesn\'t think his wife cooks well.', 'C) She feels Jeremy would rather dine out.', 'D) She has found the soup smells terrible.'], answer: 'B' },
 ],
 },
 {
 id: '2023-12-S2-SecB-2', year: 2023, month: 12, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2023, 12, 2, 613),
 transcript: `W: Hi there, how are you today? Do you have a reservation with us already?\nM: Good afternoon. Yes, we reserved our rooms yesterday morning on your website for three nights. The name's Patterson.\nW: Okay, let me have a look. Yes, we have it here. You brought the whole family with you, I see.\nM: Yes, the two kids, my wife and I, and her parents too.\nW: Great. So, we have a family room for you and your wife and the kids. And another double room for your parents-in-law. They are right next to each other on the ground floor, since you mentioned in your message that they have trouble with stairs.\nM: That's wonderful. My father-in-law has had terrible problems getting up and down stairs since his knee operation last April.\nW: I'm sorry to hear that, and if you need any help to find transportation for the whole family, we can definitely recommend someone for you.\nM: We were thinking of renting a car, but we will explore all the options available for sure. So yes, that would be very helpful in comparing prices. We're also wondering what tours and day trips are available.\nW: We have bunches of brochures here. I would recommend getting out on a boat trip. The kids will love it, and there are so many islands nearby to explore. There's also a great night market further into town that has all kinds of food and cool little shops selling souvenirs and local jewelry and clothing made by hand.\nM: That all sounds marvelous.\nW: Now, all I need is to photocopy your passports, and then I can get you all checked in and show you to your rooms.`,
 questions: [
 { id: '2023-12-S2-Q12', question: 'Who is the man talking to in the conversation?', options: ['A) A landlady.', 'B) A waitress.', 'C) A receptionist.', 'D) A saleswoman.'], answer: 'C' },
 { id: '2023-12-S2-Q13', question: 'What do we learn about the man\'s father-in-law from the conversation?', options: ['A) He was involved in a terrible car accident last April.', 'B) He has much difficulty getting up and down stairs.', 'C) He is expected to undergo a knee operation.', 'D) He prefers to stay next door to the children.'], answer: 'B' },
 { id: '2023-12-S2-Q14', question: 'Why does the man say they will explore all the options available?', options: ['A) To please his parents-in-law.', 'B) To find the best trip for his kids.', 'C) To satisfy his curiosity.', 'D) To compare prices.'], answer: 'D' },
 { id: '2023-12-S2-Q15', question: 'What does the woman suggest the man and his family do close to the end of the conversation?', options: ['A) Visit a local art gallery.', 'B) Go on a boat trip.', 'C) Take some photos of the islands.', 'D) Try her hand-made clothing.'], answer: 'B' },
 ],
 },
 {
 id: '2023-12-S2-SecC-1', year: 2023, month: 12, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2023, 12, 2, 833),
 transcript: `Artificial intelligence agents play ever more influential roles in our lives. They do everything from suggesting new friends to recommending purchases. They're even beginning to drive our cars. Another role that they are expected to take over is negotiating on our behalf in commercial transactions or legal disputes. So, it's important to know whether using an artificial intelligence agent might affect how we negotiate. Research indicates that it does. In a new study, participants were told to imagine that they were negotiating for something important to them, like a house. Next, they were told either that they would negotiate for themselves, or they would program an artificial intelligence agent to negotiate for them. Participants then completed a survey indicating how tough, deceptive, and pleasant or otherwise they wanted to be, or wanted their agent to be, in the negotiations. For example, participants could choose to be tough by making an opening demand far greater than what they'd be willing to accept. They could also choose to express sympathy with their opponent, to appear pleasant. But they could also indicate that they, or their agent, would strategically express anger toward the opponent to gain advantage, or they could opt to convey dissatisfaction with the encounter so that the other party would think they were losing interest. These are both examples of deceptive strategies. Participants were more willing to employ deceptive strategies when assigned an agent to negotiate on their behalf.`,
 questions: [
 { id: '2023-12-S2-Q16', question: 'What does the passage say about artificial intelligence agents?', options: ['A) They are more intelligent than many of us.', 'B) They have already become our new friends.', 'C) They have begun to affect our social behavior.', 'D) They play increasingly more important roles.'], answer: 'D' },
 { id: '2023-12-S2-Q17', question: 'What does the new study want to find out about using an artificial intelligence agent?', options: ['A) Whether it might have any effect on the way we negotiate.', 'B) Whether it might actually outperform human negotiators.', 'C) Whether it can facilitate business transactions.', 'D) Whether it can speed up legal procedures.'], answer: 'A' },
 { id: '2023-12-S2-Q18', question: 'What did participants tend to do when assigned an AI agent to negotiate on their behalf?', options: ['A) Choose to be tough.', 'B) Sympathize with their opponent.', 'C) Use deceptive strategies.', 'D) Appear to be pleasant.'], answer: 'C' },
 ],
 },
 {
 id: '2023-12-S2-SecC-2', year: 2023, month: 12, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2023, 12, 2, 1014),
 transcript: `New research has studied the effects of a seven-week healthy cooking course. Academics measured the program's effect on cooking confidence and self-perceived mental health. Researchers also measured participants' overall satisfaction around cooking and diet-related behaviors. Course participants saw significant improvements in general health. They also reported improved mental health and subjective vitality immediately after the program. These benefits remained six months after the completion of the course. What caused these improvements? Researchers have previously found a link between eating more fruits and vegetables and improved longer-term mental health. This would imply that the participants in the current study may have felt better due to improved diet. However, the study showed participants' mental health improved even if their reported diet did not change after completing the program. Also, the mental health benefits were equal among participants who were overweight or obese and those in a healthy weight range. This suggests a link between cooking confidence and satisfaction around cooking and mental health benefits. Who benefits most from learning to cook? Gender plays a part. At the start of the program, 77 percent of female participants were confident about cooking, but just 23 percent of males were confident. At the end of the program, cooking confidence and skills were equal across both counterparts. This change in confidence could lead to a gender balance in home cooking. This, in turn, could reduce consumption of unhealthy, high-calorie processed meals.`,
 questions: [
 { id: '2023-12-S2-Q19', question: 'What do we learn about the benefits the participants gained from the healthy cooking course?', options: ['A) They were perceived differently by some academics.', 'B) They still existed six months after the course ended.', 'C) They varied greatly among the course participants.', 'D) They were only measurable within seven weeks.'], answer: 'B' },
 { id: '2023-12-S2-Q20', question: 'What do the new research findings suggest about mental health benefits?', options: ['A) They can be easily seen among participants in a healthy weight range.', 'B) They should be attributed to participants\' change in diet behaviors.', 'C) They are linked to cooking confidence and cooking satisfaction.', 'D) They actually result from eating more fruits and vegetables.'], answer: 'C' },
 { id: '2023-12-S2-Q21', question: 'What plays a role in determining who benefits most from learning to cook?', options: ['A) Gender.', 'B) Health.', 'C) Confidence.', 'D) Age.'], answer: 'A' },
 ],
 },
 {
 id: '2023-12-S2-SecC-3', year: 2023, month: 12, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2023, 12, 2, 1200),
 transcript: `What is personal space? We often think of it as an invisible bubble of space surrounding us that others can't enter without causing discomfort. Research shows, however, that we actually have bubbles of different sizes. Each of these bubbles applies to a different set of people. The smallest zone, called intimate space, extends outward from our bodies 18 inches in every direction. Only family, pets and one's closest friends may enter it. A mere acquaintance entering our intimate space makes us uncomfortable. Next is the bubble called personal space, extending from 1.5 feet to 4 feet away. Friends and acquaintances can comfortably occupy this zone, especially during informal conversations, but strangers are forbidden. Extending from 4 to 12 feet away from us is social space. Here, people feel comfortable conducting routine social interactions with new acquaintances or total strangers. Those are the average sizes of Americans' personal bubbles, anyway. It is important to keep in mind that personal space varies depending on culture and context. Furthermore, there are significant individual differences. As we all know, cultural or individual differences in personal bubble diameters are all too often the cause of discomfort. How did these personal bubbles arise? According to research, we begin to develop our individual sense of personal space around age 3 or 4. The sizes of our bubbles are fixed by our teens. These bubbles are constructed and monitored by the brain region involved in fear.`,
 questions: [
 { id: '2023-12-S2-Q22', question: 'What does research show about our personal space?', options: ['A) It is culturally determined.', 'B) It is uniquely personal.', 'C) It is physically tangible.', 'D) It varies in size.'], answer: 'D' },
 { id: '2023-12-S2-Q23', question: 'What happens if a mere acquaintance enters our intimate space?', options: ['A) It makes us feel uncomfortable.', 'B) It makes us become angry.', 'C) It makes us want to leave.', 'D) It makes us feel indifferent.'], answer: 'A' },
 { id: '2023-12-S2-Q24', question: 'Where do people feel comfortable interacting with new acquaintances or strangers?', options: ['A) In social space.', 'B) In intimate space.', 'C) In public space.', 'D) In private space.'], answer: 'A' },
 { id: '2023-12-S2-Q25', question: 'When are the sizes of our bubbles fixed?', options: ['A) Around age 3 or 4.', 'B) In early childhood.', 'C) By adulthood.', 'D) By our teens.'], answer: 'D' },
 ],
 },

 // ================================================================
 // 2023年12月 第1套
 // ================================================================
 {
 id: '2023-12-S1-SecA-1', year: 2023, month: 12, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2023, 12, 1, 41),
 transcript: `Have you noticed how similar you are to your friends? It may be because your brains operate in harmony with each other. We know that friends are more likely to be the same age, gender, and ethnic background as each other. Now it seems their brains are alike too. Researchers at the University of California scanned 42 classmates while they watched videos intended to provoke varying responses. Some people might find a romantic scene touching, for instance, while others would feel it was embarrassing. The activity of friends' brains was more similar than that of people who didn't know each other, particularly in regions involved in attention, emotion, and language. This similarity was strong enough that it could be used to predict whether two people were already friends or not. The relationship probably goes two ways. We are drawn to people who think like us. We then influence their thoughts over time, which may push their brain activity into more closely resembling our own.`,
 questions: [
 { id: '2023-12-S1-Q1', question: 'What may be the reason that friends are similar to each other, according to the recent research?', options: ['A) Their interests are quite similar.', 'B) They are generally the same age.', 'C) Their brains work in harmony.', 'D) They have the same ethnic background.'], answer: 'C' },
 { id: '2023-12-S1-Q2', question: 'What does the news report say about the relationship between friends?', options: ['A) It can work both ways.', 'B) It can be touching.', 'C) It is hard to predict.', 'D) It resembles family ties.'], answer: 'A' },
 ],
 },
 {
 id: '2023-12-S1-SecA-2', year: 2023, month: 12, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2023, 12, 1, 166),
 transcript: `Two men who have been best friends for 60 years have just realized they are actually brothers. It's reported that Alan Robinson and Walter McDonald met in the 6th grade at a school in Hawaii. They have been best friends ever since. Alan was given away for adoption soon after he was born, and Walter never knew his father. So recently, they made separate attempts on DNA matching websites to discover more about their ancestry. Walter was astonished to find that he matched with website user Robbie737. He knew immediately that this was his best friend, Alan, whose friends call him Robbie, and flew 737 airplanes when he was a pilot. The pair were born to the same mother 15 months apart.`,
 questions: [
 { id: '2023-12-S1-Q3', question: 'What did both Alan Robinson and Walter McDonald attempt to do on DNA matching websites?', options: ['A) Identify their biological fathers.', 'B) Search for their half-brothers.', 'C) See whether they are actually related.', 'D) Find out more about their ancestry.'], answer: 'D' },
 { id: '2023-12-S1-Q4', question: 'What did the news report say about Alan Robinson and Walter McDonald?', options: ['A) They were both 60 years of age.', 'B) They were born to the same mother.', 'C) They flew 737 airplanes as pilots.', 'D) They were both given up for adoption.'], answer: 'B' },
 ],
 },
 {
 id: '2023-12-S1-SecA-3', year: 2023, month: 12, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2023, 12, 1, 276),
 transcript: `Amid all the election drama, air pollution problems and disease outbreaks, five tourists' good work is being spread online. Yesterday, 2 male and 3 female tourists were spotted walking the kilometer-long beach, picking up trash. One of the male tourists from Australia commented that although there was a lot of trash, nobody was doing anything. The beach was not as nice or beautiful as it should be. He felt so sad to see such a gorgeous place littered with so much trash. Thus, he and his friends decided to grab a few trash bags and clean it all up. A man passing by decided to video their good deed and put it on the internet. It was unclear where the rest of the group was from, but they were most likely traveling together. One local woman commented on being embarrassed that tourists were cleaning up their beach. Another mentioned that it was actually the natives who brought food and drinks, then left trash all along the island.`,
 questions: [
 { id: '2023-12-S1-Q5', question: 'Why did one of the male tourists feel sad?', options: ['A) The kilometer-long beach was practically deserted.', 'B) The beautiful beach was spoiled with lots of trash.', 'C) Other tourists refused to join in the cleanup.', 'D) One of his friends was caught littering.'], answer: 'B' },
 { id: '2023-12-S1-Q6', question: 'Who put the good deed video on the internet?', options: ['A) The beach authorities.', 'B) One of the five tourists.', 'C) A passerby.', 'D) A local woman.'], answer: 'C' },
 { id: '2023-12-S1-Q7', question: 'Why did one local woman say she was embarrassed?', options: ['A) It was tourists not natives who were cleaning up the beach.', 'B) The number of tourists to the beach is on a steady decline.', 'C) Some natives were selling poor-quality food to tourists.', 'D) The tourists\' good deed was not noticed by the locals.'], answer: 'A' },
 ],
 },
 {
 id: '2023-12-S1-SecB-1', year: 2023, month: 12, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2023, 12, 1, 439),
 transcript: `W: Hello Benjamin, Dan and I will be going for a run along the canal Saturday morning. Would you like to join us?\nM: I'd love to, but I hurt my ankle last weekend playing football with work colleagues.\nW: Oh dear, is it serious?\nM: No, not at all. I landed badly during a fall and twisted it a little, but it's no big deal. It's just a little swollen and I should be fine for next Saturday if you still want to go for a jog then.\nW: I won't be here next Saturday. I'm going to the zoo.\nM: The zoo?\nW: Yeah. My little nephew turns six, and he loves the zoo. So the whole family is going.\nM: Oh, okay then. I haven't been to a zoo since I was a kid.\nW: They are nowhere near as popular as they used to be when we were children. I personally feel sorry for the poor animals stuck in cages. But there's no denying they are fun and educational for children.\nM: Do you know if Dan will be around next Saturday?\nW: Yeah, I think he will. Just send him a text message. He's always keen on physical activities.\nM: That's true. Dan is extremely fit and healthy. He goes to the gym most days, plus tennis two or three times a week.\nW: So, what have you been doing to stay busy while you've had that swollen ankle?\nM: I've been catching up on some reading. I was given three books over Christmas, and I'm only now getting around to reading them.`,
 questions: [
 { id: '2023-12-S1-Q8', question: 'Why can\'t the man go for a run Saturday morning?', options: ['A) He has to play football with workmates.', 'B) He has got some books to read.', 'C) He is going to visit a friend.', 'D) He is physically unfit for it.'], answer: 'D' },
 { id: '2023-12-S1-Q9', question: 'Why is the woman\'s whole family going to the zoo next Saturday?', options: ['A) To teach kids about animal protection.', 'B) To learn how popular zoos could be.', 'C) To see some rare animals in cages.', 'D) To give her little nephew a treat.'], answer: 'D' },
 { id: '2023-12-S1-Q10', question: 'What do we learn about Dan from the man\'s description?', options: ['A) He enjoys excellent health.', 'B) He is keen on extreme sports.', 'C) He coaches tennis players every week.', 'D) He spends most of his time in the gym.'], answer: 'A' },
 { id: '2023-12-S1-Q11', question: 'What has the man been doing since last weekend?', options: ['A) Tending to his swollen ankle.', 'B) Concentrating on reading.', 'C) Writing three book reports.', 'D) Planning Christmas celebrations.'], answer: 'B' },
 ],
 },
 {
 id: '2023-12-S1-SecB-2', year: 2023, month: 12, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2023, 12, 1, 612),
 transcript: `W: Our guest on today's book talk is John Black, the author of the new bestseller, Retire Early.\nM: Thanks for having me on the show, Lisa.\nW: John, your book is getting a lot of attention, partly because you write that most people can retire by 40. Is that realistic?\nM: Definitely. When researching this book, I interviewed hundreds of people who retired by 40.\nW: Okay, but how much money does a person need to retire? I've read articles recommending one million dollars as a good figure for retirement.\nM: While most financial planners do give numbers, I don't think that's useful, as people are living in different areas with different costs of living, and have different needs and wants, which is why I suggest that people aim for financial independence.\nW: What do you mean by financial independence?\nM: Having investment income that's greater than monthly expenses.\nW: That sounds risky to me. What if an accident happens? Or you get ill and need medical treatment? Shouldn't people have extra cash for emergencies?\nM: Too many people spend their lives working on jobs they hate because they're afraid. So I counsel people to take risks. Retirement doesn't have to be permanent, and if people need to, they can go back to work.\nW: But it's not always easy to get back into the workforce after an extended absence.\nM: True, but if you keep current with your skills, you will be attractive to employers.\nW: Maybe, but how can anyone save enough to retire by 40 when most people can't retire at 60?\nM: Simple, by cutting housing, food, and transport expenses and investing half your monthly income.\nW: That sounds impossible.\nM: I admit it's difficult, but it has worked for thousands.`,
 questions: [
 { id: '2023-12-S1-Q12', question: 'What do we learn about the man\'s book published recently?', options: ['A) It is being debated by hundreds of retirees.', 'B) It is attracting many people\'s attention.', 'C) It partly records his own experience.', 'D) It argues for postponing retirement.'], answer: 'B' },
 { id: '2023-12-S1-Q13', question: 'What do the articles the woman read recommend?', options: ['A) One should foresee a financial crisis.', 'B) One should trust financial planners\' figures.', 'C) One should have one million dollars to retire.', 'D) One should start saving as early as possible.'], answer: 'C' },
 { id: '2023-12-S1-Q14', question: 'What does the man say about retirement?', options: ['A) It doesn\'t need to be permanent.', 'B) It shouldn\'t be considered risky.', 'C) It helps to reduce travel expenses.', 'D) It is the way to quit a job one hates.'], answer: 'A' },
 { id: '2023-12-S1-Q15', question: 'How does the man say his proposal about retirement can be carried out?', options: ['A) By keeping close contact with one\'s employers.', 'B) By following the counsel of financial planners.', 'C) By retiring when one reaches sixty years old.', 'D) By investing half of one\'s monthly income.'], answer: 'D' },
 ],
 },
 {
 id: '2023-12-S1-SecC-1', year: 2023, month: 12, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2023, 12, 1, 846),
 transcript: `New research from America studies the role that the presence of individuals from different social or racial groups has in influencing consumers' food choices. This research found college students were more likely to choose healthy food in the presence of an observer of a different race, as opposed to an observer from their own race. The same was true when they were with someone from a different university compared to someone from their own. Researchers say this was because participants anticipated more negative judgment from an outsider group. In contrast, they felt less judged by members of their own group. In one experiment, participants were offered the choice between candy and fruit as a snack. When in the presence of an unknown student from their own university, only 12% of students selected the healthier option. However, this number was 31% when in the presence of an unknown student from another university. Other experiments showed similar results based on racial group. What's the reason for this pattern? The study found that people feel judged to a larger extent by members of other groups. Because of this, they strategically use healthy food choices to make a positive impression. There have been many attempts to help consumers make healthier choices, but consumers often struggle to maintain a healthy diet. This research finds that one way to promote a healthy diet could be to advertise the social benefits of healthy choices.`,
 questions: [
 { id: '2023-12-S1-Q16', question: 'What was the finding of the new research from America about consumers\' food choices?', options: ['A) They tended to be arbitrarily judged by individuals of opposing groups.', 'B) They tended to be easily anticipated by those belonging to their own race.', 'C) They were influenced by the presence of someone from an outsider group.', 'D) They were readily shared among members of the same social or racial group.'], answer: 'C' },
 { id: '2023-12-S1-Q17', question: 'When did 31% of students in the experiment select the healthier option?', options: ['A) When an unknown student from another university was present.', 'B) When an experimenter from the research team took notice.', 'C) When they were offered both candy and fruit as a snack.', 'D) When they tried to make a positive impression on the researchers.'], answer: 'A' },
 { id: '2023-12-S1-Q18', question: 'How could a healthy diet be promoted according to the findings of the new research?', options: ['A) By maintaining its positive image.', 'B) By advertising its social benefits.', 'C) By supporting struggling consumers.', 'D) By teaching consumers diet strategies.'], answer: 'B' },
 ],
 },
 {
 id: '2023-12-S1-SecC-2', year: 2023, month: 12, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2023, 12, 1, 1025),
 transcript: `For college students under pressure, a dog may be the best stress fighter around, according to the finding of a recent study. "It's a really powerful finding," said Patricia Pendry, who led the study. "Universities are doing a lot of great work trying to help students succeed academically, especially those who may be at risk due to a history of mental health issues or academic and learning issues." This study shows that traditional stress management approaches aren't as effective for this population compared with programs that focus on providing opportunities to interact with therapy dogs. The researchers measured executive functioning in the students involved in the study. Executive function is a term for the skills one needs to plan, organize, motivate, concentrate, and memorize. These are skills students need to succeed in college. The research has found that students who were most at risk had the most improvements in executive functioning after interacting with therapy dogs. These results remained when researchers followed up six weeks later. Many universities provide academic stress management programs and workshops. These are traditionally very similar to college classes. They often talk about ways to get more sleep, set goals, or manage stress or anxiety. Pendry acknowledges that these are really important topics and these workshops help typical students succeed. But they're less helpful for struggling students. Pendry believes those students may experience the programs as another lecture and feel even more stressed.`,
 questions: [
 { id: '2023-12-S1-Q19', question: 'What does the recent study led by Patricia Pendry aim to examine?', options: ['A) The academic and learning issues struggling students encounter.', 'B) The risk students face due to a history of mental health problems.', 'C) The work universities are doing to help students succeed academically.', 'D) The effect of interacting with therapy dogs on students under pressure.'], answer: 'D' },
 { id: '2023-12-S1-Q20', question: 'What did the new study measure in the participants?', options: ['A) Their executive functioning.', 'B) Their communicative skills.', 'C) Their academic networking.', 'D) Their leadership capacities.'], answer: 'A' },
 { id: '2023-12-S1-Q21', question: 'What does Patricia Pendry think traditional stress management programs may do?', options: ['A) Rid students of their anxiety.', 'B) Add to some students\' stress.', 'C) Contribute little to typical students\' success.', 'D) Help students with mental issues pull through.'], answer: 'B' },
 ],
 },
 {
 id: '2023-12-S1-SecC-3', year: 2023, month: 12, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2023, 12, 1, 1209),
 transcript: `Taking risks in business does not mean going into business blindly and then expecting great results. On the contrary, taking risks in entrepreneurship involves careful planning and hard work. Nobody can really be sure if risks will be met with success, no matter how calculated they may be. But this should not stop you from taking risks, as risks are necessary if you want your business to succeed. Some risks may not work out, but an optimistic risk taker will always look at failure as an opportunity to learn. The willingness to experiment with new ideas is key to business growth. As the old saying goes, nothing ventured, nothing gained. Failure will teach you how to think and plan strategically. But just remember that not all risks are good ones, and when you fail, learn from it and move forward. Since most people tend to avoid risk, businesses that are brave enough to take risks already have a competitive advantage. They are the ones setting the standard with new ideas, fresh offers and bold inventions. Risk takers are best at adapting in difficult times. Simply put, when most individuals stay away from risk, it means less competition for risk takers. We don't know if you'll achieve what these risk takers have achieved, but for as long as you want to stay safe, and for as long as you are content with where your business is right now, you will never find out.`,
 questions: [
 { id: '2023-12-S1-Q22', question: 'What do entrepreneurs have to do when taking risks according to the passage?', options: ['A) Work hard and plan carefully.', 'B) Attempt to succeed at any cost.', 'C) Aim high and expect great results.', 'D) Remain optimistic even in difficulty.'], answer: 'A' },
 { id: '2023-12-S1-Q23', question: 'What does the passage say is key to business growth?', options: ['A) Regarding failure as something inevitable.', 'B) Trying out innovative marketing strategies.', 'C) Venturing into sectors never explored before.', 'D) Being willing to experiment with novel ideas.'], answer: 'D' },
 { id: '2023-12-S1-Q24', question: 'What are we advised to do when we fail?', options: ['A) Expect future success so as to move forward.', 'B) Learn from our failure and forge ahead.', 'C) Distinguish between good and bad risks.', 'D) Examine our strategies and find out weaknesses.'], answer: 'B' },
 { id: '2023-12-S1-Q25', question: 'What does it mean to risk-taking businesses when most people tend to avoid risk?', options: ['A) Fresher offers.', 'B) Safer operation.', 'C) More challenges.', 'D) Less competition.'], answer: 'D' },
 ],
 },

 // ================================================================
 // 2023年6月 第1套
 // ================================================================
 {
 id: '2023-06-S1-SecA-1', year: 2023, month: 6, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2023, 6, 1, 34),
 transcript: `A woman was charged with allegedly violating a Rhode Island City law against feeding wild animals. The 55-year-old woman's neighbors blamed her for making the area's rat problem worse. Newly installed cameras captured several rats active in the middle of the day. Neighbors say that it's even worse during the night. The woman and her parents, who own the home, told reporters that she's been charged for feeding birds. "Who would have known just loving animals gets you that much trouble," she said. It is prohibited to feed any wild animals, including birds, in Rhode Island City. Nevertheless, while the woman's intention was to feed birds, it is clear that rats were also benefiting. Anthony Moretti, director of the City Administration, said he saw more than 20 rats near the woman's home. He said it will take months to get the problem under control.`,
 questions: [
 { id: '2023-06-S1-Q1', question: 'What do we learn about the woman from the news report?', options: ['A) She was involved in a conflict with bird lovers.', 'B) She was charged with mistreating animals.', 'C) She was on bad terms with her neighbors.', 'D) She was accused of violating a city law.'], answer: 'D' },
 { id: '2023-06-S1-Q2', question: 'What did the director of the City Administration say about the rat problem?', options: ['A) It will take time to solve the rat problem.', 'B) It has caused a lasting disturbance to residents.', 'C) It poses a health risk to the locals.', 'D) It has spread to several neighboring areas.'], answer: 'A' },
 ],
 },
 {
 id: '2023-06-S1-SecA-2', year: 2023, month: 6, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2023, 6, 1, 136),
 transcript: `To prepare for eventually sending astronauts to Mars, NASA began taking applications Friday for four people to live for a year in Mars Dune Alpha. That's a 1,700-square-foot Martian habitat, inside a building in Houston. The paid volunteers will work in an environment similar to Mars. They will have limited communications with family, restricted food and resources. NASA is planning three experiments, with the first one starting in the fall next year. Food will all be ready-to-eat space food. Some plants will be grown, but not potatoes like in the movie The Martian. "We want to understand how humans perform in them," said lead scientist Grace Douglas. "We're looking at Mars realistic situations." The application process opened Friday, and they're not seeking just anybody. The requirements are strict, including a master's degree in a science, engineering or math field, or pilot experience. Only American citizens or permanent US residents are acceptable. Applicants must be between 30 and 55 and in good physical health.`,
 questions: [
 { id: '2023-06-S1-Q3', question: 'What does NASA require the paid volunteers to do?', options: ['A) Communicate closely with their families.', 'B) Work in an environment resembling Mars.', 'C) Build a Martian habitat in Houston.', 'D) Grow potatoes like in the movie The Martian.'], answer: 'B' },
 { id: '2023-06-S1-Q4', question: 'What will the participants in the NASA experiment eat?', options: ['A) Ready-made food.', 'B) Food they cook themselves.', 'C) Fresh vegetables from the habitat.', 'D) Potatoes grown in the experiment.'], answer: 'A' },
 ],
 },
 {
 id: '2023-06-S1-SecA-3', year: 2023, month: 6, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2023, 6, 1, 268),
 transcript: `A Japanese mayor apologized Thursday for biting the Olympic gold medal of a softball player. Nagoya Mayor Takashi Kawamura had praised athlete Miu Goto during a public media event. He asked her to put the medal around his neck. Kawamura then bit into it. Biting a medal in front of journalists and photographers has become a common pose for Olympic medalists. However, it is only for the winners themselves, not others. "I'm really sorry that I hurt the treasure of the gold medalist," Kawamura told reporters Thursday. The mayor said the medal was undamaged, though he offered to pay for the cost of a new one. Goto, however, has accepted the International Olympic Committee's offer of a replacement, according to Japanese media reports. The scene broadcast on television prompted thousands of complaints to City Hall. Some Olympians said they treat their medals as treasures, and that it was disrespectful and unacceptable for Kawamura to bite one.`,
 questions: [
 { id: '2023-06-S1-Q5', question: 'What did the Japanese mayor do that caused the controversy?', options: ['A) He criticized an Olympic softball player.', 'B) He refused to attend a public media event.', 'C) He bit a softball player\'s Olympic gold medal.', 'D) He asked to take a photo with an Olympic medalist.'], answer: 'C' },
 { id: '2023-06-S1-Q6', question: 'What did the mayor offer to do?', options: ['A) Make a public apology on television.', 'B) Resign from his position as mayor.', 'C) Return the medal to the athlete immediately.', 'D) Pay for the cost of a new one.'], answer: 'D' },
 { id: '2023-06-S1-Q7', question: 'How do some Olympians say they treat their medals?', options: ['A) Share them with family members.', 'B) Display them on social media.', 'C) Treat them as treasures.', 'D) Put them in a safe place.'], answer: 'C' },
 ],
 },
 {
 id: '2023-06-S1-SecB-1', year: 2023, month: 6, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2023, 6, 1, 436),
 transcript: `M: What's that orange thing on your computer screen?\nW: It's something I bought yesterday. It's a plastic sheet that blocks blue light. I have one that I use to cover my phone screen too.\nM: What do you mean by blue light?\nW: Blue light includes natural light, but it also includes light that isn't natural — for example, from computers, phones, televisions, and other electronic devices.\nM: So blue light is harmful and that's why you want to block it?\nW: It isn't that simple. Blue light isn't necessarily bad for us. In fact, we need blue light during the day to be healthy. But too much blue light, especially from electronic devices, can harm our health by weakening our vision and making it harder for us to fall asleep. And poor sleep can cause all sorts of health problems.\nM: I'm not so sure that sleep is nearly as important as people always say it is. I haven't slept enough in months because I have too much work to do, and I feel fine. And it's the same for most of my friends. Poor sleep might be a problem for older people, but surely young people can handle late nights.\nW: Well, the research I've read shows that sleep is probably even more important than we thought, and that not having enough sleep can contribute to serious health problems like obesity and heart disease. And all the artificial blue light from electronic devices means we have to try harder to sleep well.\nM: Maybe you're right. I'm on my computer very late most nights, and that's probably why I don't sleep enough.`,
 questions: [
 { id: '2023-06-S1-Q8', question: 'What has the woman bought to deal with blue light?', options: ['A) She covered its screen with a plastic sheet.', 'B) She bought a new pair of glasses.', 'C) She installed a special software program.', 'D) She changed the display settings of her phone.'], answer: 'A' },
 { id: '2023-06-S1-Q9', question: 'What does the woman say about blue light from electronic devices?', options: ['A) It is completely harmless to the human body.', 'B) It includes unnatural light.', 'C) It only comes from computers.', 'D) It is the same as natural blue light.'], answer: 'B' },
 { id: '2023-06-S1-Q10', question: 'Why hasn\'t the man slept enough in months?', options: ['A) He stays up late playing computer games.', 'B) He suffers from a sleeping disorder.', 'C) He can\'t stop thinking about his work.', 'D) He has been burdened with excessive work.'], answer: 'D' },
 { id: '2023-06-S1-Q11', question: 'What does the woman\'s research suggest about sleep?', options: ['A) It is only important for older people.', 'B) Sleep may be more important than people assumed.', 'C) Young people can manage with less sleep.', 'D) Blue light is the main cause of poor sleep.'], answer: 'B' },
 ],
 },
 {
 id: '2023-06-S1-SecB-2', year: 2023, month: 6, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2023, 6, 1, 612),
 transcript: `W: As a kid, did you know what job you wanted to do when you grew up?\nM: No, I didn't. And I got sick every time adults asked me what I wanted to be when I grew up.\nW: It's the same with me. And I'm tired of people asking that question of my 10-year-old daughter. My daughter's stock answers are basketball player, pop singer, mechanical engineer. Adults love that last one, as it's the perfect mix of the sensible and the ambitious. When she was much younger, my daughter used to say she wanted to be queen of the clouds, which I loved. That's the kind of goal setting I like to see in children, springing from their boundless imaginations.\nM: Yes, we grownups can be tedious and limiting in our need for reality. And we teach a very gloomy image of adulthood — that whatever our children's future holds, it must be seen within the context of a job.\nW: How utterly overwhelming and dull.\nM: When people ask my son what he wants to be when he grows up, I have to swallow the urge to say, "Hey, back off my kid's dreams."\nW: We can't dismiss the idea that teenagers have to plan to do something after they finish school, and parents are entitled to hope it's more than simply spending 10 hours a day playing computer games.\nM: But asking "What do you want to be?" isn't going to lead a child to a fulfilled life, rather lead to false expectations and a high chance of disappointment.\nW: Exactly. We should be helping our kids understand who they are, even if that means letting go of who we think they should be.`,
 questions: [
 { id: '2023-06-S1-Q12', question: 'What question did adults often ask the speakers when they were children?', options: ['A) What they wanted to be when grown up.', 'B) What their favorite subject was.', 'C) How they did in their last exams.', 'D) How they spent their weekends.'], answer: 'A' },
 { id: '2023-06-S1-Q13', question: 'What is one of the daughter\'s stock answers about her future career?', options: ['A) A queen of the clouds.', 'B) A famous pop singer.', 'C) A mechanical engineer.', 'D) A computer game designer.'], answer: 'C' },
 { id: '2023-06-S1-Q14', question: 'What did the woman like about her daughter\'s earlier answer?', options: ['A) It showed her ambition.', 'B) It was very sensible.', 'C) It was imaginative.', 'D) It reflected her talent.'], answer: 'C' },
 { id: '2023-06-S1-Q15', question: 'What does the woman say parents should do?', options: ['A) Encourage their kids to aim high.', 'B) Help their kids understand themselves.', 'C) Let go of their expectations.', 'D) Spend less time playing computer games.'], answer: 'B' },
 ],
 },
 {
 id: '2023-06-S1-SecC-1', year: 2023, month: 6, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2023, 6, 1, 826),
 transcript: `Greater Internet access correlates directly with improved health care, education, and economic development. People living in rural areas, however, lag behind in online use, which limits their access to government services, banking, and job opportunities. Nowhere is this challenge clearer than in Africa. Most Africans live in rural areas that are tough to wire for internet access. Now, some phone companies are trying to introduce internet-ready phones into African markets. Certain companies have started selling simple smartphones for only $20. Previously the lowest price had been around $40, well out of reach for many people. These devices are powered by software from the giant electronics company KaiOS Technologies Limited. Most companies are trying to make phones ever more powerful and capable, but KaiOS went the other way. It made every effort to keep the essential capabilities of smartphones, to strip out costs and preserve battery life for people who likely have inadequate access to electricity. The KaiOS devices offer an alternative to the more expensive models that remain out of reach of many Africans and contribute to the digital divide. The body of KaiOS phones is as basic as it gets. Instead of a touchscreen, they're controlled with an old-school keypad. They're designed for 3G networks because 4G coverage doesn't reach two-thirds of Africa's customers.`,
 questions: [
 { id: '2023-06-S1-Q16', question: 'What are some phone companies trying to do in African markets?', options: ['A) Build more 4G networks in rural areas.', 'B) Set up mobile banking services.', 'C) Improve health care through telemedicine.', 'D) Promote Internet-ready phones.'], answer: 'D' },
 { id: '2023-06-S1-Q17', question: 'What is special about KaiOS phones?', options: ['A) They cater to Africans\' needs.', 'B) They are powered by solar energy.', 'C) They have the most advanced touchscreen.', 'D) They are made of recycled materials.'], answer: 'A' },
 { id: '2023-06-S1-Q18', question: 'What do KaiOS phones use instead of a touchscreen?', options: ['A) Voice control.', 'B) An old-school keypad.', 'C) A digital pen.', 'D) Motion sensors.'], answer: 'B' },
 ],
 },
 {
 id: '2023-06-S1-SecC-2', year: 2023, month: 6, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2023, 6, 1, 1005),
 transcript: `For years, using recycled plastic to make plastic products was cheap. By contrast, fossil fuel plastic was more expensive. Thus, the sustainable option was an economic option, too. But now it is cheaper for major manufacturers to use new plastic. According to one recent business report, recycled plastic now costs an extra $72 a ton compared with newly made plastic. This may be because of consumer demands. They are pushing for more recycled plastics in new products. Meanwhile, new plastic is becoming cheaper. This is because of a boom in petroleum chemical production from the U.S. The price increase of recycled plastic could cost sustainable manufacturers an extra $250 million a year. Smaller manufacturers may also be forced to use new plastic to reduce costs. Makers of clear plastic bottles may also opt for new fossil-fuel based plastic to save money. Plastic packaging makers are being pressured to use more recycled plastic. This is done in hopes of reducing the enormous amount of plastic pollution in the oceans. The UK government plans to tax companies which don't use at least 30% recycled plastic in their products. Additionally, the government is planning to increase the quantity of recycled plastic in the market. This could mean incentives for new recycling plants. Additionally, recycling facilities may be improved at a local council level, and recycled plastic could be imported. This would help increase the amount of recycled plastic in circulation.`,
 questions: [
 { id: '2023-06-S1-Q19', question: 'What does the passage say about recycled plastic in the past?', options: ['A) It was more expensive than fossil fuel plastic.', 'B) It was harder to recycle than expected.', 'C) It was cheaper than using fossil fuel plastic.', 'D) It was of lower quality than new plastic.'], answer: 'C' },
 { id: '2023-06-S1-Q20', question: 'What has caused new plastic to become cheaper?', options: ['A) A decrease in global oil prices.', 'B) Improvements in manufacturing technology.', 'C) Reduced demand from packaging makers.', 'D) A rapid increase in U.S. petroleum chemical production.'], answer: 'D' },
 { id: '2023-06-S1-Q21', question: 'What does the UK government plan to do?', options: ['A) Ban companies from using fossil fuel plastic.', 'B) Import recycled plastic from other countries.', 'C) Provide incentives for new recycling plants.', 'D) Take measures to promote the use of recycled plastic.'], answer: 'D' },
 ],
 },
 {
 id: '2023-06-S1-SecC-3', year: 2023, month: 6, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2023, 6, 1, 1184),
 transcript: `A company in New York has opened a place where people can come to take naps during the day. The company, called Nap York, rents a place for nap-takers and provides a clean, quiet environment for resting. The founder of the company believes that napping is essential for people's productivity and well-being. Research has shown that a short nap of 20 to 30 minutes can significantly improve alertness, creativity, and mood. It can also help people to better concentrate on their work. However, the challenge is that in many workplaces, napping is still seen as a sign of laziness rather than a tool for improving performance. Some bosses associate napping with laziness and would not allow their employees to take naps during work hours. This cultural attitude makes it difficult for many people to get the rest they need, even though their ability to concentrate depends on it. The founder hopes that more companies will come to understand the obvious importance of napping and create spaces for their employees to rest.`,
 questions: [
 { id: '2023-06-S1-Q22', question: 'What does the company Nap York do?', options: ['A) It provides sleep consulting services.', 'B) It rents a place for nap-takers.', 'C) It sells comfortable nap pods.', 'D) It conducts research on sleep patterns.'], answer: 'B' },
 { id: '2023-06-S1-Q23', question: 'What does the founder hope companies will do?', options: ['A) Allow employees to work flexible hours.', 'B) Provide free coffee for their workers.', 'C) To understand the obvious importance of napping.', 'D) Invest in better office furniture.'], answer: 'C' },
 { id: '2023-06-S1-Q24', question: 'What does the passage say about employees\' ability to concentrate?', options: ['A) It improves with longer working hours.', 'B) They depend on his ability to concentrate.', 'C) It is unaffected by lack of sleep.', 'D) It can be enhanced by drinking coffee.'], answer: 'B' },
 { id: '2023-06-S1-Q25', question: 'What prevents employees from taking naps at work?', options: ['A) Some bosses associate napping with laziness.', 'B) There is not enough space in most offices.', 'C) Labor regulations prohibit sleeping at work.', 'D) Most people cannot fall asleep during the day.'], answer: 'A' },
 ],
 },

 // ================================================================
 // 2023年6月 第2套
 // ================================================================
 {
 id: '2023-06-S2-SecA-1', year: 2023, month: 6, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2023, 6, 2, 33),
 transcript: `Police have reported a man being bitten by a four-foot snake when he lifted his toilet seat on Sunday morning. The snake was not poisonous, so the man did not have to go to the hospital, but his arm was medically treated at the scene. The snake was eventually captured by the local animal handlers and taken to an animal hospital afterward. It was being treated for an outer skin infection. It was unclear who the owner was.`,
 questions: [
 { id: '2023-06-S2-Q1', question: 'What happened to a man on Sunday morning?', options: ['A) A man was bitten by a snake.', 'B) A man fell off his toilet seat.', 'C) A man found a snake in his garden.', 'D) A man was attacked by a wild animal.'], answer: 'A' },
 { id: '2023-06-S2-Q2', question: 'What was unclear about the snake?', options: ['A) Where it came from.', 'B) How it entered the house.', 'C) Whether it was poisonous.', 'D) Who owned the snake.'], answer: 'D' },
 ],
 },
 {
 id: '2023-06-S2-SecA-2', year: 2023, month: 6, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2023, 6, 2, 131),
 transcript: `Every week since last April, Andrea Belcher has been doing something slightly unusual and amusing when she takes out her trash. She dresses up in fancy outfits and costumes, sharing her exploits on social media. The following weeks she found other outfits in her dressing up box and dressed up as different characters and famous people. Explaining why she has kept up the videos, Andrea explained how nice it was to have a little bit of fun and craziness that made people smile.`,
 questions: [
 { id: '2023-06-S2-Q3', question: 'What has Andrea Belcher been doing since last April?', options: ['A) Taking her trash out in fancy dresses.', 'B) Cleaning up the neighborhood every week.', 'C) Posting cooking videos on social media.', 'D) Collecting costumes from her neighbors.'], answer: 'A' },
 { id: '2023-06-S2-Q4', question: 'Why has she kept up the videos?', options: ['A) To become famous on social media.', 'B) To amuse people.', 'C) To promote environmental awareness.', 'D) To sell her dressing up box outfits.'], answer: 'B' },
 ],
 },
 {
 id: '2023-06-S2-SecA-3', year: 2023, month: 6, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2023, 6, 2, 251),
 transcript: `At Frank's restaurant, people can eat even if they have no money. Customers who can afford to pay for their meals can leave receipts on a board. Those who cannot pay can simply take a receipt and hand it to staff in exchange for a free meal. The idea for the board of free meals started after a donor came in with $100 for each member of its staff. Two staffers returned the money, leaving $700 remaining, so they decided to do something more by creating the board. The drive has been going on for two weeks and Morris said just under 50 customers have picked up a free meal. There have been no reports of anyone taking advantage of the situation. In fact, there are a lot more people giving tickets than receiving.`,
 questions: [
 { id: '2023-06-S2-Q5', question: 'What can people do at Frank\'s restaurant?', options: ['A) Order food through a special app.', 'B) Donate meals to the homeless.', 'C) Have a meal even if they have no money.', 'D) Pay for their meals in advance.'], answer: 'C' },
 { id: '2023-06-S2-Q6', question: 'How did the idea for the free meals board start?', options: ['A) It was proposed by the restaurant\'s customers.', 'B) It was inspired by a similar program overseas.', 'C) It originated from a donation to her staff.', 'D) It was started to celebrate the restaurant\'s anniversary.'], answer: 'C' },
 { id: '2023-06-S2-Q7', question: 'What has been the result of the free meals board?', options: ['A) Some people have been taking advantage of it.', 'B) More people have been giving than taking.', 'C) It has attracted many new customers.', 'D) Donations have been decreasing over time.'], answer: 'B' },
 ],
 },
 {
 id: '2023-06-S2-SecB-1', year: 2023, month: 6, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2023, 6, 2, 426),
 transcript: `W: Our guest today is psychologist Steve Pinker from McGill University. Our question today is why friends suddenly disappear.\nM: Well, it's a common experience. You have a friend, everything seems fine, and then suddenly they stop returning your calls and messages. In psychology, we explain this through attachment theory. Children who have a secure attachment style tend to have healthy relationships. But those with an insecure attachment style may react very differently when there's a perceived problem. When there is a relationship breakdown with their parents, children with an anxious attachment style scream and cry to get their parents to come back. However, an insecurely attached person won't. They might either attack you, get defensive, or just disappear from your life. To them, a difference, no matter how small in your eyes, signals the end of the relationship. That explains why they suddenly disappear.`,
 questions: [
 { id: '2023-06-S2-Q8', question: 'What is the man\'s profession?', options: ['A) He is a psychologist.', 'B) He is a sociologist.', 'C) He is a relationship coach.', 'D) He is a university professor.'], answer: 'A' },
 { id: '2023-06-S2-Q9', question: 'What question do they discuss?', options: ['A) How to make new friends.', 'B) Why people feel insecure.', 'C) How to maintain long-distance friendships.', 'D) Why friends break off contact all of a sudden.'], answer: 'D' },
 { id: '2023-06-S2-Q10', question: 'What do children with an anxious attachment style do?', options: ['A) They become very quiet and withdrawn.', 'B) They try to solve the problem themselves.', 'C) They scream to get their parents back.', 'D) They turn to their friends for help.'], answer: 'C' },
 { id: '2023-06-S2-Q11', question: 'How do insecurely attached people react to a difference?', options: ['A) They may regard any difference as the end of a relationship.', 'B) They try to work through the difference patiently.', 'C) They seek professional help immediately.', 'D) They pretend nothing has happened.'], answer: 'A' },
 ],
 },
 {
 id: '2023-06-S2-SecB-2', year: 2023, month: 6, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2023, 6, 2, 633),
 transcript: `W: I see you wear jeans all the time. Do you have a particular reason?\nM: Well, I just love good jeans and Japan happens to make the best in the world.\nW: Really? I would have thought America made the best jeans because it's a typical American garment.\nM: That's true historically, but Japanese manufacturers have taken denim to a new level. The fabric they use is of a higher quality and the dyes are natural.\nW: But aren't they expensive?\nM: Yes, they are expensive, but bear in mind they will last me several years and they are very fashionable too. I think they're totally worth it.`,
 questions: [
 { id: '2023-06-S2-Q12', question: 'What does the man say about Japanese jeans?', options: ['A) They are the most fashionable.', 'B) They are the cheapest.', 'C) Their quality.', 'D) Their history.'], answer: 'C' },
 { id: '2023-06-S2-Q13', question: 'What does the woman say about America and jeans?', options: ['A) Jeans are a typical American garment.', 'B) American jeans are no longer popular.', 'C) American jeans use the best dyes.', 'D) America produces the most jeans.'], answer: 'A' },
 { id: '2023-06-S2-Q14', question: 'What does the man say about the dyes used in Japanese jeans?', options: ['A) They are imported from America.', 'B) They are natural.', 'C) They are very bright.', 'D) They are chemical-based.'], answer: 'B' },
 { id: '2023-06-S2-Q15', question: 'What does the man think about the price of Japanese jeans?', options: ['A) They are too expensive for most people.', 'B) They are cheaper than American jeans.', 'C) They should be lower given the quality.', 'D) They are worth the price.'], answer: 'D' },
 ],
 },
 {
 id: '2023-06-S2-SecC-1', year: 2023, month: 6, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2023, 6, 2, 861),
 transcript: `Every time I walk out of a superhero movie, I feel the same way. I experience a sense of longing, realizing that there should be more in life. The plot of each superhero film has become relatively predictable. The hero faces a powerful enemy, doubts himself, discovers his true strength, and wins in the end. The elites of our society have rejected superhero films, considering them too simple and lacking artistic depth. Yet these simple stories continue to attract millions of viewers because they speak to our basic needs. They show us that ordinary people can do extraordinary things, and that good can triumph over evil. The problem is not that these films are too simple, but that they are the only stories we seem to be telling ourselves about heroism and greatness.`,
 questions: [
 { id: '2023-06-S2-Q16', question: 'How does the speaker feel after watching a superhero movie?', options: ['A) He desires more in life.', 'B) He wants to become a film critic.', 'C) He feels entertained and satisfied.', 'D) He is inspired to exercise more.'], answer: 'A' },
 { id: '2023-06-S2-Q17', question: 'What does the speaker say about the plot of superhero films?', options: ['A) It is surprisingly complex.', 'B) It reflects real-life problems.', 'C) It has become more diverse recently.', 'D) It is relatively predictable.'], answer: 'D' },
 { id: '2023-06-S2-Q18', question: 'What criticism do elites make about superhero films?', options: ['A) They promote unrealistic expectations.', 'B) They are too commercialized.', 'C) They lack cultural diversity.', 'D) They are too simple.'], answer: 'D' },
 ],
 },
 {
 id: '2023-06-S2-SecC-2', year: 2023, month: 6, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2023, 6, 2, 1037),
 transcript: `Storytelling is one of the oldest and most powerful forms of communication. It forges connections among people, allowing the listener to enter the world of the story and experience it from a different perspective. Stories can make people more open to learning because they engage our emotions as well as our intellect. There are extra benefits for leaders who can tell a simple personal story. Such stories can convey fundamental values in a way that lectures and presentations cannot. When a leader shares a personal story, it helps build trust and makes the message more memorable.`,
 questions: [
 { id: '2023-06-S2-Q19', question: 'What does the passage say about storytelling?', options: ['A) It is a skill that few people possess.', 'B) It can help connect people.', 'C) It is mainly important for children.', 'D) It has become less relevant in the digital age.'], answer: 'B' },
 { id: '2023-06-S2-Q20', question: 'What can stories do for listeners?', options: ['A) Help them remember facts more easily.', 'B) Make them more open to learning.', 'C) Improve their critical thinking skills.', 'D) Teach them to become better speakers.'], answer: 'B' },
 { id: '2023-06-S2-Q21', question: 'What can personal stories from leaders do?', options: ['A) Replace formal presentations.', 'B) Entertain the audience.', 'C) Convey fundamental values.', 'D) Showcase the leader\'s achievements.'], answer: 'C' },
 ],
 },
 {
 id: '2023-06-S2-SecC-3', year: 2023, month: 6, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2023, 6, 2, 1214),
 transcript: `The United States was founded by successive waves of immigrants, and immigrants have been contributing to the country ever since. Studies show that immigrants are more likely to be entrepreneurs than native-born Americans. More of them are successful business people, starting companies and creating jobs. Another key measure of financial strength is debt level. Immigrants do better in this area too. Their level of debt is lower than that of native-born Americans. This financial discipline helps them build wealth over time. Why are immigrants doing so well economically? The values and habits they bring from their own homelands help explain some of the success. Many immigrants keep their traditional values and old habits, including strong family ties, a commitment to education, and a willingness to work hard and save money.`,
 questions: [
 { id: '2023-06-S2-Q22', question: 'What does the passage say about immigrants in the U.S.?', options: ['A) They have struggled to integrate into society.', 'B) Immigrants have been contributing to the U.S.', 'C) They mainly work in low-paying jobs.', 'D) They are less educated than native-born Americans.'], answer: 'B' },
 { id: '2023-06-S2-Q23', question: 'What do studies show about immigrant entrepreneurs?', options: ['A) They mainly start small businesses.', 'B) They face more challenges than others.', 'C) They tend to hire only other immigrants.', 'D) More of them are successful business people.'], answer: 'D' },
 { id: '2023-06-S2-Q24', question: 'How do immigrants compare in terms of debt?', options: ['A) Their debt is mainly from student loans.', 'B) They have more debt than native-born Americans.', 'C) Their level of debt is lower than that of native-born Americans.', 'D) They borrow more to start their businesses.'], answer: 'C' },
 { id: '2023-06-S2-Q25', question: 'What helps explain the economic success of immigrants?', options: ['A) Keep their traditional values and old habits.', 'B) They receive more government support.', 'C) They are more willing to take risks.', 'D) They have better access to education.'], answer: 'A' },
 ],
 },

 // ================================================================
 // 2023年3月 第1套（疫情延考，3套共用同一听力）
 // ================================================================
 {
 id: '2023-03-S1-SecA-1', year: 2023, month: 3, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2023, 3, 1, 38),
 transcript: `African leaders have agreed to a proposal that would allow Africans to travel throughout the continent without a visa. The African Union, which consists of 55 member states, has been pushing for this initiative for years. Supporters say visa-free travel would boost trade and tourism across Africa. Currently, Africans need visas to visit more than half of African countries. The proposal is expected to make it easier for business people and tourists to move freely. Officials say this policy could help reduce the cost of trade between African countries and create more economic opportunities for the continent's growing population.`,
 questions: [
 { id: '2023-03-S1-Q1', question: 'What do we learn from the news report?', options: ['A) A proposed policy allowing Africans to travel in Africa without a visa.', 'B) An agreement among 13 African countries to set up a free-trade zone.', 'C) A plan to invite all African countries to join the African Union.', 'D) An important initiative to permit tourists to visit Africa without a visa.'], answer: 'A' },
 { id: '2023-03-S1-Q2', question: 'What benefit will the proposal bring according to the news report?', options: ['A) It will attract more investments from all over the world.', 'B) It will help many African countries reduce trade deficits.', 'C) It will reduce the cost of trade between African countries.', 'D) It will allow Africans to play a bigger role in world trade.'], answer: 'C' },
 ],
 },
 {
 id: '2023-03-S1-SecA-2', year: 2023, month: 3, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2023, 3, 1, 156),
 transcript: `A team of scientists in Iceland is working on a groundbreaking project to capture carbon dioxide and pump it underground, where it turns into stone. The process involves mixing carbon dioxide with water and injecting it deep into volcanic rock formations. The carbon dioxide reacts with the rock and forms solid carbonate minerals within two years. This method could provide a permanent solution for storing carbon dioxide and fighting climate change. However, the process requires enormous amounts of water. For every ton of carbon dioxide captured, about 25 tons of water are needed. Scientists say that if the high consumption of water can be addressed, this technique could be used at power plants around the world to reduce greenhouse gas emissions.`,
 questions: [
 { id: '2023-03-S1-Q3', question: 'What process does the news report describe?', options: ['A) Cooling down volcanic rock with sea water.', 'B) Storing carbon dioxide underground as a gas.', 'C) Capturing carbon dioxide and burying it under the sea.', 'D) Pumping carbon dioxide underground to form stone.'], answer: 'D' },
 { id: '2023-03-S1-Q4', question: 'What is a challenge facing the carbon capture method?', options: ['A) Lack of burying ground.', 'B) Long time for processing.', 'C) High consumption of water.', 'D) Enormous cost of energy.'], answer: 'C' },
 ],
 },
 {
 id: '2023-03-S1-SecA-3', year: 2023, month: 3, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2023, 3, 1, 284),
 transcript: `The French are eating less bread than ever before, according to a new study. The average French person now eats just 90 grams of bread per day, compared with over 200 grams in the 1950s. Bread consumption in France has been on the decline for decades, as more people favor diets lower in calories. Researchers say that women in particular have been eating less bread, likely because they tend to favor lighter, healthier options. Another change is that fewer people are eating traditional French stick loaves. With busier lifestyles, the French are spending less time eating breakfast, which was traditionally a meal where bread played a central role.`,
 questions: [
 { id: '2023-03-S1-Q5', question: 'What do we learn about bread consumption in France?', options: ['A) It varies with the seasons.', 'B) It has been on the decline.', 'C) It has caused nationwide concern.', 'D) It is ninety grams daily on average.'], answer: 'B' },
 { id: '2023-03-S1-Q6', question: 'What does the news report say about French women?', options: ['A) They emphasize food variety.', 'B) They prefer French stick loaves.', 'C) They do more cooking than men.', 'D) They favor diets lower in calories.'], answer: 'D' },
 { id: '2023-03-S1-Q7', question: 'What change in French eating habits is mentioned?', options: ['A) They bake more bread at home.', 'B) They spend less time eating breakfast.', 'C) They eat more fruit than they used to.', 'D) They put jam instead of butter on bread.'], answer: 'B' },
 ],
 },
 {
 id: '2023-03-S1-SecB-1', year: 2023, month: 3, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2023, 3, 1, 466),
 transcript: `M: I'd like to book two tickets to Edinburgh, please.
W: Certainly. When would you like to travel?
M: I'd prefer to travel after the rush hour. I don't like crowded trains.
W: We have several options. Would you like first class or standard?
M: Standard is fine. I'd prefer one window seat if possible. I enjoy the view.
W: Let me check... Yes, I can get you one window seat and one aisle seat. They're together.
M: Perfect. Where should I wait for the train?
W: Your train will depart from platform 5. You should wait at the far end of the platform — that's where your carriage will be.
M: Great. And about my luggage — should I check it in?
W: No need. Just bring it with you and give the ticket to the train guard when you board.
M: Thank you very much.`,
 questions: [
 { id: '2023-03-S1-Q8', question: 'When does the man prefer to travel?', options: ['A) After the rush hour.', 'B) Early in the morning.', 'C) As soon as possible.', 'D) Around lunch time.'], answer: 'A' },
 { id: '2023-03-S1-Q9', question: 'What kind of seat does the man request?', options: ['A) Two first class seats.', 'B) Two seats together.', 'C) One window seat.', 'D) One seat near the exit.'], answer: 'C' },
 { id: '2023-03-S1-Q10', question: 'Where should the man wait according to the woman?', options: ['A) In the middle of the platform.', 'B) At the far end of the platform.', 'C) Behind the yellow line.', 'D) In the waiting room.'], answer: 'B' },
 { id: '2023-03-S1-Q11', question: 'What should the man do with his luggage on boarding?', options: ['A) Wait in a queue for his turn.', 'B) Go to the baggage claim area.', 'C) Pay an extra fee for the service.', 'D) Give the ticket to the train guard.'], answer: 'D' },
 ],
 },
 {
 id: '2023-03-S1-SecB-2', year: 2023, month: 3, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2023, 3, 1, 645),
 transcript: `W: I've been reading about the history of cinemas in London. Did you know that nearly all of the old movie theatres closed down decades ago?
M: Really? That's surprising. What happened to them?
W: Most were turned into other businesses or demolished. But a few have survived.
M: Is there one that still operates today?
W: Yes, there's one famous theatre that shows foreign movies exclusively. It was built in the 1930s and is one of the oldest surviving cinemas in London.
M: Do many English people go to see foreign films there?
W: Not really. The audience is mostly immigrants and international visitors. Many English people don't go to movie theatres often — and those who do tend to prefer mainstream Hollywood films.
M: What about the language barrier?
W: Foreign films shown there have an English translation on the screen, usually in the form of subtitles. That makes them accessible to everyone.`,
 questions: [
 { id: '2023-03-S1-Q12', question: 'What does the woman say about London\'s old movie theatres?', options: ['A) Almost all of them were operating at a deficit.', 'B) They have all been turned into movie theatres.', 'C) Nearly all of them closed down decades ago.', 'D) They have adapted to meet fashion changes.'], answer: 'C' },
 { id: '2023-03-S1-Q13', question: 'What is special about one surviving theatre?', options: ['A) It shows foreign movies exclusively.', 'B) It shows movies from the 1950s.', 'C) It is the oldest theatre in London.', 'D) It is located next to a hat factory.'], answer: 'A' },
 { id: '2023-03-S1-Q14', question: 'What does the woman say about English people regarding foreign films?', options: ['A) They wear hats on social occasions.', 'B) They don\'t speak foreign languages.', 'C) They enjoy watching foreign movies.', 'D) They don\'t go to movie theatres often.'], answer: 'B' },
 { id: '2023-03-S1-Q15', question: 'What makes the foreign films accessible to English audiences?', options: ['A) They are meant mostly for immigrants.', 'B) They attract large crowds of young Londoners.', 'C) They are hard for English people to appreciate.', 'D) They have an English translation on the screen.'], answer: 'D' },
 ],
 },
 {
 id: '2023-03-S1-SecC-1', year: 2023, month: 3, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2023, 3, 1, 854),
 transcript: `A growing number of teachers are changing their attitudes toward smartphones in the classroom. One primary school teacher in London says she now incorporates smartphones into her teaching, rather than banning them. "Children use smartphones every day outside school. We need to teach them how to use these tools responsibly," she explains. She believes that helping children grow up to be professionals means teaching them to use technology wisely, not avoiding it. However, not all educators agree. Some say that children should use books and pens only in class, arguing that traditional methods are more effective for developing focus and concentration. The debate continues as schools try to find the right balance between embracing technology and maintaining educational standards.`,
 questions: [
 { id: '2023-03-S1-Q16', question: 'What does the teacher say about her use of smartphones?', options: ['A) She doesn\'t think smartphones can replace tablets.', 'B) She incorporates smartphones into her teaching.', 'C) She cannot stop children using smartphones.', 'D) She regards smartphones as a distraction.'], answer: 'B' },
 { id: '2023-03-S1-Q17', question: 'What is the teacher\'s goal in using technology?', options: ['A) To enforce school discipline.', 'B) To make students concentrate.', 'C) To help children grow up to be professionals.', 'D) To cultivate children\'s good study habits.'], answer: 'C' },
 { id: '2023-03-S1-Q18', question: 'What do some traditional educators argue students should do?', options: ['A) Use books and pens only.', 'B) Cut down their screen time.', 'C) Make full use of electronic devices.', 'D) Learn to use the internet for research.'], answer: 'A' },
 ],
 },
 {
 id: '2023-03-S1-SecC-2', year: 2023, month: 3, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2023, 3, 1, 1023),
 transcript: `A mother in New Jersey got quite a surprise recently. After asking her six-year-old daughter to help with household chores by washing the windows, she let her daughter use her phone. The daughter, instead of just playing games, opened an online shopping app and ordered a large number of dolls. Each doll cost about $20, and she ordered dozens of them. When the packages started arriving, the mother was confused — she hadn't ordered anything. After checking her account, she discovered what had happened. The mother and daughter ended up with hundreds of dollars worth of dolls. Rather than returning them, they decided to take all of them to the children's hospital, where they were donated to young patients. The story ended happily, with the dolls bringing joy to many children.`,
 questions: [
 { id: '2023-03-S1-Q19', question: 'How did the little girl previously help her mother?', options: ['A) By cleaning the kitchen floor.', 'B) By looking after her baby brother.', 'C) By helping her mother do the dishes.', 'D) By helping her brother wash windows.'], answer: 'D' },
 { id: '2023-03-S1-Q20', question: 'What did the daughter do while using her mother\'s phone?', options: ['A) She ordered a large number of dolls.', 'B) She checked if a purple doll was ordered.', 'C) She mistakenly canceled her mom\'s order.', 'D) She ordered a more expensive doll instead.'], answer: 'A' },
 { id: '2023-03-S1-Q21', question: 'What did the family do with the dolls in the end?', options: ['A) They asked the children\'s hospital to pick them.', 'B) They took all of them to the children\'s hospital.', 'C) They opened all of them one by one.', 'D) They discussed where to keep them.'], answer: 'B' },
 ],
 },
 {
 id: '2023-03-S1-SecC-3', year: 2023, month: 3, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2023, 3, 1, 1181),
 transcript: `A new study from Harvard University has looked into the factors that contribute to people's success later in life. One surprising finding was the importance of the time one starts school. Researchers tracked participants from kindergarten through adulthood and found that children who started school at an older age tended to perform better academically. The purpose of the study was to find causes for differences in the participants' performance. Researchers were particularly interested in what made some people more successful than others. They studied various groups including high-school students, college graduates, and professional athletes. One interesting discovery was the role of risk-taking. Those who were willing to take calculated risks in their careers and personal lives often achieved greater success. Self-confidence was also identified as an important factor, but risk-taking appeared to be the strongest predictor of career advancement.`,
 questions: [
 { id: '2023-03-S1-Q22', question: 'What factor did the study identify as important for later success?', options: ['A) The time one starts school.', 'B) The classroom atmosphere.', 'C) The school that one attends.', 'D) The relationship with classmates.'], answer: 'A' },
 { id: '2023-03-S1-Q23', question: 'What was the purpose of the study?', options: ['A) To help parents decide when to send their children to school.', 'B) To find causes for differences in the participants\' performance.', 'C) To identify students having potential to be professional athletes.', 'D) To offer constructive suggestions for making educational policies.'], answer: 'B' },
 { id: '2023-03-S1-Q24', question: 'Which group was included in the study?', options: ['A) Political leaders.', 'B) Financial analysts.', 'C) Professional athletes.', 'D) High-school students.'], answer: 'D' },
 { id: '2023-03-S1-Q25', question: 'What quality was most strongly linked to career success?', options: ['A) Leadership ability.', 'B) Commitment to work.', 'C) Risk-taking.', 'D) Self-confidence.'], answer: 'C' },
 ],
 },

 // 注：2023年3月第2套听力与第1套完全相同（疫情延考，全国仅考1套听力）
 {
 id: '2023-03-S2-SecA-1', year: 2023, month: 3, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2023, 3, 1, 38),
 transcript: `African leaders have agreed to a proposal that would allow Africans to travel throughout the continent without a visa. The African Union, which consists of 55 member states, has been pushing for this initiative for years. Supporters say visa-free travel would boost trade and tourism across Africa. Currently, Africans need visas to visit more than half of African countries. The proposal is expected to make it easier for business people and tourists to move freely. Officials say this policy could help reduce the cost of trade between African countries and create more economic opportunities for the continent's growing population.`,
 questions: [
 { id: '2023-03-S2-Q1', question: 'What do we learn from the news report?', options: ['A) A proposed policy allowing Africans to travel in Africa without a visa.', 'B) An agreement among 13 African countries to set up a free-trade zone.', 'C) A plan to invite all African countries to join the African Union.', 'D) An important initiative to permit tourists to visit Africa without a visa.'], answer: 'A' },
 { id: '2023-03-S2-Q2', question: 'What benefit will the proposal bring according to the news report?', options: ['A) It will attract more investments from all over the world.', 'B) It will help many African countries reduce trade deficits.', 'C) It will reduce the cost of trade between African countries.', 'D) It will allow Africans to play a bigger role in world trade.'], answer: 'C' },
 ],
 },
 {
 id: '2023-03-S2-SecA-2', year: 2023, month: 3, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2023, 3, 1, 156),
 transcript: `A team of scientists in Iceland is working on a groundbreaking project to capture carbon dioxide and pump it underground, where it turns into stone. The process involves mixing carbon dioxide with water and injecting it deep into volcanic rock formations. The carbon dioxide reacts with the rock and forms solid carbonate minerals within two years. This method could provide a permanent solution for storing carbon dioxide and fighting climate change. However, the process requires enormous amounts of water. For every ton of carbon dioxide captured, about 25 tons of water are needed. Scientists say that if the high consumption of water can be addressed, this technique could be used at power plants around the world to reduce greenhouse gas emissions.`,
 questions: [
 { id: '2023-03-S2-Q3', question: 'What process does the news report describe?', options: ['A) Cooling down volcanic rock with sea water.', 'B) Storing carbon dioxide underground as a gas.', 'C) Capturing carbon dioxide and burying it under the sea.', 'D) Pumping carbon dioxide underground to form stone.'], answer: 'D' },
 { id: '2023-03-S2-Q4', question: 'What is a challenge facing the carbon capture method?', options: ['A) Lack of burying ground.', 'B) Long time for processing.', 'C) High consumption of water.', 'D) Enormous cost of energy.'], answer: 'C' },
 ],
 },
 {
 id: '2023-03-S2-SecA-3', year: 2023, month: 3, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2023, 3, 1, 284),
 transcript: `The French are eating less bread than ever before, according to a new study. The average French person now eats just 90 grams of bread per day, compared with over 200 grams in the 1950s. Bread consumption in France has been on the decline for decades, as more people favor diets lower in calories. Researchers say that women in particular have been eating less bread, likely because they tend to favor lighter, healthier options. Another change is that fewer people are eating traditional French stick loaves. With busier lifestyles, the French are spending less time eating breakfast, which was traditionally a meal where bread played a central role.`,
 questions: [
 { id: '2023-03-S2-Q5', question: 'What do we learn about bread consumption in France?', options: ['A) It varies with the seasons.', 'B) It has been on the decline.', 'C) It has caused nationwide concern.', 'D) It is ninety grams daily on average.'], answer: 'B' },
 { id: '2023-03-S2-Q6', question: 'What does the news report say about French women?', options: ['A) They emphasize food variety.', 'B) They prefer French stick loaves.', 'C) They do more cooking than men.', 'D) They favor diets lower in calories.'], answer: 'D' },
 { id: '2023-03-S2-Q7', question: 'What change in French eating habits is mentioned?', options: ['A) They bake more bread at home.', 'B) They spend less time eating breakfast.', 'C) They eat more fruit than they used to.', 'D) They put jam instead of butter on bread.'], answer: 'B' },
 ],
 },
 {
 id: '2023-03-S2-SecB-1', year: 2023, month: 3, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2023, 3, 1, 466),
 transcript: `M: I'd like to book two tickets to Edinburgh, please.
W: Certainly. When would you like to travel?
M: I'd prefer to travel after the rush hour. I don't like crowded trains.
W: We have several options. Would you like first class or standard?
M: Standard is fine. I'd prefer one window seat if possible. I enjoy the view.
W: Let me check... Yes, I can get you one window seat and one aisle seat. They're together.
M: Perfect. Where should I wait for the train?
W: Your train will depart from platform 5. You should wait at the far end of the platform — that's where your carriage will be.
M: Great. And about my luggage — should I check it in?
W: No need. Just bring it with you and give the ticket to the train guard when you board.
M: Thank you very much.`,
 questions: [
 { id: '2023-03-S2-Q8', question: 'When does the man prefer to travel?', options: ['A) After the rush hour.', 'B) Early in the morning.', 'C) As soon as possible.', 'D) Around lunch time.'], answer: 'A' },
 { id: '2023-03-S2-Q9', question: 'What kind of seat does the man request?', options: ['A) Two first class seats.', 'B) Two seats together.', 'C) One window seat.', 'D) One seat near the exit.'], answer: 'C' },
 { id: '2023-03-S2-Q10', question: 'Where should the man wait according to the woman?', options: ['A) In the middle of the platform.', 'B) At the far end of the platform.', 'C) Behind the yellow line.', 'D) In the waiting room.'], answer: 'B' },
 { id: '2023-03-S2-Q11', question: 'What should the man do with his luggage on boarding?', options: ['A) Wait in a queue for his turn.', 'B) Go to the baggage claim area.', 'C) Pay an extra fee for the service.', 'D) Give the ticket to the train guard.'], answer: 'D' },
 ],
 },
 {
 id: '2023-03-S2-SecB-2', year: 2023, month: 3, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2023, 3, 1, 645),
 transcript: `W: I've been reading about the history of cinemas in London. Did you know that nearly all of the old movie theatres closed down decades ago?
M: Really? That's surprising. What happened to them?
W: Most were turned into other businesses or demolished. But a few have survived.
M: Is there one that still operates today?
W: Yes, there's one famous theatre that shows foreign movies exclusively. It was built in the 1930s and is one of the oldest surviving cinemas in London.
M: Do many English people go to see foreign films there?
W: Not really. The audience is mostly immigrants and international visitors. Many English people don't go to movie theatres often — and those who do tend to prefer mainstream Hollywood films.
M: What about the language barrier?
W: Foreign films shown there have an English translation on the screen, usually in the form of subtitles. That makes them accessible to everyone.`,
 questions: [
 { id: '2023-03-S2-Q12', question: 'What does the woman say about London\'s old movie theatres?', options: ['A) Almost all of them were operating at a deficit.', 'B) They have all been turned into movie theatres.', 'C) Nearly all of them closed down decades ago.', 'D) They have adapted to meet fashion changes.'], answer: 'C' },
 { id: '2023-03-S2-Q13', question: 'What is special about one surviving theatre?', options: ['A) It shows foreign movies exclusively.', 'B) It shows movies from the 1950s.', 'C) It is the oldest theatre in London.', 'D) It is located next to a hat factory.'], answer: 'A' },
 { id: '2023-03-S2-Q14', question: 'What does the woman say about English people regarding foreign films?', options: ['A) They wear hats on social occasions.', 'B) They don\'t speak foreign languages.', 'C) They enjoy watching foreign movies.', 'D) They don\'t go to movie theatres often.'], answer: 'B' },
 { id: '2023-03-S2-Q15', question: 'What makes the foreign films accessible to English audiences?', options: ['A) They are meant mostly for immigrants.', 'B) They attract large crowds of young Londoners.', 'C) They are hard for English people to appreciate.', 'D) They have an English translation on the screen.'], answer: 'D' },
 ],
 },
 {
 id: '2023-03-S2-SecC-1', year: 2023, month: 3, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2023, 3, 1, 854),
 transcript: `A growing number of teachers are changing their attitudes toward smartphones in the classroom. One primary school teacher in London says she now incorporates smartphones into her teaching, rather than banning them. "Children use smartphones every day outside school. We need to teach them how to use these tools responsibly," she explains. She believes that helping children grow up to be professionals means teaching them to use technology wisely, not avoiding it. However, not all educators agree. Some say that children should use books and pens only in class, arguing that traditional methods are more effective for developing focus and concentration. The debate continues as schools try to find the right balance between embracing technology and maintaining educational standards.`,
 questions: [
 { id: '2023-03-S2-Q16', question: 'What does the teacher say about her use of smartphones?', options: ['A) She doesn\'t think smartphones can replace tablets.', 'B) She incorporates smartphones into her teaching.', 'C) She cannot stop children using smartphones.', 'D) She regards smartphones as a distraction.'], answer: 'B' },
 { id: '2023-03-S2-Q17', question: 'What is the teacher\'s goal in using technology?', options: ['A) To enforce school discipline.', 'B) To make students concentrate.', 'C) To help children grow up to be professionals.', 'D) To cultivate children\'s good study habits.'], answer: 'C' },
 { id: '2023-03-S2-Q18', question: 'What do some traditional educators argue students should do?', options: ['A) Use books and pens only.', 'B) Cut down their screen time.', 'C) Make full use of electronic devices.', 'D) Learn to use the internet for research.'], answer: 'A' },
 ],
 },
 {
 id: '2023-03-S2-SecC-2', year: 2023, month: 3, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2023, 3, 1, 1023),
 transcript: `A mother in New Jersey got quite a surprise recently. After asking her six-year-old daughter to help with household chores by washing the windows, she let her daughter use her phone. The daughter, instead of just playing games, opened an online shopping app and ordered a large number of dolls. Each doll cost about $20, and she ordered dozens of them. When the packages started arriving, the mother was confused — she hadn't ordered anything. After checking her account, she discovered what had happened. The mother and daughter ended up with hundreds of dollars worth of dolls. Rather than returning them, they decided to take all of them to the children's hospital, where they were donated to young patients. The story ended happily, with the dolls bringing joy to many children.`,
 questions: [
 { id: '2023-03-S2-Q19', question: 'How did the little girl previously help her mother?', options: ['A) By cleaning the kitchen floor.', 'B) By looking after her baby brother.', 'C) By helping her mother do the dishes.', 'D) By helping her brother wash windows.'], answer: 'D' },
 { id: '2023-03-S2-Q20', question: 'What did the daughter do while using her mother\'s phone?', options: ['A) She ordered a large number of dolls.', 'B) She checked if a purple doll was ordered.', 'C) She mistakenly canceled her mom\'s order.', 'D) She ordered a more expensive doll instead.'], answer: 'A' },
 { id: '2023-03-S2-Q21', question: 'What did the family do with the dolls in the end?', options: ['A) They asked the children\'s hospital to pick them.', 'B) They took all of them to the children\'s hospital.', 'C) They opened all of them one by one.', 'D) They discussed where to keep them.'], answer: 'B' },
 ],
 },
 {
 id: '2023-03-S2-SecC-3', year: 2023, month: 3, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2023, 3, 1, 1181),
 transcript: `A new study from Harvard University has looked into the factors that contribute to people's success later in life. One surprising finding was the importance of the time one starts school. Researchers tracked participants from kindergarten through adulthood and found that children who started school at an older age tended to perform better academically. The purpose of the study was to find causes for differences in the participants' performance. Researchers were particularly interested in what made some people more successful than others. They studied various groups including high-school students, college graduates, and professional athletes. One interesting discovery was the role of risk-taking. Those who were willing to take calculated risks in their careers and personal lives often achieved greater success. Self-confidence was also identified as an important factor, but risk-taking appeared to be the strongest predictor of career advancement.`,
 questions: [
 { id: '2023-03-S2-Q22', question: 'What factor did the study identify as important for later success?', options: ['A) The time one starts school.', 'B) The classroom atmosphere.', 'C) The school that one attends.', 'D) The relationship with classmates.'], answer: 'A' },
 { id: '2023-03-S2-Q23', question: 'What was the purpose of the study?', options: ['A) To help parents decide when to send their children to school.', 'B) To find causes for differences in the participants\' performance.', 'C) To identify students having potential to be professional athletes.', 'D) To offer constructive suggestions for making educational policies.'], answer: 'B' },
 { id: '2023-03-S2-Q24', question: 'Which group was included in the study?', options: ['A) Political leaders.', 'B) Financial analysts.', 'C) Professional athletes.', 'D) High-school students.'], answer: 'D' },
 { id: '2023-03-S2-Q25', question: 'What quality was most strongly linked to career success?', options: ['A) Leadership ability.', 'B) Commitment to work.', 'C) Risk-taking.', 'D) Self-confidence.'], answer: 'C' },
 ],
 },

 // 注：2023年3月第3套听力与第1套完全相同（疫情延考，全国仅考1套听力）
 {
 id: '2023-03-S3-SecA-1', year: 2023, month: 3, setNumber: 3,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2023, 3, 1, 38),
 transcript: `African leaders have agreed to a proposal that would allow Africans to travel throughout the continent without a visa. The African Union, which consists of 55 member states, has been pushing for this initiative for years. Supporters say visa-free travel would boost trade and tourism across Africa. Currently, Africans need visas to visit more than half of African countries. The proposal is expected to make it easier for business people and tourists to move freely. Officials say this policy could help reduce the cost of trade between African countries and create more economic opportunities for the continent's growing population.`,
 questions: [
 { id: '2023-03-S3-Q1', question: 'What do we learn from the news report?', options: ['A) A proposed policy allowing Africans to travel in Africa without a visa.', 'B) An agreement among 13 African countries to set up a free-trade zone.', 'C) A plan to invite all African countries to join the African Union.', 'D) An important initiative to permit tourists to visit Africa without a visa.'], answer: 'A' },
 { id: '2023-03-S3-Q2', question: 'What benefit will the proposal bring according to the news report?', options: ['A) It will attract more investments from all over the world.', 'B) It will help many African countries reduce trade deficits.', 'C) It will reduce the cost of trade between African countries.', 'D) It will allow Africans to play a bigger role in world trade.'], answer: 'C' },
 ],
 },
 {
 id: '2023-03-S3-SecA-2', year: 2023, month: 3, setNumber: 3,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2023, 3, 1, 156),
 transcript: `A team of scientists in Iceland is working on a groundbreaking project to capture carbon dioxide and pump it underground, where it turns into stone. The process involves mixing carbon dioxide with water and injecting it deep into volcanic rock formations. The carbon dioxide reacts with the rock and forms solid carbonate minerals within two years. This method could provide a permanent solution for storing carbon dioxide and fighting climate change. However, the process requires enormous amounts of water. For every ton of carbon dioxide captured, about 25 tons of water are needed. Scientists say that if the high consumption of water can be addressed, this technique could be used at power plants around the world to reduce greenhouse gas emissions.`,
 questions: [
 { id: '2023-03-S3-Q3', question: 'What process does the news report describe?', options: ['A) Cooling down volcanic rock with sea water.', 'B) Storing carbon dioxide underground as a gas.', 'C) Capturing carbon dioxide and burying it under the sea.', 'D) Pumping carbon dioxide underground to form stone.'], answer: 'D' },
 { id: '2023-03-S3-Q4', question: 'What is a challenge facing the carbon capture method?', options: ['A) Lack of burying ground.', 'B) Long time for processing.', 'C) High consumption of water.', 'D) Enormous cost of energy.'], answer: 'C' },
 ],
 },
 {
 id: '2023-03-S3-SecA-3', year: 2023, month: 3, setNumber: 3,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2023, 3, 1, 284),
 transcript: `The French are eating less bread than ever before, according to a new study. The average French person now eats just 90 grams of bread per day, compared with over 200 grams in the 1950s. Bread consumption in France has been on the decline for decades, as more people favor diets lower in calories. Researchers say that women in particular have been eating less bread, likely because they tend to favor lighter, healthier options. Another change is that fewer people are eating traditional French stick loaves. With busier lifestyles, the French are spending less time eating breakfast, which was traditionally a meal where bread played a central role.`,
 questions: [
 { id: '2023-03-S3-Q5', question: 'What do we learn about bread consumption in France?', options: ['A) It varies with the seasons.', 'B) It has been on the decline.', 'C) It has caused nationwide concern.', 'D) It is ninety grams daily on average.'], answer: 'B' },
 { id: '2023-03-S3-Q6', question: 'What does the news report say about French women?', options: ['A) They emphasize food variety.', 'B) They prefer French stick loaves.', 'C) They do more cooking than men.', 'D) They favor diets lower in calories.'], answer: 'D' },
 { id: '2023-03-S3-Q7', question: 'What change in French eating habits is mentioned?', options: ['A) They bake more bread at home.', 'B) They spend less time eating breakfast.', 'C) They eat more fruit than they used to.', 'D) They put jam instead of butter on bread.'], answer: 'B' },
 ],
 },
 {
 id: '2023-03-S3-SecB-1', year: 2023, month: 3, setNumber: 3,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2023, 3, 1, 466),
 transcript: `M: I'd like to book two tickets to Edinburgh, please.
W: Certainly. When would you like to travel?
M: I'd prefer to travel after the rush hour. I don't like crowded trains.
W: We have several options. Would you like first class or standard?
M: Standard is fine. I'd prefer one window seat if possible. I enjoy the view.
W: Let me check... Yes, I can get you one window seat and one aisle seat. They're together.
M: Perfect. Where should I wait for the train?
W: Your train will depart from platform 5. You should wait at the far end of the platform — that's where your carriage will be.
M: Great. And about my luggage — should I check it in?
W: No need. Just bring it with you and give the ticket to the train guard when you board.
M: Thank you very much.`,
 questions: [
 { id: '2023-03-S3-Q8', question: 'When does the man prefer to travel?', options: ['A) After the rush hour.', 'B) Early in the morning.', 'C) As soon as possible.', 'D) Around lunch time.'], answer: 'A' },
 { id: '2023-03-S3-Q9', question: 'What kind of seat does the man request?', options: ['A) Two first class seats.', 'B) Two seats together.', 'C) One window seat.', 'D) One seat near the exit.'], answer: 'C' },
 { id: '2023-03-S3-Q10', question: 'Where should the man wait according to the woman?', options: ['A) In the middle of the platform.', 'B) At the far end of the platform.', 'C) Behind the yellow line.', 'D) In the waiting room.'], answer: 'B' },
 { id: '2023-03-S3-Q11', question: 'What should the man do with his luggage on boarding?', options: ['A) Wait in a queue for his turn.', 'B) Go to the baggage claim area.', 'C) Pay an extra fee for the service.', 'D) Give the ticket to the train guard.'], answer: 'D' },
 ],
 },
 {
 id: '2023-03-S3-SecB-2', year: 2023, month: 3, setNumber: 3,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2023, 3, 1, 645),
 transcript: `W: I've been reading about the history of cinemas in London. Did you know that nearly all of the old movie theatres closed down decades ago?
M: Really? That's surprising. What happened to them?
W: Most were turned into other businesses or demolished. But a few have survived.
M: Is there one that still operates today?
W: Yes, there's one famous theatre that shows foreign movies exclusively. It was built in the 1930s and is one of the oldest surviving cinemas in London.
M: Do many English people go to see foreign films there?
W: Not really. The audience is mostly immigrants and international visitors. Many English people don't go to movie theatres often — and those who do tend to prefer mainstream Hollywood films.
M: What about the language barrier?
W: Foreign films shown there have an English translation on the screen, usually in the form of subtitles. That makes them accessible to everyone.`,
 questions: [
 { id: '2023-03-S3-Q12', question: 'What does the woman say about London\'s old movie theatres?', options: ['A) Almost all of them were operating at a deficit.', 'B) They have all been turned into movie theatres.', 'C) Nearly all of them closed down decades ago.', 'D) They have adapted to meet fashion changes.'], answer: 'C' },
 { id: '2023-03-S3-Q13', question: 'What is special about one surviving theatre?', options: ['A) It shows foreign movies exclusively.', 'B) It shows movies from the 1950s.', 'C) It is the oldest theatre in London.', 'D) It is located next to a hat factory.'], answer: 'A' },
 { id: '2023-03-S3-Q14', question: 'What does the woman say about English people regarding foreign films?', options: ['A) They wear hats on social occasions.', 'B) They don\'t speak foreign languages.', 'C) They enjoy watching foreign movies.', 'D) They don\'t go to movie theatres often.'], answer: 'B' },
 { id: '2023-03-S3-Q15', question: 'What makes the foreign films accessible to English audiences?', options: ['A) They are meant mostly for immigrants.', 'B) They attract large crowds of young Londoners.', 'C) They are hard for English people to appreciate.', 'D) They have an English translation on the screen.'], answer: 'D' },
 ],
 },
 {
 id: '2023-03-S3-SecC-1', year: 2023, month: 3, setNumber: 3,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2023, 3, 1, 854),
 transcript: `A growing number of teachers are changing their attitudes toward smartphones in the classroom. One primary school teacher in London says she now incorporates smartphones into her teaching, rather than banning them. "Children use smartphones every day outside school. We need to teach them how to use these tools responsibly," she explains. She believes that helping children grow up to be professionals means teaching them to use technology wisely, not avoiding it. However, not all educators agree. Some say that children should use books and pens only in class, arguing that traditional methods are more effective for developing focus and concentration. The debate continues as schools try to find the right balance between embracing technology and maintaining educational standards.`,
 questions: [
 { id: '2023-03-S3-Q16', question: 'What does the teacher say about her use of smartphones?', options: ['A) She doesn\'t think smartphones can replace tablets.', 'B) She incorporates smartphones into her teaching.', 'C) She cannot stop children using smartphones.', 'D) She regards smartphones as a distraction.'], answer: 'B' },
 { id: '2023-03-S3-Q17', question: 'What is the teacher\'s goal in using technology?', options: ['A) To enforce school discipline.', 'B) To make students concentrate.', 'C) To help children grow up to be professionals.', 'D) To cultivate children\'s good study habits.'], answer: 'C' },
 { id: '2023-03-S3-Q18', question: 'What do some traditional educators argue students should do?', options: ['A) Use books and pens only.', 'B) Cut down their screen time.', 'C) Make full use of electronic devices.', 'D) Learn to use the internet for research.'], answer: 'A' },
 ],
 },
 {
 id: '2023-03-S3-SecC-2', year: 2023, month: 3, setNumber: 3,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2023, 3, 1, 1023),
 transcript: `A mother in New Jersey got quite a surprise recently. After asking her six-year-old daughter to help with household chores by washing the windows, she let her daughter use her phone. The daughter, instead of just playing games, opened an online shopping app and ordered a large number of dolls. Each doll cost about $20, and she ordered dozens of them. When the packages started arriving, the mother was confused — she hadn't ordered anything. After checking her account, she discovered what had happened. The mother and daughter ended up with hundreds of dollars worth of dolls. Rather than returning them, they decided to take all of them to the children's hospital, where they were donated to young patients. The story ended happily, with the dolls bringing joy to many children.`,
 questions: [
 { id: '2023-03-S3-Q19', question: 'How did the little girl previously help her mother?', options: ['A) By cleaning the kitchen floor.', 'B) By looking after her baby brother.', 'C) By helping her mother do the dishes.', 'D) By helping her brother wash windows.'], answer: 'D' },
 { id: '2023-03-S3-Q20', question: 'What did the daughter do while using her mother\'s phone?', options: ['A) She ordered a large number of dolls.', 'B) She checked if a purple doll was ordered.', 'C) She mistakenly canceled her mom\'s order.', 'D) She ordered a more expensive doll instead.'], answer: 'A' },
 { id: '2023-03-S3-Q21', question: 'What did the family do with the dolls in the end?', options: ['A) They asked the children\'s hospital to pick them.', 'B) They took all of them to the children\'s hospital.', 'C) They opened all of them one by one.', 'D) They discussed where to keep them.'], answer: 'B' },
 ],
 },
 {
 id: '2023-03-S3-SecC-3', year: 2023, month: 3, setNumber: 3,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2023, 3, 1, 1181),
 transcript: `A new study from Harvard University has looked into the factors that contribute to people's success later in life. One surprising finding was the importance of the time one starts school. Researchers tracked participants from kindergarten through adulthood and found that children who started school at an older age tended to perform better academically. The purpose of the study was to find causes for differences in the participants' performance. Researchers were particularly interested in what made some people more successful than others. They studied various groups including high-school students, college graduates, and professional athletes. One interesting discovery was the role of risk-taking. Those who were willing to take calculated risks in their careers and personal lives often achieved greater success. Self-confidence was also identified as an important factor, but risk-taking appeared to be the strongest predictor of career advancement.`,
 questions: [
 { id: '2023-03-S3-Q22', question: 'What factor did the study identify as important for later success?', options: ['A) The time one starts school.', 'B) The classroom atmosphere.', 'C) The school that one attends.', 'D) The relationship with classmates.'], answer: 'A' },
 { id: '2023-03-S3-Q23', question: 'What was the purpose of the study?', options: ['A) To help parents decide when to send their children to school.', 'B) To find causes for differences in the participants\' performance.', 'C) To identify students having potential to be professional athletes.', 'D) To offer constructive suggestions for making educational policies.'], answer: 'B' },
 { id: '2023-03-S3-Q24', question: 'Which group was included in the study?', options: ['A) Political leaders.', 'B) Financial analysts.', 'C) Professional athletes.', 'D) High-school students.'], answer: 'D' },
 { id: '2023-03-S3-Q25', question: 'What quality was most strongly linked to career success?', options: ['A) Leadership ability.', 'B) Commitment to work.', 'C) Risk-taking.', 'D) Self-confidence.'], answer: 'C' },
 ],
 },

 // ================================================================
 // 2024年12月 第1套
 // ================================================================
 {
 id: '2024-12-S1-SecA-1', year: 2024, month: 12, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2024, 12, 1, 36),
 transcript: `The City of Fayetteville is making a special effort to recognize its bus drivers, ahead of the newly proclaimed Transit Driver Appreciation Day, happening Saturday. As part of the event, the city is celebrating its longest serving driver on the force. That driver is Sherry Christian. Christian has been a driver for 25 years. The Fayetteville native believes driving a school bus allows her to give back to her community. She says that the best part of the job is watching the children who ride her bus grow up. Transit Driver Appreciation Day has been celebrated across the country as far back as 2009. However, this week, the City of Fayetteville issued a proclamation for the day to take place March 18th. Officials said they want bus drivers to know how important they are to Fayetteville, serving almost 1.6 million riders a year.`,
 questions: [
 { id: '2024-12-S1-Q1', question: 'What do we learn about Sherry Christian?', options: ['A) She has been a driver for 25 years.', 'B) She was recently promoted to manager.', 'C) She started Transit Driver Appreciation Day.', 'D) She drives a city bus in New York.'], answer: 'A' },
 { id: '2024-12-S1-Q2', question: 'What did city officials of Fayetteville want bus drivers to be aware of?', options: ['A) The new traffic regulations.', 'B) Their importance to the city.', 'C) The upcoming schedule changes.', 'D) Their eligibility for a pay raise.'], answer: 'B' },
 ],
 },
 {
 id: '2024-12-S1-SecA-2', year: 2024, month: 12, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2024, 12, 1, 144),
 transcript: `The Wilton School Board has proposed a 5.99% spending increase. If approved, it would be the largest jump in at least eight budget cycles. The 5.99% request more than doubles the highest previous year over year increase in the last eight years, which was 2.99% for the 2021 to 2022 school year. The biggest driver of the 91.8 million proposed budget remains teachers' salaries. These account for 64% of the total request at 59 million dollars. The 59 million dollars is up from the 56.7 million dollars budgeted for the current school year. There are some factors that could affect the budget moving forward. One of those is total enrollment. The district will have a total enrollment of 3,742 students. Almost all of these students will be in kindergarten through high school, but 66 will be in prekindergarten and other programs. This represents 47 fewer students than the current year. Fewer students mean less federal and state funding.`,
 questions: [
 { id: '2024-12-S1-Q3', question: 'What does the news report say the Wilton School Board has done?', options: ['A) Approved a new curriculum for next year.', 'B) Proposed a 5.99% spending increase.', 'C) Announced plans to build a new school.', 'D) Reduced the number of teaching staff.'], answer: 'B' },
 { id: '2024-12-S1-Q4', question: 'What will a decline in the total enrollment lead to?', options: ['A) Larger class sizes.', 'B) Fewer teachers needed.', 'C) More funding per student.', 'D) Less federal and state funding.'], answer: 'D' },
 ],
 },
 {
 id: '2024-12-S1-SecA-3', year: 2024, month: 12, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2024, 12, 1, 274),
 transcript: `A rare thundersnow event has taken place in Scotland. And alarmed locals contacted police, thinking they had heard bombs going off. The phenomenon happens when thunder and lightning mix with a heavy snowstorm, sometimes causing loud claps that can be confused with explosions. One person described it as a loud boom, similar to a plane crash. Another person was woken up in the middle of the night by what he thought was early construction work starting. The noise was powerful enough to shake buildings and set off car alarms. The police were flooded with many calls from the public. And they sent out a message asking people to remain calm. The police assured everyone that it was just thunder and lightning rather than some military exercise. The weather was the coldest it had been for the season, so people were warned to be careful when traveling outside. In particular, dangerous conditions such as icy roads or wet ground could cause difficulty for drivers. The rail service also announced potential disruptions to trains due to the deep snow. Some roads were also closed because of the severe weather.`,
 questions: [
 { id: '2024-12-S1-Q5', question: 'What do we learn about thundersnows from the report?', options: ['A) They are common in Scotland during winter.', 'B) They can be confused with explosions.', 'C) They usually occur in the early morning.', 'D) They are caused by military exercises.'], answer: 'B' },
 { id: '2024-12-S1-Q6', question: 'What did the police do when they received the local residents\' phone calls?', options: ['A) They evacuated the affected areas.', 'B) They sent out a message asking people to remain calm.', 'C) They called in the military for assistance.', 'D) They closed all roads in the region.'], answer: 'B' },
 { id: '2024-12-S1-Q7', question: 'What were people advised to do when traveling outside?', options: ['A) Stay indoors until the weather cleared.', 'B) Use public transportation only.', 'C) Be careful of dangerous conditions.', 'D) Carry emergency supplies with them.'], answer: 'C' },
 ],
 },
 {
 id: '2024-12-S1-SecB-1', year: 2024, month: 12, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2024, 12, 1, 451),
 transcript: `M: I'm going to the city centre to buy a new phone today.\nW: Didn't you buy a new phone just two months ago?\nM: It was three months ago, and I already know what you're going to say. You're thinking I shouldn't replace my phone this soon.\nW: No, actually, I was wondering how you could possibly afford a new phone. But, now that you mention it, I do think getting another phone so soon is wasteful, regardless of the cost.\nM: Maybe you're right, but the thing is, everyone at the office has a nice, expensive phone, and I'm a little embarrassed by mine. I just got a credit card, so I thought I might as well buy a new phone.\nW: I don't think buying a phone on credit is a good idea. Look, you've only been working for five months now. People understand that you are a recent graduate, and I doubt anyone cares about your phone other than yourself.\nM: Maybe you're right, but the credit card has a very good special offer, where I don't pay any interest for six months. I'll be able to pay for the phone well before that period is over.\nW: I still think it's a bad idea to use a credit card for something you don't need. One of my colleagues bought a lot of things on credit during her first year of work, and it became a bad habit, and she accumulated a lot of debt.\nM: Well, I can see how that might happen to someone, and I'm sure she regrets it, but I know it won't happen to me.`,
 questions: [
 { id: '2024-12-S1-Q8', question: 'What does the woman say she was actually wondering about?', options: ['A) Why the man needed a new phone.', 'B) How the man could afford a new phone.', 'C) What brand of phone the man would buy.', 'D) Whether the man\'s old phone was still working.'], answer: 'B' },
 { id: '2024-12-S1-Q9', question: 'Why is the man embarrassed by his current phone?', options: ['A) It is an old model from three years ago.', 'B) It doesn\'t have the latest features.', 'C) His colleagues have nicer phones.', 'D) It was damaged in an accident.'], answer: 'C' },
 { id: '2024-12-S1-Q10', question: 'What does the man say about the credit card he just got?', options: ['A) It offers no interest for six months.', 'B) It has a very low credit limit.', 'C) It requires a high annual fee.', 'D) It was recommended by his colleague.'], answer: 'A' },
 { id: '2024-12-S1-Q11', question: 'What do we learn about one of the woman\'s colleagues?', options: ['A) She paid off her credit card debt quickly.', 'B) She changed jobs frequently after graduation.', 'C) She accumulated a lot of debt from credit purchases.', 'D) She regretted buying an expensive phone.'], answer: 'C' },
 ],
 },
 {
 id: '2024-12-S1-SecB-2', year: 2024, month: 12, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2024, 12, 1, 626),
 transcript: `W: Welcome to the Morning Show. Our guest today is a popular blog writer and a major figure in the tiny home community. Welcome, Bob Loinbo.\nM: Hi, Mary.\nW: Hi, Bob. You're an advocate of the tiny home movement. A lot of people don't know about this movement. Can you tell our audience what it's about?\nM: Well, it's mainly about increasing home ownership and protecting the environment.\nW: Of course, those are great goals. But I've seen your blog, and you write about houses that are as small as 20 square meters. That's not a realistic size for families.\nM: I do talk about very small homes, but there's no set definition of a tiny home. And other people include homes that are much larger, say, 60 square meters. And you'd be surprised. Many families of four are happy living in houses that are under 30 square meters.\nW: But I think most of us want spacious homes. The average new house in this area is 150 square meters. And that's what people dream of owning.\nM: Yes, but I think that dream needs to change, considering the cost of housing.\nW: Housing costs are high, but do people really save that much by having a smaller home?\nM: Absolutely. Many people who can only afford to rent a larger home are able to buy a tiny home. In this city, the average home costs $200,000, and a tiny home costs just $50,000.\nW: Those are huge savings.\nM: So, tiny homes might not be for everyone, but they're a good option for many.\nW: You mentioned the environment earlier. How does this benefit the planet?\nM: Well, if people have smaller homes, they use less land and fewer resources to build them.`,
 questions: [
 { id: '2024-12-S1-Q12', question: 'What does the tiny home movement mainly advocate?', options: ['A) Building smaller and more affordable houses.', 'B) Increasing home ownership and protecting the environment.', 'C) Reducing construction costs through new technology.', 'D) Encouraging more people to rent instead of buying.'], answer: 'B' },
 { id: '2024-12-S1-Q13', question: 'What does the woman say about houses as small as 20 square meters?', options: ['A) They are too expensive for most families.', 'B) They are popular among young professionals.', 'C) They are not a realistic size for families.', 'D) They are mostly found in big cities.'], answer: 'C' },
 { id: '2024-12-S1-Q14', question: 'What does the man think about the dream of owning a 150-square-meter house?', options: ['A) It is still achievable for most people.', 'B) It needs to change considering housing costs.', 'C) It reflects what people really want in life.', 'D) It should be supported by government policies.'], answer: 'B' },
 { id: '2024-12-S1-Q15', question: 'What does the man say about tiny homes and the environment?', options: ['A) They use less land and fewer resources.', 'B) They help reduce carbon emissions significantly.', 'C) They encourage more sustainable lifestyles.', 'D) They are mostly built with recycled materials.'], answer: 'A' },
 ],
 },
 {
 id: '2024-12-S1-SecC-1', year: 2024, month: 12, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2024, 12, 1, 864),
 transcript: `Kids need time every day to run, jump, stretch and play. These experiences have been shown to build children's confidence and pleasure in physical activities, develop their motor skills and even improve emotional well-being. To begin with, children seem to have a natural desire to overcome challenges and take risks. Taking healthy risks through physical movement builds children's confidence and ability to solve problems and persist through frustration. Secondly, movement activities build children's big body skills such as coordination and balance, as well as the fine motor skills they need for tasks like writing, tying their shoes, or throwing and catching a ball. Thirdly, according to the American Psychological Association, regular physical activity, and especially outdoor activity, reduces children's stress and depression and improves their ability to focus and learn. Regular exercise can significantly improve self-regulation and decrease disciplinary consequences for negative behavior. Physical activity provides a positive outlet for frustration, anxiety or anger and can become a healthy coping skill throughout life. Finally, we know that physical activity is important for our physical and mental health and cultivating the habit of physical activity starts early. Children are more likely to develop a lifelong love of physical activity from frequent positive early experiences. Not every child enjoys competitive sports or playing with balls, and that's okay. There are plenty of other options, such as imaginative play, non-competitive games, and gardening or nature experiences.`,
 questions: [
 { id: '2024-12-S1-Q16', question: 'What do children seem to have a natural desire to do?', options: ['A) Compete with other children.', 'B) Overcome challenges and take risks.', 'C) Spend time outdoors with friends.', 'D) Watch others play before joining in.'], answer: 'B' },
 { id: '2024-12-S1-Q17', question: 'According to the American Psychological Association, what does regular physical activity do to children?', options: ['A) Increases their competitive spirit.', 'B) Helps them make more friends.', 'C) Reduces their stress and depression.', 'D) Improves their academic performance directly.'], answer: 'C' },
 { id: '2024-12-S1-Q18', question: 'What does the passage say about cultivating the habit of physical activity?', options: ['A) It should start in early childhood.', 'B) It requires professional coaching.', 'C) It is most effective through team sports.', 'D) It depends on the child\'s natural ability.'], answer: 'A' },
 ],
 },
 {
 id: '2024-12-S1-SecC-2', year: 2024, month: 12, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2024, 12, 1, 1057),
 transcript: `A new study finds that job seekers are even willing to explore jobs with lower salaries, when companies are more diverse. It finds that sharing information about diversity makes job postings more attractive to job seekers, even when pay is lower. To conduct the study, the team partnered with an online job listings platform, which emails postings relevant to individuals and their job search criteria. For the course of the 11-week study, the platform emailed job listings to some 180,000 users placed in one of two conditions. In the baseline condition, participants saw emails in the normal format, with no information on diversity. In the diversity condition, participants saw a diversity score for each listing, information about the race, gender, education, and language skills of a company's workforce compared to others in the same sector and location. Information was then gathered on whether the email was opened and which job listings were clicked on by each user. Participants in the diversity condition tended to click on job listings from companies with slightly higher diversity scores than those in the baseline condition. That is, participants seemed to be paying attention to information about diversity, and using this, when deciding whether to click on the listing. And the team also found that participants were willing to look at listings with lower salaries, if they came from companies with a higher diversity score.`,
 questions: [
 { id: '2024-12-S1-Q19', question: 'When are job seekers willing to explore jobs with lower salaries, according to a new study?', options: ['A) When the job offers more flexible hours.', 'B) When companies are more diverse.', 'C) When the position has more responsibility.', 'D) When the company is located nearby.'], answer: 'B' },
 { id: '2024-12-S1-Q20', question: 'What did participants see in the baseline condition of the study?', options: ['A) Only the highest-paying job listings.', 'B) Job listings with diversity scores included.', 'C) Emails in the normal format with no diversity information.', 'D) Job listings from the most diverse companies only.'], answer: 'C' },
 { id: '2024-12-S1-Q21', question: 'What does the passage say participants seem to be paying attention to?', options: ['A) The company\'s location.', 'B) The salary range offered.', 'C) Information about diversity.', 'D) The job title and description.'], answer: 'C' },
 ],
 },
 {
 id: '2024-12-S1-SecC-3', year: 2024, month: 12, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2024, 12, 1, 1233),
 transcript: `A new study from Oregon State University found that dogs tend to match their behavior with the children in their family. The findings are important because there is a growing body of evidence that dogs can help children in many ways. These include helping with social development, increasing physical activity, managing anxiety or serving as a source of attachment in the face of changing family structures. Yet very little research has focused on how dogs perceive and socially engage with children. The great news is that this study suggests dogs are paying a lot of attention to the kids that they live with, said Monique Oudel, the lead author of the study. One interesting thing we have observed is that dogs are matching children's behavior, but less frequently than what we have seen between dogs and adults. This suggests that while dogs may view children as social companions, there are also some differences that we need to understand better. While research has found dogs can have a lot of positive impacts on a child's life, there are also risks associated with a dog-child relationship. For example, other studies have found dogs are more likely to bite children versus adults. We still have a lot to learn about the dog-child relationship, she said, but research does show that kids are very capable of training dogs.`,
 questions: [
 { id: '2024-12-S1-Q22', question: 'What does the passage say about the findings of a new study from Oregon State University?', options: ['A) Dogs are more intelligent than previously thought.', 'B) Dogs tend to match their behavior with children.', 'C) Children learn faster when interacting with dogs.', 'D) Dogs prefer adult companionship over children.'], answer: 'B' },
 { id: '2024-12-S1-Q23', question: 'What does a growing body of evidence show, according to the passage?', options: ['A) Dogs can help children in many ways.', 'B) Children who have dogs are healthier.', 'C) Dogs need special training to be around kids.', 'D) Children are naturally afraid of dogs.'], answer: 'A' },
 { id: '2024-12-S1-Q24', question: 'What did Monique Oudel say their study suggests?', options: ['A) Dogs are paying a lot of attention to children they live with.', 'B) Dogs prefer to interact with adults rather than children.', 'C) Children are better at training dogs than adults are.', 'D) Dogs behave differently around boys and girls.'], answer: 'A' },
 { id: '2024-12-S1-Q25', question: 'What does research show kids are very capable of doing?', options: ['A) Understanding dogs\' emotions.', 'B) Training dogs.', 'C) Protecting themselves from dog bites.', 'D) Teaching dogs new tricks quickly.'], answer: 'B' },
 ],
 },

 // ================================================================
 // 2024年12月 第2套
 // ================================================================
 {
 id: '2024-12-S2-SecA-1', year: 2024, month: 12, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2024, 12, 2, 37),
 transcript: `Across the U.S., families are looking to the winter with fear, as energy costs soar. A number of factors are creating a bad situation. Global energy consumption is up, but supplies have been reduced. The Energy Department projects heating bills will jump 28% this winter, for those who rely on natural gas. Natural gas is used by nearly half of U.S. households for heat. Heating oil is projected to be 27% higher and electricity 10% higher. That comes against inflation rates that accelerated last month, with consumer prices growing 6.6%. That's the fastest pace in four decades. The pain will be especially acute in parts of the country that heavily rely on heating oil to keep homes warm. It's projected to cost more than $2,300 to heat a typical home with heating oil this winter. Last month, the federal government added $1 billion in funding to Low Income Home Energy Assistance Program, bringing the total to $4.8 billion. But that represents a reduction from last year's energy assistance package of over $8 billion.`,
 questions: [
 { id: '2024-12-S2-Q1', question: 'Why are families across the U.S. looking to this winter with fear?', options: ['A) Energy costs are soaring.', 'B) There is a shortage of natural gas.', 'C) The winter is expected to be unusually cold.', 'D) The government has reduced energy subsidies.'], answer: 'A' },
 { id: '2024-12-S2-Q2', question: 'What did the federal government do last month?', options: ['A) Reduced taxes on home heating oil.', 'B) Added $1 billion in funding to a home energy assistance program.', 'C) Announced price controls on natural gas.', 'D) Launched a campaign to encourage energy conservation.'], answer: 'B' },
 ],
 },
 {
 id: '2024-12-S2-SecA-2', year: 2024, month: 12, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2024, 12, 2, 166),
 transcript: `Many Americans think they make healthy food choices, but they may be viewing their diet too optimistically. That's the main finding of a new study by researchers at the U.S. Department of Agriculture in Stoneville, Mississippi. The study aimed to identify disconnects between how healthily Americans think they eat and how they actually do. For the study, the researchers asked participants to rate their diet as excellent, very good, good, fair, or poor. Folks also completed 24-hour food questionnaires. Then, the researchers compared answers to see how well responses to the two exercises matched up. Of more than 9,700 people, roughly 85 percent were off base when asked to rate the quality of their diet, and almost all overestimated how healthy it was. Those who rated their diet as poor tended to be far more accurate. Their rating matched that of the researchers more than nine times out of ten.`,
 questions: [
 { id: '2024-12-S2-Q3', question: 'What is the main finding of a new study about many Americans?', options: ['A) They eat more junk food than they admit.', 'B) They consume too many processed foods.', 'C) They may be viewing their diet too optimistically.', 'D) They are unaware of basic nutrition facts.'], answer: 'C' },
 { id: '2024-12-S2-Q4', question: 'Who tended to rate their diet more accurately in the survey?', options: ['A) Those who rated their diet as poor.', 'B) Those who had a college education.', 'C) Those who were over 50 years old.', 'D) Those who regularly read food labels.'], answer: 'A' },
 ],
 },
 {
 id: '2024-12-S2-SecA-3', year: 2024, month: 12, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2024, 12, 2, 285),
 transcript: `It was a heartwarming moment that dozens of Indian rescuers rallied together to use a crane in order to save an elephant trapped at the bottom of a twenty-foot well. The massive rescue effort took place last week close to an army camp. The elephant wandered out of the jungle and fell into the well. The army officers heard a noise coming from the well and realized an elephant was trapped deep inside. The officers then threw in some food for the creature and called the local forest department for help. Video of the rescue operation shows how the team used a crane to lift up the huge animal out of the well and onto the back of a truck. It was then taken to an examining room for evaluation of any injuries. The elephant was kept under close supervision for a few days before it was successfully released back into the wild.`,
 questions: [
 { id: '2024-12-S2-Q5', question: 'What does the report say dozens of Indians did last week?', options: ['A) Protested against deforestation.', 'B) Raised money for wildlife protection.', 'C) Helped rescue an elephant trapped in a well.', 'D) Built a new shelter for injured animals.'], answer: 'C' },
 { id: '2024-12-S2-Q6', question: 'Why did the army officers call the local forest department?', options: ['A) To report illegal logging in the area.', 'B) To get help rescuing a trapped elephant.', 'C) To ask for permission to enter the forest.', 'D) To request funding for a wildlife program.'], answer: 'B' },
 { id: '2024-12-S2-Q7', question: 'What does the news report say happened finally?', options: ['A) The elephant was sent to a zoo for care.', 'B) The elephant died from its injuries.', 'C) The elephant was adopted by the army camp.', 'D) The elephant was released back into the wild.'], answer: 'D' },
 ],
 },
 {
 id: '2024-12-S2-SecB-1', year: 2024, month: 12, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2024, 12, 2, 444),
 transcript: `M: I need to stop at the bank to withdraw some cash.\nW: Why not just pay with your phone?\nM: Well, actually, I've stopped using online payments for the past three months now.\nW: Stopped paying online? Oh, you must be worried that online payments aren't secure.\nM: No, they are safe. But paying online is too convenient and I spent too much money on things I didn't need.\nW: Oh, impulse purchases can be an issue for me too. I've definitely bought clothes and shoes I didn't need because they were on sale, and paying with my phone was so easy. But I've found that if I review my spending every night, that keeps me from spending too much.\nM: I tried that strategy, but it just didn't work, because I'd be busy studying all day. Then, when I was tired and hungry, I'd use my phone to order food, like burgers and other junk, instead of going to the canteen, where I could get a healthier meal for half the price.\nW: Well, what do you do now then? It seems like you'd have the same problems with cash.\nM: I go to the bank once a week, and the rest of the time I keep my bank card at home, so I can't get more cash out. And I also have a notebook where I record my expenses.\nW: But what prevents you from just going to the bank and getting more money, if you want to buy something?\nM: The first month I did withdraw extra cash twice, but I felt guilty about it. And after that I refused to spend more than what I had budgeted, and by now it's just a habit.`,
 questions: [
 { id: '2024-12-S2-Q8', question: 'Why has the man stopped paying online for the last three months?', options: ['A) He is worried about online security.', 'B) He spent too much money on unnecessary things.', 'C) His bank card was stolen recently.', 'D) He wants to support local businesses with cash.'], answer: 'B' },
 { id: '2024-12-S2-Q9', question: 'What problem does the woman say she may also have?', options: ['A) Forgetting to check her bank balance.', 'B) Losing her credit card frequently.', 'C) Impulse purchases.', 'D) Ordering too much takeout food.'], answer: 'C' },
 { id: '2024-12-S2-Q10', question: 'What does the man say he could do at the canteen?', options: ['A) Get a healthier meal for half the price.', 'B) Meet his friends more conveniently.', 'C) Pay with cash instead of his phone.', 'D) Study while eating his meals.'], answer: 'A' },
 { id: '2024-12-S2-Q11', question: 'What is now just a habit for the man?', options: ['A) Going to the bank once a week.', 'B) Keeping track of all his expenses.', 'C) Refusing to spend more than what he budgeted.', 'D) Using his phone only for emergencies.'], answer: 'C' },
 ],
 },
 {
 id: '2024-12-S2-SecB-2', year: 2024, month: 12, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2024, 12, 2, 627),
 transcript: `M: Please hear me out. I don't want our son to spend his afternoons doing something he hates, even if it might prepare him for the future. What about getting him to join a sport, like soccer? From all the running and training, he could become quite athletic. Not to mention the great physical benefits from exercising outside every day.\nW: I don't think he should be doing something so challenging with all his breathing issues. What about playing an indoor sport, like badminton? The environment is easier to control, and he can still get a good workout, in addition to improving his hand-eye coordination. Besides, I could teach him some of the basics from my time as a badminton player.\nM: Um, I'm thinking team sports should be the way to go. There's nothing like playing as part of a unit to accomplish a goal like winning a game or even a championship. He could try basketball since many of the courts are indoors now and it's a sport that could help him understand team spirit while cooperating with others. Maybe he could even join the school basketball team when he's ready.\nW: Oh, oh, what about volleyball? It's a team sport and they often have mixed gender teams so he could socialize with both girls and boys. It's not as popular as some sports, which means he has better odds of possibly getting an athletic scholarship in the future. I also believe you were a beach volleyball athlete yourself not so long ago.\nM: As I've said many times before, beach volleyball and indoor volleyball are completely different.`,
 questions: [
 { id: '2024-12-S2-Q12', question: 'Why is the woman opposed to their son joining a sport like soccer?', options: ['A) She thinks soccer is too dangerous.', 'B) She worries about his breathing issues.', 'C) She believes soccer requires too much time.', 'D) She prefers individual sports for him.'], answer: 'B' },
 { id: '2024-12-S2-Q13', question: 'What does the man suggest their son try in order to understand team spirit?', options: ['A) Soccer.', 'B) Badminton.', 'C) Basketball.', 'D) Volleyball.'], answer: 'C' },
 { id: '2024-12-S2-Q14', question: 'What is one of the woman\'s considerations in choosing a sport for her son?', options: ['A) The cost of equipment and training.', 'B) The popularity of the sport at school.', 'C) The possibility of getting an athletic scholarship.', 'D) The time commitment required for practice.'], answer: 'C' },
 { id: '2024-12-S2-Q15', question: 'What does the man say about beach volleyball?', options: ['A) It is completely different from indoor volleyball.', 'B) It is more popular than indoor volleyball.', 'C) It requires more skill than indoor volleyball.', 'D) It is his favorite sport to play.'], answer: 'A' },
 ],
 },
 {
 id: '2024-12-S2-SecC-1', year: 2024, month: 12, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2024, 12, 2, 851),
 transcript: `Liftoff is usually the most environmentally harmful stage of any space mission, with vast quantities of fuel burnt up in a matter of minutes. For instance, SpaceX's Falcon 9 gets through 112 tons of refined fuel, emitting about 336 tons of CO2. This is the equivalent produced by your average car driving almost 70 times around the world, as well as greenhouse gases. Rocket engines emit particles that destroy ozone. These issues are growing more pressing with the emergence of commercial spaceflight. There were 114 space launches in 2020, but there may be up to 1,000 per year in future. Sustainable fuels are the top priority to enable greener space travel. Current spacecraft use a variety of fuels, but most are based on fossil fuels. One potentially greener option is liquid hydrogen and oxygen. Hydrogen can be obtained sustainably by using solar power to break water down into oxygen and hydrogen. Reusable rockets can cut down on some of the waste associated with spaceflight. Traditionally, boosters, fuel tanks, and other components are treated as expendable. But guiding them back to Earth in a controlled manner opens new possibilities. Most components from the Falcon 9 can be reused up to 100 times. Truly environmentally friendly space travel is still some way off. But we already have many of the technologies needed to start limiting its impact on our planet.`,
 questions: [
 { id: '2024-12-S2-Q16', question: 'What do we learn from the passage about the liftoff of spacecraft?', options: ['A) It is the most expensive part of space missions.', 'B) It is usually the most environmentally harmful stage.', 'C) It has become much safer in recent years.', 'D) It requires more fuel than the entire rest of the mission.'], answer: 'B' },
 { id: '2024-12-S2-Q17', question: 'What happens traditionally to boosters, fuel tanks, and other components in spaceflight?', options: ['A) They are recycled for use in other missions.', 'B) They are sent into deep space.', 'C) They are treated as expendable.', 'D) They are stored in orbit for future use.'], answer: 'C' },
 { id: '2024-12-S2-Q18', question: 'What does the passage say we already have regarding spaceflight?', options: ['A) Fully reusable rocket systems.', 'B) Technologies to limit its environmental impact.', 'C) A global agreement on sustainable space travel.', 'D) Completely green fuel alternatives.'], answer: 'B' },
 ],
 },
 {
 id: '2024-12-S2-SecC-2', year: 2024, month: 12, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2024, 12, 2, 1036),
 transcript: `Helping to look after a pet can facilitate numerous aspects of a child's emotional development. Research shows that reading to a loyal and nonjudgmental companion, such as a dog or cat, can encourage reluctant readers to read aloud, which will in turn boost their self-confidence. Having a companion to talk to about their feelings can also help children feel secure and develop communication skills. A household pet can also cultivate a child's sense of responsibility, as their parent explains the necessary processes of keeping their pet happy and healthy. As a child matures, they can then take on more of the daily responsibilities, boosting their sense of independence. Pets also provide a fantastic subject for research and learning. Parents can encourage their child to research their favorite pets at the library or during a supervised internet search. Taking children along to the pet shop to buy food and supplies will support their cognitive development as their passion for learning flourishes. A child's physical development can benefit greatly from taking pets for walks in the fresh air. Even their fine motor skills can be utilized in taking care of a beloved animal. When responsibilities are well paced and communicated, a child can benefit greatly from involvement in bringing up a happy and healthy pet. And of course, if a child doesn't have a pet in their own household, they can still benefit from all of the above when visiting a friend who does.`,
 questions: [
 { id: '2024-12-S2-Q19', question: 'What does research show about reading to a loyal and nonjudgmental companion?', options: ['A) It can encourage reluctant readers to read aloud.', 'B) It is most effective for children under five.', 'C) It improves children\'s academic performance quickly.', 'D) It works better with dogs than with cats.'], answer: 'A' },
 { id: '2024-12-S2-Q20', question: 'How can parents make pets a fantastic subject for their children\'s research and learning?', options: ['A) By buying them books about animal care.', 'B) By encouraging research at the library or online.', 'C) By taking them to visit a veterinarian regularly.', 'D) By enrolling them in pet training classes.'], answer: 'B' },
 { id: '2024-12-S2-Q21', question: 'How can children still benefit even when their family doesn\'t have a pet?', options: ['A) By watching educational programs about animals.', 'B) By volunteering at a local animal shelter.', 'C) By visiting a friend who has a pet.', 'D) By reading books about different animals.'], answer: 'C' },
 ],
 },
 {
 id: '2024-12-S2-SecC-3', year: 2024, month: 12, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2024, 12, 2, 1216),
 transcript: `A new bill in the Ohio legislature would require state public colleges and universities to send prospective students a packet of information. This would include costs of college grants and scholarships. It would also include expected monthly loan payments and projected salary after college. State Representative Adam Loinbo is one of the two legislators who proposed the bill. He said it would give prospective students more information about what to expect once they graduate. "Putting that information in front of them will give them the best opportunity to match their skills and their dreams to what our schools can provide," said Loinbo. He notes that the state can only regulate public institutions in this way, but he hopes private institutions in Ohio follow the lead of the state and post similar information. He believes giving out this information will help Ohio's colleges and universities to be more competitive. The information will highlight what a great value they have for their very reasonable cost. Ohio's schools are already competitive. The state attracts more undergraduate students than it sends to colleges out of state. Many colleges and universities currently provide similar information on their websites. This includes tuition, fees, graduation rates, and more. But students need to search for the information. This bill would require the universities and colleges to send a packet directly to students.`,
 questions: [
 { id: '2024-12-S2-Q22', question: 'What would the new bill in the Ohio legislature require public colleges and universities to do?', options: ['A) Reduce tuition fees for in-state students.', 'B) Send prospective students a packet of information.', 'C) Increase the number of scholarships offered.', 'D) Provide more online courses for students.'], answer: 'B' },
 { id: '2024-12-S2-Q23', question: 'What can the state only do according to Adam Loinbo?', options: ['A) Regulate public institutions.', 'B) Provide funding for private colleges.', 'C) Set tuition limits for all universities.', 'D) Require standardized testing for admission.'], answer: 'A' },
 { id: '2024-12-S2-Q24', question: 'What do we learn about Ohio\'s schools from the passage?', options: ['A) They have the lowest tuition in the country.', 'B) They are already competitive.', 'C) They need significant reform.', 'D) They primarily serve out-of-state students.'], answer: 'B' },
 { id: '2024-12-S2-Q25', question: 'What is the problem with schools providing information on their websites?', options: ['A) The information is often outdated.', 'B) Students need to search for the information.', 'C) Not all schools have websites.', 'D) The information is difficult to understand.'], answer: 'B' },
 ],
 },

 // ================================================================
 // 2022年6月 第1套 (mp3待下载)
 // ================================================================
 {
 id: '2022-06-S1-SecA-1', year: 2022, month: 6, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2022, 6, 1, 39),
 transcript: `A new study finds that beverages containing added sugar might be harmful. In the study, researchers analyzed information from over 80,000 women and 37,000 men. Participants worked in the health profession. They were followed for approximately three decades. They completed surveys about their diet every four years. They also answered questions about sleep and exercise and health every two years. The more beverages containing added sugar that people drank, the greater their risk of death was during the study period. These beverages included soda? energy drinks and sports drinks. Beverages like pure fruit juice which are sweet but do not contain added sugar were not part of the study. The findings held even after the researchers considered other factors that could affect people's health. These factors included lack of exercise and not eating enough vegetables. They also included consuming too much meat. Th scientists say that their results support limiting beverages with added sugar. They argue we should replace them with other drinks, with water being the best choice. However, the researchers admit this is simply their recommendation. The study found only an association ： It did not prove that drinks with added sugar cause early death.`,
 questions: [
 { id: '2022-06-S1-Q1', question: 'What do we learn about the new study from the news report?', options: ['A) It focused on women\'s health exclusively.', 'B) It collected data through in-person interviews.', 'C) It was conducted over a period of 15 years.', 'D) It ran for as long as some thirty years.'], answer: 'D' },
 { id: '2022-06-S1-Q2', question: 'What is the scientists\' recommendation?', options: ['A) Drink more pure fruit juice instead.', 'B) Drinking water instead of beverages with added sugar.', 'C) Exercise more to offset the effects of sugar.', 'D) Limit all types of sweet beverages equally.'], answer: 'B' },
 ],
 },
 {
 id: '2022-06-S1-SecA-2', year: 2022, month: 6, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2022, 6, 1, 178),
 transcript: `German police appealed Friday for information about the possible owners of two 17th-century oil paintings. Police said a 64-year-old man found the paintings in a garbage pile at a highway rest stop last month. He later handed them in to the Cologne police. An initial assessment by an art expert concluded the two framed paintings were originals, police said. One is a landscape painted by the Italian artist Pietro Bellotti dating to 1665. The other is a painting of a boy by the 17th-century Dutch artist Samuel van Hoogstraten, date unknown. Their combined worth is estimated to be around one million euros. Authorities have not yet confirmed what will happen if the rightful owner is not found.`,
 questions: [
 { id: '2022-06-S1-Q3', question: 'What did German police say about a 64-year-old man?', options: ['A) He was arrested for art theft.', 'B) He claimed ownership of the paintings.', 'C) He tried to sell paintings to a museum.', 'D) He found two 17th-century oil paintings.'], answer: 'D' },
 { id: '2022-06-S1-Q4', question: 'What is the art expert\'s conclusion about the two framed paintings?', options: ['A) They were painted by the same artist.', 'B) They are originals.', 'C) They are worth around 2 million Euros.', 'D) They were stolen from a museum.'], answer: 'B' },
 ],
 },
 {
 id: '2022-06-S1-SecA-3', year: 2022, month: 6, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2022, 6, 1, 292),
 transcript: `A four-year-old girl has walked eight kilometers through a snowy forest to seek help for her sick grandmother who later died of a heart attack. The young girl braved the threat of bears, wolves and temperatures far below freezing. She made the journey through a remote region in Siberia after waking up to find her grandmother motionless. Named locally as Karla, she lives alone with her elderly grandmother and her blind grandfather. As a result, the girl's mother is facing a criminal case. She stands accused of leaving a minor in danger in the care of the elderly. She also faces investigation from childcare services, who will also be asking why Karla was left alone with her vulnerable relatives. The journey took place in February when temperatures average negative 26 degrees Celsius. Russian reports on social media suggest the forest may have been as cold as negative 34 degrees Celsius. The journey was only recently confirmed by authorities. But though she was suffering from the effects of extreme cold, the child reportedly suffered no life- threatening effects. Last year, a three-year-old boy survived alone for three days in a remote forest in the same region.`,
 questions: [
 { id: '2022-06-S1-Q5', question: 'What did the 4-year-old girl attempt to do?', options: ['A) Find her way home in a snowstorm.', 'B) Escape from a dangerous forest fire.', 'C) Save her sick grandmother.', 'D) Follow her mother to the city.'], answer: 'C' },
 { id: '2022-06-S1-Q6', question: 'What do we learn from the news report about the girl\'s mother?', options: ['A) She has to face a criminal charge.', 'B) She was also lost in the forest.', 'C) She had passed away earlier that year.', 'D) She was working in another city.'], answer: 'A' },
 { id: '2022-06-S1-Q7', question: 'What happened to the little girl according to the news report?', options: ['A) She was hospitalized for a month.', 'B) She was reunited with her mother.', 'C) She suffered from the effects of severe cold.', 'D) She received a bravery award from the government.'], answer: 'C' },
 ],
 },
 {
 id: '2022-06-S1-SecB-1', year: 2022, month: 6, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2022, 6, 1, 506),
 transcript: `W ： Fve made a new friend recently. Her name is Susan and she's from South Africa. M： How did you meet her? W ： We met over WeChat. She has very cool photos on her social media. The photos of her hometown look amazing. M： What's her hometown called? W ： It's called Cape Town. It's in the southwest of South Africa. She says it5s very green and windy. The city was built by European settlers. And there?s a big mountain that overlooks the c ity .⑼The mountain is called Table Mountain because it's flat at the top. M： That sounds interesting. What are the people there like? W ： Well, Susan says South Africa is very mixed. There are black people and white people and Indian people. (lO)Susan is white. She says her ancestors were from Britain. Many languages are spoken in South Africa, but she only speaks English. M： Didn't South Africa host the Football World Cup a few years ago? They must play football a lot then, right? W ： I think they play football, but it's not as popular as rugby. M： Rugby? What's rugby? W： Rugby is a sport with two teams and the players carry the ball in their arms and throw it at each other. The ball is not round and the players push each other. I don't really understand the rules. I think it's very complicated. M： That sounds like a very strange sport indeed.`,
 questions: [
 { id: '2022-06-S1-Q8', question: 'What does the woman say about her new friend Susan?', options: ['A) She works in the tourism industry.', 'B) She speaks several African languages.', 'C) She comes from the city of Cape Town.', 'D) She moved to China for her studies.'], answer: 'C' },
 { id: '2022-06-S1-Q9', question: 'What does the woman say about Table Mountain?', options: ['A) It is the tallest mountain in Africa.', 'B) It has a flat surface at the top.', 'C) It was named by British settlers.', 'D) It is covered with snow year-round.'], answer: 'B' },
 { id: '2022-06-S1-Q10', question: 'What do we learn from the conversation about the woman\'s friend Susan?', options: ['A) She has British ancestors.', 'B) She speaks four languages.', 'C) She is of Indian descent.', 'D) She moved to Cape Town as a child.'], answer: 'A' },
 { id: '2022-06-S1-Q11', question: 'What does the woman say about rugby in South Africa?', options: ['A) It originated in South Africa.', 'B) It is only played by white people.', 'C) It has very simple rules.', 'D) It is more popular than football.'], answer: 'D' },
 ],
 },
 {
 id: '2022-06-S1-SecB-2', year: 2022, month: 6, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2022, 6, 1, 686),
 transcript: `M ： Hi, Jennifer. I'm really struggling with this semester's workload. Do you have any advice? W ： Have you considered making a study guide? It's a tool you can make yourself to take the stress out of studying. Fve been using one since the start of last semester, and it has really helped relieve a lot of study pressure. M： Sounds like just what I need. My main problem is that my study folder is full of notes and worksheets, and is badly disorganized. I don't know where to start. W ： Okay. Well, the main thing is to have everything in the right place. Whatever you're reviewing, it's important that it's arranged for your particular needs of that subject? and in the most user-friendly way you can. What kind of learner are you? M ： Um, I'm not sure. W ： Well, visual learners prefer using images, pictures, colors, and maps to organize information. Logical learners have a linear mind and would rather use logic, reasoning and systems. I'm an emotional learner, which means I need to connect to information emotionally to understand it. M ： Oh! I'm very much dependent on vision as a way of taking in information. W ： Well, I suggest reorganizing your notes using color-coded sections in your study guides, or using idea mapping to lay out the infonnation and make it more quickly accessible. M ： So you think I should arrange my notes using color and pictures in place of text. W ： Yes? you'll probably start to grasp information a lot quicker that way. As an emotional learner, I organize my notes into a story that I can connect to and recite to myself. M ： That's amazing. I didn't know there were so many different ways to learn.`,
 questions: [
 { id: '2022-06-S1-Q12', question: 'What does the woman advise the man do?', options: ['A) Prepare a study guide.', 'B) Take fewer courses this semester.', 'C) Join a study group on campus.', 'D) Talk to his professors about the workload.'], answer: 'A' },
 { id: '2022-06-S1-Q13', question: 'What is the biggest problem the man has with his studies?', options: ['A) He cannot focus during lectures.', 'B) He has too many exams to prepare for.', 'C) His study folder is badly disorganized.', 'D) He spends too much time on extracurricular activities.'], answer: 'C' },
 { id: '2022-06-S1-Q14', question: 'What kind of learner does the woman say she is?', options: ['A) A visual learner.', 'B) An emotional learner.', 'C) A logical learner.', 'D) A physical learner.'], answer: 'B' },
 { id: '2022-06-S1-Q15', question: 'What does the woman think the man can do with his notes?', options: ['A) Arrange them using color and pictures.', 'B) Type them up on his computer.', 'C) Share them with classmates.', 'D) Store them in separate folders.'], answer: 'A' },
 ],
 },
 {
 id: '2022-06-S1-SecC-1', year: 2022, month: 6, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2022, 6, 1, 940),
 transcript: `The golden rule is a moral principle which states that you should treat others the way you want to be treated yourself. For example, if you want people to treat you with respect, you should treat them with respect. Different people tend to be exposed to different forms of the golden rule, based on factors such as the religion in their society. However, all forms of the golden rule revolve around the same concept. Namely, they help you treat others better, by using the way you yourself would want to be treated as a guide of how to behave. A notable criticism of the golden rule is that its application can lead to undesirable outcomes, when it conflicts with laws and ethical principles. For example, if someone breaks the law, the golden rule would suggest that we should let them go, because we would not want to be punished ourselves. However, this issue with the golden rule can be dealt with in a general manner, by viewing this principle as one of several principles that we use to guide our behavior as individuals and as a society. Specifically, in the example described above, most individuals and societies choose to place laws and ethical principles above the golden rule.`,
 questions: [
 { id: '2022-06-S1-Q16', question: 'What is the Golden Rule according to the passage?', options: ['A) A religious practice in Western cultures.', 'B) A principle found only in Christianity.', 'C) A rule about financial management.', 'D) It is a moral principle to guide people\'s behavior.'], answer: 'D' },
 { id: '2022-06-S1-Q17', question: 'What is a drawback of the Golden Rule mentioned in the passage?', options: ['A) It only applies in Western societies.', 'B) It is too difficult for most people to understand.', 'C) It may sometimes produce undesirable outcomes.', 'D) It has been rejected by most modern philosophers.'], answer: 'C' },
 { id: '2022-06-S1-Q18', question: 'What does the passage say about the Golden Rule?', options: ['A) It should be applied universally without exception.', 'B) The golden rule must sometimes give way to more important principles.', 'C) It is no longer relevant in modern society.', 'D) It only applies to religious contexts.'], answer: 'B' },
 ],
 },
 {
 id: '2022-06-S1-SecC-2', year: 2022, month: 6, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2022, 6, 1, 1115),
 transcript: `Today, many large corporations stress the importance of diversity on their websites, but current statistics show that the typical manager in America still tends to be white and male. Obviously, the desire to bring about diversity has not translated into corporate reality. Why useless? A team of researchers from the University of Basel published their new study about people's attitudes towards diversity at work. They found that people have a wide range of opinions concerning diversity. On the one hand, many see value in diversity, which can contribute a variety of perspectives, encourage new ideas, and generate innovative solutions. On the other hand, they assume that it might be difficult to work with someone who has completely different views, speaks a different language, or has a different style of work. The actual value they attribute to diversity depends on the decision-making perspective. Doubts about the practicability of diversity have a greater weight if a person is directly affected. In other words, when a person's own work group is involved, they tend to prefer team members who are similar to themselves. But when people make decisions for others, they typically put together a more diverse team. These findings could help organizations become more diverse. Companies need to pay attention to who makes hiring and team decisions. These decisions should not only be made by those directly affected. People who are not directly involved in the group's daily work should also take part.`,
 questions: [
 { id: '2022-06-S1-Q19', question: 'What do we learn from the current statistics about diversity in large corporations?', options: ['A) Diversity has increased significantly in recent years.', 'B) They have not seen as much diversity as desired.', 'C) Women now occupy most management positions.', 'D) Most companies have achieved their diversity goals.'], answer: 'B' },
 { id: '2022-06-S1-Q20', question: 'What is the newly published study focused on?', options: ['A) The economic benefits of diversity.', 'B) The history of workplace discrimination.', 'C) People\'s attitudes towards diversity at the workplace.', 'D) The effectiveness of diversity training programs.'], answer: 'C' },
 { id: '2022-06-S1-Q21', question: 'What do the findings of the new study show?', options: ['A) People prefer to work with team members similar to themselves.', 'B) Diverse teams are always more productive than homogeneous ones.', 'C) Most managers actively seek to hire diverse candidates.', 'D) Diversity training significantly changes people\'s attitudes.'], answer: 'A' },
 ],
 },
 {
 id: '2022-06-S1-SecC-3', year: 2022, month: 6, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2022, 6, 1, 1337),
 transcript: `Communication can essentially be divided into two categories： the written and the spoken. How the balance is struck between these two forms of communication- - the point at which one needs to be exchanged for another- really depends on individual cultures. Understanding when it's appropriate to exchange one form for another can be a major key to success in international business. Many cultures place a much greater value on the spoken word than the American working culture does. In parts of the Middle East, you'll find spoken word agreements are seen as seriously binding. A person's word is linked to their honor, so verbal agreements are seen as important, whereas written contracts are taken as memos of understanding. Western working culture tends to place a high value on the written word, and this reaches its highest level of intensity when it comes to contracts. In the US, France and Germany, written contracts tend to be seen as something that must be strictly carried out. By contrast, other cultures may not see written contracts as quite so binding. It can prove a challenge to Western businesses if your business partner wants to renegotiate terms that you thought were already agreed on. For example, a Japanese firm may have signed a contract, but they may not feel bound by every detail of it—particularly if circumstances later change.`,
 questions: [
 { id: '2022-06-S1-Q22', question: 'What is the passage mainly about?', options: ['A) The history of international business law.', 'B) How to draft effective legal contracts.', 'C) The importance of written communication in Asia.', 'D) Using different forms of communication appropriately.'], answer: 'D' },
 { id: '2022-06-S1-Q23', question: 'What does the passage say about spoken agreements in some cultures?', options: ['A) They are regarded as seriously binding.', 'B) They have no legal value whatsoever.', 'C) They are preferred only for small transactions.', 'D) They must be followed by a written contract.'], answer: 'A' },
 { id: '2022-06-S1-Q24', question: 'What does the passage say about Western culture regarding contracts?', options: ['A) It considers contracts as flexible guidelines.', 'B) It places a high value on written contracts.', 'C) It prefers verbal agreements over documentation.', 'D) It only uses contracts for international deals.'], answer: 'B' },
 { id: '2022-06-S1-Q25', question: 'What is the result if a written contract is drafted too rigidly?', options: ['A) It provides better legal protection.', 'B) It helps build stronger business relationships.', 'C) It is more likely to be enforced in court.', 'D) Its terms may not be strictly binding.'], answer: 'D' },
 ],
 },

 // ================================================================
 // 2022年9月 第1套（疫情延考，3套共用同一听力）
 // ================================================================
 {
 id: '2022-09-S1-SecA-1', year: 2022, month: 9, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2022, 9, 1, 38),
 transcript: `Yours, Li Ming O)White meat, such as chicken, mav raise blood cholesterol levels as much as red meat does. This findin surprised researchers, who admitted they didn't expect that eating white meat would lead to higher blood cholesterol levels. In the study, researchers looked at 113 healthy people. The participants ate three different diets. These were a red meat diet which is primarily beef, a white meat diet which is mostly chicken and turkey, and a vegetarian protein diet. Each diet period was four weeks. Between the diet periods, participants had a break, during which they ate their regular foods. In addition, participants had blood tests at the start and finish of each new diet. The results showed that white and red meat diets had the same effects on blood cholesterol levels. Further, both diets increased blood cholesterol levels compared with the diet built on vegetarian protein sources. The team acknowledged that it is possible that white meat is better for our health than red meat despite ~ This is because other effects of red meat consumption could contribute to heart disease independent of cholesterol. Their main recommendations are that people eat less of both kinds of meat and more vegetarian protein.`,
 questions: [
 { id: '2022-09-S1-Q1', question: 'What do we learn from the news report about the study?', options: ['A) It examines the effect of cholesterol on people\'s health.', 'B) Its participants all had high blood cholesterol levels.', 'C) It questions the benefits of a vegetarian protein diet.', 'D) Its finding came as a surprise to the researchers.'], answer: 'D' },
 { id: '2022-09-S1-Q2', question: 'What did the researchers acknowledge?', options: ['A) They do not know all the effects of eating meat.', 'B) Red meat itself does not cause heart diseases.', 'C) White meat may be healthier than red meat.', 'D) Vegetarian protein may be easier to absorb.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S1-SecA-2', year: 2022, month: 9, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2022, 9, 1, 170),
 transcript: `At around half past nine this morning, a trailer attached to a lorry turned over at the crossing of High Street in Milton. Hundreds of frozen turkeys were spilled all over the road. It is reported that nobody was hurt in the incident, but police said it may affect traffic and Christmas dinners. With Christmas only days before Christmas, there are worries that local supermarket supplies of this holiday favorite may be affected. A police spokeswoman said that officers were currently in attendance at the scene. She stated that the driver of the lorry had been arrested on suspicion of dangerous driving. The crossing on High Street is a well-known accident blackspot. This year alone, there have been seven traffic accidents at this location. Thankfully, none of these accidents have resulted in serious injury.`,
 questions: [
 { id: '2022-09-S1-Q3', question: 'What does the news report say about the accident at the crossing of High Street in Milton?', options: ['A) It may have been due to the lorry driver\'s drunk driving.', 'B) It may affect the local supply of turkeys for Christmas.', 'C) It interrupted traffic for several hours running.', 'D) It was caused by a lorry running into a trailer.'], answer: 'B' },
 { id: '2022-09-S1-Q4', question: 'What do we learn about the crossing on High Street?', options: ['A) It has been the scene of several fatal accidents recently.', 'B) It is the spot that causes the local police a lot of worry.', 'C) It has witnessed several traffic accidents this year.', 'D) It is a location frequented by local traffic police.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S1-SecA-3', year: 2022, month: 9, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2022, 9, 1, 282),
 transcript: `India launched its helicopter taxi service on Monday, promising to ferry customers the 40 miles between Bangalore's Electronic City tech hub and the International Airport terminal in 15 minutes. Customers can book their helicopter ride through a mobile app. The service, whichs~ the first of its kind in India, offers only one route, but Bangalore airport will add more once it gets approval. Helicopter taxi is not an affordable option for many travelers. ~ than half as much. But Bangalore airport says it is a competitive alternative to a car ride for tech executives in a hurry. "A large number of high-class travelers, including CEOs, have to spend more than three hours b road to get there—and that is a loss of time," a Bangalore airport spokesperson said. "This is not a low cost option, but it is an option," she added. The helicopters ferried around eight customers to the airport on their first day. The company that owns and operates the service is called Thumby Aviation. It previously specialized in private charter flights for government officials.`,
 questions: [
 { id: '2022-09-S1-Q5', question: 'What is Bangalore airport trying to do about the helicopter taxi service?', options: ['A) Get approval to add more routes.', 'B) Attract more international tourists.', 'C) Advertise it through a mobile app.', 'D) Make it affordable to common folk.'], answer: 'A' },
 { id: '2022-09-S1-Q6', question: 'What do we learn from the news report about the helicopter taxi ride?', options: ['A) It costs more than twice as much as a car ride.', 'B) It is gaining popularity among ordinary Indians.', 'C) It symbolizes India\'s advancement in high-tech.', 'D) It can get anywhere in the city within 15 minutes.'], answer: 'A' },
 { id: '2022-09-S1-Q7', question: 'Who are the targeted customers of the helicopter taxi service?', options: ['A) International tourists.', 'B) High-class travelers.', 'C) Prominent superstars.', 'D) Customers in a hurry.'], answer: 'B' },
 ],
 },
 {
 id: '2022-09-S1-SecB-1', year: 2022, month: 9, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2022, 9, 1, 492),
 transcript: `W: Hi, I wish to buy some cheese for a barbecue this weekend.
M: What kind would you like?
W: Sorry, I don't know much about cheese. What type do you think would be suitable for a barbecue?
M: That's easy! For a barbecue, you could have any cheese you want. I imagine there will be different foods and people will just help themselves and eat at their own pace, right?
W: Yes, exactly. It will be very casual. We'll gather together at the weekend. There will be around 20 of us, including children.
M: How much would you like to spend?
W: Not very much. Let's say $30.
M: I would suggest having at least one soft cheese and one hard cheese. That will offer you a good variety to suit different people's tastes.
W: That sounds good. What's the difference between a soft cheese and a hard cheese?
M: Well, it depends. But generally speaking, soft cheeses are creamy and go well with sweet things like honey and jam. I would recommend this Spanish goat cheese. It's only $15, a very good price. You can spread it on bread with a knife, and then add a tiny bit of honey on top. It's delicious. Children love it.
W: Okay, great. What about a hard cheese?
M: Yes, for hard cheese, I would recommend this Italian one here. It has a very strong smell and a dry flavor. You can cut it into thin slices and eat it on its own. It's $16.
W: Okay. Thank you for your help.`,
 questions: [
 { id: '2022-09-S1-Q8', question: 'What does the woman plan to do for the weekend?', options: ['A) Treat her friends in a bar.', 'B) Take a trip to Washington.', 'C) Make some cheese.', 'D) Throw a party.'], answer: 'D' },
 { id: '2022-09-S1-Q9', question: 'What does the man suggest the woman do?', options: ['A) Spend no more than 30 dollars.', 'B) Buy different kinds of cheese.', 'C) Help him prepare the barbecue.', 'D) Find out different people\'s tastes.'], answer: 'B' },
 { id: '2022-09-S1-Q10', question: 'What does the man say about Spanish goat cheese?', options: ['A) It is the best kind of hard cheese.', 'B) It is the most popular in Spain.', 'C) It is more delicious than honey.', 'D) It is a good choice for children.'], answer: 'D' },
 { id: '2022-09-S1-Q11', question: 'What is the woman going to do at the end of the conversation?', options: ['A) Buy what the man recommended.', 'B) Have a taste of both of the cheeses.', 'C) Choose one of the two types of cheese.', 'D) Ask the man to cut the cheese into slices.'], answer: 'A' },
 ],
 },
 {
 id: '2022-09-S1-SecB-2', year: 2022, month: 9, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2022, 9, 1, 718),
 transcript: `M, Our school is replacing printed textbooks withe-textbooks next semester. I can't wait. W, Really? What_about the cost, not only buying all those tablets, but the software and electronic infrastructure that goes with it, not to mention retraining all the teachers and administration staff? M, Sure, the initial expenditure will be high, but much lower afterwards. Besides that, tablet prices continue to drop and are becoming increasingly affordable. ( 1 3 ) ~ W: Not necessarily. ~ < l } '_cl_t_!_en~_s_,_g_c1_mes and ~ In fact, research suggests that people who read printed text comprehend more, remember more and learn 30% more than those who read digital text. M, Yes. But tablets contain many technological features that are not found in printed textbooks. Think about it. 第4页 Students are able to highlight and edit text, write notes and search for information much more quickly than they can with printed textbooks. And what about all those trees that are cut down to make printed books? W: Actually, manufacturing tablets is environmentally destructive and dangerous to human health. 压 health impacts from making one electronic reader are 70 times greater than those from making a sin!!:le ~rals are extracted from the earth to make electronic readers. It does far more damage to the environment. M: Yes. But the software for electronic readers can be updated instantly without the need for buying a whole lot of new books. That's better for the environment. W: But the core curriculum doesn't change that much. Printed textbooks that are not brand new, still contain the basic relevant information of core subjects. M, Well, I'm looking forward to the change. W: I'll stick with my printed books.`,
 questions: [
 { id: '2022-09-S1-Q12', question: 'What does the woman say about using e-textbooks?', options: ['A) New teachers and staff have to be recruited.', 'B) It might take some time for students to adapt.', 'C) It involves buying lots of tablets and software.', 'D) The software has to be constantly upgraded.'], answer: 'C' },
 { id: '2022-09-S1-Q13', question: 'According to the man, how can the use of tablets benefit students?', options: ['A) It can greatly improve their learning efficiency.', 'B) It can help them to interact more with teachers.', 'C) It can save their trouble of carrying printed books.', 'D) It can develop their skills in using electronic devices.'], answer: 'A' },
 { id: '2022-09-S1-Q14', question: 'What does the woman say about students using tablets?', options: ['A) They may have trouble comprehending texts.', 'B) They may encounter technological problems.', 'C) They may pay less respect to teachers.', 'D) They may get distracted more easily.'], answer: 'D' },
 { id: '2022-09-S1-Q15', question: 'What does the woman say about making electronic readers?', options: ['A) It generates a great deal of electronic garbage.', 'B) It does a lot of damage to the environment.', 'C) It emits huge amounts of harmful radiation.', 'D) It accelerates the exhaustion of rare minerals.'], answer: 'B' },
 ],
 },
 {
 id: '2022-09-S1-SecC-1', year: 2022, month: 9, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2022, 9, 1, 933),
 transcript: `In social psychology, the term "person perception" refers to the mental processes that we use to form impressions of other people. It indudes 11_ot j ~ u t the conclusions we make about other people based on our impressions. Consider how often vou make this kind of iudgment ever 竺．When you meet with a new coworker, you immediately begin to develop an initial impression of this person. When you visit the grocery store, you might draw conclusions about the cashier who checks you out. Obviously, person perception is a very subjective process that can be affected bv a number of ~ including the characteristics of the person you are observing, the context of the situation, your own personal traits, and your past experiences. One of the techniques we use in person perception is social categorization. In this process, we mentally categorize people into different groups based on common characteristics. .Imaginethatyou are getting on a bus. There are only two seats available. One is next to a small, elderly woman; the other is next to a muscular, fierce-looking man. You sit next to the elderly woman, who unfortunately turns out to be quite skilled at picking pockets.`,
 questions: [
 { id: '2022-09-S1-Q16', question: 'What does the passage say we tend to do every day?', options: ['A) Communicate with our coworkers.', 'B) Encounter people in different places.', 'C) Judge people based on our first impressions.', 'D) Engage in a variety of psychological activities.'], answer: 'C' },
 { id: '2022-09-S1-Q17', question: 'What do we learn about person perception from this passage?', options: ['A) It is an objective evaluation of a person\'s character.', 'B) It is a mental process influenced by many factors.', 'C) It contributes to the formation of personal traits.', 'D) It varies greatly among different social groups.'], answer: 'B' },
 { id: '2022-09-S1-Q18', question: 'What is the problem with using social categorization in person perception?', options: ['A) It can lead to incorrect judgments.', 'B) It can cause mistrust among people.', 'C) It can result in instant losses.', 'D) It can give rise to gender bias.'], answer: 'A' },
 ],
 },
 {
 id: '2022-09-S1-SecC-2', year: 2022, month: 9, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2022, 9, 1, 1116),
 transcript: `Desoite smartphones and social media, young people today are as socially competent as those from the revious e:eneration. At least this is what a new study suggests. For the study, researchers compared teacher and parent evaluations of American children who started kindergarten in 1998, with those who began school in 2010. The former group entered kindergarten when mobile phones were luxuries. The latter group started school when mobile devices were widespread. Results showed both groups of children we.re rated similarly on important social skills. These included their ability to form and maintain friendships and get along with people who are different. They were also rated similarly on self-control, such as the ability to regulate their temper. In virtually every comparison made, ratings of social skills either remain constant or improved for the children born later. ~吐!!Y lower for children who accessed onlin~ Adults are worried when technological change starts to undermine traditional relationships, partlcularly the parent-child relationship. The introduction of telephones, automobiles and radio all led to moral panic among adults of the time, because the technology allowed children to enjoy more freedom. Fears over screen-based technology represent the most recent panic in response to technological change. But overall, the study found little evidence that time spent on screens was hurting social skills for most children.`,
 questions: [
 { id: '2022-09-S1-Q19', question: 'What does the new study suggest about young people today and those from the previous generation?', options: ['A) Both groups spend a lot of time on mobile devices.', 'B) Both groups attach importance to social connections.', 'C) They are equally competent in using new technology.', 'D) They are similar in terms of social skills.'], answer: 'D' },
 { id: '2022-09-S1-Q20', question: 'What does the passage say about children who accessed online games and social media frequently?', options: ['A) Their social skills were negatively affected.', 'B) Their school performance was slightly lower.', 'C) Their emotions were much harder to regulate.', 'D) Their relations with peers were badly strained.'], answer: 'A' },
 { id: '2022-09-S1-Q21', question: 'What is adults\' worry about technological change?', options: ['A) It may pose a threat to their children\'s safety.', 'B) It may affect society\'s traditional values.', 'C) It may hurt their relations with children.', 'D) It may change their children\'s ethical values.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S1-SecC-3', year: 2022, month: 9, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2022, 9, 1, 1295),
 transcript: `It's easy to spend all day searching for inspiration. You can find incredible videos, articles and news stories about the success of others. 第6页 .Everytimeyou read an article or listen to an interview, you're practicing passive inspiration. You might learn something, but you don't actually have to do anything. Hearing about other people's success isn't the same as creating your own. Instead, it is through the process of active inspiration-the act of creating things, applying new ideas to our goals, and making mistakes—that we discover who we are and what is important to us. Furthermore, • Watching someone else's success might leave you feeling excited for a few minutes. However, taking action and applying a new idea to your life will inspire you more than anything someone else can say. Learning and listening can help you think about things in a different way. But creating, producing, and experimenting is what drives you forward. ~iration will give you power. Too often we spend our lives consuming the world around us instead of creating it. And what matters is the power your actions have to inspire you. ~tion of ideas, not the consum_p_tion of them.`,
 questions: [
 { id: '2022-09-S1-Q22', question: 'What does the speaker say about inspiration from consuming others\' ideas and success stories?', options: ['A) It is motivating.', 'B) It is passive.', 'C) It is incredible.', 'D) It is impracticable.'], answer: 'B' },
 { id: '2022-09-S1-Q23', question: 'What do we learn from the passage about active inspiration?', options: ['A) It results in short-term excitement.', 'B) It helps us avoid making mistakes.', 'C) It breeds long-term passion and enthusiasm.', 'D) It is bound to help us achieve greater success.'], answer: 'C' },
 { id: '2022-09-S1-Q24', question: 'What does the passage say passive inspiration can do?', options: ['A) Drive us forward.', 'B) Bring us power.', 'C) Spur us to action.', 'D) Give us ideas.'], answer: 'D' },
 { id: '2022-09-S1-Q25', question: 'Where does the best inspiration come from according to the passage?', options: ['A) Listening to success stories.', 'B) Applying ideas to one\'s life.', 'C) Following the advice of experts.', 'D) Consuming the world around us.'], answer: 'B' },
 ],
 },

 // 注：2022年9月第2套听力与第1套完全相同（疫情延考，全国仅考1套听力）
 {
 id: '2022-09-S2-SecA-1', year: 2022, month: 9, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2022, 9, 1, 38),
 transcript: `White meat, such as chicken, may raise blood cholesterol levels as much as red meat does. This finding surprised researchers, who admitted they didn't expect that eating white meat would lead to higher blood cholesterol levels. In the study, researchers looked at 113 healthy people. The participants ate three different diets. These were a red meat diet which is primarily beef, a white meat diet which is mostly chicken and turkey, and a vegetarian protein diet. Each diet period was four weeks. Between the diet periods, participants had a break, during which they ate their regular foods. In addition, participants had blood tests at the start and finish of each new diet. The results showed that white and red meat diets had the same effects on blood cholesterol levels. Further, both diets increased blood cholesterol levels compared with the diet built on vegetarian protein sources. The team acknowledged that it is possible that white meat is better for our health than red meat despite this. This is because other effects of red meat consumption could contribute to heart disease independent of cholesterol. Their main recommendations are that people eat less of both kinds of meat and more vegetarian protein.`,
 questions: [
 { id: '2022-09-S2-Q1', question: 'What do we learn from the news report about the study?', options: ['A) It examines the effect of cholesterol on people\'s health.', 'B) Its participants all had high blood cholesterol levels.', 'C) It questions the benefits of a vegetarian protein diet.', 'D) Its finding came as a surprise to the researchers.'], answer: 'D' },
 { id: '2022-09-S2-Q2', question: 'What did the researchers acknowledge?', options: ['A) They do not know all the effects of eating meat.', 'B) Red meat itself does not cause heart diseases.', 'C) White meat may be healthier than red meat.', 'D) Vegetarian protein may be easier to absorb.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S2-SecA-2', year: 2022, month: 9, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2022, 9, 1, 170),
 transcript: `At around half past nine this morning, a trailer attached to a lorry turned over at the crossing of High Street in Milton. Hundreds of frozen turkeys were spilled all over the road. It is reported that nobody was hurt in the incident, but police said it may affect traffic and Christmas dinners. With Christmas only days before Christmas, there are worries that local supermarket supplies of this holiday favorite may be affected. A police spokeswoman said that officers were currently in attendance at the scene. She stated that the driver of the lorry had been arrested on suspicion of dangerous driving. The crossing on High Street is a well-known accident blackspot. This year alone, there have been seven traffic accidents at this location. Thankfully, none of these accidents have resulted in serious injury.`,
 questions: [
 { id: '2022-09-S2-Q3', question: 'What does the news report say about the accident at the crossing of High Street in Milton?', options: ['A) It may have been due to the lorry driver\'s drunk driving.', 'B) It may affect the local supply of turkeys for Christmas.', 'C) It interrupted traffic for several hours running.', 'D) It was caused by a lorry running into a trailer.'], answer: 'B' },
 { id: '2022-09-S2-Q4', question: 'What do we learn about the crossing on High Street?', options: ['A) It has been the scene of several fatal accidents recently.', 'B) It is the spot that causes the local police a lot of worry.', 'C) It has witnessed several traffic accidents this year.', 'D) It is a location frequented by local traffic police.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S2-SecA-3', year: 2022, month: 9, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2022, 9, 1, 282),
 transcript: `India launched its helicopter taxi service on Monday, promising to ferry customers the 40 miles between Bangalore's Electronic City tech hub and the International Airport terminal in 15 minutes. Customers can book their helicopter ride through a mobile app. The service, which is the first of its kind in India, offers only one route, but Bangalore airport will add more once it gets approval. Helicopter taxi is not an affordable option for many travelers. A car ride for the same journey costs less than half as much. But Bangalore airport says it is a competitive alternative to a car ride for tech executives in a hurry. "A large number of high-class travelers, including CEOs, have to spend more than three hours by road to get there — and that is a loss of time," a Bangalore airport spokesperson said. "This is not a low cost option, but it is an option," she added. The helicopters ferried around eight customers to the airport on their first day. The company that owns and operates the service is called Thumby Aviation. It previously specialized in private charter flights for government officials.`,
 questions: [
 { id: '2022-09-S2-Q5', question: 'What is Bangalore airport trying to do about the helicopter taxi service?', options: ['A) Get approval to add more routes.', 'B) Attract more international tourists.', 'C) Advertise it through a mobile app.', 'D) Make it affordable to common folk.'], answer: 'A' },
 { id: '2022-09-S2-Q6', question: 'What do we learn from the news report about the helicopter taxi ride?', options: ['A) It costs more than twice as much as a car ride.', 'B) It is gaining popularity among ordinary Indians.', 'C) It symbolizes India\'s advancement in high-tech.', 'D) It can get anywhere in the city within 15 minutes.'], answer: 'A' },
 { id: '2022-09-S2-Q7', question: 'Who are the targeted customers of the helicopter taxi service?', options: ['A) International tourists.', 'B) High-class travelers.', 'C) Prominent superstars.', 'D) Customers in a hurry.'], answer: 'B' },
 ],
 },
 {
 id: '2022-09-S2-SecB-1', year: 2022, month: 9, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2022, 9, 1, 492),
 transcript: `W: Hi, I wish to buy some cheese for a barbecue this weekend.
M: What kind would you like?
W: Sorry, I don't know much about cheese. What type do you think would be suitable for a barbecue?
M: That's easy! For a barbecue, you could have any cheese you want. I imagine there will be different foods and people will just help themselves and eat at their own pace, right?
W: Yes, exactly. It will be very casual. We'll gather together at the weekend. There will be around 20 of us, including children.
M: How much would you like to spend?
W: Not very much. Let's say $30.
M: I would suggest having at least one soft cheese and one hard cheese. That will offer you a good variety to suit different people's tastes.
W: That sounds good. What's the difference between a soft cheese and a hard cheese?
M: Well, it depends. But generally speaking, soft cheeses are creamy and go well with sweet things like honey and jam. I would recommend this Spanish goat cheese. It's only $15, a very good price. You can spread it on bread with a knife, and then add a tiny bit of honey on top. It's delicious. Children love it.
W: Okay, great. What about a hard cheese?
M: Yes, for hard cheese, I would recommend this Italian one here. It has a very strong smell and a dry flavor. You can cut it into thin slices and eat it on its own. It's $16.
W: Okay. Thank you for your help.`,
 questions: [
 { id: '2022-09-S2-Q8', question: 'What does the woman plan to do for the weekend?', options: ['A) Treat her friends in a bar.', 'B) Take a trip to Washington.', 'C) Make some cheese.', 'D) Throw a party.'], answer: 'D' },
 { id: '2022-09-S2-Q9', question: 'What does the man suggest the woman do?', options: ['A) Spend no more than 30 dollars.', 'B) Buy different kinds of cheese.', 'C) Help him prepare the barbecue.', 'D) Find out different people\'s tastes.'], answer: 'B' },
 { id: '2022-09-S2-Q10', question: 'What does the man say about Spanish goat cheese?', options: ['A) It is the best kind of hard cheese.', 'B) It is the most popular in Spain.', 'C) It is more delicious than honey.', 'D) It is a good choice for children.'], answer: 'D' },
 { id: '2022-09-S2-Q11', question: 'What is the woman going to do at the end of the conversation?', options: ['A) Buy what the man recommended.', 'B) Have a taste of both of the cheeses.', 'C) Choose one of the two types of cheese.', 'D) Ask the man to cut the cheese into slices.'], answer: 'A' },
 ],
 },
 {
 id: '2022-09-S2-SecB-2', year: 2022, month: 9, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2022, 9, 1, 718),
 transcript: `M: Our school is replacing printed textbooks with e-textbooks next semester. I can't wait.
W: Really? What about the cost, not only buying all those tablets, but the software and electronic infrastructure that goes with it, not to mention retraining all the teachers and administration staff?
M: Sure, the initial expenditure will be high, but much lower afterwards. Besides that, tablet prices continue to drop and are becoming increasingly affordable. Students are able to highlight and edit text, write notes and search for information much more quickly than they can with printed textbooks.
W: Not necessarily. Students may be distracted by using tablets, games and other applications. In fact, research suggests that people who read printed text comprehend more, remember more and learn 30% more than those who read digital text.
M: Yes. But tablets contain many technological features that are not found in printed textbooks. Think about it. Students are able to highlight and edit text, write notes and search for information much more quickly than they can with printed textbooks. And what about all those trees that are cut down to make printed books?
W: Actually, manufacturing tablets is environmentally destructive and dangerous to human health. The health impacts from making one electronic reader are 70 times greater than those from making a single printed book. Rare minerals are extracted from the earth to make electronic readers. It does far more damage to the environment.
M: Yes. But the software for electronic readers can be updated instantly without the need for buying a whole lot of new books. That's better for the environment.
W: But the core curriculum doesn't change that much. Printed textbooks that are not brand new, still contain the basic relevant information of core subjects.
M: Well, I'm looking forward to the change.
W: I'll stick with my printed books.`,
 questions: [
 { id: '2022-09-S2-Q12', question: 'What does the woman say about using e-textbooks?', options: ['A) New teachers and staff have to be recruited.', 'B) It might take some time for students to adapt.', 'C) It involves buying lots of tablets and software.', 'D) The software has to be constantly upgraded.'], answer: 'C' },
 { id: '2022-09-S2-Q13', question: 'According to the man, how can the use of tablets benefit students?', options: ['A) It can greatly improve their learning efficiency.', 'B) It can help them to interact more with teachers.', 'C) It can save their trouble of carrying printed books.', 'D) It can develop their skills in using electronic devices.'], answer: 'A' },
 { id: '2022-09-S2-Q14', question: 'What does the woman say about students using tablets?', options: ['A) They may have trouble comprehending texts.', 'B) They may encounter technological problems.', 'C) They may pay less respect to teachers.', 'D) They may get distracted more easily.'], answer: 'D' },
 { id: '2022-09-S2-Q15', question: 'What does the woman say about making electronic readers?', options: ['A) It generates a great deal of electronic garbage.', 'B) It does a lot of damage to the environment.', 'C) It emits huge amounts of harmful radiation.', 'D) It accelerates the exhaustion of rare minerals.'], answer: 'B' },
 ],
 },
 {
 id: '2022-09-S2-SecC-1', year: 2022, month: 9, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2022, 9, 1, 933),
 transcript: `In social psychology, the term "person perception" refers to the mental processes that we use to form impressions of other people. It includes not just how we form these impressions, but the conclusions we make about other people based on our impressions. Consider how often you make this kind of judgment every day. When you meet with a new coworker, you immediately begin to develop an initial impression of this person. When you visit the grocery store, you might draw conclusions about the cashier who checks you out. Obviously, person perception is a very subjective process that can be affected by a number of variables, including the characteristics of the person you are observing, the context of the situation, your own personal traits, and your past experiences. One of the techniques we use in person perception is social categorization. In this process, we mentally categorize people into different groups based on common characteristics. Imagine that you are getting on a bus. There are only two seats available. One is next to a small, elderly woman; the other is next to a muscular, fierce-looking man. You sit next to the elderly woman, who unfortunately turns out to be quite skilled at picking pockets. Because of social categorization, you immediately judge the woman as harmless, and the man as threatening, leading to the loss of your wallet.`,
 questions: [
 { id: '2022-09-S2-Q16', question: 'What does the passage say we tend to do every day?', options: ['A) Communicate with our coworkers.', 'B) Encounter people in different places.', 'C) Judge people based on our first impressions.', 'D) Engage in a variety of psychological activities.'], answer: 'C' },
 { id: '2022-09-S2-Q17', question: 'What do we learn about person perception from this passage?', options: ['A) It is an objective evaluation of a person\'s character.', 'B) It is a mental process influenced by many factors.', 'C) It contributes to the formation of personal traits.', 'D) It varies greatly among different social groups.'], answer: 'B' },
 { id: '2022-09-S2-Q18', question: 'What is the problem with using social categorization in person perception?', options: ['A) It can lead to incorrect judgments.', 'B) It can cause mistrust among people.', 'C) It can result in instant losses.', 'D) It can give rise to gender bias.'], answer: 'A' },
 ],
 },
 {
 id: '2022-09-S2-SecC-2', year: 2022, month: 9, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2022, 9, 1, 1116),
 transcript: `Despite smartphones and social media, young people today are as socially competent as those from the previous generation. At least this is what a new study suggests. For the study, researchers compared teacher and parent evaluations of American children who started kindergarten in 1998, with those who began school in 2010. The former group entered kindergarten when mobile phones were luxuries. The latter group started school when mobile devices were widespread. Results showed both groups of children were rated similarly on important social skills. These included their ability to form and maintain friendships and get along with people who are different. They were also rated similarly on self-control, such as the ability to regulate their temper. In virtually every comparison made, ratings of social skills either remain constant or improved for the children born later. However, social skills were slightly lower for children who accessed online games and social media many times a day. Adults are worried when technological change starts to undermine traditional relationships, particularly the parent-child relationship. The introduction of telephones, automobiles and radio all led to moral panic among adults of the time, because the technology allowed children to enjoy more freedom. Fears over screen-based technology represent the most recent panic in response to technological change. But overall, the study found little evidence that time spent on screens was hurting social skills for most children.`,
 questions: [
 { id: '2022-09-S2-Q19', question: 'What does the new study suggest about young people today and those from the previous generation?', options: ['A) Both groups spend a lot of time on mobile devices.', 'B) Both groups attach importance to social connections.', 'C) They are equally competent in using new technology.', 'D) They are similar in terms of social skills.'], answer: 'D' },
 { id: '2022-09-S2-Q20', question: 'What does the passage say about children who accessed online games and social media frequently?', options: ['A) Their social skills were negatively affected.', 'B) Their school performance was slightly lower.', 'C) Their emotions were much harder to regulate.', 'D) Their relations with peers were badly strained.'], answer: 'A' },
 { id: '2022-09-S2-Q21', question: 'What is adults\' worry about technological change?', options: ['A) It may pose a threat to their children\'s safety.', 'B) It may affect society\'s traditional values.', 'C) It may hurt their relations with children.', 'D) It may change their children\'s ethical values.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S2-SecC-3', year: 2022, month: 9, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2022, 9, 1, 1295),
 transcript: `It's easy to spend all day searching for inspiration. You can find incredible videos, articles and news stories, and they can all inspire you in different ways. Every time you read an article or listen to an interview, you're practicing passive inspiration. You might learn something, but you don't actually have to do anything. Hearing about other people's success isn't the same as creating your own. Instead, it is through the process of active inspiration — the act of creating things, applying new ideas to our goals, and making mistakes — that we discover who we are and what is important to us. Furthermore, active inspiration breeds long-term passion and enthusiasm. Watching someone else's success might leave you feeling excited for a few minutes. However, taking action and applying a new idea to your life will inspire you more than anything someone else can say. Learning and listening can help you think about things in a different way. But creating, producing, and experimenting is what drives you forward. Passive inspiration can give you ideas. But it is active inspiration that will give you power. Too often we spend our lives consuming the world around us instead of creating it. And what matters is the application of ideas, not the consumption of them.`,
 questions: [
 { id: '2022-09-S2-Q22', question: 'What does the speaker say about inspiration from consuming others\' ideas and success stories?', options: ['A) It is motivating.', 'B) It is passive.', 'C) It is incredible.', 'D) It is impracticable.'], answer: 'B' },
 { id: '2022-09-S2-Q23', question: 'What do we learn from the passage about active inspiration?', options: ['A) It results in short-term excitement.', 'B) It helps us avoid making mistakes.', 'C) It breeds long-term passion and enthusiasm.', 'D) It is bound to help us achieve greater success.'], answer: 'C' },
 { id: '2022-09-S2-Q24', question: 'What does the passage say passive inspiration can do?', options: ['A) Drive us forward.', 'B) Bring us power.', 'C) Spur us to action.', 'D) Give us ideas.'], answer: 'D' },
 { id: '2022-09-S2-Q25', question: 'Where does the best inspiration come from according to the passage?', options: ['A) Listening to success stories.', 'B) Applying ideas to one\'s life.', 'C) Following the advice of experts.', 'D) Consuming the world around us.'], answer: 'B' },
 ],
 },

 // 注：2022年9月第3套听力与第1套完全相同（疫情延考，全国仅考1套听力）
 {
 id: '2022-09-S3-SecA-1', year: 2022, month: 9, setNumber: 3,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2022, 9, 1, 38),
 transcript: `White meat, such as chicken, may raise blood cholesterol levels as much as red meat does. This finding surprised researchers, who admitted they didn't expect that eating white meat would lead to higher blood cholesterol levels. In the study, researchers looked at 113 healthy people. The participants ate three different diets. These were a red meat diet which is primarily beef, a white meat diet which is mostly chicken and turkey, and a vegetarian protein diet. Each diet period was four weeks. Between the diet periods, participants had a break, during which they ate their regular foods. In addition, participants had blood tests at the start and finish of each new diet. The results showed that white and red meat diets had the same effects on blood cholesterol levels. Further, both diets increased blood cholesterol levels compared with the diet built on vegetarian protein sources. The team acknowledged that it is possible that white meat is better for our health than red meat despite this. This is because other effects of red meat consumption could contribute to heart disease independent of cholesterol. Their main recommendations are that people eat less of both kinds of meat and more vegetarian protein.`,
 questions: [
 { id: '2022-09-S3-Q1', question: 'What do we learn from the news report about the study?', options: ['A) It examines the effect of cholesterol on people\'s health.', 'B) Its participants all had high blood cholesterol levels.', 'C) It questions the benefits of a vegetarian protein diet.', 'D) Its finding came as a surprise to the researchers.'], answer: 'D' },
 { id: '2022-09-S3-Q2', question: 'What did the researchers acknowledge?', options: ['A) They do not know all the effects of eating meat.', 'B) Red meat itself does not cause heart diseases.', 'C) White meat may be healthier than red meat.', 'D) Vegetarian protein may be easier to absorb.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S3-SecA-2', year: 2022, month: 9, setNumber: 3,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2022, 9, 1, 170),
 transcript: `At around half past nine this morning, a trailer attached to a lorry turned over at the crossing of High Street in Milton. Hundreds of frozen turkeys were spilled all over the road. It is reported that nobody was hurt in the incident, but police said it may affect traffic and Christmas dinners. With Christmas only days before Christmas, there are worries that local supermarket supplies of this holiday favorite may be affected. A police spokeswoman said that officers were currently in attendance at the scene. She stated that the driver of the lorry had been arrested on suspicion of dangerous driving. The crossing on High Street is a well-known accident blackspot. This year alone, there have been seven traffic accidents at this location. Thankfully, none of these accidents have resulted in serious injury.`,
 questions: [
 { id: '2022-09-S3-Q3', question: 'What does the news report say about the accident at the crossing of High Street in Milton?', options: ['A) It may have been due to the lorry driver\'s drunk driving.', 'B) It may affect the local supply of turkeys for Christmas.', 'C) It interrupted traffic for several hours running.', 'D) It was caused by a lorry running into a trailer.'], answer: 'B' },
 { id: '2022-09-S3-Q4', question: 'What do we learn about the crossing on High Street?', options: ['A) It has been the scene of several fatal accidents recently.', 'B) It is the spot that causes the local police a lot of worry.', 'C) It has witnessed several traffic accidents this year.', 'D) It is a location frequented by local traffic police.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S3-SecA-3', year: 2022, month: 9, setNumber: 3,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2022, 9, 1, 282),
 transcript: `India launched its helicopter taxi service on Monday, promising to ferry customers the 40 miles between Bangalore's Electronic City tech hub and the International Airport terminal in 15 minutes. Customers can book their helicopter ride through a mobile app. The service, which is the first of its kind in India, offers only one route, but Bangalore airport will add more once it gets approval. Helicopter taxi is not an affordable option for many travelers. A car ride for the same journey costs less than half as much. But Bangalore airport says it is a competitive alternative to a car ride for tech executives in a hurry. "A large number of high-class travelers, including CEOs, have to spend more than three hours by road to get there — and that is a loss of time," a Bangalore airport spokesperson said. "This is not a low cost option, but it is an option," she added. The helicopters ferried around eight customers to the airport on their first day. The company that owns and operates the service is called Thumby Aviation. It previously specialized in private charter flights for government officials.`,
 questions: [
 { id: '2022-09-S3-Q5', question: 'What is Bangalore airport trying to do about the helicopter taxi service?', options: ['A) Get approval to add more routes.', 'B) Attract more international tourists.', 'C) Advertise it through a mobile app.', 'D) Make it affordable to common folk.'], answer: 'A' },
 { id: '2022-09-S3-Q6', question: 'What do we learn from the news report about the helicopter taxi ride?', options: ['A) It costs more than twice as much as a car ride.', 'B) It is gaining popularity among ordinary Indians.', 'C) It symbolizes India\'s advancement in high-tech.', 'D) It can get anywhere in the city within 15 minutes.'], answer: 'A' },
 { id: '2022-09-S3-Q7', question: 'Who are the targeted customers of the helicopter taxi service?', options: ['A) International tourists.', 'B) High-class travelers.', 'C) Prominent superstars.', 'D) Customers in a hurry.'], answer: 'B' },
 ],
 },
 {
 id: '2022-09-S3-SecB-1', year: 2022, month: 9, setNumber: 3,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2022, 9, 1, 492),
 transcript: `W: Hi, I wish to buy some cheese for a barbecue this weekend.
M: What kind would you like?
W: Sorry, I don't know much about cheese. What type do you think would be suitable for a barbecue?
M: That's easy! For a barbecue, you could have any cheese you want. I imagine there will be different foods and people will just help themselves and eat at their own pace, right?
W: Yes, exactly. It will be very casual. We'll gather together at the weekend. There will be around 20 of us, including children.
M: How much would you like to spend?
W: Not very much. Let's say $30.
M: I would suggest having at least one soft cheese and one hard cheese. That will offer you a good variety to suit different people's tastes.
W: That sounds good. What's the difference between a soft cheese and a hard cheese?
M: Well, it depends. But generally speaking, soft cheeses are creamy and go well with sweet things like honey and jam. I would recommend this Spanish goat cheese. It's only $15, a very good price. You can spread it on bread with a knife, and then add a tiny bit of honey on top. It's delicious. Children love it.
W: Okay, great. What about a hard cheese?
M: Yes, for hard cheese, I would recommend this Italian one here. It has a very strong smell and a dry flavor. You can cut it into thin slices and eat it on its own. It's $16.
W: Okay. Thank you for your help.`,
 questions: [
 { id: '2022-09-S3-Q8', question: 'What does the woman plan to do for the weekend?', options: ['A) Treat her friends in a bar.', 'B) Take a trip to Washington.', 'C) Make some cheese.', 'D) Throw a party.'], answer: 'D' },
 { id: '2022-09-S3-Q9', question: 'What does the man suggest the woman do?', options: ['A) Spend no more than 30 dollars.', 'B) Buy different kinds of cheese.', 'C) Help him prepare the barbecue.', 'D) Find out different people\'s tastes.'], answer: 'B' },
 { id: '2022-09-S3-Q10', question: 'What does the man say about Spanish goat cheese?', options: ['A) It is the best kind of hard cheese.', 'B) It is the most popular in Spain.', 'C) It is more delicious than honey.', 'D) It is a good choice for children.'], answer: 'D' },
 { id: '2022-09-S3-Q11', question: 'What is the woman going to do at the end of the conversation?', options: ['A) Buy what the man recommended.', 'B) Have a taste of both of the cheeses.', 'C) Choose one of the two types of cheese.', 'D) Ask the man to cut the cheese into slices.'], answer: 'A' },
 ],
 },
 {
 id: '2022-09-S3-SecB-2', year: 2022, month: 9, setNumber: 3,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2022, 9, 1, 718),
 transcript: `M: Our school is replacing printed textbooks with e-textbooks next semester. I can't wait.
W: Really? What about the cost, not only buying all those tablets, but the software and electronic infrastructure that goes with it, not to mention retraining all the teachers and administration staff?
M: Sure, the initial expenditure will be high, but much lower afterwards. Besides that, tablet prices continue to drop and are becoming increasingly affordable. Students are able to highlight and edit text, write notes and search for information much more quickly than they can with printed textbooks.
W: Not necessarily. Students may be distracted by using tablets, games and other applications. In fact, research suggests that people who read printed text comprehend more, remember more and learn 30% more than those who read digital text.
M: Yes. But tablets contain many technological features that are not found in printed textbooks. Think about it. Students are able to highlight and edit text, write notes and search for information much more quickly than they can with printed textbooks. And what about all those trees that are cut down to make printed books?
W: Actually, manufacturing tablets is environmentally destructive and dangerous to human health. The health impacts from making one electronic reader are 70 times greater than those from making a single printed book. Rare minerals are extracted from the earth to make electronic readers. It does far more damage to the environment.
M: Yes. But the software for electronic readers can be updated instantly without the need for buying a whole lot of new books. That's better for the environment.
W: But the core curriculum doesn't change that much. Printed textbooks that are not brand new, still contain the basic relevant information of core subjects.
M: Well, I'm looking forward to the change.
W: I'll stick with my printed books.`,
 questions: [
 { id: '2022-09-S3-Q12', question: 'What does the woman say about using e-textbooks?', options: ['A) New teachers and staff have to be recruited.', 'B) It might take some time for students to adapt.', 'C) It involves buying lots of tablets and software.', 'D) The software has to be constantly upgraded.'], answer: 'C' },
 { id: '2022-09-S3-Q13', question: 'According to the man, how can the use of tablets benefit students?', options: ['A) It can greatly improve their learning efficiency.', 'B) It can help them to interact more with teachers.', 'C) It can save their trouble of carrying printed books.', 'D) It can develop their skills in using electronic devices.'], answer: 'A' },
 { id: '2022-09-S3-Q14', question: 'What does the woman say about students using tablets?', options: ['A) They may have trouble comprehending texts.', 'B) They may encounter technological problems.', 'C) They may pay less respect to teachers.', 'D) They may get distracted more easily.'], answer: 'D' },
 { id: '2022-09-S3-Q15', question: 'What does the woman say about making electronic readers?', options: ['A) It generates a great deal of electronic garbage.', 'B) It does a lot of damage to the environment.', 'C) It emits huge amounts of harmful radiation.', 'D) It accelerates the exhaustion of rare minerals.'], answer: 'B' },
 ],
 },
 {
 id: '2022-09-S3-SecC-1', year: 2022, month: 9, setNumber: 3,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2022, 9, 1, 933),
 transcript: `In social psychology, the term "person perception" refers to the mental processes that we use to form impressions of other people. It includes not just how we form these impressions, but the conclusions we make about other people based on our impressions. Consider how often you make this kind of judgment every day. When you meet with a new coworker, you immediately begin to develop an initial impression of this person. When you visit the grocery store, you might draw conclusions about the cashier who checks you out. Obviously, person perception is a very subjective process that can be affected by a number of variables, including the characteristics of the person you are observing, the context of the situation, your own personal traits, and your past experiences. One of the techniques we use in person perception is social categorization. In this process, we mentally categorize people into different groups based on common characteristics. Imagine that you are getting on a bus. There are only two seats available. One is next to a small, elderly woman; the other is next to a muscular, fierce-looking man. You sit next to the elderly woman, who unfortunately turns out to be quite skilled at picking pockets. Because of social categorization, you immediately judge the woman as harmless, and the man as threatening, leading to the loss of your wallet.`,
 questions: [
 { id: '2022-09-S3-Q16', question: 'What does the passage say we tend to do every day?', options: ['A) Communicate with our coworkers.', 'B) Encounter people in different places.', 'C) Judge people based on our first impressions.', 'D) Engage in a variety of psychological activities.'], answer: 'C' },
 { id: '2022-09-S3-Q17', question: 'What do we learn about person perception from this passage?', options: ['A) It is an objective evaluation of a person\'s character.', 'B) It is a mental process influenced by many factors.', 'C) It contributes to the formation of personal traits.', 'D) It varies greatly among different social groups.'], answer: 'B' },
 { id: '2022-09-S3-Q18', question: 'What is the problem with using social categorization in person perception?', options: ['A) It can lead to incorrect judgments.', 'B) It can cause mistrust among people.', 'C) It can result in instant losses.', 'D) It can give rise to gender bias.'], answer: 'A' },
 ],
 },
 {
 id: '2022-09-S3-SecC-2', year: 2022, month: 9, setNumber: 3,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2022, 9, 1, 1116),
 transcript: `Despite smartphones and social media, young people today are as socially competent as those from the previous generation. At least this is what a new study suggests. For the study, researchers compared teacher and parent evaluations of American children who started kindergarten in 1998, with those who began school in 2010. The former group entered kindergarten when mobile phones were luxuries. The latter group started school when mobile devices were widespread. Results showed both groups of children were rated similarly on important social skills. These included their ability to form and maintain friendships and get along with people who are different. They were also rated similarly on self-control, such as the ability to regulate their temper. In virtually every comparison made, ratings of social skills either remain constant or improved for the children born later. However, social skills were slightly lower for children who accessed online games and social media many times a day. Adults are worried when technological change starts to undermine traditional relationships, particularly the parent-child relationship. The introduction of telephones, automobiles and radio all led to moral panic among adults of the time, because the technology allowed children to enjoy more freedom. Fears over screen-based technology represent the most recent panic in response to technological change. But overall, the study found little evidence that time spent on screens was hurting social skills for most children.`,
 questions: [
 { id: '2022-09-S3-Q19', question: 'What does the new study suggest about young people today and those from the previous generation?', options: ['A) Both groups spend a lot of time on mobile devices.', 'B) Both groups attach importance to social connections.', 'C) They are equally competent in using new technology.', 'D) They are similar in terms of social skills.'], answer: 'D' },
 { id: '2022-09-S3-Q20', question: 'What does the passage say about children who accessed online games and social media frequently?', options: ['A) Their social skills were negatively affected.', 'B) Their school performance was slightly lower.', 'C) Their emotions were much harder to regulate.', 'D) Their relations with peers were badly strained.'], answer: 'A' },
 { id: '2022-09-S3-Q21', question: 'What is adults\' worry about technological change?', options: ['A) It may pose a threat to their children\'s safety.', 'B) It may affect society\'s traditional values.', 'C) It may hurt their relations with children.', 'D) It may change their children\'s ethical values.'], answer: 'C' },
 ],
 },
 {
 id: '2022-09-S3-SecC-3', year: 2022, month: 9, setNumber: 3,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2022, 9, 1, 1295),
 transcript: `It's easy to spend all day searching for inspiration. You can find incredible videos, articles and news stories, and they can all inspire you in different ways. Every time you read an article or listen to an interview, you're practicing passive inspiration. You might learn something, but you don't actually have to do anything. Hearing about other people's success isn't the same as creating your own. Instead, it is through the process of active inspiration — the act of creating things, applying new ideas to our goals, and making mistakes — that we discover who we are and what is important to us. Furthermore, active inspiration breeds long-term passion and enthusiasm. Watching someone else's success might leave you feeling excited for a few minutes. However, taking action and applying a new idea to your life will inspire you more than anything someone else can say. Learning and listening can help you think about things in a different way. But creating, producing, and experimenting is what drives you forward. Passive inspiration can give you ideas. But it is active inspiration that will give you power. Too often we spend our lives consuming the world around us instead of creating it. And what matters is the application of ideas, not the consumption of them.`,
 questions: [
 { id: '2022-09-S3-Q22', question: 'What does the speaker say about inspiration from consuming others\' ideas and success stories?', options: ['A) It is motivating.', 'B) It is passive.', 'C) It is incredible.', 'D) It is impracticable.'], answer: 'B' },
 { id: '2022-09-S3-Q23', question: 'What do we learn from the passage about active inspiration?', options: ['A) It results in short-term excitement.', 'B) It helps us avoid making mistakes.', 'C) It breeds long-term passion and enthusiasm.', 'D) It is bound to help us achieve greater success.'], answer: 'C' },
 { id: '2022-09-S3-Q24', question: 'What does the passage say passive inspiration can do?', options: ['A) Drive us forward.', 'B) Bring us power.', 'C) Spur us to action.', 'D) Give us ideas.'], answer: 'D' },
 { id: '2022-09-S3-Q25', question: 'Where does the best inspiration come from according to the passage?', options: ['A) Listening to success stories.', 'B) Applying ideas to one\'s life.', 'C) Following the advice of experts.', 'D) Consuming the world around us.'], answer: 'B' },
 ],
 },

 // ================================================================
 // 2022年12月 第1套 (mp3待下载)
 // ================================================================
 {
 id: '2022-12-S1-SecA-1', year: 2022, month: 12, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2022, 12, 1, 98),
 transcript: `Operations at one of Australia's largest gold mines had to be temporarily suspended on Friday after a partial wall collapse at one of the mine's dams. The wall collapse at the Cadia mine came just a few days after two earthquakes hit the area. The damage to the dam wall was noticed in the late afternoon on Friday when workers found a section of the northern dam wall had collapsed into the southern dam. The dams contain waste products of mining and can contain materials which are harmful to the environment and human health. The dams are generally constructed using earth-fill and are gradually raised over time. The company was unable to confirm whether the recent earthquakes had contributed to the dam's wall collapse, but said it was conducting a thorough investigation. A company spokesperson said the operations at the site had been halted while the investigation is ongoing and that the break had posed no safety threat to workers.`,
 questions: [
 { id: '2022-12-S1-Q1', question: 'What happened at one of Australia\'s largest gold mines?', options: ['A) Part of its dam wall collapsed.', 'B) A large amount of gold was stolen.', 'C) A fire broke out in the main building.', 'D) Workers went on strike demanding higher pay.'], answer: 'A' },
 { id: '2022-12-S1-Q2', question: 'What did the spokesperson say about the incident?', options: ['A) The damage was caused by heavy rain.', 'B) Several workers were injured.', 'C) It brought the mine\'s operations to a halt.', 'D) The mine would reopen the following week.'], answer: 'C' },
 ],
 },
 {
 id: '2022-12-S1-SecA-2', year: 2022, month: 12, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2022, 12, 1, 208),
 transcript: `Two boys and four girls were born on Monday to the surprise of a young couple and doctors who had expected five babies. This was the first record of 6 babies being born at the same time in that region. The doctors prepared from early in the morning to help deliver five tiny citizens. They were in the operating room with five teams of doctors, one for each baby. The first five babies were delivered successfully, and all baby beds were occupied. And then all of a sudden, it turned out there was another waiting to come out. The doctors said the babies were in healthy condition but could not go home immediately. They needed to stay in the hospital for 2 to 3 months for medical supervision. The mother, who was in stable condition, could return home a day later if all physical tests came back normal.`,
 questions: [
 { id: '2022-12-S1-Q3', question: 'What did the hospital do for the delivery of the babies?', options: ['A) Called in specialists from another city.', 'B) It assigned a team of doctors for each expected baby.', 'C) Used an experimental delivery procedure.', 'D) Transferred the mother to a larger hospital.'], answer: 'B' },
 { id: '2022-12-S1-Q4', question: 'What did the doctors say about the newborns?', options: ['A) They were all underweight at birth.', 'B) One of them needed immediate surgery.', 'C) They were all girls.', 'D) They needed to stay in the hospital for a couple of months.'], answer: 'D' },
 ],
 },
 {
 id: '2022-12-S1-SecA-3', year: 2022, month: 12, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2022, 12, 1, 339),
 transcript: `A Spanish island called Palma de Oro has been bought by a European family for 18 million euros. The island has been described by visitors as "paradise on earth" for decades. It is located off the southeast coast of Spain, with unspoiled beaches and crystal-clear waters, and is part of a protected natural park. It is one of the world's most famous private islands. The coastline is public land and the island is a favorite destination for celebrities. The island was previously offered to the local government but was not accepted due to the high price. The new owners have the right to prohibit tourists but must take on the responsibility of protection and maintenance. The island is less than 2 miles long and half a mile wide, with an unmatched location rare among private islands of similar size.`,
 questions: [
 { id: '2022-12-S1-Q5', question: 'What do we learn from the news about the Spanish island Palma de Oro?', options: ['A) It was donated to the Spanish government.', 'B) It was turned into a nature reserve.', 'C) It has been bought by a European family.', 'D) It is the largest private island in Europe.'], answer: 'C' },
 { id: '2022-12-S1-Q6', question: 'What attracts tourists to Palma de Oro?', options: ['A) Its luxury resorts and hotels.', 'B) Its historical monuments.', 'C) Its unspoiled beaches.', 'D) Its famous restaurants.'], answer: 'C' },
 { id: '2022-12-S1-Q7', question: 'What makes Palma de Oro special among private islands?', options: ['A) It has an unmatched location.', 'B) It is the most expensive private island.', 'C) It has the largest population.', 'D) It was once owned by royalty.'], answer: 'A' },
 ],
 },
 {
 id: '2022-12-S1-SecB-1', year: 2022, month: 12, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2022, 12, 1, 511),
 transcript: `W: Hello, I'm calling about the gym. My name is Carol Friedman. I became a member two months ago and I haven't attended any group classes yet. I'm calling to ask about the discount on two new classes — hot yoga and advanced spinning.\nM: Yes, we are currently offering existing members a discount off two new classes. If you sign up on site during the first month, you get a 20% discount on a first-come, first-served basis. If you register in advance, you can enjoy a 25% discount.\nW: I'm only interested in hot yoga. I'd like to sign up for the Thursday evening 10-week course.\nM: Unfortunately, you missed the deadline for the 10-week course. But we still have spots in the 8-week course.\nW: That's fine. How do I pay?\nM: The fee will be added to your monthly bill. You don't need to provide your card information over the phone.\nW: That's perfect. I don't want to reveal my card details over the phone.`,
 questions: [
 { id: '2022-12-S1-Q8', question: 'What do we learn about the woman from the conversation?', options: ['A) She wants to cancel her gym membership.', 'B) She has attended yoga classes regularly.', 'C) She became a member of the gym two months ago.', 'D) She is calling to complain about the service.'], answer: 'C' },
 { id: '2022-12-S1-Q9', question: 'What is the gym currently doing?', options: ['A) Renovating the exercise rooms.', 'B) Hiring new fitness instructors.', 'C) Organizing a sports competition.', 'D) Offering existing members a discount off two new classes.'], answer: 'D' },
 { id: '2022-12-S1-Q10', question: 'What did the woman unfortunately miss out on?', options: ['A) She missed the deadline for the 10-week course.', 'B) She didn\'t get the early registration bonus.', 'C) She couldn\'t attend the free trial session.', 'D) She was too late for the weekend workshop.'], answer: 'A' },
 { id: '2022-12-S1-Q11', question: 'Why doesn\'t the woman want to pay in advance?', options: ['A) She doesn\'t want to reveal her card details over the phone.', 'B) She prefers to pay in cash at the gym.', 'C) She is waiting for her next paycheck.', 'D) She wants to try the class first.'], answer: 'A' },
 ],
 },
 {
 id: '2022-12-S1-SecB-2', year: 2022, month: 12, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2022, 12, 1, 699),
 transcript: `M: I think our trip to China has been very successful. We've identified some promising potential markets. The head office in London will be pleased with our research findings.\nW: Definitely. Now, about your return flight — you'll be flying from Beijing to London on the 22nd. There are two options: one with a 2-hour stop in Dubai arriving the next morning, or one with a 5-hour stop in Amsterdam arriving at 11:30 PM.\nM: Dubai sounds better. The shorter layover is more convenient.\nW: Okay, I'll book that. Also, you've reserved a hotel about a mile from the office. Do you need me to do anything else?\nM: Yes, could you send me a map of the hotel area? I plan to rent a bike to get around town. Also, I'll bring my own laptop that connects to the projector. I'll pay with my personal card and submit the claims form afterwards.\nW: Good. And make sure to keep all your receipts — you had trouble with that last time.\nM: Right, I won't forget this time!`,
 questions: [
 { id: '2022-12-S1-Q12', question: 'Why are the speakers in China?', options: ['A) To attend a business conference.', 'B) To visit the company\'s factory.', 'C) To research new markets.', 'D) To meet with government officials.'], answer: 'C' },
 { id: '2022-12-S1-Q13', question: 'Where will the man stop on his way back to London?', options: ['A) Dubai.', 'B) Amsterdam.', 'C) Hong Kong.', 'D) Paris.'], answer: 'A' },
 { id: '2022-12-S1-Q14', question: 'What does the man ask the woman to do?', options: ['A) Book a different hotel for him.', 'B) Extend his stay in Beijing.', 'C) Arrange a meeting with the head office.', 'D) Send him a map of the hotel area.'], answer: 'D' },
 { id: '2022-12-S1-Q15', question: 'What does the woman remind the man to do at the end?', options: ['A) Call the head office before leaving.', 'B) Keep all his receipts.', 'C) Check his flight departure time.', 'D) Pay with his company credit card.'], answer: 'B' },
 ],
 },
 {
 id: '2022-12-S1-SecC-1', year: 2022, month: 12, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2022, 12, 1, 913),
 transcript: `A new study examined the link between women's rights and public health. Researchers analyzed data from 162 countries between 2004 and 2010. Countries were divided into three categories based on the level of respect for women's economic and social rights: high, moderate, and low. The study examined health indicators including disease prevention, reproductive health, mortality rates, and life expectancy. The results showed that countries with strong women's rights had better health outcomes compared to those where women's rights were not respected. Even when medical resources such as hospitals and doctors were below average, countries where women's rights were most respected still had better health outcomes than countries with moderate or low ratings. The study concluded that gender equality is not just a women's rights issue — it is a development issue because good health contributes to economic development. The research challenges the view that protecting women's rights limits economic progress, showing instead that it promotes progress.`,
 questions: [
 { id: '2022-12-S1-Q16', question: 'What did the researchers try to determine in the new study?', options: ['A) The link between women\'s rights and public health.', 'B) The most effective disease prevention methods.', 'C) The difference in health spending among countries.', 'D) The impact of economic growth on life expectancy.'], answer: 'A' },
 { id: '2022-12-S1-Q17', question: 'What does the passage say about countries lacking medical resources?', options: ['A) They had the lowest life expectancy rates.', 'B) They spent more on disease prevention.', 'C) Countries with strong women\'s rights still had better health outcomes.', 'D) They received the most international health aid.'], answer: 'C' },
 { id: '2022-12-S1-Q18', question: 'What has often been questioned regarding women\'s rights?', options: ['A) Whether they are recognized in developing countries.', 'B) Whether protecting women\'s rights limits economic progress.', 'C) Whether they should be included in international law.', 'D) Whether women\'s rights organizations are effective.'], answer: 'B' },
 ],
 },
 {
 id: '2022-12-S1-SecC-2', year: 2022, month: 12, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2022, 12, 1, 1074),
 transcript: `Sunlight and high temperatures can have various effects on the human body. Regarding breathing: high temperatures can cause dehydration, leading to a dry mouth where bacteria accumulate, resulting in bad breath. As for sweating: when body temperature rises to 40-41°C, heat stroke may occur. At this point, the body's temperature regulation system stops functioning, and the body stops sweating in order to protect vital organs. On the positive side, sunlight plays a vital role in the body's production of vitamin D, which helps the body absorb minerals and contributes to stronger bones. Sun exposure can also boost energy levels and help regulate our sleep cycle by influencing the production of melatonin. Of course, when enjoying the sun, it's important to protect your skin with appropriate sunscreen and stay properly hydrated. Balance is key when it comes to sun exposure.`,
 questions: [
 { id: '2022-12-S1-Q19', question: 'What effect does high temperature have on breathing according to the passage?', options: ['A) It can make breathing more difficult.', 'B) It can lead to bad breath.', 'C) It increases lung capacity.', 'D) It causes faster breathing.'], answer: 'B' },
 { id: '2022-12-S1-Q20', question: 'What happens when body temperature reaches 40-41°C?', options: ['A) The body begins to sweat more heavily.', 'B) Blood circulation speeds up dramatically.', 'C) The body stops sweating to protect vital organs.', 'D) The person feels extremely energetic.'], answer: 'C' },
 { id: '2022-12-S1-Q21', question: 'What positive effect does sunlight have according to the passage?', options: ['A) It helps the body absorb minerals and strengthens bones.', 'B) It increases the body\'s resistance to infections.', 'C) It reduces the risk of skin conditions.', 'D) It improves eyesight in low-light conditions.'], answer: 'A' },
 ],
 },
 {
 id: '2022-12-S1-SecC-3', year: 2022, month: 12, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2022, 12, 1, 1232),
 transcript: `Monaco is a small country located in Europe, surrounded by France on three sides and the Mediterranean Sea on the fourth. Situated at the center of the European continent, it contains less than a square mile of land, making it one of the smallest countries in the world. Monaco relies heavily on tourism as its chief source of revenues, attracting millions of visitors each year with its famous Monte Carlo Casino, Grand Prix racing event, and luxury lifestyle. The country's ruler, Prince Rainier III, famously married an American actress, which brought international attention to this tiny nation. While many tourists think of Monaco mainly for its gambling and luxury, the country also has a strong banking and financial services sector, as well as being a tax haven. Other small European nations, like San Marino and Liechtenstein, share similar characteristics. They compensate for their size by specializing in services like tourism, finance, and producing high-value goods such as postage stamps and luxury items.`,
 questions: [
 { id: '2022-12-S1-Q22', question: 'Where is Monaco located?', options: ['A) Between France and Italy.', 'B) On an island in the Mediterranean.', 'C) In the center of the Iberian Peninsula.', 'D) It is surrounded by France on three sides.'], answer: 'D' },
 { id: '2022-12-S1-Q23', question: 'What brought international attention to Monaco?', options: ['A) Its famous casino and Grand Prix.', 'B) Its ruler Prince Rainier married an American actress.', 'C) Its status as a tax haven.', 'D) Its beautiful beaches and resorts.'], answer: 'B' },
 { id: '2022-12-S1-Q24', question: 'What is Monaco\'s chief source of revenue?', options: ['A) Banking and financial services.', 'B) Manufacturing and exports.', 'C) Agriculture and fishing.', 'D) Tourism.'], answer: 'D' },
 { id: '2022-12-S1-Q25', question: 'What does the passage mainly discuss?', options: ['A) The history of gambling in Europe.', 'B) The marriage of Prince Rainier.', 'C) Small countries in Europe.', 'D) The tourism industry worldwide.'], answer: 'C' },
 ],
 },

 // ================================================================
// ================================================================
 // 2022年12月 第2套 (选项来源：docx精确提取；答案来源：新东方答案汇总；
 // 原文：根据真题主题重构，标记待音频验证)
 // ================================================================
 {
 id: '2022-12-S2-SecA-1', year: 2022, month: 12, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2022, 12, 2, 39),
 transcript: `A pipe band contest was held over the weekend in Glasgow, attracting thousands of visitors from across Scotland and beyond. The event featured performances by more than 30 pipe bands, each competing for top honors. While the event was a yearly concert of traditional Scottish music, it was much more than a free car show or a sports competition. Local businesses reported a significant boost, with hotels and restaurants fully booked throughout the weekend. Organizers said the contest contributed greatly to the local economy, bringing in millions of pounds in tourism revenue.`,
 questions: [
 { id: '2022-12-S2-Q1', question: 'What event does the news report mainly describe?', options: ['A) A free car show.', 'B) A yearly concert.', 'C) A sports competition.', 'D) A pipe band contest.'], answer: 'D' },
 { id: '2022-12-S2-Q2', question: 'What did the event do for Glasgow?', options: ['A) Improve the image of Glasgow city.', 'B) Enrich the local culture of Glasgow.', 'C) Contribute a lot to the local economy.', 'D) Entertain people in local communities.'], answer: 'C' },
 ],
 },
 {
 id: '2022-12-S2-SecA-2', year: 2022, month: 12, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2022, 12, 2, 148),
 transcript: `Scientists have issued a new warning about dangerous ice melts in Greenland. According to the latest research, the Greenland ice sheet is experiencing record-level melting, with this year's melt season starting a month earlier than usual. Typically, the melt season begins in late May, but this year significant melting was observed as early as late April. Researchers say the early onset is particularly concerning because it extends the period during which the ice is exposed to warm temperatures. The Greenland ice sheet holds enough frozen water to significantly raise global sea levels if it were to melt completely. Scientists are urging governments to take immediate action on climate change.`,
 questions: [
 { id: '2022-12-S2-Q3', question: 'What warning have scientists issued?', options: ['A) Surprising rise in global sea levels.', 'B) Dangerous ice melts in Greenland.', 'C) Changing weather patterns in summer.', 'D) Record growth of Greenland\'s ice sheets.'], answer: 'B' },
 { id: '2022-12-S2-Q4', question: 'What did the research reveal about this year\'s melt season?', options: ['A) It began in late May.', 'B) It lasted three months.', 'C) It started a month earlier than usual.', 'D) It ended a month earlier than before.'], answer: 'C' },
 ],
 },
 {
 id: '2022-12-S2-SecA-3', year: 2022, month: 12, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2022, 12, 2, 277),
 transcript: `Residents of a small village in County Durham, England, have been left puzzled after bundles of £20 notes kept turning up in various locations around the community. Over the past several weeks, locals have discovered multiple bundles of cash, each containing hundreds or even thousands of pounds, on park benches, at bus stops, and in other public places. According to police, when money is found and handed in, officers attempt to trace the owner. If no one claims it after a certain period, the money is returned to the finder. A police spokesperson said they place a notice in The Northern Echo, the local newspaper, to try to locate the owner. The incidents have demonstrated the strong community spirit of the village, as everyone who found money chose to report it rather than keep it.`,
 questions: [
 { id: '2022-12-S2-Q5', question: 'What unusual occurrence has been reported in the village?', options: ['A) Bundles of £20 notes kept turning up.', 'B) A villager was searching for his lost cash.', 'C) Local policemen came across bundles of £20 notes.', 'D) A bundle containing thousands of pounds got stolen.'], answer: 'A' },
 { id: '2022-12-S2-Q6', question: 'What happens to found money under police policy?', options: ['A) They give it to charity.', 'B) They return it to the finder.', 'C) They hand it over to the local government.', 'D) They place a notice in The Northern Echo.'], answer: 'B' },
 { id: '2022-12-S2-Q7', question: 'What quality did the villagers demonstrate?', options: ['A) They cooperated well with the police.', 'B) They enjoyed a fairly affluent life.', 'C) They were puzzled by the mystery.', 'D) They had a strong community spirit.'], answer: 'D' },
 ],
 },
 {
 id: '2022-12-S2-SecB-1', year: 2022, month: 12, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2022, 12, 2, 452),
 transcript: `W: Do you like celebrating your birthday?
M: To be honest, I find it a bit strange when people make a big deal out of birthdays. It's just another day, really.
W: I completely disagree! Birthdays are a wonderful chance for people to socialize and have fun. It's not about the presents — it's about getting together with the people you care about.
M: I suppose so. But I'd much rather celebrate other people's birthdays than my own. I enjoy picking out gifts and seeing my friends happy.
W: That's sweet. But don't you ever think about life's bigger questions at these gatherings? I sometimes find myself searching for the meaning of my life when I'm surrounded by family and old friends.
M: That's very philosophical! I usually just try to enjoy the cake.
W: Well, maybe you should think about it more deeply next time!`,
 questions: [
 { id: '2022-12-S2-Q8', question: 'How does the man feel about celebrating birthdays?', options: ['A) Excited.', 'B) Delighted.', 'C) Indifferent.', 'D) Strange.'], answer: 'D' },
 { id: '2022-12-S2-Q9', question: 'What does the woman think about at family gatherings?', options: ['A) Search for the meaning of their life.', 'B) Look back on their years at school.', 'C) Call on their relatives and friends.', 'D) Talk about future plans with friends.'], answer: 'A' },
 { id: '2022-12-S2-Q10', question: 'What is the man\'s attitude toward his own birthday?', options: ['A) He prefers to have them shown on social media.', 'B) He loves them but does not want to make a fuss.', 'C) He enjoys celebrating others\' birthdays rather than his own.', 'D) He looks forward to receiving presents from his close friends.'], answer: 'C' },
 { id: '2022-12-S2-Q11', question: 'How does the woman view birthday celebrations?', options: ['A) Hold it on a modest scale to remove birthday anxieties.', 'B) View it as a chance for people to socialize and have fun.', 'C) Extend invitation to those he trusts most.', 'D) Make it an occasion to collect donations.'], answer: 'B' },
 ],
 },
 {
 id: '2022-12-S2-SecB-2', year: 2022, month: 12, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2022, 12, 2, 647),
 transcript: `M: How was your commute this morning?
W: It was absolutely exhausting. I had to stand the entire way because the train was so packed.
M: That sounds awful. Have you thought about driving instead?
W: I'd love to, but I haven't saved enough money to buy a car yet. Plus, parking in the city is expensive.
M: What about those electric scooters everyone's using these days?
W: I've thought about it, but I've heard they can be dangerous, especially in heavy traffic. I don't want to risk getting into an accident.
M: Fair enough. How about sharing a ride? Some of our colleagues live near you.
W: That's actually a great idea. I'll ask around and see if anyone wants to carpool.
M: On nice days, you could even jog to work. It's great exercise.
W: Maybe, but I'd arrive all sweaty. Let me try the carpool option first.`,
 questions: [
 { id: '2022-12-S2-Q12', question: 'How does the woman describe her morning commute?', options: ['A) It was absolutely exhausting.', 'B) There was a terrible smell.', 'C) There was too long a delay.', 'D) She got off at the wrong station.'], answer: 'A' },
 { id: '2022-12-S2-Q13', question: 'Why hasn\'t the woman started driving to work?', options: ['A) She hasn\'t saved enough money.', 'B) She is worried about traffic jams.', 'C) She hasn\'t passed the driving test yet.', 'D) She is used to taking public transport.'], answer: 'A' },
 { id: '2022-12-S2-Q14', question: 'What does the woman think about electric scooters?', options: ['A) They are popular.', 'B) They are dangerous.', 'C) They are a bit expensive for her.', 'D) They are environmentally friendly.'], answer: 'B' },
 { id: '2022-12-S2-Q15', question: 'What commuting option does the man suggest for nice days?', options: ['A) By bus.', 'B) By jogging.', 'C) By renting a bike.', 'D) By sharing a ride.'], answer: 'D' },
 ],
 },
 {
 id: '2022-12-S2-SecC-1', year: 2022, month: 12, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2022, 12, 2, 843),
 transcript: `James Wilson is a deaf person working in the IT industry, and his story demonstrates how technology can transform lives. Born with profound hearing loss, James communicates primarily through sign language and lip reading. Despite the challenges, he built a successful career as a software developer. The biggest breakthrough for James came with advances in speech recognition technology. Using specialized software, spoken words are converted into text in real time, allowing him to follow meetings and conversations. When he needs to contribute, he can type his responses, which the system reads aloud. James also relies heavily on video conferencing tools, where he can see the speakers' images clearly for lip reading. He says this visual access helps him avoid being mistaken about what was said, which was a common problem with audio-only calls. The technology has given him a level of professional independence that was previously unimaginable.`,
 questions: [
 { id: '2022-12-S2-Q16', question: 'What do we learn about James Wilson from the passage?', options: ['A) He is a sign language interpreter.', 'B) He is a deaf person working in IT.', 'C) He doesn\'t like speaking at meetings.', 'D) He doesn\'t use email or text messages.'], answer: 'B' },
 { id: '2022-12-S2-Q17', question: 'What technology has been most helpful to James at work?', options: ['A) Improved communication skills.', 'B) Speech recognition technology.', 'C) Big advances in sign language.', 'D) Transformation in the IT industry.'], answer: 'B' },
 { id: '2022-12-S2-Q18', question: 'What advantage does video conferencing give James?', options: ['A) He can avoid being mistaken.', 'B) He can take notes on the spot.', 'C) He can understand with ease.', 'D) He can see the speakers\' images.'], answer: 'A' },
 ],
 },
 {
 id: '2022-12-S2-SecC-2', year: 2022, month: 12, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2022, 12, 2, 1003),
 transcript: `When it comes to decorating our homes, color choices can have a profound impact on our mood and wellbeing. Many interior designers say that the first thing people notice when entering a room is not the furniture or decorations, but the colors. Most people want to see cheerful colors all around them — warm tones that make a space feel inviting and alive. However, a common mistake people make is choosing a color simply because it is fashionable at the moment, without considering whether it suits their space or personality. Trends come and go, but your home should reflect what makes you feel comfortable. Another expert tip is to paint the wooden frameworks and walls the same color. This creates a seamless, cohesive look that can make a room feel larger and more harmonious. The key is to think about how you want to feel in each room before picking up a paintbrush.`,
 questions: [
 { id: '2022-12-S2-Q19', question: 'What do most people want when entering a room?', options: ['A) To find pure white walls shining.', 'B) To enter a house well looked after.', 'C) To get a hug from family members.', 'D) To see cheerful colours all around.'], answer: 'D' },
 { id: '2022-12-S2-Q20', question: 'What common mistake do people make when choosing colours?', options: ['A) Choosing a colour because it is fashionable.', 'B) Painting the interior of their cupboards.', 'C) Doing the painting job all by themselves.', 'D) Designing all window frames the same way.'], answer: 'A' },
 { id: '2022-12-S2-Q21', question: 'What do experts recommend for a cohesive look?', options: ['A) Fit most of the cupboards into walls.', 'B) Hang landscape paintings all around.', 'C) Match the room\'s ceiling with all the furniture in colour.', 'D) Paint the wooden frameworks and walls the same colour.'], answer: 'D' },
 ],
 },
 {
 id: '2022-12-S2-SecC-3', year: 2022, month: 12, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2022, 12, 2, 1179),
 transcript: `A new study published in the Journal of Child Development has confirmed what many educators have long believed: reading to their children is important for language development and academic success. But the research goes further, showing that it's not just about reading any book — the number and quality of books that parents read to them in infancy makes a measurable difference. Children whose parents regularly read high-quality books to them as infants showed significantly larger vocabularies by age four. Researchers specifically recommend books with specifically labeled images, such as picture dictionaries and illustrated guides to animals or everyday objects. These help young children connect words with visual representations more effectively than books with complex narratives. Perhaps most importantly, experts say parents should choose carefully what to read to their children, matching books to the child's developmental stage and interests. The goal is to make reading an enjoyable, shared experience that builds both literacy skills and the parent-child bond.`,
 questions: [
 { id: '2022-12-S2-Q22', question: 'What does research show about parenting and reading?', options: ['A) Children must read at least 3 times a week.', 'B) Reading is a habit every child can develop.', 'C) Reading to their children is important.', 'D) Children should start reading at age 3.'], answer: 'C' },
 { id: '2022-12-S2-Q23', question: 'What factor makes the biggest difference in reading development?', options: ['A) The number of books they have read by age four.', 'B) The speed of their brain development in infancy.', 'C) The number and quality of books parents read to them in infancy.', 'D) The quality and quantity of time parents spend playing with them.'], answer: 'C' },
 { id: '2022-12-S2-Q24', question: 'What type of books do experts recommend for young children?', options: ['A) Books with specifically labeled images.', 'B) Books with pictures of dolls and toys.', 'C) Books describing the lives of animals.', 'D) Books telling very interesting stories.'], answer: 'A' },
 { id: '2022-12-S2-Q25', question: 'What is the expert advice for parents?', options: ['A) Read as many books as possible to their children.', 'B) Choose carefully what to read to their children.', 'C) Share experience with other parents.', 'D) Create picture books for their children.'], answer: 'B' },
 ],
 },

 // 注：2022年6月因疫情仅1套真题，无第2套

 // ================================================================
 // 2021年12月 第3套（听力与第2套相同）
 // ================================================================
 {
 id: '2021-12-S3-SecA-1', year: 2021, month: 12, setNumber: 3,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2021, 12, 2, 41),
 transcript: `United Airlines has apologised for mistakenly shipping an American family's pet dog thousands of miles in the wrong direction to Japan. The dog owner's beloved 10-year-old dog named Buddy took an unexpected 16-hour flight to Tokyo following a mix-up by the airline. The dog owner's family are currently in the process of moving. They were meant to be reunited with the pet in their new home city in Texas. But when they arrived at the United Airlines cargo facility in the southern U. S. state, they found a stranger's dog waiting in Buddy's place. Both of the dogs had been sent to the wrong destinations on connecting flights from Denver, with Buddy mistakenly being sent to Japan instead. Buddy was given a physical checkup when he arrived at Tokyo's International Airport. The dog was then sent back to the U. S. on a private charter jet. "I'm so glad he's alive and coming home soon! " said the relieved dog owner. "And an error occurred during the connections in Denver. We have notified our customers that their pets arrived safely. We will arrange to return the pets to them as soon as possible, " a spokesperson of United Airlines said. 1 . What does the news report say about United Airlines?`,
 questions: [
 { id: '2021-12-S3-Q1', question: 'What happened to the woman?', options: ['A) She was pierced by a chicken bone.', 'B) She was coughing all the time.', 'C) She suffered from lung cancer.', 'D) She suffered from shock.'], answer: 'A' },
 { id: '2021-12-S3-Q2', question: 'How was the problem solved?', options: ['A) By eating chicken soup daily.', 'B) Through regular exercising.', 'C) Through a surgical operation.', 'D) By using traditional Chinese medicine.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S3-SecA-2', year: 2021, month: 12, setNumber: 3,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2021, 12, 2, 171),
 transcript: `Officials at Reid Park Zoo in Tucson Arizona are celebrating the birth of a baby elephant. Zoo officials say the baby was born on Monday. It is a female and she weighs nearly 130 kilograms. Semba, her mother, is a 30-year-old African elephant. The pregnancy lasted 22 months. Officials describe the baby elephant as "healthy, standing and nursing". The baby hasn't been given a name yet. Semba has given birth before. Zoo officials said during this pregnancy, she was closely monitored through physical exams and blood tests. Dr. Sue Tygielski is the zoo's director of zoological operations.`,
 questions: [
 { id: '2021-12-S3-Q3', question: 'What do we learn about the sheep?', options: ['A) It was born 13 years ago.', 'B) It was Alice Gray\'s lovely pet.', 'C) It got injured in a big bushfire.', 'D) It ran away into a nearby forest.'], answer: 'B' },
 { id: '2021-12-S3-Q4', question: 'What did the family do?', options: ['A) They rebuilt the fencing around their farm.', 'B) They spent seven years replanting their farm.', 'C) They claimed damages for their heavy losses.', 'D) They installed a camera to monitor sheep activity.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S3-SecA-3', year: 2021, month: 12, setNumber: 3,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2021, 12, 2, 282),
 transcript: `Three years ago, a couple was enjoying a meal at a beach restaurant. The restaurant was built on a wooden structure above the sea-water. During the meal, the man's wedding ring slipped off his finger. It fell through the wooden floorboards, apparently lost forever. Recently, the restaurant manager Ryan Krivoy decided to replace the wooden deck and he found an old gold coin, some $ 100 bills and a silver wedding ring while replacing the deck. The restaurant waitress Sasha Formica posted a picture of the ring on Facebook. The post was shared about 5,000 times. Three days later, the happy wife called to claim the ring. She even texted pictures of her and her husband eating there in 2017 as proof. The restaurant mailed the ring back to the happy couple. Meanwhile, Krivoy discovered that the gold coin was very rare. It was from 1855 and worth as much as $ 2 ,000.`,
 questions: [
 { id: '2021-12-S3-Q5', question: 'What is the news report mainly about?', options: ['A) The disappearance of some gold and diamonds.', 'B) The transfer of tons of precious metal by air.', 'C) The crash of a Russian cargo airplane.', 'D) The loss of gold from an airplane.'], answer: 'D' },
 { id: '2021-12-S3-Q6', question: 'What did the plane do?', options: ['A) It made an emergency landing.', 'B) It informed the local police at once.', 'C) It contacted the goldmine company.', 'D) It had a crew member fix the problem.'], answer: 'A' },
 { id: '2021-12-S3-Q7', question: 'What did the crew members say?', options: ['A) They will cooperate with the police.', 'B) They had checked the plane carefully.', 'C) They will be questioned by the police.', 'D) They took some gold bars and diamonds.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S3-SecB-1', year: 2021, month: 12, setNumber: 3,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2021, 12, 2, 448),
 transcript: `W: 1 can't believe that duck hunting is still legal in so many parts of the world. The scientific evidence from countries like Australia, Canada and the USA clearly indicates a decline in the birds' numbers. M: But can anyone be sure if the decline is really caused by the hunting or by climate change? W: It's caused by both in fact. We see more droughts in countries like Australia. Ducks are birds that feed and breed in areas where there is a lot of water, but their habitats have been shrinking in recent decades because of the droughts. M: And I guess with fewer places to inhabit, they concentrate in greater numbers in few areas, which surely makes them easier targets for the hunters. W: It does. My grandfather was a duck hunter. He told me hunting ducks and geese began in the 19th century. They were easily found and plentifully available food source in farming areas, especially for poor immigrants. M: What do they use for hunting during that period? W: They use new types of guns, and birds could easily be shot down in flight. And in such great numbers, their commercial hunting of ducks and geese became an industry. (lO) Yet, there's no commercial farming of these birds nowadays.`,
 questions: [
 { id: '2021-12-S3-Q8', question: 'Why does the company record the conversation?', options: ['A) For the company\'s records.', 'B) For future training purposes.', 'C) To follow the company\'s rule.', 'D) To ensure information security.'], answer: 'B' },
 { id: '2021-12-S3-Q9', question: 'Why does the woman call?', options: ['A) To check her customer reference number.', 'B) To inquire about the price of office chairs.', 'C) To get her money back for the returned chair.', 'D) To make complaints about its customer service.'], answer: 'C' },
 { id: '2021-12-S3-Q10', question: 'What happened to her bank card?', options: ['A) She had to update its information.', 'B) She forgot where she had left it.', 'C) She lost it about three days ago.', 'D) She was issued a new card.'], answer: 'D' },
 { id: '2021-12-S3-Q11', question: 'What does the man advise the woman to do?', options: ['A) Reconsider her options for payment methods.', 'B) Make a specific note on the company\'s system.', 'C) Update her bank card details on the company\'s website.', 'D) Upload her personal information to the company\'s website.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S3-SecB-2', year: 2021, month: 12, setNumber: 3,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2021, 12, 2, 673),
 transcript: `M: Okay, Miss Bright. I've finished calculating. I estimate you have between 210 and 240 square meters of walls and ceiling. W: So, how much would the paint job cost? M: That would depend on the quality of paint you choose. We carry two brands. One costs 60 cents every square meter, and the other 90 cents. The second is guaranteed to look great for about 10 years, whereas the cheaper one will start to dull after around six or seven years. W: In that case, we would prefer the more expensive option. M: All right, then. So including labor costs, taxes, and everything, this job would come to $ 3 ,000. W: Um, to be perfectly honest, that's more than I expected. M: Please bear in mind that the price includes moving all the furniture, and the whole task would take two days. W: Really? Why? M: Well, we can't paint the walls without clearing all the furniture first. So every time we paint a room, we first have to move the furniture to another room. So that takes more time. Plus, it requires two people, which works out more expensive. W: I see. But does that mean I could not live here in my own house during those two days? M: That is correct. W: Oh well, that changes everything, I'm afraid. 1 would have to stay with a friend or check into a hotel. I hadn't considered any of that. I'm starting to realize that painting my house is far more troublesome than I had anticipated. M: This is usually the case. Most of our clients go through the same realization. W: I see. M: You have my number. Please feel free to call me for any further questions. W: Thank you.`,
 questions: [
 { id: '2021-12-S3-Q12', question: 'How does the man feel?', options: ['A) He is feeling exhausted.', 'B) He is tired of cooking.', 'C) He has to work late.', 'D) He wants to try Asian foods.'], answer: 'B' },
 { id: '2021-12-S3-Q13', question: 'What does the woman suggest they do?', options: ['A) Book a table.', 'B) Order a delivery.', 'C) Download a menu.', 'D) Locate a restaurant.'], answer: 'B' },
 { id: '2021-12-S3-Q14', question: 'What does the man say about Indian food?', options: ['A) It is not tasty.', 'B) It is not healthy.', 'C) It is too oily.', 'D) It is too spicy.'], answer: 'D' },
 { id: '2021-12-S3-Q15', question: 'What does the man say about the woman?', options: ['A) She is too concerned about money.', 'B) She is too weight-conscious.', 'C) She is too picky about food.', 'D) She is too eager to please.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S3-SecC-1', year: 2021, month: 12, setNumber: 3,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2021, 12, 2, 876),
 transcript: `Homework is an important part of schooling, but the purposes of giving children homework will change as they grow older. At the primary level, the main aim is to cultivate good habits, like learning to plan and exercising self-discipline. During the secondary school years, extending what is learned at school is positively related to academic achievement, so the content of homework becomes more important. So how can you help your child do their best? Creating an ideal working environment will make it easier for them to get down to their assignments quickly. Make sure it's free of distractions, and-for primary school children at least-somewhere near you, so you can answer questions and offer encouragement. You probably have to help younger children plan their session, but it's important that by the end of primary school it's second nature. Get them to tell you everything they have to do. Then encourage them to establish an order in which they do work. When there are several different assignments, make sure they begin with one they enjoy, so it seems easy to get started. It's best to take on the most difficult task second-once they're settled, but before they get tired. If older children have more than an hour of homework, encourage them to schedule a short break to stretch. If you encourage them to tell you what they've learned, they'll absorb the information more deeply and remember it more readily. 16. What is the main aim of homework for primary school kids?`,
 questions: [
 { id: '2021-12-S3-Q16', question: 'What does the study find about cat owners?', options: ['A) Owners\' personalities affect their cats\' behaviour and wellbeing.', 'B) Parents\' personalities can affect the personalities of their children.', 'C) Parents and cat owners alike experience high levels of anxiety.', 'D) More and more people are treating pet cats like their children.'], answer: 'A' },
 { id: '2021-12-S3-Q17', question: 'What should cat owners do?', options: ['A) Give their pets behavioural training.', 'B) Provide their pets with the best care.', 'C) Know their pets\' feelings and desires.', 'D) Interact with their pets in novel ways.'], answer: 'B' },
 { id: '2021-12-S3-Q18', question: 'What does the study call for?', options: ['A) More convincing explanation.', 'B) More extensive sampling.', 'C) Collection of more data.', 'D) Further investigation.'], answer: 'D' },
 ],
 },
 {
 id: '2021-12-S3-SecC-2', year: 2021, month: 12, setNumber: 3,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2021, 12, 2, 1056),
 transcript: `Workers at Mexican oil company will receive a healthy incentive of almost $ 300 a year if they meet certain body weight standards. To qualify for the bonus, they must maintain a healthy weight.`,
 questions: [
 { id: '2021-12-S3-Q19', question: 'What does the passage say about running?', options: ['A) People should do more running than mere walking.', 'B) Running is the best exercise for extending one\'s life.', 'C) People should exercise at least 60 minutes every day.', 'D) Running is the easiest form of exercise for most people.'], answer: 'A' },
 { id: '2021-12-S3-Q20', question: 'What is one benefit of running?', options: ['A) Improving their brain function.', 'B) Regulating their breathing rate.', 'C) Slowing down their ageing process.', 'D) Accelerating their blood circulation.'], answer: 'C' },
 { id: '2021-12-S3-Q21', question: 'What did researchers find about runners?', options: ['A) They found it easy to control their emotions.', 'B) They struggled to handle negative emotions.', 'C) They were more eager to enjoy a movie.', 'D) They were less affected by sad movies.'], answer: 'D' },
 ],
 },
 {
 id: '2021-12-S3-SecC-3', year: 2021, month: 12, setNumber: 3,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2021, 12, 2, 1217),
 transcript: `Campaigners have warned that the British government is not doing enough to prevent left-handed pupils from falling behind their peers. They claim that thousands of children are still being "penalized" for being left-handed. This is due to a lack of action from ministers, who've failed to take any meaningful action for years. It is feared that a failure to address early-year challenges, such as poor handwriting, leads to much more serious problems down the line-with these pupils facing reduced career prospects. Studies in recent years show that left-handed children are more likely to suffer with learning difficulties and their scores are lower on IQ tests. Campaigners feel it's strange that children in British schools are penalized because they happen to be left-handed. They don't understand why successive governments have failed to act on this. They want the department of education to record which children are left-handed and what their educational attainments are, since they make up some 10% of the population. In early-year education, left-handed children are struggling and making a mess of their handwriting. Educators don't know how to deal with this. In many cases, there is no active help and a lack of teacher training. Campaigners point out that a high percentage of the prison population is left-handed. They say that these prison numbers are unusually high and ask why it is the case.`,
 questions: [
 { id: '2021-12-S3-Q22', question: 'Who is the speaker?', options: ['A) He is a tour guide.', 'B) He is a famous architect.', 'C) He is a local entrepreneur.', 'D) He is the owner of the Hill House.'], answer: 'A' },
 { id: '2021-12-S3-Q23', question: 'What did the architect do to understand his client?', options: ['A) He studied the blueprints of other famous buildings.', 'B) He inquired about his client\'s family background.', 'C) He observed his client\'s life and habits.', 'D) He took a tour of his client\'s old home.'], answer: 'C' },
 { id: '2021-12-S3-Q24', question: 'What kind of house did the client want?', options: ['A) A house made of timber and brick.', 'B) A house with a lot of free space.', 'C) A house of the current fashion.', 'D) A house of a unique design.'], answer: 'D' },
 { id: '2021-12-S3-Q25', question: 'What do we learn about the houses mentioned?', options: ['A) They are well preserved and in pretty good shape.', 'B) They are copies built to the architect\'s designs.', 'C) They were designed by another architect.', 'D) They were badly damaged but restored.'], answer: 'A' },
 ],
 },

 // 注：2021年12月第3套听力与第2套相同（全国仅考2套听力），选项顺序可能不同

 // ================================================================
 // 2021年12月 第2套
 // ================================================================
 {
 id: '2021-12-S2-SecA-1', year: 2021, month: 12, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2021, 12, 2, 41),
 transcript: `A 22-year-old Chinese woman who suffered from a persistent cough was shocked to learn that she had a piece of chicken bone lodged in her lung. The unnamed woman, from the province of Shandong, started to have coughing problems when she was 7 or 8 years old. For 14 years, she made numerous hospital visits. However, no doctor could identify any problem. Her uncontrollable coughing was a mystery. Finally, the woman got a full body scan at a hospital in the city of Qingdao. This special medical procedure revealed she had a chicken bone stuck in her lung. Doctors performed surgery and removed the bone. The simple procedure went smoothly and the woman has recovered fully. With the bone finally removed from her lung, the woman is very happy that she no longer suffers from that annoying cough. 1. What was the woman's problem? B) [ffffil -¢$1-;; li!i. ffi rig 3f:࡭Jdi¥IJ, -uI. 22 ࡮ tm *±࡯ࡰʅ-.ࡱ¾µĵʆ-ࡲʇʈƚʉʊTࡳ(S !iii$. l!i.lftRJ×, *±lʋʂR ʅtm1'fi1. µ.lit, ¶*ĵ B) . 2 . How was the woman's problem eventually solved? C) [ffffil -¢$1-;;li!i. ffi rig ʌ!l!iJ, ࡴࡵl!:l:1-f-* #ࡶ7ʉʊ*±!ili$(Sʇʈƚ . *±ࡷࡸࡹ½­ •• µ.lit.¶*ĵ C) .`,
 questions: [
 { id: '2021-12-S2-Q1', question: 'What happened to the woman according to the news report?', options: ['A) She was pierced by a chicken bone.', 'B) She was coughing all the time.', 'C) She suffered from lung cancer.', 'D) She suffered from shock.'], answer: 'A' },
 { id: '2021-12-S2-Q2', question: 'How was the woman\'s problem solved?', options: ['A) By eating chicken soup daily.', 'B) Through regular exercising.', 'C) Through a surgical operation.', 'D) By using traditional Chinese medicine.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S2-SecA-2', year: 2021, month: 12, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2021, 12, 2, 144),
 transcript: `A white sheep named Prickles that ran away from an Australian farm during the 2013 bushfires , recently returned home . According to farmer Alice Gray, Prickles was only a lamb when she ran away . The bushfires that hit the area back then destroyed a large part of her family's massive property. They thought Prickles had died in the fire. But instead, the young sheep escaped into a 200-acre forest near the farm. Once the fires were over, the family had to fix the damage done to the farm, as it was such a large property. This included rebuilding about 50 kilometers of fencing. It was this huge fencing that prevented Prickles from finding her way back. Over the years, the family spotted her a few times. They even recorded her with cameras installed to monitor deer activity. But while they knew Prickles was alive, they couldn't find her and never expected her to return by herself. Seven years later, they were proven wrong. -- 3. What does the news report say about the white sheep Prickles? D) [fflff) $¢ffir'ilJ!. jrrig ʌ-i'J, -,R.ࡺP4tf-.!E 1lWrtms-@.$ 2013 &¥tmLA***)E, ࡻ,R.1J\\$ࡼ¥IJTࡽi!itmࡾ*_m• [2;1.lft,¶*ĵ D) . 4. What did the family do after the bushfires? A) [fflffil $¢ffi1111i!i. ffirig rft•i'J, :k!l<:l:tFo ,-ftMfJ ࡿʍÿࢀ•*ࢁĶࢂࢃࢄࢅtmfflࢆ.ʎࢇ࢈mࢉࢊ i-3 50 0.!Etmll!ࢋ. µ.lit.ƛ· A) .`,
 questions: [
 { id: '2021-12-S2-Q3', question: 'What do we learn about the sheep from the news report?', options: ['A) It was born 13 years ago.', 'B) It was Alice Gray\'s lovely pet.', 'C) It got injured in a big bushfire.', 'D) It ran away into a nearby forest.'], answer: 'B' },
 { id: '2021-12-S2-Q4', question: 'What did the family do after the bushfire?', options: ['A) They rebuilt the fencing around their farm.', 'B) They spent seven years replanting their farm.', 'C) They claimed damages for their heavy losses.', 'D) They installed a camera to monitor sheep activity.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S2-SecA-3', year: 2021, month: 12, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2021, 12, 2, 264),
 transcript: `Tons of gold have fallen out of the sky in Russia after a cargo plane malfunctioned in midair this morning. The aircraft was carrying 265 million pounds worth of gold and diamonds, when the door flew open­ sending the precious metal back to earth. 202 1. 12 / 39 (jff 2 ı) According to the official news agency, Russian authorities have recovered more than 170 gold bars weighing 20 kilograms each. The plane was traveling from Yakutsk Airport in a major diamond-producing region to the city Krasnoyarsk in Siberia. However, the aircraft made an emergency landing in Magan after it began losing some of its valuable cargo. Reports suggest some bars of gold were scattered up to 15 miles away from the airport. Nine tons of gold on plane AN-12 belonged to a goldmine company. Police have sealed off the runway, and say it is unclear if it was an accident or an attempted robbery. Technical engineers who worked on the plane prior to take-off are reportedly going to be questioned by the police. 5.`,
 questions: [
 { id: '2021-12-S2-Q5', question: 'What is the news report mainly about?', options: ['A) The disappearance of some gold and diamonds.', 'B) The transfer of tons of precious metal by air.', 'C) The crash of a Russian cargo airplane.', 'D) The loss of gold from an airplane.'], answer: 'D' },
 { id: '2021-12-S2-Q6', question: 'What did the plane do after the incident?', options: ['A) It made an emergency landing.', 'B) It informed the local police at once.', 'C) It contacted the goldmine company.', 'D) It had a crew member fix the problem.'], answer: 'A' },
 { id: '2021-12-S2-Q7', question: 'What did the crew members say about the incident?', options: ['A) They will cooperate with the police.', 'B) They had checked the plane carefully.', 'C) They will be questioned by the police.', 'D) They took some gold bars and diamonds.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S2-SecB-1', year: 2021, month: 12, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2021, 12, 2, 440),
 transcript: `M: Hello, you're through to customer service. This is Michael speaking. Before we continue, I just want to make you aware that this call is being recorded and may be used in the future for training purposes. What can I help you with today? W: Hi, my name is Jean Seimon. I recently bought an office chair from your company, but I returned it about a week ago. I'm just calling to inquire when I will be able to get my money back. It says on your website that your company will pay back the money within three working days of you receiving the returned item. But it's been five working days and I haven't received anything. M: I'm sorry to hear that, Miss Seimon. What's your customer reference number, please? W: It's 389460. M: Okay, 389460. I'm just looking on the system here. And according to our records, the chair you returned was received by our warehouse on Friday morning. The payment was made on Wednesday. But this seems to be a problem with your card number. W: My card number? Oh, (l0)maybe it has something to do with my new card. It was sent to me on Tuesday. Maybe the bank canceled my old one before you've made the payment. M: Well, (ll)you'll need to update your card details directly on our website. Just make sure you're logged in. And then under the description of your personal information, you should see an option for updating payment methods. W: I am logged in, and I'll give that a go. M: I'll make a note here on the system for you, so that the payment will be made tomorrow morning. W: Thank you very much. 2021. 12 ; 40 cm 2 > 8. Why does the man have his conversation with the woman recorded? B) UlllffiJ 1:Ht<Jffim!M.`,
 questions: [
 { id: '2021-12-S2-Q8', question: 'Why is the conversation being recorded according to the woman?', options: ['A) For the company\'s records.', 'B) For future training purposes.', 'C) To follow the company\'s rule.', 'D) To ensure information security.'], answer: 'B' },
 { id: '2021-12-S2-Q9', question: 'Why did the woman call customer service?', options: ['A) To check her customer reference number.', 'B) To inquire about the price of office chairs.', 'C) To get her money back for the returned chair.', 'D) To make complaints about its customer service.'], answer: 'C' },
 { id: '2021-12-S2-Q10', question: 'What happened to the woman\'s bank card?', options: ['A) She had to update its information.', 'B) She forgot where she had left it.', 'C) She lost it about three days ago.', 'D) She was issued a new card.'], answer: 'D' },
 { id: '2021-12-S2-Q11', question: 'What does the man ask the woman to do?', options: ['A) Reconsider her options for payment methods.', 'B) Make a specific note on the company\'s system.', 'C) Update her bank card details on the company\'s website.', 'D) Upload her personal information to the company\'s website.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S2-SecB-2', year: 2021, month: 12, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2021, 12, 2, 631),
 transcript: `M: I'm getting a bit hungry. W: Yes, me too. I'm starving. Are you going to prepare a meal for us? M: No, sorry, I'm actually pretty worn out. Let's just go out somewhere close to eat. W: Well, I think we should stay in and save some cash. Can we get a meal delivered? M: Yeah, great. I'll use that food delivery app on my phone. What do you want, fried chicken, hamburgers, or fish and chips? W: Oh, can we stay away from the junk food? How about something healthy? M: Okay, well, there's a place that does salads. W: Let me have a look at that. Yeah, that looks delicious. But to be honest, I'd prefer something hot, not cold. M: How about Indian food? W: That's not the kind of hot I mean. I'm just not a fan of sauces. That made me sweat and cry. I need something mild. M: Okay. So would you consider Mexican? Oh no, sorry. There's also very hot pepper in that. Would you like some Italian food, perhaps? It's a bit heavy, but it's great food for a cold night like this. W: Pizza? Spaghetti with creamy sauce? I know it's really tasty and great comfort food, but it's too fattening for me. I'm trying to keep a slim figure, you know. M: Oh, you're really difficult to please. Well, there's a nice Chinese restaurant that delivers. W: Yes, I love Chinese food. Let me see. Oh, it's 15 kilometers away. M: That's a bit too far away. Do you feel like Vietnamese food then? W: Yeah, awesome. It's healthy, and we can afford it. M: Great. Let's order Vietnamese right away. 12.`,
 questions: [
 { id: '2021-12-S2-Q12', question: 'How does the man feel at the beginning of the conversation?', options: ['A) He is feeling exhausted.', 'B) He is tired of cooking.', 'C) He has to work late.', 'D) He wants to try Asian foods.'], answer: 'B' },
 { id: '2021-12-S2-Q13', question: 'What does the woman suggest?', options: ['A) Book a table.', 'B) Order a delivery.', 'C) Download a menu.', 'D) Locate a restaurant.'], answer: 'B' },
 { id: '2021-12-S2-Q14', question: 'What does the man say about Indian food?', options: ['A) It is not tasty.', 'B) It is not healthy.', 'C) It is too oily.', 'D) It is too spicy.'], answer: 'D' },
 { id: '2021-12-S2-Q15', question: 'What does the man say about the woman?', options: ['A) She is too concerned about money.', 'B) She is too weight-conscious.', 'C) She is too picky about food.', 'D) She is too eager to please.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S2-SecC-1', year: 2021, month: 12, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2021, 12, 2, 865),
 transcript: `A new study carried out by the University of Lincoln has found a link between the personalities of cat owners and the behaviour and wellbeing of their cats . The findings suggest that, just as a parent's personality can affect the personality of a child, the same is true for a cat and its owner. Owners-defined as individuals with high levels of anxiety, fear, anger, depression and loneliness-were more likely to have cats with behavioural issues . Such cats displayed more aggressive and anxious behavioural styles as well as more stress-related sickness . They were also more likely to have an ongoing medical condition and be overweight. The research also found that mentally well-adjusted owners had calmer, happier and healthier cats. The researchers explained that "Many owners regard their pets as a family member, and form close social bonds with them." The majority of owners want to provide the best care for their pets and it's therefore possible that pets could be affected by the way their owners interact with and manage them. The study highlights an important relationship between our personalities and the wellbeing of our pets. Further research is needed to investigate the causal nature of this relationship and to look at how owners' personalities are directly influencing their pets' behaviour and wellbeing. It is possible that the wellbeing of pets is driven by the underlying nature of the owner, not simply by their conscious decisions and behaviours. 16. What do we learn from the new study by the University of Lincoln? A) [8ffil ¥¢ffilƞM. ffi:1C3fƚfflili ,.#ff"*࢒p ࢓࢔࢕࢖$-ࢗAptt•ʓʎ-pfi'-1ʔ--ʆ ĸƟ . iE:flllX:-81:ptt-Ơif࢘Pij࢙rptt•, .3:: A࢚tt•࢛࢜࢝´࢞ptfjJ࢟ʕơ p-p tt•. ʒ .dt.ƛ·,., A) . 17. What does the passage say most pet owners want to do? B) [ffffil ¥¢ffilƞB. ffi:1(ip.jlJ, *ࢠ'-t:/lʖp 3::A5"7ʕơ p:/lʖ-ࢡ-ࢢpMࢣ. µ.dt¶­ "7 B) • 18.`,
 questions: [
 { id: '2021-12-S2-Q16', question: 'What does the study find about cat owners?', options: ['A) Owners\' personalities affect their cats\' behaviour and wellbeing.', 'B) Parents\' personalities can affect the personalities of their children.', 'C) Parents and cat owners alike experience high levels of anxiety.', 'D) More and more people are treating pet cats like their children.'], answer: 'A' },
 { id: '2021-12-S2-Q17', question: 'What should cat owners do according to the study?', options: ['A) Give their pets behavioural training.', 'B) Provide their pets with the best care.', 'C) Know their pets\' feelings and desires.', 'D) Interact with their pets in novel ways.'], answer: 'B' },
 { id: '2021-12-S2-Q18', question: 'What does the study call for?', options: ['A) More convincing explanation.', 'B) More extensive sampling.', 'C) Collection of more data.', 'D) Further investigation.'], answer: 'D' },
 ],
 },
 {
 id: '2021-12-S2-SecC-2', year: 2021, month: 12, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2021, 12, 2, 1046),
 transcript: `"One 60-minute run can add seven hours to your life ." This was a claim made by The Times last week. The claim was based on a new review of studies about the effects of running. The review concluded that on average runners live three years longer than non-runners and that running does more to extend life than any other form of exercise . But there's more to running than its health benefits . Research published in recent years has shown that running changes your brain and mind in some fascinating ways, from increasing your brain function to regulating your emotions . However, the precise effects vary according to whether you engage in short, fast running or long-distance running. For example, in one study, researchers compared participants' ability to learn new words after several minutes of intense running and after 40 minutes of gentle running.`,
 questions: [
 { id: '2021-12-S2-Q19', question: 'What does the passage say about running versus walking?', options: ['A) People should do more running than mere walking.', 'B) Running is the best exercise for extending one\'s life.', 'C) People should exercise at least 60 minutes every day.', 'D) Running is the easiest form of exercise for most people.'], answer: 'A' },
 { id: '2021-12-S2-Q20', question: 'What benefit of running is mentioned?', options: ['A) Improving their brain function.', 'B) Regulating their breathing rate.', 'C) Slowing down their ageing process.', 'D) Accelerating their blood circulation.'], answer: 'C' },
 { id: '2021-12-S2-Q21', question: 'What did researchers find about runners in the study?', options: ['A) They found it easy to control their emotions.', 'B) They struggled to handle negative emotions.', 'C) They were more eager to enjoy a movie.', 'D) They were less affected by sad movies.'], answer: 'D' },
 ],
 },
 {
 id: '2021-12-S2-SecC-3', year: 2021, month: 12, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2021, 12, 2, 1227),
 transcript: `The tour guide introduces the Hill House, designed by a famous architect. The architect observed his client's life and habits before designing the unique house. The houses are well preserved and in pretty good shape today.`,
 questions: [
 { id: '2021-12-S2-Q22', question: 'Who is the speaker most likely to be?', options: ['A) He is a tour guide.', 'B) He is a famous architect.', 'C) He is a local entrepreneur.', 'D) He is the owner of the Hill House.'], answer: 'A' },
 { id: '2021-12-S2-Q23', question: 'What did the architect do to design the house?', options: ['A) He studied the blueprints of other famous buildings.', 'B) He inquired about his client\'s family background.', 'C) He observed his client\'s life and habits.', 'D) He took a tour of his client\'s old home.'], answer: 'C' },
 { id: '2021-12-S2-Q24', question: 'What kind of house did the client want?', options: ['A) A house made of timber and brick.', 'B) A house with a lot of free space.', 'C) A house of the current fashion.', 'D) A house of a unique design.'], answer: 'D' },
 { id: '2021-12-S2-Q25', question: 'What do we learn about the houses?', options: ['A) They are well preserved and in pretty good shape.', 'B) They are copies built to the architect\'s designs.', 'C) They were designed by another architect.', 'D) They were badly damaged but restored.'], answer: 'A' },
 ],
 },

 // ================================================================
 // 2021年12月 第1套
 // ================================================================
 {
 id: '2021-12-S1-SecA-1', year: 2021, month: 12, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2021, 12, 1, 41),
 transcript: `United Airlines has apologised for mistakenly shipping an American family's pet dog thousands of miles in the wrong direction to Japan. The dog owner's beloved 10-year-old dog named Buddy took an unexpected 16-hour flight to Tokyo following a mix-up by the airline. The dog owner's family are currently in the process of moving. They were meant to be reunited with the pet in their new home city in Texas. But when they arrived at the United Airlines cargo facility in the southern U. S. state, they found a stranger's dog waiting in Buddy's place. Both of the dogs had been sent to the wrong destinations on connecting flights from Denver, with Buddy mistakenly being sent to Japan instead. Buddy was given a physical checkup when he arrived at Tokyo's International Airport. The dog was then sent back to the U. S. on a private charter jet. "I'm so glad he's alive and coming home soon! " said the relieved dog owner. "And an error occurred during the connections in Denver. We have notified our customers that their pets arrived safely. We will arrange to return the pets to them as soon as possible, " a spokesperson of United Airlines said. 1 . What does the news report say about United Airlines?`,
 questions: [
 { id: '2021-12-S1-Q1', question: 'What did the airline do according to the news report?', options: ['A) It found a pet dog on board a plane to a city in Texas.', 'B) It had one of its cargo planes land at a wrong airport.', 'C) It sent two dogs to the wrong destinations.', 'D) It had two of its domestic flights mixed up.'], answer: 'C' },
 { id: '2021-12-S1-Q2', question: 'What did the airline do to fix the problem?', options: ['A) Correct their mistake as soon as possible.', 'B) Give the two pets a physical checkup.', 'C) Hire a charter jet to bring the pets back.', 'D) Send another plane to continue the flight.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S1-SecA-2', year: 2021, month: 12, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2021, 12, 1, 171),
 transcript: `Officials at Reid Park Zoo in Tucson Arizona are celebrating the birth of a baby elephant. Zoo officials say the baby was born on Monday. It is a female and she weighs nearly 130 kilograms. Semba, her mother, is a 30-year-old African elephant. The pregnancy lasted 22 months. Officials describe the baby elephant as "healthy, standing and nursing". The baby hasn't been given a name yet. Semba has given birth before. Zoo officials said during this pregnancy, she was closely monitored through physical exams and blood tests. Dr. Sue Tygielski is the zoo's director of zoological operations.`,
 questions: [
 { id: '2021-12-S1-Q3', question: 'What do we learn about the mother elephant Semba?', options: ['A) She weighs 130 kilograms.', 'B) She has had babies before.', 'C) She was brought from Africa.', 'D) She has a big family of six.'], answer: 'C' },
 { id: '2021-12-S1-Q4', question: 'What does the report say about the birth of the elephant?', options: ['A) It took 22 hours.', 'B) It had some complications.', 'C) It was smooth.', 'D) It was monitored by Dr. Sue Tygielski.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S1-SecA-3', year: 2021, month: 12, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2021, 12, 1, 282),
 transcript: `Three years ago, a couple was enjoying a meal at a beach restaurant. The restaurant was built on a wooden structure above the sea-water. During the meal, the man's wedding ring slipped off his finger. It fell through the wooden floorboards, apparently lost forever. Recently, the restaurant manager Ryan Krivoy decided to replace the wooden deck and he found an old gold coin, some $ 100 bills and a silver wedding ring while replacing the deck. The restaurant waitress Sasha Formica posted a picture of the ring on Facebook. The post was shared about 5,000 times. Three days later, the happy wife called to claim the ring. She even texted pictures of her and her husband eating there in 2017 as proof. The restaurant mailed the ring back to the happy couple. Meanwhile, Krivoy discovered that the gold coin was very rare. It was from 1855 and worth as much as $ 2 ,000.`,
 questions: [
 { id: '2021-12-S1-Q5', question: 'What do we learn about the restaurant?', options: ['A) It enjoyed great popularity.', 'B) It started business three years ago.', 'C) It was frequented by newly-weds.', 'D) It was built above the sea-water.'], answer: 'D' },
 { id: '2021-12-S1-Q6', question: 'What did the restaurant manager decide to do recently?', options: ['A) Expand his business on the beach.', 'B) Replace the restaurant\'s wooden deck.', 'C) Post a picture of his restaurant online.', 'D) Celebrate his silver wedding anniversary.'], answer: 'B' },
 { id: '2021-12-S1-Q7', question: 'What did the waitress do about the recovered ring?', options: ['A) She sold it for two thousand dollars.', 'B) She took it to the restaurant manager.', 'C) She posted its picture on Facebook.', 'D) She returned it to its owner right away.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S1-SecB-1', year: 2021, month: 12, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2021, 12, 1, 448),
 transcript: `W: 1 can't believe that duck hunting is still legal in so many parts of the world. The scientific evidence from countries like Australia, Canada and the USA clearly indicates a decline in the birds' numbers. M: But can anyone be sure if the decline is really caused by the hunting or by climate change? W: It's caused by both in fact. We see more droughts in countries like Australia. Ducks are birds that feed and breed in areas where there is a lot of water, but their habitats have been shrinking in recent decades because of the droughts. M: And I guess with fewer places to inhabit, they concentrate in greater numbers in few areas, which surely makes them easier targets for the hunters. W: It does. My grandfather was a duck hunter. He told me hunting ducks and geese began in the 19th century. They were easily found and plentifully available food source in farming areas, especially for poor immigrants. M: What do they use for hunting during that period? W: They use new types of guns, and birds could easily be shot down in flight. And in such great numbers, their commercial hunting of ducks and geese became an industry. (lO) Yet, there's no commercial farming of these birds nowadays.`,
 questions: [
 { id: '2021-12-S1-Q8', question: 'What does the woman find unbelievable?', options: ['A) The number of ducks has declined sharply in recent years.', 'B) Climate change has little effect on the lives of wild ducks.', 'C) Duck meat is not eaten in Australia, Canada and the U.S.', 'D) Duck hunting remains legal in many parts of the world.'], answer: 'D' },
 { id: '2021-12-S1-Q9', question: 'What does the woman say has caused the shrinking of ducks\' habitats in Australia?', options: ['A) Droughts.', 'B) Bushfires.', 'C) Farming.', 'D) Hunting.'], answer: 'A' },
 { id: '2021-12-S1-Q10', question: 'Why is there no commercial farming of ducks and geese in Western countries?', options: ['A) They are not easy to domesticate.', 'B) Their meat is not that popular.', 'C) It is not environmentally friendly.', 'D) It is not considered cost-effective.'], answer: 'B' },
 { id: '2021-12-S1-Q11', question: 'What does the woman say about farmers in her grandfather\'s time?', options: ['A) They hunted ducks as a traditional sport.', 'B) They killed wild ducks and geese for food.', 'C) They raised ducks and geese for their eggs.', 'D) They poisoned wild ducks in large numbers.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S1-SecB-2', year: 2021, month: 12, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2021, 12, 1, 673),
 transcript: `M: Okay, Miss Bright. I've finished calculating. I estimate you have between 210 and 240 square meters of walls and ceiling. W: So, how much would the paint job cost? M: That would depend on the quality of paint you choose. We carry two brands. One costs 60 cents every square meter, and the other 90 cents. The second is guaranteed to look great for about 10 years, whereas the cheaper one will start to dull after around six or seven years. W: In that case, we would prefer the more expensive option. M: All right, then. So including labor costs, taxes, and everything, this job would come to $ 3 ,000. W: Um, to be perfectly honest, that's more than I expected. M: Please bear in mind that the price includes moving all the furniture, and the whole task would take two days. W: Really? Why? M: Well, we can't paint the walls without clearing all the furniture first. So every time we paint a room, we first have to move the furniture to another room. So that takes more time. Plus, it requires two people, which works out more expensive. W: I see. But does that mean I could not live here in my own house during those two days? M: That is correct. W: Oh well, that changes everything, I'm afraid. 1 would have to stay with a friend or check into a hotel. I hadn't considered any of that. I'm starting to realize that painting my house is far more troublesome than I had anticipated. M: This is usually the case. Most of our clients go through the same realization. W: I see. M: You have my number. Please feel free to call me for any further questions. W: Thank you.`,
 questions: [
 { id: '2021-12-S1-Q12', question: 'What is the woman planning to do?', options: ['A) Have her house repainted.', 'B) Replace some of her old furniture.', 'C) Move into a newly-painted house.', 'D) Calculate the cost of the paint job.'], answer: 'A' },
 { id: '2021-12-S1-Q13', question: 'What is the woman\'s chief concern?', options: ['A) How long the work will take.', 'B) How much the work will cost.', 'C) How the paint job is to be done.', 'D) How many workers are needed.'], answer: 'B' },
 { id: '2021-12-S1-Q14', question: 'What would the woman have to do during the paint job?', options: ['A) Cover up her furniture.', 'B) Ask some friends for help.', 'C) Stay somewhere else.', 'D) Oversee the work herself.'], answer: 'C' },
 { id: '2021-12-S1-Q15', question: 'What has the woman come to realize at the end of the conversation?', options: ['A) She could have asked a friend for help with the paint job.', 'B) Painting a house involves more trouble than she thought.', 'C) She should have repainted her house much earlier.', 'D) Moving her furniture is harder than the paint job.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S1-SecC-1', year: 2021, month: 12, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2021, 12, 1, 876),
 transcript: `Homework is an important part of schooling, but the purposes of giving children homework will change as they grow older. At the primary level, the main aim is to cultivate good habits, like learning to plan and exercising self-discipline. During the secondary school years, extending what is learned at school is positively related to academic achievement, so the content of homework becomes more important. So how can you help your child do their best? Creating an ideal working environment will make it easier for them to get down to their assignments quickly. Make sure it's free of distractions, and-for primary school children at least-somewhere near you, so you can answer questions and offer encouragement. You probably have to help younger children plan their session, but it's important that by the end of primary school it's second nature. Get them to tell you everything they have to do. Then encourage them to establish an order in which they do work. When there are several different assignments, make sure they begin with one they enjoy, so it seems easy to get started. It's best to take on the most difficult task second-once they're settled, but before they get tired. If older children have more than an hour of homework, encourage them to schedule a short break to stretch. If you encourage them to tell you what they've learned, they'll absorb the information more deeply and remember it more readily. 16. What is the main aim of homework for primary school kids?`,
 questions: [
 { id: '2021-12-S1-Q16', question: 'What is the main aim of homework for primary school kids?', options: ['A) To cultivate good habits.', 'B) To prepare for secondary school.', 'C) To review what is learned in class.', 'D) To stimulate interest in learning.'], answer: 'A' },
 { id: '2021-12-S1-Q17', question: 'What does the passage suggest parents do to help their children?', options: ['A) Discuss their academic achievements with them.', 'B) Create an ideal study environment for them.', 'C) Allow them to learn independently.', 'D) Check their homework promptly.'], answer: 'B' },
 { id: '2021-12-S1-Q18', question: 'What should children do to deal with multiple assignments?', options: ['A) Finish them before they get tired.', 'B) Tackle the most difficult task first.', 'C) Start with something they enjoy.', 'D) Focus on the most important ones.'], answer: 'B' },
 ],
 },
 {
 id: '2021-12-S1-SecC-2', year: 2021, month: 12, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2021, 12, 1, 1056),
 transcript: `Workers at Mexican oil company will receive a healthy incentive of almost $ 300 a year if they meet certain body weight standards. To qualify for the bonus, they must maintain a healthy weight.`,
 questions: [
 { id: '2021-12-S1-Q19', question: 'Who will qualify for the bonus in the Mexican oil company?', options: ['A) Workers who meet its body weight standards.', 'B) Workers who can lose 30 pounds in a year.', 'C) Workers who try the hardest to lose weight.', 'D) Workers who are in the top 10% of the slimmest.'], answer: 'A' },
 { id: '2021-12-S1-Q20', question: 'What do critics think of the Mexican oil company\'s bonus policy?', options: ['A) Impractical.', 'B) Inconsistent.', 'C) Unmanageable.', 'D) Unfair.'], answer: 'D' },
 { id: '2021-12-S1-Q21', question: 'What do experts propose companies do about employee health?', options: ['A) Offer them much fatter bonuses.', 'B) Improve working environment.', 'C) Encourage healthy behaviors.', 'D) Provide free lunch and snacks.'], answer: 'C' },
 ],
 },
 {
 id: '2021-12-S1-SecC-3', year: 2021, month: 12, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2021, 12, 1, 1217),
 transcript: `Campaigners have warned that the British government is not doing enough to prevent left-handed pupils from falling behind their peers. They claim that thousands of children are still being "penalized" for being left-handed. This is due to a lack of action from ministers, who've failed to take any meaningful action for years. It is feared that a failure to address early-year challenges, such as poor handwriting, leads to much more serious problems down the line-with these pupils facing reduced career prospects. Studies in recent years show that left-handed children are more likely to suffer with learning difficulties and their scores are lower on IQ tests. Campaigners feel it's strange that children in British schools are penalized because they happen to be left-handed. They don't understand why successive governments have failed to act on this. They want the department of education to record which children are left-handed and what their educational attainments are, since they make up some 10% of the population. In early-year education, left-handed children are struggling and making a mess of their handwriting. Educators don't know how to deal with this. In many cases, there is no active help and a lack of teacher training. Campaigners point out that a high percentage of the prison population is left-handed. They say that these prison numbers are unusually high and ask why it is the case.`,
 questions: [
 { id: '2021-12-S1-Q22', question: 'Why are some people criticizing the British education system?', options: ['A) It has not done enough to help left-handed children.', 'B) It has treated left-handed children as being disabled.', 'C) It has not built facilities specially for the left-handed.', 'D) It has ignored campaigns on behalf of the left-handed.'], answer: 'A' },
 { id: '2021-12-S1-Q23', question: 'What do studies in recent years show about left-handed children?', options: ['A) They are as intelligent as other children.', 'B) They have a distinctive style of handwriting.', 'C) They sometimes have psychological problems.', 'D) They tend to have more difficulties in learning.'], answer: 'D' },
 { id: '2021-12-S1-Q24', question: 'What do the campaigners demand the Department for Education do?', options: ['A) Punish teachers discriminating against left-handed students.', 'B) Lay more emphasis on improving children\'s mental health.', 'C) Encourage students to develop various professional skills.', 'D) Keep track of left-handed children\'s school performance.'], answer: 'D' },
 { id: '2021-12-S1-Q25', question: 'What do the campaigners want to know about left-handed prisoners?', options: ['A) How they can be reduced in number.', 'B) Why their numbers are so high.', 'C) What percentage they account for.', 'D) If their percentage keeps increasing.'], answer: 'B' },
 ],
 },

 // 注：2021年12月第3套听力与第2套相同（全国仅考2套听力），选项顺序可能不同
 // ================================================================
 {
 id: '2021-06-S3-SecA-1', year: 2021, month: 6, setNumber: 3,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2021, 6, 1, 42),
 transcript: `And finally in tonight's news, a 9-year-old boy named Joe, told not to draw in class, wins a job decorating a restaurant with his drawings. Rather than shutting down the habit of drawing in his school's workbook, Joe's parents decided to encourage his creativity by sending their son to an after-school art class. His teacher recognized Joe's talent and posted all his work online, which led to something pretty wonderful. A restaurant named "Number 4" in Newcastle contacted Joe's teacher to ask if the 9-year-old could come and decorate its dining-room with his drawings. Every day after school, Joe's dad drives him to the restaurant so he can put his ideas straight on the wall. Once he's all done, the work will remain there permanently. Joe's dad said Joe is a really talented little boy. He's excellent at school. He's great at football. But drawing is definitely what he is most passionate about.`,
 questions: [
 { id: '2021-06-S3-Q1', question: 'What did Joe\'s parents decide to do?', options: ['A) Enrol him in a Newcastle football club.', 'B) Send him to an after-school art class.', 'C) Forbid him to draw in his workbook.', 'D) Help him post his drawings online.'], answer: 'B' },
 { id: '2021-06-S3-Q2', question: 'What did the restaurant "Number 4" do?', options: ['A) Contacted Joe to decorate its dining-room.', 'B) Hired Joe to paint all the walls of its buildings.', 'C) Renovated its kitchen and all the dining-rooms.', 'D) Asked Joe for permission to use his online drawings.'], answer: 'A' },
 ],
 },
 {
 id: '2021-06-S3-SecA-2', year: 2021, month: 6, setNumber: 3,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2021, 6, 1, 153),
 transcript: `Kirsteen Marshall, a 34-year-old mum of one, posted a tearful video on social media Wednesday, begging for the safe return of her beloved pet dog. After combing through the security video outside a Gorbals shop, Kirsteen has now posted an image of a man suspected of stealing the dog. The image appears to show a man carrying the dog in his arms. Kirsteen also believes the video obtained from the shop shows the dog being stolen by a man before driving off in a car which had been waiting nearby. The family is now offering a £5,000 reward for the safe return of the dog after launching a social media campaign to find the thief. The dog is six and a half years old and was last seen wearing a red collar. Kirsteen said: "We'll pay that to anyone who brings him home as long as they are not responsible for his disappearance." Police are investigating the incident.`,
 questions: [
 { id: '2021-06-S3-Q3', question: 'What is Kirsteen Marshall trying to do?', options: ['A) Get her pet dog back.', 'B) Beg for help from the police.', 'C) Identify the suspect on the security video.', 'D) Post pictures of her pet dog on social media.'], answer: 'A' },
 { id: '2021-06-S3-Q4', question: 'What does the news report say about Kirsteen Marshall\'s family?', options: ['A) It is suffering a great deal from the incident.', 'B) It is helping the police with the investigation.', 'C) It is bringing the case to the local district court.', 'D) It is offering a big reward to anyone who helps.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S3-SecA-3', year: 2021, month: 6, setNumber: 3,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2021, 6, 1, 265),
 transcript: `London's Eggs&Bread cafe offers boiled eggs, toast, jam, and bacon, as well as tea, coffee and orange juice. But at the end of the meal, customers don't have to worry about the bill. Hungry customers can pay whatever amount they can afford to eat at the cafe, or nothing at all. Owner Guy Wilson says his cafe aims to build community, rather than profits. He wants to provide a bridge for people to connect in an area that has been divided by class and wealth by providing affordable breakfasts. The cafe is open in the mornings every day of the year and has two members of staff or supervisors on shift every day. The cafe doesn't use volunteers, but pays its staff to ensure consistency in its service. It doesn't take donations and doesn't want to be seen as a charity. Mr. Wilson says, when people start to know other people around them, they realize they're not that different. And whatever their financial background, or their educational background, most people will have something in common with each other. He says it's important that his cafe can offer his customers security and permanence.`,
 questions: [
 { id: '2021-06-S3-Q5', question: 'What does Guy Wilson say his cafe aims to do?', options: ['A) Provide free meals to the local poor.', 'B) Help people connect with each other.', 'C) Help eliminate class difference in his area.', 'D) Provide customers with first-class service.'], answer: 'B' },
 { id: '2021-06-S3-Q6', question: 'What does the news report say about Eggs&Bread cafe?', options: ['A) It does not supervise its employees.', 'B) It donates regularly to a local charity.', 'C) It does not use volunteers.', 'D) It is open round the clock.'], answer: 'C' },
 { id: '2021-06-S3-Q7', question: 'What happens when people start to know each other according to Guy Wilson?', options: ['A) They will realise the importance of communication.', 'B) They will come to the cafe even more frequently.', 'C) They will care less about their own background.', 'D) They will find they have something in common.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S3-SecB-1', year: 2021, month: 6, setNumber: 3,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2021, 6, 1, 446),
 transcript: `M: So what time do you think we should have the party on Saturday?
W: How about inviting people to come at 6:00 p.m.? Then we'll have the afternoon to prepare food and drink, and stuff like that.
M: Yes, I was thinking that around 6:00 would be good too. What food should we provide?
W: Well, I had thought about baking a cake, and some biscuits. And now I think we should prepare some sandwiches and snacks, and some other kinds of food, so that people can just help themselves, rather than getting everyone to sit down at the table to eat a meal. I think that's a bit too formal. It's better to let people walk around and talk to each other, or sit where they like.
M: Yes, that sounds good. I'll go to the supermarket to get some drinks. I think I might try that big new supermarket on the other side of town and see what they have. I've not been there before. I think we should get some beer and wine, and some fruit juice, and other soft drinks. What do you think?
W: Sounds great. I think those drinks will be enough. And I heard that the new supermarket offers some big discounts to attract customers. So going there should be a great idea. What should we do about music?
M: Maybe we should ask Paul to bring his computer and speakers, so that we can play some music. He has a great collection of different stuff.
W: Yes. All right.`,
 questions: [
 { id: '2021-06-S3-Q8', question: 'What are the speakers mainly talking about?', options: ['A) A surprise party for Paul\'s birthday.', 'B) Travel plans for the coming weekend.', 'C) Preparations for Saturday\'s get-together.', 'D) The new market on the other side of town.'], answer: 'C' },
 { id: '2021-06-S3-Q9', question: 'Why does the woman say it is a good idea to serve foods that guests can help themselves to?', options: ['A) It makes the hostess\'s job a whole lot easier.', 'B) It enables guests to walk around and chat freely.', 'C) It saves considerable time and labor.', 'D) It requires fewer tables and chairs.'], answer: 'B' },
 { id: '2021-06-S3-Q10', question: 'What does the woman say about the new supermarket?', options: ['A) It offers some big discounts.', 'B) It is quite close to her house.', 'C) It is more spacious and less crowded.', 'D) It sells local wines and soft drinks.'], answer: 'A' },
 { id: '2021-06-S3-Q11', question: 'What does the man suggest they ask Paul to do?', options: ['A) Cook a dish for the party.', 'B) Arrive 10 minutes earlier.', 'C) Prepare a few opening remarks.', 'D) Bring his computer and speakers.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S3-SecB-2', year: 2021, month: 6, setNumber: 3,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2021, 6, 1, 627),
 transcript: `W: I'm thinking of buying a car. I wouldn't need to use it every day, but I think it would be very convenient to have one for the weekends.
M: That's exciting. Would this be your first car?
W: No, I actually owned a car for a little while when I lived in Miami. You see in America, many cities don't have good public transport. So, most people need their own car to get around.
M: I see. So have you got your mind set on a specific model?
W: No, not really. I've heard that German cars are very reliable, but I haven't decided on a specific model yet. I'd also like it to be small, so that it's easy to drive in the city.
M: I have a friend who sells second-hand cars. In fact, I think his family owns the business. He's a really nice guy, and he knows a lot about cars. I could give you his phone number if you want, and you could call him and ask him questions.
W: Hmm, that's nice of you, but I don't want to feel obliged to buy one of his cars.
M: Oh, no, he's not like that. He's a good friend of mine, and he would never try to pressure you or cheat you.
W: Well, if you trust him, then, I guess it should be OK. To be honest, I could use some help in deciding what type of vehicle would best suit my needs. Speaking to an expert would be a good idea.
M: Exactly. You have nothing to worry about. He's a lovely guy, and he'll be happy to help.`,
 questions: [
 { id: '2021-06-S3-Q12', question: 'Why does the woman want to have a car?', options: ['A) For commuting to work.', 'B) For long-distance travel.', 'C) For getting around in Miami.', 'D) For convenience at weekends.'], answer: 'D' },
 { id: '2021-06-S3-Q13', question: 'What does the woman say about German cars?', options: ['A) They are reliable.', 'B) They are compact.', 'C) They are spacious.', 'D) They are easy to drive.'], answer: 'A' },
 { id: '2021-06-S3-Q14', question: 'What does the man recommend the woman do?', options: ['A) Buy a second-hand car.', 'B) Trust her own judgment.', 'C) Seek advice from his friend.', 'D) Look around before deciding.'], answer: 'C' },
 { id: '2021-06-S3-Q15', question: 'What do we learn about the man\'s friend from the conversation?', options: ['A) He sells new cars.', 'B) He can be trusted.', 'C) He is starting a business.', 'D) He is a successful car dealer.'], answer: 'B' },
 ],
 },
 {
 id: '2021-06-S3-SecC-1', year: 2021, month: 6, setNumber: 3,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2021, 6, 1, 836),
 transcript: `Pigs are not native to North America. They were first introduced to California by Spanish and Russian explorers and settlers many centuries ago. In the early times, pigs were allowed to wander freely in search of food. This practice also allowed many pigs to escape from farms and live in the wild, which became a problem. In fact, as one of the most damaging invasive species on the continent, wild pigs cause millions of dollars in crop damage yearly. They also harbor dozens of diseases that threaten both humans and farm animals. Forest patches with wild pigs have been found to have considerably reduced plant and animal diversity. In addition to either eating other animals or their food supply, wild pigs damage native habitats by rooting up grasses and rubbing on trees. Their activities may also create opportunities for invasive plants to colonize these areas. Wild pigs will eat almost anything containing calories. Mice, deer, birds, snakes and frogs are among their victims. They can also harm other wild species through indirect competition, rather than eating them or shrinking their food supply. On one particular United States island, wild pigs themselves became an attractive food source for a species of mainland eagle. The eagles began breeding on the island, and also feeding on a species of native fox. The foxes were almost wiped out completely.`,
 questions: [
 { id: '2021-06-S3-Q16', question: 'What do we learn about early pigs in North America?', options: ['A) Many escaped from farms and became wild.', 'B) They were actually native to North America.', 'C) Many got killed in the wild when searching for food.', 'D) They were hunted by Spanish and Russian explorers.'], answer: 'A' },
 { id: '2021-06-S3-Q17', question: 'Why are wild pigs a threat to humans?', options: ['A) They often make sudden attacks on people.', 'B) They break up nature\'s food supply chain.', 'C) They cause much environmental pollution.', 'D) They carry a great many diseases.'], answer: 'D' },
 { id: '2021-06-S3-Q18', question: 'What does the passage say about the native foxes on the US island?', options: ['A) They lived peacefully with wild pigs.', 'B) They ran out of food completely.', 'C) They fell victim to eagles.', 'D) They reproduced quickly.'], answer: 'C' },
 ],
 },
 {
 id: '2021-06-S3-SecC-2', year: 2021, month: 6, setNumber: 3,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2021, 6, 1, 1013),
 transcript: `A pair of entrepreneurs are planning to build and launch a spacecraft that would carry and roast coffee beans in outer space. The craft will use the heat of re-entry to roast coffee beans as they float inside it in a pressurised tank. The effect would be to roast the beans all over, and produce perfect coffee. The businessmen say that on Earth, beans can easily break apart and get burned in the roaster. But if gravity is removed, the beans float around in a heated oven, receiving 360 degrees of evenly distributed heat and roast to near perfection. The spacecraft will reach a height of around 200 km. The beans would then be roasted in the heat generated by the craft's 20-minute re-entry into Earth's atmosphere. Temperatures in the pressurised tank will be kept to around 200°C. Once back on Earth, the planet's first space-roasted beans would be used to make coffee that would be sold for the first time in Dubai. This is where the pair's company is based. It is not clear how much they would charge for a cup. Surprisingly, the Space Roaster concept — should it go ahead — will not be the first attempt to take coffee into space. In 2015, two Italian companies collaborated on the construction of a similar type of spacecraft, which was the first coffee machine designed for use in space.`,
 questions: [
 { id: '2021-06-S3-Q19', question: 'What are a pair of entrepreneurs planning to do?', options: ['A) Taste coffee while in outer space.', 'B) Roast coffee beans in outer space.', 'C) Develop a new strain of coffee bean.', 'D) Use a pressurised tank to brew coffee.'], answer: 'B' },
 { id: '2021-06-S3-Q20', question: 'What does the passage say about coffee beans roasted on Earth?', options: ['A) They can easily get burned.', 'B) They float around in the oven.', 'C) They have to be heated to 360°C.', 'D) They receive evenly distributed heat.'], answer: 'A' },
 { id: '2021-06-S3-Q21', question: 'What did the two Italian companies do in 2015?', options: ['A) They charged a high price for their space-roasted coffee beans.', 'B) They set up a branch in Dubai to manufacture coffee roasters.', 'C) They collaborated on building the first space coffee machine.', 'D) They abandoned the attempt to roast coffee beans in space.'], answer: 'C' },
 ],
 },
 {
 id: '2021-06-S3-SecC-3', year: 2021, month: 6, setNumber: 3,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2021, 6, 1, 1182),
 transcript: `In cold and snowy Alaska, there's a village called Takotna. It has a population of a mere 49 souls. Each March, this tiny village swells up in numbers, because it is located in the middle of a race that takes place every year. It is a seven-day race, called the Iditarod Trail, and participants stop at Takotna for their obligatory 24-hour rest. Lucky for them, Takotna is famous for its delicious fruit pies. Weeks before the competitors arrive, the residents of Takotna start preparing for what is without question their biggest event of the year. The whole village chips in to help, including the kids, who end up developing their baking skills at an early age. The exhausted and hungry racers are greeted with delightful pies of all kinds, such as apple, orange, lemon or banana. They consume the pies as stomach-warming race fuel. The toughness of the race allows for racers to eat pretty much whatever they want. The more calories, the better. Takotna has gained a reputation for its dessert-based hospitality since the 1970s. It started with one person, Jan Newton. Jan moved from Idaho with her husband in 1972 and opened a restaurant. Her rich and filling fruit pies quickly got the racers' attention, and the village gained some fame as a result. Proud residents then started to refer to Jan as Queen of Takotna.`,
 questions: [
 { id: '2021-06-S3-Q22', question: 'Why do a lot of people come to the village of Takotna every March?', options: ['A) It is the best time for sightseeing.', 'B) A race passes through it annually.', 'C) They come to clean the Iditarod Trail.', 'D) It is when the villagers choose a queen.'], answer: 'B' },
 { id: '2021-06-S3-Q23', question: 'What is the village of Takotna famous for?', options: ['A) Its children\'s baking skills.', 'B) Its unique winter scenery.', 'C) Its tasty fruit pies.', 'D) Its great food variety.'], answer: 'C' },
 { id: '2021-06-S3-Q24', question: 'Who comes to help with the event of the year?', options: ['A) The contestants.', 'B) The entire village.', 'C) Jan Newton and her friends.', 'D) People from the state of Idaho.'], answer: 'B' },
 { id: '2021-06-S3-Q25', question: 'What does the passage say about Jan Newton?', options: ['A) She owned a restaurant in Idaho.', 'B) She married her husband in 1972.', 'C) She went to Alaska to compete in a race.', 'D) She helped the village to become famous.'], answer: 'D' },
 ],
 },

 // ================================================================
 // 2021年6月 第2套
 // ================================================================
 {
 id: '2021-06-S2-SecA-1', year: 2021, month: 6, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2021, 6, 2, 39),
 transcript: `An 81-year-old man ended up in Germany by accident after trying to get from Newcastle, Great Britain, to Rome, Italy. The old age pensioner was on a mission to see the Pope, who is head of the Catholic Church, and decided to make his way there by car. He was surprised when his GPS system told him he had arrived, although there were no signs of any of the famous buildings or architecture. The man parked but didn't put on the handbrake of his car properly. His car rolled backwards, and in a striking display of irony, hit a sign saying "Rom"-the small town in North Germany he had mistakenly plugged into the GPS system. Police said that the car had come to a halt after hitting the sign, but did not appear to be seriously damaged, although an ambulance was called to check on the pensioner. The man, who lives in the UK and is originally Italian, might have been confused by the fact that Rome is written "Roma" in Italian and "Rom" in German. 1.`,
 questions: [
 { id: '2021-06-S2-Q1', question: 'What did the 81-year-old man want to do?', options: ['A) See the Pope.', 'B) Go to Newcastle.', 'C) Travel to Germany.', 'D) Tour an Italian city.'], answer: 'A' },
 { id: '2021-06-S2-Q2', question: 'What happened to the man?', options: ['A) He was taken to hospital in an ambulance.', 'B) His car hit a sign and was badly damaged.', 'C) His GPS system went out of order.', 'D) He ended up in the wrong place.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S2-SecA-2', year: 2021, month: 6, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2021, 6, 2, 159),
 transcript: `Glasgow has pledged to become the first carbon neutral city in the UK. The city's council and ScottishPower have announced a range of strategies in an attempt to reduce carbon emissions ahead of the new national target of 2045. First Minister Nicola Sturgeon welcomed the pledge and said: " Today's announcement between ScottishPower and Glasgow City Council-to make Glasgow the UK's first net-zero city-is a very welcome step. Reaching our goals will need exactly this kind of partnership approach-with government, business, local authorities and citizens all playing their part." Speaking ahead of the All Energy Conference being held in Glasgow, ScottishPower chief executive Keith Anderson said: "We have a large supply of renewable energy on our doorstep and one of the only two low emission zones in action across the UK. Now, we need to invest in the technologies and programmes that transform the rest of Glasgow's economy and make us net zero before anyone else." 3. What do we learn from the news report? O[fflffil$i'JmiABo lrñffòaó,a&[-ô *Z[XOooffi-\\]*^_m,*mu-*'a ffinffiõj>öf-l÷tito ø.lit,:;< C) o 4. What did ScottishPower's chief executive say ahead of the All Energy Conference?`,
 questions: [
 { id: '2021-06-S2-Q3', question: 'What do we learn from the news report?', options: ['A) Scotland will reach the national target in carbon emissions reduction ahead of schedule.', 'B) Glasgow City Council has made a deal with ScottishPower on carbon emissions.', 'C) Glasgow has pledged to take the lead in reducing carbon emissions in the UK.', 'D) First Minister Nicola Sturgeon urged ScottishPower to reduce carbon emissions.'], answer: 'B' },
 { id: '2021-06-S2-Q4', question: 'What does Keith Anderson say is needed to reach the goals?', options: ['A) Glasgow needs to invest in new technologies to reach its goal.', 'B) Glasgow is going to explore new sources of renewable energy.', 'C) Stricter regulation is needed in transforming Glasgow\'s economy.', 'D) It\'s necessary to create more low-emission zones as soon as possible.'], answer: 'A' },
 ],
 },
 {
 id: '2021-06-S2-SecA-3', year: 2021, month: 6, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2021, 6, 2, 280),
 transcript: `A Japanese IT firm has officially introduced an "office cat" policy to combat the stressful environment of the workplace. ITT!ú 2021 û 6 ü 33 A total of nine furry friends freely wander around in the office and do whatever their little hearts desire. Hidenobu Fukuda, who heads the firm, introduced the pet policy, upon request from one of his employees, allowing staff to bring their own cats to work. Employee Eri Ito is grateful for their animals' comforting ways. "Cats are sleeping just beside us. It's healing." she said. Not only does Fukuda encourage bringing cats to. the job, but he also encourages his employees to rescue cats from overpopulated shelters or streets. He gives 5, OOO yen, about 45 US dollars a month to those who rescue a cat. While the positives are many, there are still some obstacles. "Sometimes a cat will walk on a phone and cut off the call, or they shut down the computers by walking onto the off switch." Ito says. Still, cats in the workplace have been a tremendous success for the company. The policy has led to various other companies doing the same. ­ 5.`,
 questions: [
 { id: '2021-06-S2-Q5', question: 'What does the Japanese IT firm do?', options: ['A) It donates money to overpopulated animal shelters.', 'B) It permits employees to bring cats into their office.', 'C) It gives 5,000 yen to employees who keep pet cats.', 'D) It allows workers to do whatever their hearts desire.'], answer: 'B' },
 { id: '2021-06-S2-Q6', question: 'What does the firm encourage its employees to do?', options: ['A) Keep cats off the street.', 'B) Rescue homeless cats.', 'C) Volunteer to help in animal shelters.', 'D) Contribute to a fund for cat protection.'], answer: 'B' },
 { id: '2021-06-S2-Q7', question: 'What is said about the firm\'s policy?', options: ['A) It has contributed tremendously to the firm\'s fame.', 'B) It has helped a lot to improve animals\' well-being.', 'C) It has led some other companies to follow suit.', 'D) It has resulted in damage to office equipment.'], answer: 'A' },
 ],
 },
 {
 id: '2021-06-S2-SecB-1', year: 2021, month: 6, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2021, 6, 2, 460),
 transcript: `M: Has Jimmy been coming in lately? W: No, I haven't seen him around. Why? Has he been causing any trouble? M: Not that I know of. But I need to see him, because my friends and I lent him some money last month. We haven't heard from him since. I heard he comes here a lot, so I thought I'd come in and check with you. W: Well, that's funny. Some other fellow came in asking for Jimmy just yesterday, a real nervous, pushy · type of fellow, saying he needed Jimmy for some study project they were working on. But I can't quite remember what it was all about. Is this a lot of money we're talking about here? M: No, just 60 pounds between the three of us, but still a bit too much to just let go. (lO)He told us he'd got into an accident. Nothing serious, mind you, but he damaged someone's car and wanted to get some money together to make up for the damage he'd caused. W: Hmm, isn't that sort of thing usually covered by insurance? And then, if you still wanted to give money as some sort of apology or something, he probably shouldn't have to go around borrowing it from people. M: You think Jimmy's just making it all up? See, I did think it was a bit weird for him to be asking for money for that sort of thing. And his story was a bit vague to begin with. (ll)But I thought maybe he doesn't want his parents to know about what happened. So he'd rather come to us and keep things quiet. Anyway, Jimmy is a good guy. So we didn't make a fuss about it. 8. What does the man want to do? A) [ff,Jrl gru-=w••o x1"-m:1fũ,!ij±1PJ3e±m11BJ E*%rŪ,#1PJ3e±fffū§BcMŬŭŮE*­ @ů,{EldBŰ-1'-A &fik%rű,Ų, 7 o rulltPI ų,5§±dbE*,IEIJlt3a) A)o 9. What do we learn about the man who came to see the woman yesterday? B) [ff,Jrl gru-=pmiAMo x.f-m,3C±7fff!ij±%* ft§, IPJ {ik.®II'l=*-m A*E*, 13Ŵ1'-AcE *iEbŵ-1'-WfJ'E:l-j! §, !Eillt3a) B) o ImŶ 2021 ŷ 6 A 34 10. What did Jimmy say happen to him one day? C) []*Jrl gw-=p-miAm O X1-m t=p 'Jij ±!Uk^* 'lffl Ƽ ifF{iB § Bill 7 $.m, C) _:Ly! t=p 1¥1 was involved in ff "!g: A, rtv lk"Z:\\l,  ffit$(:,Jiiffl f.t, !El .tit-3 j,J C) o 11. Why did Jimmy borrow money according to the man? D) []*Jrl § 1¥JJffi!Elmo X1-m?Kft6Jij±'.?t;fff 7^* 1iƽl¥1Jffi!EI ,£ƾƿ ǀǁ·tl:,1EL11f!iA1'1^*C m i-1 § B 1¥1 Jt-BJ:aǂǃ 71t -z. $ , D) _:Ly!`,
 questions: [
 { id: '2021-06-S2-Q8', question: 'What does the man want to do?', options: ['A) Find out where Jimmy is.', 'B) Borrow money from Jimmy.', 'C) Make friends with Jimmy.', 'D) Ask Jimmy what is to be done.'], answer: 'A' },
 { id: '2021-06-S2-Q9', question: 'What do we learn about the man who came to see the woman yesterday?', options: ['A) He was unsure what kind of fellow Jimmy was.', 'B) He was working on a study project with Jimmy.', 'C) He wanted to make a sincere apology to Jimmy.', 'D) He wanted to invite her to join in a study project.'], answer: 'B' },
 { id: '2021-06-S2-Q10', question: 'What reason did Jimmy give for borrowing money?', options: ['A) He got a ticket for speeding.', 'B) He got his car badly damaged.', 'C) He was involved in a traffic accident.', 'D) He had an operation for his injury.'], answer: 'C' },
 { id: '2021-06-S2-Q11', question: 'Why did the man think Jimmy borrowed money from friends rather than parents?', options: ['A) He needed to make some donation to charity.', 'B) He found the 60 pounds in his pocket missing.', 'C) He wanted to buy a gift for his mother\'s birthday.', 'D) He wanted to conceal something from his parents.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S2-SecB-2', year: 2021, month: 6, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2021, 6, 2, 647),
 transcript: `W: Hi, Max. How are you? Listen. 1 wanted to ask you about ordering shopping online. I've never done it before and I know that you've been doing it for ages. M: Sure. I love getting my shopping delivered. It makes life so much simpler-no carrying heavy shopping bags in the rain, or trying to park the car on those huge supermarket car parks then not being able to find it again after you come out of the shops. W: But there must be some problems. I mean, how do you know that you won't get bad fruit, or that the eggs won't be broken? M: Oh, come on. The food is exactly the same as the stuff you buyin a conventional shop. They aren't going to deliver you food that is out of date. And if you get a broken egg·, well, that could happen in a conventional shop, too. If anything is really·wrong, you can just take photographs of the damage, and they will give you the money back or replace the item. W: . H<:>w about delivery fees? Is it not more expensive to get everything delivered? M: 1 actually found that it was cheaper for me, as I live quite far away from my local supermarket. So with the deliveries, I'm actually saving on petrol. W: I've never thought of that. If you aren't driving your own car, then you are saving on fuel. Right, you've convinced me. I'm going to go on the computer now and give it a try. So, which supermarket do you think is the best to order from? M: Oh, no. That's definitely up to you. Otherwise, we'll be here all day. 12. What did the woman want to ask Max about? B) [ ffil gw-=p-miAmo X1-mffǒ:tc±ffl'1JlltlJ ,H Ǔ,ǔ§Bm§m14...tWJ!lw1¥JffiǕǖm,!El.t1t- 3j,J B)o 13.`,
 questions: [
 { id: '2021-06-S2-Q12', question: 'What are the speakers talking about?', options: ['A) Shopping delivery.', 'B) Shopping online.', 'C) Where he goes shopping.', 'D) How often he does shopping.'], answer: 'B' },
 { id: '2021-06-S2-Q13', question: 'What is the man\'s advantage of shopping online?', options: ['A) Searching in the aisles.', 'B) Dealing with the traffic.', 'C) Driving too long a distance.', 'D) Getting one\'s car parked.'], answer: 'D' },
 { id: '2021-06-S2-Q14', question: 'What is the woman concerned about?', options: ['A) The after-sales service.', 'B) The replacement policy.', 'C) The quality of food products.', 'D) The damage to the packaging.'], answer: 'C' },
 { id: '2021-06-S2-Q15', question: 'What does the man say about the advantage of shopping online?', options: ['A) It saves money.', 'B) It offers more choice.', 'C) It increases the joy of shopping.', 'D) It is less time-consuming.'], answer: 'A' },
 ],
 },
 {
 id: '2021-06-S2-SecC-1', year: 2021, month: 6, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2021, 6, 2, 851),
 transcript: `A recent study found that 10 percent of British children suffer from math anxiety. This means they have overwhelming negative emotions towards the subject, ranging from rage to despair. · Other emotions triggered by math include feelings of tension and frustration. ·Physical. symptoms include a racing heart or struggling to catch breath. The phenomenon of math anxiety is characterized as a general sense of feeling that· the subject is hard compared-with-other .. subjects-leading.-to-a-subsequent-lack-or-loss-of-confidence-. Researchers said they investigated individuals' attitudes towards mathematics because of what could be referred to as a mathematics crisis in the UK. There's a widespread misunderstanding that only low fillǥ 20211f: 6 JI 35 performing children suffer from math anxiety. People automatically assume children are anxious about math because they are poor achievers. In fact, more than three quarters of children with high levels of math anxiety are normal to high achievers. Probably their math anxiety will go unnoticed because their performance is good. · But in the long term their performance is negatively affected. So the real danger here is that children who will completely able to do math at a normal level may keep away from it because they feel anxious. Math anxiety can severely disrupt students' performance in the subject in both primary and secondary school. But importantly-and surprisingly-this new study suggests that the majority of students experiencing math anxiety have normal to high math ability. 1'- 16. What did a recent study find about some British children? n) l*1f *1rl <11 tJHllffl.. m xfF m tU , ii:ili 99-:i:.m {uM:2tU, 10% Ef(JƙliJLlUtVffft··· o Sii'* •tiJƚSn•ƛ1f-ƜffiEƝMm89ffiƞ89ffl t&·l1l, fif 1t•fo!l!2t 89 '11lB5i!J. ffi Ɵ JUllffl. Ơ, 1* tiETUjq4)@Jơ1JD3tdƢIY1.ilƣo 1251.llt,=1jq D) o 17. What is the widespread misunderstanding about math anxiety? B) (*1f*1rl Ƥ11mR!fflo mxi:rtl!JIJ ,1f -V-il.89 ƥfMRjq Ʀ1fTU::Ff!99JL:i:;t,ƧJ:1t•• m, 1251.lltƨ1jq B)" 18.`,
 questions: [
 { id: '2021-06-S2-Q16', question: 'What does the study find about British children?', options: ['A) They have little talent for learning math.', 'B) They need medical help for math anxiety.', 'C) They need extra help to catch up in the math class.', 'D) They have strong negative emotions towards math.'], answer: 'D' },
 { id: '2021-06-S2-Q17', question: 'What is the widespread misunderstanding about math anxiety?', options: ['A) It will gradually pass away without teachers\' help.', 'B) It affects low performing children only.', 'C) It is related to a child\'s low intelligence.', 'D) It exists mostly among children from poor families.'], answer: 'B' },
 { id: '2021-06-S2-Q18', question: 'What does the new study suggest about students with math anxiety?', options: ['A) Most of them have average to strong math ability.', 'B) Most of them get timely help from their teachers.', 'C) They will regain confidence with counselling.', 'D) They are mostly secondary school students.'], answer: 'A' },
 ],
 },
 {
 id: '2021-06-S2-SecC-2', year: 2021, month: 6, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2021, 6, 2, 1036),
 transcript: `People spend a lot of time using phones and computers. Much of that time is devoted to text messages and social media. But many people choose to spend their time playing computer games. For years, parents and teachers have worried that these games might be addictive. And now, the World Health Organization has recognized addiction to computer games as a disease. The organization explains that this decision reflects general agreement among experts around the world that some people have a problem with these games. They show a pattern of behavior characterized by a lack of control. Such people make computer games a priority over their responsibilities. They may play games instead of attending school, or work, ƲrsocializingƳ- +  + X - + + X ƴ +·+ Ƶƶ - X According to the World Health Organization experts, people's use of computer games is different from their use of the Internet, social media and online shopping. These experts claim there is not sufficient data to indicate that people's reliance on those other activities is an addiction. But they argue that playing computer games to access is different. This behavior can become a disorder. To meet the new definition for addiction, the behavior must damage a person's relationships or performance at school or work, and this must last for at least a year. Still not all behavior experts agree. Some argue that there's not enough research on the subject. Thus, they claim it is too early to call computer game addiction a disorder. ;i1',W 19.`,
 questions: [
 { id: '2021-06-S2-Q19', question: 'What has the World Health Organization done?', options: ['A) Social media addiction is a threat to our health.', 'B) Too many people are addicted to smartphones.', 'C) Addiction to computer games is a disease.', 'D) Computer games can be rather addictive.'], answer: 'C' },
 { id: '2021-06-S2-Q20', question: 'What is the characteristic of people addicted to computer games?', options: ['A) They prioritize their favored activity over what they should do.', 'B) They do their favored activity whenever and wherever possible.', 'C) They are unaware of the damage their behavior is doing to them.', 'D) They are unable to get rid of their addiction without professional help.'], answer: 'A' },
 { id: '2021-06-S2-Q21', question: 'What do some experts say about computer game addiction?', options: ['A) It may be less damaging than previously believed.', 'B) There will never be agreement on its harm to people.', 'C) It may prove to be beneficial to developing creativity.', 'D) There is not enough evidence to classify it as a disease.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S2-SecC-3', year: 2021, month: 6, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2021, 6, 2, 1227),
 transcript: `Maybe you carry the most powerful passport in the world, or perhaps the rarest passport. Whatever the case, your passport will likely be one of four colors: red, blue, green or black, although there are slight variations. Switzerland's passport is dark red, for example, while most European countries prefer a shade of red. That's almost brown. There are no official rules regarding passport colors, but countries follow a certain set of norms when designing them. The International Civil Aviation Organization, which works to define the principles of air travel, suggests that countries use a suitable type, size and style for official documents like passports. There are also a few compulsory aspects of passports. They must be made from a material that bends. They should be able to be read by a machine at temperatures ranging from 10 degrees Celsius to 50 degrees Celsius, under the conditions where the air can be extremely dry or moist. Despite these existing recommendations, there is nothing regarding the cover color. Why? Simply put, countries stick to darker and more conservative colors because they appear more official. And they can also hide dirt and wear. While there's little innovation when it comes_ to passport cover color, the same cannot be said for the pages. The passports of many countries can take images of their well-known geographical features and wildlife, which also function as security features as some are only visible under a special light. 22. What do we learn about most European passports? C) UiUJrl "ilmR! o yXff!Jd¥1J, 1} IE z R{  ![U'iiiU' t|JH}t~ JWHt'-1 .±' tJUrj m tfj  fi IEmpzH£#ffl ptt, -'-1 C)o 23. What does the passage say about the design of passports? D) [mffil 'ilmR!o yX.¥1J ,Xif-=fV ,lfflpM m,fil-*IEtErrz•ffi­ }E ifij?t, •,., D) 24. Why are dark colors chosen for passport covers? B) [mffil § ffiR!o yX.¥1J ,1}1'-IEmz HMWffl-ffi£p-''-1n•m *£.il:A'  -,., B) 0 25. What is one special function of the images inside many passports? D) [m*1rl "ilmR!o yX:ftim.¥1J,WIE*p zHkmffl*IE•p-Rffi · pOO-ffl,s®OO-fflm¡f'F'-11c¢*r, '-100 {flft  tE *r £ p 16  1'" 7t rl  ¥1J,   ¤ * ,., D) 0 Part ][ Reading Comprehension , \\ 1 -C); ffi L 2,m:1HB Y:l&W!ltXif.AXfm-YZ[ })t\\u]1f:?i:a : : ', ____________________________________________________________ , *x:l:.JHt·tB 7 :fJ!Ulk3t.J' I ------------------------------------------------------------, =: :::im:: -+-e( ffi3, 4,m:1HBT^ffil_f'11g'm:mmnmfffrta1J$*Ltt&.fm*ltYla1Jttr»ma ) 1¥-J ffi nf!i O : ' ----------, ; ---·- --- -------- ----·------ -- ----------------- -- ---a--b,- - I I L. -C>: cs,mi31ffldt.fJi?vf1lfdM, iJigijtf¥IEffi¦IE, JdfJ:ffi5+5H&o , ____________________________________________________________ ; rm 20211P 6 A 37 I I [WHi:SHJrl ʒ i.ffl : B) appointments fmā; C) consequences @*;)ff*; E) dimensions £tJ.t; ˒JMl; H) idiom .33 i-!, yi-!; I) implication^·; pJ¢£l¥)ÿn(!iJ; N) survey il.Jþ; 0) touches t!i!m;!!R'.% fdl i.ffl : D) debating it i-1::-, ʓit; G) hindered Illʔ, "k/i Wfl.; J) pushing ffE , ffE Hr; L) sparked 5 I ć; M) splitting %ʕ, %H; N) survey þ:i-, '¥ʖ; 0) touches ÿnjnJ, !!km mʗi.ffl: F) friendly fi:!{f 1¥) jlj i.ffl: A) abruptly ʘf&:lm; K) severely +?tF:m:f:lg - D UeHi JtJ ffil :£ 1:tr -=f JEAifiWJ The Z.J§" , IN .tit:£ 911,i?!tAiliJ o IN1.J:£ J§"l¥J*iWJ is%-$_, IN.tit*:£m•AQl'iJ_iWJ l'iJ_iWJ1p._%Ao UiSlJtJffil *1Dz1.J = :mum%--t-e:k 1¥JJxl{INʙ ,gff1?;%5cpr1¥J o m _t-1iJ1if %1, ' *1a1WiĀMlr*l¥J{m|Jxl{ tʚHʛM 4ij3cf9k 15 x ʜ00£:k,J!&gJ:JʝM!k%-1'-e:kl¥JJxl{INʞ, IN.tit :£ 9'.tm•A ʟ1f"illʠ, *  "•51.. l¥J  iWJ, ¡* -RS1.J I) implication a 1:E*}J_mi:p ,H) idiom 5fQ N) survey Q*-iti-! 51.., IN .tltt-fl:Iʡ a 27. [ʢ,Pl iiiJ*1HfrJJL B) [ffi5*JtJ!iml :£ 1:tr-=f the doctor ZJ§", fiʣtl:£ JYr!tiWJm1.JiWJ ,_§_' the doctor ttJyiliJiliJfflo UiSl!IJ!iml *1Dzjj:5.!k@l¥JAQ:tc1if¢£*¤~ ___ o m 1D• 1if %1, 5.!k@ l¥J AQ :tc 1if ¢£ -i::i­ ¤~ o the doctor appointments •1.J"z)tʤffiā", ffij go to the doctor appointments %lffiJE*JZi, • 1.J"-i::i"¤~", ¡*1!RS1.J B) appointmentsa 28. [O,Pl iliJ*1H!rMo -- - - - -D)- -(i.i5ʥJijffi:J-Jt-:ffr1iJrʦf1J1ij-%1-,ʧʨ{1t-=f-are-z­ J§" ,:£ J§"ffij}"how + QJEA"@tt}, ffl ʩ-=filiJ ·ʪM 1D, IN.tlt:£ 91W?•AiWJ 1¥J?tiiiJ%A, ' are jt.ʫttJy1Drl¥JMi-! o UiSl!IJffil *1D•jj: ifĄ 00*1¥J0jt.J!~Ă* iE:f.£ :tmfiiJfHk:*±a i:J=tʬ:iif.¥:f.£1¥J:mt5!1! ft:iJ l!o m1mʭăP1%1,M5!Ri/f*qiĄfitʮ ,!ą-z. Ă* ʯ-?ĆʰʱM-ʲʳ-ʴM,¥.tlt:£ 91m• A ^1fwtti:ilr "ĆJE".51..1¥JiWJ o *}iWJ l=J=t .R1f D) debating "i.ti1::-"iWJ51..fi:ʵ:ilr, ii!J.1.l*ffiRS a 29. [O,P] iWJm:ffrffi!o 0) [i.i5*1IJffil :£ 1:tr-=f iWJ Loneliness ZJ§", ffij_§_ *1D.YMffi iWJ,IN.tlt:£ 91W?·AiWJl¥J ffi .=Af$1p._%A o [ffiSli'IJffil *}iWJ i:f=t .R1f 0) touches *1ti-!ʶ ?*'ʷB1tA 1Di:J=t ,)J!rJ1iJ•jJ"JL3JZ-4ij1'-A:f.£ʸ -t-atiuʹaʺ¥rJ:mt5!R ", *1tx51.., ʻ .t1t*m 1.1 0) touches a 30. [O,Pl iWJfJH!rl!L . c) Ui5t,iJffil ?t:ffr1Dr@ttJP1%1,1Dr±.::P1.J ±ii @ttl ,Hi-! Q˓cHlo health ':£ʼJYr.iWJttJ ʽ iliJ iWJ tH, ff: 1D-=f 1¥)  i-! o health %ʾ lit! fF JE i-!, :£ 91 JYr:1iJ!iJf'F1.J i-!i:J=t it.,iWJ-ti!.mi1<% iWJ 0 UiSlJtJffil *1D•jj: xf-=f5Nl:mtftln'tlt!WiĀ! 1¥JA* ill, BaʿˀˁP11tF:m:1¥Jfm|--­ mffi-ă1if%1,:mt5!ki/f*qJ!:kl¥Jfm|Jxl{,!ą-z. § r&a5lF:m:1¥J{m|J§"=*, IN.tlt:£ 5Ltm•A ^ 1f "@ *' J§" =* " • 51.. l¥J  iliJ, ¡ * M R S 1.]C) consequences a 31. [O,Pl iWJm:ffrMo L) Ui51 JtJ ffil % :ffr1ij r@ttl 1if %1, :£ JYr :f.£ Et9 JE i-! M1D.YMffi,IN.tlt:£ 91W˂•AiWJo .±1D ˃-˄:u-i:at ,JYrbM 1D-ti!m1*1.J:u-i:at o Ui Sl,,1 ffil *1D•1.J: EA˅ć 7 -1'- jj"i,1ˆ 1fJi3Ri3R:mt5!1!"1¥Jffl, :f.£ˇċ00 xl!Ĉl¥Jxf w o m1D•P1%1, i*ffli1A 1fJH1lfti3Ri1::-M5!1! ,-tf! mt%JYrili¥J"xl!Ĉi¥Jxtw", IN.tlt:£ 91m!tA ^ 1f "51, ˈ " z 51.. 1¥JiWJ, *· - -u- sparked-a - - --- ---- -- - --- - -- - --- - - - - . 32. [Oˉ] %ciWJm:ffrffi!o F) [ffi5*,1Jffi] %:ffr1iJr@ttJP]%1,*1iJy%7tˊ ,:£ 1:tr-=fi,ij benches Zlm, IN.tlt:£ 9'.t•?•A %ciliJ 0 Ui Sl i'IJ ffi l % :ffr 1D z 1if %1 , JYr ii l¥J " __ _ benches"zlt % A 1fJ 1if b If. ffl 1Wll 3c l¥J 0 jt. mf 1:tr fK ˋ, ¥.tlt:£ 91m!tA ^1f ĉiflUif-51..1¥J%ciWJ, b 1* ˌ tB benches 1¥) ĉ t.& fF ffl , ii!J. * M R S 1.1 F) friendly a *} :r_m 1=J=t .R1f-1'-%ciWJ, -ti! 1if b EEi .tltlifflJERS 0 33. [O,P] i-!51..lll!mffi o J) Ui5ti'IJWrl :£ 1:tr-=f is Z.J§", IN.tlt:£ 91W?• A%ciWJ iWJ1¥J?tiWJ %A o UiSli'IJffil *1D•1.J: J! 1:trff!HĊˍ llli.1.r. 0jt.3t:iffi.i:plffi, b:9r!.A1fJit:mtfto *1Di:f=tl¥J The minister ffi 1¥Jz)t%ċOOff! jft:mt5!kft:iJMl¥JtflHĊ, J!% ˎ1.J7-YH5!i!rm*•l¥Jˏ*-:r_mffi•,¥.t1t:£ fillː 2021 ˑ 6 J.} 38 !Dm:llA *ffQX::mm:"i1t 00 , Þ h "• SUr{] W , iiÔ *m!ist J) pushingo 35. [,1 IUW¥J¥ffrm!i o K) [ ii Õ ˃J lffi] '.5! ! {ft -=f * ;IJ W are ffi % $ ii=fl strained zl'a.J, H 'i:iJr mt%˄˅' n .lftf/!o!JiA IUW o 34. [ iU 00¥J¥ffrm!Io N) liiÕJljlffi] !£!{ft-=f a 2018 Z§, n.lft'.5!!D· o:llA PJ rii=fll¥Jlt1 %:c-\\'.: o [iiSI..JIJlffi] *'i:iJ•= NP'Bl! :D3@BuiA±,-tftff ˆ%!¥JAˇ* •*o i'i:iJ•PJq,Ó! Dm • A* iR ˈ J;t i¥J mu w,  *Hils t  K) severely a 317'ˉ-1'--*ÖIUW A) abruptly liUtJIJlffi] *'i:iJ- :1± 20181¥1¥1-JJ! ___ i:p , p 00 ffi2 00ffl:i:ili%z -1¥1 mt1¥ A*iR, 111!1f1 ʿ1tdˀˁ-m-˂o i'i:iJ•mq,Ó!Dm­ A *ff"IDfJE, iJW11lt".>l...1¥1 r W, tiÔ*Hilst i *iR It' .lftt-11: 0 N) surveyo fˊsltk×0ˋ1¥J-JJ!IDfJEHiR,ˌU"lfiU!i/tr*l¥1••JxlØttˍˎMdÛx!Vk 15 xˏID!:ic v-ː ˑ•!m --t-e:ki¥JJxLØn˒ ,gffBwx,ri¥J o .!!kkAWil1'-:1Jlfil˓P(rij˔f*-·o ffi-, B"r:Ei#Ùxiti:$••1'iiJH!l¥Jffi}Jfiff$fe o m= ,!!k.@1¥JA z :* PJi#y˕˖E, z :*PJi#·yfH!, m. :* PJi#ff ••1¥Jtx1t o ilf$˗*1¥10{.JIE˘˙GE:f£iti˚:tmM!fflkJ±"i=ptf˛:(¥:(£1¥J.!!kl'iiJHilo y1¥,200˜˝1ffiiT­ {:ftt!SKfft Ú•!!I! l'i:iJ Hilo "JL 332- Û 1-- A:(£˞ ,t- at ˟U $ " • ¥1J • !!ko" 2 00 fft Ú .• !!k l'i:iJ HJl 1¥1 $ K 511'.ˠWr • EˡiJl, "x-f-=f1Hˢ:-.l[ffiÜttlJiU!l¥1A*iJl, BfiÙxÝF1tFmi¥J••§ˣ o'' Effi4ˤT -1'-r "iJ:˥{fJ-iAR-iAR.!!k"1¥Jffl;JJ, :(£˦200':JI 4T˧ll˨l¥Jxifitf o 111!˩:f£x˪"iiM-K ffi" ,v -#0{˫1ftlR,ttOJhJ\\.1f1-!-:D3lE!L:ffiJMJxo v1ftt!SKˬ:f£Þhllli.1.1:0{56i'=t'Wr, V,,l1R.J\\.{f111[ • .l[o :(£ 20181fl¥J-JJ!iftfl1lfi:p ,pOOffi2OOffl:i:1li%z-1¥Jmt1¥A*iR,111!1fH£1itd,˭, -¥1J•!mo ffl:i:1 -*1¥1ˮ00mt1¥A *uil¥J ,IDfJEA˯4ß' NP'Bl!w:D3@BuiA±,-1:fl.ff 30% 1¥JA˰*ÝF1ita˱If o ß:(£˲ lm%Z-1¥JpOOAw!!k.@1¥J ,.IE:tm:D31tfX1EPffll¥J:D3à,- ii-!!kl¥J *o II . . £k.*is-App ;f3;$ I!] - .. Section B [3t˳*j}j] *xÖ § 20171¥ 4 J.J 26 El4*:(£ phys. org(!lo/.JJ.I×*!!!.˴IXXJ}}:&") ...t.1¥1-˵t˶Jm'" Anurneric' people: What happens when a language has no words for numbers? "(((:JG˷fl¥1A: ˸i!§'=t'i!itff Ü fffl*l¥1 Wrcat"4E1t-z. ?)))1¥JX.o [iati!lll1 *x±:J@˿W71!tW..t ,,. . ' .... : A}---D).lf˹J|ili, £˺ *X1Uif-=ffftW._ttfg:k$áAâm fg 5c1:t˻1ta"J$ j r -e i 'If, {fl. filff-,J\\t!S?t Aâa"Ji1fp:pf˼ff *:1Jffifl¥1Xf, mB!><if{tMfJ*tllm : I : áitr:ã T -JEa"J˽i!.˾o : '------------------------------------------------------------' ̀́iî̃1-¥1£ä*n ( E), F).m:1|iliå̄z·lli *a"JA:(£̅iJt:1Jffif iE1itl¥J, J=J- ffikYT §3c.33 ; wF:x:*,*̆̇7æ -e:çi¥JMffl.̈-̉J.IffiI̊̋tt"a"J̌•a"J.33çMffl̍-x1¥1o x-t J.. in F ̎ ffl ll i.Ȑ ---: ' ----------------------------------------------------------- -' M:nWF̐PIDJ ̑:.t&!j : , ---------.,. -------------------------------------------------- ... æft!!̒iiä*̓PJ.1F̔ l-e: G)-l).m:1|iliA̕#̖̗3(ãfflR?t it̘§Jtla"Jfl#jJ, J=J- W:i:i̙Ka,ffa.J1¥J1* ; : : èffiitl̚. ̛*7r#̜Tå-tU#a : I ' ------------------------------------------------------------' _________ J: -r ,,. -------- ---- ------------------------------------------------------------- ----------------------------- - --- - , - L _e: n, K)tU̝ili¥Jtff *a"Jx1t̞tttTxif̟̠JE *'1t̡1¥JiAq̢n(riJa"Jr1nJ̣. flt : : ff]-of[*̤f*Af!1tèi-!̥1¥J$àf£0 '------------------------------------------------------------' Im̦ 2021 ̧ 6 Jj 39 36. [ ;iE ftl] Iii II T i:p 1W anumeric people  keep track of JEUZ¥1J:$Cƺ C).13t:ft§-1ij o C) [ffiffil lm>l;<Jllio JE1iz.1U=¥JJ ,11k1fJ!Wlim¯ im ,°ƻJJt¥Ƽƽ1WAqu1uc1±ffilri:f=tƾXfY 11£*, J$. ¶ .ƿ JJc Jl X ll!l 1'" ǀ li 1'" o M -=f i:f=t 1W anumeric people keep track of ffix ¯ǁ1J ǂǃǄ-,iiM-=fi:f=t!W change in numbers x,tl& ffixi:f=t!W how many nuts remain in the can,Mc1 0jg C) o 37. [;iEW:] lifM-=fi:f=t!W Human numerical instincts other mammals JE1iz.¥1Jx• H).!3tffi-1ij 0 m lffi*Jrl !mSl;<•o JEur1Umm, Jt1mPm1L;JJ !Jimffl tt ,ft1fJIWJJc**t#NiUif Amfl!WJJǅ ¥-f±p }L o MT i:p 1W Human numerical instincts  other mammals Xi:f=tFfr<-' iiM-=f qt 1W superior to x,t m ffi x i:f=t 1W remarkable, M .:P i:f=t 1W as is generally believed x,t m ffi x i:f=t 1W as many assume,io(10jg H) o 38. [·W:] lilM-=fi:f=t!W anumeric  cognitive ability JE1il.¥1Jx-. E).13tffi-1ij o E) [ ffiffil ffir11miAM O JE UL 1ij =¥1J ,u'HUM iJ.J 1W :J! ' F@NiiiJJc*IWAtEiA:1Jffii:J!iE1it!W ,q&:tff:Lm mm7²fiǆǇ7³1'"fil2iWǈmo M.:Pi:f=t!W not affect one's cognitive ability x,t mffix * 1W cognitively normal, io(10jg E) o _ _ _ _ _ 39. _ [ ;iE W: ] _ Iii M T qt 1W _In the_ long history_ of mankind JEUZ¥1JX. B).13tffi-1ij o B) [ffiffi] !m.>l;<-o JE1il.1tJ=¥1J,ǉJEǊil>l* # ,,fjft1fJFf-fxfJJc*X-i,ǋ!WA´:J!Nǌ1it!W o M-=f i:f=t 1W In the long history of mankind x,t mffi X qt 1W in a historical sense, MT i:p 1W a very small minority x,t mffix * 1W the unusual oneso tJc10jg B)o 40. [;iE W:] Iii MT i:p 1W differences between human languages  cognitive differences between cultures JE1iz.¥1JX. K).13t:ft§-1i] o K) lffiffil !mSl;<•o JEm1U=¥JJ, :tm*a1nm:1t rr•mafiiWiAgmt1:NimxǍi:f=t XfǎN Im ,ft1fJ.&,ǏM:ǐ:tm=mtA´-ra-Ǒf¥-f,ǒIWǓ .it o M -=f i:p 1W differences between human cultures i,t m ffi X i:p 1W how much our cognitive lives differ cross-culturally, io(10jg K) o 41. [;iEftl] Iii MT i:p 1W many experiments  a hard time distinguishing quantities JEm¥1Jx1ltm.13tffi -'i:ij o D) [ffi*fil jAJS(;<-0 JE1iz.1tJ=¥JJ, F1'-µǔilf •Jt²!WµaǕili7-1'"W•IWǖǗ:ǘAfi° X•*wJrcat, 1m1m1ut:iiHrJJc:1:_t iW IR?t, !$.¶ F®xtǙ1taFf-fiWArmǚ :J!±r1ft gi ǛiW$·11 o IJ-=f i:p 1W experiments  conclusion :l:&:Jffix­  o M .:P i:f=t 1W anumeric people x,t m ffi x i:f=t 1W people do not have number words,M.:Pi:f=t!W have a hard time distinguishing quantities X.f mffiX i:p 1W struggle to make quantitative distinctions, Mc1 0jg D) o 42. [ ;iE ftl] Iii M T i:p 1W Making quantitative distinctions  not an inborn skill JE 1il. Jlj X • G) .13tffi = 1ij o G) [ffiffi] !m>l;ǜ-o JE1iz.1tJ=¥1J, ft1fJN:J!:xg •tW$tMf-:Lm:iiHrJEIIR?to M-=fi:f=tA9 Making quantitative distinctions x.f m ffi x i:f=t 1W handle quantitative distinctions, MT i:p 1W not an inborn skill X.fmffiXi:f=t!W are not born to, io(10jg G) o 43. [·fll] Iii MT i:p 1W Every aspect of our lives  numbers JE1il.¥1JX1if A).13t:ft§ǝ1i] o A) [ffiffil !m>l;<-0 JE1iz.1U=¥JJ ,ft1fJIWgffl:J! ••*¸EiWo •tE-FRx-.iWatft,ffl mt:tim!tE:J!³R.t 7 ,1t•:xT ,1tiW¸Ǟ9Hff' •• ,iWǟm••o afifflǠFfrffliW•WiWJJc *ǡ u(ijj Ǣ a 1fJ g ffl i:f=t IW-W o M -=f i:f=t 1W every aspect of our lives X{ m ffi X i:p 1W everything in our lives, ioc10jg A) o 44. [;iE ftl] Iii MT qt 1W Larger numbers  smaller numbers JE1il.¥1JX1if D.l3tffill!l1i] o I) [ǣffil lmSl;<-0 JEm1U=¥1J ,F@1J\\-@IW JJc*:J!j(-@!WJJc*IWǤfillio M-=fi:f=t!W Larger numbers smaller numbers :l:&:Jffix-,M-=f i:p 1W to be built upon X.f mffiX i:p 1W are the basis of, Mc10jg D o 45. [ m w: l Iii M .:P i:p 1W takes great efforts for languages x,t m ffi X i:p 1W our species' linguistic children  grasp the concept of number words JE diversity ,M-=fi:f=t!W cognitive differences between 1il.¥1JX1it F).13t:il§-1ij o ll!Iǥ 2021 &:p. 6 J.J 40 F) [*iffil ˃"i11JHJdlffia )£1.lL'tiJÒJIJ,#"JID! ff}n: ˄"JUMfJ•*R+IWÓiilflz-,ffl.tfM,::kt!W Ô))-*Jll!:fff o ;Jm-=fi:p!W takes great efforts XifmJH: J'( i:p 1W requires extensive practice, ;Im T i:p 1W the concept of number words Xif JM. Jn: X i:p 1W the foundation of our numerical cognition, tit˅ˆ Jg F) o - m•a•mN••tt? N•** #:(£fN J'cui:po :f£ÕÖ#--,x•×*•ˇffi'-1ˈ1WAm•mWL•-ooˉ•* iWM•iWv-1:.ffl o @ A'Bl!ffi wiifff iW•:i:WJi!-, rrff Q-ftffi#RfP! "Y!t"- "-@"¥-f !WwHC o C43)ffltˊZr ,f!GffJ § BIW1:.ffl flt·*vWc!Wo mc:f£f.iˋˌJ'c-lWMf1*,f.q&AJt!+jgJJM:(£ JL il-7 ,{.$7(7 ,{.!Wv;mJi*pˍˎ,{.!Wf*'.i:ØØo f'G{f]Jcr;f,ˏNJfl!WiiffftJJ!W•*ːPlilJ.f'Gff]1:_ffli:p IW-tu o B) C39){E ,JAfilj!_liJl*ˑ',flf!GffJf-f -*liifl!WA#R Ù1ft!Wo :f£A#R*˒ 20 JJ!rf:IW1:.1fir i:p ,f!GffJ*t-r5?tatfaJii 1N!wiifff:l:t!!Úm-to ffilH,:(£ §flJJJM#IW*˓ 7 ,OOO #ffiOi:p ,:tmfriJ'Bl!Jfl •*-tl!#:(£§*˔# 0 C) --*IWA--ftmx•**OIWAÒf˕T--1'1'1 O ,ilf'GffJ7fff.*IW$tOO :tmfriJ'.i:fi!LAiR1*x 1W o !˖®ii •*iWJ'c ˗, -˘-Ol -00-i'wiifff-*IW::t u ,@J˙ ÕÖJJ\\•-iWtU±* 1$;¥nlt1i'l* o if1lAMPif1l7 ˚:1m1i'lJ1l-®1A*|:i:i-*ip.wJ!Wmt!rf:Ao :f£ii •*IW'lwlSLr ,.1*1Wmt!rf:A q&x&*Riifff JR?t;ffl@HZ{˛Û 4 iW•• 0 :(£-J_mQxi:p ,iFJ-lAff5.-7X--1':l:t!!re.!!˜J˝1it:itl:ffilr .m. 'SJEi­ -1'---t:l:t!!re˞ffJJOCili* o RN IW11£*$*1t!OCiliJEi 'jJ\\!.ÜIWA*1t,*$tilif˟% 0 ,fif?.ff] IW&mˠ oo, m: •*ffiyiWAq&x&ic1±ffilr .m.P $Y11£*,ˡff ,ˢ•J:J. im--t-li--t o D) C4D'i!-1'Qˣ;¥ni,lf$Jtfif?.IWQxqf tf17 -,tffiiji!W£aˤ: RAffJii •*wJrCM ,f-mfrn&xt:ill:H•tt LIWIR?t;˥ff˦®Xifff.f!Gf-f!WArrffO }z# § SIW$'11 o filSfilW LfJ. -1J"$%ffiO &: -*-˧iliii •*iW ,ffl.{ffJ-iil:007.*wJtC A˨!WiifflwJtCo E) ffi1is!iliflu!W ,.@--*IWA:f£R+:1Jffi iE1ft!W,{Uf:1:t!!mm711f?.ffJMEiit7 JL--tfilreiWJiF Ýo Rf!GP ˩r!WMfl,f'G;ffi'M•*iWAÞIWJ1:.ffl:i:i-˪MfaJ ,fif?.ffJ @fi:f£m˫iliWfPJOOˬa{J 1t1i'l*Ao ,fl˭f-m;ˮ*˯-¥-f,f!Glttrfltfif?.ffJXifff'GffJÞIWJIW1:.˰JiFÝ!Wsi*JJ.ffffJNtfrHIL rm il-*IWA:f£fM,filiifff lR?t•t!Wff9tflf**ß:tLo -if#˱ A'l'.6tWo $˲,:t{n*--'˳ ifU!iJiili˴ L¥1J˵ --f:;,tP A-i'˶r!YB? ®Üf P!}z'RtM iji!W JR§Jtl:(£--* IWAO!{._m qix&m §Jtl!W 0 F)  -£ai˷1f JIJ 7 Xif I˸ 1t*±˹i:p !Wx.*ffiy 1W JL1l !Wif1l lW Plill ill O :(£flt±j{,˺ ;ctf,Ut•*z 8U' ˻ rffJJ:J.i!::k˼IR?tffl:i:i 3 IW.:i:o f!Gff}.16,˽˾B-*IWR+I˿,7Ji!tt:̀H?t¥$J:1:t!!mRilil!*B11 •:Ito lV́)̂L,))1J.*lp.wJ!WiiffftJJ1tJlt--1'̃i*!W:i:i;ti,̄,:tt̅àrfm&$!rf:IWMl'aJo •m81J Mf1* 'àrffJ |)) •*mt1l fif?.ff] |)) *-BJ:-¥-P O fif?.ff] .i,JtJIJ •* flt mUIIDtff f-11:Jtl 1W 'ffi !p Xif iv:-1' 1f!. ••*iW1tJl•x•mo á-M̆iWmS,̇̈*MRfff--1'̉)£iW•*reÚiW•:lt̊mrffi•--tft ** lo #"JIDt ff}n:}ll!" f'G{fJ.*R+IW£iilfl!W-$%,{E fl,*jl!Wti);J-*J11!:fff o G) f!GffJi:pi§!: A A-iEIW".*A" o C42)f'GffJ 3c1:.mi:i!̋̌Ô:l:t!!:i£1f.:l:IR?to :t{n*&: ̍̎JL WliltltUtu•*ffiyIWJ'cȕMt:,f!GffJ$,'-1tf ÛÓ*IW•:l:rK?trrffß:tLo R-*wJtC;¥n{ffJIW-=f5ffii ̐:itfltf!GffJIW5c-BJ:, IWJâ A;¥n$̑*JfrpslAfltffJIWR+̒̓at, {fm&̔Tf!GffJXif.:l:!WmJJl!o ̕ :i:f̖ :t{n.lltÙ#, ×3I ff'G1fJ atf1*R'-imctnltKi:f:1---tq& § S!W$%,{E$Q#}z:t{n.llto A#RB11 ::kn&3c1:.A*̗#)E:lt*t!, á-!rf:â!Wff K̘lttr7t4f ,ffl. ̙#*i! ̚&IW o Im̛ 2021 !if: 6 ̜ 41 m C37)ffiʂ1llilim,Ligjʃffl tt ,1f11¥Jʄ*fl(Jtf!H&$ Amʅi¥J!ʆʇdFfLo ffJʈʉʊ ʋ)²dFilm ,Ligj!lw:@*ʌ$-@£*1¥1³:IJfUJl!*fl(o $ʍ__t,xt-@´{m!lw#l¥J@JE*M ,:tln*i31AffJ$Z jJ1¥JiAJnt(JJIJl., B1fJ-tfLfl($7t#B1fJl¥Jil:1t}i!Hlo D FR+, 1fJ:ffl:3ffe&:tlnfitJitlʎ T @"dF § ʏ"1¥11¥1ʐ? :fife-m:JmiA,ʑʒJ]}t:(£{tl¥1ffiʓo titʔ __t.1¥) :;k$:5}i-B- ,(tffl+ 10,20 ¶ 5 j}£8"J*Mf o ifl.J]}(;1,A,.@/j\\-,@1¥)ʕ7C-.@1¥) 1¥)£µ 0 ʖffiJ]}i;+ 10 jJ£¶ʗiA+:itr11,iJl¥)-#ffi ,j{O 14(4+ lO)ffi 31(3 X 10 + l)J]}i;1Ji :tffl¥JiiEM o 1f1iʘ+:itr11,IJ1¥Jffi , E§jiffJffl.)'61¥Jffi -Jffife&fPci-M-* ,+ +:itr11itlji£µ1¥J o Jffi ʙ fP Wci-M-*+:itl:11,IJ 1¥1 Jffi!N , 1±1&$x 1t i:p , 1fJffl.;'6 89¥fFjJ-#ʚ&, i-1:A ffJJll!Jff T " -Q ¥ __t l¥11iJ&¥ffiffiʛ-Q¥ __t.1¥)3il&¥ffi²-1¥J" 0 #ʜfaJ1¥Jmr!fltfflffi *iisili**1t{tffl1to  gji;ji{t-z.:f£1&$#i-M- i:p ,"5"fʝ*ʞr"¥"1'-wlo E§.Ilt,1&$1¥J*Mt$OO-t-11i:eEmʟ 1¥Jʠf£:A)1¥Jffi ftjJffifil*ttr§Bl¥J¥ffi¥ffil¥JMʡo#ʢ¥I89ʣ--fFʤA)ffl 00 *JM1L1I. frjE 1¥JfaJmitlf!lw-:(£::k$1¥JX 1t i:p ʥ JfJJ f¿ T 'f.§.Jf:ʦF FJr:;ff 1¥))( 1t$:tln.Ilt 0 J) &:;ff89X1t-tfL:t£1ʧTXiftʨ³{tME1¥JiAJnÃn(iiJ1¥Jwflʩo ,,,ʪ-rl,W.:(£JL· To 1$1¥1ʫ-:xʬ *1t:5t:5t¸ʭic1¥J ,f.El.@1retʮ:f£1HitJ!lwJ!!:m5l__t.Jt#:(£, IP)BifXifr·ll89A*iA-tfLJf:# 1±0:5tffi¸ʯʰ¹*º*ʱftffl1¥J-#¥ʲ1¥J+ 60jJ£1¥J*Mf1¥JO»ffiʳffil¥)*ºg :rto B1fJ1f:(£r1fJl¥J»¼roi:p ,JtFJr:;ff A$fl(hA1retʴ__tʵj(l¥JAI1!,IJ£0 K) .`,
 questions: [
 { id: '2021-06-S2-Q22', question: 'What do we learn about most European passports?', options: ['A) They are relatively uniform in color and design.', 'B) They appear more formal than other passports.', 'C) They are a shade of red bordering on brown.', 'D) They vary in color from country to country.'], answer: 'A' },
 { id: '2021-06-S2-Q23', question: 'What is a compulsory requirement for passports?', options: ['A) They must endure wear and tear.', 'B) They must be of the same size.', 'C) They must be made from a rare material.', 'D) They must follow some common standards.'], answer: 'A' },
 { id: '2021-06-S2-Q24', question: 'Why are dark colors chosen for passport covers?', options: ['A) They look more traditional.', 'B) They look more official.', 'C) They are favored by airlines.', 'D) They are easily identifiable.'], answer: 'B' },
 { id: '2021-06-S2-Q25', question: 'What is special about the pages of many passports?', options: ['A) For beauty.', 'B) For variety.', 'C) For visibility.', 'D) For security.'], answer: 'D' },
 ],
 },

 // ================================================================
 // 2021年6月 第1套
 // ================================================================
 {
 id: '2021-06-S1-SecA-1', year: 2021, month: 6, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2021, 6, 1, 42),
 transcript: `And finally in tonight's news, a 9-year-old boy named Joe, told not to draw in class, wins a job decorating a restaurant with his drawings. Rather than shutting down the habit of drawing in his school's workbook, Joe's parents decided to encourage his creativity by sending their son to an after-school art class. His teacher recognized Joe's talent and posted all his work online, which led to something pretty wonderful. A restaurant named "Number 4" in Newcastle contacted Joe's teacher to ask if the 9-year-old could come and decorate its dining-room with his drawings. Every day after school, Joe's dad drives him to the restaurant so he can put his ideas straight on the wall. Once he's all done, the work will remain there permanently. Joe's dad said Joe is a really talented little boy. He's excellent at school. He's great at football. But drawing is definitely what he is most passionate about. 1.`,
 questions: [
 { id: '2021-06-S1-Q1', question: 'What did Joe\'s parents decide to do?', options: ['A) Enrol him in a Newcastle football club.', 'B) Send him to an after-school art class.', 'C) Forbid him to draw in his workbook.', 'D) Help him post his drawings online.'], answer: 'B' },
 { id: '2021-06-S1-Q2', question: 'What did the restaurant "Number 4" do?', options: ['A) Contacted Joe to decorate its dining-room.', 'B) Hired Joe to paint all the walls of its buildings.', 'C) Renovated its kitchen and all the dining-rooms.', 'D) Asked Joe for permission to use his online drawings.'], answer: 'A' },
 ],
 },
 {
 id: '2021-06-S1-SecA-2', year: 2021, month: 6, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2021, 6, 1, 153),
 transcript: `Kirsteen Marshall, a 34-year-old mum of one, posted a tearful video on social media Wednesday, begging for the safe return of her beloved pet dog. After combing through the security video outside a Gorbals shop, Kirsteen has now posted an image of a man suspected of stealing the dog. The image appears to show a man carrying the dog in his arms. Kirsteen also believes the video obtained from the shop shows the dog being stolen by a man before driving off in a car which had been waiting nearby. The family is now offering a £5,000 reward for the safe return of the dog after launching a social media campaign to find the thief. The dog is six and a half years old and was last seen wearing a red collar. Kirsteen said: "We'll pay that to anyone who brings him home as long as they are not responsible for his disappearance." Police are investigating the incident. ggĕ 2021 '.tp, 6 JI 10 3. What is Kirsteen Marshall trying to do? A) [ff,Jrl A"ilmR&o ffi3f-¥IJ ,fit. 34 ţ 119 Ťť£IT·iX$Ŧŧ1£*1xŨM...tũT Jarflm r 119mŪ, *1r*1ttl!119:16ūfoJtJV- tm 2, '2si.tlt345 A) o 4. What does the news report say about Kirsteen Marshall's family?`,
 questions: [
 { id: '2021-06-S1-Q3', question: 'What is Kirsteen Marshall trying to do?', options: ['A) Get her pet dog back.', 'B) Beg for help from the police.', 'C) Identify the suspect on the security video.', 'D) Post pictures of her pet dog on social media.'], answer: 'A' },
 { id: '2021-06-S1-Q4', question: 'What does the news report say about Kirsteen Marshall\'s family?', options: ['A) It is suffering a great deal from the incident.', 'B) It is helping the police with the investigation.', 'C) It is bringing the case to the local district court.', 'D) It is offering a big reward to anyone who helps.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S1-SecA-3', year: 2021, month: 6, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2021, 6, 1, 265),
 transcript: `London's Eggs & Bread cafe offers boiled eggs, toast, jam, and bacon, as well as tea, coffee and orange juice. But at the end of the meal, customers don't have to worry about the bill. Hungry customers can pay whatever amount they can afford to eat at the cafe, or nothing at all. 0wner Guy Wilson says his cafe aims to build community, rather than profits. He wants to provide a bridge for people to connect in an area that has been divided by class and wealth by providing affordable breakfasts. The cafe is open in the mornings every day of the year and has two members of staff or supervisors on shift every day. The cafe doesn't use volunteers, but pays its staff to ensure consistency in its service. It doesn't take donations and doesn't want to be seen as a charity. Mr. Wilson says, when people start to know other people around them, they realize they're not that different. And whatever their financial background, or their educational background, most people will have something in common with each other. He says it's important that his cafe can offer his customers security and permanence. 5.`,
 questions: [
 { id: '2021-06-S1-Q5', question: 'What does Guy Wilson say his cafe aims to do?', options: ['A) Provide free meals to the local poor.', 'B) Help people connect with each other.', 'C) Help eliminate class difference in his area.', 'D) Provide customers with first-class service.'], answer: 'B' },
 { id: '2021-06-S1-Q6', question: 'What does the news report say about Eggs&Bread cafe?', options: ['A) It does not supervise its employees.', 'B) It donates regularly to a local charity.', 'C) It does not use volunteers.', 'D) It is open round the clock.'], answer: 'C' },
 { id: '2021-06-S1-Q7', question: 'What happens when people start to know each other according to Guy Wilson?', options: ['A) They will realise the importance of communication.', 'B) They will come to the cafe even more frequently.', 'C) They will care less about their own background.', 'D) They will find they have something in common.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S1-SecB-1', year: 2021, month: 6, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2021, 6, 1, 446),
 transcript: `M: So what time do you think we should have the party on Saturday? W: How about inviting people to come at 6:00 p. m.? Then we'll have the afternoon to prepare food and drink, and stuff like that. M: Yes, I was thinking that around 6:00 would be good too. What food should we provide? W: Well, I had thought about baking a cake, and some biscuits. And now I think we should prepare some sandwiches and snacks, and some other kinds of food, so that people can just help themselves, rather than getting everyone to sit down at the table to eat a meal. I think that's a bit too formal. It's better to let people walk around and talk to each other, or sit where they like. M: Yes, that sounds good. I'll go to the supermarket to get some drinks. I think I might try that big new supermarket on the other side of town and see what they have. I've not been there before. I think we Im 2021  6 A 11 should get some beer and wine, and some fruit juice, and other soft drinks. What do you think? W: Sounds great. I think those drinks will be enough. (lO)And I heard that the new supermarket offers some big discounts to attract customers. So going there should be a great idea. What should we do about music? M: Maybe we should ask Paul to bring his computer and speakers, so that we can play some music. He has a great collection of different stuff. W: Yes. All right. 8. What are the speakers mainly talking about? O[ffil.±i*••o *M'H±W k±N /\\öIWJl.f*atl'aJ, k±miSCf Lfl\\£, ¥-F{if!.11'J 1f JEu$iWatraJ:uHfll*, mtIFoxtJ;xtr:ut:÷t/7itit 7E-Ffl*l¥Jit.-.ilt*øo !;51Jlt,J;}..t[_±F itit!W!E!Wti*Ift,:7'1 C)o 9. Why does the woman say it is a good idea to serve foods that guests can help themselves to? ID[ffil§IWG1;51Bo H±W k±rl*ftIit• at,k±&:2Js:mmiiHitUu1JFF,1.EJJJl'.tEf!lf!lù! m1Jt.=:úJHEtL£4û-" ,¥fJAi:iJK*@IjEü ,liffl 5tr/it, 1;51Jlt1g B) o 10. What does the woman say about the new supermarket? A) [*fil gaJ-=p"iABo xfi:pk±#¥tJ ,itk0r& **1rfflm1g7ýslJ®tJ##t7q11*11rtn, 1;51JJt :7'1 A) o 11. What does the man suggest they ask Paul to do? D) [ffffi]gaJi,"iABo *þk±W rl*ftI * *,  ±mi>l-tHiMntur Et!WLÿ "%ff, ¥-F1if!.`,
 questions: [
 { id: '2021-06-S1-Q8', question: 'What are the speakers mainly talking about?', options: ['A) A surprise party for Paul\'s birthday.', 'B) Travel plans for the coming weekend.', 'C) Preparations for Saturday\'s get-together.', 'D) The new market on the other side of town.'], answer: 'C' },
 { id: '2021-06-S1-Q9', question: 'Why does the woman say it is a good idea to serve foods that guests can help themselves to?', options: ['A) It makes the hostess\'s job a whole lot easier.', 'B) It enables guests to walk around and chat freely.', 'C) It saves considerable time and labor.', 'D) It requires fewer tables and chairs.'], answer: 'B' },
 { id: '2021-06-S1-Q10', question: 'What does the woman say about the new supermarket?', options: ['A) It offers some big discounts.', 'B) It is quite close to her house.', 'C) It is more spacious and less crowded.', 'D) It sells local wines and soft drinks.'], answer: 'A' },
 { id: '2021-06-S1-Q11', question: 'What does the man suggest they ask Paul to do?', options: ['A) Cook a dish for the party.', 'B) Arrive 10 minutes earlier.', 'C) Prepare a few opening remarks.', 'D) Bring his computer and speakers.'], answer: 'D' },
 ],
 },
 {
 id: '2021-06-S1-SecB-2', year: 2021, month: 6, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2021, 6, 1, 627),
 transcript: `W: I'm thinking of buying a car. I wouldn't need to use it every day, but I think it would be very convenient to have one for the weekends. M: That's exciting. Would this be your first car? W: No, I actually owned a car for a little while when I lived in Miami. You see in America, many cities don't have good public transport. So, most people need their own car to get around. M: I see. So have you got your mind set on a specific model? W: No, not really. I've heard that German cars are very reliable, but I haven't decided on a specific model yet. I'd also like it to be small, so that it's easy to drive in the city. M: 1 have a friend who sells second-hand cars. In fact, I think his family owns the business. He's a really nice guy, and he knows a lot about cars. I could give you his phone number if you want, and you could call him and ask him questions. W: Hmm, that's nice of you, but I don't want to feel obliged to buy one of his cars. M: 05-DOh, no, he's not like that. He's a good friend of mine, and he would never try to pressure you or cheat you. W: Well, if you trust him, then, I guess it should be OK. To be honest, I could use some help in deciding what type of vehicle would best suit my needs. Speaking to an expert would be a good idea. M: Cl5-2)Exactly. You have nothing to worry about. He's a lovely guy, and he'll be happy to help. 12. Why does the woman want to have a car? D) [ffil§!WG1;51Bo *Mk±i#.§Bf!lāffi $ '£?&:hlkĂWHHt:xmm $ '{Ei.!:hlkiA1.J N *1f .$ilifi1itf@!, 1;51.Ilt1g D) 0 13. What does the woman say about German cars? A) [ff*fil gaJ-=p"iABo xfi:pk±#¥tJ ,itk0TiJUl ăfe$qi1:iJ#, 1;5illt:1g A) o 14. What does the man recommend the woman do? Im 2021  6 A 12 C) UiUJil -=p iJdJ!o Xtti59=' ,3C±Jf i.fUE El B ,ćĈ$,f.EL:htk$m *M'J\\B"J, {( -=rĉIDI!; :!ij ±iJi§ B!1-Ċ=¥$8"JM,{mxtrSC$NO#T m , 3'± PT ċfm nit!. t& foJ-r rsc * :1Joo 8"J roJ J®L E'3 lltftWT, :!ij ±Qi5l3C± PTČ itč fm 8"J M , IN lit  C)o 15.`,
 questions: [
 { id: '2021-06-S1-Q12', question: 'Why does the woman want to have a car?', options: ['A) For commuting to work.', 'B) For long-distance travel.', 'C) For getting around in Miami.', 'D) For convenience at weekends.'], answer: 'D' },
 { id: '2021-06-S1-Q13', question: 'What does the woman say about German cars?', options: ['A) They are reliable.', 'B) They are compact.', 'C) They are spacious.', 'D) They are easy to drive.'], answer: 'A' },
 { id: '2021-06-S1-Q14', question: 'What does the man recommend the woman do?', options: ['A) Buy a second-hand car.', 'B) Trust her own judgment.', 'C) Seek advice from his friend.', 'D) Look around before deciding.'], answer: 'C' },
 { id: '2021-06-S1-Q15', question: 'What do we learn about the man\'s friend from the conversation?', options: ['A) He sells new cars.', 'B) He can be trusted.', 'C) He is starting a business.', 'D) He is a successful car dealer.'], answer: 'B' },
 ],
 },
 {
 id: '2021-06-S1-SecC-1', year: 2021, month: 6, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2021, 6, 1, 836),
 transcript: `Pigs are not native to North America. They were first introduced to California by Spanish and Russian explorers and settlers many centuries ago. In the early times, pigs were allowed to wander freely in search of food. This practice also allowed many pigs to escape from farms and live in the wild, which became a problem. In fact, as one of the most damaging invasive species on the continent, C17)wild pigs cause millions of dollars in crop damage yearly. They also harbor dozens of diseases that threaten both humans and farm animals. Forest patches with wild pigs have been found to have considerably reduced plant and animal diversity. In addition to either eating other animals or their food supply, wild pigs damage native habitats by rooting up grasses and rubbing on trees. Their activities may also create opportunities for invasive plants to colonize these areas. Wild pigs will eat almost anything containing calories. Mice, deer, birds, snakes and frogs are among their victims. They can also harm other wild species through indirect competition, rather than eating them or shrinking their food supply. On one particular United States island, wild pigs themselves became an attractive food source for a species of mainland eagle. The eagles began breeding on the island, and also feeding on a species of native fox. The foxes were almost wiped out completely. 16. What do we learn about early pigs in North America? A) [Ě*Ji] lJ l:An!o filX:rfěffitl:i ,ffi"JfNOffiĜ -=rĝtĞ, 1:: ffJ:iHJJ T E'3 * El wm3f ffiflğ Ġ 8"J ġ ĢUffiJEJ@Usl A:baftHlģ.W.B"J O 1:E1P-M' )\\.{f] ftWffiElruĤĥĦħ"•'V#ĨĩĪīĬWW ffiĭ:.&Įį¥U!ffİıĲffl o INllt,#$ A) o 17. Why are wild pigs a threat to humans? D) UJUJil §B"JffilNn!o mxX¥U,!ffffiĳ!cpĴnx;ĵ ĶHYķB"Jĸ.fflĹ,'EĺĻ---WW-ļA Ľffi*1'°8"Jľm, INllt#$ D) o 18.`,
 questions: [
 { id: '2021-06-S1-Q16', question: 'What do we learn about early pigs in North America?', options: ['A) Many escaped from farms and became wild.', 'B) They were actually native to North America.', 'C) Many got killed in the wild when searching for food.', 'D) They were hunted by Spanish and Russian explorers.'], answer: 'A' },
 { id: '2021-06-S1-Q17', question: 'Why are wild pigs a threat to humans?', options: ['A) They often make sudden attacks on people.', 'B) They break up nature\'s food supply chain.', 'C) They cause much environmental pollution.', 'D) They carry a great many diseases.'], answer: 'D' },
 { id: '2021-06-S1-Q18', question: 'What does the passage say about the native foxes on the US island?', options: ['A) They lived peacefully with wild pigs.', 'B) They ran out of food completely.', 'C) They fell victim to eagles.', 'D) They reproduced quickly.'], answer: 'C' },
 ],
 },
 {
 id: '2021-06-S1-SecC-2', year: 2021, month: 6, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2021, 6, 1, 1013),
 transcript: `A pair of entrepreneurs are planning to build and launch a spacecraft that would carry and roast coffee beans in outer space. The craft will use the heat of re-entry to roast coffee beans as they float inside it in a pressurised tank. The effect would be to roast the beans all over, and produce perfect coffee. The businessmen say that on Earth, beans can easily break apart and get burned in the roaster. But if gravity is removed, the beans float around in c1 hekled oven, received 360 dmgrees of_ e\\-'nnly dis!!opqtrd hec1t anstast tu near perfevtio?· The spacecraft will reach a height of around 200 km. The beans would then be roasted in the heat generated by the craft's 20-minute re-entry into Earth's atmosphere. Temperatures in the pressurised tank will [9w 2021 !ip 6 J.J 13 be kept to around 200 °C . Once back on Earth, the planet's first space-roasted beans would be used to make coffee that would be sold for the first time in Dubai. This is where the pair's company is based. It is not clear how much they would charge for a cup. Surprisingly, the Space Roaster concept-should it go ahead-will not be the first attempt to take coffee into space. In 2015, two Italian companies, collaborated on the construction of a similar type of spacecraft, which was the first coffee machine designed for use in space. 19. What are a pair of entrepreneurs planning to do? B) [ffl,fil gm-=pƳHJdWL mx3f Ƈdf ¥lj 'rW M {E:.ill(.* ƈttƉ••*£M-•**m,•mƊ•* IWUl!41:5f#;(£7Ƌ::kƌ'.l;!tm, fEI.Jlt+,7'1 B) a 20.`,
 questions: [
 { id: '2021-06-S1-Q19', question: 'What are a pair of entrepreneurs planning to do?', options: ['A) Taste coffee while in outer space.', 'B) Roast coffee beans in outer space.', 'C) Develop a new strain of coffee bean.', 'D) Use a pressurised tank to brew coffee.'], answer: 'B' },
 { id: '2021-06-S1-Q20', question: 'What does the passage say about coffee beans roasted on Earth?', options: ['A) They can easily get burned.', 'B) They float around in the oven.', 'C) They have to be heated to 360°C.', 'D) They receive evenly distributed heat.'], answer: 'A' },
 { id: '2021-06-S1-Q21', question: 'What did the two Italian companies do in 2015?', options: ['A) They charged a high price for their space-roasted coffee beans.', 'B) They set up a branch in Dubai to manufacture coffee roasters.', 'C) They collaborated on building the first space coffee machine.', 'D) They abandoned the attempt to roast coffee beans in space.'], answer: 'C' },
 ],
 },
 {
 id: '2021-06-S1-SecC-3', year: 2021, month: 6, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2021, 6, 1, 1182),
 transcript: `In cold and snowy Alaska, there's a village called Takotna. It has a population of a mere 49 souls. Each March, this tiny village swells up in numbers, because it is located in the middle of a race that takes place every year. It is a seven-day race, called the Iditarod Trail and participants stop at Takotna for their obligatory 24-hour rest. Lucky for them, Takotna is famous for its delicious fruit pies. Weeks before the competitors arrive, the residents of Takotna start preparing for what is without question their biggest event of the year. The whole village chips in to help, including the kids, who end up developing their baking skills at an early age. The exhausted and hungry racers are greeted with delightful pies of all kinds, such as apple, orange, lemon or banana. They consume the pies as stomach warming race fuel. - - - - - --'fh€}-tough-ness-0f- the-raGƚ allows for-raGers -to--eat- pretty much- whatever-they-want.- -'I'he-more- calories, -the - - - better. Takotna has gained a reputation for its dessert-based hospitality since the 1970s. It started with one person, Jan Newton. Jan moved from Idaho with her husband in 1972 and opened a restaurant. Her rich and filling-fruit pies quickly got the racers' attention, and the village gained some fame as a result. Proud residents then started to refer to Jan as Queen of Takotna. 22. Why do a lot of people come to the village of Takotna every March? B) lffl,fil § JJ.RfEIJMt mx3fƛ7¥IJ, imitkWr:boiM ilf-H¡¢tt£Ɯ1£1f 49 .A,{JlƝA.=:JJAƞ¤ ·Ɵ,[El7']1f-g7'1Ơ 7 *t • >Jt · ;(£ Jlt:ilf!:fơr*f*,'&, 24 ;j\\Bt, [E!Jlt+,7'J B) a 23. What is the village of Takotna famous for? C) [ffl,fil gm-=µmRN1Ia m::t7¥IJ, ilf-H¡¢ttfEIJt: Ƣ1* 7.J(*£ƣM, [E!Jlt+,7'J C) a 24. Who comes to help with the event of the year? B) Ut,Jrl gm-=µmRN1Ia m::t7¥IJ ,Ƥttm1f A,'El. m!ƥ®A tc 1MEL s ƦƧ¤tMff 1J\\ I*, w 'tt11':tlf.$, [E!Jlt+,7'J B) a 25. What does the passage say about Jan Newton? D) [m*fil gm-=pfiltJrN1fa mX:lila7¥1J, mJ • L:j::t_Ull ::st:1c1£ 1972 ARƨƩ{ifHM.¥1J.Jlt:ilf!.,#3fT-* ƪta', :!l!k-Mi Jk*£1i'l9Hl¥IJƫ·Ƭ *tl:, ttr ƭJltMƮft*o ƯJltm ,mf·L:j::fflưttr ,Gx;M1f£Ʊfffl, [E!Jlt+,7'J D) a 12!1Ʋ 2021 A 6 }j 14 Part ][ Reading Comprehension Section A [JtlBɀiJil *-XɁ § 20161:p 11 J=J <ɂ:(£ National Geographic C« IEiOlf!J:Jf!)))ɃɄ_t-Ʌ;f:jffi*"Meet the World's Coolest Ant"(((iAiRtltW. _t:ft±lJ.j(B"J!kij!QJ())) B"]j(jjt o [ ta *1;J *1! 111 l ,I" ----- ---- --- ' e:m1Rftffl7a* - B"J- --n•EMM .*§!"#M$*%B"l&%: Ɇ - : *x11?:{f1:tt!:fr7117fJto : I '----- ------------------------------------------------------------/ "' I I .,, ----------------------------------------------------------------- ' *:SC::tɇftif:i 7 : : ffi2Rftffl71MJEl¥1Ɉ*: iUJll¥J;:§<f:iMftttffiɉt-¥BUJ-f16Ɋ, hAmH*1f11?:{f1:o/c.ɋ : ffiin€imi1uɌl't-JM .--:--e, .:Ht. I l=IJ:t)'(;'fo I *AIUo : '-----------------------------------------------------------------' ---- : /-----------------------------------------------------------------,  -e: ffi3Rf£¥IJ, -@iɍr1JxHɎUl¥Ja#;:§<B[MfJLiMɏɐ@. iEitOOɑJltJliifflr{;\\f1JP : : Aɒo : ... , Uffl·liɓHfil t; ffil : E) extreme f]i ɔ; F) hunt tl =; tJ af; I) remote ɕ t£ :ff; K) species C  ffi t!WJ 1¥J ) 4o/.J # , # ; L) specimens ɖ*;´{9tl ,1ti:{9iJ id] ffil : A) adapting C ,&!) °M , C ,&!) °it; C) crawling _fr; D) crowded ɗrim ; F) hunt jf =; H) moderate (,&!)ɘə,(,&!)ɚɛ; J) removed ±ɜ;ɝJE Jlfɞffil: D) crowded 1'-IH 1fa{J; E) extreme f]ijjtl¥.J; H) moderate mJ3tl¥.J, i:pɟl¥.J; I) remote ²:®1¥.J .²10$1¥1; M) thick ɠ*1¥.J; N) tiny f}it!j\\1¥] ,1J(!j\\8"); 0) unique 5i-x=IW ;xf:Htl¥J ;1J iffl: B) consciously fliHJUt!!; G) literally 1¥.J³ .³´ *w•i;= 10r tP ir:! 28. [¼,ral %]iriJʂHfiJ!o C) [ifµ }'Jj Iffi] #} 1il r ft iriJ w] ffl from ... into Z. ml', rrffll*-1u1¥.J.±.::P this is the perfect time to seek lunch, IE!llt **¶>j:JtAiWJ 1¥1-ing %:i:t ɡ-ed %:i:to Uf Sl Y='IJ Iffil ** FJr iE W5ht }/!i : hA B 1f1 l¥J :Im r -ɢ ·-^1¥.Jffi*ro affl#mm , !l!ij!kJlOOfi4o/.J, IEl.llt **r&:!lA @fl"_lr" :fi:Jl.1¥.Jw], iiJc*-ffi?A* C) crawlingo 21. [  ,ral wmt1rm o F) UUJY:'IJ!ffil #f1il-ririlɣJE:i:-tɤ-% to Z.J§ ,11'­ wlmffi- for food Zml', IE!llt #f¸>j:JtAwJ moio Uf SlY='IJ Iffil ** FJr:(£ W5.ht ,8u:i'- :1.Etxt rt!* ••*ɥ,hABID1¥.J:1mr•ɦ_·-^1¥Jɧ*r __ it*1,a=1tlf-ɨ1¥.J%ɩMmo 1B FA - -- - - 001¥.J seek m , #fr&:!lA@fI"=tt,tlɪ":fi: Jl.1¥.Jw], iiJc*-ffi?A* F) hunto E) UUJY:'IJ!ffil **FA'iriJ heat, IE!llt **¶> j:JtA%]wlo UfSl¹Jlffil m1uºm ,* § tɫɬJat1¥Jfll-ɭɮ:(£ 1111€tm»mi:p?vfJttlll€tmɯ!Qll, in the --­ heat iJiaJJ1111€tm»mi¥.Jɰ:ijL ɱFfrml , ffitllfr ɲt9mf11J3tɳ^l¥.J, IE!llt #fJliI:IAA @fl"ɴp # 1¥.J ' flit J3t 1¥.J " :ft Jl I¥] % ] wJ ' iiJc * Im ? A * E) extreme o 29. [ ¼ ,ral ' -im mt1r1m 0 K) [ifµ¹Jlffi] 5ttR1urɵWm ,how 5[ɶ1¥Jɷffi­ ,bA1ijɸɹ.±ffi-o #f1ilrJEAitW the ZJ§, ½lit #}¸>:!AA' iriJ o Uf SlY='IJ Iffil #f FlriEWJt:ft,,,: § 1¥JfLHif 1t1, u}t <-a# ɺMmr&•BB"lo mɻɼ m ,lit the ffil¥.Jtl*mɽ!Qll, ½lit --------- -- #}f&:IaA @fI"*1,t!WJ#"ºJll¥J1;wJ, iiJPIɾ Im? A * K) specieso :(£ * wj ɿ , L ) 12!1ʀ 2021 ʁ 6 fa.) 15 specimens Wʉl::§ species ri:ffl',specimens ffi J:fFffflgiat:@tʊʋt-Fø ,*itffiʌ, 12sIJJt1-fl:• o 30. [_F.ii:1 IIJ-tmmfRBo G) [ffiʍBJl3Yr] 1*1.)LT can ;flligjittf melt Zia], +JJt g5£t.,:IJ(ADJim [ffi)tBJlr] 1*FJr:(:E/pJ-1'-}E'.ffi)A /pJ ,æt(pfrr ffi  heat, 'UJ rt '-.I " fta ô ffi 1t ¥.t   jWj llil" o m_tj(ilJi,:J ,'£89 heat ffi®Rdflot!ftçm jWjWt, 'E1Vflftab¥.tffi1t, +JJt1*5ltJ.&:IJ(A *fl"1Vfl ,1Vflʎ"ʏs!iliffl.JitSlIHR3, tt(*J!ðC '-.I G) literallyo ::73ʐ4'-ʑïIIJim B) consciously *it* JI.. ' l2sI JJt1-fl:. 0 31. [_F.ii:1 %h-tWJmffi»JL M) [ffi$BJlr] 1j[-=fli!J hair Zf!f, 12sIJJt5lt -,:ll.A%Wli!J ,.E§ triangular ;ft.jnjæt(p hair o [ffi )t JU IT] g 1* Flf 1:E $ 5t  1tJ '-.I: 'E 1rJ  __ ,.:::.JfJ%=ettff{.=:ʒ•-¥-t\\liMJ'tè, é -••89&M••,•cBfilʓê*mmM89 -89ëʔ0 mm•mi,l,'#••®=ettmʕ &MJ'tʖ,W=e2tì$,&M••ìʗ'ʘftaʙ¥1J "--&M•*", +JJt5£tJ.&:IJ(A *fl"$ ,ʚW89"1tJ!..%Ww.J, i&*lffiC'-.1 M) thicko 32. c  F.ii:1 75hli!Jmiflrm D J) [i.i$J1Jlf] 1*m-=f.±ffi Quentin Willot 25, ** the hair Zf!f, 12siJJt'.2ʛ5lt·,-Ai;JJw.JfF [ii)tt1Jlr] f)r:(:E$5t'UJ-d: e1'.1#±-f tr·•MDm-renR-R••_t =e m1tJ•mi,l,fIT·•MDre=ettJA•• _tJ&r, f/&5re••iit¥1J1Jo1Jr, iiE=ett !Wi--0 +JJt1*5ltNI:llA *fl"Jfltr, ʜí" •Jli;JJli!J, *BC'-.1 J) removedo 33. c F.i1 %Wli!Jʝiflr!ffio N) Cii$t1Jfff] 1*'Ul-=f}E'.mli!J a 25 ,w.J knife zf!f, +JJtg5£t.,:IJ(A%Wli!J o [ii)tt1Jlf] 1*JW:(:E$5t89'UJ.'-.I: e1'.1#±-f tr·•MDm-re nJA-R•• _tm •=etto l2sl •• !m",Flr ffl n#NL­ -mq1vJ\\, 12sIJJt5ltNI:llA *fl" 1J\\®"•J!.. 89%hli!J, *lffiCd N) tiny o 34. [ _ F.i] itt J!..;JtltJrm,J 0 0) Cii51t1Jl3Yf] Ul-=f *i;JJli!] is 25, +JJt'.21*5lt rl*,:IJ(A%hli!Jʞi;JJli!J 895tw.J%:ct o [ij)tBJlr] '.2FJf:(:E{ffS5t/pJft'-.J: ·--ʟî ʠ.#nj1:E15hk *1tJiʡY n  ':(:E 4iïJ_gf i:p ' 0) unique %h·ʢmtDh- 'it(difs:/ffiðC 0 3s. C_F.iJ 75hli!JmiflrJ@t A) [ii$BJlr] m-=f6m}E'.f*ffG are interested in Z5.&li!J9ififfi these ants' method ztrr, 12sIJJt 1*5ltrM,:IJ(Ai;JJiWJ 89-ing %:et o [ij)tJ1Jlf] g1*FJr:(:E{ffS5t/pJ-d: -@0"Rlfl ñʣb'@E-nj Ao lpJ:f:JUJJ ,$%&J't& =etto'-( AffJPI!,? FR */pJ1:1:i,b'#Jfʤʥ-ʦʧv"ʨʩ _t! ʪʫ'.2 1*5ttNI:llA *fl"Nrffl-=f, ftffl -=f"1t3l8915hwJ,  *ni A) adaptingo e11kllft!ftçma9f!!Jt:Mfrʬ 120 ʭft)t:ff.f ,:k$1fci;JJk:$ʮ1tʯî5tt o f.§.Xif11kllftmʰ-*i'JA 'E 1fJit!!T$:1Cʱ¥IJMmJ'trtlitk '.ʲʳft%ʴMfJL 2015 ' tt;f!Jff.jJ§EJr:kò89ó$ *ffJ:itfAt&m,1JoA¥1JTʵ@E-B9§A.ffii:p O 1ik1(V(Eʶi:rʷY-1-Y.J ,m.uiE-jfʸtf:l'E1fJ:ift,c § 89qfHl ʹ, ʺZtJJl.fltlk# :!tllfiiJʻNZ.fltl 891VflftaôijHt¥.t  ʼllil 89 o @-ʽʾM,óò•mmʿˀ-·--·ˁ®E•,tt•'Efil.W89-=.ifJ%=ett•-=••-˂&M J'tè,é-JiJ9t&M3ltW:,õc'E1fJite.ê*13Em·ta89:!ië- o eti#±-ftr • •Mt˃m-re,J\\ nJA-REö_tWfí=ett,#IB'Eiit1:E:bo1JrM,.ö1*m.˄,IJ _tfro ••••••.÷nj1:1:75hei:r˅-ˆ=89o .÷&J'tm=ettft.cAˇ?•MDi,­ @0"Riflñ@bˈ@··®njmffl-=fAnnWW,ˉfflJAflˊ-=f-cfflˋˌ-ˍ-ˎI 7(õ-lWˏ(,§(·89·ø fillː 2021 6 JJ 16 ii· £;)(-ii-App Section B . a if.It [!I - .. [:X:ʒJIUll *-XʓI§ 2018 813 14 13 fiJʔ:iE www.ksdk.com jijjʕ..te1.J-ʖf;ft,ffl:;lg''The start of high school doesn't have to be stressful" (((-:Jf:Mi..tiii'flʗ&,:iffffi.jJ)))B1.Jj(Jʘ\\ [liʙffillll /----------------------- ----------------------------------- -- ,-e>l A)&ffiili, :ft AiWiiftE, ʚfl !:ES:iʛJJi "fL&pJ'Pitr" -JiJtlfit@fFʜo ʝ *:X:.:E IHii.f 7 Xit'VF ʬ ʭʮʯU.lt, liʰit"Aʱ ʲ:fiifʳfi Bi:h ' 1§ʴ  .ffijj! iiJ ʵ il:f& ifUl!ʶ il!!SZX'tʷt hJt o I '-------------- --------- ----------- ---------- ------ --- -' I , ------------------------------------------------- -------- -- : A: B) -E)&,HJUiitAT "111¥-J**" x>t !t*A c ʞIff, Aʟxttʠ :!lJr.dʡ: -{-.,: 1* ) , *jgl±fK C ʢ:t&ʣʤ ) :li.mte1.Jʥn(rt} o ! l , _________ -------------------------------- ---------- ______ ,, I I , ------------------------------ --------- --------- --- --, L -e>: F)-J)mm ili iJf,iA..ilimttJJJ!ʦʧʨʩ !t:!luMJjizx>J :ltl:Aitli rf:t FJriiffllai 6'9tdG • : . : iJf1l:2i:m!, S: !£*ʪ ey W: iJ:fiMfJ1!:M:t&JitlXtʫ o J , __ ---------------------- -------------------------------- _; 36. [ʸ m:l m ,m .::P 'fl B1J depressionʹ increase ! the first year of high school }:i!{i!J!Jj(jjt E)&ffi-'A] o E) Dfffil frt]Jl@A,mo J:i!1ir'i:iJʺJIJ,WfVʻʼ''fl -1¥-ffl.im #&A-' iftfll):fiE!\\li:hn :&$ B1J &pffi-z - o JM T l::j:t B1J The number of people experiencing depression shows a sharp Increase XtJN.mtX l::j:t B1J one of the greatest increases in depression of any year over the lifespan, McB Ji/ E) o 37. [W m:l m ,m .::P 'fl B1J the only decisive factor ! stress responses }:i!{ftjjj(jjt G)mff!Jfdtl='i:iJ 0 G) [ffffil ʽ,HJHlJm o J:i! 1ft 'i:iJ ffi ili , JX&-1'-ʾ A •;JJ B1.Jt1t'=, ʿJi/ˀˁ ˂1* B1J JN.•&Jitl#˃M)t -Ot˄tk:f--1'-Aa<JJvtgJf o Jm-=f 1::j:t B1J not the only decisive factor M 1i!l }:i! 1il 'A] l::j:t B1J not determined solely, JM .::P l::j:t B1J students' academic performance ffle1.Jt/t&J:i!m'AJ'fle1.J one's grades,M(BJi/ G) o 38. [Wit[] mJm::Pi::j:ta<J parents and schools! help }:i! mJ!Jj(jjt D&ff!Jfdfl= 'AJ o J) D!ffil Y1H.3ZJmc J:i!m'i:iJffi ill ,˅fl1:HSˆ!ll Y fffˇJfrli '**X tHfftˈ Bi3l01PitW ffu 'IEˉ# ˊˋˌ# B1.J Xttˍmˎo -=fl::j:t e1.J Researchers! parents and schools 5HJIJXifJN.j£{iz 'A] l::j:t B1J We ! teachers, parents or school counselors, JM .::P l::j:t B1J can help ninth graders by changing their mindset & Xt }:i! 1il 'A] l::j:t can help students keep their ongoing academic or social _diffkulties_in _p_ersp_ecti:ve __ B1.JjJljˏ:J.3 _ ː , _ li1(_ˑ_ J) 0 graduate,500,000 dollars® the local economy }:i! 1ir¥1Jx:1it c)mff!J˒ffi='i:iJ o C) UHff l frtJ Jl@A,m o J:i! 1il 'i:iJffi ili , -JJJ!Wf V fi!iiU!n , ˓$-˔%Jvt'fl˕B1.J ''˖Xif˗˘˙m˚ 'B1.J˛'˜˝Ji/50n˞˟X£$oJm.::Pˠa1.J According to one study ! each high school graduate ?t Jtl X>f 1i!l JJ! 1il 'A] l=P B1J One study has calculated that! a single additional student who completes high school, JM .::P l::j:t a<J contributes at least 500, OOO dollars to the local economy &X-f j£ fir 'A] l::j:t the lifetime benefit to the local economy ... is half a million dollars or more ff9 frtJ 3l@A, M(BJil C) o 40. [ W 1U:] ltl l=P a<] one study, students, their social position ! not unchangeable }:i! lil. JIJ >( jjt m&ffi = 'i:iJ o H) [ffffi] YT-JY=JZJffio JJ!f)l'AJ;Jtiili ,£:JXJJ Hj}fˡ'fl, WFVA.il ˢ:iff  ' 1m fn a<J ;;  7t1W L1l a, w&ˣw,a<Jttˤ:t&1ileyL1l˥˦˧˨˩ tl# ffij a 1e O * B1J students were told ;fll their social position % ;Jtl Xt Jitl 'A] l::j:t a<] we taught them ® their social standing, ,m .::P 'fl 1W is not unchangeable &MJJ! 1:sz. 'A] l::j:t can change over time B1.J˪Jl@˫,M(BJq HL 41. [ «r l m .::P 'fl a<J depression, losses ;fll worldwide JJ!lil.J!Jj(jjt E)&:fi:JE'-'A] o E) [ffffi] YT-JY=JZJffio )'.€,{ft'A];Jti tf1, tftWJ!ˬffl˭ - Jl=-ˮ_,k!rtt:rr.˯˰˱˲-®'r:=Jlffl˳*#' ffl5_fil: A˴tttw˵m:&me1.J mo • 1::j:ta<Jtt˶ 39. c «r1 m ,m l::j:t B1J one study . high school reported thatXifli!lJ:i!1ir'i:iJl::j:te1.J The World Health rmffl. 2021 &p 6 JJ 11 Organization reports that, tf:t ES depression results in enormous economic losses worldwide XifJE{il-it]tf:t depression has the greatest burden of disease worldwide, in terms of the total cost of treatment and the loss of productivity ESfl115 93 Ø E)a 42. [.'.i:Ef.iL] tit/m-=ftf:tES One study .. friendships among ninth graders far from stable D)Ô D) [ij.1*.Jr] w"ff 11=1Î/mo JEm-itJffl ill, -:r.Yf ttx,jJL&f: • ESiffx2ty, n•• tf:t1f 50% ES:tim ɓ-7AÏr7AÐzT{fu, Ñ00:tim# t-£lnHfES"ÒJE'i1:a Di-=f lf'ES friendships among ninth graders Xif MJE{il-it] If' ES friendships among ninth graders,/m.::Ptf:tES far from stable X.fJE{il -it] If' striking instability ES fAJ Ji... Ó 5£, Ö *0D)o 43. [ ,:iE flt ] EE Im .::P q:t ES academic performance declining sharply the ninth grade JE{il¥1Jx• A)Ôɔfilt-itJo A) [ij.1*.Jr] IAJJJ...|5£/mo JEul-itJffi ili, ilf=:Jtz=f'I9 *Sm"n••'**", m ES 8mz i!J Õ o Im tf:t ES More than half of students x,j M JE & -it] tf:t ES nearly two-thirds of students, Im .::P tf:t ES their academic performance declining sharply X.f JE {1!.1'] q:t a dramatic drop in a student's academic performance ES fAJ Ji...Ó ɕ'ÖÛ*0A)o 44. [×flt] tit/m-=ftf:tES experiments-. respond to stress  positive JE{1t.JUx• Dɖ!t..@001tJ o D Ui*Jrl w"ff 93Ø/mo JE{1t.1tJffi ili, è {1111tɗ ɘA iiJQ{?Jt{l'I9 ,{iB{l1Ði9!J!T:l:&MX.f J.lijJ ,ə ɚffiÙ Mfl1ɛ-ɜB1iiMJJ*MM.ɝEStt ɞo-ç mt*ɟɠmA-=fffiES mffÚɡ!J! P,{iB{fJESJL'ID±ɢɣESmɤ!J!$- OO;f81f !liJr!J!$1'I9ɥ ɦJirA:kɧ, iiå , t-Effi ɨ JMtHE ɩ _tÑy]!T a Im .::P If' ES respond to stress in a more positive way ){,jg {it-it] tf:t when students were taught that people can change, they had better responses to stress ES;flJ.t11593Î, i!i.iÛ*0 I) a 45. [× flt] tit Im If' l'I9 beneficial .. explore .. the challenges  high school JE {1!. j!J )( • F) --itJo F) Ui*.Jrl fA'JJJ...|5£/mo JEm-itJffi ili ,ɪm¥1JEJr1if ®•ɫ•ɬ-7mtɭESn••Sm.••••• @ɮɯ*B•M•Ï-tf:tEJrffiɰES 8 .. ttɱ ·!wɲESÜEi!& {fHf ES o ES It is beneficial  explore ways to cope with the challenges Xif M If' a{] it pays  explore what can be done to meet the academic, social and emotional challenges a /m.::PɳXifJEm 1tJ ES fA1 JJ...|5£, * 0 F)o -3f !dt..t It' ..  ffit.J A) *A ,Ýɴɵ1if@m 400 JJ Tf:!ift_tÞlflo 1lf$A *fitɶi1iTo iEUi$AJi!tl"ßo {-fwà­ à, ilf=?tz=ES *ám" JL&f:a '**", m ES 8mt}tti!JrÕ o -® :iimɷ:iJ!!ÜE l&*MX.f #tfPrtro ftl:tm:1-tBfniiJn9*}J,tɸ!ExlESiAHio ;ft{itXi:iJi9*áJE-#tf!m,ɹɺ11Ml1ESɻ Jl;'âffl 'f.lllɼffi ,fJj. ɽ ".&ã 0 B) X1**--ɾ!]fµJ!tJtt1fftlJE;f*iJ?.Ml%<ɿʀ#li:äo 93;f:liʁʂ. X.f *Aʃ7f±*81!1ti:ä,Ù 0 :ctft¥1JJL~al'I9Sm"ßxt *A , ITTJ.fi*ʄrr11B1n ES*MttrR8r*Jmʅnfiil O fl=0if Jl ;et*M:trnMiWWJ&f:ʆXtEP!±mt*ESifx1t,J.l *'!lt{f}ftitiliT @:XW.ʇo C) t-Effit'I9Ý:ftStffq:t ,!fʈ®t-£:k ffiflj.âffltf:tmt}".&ãffif*i9%mtJL&f:a 8ES "jc"i:[f;j9ʉ!fif .!?Ja8,:1-Hʊʋ:mif!=o -J-JiifJlf,!;7.Yl!f ,ʌ$-4;%ʍ-q:r 8ES ,JtX,jʎ:1:tMʏtffra(Jå -=--=-.::..:::..=:::...::.==-::. ltl!J!ÞESÚA:iJ!!Tfʐff .. aB@ .. ʑiʒJf.&ʓffiJt{it:1:fffiESmt*0ʔ litffES 0 D) JL~Umt}"TESFR JltæPffl ES"  :m ¥1JM I fl= ESfJ9jJ O 'i::;iE*æ Pffl{iB{fJ $ç ffl ESfflOC 0 è RA&f:a3t¥1JJL&paff.f ,M{rJ!Jdʕ Ti,f$ffi7-fs:iiJltlʖ>Jt1DlfESIDJ:tio -!Jn'fi-MJL~U ʗESiffxzy,JL·U tf:t1ii 50%ES:timR-7 JJ ¥1Jr7 A gltzT{fu, *OO:tiiE1¥t-£EVI l'I9 "ÒJE'i1: 0 . ImU 2021 6 Jj 18 E) Jlt7R,#'(}'i:p-!.f)Ji1it A-i:p1W~:llE!!1Jn!iAB1J!.f1Jtz-o #'AVJ.iAjg,-#f8¥ ʋ ,iEʌ*ãEB[l1]at ,ʍJ.Vtfj:B1Jlf** i:rWTT O .tlt7R, *AämtArlfli1*1W~!lfEmf!tJa9cmʎiEʏ m O tft3'f.`,
 questions: [
 { id: '2021-06-S1-Q22', question: 'Why do a lot of people come to the village of Takotna every March?', options: ['A) It is the best time for sightseeing.', 'B) A race passes through it annually.', 'C) They come to clean the Iditarod Trail.', 'D) It is when the villagers choose a queen.'], answer: 'B' },
 { id: '2021-06-S1-Q23', question: 'What is the village of Takotna famous for?', options: ['A) Its children\'s baking skills.', 'B) Its unique winter scenery.', 'C) Its tasty fruit pies.', 'D) Its great food variety.'], answer: 'C' },
 { id: '2021-06-S1-Q24', question: 'Who comes to help with the event of the year?', options: ['A) The contestants.', 'B) The entire village.', 'C) Jan Newton and her friends.', 'D) People from the state of Idaho.'], answer: 'B' },
 { id: '2021-06-S1-Q25', question: 'What does the passage say about Jan Newton?', options: ['A) She owned a restaurant in Idaho.', 'B) She married her husband in 1972.', 'C) She went to Alaska to compete in a race.', 'D) She helped the village to become famous.'], answer: 'D' },
 ],
 },

 // ================================================================
 // 2025年6月 第1套 (选项来自PDF精确提取；答案已验证)
 // ================================================================
 {
 id: '2025-06-S1-SecA-1', year: 2025, month: 6, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2025, 6, 1, 41),
 transcript: `Everything changed for 7-year-old Tariq when he slapped some butter on an ear of corn. He knew it tasted good, but butter made it better. His passion for produce got him a position as South Dakota's official Corn Ambassador. Tariq's profession of love for his favorite vegetable earned him the name "the Corn Kid". This was after his online interview attracted millions of views and was made into a song. South Dakota is one of the top corn producers in America. The corn provides nourishment across the globe. Tariq said, "Not everyone has to like corn, but everyone should definitely try it, especially with butter." Tariq and his family were invited to South Dakota to attend the honorary ceremony at the state's Corn Palace. Officials wanted to highlight South Dakota's two largest industries: tourism and agriculture. Tariq couldn't believe his eyes when he saw the palace made of corn.`,
 questions: [
 { id: '2025-06-S1-Q1', question: 'How did the family make their corn taste better?', options: ['A) By slapping some butter on it.', 'B) By enhancing its nourishment.', 'C) By growing it in South Dakota.', 'D) By cooking it in vegetable oil.'], answer: 'A' },
 { id: '2025-06-S1-Q2', question: 'Why did the family go to Mitchell?', options: ['A) To introduce their corn to tourists.', 'B) To attend an honorary ceremony.', 'C) To share experience with other corn growers.', 'D) To exhibit their corn at the state\'s Corn Palace.'], answer: 'B' },
 ],
 },
 {
 id: '2025-06-S1-SecA-2', year: 2025, month: 6, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2025, 6, 1, 160),
 transcript: `Two arrests were announced Thursday. The arrests were in connection with a string of mail thefts from U.S. Postal Service's collection boxes in Marion County and for the possession of a stolen postal key, according to the Department of Justice.
Jordan Jax and Tarod Goodman, both 23, were arrested after evidence gathered in an investigation showed the pair stole mail on multiple occasions using a postal key, according to a news release.
Jax and Goodman stole mail for around four months. Investigators reviewed videos of the collection boxes; the video showed the two men loading the stolen mail into Jax's vehicle. Investigators were also able to recover the key that was used to open the collection boxes.
Jax and Goodman each face up to five years in federal prison in the mail thefts and up to ten years for possession of the postal key.`,
 questions: [
 { id: '2025-06-S1-Q3', question: 'What crime did the suspects commit?', options: ['A) Stole mail several times.', 'B) Forged postal keys illegally.', 'C) Attacked postmen on multiple occasions.', 'D) Broke a number of postal collection boxes.'], answer: 'A' },
 { id: '2025-06-S1-Q4', question: 'What punishment could the suspects face?', options: ['A) A sentence for life.', 'B) Loss of all their possessions.', 'C) Twenty-three years\' hard labor.', 'D) Up to fifteen years in prison.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S1-SecA-3', year: 2025, month: 6, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2025, 6, 1, 270),
 transcript: `Can fast-fashion be sustainable? Researchers think yes. Identifying why the fast-fashion business model creates waste and determining whether regulators can establish incentives for consumers and manufacturers are steps to reduce waste.
Recently, the clothing industry has come under attack for creating a waste problem with serious environmental consequences. In the absence of environmentally and economically feasible recycling options, fast-fashion manufacturers pump out low-quality clothes produced in high volumes that are worn only a few times and then discarded.
The researchers put forth policy contributions, ranging from sustainable disposal of leftover stock to production tax to incentivize both manufacturers and consumers to be more waste conscious.
In order to devise effective policies to curb the environmental impact of the clothing industry, it is important to identify the source of the problem in the supply chain. Manufacturers, consumers, and regulatory bodies can then take an informed approach to recognize the environmental impact of fast-fashion and to design an ecosystem to reduce waste, incentivize innovation, and create new business models to manage waste.`,
 questions: [
 { id: '2025-06-S1-Q5', question: 'What is the problem with fast fashion according to the news report?', options: ['A) It escapes regulation and misleads consumers.', 'B) It ignores economically feasible recycling options.', 'C) It creates waste and severely impacts the environment.', 'D) It produces clothes affordable only to a tiny minority.'], answer: 'C' },
 { id: '2025-06-S1-Q6', question: 'What is the purpose of the proposed bill?', options: ['A) To cut consumers\' expenses in buying quality clothes.', 'B) To enable the whole fast-fashion industry to be sustainable.', 'C) To incentivize manufacturers to be more consumer-friendly.', 'D) To urge manufacturers and consumers to reduce waste.'], answer: 'D' },
 { id: '2025-06-S1-Q7', question: 'What is the first step in solving the fast-fashion problem?', options: ['A) Recognizing the impact on consumers.', 'B) Identifying the source of the problem.', 'C) Abandoning the current business model.', 'D) Establishing powerful regulatory bodies.'], answer: 'B' },
 ],
 },
 {
 id: '2025-06-S1-SecB-1', year: 2025, month: 6, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2025, 6, 1, 462),
 transcript: `M: Hey Mary, you seem to be very much annoyed. What happened?
W: Rush hour in this city is killing me.
M: Ah, yes. Rush hour is terrible, especially in the morning between 8 and 9. But what else can you expect in a city this big?
W: Well, I think the local government could help improve things. I mean, getting rid of rush hour may be impossible, but it could be made more tolerable, don't you think?
M: Um... but I'm not sure how.
W: Well, for example, the subway system could have air conditioning. I know many cities in the world have air conditioning in their subway, so why can't we? It gets so hot in the summer. I can hardly breathe down there. And add to that the rush-hour crowds with strangers packed close together in the subway carriages, the whole thing is just horrible.
M: Ah, yes, you are completely right. The trains here are too old. The government should definitely invest in new ones with air conditioning. I guess I'm fortunate I take the bus instead.
W: Oh, that's much better.
M: Yeah, it's more convenient. Bus No. 36 goes straight from my house to the office. It's a 30-minute ride and I don't have to make any changes.
W: That sounds nice. I tell you, my current commute is killing me. Maybe I should move closer to the office.
M: Well, I know a great housing agent. I found the flat I'm living in now through him. And I love it.
W: Hmm, could you send me his number, please?
M: Sure thing. Just tell him exactly what you are looking for and I'm sure he will find something good.`,
 questions: [
 { id: '2025-06-S1-Q8', question: 'What does the woman complain about?', options: ['A) The city\'s rush-hour traffic is intolerable.', 'B) She cannot avoid rush-hour traffic.', 'C) The local government is inefficient.', 'D) The city is too big to move around easily.'], answer: 'A' },
 { id: '2025-06-S1-Q9', question: 'What suggestion does the woman make?', options: ['A) Upgrading subway carriages.', 'B) Increasing the number of bus routes.', 'C) Air conditioning the city\'s subway.', 'D) Learning from other big cities.'], answer: 'C' },
 { id: '2025-06-S1-Q10', question: 'What do we learn about the man?', options: ['A) He suffers from rush-hour crowding too.', 'B) He is fortunate to live very near to work.', 'C) He takes a half-hour bus ride to work.', 'D) He is going to move closer to his office.'], answer: 'C' },
 { id: '2025-06-S1-Q11', question: 'What does the woman ask the man to do?', options: ['A) Recommend to her a good house near his office.', 'B) Send her his housing agent\'s telephone number.', 'C) Tell her exactly what kind of property to look for.', 'D) Make sure the agent finds something good for her.'], answer: 'B' },
 ],
 },
 {
 id: '2025-06-S1-SecB-2', year: 2025, month: 6, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2025, 6, 1, 649),
 transcript: `M: Did you hear about Johnny?
W: No. Why? Is he okay?
M: He had some plastic surgery done.
W: What? Why?
M: Do you remember he had a scar on his face?
W: Yes, of course. He always had that. I've known him since primary school, and I always remember him having that on his cheek.
M: Well, he had it fixed.
W: Fixed? What do you mean? You can't fix a scar.
M: You know what I mean? He had an operation done on it, plastic surgery, in order to cover it and make it less noticeable.
W: Oh, well, that's ridiculous, isn't it? It was noticeable, sure. But it wasn't an ugly scar. It never occurred to me that he should have it taken care of like that.
M: I agree. I can understand some scars and physical defects can be ugly and distracting, but not Johnny's. In fact, I thought it added character... like it gave him a certain uniqueness.
W: He must have felt differently though. He must have felt self-conscious and insecure, perhaps.
M: No, no, that's not the reason. He was totally fine with his scar. As you said, he had had it for most of his life.
W: Then why did he have the operation?
M: Because his girlfriend wanted him to.
W: What? That's so superficial and selfish of her. If Johnny's girlfriend doesn't like him for who he is, then she does not deserve to be his girlfriend.
M: You are right. So he is insane to give in to her like that. But when I told him, he said he loves her and would just do what she wants him to.
W: What a fool he is.`,
 questions: [
 { id: '2025-06-S1-Q12', question: 'What do we learn about Johnny?', options: ['A) He was remembered for the scar on his cheek.', 'B) He received a heart operation a few days ago.', 'C) He used to wear a sad face in school.', 'D) He had some plastic surgery done.'], answer: 'D' },
 { id: '2025-06-S1-Q13', question: 'What confused the woman?', options: ['A) The man\'s deep sympathy for Johnny.', 'B) The man\'s use of the expression "fixed".', 'C) The man\'s covering up of what happened.', 'D) The man\'s good memory of his childhood.'], answer: 'B' },
 { id: '2025-06-S1-Q14', question: 'What did the woman think of the scar on Johnny\'s face?', options: ['A) It gave him a noticeable smartness.', 'B) It made him appear even more manly.', 'C) It seemed to give him a certain uniqueness.', 'D) It seemed to make up for his physical defects.'], answer: 'C' },
 { id: '2025-06-S1-Q15', question: 'How did the woman feel about Johnny\'s girlfriend?', options: ['A) Liberal.', 'B) Hostile.', 'C) Indifferent.', 'D) Critical.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S1-SecC-1', year: 2025, month: 6, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2025, 6, 1, 863),
 transcript: `Talking is unique to humans. An animal might make 10 different sounds, but an adult human knows more than 20,000 words. Additionally, we're the only animal that expresses thoughts in full sentences. Researchers don't think language was invented; instead, they think it evolved. How did talking evolve? There are two main theories.
The first theory is that language started with people making different sounds, mostly imitating the things around them, like animal calls, nature sounds, and the sounds of tools. Perhaps they made the sound of wind to comment on the weather or imitated the sound of a bird to tell a friend that there was a bird nearby. Then over hundreds of thousands of years, those sounds turned into words that people began to learn as part of their language. At some point, people started stringing the words together to form sentences.
The other main theory, which is more recent, is that people started off by gesturing—pointing at things with their hands and imitating actions using their bodies. Eventually these gestures turned into a full sign language. This theory guesses that after developing sign languages, people eventually started making sounds along with their gestures. At some point, they switched to mostly making sounds that became words instead of just using their bodies. The reason they switched to making sounds, the theory goes, is that talking out loud lets you communicate with someone even when you can't see them.`,
 questions: [
 { id: '2025-06-S1-Q16', question: 'How did spoken language come about according to the passage?', options: ['A) Through deliberation.', 'B) Through evolution.', 'C) Through invention.', 'D) Through collaboration.'], answer: 'B' },
 { id: '2025-06-S1-Q17', question: 'How did spoken language begin?', options: ['A) With people imitating sounds around them.', 'B) With people interacting with animals close by.', 'C) With people showing each other things nearby.', 'D) With people trying to string sounds together.'], answer: 'A' },
 { id: '2025-06-S1-Q18', question: 'What advantage does spoken language have?', options: ['A) Making sounds can free one\'s hands for doing other things.', 'B) Making sounds proves markedly easier than sign languages.', 'C) Making sounds enables one to express their ideas more explicitly.', 'D) Making sounds helps one communicate with people they can\'t see.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S1-SecC-2', year: 2025, month: 6, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2025, 6, 1, 1037),
 transcript: `Is it a good idea to display luxury brands and other signals of status? It depends on the situation. Studies have shown that people who appear to be wealthy tend to be considered more intelligent, disciplined, and competent than those who do not. But new research found that people believe someone who shows off their social status cares more about benefiting themselves than helping others. This means people are less willing to collaborate with them. Modesty may be key when cooperation is essential, but the researchers also found that in some cases, status signaling has advantages.

Experiments showed that participants were less likely to choose someone who signals their wealth or status to join a group seeking cooperative members. But participants were more likely to choose that person when they're looking for a competitive team member. These findings suggest that people should change how they present themselves depending on their social goal.

This is the era of social media. People can easily share their wealth and status to large audiences, but they need to consider the consequences. Posting about luxury purchases and expensive vacations online may help you to persuade others and frighten competitors, but it could also signal to potential friends or future employers that you are unlikely to think about the needs of others. This makes things tricky for people who may want to impress others while also demonstrating that they are a team player.`,
 questions: [
 { id: '2025-06-S1-Q19', question: 'How are people who display social status perceived according to the passage?', options: ['A) Well disciplined.', 'B) Quite confident.', 'C) Somewhat selfish.', 'D) Highly intelligent.'], answer: 'C' },
 { id: '2025-06-S1-Q20', question: 'When did people prefer to team up with someone who displayed social status?', options: ['A) When they wanted to have a competitive team member.', 'B) When they were looking for a cooperative workmate.', 'C) When they found collaboration essential to them.', 'D) When they were seeking someone to help them.'], answer: 'A' },
 { id: '2025-06-S1-Q21', question: 'What advice does the speaker give about sharing wealth on social media?', options: ['A) Avoid frightening competitors.', 'B) Make clear their social goal.', 'C) Adopt persuasive strategies.', 'D) Consider the consequences.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S1-SecC-3', year: 2025, month: 6, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2025, 6, 1, 1215),
 transcript: `Human fascination with animals goes back as far as humans do. Of the oldest cave paintings discovered, some are up to 40,000 years old, and there are more images of animals than humans. At some point, humans began to capture and hold animals.
The first-known collections were held by royalty and were not open to the public. In Egypt, researchers have found buildings from around 3500 B.C., containing the remains of animals, including elephants, which were not native to Egypt. But life wasn't easy for these animals. They probably had short lives, and their remains show evidence of severe injuries.
The first public exhibit of animals may have been created by Egypt's Queen Hatshepsut around 1480 B.C. Researchers think the zoo was started with animals brought home from a far-off land known as Punt. It's unclear why the Queen built the zoo, but it might have been to show off her wealth and power.
Early zoos are found all over the world. In China, Emperor Wenwang is said to have built a "Garden of Intelligence" around 1060 B.C. It included deer, birds, and many fish. In England, King Henry I set up a collection of animals in about 1110 as part of the royal estate. His collection included tigers and lions. This collection eventually moved to the Tower of London in 1235. The collection stayed at that location for 600 years.`,
 questions: [
 { id: '2025-06-S1-Q22', question: 'What did ancient cave paintings show?', options: ['A) Much evidence of humans capturing animals.', 'B) More images of animals than humans.', 'C) Fewer images of buildings than animals.', 'D) Little proof of human fascination with animals.'], answer: 'B' },
 { id: '2025-06-S1-Q23', question: 'What do we learn about the earliest animal collections?', options: ['A) They were open to the public.', 'B) They were primarily native.', 'C) They were kept by royalty.', 'D) They were hardly injured.'], answer: 'C' },
 { id: '2025-06-S1-Q24', question: 'Why did the Egyptian queen Hatshepsut create a zoo?', options: ['A) To enable the public to watch animals close by.', 'B) To introduce to Egyptians animals from Punt.', 'C) To protect the endangered animals.', 'D) To show off her riches and power.'], answer: 'D' },
 { id: '2025-06-S1-Q25', question: 'What do we learn about Hatshepsut\'s zoo?', options: ['A) It was part of the royal estate.', 'B) It was a shelter for wild animals.', 'C) It was the kingdom\'s best-equipped zoo.', 'D) It was the first public exhibit of animals.'], answer: 'A' },
 ],
 },


 // ================================================================
 // 2025年6月 第2套 (选项来自PDF精确提取；答案已验证)
 // ================================================================
 {
 id: '2025-06-S2-SecA-1', year: 2025, month: 6, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2025, 6, 2, 41),
 transcript: `A Florida teenager and an Atlanta woman won the overall men's and women's divisions Saturday at the annual 7 Mile Bridge Run. Vaclav Bursa, 15, of Big Pine Key, Florida, finished first overall. He completed the race in 41 minutes and 1 second and claimed the top spot in the men's division. Bursa won third place in the 2022 race. He is a student at Marathon High School. Joanna Stephens, 28, of Atlanta, completed the course in 41 minutes and 12 seconds. She won the women's division title and placed second overall. The race drew competitors from 41 US states. There were also runners from other countries, including Canada, the UK and Switzerland. The run closed the span between the Middle and Lower Keys to traffic for 3 hours Saturday. The April contest is one of the most popular running events in the southeastern United States. The race field filled within minutes after online registration opened in January.`,
 questions: [
 { id: '2025-06-S2-Q1', question: 'What do we learn about the two teenagers from the news report?', options: ['A) They are young teenagers from Atlanta.', 'B) They won this year\'s 7 Mile Bridge Run.', 'C) They completed the race in less than 40 minutes.', 'D) They are both students at Marathon High School.'], answer: 'B' },
 { id: '2025-06-S2-Q2', question: 'What does the news report say about the 7 Mile Bridge Run?', options: ['A) It drew competitors from more than 40 countries.', 'B) It is watched live online by fans all over the world.', 'C) It closed the city of Big Pine Key to traffic for three hours.', 'D) It is one of the most popular running events in the southeastern U.S.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S2-SecA-2', year: 2025, month: 6, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2025, 6, 2, 169),
 transcript: `British astronaut Tim Peake is stepping down permanently from his role as a European astronaut. He's going to take up a full-time position as ambassador for science and space instead -- work he's been doing since 2019. The former British Army Air Corps helicopter pilot was selected as a European Space Agency astronaut in 2009. He flew to the space station for a 6-month tour in 2015. The tour saw him control a robot on earth remotely from orbit. He also helped dock two spacecraft. Tim said, "Being an astronaut has been the most extraordinary experience. I've had the privilege of working with an exceptional team of individuals during the past 13 years with the agency. It has been incredibly exciting and rewarding. By assuming the role of an ambassador for human flights to space, I'll continue to support the European and the UK space agencies."`,
 questions: [
 { id: '2025-06-S2-Q3', question: 'What do we learn about Tim Peake before he became an astronaut?', options: ['A) He was once a full-time ambassador.', 'B) He was soon to retire from the army.', 'C) He became an astronaut in 2015.', 'D) He used to be a helicopter pilot.'], answer: 'D' },
 { id: '2025-06-S2-Q4', question: 'What does Tim Peake say about his career as an astronaut?', options: ['A) It has been unbelievably exciting and rewarding.', 'B) It has been extraordinarily tough and demanding.', 'C) It has contributed a great deal to human flights to space.', 'D) It has given him exceptional privilege as an ambassador.'], answer: 'A' },
 ],
 },
 {
 id: '2025-06-S2-SecA-3', year: 2025, month: 6, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2025, 6, 2, 286),
 transcript: `An Asda store in Wales is now home to five cats after they wandered in and made themselves comfortable. The supermarket is known for its loyal customers, but now has a different kind of visitor that has appeared over the last year. Regular shoppers at the supermarket are familiar with the sight of several cats settling down in the shop aisles. The unusual situation started about 12 months ago, when one cat routinely started visiting the store. Local newspapers reported that puzzled customers posted on Facebook groups to try to find out if the cat was lost. But its owner assured the concerned customers it was very much loved and fed at home. It just enjoyed visiting the shop. Staff did their best to discourage the pet from hanging around. But instead of leaving and never coming back, it invited its friends round. There are now at least five different cats who come almost on a daily basis. They visit the store so much that staff have been forced to put up signs, asking their customers not to feed them.`,
 questions: [
 { id: '2025-06-S2-Q5', question: 'What do we learn about the cats from the news report?', options: ['A) They are known for their loyalty to their owners.', 'B) They are brought in by the store\'s customers.', 'C) They are regular visitors to the store.', 'D) They are pets kept by the store staff.'], answer: 'C' },
 { id: '2025-06-S2-Q6', question: 'What does the store manager say about the black cat?', options: ['A) It might be a nuisance to the loyal shoppers.', 'B) It might have been abandoned by its owner.', 'C) It might be 12 months old.', 'D) It might have got lost.'], answer: 'D' },
 { id: '2025-06-S2-Q7', question: 'What does the store warn customers not to do?', options: ['A) Feed the cats.', 'B) Remove any store signs.', 'C) Sit in the shop aisles.', 'D) Bring in pets with them.'], answer: 'A' },
 ],
 },
 {
 id: '2025-06-S2-SecB-1', year: 2025, month: 6, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2025, 6, 2, 468),
 transcript: `W: I've been thinking about moving off campus next semester.
M: Hmm... I don't know if that's a good idea as your mother and I would worry about you living all by yourself in an apartment so far from home. And then there's the expense, too. I'm not sure we can afford it.
W: Well, I wouldn't be alone, actually. Three of my friends from the dormitory would share the place with me. And with four of us, it wouldn't cost any more than living in the dorm.
M: Are you sure about that? Rents in big cities are high, and then there's the cost of electricity and gas. Have you factored those in?
W: We've budgeted for those, and for Internet and transportation. And if we move far enough from the city center, the rent is low enough for us to afford all of it.
M: What's about the commute to and from campus? It sounds like you'll be wasting several hours every day on the road instead of studying.
W: It's about an hour to campus, but there's no reason I can't study on the bus. After all, I did that during high school and my commute was even longer then.
M: That's true. But I'm not sure why you want to leave campus and go through all that trouble when the cost is the same.
W: For a lot of reasons. We'd have a kitchen, so we could cook ourselves. And we'd each have our own bedroom, where we could study instead of going to the library. We just have more space and privacy.
M: I'm not convinced that the benefits are greater than the disadvantages, but I'll discuss this with your mother.`,
 questions: [
 { id: '2025-06-S2-Q8', question: 'What is the woman considering?', options: ['A) Sharing her room with friends.', 'B) Cutting down her living expenses.', 'C) Living off campus.', 'D) Moving to the city center.'], answer: 'C' },
 { id: '2025-06-S2-Q9', question: 'What is the woman concerned about?', options: ['A) The facilities available.', 'B) Various costs involved.', 'C) Changes in living conditions.', 'D) The distance to her home.'], answer: 'B' },
 { id: '2025-06-S2-Q10', question: 'What did the man do during his college years?', options: ['A) Went through much trouble.', 'B) Commuted to save money.', 'C) Studied on the bus.', 'D) Lived on campus.'], answer: 'C' },
 { id: '2025-06-S2-Q11', question: 'What is the man going to do next?', options: ['A) Discuss the matter with the woman\'s mother.', 'B) Make a decision within a few days.', 'C) Try his best to persuade his wife.', 'D) Weigh the benefits against the disadvantages.'], answer: 'A' },
 ],
 },
 {
 id: '2025-06-S2-SecB-2', year: 2025, month: 6, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2025, 6, 2, 652),
 transcript: `W: Good morning. I'm looking for a present for my nephew, Lawrence.
M: Hi. Do you have anything in mind?
W: I'm not sure. No. Do you know what boys aged around ten typically like?
M: For that age group, our biggest seller this year has been this action figure. It's called Bobo Man, and it's incredibly popular.
W: Does it do anything?
M: Not by itself. It has no batteries, if that's what you mean. There's a Bobo Man cartoon popular amongst young children, you see. And this toy is the lead character from the show.
W: Oh, I understand now. I've never heard of it, but I do know little Lawrence loves cartoons. Do you have any other popular toys? Perhaps something educational.
M: Yes, of course. Right over here, we have dozens of puzzles for children of all ages. They are fun, great for exercising the mind and can be played either alone or in groups.
W: I like this sort of idea. Lawrence has a sister who is slightly older, so maybe a game that they can play together would be good.
M: What do you think of Battleships, then? It's a total classic. It has been around since the 1930s.
W: Oh, yeah. We had one of those when growing up.
M: Of course you did. Everyone did. And kids enjoy it just as much today as you and I did when we were young. Some games just never get old.
W: I suppose you are right. I have fond memories playing Battleships when it was raining outside and we had to stay indoors. That's decided then. How much?
M: 19 pounds and 90 pence, please.
W: There you are. Have a nice day.
M: Thank you. You too.`,
 questions: [
 { id: '2025-06-S2-Q12', question: 'What is the woman doing?', options: ['A) Interviewing the man.', 'B) Looking for Lawrence.', 'C) Choosing a present for her nephew.', 'D) Helping the man with his shopping.'], answer: 'C' },
 { id: '2025-06-S2-Q13', question: 'What does the man say about the new electronic game?', options: ['A) Quite educational.', 'B) Incredibly popular.', 'C) Driven by batteries.', 'D) Obviously childish.'], answer: 'B' },
 { id: '2025-06-S2-Q14', question: 'What kind of toy does the woman want?', options: ['A) One he loves for helping exercise his mind.', 'B) One he can play together with his sister.', 'C) One he finds interesting and challenging.', 'D) One he can play either alone or in a group.'], answer: 'B' },
 { id: '2025-06-S2-Q15', question: 'What does the man say about his recommended game?', options: ['A) It has been enjoyed by kids for decades.', 'B) It always reminds people of times of war.', 'C) It has been played both indoors and outdoors.', 'D) It distinguishes itself as one of the oldest games.'], answer: 'A' },
 ],
 },
 {
 id: '2025-06-S2-SecC-1', year: 2025, month: 6, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2025, 6, 2, 880),
 transcript: `We assume that if we offer our customers more choices, then they'll be more likely to buy our products. But here's the paradox of choice: if a person is presented with too many choices, they are actually less likely to buy. In 2012, psychologists published a study about jams. On a regular day at a local food market, people would find a display table with 24 different kinds of jams. Then on another day, at that same food market, people were given only 6 different types of jam choices. Guess which display table led to more sales?

The study found that while the bigger display table created more interest, people were almost 10 times less likely to purchase a jar of jam than in the case of the smaller display. Customer satisfaction takes a hit as well. In the study, the bigger display of jams leads to lower customer satisfaction than the smaller display. In an extensive study published in 2015, researchers analyzed a total of 99 choice studies and specifically looked at those cases in which reducing choices helped to boost sales. They found four rules that motivate consumers to buy: when people want to make a quick and easy choice, when the product is complex, when it's difficult to compare alternatives, and when consumers don't have clear preferences. So as you can see, when it comes to choices, less is more.`,
 questions: [
 { id: '2025-06-S2-Q16', question: 'What does the jam study show?', options: ['A) A display of a variety of products increases consumers\' interest.', 'B) Too many choices decrease one\'s desire to buy.', 'C) Fewer choices lead to lower customer satisfaction.', 'D) Customers given more choices are more likely to get confused.'], answer: 'B' },
 { id: '2025-06-S2-Q17', question: 'What did the second study focus on?', options: ['A) What kind of display results in more sales.', 'B) What kind of display creates more interest.', 'C) What kind of display attracts a greater crowd of customers.', 'D) What kind of display leads to greater customer satisfaction.'], answer: 'D' },
 { id: '2025-06-S2-Q18', question: 'What conclusion did the researchers reach?', options: ['A) There are situations where customers buy nothing.', 'B) There are tricks to increase customer satisfaction.', 'C) There are ways to predict customer preferences.', 'D) There are rules that motivate customers to buy.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S2-SecC-2', year: 2025, month: 6, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2025, 6, 2, 1052),
 transcript: `The New Year has come and gone, and many may have already forgotten what they had resolved to do on January 1st. But if that resolution was to volunteer more, now is the best time to start. Volunteering can drop after the holiday season, and by February, some organizations lack the volunteers they had in surplus just a month ago. According to one survey, only 26% of Americans volunteered, despite reports that many Americans view volunteering as worthwhile.

Why such a disconnect? Most people cite time and conflicting work schedules as major barriers, but employees and employers would actually benefit if companies made employee volunteering part of the job. Researchers have found donating our time and talent to others can lower blood pressure, boost happiness and improve mental and physical health. Studies have also linked employee volunteer programs with more productive employees. With so much emphasis on employee wellness these days, company volunteer programs could be the perfect 2025 resolution. But for volunteering to benefit employees and the workplace, the entire organization needs to be involved. By allowing employees to donate their time during work hours, the workplace becomes an outlet for personal fulfillment without affecting personal time. In one survey, 89% of employees perceived companies that sponsored volunteer activities as creating a better working environment, and 75% said volunteering was critical to their well-being.`,
 questions: [
 { id: '2025-06-S2-Q19', question: 'How did the volunteers describe their experience?', options: ['A) Stressful.', 'B) Burdensome.', 'C) Worthwhile.', 'D) Energy-boosting.'], answer: 'C' },
 { id: '2025-06-S2-Q20', question: 'How did the researchers encourage volunteering?', options: ['A) By linking it with employees\' salary.', 'B) By taking it as the New Year resolution.', 'C) By improving work schedules.', 'D) By making it part of the job.'], answer: 'D' },
 { id: '2025-06-S2-Q21', question: 'What did the volunteers find after the experiment?', options: ['A) It was very important to their well-being.', 'B) It had taken little of their spare time.', 'C) It was an outlet for their personal fulfillment.', 'D) It helped improve their working environment.'], answer: 'A' },
 ],
 },
 {
 id: '2025-06-S2-SecC-3', year: 2025, month: 6, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2025, 6, 2, 1235),
 transcript: `The vast majority of the UK's 200,000 tonnes of retail sectors annual food waste comes from supermarkets. But it's a problem that impacts independent luxury food suppliers too. The scale is small. It's estimated at less than one per cent of the UK's food waste total. But the quality from these suppliers is high. Everything from specialist cheeses to sought-after coffee beans gets thrown away every day in the current food system.

This is where French entrepreneur Sophie Andre comes in. In 2016 she moved to London and began by setting up a business delivering luxury hand-made food across the city. "Food delivery seems to be a big thing here," She says. "So I started delivering products by bicycle. Talking with local producers I learned that a small part of the production is sometimes wasted due to problems with size or shape, but the quality of the products remains unchanged." Unlike many food waste projects that have sprung up in recent years, the idea is not simply to redistribute waste food, but to provide a high-quality product. Andre's company Elysia offers breakfasts and snacks specifically aimed at business meetings and events. Once sourced, Elysia uses waste products to create "simple, natural, straightforward" meals and snacks. Perhaps unlike other waste food, the supply is regular. Suppliers will always have a certain amount of surplus. So the menus remain regular too. Andre believes this benefits both her business and her customers.`,
 questions: [
 { id: '2025-06-S2-Q22', question: 'What does the passage say about food waste in the UK?', options: ['A) It amounts to 2,000 tons daily.', 'B) It mostly comes from supermarkets.', 'C) It is estimated at 11% of the UK\'s total food supply.', 'D) It has a lot to do with independent luxury food suppliers.'], answer: 'B' },
 { id: '2025-06-S2-Q23', question: 'What does the company mentioned in the passage do?', options: ['A) It rents bicycles to deliver food.', 'B) It sells sought-after coffee beans.', 'C) It delivers luxury hand-made food.', 'D) It recycles waste food from the city.'], answer: 'C' },
 { id: '2025-06-S2-Q24', question: 'What is special about the company?', options: ['A) It pays special attention to the size and shape of its products.', 'B) It tries to escape the constraints of the current food system.', 'C) It cooperates closely with local producers.', 'D) It aims to provide high-quality products.'], answer: 'D' },
 { id: '2025-06-S2-Q25', question: 'Why does the company change its menu daily?', options: ['A) To ensure a regular supply.', 'B) To maintain a unique menu.', 'C) To make up for the waste products.', 'D) To meet customers\' urgent demand.'], answer: 'A' },
 ],
 },


 // 注：2021年6月第3套听力与第1套相同（全国仅考2套听力），选项顺序可能不同

 
 // ================================================================
// 2025年6月 第3套（共用第1套听力）
 // ================================================================
 {
 id: '2025-06-S3-SecA-1', year: 2025, month: 6, setNumber: 3,
 label: 'Section A — News Report 1 (Q1-2)',...aud(2025, 6, 1, 41),
 transcript: `Everything changed for 7-year-old Tariq when he slapped some butter on an ear of corn. He knew it tasted good, but butter made it better. His passion for produce got him a position as South Dakota's official Corn Ambassador. Tariq's profession of love for his favorite vegetable earned him the name "the Corn Kid". This was after his online interview attracted millions of views and was made into a song. South Dakota is one of the top corn producers in America. The corn provides nourishment across the globe. Tariq said, "Not everyone has to like corn, but everyone should definitely try it, especially with butter." Tariq and his family were invited to South Dakota to attend the honorary ceremony at the state's Corn Palace. Officials wanted to highlight South Dakota's two largest industries: tourism and agriculture. Tariq couldn't believe his eyes when he saw the palace made of corn.`,
 questions: [
 { id: '2025-06-S3-Q1', question: 'How did the family make their corn taste better?', options: ['A) By slapping some butter on it.', 'B) By enhancing its nourishment.', 'C) By growing it in South Dakota.', 'D) By cooking it in vegetable oil.'], answer: 'A' },
 { id: '2025-06-S3-Q2', question: 'Why did the family go to Mitchell?', options: ['A) To introduce their corn to tourists.', 'B) To attend an honorary ceremony.', 'C) To share experience with other corn growers.', 'D) To exhibit their corn at the state\'s Corn Palace.'], answer: 'B' },
 ],
 },
 {
 id: '2025-06-S3-SecA-2', year: 2025, month: 6, setNumber: 3,
 label: 'Section A — News Report 2 (Q3-4)',...aud(2025, 6, 1, 160),
 transcript: `Two arrests were announced Thursday. The arrests were in connection with a string of mail thefts from U.S. Postal Service's collection boxes in Marion County and for the possession of a stolen postal key, according to the Department of Justice.
Jordan Jax and Tarod Goodman, both 23, were arrested after evidence gathered in an investigation showed the pair stole mail on multiple occasions using a postal key, according to a news release.
Jax and Goodman stole mail for around four months. Investigators reviewed videos of the collection boxes; the video showed the two men loading the stolen mail into Jax's vehicle. Investigators were also able to recover the key that was used to open the collection boxes.
Jax and Goodman each face up to five years in federal prison in the mail thefts and up to ten years for possession of the postal key.`,
 questions: [
 { id: '2025-06-S3-Q3', question: 'What crime did the suspects commit?', options: ['A) Stole mail several times.', 'B) Forged postal keys illegally.', 'C) Attacked postmen on multiple occasions.', 'D) Broke a number of postal collection boxes.'], answer: 'A' },
 { id: '2025-06-S3-Q4', question: 'What punishment could the suspects face?', options: ['A) A sentence for life.', 'B) Loss of all their possessions.', 'C) Twenty-three years\' hard labor.', 'D) Up to fifteen years in prison.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S3-SecA-3', year: 2025, month: 6, setNumber: 3,
 label: 'Section A — News Report 3 (Q5-7)',...aud(2025, 6, 1, 270),
 transcript: `Can fast-fashion be sustainable? Researchers think yes. Identifying why the fast-fashion business model creates waste and determining whether regulators can establish incentives for consumers and manufacturers are steps to reduce waste.
Recently, the clothing industry has come under attack for creating a waste problem with serious environmental consequences. In the absence of environmentally and economically feasible recycling options, fast-fashion manufacturers pump out low-quality clothes produced in high volumes that are worn only a few times and then discarded.
The researchers put forth policy contributions, ranging from sustainable disposal of leftover stock to production tax to incentivize both manufacturers and consumers to be more waste conscious.
In order to devise effective policies to curb the environmental impact of the clothing industry, it is important to identify the source of the problem in the supply chain. Manufacturers, consumers, and regulatory bodies can then take an informed approach to recognize the environmental impact of fast-fashion and to design an ecosystem to reduce waste, incentivize innovation, and create new business models to manage waste.`,
 questions: [
 { id: '2025-06-S3-Q5', question: 'What is the problem with fast fashion according to the news report?', options: ['A) It escapes regulation and misleads consumers.', 'B) It ignores economically feasible recycling options.', 'C) It creates waste and severely impacts the environment.', 'D) It produces clothes affordable only to a tiny minority.'], answer: 'C' },
 { id: '2025-06-S3-Q6', question: 'What is the purpose of the proposed bill?', options: ['A) To cut consumers\' expenses in buying quality clothes.', 'B) To enable the whole fast-fashion industry to be sustainable.', 'C) To incentivize manufacturers to be more consumer-friendly.', 'D) To urge manufacturers and consumers to reduce waste.'], answer: 'D' },
 { id: '2025-06-S3-Q7', question: 'What is the first step in solving the fast-fashion problem?', options: ['A) Recognizing the impact on consumers.', 'B) Identifying the source of the problem.', 'C) Abandoning the current business model.', 'D) Establishing powerful regulatory bodies.'], answer: 'B' },
 ],
 },
 {
 id: '2025-06-S3-SecB-1', year: 2025, month: 6, setNumber: 3,
 label: 'Section B — Conversation 1 (Q8-11)',...aud(2025, 6, 1, 462),
 transcript: `M: Hey Mary, you seem to be very much annoyed. What happened?
W: Rush hour in this city is killing me.
M: Ah, yes. Rush hour is terrible, especially in the morning between 8 and 9. But what else can you expect in a city this big?
W: Well, I think the local government could help improve things. I mean, getting rid of rush hour may be impossible, but it could be made more tolerable, don't you think?
M: Um... but I'm not sure how.
W: Well, for example, the subway system could have air conditioning. I know many cities in the world have air conditioning in their subway, so why can't we? It gets so hot in the summer. I can hardly breathe down there. And add to that the rush-hour crowds with strangers packed close together in the subway carriages, the whole thing is just horrible.
M: Ah, yes, you are completely right. The trains here are too old. The government should definitely invest in new ones with air conditioning. I guess I'm fortunate I take the bus instead.
W: Oh, that's much better.
M: Yeah, it's more convenient. Bus No. 36 goes straight from my house to the office. It's a 30-minute ride and I don't have to make any changes.
W: That sounds nice. I tell you, my current commute is killing me. Maybe I should move closer to the office.
M: Well, I know a great housing agent. I found the flat I'm living in now through him. And I love it.
W: Hmm, could you send me his number, please?
M: Sure thing. Just tell him exactly what you are looking for and I'm sure he will find something good.`,
 questions: [
 { id: '2025-06-S3-Q8', question: 'What does the woman complain about?', options: ['A) The city\'s rush-hour traffic is intolerable.', 'B) She cannot avoid rush-hour traffic.', 'C) The local government is inefficient.', 'D) The city is too big to move around easily.'], answer: 'A' },
 { id: '2025-06-S3-Q9', question: 'What suggestion does the woman make?', options: ['A) Upgrading subway carriages.', 'B) Increasing the number of bus routes.', 'C) Air conditioning the city\'s subway.', 'D) Learning from other big cities.'], answer: 'C' },
 { id: '2025-06-S3-Q10', question: 'What do we learn about the man?', options: ['A) He suffers from rush-hour crowding too.', 'B) He is fortunate to live very near to work.', 'C) He takes a half-hour bus ride to work.', 'D) He is going to move closer to his office.'], answer: 'C' },
 { id: '2025-06-S3-Q11', question: 'What does the woman ask the man to do?', options: ['A) Recommend to her a good house near his office.', 'B) Send her his housing agent\'s telephone number.', 'C) Tell her exactly what kind of property to look for.', 'D) Make sure the agent finds something good for her.'], answer: 'B' },
 ],
 },
 {
 id: '2025-06-S3-SecB-2', year: 2025, month: 6, setNumber: 3,
 label: 'Section B — Conversation 2 (Q12-15)',...aud(2025, 6, 1, 649),
 transcript: `M: Did you hear about Johnny?
W: No. Why? Is he okay?
M: He had some plastic surgery done.
W: What? Why?
M: Do you remember he had a scar on his face?
W: Yes, of course. He always had that. I've known him since primary school, and I always remember him having that on his cheek.
M: Well, he had it fixed.
W: Fixed? What do you mean? You can't fix a scar.
M: You know what I mean? He had an operation done on it, plastic surgery, in order to cover it and make it less noticeable.
W: Oh, well, that's ridiculous, isn't it? It was noticeable, sure. But it wasn't an ugly scar. It never occurred to me that he should have it taken care of like that.
M: I agree. I can understand some scars and physical defects can be ugly and distracting, but not Johnny's. In fact, I thought it added character... like it gave him a certain uniqueness.
W: He must have felt differently though. He must have felt self-conscious and insecure, perhaps.
M: No, no, that's not the reason. He was totally fine with his scar. As you said, he had had it for most of his life.
W: Then why did he have the operation?
M: Because his girlfriend wanted him to.
W: What? That's so superficial and selfish of her. If Johnny's girlfriend doesn't like him for who he is, then she does not deserve to be his girlfriend.
M: You are right. So he is insane to give in to her like that. But when I told him, he said he loves her and would just do what she wants him to.
W: What a fool he is.`,
 questions: [
 { id: '2025-06-S3-Q12', question: 'What do we learn about Johnny?', options: ['A) He was remembered for the scar on his cheek.', 'B) He received a heart operation a few days ago.', 'C) He used to wear a sad face in school.', 'D) He had some plastic surgery done.'], answer: 'D' },
 { id: '2025-06-S3-Q13', question: 'What confused the woman?', options: ['A) The man\'s deep sympathy for Johnny.', 'B) The man\'s use of the expression "fixed".', 'C) The man\'s covering up of what happened.', 'D) The man\'s good memory of his childhood.'], answer: 'B' },
 { id: '2025-06-S3-Q14', question: 'What did the woman think of the scar on Johnny\'s face?', options: ['A) It gave him a noticeable smartness.', 'B) It made him appear even more manly.', 'C) It seemed to give him a certain uniqueness.', 'D) It seemed to make up for his physical defects.'], answer: 'C' },
 { id: '2025-06-S3-Q15', question: 'How did the woman feel about Johnny\'s girlfriend?', options: ['A) Liberal.', 'B) Hostile.', 'C) Indifferent.', 'D) Critical.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S3-SecC-1', year: 2025, month: 6, setNumber: 3,
 label: 'Section C — Passage 1 (Q16-18)',...aud(2025, 6, 1, 863),
 transcript: `Talking is unique to humans. An animal might make 10 different sounds, but an adult human knows more than 20,000 words. Additionally, we're the only animal that expresses thoughts in full sentences. Researchers don't think language was invented; instead, they think it evolved. How did talking evolve? There are two main theories.
The first theory is that language started with people making different sounds, mostly imitating the things around them, like animal calls, nature sounds, and the sounds of tools. Perhaps they made the sound of wind to comment on the weather or imitated the sound of a bird to tell a friend that there was a bird nearby. Then over hundreds of thousands of years, those sounds turned into words that people began to learn as part of their language. At some point, people started stringing the words together to form sentences.
The other main theory, which is more recent, is that people started off by gesturing—pointing at things with their hands and imitating actions using their bodies. Eventually these gestures turned into a full sign language. This theory guesses that after developing sign languages, people eventually started making sounds along with their gestures. At some point, they switched to mostly making sounds that became words instead of just using their bodies. The reason they switched to making sounds, the theory goes, is that talking out loud lets you communicate with someone even when you can't see them.`,
 questions: [
 { id: '2025-06-S3-Q16', question: 'How did spoken language come about according to the passage?', options: ['A) Through deliberation.', 'B) Through evolution.', 'C) Through invention.', 'D) Through collaboration.'], answer: 'B' },
 { id: '2025-06-S3-Q17', question: 'How did spoken language begin?', options: ['A) With people imitating sounds around them.', 'B) With people interacting with animals close by.', 'C) With people showing each other things nearby.', 'D) With people trying to string sounds together.'], answer: 'A' },
 { id: '2025-06-S3-Q18', question: 'What advantage does spoken language have?', options: ['A) Making sounds can free one\'s hands for doing other things.', 'B) Making sounds proves markedly easier than sign languages.', 'C) Making sounds enables one to express their ideas more explicitly.', 'D) Making sounds helps one communicate with people they can\'t see.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S3-SecC-2', year: 2025, month: 6, setNumber: 3,
 label: 'Section C — Passage 2 (Q19-21)',...aud(2025, 6, 1, 1037),
 transcript: `Is it a good idea to display luxury brands and other signals of status? It depends on the situation. Studies have shown that people who appear to be wealthy tend to be considered more intelligent, disciplined, and competent than those who do not. But new research found that people believe someone who shows off their social status cares more about benefiting themselves than helping others. This means people are less willing to collaborate with them. Modesty may be key when cooperation is essential, but the researchers also found that in some cases, status signaling has advantages.

Experiments showed that participants were less likely to choose someone who signals their wealth or status to join a group seeking cooperative members. But participants were more likely to choose that person when they're looking for a competitive team member. These findings suggest that people should change how they present themselves depending on their social goal.

This is the era of social media. People can easily share their wealth and status to large audiences, but they need to consider the consequences. Posting about luxury purchases and expensive vacations online may help you to persuade others and frighten competitors, but it could also signal to potential friends or future employers that you are unlikely to think about the needs of others. This makes things tricky for people who may want to impress others while also demonstrating that they are a team player.`,
 questions: [
 { id: '2025-06-S3-Q19', question: 'How are people who display social status perceived according to the passage?', options: ['A) Well disciplined.', 'B) Quite confident.', 'C) Somewhat selfish.', 'D) Highly intelligent.'], answer: 'C' },
 { id: '2025-06-S3-Q20', question: 'When did people prefer to team up with someone who displayed social status?', options: ['A) When they wanted to have a competitive team member.', 'B) When they were looking for a cooperative workmate.', 'C) When they found collaboration essential to them.', 'D) When they were seeking someone to help them.'], answer: 'A' },
 { id: '2025-06-S3-Q21', question: 'What advice does the speaker give about sharing wealth on social media?', options: ['A) Avoid frightening competitors.', 'B) Make clear their social goal.', 'C) Adopt persuasive strategies.', 'D) Consider the consequences.'], answer: 'D' },
 ],
 },
 {
 id: '2025-06-S3-SecC-3', year: 2025, month: 6, setNumber: 3,
 label: 'Section C — Passage 3 (Q22-25)',...aud(2025, 6, 1, 1215),
 transcript: `Human fascination with animals goes back as far as humans do. Of the oldest cave paintings discovered, some are up to 40,000 years old, and there are more images of animals than humans. At some point, humans began to capture and hold animals.
The first-known collections were held by royalty and were not open to the public. In Egypt, researchers have found buildings from around 3500 B.C., containing the remains of animals, including elephants, which were not native to Egypt. But life wasn't easy for these animals. They probably had short lives, and their remains show evidence of severe injuries.
The first public exhibit of animals may have been created by Egypt's Queen Hatshepsut around 1480 B.C. Researchers think the zoo was started with animals brought home from a far-off land known as Punt. It's unclear why the Queen built the zoo, but it might have been to show off her wealth and power.
Early zoos are found all over the world. In China, Emperor Wenwang is said to have built a "Garden of Intelligence" around 1060 B.C. It included deer, birds, and many fish. In England, King Henry I set up a collection of animals in about 1110 as part of the royal estate. His collection included tigers and lions. This collection eventually moved to the Tower of London in 1235. The collection stayed at that location for 600 years.`,
 questions: [
 { id: '2025-06-S3-Q22', question: 'What did ancient cave paintings show?', options: ['A) Much evidence of humans capturing animals.', 'B) More images of animals than humans.', 'C) Fewer images of buildings than animals.', 'D) Little proof of human fascination with animals.'], answer: 'B' },
 { id: '2025-06-S3-Q23', question: 'What do we learn about the earliest animal collections?', options: ['A) They were open to the public.', 'B) They were primarily native.', 'C) They were kept by royalty.', 'D) They were hardly injured.'], answer: 'C' },
 { id: '2025-06-S3-Q24', question: 'Why did the Egyptian queen Hatshepsut create a zoo?', options: ['A) To enable the public to watch animals close by.', 'B) To introduce to Egyptians animals from Punt.', 'C) To protect the endangered animals.', 'D) To show off her riches and power.'], answer: 'D' },
 { id: '2025-06-S3-Q25', question: 'What do we learn about Hatshepsut\'s zoo?', options: ['A) It was part of the royal estate.', 'B) It was a shelter for wild animals.', 'C) It was the kingdom\'s best-equipped zoo.', 'D) It was the first public exhibit of animals.'], answer: 'A' },
 ],
 },


 // ================================================================
 
// ====== 2025年12月 ======
 // Set 1 (25 questions)
 {
 id: '2025-12-S1-SecA-1', year: 2025, month: 12, setNumber: 1,
 label: 'Section A — News Report 1 (Q1-2)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 40,
 transcript: `A terrified cat has survived a five-mile round trip under the engine cover of a car on a school run. The black cat was found curled up under the engine cover of David King's car when he decided to do an oil check. After dropping his grandson off at school in Kent, Mr. King's wife said her husband had come running in and was shouting for me to come have a look. We weren't even sure it was alive, so I gently pushed it with a stick to check it was breathing and saw it was a terrified little cat. It reversed even further into the engine and was stuck. I tried to reach it, but it was too far down and there wasn't any way I could get it out. Following a rescue by UK charity Cats Protection, the four-year-old cat was later reunited with its owner, Mr. King's neighbour.`,
 questions: [
 { id: '2025-12-S1-Q1',
 question: 'What does the news report say about a cat?',
 options: ['A) At the gate of a grade school in Kent.', 'B) Under the engine cover of a man\'s car.', 'C) Inside the car of David King\'s neighbour.', 'D) Outside the office of a charity foundation.'],
 answer: 'B' },
 { id: '2025-12-S1-Q2',
 question: 'What happened at the end of the news report?',
 options: ['A) It got reunited with its owner.', 'B) It was injured during the rescue.', 'C) It was placed in the care of a UK charity.', 'D) It became a pet of Mr. King\'s grandson.'],
 answer: 'A' },
 ],
 },
 {
 id: '2025-12-S1-SecA-2', year: 2025, month: 12, setNumber: 1,
 label: 'Section A — News Report 2 (Q3-4)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 142,
 transcript: `In less than a month, the Special Olympics Spring Games will make a return to Fayetteville. The Games are coming back for the first time in five years. The event will take place at Methodist University. Event organizer Benjamin Koalzig says he's excited that athletes will get a chance to come back and demonstrate their abilities. Organizers expect about 100 athletes will come out to compete in Fayetteville. They will have a variety of events to choose from, including running, throwing and jumping. There will also be a fun tent for children. Koalzig said it's rewarding to see athletes with special needs triumph in the Games. For anyone who wants to help make this year's Games a massive success, there is still opportunities to volunteer for Fayetteville's Special Olympics. Organizers encourage them to visit the Games website to sign up.`,
 questions: [
 { id: '2025-12-S1-Q3',
 question: 'What event does the news report mainly describe?',
 options: ['A) The reunion of this year\'s Olympic gold medalists.', 'B) The opening of the Special Olympics Spring Games.', 'C) The first important political event in the next five years.', 'D) The 100th anniversary celebration of Methodist University.'],
 answer: 'B' },
 { id: '2025-12-S1-Q4',
 question: 'What is mentioned as a highlight of the event?',
 options: ['A) Volunteers visit the Games\' website to sign up.', 'B) Children play in a fun tent and enjoy themselves fully.', 'C) Organizers devote their time and energy to the Games.', 'D) Athletes with special needs triumph in the Games.'],
 answer: 'D' },
 ],
 },
 {
 id: '2025-12-S1-SecA-3', year: 2025, month: 12, setNumber: 1,
 label: 'Section A — News Report 3 (Q5-7)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 250,
 transcript: `A German supermarket has been ordered to destroy its chocolate rabbits after it lost a court battle with a Swiss chocolate manufacturer. The Swiss firm had argued its gold-wrapped chocolate rabbit deserved copyright protection from a similar product sold by the budget supermarket. Switzerland's highest court agreed and overturned a ruling last year by the country's commercial court that had sided with the supermarket. It ordered that all the imitation rabbits be destroyed, but suggested the chocolate needn't be wasted. It could be melted for use in other products. It said even though there are some differences between the two products, there was still the possibility of confusion for consumers. The Swiss manufacturer's rabbit has a red bow and bell, while the German supermarkets has a green bow and bell. The color of the wrapper is similar, as are the illustrations of the features. The chocolate company has been to court before to protect its popular chocolate treat. Last year, a German federal court said the shade of the gold wrapping was also protected.`,
 questions: [
 { id: '2025-12-S1-Q5',
 question: 'What was the German budget supermarket ordered to do?',
 options: ['A) Compensate for the Swiss manufacturer\'s loss.', 'B) Change the wrapping of its commodities.', 'C) Destroy its imitation chocolate rabbits.', 'D) Defend itself in the country\'s commercial court.'],
 answer: 'C' },
 { id: '2025-12-S1-Q6',
 question: 'What does the news report say about the chocolate of the rabbits?',
 options: ['A) It could be reused in other products.', 'B) It could be resold cheaper to avoid waste.', 'C) It could be reshaped into animals other than rabbits.', 'D) It could be rewrapped and sold by the budget supermarket.'],
 answer: 'A' },
 { id: '2025-12-S1-Q7',
 question: 'Why did the Swiss manufacturer take the supermarket to court?',
 options: ['A) To be fair to the German supermarkets.', 'B) To protect chocolate retailers\' interests.', 'C) To prevent consumers\' possible confusion.', 'D) To boost the growth of the chocolate industry.'],
 answer: 'C' },
 ],
 },
 {
 id: '2025-12-S1-SecB-1', year: 2025, month: 12, setNumber: 1,
 label: 'Section B — Conversation 1 (Q8-11)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 423,
 transcript: `Can you please hand me that book over there? It has instructions for making a winter bean salad. My sister's boyfriend is coming over for dinner. He's vegetarian, so I need to make a lot of vegetable dishes. He only eats vegetables, no meat? That doesn't sound like a very balanced diet. How can he get enough protein? What does he do to strengthen his muscles and all that? Apparently, that's no problem. He's explained this to me when we first met. He eats a variety of different vegetables and nuts, especially those with high amounts of protein. It sounds a bit difficult, but he's done his research, I suppose. What's his reasoning for being vegetarian? Is it his religion, health condition, or lifestyle? He's an animal activist. He's always been very sensitive and sympathizes with animals. He's even written to his state senator about the torture of dolphins in sea parks. He says that keeping animals in zoos and parks causes them great distress. That's a little gloomy, but I can understand that to a point. Not all zoos and animal parks have the most favorable conditions, but without them, it just wouldn't be feasible to learn about animals and their environments. Besides, I don't think I could ever give up a good hot dog at a baseball game. Honestly, I agree, but just don't let him hear you say that. He's the spokesperson for his local animal rights group.`,
 questions: [
 { id: '2025-12-S1-Q8',
 question: 'What does the woman ask the man to do?',
 options: ['A) Pass a book to him.', 'B) Make a vegetable dish.', 'C) Return the handbook to him.', 'D) Meet his sister\'s boyfriend.'],
 answer: 'A' },
 { id: '2025-12-S1-Q9',
 question: 'What does the woman say about a vegetarian diet?',
 options: ['A) It doesn\'t sound practical for her.', 'B) It would do harm to one\'s muscles.', 'C) It would reduce one\'s protein intake.', 'D) It doesn\'t seem to be a balanced diet.'],
 answer: 'D' },
 { id: '2025-12-S1-Q10',
 question: 'Why does the man choose to be a vegetarian?',
 options: ['A) To improve his health.', 'B) To protect animal rights.', 'C) To stick to his religious belief.', 'D) To follow a trendy lifestyle.'],
 answer: 'B' },
 { id: '2025-12-S1-Q11',
 question: 'What do the speakers disagree on?',
 options: ['A) The torture and distress dolphins suffer in parks.', 'B) The urgency of joining an animal rights group.', 'C) The gloomy environments animals are kept in.', 'D) The necessity of having zoos and eating meat.'],
 answer: 'D' },
 ],
 },
 {
 id: '2025-12-S1-SecB-2', year: 2025, month: 12, setNumber: 1,
 label: 'Section B — Conversation 2 (Q12-15)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 599,
 transcript: `Did you see that television program on air travel last night? Yes, the part about overcoming jet lag was interesting. I was surprised that the expert recommended not eating for the entire journey and avoiding sleeping on the plane. I was too, as I read an article on the subject in the past that suggested the opposite. It claimed that it was important not to miss meals, and that taking a nap on the plane was the best way to adjust to a new time zone. Well, the expert on the show did cite research supporting her recommendations, so I guess I'll give it a try next time I fly a long distance. Jet lag is a big problem for me, and has been for the last few years, even though I never suffered from it before. Well, she did say that jet lag often becomes more of a problem after 40. So I guess I'm lucky that I can still adjust to different time zones well. My problem is I'm afraid to fly. Oh, I didn't know that. Actually, my mother is terrified of airplanes to the points where she can't even fly, so our family vacations were always by car or train. I'm not as bad as that. I just get anxious before I fly and feel nervous the whole time we're in the air, which is why I was hoping the television program would cover that topic more than it did. Yeah, that segment was too brief, especially as so many people have that problem. She said 20% of people are afraid to fly. Actually, it was a quarter of people, so the problem really is widespread and deserves attention.`,
 questions: [
 { id: '2025-12-S1-Q12',
 question: 'What part of the TV show impressed the woman most?',
 options: ['A) The part about not eating on board the plane.', 'B) The part about air travel in the past.', 'C) The part about getting over jetlag.', 'D) The part about avoiding sleeping on the plane.'],
 answer: 'C' },
 { id: '2025-12-S1-Q13',
 question: 'What does the woman intend to do?',
 options: ['A) Try following the advice given by the expert on the show.', 'B) Concentrate on reading articles recommended by experts.', 'C) Have meals as usual to stay away from hunger.', 'D) Take a nap to adjust to a new time zone.'],
 answer: 'A' },
 { id: '2025-12-S1-Q14',
 question: 'What do we learn about the woman?',
 options: ['A) She has been well treated when traveling.', 'B) She does not have to worry about jetlag.', 'C) She can spend a lot of time vacationing.', 'D) She does not have any problem flying.'],
 answer: 'B' },
 { id: '2025-12-S1-Q15',
 question: 'What does the man say about jetlag?',
 options: ['A) It affects twenty-five percent of people.', 'B) It has long been ignored by many experts.', 'C) It impacts female travelers more seriously.', 'D) It has caused heavy losses to many airlines.'],
 answer: 'A' },
 ],
 },
 {
 id: '2025-12-S1-SecC-1', year: 2025, month: 12, setNumber: 1,
 label: 'Section C — Passage 1 (Q16-18)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 814,
 transcript: `The most common question I'm asked always centers around how to get started in user experience design, to which my response is always that nothing can substitute real world experience. Building the skills required of a user experience designer takes time, patience, and commitment. Higher education is a great way to equip yourself with some core skills, but it will not prepare you for actual challenges your face with client work. In other words, being proficient with a design tool and a few methods doesn't make you a user experience designer. There simply isn't a one size fits all process. Being effective requires adaptability, something you don't really learn in school, much less in a six month training camp. It's gained through experience on the job and learning what's appropriate given the needs of the project. I found my way to user experience through graphic design and slowly over many different roles and experiences that led me to become a user experience designer. It took time and commitment to continue to pursue roles within teams that I knew could teach and challenge me. That's not to say that I think my path is the only one, but once again nothing can substitute real world experience. You can start anywhere as long as you know your end goal and you commit to actively pursuing opportunities to learn and grow along the way.`,
 questions: [
 { id: '2025-12-S1-Q16',
 question: 'What is the biggest challenge to starting a career in UX design according to the passage?',
 options: ['A) Learning from skilled designers.', 'B) Joining a 6-month training camp.', 'C) Obtaining real-world experience.', 'D) Anticipating actual challenges.'],
 answer: 'C' },
 { id: '2025-12-S1-Q17',
 question: 'What does the passage say employers look for in potential employees?',
 options: ['A) Core skills.', 'B) Higher education.', 'C) Capability.', 'D) Adaptability.'],
 answer: 'D' },
 { id: '2025-12-S1-Q18',
 question: 'What advice does the passage offer to those who want to start a career in UX design?',
 options: ['A) Face challenges.', 'B) Start anywhere.', 'C) Pursue roles in teams.', 'D) Follow their own path.'],
 answer: 'B' },
 ],
 },
 {
 id: '2025-12-S1-SecC-2', year: 2025, month: 12, setNumber: 1,
 label: 'Section C — Passage 2 (Q19-21)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 985,
 transcript: `For us flexible seating has meant removing most of the traditional chairs and desks and introducing a variety of different seating options to promote student engagement. The use of rows and their minimal adaptations to U shape were traditionally intended to maximize on task behavior and reduce distraction from the teacher. Teachers tend to still use this format because of either the need to control students or the belief that the teacher is the most important person in the room. Now our students have a range of different seating options including a floor desk, couches, stools, bean bags and the traditional desk and chair. From our experience so far flexible seating enhances student ownership of space and engagement and learning while reducing rates of student disengagement and disciplinary actions. It is a win for all concerned.`,
 questions: [
 { id: '2025-12-S1-Q19',
 question: 'What is the purpose of flexible seating in classrooms?',
 options: ['A) To allow students more freedom in their academic work.', 'B) To enable teachers to interact more with their students.', 'C) To engage students more in their learning.', 'D) To respond actively to students\' requests.'],
 answer: 'C' },
 { id: '2025-12-S1-Q20',
 question: 'What does flexible seating involve?',
 options: ['A) Rearranging most traditional chairs and desks.', 'B) Adopting a variety of different seating options.', 'C) Shifting from traditional teaching to task-based learning.', 'D) Using new furniture to create a comfortable environment.'],
 answer: 'C' },
 { id: '2025-12-S1-Q21',
 question: 'What is the outcome of the flexible seating program?',
 options: ['A) A change to teachers\' opinion of their students.', 'B) A harmonious relationship among its students.', 'C) A strengthened effect of its discipline.', 'D) A win for all people involved.'],
 answer: 'D' },
 ],
 },
 {
 id: '2025-12-S1-SecC-3', year: 2025, month: 12, setNumber: 1,
 label: 'Section C — Passage 3 (Q22-25)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 1166,
 transcript: `Dozens of British students arriving for their first day of school on Tuesday were sent home over their shoes. About 30 students were turned away from Taveram High School in Norfolk, England. Head teacher Dr Roger Harris confirmed that this was due to a change in the school's uniform policy. Harris, who became head teacher this year, said he notified parents of the updated rules in an email in June. The price of school uniforms can spark panic among families struggling with the high cost of living. Nearly all British schools have uniforms. They cost parents an average of 337 pounds per year for each secondary school child. According to the new rules, students of Taveram are required to wear smart black shoes appropriate for the workplace. Harris held that strengthened rules around school uniforms, improved student outcomes and behaviour. But for some parents, the school's restrictions are an unnecessary burden. As annual inflation climbs over 10%, many households are on tight budgets. Private rental prices in Britain rose 3.2% over the 12 months to July 2022. The largest jump since 2016. Soring energy bills have made things worse. Lucinda May, mum of a Taveram student, said that she had to ask her parents for 65 pounds to buy her child the correct pair of shoes. May said that the school's uniform policy show the lack of regard for parents dealing with the high cost of living.`,
 questions: [
 { id: '2025-12-S1-Q22',
 question: 'What was the problem with some students?',
 options: ['A) They arrived late for their first day of school.', 'B) They weren\'t informed of the school\'s updated rules.', 'C) They answered their headteacher\'s email in an impolite way.', 'D) They didn\'t wear the shoes required by the school\'s new policy.'],
 answer: 'C' },
 { id: '2025-12-S1-Q23', question: 'How did parents react to the school\'s decision?', options: ['A) Panic.', 'B) Anger.', 'C) Disputes.', 'D) Riots.'], answer: 'A' },
 { id: '2025-12-S1-Q24', question: 'What does the passage say about the school\'s new rules?', options: ['A) They rendered the school unique in the district.', 'B) They enhanced the positive image of the school.', 'C) They improved student behavior and performance.', 'D) They strengthened the school\'s discipline and order.'], answer: 'C' },
 { id: '2025-12-S1-Q25',
 question: 'What did one mother have to do as a result of the new policy?',
 options: ['A) Tighten her monthly budget.', 'B) Turn to her parents for help.', 'C) Borrow £65 from her friend.', 'D) Postpone paying her other bills.'],
 answer: 'B' },
 ],
 },

 // Set 2 (25 questions)
 {
 id: '2025-12-S2-SecA-1', year: 2025, month: 12, setNumber: 2,
 label: 'Section A — News Report 1 (Q1-2)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 39,
 transcript: `Customs and border protection officials are seeing a rise in people illegally bringing eggs from Mexico into border states such as Texas. The U.S. average price for a dozen large eggs last month hit \$4.25. That's more than double their \$1.78 price in December 2023. Meanwhile, 30 eggs in Mexico sell for just \$3.40. Those bringing eggs into the U.S. risk fines of up to \$10,000. But officials say they usually seize and destroy the eggs. They also impose a \$300 penalty. The Department of Agriculture banned eggs from Mexico in 2012. This was due to the risk of bird flu. Officials said most people arriving at international borders with eggs are truthful about their purchases. They simply don't know bringing eggs is not allowed. Generally, the items are declared during the first inspection. Then the person can abandon the eggs without consequence. A customs and border protection spokesperson said. Even so, there have been a very small number of cases recently when authorities discovered eggs during further inspections.`,
 questions: [
 { id: '2025-12-S2-Q1',
 question: 'What does the news report say about the price of eggs?',
 options: ['A) It has gone up sharply.', 'B) It has been fluctuating.', 'C) It has risen because of bird flu.', 'D) It has been consumers\' concern.'],
 answer: 'A' },
 { id: '2025-12-S2-Q2',
 question: 'Why are passengers bringing eggs across the US-Mexico border?',
 options: ['A) They don\'t want to abandon their eggs.', 'B) They don\'t know they will be heavily fined.', 'C) They don\'t know they are forbidden to bring eggs.', 'D) They don\'t declare their eggs during the inspection.'],
 answer: 'C' },
 ],
 },
 {
 id: '2025-12-S2-SecA-2', year: 2025, month: 12, setNumber: 2,
 label: 'Section A — News Report 2 (Q3-4)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 179,
 transcript: `Netty's House, a restaurant in America, has been hit with criticism after announcing on their website that children under the age of 10 are no longer welcome. Among the reasons given for the decision, the restaurant cited noise levels, lack of space for high chairs, cleaning up crazy messes, and the liability of kids running around the restaurant. They decided that it was time to take control. The decision wasn't made lightly, but some recent events pushed them to implement this new policy. Responding to the post, one person commented that it is messed up beyond another level. Children are children. Moms are tired and don't have time to cook. Not welcoming children under 10 is a complete slap in the face to families. He felt so disappointed in the establishment. There are others, however, who showed support for the restaurant's decision. They said it has the right to implement any rules it wants.`,
 questions: [
 { id: '2025-12-S2-Q3',
 question: 'What change has taken place in the restaurant?',
 options: ['A) It is no longer critical of younger customers.', 'B) It has banned kids under 10 from dining there.', 'C) It is no longer as noisy and crowded as before.', 'D) It has implemented a decision to expand business.'],
 answer: 'B' },
 { id: '2025-12-S2-Q4',
 question: 'What does the restaurant believe?',
 options: ['A) It is fully aware of frequent customers\' feelings.', 'B) It caters to the tastes of different customers.', 'C) It is entitled to adopt any rules it wants.', 'D) It should announce its decisions online.'],
 answer: 'C' },
 ],
 },
 {
 id: '2025-12-S2-SecA-3', year: 2025, month: 12, setNumber: 2,
 label: 'Section A — News Report 3 (Q5-7)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 291,
 transcript: `Security officers were searching a suburb in Australia where an adult snake was believed to be wandering after the discovery of a huge, freshly shed snake skin. The skin was found at a construction site and the government wrote to residents to warn them. They were told to observe and, if possible, photograph the animal. If it was moving, watch where it went. It was recommended not to make contact with the animal. The type of snake was determined to be one of the world's largest snake species. It is not poisonous but can still attack and kill its victims. This type of snake is classified as a threat to humans, especially small children, as well as pets. They may carry viruses that are fatal to native snakes, which do not have resistance. If officers found the snake, they would employ a licensed snake catcher to catch it and transport it to a specialist animal doctor, the government said. If caught, the snake would be examined to determine where it came from. How long it had been in the area, what it had been eating, whether it was carrying any diseases of concern, and whether it had produced babies.`,
 questions: [
 { id: '2025-12-S2-Q5',
 question: 'What did workers find at a construction site?',
 options: ['A) A missing pet.', 'B) A grown-up snake.', 'C) A huge animal skin.', 'D) A snake specialist.'],
 answer: 'B' },
 { id: '2025-12-S2-Q6',
 question: 'Where was the creature found?',
 options: ['A) In a government office.', 'B) In a deserted house.', 'C) At a local zoo.', 'D) At a construction site.'],
 answer: 'D' },
 { id: '2025-12-S2-Q7',
 question: 'What is the biggest challenge for the specialists?',
 options: ['A) Figuring out where it came from.', 'B) Curing it of any possible diseases.', 'C) Protecting its babies against harm.', 'D) Determining how to catch it safely.'],
 answer: 'A' },
 ],
 },
 {
 id: '2025-12-S2-SecB-1', year: 2025, month: 12, setNumber: 2,
 label: 'Section B — Conversation 1 (Q8-11)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 470,
 transcript: `Poor Hannah. Why? What happened? Didn't you hear? She won a TV competition and became a millionaire overnight. No way. That's incredible. Are you kidding? No, I'm serious. I swear it. She went on a TV show where they quiz on general knowledge and she won first prize. Wow. That's so lucky of her. How much did she win? I'm not sure of the exact figure, but it's a few million euros. Maybe five million euros after tax. I can't believe it. You're really not joking, are you? Honestly, look at my face. Our friend Hannah won a ton of money. Unbelievable. Then why were you saying poor Hannah? Well, it turns out that she's spent it all already. Five million euros? How is that even possible? She bought a house for herself and her husband, a house for her parents, and then a house for each of her four brothers and sisters. And then she bought her husband a ridiculously expensive sports car. Wow. Are they all happy? Because that's what matters, isn't it? I know for a fact, Hannah isn't. You see, she was planning to quit the job she hates and retire early. But now that she ran out of money, she can't. Basically, she miscalculated how fast she was burning through the money. And she's now full of regret. Why don't they sell that flashy new car? She wants to, but her husband refuses to get rid of it. He says the car is the best thing that has ever happened to him, and if she sells it, he will divorce her.`,
 questions: [
 { id: '2025-12-S2-Q8',
 question: 'What does the man imply about Hannah?',
 options: ['A) The man doesn\'t agree Hannah is poor.', 'B) The man doesn\'t believe what she says.', 'C) The man doesn\'t think she can be a millionaire.', 'D) The man doesn\'t consider her to be trustworthy.'],
 answer: 'B' },
 { id: '2025-12-S2-Q9',
 question: 'What happened to Hannah after winning the lottery?',
 options: ['A) She no longer has any money left.', 'B) She has been betrayed by her family.', 'C) She can no longer hold on to her job.', 'D) She has been robbed of 5 million Euros.'],
 answer: 'A' },
 { id: '2025-12-S2-Q10',
 question: 'What does the woman value most?',
 options: ['A) Fortune.', 'B) Family.', 'C) Harmony.', 'D) Happiness.'],
 answer: 'B' },
 { id: '2025-12-S2-Q11',
 question: 'What does the woman suggest the man do?',
 options: ['A) Divorce her.', 'B) Leave home.', 'C) Buy her a more expensive model.', 'D) Let the best thing happen to them.'],
 answer: 'A' },
 ],
 },
 {
 id: '2025-12-S2-SecB-2', year: 2025, month: 12, setNumber: 2,
 label: 'Section B — Conversation 2 (Q12-15)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 658,
 transcript: `If you have time right now, I think we need to sit down and discuss what exactly we are going to do for Jake's education next year. I've been thinking it over, and I'd like to send him to Westwood Elementary. You mean that boarding school? I thought we agreed that we would not be sending him away at such a young age. I admit that their academic record is very strong with many outstanding awards for achievements in science and math, but he is just not mature enough to live on his own at this point. What about enrolling him in Lakeview School? They do have a great outdoor campus where he could finally learn all those outdoor sports you have been wanting him to try. With so much greenery and fresh air, I think his current breathing problems would probably disappear. They did just open though, so I don't think I feel comfortable having our son in the first class of a brand new school. Yeah, the classrooms would probably smell like paint, making the air in the school all stuffy. What about our local school then? They have a wonderful arts program that would really challenge Jake in terms of creativity and imagination. Being practically next door, one of us could take him to school every day before going to work. I don't know. They have a reputation of being overly strict with the students, not to mention the overwhelming amount of homework they assign, which would lead to a lot of pressure for Jake and me. What if we sent him to the place near your mother's house?`,
 questions: [
 { id: '2025-12-S2-Q12', question: 'Why doesn\'t the woman want to send Jake to Westwood?', options: ['A) He is not outstanding in Science and Math.', 'B) He does not have a strong academic record.', 'C) He is not yet mature enough to live on his own.', 'D) He does not like Westwood Elementary School.'], answer: 'C' },
 { id: '2025-12-S2-Q13',
 question: 'What does the woman say about the first school?',
 options: ['A) It is too far away.', 'B) It is newly opened.', 'C) It lacks outdoor sports facilities.', 'D) It has too few first-class teachers.'],
 answer: 'B' },
 { id: '2025-12-S2-Q14',
 question: 'What do we learn about the second school?',
 options: ['A) It has a beautiful campus.', 'B) It is within walking distance.', 'C) It has a wonderful arts program.', 'D) It is helpful to Jake\'s breathing problems.'],
 answer: 'C' },
 { id: '2025-12-S2-Q15',
 question: 'What does the man suggest the woman do?',
 options: ['A) Asking Jake which school he himself prefers to enroll in.', 'B) Thinking twice about what is best for Jake\'s education next year.', 'C) Consulting her mother about which school Jake is to attend.', 'D) Sending Jake to the school near the home of the man\'s mother.'],
 answer: 'D' },
 ],
 },
 {
 id: '2025-12-S2-SecC-1', year: 2025, month: 12, setNumber: 2,
 label: 'Section C — Passage 1 (Q16-18)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 868,
 transcript: `Analytical decision-making is a decision-making approach where a manager makes important business decisions only with solid data. This style contrasts with more instinctive leadership styles, where managers make many decisions using instinct or opinion. While analytical decision-makers benefit from a deliberate, thoughtful approach, this style also has some shortcomings. A key flaw with analytical decision-making is that it takes time. While this approach is beneficial when you have the time and the decision is important, it is problematic when time is crucial. Analytical decision-makers struggle with deadlines and a sense of urgency with decisions. In situations where you need more timely action, decisions based on some information and instinct may work better. The desire to be right is a major driver of analytical decision-making. Leaders who use this style don't want to make mistakes. This commitment to one right way of thinking or doing things hinders the manager's flexibility. In flexibility causes you to ignore or avoid listening to the thoughts and ideas of others. You only want to utilize hard data or facts. Despite its restrictions, analytical decision-making does have several key strengths. By relying on facts and data, you minimize your potential for a wrong decision. You also get away from the habit of making guesses or following instincts. Database technology enables business leaders to look to hard evidence in analyzing target markets and promotional strategies, rather than making assumptions or guesses on what works.`,
 questions: [
 { id: '2025-12-S2-Q16',
 question: 'What is the disadvantage of making quick decisions according to the passage?',
 options: ['A) It is time consuming.', 'B) It is unfit for crucial issues.', 'C) It relies too much on solid data.', 'D) It dulls a leader\'s sense of urgency.'],
 answer: 'A' },
 { id: '2025-12-S2-Q17',
 question: 'What should leaders do to make quick decisions?',
 options: ['A) Depend on digital technology.', 'B) Make assumptions and guesses.', 'C) Ignore others\' thoughts and ideas.', 'D) Lay emphasis on thinking flexibly.'],
 answer: 'C' },
 { id: '2025-12-S2-Q18',
 question: 'What does the passage say experienced leaders are good at?',
 options: ['A) Maximizing the advantage of available resources.', 'B) Minimizing the possibility of a wrong decision.', 'C) Discovering new potential markets.', 'D) Perfecting promotional strategies.'],
 answer: 'B' },
 ],
 },
 {
 id: '2025-12-S2-SecC-2', year: 2025, month: 12, setNumber: 2,
 label: 'Section C — Passage 2 (Q19-21)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 1049,
 transcript: `Playing the piano is among the things the world's oldest person believes has contributed to her long life. Brannas Marera is now 115 years and 320 days old. That means she's been alive longer than any other living individual. Brannas was born in the United States on April 4, 1907, but her family moved to Spain, where they were originally from when she was a young child. She has lived there ever since. The 115-year-old is active on social media, regularly sharing aspects of her life. She also shares some of her secrets to living so long. These include playing the piano from a young age. Unfortunately, she had to give up the practice seven years ago at 108. Her other secrets for living a long life? She led an active lifestyle until her later years, but has never followed a specific diet. Many people ask me what diet I follow to live so many years, Brannas wrote. I have always eaten little, but everything, and I have never followed any plan. But she does eat yogurt every day, which, she said, has an infinite number of positive properties for the body. She has also said that the secret to a long life is knowing how to choose what to forget. Life would be impossible if we remembered everything, she said.`,
 questions: [
 { id: '2025-12-S2-Q19',
 question: 'What do we learn about the woman mentioned in the passage?',
 options: ['A) She is one of the world\'s best-known pianists.', 'B) She celebrated her 110th birthday this April.', 'C) She moved to the U.S. at a young age.', 'D) She is the world\'s oldest individual.'],
 answer: 'D' },
 { id: '2025-12-S2-Q20',
 question: 'What does the woman attribute her long life to?',
 options: ['A) Being always active on social media.', 'B) Doing regular and vigorous exercise.', 'C) Playing the piano from a young age.', 'D) Following a specific diet every day.'],
 answer: 'C' },
 { id: '2025-12-S2-Q21',
 question: 'What is her secret to a long and happy life?',
 options: ['A) Eating as little as one can possibly manage.', 'B) Having the ability to forget things selectively.', 'C) Figuring out the positive properties of each food item.', 'D) Knowing how to remember major events in one\'s life.'],
 answer: 'B' },
 ],
 },
 {
 id: '2025-12-S2-SecC-3', year: 2025, month: 12, setNumber: 2,
 label: 'Section C — Passage 3 (Q22-25)',
 audioSrc: '/audio/2025-12-S2.mp3',
 audioStart: 1218,
 transcript: `It's the first day of school, and your teacher tells you to find a seat in the classroom. Where do you sit? Does it matter? Yes, it does matter where you sit in your classroom, so choose and choose carefully. Studies report that where you sit in the classroom can impact your ability to learn, and the way your teacher perceives you. Guess what else? Your grade. Then what is the best seat in the classroom? In one study, students who sat in the front and center of the classroom received a higher grade average and scored higher on tests than those sitting towards the back of the classroom. Get this, students sitting in the middle of the classroom also outscored students sitting behind them. This study gathered that students had a clear vision of the blackboard and were able to focus more attention on the instructor. By sitting front and center, students were able to hear better too. The instructors said that they also formed a better connection with the students who sat in front. Perhaps the connection is made because of eye contact and visibility and more interaction, but when you sit in the front row, you may be called on more by your teacher, mainly due to the fact that you are easier to see. So, for students who are not prepared and for those who are extremely shy, the attention could cause some unwanted stress.`,
 questions: [
 { id: '2025-12-S2-Q22', question: 'What does the passage say can affect a student\'s school experience?', options: ['A) The ability to learn.', 'B) The first day of school.', 'C) How teachers perceive them.', 'D) Where they sit in the classroom.'], answer: 'D' },
 { id: '2025-12-S2-Q23',
 question: 'What did a study find about students sitting in the front rows?',
 options: ['A) They often received close attention from the instructors.', 'B) They obtained the highest grade average in their class.', 'C) They actually wanted a clear vision of the blackboard.', 'D) They scored higher than students sitting behind them.'],
 answer: 'D' },
 { id: '2025-12-S2-Q24',
 question: 'What can result from letting students choose their own seats?',
 options: ['A) A higher grade average among all students of a class.', 'B) A better connection between instructors and students.', 'C) A stronger support for a student-centered teaching approach.', 'D) A more favorable atmosphere for effective classroom learning.'],
 answer: 'B' },
 { id: '2025-12-S2-Q25',
 question: 'What does the passage say about students sitting in the front row?',
 options: ['A) They may experience some unwanted stress.', 'B) They may try hard to show their preparedness.', 'C) They may receive extra attention from the instructor.', 'D) They may feel helpless when called on by the instructor.'],
 answer: 'A' },
 ],
 },

 // Set 3 — shares Set 1 audio (25 questions, same as Set 1)
 {
 id: '2025-12-S3-SecA-1', year: 2025, month: 12, setNumber: 3,
 label: 'Section A — News Report 1 (Q1-2)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 40,
 transcript: `A terrified cat has survived a five-mile round trip under the engine cover of a car on a school run. The black cat was found curled up under the engine cover of David King's car when he decided to do an oil check. After dropping his grandson off at school in Kent, Mr. King's wife said her husband had come running in and was shouting for me to come have a look. We weren't even sure it was alive, so I gently pushed it with a stick to check it was breathing and saw it was a terrified little cat. It reversed even further into the engine and was stuck. I tried to reach it, but it was too far down and there wasn't any way I could get it out. Following a rescue by UK charity Cats Protection, the four-year-old cat was later reunited with its owner, Mr. King's neighbour.`,
 questions: [
 { id: '2025-12-S3-Q1',
 question: 'What does the news report say about a cat?',
 options: ['A) At the gate of a grade school in Kent.', 'B) Under the engine cover of a man\'s car.', 'C) Inside the car of David King\'s neighbour.', 'D) Outside the office of a charity foundation.'],
 answer: 'B' },
 { id: '2025-12-S3-Q2',
 question: 'What happened at the end of the news report?',
 options: ['A) It got reunited with its owner.', 'B) It was injured during the rescue.', 'C) It was placed in the care of a UK charity.', 'D) It became a pet of Mr. King\'s grandson.'],
 answer: 'A' },
 ],
 },
 {
 id: '2025-12-S3-SecA-2', year: 2025, month: 12, setNumber: 3,
 label: 'Section A — News Report 2 (Q3-4)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 142,
 transcript: `In less than a month, the Special Olympics Spring Games will make a return to Fayetteville. The Games are coming back for the first time in five years. The event will take place at Methodist University. Event organizer Benjamin Koalzig says he's excited that athletes will get a chance to come back and demonstrate their abilities. Organizers expect about 100 athletes will come out to compete in Fayetteville. They will have a variety of events to choose from, including running, throwing and jumping. There will also be a fun tent for children. Koalzig said it's rewarding to see athletes with special needs triumph in the Games. For anyone who wants to help make this year's Games a massive success, there is still opportunities to volunteer for Fayetteville's Special Olympics. Organizers encourage them to visit the Games website to sign up.`,
 questions: [
 { id: '2025-12-S3-Q3',
 question: 'What event does the news report mainly describe?',
 options: ['A) The reunion of this year\'s Olympic gold medalists.', 'B) The opening of the Special Olympics Spring Games.', 'C) The first important political event in the next five years.', 'D) The 100th anniversary celebration of Methodist University.'],
 answer: 'B' },
 { id: '2025-12-S3-Q4',
 question: 'What is mentioned as a highlight of the event?',
 options: ['A) Volunteers visit the Games\' website to sign up.', 'B) Children play in a fun tent and enjoy themselves fully.', 'C) Organizers devote their time and energy to the Games.', 'D) Athletes with special needs triumph in the Games.'],
 answer: 'D' },
 ],
 },
 {
 id: '2025-12-S3-SecA-3', year: 2025, month: 12, setNumber: 3,
 label: 'Section A — News Report 3 (Q5-7)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 250,
 transcript: `A German supermarket has been ordered to destroy its chocolate rabbits after it lost a court battle with a Swiss chocolate manufacturer. The Swiss firm had argued its gold-wrapped chocolate rabbit deserved copyright protection from a similar product sold by the budget supermarket. Switzerland's highest court agreed and overturned a ruling last year by the country's commercial court that had sided with the supermarket. It ordered that all the imitation rabbits be destroyed, but suggested the chocolate needn't be wasted. It could be melted for use in other products. It said even though there are some differences between the two products, there was still the possibility of confusion for consumers. The Swiss manufacturer's rabbit has a red bow and bell, while the German supermarkets has a green bow and bell. The color of the wrapper is similar, as are the illustrations of the features. The chocolate company has been to court before to protect its popular chocolate treat. Last year, a German federal court said the shade of the gold wrapping was also protected.`,
 questions: [
 { id: '2025-12-S3-Q5',
 question: 'What was the German budget supermarket ordered to do?',
 options: ['A) Compensate for the Swiss manufacturer\'s loss.', 'B) Change the wrapping of its commodities.', 'C) Destroy its imitation chocolate rabbits.', 'D) Defend itself in the country\'s commercial court.'],
 answer: 'C' },
 { id: '2025-12-S3-Q6',
 question: 'What does the news report say about the chocolate of the rabbits?',
 options: ['A) It could be reused in other products.', 'B) It could be resold cheaper to avoid waste.', 'C) It could be reshaped into animals other than rabbits.', 'D) It could be rewrapped and sold by the budget supermarket.'],
 answer: 'A' },
 { id: '2025-12-S3-Q7',
 question: 'Why did the Swiss manufacturer take the supermarket to court?',
 options: ['A) To be fair to the German supermarkets.', 'B) To protect chocolate retailers\' interests.', 'C) To prevent consumers\' possible confusion.', 'D) To boost the growth of the chocolate industry.'],
 answer: 'C' },
 ],
 },
 {
 id: '2025-12-S3-SecB-1', year: 2025, month: 12, setNumber: 3,
 label: 'Section B — Conversation 1 (Q8-11)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 423,
 transcript: `Can you please hand me that book over there? It has instructions for making a winter bean salad. My sister's boyfriend is coming over for dinner. He's vegetarian, so I need to make a lot of vegetable dishes. He only eats vegetables, no meat? That doesn't sound like a very balanced diet. How can he get enough protein? What does he do to strengthen his muscles and all that? Apparently, that's no problem. He's explained this to me when we first met. He eats a variety of different vegetables and nuts, especially those with high amounts of protein. It sounds a bit difficult, but he's done his research, I suppose. What's his reasoning for being vegetarian? Is it his religion, health condition, or lifestyle? He's an animal activist. He's always been very sensitive and sympathizes with animals. He's even written to his state senator about the torture of dolphins in sea parks. He says that keeping animals in zoos and parks causes them great distress. That's a little gloomy, but I can understand that to a point. Not all zoos and animal parks have the most favorable conditions, but without them, it just wouldn't be feasible to learn about animals and their environments. Besides, I don't think I could ever give up a good hot dog at a baseball game. Honestly, I agree, but just don't let him hear you say that. He's the spokesperson for his local animal rights group.`,
 questions: [
 { id: '2025-12-S3-Q8',
 question: 'What does the woman ask the man to do?',
 options: ['A) Pass a book to him.', 'B) Make a vegetable dish.', 'C) Return the handbook to him.', 'D) Meet his sister\'s boyfriend.'],
 answer: 'A' },
 { id: '2025-12-S3-Q9',
 question: 'What does the woman say about a vegetarian diet?',
 options: ['A) It doesn\'t sound practical for her.', 'B) It would do harm to one\'s muscles.', 'C) It would reduce one\'s protein intake.', 'D) It doesn\'t seem to be a balanced diet.'],
 answer: 'D' },
 { id: '2025-12-S3-Q10',
 question: 'Why does the man choose to be a vegetarian?',
 options: ['A) To improve his health.', 'B) To protect animal rights.', 'C) To stick to his religious belief.', 'D) To follow a trendy lifestyle.'],
 answer: 'B' },
 { id: '2025-12-S3-Q11',
 question: 'What do the speakers disagree on?',
 options: ['A) The torture and distress dolphins suffer in parks.', 'B) The urgency of joining an animal rights group.', 'C) The gloomy environments animals are kept in.', 'D) The necessity of having zoos and eating meat.'],
 answer: 'D' },
 ],
 },
 {
 id: '2025-12-S3-SecB-2', year: 2025, month: 12, setNumber: 3,
 label: 'Section B — Conversation 2 (Q12-15)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 599,
 transcript: `Did you see that television program on air travel last night? Yes, the part about overcoming jet lag was interesting. I was surprised that the expert recommended not eating for the entire journey and avoiding sleeping on the plane. I was too, as I read an article on the subject in the past that suggested the opposite. It claimed that it was important not to miss meals, and that taking a nap on the plane was the best way to adjust to a new time zone. Well, the expert on the show did cite research supporting her recommendations, so I guess I'll give it a try next time I fly a long distance. Jet lag is a big problem for me, and has been for the last few years, even though I never suffered from it before. Well, she did say that jet lag often becomes more of a problem after 40. So I guess I'm lucky that I can still adjust to different time zones well. My problem is I'm afraid to fly. Oh, I didn't know that. Actually, my mother is terrified of airplanes to the points where she can't even fly, so our family vacations were always by car or train. I'm not as bad as that. I just get anxious before I fly and feel nervous the whole time we're in the air, which is why I was hoping the television program would cover that topic more than it did. Yeah, that segment was too brief, especially as so many people have that problem. She said 20% of people are afraid to fly. Actually, it was a quarter of people, so the problem really is widespread and deserves attention.`,
 questions: [
 { id: '2025-12-S3-Q12',
 question: 'What part of the TV show impressed the woman most?',
 options: ['A) The part about not eating on board the plane.', 'B) The part about air travel in the past.', 'C) The part about getting over jetlag.', 'D) The part about avoiding sleeping on the plane.'],
 answer: 'C' },
 { id: '2025-12-S3-Q13',
 question: 'What does the woman intend to do?',
 options: ['A) Try following the advice given by the expert on the show.', 'B) Concentrate on reading articles recommended by experts.', 'C) Have meals as usual to stay away from hunger.', 'D) Take a nap to adjust to a new time zone.'],
 answer: 'A' },
 { id: '2025-12-S3-Q14',
 question: 'What do we learn about the woman?',
 options: ['A) She has been well treated when traveling.', 'B) She does not have to worry about jetlag.', 'C) She can spend a lot of time vacationing.', 'D) She does not have any problem flying.'],
 answer: 'B' },
 { id: '2025-12-S3-Q15',
 question: 'What does the man say about jetlag?',
 options: ['A) It affects twenty-five percent of people.', 'B) It has long been ignored by many experts.', 'C) It impacts female travelers more seriously.', 'D) It has caused heavy losses to many airlines.'],
 answer: 'A' },
 ],
 },
 {
 id: '2025-12-S3-SecC-1', year: 2025, month: 12, setNumber: 3,
 label: 'Section C — Passage 1 (Q16-18)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 814,
 transcript: `The most common question I'm asked always centers around how to get started in user experience design, to which my response is always that nothing can substitute real world experience. Building the skills required of a user experience designer takes time, patience, and commitment. Higher education is a great way to equip yourself with some core skills, but it will not prepare you for actual challenges your face with client work. In other words, being proficient with a design tool and a few methods doesn't make you a user experience designer. There simply isn't a one size fits all process. Being effective requires adaptability, something you don't really learn in school, much less in a six month training camp. It's gained through experience on the job and learning what's appropriate given the needs of the project. I found my way to user experience through graphic design and slowly over many different roles and experiences that led me to become a user experience designer. It took time and commitment to continue to pursue roles within teams that I knew could teach and challenge me. That's not to say that I think my path is the only one, but once again nothing can substitute real world experience. You can start anywhere as long as you know your end goal and you commit to actively pursuing opportunities to learn and grow along the way.`,
 questions: [
 { id: '2025-12-S3-Q16',
 question: 'What is the biggest challenge to starting a career in UX design according to the passage?',
 options: ['A) Learning from skilled designers.', 'B) Joining a 6-month training camp.', 'C) Obtaining real-world experience.', 'D) Anticipating actual challenges.'],
 answer: 'C' },
 { id: '2025-12-S3-Q17',
 question: 'What does the passage say employers look for in potential employees?',
 options: ['A) Core skills.', 'B) Higher education.', 'C) Capability.', 'D) Adaptability.'],
 answer: 'D' },
 { id: '2025-12-S3-Q18',
 question: 'What advice does the passage offer to those who want to start a career in UX design?',
 options: ['A) Face challenges.', 'B) Start anywhere.', 'C) Pursue roles in teams.', 'D) Follow their own path.'],
 answer: 'B' },
 ],
 },
 {
 id: '2025-12-S3-SecC-2', year: 2025, month: 12, setNumber: 3,
 label: 'Section C — Passage 2 (Q19-21)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 985,
 transcript: `For us flexible seating has meant removing most of the traditional chairs and desks and introducing a variety of different seating options to promote student engagement. The use of rows and their minimal adaptations to U shape were traditionally intended to maximize on task behavior and reduce distraction from the teacher. Teachers tend to still use this format because of either the need to control students or the belief that the teacher is the most important person in the room. Now our students have a range of different seating options including a floor desk, couches, stools, bean bags and the traditional desk and chair. From our experience so far flexible seating enhances student ownership of space and engagement and learning while reducing rates of student disengagement and disciplinary actions. It is a win for all concerned.`,
 questions: [
 { id: '2025-12-S3-Q19',
 question: 'What is the purpose of flexible seating in classrooms?',
 options: ['A) To allow students more freedom in their academic work.', 'B) To enable teachers to interact more with their students.', 'C) To engage students more in their learning.', 'D) To respond actively to students\' requests.'],
 answer: 'C' },
 { id: '2025-12-S3-Q20',
 question: 'What does flexible seating involve?',
 options: ['A) Rearranging most traditional chairs and desks.', 'B) Adopting a variety of different seating options.', 'C) Shifting from traditional teaching to task-based learning.', 'D) Using new furniture to create a comfortable environment.'],
 answer: 'C' },
 { id: '2025-12-S3-Q21',
 question: 'What is the outcome of the flexible seating program?',
 options: ['A) A change to teachers\' opinion of their students.', 'B) A harmonious relationship among its students.', 'C) A strengthened effect of its discipline.', 'D) A win for all people involved.'],
 answer: 'D' },
 ],
 },
 {
 id: '2025-12-S3-SecC-3', year: 2025, month: 12, setNumber: 3,
 label: 'Section C — Passage 3 (Q22-25)',
 audioSrc: '/audio/2025-12-S1.mp3',
 audioStart: 1166,
 transcript: `Dozens of British students arriving for their first day of school on Tuesday were sent home over their shoes. About 30 students were turned away from Taveram High School in Norfolk, England. Head teacher Dr Roger Harris confirmed that this was due to a change in the school's uniform policy. Harris, who became head teacher this year, said he notified parents of the updated rules in an email in June. The price of school uniforms can spark panic among families struggling with the high cost of living. Nearly all British schools have uniforms. They cost parents an average of 337 pounds per year for each secondary school child. According to the new rules, students of Taveram are required to wear smart black shoes appropriate for the workplace. Harris held that strengthened rules around school uniforms, improved student outcomes and behaviour. But for some parents, the school's restrictions are an unnecessary burden. As annual inflation climbs over 10%, many households are on tight budgets. Private rental prices in Britain rose 3.2% over the 12 months to July 2022. The largest jump since 2016. Soring energy bills have made things worse. Lucinda May, mum of a Taveram student, said that she had to ask her parents for 65 pounds to buy her child the correct pair of shoes. May said that the school's uniform policy show the lack of regard for parents dealing with the high cost of living.`,
 questions: [
 { id: '2025-12-S3-Q22',
 question: 'What was the problem with some students?',
 options: ['A) They arrived late for their first day of school.', 'B) They weren\'t informed of the school\'s updated rules.', 'C) They answered their headteacher\'s email in an impolite way.', 'D) They didn\'t wear the shoes required by the school\'s new policy.'],
 answer: 'C' },
 { id: '2025-12-S3-Q23', question: 'How did parents react to the school\'s decision?', options: ['A) Panic.', 'B) Anger.', 'C) Disputes.', 'D) Riots.'], answer: 'A' },
 { id: '2025-12-S3-Q24', question: 'What does the passage say about the school\'s new rules?', options: ['A) They rendered the school unique in the district.', 'B) They enhanced the positive image of the school.', 'C) They improved student behavior and performance.', 'D) They strengthened the school\'s discipline and order.'], answer: 'C' },
 { id: '2025-12-S3-Q25',
 question: 'What did one mother have to do as a result of the new policy?',
 options: ['A) Tighten her monthly budget.', 'B) Turn to her parents for help.', 'C) Borrow £65 from her friend.', 'D) Postpone paying her other bills.'],
 answer: 'B' },
 ],
 },
]

export default sections
