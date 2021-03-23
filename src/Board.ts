import { Coordinates } from "./Coordinates";
import { Tile } from "./Tile";
import { Symbol } from "./Symbol"

export class Board
{
    private _tiles : Tile[] = [];

    constructor()
    {
        this._tiles = [
            { X: 0, Y: 0, Symbol: Symbol.EMPTY },
            { X: 1, Y: 0, Symbol: Symbol.EMPTY },
            { X: 2, Y: 0, Symbol: Symbol.EMPTY },
            { X: 0, Y: 1, Symbol: Symbol.EMPTY },
            { X: 1, Y: 1, Symbol: Symbol.EMPTY },
            { X: 2, Y: 1, Symbol: Symbol.EMPTY },
            { X: 0, Y: 2, Symbol: Symbol.EMPTY },
            { X: 1, Y: 2, Symbol: Symbol.EMPTY },
            { X: 2, Y: 2, Symbol: Symbol.EMPTY },
        ];
    }

    public TileAt(coordinates: Coordinates): Tile {
        const tile = this._tiles.find((t:Tile) => t.X == coordinates.x && t.Y == coordinates.y);
        if (!tile) {
            throw new Error(`Tile not found at X: ${coordinates.x} Y: ${coordinates.y}`);
        }
        return tile;
    }

    public AddTileAt(symbol: string, coordinates: Coordinates) : void {
        const tile = this.TileAt(coordinates);

        tile.Symbol = symbol;
    }
}