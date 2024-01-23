// import { NextRequest, NextResponse } from 'next/server';
// import PocketBase from 'pocketbase';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const pb = new PocketBase('http://3.35.176.72:8090');
//     const resultList = await pb.collection('logs').getOne(params.id);
//     return NextResponse.json(resultList);
//   } catch (error) {
//     return NextResponse.json({
//       code: 404,
//       message: "The requested resource wasn't found.",
//       data: {},
//     });
//   }
// }
