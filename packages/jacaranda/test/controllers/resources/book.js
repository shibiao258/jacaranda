import { _, findKey } from '@kitmi/utils';
import { Controller } from '../../../src';

let books = [
    { id: 1, name: 'book 1' },
    { id: 2, name: 'book 2' },
    { id: 3, name: 'book 3' },
];

class MyController extends Controller {
    async query_(ctx) {
        this.send(ctx, books);
    }

    async get_(ctx, id) {
        const book = _.find(books, (book) => book.id === parseInt(id));

        this.send(ctx, book);
    }

    async post_(ctx) {
        const newBook = { ...ctx.request.body, id: books.length + 1 };
        books.push(newBook);

        this.send(ctx, newBook);
    }

    async put_(ctx, id) {
        const book = _.find(books, (book) => book.id === parseInt(id));
        Object.assign(book, ctx.request.body);

        this.send(ctx, book);
    }

    async delete_(ctx, id) {
        const bookIndex = findKey(books, (book) => book.id === parseInt(id));
        const deleted = books.splice(bookIndex, 1);

        this.send(ctx, deleted[0]);
    }
}

export default MyController;
