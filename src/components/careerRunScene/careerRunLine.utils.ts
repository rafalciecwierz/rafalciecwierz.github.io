import { LINE, STAGE_SWITCH } from './careerRunScene.constants';
import type { RunRoof, RunSegment } from './careerRunScene.types';

// The runner's line over the roofs (part of careerRunLayout).

// Runs across every roof, a jump between each two, and the wait on the last one.
export function runLine(roofs: readonly RunRoof[]): RunSegment[] {
  const line: RunSegment[] = [];
  roofs.forEach((roof: RunRoof, stage: number): void => {
    const previous: RunRoof | undefined = roofs[stage - 1];
    const landing: number = roof.isTower
      ? LINE.towerLanding
      : LINE.buildingLanding;
    const startX: number =
      roof.left + (previous === undefined ? LINE.startInset : landing);
    if (previous !== undefined) {
      const fromX: number = previous.right - LINE.edgeInset;
      line.push({
        kind: 'jump',
        fromX,
        fromHeight: previous.height,
        toX: startX,
        toHeight: roof.height,
        stage,
        length:
          Math.hypot(startX - fromX, roof.height - previous.height) *
          LINE.jumpStretch,
      });
    }
    const toX: number = roof.right - LINE.edgeInset;
    line.push({
      kind: 'run',
      fromX: startX,
      toX,
      height: roof.height,
      stage,
      length: toX - startX,
    });
  });
  const last: RunRoof | undefined = roofs.at(-1);
  if (last !== undefined) {
    line.push({
      kind: 'hold',
      x: last.right - LINE.edgeInset,
      height: last.height,
      stage: roofs.length,
      length: LINE.holdLength,
    });
  }
  return line;
}

// Where each stage starts, as a share of the line. A jump changes the stage half-way through
// the air; the next roof's stage starts with the wait.
export function stageStarts(
  line: readonly RunSegment[],
  length: number,
): number[] {
  const starts: number[] = [0];
  let travelled: number = 0;
  for (const segment of line) {
    if (segment.kind === 'jump') {
      starts.push((travelled + segment.length * STAGE_SWITCH) / length);
    }
    if (segment.kind === 'hold') {
      starts.push(travelled / length);
    }
    travelled += segment.length;
  }
  return starts;
}
