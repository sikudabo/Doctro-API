const dataset = [
    {
      intent: "bot.whatiscovid",
      utterances: ["what is covid", "what is covid-19", "define covid", "define covid-19", "covid definition", "what is the definition of covid", "how would you define covid-19", "what is sars cov-2", "how is sars cov-2 defined", "sars cov-2", "sarscov2", "sars cov 2"],
      answers: [
        "covid definition"
      ],
    },
    {
        intent: "bot.whenWasCovidDiscovered",
        utterances: ["when was covid-19 discovered", "when was covid discovered", "which date was covid discovered", "what time was covid-19 discovered", "when did we learn about covid-19", "when did we learn about covid", "on which date did we find out about covid"],
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
        utterances: ["how many times has covid-19 been diagnosed", "how many have caught covid", "how many caught covid-19", "how many people caught the disease", "how many people have caught covid", "instances of covid", "instances of covid-19", "total cases", "how many covid-19 cases have their been", "total number of covid-19 cases", "covid 19 cases", "number of cases", "how many covid-19 cases have their been", "total number of sars cov-2 cases", "how many sars cov-2 cases", "total amount of confirmed cases", "how many covid-19 cases have their been", "total number of covid cases", "estimate of how many covid-19 cases there have been"],
        answers: [
          "total cases",
        ],
    },
    {
        intent: "bot.mostDeathsRegion",
        utterances: ["which region has the most covid deaths", "which content has the most covid deaths", "most covid deaths by region", "which region has the highest death toll", "highest death toll by region", "which continent has the most covid deaths", "most covid-19 deaths continent", "continent with most covid deaths", "highest covid deaths region", "continent with highest death toll"],
        answers: [
          "continent most deaths",
        ],
    },
    {
        intent: "bot.leastDeathsByRegion",
        utterances: ["which contenent has the fewest deaths", "which area has the fewest deaths", "which reigion has the fewest covid-19 deaths", "which region has the least covid-19 deaths", "which country has the least covid-19 deaths", "who has the least covid-19 deaths", "does africa have the least covid-19 deaths", "where have their been the fewest covid deaths", "where have their beeen the fewest deaths from covid-19", "which continent has the least covid-19 deaths", "which country has the least covid-19 cases", "which area has the fewest covid-19 cases"],
        answers: [
          "continent least deaths",
        ],
    },
    {
        intent: "bot.otherNames",
        utterances: ["what are other names for covid-19", "what are other names for covid 19", "other names for covid", "what are other names for covid", "synonyms for covid-19", "alternative names for covid", "other names for sar-cov-2", "other names for sars cov-2", "other names for 2019-nCoV", "synonyms for sars cov-2", "what are other names for the wuhan virus", "is wuhan virus a name for covid-19", "nicknames for covid-19", "what nicknames does covid-19 have", "which other names does covid-19 have", "what are other names for covid", "what are other names for caronovirus"],
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
];

module.exports = dataset;