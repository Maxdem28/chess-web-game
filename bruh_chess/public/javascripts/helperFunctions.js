
// Puts the visual pieces on the board
function drawGameStart(match) {
  let htmlBoard = document.getElementById("chess-board");
  let i = 0;
  let y = 0;
  let x = 0;

  // Checks which side
  if (match.myColor == "white") {
    x = 0;
  } else {
    x = 7;
  }

  for (row of match.board) {

    // Creates the row element
    const htmlRow = document.createElement("div");
    htmlRow.classList.add("row");

    // Checks which side
    if (match.myColor == "white") {
      y = 0;
    } else {
      y = 7;
    }

    for (column of row) {

      // makes blocks
      const htmlColumn = document.createElement("div");
      htmlColumn.classList.add("column");
      const id = String(x) + String(y);
      htmlColumn.setAttribute("id", id);
      if (i % 2 == 0) {
        htmlColumn.classList.add("white-block");
      }

      // makes piece
      if (column != "") {
        const htmlImage = document.createElement("IMG");
        htmlImage.classList.add("piece");
        htmlImage.style.position = "absolute";
        htmlImage.style.zIndex = "10"
        htmlImage.style.left = x * 75 + "px";
        htmlImage.style.top = y * 75 + "px";
        htmlImage.classList.add(column.name);
        htmlImage.setAttribute('draggable', false);

        // gives the html attributes to the piece
        column.htmlPosition = [(x * 75 + "px"), (y * 75 + "px")];
        column.htmlRef = htmlImage;

        // Import images
        const color = column.color;
        const piece = lookup[column.name];
        const loc = "images/" + color + "_" + piece + ".svg";

        htmlImage.setAttribute("src", loc);

        // Only active pieces get listeners
        if (column.color == match.myColor) {

          // Click and hold
          htmlImage.addEventListener("mousedown", function (event) {
            mouseDownFun(match, htmlImage, event, htmlBoard);
          }, true)

          // Click
          htmlImage.addEventListener("click", function (event) {
            if (options.clickMove) {
              if (match.clickCounter > 0) {
                match.clickCounter = 0;
                mouseUpFun(match, event, htmlBoard, htmlImage);
              } else {
                match.clickCounter++;
              }
            }
          }, true)

          // let go of click
          htmlImage.addEventListener("mouseup", function (event) {
            if (!options.clickMove) {
              mouseUpFun(match, event, htmlBoard, htmlImage);
            }

          }, true)

          // move around while holding
          htmlImage.addEventListener('mousemove', function (event) {
            if (match.myMove) {

              event.preventDefault();
              const offset = htmlBoard.getBoundingClientRect();
              // Checks correspondence
              if (match.pieceHeld == htmlImage.classList[1]) {
                const xCord = event.clientX - offset.left - 37;
                const yCord = event.clientY - offset.top - 45;
                // Removes the move if it goes out of focus
                if (xCord < -40 || xCord > 570 || yCord > 580 || yCord < -40) {
                  const piece = match.myPieces.find((x) => {
                    return x.name == htmlImage.classList[1];
                  })
                  htmlImage.style.zIndex = "10"
                  match.pieceHeld = "";
                  htmlImage.style.left = piece.htmlPosition[0];
                  htmlImage.style.top = piece.htmlPosition[1];
                  match.pieceHTML = null;
                } else {
                  htmlImage.style.left = xCord + "px";
                  htmlImage.style.top = yCord + "px";
                }
              }
            }
          }, true);
        }
        htmlColumn.appendChild(htmlImage);
      }
      htmlRow.appendChild(htmlColumn);
      i++;


      if (match.myColor == "white") {
        y++;
      } else {
        y--;
      }
    }
    i++;
    htmlBoard.appendChild(htmlRow);
    if (match.myColor == "white") {
      x++;
    } else {
      x--;
    }
  }
}




