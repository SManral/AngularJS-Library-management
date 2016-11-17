angular.module('myApp')
.controller('LibraryController', ['$scope', function($scope){
  //need to figure out how to pass user name to know who checked out which book
  $scope.shelves = ["Literature","Science","Sport","Art"];

  //Getting user name using local storage
  var curUser = window.localStorage.getItem("current_user");
  $scope.user = curUser;

  function Book(title, shelf, reference, presence) {
    this.title = title;
    this.shelf = shelf;
    this.reference = reference; //1 for reference 0 for normal book
    this.presence = presence;
    this.checkedOut = ""
  }

  //need username
  Book.prototype.checkOutBook = function (username) {
    //check num books user has checked out
    var userBookCount = 0;
    for(var i = 0; i < $scope.library.length; i++){
      //check each book in library to see if user has checked it out and increment counter when true
      if($scope.library[i].literature.checkedOut == username) { userBookCount++; }
      if($scope.library[i].science.checkedOut == username) { userBookCount++; }
      if($scope.library[i].sports.checkedOut == username) { userBookCount++; }
      if($scope.library[i].art.checkedOut == username) { userBookCount++; }
    }
    if (userBookCount >= 2){
      alert("You have already checked out the maximum (2) number of books");
      return;
    }

    if(this.checkedOut == "" && this.presence == 1){
      this.checkedOut = username;
      this.presence = 0;
    }
  };

  Book.prototype.returnBook = function () {
    if(curUser == this.checkedOut && this.presence == 0){
      this.checkedOut = "";
      this.presence = 1;
    } else {
      return this.checkedOut;
    }
  };

  //test books
  var book1 = new Book("lit book", "literature", 0, 0);
  book1.checkedOut = "u100";
  var book11 = new Book("second lit book", "literature", 1, 1);
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

   $scope.addBook = function(book){debugger;
    var boook = JSON.stringify(book);
    window.localStorage.setItem(book.title, boook);
    //$scope.books[]
    var book1123 = new Book(book.title, book.shelf, book.reference, 1);
    if(book.shelf=="Literature"){
      var len = literature.length;
      literature.splice(len,0,book1123);
      //if($scope.library[0].literature==""){
      $scope.library.splice(len,0,{'literature':book1123});
    //}
    }
    else if(book.shelf=="Science"){
      var len = science.length;
      science.splice(len,0,book1123);
      //if($scope.library[1].science==""){
      $scope.library.splice(len,0,{'science':book1123});
    //}
    }
    else if(book.shelf=="Sport"){
      var len = sports.length;
      sports.splice(len,0,book1123);
      $scope.library.splice(len,0,{'sports':book1123});
    }
    else if(book.shelf=="Art"){
      var len = art.length;
      art.splice(len,0,book1123);
      $scope.library.splice(len,0,{'art':book1123});
    }
  }

  //for librarian
  // $scope.addBook = function(book) {
  //   addBook(book);
  //   if(book.title){
  //     alert('Book Added successfully');
  //   }
  // }

//Click handler for librarian user
$scope.onClickL = function(book) {debugger;
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
        prs="Borrowed"
      }
      alert('Book Name: ' + book.title + "\r\n" +'Book Type: '+ ref + "\r\n"+ 'Book Status: ' + prs + "\r\n"+ 'Borrowed By: ');
    }
  }

    //Click handler for undergraduate user
  $scope.onClick = function(book) {
    if(book.title){
      //check reference
      if(book.reference == 1){
        //only display cannot be checked out
        alert('Book Name: ' + book.title + "\r\n" +"Book Type: reference (cannot be checked out)\r\n");
        return;
      }


      if (book.presence == 1){

        if(confirm("Would you like to check out: " + book.title)){
          book.checkOutBook(curUser);
        }
      } else {

        if(book.checkedOut == curUser){
          //user can choose whether they want to return book they have checked out
          if (confirm("Would you like to return " + book.title + "\r\n")){
            book.returnBook();
          }
        } else {
          alert(book.title + " is checked out by " + book.checkedOut);
        }
      }
    }
  }
}]);
