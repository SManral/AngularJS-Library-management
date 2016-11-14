angular.module('myApp')
.controller('LibraryController', ['$scope', function($scope){
  //need to figure out how to pass user name to know who checked out which book

  function Book(title, shelf, reference, presence) {
    this.title = title;
    this.shelf = shelf;
    this.reference = reference; //1 for reference 0 for normal book
    this.presence = presence;
    this.checkedOut = ""
  }

  //need username
  Book.prototype.checkOutBook = function () {

  };

  Book.prototype.returnBook = function () {
    if(username == this.checkedOut && this.presence == 0){
      this.checkedOut = "";
      this.presence = 1;
    } else {
      return this.checkedOut;
    }
  };

  //test books
  var book1 = new Book("lit book", "literature", 0, 0);
  var book11 = new Book("second lit book", "literature", 0, 1);
  var book2 = new Book("sci book", "science", 0, 1);
  var book3 = new Book("sport book", "sports", 0, 1);
  var book4 = new Book("art book", "art", 0, 1);

  //shelves test, will probably  need to create object
  var literature = [];
  literature.push(book1);
  literature.push(book11);

  var science = [];
  science.push(book2);

  var sports = [];
  sports.push(book3);

  var art = [];
  art.push(book4);

  //Change to having library class
  $scope.library = [];

  //loop to add each shelf to shelves array in a format that works with ng repeat
  var i = 0;
  while(i < literature.length || i < science.length || i < sports.length || i < art.length){
    var literature_tmp = "";
    var science_tmp = "";
    var sports_tmp = "";
    var art_tmp = "";

    if (literature[i]){ literature_tmp = literature[i]; }

    if (science[i]){ science_tmp = science[i]; }

    if (sports[i]){ sports_tmp = sports[i]; }

    if (art[i]){ art_tmp = art[i]; }

    //Use an array of json objects to store
    $scope.library.push({'literature':literature_tmp, 'science':science_tmp, 'sports': sports_tmp, 'art': art_tmp});
    i++;
  }

  //utility function to be used for adding books by librarian
  function addRow(){
    $scope.library.push({'literature':"", 'science':"", 'sports': "", 'art': ""});
  }

  //Click handler for undergraduate user
  $scope.onClick = function(book) {

    if(book.title){
      alert('clicked: ' + book.title);
      if (book.presence == 1){
        book.presence = 0;
      } else {
        book.presence = 1;
      }
    }
  }
}]);
