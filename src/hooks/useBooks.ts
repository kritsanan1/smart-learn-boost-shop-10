import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Book {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  price: number;
  currency: string;
  language: string;
  difficulty_level: string;
  stock_quantity: number;
  image_url?: string;
  is_bestseller: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const getBooksByLanguage = (language: string) => {
    return books.filter(book => book.language === language);
  };

  const getBestsellers = () => {
    return books.filter(book => book.is_bestseller);
  };

  const getNewBooks = () => {
    return books.filter(book => book.is_new);
  };

  return {
    books,
    loading,
    error,
    fetchBooks,
    getBooksByLanguage,
    getBestsellers,
    getNewBooks,
  };
};