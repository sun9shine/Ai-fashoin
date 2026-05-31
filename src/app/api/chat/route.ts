import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, SYSTEM_PROMPT_EN } from '@/config/system-prompt';

export async function POST(request: NextRequest) {
  try {
    const { message, locale, image } = await request.json();

    // Select system prompt based on locale
    const systemPrompt = locale === 'ar' ? SYSTEM_PROMPT : SYSTEM_PROMPT_EN;

    // In production, this would call an AI API (OpenAI, etc.)
    // For now, return a structured response
    const response = {
      message: generateResponse(message, locale, !!image),
      suggestions: generateSuggestions(locale),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function generateResponse(message: string, locale: string, hasImage: boolean): string {
  if (hasImage) {
    return locale === 'ar'
      ? 'تم تحليل صورتك! يمكنني مساعدتك في تجربة الملابس أو المكياج أو تسريحات الشعر أو الأحذية. ماذا تريد تجربته؟'
      : 'Your photo has been analyzed! I can help you try on clothes, makeup, hairstyles, or shoes. What would you like to try?';
  }

  // Simple keyword-based responses for demo
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('clothes') || lowerMessage.includes('ملابس')) {
    return locale === 'ar'
      ? 'لتجربة الملابس، يرجى رفع صورة واضحة لجسمك الكامل. سأساعدك في اختيار أفضل الأزياء التي تناسب شكل جسمك.'
      : 'To try on clothes, please upload a clear full-body photo. I\'ll help you choose the best outfits that suit your body shape.';
  }

  if (lowerMessage.includes('makeup') || lowerMessage.includes('مكياج')) {
    return locale === 'ar'
      ? 'لتجربة المكياج، ارفع صورة واضحة لوجهك بإضاءة جيدة. يمكنني اقتراح إطلالات خفيفة أو مسائية أو لحفلات الزفاف.'
      : 'To try makeup, upload a clear photo of your face with good lighting. I can suggest light, evening, or wedding looks.';
  }

  if (lowerMessage.includes('hair') || lowerMessage.includes('شعر')) {
    return locale === 'ar'
      ? 'يمكنني مساعدتك في تجربة تسريحات شعر مختلفة! ارفع صورة لوجهك وسأقترح تسريحات تناسب شكل وجهك.'
      : 'I can help you try different hairstyles! Upload a photo of your face and I\'ll suggest styles that match your face shape.';
  }

  return locale === 'ar'
    ? 'مرحبًا! أنا مساعدك الذكي للأزياء والجمال. يمكنني مساعدتك في تجربة الملابس والمكياج وتسريحات الشعر والأحذية. كيف يمكنني مساعدتك اليوم؟'
    : 'Hello! I\'m your AI fashion and beauty assistant. I can help you try on clothes, makeup, hairstyles, and shoes. How can I help you today?';
}

function generateSuggestions(locale: string): string[] {
  return locale === 'ar'
    ? ['جرّب فستان أنيق', 'اقترح مكياج لحفلة', 'غيّر تسريحة شعري', 'أرني أحذية مناسبة']
    : ['Try an elegant dress', 'Suggest party makeup', 'Change my hairstyle', 'Show me matching shoes'];
}
