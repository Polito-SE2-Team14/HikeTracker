TEMPLATE FOR RETROSPECTIVE (Team 14)
=====================================
- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)
## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
    - 3 stories committed, 3 stories done 
- Total points committed vs. done
    - 21 points committed, 21 points done
- Nr of hours planned vs. spent (as a team)
    - 61 hours estimated, 56 hours 47 minutes spent

**Remember**a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| :---: | :-----: | :----: | :--------: | :----------: |
| _#0_  |   15    |   -    |  40h 30m   |     34h      |
| _#17_ |    7    |   8    |     8h     |    8h 10m    |
| _#18_ |    6    |   8    |     5h     |    5h 10m    |
| _#34_ |    6    |   5    |   7h 30m   |    8h 30m    |
| TOTAL |         |        |  61h 00m   |   56h 50m    |




- Hours per task average, standard deviation (estimate and actual)
    - estimate average: 1h40m | estimate standard deviation: 1h10m 
    - actual average: 1h48m | actual standard deviation: 1h15m hours
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
    - error ratio: 0.09


## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 3h
  - Total hours spent: 3h
  - Nr of automated unit test cases: 96 unit + 149 api = 245
- E2E testing:
  - Total hours estimated: 2h 30m
  - Total hours spent: 2h 30m
- Code review 
  - Total hours estimated: 1h 30m
  - Total hours spent: 2h
- Technical Debt management:
  - Total hours estimated: 12h
  - Total hours spent: 5h
  - Hours estimated for remediation by SonarQube: 2h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 2h
  - Hours spent on remediation: 4h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.0%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )  
    - Reliability: A
    - Security: A
    - Mantainability: A


## ASSESSMENT

- What caused your errors in estimation (if any)?
  - Technical debt required less time tp be fixed than estimated

- What lessons did you learn (both positive and negative) in this sprint?
  - It's easier to work with technical debt if you start early. E2E testing allows to find most of the software bugs.

- Which improvement goals set in the previous retrospective were you able to achieve?
  - We improved the quality of the software and the user experience

- Which ones you were not able to achieve? Why?
  - We met every goal set in the previous sprint

- One thing you are proud of as a Team!!
  - We did an amazing job during these last months!