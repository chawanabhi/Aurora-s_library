//package com.lms.controller;
//
//import com.lms.model.Book;
//import com.lms.services.BookService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//public class BookController {
//    @Autowired
//    private BookService bookService;
//
//    @GetMapping("/books")
//    public List<Book> getAllBooks(){
//        return bookService.getAllBooks();
//    }
//
//    @GetMapping("/books/{id}")
//    public Book getBookByID(@PathVariable long id){
//        return bookService.getBookById(id);
//    }
//
//    @PostMapping("/books")
//    public @ResponseBody Book addBook(@RequestBody Book book) {
//        return bookService.addBook(book);
//    }
//
//    @PutMapping("/books/{id}")
//    public void updateBook(@RequestBody Book book, @PathVariable long id) {
//        Book setBook = bookService.getBookById(id);
//        setBook.setBookTitle(book.getBookTitle());
//        setBook.setAuthor(book.getAuthor());
//        setBook.setCategory(book.getCategory());
//        setBook.setDescription(book.getDescription());
//        setBook.setQuantity(book.getQuantity());
//        setBook.setAvailability(book.getAvailability());
//        setBook.setPublishedDate(book.getPublishedDate());
//        bookService.updateBook(setBook);
//    }
//
//    @DeleteMapping("/books/{id}")
//    public void deleteBook(@PathVariable long id) {
//        bookService.deleteBook(id);
//    }
//}
package com.lms.controller;

import com.lms.model.Book;
import com.lms.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books") // Optional: cleaner URL structure
@CrossOrigin(origins = "*") // Optional: allow frontend access (React)
public class BookController {

    @Autowired
    private BookService bookService;

    // ✅ Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // ✅ Get book by ID
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable long id) {
        return bookService.getBookById(id);
    }

    // ✅ Add a new book
    @PostMapping
    public @ResponseBody Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    // ✅ Update book
    @PutMapping("/{id}")
    public void updateBook(@RequestBody Book book, @PathVariable long id) {
        Book existingBook = bookService.getBookById(id);
        existingBook.setBookTitle(book.getBookTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setCategory(book.getCategory());
        existingBook.setDescription(book.getDescription());
        existingBook.setQuantity(book.getQuantity());
        existingBook.setAvailability(book.getAvailability());
        existingBook.setPublishedDate(book.getPublishedDate());
        existingBook.setImageUrl(book.getImageUrl()); // ✅ Add image URL support
        bookService.updateBook(existingBook);
    }

    // ✅ Delete book
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable long id) {
        bookService.deleteBook(id);
    }
}
