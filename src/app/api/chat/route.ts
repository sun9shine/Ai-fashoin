import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { message, locale, image } = await request.json();

    if (!message && !image) {
      return NextResponse.json(
        { error: 'Message or image is required' },
        { status: 400 }
      );
    }

    // Call OpenAI with system prompt
    const aiResponse = await chatWithAI(
      message || 'Please analyze this image and suggest fashion items.',
      locale || 'en',
      image
    );

    return NextResponse.json({
      message: aiResponse,
      suggestions: generateSuggestions(locale || 'en'),
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function generateSuggestions(locale: string): string[] {
  return locale === 'ar'
    ? ['جرّب فستان أنيق', 'اقترح مكياج لحفلة', 'غيّر تسريحة شعري', 'أرني أحذية مناسبة']
    : ['Try an elegant dress', 'Suggest party makeup', 'Change my hairstyle', 'Show me matching shoes'];
}
