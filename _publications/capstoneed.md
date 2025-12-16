---
layout: page
title: CapstoneED
description: >
    A gamified peer-assessment platform designed to make continuous feedback simpler and fiction free, while providing early warnings for lecturers.
date: 2 Aug 2017
image: 
  path: /assets/img/publications/capstoneed/preview.png
links:
    - title: API Repository
      url: https://github.com/harrybournis/capstoneED-api
---

Capstone projects are long-term group projects that the Computer Science
students have to complete in their final year of studies. CapstoneED is a
peer-assesement platform that aims to assist both students and lecturers in such
projects. In this page I will go over some of the core ideas for the system, but
there is so much more (in fact 2 dissertations worth of more) that I cannot
cover everything here.

Students get frequent requests to complete gamified, fast acitvities in order to
provide information about their experience with the project. Lecturers on the
other hand get aggragate views from all their students/teams which allows them
to be proactive when potential issues arise. This page focuses primarily on the
student experience.

The application is split into 3 core parts; the api and two separate frontends
for students and lecturers. Please be aware that the frontend was developed
during Angular's infancy and was our first endeavor into a large system. As such
both the Angular team and ourselves were figuring things out, and sometimes we
diverged from what is now considered best practice.

* [Rails API](https://github.com/harrybournis/capstoneED-api)
* [Frontend Common](https://github.com/iboutsikas/capstoneed-common)
* [Student App](https://github.com/iboutsikas/capstoneed-student)
* [Lecturer App](https://github.com/iboutsikas/capstoneed-lecturer)

As of December 2025 I am in the process of bringing the project into Angular 20+
{:.note}

## The bird's eye view
The primary driving force behind this project is that capstone projects are
long, and asking students to recollect their semester or year long experience
right at the end of such a project is more often than not seen as a chore.
Usually, students want to be done with a project by that time as there finals
comming up. In addition to that, having a single point of evaluation/reflection
is extremely prone to [recency
bias](https://en.wikipedia.org/wiki/Recency_bias).

Instead we aim to make it easy for students to give frequent feedback throughout
the project, through a game where the various teams compete with each other.
This game can directly correlate to the grade process as well as provide proof
of the student's work. We also made everything web accessible as it is generally
easier to just go to your portal and log your hours worked, complete your
activities, etc instead of having to keep track everything in an Excel sheet for
the end of the project.

## The "game"
Let's say that there is a Web Development class, and their capstone project is
to make a website for a "client". Students would split into a number of teams
(one for each "client") and in the scope of CapstoneED these teams would
participate in one "game". The goal of this game is to accumulate points by
participating in the CapstoneED system, with the assesments and the feedback we
have already briefly mentioned, but also through activities such as logging your
work on your project.

![](/assets/img/publications/capstoneed/game-progress.png)
{:.centered}
Example game progress for the above scenario
{:.figcaption}

The above image shows a possible example of our imaginary Web Development class.
All data has been auto-generated for demo purposes. Students also get an
overview of the project's progress as shown below. The iterations are
dynamically defined by the lecturer and should be made to fit the desired
educational outcomes.

![](/assets/img/publications/capstoneed/project-status.png)
{:.centered}
Example project status
{:.figcaption}

## Peer assessment
The goal of a peer assessment is to provide some feedback to your teammates but
also to the lecturer about how the team is doing. In the following examples I
will have multiple questions in each assessment but that is all configurable by
the lecturer at any point, and the goal should be to have a very short to
complete form.

We start with a range-type question where the student is asked assign each team
member to a color where red is the minimum asignable value and green is the maximum.
The zones that are assignable are configured by the lecturer.
![](/assets/img/publications/capstoneed/peer-assessment1.png)
{:.centered}
A range type question
{:.figcaption}

I am personally proud of the WizardComponent (aka Stepper) shown here as it was
completely implemented from scratch, with a very dynamic API making use of
Angular's content projection.
{:.note}

Next type of possible questions is the rank type question. In the range type it
is possible to give everyone the same value (i.e. everyone did an excelent job).
In ranking however, a distinct choice must be made for each member -- which is
also why we recommend sparing use of this type.

![](/assets/img/publications/capstoneed/peer-assessment2.png)
{:.centered}
A tank type question
{:.figcaption}

The final type is a simple feedback form where the student could leave specific
comments for each team member.
![](/assets/img/publications/capstoneed/peer-assessment3.png)
{:.centered}
A feedback type question
{:.figcaption}

## Log tracking
Another activity we wanted to simplify was tracking how much work each student
is doing on the project. The log system is not intended to be a 100% source of
truth as we understand that some times, doing the work is what actually matters.
To that end we aimed to simplify the process as much as possible, and to make it
accessible from a mobile device so it can be done whenever the student has the
time.

<div class="photo-sides">
  <img  src="/assets/img/publications/capstoneed/new-log.png"/>
  <img  src="/assets/img/publications/capstoneed/new-log-mobile.png"/>
</div>

View of creating a new log entry in desktop and mobile
{:.figcaption}