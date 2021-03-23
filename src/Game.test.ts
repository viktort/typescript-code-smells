
import { Game } from "./Game"

describe('TicTacToe game', () => {
    let game : Game;

    beforeEach(() => {
        game = new Game();
    });

    it('should not allow player O to play first', () => {
        expect(() => game.Play('O', {x: 0, y: 0})).toThrow();
    });

    it('should not allow player x to play twice in a row', () =>{
        game.Play('X', {x: 0, y: 0});
        expect(() => game.Play('X', {x: 1, y: 0})).toThrow();
    });
    
    it('should not allow a player to play in last played position', () => {
        game.Play('X', {x: 0, y: 0});
        expect(() => game.Play('O', {x: 0, y: 0})).toThrow();
    });
    
    it('should not allow a player to play in any played position', () => {
        game.Play('X', {x: 0, y: 0});
        game.Play('O', {x: 1, y: 0});
        expect(() => game.Play('X', {x: 0, y: 0})).toThrow();
    });
    
    it('should declare player X as winner if it plays three in top row', () =>{
        game.Play('X', {x: 0, y: 0});
        game.Play('O', {x: 1, y: 0});
        game.Play('X', {x: 0, y: 1});
        game.Play('O', {x: 1, y: 1});
        game.Play('X', {x: 0, y: 2});
        
        var winner = game.Winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in top row', () => {
        game.Play('X', {x: 1, y: 0});
        game.Play('O', {x: 0, y: 0});
        game.Play('X', {x: 1, y: 1});
        game.Play('O', {x: 0, y: 1});
        game.Play('X', {x: 2, y: 2});
        game.Play('O', {x: 0, y: 2});
        
        var winner = game.Winner();
        
        expect(winner).toBe("O");
    });
    
    it('should declare player X as winner if it plays three in middle row', () => {
        game.Play('X', {x: 1, y: 0});
        game.Play('O', {x: 0, y: 0});
        game.Play('X', {x: 1, y: 1});
        game.Play('O', {x: 0, y: 1});
        game.Play('X', {x: 1, y: 2});
       
        var winner = game.Winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in middle row', () => {
        game.Play('X', {x: 0, y: 0});
        game.Play('O', {x: 1, y: 0});
        game.Play('X', {x: 2, y: 1});
        game.Play('O', {x: 1, y: 1});
        game.Play('X', {x: 2, y: 2});
        game.Play('O', {x: 1, y: 2});
        
        var winner = game.Winner();
        
        expect(winner).toBe("O");
    });
    
    it('should declare player X as winner if it plays three in bottom row', () => {
        game.Play('X', {x: 2, y: 0});
        game.Play('O', {x: 0, y: 0});
        game.Play('X', {x: 2, y: 1});
        game.Play('O', {x: 0, y: 1});
        game.Play('X', {x: 2, y: 2});
        
        var winner = game.Winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in bottom row', () => {
        game.Play('X', {x: 0, y: 0});
        game.Play('O', {x: 2, y: 0});
        game.Play('X', {x: 1, y: 1});
        game.Play('O', {x: 2, y: 1});
        game.Play('X', {x: 0, y: 1});
        game.Play('O', {x: 2, y: 2});
        
        var winner = game.Winner();
        
        expect(winner).toBe("O");
    });
});
