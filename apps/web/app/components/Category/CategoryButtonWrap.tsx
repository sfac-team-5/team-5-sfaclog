'use client';
import { useEffect, useRef, useState } from 'react';
import CategoryButton from './CategoryButton';

interface CategoryButtonWrapProps {
  type: 'button' | 'tag';
  className?: string;
  gradient?: string;
  categories?: { title: string }[];
}

function CategoryButtonWrap2({
  type,
  className,
  gradient = ' to-white',
  categories = [],
}: CategoryButtonWrapProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.title);

  const [드래그여부, 드래그여부수정] = useState(false);
  const [처음클릭위치, 처음클릭위치수정] = useState(0);
  const [수평스크롤바위치, 수평스크롤바위치수정] = useState(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scrollContainer.current) {
      드래그여부수정(true);
      처음클릭위치수정(e.pageX + scrollContainer.current?.scrollLeft);
    }
  };
  const onDragEnd = () => {
    드래그여부수정(false);
  };
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!드래그여부) return;
    e.preventDefault();
    const 이동된길이 = e.pageX - 처음클릭위치;

    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft = 수평스크롤바위치 - 이동된길이;
    }
  };

  const updateScrollPosition = () => {
    const { current } = scrollContainer;
    if (current) {
      setIsAtStart(current.scrollLeft === 0);
      setIsAtEnd(
        current.scrollWidth === current.scrollLeft + current.offsetWidth,
      );
    }
  };

  const handleScroll = (direction: string) => {
    if (isScrolling) return;

    const { current } = scrollContainer;
    if (current) {
      setIsScrolling(true);

      if (direction === 'prev') {
        current.scrollLeft -= 400;
      } else {
        current.scrollLeft += 400;
      }

      setTimeout(() => {
        setIsScrolling(false);
        updateScrollPosition();
      }, 400);
    }
  };

  const checkIfOverflow = () => {
    const { current } = scrollContainer;
    if (current) {
      const containerWidth = current.offsetWidth;
      const contentWidth = current.scrollWidth;

      setIsAtStart(current.scrollLeft === 0);
      setIsAtEnd(current.scrollWidth === current.scrollLeft + containerWidth);
      setIsOverflow(contentWidth > containerWidth);
    }
  };

  const handleCategoryClick = (title: string) => {
    setActiveCategory(title);
  };

  useEffect(() => {
    checkIfOverflow();
    window.addEventListener('resize', checkIfOverflow);
    return () => window.removeEventListener('resize', checkIfOverflow);
  }, []);

  useEffect(() => {
    const { current } = scrollContainer;
    if (current) {
      current.addEventListener('scroll', updateScrollPosition);
      return () => current.removeEventListener('scroll', updateScrollPosition);
    }
  }, []);

  return (
    <div className='relative mt-6 w-full'>
      {/* 왼쪽 끝 그라데이션 */}
      {isAtStart ? null : (
        <div className='absolute left-0 top-[50%] z-10 flex h-full translate-y-[-50%] justify-start'>
          <div
            className={`pointer-events-none absolute left-0 top-[50%] translate-y-[-50%] bg-gradient-to-l from-transparent ${gradient} ${
              type === 'button' ? ' h-full w-40' : ' h-12 w-[84px]'
            }`}
          ></div>
        </div>
      )}

      {/* 버튼영역 */}
      <div
        ref={scrollContainer}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseMove={onDragMove}
        onMouseLeave={onDragEnd}
        className='hide-scroll relative w-full overflow-x-auto scroll-smooth'
      >
        <div
          className={`flex w-max ${type === 'button' ? 'gap-2' : 'gap-[9px]'}`}
        >
          {type === 'button' &&
            categories.map(category => (
              <CategoryButton
                key={category.title}
                title={category.title}
                className={className}
                active={category.title === activeCategory}
                onClick={() => handleCategoryClick(category.title)}
              />
            ))}
        </div>
      </div>

      {/* 오른쪽 끝 그라데이션 */}
      {isAtEnd ? null : (
        <div className='absolute right-0 top-[50%] z-10 flex h-full translate-y-[-50%] justify-end'>
          <div
            className={`pointer-events-none absolute right-0 top-[50%] translate-y-[-50%] bg-gradient-to-r from-transparent${gradient}${
              type === 'button' ? ' h-full w-40' : ' h-12 w-[84px]'
            }`}
          ></div>
        </div>
      )}
    </div>
  );
}

export default CategoryButtonWrap2;
