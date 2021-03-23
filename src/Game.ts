export type Coordinates = {
    x: number;
    y: number;
}

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

    private checkNextMoveIsOnEmptyTile (coordinates: Coordinates) {
        if (this._board.TileAt(coordinates).Symbol != ' ') {
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
        if (this._board.TileAt({x: 0, y: 0})!.Symbol != ' ' &&
                this._board.TileAt({x: 0, y: 1})!.Symbol != ' ' &&
                this._board.TileAt({x: 0, y: 2})!.Symbol != ' ') {
            //if first row is full with same symbol
            if (this._board.TileAt({x: 0, y: 0})!.Symbol ==
                    this._board.TileAt({x: 0, y: 1})!.Symbol &&
                    this._board.TileAt({x: 0, y: 2})!.Symbol == this._board.TileAt({x: 0, y: 1})!.Symbol) {
                return this._board.TileAt({x: 0, y: 0})!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt({x: 1, y: 0})!.Symbol != ' ' &&
                this._board.TileAt({x: 1, y: 1})!.Symbol != ' ' &&
                this._board.TileAt({x: 1, y: 2})!.Symbol != ' ') {
            //if middle row is full with same symbol
            if (this._board.TileAt({x: 1, y: 0})!.Symbol ==
                    this._board.TileAt({x: 1, y: 1})!.Symbol &&
                    this._board.TileAt({x: 1, y: 2})!.Symbol ==
                            this._board.TileAt({x: 1, y: 1})!.Symbol) {
                return this._board.TileAt({x: 1, y: 0})!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt({x: 2, y: 0})!.Symbol != ' ' &&
                this._board.TileAt({x: 2, y: 1})!.Symbol != ' ' &&
                this._board.TileAt({x: 2, y: 2})!.Symbol != ' ') {
            //if middle row is full with same symbol
            if (this._board.TileAt({x: 2, y: 0})!.Symbol ==
                    this._board.TileAt({x: 2, y: 1})!.Symbol &&
                    this._board.TileAt({x: 2, y: 2})!.Symbol ==
                            this._board.TileAt({x: 2, y: 1})!.Symbol) {
                return this._board.TileAt({x: 2, y: 0})!.Symbol;
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

    public TileAt(coordinates: Coordinates): Tile {
        return this._plays.find((t:Tile) => t.X == coordinates.x && t.Y == coordinates.y)!
    }

    public AddTileAt(symbol: string, coordinates: Coordinates) : void
    {
        const tile : Tile = {X :coordinates.x, Y:coordinates.y, Symbol:symbol};

        this._plays.find((t:Tile) => t.X == coordinates.x && t.Y == coordinates.y)!.Symbol = symbol;
    }
}