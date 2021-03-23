export class Game {
    private _lastSymbol: string = ' ';
    private _board: Board = new Board();

    private checkFirstMoveIsLegal (symbol: string) {
        if (this._lastSymbol == ' ' && symbol == 'O') {
            throw new Error("Invalid first player");
        }
    }

    private checkCorrectPlayerSequence (symbol: string ) {
        if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
    }

    private checkNextMoveIsOnEmptyTile (x: number, y: number) {
        if (this._board.TileAt(x, y).Symbol != ' ') {
            throw new Error("Invalid position");
        }
    }

    private validateInput (symbol: string, x: number, y: number) {
        this.checkFirstMoveIsLegal(symbol);
        this.checkCorrectPlayerSequence(symbol);
        this.checkNextMoveIsOnEmptyTile(x, y);
    }

    private updateState (symbol: string, x: number, y: number) {
        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    public Play(symbol: string, x: number, y: number) : void {
        this.validateInput(symbol, x, y);
        this.updateState(symbol, x, y);
    }

    public Winner() : string {
        //if the positions in first row are taken
        if (this._board.TileAt(0, 0)!.Symbol != ' ' &&
                this._board.TileAt(0, 1)!.Symbol != ' ' &&
                this._board.TileAt(0, 2)!.Symbol != ' ') {
            //if first row is full with same symbol
            if (this._board.TileAt(0, 0)!.Symbol ==
                    this._board.TileAt(0, 1)!.Symbol &&
                    this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol) {
                return this._board.TileAt(0, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt(1, 0)!.Symbol != ' ' &&
                this._board.TileAt(1, 1)!.Symbol != ' ' &&
                this._board.TileAt(1, 2)!.Symbol != ' ') {
            //if middle row is full with same symbol
            if (this._board.TileAt(1, 0)!.Symbol ==
                    this._board.TileAt(1, 1)!.Symbol &&
                    this._board.TileAt(1, 2)!.Symbol ==
                            this._board.TileAt(1, 1)!.Symbol) {
                return this._board.TileAt(1, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt(2, 0)!.Symbol != ' ' &&
                this._board.TileAt(2, 1)!.Symbol != ' ' &&
                this._board.TileAt(2, 2)!.Symbol != ' ') {
            //if middle row is full with same symbol
            if (this._board.TileAt(2, 0)!.Symbol ==
                    this._board.TileAt(2, 1)!.Symbol &&
                    this._board.TileAt(2, 2)!.Symbol ==
                            this._board.TileAt(2, 1)!.Symbol) {
                return this._board.TileAt(2, 0)!.Symbol;
            }
        }

        return ' ';
    }
}

interface Tile
{
    X: number;
    Y: number;
    Symbol: string;
}

class Board
{
    private _plays : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x:  number, y: number): Tile {
        return this._plays.find((t:Tile) => t.X == x && t.Y == y)!
    }

    public AddTileAt(symbol: string, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}