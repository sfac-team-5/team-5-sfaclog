function padZero(num: number) {
  return num < 10 ? '0' + num : num.toString();
}

export function formatDate(inputDate: string) {
  const now = new Date();
  const input = new Date(inputDate);
  const diff = now.getTime() - input.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < hour) {
    return `${Math.floor(diff / minute)}분 전`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}시간 전`;
  } else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}일 전`;
  } else {
    return `${input.getFullYear().toString().substr(2, 2)}.${padZero(input.getMonth() + 1)}.${padZero(input.getDate())}`;
  }
}

export function formatNumber(num: number) {
  if (num >= 10000) {
    const divided = num / 10000;
    return (
      (divided - Math.floor(divided) < 0.01
        ? Math.floor(divided)
        : divided.toFixed(1)) + 'M'
    );
  } else if (num >= 1000) {
    const divided = num / 1000;
    return (
      (divided - Math.floor(divided) < 0.01
        ? Math.floor(divided)
        : divided.toFixed(1)) + 'K'
    );
  } else {
    return num.toString();
  }
}

export function formatCommentDate(inputDate: string) {
  const input = new Date(inputDate);

  return `${input.getFullYear().toString().substr(2, 2)}.${padZero(input.getMonth() + 1)}.${padZero(input.getDate())} ${padZero(input.getHours())}:${padZero(input.getMinutes())}`;
}
