<script setup lang="ts">
import {cart} from "assets/images";
const cartStore = useCartStore();
const miniCart = ref();
const handleCartClick = (event) => {
  miniCart.value.toggle(event)
}

const totalPriceText = computed<string>(() => `${cartStore.totalPrice.toLocaleString().replace(',', ' ')} сум`)
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
        <icon :icon="cart"/>
        <badge :value="cartStore.totalAmount"/>
      </div>
    </template>
  </Button>

  <Popover ref="miniCart" class="mini-cart">
    <div class="mini-cart__list">
      <transition-group name="slideY">
        <mini-cart-product
            v-for="product in cartStore.cartList"
            :key="product.id"
            :product="product"
            :show-image="false"
            @add-to-cart="cartStore.addToCart"
        />
      </transition-group>
    </div>
    <div class="mini-cart__footer">
      <div class="total-price">
        {{totalPriceText}}
      </div>
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
}
</style>
