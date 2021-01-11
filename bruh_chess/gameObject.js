const bObject = require("./piecesBoard");

module.exports = gameObject;

function gameObject(){
    this.boardObj = new bObject();
    this.whiteAlive = [];
    this.blackAlive =[];
    this.whiteDead = [];
    this.blackDead = [];
    this.p1websocket = "placeholder";
    this.p2websocket = "placeholder";
    this.board = function(){return this.boardObj.board};
    /**
     * possible statuses:
     * 0-JOINT no players
     * 1-JOINT 1 player
     * 2-JOINT 2 players
     * W-WIN white wins
     * B-WIN black wins
     */
    this.status = "0-JOINT";                

    for (var x = 0;x<8;x++){
        for (var y = 0;y<8;y++){
            if (this.board()[x][y] != undefined && this.board()[x][y] != ""){
                var piece = this.board()[x][y];
                if (piece.color === "white") {this.whiteAlive.push(piece.name)}
                else {this.blackAlive.push(piece.name)}
            }
        }
    }
}



if (require.main === module) {
    let game = new gameObject();
    console.table(game.board());
    console.log(game.blackAlive);

}
