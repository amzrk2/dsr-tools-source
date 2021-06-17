import React, { memo, useState, useEffect, useCallback } from 'react';

import Loading from '@/components/Loading';
import { api } from '@/utils/axios';

function Minecraft() {
  const [loading, setLoading] = useState(false);

  /**
   * fetch data from remote
   */
  const fetchData = useCallback(async () => {
    const res = await api.get('/dsr-tools/minecraft/index.min.json');
    if (res?.data) {
      console.log(res.data);
      setLoading(false);
    }
  }, []);
  useEffect(() => fetchData(), [fetchData]);

  return (
    <Loading loading={loading}>
      <div className='mc'>MC</div>
    </Loading>
  );
}

export default memo(Minecraft);