function renderBoardState(match) {
  let y = 0;
  let x = 0;

  clearBoard();

  // Checks which side
  if (match.myColor == "white") {
    x = 0;
  } else {
    x = 7;
  }

  for (row of match.board) {

    // Checks which side
    if (match.myColor == "white") {
      y = 0;
    } else {
      y = 7;
    }

    for (column of row) {

      const id = String(x) + String(y);
      const htmlBlock = document.getElementById(id);

      // makes piece
      if (column != "") {
        const htmlBoard = document.getElementById("chess-board");

        const htmlImage = document.createElement("IMG");
        htmlImage.classList.add("piece");
        htmlImage.style.position = "absolute";
        htmlImage.style.zIndex = "10"
        htmlImage.style.left = x * 75 + "px";
        htmlImage.style.top = y * 75 + "px";
        htmlImage.classList.add(column.name);
        htmlImage.setAttribute('draggable', false);

        // gives the html attributes to the piece
        column.htmlPosition = [(x * 75 + "px"), (y * 75 + "px")];
        column.htmlRef = htmlImage;

        // Import images
        const color = column.color;
        const piece = lookup[column.name];
        const loc = "images/" + color + "_" + piece + ".svg";

        htmlImage.setAttribute("src", loc);

        if (column.color == match.myColor) {

          // Click and hold
          htmlImage.addEventListener("mousedown", function (event) {
            mouseDownFun(match, htmlImage, event, htmlBoard);
          }, true)

          // Click
          htmlImage.addEventListener("click", function (event) {
            if (options.clickMove) {
              if (match.clickCounter > 0) {
                match.clickCounter = 0;
                mouseUpFun(match, event, htmlBoard, htmlImage);
              } else {
                match.clickCounter++;
              }
            }
          }, true)

          // let go of click
          htmlImage.addEventListener("mouseup", function (event) {
            if (!options.clickMove) {
              mouseUpFun(match, event, htmlBoard, htmlImage);
            }

          }, true)

          // move around while holding
          htmlImage.addEventListener('mousemove', function (event) {
            if (match.myMove) {

              event.preventDefault();
              const offset = htmlBoard.getBoundingClientRect();
              // Checks correspondence
              if (match.pieceHeld == htmlImage.classList[1]) {
                const xCord = event.clientX - offset.left - 37;
                const yCord = event.clientY - offset.top - 45;
                // Removes the move if it goes out of focus
                if (xCord < -40 || xCord > 570 || yCord > 580 || yCord < -40) {
                  const piece = match.myPieces.find((x) => {
                    return x.name == htmlImage.classList[1];
                  })
                  htmlImage.style.zIndex = "10"
                  match.pieceHeld = "";
                  htmlImage.style.left = piece.htmlPosition[0];
                  htmlImage.style.top = piece.htmlPosition[1];
                  match.pieceHTML = null;
                } else {
                  htmlImage.style.left = xCord + "px";
                  htmlImage.style.top = yCord + "px";
                }
              }
            }
          }, true);
        }

        htmlBlock.innerHTML = "";
        htmlBlock.appendChild(htmlImage);
      }

      if (match.myColor == "white") {
        y++;
      } else {
        y--;
      }
    }
    if (match.myColor == "white") {
      x++;
    } else {
      x--;
    }
  }
}

function clearBoard() {
  const htmlKids = document.getElementsByClassName("column");
  for (let index = 0; index < htmlKids.length; index++) {
    htmlKids[index].innerHTML = "";
  }
}


function renderEnemyMove(start, end, match) {
  // skips to current state if watching history
  if (match.currentMove < match.moveHistory.length) {
    match.currentMove--;
    while (match.currentMove < match.moveHistory.length) {
      goForwardHistory(match);
    }
    renderBoardState(match);
  }

  const piece = match.board[start[0]][start[1]];
  const coordinates = findHTMLLocation(end, match.myColor);
  piece.htmlPosition = coordinates;
  piece.increaseMoved();

  // Checks for capturing piece
  const checkBlock = match.board[end[0]][end[1]];
  if (checkBlock != "") {
    if (options.sound)
      captureAudio.play();
    match.myDeadPieces.push(checkBlock);
    drawDeadPieces(piece, match);
    const nameOfRemoved = checkBlock.name;
    document.querySelectorAll("." + nameOfRemoved).forEach(e => e.remove());
    match.opponentPieces.filter((elem) => {
      return elem != checkBlock
    });
    match.board[end[0]][end[1]] = "";
  } else {
    if (options.sound)
      moveAudio.play();
  }

  // Records history 
  const startPos = [piece.position[0], piece.position[1]];
  const endPos = [end[0], end[1]];
  match.moveHistory.push({
    piece: piece,
    startPos,
    endPos,
    endPiece: checkBlock
  });
  renderTable(startPos, endPos, piece, match);


  // makes the positional change
  match.board[piece.position[0]][piece.position[1]] = "";
  piece.setPosition(end[0], end[1]);
  match.board[piece.position[0]][piece.position[1]] = piece;

  // focuses the move
  const currentLoc = String(piece.position[0]) + String(piece.position[1])
  document.getElementById(currentLoc).classList.add("focused");

  const pastLoc = String(start[0]) + String(start[1]);
  document.getElementById(pastLoc).classList.add("focused");

  // Render the move
  const htmlImage = piece.htmlRef;
  htmlImage.style.left = piece.htmlPosition[0];
  htmlImage.style.top = piece.htmlPosition[1];
}


