TEMPLATE FOR RETROSPECTIVE (Team 14)
=====================================

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
    - 6 stories committed, 4 stories done 
- Total points committed vs. done
    - 21 points committed, 17 points done
- Nr of hours planned vs. spent (as a team)
    - 61 hours estimated, 62 hours spent

**Remember**a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| :---: | :-----: | :----: | :--------: | :----------: |
| _#0_  |    6    |   -    |  11h 10m   |     13h      |
|  #1   |    1    |   8    |     2h     |      2h      |
|  #4   |    5    |   5    |  10h 30m   |    9h 10m    |
|  #5   |    5    |   2    |   8h 30m   |    8h 10m    |
|  #6   |    5    |   2    |   7h 30m   |    8h 15m    |
|  #7   |    6    |   2    |    10h     |   10h 30m    |
|  #8   |    6    |   2    |  11h 30m   |    9h 30m    |

   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
    - estimate average: 1.96 hours | estimate standard deviation: 1.42
    - actual average: 1.90 hours | actual standard deviation: 1.25
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
    - error ratio: 0.08


## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 4.5
  - Total hours spent: 8.3
  - Nr of automated unit test cases: 32
- E2E testing:
  - Total hours estimated: 2
  - Total hours spent: 1,85
- Code review 
  - Total hours estimated: 3,5
  - Total hours spent: 3,5
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
  - We haven't considered the necessary code changes to apply to new stories
  - We overestimated the hours required to learn new libraries

- What lessons did you learn (both positive and negative) in this sprint?
  - Next time we should finish our development some days before the release in order to have time to use on testing and bug fixing
  - We should make more testing to verify in a proper way the validity of the code

- Which improvement goals set in the previous retrospective were you able to achieve?
    - The team gave more importance to Responsiveness of the web-app GUI
    - There were more meetings between team members
    - The team made a better task assignment to reduce integration time between client-side and server-side components
    - The team made a better description of task, with clarity on which job is part of the task
      
- Which ones you were not able to achieve? Why?
  - Using a combination of different test frameworks
    - We used only Jest to write tests during this sprint

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - We should focus on less stories to have a cleaner code
  - We should work more on the front-end in order to have a nicer and smoother look


- One thing you are proud of as a Team!!
  - Everyone is quick to respond to issues that come up during development from other team members
