'use client';
import { useEffect, useRef, useState } from 'react';
import CategoryButton from './CategoryButton';
import FollowingButton from './FollowingButton';

interface CategoryButtonWrapProps {
  type: 'category' | 'following';
  className?: string;
  gradient?: string;
  list?: { value: string; id?: string }[];
  pageType?: 'popular' | 'recently';
}

function CategoryButtonWrap2({
  type,
  className,
  gradient = ' to-white',
  list = [],
  pageType = 'popular',
}: CategoryButtonWrapProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  // const [isOverflow, setIsOverflow] = useState(false);
  // const [isScrolling, setIsScrolling] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [activeList, setActiveList] = useState(list[0]?.value);

  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scrollContainer.current) {
      setIsDragging(true);
      setStartPoint(e.pageX + scrollContainer.current?.scrollLeft);
    }
  };
  const onDragEnd = () => {
    setIsDragging(false);
  };
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const dragLenght = e.pageX - startPoint;

    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft = scrollPosition - dragLenght;
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

  // const handleScroll = (direction: string) => {
  //   if (isScrolling) return;

  //   const { current } = scrollContainer;
  //   if (current) {
  //     setIsScrolling(true);

  //     if (direction === 'prev') {
  //       current.scrollLeft -= 400;
  //     } else {
  //       current.scrollLeft += 400;
  //     }

  //     setTimeout(() => {
  //       setIsScrolling(false);
  //       updateScrollPosition();
  //     }, 400);
  //   }
  // };

  const checkIfOverflow = () => {
    const { current } = scrollContainer;
    if (current) {
      const containerWidth = current.offsetWidth;
      const contentWidth = current.scrollWidth;

      setIsAtStart(current.scrollLeft === 0);
      setIsAtEnd(current.scrollWidth === current.scrollLeft + containerWidth);
      // setIsOverflow(contentWidth > containerWidth);
    }
  };

  const handleCategoryClick = (title: string) => {
    setActiveList(title);
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
    <div className='relative mb-7 mt-[52px] w-full'>
      {/* 왼쪽 끝 그라데이션 */}
      {isAtStart ? null : (
        <div className='absolute left-0 top-[50%] z-10 flex h-full translate-y-[-50%] justify-start'>
          <div
            className={`pointer-events-none absolute left-0 top-[50%] h-full w-40 translate-y-[-50%] bg-gradient-to-l from-transparent${gradient} `}
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
          className={`flex w-max ${type === 'category' ? 'gap-2' : 'gap-6'}`}
        >
          {type === 'category'
            ? list.map(category => (
                <CategoryButton
                  key={category.value}
                  title={category.value}
                  className={className}
                  active={category.value === activeList}
                  onClick={() => handleCategoryClick(category.value)}
                  pageType={pageType}
                />
              ))
            : list.map(following => (
                <FollowingButton
                  key={following.value}
                  user={following.id ? following.id : '전체'}
                  userName={following.value}
                  className={className}
                  active={following.value === activeList}
                  onClick={() => handleCategoryClick(following.value)}
                />
              ))}
        </div>
      </div>

      {/* 오른쪽 끝 그라데이션 */}
      {isAtEnd ? null : (
        <div className='absolute right-0 top-[50%] z-10 flex h-full translate-y-[-50%] justify-end'>
          <div
            className={`pointer-events-none absolute right-0 top-[50%] h-full w-40 translate-y-[-50%] bg-gradient-to-r from-transparent${gradient}`}
          ></div>
        </div>
      )}
    </div>
  );
}

export default CategoryButtonWrap2;
