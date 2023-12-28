import { sumArr } from '../utils/array';
import { parseLines } from '../utils/input';

type Category = 'x' | 'm' | 'a' | 's';
type Workflows = Record<string, Rule[]>;
type Rule =
  | {
      category: Category;
      isGreater: boolean;
      compValue: number;
      toWorkflow: string;
      autoWorkflow: undefined;
    }
  | { autoWorkflow: string; category: undefined; isGreater: undefined; compValue: undefined; toWorkflow: undefined };
type Part = Record<Category, number>;
type Condition = { isGreater: boolean; compValue: number; category: Category };
type GetTos = {
  conditions: Condition[];
  workflowName: string;
};
type Ranges = Record<Category, [number, number]>;

const parseWorkflowsAndParts = (input: string[]) => {
  const [workflowString, partString] = input;
  const workflowStrings = parseLines(workflowString);
  const partStrings = parseLines(partString);

  const workflows: Workflows = workflowStrings.reduce((acc, workflow) => {
    const [name, ruleString] = workflow.split(/{|}/);
    const rules: Rule[] = ruleString.split(',').map((line) => {
      if (!line.includes(':')) return { autoWorkflow: line };
      const groups = line.match(/([a-z])+(>|<)([0-9]+):([a-zAR]+)/);
      if (!groups) throw new Error(`${line} is not valid`);
      const [_, category, compSign, compValue, toWorkflow] = groups;
      return { category: category as Category, isGreater: compSign === '>', compValue: +compValue, toWorkflow };
    });
    return { ...acc, [name]: rules };
  }, {});

  const parts: Part[] = partStrings.map((line) => {
    const groups = line.match(/{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)}/);
    if (!groups) throw new Error(`${line} is not valid`);
    const [_, x, m, a, s] = groups;
    return { x: +x, m: +m, a: +a, s: +s };
  });
  return { workflows, parts };
};

const getIsPartAccepted = (workflows: Workflows, part: Part): boolean => {
  let workflowName = 'in';
  while (true) {
    const workflow = workflows[workflowName];
    let ruleIndex = 0;
    while (true) {
      const rule = workflow[ruleIndex];
      if (rule.autoWorkflow) {
        if (rule.autoWorkflow === 'A') return true;
        if (rule.autoWorkflow === 'R') return false;
        workflowName = rule.autoWorkflow;
        break;
      } else {
        if (rule.isGreater === true) {
          if (part[rule.category] > rule.compValue) {
            if (rule.toWorkflow === 'A') return true;
            if (rule.toWorkflow === 'R') return false;
            workflowName = rule.toWorkflow;
            break;
          } else {
            ruleIndex++;
          }
        } else if (rule.isGreater === false) {
          if (part[rule.category] < rule.compValue) {
            if (rule.toWorkflow === 'A') return true;
            if (rule.toWorkflow === 'R') return false;
            workflowName = rule.toWorkflow;
            break;
          } else {
            ruleIndex++;
          }
        }
      }
    }
  }
};

const getPartScore = ({ x, m, a, s }: Part) => x + m + a + s;

const getToWorkflow = (targetWorkflow: string, workflows: Workflows) => {
  const getTos: GetTos[] = [];
  Object.keys(workflows).forEach((workflowName) => {
    const rules = workflows[workflowName];
    rules.forEach((rule, index) => {
      const conditions: Condition[] = [];
      if (rule.toWorkflow === targetWorkflow) {
        conditions.push({ isGreater: rule.isGreater, compValue: rule.compValue, category: rule.category });
      }
      if (rule.autoWorkflow === targetWorkflow || rule.toWorkflow === targetWorkflow) {
        for (let i = 0; i < index; i++) {
          const innerRule = rules[i];
          conditions.push({
            isGreater: !innerRule.isGreater,
            compValue: innerRule.isGreater ? innerRule.compValue + 1 : innerRule.compValue - 1,
            category: innerRule.category as Category,
          });
        }
        getTos.push({ conditions, workflowName });
      }
    });
  });
  return getTos;
};

const getGetTosIn = (workflows: Workflows): GetTos[] => {
  let getTos = getToWorkflow('A', workflows);
  while (getTos.find((getTo) => getTo.workflowName !== 'in')) {
    const newGetTos: GetTos[] = [];
    getTos.forEach((getTo) => {
      if (getTo.workflowName === 'in') {
        newGetTos.push(getTo);
      } else {
        const innerGetTos = getToWorkflow(getTo.workflowName, workflows);
        innerGetTos.forEach((innerGetTo) => {
          newGetTos.push({
            workflowName: innerGetTo.workflowName,
            conditions: [...innerGetTo.conditions, ...getTo.conditions],
          });
        });
      }
    });
    getTos = newGetTos;
  }
  return getTos;
};

const covertToRanges = (getTos: GetTos[]): Ranges[] =>
  getTos.map((getTo) => {
    const ranges: Ranges = {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
    };
    getTo.conditions.forEach((condition) => {
      if (condition.isGreater) {
        ranges[condition.category][0] = Math.max(condition.compValue + 1, ranges[condition.category][0]);
      } else {
        ranges[condition.category][1] = Math.min(condition.compValue - 1, ranges[condition.category][1]);
      }
    });
    return ranges;
  });

const getRangeCombos = (ranges: Ranges) =>
  Object.values(ranges).reduce((acc, range) => (range[1] - range[0] + 1) * acc, 1);

export const day19 = (input: string[]) => {
  const { parts, workflows } = parseWorkflowsAndParts(input);
  return sumArr(parts, (part) => (getIsPartAccepted(workflows, part) ? getPartScore(part) : 0));
};

export const day19part2 = (input: string[]) => {
  const { workflows } = parseWorkflowsAndParts(input);
  const getTos = getGetTosIn(workflows);
  const ranges = covertToRanges(getTos);

  return sumArr(ranges, getRangeCombos);
};