function didEnemyMove(start, match) {
  return match.board[start[0]][start[1]] != "";
}

function findHTMLLocation(loc, color) {
  const htmlLoc = [];
  if (color == "white") {
    htmlLoc.push(loc[0] * 75 + "px");
    htmlLoc.push(loc[1] * 75 + "px");
  } else {
    htmlLoc.push((525 - loc[0] * 75) + "px");
    htmlLoc.push((525 - loc[1] * 75) + "px");
  }

  return htmlLoc;
}

function renderTable(start, end, piece, match) {
  const tBod = document.getElementById('moveTable').getElementsByTagName('tbody')[0];
  const row = tBod.insertRow();
  const cell1 = row.insertCell();
  const cell2 = row.insertCell();
  const cell3 = row.insertCell();

  const pieceInit = letterLookup[piece.name];
  const newText1 = document.createTextNode(match.tableIndex + ".");
  const newText2 = document.createTextNode(pieceInit + xLookup[start[0]] + (8 - start[1]));
  const newText3 = document.createTextNode(pieceInit + xLookup[end[0]] + (8 - end[1]));

  cell1.appendChild(newText1);
  cell2.appendChild(newText2);
  cell3.appendChild(newText3);

  match.tableIndex++;
}

function renderGameStart(match) {
  drawGameStart(match);

  const goBack = document.getElementById("goBack");
  const goForward = document.getElementById("goForward");

  goBack.addEventListener("click", () => goBackHistory(match));
  goForward.addEventListener("click", () => goForwardHistory(match));


  window.addEventListener('mousemove', function (event) {
    event.preventDefault();
    const offset = document.getElementById("chess-board").getBoundingClientRect();
    // Checks correspondence
    if (match.pieceHTML != null) {
      const xCord = event.clientX - offset.left - 37;
      const yCord = event.clientY - offset.top - 45;
      // Removes the move if it goes out of focus
      if (xCord < -40 || xCord > 570 || yCord > 580 || yCord < -40) {
      } else {
        match.pieceHTML.style.left = xCord + "px";
        match.pieceHTML.style.top = yCord + "px";
      }
    }
  })
}

function goBackHistory(match) {
  if (match.currentMove > 0) {
    match.premovePossible = false;
    match.myMove = false;
    match.currentMove--;
    var previous = match.moveHistory[match.currentMove];
    var start = previous.startPos;
    var end = previous.endPos;
    match.board[start[0]][start[1]] = previous.piece;
    previous.piece.position = start;
    match.board[end[0]][end[1]] = previous.endPiece;
    renderBoardState(match);
  }
}

function goForwardHistory(match) {
  if (match.currentMove < match.moveHistory.length) {
    match.currentMove++;
    var previous = match.moveHistory[match.currentMove - 1];
    var start = previous.startPos;
    var end = previous.endPos;
    match.board[end[0]][end[1]] = previous.piece;
    previous.piece.position = end;
    match.board[start[0]][start[1]] = "";
    renderBoardState(match);
    if (match.currentMove == match.moveHistory.length) {
      match.premovePossible = true;
    }

    if (match.currentMove == match.moveHistory.length && previous.piece.color != match.myColor) {

      match.myMove = true;
    }
  }
}

function drawDeadPieces(piece, match) {

  const htmlImage = document.createElement("IMG");
  htmlImage.classList.add("deadPiece");
  htmlImage.style.zIndex = "10"

  const color = piece.color;
  const nameOfPiece = lookup[piece.name];

  const loc = "images/" + color + "_" + nameOfPiece + ".svg";

  htmlImage.setAttribute("src", loc);
  htmlImage.setAttribute('draggable', false);
  const deadContainer = document.createElement("div");
  deadContainer.classList.add("deadcontainer");
  deadContainer.appendChild(htmlImage)

  if (color == match.myColor) {
    document.getElementById("myPieces").appendChild(deadContainer);
  } else {
    document.getElementById("enemyPieces").appendChild(deadContainer);
  }
}

