import { SearchBar } from '@/components/Modal/Search/SearchBar';
import React from 'react';

interface SearchResultProps {
  query: string;
  resultCnt: number;
}

export function SearchResult({ query, resultCnt }: SearchResultProps) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-6 flex'>
        <SearchBar />
      </div>
      <div className='text-B1B16 text-text-primary mb-2'>
        &apos;<span className='text-text-point'>{query}</span>
        &apos;에 대한 검색 결과
      </div>
      {resultCnt !== 0 && <div>총 {resultCnt}개의 결과를 발견하였습니다.</div>}
      {resultCnt === 0 && <div>검색 결과가 존재하지 않습니다.</div>}
    </div>
  );
}
