import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VoiceMessage {
  id: string;
  audioUrl: string;
  timestamp: Date;
}

interface VoiceMessageContextType {
  messages: VoiceMessage[];
  addMessage: (audioBlob: Blob, timestamp?: Date) => void;
  deleteMessage: (id: string) => void;
}

const VoiceMessageContext = createContext<VoiceMessageContextType | undefined>(undefined);

export const VoiceMessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<VoiceMessage[]>([]);

  const addMessage = (audioBlob: Blob, timestamp: Date = new Date()) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const newMessage: VoiceMessage = {
      id: Date.now().toString(),
      audioUrl,
      timestamp,
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => {
      const message = prev.find((m) => m.id === id);
      if (message) {
        URL.revokeObjectURL(message.audioUrl);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  return (
    <VoiceMessageContext.Provider value={{ messages, addMessage, deleteMessage }}>
      {children}
    </VoiceMessageContext.Provider>
  );
};

export const useVoiceMessages = () => {
  const context = useContext(VoiceMessageContext);
  if (context === undefined) {
    throw new Error('useVoiceMessages must be used within a VoiceMessageProvider');
  }
  return context;
}; 