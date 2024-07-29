<script setup lang="ts">
import type { ICartItem, IProductInCart } from '~/composables/useShopData/types';

const props = defineProps<{
  product: IProductInCart
  showImage: boolean
}>();

const emit = defineEmits<{
  (e: 'addToCart', value: ICartItem): void
  (e: 'removeFromCart', id: string): void
}>();

const amount = computed({
  get() {
    return props.product.amount;
  },

  set(amount: number) {
    emit('addToCart', { id: props.product.id, amount });
  },
});

const price = computed(() => props.product.price.toLocaleString().replace(',', ' '));
</script>

<template>
  <Card class="cart-product">
    <template #content>
      <div v-if="showImage && product.imageUrl" class="cart-product__image">
        <img :src="product.imageUrl" :alt="product.name">
      </div>

      <div class="cart-product__details">
        <div class="cart-product__details-name">
          {{ product.name }}

          <Button
            icon="pi pi-times"
            severity="danger"
            text
            rounded
            style="margin-left: auto"
            @click="emit('removeFromCart', product.id)"
          />
        </div>

        <div v-if="product.description" class="cart-product__details-description">
          {{ product.description }}
        </div>

        <div class="cart-product__details-footer">
          <div class="cart-product__details-price">
            {{ price }} сум
          </div>

          <input-number v-model="amount" show-buttons :use-grouping="false" button-layout="horizontal" class="amount" :min="0" :max="999">
            <template #decrementbuttonicon>
              <i class="pi pi-minus" />
            </template>

            <template #incrementbuttonicon>
              <i class="pi pi-plus" />
            </template>
          </input-number>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.cart-product {
  :deep(.p-card-content) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__image {
    font-size: 0;
    max-width: 16rem;
    min-width: 16rem;
    display: flex;
    img {
      margin: auto;
      max-width: 100%;
      max-height: 16rem;
    }
  }

  &__details {
    max-width: 32rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    &-name {
      font: var(--font-14-b);
      color: var(--primary-900);
      display: flex;
      align-items: center;
    }

    &-description {
      font: var(--font-14-n);
      color: var(--accent-text);
    }

    &-footer {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding-top: 1rem;
    }

    &-price {
      flex-grow: 1;
      color: var(--black);
    }
  }
}
</style>
