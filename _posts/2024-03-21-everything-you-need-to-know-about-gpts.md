---
layout: post
title: "Everything You Should Know About GPTs - Generative Pre-Trained Transformers"
categories: Machine Learning
author:
- Chaithanya Kumar A
---

## Table of Contents

1. [Introduction](#introduction)
2. [How Systems Like ChatGPT Are Built](#how-systems-like-chatgpt-are-built)
   - [Overview](#overview)
3. [Phase 1 Pre Training](#phase-1-pre-training)
   - [What are we actually doing In this stage by collecting all this data ?](#what-are-we-actually-doing-in-this-stage-by-collecting-all-this-data-?)
   - [Algorithm/Objective - Language Modelling](#algorithmobjectiveavodaish-modelling)
   - [Mathematical Formulation](#mathematical-formulation)
4. [Phase 2: Supervised Fine-Tuning (SFT)](#phase-2-supervised-fine-tuning-sft)
   - [Intuition Behind SFT](#intuition-behind-sft)
   - [SFT: Dataset](#sft-dataset)
   - [SFT: Algorithm / Objective](#sft-algorithm--objective)
   - [SFT: Mathematical Formulation](#sft-mathematical-formulation)
5. [Phase 3 & 4: Reinforcement Learning With Human Feedback](#phase-3--4-reinforcement-learning-with-human-feedback)
   - [Why RLHF?](#why-rlhf)
   - [What Is RLHF?](#what-is-rlhf)
   - [Reward Modelling](#reward-modelling)
   - [Reinforcement Learning](#reinforcement-learning)
6. [What Can These Models Currently Do?](#what-can-these-models-currently-do?)
7. [Signing Off](#signing-off)


# Introduction

Ever since Google dropped their paper on transformers - [***<mark>Attention Is All You Need</mark>***](https://www.wired.com/story/eight-google-employees-invented-modern-ai-transformers-paper/) It's been a crazy ride in the tech landscape especially in the field of AI/ML which is rapidly accelerating with some of the key players like [**OpenAI**](https://openai.com/blog/planning-for-agi-and-beyond) , **Google**[DeepMind](https://deepmind.google/discover/the-podcast/the-road-to-agi/) , [Anthropic](https://www.anthropic.com/) and the thriving Open Source community led by [Meta](https://llama.meta.com/) and [Xai](https://x.ai/blog/grok) working towards achieving the Goal Of ***Artificial General Intelligence (AGI).***

> *Now, if you're scratching your head and wondering what the heck AGI is, don't worry. You're not alone. In simple terms, AGI is the idea of creating a machine that can think and learn like a human. It's like giving birth to a super-intelligent robot baby.*

It seems like OpenAI is leading the race towards AGI and no one really knows for sure how long It'll take us before we reach that point ( some say it's around the corner like Elon Musk is pretty optimistic ***<mark>"AI will probably be smarter than any single human next year. By 2029, AI is probably smarter than all humans combined" </mark>*** and Yann Lecun ***<mark>" T</mark>*<mark>his notion of Artificial General Intelligence (AGI) is complete nonsense because human intelligence is very, very specialised" </mark>** )

![](/assets/GPTs/yann.avif)

Whatever the case maybe I truly believe we are going through one of the most fundamental and significant changes In the history of humanity through AI and we are In for one hell of a ride. *It's really an amazing time to be alive to witness this happening and be part of it and contribute In whatever way possible :)*

In this post I wanted to discuss about one such System that has captured the Imagination of so many People around the world : ***<mark>ChatGPT</mark>***

I assume that a System like ChatGPT has already somewhat become a part of your daily life either using It to bounce off your creative ideas and brainstorm with it , analyse a piece of long document , help fix a bug In your code or actually create your own AI mentor just like how I did and have access to the best minds In world. Trust me It's truly one of the best times to be alive

![](/assets/GPTs/aiteacher.avif)

But there's one thing that kind of stuck with me from the past few weeks was how people sometimes underestimate and largely overestimate the capabilities of such models. Whether the question of these Systems "has It really Impacted the lives of every Individual Or It Impacted only a handful of folks who are eager to try new tools and adopt Into their day-to-day lives? How has AI changed the way we work , collaborate and live?" may be It's a whole new topic altogether". **I believe there's a basic necessity for people to have an high level understanding of what these systems are , what can they do and what can't they do and what's likely going to be the future of It - that's exactly what I wanted to talk about In this post. Demystifying GPTs**

# How Systems Like ChatGPT Are Built

Let's dive In and understand what It really takes to create a model like ChatGPT and what are the key steps that are Involved. This post covers four Key Phases of ChatGPT Development and for each stage I'll cover

1. What exactly Is the Objective or Goal of each stage ?
    
2. What is the Intuition behind each stage?
    
3. Mathematical Representation ( For folks who want to get a sense of the technicalities )
    

### **Overview**

Let's have broader view of E2E development process of ChatGPT

![](/assets/GPTs/gptarchitecture.avif)

The summary of the above diagram : In order to create or build a model like ChatGPT and put Into the real world , you'll have to go through 4 Phases : **<mark>Pre-Training , Supervised Fine-Tuning , RLHF ( Reinforcement Learning From Human Feedback ) which involves Reward Modelling and Reinforcement Learning.</mark>**

Each of these stages will have a Dataset that we use to train the underlying model, the key Objective/Goal that is Involved , what exactly is the model we get once we train it on the data and generally how does the scale of the data look like. Before we Jump right into understanding these concepts , In summary the above diagram looks like the below meme

1. The Pre-trained model is a monster ( Pre-Training is done In an Unsupervised manner ) since we train this model on all sorts of the good and bad data that the Internet has ever seen like misinformation , clickbait info - You get what I mean when I say it's trained on Huge volumes of Internet data. - It's sometimes harmful or even dangerous to put this model directly into the world.
    
2. Then this monster was trained on a higher quality data annotated by the humans teaching it how to behave appropriately , hence the word supervising - just like a teacher supervising a student. OpenAI calls this process behaviour cloning , since you are demonstrating the model how to behave and the model clones to that behaviour.
    
3. Finally you have the RLHF stage where you just don't supervise the model , but also enable the model to make mistakes , learn from It's failures long enough that it's now tuned enough to be socially acceptable to be put into the real world. This the model that you , me and everyone else Is using.
    

![](/assets/GPTs/shoggoth.jpg)

Courtesy of x.com/anthrupad

## ***Phase 1 Pre Training***

Pre-Training is the phase-1 of building a model like ChatGPT. This is the phase where you collect large volumes of Internet data at scale which is of very low quality and build a foundational/base model called Pre-Trained LLM. The training dataset is a mixture of several sources ranging from Common Crawl of Internet , GitHub , Wikipedia and many sources. A model like LLaMA-2 from Meta uses almost 2-T tokens of Internet data for It's training. A 2 trillion token dataset is truly massive. To put It In perspective, If each token was a word and you printed out the dataset In books, you would have a library of around 4 million 500-page books. The below Is the data distribution of LLaMA model

![](/assets/GPTs/dd.avif)

so much of data Is being used to train these models that we might eventually run out of the data to train and likely need to rely on synthetic data generation or propriety data from companies ( Those companies which will get their hands on this data will surely have an edge)

![](/assets/GPTs/datasize.avif)


![](/assets/GPTs/scale.avif)

### ***What are we actually doing In this stage by collecting all this data ?***

Before we feed this raw text data (This Is called as the Training Data) Into the models we need to convert them Into something they are able to understand. Unlike humans , machines does not have the capability to understand what a word Is In It's raw form and hence they have to be converted Into something called tokens. ***<mark>This process of converting the text Into unique Integers or tokens is called Tokenization.</mark>***

You can think of tokens as a word , a character or even a sub-word of a word (Like -meda In Andromeda) depending on the model that is being used. Below is an example of how OpenAI GPT-4 tokenizer converts a text into set of unique Tokens. You can try It for yourself [<mark>here</mark>](https://platform.openai.com/tokenizer). All these Unique set of tokens becomes a Vocabulary for the GPT model and you can think of this as GPTs own dictionary. More the unique tokens It as access to , more the Variety In Generating the texts.

![](/assets/GPTs/tokenisation.avif)

***Algorithm/Objective* - *Language Modelling*** : The key objective In this phase Is to train this model on huge volume of low quality data so that It's able to accurately predict with a certain probability what's going to come next when an Input (Prompt) Is given by the users , i'e *<mark>predicting the next word/token</mark>*. Basically a Pre-Trained GPT Is optimised for ***<mark>Text Completion.</mark>*** This Is what Is called as Language Modelling.

***You Complete Me : Give A Prompt & Wait For Completion :)***

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1711007502683/dfe2e475-64d9-45bd-af5f-15a27693c3f0.gif align="center")

Let's explain this with a simple example :

![](/assets/GPTs/nn.avif)

Suppose let's say when you feed something like "What is your favourite" (Context of 4 words here) to the GPT model , It's trained to predict what's likely going to come next In order to complete the sentence with a higher probability. It can be anything like "Car" , "Movie" , "Sport" , "Colour" etc. The model takes one token at a time and predicts next one by looking at the entire context. You might think this Is very simple that the model Is just trying to predict next word/token , but In doing so It actually Is learning a lot more about the language and It's properties. *<mark>For example : when you feed the below Wikipedia article about Virat Kolhi , the model is able to understand a lot of underlying representations about Virat like his profession , gender , nationality , achievements and accolades etc. So you can Imagine how powerful these models are even though It's just predicting next word.</mark>*

![](/assets/GPTs/wiki.avif)

If you are Interested In knowing how these models are ( also one of the core reasons Is the more data and compute being thrown at these models ) getting better over time and want to know the underlying principle that guides, you can checkout my blog on [***<mark>Entropy : The Fundamental Force That Governs Everything In The Universe</mark>***](https://chaithanyak.com/entropy-the-fundamental-force-that-governs-everything-in-the-universe)***<mark>.</mark>***

Pre-Training Is the stage where most of the hard work happens , almost 85-98% of resources are likely to be used during this stage right from Data to Computation. This stage is almost similar to you working out  and sweating hard in the gym ( since you have Pre-trained It on huge volumes of data for months , now the model as a better understanding of the Data and It's relationships) and the subsequent stages are likely going to be super grateful for your help for making it easier for them. It’s like opening your creative boost of energy after a really good workout at the gym.

### ***Pre-Training : Mathematical Formulation***

`Machine Learning Task : Language Modelling i'e Predicting The Next Word`  
`Training Data Input : High Quantity , Low Quality Internet Data`  
`Scale : Order Of Millions Of Tokens. ex:- LLaMA-2 ~ 2T Tokens , GPT-3 ~ 0.5T Tokens`  
`Model Results From This Phase : Pre-Trained GPT / Base GPT`

---

![](/assets/GPTs/mfpt.avif)

> Pre-Training Summary
> 
> * Collect huge volumes of Internet text data. The quality of the Data Is low
>     
> * Convert the Data Into tokens which the model will be able to take as an Input
>     
> * Train the model which Is Optimised to Predict the next token In the sequence given a context of a certain length.
>     
> * The Next word prediction forces the model to learn a lot about the world.
>     
> * Resource Intensive : Massive amount of Data , 1000s Of GPUs , Years to Months of Training. Millions of $$$ of money spent :)
>     

## ***Phase - 2 : Supervised Fine-Tuning ( SFT )***

### ***Intuition Behind SFT ( Why SFT ? )***

During the Pre-Training stage we know that we train the model on a large body of text data with the key objective of predicting the next word by assigning a higher probability to the predicted word over other words in the vocabulary. By doing so the model is very capable of generating texts. The problem is these models are ***<mark>not good at "Communication" or In general generating texts that Is aligned with Interest of the user.</mark>***

When you prompt a Pre-Trained model with a question any of the following Is possible

* Answer The Question
    
* Generate a Series Of Additional Questions
    
* It Might Say It Was An Important Question That Was Raised In The Context Of .....
    

Ex : I Prompted Gemma-2B , an Open Source Pre-Trained GPT from Google.  
**Prompt : Which is the nearest star**  
**Response :**

![](/assets/GPTs/earth.avif)

So , now you get why cannot we use Pre-Trained models as It Is. Like we saw In the Pre-Training phase they are optimised for text completion. You can still get the desired output by changing the Input text In a way that will solve your problem ( This area Is called Prompt Engineering ! ) , but this Is not a convenient Interaction for folks who are not experts, you expect these models to the job and a model that can consistently answer the queries and not just complete them. ***<mark>Basically we need models that can behave how a human behaves when he/she Is asked with a Question Or we need models that Is optimised to achieve a specific task like Q &amp; A , Code Generation , Summarising and rewriting , rephrasing texts etc and we need to guide models towards this behaviour . This Is what we do In SFT.</mark>***

### ***SFT : Data Set***

How do you do that ? We know any kind of ML models mimic It's training data. Hence during SFT we fine-tune our Pre-Trained GPT model with a dataset that tells how to appropriately respond to a specific prompt( Like how to respond to a prompt for Q&A , translation etc). We create a High Quality dataset ( called demonstration data because through this data we demonstrate these models how to behave and respond properly). ***<mark>The way we do this Is by collecting a bunch of data annotated by humans ( these humans are experts In a specific area , ex: A Physics expert Is preparing the training data to create a model that responds properly when tasked with Physics questions ) In the following format </mark>*** `{ Prompt , Response }`  
Below Is the distribution of Prompts (Use-Case Specific) used by OpenAI to fine-tune a Pre-Trained GPT

![](/assets/GPTs/scale.avif)

This Is how the training data would look like

![](/assets/GPTs/scale.avif)

SFT is also called as [alignment](https://openai.com/research/instruction-following).

Look at the below example from OpenAI clearly showing the differences between the response from a Pre-Trained GPT V/s a SFT GPT

![](/assets/GPTs/scale.avif)

### SFT : Algorithm / Objective

Language modelling i’e optimised for text completion but for a specific use case as we discussed above In required format , nothing changes we are just changing out the training dataset.

### SFT : Mathematical Formulation

`ML Task : Language Modelling`

`Training Data Input : High Quality Data In { Prompt , Response }`

`Data Scale : 10K - 100K {Prompt , Response } Pairs`

`Model Input : Prompt`

`Model Output : Response For The Prompt ( Rather Than Just Completing )`

`Loss Function : Same Loss Function i;e Cross-Entropy`

> SFT - Summary
> 
> * Pre-Trained GPTs are not assistant based models i'e they are not good at communicating
>     
> * In SFT we create a dataset to teach GPTs how to communicate and respond towards a specific task
>     
> * High Quality dataset Is created by expert humans
>     
> * we then use this data to fine-tune the Pre-Trained GPT and Improve It's Performance
>     
> * These models can be trained on a weekly basis , less expensive to train compared to Pre-Training.
>     

## Phase 3 & 4 - Reinforcement Learning With Human Feedback

The real technical marvel of why ChatGPT models are so good at what they do Is mainly attributed to RLHF - Incorporating Reinforcement Learning and Human Feedback Into Language modelling.

### Why RLHF ?

There's no single valid reason In the AI community on why RLHF is needed. The simple answer Is It just Improves the Performance and Works. As we see In the below Image InstructGPT (RLHF + SFT ) outperforms SFT alone.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1711028760611/6f192cf2-493d-4209-9e14-362083a8b6e3.png align="center")

Here's a great In-depth note by [Yoav Goldberg](https://gist.github.com/yoavg/6bff0fecd65950898eba1bb321cfbd81) on why RL Is needed

> * *<mark>The Diversity Argument:</mark>* Supervised learning limits responses to specific demonstrator-provided answers, suppressing the natural diversity of language and potentially valid alternative expressions.
>     
> * *<mark>The Theoretical Argument:</mark>* RL allows for both positive and negative feedback, enabling learners to avoid misleading or incomplete demonstrations by directly querying for correctness, making the learning process more robust against adversarial or negligent demonstrators.
>     
> * ***<mark>The Core Argument:</mark>*** Supervised learning may inadvertently teach models to fabricate answers when they lack knowledge, while RL encourages truthfulness by penalising made-up answers and rewarding reliance on internal knowledge or choosing to abstain when uncertain.
>     
> * ***<mark>Teaching to Abstain:</mark>*** Supervised learning struggles to teach models to abstain from answering when they lack knowledge, whereas RL can be designed to reward "I don't know" responses appropriately, although finding the right balance in rewards is challenging.
>     

## What Is RLHF ?

We know that In SFT we teach the model how to behave and respond with appropriate answers to the prompts and essentially making them good at communication and dialogue. But just like how, say If you ask a question like "Explain Why The Sky Is Blue" to 10 different people , you might get 10 different answers, the SFT model also will generate many such different responses and we don't actually teach which response Is better than which In SFT.

### RLHF : How The Model Learns Which Is Good Vs Bad Response ?

The idea behind RLHF Is what If we have a scoring function that gives assigns a scalar score a response for a given Prompt? Then we use this scoring function to further fine-tune our SFT model In a way such that It always responds to a prompt such that It achieves highest score using the scoring function ( Reward Model). This Is exactly what we do In RLHF.

RLHF has 2 Phases

* **Reward Modelling**
    
    * Train a reward model that assigns a scalar score for how good or bad a response Is.
        
* **Reinforcement Learning**
    
    * Then fine-tune the SFT using the above reward model such that It gives highest score/reward for every response by SFT.
        

### Reward Modelling

In RM Phase we train an ML model that gives a score for a pair of `{Prompt , Response}.`

The biggest challenge In RM is getting the accurate data since the responses can significantly vary when someone Is asked to generate and also might be difficult sometimes. How can you generate a text when you are asked to write a short poem ( Haiku ) about the milky-way galaxy ?

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1711031106128/0eec532b-6efc-4adb-87b6-c7f869cc69cc.jpeg align="center")

This Is why In RM we basically collect the data by asking Humans to Rank the responses generated by a SFT model for each Prompt , because It's a lot easier to assign a rank rather than creating or generating a response. once this process Is done , we finally create the training data that Is needed to train our reward models which get's an Idea of What Is a good response V/s Bad response.

### RM : Data Set

The training data format In RM looks something like this `{Prompt , Winning_Response , Losing_Response }` and we call this data as the comparison data. we generate at-least 100K - 1M of these and eventually train the RM such that It gives a highest score for a response when give a prompt. But how do you do make a RM give a concrete scalar score? ***<mark>Just like how we can get our fellow humans to do basically anything given the right incentive and we train the RM to do anything given the right objective which Is our loss function.</mark>***

### RM : Algorithm / Objective

The key objective In RM is to train the model In such a way that the loss function ( Cross Entropy ) Is minimised over time. How do you do that ? By Maximising the difference In scores between the Winning\_Response and the Losing Response.

### RM : Mathematical Formulation

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1711034098420/6167f0fb-9c34-4729-94bb-65712bfb60ac.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1711034201594/afb56896-e880-4d4c-a9a4-04c3dbe44b25.png align="center")

### Reinforcement Learning

Reinforcement Learning Is the final stage of training a GPT model where you further fine-tune the SFT model such that for each given prompt It generates a response such that the reward model gives a maximum score.

OpenAI has a really good representation of the entire RLHF stage :

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1711034535602/da72e9e0-d4be-496e-bce0-7849f188f713.jpeg align="center")

Reinforcement learning Is still an active area of research currently being done by a few big Players like OpenAI , Google and Anthropic. It's still a concept that Is very new to me as well ( as of writing this blog ) and do not have much mathematical understanding of how exactly It works. If you are Interested In It checkout this blog by OpenAI on [***Learning From Human Preferences***](https://openai.com/research/learning-from-human-preferences) And [Proximal Policy Optimisation (PPO)](https://openai.com/research/openai-baselines-ppo)

> RLHF Summary
> 
> * SFT models does not know what response Is Good or Bad. Hence RLHF
>     
> * Train a reward model that learns how to assign a score given {Prompt , Winning\_Response , Losing\_Response } data.
>     
> * Use this reward model to further fine-tune the SFT model In a Reinforcement Learning environment such that for any prompt the model generates a response for which reward model assigns a higher score.
>     

This has really been amazing writing this piece of blog , there are still a lot of topics that I wanted touch base upon ( actually wanted to dig deep Into RLHF and learn the maths for better explanation , I'll probably do this sometime later ) like hallucination problem with ChatGPT , It's one dimensional knowledge and a lot more , bias, GPT OS , Jail-breaking GPTs and Prompt Injection etc . I'll try covering them In another blog.

### What Can These Models Currently Do ?

Finally I want to answer the question what can actually these models do given there nature of understanding huge volumes of the text data.

The current set of models are good at System 1 thinking , but not at System 2

> The automatic operations of System 1 generate surprisingly complex patterns of ideas, but only the slower System 2 can construct thoughts in an orderly series of steps.
> 
> – Daniel Kahneman in Thinking, Fast and Slow

System 1 thinking is a near-instantaneous process; It happens automatically, Intuitively, and with little effort. It’s driven by instinct and our experiences. System 2 thinking is slower and requires more effort. It is conscious and logical.

![Courtesy : Andrej Karpathy](https://cdn.hashnode.com/res/hashnode/image/upload/v1711036023653/a6dd2fed-fb7c-49e4-90b6-ca6f496fb966.png align="center")

Consider the above scenario , when asked the question 2+2 , we are able to quickly with a very little to no effort able to answer the question. where are when we are asked to compute 17\*24 , we do It In rather slow form since It's complex , needs bit of an effort and requires you to make some critical thinking sometimes. The current set of GPT models are really good at System 1 thinking but they lack System 2 thinking which Is something that Is needed In order to solve Complex Problems at hand.

### ***Signing OFF***

I hope you learnt something through this blog , the world of GPTs are truly fascinating and when you actually learn how these models are built and kind of have an Idea what's going to come In the coming years Is beyond crazy. I truly believe we live In a time where fundamentally humanity Is moving towards creating something that we have never seen before , the way we live , work and collaborate might change entirely. I believe the rapid advancements In AI Is fundamentally needed for the advancement of our Civilisation and Imagine the kind value It can bring particularly In the area of Medicine ( Imagine curing cancer , making people walk/talk who are not able to , giving vision to people who cannot see ) , Space for us becoming a multi-planetary civilisation and more than anything for me It's In the beauty of learning how these things work deep enough. It's Just fascinating.
