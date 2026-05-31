'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';

export default function ChatWidget() {
  const { t, isRTL } = useTranslation();
  const { chatMessages, addChatMessage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    addChatMessage({ role: 'user', content: input });

    // Simulate AI response
    setTimeout(() => {
      const responses = isRTL
        ? [
            'مرحبًا! كيف يمكنني مساعدتك في تجربة الأزياء اليوم؟',
            'يمكنني مساعدتك في اختيار الملابس المناسبة لشكل جسمك.',
            'جرّب رفع صورتك وسأساعدك في اختيار أفضل الإطلالات!',
            'هل تريد اقتراحات لمكياج يناسب بشرتك؟',
          ]
        : [
            'Hello! How can I help you with fashion today?',
            'I can help you choose clothes that match your body shape.',
            'Try uploading your photo and I\'ll help you find the best looks!',
            'Would you like makeup suggestions that suit your skin?',
          ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addChatMessage({ role: 'assistant', content: randomResponse });
    }, 1000);

    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold">AI Fashion Assistant</h4>
                <p className="text-white/70 text-xs">
                  {isRTL ? 'متصل الآن' : 'Online now'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-8">
                {isRTL ? 'ابدأ المحادثة...' : 'Start a conversation...'}
              </div>
            )}
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chat.placeholder}
                className={`flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-300 ${isRTL ? 'text-right' : ''}`}
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
