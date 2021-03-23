import { Symbol } from "./Symbol"
import { Board } from "./Board";
import { Coordinates } from "./Coordinates";

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
        if (this._board.SymbolAt(coordinates) != this.EMPTY_TILE) {
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

    private WinnerInRow(rowIndex: number) : boolean {
        if (this._board.SymbolAt({x: rowIndex, y: 0}) != this.EMPTY_TILE &&
            this._board.SymbolAt({x: rowIndex, y: 1}) != this.EMPTY_TILE &&
            this._board.SymbolAt({x: rowIndex, y: 2}) != this.EMPTY_TILE) {
            //if first row is full with same symbol
            if (this._board.SymbolAt({x: rowIndex, y: 0}) ==
                this._board.SymbolAt({x: rowIndex, y: 1}) &&
                this._board.SymbolAt({x: rowIndex, y: 2}) ==
                this._board.SymbolAt({x: rowIndex, y: 1})
            ) {
                return true;
            }
        }
        return false;
    }

    public Winner() : string {
        //if the positions in first row are taken
        if (this.WinnerInRow(0)) {
            return this._board.SymbolAt({x: 0, y: 0});
        }
        if (this.WinnerInRow(1)) {
            return this._board.SymbolAt({x: 1, y: 0});
        }
        if (this.WinnerInRow(2)) {
            return this._board.SymbolAt({x: 2, y: 0});
        }

        return this.EMPTY_TILE;
    }
}