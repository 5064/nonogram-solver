import { Puzzle } from "./types/puzzle";
import { Bit } from "./types/cell";

export class Solver {
  title?: string;
  columnClues: number[][];
  rowClues: number[][];

  columnPossibilities: Bit[][];
  rowPossibilities: Bit[][];

  constructor(puzzle: Puzzle) {
    this.title = puzzle.title;
    this.columnClues = puzzle.column;
    this.rowClues = puzzle.row;
  }

  listColumnPossibilities() {
    this.columnClues.forEach((c) => {
      this.enumColumnPossibilities(c);
      console.log("-------------------------------");
    });
  }

  enumColumnPossibilities(clue: number[]) {
    // 連番作成
    const nums = Array(this.rowClues.length)
      .fill(0)
      .map((_, i) => i);

    // 重複組合せの「仕切り」の位置を求める
    console.log(this.combination(clue, nums, clue.length + 1));
  }

  /**
     * blankをcount個に分割するときのインデックスを列挙する 
     * 動的計画法で、memo
     [blank][count]のテーブルを更新する
     * @param blank 
     * @param count 
     */
  getPartitionIndices(blank: number, count: number) {
    if (this.memo[blank][count].length !== 0) {
      return this.memo[blank][count];
    } else {
      //   this.combination(clue, blank, count);
      return this.memo[blank][count];
    }
  }

  combination(clue: number[], nums: number[], k: number) {
    let ans = [];
    if (nums.length < k) {
      return [];
    }
    if (k === 1) {
      for (let i = 0; i < nums.length; i++) {
        ans[i] = [nums[i]];
      }
    } else {
      for (let i = 0; i < nums.length - k + 1; i++) {
        let row = this.combination(clue, nums.slice(i + 1), k - 1);
        for (let j = 0; j < row.length; j++) {
          //   if (row[j] > nums[i] + clue[0]) {
          ans.push([nums[i]].concat(row[j]));
          //   }
        }
      }
    }
    return ans;
  }
}
