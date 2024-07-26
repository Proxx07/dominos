import type { EventHandlerRequest, H3Event } from 'h3';
import { setCookie } from 'h3';


export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const runtimeConfig = useRuntimeConfig();

  const { token } = await $fetch<{ token: string }>(`${runtimeConfig.public.API_URL}/api/account/token`, {
    method: 'POST',
    body: {
      userName: 'admin',
      password: 'P@ssw0rd',
    },
  });
  setCookie(event, 'token', token);
  return {token}
});
