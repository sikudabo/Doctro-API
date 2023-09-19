const dataset = [
    {
      intent: "bot.whatiscovid",
      utterances: ["what is covid", "what is covid-19", "what is covid 19", "define covid", "define covid-19", "covid definition", "what is the definition of covid", "how would you define covid-19", "what is sars cov-2", "how is sars cov-2 defined", "sars cov-2", "sarscov2", "sars cov 2"],
      answers: [
        "covid definition"
      ],
    },
    {
        intent: "bot.whenWasCovidDiscovered",
        utterances: ["when did covid start", "when did the pandemic start", "when did the pandemic begin", "when was covid-19 discovered", "when was covid discovered", "which date was covid discovered", "what time was covid-19 discovered", "when did we learn about covid-19", "when did we learn about covid", "on which date did we find out about covid"],
        answers: [
          "covid discovered date"
        ],
    },
    {
        intent: "bot.covidSymptoms",
        utterances: ["what are the symptoms of covid", "what are common covid-19 symptoms", "symptoms of covid-19", "covid symptoms",  "what are the main covid symptoms", "what are signs of i have covid", "signs i have covid-19"],
        answers: [
          "covid symptoms"
        ],
    },
    {
        intent: "bot.typeOfDisease",
        utterances: ["which category of disease is covid", "which category of diseases does covid fall within", "type of disease is covid", "kind of disease", "kind of disease is covid", "kind of disease is covid 19", "how would covid be classified", "what kind of disease is covid-19", "what type of disease if covid", "is covid-19 a respiratory disease", "covid-19 kind of disease", "how would we classify covid-19", "covid classification", "covid sars type of disease", "kind of disease", "what kind of disease"],
        answers: [
          "type of disease"
        ],
    },
    {
        intent: "bot.whereDidCovidStart",
        utterances: ['where did covid start', 'where did covid begin', 'which country did covid begin in', 'which country started covid 19', 'location covid start it', 'which city did covid start in', 'original city covid started in', 'covid city', 'covid-19 first city', 'which city did covid-19 start in', 'which city did covid-19 begin in', 'what city had the first case of covid-19', 'which city had the first covid case'],
        answers: [
          "where did covid start"
        ],
    },
    {
        intent: "bot.totalDeaths",
        utterances: ["how many people have died from covid-19", "how many people have died from covid", "how many people have died from sars cov-2", "death toll", "what is the covid death toll", "total deaths from covid", "what is the amount of deaths from covid-19", "what is the amount of deaths from covid", "how many deaths from covid", "total deaths from covid", "covid-19 death toll", "covid-19 deaths total", "how many people have died from covid since the pandemic", "total number of covid deaths", "total number of deaths", "count of covid deaths", "how many have died from sars cov-2", "sars cov-2 death toll"],
        answers: [
          "death toll",
        ],
    },
    {
        intent: "bot.totalCases",
        utterances: ["how many covid-19 infections have their been", "how many people have been infected with covid-19", "how many infections have their been", "how many total covid-19 infections have their been", "how many people do we know have been infected with covid", "how many times has covid-19 been diagnosed", "how many have caught covid", "how many caught covid-19", "how many people caught the disease", "how many people have caught covid", "instances of covid", "instances of covid-19", "total cases", "how many covid-19 cases have their been", "total number of covid-19 cases", "covid 19 cases", "number of cases", "how many covid-19 cases have their been", "total number of sars cov-2 cases", "how many sars cov-2 cases", "total amount of confirmed cases", "how many covid-19 cases have their been", "total number of covid cases", "estimate of how many covid-19 cases there have been"],
        answers: [
          "total cases",
        ],
    },
    {
        intent: "bot.mostDeathsRegion",
        utterances: ["area with the most covid infections", "area with the most covid19 infections", "area with the most amount of infections", "area with the most covid deaths", "area has the most covid deaths", "which region has the most covid deaths", "which content has the most covid deaths", "most covid deaths by region", "which region has the highest death toll", "highest death toll by region", "which continent has the most covid deaths", "most covid-19 deaths continent", "continent with most covid deaths", "highest covid deaths region", "continent with highest death toll"],
        answers: [
          "continent most deaths",
        ],
    },
    {
        intent: "bot.leastDeathsByRegion",
        utterances: ["area with the least infections", "area with the least coronavirus infections", "area with the least covid19 infections", "which area has had the least covid deaths", "area with the least covid deaths", "which contenent has the fewest deaths", "which area has the fewest deaths", "which reigion has the fewest covid-19 deaths", "which region has the least covid-19 deaths", "which country has the least covid-19 deaths", "who has the least covid-19 deaths", "does africa have the least covid-19 deaths", "where have their been the fewest covid deaths", "where have their beeen the fewest deaths from covid-19", "which continent has the least covid-19 deaths", "which country has the least covid-19 cases", "which area has the fewest covid-19 cases"],
        answers: [
          "continent least deaths",
        ],
    },
    {
        intent: "bot.otherNames",
        utterances: ["what else is else is covid called", "what else is coronavirus called", "what is covid-19 also known as", "also known as", "what are other names for covid-19", "what are other names for covid 19", "other names for covid", "what are other names for covid", "synonyms for covid-19", "alternative names for covid", "other names for sar-cov-2", "other names for sars cov-2", "other names for 2019-nCoV", "synonyms for sars cov-2", "what are other names for the wuhan virus", "is wuhan virus a name for covid-19", "nicknames for covid-19", "what nicknames does covid-19 have", "which other names does covid-19 have", "what are other names for covid", "what are other names for caronovirus"],
        answers: [
          "other names",
        ],
    },
    {
        intent: "bot.mildSymptomPercentage",
        utterances: ["what percentage of the time are covid cases minor", "how often is covid not that serious", "how common are mild cases of covid", "how often are cases not that serious", "what are the chances a covid case will not be serious", "what percentage of people develop mild symptoms", "what % of people develop minor symptoms", "what are the odds of having mild symptoms", "how many people only have mild symptoms", "how many people have mild symptoms", "how often are covid cases mild or minor", "is it common to only have mild symptoms from covid", "how likely is it to have mild symptoms", "how common is it to only have mild symptoms", "is it probable to only have mild symptoms", "what percentage of the population has mild symptoms", "how many patients have mild symptoms", "how often is covid-19 mild", "how likely is it symptoms are mild if you get sick", "what are the odds a covid-19 case will be mild", "what are the chances covid will be mild", "what are the odds a covid case will be mild", "likelihood of mild illness", "what is the likelihood of mild illness", "what is the probability of mild illness", "is it common for covid symptoms to not be serious"],
        answers: [
          "mild illness",
        ],
    },
    {
        intent: "bot.severeSymptomPercentage",
        utterances: ["what percentage of the time are covid cases severe", "how often is covid serious", "how common are severe cases of covid", "how often are cases serious", "what are the chances a covid case will be serious", "what percentage of people develop severe symptoms", "what % of people develop servere symptoms", "what are the odds of having servere symptoms", "how many people have servere symptoms", "how many people have servere symptoms", "how often are covid cases servere", "is it common to only have servere symptoms from covid", "how likely is it to have servere symptoms", "how common is it to have servere symptoms", "is it probable to severe symptoms", "what percentage of the population has servere symptoms", "how many patients have servere symptoms", "how often is covid-19 servere", "how likely is it symptoms are servere if you get sick", "what are the odds a covid-19 case will be severe", "what are the chances covid will be severe", "what are the odds a covid case will be severe", "likelihood of severe illness", "what is the likelihood of servere illness", "what is the probability of servere illness", "is it common for covid symptoms to be severe"],
        answers: [
          "severe illness",
        ],
    },
    {
        intent: "bot.criticalaSymptomPercentage",
        utterances: ["what percentage of the time are covid cases critical", "how often is covid critical", "how common are critical cases of covid", "how often are cases critical", "what are the chances a covid case will be critical", "what percentage of people develop critical symptoms", "what % of people develop critical symptoms", "what are the odds of having crtical symptoms", "how many people have critical symptoms", "how many people have critical symptoms", "how often are covid cases critical", "is it common to only have critical symptoms from covid", "how likely is it to have critical symptoms", "how common is it to have critical symptoms", "is it probable to crtical symptoms", "what percentage of the population has critical symptoms", "how many patients have critical symptoms", "how often is covid-19 critical", "how likely is it symptoms are critical if you get sick", "what are the odds a covid-19 case will be critical", "what are the chances covid will be crtical", "what are the odds a covid case will be crtical", "likelihood of crtical illness", "what is the likelihood of critical illness", "what is the probability of critical illness", "is it common for covid symptoms to be crtical"],
        answers: [
          "critical illness",
        ],
    },{
      intent: "bot.asymptomaticSymptomPercentage",
      utterances: ["how many people are asymptomatic", "how often are people asymptomatic", "how often do people not hvae symptoms", "is it common for people to have no symptoms", "wnat percentage of people have no covid-19 symptoms", "what percentage of those infected are asymptomatic", "percentage of asymptomatic covid-19 cases", "how many people with covid-19 show no signs", "what percentage of the infected have no symptoms", "how many people have no covid-19 symptoms", "what percentage of people never show signts of being sick with covid", "what percentage of people are asymptomatic after being infected with covid 19", "percentage of people showing no covid-19 symptoms", "how many cases are asymptomatic", "how many people dont know that they have covid", "how likely is it to be asymptomatic with covid", "how common is it to be asymtomatic with covid", "what are the odds of an asymptomatic infection", "what is the probability of someone being asymptomatic", "probability of having an asymptomatic infection", "probability of being asymptomatic", "chance of being asymptomatic with covid-19"],
      answers: [
        "asymptomatic illness",
      ],
    },
    {
      intent: "bot.asymptomaticSpreadDisease",
      utterances: ["can you still spread covid if you are asymptomatic", "can someone without symptoms spread covid", "can someone spread covid even if they are not sick", "can someone spread the illness even if they are not showing symptoms", "can a person who seems healthy spread covid", "is there a risk of giving covid to someone even if you have no symptoms", "can someone who isnt sick spread covid", "can you spread covid even if you are not sick", "is it possible to spread covid without symptoms", "are asymptomatic people able to spread covid", "can i spread covid even if i feel healthy", "can i spread covid if i am not coughing", "can someone with no signs of covid spread it", "is it dangerous to be around someone without symptoms if they have covid", "is there a risk of spreading covid even if you dont have symptoms", "can asymptomatic people sprea covid-19", "is it dangerous to be around an asymptomatic person", "is it dangerous even if i have no symptoms", "can i spread covid even if im healthy", "can a healthy person spread covid-19", "is it risky to be around someone without symptoms", "how risky is it if someone is asymptomatic", "is there a risk of spreading covid if you are asymptomatic", "is covid dangerous if you are asymptomatic"],
      answers: [
        "can asymptomatic spread",
      ],
    },
    {
      intent: "bot.incubationPeriod",
      utterances: ["covid incubation period", "what are the odds of catching covid", "what is the onset time for covid", "what is the symptom onset time", "onset time for symptoms", "what is the incubation period for covid", "what is the incubation period for covid-19", "what is the incubation period for covid19", "when will you start experiencing symptoms with covid", "how long does it take to show symptoms", "when do people become symptomatic", "how long after infection do symptoms show", "how long after infection does it take for people to get", "when do people show signs of being sick", "how long does it take to show symptoms", "incubation period for covid", "how long does it take to get sick with covid", "when do people get sick with covid", "when will i show signs i am sick", "when does a person get sick with covid", "what is the onset period for covid", "when do people get sick with covid-19", "how long does it take to show symptoms", "how soon after infection does someone get sick"],
      answers: [
        "onset period",
      ],
    },
    {
      intent: "bot.longCovidDescription",
      utterances: ["what is longhaulers", "how do you dine long covid", "definition of long covid", "what is long covid", "how is long covid defined", "describe long covid", "define long covid", "what do i do if i have long covid", "how do i feel if i have long covid", "do my symptoms mean i have long convid", "how do i find out if i have long covid", "how do i know if i have long covid", "what are the symptoms of long covid", "what is long haulers", "how do i know if i have longhaulers", "what do i do if my symptoms persist", "why have my symptoms persisted", "why are my symptoms not getting better", "what do i do if i have long haulers", "definition of long covid", "how is long covid defined", "what does it mean if my symptoms wont go awaay", "persistent shortness of breath", "persistent breathing problems", "long term consequences of covid 19"],
      answers: [
        "long covid defined",
      ],
    },
    {
      intent: "bot.pregnancyRisk",
      utterances: ["what is the risk if you are pregnant", "what can happy to pregnant women", "pregnancy and covid", "pregnancy complications covid", "pregnancy and covid-19", "what are my risk if i am pregnant with covid", "is covid bad for pregnant women", "what are the dangers of being pregnant with covid", "can a fetus catch covid", "what happens if a pregnant woman is infected", "infected with covid while pregnant", "infected with covid-19 and pregnant", "pregnancy risk covid-19", "what happens if i am pregnant with covid", "what is the risk of being pregnant with covid 19", "pregnancy dangers", "can a baby be hurt if the mother is pregnant and has covid", "what can happen to a baby if the mother is infected", "what happens to an embryo if the mother is infected", "pregnancy risk from covid-19", "pregnac & covid 19", "what happens to pregnant women who have covid", "what should i do if am infected with covid while pregnant", "covid-19 pregnant", "what is the risk to pregnant women", "are pregnant women in danger if they are pregnant with covid", "what happens to pregnant women who have covid"],
      answers: [
        "pregnancy risk",
      ],
    },
    {
      intent: "bot.infectionComplications",
      utterances: ["can your liver be harmed after infection", "can your heart be injured from covid", "what can happen to your liver if you have covid", "covid and liver enzymes", "are there complications from covid-19", "are there complications from covid", "are there complications from getting infected", "covid compliactions aftwerwards", "secondary diseases from covid", "what are the complications associated with infection", "complications from covid-19 infection", "what are the complications from covid-19", "can i have complicationsf rom covid", "is my heart at risk from cocid", "is pneumonia a risk after covid-19", "what are the respiratory issues assocated with covid-19", "what are additional complications from infection", "what are the health complications that can come from covid", "which complications linger after covid", "which complications is a person at risk for after infection", "which complications might one have after infection", "what are some postinfection complications", "what are the post infection complications of covid", "what are the post infection complications of covid-19", "what are secondary complications after covid", "what are coexisting covid-19 complications", "which complications am i at risk from after covid", "what is the risk in terms of complications from covid", "am i at risk of other complications from covid"],
      answers: [
        "infection complications",
      ],
    },
    {
      intent: "bot.liverRisk",
      utterances: ["what is the risk to my liver from covid-19", "what is the risk of liver problems from covid", "what percentage of people have elevated liver enzymes after covid", "how many people have liver issues after covid", "can covid impact your liver", "can covid destroy your liver", "elevated liver enzymes after covid", "what can happen to your liver after infection", "can covid 19 injure your liver", "what percentage of people have liver issues after covid", "how many people have liver issues after infection", "percentage of people with liver complications after covid"],
      answers: [
        "liver risk",
      ],
    },
    {
      intent: "bot.covidCause",
      utterances: ["how is covid caused", "how is covid-19 caused", "how is coronavirus caused", "which strain causes coronavirus", "which strain causes covid", "which strand causes coronavirus", "which strand leads to covid", "which strain causes covid-19", "which strain of virus causes covid", "what causes covid", "what causes coronavirus", "what leads to coronavirus", "is covid sars", "leads to covid-19", "what causes covid-19", "what causes a covid infection", "what leads to a covid infection", "what happens that leads to covid", "what starts a covid infection", "cause of coronavirus", "cause of covid", "what causes someone to be infected with covid", "'what leads to a covid infection", "which virus causes covid19", "what virus causes covid", "which variant of sars causes a covid infection"],
      answers: [
        "covid cause",
      ],
    },
    {
      intent: "bot.transmission",
      utterances: ["how is covid transmitted", "how is coronavirus transmitted", "how is covid19 spread", "how does covid spread", "what makes coronavirus spread", "how do others get infected by covid", "how do others get infected by coronavirus", "why does coronavirus spread from one person to another", "can coronavirus spread indoors", "indoors transmission", "can singing spread covid", "can sneezing on someone cause covid", "can particles spread covid", "can sneezing on someone spread covid", "can you spread covid in a plane", "can droplets spread covid", "can droplets spread coronavirus", "how does a virus like covid spread", "when does a virus like covid 19 spread", "how does airborne transmission happen", "can covid be spread in the air"],
      answers: [
        "transmission",
      ],
    },
    {
      intent: "bot.entryPoints",
      utterances: ["which pathways does covid take to get in the body", "which pathways does covid take to get into the body", "which pathways put coronavirus in the body", "what pathways put covid in the body", "what are the pathways through the body to catch an infection", "pathways for covid to get in body", "what are the entry points from covid", "can you be infected through the nose", "can you be infected through the mouth", "can you be infected through the eyes", "can i bet infected through my mouth", "can i bet infected through my nose", "can i bet infected through my eyes", "where does covid enter the body", "how does covid enter the body", "how did covid enter my body", "where does covid enter", "what are the points of contact that leads to covid spreading", "where can covid enter the body", "how does covid get inside of the body", "where does covid go to get inside of the body", "can you get coronavirus through the eyes", "can you get infeced through the eyes", "can you get infected through the mouth", "can you get infected through the nose", "where can covid19 enter to infect you", "where can covid19 enter to infect me", "where can covid enter to infect a person", "routes for covid to enter the body"],
      answers: [
        "entry points",
      ],
    },
    {
      intent: "bot.infectiousness",
      utterances: ["when is someone most likely to spread covid", "when is someone most likely to spread coronavrius", "when is someone the most infectious", "when is someone most likely to spread covid", "during which timeframe is someone likely to spread covid", "when am i the most contagious", "when is someone the most contagious", "during which timeframe is someone contagious", "when is the peak infectiousness", "when is someone most likely to spread covid", "when is peak contagiousness", "when am i contagious", "when is someone contagious", "peak contagiousness", "peak spreading"],
      answers: [
        "infectiousness",
      ],
    },
    {
      intent: "bot.outsideViralDestruction",
      utterances: ["can cleaning prevent infection", "how can i clean to prevent covid", "which cleaning tools should i use to proect against covid", "what should i use to clean to prevent infection", "can cleaning stop the infection", "disinfectants covid", "uvc covid", "uv c covid", "can uvc kill covid", "can disinfectant kill covid", "what do disinfectents do agains covid", "what destroys covid outside of the body", "can soap destroy covid", "can soap destroy covid-19", "can soap destroy coronavirus", "what destroys covid outside of the body", "how do you protect surfaces from covid", "what destroys covid externally", "can heat destroy covid", "what does heat do to covid", "how to clean to protect covid", "what helps prevent infection outside of the body", "what keeps covid off of surfaces", "what protects surfaces from covid", "can cleaning alcohol get rid of covid", "what kills covid outside of the body", "hot to protect against covid in the home", "how to have a clean environment to prevent covid", "what can i do to have a cleaner environment against covid", "should you clean to prevent covid", "covid cleaning"],
      answers: [
        "outside viral destruction",
      ],
    },
    {
      intent: "bot.covidBats",
      utterances: ["did covid come from bats", "covid 19 and bats", "coronavirus and bats", "did coronavirus come from bats", "did sarscov2 come from bats", "sars and bats", "which animal did covid come from", "what animal did coronavirus come from", "bat covid relationship", "what is the relationship between bats and covid", "covid and bats", "which bird did covid come from", "did covid come from a bird", "did covid leap from an animal to humans", "covid and bats"],
      answers: [
        "covid bats",
      ],
    },
    {
      intent: "bot.whatIsAVariant",
      utterances: ["what is a covid variant", "what doe people mean by variant", "what is a variant", "what is the definition of a variant", "whaat is the definition of a covid-19 variant", "what ist he definition of the sarscov2 variants", "what are variants", "what do doctors mean by variant", "how do you define variant"],
      answers: [
        "what is a variant",
      ],
    },
    {
      intent: "bot.organMostEffected",
      utterances: ["what does covid 19 do to the lungs", "how does covid impact the lungs", "what does covid do to attack the lungs", "how does covid infect the lungs", "which organ is hurt the most by covid", "which organ does covid primarily attack", "which organ is affected the most by covid", "which organ does coronavirus affect the most", "which part of the body is most affected by covid", "which organ is most affect by covid19", "which organ is most impacted by coronavirus", "which organ is hit hardest by covid", "which organ is at the most risk for covid", "are your lungs in danger from covid", "what is the risk to your lungs", "how does covid impact my lungs", "how does coronavirus impact my lungs", "what happens to my lungs with covid", "which organ is damaged the most by covid", "primary organ impacted", "primary organ effected"],
      answers: [
        "organ most effected",
      ],
    },
    {
      intent: "bot.organsImpacted",
      utterances: ["which organs does covid19 hit the hardest", "which organs does covid 19 attack", "what is the pathophysiology of covid 19", "which organs are impacted the most", "which organs are most affected by covid 19", "which organs are most affected by coronavirus", "which organs are most impacted by covid", "which organs are hit the hardest by covid", "how many organs are impacted by covid", "what are the main organs affected by covid 19", "which organs are the most impacted by covid19"],
      answers: [
        "organs impacted",
      ],
    },
    {
      intent: "bot.respiratoryImpact",
      utterances: ["how does covid impact the respiratory system", "what is the impact to the respiratory system", "how is the respiratory system impacted", "how does covid attack the respiratory system", "how is the respiritory system affected", "respiratory affect", "affect on respiratory system", "how is the respiratory system damaged", "what does coronavirus do to the respiratory system", "how does coronavirus target the respiratory system", "what does coronavirus do to the respiratory system"],
      answers: [
        "respiratory impact",
      ],
    },
    {
      intent: "bot.nervousSystemImpact",
      utterances: ["what does covid19 do to the nervous system", "how does covid impact the nervous system", "impact on nervous system", "does covid harm the nervous system", "does coronavirus harm the nervous system", "what happens to the nervous system", "nervous system affected", "nervous system effected", "how does covid harm the nervous system", "what will covid do to my nervous system", "covid and the nervous system", "how is my nervous system impacted by covid"],
      answers: [
        "nervous system impact",
      ],
    },
    {
      intent: "bot.brainImpact",
      utterances: ["how does covid affect the brain", "brain impact", "how does covid effect the brain", "how does coronavirus impact the brain", "how is the brain attacked", "what does covid do to the brain", "how does covid harm the brain", "does covid impact the brain", "does covid19 affect the brain", "what happens to the neuroligcal", "how does covid impact someone neurologically", "brain tissue", "can you lose brain tissue from covid", "does covid harm the brain", "how does covid harm brain", "brain with covid", "what does covid do to the brain", "how is the brain impacted by covid", "why does covid impact the brain", "is there evidence that covid impacts the brain"],
      answers: [
        "brain impact",
      ],
    },
    {
      intent: "bot.gastroIntestinal",
      utterances: ["gastrointestinal", "what does covid do to the intestines", "what is the impact on the intestines", "how does covid impact the gastro system", "does covid harm the gastro system", "will covid harm my intestines", "will covid19 mess up my intestines", "what does covid do to my intenstines", "bowel movements", "does covid cause diarrhea", "why does covid cause diarrhea", "loose stool", "loose stools", "does covid cause loose stoos", "intestinal damage", "intestinal impact from covid"],
      answers: [
        "gastrointestinal impact",
      ],
    },
    {
      intent: "bot.spikeProtein",
      utterances: ["what is a spike protein", "spike protein definition", "what is a covid spike protein", "define a spike protein", "how is a spike protein defined", "what is a spike protein", "how do we define spike proteins", "can you tell me the definition of a spike protein", "define a spike protein"],
      answers: [
        "spike protein defined",
      ],
    },
    {
      intent: "bot.covidDiagnosis",
      utterances: ["how is covid diagnosed", "diagnosing covid", "how is covid 19 diagnoses", "how is covid19 diagnosed", "how do i get diagnosed for covid", "diagnosing covid", "can a ct scan diagnose covid", "is a ct scan used to diagnose covid", "can i found out if i had covid", "how is covid tested for", "can i find out if i have antibodies", "is there an antibody test", "can i know if i had a previous covid infection", "finding out if i have been infected", "is there a test to see if someone has had covid", "test to see if someone had had covid", "test to see if someone caught covid", "how can i know if i caught covid", "can people know if they had a previous infection", "nasal swab testing", "is a nasal swab used to diagnose covid", "ct xray", "ct xrays", "is there a test for covid", "how is covid 19 tested for", "how is covid19 tested for", "imaging test", "how is an imaging test done", "how is covid tested for", "which methods are used to test covid", "how is it diagnosed", "how is covid19 diagnosed", "can covid be diagnosed", "diagnose covid", "diagnose covid19", "diagnose covid 19", "hoow long does it take for covid diagnosis result", "how long does it take for covid test results", "time for covid19 test results", "time for covid 19 test results", "time for covid test results"],
      answers: [
        "diagnosing covid",
      ],
    },
    {
      intent: "bot.covidPrevention",
      utterances: ["prevent covid", "prevent covid 19", "prevent covid19", "how can i prevent covid", "how can i prevent covid 19", "how can i prevent covid19", "preventing covid", "prevention methods", "how do i prevent from having covid", "can can i avoid catching covid", "avoid infection", "avoiding infaction", "how can i prevent covid", "preventing covid", "prevention methods", "how to stay safe from covid", "avoid infection", "how to avoid infection", "how to avoid getting covid", "how to avoid the virus", "how to protect against infection", "how to protect against covid", "how to protect against covid19", "how to defend against covid", "how to not get covid", "how to build a healthy immune system", "avoid catching covid", "how to not catch covid", "protection against catching covid", "protection against covid", "avoid getting sick", "avoid catching covid", "how to avoid covid"],
      answers: [
        "covid prevention",
      ],
    },
    {
      intent: "bot.vaccineQuestion",
      utterances: ["should i get vaccinated", "does the cdc recommend getting vaccinated", "which vaccine should i get", "does the cdc want people to be vaccinated", "is it a good idea to get vaccinated", "do doctors recommend the vaccine", "who should get vaccinated", "should i get vaccinated", "can vaccinated", "should i get the jab", "is the jab recommended", "who does the cdc say should be vaccinated", "should people be vaccinated"],
      answers: [
        "vaccine question",
      ],
    },
    {
      intent: "bot.recommendedVaccines",
      utterances: ["which vaccines are approved by the fda", "fda approved vaccines", "what vaccines are approved by the fda", "vaccines with fda approval", "fda approved vaccines", "fda recommended vaccines", "which vaccine should a person get", "what vaccine should a person get", "what vaccines are popular", "which vaccines are popular", "popular vaccines", "which vaccinees does the cdc recommend", "recommended vaccines", "recommended vaccines in the united states", "recommended vaccines in america", "which vaccine to get", "which covid 19 vaccine", "which vaccines are there", "what vaccine should i get", "which vaccine should i get", "what are my vaccine options", "what are my vaccine choices", "best vaccine", "best vaccine to get", "top vaccine", "top covid vaccine", "top covid19 vaccines", "most popular vaccines", "should i get the pfizer vaccine", "should i get the moderna vaccine", "should i get the pfizer or moderna vaccine", "should i get the moderna or pfizer vaccine"],
      answers: [
        "recommended vaccines",
      ],
    },
    {
      intent: "bot.vaccineDeathsPrevented",
      utterances: ["does vaccination protect you", "is the vaccine protective", "how does the vaccine change the odds of death:", "can boosters increase survival rates", "can boosters increase chances of survival", "should i get a booster dose", "should i get a booster vaccine", "how many deaths did covid vaccines prevent", "how many deaths did covid19 vaccines prevent", "how many deaths did vaccines prevent", "how many deaths were prevented by the vaccine", "number of deaths prevented from vaccine", "does vaccination prevent deaths", "can vaccination increase chances of survival", "does vaccination prevent deaths", "chances of living if vaccinated", "chances of living if unvaccinated", "do i have a higher chance of dying if unvaccinated", "chances of living if unvaccinated", "chances of catching covid if unvaccinated", "chances of getting covid if vaccinated", "odds of getting covid unvaccinated", "odds of getting covid if vaccinatd", "odds of survival with vaccine", "odds of survival without vaccine", "chances ill die without vaccine", "chance ill live with vaccine", "chance ill die without vaccine", "chance ill die with vaccine", "how likely am i to die if i am not vaccinated", "how likely am i to live if vaccinated"],
      answers: [
        "vaccine deaths prevented",
      ],
    },
    {
      intent: "bot.totalVaccineDoses",
      utterances: ["how many vaccine doses have been administered", "how many vaccines have been given", "how many doses of the vaccine havee been given", "how many shots have been given", "how many vaccinations given world wide", "How many vaccines have been taken", "how many doses of the vaccine have been given", "how many doses of the covid19 have been taken", "how many vaccine doses have been administered", "number of vaccine doses given", "how many vaccine doses given"],
      answers: [
        "total vaccine doses",
      ],
    },
    {
      intent: "bot.whyMask",
      utterances: ["can wearing a mask prevent illness", "can wearing a mask prevent the spread", "can wearing a mask protect other people", "can wearing a mask protect", "why do people wear masks", "does wearing a mask stop covid", "why is it a good idea to mask", "should i mask", "should kids wear a mask", "why mask", "should i wear a mask", "does wearing a mask prevent covid", "does wearing a mask prevent covid19", "does wearing a mask prevent covid 19", "does wearing a mask protect against covid", "does wearing a mask protect against covid19", "does wearing a mask protect against covid 19", "does masking protect you", "will masking protect me", "does masking stop the spread", "does masking protect people", "can wearing a mask help", "why do people wear masks", "should i wear a mask", "should i wear a mask to proteect against covid", "do masks help", "is there value in wearing a mask", "is there value in masking", "why should i mask", "why should people mask", "can a mask help me", "do masks help people"],
      answers: [
        "why mask",
      ],
    },
    {
      intent: "bot.J&j",
      utterances: ["why is the johnson & johnson vaccine not recommended", "why is the j&j vaccine not recommended", "johnson and johnson", "johnson & johnson", "j&j", "j and j", "what are the dangers of the j&j vaccine", "what are the dangers of the johsnon & johnson vaccine", "what is the problem with johnson & johnson", "what are the problems with the j&j vaccine", "can you get blood clots from the covid19 vaccine", "can you get blood clots from the covid 19 vaccine", "can you get blood clots from the covid vaccine", "why is the j&j vaccine not recommended by the cdc", "can you get blood clots from vaccination", "is the vaccine associated with blood clots", "is there a risk of blood clots from the johnson & johnson vaccine", "are there blood clots from the johnson and johnson vaccine", "what is the problem with the johnson & johnson vaccine", "complications from the johnson and johnson vaccine", "why is the johnson and johnson vaccine dangerous", "why is the johnson and johnson vaccine not approved", "is the johnson and johnson vaccine recommended", "is the j&j vaccine recommended", "should someone get the j&j vaccine", "should someone get the johnson & johnson vaccine", "should someone get the j&j vaccine"],
      answers: [
        "j&j vaccine",
      ],
    },
    {
      intent: "bot.shouldNotGetVaccine",
      utterances: ["who shouldnt get vaccinated", "who should not get the vaccine", "who should avoid the covid19 vaccine", "should not get the covid 19 vaccine", "who should not get vaccinated", "should i get the vaccine if i am allergic to mrna vaccines", "what if i am allergic to mrna vaccines", "allergic to mrna vaccines", "who should avoid vaccination", "who cannot get vaccinated", "what if someone is allergic to mrna vaccines", "who cannot get vaccinated", "who cannot get the covid19 vaccine", "who cannot receive the covid vaccine", "who should avoid the covid 19 vaccine", "allergic to vaccines", "what if i am allergic to vaccines", "what if someone is allergic to vaccines", "what if my child is allergic to vaccines", "what if i am allergic to injectables", "allergic to injectables", "should people allergic to injectables get the vaccine", "what if i am allergic to injectables"],
      answers: [
        "should not get vaccine",
      ],
    },
    {
      intent: "bot.covidTreatments",
      utterances: ["medications to treat", "which treatments are available for", "which medicationsa are available for", "medications to take", "which medications should i take for", "which medications can i take", "which treatments should i take", "what treatments are there for covid19", "what treatments are there for covid 19", "what treatments are there for covid", "which treatments are there for covid19", "which treatments are there for covid 19", "which treatments are there for covid", "what medications treat covid 19", "which medications fight covid", "what medications should i take", "medications i should take for covid", "medications to fight covid", "covid medications", "fda approved medications", "fda approved treatments", "which medications has the fda approved", "fda approved medications for covid", "medications for covid", "medications for covid19", "medications for covid 19", "what medications can i take", "can convalescent plasma treat covid", "can i use convalescent plasma", "can remdesivir treat covid", "can remdesivir treat covid19", "can remdesivir treat covid 19", "can molnupiravir treat covid 19", "can molnupiravir treat covid", "can molnupiravir treat covid19", "nirmatrelvir covid", "can nirmatrelvir tream covid 19", "can nirmatrelvir tream covid19", "can nirmatrelvir tream covid", "ritonavir covid", "can ritonavir treat covid", "ritonavir covid", "can ritonavir treat covid19", "ritonavir covid", "can ritonavir treat covid 19", "medications that treat covid 19", "treatment for covid 19", "treatment for covid19", "treatment for covid", "treatments for covid 19"],
      answers: [
        "covid treatments",
      ],
    },
    {
      intent: "bot.usDeathToll",
      utterances: ["how many people have died from covid19 in the us", "how many people have died from covid in the united states", "number of people who died from covid in the united states", "united states death toll", "covid deaths in the united states", "total covid deaths in the united states", "amount of people who died from covid in the us", "total patient deaths from covid in the united states", "total covid deaths in the us", "deaths in the us from covid", "how many lives lost in the us from covid", "death toll in the us", "death toll in the united states", "united states death toll", "us death toll"],
      answers: [
        "us death toll",
      ],
    },
    {
      intent: "bot.covidRiskFactors",
      utterances: ["which pre existing conditions", "what are the risk factors for having a bad response to covid 19", "what are the risk factors for having a bad response to covid", "what are the risk factors for having a bad response to covid19", "can smoking lead to worse covid outcomes", "how does smoking impact covid 19 outcomes", "are smokers at a greater risk of dying from covid", "how does smoking impact your covid response", "how does smoking impact covid mortality", "how does smoking impact covid morbidity", "how does obesity impcat covid outcomes", "can obesity lead to worse covid outcomes", "how does obesity impact covid", "what is the prognosis for covid 19", "who is at greater risk of dying from covid", "which risk factors are associated with bad covid outcomes", "which risk factors lead to bad covid outcomes", "what is the risk of dying from covid if you smoke", "what is the risk of dying from covid if you are obese", "who is at risk of dying from covid", "who has a greater risk of dying from covid", "do i have a greater risk of dying from covid", "whhich preexisting conditions lead to covid", "who is at risk of developing a serious infection from covid"],
      answers: [
        "covid risk factors",
      ],
    },
    {
      intent: "bot.covidChildren",
      utterances: ["how does covid 19 impact children", "how does covid19 impact children", "how does covid impact children", "how does covid 19 impact kids", "how does covid19 impact kids", "how does covid impact kids", "children and covid", "kids and covid", "how does covid 19 impact babies", "how does covid19 impact babies", "how does covid impact babies", "how does covid impact toddlers", "how does covid19 impact toddlers", "how does covid 19 impact toddlers", "children with covid 19", "are kids at risk of dying from covid", "are kids are risk of dying from covid19", "are kids at risk of dying from covid 19", "how are children impacted by covid", "is my child in danger from covid 19", "how likely is a child to die from covid 19", "child covid", "children covid", "babies covid", "toddlers covid", "kids covid", "kid covid", "what affect does covid have on children", "affect on children", "affect on kids", "effect on children", "effect on kids", "covid response from children", "covid response from kids", "covid risk for children", "covid risk for child", "covid risk for baby", "covid risk for kid", "covid risk for toddler", "kid", "child", "toddler", "baby"],
      answers: [
        "covid children",
      ],
    },
    {
      intent: "bot.covidImmunity",
      utterances: ["why are some people immunine from covid", "how does a person become immunine", "why are some people immune", "covid immunity", "immunity from covid", "how do i become immunine from covid", "how do i build up my immunity", "can someone be immune from covid", "how does immunity work", "how do you become immune to covid", "does natural immunity work", "how does one acquire natural immunity", "what is natural immunity", "is natural immunity real", "is there a such thing as natural immunity", "how does a population get natural immunity", "does natural immunity exist with covid 19", "is there a such thing as natural immunity", "can there be natural immunity with covid19", "covid 19 natural immunity", "covid natural immunity", "covid19 natural immunity"],
      answers: [
        "covid immunity",
      ],
    },
    {
      intent: "bot.usTotalCases",
      utterances: ["how many covid 19 cases have their been in the united states", "how many covid19 cases have their been in the united states", "how many covid cases have their been in the united states", "how many covid19 cases have their been in the us", "how many covid19 cases have their been in the us", "how many covid cases have their been in the us", "us total cases", "united states total cases", "how many people have been infected with covid 19 in the united states", "how many total infections have their been in america", "how many americans have had covid", "total number of americans who have contracted covid", "how many people in america have contracted covid", "total amount of people in the united states that have contracted covid", "us contracted covid", "how many people in america contracted covid", "total amount of americans who have caught covid", "how many people in the united states have caught covid", "total number of people in the united states who have caught covid", "how many people in america caught covid", "total number of americans who have been sick with covid", "how many americans have been sick with covid", "aggregate number of americans who have been sick with covid", "how many people who live in the united states have contracted covid"],
      answers: [
        "us total cases",
      ],
    },
    {
      intent: "bot.deathRate",
      utterances: ["what is the covid death rate", "covid19 death rate", "what is the covid 19 death rate", "what is the covid death rate", "what is the mortality rate", "covid mortality rate", "covid 19 mortality rate", "covid19 mortality rate", "what is the mortality rate in the us", "what is the global mortality rate", "what is the global death rate", "what is the death rate in the united stats", "death rate", "mortality rate", "what is the morality rate"],
      answers: [
        "mortality rate",
      ],
    },
];

module.exports = dataset;