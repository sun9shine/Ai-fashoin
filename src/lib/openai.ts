import OpenAI from 'openai';
import { SYSTEM_PROMPT, SYSTEM_PROMPT_EN } from '@/config/system-prompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatWithAI(
  message: string,
  locale: string = 'en',
  imageBase64?: string
) {
  const systemPrompt = locale === 'ar' ? SYSTEM_PROMPT : SYSTEM_PROMPT_EN;

  const messages: any[] = [
    { role: 'system', content: systemPrompt },
  ];

  if (imageBase64) {
    messages.push({
      role: 'user',
      content: [
        { type: 'text', text: message },
        {
          type: 'image_url',
          image_url: { url: imageBase64 },
        },
      ],
    });
  } else {
    messages.push({ role: 'user', content: message });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'No response generated.';
  } catch (error: any) {
    console.error('OpenAI API Error:', error.message);
    // Fallback response when API key is not configured
    if (locale === 'ar') {
      return 'مرحبًا! أنا مساعدك الذكي للأزياء. يرجى التأكد من إعداد مفتاح OpenAI API للحصول على ردود ذكية كاملة. في الوقت الحالي، يمكنك تجربة رفع صورتك واختيار المنتجات!';
    }
    return 'Hello! I\'m your AI fashion assistant. Please ensure your OpenAI API key is configured for full AI responses. In the meantime, you can try uploading your photo and selecting products!';
  }
}

export async function generateTryOnImage(
  userImage: string,
  productDescription: string,
  category: string
) {
  try {
    // Use DALL-E for image generation (or integrate with specialized try-on APIs)
    const prompt = `Realistic photo of a person wearing ${productDescription}. Category: ${category}. 
    Maintain the person's original face and body proportions. 
    The result should look like a real photograph, not a rendering.
    Professional lighting, high quality, realistic shadows and fabric texture.`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
    });

    return response.data?.[0]?.url || null;
  } catch (error: any) {
    console.error('Image Generation Error:', error.message);
    return null;
  }
}
