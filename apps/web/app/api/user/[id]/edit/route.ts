import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

interface UserData {
  nickname: string;
  phone: string;
  intro: string;
  interests: any[];
  offers: any[];
  sns: any;
  career: any;
  pageUrl: string;
  avatar?: any;
}

export async function POST(request: NextRequest) {
  try {
    const pb = new PocketBase(`${process.env.POCKETBASE_URL}`);

    const formData = await request.formData();
    const dataJson = formData.get('data');

    if (typeof dataJson === 'string') {
      const dataObj = JSON.parse(dataJson);

      const data: UserData = {
        nickname: dataObj.nickname,
        phone: dataObj.phone,
        intro: dataObj.intro,
        interests: dataObj.interests,
        offers: dataObj.offers,
        sns: dataObj.sns,
        career: dataObj.career,
        pageUrl: dataObj.pageUrl,
      };

      const avatarData = formData.get('avatar');
      if (avatarData != null) {
        data.avatar = avatarData;
      }

      const record = await pb.collection('users').update(dataObj.id, data);
      revalidatePath('/myprofile');
      return NextResponse.json({ record, revalidated: true });
    }
  } catch (error: any) {
    const errorData = error.originalError.data;
    const firstKey = Object.keys(errorData)[0];
    const errorMessage = errorData[firstKey as string].message;

    return NextResponse.json({
      status: error.originalError.status || 400, // 상태 코드
      message: errorMessage || 'Failed to update record.', // 오류 메시지
    });
  }
}
