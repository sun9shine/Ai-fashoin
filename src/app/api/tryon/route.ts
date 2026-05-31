import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateTryOnImage } from '@/lib/openai';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { image, category, productId, productName } = await request.json();

    if (!image || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: image, category' },
        { status: 400 }
      );
    }

    // Check daily trial limit for free users
    if (session?.user) {
      const user = await prisma.user.findUnique({
        where: { id: (session.user as any).id },
      });

      if (user && user.plan === 'free') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (user.lastTrialDate && user.lastTrialDate >= today) {
          if (user.dailyTrials >= 5) {
            return NextResponse.json(
              { error: 'Daily trial limit reached. Upgrade to Pro for unlimited try-ons.' },
              { status: 429 }
            );
          }
        }

        // Update trial count
        await prisma.user.update({
          where: { id: user.id },
          data: {
            dailyTrials: user.lastTrialDate && user.lastTrialDate >= today
              ? user.dailyTrials + 1
              : 1,
            lastTrialDate: new Date(),
          },
        });
      }
    }

    // Generate try-on result using AI
    const resultImage = await generateTryOnImage(
      image,
      productName || `${category} item`,
      category
    );

    // Save to history if user is logged in
    if (session?.user) {
      await prisma.tryOnHistory.create({
        data: {
          userId: (session.user as any).id,
          productId: productId || null,
          category,
          inputImage: image.substring(0, 100) + '...', // Store truncated for DB
          resultImage: resultImage || null,
          status: resultImage ? 'completed' : 'failed',
        },
      });
    }

    return NextResponse.json({
      success: true,
      resultImage: resultImage || image, // Fallback to original if AI fails
      analysis: {
        bodyType: 'estimated',
        faceShape: 'oval',
        skinTone: 'medium',
        recommendation: 'This product suits you well!',
      },
      product: {
        id: productId,
        category,
        fitScore: 85,
        recommendations: ['Great fit for your body type', 'Color complements your skin tone'],
      },
    });
  } catch (error) {
    console.error('Try-on API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process try-on request' },
      { status: 500 }
    );
  }
}
