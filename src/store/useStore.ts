import { create } from 'zustand';
import { Locale } from '@/config/i18n';

export type TryOnCategory = 'clothes' | 'makeup' | 'hair' | 'shoes';

interface AppFeatures {
  clothes: boolean;
  makeup: boolean;
  hair: boolean;
  shoes: boolean;
  ads: boolean;
}

interface UserState {
  uploadedImage: string | null;
  resultImage: string | null;
  isProcessing: boolean;
  selectedCategory: TryOnCategory | null;
  locale: Locale;
  isAdmin: boolean;
  features: AppFeatures;
  subscriptionPlan: 'free' | 'pro' | 'business';
  chatMessages: ChatMessage[];
  dailyTrials: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

interface AppActions {
  setUploadedImage: (image: string | null) => void;
  setResultImage: (image: string | null) => void;
  setIsProcessing: (processing: boolean) => void;
  setSelectedCategory: (category: TryOnCategory | null) => void;
  setLocale: (locale: Locale) => void;
  toggleAdmin: () => void;
  toggleFeature: (feature: keyof AppFeatures) => void;
  setSubscriptionPlan: (plan: 'free' | 'pro' | 'business') => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  incrementTrials: () => void;
  resetTrials: () => void;
  reset: () => void;
}

type AppStore = UserState & AppActions;

export const useStore = create<AppStore>((set) => ({
  // State
  uploadedImage: null,
  resultImage: null,
  isProcessing: false,
  selectedCategory: null,
  locale: 'en',
  isAdmin: false,
  features: {
    clothes: true,
    makeup: true,
    hair: true,
    shoes: true,
    ads: true,
  },
  subscriptionPlan: 'free',
  chatMessages: [],
  dailyTrials: 0,

  // Actions
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setResultImage: (image) => set({ resultImage: image }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setLocale: (locale) => set({ locale }),
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  toggleFeature: (feature) =>
    set((state) => ({
      features: { ...state.features, [feature]: !state.features[feature] },
    })),
  setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        { ...message, id: crypto.randomUUID(), timestamp: new Date() },
      ],
    })),
  clearChat: () => set({ chatMessages: [] }),
  incrementTrials: () => set((state) => ({ dailyTrials: state.dailyTrials + 1 })),
  resetTrials: () => set({ dailyTrials: 0 }),
  reset: () =>
    set({
      uploadedImage: null,
      resultImage: null,
      isProcessing: false,
      selectedCategory: null,
    }),
}));