function getBoardPositionWhite(x, y) {
  return String(Math.floor(x / 75)) + String(Math.floor(y / 75));
}

function getBoardPositionBlack(x, y) {
  return String(Math.floor((600 - x) / 75)) + String(Math.floor((600 - y) / 75));
}

function normalizeCoordinates(x, y) {
  const res = [];
  let realX = 0;
  while (realX + 75 <= x) {
    realX += 75;
  }
  let realY = 0;
  while (realY + 75 <= y) {
    realY += 75;
  }
  realX += "px";
  realY += "px";
  res.push(realX, realY);

  return res;
}

function setupPieces(board) {
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      if (board[x][y] != undefined && board[x][y] != "") {
        board[x][y].setBoard(board);
      }
    }
  }
}


function mouseDownFun(match, htmlImage, event, htmlBoard) {
  if (match.myMove) {
    mouseDownFunHelper(match, htmlImage, false, event, htmlBoard);
  } else if (options.premove && match.premovePossible) {
    mouseDownFunHelper(match, htmlImage, true, event, htmlBoard);
  }

}

function mouseDownFunHelper(match, htmlImage, pre, event, htmlBoard) {
  console.log(event);

  // Finds piece
  const piece = match.myPieces.find((index) => {
    return index.name == htmlImage.classList[1];
  })
  match.pieceHTML = htmlImage;

  // disables focus for all
  document.querySelectorAll(".focused").forEach(e => e.classList.remove("focused"));
  document.querySelectorAll(".focused-premove").forEach(e => e.classList.remove("focused-premove"));
  // deletes movable
  document.querySelectorAll(".container-movable").forEach(e => e.remove());

  // Draws points to which the piece can move
  const moves = piece.getMoves();
  // console.table(moves);
  for (let index = 0; index < moves.length; index++) {

    const container = document.createElement("div");
    container.classList.add("container-movable");

    const movable = document.createElement("div");
    movable.classList.add("movable");
    container.appendChild(movable);

    const id = String(moves[index][0]) + String(moves[index][1]);

    document.getElementById(id).appendChild(container);
  }


  // Adds focus attributes
  const currentLoc = String(piece.position[0]) + String(piece.position[1])
  if (pre) {
    document.getElementById(currentLoc).classList.add("focused-premove");
  } else {
    document.getElementById(currentLoc).classList.add("focused");
  }

  htmlImage.style.zIndex = "1000"
  match.pieceHeld = htmlImage.classList[1];

  if (match.myMove || pre) {

    event.preventDefault();
    const offset = htmlBoard.getBoundingClientRect();
    // Checks correspondence
    if (match.pieceHeld == htmlImage.classList[1]) {
      const xCord = event.clientX - offset.left - 37;
      const yCord = event.clientY - offset.top - 45;
      // Removes the move if it goes out of focus
      if (xCord < -40 || xCord > 570 || yCord > 580 || yCord < -40) {
        const piece = match.myPieces.find((x) => {
          return x.name == htmlImage.classList[1];
        })
        htmlImage.style.zIndex = "10"
        match.pieceHeld = "";
        htmlImage.style.left = piece.htmlPosition[0];
        htmlImage.style.top = piece.htmlPosition[1];
        match.pieceHTML = null;
      } else {
        htmlImage.style.left = xCord + "px";
        htmlImage.style.top = yCord + "px";
      }
    }
  }
}



function mouseUpFun(match, event, htmlBoard, htmlImage) {
  if (match.myMove) {
    mouseUpFunHelper(match, event, htmlBoard, htmlImage);
  } else if (options.premove && match.premovePossible) {
    premoveMove(match, event, htmlBoard, htmlImage);
  }
}

