"use client";

import { GET_BOOKS } from "@/graphql/schema/books";
import { useSuspenseQuery } from "@apollo/client";

interface BookType {
  id: number;
  author_name: string;
  title: string;
  year: string;
}

const Book = () => {
  const { data } = useSuspenseQuery<{ getAllBooks: BookType[] }>(GET_BOOKS);
  console.log(data?.getAllBooks);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-20 "> All Books</h1>
      <div className="mt-10 flex justify-center">
        {data?.getAllBooks && data.getAllBooks.length > 0 ? (
          <table className="border">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {data.getAllBooks.map((book) => (
                <tr key={book.id}>
                  <td className="border p-2">{book.id}</td>
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.author_name}</td>
                  <td className="border p-2">{book.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default Book;
