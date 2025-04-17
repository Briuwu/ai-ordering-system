"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { chatbot } from "@/actions/chatbot";
import { Chat } from "@/lib/types";
import { toast } from "sonner";
import { useCartStore } from "@/providers/cart-store-provider";

// Define message type
type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

type Orders = {
  orders: Chat["orders"];
  chatId: string;
};

export default function FloatingChat() {
  const { clearCart, addToCart, items, removeFromCart } = useCartStore(
    (state) => state,
  );
  const [orders, setOrders] = useState<Orders[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        role: "user",
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const response = await chatbot(input);

      const responseData = JSON.parse(response!) as Chat;
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseData.message,
        role: "assistant",
      };

      const uniqueOrders = new Set(
        responseData.orders.map((order) => order.slug),
      );

      // Filter out duplicate orders
      const filteredOrders = responseData.orders.filter((order) =>
        uniqueOrders.has(order.slug),
      );

      if (responseData.orders.length > 0) {
        clearCart();
        setOrders((prev) => [
          ...prev,
          { chatId: assistantMessage.id, orders: filteredOrders },
        ]);
      }

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        console.error("Error:", error);
        toast.error("An error occurred while processing your request.");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: error.message,
            role: "assistant",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-4 bottom-4">
      {/* Floating button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed right-4 bottom-4 h-14 rounded-full shadow-lg"
        >
          <span className="hidden md:block">Use our AI Chat Bot to order!</span>{" "}
          <MessageCircle className="h-10 w-10" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={cn(
            "transform transition-all duration-300 ease-in-out",
            isOpen
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0",
          )}
        >
          <Card className="w-80 shadow-xl sm:w-96">
            <CardHeader className="flex flex-row items-center justify-between border-b p-3">
              <h3 className="font-semibold">AI Chat Ordering Assistant</h3>
              <Button variant="ghost" size="icon" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="h-72 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="text-muted-foreground flex h-full items-center justify-center text-center">
                  <p>
                    No messages yet. Ask me anything and I will help you with
                    your order!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted",
                        )}
                      >
                        {message.content}
                      </div>
                      {orders
                        .filter((order) => order.chatId === message.id)
                        .map((order) => (
                          <div
                            key={order.chatId}
                            className="max-w-[80%] divide-y p-3"
                          >
                            {order.orders.map((item) => {
                              const isAdded = items.some(
                                (cartItem) => cartItem.slug === item.slug,
                              );
                              return (
                                <div
                                  key={item.slug}
                                  className="flex items-center justify-between py-2"
                                >
                                  <div
                                    className={cn(
                                      isAdded && "line-through opacity-50",
                                    )}
                                  >
                                    <p>{item.name}</p>
                                    <p className="text-red text-xs">
                                      {formatPrice(item.price)}
                                    </p>
                                  </div>
                                  {isAdded ? (
                                    <Button
                                      onClick={() => {
                                        removeFromCart(item.slug);
                                        toast.success(
                                          `${item.name} removed from cart.`,
                                        );
                                      }}
                                      variant="ghost"
                                    >
                                      <X />
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        addToCart(item);
                                        toast.success(
                                          `${item.name} added successfully.`,
                                        );
                                      }}
                                      variant="ghost"
                                    >
                                      <Plus />
                                    </Button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="bg-muted max-w-[80%] rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current delay-75" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current delay-150" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>

            <CardFooter className="flex-col gap-2 p-3 pt-0">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled={isLoading}
                  maxLength={150}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="text-muted-foreground w-full text-left text-xs">
                {input.length}/150
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
