export class Solver {
    title?: string
    columnClues: number[][]
    rowClues: number[][]

    memo: number[][][]
    columnPossibilities: Bit[][]
    rowPossibilities: Bit[][]


    constructor(puzzle: Puzzle) {
        this.title = puzzle.title
        this.columnClues = puzzle.column
        this.rowClues = puzzle.row

        this.memo = []
        for (let i = 0; i < puzzle.column.length; i++) {
            this.memo.push([])
            for (let j = 0; j < puzzle.row.length; j++) {
                this.memo[i].push([])
            }
        }
        this.memo[0][0] = [1]
    }

    listPossibilities() {
        this.columnClues.forEach((c) => {
            this.enumPossibilities(c, this.rowClues.length)
            console.log('-------------------------------')
        })
    }

    enumPossibilities(clue: number[], maxLength: number) {
        const blank = maxLength - (clue.reduce((acc, currentValue) => acc + currentValue))

        // 重複組合せの「仕切り」の位置を求める
        // 場合分け
        // 1. 両端の空白を使うとき
        this.getPartitionIndices(blank, clue.length + 1)
        // 2. 片端どちらかの空白を使うとき
        // 3. 両端の空白を使わないとき
        console.log(this.memo)
    }

    /**
     * blankをcount個に分割するときのインデックスを列挙する 
     * 動的計画法で、memo
     [blank][count]のテーブルを更新する
     * @param blank 
     * @param count 
     */
    getPartitionIndices(blank: number, count: number) {
        if (this.memo
        [blank][count].length !== 0) {
            return this.memo
            [blank][count]
        } else {
            this.enumPartitionIndices(blank, count)
            return this.memo
            [blank][count]
        }
    }

    /**
 * blankをcount個に分割するときのインデックスを列挙する 
 * 動的計画法で、memo
 [blank][count]のテーブルを更新する
 * @param blank 
 * @param count 
 */
    enumPartitionIndices(blank: number, count: number) {
        if (blank < 0 || count <= 0) {
            return;
        }
        console.log(`blank: ${blank},count: ${count}`)

        this.enumPartitionIndices(blank - 1, count - 1)
        this.enumPartitionIndices(blank - count, count)
    }
}