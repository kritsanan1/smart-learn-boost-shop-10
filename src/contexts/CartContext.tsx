import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  book_id: string;
  quantity: number;
  book: {
    id: string;
    title: string;
    price: number;
    image_url: string;
    stock_quantity: number;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (bookId: string, quantity?: number) => Promise<void>;
  updateQuantity: (bookId: string, quantity: number) => Promise<void>;
  removeFromCart: (bookId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart items when user changes
  useEffect(() => {
    if (user) {
      loadCartItems();
    } else {
      setItems([]);
    }
  }, [user]);

  const loadCartItems = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('cart_items')
        .select(`
          id,
          book_id,
          quantity,
          book:books(id, title, price, image_url, stock_quantity)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading cart items:', error);
      toast.error('เกิดข้อผิดพลาดในการโหลดตรทะเบียนสินค้า');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (bookId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าในตะกร้า');
      return;
    }

    try {
      // Check if item already exists in cart
      const existingItem = items.find(item => item.book_id === bookId);
      
      if (existingItem) {
        await updateQuantity(bookId, existingItem.quantity + quantity);
      } else {
        const { error } = await (supabase as any)
          .from('cart_items')
          .insert({
            user_id: user.id,
            book_id: bookId,
            quantity,
          });

        if (error) throw error;
        
        await loadCartItems();
        toast.success('เพิ่มสินค้าในตะกร้าสำเร็จ');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    }
  };

  const updateQuantity = async (bookId: string, quantity: number) => {
    if (!user) return;

    try {
      if (quantity <= 0) {
        await removeFromCart(bookId);
        return;
      }

      const { error } = await (supabase as any)
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('book_id', bookId);

      if (error) throw error;
      
      await loadCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('เกิดข้อผิดพลาดในการอัปเดตจำนวนสินค้า');
    }
  };

  const removeFromCart = async (bookId: string) => {
    if (!user) return;

    try {
      const { error } = await (supabase as any)
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('book_id', bookId);

      if (error) throw error;
      
      await loadCartItems();
      toast.success('ลบสินค้าออกจากตะกร้าสำเร็จ');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('เกิดข้อผิดพลาดในการลบสินค้า');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await (supabase as any)
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      
      setItems([]);
      toast.success('ล้างตะกร้าสำเร็จ');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('เกิดข้อผิดพลาดในการล้างตะกร้า');
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};