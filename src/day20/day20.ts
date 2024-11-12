import { range } from '../utils/looping';

enum ModuleType {
  FLIP_FLOP = 'FLIP_FLOP', // high does nothing, low -> off => tunrs on and sends high, on => turns off and sends low
  CONJUNCTION = 'CONJUNCTION', // remembers all inputs(start low), sends low if all inputs are high, high otherwise
  BROADCAST = 'BROADCAST', // sends received pulse to all outputs
  BUTTON = 'BUTTON', // sends low to broacast
  TARGET_SENDS_HIGH = 'TARGET_SENDS_HIGH',
}

enum ModuleState {
  ON = 'ON',
  OFF = 'OFF',
}

enum PulseType {
  HIGH = 'HIGH',
  LOW = 'LOW',
}

type Module = {
  name: string;
  type: ModuleType;
  state: ModuleState;
  inputMemory: Record<string, PulseType>;
  destinations: string[];
};

type Config = Record<string, Module>;

type SentPulse = {
  type: PulseType;
  source: string;
  destination: string;
};

const parseConfig = (input: string[]): Config => {
  const config: Config = input.reduce((acc, line) => {
    const [left, right] = line.split(' -> ');
    const typeSymbol = left[0];
    const type =
      typeSymbol === '%' ? ModuleType.FLIP_FLOP : typeSymbol === '&' ? ModuleType.CONJUNCTION : ModuleType.BROADCAST;
    const destinations = right.split(', ');
    const name = type === ModuleType.BROADCAST ? 'broadcaster' : left.slice(1);
    return {
      ...acc,
      [name]: {
        name,
        type,
        state: ModuleState.OFF,
        inputMemory: {},
        destinations,
      },
    };
  }, {});
  Object.keys(config).forEach((name) => {
    const module = config[name];
    if (module.type === ModuleType.CONJUNCTION) {
      Object.keys(config).forEach((other) => {
        const otherModule = config[other];
        if (otherModule.destinations.includes(name)) {
          module.inputMemory[other] = PulseType.LOW;
        }
      });
    }
  });
  return config;
};

const pushButton = (config: Config) => {
  const sentPulses: SentPulse[] = [{ type: PulseType.LOW, source: 'button', destination: 'broadcaster' }];
  const pulseCount = { [PulseType.HIGH]: 0, [PulseType.LOW]: 0 };
  while (sentPulses.length > 0) {
    const sentPulse = sentPulses.shift() as SentPulse;
    pulseCount[sentPulse.type] += 1;
    const destModule = config[sentPulse.destination];
    // if (sentPulse.destination === 'rx') console.log('eureka');
    if (!destModule) continue;

    if (destModule.type === ModuleType.BROADCAST) {
      destModule.destinations.forEach((dest) => {
        sentPulses.push({ type: sentPulse.type, source: sentPulse.destination, destination: dest });
      });
    } else if (destModule.type === ModuleType.FLIP_FLOP) {
      if (sentPulse.type === PulseType.LOW) {
        destModule.state = destModule.state === ModuleState.OFF ? ModuleState.ON : ModuleState.OFF;
        destModule.destinations.forEach((dest) => {
          sentPulses.push({
            type: destModule.state === ModuleState.ON ? PulseType.HIGH : PulseType.LOW,
            source: sentPulse.destination,
            destination: dest,
          });
        });
      }
    } else if (destModule.type === ModuleType.CONJUNCTION) {
      destModule.inputMemory[sentPulse.source] = sentPulse.type;
      const isAllHigh = Object.values(destModule.inputMemory).every((x) => x === PulseType.HIGH);
      destModule.destinations.forEach((dest) => {
        sentPulses.push({
          type: isAllHigh ? PulseType.LOW : PulseType.HIGH,
          source: sentPulse.destination,
          destination: dest,
        });
      });
    } else if (destModule.type === ModuleType.TARGET_SENDS_HIGH) {
      destModule.inputMemory[sentPulse.source] = sentPulse.type;
      const isAllHigh = Object.values(destModule.inputMemory).every((x) => x === PulseType.HIGH);
      if (!isAllHigh) destModule.state = ModuleState.ON;
    }
  }
  return pulseCount;
};

const pushButtonNumTimes = (config: Config, numTimes: number) => {
  const pulseCount = { [PulseType.HIGH]: 0, [PulseType.LOW]: 0 };
  range(numTimes).forEach(() => {
    const runPulseCount = pushButton(config);
    pulseCount[PulseType.HIGH] += runPulseCount[PulseType.HIGH];
    pulseCount[PulseType.LOW] += runPulseCount[PulseType.LOW];
  });
  return pulseCount;
};

const getPushesUntilTargetSendsHigh = (input: string[], target: string) => {
  const config = parseConfig(input);
  config[target] = {
    name: target,
    type: ModuleType.TARGET_SENDS_HIGH,
    state: ModuleState.OFF,
    inputMemory: {},
    destinations: [],
  };
  let numPresses = 0;
  while (config[target].state === ModuleState.OFF) {
    pushButton(config);
    numPresses++;
  }
  return numPresses;
};

export const day20 = (input: string[]) => {
  const config = parseConfig(input);
  const pulseCount = pushButtonNumTimes(config, 1000);
  return pulseCount[PulseType.HIGH] * pulseCount[PulseType.LOW];
};

// Note: this is constructed by examining the input, it is not a general solution, as I believe intended
export const day20part2 = (input: string[]) => {
  const target = 'rx';
  const config = parseConfig(input);
  const whoHitsTarget = Object.values(config).find((m) => m.destinations.includes(target))?.name as string;
  const modulesToHitSecondLast = Object.values(config)
    .filter((m) => m.destinations.includes(whoHitsTarget))
    .map((m) => m.name);

  return modulesToHitSecondLast.reduce((ans, m) => ans * getPushesUntilTargetSendsHigh(input, m), 1);
};
