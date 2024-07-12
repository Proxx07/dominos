import $request from '~/api';

export function useMenu() {
  const cookie = useCookie('token');
  cookie.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImRkMzU1MTUzLWQzMmEtNGFkZC1iN2I3LWIwNjRiMTlkZmQ3ZCIsIm5iZiI6MTcyMDc4NzkwOCwiZXhwIjoxNzIwNzkxNTA4LCJpc3MiOiJBU0RHIERlbGl2ZXJ5IiwiYXVkIjoiaHR0cHM6Ly9kZWxpdmVyeS5hc2RnLnV6LyJ9.iPNNmz4EhwR7NgBLXjzpmUnBQpOvTj_AqEeAucxqQys';

  const list = ref<any>([]);

  const getMenu = async () => {
    const result = await $request('/api/menu', {
      query: {
        RegionId: 0,
        Longitude: 69.259174,
        Latitude: 41.326077,
        OrderTypeId: 0,
      },
    });

    list.value = result;
  };

  return {
    getMenu,
    list,
  };
}
