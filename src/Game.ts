export type Coordinates = {
    x: number;
    y: number;
}

enum Symbol {
    X = "X",
    O = "O",
    EMPTY = " "
}

export class Game {
    private EMPTY_TILE: string = ' ';
    private _board: Board = new Board();
    private _lastSymbol: string = this.EMPTY_TILE;

    private checkFirstMoveIsLegal (symbol: string) {
        if (this._lastSymbol == this.EMPTY_TILE && symbol == Symbol.O) {
            throw new Error("Invalid first player");
        }
    }

    private checkCorrectPlayerSequence (symbol: string ) {
        if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
    }

    private checkNextMoveIsOnEmptyTile (coordinates: Coordinates) {
        if (this._board.TileAt(coordinates).Symbol != this.EMPTY_TILE) {
            throw new Error("Invalid position");
        }
    }

    private validateInput (symbol: string, coordinates: Coordinates) {
        this.checkFirstMoveIsLegal(symbol);
        this.checkCorrectPlayerSequence(symbol);
        this.checkNextMoveIsOnEmptyTile(coordinates);
    }

    private updateState (symbol: string, coordinates: Coordinates) {
        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, coordinates);
    }

    public Play(symbol: string, coordinates: Coordinates) : void {
        this.validateInput(symbol, coordinates);
        this.updateState(symbol, coordinates);
    }

    public Winner() : string {
        //if the positions in first row are taken
        if (this._board.TileAt({x: 0, y: 0})!.Symbol != this.EMPTY_TILE &&
                this._board.TileAt({x: 0, y: 1})!.Symbol != this.EMPTY_TILE &&
                this._board.TileAt({x: 0, y: 2})!.Symbol != this.EMPTY_TILE) {
            //if first row is full with same symbol
            if (this._board.TileAt({x: 0, y: 0})!.Symbol ==
                    this._board.TileAt({x: 0, y: 1})!.Symbol &&
                    this._board.TileAt({x: 0, y: 2})!.Symbol == this._board.TileAt({x: 0, y: 1})!.Symbol) {
                return this._board.TileAt({x: 0, y: 0})!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt({x: 1, y: 0})!.Symbol != this.EMPTY_TILE &&
                this._board.TileAt({x: 1, y: 1})!.Symbol != this.EMPTY_TILE &&
                this._board.TileAt({x: 1, y: 2})!.Symbol != this.EMPTY_TILE) {
            //if middle row is full with same symbol
            if (this._board.TileAt({x: 1, y: 0})!.Symbol ==
                    this._board.TileAt({x: 1, y: 1})!.Symbol &&
                    this._board.TileAt({x: 1, y: 2})!.Symbol ==
                            this._board.TileAt({x: 1, y: 1})!.Symbol) {
                return this._board.TileAt({x: 1, y: 0})!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt({x: 2, y: 0})!.Symbol != this.EMPTY_TILE &&
                this._board.TileAt({x: 2, y: 1})!.Symbol != this.EMPTY_TILE &&
                this._board.TileAt({x: 2, y: 2})!.Symbol != this.EMPTY_TILE) {
            //if middle row is full with same symbol
            if (this._board.TileAt({x: 2, y: 0})!.Symbol ==
                    this._board.TileAt({x: 2, y: 1})!.Symbol &&
                    this._board.TileAt({x: 2, y: 2})!.Symbol ==
                            this._board.TileAt({x: 2, y: 1})!.Symbol) {
                return this._board.TileAt({x: 2, y: 0})!.Symbol;
            }
        }

        return this.EMPTY_TILE;
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
                const tile : Tile = { X: i, Y: j, Symbol: Symbol.EMPTY };
                this._plays.push(tile);
            }
        }
    }

    public TileAt(coordinates: Coordinates): Tile {
        return this._plays.find((t:Tile) => t.X == coordinates.x && t.Y == coordinates.y)!
    }

    public AddTileAt(symbol: string, coordinates: Coordinates) : void
    {
        this._plays.find((t:Tile) => t.X == coordinates.x && t.Y == coordinates.y)!.Symbol = symbol;
    }
}