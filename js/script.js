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
    this.name = name;
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
    this.$element.children('ul').append(card.$element); // dlaczego  $element dla obiektu card???
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
}

// --------------------------------BOARD----------------------------------------
// table
var board = {
  name: 'Kaban',
  addColumn: function(column) {
    this.$element.append(column.$element); //this.$element -->board.$element
    initSortable();
  },
  $element: $('#board .column-container')
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

// -----------------------------------------------------------------------------
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
