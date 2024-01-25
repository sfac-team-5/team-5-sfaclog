import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

function SeriesSetting() {
  const { data: session } = useSession();
  const [series, setSeries] = useState();

  useEffect(() => {
    if (!session) return;

    async function fetchData(id: string) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/series/${id}`,
        );
        const data = await response.json();
        setSeries(data);
      } catch (error) {}
    }
    fetchData(session.user.id);
  }, [session]);

  return <div>SeriesSetting</div>;
}

export default SeriesSetting;