function mouseUpFunHelper(match, event, htmlBoard, htmlImage) {
  match.pieceHTML = null;
  const piece = match.myPieces.find((x) => {
    return x.name == htmlImage.classList[1];
  })

  const offset = htmlBoard.getBoundingClientRect();
  const xCord = event.clientX - offset.left;
  const yCord = event.clientY - offset.top;
  // Find position based on pov
  const position = match.myColor == "white" ? getBoardPositionWhite(xCord, yCord) : getBoardPositionBlack(xCord, yCord);

  // Check if the move was valid
  const moves = piece.getMoves();
  for (let index = 0; index < moves.length; index++) {
    const id = String(moves[index][0]) + String(moves[index][1]);

    // Confirms move
    if (id == position) {
      document.querySelectorAll(".container-movable").forEach(e => e.remove());
      // Sets coordinates for piece
      const normalCord = normalizeCoordinates(xCord, yCord);
      piece.htmlPosition = normalCord;
      const checkBlock = match.board[moves[index][0]][moves[index][1]];
      piece.increaseMoved();

      if (checkBlock != "") {
        if (options.sound) captureAudio.play();
        match.opponentDeadPieces.push(checkBlock);
        drawDeadPieces(piece, match)
        const nameOfRemoved = checkBlock.name;
        document.querySelectorAll("." + nameOfRemoved).forEach(e => e.remove());
        match.opponentPieces.filter((elem) => {
          return elem != checkBlock
        });
        match.board[moves[index][0]][moves[index][1]] = "";
      } else {
        if (options.sound)
          moveAudio.play();
      }

      // Records history 
      const startPos = [piece.position[0], piece.position[1]];
      const endPos = [moves[index][0], moves[index][1]];
      match.moveHistory.push({
        piece: piece,
        startPos,
        endPos,
        endPiece: checkBlock
      });
      renderTable(startPos, endPos, piece, match);

      // makes the positional change
      match.board[startPos[0]][startPos[1]] = "";
      piece.setPosition(endPos[0], endPos[1]);
      match.board[piece.position[0]][piece.position[1]] = piece;



      // focuses the move
      const currentLoc = String(moves[index][0]) + String(moves[index][1])
      document.getElementById(currentLoc).classList.add("focused");


      match.myMove = false;
      // Send Server
      sendMove(match.socket, startPos, endPos);

      break;
    }

  }

  // Resets defaults
  htmlImage.style.zIndex = "10"
  match.pieceHeld = "";
  htmlImage.style.left = piece.htmlPosition[0];
  htmlImage.style.top = piece.htmlPosition[1];
}


function premoveMove(match, event, htmlBoard, htmlImage) {

  match.pieceHTML = null;
  const piece = match.myPieces.find((x) => {
    return x.name == htmlImage.classList[1];
  });

  const offset = htmlBoard.getBoundingClientRect();
  const xCord = event.clientX - offset.left;
  const yCord = event.clientY - offset.top;
  // Find position based on pov
  const position = match.myColor == "white" ? getBoardPositionWhite(xCord, yCord) : getBoardPositionBlack(xCord, yCord);

  // Check if the move was valid
  const moves = piece.getMoves();
  for (let index = 0; index < moves.length; index++) {
    const id = String(moves[index][0]) + String(moves[index][1]);

    // Confirms move
    if (id == position) {
      match.premovePossible = false;

      document.querySelectorAll(".container-movable").forEach(e => e.remove());

      // Sets coordinates for piece
      const normalCord = normalizeCoordinates(xCord, yCord);
      piece.htmlPosition = normalCord;
      const checkBlock = match.board[moves[index][0]][moves[index][1]];

      if (checkBlock != "") {
        if (options.sound) captureAudio.play();
        const nameOfRemoved = checkBlock.name;
        document.querySelectorAll("." + nameOfRemoved).forEach(e => e.remove());
      } else {
        if (options.sound)
          moveAudio.play();
      }

      // Records history 
      const startPos = [piece.position[0], piece.position[1]];
      const endPos = [moves[index][0], moves[index][1]];

      // focuses the move
      const currentLoc = String(moves[index][0]) + String(moves[index][1])
      document.getElementById(currentLoc).classList.add("focused-premove");


      match.myMove = false;
      // Send Server

      match.premoveQueue = {
        piece: piece,
        startPos,
        endPos,
        endPiece: checkBlock,
        event,
        htmlBoard,
        htmlImage,
      }

      break;
    }

  }

  // Resets defaults
  htmlImage.style.zIndex = "10"
  match.pieceHeld = "";
  htmlImage.style.left = piece.htmlPosition[0];
  htmlImage.style.top = piece.htmlPosition[1];

}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}