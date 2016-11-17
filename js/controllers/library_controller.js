angular.module('myApp')
.controller('LibraryController', ['$scope', function($scope){
  //need to figure out how to pass user name to know who checked out which book
$scope.shelves = ["Literature","Science","Sport","Art"];
  function Book(title, shelf, reference, presence) {
    this.title = title;
    this.shelf = shelf;
    this.reference = reference; //1 for reference 0 for normal book
    this.presence = presence;
    this.checkedOut = ""
  }

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

  
  //shelves test, will probably  need to create object

  var book1 = new Book("lit book", "literature", 1, 1);
  var book2 = new Book("second lit book", "literature", 1, 1);
  var book3 = new Book("sci book", "science", 1, 1);
  var book4 = new Book("sport book", "sports", 1, 1);
  var book5 = new Book("art book", "art", 1, 1);
  var book6 = new Book("book2", "art", 0, 1);
  var book7 = new Book("book3", "literature", 0, 1);
  var book8 = new Book("book4", "science", 0, 1);
  var book9 = new Book("book5", "literature", 0, 1);
  var book10 = new Book("book6", "art", 0, 1);
  var book11 = new Book("book7", "literature", 0, 1);
  var book12 = new Book("book8", "art", 0, 1);
  var book13 = new Book("book9", "literature", 0, 1);
  var book14 = new Book("book10", "art", 0, 1);
  var book15 = new Book("book11", "literature", 0, 1);
  var book16 = new Book("book12", "art", 0, 1);
  var book17 = new Book("book13", "science", 0, 1);
  var book18 = new Book("book14", "sports", 0, 1);
  var book19 = new Book("book15", "science", 0, 1);
  var book20 = new Book("book16", "science", 0, 1);
  var book21 = new Book("book17", "science", 0, 1);
  var book22 = new Book("book18", "sports", 0, 1);
  var book23 = new Book("book19", "sports", 0, 1);
  var book24 = new Book("book20", "sports", 0, 1);
  var book25 = new Book("book22", "sports", 0, 1);
  


  var literature = [];
  literature.push(book1);
  literature.push(book2);
  literature.push(book7);
  literature.push(book9);
  literature.push(book11);
  literature.push(book13);
  literature.push(book15);

  var science = [];
  science.push(book3);
  science.push(book8);
  science.push(book17);
  science.push(book19);
  science.push(book20);
  science.push(book21);

  var sports = [];
  sports.push(book4);
  sports.push(book22);
  sports.push(book23);
  sports.push(book24);
  sports.push(book25);
  sports.push(book18);

  var art = []
  art.push(book5);
  art.push(book6);
  art.push(book10);
  art.push(book12);
  art.push(book14);
  art.push(book16);
  var data = localStorage;
  

  //reading books info. from local storage and pushing to the shelves
  if(data.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
       var book = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(book.shelf === 'Literature') {
          literature.push(book);
        }
        else if(book.shelf === 'Science') {
          science.push(book);
        }
        else if(book.shelf === 'Sport') {
          sports.push(book);
        }
        else if(book.shelf === 'Art') {
          art.push(book);
        }
    }      
    }
  
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
  
   $scope.addBook = function(book){
    var boook = JSON.stringify(book);
    var i =  window.localStorage.length;
    window.localStorage.setItem(i++, boook);
    var book1123 = new Book(book.title, book.shelf, book.reference, 1);
    if(book.shelf=="Literature"){
      var len = literature.length;
      literature.splice(len,0,book1123);  
      $scope.library.push({'literature':book1123});
    }
    else if(book.shelf=="Science"){
      var len = science.length;
      science.splice(len,0,book1123);  
      $scope.library.push({'science':book1123});
    }
    else if(book.shelf=="Sport"){
      var len = sports.length;
      sports.splice(len,0,book1123);
      $scope.library.push({'sports':book1123});
    }
    else if(book.shelf=="Art"){
      var len = art.length;
      art.splice(len,0,book1123);
      $scope.library.push({'art':book1123});
    }
  }

//Click handler for librarian user
$scope.onClickL = function(book) {
var ref, prs;
    if(book.title){
      if(book.reference==1){
        ref="Reference Book";
      }
      else{
        ref="Ordinary Book";
      }

      if(book.presence==1){
        prs="Present";
      }
      else{
        prs="Borrowed";
      }
      alert('Book Name: ' + book.title + "\r\n" +'Book Type: '+ ref + "\r\n"+ 'Book Status: ' + prs + "\r\n"+ 'Borrowed By: ');
    }
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
