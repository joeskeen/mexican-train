import {
  Domino
} from './domino/domino';

export function findIdealTrain(startNumber: number, tiles: Domino[]): Domino[] {
  // console.log('' + startNumber + ' ' + tileString(tiles));
  const candidates = tiles.filter(t => hasNumber(t, startNumber));
  if (!candidates.length) {
    return [];
  }

  const trains = candidates.map(c => [align(c, startNumber), ...findIdealTrain(align(c, startNumber).right, tiles.filter(t => t !== c))]);
  trains.sort((a, b) => {
    let diff = score(b) - score(a);
    if (diff) return diff;

    diff = weightedScore(b) - weightedScore(a);
    if (diff) return diff;

    return b.length - a.length;
  });
  trains[0].forEach((t, i) => align(t, i === 0 ? startNumber: trains[0][i - 1].right))
  return trains[0];
}

function flip(tile: Domino): void {
  const swap = tile.left;
  tile.left = tile.right;
  tile.right = swap;
}

function hasNumber(tile: Domino, n: number) {
  return tile.left === n || tile.right === n;
}

function align(tile: Domino, n: number): Domino {
  if (!hasNumber(tile, n)) {
    throw new Error(`Invalid tile ${tileString(tile)} for aligning with ${n}`);
  }
  if (tile.left !== n) flip(tile);
  return tile;
}

export function score(tiles: Domino[]) {
  return tiles.reduce((prev, curr) => prev + curr.left + curr.right, 0);
}

function weightedScore(tiles: Domino[]) {
  return tiles.reduce((prev, curr) => prev + prev + curr.left + curr.right, 0);
}

function tileString(tile: Domino): string {
  return `[${tile.left}|${tile.right}]`;
}