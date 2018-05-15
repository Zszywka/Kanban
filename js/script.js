// create id:
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
// --------------------------------COLUMN---------------------------------------
  // class column
  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name || 'new column';
    this.$element = createColumn();  // this.$element ==> div.column

    function createColumn() {
      // create components of columne
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

      // add events (click)
      $columnDelete.click(function() {
        self.removeColumn();
      });

      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });

      // construction column element
      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);

      // retur of created column
      return $column;
    }
  }

// column methods - add card, remove column
Column.prototype = {
  addCard: function(card) {
    this.$element.children('ul').append(card.$element);
  },
  removeColumn: function() {
    this.$element.remove();
  }
};
// ------------------------------------CARD-------------------------------------
//Card class
function Card(description) {
   var self = this;

   this.id = randomString();
   this.description = description;
   this.$element = createCard();

   function createCard() {
       //Card elements
       var $card = $('<li>').addClass('card');
       var $cardDescription = $('<p>').addClass('card-description').text(self.description);
       var $cardDelete = $('<button>').addClass('btn-delete btn').text('x');

       //Card Events - delete card
       $cardDelete.click(function () {
           self.removeCard();
       });
       //Add card with delete button
       $card.append($cardDelete)
           .append($cardDescription);

       return $card;
   }
}
//Delete method
Card.prototype = {
   removeCard: function() {
       this.$element.remove();
   }
};

// --------------------------------BOARD----------------------------------------
var board = {
  name: 'Kaban',
  addColumn: function(column) {
    this.$element.append(column.$element); //this.$element -->board.$element
    initSortable();
  },
  $element: $('#board .column-container')
};

var body = {
  addBoard: function(board) {
    this.$element.append(board.$element);
  },
  $element: $('<body> #board')
};
// drag and drop cards (function for the board) --> function drag'n'drop and method sortable() in jQueryUI
function initSortable() {
 $('.column-card-list').sortable({   //<ul>
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}

// create column event (on button in HTML)
$('.create-column').click(function() {
    var name = prompt('Enter a column name');
    var column = new Column(name);
        board.addColumn(column);
});

// create board event(on button in HTML)
$('.create-board').click(function() {
    var name = prompt('Enter a board name');
    var board = new Board(name);
        body.addBoard(board);
});

function Board(name) {
  var self = this;

  this.id = randomString();
  this.name = name || 'new board';
  this.$element = createBoard();

  function createBoard(name) {
    var $board = $('<div>').addClass('board');
    var $boardTitle = $('<h2>').addClass('board-title').text(this.name);
    var $boardColumnList = $('<div>').addClass('column-container');
    var $boardAddColumn = $('<button>').addClass('add-column').text('Add a column');
    var $boardDelete = $('<button>').addClass('btn-delete-board').text('x');

    $boardAddColumn.click(function() {
      self.addColumn(new Column(prompt('Enter the name of the column')));
    });
    $boardDelete.click(function(){
      self.removeBoard();
    });
    $board.append($boardTitle)
    .append($boardColumnList)
    .append($boardAddColumn)
    .append($boardDelete);

    return $board;
  }
}

Board.prototype = function(column) {
  this.$element.append(column.$elemnet);
  initSortable();
};

Board.prototype = {
  removeBoard: function() {
    this.$element.remove();
  },
  addColumn: function(column) {
    this.$element.children('div').append(column.$element);
  }
};
// -----------------------------------------------------------------------------
// create boards


// create columns
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// add columns to the board
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// create cards
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// add card to the columns
todoColumn.addCard(card1);
doingColumn.addCard(card2);
