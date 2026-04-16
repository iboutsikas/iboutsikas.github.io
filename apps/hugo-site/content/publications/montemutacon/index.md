---
title: "MonteMutacon"
description: >
  A machine learning library using Monte Carlo tree search to generate adversarial samples
  for training machine learning-based anti-viruses.
date: 2021-07-13
type_label: "Preprint"
venue: "12 Malware Techinical Exchange Meeting (MTEM)"
authors:
  - Ioannis Boutsikas
  - M. E. Eren
  - Charles K. Varga
  - Edward Raff
  - Cynthia Matuszek
  - Charles Nicholas
links:
  - title: Repository
    url: https://github.com/UMBC-DREAM-Lab/montemutacon
  - title: Documentation
    url: https://umbc-dream-lab.github.io/montemutacon/
  - title: Paper
    url: https://arxiv.org/abs/2106.07860
bibtex: |
  @article{Boutsikas2021EvadingMC,
    title={Evading Malware Classifiers via Monte Carlo Mutant Feature Discovery},
    author={John Boutsikas and M. E. Eren and Charles K. Varga and Edward Raff and Cynthia Matuszek and Charles Nicholas},
    journal={ArXiv},
    year={2021},
    volume={abs/2106.07860}
  }
---

The use of Machine Learning has become a significant part of malware detection
efforts due to the influx of new malware, an ever changing threat landscape, and
the ability of Machine Learning methods to discover meaningful distinctions
between malicious and benign software. Antivirus vendors have also begun to
widely utilize malware classifiers based on dynamic and static malware analysis
features. Therefore, a malware author might make evasive binary modifications
against Machine Learning models as part of the malware development life cycle to
execute an attack successfully. This makes the studying of possible classifier
evasion strategies an essential part of cyber defense against malice. To this
extent, we stage a grey box setup to analyze a scenario where the malware author
does not know the target classifier algorithm, and does not have access to
decisions made by the classifier, but knows the features used in training. In
this experiment, a malicious actor trains a surrogate model using the EMBER-2018
dataset to discover binary mutations that cause an instance to be misclassified
via a Monte Carlo tree search. Then, mutated malware is sent to the victim model
that takes the place of an antivirus API to test whether it can evade detection.

Our results show that MCTS finds successful mutations on the surrogate model for
52.18% of the malware, out of which 8.78% evades detection by the victim model,
performing slightly better than our random mutation baseline with a 5.26%
evasion rate.
