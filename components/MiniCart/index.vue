<script setup lang="ts">
import { cart } from 'assets/images';
import type { PopoverMethods } from 'primevue/popover';
import type { ICartItem } from '~/composables/useShopData/types';

const cartStore = useCartStore();
const miniCart = ref<PopoverMethods>();

const localePath = useLocalePath();
const $router = useRouter();
const ORDER_PAGE_LINK = '/order';

function handleCartClick(event: Event) {
  if ($router.currentRoute.value.path === ORDER_PAGE_LINK) return;
  if (cartStore.totalAmount) {
    miniCart.value?.toggle(event);
  }
}

const totalPriceText = computed<string>(() => `${cartStore.totalPrice.toLocaleString().replace(',', ' ')} сум`);

function productAddHandler(value: ICartItem) {
  cartStore.addToCart(value);
  if (cartStore.totalAmount === 0) {
    miniCart.value?.hide();
  }
}

function productRemoveHandler(id: string) {
  cartStore.removeFromCart(id);
  if (cartStore.totalAmount === 0) {
    miniCart.value?.hide();
  }
}

function orderButtonHandler() {
  $router.push(localePath(ORDER_PAGE_LINK));
  miniCart.value?.hide();
}
</script>

<template>
  <Button
    severity="secondary"
    class="cart-button"
    label="Корзина"
    @click="handleCartClick"
  >
    <template #icon>
      <div class="icon-wrapper">
        <icon :icon="cart" />
        <badge :value="cartStore.totalAmount" />
      </div>
    </template>
  </Button>

  <Popover ref="miniCart">
    <div class="mini-cart__list">
      <transition-group name="slideY">
        <mini-cart-product
          v-for="product in cartStore.cartList"
          :key="product.id"
          :product="product"
          :show-image="false"
          @add-to-cart="productAddHandler"
          @remove-from-cart="productRemoveHandler"
        />
      </transition-group>
    </div>
    <div class="mini-cart__footer">
      <div class="total-price font-14-b">
        Сумма заказа: {{ totalPriceText }}
      </div>

      <Button severity="secondary" label="Оформить заказ" @click="orderButtonHandler" />
    </div>
  </Popover>
</template>

<style scoped lang="scss">
.cart-button {
  min-width: 13rem;
  position: relative;
  --p-button-badge-size: 1.3rem;
  --p-badge-font-size: .8rem;
  --p-badge-primary-color: var(--secondary-500);
  --p-badge-primary-background: var(--white);

  .icon-wrapper {
    position: relative;
    font-size: 0;
    margin-right: .5rem;
    :deep(.p-badge) {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(40%, 0);
      padding-top: 1px;
    }
  }
}

.mini-cart {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-height: 34.2rem;
    overflow: auto;
    overflow-x: hidden;
    padding: 1rem;
    position: relative;
  }

  &__footer {
    padding: 1.5rem 1.3rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
