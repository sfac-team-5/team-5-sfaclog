'use client';

import { useEffect, useState } from 'react';
import { Toggle } from '@repo/ui/Toggle';
import FollowingList from './FollowingList';
import FollowerList from './FollowerList';
import { FollowDataType } from '@/types';
import FollowPagination from '@/components/Pagination/FollowPagination';

async function fetchData(userId: string, toggleState: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}/follow?filter=${toggleState}`,
    { cache: 'no-store' },
  );
  if (!response.ok) return null;
  return response.json();
}

export interface isFollowingInfoType {
  id: string;
  isFollowing: boolean;
}

interface DataType {
  count: {
    followingCount: number;
    followerCount: number;
  };
  result: FollowDataType;
  isFollowingInfo: isFollowingInfoType[];
}

function FollowContainer({ id }: { id: string }) {
  const [toggleState, setToggleState] = useState<'following' | 'followers'>(
    'following',
  );
  const [data, setData] = useState<DataType | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const handleToggleData = () => {
    setToggleState(prevState =>
      prevState === 'following' ? 'followers' : 'following',
    );
  };

  const updateCount = (
    type: 'follow' | 'unfollow' | 'delete',
    itemId?: string,
  ) => {
    setData(prevData => {
      if (!prevData) return null;

      let updatedFollowingCount = prevData.count.followingCount;
      let updatedFollowerCount = prevData.count.followerCount;
      let updatedIsFollowingInfo = [...prevData.isFollowingInfo];
      const updatedResult = { ...prevData.result };

      switch (type) {
        case 'follow':
          updatedFollowingCount += 1;
          break;
        case 'unfollow':
          updatedFollowingCount -= 1;
          break;
        case 'delete':
          updatedFollowerCount -= 1;
          if (updatedResult.expand && updatedResult.expand.followerId) {
            updatedResult.expand.followerId =
              updatedResult.expand.followerId.filter(
                user => user.id !== itemId,
              );
          }
          updatedIsFollowingInfo = updatedIsFollowingInfo.filter(
            info => info.id !== itemId,
          );
          break;
        default:
          break;
      }

      return {
        ...prevData,
        count: {
          followingCount: updatedFollowingCount,
          followerCount: updatedFollowerCount,
        },
        result: updatedResult,
        isFollowingInfo: updatedIsFollowingInfo,
      };
    });
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage !== Math.ceil(totalItems / itemsPerPage))
      setCurrentPage(prev => prev + 1);
  };

  const handleNumberPage = (number: number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    fetchData(id, toggleState).then(fetchedData => {
      if (fetchedData) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        let paginatedResult;
        if (toggleState === 'following') {
          setTotalItems(fetchedData.count.followingCount);

          paginatedResult = {
            ...fetchedData.result,
            followingId:
              fetchedData.result.followingId?.slice(startIndex, endIndex) || [],
            ...(fetchedData.result.expand && {
              expand: {
                followingId:
                  fetchedData.result.expand.followingId?.slice(
                    startIndex,
                    endIndex,
                  ) || [],
              },
            }),
          };
        }
        if (toggleState === 'followers') {
          setTotalItems(fetchedData.count.followerCount);

          paginatedResult = {
            ...fetchedData.result,
            followerId:
              fetchedData.result.followerId?.slice(startIndex, endIndex) || [],
            ...(fetchedData.result.expand && {
              expand: {
                followerId:
                  fetchedData.result.expand.followerId?.slice(
                    startIndex,
                    endIndex,
                  ) || [],
              },
            }),
          };
        }

        setData({
          ...fetchedData,
          result: paginatedResult,
        });
      }
    });
  }, [id, toggleState, currentPage]);

  if (!data) return null;

  return (
    <>
      <Toggle
        leftText={`팔로잉 ${data.count.followingCount}`}
        rightText={`팔로워 ${data.count.followerCount}`}
        onToggle={handleToggleData}
      />

      <div className='mb-10 mt-[52px] w-full'>
        {toggleState === 'following' && (
          <FollowingList id={id} data={data.result} updateCount={updateCount} />
        )}
        {toggleState === 'followers' && (
          <FollowerList
            id={id}
            data={data.result}
            isFollowingInfo={data.isFollowingInfo}
            updateCount={updateCount}
          />
        )}
      </div>

      <FollowPagination
        totalItems={totalItems}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleNumberPage={handleNumberPage}
      />
    </>
  );
}

export default FollowContainer;
